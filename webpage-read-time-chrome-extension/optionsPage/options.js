// Saves options to chrome.storage
function saveOptions() {
    settings.wordsPerMinute = document.getElementById('wordsPerMinute').value;

    chrome.storage.sync.set({settings: settings}, function () {
        // Update status to let user know options were saved.
        var status         = document.getElementById('status');
        status.textContent = 'Options saved';
        setTimeout(function () {
            status.textContent = '';
        }, 1000);
    });
}

// Restores options state using the preferences stored in chrome.storage.
function whenPageIsLoaded() {

    (function addWidgetPositionRadioEventListeners() {
        /* widget position css styles */
        var widgetPositions = {
            topLeft     : {top: '10px', left: '10px'},
            topMiddle   : {top: '10px', left: ' 50%'},
            topRight    : {top: '10px', right: '10px'},
            middleLeft  : {top: '50%', left: '10px'},
            middleMiddle: {top: '50%', left: '50%'},
            middleRight : {top: '50%', right: '10px'},
            bottomLeft  : {bottom: '10px', left: '10px'},
            bottomMiddle: {bottom: '10px', left: '50%'},
            bottomRight : {bottom: '10px', right: '10px'}
        };

        // add event listeners to the radio buttons
        var widgetPositionRadios = document.getElementsByName("widgetPositionRadio"); // get all the position adjuster radio buttons
        for (var radio in widgetPositionRadios) {
            if (widgetPositionRadios.hasOwnProperty(radio)) {
                var valueOfRadioButton = widgetPositionRadios[radio].value;
                var indexOfRadioButton = widgetPositionRadios[radio].id;

                (function attachClickListeners() { // because of closures
                    return function (valueOfRadioButton, indexOfRadioButton) {
                        widgetPositionRadios[indexOfRadioButton].onclick = function () {
                            //save the actual values of the css
                            settings.widgetStyleCss.top    = widgetPositions[valueOfRadioButton].top;
                            settings.widgetStyleCss.bottom = widgetPositions[valueOfRadioButton].bottom;
                            settings.widgetStyleCss.left   = widgetPositions[valueOfRadioButton].left;
                            settings.widgetStyleCss.right  = widgetPositions[valueOfRadioButton].right;

                            settings.markedBoxes.widgetPosition = indexOfRadioButton; // save which radio button got selected, use its id
                        }
                    }
                }()(valueOfRadioButton, indexOfRadioButton)); //because of closures, value is assigned at runtime, not at declaration;
            }
        }
    }());

    // (function addWidgetFixedPositionCheckBoxListener() {
    //     document.getElementById("9").onclick = function () {
    //         var isChecked = document.getElementById("9").checked; // get the value (if its checked or not)
    //
    //         if (isChecked) {
    //             settings.widgetStyleCss.position   = 'fixed';
    //             settings.markedBoxes.fixedPosition = true;
    //         } else {
    //             settings.widgetStyleCss.position   = '';
    //             settings.markedBoxes.fixedPosition = false;
    //         }
    //     }
    // }());

    (function addWidgetSizeRangeListener() {
        document.getElementById("widgetSizeRange").oninput = function () {
            var size = {
                1: {textDisplay: "Small", width: "40px;", fontSize: "10px;"},
                2: {textDisplay: "Normal", width: "70px;", fontSize: "14px;"},
                3: {textDisplay: "Large", width: "100px;", fontSize: "18px;"},
                4: {textDisplay: "Extra Large", width: "130px;", fontSize: "22px;"}
            };

            // change the settings
            settings.widgetSizeRangeSlider   = document.getElementById("widgetSizeRange").value;
            settings.widgetStyleCss.width    = size[settings.widgetSizeRangeSlider].width;
            settings.widgetStyleCss.fontSize = size[settings.widgetSizeRangeSlider].fontSize;

            document.getElementById("widgetSizeRangeDisplay").innerText = size[settings.widgetSizeRangeSlider].textDisplay;
        }
    }());

    (function addWidgetColorListeners() {
        // add font color
        document.getElementById("widgetFontColor").oninput = function () {
            // change the settings
            settings.widgetStyleCss.color = document.getElementById("widgetFontColor").value;
        };

        // add background color
        document.getElementById("widgetBackgroundColor").oninput = function () {
            // change the settings
            settings.widgetStyleCss.backgroundColor = document.getElementById("widgetBackgroundColor").value;
        }
    }());

    (function restoreDefaultListener() {
        document.getElementById("restoreDefault").onclick = function () {
            chrome.storage.sync.set({settings: RESTORE_DEFAULT_SETTINGS}, function () {
                autoPopulateTheOptionsForm(); // when reset, update the form values

                // Update status to let user know options were saved.
                var status         = document.getElementById('status');
                status.textContent = 'Options Restored To Default';
                setTimeout(function () {
                    status.textContent = '';
                }, 1000);
            });
        }

    }());

    function autoPopulateTheOptionsForm() {
        // auto populates the options form at startup
        chrome.storage.sync.get('settings', function (items) {
            items.settings = items.settings || settings; // if no settings is found replace it with the default settings
            // restore wpm textbox value
            document.getElementById('wordsPerMinute').value = items.settings.wordsPerMinute;

            // restore the widget position radio button that was selected
            var radioButtonSelectedId                              = items.settings.markedBoxes.widgetPosition;
            document.getElementById(radioButtonSelectedId).checked = true;

            // restore the fixed position checkbox that was selected
            // var isChecked = items.settings.markedBoxes.fixedPosition;
            // if (isChecked) {
            //     document.getElementById(9).checked = true;
            // } else {
            //     document.getElementById(9).checked = false;
            // }

            // restore the widget size range slider
            var widgetSizeRange                                         = items.settings.widgetSizeRangeSlider;
            var size                                                    = {
                1: {textDisplay: "Small", width: "40px;", fontSize: "10px;"},
                2: {textDisplay: "Normal", width: "70px;", fontSize: "14px;"},
                3: {textDisplay: "Large", width: "100px;", fontSize: "18px;"},
                4: {textDisplay: "Extra Large", width: "130px;", fontSize: "22px;"}
            };
            document.getElementById("widgetSizeRange").value            = widgetSizeRange;
            document.getElementById("widgetSizeRangeDisplay").innerText = size[widgetSizeRange].textDisplay;

            // restore widget color
            document.getElementById("widgetFontColor").value       = items.settings.widgetStyleCss.color;
            document.getElementById("widgetBackgroundColor").value = items.settings.widgetStyleCss.backgroundColor;
        });
    }

    autoPopulateTheOptionsForm();
}

document.addEventListener('DOMContentLoaded', whenPageIsLoaded);
document.getElementById('save').addEventListener('click', saveOptions);