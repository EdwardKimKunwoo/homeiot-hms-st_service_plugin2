/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * card animation with jquery.snapScroll.js
 * @module main/motion
 */

var servicecards_delay = 0;

function getNumOfServiceCardOrder(serviceCardId) {
  var orderArray = mainscreenPage.getServiceCardOrderArray();
  //  var stringId = ""+serviceCardId;
  if(orderArray === null) return 0;
  for(var i=0; i<orderArray.length; i++){
    //    console.log(orderArray[i], serviceCardId.substring(12));
    if(orderArray[i] === serviceCardId.substring(12)) return i;
  }

  return 0;
}

function setMainMotion() {
  $('.motion_card').one('inview', function (event, visible, visiblePartX, visiblePartY) {
    var inview_id = "#" + this.id;
    startInvew(inview_id,servicecards_delay);
    servicecards_delay += 0.08;
  });
}

function startInvew(inviewId,delay) {
//  console.log(inviewId,delay);
  $(inviewId).css({
    "animation": "0.83s cubic-bezier(0.42,0,0.58,1) " + delay + "s 1 backwards motionShowCard",
    "opacity": "1",
  });

  $("#contents").on("touchstart mousewheel DOMMouseScroll keydown", function (event, ui) {
    servicecards_delay = 0; // for main page motion
//    fixedMenuSetForEditMode();
  });

  /* fixed menu for edit mode */
  /*
  var fixedMenuSetForEditMode = function () {
    document_height = $(document).height(); // 문서 전체 높이
    document_scrollTop = $(document).scrollTop(); // 문서 전체 높이 중 스크롤 위치
    window_height = $(window).height(); // 창 높이
    gap = document_height - window_height;
    bottom = document_scrollTop - gap;

    if (document_scrollTop > gap) {
      $(".edit_fixed_menu").css("bottom", bottom + "px");
    } else {
      $(".edit_fixed_menu").css("bottom", "0");
    }
  }
  */

  $("#sortableDiv").sortable({
    delay: 300,
    scroll: true,
  });
}