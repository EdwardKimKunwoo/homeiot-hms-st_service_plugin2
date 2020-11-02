/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

loadJavaScript(isFHub() ? "lib/SCPluginApi_FHub.js" : "lib/SCPluginApi.js", overrideSCPluginAPIs)

function overrideSCPluginAPIs() {
  // sendRequest() is overrided.
  if (isPC()) {
    //For PCs, the data stored in the device should be stored in localStorage.
    window.scplugin.manager.getPluginData = function (handle, key, callback) {
      var value = window.localStorage.getItem(handle + key);
      setTimeout(() => {
        callback(key, value);
      }, 0);
    }
    window.scplugin.manager.setPluginData = function (handle, key, value) {
      window.localStorage.setItem(handle + key, value);
    }
    window.scplugin.manager.deletePluginData = function (handle, key) {
      window.localStorage.removeItem(handle + key);
    }

    // In case of PC, call sendRequest_PC() instead of sendRequest().
    window.scplugin.manager.getService = function (onsuccess, onerror) {
      var arg = {
        serviceHandle: installedAppId,
        extraData: ""
      };
      var serviceObj = window.scplugin._getService(arg);
      serviceObj.sendRequest = sendRequest_PC;
      setTimeout(() => {
        onsuccess(serviceObj);
      }, 0);
    }
  }

  // If OPERATION_MODE is false, call sendRequest_fake() instead of sendRequest().
  if (!OPERATION_MODE) {
    if (isPC() || STAND_ALONE) {
      window.scplugin.manager.getService = function (onsuccess, onerror) {
        var arg = {
          serviceHandle: "",
          extraData: ""
        };
        var serviceObj = window.scplugin._getService(arg);
        serviceObj.sendRequest = sendRequest_fake;
        setTimeout(() => {
          onsuccess(serviceObj);
        }, 0);
      }
    }
    // In case of operating as stand alone, not SmartThings App
    if (STAND_ALONE) {
      window.scplugin.manager.getPluginData = function (handle, key, callback) {
        var value = window.localStorage.getItem(handle + key);
        setTimeout(() => {
          callback(key, value);
        }, 0);
      }
      window.scplugin.manager.setPluginData = function (handle, key, value) {
        window.localStorage.setItem(handle + key, value);
      }
      window.scplugin.manager.deletePluginData = function (handle, key) {
        window.localStorage.removeItem(handle + key);
      }
    }
  }
}

function sendRequest_PC(payload, callback) {
  var request_id = request_count++;
  console.log("sendRequest_PC Request (" + request_id + ") : " + payload.payload.parameters.uri);

  var inputparams;
  var result;
  var xhr;
  inputparams = JSON.stringify(payload.payload);
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var ret = {};
      ret.result = "SUCCESS";
      ret.response = JSON.parse(xhr.responseText);
      console.log("sendRequest_PC Response(" + request_id + ") : " + payload.payload.parameters.uri);
      console.log(ret);
      callback(ret.result, xhr.responseText);
    }
  };
  xhr.open("POST", "https://api.smartthings.com/installedapps/" + installedAppId + "/execute");
  xhr.setRequestHeader("Authorization", token);
  xhr.send(inputparams);
}

// For SVG Image
document.loadedSVG = {};

function setSvgColor(element, color) {
  if (!element) {
    return;
  }

  for (const child of element.childNodes) {
    if (child.hasAttribute) {
      if (child.hasAttribute('fill') && child.getAttribute('fill') !== 'none') {
        child.setAttribute('fill', color);
      }

      if (child.hasAttribute('stroke') && child.getAttribute('stroke') !== 'none') {
        child.setAttribute('stroke', color);
      }
    }

    setSvgColor(child, color);
  }
}
