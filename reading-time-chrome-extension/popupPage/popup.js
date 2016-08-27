document.addEventListener('DOMContentLoaded', function () {

    //show the stripped article in a different tab
    document.getElementById('articleOnly').addEventListener('click', function () {
        chrome.tabs.executeScript(null, {file: "popupPage/showArticleOnly.js"});
    });

    //open the reading estimator site from the popup menu
    document.getElementById('estimate').addEventListener('click', function () {
        chrome.tabs.create({url: "http://www.myreadspeed.com/calculate/"});
    });

    //open the settings page from the popup menu
    document.getElementById('settings').addEventListener('click', function () {
        chrome.runtime.openOptionsPage();
    });
});