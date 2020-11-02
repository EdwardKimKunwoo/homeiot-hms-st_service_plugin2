/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Energy service shows the amount of energy used before and now.
 * @module service/energy/object
 * @author Home IoT R&D Team
 */

 /** @classdesc emsObject defines data storage of energy service
 * @constructor
*/
var emsObject ={
  /** service name.
  * @type {string}
  * @instance
  */
  name: "Energy",
  /** status of favorite card.
  * @type {string}
  * @instance
  */
  card_status: "unloaded",  // "unloaded" / "loading" / "loaded"
  /** Whether the data of page is loaded.
  * @type {boolean}
  * @instance
  */
  pageloaded: true,
  /** data about current month
  * @type {string}
  * @instance
  */
  curmonth: "",
  /** Flag to save whether server data(electric, water, ...) exists.
  * @type {boolean}
  * @instance
  */
  existdata: false,
  /** Total number of Enabled Energy service.
  * @type {number}
  * @instance
  */
  numOfEnergyService: 0,
  /** Whether the data of electric energy is enabled.
  * @type {boolean}
  * @instance
  */
  elec_enabled: false,
  /** Whether the data of electric energy is loaded.
  * @type {boolean}
  * @instance
  */
  elecloaded: false,
  /** Total number of months of electrical energy.
  * @type {number}
  * @instance
  */
  eleccount: 0,
  /** chart index of electrical energy.
  * @type {string}
  * @instance
  */
  elecindex: "-1",
  /** Data of electrical energy.
  * @type {object}
  * @instance
  */
  eleclist: [],
  /** Whether the data of water energy is enabled.
  * @type {boolean}
  * @instance
  */
  water_enabled: false,
  /** Whether the data of water energy is loaded.
  * @type {boolean}
  * @instance
  */
  waterloaded: false,
  /** Total number of months of water energy.
  * @type {number}
  * @instance
  */
  watercount: 0,
  /** chart index of water energy.
  * @type {string}
  * @instance
  */
  eaterindex: "-1",
  /** Data of water energy.
  * @type {object}
  * @instance
  */
  waterlist: [],
  /** Whether the data of gas energy is enabled.
  * @type {boolean}
  * @instance
  */
  gas_enabled: false,
  /** Whether the data of gas energy is loaded.
  * @type {boolean}
  * @instance
  */
  gasloaded: false,
  /** Total number of months of gas energy.
  * @type {number}
  * @instance
  */
  gascount: 0,
  /** chart index of gas energy.
  * @type {string}
  * @instance
  */
  gasindex: "-1",
  /** Data of gas energy.
  * @type {object}
  * @instance
  */
  gaslist: [],
  /** Whether the data of hotwater energy is enabled.
  * @type {boolean}
  * @instance
  */
  hotwater_enabled: false,
  /** Whether the data of hotwater energy is loaded.
  * @type {boolean}
  * @instance
  */
  hotwaterloaded: false,
  /** Total number of months of hotwater energy.
  * @type {number}
  * @instance
  */
  hotwatercount: 0,
  /** chart index of hotwater energy.
  * @type {string}
  * @instance
  */
  hotwaterindex: "-1",
  /** Data of hotwater energy.
  * @type {object}
  * @instance
  */
  hotwaterlist: [],
  /** Whether the Data of water heating is enabled.
  * @type {boolean}
  * @instance
  */
  heating_enabled: false,
  /** Whether the Data of water heating is loaded.
  * @type {boolean}
  * @instance
  */
  heatingloaded: false,
  /** Total number of months of heating energy.
  * @type {number}
  * @instance
  */
  heatingcount: 0,
  /** chart index of heating energy.
  * @type {string}
  * @instance
  */
  heatingindex: "-1",
  /** Data of heating energy.
  * @type {object}
  * @instance
  */
  heatinglist: [],
  /** Name of upper tab on energy page currently selected.
  * @type {string}
  * @instance
  */
  curtab: ""
}
