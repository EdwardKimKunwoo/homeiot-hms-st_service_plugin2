////////////////////////////////////////////////////////////////////////////////////////////
// MessagePort를 통해 TV STPluginPlatformService와 통신하여 native call에 대한 처리를 수행한다.

class SCPluginNativeBinder {
	constructor() {
		console.log('SCPluginNativeBinder created...');

		this._serviceHandle = null;
		this._extraData = null;
		this._callbackArray = [];
		this._timearray = [];

		// Get serviceHandle and extraData from appcontrol
		var reqAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
		if (reqAppControl) {
			var retData = reqAppControl.appControl.data;
			for(let i = 0; i < retData.length; i++) {
				//console.log('key: ' + retData[i].key + ', value: ' + retData[i].value[0]);
				if (retData[i].key === 'serviceHandle') {
					this._serviceHandle = retData[i].value[0];
				} else if (retData[i].key === 'extraData') {
					this._extraData = retData[i].value[0];
				}
			}
		}

		if (this._serviceHandle === null) {
			this._serviceHandle = 'testServiceHandle';
		}

		this._launchPluginPlatform(() => {
			if (this._remotePort === undefined) {
				this._remotePort = tizen.messageport.requestRemoteMessagePort('com.samsung.tv.STPluginPlatformService', 'PluginPlatformPort');
			}
		});

		this._localPort = tizen.messageport.requestLocalMessagePort(this._serviceHandle);
		this._localPort.addMessagePortListener(this._MessagePortListener.bind(this));

		this._registerSCPluginNativeAPIs();
	}

	_launchPluginPlatform(callbackAfterLaunched) {
		try {
			callbackAfterLaunched();
			return;
		} catch (e) {
			console.warn(e);
		}

		console.log("Launcing pluginplatform. Adding callback to callbackArray queue.");
		this._callbackArray[this._callbackArray.length] = callbackAfterLaunched;

		if (this._isLaunchingPluginPlatform === true) {
			console.log("PluginPlatform launching is already progressing.");
			return;
		}
		this._isLaunchingPluginPlatform = true;

		var appControl = new tizen.ApplicationControl(null, null, null, null, [
			new tizen.ApplicationControlData("serviceHandle", [this._serviceHandle]),
			new tizen.ApplicationControlData("extraData", [this._extraData])
		]);

		tizen.application.launchAppControl(appControl, "com.samsung.tv.STPluginPlatform", (function () {
			// launch success
			console.log("Launch requesting of pluginplatform success");
		}).bind(this), (function (error) {
			// launch failed
			console.error("Launcing requesting of pluginplatform failed - " + error.message);
			this._isLaunchingPluginPlatform = false;
		}).bind(this), {
			// appControlReplyCallback recieved
			onsuccess: (function (data) {
				// Callee sent a reply.
				console.log("appControlReplyCallback from pluginplatform - success");
				this._isLaunchingPluginPlatform = false;
				for (let i = 0; i < data.length; i++) {
					console.log("key: " + data[i].key + ", value: " + data[i].value[0]);
				}

				if (this._remotePort === undefined) {
					console.log("remotePort is not defined. requesting remoteMessagePort");
					this._remotePort = tizen.messageport.requestRemoteMessagePort('com.samsung.tv.STPluginPlatformService', 'PluginPlatformPort');
				}

				// call handler
				for (let i = 0; i < this._callbackArray.length; i++) {
					console.log("call queued callback - " + i);
					this._callbackArray[i]();
				}
				this._callbackArray = [];
			}).bind(this),
			onfailure: (function (error) {
				// Callee returned failure.
				console.error("appControlReplyCallback from pluginplatform - failed - " + error.message);
				this._isLaunchingPluginPlatform = false;
			}).bind(this)
		});
	}

	_registerSCPluginNativeAPIs() {
		this._SCPluginNativeAPIs = [
			// log
			'scpluginDebugLog',
			'scpluginErrorLog',
			'scpluginInfoLog',
			'scpluginVerboseLog',
			'scpluginWarningLog',

			// manager
			//'scpluginClose',  --> local API로 대체
			'scpluginSetCloudConnectionStateListener',
			//'scpluginSetChangeApplicationStateListener',
			//'scpluginGetOCFDevices',
			//'scpluginGetService',  --> local API로 대체
			'scpluginGetPluginData',
			'scpluginSetPluginData',
			'scpluginDeletePluginData',
			//'scpluginGetSAAuthCode',
			//'scpluginProdLaunchApplication',
			//'scpluginProdIsApplicationInstalled',

			// AnalyticsLog
			//'scpluginProdAnalyticsLogInsert',

			// Service
			'scpluginServiceSubscribe',
			'scpluginServiceUnsubscribe',
			'scpluginServiceExecution',
			'scpluginServiceLaunchConfiguration',
			'scpluginProdLaunchDevicePlugin',
			'scpluginProdGetLocationNickname',
			'scpluginServiceShareText',

			// OCFDevice
			//'scpluginSubscribe',
			//'scpluginUnsubscribe',
			//'scpluginGetRemoteRepresentation',
			//'scpluginSetRemoteRepresentation',
			//'scpluginStartMonitoringConnectionState',
			//'scpluginStopMonitoringConnectionState',
		];

		for(let i = 0 ; i < this._SCPluginNativeAPIs.length ; i++) {
			window[this._SCPluginNativeAPIs[i]] = {};
			window[this._SCPluginNativeAPIs[i]]['postMessage'] = this._postMessage.bind(this);
		}

		this._SCPluginLocalAPIs = [
			// manager
			'scpluginClose',
			'scpluginGetService'
		];

		for(let i = 0 ; i < this._SCPluginLocalAPIs.length ; i++) {
			window[this._SCPluginLocalAPIs[i]] = {};
			window[this._SCPluginLocalAPIs[i]]['postMessage'] = this[this._SCPluginLocalAPIs[i]].bind(this);
		}
	}

	_postMessage(args) {
		console.log("[NativeBinder] request  - callbackId: " + args.callbackId + ", cmd: " + args.cmd + ", args: " + JSON.stringify(args));
		var message = [{ key: 'message', value: JSON.stringify(args)}];
		this._timearray[args.callbackId % 100] = (new Date()).getTime();
		this._launchPluginPlatform(() => {
			this._remotePort.sendMessage(message, this._localPort);
		});
}

	_MessagePortListener(data, replyPort) {
		if (data.length <= 0 || data[0].key != "message") {
			throw new error('Invalid message');
		}
		var message = data[0].value;
		var response = JSON.parse(message);
		var timediff = (new Date()).getTime() - this._timearray[response.callbackId % 100];
		console.log("[NativeBinder] response - callbackId: " + response.callbackId + " (" + timediff + "ms), message: " + message);
		window[response.callbackName](message);
	}

	scpluginClose(args) {
		console.log("scpluginClose");
		tizen.application.getCurrentApplication().exit();
	}

	scpluginGetService(args) {
		console.log("scpluginGetService - args : " + JSON.stringify(args));

		// // If can not get from appcontrol, try to get from PluginPlatform
		// if (this._serviceHandle === null) {
		// 	console.warn('Can not get the serviceHandle from appcontrol...try to get from PluginPlatform...');
		// 	this._postMessage(args);
		// 	return;
		// }
	
		args.result = "SUCCESS";
		args.serviceHandle = this._serviceHandle;
		args.extraData = this._extraData;
		console.log("scpluginGetService - args : " + JSON.stringify(args));
		window[args.callbackName](JSON.stringify(args));
	}
}

////////////////////////////////////////////////////////////////////////////////////////////


function tv_init() {
	console.log('tv_init() called');
	    
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
			console.log('This app is hidden.');
			// TODO : 앱이 화면에서 사라지면 종료하도록 구현되어야 하나, live reload 기능이 동작하지 않아서 임시로 막아둠.
			//tizen.application.getCurrentApplication().exit();
        }
    });
 
    document.addEventListener('keydown', function(e) {
		console.log('Key code : ' + e.keyCode);
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		break;
    	case 38: //UP arrow
    		break;
    	case 39: //RIGHT arrow
    		break;
    	case 40: //DOWN arrow
    		break;
    	case 13: //OK button
    		break;
    	case 10009: //RETURN button
			backAction();
    		break;
    	default:
    		break;
    	}
	});

	window._SCPluginNativeBinder = new SCPluginNativeBinder();
};

if (navigator.userAgent.match(/SMART-TV/)) {
	tv_init();
}

////////////////////////////////////////////////////////////////////////////////////////////
// TV Util for caph library

// function addFocusableAttribute() {
// 	console.log('addFocusableAttribute');
// 	var count = 0;
// 	var elms = document.getElementsByTagName('*');
// 	for ( var i = 0; i<elms.length; i++ ) {
// 		// if ( elms[i].className !== 'theClassNameYoureLookingFor' ) {
// 		// 	continue;
// 		// }
// 		if ( typeof elms[i].onclick === 'function' && $(elms[i]).is(':visible')) {
// 			console.log('onclick element found!! - elms[' + i + '], id:' + elms[i].id);
// 			$(elms[i]).attr('focusable', '');
// 			$.caph.focus.$$toAvailable(elms[i]);
// 			count++;
// 		}
// 	}
// 	console.log('count: ' + count);
// }
// var controllerProviderInstance;
// var nearestFocusableFinderProviderInstance;
// function initCaphFocus() {
// 	console.log('initCaphFocus');
// 	$.caph.focus.activate(function(nearestFocusableFinderProvider, controllerProvider) {
// 		controllerProviderInstance = controllerProvider.getInstance();
// 		nearestFocusableFinderProviderInstance = nearestFocusableFinderProvider.getInstance();

// 		// nearestFocusableFinderProvider.registerDistanceCalculationStrategy('sample', function(from, to, direction) {
// 		// 	console.log('hhhh');
// 		// 	return Math.sqrt(Math.pow(from.left - to.left, 2) + Math.pow(from.top - to.top, 2));
// 		// });
// 		//nearestFocusableFinderProvider.useDistanceCalculationStrategy('sample');

// 		controllerProvider.onFocused(function(event, originalEvent) {
// 			let up = nearestFocusableFinderProviderInstance.getNearest(event.currentTarget, $.caph.focus.Constant.DIRECTION.UP);
// 			let down = nearestFocusableFinderProviderInstance.getNearest(event.currentTarget, $.caph.focus.Constant.DIRECTION.DOWN);
// 			let left = nearestFocusableFinderProviderInstance.getNearest(event.currentTarget, $.caph.focus.Constant.DIRECTION.LEFT);
// 			let right = nearestFocusableFinderProviderInstance.getNearest(event.currentTarget, $.caph.focus.Constant.DIRECTION.RIGHT);
// 			up = up ? up.id : 'null';
// 			down = down ? down.id : 'null';
// 			left = left ? left.id : 'null';
// 			right = right ? right.id : 'null';
// 			console.log('onFocused - ' + event.currentTarget.id + ' , up: ' + up + ', down: ' + down + ', left: ' + left + ', right: '+ right);			
// 		});

// 		controllerProvider.onBlurred(function (event, originalEvent) {
// 			console.log('onBlurred - ' + event.currentTarget.id);
// 			// $(event.currentTarget).parent().find('.focusEffect').remove();
// 		});

// 		controllerProvider.onSelected(function(event, originalEvent) {
// 			if (originalEvent && originalEvent.type === "click")	return;	// prevent infinite recursive calling of mouse event handler
// 			console.log('onSelected - ' + event.currentTarget.id);
// 			simulateMouseClickEvent(event.currentTarget);
// 		});
// 	});
// }
// $(document).ready(initCaphFocus);

  
// function simulateMouseClickEvent(elm) {
// 	var simulatedEvent = document.createEvent('MouseEvents');
// 	var rect = elm.getBoundingClientRect();

//     // Initialize the simulated mouse event using the touch event's coordinates
//     simulatedEvent.initMouseEvent(
//       'click',    		// type
//       true,             // bubbles
//       true,             // cancelable
//       window,           // view
//       1,                // detail
//       window.screenX + rect.left,    // screenX
//       window.screenY + rect.top,    // screenY
//       rect.left,    // clientX
//       rect.top,    // clientY
//       false,            // ctrlKey
//       false,            // altKey
//       false,            // shiftKey
//       false,            // metaKey
//       0,                // button
//       null              // relatedTarget
//     );

//     // Dispatch the simulated event to the target element
//     elm.dispatchEvent(simulatedEvent);
// }
