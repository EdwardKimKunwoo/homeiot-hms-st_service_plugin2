/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Help page to introduce various services.
 * @module main/help
 */

var selfHelpScreen;
var lockHelpPageItem = false;

/** @classdesc HelpScreen to show help page
* @constructor
*/
function HelpScreen() {
  selfHelpScreen = this;
}

HelpScreen.prototype = {
  /** Get title of page.
  * @return {string}
  */
  getPageTitleText: function () {
    return $.lang[lang].HELP_PAGE;
  },
  /** Execute view of page. */
  onViewPage: function () {
    return loadedHelpScreenPage();
  },
  binitPage: false,
  numOfItem: 0,
  numOfGroup: 0,
  /** The data of help information.
   * @type {object}
   * @instance
   */
  helpInformation: {
    bEnable: true,
    title: $.lang[lang].HELP_OPT_TITLE,
    iconUri: "res/img/help_screen/help_ic_status_option.png",
    svgText : document.loadedSVG.help_option,
    list:[
      {
        service_id: SERVICEID_OPTION,
        imageUri: (lang === "ko") ? "res/img/help_screen/help_info_img_option_03.png" : "res/img/help_screen/help_info_img_option_03_eng.png",
        imageSize: { width:"100%", height:"auto" },
        bSubTitle : true,
        subTitle: $.lang[lang].MAINEDIT,
        contentsList: $.lang[lang].HELP_OPT_FAVORITE_DESC
      },
      {
        service_id: SERVICEID_OPTION,
        imageUri: (lang === "ko") ? "res/img/help_screen/help_info_img_option_04.png" : "res/img/help_screen/help_info_img_option_04_eng.png",
        imageSize: { width:"100%", height:"auto" },
        bSubTitle : true,
        iconUri: "res/img/help_screen/help_ic_status_settings.png",
        subTitle: $.lang[lang].ALARM,
        contentsList: $.lang[lang].HELP_OPT_NOTI_DESC
      }
    ]
  }
}

/** Load page */
function loadedHelpScreenPage() {
  if (isFHub()) {
    scplugin.manager.setFlag("openAdditionalPage");
  }

  drawActionBar(false);

  if(!selfHelpScreen.binitPage) {
    initHelpScreen();
    selfHelpScreen.binitPage = true;
  }

  setActionBarMenu("hidden");

//  openHelpContent("hs_item_0",0,600);
  openHelpContent("hs_item_0",0, 1500);

  //loadServiceCard();
  //drawEditPageBar();
  //drawFavoriteCheckBox();

}

function addSubHeader(id, text) {
  var innerHTML =
    "<div class='basic_subheader'>" +
    "	<div class='basic_subheader_text'>" + text + "</div>" +
    "   <div class='basic_subheader_divider'></div>" +
    "</div>" +
    "<div class='clear'></div>";
    document.getElementById(id).innerHTML = innerHTML;
}

/** Initiate help page */
function initHelpScreen() {
  var innerHTML =
    "	<div id = 'apt_service_header'></div>" +
    "	<div id = 'apt_service_list'></div>";
    document.getElementById('helpScreenPage').innerHTML = innerHTML;

    addSubHeader('apt_service_header', $.lang[lang].HELP_APT_SERVICE);
    addAptServiceList('apt_service_list');
}

var helpScreenImageList = [];
var helpScreenImageListCount = 0;
function addHelpScreenImageList(id,imageInfo,parentId){
  var tmpStr = {
    id : id,
    imgWidth : imageInfo.imageSize.width,
    imgHeight : imageInfo.imageSize.height,
    parentId : parentId
  };
  helpScreenImageList[helpScreenImageListCount++] = tmpStr;
}

function resizeHelpScreenImage(parentId){
//  console.log(parentId);
  for(var i = 0; i < helpScreenImageListCount; i++) {
    var tmpHsImgInfo = helpScreenImageList[i];
    if(tmpHsImgInfo.parentId === parentId){
      var pannelWidth = $("#"+tmpHsImgInfo.parentId).width()-36;
      var tmpImage = $("#"+tmpHsImgInfo.id);
//      console.log("!!!!!",pannelWidth);

//      if(pannelWidth > 400) tmpImage.width(400);
//      else tmpImage.width(pannelWidth);
      tmpImage.width(pannelWidth);
      var tmpHeight = tmpImage.width() * tmpHsImgInfo.imgHeight / tmpHsImgInfo.imgWidth;
      tmpImage.height(tmpHeight);
    }
  }
}

/** Relocate help page */
function relocateHelpScreen(){
  var prefix="helpPageItem_"
  for(var i = 0; i < selfHelpScreen.numOfItem; i++) {
    resizeHelpScreenImage(prefix+i)
  }
  resizeMaxHeight();
}

function resizeMaxHeight() {

    /* max-height 변경 */
    let helpEle = document.getElementById('helpScreenPage');
    let panels = helpEle.querySelectorAll('.basic_accordion_panel')
    panels.forEach(panel=>{
        if(panel.offsetHeight !==0 ) /* 열려있다면 */ {
            console.log(panel.style.maxHeight, panel.offsetHeight, panel.scrollHeight)
            panel.style.maxHeight =  panel.scrollHeight+"px";
        }
    })
}

function numHelpServices(helpInfo,serverId){
  var numTemp = 0;
  //console.log(serverId,helpInfo);
  if(!helpInfo) return 0;
  if(helpInfo.bEnable === false) return 0;

  for( var i=0; i < helpInfo.list.length; i++ ) {
    var tmpInfo = helpInfo.list[i];
    if (!tmpInfo) {
      continue;
    }
    if(tmpInfo.service_id !== SERVICEID_OPTION){
      if(!isServicedService(tmpInfo.service_id)) continue;
    }
    numTemp++;
  }
  //console.log("numHelpServices",numTemp);
  return numTemp;
}

/** Add service list
 * @param {string} id - element id
*/
function addAptServiceList(id) {
  var innerHTML =
    "<div class='helpPageGroup basic_list_box'>"+
    "</div>";
  document.getElementById(id).innerHTML = innerHTML;

  var panel_box = "panelBox";
  for(var i=0; i < serviceList.length ; i++) {
    if(serviceList[i].enabled === false) continue;

    if (typeof parkingService !== 'undefined' && serviceList[i].service === parkingService) {
      serviceList[i].service.helpInformation.title = $.lang[lang].PARKING_TAB;
      if (!ParkingLocationEnabled) {
        delete serviceList[i].service.helpInformation.list[0];
      }
      if (!ParkingHistoryEnabled) {
        delete serviceList[i].service.helpInformation.list[1];
      }
    }

    if(numHelpServices(
        serviceList[i].service.helpInformation,
        serviceList[i].serverId) === 0) continue;

    //console.log("1",serviceList[i].serverId);
    if(serviceList[i].service.helpInformation.bEnable) {
      addHelpScreenAccordionItem(
        selfHelpScreen.numOfGroup,
        selfHelpScreen.numOfItem++,
        serviceList[i].service.helpInformation.iconUri,
        serviceList[i].service.helpInformation.title,
        panel_box+i,
        serviceList[i].service.helpInformation.svgText,
        (selfHelpScreen.numOfItem===1)?false:true
      );
      addHelpScreenImageList++;
      drawHelpScreenServicePanel(panel_box+i,
        serviceList[i].service.helpInformation);
    }
  }

  var item = document.getElementById('hs_item_0');
  item.parentElement.style.borderTopLeftRadius = '26px';
  item.parentElement.style.borderTopRightRadius = '26px';
  item.style.borderTopLeftRadius = '26px';
  item.style.borderTopRightRadius = '26px';

  if(selfHelpScreen.helpInformation.bEnable) {
    addHelpScreenAccordionItem(
      selfHelpScreen.numOfGroup,
      selfHelpScreen.numOfItem++,
      selfHelpScreen.helpInformation.iconUri,
      selfHelpScreen.helpInformation.title,
      panel_box+"_option",
      selfHelpScreen.helpInformation.svgText,
      true
    );
    drawHelpScreenServicePanel(panel_box+"_option", selfHelpScreen.helpInformation);

    var option = document.getElementById(panel_box + '_option');
    option.parentElement.style.borderBottomLeftRadius = '26px';
    option.parentElement.style.borderBottomRightRadius = '26px';
  }
  selfHelpScreen.numOfGroup++;
}

/** Draw help page */
function drawHelpScreenServicePanel(panelId, helpInfo) {

  document.getElementById(panelId).innerHTML = "";
  var isheader = 0;
  for( var i=0; i < helpInfo.list.length; i++ ) {
    var tmpInfo = helpInfo.list[i];
    if (!tmpInfo) {
      continue;
    }
    //console.log("2",tmpInfo.service_id);

    if(tmpInfo.service_id !== SERVICEID_OPTION){
      if(!isServicedService(tmpInfo.service_id)) continue;
    }
    var header = "style='margin-top:28px'";
    if(isheader === 0) var header = "";
    isheader++;

    var contnetsHtml = "";
    contnetsHtml += "<div class='hs_panel_text_contents'>" + tmpInfo.contentsList + "</div>";

    var subTitleHtml = "";
    if(tmpInfo.bSubTitle) {
      subTitleHtml =
        "<div class='hs_panel_text_subtitle'>" +
          tmpInfo.subTitle +
        "</div>" +
      "<div class='clear'></div>"
    }

    var innerHtml =
    "<div class='basic_accordion_panel_img' "+header+">" +
      "<image src='" + tmpInfo.imageUri + "' width='"+ tmpInfo.imageSize.width +"' height='" + tmpInfo.imageSize.height + "' alt=''>" +
    "</div>"+
    "<div class='clear' style='margin-top:18px'></div>" +
    "<div class='basic_accordion_panel_box'>" +
      subTitleHtml +
      "<div class='clear' style='margin-top:12px'></div>" +
      contnetsHtml +
      "<div class='clear'></div>" +
    "</div>";
    document.getElementById(panelId).innerHTML += innerHtml;
  }
  document.getElementById(panelId).innerHTML +=
    "<div class='clear' style='margin-bottom:18px;'></div>";
}

/** Add accordion item on help page */
function addHelpScreenAccordionItem(groupIndex, itemIndex, iconUri, title, panelId, svgIcon, bTopBorder) {
	var borderTop = "";
  var innerHTML = "";

  if(bTopBorder === true)
    innerHTML += "<div class='basic_list_default_bar' " + borderTop + "></div>";

  //const txtMaxWidth = $(".helpPageGroup").width() - 36 - 24 - 8;	// 32 : padding 16 * 2, 24 : expandIcon width, 8 : gap between title and icon
  const txtMaxWidth = "";
  innerHTML +=
    "<div id='helpPageItem_"+itemIndex+"' status='close' class='basic_list_item_box_single_line'>" +
    " <div id='hs_item_" + itemIndex + "' hs_item_index='"+itemIndex+"' class='basic_accordion'>" +
    "   <span>" +
    "<div id='help_icon_"+itemIndex+"' style='float:left;padding-top:15px;padding-right:4px;width:26px;height:26px;'>"+svgIcon+"</div>"+
    "   </span>" +
    "		<span style='float:left; width:" + txtMaxWidth + "px;'>" +
    "			<div class='basic_accordion_title'>"+title+"</div>" +
    "		</span>" +
    "		<span id='basic_accordion_icon_" + itemIndex + "' class='basic_accordion_expandIcon_box'>" +
    "			<img class='basic_accordion_expandIcon' src='res/img/home_button_expand_open_dark.png' alt='" + $.lang[lang].V_EXPAND_OPEN_BTN + "'/>" +
    "		</span>" +
    "		<div class='clear'></div>" +
    "	</div>" +
    "	<div id='"+panelId+"' class='basic_accordion_panel'>" +
    "<div class='clear' style='margin-bottom:20px;'></div>" +
    "	</div>" +
    "</div>";
  // 위에서 생성된 helpPageGroup 항목에 추가
  document.getElementsByClassName("helpPageGroup")[groupIndex].innerHTML += innerHTML;
  //  document.getElementById("container").style.setAttribute("-webkit-mask-box-image", "url('masks/"+hour+".png')");

  //var bg = document.getElementById('hs_accordion_icon'+itemIndex);
  //bg.style.webkitMaskImage = 'url('+iconUri+')';

  let itemsList = document.getElementsByClassName('basic_accordion');
  for (var i = 0; i < itemsList.length; i++) {
    itemsList[i].removeEventListener('touchstart', helpPageItemOnClick, {passive: true});
    itemsList[i].addEventListener('touchstart', helpPageItemOnClick, {passive: true});
  }
}

/** event function called when it is clicked */

function helpPageItemOnClick(e) {
  if (lockHelpPageItem) return;
  lockHelpPageItem = true;

  let clickedObj = e.currentTarget;
  config = {};
  config.cb = () => { openHelpContent(clickedObj.id); };
  config.cancelCb = () => { lockHelpPageItem = false; }
  rippleManager.set(e, config);
}

/** Open help content */
function openHelpContent(divId, forcedNum, forcedSize) {

  var index = document.getElementById(divId).getAttribute('hs_item_index');
	var helpPageItem = document.getElementById("helpPageItem_" + index);
	var status = helpPageItem.getAttribute('status');

  if(forcedNum !== undefined) {
    index = forcedNum;
    status = "close";
  }

	// 자신을 제외한 모든 item들을 deactive 및 hide 시킨다.
	for (let i = 0; i < selfHelpScreen.numOfItem; i++) {
		if ((index !== i) && (document.getElementById("helpPageItem_" + i).getAttribute('status') !== 'close')) {
			setHelpItemStatus(i, 'close');
		}
	}
  // TODO : 해당 item이 화면에 보여지지 않는 상황이면, 화면에 보이도록 scroll 한다.
  var panel = document.getElementById(divId).parentElement.children[1];
  if (status === 'close') {
    setHelpItemStatus(index, 'open',forcedSize);
    var tmpfunc = function(event) {
      moveToscrollTopByHSAccordion(panel, "helpScreenPage");
      panel.removeEventListener('transitionend',tmpfunc);
      lockHelpPageItem = false;
    }
    if(forcedNum === undefined)
      panel.addEventListener('transitionend',tmpfunc,false);
  } else {
    // deactive 상태가 됨
    setHelpItemStatus(index, 'close');
    lockHelpPageItem = false;
  }
}

function setHelpItemStatus(index, status,forcedSize) {
	var helpPageItem = document.getElementById("helpPageItem_" + index);
	var accordion = helpPageItem.getElementsByClassName('basic_accordion')[0];
	var expandIcon = helpPageItem.getElementsByClassName('basic_accordion_expandIcon')[0];
	var panel = helpPageItem.getElementsByClassName('basic_accordion_panel')[0];
	var iconElement = document.getElementById("help_icon_" + index);

	helpPageItem.setAttribute('status', status);

	switch (status) {
		case 'loading':
			accordion.classList.add("active");
			expandIcon.classList.add("loading");
      expandIcon.src = "res/img/circle.png";
      expandIcon.alt = '';
			// panel.style.maxHeight = null;
			break;
		case 'open':
      accordion.style.borderBottomLeftRadius = '';
      accordion.style.borderBottomRightRadius = '';
			accordion.classList.add("active");
			expandIcon.classList.remove("loading");
      expandIcon.src = "res/img/home_button_expand_open_dark.png";
      expandIcon.style.transform = 'rotate(180deg)';
      expandIcon.alt = $.lang[lang].V_EXPAND_CLOSE_BTN;

      if(forcedSize) panel.style.maxHeight = forcedSize + "px"
      else panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.opacity = 1;

      resizeHelpScreenImage(helpPageItem.id);
      setSvgColor(iconElement, "var(--brand-color)");
			break;
		case 'close':
		default:
      if (index === selfHelpScreen.numOfItem - 1) {
        accordion.style.borderBottomLeftRadius = '26px';
        accordion.style.borderBottomRightRadius = '26px';
      }
			accordion.classList.remove("active");
			expandIcon.classList.remove("loading");
      expandIcon.src = "res/img/home_button_expand_open_dark.png";
      expandIcon.style.transform = 'rotate(0deg)';
      expandIcon.alt = $.lang[lang].V_EXPAND_OPEN_BTN;
      //panel.style.display = 'none';
      setSvgColor(iconElement, '#000000');
      panel.style.maxHeight = null;
      panel.style.opacity = 0;
      break;
  }
}

/** Set when orientation is changed */
function setHelpOrientationchange() {
  var activeIndex = -1;
  // Find open item
  for (let i = 0; i < selfHelpScreen.numOfItem; i++) {
    if (document.getElementById("helpPageItem_" + i).getAttribute('status') === 'open') {
    activeIndex = i;
    break;
    }
  }
  // change max-height as resoution
  if(activeIndex !== -1) {
    var helpPageItem = document.getElementById("helpPageItem_" + activeIndex);
    var panel = helpPageItem.getElementsByClassName('basic_accordion_panel')[0];
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
}
