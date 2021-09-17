/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/* for eng fake data */
var d = new Date();
var currentTime = d.tostring();

d.setMinutes(d.getMinutes() - 1);
var prev1minTime = d.tostring();

d.setHours(d.getHours() - 1);
var prev1hourTime = d.tostring();

d.setHours(d.getHours() - 4);
var prev5hourTime = d.tostring();

d.setDate(d.getDate() - 1);
var prev1dayTime = d.tostring();

d.setFullYear(d.getFullYear() - 1);
var prev1yearTime = d.tostring();

d.setDate(d.getDate() + 5);
var after5dayTime = d.tostring();

d.setDate(d.getDate() + 27);
var after32dayTime = d.tostring();

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
     "brandName" : "IAAN",
     "brandColor":"#696B71",
     "local":"Gyeonggi-do",
     "apt_complex":"Yeongtong SmartVill",
     "building_no":"1118",
     "unit":"204"
  }
}
