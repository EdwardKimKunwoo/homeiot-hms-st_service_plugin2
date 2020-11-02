/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/* for kor fake data */
var d = new Date();
var currentTime = d.tostring();

var p1m = new Date();
p1m.setMinutes(d.getMinutes() - 1);
var prev1minTime = p1m.tostring();

var p30m = new Date();
p30m.setMinutes(d.getMinutes() - 30);
var prev30minTime = p30m.tostring();

var p1h = new Date();
p1h.setHours(d.getHours() - 1);
var prev1hourTime = p1h.tostring();

var p2h = new Date();
p2h.setHours(d.getHours() - 2);
var prev2hourTime = p2h.tostring();

var p3h = new Date();
p3h.setHours(d.getHours() - 3);
var prev3hourTime = p3h.tostring();

var p5h = new Date();
p5h.setHours(d.getHours() - 5);
var prev5hourTime = p5h.tostring();

var p12h = new Date();
p12h.setHours(d.getHours() - 12);
var prev12hourTime = p12h.tostring();

var p1d = new Date();
p1d.setHours(d.getHours() - 24);
var prev1dayTime = p1d.tostring();

var a5d = new Date();
a5d.setDate(d.getDate() + 5);
var after5dayTime = a5d.tostring();

var a32d = new Date();
a32d.setDate(d.getDate() + 32);
var after32dayTime = a32d.tostring();

var prev0monthTime = toDataStringWithCurrentYearMonth();
//console.log("prev0monthTime",prev0monthTime );

var fakeDateYM = {
  list : [
    //{
    //year: "",
    //month: "",
  //}
  ]
}

generateEnergyInfo();
/*
for(let i=0; i<18; i++){
  console.log("fakeDateYM.list[",i,"].year",fakeDateYM.list[i].year );
  console.log("fakeDateYM.list[",i,"].month",fakeDateYM.list[i].month );
}*/


var jsonDataUserInfo = {
  "result":{
     "status":200,
     "message":"OK"
  },
  "data":{
     "local":"경기도",
     "apt_complex":"영통스마트빌 1차",
     "building_no":"1118",
     "unit":"204"
  }
}
