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
describe("cordova capture", function () {
    var capture = require('ripple/platform/cordova/2.0.0/bridge/capture'),
        event = require('ripple/event'),
        camera = require('ripple/ui/plugins/camera');

    beforeEach(function () {
        spyOn(camera, "show");
        spyOn(event, "once").andCallThrough();
    });

    describe("when capturing an image", function () {
        it("it shows the camera when called", function () {
            capture.captureImage();
            expect(camera.show).toHaveBeenCalledWith('image');
        });

        it("registers for the captured-image event once", function () {
            capture.captureImage();
            expect(event.once).toHaveBeenCalledWith("captured-image", jasmine.any(Function));
        });

        it("doesn't trigger the success or error callbacks", function () {
            var win = jasmine.createSpy("win"),
                fail = jasmine.createSpy("fail");

            capture.captureImage(win, fail);

            expect(win).not.toHaveBeenCalled();
            expect(fail).not.toHaveBeenCalled();
        });
    });
    
    describe("when capturing a video", function () {
        it("it shows the camera when called", function () {
            capture.captureVideo();
            expect(camera.show).toHaveBeenCalledWith('video');
        });

        it("registers for the captured-image event once", function () {
            capture.captureVideo();
            expect(event.once).toHaveBeenCalledWith("captured-video", jasmine.any(Function));
        });

        it("doesn't trigger the success or error callbacks", function () {
            var win = jasmine.createSpy("win"),
                fail = jasmine.createSpy("fail");

            capture.captureVideo(win, fail);

            expect(win).not.toHaveBeenCalled();
            expect(fail).not.toHaveBeenCalled();
        });
    });

    describe("when capturing sound", function () {
        it("it shows the camera when called", function () {
            capture.captureAudio();
            expect(camera.show).toHaveBeenCalledWith('audio');
        });

        it("registers for the captured-audio event once", function () {
            capture.captureAudio();
            expect(event.once).toHaveBeenCalledWith("captured-audio", jasmine.any(Function));
        });

        it("doesn't trigger the success or error callbacks", function () {
            var win = jasmine.createSpy("win"),
                fail = jasmine.createSpy("fail");

            capture.captureAudio(win, fail);

            expect(win).not.toHaveBeenCalled();
            expect(fail).not.toHaveBeenCalled();
        });
    });

    describe("when the captured-image event is fired", function () {
        it("calls the success callback", function () {
            var win = jasmine.createSpy("win"),
                fail = jasmine.createSpy("fail"),
                image = {};

            capture.captureImage(win, fail);
            event.trigger("captured-image", ["path", image], true);

            expect(win).toHaveBeenCalledWith([image]);
        });
    });

    describe("when the captured-video event is fired", function () {
        it("calls the success callback", function () {
            var win = jasmine.createSpy("win"),
                fail = jasmine.createSpy("fail"),
                video = {};

            capture.captureVideo(win, fail);
            event.trigger("captured-video", ["path", video], true);

            expect(win).toHaveBeenCalledWith([video]);
        });
    });

    describe("when the captured-audio event is fired", function () {
        it("calls the success callback", function () {
            var win = jasmine.createSpy("win"),
                fail = jasmine.createSpy("fail"),
                song = {};

            capture.captureAudio(win, fail);
            event.trigger("captured-audio", ["path", song], true);

            expect(win).toHaveBeenCalledWith([song]);
        });
    });
});
