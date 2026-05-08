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
      var styles2 = `
    .wd-table-wrapper {
        margin-bottom: 16px;
        font-family: var(--cnvs-sys-font-family-default), Arial, sans-serif;
        font-size: 13px;
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

    /* Increased column title font size and weight */
    .wd-table-wrapper [data-automation-id="tableHead"] th,
    .wd-table-wrapper [data-automation-id="tableHead"] th * {
        background-color: #2c4f7c !important;
        color: #fff !important;
        border: none !important;
        font-size: 13.5px !important;
        font-weight: 500 !important;
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

    /* \u2500\u2500\u2500 Pill/Moniker styling (Instructors, Course Sections) \u2500\u2500\u2500 */
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="selectedItemList"] {
        list-style: none !important;
        padding: 0 !important;
        margin: 0 !important;
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 6px !important;
    }

    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="menuItem"] {
        background: #e8f0fe !important;
        border: 1px solid #c5d5f5 !important;
        border-radius: 4px !important;
        padding: 2px 8px !important;
    }

    /* Target the actual text inside pills (Instructor Names) */
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="promptOption"] {
        font-size: 13px !important;
    }

    /* Hide related-actions buttons inside table cells */
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="relatedIconContainer"] {
        display: none !important;
    }

    /* \u2500\u2500\u2500 Specialized Text Views (Numbers, Totals) \u2500\u2500\u2500 */
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="numericText"],
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="subtotalValue"],
    .wd-table-wrapper [data-automation-id="cellContainer"] > div[title],
    .wd-table-wrapper [data-automation-id="cellContainer"] > div > div[title] {
        font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
        font-size: 13px !important;
    }

    /* Date textView \u2014 class on the element itself, survives td replacement */
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="textView"].wd-date-value {
        font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
        font-size: 13px !important;
    }

    /* "Total:" label text */
    .wd-table-wrapper [data-automation-id="cell"] span:has(+ [data-automation-id="subtotalValue"]) {
        font-size: 13.5px !important;
        color: #57606a !important;
        font-weight: 500 !important;
    }

    /* Subtotal value */
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="subtotalValue"] {
        font-size: 13px !important;
    }

    /* \u2500\u2500\u2500 Specialized Text Views (Numbers, Totals, and Standard Text) \u2500\u2500\u2500 */
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="numericText"],
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="subtotalValue"],
    .wd-table-wrapper [data-automation-id="cellContainer"] > div[title],
    .wd-table-wrapper [data-automation-id="cellContainer"] > div > div[title] {
        font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
        font-size: 13px !important;
    }

    /* Target standard textView elements inside table cells (like "School address") */
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="textView"] {
        font-size: 13px !important;
        color: #1f2328 !important;
    }
`;
      function injectGlobalStyles() {
        if (document.getElementById("wd-enhancer-styles")) return;
        const style = document.createElement("style");
        style.id = "wd-enhancer-styles";
        style.textContent = styles2;
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
      function enhanceMeetingPatterns2(wrapper) {
        wrapper.querySelectorAll('[data-automation-id="promptOption"]').forEach((el) => {
          const text = el.getAttribute("title") || el.textContent.trim();
          if (!/^\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}/.test(text)) return;
          el.textContent = parseMeetingPattern(text);
          el.setAttribute("title", text);
        });
      }
      var DATE = /\d{4}-\d{2}-\d{2}/;
      function classifyCell(cell) {
        const textView = cell.querySelector('[data-automation-id="textView"]');
        if (!textView) return;
        if (DATE.test(textView.textContent.trim())) {
          textView.classList.add("wd-date-value");
        }
      }
      function classifyTableCells(wrapper) {
        wrapper.querySelectorAll('[data-automation-id="cell"]').forEach(classifyCell);
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
        enhanceMeetingPatterns2(wrapper);
        classifyTableCells(wrapper);
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
              if (node.nodeType === 1) {
                const cell = node.closest?.('[data-automation-id="cell"]') ?? (node.matches?.('[data-automation-id="cell"]') ? node : null);
                if (cell) {
                  console.log("[wd] cell replaced, outerHTML:", cell.outerHTML.slice(0, 200));
                }
              }
            }
          }
        });
        observer.observe(wrapper, { childList: true, subtree: true });
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

  // src/enhancers/pageFields.js
  function injectPageFieldStyles() {
    if (document.getElementById("wd-page-fields-styles")) return;
    const style = document.createElement("style");
    style.id = "wd-page-fields-styles";
    style.textContent = styles;
    document.head.appendChild(style);
  }
  function enhanceMeetingPatterns(fieldSetBody) {
    fieldSetBody.querySelectorAll('[data-automation-id="promptOption"]').forEach((el) => {
      const text = el.getAttribute("title") || el.textContent.trim();
      if (!/\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}/.test(text)) return;
      if (!text.includes("|")) return;
      el.textContent = parseMeetingPatternField(text);
      el.setAttribute("title", text);
    });
  }
  function parseMeetingPatternField(text) {
    const parts = text.split("|").map((p) => p.trim());
    const timeIndex = parts.findIndex((p) => /\d+:\d+ - \d+:\d+/.test(p));
    if (timeIndex === -1) return text;
    const days = parts[timeIndex - 1] ?? "";
    const time = parts[timeIndex];
    const buildingMatch = parts[1]?.match(/\(([^)]+)\)/);
    const building = buildingMatch ? buildingMatch[1] : null;
    const roomPart = parts.find((p) => p.startsWith("Room:"));
    const room = roomPart ? roomPart.replace("Room:", "").trim() : null;
    const location = [building, room].filter(Boolean).join(" ");
    return location ? `${days} \u2502 ${time} \u2502 ${location}` : `${days} \u2502 ${time}`;
  }
  function enhancePageFieldsList(ul) {
    injectPageFieldStyles();
    const rows = ul.querySelectorAll("li.WLSF");
    if (!rows.length) return;
    const wrapper = document.createElement("div");
    wrapper.className = "wd-page-fields";
    ul.parentElement.insertBefore(wrapper, ul);
    wrapper.appendChild(ul);
    enhanceMeetingPatterns(ul);
    rows.forEach((row) => {
      const label = row.querySelector('[data-automation-id="formLabel"]');
      if (!label?.textContent.trim()) {
        row.classList.add("wd-no-label");
      }
    });
    const DATE = /\d{4}-\d{2}-\d{2}/;
    const NUMBER = /^[\d,]+(\.\d+)?( of \d+)?$/;
    ul.querySelectorAll('[data-automation-id="decorationWrapper"]').forEach((dw) => {
      const text = dw.textContent.trim();
      const isDrillDown = dw.querySelector('[data-automation-id="drillDownNumberLabel"]');
      if (DATE.test(text)) {
        dw.classList.add("wd-date-value");
      } else if (NUMBER.test(text) || isDrillDown) {
        dw.classList.add("wd-number-value");
      }
    });
  }
  function enhancePageFields(ul) {
    if (ul.closest('[data-automation-id="fieldSetBody"], [data-automation-id="tableWrapper"], [data-automation-id="cell"], .wd-page-fields, .wd-fieldset-card')) return;
    const rows = ul.querySelectorAll("li.WLSF");
    if (!rows.length) return;
    const hasFormLabels = ul.querySelector('[data-automation-id="formLabel"]');
    if (!hasFormLabels) return;
    enhancePageFieldsList(ul);
  }
  var styles;
  var init_pageFields = __esm({
    "src/enhancers/pageFields.js"() {
      init_registry();
      styles = `
    .wd-page-fields {
        margin-bottom: 16px;
        font-family: var(--cnvs-sys-font-family-default), Arial, sans-serif;
        font-size: 14px;
        border: 1px solid #d0d7de;
        border-radius: 8px;
        overflow: hidden;
    }

    .wd-page-fields li.WLSF:not(td *) {
        display: grid !important;
        grid-template-columns: minmax(140px, 40%) 1fr !important;
        align-items: center !important;
        padding: 8px 14px !important;
        border-bottom: 1px solid #f0f4f8 !important;
        gap: 8px !important;
        width: auto !important;
        min-width: 0 !important;
    }

    .wd-page-fields li.WLSF:not(td *):last-child {
        border-bottom: none !important;
    }

    .wd-page-fields li.WLSF:not(td *):nth-child(even) {
        background-color: #f6f8fa !important;
    }

    .wd-page-fields li.WLSF:not(td *) > :first-child {
        display: block !important;
        width: auto !important;
        min-width: 0 !important;
        position: static !important;
    }

    .wd-page-fields [data-automation-id="formLabel"] {
        display: block !important;
        font-weight: 600 !important;
        color: #57606a !important;
        font-size: 12.5px !important;
        letter-spacing: 0.05em !important;
        white-space: normal !important;
        text-transform: uppercase !important;
    }

    .wd-page-fields li.WLSF:not(td *) [aria-hidden="true"] {
        display: none !important;
    }

    .wd-page-fields li.WLSF:not(td *) > [data-automation-id="decorationWrapper"] {
        display: block !important;
        width: auto !important;
        min-width: 0 !important;
        position: static !important;
        color: #1f2328 !important;
        font-size: 13px !important;
        font-weight: 400 !important;
    }

    .wd-page-fields [data-automation-id="richTextContent"] .ProseMirror {
        font-size: 14px !important;
        color: #444 !important;
        line-height: 1.5 !important;
        font-family: inherit !important;
    }

    .wd-page-fields [data-automation-id="selectedItemList"] {
        list-style: none !important;
        padding: 0 !important;
        margin: 0 !important;
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 6px !important;
    }

    .wd-page-fields [data-automation-id="menuItem"] {
        background: #e8f0fe !important;
        border: 1px solid #c5d5f5 !important;
        border-radius: 4px !important;
        padding: 2px 8px !important;
        font-size: 14px !important;
    }

    .wd-page-fields [data-automation-id="relatedIconContainer"] {
        display: none !important;
    }

    /* Mono logic for numbers/dates (Updated to include drillDownNumberLabel) */
    .wd-page-fields .wd-date-value,
    .wd-page-fields .wd-number-value,
    .wd-page-fields .wd-date-value [data-automation-id="textView"],
    .wd-page-fields .wd-number-value [data-automation-id="textView"],
    .wd-page-fields li.WLSF [data-automation-id="numericText"],
    [data-automation-id="drillDownNumberLabel"] {
        font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
        font-size: 14px !important;
        font-weight: 500 !important;
    }

    .wd-page-fields li.WLSF.wd-no-label:not(td *) {
        display: none !important;
    }

    /* Plain text rows */
    .wd-page-fields [data-automation-id="textView"] {
        font-size: 14px !important;
        color: #1f2328 !important;
    }

    .wd-page-fields li.WLSF [data-automation-id="textView"] {
        font-size: 14px !important;
        color: #1f2328 !important;
        font-weight: 400 !important;
    }
`;
      registerEnhancer({
        selector: "ul.WBUF",
        handler: enhancePageFields,
        key: "pageFields"
      });
    }
  });

  // src/enhancers/fieldSet.js
  var require_fieldSet = __commonJS({
    "src/enhancers/fieldSet.js"() {
      init_registry();
      init_pageFields();
      var styles2 = `
    .wd-fieldset-card {
        margin-bottom: 16px;
        font-family: var(--cnvs-sys-font-family-default), Arial, sans-serif;
        font-size: 14px;
        border: 1px solid #d0d7de;
        border-radius: 8px;
    }

    .wd-fieldset-title {
        font-size: 15px;
        font-weight: bold;
        color: #fff;
        padding: 10px 14px;
        border-radius: 8px 8px 0 0;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
    }

    .wd-fieldset-title .wd-chevron {
        transition: transform 0.2s ease;
        flex-shrink: 0;
        opacity: 0.8;
    }

    .wd-fieldset-title.wd-collapsed .wd-chevron {
        transform: rotate(-90deg);
    }

    /* Depth-based title colours */
    .wd-fieldset-card[data-wd-depth="0"] .wd-fieldset-title { background-color: #1f3a5f; }
    .wd-fieldset-card[data-wd-depth="1"] .wd-fieldset-title { background-color: #2c5282; }
    .wd-fieldset-card[data-wd-depth="2"] .wd-fieldset-title { background-color: #2b6cb0; }
    .wd-fieldset-card[data-wd-depth="3"] .wd-fieldset-title { background-color: #3182ce; }

    /* Depth-based indentation */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] {
        padding: 5px; 
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    /* Hide Workday's original header row */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] > .WG-N {
        display: none !important;
    }

    .wd-fieldset-card > [data-automation-id="fieldSetBody"] [data-automation-id="fieldSetLegendHeading"] {
        display: none !important;
    }

    /* Each row: two-column grid \u2014 only outside table cells */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] li.WLSF:not(td *) {
        display: grid !important;
        grid-template-columns: minmax(140px, 40%) 1fr !important;
        align-items: center !important;
        padding: 8px 14px !important;
        border-bottom: 1px solid #f0f4f8 !important;
        gap: 8px !important;
        width: auto !important;
        min-width: 0 !important;
    }

    .wd-fieldset-card > [data-automation-id="fieldSetBody"] li.WLSF:not(td *):last-child {
        border-bottom: none !important;
    }

    .wd-fieldset-card > [data-automation-id="fieldSetBody"] li.WLSF:not(td *):nth-child(even) {
        background-color: #f6f8fa !important;
    }

    /* Label cell */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] li.WLSF:not(td *) > :first-child {
        display: block !important;
        width: auto !important;
        min-width: 0 !important;
        position: static !important;
    }

    .wd-fieldset-card > [data-automation-id="fieldSetBody"] li.WLSF:not(td *) [data-automation-id="formLabel"] {
        display: block !important;
        font-weight: 600 !important;
        color: #57606a !important;
        font-size: 12.5px !important;
        letter-spacing: 0.05em !important;
        white-space: normal !important;
        text-transform: uppercase !important;
    }

    /* Hide the duplicate aria-hidden ghost label */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] li.WLSF:not(td *) [aria-hidden="true"] {
        display: none !important;
    }

    /* Value cell */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] li.WLSF:not(td *) > [data-automation-id="decorationWrapper"] {
        display: block !important;
        width: auto !important;
        min-width: 0 !important;
        position: static !important;
        color: #1f2328 !important;
        font-size: 13px !important;
        font-weight: 400 !important;
    }

    /* Dates \u2014 mono */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-date-value,
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-date-value [data-automation-id="textView"] {
        font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
        font-size: 14px !important;
        font-weight: 500 !important;
    }

    /* Numbers \u2014 mono (Updated to include drillDownNumberLabel) */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-number-value,
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-number-value [data-automation-id="textView"],
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] li.WLSF [data-automation-id="numericText"],
    [data-automation-id="drillDownNumberLabel"] {
        font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
        font-size: 14px !important;
        font-weight: 500 !important;
    }

    /* Rich text prose */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] [data-automation-id="richTextContent"] .ProseMirror {
        font-size: 14px !important;
        color: #444 !important;
        line-height: 1.5 !important;
        font-family: inherit !important;
    }

    /* Pill/moniker items */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] [data-automation-id="selectedItemList"] {
        list-style: none !important;
        padding: 0 !important;
        margin: 0 !important;
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 6px !important;
    }

    .wd-fieldset-card > [data-automation-id="fieldSetBody"] [data-automation-id="menuItem"] {
        background: #e8f0fe !important;
        border: 1px solid #c5d5f5 !important;
        border-radius: 4px !important;
        padding: 2px 8px !important;
        font-size: 14px !important;
    }

    /* Hide related-actions buttons */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] [data-automation-id="relatedIconContainer"] {
        display: none !important;
    }

    /* Hide no-label rows */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] li.WLSF.wd-no-label:not(td *) {
        display: none !important;
    }

    /* Plain text */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] [data-automation-id="textView"] {
        font-size: 14px !important;
        color: #1f2328 !important;
    }
`;
      function injectFieldSetStyles() {
        if (document.getElementById("wd-fieldset-styles")) return;
        const style = document.createElement("style");
        style.id = "wd-fieldset-styles";
        style.textContent = styles2;
        document.head.appendChild(style);
      }
      function getFieldSetDepth(el) {
        let depth = 0;
        let current = el.parentElement;
        while (current) {
          if (current.dataset?.automationId === "fieldSetBody" || current.classList?.contains("wd-fieldset-card")) {
            depth++;
          }
          current = current.parentElement;
        }
        return depth;
      }
      function enhanceMeetingPatterns2(fieldSetBody) {
        fieldSetBody.querySelectorAll('[data-automation-id="promptOption"]').forEach((el) => {
          const text = el.getAttribute("title") || el.textContent.trim();
          if (!/\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}/.test(text)) return;
          if (!text.includes("|")) return;
          el.textContent = parseMeetingPatternField2(text);
          el.setAttribute("title", text);
        });
      }
      function parseMeetingPatternField2(text) {
        const parts = text.split("|").map((p) => p.trim());
        const timeIndex = parts.findIndex((p) => /\d+:\d+ - \d+:\d+/.test(p));
        if (timeIndex === -1) return text;
        const days = parts[timeIndex - 1] ?? "";
        const time = parts[timeIndex];
        const buildingMatch = parts[1]?.match(/\(([^)]+)\)/);
        const building = buildingMatch ? buildingMatch[1] : null;
        const roomPart = parts.find((p) => p.startsWith("Room:"));
        const room = roomPart ? roomPart.replace("Room:", "").trim() : null;
        const location = [building, room].filter(Boolean).join(" ");
        return location ? `${days} \u2502 ${time} \u2502 ${location}` : `${days} \u2502 ${time}`;
      }
      function enhanceFieldSet(fieldSetBody) {
        if (fieldSetBody.closest('[data-automation-id="tableWrapper"], [data-automation-id="row"], [data-automation-id="cell"]')) return;
        const titleEl = fieldSetBody.querySelector('[data-automation-id="fieldSetLegendLabel"]');
        const title = titleEl?.textContent.trim() ?? "";
        if (!title) {
          fieldSetBody.querySelectorAll(':scope > [data-automation-id="fieldSetContent"] ul.WBUF').forEach((ul) => {
            if (ul.closest(".wd-page-fields, .wd-fieldset-card")) return;
            if (!ul.querySelector('[data-automation-id="formLabel"]')) return;
            enhancePageFieldsList(ul);
          });
          return;
        }
        injectFieldSetStyles();
        const isExpanded = fieldSetBody.getAttribute("data-automation-formlabelexpanded") === "true";
        const depth = Math.min(getFieldSetDepth(fieldSetBody), 3);
        const card = document.createElement("div");
        card.className = "wd-fieldset-card";
        card.dataset.wdDepth = depth;
        fieldSetBody.parentElement.insertBefore(card, fieldSetBody);
        card.appendChild(fieldSetBody);
        const titleBar = document.createElement("div");
        titleBar.className = "wd-fieldset-title" + (isExpanded ? "" : " wd-collapsed");
        titleBar.innerHTML = `
        <svg class="wd-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path fill-rule="nonzero" d="M3.143 8.596a.5.5 0 0 1 .002-.701l.747-.748a.493.493 0 0 1 .7-.002L12 14.556l7.406-7.41a.5.5 0 0 1 .632-.057l.069.058.748.748a.494.494 0 0 1 0 .7l-8.505 8.512a.492.492 0 0 1-.7 0Z" fill="currentColor"/>
        </svg>
        <span>${title}</span>
    `;
        card.insertBefore(titleBar, fieldSetBody);
        titleBar.addEventListener("click", () => {
          const wdToggle = fieldSetBody.querySelector('.WF-N[role="button"]');
          wdToggle?.click();
          titleBar.classList.toggle("wd-collapsed");
        });
        fieldSetBody.querySelectorAll("li.WLSF").forEach((row) => {
          const label = row.querySelector('[data-automation-id="formLabel"]');
          if (!label?.textContent.trim()) {
            row.classList.add("wd-no-label");
          }
        });
        enhanceMeetingPatterns2(fieldSetBody);
        const DATE = /\d{4}-\d{2}-\d{2}/;
        const NUMBER = /^[\d,]+(\.\d+)?( of \d+)?$/;
        fieldSetBody.querySelectorAll('[data-automation-id="decorationWrapper"]').forEach((wrapper) => {
          const text = wrapper.textContent.trim();
          const isDrillDown = wrapper.querySelector('[data-automation-id="drillDownNumberLabel"]');
          if (DATE.test(text)) {
            wrapper.classList.add("wd-date-value");
          } else if (NUMBER.test(text) || isDrillDown) {
            wrapper.classList.add("wd-number-value");
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
      init_pageFields();
      console.log("INFO: Prettify Workday loaded successfully.");
      startObserver();
    }
  });
  require_content();
})();
