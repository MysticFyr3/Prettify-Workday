import { registerEnhancer } from '../core/registry.js';
import { enhancePageFieldsList } from './pageFields.js';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
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
        gap: 12px; /* Adds space specifically between items/nested cards inside the body */
    }

    /* Hide Workday's original header row */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] > .WG-N {
        display: none !important;
    }

    .wd-fieldset-card > [data-automation-id="fieldSetBody"] [data-automation-id="fieldSetLegendHeading"] {
        display: none !important;
    }

    /* Each row: two-column grid — only outside table cells */
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

    /* Dates — mono */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-date-value {
        font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
        font-size: 14px !important;
        font-weight: 500 !important;
    }

    /* Numbers — mono */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-number-value {
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

    /* Plain text and numeric textView elements */
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] [data-automation-id="textView"] {
        font-size: 14px !important;
        color: #1f2328 !important;
    }

    .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-date-value [data-automation-id="textView"],
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-date-value {
        font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
        font-size: 14px !important;
        font-weight: 500 !important;
    }

    .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-number-value [data-automation-id="textView"],
    .wd-fieldset-card > [data-automation-id="fieldSetBody"] .wd-number-value {
        font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
        font-size: 14px !important;
        font-weight: 500 !important;
    }

    .wd-fieldset-card > [data-automation-id="fieldSetBody"] [data-automation-id="textView"] {
        font-size: 14px !important;
        color: #1f2328 !important;
    }

    .wd-fieldset-card > [data-automation-id="fieldSetBody"] li.WLSF [data-automation-id="numericText"] {
        font-family: 'Roboto Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        color: #1f2328 !important;
    }
`;

// ─── Style injection ───────────────────────────────────────────────────────────

function injectFieldSetStyles() {
    if (document.getElementById('wd-fieldset-styles')) return;
    const style = document.createElement('style');
    style.id = 'wd-fieldset-styles';
    style.textContent = styles;
    document.head.appendChild(style);
}

// ─── Depth calculation ────────────────────────────────────────────────────────

function getFieldSetDepth(el) {
    let depth = 0;
    let current = el.parentElement;
    while (current) {
        if (current.dataset?.automationId === 'fieldSetBody' ||
            current.classList?.contains('wd-fieldset-card')) {
            depth++;
        }
        current = current.parentElement;
    }
    return depth;
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

function enhanceFieldSet(fieldSetBody) {
    // Skip fieldSets inside tables
    if (fieldSetBody.closest('[data-automation-id="tableWrapper"], [data-automation-id="row"], [data-automation-id="cell"]')) return;

    // Skip unlabelled wrapper fieldSets
    const titleEl = fieldSetBody.querySelector('[data-automation-id="fieldSetLegendLabel"]');
    const title = titleEl?.textContent.trim() ?? '';
    if (!title) {
        fieldSetBody.querySelectorAll(':scope > [data-automation-id="fieldSetContent"] ul.WBUF').forEach(ul => {
            if (ul.closest('.wd-page-fields, .wd-fieldset-card')) return;
            if (!ul.querySelector('[data-automation-id="formLabel"]')) return;
            enhancePageFieldsList(ul);
        });
        return;
    }

    injectFieldSetStyles();

    const isExpanded = fieldSetBody.getAttribute('data-automation-formlabelexpanded') === 'true';
    const depth = Math.min(getFieldSetDepth(fieldSetBody), 3);

    // Wrap in a card
    const card = document.createElement('div');
    card.className = 'wd-fieldset-card';
    card.dataset.wdDepth = depth;
    fieldSetBody.parentElement.insertBefore(card, fieldSetBody);
    card.appendChild(fieldSetBody);

    // Build title bar
    const titleBar = document.createElement('div');
    titleBar.className = 'wd-fieldset-title' + (isExpanded ? '' : ' wd-collapsed');
    titleBar.innerHTML = `
        <svg class="wd-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path fill-rule="nonzero" d="M3.143 8.596a.5.5 0 0 1 .002-.701l.747-.748a.493.493 0 0 1 .7-.002L12 14.556l7.406-7.41a.5.5 0 0 1 .632-.057l.069.058.748.748a.494.494 0 0 1 0 .7l-8.505 8.512a.492.492 0 0 1-.7 0Z" fill="currentColor"/>
        </svg>
        <span>${title}</span>
    `;
    card.insertBefore(titleBar, fieldSetBody);

    // Wire title bar click to Workday's toggle button
    titleBar.addEventListener('click', () => {
        const wdToggle = fieldSetBody.querySelector('.WF-N[role="button"]');
        wdToggle?.click();
        titleBar.classList.toggle('wd-collapsed');
    });

    // Mark no-label rows
    fieldSetBody.querySelectorAll('li.WLSF').forEach(row => {
        const label = row.querySelector('[data-automation-id="formLabel"]');
        if (!label?.textContent.trim()) {
            row.classList.add('wd-no-label');
        }
    });

    enhanceMeetingPatterns(fieldSetBody); // Must be before mono fonting

    const DATE = /\d{4}-\d{2}-\d{2}/;
    const NUMBER = /^\d+(\.\d+)?( of \d+)?$/;

    fieldSetBody.querySelectorAll('[data-automation-id="decorationWrapper"]').forEach(wrapper => {
        const text = wrapper.textContent.trim();
        if (DATE.test(text)) {
            wrapper.classList.add('wd-date-value');
        } else if (NUMBER.test(text)) {
            wrapper.classList.add('wd-number-value');
        }
    });
}

// ─── Registration ─────────────────────────────────────────────────────────────

registerEnhancer({
    selector: '[data-automation-id="fieldSetBody"]',
    handler: enhanceFieldSet,
    key: 'fieldSet'
});
