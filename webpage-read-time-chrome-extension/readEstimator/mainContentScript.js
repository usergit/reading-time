(function timeToRead() {
    // ----------------- readability -------------
    // strips out all the markups and gets only the article
    var loc = document.location;

    var uri = {
        spec    : loc.href,
        host    : loc.host,
        prePath : loc.protocol + "//" + loc.host,
        scheme  : loc.protocol.substr(0, loc.protocol.indexOf(":")),
        pathBase: loc.protocol + "//" + loc.host + loc.pathname.substr(0, loc.pathname.lastIndexOf("/") + 1)
    };

    var documentClone = document.cloneNode(true);
    var article       = new Readability(uri, documentClone).parse();

    if (!article) { // if there is no article found on the page exit the process, e.g. youtube.com page
        return;
    }
    // end -------------- readability -------------

    estimateTime(article.textContent, function (timeToRead) {

        function displayWidgetOnWebPage(timeToRead) {

            chrome.storage.sync.get('settings', function (items) {
                items.settings = items.settings || settings; // if no settings is found replace it with the default settings

                function convertCssObject2String(cssSettingsObject) {
                    // convert the css setting object into css string
                    var widgetCss = `
                                    z-index: ${cssSettingsObject.zindex};
                                    position: ${cssSettingsObject.position};
                                    top: ${cssSettingsObject.top};
                                    left: ${cssSettingsObject.left};
                                    right: ${cssSettingsObject.right};
                                    bottom: ${cssSettingsObject.bottom};
                                    background-color: ${cssSettingsObject.backgroundColor};
                                    width: ${cssSettingsObject.width};
                                    text-align: ${cssSettingsObject.textAlign};
                                    box-shadow: ${cssSettingsObject.boxShadow};
                                    color: ${cssSettingsObject.color};
                                    font-family: ${cssSettingsObject.fontFamily};
                                    font-size: ${cssSettingsObject.fontSize};
                                    font-weight: ${cssSettingsObject.fontWeight};
                                    border: ${cssSettingsObject.border};
                                    border-radius: ${cssSettingsObject.borderRadius};`;
                    return widgetCss;
                }

                var tempDiv   = document.createElement('div');
                tempDiv.style = convertCssObject2String(items.settings.widgetStyleCss);

                var timeDisplay = `<div>${timeToRead}</div>`;

                tempDiv.innerHTML = timeDisplay;
                document.body.insertBefore(tempDiv, document.body.firstChild);
            })
        }

        displayWidgetOnWebPage(timeToRead);
        //chrome.runtime.sendMessage({timeToRead: timeToRead}); // send message to the background.js with the timeToRead
    });

}());
