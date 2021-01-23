/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Visitors service shows a list of missed visitors.
 * @module service/visitor/init
 * @author Home IoT R&D Team
 */

/** The number of item in a page
 * @constant {number} */
const VISITOR_ITEM_NUM_PER_SWIPE = 3;
/** The number of item in a favorite card
 * @constant {number} */
const VISITOR_MAX_ITEM_NUM_IN_FAVORITE_PAGE = 30;

/**
 * Create a VisitorService.
 * @constructor
 */
function VisitorService() { }

var visitorBaseUri = "service/visitor/";
var visitorImageUri = visitorBaseUri + "res/img/";
var visitorSvgUri = visitorBaseUri + "res/svg/";

VisitorService.prototype = {
  /** The default values of main banner.
   * @type {boolean}
   * @instance
   */
  enabledMainBanner: false,
  /** The favorite card information.
   * @type {object}
   * @instance
   */
  cardInfo: {
    numServiceCard: 0,
    list: []
  },
  /** The data of alarm setting.
   * @type {object}
   * @instance
   */ 
  bAlarmAvailable: {
    enabled: [false],
    default: [false],
  },
  /** The function called on click event.
   * @type {string}
   * @instance
   */  
  getPageClickFunctionName: "visitorCardOnClick",
  /** The icon name on dark theme.
   * @type {string}
   * @instance
   */  
  getIconName: visitorImageUri+"home_ic_status_visitor_dark.png",
  /** The icon name on white theme.
   * @type {string}
   * @instance
   */
  getLightIconName: visitorImageUri+"home_ic_status_visitor_light.png",
  /** The icon of SVG.
   * @type {string}
   * @instance
   */
  getIconSVG: document.loadedSVG.visitor,
  /** Get title of page.
   * @return {string}
  */
  getPageTitleText: function () {
    return $.lang[lang].VISITOR_SERVICE;
  },
  /** Get title of favorite card. 
   * @return {string}
  */
  getFavoriteCardText: function () {
    return $.lang[lang].VISITOR_SERVICE;
  },
  /** Execute view of page. */
  onViewPage: function () {
    loadedVisitorPage(this);
  },
  /** Initiate main banner. */
  initMainBanner: function () { // 반포레이안의 경우 표시 안함 index.js 에서 disable
    initVisitorMainBanner();
    this.enabledMainBanner = true; // Banner 표시, 각 서비스별 지원 여부
  },
  /** 
   * Initiate favorite card. 
   * @param {number} index - The index of favorite card for this service.
   */
  initCard: function (index) { // main 에 보이는 favorite 카드에 대한 초기화
    initVisitorCard(index, this.cardInfo.list[0]);
  },
  /** Initiate page. */
  initPage: function () { // detail 페이지  초기화
    initVisitorPage();
  },
  /** Request data of favorite card. */
  requestCardData: function () {
    setTimeout(updateVisitorInfo(1), 0);
  },
  /** Request data of page. */
  requestPageData: function () {
    /* none */
  },
  /** Draw favorite card. */
  drawCard: function () { // main 에 보이는 favorite 카드에 대한 draw
    drawCardVisitorInfo();
  },
  /** Draw page. */
  drawPage: function () { // detail 페이지  draw
    drawVisitorPage();
  },
  /** Get service object. */
  getObject: function () {
    return visitorObject;
  },
  /** Create option menu. */
  createOptionMenu: function () {
    /* none */
  },
   /** The data of help information.
   * @type {object}
   * @instance
   */
  helpInformation: {
    bEnable: false
  }
}

function visitorServiceInfo() {
  // console.log("visitorServiceInfo" + "() called...");
  //console.log(PACKAGE, "explain visitor service ");
  // TODO : Need to implement
}
// includeJs(visitorSvgUri+"home_ic_status_visitor.svg.js");
includeJs(visitorSvgUri+"tw_ic_clear_search_api_mtrl.svg.js");
includeJs(visitorSvgUri+"visitor_button_bg.svg.js");
includeJs(visitorSvgUri+"visitor_button_previous.svg.js");
includeJs(visitorSvgUri+"visitor_button_next.svg.js");

var visitorService = new VisitorService();
setServerInit(visitorService,SERVICEID_VISITOR);

includeJs("service/visitor/js/visitor_object.js");
includeJs("service/visitor/js/visitor_server_api.js");
//includeJs("service/visitor/js/visitor_fakedata.js");

includeJs("service/visitor/js/visitor_main.js");

$('head').append('<link rel="stylesheet" type="text/css" href="service/visitor/css/visitor-style.css" />');
