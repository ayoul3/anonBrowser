"use strict";

function getRandom(min, max){
  return min + Math.round((Math.random() * (max - min)));
}

function rewriteUserAgentHeader(e) {
  var ua = `Mozilla/5.0 (Windows NT ${getRandom(8, 10)}.0; Win64; x64; rv:${getRandom(68, 99)}.0) Gecko/201001${getRandom(10, 30)} Firefox/${getRandom(70, 150)}.${getRandom(0, 99)}`
  var accept = `text/html,application/xhtml+xml,application/xml;q=0.${getRandom(1, 9)},image/webp,*/*;q=0.${getRandom(1, 9)}`
  for (var header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      header.value = ua;
    }
    if (header.name.toLowerCase() === "accept") {
      header.value = accept;
    }
  }
  return {requestHeaders: e.requestHeaders};
}

async function registerScript(){
  scriptObj = await browser.contentScripts.register({
    "js": [{file: "anon.js"}],
    "matches": ["http://*/*", "https://*/*"],
    "allFrames": true,
    "runAt": "document_start"
  });
}

function start(){
  browser.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader, {urls: ["*://*/*"]}, ["blocking", "requestHeaders"]);
  registerScript()
}
function stop(){
  browser.webRequest.onBeforeSendHeaders.removeListener(rewriteUserAgentHeader)
}

function initExtension(result){
  let isEnabled = (typeof result.enabled === 'undefined') ? true : result.enabled;
  if (isEnabled){
      start()
  }
}

let isEnabledPromise = browser.storage.local.get("enabled");
isEnabledPromise.then(initExtension, function(){console.log(`Error: ${error}`);}); 