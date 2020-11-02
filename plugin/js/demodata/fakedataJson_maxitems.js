/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/* Notification */

var jsonDataNotification = [  // multiline_many_items
   {
      reg_num: "1",
      reg_date: currentTime,
      title: "입주자 대표회의 개최",
      body: "당 아파트 입주자 대표 회의를 하기와 같이 실시 합니다.\n\n1. 일시 : 2019년 11월 13일\n2. 장소 : 아파트 관리 사무소\n3. 회의 안건\n    -. 하자보수 진행 협의\n    -. 어린이 놀이터 보수업체 선정\n    -. 방범용 CCTV 추가 설치\n\n         -     이       상    -",
      img_url: "service/notification/res/img/notification_play_ground.png" // "https://s3.ap-northeast-2.amazonaws.com/sttest-dongjin/reamian/log2.png"
   },
   {
      reg_num: "2",
      reg_date: prev1minTime,
      title: "물류창고 이전으로 인한 배송불가 안내",
      body: "109동 101호 개별 공지 테스트",
      img_url: "service/notification/res/img/notification_delivery_delay.png" // "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
   },
   {
      reg_num: "50",
      reg_date: "2019-03-17 08:27:31",
      title: "어린이집 휴관 안내",
      body: "당 아파트에서 운영중인 어린이집 운영과 관련하여,\n하기와 같이 휴관안내 드리오니 참조하여 주시기 바랍니다.\n \n1. 휴관안내 일정\n     -> 2017년 12월 28일 ~ 12월 31일 (4일간)\n\n감사합니다.",
      img_url: "service/notification/res/img/notification_nursery.png"
   },
   {
      reg_num: "51",
      reg_date: "2018-12-26 14:27:31",
      title: "세대내 추가 소독 실시 안내",
      body: "아파트 내 추가 소독 관련하여 안내말씀드립니다.\n 일자 : 2018년 11월26일\n 시간 : 오전11시 ~ 2시 사이",
      img_url: "service/notification/res/img/notification_disinfection.png"
   },
   {
      reg_num: "52",
      reg_date: "2018-12-20 12:27:31",
      title: "단지 공지사항",
      body: "관리사무소에서 안내말씀 드립니다.\n각동 공동출입문 비밀번호 등록 방법은 승강기 내부 및 1층과 지하1층 게시판에 공고 하였습니다.\n아울러 입주시에 받으신 월패드 사용설명서에도 안내문구가 있습니다.\n비밀번호 등록 및 사용법이 불편하신 어르신들게써는 출입카드를 사용 하심을 권장드립니다.\n\n감사합니다.",
      img_url: ""
   },
   {
      reg_num: "53",
      reg_date: "2019-03-17 08:27:31",
      title: "전체공지 테스트",
      body: "관리사무소에서 안내말씀 드립니다.\n각동 공동출입문 비밀번호 등록 방법은 승강기 내부 및 1층과 지하1층 게시판에 공고 하였습니다.\n아울러 입주시에 받으신 월패드 사용설명서에도 안내문구가 있습니다.\n비밀번호 등록 및 사용법이 불편하신 어르신들게써는 출입카드를 사용 하심을 권장드립니다.\n\n감사합니다.",
      img_url: ""
   },
   {
      reg_num: "61",
      reg_date: "2017-12-13 11:27:31",
      title: "test1",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "62",
      reg_date: "2017-12-13 11:27:31",
      title: "test2",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "63",
      reg_date: "2017-12-13 11:27:31",
      title: "test3",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "64",
      reg_date: "2017-12-13 11:27:31",
      title: "test4",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "65",
      reg_date: "2017-12-13 11:27:31",
      title: "test5",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "66",
      reg_date: "2017-12-13 11:27:31",
      title: "test6",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "67",
      reg_date: "2017-12-13 11:27:31",
      title: "test7",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "68",
      reg_date: "2017-12-13 11:27:31",
      title: "test8",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "69",
      reg_date: "2017-12-13 11:27:31",
      title: "test9",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "70",
      reg_date: "2017-12-13 11:27:31",
      title: "test10",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "71",
      reg_date: "2017-12-13 11:27:31",
      title: "test11",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "72",
      reg_date: "2017-12-13 11:27:31",
      title: "test12",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "73",
      reg_date: "2017-12-13 11:27:31",
      title: "test13",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "74",
      reg_date: "2017-12-13 11:27:31",
      title: "test14",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "75",
      reg_date: "2017-12-13 11:27:31",
      title: "test15",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "76",
      reg_date: "2017-12-13 11:27:31",
      title: "test16",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "77",
      reg_date: "2017-12-13 11:27:31",
      title: "test17",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "78",
      reg_date: "2017-12-13 11:27:31",
      title: "test18",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "79",
      reg_date: "2017-12-13 11:27:31",
      title: "test19",
      body: "test body",
      img_url: ""
   },
   {
      reg_num: "80",
      reg_date: "2017-12-13 11:27:31",
      title: "test20",
      body: "test body",
      img_url: ""
   }
];

/* Parcel */

var jsonParcelInfo = {
  parcel: [{
    company: "한진택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: prev1hourTime,
  },
  {
    company: "대한통운",
    box_no: "무인택배함2 A01-121",
    status: "미수령",
    category: "냉동",
    datetime: prev1dayTime,
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "수령",
    category: "식품",
    datetime: "2019-05-27 06:30:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "우편",
    datetime: "2019-05-27 05:20:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함5 A01-103",
    status: "미수령",
    category: "일반",
    datetime: "2019-05-25 04:10:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "수령",
    category: "식품",
    datetime: "2019-05-25 01:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2019-03-11 11:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함8 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-03-11 08:40:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "수령",
    category: "식품",
    datetime: "2019-03-11 00:50:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2019-03-11 00:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함11 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-03-11 00:10:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2019-02-15 20:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2019-02-15 19:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함14 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-02-14 18:40:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-05 17:30:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2019-01-05 16:20:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함17 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-05 16:10:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-01 16:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2019-01-01 15:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함20 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-12-26 15:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-12-26 15:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함22 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 15:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 15:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-11-16 15:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함25 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 14:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2018-10-11 14:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-10-11 14:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함28 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-05-01 14:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2018-05-01 14:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-04-25 14:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함31 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-04-25 13:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함34 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-02-14 13:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함36 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-02-14  13:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "수령",
    category: "식품",
    datetime: "2018-01-14 12:50:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "수령",
    category: "냉동",
    datetime: "2018-01-14 12:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함39 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-01-14 12:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "수령",
    category: "식품",
    datetime: "2018-01-02 12:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "수령",
    category: "냉동",
    datetime: "2018-01-02 12:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함42 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-01-02 12:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "수령",
    category: "냉동",
    datetime: "2017-12-02 11:50:01",
  },
  ],
  /*
  parcel_72ea: [{
    company: "한진택배1",
    box_no: "관리사무소1",
    status: "미수령",
    category: "식품",
    datetime: prev1hourTime,
  },
  {
    company: "대한통운",
    box_no: "무인택배함2 A01-121",
    status: "미수령",
    category: "냉동",
    datetime: prev1dayTime,
  },
  {
    company: "우체국택배",
    box_no: "관리사무소3",
    status: "수령",
    category: "식품",
    datetime: "2019-05-27 06:30:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소4",
    status: "미수령",
    category: "우편",
    datetime: prev1dayTime,
  },
  {
    company: "대한통운",
    box_no: "무인택배함5 A01-103",
    status: "미수령",
    category: "일반",
    datetime: "2019-05-25 04:10:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소6",
    status: "수령",
    category: "식품",
    datetime: "2019-05-25 01:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소7",
    status: "미수령",
    category: "냉동",
    datetime: "2019-03-11 00:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함8 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-03-11 00:40:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소9",
    status: "수령",
    category: "식품",
    datetime: "2019-03-10 23:30:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소10",
    status: "미수령",
    category: "냉동",
    datetime: "2019-03-10 22:20:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함11 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-03-10 21:10:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소12",
    status: "미수령",
    category: "식품",
    datetime: "2019-02-15 20:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소13",
    status: "미수령",
    category: "냉동",
    datetime: "2019-02-15 19:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함14 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-02-14 18:40:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소15",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-05 17:30:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소16",
    status: "미수령",
    category: "냉동",
    datetime: "2019-01-05 16:20:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함17 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-05 16:10:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소18",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-01 16:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소19",
    status: "미수령",
    category: "냉동",
    datetime: "2019-01-01 15:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함20 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-12-26 15:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소21",
    status: "미수령",
    category: "냉동",
    datetime: "2018-12-26 15:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함22 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 15:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소23",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 15:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소24",
    status: "미수령",
    category: "냉동",
    datetime: "2018-11-16 15:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함25 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 14:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소26",
    status: "미수령",
    category: "식품",
    datetime: "2018-10-11 14:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소27",
    status: "미수령",
    category: "냉동",
    datetime: "2018-10-11 14:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함28 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-05-01 14:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소29",
    status: "미수령",
    category: "식품",
    datetime: "2018-05-01 14:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소30",
    status: "미수령",
    category: "냉동",
    datetime: "2018-04-25 14:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함31 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소32",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소33",
    status: "미수령",
    category: "냉동",
    datetime: "2018-04-25 13:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함34 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소35",
    status: "미수령",
    category: "냉동",
    datetime: "2018-02-14 13:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함36 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-02-14  13:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소37",
    status: "수령",
    category: "식품",
    datetime: "2018-01-14 12:50:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소38",
    status: "수령",
    category: "냉동",
    datetime: "2018-01-14 12:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함39 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-01-14 12:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소40",
    status: "수령",
    category: "식품",
    datetime: "2018-01-02 12:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소41",
    status: "수령",
    category: "냉동",
    datetime: "2018-01-02 12:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함42 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-01-02 12:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소43",
    status: "수령",
    category: "냉동",
    datetime: "2017-12-02 11:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함44 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-12-26 15:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소45",
    status: "미수령",
    category: "냉동",
    datetime: "2016-12-26 15:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함46 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-11-16 15:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소47",
    status: "미수령",
    category: "식품",
    datetime: "2016-11-16 15:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소48",
    status: "미수령",
    category: "냉동",
    datetime: "2016-11-16 15:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함49 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-11-16 14:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소50",
    status: "미수령",
    category: "식품",
    datetime: "2016-10-11 14:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소51",
    status: "미수령",
    category: "냉동",
    datetime: "2016-10-11 14:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함52 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-05-01 14:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소53",
    status: "미수령",
    category: "식품",
    datetime: "2016-05-01 14:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소54",
    status: "미수령",
    category: "냉동",
    datetime: "2016-04-25 14:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함55 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-04-25 13:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소56",
    status: "미수령",
    category: "식품",
    datetime: "2016-04-25 13:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소57",
    status: "미수령",
    category: "냉동",
    datetime: "2016-04-25 13:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함58 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-04-25 13:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소59",
    status: "미수령",
    category: "냉동",
    datetime: "2016-02-14 13:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함60 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2016-02-14  13:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소61",
    status: "수령",
    category: "식품",
    datetime: "2016-01-14 12:50:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소62",
    status: "수령",
    category: "냉동",
    datetime: "2016-01-14 12:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함63 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2016-01-14 12:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소64",
    status: "수령",
    category: "식품",
    datetime: "2016-01-02 12:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소65",
    status: "수령",
    category: "냉동",
    datetime: "2016-01-02 12:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함66 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2016-01-02 12:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소67",
    status: "수령",
    category: "냉동",
    datetime: "2015-12-02 11:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함68 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-12-26 15:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소69",
    status: "미수령",
    category: "냉동",
    datetime: "2014-12-26 15:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함70 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-11-16 15:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소71",
    status: "미수령",
    category: "식품",
    datetime: "2014-11-16 15:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소72",
    status: "미수령",
    category: "냉동",
    datetime: "2014-11-16 15:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함73 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-11-16 14:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소74",
    status: "미수령",
    category: "식품",
    datetime: "2014-10-11 14:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소75",
    status: "미수령",
    category: "냉동",
    datetime: "2014-10-11 14:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함76 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-05-01 14:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소77",
    status: "미수령",
    category: "식품",
    datetime: "2014-05-01 14:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소78",
    status: "미수령",
    category: "냉동",
    datetime: "2014-04-25 14:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함79 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-04-25 13:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소80",
    status: "미수령",
    category: "식품",
    datetime: "2014-04-25 13:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소81",
    status: "미수령",
    category: "냉동",
    datetime: "2014-04-25 13:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함82 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-04-25 13:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소83",
    status: "미수령",
    category: "냉동",
    datetime: "2014-02-14 13:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함84 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2014-02-14  13:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소85",
    status: "수령",
    category: "식품",
    datetime: "2014-01-14 12:50:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소86",
    status: "수령",
    category: "냉동",
    datetime: "2014-01-14 12:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함87 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2014-01-14 12:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소88",
    status: "수령",
    category: "식품",
    datetime: "2014-01-02 12:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소89",
    status: "수령",
    category: "냉동",
    datetime: "2014-01-02 12:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함90 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2014-01-02 12:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소91",
    status: "수령",
    category: "냉동",
    datetime: "2013-12-02 11:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함92 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-12-26 15:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소93",
    status: "미수령",
    category: "냉동",
    datetime: "2012-12-26 15:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함94 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-11-16 15:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소95",
    status: "미수령",
    category: "식품",
    datetime: "2012-11-16 15:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소96",
    status: "미수령",
    category: "냉동",
    datetime: "2012-11-16 15:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함97 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-11-16 14:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소98",
    status: "미수령",
    category: "식품",
    datetime: "2012-10-11 14:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소99",
    status: "미수령",
    category: "냉동",
    datetime: "2012-10-11 14:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함100 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-05-01 14:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소101",
    status: "미수령",
    category: "식품",
    datetime: "2012-05-01 14:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소102",
    status: "미수령",
    category: "냉동",
    datetime: "2012-04-25 14:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함103 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-04-25 13:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소104",
    status: "미수령",
    category: "식품",
    datetime: "2012-04-25 13:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소105",
    status: "미수령",
    category: "냉동",
    datetime: "2012-04-25 13:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함106 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-04-25 13:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소107",
    status: "미수령",
    category: "냉동",
    datetime: "2012-02-14 13:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함108 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2012-02-14  13:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소109",
    status: "수령",
    category: "식품",
    datetime: "2012-01-14 12:50:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소110",
    status: "수령",
    category: "냉동",
    datetime: "2012-01-14 12:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함111 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2012-01-14 12:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소112",
    status: "수령",
    category: "식품",
    datetime: "2012-01-02 12:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소113",
    status: "수령",
    category: "냉동",
    datetime: "2012-01-02 12:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함114 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2012-01-02 12:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소115",
    status: "수령",
    category: "냉동",
    datetime: "2011-12-02 11:50:01",
  },
  ],*/
  waiting: [{
    company: "한진택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: prev1hourTime,
  },
  {
    company: "대한통운",
    box_no: "무인택배함2 A01-121",
    status: "미수령",
    category: "냉동",
    datetime: prev1dayTime,
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "우편",
    datetime: "2019-05-27 05:20:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함5 A01-103",
    status: "미수령",
    category: "일반",
    datetime: "2019-05-25 04:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2019-03-11 11:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함8 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-03-11 08:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2019-03-11 00:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함11 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-03-11 00:10:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2019-02-15 20:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2019-02-15 19:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함14 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-02-14 18:40:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-05 17:30:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2019-01-05 16:20:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함17 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-05 16:10:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-01 16:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2019-01-01 15:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함20 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-12-26 15:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-12-26 15:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함22 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 15:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 15:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-11-16 15:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함25 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 14:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2018-10-11 14:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-10-11 14:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함28 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-05-01 14:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2018-05-01 14:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-04-25 14:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함31 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-04-25 13:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함34 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "미수령",
    category: "냉동",
    datetime: "2018-02-14 13:10:01",
  },
  ],
  /*
  waiting_72ea: [{
    company: "한진택배1",
    box_no: "관리사무소1",
    status: "미수령",
    category: "식품",
    datetime: prev1hourTime,
  },
  {
    company: "대한통운",
    box_no: "무인택배함2 A01-121",
    status: "미수령",
    category: "냉동",
    datetime: prev1dayTime,
  },
  {
    company: "쿠팡",
    box_no: "관리사무소4",
    status: "미수령",
    category: "우편",
    datetime: prev1dayTime,
  },
  {
    company: "대한통운",
    box_no: "무인택배함5 A01-103",
    status: "미수령",
    category: "일반",
    datetime: "2019-05-25 04:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소7",
    status: "미수령",
    category: "냉동",
    datetime: "2019-03-11 00:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함8 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-03-11 00:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소10",
    status: "미수령",
    category: "냉동",
    datetime: "2019-03-10 22:20:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함11 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-03-10 21:10:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소12",
    status: "미수령",
    category: "식품",
    datetime: "2019-02-15 20:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소13",
    status: "미수령",
    category: "냉동",
    datetime: "2019-02-15 19:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함14 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-02-14 18:40:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소15",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-05 17:30:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소16",
    status: "미수령",
    category: "냉동",
    datetime: "2019-01-05 16:20:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함17 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-05 16:10:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소18",
    status: "미수령",
    category: "식품",
    datetime: "2019-01-01 16:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소19",
    status: "미수령",
    category: "냉동",
    datetime: "2019-01-01 15:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함20 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-12-26 15:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소21",
    status: "미수령",
    category: "냉동",
    datetime: "2018-12-26 15:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함22 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 15:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소23",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 15:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소24",
    status: "미수령",
    category: "냉동",
    datetime: "2018-11-16 15:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함25 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-11-16 14:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소26",
    status: "미수령",
    category: "식품",
    datetime: "2018-10-11 14:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소27",
    status: "미수령",
    category: "냉동",
    datetime: "2018-10-11 14:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함28 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-05-01 14:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소29",
    status: "미수령",
    category: "식품",
    datetime: "2018-05-01 14:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소30",
    status: "미수령",
    category: "냉동",
    datetime: "2018-04-25 14:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함31 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소32",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소33",
    status: "미수령",
    category: "냉동",
    datetime: "2018-04-25 13:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함34 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2018-04-25 13:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소35",
    status: "미수령",
    category: "냉동",
    datetime: "2018-02-14 13:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함44 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-12-26 15:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소45",
    status: "미수령",
    category: "냉동",
    datetime: "2016-12-26 15:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함46 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-11-16 15:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소47",
    status: "미수령",
    category: "식품",
    datetime: "2016-11-16 15:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소48",
    status: "미수령",
    category: "냉동",
    datetime: "2016-11-16 15:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함49 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-11-16 14:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소50",
    status: "미수령",
    category: "식품",
    datetime: "2016-10-11 14:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소51",
    status: "미수령",
    category: "냉동",
    datetime: "2016-10-11 14:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함52 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-05-01 14:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소53",
    status: "미수령",
    category: "식품",
    datetime: "2016-05-01 14:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소54",
    status: "미수령",
    category: "냉동",
    datetime: "2016-04-25 14:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함55 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-04-25 13:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소56",
    status: "미수령",
    category: "식품",
    datetime: "2016-04-25 13:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소57",
    status: "미수령",
    category: "냉동",
    datetime: "2016-04-25 13:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함58 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2016-04-25 13:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소59",
    status: "미수령",
    category: "냉동",
    datetime: "2016-02-14 13:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함68 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-12-26 15:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소69",
    status: "미수령",
    category: "냉동",
    datetime: "2014-12-26 15:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함70 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-11-16 15:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소71",
    status: "미수령",
    category: "식품",
    datetime: "2014-11-16 15:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소72",
    status: "미수령",
    category: "냉동",
    datetime: "2014-11-16 15:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함73 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-11-16 14:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소74",
    status: "미수령",
    category: "식품",
    datetime: "2014-10-11 14:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소75",
    status: "미수령",
    category: "냉동",
    datetime: "2014-10-11 14:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함76 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-05-01 14:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소77",
    status: "미수령",
    category: "식품",
    datetime: "2014-05-01 14:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소78",
    status: "미수령",
    category: "냉동",
    datetime: "2014-04-25 14:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함79 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-04-25 13:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소80",
    status: "미수령",
    category: "식품",
    datetime: "2014-04-25 13:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소81",
    status: "미수령",
    category: "냉동",
    datetime: "2014-04-25 13:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함82 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2014-04-25 13:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소83",
    status: "미수령",
    category: "냉동",
    datetime: "2014-02-14 13:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함92 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-12-26 15:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소93",
    status: "미수령",
    category: "냉동",
    datetime: "2012-12-26 15:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함94 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-11-16 15:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소95",
    status: "미수령",
    category: "식품",
    datetime: "2012-11-16 15:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소96",
    status: "미수령",
    category: "냉동",
    datetime: "2012-11-16 15:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함97 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-11-16 14:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소98",
    status: "미수령",
    category: "식품",
    datetime: "2012-10-11 14:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소99",
    status: "미수령",
    category: "냉동",
    datetime: "2012-10-11 14:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함100 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-05-01 14:20:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소101",
    status: "미수령",
    category: "식품",
    datetime: "2012-05-01 14:10:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소102",
    status: "미수령",
    category: "냉동",
    datetime: "2012-04-25 14:00:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함103 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-04-25 13:50:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소104",
    status: "미수령",
    category: "식품",
    datetime: "2012-04-25 13:40:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소105",
    status: "미수령",
    category: "냉동",
    datetime: "2012-04-25 13:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함106 A01-103",
    status: "미수령",
    category: "식품",
    datetime: "2012-04-25 13:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소107",
    status: "미수령",
    category: "냉동",
    datetime: "2012-02-14 13:10:01",
  },
  ],*/
  received: [{
    company: "우체국택배",
    box_no: "관리사무소",
    status: "수령",
    category: "식품",
    datetime: "2019-05-27 06:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "수령",
    category: "식품",
    datetime: "2019-05-25 01:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "수령",
    category: "식품",
    datetime: "2019-03-11 00:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함36 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-02-14  13:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "수령",
    category: "식품",
    datetime: "2018-01-14 12:50:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "수령",
    category: "냉동",
    datetime: "2018-01-14 12:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함39 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-01-14 12:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소",
    status: "수령",
    category: "식품",
    datetime: "2018-01-02 12:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "수령",
    category: "냉동",
    datetime: "2018-01-02 12:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함42 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-01-02 12:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소",
    status: "수령",
    category: "냉동",
    datetime: "2017-12-02 11:57:07",
  },
  ],
  /*
  received_72ea: [{
    company: "우체국택배",
    box_no: "관리사무소3",
    status: "수령",
    category: "식품",
    datetime: "2019-05-27 06:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소6",
    status: "수령",
    category: "식품",
    datetime: "2019-05-25 01:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소9",
    status: "수령",
    category: "식품",
    datetime: "2019-03-10 23:30:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함36 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-02-14  13:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소37",
    status: "수령",
    category: "식품",
    datetime: "2018-01-14 12:50:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소38",
    status: "수령",
    category: "냉동",
    datetime: "2018-01-14 12:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함39 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-01-14 12:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소40",
    status: "수령",
    category: "식품",
    datetime: "2018-01-02 12:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소41",
    status: "수령",
    category: "냉동",
    datetime: "2018-01-02 12:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함42 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2018-01-02 12:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소43",
    status: "수령",
    category: "냉동",
    datetime: "2017-12-02 11:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함60 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2016-02-14  13:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소61",
    status: "수령",
    category: "식품",
    datetime: "2016-01-14 12:50:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소62",
    status: "수령",
    category: "냉동",
    datetime: "2016-01-14 12:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함63 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2016-01-14 12:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소64",
    status: "수령",
    category: "식품",
    datetime: "2016-01-02 12:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소65",
    status: "수령",
    category: "냉동",
    datetime: "2016-01-02 12:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함66 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2016-01-02 12:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소67",
    status: "수령",
    category: "냉동",
    datetime: "2015-12-02 11:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함84 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2014-02-14  13:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소85",
    status: "수령",
    category: "식품",
    datetime: "2014-01-14 12:50:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소86",
    status: "수령",
    category: "냉동",
    datetime: "2014-01-14 12:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함87 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2014-01-14 12:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소88",
    status: "수령",
    category: "식품",
    datetime: "2014-01-02 12:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소89",
    status: "수령",
    category: "냉동",
    datetime: "2014-01-02 12:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함90 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2014-01-02 12:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소91",
    status: "수령",
    category: "냉동",
    datetime: "2013-12-02 11:50:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함108 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2012-02-14  13:00:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소109",
    status: "수령",
    category: "식품",
    datetime: "2012-01-14 12:50:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소110",
    status: "수령",
    category: "냉동",
    datetime: "2012-01-14 12:40:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함111 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2012-01-14 12:30:01",
  },
  {
    company: "우체국택배",
    box_no: "관리사무소112",
    status: "수령",
    category: "식품",
    datetime: "2012-01-02 12:20:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소113",
    status: "수령",
    category: "냉동",
    datetime: "2012-01-02 12:10:01",
  },
  {
    company: "대한통운",
    box_no: "무인택배함114 A01-103",
    status: "수령",
    category: "식품",
    datetime: "2012-01-02 12:00:01",
  },
  {
    company: "쿠팡",
    box_no: "관리사무소115",
    status: "수령",
    category: "냉동",
    datetime: "2011-12-02 11:50:01",
  },
  ]*/
}

/* Parking */


var jsonParkingLocation = {
  list: [
    //*
    // {
    //   car_no: "16고 9269",
    //   nickname: "내차",
    //   location: "B2 C105",
    //   reg_time: currentTime
    // },
    // {
    //   // car_no: "13누 1423",
    //   car_no: "",
    //   nickname: "",
    //   location: "B2 F122",
    //   reg_time: prev1hourTime
    // },
    // {
    //   car_no: "52가 5654",
    //   nickname: "아빠차",
    //   // location: "B2 E076",
    //   location: "",
    //   reg_time: prev3hourTime
    // },
    // {
    //   car_no: "40마 8843",
    //   nickname: "엄마차",
    //   location: "B1 D123",
    //   reg_time: prev1dayTime
    // },
    // {
    //   // car_no: "14도 2555",
    //   car_no: "",
    //   nickname: "",
    //   // location: "B2 A129",
    //   location: "",
    //   reg_time: "2019-06-17 08:30:00"
    // },
    // {
    //   car_no: "01거 8814",
    //   nickname: "",
    //   location: "B3 A125",
    //   reg_time: "2019-05-27 22:20:00"
    // },
    // {
    //   car_no: "34바 0653",
    //   nickname: "",
    //   location: "B2 C105",
    //   reg_time: "2019-05-26 22:20:00"
    // },
    // {
    //   car_no: "12가 1123",
    //   nickname: "",
    //   location: "B2 F002",
    //   reg_time: "2019-05-26 12:20:00"
    // },
    // {
    //   car_no: "53조 5744",
    //   nickname: "",
    //   location: "B2 D086",
    //   reg_time: "2019-05-23 20:30:00"
    // },
    // {
    //   car_no: "42마 3643",
    //   nickname: "",
    //   location: "B1 D033",
    //   reg_time: "2019-03-14 20:30:00"
    // },
    // {
    //   car_no: "01도 2345",
    //   nickname: "",
    //   location: "B2 A102",
    //   reg_time: "2019-03-14 08:30:00"
    // },
    // {
    //   car_no: "11거 7714",
    //   nickname: "",
    //   location: "B2 A445",
    //   reg_time: "2019-03-12 22:20:00"
    // },
    // {
    //   car_no: "03마 3266",
    //   nickname: "",
    //   location: "B2 A105",
    //   reg_time: "2018-12-12 22:20:00"
    // },
    // {
    //   car_no: "13우 2899",
    //   nickname: "",
    //   location: "B3 B035",
    //   reg_time: "2018-11-02 22:20:00"
    // },
    // {
    //   car_no: "83차 2614",
    //   nickname: "",
    //   location: "B3 A152",
    //   reg_time: "2018-09-25 22:20:00"
    // },
    // {
    //   car_no: "26마 3465",
    //   nickname: "",
    //   location: "B1 B034",
    //   reg_time: "2018-06-17 22:20:00"
    // }
    //*/
  ]
}

var jsonDataParkingHistory = {
  list: [
    //*
    {
      car_no: "12가 0388",
      nickname: "동생차",
      status: "in",
      reg_time: prev1hourTime
    },
    {
      // car_no: "24조 0171",
      car_no: "",
      nickname: "",
      status: "in",
      reg_time: prev3hourTime
    },
    {
      car_no: "01마 4010",
      nickname: "",
      // status: "in",
      status: "",
      reg_time: prev1dayTime
    },
    {
      car_no: "12가 0388",
      nickname: "동생차",
      status: "in",
      reg_time: "2019-06-22 22:16:00"
    },
    {
      // car_no: "01마 4010",
      car_no: "",
      nickname: "",
      // status: "in",
      status: "",
      reg_time: "2019-06-22 11:24:00"
    },
    {
      car_no: "12가 0388",
      nickname: "동생차",
      status: "in",
      reg_time: "2019-06-21 20:40:00"
    },
    {
      car_no: "01마 4010",
      nickname: "",
      status: "in",
      reg_time: "2019-06-20 20:40:00"
    },
    {
      car_no: "12가 0388",
      nickname: "동생차",
      status: "in",
      reg_time: "2019-06-20 14:16:00"
    },
    {
      car_no: "24조 0171",
      nickname: "",
      status: "in",
      reg_time: "2019-06-19 22:16:00"
    },
    {
      car_no: "01마 4010",
      nickname: "",
      status: "in",
      reg_time: "2019-06-19 20:06:00"
    },
    {
      car_no: "12가 0388",
      nickname: "동생차",
      status: "in",
      reg_time: "2019-06-19 16:00:00"
    },
    {
      car_no: "01마 4010",
      nickname: "",
      status: "in",
      reg_time: "2019-06-18 09:02:00"
    },
    {
      car_no: "12가 0388",
      nickname: "동생차",
      status: "in",
      reg_time: "2019-06-17 22:02:00"
    },
    {
      car_no: "52나 3733",
      nickname: "",
      status: "in",
      reg_time: "2019-06-22 16:02:00"
    },
    {
      car_no: "37마 2899",
      nickname: "",
      status: "in",
      reg_time: "2018-12-21 13:08:00"
    },
    {
      car_no: "76누 9653",
      nickname: "",
      status: "in",
      reg_time: "2018-11-20 14:16:00"
    },
    {
      car_no: "63바 8465",
      nickname: "",
      status: "in",
      reg_time: "2018-09-29 13:08:00"
    },
    {
      car_no: "29우 9422",
      nickname: "",
      status: "in",
      reg_time: "2018-06-17 07:22:00"
    },
    {
      car_no: "74허 3924",
      nickname: "",
      status: "in",
      reg_time: "2018-04-18 22:02:00"
    },
    {
      car_no: "92구 7533",
      nickname: "",
      status: "in",
      reg_time: "2018-01-10 16:02:00"
    }
    //*/
  ]
}


/* ENERGY */

if(fakeDateYM == null){
  console.log("ERROR : fakeDateYM is null");
} else if(fakeDateYM.list == null){
  console.log("ERROR : fakeDateYM.list is null");
}

var jsonDataEnergyElec ={
  count: "18",
  curmonth: prev0monthTime,
  list:[
    {year: fakeDateYM.list[0].year, month: fakeDateYM.list[0].month, value: "108.156"},
    {year: fakeDateYM.list[1].year, month: fakeDateYM.list[1].month, value: "358.156"},
    {year: fakeDateYM.list[2].year, month: fakeDateYM.list[2].month, value: "454.501"},
    {year: fakeDateYM.list[3].year, month: fakeDateYM.list[3].month, value: "488.156"},
    {year: fakeDateYM.list[4].year, month: fakeDateYM.list[4].month, value: "354.043"},
    {year: fakeDateYM.list[5].year, month: fakeDateYM.list[5].month, value: "371.519"},
    {year: fakeDateYM.list[6].year, month: fakeDateYM.list[6].month, value: "345.663"},
    {year: fakeDateYM.list[7].year, month: fakeDateYM.list[7].month, value: "363.813"},
    {year: fakeDateYM.list[8].year, month: fakeDateYM.list[8].month, value: "328.376"},
    {year: fakeDateYM.list[9].year, month: fakeDateYM.list[9].month, value: "369.822"},
    {year: fakeDateYM.list[10].year, month: fakeDateYM.list[10].month, value: "364.005"},
    {year: fakeDateYM.list[11].year, month: fakeDateYM.list[11].month, value: "344.22"},
    {year: fakeDateYM.list[12].year, month: fakeDateYM.list[12].month, value: "361.526"},
    {year: fakeDateYM.list[13].year, month: fakeDateYM.list[13].month, value: "347.527"},
    {year: fakeDateYM.list[14].year, month: fakeDateYM.list[14].month, value: "452.136"},
    {year: fakeDateYM.list[15].year, month: fakeDateYM.list[15].month, value: "468.501"},
    {year: fakeDateYM.list[16].year, month: fakeDateYM.list[16].month, value: "382.349"},
    {year: fakeDateYM.list[17].year, month: fakeDateYM.list[17].month, value: "362.975"},
  ]
}

var jsonDataEnergyWater ={
  count: "18",
  curmonth: prev0monthTime,
  list:[
    {year: fakeDateYM.list[0].year, month: fakeDateYM.list[0].month, value: "912.878"},
    {year: fakeDateYM.list[1].year, month: fakeDateYM.list[1].month, value: "2912.878"},
    {year: fakeDateYM.list[2].year, month: fakeDateYM.list[2].month, value: "3100.899"},
    {year: fakeDateYM.list[3].year, month: fakeDateYM.list[3].month, value: "2912.878"},
    {year: fakeDateYM.list[4].year, month: fakeDateYM.list[4].month, value: "3006.398"},
    {year: fakeDateYM.list[5].year, month: fakeDateYM.list[5].month, value: "3085.108"},
    {year: fakeDateYM.list[6].year, month: fakeDateYM.list[6].month, value: "3076.609"},
    {year: fakeDateYM.list[7].year, month: fakeDateYM.list[7].month, value: "3103.12"},
    {year: fakeDateYM.list[8].year, month: fakeDateYM.list[8].month, value: "2946.713"},
    {year: fakeDateYM.list[9].year, month: fakeDateYM.list[9].month, value: "3104.562"},
    {year: fakeDateYM.list[10].year, month: fakeDateYM.list[10].month, value: "3062.057"},
    {year: fakeDateYM.list[11].year, month: fakeDateYM.list[11].month, value: "3036.374"},
    {year: fakeDateYM.list[12].year, month: fakeDateYM.list[12].month, value: "3080.067"},
    {year: fakeDateYM.list[13].year, month: fakeDateYM.list[13].month, value: "2907.616"},
    {year: fakeDateYM.list[14].year, month: fakeDateYM.list[14].month, value: "3088.899"},
    {year: fakeDateYM.list[15].year, month: fakeDateYM.list[15].month, value: "3118.594"},
    {year: fakeDateYM.list[16].year, month: fakeDateYM.list[16].month, value: "2990.504"},
    {year: fakeDateYM.list[17].year, month: fakeDateYM.list[17].month, value: "3024.733"},
  ]
}

var jsonDataEnergyGas ={
  count: "18",
  curmonth: prev0monthTime,
  list:[
  {year: fakeDateYM.list[0].year, month: fakeDateYM.list[0].month, value: "305.899"},
  {year: fakeDateYM.list[1].year, month: fakeDateYM.list[1].month,  value: "1085.899"},
  {year: fakeDateYM.list[2].year, month: fakeDateYM.list[2].month,  value: "1136.445"},
  {year: fakeDateYM.list[3].year, month: fakeDateYM.list[3].month,  value: "1005.899"},
  {year: fakeDateYM.list[4].year, month: fakeDateYM.list[4].month,  value: "1008.042"},
  {year: fakeDateYM.list[5].year, month: fakeDateYM.list[5].month,  value: "1066.926"},
  {year: fakeDateYM.list[6].year, month: fakeDateYM.list[6].month,  value: "1067.118"},
  {year: fakeDateYM.list[7].year, month: fakeDateYM.list[7].month,  value: "1043.455"},
  {year: fakeDateYM.list[8].year, month: fakeDateYM.list[8].month,  value: "953.121"},
  {year: fakeDateYM.list[9].year, month: fakeDateYM.list[9].month,  value: "1094.883"},
  {year: fakeDateYM.list[10].year, month: fakeDateYM.list[10].month,  value: "1050.475"},
  {year: fakeDateYM.list[11].year, month: fakeDateYM.list[11].month,  value: "1010.256"},
  {year: fakeDateYM.list[12].year, month: fakeDateYM.list[12].month,  value: "1116.68"},
  {year: fakeDateYM.list[13].year, month: fakeDateYM.list[13].month,  value: "1080.09"},
  {year: fakeDateYM.list[14].year, month: fakeDateYM.list[14].month,  value: "1156.445"},
  {year: fakeDateYM.list[15].year, month: fakeDateYM.list[15].month,  value: "1062.296"},
  {year: fakeDateYM.list[16].year, month: fakeDateYM.list[16].month,  value: "1074.602"},
  {year: fakeDateYM.list[17].year, month: fakeDateYM.list[17].month,  value: "1096.239"},
  ]
}

var jsonDataEnergyHotWater ={
  count: "18",
  curmonth: prev0monthTime,
  list:[
    {year: fakeDateYM.list[0].year, month: fakeDateYM.list[0].month, value: "1.484"},
    {year: fakeDateYM.list[1].year, month: fakeDateYM.list[1].month, value: "8.484"},
    {year: fakeDateYM.list[2].year, month: fakeDateYM.list[2].month, value: "4.853"},
    {year: fakeDateYM.list[3].year, month: fakeDateYM.list[3].month,  value: "5.484"},
    {year: fakeDateYM.list[4].year, month: fakeDateYM.list[4].month,  value: "6.071"},
    {year: fakeDateYM.list[5].year, month: fakeDateYM.list[5].month,  value: "6.238"},
    {year: fakeDateYM.list[6].year, month: fakeDateYM.list[6].month,  value: "7.24"},
    {year: fakeDateYM.list[7].year, month: fakeDateYM.list[7].month,  value: "8.114"},
    {year: fakeDateYM.list[8].year, month: fakeDateYM.list[8].month,  value: "13.08"},
    {year: fakeDateYM.list[9].year, month: fakeDateYM.list[9].month,  value: "14.842"},
    {year: fakeDateYM.list[10].year, month: fakeDateYM.list[10].month,  value: "15.685"},
    {year: fakeDateYM.list[11].year, month: fakeDateYM.list[11].month,  value: "16.857"},
    {year: fakeDateYM.list[12].year, month: fakeDateYM.list[12].month,  value: "10.081"},
    {year: fakeDateYM.list[13].year, month: fakeDateYM.list[13].month,  value: "8.189"},
    {year: fakeDateYM.list[14].year, month: fakeDateYM.list[14].month,  value: "4.353"},
    {year: fakeDateYM.list[15].year, month: fakeDateYM.list[15].month,  value: "4.021"},
    {year: fakeDateYM.list[16].year, month: fakeDateYM.list[16].month,  value: "5.179"},
    {year: fakeDateYM.list[17].year, month: fakeDateYM.list[17].month,  value: "6.695"},
  ]
}

var jsonDataEnergyHeating = {
  count: "18",
  curmonth: prev0monthTime,
  list:[
    {year: fakeDateYM.list[0].year, month: fakeDateYM.list[0].month, value: "0.684"},
    {year: fakeDateYM.list[1].year, month: fakeDateYM.list[1].month, value: "5.684"},
    {year: fakeDateYM.list[2].year, month: fakeDateYM.list[2].month, value: "0.953"},
    {year: fakeDateYM.list[3].year, month: fakeDateYM.list[3].month, value: "1.671"},
    {year: fakeDateYM.list[4].year, month: fakeDateYM.list[4].month, value: "5.071"},
    {year: fakeDateYM.list[5].year, month: fakeDateYM.list[5].month, value: "10.238"},
    {year: fakeDateYM.list[6].year, month: fakeDateYM.list[6].month, value: "12.24"},
    {year: fakeDateYM.list[7].year, month: fakeDateYM.list[7].month, value: "13.114"},
    {year: fakeDateYM.list[8].year, month: fakeDateYM.list[8].month, value: "15.08"},
    {year: fakeDateYM.list[9].year, month: fakeDateYM.list[9].month, value: "17.842"},
    {year: fakeDateYM.list[10].year, month: fakeDateYM.list[10].month, value: "18.685"},
    {year: fakeDateYM.list[11].year, month: fakeDateYM.list[11].month, value: "17.857"},
    {year: fakeDateYM.list[12].year, month: fakeDateYM.list[12].month, value: "10.081"},
    {year: fakeDateYM.list[13].year, month: fakeDateYM.list[13].month, value: "5.189"},
    {year: fakeDateYM.list[14].year, month: fakeDateYM.list[14].month, value: "0.853"},
    {year: fakeDateYM.list[15].year, month: fakeDateYM.list[15].month, value: "1.021"},
    {year: fakeDateYM.list[16].year, month: fakeDateYM.list[16].month,  value: "4.179"},
    {year: fakeDateYM.list[17].year, month: fakeDateYM.list[17].month, value: "9.695"},
  ]
}

/* Visitor */

var jsonVisitorInfo = {
  list: [
    {
      location: "현관문",
      reg_time: currentTime,
      image_data: "data:image/png;base64,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",
      image_data_format: "",
      image_url: "",
    },
    {
      location: "현관문",
      reg_time: prev1minTime,
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
    },
    {
      location: "현관문",
      reg_time: prev30minTime,
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
    },
    {
      location: "현관문",
      reg_time: prev1hourTime,
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_3.png",
    },
    {
      location: "현관문",
      reg_time: prev3hourTime,
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
    },
    {
      location: "현관문",
      reg_time: prev5hourTime,
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_3.png",
    },
    {
      location: "현관문",
      reg_time: prev12hourTime,
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
    },
    {
      location: "현관문",
      reg_time: prev1dayTime,
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
    },
    {
      location: "현관문",
      reg_time: "2019-05-27 06:30:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_3.png",
    },
    {
      location: "현관문",
      reg_time: "2019-05-27 05:20:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
    },
    {
      location: "현관문",
      reg_time: "2019-05-25 04:10:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
    },
    {
      location: "현관문",
      reg_time: "2019-05-21 06:30:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_3.png",
    },
    {
      location: "현관문",
      reg_time: "2019-04-27 05:20:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
    },
    {
      location: "현관문",
      reg_time: "2019-04-25 04:10:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
    },
    {
      location: "현관문",
      reg_time: "2019-04-21 06:30:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_3.png",
    },
    {
      location: "현관문",
      reg_time: "2019-03-27 05:20:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
    },
    {
      location: "현관문",
      reg_time: "2019-03-25 04:10:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
    },
    {
      location: "현관문",
      reg_time: "2018-05-27 06:30:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_3.png",
    },
    {
      location: "현관문",
      reg_time: "2018-05-27 05:20:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
    },
    {
      location: "현관문",
      reg_time: "2018-05-25 04:10:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
    },
    {
      location: "현관문",
      reg_time: "2018-05-21 06:30:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_3.png",
    },
    {
      location: "현관문",
      reg_time: "2018-04-27 05:20:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
    },
    {
      location: "현관문",
      reg_time: "2018-04-25 04:10:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
    },
    {
      location: "현관문",
      reg_time: "2018-04-21 06:30:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_3.png",
    },
    {
      location: "현관문",
      reg_time: "2018-03-27 05:20:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
    },
    {
      location: "현관문",
      reg_time: "2018-03-25 04:10:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
    },
    {
      location: "현관문",
      reg_time: "2017-04-25 04:10:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
    },
    {
      location: "현관문",
      reg_time: "2017-04-21 06:30:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_3.png",
    },
    {
      location: "현관문",
      reg_time: "2017-03-27 05:20:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
    },
    {
      location: "현관문",
      reg_time: "2017-03-25 04:10:01",
      image_data: "",
      image_data_format: "",
      image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
    },
  ]
}

/* CCTV */
var jsonCCTVInfo = {
  list: [
    {
      location: "단지정문",
      stream_url: "service/cctv/res/img/surveillance_carmera01.mp4",
      poster_url: "service/cctv/res/img/surveillance_carmera01.png"
    },
    {
      location: "놀이터1",
      stream_url: "service/cctv/res/img/surveillance_carmera02.mp4",
      poster_url: "service/cctv/res/img/surveillance_carmera02.png"
    },
    {
      location: "공동현관",
      stream_url: "service/cctv/res/img/surveillance_carmera03.mp4",
      poster_url: "service/cctv/res/img/surveillance_carmera03.png"
    }
  ]
}

/* Admin */
var jsonAdmin = {
  list: [
    {
      period:{
        year: fakeDateYM.list[0].year,
        month: fakeDateYM.list[0].month
      },
        bill:{
        total: "122230",
        electricity: "39000",
        water: "14215",
        heating: "21215",
        individual_mgmt: "31000",
        general_mgmt: "11000",
        etc: "29000",
        late_fee: "10980"
      },
      due_date: fakeDateYM.list[0].duedate,
      average: "195690"
    },
    {
      period:{
        year: fakeDateYM.list[1].year,
        month: fakeDateYM.list[1].month
      },
      bill:{
        total: "192239",
        electricity: "59000",
        water: "8215",
        heating: "28215",
        individual_mgmt: "11000",
        general_mgmt: "31000",
        etc: "11000",
        late_fee: "13980"
      },
      due_date: fakeDateYM.list[1].duedate,
      average: "195690"
    },
    {
      period:{
        year: fakeDateYM.list[2].year,
        month: fakeDateYM.list[2].month
      },
      bill:{
         total: "152838",
         electricity: "68000",
         water: "8215",
         heating: "18815",
         individual_mgmt: "28000",
         general_mgmt: "21008",
         etc: "21800",
         late_fee: "18880"
      },
      due_date: fakeDateYM.list[2].duedate,
      average: "185690"
    },
    {
      period:{
        year: fakeDateYM.list[3].year,
        month: fakeDateYM.list[3].month
      },
      bill:{
         total: "155237",
         electricity: "65000",
         water: "15215",
         heating: "15215",
         individual_mgmt: "25000",
         general_mgmt: "25000",
         etc: "25000",
         late_fee: "15980"
      },
      due_date: fakeDateYM.list[3].duedate,
      average: "155690"
    },
    {
      period:{
        year: fakeDateYM.list[4].year,
        month: fakeDateYM.list[4].month
      },
      bill:{
        total: "155237",
        electricity: "69006",
        water: "18216",
        heating: "18216",
        individual_mgmt: "21006",
        general_mgmt: "21006",
        etc: "21006",
        late_fee: "18986"
      },
      due_date: fakeDateYM.list[4].duedate,
      average: "195696"
    },
    {
      period:{
        year: fakeDateYM.list[5].year,
        month: fakeDateYM.list[5].month
      },
        bill:{
        total: "122230",
        electricity: "39000",
        water: "14215",
        heating: "21215",
        individual_mgmt: "31000",
        general_mgmt: "11000",
        etc: "29000",
        late_fee: "10980"
      },
      due_date: fakeDateYM.list[5].duedate,
      average: "195690"
    },
    {
      period:{
        year: fakeDateYM.list[6].year,
        month: fakeDateYM.list[6].month
      },
      bill:{
        total: "192239",
        electricity: "59000",
        water: "8215",
        heating: "28215",
        individual_mgmt: "11000",
        general_mgmt: "31000",
        etc: "11000",
        late_fee: "13980"
      },
      due_date: fakeDateYM.list[6].duedate,
      average: "195690"
    },
    {
      period:{
        year: fakeDateYM.list[7].year,
        month: fakeDateYM.list[7].month
      },
      bill:{
         total: "152838",
         electricity: "68000",
         water: "18285",
         heating: "18815",
         individual_mgmt: "28000",
         general_mgmt: "21008",
         etc: "21800",
         late_fee: "18880"
      },
      due_date: fakeDateYM.list[7].duedate,
      average: "185690"
    },
    {
      period:{
        year: fakeDateYM.list[8].year,
        month: fakeDateYM.list[8].month
      },
      bill:{
         total: "155237",
         electricity: "65000",
         water: "15215",
         heating: "15215",
         individual_mgmt: "25000",
         general_mgmt: "25000",
         etc: "25000",
         late_fee: "15980"
      },
      due_date: fakeDateYM.list[8].duedate,
      average: "155690"
    },
    {
      period:{
        year: fakeDateYM.list[9].year,
        month: fakeDateYM.list[9].month
      },
      bill:{
        total: "152236",
        electricity: "69006",
        water: "18216",
        heating: "18216",
        individual_mgmt: "21006",
        general_mgmt: "21006",
        etc: "21006",
        late_fee: "18986"
      },
      due_date: fakeDateYM.list[9].duedate,
      average: "195696"
    },
    {
      period:{
        year: fakeDateYM.list[10].year,
        month: fakeDateYM.list[10].month
      },
        bill:{
        total: "122230",
        electricity: "39000",
        water: "14215",
        heating: "21215",
        individual_mgmt: "31000",
        general_mgmt: "11000",
        etc: "29000",
        late_fee: "10980"
      },
      due_date: fakeDateYM.list[10].duedate,
      average: "195690"
    },
    {
      period:{
        year: fakeDateYM.list[11].year,
        month: fakeDateYM.list[11].month
      },
      bill:{
        total: "192239",
        electricity: "59000",
        water: "8215",
        heating: "28215",
        individual_mgmt: "11000",
        general_mgmt: "31000",
        etc: "11000",
        late_fee: "13980"
      },
      due_date: fakeDateYM.list[11].duedate,
      average: "195690"
    },
    {
      period:{
        year: fakeDateYM.list[12].year,
        month: fakeDateYM.list[12].month
      },
      bill:{
         total: "152838",
         electricity: "68000",
         water: "18285",
         heating: "18815",
         individual_mgmt: "28000",
         general_mgmt: "21008",
         etc: "21800",
         late_fee: "18880"
      },
      due_date: fakeDateYM.list[12].duedate,
      average: "185690"
    },
    {
      period:{
        year: fakeDateYM.list[13].year,
        month: fakeDateYM.list[13].month
      },
      bill:{
         total: "155237",
         electricity: "65000",
         water: "15215",
         heating: "15215",
         individual_mgmt: "25000",
         general_mgmt: "25000",
         etc: "25000",
         late_fee: "15980"
      },
      due_date: fakeDateYM.list[13].duedate,
      average: "155690"
    },
    {
      period:{
        year: fakeDateYM.list[14].year,
        month: fakeDateYM.list[14].month
      },
      bill:{
        total: "152236",
        electricity: "69006",
        water: "18216",
        heating: "18216",
        individual_mgmt: "21006",
        general_mgmt: "21006",
        etc: "21006",
        late_fee: "18986"
      },
      due_date: fakeDateYM.list[14].duedate,
      average: "195696"
    },
    {
      period:{
        year: fakeDateYM.list[15].year,
        month: fakeDateYM.list[15].month
      },
      bill:{
         total: "152838",
         electricity: "68000",
         water: "18285",
         heating: "18815",
         individual_mgmt: "28000",
         general_mgmt: "21008",
         etc: "21800",
         late_fee: "18880"
      },
      due_date: fakeDateYM.list[15].duedate,
      average: "185690"
    },
    {
      period:{
        year: fakeDateYM.list[16].year,
        month: fakeDateYM.list[16].month
      },
      bill:{
         total: "155237",
         electricity: "65000",
         water: "15215",
         heating: "15215",
         individual_mgmt: "25000",
         general_mgmt: "25000",
         etc: "25000",
         late_fee: "15980"
      },
      due_date: fakeDateYM.list[16].duedate,
      average: "155690"
    },
    {
      period:{
        year: fakeDateYM.list[17].year,
        month: fakeDateYM.list[17].month
      },
      bill:{
        total: "152236",
        electricity: "69006",
        water: "18216",
        heating: "18216",
        individual_mgmt: "21006",
        general_mgmt: "21006",
        etc: "21006",
        late_fee: "18986"
      },
      due_date: fakeDateYM.list[17].duedate,
      average: "195696"
    }
  ]
}
