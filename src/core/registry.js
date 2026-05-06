const enhancers = [];

export function registerEnhancer({ selector, handler, key }) {
    enhancers.push({ selector, handler, key });
}

function processNode(node) {
    if (node.nodeType !== 1) return;

    for (const { selector, handler, key } of enhancers) {
        const attr = `wdEnhanced_${key}`;

        // check node itself
        if (node.matches?.(selector) && !node.dataset[attr]) {
            node.dataset[attr] = "true";
            handler(node);
        }

        // check children
        node.querySelectorAll?.(selector).forEach(el => {
            if (el.dataset[attr]) return;
            el.dataset[attr] = "true";
            handler(el);
        });
    }
}

export function startObserver() {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach(processNode);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // initial scan
    processNode(document.body);
}
