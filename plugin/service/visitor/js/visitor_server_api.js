/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Visitors service shows a list of missed visitors.
 * @module service/visitor/server_api
 * @author Home IoT R&D Team
 */

/**
 * Get visitor history from server.
 * @param {number} startIndex - start index of the list to retrieve.
 * @param {number} num - the number of items to be retrieved.
 * @returns {object}
 */
function rsapi_getVisitorHistory(startIndex, num) {
    var uri = "/visitor/history?startIndex=" + startIndex + "&num=" + num;

    return getApiBody("GET", uri);
}

/** Get detailed information from server.
 * @returns {object}
*/
function rsapi_getVisitorDetails() {
    /* to be defined */
    var uri = "/cvsh/visitorDetail";
    var apikey = "/cvsh/visitorDetail";

    return getApiBody("GET", uri, apikey);
}