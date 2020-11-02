/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/* Notification */

var jsonDataNotification = [
   {
      reg_num: "1",
      reg_date: currentTime,
      title: "New bill available",
      body: "Payment due by Apr 15 2019",
      img_url: "service/notification/res/img/notification_play_ground.png"
   },
   {
      reg_num: "2",
      reg_date: prev1hourTime,
      title: "Regular fire drill",
      body: "Fire Drill is scheduled on 12th, April, 2019 at 2PM.\n\n In accordance with the City of Suwon, a fire drill has been scheduled for April 12, at 2:00 p.m at Samsung Apartment Complex \n \n" +
         "Please be advised that this will be a fire drill, not an actual fire. DO NOT CALL THE FIRE DEPARTMENT WHEN THE ALARM SOUNDS. Druing the fire drill, everyone must go to the stairs and standby outside for the stairway. DO NOT ENTER THE STAIRWAY OR TAKE THE ELEVATORS.",
      img_url: "service/notification/res/img/notification_delivery_delay.png"
   },
   {
      reg_num: "50",
      reg_date: "2019-01-17 08:27:31",
      title: "Additonal sterilization remider",
      body: "This is a reminder for additional sterillization\nDate : 26/Nov/2018 \nTime : 11:00 AM ~ 2:00 PM \n",
      img_url: "service/notification/res/img/notification_nursery.png"
   },
   {
      reg_num: "51",
      reg_date: "2018-12-26 14:27:31",
      title: "Community representative meeting",
      body: "Please join us 27th of December from 7 p.m. to 8 p.m. at the community hall \n" +
         "We will be discussing crime updates, crime tips and signing residents up for the Neighborhood Watch Program. " +
         "Representatives from different sections of the police department will be there to answer your questions.",
      img_url: ""
   },
   {
      reg_num: "52",
      reg_date: "2018-12-20 12:27:31",
      title: "Christmas season community gathering",
      body: "December 25, 1 to 4 p.m. \n" +
         "Join others who wish to share the holiday sprit at Community Hall.\n\n" +
         "There will be :\n" +
         "- Delicious Food\n" +
         "- Pictures with Santa in Santa Land\n" +
         "- Signing of Carols \n" +
         "- Christmas Train Display \n" +
         "- Santa's Bookstore \n",
      img_url: ""
   },
   {
      reg_num: "53",
      reg_date: "2018-12-17 08:27:31",
      title: "Regular maintenance on elevator",
      body: "Please kindly be advised tht there will be Elavator maintenance work as schedule below. \n" +
         "If you have any questions, please feel to contact management desk. \n" +
         "We apologize for any inconvenience and appreciate your kind understanding. \n \n" +
         "All day work on March 22nd (Friday), 2019 \n" +
         "All elevators stop From 12:00 until 15:00",
      img_url: ""
   },
   {
      reg_num: "54",
      reg_date: "2018-11-26 14:27:31",
      title: "Snow alert !",
      body: "All City Public Schools are closed and after school programs are canceled today due to snow",
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


var jsonParkingLocation = {
   list: [
      {
         car_no: "16RH9269",
         nickname: "my car",
         location: "A105",
         reg_time: currentTime,
      },
      {
         car_no: "ANN4861",
         nickname: "",
         location: "Lot #91",
         reg_time: prev1hourTime,
      },
      {
         car_no: "3GG83D947",
         nickname: "",
         location: "A075",
         reg_time: "2019-05-29 20:30:00",
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         location: "A033",
         reg_time: "2019-03-14 08:30:11",
      },
      {
         car_no: "7DCX472",
         nickname: "John's",
         location: "A102",
         reg_time: "2019-03-13 08:30:22",
      },
      {
         car_no: "WB04D1615",
         nickname: "",
         location: "A125",
         reg_time: "2019-03-12 22:20:48",
      }
   ]
}

var jsonDataParkingHistory = {
   list: [
      {
         car_no: "7DCX472",
         nickname: "John's",
         status: "in",
         reg_time: currentTime
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: prev1hourTime
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "in",
         reg_time: "2019-06-01 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-05-29 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-05-26 21:17:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-05-26 19:52:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-05-25 10:34:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "in",
         reg_time: "2019-05-25 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-05-22 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-05-21 21:17:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-05-15 19:52:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-05-08 10:34:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "in",
         reg_time: "2019-05-05 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-05-03 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-05-02 21:17:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-05-01 19:52:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-04-29 21:17:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "out",
         reg_time: "2019-04-29 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-04-28 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-04-27 21:17:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "in",
         reg_time: "2019-04-27 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-04-25 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-04-24 21:17:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "out",
         reg_time: "2019-04-23 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-04-23 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-04-22 21:17:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "in",
         reg_time: "2019-04-22 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-04-21 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-04-20 21:17:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "out",
         reg_time: "2019-04-23 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-04-23 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-04-22 21:17:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "in",
         reg_time: "2019-04-22 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-04-21 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-04-20 21:17:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "out",
         reg_time: "2019-04-19 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-04-18 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-04-17 21:17:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "in",
         reg_time: "2019-04-17 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-04-16 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-04-15 21:17:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "out",
         reg_time: "2019-04-15 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-04-14 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-04-13 21:17:00"
      },
      {
         car_no: "3DG8D1334",
         nickname: "",
         status: "in",
         reg_time: "2019-04-13 10:23:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "in",
         reg_time: "2019-04-12 20:30:00"
      },
      {
         car_no: "ANN4861",
         nickname: "",
         status: "out",
         reg_time: "2019-04-11 21:17:00"
      }
   ]
}

var jsonParcelInfo = {
   parcel: [{
         company: "DHL",
         box_no: "Office",
         status: "IN",
         category: "Food",
         datetime: prev1hourTime,
      },
      {
        company: "UPS",
        box_no: "UPS Amazon",
        status: "IN",
        category: "Post",
        datetime: prev1dayTime,
      },
      {
        company: "UPS",
        box_no: "UPS Amazon",
        status: "IN",
        category: "Frozen",
        datetime: "2019-06-30 18:40:42",
     },
     {
        company: "DHL",
        box_no: "Office",
        status: "IN",
        category: "Post",
        datetime: "2019-06-30 10:10:42",
     },
     {
        company: "UPS",
        box_no: "UPS eBay",
        status: "IN",
        category: "General",
        datetime: "2019-06-28 10:30:45",
     },
      {
         company: "UPS",
         box_no: "UPS Amazon",
         status: "IN",
         category: "Frozen",
         datetime: "2019-03-31 13:40:42",
      },
      {
         company: "DHL",
         box_no: "Office",
         status: "IN",
         category: "Post",
         datetime: "2019-03-30 18:10:42",
      },
      {
         company: "UPS",
         box_no: "UPS eBay",
         status: "IN",
         category: "General",
         datetime: "2019-03-28 10:30:45",
      },
      {
         company: "USPS",
         box_no: "USPS Amazon",
         status: "IN",
         category: "Post",
         datetime: "2019-03-25 10:30:45",
      },
      {
        company: "FedEx",
        box_no: "FedEx Amazon",
        status: "OUT",
        category: "Food",
        datetime: prev1hourTime,
      },
      {
        company: "FedEx",
        box_no: "FedEx Amazon",
        status: "OUT",
        category: "Food",
        datetime: prev1dayTime,
      },
      {
        company: "FedEx",
        box_no: "FedEx BestBuy",
        status: "OUT",
        category: "Post",
        datetime: "2019-06-11 13:00:11",
     },
     {
        company: "FedEx",
        box_no: "FedEx Amazon",
        status: "OUT",
        category: "General",
        datetime: "2019-06-11 10:00:11",
     },
     {
        company: "FedEx",
        box_no: "FedEx Amazon",
        status: "OUT",
        category: "Food",
        datetime: "2019-06-10 10:00:11",
     },
      {
         company: "FedEx",
         box_no: "FedEx BestBuy",
         status: "OUT",
         category: "Post",
         datetime: "2019-03-11 10:00:11",
      },
      {
         company: "FedEx",
         box_no: "FedEx Amazon",
         status: "OUT",
         category: "General",
         datetime: "2019-03-11 10:00:11",
      },
      {
         company: "FedEx",
         box_no: "FedEx Amazon",
         status: "OUT",
         category: "Food",
         datetime: prev1yearTime,
      },
      {
         company: "UPS",
         box_no: "UPS Amazon",
         status: "IN",
         category: "Frozen",
         datetime: "2019-03-31 13:40:42",
      },
      {
         company: "DHL",
         box_no: "Office",
         status: "IN",
         category: "Frozen",
         datetime: "2019-03-30 18:10:42",
      },
      {
        company: "USPS",
        box_no: "USPS Amazon",
        status: "IN",
        category: "Post",
        datetime: prev1yearTime,
     },
   ],
   waiting: [{
      company: "DHL",
      box_no: "Office",
      status: "IN",
      category: "Food",
      datetime: prev1hourTime,
   },
   {
     company: "UPS",
     box_no: "UPS Amazon",
     status: "IN",
     category: "Post",
     datetime: prev1dayTime,
   },
   {
     company: "UPS",
     box_no: "UPS Amazon",
     status: "IN",
     category: "Frozen",
     datetime: "2019-06-30 18:40:42",
  },
  {
     company: "DHL",
     box_no: "Office",
     status: "IN",
     category: "Post",
     datetime: "2019-06-30 10:10:42",
  },
  {
     company: "UPS",
     box_no: "UPS eBay",
     status: "IN",
     category: "General",
     datetime: "2019-06-28 10:30:45",
  },
   {
      company: "UPS",
      box_no: "UPS Amazon",
      status: "IN",
      category: "Frozen",
      datetime: "2019-03-31 13:40:42",
   },
   {
      company: "DHL",
      box_no: "Office",
      status: "IN",
      category: "Post",
      datetime: "2019-03-30 18:10:42",
   },
   {
      company: "UPS",
      box_no: "UPS eBay",
      status: "IN",
      category: "General",
      datetime: "2019-03-28 10:30:45",
   },
   {
      company: "USPS",
      box_no: "USPS Amazon",
      status: "IN",
      category: "Post",
      datetime: "2019-03-25 10:30:45",
   },
   {
      company: "UPS",
      box_no: "UPS Amazon",
      status: "IN",
      category: "Frozen",
      datetime: "2019-03-31 13:40:42",
   },
   {
      company: "DHL",
      box_no: "Office",
      status: "IN",
      category: "Frozen",
      datetime: "2019-03-30 18:10:42",
   },
   {
     company: "USPS",
     box_no: "USPS Amazon",
     status: "IN",
     category: "Post",
     datetime: prev1yearTime,
   },
   ],
   received: [{
     company: "FedEx",
     box_no: "FedEx Amazon",
     status: "OUT",
     category: "Food",
     datetime: prev1hourTime,
   },
   {
     company: "FedEx",
     box_no: "FedEx Amazon",
     status: "OUT",
     category: "Food",
     datetime: prev1dayTime,
   },
   {
     company: "FedEx",
     box_no: "FedEx BestBuy",
     status: "OUT",
     category: "Post",
     datetime: "2019-06-11 13:00:11",
  },
  {
     company: "FedEx",
     box_no: "FedEx Amazon",
     status: "OUT",
     category: "General",
     datetime: "2019-06-11 10:00:11",
  },
  {
     company: "FedEx",
     box_no: "FedEx Amazon",
     status: "OUT",
     category: "Food",
     datetime: "2019-06-10 10:00:11",
  },
   {
      company: "FedEx",
      box_no: "FedEx BestBuy",
      status: "OUT",
      category: "Post",
      datetime: "2019-03-11 10:00:11",
   },
   {
      company: "FedEx",
      box_no: "FedEx Amazon",
      status: "OUT",
      category: "General",
      datetime: "2019-03-11 10:00:11",
   },
   {
      company: "FedEx",
      box_no: "FedEx Amazon",
      status: "OUT",
      category: "Food",
      datetime: prev1yearTime,
   }
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
       location: "Front door",
       reg_time: currentTime,
       image_data: "",
       image_data_format: "",
       image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
     },
     {
       location: "Front door",
       reg_time: prev1minTime,
       image_data: "",
       image_data_format: "",
       image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
     },
     {
       location: "Front door",
       reg_time: prev1hourTime,
       image_data: "",
       image_data_format: "",
       image_url: "service/visitor/res/img/visitor_image_dummy_3.png",
     },
     {
       location: "Front door",
       reg_time: prev5hourTime,
       image_data: "",
       image_data_format: "",
       image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
     },
     {
       location: "Front door",
       reg_time: prev1dayTime,
       image_data: "",
       image_data_format: "",
       image_url: "service/visitor/res/img/visitor_image_dummy_2.png",
     },
     {
       location: "Front door",
       reg_time: "2019-06-01 10:00:11",
       image_data: "",
       image_data_format: "",
       image_url: "service/visitor/res/img/visitor_image_dummy_3.png",
     },
     {
       location: "Front door",
       reg_time: "2019-05-10 10:00:11",
       image_data: "",
       image_data_format: "",
       image_url: "service/visitor/res/img/visitor_image_dummy_1.png",
     },
   ]
}

/* CCTV */
var jsonCCTVInfo = {
   list: [
     {
       location: "Main Gate",
       stream_url: "service/cctv/res/img/surveillance_carmera01.mp4",
       poster_url: "service/cctv/res/img/surveillance_carmera01.png"
     },
     {
       location: "Play Ground",
       stream_url: "service/cctv/res/img/surveillance_carmera02.mp4",
       poster_url: "service/cctv/res/img/surveillance_carmera02.png"
     },
     {
       location: "Front Door",
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
         water: "14215",
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
          water: "18285",
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
