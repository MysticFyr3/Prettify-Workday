// src/enhancers/tableCurrentCourses.js
import { registerEnhancer } from '../core/registry.js';

function getHeaderText(th) {
    const span = th.querySelector('button span:first-child');
    return span?.textContent.trim().toLowerCase() ?? th.textContent.trim().toLowerCase();
}

function isTargetTable(wrapper) {
    const headers = wrapper.querySelectorAll('[data-automation-id="tableHead"] th');
    return Array.from(headers).some(th => getHeaderText(th).includes('course listing'));
}

function removeColumns(wrapper) {
    const headerRow = wrapper.querySelector('[data-automation-id="tableHead"] tr');
    if (!headerRow) return;

    const headers = Array.from(headerRow.querySelectorAll('th'));
    const targetIndex = headers.findIndex(th => getHeaderText(th).includes('course listing'));
    if (targetIndex === -1) return;

    headers[targetIndex].remove();
    wrapper.querySelectorAll('[data-automation-id="row"]').forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells[targetIndex]) cells[targetIndex].remove();
    });
}

function combineDeliveryColumns(wrapper) {
    const headerRow = wrapper.querySelector('[data-automation-id="tableHead"] tr');
    if (!headerRow) return;

    const headers = Array.from(headerRow.querySelectorAll('th'));
    
    const formatIndex = headers.findIndex(th => getHeaderText(th).includes('instructional format'));
    const modeIndex = headers.findIndex(th => getHeaderText(th).includes('delivery mode'));
    
    if (formatIndex === -1 || modeIndex === -1) return;

    // Remove the Delivery Mode header
    headers[modeIndex].remove();

    // Combine cell values in each row
    wrapper.querySelectorAll('[data-automation-id="row"]').forEach(row => {
        const cells = row.querySelectorAll('td');
        const formatCell = cells[formatIndex];
        const modeCell = cells[modeIndex];
        if (!formatCell || !modeCell) return;

        const format = formatCell.textContent.trim();
        const mode = modeCell.textContent.trim().replace(/ Learning$/i, '');
        
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
    key: 'currentCourses'
});
