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

    /* Pill/moniker values inside table cells */
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
        font-size: 13px !important;
    }

    /* Hide related-actions buttons inside table cells */
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="relatedIconContainer"] {
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
      var DATE = /\d{4}-\d{2}-\d{2}/;
      var NUMBER = /^\d+(\.\d+)?( of \d+)?$/;
      function classifyCell(cell) {
        cell.classList.remove("wd-cell-date", "wd-cell-number");
        if (cell.querySelector([
          '[data-automation-id="selectedItemList"]',
          '[data-automation-id="panel"]',
          '[data-automation-id="dropDownCommandButton"]'
        ].join(", "))) return;
        const text = cell.textContent.trim();
        if (!text) return;
        if (DATE.test(text)) {
          cell.classList.add("wd-cell-date");
        } else if (NUMBER.test(text)) {
          cell.classList.add("wd-cell-number");
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
        enhanceMeetingPatterns(wrapper);
        classifyTableCells(wrapper);
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
        gap: 12px; /* Adds space specifically between items/nested cards inside the body */
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
        font-size: 12.35px !important;
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
        font-size: 14px !important;
        font-weight: 400 !important;
    }

    // /* Dates \u2014 mono and bold */
    // .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-date-value {
    //     font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
    //     font-size: 13px !important;
    //     font-weight: 600 !important;
    // }

    // /* Numbers \u2014 mono and bold */
    // .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-number-value {
    //     font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
    //     font-size: 13px !important;
    //     font-weight: 600 !important;
    // }

    /* Rich text prose */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] [data-automation-id="richTextContent"] .ProseMirror {
        font-size: 13.5px !important;
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
        font-size: 13px !important;
    }

    /* Hide related-actions buttons */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] [data-automation-id="relatedIconContainer"] {
        display: none !important;
    }

    /* Hide no-label rows */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] li.WLSF.wd-no-label:not(td *) {
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
      function enhanceFieldSet(fieldSetBody) {
        if (fieldSetBody.closest('[data-automation-id="tableWrapper"], [data-automation-id="row"], [data-automation-id="cell"]')) return;
        const titleEl = fieldSetBody.querySelector('[data-automation-id="fieldSetLegendLabel"]');
        const title = titleEl?.textContent.trim() ?? "";
        if (!title) return;
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
        fieldSetBody.querySelectorAll('[data-automation-id="decorationWrapper"]').forEach((wrapper) => {
          const text = wrapper.textContent.trim();
          if (/\d{4}-\d{2}-\d{2}/.test(text)) {
            wrapper.classList.add("wd-date-value");
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

  // src/enhancers/pageFields.js
  var require_pageFields = __commonJS({
    "src/enhancers/pageFields.js"() {
      init_registry();
      var styles = `
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
        font-size: 12.35px !important;
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
        font-size: 14px !important;
        font-weight: 400 !important;
    }

    .wd-page-fields [data-automation-id="richTextContent"] .ProseMirror {
        font-size: 13px !important;
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
        font-size: 13px !important;
    }

    .wd-page-fields [data-automation-id="relatedIconContainer"] {
        display: none !important;
    }

    // .wd-page-fields .wd-date-value {
    //     font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
    //     font-size: 13px !important;
    //     font-weight: 600 !important;
    // }

    .wd-page-fields li.WLSF.wd-no-label:not(td *) {
        display: none !important;
    }
`;
      function injectPageFieldStyles() {
        if (document.getElementById("wd-page-fields-styles")) return;
        const style = document.createElement("style");
        style.id = "wd-page-fields-styles";
        style.textContent = styles;
        document.head.appendChild(style);
      }
      function enhancePageFields(ul) {
        if (ul.closest('[data-automation-id="fieldSetBody"], [data-automation-id="tableWrapper"], [data-automation-id="cell"], .wd-page-fields, .wd-fieldset-card')) return;
        const rows = ul.querySelectorAll("li.WLSF");
        if (!rows.length) return;
        const hasFormLabels = ul.querySelector('[data-automation-id="formLabel"]');
        if (!hasFormLabels) return;
        injectPageFieldStyles();
        const wrapper = document.createElement("div");
        wrapper.className = "wd-page-fields";
        ul.parentElement.insertBefore(wrapper, ul);
        wrapper.appendChild(ul);
        rows.forEach((row) => {
          const label = row.querySelector('[data-automation-id="formLabel"]');
          if (!label?.textContent.trim()) {
            row.classList.add("wd-no-label");
          }
        });
        ul.querySelectorAll('[data-automation-id="decorationWrapper"]').forEach((dw) => {
          const text = dw.textContent.trim();
          if (/\d{4}-\d{2}-\d{2}/.test(text)) {
            dw.classList.add("wd-date-value");
          }
        });
      }
      registerEnhancer({
        selector: "ul.WBUF",
        handler: enhancePageFields,
        key: "pageFields"
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
      var import_pageFields = __toESM(require_pageFields());
      console.log("INFO: Prettify Workday loaded successfully.");
      startObserver();
    }
  });
  require_content();
})();
