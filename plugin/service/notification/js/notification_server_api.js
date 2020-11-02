/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Community Notification & Announcement Board Service
 * @module service/notification/server_api
 * @author Home IoT R&D Team
 */

 /**
  * Get community notification title list
  * @param {number} startIndex - start index of the list to retrieve
  * @param {number} num - the number of items to be retrieved
  * @returns {object}
  */

function rsapi_getNotiTitle(startIndex, num) {
    var uri = "/notice/title?startIndex=" + startIndex + "&num=" + num;
    var apikey = "/cvsh/notice";

    return getApiBody("GET", uri);
}

/**
 * Get community notification message
 * @param {string} id - id of the message to be retrieved
 * @returns {object}
 */

function rsapi_getNotiBody(id) {
    var uri = "/notice/message?id=" + id;

    return getApiBody("GET", uri);
}
