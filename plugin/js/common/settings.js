/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview manages system version information, test mode, and theme.
 * @module common/settings
 */

/** plugin version 
 * @constant {string} */
const VERSION = "1.1.5";
/** release date
 * @constant {string} */
const RELEASE_DATE = "2020.10.27.";
const CODE = "01";
const PACKAGE = "HAS";
/** API type
 * @constant {string} */
const API_TYPE = "SAMSUNG";
/** operation mode
 * 
 * Usage of OPERATION_MODE and STAND_ALONE
 * 
 * |                  Usage                     | OPERATION_MODE | STAND_ALONE |
 * |--------------------------------------------|----------------|-------------|
 * | PC Dummy Data Mode                         |        0       |      0      |
 * | PC Operation Mode                          |        1       |      0      |
 * | Mobile Dummy Data Mode in SmartThings App. |        0       |      0      |
 * | Mobile Operation Mode in SmartThings App.  |        1       |      0      |
 * | Mobile Dummy Data Mode in Stand Alone App. |        0       |      1      |
 * 
 * @example
 * // server operation
 * const OPERATION_MODE = 1
 * @constant {number} */
const OPERATION_MODE = 0;
/** stand alone
 *  
 * Usage of OPERATION_MODE and STAND_ALONE
 * 
 * |                 Usage                      | OPERATION_MODE | STAND_ALONE |
 * |--------------------------------------------|----------------|-------------|
 * | PC Dummy Data Mode                         |        0       |      0      |
 * | PC Operation Mode                          |        1       |      0      |
 * | Mobile Dummy Data Mode in SmartThings App. |        0       |      0      |
 * | Mobile Operation Mode in SmartThings App.  |        1       |      0      |
 * | Mobile Dummy Data Mode in Stand Alone App. |        0       |      1      |
 * 
 * @example
 * // stand alone is on
 * const STAND_ALONE = 1
 * @constant {number} */
const STAND_ALONE = 0;
var API_VERSION = "v0.2";
//const API_TYPE="CVNET";

/** the number of fake data,
 * if you add more numbers than max, only the max size will be seen.
 * |          data          | value |
 * |------------------------|-------|
 * | No data                |  0    |
 * | 1 item on list         |  1    |
 * | 2 items on list        |  2    |
 * | several items on list  |  3~   |
 * | max items on list      | max   |
 * 
 * @example
 * // max items on list
 * var numOfItemForFakeData = "max";
 * @var {string} numOfItemForFakeData
 */

const UPDATE_AGREEMENT_ENABLE = false;
var numOfItemForFakeData = "max"; /* 0, 1, 2, 3, max */
/** current language, use it when you need to know what the current language is
 * 
 * |    language     | value |
 * |-----------------|-------|
 * | Korean          | "ko"  |
 * | English         | "en"  |
 * 
 * @example
 * if(lang === "en")
 *   showToast("hello");
 * 
 * @var {string} */
var lang = getPreferredLocaleCode(window.navigator.language);

/** apartment name, if you'd like to set other brand, change name with apt type of constant.js
 * 
 * |   theme    |     value     |
 * |------------|---------------|
 * | default    | Smartthings   |
 * | RAEMIAN    | Reamian       |
 * | POSCO      | Posco         |
 * | HILLSTATE  | Hillstate     |
 * | LOTTE      | Lotte         |
 * | CAMUS      | Camus         |
 * | RBDK       | RBDK          |
 * | PRUGIO     | Prugio        |
 * | BLUE       | Blue          |
 * | LYNN       | Lynn          |
 * | LANDME     | LANDme        |
 * | IAAN       | Iaan          |
 * | LUXNINE    | LuxNine       |
 * | PARAVIEW   | Paraview      |
 * 
 * @example
 * // default case
 * var apt_name = SMARTTHINGS;
 */
var apt_name = RAEMIAN_LEADERSONE;

// Set language info
if (lang === 'ko_KR') {
  lang = "ko";
} else{
  lang = "en";
}

if (isPC()) {
  if (navigator.userAgent.match(/en-US/)) lang = "en";
  else if (navigator.userAgent.match(/ko-KR/)) lang = "ko";
  loadJavaScript("js/demodata/pc_test_env.js");
}

//if (!OPERATION_MODE) {
  if (lang === "ko") {
    loadJavaScript("js/demodata/fakedataJson_kor.js");

    let filepath = "";
      filepath = "js/demodata/fakedataJson_maxitems.js";
    loadJavaScript(filepath, function () {
      loadJavaScript("js/demodata/fakedata.js");
    });
  } else {
    loadJavaScript("js/demodata/fakedataJson_eng.js");

    let filepath = "";
    filepath = "js/demodata/fakedataJson_eng_maxitems.js";
    loadJavaScript(filepath, function () {
      loadJavaScript("js/demodata/fakedata.js");
    });
  }
//}
/*
if (isSmartTV()) {
  loadJavaScript("js/main/main_screen_tv.js");
}*/
