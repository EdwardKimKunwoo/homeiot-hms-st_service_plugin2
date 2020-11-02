/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Parcel service shows the information about the unreceived and received express.
 * @module service/parcel/server_api
 * @author Home IoT R&D Team
 */

 /**
 * Get parcel history list from server.
 * @param {string} type - the type of the parcel history list. ( all : delivered & undelivered, out: delivered, in : undeliveried )
 * @param {number} startIndex - start index of the list to retrieve.
 * @param {number} num - the number of items to be retrieved.
 * @returns {object}
 */
function rsapi_getParcelInfo(type, startIndex, num) {
    var uri = "/parcel/deliveryInfo?type=" + type + "&startIndex=" + startIndex + "&num=" + num;

    return getApiBody("GET", uri);
}
