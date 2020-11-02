/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Main page to have all services.
 * @module main/screen
 */

var currentTab = "MAIN_SCREEN";
var firstLoad = 1;
var pluginService = null;
var firstLoadingTimer;

 /**
 * Create a MainScreenPage.
 * @constructor
 */
function MainScreenPage() {}

MainScreenPage.prototype = {
  /** card order
   * @type {object}
   * @instance
  */
  serviceCardOrder: null,
  /** Get title of page
   * @return {string}
   */
  getPageTitleText: function () {
    return userInfoObject.userInfoTitle;
  },
  /** Execute view of page */
  onViewPage: function () {
    if (this._refresh === undefined) {
      this._refresh = new PullToRefresh($('#mainScreen'), this.onRefreshing.bind(this), {paddingTarget: $('#mainScreen').find('.for_scroll')});
    }
    return loadedMainScreen("normal");
  },
  /** Get card order list */
  getServiceCardOrderArray: function () {
    return getServiceCardOrderArray();
  },
  /** The function called when all card is updated */
  onRefreshing: function () {
    console.log("onRefreshing()");
    window.location.replace(window.location.origin + window.location.pathname);
    this._refresh.finishRefresh();
  },
}

 /**
 * Create a CardSettingPage.
 * @constructor
 */
function CardSettingPage() {}

CardSettingPage.prototype = {
  /** Get title of page
   * @return {string}
   */
  getPageTitleText: function () {
    return $.lang[lang].CARDSETTINGS;
  },
  /** Execute view of page */
  onViewPage: function () {
    return loadedMainScreen("edit");
  },
}

/** Initiate sortable service */
function initSortableService(index) {
  var innerHtml = "<div id='sortableDiv_" + index + "' class='sortable_styles'></div>";
  document.getElementById('sortableDiv').innerHTML += innerHtml;
}
/** Load main screen */
function loadedMainScreen(mainScreenMode) {
  console.info(PACKAGE, "mainScreen", "loadedMainScreen", mainScreenMode);
  // initialize pallete
  for (var i = 0; i < serviceList.length; i++) {
    if ((serviceList[i].serverId.includes(SERVICEID_PARKING_LOCATION) ||
      serviceList[i].serverId.includes(SERVICEID_PARKING_HISTORY)) && serviceList[i].enabled === true) {
      toggleParkingPopup('none');
      break;
    }
  }
  drawActionBar(true);
  prevY = 50;

  basicMenuReset();
 // menuDown();

  if (firstLoad === 1) {
    clearTimeout(firstLoadingTimer);
    firstLoadingTimer = setTimeout(firstLoadingTimerCallback, FIRST_LOADING_TIMEOUT);
    //showMainLoadingScreen();

    if (enabledMainBanner === true) initMainBanner();

    for(var x=0, numSortable=1; x < serviceList.length; x++) {
      if(serviceList[x].enabled === true) {
          //console.log(serviceList[x].service.cardInfo.numServiceCard);
          for(var y=0; y < serviceList[x].service.cardInfo.numServiceCard; y++)
            initSortableService(numSortable+y);

          serviceList[x].service.initCard(numSortable);
          numSortable+=serviceList[x].service.cardInfo.numServiceCard;
      }
    }

    if (enabledMainServiceMenu === true) initMainServiceMenu();

    //scplugin.manager.getService(getServiceCallback, getServiceErrorCallback);
    for (var x = 0; x < serviceList.length; x++) {
      if (serviceList[x].enabled === true)
        serviceList[x].service.requestCardData();
    }

    firstLoad = 0;
  }

  loadMainServiceCard();
  /* setMainMotion(); removew inview on main card */
  setSortable('sortableDiv');

  for (var x = 0; x < serviceList.length; x++) {
    if (serviceList[x].enabled === true){
      serviceList[x].service.drawCard();
      if(serviceList[x].serverId === SERVICEID_ENERGY){
        resetEnergyMonthIndex();
      }
    }
  }


  if (isSmartTV()) {
    drawMainScreenForTV();
    // drawBillCardDetailForTV();
    //navis    naviBoard.setNavigation("mainCtrl","servicecards_data_space");
    //    console.log("setNavigation!!!!")
  }

  if (lang === "en") {
    $('.ic_chart_list_img').css('width', '92px');
    $('.energy_card_total_chart_layer').css('padding-left', '19px');
    $('.energy_card_total_chart_layer').css('padding-right', '19px');
    $('.notification_topic_text').css('width', 'calc(100% - 80px)');
  }
  /*
    for (var i = 0; i < serviceCardsNamesList.length; i++) {
      if (hidecards[serviceCardsNamesList[i]]==true) {
        document.getElementById(serviceCardsNamesList[i]).style.display = "none";
      }
      else {
        document.getElementById(serviceCardsNamesList[i]).style.display = "";
      }
    }
  */
  setMainScreenMode(mainScreenMode);
  window.touchPunchDelay = -1;

  return drawSettingMenuOfMainScreen();
}

function setSortable(id){
  $("#"+id).sortable({
    delay: 300,
    scroll: true,
  });
}

function menuMainEdit() {};

function showInfoPage() {
  console.log("Info Page")
};

function isCheckTwiceClick(){
  if(window.location.hash === "") {
    //console.log("clicked one time");
    return false;
  }
  //console.log("clicked twice");
  return true;
}

/** Open service page
 * @param {string} pagesDivId - page id
 * @param {object} service - called service
 * @param {boolean} force - false if you want to show loading toast, default : true
*/
function openServicePage(pagesDivId, service, force) {
  if(isCheckTwiceClick()) return;

  if (!force && service && service.getObject && (service.getObject().card_status !== "loaded")) {
    // page를 현재 보여줄 수 있는 상황이 아니라면 toast를 띄우고 page 진입을 막는다.
    // TODO : 문구 확정되면 language_set.js에 등록
    showToast($.lang[lang].LOADING);
    return;
  }

  var url = window.location.pathname + "#" + pagesDivId;
  if (checkUrl(url)) {
    document.location.href = url;
  }
}

/** function called when notification card is clicked */
function notificationCardOnClick() {
  openServicePage(SCREEN_SERVICE_NOTIFICATION, notificationService);
}

/** function called when parking card is clicked */
function parkingCardOnClick(subService) {
  var force = false;

  if (subService === 'location') {
    parkingObject.subServiceName = "location";
  } else {
    parkingObject.subServiceName = "history";
  }

  if (subService) {
    if (((subService === 'location') && (parkingService.getObject().locationcard_status === "loaded")) ||
      ((subService === 'history') && (parkingService.getObject().historycard_status === "loaded"))) {
      // location으로 진입시도시 location이 load 되어 있으면 진입
      // hystory로 진입시도시 hystory가 load 되어 있으면 진입
      force = true;
    }
  } else {
    if ((parkingService.getObject().locationcard_status === "loaded") || (parkingService.getObject().historycard_status === "loaded")) {
      // 일반적인 경우 둘 중 하나만 load 되어도 진입
      force = true;
    }
  }

  if ((parkingService.getObject().locationcard_status === "loading") || (parkingService.getObject().historycard_status === "loading")) {
    // 둘 중 하나라도 loading 상태가 있으면, toast 표시
    showToast($.lang[lang].LOADING);
  }

  openServicePage(SCREEN_SERVICE_PARKING, parkingService, force);
}

/** function called when bill card is clicked */
function billCardOnClick() {
  openServicePage(SCREEN_SERVICE_BILL, billService);
}

/** function called when parcel card is clicked */
function parcelCardOnClick() {
  openServicePage(SCREEN_SERVICE_PARCEL, parcelService);
}

/** function called when visitor card is clicked */
function visitorCardOnClick() {
  openServicePage(SCREEN_SERVICE_VISITOR, visitorService);
}

/** function called when vote card is clicked */
function voteCardOnClick() {
  openServicePage(SCREEN_SERVICE_VOTE, voteService);
}

/** function called when contact card is clicked */
function contactsCardOnClick() {
  openServicePage(SCREEN_SERVICE_CONTACTS, contactsService);
}

/** function called when inquiry card is clicked */
function inquiryCardOnClick() {
  openServicePage(SCREEN_SERVICE_INQUIRY, inquiryService); // TODO : inquiryService is not exist yet
}

/** function called when energy card is clicked */
function energyCardOnClick() {
  openServicePage(SCREEN_SERVICE_ENERGY, energyService);
}

/** function called when admin card is clicked */
function adminCardOnClick() {
  openServicePage(SCREEN_SERVICE_ADMIN, adminService);
}

function firstLoadingTimerCallback() {
  showLoadingErrorDialog();
}

/** function called when cctv card is clicked */
function cctvCardOnClick() {
  openServicePage(SCREEN_SERVICE_CCTV, cctvService);
}

/** Draw card with title and sub text */
function drawServiceCardEditerImage(title, id, subid) {
  if(subid === undefined) subid="";
  var ret_html =
/*    "<span class='servicecard_edit_icon' style='width:20px;float:left;margin-left:22px;margin-top:20px;margin-right:-12px'>" +
    "<span class='btn-remove' onclick='event.cancelBubble=true;cardRemove(event, this)'>" +
    "<img src='img/ic_edit_delete.png' width='20px' height='20px'/>" +
    "</span>" +
    "</span>" + */
    "<div id=" + id + " class='servicecards_title_text'>" + title + "</div>" +
    "<div id=" + subid + " class='servicecards_title_text_sub'></div>";
/*    "<span class='servicecard_edit_icon' style='float:right;margin-top:20px;margin-right:22px;height:20px;width:20px'>" +
    "<img src='res/img/ic_edit_move.png' width='20px' height='20px' usemap='#menuMoveMap'/>" +
    "<map name='menuMoveMap'>" +
    "<area class='btn-move-up' shape='rect' coords='0,0,20,10' onclick='event.cancelBubble=true;cardUpDown(event, this)'>" +
    "<area class='btn-move-down' shape='rect' coords='0,10,20,20' onclick='event.cancelBubble=true;cardUpDown(event, this)'>" +
    "</map>" +
    "</span>";*/

  return ret_html;
}

/** Draw setting menu on main screen */
function drawSettingMenuOfMainScreen() {
  var menuArr = createOptionMenu();
  return menuArr; //temporary, Originally, checkloadeddata!
}


function getAddMenuText(text){
  return text;
}


function createOptionMenu() {
  var mainScreenMenuArr = {
    menuItem: []
  };

  //  console.debug(PACKAGE, "mainScreen", "createOptionMenu");
  setActionBarMenu("visible");

  mainScreenMenuArr.menuItem = [];
  if (currentTab === "MAIN_SCREEN") {
    mainScreenMenuArr.menuItem.push({
      title: $.lang[lang].MAINEDIT,
      href: "#"+SCREEN_OPTION_FB_EDIT,
      fun: menuMainEdit
    });
    mainScreenMenuArr.menuItem.push({
      title: $.lang[lang].ALARM,
      href: "#"+SCREEN_OPTION_ALARM
    });
    mainScreenMenuArr.menuItem.push({
      title: $.lang[lang].HELP_PAGE,
      href: "#"+SCREEN_OPTION_HELP
    });
    mainScreenMenuArr.menuItem.push({
      title: $.lang[lang].PLUGIN_INFO,
      href: "#"+SCREEN_OPTION_INFO,
      fun: showInfoPage
    });
  } else {
    mainScreenMenuArr.menuItem.push({
      title: $.lang[lang].PLUGIN_INFO,
      href: "#"+SCREEN_OPTION_INFO,
      fun: showInfoPage
    });
  }

  setMenu(mainScreenMenuArr.menuItem);

  return mainScreenMenuArr;
}

/** Set main screen mode */
function setMainScreenMode(mainScreenMode) {
  var serviceCardEditIcons = document.getElementsByClassName('servicecard_edit_icon');
  var serviceCards = document.getElementsByClassName('servicecards');
  /* mainScreen Edit Mode */
  if (mainScreenMode === "edit") {
    //console.log("Edit Mode");

    // disable action bar menu
    setActionBarMenu("hidden");

    // disable new notification
    document.getElementById("mainBannerDiv").style.display = "none";

    // save/canble/reset button disable
    document.getElementById('edit_fixed_menu').style.visibility = "visible";

    //edit icon enable & onclick evnet disable
    serviceCardEditIcons = document.getElementsByClassName('servicecard_edit_icon');
    for (var i = 0; i < serviceCards.length; i++) {
      serviceCardEditIcons[2 * i].style.display = "";
      serviceCardEditIcons[2 * i + 1].style.display = "";
      serviceCards[i].onclick = "";
    }

    if (isFHub()) {
      scplugin.manager.setFlag("openAdditionalPage");
      //if (currentDivId === "mainScreen")
      //  currentDivId = "cardSettings";
    }
  } else {
    // console.log("Normal Mode");

    // enable new notification
    //document.getElementById("mainBannerDiv").style.display = "none";

    // save/canble/reset button visible
    //document.getElementById('edit_fixed_menu').style.visibility = "hidden";

    //edit icon disable & onclick evnet enable
    /*for (var i = 0; i < serviceCards.length; i++) {
      if (serviceCardEditIcons[2 * i] != undefined) {
        serviceCardEditIcons[2 * i].style.display = "none";
        serviceCardEditIcons[2 * i + 1].style.display = "none";
        var tmp = serviceCards[i].id + "OnClick()";
        serviceCards[i].setAttribute("onClick", tmp);
        //console.log(tmp);
      }
    }*/
  }
}


/*
 * Main card Sortable
 */

var serviceMainCardDefaultNodes=null;
var serviceMainCardDefaultLength=null;
// 초기치는 null, 저장한 후에 화면에 표시되는 경우에 exist로 표시한다.

var serviceCardDataKey = "serviceCardDataKey";
var serviceCardDataTimerID;

function serviceCardDataTimer() {
  console.log("Cannot get the serviceCardData");
}

function serviceCardDataCallback(key, value) {
  //  if (value != null) {
  if (value !== null && value !== '' && value !== undefined) {
    mainscreenPage.serviceCardOrder = value;
    clearTimeout(serviceCardDataTimerID);
    setMainServiceCardOrder();
    //    console.log("###### onPluginDataCallback key: " + key + " value: " + value );
  } else {
    //    console.log("###### onPluginDataCallback key: " + key + " > NOT FOUND VALUE");
  }
}

/** Load card on main screen */
function loadMainServiceCard() {
  if(serviceMainCardDefaultNodes === null) {
    serviceMainCardDefaultNodes = $("#sortableDiv").children();
    serviceMainCardDefaultLength = serviceMainCardDefaultNodes.length;
    //    console.log("pp",serviceMainCardDefaultNodes);
  }

  //  console.log("serviceCardDataValue",mainscreenPage.serviceCardOrder);
  if(mainscreenPage.serviceCardOrder === null) {
    if (isWindows()) {
      mainscreenPage.serviceCardOrder = localStorage.getItem("ServiceCardsSorted");
      setMainServiceCardOrder();
    } else {
      clearTimeout(serviceCardDataTimerID);
      scplugin.manager.getPluginData(pluginService.serviceHandle, serviceCardDataKey, serviceCardDataCallback);
      serviceCardDataTimerID = setTimeout(serviceCardDataTimer, 10000);
    }
  } else {
    setMainServiceCardOrder();
  }
}

/** Set card order on main screen */
function setMainServiceCardOrder() {
  if( mainscreenPage.serviceCardOrder !== null){
    var arrValuesForOrder = getServiceCardOrderArray();
    var arrValuesForEnabled = getServiceCardEnabledArray();

    // console.log("main order : ",arrValuesForOrder)
    var $ul = $("#sortableDiv");
    //console.log($ul);
    //    console.log("get "+ arrValuesForOrder);

    // loop backwards so you can just prepend elements in the list
    // instead of trying to place them at a specific position
    /*
    // update order of servicecard
    for (var i = arrValuesForOrder[arrValuesForOrder.length - 1]; i >= 0; i--) {
      // index is zero-based to you have to remove one from the values in your array
      //console.log(serviceMainCardDefaultNodes.get((arrValuesForOrder[i] - 1)));
      $ul.prepend(serviceMainCardDefaultNodes.get((arrValuesForOrder[i] - 1)));
      markedServiceCardAvailable[arrValuesForOrder[i] - 1] = "exist";
    }
    */
    for (var i = 0 ; i < arrValuesForOrder.length; i++) {
      var tmpCardIndexOrder = arrValuesForOrder[i];
      var tmpCardEnabled = parseInt(arrValuesForEnabled[i]);
      // console.log("tmpCardIndexOrder",tmpCardIndexOrder);
      //      console.log(serviceMainCardDefaultNodes.get(tmpCardIndexOrder-1));
      // console.log(serviceMainCardDefaultNodes.get(tmpCardIndexOrder-1));
      if(tmpCardEnabled === 1) {
        $ul.append(serviceMainCardDefaultNodes.get(tmpCardIndexOrder-1));
      } else {
        serviceMainCardDefaultNodes.get(tmpCardIndexOrder-1).remove();
      }

    }

    /*
    //console.log(markedServiceCardAvailable);
    for (var i = 0; i < serviceMainCardDefaultLength; i++) {
      if (markedServiceCardAvailable[i] != "exist") {
        //console.log($("#sortableDiv_"+(i+1)));
        markedServiceCardAvailable[i] = $("#sortableDiv_" + (i + 1)).detach();
      }
    }
    */
  } else {
    // ServiceCardsSorted파일이 없는 상황에서 Edit Mode에서 저장하지 않고 돌아올 경우 최초의 화면으로 복귀 시킨다.
    initMainServiceCard();
  }
}

// 초기화면을 구성한다.
function initMainServiceCard() {
  var sortableDiv = $("#sortableDiv");
  for (var i = (serviceMainCardDefaultNodes.length - 1); i >= 0; i--) {
    // index is zero-based to you have to remove one from the values in your array
    sortableDiv.prepend(serviceMainCardDefaultNodes.get(i));
  }
}

function showCardInfo(){
  for(var i=0; i < serviceList.length; i++) {
//    console.log("!!!",serviceList[i].service.cardInfo.numServiceCard);
    if(serviceList[i].enabled === true) {
      for(var j=0; j < serviceList[i].service.cardInfo.numServiceCard; j++){
          console.log(serviceList[i].service.cardInfo.list[j].initCardOrder);
          console.log(serviceList[i].service.cardInfo.list[j].bEnabledCard);
          console.log(serviceList[i].service.cardInfo.list[j].nCardOrder);
          console.log(serviceList[i].service.cardInfo.list[j].title);
      }
    }
  }
}
/** Get service of initial card order
 * @param {number} index - The index of the service when based on the initial card order
 * @return {object} service
*/
function getServiceByInitCardOrder(index) {
  for(var i=0; i < serviceList.length; i++) {
    if(serviceList[i].enabled === true) {
      for(var j=0; j < serviceList[i].service.cardInfo.numServiceCard; j++){
          if(parseInt(index) === serviceList[i].service.cardInfo.list[j].initCardOrder) {
//            console.log(index,serviceList[i].service.cardInfo.list[j].title);
            return serviceList[i].service;
          }
        }
      }
  }
  return null;
}
/** Get service card information when based on initial card order
 * @param {number} index - The index of the service when based on the initial card order
 * @return {object} card information of service
*/
function getServiceCardInfoByInitCardOrder(index) {
  for(var i=0; i < serviceList.length; i++) {
    if(serviceList[i].enabled === true) {
      for(var j=0; j < serviceList[i].service.cardInfo.numServiceCard; j++){
          //console.log("kk ",serviceList[i].service.cardInfo.list[j].initCardOrder);
          if(parseInt(index) === serviceList[i].service.cardInfo.list[j].initCardOrder) {
//            console.log(index,serviceList[i].service.cardInfo.list[j].title);
            return serviceList[i].service.cardInfo.list[j];
          }
        }
      }
  }
  return null;
}
/** Get service card information when based on current card order
 * @param {number} index - The index of the service when based on the current card order
 * @return {object} card information of service
*/
function getServiceCardInfoByCardOrder(index) {
  for(var i=0; i < serviceList.length; i++) {
    if(serviceList[i].enabled === true) {
      for(var j=0; j < serviceList[i].service.cardInfo.numServiceCard; j++){
          if(parseInt(index) === serviceList[i].service.cardInfo.list[j].nCardOrder) {
//            console.log(index,serviceList[i].service.cardInfo.list[j].title);
            return serviceList[i].service.cardInfo.list[j];
          }
        }
      }
  }
  return null;
}

/** Set service card information when based on initial card order
 * @param {number} index - The index of the service when based on the initial card order
 * @param {numnber} nCardOrder initial card order
*/
function setServiceCardOrderByinitCardOrder(index,nCardOrder){
  var cardInfo = getServiceCardInfoByInitCardOrder(index);
  cardInfo.nCardOrder = nCardOrder;
}
/** Set enabled card when based on current card order
 * @param {number} index - The index of the service when based on the current card order
 * @param {boolean} bEnabledCard Whether it is a enabled card
*/
function setServiceCardEnabledByCardOrder(index,bEnabledCard){
  var cardInfo = getServiceCardInfoByCardOrder(index);
  if (cardInfo) {
    cardInfo.bEnabledCard = bEnabledCard;
  }
  //console.log(cardInfo);
}

/** reset card information */
function resetServiceCardInfo() {
  for(var i=0; i < serviceList.length; i++) {
    if(serviceList[i].enabled === true) {
      for(var j=0; j < serviceList[i].service.cardInfo.numServiceCard; j++) {
        serviceList[i].service.cardInfo.list[j].bEnabledCard=true;
        serviceList[i].service.cardInfo.list[j].nCardOrder =
          serviceList[i].service.cardInfo.list[j].initCardOrder;
      }
    }
  }
}

/** Exit page */
function exitPluginPage() {
  if (serviceMain.currentDivString === "mainScreen")
    scplugin.manager.close();
  else
    window.history.back();
}
