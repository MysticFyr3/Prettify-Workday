(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/utils.js
  function onElementFound(selector, callback) {
    const observer = new MutationObserver(() => {
      document.querySelectorAll(selector).forEach((el) => {
        if (el.dataset.wdEnhanced) return;
        el.dataset.wdEnhanced = "true";
        callback(el);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll(selector).forEach((el) => {
      if (el.dataset.wdEnhanced) return;
      el.dataset.wdEnhanced = "true";
      callback(el);
    });
    return () => observer.disconnect();
  }
  var init_utils = __esm({
    "src/utils.js"() {
    }
  });

  // src/enhancers/table.js
  var require_table = __commonJS({
    "src/enhancers/table.js"() {
      init_utils();
      var styles = `
    .wd-table-wrapper {
        margin-bottom: 16px;
        font-family: var(--cnvs-sys-font-family-default), Arial, sans-serif;
        font-size: 14px;
        border: 1px solid #d0d7de;
        border-radius: 8px;
        overflow: hidden;
    }

    .wd-table-title {
        font-size: 15px;
        font-weight: bold;
        color: #fff;
        background-color: #1f3a5f;
        padding: 10px 14px;
    }

    .wd-table-wrapper [data-automation-id="gridToolbar"] {
        background-color: #f0f4f8 !important;
        padding: 6px 10px !important;
        border-bottom: 1px solid #d0d7de !important;
    }

    .wd-table-wrapper [data-automation-id="gridTitleLabel"] {
        display: none !important;
    }

    .wd-table-wrapper [data-automation-id="tableHeaderRow"] {
        background-color: #2c4f7c !important;
    }

    .wd-table-wrapper [data-automation-id="tableHead"] th,
    .wd-table-wrapper [data-automation-id="tableHead"] th * {
        background-color: #2c4f7c !important;
        color: #fff !important;
        border: none !important;
    }

    .wd-table-wrapper [data-automation-id="row"] td {
        padding: 10px 14px !important;
        border: none !important;
        vertical-align: middle !important;
    }

    .wd-table-wrapper [data-automation-id="row"] td:first-child {
        border-left: none !important;
    }

    .wd-table-wrapper [data-automation-id="row"]:nth-child(even) td {
        background-color: #f6f8fa !important;
    }

    .wd-table-wrapper [data-automation-id="row"]:hover td {
        background-color: #eaf0fb !important;
    }

    /* kill Workday's persistent focus highlight on clicked cells */
    .wd-table-wrapper [data-automation-id="cell"]:focus,
    .wd-table-wrapper [data-automation-id="cell"]:focus-within,
    .wd-table-wrapper [data-automation-id="cell"][tabindex]:focus {
        background-color: inherit !important;
        outline: none !important;
    }

    .wd-table-wrapper [data-automation-id="tableFooter"] {
        padding: 6px 14px !important;
        background-color: #f0f4f8 !important;
        border-top: 1px solid #d0d7de !important;
        font-size: 13px !important;
        color: #666 !important;
    }

    .wd-table-wrapper caption {
        display: none !important;
    }
`;
      function injectGlobalStyles() {
        if (document.getElementById("wd-enhancer-styles")) return;
        const style = document.createElement("style");
        style.id = "wd-enhancer-styles";
        style.textContent = styles;
        document.head.appendChild(style);
      }
      function parseMeetingPattern(text) {
        const parts = text.split("|").map((p) => p.trim());
        if (parts.length < 4) return text;
        const days = parts[1];
        const time = parts[2];
        const buildingPart = parts[4] || "";
        const buildingMatch = buildingPart.match(/\(([^)]+)\)/);
        const building = buildingMatch ? buildingMatch[1] : null;
        const roomPart = parts[parts.length - 1];
        const room = roomPart.startsWith("Room:") ? roomPart.replace("Room:", "").trim() : null;
        const location = [building, room].filter(Boolean).join(" ");
        return location ? `${days} \u2502 ${time} \u2502 ${location}` : `${days} \u2502 ${time}`;
      }
      function enhanceMeetingPatterns(wrapper) {
        wrapper.querySelectorAll('[data-automation-id="promptOption"]').forEach((el) => {
          const text = el.getAttribute("title") || el.textContent.trim();
          if (!/^\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}/.test(text)) return;
          el.textContent = parseMeetingPattern(text);
          el.setAttribute("title", text);
        });
      }
      function enhanceTable(wrapper) {
        const caption = wrapper.querySelector("caption");
        const title = caption ? caption.textContent.trim() : null;
        const container = document.createElement("div");
        container.className = "wd-table-wrapper";
        const rivaWidget = wrapper.closest('[data-automation-id="rivaWidget"]');
        if (rivaWidget) {
          rivaWidget.parentElement.insertBefore(container, rivaWidget);
          container.appendChild(rivaWidget);
        } else {
          wrapper.parentElement.insertBefore(container, wrapper);
          container.appendChild(wrapper);
        }
        if (title) {
          const titleBar = document.createElement("div");
          titleBar.className = "wd-table-title";
          titleBar.textContent = title;
          container.insertBefore(titleBar, container.firstChild);
        }
        enhanceMeetingPatterns(wrapper);
      }
      injectGlobalStyles();
      onElementFound('[data-automation-id="tableWrapper"]', enhanceTable);
    }
  });

  // src/content.js
  var require_content = __commonJS({
    "src/content.js"() {
      var import_table = __toESM(require_table());
      console.log("INFO: Prettify Workday loaded successfully.");
      var fonts = /* @__PURE__ */ new Set();
      document.querySelectorAll("*").forEach((el) => {
        const font = getComputedStyle(el).fontFamily;
        if (font) fonts.add(font);
      });
      console.log([...fonts]);
    }
  });
  require_content();
})();
