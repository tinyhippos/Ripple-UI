/*
 *  Copyright 2011 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var notifications = require('ripple/client/notifications'),
    _console = require('ripple/client/console'),
    goodVibrations = require('ripple/client/ui/plugins/goodVibrations');

module.exports = {
    alert: function (message) {
        notifications.openNotification("normal", message);
    },

    beep: function (times) {
        for (var i = times; i > 0; i--) {
            _console.log("beep!");
        }
        notifications.openNotification("normal", "BEEP x " + times);
    },

    vibrate: function (milliseconds) {
        milliseconds = milliseconds || 500;
        goodVibrations.vibrateDevice(milliseconds);
    }
};