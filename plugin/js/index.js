/* Copyright (c) 2019 Samsung Electronics Co., Ltd All Rights Reserved

PROPRIETARY/CONFIDENTIAL

This software is the confidential and proprietary information of SAMSUNG ELECTRONICS ("Confidential Information"). You shall not disclose such Confidential Information and shall use it only in accordance with the terms of the license agreement you entered into with SAMSUNG ELECTRONICS.  SAMSUNG make no representations or warranties about the suitability of the software, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. SAMSUNG shall not be liable for any damages suffered by licensee as a result of using, modifying or distributing this software or its derivatives.
*/

includeServices();

var serviceMain = new HomenetServicePlugIn();
var informationPage = new InformationPage();
var licensePage = new LicensePage();
var privacyPage = new PrivacyPage();
var mainscreenPage = new MainScreenPage();
var mainscreenEditPage = new MainScreenEditPage();
var mainscreenAlarmPage = new MainScreenAlarmPage();
var helpScreen = new HelpScreen();

/*var voteService = new VoteService();
var contactsService = new ContactsService();
*/

// disable right click
window.oncontextmenu = function () { return false; }

var serviceList = [
  /*
  {
    service: voteService,
    serverId: "투표",
    enabled: false
  },
  {
    service: contactsService,
    serverId: "연락처",
    enabled: false
  },
  */
];

var enabledMainServiceMenu = true;
var enabledMainBanner = false;

var chartResponsiveOption = true;
var prevOnlineStatus = navigator.onLine;

var agreementList = [];
var agreementinfo = {};

window.onload = function () {
  //overriding for Family Hub
  if (isFHub()) {
    console.log = function (...args) {
       scplugin.log.debug("HomeNet","Service", args);
    };
    console.info = function (...args) {
       scplugin.log.info("HomeNet","Service", args);
    };
    console.warn = function (...args) {
       scplugin.log.warning("HomeNet","Service", args);
    };
    console.error = function (...args) {
       scplugin.log.error("HomeNet","Service", args);
    };
  }

  $("html").attr("lang", lang);

  console.info(PACKAGE, "MAIN", VERSION + " - " + CODE);
  $('[data-lang]').each(function () {
    var $this = $(this);
    $this.html($.lang[lang][$this.data('lang')]);
  });
  document.getElementById('loading_error_title').innerHTML = "";
  document.getElementById('loading_error_msg').innerHTML = $.lang[lang].CONNECTION_ERROR;
  document.getElementById('loading_error_button').innerHTML = $.lang[lang].OK_BUTTON;

  document.getElementById('request_error_title').innerHTML = "";
  document.getElementById('request_error_msg').innerHTML = $.lang[lang].NETWORK_ERROR;
  document.getElementById('request_error_button').innerHTML = $.lang[lang].OK_BUTTON;

  document.getElementById('network_disconnection_title').innerHTML = "";
  document.getElementById('network_disconnection_msg').innerHTML = $.lang[lang].NETWORK_DISCONNECTION;
  document.getElementById('network_disconnection_button').innerHTML = $.lang[lang].OK_BUTTON;

  document.getElementById('initial_network_disconnection_title').innerHTML = "";
  document.getElementById('initial_network_disconnection_msg').innerHTML = $.lang[lang].NETWORK_DISCONNECTION;
  document.getElementById('initial_network_disconnection_button').innerHTML = $.lang[lang].OK_BUTTON;

  function onNetworkStateChanged()  {
    if (!navigator.onLine)
      showNetworkDisconnectionDialog();
    else
      hideNetworkDisconnectionDialog();
  }

  function onComparingNetworkStateWithPrev() {
    if (prevOnlineStatus !== navigator.onLine) {
      prevOnlineStatus = navigator.onLine;
      onNetworkStateChanged();
    }
  }

  function relocateElements() {
    // relocate Main Service Menu for expand
    relocateMainServiceMenuExpand();

    // relocate Header on Energy Page for expand
    relocateEnergyPageHeader();
    relocateEnergyTotalChart();

    // relocate Help Screen for expand
    relocateHelpScreen();

    // relocate parking color picker popup
    relocateParkingPopup();

    // relocate notification page
    relocateNotiPage();
  }

  $(window).on("resize", function() {
    // relocate Energy monthly list
    if (isBasicDropDownOpened) {
      $(".basic_dropdown ul").css("left",($(window).width()-168)/2);
    }

    if (isEPMonthlyChartResized()) {
      clearEnergyPageChart();
    }

    relocateElements();
  });

  $(window).on("resizeend", function() {
    if (isBasicDropDownOpened) {
      $(".basic_dropdown ul").css("left",($(window).width()-168)/2);
    }

    modifyEPMonthlyChartWidth();

    // relocate parking color picker popup
    relocateParkingPopup();
  });

  var naviConnection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (naviConnection && !isFHub())
    naviConnection.addEventListener('change', onNetworkStateChanged);
  else
    setInterval(onComparingNetworkStateWithPrev, 3000);

  if (!navigator.onLine)
    showInitialNetworkDisconnectionDialog();

  let config = { type: 'rippleC' };
  let closeButtons = document.body.querySelectorAll('.close_btn');
  closeButtons.forEach(eachCase => {
    $(eachCase).on('touchstart', function (e) {
      config.cb = () => {
        if (eachCase.id === 'loading_error_button') {
          doLoadingErrorAction();
        } else if (eachCase.id === 'request_error_button') {
          hideRequestErrorDialog();
        } else if (eachCase.id === 'network_disconnection_button') {
          hideNetworkDisconnectionDialog();
        } else if (eachCase.id === 'initial_network_disconnection_button') {
          hideInitialNetworkDisconnectionDialog();
        } else if (eachCase.id === 'agreement_dialog_button') {
          hideAgreementDialog();
        }
      }
      config.cancelCb = () => { }
      rippleManager.set(e, config);
    });
  });

  if (isPlatform.iOS()) {
    chartResponsiveOption = false;
    var _ScrollFix = new ScrollFixForIOS();
  } else {
    var _boundaryFeedback = new BoundaryFeedback();
  }

  var _customScrollbar = new CustomScrollbar();

  serviceMain.startPlugIn();
};

window.onhashchange = function () {
  console.debug(PACKAGE, "MAIN", "onhashchange");
  var parkingPopup = document.getElementsByClassName('parking_page_popup_window')[0];
  var visitorPopup = document.getElementById('visitorPopup');
  if (parkingPopup && parkingPopup.style.display !== 'none') {
      toggleParkingPopup('none');
      window.history.pushState('', '', '#parkingPage');
  } else if (visitorPopup) {
      visitorPopup.remove();
      toggleVisitorPopup('none');
      window.history.pushState('', '', '#visitorPage');
  } else {
      serviceMain.startPlugIn();
  }
};

$('head').append('<link rel="stylesheet" type="text/css" href="css/tv/common.css" />');
