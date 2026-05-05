console.log("INFO: Prettify Workday loaded successfully.");

// import components here as we build them
import './enhancers/table.js';

// content.js stays thin — components self-register when imported
const fonts = new Set();
document.querySelectorAll('*').forEach(el => {
    const font = getComputedStyle(el).fontFamily;
    if (font) fonts.add(font);
});
console.log([...fonts]);