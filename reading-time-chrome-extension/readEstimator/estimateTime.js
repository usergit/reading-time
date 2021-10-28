var estimateTime = (function () {

    //convert minutes to hours. e.g. if its below 60 min output 0:59 hrs the minute otherwise output 1:25 hrs
    function minutesToHrs(minutes) {
        if (minutes < 1) { // handle if minutes is less than 1, e.g. 0.666 <--- implies its in seconds
            return "< a min"
        } else if (minutes >= 1) {
            minutes   = Math.round(minutes); // round to handle fractional inputs digit minutes for e.g. 15.65 to 16 mins
            var hours = Math.trunc(minutes / 60);
            var mins  = minutes % 60;
            if (hours < 1) {
                return mins + " mins";
            }

            if (mins.toString().length === 1) { // if there is only 1 digit, for e.g. 6 should be 06 minutes and 1:06 instead of 1:6
                mins = 0 + mins.toString();
            }
            return hours + ":" + mins + " hrs";
        } else {
            return "N/A"
        }
    }

    // filters out non english words, empty strings etc and returns the filtered array...
    // to clean the html do myString.replace(/<(?:.|\n)*?>/gm, '');
    function getWordsInArticle(articleContent) {
        var splittedIntoWords = articleContent.split(" ");

        var cleanedUpWords = [];
        for (var i = 0, len = splittedIntoWords.length; i <= len; i++) {
            //cleanup special characters
            if (splittedIntoWords[i] != "" && //if not empty
                splittedIntoWords[i] != "\n" && //and not a new line
                splittedIntoWords[i] != "\r" && //not a carriage return
                splittedIntoWords[i] != "\t" //not a tab character
            ) {
                cleanedUpWords.push(splittedIntoWords[i]);
            }
        }
        return cleanedUpWords;
    }

    return function (articleContent, displayTimeToRead) {

        //get the users saved words per minute from chrome storage and estimate the time it takes to read the article
        chrome.storage.sync.get('settings', function (items) {
            items.settings             = items.settings || settings; // if no settings is found replace it with the default settings
            var numberOfWordsPerMinute = items.settings.wordsPerMinute;
            var wordsArray             = getWordsInArticle(articleContent);
            var numberOfWords          = wordsArray.length;
            var minutesToRead          = numberOfWords / numberOfWordsPerMinute;
            var timeToRead             = minutesToHrs(minutesToRead);

            displayTimeToRead(timeToRead); //call the callback function that displays the time to read widget on the page
        });
    };
}());