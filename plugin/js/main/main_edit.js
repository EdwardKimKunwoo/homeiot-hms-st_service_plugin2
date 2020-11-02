/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Favorite menu to reorder card sequence, add and remove card.
 * @module main/edit
 */

var editSelf;
var lockBackAction = false;

/** The cancel state of edit action
 * @constant {string} */
const EDIT_ACTION_CANCEL = "edit_cancel";
/** The OK state of edit action
 * @constant {string} */
const EDIT_ACTION_OK = "edit_ok";

/**
 * Create a EditPage.
 * @constructor
 */
function MainScreenEditPage() {
  editSelf = this;
}

MainScreenEditPage.prototype = {
  /** The number of sortable card.
   * @type {number}
   * @instance
   */
  numOfSortable: 0,
  /** Get title of page.
   * @return {string}
   */
  getPageTitleText: function () {
    return $.lang[lang].MAINEDIT;
  },
  /** The state of edit action.
   * cancel : 0
   * ok : 1
   * @type {string}
   * @instance
   */
  editAction : EDIT_ACTION_CANCEL, /* 0 Cancel, 1 OK */
  /** Execute view of page. */
  onViewPage: function () {
    return loadedMainScreenEditPage();
  },
}

var bEditPageFirstLoaded = false;
var lockBackAction = false;

/** Load edit page */
function loadedMainScreenEditPage() {
  if (isFHub()) {
    scplugin.manager.setFlag("openAdditionalPage");
  }

  drawActionBar(false);

  if (!bEditPageFirstLoaded) initEditPage(serviceList);
  window.touchPunchDelay = 0;

  setActionBarMenu("hidden");

  //firstAndLast($('#edit_page_sortableDiv'));
  loadServiceCard();
  drawEditPageBar();
  drawFavoriteCheckBox();

}

var lockSortableCards = false;

/** Initiate edit page */
function initEditPage(services) {
  document.addEventListener('visibilitychange', function(e) {
    $('#edit_page_sortableDiv').sortable('cancel');
    e.stopPropagation();
  });

  var drawHtml = "<div id='mainScreenEditlist'></div>"
  document.getElementById('mainEditPage').innerHTML = drawHtml;
  $('#mainEditPage').disableSelection();

  document.getElementById('mainScreenEditlist').innerHTML = "";

  drawHtml = "<form name='card_favorites'><div id='edit_page_sortableDiv' class='basic_list_box'>";
  var numSortable=1;
  for (let i = 0; i < services.length; i++) {
    if (services[i].enabled === true) {
      for (let j = 0; j < services[i].service.cardInfo.numServiceCard; j++) {
        drawHtml +=
          "<div id='edit_page_sortableDiv_" + numSortable + "' class='edit_page_servicecards'>" +
            "<div id='edit_page_bar_" + numSortable + "'class='basic_list_checkbox_bar' style='margin-left:58px;margin-right:46px'></div>" +
            "<div class='basic_list_item_box_single_line_with_icon'>" +
              "<div class='basic_checkbox_box' style='height:52.25px;line-height:52.25px;margin-left:-14p;margin-right:16px'>" +
                "<label>"+
                  "<input class='favorite_checkbox' type='checkbox' name='card_enabled' value='cardorder_" + numSortable + "' checked='true'>" +
                  "<div id='edit_page_sortableImg_" + numSortable + "' class='basic_checkbox_img' alt='"+ $.lang[lang].V_CHECK_BTN + "'>"+
                    document.loadedSVG.sem_checkedtextview_check_to_on_mtrl_000 +
                  "</div>" +
                "</label>" +
              "</div>" +
              "<div class='basic_list_icon_single_line' style='vertical-align: middle' width='40px' height='40px'>" +
               services[i].service.getIconSVG +
              "</div>" +
              "<div class='basic_reorder_div_single_line' style='margin-left:-10px;'>" +
                "<img src='res/img/ic_edit_move.png' width='20px' height='20px' usemap='#menuMoveMap' alt='"+ $.lang[lang].V_MOVE_BTN + "'/>" +
              "</div>" +
              "<div>" +
                "<div class='basic_list_main_text_single_line_normal'>" +
                  services[i].service.getFavoriteCardText(j) +
                "</div>" +
              "</div>" +
            "</div>" +
          "</div>";
        numSortable++;
      }
    }
  }
  drawHtml += "</div></form>";
  drawHtml += "<div id='edit_fixed_menu' class='serviceicons_page'></div>"
  document.getElementById('mainScreenEditlist').innerHTML = drawHtml;

  drawEditButtonOfEditMode();
  bEditPageFirstLoaded = true;

  editSelf.numOfSortable = numSortable - 1;
  $("#edit_page_sortableDiv").sortable({
    axis: 'y',
    delay: 300,
    scroll: true,
    //containment: 'parent'
  });

  let sortableElements = document.getElementsByClassName('edit_page_servicecards');
  for (var i = 0; i < sortableElements.length; i++) {
    sortableElements[i].addEventListener('touchstart', (e) => {
      lockSortableCards = true;
    }, {passive: true});
    sortableElements[i].addEventListener('touchend', (e) => {
      lockSortableCards = false;
    }, {passive: true});
    sortableElements[i].addEventListener('touchcancel', (e) => {
      lockSortableCards = false;
    }, {passive: true});
    sortableElements[i].addEventListener('click', (e) => {
      e.preventDefault();
      let checkBox = e.currentTarget.querySelector('.favorite_checkbox');
      checkBox.checked = (checkBox.checked) ? false : true;
      drawFavoriteCheckBox(checkBox);
    });
  }
}

/** Draw favorite checkbox */
function drawFavoriteCheckBox(e) {
  var tmpCheckBox = $(".favorite_checkbox");
  var bAllCheckOut = true;

  for (let i = 0; i < tmpCheckBox.length; i++) {
    if(tmpCheckBox[i].checked) bAllCheckOut = false;
  }
  if(bAllCheckOut) {
    showToast($.lang[lang].FAVORITE_NO_CASE);
    //console.log("Error!!!!");
    e.checked = true;
    return;
  }

  for (let i = 0; i < tmpCheckBox.length; i++) {
    var tmpSortable = "edit_page_sortableDiv_" + tmpCheckBox[i].value.substring(10);
    var tmpSortableImg = "edit_page_sortableImg_" + tmpCheckBox[i].value.substring(10);
    document.getElementById(tmpSortable).style.backgroundColor = (tmpCheckBox[i].checked) ? "var(--brand-color-8pro)" : "rgba(252,252,252,1.0)"; // --brand-color-8pro : brandcolor * 8%
    document.getElementById(tmpSortableImg).innerHTML = (tmpCheckBox[i].checked) ? document.loadedSVG.sem_checkedtextview_check_to_on_mtrl_026 : document.loadedSVG.sem_checkedtextview_check_to_on_mtrl_000;
  }
}

/** Draw bar on edit page */
function drawEditPageBar() {

  let sortablediv = document.getElementById("edit_page_sortableDiv");
  var tmpOrder = $(sortablediv).sortable("serialize");
  var orderArray = tmpOrder.substring(24).split("&edit_page_sortableDiv[]=");
  var tmpItemIndex = orderArray[0];

  for (let i = 1; i < editSelf.numOfSortable + 1; i++) {
    if (i === parseInt(tmpItemIndex)) {
      $("#edit_page_bar_" + i).css("visibility", "hidden")
    } else {
      $("#edit_page_bar_" + i).css("visibility", "visible")
    }
  }
}

/** Clear bar on edit page */
function clearEditPageBar() {
  for (let i = 1; i < editSelf.numOfSortable + 1; i++) {
    $("#edit_page_bar_" + i).css("visibility", "hidden")
  }
}

/** Draw edit button for edit mode*/
function drawEditButtonOfEditMode() {
  var innerText =
    "<div id='edit_fixed_menu_cancel' class='btn-edit' ontouchstart='event.cancelBubble=true;cancelServiceCardData(event)'>" + $.lang[lang].CANCEL_BUTTON + " </div>" +
    "<div id='edit_fixed_menu_save' class='btn-edit' ontouchstart='event.cancelBubble=true;saveServiceCardData(undefined,undefined,event)'>" + $.lang[lang].SAVE_BUTTON + " </div>";

  document.getElementById("edit_fixed_menu").innerHTML = innerText;
}



/** event function when cancel button is checked */
function cancelServiceCardData(e) {
  if (lockSortableCards || lockBackAction) return;
  lockBackAction = true;

  let config = {};
  config.type = 'rippleC';
  config.cb = () => { backAction(); };
  config.cancelCb = () => { lockBackAction = false; };
  rippleManager.set(e, config);
}


var serviceCardDefaultNodes = null;
var serviceCardDefaultLength = null;

/** Load card */
function loadServiceCard() {
  if (serviceCardDefaultNodes === null) {
    serviceCardDefaultNodes = $("#edit_page_sortableDiv").children();
    serviceCardDefaultLength = serviceCardDefaultNodes.length;
    //    console.log(serviceCardDefaultNodes);
  }
  //  console.log("loadServiceCard",mainscreenPage.serviceCardOrder);
  drawServiceCardOrder();
  drawServiceCardChecked();

  lockBackAction = false;
}

/** Draw order of card */
function drawServiceCardOrder() {

  if (mainscreenPage.serviceCardOrder !== null) {

    //    var order_array = mainscreenPage.serviceCardOrder.substring(24).split("&edit_page_sortableDiv[]=");
    var orderArray = getServiceCardOrderArray();
    // console.log("edit order : ",orderArray);
    var $uls = $("#edit_page_sortableDiv");

    for (let i = 0; i < orderArray.length; i++) {
      var sortableIndex = orderArray[i];
      //      console.log("editSortableIndex",sortableIndex);
      //      console.log(serviceCardDefaultNodes.get(sortableIndex-1));
      $uls.append(serviceCardDefaultNodes.get(sortableIndex - 1));
    }
  }
  else {
    initServiceCard();
  }

}

/** Draw checkbox on card */
function drawServiceCardChecked() {
  if (mainscreenPage.serviceCardOrder !== null) {
    var enabledArray = getServiceCardEnabledArray();
    for (let i = 0; i < card_favorites.card_enabled.length; i++) {
      if (enabledArray[i] === "1") card_favorites.card_enabled[i].checked = true;
      else card_favorites.card_enabled[i].checked = false;
    }
  } else {
    initServiceCardChecked();
  }
}

/** Initiate card */
function initServiceCard() {
  mainscreenPage.serviceCardOrder = null;
  var sortableDiv = $("#edit_page_sortableDiv");
  if(!serviceCardDefaultNodes){
    console.log("ERROR : serviceCardDefaultNodes is null");
    return;
  }

  for (let i = (serviceCardDefaultNodes.length - 1); i >= 0; i--) {
    // index is zero-based to you have to remove one from the values in your array
    sortableDiv.prepend(serviceCardDefaultNodes.get(i));
  }
  initMainServiceCard();
  initServiceCardChecked();
}

/** Initiate checkbox state of card */
function initServiceCardChecked() {
  for (let i = 0; i < card_favorites.card_enabled.length; i++) {
    card_favorites.card_enabled[i].checked = true;
  }
}

/** Save data on edit page */
function saveDataByEditPage() {
  // example : "order_3#4#1#5#2&&enable_1#1#1#1#1"
  // var example = "edit_page_sortableDiv[]=3&edit_page_sortableDiv[]=4&edit_page_sortableDiv[]=1&edit_page_sortableDiv[]=5&edit_page_sortableDiv[]=2@@@enable_#1#1#1#1#1";

  let sortablediv = document.getElementById("edit_page_sortableDiv");
  var tmpOrder = $(sortablediv).sortable("serialize");

  //  console.log(sortablediv);

  // update cardInfo of Service
  var orderArray = tmpOrder.substring(24).split("&edit_page_sortableDiv[]=");
  for (let i = 0; i < orderArray.length; i++) setServiceCardOrderByinitCardOrder(orderArray[i], i + 1);

  // save checkbox status
  var tmpChecked = "@@@enable_";
  for (let i = 0; i < card_favorites.card_enabled.length; i++) {
    //console.log(serviceList[i].service.getPageTitleText());
    if (card_favorites.card_enabled[i].checked === true) {
      tmpChecked += "#1";
      setServiceCardEnabledByCardOrder(i + 1, true);
    } else {
      tmpChecked += "#0";
      setServiceCardEnabledByCardOrder(i + 1, false);
    }
  }

  var retValueString = tmpOrder + tmpChecked;
  //  console.log(tmpValue);
  return retValueString;
}

/** Check if it is no card case */
function checkNoCardCase(string) {
  var tmpChecked = 0;

  if (!string) {
    //console.log("!!!!!!!");
    for(let i=0, max=card_favorites.card_enabled.length; i < max; i++) {
      if(card_favorites.card_enabled[i].checked === true) {
        tmpChecked += 1;
      }
    }
  } else {
    // console.log("@@@@@@@");
    var array = getServiceCardEnabledArray(string)
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "1") {
        tmpChecked += 1;
      }
    }
  }

  if (tmpChecked > 0) {
    return false;
  }

  //console.log("checkNoCardCase()");
  return true;
}

/** Save card data */
function saveServiceCardData(saveString, type, e) {
  console.log('saveString: ' + saveString);

  if (lockSortableCards || lockBackAction) return;
  lockBackAction = true;

  if (checkNoCardCase(saveString)) {
    showToast($.lang[lang].FAVORITE_NO_CASE);
    return;
  }

  // draw card
  let config = {};
  config.type = 'rippleC';
  config.cb = () => {
    if (saveString === undefined) {
      mainscreenPage.serviceCardOrder = saveDataByEditPage();
    } else {
      mainscreenPage.serviceCardOrder = saveString;
    }

    //  console.log("saveServiceCardData",mainscreenPage.serviceCardOrder);
    if (isWindows()) {
      localStorage.setItem('ServiceCardsSorted', mainscreenPage.serviceCardOrder);
    }
    else {
      scplugin.manager.setPluginData(pluginService.serviceHandle, serviceCardDataKey, mainscreenPage.serviceCardOrder);
    }

    loadMainServiceCard();
    for (let i = 0; i < serviceList.length; i++) {
      if (serviceList[i].enabled === true) {
        serviceList[i].service.drawCard();
      }
    }

    if (type) {
      if (type === "ADDED") {
        showToast($.lang[lang].FAVORITE_ADDED);
      } else {
        showToast($.lang[lang].FAVORITE_REMOVED);
      }
    } else {
      editSelf.editAction = EDIT_ACTION_OK;
      backAction();
    }
  };
  config.cancelCb = () => { lockBackAction = false; };
  rippleManager.set(e, config);
}

/** Add card on favorite card list */
function addServiceFavoriteCard(e) {
  var cardinfo = e.currentTarget.myParam;
  // console.log("add ServiceCard ",cardinfo.initCardOrder);

  if (mainscreenPage.serviceCardOrder !== null) {
    var tmpData = mainscreenPage.serviceCardOrder.split("@@@");
    var saveString = tmpData[0] + "@@@" + "enable_";
    var enabledArray = getServiceCardEnabledArray();
    var orderArray = getServiceCardOrderArray();
    //    console.log("FFFFFF ",orderArray);
    for (let i = 0; i < enabledArray.length; i++) {
      if (cardinfo.initCardOrder === parseInt(orderArray[i])) saveString += "#1";
      else saveString += ("#" + enabledArray[i]);
    }
    // console.log("add return value = ",saveString);
    saveServiceCardData(saveString, "ADDED");
    var service = getServiceByInitCardOrder(cardinfo.initCardOrder);
    service.createOptionMenu();
  } else {
    console.log("Aleady Added the service");
  }
}

/** Add default card order */
function defaultFavoriteCardOrderString() {
  let sortablediv = document.getElementById("sortableDiv");
  var tmpOrder = $(sortablediv).sortable("serialize");
  var orderArray = tmpOrder.substring(14).split("&sortableDiv[]=");
  // console.log(orderArray);
  var regex = /sortableDiv/gi;
  tmpOrder = tmpOrder.replace(regex, "edit_page_sortableDiv");

  var tmpChecked = "@@@enable_";
  for (let i = 0; i < orderArray.length; i++) {
    tmpChecked += "#1";
  }

  var retValueString = tmpOrder + tmpChecked;
  //  console.log(tmpValue);
  return retValueString;
}

/** Remove card on favorite card list */
function removeServiceFavoriteCard(e) {
  var cardinfo = e.currentTarget.myParam;
  // console.log("remove ServiceCard ",cardinfo.initCardOrder);
  if (mainscreenPage.serviceCardOrder === null) { /* to check */
    mainscreenPage.serviceCardOrder = defaultFavoriteCardOrderString();
  }

  var tmpData = mainscreenPage.serviceCardOrder.split("@@@");
  var saveString = tmpData[0] + "@@@" + "enable_";
  var enabledArray = getServiceCardEnabledArray();
  var orderArray = getServiceCardOrderArray();
  // console.log("FFFFFF ",orderArray);
  for (let i = 0; i < enabledArray.length; i++) {
    if (cardinfo.initCardOrder === parseInt(orderArray[i])) saveString += "#0";
    else saveString += ("#" + enabledArray[i]);
  }

  // console.log("remove return value = ",saveString);
  saveServiceCardData(saveString, "REMOVED");
  var service = getServiceByInitCardOrder(cardinfo.initCardOrder);
  service.createOptionMenu();

}

/** Check whether the service is checked */
function isCheckedService(cardinfo) {
  // console.log("check ServiceCard ",cardinfo.initCardOrder);

  if (mainscreenPage.serviceCardOrder !== null) {
    var tmpData = mainscreenPage.serviceCardOrder.split("@@@");
    var saveString = tmpData[0] + "@@@" + "enable_";
    var enabledArray = getServiceCardEnabledArray();
    var orderArray = getServiceCardOrderArray();
    for (let i = 0; i < enabledArray.length; i++) {
      if (cardinfo.initCardOrder === parseInt(orderArray[i])) {
        return parseInt(enabledArray[i]);
      }
    }
  }

  return TRUE;
}


function firstAndLast(container) {
  if (!container) return;

  container.find('button:disabled').prop('disabled', false);
  container.find('button.btn-move-up:first').prop('disabled', true);
  container.find('button.btn-move-down:last').prop('disabled', true);
}

/** remove card on favorite list */
function removeServiceOrderData(){
  if (isWindows()) {
    window.localStorage.removeItem("ServiceCardsSorted");
  } else {
    scplugin.manager.deletePluginData(pluginService.serviceHandle, serviceCardDataKey);
  }
}
/** reset card order */
function resetServiceCard() {
  removeServiceOrderData();
  initServiceCard();
  resetServiceCardInfo();
}


HTMLElement.prototype.closestByClass = function (className, button) {
  var target = button;
  while (!target.parentElement.classList.contains(className)) {
    target = target.parentElement;
    if (target.parentElement === null) {
      throw new Error('Not found.');
    }
  }
  return target.parentElement;
};

/** move to up/down on card order */
function cardUpDown(e, button) {
  e.preventDefault();
  var sortable_class = button.closestByClass('sortable_style', button);
  //        var sortable_class = document.getElementById("sortableDiv_1");
  //    console.log(sortable_class.id);
  var parent = $(sortable_class).closest('div');
  var grandparent = $(button).closest('.servicecards_page');

  if ($(button).hasClass('btn-move-up')) {
    //        console.log("up");
    parent.insertBefore(parent.prev('div'));
    firstAndLast(grandparent);
  }
  else if ($(button).hasClass('btn-move-down')) {
    //        console.log("down");
    parent.insertAfter(parent.next('div'));
    firstAndLast(grandparent);
  }
  //    console.log("end");
};

/** remove card */
function cardRemove(e, button) {
  e.preventDefault();
  var sortable_class = button.closestByClass('sortable_style', button);
  var grandparent = $(button).closest('.servicecards_page');
  var x;
  //  console.log("remove");
  x = $(sortable_class).detach();
  //  console.log(x);
  firstAndLast(grandparent);
}

/** get card order list */
function getServiceCardOrderArray(string) {
  var tmpString = mainscreenPage.serviceCardOrder;
  if (string) tmpString = string;
  if (tmpString) {

    var tmpData = tmpString.split("@@@");
    //    console.log(tmpData);

    var orderArray = tmpData[0].substring(24).split("&edit_page_sortableDiv[]=");
    var enableArray = tmpData[1].substring(8).split("#");

    //    console.log("get : "+ orderArray);
    //    console.log("get : "+ enableArray);

    return orderArray;
  } else {
    return null;
  }
}

/** get enabled card list */
function getServiceCardEnabledArray(string) {
  var tmpString = mainscreenPage.serviceCardOrder;
  if (string) tmpString = string;
  if (tmpString) {

    var tmpData = tmpString.split("@@@");
    //    console.log(tmpData);

    var orderArray = tmpData[0].substring(24).split("&edit_page_sortableDiv[]=");
    var enableArray = tmpData[1].substring(8).split("#");

    //    console.log("get : "+ orderArray);
    //    console.log("get : "+ enableArray);

    return enableArray;
  } else {
    return null;
  }
}


/*
 * main screen sotable with jquery.ui.touch-punch.js & jquery.ui.touch-punch.js
 */
/*
touchPunchDelay=800; // hold Delay
function findElement (event, classname) {
  var tmpElement = event.target;
  // console.log("service:" + classname + "  current:" + tmpElement.className);
  if(tmpElement.className==classname) {
    // console.log("Find1");
    return tmpElement;
  }
  else {
    while(1) {
      // console.log("current:" + tmpElement.className);
      tmpElement = tmpElement.parentElement;
      if(tmpElement) {
        if(tmpElement.className==classname) {
          // console.log("Find2");
          return tmpElement;
        }
      } else {
        // console.log("none");
        return null;
      }
    }
  }
}
*/
/*
$( function() {
  $( "#edit_page_sortableDiv" ).sortable({ delay: 300, scroll: true, });
  $( "#edit_page_sortableDiv" ).on("sortupdate",function( event, ui ) {
    var sorted = $( editSelf ).sortable( "serialize");
  	//console.log("set "+sorted);
    localStorage.setItem('ServiceCardsSorted', sorted) ;
});


var prevWidth,prevHeight;
$( "#edit_page_sortableDiv" ).on("mousedown mouseup",function( event, ui ) {
  var serviceCards;
  bCancleSnapScrollEvent = true;
  //event.preventDefault();

  var tmpElement = findElement(event,"edit_page_servicecards");
  // To do

    if(event.type == "mousedown"){
      console.log("mousedown " + tmpElement.id + " pixel " + tmpElement.style.width);
      serviceCards = document.getElementsByClassName("servicecards motion_card");
      for(let i=0 ; i < serviceCards.length; i++)
      {
        prevWidth[i] = serviceCards[i].style.width;
        prevHeight[i] = serviceCards[i].style.height;
        serviceCards[i].style.width="330px"
        serviceCards[i].style.height="45px"
      }
      prevWidth = tmpElement.style.width; prevHeight = tmpElement.style.height;
      tmpElement.style.width = "340px"; tmpElement.style.height = "45px";
    }
    else
    {
      // console.log("mouseup " + editSelf.widgetName);
      tmpElement.style.width = prevWidth; tmpElement.style.height = prevHeight;
    }

});
*/

/*
  if(localStorage.getItem("ServiceCardsSorted") !== null){
  	var arrValuesForOrder = localStorage.getItem('ServiceCardsSorted').substring(14).split("&edit_page_sortableDiv[]=");
  	var $ul = $("#edit_page_sortableDiv");
    $items = $("#edit_page_sortableDiv").children();
    // console.log("get "+arrValuesForOrder);
    // loop backwards so you can just prepend elements in the list
    // instead of trying to place them at a specific position
    for (let i = arrValuesForOrder[arrValuesForOrder.length - 1]; i >= 0; i--) {
        // index is zero-based to you have to remove one from the values in your array
        $ul.prepend( $items.get((arrValuesForOrder[i] - 1)));
    }
  }
  else {
    // console.log("Not Sorted");
  }

  $( "#edit_page_sortableDiv" ).disableSelection();
  $("#clear").click(function(){
  	window.localStorage.removeItem("ServiceCardsSorted");
  });
} );
*/


/**
 * auto scroll with jquery.snapScroll.js
 */
/*
$(document).ready(function () {
  $('#homeScreen').snapScroll ({
    arrowKeys: true,
    duration: 1000,
    easing: 'linear',
    scrollBar: false,
    onLeave: function (currentPoint, nextPoint) {
      // console.log('Leaving point ' + currentPoint + ', going to point ' + nextPoint + '.')
    },
    onArrive: function (prevPoint, currentPoint) {
      // console.log("I've arrived!")
    },
    topMargin: 48 ,//pexel
  })
})
*/
