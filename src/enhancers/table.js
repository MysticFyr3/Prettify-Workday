import { onElementFound } from '../utils.js';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
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

// ─── Style injection ───────────────────────────────────────────────────────────

function injectGlobalStyles() {
    if (document.getElementById('wd-enhancer-styles')) return;
    const style = document.createElement('style');
    style.id = 'wd-enhancer-styles';
    style.textContent = styles;
    document.head.appendChild(style);
}

// ─── Meeting pattern parser ────────────────────────────────────────────────────

// Input:  "2026-07-08 - 2026-08-12 | Wed Fri | 10:00 - 11:00 | UBCV | Institute... | Floor: 3 | Room: X350"
// Output: "Wed Fri | 10:00 - 11:00 | ICCS X350"
function parseMeetingPattern(text) {
    const parts = text.split('|').map(p => p.trim());
    if (parts.length < 4) return text;

    const days     = parts[1];
    const time     = parts[2];

    const buildingPart  = parts[4] || '';
    const buildingMatch = buildingPart.match(/\(([^)]+)\)/);
    const building      = buildingMatch ? buildingMatch[1] : null;

    const roomPart = parts[parts.length - 1];
    const room     = roomPart.startsWith('Room:') ? roomPart.replace('Room:', '').trim() : null;

    const location = [building, room].filter(Boolean).join(' ');
    return location ? `${days} │ ${time} │ ${location}` : `${days} │ ${time}`;
}

function enhanceMeetingPatterns(wrapper) {
    wrapper.querySelectorAll('[data-automation-id="promptOption"]').forEach(el => {
        const text = el.getAttribute('title') || el.textContent.trim();
        if (!/^\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}/.test(text)) return;
        el.textContent = parseMeetingPattern(text);
        el.setAttribute('title', text); // preserve full string as tooltip
    });
}

// ─── Table enhancer ───────────────────────────────────────────────────────────

function enhanceTable(wrapper) {
    const caption = wrapper.querySelector('caption');
    const title   = caption ? caption.textContent.trim() : null;

    const container = document.createElement('div');
    container.className = 'wd-table-wrapper';

    // wrap the whole rivaWidget (toolbar + table) if available,
    // otherwise fall back to wrapping just the tableWrapper
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
}

// ─── Init ─────────────────────────────────────────────────────────────────────

injectGlobalStyles();
onElementFound('[data-automation-id="tableWrapper"]', enhanceTable);
