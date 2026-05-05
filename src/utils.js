export function onElementFound(selector, callback) {
    const observer = new MutationObserver(() => {
        document.querySelectorAll(selector).forEach(el => {
            if (el.dataset.wdEnhanced) return;
            el.dataset.wdEnhanced = "true";
            callback(el);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    document.querySelectorAll(selector).forEach(el => {
        if (el.dataset.wdEnhanced) return;
        el.dataset.wdEnhanced = "true";
        callback(el);
    });

    return () => observer.disconnect();
}
