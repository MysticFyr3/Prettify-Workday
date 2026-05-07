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

  // src/core/registry.js
  function registerEnhancer({ selector, handler, key }) {
    enhancers.push({ selector, handler, key });
  }
  function processNode(node) {
    if (node.nodeType !== 1) return;
    for (const { selector, handler, key } of enhancers) {
      const attr = `wdEnhanced_${key}`;
      if (node.matches?.(selector) && !node.dataset[attr]) {
        node.dataset[attr] = "true";
        handler(node);
      }
      node.querySelectorAll?.(selector).forEach((el) => {
        if (el.dataset[attr]) return;
        el.dataset[attr] = "true";
        handler(el);
      });
    }
  }
  function startObserver() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(processNode);
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    processNode(document.body);
  }
  var enhancers;
  var init_registry = __esm({
    "src/core/registry.js"() {
      enhancers = [];
    }
  });

  // src/enhancers/table.js
  var require_table = __commonJS({
    "src/enhancers/table.js"() {
      init_registry();
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
        background-color: #fff !important;
    }

    .wd-table-wrapper [data-automation-id="row"]:nth-child(even) td {
        background-color: #f6f8fa !important;
    }

    .wd-table-wrapper [data-automation-id="row"]:hover td {
        background-color: #eaf0fb !important;
    }

    .wd-table-wrapper [data-automation-id="row"]:focus-within td {
        background-color: #eaf0fb !important;
        outline: none !important;
    }

    .wd-table-wrapper [data-automation-id="cell"]:focus,
    .wd-table-wrapper [data-automation-id="cell"]:focus-visible {
        outline: none !important;
        background-color: inherit !important;
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
        injectGlobalStyles();
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
      registerEnhancer({
        selector: '[data-automation-id="tableWrapper"]',
        handler: enhanceTable,
        key: "table"
      });
    }
  });

  // src/enhancers/tableCurrentCourses.js
  var require_tableCurrentCourses = __commonJS({
    "src/enhancers/tableCurrentCourses.js"() {
      init_registry();
      function getHeaderText(th) {
        const span = th.querySelector("button span:first-child");
        return span?.textContent.trim().toLowerCase() ?? th.textContent.trim().toLowerCase();
      }
      function isTargetTable(wrapper) {
        const headers = wrapper.querySelectorAll('[data-automation-id="tableHead"] th');
        return Array.from(headers).some((th) => getHeaderText(th).includes("course listing"));
      }
      function removeColumns(wrapper) {
        const headerRow = wrapper.querySelector('[data-automation-id="tableHead"] tr');
        if (!headerRow) return;
        const headers = Array.from(headerRow.querySelectorAll("th"));
        const targetIndex = headers.findIndex((th) => getHeaderText(th).includes("course listing"));
        if (targetIndex === -1) return;
        headers[targetIndex].remove();
        wrapper.querySelectorAll('[data-automation-id="row"]').forEach((row) => {
          const cells = row.querySelectorAll("td");
          if (cells[targetIndex]) cells[targetIndex].remove();
        });
      }
      function combineDeliveryColumns(wrapper) {
        const headerRow = wrapper.querySelector('[data-automation-id="tableHead"] tr');
        if (!headerRow) return;
        const headers = Array.from(headerRow.querySelectorAll("th"));
        const formatIndex = headers.findIndex((th) => getHeaderText(th).includes("instructional format"));
        const modeIndex = headers.findIndex((th) => getHeaderText(th).includes("delivery mode"));
        if (formatIndex === -1 || modeIndex === -1) return;
        headers[modeIndex].remove();
        wrapper.querySelectorAll('[data-automation-id="row"]').forEach((row) => {
          const cells = row.querySelectorAll("td");
          const formatCell = cells[formatIndex];
          const modeCell = cells[modeIndex];
          if (!formatCell || !modeCell) return;
          const format = formatCell.textContent.trim();
          const mode = modeCell.textContent.trim().replace(/ Learning$/i, "");
          formatCell.textContent = `${format} (${mode})`;
          modeCell.remove();
        });
      }
      function enhanceCurrentCourses(wrapper) {
        if (!isTargetTable(wrapper)) return;
        removeColumns(wrapper);
        combineDeliveryColumns(wrapper);
      }
      registerEnhancer({
        selector: '[data-automation-id="tableWrapper"]',
        handler: enhanceCurrentCourses,
        key: "currentCourses"
      });
    }
  });

  // src/enhancers/fieldSet.js
  var require_fieldSet = __commonJS({
    "src/enhancers/fieldSet.js"() {
      init_registry();
      var styles = `
    .wd-fieldset-card {
        margin-bottom: 16px;
        font-family: var(--cnvs-sys-font-family-default), Arial, sans-serif;
        font-size: 14px;
        border: 1px solid #d0d7de;
        border-radius: 8px;
        overflow: hidden;
    }

    .wd-fieldset-title {
        font-size: 15px;
        font-weight: bold;
        color: #fff;
        background-color: #1f3a5f;
        padding: 10px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    /* Hide Workday's own legend heading \u2014 we replace it */
    .wd-fieldset-card [data-automation-id="fieldSetLegendHeading"] {
        display: none !important;
    }

    /* Hide the expand/collapse chevron button \u2014 card is always open */
    .wd-fieldset-card .WF-N[role="button"] {
        display: none !important;
    }

    .wd-fieldset-rows {
        padding: 4px 0;
    }

    /* Each label/value row */
    .wd-fieldset-card li.WLSF {
        display: grid !important;
        grid-template-columns: 180px 1fr !important;
        align-items: baseline !important;
        padding: 7px 14px !important;
        border-bottom: 1px solid #f0f4f8 !important;
        gap: 12px !important;
    }

    .wd-fieldset-card li.WLSF:last-child {
        border-bottom: none !important;
    }

    .wd-fieldset-card li.WLSF:nth-child(even) {
        background-color: #f6f8fa !important;
    }

    /* Label column */
    .wd-fieldset-card [data-automation-id="formLabel"] {
        font-weight: 600 !important;
        color: #57606a !important;
        font-size: 12px !important;
        text-transform: uppercase !important;
        letter-spacing: 0.04em !important;
        white-space: nowrap !important;
        /* hide the duplicate aria-hidden ghost label Workday renders */
    }

    .wd-fieldset-card .WATF[aria-hidden="true"] {
        display: none !important;
    }

    /* Value column */
    .wd-fieldset-card [data-automation-id="decorationWrapper"] {
        color: #1f2328 !important;
        font-size: 14px !important;
    }

    /* Plain text values */
    .wd-fieldset-card [data-automation-id="textView"] {
        font-size: 14px !important;
    }

    /* Rich text prose */
    .wd-fieldset-card [data-automation-id="richTextContent"] .ProseMirror {
        font-size: 13px !important;
        color: #444 !important;
        line-height: 1.5 !important;
    }

    /* Pill/moniker items \u2014 just show cleanly as comma-separated text */
    .wd-fieldset-card [data-automation-id="selectedItemList"] {
        list-style: none !important;
        padding: 0 !important;
        margin: 0 !important;
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 6px !important;
    }

    .wd-fieldset-card [data-automation-id="menuItem"] {
        background: #e8f0fe !important;
        border: 1px solid #c5d5f5 !important;
        border-radius: 4px !important;
        padding: 2px 8px !important;
        font-size: 13px !important;
    }

    /* Hide related-actions (...) buttons in read-only view \u2014 they clutter things */
    .wd-fieldset-card [data-automation-id="relatedIconContainer"] {
        display: none !important;
    }

    /* Hide rows with no label text (orphaned link rows) */
    .wd-fieldset-card li.WLSF.wd-no-label {
        display: none !important;
    }
`;
      function injectFieldSetStyles() {
        if (document.getElementById("wd-fieldset-styles")) return;
        const style = document.createElement("style");
        style.id = "wd-fieldset-styles";
        style.textContent = styles;
        document.head.appendChild(style);
      }
      function enhanceFieldSet(fieldSetBody) {
        injectFieldSetStyles();
        const titleEl = fieldSetBody.querySelector('[data-automation-id="fieldSetLegendLabel"]');
        const title = titleEl?.textContent.trim() ?? "";
        const card = document.createElement("div");
        card.className = "wd-fieldset-card";
        fieldSetBody.parentElement.insertBefore(card, fieldSetBody);
        card.appendChild(fieldSetBody);
        if (title) {
          const titleBar = document.createElement("div");
          titleBar.className = "wd-fieldset-title";
          titleBar.textContent = title;
          card.insertBefore(titleBar, card.firstChild);
        }
        fieldSetBody.querySelectorAll("li.WLSF").forEach((row) => {
          const label = row.querySelector('[data-automation-id="formLabel"]');
          if (!label?.textContent.trim()) {
            row.classList.add("wd-no-label");
          }
        });
      }
      registerEnhancer({
        selector: '[data-automation-id="fieldSetBody"]',
        handler: enhanceFieldSet,
        key: "fieldSet"
      });
    }
  });

  // src/content.js
  var require_content = __commonJS({
    "src/content.js"() {
      init_registry();
      var import_table = __toESM(require_table());
      var import_tableCurrentCourses = __toESM(require_tableCurrentCourses());
      var import_fieldSet = __toESM(require_fieldSet());
      console.log("INFO: Prettify Workday loaded successfully.");
      startObserver();
    }
  });
  require_content();
})();
