/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Parking service shows parking location and entrance records.
 * @module service/parking
 * @author Home IoT R&D Team
 */


var parkingImageUri ="service/parking/res/img/";
var parkingSVGUri ="service/parking/res/svg/";

var parkingLocationItemNumPerSwipe = 3;
var parkingHistoryItemNumPerSwipe = 3;

ParkingService.prototype = {
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
    enabled: [ true, true ],
    default: [ true, true ],
  },


  /** The function called on click event.
   * @type {string}
   * @instance
   */
  getPageClickFunctionName: "parkingCardOnClick",


  /** The icon name on dark theme.
   * @type {string}
   * @instance
   */ 
  getIconName: parkingImageUri+"home_ic_status_parking_dark.png",


  /** The icon name on white theme.
   * @type {string}
   * @instance
   */
  getLightIconName: parkingImageUri+"home_ic_status_parking_light.png",
  /** The icon of SVG.
   * @type {string}
   * @instance
   */
  getIconSVG: document.loadedSVG.home_ic_status_parking,

  /** Get title of service menu. */
  getPageTitleText: function(index) {
    return $.lang[lang].PARKING_TAB;
  },


  /** Get title of favorite card. */
  getFavoriteCardText: function(index) {
    if (ParkingLocationEnabled && ParkingHistoryEnabled) {
      if (this.cardInfo.list[index].cardID === SERVICEID_PARKING_LOCATION) {
        return $.lang[lang].PARKING_LOCATION_FC_TEXT;
      } else if (this.cardInfo.list[index].cardID === SERVICEID_PARKING_HISTORY) {
        return $.lang[lang].PARKING_VEHICLE_ENTRY;
      }
    }
    return $.lang[lang].PARKING_TAB;
  },


  /** Execute view of page. */
  onViewPage: function() {
    return loadedParkingPage(this);
  },


  /** Initiate main banner. */
  initMainBanner: function() {
    initParkingMainBanner();
    this.enabledMainBanner = true;
  },


  /** 
   * Initiate favorite card. 
   * @param {number} index - The index of favorite card for this service.
   */
  initCard: function(index) {
    if(isSmartTV()){
      initParkingCardForTV(index,this.cardInfo.list[0]);
      return;
    }

    for (let i = 0; i < this.cardInfo.numServiceCard; i++) {
      if (this.cardInfo.list[i].cardID === SERVICEID_PARKING_HISTORY) {
        initParkingHistoryCard(index + i, this.cardInfo.list[i]);
      }
      if (this.cardInfo.list[i].cardID === SERVICEID_PARKING_LOCATION) {
        initParkingLocationCard(index + i, this.cardInfo.list[i]);
      }
    }
  },


  /** Initiate page. */
  initPage: function() {
    initParkingPage();
  },


  /** Request data of favorite card. */
  requestCardData: function() {
    for (let i = 0; i < this.cardInfo.numServiceCard; i++) {
      if (this.cardInfo.list[i].cardID === SERVICEID_PARKING_HISTORY) {
        setTimeout(requestParkingHistory(1), 0);
      }
      if (this.cardInfo.list[i].cardID === SERVICEID_PARKING_LOCATION) {
        setTimeout(updateParkingLocation(), 0);
      }
    }
  },


  /** Request data of page. */
  requestPageData: function() {
    setTimeout(requestParkingPage(1), 0);
  },


  /** Draw favorite card. */
  drawCard: function() {
    if (isSmartTV()) {
      drawParkingCardForTV();
      return;
    }

    for (let i = 0; i < this.cardInfo.numServiceCard; i++) {
      if (this.cardInfo.list[i].cardID === SERVICEID_PARKING_HISTORY) {
        drawParkingHistoryCard();
      }
      if (this.cardInfo.list[i].cardID === SERVICEID_PARKING_LOCATION) {
        drawParkingLocationCard();
      }
    }
  },


  /** Draw page. */
  drawPage: function() {
    drawParkingPage();
  },


  /** Get service object. */
  getObject: function() {
    return parkingObject;
  },


  /** Create option menu. */
  createOptionMenu: function() {
    // createParkingOptionMenu(this);
  },


  /** The data of help information.
   * @type {object}
   * @instance
   */
  helpInformation: {
    bEnable: true,
    title: $.lang[lang].PARKING_TAB,
    iconUri: parkingImageUri+"help_ic_status_parking.png",
    svgText : document.loadedSVG.help_parking,
		list:[
      {
        service_id: SERVICEID_PARKING_LOCATION,
        imageUri: (lang === "ko") ? parkingImageUri + "help_info_img_location2.png" : parkingImageUri + "help_info_img_location2_eng.png",
        imageSize: { width:"100%", height:"auto" },
        bSubTitle : false,
        subTitle: $.lang[lang].HELP_PARK_ONE_PASS_KEY,
        contentsList: $.lang[lang].HELP_PARK_LOCATION_DESC
      },
			{
        service_id: SERVICEID_PARKING_HISTORY,
        imageUri: (lang === "ko") ? parkingImageUri + "help_info_img_entry.png" : parkingImageUri + "help_info_img_entry_eng.png",
        imageSize: { width:"100%", height:"auto" },
        bSubTitle : false,
        subTitle: $.lang[lang].HELP_PARK_VEHICLE_ENTRY,
        contentsList: $.lang[lang].HELP_PARK_ENTRY_DESC
      }
    ]
  }
}


/**
 * Create a ParkingService.
 * @constructor
 */
function ParkingService() {}


var parkingService = new ParkingService();

if (ParkingLocationEnabled && ParkingHistoryEnabled) {
  setServerInit(parkingService, SERVICEID_PARKING_LOCATION, SERVICEID_PARKING_HISTORY);
} else {
  if (ParkingLocationEnabled) {
    setServerInit(parkingService, SERVICEID_PARKING_LOCATION);
  }
  if (ParkingHistoryEnabled) {
    setServerInit(parkingService, SERVICEID_PARKING_HISTORY);
  }
}


includeJs("service/parking/js/parking_object.js");
includeJs("service/parking/js/parking_server_api.js");
includeJs("service/parking/js/parking_main.js");
includeJs(parkingSVGUri + "home_ic_status_parking.svg.js");
includeJs(parkingSVGUri + "parking_ic_status_parking_bonnet.svg.js");
includeJs(parkingSVGUri + "parking_ic_status_parking_color.svg.js");
includeJs(parkingSVGUri + "parking_ic_status_coming_home.svg.js");
includeJs(parkingSVGUri + "parking_ic_status_going_out.svg.js");

$('head').append('<link rel="stylesheet" type="text/css" href="service/parking/css/parking-style.css" />');
