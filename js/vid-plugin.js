/******************************************************
*   Video Overlay JS plugin                           *
*  -JS Module pattern                                 *
*  -Uses the youtube api - player object              *
*  -The player object (available in the Global scope) *
*   provides all relevant video actions               *
*******************************************************/
var vidPlugin = (function() {
  var data,

  // ------------ EDITABLE CONTANTS ------------
      panel = document.getElementById("vid-plugin-panel"),
      prefix = "vid-plugin-",
      showPanelClass = "panel js-panel-show scale-up-hor-right",
      hidePanelClass = "panel js-panel-hide",
      viewableClass = "js-viewable",
      overlayWrapperClass = prefix + "overlay",
      overlayClass = prefix + "overlay-",

      mouseTrapId = prefix + "mousetrap",

      // Modal
      ctaText = "BUY NOW",
      modalId = prefix + "modal",
      modalCloseId = prefix + "modal-close",
      closeClass = "close",
      detailsClass = "details",
      contentClass = "content",
      imgClass = "img",

  // ------------AVOID EDITING BEYOND THIS LINE ------------



      // helper function for generating HTML elements
      // returns HTML DOM element tag
      // @elem - tag name to be created,
      // @attributes - Element attributes, Object key: value pair (optional),
      // @text - text content (optional)
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

      showPanel = function() {
        panel.className = showPanelClass;
      },

      hidePanel = function() {
        panel.className = hidePanelClass;
      },

      // hides previously opened overlays
      hideOverlay = function() {
        var itemsToClear = document.getElementsByClassName(viewableClass);

        if (itemsToClear.length) {
          // clear out visible overlays
          itemsToClear[0].className = "";
        }
      },

      showOverlay = function(id) {
        // hide the previous overlay
        hideOverlay();

        var a = document.getElementById(overlayClass + id);
        a.className = viewableClass;
      },

      // compares elapsed time on video and activates relevant overlay
      activateOverlay = function() {
        // get the current time
        var t = player.getCurrentTime(),
            keys = Object.keys(data),
            // get the end time of the last overlay object
            lastOverlayEndTime = data[data.length -1].end;

        data.forEach(function(key, i) {
          if (t >= key.start && t <= key.end) {
            showOverlay(i);
          }
        });

        // remove the last overlay if its time has ended
        if (t >= lastOverlayEndTime) {
          hideOverlay();
        }
      },

      // generate HTML content for overlay
      generateOverlay = function() {
        var keys = Object.keys(data),
            overlay = document.getElementById(overlayWrapperClass),
            a,
            img,
            span,
            frag = document.createDocumentFragment();

        data.forEach(function(key, i) {
          a = createEl("a", {
            href: "#",
            id: overlayClass + i,
            "data-src": key.Image,
            "data-name": key.Name,
            "data-desc": key.Description
          });
          img = createEl("img", {src: key.Image, alt: key.Name, id: key});
          span = createEl("span", {}, key.Name)
          a.appendChild(img);
          a.appendChild(span)
          frag.appendChild(a);
        });

        overlay.appendChild(frag);
      },

      // dynamically generates HTML for Modal
      generateModal = function(el) {
        var modal = document.getElementById(modalId),
            closeBtn = createEl("span", {class: closeClass, id: modalCloseId}, "×"),
            contentDiv = createEl("div", {class: contentClass}),
            imgDiv = createEl("div", {class: imgClass}),
            detailsDiv = createEl("div", {class: detailsClass}),
            img = createEl("img", {src: el.dataset.src, alt: el.dataset.name}),
            itemName = createEl("p", {}, el.dataset.name),
            itemDesc = createEl("p", {}, el.dataset.desc),
            ctaBtn = createEl("button", {type: "button", name: "button"}, ctaText);

            imgDiv.appendChild(img);
            detailsDiv.appendChild(itemName);
            detailsDiv.appendChild(itemDesc);
            detailsDiv.appendChild(ctaBtn);
            contentDiv.appendChild(imgDiv);
            contentDiv.appendChild(detailsDiv);
            modal.appendChild(closeBtn);
            modal.appendChild(contentDiv);
      },

      // activates Modal for relevant product
      runModal = function(e) {
          e.preventDefault();

          var el = e.target.tagName === "A" ? e.target : e.target.parentElement;

          generateModal(el);

          var modal = document.getElementById(modalId);
          var close = document.getElementById(modalCloseId);

          // pause the video
          player.pauseVideo();

          modal.style.display = "block";
          close.addEventListener("click", function() {
            close.parentElement.style.display = "none";
            player.playVideo();
          });
          return false;
      },

      // initialises the plugin
      // expects array of objects as argument (overlay data)
      init = function(dataObj) {
        data = dataObj;

        generateOverlay();

        panel.addEventListener("click", runModal);
      },

      // Handler for events fired by Youtube api
      handler = function(e) {
        // playing
        if (e.data === 1) {
          var mousetrap = document.getElementById(mouseTrapId);

          // run activateOverlay function every second
          int = setInterval(function() {
            activateOverlay();
          }, 1000);
          hidePanel();

          mousetrap.addEventListener("mouseover", function() {
            player.pauseVideo();
            showPanel();
          });
        }

        // 2 - paused | 0 - Ended
        if (e.data === 2 || e.data === 0) {
          clearInterval(int);
          showPanel();
        }
      };

      return {
        init: init,
        handler: handler
      }
}());

window.onload = function() {
  // pass the relevant overlay data
  vidPlugin.init(dataObj);
}

// sample data for testing | Only for development
var dataObj = [
  {
    Name: "Overlay 1",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 1,
    end: 5
  },
  {
    Name: "Overlay 2",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 7,
    end: 11
  },
  {
    Name: "Overlay 3",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 8,
    end: 12
  },
  {
    Name: "Overlay 4",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 13,
    end: 15
  },
  {
    Name: "Overlay 5",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 16,
    end: 18
  },
  {
    Name: "Overlay 6",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 19,
    end: 22
  },
  {
    Name: "Overlay 7",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 23,
    end: 25
  },
  {
    Name: "Overlay 8",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 26,
    end: 28
  },
  {
    Name: "Overlay 9",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 29,
    end: 30
  },
  {
    Name: "Overlay 10",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 31,
    end: 34
  },
  {
    Name: "Overlay 11",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 35,
    end: 37
  },
  {
    Name: "Overlay 12",
    Image: "https://via.placeholder.com/45",
    Description: "ipsom Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start: 38,
    end: 40
  }
];
