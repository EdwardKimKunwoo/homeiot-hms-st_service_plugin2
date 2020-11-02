/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

const TV_IMAGE_SRC = "res/img/tv/"
function initMainScreenForTV(){
  $("#mainScreen").css({"background":"url("+TV_IMAGE_SRC+"tv_favoriteCard_bg.png)"});
}

function drawMainScreenForTV() {

  /* common */
    $('.page_style').css('height','1080px');

  /* title */
  $('#actionBar').css('height','0px');
  document.getElementById("actionBar").innerHTML = "";
  $('#main_service_menu_div').css('height','156px');
  $('#main_service_menu_div').css('margin','0px 48px 0px 48px');
  document.getElementById("main_service_menu_div").innerHTML =
    "<div class='tv_title_text_css'>"+apt_info+" "+serviceMain.pageTitle+"</div>"+
    "<div class='tv_title_image_css'><img src='"+TV_IMAGE_SRC+"tv_favoriteCard_logo.png' /></div>";

  /* service card */
  $('.servicecards_page').css('margin','0px 111px 82px 111px');

  $('.servicecards_page').css('height','828px');
  $('.servicecards').css('width', '536px');
  $('.servicecards').css('height', '816px');
  $('.servicecards').css('margin','0px 14px 0px 14px');
  $('.servicecards_title_text').css('font-size','20px');
  $('.servicecards_title_text').css('margin','0px');
  $('.servicecards_title_text').css('font-weight','bold');
  $('.servicecards_title_space').css('margin-bottom','20px');

}

function redrawMainScreenForTV(){
  $('.tv_servicecard_item_css').css('padding','16px 26px 16px 18px');
  $('.tv_servicecard_item_css').css('margin','0px 0px 20px 0px');
  $('.tv_servicecard_item_css').css('height','61px');

  $('.tv_servicecard_item_top_css').css('margin-bottom','1px');
  $('.tv_servicecard_item_top_css').css('height','auto');
  $('.tv_servicecard_item_title_css').css('font-size','20px');
  $('.tv_servicecard_item_title_css').css('line-height','30px');
  $('.tv_servicecard_item_title_css').css('font-weight','bold');
  $('.tv_servicecard_item_date_css').css('font-size','20px');
  $('.tv_servicecard_item_date_css').css('line-height','30px');
  $('.tv_servicecard_item_date_css').css('font-weight','bold');
  $('.tv_servicecard_item_data_css').css('font-size','24px');
  $('.tv_servicecard_item_data_css').css('line-height','30px');
  $('.tv_servicecard_item_data_css').css('font-weight','bold');
  $('.tv_servicecard_item_sub_data_css').css('font-size','24px');
  $('.tv_servicecard_item_sub_data_css').css('line-height','30px');
  $('.tv_servicecard_item_sub_data_css').css('font-weight','bold');

  $('.tv_servicecard_parcel_item_image_css').css('margin-top','12px');
  $('.tv_servicecard_parking_item_image_css').css('margin-top','12px');
}
