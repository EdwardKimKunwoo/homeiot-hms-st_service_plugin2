/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Energy service shows the amount of energy used before and now.
 * @module service/energy/server_api
 * @author Home IoT R&D Team
 */

/**
 * Get electricity data from server.
 * @param {string} year - Start year to get the value.
 * @param {number} month - Start month to get the value.
 * @param {number} num - Total number of months to be imported including the current month.
 * @returns {object}
 */
function rsapi_getEnergyElecData(year, month, num) {
  var uri = "/ems?type=elec&year="+year+"&month="+ month + "&num=" + num;

  return getApiBody("GET", uri);
}
/**
 * Get water data from server.
 * @param {string} year - Start year to get the value.
 * @param {number} month - Start month to get the value.
 * @param {number} num - Total number of months to be imported including the current month.
 * @returns {object}
 */
function rsapi_getEnergyWaterData(year, month, num) {
  var uri = "/ems?type=water&year="+year+"&month="+ month + "&num=" + num;

  return getApiBody("GET", uri);
}
/**
 * Get gas data from server.
 * @param {string} year - Start year to get the value.
 * @param {number} month - Start month to get the value.
 * @param {number} num - Total number of months to be imported including the current month.
 * @returns {object}
 */
function rsapi_getEnergyGasData(year, month, num) {
  var uri = "/ems?type=gas&year="+year+"&month="+ month + "&num=" + num;

  return getApiBody("GET", uri);
}
/**
 * Get hot water data from server.
 * @param {string} year - Start year to get the value.
 * @param {number} month - Start month to get the value.
 * @param {number} num - Total number of months to be imported including the current month.
 * @returns {object}
 */
function rsapi_getEnergyHotWaterData(year, month, num) {
  var uri = "/ems?type=hotwater&year="+year+"&month="+ month + "&num=" + num;

  return getApiBody("GET", uri);
}
/**
 * Get heat data from server.
 * @param {string} month - Start month to get the value.
 * @param {number} year - Start year to get the value.
 * @param {number} num - Total number of months to be imported including the current month.
 * @returns {object}
 */
function rsapi_getEnergyHeatingData(year, month, num) {
  var uri = "/ems?type=heat&year="+year+"&month="+ month + "&num=" + num;

  return getApiBody("GET", uri);
}
