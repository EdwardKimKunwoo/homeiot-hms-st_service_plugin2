/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Admin service shows the previous and current management expenses.
 * @module service/cctv/main
 * @author Home IoT R&D Team
 */

/** initiate page */
async function initCCTVCard(index, cardInfo) {
    var cctvCard;
    await new Promise(resolve => {
        var sortable = document.getElementById('sortableDiv_' + index);

        cctvCard = appendNewPage(sortable, 'cctvCard');
        cctvCard.classList.add('servicecards', 'motion_card');

        var cctvCardLoaded = appendNewPage(cctvCard, 'cctvCardLoaded');
        var cctvCardLoading = appendNewPage(cctvCard, 'cctvCardLoading');
        showCctvCardLoadingScreen(false);

        var titleSpace = appendNewPage(cctvCardLoaded, 'cctv_card_title', 'servicecards_title_space');
        titleSpace.style.marginBottom = '0px';

        var title = appendNewPage(titleSpace)
        title.innerHTML = drawServiceCardEditerImage($.lang[lang].CCTV_SERVICE, "cctvCardTitle");

        appendNewPage(titleSpace, '', 'clear');

        appendNewPage(cctvCardLoaded, 'cctv_swiper', 'swiper-container');

        cardInfo.bEnabledCard = true;
        cardInfo.initCardOrder = index;
        cardInfo.nCardOrder = index;
        cardInfo.title = $.lang[lang].CCTV_SERVICE;

        resolve();
    });
}

function showCctvCardLoadingScreen(bEnable){
	var enableText = ["none",""];
	var disableText = ["","none"];

	var tmpText = ( bEnable === true ) ? enableText : disableText;

	document.getElementById("cctvCardLoaded").style.display = tmpText[0];
	document.getElementById("cctvCardLoading").style.display = tmpText[1];

	return bEnable;
}

var swiperCCTVCard;

/** draw card */
function drawCCTVCard() {
    let cctvCardElement = document.getElementById('cctvCard');
    if (!cctvCardElement) return;
    let clone = cctvCardElement.cloneNode(true);
    cctvCardElement.parentNode.replaceChild(clone, cctvCardElement);
    if (clone) {
        clone.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.composedPath()[1].id !== 'cctv_pagination') {
                cctvCardOnClick();
            }
        });
    }

    let detail = document.getElementById('cctvCardTitle');
    let titleText;

    if(!detail) { return; }

    showCctvCardLoadingScreen(false);

    detail.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        let config = {
            type: 'rippleC',
            cb: () => { cctvCardOnClick(); }
        };
        rippleManager.set(e, config);
    }, {capture: false, passive: true});
    detail.onclick = (e) => { e.stopPropagation(); };

    if (cctvObject.card_status === 'unloaded') {
        drawReloadCard('cctv_swiper', 'others', retryLoadCCTVCard);
    }
    else if (cctvObject.card_status === 'loading') {
        showCctvCardLoadingScreen(true);
        drawLoadingCard('cctvCardLoading', 'cctv');
    }
    else if (cctvObject.list.length === 0) {
        titleText = $.lang[lang].CCTV_TITLE.replace("%d", (cctvObject.list.length).fmodify("var(--brand-color)", 600));
        document.getElementById('cctvCardTitle').innerHTML = titleText;
        drawNoItemCard('cctv_swiper', 'service/cctv/res/img/home_ic_status_cctv.png', $.lang[lang].CCTV_NO_ITEM);
    }
    else {
        titleText = $.lang[lang].CCTV_TITLE.replace("%d", (cctvObject.list.length).fmodify("var(--brand-color)", 600));
        document.getElementById('cctvCardTitle').innerHTML = titleText;

        var swiper = document.getElementById('cctv_swiper');
        if (swiper) swiper.remove();
        swiper = appendNewPage('cctvCardLoaded', 'cctv_swiper', 'swiper-container');
        swiper.style.padding = '0px';

        appendNewPage(swiper, 'cctv_wrapper', 'swiper-wrapper');
        appendNewPage(swiper, '', 'clear');
        var pagination = appendNewPage(swiper, 'cctv_pagination', 'swiper-pagination');
        pagination.style.position = 'initial';

        for (var i in cctvObject.list) {
            var item = appendNewPage('cctv_wrapper', 'cctv_item_' + i, 'swiper-slide');

            var videoWrapper = appendNewPage(item, '', 'cctv_bg');

            var video = appendNewPage(videoWrapper, 'cctv_video_' + i, 'cctv_video', 'video');
            video.classList.add('has-media-controls-hidden');
            video.src = cctvObject.list[i].streamUrl;
            video.poster = cctvObject.list[i].posterUrl;
            video.load();

            var location = appendNewPage(item, 'cctv_location' + i, 'cctv_location');
            location.innerText = cctvObject.list[i].location;

            initPlayPauseButton(videoWrapper, i);

            setVideoEventListener(videoWrapper, i);
        }
    }

    promiseAnimationEnd($('#cctv_swiper'), 'show_card');

    if (cctvObject.list.length >= 2) {
        if (swiperCCTVCard) swiperCCTVCard.destroy();
        swiperCCTVCard = new Swiper('#cctv_swiper', {
            spaceBetween: 30,
            centeredSlides: true,
            pagination: {
                el: '#cctv_pagination',
                clickable: true,
            },
        });
    }

}

/** draw page */
function drawCCTVPage() {
    var e0 = document.getElementById('cctvPage');
    while (e0.hasChildNodes()) { e0.removeChild(e0.firstChild); }

    if (cctvObject.list.length === 0) {
        var e1 = appendNewPage(e0, '', 'parking_page_noitem');
        var e2 = appendNewPage(e1, '', 'parking_page_noitem_circle');
        var e3 = appendNewPage(e2, '', '', 'img');
        var e4 = appendNewPage(e1, '', 'parking_page_noitem_text');
        e3.src = 'service/cctv/res/img/home_ic_status_cctv.png';
        e4.innerText = $.lang[lang].CCTV_NO_ITEM;
        return;
    }

    appendNewPage(e0, '', 'cctv_head_detailed');
    for (var i in cctvObject.list) {
        var card = appendNewPage(e0, 'cctvDetailedCard_' + i, 'servicecards');
        card.style.paddingBottom = '0px';

        var location = appendNewPage(card, '', 'cctv_location_detailed');
        location.innerText = cctvObject.list[i].location;

        var wrap = appendNewPage(card, '', 'cctv_bg');
        wrap.style.position = 'relative';

        var video = appendNewPage(wrap, 'cctv_video_detailed_' + i, 'cctv_video', 'video');
        video.classList.add('has-media-controls-hidden');
        video.src = cctvObject.list[i].streamUrl;
        video.poster = cctvObject.list[i].posterUrl;

        var tail = appendNewPage(card, '', 'cctv_tail_detailed');
        //var tailImg = appendNewPage(tail, '', '', 'img');
        //tailImg.src = 'service/cctv/res/img/cctv_ic_save.png'

        initPlayPauseButton(wrap, i, 'detailed');

        setVideoEventListener(wrap, i, 'detailed');
    }
}

function requestCCTVInfo() {
    if (cctvObject.card_status !== "loaded") cctvObject.card_status = "loading";

    var requestBody = rsapi_getCctvInfo();
    promiseSendRequestWithTimeout(requestBody, SEND_REQUEST_TIMEOUT, true)
        .then((response) => requestCCTVInfoCallback(response))
    // .catch((e) => sendRequestExceptionHandlerForGetNotiTitle());
}

async function requestCCTVInfoCallback({ response, leftTime }) {
    if (cctvObject.card_status !== 'loaded') {
        cctvObject.card_status = 'loaded';
        if (response.result.status !== RESPONSE_OK || response.data.list.length === 0) {
            drawCCTVCard();
            clearTimeout(firstLoadingTimer);
        }
        else {
            await new Promise(resolve => {
                for (var i in response.data.list) {
                    var obj = {};
                    obj.location = response.data.list[i].location;
                    obj.streamUrl = response.data.list[i].stream_url;
                    obj.posterUrl = response.data.list[i].poster_url;
                    cctvObject.list.push(obj);
                }
                drawCCTVCard();
            });
        }
    }
}

function retryLoadCCTVCard() {
    requestCCTVInfo();
    drawCCTVCard();
}

function loadCCTVPage(service) {
    drawActionBar(false);
    drawCCTVPage();
}

function initPlayPauseButton(parent, index, type) {
    var id;
    (type) ? id = 'poly_detailed_' + index : id = 'poly_' + index;

    var html =
        '<svg class="video-overlay-play-button" width="62px" height="62px" viewBox="0 0 200 200" alt="Play video">' +
        '<circle cx="100" cy="100" r="90" fill="#EDEEEE" opacity="0.5"/>' +
        '<polygon id="' + id + '" fill="#fff"/>' +
        '<polygon fill="#fff"/>' +
        '</svg>';
    parent.insertAdjacentHTML('beforeend', html);

    setPlayPauseButton(id, 'play');
}

function setPlayPauseButton(id, status) {
    var pl = document.getElementById(id);
    var pr = pl.nextElementSibling;

    if (status === 'pause') {
        pl.setAttribute('points', '75,55 75,145 95,145 95,55');
        pr.setAttribute('points', '105,55 105,145 125,145 125,55');
    }
    else if (status === 'play') {
        pl.setAttribute('points', '70,55 70,145 145,100');
        pr.setAttribute('points', '70,55 70,145 145,100');
    }
}

function setVideoEventListener(target, index, type) {
    $(target).off('click');
    $(target).on('click', {index: index, type: type}, (e) => {
        e.stopPropagation();
        var id = 'cctv_video_';
        var button = 'poly_';
        if (e.data.type) {
            id += 'detailed_';
            button += 'detailed_';
        }
        button += e.data.index;

        var src = document.getElementById(id + e.data.index);

        // backup
        // if (src.paused) {
        //     src.play();
        //     src.nextElementSibling.style.opacity = '0';
        //     setPlayPauseButton(button, 'pause');
        // }
        // else {
        //     src.pause();
        //     src.nextElementSibling.style.opacity = '1';
        //     setTimeout(() => {
        //         setPlayPauseButton(button, 'play');
        //     }, 1000);
        //     setTimeout(() => {
        //         src.dispatchEvent(new Event('ended'));
        //     }, 60000);
        // }

        // 20200907 CCTV Play/Stop Event Change.
        if(src.src === "https://svc-dev.samsung-ihp.com/resources/img/cctv.png"){
            src.src = cctvObject.list[e.data.index].streamUrl;
            src.nextElementSibling.style.opacity = '0';
            setPlayPauseButton(button, 'pause');            
        }else{
            src.src = "https://shome-api.samsung-ihp.com/resources/img/cctv.png";
            src.nextElementSibling.style.opacity = '1';
            setTimeout(() => {
                setPlayPauseButton(button, 'play');
            }, 1000);
            setTimeout(() => {
                src.dispatchEvent(new Event('ended'));
            }, 60000);
        }

        // src.onended = () => {
        //     src.load();
        //     src.nextElementSibling.style.opacity = '1';
        //     setPlayPauseButton(button, 'play');
        // }

        if (target.parentElement.classList.contains('swiper-slide')) {
          if(swiperCCTVCard)
            swiperCCTVCard.on('slideChangeTransitionEnd', (e) => {
                if (!src.paused) src.dispatchEvent(new Event('ended'));
            });
        }
    });
}
