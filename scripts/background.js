var curentUrl = '';
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    curentUrl  = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    console.log(tabs[0].url);
});
