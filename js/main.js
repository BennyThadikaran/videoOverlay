var vidPlugin = (function() {
  var v = document.getElementById("video"),

      init = function(obj) {
        var wrapper = document.getElementById("wrapper");

        generateHTML(obj);

        wrapper.addEventListener("click", runModal);

        v.addEventListener("play", function() {

          // run activateOverlay function every second
          int = setInterval(function() {
            activateOverlay(obj);
          }, 1000);
          wrapper.className = "wrapper wrapper-hide";

          v.addEventListener("pause", function() {
            clearInterval(int);
            wrapper.className = "wrapper wrapper-show scale-up-hor-right";
          });
        });
      },

      runModal = function(e) {
          e.preventDefault();
          var modal = document.getElementById("vid-plugin-modal");
          var close = document.getElementById("vid-plugin-modal-close");

          // pause the video
          v.pause();

          modal.style.display = "block";
          close.addEventListener("click", function() {
            close.parentElement.style.display = "none";
            v.play();
          });
          return false;
      },

      generateHTML = function(obj) {
        var keys = Object.keys(obj),
            overlay = document.getElementById("vid-plugin-overlay"),
            a,
            img,
            span,
            frag = document.createDocumentFragment();

        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            a = createEl("a", { href: "#", id: key});
            img = createEl("img", {src: obj[key].Image, alt: obj[key].Name, id: key});
            span = createEl("span", {}, obj[key].Name)
            a.appendChild(img);
            a.appendChild(span)
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
        var a = document.getElementById(id);
        hideOverlay();
        a.className = "viewable";
      },

      activateOverlay = function(obj) {
        // get the current time
        var t = v.currentTime,
            keys = Object.keys(obj);

        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (t >= obj[key].start && t <= obj[key].end) {
              showOverlay(key);
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
    },
    2:{
      Name: "Item 3",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 8,
      end: 12
    },
    3:{
      Name: "Item 4",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 13,
      end: 15
    },
    4:{
      Name: "Item 5",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 16,
      end: 18
    },
    5:{
      Name: "Item 6",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 19,
      end: 22
    },
    6:{
      Name: "Item 7",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 23,
      end: 25
    },
    7:{
      Name: "Item 8",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 26,
      end: 28
    },
    8:{
      Name: "Item 9",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 29,
      end: 30
    },
    8:{
      Name: "Item 10",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 31,
      end: 34
    },
    9:{
      Name: "Item 11",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 35,
      end: 37
    },
    10:{
      Name: "Item 12",
      Image: "https://via.placeholder.com/45",
      Link: "https://amazon.in",
      start: 38,
      end: 40
    }
  });
}
