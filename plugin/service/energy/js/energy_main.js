/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Energy service shows the amount of energy used before and now.
 * @module service/energy/main
 * @author Home IoT R&D Team
 */

/** The energy type list
 * @constant {enum} */
const arrayEnergy = ["elec","gas","water","hotwater","heating"];
/** menu text list
 * @var {enum} */
var menu_text = [$.lang[lang].TAB_ALL,$.lang[lang].TAB_POWER,$.lang[lang].TAB_GAS_LINE,$.lang[lang].TAB_WATER,$.lang[lang].TAB_HOTWATER,$.lang[lang].TAB_HEATING];

var energyCardDropDownMenu;
var energyPageDropDownMenu;
String.prototype.energyValueText = function (emsData,bColor) {

	if(!this) {
		if(bColor) return $.lang[lang].ENERGYPAGE_NO_RECORD.fmodify(emsData.chartBgColor,"bold");
		else return $.lang[lang].ENERGYPAGE_NO_RECORD;
	}

	if(toEnergyChartData(this) === toEnergyChartData(0)) {
		if(bColor) return $.lang[lang].ENERGYPAGE_NO_RECORD.fmodify(emsData.chartBgColor,"bold");
		else return $.lang[lang].ENERGYPAGE_NO_RECORD;
	}

	if(toEnergyChartData(this) === toEnergyChartData(-1)) {
		if(bColor) return "0".fmodify(emsData.chartBgColor,"bold");
		else return "0";
	}

	if(bColor)
		return this.fmodify(emsData.chartBgColor,"bold");
	else
		return this + " ";
};

/*
window.chartColors = {
	power: 'rgb(64, 155, 222)',
	water: 'rgb(53, 196, 218)',
	heating: 'rgb(252, 199, 38)',
	gas: 'rgb(156, 210, 98)',
	now: '#3695dd',
	diff: '#dbdbdb',
	power_hex: '#409bde',
	water_hex: '#35c4da',
	heating_hex: '#fcc726',
	gas_hex: '#9cd262',
	now_hex: '#3695dd',
	diff_hex: '#dbdbdb'
};
*/

function toEnergyChartData(data,number) {
	var floatingPointNumber = FLOATING_POINT_NUMBER;
	if(number !== undefined) floatingPointNumber = number;
	// console.log(number, floatingPointNumber);
	if( data > 100) floatingPointNumber = 0;
	return  parseFloat(parseFloat(data).toFixed(floatingPointNumber));
}

var enableDonut = false;

var epMonthlyChartList=[];
var epMonthlyChart_label;
var chartObserver;
var epCompareChart=[];
var epCompareChart_label;
var chartResized = false;
var animationEnabled = 1;

var defaultEnergyIndex = -1;
var et_body_energylist = [];
function enableEnergyService(){
	let serviceIndex=0;
	if(emsObject.elec_enabled){
		if(defaultEnergyIndex===-1) defaultEnergyIndex=0;
		et_body_energylist[serviceIndex++]=arrayEnergy[0];
	}
	if(emsObject.gas_enabled){
		if(defaultEnergyIndex===-1) defaultEnergyIndex=1;
		et_body_energylist[serviceIndex++]=arrayEnergy[1];
	}
	if(emsObject.water_enabled){
		if(defaultEnergyIndex===-1) defaultEnergyIndex=2;
		et_body_energylist[serviceIndex++]=arrayEnergy[2];
	}
	if(emsObject.hotwater_enabled){
		if(defaultEnergyIndex===-1) defaultEnergyIndex=3;
		et_body_energylist[serviceIndex++]=arrayEnergy[3];
	}
	if(emsObject.heating_enabled){
		if(defaultEnergyIndex===-1) defaultEnergyIndex=4;
		et_body_energylist[serviceIndex++]=arrayEnergy[4];
	}
	emsObject.numOfEnergyService = serviceIndex;
//	energySelf.energyIndex.total.lm = defaultEnergyIndex;
//	energySelf.energyIndex.total.ly = defaultEnergyIndex;
}

function setEnergyServices(energyNameFromServer){

    //console.log("setEnergyServices",energyNameFromServer);
    for(let i=0; i < energyNameFromServer.length ; i++) {
      if(energyNameFromServer[i] === arrayEnergy[0]) emsObject.elec_enabled = true;
      else if(energyNameFromServer[i] === arrayEnergy[1]) emsObject.gas_enabled = true;
      else if(energyNameFromServer[i] === arrayEnergy[2]) emsObject.water_enabled = true;
      else if(energyNameFromServer[i] === arrayEnergy[3]) emsObject.hotwater_enabled = true;
      else if(energyNameFromServer[i] === arrayEnergy[4]) emsObject.heating_enabled = true;
    }
    enableEnergyService();
    return emsObject.numOfEnergyService;
}

function resetEnergyMonthIndex(){
	var tmpMonthIndex = {
			total: { lm : energySelf.monthIndex.total.lm, ly: DEFAULT_ENERGY_MONTH_INDEX },
			elec: { lm : DEFAULT_ENERGY_MONTH_INDEX, ly: DEFAULT_ENERGY_MONTH_INDEX, lyscroll: DEFAULT_SCROLL_LEFT_VALUE},
			gas: { lm : DEFAULT_ENERGY_MONTH_INDEX, ly: DEFAULT_ENERGY_MONTH_INDEX, lyscroll: DEFAULT_SCROLL_LEFT_VALUE},
			water: { lm : DEFAULT_ENERGY_MONTH_INDEX, ly: DEFAULT_ENERGY_MONTH_INDEX, lyscroll: DEFAULT_SCROLL_LEFT_VALUE},
			hot_water: { lm : DEFAULT_ENERGY_MONTH_INDEX, ly: DEFAULT_ENERGY_MONTH_INDEX, lyscroll: DEFAULT_SCROLL_LEFT_VALUE},
			heating: { lm : DEFAULT_ENERGY_MONTH_INDEX, ly: DEFAULT_ENERGY_MONTH_INDEX, lyscroll: DEFAULT_SCROLL_LEFT_VALUE}
		};
	energySelf.monthIndex = tmpMonthIndex;
}

/** load page */
function loadedEnergyPage(service) {
	drawActionBar(false);

	if (isFHub()) {
		scplugin.manager.setFlag("openAdditionalPage");
	}

	setEnergyIndex();
	initEnergyPage();
	showContentLoadingPage(true, energySelf);

	energySelf.energyIndex.total.ly = defaultEnergyIndex;
	drawEnergyPage('total', energySelf.monthIndex.total.lm);

	if (lang === "en") {
		$('.energy_card_total_chart_layer').css('padding-left', '19px');
		$('.energy_card_total_chart_layer').css('padding-right', '19px');
	}

	return 0;
}

/** initiate scroll animation */
function initScorllAnimation() {
	var mask = $("#ep_monthly_wrapper");
	var canvas = $("#ep_monthly_wrapper_canvas");
	var numScrollLeft = 0;
	var maskWidth = mask.width();
	var canvasWidth = canvas.width();
	numScrollLeft = canvasWidth - maskWidth;

	mask.stop().animate(
		{ scrollLeft:numScrollLeft },
		300,
		'linear'
	);

	for(var i=0; i < EMS_MAX_MONTH_MONTHLY; i++) {
		var tmpChart = $("#ep_monthly_canvas_"+i);
		var original_width = tmpChart.width();
		tmpChart.animate({paddingLeft:500},0,'easeInOutQuint').animate({paddingLeft:0},1080+30*i,'easeInOutQuint');
	}
}

function setCompleteChartAnimation(id) {
	$("#"+id).on("webkitAnimationEnd oAnimationEnd msAnimationEnd animationend", function(e) {
  	$(this).removeClass("chart_animation");
		// console.log($("#"+this.id));
		animationEnabled=0;
		initScorllAnimation();
	});
}

function createEnergyOptionMenu(service) {
	var energyMenuArr = {
		menuItem: []
	};

	console.debug(PACKAGE, "mainScreen", "createOptionMenu");
	setActionBarMenu("visible");

	//addPageMenu("add", energyMenuArr.menuItem, $.lang[lang].ADDHOMECARD, service.cardInfo.list[0]);
	//addPageMenu("remove", energyMenuArr.menuItem, $.lang[lang].REMOVEHOMECARD, service.cardInfo.list[0]);

	setMenu(energyMenuArr.menuItem,service);

	return energyMenuArr;
}

/********** EMS Data ***********/

function requestEnergyCard() {

	emsObject.card_status="loading";
	emsObject.elecloaded = false;
	emsObject.waterloaded = false;
	emsObject.gasloaded = false;
	emsObject.hotwaterloaded = false;
	emsObject.heatingloaded = false;

	setTimeout(window.requestEnergyElecData, 0);
	setTimeout(window.requestEnergyWaterData, 0);
	setTimeout(window.requestEnergyGasData, 0);
	setTimeout(window.requestEnergyHotWaterData, 0);
	setTimeout(window.requestEnergyHeatingData, 0);
}


function requestEnergyElecData() {

	if(emsObject.elec_enabled === false) return;

	var input_arg;
	var currentMonth = new Date();
	var year = currentMonth.getFullYear();
	var month = (currentMonth.getMonth()+1);
	var requestBody = rsapi_getEnergyElecData(year, parseInt(month), 18); // 18 months;
	//pluginService.sendRequest(requestBody, requestEnergyElecDataCallback);
	promiseSendRequestWithTimeout(requestBody)
	.then((response) => parseEnergyElecData(response))
	.catch((e) => sendRequestExceptionHandlerForEnergy());
}

// function requestEnergyElecDataCallback(_result_, _json_) {
// 	var response = checkJasonData("Energy", _result_, _json_);
// 	if (response != null) {
// 		parseEnergyElecData(response);
// 	}
// }

function parseEnergyElecData(response) {
	if(response.result.status === RESPONSE_OK){
		emsObject.curmonth = response.data.curmonth;
		emsObject.eleccount = response.data.count;
		emsObject.eleclist = makeEnergyFullData(response.data.list,2);
		emsObject.elecloaded = true;
		hideEnergyCard();
	}else if(response.result.status === RESPONSE_NO_DATA){
		emsObject.elecloaded = true;
		emsObject.eleccount = 0;
		hideEnergyCard();
  }else{
		// Error Exception
 	 	throw new Error(response.result.message);
	}
}

function requestEnergyWaterData() {

	if(emsObject.water_enabled === false) return;

	var input_arg;
	var currentMonth = new Date();
	var year = currentMonth.getFullYear();
	var month = (currentMonth.getMonth()+1);
	var requestBody = rsapi_getEnergyWaterData(year, parseInt(month), 18); // 18 months
	//pluginService.sendRequest(requestBody, requestEnergyWaterDataCallback);
	promiseSendRequestWithTimeout(requestBody)
	.then((response) => parseEnergyWaterData(response))
	.catch((e) => sendRequestExceptionHandlerForEnergy());
}

// function requestEnergyWaterDataCallback(_result_, _json_) {
// 	var response = checkJasonData("Energy", _result_, _json_);
// 	if (response != null) {
// 		parseEnergyWaterData(response);
// 	}
// }

function parseEnergyWaterData(response) {
	if(response.result.status === RESPONSE_OK){
		emsObject.curmonth = response.data.curmonth;
		emsObject.watercount = response.data.count;
		emsObject.waterlist = makeEnergyFullData(response.data.list);
		emsObject.waterloaded = true;
		hideEnergyCard();
 }else if(response.result.status === RESPONSE_NO_DATA){
	 emsObject.waterloaded = true;
	 emsObject.watercount = 0;
	 hideEnergyCard();
 }else{
	  // Error Exception
	  throw new Error(response.result.message);
 }
}


function requestEnergyGasData() {

	if(emsObject.gas_enabled === false) return;

	var input_arg;
	var currentMonth = new Date();
	var year = currentMonth.getFullYear();
	var month = (currentMonth.getMonth()+1);
	var requestBody = rsapi_getEnergyGasData(year, parseInt(month), 18);
	//pluginService.sendRequest(requestBody, requestEnergyGasDataCallback);
	promiseSendRequestWithTimeout(requestBody)
	.then((response) => parseEnergyGasData(response))
	.catch((e) => sendRequestExceptionHandlerForEnergy());
}

// function requestEnergyGasDataCallback(_result_, _json_) {
// 	var response = checkJasonData("Energy", _result_, _json_);
// 	if (response != null) {
// 		parseEnergyGasData(response);
// 	}
// }

function parseEnergyGasData(response) {
	if(response.result.status === RESPONSE_OK){
		emsObject.curmonth = response.data.curmonth;
		emsObject.gascount = response.data.count;
		emsObject.gaslist = makeEnergyFullData(response.data.list);
		emsObject.gasloaded = true;
		hideEnergyCard();
 }else if(response.result.status === RESPONSE_NO_DATA){
		emsObject.gasloaded = true;
		emsObject.gascount = 0;
		hideEnergyCard();
 }else{
	  // Error Exception
	  throw new Error(response.result.message);
 }
}


function requestEnergyHotWaterData() {

	if(emsObject.hotwater_enabled === false) return;

	var input_arg;
	var currentMonth = new Date();
	var year = currentMonth.getFullYear();
	var month = (currentMonth.getMonth()+1);
	var requestBody = rsapi_getEnergyHotWaterData(year, parseInt(month), 18);
	//pluginService.sendRequest(requestBody, requestEnergyHotWaterDataCallback);
	promiseSendRequestWithTimeout(requestBody)
	.then((response) => parseEnergyHotWaterData(response))
	.catch((e) => sendRequestExceptionHandlerForEnergy());
}

// function requestEnergyHotWaterDataCallback(_result_, _json_) {
// 	var response = checkJasonData("Energy", _result_, _json_);
// 	if (response != null) {
// 		parseEnergyHotWaterData(response);
// 	}
// }

function parseEnergyHotWaterData(response) {
	if(response.result.status === RESPONSE_OK){ // okay
		emsObject.curmonth = response.data.curmonth;
		emsObject.hotwatercount = response.data.count;
		emsObject.hotwaterlist = makeEnergyFullData(response.data.list);
		emsObject.hotwaterloaded = true;
		hideEnergyCard();
	}else if(response.result.status === RESPONSE_NO_DATA){ // no data
		emsObject.hotwatercount = 0;
		emsObject.hotwaterloaded = true;
		hideEnergyCard();
  }else{
		// Error Exception
  	throw new Error(response.result.message);
	}
}


function requestEnergyHeatingData() {

	if(emsObject.heating_enabled === false) return;

	var input_arg;
	var currentMonth = new Date();
	var year = currentMonth.getFullYear();
	var month = (currentMonth.getMonth()+1);
	var requestBody = rsapi_getEnergyHeatingData(year, parseInt(month), 18);
	//pluginService.sendRequest(requestBody, requestEnergyHeatingDataCallback);
	promiseSendRequestWithTimeout(requestBody)
	.then((response) => parseEnergyHeatingData(response))
	.catch((e) => sendRequestExceptionHandlerForEnergy());
}

function sendRequestExceptionHandlerForEnergy() {
	if (serviceMain.currentDivString === "mainScreen" && emsObject.card_status !== "loaded") {
		emsObject.card_status = "unloaded";
		energyService.drawCard(energySelf.monthIndex.total.lm,energySelf.energyIndex.total.lm, undefined, true);
		showRequestErrorDialog();
	}
}

// function requestEnergyHeatingDataCallback(_result_, _json_) {
// 	var response = checkJasonData("Energy", _result_, _json_);
// 	if (response != null) {
// 		parseEnergyHeatingData(response);
// 	}
// }

function parseEnergyHeatingData(response) {
	if(response.result.status === RESPONSE_OK){ // okay
		emsObject.curmonth = response.data.curmonth;
		emsObject.heatingcount = response.data.count;
		emsObject.heatinglist = makeEnergyFullData(response.data.list);
		emsObject.heatingloaded = true;
		hideEnergyCard();
	}else if(response.result.status === RESPONSE_NO_DATA){ // no data
     emsObject.heatingloaded = true;
		 emsObject.heatingcount = 0;
		 hideEnergyCard();
  }else{
		// Error Exception
 	 	throw new Error(response.result.message);
	}
}

function isHideEnergyStatus(bEnabled, bLoaded){
	let tmpEnergyEnabled = bEnabled;
	let tmpEnergyLoaded =  bLoaded;

	if(tmpEnergyEnabled === true){
		if(tmpEnergyLoaded === true) return false;
	} else {
		return false;
	}
	return true;
}

function hideEnergyCard() {
	//	console.log(emsObject);
	let bHideElecCard = isHideEnergyStatus(emsObject.elec_enabled, emsObject.elecloaded);
	let bHideWaterCard = isHideEnergyStatus(emsObject.water_enabled, emsObject.waterloaded);
	let bHideGasCard = isHideEnergyStatus(emsObject.gas_enabled, emsObject.gasloaded);
	let bHideHotwaterCard = isHideEnergyStatus(emsObject.hotwater_enabled, emsObject.hotwaterloaded);
	let bHideHeatingCard = isHideEnergyStatus(emsObject.heating_enabled, emsObject.heatingloaded);

	if (  bHideElecCard === false &&
				bHideWaterCard === false &&
				bHideGasCard === false &&
				bHideHotwaterCard === false &&
				bHideHeatingCard === false
				) {
		emsObject.card_status = "loaded";
		energyService.drawCard(energySelf.monthIndex.total.lm,energySelf.energyIndex.total.lm,false, true);
		enableEnergyCardInview();
		clearTimeout(firstLoadingTimer);
	}
}

/** create all data */
function makeEnergyFullData(energylist, number){

	var tmpList=[];

	var today = new Date();

	var tmpMonth = parseInt(today.getMonth()+1);
	var tmpYear = parseInt(today.getFullYear());

	if(energylist) {
		energylist.sort( function(a,b){
			if( parseInt(a.year) === parseInt(b.year) )
			{
				return parseInt(a.month) > parseInt(b.month) ? -1 : parseInt(a.month) < parseInt(b.month) ? 1 : 0;
			} else {
				return parseInt(a.year) > parseInt(b.year) ? -1 : parseInt(a.year) < parseInt(b.year) ? 1 : 0;
			}
		});
	}

	for(var i =0, j=0; i < EMS_MAX_FULL_DATA; i++) {
		var bDataExist = false;

		if(energylist) {
			if( energylist[j]) {
				if( (tmpMonth === parseInt(energylist[j].month)) && (tmpYear === parseInt(energylist[j].year)) ) {
					tmpList[i] = energylist[j];
					//console.log(number);
					energylist[j].month = "" + parseInt(energylist[j].month);
					tmpList[i].value = "" + toEnergyChartData(tmpList[i].value, number);
					if(toEnergyChartData(energylist[j].value) !== toEnergyChartData(0)) emsObject.existdata = true;
					bDataExist=true;
					j++;
				}
			}
		}

		if(bDataExist === false) {
			tmpList[i] = { year:""+tmpYear, month: "" + tmpMonth, value: ""+0 };
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


/**************************** draw ********************************/

function getEnergyInfoByMonthIndex(energy, monthIndex) {

	var retValue;

	switch (energy) {
		case arrayEnergy[0]:
			retValue = {
				emsChartName: "powerChart",
				emsChartIndex: parseInt(emsObject.elecindex),
				emsNumber: 0, /* arrayEnergy Index */
				enabled: emsObject.elec_enabled,
				data: emsObject.eleclist[monthIndex],
				lastyear_data: emsObject.eleclist[monthIndex+12],
				lastmonth_data: emsObject.eleclist[monthIndex+1],
				count: emsObject.eleccount,
				length: emsObject.eleclist.length,
				list: emsObject.eleclist,
				chartBgColor: "#579DFF",
				imageName: "home_ic_device_electricity",
				labelText: $.lang[lang].TAB_POWER,
				unitText: "kWh",
				textColor: "#579DFF",
				defaultMax: 1000,
				monthIndex: energySelf.monthIndex.elec
			};
			break;
		case arrayEnergy[1]:
			retValue = {
				emsChartName: "gasChart",
				emsChartIndex: parseInt(emsObject.gasindex),
				emsNumber: 1, /* arrayEnergy Index */
				enabled: emsObject.gas_enabled,
				data: emsObject.gaslist[monthIndex],
				lastyear_data: emsObject.gaslist[monthIndex+12],
				lastmonth_data: emsObject.gaslist[monthIndex+1],
				count: emsObject.gascount,
				length: emsObject.gaslist.length,
				list: emsObject.gaslist,
				chartBgColor: "#7D79FF",
				imageName: "home_ic_device_gas",
				labelText: $.lang[lang].TAB_GAS_LINE,
				unitText: "㎥",
				textColor: "#7D79FF",
				defaultMax: 1.5,
				monthIndex: energySelf.monthIndex.gas
			};
			break;
		case arrayEnergy[2]:
			retValue = {
				emsChartName: "waterSupplyChart",
				emsChartIndex: parseInt(emsObject.waterindex),
				emsNumber: 2, /* arrayEnergy Index */
				enabled: emsObject.water_enabled,
				data: emsObject.waterlist[monthIndex],
				lastyear_data: emsObject.waterlist[monthIndex+12],
				lastmonth_data: emsObject.waterlist[monthIndex+1],
				count: emsObject.watercount,
				length: emsObject.waterlist.length,
				list: emsObject.waterlist,
				chartBgColor: "#68C6E8",
				imageName: "home_ic_device_water",
				labelText: $.lang[lang].TAB_WATER,
				unitText: "㎥",
				textColor: "#68C6E8",
				defaultMax: 20,
				monthIndex: energySelf.monthIndex.water
			};
			break;
		case arrayEnergy[3]:
			retValue = {
				emsChartName: "hotwaterSupplyChart",
				emsChartIndex: parseInt(emsObject.hotwaterindex),
				emsNumber: 3, /* arrayEnergy Index */
				enabled: emsObject.hotwater_enabled,
				data: emsObject.hotwaterlist[monthIndex],
				lastyear_data: emsObject.hotwaterlist[monthIndex+12],
				lastmonth_data: emsObject.hotwaterlist[monthIndex+1],
				count: emsObject.hotwatercount,
				length: emsObject.hotwaterlist.length,
				list: emsObject.hotwaterlist,
				chartBgColor: "#F6805C",
				imageName: "home_ic_device_hot_water",
				labelText: ($.lang[lang].TAB_HOTWATER).replace(/&nbsp/g, ' '),
				unitText: "㎥",
				textColor: "#F69F5C",
				defaultMax: 10,
				monthIndex: energySelf.monthIndex.hot_water
			};
			break;
		case arrayEnergy[4]:
			retValue = {
				emsChartName: "heatingChart",
				emsChartIndex: parseInt(emsObject.heatingindex),
				emsNumber: 4, /* arrayEnergy Index */
				enabled: emsObject.heating_enabled,
				data: emsObject.heatinglist[monthIndex],
				lastyear_data: emsObject.heatinglist[monthIndex+12],
				lastmonth_data: emsObject.heatinglist[monthIndex+1],
				count: emsObject.heatingcount,
				length: emsObject.heatinglist.length,
				list: emsObject.heatinglist,
				chartBgColor: "#FACF61",
				imageName: "home_ic_device_thermostat",
				labelText: $.lang[lang].TAB_HEATING,
				unitText: "MWh",
				textColor: "#FACF61",
				defaultMax: 1.5,
				monthIndex: energySelf.monthIndex.heating
			};
			break;
	}

	return retValue;
}

function initEnergyMainBanner() {
	let bannerId = "";
	let bannerUri = "energyCardOnClick()";

	document.getElementById('mainBannerWrapper').innerHTML +=
		"<div id='" + bannerId + "' class='swiper-slide mainBannerSwiper' onclick='" + bannerUri + "'></div>";

}

function energyMenuDownEnd(){
	energyCardDropDownMenu.dropDownMenu.basicMenuDownEnd();
}

function enableEnergyCardInview(){
	$("#ems_card_inview").one('inview', function (event, visible, visiblePartX, visiblePartY) {
		if( visible === true ) {
			energyService.drawCard(energySelf.monthIndex.total.lm,energySelf.energyIndex.total.lm);
		}
	});
}


function initEnergyCardCommon(index,cardInfo){

	if (document.getElementById('energy_card_title') === null) return false;
	document.getElementById('energy_card_title').innerHTML = drawServiceCardEditerImage($.lang[lang].ENERGY_TAB, 'energy_card_title_detail');

	var inner_html =
		"<div id='ems_card_summary'></div>" +
//		"<div id='ems_donut'></div>" +
		"<div style='float:left'>" +
			"<div class='ems_card_inview_css' ></div>"+
			"<div class='ems_card_inview_css' ></div>"+
			"<div id='ems_card_inview' class='ems_card_inview_css' ></div>"+
		"</div>" +
		"<div id='ems_card_body' ></div>"+
		"<div id='ems_card_body_none'></div>";
	document.getElementById('ems_card_enable').innerHTML = inner_html;

	cardInfo.bEnabledCard = true;
  cardInfo.initCardOrder = index;
  cardInfo.nCardOrder = index;
  cardInfo.title = $.lang[lang].ENERGY_TAB;

  return true;
}

/** initiate favorite catd */
function initEnergyCard(index,cardInfo) {

	var initHtml = "<div id='energy_card' class='servicecards motion_card' onclick='energyMenuDownEnd();energyCardOnClick()'></div>"
	document.getElementById('sortableDiv_' + index).innerHTML = initHtml;

	var initHtml =
		"<div class='servicecards_title_space'>" +
			"<div id='energy_card_title' ></div>" +
			"<div class='clear'></div>" +
			"</div>" +
			"<div class='servicecards_data_space'>" +
				"<div id='ems_card_enable' class='energycard_data'></div>" +
				"<div id='ems_card_disable'>1</div>" +
			"</div>" +
		"</div>";
	document.getElementById('energy_card').innerHTML = initHtml;

	initEnergyCardCommon(index,cardInfo)
	initEnergyTotalSummary('ems_card_summary');
	initEnergyTotalBody('ems_card_body');
}

/** initiate summary on favorite card */
function initEnergyTotalSummary(summary_id,pageSuffix) {
	var suffix = "";
	var yearTextStyle = "font-weight:bold;"
	if (pageSuffix) {
		suffix = "_" + pageSuffix;
		yearTextStyle = "";
	}

	var tmpYearMonthDiv =
		"<div id='ems_year_text" + suffix + "' class='ems_year_text_css' style='margin-left:12px;"+yearTextStyle+"' onclick=event.cancelBubble=true;> </div>" +
		"<div id='ems_month_text" + suffix + "' class='ems_month_text_css' style='margin-left:6px' onclick=event.cancelBubble=true;> </div>";

	if(lang === "en"){
		tmpYearMonthDiv =
			"<div id='ems_month_text" + suffix + "' class='ems_month_text_css ' style='margin-left:12px;' onclick=event.cancelBubble=true;> </div>"+
			"<div id='ems_year_text" + suffix + "' class='ems_year_text_css' style='margin-left:6px;"+yearTextStyle+"' onclick=event.cancelBubble=true;> </div>";
	}

	document.getElementById(summary_id).innerHTML =
		"<div style='margin-bottom:30px;'>" +
			"<div class='et_date_css'>" +
//				"<select>"+
					tmpYearMonthDiv +
					"<div id='ems_drop_button" + suffix + "' style='float:left' onclick=event.cancelBubble=true;>"+
					"</div>" +
//				"</select>"+
			"</div>" +
			"<div class='clear' ></div>" +
			"<div id='et_sub" + suffix + "' class='et_sub_css'>" +
				"<span id='et_sub_text" + suffix + "' class='et_sub_text_css'> </span>" +
			"</div>" +
		"</div>";
//		"<div class='bar' style='width:auto;background-color:#ebebeb'></div>";

	if(suffix) energyPageDropDownMenu.initMenu("ems_drop_button"+suffix,"res/img/home_button_expand_open_dark.png","drawEnergyPage");
	else energyCardDropDownMenu.initMenu("ems_drop_button"+suffix,"res/img/home_button_expand_open_dark.png","drawEnergyCard");

	let monthButton = document.getElementById('ems_drop_button' + suffix);
	monthButton.parentElement.addEventListener('touchstart', (e) => { energyMenuAction(e, suffix); }, {passive: true});
	monthButton.parentElement.addEventListener('click', (e) => { e.stopPropagation(); }, {capture: false});
}

function energyMenuAction(e,suffix){
	energyCardDropDownMenu.menuConfig.id = "ems_drop_button"+suffix;
	callBasicMenuAction(e,"ems_drop_button"+suffix,energyCardDropDownMenu.menuConfig);
}


var isCalledInviewOnLastYearChart = true;

function initEnergyTotalBody(body_id,pageSuffix) {
	var suffix = "";
	var inHtml = "";

	if (pageSuffix) {
		suffix = "_" + pageSuffix;
		inHtml =
				"<div class='basic_subheader' style='margin-top:12px'>" +
				"<div id='et_title"+suffix+"' class='basic_subheader_text' >"+
				"</div>" +
				"<div class='basic_subheader_divider' >" +
		 		"</div>" +
				"</div>";
		inHtml +=
		"<div class='servicecards ems_chart_body_page_css' style='margin-bottom:0px;'>";
	} else {
		inHtml ="<div class='servicecards_card_list ems_chart_body_card_css'>";
	}


	inHtml +=
		"<div>"+
			"<div id='et_body_summary"+suffix+"' class='ems_chart_title'>" +
			"</div>" +
			"<div class='clear' style='height:4px'></div>" +
			"<div id='et_body_summary_diff"+suffix+"' class='ems_chart_title'>" +
			"</div>"+
			"<div class='clear' style='height:17px'></div>" +
		"</div>";

	if(pageSuffix === "eply") {
		inHtml +=
			"<div style='float:left'>" +
				"<div class='ems_card_inview_css' style='height:66px'></div>"+
				"<div class='ems_card_inview_css' style='height:66px'></div>"+
				"<div id='ep_total_body_lastyear_inview' class='ems_card_inview_css' style=''></div>"+
			"</div>";
	}

	let tmpPadding = 72;
	if(suffix) tmpPadding = 56;

	inHtml +=
		"<div id='et_body_chart_divs"+suffix+"' onclick='event.cancelBubble=true;' style='position:absolute;width:calc(100% - "+tmpPadding+"px);height:200px;'></div>"+
		"<div id='et_body_chart_div_label"+suffix+"' onclick='event.cancelBubble=true;' style='width:calc(100%);height:200px'>"+
		"</div>"+
		"<div id='et_body_chart_sublabel'></div>"
		"</div>";
	document.getElementById(body_id).innerHTML = inHtml;

	document.getElementById("et_body_chart_div_label"+suffix).innerHTML =
		"<canvas id='et_body_canvas_label"+suffix+"' width="+$("#et_body_chart_div_label"+suffix).width()+" height='200'></canvas>";


}

function setEnergyIndex(suffix){
	for(var i=0; i <et_body_energylist.length; i++) {
		if(et_body_energylist[i]==="elec") emsObject.elecindex = i;
		else if(et_body_energylist[i]==="gas") emsObject.gasindex = i;
		else if(et_body_energylist[i]==="water") emsObject.waterindex = i;
		else if(et_body_energylist[i]==="hotwater") emsObject.hotwaterindex = i;
		else if(et_body_energylist[i]==="heating") emsObject.heatingindex = i;
	}
}

/** initiate page */
function initEnergyPage() {
	var inner_html =
		"<div>"+
			"<div id='ems_page_header' class='ems_page_header_css bounce end_effect'></div>" +
			"<div id='ems_page_enable'>"+
				"<div id='ems_page_body' class='ems_page_body_css bounce end_effect'>" +
					"<div id='ep_total_tab' ></div>"+
					"<div id='ep_energy_tab'>"+
						"<div id='ep_energy_summary'></div>" +
						"<div id='ep_energy_monthly' style='margin-top:6px;'></div>" +
						"<div id='ep_energy_compare'></div>" +
					"</div>"+
				"</div>"+
			"</div>"+
			"<div id='ems_page_disable'></div>"+
		"</div>";
	document.getElementById("energyPage").innerHTML = inner_html;

	initEnergyPageHeader();
	initEPTotal();
	initEPEnergy();

	emsObject.curtab = "";
}

function initEPTotal() {

	var inner_html =
		"<div id='ep_total_summary' style='margin-top:30px;margin-bottom:30px'></div>" +
		"<div id='ep_total_body'>" +
			"<div id='ep_total_body_lastmonth' ></div>"+
			"<div id='ep_total_body_lastyear'></div>"+
		"</div>"+
		"<div id='ep_total_body_none'></div>" ;
	document.getElementById('ep_total_tab').innerHTML = inner_html;

	initEnergyTotalSummary("ep_total_summary","ep");
	initEnergyTotalBody("ep_total_body_lastmonth","eplm");
	initEnergyTotalBody("ep_total_body_lastyear","eply");

}

function initEPEnergy() {
	initEPEnergySummary();
	initEPEnergyMonthly();
	initEPEnergyCompare();
}

function tabOnclick(e, energyIndex){
	// Energy tab ripples
	emsObject.curtab = energyIndex;
	let rect;
	let energyInfo;
	if (energyIndex === 'total')
		rect = document.getElementById('ems_page_total_rect_sub');
	else {
		energyInfo = getEnergyInfo(energyIndex);
		rect = document.getElementById('ems_page_' + energyInfo.energyText + '_rect_sub');
	}

	let config = {
		type: 'rippleC',
		cb: () => {
			if(energyIndex === "total") {
				drawEnergyPage('total',energySelf.monthIndex.total.lm);
			}
			else {
				energyPageDropDownMenu.dropDownMenu.basicMenuReset();
				drawEnergyPage(energyInfo.energyText,energyInfo.energyMonth);
				modifyEPMonthlyChartWidth();
			}
		}
	};
	rippleManager.set(e, config);
}

function getEnergyInfo(energyIndex) {
	var energy = arrayEnergy[parseInt(energyIndex)];
	var emsData = getEnergyInfoByMonthIndex(energy,0);
	var tmpInfo = {
		energyText : energy,
		energyMonth : emsData.monthIndex
	}
	return tmpInfo;
}

function initEnergyPageHeader() {

	var dimmer_left = "<div class='basic_subtab_box_margin_left' style='left:0;float:left;'></div>";
	var dimmer_right = "<div class='basic_subtab_box_margin_right' style='right:0'></div>";
	if(isPlatform.iOS()) {
		dimmer_left = "";
		dimmer_right = "";
	}

	let elec_text =
		"<div id='ems_page_elec_rect' class='basic_subtab_default'>" +
			"<div id='ems_page_elec_rect_sub' class='basic_subtab_item'>" + menu_text[1] + "</div>" +
		"</div>" ;

	let gas_text =
		"<div id='ems_page_gas_rect' class='basic_subtab_default'>" +
			"<div id='ems_page_gas_rect_sub' class='basic_subtab_item'>" + menu_text[2] + "</div>" +
		"</div>";

	let water_text =
		"<div id='ems_page_water_rect' class='basic_subtab_default'>" +
			"<div id='ems_page_water_rect_sub' class='basic_subtab_item'>" + menu_text[3] + "</div>" +
		"</div>";

	let hotwater_text =
		"<div id='ems_page_hotwater_rect' class='basic_subtab_default'>" +
			"<div id='ems_page_hotwater_rect_sub' class='basic_subtab_item'>" + menu_text[4] + "</div>" +
		"</div>";

	let heating_text =
		"<div id='ems_page_heating_rect' class='basic_subtab_default'>" +
			"<div id='ems_page_heating_rect_sub' class='basic_subtab_item'>" + menu_text[5] + "</div>" +
		"</div>";

	let enabledTabText = "";
	if(emsObject.elec_enabled === true){
		enabledTabText += elec_text;
	}

	if(emsObject.gas_enabled === true){
		enabledTabText += gas_text;
	}

	if(emsObject.water_enabled === true){
		enabledTabText += water_text;
	}

	if(emsObject.hotwater_enabled === true){
		enabledTabText += hotwater_text;
	}

	if(emsObject.heating_enabled === true){
		enabledTabText += heating_text;
	}

	var inner_html =
		" <div id=ems_page_header_text>" +
			"<div id='ems_page_header_box' class='basic_subtab_box'>" +
				"<div id='basic_subtab_calc_text_width'></div>" +
				dimmer_left +
				"<div id='ems_page_total_rect' class='basic_subtab_default basic_subtab_selected'>" +
					"<div id='ems_page_total_rect_sub' class='basic_subtab_item'>" + menu_text[0] + "</div>" +
				"</div>" +
				enabledTabText +
				dimmer_right +
			"</div>" +
		"</div>" +
		"<div class='clear'></div>";
	document.getElementById("ems_page_header").innerHTML = inner_html;

	let totalRectElement = document.getElementById('ems_page_total_rect_sub');
	if (totalRectElement) {
		totalRectElement.removeEventListener('touchstart', (e) => {tabOnclick(e, 'total')}, {passive: true});
		totalRectElement.addEventListener('touchstart', (e) => {tabOnclick(e, 'total')}, {passive: true});
	}

	let itemsList = document.getElementsByClassName('basic_subtab_item');
	for (var i = 0; i < itemsList.length; i++) {
		switch (itemsList[i].id) {
			case 'ems_page_elec_rect_sub':
				itemsList[i].removeEventListener('touchstart', (e) => {tabOnclick(e, '0')}, {passive: true});
				itemsList[i].addEventListener('touchstart', (e) => {tabOnclick(e, '0')}, {passive: true});
				break;
			case 'ems_page_gas_rect_sub':
				itemsList[i].removeEventListener('touchstart', (e) => {tabOnclick(e, '1')}, {passive: true});
				itemsList[i].addEventListener('touchstart', (e) => {tabOnclick(e, '1')}, {passive: true});
				break;
			case 'ems_page_water_rect_sub':
				itemsList[i].removeEventListener('touchstart', (e) => {tabOnclick(e, '2')}, {passive: true});
				itemsList[i].addEventListener('touchstart', (e) => {tabOnclick(e, '2')}, {passive: true});
				break;
			case 'ems_page_hotwater_rect_sub':
				itemsList[i].removeEventListener('touchstart', (e) => {tabOnclick(e, '3')}, {passive: true});
				itemsList[i].addEventListener('touchstart', (e) => {tabOnclick(e, '3')}, {passive: true});
				break;
			case 'ems_page_heating_rect_sub':
				itemsList[i].removeEventListener('touchstart', (e) => {tabOnclick(e, '4')}, {passive: true});
				itemsList[i].addEventListener('touchstart', (e) => {tabOnclick(e, '4')}, {passive: true});
				break;
			default:
				break;
		}
	}

	relocateEnergyPageHeader();
}

function relocateEnergyPageHeader(){
	var header_width=0;
	let numOfHeaderTab = et_body_energylist.length+1;
	for(var i = 0 ; i < numOfHeaderTab; i++ ) {
		var tmpElement = document.getElementById("basic_subtab_calc_text_width");
		if(tmpElement===null) return;
		let boxClass = $(".basic_subtab_default");
		tmpElement.innerText = boxClass[i].innerText;
		var tmpDiv = document.getElementById("basic_subtab_calc_text_width");
		var tmpWidth = (tmpDiv.clientWidth + 1);

		let	realItem = boxClass[i];
		var realWidth = ($(realItem).parent().parent().width() - 36) / numOfHeaderTab;
		// console.log(menu_text[i],realWidth,tmpWidth);

		if(tmpWidth > realWidth) {
			$(realItem).width(tmpWidth);
			realWidth = tmpWidth;
		} else {
			if (realWidth < 54) {
				realWidth = 54;
			}
			$(realItem).width(realWidth);
		}
		header_width += (realWidth);
	}

	$("#ems_page_header_box").width(header_width);
}

function relocateEnergyTotalChart() {

	var enablePage = document.getElementById("ems_card_enable");
	if (!enablePage) {
		return;
	}

	var disablePage = document.getElementById("ems_card_disable");
	if (!disablePage) {
		return;
	}

	let energy = "total";
	let monthIndex = energySelf.monthIndex.total.lm;

	let tmpChartDuration = chartDuration;
	chartDuration = 1;
	drawEnergyTotalBodyChart(arrayEnergy[energySelf.energyIndex.total.lm], monthIndex, true);
	chartDuration = tmpChartDuration;

}

function relocateEnergyPageChart() {
	var enablePage = document.getElementById("ems_page_enable");
	if (!enablePage) {
		return;
	}

	var disablePage = document.getElementById("ems_page_disable");
	if (!disablePage) {
		return;
	}

	var energy;
	var monthIndex;
	if (emsObject.curtab === "" || emsObject.curtab === "total") {
		energy = "total";
		monthIndex = energySelf.monthIndex.total.lm;
	} else {
		var curInfo = getEnergyInfo(emsObject.curtab);
		energy = curInfo.energyText;
		monthIndex = curInfo.energyMonth;
	}

	if (!enableEnergyTotalBody(emsObject.existdata, "ep")) {
		drawNoItemPage(
			"ems_page_disable",
			"img/home_ic_status_ems.png",
			$.lang[lang].ENERGYCARD_NO_ITEM,
			"",
			46
		);
		return;
	}

	if (energy === 'total') {
		enableTotalTab(true);
		drawEnergyTotalSummary(monthIndex, "ep");
		drawEnergyTotalBody(arrayEnergy[energySelf.energyIndex.total.lm], monthIndex, true, "eplm");
		drawEnergyTotalBody(arrayEnergy[energySelf.energyIndex.total.ly], monthIndex, true, "eply");
		energyPageDropDownMenu.createMenu("eplm");
	} else {
		enableTotalTab(false);
		drawEPEnergyCompare(energy,monthIndex.ly);
		drawEPEnergySummary(energy, monthIndex);
		drawEPEnergyMonthlyText(energy, monthIndex.lm);

		var emsData = getEnergyInfoByMonthIndex(energy,monthIndex);
		for (var i = 0; i < EMS_MAX_MONTH_MONTHLY; i++) {
			if(epMonthlyChartList[i]) {
				epMonthlyChartList[i].options.scales.xAxes[0].display = true;
				epMonthlyChartList[i].data.datasets[0].hidden = false;
				epMonthlyChartList[i].update();

				$("#ep_monthly_wrapper" ).scrollLeft(emsData.monthIndex.lyscroll);
			}
		}

		if (epMonthlyChart_label) {
			epMonthlyChart_label.options.scales.yAxes[0].ticks.display = true;
			epMonthlyChart_label.update();
		}
		drawPaddingOfEnergyMonthlyCharts();
	}

	chartDuration = 1;
}

function initEPEnergySummary(energy){

	var tmpMinDiv =
		"<span id='ep_summary_min_year' style='display:inline-block;vertical-align:middle;color:#252525;'></span>"+
		"<span id='ep_summary_min_month' style='display:inline-block;vertical-align:middle;margin-left:6px;color:#6593ED;font-weight:bold;'></span>";
	var tmpMaxDiv =
		"<span id='ep_summary_max_year' style='display:inline-block;vertical-align:middle;color:#252525;'></span>"+
		"<span id='ep_summary_max_month' style='display:inline-block;vertical-align:middle;margin-left:6px;color:#ED6565;font-weight:bold;'></span>";

	if( lang === "en") {
		tmpMinDiv =
			"<span id='ep_summary_min_month' style='margin-left:6px;color:#6593ED;font-weight: bold;line-height:28px;height:28px;'></span>"+
			"<span id='ep_summary_min_year' style='color:#252525;line-height:28px;height:28px;'></span>";
		tmpMaxDiv =
			"<span id='ep_summary_max_month' style='margin-left:6px;color:#ED6565;font-weight: bold;line-height:28px;height:28px;'></span>"+
			"<span id='ep_summary_max_year' style='color:#252525;line-height:28px;height:28px;'></span>";
	}



	var inner_html =
	"<div id='ep_summary_min_max' energy='' class='ems_page_summary_box_css'>"+
		"<div class='ems_page_summary_left_css'>"+
			"<div id='ep_summary_min_ripple' style='position:relative;overflow:hidden;border-radius:12px;padding-top:6px;padding-bottom:6px;height:48px;'>" +
				"<div id='ep_summary_min_box' style='height:28px'>"+
					tmpMinDiv +
				"</div>"+
				"<div class='clear' style='margin-top:2px;'></div>" +
				"<div id='ep_summary_min' style='font-size:15px;'>"+$.lang[lang].ENERGYPAGE_LOWEST_USAGE+"</div>"+
			"</div>" +
		"</div>"+
		"<div class='ems_summary_box_divider' ></div>" +
		"<div id='ep_summary_max_div' class='ems_page_summary_right_css' energy=''>"+
			"<div id='ep_summary_max_ripple' style='position:relative;overflow:hidden;border-radius:12px;padding-top:6px;padding-bottom:6px;height:48px;'>" +
				"<div id='ep_summary_max_box' style='height:28px'>" +
					tmpMaxDiv +
				"</div>"+
				"<div class='clear' style='margin-top:2px;'></div>" +
				"<div id='ep_summary_max' style='font-size:15px;'>"+$.lang[lang].ENERGYPAGE_HIGHEST_USAGE+"</div>"+
			"</div>" +
		"</div>"+
		"<div class='clear'></div>" +
		"<div id='ep_summary_month_count' class='ems_page_summary_bottom_css'>"+
		"</div>"+
	"<div>";
	document.getElementById("ep_energy_summary").innerHTML = inner_html;

	document.getElementById('ep_summary_min_max').firstChild.addEventListener('touchstart', (e) => { updateEPMonthlyChartByMinMax(e, 0); }, {passive: true});
	document.getElementById('ep_summary_max_div').addEventListener('touchstart', (e) => { updateEPMonthlyChartByMinMax(e, 1); }, {passive: true});
}

function createMonthlyCanvas(){
	var retText ="";
	for(var i=0; i <EMS_MAX_MONTH_MONTHLY; i++) {
		retText +=
		"<div id='ep_monthly_chart_div"+i+"' style='width:44px;float:left;margin-top:1px;'>"+
			"<canvas id='ep_monthly_canvas_"+i+"' height='200'></canvas>"+
		"</div>"
	}
	return retText;
}


function initEPEnergyMonthly(energy){
	var epMmonthlyStyle;
	if(screen.width > MAX_ENERGY_GRAPH_WIDTH){  //tablet PC - remove animaation
		epMmonthlyStyle = "class='chartAreaWrapper2' style='width:100%;'";
	}else{
		epMmonthlyStyle = "class='chartAreaWrapper2 chart_animation' style='width:528px;'";
	}
	var inner_html =
	"<div>"+
		"<div class='basic_subheader'>"+
			"<div class='basic_subheader_text' >" + $.lang[lang].ENERGYPAGE_MONTHLY_USAGE +
			"</div>" +
			"<div class='basic_subheader_divider' >" +
			"</div>" +
		"</div>"+
		"<div class='servicecards' style='padding:16px; position:relative'>" +
			"<div id='ep_monthly_text' class='ep_chart_summary_text_css'>" +
			"</div>"+
			"<div>" +
				"<div id='ep_monthly_chart_unit' class='ep_chart_unit'></div>" +
				"<div class='clear'></div>" +

				"<div class='chartWrapper' style='position:absolute;margin-top:4px;width:calc(100% - 32px);float:right;'>" +
					"<div id='ep_monthly_wrapper_label' class='chartAreaWrapper'>"+
			    	"<canvas id='ep_monthly_canvas_label' height='200'></canvas>"+
					"</div>" +
			  	"<canvas id='ep_monthly_canvas_axis_label' height='180' width='0'></canvas>"+
				"</div>"+

				"<div class='chartWrapper' style='margin-top:4px;margin-left:7px;width:calc(100% - 45px);float:left'>"+
				  "<div id='ep_monthly_wrapper' class='chartAreaWrapper bounce end_effect'>"+
							  "<div id='ep_monthly_wrapper_canvas'" + epMmonthlyStyle + ">"+
							createMonthlyCanvas() +
				    "</div>"+
				  "</div>"+
				  "<canvas id='ep_monthly_canvas_axis' height='200' width='0'></canvas>"+
				"</div>"+

			"<div>" +
		"</div>"+
	"</div>";

	document.getElementById("ep_energy_monthly").innerHTML = inner_html;

	for(let i=0; i <EMS_MAX_MONTH_MONTHLY; i++) {
		let button = document.getElementById("ep_monthly_chart_div"+i);
		button.addEventListener('touchstart', (e) => {
			let config = {
				type: 'rippleEnergyMonthlyChart',
				cb: () => {
					epMonthlyChartClickEvent(
						e.srcElement.getAttribute('energy'),
						e.srcElement.getAttribute('chartIndex'));
				}
			};
			rippleManager.set(e, config);
		}, {passive: true});
	}


	if(screen.width <= MAX_ENERGY_GRAPH_WIDTH){ // only for mobile phone
		animationEnabled =1;
		setCompleteChartAnimation("ep_monthly_wrapper_canvas");
	}

	if (isPlatform.iOS()) {
		$('#ep_monthly_wrapper').scroll( function() {
			if ($('#ep_monthly_wrapper')[0].scrollLeft < 0) {
				$('#ep_monthly_canvas_axis')[0].style.display = 'none';
				$('#ep_monthly_canvas_axis_label')[0].style.display = 'none';
			} else {
				$('#ep_monthly_canvas_axis')[0].style.display = 'inherit';
				$('#ep_monthly_canvas_axis_label')[0].style.display = 'none';
			}
		});
	}

	let target = document.getElementById('ep_monthly_wrapper_canvas');
	chartObserver.observe(target, {attributes: true, attributeFilter: ["style"]});
}

function initEPEnergyCompare(energy){
	var inner_html =
	"<div>"+
		"<div class='basic_subheader'>"+
			"<div class='basic_subheader_text'>"+ $.lang[lang].COMPARE_PRV_YEAR +
			"</div>"+
			"<div class='basic_subheader_divider' >" +
			"</div>" +
		"</div>" +
		"<div class='servicecards' style='padding:16px'>" +
			"<div id='ep_compare_text' class='ep_chart_summary_text_css' style='line-height:20px'>"+
			"</div>"+
			"<div id='ep_compare_lastyear_text' class='ep_chart_summary_text_css' style='line-height:20px'>"+
			"</div>"+

			"<div id='ep_compare_chart_unit' class='ep_chart_unit'>(kwh)</div>" +
			"<div class='clear'></div>" +

			"<div >"+
			"<div style='position:absolute'>"+
				"<div id='ep_compare_chart_divs' style='margin-right:calc(35px + 16px + 12px)'>"+
					createEnergyCompareCanvas()+
				"</div>"+
			"</div>"+
	    	"<div style='margin-top:1px'>"+
	      	"<canvas id='ep_compare_canvas_label' height='200'></canvas>"+
	    	"</div>"+
			"</div>"+

		"</div>" +
	"</div>";

	document.getElementById("ep_energy_compare").innerHTML = inner_html;

	for(let i=0; i <EMS_MAX_MONTH_COMPARE; i++) {
		let button = document.getElementById("ep_compare_chart_div"+i);
		button.addEventListener('touchstart', (e) => {
			let config = {
				type: 'rippleEnergyCompareChart',
				cb: () => {
					epCompareChartClickEvent(
						e.srcElement.getAttribute('energy'),
						e.srcElement.getAttribute('chartIndex'));
				}
			};
			rippleManager.set(e, config);
		}, {passive: true});
	}
}

function createEnergyCompareCanvas(){
	var retText ="";
	for(var i=0; i < EMS_MAX_MONTH_COMPARE; i++) {
		retText +=
// labels		"<div style='width:16.66%;float:left;margin-top:1px;'>"+
		"<div id='ep_compare_chart_div"+i+"' style='width:16.66%;float:left;margin-top:6px;'>"+
			"<canvas id='ep_compare_canvas_"+i+"' height='195'></canvas>"+
		"</div>"

	}
	return retText;
}

function enableEnergyTotalBody(bEnable, suffix){
	var enableText = ["","none"];
	var disableText = ["none",""];

	var tmpText = ( bEnable === true ) ? enableText : disableText;

	if(!suffix) {
		//console.log(tmpText);
		document.getElementById("ems_card_enable").style.display = tmpText[0];
		document.getElementById("ems_card_disable").style.display = tmpText[1];
	} else {
		document.getElementById("ems_page_enable").style.display = tmpText[0];
		document.getElementById("ems_page_disable").style.display = tmpText[1];
	}

	return bEnable;
}

function drawEnergyCardCommon(monthIndex, energyIndex, enableShowCardAnimation){
	if (emsObject.card_status === "unloaded") {
		enableEnergyTotalBody(false);
		drawReloadCard("ems_card_disable", "energy", retryLoadEnergyCard);
		return false;
	} else if(emsObject.card_status === "loading") {
		enableEnergyTotalBody(false);
		drawLoadingCard("ems_card_disable", "energy");
		return false;
	} else if(!enableEnergyTotalBody(emsObject.existdata)) {
		drawNoItemCard(
			"ems_card_disable",
			energyImageUri+"home_ic_status_ems.png",
			$.lang[lang].ENERGYCARD_NO_ITEM);
			return false;
	}

	if (enableShowCardAnimation) {
		// card 표시 animation 적용
		promiseAnimationEnd($('#energy_card').find('.servicecards_data_space'), 'show_card');
	}

    return true;
}

function drawEnergyCard(monthIndex, energyIndex, bShowChart, enableShowCardAnimation){

	if( document.getElementById('energy_card_title') === null) return;

	let detail = document.getElementById('energy_card_title_detail');
	let clone = detail.cloneNode(true);
	detail.parentNode.replaceChild(clone, detail);
	clone.addEventListener('touchstart', (e) => {
		e.stopPropagation();
		let config = {
			type: 'rippleC',
			cb: () => { energyCardOnClick(); }
		};
		rippleManager.set(e, config);
	}, {passive: true});
	clone.onclick = (e) => { e.stopPropagation(); };

	if(drawEnergyCardCommon(monthIndex, energyIndex, enableShowCardAnimation) === false)return;

	if(!energyIndex) energyIndex = energySelf.energyIndex.total.lm;
	drawEnergyTotalSummary(monthIndex);
	drawEnergyTotalBody(arrayEnergy[energyIndex], monthIndex, bShowChart);
	energyCardDropDownMenu.createMenu();

}

function retryLoadEnergyCard() {
	requestEnergyCard();
	energyService.drawCard(energySelf.monthIndex.total.lm,energySelf.energyIndex.total.lm, undefined, true);
}

function drawEnergyTotalSummary(monthIndex, pageSuffix) {
	var suffix = "";
	if (pageSuffix) suffix = "_" + pageSuffix;

	var expect_label_text = $.lang[lang].ENERGYPAGE_UP_TO_TODAY;
	var emsData = getEnergyInfoByMonthIndex(arrayEnergy[defaultEnergyIndex],monthIndex);

	document.getElementById('ems_year_text' + suffix).innerHTML = toDateYearString(emsData.data.year);
	document.getElementById('ems_month_text' + suffix).innerHTML = toDateMonthString(emsData.data.month);

	if(monthIndex!=0) {
		expect_label_text ="";
	}
	document.getElementById('et_sub_text' + suffix).innerHTML = expect_label_text;



	if(enableDonut === true) {
		document.getElementById('ems_donut_electricity' + suffix).innerHTML = $.lang[lang].TAB_POWER + " " + emsDonutElectricity + "%";
		document.getElementById('ems_donut_water' + suffix).innerHTML = $.lang[lang].TAB_WATER + " " + emsDonutWater + "%";
		document.getElementById('ems_donut_heating' + suffix).innerHTML = $.lang[lang].TAB_HEATING + " " + emsDonutHeating + "%";
		document.getElementById('ems_donut_gas' + suffix).innerHTML = $.lang[lang].TAB_GAS_LINE + " " + emsDonutGas + "%";
	}

}

function drawEnergyTotalBody(energy, monthIndex, bShowChart, pageSuffix,duration) {

	var suffix = "";
	var titleText ="";

	if (pageSuffix) {
		 suffix = "_" + pageSuffix;
		 if( pageSuffix === "eplm" ) titleText = $.lang[lang].ENERGYPAGE_PREVIOUS_MONTH;
		 else titleText = $.lang[lang].COMPARE_PRV_YEAR;
		 document.getElementById('et_title' + suffix).innerHTML = titleText;
	}

		drawEnergyTotalBodyChart(energy, monthIndex, bShowChart, pageSuffix);
		drawEnergyTotalBodySummary(energy, monthIndex, bShowChart, pageSuffix,duration);
}

function drawTextWithDivider(text1, value, emsData, bColor, duration){

	var text2="";
	var text3="";
	var color="";

	//console.log(text1, value, emsData, bColor, duration);

	if(value === ""){
	} else {
		text2 = value.energyValueText(emsData,bColor);
		if( toEnergyChartData(value) === toEnergyChartData(0) ) {
		} else {
			text3 = emsData.unitText;
		}
	}

	if(bColor === true) color = emsData.chartBgColor;

	var numberid = Math.floor(Math.random() * (10000 - 0)) + 0;
	//var numberid = "numberid";
	//console.log(numberid);
	var retText =
		"<span>" + text1 + "</span>" +
		"<span class='ems_divider'></span>" +
		"<span id='numberid_" + numberid + "'>" +
		text2 +
		"</span>" +
		"<span style='font-size:12px;color:#505050'> " + text3 + "</span>";

	if(duration) {
		var number = FLOATING_POINT_NUMBER;
		if(toEnergyChartData(value) >= 100) number =0;
		autoCountingNumber( toEnergyChartData(value), color, "numberid_"+numberid, duration, number);
	}

	return retText;
}


function autoCountingNumber(num, color, id, duration, number){

	var fontWeight = "";
	if(num === toEnergyChartData(0)) return;
	if(color !== "") fontWeight = "bold";

	//	console.log(num, color, id, duration);
	//	console.log(number, id, duration);
	jQuery(function($) {
			$("#"+id).countTo({
					from: 0,
					to: num,
					speed: duration,
					refreshInterval: 50,
					color: color,
					fontWeight: fontWeight,
					decimals: number,
					onComplete: function(value) {
						if(document.getElementById(id)) {
							document.getElementById(id).innerHTML =
								"<font style='color:"+color+";font-weight:"+fontWeight+"'>" + value + "</font>";
						}
					}
			});
	});
}


var et_cardMonth;
var et_pageMonth;
function drawEnergyTotalBodySummary(energy, monthIndex, bShowSummaryValue, pageSuffix, duration) {
	var suffix = "";
	var tmpText = "";

	//console.log(energy, monthIndex, bShowSummaryValue, pageSuffix, duration);
	if(!energy) energy=et_body_energylist[0];

	var emsData = getEnergyInfoByMonthIndex(energy,monthIndex);
	let countingDuration = 0;
	var summaryDateText = toDateYearMonthString(emsData.data.year,emsData.data.month);
	var summaryDateTextLastMonth = toDateYearMonthString(emsData.lastmonth_data.year, emsData.lastmonth_data.month);
	var summaryDateTextLastYear = toDateYearMonthString(emsData.lastyear_data.year, emsData.lastyear_data.month);

	if (pageSuffix) {
		 suffix = "_" + pageSuffix;
		 et_pageMonth = monthIndex;
	} else {
		et_cardMonth = monthIndex;
		countingDuration = 1080;
	}

	//console.log("ssss ", duration);
	if(duration !== undefined) {
		countingDuration = duration;
	}

	if(countingDuration){
		if(countingDuration !==1){
			countingDuration = countingDuration + parseInt(emsData.emsChartIndex) * 83;
		}
	}

	if(pageSuffix === "eply") {
		var lastYearValue = "0";
		if(emsData.lastyear_data) lastYearValue = emsData.lastyear_data.value;

		if(bShowSummaryValue === false) {
			tmpText = drawTextWithDivider( summaryDateTextLastYear, "-1", emsData);
		} else { /* true, undefined */
			tmpText = drawTextWithDivider( summaryDateTextLastYear, lastYearValue, emsData, false, countingDuration);
		}
		energySelf.energyIndex.total.ly = parseInt(emsData.emsNumber);
	} else {

		/* sync for energy card & page(last month) */
		var bCallEnergyCard = false;
		if(pageSuffix === "eplm") bCallEnergyCard = true;
		if(pageSuffix !== "eply") { // card
			if(energySelf.monthIndex.total.lm !== monthIndex)
				energySelf.setSyncMonthIndex(monthIndex,bCallEnergyCard);
			if(energySelf.energyIndex.total.lm !== parseInt(emsData.emsNumber))
				energySelf.setSyncEnergyIndex(parseInt(emsData.emsNumber),bCallEnergyCard);
		}

		/* draw Text of Energy summary */
		var lastMonthValue = "0";
		if(emsData.lastmonth_data) lastMonthValue = emsData.lastmonth_data.value;
		if(bShowSummaryValue === false) {
			tmpText = drawTextWithDivider( summaryDateTextLastMonth, "-1", emsData);
		} else { /* true, undefined */
			tmpText = drawTextWithDivider( summaryDateTextLastMonth, lastMonthValue, emsData, false, countingDuration);
		}
	}

	if( bShowSummaryValue === false ) {
				document.getElementById('et_body_summary' + suffix).innerHTML = drawTextWithDivider(summaryDateText, "-1", emsData, true);
	}	else { /* true, undefined */
		var tmpid = "et_lastMonth_data2";
		document.getElementById('et_body_summary' + suffix).innerHTML =
			drawTextWithDivider(summaryDateText, emsData.data.value, emsData, true, countingDuration);
	}

	document.getElementById('et_body_summary_diff' + suffix).innerHTML = tmpText;

}

var etBodyChart = [];
var etBodyChart_label;
var etBodyChart_eplm = [];
var etBodyChart_label_eplm;
var etBodyChart_eply = [];
var etBodyChart_label_eply;

/* Change a backgroundColor of Dataset
var et_body_initbgcolorlist =[];
*/
var et_body_chart_barThickness = 6;
var et_body_chart_selecedFontColor = "#505050";
var et_body_chart_unselecedFontColor = "#858585";

function getCategoryPercentageByTotalChart(perWidth){
		return 0.55 - perWidth*0.0025;
}

function setEnergyTotalChartsFontSizeByWidth(suffix){

	let tmpFontSize = 13;
	let tmpPaddingBottom = -20;
	let tmpEnergyTotalChart;
	let widthOfChart = $("#et_body_chart_div"+suffix+"0").width();

	if( suffix === "_eply" ) {
		tmpEnergyTotalChart = etBodyChart_eply;
	} else if( suffix === "_eplm" ){
		tmpEnergyTotalChart = etBodyChart_eplm;
	} else {
		tmpEnergyTotalChart = etBodyChart;
	}

	if(widthOfChart > 61){
		tmpFontSize = 13;
		tmpPaddingBottom = -20;
	} else if(widthOfChart > 56){
		tmpFontSize = 12;
		tmpPaddingBottom = -19;
	} else if(widthOfChart > 52){
		tmpFontSize = 11;
		tmpPaddingBottom = -18;
	} else {
		tmpFontSize = 10;
		tmpPaddingBottom = -17;
	}

	for(let i=0; i < tmpEnergyTotalChart.length; i++){
		tmpEnergyTotalChart[i].config.options.scales.xAxes[0].ticks.fontSize = tmpFontSize;
		tmpEnergyTotalChart[i].config.options.layout.padding.bottom = tmpPaddingBottom;
		tmpEnergyTotalChart[i].update();
	}
}

function drawPaddingOfEnergyTotalCharts(pageSuffix){
		var suffix = "";
		if(pageSuffix) suffix="_"+pageSuffix;
		/* 1. 고정값인 left margin(fixedLeftMargin)을 구한다.(GUI 상으로는 24px 고정이다.)
				- 24로 고정일 경우 화면확대(320px)일 경우 or 사이즈가 작을경우 문제가 발생함.
				a. chart의 크기(tmpWidthOfChart)가 64로 설정한다.(GUI의 padding이 20px위해서)
				b. chart의 크기가 64보다 작을 경우 해당 사이즈로 chart의 크기를 설정한다.
				c. b의 경우는 fixedLeftMargin = 0, 추가 addedLeftMargin = 0이다.
			2. GUI에 맞게 chart 사이의 Padding을 구한다.
			  a. 차트의 개수가 2개일 경우는 차트사이의 padding은 60이다. 나머지는 40이다.
				즉, chart 개수가 2개일 경우는 chart의 width는 69, 나머지는 chart의 width는 64이다.
			3. 나머지는 margin(addedLeftMargin)에 포함시킨다.
		 */
		let defaultWidthChart = 64;
		if(et_body_energylist.length === 2) defaultWidthChart = 84;

		let widthOfCharts = $("#et_body_chart_divs"+suffix).width();
		// console.log("suffix",suffix,widthOfCharts);

		/* 각 chart의 width 설정 */
		let tmpWidthOfChart = widthOfCharts/et_body_energylist.length;
		if( tmpWidthOfChart > defaultWidthChart ) tmpWidthOfChart = defaultWidthChart;

		/* Left Margin 설정 */
		let tmpWidthOfEmpty = widthOfCharts - tmpWidthOfChart * et_body_energylist.length;
		let fixedLeftMargin = 24;
		let addedLeftMargin = 0;

		if(tmpWidthOfEmpty < 0 ){
			fixedLeftMargin = 0;
		} else {
			fixedLeftMargin = tmpWidthOfEmpty/2;
		}

		document.getElementById("et_body_chart_divs"+suffix).innerHTML = "";
		//console.log(tmpWidthOfEmpty,fixedLeftMargin);
		for(var i=0; i < et_body_energylist.length; i++) {
			document.getElementById("et_body_chart_divs"+suffix).innerHTML +=
			"<div id='et_body_chart_div"+suffix+i+"' class='et_body_chart_div_css' style='width:"+tmpWidthOfChart+"px;float:left;'>"+
				"<canvas id='et_body_canvas"+suffix+i+"' width="+tmpWidthOfChart+" height=200></canvas>"+
			"</div>";
			document.getElementById("et_body_canvas"+suffix+i).setAttribute('chartIndex',i);
		}
		for(var i=0; i <et_body_energylist.length; i++) {
			let button = document.getElementById("et_body_chart_div"+suffix+i);
			button.addEventListener('touchstart', (e) => {
				let config = {
					type: 'rippleEnergyTotalChart',
					cb: () => {
						etBodyChartClickEvent(
							e.srcElement.getAttribute('chartIndex'),
							pageSuffix);
					}
				};
				rippleManager.set(e, config);
			}, {passive: true});
		}
		$("#et_body_chart_div"+suffix+"0").css("margin-left",fixedLeftMargin+"px");
}

function drawEnergyTotalBodyChart(energy, monthIndex, bShowChart, pageSuffix) {

	var suffix = "";
	var durationForChart = chartDuration;

	var tmpETBodyChart = [];
	var tmpETBodyChart_label;

	if (pageSuffix) {
		suffix = "_" + pageSuffix;
		chartResponsiveOption = true;
		durationForChart = 1;
		if( pageSuffix === "eplm" ){
			tmpETBodyChart = etBodyChart_eplm;
			tmpETBodyChart_label = etBodyChart_label_eplm;
			/* inview durationForChart = 1; */
		}	else {
			tmpETBodyChart = etBodyChart_eply;
			tmpETBodyChart_label = etBodyChart_label_eply;
		}

	} else {
		if (isPlatform.iPad()) {
			chartResponsiveOption = true; // iPad 일대 favorite 카드에서 에너지 막대가 왼쪽 치우침 문제가 있어 true 로 변경
		} else if (isPlatform.iOS()) {
			chartResponsiveOption = false; //true 일때, 스크롤할때 떨림 현상이 있고 "전체메뉴" 버튼 동작이상
		} else {
			chartResponsiveOption = true;
		}
		tmpETBodyChart = etBodyChart;
		tmpETBodyChart_label = etBodyChart_label;
	}

	if(tmpETBodyChart){
		for(var i = 0; i < tmpETBodyChart.length; i++){
			tmpETBodyChart[i].destroy();
		}
	}
	if(tmpETBodyChart_label) tmpETBodyChart_label.destroy();

	var et_body_labellist =[];
	var et_body_chartdatalist =[];
	var et_body_chartdatalist_compare =[];
	var et_body_bgcolorlist = [];
	var et_body_bgcolorlist_compare = [];
	var enableBody = false;
	var tmpLabelColor= [];

	drawPaddingOfEnergyTotalCharts(pageSuffix);

	var ctxLabel = document.getElementById("et_body_canvas_label"+suffix).getContext("2d");
	var ctxList =[];
	for(var i=0; i < et_body_energylist.length; i++ ){
		ctxList[i] = document.getElementById("et_body_canvas"+suffix+i).getContext("2d");
	}

	let perWidth = $("#et_body_chart_div"+suffix+"0").width();
	let categoryPercentage = getCategoryPercentageByTotalChart(perWidth);

	for(var i=0; i < et_body_energylist.length; i++) {
		var emsData = getEnergyInfoByMonthIndex(et_body_energylist[i],monthIndex);
		if (emsData.enabled === false) continue;
		var tmpCompareData, tmpValue=0;

		et_body_labellist[i] = emsData.labelText;

		tmpDataValue = toEnergyChartData(emsData.data.value);
		if( pageSuffix === "eply" ) tmpCompareData = emsData.lastyear_data;
		else tmpCompareData = emsData.lastmonth_data;

		if( !tmpCompareData ) tmpCompareData = { year: "0", month: "0", value: "0" };

		if( bShowChart === false ) {
			tmpDataValue = toEnergyChartData(0);
			tmpCompareData = { year: "0", month: "0", value: "0" };
			durationForChart = 1;
		}

		if( tmpDataValue === toEnergyChartData(0) && toEnergyChartData(tmpCompareData.value) === toEnergyChartData(0) ) {
			//console.log("1",tmpDataValue,toEnergyChartData(tmpCompareData.value));
			 et_body_chartdatalist[i] = toEnergyChartData(0);
			 et_body_chartdatalist_compare[i] = toEnergyChartData(0);
		} else {
			if( tmpDataValue === toEnergyChartData(tmpCompareData.value) ) {
				//console.log("2",tmpDataValue,toEnergyChartData(tmpCompareData.value));
				et_body_chartdatalist[i] = toEnergyChartData(100);
				et_body_chartdatalist_compare[i] = toEnergyChartData(100);
			} else if( tmpDataValue > toEnergyChartData(tmpCompareData.value) ) {
				//console.log("3 ",tmpDataValue,">",toEnergyChartData(tmpCompareData.value));
				et_body_chartdatalist[i] = toEnergyChartData(100);
				et_body_chartdatalist_compare[i] = toEnergyChartData(tmpCompareData.value) / tmpDataValue * toEnergyChartData(100);
				//console.log("3",et_body_chartdatalist[i],et_body_chartdatalist_compare[i]);
			} else {
//				console.log("4",tmpDataValue ,"<", toEnergyChartData(tmpCompareData.value));
				et_body_chartdatalist_compare[i] = toEnergyChartData(100);
				et_body_chartdatalist[i] = tmpDataValue / toEnergyChartData(tmpCompareData.value) * toEnergyChartData(100);
//				console.log("4",et_body_chartdatalist[i],et_body_chartdatalist_compare[i]);
			}
			enableBody = true;
	 	}

		var gradient = ctxList[0].createLinearGradient(0, 0, 0, 100);
		gradient.addColorStop(0, (emsData.chartBgColor).rgba(1.0));
		gradient.addColorStop(1, (emsData.chartBgColor).rgba(0.5));
		et_body_bgcolorlist[i] = gradient;


		var gradient_compare = ctxList[0].createLinearGradient(0, 0, 0, 100);
		gradient_compare.addColorStop(0, "#B5B5B5".rgba(1.0));
		gradient_compare.addColorStop(1, "#B5B5B5".rgba(0.5));

		et_body_bgcolorlist_compare[i] = gradient_compare;

		//console.log(energy,et_body_energylist[i]);

		if( energy === et_body_energylist[i] ) {
			tmpLabelColor[i] = "#505050";
			/* Change a backgroundColor of Dataset
			et_body_bgcolorlist[i] = emsData.chartBgColor;
			et_body_bgcolorlist_compare[i] = "#B5B5B5";	*/
		} else {
			tmpLabelColor[i] = "#858585";
		}
		/* Change a backgroundColor of Dataset
		et_body_initbgcolorlist[i] = gradient; */
	}

	var chart_label = {
		axisX:{
			reversed:  true
		},
		options: {
			layout: {
				padding: {
					left: -9,
					right: 0,
					top: 5,
					bottom: -20
				}
			},
			responsive: chartResponsiveOption,
			maintainAspectRatio: false,
			animation: {
				duration: 1,
			},
//			onClick: etBodyChartClickEvent,
			hover: { mode: "none"},
			tooltips: {
				enabled: false
			},
			legend: {
				display: false,
			},
			scales: {
				xAxes: [{
					afterFit: (axis) => {
						axis.paddingLeft = 0;
						axis.paddingRight = 0;
					},
					barThickness : 6,
					categoryPercentage: 0.4,
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
						fontColor: "#858585",
						font : "roboto-regular",
					}
				}],
				yAxes: [{
					display: true,
					ticks: {
						display: false,
						min: 0,
						max: 100,
						stepSize: 20,
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
					barPercentage: 1,
					ategoryPercentage: 1,
				}]
			},
			title: {
				display: false,
			}
		},
		type: 'bar',
		data: {
			labels: [""],
			datasets: [
				{
					data: ["0"],
				},
				{
					data: ["0"],
				},
			]
		},
	};

	if (pageSuffix) {
		if( pageSuffix === "eplm" ){
				etBodyChart_label_eplm = new Chart(ctxLabel, chart_label);
		 }
		else{
			etBodyChart_label_eply = new Chart(ctxLabel, chart_label);
		}
	} else {
		etBodyChart_label = new Chart(ctxLabel, chart_label);
	}

	var chartList=[];
	for(var i=0; i < et_body_energylist.length; i++) {
		var tmpLabelColor = et_body_chart_unselecedFontColor;
		var tmpChartDuration = durationForChart + 166 * i;
		if( energy === et_body_energylist[i] ) {
			tmpLabelColor = et_body_chart_selecedFontColor;
		}

		if(durationForChart === 1) {
			tmpChartDuration = 0;
		}

		chartList[i] = {
			chartIndex: i,
			chartSuffix: pageSuffix,
			chartDuration: tmpChartDuration,
			axisX:{
				reversed:  true
			},
		  options: {
				layout: {
					padding: {
						left: -9,
						right: 0,
						top: 5,
						bottom: -20
					}
				},
				responsive: chartResponsiveOption,
				maintainAspectRatio: false,
				animation: {
					easing: "easeOutQuad",
					duration: tmpChartDuration,
				},
//				onClick: etBodyChartClickEvent,
				hover: { mode: "none"},
				tooltips: {
					enabled: false
				},
				legend: {
					display: false,
				},
				scales: {
					xAxes: [{
						afterFit: (axis) => {
							axis.paddingLeft = 0;
							axis.paddingRight = 0;
						},
						barThickness : et_body_chart_barThickness,
						categoryPercentage: categoryPercentage,
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
						}
					}],
					yAxes: [{
						display: true,
						ticks: {
							display: false,
							min: 0,
							max: 100,
							stepSize: 20,
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
						barPercentage: 1,
						ategoryPercentage: 1,
					}]
				},
				title: {
					display: false,
				}
		  },
		  type: 'bar',
		  data: {
				labels: [et_body_labellist[i]],
				datasets: [
					{
						data: [et_body_chartdatalist_compare[i]],
						backgroundColor : [et_body_bgcolorlist_compare[i]]
					},
					{
						data: [et_body_chartdatalist[i]],
						backgroundColor : [et_body_bgcolorlist[i]]
					},
				]
			},
		};

		if (pageSuffix) {
			if( pageSuffix === "eplm" ){
				 etBodyChart_eplm[i] = new Chart(ctxList[i], chartList[i]);
			 }
			else{
				etBodyChart_eply[i] = new Chart(ctxList[i], chartList[i]);
			}
		} else {
			etBodyChart[i] = new Chart(ctxList[i], chartList[i]);
		}
	}

	/* Width가 64 이하일 경우 "Electricity" 글씨가 짤리게 된다.
	  그경우 Font의 크기를 조절한다. */
	if(et_body_energylist.length === 5){
		if(lang==="en"){
			setEnergyTotalChartsFontSizeByWidth(suffix);
		}
	}
}

function etBodyChartClickEvent(chartIndex,suffix) {
	let energy = et_body_energylist[chartIndex];
	let tmpLabelColor =[];
	for(let i = 0; i < et_body_energylist.length; i++) {
		if(i === chartIndex) {
			tmpLabelColor[i] = "#505050";
		} else {
			tmpLabelColor[i] = "#858585";
		}
	}
	updateEnergyTotalChart(chartIndex,suffix);

	if(suffix === "eplm") drawEnergyTotalBodySummary(energy, et_pageMonth, true, "eplm");
	else if(suffix === "eply") drawEnergyTotalBodySummary(energy, et_pageMonth, true, "eply");
	else drawEnergyTotalBodySummary(energy, et_cardMonth, true, undefined, 0);

}

/*
function etBodyChartClickEvent(e, array) {
	let chartIndex = this.config.chartIndex;
	let suffix = this.config.chartSuffix;
	let energy = et_body_energylist[chartIndex];

	let tmpLabelColor =[];
	for(let i = 0; i < et_body_energylist.length; i++) {
		if(i === chartIndex) {
			tmpLabelColor[i] = "#505050";
		} else {
			tmpLabelColor[i] = "#858585";
		}
	}
	updateEnergyTotalChart(chartIndex,suffix);

	if(suffix === "eplm") drawEnergyTotalBodySummary(energy, et_pageMonth, true, "eplm");
	else if(suffix === "eply") drawEnergyTotalBodySummary(energy, et_pageMonth, true, "eply");
	else drawEnergyTotalBodySummary(energy, et_cardMonth, true, undefined, 0);

}
*/

function getEnergyTotalChartByChartIndex(chartIndex,suffix){
	if(suffix === "eplm"){
		return etBodyChart_eplm[chartIndex];
	} else if(suffix === "eply"){
		return etBodyChart_eply[chartIndex];
	}
	return etBodyChart[chartIndex];
}


function updateEnergyTotalChart(chartIndex,suffix){
	for(var i = 0; i < et_body_energylist.length; i++) {
		var tmpChart = getEnergyTotalChartByChartIndex(i,suffix);
		var tmpFontColor = "#858585";
		if(i===parseInt(chartIndex)) tmpFontColor = "#505050";
		tmpChart.config.options.scales.xAxes[0].ticks.fontColor =tmpFontColor;
		tmpChart.config.options.animation.duration = 0;
		tmpChart.update();
	}
}

function drawNoitemPageByEnergy(energy) {
	if(energy !== "total" ) {
		var inner_html =
		"<div class='ems_page_summary_box_css'>"+
			"<div class='ems_page_summary_left_css'>"+
				"<span id='ep_summary_min_box' style='height:30px'>"+
				"<span id='ep_summary_min_year' style='color:#252525;line-height:30px;height:30px;'></span>"+
				"<span id='ep_summary_min_month' style='margin-left:6px;color:#6593ED;font-weight: bold;line-height:30px;height:30px;'>-</span>"+
				"</span>"+
				"<div class='clear' style='margin-top:6px;'></div>" +
				"<span id='ep_summary_min' style='font-size:15px;margin-top:6px;'>"+$.lang[lang].ENERGYPAGE_LOWEST_USAGE+"</span>"+
			"</div>"+
			"<div class='ems_summary_box_divider' ></div>" +
			"<div class='ems_page_summary_right_css'>"+
				"<span id='ep_summary_max_box' style='height:30px'>"+
				"<span id='ep_summary_max_year' style='color:#252525;line-height:30px;height:30px;'></span>"+
				"<span id='ep_summary_max_month' style='margin-left:6px;color:#ED6565;font-weight: bold;line-height:30px;height:30px;'>-</span>"+
				"</span>"+
				"<div class='clear' style='margin-top:6px;'></div>" +
				"<span id='ep_summary_max' style='font-size:15px;margin-top:6px'>"+$.lang[lang].ENERGYPAGE_HIGHEST_USAGE+"</span>"+
			"</div>"+
			"<div class='clear'></div>" +
			"<div class='ems_page_summary_bottom_css'>"+
			"</div>"+
		"<div>";
		document.getElementById("ems_page_disable").innerHTML += inner_html;
	}

}

function drawEnergyPage(energy, monthIndex) {
	drawEnergyPageHeader(energy);

	if(!enableEnergyTotalBody(emsObject.existdata,"ep")) {

		drawNoItemPage(
			"ems_page_disable",
			energyImageUri+"home_ic_status_ems.png",
			$.lang[lang].ENERGYCARD_NO_ITEM,
			"",
			46
		);
//		drawNoitemPageByEnergy(energy);
		return;
	}

	if(energy === 'total') {
		enableTotalTab(true);
		drawEnergyTotalSummary(monthIndex,"ep");

		drawEnergyTotalBody(arrayEnergy[energySelf.energyIndex.total.lm], monthIndex, true, "eplm");

		var bShowChart = false;
		if(isCalledInviewOnLastYearChart) bShowChart = true;
		//console.log("isCalledInviewOnLastYearChart",isCalledInviewOnLastYearChart);
			drawEnergyTotalBody(arrayEnergy[energySelf.energyIndex.total.ly], monthIndex, bShowChart, "eply");

		energyPageDropDownMenu.createMenu("et");

	} else {
		enableTotalTab(false);
		//todo
		drawEPEnergy(energy,monthIndex);
	}
	chartDuration = 1;
}

function enableTotalTab(bEnabled) {
	if(bEnabled) {
		$('#ep_total_tab').css("display","block");
		$('#ep_energy_tab').css("display","none");
	} else {
		$('#ep_total_tab').css("display","none");
		$('#ep_energy_tab').css("display","block");
	}
}

function drawEnergyPageHeader(energy) {
	$('.basic_subtab_selected').removeClass('basic_subtab_selected');
	var energy_rect_id = "#ems_page_"+energy+"_rect";
	$(energy_rect_id).addClass('basic_subtab_selected');
}

function drawEPEnergy(energy,monthIndex)
{
	drawEPEnergyCompare(energy,monthIndex.ly);
	drawEPEnergyMonthly(energy,monthIndex.lm);
	drawEPEnergySummary(energy,monthIndex);
}

function getEPEnergyMinMaxByMonthly(energy){
	var emsData = getEnergyInfoByMonthIndex(energy,0);
	var maxvalue=0, maxIndex=0, minvalue=0, minIndex=0;

//	var maxMonth = (emsData.length>EMS_MAX_MONTH_Summary)?EMS_MAX_MONTH_Summary:emsData.length;
		for(var i = 1; i < EMS_MAX_MONTH_Summary; i++) {
		var tmpValue = toEnergyChartData(emsData.list[i].value);
		if( tmpValue === 0) continue;

	  if (!maxvalue) {
	    maxvalue = tmpValue;
			maxIndex = i;
	  };

		if (!minvalue) {
	    minvalue = tmpValue;
			minIndex = i;
	  };

	  if (maxvalue < tmpValue) {
	    maxvalue = tmpValue;
			maxIndex = i;
	  }

		if (minvalue > tmpValue) {
			minvalue = tmpValue;
			minIndex = i;
		}
	}

	var emsMaxData = getEnergyInfoByMonthIndex(energy,maxIndex);
	var emsMinData = getEnergyInfoByMonthIndex(energy,minIndex);

	return {
		min: {
			year: emsMinData.data.year,
			month: emsMinData.data.month,
			index: minIndex
		},
		max: {
			year: emsMaxData.data.year,
			month: emsMaxData.data.month,
			index: maxIndex
		}
	}
}

function drawEPEnergySummary(energy,monthIndex){

	var emsData = getEnergyInfoByMonthIndex(energy,monthIndex);
	var minMaxdata = getEPEnergyMinMaxByMonthly(energy);
	/*
	var inner_html = emsMinData.data.year + "년 " + emsMinData.data.month + "월" ;
	document.getElementById("ep_summary_min").innerHTML = inner_html;
	var inner_html = emsMaxData.data.year + "년 " + emsMaxData.data.month + "월" ;
	document.getElementById("ep_summary_max").innerHTML = inner_html;
	*/
	var tmpMinData_year = toDateYearString(minMaxdata.min.year);
	var tmpMinData_month = toDateMonthString(minMaxdata.min.month) +" ";
	var tmpMaxData_year = toDateYearString(minMaxdata.max.year);
	var tmpMaxData_month = toDateMonthString(minMaxdata.max.month) +" ";

	var tmpCount = (emsData.count > 12)?12:emsData.count;
	var tmpMonthCountText = $.lang[lang].LAST_MONTHS.replace("%d", tmpCount);

	var minDiv = document.getElementById("ep_summary_min_max");
	var energy = minDiv.setAttribute('energy',energy);

	if(tmpCount === "0"){
		tmpMonthCountText = "(&nbsp&nbsp&nbsp&nbsp-&nbsp&nbsp&nbsp&nbsp)";
		tmpMinData_year = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp-";
		tmpMinData_month = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
		tmpMaxData_year = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp-";
		tmpMaxData_month = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
		var energy = minDiv.setAttribute('energy',"");
	}

	document.getElementById("ep_summary_min_year").innerHTML = tmpMinData_year;
	document.getElementById("ep_summary_min_month").innerHTML = tmpMinData_month;
	document.getElementById("ep_summary_max_year").innerHTML = tmpMaxData_year;
	document.getElementById("ep_summary_max_month").innerHTML = tmpMaxData_month;
	document.getElementById("ep_summary_month_count").innerHTML = "("+tmpMonthCountText+")";

	var maxTextWidth = document.getElementById("ep_summary_max").offsetWidth;
	var maxTextBoxWidth = document.getElementById("ep_summary_max_box").offsetWidth;
	var minTextWidth = document.getElementById("ep_summary_min").offsetWidth;
	var minTextBoxWidth = document.getElementById("ep_summary_min_box").offsetWidth;

	//console.log(maxTextWidth,maxTextBoxWidth,minTextWidth,minTextBoxWidth);

	var maxTextLeftMargin = (maxTextBoxWidth - maxTextWidth)/2;
	var minTextRightMargin = (minTextBoxWidth - minTextWidth)/2;

}

function drawEPEnergyMonthly(energy,monthIndex) {
	drawEPEnergyMonthlyText(energy,monthIndex);
	drawEPEnergyMonthlyChart(energy,monthIndex);
}

function drawEPEnergyCompare(energy,monthIndex) {
	drawEPEnergyCompareText(energy,monthIndex);
	drawEPEnergyCompareChart(energy,monthIndex);
}

function drawEPEnergyMonthlyText(energy,monthIndex){
	//save
	var emsData = getEnergyInfoByMonthIndex(energy,monthIndex);
	emsData.monthIndex.lm = monthIndex;

	var tmpText = toDateYearMonthString(emsData.data.year, emsData.data.month);
	var inner_html = drawTextWithDivider( tmpText, emsData.data.value, emsData, true, 0);
	document.getElementById("ep_monthly_text").innerHTML = inner_html;
}

function drawEPEnergyCompareText(energy,monthIndex){
	//save
	var emsData = getEnergyInfoByMonthIndex(energy,monthIndex);
	emsData.monthIndex.ly = monthIndex;

	var tmpText = toDateYearMonthString(emsData.data.year,emsData.data.month);
	var inner_html = drawTextWithDivider( tmpText, emsData.data.value, emsData, true, 0);
	document.getElementById("ep_compare_text").innerHTML = inner_html;
	tmpText = toDateYearMonthString(emsData.lastyear_data.year,emsData.lastyear_data.month);
	var inner_html = drawTextWithDivider( tmpText, emsData.lastyear_data.value, emsData, false, 0);
	document.getElementById("ep_compare_lastyear_text").innerHTML = inner_html;
}


var epMonthlyChart1;

var m2c_monthly=[];
var ep_monthly_chartdatalist=[];
/* Change a backgroundColor of Dataset
var ep_monthly_initbgcolorlist=[]; */
function drawEPEnergyMonthlyChart(energy,monthIndex){

	var maxMonth = EMS_MAX_MONTH_MONTHLY;

	for(var i=0; i < maxMonth; i++ ){
		if(epMonthlyChartList[i]) epMonthlyChartList[i].destroy();
	}
	if(epMonthlyChart_label) epMonthlyChart_label.destroy();


	var emsData = getEnergyInfoByMonthIndex(energy,monthIndex);
	var ep_monthly_labellist=[];
	var ep_monthly_bgcolorlist=[];
	var maxValue = 0;

	document.getElementById('ep_monthly_chart_unit').innerHTML = "("+emsData.unitText+")";

	var canvas_label = document.getElementById("ep_monthly_canvas_label");
	var ctxLabel = canvas_label.getContext("2d");

	var ctxList =[];
	for(var i=0; i < maxMonth; i++ ){
		let tmpElement = document.getElementById("ep_monthly_canvas_"+i);
		ctxList[i] = tmpElement.getContext("2d");
		tmpElement.setAttribute('chartIndex', i);
		tmpElement.setAttribute('energy', energy);
	}

	for(var i = maxMonth-1, j=0; i >= 0; i--,j++) {
		if(maxValue < emsData.list[j].value) maxValue = toEnergyChartData(emsData.list[j].value);
		ep_monthly_chartdatalist[i] = emsData.list[j].value;
		ep_monthly_labellist[i] = toDateMonthString(emsData.list[j].month);
		m2c_monthly[i] = j;

		var gradient = ctxList[0].createLinearGradient(0, 0, 0, 200);
		gradient.addColorStop(0, emsData.chartBgColor.rgba(1.0));
		gradient.addColorStop(1, emsData.chartBgColor.rgba(0.5));
		ep_monthly_bgcolorlist[i] = gradient;

	}

	if( parseInt(maxValue) === 0 ) {
		maxValue = emsData.defaultMax;
	}

	var stepSize = 0;
	if(maxValue < 20) {
		stepSize = parseFloat((maxValue/5).toFixed(FLOATING_POINT_NUMBER));
	} else {
		stepSize = Math.ceil(maxValue/5);
	}

	//console.log(stepSize);
	//console.log(ep_monthly_bgcolorlist);
	var chart_label = {
		label: energy,
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
//			onClick: epMonthlyChartClickEvent,
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
						scaleInstance.width = 49;
					},
					display: true,
					position: 'right',
					ticks: {
						padding: 6,
						display: true,
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
					barPercentage: 1,
					ategoryPercentage: 1
				}]
			},
			title: {
				display: false,
				text: energy,
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

	epMonthlyChart_label = new Chart(ctxLabel, chart_label);
//	document.getElementById("ep_monthly_wrapper_label").style.zIndex = 5;

	var chartList =[];
	for(var i=0; i < maxMonth; i++) {
		var tmpLabelColor = "#858585";
		if( parseInt(monthIndex) === m2c_monthly[i] ) {
			tmpLabelColor = "#505050";
		}

		//console.log(ep_monthly_labellist[i]);

		chartList[i] = {
			label: energy,
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
//				onClick: epMonthlyChartClickEvent,
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
						}
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
						barPercentage: 1,
						ategoryPercentage: 1
					}]
				},
				title: {
					display: false,
					text: energy
				}
			},
			type: 'bar',
			data: {
				labels: [ep_monthly_labellist[i]],
				datasets: [{
					label: [energy[i]],
					data: [ep_monthly_chartdatalist[i]],
					backgroundColor : [ep_monthly_bgcolorlist[i]],
				}]
			}
		};
		epMonthlyChartList[i] = new Chart(ctxList[i], chartList[i]);
	}

	drawPaddingOfEnergyMonthlyCharts();

	if(!animationEnabled) {
		$("#ep_monthly_wrapper" ).scrollLeft( emsData.monthIndex.lyscroll );
	}
}

chartObserver = new MutationObserver(function(mutations) {
	mutations.forEach(function(m) {
		if (m.attributeName === 'style' && chartResized) {
			relocateEnergyPageChart();
			chartResized = false;
		}
	});
});

var lastWidth = screen.width;
function isEPMonthlyChartResized() {
	if ($('#energyPage').css('display') === 'none') {
		lastWidth = screen.width;
		return false;
	}

	let currentWidth = screen.width;
	if (lastWidth === currentWidth) return false;

	lastWidth = currentWidth;
	return true;
}


function modifyEPMonthlyChartWidth() {
	if ($('#energyPage').css('display') === 'none') return;

	chartResized = true;
	let wrapper_canvas = $('#ep_monthly_wrapper_canvas');
	let wrapper = $('#ep_monthly_wrapper');

	if (wrapper.width() > MAX_ENERGY_GRAPH_WIDTH) {
		wrapper_canvas.width(wrapper.width());
	}
	else {
		wrapper_canvas.width(10);
		wrapper_canvas.width(MAX_ENERGY_GRAPH_WIDTH);
	}

	drawPaddingOfEnergyMonthlyCharts();
}

function drawPaddingOfEnergyMonthlyCharts() {
	/* Draw Padding */
	let wrapper = $('#ep_monthly_wrapper');
	let maxWidthOfEnergyMonthlyChart = MAX_ENERGY_GRAPH_WIDTH; // MAX_MONTH_MONTHLY *44

	let paddingOfEnergyMonthlyChart0 = (wrapper.width() - maxWidthOfEnergyMonthlyChart)/2
	if(paddingOfEnergyMonthlyChart0 < 0)   paddingOfEnergyMonthlyChart0 = 0;
	$('#ep_monthly_chart_div0').css("margin-left",paddingOfEnergyMonthlyChart0+"px");
	//console.log(paddingOfEnergyMonthlyChart0);
}

function clearEnergyPageChart() {

	/* Clear all-Monthly/Compare Chart */
	for(let i = 0; i < et_body_energylist.length; i++){
		if(etBodyChart_eply[i]){
			etBodyChart_eply[i].options.scales.xAxes[0].display = false;
			etBodyChart_eply[i].data.datasets[0].hidden = true;
			etBodyChart_eply[i].data.datasets[1].hidden = true;
			etBodyChart_eply[i].update();
		}
		if(etBodyChart_eplm[i]){
			etBodyChart_eplm[i].options.scales.xAxes[0].display = false;
			etBodyChart_eplm[i].data.datasets[0].hidden = true;
			etBodyChart_eplm[i].data.datasets[1].hidden = true;
			etBodyChart_eplm[i].update();
		}
	}

	/* Clear detail-Montyly Chart */
	for (var i = 0; i < EMS_MAX_MONTH_MONTHLY; i++) {
		if(epMonthlyChartList[i]) {
			epMonthlyChartList[i].options.scales.xAxes[0].display = false;
			epMonthlyChartList[i].data.datasets[0].hidden = true;
			epMonthlyChartList[i].update();
		}
	}

	if (epMonthlyChart_label) {
		epMonthlyChart_label.options.scales.yAxes[0].ticks.display = false;
		epMonthlyChart_label.update();
	}

	/* Clear detail-Compare Chart */
	for (let i = 0; i < EMS_MAX_MONTH_COMPARE; i++) {
		if(epCompareChart[i]) {
			epCompareChart[i].options.scales.xAxes[0].display = false;
			epCompareChart[i].data.datasets[0].hidden = true;
			epCompareChart[i].data.datasets[1].hidden = true;
			epCompareChart[i].update();
		}
	}
	if (epCompareChart_label) {
		epCompareChart_label.options.scales.yAxes[0].ticks.display = false;
		epCompareChart_label.update();
	}
}

function getChartIndexByLabelClick(canvas_id,chart,event) {
	var canvasid = "#"+canvas_id;
	/* Label Click Event */
	var ctx = $(canvasid)[0].getContext("2d");
//	var base = chart.chartArea.bottom;
	var base = chart.chartArea.top;
	var height = chart.chart.height;
	var width = chart.chart.scales['x-axis-0'].width;
	var offset = $(canvasid).offset().top - $(window).scrollTop();
	if(event.pageY > base + offset){
		var count = chart.scales['x-axis-0'].ticks.length;
		var padding_left = chart.scales['x-axis-0'].paddingLeft;
		var padding_right = chart.scales['x-axis-0'].paddingRight;
		var xwidth = (width-padding_left-padding_right)/count;
		// don't call for padding areas
		var bar_index = (event.offsetX - padding_left - chart.scales['x-axis-0'].left ) / xwidth;
		var bar_index_left = bar_index - (10 / xwidth);
		var bar_index_right = bar_index + (10 / xwidth);
		if(bar_index > 0 && bar_index < count) {
			// bar_index = Math.floor(bar_index);
			bar_index_left = Math.floor(bar_index_left);
			bar_index_right = Math.floor(bar_index_right);
			if(bar_index_right === bar_index_left) return bar_index_left;
	    }
	}
	return null;
}

function getChartIndexByChartItems(items){
	return items[0]._index;
}

function getMonthIndexByChartIndex(m2c, chartIndex){
	return m2c[chartIndex];
}

function getChartIndexByMonthIndex(m2c, monthIndex){

	for(var i=0; i < m2c.length; i++) {
		if( parseInt(m2c[i]) === parseInt(monthIndex) ) return i;
    }

    return -1;
}

function updateEPMonthlyChartByMinMax(e, minMax){
	var minDiv = document.getElementById("ep_summary_min_max");
	var energy = minDiv.getAttribute('energy');

	if(energy === "") return;

	var minMaxData = getEPEnergyMinMaxByMonthly(energy);
	var tmpData;
	if(minMax === 0) /* min */ {
		var tmpData = minMaxData.min;
	}	else /* max */ {
		var tmpData = minMaxData.max;
	}

	var chartIndex = getChartIndexByMonthIndex(m2c_monthly,parseInt(tmpData.index));
	//console.log(minMax,energy,tmpData.year,tmpData.month,tmpData.index,chartIndex);
	updateEPMonthlyChart(energy, chartIndex, parseInt(tmpData.index));
	scrollEPMonthlyChart(energy, chartIndex);

	let config = {type: 'rippleC'};
	rippleManager.set(e, config);
}

function scrollEPMonthlyChart(energy,chartIndex) {
	var mask = $("#ep_monthly_wrapper");
	var canvas = $("#ep_monthly_wrapper_canvas");
	var selectedChart = $("#ep_monthly_canvas_"+chartIndex);
	var numScrollLeft = 0;

	if(chartIndex > 5) {
		var maskWidth = mask.width();
		var canvasWidth = canvas.width();
		numScrollLeft = canvasWidth - maskWidth;
	} else {
		numScrollLeft = 0;
	}

	/* 화면에 보이는지 검사 */
	if( numScrollLeft > selectedChart.position().left) {
		//console.log("none. move to right");
		numScrollLeft = selectedChart.position().left;
	} else if( numScrollLeft + mask.width() < selectedChart.position().left + selectedChart.width()) {
		//console.log("none. move to left");
		numScrollLeft = selectedChart.position().left + selectedChart.width() - mask.width();
	}	else {
		//console.log("shown!!!!");
	}

	mask.stop().animate(
		{ scrollLeft:numScrollLeft },
		300,
		'swing',
		function() {
	   //console.log("Finished animating",energy,numScrollLeft);
		 var emsData = getEnergyInfoByMonthIndex(energy,0);
		 emsData.monthIndex.lyscroll = numScrollLeft;
		}
	);

}


function updateEPMonthlyChart(energy,chartIndex,monthIndex){
	// console.log(chartData);
	// console.log(ep_monthly_chartdatalist,chartIndex,monthIndex);
	for(var i = 0; i < EMS_MAX_MONTH_MONTHLY; i++) {
		var tmpFontColor = "#858585";
		if(i===parseInt(chartIndex)) tmpFontColor = "#505050";
		epMonthlyChartList[i].config.options.scales.xAxes[0].ticks.fontColor =tmpFontColor;
		epMonthlyChartList[i].config.options.animation.duration = 0;
		epMonthlyChartList[i].update();
	}
	// console.log(chart.config.label,monthIndex);
	drawEPEnergyMonthlyText(energy,monthIndex);
	// console.log($("#ep_monthly_wrapper" ).scrollLeft());
	var emsData = getEnergyInfoByMonthIndex(energy,monthIndex);
	emsData.monthIndex.lyscroll = $("#ep_monthly_wrapper" ).scrollLeft()-1;
}

function epMonthlyChartClickEvent(energy,chartIndex){
	//console.log(energy,chartIndex);
	var monthIndex = getMonthIndexByChartIndex(m2c_monthly,chartIndex);
	updateEPMonthlyChart(energy,chartIndex,monthIndex);
}

/*
function epMonthlyChartClickEvent(e, array){
	var chartIndex;
	if(!array[0]) { // check label click
		for(var i =0 ; i < EMS_MAX_MONTH_MONTHLY; i++) {
			if(this === epMonthlyChartList[i]) {
				//console.log("index = ",i);
				chartIndex = i;
				break;
			}
		}
	}	else { // check element click
		chartIndex = getChartIndexByChartItems(array);
	}
	//var monthIndex = m2c_monthly[chartIndex];
	var monthIndex = getMonthIndexByChartIndex(m2c_monthly,chartIndex);
	updateEPMonthlyChart(this.config.label,chartIndex,monthIndex);
}
*/



var m2c_compare=[];
function getEmsChartData(energy,monthIndex){


}

/* Change a backgroundColor of Dataset
var ep_compare_initbgcolorlist=[];
var ep_compare_initbgcolorlist_compare=[]; */
function drawEPEnergyCompareChart(energy,monthIndex){

	//console.log(ep_compare_bgcolorlist);
	var emsData = getEnergyInfoByMonthIndex(energy,monthIndex);
	var ep_compare_chartdatalist=[];
	var ep_compare_chartdatalist_lastyear=[];
	var ep_compare_labellist=[];
	var ep_compare_bgcolorlist=[];
	var ep_compare_bgcolorlist_compare=[];
	var tmpLabelColor= [];

	var tmpChartData = [];
	var tmpChartLastYearData = [];

	//var maxMonth = (emsData.length>EMS_MAX_MONTH_COMPARE)?EMS_MAX_MONTH_COMPARE:emsData.length;
	var maxMonth = EMS_MAX_MONTH_COMPARE;
	var maxValue = 0;

	/* draw chart unit */
	document.getElementById('ep_compare_chart_unit').innerHTML = "("+emsData.unitText+")";

	var ctx = [];
	for(let i =0; i < EMS_MAX_MONTH_COMPARE; i++) {
		if(epCompareChart[i]) epCompareChart[i].destroy();
		if(epCompareChart_label) epCompareChart_label.destroy();

		let tmpElement = document.getElementById("ep_compare_canvas_"+i);
		ctx[i] = tmpElement.getContext("2d");
		tmpElement.setAttribute('energy',energy);
		tmpElement.setAttribute('chartIndex',i)
	}
	var ctx_label = document.getElementById("ep_compare_canvas_label").getContext("2d");

	let perWidth = $("#ep_compare_chart_div0").width();

	for(var i = maxMonth-1 , j=0; i >= 0; i--,j++){
		var tmpValue;
		if(maxValue < emsData.list[j].value) maxValue = toEnergyChartData(emsData.list[j].value);
		if(maxValue < emsData.list[j+12].value) maxValue = toEnergyChartData(emsData.list[j+12].value);

		if(emsData.list[j]) tmpValue = emsData.list[j].value;
		else tmpValue = 0;
		ep_compare_chartdatalist[i] = tmpValue;

		if(emsData.list[j+12]) tmpValue = emsData.list[j+12].value;
		else tmpValue = 0;
		ep_compare_chartdatalist_lastyear[i] = tmpValue;

		ep_compare_labellist[i] = toDateMonthString(emsData.list[j].month);
		// chart 간격이 넓어지는 것 방지
		if(ep_compare_labellist[i].length < 3) ep_compare_labellist[i] = " " + ep_compare_labellist[i] + " ";
		m2c_compare[i] = j;

		var gradient = ctx[0].createLinearGradient(0, 0, 0, 200);
		gradient.addColorStop(0, emsData.chartBgColor.rgba(1.0));
		gradient.addColorStop(1, emsData.chartBgColor.rgba(0.5));
		ep_compare_bgcolorlist[i] = gradient;

		var gradient_compare = ctx[0].createLinearGradient(0, 0, 0, 200);
		gradient_compare.addColorStop(0, "#B5B5B5".rgba(1.0));
		gradient_compare.addColorStop(1, "#B5B5B5".rgba(0.5));
		ep_compare_bgcolorlist_compare[i] = gradient_compare;

		if( parseInt(monthIndex) === j ) {
			tmpLabelColor[i] = "#505050";
			/* Change a backgroundColor of Dataset
			ep_compare_bgcolorlist[i] = emsData.chartBgColor;
			ep_compare_bgcolorlist_compare[i] = "#B5B5B5" */
		} else {
			tmpLabelColor[i] = "#858585";
		}

		/* Change a backgroundColor of Dataset
		ep_compare_initbgcolorlist[i]= gradient;
		ep_compare_initbgcolorlist_compare[i]= gradient_compare; */
	}

	if( parseInt(maxValue) === 0) {
		maxValue = emsData.defaultMax;
	}

	var stepSize = 0;
	if(maxValue < 20) {
		stepSize = parseFloat((maxValue/5).toFixed(FLOATING_POINT_NUMBER));
	} else {
		stepSize = Math.ceil(maxValue/5);
	}

	var chart_label = {
		axisX:{
			reversed:  true
		},
		options: {
			layout: {
				padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: -10
				}
			},

			maintainAspectRatio: false,
			animation: {
				duration: 1
			},
//			onClick: epCompareChartClickEvent,
			hover: { mode: "none"},
			tooltips: {
				enabled: false
			},
			legend: {
				display: false,
			},
			scales: {
				xAxes: [{
					barThickness : 6,
					categoryPercentage: 0.4,
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
						fontColor: "#858585",
						font : "roboto-regular",
					}
				}],
				yAxes: [{
					afterFit: function(scaleInstance){
						scaleInstance.width = 49;
					},
					display: true,
					position: 'right',
					ticks: {
						padding: 6,
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
					scaleLabel: {
		 				display: true,
//		 				labelString: emsData.unitText,
						fontSize: 11,
						fontColor: "#C2C2C2"
	 				},
					stacked: false,
					barPercentage: 1,
					ategoryPercentage: 1,
				}]
			},
			title: {
				display: false,
				text: energy
			}
	  },
	  type: 'bar',
	  data: {
	    labels: [""],
	    datasets: [{
				label: energy,
	      data: [""]
	    },
			{
				label: energy,
				data: [""]
			}]
	  },

	};

	epCompareChart_label = new Chart(ctx_label, chart_label);

	var chart=[];
	for(let i =0; i < EMS_MAX_MONTH_COMPARE; i++) {
		chart[i] = {
			axisX:{
				reversed:  true
			},
			options: {
				layout: {
					padding: {
							left: 0,
							right: 0,
							top: 0,
							bottom: -10
					}
				},

				maintainAspectRatio: false,
				animation: {
					duration: 1
				},
//				onClick: epCompareChartClickEvent,
				hover: { mode: "none"},
				tooltips: {
					enabled: false
				},
				legend: {
					display: false,
				},
				scales: {
					afterFit: (axis) => {
						axis.paddingLeft = 0;
						axis.paddingRight = 0;
					},
					xAxes: [{
						barThickness : 6,
						categoryPercentage: 0.6,
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
							fontColor: tmpLabelColor[i],
							font : "roboto-regular",
						}
					}],
					yAxes: [{
						display: false,
						position: 'right',
						ticks: {
							padding: 6,
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
						scaleLabel: {
			 				display: true,
	//		 				labelString: emsData.unitText,
							fontSize: 11,
							fontColor: "#C2C2C2"
		 				},
						stacked: false,
						barPercentage: 1,
						ategoryPercentage: 1,
					}]
				},
				title: {
					display: false,
					text: energy
				}
		  },
		  type: 'bar',
		  data: {
		    labels: [ep_compare_labellist[i]],
		    datasets: [{
					label: energy,
		      data: [ep_compare_chartdatalist_lastyear[i]],
					backgroundColor : [ep_compare_bgcolorlist_compare[i]]
		    },
				{
					label: energy,
					data: [ep_compare_chartdatalist[i]],
					backgroundColor : [ep_compare_bgcolorlist[i]]
				}]
		  }
		};

		epCompareChart[i] = new Chart(ctx[i], chart[i]);
	}
	drawPaddingOfEnergyCompareCharts();
}

function drawPaddingOfEnergyCompareCharts(){
	let widthOfChartUit = 35;
	let widthOfChartLabel = $("#ep_compare_canvas_label").width();

	let widthOfChart0 = (widthOfChartLabel - (widthOfChartUit+1))/EMS_MAX_MONTH_COMPARE
	let tmpWidthOfChart0 = 64;
	let tmpPaddingOfChart0 = (widthOfChartLabel - (widthOfChartUit+1) - (64 * EMS_MAX_MONTH_COMPARE) );

	for(let i =0 ; i < EMS_MAX_MONTH_COMPARE; i++) {
		$("#ep_compare_chart_div"+i).width(tmpWidthOfChart0);
		if(tmpPaddingOfChart0 < 0 ){
			if(i===0) $("#ep_compare_chart_div"+i).css("margin-left",tmpPaddingOfChart0/(EMS_MAX_MONTH_COMPARE*2)+"px");
			else $("#ep_compare_chart_div"+i).css("margin-left",tmpPaddingOfChart0/EMS_MAX_MONTH_COMPARE+"px");
			if(i === EMS_MAX_MONTH_COMPARE-1) $("#ep_compare_chart_div"+i).css("margin-right",tmpPaddingOfChart0/(EMS_MAX_MONTH_COMPARE*2)+"px");
		} else {
			$("#ep_compare_chart_div"+i).css("margin-left","0px");
			$("#ep_compare_chart_div"+i).css("margin-right","0px");
			$("#ep_compare_chart_div0").css("margin-left",tmpPaddingOfChart0/2+"px");
		}
	}
}

function epCompareChartClickEvent(energy,chartIndex){
	//console.log(energy,chartIndex);
	var monthIndex = getMonthIndexByChartIndex(m2c_compare,chartIndex);
	for(var i = 0; i < EMS_MAX_MONTH_COMPARE; i++) {
		var tmpFontColor = "#858585";
		if(i===parseInt(chartIndex)) tmpFontColor = "#505050";
		epCompareChart[i].config.options.scales.xAxes[0].ticks.fontColor =tmpFontColor;
		epCompareChart[i].config.options.animation.duration = 0;
		epCompareChart[i].update();
	}
	drawEPEnergyCompareText(energy,monthIndex);
}

/*
function epCompareChartClickEvent(e, array){
	var chartIndex;

	for(var i =0 ; i < EMS_MAX_MONTH_COMPARE; i++) {
		if(this === epCompareChart[i]) {
			chartIndex = i;
			break;
		}
	}

	//	console.log(chartIndex);
	var monthIndex = getMonthIndexByChartIndex(m2c_compare,chartIndex);

	for(var i = 0; i < EMS_MAX_MONTH_COMPARE; i++) {
		var tmpFontColor = "#858585";
		if(i===parseInt(chartIndex)) tmpFontColor = "#505050";
		epCompareChart[i].config.options.scales.xAxes[0].ticks.fontColor =tmpFontColor;
		epCompareChart[i].config.options.animation.duration = 0;
		epCompareChart[i].update();
	}
	drawEPEnergyCompareText(this.data.datasets[0].label,monthIndex);

}
*/

/****************** drop down list *********************/
var energyMenuConfig ={
  id : "",
  parentCardDivId : "energy_card",
  parentOnClickFunc: function(){energyCardOnClick()}
}

function EnergyTotalDropMenu() {}
EnergyTotalDropMenu.prototype = {
	id: "",
	dropDownMenu : "",
	contentid: "",
	itemid: "et_dropitem",
	menuConfig: energyMenuConfig,
	initMenu: function(id,imagepath,funcName) {
		//console.log("@@initMenu",id);
		this.id = id;
		this.dropDownMenu = new BasicDropDownMenu();
		this.contentid = this.dropDownMenu.initBasicMenu(this,imagepath,id);
		this.drawFunctionName = funcName;
	},
	drawFunctionName: "",
	createMenu: function(suffix) {
		createEnergyDateDropdownMenu(this,suffix);
	},
	drawTarget: function(param1,param2){
		window[this.drawFunctionName](param1,param2);
	}
}

function createEnergyDateDropdownMenu(menu,pageSuffix) {
	var selectedMonth = et_cardMonth;
	var suffix = "";
	if (pageSuffix) {
		suffix = "_" + pageSuffix;
		selectedMonth = et_pageMonth;
	}

  var energyDropDown = {
    menuItem: []
  };
  energyDropDown.menuItem = [];

	var contentId = menu.contentid;
	var itemid = menu.itemid;

	var emsData = getEnergyInfoByMonthIndex(arrayEnergy[defaultEnergyIndex], DEFAULT_ENERGY_MONTH_INDEX);
	//console.log(emsData);
	for(var i=0; i < EMS_MAX_MONTH_COMPARE; i++) {
		var fColor="#000000";
		if( i ===parseInt(selectedMonth)) fColor="var(--brand-color)";

		var date = new Date(emsData.list[i].year, emsData.list[i].month-1);
		var options = { year: 'numeric', month: 'long'};
		var tmpItem = {
				    title: "<span id="+itemid+i+suffix+" style='float:left;color:"+fColor+"'>"+ date.toLocaleDateString(lang, options) +"</span>",
				    fun: drawEnergyByMenu,
						parameter : { mIndex: i, itemid: itemid, suffix: pageSuffix }
		 };
		energyDropDown.menuItem.push(tmpItem);
	}

	if(pageSuffix) energyPageDropDownMenu.dropDownMenu.setBasicMenu(energyDropDown.menuItem,contentId,energyPageDropDownMenu.menuConfig);
  	else energyCardDropDownMenu.dropDownMenu.setBasicMenu(energyDropDown.menuItem,contentId,energyCardDropDownMenu.menuConfig);

}

energyCardDropDownMenu = new EnergyTotalDropMenu();
energyPageDropDownMenu = new EnergyTotalDropMenu();

function drawEnergyByMenu(mIndex,pageSuffix) {
//	var mIndex = e.currentTarget.myParam.mIndex;
//	var pageSuffix = e.currentTarget.myParam.suffix;
	if(pageSuffix){
		energyPageDropDownMenu.drawTarget("total",mIndex);
	}	else {
		energyCardDropDownMenu.drawTarget(mIndex);
	}
}

/* TV API */

function initEnergyCardForTV(index,cardInfo) {

	var initHtml =
		"<div id='energy_card' class='servicecards motion_card' style='float:left'></div>";

	document.getElementById('sortableDiv_' + index).innerHTML = initHtml;

	var initHtml =
		"<div class='tv_servicecard_title_css'>에너지</div>"+
		"<div class='clear'></div>"+
		"<div id='energycard_header_text_for_tv' class='energycard_header_text_css_for_tv'>"+
		"</div>"+
		"<div class='servicecards_title_space'>" +
			"<div id='energy_card_title' ></div>" +
			"<div class='clear'></div>" +
			"</div>" +
			"<div class='servicecards_data_space'>" +
				"<div id='ems_card_enable' class='energycard_data' style='margin: 0px 12px 0px 12px'></div>" +
				"<div id='ems_card_disable'></div>" +
			"</div>" +
		"</div>";
	document.getElementById('energy_card').innerHTML = initHtml;

	initEnergyCardCommon(index,cardInfo);
	initEnergyTotalBody('ems_card_body');
	$(".servicecards_card_list").css("background-color","#FFFFFF");

	et_body_chart_barThickness = 15;
	et_body_chart_selecedFontColor = "#505051";
	et_body_chart_unselecedFontColor = "#505051";

}

function drawEnergyCardForTV(monthIndex, energyIndex, bShowChart, enableShowCardAnimation){

	if(emsObject.card_status !== "loaded"){
		document.getElementById('energy_card_title_detail').innerHTML = "";
		$("#energy_card").fadeOut(1);
    $("#energy_card").fadeIn(1000);
		return;
	}
	$(".servicecards_card_list").css("background-color","#F2F2F2");

	document.getElementById('energycard_header_text_for_tv').innerHTML =
	"전월대비<br>"+
		"<span' class='energycard_header_brand_text_for_tv'>난방사용량</span>"+
	"이 낮아요";

	if(drawEnergyCardCommon(monthIndex, energyIndex, enableShowCardAnimation) === false)return;

	if(!energyIndex) energyIndex = energySelf.energyIndex.total.lm;
	drawEnergyTotalBodyChart(arrayEnergy[energyIndex], monthIndex, bShowChart);
	document.getElementById('et_body_summary').innerHTML =
		"<div class='energycard_chart_summary_text_css_for_tv'>이번달 사용량</div>";
	var energyCardSubLabelText =
		"<div class='energycard_chart_sublabel_for_tv'>";

	$("#et_body_chart_div_label").width($(".servicecards").width() - 48);
	$("#et_body_chart_div_label").css("height","280px");
	for(let i=0; i <et_body_energylist.length; i++) {
		let tmpEnergyData = getEnergyInfoByMonthIndex(et_body_energylist[i],monthIndex);
		$("#et_body_chart_div"+i).css("width","92px");
		$("#et_body_chart_div"+i).css("height","290px");
		etBodyChart[i].options.scales.xAxes[0].ticks.fontSize = 20;
		etBodyChart[i].update();
		energyCardSubLabelText += "<div class='energycard_chart_sublabel_text_for_tv'>"+
			"<font color="+tmpEnergyData.textColor+">" +
			tmpEnergyData.data.value +
			tmpEnergyData.unitText +
			"</font>" +
		"</div>";
	}
	energyCardSubLabelText += "</div>"
	document.getElementById('et_body_chart_sublabel').innerHTML = energyCardSubLabelText;
	document.getElementById("energy_card_title").innerHTML = "";
}
