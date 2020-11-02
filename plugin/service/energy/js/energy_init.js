/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Energy service shows the amount of energy used before and now.
 * @module service/energy/init
 * @author Home IoT R&D Team
 */

/** all months to save
 * @constant {number} */
const EMS_MAX_FULL_DATA = 18;
/** Maximum number of months on summary tab
 * @constant {number} */
const EMS_MAX_MONTH_Summary = 12;
/** Maximum number of months on monthly tab
 * @constant {number} */
const EMS_MAX_MONTH_MONTHLY = 12;
/** Maximum number of months on compare tab
 * @constant {number} */
const EMS_MAX_MONTH_COMPARE = 6;
/** number of float point
 * @constant {number} */
const FLOATING_POINT_NUMBER = 2;
/** The default value of month index
 * @constant {number} */
const DEFAULT_ENERGY_MONTH_INDEX = 0;
/** The default value of energy index
 * @constant {number} */
const DEFAULT_ENERGY_INDEX = 0;
const DEFAULT_SCROLL_LEFT_VALUE = 400;

var energyImageUri ="service/energy/res/img/";
var chartDuration = 1080;
var energySelf;

EnergyService.prototype = {
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
		enabled: [ true ],
		default: [ true ],
	},
	/** The index of current month.
	 * @type {object}
	 * @instance
	 */
//	currentMonthIndex: DEFAULT_ENERGY_MONTH_INDEX,
//	currentEnergyIndex: DEFAULT_ENERGY_INDEX,
	monthIndex: {
		total: { lm : DEFAULT_ENERGY_MONTH_INDEX, ly: DEFAULT_ENERGY_MONTH_INDEX},
		elec: { lm : DEFAULT_ENERGY_MONTH_INDEX, ly: DEFAULT_ENERGY_MONTH_INDEX, lyscroll: DEFAULT_SCROLL_LEFT_VALUE},
		gas: { lm : DEFAULT_ENERGY_MONTH_INDEX, ly: DEFAULT_ENERGY_MONTH_INDEX, lyscroll: DEFAULT_SCROLL_LEFT_VALUE},
		water: { lm : DEFAULT_ENERGY_MONTH_INDEX, ly: DEFAULT_ENERGY_MONTH_INDEX, lyscroll: DEFAULT_SCROLL_LEFT_VALUE},
		hot_water: { lm : DEFAULT_ENERGY_MONTH_INDEX, ly: DEFAULT_ENERGY_MONTH_INDEX, lyscroll: DEFAULT_SCROLL_LEFT_VALUE},
		heating: { lm : DEFAULT_ENERGY_MONTH_INDEX, ly: DEFAULT_ENERGY_MONTH_INDEX, lyscroll: DEFAULT_SCROLL_LEFT_VALUE}
	},
	/** The index of current energy.
	 * @type {object}
	 * @instance
	 */
	energyIndex: {
		total:{lm:-1, ly:-1}
	},
	/** The function called on click event.
	 * @type {string}
	 * @instance
	 */
	getPageClickFunctionName: "energyCardOnClick",
	/** The icon name on dark theme.
	 * @type {string}
	 * @instance
	 */
	getIconName: energyImageUri+"home_ic_status_ems_dark.png",
	/** The icon name on white theme.
	 * @type {string}
	 * @instance
	 */
	getLightIconName:energyImageUri+"home_ic_status_ems_light.png",
	/** The icon of SVG.
	 * @type {string}
	 * @instance
	 */
	getIconSVG: document.loadedSVG.home_ic_status_ems,
	/** Set month index.
	 * @param {number} monthIndex - The month index.
	 * @param {boolean} bCallEnergyCard - Variables that show whether the card is called.
	*/
	setSyncMonthIndex: function(monthIndex,bCallEnergyCard){
		energySelf.monthIndex.total.lm = monthIndex;
		if(bCallEnergyCard === false) return;
		else drawEnergyCard(monthIndex,energySelf.energyIndex.total.lm);
	},
	/** Set energy index.
	 * @param {number} energyIndex - The energy index.
	 * @param {boolean} bCallEnergyCard - Variables that show whether the card is called.
	*/
	setSyncEnergyIndex: function(energyIndex, bCallEnergyCard){
		energySelf.energyIndex.total.lm = energyIndex;
		if(bCallEnergyCard === false) return;
		else drawEnergyCard(energySelf.monthIndex.total.lm,energyIndex);
	},
	/** Get title of page.
	* @return {string}
	*/
	getPageTitleText: function () {
		return $.lang[lang].ENERGY_TAB;
	},
	/** Get title of favorite card.
	* @return {string}
	*/
	getFavoriteCardText: function () {
		return $.lang[lang].ENERGY_TAB;
	},
	/** Execute view of page. */
	onViewPage: function () {
		loadedEnergyPage(this);
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
		if(isSmartTV())
			initEnergyCardForTV(index,this.cardInfo.list[0]);
		else
			initEnergyCard(index,this.cardInfo.list[0]);
	},
	/** Initiate page. */
	initPage: function () {
		initEnergyPage();
	},
	/** Request data of favorite card. */
	requestCardData: function () {
		setTimeout(requestEnergyCard(), 0);
	},
	/** Request data of page. */
	requestPageData: function () {
	},
	/** Draw favorite card. */
	drawCard: function (monthIndex, energyIndex, bShowChart, enableShowCardAnimation) {

		if(monthIndex === undefined) {
			chartDuration = 1080;
			monthIndex = energySelf.monthIndex.total.lm;
			energyIndex = energySelf.energyIndex.total.lm;
			bShowChart = undefined;
			enableShowCardAnimation = true;
		}
		/*inview isCalledInvewOnLastYearChart = false; */
		if(isSmartTV())
			drawEnergyCardForTV(monthIndex, energyIndex, bShowChart, enableShowCardAnimation);
		else
			drawEnergyCard(monthIndex, energyIndex, bShowChart, enableShowCardAnimation);
	},
	/** Draw page. */
	drawPage: function () {
		drawEnergyPage('total', energySelf.monthIndex.total.lm);
	},
	/** Get service object. */
	getObject: function () {
		return emsObject;
	},
	/** Create option menu. */
	createOptionMenu: function () {
		//createEnergyOptionMenu(this);
	},
   /** The data of help information.
   * @type {object}
   * @instance
   */
	helpInformation: {
		bEnable: true,
		title: $.lang[lang].ENERGY_TAB,
		iconUri: "img/help_screen/help_ic_status_energy.png",
		svgText : document.loadedSVG.help_energy,
		list:[
			{
				service_id: SERVICEID_ENERGY,
				imageUri: (lang === "ko") ? "service/energy/res/img/help_info_img_energy.png" : "service/energy/res/img/help_info_img_energy_eng.png",
				imageSize: { width:"100%", height:"auto" },
				bSubTitle : false,
				subTitle: "비교 확인",
				contentsList: $.lang[lang].HELP_ENERGY_DESC
			}
			/*,
			{
				imageUri: "img/help_screen/help_info_img_energy.png",
				imageSize: { width:"100%", height:"auto" },
				iconUri: "img/help_screen/help_ic_status_admin.png",
				subTitle: "사용량 확인",
				contentsList: [
					"세대의 에너지(전기, 가스, 수도, 온수, 열량) 사용량을 확인할 수 있습니다. 이번 달 1일을 시작으로 현재(최근 자동 검침 기준)까지의 사용량을 볼 수 있습니다.<br>"
				]
			},*/
		]
	}
}

function EnergyService() {
	energySelf = this;
}

var energyService = new EnergyService();
setServerInit(energyService,SERVICEID_ENERGY);

// includeJs("service/energy/res/svg/help_ic_status_energy.svg.js");

includeJs("service/energy/js/energy_object.js");
includeJs("service/energy/js/energy_server_api.js");

includeJs("service/energy/js/energy_main.js");

$('head').append('<link rel="stylesheet" type="text/css" href="service/energy/css/energy-style.css" />');
$('head').append('<link rel="stylesheet" type="text/css" href="service/energy/css/energy-style-tv.css" />');
