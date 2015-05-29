/**
 * 就是一个带声音的norify
 * @sherlock221b
 */

(function() {

    'use strict';

angular.module("angular-audio-notify",[])

    .service("AudioNotify",function(){
        var  notifyMe = function() {
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            }
            else if (Notification.permission === "granted") {
            }
            else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    if (permission === "granted") {
                    }
                });
            }
        }


        var audioNotifyList  = [];

        function audioNotify(title,obj) {
            function playSound(soundFile) {
                if(soundFile === undefined) return;
                var audio = document.createElement('audio');
                audio.src = soundFile;
                audio.play();
                //audio = undefined;
            }


            var notification = new window.Notification(title, {
                body: obj.body,
                icon: obj.icon
            });

            notification.onshow = function () {
                playSound(obj.soundFile);
            }

            //audioNotifyList.push(notification);

            return notification;

        }


        notifyMe();

        return audioNotify;

    });

})();