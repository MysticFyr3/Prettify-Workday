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
        font-size: 12px !important;
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

// ─── Style injection ───────────────────────────────────────────────────────────

function injectPageFieldStyles() {
    if (document.getElementById('wd-page-fields-styles')) return;
    const style = document.createElement('style');
    style.id = 'wd-page-fields-styles';
    style.textContent = styles;
    document.head.appendChild(style);
}

// ─── Enhancer ─────────────────────────────────────────────────────────────────

function enhancePageFields(ul) {
    // Skip if inside a fieldSetBody, table, or already wrapped
    if (ul.closest('[data-automation-id="fieldSetBody"], [data-automation-id="tableWrapper"], [data-automation-id="cell"], .wd-page-fields, .wd-fieldset-card')) return;

    // Only process if it actually contains WLSF field rows with formLabels
    const rows = ul.querySelectorAll('li.WLSF');
    if (!rows.length) return;

    const hasFormLabels = ul.querySelector('[data-automation-id="formLabel"]');
    if (!hasFormLabels) return;

    injectPageFieldStyles();

    const wrapper = document.createElement('div');
    wrapper.className = 'wd-page-fields';
    ul.parentElement.insertBefore(wrapper, ul);
    wrapper.appendChild(ul);

    // Mark no-label rows
    rows.forEach(row => {
        const label = row.querySelector('[data-automation-id="formLabel"]');
        if (!label?.textContent.trim()) {
            row.classList.add('wd-no-label');
        }
    });

    // Mark date values
    ul.querySelectorAll('[data-automation-id="decorationWrapper"]').forEach(dw => {
        const text = dw.textContent.trim();
        if (/\d{4}-\d{2}-\d{2}/.test(text)) {
            dw.classList.add('wd-date-value');
        }
    });
}

// ─── Registration ─────────────────────────────────────────────────────────────

registerEnhancer({
    selector: 'ul.WBUF',
    handler: enhancePageFields,
    key: 'pageFields'
});
