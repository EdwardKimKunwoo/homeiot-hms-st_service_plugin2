/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview It handles user information
 * @module main/user_info
 */

/********** USER INFO ***********/
var userInfoDataKey = "userInfoDataKey";

/** Load user information with promise */
function promiseLoadUserInfoTitle() {
    return new Promise((resolve, reject) => {
        //scplugin.manager.deletePluginData(pluginService.serviceHandle, "userInfoDataKey");
        scplugin.manager.getPluginData(pluginService.serviceHandle, userInfoDataKey, (key, value) => {
            if (key !== "FAIL" && value !== null && value !== "" && value !== undefined) {
                userInfoObject.userInfoTitle = value;
            }
            if (!userInfoObject.loaded) {
                updateMainUserInfo();
            }
            resolve();
        });
    });
}

/** Update user information */
function updateMainUserInfo() {
    var requestBody = rsapi_getUserInfo();
    pluginService.sendRequest(requestBody, updateMainUserInfoCallback);
}

function updateMainUserInfoCallback(_result_, _json_) {
    var response = checkJasonData("UserInfo", _result_, _json_);
    if (response !== null) {
        parseUserInfoData(response);
        drawUserInfoBarTitle();
    }
}

/** Parse user information */
function parseUserInfoData(response) {
    if (response.result.status === RESPONSE_OK) {
        let buildStr = $.lang[lang].BUILDING_NO_UNIT.replace("%1$d", response.data.building_no);
        userInfoObject.userInfoTitle = buildStr.replace("%2$d", response.data.unit);
        userInfoObject.loaded = true;
        scplugin.manager.setPluginData(pluginService.serviceHandle, userInfoDataKey, userInfoObject.userInfoTitle);
    }
}

/** Draw title bar with user information on actionbar */
function drawUserInfoBarTitle() {
    if ($('#actionBar_loading_img').is(':visible')) {
        document.getElementById("actionBar_loading_img").style.display = "none";
    }
    if ($('#actionBarTitle').is(':visible')) {
        document.getElementById("actionBarTitle").innerHTML = userInfoObject.userInfoTitle;
    }
}
