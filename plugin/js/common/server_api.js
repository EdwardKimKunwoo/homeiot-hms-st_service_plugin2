/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Server API defines sending and receiving data between plug-ins and servers
 * @module common/server_api
 */

 /**
 * Get API body.
 * @param {string} method - "POST", "GET".
 * @param {string} uri - The command.
 * @param {string} apikey - The command.
 * @param {string} body - The detailed data.
 * @returns {object} API body
 */
function getApiBody(method, uri, body) {
  var apibody;
  if (!uri) return undefined;
  if(method === "POST" && body === undefined) return undefined;

  if(method === "GET"){
      apibody = {
        "payload": {
          "parameters": {
            "method": method,
            "uri": uri
          }
        }
      };
  }else{
      apibody = {
      "payload": {
        "parameters": {
          "method": method,
          "uri": uri,
          "body": body
        }
      }
    };
  }

  return apibody;
}


/* serverInfo API */
/**
 * Get server information from server.
 * @returns {object}
 */
function rsapi_getServerInfo() {
  var uri = "/serviceInfo";

  return getApiBody("GET", uri);
}

/* userinfo API */
/**
 * Get user information from server.
 * @returns {object}
 */
function rsapi_getUserInfo() {
  var uri = "/userInfo";

  return getApiBody("GET", uri);
}

/* AlarmSetting API */
/**
 * Get alarm setting information from server.
 * @returns {object}
 */
function rsapi_getAlarmSetting() {
  var uri = "/notification";

  return getApiBody("GET", uri);
}

/**
 * Set alarm setting information to server.
 * @param {object} body - The detailed data
 * @returns {object}
 */
function rsapi_postAlarmSetting(body) {
  var uri = "/notification";

  return getApiBody("POST", uri, body);
}

/* Legal Information  API */
/**
 * Get Legal Information from server.
 * @returns {object}
 */
function rsapi_getLegalInformation() {
  var uri = "/legalInformation";

  return getApiBody("GET", uri);
}

/**
 * Update Legal Information to server.
 * @param {object} body - The detailed data
 * @returns {object}
 */
function rsapi_postLegalInformation(body) {
  var uri = "/legalInformation";

  return getApiBody("POST", uri, body);
}
/*
function rsapi_()
{
  var retAPI=
  ;
  return retAPI;
}
*/
