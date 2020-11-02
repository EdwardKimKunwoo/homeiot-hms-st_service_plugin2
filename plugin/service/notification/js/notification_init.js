/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Community Notification & Announcement Board Service
 * @module service/notification/init
 * @author Home IoT R&D Team
 */

 /**
  * Create a NotificationService.
  * @constructor
  */
function NotificationService() { }

var notiImageUri ="service/notification/res/img/";

NotificationService.prototype = {
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
	/** The function called on click event.
	 * @type {string}
	 * @instance
	 */
	getPageClickFunctionName: "notificationCardOnClick",
	/** The icon name on dark theme.
	 * @type {string}
	 * @instance
	 */
	getIconName: notiImageUri+"home_ic_status_noti_dark.png",
	/** The icon name on white theme.
	 * @type {string}
	 * @instance
	 */
	getLightIconName: notiImageUri+"home_ic_status_noti_light.png",
	/** The icon of SVG.
	 * @type {string}
	 * @instance
	 */
	getIconSVG: document.loadedSVG.home_ic_status_noti,
	/** Get title of page.
	 * @return {string}
	*/
	getPageTitleText: function () {
		return $.lang[lang].NOTIFICATION_TAB;
	},

	/** Get title of favorite card.
	 * @return {string}
	*/
	getFavoriteCardText: function () {
		return $.lang[lang].NOTIFICATION_TAB;
	},

	/** Execute view of page. */
	onViewPage: function () {
		loadedNotificationPage(this);
	},
	/** Initiate main banner. */
	initMainBanner: function () {
		initNotificationMainBanner();
		this.enabledMainBanner = true;
	},
	/**
		* Initiate favorite card.
		* @param {number} index - The index of favorite card for this service.
		*/
	initCard: function (index) {
		initNotificationCard(index, this.cardInfo.list[0]);
	},
  /** Initiate page. */
	initPage: function () {	// 현재 호출되지 않음
		initNotificationPage();
	},
	/** Request data of favorite card. */
	requestCardData: function () {
		updateNotiTitle(1);
	},
	/** Request data of page. */
	requestPageData: function () {	// 현재 호출되지 않음 (Noti는 불필요)
		/* none */
	},
	/** Draw favorite card. */
	drawCard: function () {	// 즐겨찾기 편집 후에 불림
		drawNotificationCard();
	},
	/** Draw page. */
	drawPage: function () {	// 현재 호출되지 않음
		drawNotificationPage();
	},
	/** Get service object. */
	getObject: function () {
		return notiObject;
	},
	/** Create option menu. */
	createOptionMenu: function(){
		//createNotificationOptionMenu(this);
	},
	/** The data of help information.
	* @type {object}
	* @instance
	*/
	helpInformation: {
		bEnable: false,
		title: $.lang[lang].NOTIFICATION_TAB,
		iconUri: "img/help_screen/help_ic_status_noti.png",
		svgText : document.loadedSVG.help_noti,
		list:[
			{
				service_id: SERVICEID_NOTIFCATION,
				imageUri: "img/help_screen/help_info_img_notification.png",
				imageSize: { width:"100%", height:"auto" },
				bSubTitle : false,
        subTitle: "공지사항 확인",
				contentsList: [
					$.lang[lang].HELP_NOTICE_DESC,
				]
			}
		]
	}
}

function notificationServiceInfo() {
	console.log(PACKAGE, "explain notification service ");
	// TODO : Need to implement
}

var notificationService = new NotificationService();
setServerInit(notificationService,SERVICEID_NOTIFCATION);

//includeJs("service/notification/res/svg/help_ic_status_noti.svg.js");

includeJs("service/notification/js/notification_object.js");
includeJs("service/notification/js/notification_server_api.js");
//includeJs("service/notification/js/notification_fakedata.js");

includeJs("service/notification/js/notification_main.js");

$('head').append('<link rel="stylesheet" type="text/css" href="service/notification/css/notification-style.css" />');
