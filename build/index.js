/*!
 * 
 *   get-set-json v0.0.1
 *   
 * 
 *   Copyright (c) Vijey Narayanaswamy (https://github.com/vijeysrc)
 * 
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 * 
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["get-set-json"]=e():t["get-set-json"]=e()}(window,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";function n(t){return function(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}r.r(e);var i=function(t){return"string"==typeof t},u=function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t},c=function(t){return Array.isArray(t)},f=function(t){return!c(t)&&null!==t&&"object"===o(t)},l=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t.length;return function r(){var o=Array.prototype.slice.call(arguments);return o.length<e?r.bind.apply(r,[null].concat(n(o))):t.apply(null,o)}};function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function p(t){for(var e,r=1;r<arguments.length;r++)e=null==arguments[r]?{}:arguments[r],r%2?a(e,!0).forEach((function(r){y(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):a(e).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}));return t}function y(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function s(t){return function(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}r.d(e,"get",(function(){return g})),r.d(e,"getd",(function(){return v})),r.d(e,"set",(function(){return j})),r.d(e,"setd",(function(){return m}));var b=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],e=1<arguments.length?arguments[1]:void 0,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:void 0;return t.reduce((function(t,e){return t&&t[e]?t[e]:r}),e)},d=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],e=1<arguments.length?arguments[1]:void 0,r=2<arguments.length?arguments[2]:void 0;return s(t).reverse().reduce((function(t,e,n,o){var l=o.slice(n+1).reverse(),a=g(l,r);if(f(a))return p({},a,y({},e,t));if(c(a)&&u(+e))return Object.assign(s(a),y({},+e,t));if(void 0===a){if(i(e))return y({},e,t);if(u(e))return Object.assign([],y({},e,t))}return t}),e)},g=l(b,2),v=l((function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[],r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:void 0;return b(e,t,r)}),2),j=l(d,3),m=l((function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[],r=2<arguments.length?arguments[2]:void 0;return d(e,r,t)}),3)}])}));