/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview CCTV service shows various CCTV screens in apartments.
 * @module service/cctv
 * @author Home IoT R&D Team
 */

/**
 * Create a CCTVService.
 * @constructor
 */
function CCTVService() { }

var cctvImageUri = "service/cctv/res/img/";

CCTVService.prototype = {
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
    getPageClickFunctionName: "cctvCardOnClick",
    /** The icon name on dark theme.
     * @type {string}
     * @instance
     */
    getIconName: cctvImageUri + "home_ic_status_cctv.png",
    /** The icon name on white theme.
     * @type {string}
     * @instance
     */
    getLightIconName: cctvImageUri + "home_ic_status_cctv_light.png",
    /** The icon of SVG.
    * @type {string}
    * @instance
    */
    getIconSVG: document.loadedSVG.home_ic_status_cctv,
    /** Get title of page.
    * @return {string}
    */
    getPageTitleText: function () {
        return $.lang[lang].CCTV_SERVICE;
    },
    /** Get title of favorite card.
    * @return {string}
    */
    getFavoriteCardText: function () {
        return $.lang[lang].CCTV_SERVICE;
    },
    /** Execute view of page. */
    onViewPage: function () {
        loadCCTVPage(this);
    },
    /**
     * Initiate favorite card.
     * @param {number} index - The index of favorite card for this service.
     */
    initCard: function (index) { // main 에 보이는 favorite 카드에 대한 초기화
        initCCTVCard(index, this.cardInfo.list[0]);
    },
    /** Request data of favorite card. */
    requestCardData: function () {
        requestCCTVInfo();
    },
    /** Draw favorite card. */
    drawCard: function () { // main 에 보이는 favorite 카드에 대한 draw
        drawCCTVCard();
    },
    /** Get service object. */
    getObject: function () {
        return cctvObject;
    },     
    /** The data of help information.
    * @type {object}
    * @instance
    */
    helpInformation: {
        bEnable: false
    }
}

var cctvService = new CCTVService();
setServerInit(cctvService,SERVICEID_CCTV);

includeJs("service/cctv/js/cctv_object.js");
includeJs("service/cctv/js/cctv_server_api.js");

includeJs("service/cctv/js/cctv_main.js");

$('head').append('<link rel="stylesheet" type="text/css" href="service/cctv/css/cctv-style.css" />');
