import { onElementFound } from '../utils.js';

function removeCourseListingColumn(wrapper) {
    const headerRow = wrapper.querySelector('[data-automation-id="tableHead"] tr');
    if (!headerRow) return;

    const headers = Array.from(headerRow.querySelectorAll('th'));

    // find the index of "Course Listing"
    const targetIndex = headers.findIndex(th =>
        th.textContent.trim().toLowerCase().includes('course listing')
    );

    if (targetIndex === -1) return;

    // remove header cell
    headers[targetIndex].remove();

    // remove corresponding cells in each row
    wrapper.querySelectorAll('[data-automation-id="row"]').forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells[targetIndex]) {
            cells[targetIndex].remove();
        }
    });
}

// Only run on relevant tables
function isTargetTable(wrapper) {
    const text = wrapper.textContent.toLowerCase();
    return text.includes('course listing');
}

onElementFound('[data-automation-id="tableWrapper"]', (wrapper) => {
    if (!isTargetTable(wrapper)) return;
    removeCourseListingColumn(wrapper);
});
