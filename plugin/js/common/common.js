/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Manage resources and handle various UI effects
 * @module common/common
 */

// ### Refresh ###
const Svg = {
    loadSvg,
    svg,
    appendSvg,
    setSvg,
    organizeSvgElement
};

var isBasicDropDownTouched = false;

/** Represent a PullToRefresh effect. */
class PullToRefresh {
  /**
   * Create a PullToRefresh effect.
   * @param {object} parent - The object with PullToRefresh effect.
   * @param {callback} onRefreshing - The callback for PullToRefresh effect when refreshs view.
   * @param {variable} distance - The extent to which the corresponding effect is applied.
   * @param {object} watchTarget - The object to monitor events.
   * @param {object} paddingTarget - The object to add padding.
   */
    constructor(parent, onRefreshing, { distance, watchTarget, paddingTarget } = {}) {
        if (!parent) {
            throw new TypeError('InvalidElement');
        }

        this._parent = parent;
        this._listeners = {
            onRefreshing
        };
        this._attr = {
            distance: distance || 114
        };

        this._parent.addClass('pull-to-refresh');
        this._watchTarget = watchTarget ? watchTarget : this._parent;
        this._paddingTarget = paddingTarget ? paddingTarget : this._parent;

        this._watchTarget[0].addEventListener('touchstart', this._onTouchStart.bind(this), { passive: true });
        this._watchTarget[0].addEventListener('touchmove', this._onTouchMove.bind(this), { passive: false });
        this._watchTarget[0].addEventListener('touchend', this._onTouchEnd.bind(this));
        this._watchTarget[0].addEventListener('touchcancel', this._onTouchCancel.bind(this));

        // [HIOTRF-233] TouchStart 시 srcElement가 화면 갱신에 의해 삭제 될 경우, _onTouchCalcel()을 호출하도록 한다.
        this._touchSrcElement = null;
        this._observer = new MutationObserver(function (mutations, observer) {
            if (!this._context) {
                return;
            }
            var addedNodes = [], removedNodes = [];
            //mutations.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
            mutations.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))
            //console.log('Added:', addedNodes, 'Removed:', removedNodes);
            for (let i in removedNodes) {
                if(this._context){
                  if (removedNodes[i].contains(this._context.srcElement)) {
                      console.log("The touch start srcElement is removed. Cancel touch...");
                      this._onTouchCancel();
                  }
                }
            }
        }.bind(this))
        this._observer.observe(this._watchTarget[0], { childList: true, subtree: true });

        // load svg prior to use
        Svg.loadSvg('sharp-refresh-24px');
    }

    _onTouchStart(event) {
        this._touchSrcElement = event.srcElement;
        if (this._context) {
            return;
        }

        // TODO : iOS에서 PullToRefresh 동작 안하는 이슈 때문에 임시 수정함. (HIOTRF-137)
        // BounceBack 효과 때문에 ScrollFix에서 강제로 scrollTop을 1로 set 하고 있음
        //if (!event.currentTarget.scrollTop) {
        if (event.currentTarget.scrollTop <= 1) {
            this._context = {
                startY: event.touches[0].clientY,
                srcElement: event.srcElement
            };
        }
    }

    _onTouchMove(event) {
        if (!this._context) {
            return;
        }
        if (event && (this._context.srcElement !== event.srcElement)) {
            return;
        }

        if (this._context.working == null) {
            this._context.working = (event.touches[0].clientY - this._context.startY) > 0;
            this._parent.toggleClass('dragging', this._context.working);

            if (this._context.working) {
                event.preventDefault();

                // create circle
                //this._context.refreshCircle = $(Dom.div({ className: 'refresh-circle' }));
                const el = document.createElement('div');
                el['className'] = 'refresh-circle';
                this._context.refreshCircle = $(el);

                Svg.appendSvg(this._context.refreshCircle[0], 'sharp-refresh-24px', { className: 'circle-arrow', organize: true })
                    .then(svg => {
                        this._context.refreshArrow = svg;
                    });

                var strSvgHtml = "<svg class='circle-progress' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 66 66'>";
                strSvgHtml += "	<circle class='circle-progress__circle' cx='50%' cy='50%' r='30'></circle>";
                strSvgHtml += "</svg>";

                this._context.refreshCircle.html(strSvgHtml);
                this._parent.append(this._context.refreshCircle);
            }
        }

        if (this._context.working && !this._context.refreshCircle.hasClass('in-progress')) {
            event.preventDefault();

            const delta = Math.max(event.touches[0].clientY - this._context.startY, 0);
            if (delta !== this._context.delta) {
                this._context.delta = delta;
                const bezier = Bezier.cubicBezier(this._context.delta / this._parent.height(), .075, .82, .165, 1);
                const adjusted = this._attr.distance * bezier.y;
                // this._parent.ele.style.paddingTop = `${adjusted}px`;
                //console.log("adjusted:" + adjusted);

                this._context.refreshCircle.css("top", `${adjusted - 40}px`);
                if (this._context.refreshArrow) {
                    this._context.refreshArrow.style.transform = `rotate(${bezier.y * 360}deg)`;
                    this._context.refreshArrow.style.opacity = Math.min(bezier.y * 1.5, 1);
                }

                if (this._paddingTarget) {
                    this._paddingTarget.css('padding-top', `${adjusted}px`);
                }
            }
        }
    }

    _onTouchEnd(event) {
        this._touchSrcElement = null;
        if (!this._context) {
            return;
        }
        if (event && (this._context.srcElement !== event.srcElement)) {
            return;
        }

        if (this._context.working) {
            if (this._context.refreshCircle.hasClass('in-progress')) {
                return;
            }

            this._parent.removeClass('dragging');

            // HIOTRF-386 : PullToRefresh target element가 현재 화면에 보여지는 div가 아닐 경우 refresh 하지 않도록 수정
            if ((this._context.delta >= this._attr.distance) && (this._watchTarget[0].id == serviceMain.currentDivString)) {
                // start spinning
                this._context.refreshCircle.addClass('in-progress');
                (() => this._context.refreshCircle.height())(); //reflow
                const refreshMargin = ((this._attr.distance - this._context.refreshCircle.height()) / 2) - 22;
                this._context.refreshCircle.css('top', refreshMargin + "px");

                if (this._paddingTarget) {
                    this._paddingTarget.addClass('in-progress');
                    window.abc = this._paddingTarget;
                    (() => this._paddingTarget.height())(); //reflow
                    this._paddingTarget.css('padding-top', refreshMargin + this._context.refreshCircle.height() + "px");
                }

                // call listener
                if (this._listeners.onRefreshing) {
                    this._listeners.onRefreshing();
                }
            } else {
                this.finishRefresh();
            }
        } else {
            delete this._context;
        }
    }

    _onTouchCancel(event) {
        if (!this._context) {
            return;
        }
        if (event && (this._context.srcElement !== event.srcElement)) {
            return;
        }

        if (this._context.working) {
            if (this._context.refreshCircle.hasClass('in-progress')) {
                return;
            }

            this._parent.removeClass('dragging');

            this.finishRefresh();
        } else {
            delete this._context;
        }
    }

   /**
   * Finish refresh process.
   * @async
   */
    async finishRefresh() {
        console.log("finish refresh!!!");
        if (this._context) {
            if (this._paddingTarget) {
                this._paddingTarget.css('padding-top', 0 + "px");
                this._paddingTarget.removeClass('in-progress');
            }

            await PromiseTransitionEnd(this._context.refreshCircle[0],
                {
                    triggerFunc: () => {
                        this._context.refreshCircle.css('transform', 'scale(0)');
                    }
                }
            );
            this._parent[0].removeChild(this._context.refreshCircle[0]);
            this._context = null;
        }
        delete this._context;
    }
}
// ### Refresh End ###

// ### Resource Start ###

/** Class that manages JS resources. */
class ResourceJs {
    /** Create a ResourceJs object. */
    constructor() {
        this._class = 'ResourceJs';
        this._modules = {};
    }

    _loadModule(module) {
        if (!this._modules[module]) {
            this._modules[module] = {};
            this._modules[module].promise = new Promise((resolve, reject) => {
                const script = document.createElement('script');

                this._modules[module].resolve = resolve;
                this._modules[module].reject = reject;

                script.setAttribute('type', 'text/javascript');
                script.setAttribute('src', `${module}.js`);

                document.head.appendChild(script);
            });
        }

        return this._modules[module].promise;
    }

    _resolveModules(modules) {
        const result = modules.filter((module => this._modules[module] && this._modules[module].instance));
        if (result.length === modules.length) {
            return Promise.resolve(modules.map(module => this._modules[module].instance));
        } else {
            return Promise.all(modules.map(this._loadModule.bind(this)));
        }
    }

    /** get loaded module */
    get() {
        let modules = null;
        let func = null;

        if (arguments.length < 1) {
            return Promise.reject(new Error('[Resource.get] need at least a function'));
        }

        func = arguments[arguments.length - 1];
        if (typeof func !== 'function') {
            return Promise.reject(new Error('[Resource.get] last parameter is not a function'));
        }

        if (arguments.length > 1) {
            modules = arguments[arguments.length - 2];
            if (!Array.isArray(modules)) {
                Promise.reject(new Error('[Resource.get] requirement is not an array'));
            }

            modules = modules.map(module => module.replace(/\.js$/, ''));
        }

        //console.log('----------------------------------------!!!');

        if (modules != null && modules.length > 0) {
            return this._resolveModules(modules).then(resolved => func(...resolved));
        } else {
            return Promise.resolve(func());
        }
    }

    /** set a module to map */
    set() {
        let moduleName = null;
        let modules = null;
        let func = null;

        if (arguments.length < 1) {
            return Promise.reject(new Error('[Resource.set] need at least a function'));
        }

        func = arguments[arguments.length - 1];
        if (typeof func !== 'function') {
            return Promise.reject(new Error('[Resource.set] last parameter is not a function'));
        }

        if (arguments.length > 1) {
            modules = arguments[arguments.length - 2];
            if (!Array.isArray(modules)) {
                return Promise.reject(new Error('[Resource.set] requirement is not an array'));
            }

            modules = modules.map(module => module.replace(/\.js$/, ''));
        }

        if (arguments.length > 2) {
            moduleName = arguments[arguments.length - 3];
            if (typeof moduleName !== 'string') {
                return Promise.reject(new Error('[Resource.set] module name is not a string'));
            }
        } else {
            moduleName = document.currentScript.attributes.src.nodeValue;
        }

        moduleName = moduleName.replace(/\.js$/, '');

        if (!this._modules[moduleName]) {
            // loading from static <script> or inline module
            this._modules[moduleName] = {};
        } else if (this._modules[moduleName].instance) {
            // already defined??
            return Promise.reject(new Error('[Resource.set] already defined module'));
        }

        if (modules != null && modules.length > 0) {
            const promise = this._resolveModules(modules)
                .then(resolved => {
                    const result = func(...resolved);
                    this._modules[moduleName].instance = result;

                    if (this._modules[moduleName].resolve) {
                        const resolve = this._modules[moduleName].resolve;

                        this._modules[moduleName].resolve = undefined;
                        this._modules[moduleName].reject = undefined;

                        resolve(result); // trigger!!
                    }

                    return result;
                });

            if (!this._modules[moduleName].promise) {
                this._modules[moduleName].promise = promise;
            }
        } else {
            const result = func();
            this._modules[moduleName].instance = result;

            if (!this._modules[moduleName].promise) {
                this._modules[moduleName].promise = Promise.resolve(result);
            } else if (this._modules[moduleName].resolve) {
                const resolve = this._modules[moduleName].resolve;

                this._modules[moduleName].resolve = undefined;
                this._modules[moduleName].reject = undefined;

                resolve(result); // trigger!!
            }
        }

        return this._modules[moduleName].promise;
    }
}
window.Resource = new ResourceJs();
// ### Resource End ###

// ### SVG Start ###
const SVG_PATH = 'res/svg';
const SVG_JS_EXTENSION = '.svg.js';
const SVG_EXTENSION = '.svg';
const svgs = {};

function basename(path) {
    return path.substring(path.lastIndexOf('/') + 1);
}

async function loadSvg(svg) {
    const id = basename(svg).replace(SVG_JS_EXTENSION, '').replace(SVG_EXTENSION, '');
    if (!id) {
        Promise.reject(new Error(`[SVG.loadSvg] invalid svg : ${svg}`));
    }

    if (svgs[id]) {
        return svgs[id];
    } else {
        return svgs[id] = Resource.get([`${SVG_PATH}/${id}${SVG_JS_EXTENSION}`], svg => {
            const div = document.createElement('div');
            div.innerHTML = svg;

            return div.getElementsByTagName('svg')[0];
        });
    }
}

function organizeSvgElement(element) {
    if (!element) {
        return;
    }

    for (const child of element.childNodes) {
        if (child.hasAttribute && child.tagName !== 'mask') {
            if (child.hasAttribute('fill') && child.getAttribute('fill') !== 'none') {
                child.dataset.hasFill = true;
                child.removeAttribute('fill');
            }

            if (child.hasAttribute('stroke') && child.getAttribute('stroke') !== 'none') {
                child.dataset.hasStroke = true;
                child.removeAttribute('stroke');
            }
        }

        organizeSvgElement(child);
    }
}

async function svg(svgId, { color, opacity, className, organize } = {}) {
    if (!svgId) {
        throw new Error('[SVG.svg] invalid parameters');
    }

    const svg = await loadSvg(svgId);
    const cloned = svg.cloneNode(true);

    if (className) {
        cloned.classList.add(className);
    }

    if (organize) {
        organizeSvgElement(cloned);
    }

    return cloned;
}

async function appendSvg(target, svgId, { color, opacity, className, organize } = {}) {
    if (!target || !svgId) {
        throw new Error('[SVG.appendSvg] invalid parameters');
    }

    const result = await svg(svgId, { color, opacity, className, organize });
    target.appendChild(result);

    return result;
}

async function setSvg(target, svgId, { color, opacity, className, organize } = {}) {
    if (!target || !svgId) {
        throw new Error('[SVG.setSvg] invalid parameters');
    }

    const result = await svg(svgId, { color, opacity, className, organize });
    target.innerHTML = result.outerHTML;

    return result;
}

// ### SVG End ###

// ### Boundary feedback Start ###

/** Represent a boundary feedback effect. */
class BoundaryFeedback {
  /** Create a boundary feedback. */
    constructor() {
        this._feedbackArea = $(
            "<svg id='boundaryFeedback' width='100%' height='100%' opacity='1' style='display: none; position: absolute; pointer-events: none; z-index:120'>" +
            "   <circle id='boundaryFeedbackCircle' fill='#4297ff' opacity='0.15'/>" +
            "</svg>"
        );
        this._feedbackCircle = $(this._feedbackArea[0].getElementById("boundaryFeedbackCircle"));
        this._feedbackArea.hide();

        // window 전체에 touchstart/touchmove event를 걸어서 모든 touch에 대해 검사한다.
        window.addEventListener('touchstart', this._touchstartHandler.bind(this));
        window.addEventListener('touchmove', this._touchmoveHandler.bind(this));
    }

    _touchstartHandler(e) {
        if (this._feedbackArea.is(':visible')) {
            return;
        }
        this._checkstart = true;
        this._startX = e.changedTouches[0].clientX;
        this._startY = e.changedTouches[0].clientY;
    }

    _touchmoveHandler(e) {
        if (this._feedbackArea.is(':visible') || (!this._checkstart)) {
            return;
        }
        this._checkstart = false;
        this._endX = e.changedTouches[0].clientX;
        this._endY = e.changedTouches[0].clientY;

        // detect touch direction
        var diffX = Math.abs(this._startX - this._endX);
        var diffY = Math.abs(this._startY - this._endY);
        var touchDirection = (diffX <= diffY) ? 'vertical' : 'horizontal';

        // filter not intented touch move
        if ((touchDirection === 'horizontal' && diffX < 10) || (touchDirection === 'vertical' && diffY < 10) || isBasicDropDownTouched) {
            return;
        }

        // touch 된 element 중 해당 touch direction에 맞는 end_effect class가 있는 element를 찾고 touch 영역에 해당 element가 없으면 무시한다.
        let elm = this._findElement('end_effect', e.path, touchDirection);
        if (elm === undefined) {
            return;
        }
        this._direction = touchDirection;
        this._ele = $(elm);
        this._ele.unbind('scroll', this._scrollHandler);
        this._ele.bind('scroll', {context: this}, this._scrollHandler);
        this._triggerEffect();
    }

    _scrollHandler(e) {
        var that = e.data.context;
        if (that._feedbackArea.is(':visible')) {
            return;
        }
        if(that._ele[0] === e.currentTarget) {
            that._triggerEffect();
        }
    }

    _findElement(className, elementList, direction) {
        let elm;
        for (let i in elementList) {
            if ((elementList[i] instanceof Element) && (elementList[i].classList.contains(className))) {
                // detect element direction
                if ( (direction == 'vertical' && (elementList[i].scrollHeight > elementList[i].clientHeight)) ||
                    (direction == 'horizontal' && (elementList[i].scrollWidth > elementList[i].clientWidth)) ) {
                    elm = elementList[i];
                    break;
                }
            }
        }
        return elm;
    }

    _getPosition() {
        if (this._direction === 'vertical') {    // 상/하 스크롤
            if ((this._endY > this._startY) && (this._ele.prop('scrollTop') <= 0)){
                var position = 'top';
            } else if ((this._endY < this._startY) && (Math.round(this._ele.prop('scrollTop')) >= (this._ele.prop('scrollHeight') - this._ele.prop('clientHeight')))) {
                var position = 'bottom';
            } else {
                return;
            }
        } else {    // 좌/우 스크롤
            if ((this._endX > this._startX) && (this._ele.prop('scrollLeft') <= 0)){
                var position = 'left';
            } else if ((this._endX < this._startX) && (Math.round(this._ele.prop('scrollLeft')) >= (this._ele.prop('scrollWidth') - this._ele.prop('clientWidth')))) {   //////
                var position = 'right';
            } else {
                return;
            }
        }
        return position;
    }

    _triggerEffect() {
        let position = this._getPosition();
        if (!position) {
            return;
        }
        let r, cx, cy, delta;
        let width = this._ele.prop('scrollWidth');
        let height = this._ele.prop('scrollHeight');
        if (this._direction === 'vertical') {    // 상/하 스크롤
            let curve_thickness = 22; // 둥근 부분의 두께
            let box_thickness = 5; // 둥근 부분을 제외한 영역의 두께
            r = parseInt((width * width) / (curve_thickness * 8) + (curve_thickness / 2));
            cx = width / 2;
            cy = (position === 'top') ? -r : height + r;
            delta = (position === 'top') ? curve_thickness + box_thickness : -(curve_thickness + box_thickness);
        } else {    // 좌/우 스크롤
            // 높이가 60px가 안되면 더 얇은 feedback을 보여준다. (원래는 tab 영역에 설정되는 값이지만, caller가 별도로 setting 하지 않도록 하기 위함)
            let curve_thickness = (height <= 60) ? 6 : 15; // 둥근 부분의 두께
            let box_thickness = (height <= 60) ? 2 : 3; // 둥근 부분을 제외한 영역의 두께
            r = parseInt((height * height) / (curve_thickness * 8) + (curve_thickness / 2));
            cx = (position === 'left') ? -r : width + r;
            cy = height / 2;
            delta = (position === 'left') ? curve_thickness + box_thickness : -(curve_thickness + box_thickness);
        }

        this._ele.unbind('scroll', this._scrollHandler);

        document.documentElement.style.setProperty('--boundary-feedback-delta', delta + "px");

        this._feedbackArea.css('top', "0");
        this._feedbackArea.css('left', "0");
        this._feedbackArea.css('width', width);
        this._feedbackArea.css('height', height);
        this._feedbackCircle.attr("r", r);
        this._feedbackCircle.attr("cx", cx);
        this._feedbackCircle.attr("cy", cy);

        this._ele.append(this._feedbackArea);

        this._feedbackArea.show();

        // 순차적으로 animation을 show / hide 한다.
        promiseAnimationEnd(this._feedbackCircle, 'show boundary_feedback_' + this._direction)
            .then( () => promiseAnimationEnd(this._feedbackCircle, 'hide boundary_feedback_' + this._direction) )
            .then( () => {
                this._feedbackArea.hide();
                this._feedbackArea.remove();
            });
    }
}
// ### Boundary feedback End ###

// ### Custom Scrollbar Start ###

/** Represent a custom scroller. */
class CustomScrollbar {
    /** Create a custom scroller. */
    constructor() {
        // window 전체에 scroll event를 걸어서 모든 scroll에 대해 검사한다.
        window.addEventListener('scroll', this._scrollHandler.bind(this), true);
    }
    _scrollHandler(e) {
        e.target.classList.add('showScrollbar');
        if (e.target.scrollbarTimeout) {
            clearTimeout(e.target.scrollbarTimeout);
        }
        e.target.scrollbarTimeout = setTimeout(() => {
            e.target.classList.remove('showScrollbar');
            e.target.scrollbarTimeout = undefined;
        }, 1000);
    }
}
// ### Custom Scrollbar End ###


// ### ScrollFixForIOS Start ###
/** Represent fixed scroller for iOS. */
class ScrollFixForIOS {
    /** Create fixed scroller for iOS. */
    constructor() {
        // window 전체에 touchstart event를 걸어서 모든 touch에 대해 검사한다.
        window.addEventListener('touchstart', this._touchStartHandler.bind(this), false); // false???
    }
    _touchStartHandler(e) {
        let path = e.path || (e.composedPath && e.composedPath())
        let elem = this._findElement('bounce', path);
        if (elem) {
            if (elem.scrollTop <= 0) {
                elem.scrollTop = 1;
            } else if (elem.scrollTop + elem.offsetHeight >= elem.scrollHeight) {
                elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
            }
        }
    }
    _findElement(className, elementList) {
        let elm;
        for (let i in elementList) {
            if ((elementList[i] instanceof Element) && (elementList[i].classList.contains(className))) {
                elm = elementList[i];
                break;
            }
        }
        return elm;
    }
}
// ### ScrollFixForIOS End ###