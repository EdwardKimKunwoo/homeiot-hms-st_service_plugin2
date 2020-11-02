/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Admin service shows the previous and current management expenses.
 * @module service/admin/server_api
 * @author Home IoT R&D Team
 */

/**
 * Get Bill Statement information from server.
 * @param {string} year - Start year to get the value.
 * @param {string} month - Start month to get the value.
 * @param {number} num - Total number of months to be imported including the current month.
 * @returns {object}
 */

function rsapi_getAdminData(year,month,num) {
    var uri = "/bill?year="+year+"&month="+month+"&num="+num;

    return getApiBody("GET", uri);
}
