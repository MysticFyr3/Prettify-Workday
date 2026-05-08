import { registerEnhancer } from '../core/registry.js';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
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

    /* ─── Pill/Moniker styling (Instructors, Course Sections) ─── */
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

    /* ─── Specialized Text Views (Numbers, Totals) ─── */
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="numericText"],
    .wd-table-wrapper [data-automation-id="cell"] [data-automation-id="subtotalValue"],
    .wd-table-wrapper [data-automation-id="cellContainer"] > div[title],
    .wd-table-wrapper [data-automation-id="cellContainer"] > div > div[title] {
        font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
        font-size: 13px !important;
    }

    /* Date textView — class on the element itself, survives td replacement */
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

    /* ─── Specialized Text Views (Numbers, Totals, and Standard Text) ─── */
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

// ─── Style injection ───────────────────────────────────────────────────────────

function injectGlobalStyles() {
    if (document.getElementById('wd-enhancer-styles')) return;
    const style = document.createElement('style');
    style.id = 'wd-enhancer-styles';
    style.textContent = styles;
    document.head.appendChild(style);
}

// ─── Meeting pattern parser ────────────────────────────────────────────────────

function parseMeetingPattern(text) {
    const parts = text.split('|').map(p => p.trim());
    if (parts.length < 4) return text;

    const days = parts[1];
    const time = parts[2];

    const buildingPart = parts[4] || '';
    const buildingMatch = buildingPart.match(/\(([^)]+)\)/);
    const building = buildingMatch ? buildingMatch[1] : null;

    const roomPart = parts[parts.length - 1];
    const room = roomPart.startsWith('Room:')
        ? roomPart.replace('Room:', '').trim()
        : null;

    const location = [building, room].filter(Boolean).join(' ');
    return location
        ? `${days} │ ${time} │ ${location}`
        : `${days} │ ${time}`;
}

function enhanceMeetingPatterns(wrapper) {
    wrapper.querySelectorAll('[data-automation-id="promptOption"]').forEach(el => {
        const text = el.getAttribute('title') || el.textContent.trim();
        if (!/^\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}/.test(text)) return;

        el.textContent = parseMeetingPattern(text);
        el.setAttribute('title', text);
    });
}

// ─── Cell value classifier ────────────────────────────────────────────────────

const DATE = /\d{4}-\d{2}-\d{2}/;
const NUMBER = /^\d+(\.\d+)?( of \d+)?$/;

function classifyCell(cell) {
    const textView = cell.querySelector('[data-automation-id="textView"]');
    if (!textView) return;
    if (DATE.test(textView.textContent.trim())) {
        textView.classList.add('wd-date-value');
    }
}

function classifyTableCells(wrapper) {
    wrapper.querySelectorAll('[data-automation-id="cell"]').forEach(classifyCell);
}

// ─── Table enhancer ───────────────────────────────────────────────────────────

function enhanceTable(wrapper) {
    injectGlobalStyles();

    const caption = wrapper.querySelector('caption');
    const title = caption ? caption.textContent.trim() : null;

    const container = document.createElement('div');
    container.className = 'wd-table-wrapper';

    const rivaWidget = wrapper.closest('[data-automation-id="rivaWidget"]');

    if (rivaWidget) {
        rivaWidget.parentElement.insertBefore(container, rivaWidget);
        container.appendChild(rivaWidget);
    } else {
        wrapper.parentElement.insertBefore(container, wrapper);
        container.appendChild(wrapper);
    }

    if (title) {
        const titleBar = document.createElement('div');
        titleBar.className = 'wd-table-title';
        titleBar.textContent = title;
        container.insertBefore(titleBar, container.firstChild);
    }

    enhanceMeetingPatterns(wrapper);
    classifyTableCells(wrapper);

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === 1) {
                    const cell = node.closest?.('[data-automation-id="cell"]') ?? (node.matches?.('[data-automation-id="cell"]') ? node : null);
                    if (cell) {
                        console.log('[wd] cell replaced, outerHTML:', cell.outerHTML.slice(0, 200));
                    }
                }
            }
        }
    });

    observer.observe(wrapper, { childList: true, subtree: true });
}

// ─── Registration ─────────────────────────────────────────────────────────────

registerEnhancer({
    selector: '[data-automation-id="tableWrapper"]',
    handler: enhanceTable,
    key: 'table'
});
