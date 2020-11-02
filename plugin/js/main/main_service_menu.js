/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview The dropdown menu with several services on main page
 * @module main/service_menu
 */

var activeNum = 1;
var serviceMenu;

/** Initiate service menu */
function initMainServiceMenu() {

  serviceMenu = getServicesText(serviceList);
  var drawHtml =
    "<div id='main_service_menu_title' class='main_service_menu_css' >" +
    "</div>" +
    "<div class='service_menu_expand_css'>" +
    serviceMenu.text +
    "<div class='clear'>" +
    "</div>" +
    "</div>";
  document.getElementById('main_service_menu_div').innerHTML = drawHtml;
  drawMainServiceMenu(false);

  $("#main_service_menu_div").accordion({
    collapsible: true,
    active: 1,
    animate: 200,
    heightStyle: 'content',
    disabled: true
  });
  activeNum = 1;

  $("#main_service_menu_div").addClass("main_service_menu_card_css");

}

/** Relocate service menu when expanded */
function relocateMainServiceMenuExpand() {

  let boxFixedWidth = 76;
  let boxFixedMargin = 4;
  let boxFixedFontSize = 12;
  let service_menu_width = $("#main_service_menu_title").width();

  let numServicesBy1line = 1;
  let sideMargin = 0;
  for (let i = 0; i < serviceMenu.count; i++) {
    let tmpMargin = service_menu_width - (boxFixedWidth * numServicesBy1line + boxFixedMargin * (numServicesBy1line - 1));
    if (tmpMargin < 0) {
      --numServicesBy1line;
      break;
    }
    sideMargin = tmpMargin;
    numServicesBy1line++;
  }

  let boxes = document.getElementsByClassName('serviceicons_box');
  for (let i = 0; i < boxes.length; i++) {
    if (i % numServicesBy1line === 0) {
      boxes[i].setAttribute('style', 'margin-left:' + sideMargin/2 + 'px');
    }
    else if (i % numServicesBy1line === numServicesBy1line - 1) {
      boxes[i].setAttribute('style', 'margin-right:' + sideMargin/2 + 'px');
    }
    else {
      boxes[i].setAttribute('style', 'margin-left:' + boxFixedMargin + 'px');
    }

    let boxText = boxes[i].querySelector('.serviceicons_text');
    if (boxText.offsetHeight > boxFixedFontSize) {
      boxText.setAttribute('style', 'margin-top: 3px;');
    }
  }
}

/** Draw service menu */
function drawMainServiceMenu(bExpanded) {
  var retHtml = "";
  if (!bExpanded) {
    retHtml =
      "<div id='service_menu_button'>" +
      "<div style='position:relative;float:none;width:auto;'>" + $.lang[lang].SERVICEMENU +
      "<img id='service_menu_expand_img' src='res/img/home_button_expand_open_light.png' style='margin-left:4px;width:12px;height:12px;'/>" +
      "</div>" +
      "</div>";
    document.getElementById('main_service_menu_title').innerHTML = retHtml;

    $("#service_menu_button").addClass("service_menu_button_css");
    $("#main_service_menu_div").css("background-color", "");

  } else {
    retHtml =
      "<div id='service_menu_button'>" +
      "<div style='position:relative;float:none;width:auto;'>" + $.lang[lang].SERVICEMENU +
      "<img id='service_menu_expand_img' src='res/img/home_button_expand_open_light.png' style='margin-left:4px;width:12px;height:12px;'/>" +
      "</div>" +
      "</div>";
    document.getElementById('main_service_menu_title').innerHTML = retHtml;

    $("#service_menu_button").addClass("service_menu_expand_button_css");
    $("#main_service_menu_div").css("background-color", "var(--brand-color)");

    relocateMainServiceMenuExpand();
  }

  document.getElementById('service_menu_button').addEventListener('touchstart', (e) => {
    let config = {
      type: 'rippleC',
      cb: () => { toggleServiceMenu(); }
    };
    rippleManager.set(e, config);
  }, {passive: true});

  return retHtml;
}

/** Toggle service menu */
function toggleServiceMenu() {
  if (activeNum === 1) {
    $("#main_service_menu_div").accordion("option", "active", 0);
    drawMainServiceMenu(true);
    document.getElementById("service_menu_expand_img").src = "res/img/home_button_expand_close_light.png";
    activeNum = 0;
    var itemCount = 0;
    let config = {};
    config.type = 'rippleC';
    for (let i = 0; i < serviceList.length; i++) {
      if (serviceList[i].enabled === true) {
        let obj = document.getElementById('serviceicons_box_' + itemCount);
        obj.addEventListener('touchstart', (e) => {
          config.cb = () => {
            switch (serviceList[i].service.getPageClickFunctionName) {
              case 'notificationCardOnClick':
                notiObject.card_index = 0;
                break;
              case 'parcelCardOnClick':
                parcelObject.clicked_index = 0;
                parcelObject.clicked_id = 'parcelCardItem_0';
                parcelObject.originalclicked_id = 'parcelCardItem_0';
                break;
              case 'parkingCardOnClick':
                var loc_data = parkingObject.carlocationlist[0];
                var loc_newId;
                if (loc_data) {
                  loc_newId = loc_data.car_no + loc_data.location;
                  loc_newId = loc_newId.replace(/\s/gi, "");
                  if (document.getElementById('parkingLocation_' + loc_newId)) {
                    parkingObject.clicked_id = 'parkingLocation_' + loc_newId;
                    break;
                  }
                }
                var his_data = parkingObject.carhistorylist[0];
                var his_newId;
                if (his_data) {
                  his_newId = his_data.car_no + his_data.reg_time;
                  his_newId = his_newId.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\s\-_+<>@\#$%&\\\=\(\'\"]/gi, "");
                  if (document.getElementById('parkingHistory_' + his_newId)) {
                    parkingObject.clicked_id = 'parkingHistory_' + his_newId;
                    break;
                  }
                }
                if (loc_data) {
                  parkingObject.clicked_id = 'parkingLocation_' + loc_newId;
                } else if (his_data) {
                  parkingObject.clicked_id = 'parkingHistory_' + his_newId;
                }
                break;
              case 'visitorCardOnClick':
                visitorObject.clicked_index = 0;
                visitorObject.clicked_id = 'visitorCardItem_0';
                visitorObject.originalclicked_id = 'visitorCardItem_0';
                break;
              default:
                break;
            }
            (new Function(serviceList[i].service.getPageClickFunctionName + '();'))();
          }
          rippleManager.set(e, config);
        }, {passive: true});
        itemCount++;
      }
    }
  } else {
    $("#main_service_menu_div").accordion("option", "active", 1);
    drawMainServiceMenu(false);
    document.getElementById("service_menu_expand_img").src = "res/img/home_button_expand_open_light.png";
    activeNum = 1;
  }
}

/** Get text of service name */
function getServicesText(services) {

  var tmpText = "";
  var itemCount = 0;
  for (let i = 0; i < services.length; i++) {
    if (services[i].enabled === true) {
      tmpText +=
        "<span id='serviceicons_box_" + itemCount + "' class='serviceicons_box'>" +
        "<div style='width: 40px; height:40px;'>" +
             services[i].service.getIconSVG + 
        "</div>" +
        "<div class = 'serviceicons_text'>" +
        services[i].service.getPageTitleText() +
        "</div>" +
        "</span>";

      itemCount++;
    }
  }
  return { text: tmpText, count: itemCount, id_header: "serviceicons_box_" };
}
