/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Admin service shows the previous and current management expenses.
 * @module service/admin/object
 * @author Home IoT R&D Team
 */

 /** @classdesc adminObject defines data of the cost of managing an apartment.
  * @constructor
 */

var adminObject ={
  /** service name.
  * @type {string}
  * @instance
  */
  name: "Admin",
  /** Flag to save whether server data exists.
  * @type {boolean}
  * @instance
  */
  existdata:false,
  /** status of favorite card.
  * @type {string}
  * @instance
  */
  card_status: "unloaded",  // "unloaded" / "loading" / "loaded"
  /** Whether the data of page is loaded.
  * @type {boolean}
  * @instance
  */
  pageloaded: true,
  /** The all list of actual data from server.
  * @type {object}
  * @instance
  */
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
  list:[]
}
