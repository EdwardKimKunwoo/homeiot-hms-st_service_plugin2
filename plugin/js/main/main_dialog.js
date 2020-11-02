/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Dialog for service.
 * @module main/dialog
 */

/** 
 * Show page with loading icon. 
 * @param {boolean} bShow - Whether to show the page.
 * @param {object} service - Service with the page to be shown.
 */
function showContentLoadingPage(bShow, service) {
    if (bShow) {
        if (service.getObject().pageloaded === false) {
            document.getElementById('pageloading').style.display = "flex";
            document.getElementById('pageloading').style.zIndex = 100;
            document.getElementById('pageloading').style.background = "#f2f2f2";
            service.requestPageData();
        }
    } else {
        document.getElementById('pageloading').style.display = "none";
    }
}

/** 
 * Show error dialog. 
 * @param {object} buttonClickHandler - click handler that adds a button.
 */
function showRequestErrorDialog(buttonClickHandler) {
    document.getElementById("request_error_button").onclick = (buttonClickHandler) ? buttonClickHandler : hideRequestErrorDialog;
    document.getElementById("request_error_dialog").style.display = "flex";
}

/** 
 * Hide error dialog. 
 */
function hideRequestErrorDialog() {
    document.getElementById("request_error_dialog").style.display = "none";
}
/** 
 * Show a dialog with network disconnection during the initialization process.
 */
function showInitialNetworkDisconnectionDialog() {
    document.getElementById("initial_network_disconnection_dialog").style.display = "flex";
}
/** 
 * Hide a dialog with network disconnection during the initialization process.
 */
function hideInitialNetworkDisconnectionDialog() {
    document.getElementById("initial_network_disconnection_dialog").style.display = "none";
    backAction("back");
}
/** 
 * Show a dialog with network disconnection after the initialization process.
 */
function showNetworkDisconnectionDialog() {
    document.getElementById("network_disconnection_dialog").style.display = "flex";
}
/** 
 * Hide a dialog with network disconnection after the initialization process.
 */
function hideNetworkDisconnectionDialog() {
    document.getElementById("network_disconnection_dialog").style.display = "none";
}
/** 
 * Show a dialog with loading error.
 */
function showLoadingErrorDialog() {
    if (!$('.modal').is(':visible')) {
        document.getElementById("loading_error_dialog").style.display = "flex";
        //navis naviBoard.setNavigation("errorMsg","close_btn");
    }
}

/**
 * Update the result of agreements.
 */
function updateAgreement() {
  setServerLegalInformationData();
  // console.log(agreementList);
}

/**
 * Hide the dialog for user agreements.
 */
function hideAgreementDialog() {
  document.getElementById("agreement_dialog").style.display = "none";
  updateAgreement();
}

/**
 * Show the dialog for user agreements.
 */
function showAgreementDialog() {
  document.getElementById("agreement_dialog").style.display = "flex";
}

/**
 * Get and return a smart app name
 */
function getSmartAppName() {
  return agreementinfo.name;
}

/**
 * Set a smart app name for agreement update dialog
 * @param {string} name - smart app. name
 */
function setSmartAppName(name) {
  agreementinfo.name = name;
}
/**
 * Set agreement content header
 */
function setAgreementContentHeader() {
  let header = document.getElementById('agreement_dialog_title');
  let name = getSmartAppName();

  if (agreementList.length === 1) {
      header.innerHTML = agreementList[0].header.replace('%s', name);
  } else {
      header.innerHTML = $.lang[lang].AGREEMENT_HEADER_MULTIPLE.replace('%s', name);
  }
}

/**
 * Set agreement content body
 */
function setAgreementContentBody() {
  let a = document.getElementById("agreement_dialog_link1");
  a.innerHTML = this.agreementList[0].type;
  a.href = this.agreementList[0].url;
  let lastItem = a;

  let front = document.createElement('span');
  front.innerHTML = $.lang[lang].AGREEMENT_BODY_FRONT;
  a.before(front);

  if (this.agreementList.length === 2) {
    let sep = document.createElement('span');
    sep.innerHTML = $.lang[lang].AGREEMENT_BODY_AND;
    a.after(sep);

    let a2 = document.getElementById("agreement_dialog_link2");
    a2.innerHTML = this.agreementList[1].type;
    a2.href = this.agreementList[1].url;
    lastItem = a2;
  }

  let tail = document.createElement('span');
  tail.innerHTML = $.lang[lang].AGREEMENT_BODY_TAIL;
  lastItem.after(tail);
}

/**
 * Make up the dialog header and body
 */
function makeUpAgreementDialog() {
  setAgreementContentHeader();
  setAgreementContentBody();
  document.getElementById('agreement_dialog_button').innerHTML = $.lang[lang].AGREEMENT_BUTTON;
}

/**
* Get legal agreement information from a server
*/
function getServerLegalInformationData() {
  // console.log("getServerLegalInformationData" + "() called...");
  var requestBody = rsapi_getLegalInformation();
  promiseSendRequestWithTimeout(requestBody)
  .then((response) => getServerLegalInformationCallback(response))
  .catch((e) => console.log(e));
}

/**
* parsing the reponse of  legal agreement information from a server.
* @param {object} response - a response from a server
*/
function getServerLegalInformationCallback(response) {
  // console.log("getServerLegalInformationCallback" + "() called...");
  let item = {};
  let indicator = false;

  setSmartAppName(response.data.service_title);
  if (response.data.tnc !== undefined) {
    if (response.data.tnc.eula !== response.data.tnc.lock_smith) {
      indicator = true;
      item = {};
      item.type = $.lang[lang].TERMS_N_CONDITIONS;
      item.header = $.lang[lang].AGREEMENT_HEADER_TNC;
      item.url = TERMS_N_CONDITIONS_URL;
      agreementList.push(item);
    }
    agreementinfo.tnc = response.data.tnc.eula;
  }

  if (response.data.tppa !== undefined) {
    if (response.data.tppa.eula !== response.data.tppa.lock_smith) {
      indicator = true;
      item = {};
      item.type = $.lang[lang].PERSONAL_INFO_3RD_PARTY_PROV_AGREEMENT;
      item.header = $.lang[lang].AGREEMENT_HEADER_TPPA;
      item.url = THIRD_PARTY_PRIVACY_POLICY_AGREEMENT_URL;
      agreementList.push(item);
    }
    agreementinfo.tppa = response.data.tppa.eula;
  }

  if (indicator === true) {
    makeUpAgreementDialog();
    showAgreementDialog();
  }
}

/**
* update legal agreement information to a server
*/
function setServerLegalInformationData() {
  // console.log("setServerLegalInformationData" + "() called...");
  var body = {};

  if (agreementinfo.tnc !== undefined) {
    body.tnc = agreementinfo.tnc;
  }

  if(agreementinfo.tppa !== undefined){
    body.tppa = agreementinfo.tppa;
  }

  var stringbody = (JSON.stringify(body)).replace(/"/gi, '\"');
  var requestBody = rsapi_postLegalInformation(stringbody);
  promiseSendRequestWithTimeout(requestBody)
  .then((response) => setServerLegalInformationCallback(response))
  .catch((e) =>  console.log(e));
}

/**
* parsing the reponse of  update legal agreement information from a server.
* @param {object} response - a response from a server
*/
function setServerLegalInformationCallback(response) {
  console.log("Legal Info. Updated " + JSON.stringify(response.data));
}

/**
* checking a legal agreement information from a server
* need to check if the current verson of agreement and agreed one are the same
* if they are not the same then updated agreement is required.
*/
function checkLegalInformationData() {
  if(UPDATE_AGREEMENT_ENABLE === true){
    getServerLegalInformationData();
  }
}
