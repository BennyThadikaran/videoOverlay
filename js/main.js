var vidPlugin = (function() {
  var v = document.getElementById("video"),

      init = function(obj) {
        var init;

        generateHTML(obj);

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

      generateHTML = function(obj) {
        var keys = Object.keys(obj),
            overlay = document.getElementById("vid-plugin-overlay"),
            a,
            img,
            frag = document.createDocumentFragment();

        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            a = createEl("a", { href: obj[key].Link, id: obj[key].start });
            img = createEl("img", {src: obj[key].Image, alt: obj[key].Name});
            a.appendChild(img);
            frag.appendChild(a);
          }
        }
        overlay.appendChild(frag);
      },

      createEl = function (elem, attributes, text) {
          var el = document.createElement(elem);

          if (typeof attributes === "object") {
              for (var attr in attributes) {
                  el.setAttribute(attr, attributes[attr]);
              }
          }

          if (text) el.textContent = text;
          return el;
      },

      hideOverlay = function() {
        var itemsToClear = document.getElementsByClassName("viewable");

        if (itemsToClear.length) {
          // clear out visible overlays
          itemsToClear[0].className = "";
        }
      },

      showOverlay = function(id) {
        // bring the popups in view
        hideOverlay();
        document.getElementById(id).className = "viewable";
      },

      activateOverlay = function(obj) {
        // get the current time
        var t = v.currentTime,
            keys = Object.keys(obj);

        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (t >= obj[key].start && t <= obj[key].end) {
              showOverlay(obj[key].start);
            }
          }
        }
        if (t >= obj[key].end) {
          hideOverlay();
        }
      };

      return {
        init: init
      }
}());

window.onload = function() {
  vidPlugin.init({
    0:{
      Name: "Item 1",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 1,
      end: 5
    },
    1:{
      Name: "Item 2",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 7,
      end: 11
    }
  });
}
