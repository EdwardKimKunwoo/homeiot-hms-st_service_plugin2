/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Parcel service shows the information about the unreceived and received express.
 * @module service/parcel/main
 * @author Home IoT R&D Team
 */

function wait(msecs) {
  var start = new Date().getTime();
  var cur = start;
  while (cur - start < msecs) {
    cur = new Date().getTime();
  }
}

 /** Load page */
var lockLeftParcelTab = false;
var lockRightParcelTab = false;

function loadedParcelPage(service) {
  // console.log("loadedParcelPage" + "() called...");
  drawActionBar(false);

  initParcelPage(); // detail 페이지  초기화

  drawParcelPage(); // detail 페이지  draw

  if (isFHub()) {
    scplugin.manager.setFlag("openAdditionalPage");
  }

  let leftTab = document.getElementsByClassName('parcel_boxes_detail_page_tablink_left')[0];
  leftTab.addEventListener('touchstart', (e) => {
    lockLeftParcelTab = true;
    let leftConfig = {};
    leftConfig.cb = () => {
      lockLeftParcelTab = false;
      if (!lockRightParcelTab) {
        openPage('parcelPageWaiting');
      }
      else {
        lockRightParcelTab = false;
      }
    };
    leftConfig.cancelCb = () => {
      lockLeftParcelTab = false;
    };
    rippleManager.set(e, leftConfig);
  }, {passive: true});

  let rightTab = document.getElementsByClassName('parcel_boxes_detail_page_tablink_right')[0];
  rightTab.addEventListener('touchstart', (e) => {
    lockRightParcelTab = true;
    let rightConfig = {};
    rightConfig.cb = () => {
      lockRightParcelTab = false;
      if (!lockLeftParcelTab) {
        openPage('parcelPageReceived');
      }
      else {
        lockLeftParcelTab = false;
      }
    };
    rightConfig.cancelCb = () => {
      lockRightParcelTab = false;
    };
    rippleManager.set(e, rightConfig);
  }, {passive: true});

  return 0;
}

/** function called on click event of page */
function loadedParcelPageOnclickEvent(e) {
  var clickedObj_id = e.currentTarget.id;
  parcelObject.clicked_index = clickedObj_id.split('_')[1];
  parcelObject.clicked_id = clickedObj_id;
  parcelObject.originalclicked_id = clickedObj_id;

  let config = { cb: () => { parcelCardOnClick(); }};
  rippleManager.set(e, config);
}

function createParcelOptionMenu(service) {
  // console.log("createParcelOptionMenu" + "() called...");
  var parcelMenuArr = {
    menuItem: []
  };

  console.debug(PACKAGE, "mainScreen", "createOptionMenu");
  setActionBarMenu("visible");

  //addPageMenu("add", parcelMenuArr.menuItem, $.lang[lang].ADDHOMECARD, service.cardInfo.list[0]);
  //addPageMenu("remove", parcelMenuArr.menuItem, $.lang[lang].REMOVEHOMECARD, service.cardInfo.list[0]);
  setMenu(parcelMenuArr.menuItem, service);

  return parcelMenuArr;
}


/////////////////////// Parcel (미수령) 데이터 업데이트 ///////////////////////
/** Update undeliveried information */
function updateParcelWaitingInfo(pageNum) {
  if (parcelObject.card_status !== "loaded") {
    parcelObject.card_status = "loading";
  }
  // 서버에 요청하는 parcel 데이터의 최소 단위, min: 30, max 99
  var requestBody = rsapi_getParcelInfo("in", pageNum, parcelObject.requestWaitingParcelNum); // 처음에 한꺼번에 데이터를 받아오기 위한, 갯수를 샘하기 위해 (미수령)
  promiseSendRequestWithTimeout(requestBody)
    .then((response) => updateParcelWaitingInfoCallback(response))
    .catch((e) => sendRequestExceptionHandlerForParcel());
}

function updateParcelWaitingInfoCallback(response) {
  // console.log("updateParcelWaitingInfoCallback" + "() called...");

  parseParcelWaitingInfo(response);

  if (parcelObject.waiting_next_page) { // 미수령의 경우 전체 미수령 수량을 알아야 하기 때문에 반복 request
    setTimeout(updateParcelWaitingInfo(parcelObject.waiting_request_index), 0);
    return;
  }

  if (parcelObject.card_status !== "loaded") {
    parcelObject.card_status = "loaded";
    parcelService.drawCard();
    clearTimeout(firstLoadingTimer);
  }

  if (!parcelObject.waiting_next_page && document.getElementById("UndeliveredparcelNextPageLoading")) {
    document.getElementById("UndeliveredparcelNextPageLoading").style.display = "none";
  }
}

function parseParcelWaitingInfo(response) {
  // console.log("parseParcelWaitingInfo" + "() called...");
  parcelObject.received_num = 0;

  if (response.result.status === RESPONSE_OK && response.data) {
    var preventDup = new Map([]);
    var count = response.data.count;
    for (var i = 0; i < count; i++) {
      if (!preventDup.has(response.data.list[i].courier + response.data.list[i].locker_no + response.data.list[i].stockroom + response.data.list[i].category + response.data.list[i].reg_time)) {
        preventDup.set(response.data.list[i].courier + response.data.list[i].locker_no + response.data.list[i].stockroom + response.data.list[i].category + response.data.list[i].reg_time, 1);
        var listitem = {};
        listitem.company = response.data.list[i].courier;
        listitem.box_no = response.data.list[i].locker_no;
        listitem.stockroom = response.data.list[i].stockroom;
        if(response.data.list[i].status === 'in'){
          listitem.status = 'IN';
        }else{
          listitem.status = 'OUT';
        }
        listitem.category = response.data.list[i].category;
        listitem.datetime = response.data.list[i].reg_time;
        addOrUpdateParcelWaitingListData(listitem);
      }
    }
    if(response.data.total > (response.data.start_index - 1) + count ){
       parcelObject.waiting_next_page = true;
    }else{
      parcelObject.waiting_next_page = false;
    }

    parcelObject.waiting_request_index = response.data.start_index + count;

  } else if (response.result.status === 204) {
    parcelObject.received_num = 0;
  } else {
    // Error Exception
    throw new Error(response.result.message);
  }

  parcelObject.waiting_num = parcelObject.waiting.length;

  // console.log("parseParcelWaitingInfo() ", parcelObject.waiting.length, parcelObject.waiting_num, parcelObject.received_num, count, response.data.count, response.data.page, response.data.next_page, parcelObject.next_page, parcelObject.waiting_last_page, parcelObject.waiting_next_page);
}

/////////////////////// Parcel (수령) 데이터 업데이트 ///////////////////////
function updateParcelReceivedInfo(pageNum) {
  if (parcelObject.card_status !== "loaded") {
    parcelObject.card_status = "loading";
  }
  // console.log("updateParcelReceivedInfo" + "() called...");
  // 서버에 요청하는 parcel 데이터의 최소 단위, min: 30, max 99
  var requestBody = rsapi_getParcelInfo("out", pageNum, parcelObject.requestReceivedParcelNum); //  requestRequestParcelNum 수만큼만 요청, 로딩페이지가 보일때 다시금 요청(수령)
  promiseSendRequestWithTimeout(requestBody)
    .then((response) => updateParcelReceivedInfoCallback(response))
    .catch((e) => sendRequestExceptionHandlerForParcel());
}

function updateParcelReceivedInfoCallback(response) {
  // console.log("updateParcelReceivedInfoCallback" + "() called...");

  parseParcelReceivedInfo(response);

  if (parcelObject.card_status !== "loaded") {
    parcelObject.card_status = "loaded";
    parcelService.drawCard();
    clearTimeout(firstLoadingTimer);
  }

  if (!parcelObject.received_next_page && document.getElementById("DeliveredparcelNextPageLoading")) {
    document.getElementById("DeliveredparcelNextPageLoading").style.display = "none";
  }

  loadDeliveredPage(parcelObject.num_of_item_in_page); // 수령 택배 페이지 로드
}


function parseParcelReceivedInfo(response) {
  // console.log("parseParcelReceivedInfo" + "() called...");
  parcelObject.received_num = 0;

  if (response.result.status === RESPONSE_OK && response.data) {
    var preventDup = new Map([]);
    let count = response.data.count;
    for (var i = 0; i < count; i++) {
      if (!preventDup.has(response.data.list[i].courier + response.data.list[i].locker_no + response.data.list[i].stockroom + response.data.list[i].category + response.data.list[i].reg_time)) {
        preventDup.set(response.data.list[i].courier + response.data.list[i].locker_no + response.data.list[i].stockroom + response.data.list[i].category + response.data.list[i].reg_time, 1);
        var listitem = {};
        listitem.company = response.data.list[i].courier;
        listitem.box_no = response.data.list[i].locker_no;
        listitem.stockroom = response.data.list[i].stockroom;
        if(response.data.list[i].status === 'in'){
          listitem.status = 'IN';
        }else{
          listitem.status = 'OUT';
        }
        listitem.category = response.data.list[i].category;
        listitem.datetime = response.data.list[i].reg_time;
        addOrUpdateParcelReceivedListData(listitem);
      }
    }


    if(response.data.total > (response.data.start_index - 1) + count ){
       parcelObject.received_next_page = true;
    }else{
      parcelObject.received_next_page = false;
    }

    parcelObject.received_request_index = response.data.start_index  + count;
  }

  parcelObject.received_num = parcelObject.received.length;

  // console.log("parseParcelReceivedInfo() ", parcelObject.received.length, parcelObject.waiting_num, parcelObject.received_num, count, response.data.count, response.data.page, response.data.next_page, parcelObject.next_page, parcelObject.received_last_page, parcelObject.received_next_page);
}

function sendRequestExceptionHandlerForParcel() {
  if (serviceMain.currentDivString === "mainScreen" && parcelObject.card_status !== "loaded") {
    parcelObject.card_status = "unloaded";
    parcelService.drawCard();
    showRequestErrorDialog();
  }
}

/////////////////////// Banner 표시 ///////////////////////
 /** Initiate main banner */
function initParcelMainBanner() { // 반포레이안의 경우 표시 안함 index.js 에서 disable
  // console.log("initParcelMainBanner" + "() called...");
  var bannerId = "mainBanner_parcel";
  var bannerUri = "parcelCardOnClick()";

  document.getElementById('mainBannerWrapper').innerHTML +=
    "<div id='" + bannerId + "' class='swiper-slide mainBannerSwiper' onclick='" + bannerUri + "'></div>";
}


/////////////////////// main 에 보이는 favorite 카드에 대한 초기화 ///////////////////////
/** Initiate favorite card */
async function initParcelCard(index, cardInfo) {
  await new Promise(resolve => {
    let initHtml = "<div id='parcelCard' class='servicecards motion_card'></div>";
    document.getElementById('sortableDiv_' + index).innerHTML = initHtml;

    initHtml =
      "<div class='servicecards_title_space'>" +
      "<div id='parcelTitle'></div>" +
      "<div class='clear'></div>" +
      "</div>" +
      "<div class='servicecards_data_space'>" +
      "<div id='parcelData'></div>" +
      "</div>";

    document.getElementById('parcelCard').innerHTML = initHtml;

    if (document.getElementById('parcelTitle') === null) return false;
    document.getElementById('parcelTitle').innerHTML = drawServiceCardEditerImage($.lang[lang].PARCEL_TAB, "parcelTitleDetail", "subparcelTitleDetail");

    cardInfo.bEnabledCard = true;
    cardInfo.initCardOrder = index;
    cardInfo.nCardOrder = index;
    cardInfo.title = $.lang[lang].PARCEL_TAB;

    resolve();
  });

  return true;
}

/////////////////////// main 에 보이는 favorite 카드에 대한 draw ///////////////////////

var swiperParcelCard;
/** Draw favorite card */
function drawCardParcelInfo() {
  // console.log("drawCardParcelInfo" + "() called...");

  let parcelCardElement = document.getElementById('parcelCard');
  if (!parcelCardElement) return;
  let clone = parcelCardElement.cloneNode(true);
  parcelCardElement.parentNode.replaceChild(clone, parcelCardElement);
  if (clone) {
    clone.addEventListener('click', (e) => {
      e.stopPropagation();
      parcelObject.clicked_index = 0;
      parcelObject.clicked_id = 'parcelCardItem_0';
      parcelObject.originalclicked_id = 'parcelCardItem_0';
      if (e.composedPath()[1].id !== 'parcel_pagination') {
        parcelCardOnClick();
      }
    });
  }

  var waiting_num = parcelObject.waiting_num;

  var title;
  if (waiting_num !== 1) {
    title = $.lang[lang].PARCELCARD_TITLE_MULTIPLE.replace("%d", (waiting_num).fmodify("var(--brand-color)", 600));
  } else {
    title = $.lang[lang].PARCELCARD_TITLE_SINGLE.replace("%d", (waiting_num).fmodify("var(--brand-color)", 600));
  }

  if (document.getElementById('parcelTitle') == null) return;
  if (this.enabledMainBanner === true)
    document.getElementById('mainBanner_parcel').innerHTML = mainBannerTextForSwipe($.lang[lang].PARCEL_TAB, lang);

  let detail = document.getElementById('parcelTitleDetail');
  detail.innerHTML = title;
  detail.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    let config = { type: 'rippleC', cb: () => {
      parcelObject.clicked_index = 0;
      parcelObject.clicked_id = 'parcelCardItem_0';
      parcelObject.originalclicked_id = 'parcelCardItem_0';
      parcelCardOnClick();
    }};
    rippleManager.set(e, config);
  }, {passive: true});
  detail.onclick = (e) => { e.stopPropagation(); };

  document.getElementById('parcelData').innerHTML = "<div id='parcel_swiper' class='swiper-container'></div>";

  // parcel card 표시 animation 적용
  promiseAnimationEnd($('#parcel_swiper'), 'show_card');

  var dtIhtml = "";
  var cnt_per_page = 0;

  if (parcelObject.card_status === "unloaded") {
    // reload card 표시
    drawReloadCard("parcel_swiper", "others", retryLoadParcelCard);
  } else if (parcelObject.card_status === "loading") {
    // loading card 표시
    drawLoadingCard("parcel_swiper", "others");
  } else if (waiting_num === 0) {
    // no item case
    drawNoItemCard("parcel_swiper", "service/parcel/res/img/home_ic_status_delivery.png", $.lang[lang].NO_UNDELIVERED);
  } else {
    dtIhtml += "  <div id='parcel_swiper_wrapper' class='swiper-wrapper' onclick='event.cancelBubble=true;'>";
    let closedDiv = false;
    for (let index = 0, max = parcelObject.waiting_num; index < max; index++) {
      if (cnt_per_page === PARCEL_MAX_ITEM_NUM_IN_FAVORITE_PAGE) break; // 30개로 최대 favorite 카드에 표시 할 수 있는 수

      var status = parcelObject.waiting[index].status;
      if (status === "OUT" || status === "수령") continue;

      var box_no = parcelObject.waiting[index].box_no;
      var company = parcelObject.waiting[index].company;
      var category = parcelObject.waiting[index].category;

      if (cnt_per_page % parcelItemNumPerSwipe === 0) {
        dtIhtml += "<div class='swiper-slide'>";
      }

      dtIhtml += "<div id='parcelCardItem_" + index + "' class='parcel_boxes_favorite_list_div tv_servicecard_item_css'>";
      dtIhtml += "<div class='parcel_boxes_favorite_list_div_category_img_left tv_servicecard_parcel_item_image_css'>";
      //dtIhtml += applyCategoryImage(category, false);
      dtIhtml += applyBoxNoImage(box_no, false);
      dtIhtml += "</div>";
      dtIhtml += "<div class='parcel_boxes_favorite_list_top_div tv_servicecard_item_top_css'>";
      dtIhtml += "<span class='parcel_boxes_favorite_list_top_div_text_left tv_servicecard_item_title_css'>" + company + "</span>";
      dtIhtml += "<span class='parcel_boxes_favorite_list_top_div_text_right tv_servicecard_item_date_css'>" + parcelObject.waiting[index].datetime.toDateString() + "</span>";
      dtIhtml += "</div>";
      dtIhtml += "<div class='clear'></div>";
      dtIhtml += "<div class='parcel_boxes_favorite_list_bottom_div' >";
      dtIhtml += "<span class='parcel_boxes_favorite_list_bottom_div_text_left tv_servicecard_item_data_css'>" + box_no + "</span>";
      dtIhtml += "</div>";
      dtIhtml += "</div>";

      if (cnt_per_page % parcelItemNumPerSwipe >= parcelItemNumPerSwipe-1) {
        dtIhtml += "</div>";
        closedDiv = true;
      }
      cnt_per_page++;
    }

    if (closedDiv === true) {
      dtIhtml += "</div>";
    }

    dtIhtml += "</div>" + "<div class='clear'></div>";
    dtIhtml += "<div id='parcel_pagination' class='swiper-pagination' style='position:static;margin-top:6px;'></div>";

    document.getElementById('parcel_swiper').innerHTML = dtIhtml;

    let itemsList = document.getElementsByClassName('parcel_boxes_favorite_list_div');
    for (var i = 0; i < itemsList.length; i++) {
      itemsList[i].removeEventListener('touchstart', loadedParcelPageOnclickEvent, {passive: true});
      itemsList[i].addEventListener('touchstart', loadedParcelPageOnclickEvent, {passive: true});
    }
  }

  if (waiting_num > parcelItemNumPerSwipe) {
    if (swiperParcelCard) swiperParcelCard.destroy();
    swiperParcelCard = new Swiper('#parcel_swiper', {
      spaceBetween: 30,
      centeredSlides: true,
      pagination: {
        el: '#parcel_pagination',
        clickable: true
      }
    });

    resizeHandler.subscribe('resize', () => {
      $('.swiper-slide').css('width', '$(window).width()');
      setTimeout(() => swiperParcelCard.update(), RESIZE_DELAY);
    });
    resizeHandler.subscribe('resizeend', () => {
      swiperParcelCard.update();
    });
  }

  return true;
}

function retryLoadParcelCard() {
  updateParcelWaitingInfo(1);
  parcelService.drawCard();
}

/////////////////////// detail 페이지  초기화 ///////////////////////
/** Initiate page */
function initParcelPage() {
  // console.log("initParcelPage" + "() called...");

  var innerHTML = "";
  // innerHTML += "<div id='parcelPageTitle' class='parcelPageTitle_style'></div>";
  innerHTML += "<div id='parcelPageTab'>";
  innerHTML += "<div id='defaultOpen' class='parcel_boxes_detail_page_tablink_left'>" + $.lang[lang].UNDELIVERED + "</div>";
  innerHTML += "<div class='parcel_boxes_detail_page_tablink_right'>" + $.lang[lang].DELIVERED + "</div>";
  innerHTML += "<div class='clear'></div>";
  innerHTML += "</div>";
  innerHTML += "<div id='parcelPageWaiting' class='parcel_boxes_detail_page_tabcontent bounce end_effect'></div>";
  innerHTML += "<div id='parcelPageReceived' class='parcel_boxes_detail_page_tabcontent bounce end_effect'></div>";

  document.getElementById("parcelPage").innerHTML = innerHTML;

  addSwipeEventOnPage("parcelPageWaiting");
  addSwipeEventOnPage("parcelPageReceived");
}

function addSwipeEventOnPage(pageName) {
  var startX, startY, startT;
  $('#' + pageName).on('touchstart', function(e) {
    var touchstart = e.changedTouches[0];
    startX = touchstart.clientX;
    startY = touchstart.clientY;
    startT = e.timeStamp;
  });

  $('#' + pageName).on('touchend', function(e) {
    var touchend = e.changedTouches[0];
    var endX = touchend.clientX;
    var endY = touchend.clientY;
    var endT = e.timeStamp;

    var touchOffsetX = startX - endX;
    var timeOffsetT = endT - startT;

    if (Math.abs(touchOffsetX) >= 80 && Math.abs(startY - endY) <= 40 && timeOffsetT <= 350) {
      if ((touchOffsetX < 0) && (parcelObject.parcelPageShownTab !== "parcelPageWaiting")) {
        openPage("parcelPageWaiting");
      } else if ((touchOffsetX > 0) && (parcelObject.parcelPageShownTab !== "parcelPageReceived")) {
        openPage("parcelPageReceived");
      }
    }
  });
}

/////////////////////// detail 페이지에서 미수령, 수령 구분 버튼 style 적용해주는 함수 ///////////////////////
function openPage(pageName) {
  // console.log("openPage" + "() called...");
  parcelObject.parcelPageShownTab = pageName;
  var i, tabcontent, tablinks_left, tablinks_right;

  tabcontent = document.getElementsByClassName("parcel_boxes_detail_page_tabcontent");
  for (i = 0; i < tabcontent.length; i++) { // 두 개의 tab 의 content 에 대해서 일단 none 으로 안보이게 함
    tabcontent[i].style.display = "none";
  }

  tablinks_left = document.getElementsByClassName("parcel_boxes_detail_page_tablink_left");
  tablinks_right = document.getElementsByClassName("parcel_boxes_detail_page_tablink_right");

  // 미수령인 경우
  if (pageName === 'parcelPageWaiting') {
    tablinks_left[0].style = "color: var(--brand-color)!important; border-bottom: 1.5px solid var(--brand-color)!important;font-weight: bold;";
    tablinks_right[0].style = "color: #979797; opacity: 100%; border-bottom:1px solid #E6E6E6!important;font-weight: normal;";
    // 수령인 경우
  } else {
    tablinks_right[0].style = "color: var(--brand-color)!important; border-bottom: 1.5px solid var(--brand-color)!important;font-weight: bold;";
    tablinks_left[0].style = "color: #979797; opacity: 100%; border-bottom:1px solid #E6E6E6!important;font-weight: normal;";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // var parcelIddate = 'parcelPageItemdate_' + parcelObject.clicked_id.split("_")[1];
  var parcelId = 'parcelPageItem_' + parcelObject.originalclicked_id.split("_")[1];
  parcelObject.parcelIdisVisible = isVisible($('#' + parcelId).get(0));
  if (!isVisible($('#' + parcelId).get(0))) {
    $(".parcel_boxes_detail_page_tabcontent").scrollTo("#" + parcelId);
    parcelObject.clicked_id = "noselect";
  }

}

/////////////////////// detail 페이지에서 box_no 이미지 적용해주는 함수 ///////////////////////
// param flag - true : card view, false : detailed page
function applyBoxNoImage(box_no, flag) {
  var innerHTML = "";
  var className = 'parcel_boxes_list_img';

  innerHTML += "<span>";
  if (box_no === '관리사무소' || box_no === 'Office')
    innerHTML += "<img class='" + className + "' src='service/parcel/res/img/delivery_ic_office.png' alt=''></img>";
  else
    innerHTML += "<img class='" + className + "' src='service/parcel/res/img/delivery_ic_unmanned.png' alt=''></img>";

  innerHTML += "</span>";

  return innerHTML;
}

function applyBoxNoImageWaitingOnDetailedPage(box_no, index) {
  var innerHTML = "";
  var company = parcelObject.waiting[index].company;
  var datetime = parcelObject.waiting[index].datetime;
  // var box_no_ = parcelObject.waiting[index].box_no;

  innerHTML += "<div class='parcel_boxes_detail_page_list_top_div'>";
  innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_left'>" + company + "</span>";
  /*if (datetime.checkTodayYesterday() !== $.lang[lang].TODAY) {
    innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_right'>" + parcelObject.waiting[index].datetime.toDateTimeString() + "</span>";
  } else {*/
    innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_right'>" + parcelObject.waiting[index].datetime.toDateString() + "</span>";
  //}
  innerHTML += "</div>";
  innerHTML += "<div class='clear'></div>";

  innerHTML += "<div class='parcel_boxes_detail_page_list_bottom_div'>";
  innerHTML += "<div class='parcel_boxes_detail_page_list_bottom_div_text_left'>" + box_no + "</div>";
  innerHTML += "</div>";
  innerHTML += "  </div>";
  innerHTML += "  </div>";
  //innerHTML += "<div class='clear'></div>";

  return innerHTML;
}

function applyBoxNoImageReceivedOnDetailedPage(box_no, index) {
  var innerHTML = "";
  var company = parcelObject.received[index].company;
  var datetime = parcelObject.received[index].datetime;

  innerHTML += "<div class='parcel_boxes_detail_page_list_top_div'>";
  innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_left'>" + company + "</span>";
  /*if (datetime.checkTodayYesterday() !== $.lang[lang].TODAY) {
    innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_right'>" + parcelObject.received[index].datetime.toDateTimeString() + "</span>";
  } else {*/
    innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_right'>" + parcelObject.received[index].datetime.toDateString() + "</span>";
  //}
  innerHTML += "</div>";
  innerHTML += "<div class='clear'></div>";

  innerHTML += "<div class='parcel_boxes_detail_page_list_bottom_div'>";
  innerHTML += "<div class='parcel_boxes_detail_page_list_bottom_div_text_left'>" + box_no + "</div>";
  innerHTML += "</div>";
  innerHTML += "  </div>";
  innerHTML += "  </div>";
  //innerHTML += "<div class='clear'></div>";

  return innerHTML;
}

/////////////////////// detail 페이지에서 Category 이미지 적용해주는 함수 ///////////////////////
// param flag - true : card view, false : detailed page
function applyCategoryImage(category, flag) {
  var innerHTML = "";
  var className = 'parcel_boxes_list_img';

  innerHTML += "<span>";
  if (category === '식품' || category === 'Food')
    innerHTML += "<img class='" + className + "' src='service/parcel/res/img/delivery_ic_fresh.png' alt=''></img>";
  else if (category === '냉동' || category === 'Frozen')
    innerHTML += "<img class='" + className + "' src='service/parcel/res/img/delivery_ic_freezer.png' alt=''></img>";
  else if (category === '우편' || category === 'Post')
    innerHTML += "<img class='" + className + "' src='service/parcel/res/img/delivery_ic_mail.png' alt=''></img>";
  else
    innerHTML += "<img class='" + className + "' src='service/parcel/res/img/delivery_ic_default.png' alt=''></img>";

  innerHTML += "</span>";

  return innerHTML;
}

function applyCategoryImageWaitingOnDetailedPage(category, index) {
  var innerHTML = "";
  var box_no = parcelObject.waiting[index].box_no;
  var datetime = parcelObject.waiting[index].datetime;

  innerHTML += "<div class='parcel_boxes_detail_page_list_top_div'>";
  innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_left'>" + box_no + "</span>";
  if (datetime.checkTodayYesterday() !== $.lang[lang].TODAY) {
    innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_right'>" + parcelObject.waiting[index].datetime.toDateTimeString() + "</span>";
  } else {
    innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_right'>" + parcelObject.waiting[index].datetime.toDateString() + "</span>";
  }
  innerHTML += "</div>";
  innerHTML += "<div class='clear'></div>";

  innerHTML += "<div class='parcel_boxes_detail_page_list_bottom_div'>";
  innerHTML += "<div class='parcel_boxes_detail_page_list_bottom_div_text_left'>" + category + "</div>";
  innerHTML += "</div>";
  innerHTML += "  </div>";
  innerHTML += "  </div>";
  //innerHTML += "<div class='clear'></div>";

  return innerHTML;
}

function applyCategoryImageReceivedOnDetailedPage(category, index) {
  var innerHTML = "";
  var box_no = parcelObject.received[index].box_no;
  var datetime = parcelObject.received[index].datetime;

  innerHTML += "<div class='parcel_boxes_detail_page_list_top_div'>";
  innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_left'>" + box_no + "</span>";
  if (datetime.checkTodayYesterday() !== $.lang[lang].TODAY) {
    innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_right'>" + parcelObject.received[index].datetime.toDateTimeString() + "</span>";
  } else {
    innerHTML += "<span class='parcel_boxes_detail_page_list_top_div_text_right'>" + parcelObject.received[index].datetime.toDateString() + "</span>";
  }
  innerHTML += "</div>";
  innerHTML += "<div class='clear'></div>";

  innerHTML += "<div class='parcel_boxes_detail_page_list_bottom_div'>";
  innerHTML += "<div class='parcel_boxes_detail_page_list_bottom_div_text_left'>" + category + "</div>";
  innerHTML += "</div>";
  innerHTML += "  </div>";
  innerHTML += "  </div>";
  //innerHTML += "<div class='clear'></div>";

  return innerHTML;
}

/////////////////////// detail 페이지에서 로딩 아이콘 적용해주는 함수 ///////////////////////
function applyLoadingCircleOnDetailedPage(num, id) {
  var innerHTML = "";

  if (num !== 0) {
    innerHTML += "<div class='parcel_boxes_detail_page_loading_container'>";
    innerHTML += "<div id=" + id + " class='parcel_boxes_detail_page_loading'>";
    innerHTML += "<div style='text-align:center'>";
    innerHTML += "<img class='img' src='res/img/circle.png' alt=''/>";
    innerHTML += "</div>";
    innerHTML += "</div>";
    innerHTML += "</div>";
  }

  return innerHTML;
}

/////////////////////// detail 페이지에서 일별 목록 적용해주는 함수 ///////////////////////
function applyDailyListOnDetailedPage(index, temp_num, listType, check_data_group, status, check_data_group_count, category, box_no) {
  var innerHTML = "";
  var check_data_group_before_status = status;
  var waiting_num = parcelObject.waiting_num;
  var received_num = parcelObject.received_num;

  // console.log(index, "check_data_group=", check_data_group, "check_data_group_before_status=", check_data_group_before_status, check_data_group_count, category, box_no, parcelObject.parcel[index].datetime.toDateString(true));
  //console.log(listType, temp_num, parcelObject.received_num, parcelObject.waiting_num);
  // index = parcelObject.originalclicked_id.split("_")[1];
  //console.log(index, "check_data_group=", check_data_group, "check_data_group_before_status=", check_data_group_before_status, check_data_group_count, category, box_no);

  var keyID;
  if (listType === "OUT") keyID = 'parcelPageItem_'; // 추후 IN / OUT 변경 해야 함
  else keyID = 'parcelReceivedPageItem_';

  if (temp_num === 1) {
    innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_top'>";
  } else if (waiting_num === temp_num || received_num === temp_num) {
    innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_bottom'>";
  } else {
    innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_no_radius'>";
  }

  // if ((listType === "OUT" && waiting_num === temp_num && check_data_group_count === 1) || (listType === "IN" && received_num === temp_num && check_data_group_count === 1)) {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div'>";
  // } else if (check_data_group === false && check_data_group_before_status === false && check_data_group_count >= 0) {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div'>";
  //   check_data_group_before_status = false;
  // } else if (check_data_group === true && check_data_group_before_status === false && check_data_group_count === 1 && temp_num !== waiting_num && temp_num !== received_num) {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_top'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_top'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_top'>";
  //   check_data_group_before_status = true;
  // } else if (check_data_group === true && check_data_group_before_status === false && check_data_group_count === 1 && temp_num === waiting_num && temp_num !== received_num && listType === "OUT") {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div'>";
  // } else if (check_data_group === true && check_data_group_before_status === false && check_data_group_count === 1 && temp_num !== waiting_num && temp_num === received_num && listType === "IN") {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div'>";
  // } else if (check_data_group === true && check_data_group_before_status === false && check_data_group_count === 1) {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_top'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_top'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_top'>";
  //   check_data_group_before_status = true;
  // } else if (check_data_group === true && check_data_group_before_status === false && check_data_group_count === 2 && index % 2 === 1) {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_top'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_top'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_top'>";
  //   check_data_group_before_status = true;
  // } else if (check_data_group === true && check_data_group_before_status === false && check_data_group_count === 2 && index % 2 === 0) {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div'>";
  //   check_data_group_before_status = false;
  // } else if (check_data_group === false && check_data_group_before_status === true && check_data_group_count >= 0) {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_bottom'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_bottom'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_bottom'>";
  //   check_data_group_before_status = false;
  // } else if (check_data_group === true && check_data_group_before_status === true && check_data_group_count === 1) {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_bottom'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_bottom'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_bottom'>";
  //   check_data_group_before_status = true;
  // } else if (check_data_group === true && check_data_group_before_status === true && check_data_group_count === 2 && temp_num !== waiting_num && temp_num !== received_num) {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_no_radius'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_no_radius'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_no_radius'>";
  //   check_data_group_before_status = true;
  // } else if (check_data_group === true && check_data_group_before_status === true && check_data_group_count === 2 && temp_num === waiting_num && temp_num !== received_num && listType === "OUT") {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_bottom'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_bottom'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_bottom'>";
  //   check_data_group_before_status = true;
  // } else if (check_data_group === true && check_data_group_before_status === true && check_data_group_count === 2 && temp_num !== waiting_num && temp_num === received_num && listType === "IN") {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_bottom'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_bottom'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_bottom'>";
  //   check_data_group_before_status = true;
  // } else if (check_data_group === true && check_data_group_before_status === true && check_data_group_count > 2 && temp_num !== waiting_num && temp_num !== received_num) {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_no_radius'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_no_radius'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_no_radius'>";
  //   check_data_group_before_status = true;
  // } else if (check_data_group === true && check_data_group_before_status === true && check_data_group_count > 2 && temp_num === waiting_num && temp_num !== received_num && listType === "OUT") {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_bottom'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_bottom'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_bottom'>";
  //   check_data_group_before_status = true;
  // } else if (check_data_group === true && check_data_group_before_status === true && check_data_group_count > 2 && temp_num !== waiting_num && temp_num === received_num && listType === "IN") {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_bottom'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_bottom'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_bottom'>";
  //   check_data_group_before_status = true;
  // } else {
  //   // innerHTML += "<div id='parcelPageItem_" + index + "' class='parcel_boxes_detail_page_list_div_no_radius'>";
  //   innerHTML += "<div id=" + keyID + index + " class='parcel_boxes_detail_page_list_div_no_radius'>";
  //   // innerHTML += "<div class='parcel_boxes_detail_page_list_div_no_radius'>";
  // }

  innerHTML += "<div class='parcel_boxes_detail_page_list_div_category_img_left'>";
  //innerHTML += applyCategoryImage(category, false);
  innerHTML += applyBoxNoImage(box_no, false);
  innerHTML += "</div>";

  return { innerHTML: innerHTML, check_data_group_before_status: check_data_group_before_status };
}

/////////////////////// detail 페이지에서 일별 목록 그리는 함수(미수령) ///////////////////////
/** Draw daily undeliveried list on detailed page */
function drawDailyWaitingListOnDetailedPage(listType, NumofIteminPage) {
  //  console.log("drawDailyWaitingListOnDetailedPage" + "() called...");
  var innerHTML = "";
  var count = 0;
  var check_data_group_count = 0;
  var check_data_group_before_status = false; // 이전과 동일한 날짜 였으면 true
  var check_data_group = false; // 다음 item 과 group을 묶어야 한다는 의미에서의 true

  var tmp_num = 0;
  for (let index = 0, max = parcelObject.waiting_num; index < max; index++) {
    var status = parcelObject.waiting[index].status;
    if (listType === "OUT") {
      if (status === "OUT" || status === "수령") continue;
    } else {
      if (status === "IN" || status === "미수령") continue;
    }

    if (NumofIteminPage <= tmp_num) continue;

    var box_no = parcelObject.waiting[index].box_no;
    var category = parcelObject.waiting[index].category;
    if (box_no === undefined) box_no = "";

    tmp_num++;

    // console.log("parcelObject.originalclicked_id = ", parcelObject.originalclicked_id);
    // console.log(index, check_data_group_count, count, max, tmp_num, parcelObject.received_num, parcelObject.waiting_num, check_data_group_before_status, check_data_group, parcelObject.clicked_index, parcelObject.clicked_id);
    // console.log(index + 1, check_data_group_count, check_data_group_before_status, check_data_group,parcelObject.clicked_index, parcelObject.clicked_id);

    if (tmp_num != 1) {
      innerHTML += "<div  style='background-color:white; margin-left: 12px;  margin-right: 12px'>";
      innerHTML += "<div class='parcel_boxes_detail_page_list_divider'></div>";
      innerHTML += "</div>";
    }

    count = 0;

    if (listType === "IN") {
      while (true) {
        if ((index + count) == max - 1) {
          count = 0;
          break;
        }
        count++;
        // console.log("IN", index, count, max);
        if (parcelObject.waiting[index + count].status === "OUT" || parcelObject.waiting[index + count].status === "수령") {
          break;
        }
      }
    } else {
      while (true) {
        if ((index + count) == max - 1) {
          count = 0;
          break;
        }
        count++;
        // console.log("OUT", index, count, max);
        if (parcelObject.waiting[index + count].status === "IN" || parcelObject.waiting[index + count].status === "미수령") {
          break;
        }
      }
    }

    var datetime = parcelObject.waiting[index].datetime;
    // if (check_data_group === false) {
    //   var className = "parcel_boxes_detail_page_list_group_date_header";
    //   // innerHTML += "<div style='border: 1px solid gold'>"; // DIV 구분선 테스트를 위해

    //   if (index <= Number(getClickedIdNumber(parcelObject.originalclicked_id)) && parcelObject.clicked_id != "noselect" && listType === "OUT") {
    //     parcelObject.clicked_id = parcelObject.clicked_id.replace(getClickedIdNumber(parcelObject.clicked_id), index);
    //   }

    //   if (datetime.checkTodayYesterday() !== $.lang[lang].TODAY) {
    //     innerHTML += "<div id='parcelPageItemdate_" + index + "' class=" + className + ">";
    //     innerHTML += "<div class='parcel_boxes_detail_page_list_group_date_header_text'>";
    //     innerHTML += datetime.toDateString(true);
    //     innerHTML += "</div>";
    //     innerHTML += "<div class='parcel_boxes_detail_page_list_group_date_header_divider'>";
    //     innerHTML += "</div>";
    //     innerHTML += "</div>";
    //     innerHTML += "<div class='clear'></div>";
    //   }
    //   innerHTML += "<div>";
    // }

    // console.log(index, count, max, "tmp_num=", tmp_num, "received_num=", parcelObject.received_num, "waiting_num=", parcelObject.waiting_num);
    if (index + count < max) {
      if (parcelObject.waiting[index + count].datetime.isSameDay(datetime)) {
        check_data_group = true;
        // check_data_group_before_status = true;
        check_data_group_count++;
      } else {
        check_data_group = false;
        // check_data_group_before_status = false;
        if (check_data_group_count > 0)
          // check_data_group_count--;
          check_data_group_count = 0;
      }
    }

    var ret = applyDailyListOnDetailedPage(index, tmp_num, listType, check_data_group, check_data_group_before_status, check_data_group_count, category, box_no);
    innerHTML += ret.innerHTML;
    check_data_group_before_status = ret.check_data_group_before_status;

    //innerHTML += applyCategoryImageWaitingOnDetailedPage(category, index);
    innerHTML += applyBoxNoImageWaitingOnDetailedPage(box_no, index);

    if (check_data_group == true) {
      innerHTML += "  </div>";
    }
  }

  innerHTML += "<div class='parcel_boxes_detail_page_list_bottom'>";
  innerHTML += "</div>";

  innerHTML += "</div>";

  return innerHTML;
}

/////////////////////// detail 페이지에서 일별 목록 그리는 함수(수령) ///////////////////////
/** Draw daily deliveried list on detailed page */
function drawDailyReceivedListOnDetailedPage(listType, NumofIteminPage) {
  //  console.log("drawDailyReceivedListOnDetailedPage" + "() called...");
  var innerHTML = "";
  var count = 0;
  var check_data_group_count = 0;
  var check_data_group_before_status = false; // 이전과 동일한 날짜 였으면 true
  var check_data_group = false; // 다음 item 과 group을 묶어야 한다는 의미에서의 true

  var tmp_num = 0;
  for (let index = 0, max = parcelObject.received_num; index < max; index++) {
    var status = parcelObject.received[index].status;
    if (listType === "OUT") {
      if (status === "OUT" || status === "수령") continue;
    } else {
      if (status === "IN" || status === "미수령") continue;
    }

    // if (NumofIteminPage <= tmp_num) continue;

    var box_no = parcelObject.received[index].box_no;
    var category = parcelObject.received[index].category;
    if (box_no === undefined) box_no = "";

    tmp_num++;

    // console.log("parcelObject.originalclicked_id = ", parcelObject.originalclicked_id);
    // console.log(index, check_data_group_count, count, max, tmp_num, parcelObject.received_num, parcelObject.waiting_num, check_data_group_before_status, check_data_group, parcelObject.clicked_index, parcelObject.clicked_id);
    // console.log(index + 1, check_data_group_count, check_data_group_before_status, check_data_group,parcelObject.clicked_index, parcelObject.clicked_id);

    if (tmp_num != 1) {
      innerHTML += "<div  style='background-color:white; margin-left: 12px;  margin-right: 12px'>";
      innerHTML += "<div class='parcel_boxes_detail_page_list_divider'></div>";
      innerHTML += "</div>";
    }

    count = 0;

    if (listType === "IN") {
      while (true) {
        if ((index + count) == max - 1) {
          count = 0;
          break;
        }
        count++;
        // console.log("IN", index, count, max);
        if (parcelObject.received[index + count].status === "OUT" || parcelObject.received[index + count].status === "수령") {
          break;
        }
      }
    } else {
      while (true) {
        if ((index + count) == max - 1) {
          count = 0;
          break;
        }
        count++;
        // console.log("OUT", index, count, max);
        if (parcelObject.received[index + count].status === "IN" || parcelObject.received[index + count].status === "미수령") {
          break;
        }
      }
    }

    var datetime = parcelObject.received[index].datetime;
    // if (check_data_group === false) {
    //   var className = "parcel_boxes_detail_page_list_group_date_header";
    //   // innerHTML += "<div style='border: 1px solid gold'>"; // DIV 구분선 테스트를 위해

    //   if (index <= Number(getClickedIdNumber(parcelObject.originalclicked_id)) && parcelObject.clicked_id != "noselect" && listType === "OUT") {
    //     parcelObject.clicked_id = parcelObject.clicked_id.replace(getClickedIdNumber(parcelObject.clicked_id), index);
    //   }

    //   if (datetime.checkTodayYesterday() !== $.lang[lang].TODAY) {
    //     innerHTML += "<div id='parcelPageItemdate_" + index + "' class=" + className + ">";
    //     innerHTML += "<div class='parcel_boxes_detail_page_list_group_date_header_text'>";
    //     innerHTML += datetime.toDateString(true);
    //     innerHTML += "</div>";
    //     innerHTML += "<div class='parcel_boxes_detail_page_list_group_date_header_divider'>";
    //     innerHTML += "</div>";
    //     innerHTML += "</div>";
    //     innerHTML += "<div class='clear'></div>";
    //   }
    //   innerHTML += "<div>";
    // }

    // console.log(index, count, max, "tmp_num=", tmp_num, "received_num=", parcelObject.received_num, "waiting_num=", parcelObject.waiting_num);

    if (index + count < max) {
      if (parcelObject.received[index + count].datetime.isSameDay(datetime)) {
        check_data_group = true;
        // check_data_group_before_status = true;
        check_data_group_count++;
      } else {
        check_data_group = false;
        // check_data_group_before_status = false;
        if (check_data_group_count > 0)
          // check_data_group_count--;
          check_data_group_count = 0;
      }
    }

    var ret = applyDailyListOnDetailedPage(index, tmp_num, listType, check_data_group, check_data_group_before_status, check_data_group_count, category, box_no);
    innerHTML += ret.innerHTML;
    check_data_group_before_status = ret.check_data_group_before_status;

    //innerHTML += applyCategoryImageReceivedOnDetailedPage(category, index);
    innerHTML += applyBoxNoImageReceivedOnDetailedPage(box_no, index);

    if (check_data_group == true) {
      innerHTML += "  </div>";
    }
  }

  innerHTML += "<div class='parcel_boxes_detail_page_list_bottom'>";
  innerHTML += "</div>";

  innerHTML += "</div>";

  return innerHTML;
}

/////////////////////// (수령) 택배 페이지 로드 ///////////////////////
/** Load deliveried list on detailed page */
function loadDeliveredPage(NumofIteminPage) {
  // console.log("loadDeliveredPage" + "() called...");

  var innerHTML = "";
  var received_num = parcelObject.received_num;
  var waiting_num = parcelObject.waiting_num;

  innerHTML += "<div class='parcel_boxes_detail_page_header'>";

  // undelivered package case only
  var waiting_num = parcelObject.waiting_num;
  var title;
  if (waiting_num == 1) {
    title = $.lang[lang].PARCELCARD_BODY_SINGLE.replace("%d", (waiting_num).fmodify("var(--brand-color)", 600));
  } else if(waiting_num == 0){
    title = $.lang[lang].NO_UNDELIVERED.replace("%d", (waiting_num).fmodify("var(--brand-color)", 600));
  } else {
    title = $.lang[lang].PARCELCARD_BODY_MULTIPLE.replace("%d", (waiting_num).fmodify("var(--brand-color)", 600));
  }

  innerHTML += title;
  innerHTML += "</div>";

  if (received_num !== 0) {
    innerHTML += drawDailyReceivedListOnDetailedPage("IN", NumofIteminPage); // 잘못된 값 type
  } else { // no item case - deleted on UX v2.1
  }

  var id = 'DeliveredparcelNextPageLoading';
  // var id = 'parcelNextPageLoading';
  var id_flag = '#' + id;
  innerHTML += applyLoadingCircleOnDetailedPage(received_num, id);

  document.getElementById("parcelPageReceived").innerHTML = innerHTML;

  $(id_flag).on('inview', function (event, visible, visiblePartX, visiblePartY) {
    if (visible) {
      $(id_flag).off('inview');
      document.getElementById(id).style.display = "none";

      if (parcelObject.received_next_page) {
        setTimeout(updateParcelReceivedInfo(parcelObject.received_request_index), 0);
      } else {
        //   setTimeout(loadDeliveredPage(NumofIteminPage + parcelObject.num_of_item_in_page), 0);
      }
    }
  });
}

/////////////////////// (미수령) 택배 페이지 로드 ///////////////////////
/** Load undeliveried list on detailed page */
function loadUndeliveredPage(NumofIteminPage) {
  // console.log("loadUndeliveredPage" + "() called...");
  var innerHTML = "";
  var waiting_num = parcelObject.waiting_num;

  innerHTML += "<div class='parcel_boxes_detail_page_header'>";

  // undelivered package case only
  var waiting_num = parcelObject.waiting_num;
  var title;
  if (waiting_num == 1) {
    title = $.lang[lang].PARCELCARD_BODY_SINGLE.replace("%d", (waiting_num).fmodify("var(--brand-color)", 600));
  } else if(waiting_num == 0){
    title = $.lang[lang].NO_UNDELIVERED.replace("%d", (waiting_num).fmodify("var(--brand-color)", 600));
  } else {
    title = $.lang[lang].PARCELCARD_BODY_MULTIPLE.replace("%d", (waiting_num).fmodify("var(--brand-color)", 600));
  }

  innerHTML += title;
  innerHTML += "</div>";

  if (waiting_num !== 0) {
    innerHTML += drawDailyWaitingListOnDetailedPage("OUT", NumofIteminPage); // 잘못된 값 type
  } else { // no item case - deleted on UX v2.1
  }

  var id = 'UndeliveredparcelNextPageLoading';
  var id_flag = '#' + id;
  innerHTML += applyLoadingCircleOnDetailedPage(waiting_num, id);

  document.getElementById("parcelPageWaiting").innerHTML = innerHTML;

  $(id_flag).on('inview', function (event, visible, visiblePartX, visiblePartY) {
    if (visible) {
      $(id_flag).off('inview');
      document.getElementById(id).style.display = "none";

      if (NumofIteminPage < waiting_num) {
        loadUndeliveredPage(NumofIteminPage + parcelObject.num_of_item_in_page);
        return;
      }

      // console.log(NumofIteminPage, parcelObject.total_num, waiting_num);
      // console.log("loadUndeliveredPage" + "() called...", parcelObject.clicked_index, parcelObject.clicked_id);
      if (waiting_num <= 30) {
        if (parcelObject.clicked_id != "noselect") {
          // console.log("(2) offset.top = ", $("#" + parcelObject.clicked_id).offset().top);
          $("#parcel_boxes_detail_page_tabcontent").scrollTo("#" + parcelObject.clicked_id);
          parcelObject.clicked_id = "noselect"; // 초기화
          // parcelObject.clicked_id = parcelObject.originalclicked_id;
          // console.log("set noselect");
        }
      }
    }
  });
}

/** Load title on detailed page */
function loadTitle() {
  var innerHTML = "";
  innerHTML += "<div class='parcel_boxes_detail_page_header'>";

  // undelivered package case only
  var waiting_num = parcelObject.waiting_num;
  var title;
  if (waiting_num == 1) {
    title = $.lang[lang].PARCELCARD_BODY_SINGLE.replace("%d", (waiting_num).fmodify("var(--brand-color)", 600));
  } else if(waiting_num == 0){
    title = $.lang[lang].NO_UNDELIVERED.replace("%d", (waiting_num).fmodify("var(--brand-color)", 600));
  } else {
    title = $.lang[lang].PARCELCARD_BODY_MULTIPLE.replace("%d", (waiting_num).fmodify("var(--brand-color)", 600));
  }

  innerHTML += title;
  innerHTML += "</div>";
  document.getElementById("parcelPageTitle").innerHTML = innerHTML;
}


/////////////////////// detail 페이지 그리기 ///////////////////////
/** Draw detailed page with title and daily list */
function drawParcelPage() {
  // console.log("drawParcelPage" + "() called...");
  // console.log("drawParcelPage" + "() called...", parcelObject.clicked_index, parcelObject.clicked_id);

  // loadTitle();

  loadUndeliveredPage(parcelObject.num_of_item_in_page); // 미수령 택배 페이지 로드

  if (parcelObject.received_num === 0) {
    updateParcelReceivedInfo(1); // 수령 데이터를 받기 위해 호출
  } else {
    loadDeliveredPage(parcelObject.num_of_item_in_page); // 수령 택배 페이지 로드
  }

  if (!parcelObject.next_page) {
    openPage('parcelPageWaiting');
  }

}

function addOrUpdateParcelWaitingListData(obj) {
  //console.log("addOrUpdateParcelListData" + "() called...");
  let index = -1; // 무조건 새로운 데이터
  // var index = parcelObject.parcel.findIndex((e) => e.reg_num === obj.reg_num);
  if (index === -1) {
    let new_len = parcelObject.waiting.push(obj);
    index = new_len - 1;
    // console.log(index);
  } else {
    if (obj.company !== undefined) parcelObject.waiting[index].company = obj.company;
    if (obj.box_no !== undefined) parcelObject.waiting[index].box_no = obj.box_no;
    if (obj.status !== undefined) parcelObject.waiting[index].status = obj.status;
    if (obj.category !== undefined) parcelObject.waiting[index].category = obj.category;
    if (obj.datetime !== undefined) parcelObject.waiting[index].datetime = obj.datetime;
  }
  // console.log(parcelObject.waiting);
  return index;
}

function addOrUpdateParcelReceivedListData(obj) {
  //console.log("addOrUpdateParcelListData" + "() called...");
  let index = -1; // 무조건 새로운 데이터
  // var index = parcelObject.parcel.findIndex((e) => e.reg_num === obj.reg_num);
  if (index === -1) {
    let new_len = parcelObject.received.push(obj);
    index = new_len - 1;
  } else {
    if (obj.company !== undefined) parcelObject.received[index].company = obj.company;
    if (obj.box_no !== undefined) parcelObject.received[index].box_no = obj.box_no;
    if (obj.status !== undefined) parcelObject.received[index].status = obj.status;
    if (obj.category !== undefined) parcelObject.received[index].category = obj.category;
    if (obj.datetime !== undefined) parcelObject.received[index].datetime = obj.datetime;
  }
  return index;
}


/* TV API */
function initParcelCardForTV(index, cardInfo){
  let initHtml = "<div id='parcelCard' class='servicecards motion_card' style='float:left' ></div>";
  document.getElementById('sortableDiv_' + index).innerHTML = initHtml;

  initHtml =
    "<div class='tv_servicecard_title_css'>택배</div>" +
    "<div id='parcelPageTitle'></div>" +
    "<div id='parcelcards_title_space' class='servicecards_title_space'>" +
    "<div id='parcelTitle'></div>" +
    "<div class='clear'></div>" +
    "</div>" +
    "<div id='parcelcards_' class='servicecards_data_space'>" +
    "<div id='parcelData'></div>" +
    "</div>";

  document.getElementById('parcelCard').innerHTML = initHtml;


  if (document.getElementById('parcelTitle') === null) return false;
  document.getElementById('parcelTitle').innerHTML = drawServiceCardEditerImage($.lang[lang].PARCEL_TAB, "parcelTitleDetail", "subparcelTitleDetail");

  cardInfo.bEnabledCard = true;
  cardInfo.initCardOrder = index;
  cardInfo.nCardOrder = index;
  cardInfo.title = $.lang[lang].PARCEL_TAB;
  parcelItemNumPerSwipe = 5;

  return true;
}

function drawParcelCardForTV(){

  if(!parcelObject.waiting_num){
    document.getElementById("parcelTitleDetail").innerHTML = "";
    $("#parcelCard").css("padding-left","6px");
    $("#parcelCard").fadeOut(1);
    $("#parcelCard").fadeIn(1000);
    return;
  }


  loadTitle();
  $(".parcel_boxes_detail_page_header").css("font-weight","bold");

  drawCardParcelInfo();

  if(swiperParcelCard){
    swiperParcelCard.pagination.el.hidden = true;
  }

  document.getElementById("parcelTitleDetail").innerHTML = "";
  $("#parcelcards_title_space").css("height","0px");
  $("#parcelPageTitle").css("margin","40px 0px -4px 0px");
  $("#parcel_swiper").css("padding","0px 0px 0px 0px");
  $("#parcelCard").css("padding-left","6px");
  $("#parcelCard").css("padding-right","0px");

  redrawMainScreenForTV();

}
