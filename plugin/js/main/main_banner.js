/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Banner to add banner for each service.
 * @module main/banner
 */

 /** Initiate banner */
function initMainBanner() {
  var windowWidth = $(window).width();
  var newNotiText =
    "<div id='mainBanner' class='motion_card swiper-container'>"+
    "<div id='mainBannerWrapper' class='swiper-wrapper' style='width:" + windowWidth + "px'>" +
    //      "<div id='mainBanner_parcel' class='swiper-slide mainBannerSwiper' onclick='parcelCardOnClick()'></div>"+
    //      "<div id='mainBanner_noti' class='swiper-slide mainBannerSwiper' onclick='notificationCardOnClick()'></div>";
    //  if(!(isSmartTV() || lang == "en")) newNotiText += "<div id='mainBanner_vote' class='swiper-slide mainBannerSwiper' onclick='voteCardOnClick()'></div>";
    //  newNotiText +=
    //"<div id='mainBanner_visitor' class='swiper-slide mainBannerSwiper' onclick='visitorCardOnClick()'></div>"+
    //      "<div id='mainBanner_parking' class='swiper-slide mainBannerSwiper' onclick='parkingCardOnClick()'></div>"+
    //      "<div id='mainBanner_bill' class='swiper-slide mainBannerSwiper' onclick='billCardOnClick()'></div>"+
    "</div>" +
    "<div id='mainBanner_pagination' class='swiper-pagination' style='position:static;margin-top:5px;margin-top:20px;margin-bottom:5px'></div>" +
    "<!--div id='newNotificatonData'></div-->"+
    "</div>";
  document.getElementById('mainBannerDiv').innerHTML = newNotiText;
  $('.mainBannerClass').css('display', 'block');

  for (var x = 0; x < serviceList.length; x++) {
    if (serviceList[x].enabled === true)
      serviceList[x].service.initMainBanner();
  }

  /* drawhomeScreenForTV */
  if (isSmartTV()) {
    $('.mainBannerClass').css('margin-left', '480px');
    $('.mainBannerClass').css('margin-right', '480px');
    $('.mainBannerSwiper').css('height', '30');
    //    $('.mainBanner').css('height','72px');
  }


  var swipe_delay = 1500;
  if (isSmartTV()) swipe_delay = 3000;
  var newNotifiSwiper = new Swiper('#mainBanner', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: swipe_delay,
      disableOnInteraction: false,
    },
    pagination: {
      el: '#mainBanner_pagination',
      clickable: true,
    },
  });

  //  document.getElementById('mainBanner_parcel').innerHTML = mainBannerTextForSwipe($.lang[lang].PARCEL_TAB,lang);
  //  document.getElementById('mainBanner_noti').innerHTML = mainBannerTextForSwipe($.lang[lang].NOTIFICATION_TAB,lang);
  //  document.getElementById('mainBanner_parking').innerHTML = mainBannerTextForSwipe($.lang[lang].PARKING_LOCATION_TAB,lang);
  //  document.getElementById('mainBanner_bill').innerHTML = mainBannerTextForSwipe($.lang[lang].BILL_TAB,lang);
}

function mainBannerTextForSwipe(type, language) {
  var retText = "";

  /*if (isSmartTV()) return mainBannerTextForSwipeForTV(type, language);*/

  if (language === "ko") {
    switch (type) {
      case $.lang[language].PARCEL_TAB:
        retText =
          "<div><span>미수거 택배가</span></div>" +
          "<div><span>" + (parcelObject.waiting_num).fmodify("#3695dd", 600) + "건".fmodify("#3695dd", 600) + " 있습니다</span></div>";
        break;
      case $.lang[language].NOTIFICATION_TAB:
        retText =
          "<div><span>" + type + "이</span></div>" +
          "<div><span>" + (notiObject.list.length + "건").fmodify("#3695dd", 600) + " 있습니다</span></div>";
        break;
      case $.lang[language].PARKING_LOCATION_TAB:
        retText =
          "<div><span>" + parkingObject.carlocationlist[0].nickname + "가 " + (parkingObject.carlocationlist[0].location).fmodify("#3695dd", 600) + "에</span></div>" +
          "<div><span>" + "주차되어 있습니다</span></div>";
        break;
      case $.lang[language].BILL_TAB:
        retText =
          "<div><span>" + (parseInt((billObject.bill[0].month).substring(5, 7))).fmodify("#3695dd", 600) + "월 " + "관리비 고지서가</span></div>" +
          "<div><span>나왔습니다</span></div>";
        break;
    }
  } else { // if(language=="en")
    switch (type) {
      case $.lang[language].PARCEL_TAB:
        retText =
          "<div>" + (parcelObject.waiting_num).fmodify("#3695dd", 600) + " packages".fmodify("#3695dd", 600) + "</div>" +
          "<div>have arrived</div>";
        break;
      case $.lang[language].NOTIFICATION_TAB:
        retText = "<div>You have " + notiObject.list.length.fmodify("#3695dd", 600) + " </div>" +
          "<div>" + "notifications".fmodify("#3695dd", 600) + "</div>";
        break;
      case $.lang[language].PARKING_LOCATION_TAB:
        retText =
          "<div>" + parkingObject.carlocationlist[0].nickname + " is parked</div>" +
          "<div>at " + (parkingObject.carlocationlist[0].location).fmodify("#3695dd", 600) + "</div>";
        break;
      case $.lang[language].BILL_TAB:
        retText =
          "<div>" + "New " + "bill ".fmodify("#3695dd", 600) + "<br>" + "available" + "</div>";
        //          "<div>" + "We've got " + "maintenance".fmodify("#3695dd",600) + "</div>" +
        //          "<div>" + "bill for "+ "October".fmodify("#3695dd",600) +"</div>";
        break;
    }
  }
  return retText;
}
