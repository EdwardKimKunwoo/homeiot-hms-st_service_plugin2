/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Community Notification & Announcement Board Service
 * @module service/notification/object
 * @author Home IoT R&D Team
 */

var notiObject = {
  /** service name.
  * @type {string}
  * @instance
  */
  name: "Notification",
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
  /** The List of data shown on favorite card.
  * @type {object}
  * @instance
  */
  card_list: [],
  /** the index of the item clicked on the favorite card.
  * @type {number}
  * @instance
  */
  card_index: 0,
  /** Index of datas to request to server.
  * @type {number}
  * @instance
  */
  request_index:1,
  /** Total number of items shown in the notification page.
  * @type {number}
  * @instance
  */
  total_content_count:0,
  /** Flag to check if there are more pages to read from serve.
  * @type {boolean}
  * @instance
  */
  next_page: false,
  /** Flag to check if data is receiving from the server.
  * @type {boolean}
  * @instance
  */
  next_page_loading: false,
  /** The all list of actual data from server.
  * @type {object}
  * @instance
  */
  list: [
      // {
      //   reg_num: "",
      //   reg_date: "",
      //   title: "",
      //   img_url: "",  // not used
      //   body: "",  // 본문
      // },
      // {
      //   reg_num: "",
      //   reg_date: "",
      //   title: "",
      //   img_url: "",
      //   body: "",
      // },
  ]
};
