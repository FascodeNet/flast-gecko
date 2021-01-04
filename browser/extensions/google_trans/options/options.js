if (typeof browser !== 'undefined') {
    chrome = browser
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if (isMobile.any()) {
    Array.from(document.querySelectorAll(".desktop-only")).forEach(value => {
        value.style.display = "none"
    })
} else {
    Array.from(document.querySelectorAll(".mobile-only")).forEach(value => {
        value.style.display = "none"
    })   
}

const lblShowContextMenu = document.getElementById("lblShowContextMenu")
const selectShowContextMenu = document.getElementById("selectShowContextMenu")
const lblPlsDonate = document.getElementById("lblPlsDonate")
const lblTargetLanguage = document.getElementById("lblTargetLanguage")
const selectTargetLanguage = document.getElementById("selectTargetLanguage")
const lblTranslationEngine = document.getElementById("lblTranslationEngine")
const selectTranslationEngine = document.getElementById("selectTranslationEngine")
const lblPopupConfig = document.getElementById("lblPopupConfig")
const selectPopupConfig = document.getElementById("selectPopupConfig")
const lblOthers = document.getElementById("lblOthers")
const lblNeverTranslate = document.getElementById("lblNeverTranslate")
const neverTranslateListButton = document.getElementById("neverTranslateListButton")
const neverTranslateList = document.getElementById("neverTranslateList")
const lblAlwaysTranslate = document.getElementById("lblAlwaysTranslate")
const alwaysTranslateListButton = document.getElementById("alwaysTranslateListButton")
const alwaysTranslateList = document.getElementById("alwaysTranslateList")
const lblUseNewAlgorithm = document.getElementById("lblUseNewAlgorithm")
const selectUseNewAlgorithm = document.getElementById("selectUseNewAlgorithm")

document.title = chrome.i18n.getMessage("optionsPageTitle")

lblShowContextMenu.textContent = chrome.i18n.getMessage("lblShowContextMenu")
lblPlsDonate.textContent = chrome.i18n.getMessage("lblPlsDonate")
lblTargetLanguage.textContent = chrome.i18n.getMessage("lblTargetLanguage")
lblTranslationEngine.textContent = chrome.i18n.getMessage("lblTranslationEngine")
lblPopupConfig.textContent = chrome.i18n.getMessage("optionPopupConfig")
lblOthers.textContent = chrome.i18n.getMessage("lblOthers")
lblNeverTranslate.textContent = chrome.i18n.getMessage("optionsNeverTranslate")
lblAlwaysTranslate.textContent = chrome.i18n.getMessage("optionsAlwaysTranslate")
lblUseNewAlgorithm.textContent = chrome.i18n.getMessage("lblUseNewAlgorithm")

document.querySelector("#selectShowContextMenu option[value='yes']").textContent = chrome.i18n.getMessage("msgYes")
document.querySelector("#selectShowContextMenu option[value='no']").textContent = chrome.i18n.getMessage("msgNo")
document.querySelector("#selectPopupConfig option[value='auto']").textContent = chrome.i18n.getMessage("optionPopupAuto")
document.querySelector("#selectPopupConfig option[value='threeFingersOnTheScreen']").textContent = chrome.i18n.getMessage("optionPopupThreeFingers")
document.querySelector("#selectPopupConfig option[value='justWhenIClickTranlateThisSite']").textContent = chrome.i18n.getMessage("optionPopupjustWhenIClickTranlateThisSite")
document.querySelector("#selectUseNewAlgorithm option[value='yes']").textContent = chrome.i18n.getMessage("msgYesRecommended")
document.querySelector("#selectUseNewAlgorithm option[value='no']").textContent = chrome.i18n.getMessage("msgNoUseWidgets")

neverTranslateList.setAttribute("placeholder", chrome.i18n.getMessage("msgEmptyListNeverTranslateSites"))
alwaysTranslateList.setAttribute("placeholder", chrome.i18n.getMessage("msgEmptyListAlwaysTranslateLanguages"))

selectShowContextMenu.addEventListener("change", () => {
    chrome.runtime.sendMessage({action: "setShowContextMenu", showContextMenu: selectShowContextMenu.value})
})

selectUseNewAlgorithm.addEventListener("change", () => {
    chrome.runtime.sendMessage({action: "setUseNewAlgorithm", useNewAlgorithm: selectUseNewAlgorithm.value})
})

chrome.runtime.sendMessage({action: "getShowContextMenu"}, showContextMenu => {
    selectShowContextMenu.value = showContextMenu
})

chrome.runtime.sendMessage({action: "getUseNewAlgorithm"}, useNewAlgorithm => {
    selectUseNewAlgorithm.value = useNewAlgorithm
})

// fill language list
;(function() {
    var uilanguage = chrome.i18n.getUILanguage()
    if (uilanguage.toLowerCase() != "zh-cn" && uilanguage.toLowerCase() != "zh-tw") {
        uilanguage = uilanguage.split("-")[0]
    }
    var langs = languages[uilanguage]
    if (!langs) {
        langs = languages["en"]
    }

    var langsSorted = []

    for (var i in langs) {
        langsSorted.push([i, langs[i]])
    }

    langsSorted.sort(function(a, b) {
        return a[1].localeCompare(b[1]);
    })

    langsSorted.forEach(value => {
        if (value[0] == "zh") return;
        var option = document.createElement("option")
        option.value = value[0]
        option.textContent = value[1]
        selectTargetLanguage.appendChild(option)
    })

    chrome.runtime.sendMessage({action: "getTargetLanguage"}, targetLanguage => {
        selectTargetLanguage.value = targetLanguage
    })
})()

// get translation engine
chrome.runtime.sendMessage({action: "getTranslationEngine"}, translationEngine => {
    selectTranslationEngine.value = translationEngine
})

selectTranslationEngine.addEventListener("change", () => {
    chrome.runtime.sendMessage({action: "setTranslationEngine", translationEngine: selectTranslationEngine.value})
})

// get popup config
chrome.runtime.sendMessage({action: "getShowPopupConfig"}, showPopupConfig => {
    selectPopupConfig.value = showPopupConfig
})

selectTargetLanguage.addEventListener("change", () => {
    chrome.runtime.sendMessage({action: "setTargetLanguage", lang: selectTargetLanguage.value})
})

selectPopupConfig.addEventListener("change", () => {
    chrome.runtime.sendMessage({action: "setShowPopupConfig", showPopupConfig: selectPopupConfig.value})
})


function toggleList(x)
{
    if (x.style.display == "block") {
        x.style.display = "none"
    } else {
        x.style.display = "block"
    }
}
neverTranslateListButton.addEventListener("click", () => toggleList(neverTranslateList))
alwaysTranslateListButton.addEventListener("click", () => toggleList(alwaysTranslateList))

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function removeSiteFromBlackList(url)
{
    chrome.storage.local.get("neverTranslateSites", onGot => {
        var neverTranslateSites = onGot.neverTranslateSites
        if (!neverTranslateSites) {
            neverTranslateSites = []
        }

        removeA(neverTranslateSites, url)
        chrome.storage.local.set({neverTranslateSites})
    })   
}

function disableAutoTranslate(lang)
{
    chrome.storage.local.get("alwaysTranslateLangs", onGot => {
        var alwaysTranslateLangs = onGot.alwaysTranslateLangs
        if (!alwaysTranslateLangs) {
            alwaysTranslateLangs = []
        }

        removeA(alwaysTranslateLangs, lang)
        chrome.storage.local.set({alwaysTranslateLangs})
    })   
}

chrome.storage.local.get("neverTranslateSites", onGot => {
    var neverTranslateSites = onGot.neverTranslateSites
    if (!neverTranslateSites) {
        neverTranslateSites = []
    }
    neverTranslateSites.sort()

    neverTranslateSites.forEach(value => {
        let li = document.createElement("li")
        li.setAttribute("class", "w3-display-container")
        li.innerText = value

        let close = document.createElement("span")
        close.setAttribute("class", "w3-button w3-transparent w3-display-right")
        close.innerHTML = "&times;"

        close.addEventListener("click", () => {
            li.style.display = "none"
            removeSiteFromBlackList(value)
        })

        li.appendChild(close)
        
        neverTranslateList.appendChild(li)
    })
})

chrome.storage.local.get("alwaysTranslateLangs", onGot => {
    var alwaysTranslateLangs = onGot.alwaysTranslateLangs
    if (!alwaysTranslateLangs) {
        alwaysTranslateLangs = []
    }
    alwaysTranslateLangs.sort()

    var interfaceLanguage = chrome.i18n.getUILanguage()

    alwaysTranslateLangs.forEach(value => {
        var language = codeToLanguage(value, interfaceLanguage)
        if (!language) {
            language = "\"" + value + "\""
        }

        let li = document.createElement("li")
        li.setAttribute("class", "w3-display-container")
        li.innerText = language

        let close = document.createElement("span")
        close.setAttribute("class", "w3-button w3-transparent w3-display-right")
        close.innerHTML = "&times;"

        close.addEventListener("click", () => {
            li.style.display = "none"
            disableAutoTranslate(value)
        })

        li.appendChild(close)
        
        alwaysTranslateList.appendChild(li)
    })
})
