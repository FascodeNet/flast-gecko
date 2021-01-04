
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.text == "translate_google_flast") {

        var url_one="https://translate.google.com/translate?sl=auto&tl=auto&u=";
        var url_dest=url_one + location.href;
        var url_encoded=encodeURI(url_dest);
        window.open(url_encoded);
        sendResponse({"text":url_encoded});
    }
});