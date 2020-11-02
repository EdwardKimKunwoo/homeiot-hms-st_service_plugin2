/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Parking service shows parking location and entrance records.
 * @module service/parking/main
 * @author Home IoT R&D Team
 */


const MAX_LOC = 4;
const MAX_HIS = 9;

// scroll 이 멈췄을 때 상단에 title bar 에 대한 정보 변경을 위한
$.fn.scrollStopped = function(callback) {
  let that = this, $this = $(that);
  $this.scroll(function(ev) {
    clearTimeout($this.data('scrollTimeout'));
    $this.data('scrollTimeout', setTimeout(callback.bind(that), 1000, ev));
  });
};


function checkVisible(elm) {
  let scrollTop = $(window).scrollTop();
  let nowY = $(elm).offset().top;

  if (nowY <= 49) {
    prevY = nowY;
  }

  return (nowY <= (scrollTop + 49));
}

/** load page */
function loadedParkingPage(service) {
  drawActionBar(false);

  initParkingPage();
  // showContentLoadingPage(true, parkingService);
  drawParkingPage();

  if (ParkingLocationEnabled && ParkingHistoryEnabled) {
    $('#parkingPage').scrollStopped(function(ev) {
      let text = document.getElementById('actionBarTitle_detailed');
      if (text) {
        if (checkVisible($("#parkingHistoryPage"))) {
          text.childNodes[0].setAttribute('class', 'up');
          text.childNodes[1].setAttribute('class', 'up');
          text.childNodes[1].style.visibility = 'visible';
        } else {
          if (prevY < 50) {
            text.childNodes[0].setAttribute('class', 'down');
            text.childNodes[1].setAttribute('class', 'down');
          }
        }
      }
    });
  }

  if (isFHub()) {
    scplugin.manager.setFlag("openAdditionalPage");
  }

  return 0;
}


function parkingCardOnclickEvent(e, clickedIndex, clickedObj, type) {
  console.log("parkingCardOnclickEvent" + "() called...");

  if (e.target.parentNode.id === "parkingLocationPagination"
    || e.target.parentNode.id === "parkingHistoryPagination") {
    return;
  }

  parkingObject.clicked_index = clickedIndex;

  if (clickedObj) {
    parkingObject.clicked_id = clickedObj.id;
  }

  if (type === true) {
    parkingObject.clicked_type = true;
  } else {
    parkingObject.clicked_type = false;
  }

  let subService = "location";
  let path = e.composedPath();
  if (path[1].id.indexOf('parkingHistory') !== -1 || parkingObject.clicked_id.indexOf('parkingHistory_') !== -1
    || path[0].id === 'parkingHistoryCard' || path[3].id === 'parkingHistoryCard' || path[4].id === 'parkingHistoryCard') {
    subService = 'history';
  }

  if (path[1].id === 'parkingLocationTitle' || path[1].id === 'parkingHistoryTitle') {
    let config = {
      type: 'rippleC',
      cb: () => { parkingCardOnClick(subService); }
    };
    rippleManager.set(e, config);
  } else if (path[1].id === 'parkingLocationCard' || path[1].id === 'parkingHistoryCard'
    || path[2].id === 'parkingLocationCard' || path[2].id === 'parkingHistoryCard'
    || path[3].id === 'parkingLocationCard' || path[3].id === 'parkingHistoryCard'
    || path[0].id.indexOf('noitem') != -1
    || subService === 'location' && parkingObject.locationNum === 0
    || subService === 'history' && parkingObject.historyNum === 0) {
    parkingCardOnClick(subService);
  } else if (parkingObject.clicked_id.indexOf('parkingLocation_') != -1
    || parkingObject.clicked_id.indexOf('parkingHistory_') != -1) {
    let config = {cb: () => { parkingCardOnClick(subService); }};
    rippleManager.set(e, config);
  }
}


function createParkingOptionMenu(service) {
  let parkingMenuArr = {
    menuItem: []
  };

  console.debug(PACKAGE, "mainScreen", "createOptionMenu");
  setActionBarMenu("visible");
/*
  addPageMenu("add", parkingMenuArr.menuItem, $.lang[lang].PARKING_LOCATION_TAB + " " + $.lang[lang].ADDHOMECARD, service.cardInfo.list[0]);
  addPageMenu("remove", parkingMenuArr.menuItem, $.lang[lang].PARKING_LOCATION_TAB + " " +$.lang[lang].REMOVEHOMECARD, service.cardInfo.list[0]);
  addPageMenu("add", parkingMenuArr.menuItem, $.lang[lang].PARKING_HISTORY_TAB + " " + $.lang[lang].ADDHOMECARD, service.cardInfo.list[1]);
  addPageMenu("remove", parkingMenuArr.menuItem, $.lang[lang].PARKING_HISTORY_TAB + " " +$.lang[lang].REMOVEHOMECARD, service.cardInfo.list[1]);
*/
  setMenu(parkingMenuArr.menuItem, service);

  return parkingMenuArr;
}


/************ Parking Data ************/


function requestParkingPage(pageNum) { // page 수를 늘려가면서 데이터를 추가적으로 가져오도록 하기 위해 pageNum 값 정의
  setTimeout(window.requestParkingHistory(pageNum), 0);
}


function requestParkingHistory(pageNum) { // page 수를 늘려가면서 데이터를 추가적으로 가져오도록 하기 위해 pageNum 값 정의
  // console.log("requestParkingHistory()");
  parkingObject.historycard_status = "loading";

  let requestBody = rsapi_getParkingHistory("all", pageNum, parkingObject.requestHistoryNum); // (parkingObject.requestHistoryNum) min: 9, max 99, 서버에 요청하는 데이터의 최소단위
  //pluginService.sendRequest(requestBody, updateParkingHistoryCallback);
	promiseSendRequestWithTimeout(requestBody)
	.then((response) => updateParkingHistoryCallback(response))
	.catch((e) => sendRequestExceptionHandlerForHistory());
}


function parseParkingLocation(response) {
  //ParkingObject.userInfoTitle = response.apt_complex+ " " + response.building + "-" +response.unit;
  if (response.result.status === RESPONSE_OK) { // ok
    let preventDup = new Map([]);
    let realNum = response.data.list.length;
    let idx = 0;
    for (let i = 0; i < response.data.list.length; i++) {
      if (!preventDup.has(response.data.list[i].car_no)) {
        preventDup.set(response.data.list[i].car_no, 1);
        parkingObject.carlocationlist[idx++] = response.data.list[i];
        continue;
      }
      realNum--;
    }
    parkingObject.locationNum = realNum;
  } else if (response.result.status === RESPONSE_NO_DATA) { // no data
    parkingObject.locationNum = 0;
  } else {
    parkingObject.locationNum = 0;
    // Error Exception
    throw new Error(response.result.message);
  }
  parkingObject.locationcard_status = "loaded";
  parkingObject.cardloaded = true;
}


function parseParkingHistory(response) {
  if (response.result.status === RESPONSE_OK && response.data) { // okay
    let preventDup = new Map([]);
    let realNum = parseInt(response.data.count);
    for (let i = 0; i < parseInt(response.data.count); i++) {
      if (!preventDup.has(response.data.list[i].car_no + response.data.list[i].reg_time)
      && (response.data.list[i].car_no || response.data.list[i].status)) {
        preventDup.set(response.data.list[i].car_no + response.data.list[i].reg_time, 1);
        let listitem = {};
        listitem.car_no = response.data.list[i].car_no;
        listitem.nickname = response.data.list[i].nickname;
        listitem.status = response.data.list[i].status;
        listitem.reg_time = response.data.list[i].reg_time;
        parkingObject.carhistorylist.push(listitem); // 데이터를 추가적으로 push 하기 위함 add 및 update
        continue;
      }
      realNum--;
    }

    let request_index = response.data.start_index + response.data.count;

    if (request_index < response.data.total) {
      parkingObject.history_next_page = true;
      parkingObject.request_index = request_index;
    } else {
      parkingObject.history_next_page = false;
      parkingObject.request_index = response.data.total;
    }

    parkingObject.historyNum = realNum;
  } else if (response.result.status === RESPONSE_NO_DATA) { // no data
    parkingObject.historyNum = 0;
  } else {
    parkingObject.historyNum = 0;
    // Error Exception
    throw new Error(response.result.message);
  }
  parkingObject.historycard_status = "loaded";
  parkingObject.cardloaded = true;
}


function sendRequestExceptionHandlerForHistory() {
  if (parkingObject.historycard_status !== "loaded") {
    parkingObject.historycard_status = "unloaded";
    if (serviceMain.currentDivString === "mainScreen") {
      parkingService.drawCard();
    } else if (serviceMain.currentDivString === "parkingPage" && parkingObject.historyNum === 0) {
      drawParkingHistoryPage();
    }
    showRequestErrorDialog();
  }
}


function sendRequestExceptionHandlerForLocation() {
  if (parkingObject.locationcard_status !== "loaded") {
    parkingObject.locationcard_status = "unloaded";
    if (serviceMain.currentDivString === "mainScreen") {
      drawParkingLocationCard();
    } else if (serviceMain.currentDivString === "parkingPage") {
      drawParkingLocationPage();
    }
    showRequestErrorDialog();
  }
}


function updateParkingLocation() {
  // console.log("updateParkingLocation() +");
  parkingObject.locationcard_status = "loading";

  let requestBody = rsapi_getParkingLocation(); // min 15, Favorite 카드의 min 값
  //pluginService.sendRequest(requestBody, updateParkingLocationCallback);
  promiseSendRequestWithTimeout(requestBody)
	.then((response) => updateParkingLocationCallback(response))
	.catch((e) => sendRequestExceptionHandlerForLocation());
}


function updateParkingLocationCallback(response) {
  parseParkingLocation(response);
  if (serviceMain.currentDivString === "mainScreen") {
    drawParkingLocationCard();
  } else if (serviceMain.currentDivString === "parkingPage") {
    drawParkingLocationPage();
  }
  clearTimeout(firstLoadingTimer);
}


function updateParkingHistoryCallback(response) {
  parseParkingHistory(response);
  parkingService.drawCard();
  hideParkingPage();
  clearTimeout(firstLoadingTimer);

  if (parkingObject.clicked_index !== 0) { // clicked_index 가 0이라는 것은 처음 호출되었다는 말임
    drawParkingHistoryPage(parkingObject.historyNum + parkingObject.itemsInCard);
  }
}


function hideParkingPage() {
  // if (parkingObject.spaceloaded === true) {
  if (parkingObject.historycard_status === "loaded") {
    parkingObject.pageloaded = true;
    showContentLoadingPage(false);
  }
  // }
}


function retryLoadParkingHistoryCard() {
  requestParkingHistory(1)
  if (serviceMain.currentDivString === "mainScreen") {
    parkingService.drawCard();
  } else if (serviceMain.currentDivString === "parkingPage") {
    drawParkingHistoryPage();
  }
}


function retryLoadParkingLocationCard() {
  updateParkingLocation();
  if (serviceMain.currentDivString === "mainScreen") {
    drawParkingLocationCard();
  } else if (serviceMain.currentDivString === "parkingPage") {
    drawParkingLocationPage();
  }
}


/************ draw ************/


function getParkingTitleText(subService) {
  if (ParkingLocationEnabled && !(ParkingHistoryEnabled)
    || !(ParkingLocationEnabled) && ParkingHistoryEnabled) {
    return $.lang[lang].PARKING_TAB;
  }

  if (subService === "location") {
    return $.lang[lang].PARKING_LOCATION_FC_TEXT;
  } else if (subService === "history") {
    return $.lang[lang].PARKING_VEHICLE_ENTRY;
  }

  return "";
}


function initParkingMainBanner() {
  let bannerId = "mainBanner_parking";
  let bannerUri = "parkingCardOnClick()";

  document.getElementById('mainBannerWrapper').innerHTML +=
    "<div id='" + bannerId + "' class='swiper-slide mainBannerSwiper' onclick='" + bannerUri + "'></div>";
}


async function initParkingLocationCard(index, cardInfo) {
  await new Promise(resolve => {
    let initHtml = "<div id='parkingLocationCard' class='servicecards motion_card'></div>";
    document.getElementById('sortableDiv_' + index).innerHTML = initHtml;

    initHtml =
      "<div class='servicecards_title_space'>" +
        "<div id='parkingLocationTitle'></div>" +
        "<div class='clear'></div>" +
      "</div>" +
      "<div id='parkingLocation' class='servicecards_data_space'>" +
      "</div>";
    document.getElementById('parkingLocationCard').innerHTML = initHtml;

    if (document.getElementById('parkingLocationTitle') === null) {
      return;
    }

    let title = getParkingTitleText("location");
    document.getElementById('parkingLocationTitle').innerHTML = drawServiceCardEditerImage(title, 'parkingLocationTitleDetail');

    cardInfo.bEnabledCard = true;
    cardInfo.initCardOrder = index;
    cardInfo.nCardOrder = index;
    cardInfo.title = title;

    resolve();
  });

  if (document.getElementById('parkingLocationCard') === null) {
    return;
  }
  let card = document.getElementById('parkingLocationCard');
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    let data = parkingObject.carlocationlist[0];
    let newId;
    if (data) {
      newId = data.car_no + data.location;
      newId = newId.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\s\-_+<>@\#$%&\\\=\(\'\"]/gi, "");
      newId = 'parkingLocation_' + newId;
      parkingObject.clicked_id = document.getElementById(newId).id;
    }
    let maxNum = (parkingObject.locationNum > MAX_LOC) ? MAX_LOC : parkingObject.locationNum;
    parkingCardOnclickEvent(e, maxNum, document.getElementById(newId), true);
  });

  let detail = document.getElementById('parkingLocationTitleDetail');
  detail.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    let data = parkingObject.carlocationlist[0];
    let newId;
    if (data) {
      newId = data.car_no + data.location;
      newId = newId.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\s\-_+<>@\#$%&\\\=\(\'\"]/gi, "");
      newId = 'parkingLocation_' + newId;
      parkingObject.clicked_id = document.getElementById(newId).id;
    }
    let maxNum = (parkingObject.locationNum > MAX_LOC) ? MAX_LOC : parkingObject.locationNum;
    parkingCardOnclickEvent(e, maxNum, document.getElementById(newId), false);
  }, {passive: true});
  detail.onclick = (e) => { e.stopPropagation(); };

  return true;
}


async function initParkingHistoryCard(index, cardInfo) {
  await new Promise(resolve => {
    let initHtml = "<div id='parkingHistoryCard' class='servicecards motion_card'></div>"
    document.getElementById('sortableDiv_' + index).innerHTML = initHtml;

    initHtml =
    "<div class='servicecards_title_space'>" +
      "<div id='parkingHistoryTitle'></div>" +
      "<div class='clear'></div>" +
    "</div>" +
    "<div id='parkingHistory' class='servicecards_data_space'>" +
    "</div>";
    document.getElementById('parkingHistoryCard').innerHTML = initHtml;

    if (document.getElementById('parkingHistoryTitle') === null) {
      return;
    }

    let title = getParkingTitleText("history");
    document.getElementById('parkingHistoryTitle').innerHTML = drawServiceCardEditerImage(title, 'parkingHistoryTitleDetail');

    cardInfo.bEnabledCard = true;
    cardInfo.initCardOrder = index;
    cardInfo.nCardOrder = index;
    cardInfo.title = title;

    resolve();
  });

  if (document.getElementById('parkingHistoryCard') === null) {
    return;
  }
  let card = document.getElementById('parkingHistoryCard');
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    let data = parkingObject.carhistorylist[0];
    let newId;
    if (data) {
      newId = data.car_no + data.reg_time;
      newId = newId.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\s\-_+<>@\#$%&\\\=\(\'\"]/gi, "");
      newId = 'parkingHistory_' + newId;
      parkingObject.clicked_id = document.getElementById(newId).id;
    }
    let maxNum = (parkingObject.historyNum > MAX_HIS) ? MAX_HIS : parkingObject.historyNum;
    parkingCardOnclickEvent(e, maxNum, document.getElementById(newId), true);
  });

  let detail = document.getElementById('parkingHistoryTitleDetail');
  detail.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    let data = parkingObject.carhistorylist[0];
    let newId;
    if (data) {
      newId = data.car_no + data.reg_time;
      newId = newId.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\s\-_+<>@\#$%&\\\=\(\'\"]/gi, "");
      newId = 'parkingHistory_' + newId;
      parkingObject.clicked_id = document.getElementById(newId).id;
    }
    let maxNum = (parkingObject.historyNum > MAX_HIS) ? MAX_HIS : parkingObject.historyNum;
    parkingCardOnclickEvent(e, maxNum, document.getElementById(newId), false);
  }, {passive: true});
  detail.onclick = (e) => { e.stopPropagation(); };

  return true;
}


function initParkingPage() {
  let innerText = "";
  innerText += "<div id='parkingPageHeader'></div>";
  document.getElementById("parkingPage").innerHTML = innerText;
}


function getPathObjectFromSVG(svgParentObj) {
  if (!svgParentObj) {
    return null;
  }
  return svgParentObj.childNodes[0].childNodes[0].nextSibling.nextSibling.nextSibling.childNodes[0].nextSibling;
}


var swiperParkingLocationCard;

function drawParkingLocationCard() {
  if (document.getElementById('parkingLocationTitle') === null) {
    return false;
  }

  if (this.enabledMainBanner === true) {
    document.getElementById('mainBanner_parking').innerHTML = mainBannerTextForSwipe($.lang[lang].PARKING_LOCATION_TAB, lang);
  }

  let prefix = 'parkingLocation';
  let space = document.getElementById(prefix);
  let max = parkingObject.locationNum;

  // card 표시 animation 적용
  promiseAnimationEnd($('#' + prefix), 'show_card');

  // 최성환 수정 - 카드 정보가 바뀌면 기존 element를 삭제 후 넣어야 함. 안그러면 계속 append만 됨
  if (space.childNodes.length !== 0) {
    space.childNodes[0].remove();
  }

  getCarColor("all"); // Get car color in advance

  let cont = appendNewPage(space, prefix + 'Container', 'swiper-container');
  let wrap = appendNewPage(cont, prefix + 'Wrapper', 'swiper-wrapper');
  wrap.onclick = (e) => { e.stopPropagation(); };

  if (parkingObject.locationcard_status === "unloaded") {
    drawReloadCard(cont.id, "others", retryLoadParkingLocationCard);
    return true;
  } else if (parkingObject.locationcard_status === "loading") {
    drawLoadingCard(cont.id, "others");
    return true;
  } else if (max === 0) {
    //drawNoItemCard(prefix, document.loadedSVG.home_ic_status_parking, $.lang[lang].PARKING_NO_LOCATION_RECORD);
    drawNoItemCard(prefix, "service/parking/res/svg/home_ic_status_parking.svg", $.lang[lang].PARKING_NO_LOCATION_RECORD);
    return true;
  } else if (max > MAX_LOC) {
    max = MAX_LOC;
  }

  // Append cards (grid) to the body (from template)
  let card = document.querySelector('#favorite_card_template').content;
  let numItem = 0;
  let slide, numSlide = 0;
  for (let i = 0; i < max; i++) {
    let data = parkingObject.carlocationlist[i];
    let regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\s\-_+<>@\#$%&\\\=\(\'\"]/gi;
    let onClickItem = (data.car_no + data.location).replace(regExp, "");
    let id = prefix + '_' + onClickItem;
    if (wrap.querySelector('#' + id) !== null) {
      continue;
    }

    if (numItem % parkingLocationItemNumPerSwipe === 0) {
      slide = appendNewPage(wrap, prefix + 'Slide' + numSlide++, 'swiper-slide');
    }

    let item = document.createElement('div');
    item.id = id;
    item.className = 'parking_card_box';

    item.addEventListener('touchstart', function(e) {
      parkingCardOnclickEvent(e, numItem, this, true);
    }, {passive: true});

    if (slide) {
      slide.appendChild(item);
    }

    let grid = document.importNode(card, true);

    let bonnet = grid.getElementById('_imgMask');
    bonnet.innerHTML = document.loadedSVG.parking_ic_status_parking_bonnet;
    bonnet.id = bonnet.className + numItem;

    let pathOfSVG = getPathObjectFromSVG(bonnet);
    if (pathOfSVG) {
      if (data.color) {
        pathOfSVG.setAttribute('fill', data.color);
      } else {
        pathOfSVG.setAttribute('fill', parkingObject.colorList[numItem % 10]);
      }
    }

    let car = grid.getElementById('_imgImg');
    car.innerHTML = document.loadedSVG.parking_ic_status_parking_color;
    car.style.position = 'absolute';
    car.style.height = '40px';

    if (data.car_no) {
      grid.getElementById('_text1').innerText = data.car_no;
    } else {
      grid.getElementById('_text1').innerText = "-";
    }

    if (data.reg_time) {
      grid.getElementById('_text2').innerText = data.reg_time.toDateString(false);
    }

    if (data.location) {
      grid.getElementById('_text3').innerText = data.location;
    } else {
      grid.getElementById('_text3').innerText = "-";
    }

    if (data.nickname) {
      grid.getElementById('_text4').innerText = data.nickname;
    }

    item.appendChild(grid);
    ++numItem;
  }

  if (swiperParkingLocationCard) {
    swiperParkingLocationCard.destroy();
  }

  if (parkingObject.locationNum > 3) {
    appendNewPage(cont, prefix + 'Pagination', 'parking_card_swiper');

    swiperParkingLocationCard = new Swiper('#parkingLocationContainer', {
      spaceBetween: 30,
      centeredSlides: true,
      pagination: {
        el: '#parkingLocationPagination',
        clickable: true
      }
    });

    resizeHandler.subscribe('resize', () => {
      $('.swiper-slide').css('width', '$(window).width()');
      setTimeout(() => swiperParkingLocationCard.update(), RESIZE_DELAY);
    });
    resizeHandler.subscribe('resizeend', () => {
      swiperParkingLocationCard.update();
    });
  }

  return true;
}


var swiperParkingHistoryCard;

function drawParkingHistoryCard() {
  if (document.getElementById('parkingHistoryTitle') === null) {
    return false;
  }

  if (this.enabledMainBanner === true) {
    document.getElementById('mainBanner_parking').innerHTML = mainBannerTextForSwipe($.lang[lang].PARKING_VEHICLE_ENTRY, lang);
  }

  let prefix = 'parkingHistory';
  let space = document.getElementById(prefix);
  let max = parkingObject.historyNum;

  // card 표시 animation 적용
  promiseAnimationEnd($('#' + prefix), 'show_card');

  // 최성환 수정 - 카드 정보가 바뀌면 기존 element를 삭제 후 넣어야 함. 안그러면 계속 append만 됨
  if (space.childNodes.length !== 0) {
    space.childNodes[0].remove();
  }

  let cont = appendNewPage(space, prefix + 'Container', 'swiper-container');
  let wrap = appendNewPage(cont, prefix + 'Wrapper', 'swiper-wrapper');
  wrap.onclick = (e) => { e.stopPropagation(); };

  if (parkingObject.historycard_status === "unloaded") {
    drawReloadCard(cont.id, "others", retryLoadParkingHistoryCard);
    return true;
  } else if (parkingObject.historycard_status === "loading") {
    drawLoadingCard(cont.id, "others");
    return true;
  } else if (max === 0) {
    //drawNoItemCard(prefix, document.loadedSVG.home_ic_status_parking, $.lang[lang].PARKING_NO_VEHICLE_ENTRY_RECORD);
    drawNoItemCard(prefix, "service/parking/res/svg/home_ic_status_parking.svg", $.lang[lang].PARKING_NO_VEHICLE_ENTRY_RECORD);
    return true;
  } else if (max > MAX_HIS) {
    max = MAX_HIS;
  }

  // Append cards (grid) to the body (from template)
  let card = document.querySelector('#favorite_card_template').content;
  let numItem = 0;
  let slide, numSlide = 0;
  let offset = 0;
  for (let i = 0; i < max; i++) {
    if (parkingObject.carhistorylist[i].status !== "in") {
      if (parkingObject.historyNum > max) {
        max++;
      }
      offset++;
      continue;
    }
    let data = parkingObject.carhistorylist[numItem + offset];
    let regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\s\-_+<>@\#$%&\\\=\(\'\"]/gi;
    let onClickItem = (data.car_no + data.reg_time).replace(regExp, "");
    let id = prefix + '_' + onClickItem;
    if (wrap.querySelector('#' + id) !== null) {
      continue;
    }

    if (numItem % parkingHistoryItemNumPerSwipe === 0) {
      slide = appendNewPage(wrap, prefix + 'Slide' + numSlide++, 'swiper-slide');
    }

    let item = document.createElement('div');
    item.id = id;
    item.className = 'parking_card_box';

    item.addEventListener('touchstart', function(e) {
      parkingCardOnclickEvent(e, numItem, this, true);
    }, {passive: true});

    if (slide) {
      slide.appendChild(item);
    }

    let grid = document.importNode(card, true);
    grid.getElementById('_imgMask').remove();
    let img = grid.getElementById('_imgImg');
    img.innerHTML = document.loadedSVG.parking_ic_status_coming_home;
    img.style.height = "40px";

    grid.getElementById('_text1').innerText = $.lang[lang].PARKING_INCOMING;

    if (data.reg_time) {
      grid.getElementById('_text2').innerText = data.reg_time.toDateString();
    }

    if (data.car_no) {
      grid.getElementById('_text3').innerText = data.car_no;
    } else {
      grid.getElementById('_text3').innerText = "-";
    }

    if (data.nickname) {
      grid.getElementById('_text4').innerText = data.nickname;
    }

    item.appendChild(grid);
    ++numItem;
  }

  if (swiperParkingHistoryCard) {
    swiperParkingHistoryCard.destroy();
  }

  if (parkingObject.historyNum > 3) {
    appendNewPage(cont, prefix + 'Pagination', 'parking_card_swiper');

    swiperParkingHistoryCard = new Swiper('#parkingHistoryContainer', {
      spaceBetween: 30,
      centeredSlides: true,
      pagination: {
        el: '#parkingHistoryPagination',
        clickable: true
      }
    });

    resizeHandler.subscribe('resize', () => {
      $('.swiper-slide').css('width', '$(window).width()');
      setTimeout(() => swiperParkingHistoryCard.update(), RESIZE_DELAY);
    });
    resizeHandler.subscribe('resizeend', () => {
      swiperParkingHistoryCard.update();
    });
  }

  return true;
}


function drawParkingPageCommon() {
  let carlocation_reg_time;
  let carhistory_reg_time;
  if (ParkingLocationEnabled && parkingObject.locationNum > 0) {
    for (let idx = 0; idx < parkingObject.locationNum; idx++) {
      if (parkingObject.carlocationlist[idx].car_no && parkingObject.carlocationlist[idx].location) {
        carlocation_reg_time = parkingObject.carlocationlist[idx].reg_time;
        break;
      }
    }
  }
  if (ParkingHistoryEnabled && parkingObject.historyNum > 0) {
    for (let idx = 0; idx < parkingObject.historyNum; idx++) {
      if (parkingObject.carhistorylist[idx].car_no && parkingObject.carhistorylist[idx].status) {
        carhistory_reg_time = parkingObject.carhistorylist[idx].reg_time;
        break;
      }
    }
  }

  if (parkingObject.locationNum === 0 && parkingObject.historyNum === 0) {
    let innerText = "";
    innerText += "<div class='parking_page_noitem'>";
    innerText += "  <div class='parking_page_noitem_circle'>";
    innerText += "    <div class='servicepages_noitem_circle'>" + document.loadedSVG.home_ic_status_parking + "</div>";
    innerText += "  </div>";
    innerText += "  <div class='parking_page_noitem_text'>" + $.lang[lang].PARKING_NO_VEHICLE_INFORMATION + "</div>";
    innerText += "</div>";
    document.getElementById('parkingPageHeader').innerHTML = innerText;
    return;
  }

  let headerText = "";
  headerText += "<div class='parking_page_header'>";
  if (ParkingLocationEnabled && parkingObject.locationNum > 0) {
    if (ParkingHistoryEnabled && parkingObject.historyNum > 0 && (carlocation_reg_time && !carlocation_reg_time.isLatestTimeThan(carhistory_reg_time))) {
      for (let idx = 0; idx < parkingObject.historyNum; idx++) {
        let history = parkingObject.carhistorylist[idx];
        if (history.car_no && history.status) {
          headerText += " <div class='parking_page_header_text'>" + $.lang[lang].PARKING_HISTORY_BANNER.replace("%1$s", history.car_no).replace("%2$s", (history.reg_time).toDateString().fmodify("var(--brand-color)", 600)) + "</div>";
          break;
        }
      }
    } else {
      for (let idx = 0; idx < parkingObject.locationNum; idx++) {
        let car = parkingObject.carlocationlist[idx];
        if (car.car_no && car.location) {
          headerText += " <div class='parking_page_header_text'>" + $.lang[lang].PARKING_LOCATION_BANNER.replace("%1$s", car.car_no).replace("%2$s", (car.location).fmodify("var(--brand-color)", 600)) + "</div>";
          break;
        }
      }
    }
  } else if (ParkingHistoryEnabled && parkingObject.historyNum > 0) {
    for (let idx = 0; idx < parkingObject.historyNum; idx++) {
      let history = parkingObject.carhistorylist[idx];
      if (history.car_no && history.status) {
        headerText += " <div class='parking_page_header_text'>" + $.lang[lang].PARKING_HISTORY_BANNER.replace("%1$s", history.car_no).replace("%2$s", (history.reg_time).toDateString().fmodify("var(--brand-color)", 600)) + "</div>";
        break;
      }
    }
  }
  headerText += "</div>";
  document.getElementById('parkingPageHeader').innerHTML = headerText;

  if (ParkingLocationEnabled) {
    drawParkingLocationPage(parkingObject.itemsInCard); // 주차기록 item 로드
  }
  if (ParkingHistoryEnabled) {
    drawParkingHistoryPage(parkingObject.itemsInCard); // 입차기록 item 로드
  }

  let carNum = parkingObject.clicked_id.split("_")[1];
  $("#parkingPage").scrollTop(0);

  if (parkingObject.subServiceName === 'history' && carNum === undefined) {
    $("#parkingPage").scrollTo("#parkingHistoryPage_header");
    parkingObject.clicked_id = "noselect";
  } else if (!isVisible($('#' + carNum).get(0))) {
    $("#parkingPage").scrollTo("#" + carNum);
    parkingObject.clicked_id = "noselect";
  } else {
    console.log("Not defined");
  }
}


function drawParkingPage() {
  let actionBar = document.getElementById("actionBarTitle_detailed");

  if (ParkingLocationEnabled && ParkingHistoryEnabled) {
    actionBar.innerHTML = "<span>" + $.lang[lang].PARKING_TAB + "</span>";
    actionBar.innerHTML += "<span>" + $.lang[lang].PARKING_VEHICLE_ENTRY + "</span>";
    actionBar.childNodes[0].style.position = "absolute";
    actionBar.childNodes[1].style.position = "absolute";
    actionBar.childNodes[0].style.visibility = "visible";
    actionBar.childNodes[1].style.visibility = "hidden";
  } else {
    actionBar.innerHTML = "<span>" + $.lang[lang].PARKING_TAB + "</span>";
    actionBar.childNodes[0].style.position = "absolute";
    actionBar.childNodes[0].style.visibility = "visible";
  }

  drawParkingPageCommon();
}


function drawParkingLocationPage(items) {
  // Append parkingLocationPage
  let page = appendNewPage('parkingPage', 'parkingLocationPage', 'parking_page_list');

  // Append detail page header & body (from template)
  let detail = appendDetailPage(page);

  // Append cards (grid) to the body (from template)
  let card = document.querySelector('#detail_page_card_template').content;

  let max = parkingObject.locationNum;

  if (parkingObject.locationcard_status === "unloaded") {
    drawReloadCard(detail.id, "parking_page", retryLoadParkingLocationCard);
    return;
  } else if (parkingObject.locationcard_status === "loading") {
    drawLoadingPage(detail.id, "parking_page");
    return;
  } else if (max === 0) {
    let text = appendEmptyGrid('parkingLocationPage', card, $.lang[lang].PARKING_NO_LOCATION_RECORD);
    detail.appendChild(text);
    return;
  }
  detail.innerHTML = "";

  for (let idx = 0; idx < max; idx++) {
    if (idx > items) {
      break;
    }

    let data = parkingObject.carlocationlist[idx];
    let newId = data.car_no + data.location;
    newId = newId.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\s\-_+<>@\#$%&\\\=\(\'\"]/gi, "");

    let item = document.getElementById(newId);
    if (item !== null) {
      continue;
    }

    if (idx !== 0) {
      appendDivider(detail);
    }

    let grid = document.importNode(card, true);
    grid.getElementById('_grid').id = newId;

    let bonnet = grid.getElementById('_imgMask');
    bonnet.innerHTML = document.loadedSVG.parking_ic_status_parking_bonnet;
    let x = idx;
    if (items > parkingObject.itemsInCard) {
      x += parkingObject.itemsInCard;
    }
    bonnet.id = '_imgMask_' + x;

    let pathOfSVG = getPathObjectFromSVG(bonnet);
    let color = parkingObject.carlocationlist[idx].color;
    if (pathOfSVG) {
      if (color) {
        pathOfSVG.setAttribute('fill', color);
      } else {
        pathOfSVG.setAttribute('fill', parkingObject.colorList[x % 10]);
      }
    }

    let car = grid.getElementById('_imgImg');
    car.innerHTML = document.loadedSVG.parking_ic_status_parking_color;
    car.style.position = 'absolute';
    car.style.height = '40px';

    if (data.car_no) {
      $(car).on('click', {index:x}, function(e) {
        appendPalletePopup(e.data.index);
      });
      grid.getElementById('_text1').innerText = data.car_no;
    } else {
      grid.getElementById('_text1').innerText = "-";
    }

    if (data.reg_time) {
      grid.getElementById('_text2').innerText = data.reg_time.toDateString(false);
    }

    if (data.location) {
      grid.getElementById('_text3').innerText = data.location;
    } else {
      grid.getElementById('_text3').innerText = "-";
    }

    if (data.nickname) {
      grid.getElementById('_text4').innerText = data.nickname;
    }

    detail.appendChild(grid);
  }

  if (!ParkingHistoryEnabled) {
    appendBottomMargin(page);
  }

  // Append more page loader (from template)
  // console.log("drawParkingLocationPage() ", items, max, parkingObject.itemsInCard);
  appendLoader(page, drawParkingLocationPage, items, max, parkingObject.itemsInCard);
}


function drawParkingHistoryPage(items) {
  // Append parkingLocationPage
  let page = appendNewPage('parkingPage', 'parkingHistoryPage', 'parking_page_list');

  // Append detail page header & body (from template)
  let detail = appendDetailPage(page);

  // Append cards (grid) to the body (from template)
  let card = document.querySelector('#detail_page_card_template').content;

  let max = parkingObject.historyNum;

  if (parkingObject.historycard_status === "unloaded") {
    drawReloadCard(detail.id, "parking_page", retryLoadParkingHistoryCard);
    return;
  } else if (parkingObject.historycard_status === "loading") {
    drawLoadingPage(detail.id, "parking_page");
    return;
  } else if (max === 0) {
    let text = appendEmptyGrid('parkingHistoryPage', card, $.lang[lang].PARKING_NO_VEHICLE_ENTRY_RECORD);
    detail.appendChild(text);
    appendBottomMargin(page);
    return;
  }
  detail.innerHTML = "";

  for (let idx = 0; idx < max; idx++) {
    // if (idx > items) { // 입차기록의 데이터를 서버로부터 다 가져왔을때 또 다시 request 하지 않고 데이터를 모두 보여주도록 변경
    //   break;
    // }

    let data = parkingObject.carhistorylist[idx];
    let newId = data.car_no + data.reg_time;
    newId = newId.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\s\-_+<>@\#$%&\\\=\(\'\"]/gi, "");

    let item = document.getElementById(newId);
    if (item !== null) {
      continue;
    }

    if (idx !== 0) {
      appendDivider(detail);
    }

    let grid = document.importNode(card, true);
    grid.getElementById('_imgMask').remove();
    grid.getElementById('_grid').id = newId;

    if (data.status === "in") {
      grid.getElementById('_imgImg').innerHTML = document.loadedSVG.parking_ic_status_coming_home;
      grid.getElementById('_text1').innerText = $.lang[lang].PARKING_INCOMING;
    } else if (data.status === "out") {
      grid.getElementById('_imgImg').innerHTML = document.loadedSVG.parking_ic_status_going_out;
      grid.getElementById('_text1').innerText = $.lang[lang].PARKING_OUTGOING;
    } else {
      grid.getElementById('_text1').innerText = "-";
    }

    if (data.reg_time) {
      grid.getElementById('_text2').innerText = data.reg_time.toDateString(false);
    }

    if (data.car_no) {
      grid.getElementById('_text3').innerText = data.car_no;
    } else {
      grid.getElementById('_text3').innerText = "-";
    }

    if (data.nickname) {
      grid.getElementById('_text4').innerText = data.nickname;
    }

    grid.getElementById('_imgImg').style.height = "40px";
    detail.appendChild(grid);
  }

  appendBottomMargin(page);

  // Append more page loader (from template)
  // console.log("drawParkingHistoryPage() ", items, max, parkingObject.itemsInCard);
  // if (max > parkingObject.itemsInCard)
  appendLoader(page, drawParkingHistoryPage, items, max, parkingObject.itemsInCard);
}


function appendDetailPage(page) {
  let body = document.getElementById(page.id + '_body');
  if (!body) {
    let template = document.querySelector('#detail_page_template').content;
    let node = document.importNode(template, true);
    let header = node.getElementById('_header');
    let text = node.getElementById('_text');
    let line = node.getElementById('_line');

    header.id = page.id + header.id;
    text.id = header.id + text.id;
    line.id = header.id + line.id;

    if (page.id === 'parkingLocationPage') {
      text.innerText = $.lang[lang].PARKING_LOCATION_TAB;
    } else if (page.id === 'parkingHistoryPage') {
      text.innerText = $.lang[lang].PARKING_VEHICLE_ENTRY;
    }

    body = node.getElementById('_body');
    body.id = page.id + body.id;
    page.appendChild(node);
  }

  // if (body.id === "parkingHistoryPage_body") { // 맨 마지막 item 에 margin 을 주기 위해
  //   $('#' + body.id).css('margin-bottom', 16);
  // }

  return body;
}


var lockColorPicker = false;
var color = -1;
var targetCar;

function appendPalletePopup(target) {
    targetCar = target;
    if (!(document.getElementById('parkingPopupPage'))) {
        let parking = document.getElementById('parkingPage');
        let cancel = parking.getElementsByClassName('parking_page_popup_button_cancel')[0];
        let select = parking.getElementsByClassName('parking_page_popup_button_select')[0];

        if (parking.lastChild.id === 'parkingPopupPage') {
            $(cancel).unbind('touchstart');
            $(select).unbind('touchstart');
            lockColorPicker = false;
        } else {
            let popup = document.createElement('div');
            popup.id = 'parkingPopupPage';
            // parking.appendChild(popup);
            document.body.appendChild(popup);

            let popupMask = document.createElement('div');
            popupMask.className = 'parking_page_popup_mask';
            popup.appendChild(popupMask);

            let popupWindow = document.createElement('div');
            popupWindow.className = 'parking_page_popup_window';
            popupMask.append(popupWindow);

            let pallete = document.createElement('div');
            pallete.className = 'parking_page_popup_grid'
            popupWindow.appendChild(pallete);

            let button = document.createElement('div');
            button.className = 'parking_page_popup_button';
            popupWindow.appendChild(button);

            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 5; j++) {
                    let idx = i * 5 + j;
                    let content = document.createElement('div');
                    content.id = 'color_pallete_' + idx;
                    content.className = 'parking_page_popup_content';
                    pallete.appendChild(content);

                    let bg = document.createElement('div');
                    bg.id = 'color_pallet_bg_' + idx;
                    bg.className = 'parking_page_popup_bg_mask';
                    // bg.innerHTML = document.loadedSVG.parking_ic_status_parking_bonnet;
                    bg.style.backgroundColor = parkingObject.colorList[idx];
                    // $(getPathObjectFromSVG(bg)).attr('fill', parkingObject.colorList[i]);
                    content.appendChild(bg);

                    let car = document.createElement('img');
                    car.src = parkingImageUri + "parking_ic_status_parking_color.png";
                    // car.innerHTML = document.loadedSVG.parking_ic_status_parking_color;
                    car.id = 'color_pallete_image_' + idx;
                    car.index = idx;
                    car.alt = '';
                    content.appendChild(car);

                    car.addEventListener('touchstart', (e) => {
                        e.stopPropagation();

                        resetParkingPopup();

                        let config = { type: 'rippleD', isBg: true };
                        rippleManager.set(e, config);

                        if (car.style.border === '1px solid rgb(212, 212, 212)') {
                            color = car.index;
                            car.style.width = '44px';
                            car.style.height = '44px';
                            car.style.border = "2px solid #3695DD";
                        } else if (car.style.border === '2px solid #3695DD') {
                            color = -1;
                            car.style.border = "1px solid #D4D4D4";
                        }
                    }, { passive: true });
                }
                let clear = document.createElement('div');
                clear.className = 'clear';
                pallete.appendChild(clear);
            }

            cancel = document.createElement('div');
            let middle = document.createElement('hr');
            select = document.createElement('div');
            cancel.className = 'parking_page_popup_button_cancel';
            middle.className = 'parking_page_popup_button_middle';
            select.className = 'parking_page_popup_button_select';
            cancel.innerText = $.lang[lang].CANCEL_BUTTON;
            select.innerText = $.lang[lang].SAVE_BUTTON;

            button.appendChild(cancel);
            button.appendChild(middle);
            button.appendChild(select);
        }

        let config = {
            type: 'rippleC',
        };

        $(cancel).on('touchstart', function (e) {
            if (lockColorPicker) {
                return;
            }
            lockColorPicker = true;
            color = -1;

            config.cb = () => {
                toggleParkingPopup('none');
                lockColorPicker = false;
            }
            config.cancelCb = () => { lockColorPicker = false; }
            rippleManager.set(e, config);

            resetParkingPopup();
        });

        $(select).on('touchstart', function (e) {
            if (lockColorPicker) {
                return;
            }
            lockColorPicker = true;

            config.cb = () => {
                if (color >= 0) {
                    let chosen = getPathObjectFromSVG(document.getElementById('_imgMask_' + targetCar));
                    if (chosen) {
                        chosen.setAttribute('fill', parkingObject.colorList[color]);
                    }
                    parkingObject.carlocationlist[targetCar].color = parkingObject.colorList[color]
                    setCarColor(parkingObject.carlocationlist[targetCar].car_no, parkingObject.colorList[color]);
                }

                toggleParkingPopup('none');
                lockColorPicker = false;
                color = -1;
            }

            config.cancelCb = () => { lockColorPicker = false; }
            rippleManager.set(e, config);

            resetParkingPopup();
        });

        $('body').on('touchstart', function (e) {
            if (($(e.target).hasClass('parking_page_popup_mask'))) {
                toggleParkingPopup('none');
                lockColorPicker = false;
                color = -1;
                resetParkingPopup();
            }
        });
    }

    toggleParkingPopup('block');
}


function relocateParkingPopup() {
  var parkingPopup = document.getElementsByClassName('parking_page_popup_window')[0];
  if (parkingPopup && parkingPopup.style.display === 'block') {
    toggleParkingPopup('block');
  }
}


function resetParkingPopup() {
  let cars = document.getElementsByClassName('parking_page_popup_bg_mask');
  for (let i = 0; i < cars.length; i++) {
    cars[i].nextSibling.style.height = '46px';
    cars[i].nextSibling.style.width = '46px';
    cars[i].nextSibling.style.border = '1px solid #D4D4D4';
  }
}


function toggleParkingPopup(display) {
  let backButtonEle = $('#actionBarBackButton');
  backButtonEle.css({
    'pointer-events': 'none',
    'z-index': 0
  });

  $('.parking_page_popup_mask').css('display', display);
  let popupWindowEle = $('.parking_page_popup_window');

  popupWindowEle.css('display', display);

  if (display === 'block') {
    popupWindowEle.css({
      'top': (($(window).height() - popupWindowEle.outerHeight()) / 2 + $(window).scrollTop()) + 'px',
      'left': (($(window).width() - popupWindowEle.outerWidth()) / 2 + $(window).scrollLeft()) + 'px'
    });
    $('.parking_page_detailed_style').css('overflow-y','hidden');

    let cars = document.getElementsByClassName('parking_page_popup_content');
    let paddingWidth = (popupWindowEle.width() - (48 * 6)) / 8 + 'px';
    for (let i = 0; i < cars.length; i++) {
      if (i % 5 !== 0) {
        cars[i].style.marginLeft = paddingWidth;
      }
      if (i % 5 !== 4) {
        cars[i].style.marginRight = paddingWidth;
      }

      let mask = cars[i].firstChild;
      let img = mask.nextSibling;
      let x = parkingObject.carlocationlist[targetCar].color;
      let y = RGBToHex(mask.style.backgroundColor);
      if (x === y) {
        Object.assign(img.style, {width: '44px', height: '44px', border: '2px solid #3695DD'});
      }
      else {
        Object.assign(img.style, {width: '46px', height: '46px', border: '1px solid #D4D4D4'});
      }
    }
  } else {
    $('.parking_page_detailed_style').css('overflow-y','overlay');
    backButtonEle.css({
      'pointer-events': 'unset',
      'z-index': 1
    });
  }

}

function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16).toUpperCase(),
      g = (+rgb[1]).toString(16).toUpperCase(),
      b = (+rgb[2]).toString(16).toUpperCase();

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

function appendDivider(card) {
  let divider = document.createElement('div');
  divider.className = 'detail_page_divider';
  card.appendChild(divider);
}


function appendBottomMargin(page) {
  let bot_margin = document.createElement('div');
  bot_margin.id = 'bot_margin';
  if (!(document.getElementById(bot_margin.id))) {
    bot_margin.style.height = '24px';
    bot_margin.style.marginTop = '6px';
    bot_margin.style.marginBottom = '6px';
    page.appendChild(bot_margin);
  }
}


function appendLoader(page, caller, totalItems, maxItems, num) {
  // console.log("appendLoader()", page.id, totalItems, maxItems, num, parkingObject.clicked_id, $("#" + parkingObject.clicked_id).length, parkingObject.location_next_page, parkingObject.history_next_page, parkingObject.historyNum);

  if (page.id === "parkingHistoryPage") { // history 에 대해서만 로딩 이미지 보여짐
    let template = document.querySelector('#common_loader_template').content;
    let loader = document.importNode(template, true);
    let bot_margin = document.getElementById('bot_margin');
    if (bot_margin) {
      bot_margin.appendChild(loader);
    } else {
      page.appendChild(loader);
    }

    let next = document.getElementById('next_page_loader');
    next.id = page.id + '_loader';
  }

  $('#' + page.id + '_loader').on('inview', function(event, visible, visiblePartX, visiblePartY) {
    if (visible) {
      $('#' + page.id + '_loader').off('inview'); // Uncaught TypeError: Cannot read property '0' of undefined 에러 오류를 위해 넣어줌
      document.getElementById(page.id + '_loader').remove();

      if (parkingObject.history_next_page && page.id === "parkingHistoryPage") { // 만약에 next 페이지가 있을 경우 다음 페이지 데이터를 추가 요청함
        setTimeout(requestParkingHistory(parkingObject.request_index), 0);
        return;
      }

      if (page.id === "parkingLocationPage" && totalItems <= parkingObject.itemsInCard) {
        caller(totalItems + num);
      }

      $("#parkingPage").scrollTo("#" + parkingObject.clicked_id);
    }
  });
}


function appendEmptyGrid(page, card, text) {
  let grid = document.importNode(card, true);
  grid.getElementById('_imgMask').remove();
  grid.getElementById('_text1').remove();
  grid.getElementById('_text2').remove();
  grid.getElementById('_text3').remove();

  let noitem_card = grid.getElementById('_grid');
  noitem_card.setAttribute('class', 'parking_page_noitem_card');

  let noitem_box = document.createElement('div');
  noitem_box.setAttribute('class', 'parking_page_noitem_box');
  noitem_card.appendChild(noitem_box);

  let noitem_circle = grid.getElementById('_img');
  noitem_circle.setAttribute('class', 'parking_page_noitem_circle');
  noitem_box.appendChild(noitem_circle);

  let noitem_img = grid.getElementById('_imgImg');
  noitem_img.style.height = '52px';
  noitem_img.innerHTML = document.loadedSVG.home_ic_status_parking;
  noitem_circle.appendChild(noitem_img);

  let noitem_text = document.createElement('div');
  noitem_text.setAttribute('class', 'parking_page_noitem_text');
  noitem_text.innerText = text;
  noitem_box.appendChild(noitem_text);

  return grid;
}


function carColorDataCallback(key, value) {
  for (let index = 0; index < parkingObject.locationNum; index++) {
    if (parkingObject.carlocationlist[index].car_no === key) {
      // for detail page
      if (value) {
        parkingObject.carlocationlist[index].color = value;
      } else {
        parkingObject.carlocationlist[index].color = parkingObject.colorList[index % 10];
      }
      // for favorate card
      if (!isPC()) {
        let id = "favorite_card_img_mask" + index;
        let bonnet = getPathObjectFromSVG(document.getElementById(id));
        if (bonnet) {
          if (value) {
            bonnet.setAttribute('fill', value);
          } else {
            bonnet.setAttribute('fill', parkingObject.colorList[index % 10]);
          }
        }
      }
    }
  }
}


function getCarColor(car_no) {
  if (car_no === "" || car_no === undefined) {
    return;
  }

  let carColor;
  if (car_no === "all") {
    for (let idx = 0; idx < parkingObject.locationNum; idx++) {
      let num = parkingObject.carlocationlist[idx].car_no;
      if (isPC()) {
        carColor = window.localStorage.getItem(num);
        carColorDataCallback(num, carColor);
      } else {
        scplugin.manager.getPluginData(pluginService.serviceHandle, num, carColorDataCallback);
      }
    }
    return;
  }

  if (isPC()) {
    carColor = window.localStorage.getItem(car_no);
    carColorDataCallback(car_no, carColor);
  } else {
    scplugin.manager.getPluginData(pluginService.serviceHandle, car_no, carColorDataCallback);
  }
}


function setCarColor(car_no, color) {
  if (car_no === "" || car_no === undefined || color === "" || color === undefined) {
    return;
  }

  if (isPC()) {
    window.localStorage.setItem(car_no, color);
  } else {
    scplugin.manager.setPluginData(pluginService.serviceHandle, car_no, color);
  }
}


function getCarOwner(car_no) {
  if (car_no === "" || car_no === undefined) {
    return "";
  }

  for (let index = 0; index < parkingObject.locationNum; index++) {
    if (parkingObject.carlocationlist[index].car_no === car_no) {
      if (parkingObject.carlocationlist[index].owner === "" || parkingObject.carlocationlist[index].owner === undefined) {
        return "";
      }
      return parkingObject.carlocationlist[index].owner;
    }
  }

  return "";
}


function getCarNickname(car_no, bracket) {
  if (car_no === "" || car_no === undefined) {
    return "";
  }

  for (let index = 0; index < parkingObject.locationNum; index++) {
    if (parkingObject.carlocationlist[index].car_no === car_no) {
      if (parkingObject.carlocationlist[index].nickname === "" || parkingObject.carlocationlist[index].nickname === undefined) {
        return "";
      }
      if (bracket) {
        let nickname = "(" + parkingObject.carlocationlist[index].nickname + ")";
        return nickname;
      }
      return parkingObject.carlocationlist[index].nickname;
    }
  }

  return "";
}


/* TV API */
function initParkingCardForTV(index, cardInfo) {
  let initHtml = "<div id='parkingCard' class='servicecards motion_card' style='float:left' onclick='parkingCardOnClick(\"location\")'></div>";
  document.getElementById('sortableDiv_' + index).innerHTML = initHtml;

  initHtml =
    "<div class='tv_servicecard_title_css'>통합차량</div>"+
    "<div id='parkingPageHeader'></div>" +
    "<div class='servicecards_title_space'>" +
      "<div id='parkingLocationTitle'></div>" +
      "<div class='clear'></div>" +
    "</div>" +
    "<div id='parkingLocation' class='servicecards_data_space'>" +
    "</div>" +
    "<div class='servicecards_title_space'>" +
      "<div id='parkingHistoryTitle'></div>" +
      "<div class='clear'></div>" +
    "</div>" +
    "<div id='parkingHistory' class='servicecards_data_space'>" +
    "</div>";

  document.getElementById('parkingCard').innerHTML = initHtml;

  if (document.getElementById('parkingLocationTitle') === null) {
    return;
  }
  if (document.getElementById('parkingHistoryTitle') === null) {
    return;
  }
  document.getElementById('parkingLocationTitle').innerHTML = drawServiceCardEditerImage("", 'parkingLocationTitleDetail');
  document.getElementById('parkingHistoryTitle').innerHTML = drawServiceCardEditerImage("", 'parkingHistoryTitleDetail');

  cardInfo.bEnabledCard = true;
  cardInfo.initCardOrder = index;
  cardInfo.nCardOrder = index;
  cardInfo.title = $.lang[lang].PARKING_LOCATION_TAB;
}


function drawParkingCardForTV() {
  if (!parkingObject.locationNum) {
    $("#parkingCard").fadeOut(1);
    $("#parkingCard").fadeIn(1000);
    return;
  }

  document.getElementById('parkingLocationTitleDetail').innerHTML = $.lang[lang].PARKING_LOCATION_TAB;
  document.getElementById('parkingHistoryTitleDetail').innerHTML = $.lang[lang].PARKING_VEHICLE_ENTRY;

  parkingLocationItemNumPerSwipe = 1;
  parkingHistoryItemNumPerSwipe = 3;

  drawParkingLocationCard();
  drawParkingHistoryCard();
  drawParkingPageCommon();

  if (swiperParkingLocationCard) {
    swiperParkingLocationCard.pagination.el.hidden = true;
  }
  if (swiperParkingHistoryCard) {
    swiperParkingHistoryCard.pagination.el.hidden = true;
  }

  let headerText = document.getElementById('parkingPageHeader').innerHTML.replace("되어<br>","되어 ");
  document.getElementById('parkingPageHeader').innerHTML = headerText;

  $('.parking_page_header').css('margin','98px 0px 72px 0px');
  $('.parking_card_box').css('height','93px');
  $('.parking_card_box').css('margin','0px 0px 20px 0px');
  $('.parking_page_header_text').css('font-weight','bold');
  $('#parkingHistory').css('margin','0px 8px 0px 8px');
  $('#parkingLocation').css('margin','0px 8px 0px 8px');
  $('#parkingLocationTitleDetail').css('margin','0px 12px 0px 12px');
  $('#parkingHistoryTitleDetail').css('margin','0px 12px 0px 12px');
}
