/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Parcel service shows the information about the unreceived and received express.
 * @module service/parcel/object
 * @author Home IoT R&D Team
 */

 /** @classdesc parcelObject defines data storage of delivery service 
  * @constructor
 */
var parcelObject = {
    /** service name.
    * @type {string}
    * @instance
    */
     name: "Parcel",
    /** Minimum unit requesting from the server.
    * @type {number}
    * @instance
    */
     requestParcelNum: 10, // 서버에 요청하는 parcel 데이터의 최소 단위, min: 30, max 99
    /** Minimum unit requesting for undeliveried from the server.
    * @type {number}
    * @instance
    */
     requestWaitingParcelNum: 99, // 서버에 요청하는 waiting parcel 데이터의 최소 단위, min: 30, max 99
    /** Minimum unit requesting for deliveried from the server.
    * @type {number}
    * @instance
    */
     requestReceivedParcelNum: 30, // 서버에 요청하는 received parcel 데이터의 최소 단위, min: 30, max 99
    /** number of all parcel.
    * @type {number}
    * @instance
    */
     total_num: 0,
    /** number of undeliveried parcel.
    * @type {number}
    * @instance
    */
     waiting_num: 0,
    /** number of deliveried parcel.
    * @type {number}
    * @instance
    */
     received_num: 0,
     /** index of requested undeliveried parcel.
     * @type {number}
     * @instance
     */
     waiting_request_index : 1,
    /**  index of requested deliveried parcel.
    * @type {number}
    * @instance
    */
     received_request_index : 1,
    /** status of favorite card.
    * @type {string}
    * @instance
    */
     card_status: "unloaded",  // "unloaded" / "loading" / "loaded"
    /** Whether the page is loaded.
    * @type {boolean}
    * @instance
    */
     pageloaded: false,
     card_list: [],
    /** The index of card.
    * @type {number}
    * @instance
    */
     card_index: -1,
    /** The number of items in a page.
    * @type {number}
    * @instance
    */
     num_in_page: 5,
    /** The number of items to be updated when inview is shown as circle icon.
    * @type {number}
    * @instance
    */
     num_of_item_in_page: 40, // circle icon 이 보여서 inview 될때 item을 몇개씩 업데이트 할 것인지에 대한 수
    /** The index of clicked event.
    * @type {number}
    * @instance
    */
     clicked_index: 0,
    /** The id of clicked event.
    * @type {string}
    * @instance
    */
     clicked_id: "noselect",
    /** The id of original clicked event.
    * @type {string}
    * @instance
    */
     originalclicked_id: "noselect",
     /** The index of last page.
    * @type {number}
    * @instance
    */
     last_page: 1,
     /** The index of last page for undeliveried.
    * @type {number}
    * @instance
    */
     waiting_last_page: 1,
     /** The index of last page for deliveried.
    * @type {number}
    * @instance
    */
     received_last_page: 1,
     /** Whether the next page is available.
    * @type {boolean}
    * @instance
    */
     next_page: false,
     /** Whether the next page of undeliveried is available.
    * @type {boolean}
    * @instance
    */
     waiting_next_page: false,
     /** Whether the next page of deliveried is available.
    * @type {boolean}
    * @instance
    */
     received_next_page: false,
     /** Whether the next page is available.
    * @type {boolean}
    * @instance
    */
     next_page_loading: false,
     countFirstCheckOpenPage: true,
     tapOffset: 0,
    /** The name of tab shown on page.
    * @type {string}
    * @instance
    */
     parcelPageShownTab: "parcelPageWaiting", // 현재 보여지고 있는 tab
    /** The top index of undeliveried scroll on page.
    * @type {number}
    * @instance
    */
     parcelPageWaitingScrollTop: 0, // 실제 각 tab 별 저장 위치 저장 waiting
    /** The top index of deliveried scroll on page.
    * @type {number}
    * @instance
    */
     parcelPageReceivedScrollTop: 0,  // 실제 각 tab 별 저장 위치 저장 received
     tapOffset_fixed: 0,
     parcelPageScrollTop_fixed: 0,
    /** The all list of actual data from server.
    * @type {object}
    * @instance
    */
     parcel: [
         //   {
         //     company: "대한통운",
         //     box_no: "무인택배함 A01-103",
         //     status: "IN", //IN - 미수령 / OUT - 수령
         //     category: "식품",
         //     datetime: "2020-01-01 10:30:00",
         //  },
     ],
    /** The undeliveried list of actual data from server.
    * @type {object}
    * @instance
    */
     waiting: [
         //   {
         //     company: "대한통운",
         //     box_no: "무인택배함 A01-103",
         //     status: "IN", // IN - 미수령
         //     category: "식품",
         //     datetime: "2020-01-01 10:30:00",
         //  },
     ],
    /** The deliveried list of actual data from server.
    * @type {object}
    * @instance
    */
     received: [
         //   {
         //     company: "대한통운",
         //     box_no: "무인택배함 A01-103",
         //     status: "OUT", // OUT - 수령
         //     category: "식품",
         //     datetime: "2020-01-01 10:30:00",
         //  },
     ]
 };