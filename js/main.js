var vidPlugin = (function() {
  var v = document.getElementById("video"),

      init = function(obj) {
        var init;

        v.addEventListener("play", function() {
          // run activateOverlay function every second
          int = setInterval(function() {
            activateOverlay(obj);
          }, 1000);

          v.addEventListener("pause", function() {
            clearInterval(int);
          });
        });
      },

      showOverlay = function(id) {

        var itemsToClear = document.getElementsByClassName("viewable");

        if (itemsToClear.length) {
          // clear out existing pop ups
          itemsToClear[0].className = "";
        }

        // bring the popups in view
        document.getElementById(id).className = "viewable";
      },

      activateOverlay = function(obj) {
        // get the current time
        var t = v.currentTime,
            keys = Object.keys(obj);

        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (t >= obj[key].start && t <= obj[key].end) {
              showOverlay("p1");
            }
          }
        }
      };

      return {
        init: init
      }
}());

window.onload = function() {
  vidPlugin.init({a:{start: 1, end: 5}, b: 2});
}
