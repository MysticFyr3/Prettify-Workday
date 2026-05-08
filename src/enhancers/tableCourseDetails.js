// src/enhancers/tableCourseDetails.js
import { registerEnhancer } from '../core/registry.js';

const COLUMNS_TO_REMOVE = [
    'course id',
    'course number',
    'special topic',
    'minimum units',
    'abbreviated course title',
    'course title',
    'course section title',
    'description',
    'academic level',
    'locations offered',
    'academic unit',
    'campus',
    'section capacity',
    'number of registered students and active course opening notifications',
    'number of registered students',
    'number of active expired course opening notifications',
    'eligibility rule',
    'allowed grading bases',
    'overlaps with',
    'instructor grading',
    'ta marking',
    'ta student contact l1',
    'ta student contact l2',
];

function getHeaderText(th) {
    const span = th.querySelector('button span:first-child');
    return span?.textContent.trim().toLowerCase() ?? '';
}

function isTargetTable(wrapper) {
    const headers = wrapper.querySelectorAll('[data-automation-id="tableHead"] th');
    const headerTexts = new Set(Array.from(headers).map(getHeaderText));
    return headerTexts.has('course id') && headerTexts.has('section meeting patterns');
}

function removeColumns(wrapper) {
    const headerRow = wrapper.querySelector('[data-automation-id="tableHead"] tr');
    if (!headerRow) return;

    const headers = Array.from(headerRow.querySelectorAll('th'));
    const rows = Array.from(wrapper.querySelectorAll('[data-automation-id="row"]'));
    const cellCount = rows[0]?.querySelectorAll('td').length ?? 0;

    // Build a map of header index -> cell index, skipping phantom headers
    // by checking if removing this header would affect a real cell
    let cellIndex = 0;
    const headerToCellIndex = headers.map((th, hi) => {
        // If we've run out of cells, this is a phantom header
        if (cellIndex >= cellCount) return -1;

        // Peek: does this header have a corresponding cell?
        // We detect phantoms by checking if the next non-removed header's
        // cell aligns — instead, we use a simpler heuristic: check the
        // actual cell count vs remaining headers
        const remainingHeaders = headers.length - hi;
        const remainingCells = cellCount - cellIndex;

        if (remainingHeaders > remainingCells) {
            // More headers than cells remaining — check if this is a phantom
            // by seeing if any row has content at this cell index that matches
            const isPhantom = rows.every(row => {
                const cell = row.querySelectorAll('td')[cellIndex];
                // If removing would misalign, this header has no cell
                return !cell || !cell.textContent.trim();
            });
            if (isPhantom) return -1;
        }

        return cellIndex++;
    });

    // Collect header indices to remove, sorted descending
    const indicesToRemove = headers
        .map((th, hi) => COLUMNS_TO_REMOVE.includes(getHeaderText(th)) ? hi : -1)
        .filter(i => i !== -1)
        .sort((a, b) => b - a);

    for (const hi of indicesToRemove) {
        headers[hi].remove();
        const ci = headerToCellIndex[hi];
        if (ci === -1) continue; // phantom header, no cell to remove
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells[ci]) cells[ci].remove();
        });
    }
}

function enhanceCourseDetails(wrapper) {
    if (!isTargetTable(wrapper)) return;
    removeColumns(wrapper);
}

registerEnhancer({
    selector: '[data-automation-id="tableWrapper"]',
    handler: enhanceCourseDetails,
    key: 'courseDetails'
});
