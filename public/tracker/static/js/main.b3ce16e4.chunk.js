(this["webpackJsonpff6wc-tracker"] = this["webpackJsonpff6wc-tracker"] || []).push([[0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(3);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./src/index.css
var src = __webpack_require__(9);

// EXTERNAL MODULE: ./src/App.css
var App = __webpack_require__(10);

// EXTERNAL MODULE: ./src/tracker.css
var tracker = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 5 modules
var slicedToArray = __webpack_require__(1);

// CONCATENATED MODULE: ./src/components/clickableTrackerItem/index.js
function ClickableTrackerItem(props){var _useState=Object(react["useState"])(0),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),stateIndex=_useState2[0],setStateIndex=_useState2[1];var itemAvailability=props.itemAvailability;if(props.itemAvailability==null){itemAvailability=[];}var itemClass="item";if(props.itemClickStates[0].includes("key")){itemClass="key";}return/*#__PURE__*/react_default.a.createElement("div",{className:itemClass,onClick:function onClick(){setStateIndex((stateIndex+1)%props.itemClickStates.length);if(props.itemAvailability.indexOf("character")===-1){return;}}},/*#__PURE__*/react_default.a.createElement("img",{className:"item-image "+props.itemClickStates[stateIndex]+" "+itemAvailability.join(" "),src:Array.isArray(props.itemIcon)?props.itemIcon[stateIndex]:props.itemIcon,title:props.itemName,alt:props.itemName}));}/* harmony default export */ var clickableTrackerItem = (ClickableTrackerItem);
// CONCATENATED MODULE: ./src/components/trackerItemGrouping/index.js
function TrackerItemGrouping(props){var _useState=Object(react["useState"])(props.groupIcon.itemAvailability[0]==="always"),_useState2=Object(slicedToArray["a" /* default */])(_useState,2),availabilityState=_useState2[0],setAvailability=_useState2[1];return/*#__PURE__*/react_default.a.createElement("div",{className:"tracker-group"+(availabilityState?" available":" unavailable")},(props.showGroup===undefined||props.showGroup)&&/*#__PURE__*/react_default.a.createElement("div",{className:"group-item"},/*#__PURE__*/react_default.a.createElement("div",null),/*#__PURE__*/react_default.a.createElement("div",{onClick:function onClick(){setAvailability(props.groupIcon.itemAvailability[0]==="always"||!availabilityState);}},/*#__PURE__*/react_default.a.createElement(clickableTrackerItem,{itemIcon:props.groupIcon.itemIcon,itemName:props.groupIcon.itemName,itemClickStates:props.groupIcon.itemClickStates,itemCurrentClickState:0,itemAvailability:props.groupIcon.itemAvailability})),/*#__PURE__*/react_default.a.createElement("div",null)),/*#__PURE__*/react_default.a.createElement("div",{className:"tracker-group-items"},props.groupedItems.map(function(item,i){return/*#__PURE__*/react_default.a.createElement(clickableTrackerItem,{key:i,itemIcon:item.itemIcon,itemName:item.itemName,itemClickStates:item.itemClickStates,itemCurrentClickState:0,itemAvailability:item.itemAvailability,itemXsize:item.Xsize===undefined?1:item.Xsize,itemYsize:item.Ysize===undefined?1:item.Ysize});})));}/* harmony default export */ var trackerItemGrouping = (TrackerItemGrouping);
// CONCATENATED MODULE: ./src/checks.js
var charge={itemIcon:["./icons/charge.png","./icons/charge-lvl1.png","./icons/charge-lvl2.png","./icons/charge-lvl3.png","./icons/charge-lvl4.png"],itemName:"charge",itemClickStates:["uncollected","collected","collected","collected","collected"],itemAvailability:["always"]};var ice={itemIcon:"./icons/ice.png",itemName:"ice",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var wave={itemIcon:"./icons/wave.png",itemName:"wave",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var spazer={itemIcon:"./icons/spazer.png",itemName:"spazer",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var plasma={itemIcon:"./icons/plasma.png",itemName:"plasma",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var morph={itemIcon:"./icons/morph.png",itemName:"morph",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var varia={itemIcon:["./icons/heat-varia.png","./icons/heatshield.png","./icons/varia.png"],itemName:"varia",itemClickStates:["uncollected","collected","collected"],itemAvailability:["always"]};var springball={itemIcon:"./icons/springball.png",itemName:"springball",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var hijump={itemIcon:"./icons/hijump.png",itemName:"hijump",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var space={itemIcon:["./icons/double-space.png","./icons/doublejump.png","./icons/space.png"],itemName:"space",itemClickStates:["uncollected","collected","collected"],itemAvailability:["always"]};var bombs={itemIcon:"./icons/bomb.png",itemName:"bombs",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var gravity={itemIcon:["./icons/pressure-gravity.png","./icons/pressurevalve.png","./icons/gravity.png"],itemName:"gravity",itemClickStates:["uncollected","collected","collected"],itemAvailability:["always"]};var ridley={itemIcon:"./icons/ridley.png",itemName:"ridley",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var speed={itemIcon:"./icons/speed.png",itemName:"speed",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var screw={itemIcon:"./icons/screw.png",itemName:"screw",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var bigSpacer={itemIcon:"./icons/spacer.png",itemName:"spacer",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var spacer={itemIcon:"./icons/spacer.png",itemName:"spacer",itemClickStates:["collected key"],itemAvailability:["always"]};var grappling={itemIcon:"./icons/grappling.png",itemName:"grappling",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var kraid={itemIcon:"./icons/kraid.png",itemName:"kraid",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var phantoon={itemIcon:"./icons/phantoon.png",itemName:"phantoon",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var draygon={itemIcon:"./icons/draygon.png",itemName:"draygon",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var xray={itemIcon:"./icons/xray.png",itemName:"xray",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var missile={itemIcon:"./icons/missile.png",itemName:"missile1",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var superMissile={itemIcon:"./icons/super.png",itemName:"super1",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var pbomb={itemIcon:"./icons/pbomb.png",itemName:"pbomb",itemClickStates:["uncollected","collected"],itemAvailability:["always"]};var crLabel={itemIcon:"./icons/cr.png",itemName:"crLabel",itemClickStates:["collected key"],itemAvailability:["always"]};var crateriaKey1={itemIcon:"./icons/key1.png",itemName:"crateriaKey1",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var crateriaKey2={itemIcon:"./icons/key2.png",itemName:"crateriaKey2",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var crateriaKeyBoss={itemIcon:"./icons/keyBoss.png",itemName:"crateriaKeyBoss",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var brLabel={itemIcon:"./icons/br.png",itemName:"brLabel",itemClickStates:["collected key"],itemAvailability:["always"]};var brinstarKey1={itemIcon:"./icons/key1.png",itemName:"brinstarKey1",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var brinstarKey2={itemIcon:"./icons/key2.png",itemName:"brinstarKey2",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var brinstarKeyBoss={itemIcon:"./icons/keyBoss.png",itemName:"brinstarKeyBoss",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var unLabel={itemIcon:"./icons/un.png",itemName:"unLabel",itemClickStates:["collected key"],itemAvailability:["always"]};var upperNorfairKey1={itemIcon:"./icons/key1.png",itemName:"upperNorfairKey1",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var upperNorfairKey2={itemIcon:"./icons/key2.png",itemName:"upperNorfairKey2",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var upperNorfairKeyBoss={itemIcon:"./icons/keyBoss.png",itemName:"upperNorfairKeyBoss",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var maLabel={itemIcon:"./icons/ma.png",itemName:"maLabel",itemClickStates:["collected key"],itemAvailability:["always"]};var maridiaKey1={itemIcon:"./icons/key1.png",itemName:"maridiaKey1",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var maridiaKey2={itemIcon:"./icons/key2.png",itemName:"maridiaKey2",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var maridiaKeyBoss={itemIcon:"./icons/keyBoss.png",itemName:"maridiaKeyBoss",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var wsLabel={itemIcon:"./icons/ws.png",itemName:"wsLabel",itemClickStates:["collected key"],itemAvailability:["always"]};var wreckedShipKey1={itemIcon:"./icons/key1.png",itemName:"wreckedShipKey1",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var wreckedShipKeyBoss={itemIcon:"./icons/keyBoss.png",itemName:"wreckedShipKeyBoss",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var lnLabel={itemIcon:"./icons/ln.png",itemName:"lnLabel",itemClickStates:["collected key"],itemAvailability:["always"]};var lowerNorfairKey1={itemIcon:"./icons/key1.png",itemName:"lowerNorfairKey1",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var lowerNorfairKeyBoss={itemIcon:"./icons/keyBoss.png",itemName:"lowerNorfairKeyBoss",itemClickStates:["uncollected key","collected key"],itemAvailability:["always"]};var trackerKeySanityJson=[{groupIcon:morph,groupedItems:[crLabel,crateriaKey1,crateriaKey2,crateriaKeyBoss,morph,hijump,charge,brLabel,brinstarKey1,brinstarKey2,brinstarKeyBoss,unLabel,upperNorfairKey1,upperNorfairKey2,upperNorfairKeyBoss,bombs,speed,ice,maLabel,maridiaKey1,maridiaKey2,maridiaKeyBoss,wsLabel,wreckedShipKey1,spacer,wreckedShipKeyBoss,varia,space,wave,lnLabel,lowerNorfairKey1,spacer,lowerNorfairKeyBoss,spacer,spacer,ridley,gravity,springball,spazer,spacer,spacer,kraid,phantoon,draygon,screw,plasma]}];var trackerJson=[{groupIcon:morph,groupedItems:[charge,ice,wave,spazer,plasma,morph,varia,springball,hijump,space,bombs,gravity,ridley,speed,screw,grappling,kraid,phantoon,draygon,xray]}];/* harmony default export */ var checks = (trackerJson);
// CONCATENATED MODULE: ./src/App.js
function App_App(){return/*#__PURE__*/react_default.a.createElement("div",{className:"App"},/*#__PURE__*/react_default.a.createElement("header",{className:"App-header"},/*#__PURE__*/react_default.a.createElement("h2",null,"Super Metroid: Recall"),/*#__PURE__*/react_default.a.createElement("div",{className:"groups"},checks.map(function(group,i){return/*#__PURE__*/react_default.a.createElement(trackerItemGrouping,{groupIcon:group.groupIcon,groupedItems:group.groupedItems});}))));}/* harmony default export */ var src_App = (App_App);
// CONCATENATED MODULE: ./src/serviceWorker.js
// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
var isLocalhost=Boolean(window.location.hostname==='localhost'||// [::1] is the IPv6 localhost address.
window.location.hostname==='[::1]'||// 127.0.0.0/8 are considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function register(config){if( true&&'serviceWorker'in navigator){// The URL constructor is available in all browsers that support SW.
var publicUrl=new URL("",window.location.href);if(publicUrl.origin!==window.location.origin){// Our service worker won't work if PUBLIC_URL is on a different origin
// from what our page is served on. This might happen if a CDN is used to
// serve assets; see https://github.com/facebook/create-react-app/issues/2374
return;}window.addEventListener('load',function(){var swUrl="".concat("","/service-worker.js");if(isLocalhost){// This is running on localhost. Let's check if a service worker still exists or not.
checkValidServiceWorker(swUrl,config);// Add some additional logging to localhost, pointing developers to the
// service worker/PWA documentation.
navigator.serviceWorker.ready.then(function(){console.log('This web app is being served cache-first by a service '+'worker. To learn more, visit https://bit.ly/CRA-PWA');});}else{// Is not localhost. Just register service worker
registerValidSW(swUrl,config);}});}}function registerValidSW(swUrl,config){navigator.serviceWorker.register(swUrl).then(function(registration){registration.onupdatefound=function(){var installingWorker=registration.installing;if(installingWorker==null){return;}installingWorker.onstatechange=function(){if(installingWorker.state==='installed'){if(navigator.serviceWorker.controller){// At this point, the updated precached content has been fetched,
// but the previous service worker will still serve the older
// content until all client tabs are closed.
console.log('New content is available and will be used when all '+'tabs for this page are closed. See https://bit.ly/CRA-PWA.');// Execute callback
if(config&&config.onUpdate){config.onUpdate(registration);}}else{// At this point, everything has been precached.
// It's the perfect time to display a
// "Content is cached for offline use." message.
console.log('Content is cached for offline use.');// Execute callback
if(config&&config.onSuccess){config.onSuccess(registration);}}}};};}).catch(function(error){console.error('Error during service worker registration:',error);});}function checkValidServiceWorker(swUrl,config){// Check if the service worker can be found. If it can't reload the page.
fetch(swUrl,{headers:{'Service-Worker':'script'}}).then(function(response){// Ensure service worker exists, and that we really are getting a JS file.
var contentType=response.headers.get('content-type');if(response.status===404||contentType!=null&&contentType.indexOf('javascript')===-1){// No service worker found. Probably a different app. Reload the page.
navigator.serviceWorker.ready.then(function(registration){registration.unregister().then(function(){window.location.reload();});});}else{// Service worker found. Proceed as normal.
registerValidSW(swUrl,config);}}).catch(function(){console.log('No internet connection found. App is running in offline mode.');});}function unregister(){if('serviceWorker'in navigator){navigator.serviceWorker.ready.then(function(registration){registration.unregister();}).catch(function(error){console.error(error.message);});}}
// CONCATENATED MODULE: ./src/index.js
react_dom_default.a.render(/*#__PURE__*/react_default.a.createElement(react_default.a.StrictMode,null,/*#__PURE__*/react_default.a.createElement(src_App,null)),document.getElementById('root'));// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();

/***/ })
],[[4,1,2]]]);
//# sourceMappingURL=main.b3ce16e4.chunk.js.map