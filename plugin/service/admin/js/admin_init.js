/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Admin service shows the previous and current management expenses.
 * @module service/admin/init
 * @author Home IoT R&D Team
 */

var adminSelf;
var DEFAULT_ADMIN_MONTH_INDEX = 0;
const ADMIN_MAX_MONTH_MONTHLY = 6;
const ADMIN_FLOATING_POINT_NUMBER = 0;
const ADMIN_MAX_GRAPH_WIDTH = 600;
const ADMIN_MAX_FULL_DATA = 18;
/**
 * Create a AdminService.
 * @constructor
 */
function AdminService() {
	adminSelf = this;
}

var adminImageUri = "service/admin/res/img/";
var adminSvgUri = "service/admin/res/svg/";
if(lang==="ko"){
	var admin_currency_sign = "원";
	var admin_exchange_rate = false;
} else {
	var admin_currency_sign= "$";
	var admin_exchange_rate = true;
}

AdminService.prototype = {
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
		list: [],
	},
	/** The data of alarm setting.
	 * @type {object}
	 * @instance
	 */
	bAlarmAvailable: {
		enabled: [false],
		default: [false],
	},
	/** The index of month.
	 * @type {object}
	 * @instance
	 */
	monthIndex: {
		total: { lm: DEFAULT_ADMIN_MONTH_INDEX, ly: DEFAULT_ADMIN_MONTH_INDEX },
	},
	/** The function called on click event.
	 * @type {string}
	 * @instance
	 */
	getPageClickFunctionName: "adminCardOnClick",
	/** The icon name on dark theme.
	 * @type {string}
	 * @instance
	 */
	getIconName: adminImageUri + "home_ic_status_admin.png",
	/** The icon name on white theme.
	 * @type {string}
	 * @instance
	 */
	getLightIconName: adminImageUri + "home_ic_status_admin_light.png",
	/** The icon of SVG.
	 * @type {string}
	 * @instance
	 */
	getIconSVG: document.loadedSVG.home_ic_status_admin,
	/** Get title of page.
	 * @returns {string}
	*/
	getPageTitleText: function () {
		return $.lang[lang].ADMIN_TAB;
	},
	/** Get title of favorite card.
	 * @returns {string}
	*/
	getFavoriteCardText: function () {
		return $.lang[lang].ADMIN_TAB;
	},
	/** Execute view of page. */
	onViewPage: function () {
		loadedAdminPage(this);
	},
	/** Initiate main banner. */
	initMainBanner: function () {
		this.enabledMainBanner = true;
		return false;
	},
	/**
	* Initiate favorite card.
	* @param {number} index - The index of favorite card for this service.
	*/
	initCard: function (index) {
		initAdminCard(index, this.cardInfo.list[0]);
	},
	/** Initiate page. */
	initPage: function () {
		initAdminPage();
	},
	/** Request data of favorite card. */
	requestCardData: function () {
		setTimeout(requestAdminCard(), 0);
	},
	/** Request data of page. */
	requestPageData: function () {
	},
	/** Draw favorite card. */
	drawCard: function () {
		drawAdminCard(adminSelf.monthIndex.total.lm);
	},
	/** Draw page. */
	drawPage: function () {
		drawAdminPage();
	},
	/** Get service object. */
	getObject: function () {
		return adminObject;
	},
	/** Create option menu. */
	createOptionMenu: function () {
	},
	/** The data of help information.
	* @type {object}
	* @instance
	*/
	helpInformation: {
		bEnable: false
	}
}

includeJs(adminSvgUri+"home_ic_usage_down.svg.js");
includeJs(adminSvgUri+"home_ic_usage_minus.svg.js");
includeJs(adminSvgUri+"home_ic_usage_plus.svg.js");
includeJs(adminSvgUri+"home_ic_usage_up.svg.js");


var adminService = new AdminService();
setServerInit(adminService,SERVICEID_ADMIN);

//includeJs("service/admin/res/svg/help_ic_status_admin.svg.js");
includeJs("service/admin/js/admin_object.js");
includeJs("service/admin/js/admin_server_api.js");
includeJs("service/admin/js/admin_main.js");
$('head').append('<link rel="stylesheet" type="text/css" href="service/admin/css/admin-style.css" />');
