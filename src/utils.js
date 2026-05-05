// Fires callback whenever a node matching `selector` appears in the DOM.
// Returns a disconnect function.
export function onElementFound(selector, callback) {
    const observer = new MutationObserver(() => {
        document.querySelectorAll(selector).forEach(el => {
            if (el.dataset.wdEnhanced) return; // don't process twice
            el.dataset.wdEnhanced = "true";
            callback(el);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // also run immediately in case elements are already present
    document.querySelectorAll(selector).forEach(el => {
        if (el.dataset.wdEnhanced) return;
        el.dataset.wdEnhanced = "true";
        callback(el);
    });

    return () => observer.disconnect();
}
