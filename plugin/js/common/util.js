/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

// 숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.comma = function () {
  if (this === 0) return "0";
  var reg = /(^[+-]?\d+)(\d{3})/;
  var n = (this + '');
  while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
  return n;
};

// 문자열 타입에서 쓸 수 있도록 format() 함수 추가
String.prototype.comma = function () {
  var num = parseFloat(this);
  if (isNaN(num)) return this;
  return num.comma();
};

// 숫자 타입에서 화폐 표시
Number.prototype.currency = function (sign,bComma,bExchange,css) {
  var value = parseFloat(this);

  if(bExchange){
    var tmp = (value/1800).toFixed(2);
    var tmp1 = parseInt(tmp).comma();
    var tmp2 = (parseFloat(tmp) - parseInt(tmp)).toFixed(2);
    var tmp2 = tmp2.substring(1);
    value = ""+tmp1+tmp2
  } else {
    value = bComma?value.comma():value;
  }

  if(css===undefined) css="";

  if (value === 0) return "0";
  if (sign === "원") {
    return (value + '<span class=\'' + css + '\'>'+ $.lang["ko"].CURRENCY_WON + '</span>');
  } else if (sign === "$") {
    return ('<span class=\'' + css + '\'>$</span>' + value);
  } else if (sign === "￦") {
    return ('<span class=\'' + css + '\'>￦</span>' + value);
  } else if (sign === "") {
    return ('<span class=\'' + css + '\'></span>' + value);
  }

  return "0";
};

// 숫자 타입에서 화폐 표시
String.prototype.currency = function (sign,bComma,bExchange,css) {
  var num = parseFloat(this);
  if (isNaN(num)) return this;
  return num.currency(sign,bComma,bExchange,css);
};

// 문자열 타입에서 폰트변경
String.prototype.fmodify = function (color, weight) {
  return ("<font style='color:" + color + "; font-weight :" + weight + ";'>" + this + "</font>");
};

// 이미지 그리기
String.prototype.drawImg = function (w, h, ml, mr) {
  //  console.log(this)
  return ("<img src='res/img/" + this + "' style='width:" + w + "px;height:" + h + "px;margin-left:" + ml + "px;margin-right:" + mr + "px'>");
};

// 숫자 타입에서 폰트변경
Number.prototype.fmodify = function (color, weight) {
  return ("<font style='color:" + color + "; font-weight :" + weight + ";'>" + this + "</font>");
};

String.prototype.rgba = function(alpha) {
  var rColor = parseInt(this.substring(1,3),16);
  var gColor = parseInt(this.substring(3,5),16);
  var bColor = parseInt(this.substring(5,7),16);
  //console.log(this.substring(1,3), parseInt(this.substring(1,3),16));
  //console.log(this.substring(3,5), parseInt(this.substring(3,5),16));
  //console.log(this.substring(5,7), parseInt(this.substring(5,7),16));

  return "rgba("+rColor+","+gColor+","+bColor+","+alpha+")"
}

// 문자열에서 HTML escape 문자 대체
String.prototype.escapeHtml = function () {
	return this.replace(/[&<>"'`=\/]/g, function (s) {
		return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    }[s];
	});
};

// 문자열에서 개행문자를 <br>로 대체
String.prototype.newLineToBR = function () {
	return this.replace(/(\n|\r\n)/g, '<br>');
};

// [Violation] 현상 제거
jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    if (ns.includes("noPreventDefault")) {
      this.addEventListener("touchstart", handle, {
        passive: false
      });
    } else {
      this.addEventListener("touchstart", handle, {
        passive: true
      });
    }
  }
};

// [Violation] 현상 제거
jQuery.event.special.mousewheel = {
  setup: function (_, ns, handle) {
    if (ns.includes("noPreventDefault")) {
      this.addEventListener("mousewheel", handle, {
        passive: false
      });
    } else {
      this.addEventListener("mousewheel", handle, {
        passive: true
      });
    }
  }
};

// string to date
String.prototype.toDate = function (format) {
  var normalized = this.replace(/[^a-zA-Z0-9]/g, '-');
  var normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  var formatItems = normalizedFormat.split('-');
  var dateItems = normalized.split('-');

  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var hourIndex = formatItems.indexOf("hh");
  var minutesIndex = formatItems.indexOf("ii");
  var secondsIndex = formatItems.indexOf("ss");

  var today = new Date();

  var year = yearIndex > -1 ? dateItems[yearIndex] : today.getFullYear();
  var month = monthIndex > -1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1;
  var day = dayIndex > -1 ? dateItems[dayIndex] : today.getDate();

  var hour = hourIndex > -1 ? dateItems[hourIndex] : today.getHours();
  var minute = minutesIndex > -1 ? dateItems[minutesIndex] : today.getMinutes();
  var second = secondsIndex > -1 ? dateItems[secondsIndex] : today.getSeconds();

  return new Date(year, month, day, hour, minute, second);
};

// date to string
Date.prototype.tostring = function (string_lang) {

  if (string_lang === "en") {
    var monthString = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var mm_string = monthString[this.getMonth()];
    var dd = this.getDate();
    var hh = this.getHours();
    var ii = this.getMinutes();
    var ss = this.getSeconds()

    var date = [(dd > 9 ? '' : '0') + dd,
      (mm > 9 ? '' : '0') + mm,
      this.getFullYear()
    ].join('/');

    var dateUS = mm_string + " " + (dd > 9 ? '' : '0') + dd + " " + this.getFullYear();

    var time = [
      (hh > 9 ? '' : '0') + hh,
      (ii > 9 ? '' : '0') + ii,
      (ss > 9 ? '' : '0') + ss
    ].join(':');

    var hhiiss_ddmmyyyy = time + " " + date;
    var mS_d_yyyy_hhiiss = dateUS + " " + time;
    return mS_d_yyyy_hhiiss;
  } else {

    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    var hh = this.getHours();
    var ii = this.getMinutes();
    var ss = this.getSeconds()

    var date = [this.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-');

    var time = [
      (hh > 9 ? '' : '0') + hh,
      (ii > 9 ? '' : '0') + ii,
      (ss > 9 ? '' : '0') + ss
    ].join(':');
    return date + " " + time;
  }
};

String.prototype.toStringUS = function (type) {
  var tmpDate = this.toDate("yyyy-mm-dd hh:ii:ss");
  var tmpString = tmpDate.tostring("en");
  //  console.log(tmpString);
  var retString;
  if (type === "mdhi") {
    retString = tmpString.substring(0, tmpString.length - 14) + " " + tmpString.substring(tmpString.length - 8, tmpString.length - 3);
  } else if (type === "mdy") {
    retString = tmpString.substring(0, tmpString.length - 9);
  } else if (type === "my") {
    retString = tmpString.substring(0, tmpString.length - 17) + " " + tmpString.substring(tmpString.length - 13, tmpString.length - 9);
  } else if (type === "hi") {
    retString = tmpString.substring(tmpString.length - 8, tmpString.length - 3);
  } else if (type === "mdyhi") {
    retString = tmpString.substring(0, tmpString.length - 3);
  } else if (type === "md") {
    retString = tmpString.substring(0, tmpString.length - 13);
  } else {
    retString = tmpString;
  }

  return retString;
}

String.prototype.toDateString = function (noTime) {
  var curDate = new Date();
  var curYear = curDate.getFullYear();
  var curMonth = curDate.getMonth();
  var curDay = curDate.getDate();

  var tmpDate = Date.parse(this);
  var tmpYear = tmpDate.getFullYear();
  var tmpMonth = tmpDate.getMonth();
  var tmpDay = tmpDate.getDate();

  var retString = "";

  if (curYear === tmpYear && curMonth === tmpMonth && curDay === tmpDay) {  // 오늘
    retString = $.lang[lang].TODAY;
  } else if (curYear === tmpYear && curMonth === tmpMonth && curDay === tmpDay + 1) {  // 어제
    retString = $.lang[lang].YESTERDAY;
  }

  var options = {};
  if (curYear !== tmpYear) { // 연도가 다르면 연도 표시
    options.year = "numeric";
  }
  if (retString.length === 0) {  // 오늘이나 어제가 아니면 날짜 표시
    if (lang === "en"){
      options.month = "short"; // "Dec 1, 2018"
    } else {
      options.month = (options.year) ? "numeric" : "short";  // 연도가 포함되어 있으면 "1111년 11월 11일" 이 아닌 "1111. 11. 11"로 표시
    }

    options.day = "numeric";
  }
  if (!noTime) {  // 시간도 표시해야 하면 표시
    options.hour = "numeric";
    options.minute = "numeric";
  }

  if (!jQuery.isEmptyObject(options)) {
    if(retString === $.lang[lang].TODAY){
      retString = $.lang[lang].TIME_TODAY.replace("%s", tmpDate.toLocaleString(lang, options));
    } else if(retString === $.lang[lang].YESTERDAY){
      retString = $.lang[lang].TIME_YESTERDAY.replace("%s", tmpDate.toLocaleString(lang, options));
    } else {
      retString += tmpDate.toLocaleString(lang, options);
    }
  }

  return retString;
}

String.prototype.toDateTimeString = function () {
  var tmpDate = Date.parse(this);
  var options = { hour: "numeric", minute: "numeric" };

  return tmpDate.toLocaleString(lang, options);
}

String.prototype.checkTodayYesterday = function () {
  var curDate = new Date();
  var curYear = curDate.getFullYear();
  var curMonth = curDate.getMonth();
  var curDay = curDate.getDate();

  var tmpDate = Date.parse(this);
  var tmpYear = tmpDate.getFullYear();
  var tmpMonth = tmpDate.getMonth();
  var tmpDay = tmpDate.getDate();

  var retString = "";

  if (curYear === tmpYear && curMonth === tmpMonth && curDay === tmpDay) {  // 오늘
    retString = $.lang[lang].TODAY;
  } else if (curYear === tmpYear && curMonth === tmpMonth && curDay === tmpDay + 1) {  // 어제
    retString = $.lang[lang].YESTERDAY;
  }

  return retString;
}

function toDateYearString(year) {
  var date = year + "-08-01";
  var tmpDate = Date.parse(date);
  var options = { year: 'numeric' };

  return tmpDate.toLocaleString(lang, options);
}

function toDateMonthString(month)  {
  var date = "2019-" + month + "-01";
  var tmpDate = Date.parse(date);
  var options = { month: 'short' };

  return tmpDate.toLocaleString(lang, options);
}

// return : Jan 2019
function toDateYearMonthString(year, month) {
  var date = year + "-" + month + "-01";
  var tmpDate = Date.parse(date);
  var options = { year: 'numeric', month: 'short' };

  return tmpDate.toLocaleString(lang, options);
}

function toDateYearMonthDayString(year, month,day) {
  var date = year + "-" + month + "-" + day;
  var tmpDate = Date.parse(date);
  var options = { year: 'numeric', month: 'short', day: 'numeric' };

  return tmpDate.toLocaleString(lang, options);
}

// return : 2019-01
function toDataStringWithCurrentYearMonth(){
  var curDate = new Date();
  var curYear = curDate.getFullYear();
  var curMonth = curDate.getMonth()+1;

  if(curMonth < 10){
    curMonth = "0" + curMonth;
  }

  return curYear + "-" + curMonth;
}

// generate fake data for energy service
function generateEnergyInfo()
{
  var curDate = new Date();
  var curYear = curDate.getFullYear();
  var curMonth = curDate.getMonth();
  var date = curYear + "-" + curMonth + "-01";

  //console.log("date",date);
  //console.log("curMonth",curMonth);

  // scope : current year, 1~current month
  let i=curMonth+1;

  if(i>12) i = 12;

  for(; i>0; i--){ // Jan : 0
    let tmpDate = new Date(date);
    tmpDate.setMonth(i);

    let tmpMonth = i;
    //console.log("tmpMonth",tmpMonth);
    if(i < 10){
      tmpMonth = "0" + i;
    }

    var dueDate = new Date(curYear,tmpMonth,0);
    dueDate.setMonth(dueDate.getMonth()+1+1,0);
    //console.log("tmpMonth",tmpMonth);
    var listitem = {};
    listitem.year = curYear;
    listitem.month = tmpMonth;
    listitem.duedate = dueDate.getFullYear() + "-"+ (dueDate.getMonth()+1) + "-" + dueDate.getDate();
    //console.log("tmpMonth:", parseInt(tmpMonth),dueDate,listitem.duedate);

    fakeDateYM.list.push(listitem);
  }

  // scope : last year, ~12 month
  for(let i=12; i >= 12-(18-(curMonth+1)) ; i--){ // Jan : 0
    var tmpLastMonth = ((i+12)%12===0)?12:(i+12)%12;
    var tmpLastYear = curYear -(2 - parseInt((i+11)/12));
    //console.log(i,tmpLastYear,tmpLastMonth);

    date = tmpLastYear + "-" + tmpLastMonth + "-01";
    let tmpDate = new Date(date);
    let tmpMonth = tmpDate.getMonth();
    tmpMonth++;

    if(tmpMonth < 10){
      tmpMonth = "0" + tmpMonth;
    }

    var dueDate = new Date(curYear,tmpMonth,0);
    dueDate.setMonth(dueDate.getMonth()+1+1,0);

    var listitem = {};
    listitem.year = tmpLastYear;
    listitem.month = tmpMonth;
    listitem.duedate = dueDate.getFullYear() + "-"+ (dueDate.getMonth()+1) + "-" + dueDate.getDate();
    //console.log("tmpMonth:", parseInt(tmpMonth),dueDate,listitem.duedate);

    fakeDateYM.list.push(listitem);
  }

  /*
  for(let k=0; k<18; ++k)
  {
    console.log("fakeDateYM.list["+k+"].year=",fakeDateYM.list[k].year);
    console.log("fakeDateYM.list["+k+"].month=",fakeDateYM.list[k].month);
  }
  */

  return ;
}

String.prototype.isSameDay = function (compareDay) {
  var thisSubString = this.substring(0, 10);
  var compareSubString = compareDay.substring(0, 10);
  if (thisSubString === compareSubString) return true;
  return false;
}

String.prototype.isLatestTimeThan = function (compareDay) {
  var thisSubString = this.substring(0, 19);
  var compareSubString = compareDay.substring(0, 19);
  if (thisSubString >= compareSubString) return true;
  return false;
}

var isPlatform = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|Macintosh|iPod/i);
  },
  iPad: function () {
    return navigator.userAgent.match(/iPad|Macintosh/i);
  },
  Tizen: function () {
    return navigator.userAgent.match(/Tizen/i);
  },
  Simulator: function () {
    return navigator.userAgent.match(/Simulator/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/Windows/i);
  },
  X11: function () {
    return navigator.userAgent.match(/X11/i);
  },
  any: function () {
    return (isPlatform.Android() || isPlatform.iOS() || isPlatform.Tizen());
  }
};

function isFHub() {
  return navigator.userAgent.match(/Family Hub/);
}
/*
return : "SMART-TV"  or null
*/
function isSmartTV() {
  return navigator.userAgent.match(/SMART-TV/);
}

function isWindows() {
  return navigator.userAgent.match(/Windows/i);
}

function isX11() {
  return navigator.userAgent.match(/X11/i);
}

function isAndroidDemoApp() {
  return navigator.userAgent.match(/AndroidDemoApp/i);
}

function isPC() {
  return (isWindows() || isX11());
}

var getCurrentTime = function () {
  var d = new Date();
  return d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
}

function checkJasonData(_function_, _result_, _json_) {
  var response;
  if (!(_result_ === "SUCCESS" || _result_ === "OK" || _result_ === "SUCCESS-F")) {
    console.log(PACKAGE, _function_, "checkJasonData. result : ", _result_);
    //showRequestErrorDialog();
    return null;
  }
  try {
    response = JSON.parse(_json_);
  } catch (e) {
    console.log(PACKAGE, _function_, "checkJasonData JSON Error. " + e);
    return null;
  }

  return response;
}

function checkUrl(url) {
  var pattern = /[<>;!"'=^?+]/i;
  if (pattern.test(url)) return false; //bad url
  else return true; //good url
}

function loadJavaScript(url, callback) {
  var script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  script.onload = callback;
  document.getElementsByTagName('head')[0].appendChild(script);
}

var toastTimeout = 0;
function showToast(message) {
  var toast = document.getElementById("toast");
  toast.innerHTML = message;

  var textWidth = toast.offsetWidth;
  if(textWidth > (screen.width*0.74)){
      toast.style.right = 'calc(8%)';
    toast.style.left = 'calc(8%)';
    toast.style.marginLeft = '0px';
  }else{
    toast.style.left = '50%';
    toast.style.marginLeft = '-'+(textWidth/2)+'px';
  }

  toast.className = "show";
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  toastTimeout = setTimeout(function(){
    toast.className = "hide";
  }, 3000);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/* number auto countig */
(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        var color = options.color;
        var fontWeight = options.fontWeight;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html("<font style='color:"+color+";font-weight:"+fontWeight+"'>" + value.toFixed(options.decimals) + "</font>");

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
        color: "#000000",
        fontWeight: "narmal"
    };
})(jQuery);

const sleep = m => new Promise(r => setTimeout(r, m))

function promiseWithTimeout(promise, timeout) {
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('TIMEOUT'));
      }, timeout);
    })
  ]);
};

function PromiseTransitionEnd(ele, { propertyName, triggerFunc, immediate }) {
  return new Promise(resolve => {
    if (immediate) {
      // disable animation
      ele.style.transition = 'none';
      // reflow
      (() => ele.offsetHeight)();

      triggerFunc(); // trigger function is necessary

      // reflow
      (() => ele.offsetHeight)();
      // enable animation
      ele.style.transition = '';

      resolve();
    } else {
      const handler = e => {
        if (e.target !== ele) {
          return;
        }

        if (propertyName && propertyName !== e.propertyName) {
          return;
        }

        e.stopPropagation();
        ele.removeEventListener('transitionend', handler);

        resolve(e);
      };

      ele.addEventListener('transitionend', handler);

      if (triggerFunc) {
        triggerFunc();
      }
    }
  });
};

function promiseAnimationEnd(ele, animationClass) {
  return new Promise(resolve => {
    const event = () => {
      ele.removeClass(animationClass);
      ele[0].removeEventListener('animationend', event);

      resolve();
    };

    // animation이 동작중에 본 함수가 다시 불리면, 동작중이던 animation class를 삭제한 후 다시 add 한다.
    ele.removeClass(animationClass);
    void ele.offset();  // remove 와 add 사이에 이러한 trigger reflow 동작이 없으면 remove / add가 처리되지 않는다.
    ele.addClass(animationClass);
    ele[0].addEventListener('animationend', event);
  });
}

function promiseSmoothHide(ele) {
  return new Promise(resolve => {
    promiseAnimationEnd(ele, 'hide')
    .then( () => {
      ele.hide();
      resolve();
    });
  });
}

class Bezier {
  static _t(t, depth) {
    const r = { t: { 1: t }, nt: { 1: 1 - t } };

    for (let i = 2; i <= depth; i++) {
      r.t[i] = r.t[i - 1] * t;
      r.nt[i] = r.nt[i - 1] * r.nt[1];
    }

    return r;
  }

  static _cubicBezier(t, p0, p1, p2, p3) {
    return p0 * t.nt[3] + 3 * p1 * t.t[1] * t.nt[2] + 3 * p2 * t.t[2] * t.nt[1] + p3 * t.t[3];
  }

  static _cubicBezier2(t, p1, p2) {
    return 3 * p1 * t.t[1] * t.nt[2] + 3 * p2 * t.t[2] * t.nt[1] + t.t[3];
  }

  static cubicBezier(t, x1, y1, x2, y2) {
    const _t = Bezier._t(t, 3);
    return {
      x: Bezier._cubicBezier2(_t, x1, x2),
      y: Bezier._cubicBezier2(_t, y1, y2)
    };
  }
}


const attributeExceptions = [];

function toCamelCase(str) {
  return str
    .replace(/-([a-z])/g, $1 => $1.toUpperCase())
    .replace(/\s([a-z])/g, $1 => $1.toUpperCase())
    .replace(/\s/g, '')
    .replace(/^(.)/, $1 => $1.toLowerCase());
}

function appendText(el, text) {
  const textNode = document.createTextNode(text);
  el.appendChild(textNode);
}

function appendArray(el, children) {
  children.forEach(child => {
    if (Array.isArray(child)) {
      appendArray(el, child);
    } else if (child instanceof window.Element) {
      el.appendChild(child);
    } else if (typeof child === 'string') {
      appendText(el, child);
    } else if (child instanceof jQuery) {
      Object.keys(child).forEach((val) => {
        if (val !== "length") { // ignore key : length
          el.appendChild(child[val]);
        }
      });
    }
  });
}

function setStyles(el, styles) {
  if (!styles) {
    el.removeAttribute('styles');
    return;
  }

  Object.keys(styles).forEach(styleName => {
    if (styleName in el.style) {
      el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
    } else {
      console.warn(styleName + " is not a valid style for a " + el.tagName.toLowerCase());
    }
  });
}

function makeElement(type, textOrPropsOrChild, ...otherChildren) {
  const el = document.createElement(type);

  if (Array.isArray(textOrPropsOrChild)) {
    appendArray(el, textOrPropsOrChild);
  } else if (textOrPropsOrChild instanceof window.Element) {
    el.appendChild(textOrPropsOrChild);
  } else if (typeof textOrPropsOrChild === 'string') {
    appendText(el, textOrPropsOrChild);
  } else if (typeof textOrPropsOrChild === 'object') {
    Object.keys(textOrPropsOrChild).forEach(propName => {
      if (propName in el || attributeExceptions.includes(propName)) {
        const value = textOrPropsOrChild[propName];
        if (propName === 'style') {
          setStyles(el, value);
        } else if (value) {
          el[propName] = value;
        }
      } else if (propName.startsWith('dataset')) {
        const value = textOrPropsOrChild[propName];

        el.dataset[toCamelCase(propName.replace(/^dataset/, ''))] = value;
      } else {
        console.warn(propName + " is not a valid property of a " + type);
      }
    });
  }

  if (otherChildren) {
    appendArray(el, otherChildren);
  }

  return el;
}

const Dom = {
  build: (fn, ...args) => fn(Dom, ...args),
  a: (...args) => makeElement('a', ...args),
  div: (...args) => makeElement('div', ...args),
  header: (...args) => makeElement('header', ...args),
  p: (...args) => makeElement('p', ...args),
  span: (...args) => makeElement('span', ...args),
  ul: (...args) => makeElement('ul', ...args),
  li: (...args) => makeElement('li', ...args),
  img: (...args) => makeElement('img', ...args),
  svg: (...args) => makeElement('svg', ...args),
  circle: (...args) => makeElement('circle', ...args)
};

function moveToscrollTopByAccordion(panel, scrollDivId) {
  var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
  $(panel).one(transitionEnd, function () {
    if (!parseInt(panel.style.maxHeight)) return;

    var itemPositionTop = $("#" + panel.parentElement.id).position().top;
    var itemHeight = $("#" + panel.parentElement.id).prop('clientHeight');// + panel.scrollHeight;  //(panel.style.maxHeight)
    var itemPositionBottom = itemPositionTop + itemHeight;
    var scrollDivHeight = $("#" + scrollDivId).prop('clientHeight');
    var scrollDivTop = $("#" + scrollDivId).scrollTop();

    if ((itemHeight >= scrollDivHeight) || (itemPositionTop < 0)) {
      // 아이템이 화면보다 크거나, 아이템의 최상단이 화면보다 위에 있는 경우, item의 최상단 위치로 scroll 한다.
      $("#" + scrollDivId).animate({ scrollTop: scrollDivTop + itemPositionTop }, 200);
    } else if (itemPositionBottom >= scrollDivHeight) {
      // 아이템의 최하단이 화면보다 아래에 있는 경우, 하단부의 끝이 screen 끝에 닿도록 scroll 한다.
      $("#" + scrollDivId).animate({ scrollTop: scrollDivTop + itemPositionTop - scrollDivHeight + itemHeight }, 200);
    }
  });
}

function moveToscrollTopByHSAccordion(panel,scrollDivId){
  //var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';

//  console.log(panel);
//  $(panel).one(transitionEnd, function(){
//    console.log(panel.parentElement);
//    console.log(parseInt(this.style.maxHeight), this.parentElement.id);

//    if(!parseInt(this.style.maxHeight)) return;
    var offsetTop = $("#"+panel.parentElement.id).offset().top;
//    console.log(offsetTop);
    if(offsetTop < 48) { /* todo : should change the static value 48 */
      $("#"+scrollDivId).scrollTo("#" + panel.parentElement.id);
    }
//  });
}


function isVisible(el) {
  if (el == undefined)
    return false;

  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  // var elemBottom = rect.bottom;

  // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  var isVisible = (elemTop+70 <= window.innerHeight);
  return isVisible;
}

function promiseSendRequestWithTimeout(payload, timeout = SEND_REQUEST_TIMEOUT, returnLeftTime = false) {
  return Promise.race([
    new Promise((resolve, reject) => {
      var startTimestamp = (new Date()).getTime();
      pluginService.sendRequest(payload, (_result_, _json_) => {
        var elapsedTime = (new Date()).getTime() - startTimestamp;
        resolve({ _result_, _json_, elapsedTime });
      });
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('TIMEOUT'));
      }, timeout);
    })
  ]).then(({_result_, _json_, elapsedTime}) => {
    var response;
    if (!(_result_ === "SUCCESS" || _result_ === "OK" || _result_ === "SUCCESS-F")) {
      throw new Error('REJULT_FAIL');
    }
    try {
      response = JSON.parse(_json_);
    } catch (e) {
      throw new Error('PARSE_ERROR');
    }

    // returnLeftTime 파라메터가 true인 경우, leftTime 정보를 함께 return 한다.
    if (returnLeftTime) {
      let leftTime = timeout - elapsedTime;
      response = {response, leftTime};
    }
    return response;
  });
}

function sendRequestExceptionHandler(e, card_div_id, cardloaded) {
	console.warn(e);	// e.message : "TIMEOUT" or "REJULT_FAIL" or "PARSE_ERROR"
	if ((card_div_id !== undefined) && (!cardloaded)) {
		// show reload icon on card
		promiseSmoothHide($('#' + card_div_id).find('.servicecards_unloaded_content'))
		.then( () => {
			$('#' + card_div_id).find('.servicecards_reload').show();
		});
	} else {
		showRequestErrorDialog();
	}
}

function getClickedIdNumber(str) {
  var val = str;
  var temp = "";
  var num = "";

  for (var i = 0; i < val.length; i++) {
    temp = val.charAt(i);
    if (temp >= "0" && temp <= "9") num += temp;
  }
  return num;
}

// ### for Language Start ###
const DEFAULT_LOCALE_CODE = 'en_US';
var SupportLangCodes = ['ko_KR', "en_US"];

//find language code.
//"get locale code function." -> navigator.language
// window format en_US
// android format en-US
// iPhone format en
// navigator.language en_US

function getPreferredLocaleCode(localeCode, candidates = SupportLangCodes, defaultLocale = DEFAULT_LOCALE_CODE) {
    localeCode = localeCode.replace('-', '_'); // prevent

    function search(localeCode, candidates) {
      // 1. full code matching
      var code = localeCode;

      if (candidates.includes(code)) {
        return code;
      }

      // 2. language code matching
      code = localeCode.slice(0, 2).toLowerCase(); //get language code
      if (candidates.includes(code)) {
        return code;
      }

      // 3. matching with language code only. (ignore region code)
      for (var candidate of candidates) {
        var tokens = candidate.split('_'); // pass if it doesn't have region code

        if (tokens.length < 2) {
          continue;
        }

        if (tokens[0].toLowerCase() === code) {
          return candidate;
        }
      }

      throw new Error('No available language resource');
    }

    try {
      return search(localeCode, candidates);
    } catch (e) {
      // not found....
      // search for default language
      return search(defaultLocale, candidates);
    }
}
// ### for Language End ###