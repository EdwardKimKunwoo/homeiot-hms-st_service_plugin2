/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

/**
 * @fileOverview Community Notification & Announcement Board Service
 * @module service/notification/main
 * @author Home IoT R&D Team
 */

function loadedNotificationPage(service) {
	drawActionBar(false);

	initNotificationPage();
	drawNotificationPage();

	if (notiObject.list.length > 0) {
		var divId = "noti_item_"+notiObject.card_index
		openNotiContent(divId,notiObject.card_index);
	}
	notiObject.card_index = 0;

	if (isFHub()) {
		scplugin.manager.setFlag("openAdditionalPage");
	}

	return 0;
}

function createNotificationOptionMenu(service) {
	var notificationMenuArr = {
		menuItem: []
	};

	console.debug(PACKAGE, "mainScreen", "createOptionMenu");
	setActionBarMenu("visible");

	//addPageMenu("add", notificationMenuArr.menuItem, $.lang[lang].ADDHOMECARD, service.cardInfo.list[0]);
	//addPageMenu("remove", notificationMenuArr.menuItem, $.lang[lang].REMOVEHOMECARD, service.cardInfo.list[0]);

	setMenu(notificationMenuArr.menuItem, service);

	return notificationMenuArr;
}


/************************* draw ***************************/
function initNotificationMainBanner() {
	var bannerId = "mainBanner_noti";
	var bannerUri = "notificationCardOnClick()";

	document.getElementById('mainBannerWrapper').innerHTML +=
	"<div id='" + bannerId + "' class='swiper-slide mainBannerSwiper' onclick='" + bannerUri + "'></div>";
}

function setNotificationPageForSmartTV() {
	if (isSmartTV()) {
		naviBoard.setNavigation("notificationPage", "accordion_title");
		$('.accordion_title').on('focusin focusout', function (e) {
			$(this).css('color', (e.type === 'focusin') ? '#ffffff' : '');
			$(this).css('color', (e.type === 'focusout') ? '#252525' : '');
		});
	}
}

function initNotificationCard(index, cardInfo) {
	var initHtml = "<div id='notificationCard' class='servicecards motion_card'></div>"
	document.getElementById('sortableDiv_' + index).innerHTML = initHtml;

	initHtml =
		"<div class='servicecards_title_space'>" +
		"	<div id='notificatonTitle' ></div>" +
		"	<div class='clear'></div>" +
		"</div>" +
		"<div id='notification_swiper' class='swiper-container' style='margin-top: 4px;'>" +
		"</div>";
	document.getElementById('notificationCard').innerHTML = initHtml;

	if (document.getElementById('notificatonTitle') === null) return false;
	document.getElementById('notificatonTitle').innerHTML = drawServiceCardEditerImage($.lang[lang].NOTIFICATION_TAB, 'notificationTitleDetail');

	cardInfo.bEnabledCard = true;
	cardInfo.initCardOrder = index;
	cardInfo.nCardOrder = index;
	cardInfo.title = $.lang[lang].NOTIFICATION_TAB;

	return true;
}

function initNotificationPage() {

	if (notiObject.list.length === 0) {
		// 공지사항이 없을 경우 no_item page를 보여준다.
		var innerHTML =
			"<div class='notificationPage_noitem'>" +
			"	<div class='notificationPage_noitem_circle'>" +
			"		<img src='service/notification/res/img/home_ic_status_noti.png' alt=''/>" +
			"	</div>" +
			"	<div class='notificationPage_noitem_text'>" + $.lang[lang].NOTIFICATION_NO_ITEM + "</div>" +
			"</div>";
			// TBD - default noti page
			// "<div class='notificationPage_noitem'>" +
			// "	<div><img src='img/informaiton_logo_reamian_eng.png'></div>" +	// TODO : no_item image 없음
			// "	<div class='notificationPage_noitem_text'>" + $.lang[lang].NOTIFICATION_CONGRATULATION + "</div>" +
			// "	<div class='notificationPage_noitem_sub_text'>" + $.lang[lang].NOTIFICATION_CONGRATULATION_SUB + "</div>" +
			// "</div>";
		document.getElementById("notificationPage").innerHTML = innerHTML;
	} else {
		// 공지사항이 있을 경우 페이지 로딩 image를 default로 생성한다.
		var innerHTML =
			"<div id='notificationItemList'></div>" +
			"<div class='content_loading_container'>" +
			"<div id='notiNextPageLoading' class='content_loading'>" +
			"	<img src='res/img/circle.png' alt=''/>" +
			"</div>" +
			"</div>";
		document.getElementById("notificationPage").innerHTML = innerHTML;

		$('#notiNextPageLoading').off('inview');
		$('#notiNextPageLoading').on('inview', function (event, visible, visiblePartX, visiblePartY) {
			if (visible) {
				// page 최 하단의 loading image가 보이면 다음 페이지를 load 한다.
				//loadNotificationNextPage();
				if (!notiObject.next_page) {
					document.getElementById("notiNextPageLoading").style.display = "none";
					return;
				}

				// 동일 요청을 여러번 하지 않도록 처리
				if (!notiObject.next_page_loading) {
					notiObject.next_page_loading = true;
					updateNotiTitle(notiObject.request_index);
				}
			}
		});

		for (var index = 0; index < notiObject.list.length; index++) {
			addNotificationItemDiv(index);
		}
	}
}

function addNotificationItemDiv(index) {
	// notificationItemGroup 생성
	var innerHTML = "";
	var borderTop = "";
	var itemGroupIndex = (index === 0) ? 0 : 1;
	//var reg_date = notiObject.list[index].reg_date;
	//var itemGroupTexts = document.getElementsByClassName('notificationItemGroupText');


	// 첫번째 항목의 경우 "최근공지" group을 생성하고, 두번째 항목의 경우 "공지목록" group을 생성한다.
	if ((index === 0) || (index === 1)) {
		borderTop = "style='border-top: 0px' ";
		var itemGroupText = (index === 0) ? $.lang[lang].NOTIFICATION_RECENT : $.lang[lang].NOTIFICATION_LIST;
		innerHTML =
			"<div class='notificationItemGroupHeader'>" +
			"	<div class='notificationItemGroupText'>" + itemGroupText + "</div>" +
			"   <div class='notificationItemGroupDivider'></div>" +
			"</div>" +
			"<div class='clear'></div>" +
			"<div>" +
			"	<div class='notificationItemGroup'></div>" +
			"</div>";
		document.getElementById("notificationItemList").innerHTML += innerHTML;
	}

	// // 현재 notificationItemGroup 중에 text가 같은 것이 있는지 확인
	// // 현재 notificationItemGroupText 중에 reg_date이 같은 항목의 itemGroupIndex를 얻어온다.
	// for (let i = 0 ; i < itemGroupTexts.length ; i++) {
	// 	if (itemGroupTexts[i].id.isSameDay(reg_date)) {
	// 		itemGroupIndex = i;
	// 	}
	// }

	// // 만약 같은 항목이 없으면 새로 항목을 생성한다.
	// if (itemGroupIndex === -1) {
	// 	itemGroupIndex = itemGroupTexts.length;
	// 	borderTop = "style='border-top: 0px' ";
	// 	innerHTML =
	// 		"<div class='notificationItemGroupHeader'>" +
	// 		"	<div id='" + reg_date + "' class='notificationItemGroupText'>" + reg_date.toDateString(true) + "</div>" +
	// 		"   <div class='notificationItemGroupDivider'></div>" +
	// 		"</div>" +
	// 		"<div class='clear'></div>" +
	// 		"<div>" +
	// 		"	<div class='notificationItemGroup'></div>" +
	// 		"</div>";
	// 	document.getElementById("notificationItemList").innerHTML += innerHTML;
	// }

	// notificationItemGroup 내에 notificationPageItem 추가
	innerHTML = "<div class='notificationPageItemDivider' " + borderTop + "></div>";
	const txtMaxWidth = $(".notificationItemGroup").width() - 32 - 24 - 8;	// 32 : padding 16 * 2, 24 : expandIcon width, 8 : gap between title and icon
	innerHTML +=
		"<div id='notiPageItem_" + index + "' status='close' class='notificationPageItem'>" +
		"	<div id='noti_item_" + index + "' noti_item_index='"+index+"' class='accordion'>" +
		"		<span style='float:left; width:" + txtMaxWidth + "px;'>" +
		"			<div class='accordion_title'></div>" +
		"			<div class='accordion_subtitle'></div>" +
		"		</span>" +
		"		<span style='float:right'>" +
		"			<img class='expandIcon' src='res/img/home_button_expand_open_dark.png' alt='" + $.lang[lang].V_EXPAND_OPEN_BTN + "'/>" +
		"		</span>" +
		"		<div class='clear'></div>" +
		"	</div>" +
		"	<div class='notification_panel'>" +
		"		<div class='panel_img'></div>" +
		"		<div class='panel_text'></div>" +
		"	</div>" +
		"</div>";
	// 위에서 생성된 notificationItemGroup 항목에 추가
	document.getElementsByClassName("notificationItemGroup")[itemGroupIndex].innerHTML += innerHTML;

	let itemsList = document.getElementsByClassName('accordion');
	for (var i = 0; i < itemsList.length; i++) {
		itemsList[i].removeEventListener('touchstart', notificationPageItemOnClick, {passive: true});
		itemsList[i].addEventListener('touchstart', notificationPageItemOnClick, {passive: true});
	}
}

var notiPageTxtWidth;
function relocateNotiPage() {
	const txtMaxWidth = $(".notificationItemGroup").width() - 32 - 24 - 8;	// 32 : padding 16 * 
	if (notiPageTxtWidth === txtMaxWidth) return;

	for (var index = 0; index < notiObject.list.length; index++) {
		$("#noti_item_" + index + " span").first().width(txtMaxWidth);
	}
	notiPageTxtWidth = txtMaxWidth;
}

function notificationPageItemOnClick(e) {
	let clickedObj = e.currentTarget;
	let config = { cb: () => { openNotiContent(clickedObj.id); } };
	rippleManager.set(e, config);
}

function setNotificationItemStatus(index, status, forcedDivNum) {
	var notiPageItem = document.getElementById("notiPageItem_" + index);
	var accordion = notiPageItem.getElementsByClassName('accordion')[0];
	var expandIcon = notiPageItem.getElementsByClassName('expandIcon')[0];
	var panel = notiPageItem.getElementsByClassName('notification_panel')[0];

	notiPageItem.setAttribute('status', status);

	switch (status) {
		case 'loading':
			accordion.classList.add("active");
			expandIcon.classList.add("loading");
			expandIcon.src = "res/img/circle.png";
			expandIcon.alt = '';
			panel.style.maxHeight = null;
			break;
		case 'open':
			accordion.style.borderBottomLeftRadius = '';
			accordion.style.borderBottomRightRadius = '';
			accordion.classList.add("active");
			expandIcon.classList.remove("loading");
			expandIcon.src = "res/img/home_button_expand_open_dark.png";
			expandIcon.style.transform = 'rotate(180deg)';
			expandIcon.alt = $.lang[lang].V_EXPAND_CLOSE_BTN;
			if(forcedDivNum !== undefined){
				var tmpNotifunc = function(event) {
					panel.style.maxHeight = panel.scrollHeight + "px";
				}
				panel.style.maxHeight = "100%";
				setTimeout(tmpNotifunc,500);
			}	else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
			panel.style.opacity = 1;
			moveToscrollTopByAccordion(panel,"notificationPage");
			break;
		case 'close':
		default:
			if (index === 0 || index === notiObject.list.length - 1) {
				accordion.style.borderBottomLeftRadius = '16px';
				accordion.style.borderBottomRightRadius = '16px';
			}
			accordion.classList.remove("active");
			expandIcon.classList.remove("loading");
			expandIcon.src = "res/img/home_button_expand_open_dark.png";
			expandIcon.style.transform = 'rotate(0deg)';
			expandIcon.alt = $.lang[lang].V_EXPAND_OPEN_BTN;
			panel.style.maxHeight = null;
			panel.style.opacity = 0;
			break;
	}
}

function openNotiContent(divId,forcedDivNum) {

	var index = document.getElementById(divId).getAttribute('noti_item_index');
	var notiPageItem = document.getElementById("notiPageItem_" + index);
	var status = notiPageItem.getAttribute('status');

	// 자신을 제외한 모든 item들을 deactive 및 hide 시킨다.
	for (let i = 0; i < notiObject.list.length; i++) {
		if ((index !== i) && (document.getElementById("notiPageItem_" + i).getAttribute('status') !== 'close')) {
			setNotificationItemStatus(i, 'close');
		}
	}
	// TODO : 해당 item이 화면에 보여지지 않는 상황이면, 화면에 보이도록 scroll 한다.
	if (status === 'close') {
		if (notiObject.list[index].body === undefined) {
			// noti item의 body를 아직 받지 않은 경우 loading 이미지를 보여주고, body를 가져온다.
			setNotificationItemStatus(index, 'loading');
			// 해당 item에 대한 content를 읽어온다.
			var reg_num = notiPageItem.getAttribute('reg_num');
			updateNotiContent(reg_num);
		} else {
			setNotificationItemStatus(index, 'open',forcedDivNum);
		}
		var panel = document.getElementById(divId).parentElement.children[1];
	} else {
		// deactive 상태가 됨
		setNotificationItemStatus(index, 'close');
	}
}

function drawNotificationPage() {
	for (var index = 0; index < notiObject.list.length; index++) {
		drawNotificationPageItem(index);
	}
}

function drawNotificationPageItem(index) {
	var notiPageItem = document.getElementById("notiPageItem_" + index);
	var title = notiPageItem.getElementsByClassName('accordion_title')[0];
	var subtitle = notiPageItem.getElementsByClassName('accordion_subtitle')[0];
	var penel_text = notiPageItem.getElementsByClassName('panel_text')[0];
	var penel_img = notiPageItem.getElementsByClassName('panel_img')[0];

	notiPageItem.setAttribute('reg_num', notiObject.list[index].reg_num);
	title.innerHTML = notiObject.list[index].title;
	subtitle.innerHTML = (notiObject.list[index].reg_date).toDateString(true);
	penel_text.innerHTML = notiObject.list[index].body;

	if (notiObject.list[index].img_url) {
		// TODO : 현재 image size가 영역을 벗어나는 경우 발생. 또한, image load 되기 전에 화면에 보여짐에 따라 height 설정이 잘못되는 이슈 있음
		var img_elm = document.createElement("img");
		img_elm.setAttribute("src", notiObject.list[index].img_url);
		penel_img.appendChild(img_elm);
	}

	//navis	setNotificationPageForSmartTV();

	var item = document.getElementById('noti_item_' + index);
	if (index === 0 || index === 1) {
		item.style.borderTopLeftRadius = '16px';
		item.style.borderTopRightRadius = '16px';
	}
	else if (index === notiObject.list.length - 1) {
		item.style.borderBottomLeftRadius = '16px';
		item.style.borderBottomRightRadius = '16px';
	}
}

var swiperNotificationCard;
function drawNotificationCard() {
	if(document.getElementById('notification_swiper') === null) {
		return false;
	}

	if (this.enabledMainBanner === true) {
		document.getElementById('mainBanner_noti').innerHTML = mainBannerTextForSwipe($.lang[lang].NOTIFICATION_TAB, lang);
	}

	var innerHTML = "";
	if (notiObject.card_status === "unloaded") {
		// reload card 표시
		drawReloadCard("notification_swiper", "noti", retryLoadNotificationCard);
	} else if (notiObject.card_status === "loading") {
		// loading card 표시
		drawLoadingCard("notification_swiper", "noti");
	} else if (notiObject.list.length === 0) {
		// 공지사항 없을때의 화면 표시
		drawNoItemCard("notification_swiper", "service/notification/res/img/home_ic_status_noti.png", $.lang[lang].NOTIFICATION_NO_ITEM);
	} else {
		let maxItemHeight = 0;
		// 최대 3개까지의 공지사항 항목 추가
		document.getElementById('notification_swiper').innerHTML =
			"<div id='notification_swiper_wrapper' class='swiper-wrapper'></div>" +	// 66 : noti card 제목 + 상세내용 높이 : 128(전체높이) - 12(상단margin) - 14("공지사항" 높이) - 24(space) - 12(하단margin) = 66
			"<div class='clear'></div>" +
			"<div id='notification_pagination' class='swiper-pagination' style='position:static;margin-top:6px;'></div>";

		let cardNum = (notiObject.list.length < 3) ? notiObject.list.length : 3;
		for (let i = 0; i < cardNum; i++) {
			innerHTML = "";
			let notiSubData = "";
			notiSubData = notiObject.list[i].reg_date.toDateString(true);
			innerHTML += "<div id='notificationCardItem" + i + "' class='swiper-slide notificationCardItem'>";
			innerHTML += "	<div>";
			innerHTML += "		<span id='notification_topic_text_" + i + "' class='notification_topic_text'>" + notiObject.list[i].title + "</span>";
			if (notiObject.list[i].img_url) {
				// TODO : image icon 없음. 또한, 위치 정보 없음.
				//innerHTML += "<img class='img' src='service/notification/res/img/ic_notice_none.png' style='width:20px;height:20px;'/>";
			}
			innerHTML += "		<span id='notification_topic_sub_text_" + i + "' class='notification_topic_sub_text'>" + notiSubData + "</span>";
			innerHTML += "		<div class='clear'></div>";
			innerHTML += "	</div>";
			innerHTML += "	<div class='notification_content_text'>" + notiObject.list[i].body + "</div>";
			innerHTML += "</div>";

			document.getElementById('notification_swiper_wrapper').innerHTML += innerHTML;

			let topicTextWidth = $(".notificationCardItem").width() - $("#notification_topic_sub_text_" + i).width() - 10;
			$("#notification_topic_text_" + i).css("width", topicTextWidth + "px");

			// $(window).resize(() => {
			// 	this.setTimeout(() => {
			// 		let topicTextWidth = $(".notificationCardItem").width() - $("#notification_topic_sub_text_" + i).width() - 10;
			// 		$("#notification_topic_text_" + i).css("width", topicTextWidth + "px");
			// 	}, 300);
			// });
			// $(window).resizeend(() => {
			// 	console.log(' ####### [resizeend]')
			// 	let topicTextWidth = $(".notificationCardItem").width() - $("#notification_topic_sub_text_" + i).width() - 10;
			// 	$("#notification_topic_text_" + i).css("width", topicTextWidth + "px");
			// });

			let itemHeight = $("#notificationCardItem" + i).height();
			if (maxItemHeight < itemHeight) {
				maxItemHeight = itemHeight;
			}
		}
		$(".notificationCardItem").height(maxItemHeight);

		let itemsList = document.getElementsByClassName('notificationCardItem');
		for (var i = 0; i < itemsList.length; i++) {
			itemsList[i].removeEventListener('touchstart', notificationCardItemOnClick, {passive: true});
			itemsList[i].addEventListener('touchstart', notificationCardItemOnClick, {passive: true});
		}
	}

	// Notification card 표시 animation 적용
	promiseAnimationEnd($('#notification_swiper'), 'show_card');

	let card = document.getElementById('notificationCard');
	var clone = card.cloneNode(true);
	card.parentNode.replaceChild(clone, card);
	clone.addEventListener('touchstart', (e) => {
		let targetId = e.composedPath()[1].id;
		let config = {};
		config.swiper = swiperNotificationCard;
		config.cb = () => {
			$(clone).unbind('touchstart');
			if(swiperNotificationCard)
				notiObject.card_index = swiperNotificationCard.activeIndex;
			notificationCardOnClick();
		};
		if (notiObject.card_status !== "unloaded" &&
			notiObject.card_status !== "loading" &&
			notiObject.list.length !== 0) {
				if (targetId !== 'notification_pagination') {
					rippleManager.set(e, config);
				}
		}
	}, {passive: true});

	clone.addEventListener('click', (e) => {
		if (notiObject.card_status === "unloaded" ||
			notiObject.card_status === "loading" ||
			notiObject.list.length === 0) {
			notificationCardOnClick();
			return;
		}
	});

	let detail = document.getElementById('notificationTitleDetail');
	detail.addEventListener('touchstart', (e) => {
		e.stopPropagation();
		let config = {
			type: 'rippleC',
			cb: () => {
				notiObject.card_index = 0;
				notificationCardOnClick();
			}
		};
		rippleManager.set(e, config);
	}, {capture: false, passive: true});

	// 항목 갯수가 2개 이상일때만 swiper 적용
	if (notiObject.list.length >= 2) {
		if (swiperNotificationCard) swiperNotificationCard.destroy();
		swiperNotificationCard = new Swiper('#notification_swiper', {
			spaceBetween: 30,
			centeredSlides: true,
			pagination: {
				el: '#notification_pagination',
				clickable: true,
			},
		});

		resizeHandler.subscribe('resize', () => {
			$('.swiper-slide').css('width', '$(window).width()');
			setTimeout(() => swiperNotificationCard.update(), RESIZE_DELAY);
		});
		resizeHandler.subscribe("resizeend", () => {
			swiperNotificationCard.update();
		});
	}

	return true;
}

function notificationCardItemOnClick(e) {
	notiObject.card_index = 0;
	var notificationCardItems = document.getElementsByClassName('notificationCardItem');
	for(let i = 0 ; i < notificationCardItems.length ; i++) {
		if (notificationCardItems[i] === e.currentTarget) {
			notiObject.card_index = i;
			break;
		}
	}
}

/********** Notification Data***********/

function retryLoadNotificationCard() {
	updateNotiTitle(1);
	drawNotificationCard();
}

function updateNotiTitle(pageNum) {
	const item_per_page = 30;
	var requestBody = rsapi_getNotiTitle(pageNum, item_per_page);

	if (notiObject.card_status !== "loaded") {
		notiObject.card_status = "loading";
	}

// 	pluginService.sendRequest(requestBody, getNotiTitleCallback);
	promiseSendRequestWithTimeout(requestBody, SEND_REQUEST_TIMEOUT, true)
	.then((response) => getNotiTitleCallback(response))
	.catch((e) => sendRequestExceptionHandlerForGetNotiTitle());
}

function getNotiTitleCallback({response, leftTime}) {
	parseNotiTitleData(response);
	if (notiObject.card_status !== "loaded") {
		if (notiObject.list.length === 0) {
			// 공지사항이 없으면 바로 공지사항이 없다고 보여준다.
			notiObject.card_status = "loaded";
			drawNotificationCard();	// 원래는 drawCard()가 호출될 때 불려야 하지만, 현재 main쪽에서 안불러주므로......
			clearTimeout(firstLoadingTimer);
		} else {
			// 공지사항이 있으면 최근 3개에 대한 공지사항을 load 한다.
			let cardNum = (notiObject.list.length < 3) ? notiObject.list.length : 3;
			for (let i = 0; i < cardNum; i++) {
				// load 해야 할 카드의 id를 card_list에 추가하고, load를 수행한다.
				notiObject.card_list.push(notiObject.list[i].reg_num);
				setTimeout(updateNotiContent(notiObject.list[i].reg_num, leftTime), 0);
			}
		}
	}
	notiObject.next_page_loading = false;
	if (!notiObject.next_page && document.getElementById("notiNextPageLoading")) {
		document.getElementById("notiNextPageLoading").style.display = "none";
	}
}

function parseNotiTitleData(response) {
  // Error Exception
	if(response.result.status !== RESPONSE_OK){
		 if(response.result.status === RESPONSE_NO_DATA){ // no data
			 return;
		 }else{
		   throw new Error(response.result.message);
	   }
	}


		var count = parseInt(response.data.count);
		for (var i = 0; i < count; i++) {
			var listitem = {};
			listitem.reg_num = response.data.list[i].id;
			listitem.reg_date = response.data.list[i].reg_time;
			listitem.title = response.data.list[i].title;
			addOrUpdateNotiListData(listitem);
		}

		notiObject.request_index = response.data.start_index + count;
		notiObject.total_content_count = response.data.total;

		if((response.data.start_index - 1) + count < notiObject.total_content_count){
			notiObject.next_page = true;
		}else{
			notiObject.next_page = false;
		}

}

function sendRequestExceptionHandlerForGetNotiTitle() {
	if (serviceMain.currentDivString === "mainScreen" && notiObject.card_status !== "loaded") {
		notiObject.card_status = "unloaded";
		drawNotificationCard();
		showRequestErrorDialog();
	} else if (notiObject.next_page_loading) {
		notiObject.next_page_loading = false;
		document.getElementById("notificationPage").scrollBy(0, -$('#notiNextPageLoading').height());
		showRequestErrorDialog();
	}
}

function updateNotiContent(reg_num, timeout = undefined) {
	var requestBody = rsapi_getNotiBody(reg_num);
// 	pluginService.sendRequest(requestBody, getNotiBodyCallback);
	promiseSendRequestWithTimeout(requestBody, timeout)
	.then((response) => getNotiBodyCallback(response))
	.catch((e) => sendRequestExceptionHandlerForGetNotiBody(e, reg_num));
}

function getNotiBodyCallback(response) {
	var index = parseNotificationBodyData(response);

	// noti card에 body 값 반영
	if (notiObject.card_status !== "loaded") {
		// load 한 card는 card_list에서 제거
		const idx = notiObject.card_list.findIndex(function (item) {
			return item === notiObject.list[index].reg_num;
		});
		if (idx > -1) {
			notiObject.card_list.splice(idx, 1);
		}
		// load해야 할 카드를 모두 load하였다면 card_status 값을 loaded로 변경하고, MainLoadingScreen을 hide 요청한다.
		if (notiObject.card_list.length === 0) {
			notiObject.card_status = "loaded";
			drawNotificationCard();	// 원래는 drawCard()가 호출될 때 불려야 하지만, 현재 main쪽에서 안불러주므로......
			clearTimeout(firstLoadingTimer);
		}
	}

	if ($('#notificationPage').is(':visible')) {
		var notiPageItem = document.getElementById("notiPageItem_" + index);

		// noti item draw 객체에 값 설정
		var panelText = notiPageItem.getElementsByClassName('panel_text')[0];
		panelText.innerHTML = notiObject.list[index].body;

		if (notiObject.list[index].img_url) {
			var panelImgTag = notiPageItem.getElementsByTagName('img')[1];
			if(panelImgTag === undefined){
				var panelImg = notiPageItem.getElementsByClassName('panel_img')[0];
				var img_elm = document.createElement("img");
				img_elm.src = notiObject.list[index].img_url;
				panelImg.appendChild(img_elm);
			}else{
				panelImgTag.src = notiObject.list[index].img_url;
			}
		}

		// 현재 active 상태의 item이라면 해당 item의 ui 상태를 변경한다.
		if (notiPageItem.getAttribute('status') !== 'close') {
			setNotificationItemStatus(index, 'open');
		}
	}
}

function parseNotificationBodyData(response) {
	var listitem = {};
  //Error Exception
	if(response.result.message !== 'OK'){
		throw new Error(response.result.message);
	}

	listitem.reg_num = response.data.id;
	listitem.img_url = response.data.img_url;
	listitem.body = response.data.message.newLineToBR();

	return addOrUpdateNotiListData(listitem);
}

function addOrUpdateNotiListData(obj) {
	// arr에 obj를 추가하되, 이미 동일한 id 값을 가진 obj가 arr에 존재하면 새로 추가하지 않고 기존 값을 덮어쓴다.
	var index = notiObject.list.findIndex((e) => e.reg_num === obj.reg_num);
	if (index === -1) {
		let new_len = notiObject.list.push(obj);
		index = new_len - 1;
		// notificationPage가 화면에 보여지는 중이라면, div 추가 및 draw까지 진행한다.
		if ($('#notificationPage').is(':visible')) {
			addNotificationItemDiv(index);
			drawNotificationPageItem(index);
		}
	} else {
		if (obj.reg_date !== undefined) notiObject.list[index].reg_date = obj.reg_date;
		if (obj.title !== undefined) notiObject.list[index].title = obj.title;
		if (obj.img_url !== undefined) notiObject.list[index].img_url = obj.img_url;
		if (obj.body !== undefined) notiObject.list[index].body = obj.body;
	}
	return index;
}

function sendRequestExceptionHandlerForGetNotiBody(e, reg_num) {
	// load에 실패한 card는 card_list에서 제거
	const idx = notiObject.card_list.findIndex(function (item) {
		return item === reg_num;
	});
	if (idx > -1) {
		notiObject.card_list.splice(idx, 1);
	}
	
	if (serviceMain.currentDivString === "mainScreen" && notiObject.card_status !== "loaded") {
		notiObject.card_status = "unloaded";
		drawNotificationCard();
	} else if ($('#notificationPage').is(':visible')) {
		var index = notiObject.list.findIndex((e) => e.reg_num === reg_num);
		if (index !== -1) {
			var notiPageItem = document.getElementById("notiPageItem_" + index);
			var status = notiPageItem.getAttribute('status');
			if (status === 'loading') {
				setNotificationItemStatus(index, 'close');
				showRequestErrorDialog();
			}
		}
	}
}
