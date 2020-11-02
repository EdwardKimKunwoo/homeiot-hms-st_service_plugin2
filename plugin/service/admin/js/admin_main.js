/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Admin service shows the previous and current management expenses.
 * @module service/admin/main
 * @author Home IoT R&D Team
 */
var admin_cardMonth=0;
var adminCardDropDownMenu;
var adminPageDropDownMenu;
var admin_pageMonth=0;

function loadedAdminPage(service) {

	drawActionBar(false);
	if (isFHub()) {
		scplugin.manager.setFlag("openAdditionalPage");
	}

	initAdminPage();
	showContentLoadingPage(true, adminSelf);

	if(OPERATION_MODE===1){
		drawAdminPage(0);
	} else {
		requestAdminCard();
		setTimeout(function() {
			drawAdminPage(0);
		}, 100);
	}
	return;
}

/** initiate page */
function initAdminPage(){
	var inner_html =
		"<div>"+
		"<div class='clear' style='margin-top:33px;'></div>" +
			"<div id='admin_total_header_text' class='admin_total_header_text_css'>"+
			"</div>"+
			"<div class='clear' style='margin-bottom:33px;'></div>" +
			"<div id='admin_page_expense' class='servicecards' style='padding:16px'>"+
				"<div id='admin_page_due_date' class='admin_page_due_date_css'></div>"+
				"<div class='clear' style='margin-bottom:24px;'></div>" +
				"<div id='admin_page_amount_summary'></div>"+
				"<div id='admin_page_amount_body'></div>"+
			"</div>"+
			"<div id='admin_page_monthly_sub_header'></div>"+
			"<div id='admin_page_monthly' class='servicecards' style='padding:16px'>"+
				"<div id='admin_page_monthly_summary'></div>"+
			"<div>"+
		"</div>";
	document.getElementById("adminPage").innerHTML = inner_html;

	initAdminExpense('admin_page_amount_summary',"page");
	addAdminSubHeader("admin_page_monthly_sub_header", $.lang[lang].ADMIN_COMPARE_MONTHLY);
	initAdminPageMonthly('admin_page_monthly_summary');
}

/** draw page */
function drawAdminPage(monthIndex){
	//console.log("drawAdminPage",monthIndex);
	if(adminObject.existdata){
		drawAdminPageHeader(monthIndex);
		drawAdminExpense(monthIndex,"page");
		drawAdminPageMonthly(monthIndex);
		adminPageDropDownMenu.createMenu("adminPage");
	} else {

		document.getElementById("adminPage").innerHTML = "";
		drawNoItemPage(
			"adminPage",
			adminImageUri+"home_ic_status_admin.png",
			$.lang[lang].ADMINCARD_NO_ITEM,
			"",
			56
		);
		/*
		$("#admin_page_expense").css("height","151px");
		$("#admin_page_monthly").css("height","151px");
		$("#admin_page_expense").css("padding-top","70px");
		$("#admin_page_monthly").css("padding-top","70px");

		drawNoItemCard(
			"admin_page_expense",
			adminImageUri+"home_ic_status_admin.png",
			$.lang[lang].ADMINCARD_NO_ITEM);
		drawNoItemCard(
			"admin_page_monthly",
			adminImageUri+"home_ic_status_admin.png",
			$.lang[lang].ADMINCARD_NO_ITEM);*/
	}
}

function drawAdminPageHeader(monthIndex){

	document.getElementById("admin_total_header_text").innerHTML ="";
	var header_up_text = "&nbsp";
	var header_down_text = "&nbsp";
	var savedColor = "#41c35a";
	var exceededColor = "#ed6565";

	if(adminObject.existdata){
		var tmpObject = getAdminInfoByMonthIndex("total",monthIndex);
		var diffValue = tmpObject.lastmonth_data - tmpObject.data;

		if(diffValue === 0){
			header_up_text = $.lang[lang].ADMINPAGE_HEADER_UP_SAME_TEXT;
		} else if ( diffValue > 0 ){
			var tmp_text_value =
				"<span class=admin_total_header_text_value_css style='color:"+savedColor+"'>" + Math.abs(diffValue).currency(admin_currency_sign,true,admin_exchange_rate) + "</span>";
			var tmp_text_diff =
				"<span class=admin_total_header_text_value_css style='color:"+savedColor+"'>" +$.lang[lang].ADMINPAGE_HEADER_SAVED_TEXT + "</span>";

			header_up_text = $.lang[lang].ADMINPAGE_HEADER_UP_TEXT;
			header_up_text = header_up_text.replace('%d', tmp_text_value);
			header_up_text = header_up_text.replace('%s', tmp_text_diff);

			header_down_text = $.lang[lang].ADMINPAGE_HEADER_SAVED_DOWN_TEXT;
			header_down_text = header_down_text.replace('%d', tmp_text_value);
			header_down_text = header_down_text.replace('%s', tmp_text_diff);
		} else if ( diffValue < 0 ){
			var tmp_text_value =
				"<span class=admin_total_header_text_value_css style='color:"+exceededColor+"'>" + Math.abs(diffValue).currency(admin_currency_sign,true,admin_exchange_rate) + "</span>";
			var tmp_text_diff =
				"<span class=admin_total_header_text_value_css style='color:"+exceededColor+"'>" +$.lang[lang].ADMINPAGE_HEADER_EXCEEDED_TEXT + "</span>";

			header_up_text = $.lang[lang].ADMINPAGE_HEADER_UP_TEXT;
			header_up_text = header_up_text.replace('%d', tmp_text_value);
			header_up_text = header_up_text.replace('%s', tmp_text_diff);

			header_down_text = $.lang[lang].ADMINPAGE_HEADER_EXCEEDED_DOWN_TEXT;
			header_down_text = header_down_text.replace('%d', tmp_text_value);
			header_down_text = header_down_text.replace('%s', tmp_text_diff);
		}
	} else {
		header_up_text = $.lang[lang].ADMINPAGE_HEADER_NO_ITEM;
		header_down_text = "&nbsp";
	}

	document.getElementById("admin_total_header_text").innerHTML =
		"<div >"+
			header_up_text+
		"</div>"+
		"<div>"+
			"<span>"+
				header_down_text +
			"</span>"+
		"</div>";
}

function addAdminSubHeader(id, text) {
  var innerHTML =
    "<div class='basic_subheader'>" +
    "	<div class='basic_subheader_text'>" + text + "</div>" +
    "   <div class='basic_subheader_divider'></div>" +
    "</div>" +
    "<div class='clear'></div>";
    document.getElementById(id).innerHTML = innerHTML;
}

function createAdminMonthlyCanvas(){
	var retText ="";
	for(var i=0; i <ADMIN_MAX_MONTH_MONTHLY; i++) {
		retText +=
// labels		"<div style='width:16.66%;float:left;margin-top:1px;'>"+
		"<div id='admin_monthly_chart_div"+i+"' style='width:16.66%;float:left;margin-top:1px;'>"+
			"<canvas id='admin_monthly_canvas_"+i+"' height='200'></canvas>"+
		"</div>"
	}
	return retText;
}

function initAdminPageMonthly(id) {

	var adminMonthlyStyle;
	if(screen.width > ADMIN_MAX_GRAPH_WIDTH){  //tablet PC - remove animaation
		adminMonthlyStyle = "class='admin_chartAreaWrapper2' style='width:100%;'";
	}else{
		adminMonthlyStyle = "class='admin_chartAreaWrapper2 admin_chart_animation' style='width:528px;'";
	}

  var innerHTML =
    "<div id='admin_monthly_month_year' class=''></div>" +
	    "<div class='clear' style='margin-top:9px' ></div>"+
				"<span>"+$.lang[lang].ADMIN_COMPARE_MY_HOUSE+"</span>" +
				"<span class='admin_divider'></span>" +
				"<span id='admin_monthly_current' style='color:#3695dd'></span>" +
			"<div class='clear' style='margin-top:4px'></div>"+
				"<span>"+$.lang[lang].ADMIN_COMPARE_AVERAGE+"</span>" +
				"<span class='admin_divider'></span>" +
				"<span id='admin_monthly_average' style='color:#b5b5b5'></span>" +
			"<div class='clear' style='margin-top:4px'></div>"+
				"<span>"+$.lang[lang].ADMIN_COMPARE_LAST_YEAR+"</span>" +
				"<span class='admin_divider'></span>" +
				"<span id='admin_monthly_last_year' style='color:#707070'></span>" +
			"<div>" +

			"<div class='clear' style='margin-top:24px' ></div>"+

// labels			"<div class='admin_chartWrapper' style='position:absolute;margin-top:4px;width:calc(100% - 56px);float:right;'>" +
			"<div class='admin_chartWrapper' style='position:absolute;margin-top:4px;width:calc(100% - 20px);float:right;'>" +
				"<div id='admin_monthly_wrapper_label' class='admin_chartAreaWrapper'>"+
					"<canvas id='admin_monthly_canvas_label' height='200'></canvas>"+
				"</div>" +
				"<canvas id='admin_monthly_canvas_axis_label' height='180' width='0'></canvas>"+
			"</div>"+

// labels			"<div class='admin_chartWrapper' style='margin-top:4px;margin-left:7px;width:calc(100% - 58px);float:left'>"+
			"<div class='admin_chartWrapper' style='margin-top:4px;margin-left:7px;width:calc(100% - 15px);float:left'>"+
				"<div id='admin_monthly_wrapper' class='admin_chartAreaWrapper end_effect'>"+
					"<div id='admin_monthly_wrapper_canvas'" + adminMonthlyStyle + ">"+
						createAdminMonthlyCanvas() +
					"</div>"+
				"</div>"+
				"<canvas id='admin_monthly_canvas_axis' height='200' width='0'></canvas>"+
			"</div>"+
		"</div>";
    document.getElementById(id).innerHTML = innerHTML;

		for(let i=0; i <ADMIN_MAX_MONTH_MONTHLY; i++) {
			let button = document.getElementById("admin_monthly_chart_div"+i);
			button.addEventListener('touchstart', (e) => {
				let config = { type: 'rippleAdminMonthlyChart' };
				rippleManager.set(e, config);
			}, {passive: true});
		}
}

function adminMenuDownEnd(){
	adminCardDropDownMenu.dropDownMenu.basicMenuDownEnd();
}

/** initiate favorite card */
function initAdminCard(index,cardInfo){

		var initHtml = "<div id='admin_card' class='servicecards motion_card' onclick='adminMenuDownEnd();adminCardOnClick()'></div>"
		document.getElementById('sortableDiv_' + index).innerHTML = initHtml;

		var initHtml =
			"<div id='admin_card_enable'>"+
				"<div class='servicecards_title_space'>" +
					"<div id='admin_card_title'></div>" +
					"<div class='clear'></div>" +
					"</div>" +
					"<div class='servicecards_data_space'>" +
						"<div id='admin_card_data'></div>" +
					"</div>" +
				"</div>" +
			"</div>"+
			"<div id='admin_card_disable'></div>";
		document.getElementById('admin_card').innerHTML = initHtml;

		if (document.getElementById('admin_card_title') === null) return false;
		document.getElementById('admin_card_title').innerHTML = drawServiceCardEditerImage($.lang[lang].ADMIN_TAB, 'admin_card_main_title','admin_card_sub_title');

		var inner_html =
			"<div id='admin_card_expense'></div>" +
			"<div id='admin_card_body' class='admin_card_body_css'></div>"+
			"<div id='admin_card_body_none'></div>";
		document.getElementById('admin_card_data').innerHTML = inner_html;

		initAdminExpense('admin_card_expense');

		cardInfo.bEnabledCard = true;
	  cardInfo.initCardOrder = index;
	  cardInfo.nCardOrder = index;
	  cardInfo.title = $.lang[lang].ADMIN_TAB;

      return true;
}

function initAdminExpense(summary_id,pageSuffix){
	var suffix = "";

	var yearTextStyle = "font-weight:bold;"
	var admin_date_css_bottom_margin = "margin-bottom:32px;";
	var admin_total_amount_sub_text_bottom_margin = "margin-bottom:49px;";

	if (pageSuffix) {
		suffix = "_" + pageSuffix;
		yearTextStyle = "";
		var admin_date_css_bottom_margin = "margin-bottom:24px;";
		var admin_total_amount_sub_text_bottom_margin = "margin-bottom:35px;";
	}

	var tmpYearMonthDiv =
		"<div id='admin_year_text" + suffix + "' class='admin_year_text_css' style='margin-left:12px;"+yearTextStyle+"' onclick=event.cancelBubble=true;> </div>" +
		"<div id='admin_month_text" + suffix + "' class='admin_month_text_css' style='margin-left:6px' onclick=event.cancelBubble=true;> </div>";

	if(lang === "en"){
		tmpYearMonthDiv =
			"<div id='admin_month_text" + suffix + "' class='admin_month_text_css ' style='margin-left:12px;' onclick=event.cancelBubble=true;> </div>"+
			"<div id='admin_year_text" + suffix + "' class='admin_year_text_css' style='margin-left:6px;"+yearTextStyle+"' onclick=event.cancelBubble=true;> </div>";
	}

	document.getElementById(summary_id).innerHTML =
		"<div>" +
			"<div class='admin_date_css' ontouchstart=adminMenuAction(event,'"+suffix+"') onclick=event.cancelBubble=true;>" +
					tmpYearMonthDiv +
					"<div id='admin_drop_button" + suffix + "' style='float:left' onclick=event.cancelBubble=true;>"+
					"</div>" +
			"</div>" +
			"<div class='clear' style='"+admin_date_css_bottom_margin+"'></div>" +
			"<div id='admin_total_amount" + suffix + "' class='admin_total_amount_css'>" +
			"</div>" +
			"<div class='clear' style='margin-bottom:4px;'></div>" +
			"<div id='admin_total_sub" + suffix + "' class='admin_total_sub_css'>" +
				"<div id='admin_total_amount_sub_text" + suffix + "' class='admin_total_amount_sub_text_css'> </div>" +
			"</div>" +
		"</div>" +
		"<div class='clear' style='"+admin_total_amount_sub_text_bottom_margin+"'></div>";
// todo		"<div class='bar' style='width:auto;background-color:#ebebeb'></div>";

	if(suffix) adminPageDropDownMenu.initMenu("admin_drop_button"+suffix,"res/img/home_button_expand_open_dark.png","drawAdminPage");
	else adminCardDropDownMenu.initMenu("admin_drop_button"+suffix,"res/img/home_button_expand_open_dark.png","drawAdminCard");

}

function adminMenuAction(e,suffix){
	adminCardDropDownMenu.menuConfig.id = "admin_drop_button"+suffix;
	callBasicMenuAction(e,"admin_drop_button"+suffix,adminCardDropDownMenu.menuConfig);
}

var admin_list = ["elec","water","heating","admin","admin2","etc"];
var admin_card_list = ["elec","water","heating"];
var admin_page_list = ["elec","water","heating","admin","admin2","etc"];

function getAdminInfoByMonthIndex(admin, monthIndex){
	var retValue;

	//console.log("getAdminInfoByMonthIndex",admin,monthIndex);
	switch (admin) {
		case admin_list[0]:
			retValue = {
				adminName : admin_list[0],
				index: 0,
				chargeText: $.lang[lang].ADMIN_ELECTRIC_CHARGES,
				data: adminObject.list[monthIndex].bill.electricity,
				lastmonth_data: adminObject.list[monthIndex+1].bill.electricity,
				lastyear_data: adminObject.list[monthIndex+12].bill.electricity,
				chartBgColor: "#3695DD",
				defaultMax: 10000,
				period: adminObject.list[monthIndex].period,
				dueDate: adminObject.list[monthIndex].dueDate,
				average: adminObject.list[monthIndex].average,
				late_fee: adminObject.list[monthIndex].bill.late_fee,
				iconUrl: adminImageUri+"home_ic_device_electricity.png"
			};
		break;
		case admin_list[1]:
			retValue = {
				adminName : admin_list[1],
				index: 1,
				chargeText: $.lang[lang].ADMIN_WATER_CHARGES,
				data: adminObject.list[monthIndex].bill.water,
				lastmonth_data: adminObject.list[monthIndex+1].bill.water,
				lastyear_data: adminObject.list[monthIndex+12].bill.water,
				chartBgColor: "#3695DD",
				defaultMax: 10000,
				period: adminObject.list[monthIndex].period,
				dueDate: adminObject.list[monthIndex].dueDate,
				average: adminObject.list[monthIndex].average,
				late_fee: adminObject.list[monthIndex].bill.late_fee,
				iconUrl: adminImageUri+"home_ic_device_water.png"
		};
		break;
		case admin_list[2]:
			retValue = {
				adminName : admin_list[2],
				index: 2,
				chargeText: $.lang[lang].ADMIN_HEATING_CHARGES,
				data: adminObject.list[monthIndex].bill.heating,
				lastmonth_data: adminObject.list[monthIndex+1].bill.heating,
				lastyear_data: adminObject.list[monthIndex+12].bill.heating,
				chartBgColor: "#3695DD",
				defaultMax: 10000,
				period: adminObject.list[monthIndex].period,
				dueDate: adminObject.list[monthIndex].dueDate,
				average: adminObject.list[monthIndex].average,
				late_fee: adminObject.list[monthIndex].bill.late_fee,
				iconUrl: adminImageUri+"home_ic_device_thermostat.png"
			};
		break;
		case admin_list[3]:
			retValue = {
				adminName : admin_list[3],
				index: 3,
				chargeText: $.lang[lang].ADMIN_HOUSEHOLD_EXPENSES,
				data: adminObject.list[monthIndex].bill.individual_mgmt,
				lastmonth_data: adminObject.list[monthIndex+1].bill.individual_mgmt,
				lastyear_data: adminObject.list[monthIndex+12].bill.individual_mgmt,
				chartBgColor: "#3695DD",
				defaultMax: 10000,
				period: adminObject.list[monthIndex].period,
				dueDate: adminObject.list[monthIndex].dueDate,
				average: adminObject.list[monthIndex].average,
				late_fee: adminObject.list[monthIndex].bill.late_fee,
				iconUrl: adminImageUri+"home_ic_status_admin.png"
			};
		break;
		case admin_list[4]:
			retValue = {
				adminName : admin_list[4],
				index: 4,
				chargeText: $.lang[lang].ADMIN_GENERATION_MANAGEMENT_EXPENSES,
				data: adminObject.list[monthIndex].bill.general_mgmt,
				lastmonth_data: adminObject.list[monthIndex+1].bill.general_mgmt,
				lastyear_data: adminObject.list[monthIndex+12].bill.general_mgmt,
				chartBgColor: "#3695DD",
				defaultMax: 10000,
				period: adminObject.list[monthIndex].period,
				dueDate: adminObject.list[monthIndex].dueDate,
				average: adminObject.list[monthIndex].average,
				late_fee: adminObject.list[monthIndex].bill.late_fee,
				iconUrl: adminImageUri+"home_ic_status_admin_house.png"
			};
		break;
		case admin_list[5]:
			retValue = {
				adminName : admin_list[5],
				index: 5,
				chargeText: $.lang[lang].ADMIN_OTHER_CHARGES,
				data: adminObject.list[monthIndex].bill.etc,
				lastmonth_data: adminObject.list[monthIndex+1].bill.etc,
				lastyear_data: adminObject.list[monthIndex+12].bill.etc,
				chartBgColor: "#3695DD",
				defaultMax: 10000,
				period: adminObject.list[monthIndex].period,
				dueDate: adminObject.list[monthIndex].dueDate,
				average: adminObject.list[monthIndex].average,
				late_fee: adminObject.list[monthIndex].bill.late_fee,
				iconUrl: adminImageUri+"home_ic_status_etc.png"
			};
		break;
		case "total":
			retValue = {
				adminName : admin_list[0],
				index: 6,
				chargeText: "",
				data: adminObject.list[monthIndex].bill.total,
				lastmonth_data: adminObject.list[monthIndex+1].bill.total,
				lastyear_data: adminObject.list[monthIndex+12].bill.total,
				list: adminObject.list,
				defaultMax: 10000,
				chartBgColor: "#3695DD",
				period: adminObject.list[monthIndex].period,
				dueDate: adminObject.list[monthIndex].dueDate,
				average: adminObject.list[monthIndex].average,
				late_fee: adminObject.list[monthIndex].bill.late_fee,
				iconUrl:""
			};
		break;
	}
	return retValue;
}

function enableAdminTotalBody(bEnable, suffix){
	var enableText = ["","none"];
	var disableText = ["none",""];

	var tmpText = ( bEnable === true ) ? enableText : disableText;

	if(!suffix) {
		//console.log(tmpText);
		document.getElementById("admin_card_enable").style.display = tmpText[0];
		document.getElementById("admin_card_disable").style.display = tmpText[1];
	} else {
		document.getElementById("admin_page_enable").style.display = tmpText[0];
		document.getElementById("admin_page_disable").style.display = tmpText[1];
	}

	return bEnable;
}


function drawAdminPageMonthlyHeader(admin,monthIndex){
	var tmpAdminData = getAdminInfoByMonthIndex(admin,monthIndex);

	document.getElementById("admin_monthly_month_year").innerHTML  = toDateYearMonthString(tmpAdminData.period.year, tmpAdminData.period.month);
	document.getElementById("admin_monthly_current").innerHTML  = (tmpAdminData.data).currency(admin_currency_sign,true,admin_exchange_rate);
	document.getElementById("admin_monthly_average").innerHTML  = (tmpAdminData.average).currency(admin_currency_sign,true,admin_exchange_rate);
	document.getElementById("admin_monthly_last_year").innerHTML  = (tmpAdminData.lastyear_data).currency(admin_currency_sign,true,admin_exchange_rate);
}

function drawAdminPageMonthly(monthIndex){
	drawAdminPageMonthlyHeader("total",monthIndex);
	drawAdminPageMonthlyChart("total",monthIndex);
}

function drawAdminCard(monthIndex){
	//console.log("drawAdminCard",monthIndex);

	if( document.getElementById('admin_card_title') === null) return;

	let detail = document.getElementById('admin_card_main_title');
	let clone = detail.cloneNode(true);
	detail.parentNode.replaceChild(clone, detail);
	clone.addEventListener('touchstart', (e) => {
		e.stopPropagation();
		let config = {
			type: 'rippleC',
			cb: () => { adminCardOnClick(); }
		};
		rippleManager.set(e, config);
	}, {passive: true});
	clone.onclick = (e) => { e.stopPropagation(); };

	if (adminObject.card_status === "unloaded") {
		//console.log("!!!!!!! unloaded");

		enableAdminTotalBody(false);
		drawReloadCard("admin_card_disable", "admin", retryLoadAdminCard);
	} else if(adminObject.card_status === "loading") {
		//console.log("!!!!!!! loading");

		enableAdminTotalBody(false);
		drawLoadingCard("admin_card_disable", "admin");
	} else if(!enableAdminTotalBody(adminObject.existdata)) {
		//console.log("!!!!!!! No Item");

		var initHtml =
			"<div class='servicecards_title_space'>" +
				"<div id='admin_card_title_notiem'></div>" +
				"<div class='clear'></div>" +
				"</div>" +
				"<div class='servicecards_data_space'>" +
					"<div id='admin_card_data_notiem'></div>" +
				"</div>" +
			"</div>";
		document.getElementById('admin_card_disable').innerHTML = initHtml;

		document.getElementById('admin_card_title_notiem').innerHTML = drawServiceCardEditerImage($.lang[lang].ADMIN_TAB, 'admin_card_main_title_noitem','admin_card_sub_title_noitem');

		drawNoItemCard(
			"admin_card_data_notiem",
			adminImageUri+"home_ic_status_admin.png",
			$.lang[lang].ADMINCARD_NO_ITEM);
	} else {
		//console.log("!!!!!!! Draw");

		drawAdminExpense(monthIndex);
		adminCardDropDownMenu.createMenu();
	}

	/*  todo
	if (enableShowCardAnimation) {
		// card 표시 animation 적용
		promiseAnimationEnd($('#admin_card').find('.servicecards_data_space'), 'show_card');
	}
	*/

}

function retryLoadAdminCard() {
	//console.log("retryLoadAdminCard!!!!");
	requestAdminData();
	drawAdminCard(0);
}

function drawAdminExpense(monthIndex,pageSuffix){
	var tmpList = admin_card_list;
	var tmpBodyId="admin_card_body";

	if (pageSuffix){
		tmpList = admin_page_list;
		tmpBodyId="admin_page_amount_body";
	}

	drawAdminSummary(monthIndex,pageSuffix);
	drawAdminList(tmpList, tmpBodyId, monthIndex, pageSuffix);
}


function drawAdminSummary(monthIndex, pageSuffix){
	var suffix = "";
	if (pageSuffix){
		suffix = "_" + pageSuffix;
		admin_pageMonth = monthIndex;
	} else {
		admin_cardMonth = monthIndex;
	}

	var tmpObject = getAdminInfoByMonthIndex("total",monthIndex);
	var late_fee = parseInt(tmpObject.data) + parseInt(tmpObject.late_fee);
	var expect_lable_text = $.lang[lang].ADMIN_AMOUNT_AFTER_DELIVERY  + " : " + late_fee.currency(admin_currency_sign,true,admin_exchange_rate);
	var dueDateText="";
	if(tmpObject.dueDate.month !== "") dueDateText = $.lang[lang].ADMIN_DUE_DATE +": "+ toDateYearMonthDayString(tmpObject.dueDate.year,tmpObject.dueDate.month,tmpObject.dueDate.day);
	if(suffix===""){
		document.getElementById('admin_card_sub_title').innerHTML = dueDateText;
	} else {
		document.getElementById('admin_page_due_date').innerHTML = dueDateText;
	}

	document.getElementById('admin_year_text' + suffix).innerHTML = toDateYearString(tmpObject.period.year);
	document.getElementById('admin_month_text' + suffix).innerHTML = toDateMonthString(tmpObject.period.month);

	var tmpText1 = "";
	var tmpText2 = "";
	if(admin_currency_sign === "원"){
		tmpText2 = 	"<div id='admin_total_amount_currency_text" + suffix + "' class='admin_total_amount_currency_text_css' >"+$.lang[lang].CURRENCY_WON+"</div>";
	} else if(admin_currency_sign === "$"){
		tmpText1 = 	"<div id='admin_total_amount_currency_text" + suffix + "' style='font-size:28px' class='admin_total_amount_currency_text_css'>$</div>";
	}

	document.getElementById('admin_total_amount' + suffix).innerHTML =
	tmpText1 +
	"<div id='admin_total_amount_text" + suffix + "' class='admin_total_amount_text_css'>"+
	(tmpObject.data).currency("",true,admin_exchange_rate) +
	"</div>"+
	tmpText2;

	document.getElementById('admin_total_amount_sub_text' + suffix).innerHTML = expect_lable_text;

}

function drawAdminList(adminList,body_id,monthIndex,pageSuffix){
	var suffix = "";
	var yearTextStyle = "font-weight:bold;"
	var clickEventString;
	if (pageSuffix) {
		suffix = "_" + pageSuffix;
		clickEventString = "";

	}
	var svgArrowUP = document.loadedSVG.home_ic_usage_up;
	var svgArrowDown = document.loadedSVG.home_ic_usage_down;
	var svgSignPlus = document.loadedSVG.home_ic_usage_plus;
	var svgSignMinus = document.loadedSVG.home_ic_usage_minus;

	document.getElementById(body_id).innerHTML = "";

	var innerHtml=	"";

	for(var i=0; i < adminList.length; i++) {

		var adminInfo = getAdminInfoByMonthIndex(adminList[i],monthIndex);

		var tmpDiffdata = adminInfo.data-adminInfo.lastmonth_data;
		var diffFontColor = "";

		if(tmpDiffdata < 0) {
			tmpDiffdata = Math.abs(tmpDiffdata);
			diffFontColor = "style='color:#41c35a'";
		} else if(tmpDiffdata > 0){
			diffFontColor = "style='color:#ed6565'";
		} else {
			//console.log("!!!!!!",tmpDiffdata,adminInfo.chargeText);
			if(lang=="ko")
				tmpDiffdata = adminInfo.chargeText+"동일" ;
			else
				tmpDiffdata = "No Change" ;
		}

		innerHtml +=
		"<div id='admin_card_box"+suffix+i+"' class='admin_card_box_css' "+ clickEventString +">" +

			"<div class='admin_card_box_left_css'>"+
				"<img src='"+adminInfo.iconUrl+"' class='admin_card_box_left_img_css'>"+
			"</div>"+

			"<div class='admin_card_box_detail_css'>"+
				"<div id='admin_card_box_detail_title_css"+suffix+i+"' class='admin_card_box_detail_title_css'>" + adminInfo.chargeText+
				"</div>"+
				"<div class='admin_card_box_detail_amount_css'>"+adminInfo.data.currency(admin_currency_sign,true,admin_exchange_rate)+
				"</div>"+
			"</div>"+

			"<div class='admin_card_box_variation_css'>"+
				"<span >" +
					"<span id='admin_arrow"+suffix+i+"' class='admin_card_box_variation_arrow_css'></span>"+
				"</span>" +
				"<span >" +
					"<span id='admin_sign"+suffix+i+"' class='admin_card_box_variation_sign_css'></span>"+
				"</span>" +
				"<span class='admin_card_box_variation_value_css' "+diffFontColor+">" +tmpDiffdata.currency("",true,admin_exchange_rate) +
				"</span>" +
			"</div>"+

		"</div>" +
		"<div class='clear'></div>";
	}
	document.getElementById(body_id).innerHTML = innerHtml;

	let itemsList = document.getElementsByClassName('admin_card_box_css');
    for (var i = 0; i < itemsList.length; i++) {
      itemsList[i].removeEventListener('touchstart', loadedAdminPageOnclickEvent, {passive: true});
	  itemsList[i].addEventListener('touchstart', loadedAdminPageOnclickEvent, {passive: true});
	  itemsList[i].addEventListener('click', e => { e.stopPropagation(); });
    }


	for(var i=0; i < adminList.length; i++) {
//		let tmpHeight = $("#admin_card_box_detail_title_css"+suffix+i).height();
//		let oriHeight = $("#admin_card_box"+suffix+i).height();
//		$("#admin_card_box"+suffix+i).height(oriHeight+tmpHeight-21);

		let adminInfo = getAdminInfoByMonthIndex(adminList[i],monthIndex);
		let tmpDiffdata = adminInfo.data-adminInfo.lastmonth_data;

		let tmpSvgArrow = "";
		let tmpSvGSign = "";
		let tmpColor = "";

		if(tmpDiffdata === 0 ) {
			continue;
		}	else if(tmpDiffdata < 0 ){
			 tmpSvgArrow = svgArrowDown;
			 tmpSvgSign = svgSignMinus;
			 tmpColor = "#41c35a";
		} else {
			tmpSvgArrow = svgArrowUP;
			tmpSvgSign = svgSignPlus;
			tmpColor = "#ed6565"
		}
		let arrowElement = document.getElementById('admin_arrow'+suffix+i);
		let signElement = document.getElementById('admin_sign'+suffix+i);
		arrowElement.innerHTML = tmpSvgArrow;
		signElement.innerHTML = tmpSvgSign;
		setSvgColor(arrowElement,tmpColor);
		setSvgColor(signElement,tmpColor);

	}
}

/** function called on click event of page */
function loadedAdminPageOnclickEvent(e, clickedIndex, clickedObj) {
  var clickedObj_id = e.currentTarget.id;
  adminObject.clicked_index = clickedObj_id.split('_')[1];
  adminObject.clicked_id = clickedObj_id;
  adminObject.originalclicked_id = clickedObj_id;

  let config = { cb: () => { adminCardOnClick(); } };
  rippleManager.set(e, config);
}



function requestAdminCard(){
	//console.log("requestAdminCard");
	adminObject.card_status="loading";
	setTimeout(window.requestAdminData, 0);
}

function requestAdminData() {
	//console.log("requestAdminData");
	var input_arg;
	var currentMonth = new Date();
	var month = (currentMonth.getMonth()+1);

	var requestBody = rsapi_getAdminData((currentMonth.getFullYear()).toString(), month.toString(), 18); // 18 months;
	promiseSendRequestWithTimeout(requestBody)
	.then((response) => parseAdminData(response))
	.catch((e) => sendRequestExceptionHandlerForAdmin());
}

function sendRequestExceptionHandlerForAdmin() {
	if (serviceMain.currentDivString === "mainScreen" && adminObject.card_status !== "loaded") {
		adminObject.card_status = "unloaded";
		drawAdminCard(0);
		showRequestErrorDialog();
	}
}

function toAdminChartData(data,number) {
	var floatingPointNumber = ADMIN_FLOATING_POINT_NUMBER;
	if(number !== undefined) floatingPointNumber = number;
	// console.log(number, floatingPointNumber);
	if( data > 100) floatingPointNumber = 0;
	return  parseFloat(parseFloat(data).toFixed(floatingPointNumber));
}

function makeAdminFullData(adminlist, number){

	var tmpList=[];

	var today = new Date();

	var tmpMonth = parseInt(today.getMonth()+1);
	var tmpYear = parseInt(today.getFullYear());

	if(adminlist) {
		adminlist.sort( function(a,b){
			if( parseInt(a.period.year) === parseInt(b.period.year) )
			{
				return parseInt(a.period.month) > parseInt(b.period.month) ? -1 : parseInt(a.period.month) < parseInt(b.period.month) ? 1 : 0;
			} else {
				return parseInt(a.period.year) > parseInt(b.period.year) ? -1 : parseInt(a.period.year) < parseInt(b.period.year) ? 1 : 0;
			}
		});
	}

	for(var i =0, j=0; i < ADMIN_MAX_FULL_DATA; i++) {
		var bDataExist = false;

		if(adminlist) {
			if( adminlist[j]) {
				if( (tmpMonth === parseInt(adminlist[j].period.month)) && (tmpYear === parseInt(adminlist[j].period.year)) ) {
					tmpList[i] = adminlist[j];
					tmpList[i].bill.total = toAdminChartData(tmpList[i].bill.total, number);

					tmpList[i].bill.electricity = toAdminChartData(tmpList[i].bill.electricity, number);
					tmpList[i].bill.water = toAdminChartData(tmpList[i].bill.water, number);
					tmpList[i].bill.heating = toAdminChartData(tmpList[i].bill.heating, number);
					tmpList[i].bill.individual_mgmt = toAdminChartData(tmpList[i].bill.individual_mgmt, number);
					tmpList[i].bill.general_mgmt = toAdminChartData(tmpList[i].bill.general_mgmt, number);
					tmpList[i].bill.etc = toAdminChartData(tmpList[i].bill.etc, number);
					tmpList[i].bill.late_fee = toAdminChartData(tmpList[i].bill.late_fee, number);
					tmpList[i].average = toAdminChartData(tmpList[i].average, number);

					var tmpdueDate = (tmpList[i].due_date).split("-");
					tmpList[i].dueDate = {
						year : ""+tmpdueDate[0],
						month : ""+tmpdueDate[1],
						day : ""+tmpdueDate[2]
					};

					if(toAdminChartData(tmpList[i].bill.total) !== toAdminChartData(0)) adminObject.existdata = true;
					bDataExist=true;
					j++;
				}
			}
		}
		//console.log(tmpList);

		if(bDataExist === false) {
			tmpList[i] = {
				period:{
					year: ""+tmpYear,
					month: "" + tmpMonth
				},
				bill:{
					total : toAdminChartData(0),
					electricity : toAdminChartData(0),
					water : toAdminChartData(0),
					heating : toAdminChartData(0),
					individual_mgmt : toAdminChartData(0),
					general_mgmt : toAdminChartData(0),
					etc : toAdminChartData(0),
					late_fee : toAdminChartData(0)
				},
				dueDate: {
					year: "",
					month: "",
					day: ""
				},
				average: toAdminChartData(0)
			};
		}

		if(tmpMonth === 1) {
			tmpYear--;
			tmpMonth=12;
		} else {
			tmpMonth--;
		}

	}

	//console.log(tmpList);
	return tmpList;
}

function parseAdminData(response) {
	if(response.result.status === RESPONSE_OK){
		//console.log("!!!!!",response.data.list)
		adminObject.curmonth = response.data.curmonth;
		adminObject.count = response.data.count;
		adminObject.list = makeAdminFullData(response.data.list,0);
	}else if(response.result.status === RESPONSE_NO_DATA){
/*		adminObject.elecloaded = true;
		adminObject.eleccount = 0; */
	}else{
		// Error Exception
 	 	throw new Error(response.result.message);
	}
	adminObject.card_status = "loaded";
	drawAdminCard(0)
}

/****************** draw chart *********************/

var adminMonthlyChartList=[];
var adminMonthlyChart1;
var adminMonthlyChart_label;
var admin_m2c_monthly=[];
var admin_monthly_chartdatalist=[];
/* Change a backgroundColor of Dataset
var admin_monthly_initbgcolorlist=[]; */
function drawAdminPageMonthlyChart(admin,monthIndex){

	var maxMonth = ADMIN_MAX_MONTH_MONTHLY;

	for(var i=0; i < maxMonth; i++ ){
		if(adminMonthlyChartList[i]) adminMonthlyChartList[i].destroy();
	}
	if(adminMonthlyChart_label) adminMonthlyChart_label.destroy();


	var adminData = getAdminInfoByMonthIndex(admin,monthIndex);
	var admin_monthly_labellist=[];
	var admin_monthly_bgcolorlist=[];
	var maxValue = 0;

	var canvas_label = document.getElementById("admin_monthly_canvas_label");
	var ctx_label = canvas_label.getContext("2d");

	var ctxList =[];
	for(var i=0; i < maxMonth; i++ ){
		ctxList[i] = document.getElementById("admin_monthly_canvas_"+i).getContext("2d");
	}

	for(var i = maxMonth-1, j=0; i >= 0; i--,j++) {
		var tmpData = getAdminInfoByMonthIndex(admin,j);
		var tmpDataList;
		if(maxValue < tmpData.data) maxValue = toAdminChartData(tmpData.data);
		if(maxValue < tmpData.average) maxValue = toAdminChartData(tmpData.average);
		if(maxValue < tmpData.lastyear_data) maxValue = toAdminChartData(tmpData.lastyear_data);

		tmpDataList= {
			data: tmpData.data,
			average: tmpData.average,
			lastyear_data: tmpData.lastyear_data
		}
		admin_monthly_chartdatalist[i] = tmpDataList;
		admin_monthly_labellist[i] = toDateMonthString(tmpData.period.month);
		if(admin_monthly_labellist[i].length < 3) admin_monthly_labellist[i] = " " + admin_monthly_labellist[i] + " ";
		admin_m2c_monthly[i] = j;

	}

	var gradient = ctxList[0].createLinearGradient(0, 0, 0, 200);
	gradient.addColorStop(0, tmpData.chartBgColor.rgba(1.0));
	gradient.addColorStop(1, tmpData.chartBgColor.rgba(0.5));
	admin_monthly_bgcolorlist[i] = gradient;

	var gradient_average = ctxList[0].createLinearGradient(0, 0, 0, 200);
	gradient_average.addColorStop(0, ("#b5b5b5").rgba(1.0));
	gradient_average.addColorStop(1, ("#b5b5b5").rgba(0.5));

	var gradient_last_year = ctxList[0].createLinearGradient(0, 0, 0, 200);
	gradient_last_year.addColorStop(0, ("#707070").rgba(1.0));
	gradient_last_year.addColorStop(1, ("#707070").rgba(0.5));

	if( parseInt(maxValue) === 0 ) {
		maxValue = adminData.defaultMax;
	}

	var stepSize = 0;
	if(maxValue < 20) {
		stepSize = parseFloat((maxValue/5).toFixed(ADMIN_FLOATING_POINT_NUMBER));
	} else {
		stepSize = Math.ceil(maxValue/5);
	}

	//console.log(stepSize);
	//console.log(admin_monthly_bgcolorlist);
	var chart_label = {
		label: admin,
		axisX:{
			reversed:  true
		},
		options: {
			layout: {
				padding: {
					left: 13,
					right: 0,
					top: 5,
					bottom: -10
				}
			},
			maintainAspectRatio: false,
			animation: {
				duration: 1,
			},
//			onClick: adminMonthlyChartClickEvent,
			tooltips: {
				enabled: false
			},
			legend: {
				display: false,
			},
			scales: {
				xAxes: [{
					barThickness : 6,
					display: true,
					gridLines: {
						display: false,
						drawBorder: false,
					},
					scaleLabel: {
						display: true,
					},
					stacked: false,
					ticks: {
						fontSize: 13,
          	fontColor: '#FCFCFC',
						font : "roboto-regular",
					}
				}],
				yAxes: [{
					afterFit: function(scaleInstance){
						scaleInstance.width = 60;
					},
					display: true,
					position: 'right',
					ticks: {
						padding: 6,
						display: false, // labels
						min: 0,
						max: stepSize*5,
						stepSize: stepSize,
						fontSize: 11,
						fontColor: "#858585",
						font : "roboto-regular"
					},
					gridLines: {
						drawBorder: false,
						display: true,
						color: "#E6E6E6",
						lineWidth: 1,
						zeroLineColor: "#E6E6E6",
						zeroLineWidth: 1
					},
					stacked: false,
					barPercentage: 1.0,
					categoryPercentage: 1.0
				}]
			},
			title: {
				display: false,
				text: admin,
				titleAlign:'left'
			}
	  },
	  type: 'bar',
	  data: {
	    labels: ["0"],
	    datasets: [{
				label: ["0"],
	      data: ["0"],
	    }]
	  },

	};

	adminMonthlyChart_label = new Chart(ctx_label, chart_label);
//	document.getElementById("admin_monthly_wrapper_label").style.zIndex = 5;

	var chartList =[];
	for(var i=0; i < maxMonth; i++) {
		var tmpLabelColor = "#858585";
		if( parseInt(monthIndex) === admin_m2c_monthly[i] ) {
			tmpLabelColor = "#505050";
		}

		//console.log(admin_monthly_labellist[i]);

		chartList[i] = {
			label: admin,
			axisX:{
				reversed:  true
			},
			options: {
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 5,
						bottom: -10
					}
				},
				maintainAspectRatio: false,
				animation: {
					duration: 1,
				},
				onClick: adminMonthlyChartClickEvent,
				hover: { mode: "none"},
				tooltips: {
					enabled: false
				},
				legend: {
					display: false
				},
				scales: {
					xAxes: [{
						barThickness : 6,
						display: true,
						gridLines: {
							display: false,
							drawBorder: false,
						},
						scaleLabel: {
							display: true,
						},
						stacked: false,
						ticks: {
							autoSkip: false,
							maxRotation: 0,
							minRotatio:0,
							fontSize: 13,
							fontColor: tmpLabelColor,
							font : "roboto-regular",
						},
						categoryPercentage: 0.6
					}],
					yAxes: [{
						display: true,
						position: 'right',
						ticks: {
							display: false,
							min: 0,
							max: stepSize*5,
							stepSize: stepSize
						},
						gridLines: {
							drawBorder: false,
							display: false,
							color: "#E6E6E6",
							lineWidth: 1,
							zeroLineColor: "#E6E6E6",
							zeroLineWidth: 1
						},
						stacked: false,
						barPercentage: 1.0,
						categoryPercentage: 1.0
					}]
				},
				title: {
					display: false,
					text: admin
				}
			},
			type: 'bar',
			data: {
				labels: [admin_monthly_labellist[i]],
				datasets: [
					{
						data: [admin_monthly_chartdatalist[i].data],
						backgroundColor : gradient,
					},
					{
						data: [admin_monthly_chartdatalist[i].average],
						backgroundColor : gradient_average,
					},
					{
						data: [admin_monthly_chartdatalist[i].lastyear_data],
						backgroundColor : gradient_last_year,
					}
				]
			}
		};
		adminMonthlyChartList[i] = new Chart(ctxList[i], chartList[i]);
	}

	if(screen.width > ADMIN_MAX_GRAPH_WIDTH){  //tablet PC
		$('#admin_monthly_wrapper_canvas').width('width:100%');
	}else{
// labels		$('#admin_monthly_wrapper_canvas').width(maxMonth*88);
		$('#admin_monthly_wrapper_canvas').width(maxMonth*82);
	}

//	if(!admin_animationEnabled) {
// labels			$("#admin_monthly_wrapper" ).scrollLeft( 242 );
	$("#admin_monthly_wrapper" ).scrollLeft( 344 );
//	}

}

function getAdminChartIndexByChartItems(items){
	return items[0]._index;
}

function getAdminMonthIndexByChartIndex(m2c, chartIndex){
	return m2c[chartIndex];
}

function adminMonthlyChartClickEvent(e, array){

	var chartIndex=0;
	if(!array[0]) { // check label click
		for(var i =0 ; i < ADMIN_MAX_MONTH_MONTHLY; i++) {
			if(this === adminMonthlyChartList[i]) {
				//console.log("index = ",i);
				chartIndex = i;
				break;
			}
		}
	}	else { // check element click
		chartIndex = getAdminChartIndexByChartItems(array);
	}


	//var monthIndex = m2c_monthly[chartIndex];
	var monthIndex = getAdminMonthIndexByChartIndex(admin_m2c_monthly,chartIndex);
	//console.log(chartIndex,monthIndex);
	updateAdminMonthlyChart(this.config.label,chartIndex,monthIndex);

}

function updateAdminMonthlyChart(admin,chartIndex,monthIndex){
	// console.log(chartData);
	// console.log(admin_monthly_chartdatalist,chartIndex,monthIndex);
	for(var i = 0; i < ADMIN_MAX_MONTH_MONTHLY; i++) {
		var tmpFontColor = "#858585";
		if(i===parseInt(chartIndex)) tmpFontColor = "#505050";
		adminMonthlyChartList[i].config.options.scales.xAxes[0].ticks.fontColor =tmpFontColor;
		adminMonthlyChartList[i].config.options.animation.duration = 0;
		adminMonthlyChartList[i].update();
	}
	// console.log(chart.config.label,monthIndex);
	drawAdminPageMonthlyHeader(admin,monthIndex);
	// console.log($("#admin_monthly_wrapper" ).scrollLeft());
	//var adminData = getEnergyInfoByMonthIndex(admin,monthIndex);
	//adminData.monthIndex.lyscroll = $("#admin_monthly_wrapper" ).scrollLeft()-1;
}

/****************** drop down list *********************/
var adminMenuConfig ={
  id : "",
  parentCardDivId : "admin_card",
  parentOnClickFunc: function(){adminCardOnClick()}
}

function AdminTotalDropMenu() {}
AdminTotalDropMenu.prototype = {
	id: "",
	dropDownMenu : "",
	contentid: "",
	itemid: "admin_dropitem",
	menuConfig: adminMenuConfig,
	initMenu: function(id,imagepath,funcName) {
		//console.log("@@initMenu",id);
		this.id = id;
		this.dropDownMenu = new BasicDropDownMenu();
		this.contentid = this.dropDownMenu.initBasicMenu(this,imagepath,id);
		this.drawFunctionName = funcName;
	},
	drawFunctionName: "",
	createMenu: function(suffix) {
		createAdminDateDropdownMenu(this,suffix);
	},
	drawTarget: function(param1,param2){
		window[this.drawFunctionName](param1,param2);
	}
}

function createAdminDateDropdownMenu(menu,pageSuffix) {
	var selectedMonth = admin_cardMonth;
	var suffix = "";
	if (pageSuffix) {
		suffix = "_" + pageSuffix;
		selectedMonth = admin_pageMonth;
	}

  var adminDropDown = {
    menuItem: []
  };
  adminDropDown.menuItem = [];

	var contentId = menu.contentid;
	var itemid = menu.itemid;

	//console.log("$$$$$$",adminData);
	for(var i=0; i < ADMIN_MAX_MONTH_MONTHLY; i++) {
		var adminData = getAdminInfoByMonthIndex("total", i);
		var fColor="#000000";
		if( i ===parseInt(selectedMonth)) fColor="var(--brand-color)";

		var date = new Date(adminData.period.year, adminData.period.month-1);
		//console.log(i);
		var options = { year: 'numeric', month: 'long'};
		var tmpItem = {
				    title: "<span id="+itemid+i+suffix+" style='float:left;color:"+fColor+"'>"+ date.toLocaleDateString(lang, options) +"</span>",
				    fun: drawAdminByMenu,
						parameter : { mIndex: i, itemid: itemid, suffix: pageSuffix }
		 };
		adminDropDown.menuItem.push(tmpItem);
	}

	if(pageSuffix) adminPageDropDownMenu.dropDownMenu.setBasicMenu(adminDropDown.menuItem,contentId,adminPageDropDownMenu.menuConfig);
	else adminCardDropDownMenu.dropDownMenu.setBasicMenu(adminDropDown.menuItem,contentId,adminCardDropDownMenu.menuConfig);

}

adminCardDropDownMenu = new AdminTotalDropMenu();
adminPageDropDownMenu = new AdminTotalDropMenu();

function drawAdminByMenu(mIndex,pageSuffix) {
//	var mIndex = e.currentTarget.myParam.mIndex;
//	var pageSuffix = e.currentTarget.myParam.suffix;
	//console.log("drawAdminByMenu",mIndex,pageSuffix);
	if(pageSuffix){
		adminPageDropDownMenu.drawTarget(mIndex);
	}	else {
		adminCardDropDownMenu.drawTarget(mIndex);
	}
}
