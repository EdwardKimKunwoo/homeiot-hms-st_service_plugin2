/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Parking service shows parking location and entrance records.
 * @module service/parking/server_api
 * @author Home IoT R&D Team
 */

/**
 * Get parking location from server.
 * @returns {object}
 */
function rsapi_getParkingLocation() {
  var uri = "/parking/info";

  return getApiBody("GET", uri);
}

// function rsapi_getParkingAvailable() {
//   /* to be defined */
//   var uri = "/cvsh/availableParkinglocation";
//   var apikey = "/cvsh/availableParkinglocation";

//   return getApiBody("GET", uri, apikey);
// }

/**
 * Get incomming & outgoing history of vehicles.
 * @param {string} type - the type of the history list. ( all :  incomming & outgoing, out: outgoing, in: incoming )
 * @param {number} startIndex - start index of the list to retrieve.
 * @param {number} num - the number of items to be retrieved.
 * @returns {object}
 */
function rsapi_getParkingHistory(type, startIndex, num) {
  var uri = "/parking/inNoutHistory?" +"type="+type + "&startIndex=" + startIndex+"&num=" + num;

  return getApiBody("GET", uri);
}
