/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview module where individual services are added and deleted.
 * @module common/config
 */

 /** the configuration where individual services are added and deleted,
 *
 * @example
 * // set false to enabled if to disable notice service.
 *  {
 *     id : SERVICEID_NOTIFCATION, // "notice"
 *     enabled : false,
 *     path : "service/notification/",
 *     jsUri : "service/notification/js/notification_init.js",
 *     serverName : "notice,공지사항,notification",
    },
 * @var {object} service_list_config
 */
var service_list_config = [
    {
        id : SERVICEID_NOTIFCATION, // "notice"
        enabled : true,
        path : "service/notification/",
        jsUri : "service/notification/js/notification_init.js",
        serverName : "notice,공지사항,notification",
    },
    {
        id : SERVICEID_PARCEL,  // "parcel"
        enabled : true,
        path : "service/parcel/",
        jsUri : "service/parcel/js/parcel_init.js",
        serverName : "parcel,택배",
    },
    {
        id : SERVICEID_PARKING_LOCATION,    // "parking"
        enabled : true,
        path : "service/parking/",
        jsUri : "service/parking/js/parking_init.js",
        serverName : "parking,parking_location,주차위치",
    },
    {
        id : SERVICEID_PARKING_HISTORY, // "entry"
        enabled : false,
        path : "service/parking/",
        jsUri : "service/parking/js/parking_init.js",
        serverName : "entry,parking_history,주차기록",
    },
    {
        id : SERVICEID_ADMIN,   // "admin"
        enabled : true,
        path : "service/admin/",
        jsUri : "service/admin/js/admin_init.js",
        serverName : "bill,admin,관리비",
    },
    {
        id : SERVICEID_CCTV,    // "cctv"
        enabled : true,
        path : "service/cctv/",
        jsUri : "service/cctv/js/cctv_init.js",
        serverName : "cctv,안전카메라",
    },
    {
        id : SERVICEID_VISITOR, // "visitor"
        enabled : true,
        path : "service/visitor/",
        jsUri : "service/visitor/js/visitor_init.js",
        serverName : "visitor,방문객",
    },
    {
        id : SERVICEID_ENERGY,  // "EMS"
        enabled : true,
        path : "service/energy/",
        jsUri : "service/energy/js/energy_init.js",
        serverName : "energy,ems,EMS,에너지사용량,에너지 사용량",
    },
];
