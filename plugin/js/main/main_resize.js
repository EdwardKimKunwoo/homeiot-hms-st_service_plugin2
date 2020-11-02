/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Handles resizing events.
 * @module main/resize
 */

class ResizeHandler {
    /**
     * Create resize event handler.
     */
    constructor() {
        this._rate = 66;    // Throttling rate (15 fps)
        this._resizeTimeout;
        this._subscribers = {};

        $(window).on('resize', () => this._resizeThrottler());
        $(window).on('resizeend', () => this._resizeEndThrottler());
    }

    /**
     * Throttle resize events
     */
    _resizeThrottler() {
        /** Ignore resize events as long as the executions are in the queue */
        if (!this._resizeTimeout) {
            this._resizeTimeout = setTimeout(() => {

                this._resizeTimeout = null;

                /** Fire custom (throttled) resize event */
                this._publish('resize');

            }, this._rate);
        }
    }

    /**
     * Throttle resize end events
     */
    _resizeEndThrottler() {
        this._publish('resizeend');
    }

    /**
     * Publish an event and trigger corresponding callback
     */
    _publish(e) {
        (this._subscribers[e] || []).slice().forEach(lsn => lsn());
    }

    /**
     * Subscribe to an event and register callback
     */
    subscribe(e, callback) {
        if (!this._subscribers[e]) this._subscribers[e] = [];

        let length = this._subscribers[e].length;
        for (let i = 0; i < length; i++) {
            if (callback.toString() === this._subscribers[e][i].toString()) {
                return;
            }
        }

        this._subscribers[e].push(callback);
    }
}

const resizeHandler = new ResizeHandler();