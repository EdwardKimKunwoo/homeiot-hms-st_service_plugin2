/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Manage const variables
 * @module common/constant
 */

const TRUE = 1;
const FALSE = 0;

/** @const {number} SEND_REQUEST_TIMEOUT Waiting time to process timeout after sending send request */
const SEND_REQUEST_TIMEOUT = 10000;
/** @const {number} FIRST_LOADING_TIMEOUT Waiting time to process timeouts at the time of the first loading */
const FIRST_LOADING_TIMEOUT = 10000;

/** @const {string} PRIVACY_POLICY_URL url for privacy and policy */
const PRIVACY_POLICY_URL = "https://eula.samsungiotcloud.com/legal/kr/ko/pps_sec_smart_apt.html";
/** @const {string} TERMS_N_CONDITIONS_URL url for terms and condition */
const TERMS_N_CONDITIONS_URL = "https://static.bada.com/contents/legal/kor/kor/stapartservice.html";
/** @const {String} PRIVACY_POLICY_AGREEMENT_URL url for privacy and policy agreement */
const PRIVACY_POLICY_AGREEMENT_URL = "https://eula.samsungiotcloud.com/legal/kr/ko/ppa_sec_smart_apt.html";
/** @const {String} THIRD_PARTY_PRIVACY_POLICY_AGREEMENT_URL url for personal information third party provision agreement */
const THIRD_PARTY_PRIVACY_POLICY_AGREEMENT_URL = "https://eula.samsungiotcloud.com/legal/kr/ko/ppa_sec_smart_apt.html";

// RESPONSE Status
/** @const {number} RESPONSE_OK The status value for OK state */
const RESPONSE_OK = 200;
/** @const {number} RESPONSE_NO_DATA The status value for no data state */
const RESPONSE_NO_DATA = 204;
/** @const {number} RESPONSE_BAD_REQUEST The status value for bad request state */
const RESPONSE_BAD_REQUEST = 400;
/** @const {number} RESPONSE_UNATHORIZED The status value for unauthorized state */
const RESPONSE_UNATHORIZED = 401;
/** @const {number} RESPONSE_TIME_OUT The status value for time out state */
const RESPONSE_TIME_OUT = 408;
/** @const {number} RESPONSE_SERVER_ERROR The status value for server error state */
const RESPONSE_SERVER_ERROR = 500;

// APT name
/** @const {string} SMARTTHINGS apt_name value for default */
const SMARTTHINGS = "Smartthings";
/** @const {string} RAEMIAN apt_name value for raemian */
const RAEMIAN = "raemian";
/** @const {string} POSCO apt_name value for posco */
const POSCO = "Posco";
/** @const {string} HILLSTATE apt_name value for hillstate */
const HILLSTATE = "Hillstate";
/** @const {string} LOTTE apt_name value for lotte */
const LOTTE = "Lotte";
/** @const {string} CAMUS apt_name value for camus */
const CAMUS = "Camus";
/** @const {string} RBDK apt_name value for rbdk */
const RBDK = "RBDK";
/** @const {string} PRUGIO apt_name value for prugio */
const PRUGIO = "Prugio";
/** @const {string} BLUE apt_name value for blue */
const BLUE = "Blue";
/** @const {string} LYNN apt_name value for lynn */
const LYNN = "Lynn";
/** @const {string} LANDME apt_name value for landme */
const LANDME = "LANDme";
/** @const {string} IAAN apt_name value for iaan */
const IAAN = "Iaan";
/** @const {string} LUXNINE apt_name value for luxnine */
const LUXNINE = "LuxNine";
/** @const {string} PARAVIEW apt_name value for paraview */
const PARAVIEW = "Paraview";
const RAEMIAN_LEADERSONE = "raemian_leadersone";

// const MAX_ENERGY_GRAPH_WIDTH = 600; // MAX_MONTH_MONTHLY * 44px
const MAX_ENERGY_GRAPH_WIDTH = 528; // MAX_MONTH_MONTHLY * 44px

/** @const {string} SERVICEID_NOTIFCATION service id for notice */
const SERVICEID_NOTIFCATION = "notice";
/** @const {string} SERVICEID_PARCEL service id for parcel */
const SERVICEID_PARCEL = "parcel";
/** @const {string} SERVICEID_PARKING_LOCATION service id for parking */
const SERVICEID_PARKING_LOCATION = "parking";
/** @const {string} SERVICEID_PARKING_HISTORY service id for entry */
const SERVICEID_PARKING_HISTORY = "entry";
/** @const {string} SERVICEID_ADMIN service id for admin */
const SERVICEID_ADMIN = "admin";
/** @const {string} SERVICEID_CCTV service id for cctv */
const SERVICEID_CCTV = "cctv";
/** @const {string} SERVICEID_VISITOR service id for visitor */
const SERVICEID_VISITOR = "visitor";
/** @const {string} SERVICEID_ENERGY service id for EMS */
const SERVICEID_ENERGY = "EMS";
/** @const {string} SERVICEID_OPTION service id for option */
const SERVICEID_OPTION = "option"

/** @const {string} SERVICE_ALARMID_NOTIFCATION alarm id for notice */
const SERVICE_ALARMID_NOTIFCATION = "notice";
/** @const {string} SERVICE_ALARMID_PARCEL alarm id for parcel */
const SERVICE_ALARMID_PARCEL = "parcel";
/** @const {string} SERVICE_ALARMID_PARKING_LOCATION alarm id for parking */
const SERVICE_ALARMID_PARKING_LOCATION = "parking";
/** @const {string} SERVICE_ALARMID_PARKING_HISTORY alarm id for entry */
const SERVICE_ALARMID_PARKING_HISTORY = "entry";
/** @const {string} SERVICE_ALARMID_ADMIN alarm id for admin */
const SERVICE_ALARMID_ADMIN = "admin";
/** @const {string} SERVICE_ALARMID_CCTV alarm id for cctv */
const SERVICE_ALARMID_CCTV = "cctv";
/** @const {string} SERVICE_ALARMID_VISITOR alarm id for visitor */
const SERVICE_ALARMID_VISITOR = "visitor";
/** @const {string} SERVICE_ALARMID_ENERGY alarm id for ems */
const SERVICE_ALARMID_ENERGY = "ems";

/** @const {number} RESIZE_DELAY intentional delay for resize event */
const RESIZE_DELAY = 100;
