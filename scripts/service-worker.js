
chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
    const { options } = await chrome.storage.local.get('options');
    chrome.scripting.insertCSS({
        target: { tabId },
        files: ['styles/styles.css'],
        ...options
    });
});
