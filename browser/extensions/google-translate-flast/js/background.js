browser.contextMenus.create({
    "title": "Translate For Google",
    "contexts": ["all"],
    "onclick": function(info)
    {
        console.log(info["pageUrl"]);


        var url_one="https://translate.google.com/translate?sl=auto&tl=auto&u=";
        var url_dest=url_one + encodeURIComponent(info["pageUrl"]);
        console.log(url_dest);
        browser.tabs.create({url: url_dest}, tab => {});
    }
  });