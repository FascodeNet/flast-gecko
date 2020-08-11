
browser.tabs.query( {active: true, lastFocusedWindow: true}, function (tabs) {
    var tab = tabs[0];
    //tab.urlに開いているタブのURLが入っている
    // if(tab.url != null){
     url =  tab.url;
     jQuery("#qrcode_div").qrcode({width: 250, height: 250, text: url});
    // }
});
