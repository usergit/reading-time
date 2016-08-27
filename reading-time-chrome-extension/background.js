// disabled for now as this does not refresh when the tabs change
// this will set the time to read text on the icon, gets that data from mainContentScript.js, 

/*
(function background() {
    console.log("background.js loaded ...");

    chrome.runtime.onMessage.addListener(function (request) {
        // set the color and text of the chrome badge, it should be in the backgroundpage otherwise it wont work
        // console.log("sentMessage: ", request.timeToRead);
        chrome.browserAction.setBadgeBackgroundColor({color: "#000000"});
        chrome.browserAction.setBadgeText({"text": request.timeToRead});
    });
        
}());
*/