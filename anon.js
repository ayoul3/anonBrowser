"use strict";
var enabled = true

function getRandom(min, max){
    return min + Math.round((Math.random() * (max - min)));
}

function overwriteObject(myObject, attr, exportName, func){
    var exportedFunc = exportFunction(func, window, {defineAs:exportName});
    myObject.__defineGetter__(attr, exportedFunc);
    
}

function getMyUA(){
    return `Mozilla/5.0 (Windows NT ${getRandom(8, 10)}.0; Win64; x64; rv:${getRandom(68, 99)}.0) Gecko/201001${getRandom(10, 30)} Firefox/${getRandom(70, 150)}.${getRandom(0, 99)}`
}

function start(){
    overwriteObject(window.wrappedJSObject.navigator, 'userAgent', "getMyUA", getMyUA)
    overwriteObject(window.wrappedJSObject.navigator, 'hardwareConcurrency', "getMyHW", function(){return getRandom(1, 3)})
    overwriteObject(window.wrappedJSObject.navigator, 'buildID', "getMyBDID", function(){return `201810${getRandom(10, 28)}0000${getRandom(10, 99)}`})
    overwriteObject(window.wrappedJSObject.navigator, 'productSub', "getMyBDID", function(){return `201810${getRandom(10, 28)}0000${getRandom(10, 99)}`})
    for (var i = 1; i < getRandom(3, 8); i++){
        var mystr = "A".repeat(i)
        exportFunction(function(){return "dummy"}, window.navigator, {defineAs:mystr});
    }
}
start()