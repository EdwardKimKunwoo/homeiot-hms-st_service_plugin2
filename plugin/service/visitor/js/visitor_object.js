/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Visitors service shows a list of missed visitors.
 * @module service/visitor/object
 * @author Home IoT R&D Team
 */

 /** @classdesc visitorObject defines data storage of visitor service 
  * @constructor
 */
var visitorObject = {
    /** service name.
    * @type {string}
    * @instance
    */
     name: "Visitor",
    /** Minimum unit requesting from the server.
    * @type {number}
    * @instance
    */
     requestVisitorNum: 99,
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
    /** The index of page.
    * @type {number}
    * @instance
    */
     page_index: 0,
    /** The number of items to be updated when inview is shown as circle icon.
    * @type {number}
    * @instance
    */
     num_of_item_in_page: 40,
    /** The number of today visitor.
    * @type {number}
    * @instance
    */
     today_visitors: 0,
     /** The number of all visitor.
    * @type {number}
    * @instance
    */
     total_num: 0,
     /** The index of last page.
    * @type {number}
    * @instance
    */
     last_page: 1,
     /** Whether the next page is available.
    * @type {boolean}
    * @instance
    */
     next_page: false,
     /** index of requested visitor history list.
    * @type {number}
    * @instance
    */
     request_index: 1,
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
    /** The top index of scroll on page.
    * @type {number}
    * @instance
    */
     visitorPageScrollTop: 0, // 실제 각 tab 별 저장 위치 저장
    /** The list of actual data from server.
    * @type {object}
    * @instance
    */
     list: [
         //{
         //location: "",
         //reg_time: "",
         //image_data: "",
         //image_data_format: "",
         //image_url: ""
         //},
     ]
 };