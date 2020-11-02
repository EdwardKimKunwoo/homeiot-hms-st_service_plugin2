/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Parking service shows parking location and entrance records.
 * @module service/parking/object
 * @author Home IoT R&D Team
 */

/** @classdesc parkingObject defines data storage of parking service 
 * @constructor
*/
var parkingObject = {
  name: "Parking",
  requestHistoryNum: 30, // 서버에 요청하는 History 데이터의 최소 단위, min: 9, max 99
  requestLocationNum: 15, // 서버에 요청하는 Location 데이터의 최소 단위, min 15, max:99
  locationNum: 0,
  availableNum: 0,
  historyNum: 0, // history 아이템에 대한 수 전체 수이며 이는 request data 로 가져올 때마다 그 수가 변함
  itemsInCard: 30, // circle icon 이 보여서 inview 될때 item을 몇개씩 업데이트 할 것인지에 대한 수
  pageloaded: false,
  locationcard_status: "unloaded",  // "unloaded" / "loading" / "loaded"
  spaceloaded: false,
  historycard_status: "unloaded",  // "unloaded" / "loading" / "loaded"
  clicked_index: 0,
  clicked_id:"noselect",
  clicked_type: false,
  location_last_page: 1,
  history_last_page: 1,
  location_next_page: false,
  history_next_page: false,
  request_index:1,
  next_page_loading: false,
  subServiceName:"undefined",
  colorList: [
    '#D18C8D',  // red
    '#ECCF9C',  // yellow
    '#DEA688',  // orange
    '#B5EDF1',  // sky
    '#80B99D',  // green
    '#97BADB',  // blue
    '#9C90DB',  // purple
    '#7A7A7A',  // charcoal
    '#C7C7C7',  // gray
    '#FFFFFF'   // white
  ],
  carlocationlist: [
    // {
    //   car_no: "",
    //   nickname: "",
    //   location: "",
    //   reg_time: "",
    //   color: ""
    // }
  ],
  carhistorylist: [
    // {
    //   car_no: "",
    //   nickname: "",
    //   status: "",
    //   reg_time: ""
    // }
  ]
};
