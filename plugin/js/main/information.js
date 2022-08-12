/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Information page to show version number and license.
 * @module main/information
 */

function InformationPage() {}

InformationPage.prototype = {
  /** Get title of page.
  * @return {string}
  */
  getPageTitleText: function () {
    return $.lang[lang].PLUGIN_INFO;
  },
  /** Execute view of page. */
  onViewPage: function () {
    return loadedInfoPage();
  }
}

function loadedInfoPage() {
  drawActionBar(false);

  if (isFHub()) {
    scplugin.manager.setFlag("openAdditionalPage");
  }

  initInformationPage();
  drawInformationSummary();

  setActionBarMenu("hidden");

  return;
}

function initInformationPage() {
  var inner_html = "";
  document.getElementById('informationPage').innerHTML = inner_html;
}

var configTimer = undefined;
var touchCounter = 0;
function drawInformationSummary() {
  var servertext = "<div class='service_page_header' style='margin-top: 21px;margin-bottom:34px;'>SERVER(VERSION) : " + API_TYPE + "(" + API_VERSION + ")</div>"
  var operationtext = (OPERATION_MODE === 1) ? "Server</div>" + servertext : "Sideloading</div>";

  var inner_html =
    "<div style='height:60px;width:auto;text-align:center;'></div>" +
    "<div id='infoServiceName'>" + apt_info + "</div>" +
    "<div id='infoVersion'>" + VERSION + "</div>" +
    "<div id='infoVersion'>ZIGBANG</div>" +
    "<div id='infoVersion'>1588-4141</div>" +    
    "<div style='height:162px;position:absolute;bottom:46px;width:100%;text-align:-webkit-center;'>"+
      "<div id='infoOpenBoxTerms'  class='infoOpenBox' style='margin-bottom:15px' >" +
        $.lang[lang].TERMS_N_CONDITIONS +
      "</div>"+
      "<div id='infoOpenBoxPrivacy'  class='infoOpenBox' style='margin-bottom:15px'>" +
        $.lang[lang].PRIVACY_POLICY +
      "</div>"+
      "<div id='infoOpenBoxLicense' class='infoOpenBox'>" +
        $.lang[lang].LICENSES +
      "</div>"+
    "</div>";

  document.getElementById("informationPage").innerHTML += inner_html;

  let config = {};
  $('#infoOpenBoxLicense').on('touchstart', function(e) {
    config.cb = () => {
      document.location.href = "#" + SCREEN_OPTION_INFO_LICENSE;
    };
    rippleManager.set(e, config);
  });

  $('#infoOpenBoxPrivacy').on('touchstart', function(e) {
    config.cb = () => {
      var newlink = document.createElement('a');
      newlink.setAttribute('href', PRIVACY_POLICY_URL);
      document.body.appendChild(newlink);
      newlink.click();
      document.body.removeChild(newlink);
    };
    rippleManager.set(e, config);
  });

  $('#infoOpenBoxTerms').on('touchstart', function(e) {
    config.cb = () => {
      var newlink = document.createElement('a');
      newlink.setAttribute('href', TERMS_N_CONDITIONS_URL);
      document.body.appendChild(newlink);
      newlink.click();
      document.body.removeChild(newlink);
    };
    rippleManager.set(e, config);
  });

  $('#infoServiceName').on('touchstart', function(e) {
    if(configTimer === undefined){
      touchCounter = 0;
      configTimer = setTimeout(function(){clearTimeout(configTimer); configTimer = undefined;},5000);
    }
    touchCounter++;
    if(touchCounter === 10){
      pluginService.launchConfiguration(function(result){console.log("Launch Configuration")});
    }
  });
}
