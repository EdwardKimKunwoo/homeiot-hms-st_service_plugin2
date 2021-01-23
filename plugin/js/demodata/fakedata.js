/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

////////////////////////////////////////////////////////////////////////////////////
// faka data를 사용하는 서버 종류
var jsonDataServerInfo = {
  "result":{
    "status":200,
    "message":"OK"
  },
  "data":{
    "service":[
      "notice",
      "parcel",
      "parking",
      "entry",
      "bill",
      "cctv",
      "visitor",
      "EMS"
    ],
    "ems":[
      "elec",
      "water",
      "gas",
      "hotwater",
      "heating"
    ]
  }
};

////////////////////////////////////////////////////////////////////////////////////
// Network response time을 아래 변수에 ms 단위로 입력하면, server api 호출시 delay를 적용한다.
var fakeResponseTime = 0;

////////////////////////////////////////////////////////////////////////////////////
// 여기에 sendRequest에 따른 return data를 정의한다.
// 만약 OPERATION_MODE가 0인데 아래 fakeDataMap에 정의되지 않은 apikey가 호출되면 실제 server에 값을 요청한다.
// - apikey : 필수 항목으로 sendRequest로 전달되는 parameter의 apikey에 해당하는 값을 정의한다.
// - apiName (optional) : apikey에 해당되는 명령이 전달될 경우 호출될 API의 이름이다. parameter가 함께 전달되는 경우 이에 따른 값을 선택적으로 return 하기 위해서는 API를 구현한다.
//           만약 parameter와 상관없이 단순히 지정된 값만 return 하면 된다면, apiName은 정의하지 말고 ret값만 정의 한다.
// - ret : return 값을 정의한다. 만약 apiName을 정의한다면, 본 값은 무시된다.
var fakeDataMap = [
  {
    apikey: "/notice/title",
    apiName: fake_getNotiTitle,
  },
  {
    apikey: "/parcel/deliveryInfo",
    apiName: fake_getParcelInfo
  },
  {
    apikey: "/notice/message",
    apiName: fake_getNotiBody,
  },
  {
    apikey: "/serviceInfo",
    ret: jsonDataServerInfo,
  },
  {
    apikey: "/parking/info",
    apiName: fake_getParkingLocation,
  },
  {
    apikey: "/notification",
    apiName: fake_getAlarmSetting
  },
  {
    apikey: "/parking/inNoutHistory",
    apiName: fake_getCarnotice
  },
  {
    apikey: "/ems",
    apiName: fake_getEnergy
  },
  {
    apikey: "/bill",
    apiName: fake_getAdmin
  },
  {
    apikey: "/visitor/history",
    apiName: fake_getVisitorInfo
  },
  {
    apikey: "/cctv",
    apiName: fake_getCCTVInfo
  },
  {
    apikey: "/userInfo",
    ret: jsonDataUserInfo
  },
  {
    apikey: "/legalInformation",
    apiName: fake_getLegalInformation
  }
];

////////////////////////////////////////////////////////////////////////////////////
// OPERATION_MODE가 0인 경우 SCPluginApi.js에서 sendRequest() 함수 호출시 본 함수가 대신 불린다.
var request_count = 0;
function sendRequest_fake(payload, callback) {
  // fakeDataMap에서 apikey에 해당하는 item을 찾는다.
  var apikey = payload.payload.parameters.uri.split('?');
  var item = fakeDataMap.find(function(element){
    return apikey[0].indexOf(element.apikey) === 0;
  });

  if (item !== undefined) {
    var response = {};
    // 값을 제공해줄 API가 존재하면 해당 API를 호출하고, 없으면 단순히 ret 값을 리턴한다.
    if (item.apiName !== undefined) {
      var params;
      if(apikey[1] !== undefined){
        params = apikey[1].split('&');  // '&'로 split uri와 input queries 분리
      }else{
        params ="";
      }
      response = item.apiName(payload.payload, params);
    } else {
      response = item.ret;
    }
   var request_id = request_count++;
    setTimeout(function () {
      var ret = {};
      ret.result = "SUCCESS";
      ret.response = response;
      //console.log("sendRequest_fake Response(" + request_id + ") uri : " + payload.payload.parameters.uri);
      //console.log(ret);
      callback(ret.result, JSON.stringify(response));
    }, fakeResponseTime); // Network latency를 simulate 해주는 가상의 response time을 설정해준다.
  }else{
    console.log("No ITEM");
  }
}


////////////////////////////////////////////////////////////////////////////////////
// fake data를 return 해주는 함수를 정의한다. 위의 fakeDataMap에서 선언한 함수에 대한 구현을 한다.
// 함수명 : fakeDataMap에서 선언한 함수명
// payload : sendRequest시 전달된 payload
// params : uri에 함께 전달되는 parameter (key:value array로 전달됨)

////////////////////////////////////////////////////////////////////////////////////
// 공지사항

function fake_makeNotificationFakeData(tmpJsonData){
  var tmpJsonDataCount=0;
  if(numOfItemForFakeData === "max"){
      tmpJsonDataCount = jsonDataNotification.length;
  } else {
    tmpJsonDataCount = parseInt(numOfItemForFakeData);
    if(tmpJsonDataCount > jsonDataNotification.length)
      tmpJsonDataCount = jsonDataNotification.length;
  }
  for(let i=0; i < tmpJsonDataCount ; i++){
    tmpJsonData[i] = jsonDataNotification[i];
  }
}

function fake_getNotiTitle(payload, params) {
  var inputQueries = new Object();
  var inputParms;

  var tmpJsonData=[];

  fake_makeNotificationFakeData(tmpJsonData);

  for (let j = 0; j < params.length; j++) {
    inputParms = params[j].split('=');
    inputQueries[inputParms[0]] = inputParms[1];
  }

  var jsonResponse = {};
  jsonResponse.data = {};
  jsonResponse.data.total = tmpJsonData.length;
  jsonResponse.data.start_index = parseInt(inputQueries.startIndex);

  if((parseInt(inputQueries.startIndex) + parseInt(inputQueries.num) -1) <= tmpJsonData.length){
    jsonResponse.data.count = inputQueries.num;
  }else{
    jsonResponse.data.count = tmpJsonData.length - (parseInt(inputQueries.startIndex) - 1);
  }

  jsonResponse.data.list = [];

  var start_index = parseInt(inputQueries.startIndex) - 1;

  for (let i = start_index; i < start_index + parseInt(jsonResponse.data.count); i++) {
    var jsonNotiItem = {};
    jsonNotiItem.id = tmpJsonData[i].reg_num;
    if(tmpJsonData[i].type === undefined){
      jsonNotiItem.type = "all";
    }else{
      jsonNotiItem.type = tmpJsonData[i].type;
    }
    jsonNotiItem.reg_time = tmpJsonData[i].reg_date;
    jsonNotiItem.title = tmpJsonData[i].title;
    jsonResponse.data.list.push(jsonNotiItem);
  }

  jsonResponse.result = {};
  jsonResponse.result.status = 200;
  jsonResponse.result.message = "OK";

  return jsonResponse;
}

function fake_getNotiBody(payload, params) {
  var inputQueries = new Object();
  var inputParms;

  var tmpJsonData=[];
  fake_makeNotificationFakeData(tmpJsonData);

  for (let j = 0; j < params.length; j++) {
    inputParms = params[j].split('=');
    inputQueries[inputParms[0]] = inputParms[1];
  }

  var item = tmpJsonData.find((e) => e.reg_num === inputQueries.id);
  var jsonResponse = {};
  jsonResponse.data = {};
  jsonResponse.result = {};
  if (item !== undefined) {
    jsonResponse.data.id = item.reg_num;
    jsonResponse.data.message = item.body;
    jsonResponse.data.img_url = item.img_url;
    jsonResponse.result.status = 200;
    jsonResponse.result.message = "OK";
  } else {
    jsonResponse.result.status = 204;
    jsonResponse.result.message = "No Content";
  }
  return jsonResponse;
}


function fake_getNotice(payload, params) {
  var paramCmd = params[1];
  var ret = {};
  switch (paramCmd) {
    case 'title':
    ret = fake_getNotiTitle(parseInt(params[2]), parseInt(params[3]));
    break;
    case 'body':
    ret = fake_getNotiBody(params[2]);
    break;
    default:
    break;
  }
  return ret;
}

function fake_makeParcelFakeData(tmpJsonData){
  var tmpJsonDataCount = {};

  if(numOfItemForFakeData === "max"){
      tmpJsonDataCount.parcelCount = jsonParcelInfo.parcel.length;
      tmpJsonDataCount.waitingCount = jsonParcelInfo.waiting.length;
      tmpJsonDataCount.receivedCount = jsonParcelInfo.received.length;
  } else {
    tmpJsonDataCount.parcelCount = parseInt(numOfItemForFakeData);
    tmpJsonDataCount.waitingCount = parseInt(numOfItemForFakeData);
    tmpJsonDataCount.receivedCount = parseInt(numOfItemForFakeData);

    if(tmpJsonDataCount.parcelCount > jsonParcelInfo.parcel.length)
      tmpJsonDataCount.parcelCount = jsonParcelInfo.parcel.length;
    if(tmpJsonDataCount.waitingCount > jsonParcelInfo.waiting.length)
      tmpJsonDataCount.waitingCount = jsonParcelInfo.waiting.length;
    if(tmpJsonDataCount.receivedCount > jsonParcelInfo.received.length)
      tmpJsonDataCount.receivedCount = jsonParcelInfo.received.length;
  }

  for(let i=0; i < tmpJsonDataCount.parcelCount ; i++){
    tmpJsonData.parcel[i] = jsonParcelInfo.parcel[i];
  }

  for(let i=0; i < tmpJsonDataCount.waitingCount ; i++){
    tmpJsonData.waiting[i] = jsonParcelInfo.waiting[i];
  }

  for(let i=0; i < tmpJsonDataCount.receivedCount ; i++){
    tmpJsonData.received[i] = jsonParcelInfo.received[i];
  }
}

// 택배
function fake_getParcelInfo(payload, params) {
  var inputQueries = new Object();
  var inputParms;

  var tmpJsonData={parcel:[],waiting:[],received:[]};
  fake_makeParcelFakeData(tmpJsonData);

  for (let j = 0; j < params.length; j++) {
    inputParms = params[j].split('=');
    inputQueries[inputParms[0]] = inputParms[1];
  }
  var start_index =0;
  var total_count = 0;
  var count = 0;
  var inputCount = 0;
  var jsonResponse = {};
  var jsonParcelItem = {};
  jsonResponse.data = {};
  jsonResponse.data.list = [];

  if (inputQueries.type === 'all') { //수령, 미수령 모두
    if (tmpJsonData.parcel && inputQueries.startIndex <= tmpJsonData.parcel.length) {
      start_index = inputQueries.startIndex - 1;
      inputCount = parseInt(inputQueries.num);

      if (start_index  + inputCount > tmpJsonData.parcel.length) {
        inputCount = tmpJsonData.parcel.length - start_index;
      }

      for (let i = start_index; i < start_index + inputCount; i++) {
        jsonParcelItem = {};
        jsonParcelItem.courier = tmpJsonData.parcel[i].company;
        if(tmpJsonData.parcel[i].stockroom === undefined){
          jsonParcelItem.stockroom = '무인택배함';
        }
        jsonParcelItem.locker_no = tmpJsonData.parcel[i].box_no;
        if(tmpJsonData.parcel[i].status === '미수령'){
          jsonParcelItem.status = 'in';
        }else{
          jsonParcelItem.status = 'out';
        }
        jsonParcelItem.category = tmpJsonData.parcel[i].category;
        jsonParcelItem.reg_time = tmpJsonData.parcel[i].datetime;
        jsonResponse.data.list.push(jsonParcelItem);
        count++;
      }

      total_count = tmpJsonData.parcel.length;

    } else {
      console.log("NO TOTAL FAKE DATA");
    }

  } else if(inputQueries.type === 'out') { // 수령
    if(tmpJsonData.received && inputQueries.startIndex <= tmpJsonData.received.length) {

      start_index = inputQueries.startIndex - 1;
      inputCount = inputQueries.num;

      if(start_index+inputQueries.num > tmpJsonData.received.length){
        inputCount = tmpJsonData.received.length - start_index;
      }

      for (let i = start_index; i < start_index + inputCount; i++) {
        jsonParcelItem = {};
        jsonParcelItem.courier = tmpJsonData.received[i].company;
        if(tmpJsonData.received[i].stockroom === undefined){
          jsonParcelItem.stockroom = '무인택배함';
        }
        jsonParcelItem.locker_no = tmpJsonData.received[i].box_no;
        jsonParcelItem.status = 'out';
        jsonParcelItem.category = tmpJsonData.received[i].category;
        jsonParcelItem.reg_time = tmpJsonData.received[i].datetime;
        jsonResponse.data.list.push(jsonParcelItem);
        count++;
      }

      total_count = tmpJsonData.received.length;

    } else {
      console.log("NO  RECEIVED FAKE DATA");
    }
  } else if(inputQueries.type === 'in') { // 미수령
    if(tmpJsonData.waiting && inputQueries.startIndex <= tmpJsonData.waiting.length) {
      start_index = inputQueries.startIndex - 1;
      inputCount = inputQueries.num;

      if(start_index+inputQueries.num > tmpJsonData.waiting.length){
        inputCount = tmpJsonData.waiting.length - start_index;
      }

      for (let i = start_index; i < start_index + inputCount; i++) {
        jsonParcelItem = {};
        jsonParcelItem.courier = tmpJsonData.waiting[i].company;
        if(tmpJsonData.waiting[i].stockroom === undefined){
          jsonParcelItem.stockroom = '무인택배함';
        }
        jsonParcelItem.locker_no = tmpJsonData.waiting[i].box_no;
        jsonParcelItem.status = 'in';
        jsonParcelItem.category = tmpJsonData.waiting[i].category;
        jsonParcelItem.reg_time = tmpJsonData.waiting[i].datetime;
        jsonResponse.data.list.push(jsonParcelItem);
        count++;
      }

      total_count = tmpJsonData.waiting.length;

    } else {
      console.log("NO  RECEIVED FAKE DATA");
    }
  }

  jsonResponse.data.type = inputQueries.type;
  jsonResponse.data.total = total_count;
  jsonResponse.data.start_index = parseInt(inputQueries.startIndex);
  jsonResponse.data.count = count;
  jsonResponse.result = {};
  jsonResponse.result.status = 200;
  jsonResponse.result.message = "OK";

  return jsonResponse;
}

//에너지 사용량
var fakeEnergyData = {
  elec: jsonDataEnergyElec,
  water: jsonDataEnergyWater,
  gas: jsonDataEnergyGas,
  hotwater: jsonDataEnergyHotWater,
  heat: jsonDataEnergyHeating,
}

function fake_makeEnergyFakeData(energy,tmpJsonData){
    var tmpJsonDataCount = 0;

    tmpJsonData.curmonth = fakeEnergyData[energy].curmonth;

    if(numOfItemForFakeData === "max"){
        tmpJsonDataCount = fakeEnergyData[energy].list.length;
        tmpJsonData.count = ""+fakeEnergyData[energy].count;
    } else {
      tmpJsonData.count = ""+parseInt(numOfItemForFakeData);
      tmpJsonDataCount = parseInt(numOfItemForFakeData);

      if(tmpJsonDataCount > fakeEnergyData[energy].list.length)
        tmpJsonDataCount = fakeEnergyData[energy].list.length;
    }

    for(let i=0; i < tmpJsonDataCount ; i++){
      tmpJsonData.list[i] = fakeEnergyData[energy].list[i];
    }
}

function fake_getEnergy(payload, params) {

  var inputQueries = new Object();
  var inputParms;
  var sMonth;
  var nMonth;

  for (let j = 0; j < params.length; j++) {
    inputParms = params[j].split('=');
    inputQueries[inputParms[0]] = inputParms[1];
  }

  var jsonResponse = {};
  jsonResponse.data = {};
  jsonResponse.data.list = [];
  jsonResponse.data.type = inputQueries.type;

  var tmpJsonData={count:"",curmonth:"",list:[]};
  fake_makeEnergyFakeData(inputQueries.type,tmpJsonData);

  if(tmpJsonData.list !== undefined && tmpJsonData.list.length !== undefined && tmpJsonData.list.length !== 0){

    jsonResponse.data.count = parseInt(tmpJsonData.count);
    jsonResponse.data.list = tmpJsonData.list;

    for (let i = 0; i < jsonResponse.data.list.length; i++) {
      sMonth = parseInt(jsonResponse.data.list[i].month);
      jsonResponse.data.list[i].month = String(sMonth);
    }

    sMonth = parseInt(jsonResponse.data.list[0].month);
    if(sMonth < 10 ){
      nMonth = '0' + String(sMonth);
    }else{
      nMonth =  String(sMonth);
    }

    jsonResponse.data.curmonth = jsonResponse.data.list[0].year + "-" + nMonth;
    jsonResponse.result = {};
    jsonResponse.result.status = 200;
    jsonResponse.result.message = "OK";

  }else{

    jsonResponse.data.count = 0;
    jsonResponse.data.list = [];
    jsonResponse.data.curmonth = "";
    jsonResponse.result = {};
    jsonResponse.result.status = 204;
    jsonResponse.result.message = "No Content"

  }

  return jsonResponse;
}


function fake_makeAdminFakeData(tmpJsonData){
    var tmpJsonDataCount = 0;

    if(numOfItemForFakeData === "max"){
        tmpJsonDataCount = jsonAdmin.list.length;
    } else {
      tmpJsonDataCount = parseInt(numOfItemForFakeData);

      if(tmpJsonDataCount > jsonAdmin.list.length)
        tmpJsonDataCount = jsonAdmin.list.length;
    }

    for(let i=0; i < tmpJsonDataCount ; i++){
      tmpJsonData.list[i] = jsonAdmin.list[i];
    }
}

// 관리비
function fake_getAdmin(payload, params) {
  var inputQueries = new Object();
  var inputParms;
  var sMonth;
  var nMonth;

  var tmpJsonData={list:[]};
  fake_makeAdminFakeData(tmpJsonData);

  for (let j = 0; j < params.length; j++) {
    inputParms = params[j].split('=');
    inputQueries[inputParms[0]] = inputParms[1];
  }

  var jsonResponse = {};

  if(tmpJsonData.list !== undefined &&  tmpJsonData.list.length !== undefined && tmpJsonData.list.length !== 0){

    jsonResponse.data = tmpJsonData;
    jsonResponse.data.count = tmpJsonData.list.length;

    sMonth = parseInt(jsonResponse.data.list[0].period.month);
    if(sMonth < 10 ){
      nMonth = '0' + String(sMonth);
    }else{
      nMonth =  String(sMonth);
    }

    jsonResponse.data.curmonth = jsonResponse.data.list[0].period.year + "-" + nMonth;
    jsonResponse.result = {};
    jsonResponse.result.status = 200;
    jsonResponse.result.message = "OK";

  }else{

    jsonResponse.data = {};
    jsonResponse.data.count = 0;
    jsonResponse.data.curmonth = "";
    jsonResponse.data.list =[];
    jsonResponse.result = {};
    jsonResponse.result.status = 204;
    jsonResponse.result.message = "No Content"

  }

  return jsonResponse;

}

var fakeAlarmSetting = {
  list: [
    {
      alarm: SERVICE_ALARMID_NOTIFCATION,
      value: "on"
    },
    {
      alarm: SERVICE_ALARMID_PARCEL,
      value: "off"
    },
    {
      alarm: SERVICE_ALARMID_PARKING_LOCATION,
      value: "off"
    },
    {
      alarm: SERVICE_ALARMID_PARKING_HISTORY,
      value: "on"
    },
    {
      alarm: SERVICE_ALARMID_ADMIN,
      value: "on"
    },
    {
      alarm: SERVICE_ALARMID_VISITOR,
      value: "on"
    }
  ]
};

// 알람 설정
function fake_getAlarmSetting(payload, params) {
  var method = payload.parameters.method;
  var jsonResponse = {};
  jsonResponse.data = {};

  if (method === "GET") {
    jsonResponse.data.list = fakeAlarmSetting.list;
  } else if (method === "POST") {
    var body = JSON.parse(payload.parameters.body);
    jsonResponse.data = body;
    for(let i = 0 ; i < body.list.length ; i++) {
      let index = fakeAlarmSetting.list.findIndex((e) => e.alarm === body.list[i].alarm);
      fakeAlarmSetting.list[index].value = body.list[i].value;
    }
  }

  jsonResponse.result = {};
  jsonResponse.result.status = 200;
  jsonResponse.result.message = "OK";

  return jsonResponse;
}

var fakeLegalInformationSetting = {
    data: {
        service_title: "삼성아파트",
        tnc: {
            eula: "1.0.1",
            lock_smith: "1.0.0"
        },
        tppa: {
            eula: "1.0.1",
            lock_smith: "1.0.0"
        }
    }
};
// Legal Agreement Information
function fake_getLegalInformation(payload, params) {
    var method = payload.parameters.method;
    var jsonResponse = {};
    jsonResponse.data = {};

    if (method === "GET") {
        jsonResponse.data = fakeLegalInformationSetting.data;
    } else if (method === "POST") {
       var body = JSON.parse(payload.parameters.body);

       if(body.tnc !== undefined){
         fakeLegalInformationSetting.data.tnc.lock_smith = body.tnc;
         jsonResponse.data.tnc = fakeLegalInformationSetting.data.tnc.lock_smith;
       }

       if(body.tppa !== undefined){
          fakeLegalInformationSetting.data.tppa.lock_smith = body.tppa;
          jsonResponse.data.tppa = fakeLegalInformationSetting.data.tppa.lock_smith;
       }
    }

    jsonResponse.result = {};
    jsonResponse.result.status = 200;
    jsonResponse.result.message = "OK";

    return jsonResponse;
}

function fake_makeParkingLocationFakeData(tmpJsonData){
    var tmpJsonDataCount = 0;

    if(numOfItemForFakeData === "max"){
        tmpJsonDataCount = jsonParkingLocation.list.length;
    } else {
      tmpJsonDataCount = parseInt(numOfItemForFakeData);

      if(tmpJsonDataCount > jsonParkingLocation.list.length)
        tmpJsonDataCount = jsonParkingLocation.list.length;
    }

    for(let i=0; i < tmpJsonDataCount ; i++){
      tmpJsonData.list[i] = jsonParkingLocation.list[i];
    }
}

// Parking Location
function fake_getParkingLocation(payload, params) {
  var parkingLocationLength = 0;

  var tmpJsonData={list:[]};
  fake_makeParkingLocationFakeData(tmpJsonData);

  if(tmpJsonData.list) parkingLocationLength = tmpJsonData.list.length;

  var jsonParking = {};
  jsonParking.data = {};
  jsonParking.data.count = parkingLocationLength;
  jsonParking.data.list = [];

  for (let i = 0; i < parkingLocationLength; i++) {
    var jsonParkingItem = {};
    jsonParkingItem.car_no = tmpJsonData.list[i].car_no;
    jsonParkingItem.nickname = tmpJsonData.list[i].nickname;
    jsonParkingItem.location = tmpJsonData.list[i].location;
    jsonParkingItem.reg_time = tmpJsonData.list[i].reg_time;
    jsonParking.data.list.push(jsonParkingItem);
  }

  jsonParking.result = {};
  jsonParking.result.status = 200;
  jsonParking.result.message = "OK";

  return jsonParking;
}

function fake_makeParkingHistoryFakeData(tmpJsonData){
    var tmpJsonDataCount = 0;

    if(numOfItemForFakeData === "max"){
        tmpJsonDataCount = jsonDataParkingHistory.list.length;
    } else {
      tmpJsonDataCount = parseInt(numOfItemForFakeData);

      if(tmpJsonDataCount > jsonDataParkingHistory.list.length)
        tmpJsonDataCount = jsonDataParkingHistory.list.length;
    }

    for(let i=0; i < tmpJsonDataCount ; i++){
      tmpJsonData.list[i] = jsonDataParkingHistory.list[i];
    }
}
// 출입차
function fake_getCarnotice(payload, params) {
  var inputQueries = new Object();
  var inputParms;
  var total_count = 0;
  var count = 0;
  var num = 0;

  var tmpJsonData={list:[]};
  fake_makeParkingHistoryFakeData(tmpJsonData);

  for (let j = 0; j < params.length; j++) {
    inputParms = params[j].split('=');
    inputQueries[inputParms[0]] = inputParms[1];
  }

  total_count = 0;
  count = 0;
  num = parseInt(inputQueries.num);

  var jsonResponse = {};
  jsonResponse.data = {};
  jsonResponse.data.list = [];

  if(tmpJsonData.list){

    if(inputQueries.type ==! 'all'){
      for (let i = 0; i < tmpJsonData.list.lentgh; i++) {
        if(inputQueries.type === tmpJsonData.list[i].status){
          total_count++;
        }
      }
    }else{
      //console.log("tmpJsonData.list.lentgh : "+tmpJsonData.list.length );
      total_count = tmpJsonData.list.length;
    }

    //console.log("total_count : "+total_count );
    var start_index = parseInt(inputQueries.startIndex) - 1;
    jsonResponse.data.type = inputQueries.type;

    var jsonCarItem;

    if(inputQueries.startIndex <= total_count){
      for (let i = start_index; i < tmpJsonData.list.length; i++) {
        if(inputQueries.type === 'all'){
          if(count < start_index+inputQueries.num){
            jsonCarItem = {};
            jsonCarItem.car_no = tmpJsonData.list[i].car_no;
            jsonCarItem.nickname = tmpJsonData.list[i].nickname;
            jsonCarItem.status = tmpJsonData.list[i].status;
            jsonCarItem.reg_time = tmpJsonData.list[i].reg_time;
            jsonResponse.data.list.push(jsonCarItem);
            count++;
          }
        }else{
          if(inputQueries.type === tmpJsonData.list[i].status){
            if(count < start_index+inputQueries.num){
              jsonCarItem = {};
              jsonCarItem.car_no = tmpJsonData.list[i].car_no;
              jsonCarItem.nickname = tmpJsonData.list[i].nickname;
              jsonCarItem.status = tmpJsonData.list[i].status;
              jsonCarItem.reg_time = tmpJsonData.list[i].reg_time;
              jsonResponse.data.list.push(jsonCarItem);
              count++;
            }
          }
        }
        if(num === count){
          break;
        }
      }
    }

    jsonResponse.data.total = total_count;
    jsonResponse.data.count = count;
    jsonResponse.data.start_index = parseInt(inputQueries.startIndex);

  }

  jsonResponse.result = {};
  jsonResponse.result.status = 200;
  jsonResponse.result.message = "OK";

  return  jsonResponse;
}

function fake_makeVisitorInfoFakeData(tmpJsonData){
    var tmpJsonDataCount = {};

    if(numOfItemForFakeData === "max"){
        tmpJsonDataCount = jsonVisitorInfo.list.length;
    } else {
      tmpJsonDataCount = parseInt(numOfItemForFakeData);

      if(tmpJsonDataCount > jsonVisitorInfo.list.length)
        tmpJsonDataCount = jsonVisitorInfo.list.length;
    }

    for(let i=0; i < tmpJsonDataCount ; i++){
      tmpJsonData.list[i] = jsonVisitorInfo.list[i];
    }
}

// 방문자
function fake_getVisitorInfo(payload, params) {
  var inputQueries = new Object();
  var inputParms;

  var tmpJsonData={list:[]};
  fake_makeVisitorInfoFakeData(tmpJsonData);

  for (let j = 0; j < params.length; j++) {
    inputParms = params[j].split('=');
    inputQueries[inputParms[0]] = inputParms[1];
  }

  var start_index =0;
  var total_count = 0;
  var count = 0;
  var inputCount = 0;
  var jsonResponse = {};
  jsonResponse.data = {};
  jsonResponse.data.list = [];

  if (tmpJsonData.list && inputQueries.startIndex <= tmpJsonData.list.length) {
    start_index = inputQueries.startIndex - 1;
    inputCount = parseInt(inputQueries.num);

    if (start_index + inputCount > tmpJsonData.list.length) {
      inputCount = tmpJsonData.list.length - start_index;
    }

    for (let i = start_index; i < start_index + inputCount; i++) {
      let jsonVisitorItem = {};
      jsonVisitorItem.location = tmpJsonData.list[i].location;
      jsonVisitorItem.reg_time = tmpJsonData.list[i].reg_time;
      jsonVisitorItem.image_data = tmpJsonData.list[i].image_data;
      jsonVisitorItem.image_data_format = tmpJsonData.list[i].image_data_format;
      jsonVisitorItem.image_url = tmpJsonData.list[i].image_url;
      jsonResponse.data.list.push(jsonVisitorItem);
      count++;
    }

    total_count = tmpJsonData.list.length;

  } else {
    console.log("NO TOTAL VISITOR FAKE DATA");
  }

  jsonResponse.data.type = inputQueries.type;
  jsonResponse.data.total = total_count;
  jsonResponse.data.start_index = parseInt(inputQueries.startIndex);
  jsonResponse.data.count = count;
  jsonResponse.result = {};
  jsonResponse.result.status = 200;
  jsonResponse.result.message = "OK";

  return jsonResponse;
}

function fake_makeCCTVFakeData(tmpJsonData){
    var tmpJsonDataCount = 0;

    if(numOfItemForFakeData === "max"){
      if (jsonCCTVInfo) {
        tmpJsonDataCount = jsonCCTVInfo.list.length;
      }
    } else {
      tmpJsonDataCount = parseInt(numOfItemForFakeData);

      if(tmpJsonDataCount > jsonCCTVInfo.list.length)
        tmpJsonDataCount = jsonCCTVInfo.list.length;
    }

    for(let i=0; i < tmpJsonDataCount ; i++){
      tmpJsonData.list[i] = jsonCCTVInfo.list[i];
    }
}

// CCTV
function fake_getCCTVInfo() {

  var tmpJsonData={list:[]};
  fake_makeCCTVFakeData(tmpJsonData);

  var jsonResponse = {};
  if (tmpJsonData.list) {
    jsonResponse.data = {};
    jsonResponse.data.count = tmpJsonData.list.length;
    jsonResponse.data.list = [];
    for (let i = 0; i < tmpJsonData.list.length; i++) {
      var jsonCCTVItem = {};
      jsonCCTVItem.location = tmpJsonData.list[i].location;
      jsonCCTVItem.stream_url = tmpJsonData.list[i].stream_url;
      jsonCCTVItem.poster_url = tmpJsonData.list[i].poster_url;
      jsonResponse.data.list.push(jsonCCTVItem);
    }
  } else {
    console.log("NO TOTAL CCTV FAKE DATA");
  }

  jsonResponse.result = {};
  jsonResponse.result.status = 200;
  jsonResponse.result.message = "OK";

  return jsonResponse;
}
