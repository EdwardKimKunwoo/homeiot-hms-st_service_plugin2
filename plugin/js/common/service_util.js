/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

function includeJs(jsFilePath) {
    var js = document.createElement("script");

    //console.log(jsFilePath);

    js.type = "text/javascript";
    js.src = jsFilePath;

    document.head.appendChild(js);

}

function getServerINFO(serviceID) {
    return service_list_config.find((e) => e.id === serviceID);
}

function getServiceIDByServerName(serverName) {
    return service_list_config.find((e) => e.serverName.includes(serverName)).id;
}

var serviceIndex = 0;
var saveParkingIndex = -1;
function includeService(serviceID, serviceName) {
    var tmpServiceIndex = 0;
    var tmpServerInfo;
    var bIncludeJS = true;

    if (serviceID === SERVICEID_PARKING_LOCATION || serviceID === SERVICEID_PARKING_HISTORY) {
        if (saveParkingIndex === -1) {
            tmpServiceIndex = serviceIndex++;
            saveParkingIndex = tmpServiceIndex;
        }
        else {
            tmpServiceIndex = saveParkingIndex;
            bIncludeJS = false;
        }

        if (serviceID === SERVICEID_PARKING_LOCATION) {
            ParkingLocationEnabled = true;
        }
        if (serviceID === SERVICEID_PARKING_HISTORY) {
            ParkingHistoryEnabled = true;
        }
    } else {
        tmpServiceIndex = serviceIndex++;
    }

    tmpServerInfo = getServerINFO(serviceID);
    tmpServerInfo.order = tmpServiceIndex;

    //console.log(tmpServerInfo);
    if (bIncludeJS === true)
        includeJs(tmpServerInfo.jsUri);

    return tmpServiceIndex;
}

function includeServices() {
    for (let i = 0; i < service_list_config.length; i++) {
        if (service_list_config[i].enabled) {
            includeService(service_list_config[i].id, service_list_config[i].serverName);
        }
    }
}


function setServerInit(service, serviceId, serviceId2) {
    var tmpServerInfo = getServerINFO(serviceId);
    var tmpServerInfo2;
    var addServerIDString = "";
    if (serviceId2) {
        tmpServerInfo2 = getServerINFO(serviceId2);
        addServerIDString = "," + tmpServerInfo2.serverName;
    }
    serviceList[parseInt(tmpServerInfo.order)] =
        {
            service: service,
            serverId: tmpServerInfo.serverName + addServerIDString,
            enabled: false,
            serviceId: serviceId
        };

    //  serverInfoObject.service=[serverInfoObject.service.length] = tmpServerInfo.serverName;
    //  jsonDataServerInfo.data.service[jsonDataServerInfo.data.service.length] = tmpServerInfo.serverName;
    if (serviceId2) {
        //    serverInfoObject.service=[serverInfoObject.service.length] = tmpServerInfo2.serverName;
        //    jsonDataServerInfo.data.service[jsonDataServerInfo.data.service.length] = tmpServerInfo2.serverName;
    }

}