/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Actionbar to draw action bar.
 * @module main/actionbar
 */

var isBasicDropDownOpened = false;

/** Draw actionbar */
function drawActionBar(flag, title) {
  var initHtml = "";
  var actionBarText = (title !== undefined) ? title : serviceMain.pageTitle;
  var svgBackText = document.loadedSVG.back_icon.replace("BACK_ICON_TITLE", $.lang[lang].V_BACK_BTN);
  var svgMoreText = document.loadedSVG.more_icon.replace("MORE_ICON_TITLE",  $.lang[lang].V_MORE_BTN);

  if(flag) { // main page
    initHtml +=
     "<div id='actionBarBackButton'>"+
       svgBackText + "</div>"+
        "<div id='actionBarWrapper'> \
          <div id='actionBarTitle' class='action_bar_text'> \
            <div id='actionBar_loading_img' style='display: none;'><img class='loading' style='height: 24px; margin: 12px' src='res/img/circle.png' /></div> \
            " + actionBarText + " \
          </div>\
        </div>\
        <div id='actionBarMenu' > \
          <div id='iconMenuBox'>" +
          svgMoreText  +
          "</div> \
          <ul id='actionBarMenuContent' \
          </ul> \
        </div> \
      </div>";
/* <div class='basic_dimmer_left'></div> \ <div class='basic_dimmer_right'></div> \ */

    var actionBarElement = document.getElementById('actionBar');
    actionBarElement.innerHTML = initHtml;
    actionBarElement.style.backgroundColor = "var(--gradation-top-color)";

    document.getElementById('iconMenuBox').addEventListener('touchstart', menuAction, {passive: true});

    var backIcon = document.getElementById('iconBack');
    backIcon.style.width = '100%';
    backIcon.style.height = 'auto';

    setSvgColor(document.getElementById('iOS/IC/Appbar/Back_Black'), '#FAFAFA');


    var moreIcon = document.getElementById('more_menu');
    moreIcon.style.width = '24px';
    moreIcon.style.height = '24px';

    if (actionBarText === "") {
      document.getElementById("actionBar_loading_img").style.display = "flex";
    }

    // var actionbarWidth = $("#actionBar").width();
    // /* dimmer $("#actionBarTitle").width(actionbarWidth-48-24-20-18-18); */
    // $("#actionBarTitle").width(actionbarWidth-56-24-20);
  } else { //detailed page
    initHtml +=
    "<div id='actionBarBackButton'>"+
      svgBackText + "</div>"+
        "<div id='actionBarWrapper'> \
          <div id='actionBarTitle_detailed' class='action_bar_text'>" + actionBarText + "</div>\
      </div>";

    var actionBarElement = document.getElementById('actionBar');
    actionBarElement.innerHTML = initHtml;
    actionBarElement.style.backgroundColor = '#f2f2f2';

    var backIcon = document.getElementById('iconBack');
    backIcon.style.width = '100%';
    backIcon.style.height = 'auto';
     setSvgColor(document.getElementById('iOS/IC/Appbar/Back_Black'), "var(--gradation-top-color)");
    if(isPlatform.iOS()){
      var menu = document.getElementById('actionBarTitle_detailed');
      menu.classList.add("iOS");
    }
  }

  let button = document.getElementById('actionBarBackButton');
  button.addEventListener('touchstart', (e) => {
    let config = {
      type: 'rippleA',
      cb: (event) => { backAction(event); }
    };
    rippleManager.set(e, config);
  }, {passive: true});
}

/*********** Menu *********/

function addPageMenu(cmd, menuitem, text, cardInfo, func) {

	switch(cmd) {
		case "add" :
			if(isCheckedService(cardInfo) === FALSE) {
				menuitem.push({
					title: getAddMenuText(text),
					parameter: cardInfo,
					fun: addServiceFavoriteCard,
				});
			}
		break;
		case "remove" :
			if(isCheckedService(cardInfo) === TRUE) {
				menuitem.push({
					title: getAddMenuText(text),
					parameter: cardInfo,
					fun: removeServiceFavoriteCard,
				});
			}
		break;
		case "info" :
			menuitem.push({
				title: getAddMenuText(text),
				fun: func
			});
		break;
	}
}

function setMenu(menuArr,service) {
  var menuList = document.getElementById('actionBarMenuContent');
  if (!menuList || menuList.length === menuArr.length) return;

  let config = {};
  clear_child(menuList);
  for (var i = 0; i < menuArr.length; i++) {
    var item = menuArr[i];
    var link = document.createElement("li");
    menuList.appendChild(link);

    link.id = 'link_' + item.title;
    link.innerHTML = item.title;
    if (item.fun !== null)
      link.myParam = item.parameter;

    if (item.href !== null)
      link.href = item.href;

    link.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      config.cb = () => {
        if (serviceMain.currentDivString === SCREEN_MAIN) {
          window.location = e.target.href;
        }
      };
      rippleManager.set(e, config);
    }, {passive: true});
    link.addEventListener('click', (e) => { e.stopPropagation(); }, {capture: false});
  }
}

function clear_child(myNode) {
  if(myNode){
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }
}

function backAction(e) {
  console.debug(PACKAGE, "MAIN", "backAction. current : " + serviceMain.currentDivString);
  if (serviceMain.currentDivString === SCREEN_MAIN && !isPC())
    scplugin.manager.close();
  else
    window.history.back();
}

function menuAction(e, object) {
  let config = {};
  config.type = 'rippleA';
  config.cb = () => {
    var menu = document.getElementById("actionBarMenu");
    menu.classList.add("active");

    $("body").one("touchstart", function(e) {
      if ($('#actionBarMenuContent').has(e.target).length) {
        location.href = e.target.href;
      }
      else {
        menuDown();
        menuDownEnd();
      }
    });
  };
  rippleManager.set(e, config);
}

function menuDown() {
  var menu = document.getElementById("actionBarMenu");
  if(menu) {
    menu.addEventListener('animationend', menuDownEnd, false);
    menu.classList.add("hide");
  }
}

function menuDownEnd() {
  var menu = document.getElementById("actionBarMenu");
  if(menu) {
    menu.classList.remove('active');
    menu.classList.remove('hide');
    menu.removeEventListener('animationend', menuDownEnd, false);
  }
}

function BasicDropDownMenu() {}
BasicDropDownMenu.prototype = {
  basicMenuId: "",
  initBasicMenu: function(menu,image,id){
    this.basicMenuId = menu.id+"Menu";
    //console.log("###initBasicMenu",this.basicMenuId);
    return initBasicMenu(menu,image);
  },
  setBasicMenu: function(menuArr, contentId, menuconfig) {
    //console.log("###setBasicMenu",this.basicMenuId,menuconfig);
    return setBasicMenu(menuArr, contentId, this.basicMenuId,menuconfig);
  },
  basicMenuAction: function(e, id) {
    //console.log("###basicMenuAction",this.basicMenuId);
    return basicMenuAction(e, this.basicMenuId);
  },
  basicMenuDownEnd: function() {
    //console.log("###basicMenuDownEnd",this.basicMenuId);
    return basicMenuDownEnd(this.basicMenuId);
  },
  basicMenuReset: function(){
    //console.log("###basicMenuReset",this.basicMenuId);
    return basicMenuReset(this.basicMenuId);
  }
}

var ttt =0;


function callBasicMenuAction(e, id, menuConfig) {
  let config = {
    type: 'rippleC',
    // bg: true,
    cb: () => {
      basicMenuAction(e, id + "Menu",menuConfig);
      $(document).one('touchstart', (e) => {
        e.stopPropagation();
        basicMenuDown(id + "Menu",menuConfig);
      });
    }
  };
  rippleManager.set(e, config);
}

function initBasicMenu(menu,image){
  var id = menu.id;
  var left = ($(window).width()-168)/2;

  //console.log("initBasicMenu_"+id);

  var inHtml =
      "<div id='"+id+"Menu' class='basic_dropdown'>" +
        "<div id='icon"+id+"MenuImage' >" +
          "<img id='" + id + "_iconMenu' class='basic_drop_button_css' src='"+image+"' alt='" + $.lang[lang].V_DROPDOWN_BTN + "'/>" +
        "</div>" +
        "<ul id='"+id+"MenuContent' style='left:" + left + "px'>" +
        "</ul>"+
    "</div>";
  document.getElementById(id).innerHTML = inHtml;

  return id+"MenuContent";
}

var lockMonthPicker = false;

function setBasicMenu(menuArr, contentId, basicMenuId,menuconfig) {

  // console.log("setBasicMenu");

  $("#"+basicMenuId).trigger('animationend');

  var menuList = document.getElementById(contentId);

  let config = {};
  clear_child(menuList);
  for (var i = 0; i < menuArr.length; i++) {
    var item = menuArr[i];
    var element = document.createElement('div');
    element.innerHTML = item.title;
    element.style.display = 'flex';
    element.style.height = '51px';
    element.style.alignItems = 'center';
    element.style.paddingLeft = '24px';
    element.item = item;

    element.addEventListener('touchstart', (e) => {
      isBasicDropDownTouched = true;
      e.stopPropagation();
      var x = e.currentTarget.item;
      config.cb = () => {
        if (lockMonthPicker) return;
        lockMonthPicker = true;

        x.fun(x.parameter.mIndex, x.parameter.suffix);
        basicMenuDown(basicMenuId,menuconfig);
      };
      rippleManager.set(e, config);
    }, {passive: true});
    if(menuList)
      menuList.appendChild(element);
  }
}



function basicMenuAction(e, basicMenuId,menuConfig) {

  // console.log("basicMenuAction",e,basicMenuId);

  isBasicDropDownOpened = true;
  lockMonthPicker = false;
  //console.log(e.target.offsetParent.offsetLeft)

  $("#"+basicMenuId+" ul").css("border","1px #cccccc solid");

  var menu = document.getElementById(basicMenuId);
  menu.classList.add("active");
  // document.addEventListener("click", basicMenuDown, "once");
  // document.addEventListener("touchend", basicMenuDown, "once");

  if(menuConfig) {
    $("#"+menuConfig.parentCardDivId).attr('onclick', '').bind('click');
    $("#"+menuConfig.parentCardDivId).off("click");
  }

}

function basicMenuDown(basicMenuId,menuConfig) {
  //console.log("basicMenuDown",basicMenuId,menuConfig);

  isBasicDropDownOpened = false;
  if(basicMenuId ==="") return;
  if(!$("#"+basicMenuId)[0]) return;


  //document.removeEventListener("click", basicMenuDown, "once");
    document.removeEventListener("touchend",
      function() {
        //console.log("touchend basicMenuDown",basicMenuId);
        basicMenuDownEnd(basicMenuId,menuConfig);
      }, "once");


  var menu = document.getElementById(basicMenuId);
  menu.classList.add("hide");

  $("#"+basicMenuId).one("animationend",
    function(){
      //console.log("add animationend basicMenuDown",basicMenuId,menuConfig);
      basicMenuDownEnd(basicMenuId,menuConfig);
    }
  );
  /* menu.addEventListener('animationend',
    function(){
      //console.log("add animationend basicMenuDown",basicMenuId);
      basicMenuDownEnd(basicMenuId);
    }, false);
  */
}

function basicMenuDownEnd(basicMenuId,menuConfig) {

  //console.log("basicMenuDownEnd",menuConfig)

  var menu = document.getElementById(basicMenuId);
  if (menu === null) return;

  menu.classList.remove('active');
  menu.classList.remove('hide');

  $("#"+basicMenuId+" ul").css("border","0px #cccccc solid");

  if(menuConfig){
    $("#"+menuConfig.parentCardDivId).on("click",function(){
      menuConfig.parentOnClickFunc();
    });
  }
}

function basicMenuReset(basicMenuId) {
  //console.log("basicMenuReset")
  if(basicMenuId ==="") return;
  if(!$("#"+basicMenuId)[0]) return;

  basicMenuDown(basicMenuId);
}
