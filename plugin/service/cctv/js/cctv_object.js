/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview CCTV service shows various CCTV screens in apartments.
 * @module service/cctv/object
 * @author Home IoT R&D Team
 */

/** @classdesc cctvObject defines data storage of cctv service 
 * @constructor
*/
var cctvObject = {
    name: "CCTV",
    num: 0,
    card_status: "unloaded",
    pageloaded: true,
    list: []
}