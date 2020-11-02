/*
 *    SCPlginApi
 *
 *    Copyright (c) 2017-2019 Samsung Electronics Co., Ltd  Ltd All Rights Reserved
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

var TEST = false;

function __onOCFDeviceCallback(devices) {
    var func = window.scplugin.manager.getDeviceDetailFunc;
    try {
        var deviceList = window.scplugin._getOCFDevices(JSON.parse(devices));
        if (func !== null) {
            if (typeof func === 'function') {
                func(deviceList);
            } else if (typeof func === 'string') {
                eval(func + "(deviceList)");
            }
        }
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
}

function __onNMOCFDeviceCallback(json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    f(new _APIError("NotSupportedError", "This feature is not supported on Service plugin."));
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                var deviceList = window.scplugin._getOCFDevices(result.devices);
                f(deviceList);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMRepresentCallback(json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.result, result.id, result.uri, result.representation);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMStateCallback(json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMMonitoringStateCallback(json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.result, result.id, result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMPluginDataCallback(json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.key, result.value);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMSAAuthCodeCallback(json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.status, result.authCode, result.authUrl, result.apiUrl, result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMServiceCallback(json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    f(new _APIError("NotSupportedError", "This feature is not supported on Device plugin."));
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                var serviceObj = window.scplugin._getService(result);
                f(serviceObj);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMServiceEventCallback(json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.result, result.event);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMServiceResponseCallback(json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.result, result.response);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMServiceConfigurationCallback(json) {
    var result = JSON.parse(json);
    var f = window.scplugin._scPluginNative.getCallback(result);
    if (f) {
        setTimeout(function() {
            try {
                f(result.result);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMProdIsApplicationInstalledCallback(json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result = "SECURITY_ERR") {
                        err = new _APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result = "NOT_SUPPORTED_ERR") {
                        err = new _APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new _APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.appNameType, result.state);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMProdLaunchApplicationCallback(json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result = "SECURITY_ERR") {
                        err = new _APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result = "NOT_SUPPORTED_ERR") {
                        err = new _APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new _APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.appLinkType);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMProdLaunchPluginCallback(json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result = "SECURITY_ERR") {
                        err = new _APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result = "NOT_SUPPORTED_ERR") {
                        err = new _APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new _APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.deviceId);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMProdLocationNicknameCallback(json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result = "SECURITY_ERR") {
                        err = new _APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result = "NOT_SUPPORTED_ERR") {
                        err = new _APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new _APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f(result.locationNickname);
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

function __onNMProdAnalyticsLogInsert(json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result = "SECURITY_ERR") {
                        err = new _APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result = "NOT_SUPPORTED_ERR") {
                        err = new _APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new _APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
}

function __onNMServiceShareTextCallback(json) {
    var result = JSON.parse(json);
    var f = undefined;
    if (result.result != "SUCCESS") {
        f = window.scplugin._scPluginNative.getErrorCallback(result);
        if (f) {
            setTimeout(function() {
                try {
                    var err;
                    if (result.result = "SECURITY_ERR") {
                        err = new _APIError("SecurityError", "This plugin does not have the permission to call this method.");
                    } else if (result = "NOT_SUPPORTED_ERR") {
                        err = new _APIError("NotSupportedError", "This feature is not supported on this plugin.");
                    } else {
                        err = new _APIError("UnknownError", "Unknown error");
                    }
                    f(err);
                } catch (e) {
                    console.error(e);
                }
            }, 0);
            return;
        }
    }
    if (f == undefined) {
        f = window.scplugin._scPluginNative.getCallback(result);
    }

    if (f) {
        setTimeout(function() {
            try {
                f();
            } catch (e) {
                console.error(e);
            }
        }, 0);
    }
}

(function(window, document, undefined) {
    var NativeManager = function() {
        this.CALLBACK_ID_KEY = "callbackId";
        this.LISTENER_ID_KEY = "listenerId";
        var _replyId = 0;
        this._callbacks = {};
        this._listeners = {};
        Object.defineProperties(this, {
            nextReplyId: {
                get: function() {
                    return ++_replyId;
                },
                enumerable: false
            }
        });
    };

    NativeManager.prototype = {
        call: function(cmd, args, callback, onerror) {
            args = args || {};
            var replyId = this.nextReplyId;
            args[this.CALLBACK_ID_KEY] = replyId;
            this._callbacks[replyId] = callback;
            if (onerror) { this._callbacks[replyId + "err"] = onerror; }
            this.callNative(cmd, args);
        },
        addListener: function(cmd, name, args, callback) {
            args = args || {};
            args[this.LISTENER_ID_KEY] = name;
            this._listeners[name] = callback;
            this.callNative(cmd, args);
        },
        removeListener: function(cmd, name, args) {
            args = args || {};
            if (this._listeners.hasOwnProperty(name)) {
                delete this._listeners[name];
            }
            this.callNative(cmd, args);
        },
        callNative: function(cmd, args) {
            args = args || {};
            if (isPlatform.iOS()) {
                window.webkit.messageHandlers[cmd].postMessage(args);
            } else if (isPlatform.Android() || isPlatform.Simulator()) {
                if (Object.keys(args).length == 0) {
                    eval("SC_PLUGIN." + cmd + "()");
                } else {
                    eval("SC_PLUGIN." + cmd + ".apply(SC_PLUGIN,[JSON.stringify(args)])");
                }
            } else if (isPlatform.Tizen()) {
                eval(cmd + ".postMessage(args)");
            } else {
                console.log("Not supported platform - " + navigator.userAgent);
            }
        },
        getCallback: function(result) {
            var id;

            if (result.hasOwnProperty(this.CALLBACK_ID_KEY)) {
                id = result[this.CALLBACK_ID_KEY];

                if (typeof this._callbacks[id] !== 'function') {
                    console.error('Wrong callback identifier. Ignoring message.');
                    return null;
                }
                var f = this._callbacks[id];
                delete this._callbacks[id];
                return f;
            }

            if (result.hasOwnProperty(this.LISTENER_ID_KEY)) {
                id = result[this.LISTENER_ID_KEY];
                if (typeof this._listeners[id] !== 'function') {
                    console.error('Wrong callback identifier. Ignoring message.');
                    return null;
                }
                var f = this._listeners[id];
                return f;
            }
        },
        getErrorCallback: function(result) {
            var id;

            if (result.hasOwnProperty(this.CALLBACK_ID_KEY)) {
                id = result[this.CALLBACK_ID_KEY] + "err";

                if (typeof this._callbacks[id] !== 'function') {
                    console.error('Wrong callback identifier. Ignoring message.');
                    return null;
                }
                var f = this._callbacks[id];
                delete this._callbacks[id];
                return f;
            }
        }
    };

    var manager = function() {
        this.getDeviceDetailFunc = null;
	};

    manager.prototype = {
        /**
         * @api window.scplugin.manager.setCloudConnectionStateListener(onCloudConnectionStateCallback) void setCloudConnectionStateListener()
         * @apiName setCloudConnectionStateListener()
         * @apiGroup Plugin manager
         * @apiDescription Sets cloud Connection changes callback and monitors its state changes.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onCloudConnectionStateCallback Receives the state of TCP connection with cloud server.
         *
         * @apiExample {js} Example usage:
         * function onCloudConnectionStateCallback(state) {
         *     if (state == "CONNECTED") {
         *         // Do something...
         *     } else if (state == "DISCONNECTED") {
         *         // Do something...
         *     }
         * }
         *
         * window.scplugin.manager.setCloudConnectionStateListener(onCloudConnectionStateCallback);
         *
         */
        setCloudConnectionStateListener: function(callback) {
            var cmd = "scpluginSetCloudConnectionStateListener";
            var args = {};
            args.callbackName = "__onNMStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.setApplicationStateListener(onApplicationStateCallback) void setApplicationStateListener()
         * @apiName setApplicationStateListener()
         * @apiGroup Plugin manager
         * @apiDescription Sets application state changes callback and monitors its state changes.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {Function} onApplicationStateCallback Receives the state of application.
         *
         * @apiExample {js} Example usage:
         * function onApplicationStateCallback(state) {
         *    if (state == "ACTIVE") {
         *       // Application become active.
         *    } else if (state == "BACKGROUND") {
         *       // Application enter background.
         *    }
         * }
         *
         * scplugin.manager.setApplicationStateListener(onApplicationStateCallback);
         *
         */
        setApplicationStateListener: function(callback) {
            var cmd = "scpluginSetChangeApplicationStateListener";
            var args = {};
            args.callbackName = "__onNMStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.getOCFDevices(onOCFDevicesCallback,onErrorCallback) void getOCFDevices()
         * @apiName getOCFDevices()
         * @apiGroup Plugin manager
         * @apiDescription Gets OCF device object of available device selected when launching plugin.
         * This method can only be used on Device plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onOCFDevicesCallback Receives the OCF device object list.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported. This feature is only supported on Device plugin.
         *
         * @apiExample {js} Example usage: Device plugin
         * function onOCFDevicesCallback(devices) {
         *     for (var i in devices) {
         *         console.log("deviceHandle: " + devices[i].deviceHandle);
         *         console.log("deviceName: " + devices[i].deviceName);
         *         console.log("deviceType: " + devices[i].deviceType);
         *         console.log("metadata: " + devices[i].metadata);
         *     }
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * scplugin.manager.getOCFDevices(onOCFDevicesCallback, onErrorCallback);
         */
        getOCFDevices: function(onsuccess, onerror) {
            if (TEST) {
                this.getDeviceDetailFunc = onsuccess;
                var info = JSON.stringify(window.deviceInfo);
                __onOCFDeviceCallback("[" + info + "]");
            } else {
                var cmd = "scpluginGetOCFDevices";
                var args = {};
                args.callbackName = "__onNMOCFDeviceCallback";
                args.cmd = cmd;
                try {
                    window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
                } catch (e) {
                    var err = new _APIError("NotSupportedError", "This feature is not supported on Service plugin.");
                    onerror(err);
                }
            }
        },
        /**
         * @api window.scplugin.manager.getService(onServiceCallback,onErrorCallback) void getService()
         * @apiName getService()
         * @apiGroup Plugin manager
         * @apiDescription Gets service object. This method can only be used on Service plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiParam {Function} onServiceCallback Receives the Service object.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported. This feature is only supported on Service plugin.
         *
         * @apiExample {js} Example usage: Service plugin
         * function onServiceCallback(service) {
         *    console.log("serviceHandle: " + service.serviceHandle);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.getService(onServiceCallback, onErrorCallback);
         */
        getService: function (onsuccess, onerror) {
            var cmd = "scpluginGetService";
            var args = {};
            args.callbackName = "__onNMServiceCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new _APIError("NotSupportedError", "This feature is not supported on Device plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.getPluginData(handle,key,onPluginDataCallback) void getPluginData()
         * @apiName getPluginData()
         * @apiGroup Plugin manager
         * @apiDescription Gets the value of key from data table.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} handle Unique local ID. Each device handle has its own data table.
         * @apiParam {String} key Name of key to retrieve.
         * @apiParam {Function} onPluginDataCallback Receives value from the data table.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onPluginDataCallback(key, value) {
         *    if (value != null) {
         *       console.log(" key: " + key + " value: " + value );
         *    } else {
         *       console.log(" key: " + key + " > NOT FOUND VALUE");
         *    }
         * }
         *
         * scplugin.manager.getPluginData(ocfdevice.deviceHandle, "key_1", onPluginDataCallback);
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onPluginDataCallback(key, value) {
         *    if (value != null) {
         *       console.log(" key: " + key + " value: " + value );
         *    } else {
         *       console.log(" key: " + key + " > NOT FOUND VALUE");
         *    }
         * }
         *
         * scplugin.manager.getPluginData(service.serviceHandle, "key_a", onPluginDataCallback);
         *
         */
        getPluginData: function(handle, key, callback) {
            var cmd = "scpluginGetPluginData";
            var args = {};
            args.id = handle;
            args.callbackName = "__onNMPluginDataCallback";
            args.key = key;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.setPluginData(handle,key,value) void setPluginData()
         * @apiName setPluginData()
         * @apiGroup Plugin manager
         * @apiDescription Sets the value and key to data table.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} handle Unique local ID. Each device handle has its own data table.
         * @apiParam {String} key Name of key to set.
         * @apiParam {String} value The value to add to the data table by the key.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * scplugin.manager.setPluginData(ocfdevice.deviceHandle, "key_1", "1234567890");
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * scplugin.manager.setPluginData(service.serviceHandle, "key_a", "abcdefghighk");
         *
         */
        setPluginData: function(handle, key, value) {
            var cmd = "scpluginSetPluginData";
            var args = {};
            args.id = handle;
            args.key = key;
            args.value = value;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.deletePluginData(handle,key) void deletePluginData()
         * @apiName deletePluginData()
         * @apiGroup Plugin manager
         * @apiDescription Deletes key from data table.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} handle Unique local ID. Each device handle has its own data table.
         * @apiParam {String} key Name of key to delete.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * scplugin.manager.deletePluginData(ocfdevice.deviceHandle, "key_1");
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * scplugin.manager.deletePluginData(service.serviceHandle, "key_a");
         *
         */
        deletePluginData: function(handle, key) {
            var cmd = "scpluginDeletePluginData";
            var args = {};
            args.id = handle;
            args.key = key;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.getSAAuthCode(clientId,codeVerifier,state,onSAAuthCodeCallback,scope,duid) void getSAAuthCode()
         * @apiName getSAAuthCode()
         * @apiGroup Plugin manager
         * @apiDescription Gets the auth code from Samsung Account.
         * @apiVersion 1.1.0
         * @apiPermission platform
         * @apiProfile common
         *
         * @apiParam {String} clientId Client id to be authorized.
         * @apiParam {String} codeVerifier Value to be sent to server for code challenge. It is necessary for server to recognize application.
         * It is required using the unreserved characters [A-Z] / [a-z] / [0-9] / "-" / "." / "_" / "~" from Section 2.3 of [RFC3986], with a minimum length of 43 characters and a maximum length of 128 characters.
         * @apiParam {String} state The value to be sent to server so that it can send back the state value such that the response can be validated. (length : 16~32 character)
         * @apiParam {Function} onSAAuthCodeCallback Receives auth code from the account server.
         * @apiParam {String} [scope] Optional. The resource to be authorized.
         * @apiParam {String} [duid] Optional. The Device Unique Identifier of device to be authorized. It is required to issue a token for IoT device.
         *
         * @apiExample {js} Example usage:
         * function onSAAuthCodeCallback(result, authCode, authUrl, apiUrl, state) {
         *    if (result == "SUCCESS") {
         *       console.log("authCode: " + authCode + " authUrl: " + authUrl + " apiUrl: " + apiUrl + " state: " + state);
         *    }
         * }
         *
         * scplugin.manager.getSAAuthCode(clientId, codeVerifier, state, onSAAuthCodeCallback);
         *
         */
        getSAAuthCode: function(clientId, codeVerifier, state, callback, scope, duid) {
            var cmd = "scpluginGetSAAuthCode";
            var args = {};
            args.clientId = clientId;
            args.codeVerifier = codeVerifier;
            args.state = state;
            args.scope = scope;
            args.duid = duid;
            args.callbackName = "__onNMSAAuthCodeCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.close() void close()
         * @apiName close()
         * @apiGroup Plugin manager
         * @apiDescription Closes the web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiExample {js} Example usage:
         * // Execute command
         * scplugin.manager.close();
         *
         */
        close: function() {
            var cmd = "scpluginClose";
            try {
                window.scplugin._scPluginNative.callNative(cmd);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.manager.launchApplication(appLinkType,onLaunchApplicationCallback) void launchApplication()
         * @apiName launchApplication()
         * @apiGroup Plugin manager
         * @apiDescription Launches specific application page.
         * @apiVersion 1.1.1
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {AppLinkType} appLinkType AppLink type to launch.
         * @apiParam {Function} onLaunchApplicationCallback Receives finish state of launching application page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiUse APP_LINK_TYPE
         *
         * @apiExample {js} Example usage: SAMSUNGPAY_REWARD_MAIN
         * function onLaunchApplicationCallback(appLinkType) {
         *     console.log("The application has launched successfully. : " + appLinkType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.launchApplication("SAMSUNGPAY_REWARD_MAIN", onLaunchApplicationCallback, onErrorCallback);
         *
         * @apiExample {js} Example usage: PLAYSTORE_SAMSUNGPAY
         * function onLaunchApplicationCallback(appLinkType) {
         *     console.log("The application has launched successfully. : " + appLinkType);
         * }
         *
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.launchApplication("PLAYSTORE_SAMSUNGPAY", onLaunchApplicationCallback, onErrorCallback);
         */
        launchApplication: function(appLinkType, onsuccess, onerror) {
            var cmd = "scpluginProdLaunchApplication";
            var args = {};
            args.callbackName = "__onNMProdLaunchApplicationCallback";
            args.appLinkType = appLinkType;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new _APIError("NotSupportedError", "This feature is not supported on this plugin.");
                onerror(err);
            }
        },
        /**
         * @api window.scplugin.manager.isApplicationInstalled(appNameType,onIsApplicationInstalledCallback,onErrorCallback) void isApplicationInstalled()
         * @apiName isApplicationInstalled()
         * @apiGroup Plugin manager
         * @apiDescription Checkes whether the application is installed.
         * @apiVersion 1.1.1
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {AppNameType} appNameType The name of the application to retrieve.
         * @apiParam {Function} onIsApplicationInstalledCallback Receives installation state of application
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiUse APP_NAME_TYPE
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: SAMSUNGPAY
         * function onIsApplicationInstalledCallback(appNameType, state) {
         *    console.log("isApplicationInstalled : " + state);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * scplugin.manager.isApplicationInstalled("SAMSUNGPAY", onIsApplicationInstalledCallback, onErrorCallback);
         */
        isApplicationInstalled: function(appNameType, onsuccess, onerror) {
            var cmd = "scpluginProdIsApplicationInstalled";
            var args = {};
            args.callbackName = "__onNMProdIsApplicationInstalledCallback";
            args.appNameType = appNameType;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new _APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        }
    };

    var log = function() {}

    log.prototype = {
        /**
         * @api window.scplugin.log.debug(className,functionName,msg) void debug()
         * @apiName debug()
         * @apiGroup Log
         * @apiDescription Logging utility for web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} className Class name for log message formatting.
         * @apiParam {String} functionName Function name for log message formatting.
         * @apiParam {String} msg Message for log.
         *
         * @apiExample {js} Example usage:
         * window.scplugin.log.debug(className, functionName, msg);
         *
         */
        debug: function(className, functionName, msg) {
            var cmd = "scpluginDebugLog";
            var args = {};
            args.className = className;
            args.functionName = functionName;
            args.msg = msg;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.log.error(className,functionName,msg) void error()
         * @apiName error()
         * @apiGroup Log
         * @apiDescription Logging utility for web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} className Class name for log message formatting.
         * @apiParam {String} functionName Function name for log message formatting.
         * @apiParam {String} msg Message for log.
         *
         * @apiExample {js} Example usage:
         * window.scplugin.log.error(className, functionName, msg);
         *
         */
        error: function(className, functionName, msg) {
            var cmd = "scpluginErrorLog";
            var args = {};
            args.className = className;
            args.functionName = functionName;
            args.msg = msg;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.log.info(className,functionName,msg) void info()
         * @apiName info()
         * @apiGroup Log
         * @apiDescription Logging utility for web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} className Class name for log message formatting.
         * @apiParam {String} functionName Function name for log message formatting.
         * @apiParam {String} msg Message for log.
         *
         * @apiExample {js} Example usage:
         * window.scplugin.log.info(className, functionName, msg);
         *
         */
        info: function(className, functionName, msg) {
            var cmd = "scpluginInfoLog";
            var args = {};
            args.className = className;
            args.functionName = functionName;
            args.msg = msg;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.log.verbose(className,functionName,msg) void verbose()
         * @apiName verbose()
         * @apiGroup Log
         * @apiDescription Logging utility for web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} className Class name for log message formatting.
         * @apiParam {String} functionName Function name for log message formatting.
         * @apiParam {String} msg Message for log.
         *
         * @apiExample {js} Example usage:
         * window.scplugin.log.verbose(className, functionName, msg);
         *
         */
        verbose: function(className, functionName, msg) {
            var cmd = "scpluginVerboseLog";
            var args = {};
            args.className = className;
            args.functionName = functionName;
            args.msg = msg;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
        },
        /**
         * @api window.scplugin.log.warning(className,functionName,msg) void warning()
         * @apiName warning()
         * @apiGroup Log
         * @apiDescription Logging utility for web plugin.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile common
         *
         * @apiParam {String} className Class name for log message formatting.
         * @apiParam {String} functionName Function name for log message formatting.
         * @apiParam {String} msg Message for log.
         *
         * @apiExample {js} Example usage:
         * window.scplugin.log.warning(className, functionName, msg);
         *
         */
        warning: function(className, functionName, msg) {
            var cmd = "scpluginWarningLog";
            var args = {};
            args.className = className;
            args.functionName = functionName;
            args.msg = msg;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.callNative(cmd, args);
            } catch (e) {}
        }
    };

    var AnalyticsLog = function() {}

    AnalyticsLog.prototype = {
        /**
         * @api window.scplugin.analyticsLog.insert(screenId,event,detail,onErrorCallback) void insert()
         * @apiName insert()
         * @apiGroup AnalyticsLog
         * @apiDescription Samsung analytics logging utility for web plugin.
         * @apiVersion 1.1.1
         * @apiPermission platform
         * @apiProfile common
         * @apiPrivate
         *
         * @apiParam {String} screenId Screen ID for log message formatting.
         * @apiParam {String} event Event for log message formatting.
         * @apiParam {String} detail Detail message for log.
         * @apiParam {Function} [onErrorCallback] Optional. Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage:
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         * window.scplugin.analyticsLog.insert(screenId, event, detail, onErrorCallback);
         *
         */
        insert: function(screenId, event, detail, onerror) {
            var cmd = "scpluginProdAnalyticsLogInsert";
            var args = {};
            args.callbackName = "__onNMProdAnalyticsLogInsert";
            args.screenId = screenId;
            args.event = event;
            args.detail = detail;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, null, onerror);
            } catch (e) {
                var err = new _APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        }
    };

    /**
     * @api Service
     * @apiName Service
     * @apiGroup Service
     * @apiDescription The Service object contains information about service and interface for a plugin to interact with the endpoint app.
     * @apiVersion 1.1.0
     * @apiPermission public
     * @apiProfile service
     *
     * @apiSuccess (Property) {String} serviceHandle Unique local ID.
     * @apiSuccess (Property) {JSON} extraData Extra data received from launcher.
     *
     * @apiExample {js} Example usage:
     * // Assume service object has been obtained by using scplugin.manager.getService() method.
     * var handle = service.serviceHandle;
     * var extraData = service.extraData;
     *
     */
    var Service = function(args) {
        this.getsendRequestFunc = null;
        Object.defineProperties(this, {
            serviceHandle: {
                value: args.serviceHandle,
                writable: false,
                enumerable: true
            },
            extraData: {
                value: args.extraData,
                writable: false,
                enumerable: true
            }
        });
    }

    Service.prototype = {
        /**
         * @api Service.subscribe(onServiceEventCallback) void subscribe()
         * @apiName subscribe()
         * @apiGroup Service
         * @apiDescription Subscribes for data changes of endpoint app.
         * Note that Only one callback can be registered. If a callback reference is registered several times, only the last registered callback is available.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiParam {Function} onServiceEventCallback Receive updates event from the endpoint app.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onServiceEventCallback(result, event) {
         *     if (result == "SUCCESS") {
         *         // Do something...
         *     }
         * }
         *
         * service.subscribe(onServiceEventCallback);
         *
         */
        subscribe: function(callback) {
            var cmd = "scpluginServiceSubscribe";
            var args = {};
            args.id = this.serviceHandle;
            args.callbackName = "__onNMServiceEventCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.serviceHandle, args, callback);
            } catch (e) {}
        },
        /**
         * @api Service.unsubscribe() void unsubscribe()
         * @apiName unsubscribe()
         * @apiGroup Service
         * @apiDescription Unsubscribes to endpoint app event changes.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * service.unsubscribe();
         *
         */
        unsubscribe: function() {
            var cmd = "scpluginServiceUnsubscribe";
            var args = {};
            args.id = this.serviceHandle;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginServiceSubscribe" + this.serviceHandle, args);
            } catch (e) {}
        },
        /**
         * @api Service.sendRequest(payload,onServiceResponseCallback) void sendRequest()
         * @apiName sendRequest()
         * @apiGroup Service
         * @apiDescription Requests operation to endpoint app.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiParam {JSON} payload Data to be requested to endpoint app
         * @apiParam {Function} onServiceResponseCallback Receives response from endpoint app.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onServiceResponseCallback(result, response) {
         *     if (result == "SUCCESS") {
         *         console.log("received data : " + response);
         *     }
         * }
         *
         * var payload = { "method":"GET",
         *     "uri":"/devices/8dbedsa-23d5-9df9-f9e8-0dsaf0ef0d0/consumption?from=1519199156000&to=1520411667000",
         *     "locale":"en-US"
         * };
         * service.sendRequest(payload, onServiceResponseCallback);
         *
         */
        sendRequest: function (payload, callback) {
            var cmd = "scpluginServiceExecution";
            var args = {};
            args.id = this.serviceHandle;
            args.payload = payload;
            args.callbackName = "__onNMServiceResponseCallback";
            args.cmd = cmd;

            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) { }
        },
        /**
         * @api Service.launchConfiguration(onServiceConfigurationCallback) void launchConfiguration()
         * @apiName launchConfiguration()
         * @apiGroup Service
         * @apiDescription Launches configuration page.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiParam {Function} onServiceConfigurationCallback Receives finish state of configuration.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onServiceConfigurationCallback(result) {
         *     if (result == "SUCCESS") {
         *         // Do something...
         *     }
         * }
         *
         * service.launchConfiguration(onServiceConfigurationCallback);
         *
         */
        launchConfiguration: function(callback) {
            var cmd = "scpluginServiceLaunchConfiguration";
            var args = {};
            args.id = this.serviceHandle;
            args.callbackName = "__onNMServiceConfigurationCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api Service.launchDevicePlugin(deviceId,onLaunchPluginCallback,onErrorCallback,extraData) void launchDevicePlugin()
         * @apiName launchDevicePlugin()
         * @apiGroup Service
         * @apiDescription Launches device detail page.
         * @apiVersion 1.1.1
         * @apiPermission platform
         * @apiProfile service
         * @apiPrivate
         *
         * @apiParam {String} deviceId Unique device ID.
         * @apiParam {Function} onLaunchPluginCallback Receives finish state of launching device detail page.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         * @apiParam {JSON} [extraData] Optional. Extra data to send.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onLaunchPluginCallback(deviceId) {
         *     console.log("The Device plugin has launched successfully. : " + deviceId);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * service.launchDevicePlugin(deviceId, onLaunchPluginCallback, onErrorCallback, extraData);
         */
        launchDevicePlugin: function(deviceId, onsuccess, onerror, extraData) {
            var cmd = "scpluginProdLaunchDevicePlugin";
            var args = {};
            args.callbackName = "__onNMProdLaunchPluginCallback";
            args.deviceId = deviceId;
            args.extraData = extraData;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new _APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api Service.getLocationNickname(onLocationNicknameCallback,onErrorCallback) void getLocationNickname()
         * @apiName getLocationNickname()
         * @apiGroup Service
         * @apiDescription Gets location nickname
         * @apiVersion 1.1.1
         * @apiPermission platform
         * @apiProfile service
         * @apiPrivate
         *
         * @apiParam {Function} onLocationNicknameCallback Receives Location nickname.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} SecurityError if the plugin does not have the permission to call this method.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onLocationNicknameCallback(nickname) {
         *     console.log("Location nickname: " + nickname);
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * service.getLocationNickname(onLocationNicknameCallback, onErrorCallback);
         */
        getLocationNickname: function(onsuccess, onerror) {
            var cmd = "scpluginProdGetLocationNickname";
            var args = {};
            args.callbackName = "__onNMProdLocationNicknameCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new _APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
        /**
         * @api Service.shareText(text,onShareTextCallback,onErrorCallback) void shareText()
         * @apiName shareText()
         * @apiGroup Service
         * @apiDescription Shares text data to other application.
         * @apiVersion 1.2.0
         * @apiPermission public
         * @apiProfile service
         *
         * @apiParam {String} text The text data to be shared.
         * @apiParam {Function} onShareTextCallback Invokes when text sharing request has been completed.
         * @apiParam {Function} onErrorCallback Receives the error object when an error occurs.
         *
         * @apiError (Error) {APIError} NotSupportedError if this feature is not supported.
         * @apiError (Error) {APIError} UnknownError if any other error occurs.
         *
         * @apiExample {js} Example usage: Service plugin
         * // Assume service object has been obtained by using scplugin.manager.getService() method.
         * function onShareTextCallback() {
         *     console.log("Text sharing request has been sent successfully");
         * }
         * function onErrorCallback(error) {
         *     console.log("error name: " + error.name + " message: " + error.message);
         * }
         *
         * service.shareText("Hello, I'm granting you access to my Home's Front door. Here are the details. 50845646",
         *     onShareTextCallback, onErrorCallback);
         */
        shareText: function(text, onsuccess, onerror) {
            var cmd = "scpluginServiceShareText";
            var args = {};
            args.callbackName = "__onNMServiceShareTextCallback";
            args.cmd = cmd;
            args.text = text;
            try {
                window.scplugin._scPluginNative.call(cmd, args, onsuccess, onerror);
            } catch (e) {
                var err = new _APIError("NotSupportedError", "This feature is not supported.");
                onerror(err);
            }
        },
    }

    /**
     * @api OCFDevice
     * @apiName OCFDevice
     * @apiGroup OCFDevice
     * @apiDescription The OCFDevice object contains information about devices and interface for a plugin to interact with the cloud server.
     * @apiVersion 1.1.0
     * @apiPermission public
     * @apiProfile device
     *
     * @apiSuccess (Property) {String} deviceHandle Unique local ID.
     * @apiSuccess (Property) {String} deviceType DeviceType Uri.
     * @apiSuccess (Property) {String} deviceName Device name.
     * @apiSuccess (Property) {[String]} resourceUris All resource URIs of device.
     * @apiSuccess (Property) {String} locationId Location Id of device.
     * @apiSuccess (Property) {String} locationName Location name of device.
     * @apiSuccess (Property) {String} owner Device permission of user. ("me" or "others")
     * @apiSuccess (Property) {String} firmwareVersion Device firmware version.
     * @apiSuccess (Property) {JSON} metaData UIMetadata of device.
     * @apiSuccess (Property) {JSON} extraData Extra data received from launcher. The extraData is supported since v1.1.0.
     *
     * @apiExample {js} Example usage: Device plugin
     * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
     * var handle = ocfdevice.deviceHandle;
     * var uris = ocfdevice.resourceUris;
     *
     */
    var OCFDevice = function(args) {
        Object.defineProperties(this, {
            deviceHandle: {
                value: args.deviceHandle,
                writable: false,
                enumerable: true
            },
            deviceType: {
                value: args.deviceType,
                writable: false,
                enumerable: true
            },
            deviceName: {
                value: args.deviceName,
                writable: false,
                enumerable: true
            },
            resourceUris: {
                value: args.resourceUris,
                writable: false,
                enumerable: true
            },
            locationId: {
                value: args.locationId,
                writable: false,
                enumerable: true
            },
            locationName: {
                value: args.locationName,
                writable: false,
                enumerable: true
            },
            owner: {
                value: args.owner,
                writable: false,
                enumerable: true
            },
            firmwareVersion: {
                value: args.firmwareVersion,
                writable: false,
                enumerable: true
            },
            metaData: {
                value: args.metaData,
                writable: false,
                enumerable: true
            },
            extraData: {
                value: args.extraData,
                writable: false,
                enumerable: true
            }
        });
    };

    OCFDevice.prototype = {
        /**
         * @api OCFDevice.subscribe(onRepresentCallback,uris) void subscribe()
         * @apiName subscribe()
         * @apiGroup OCFDevice
         * @apiDescription Subscribes for data changes of the device.
         * Note that Only one callback per OCFDevice object can be registered. If a callback reference is registered several times, only the last registered callback is available.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onRepresentCallback Receives updates from the server.
         * @apiParam {[String]} [uris] Optional. Resource URI for subscription. By default this parameter is set to all resources URIs.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onRepresentCallback(result, deviceHandle, uri, representation) {
         *     if (result == "OCF_OK") {
         *         if (uri == "/switch/main/0") {
         *             // Do something...
         *         }
         *     }
         * }
         *
         * // All the resources URIs
         * ocfdevice.subscribe(onRepresentCallback);
         *
         * // Given resource URIs
         * var uris = ["/switch/main/0", "/thermostatSetpoint/main/0"];
         * ocfdevice.subscribe(onRepresentCallback, uris);
         *
         */
        subscribe: function(callback, uris) {
            var cmd = "scpluginSubscribe";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMRepresentCallback";
            args.uris = uris;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.deviceHandle, args, callback);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.unsubscribe() void unsubscribe()
         * @apiName unsubscribe()
         * @apiGroup OCFDevice
         * @apiDescription Unsubscribes to device attribute changes. All resource URIs are unsubscribed.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * ocfdevice.unsubscribe();
         *
         */
        unsubscribe: function() {
            var cmd = "scpluginUnsubscribe";
            var args = {};
            args.id = this.deviceHandle;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginSubscribe" + this.deviceHandle, args);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.getRemoteRepresentation(uri,onRepresentCallback) void getRemoteRepresentation()
         * @apiName getRemoteRepresentation()
         * @apiGroup OCFDevice
         * @apiDescription Gets representation from resource of the device.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {String} uri Resource URI.
         * @apiParam {Function} onRepresentCallback Receives updated representation from the server.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onRepresentCallback(result, deviceHandle, uri, representation) {
         *     if (result == "OCF_OK") {
         *         if (representation["power"] == "on") {
         *             // Do something...
         *         }
         *     }
         * }
         *
         * ocfdevice.getRemoteRepresentation("/switch/main/0", onRepresentCallback);
         *
         */
        getRemoteRepresentation: function(uri, callback) {
            var cmd = "scpluginGetRemoteRepresentation";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMRepresentCallback";
            args.uri = uri;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.setRemoteRepresentation(uri,jsonObject,onRepresentCallback) void setRemoteRepresentation()
         * @apiName setRemoteRepresentation()
         * @apiGroup OCFDevice
         * @apiDescription Sets resource representation on the device.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {String} uri Resource URI.
         * @apiParam {Object} jsonObject Representation to be set on device.
         * @apiParam {Function} onRepresentCallback Receives updated representation from the server.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onRepresentCallback(result, deviceHandle, uri, representation) {
         *     if (result == "OCF_RESOURCE_CHANGED") {
         *         if (representation["power"] == "off") {
         *             console.log("Switch Off : OK");
         *         }
         *     }
         * }
         *
         * var setRcsJson = {};
         * setRcsJson.power = "off";
         * ocfdevice.setRemoteRepresentation("/switch/main/0", setRcsJson, onRepresentCallback);
         *
         */
        setRemoteRepresentation: function(uri, jsonObject, callback) {
            var cmd = "scpluginSetRemoteRepresentation";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMRepresentCallback";
            args.uri = uri;
            args.rcsRepJson = jsonObject;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.call(cmd, args, callback);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.startMonitoringConnectionState(onMonitoringStateCallback) void startMonitoringConnectionState()
         * @apiName startMonitoringConnectionState()
         * @apiGroup OCFDevice
         * @apiDescription Monitors device connection state [CONNECTED/DISCONNECTED] on cloud.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiParam {Function} onMonitoringStateCallback Receives updates from the server.
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * function onMonitoringStateCallback(result, deviceHandle, state) {
         *     if (result == "OCF_OK") {
         *         if (state == "CONNECTED") {
         *             // Do something...
         *         } else if (state == "DISCONNECTED") {
         *             // Do something...
         *         } else if (state == "INACTIVE") {
         *             // Do something...
         *         } else if (state == "UNKNOWN") {
         *             // Do something...
         *         }
         *     }
         * }
         *
         * ocfdevice.startMonitoringConnectionState(onMonitoringStateCallback);
         */
        startMonitoringConnectionState: function(callback) {
            var cmd = "scpluginStartMonitoringConnectionState";
            var args = {};
            args.id = this.deviceHandle;
            args.callbackName = "__onNMMonitoringStateCallback";
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.addListener(cmd, cmd + this.deviceHandle, args, callback);
            } catch (e) {}
        },
        /**
         * @api OCFDevice.stopMonitoringConnectionState() void stopMonitoringConnectionState()
         * @apiName stopMonitoringConnectionState()
         * @apiGroup OCFDevice
         * @apiDescription Stops monitoring device state on cloud.
         * @apiVersion 1.1.0
         * @apiPermission public
         * @apiProfile device
         *
         * @apiExample {js} Example usage: Device plugin
         * // Assume ocfdevice object has been obtained by using scplugin.manager.getOCFDevices() method.
         * ocfdevice.stopMonitoringConnectionState();
         *
         */
        stopMonitoringConnectionState: function() {
            var cmd = "scpluginStopMonitoringConnectionState";
            var args = {};
            args.id = this.deviceHandle;
            args.cmd = cmd;
            try {
                window.scplugin._scPluginNative.removeListener(cmd, "scpluginStartMonitoringConnectionState" + this.deviceHandle, args);
            } catch (e) {}
        },
    };

    /**
     * @api APIError
     * @apiName APIError
     * @apiGroup APIError
     * @apiDescription Generic error interface
     * @apiVersion 1.1.0
     *
     * @apiSuccess (Property) {String} name An error type.
     * @apiSuccess (Property) {String} message An error message that describes the details of the error encountered.
     */
    var _APIError = function(name, message) {
        var _name = 0;
        var _message = "Unknown error";

        if (name) {
            _name = name;
        }

        if (message) {
            _message = message;
        }

        // attributes
        Object.defineProperties(this, {
            name: { value: _name, writable: false, enumerable: true },
            message: { value: _message, writable: false, enumerable: true }
        });
        return this;
    };

    _APIError.prototype = new Error();
    _APIError.prototype.constructor = _APIError;

    var _scplugin = function() {
        this.manager = new manager();
        this.log = new log();
        this._scPluginNative = new NativeManager();
        this._APIError = new _APIError();
        this.analyticsLog = new AnalyticsLog();
    }
    _scplugin.prototype._getOCFDevices = function(devices) {
        var deviceList = new Array();
        for (var i in devices) {
            deviceList.push(new OCFDevice(devices[i]));
        }
        return deviceList;
    };
    _scplugin.prototype._getService = function(service) {
        return new Service(service);
    };

    window.scplugin = new _scplugin();
})(window, document);

/**
 * @apiDefine OCF_RESULT OCF_RESULT
 * @apiError (result) OCF_OK Success status code
 * @apiError (result) OCF_ERROR Operation failed
 * @apiError (result) OCF_RESOURCE_CHANGED Resource has been changed successfully
 * @apiError (result) OCF_INVALID_PARAM Invalid parameter
 */

/**
 * @apiDefine REQUEST_RESULT REQUEST_RESULT
 * @apiError (result) SUCCESS Successful
 * @apiError (result) SECURITY_ERR Permission denied
 * @apiError (result) INVALID_PARAM_ERR Invalid parameter
 * @apiError (result) NOT_SUPPORTED_ERR Not supported feature
 * @apiError (result) UNKNOWN_ERR Unknown error
 */

/**
 * @apiDefine APP_LINK_TYPE APP_LINK_TYPE
 * @apiError (AppLinkType) {String} SAMSUNGPAY_REWARD_MAIN For reward main page of SamsungPay
 * @apiError (AppLinkType) {String} PLAYSTORE_SAMSUNGPAY For SamsungPay page of Play Store
 */

/**
 * @apiDefine APP_NAME_TYPE APP_NAME_TYPE
 * @apiError (AppNameType) {String} SAMSUNGPAY The application name of SamsungPay
 */

// For Callback Function Definition
/**
 * @api onRepresentCallback(result,deviceHandle,uri,representation) void onRepresentCallback()
 * @apiName onRepresentCallback
 * @apiGroup Device Callback Function
 * @apiDescription Gets response from cloud.
 * @apiVersion 1.0.0
 *
 * @apiParam {String} result Result of the request. "OCF_OK" when there is no problem, appropriate error code otherwise.
 * @apiParam {String} deviceHandle Unique local device ID from which representation received.
 * @apiParam {String} uri URI of resource from which representation received.
 * @apiParam {JSON} representation Representation received from server.
 *
 * @apiUse OCF_RESULT
 *
 * @apiExample {js} Callback Function - Example usage: Device plugin
 * function onRepresentCallback(result, deviceHandle, uri, representation) {
 *     if (result == "OCF_OK") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onMonitoringStateCallback(result,deviceHandle,state) void onMonitoringStateCallback()
 * @apiName onMonitoringStateCallback
 * @apiGroup Device Callback Function
 * @apiDescription Gets device connection state from cloud.
 * @apiVersion 1.0.0
 *
 * @apiParam {String} result Result of the request. "OCF_OK" when there is no problem, appropriate error code otherwise.
 * @apiParam {String} deviceHandle Unique local device ID from which representation received.
 * @apiParam {String} state Device connection state from device.
 *                                "CONNECTED" / "DISCONNECTED" / "UNKNOWN" / "INACTIVE"
 *
 * @apiUse OCF_RESULT
 *
 * @apiExample {js} Callback Function - Example usage: Device plugin
 * function onMonitoringStateCallback(result, deviceHandle, state) {
 *     if (result == "OCF_OK") {
 *         if (state == "CONNECTED") {
 *             // Do something...
 *         } else if (state == "DISCONNECTED") {
 *             // Do something...
 *         } else if (state == "INACTIVE") {
 *             // Do something...
 *         } else if (state == "UNKNOWN") {
 *             // Do something...
 *         }
 *     }
 * }
 *
 */

/**
 * @api onPluginDataCallback(key,value) void onPluginDataCallback()
 * @apiName onPluginDataCallback
 * @apiGroup Common Callback Function
 * @apiDescription Gets plugin data from data table.
 * @apiVersion 1.0.0
 *
 * @apiParam {String} key The key to search mapped data.
 * @apiParam {String} value The value assigned to the requested key. Note that if the key is not found, null is passed.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onPluginDataCallback(key, value) {
 *    if (value != null) {
 *       console.log(" key: " + key + " value: " + value );
 *    } else {
 *       console.log(" key: " + key + " > NOT FOUND VALUE");
 *    }
 * }
 *
 */

/**
 * @api onApplicationStateCallback(state) void onApplicationStateCallback()
 * @apiName onApplicationStateCallback
 * @apiGroup Common Callback Function
 * @apiDescription Gets application state.
 * @apiVersion 1.0.0
 *
 * @apiParam {String} state Current state of the application.
 *                                "ACTIVE" / "BACKGROUND"
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onApplicationStateCallback(state) {
 *     if (state == "ACTIVE") {
 *         // Do something...
 *     } else if (state == "BACKGROUND") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onCloudConnectionStateCallback(state) void onCloudConnectionStateCallback()
 * @apiName onCloudConnectionStateCallback
 * @apiGroup Common Callback Function
 * @apiDescription Gets cloud connection state.(Sign in/Sign out).
 * @apiVersion 1.0.0
 *
 * @apiParam {String} state Cloud connection state. If the connection state is 'DISCONNECTED', the OCFDevice and Service api will not work.
 *                                "CONNECTED" / "DISCONNECTED"
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onCloudConnectionStateCallback(state) {
 *     if (state == "CONNECTED") {
 *         // Do something...
 *     } else if (state == "DISCONNECTED") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onOCFDevicesCallback(devices) void onOCFDevicesCallback()
 * @apiName onOCFDevicesCallback
 * @apiGroup Device Callback Function
 * @apiDescription Gets device list.
 * @apiVersion 1.0.0
 *
 * @apiParam {[OCFDevice]} devices The OCFDevice object list.
 *
 * @apiExample {js} Callback Function - Example usage: Device plugin
 * function onOCFDevicesCallback(devices) {
 *    for (var i in devices) {
 *       console.log("deviceHandle: " + devices[i].deviceHandle);
 *       console.log("deviceName: " + devices[i].deviceName);
 *       console.log("deviceType: " + devices[i].deviceType);
 *       console.log("metadata: " + devices[i].metadata);
 *    }
 * }
 *
 * scplugin.manager.getOCFDevices(onOCFDevicesCallback);
 */

/**
 * @api onServiceCallback(service) void onServiceCallback()
 * @apiName onServiceCallback
 * @apiGroup Service Callback Function
 * @apiDescription Gets service object.
 * @apiVersion 1.1.0
 *
 * @apiParam {Service} service The Service object.
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onServiceCallback(service) {
 *    console.log("serviceHandle: " + service.serviceHandle);
 * }
 *
 * scplugin.manager.getService(onServiceCallback);
 */

/**
 * @api onServiceEventCallback(result,event) void onServiceEventCallback()
 * @apiName onServiceEventCallback
 * @apiGroup Service Callback Function
 * @apiDescription Gets event data from endpoint app.
 * @apiVersion 1.1.0
 *
 * @apiParam {String} result Result of the request. "SUCCESS" when there is no problem, appropriate error code otherwise.
 * @apiParam {JSON} event Event receives from endpoint app.
 *
 * @apiUse REQUEST_RESULT
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onServiceEventCallback(result, event) {
 *     if (result == "SUCCESS") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onServiceResponseCallback(result,response) void onServiceResponseCallback()
 * @apiName onServiceResponseCallback
 * @apiGroup Service Callback Function
 * @apiDescription Gets the response data from endpoint app.
 * @apiVersion 1.1.0
 *
 * @apiParam {String} result Result of the request. "SUCCESS" when there is no problem, appropriate error code otherwise.
 * @apiParam {JSON} response Response User defined data received from endpoint app.
 *
 * @apiUse REQUEST_RESULT
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onServiceResponseCallback(result, response) {
 *     if (result == "SUCCESS") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onServiceConfigurationCallback(result) void onServiceConfigurationCallback()
 * @apiName onServiceConfigurationCallback
 * @apiGroup Service Callback Function
 * @apiDescription Gets the state of configuration.
 * @apiVersion 1.1.0
 *
 * @apiParam {String} result Result of the request. "SUCCESS" when there is no problem, appropriate error code otherwise.
 *
 * @apiUse REQUEST_RESULT
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onServiceConfigurationCallback(result) {
 *     if (result == "SUCCESS") {
 *         // Do something...
 *     }
 * }
 *
 */

/**
 * @api onSAAuthCodeCallback(result,authCode,authUrl,apiUrl,state) void onSAAuthCodeCallback()
 * @apiName onSAAuthCodeCallback
 * @apiGroup Common Callback Function
 * @apiDescription Gets authCode and URL.
 * @apiVersion 1.1.0
 *
 * @apiParam {String} result Result of the request. "SUCCESS" when there is no problem, appropriate error code otherwise.
 * @apiParam {String} authCode The auth code.
 * @apiParam {String} authUrl Auth Server URI of endpoint to exchange access token.
 * @apiParam {String} apiUrl API Server URI of endpoint for HTTP request.
 * @apiParam {String} state The state send back from account server.
 *
 * @apiUse REQUEST_RESULT
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onSAAuthCodeCallback(result, authCode, authUrl, apiUrl, state) {
 *     if (result == "SUCCESS") {
 *         console.log("authCode: " + authCode + " authUrl: " + authUrl + " apiUrl: " + apiUrl + " state: " + state);
 *     }
 * }
 *
 */

/**
 * @api onErrorCallback(error) void onErrorCallback()
 * @apiName onErrorCallback
 * @apiGroup Common Callback Function
 * @apiDescription Method that is invoked when an error occurs.
 * @apiVersion 1.1.0
 *
 * @apiParam {APIError} error Generic error.
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onErrorCallback(error) {
 *     console.log("error name: " + error.name + " message: " + error.message);
 * }
 *
 */

/**
 * @api onIsApplicationInstalledCallback(appNameType,state) void onIsApplicationInstalledCallback()
 * @apiName onIsApplicationInstalledCallback
 * @apiGroup Common Callback Function
 * @apiDescription Method invoked when the invocation ends successfully.
 * @apiVersion 1.1.1
 * @apiPrivate
 *
 * @apiParam {AppNameType} appNameType Application name of the corresponding operation.
 * @apiParam {Boolean} state true if application is installed, otherwise false if the application is not installed.
 *
 * @apiUse APP_NAME_TYPE
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onIsApplicationInstalledCallback(appNameType, state) {
 *     console.log("isApplicationInstalled : " + state);
 * }
 *
 */

/**
 * @api onLaunchApplicationCallback(appLinkType) void onLaunchApplicationCallback()
 * @apiName onLaunchApplicationCallback
 * @apiGroup Common Callback Function
 * @apiDescription Method invoked when the invocation ends successfully.
 * @apiVersion 1.1.1
 * @apiPrivate
 *
 * @apiParam {AppLinkType} appLinkType AppLink Type of the corresponding operation.
 *
 * @apiUse APP_LINK_TYPE
 *
 * @apiExample {js} Callback Function - Example usage:
 * function onLaunchApplicationCallback(appLinkType) {
 *     console.log("The application has launched successfully. : " + appLinkType);
 * }
 *
 */

/**
 * @api onLaunchPluginCallback(deviceId) void onLaunchPluginCallback()
 * @apiName onLaunchPluginCallback
 * @apiGroup Service Callback Function
 * @apiDescription Method invoked when the invocation ends successfully.
 * @apiVersion 1.1.1
 * @apiPrivate
 *
 * @apiParam {String} deviceId Unique device ID of the corresponding operation.
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onLaunchPluginCallback(deviceId) {
 *     console.log("The Device plugin has launched successfully. : " + deviceId);
 * }
 *
 */

/**
 * @api onLocationNicknameCallback(nickname) void onLocationNicknameCallback()
 * @apiName onLocationNicknameCallback
 * @apiGroup Service Callback Function
 * @apiDescription Gets Location nickname.
 * @apiVersion 1.1.1
 * @apiPrivate
 *
 * @apiParam {String} nickname The Location nickname.
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onLocationNicknameCallback(nickname) {
 *     console.log("Location nickname: " + nickname);
 * }
 *
 */

/**
 * @api onShareTextCallback() void onShareTextCallback()
 * @apiName onShareTextCallback
 * @apiGroup Service Callback Function
 * @apiDescription Method invoked when text sharing request has been completed.
 * @apiVersion 1.2.0
 *
 * @apiExample {js} Callback Function - Example usage: Service plugin
 * function onShareTextCallback() {
 *     console.log("Text sharing request has been sent successfully");
 * }
 *
 */
