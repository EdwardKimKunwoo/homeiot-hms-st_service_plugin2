/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Ripple effect for service.
 * @module main/ripple
 */

/** 
 * Ripple effect
 * @class Ripple
 * @classdesc Represents ripple effect.
*/
class Ripple {
    /**
     * Create a ripple.
     * @param {object} event - Target object for a ripple effect.
     * @param {object} config - Configurations of a ripple.
     */
    constructor(event, config) {
        /** Ripple type (default: rippleB) */
        this._type = (config && config.type) || 'rippleB';

        /** Ripple duration/length (default: 400ms) */
        this._duration = (config && config.duration) || 400;

        /** Background or child ripple (default: false) */
        this._isBackground = (config && config.isBg) || false;

        /** Swiper (for notification service) */
        this._swiper = (config && config.swiper) || null;

        /** Ripple finished/canceled callbacks */
        this.cb        = (config && config.cb) || null;
        this.cancelCb  = (config && config.cancelCb) || null;

        /** Corresponding touch start event */
        this._event = event;

        /** Ripple target */
        this._target = event.currentTarget;
        this._target.style.position = 'relative';
        this._position = this._target.style.position;

        /** Create ripple element */
        if (this._isBackground) {
            /** Target의 background에서 생성 */
            this._ripple = this._target;
        }
        else {
            /** Target의 child element로 생성 */
            this._ripple = document.createElement('div');
        }

        /** Register custom animationend event handler */
        this._onAnimationend = new Promise((resolve) => {
            this._ripple.addEventListener('animationend', resolve, false);
        });

        /** Register custom touchend event handler */
        this._onTouchend = new Promise((resolve) => {
            this._target.addEventListener('touchend', resolve, {passive: true, capture: false, once: true});
        });

        /** Register custom touchmove event handler */
        this._onTouchmove = new Promise((resolve) => {
            this._target.addEventListener('touchmove', (e) => {
                if (!this._isTolerable(e)) {
                    resolve();
                }
            }, {passive: true, capture: false});

            if (this._swiper) {
                this._swiper.on('touchMove', (e) => {
                    if (!this._isTolerable(e)) {
                        resolve();
                    }
                });
            }
        });

        /** Register custom touchcancel event handler */
        this._onTouchcancel = new Promise((resolve) => {
            this._target.addEventListener('touchcancel', resolve, {passive: true, capture: false, once: true});
        });

        /** Register custom time expired event handler */
        this._onTimeExpired = new Promise((resolve) => {
            setTimeout(resolve, this._duration);
        });

        /** Register custom ripple finished type 1 event handler */
        this.onRippleFinished1 = new Promise((resolve) => {
            Promise.all([this._onAnimationend, this._onTouchend])
            .then(() => resolve('onRippleFinished1'));
        });

        /** Register custom ripple finished type 2 event handler */
        this.onRippleFinished2 = new Promise((resolve) => {
            Promise.all([this._onTouchend, this._onTimeExpired])
            .then(() => resolve('onRippleFinished2'));
        });

        /** Register custom ripple canceled event handler */
        this._isRippleCanceled = false;
        this.onRippleCanceled = new Promise((resolve) => {
            Promise.race([this._onTouchmove, this._onTouchcancel])
            .then(() => {
                this._isRippleCanceled = true;
                if (this._swiper) {
                    this._swiper.off('touchMove');
                }
                resolve('onRippleCanceled');
            })
        });
    }

    /**
     * Trigger ripple effect
     */
    trigger() {
        setTimeout(() => {
            if (this._isRippleCanceled) return;

            this._ripple.classList.add(this._type);
            if (!this._isBackground) {
                this._target.appendChild(this._ripple);
            }

            this._ripple.classList.toggle('animate');
        }, 100);
    }

    /**
     * Terminate/remove ripple effect
     */
    terminate() {
        if (!this._ripple) return;

        if (!this._isBackground) {
            this._ripple.style.display = 'none';
        }
        else {
            this._ripple.classList.remove(this._type);
        }
        this._ripple = null;
    }

    /** 
     * Determines if a given touchmove event is tolerable.
     * @param {object} e - Event object to get changed touches.
     * @return {Boolean} true if a given touchmove is tolerable.
     */
    _isTolerable(e) {
        let oldX = this._event.targetTouches[0].clientX;
        let oldY = this._event.targetTouches[0].clientY;
        let newX = e.changedTouches[0].clientX;
        let newY = e.changedTouches[0].clientY;
        let tolerance = 20;
        if (Math.abs(oldX - newX) > tolerance || Math.abs(oldY - newY) > tolerance) {
            return false;
        }
        return true;
    }
}

/** 
 * Ripple Manager
 * @class RippleManager
 * @classdesc Manages(create, add, trigger, remove) ripples
*/
class RippleManager {
    /**
     * Create ripple manager.
     */
    constructor() {
        /** A map that holds {id, ripple} pairs */
        this._queue = [];
        this._map = new Map();
    }

    /** 
     * Set ripple effect.
     * @param {object} e - A touch event to trigger ripple effect.
     * @param {object} config - Configurations for a ripple effect.
     */
    async set(e, config) {
        let target = e.currentTarget;
        let obj = this._map.get(target.id);
        if (obj === undefined) {
            obj = {};
            obj.cnt = 1;
            obj.pos = e.currentTarget.style.position;
            this._map.set(target.id, obj);
        }
        else {
            ++obj.cnt;
        }

        let ripple = new Ripple(e, config);

        Promise.race([
            ripple.onRippleFinished1,
            ripple.onRippleFinished2,
            ripple.onRippleCanceled
        ])
        .then((type) => {
            if (type === 'onRippleCanceled') {
                if (ripple.cancelCb) {
                    ripple.cancelCb();
                }
            }
            else {
                if (this._map.size === 1 && obj.cnt === 1 && ripple.cb) {
                    setTimeout(() => { ripple.cb(); }, 10);
                    $('.' + ripple._type).remove();
                }
            }
            --obj.cnt;
        })
        .then(() => {
            if (obj.cnt === 0) {
                target.style.position = obj.pos;
                this._map.delete(target.id);
            }
            ripple.terminate();
        });

        ripple.trigger();
    }
}

const rippleManager = new RippleManager();
