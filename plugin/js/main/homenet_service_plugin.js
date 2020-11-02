/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview It is a main service for controlling and managing various services.
 * @module main/homenet_service_plugin
 */

/**************** HomenetServicePlugIn ***************/

//pages are ordered by z-index
/** Main screen 
 * @constant {string} */
const SCREEN_MAIN = "mainScreen";
/** Edit favorite page
 * @constant {string} */
const SCREEN_OPTION_FB_EDIT = "mainEditPage";
/** Alarm setting page
 * @constant {string} */
const SCREEN_OPTION_ALARM = "mainAlarmPage";
/** Help page
 * @constant {string}   */
const SCREEN_OPTION_HELP = "helpScreenPage"
/** Information page
 * @constant {string}   */
const SCREEN_OPTION_INFO = "informationPage";
/** License page
 * @constant {string}   */
const SCREEN_OPTION_INFO_LICENSE = "licensePage";
/** Privacy Policy page
 * @constant {string}   */
const SCREEN_OPTION_INFO_PRIVACY_POLICY = "privacyPage";

/** Notification service page
 * @constant {string}   */
const SCREEN_SERVICE_NOTIFICATION = "notificationPage";
/** Parking service page
 * @constant {string}   */
const SCREEN_SERVICE_PARKING = "parkingPage";
/** Parcel service page
 * @constant {string}   */
const SCREEN_SERVICE_PARCEL = "parcelPage";
/** Visitor page
 * @constant {string}   */
const SCREEN_SERVICE_VISITOR = "visitorPage";
/** CCTV page
 * @constant {string}   */
const SCREEN_SERVICE_CCTV = "cctvPage";
/** Energy service page
 * @constant {string}   */
const SCREEN_SERVICE_ENERGY = "energyPage";
/** Admin service page
 * @constant {string}   */
const SCREEN_SERVICE_ADMIN = "adminPage";

const SCREEN_SERVICE_BILL = "billPage";
const SCREEN_SERVICE_VOTE = "vote";
const SCREEN_SERVICE_CONTACTS = "contactsPage";
const SCREEN_SERVICE_INQUIRY = "inquiryPage";


var pagesDivIdNamesList = [
  SCREEN_MAIN,
  SCREEN_OPTION_FB_EDIT,
  SCREEN_OPTION_ALARM,
  SCREEN_OPTION_HELP,
  SCREEN_OPTION_INFO,
  SCREEN_OPTION_INFO_LICENSE,
  SCREEN_OPTION_INFO_PRIVACY_POLICY,
  SCREEN_SERVICE_NOTIFICATION,
  SCREEN_SERVICE_PARKING,
  SCREEN_SERVICE_BILL,
  SCREEN_SERVICE_PARCEL,
  SCREEN_SERVICE_VISITOR,
  SCREEN_SERVICE_CCTV,
  SCREEN_SERVICE_VOTE,
  SCREEN_SERVICE_CONTACTS,
  SCREEN_SERVICE_INQUIRY,
  SCREEN_SERVICE_ENERGY,
  SCREEN_SERVICE_ADMIN
];

var pluginService;

/**
 * Create a HomenetServicePlugIn.
 * @constructor
 */
function HomenetServicePlugIn() { }

HomenetServicePlugIn.prototype = {
  /** The name of current div.
   * @type {string}
   * @instance
   */
  currentDivString: SCREEN_MAIN,
  /** The number of previous div.
   * @type {number}
   * @instance
   */
  preDiv: -1,
  /** The number of current div.
   * @type {number}
   * @instance
   */
  currentDiv: -1,
  /** The title of this page.
   * @type {string}
   * @instance
   */
  pageTitle: null,
  pageLoadFunction: null,
  /** Start plugin */
  startPlugIn: function () {
    startPlugin();
  },
  /**
	 * Get service by div id
	 * @param {string} divId - The id of <div>
   * @return {object}
	 */
  getServiceByDivString: function (divId) {
    this.currentDivString = divId.replace("#", "");
    switch (divId) {
      case "#" + SCREEN_OPTION_FB_EDIT:
        return mainscreenEditPage;
      case "#" + SCREEN_OPTION_ALARM:
        return mainscreenAlarmPage;
      case "#" + SCREEN_OPTION_HELP:
        return helpScreen;
      case "#" + SCREEN_OPTION_INFO:
        return informationPage;
      case "#" + SCREEN_OPTION_INFO_LICENSE:
        return licensePage;
      case "#" + SCREEN_OPTION_INFO_PRIVACY_POLICY:
        return privacyPage;
      case "#" + SCREEN_SERVICE_NOTIFICATION:
        return notificationService;
      case "#" + SCREEN_SERVICE_PARKING:
        return parkingService;
      case "#" + SCREEN_SERVICE_BILL:
        return billService;
      case "#" + SCREEN_SERVICE_PARCEL:
        return parcelService;
      case "#" + SCREEN_SERVICE_VISITOR:
        return visitorService;
      case "#" + SCREEN_SERVICE_CCTV:
        return cctvService;
      case "#" + SCREEN_SERVICE_VOTE:
        return voteService;
      case "#" + SCREEN_SERVICE_CONTACTS:
        return contactsService;
      case "#" + SCREEN_SERVICE_INQUIRY:
        return null;
      case "#" + SCREEN_SERVICE_ENERGY:
        return energyService;
      case "#" + SCREEN_SERVICE_ADMIN:
        return adminService;
      default:
        this.currentDivString = SCREEN_MAIN;
        return mainscreenPage;
    }
  }
}

/** get service */
function promiseGetService() {
  return new Promise((resolve, reject) => {
    if ((pluginService !== null) && (pluginService !== undefined)) {
      resolve();
    } else {
      scplugin.manager.getService(
        (service) => {
          pluginService = service;

          if (OPERATION_MODE === 0 && STAND_ALONE === 0 && isPC() === null) {
            pluginService.sendRequest = sendRequest_fake;
          }

          resolve();
        },
        (error) => {
          console.log(PACKAGE, "MainScreen", "getServiceErrorCallback. error name: " + error.name + " message: " + error.message);
          reject();
        }
      );
    }
  });
}

/** start plugin */
function startPlugin() {
  if(isSmartTV()){
    initMainScreenForTV();
  }
  promiseGetService()
    .then(promiseLoadServerInfo)
    .then(promiseLoadUserInfoTitle)
    .then(checkLegalInformationData)
    .then(() => {
      var param = window.location.hash.split("/");
      var servicepage = serviceMain.getServiceByDivString(param[0]);
      serviceMain.pageTitle = servicepage.getPageTitleText();
      showContent(servicepage);
    });
}

/** show content */
function showContent(servicepage) {
  for (var i = 0; i < pagesDivIdNamesList.length; i++) {
    var page = document.getElementById(pagesDivIdNamesList[i]);
    if ((pagesDivIdNamesList[i] === serviceMain.currentDivString) && (page !== null)) {
      serviceMain.currentDiv = i;
    }
  }

  let currentPageId = pagesDivIdNamesList[serviceMain.currentDiv];
  let previousPageId = pagesDivIdNamesList[serviceMain.preDiv];
  var currentPage = document.getElementById(currentPageId);
  var previousPage = document.getElementById(previousPageId);
  if (currentPage !== null) {
    resetPageEffect(currentPage);
  }
  if (previousPage !== null) {
    resetPageEffect(previousPage);
  }

  if (serviceMain.currentDiv > serviceMain.preDiv) {
    if (serviceMain.preDiv >= 0) {
      if (previousPage && previousPageId === SCREEN_OPTION_INFO && (currentPageId === SCREEN_OPTION_INFO_LICENSE || currentPageId === SCREEN_OPTION_INFO_PRIVACY_POLICY)) {
        previousPage.addEventListener("transitionend", pageTransitionEnd, false);
        previousPage.style.transform = "translateX(0%)";
      } else if (previousPage !== null) {
        previousPage.addEventListener("transitionend", pageTransitionEnd, false);
        previousPage.style.transform = "translateX(-10%)";
      }
      if (currentPage !== null) {
        currentPage.addEventListener("animationend", pageEnterEnd, false);
        currentPage.classList.add('page_enter');
      }
    }
  } else if (serviceMain.currentDiv < serviceMain.preDiv) {
    if (previousPage !== null) {
      previousPage.addEventListener("animationend", pageExitEnd, false);
      previousPage.classList.add('page_exit');
    }
    if (currentPage !== null) {
      currentPage.addEventListener("animationend", pageMoveBackEnd, false);
      currentPage.classList.add('page_move_back');
    }

    if (previousPageId === SCREEN_OPTION_FB_EDIT) {
      if (mainscreenEditPage.editAction === EDIT_ACTION_OK) {
        showToast($.lang[lang].FAVORITE_OK);
        mainscreenEditPage.editAction = EDIT_ACTION_CANCEL;
      } else {
        showToast($.lang[lang].FAVORITE_CANCEL);
      }

    }
  }

  if (currentPage !== null)
    currentPage.style.display = "block";

  serviceMain.preDiv = serviceMain.currentDiv;

  $(".page_detailed_style").scrollTop(0);
  // console.log(".page_detailed_style.scrollTop(0)");
  servicepage.onViewPage();

}

function pageTransitionEnd() {
  this.style.transform = "translateX(0%)";
  this.style.display = "hidden";
  this.removeEventListener("transitionend", pageTransitionEnd, false);
}

function pageEnterEnd() {
  this.classList.remove("page_enter");
  this.removeEventListener("animationend", pageEnterEnd, false);
}

function pageExitEnd() {
  this.style.display = "none";
  this.classList.remove("page_exit");
  this.removeEventListener("animationend", pageExitEnd, false);
}

function pageMoveBackEnd() {
  this.classList.remove('page_move_back');
  this.style.transform = "";
  this.removeEventListener("animationend", pageMoveBackEnd, false);
}

function resetPageEffect(page) {
  if (page.classList.contains('page_enter')) {
    page.classList.remove('page_enter');
  }
  if (page.classList.contains('page_exit')) {
    page.classList.remove('page_exit');
  }
  if (page.classList.contains('page_move_back')) {
    page.classList.remove('page_move_back');
  }
  page.removeEventListener('animationend', pageEnterEnd, false);
  page.removeEventListener('transitionend', pageTransitionEnd, false)
  page.removeEventListener('animationend', pageExitEnd, false);
  page.removeEventListener('animationend', pageMoveBackEnd, false);
  page.style.transform = "";
}

function doLoadingErrorAction() {
  window.scplugin.log.error(PACKAGE, "MAIN", "doLoadingErrorAction");
  document.getElementById("loading_error_dialog").style.display = "none";
  if (serviceMain.currentDivString !== "mainScreen") {
    hideMainLoadingScreen();
  } else {
    backAction("back");
  }
}

/** show loading view */
function showMainLoadingScreen() {
  $('#loading').css('margin-top', 'calc(0%)');

  document.getElementById("loading").style.display = "flex";
  document.getElementById("contents").style.display = "hidden";
  setActionBarMenu("hidden");
}

/** hide loading view */
function hideMainLoadingScreen() {
  var loadedCard = true;
  for (var x = 0; x < serviceList.length; x++) {
    if (serviceList[x].enabled === true)
      if (serviceList[x].service.getObject().card_status !== "loaded")
        loadedCard = false;
  }

  if (loadedCard === true) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("contents").style.display = "flex";
    clearTimeout(firstLoadingTimer);
  }
}
