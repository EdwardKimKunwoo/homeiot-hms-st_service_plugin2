/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview It handles privacy information
 * @module main/privacy
 */

 /**
 * Create a PrivacyPage.
 * @constructor
 */
function PrivacyPage() {}

PrivacyPage.prototype = {
  /** Get title of page.
   * @return {string}
   */
  getPageTitleText: function () {
    return $.lang[lang].PRIVACY_POLICY;
  },
  /** Execute view of page. */
  onViewPage: function () {
    return loadedPrivacyPage();
  }
}

/** Load privacy page */
function loadedPrivacyPage() {
  drawActionBar(false);

  if (isFHub())
    scplugin.manager.setFlag("openAdditionalPage");

  initPrivacyPage();
  drawPrivacyPage();

  return;  
}

/** Initiate page */
function initPrivacyPage() {
  document.getElementById('privacyPage').innerHTML = "";
}

/** Draw page */
function drawPrivacyPage() {
  var innerText = "Privacy Policy Statement";
  document.getElementById("privacyPage").innerHTML += innerText;
}
