/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Alarm page to edit alarm settings.
 * @module main/alarm
 */

 /**
 * Create a AlarmPage.
 * @constructor
 */
function MainScreenAlarmPage() { }

MainScreenAlarmPage.prototype = {
  /** Get title of page.
   * @return {string}
   */
    getPageTitleText: function () {
        return $.lang[lang].ALARM;
    },
    /** Execute view of page. */
    onViewPage: function () {
        console.log("onViewPage" + "() called...");
        return loadedMainScreenAlarmPage();
    },
    /** Request data of page. */
    requestPageData: function () {
        console.log("requestPageData" + "() called...");
        setTimeout(getServerAlarmSettingData(), 0);
    },
    /** Get service object. */
    getObject: function () {
        return alarmObject;
    },
}

function getServerAlarmSettingData() {
    console.log("getServerAlarmSettingData" + "() called...");
    var requestBody = rsapi_getAlarmSetting();
    //pluginService.sendRequest(requestBody, getServerAlarmSettingDataCallback);
    promiseSendRequestWithTimeout(requestBody)
	.then((response) => getServerAlarmSettingDataCallback(response))
	.catch((e) => sendRequestExceptionHandlerForGetAlarm());
}

function getServerAlarmSettingDataCallback(response) {
    parseServerAlarmSettingData(response);
    if (!alarmObject.pageloaded) {
        alarmObject.pageloaded = true;
        drawMainScreenAlarmPage();	// 원래는 drawCard()가 호출될 때 불려야 하지만, 현재 main쪽에서 안불러주므로......
        showContentLoadingPage(false);
    }
}

function parseServerAlarmSettingData(response) {
    console.log("parseServerAlarmSettingData" + "() called...", response);
    if (response.result.status === RESPONSE_OK) {
        // alarm 설정 list를 초기화한다.
        for (let i = 0 ; i < alarmObject.list.length ; i++) {
            alarmObject.list[i].enabled = false;
        }
        for (let i = 0 ; i < response.data.list.length ; i++) {
            var res_id = response.data.list[i].alarm;
            var res_status = response.data.list[i].value;
            var index = alarmObject.list.findIndex((e) => e.id === res_id);
            if (index !== -1) {
                alarmObject.list[index].enabled = true;
                alarmObject.list[index].status = res_status;
            }
        }
    }
}

function sendRequestExceptionHandlerForGetAlarm() {
    showRequestErrorDialog(() => {
        backAction();
        showContentLoadingPage(false);
        hideRequestErrorDialog();
    });
}

function setServerAlarmSettingData(alarmId, status) {
    console.log("setServerAlarmSettingData" + "() called...");
    var component = {};
    component.alarm = alarmId;
    component.value = status;

    var body = {};
    body.list = [];
    body.list.push(component);

  //  var stringbody = (JSON.stringify(body)).replace(/"/gi, '\"');
    var stringbody = "{\"list\":[{\"alarm\":\""+alarmId+"\",\"value\":\""+status+"\"}]}";
    var requestBody = rsapi_postAlarmSetting(stringbody);
    //pluginService.sendRequest(requestBody, setServerAlarmSettingDataCallback);
    promiseSendRequestWithTimeout(requestBody)
	.then((response) => setServerAlarmSettingDataCallback(response))
	.catch((e) => sendRequestExceptionHandlerForSetAlarm(e, alarmId));
}

function setServerAlarmSettingDataCallback(response) {
    //parseServerAlarmSettingData(response);

    if (response.result.status === RESPONSE_OK) {
        for (let i = 0 ; i < response.data.list.length ; i++) {
            var id = response.data.list[i].alarm;
            var status = response.data.list[i].value;
            var index = alarmObject.list.findIndex((e) => e.id === id);
            if (index !== -1) {
                // update data
                alarmObject.list[index].status = status;
                // update UI
                var checkbox = document.getElementById("alarm_checkbox_" + id);
                if (checkbox) {
                    checkbox.checked = (status === "on") ? true : false;
                    checkbox.disabled = true;
                }
                document.getElementById("alarm_loading_img_" + id).style.display = "none";
            }
        }
    }
}

function sendRequestExceptionHandlerForSetAlarm(e, alarmId) {
    var index = alarmObject.list.findIndex((e) => e.id === alarmId);
    if (index !== -1) {
        // update UI
        var checkbox = document.getElementById("alarm_checkbox_" + alarmId);
        if (checkbox) {
            checkbox.checked = (alarmObject.list[index].status === "on") ? true : false;
            checkbox.disabled = true;
        }
        document.getElementById("alarm_loading_img_" + alarmId).style.display = "none";
    }
    showRequestErrorDialog();
}

///////////////////////////////////////////////////////////////

function initMainScreenAlarmPage() {
    console.log("initMainScreenAlarmPage" + "() called...");

}

function isServicedService(service_id) {
  for(var i=0; i < serviceList.length; i++) {
    var cardInfoList = serviceList[i].service.cardInfo.list;
    for(var j=0; j < cardInfoList.length; j++){
      if(service_id){
        var tmpIdList = service_id.split(',');
        // 서버로부터 받은 값에 동일 이름이 있으면 해당 service를 enable 시킨다.
        for (let k = 0; k < tmpIdList.length; k++) {
          //console.log("isServicedService",service_id, tmpIdList[k], cardInfoList[j].cardID,cardInfoList[j].bEnabledCard);
          if(cardInfoList[j].cardID === tmpIdList[k])
          {
            return cardInfoList[j].bServicedCard;
          }
        }
      }
    }
  }

  return false;
}

/** draw AlarmPage */
function drawMainScreenAlarmPage() {
    //console.log("drawMainScreenAlarmPage" + "() called...");
    var drawHtml = "<form name='service_alarm'><div class='basic_list_box'>"

    for (var i = 0; i < alarmObject.list.length; i++) {
        if (!alarmObject.list[i].enabled) continue;
        if(!isServicedService(alarmObject.list[i].service_id)) continue
        if (alarmObject.list[i].service_id === "parking" && isServicedService("entry")) continue;

        if (i !== 0) drawHtml += "<div class='basic_list_default_bar'></div>";
        var isChecked = (alarmObject.list[i].status === "on") ? true : false;
        var checkedText = (isChecked) ? "checked" : "";
        var alarmOnOffText = (isChecked) ? $.lang[lang].ALARM_ON : $.lang[lang].ALARM_OFF;

        drawHtml += "<div class='basic_list_item_box' id='basic_list_item_box_" + alarmObject.list[i].id;
        if (i === 0 ) drawHtml += "' style='border-width:1px;border-top-left-radius:26px;border-top-right-radius:26px;'>";
        else if (i === alarmObject.list.length - 1) drawHtml += "' style='border-bottom-left-radius:26px;border-bottom-right-radius:26px;'>";
        else drawHtml += "'>";

            drawHtml +=
            "   <div class='basic_switch_div'>" +
            "       <label class='basic_switch_track'>" +
            "           <input id='alarm_checkbox_" + alarmObject.list[i].id + "' type='checkbox' class='alarm_checkbox' " + checkedText + " disabled='false' />" +
            "           <div class='basic_slider'></div>" +
            "       </label>" +
            "   </div>" +
            "   <div id='alarm_loading_img_" + alarmObject.list[i].id + "' class='basic_list_loading_img_div'><img class='basic_list_loading_img' src='res/img/circle.png' /></div>" +
            "   <div class='basic_list_text_div'>" +
            "       <div class='basic_list_main_text_2Line_normal'>" + alarmObject.list[i].name + "</div>" +
            "       <div id='alarm_sub_text_" + alarmObject.list[i].id + "' class='basic_list_main_subtext_2Line_normal " + checkedText + "'>" + alarmOnOffText + "</div>" +
            "   </div>" +
            "   <div class='clear'></div>" +
            "</div>";
    }
    drawHtml += "</div><form>";

    document.getElementById('mainAlarmPage').innerHTML = drawHtml;

    var itemBoxList = document.getElementsByClassName('basic_list_item_box');
    for (var i = 0; i < itemBoxList.length; i++) {
        itemBoxList[i].removeEventListener('touchstart', (e) => { changeAlarmCheckBox(e); }, {passive: true});
        itemBoxList[i].addEventListener('touchstart', (e) => { changeAlarmCheckBox(e); }, {passive: true});
    }
}

var alarmCheckBoxLocked = false;
function changeAlarmCheckBox(e) {
    e.stopPropagation();

    if (alarmCheckBoxLocked) return;
    alarmCheckBoxLocked = true;

    var clickedObj = e.currentTarget.querySelectorAll('.alarm_checkbox')[0];
    var alarmId = clickedObj.id.replace("alarm_checkbox_", "");

    rippleManager.set(e);

    var index = alarmObject.list.findIndex((e) => e.id === alarmId);
	if (index !== -1) {
        clickedObj.checked = !clickedObj.checked;
        var status = (clickedObj.checked) ? "on" : "off";

        var subTextElement = document.getElementById("alarm_sub_text_" + alarmId);
        subTextElement.innerHTML = (clickedObj.checked) ? $.lang[lang].ALARM_ON : $.lang[lang].ALARM_OFF;
        if (clickedObj.checked) {
            subTextElement.classList.add("checked");
        } else {
            subTextElement.classList.remove("checked");
        }

        setTimeout(function () {
            // 1초 이내에 response가 오지 않으면 loading image 보여줌
            if (!clickedObj.disabled) {
                document.getElementById("alarm_loading_img_" + alarmId).style.display = "inherit";
            }
        }, 1000);

        // 서버에 update 요청
        setTimeout(setServerAlarmSettingData(alarmId, status), 0);

        alarmCheckBoxLocked = false;
    }
}

/** load AlarmPage */
function loadedMainScreenAlarmPage() {
  console.log("loadedMainScreenAlarmPage" + "() called...");
  drawActionBar(false);

  initMainScreenAlarmPage();
  showContentLoadingPage(true, mainscreenAlarmPage);
  drawMainScreenAlarmPage();

  if (isFHub()) {
      scplugin.manager.setFlag("openAdditionalPage");
  }

  setActionBarMenu("hidden");
}
