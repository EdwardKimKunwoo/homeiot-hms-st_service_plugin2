/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview It handles server information
 * @module main/server_info
 */

const serverInfoDataKey = "serverInfoDataKeyV1";
const serverInfoDataKeyVersion = "1.0";

var serverInfoChangedFlag = "serverInfoChangedFlag";
var firstCardInfoLoading = 0;

const SERVERINFO_MATCHED = "000"; // "Matched",
const SERVERINOF_SERVICE_NOT_MACHED = "001"; // "Not Matched of Service",
const SERVERINFO_SERVICE_EMPTY = "002";
const SERVERINFO_SERVICE_WRONG_DATA = "003";
const SERVERINFO_EMS_NOT_MACHED = "004"; //"Not Matched of EMS",
const SERVERINFO_EMS_SET_DEFAULT_VALUE = "004"; //"Not Matched of EMS",
const SERVERINFO_INVALID_VERSION = "010"; // "Invalid Version",
const SERVERINFO_WRONG_VERSION = "011"; // "Wrong Version",
const SERVERINFO_RESET_TO_DEFAULT_VALUE = "100"; // "Forced Reset to Default Value From Server"
const SERVERINFO_CUSTOM_ERROR = "999"; // "Forced Reset to Default Value From Server", Not Used.

var enabledServiceForTV = [SERVICEID_ENERGY, SERVICEID_PARKING_HISTORY, SERVICEID_PARKING_LOCATION, SERVICEID_PARCEL];

/** Load server information with promise */
function promiseLoadServerInfo() {
    return new Promise((resolve, reject) => {
        // 이전에 serverinfo가 update 되어서 reload 된 경우라면 toast를 표시한다.
        scplugin.manager.getPluginData(pluginService.serviceHandle, serverInfoChangedFlag, (key, value) => {
          if (value) {
              scplugin.manager.deletePluginData(pluginService.serviceHandle, serverInfoChangedFlag);
              showToast($.lang[lang].SERVER_UPDATED);
          }
        });

        //scplugin.manager.deletePluginData(pluginService.serviceHandle, "serverInfoDataKey");
        // Retrieves the cached data in local. If not, use the default data stored in the serverInfoObject.server.
        scplugin.manager.getPluginData(pluginService.serviceHandle, serverInfoDataKey, (key, value) => {
            if (key !== "FAIL" && value !== null && value !== "" && value !== undefined) {
              serverInfoObject = string2jsonForserverInfo(value);
            }

            // Reads the service list from the serverInfoObject.server and enables each service.
            for (let i = 0; i < serviceList.length; i++) {
                // Initialize to false
                serviceList[i].enabled = false;
                var serverIds = serviceList[i].serverId.split(',');
                // If the value received from the server has the same name, the service is enabled.
                for (let j = 0; j < serverIds.length; j++) {
                    var index = serverInfoObject.service.findIndex((e) => e === serverIds[j]);
                    if (index !== -1) {
                        if(isSmartTV()){
                          if(enabledServiceForTV.includes(serviceList[i].serviceId))
                            serviceList[i].enabled = true;
                        }else {
                          serviceList[i].enabled = true;
                          if(serviceList[i].service === energyService) {
                            if(setEnergyServices(serverInfoObject.ems) === 0){
                              serviceList[i].enabled = false;
                            }
                          }
                        }
                        if(!firstCardInfoLoading){
                          // If it is the first loading, update the service card information.
                          var cardInfo = { cardID:"", bServicedCard:true, bEnabledCard:false, initCardOrder:-1, nCardOrder:-1, title:"" };
                          cardInfo.cardID = getServiceIDByServerName(serverIds[j]);
                          serviceList[i].service.cardInfo.list[serviceList[i].service.cardInfo.numServiceCard++] =cardInfo;
                          //console.log("!!!!!@@@@@#####",serverIds[j],serviceList[i].service.getPageTitleText(), serviceList[i].service.cardInfo.numServiceCard);
                        }
                    }
                }
            }
            firstCardInfoLoading=1;
            if (!serverInfoObject.loaded) {
                updateServerInfo();
            }
            resolve();
        });
    });
}

const ARRAYMATCH_MATCHED = "ARRAYMATCH_MATCHED";
const ARRAYMATCH_NOT_MATCHED = "ARRAYMATCH_NOT_MATCHED";
const ARRAYMATCH_SORT_ERROR = "ARRAYMATCH_SORT_ERROR";
const ARRAYMATCH_UNKNOWN_ERROR = "ARRAYMATCH_UNKNOWN_EROR";
function areArraysMatch(arr1, arr2){
  let ret;
  try{
    if(arr1.sort().toString() === arr2.sort().toString()){
      return ARRAYMATCH_MATCHED;
    } else {
      return ARRAYMATCH_NOT_MATCHED;
    }
  } catch(error){
    console.log("areArraysMatch",error);
    return ARRAYMATCH_SORT_ERROR;
  }
  return ARRAYMATCH_UNKNOWN_ERROR;
}

/** Update server information */
function updateServerInfo() {
    var requestBody = rsapi_getServerInfo();
    pluginService.sendRequest(requestBody, updateServerInfoCallback);
}

function updateServerInfoCallback(_result_, _json_) {
    var response = checkJasonData("ServerInfo", _result_, _json_);
    if (response != null && response.result.status === RESPONSE_OK) {
        //   {
        //     "data":{
        //        "server":[
        //           "공지사항",
        //           "택배",
        //           "원격검침",
        //           "입차통보",
        //           "주차위치"
        //        ]
        //     },
        //     "result":{
        //        "status":"000",
        //        "message":"ok"
        //     }
        //  }
        serverInfoObject.loaded = true;

        // 서버로부터 받은 service list와 cache된 service list를 비교하여 다르면 server로부터 받은 값을 cache하고 plugin을 reload 한다.
        let ret = isServiceMatched(response.data,serverInfoObject);
        if ( ret === SERVERINFO_MATCHED) {
            console.log("serverInfo is not changed - response.data service : " + response.data.service + " ems :" + response.data.ems);
            //console.log(serverInfoObject);
        } else if ( ret === SERVERINOF_SERVICE_NOT_MACHED ||
          ret === SERVERINFO_EMS_NOT_MACHED ||
          ret === SERVERINFO_INVALID_VERSION
        ) {
          console.log("serverInfo is changed : ", JSON.stringify(response.data));
          response.data.version = serverInfoDataKeyVersion;
          let strResponseData = json2stringForserverInfo(response.data);
          scplugin.manager.setPluginData(pluginService.serviceHandle, serverInfoDataKey, strResponseData);
          console.log("Reload plugin");
          scplugin.manager.setPluginData(pluginService.serviceHandle, serverInfoChangedFlag, ret);
          removeServiceOrderData();
          window.location.replace(window.location.origin + window.location.pathname);
        }
        else {
            console.log("serverInfo has some error("+ret+") - response.data service : " + response.data.service + " ems :" + response.data.ems);
        }
    }
}

function checkNsetEMSDefaultValue(responseData,savedEmsData){
  let defaultEmsData = [
    "elec",
    "water",
    "gas",
    "hotwater",
    "heating"
  ];
  // console.log(responseData,savedEmsData);

  if(areArraysMatch(defaultEmsData,savedEmsData)===ARRAYMATCH_MATCHED){
     return SERVERINFO_MATCHED;
  } else {
    responseData.ems = defaultEmsData;
    return SERVERINFO_EMS_NOT_MACHED;
  }

}


function isServiceMatched(responseData, savedData){

  //console.log("isServiceMatched : ",responseData,savedData,serverInfoDataKeyVersion);

  if(responseData.default) return SERVERINFO_RESET_TO_DEFAULT_VALUE;

  if(savedData.version !== serverInfoDataKeyVersion) return SERVERINFO_INVALID_VERSION;

  if(serverInfoDataKeyVersion === "1.0"){
    if(responseData.service){
      let tmpResult = areArraysMatch(responseData.service, savedData.service);
      if( tmpResult === ARRAYMATCH_NOT_MATCHED ) return SERVERINOF_SERVICE_NOT_MACHED;
      else if (tmpResult === ARRAYMATCH_SORT_ERROR )return SERVERINFO_SERVICE_WRONG_DATA;
      else if (tmpResult === ARRAYMATCH_UNKNOWN_ERROR )return SERVERINFO_SERVICE_WRONG_DATA;
    } else {
       return SERVERINFO_EMPTY_SERVICE;
    }

    if(responseData.ems){
      let tmpResult = areArraysMatch(responseData.ems, savedData.ems);
      if( tmpResult === ARRAYMATCH_NOT_MATCHED ){
        console.log("EMS info is not matched.");
        return SERVERINFO_EMS_NOT_MACHED;
      } else if( tmpResult !== ARRAYMATCH_MATCHED ){
        console.log("EMS info has some error("+ tmpResult +"). it will be set to default data of ems");
        return checkNsetEMSDefaultValue(responseData,savedData.ems);
      }
    } else {
      console.log("EMS info is undefined from server. it will be set to default data of ems");
      return checkNsetEMSDefaultValue(responseData,savedData.ems);
    }

    return SERVERINFO_MATCHED;
  }

  console.error("Version is wrong!!!!!!",responseData.version);
  return SERVERINFO_WRONG_VERSION;
}

function getDefaultValueForServerInfo(){
  let jsonDefulatValue = {
    version: serverInfoDataKeyVersion,
    service:[
        "notice",
        "parcel",
        "parking",
        "entry",
        "bills",
        "cctv",
        "visitor",
        "EMS"
      ],
      ems:[
        "elec",
        "water",
        "gas",
        "hotwater",
        "heating"
      ]
    };
  return jsonDefulatValue;
}

/* For FHub, it saved string not json data of serverInfo
  It do not support Json data and spcial charaters(" ' [ ] {} ...).
*/
function json2stringForserverInfo(jServerInfo){
  return jServerInfo.version + "|" + jServerInfo.service + "|" + jServerInfo.ems;
}

function string2jsonForserverInfo(sServerInfo){
  let tmp = sServerInfo.split("|");
  let ret = {version:"",service:[],ems:[]};

  ret.version = tmp[0];
  ret.service = tmp[1].split(",");

  //console.log("tmp2",tmp[0],tmp[1],tmp[2]);
  if(tmp[2] === undefined){
    ret.ems = undefined;
  } else {
    ret.ems = tmp[2].split(",");
  }

  return ret;
}
