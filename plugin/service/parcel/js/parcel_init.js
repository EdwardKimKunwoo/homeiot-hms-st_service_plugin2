/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Parcel service shows the information about the unreceived and received express.
 * @module service/parcel/init
 * @author Home IoT R&D Team
 */

/** The number of item in a favorite card
 * @constant {number} */
const PARCEL_MAX_ITEM_NUM_IN_FAVORITE_PAGE = 30;

var parcelImageUri = "service/parcel/res/img/";

/** The number of item in a page
 * @integer {number} */
var parcelItemNumPerSwipe = 3;

/**
 * Create a ParcelService.
 * @constructor
 */
function ParcelService() { }

ParcelService.prototype = {
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
        enabled: [true],
        default: [false],
    },
    /** The function called on click event.
     * @type {string}
     * @instance
     */
    getPageClickFunctionName: "parcelCardOnClick",
    /** The icon name on dark theme.
     * @type {string}
     * @instance
     */
    getIconName: parcelImageUri + "home_ic_status_delivery_dark.png",
    /** The icon name on white theme.
     * @type {string}
     * @instance
     */
    getLightIconName: parcelImageUri + "home_ic_status_delivery_light.png",
    /** The icon of SVG.
     * @type {string}
     * @instance
     */
    getIconSVG: document.loadedSVG.home_ic_status_delivery,

    /** Get title of page. 
     * @return {string}
    */
    getPageTitleText: function () {
        return $.lang[lang].PARCEL_SERVICE;
    },
    /** Get title of favorite card. 
     * @return {string}
    */
    getFavoriteCardText: function () {
        return $.lang[lang].PARCEL_FC_TEXT;
    },
    /** Execute view of page. */
    onViewPage: function () {
        loadedParcelPage(this);
    },
    /** Initiate main banner. */
    initMainBanner: function () { // 반포레이안의 경우 표시 안함 index.js 에서 disable
        initParcelMainBanner();
        this.enabledMainBanner = true; // Banner 표시, 각 서비스별 지원 여부
    },
    /** 
      * Initiate favorite card. 
      * @param {number} index - The index of favorite card for this service.
      */
    initCard: function (index) { // main 에 보이는 favorite 카드에 대한 초기화

      if(isSmartTV()){
        initParcelCardForTV(index,this.cardInfo.list[0]);
        return;
      }

      initParcelCard(index, this.cardInfo.list[0]);
    },
    /** Initiate page. */
    initPage: function () { // detail 페이지  초기화
        initParcelPage();
    },
    /** Request data of favorite card. */
    requestCardData: function () {
        setTimeout(updateParcelWaitingInfo(1), 0);
    },
    /** Request data of page. */
    requestPageData: function () {
        /* none */
    },
    /** Draw favorite card. */
    drawCard: function () { // main 에 보이는 favorite 카드에 대한 draw
      if(isSmartTV()){
        drawParcelCardForTV();
        return;
      }
      drawCardParcelInfo();
    },
    /** Draw page. */
    drawPage: function () { // detail 페이지  draw
        drawParcelPage();
    },
    /** Get service object. */
    getObject: function () {
        return parcelObject;
    },
    /** Create option menu. */
    createOptionMenu: function () {
        //createParcelOptionMenu(this);
    },
    /** The data of help information.
    * @type {object}
    * @instance
    */
    helpInformation: {
        bEnable: true,
        title: $.lang[lang].PARCEL_SERVICE,
        iconUri: parcelImageUri + "help_ic_status_delivery.png",
        svgText: document.loadedSVG.help_delivery,
        list: [
            {
                service_id: SERVICEID_PARCEL,
                imageUri: (lang === "ko") ? "service/parcel/res/img/help_info_img_delivery2.png" : "service/parcel/res/img/help_info_img_delivery2_eng.png",
                imageSize: { width: "100%", height: "auto" },
                bSubTitle: false,
                subTitle: "택배 종류 확인",
                contentsList: $.lang[lang].HELP_DELIVERY_DESC,
            }
        ]
    }
}

function parcelServiceInfo() {
    // console.log("parcelServiceInfo" + "() called...");
    console.log(PACKAGE, "explain parcel service ");
    // TODO : Need to implement
}

var parcelService = new ParcelService();
setServerInit(parcelService,SERVICEID_PARCEL);

// includeJs("service/parcel/res/svg/help_ic_status_delivery.svg.js");

includeJs("service/parcel/js/parcel_object.js");
includeJs("service/parcel/js/parcel_server_api.js");
//includeJs("service/parcel/js/parcel_fakedata.js");

includeJs("service/parcel/js/parcel_main.js");

$('head').append('<link rel="stylesheet" type="text/css" href="service/parcel/css/parcel-style.css" />');