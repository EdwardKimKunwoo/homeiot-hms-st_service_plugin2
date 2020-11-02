/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Visitors service shows a list of missed visitors.
 * @module service/visitor/main
 * @author Home IoT R&D Team
 */

/** Load page */
function loadedVisitorPage(service) {
  //console.log("loadedVisitorPage" + "() called...");
  drawActionBar(false);

  initVisitorPage(); // detail 페이지  초기화

  drawVisitorPage(); // detail 페이지  draw

  if (isFHub()) {
    scplugin.manager.setFlag("openAdditionalPage");
  }

  return 0;
}

/** function called on click event of page */
function loadedVisitorPageOnclickEvent(e) {
  var clickedObj_id = e.currentTarget.id;
  visitorObject.clicked_index = clickedObj_id.split('_')[1];
  visitorObject.clicked_id = clickedObj_id;
  visitorObject.originalclicked_id = clickedObj_id;

  let config = {
    type: 'rippleB',
    cb: () => { visitorCardOnClick(); }
  };
  rippleManager.set(e, config);
}

function createVisitorOptionMenu(service) {
  // console.log("createVisitorOptionMenu" + "() called...");
  var visitorMenuArr = {
    menuItem: []
  };

  //console.debug(PACKAGE, "mainScreen", "createOptionMenu");
  setActionBarMenu("visible");

  //addPageMenu("add", visitorMenuArr.menuItem, $.lang[lang].ADDHOMECARD, service.cardInfo.list[0]);
  //addPageMenu("remove", visitorMenuArr.menuItem, $.lang[lang].REMOVEHOMECARD, service.cardInfo.list[0]);
  setMenu(visitorMenuArr.menuItem, service);

  return visitorMenuArr;
}


/////////////////////// Visitor 데이터 업데이트 ///////////////////////
/** Update visitor information */
function updateVisitorInfo(pageNum) {
  if (visitorObject.card_status !== "loaded") {
    visitorObject.card_status = "loading";
  }
  // 서버에 요청하는 visitor 데이터의 최소 단위, min: 30, max 99
  var requestBody = rsapi_getVisitorHistory(pageNum, visitorObject.requestVisitorNum); // 처음에 한꺼번에 데이터를 받아오기 위한, 갯수를 샘하기 위해
  promiseSendRequestWithTimeout(requestBody)
    .then((response) => updateVisitorInfoCallback(response))
    .catch((e) => sendRequestExceptionHandlerForVisitor());
}

function updateVisitorInfoCallback(response) {
  // console.log("updateVisitorInfoCallback" + "() called...");

  parseVisitorInfo(response);

  if (visitorObject.next_page) { // 전체 수량을 알아야 하기 때문에 반복 request
    setTimeout(updateVisitorInfo(visitorObject.request_index), 0);
    return;
  }

  if (visitorObject.card_status !== "loaded") {
    visitorObject.card_status = "loaded";
    drawCardVisitorInfo();
    clearTimeout(firstLoadingTimer);
  }

}

function parseVisitorInfo(response) {
  // console.log("parseVisitorInfo" + "() called...");

  if (response.result.status === RESPONSE_OK && response.data) {
    var preventDup = new Map([]);
    var count = response.data.count;
    var cntOfToday = 0;
    for (var i = 0; i < count; i++) {
      if (!preventDup.has(response.data.list[i].location + response.data.list[i].reg_time + response.data.list[i].image_data + response.data.list[i].image_data_format + response.data.list[i].image_url)) {
        preventDup.set(response.data.list[i].location + response.data.list[i].reg_time + response.data.list[i].image_data + response.data.list[i].image_data_format + response.data.list[i].image_url, 1);
        var listitem = {};
        listitem.location = response.data.list[i].location;
        listitem.reg_time = response.data.list[i].reg_time;
        listitem.image_data = response.data.list[i].image_data;
        listitem.image_data_format = response.data.list[i].image_data_format;
        listitem.image_url = response.data.list[i].image_url;
        if (listitem.reg_time.checkTodayYesterday() === $.lang[lang].TODAY) {
          cntOfToday++;
        }
        addOrUpdateVisitorListData(listitem);
        // visitorObject.list.push(listitem); // 데이터를 추가적으로 push 하기 위함 add 및 update
      }
    }

    if(response.data.total > (response.data.start_index - 1) + count ){
      visitorObject.next_page = true;
    } else {
      visitorObject.next_page = false;
    }

    visitorObject.request_index = response.data.start_index + count;
  } else if (response.result.status === RESPONSE_NO_DATA) {
    //visitorObject.total_num = 0;
  } else {
    // Error Exception
    throw new Error(response.result.message);
  }

  visitorObject.total_num = visitorObject.list.length;
  visitorObject.today_visitors = visitorObject.today_visitors + cntOfToday;

  //console.log("parseVisitorInfo() ", visitorObject.list.length, visitorObject.total_num, count, visitorObject.request_index, response.data.count, visitorObject.next_page, visitorObject.last_page);
}

function sendRequestExceptionHandlerForVisitor() {
  if (serviceMain.currentDivString === "mainScreen" && visitorObject.card_status !== "loaded") {
    visitorObject.card_status = "unloaded";
    drawCardVisitorInfo();
    showRequestErrorDialog();
  }
}

/////////////////////// Banner 표시 ///////////////////////
/** Initiate main banner */
function initVisitorMainBanner() { // 반포레이안의 경우 표시 안함 index.js 에서 disable
  // console.log("initVisitorMainBanner" + "() called...");
  var bannerId = "mainBanner_visitor";
  var bannerUri = "visitorCardOnClick()";

  document.getElementById('mainBannerWrapper').innerHTML +=
    "<div id='" + bannerId + "' class='swiper-slide mainBannerSwiper' onclick='" + bannerUri + "'></div>";
}


/////////////////////// main 에 보이는 favorite 카드에 대한 초기화 ///////////////////////
/** Initiate favorite card */
async function initVisitorCard(index, cardInfo) {
  await new Promise(resolve => {
    //console.log("initVisitorCard" + "() called...");
    let initHtml = "<div id='visitorCard' class='servicecards motion_card'></div>";
    document.getElementById('sortableDiv_' + index).innerHTML = initHtml;

    initHtml =
      "<div class='servicecards_title_space'>" +
      "<div id='visitorTitle'></div>" +
      "<div class='clear'></div>" +
      "</div>" +
      "<div class='servicecards_data_space'>" +
      "<div id='visitorData'></div>" +
      "</div>";

    document.getElementById('visitorCard').innerHTML = initHtml;

    if (document.getElementById('visitorTitle') === null) return false;
    document.getElementById('visitorTitle').innerHTML = drawServiceCardEditerImage($.lang[lang].VISITOR_SERVICE, "visitorTitleDetail", "subvisitorTitleDetail");

    cardInfo.bEnabledCard = true;
    cardInfo.initCardOrder = index;
    cardInfo.nCardOrder = index;
    cardInfo.title = $.lang[lang].VISITOR_SERVICE;

    resolve();
  });

  return true;
}


/////////////////////// main 에 보이는 favorite 카드에 대한 draw ///////////////////////

var swiperVisitorCard;
/** Draw favorite card */
function drawCardVisitorInfo() {
  // console.log("drawCardVisitorInfo" + "() called...");

  let visitorCardElement = document.getElementById('visitorCard');
  if (!visitorCardElement) return;
  let clone = visitorCardElement.cloneNode(true);
  visitorCardElement.parentNode.replaceChild(clone, visitorCardElement);
  if (clone) {
    clone.addEventListener('click', (e) => {
      e.stopPropagation();
      visitorObject.clicked_index = 0;
      visitorObject.clicked_id = 'visitorCardItem_0';
      visitorObject.originalclicked_id = 'visitorCardItem_0';
      if (e.composedPath()[1].id !== 'visitor_pagination') {
        visitorCardOnClick();
      }
    });
  }

  var today_visitors = visitorObject.today_visitors;

  var title;
  if (today_visitors > 1) {
    title = $.lang[lang].VISITORCARD_TITLE_MULTIPLE.replace("%d", (today_visitors).fmodify("var(--brand-color)", 600));
  } else {
    title = $.lang[lang].VISITORCARD_TITLE_SINGLE.replace("%d", (today_visitors).fmodify("var(--brand-color)", 600));
  }

  if (document.getElementById('visitorTitle') == null) return false;
  if (this.enabledMainBanner === true)
    document.getElementById('mainBanner_visitor').innerHTML = mainBannerTextForSwipe($.lang[lang].VISITOR_SERVICE, lang);

  let detail = document.getElementById('visitorTitleDetail');
  detail.innerHTML = title;
  detail.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    let config = {
      type: 'rippleC',
      cb: () => {
        visitorObject.clicked_index = 0;
        visitorObject.clicked_id = 'visitorCardItem_0';
        visitorObject.originalclicked_id = 'visitorCardItem_0';
        visitorCardOnClick();
      }
    };
    rippleManager.set(e, config);
  }, {passive: true});
  detail.onclick = (e) => { e.stopPropagation(); };

  document.getElementById('visitorData').innerHTML = "<div id='visitor_swiper' class='swiper-container'></div>";

  // visitor card 표시 animation 적용
  promiseAnimationEnd($('#visitor_swiper'), 'show_card');

  var dtIhtml = "";
  var cnt_per_page = 0;

  if (visitorObject.card_status === "unloaded") {
    // reload card 표시
    drawReloadCard("visitor_swiper", "others", retryLoadVisitorCard);
  } else if (visitorObject.card_status === "loading") {
    // loading card 표시
    drawLoadingCard("visitor_swiper", "others");
  } else if (visitorObject.today_visitors === 0) {
    // no item case
    //drawNoItemCard("visitor_swiper", "service/visitor/res/img/home_ic_status_visitor.png", $.lang[lang].NO_VISITOR);
    drawNoItemCard("visitor_swiper", "service/visitor/res/svg/home_ic_status_visitor.svg", $.lang[lang].NO_VISITOR);
  } else {
    dtIhtml += "  <div id='visitor_swiper_wrapper' class='swiper-wrapper' onclick='event.cancelBubble=true;'>";
    for (let index = 0; index < VISITOR_MAX_ITEM_NUM_IN_FAVORITE_PAGE && index < today_visitors; index++) {
      if (cnt_per_page === VISITOR_MAX_ITEM_NUM_IN_FAVORITE_PAGE) break; // 9개로 최대 favorite 카드에 표시 할 수 있는 수

      var image_url = "";
      if(visitorObject.list[index].image_url){
        image_url = (visitorObject.list[index].image_url).split(" ");
      }
      var image_data = "";
      if(visitorObject.list[index].image_data){
        image_data = visitorObject.list[index].image_data;
      }

      var location = "";
      if(visitorObject.list[index].location){
        location = visitorObject.list[index].location;
      }

      if (cnt_per_page % VISITOR_ITEM_NUM_PER_SWIPE === 0) {
        dtIhtml += "<div class='swiper-slide'>";
      }

      dtIhtml += "<div id='visitorCardItem_" + index + "' class='visitor_boxes_favorite_list_div'>";
      dtIhtml += "<div class='visitor_boxes_favorite_list_div_category_img_left'>";
      dtIhtml += applyVisitorImage(image_url[0], image_data, true);
      dtIhtml += "</div>";
      dtIhtml += "<div class='visitor_boxes_favorite_list_inner_div'>";
      dtIhtml += "<span class='visitor_boxes_favorite_list_div_text_left'>" + location + "</span>";
      //dtIhtml += "<span class='visitor_boxes_favorite_list_div_text_right'>" + visitorObject.list[index].reg_time.toDateString() + "</span>";
      dtIhtml += "<span class='visitor_boxes_favorite_list_div_text_right'>" + visitorObject.list[index].reg_time.toDateString() + "</span>";
      dtIhtml += "</div>";
      dtIhtml += "</div>";

      if (cnt_per_page % VISITOR_ITEM_NUM_PER_SWIPE == 2) {
        dtIhtml += "</div>";
      }
      cnt_per_page++;
    }

    if ((cnt_per_page - 1) % VISITOR_ITEM_NUM_PER_SWIPE != 2) {
      dtIhtml += "</div>";
    }

    dtIhtml += "</div>" + "<div class='clear'></div>";
    dtIhtml += "<div id='visitor_pagination' class='swiper-pagination' style='position:static;margin-top:6px;'></div>";

    document.getElementById('visitor_swiper').innerHTML = dtIhtml;

    let itemsList = document.getElementsByClassName('visitor_boxes_favorite_list_div');
    for (var i = 0; i < itemsList.length; i++) {
      itemsList[i].removeEventListener('touchstart', loadedVisitorPageOnclickEvent, {passive: true});
      itemsList[i].addEventListener('touchstart', loadedVisitorPageOnclickEvent, {passive: true});
    }
  }

  if (today_visitors > VISITOR_ITEM_NUM_PER_SWIPE) {
    if (swiperVisitorCard) swiperVisitorCard.destroy();
    swiperVisitorCard = new Swiper('#visitor_swiper', {
      spaceBetween: 30,
      centeredSlides: true,
      pagination: {
        el: '#visitor_pagination',
        clickable: true,
      },
    });
  }

  resizeHandler.subscribe('resize', () => {
    $('.swiper-slide').css('width', '$(window).width()');
    if (swiperVisitorCard) {
      setTimeout(() => swiperVisitorCard.update(), RESIZE_DELAY);
    }
  });
  resizeHandler.subscribe('resizeend', () => {
    if (swiperVisitorCard) {
      swiperVisitorCard.update();
    }
  });

  return true;
}

function retryLoadVisitorCard() {
  updateVisitorInfo(1);
  drawCardVisitorInfo();
}

/////////////////////// detail 페이지  초기화 ///////////////////////
/** Initiate page */
function initVisitorPage() {
  // console.log("initVisitorPage" + "() called...");

  var innerHTML = "";
  innerHTML += "<div id='visitorPageTitle'></div>";
  innerHTML += "<div id='visitorPageList'></div>";

  document.getElementById("visitorPage").innerHTML = innerHTML;
}

/////////////////////// detail 페이지에서 선택된 항목으로 이동해주는 함수 ///////////////////////
function openVisitorPage(pageName) {
  //console.log("openVisitorPage" + "() called...");

  var page = document.getElementById(pageName);

  if (page) {
    page.style.display = "block";
  }

  //var visitorIddate = 'visitorPageItemdate_' + visitorObject.clicked_id.split("_")[1];
  var visitorId = 'visitorPageItem_' + visitorObject.originalclicked_id.split("_")[1];
  //  console.log("visitorIddate=",visitorIddate, "visitorId=", visitorId);
  //console.log("visitorId=", visitorId);
  if (!isVisible($('#' + visitorId).get(0))) {
    //$("#visitorPage").scrollTo("#" + visitorIddate);
    // $("#visitorPage").scrollTop($("#" + visitorIddate).offset().top - $("#actionBarTitle_detailed").height());
    if ($("#" + visitorId).offset()) {
      $("#visitorPage").scrollTop($("#" + visitorId).offset().top - $("#actionBarTitle_detailed").height());
      console.log("visitorId=", visitorId);
    }
    // visitorObject.visitorPageScrollTop = $( '#visitorPage' ).scrollTop();   // fixed tab function
    // console.log("favorite clicked", $("#" + visitorIddate).offset().top, $("#visitorPageTab").height(), $("#actionBarTitle_detailed").height());  // fixed tab function
    // console.error("favorite clicked", "countFirstCheckOpenPage", visitorObject.countFirstCheckOpenPage, "tapOffset", visitorObject.tapOffset, "visitorPageScrollTop",visitorObject.visitorPageScrollTop);  // fixed tab function
    visitorObject.clicked_id = "noselect";
  }
}

/////////////////////// detail 페이지에서 이미지 적용해주는 함수 ///////////////////////
// param flag - true : card view, false : detailed page
function applyVisitorImage(image_url,image_data, flag) {
  //console.log("applyVisitorImage() is called");
  var innerHTML = "";
  var className = 'visitor_item_circle';
  var imagePath;

  if (flag) {
    //className = 'visitor_boxes_card_list_img';
    imagePath = 'service/visitor/res/img/visitor_image_thumbnail.png';
  } else {
    //className = 'visitor_boxes_page_list_img';
    imagePath = 'service/visitor/res/img/visitor_image_thumbnail_list.png';
  }

  innerHTML += "<span>";

  if (image_data === "" || image_data === undefined) {
    if(image_url === "" || image_url === undefined){
      innerHTML += "<img class='" + className + "' src='" + imagePath + "' alt=''></img>";
    } else {
      innerHTML += "<img class='" + className + "' src='" + image_url + "' alt=''></img>";
    }
  } else {
    /*
    if (flag) {
      className = 'visitor_item_circle';
    } else {
      className = 'visitor_boxes_detail_item_circle';
    }*/

    innerHTML += "<img class='" + className + "' src='" + image_data + "' alt=''></img>";
  }

  innerHTML += "</span>";

  return innerHTML;
}

function applyVisitorImageOnDetailedPage(index) {
  var innerHTML = "";
  var location = visitorObject.list[index].location;
  var reg_time = visitorObject.list[index].reg_time;

  innerHTML += "<div class='visitor_boxes_detail_page_list_top_div'>";
  innerHTML += "<span class='visitor_boxes_detail_page_list_top_div_text_left'>" + location + "</span>";
  //if (reg_time.checkTodayYesterday() !== $.lang[lang].TODAY) {
  innerHTML += "<span class='visitor_boxes_detail_page_list_top_div_text_right'>" + visitorObject.list[index].reg_time.toDateString() + "</span>";
  //} else {
  //  innerHTML += "<span class='visitor_boxes_detail_page_list_top_div_text_right'>" + visitorObject.list[index].reg_time.toDateString() + "</span>";
  //}
  innerHTML += "</div>";
  innerHTML += "<div class='clear'></div>";
  innerHTML += "  </div>";
  innerHTML += "  </div>";

  return innerHTML;
}

/////////////////////// detail 페이지에서 로딩 아이콘 적용해주는 함수 ///////////////////////
function applyLoadingCircleOnVisitorDetailedPage(num, id) {
  var innerHTML = "";

  if (num !== 0) {
    innerHTML += "<div id=" + id + " class='visitor_boxes_detail_page_loading'>";
    innerHTML += "<div style='text-align:center'>";
    innerHTML += "<img class='img' src='res/img/circle.png' alt=''/>";
    innerHTML += "</div>";
    innerHTML += "</div>";
  }

  return innerHTML;
}

/////////////////////// detail 페이지에서 일별 목록 적용해주는 함수 ///////////////////////
function applyDailyListOnVisitorDetailedPage(index, tmp_num, check_data_group, status, check_data_group_count, image_url, image_data) {
  var innerHTML = "";
  var check_data_group_before_status = status;
  var total_num = visitorObject.total_num;
  var temp_num = index + 1;

  // console.log(index, "check_data_group=", check_data_group, "check_data_group_before_status=", check_data_group_before_status, check_data_group_count, visitorObject.list[index].reg_time.toDateString(true));
  // index = visitorObject.originalclicked_id.split("_")[1];
  // console.log(index, "check_data_group=", check_data_group, "check_data_group_before_status=", check_data_group_before_status, check_data_group_count);

  var keyID = 'visitorPageItem_';

  if (tmp_num === 1) {
    innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_top'>";
  } else if (total_num === tmp_num) {
    innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_bottom'>";
  } else {
    innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_no_radius'>";
  }
/*
  if (total_num === temp_num && check_data_group_count === 1) {
    // total_num : 1
    //console.log("1111", index, "total_num=", total_num);
    innerHTML += "<div id=" + keyID + index + " class='visitor_boxes_detail_page_list_div'>";
  } else if (check_data_group === true && check_data_group_before_status === false && check_data_group_count === 1 && temp_num !== total_num) {
    // total_num >= 2, index : 0
    //console.log("2222", index, "total_num=", total_num);
    innerHTML += "<div id=" + keyID + index + " class='visitor_boxes_detail_page_list_div_top'>";
    check_data_group_before_status = true;
  } else if (check_data_group === true && check_data_group_before_status === true && check_data_group_count > 1 && temp_num === total_num) {
    // total_num >= 2, index : max
    //console.log("5555", index, "total_num=", total_num);
    innerHTML += "<div id=" + keyID + index + " class='visitor_boxes_detail_page_list_div_bottom'>";
    check_data_group_before_status = false;
  } else if (check_data_group === true && check_data_group_before_status === true && check_data_group_count >= 2 && temp_num !== total_num) {
    // total_num > 2, index : 1~max-1
    //console.log("7777", index, "total_num=", total_num);
    innerHTML += "<div id=" + keyID + index + " class='visitor_boxes_detail_page_list_div_no_radius'>";
    check_data_group_before_status = true;
  } else { // no case
    // console.log("9999", index, "total_num=", total_num);
    innerHTML += "<div id=" + keyID + index + " class='visitor_boxes_detail_page_list_div_top'>";
  }
*/
  innerHTML += "<div class='visitor_boxes_detail_page_list_div_category_img_left'>";
  innerHTML += applyVisitorImage(image_url[0],image_data, false);
  innerHTML += "</div>";

  return { innerHTML: innerHTML, check_data_group_before_status: check_data_group_before_status };
}

/////////////////////// detail 페이지에서 일별 목록 그리는 함수 ///////////////////////
/** Draw daily list on detailed page */
function drawDailyListOnVisitorDetailedPage(NumofIteminPage) {
  //console.log("drawDailyListOnVisitorDetailedPage" + "() called...");
  var innerHTML = "";
  var count = 0;
  var check_data_group_count = 0;
  var check_data_group_before_status = false; // 이전과 동일한 날짜 였으면 true
  var check_data_group = false; // 다음 item 과 group을 묶어야 한다는 의미에서의 true

  var tmp_num = 0;
  for (let index = 0, max = visitorObject.total_num; index < max; index++) {
    if (NumofIteminPage <= tmp_num) continue;

    var image_url = "";
    if(visitorObject.list[index].image_url){
      image_url = (visitorObject.list[index].image_url).split(" ");
    }
    var image_data = "";
    if(visitorObject.list[index].image_data){
      image_data = visitorObject.list[index].image_data;
    }

    tmp_num++;
    // console.log("visitorObject.originalclicked_id = ", visitorObject.originalclicked_id);
    // console.log(index, check_data_group_count, count, max, visitorObject.total_num, check_data_group_before_status, check_data_group, visitorObject.clicked_index, visitorObject.clicked_id);
    // console.log(index + 1, check_data_group_count, check_data_group_before_status, check_data_group,visitorObject.clicked_index, visitorObject.clicked_id);

    if (tmp_num != 1) {
      innerHTML += "<div style='background-color:white; margin-left: 12px;  margin-right: 12px'>";
      innerHTML += "<div class='visitor_boxes_detail_page_list_divider'></div>";
      innerHTML += "</div>";
    }

    count = 0; // initialize

    if ((index + count) == max - 1) {
      count = 0;
    }
    else {
      count = 1;
    }

    var reg_time = visitorObject.list[index].reg_time;
    if (check_data_group === false) {
      // innerHTML += "<div style='border: 1px solid gold'>"; // DIV 구분선 테스트를 위해

      if (index <= Number(getClickedIdNumber(visitorObject.originalclicked_id)) && visitorObject.clicked_id != "noselect") {
        visitorObject.clicked_id = visitorObject.clicked_id.replace(getClickedIdNumber(visitorObject.clicked_id), index);
      }
    }

    // console.log(index, count, max, "total_num=", visitorObject.total_num);

    if (index + count < max) {
      if (visitorObject.list[index + count].reg_time.isSameDay(reg_time)) {
        check_data_group = true;
        check_data_group_count++;
      } else {
        check_data_group = false;
        if (check_data_group_count > 0)
          check_data_group_count = 0;
      }
    }

    var ret = applyDailyListOnVisitorDetailedPage(index, tmp_num, check_data_group, check_data_group_before_status, check_data_group_count, image_url, image_data);
    innerHTML += ret.innerHTML;
    check_data_group_before_status = ret.check_data_group_before_status;

    innerHTML += applyVisitorImageOnDetailedPage(index);

    if (check_data_group == true) {
      innerHTML += "  </div>";
    }
  }

  innerHTML += "<div class='visitor_boxes_detail_page_list_bottom'>";
  innerHTML += "</div>";
  innerHTML += "</div>";

  return innerHTML;
}

function toggleVisitorPopup(display) {
  $('.visitor_page_popup_mask').css('display', display);
  $('.visitor_page_popup_window').css('display', display);

  if (display === 'block') {
    $('#actionBarBackButton').css('pointer-events', 'none');
    $('#actionBarBackButton').css('z-index', 0);
  } else {
    $('#actionBarBackButton').css('pointer-events', 'unset');
    $('#actionBarBackButton').css('z-index', 1);
  }
}

function appendVisitorPopup(target) {
//   var visitorPage = document.getElementById('visitorPage');
  var popup = document.createElement('div');
  popup.id = 'visitorPopup';
  //   visitorPage.appendChild(popup);
  document.body.appendChild(popup);

  var initHtml =
    "<div id='popup_mask' class ='visitor_page_popup_mask'></div>" +
    "<div id='popup_window' class='visitor_page_popup_window'>" +
    "  <div id='popup_close' class='visitor_page_popup_close'></div>" +
    "  <div id='popup_container' class='visitor_page_popup_container'>" +
    "    <div id='popup_location' class='visitor_page_popup_location'></div>" +
    "    <div id='popup_time' class='visitor_page_popup_time'></div>" +
    "    <div id='popup_image_box' class='visitor_page_popup_image_box'>" +
    "      <div id='popup_image_container' class='visitor_page_popup_image_container'>" +
    "        <img id='popup_image'>" +
    "        <div id='popup_image_left_arrow_bg' class='visitor_page_popup_image_left_arrow_bg'></div>" +
    "        <div id='popup_image_left_arrow' class='visitor_page_popup_image_left_arrow'></div>" +
    "        <div id='popup_image_right_arrow_bg' class='visitor_page_popup_image_right_arrow_bg'></div>" +
    "        <div id='popup_image_right_arrow' class='visitor_page_popup_image_right_arrow'></div>" +
    "      </div>" +
    "    </div>" +
    "  </div>" +
    "</div>";
  document.getElementById("visitorPopup").innerHTML = initHtml;

  var close = document.getElementById('popup_close');
  close.innerHTML = document.loadedSVG.close;
  close.addEventListener('touchstart', function (e) {
    popup.remove();
    toggleVisitorPopup('none');
  }, {passive: true});

  var location = document.getElementById('popup_location');
  location.innerHTML = visitorObject.list[target].location;

  var reg_time = document.getElementById('popup_time');
  reg_time.innerHTML = visitorObject.list[target].reg_time.toDateString();

  if (target > 0) {
    var left_bg = document.getElementById('popup_image_left_arrow_bg');
    left_bg.innerHTML = document.loadedSVG.buttonBG;

    var left_arrow = document.getElementById('popup_image_left_arrow');
    left_arrow.innerHTML = document.loadedSVG.left.replace('VISITOR_BUTTON_PREVIOUS', $.lang[lang].PREVIOUS_BUTTON);
    $('#popup_image_left_arrow').on('touchstart', function (e) {
      let config = {
        type: 'rippleA',
        cb: () => {
          popup.remove();
          toggleVisitorPopup('none');
          appendVisitorPopup(target - 1);
        }
      };
      rippleManager.set(e, config);
    });
  }

  if (target < visitorObject.total_num - 1) {
    var right_bg = document.getElementById('popup_image_right_arrow_bg');
    right_bg.innerHTML = document.loadedSVG.buttonBG;

    var right_arrow = document.getElementById('popup_image_right_arrow');
    right_arrow.innerHTML = document.loadedSVG.right.replace('VISITOR_BUTTON_NEXT', $.lang[lang].NEXT_BUTTON);
    $('#popup_image_right_arrow').on('touchstart', function (e) {
      let config = {
        type: 'rippleA',
        cb: () => {
          popup.remove();
          toggleVisitorPopup('none');
          appendVisitorPopup(target + 1);
        }
      };
      rippleManager.set(e, config);
    });
  }

  var startX, startY, startT;
  $('#' + 'popup_image').on('touchstart', function (e) {
    var touchstart = e.changedTouches[0];
    startX = touchstart.clientX;
    startY = touchstart.clientY;
    startT = e.timeStamp;
  });

  $('#' + 'popup_image').on('touchend', function (e) {
    var touchend = e.changedTouches[0];
    var endX = touchend.clientX;
    var endY = touchend.clientY;
    var endT = e.timeStamp;

    var touchOffsetX = startX - endX;
    var timeOffsetT = endT - startT;

    if (Math.abs(touchOffsetX) >= 80 && Math.abs(startY - endY) <= 40 && timeOffsetT <= 350) {
      if ((touchOffsetX < 0) && (target > 0)) {
        popup.remove();
        toggleVisitorPopup('none');
        appendVisitorPopup(target - 1);
      } else if ((touchOffsetX > 0) && (target < visitorObject.total_num - 1)) {
        popup.remove();
        toggleVisitorPopup('none');
        appendVisitorPopup(target + 1);
      }
    }
  });

  var image = document.getElementById('popup_image');
  if(visitorObject.list[target].image_data !== "" && visitorObject.list[target].image_data !== undefined){
    image.src = visitorObject.list[target].image_data;
  } else {
    image.src = visitorObject.list[target].image_url;
  }

  image.className = 'visitor_page_popup_image';
  image.alt = '';

  var image_box = document.getElementById('popup_image_box');
  image_box.appendChild(image);

  let mask = document.getElementsByClassName('visitor_page_popup_mask')[0];
  mask.addEventListener('touchstart', () => {
    popup.remove();
    toggleVisitorPopup('none');
  }, {capture: false, passive: true});

  toggleVisitorPopup('block');
}


/////////////////////// visitor 페이지 로드 ///////////////////////
/** Load visitor list on detailed page */
function loadVisitorList(NumofIteminPage) {
  //console.log("loadVisitorList" + "() called... NumofIteminPage=" + NumofIteminPage + " visitorObject.num_of_item_in_page=" + visitorObject.num_of_item_in_page);
  var innerHTML = "";
  var today_visitors = visitorObject.today_visitors;

  if (visitorObject.total_num !== 0) {
    innerHTML += drawDailyListOnVisitorDetailedPage(NumofIteminPage); // 잘못된 값 type
  } else { // no item case
    innerHTML =
      "<div class='visitor_noitem'>" +
      "	<div class='visitor_noitem_circle'>" +
      "		<div id='no_visitor_list' style='padding-top:6px'></div>" +
      "	</div>" +
      "	<div class='visitor_noitem_text'>" + $.lang[lang].NO_VISITOR + "</div>" +
      "</div>";

    document.getElementById("visitorPage").innerHTML = innerHTML;

    var no_visitor = document.getElementById('no_visitor_list');
    no_visitor.innerHTML = document.loadedSVG.visitor.replace('SVG_mdpi/home_ic_status_visitor', $.lang[lang].NO_VISITOR);

    return;
  }

  var id = 'VisitorNextPageLoading';
  var id_flag = '#' + id;
  innerHTML += applyLoadingCircleOnVisitorDetailedPage(today_visitors, id);

  document.getElementById("visitorPageList").innerHTML = innerHTML;

  for (let index = 0, max = visitorObject.total_num; index < max; index++) {
    $('#visitorPageItem_' + index).on('touchstart', function (e) {
      let config = {
        type: 'rippleB',
        cb: () => { appendVisitorPopup(index); }
      };
      rippleManager.set(e, config);
    });
  }

  $(id_flag).on('inview', function (event, visible, visiblePartX, visiblePartY) {
    if (visible) {
      $(id_flag).off('inview');
      document.getElementById(id).style.display = "none";

      if (NumofIteminPage < visitorObject.total_num) {
        loadVisitorList(NumofIteminPage + visitorObject.num_of_item_in_page);
        return;
      }

      // console.log(NumofIteminPage, visitorObject.today_visitors, today_visitors);
      // console.log("loadVisitorList" + "() called...", visitorObject.clicked_index, visitorObject.clicked_id);
      if (today_visitors <= 30) {
        if (visitorObject.clicked_id != "noselect") {
          // console.log("(2) offset.top = ", $("#" + visitorObject.clicked_id).offset().top);
          $("#visitorPage").scrollTo("#" + visitorObject.clicked_id);
          visitorObject.clicked_id = "noselect"; // 초기화
          // visitorObject.clicked_id = visitorObject.originalclicked_id;
          // console.log("set noselect");
        }
      }
    }
  });
}

/** Load title on detailed page */
function loadVisitorTitle() {
  var innerHTML = "";
  innerHTML += "<div class='visitor_boxes_detail_page_header'>";

  var today_visitors = visitorObject.today_visitors;
  var title;
  if (today_visitors > 1) {
    title = $.lang[lang].VISITORCARD_BODY_MULTIPLE.replace("%d", (today_visitors).fmodify("var(--brand-color)", 600));
  } else if (today_visitors === 1) {
    title = $.lang[lang].VISITORCARD_BODY_SINGLE.replace("%d", (today_visitors).fmodify("var(--brand-color)", 600));
  } else { // no item case
    title = $.lang[lang].VISITORCARD_BODY_MULTIPLE.replace("%d", (today_visitors).fmodify("var(--brand-color)", 600));
  }

  innerHTML += title;
  innerHTML += "</div>";
  document.getElementById("visitorPageTitle").innerHTML = innerHTML;
}


/////////////////////// detail 페이지 그리기 ///////////////////////
/** Draw detailed page with title and daily list */
function drawVisitorPage() {
  //console.log("drawVisitorPage" + "() called...");
  //console.log("drawVisitorPage" + "() called...", visitorObject.clicked_index, visitorObject.clicked_id);

  loadVisitorTitle();

  loadVisitorList(visitorObject.num_of_item_in_page);

  if (!visitorObject.next_page) {
    openVisitorPage('visitorPageList');
  }

}

function addOrUpdateVisitorListData(obj) {
  //console.log("addOrUpdateVisitorListData" + "() called...");
  let index = -1; // 무조건 새로운 데이터
  // var index = visitorObject.visitor.findIndex((e) => e.reg_num === obj.reg_num);
  if (index === -1) {
    let new_len = visitorObject.list.push(obj);
    index = new_len - 1;
    // console.log(index);
  } else {
    if (obj.location !== undefined) {
      visitorObject.list[index].location = obj.location;
    } else {
      visitorObject.list[index].location = "";
    }
    if (obj.reg_time !== undefined) {
      visitorObject.list[index].reg_time = obj.reg_time;
    } else {
      visitorObject.list[index].reg_time = "";
    }
    if (obj.image_data !== undefined) {
      visitorObject.list[index].image_data = obj.image_data;
    } else {
      visitorObject.list[index].image_data = "";
    }
    if (obj.image_data_format !== undefined) {
      visitorObject.list[index].image_data_format = obj.image_data_format;
    } else {
      visitorObject.list[index].image_data_format = "";
    }
    if (obj.image_url !== undefined) {
      visitorObject.list[index].image_url = obj.image_url;
    } else {
      visitorObject.list[index].image_url = "";
    }
  }
  //console.log(visitorObject.list);
  return index;
}
