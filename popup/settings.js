document.getElementById("ext-anon-enabled").addEventListener("click", function(e) {
  toggleElement(this, "ext-anon-check-enabled")
});
document.getElementById("ext-anon-report").addEventListener("click", function(e) {
  browser.tabs.create({
    url: "https://github.com/ayoul3/anonBrowser/issues/new"
  });
});

function enableButton(btn, check){
  check.style.display = "inline";
  btn.style.color = "#052cc0";
}
function disableButton(btn, check){
  check.style.display = "none";
  btn.style.color = "grey";
}

function toggleElement(elem, id) {
  var x = document.getElementById(id);
  if (x.style.display === "none") {
    enableButton(elem, x)
    browser.storage.local.set({"enabled": true});
    browser.runtime.reload();
  } else {
    disableButton(elem, x)
    browser.storage.local.set({"enabled": false});
    browser.runtime.reload();
    browser.tabs.reload();
  }
}

function initSetupExtension(result){
  let isEnabled = (typeof result.enabled === 'undefined') ? true : result.enabled;
  var x = document.getElementById("ext-anon-check-enabled");
  var elem = document.getElementById("ext-anon-enabled");
  if (isEnabled){
    enableButton(elem, x)
  }else{
    disableButton(elem, x)
  }
}

let isEnabledPromise = browser.storage.local.get("enabled");
isEnabledPromise.then(initSetupExtension, function(){console.log(`Error: ${error}`);});