var vidPlugin = (function() {
  var data,
      player,

      hideOverlay = function() {
        var itemsToClear = document.getElementsByClassName("viewable");

        if (itemsToClear.length) {
          // clear out visible overlays
          itemsToClear[0].className = "";
        }
      },

      showOverlay = function(id) {
        // bring the popups in view
        var a = document.getElementById("overlay-" + id);
        hideOverlay();
        a.className = "viewable";
      },

      activateOverlay = function() {
        // get the current time
        var t = player.getDuration(),
            keys = Object.keys(data);

        for (key in data) {
          if (data.hasOwnProperty(key)) {
            if (t >= data[key].start && t <= data[key].end) {
              showOverlay(key);
            }
          }
        }
        if (t >= data[key].end) {
          hideOverlay();
        }
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

      generateModal = function(el) {
        var modal = document.getElementById("vid-plugin-modal"),
            closeBtn = createEl("span", {class: "close", id: "vid-plugin-modal-close"}, "×"),
            contentDiv = createEl("div", {class: "content"}),
            imgDiv = createEl("div", {class: "img"}),
            detailsDiv = createEl("div", {class: "details"}),
            img = createEl("img", {src: el.dataset.src, alt: el.dataset.name}),
            itemName = createEl("p", {}, el.dataset.name),
            itemDesc = createEl("p", {}, el.dataset.desc),
            ctaBtn = createEl("button", {type: "button", name: "button"}, "BUY NOW");

            imgDiv.appendChild(img);
            detailsDiv.appendChild(itemName);
            detailsDiv.appendChild(itemDesc);
            detailsDiv.appendChild(ctaBtn);
            contentDiv.appendChild(imgDiv);
            contentDiv.appendChild(detailsDiv);
            modal.appendChild(closeBtn);
            modal.appendChild(contentDiv);
      },

      runModal = function(e) {
          e.preventDefault();

          var el = e.target.tagName === "A" ? e.target : e.target.parentElement;

          generateModal(el);

          var modal = document.getElementById("vid-plugin-modal");
          var close = document.getElementById("vid-plugin-modal-close");

          // pause the video
          player.pauseVideo();

          modal.style.display = "block";
          close.addEventListener("click", function() {
            close.parentElement.style.display = "none";
            player.playVideo();
          });
          return false;
      },

      generateOverlay = function() {
        var keys = Object.keys(data),
            overlay = document.getElementById("vid-plugin-overlay"),
            a,
            img,
            span,
            frag = document.createDocumentFragment();

        for (key in data) {
          if (data.hasOwnProperty(key)) {
            a = createEl("a", {
              href: "#",
              id: "overlay-" + key,
              "data-src": data[key].Image,
              "data-name": data[key].Name,
              "data-desc": data[key].Description
            });
            img = createEl("img", {src: data[key].Image, alt: data[key].Name, id: key});
            span = createEl("span", {}, data[key].Name)
            a.appendChild(img);
            a.appendChild(span)
            frag.appendChild(a);
          }
        }
        overlay.appendChild(frag);
      },

      init = function(youtubeObj, dataObj) {
        data = dataObj;
        player = youtubeObj;

        var wrapper = document.getElementById("wrapper");

        generateOverlay();

        wrapper.addEventListener("click", runModal);
      },

      handler = function(e) {
        if (e.data === 1) {
          // if playing run activateOverlay function every second
          int = setInterval(function() {
            activateOverlay();
          }, 1000);
          wrapper.className = "wrapper wrapper-hide";
        }

        if (e.data === 2) {
          // paused
          clearInterval(int);
          wrapper.className = "wrapper wrapper-show scale-up-hor-right";
        }
      };

      return {
        init: init,
        handler: handler
      }
}());

window.onload = function() {
  vidPlugin.init(player, {
    0:{
      Name: "Item 1",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 1,
      end: 5
    },
    1:{
      Name: "Item 2",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 7,
      end: 11
    },
    2:{
      Name: "Item 3",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 8,
      end: 12
    },
    3:{
      Name: "Item 4",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 13,
      end: 15
    },
    4:{
      Name: "Item 5",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 16,
      end: 18
    },
    5:{
      Name: "Item 6",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 19,
      end: 22
    },
    6:{
      Name: "Item 7",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 23,
      end: 25
    },
    7:{
      Name: "Item 8",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 26,
      end: 28
    },
    8:{
      Name: "Item 9",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 29,
      end: 30
    },
    8:{
      Name: "Item 10",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 31,
      end: 34
    },
    9:{
      Name: "Item 11",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 35,
      end: 37
    },
    10:{
      Name: "Item 12",
      Image: "https://via.placeholder.com/45",
      Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      start: 38,
      end: 40
    }
  });
}
