/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Object defines common data storage
 * @module common/object
 */

/** @classdesc userInfoObject defines data storage of user information
* @constructor
*/
var userInfoObject = {
  /** Whether this object is loaded
  * @type {boolean}
  * @instance
  */
  loaded: false,
  /** The title of user information
  * @type {string}
  * @instance
  */
  userInfoTitle: "",
};

/** @classdesc serverInfoObject defines data storage of server information
* @constructor
*/
var serverInfoObject = {
  /** serverInfoObject version
  * @type {boolean}
  * @instance
  */
  version: "0",
  /** Whether this object is loaded
  * @type {boolean}
  * @instance
  */
  loaded: false,
  /** server list
  * @type {object}
  * @instance
  */
  service: [],
  /** ems list
  * @type {object}
  * @instance
  */
  ems:[]
};

var billObject = {
  name: "Bill",
  num: 0,
  card_status: "unloaded",  // "unloaded" / "loading" / "loaded"
  pageloaded: false,
  month_index: 0,
  bill: [{
      month: "",
      total: "",
      prev_month_gap: "",
      individual_mgmt: "",
      general_mgmt: "",
      electricity: "",
      water: "",
      heating: "",
      etc: "",
      avg: "",
      last_year: ""
    },
    {
      month: "",
      total: "",
      prev_month_gap: "",
      individual_mgmt: "",
      general_mgmt: "",
      electricity: "",
      water: "",
      heating: "",
      etc: "",
      avg: "",
      last_year: ""
    },
    {
      month: "",
      total: "",
      prev_month_gap: "",
      individual_mgmt: "",
      general_mgmt: "",
      electricity: "",
      water: "",
      heating: "",
      etc: "",
      avg: "",
      last_year: ""
    },
    {
      month: "",
      total: "",
      prev_month_gap: "",
      individual_mgmt: "",
      general_mgmt: "",
      electricity: "",
      water: "",
      heating: "",
      etc: "",
      avg: "",
      last_year: ""
    },
    {
      month: "",
      total: "",
      prev_month_gap: "",
      individual_mgmt: "",
      general_mgmt: "",
      electricity: "",
      water: "",
      heating: "",
      etc: "",
      avg: "",
      last_year: ""
    },
    {
      month: "",
      total: "",
      prev_month_gap: "",
      individual_mgmt: "",
      general_mgmt: "",
      electricity: "",
      water: "",
      heating: "",
      etc: "",
      avg: "",
      last_year: ""
    },
    {
      month: "",
      total: "",
      prev_month_gap: "",
      individual_mgmt: "",
      general_mgmt: "",
      electricity: "",
      water: "",
      heating: "",
      etc: "",
      avg: "",
      last_year: ""
    },
    {
      month: "",
      total: "",
      prev_month_gap: "",
      individual_mgmt: "",
      general_mgmt: "",
      electricity: "",
      water: "",
      heating: "",
      etc: "",
      avg: "",
      last_year: ""
    },
    {
      month: "",
      total: "",
      prev_month_gap: "",
      individual_mgmt: "",
      general_mgmt: "",
      electricity: "",
      water: "",
      heating: "",
      etc: "",
      avg: "",
      last_year: ""
    },
    {
      month: "",
      total: "",
      prev_month_gap: "",
      individual_mgmt: "",
      general_mgmt: "",
      electricity: "",
      water: "",
      heating: "",
      etc: "",
      avg: "",
      last_year: ""
    },
  ],
};

var contactsObject = {
  name: "Contacts",
  num: 0,
  card_status: "unloaded",  // "unloaded" / "loading" / "loaded"
  pageloaded: false,
  contact: [{
      name: "",
      phone: "",
      img_url: ""
    },
    {
      name: "",
      phone: "",
      img_url: ""
    },
    {
      name: "",
      phone: "",
      img_url: ""
    },
    {
      name: "",
      phone: "",
      img_url: ""
    },
    {
      name: "",
      phone: "",
      img_url: ""
    },
    {
      name: "",
      phone: "",
      img_url: ""
    },
    {
      name: "",
      phone: "",
      img_url: ""
    },
    {
      name: "",
      phone: "",
      img_url: ""
    },
    {
      name: "",
      phone: "",
      img_url: ""
    },
    {
      name: "",
      phone: "",
      img_url: ""
    },
    {
      name: "",
      phone: "",
      img_url: ""
    },
  ]
};



var inquiryObject = {
  name: "Inquiry",
  num: 0,
  response: "",
  card_status: "unloaded",  // "unloaded" / "loading" / "loaded"
  pageloaded: false
};


var voteObject = {
  name: "Vote",
  num: 0,
  card_status: "unloaded",  // "unloaded" / "loading" / "loaded"
  pageloaded: false,
  list: [{
      vote_id: "",
      title: "",
      due: "",
      turnout: "",
      message: "",
      case: [{
        case_id: "",
        text: ""
      }, {
        case_id: "",
        text: ""
      }],
      participate: ""
    },
    {
      vote_id: "",
      title: "",
      due: "",
      turnout: "",
      message: "",
      case: [{
        case_id: "",
        text: ""
      }, {
        case_id: "",
        text: ""
      }],
      participate: ""
    },
    {
      vote_id: "",
      title: "",
      due: "",
      turnout: "",
      message: "",
      case: [{
        case_id: "",
        text: ""
      }, {
        case_id: "",
        text: ""
      }],
      participate: ""
    },
    {
      vote_id: "",
      title: "",
      due: "",
      turnout: "",
      message: "",
      case: [{
        case_id: "",
        text: ""
      }, {
        case_id: "",
        text: ""
      }],
      participate: ""
    },
    {
      vote_id: "",
      title: "",
      due: "",
      turnout: "",
      message: "",
      case: [{
        case_id: "",
        text: ""
      }, {
        case_id: "",
        text: ""
      }],
      participate: ""
    },
    {
      vote_id: "",
      title: "",
      due: "",
      turnout: "",
      message: "",
      case: [{
        case_id: "",
        text: ""
      }, {
        case_id: "",
        text: ""
      }],
      participate: ""
    },
    {
      vote_id: "",
      title: "",
      due: "",
      turnout: "",
      message: "",
      case: [{
        case_id: "",
        text: ""
      }, {
        case_id: "",
        text: ""
      }],
      participate: ""
    },
    {
      vote_id: "",
      title: "",
      due: "",
      turnout: "",
      message: "",
      case: [{
        case_id: "",
        text: ""
      }, {
        case_id: "",
        text: ""
      }],
      participate: ""
    },
    {
      vote_id: "",
      title: "",
      due: "",
      turnout: "",
      message: "",
      case: [{
        case_id: "",
        text: ""
      }, {
        case_id: "",
        text: ""
      }],
      participate: ""
    },
    {
      vote_id: "",
      title: "",
      due: "",
      turnout: "",
      message: "",
      case: [{
        case_id: "",
        text: ""
      }, {
        case_id: "",
        text: ""
      }],
      participate: ""
    },
  ]
};

/** @classdesc informationObject defines data storage of information
* @constructor
*/
var informationObject = {
  /** object name
  * @type {string}
  * @instance
  */
  name: "Information",
  /** Whether this card is loaded<br>
  * status : "unloaded" / "loading" / "loaded"
  * @type {string}
  * @instance
  */
  card_status: "unloaded",
  /** Whether this page is loaded
  * @type {boolean}
  * @instance
  */
  pageloaded: false,
}

/** @classdesc alarmObject defines data storage of alarm on setting menu
* @constructor
*/
var alarmObject = {
  /** object name
  * @type {string}
  * @instance
  */
  name: "Alarm",
  /** Whether this page is loaded
  * @type {boolean}
  * @instance
  */
  pageloaded: false,
  /** alarm list
  * @type {object}
  * @instance
  */
  list: [
    {
      id: SERVICE_ALARMID_NOTIFCATION,
      service_id: SERVICEID_NOTIFCATION,
      name: $.lang[lang].ALARM_NOTIFICATION,
      status: "on",
      enabled: false
    },
    {
      id: SERVICE_ALARMID_PARCEL,
      service_id: SERVICEID_PARCEL,
      name: $.lang[lang].ALARM_PARCEL,
      status: "off",
      enabled: false
    },
    {
      id: SERVICE_ALARMID_PARKING_LOCATION,
      service_id: SERVICEID_PARKING_LOCATION,
      name: $.lang[lang].ALARM_PARKING_LOCATION,
      status: "off",
      enabled: false
    },
    {
      id: SERVICE_ALARMID_PARKING_HISTORY,
      service_id: SERVICEID_PARKING_HISTORY,
      name: $.lang[lang].ALARM_PARKING_VEHICLE_ENTRY,
      status: "on",
      enabled: false
    },
    {
      id: SERVICE_ALARMID_ADMIN,
      service_id: SERVICEID_ADMIN,
      name: $.lang[lang].ALARM_ADMIN,
      status: "off",
      enabled: false
    },
    {
      id: SERVICE_ALARMID_VISITOR,
      service_id: SERVICEID_VISITOR,
      name: $.lang[lang].ALARM_VISITOR,
      status: "off",
      enabled: false
    },
  ]
}

var prevY = 50;

var touchX, touchY;

var ParkingLocationEnabled = false;

var ParkingHistoryEnabled = false;
