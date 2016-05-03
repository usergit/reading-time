/* this is the global settings object 
 whenever anything changes on the options page, this is where it gets saved, and this object gets passed to 
 chrome.storage.sync.set(settings) to be saved in the database, it also acts as the default value if the setting 
 can't be successfully retrieved from the database or if it is the very first time of the app starting up and the user has never
 tweaked any settings and saved to the database

 not a bad global object as there is only one writer to this file (the function  saveOptions() in option.js),
 but many consumers of this file exist; chosen this method as to make it more efficient 
 */
var settings = {
    wordsPerMinute: "228", // Use default value 228 check wikipedia (the average wpm)

    widgetStyleCss: {
        zindex         : "50000",
        top            : "10px",
        bottom         : "",
        left           : "10px",
        right          : "",
        position       : "fixed",
        backgroundColor: '#ffffff',
        width          : '70px',
        textAlign      : 'center',
        boxShadow      : 'rgba(0, 0, 0, 0.188235) 0px 0px 7px 0px',
        color          : '#585858',
        fontFamily     : '"Open Sans", sans-serif',
        fontSize       : '14px',
        fontWeight     : 'bold',
        border         : '1px solid #CAD0D2',
        borderRadius   : '2px'
    },

    markedBoxes: {
        widgetPosition: "0", // for the widgetPosition radio button, which radio buttons are checked
        fixedPosition : true // for the fixed position checkbox, if its checked or not
    },

    widgetSizeRangeSlider: 2
};


/* the restore default settings button will get the values from here, as the above one will only be used for the very first time
 the user starts up, after that it gets altered if the user changes any options
 the one below will not be altered by anything, thus the need to create two copies of the settings
 */

var RESTORE_DEFAULT_SETTINGS = {
    wordsPerMinute: "228", // Use default value 228 check wikipedia (the average wpm)

    widgetStyleCss: {
        zindex         : "50000",
        top            : "10px",
        bottom         : "",
        left           : "10px",
        right          : "",
        position       : "fixed",
        backgroundColor: '#ffffff',
        width          : '70px',
        textAlign      : 'center',
        boxShadow      : 'rgba(0, 0, 0, 0.188235) 0px 0px 7px 0px',
        color          : '#585858',
        fontFamily     : '"Open Sans", sans-serif',
        fontSize       : '14px',
        fontWeight     : 'bold',
        border         : '1px solid #CAD0D2',
        borderRadius   : '2px'
    },

    markedBoxes: {
        widgetPosition: "0", // for the widgetPosition radio button, which radio buttons are checked
        fixedPosition : true // for the fixed position checkbox, if its checked or not
    },

    widgetSizeRangeSlider: 2
};