/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview UI API set for service.
 * @module main/uikit
 */

/** 
* Set actionbar menu. 
* @param {boolean} visibility - Whether the menu will be visible.
*/
function setActionBarMenu(visibility) {
    var menu = document.getElementById('actionBarMenu');
    if (menu)
        menu.style.visibility = visibility;
}

/** 
 * Draw favorite card in no item case.
 * @param {string} cardId - card to be drawn.
 * @param {string} imagePath - The path of image.
 * @param {string} text - Text that appear below the image.
 */
function drawNoItemCard(cardId, imagePath, text) {
    var inHtml = "<div class='servicecards_noitem' style='margin-top:2px;margin-bottom:28px'>";
    // if (imagePath.indexOf("svg") >= 0) {
    //     inHtml += "<div class='servicecards_noitem_circle'>" + imagePath + "</div>";
    // } else {
    //     inHtml +=
    //         "<div class='servicecards_noitem_circle'>" +
    //         "<img src='" + imagePath + "' alt=''/>";
    // }
    inHtml +=
    "<div class='servicecards_noitem_circle'>" +
    "<img src='" + imagePath + "' alt=''/>";
        
    inHtml +=
        "</div>" +
        "<div class='servicecards_noitem_text'>" + text + "</div>" +
        "</div>";

    document.getElementById(cardId).innerHTML = inHtml;
}
/** 
 * Draw detailed page in no item case.
 * @param {string} pageId - The detailed page to be drawn.
 * @param {string} imagePath - The path of image.
 * @param {string} text1 - The first line phrase that appear below the image.
 * @param {string} text2 - The second line phrase that appear below the image.
 * @param {number} top - value of upper margin.
 */
function drawNoItemPage(pageId, imagePath, text1, text2, top) {
    if (!text2) text2 = "";
    var topStyle = "";
    if (top) topStyle = "style='margin-top:-" + top + "px'";

    var inHtml =
        "<div class='servicepages_noitem_2Line' " + topStyle + ">" +
        "<div class='servicepages_noitem_circle'>" +
        "<img src='" + imagePath + "' alt='' />" +
        "</div>" +
        "<div class='servicepages_noitem_text'>" +
        text1 +
        "</div>" +
        "<div class='servicepages_noitem_text' style='margin-top: 0px'>" +
        text2 +
        "</div>" +
        "</div>";
    document.getElementById(pageId).innerHTML = inHtml;
}

/** 
 * Draw a page with loading icon.
 * @param {string} parentId - The page to be drawn.
 * @param {string} type - The service type.
 */
function drawLoadingPage(parentId, type) {
    drawLoadingCard(parentId, type);
    $(".servicecards_unloaded_bg").css("background-color", "white")
}

function drawLoadingCard(parentId, type) {
    // 서버로부터 카드정보를 load 하기 전 화면 표시
    var inHtml = "";
    if (type === "noti") {
        inHtml =
            "<div class='servicecards_unloaded' style='height:92px'>" +
            "	<div class='servicecards_unloaded_content'>" +
            "		<div class='servicecards_unloaded_bg'>" +
            "			<div class='servicecards_unloaded_mask_noti'>" +
            "				<div class='servicecards_unloaded_gradient'></div>" +
            "			</div>" +
            "		</div>" +
            "	</div>" +
            "</div>";
    } else if (type === "energy") {
        inHtml =
            "<div class='servicecards_unloaded' style='height:311px'>" +
            "	<div class='servicecards_unloaded_content'>" +
            "		<div class='servicecards_unloaded_mask_energy_text'>" +
            "			<div class='servicecards_unloaded_gradient'></div>" +
            "		</div>" +
            "		<div class='servicecards_unloaded_bg' style='width:calc(100% - 48px);margin:0px 12px 0px 12px;'>" +
            "			<div class='servicecards_unloaded_mask_energy_legend'>" +
            "				<div class='servicecards_unloaded_gradient'></div>" +
            "			</div>" +
            "			<div class='servicecards_unloaded_mask_energy_graph'>" +
            "				<div class='servicecards_unloaded_gradient'></div>" +
            "			</div>" +
            "		</div>" +
            //"		<img class='servicecards_unloaded_icon' src='img/delivery_icon.gif' style='width: 57.5px; height: 33px;'/>" +
            "	</div>" +
            "</div>";
    } else if (type === "admin") {
        inHtml =
            "<div class='servicecards_unloaded' style='height:460px;'>" +
            "<div class='servicecards_title_text'>" +
            $.lang[lang].ADMIN_TAB +
            "</div>" +
            "	<div class='servicecards_unloaded_content' style='padding:0px 12px 0px 12px'>" +
            "   <div class='servicecards_unloaded_mask_admin_title'>" +
            "     <div class='servicecards_unloaded_gradient'></div>" +
            "   </div>" +
            "   <div class='servicecards_unloaded_mask_admin_text'>" +
            "     <div class='servicecards_unloaded_gradient'></div>" +
            "		</div>" +
            "		<div class='servicecards_unloaded_bg' style='margin-bottom: 6px'>" +
            "			<div class='servicecards_unloaded_mask_others'>" +
            "				<div class='servicecards_unloaded_gradient'></div>" +
            "			</div>" +
            "		</div>" +
            "		<div class='servicecards_unloaded_bg' style='margin-bottom: 6px'>" +
            "			<div class='servicecards_unloaded_mask_others'>" +
            "				<div class='servicecards_unloaded_gradient'></div>" +
            "			</div>" +
            "		</div>" +
            "		<div class='servicecards_unloaded_bg'>" +
            "			<div class='servicecards_unloaded_mask_others'>" +
            "				<div class='servicecards_unloaded_gradient'></div>" +
            "			</div>" +
            "		</div>" +
            //"		<img class='servicecards_unloaded_icon' src='img/delivery_icon.gif' style='width: 57.5px; height: 33px;'/>" +
            "	</div>" +
            "</div>";
    } else if (type === "cctv") {
        inHtml =
            "<div class='servicecards_unloaded' style='height:288px;'>" +
            "<div class='servicecards_title_text'>" +
            $.lang[lang].CCTV_SERVICE +
            "</div>" +
            "	<div class='servicecards_unloaded_content'>" +
            "   <div class='servicecards_unloaded_mask_cctv_title'>" +
            "     <div class='servicecards_unloaded_gradient'></div>" +
            "   </div>" +
            "   <div class='servicecards_unloaded_mask_cctv'>" +
            "     <div class='servicecards_unloaded_gradient'></div>" +
            "		</div>" +
            //"		<img class='servicecards_unloaded_icon' src='img/delivery_icon.gif' style='width: 57.5px; height: 33px;'/>" +
            "	</div>" +
            "</div>";
    }else if (type === "others") {
        inHtml =
            "<div class='servicecards_unloaded' style='height:216px'>" +
            "	<div class='servicecards_unloaded_content'>" +
            "		<div class='servicecards_unloaded_bg' style='margin-bottom: 6px'>" +
            "			<div class='servicecards_unloaded_mask_others'>" +
            "				<div class='servicecards_unloaded_gradient'></div>" +
            "			</div>" +
            "		</div>" +
            "		<div class='servicecards_unloaded_bg' style='margin-bottom: 6px'>" +
            "			<div class='servicecards_unloaded_mask_others'>" +
            "				<div class='servicecards_unloaded_gradient'></div>" +
            "			</div>" +
            "		</div>" +
            "		<div class='servicecards_unloaded_bg'>" +
            "			<div class='servicecards_unloaded_mask_others'>" +
            "				<div class='servicecards_unloaded_gradient'></div>" +
            "			</div>" +
            "		</div>" +
            //"		<img class='servicecards_unloaded_icon' src='img/delivery_icon.gif' style='width: 57.5px; height: 33px;'/>" +
            "	</div>" +
            "</div>";
    } else if (type === "parking_page") {
        inHtml =
            "<div class='servicecards_unloaded' style='height:133px; border-radius: 20px;'>" +
            "	<div class='servicecards_unloaded_content'>" +
            "		<div class='servicecards_unloaded_bg' style='margin-bottom: -1px'>" +
            "			<div class='servicecards_unloaded_mask_others'>" +
            "				<div class='servicecards_unloaded_gradient'></div>" +
            "			</div>" +
            "		</div>" +
            "   <div class='detail_page_divider'></div>" +
            "		<div class='servicecards_unloaded_bg' style='margin-bottom: -1px'>" +
            "			<div class='servicecards_unloaded_mask_others'>" +
            "				<div class='servicecards_unloaded_gradient'></div>" +
            "			</div>" +
            "		</div>" +
            "	</div>" +
            "</div>";
    }

    // setTimeout(() => { 
    //   $('#' + parentId).find('.servicecards_unloaded_gradient').hide();
    //   $('#' + parentId).find('.servicecards_unloaded_icon').show();
    // }, 3000);

    document.getElementById(parentId).innerHTML = inHtml;
}

/** 
 * Draw a card to display the screen before loading the card information from the server.
 * @param {string} parentId - The page to be drawn.
 * @param {string} type - The service type.
 * @param {object} retryHandler - The function handler to be retried.
 */
function drawReloadCard(parentId, type, retryHandler) {
    // 서버로부터 카드정보를 load 하기 전 화면 표시
    var onclick = (retryHandler) ? "onclick='event.stopPropagation(); " + retryHandler.name + "();'" : "";

    var style;
    if (type === "noti") {
        style = "style='height: 92px'";
    } else if (type === "energy") {
        style = "style='height: 311px'";
    } else if (type === "others") {
        style = "style='height: 216px'";
    } else if (type === "parking_page") {
        style = "style='height: 133px'";
    } else if (type === "admin") {
        style = "style='height: 457px'";
    }

    document.getElementById(parentId).innerHTML =
        "<div class='servicecards_unloaded' " + style + ">" +
        "  <div class='servicecards_reload'>" +
        "    <img class='servicecards_reload_icon' src='res/img/home_loading_refresh.png' " + onclick + "/>" +
        "    <div class='servicecards_reload_text' >" + $.lang[lang].CONNECTION_ERROR + "</div>" +
        "  </div>" +
        "</div>";
}

/** 
 * Append new page.
 * @param {string} parent - The page to be drawn.
 * @param {string} id - The element id.
 * @param {string} style - The service type.
 * @param {string} type - The tag name to create element.
 */
function appendNewPage(parent, id, style, type) {
    var ele = document.getElementById(id);
    if (ele === null) {
        if (type) ele = document.createElement(type);
        else ele = document.createElement('div');

        if (id) ele.id = id;
        if (style) ele.className = style;

        if (typeof (parent) === 'object') parent.appendChild(ele);
        else if (typeof (parent) === 'string') document.getElementById(parent).appendChild(ele);
    }
    return ele;
}
