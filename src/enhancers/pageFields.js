import { registerEnhancer } from '../core/registry.js';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
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
    }

    .wd-page-fields li.WLSF [data-automation-id="textView"] {
        font-size: 14px !important;
        font-weight: 400 !important;
    }
`;

// ─── Style injection ───────────────────────────────────────────────────────────

function injectPageFieldStyles() {
    if (document.getElementById('wd-page-fields-styles')) return;
    const style = document.createElement('style');
    style.id = 'wd-page-fields-styles';
    style.textContent = styles;
    document.head.appendChild(style);
}

// ─── Meeting pattern parser ────────────────────────────────────────────────────

function enhanceMeetingPatterns(fieldSetBody) {
    fieldSetBody.querySelectorAll('[data-automation-id="promptOption"]').forEach(el => {
        const text = el.getAttribute('title') || el.textContent.trim();
        // Match date anywhere in the string, not just at the start
        if (!/\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}/.test(text)) return;
        // Skip if already parsed (no pipes left)
        if (!text.includes('|')) return;

        el.textContent = parseMeetingPatternField(text);
        el.setAttribute('title', text);
    });
}

function parseMeetingPatternField(text) {
    const parts = text.split('|').map(p => p.trim());

    // Field format: UBCV | Building (CODE) | Floor: N | Room: NNN | Days | Time | Date
    // Find days/time by looking for the time pattern
    const timeIndex = parts.findIndex(p => /\d+:\d+ - \d+:\d+/.test(p));
    if (timeIndex === -1) return text;

    const days = parts[timeIndex - 1] ?? '';
    const time = parts[timeIndex];

    // Building code is in parentheses in part 1
    const buildingMatch = parts[1]?.match(/\(([^)]+)\)/);
    const building = buildingMatch ? buildingMatch[1] : null;

    // Room is in the part that starts with 'Room:'
    const roomPart = parts.find(p => p.startsWith('Room:'));
    const room = roomPart ? roomPart.replace('Room:', '').trim() : null;

    const location = [building, room].filter(Boolean).join(' ');
    return location
        ? `${days} │ ${time} │ ${location}`
        : `${days} │ ${time}`;
}

// ─── Enhancer ─────────────────────────────────────────────────────────────────

export function enhancePageFieldsList(ul) {
    injectPageFieldStyles();

    const rows = ul.querySelectorAll('li.WLSF');
    if (!rows.length) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'wd-page-fields';
    ul.parentElement.insertBefore(wrapper, ul);
    wrapper.appendChild(ul);

    enhanceMeetingPatterns(ul);  // ← was fieldSetBody, should be ul

    rows.forEach(row => {
        const label = row.querySelector('[data-automation-id="formLabel"]');
        if (!label?.textContent.trim()) {
            row.classList.add('wd-no-label');
        }
    });

    const DATE = /\d{4}-\d{2}-\d{2}/;
    const NUMBER = /^[\d,]+(\.\d+)?( of \d+)?$/;

    ul.querySelectorAll('[data-automation-id="decorationWrapper"]').forEach(dw => {
        const text = dw.textContent.trim();
        const isDrillDown = dw.querySelector('[data-automation-id="drillDownNumberLabel"]');

        if (DATE.test(text)) {
            dw.classList.add('wd-date-value');
        } else if (NUMBER.test(text) || isDrillDown) {
            dw.classList.add('wd-number-value');
        }
    });
}

function enhancePageFields(ul) {
    if (ul.closest('[data-automation-id="fieldSetBody"], [data-automation-id="tableWrapper"], [data-automation-id="cell"], .wd-page-fields, .wd-fieldset-card')) return;

    const rows = ul.querySelectorAll('li.WLSF');
    if (!rows.length) return;

    const hasFormLabels = ul.querySelector('[data-automation-id="formLabel"]');
    if (!hasFormLabels) return;

    enhancePageFieldsList(ul);
}

// ─── Registration ─────────────────────────────────────────────────────────────

registerEnhancer({
    selector: 'ul.WBUF',
    handler: enhancePageFields,
    key: 'pageFields'
});
