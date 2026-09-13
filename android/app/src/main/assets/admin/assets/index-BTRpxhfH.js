(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();var ha={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let r=n.charCodeAt(i);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},eh=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const r=n[t++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){const o=n[t++];e[i++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=n[t++],a=n[t++],c=n[t++],h=((r&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;e[i++]=String.fromCharCode(55296+(h>>10)),e[i++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],a=n[t++];e[i++]=String.fromCharCode((r&15)<<12|(o&63)<<6|a&63)}}return e.join("")},_l={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<n.length;r+=3){const o=n[r],a=r+1<n.length,c=a?n[r+1]:0,h=r+2<n.length,d=h?n[r+2]:0,p=o>>2,m=(o&3)<<4|c>>4;let E=(c&15)<<2|d>>6,R=d&63;h||(R=64,a||(E=64)),i.push(t[p],t[m],t[E],t[R])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(yl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):eh(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<n.length;){const o=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const d=r<n.length?t[n.charAt(r)]:64;++r;const m=r<n.length?t[n.charAt(r)]:64;if(++r,o==null||c==null||d==null||m==null)throw new th;const E=o<<2|c>>4;if(i.push(E),d!==64){const R=c<<4&240|d>>2;if(i.push(R),m!==64){const N=d<<6&192|m;i.push(N)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class th extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const nh=function(n){const e=yl(n);return _l.encodeByteArray(e,!0)},Bi=function(n){return nh(n).replace(/\./g,"")},vl=function(n){try{return _l.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ih(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=()=>ih().__FIREBASE_DEFAULTS__,sh=()=>{if(typeof process=="undefined"||typeof ha=="undefined")return;const n=ha.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},oh=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&vl(n[1]);return e&&JSON.parse(e)},or=()=>{try{return rh()||sh()||oh()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},El=n=>{var e,t;return(t=(e=or())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},ah=n=>{const e=El(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},wl=()=>{var n;return(n=or())===null||n===void 0?void 0:n.config},Il=n=>{var e;return(e=or())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ch(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",r=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Bi(JSON.stringify(t)),Bi(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function uh(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ie())}function hh(){var n;const e=(n=or())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function dh(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function fh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function ph(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function mh(){const n=Ie();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function gh(){return!hh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function yh(){try{return typeof indexedDB=="object"}catch{return!1}}function _h(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var o;e(((o=r.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh="FirebaseError";class Xe extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=vh,Object.setPrototypeOf(this,Xe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Wn.prototype.create)}}class Wn{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},r=`${this.service}/${e}`,o=this.errors[e],a=o?Eh(o,i):"Error",c=`${this.serviceName}: ${a} (${r}).`;return new Xe(r,c,i)}}function Eh(n,e){return n.replace(wh,(t,i)=>{const r=e[i];return r!=null?String(r):`<${i}?>`})}const wh=/\{\$([^}]+)}/g;function Ih(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function qi(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const r of t){if(!i.includes(r))return!1;const o=n[r],a=e[r];if(da(o)&&da(a)){if(!qi(o,a))return!1}else if(o!==a)return!1}for(const r of i)if(!t.includes(r))return!1;return!0}function da(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Pn(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[r,o]=i.split("=");e[decodeURIComponent(r)]=decodeURIComponent(o)}}),e}function kn(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Th(n,e){const t=new bh(n,e);return t.subscribe.bind(t)}class bh{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let r;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Ah(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:i},r.next===void 0&&(r.next=Kr),r.error===void 0&&(r.error=Kr),r.complete===void 0&&(r.complete=Kr);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console!="undefined"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ah(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Kr(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(n){return n&&n._delegate?n._delegate:n}class Nt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new lh;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(o){if(r)return null;throw o}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ph(e))try{this.getOrInitializeService({instanceIdentifier:Rt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:r});i.resolve(o)}catch{}}}}clearInstance(e=Rt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Rt){return this.instances.has(e)}getOptions(e=Rt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);i===c&&a.resolve(r)}return r}onInit(e,t){var i;const r=this.normalizeInstanceIdentifier(t),o=(i=this.onInitCallbacks.get(r))!==null&&i!==void 0?i:new Set;o.add(e),this.onInitCallbacks.set(r,o);const a=this.instances.get(r);return a&&e(a,r),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const r of i)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Rh(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Rt){return this.component?this.component.multipleInstances?e:Rt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Rh(n){return n===Rt?void 0:n}function Ph(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Sh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const Ch={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},Nh=q.INFO,Dh={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},Oh=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),r=Dh[e];if(r)console[r](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Rs{constructor(e){this.name=e,this._logLevel=Nh,this._logHandler=Oh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ch[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}const Lh=(n,e)=>e.some(t=>n instanceof t);let fa,pa;function Vh(){return fa||(fa=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Mh(){return pa||(pa=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Tl=new WeakMap,ss=new WeakMap,bl=new WeakMap,Qr=new WeakMap,Ps=new WeakMap;function xh(n){const e=new Promise((t,i)=>{const r=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(ht(n.result)),r()},a=()=>{i(n.error),r()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Tl.set(t,n)}).catch(()=>{}),Ps.set(e,n),e}function Uh(n){if(ss.has(n))return;const e=new Promise((t,i)=>{const r=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),r()},a=()=>{i(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});ss.set(n,e)}let os={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ss.get(n);if(e==="objectStoreNames")return n.objectStoreNames||bl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ht(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Fh(n){os=n(os)}function $h(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Jr(this),e,...t);return bl.set(i,e.sort?e.sort():[e]),ht(i)}:Mh().includes(n)?function(...e){return n.apply(Jr(this),e),ht(Tl.get(this))}:function(...e){return ht(n.apply(Jr(this),e))}}function jh(n){return typeof n=="function"?$h(n):(n instanceof IDBTransaction&&Uh(n),Lh(n,Vh())?new Proxy(n,os):n)}function ht(n){if(n instanceof IDBRequest)return xh(n);if(Qr.has(n))return Qr.get(n);const e=jh(n);return e!==n&&(Qr.set(n,e),Ps.set(e,n)),e}const Jr=n=>Ps.get(n);function Bh(n,e,{blocked:t,upgrade:i,blocking:r,terminated:o}={}){const a=indexedDB.open(n,e),c=ht(a);return i&&a.addEventListener("upgradeneeded",h=>{i(ht(a.result),h.oldVersion,h.newVersion,ht(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),c.then(h=>{o&&h.addEventListener("close",()=>o()),r&&h.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const qh=["get","getKey","getAll","getAllKeys","count"],Hh=["put","add","delete","clear"],Xr=new Map;function ma(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Xr.get(e))return Xr.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,r=Hh.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(r||qh.includes(t)))return;const o=async function(a,...c){const h=this.transaction(a,r?"readwrite":"readonly");let d=h.store;return i&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),r&&h.done]))[0]};return Xr.set(e,o),o}Fh(n=>({...n,get:(e,t,i)=>ma(e,t)||n.get(e,t,i),has:(e,t)=>!!ma(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Gh(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Gh(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const as="@firebase/app",ga="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe=new Rs("@firebase/app"),Wh="@firebase/app-compat",Kh="@firebase/analytics-compat",Qh="@firebase/analytics",Jh="@firebase/app-check-compat",Xh="@firebase/app-check",Yh="@firebase/auth",Zh="@firebase/auth-compat",ed="@firebase/database",td="@firebase/data-connect",nd="@firebase/database-compat",id="@firebase/functions",rd="@firebase/functions-compat",sd="@firebase/installations",od="@firebase/installations-compat",ad="@firebase/messaging",ld="@firebase/messaging-compat",cd="@firebase/performance",ud="@firebase/performance-compat",hd="@firebase/remote-config",dd="@firebase/remote-config-compat",fd="@firebase/storage",pd="@firebase/storage-compat",md="@firebase/firestore",gd="@firebase/vertexai-preview",yd="@firebase/firestore-compat",_d="firebase",vd="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ls="[DEFAULT]",Ed={[as]:"fire-core",[Wh]:"fire-core-compat",[Qh]:"fire-analytics",[Kh]:"fire-analytics-compat",[Xh]:"fire-app-check",[Jh]:"fire-app-check-compat",[Yh]:"fire-auth",[Zh]:"fire-auth-compat",[ed]:"fire-rtdb",[td]:"fire-data-connect",[nd]:"fire-rtdb-compat",[id]:"fire-fn",[rd]:"fire-fn-compat",[sd]:"fire-iid",[od]:"fire-iid-compat",[ad]:"fire-fcm",[ld]:"fire-fcm-compat",[cd]:"fire-perf",[ud]:"fire-perf-compat",[hd]:"fire-rc",[dd]:"fire-rc-compat",[fd]:"fire-gcs",[pd]:"fire-gcs-compat",[md]:"fire-fst",[yd]:"fire-fst-compat",[gd]:"fire-vertex","fire-js":"fire-js",[_d]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hi=new Map,wd=new Map,cs=new Map;function ya(n,e){try{n.container.addComponent(e)}catch(t){Qe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Xt(n){const e=n.name;if(cs.has(e))return Qe.debug(`There were multiple attempts to register component ${e}.`),!1;cs.set(e,n);for(const t of Hi.values())ya(t,n);for(const t of wd.values())ya(t,n);return!0}function ks(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ze(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},dt=new Wn("app","Firebase",Id);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Nt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw dt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on=vd;function Al(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:ls,automaticDataCollectionEnabled:!1},e),r=i.name;if(typeof r!="string"||!r)throw dt.create("bad-app-name",{appName:String(r)});if(t||(t=wl()),!t)throw dt.create("no-options");const o=Hi.get(r);if(o){if(qi(t,o.options)&&qi(i,o.config))return o;throw dt.create("duplicate-app",{appName:r})}const a=new kh(r);for(const h of cs.values())a.addComponent(h);const c=new Td(t,i,a);return Hi.set(r,c),c}function Sl(n=ls){const e=Hi.get(n);if(!e&&n===ls&&wl())return Al();if(!e)throw dt.create("no-app",{appName:n});return e}function ft(n,e,t){var i;let r=(i=Ed[n])!==null&&i!==void 0?i:n;t&&(r+=`-${t}`);const o=r.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const c=[`Unable to register library "${r}" with version "${e}":`];o&&c.push(`library name "${r}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Qe.warn(c.join(" "));return}Xt(new Nt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd="firebase-heartbeat-database",Ad=1,xn="firebase-heartbeat-store";let Yr=null;function Rl(){return Yr||(Yr=Bh(bd,Ad,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(xn)}catch(t){console.warn(t)}}}}).catch(n=>{throw dt.create("idb-open",{originalErrorMessage:n.message})})),Yr}async function Sd(n){try{const t=(await Rl()).transaction(xn),i=await t.objectStore(xn).get(Pl(n));return await t.done,i}catch(e){if(e instanceof Xe)Qe.warn(e.message);else{const t=dt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Qe.warn(t.message)}}}async function _a(n,e){try{const i=(await Rl()).transaction(xn,"readwrite");await i.objectStore(xn).put(e,Pl(n)),await i.done}catch(t){if(t instanceof Xe)Qe.warn(t.message);else{const i=dt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Qe.warn(i.message)}}}function Pl(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd=1024,Pd=30*24*60*60*1e3;class kd{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Nd(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=va();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const c=new Date(a.date).valueOf();return Date.now()-c<=Pd}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Qe.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=va(),{heartbeatsToSend:i,unsentEntries:r}=Cd(this._heartbeatsCache.heartbeats),o=Bi(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Qe.warn(t),""}}}function va(){return new Date().toISOString().substring(0,10)}function Cd(n,e=Rd){const t=[];let i=n.slice();for(const r of n){const o=t.find(a=>a.agent===r.agent);if(o){if(o.dates.push(r.date),Ea(t)>e){o.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),Ea(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Nd{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return yh()?_h().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Sd(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return _a(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return _a(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Ea(n){return Bi(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dd(n){Xt(new Nt("platform-logger",e=>new zh(e),"PRIVATE")),Xt(new Nt("heartbeat",e=>new kd(e),"PRIVATE")),ft(as,ga,n),ft(as,ga,"esm2017"),ft("fire-js","")}Dd("");var Od="firebase",Ld="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ft(Od,Ld,"app");function Cs(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(n);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(n,i[r])&&(t[i[r]]=n[i[r]]);return t}function kl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Vd=kl,Cl=new Wn("auth","Firebase",kl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zi=new Rs("@firebase/auth");function Md(n,...e){zi.logLevel<=q.WARN&&zi.warn(`Auth (${on}): ${n}`,...e)}function Oi(n,...e){zi.logLevel<=q.ERROR&&zi.error(`Auth (${on}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(n,...e){throw Ns(n,...e)}function Fe(n,...e){return Ns(n,...e)}function Nl(n,e,t){const i=Object.assign(Object.assign({},Vd()),{[e]:t});return new Wn("auth","Firebase",i).create(e,{appName:n.name})}function pt(n){return Nl(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ns(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Cl.create(n,...e)}function $(n,e,...t){if(!n)throw Ns(e,...t)}function Ge(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Oi(e),new Error(e)}function Je(n,e){n||Ge(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function us(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function xd(){return wa()==="http:"||wa()==="https:"}function wa(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ud(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(xd()||fh()||"connection"in navigator)?navigator.onLine:!0}function Fd(){if(typeof navigator=="undefined")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e,t){this.shortDelay=e,this.longDelay=t,Je(t>e,"Short delay should be less than long delay!"),this.isMobile=uh()||ph()}get(){return Ud()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ds(n,e){Je(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;Ge("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;Ge("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;Ge("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $d={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd=new Qn(3e4,6e4);function Mt(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function vt(n,e,t,i,r={}){return Ol(n,r,async()=>{let o={},a={};i&&(e==="GET"?a=i:o={body:JSON.stringify(i)});const c=Kn(Object.assign({key:n.config.apiKey},a)).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:h},o);return dh()||(d.referrerPolicy="no-referrer"),Dl.fetch()(Ll(n,n.config.apiHost,t,c),d)})}async function Ol(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},$d),e);try{const r=new qd(n),o=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Ti(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const c=o.ok?a.errorMessage:a.error.message,[h,d]=c.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ti(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw Ti(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw Ti(n,"user-disabled",a);const p=i[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Nl(n,p,d);Ue(n,p)}}catch(r){if(r instanceof Xe)throw r;Ue(n,"network-request-failed",{message:String(r)})}}async function ar(n,e,t,i,r={}){const o=await vt(n,e,t,i,r);return"mfaPendingCredential"in o&&Ue(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Ll(n,e,t,i){const r=`${e}${t}?${i}`;return n.config.emulator?Ds(n.config,r):`${n.config.apiScheme}://${r}`}function Bd(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class qd{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Fe(this.auth,"network-request-failed")),jd.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ti(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const r=Fe(n,e,i);return r.customData._tokenResponse=t,r}function Ia(n){return n!==void 0&&n.enterprise!==void 0}class Hd{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Bd(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function zd(n,e){return vt(n,"GET","/v2/recaptchaConfig",Mt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gd(n,e){return vt(n,"POST","/v1/accounts:delete",e)}async function Vl(n,e){return vt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Wd(n,e=!1){const t=de(n),i=await t.getIdToken(e),r=Os(i);$(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const o=typeof r.firebase=="object"?r.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:r,token:i,authTime:Dn(Zr(r.auth_time)),issuedAtTime:Dn(Zr(r.iat)),expirationTime:Dn(Zr(r.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Zr(n){return Number(n)*1e3}function Os(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Oi("JWT malformed, contained fewer than 3 sections"),null;try{const r=vl(t);return r?JSON.parse(r):(Oi("Failed to decode base64 JWT payload"),null)}catch(r){return Oi("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function Ta(n){const e=Os(n);return $(e,"internal-error"),$(typeof e.exp!="undefined","internal-error"),$(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Un(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Xe&&Kd(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Kd({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const r=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Dn(this.lastLoginAt),this.creationTime=Dn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gi(n){var e;const t=n.auth,i=await n.getIdToken(),r=await Un(n,Vl(t,{idToken:i}));$(r==null?void 0:r.users.length,t,"internal-error");const o=r.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Ml(o.providerUserInfo):[],c=Xd(n.providerData,a),h=n.isAnonymous,d=!(n.email&&o.passwordHash)&&!(c!=null&&c.length),p=h?d:!1,m={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new hs(o.createdAt,o.lastLoginAt),isAnonymous:p};Object.assign(n,m)}async function Jd(n){const e=de(n);await Gi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Xd(n,e){return[...n.filter(i=>!e.some(r=>r.providerId===i.providerId)),...e]}function Ml(n){return n.map(e=>{var{providerId:t}=e,i=Cs(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yd(n,e){const t=await Ol(n,{},async()=>{const i=Kn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:o}=n.config,a=Ll(n,r,"/v1/token",`key=${o}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Dl.fetch()(a,{method:"POST",headers:c,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Zd(n,e){return vt(n,"POST","/v2/accounts:revokeToken",Mt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){$(e.idToken,"internal-error"),$(typeof e.idToken!="undefined","internal-error"),$(typeof e.refreshToken!="undefined","internal-error");const t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):Ta(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){$(e.length!==0,"internal-error");const t=Ta(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:($(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:r,expiresIn:o}=await Yd(e,t);this.updateTokensAndExpiration(i,r,Number(o))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:r,expirationTime:o}=t,a=new Wt;return i&&($(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),r&&($(typeof r=="string","internal-error",{appName:e}),a.accessToken=r),o&&($(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Wt,this.toJSON())}_performRefresh(){return Ge("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(n,e){$(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}class We{constructor(e){var{uid:t,auth:i,stsTokenManager:r}=e,o=Cs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Qd(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new hs(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Un(this,this.stsTokenManager.getToken(this.auth,e));return $(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Wd(this,e)}reload(){return Jd(this)}_assign(e){this!==e&&($(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new We(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){$(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Gi(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ze(this.auth.app))return Promise.reject(pt(this.auth));const e=await this.getIdToken();return await Un(this,Gd(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,r,o,a,c,h,d,p;const m=(i=t.displayName)!==null&&i!==void 0?i:void 0,E=(r=t.email)!==null&&r!==void 0?r:void 0,R=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,N=(a=t.photoURL)!==null&&a!==void 0?a:void 0,U=(c=t.tenantId)!==null&&c!==void 0?c:void 0,L=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,K=(d=t.createdAt)!==null&&d!==void 0?d:void 0,W=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:S,emailVerified:O,isAnonymous:V,providerData:B,stsTokenManager:w}=t;$(S&&w,e,"internal-error");const g=Wt.fromJSON(this.name,w);$(typeof S=="string",e,"internal-error"),ot(m,e.name),ot(E,e.name),$(typeof O=="boolean",e,"internal-error"),$(typeof V=="boolean",e,"internal-error"),ot(R,e.name),ot(N,e.name),ot(U,e.name),ot(L,e.name),ot(K,e.name),ot(W,e.name);const y=new We({uid:S,auth:e,email:E,emailVerified:O,displayName:m,isAnonymous:V,photoURL:N,phoneNumber:R,tenantId:U,stsTokenManager:g,createdAt:K,lastLoginAt:W});return B&&Array.isArray(B)&&(y.providerData=B.map(v=>Object.assign({},v))),L&&(y._redirectEventId=L),y}static async _fromIdTokenResponse(e,t,i=!1){const r=new Wt;r.updateFromServerResponse(t);const o=new We({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await Gi(o),o}static async _fromGetAccountInfoResponse(e,t,i){const r=t.users[0];$(r.localId!==void 0,"internal-error");const o=r.providerUserInfo!==void 0?Ml(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!(o!=null&&o.length),c=new Wt;c.updateFromIdToken(i);const h=new We({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new hs(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,d),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ba=new Map;function Ke(n){Je(n instanceof Function,"Expected a class definition");let e=ba.get(n);return e?(Je(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ba.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}xl.type="NONE";const Aa=xl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Li(n,e,t){return`firebase:${n}:${e}:${t}`}class Kt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:r,name:o}=this.auth;this.fullUserKey=Li(this.userKey,r.apiKey,o),this.fullPersistenceKey=Li("persistence",r.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?We._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Kt(Ke(Aa),e,i);const r=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=r[0]||Ke(Aa);const a=Li(i,e.config.apiKey,e.name);let c=null;for(const d of t)try{const p=await d._get(a);if(p){const m=We._fromJSON(e,p);d!==o&&(c=m),o=d;break}}catch{}const h=r.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new Kt(o,e,i):(o=h[0],c&&await o._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new Kt(o,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(jl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ul(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ql(e))return"Blackberry";if(Hl(e))return"Webos";if(Fl(e))return"Safari";if((e.includes("chrome/")||$l(e))&&!e.includes("edge/"))return"Chrome";if(Bl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Ul(n=Ie()){return/firefox\//i.test(n)}function Fl(n=Ie()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function $l(n=Ie()){return/crios\//i.test(n)}function jl(n=Ie()){return/iemobile/i.test(n)}function Bl(n=Ie()){return/android/i.test(n)}function ql(n=Ie()){return/blackberry/i.test(n)}function Hl(n=Ie()){return/webos/i.test(n)}function Ls(n=Ie()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function ef(n=Ie()){var e;return Ls(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function tf(){return mh()&&document.documentMode===10}function zl(n=Ie()){return Ls(n)||Bl(n)||Hl(n)||ql(n)||/windows phone/i.test(n)||jl(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gl(n,e=[]){let t;switch(n){case"Browser":t=Sa(Ie());break;case"Worker":t=`${Sa(Ie())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${on}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=o=>new Promise((a,c)=>{try{const h=e(o);a(h)}catch(h){c(h)}});i.onAbort=t,this.queue.push(i);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rf(n,e={}){return vt(n,"GET","/v2/passwordPolicy",Mt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sf=6;class of{constructor(e){var t,i,r,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:sf,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(r=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&r!==void 0?r:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,r,o,a,c;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(i=h.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),h.isValid&&(h.isValid=(r=h.containsLowercaseLetter)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(a=h.containsNumericCharacter)!==null&&a!==void 0?a:!0),h.isValid&&(h.isValid=(c=h.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),h}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let r=0;r<e.length;r++)i=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,r,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(e,t,i,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ra(this),this.idTokenSubscription=new Ra(this),this.beforeStateQueue=new nf(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Cl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ke(t)),this._initializationPromise=this.queue(async()=>{var i,r;if(!this._deleted&&(this.persistenceManager=await Kt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Vl(this,{idToken:e}),i=await We._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ze(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let r=i,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=r==null?void 0:r._redirectEventId,h=await this.tryRedirectSignIn(e);(!a||a===c)&&(h!=null&&h.user)&&(r=h.user,o=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return $(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Gi(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Fd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ze(this.app))return Promise.reject(pt(this));const t=e?de(e):null;return t&&$(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&$(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ze(this.app)?Promise.reject(pt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ze(this.app)?Promise.reject(pt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ke(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await rf(this),t=new of(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Wn("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Zd(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ke(e)||this._popupRedirectResolver;$(t,this,"argument-error"),this.redirectPersistenceManager=await Kt.create(this,[Ke(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,r){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if($(c,this,"internal-error"),c.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,i,r);return()=>{a=!0,h()}}else{const h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return $(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Gl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Md(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function an(n){return de(n)}class Ra{constructor(e){this.auth=e,this.observer=null,this.addObserver=Th(t=>this.observer=t)}get next(){return $(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function lf(n){lr=n}function Wl(n){return lr.loadJS(n)}function cf(){return lr.recaptchaEnterpriseScript}function uf(){return lr.gapiScript}function hf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const df="recaptcha-enterprise",ff="NO_RECAPTCHA";class pf{constructor(e){this.type=df,this.auth=an(e)}async verify(e="verify",t=!1){async function i(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,c)=>{zd(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(h=>{if(h.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new Hd(h);return o.tenantId==null?o._agentRecaptchaConfig=d:o._tenantRecaptchaConfigs[o.tenantId]=d,a(d.siteKey)}}).catch(h=>{c(h)})})}function r(o,a,c){const h=window.grecaptcha;Ia(h)?h.enterprise.ready(()=>{h.enterprise.execute(o,{action:e}).then(d=>{a(d)}).catch(()=>{a(ff)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,a)=>{i(this.auth).then(c=>{if(!t&&Ia(window.grecaptcha))r(c,o,a);else{if(typeof window=="undefined"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let h=cf();h.length!==0&&(h+=c),Wl(h).then(()=>{r(c,o,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function Pa(n,e,t,i=!1){const r=new pf(n);let o;try{o=await r.verify(t)}catch{o=await r.verify(t,!0)}const a=Object.assign({},e);return i?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function ka(n,e,t,i){var r;if(!((r=n._getRecaptchaConfig())===null||r===void 0)&&r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Pa(n,e,t,t==="getOobCode");return i(n,o)}else return i(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Pa(n,e,t,t==="getOobCode");return i(n,a)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mf(n,e){const t=ks(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),o=t.getOptions();if(qi(o,e!=null?e:{}))return r;Ue(r,"already-initialized")}return t.initialize({options:e})}function gf(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Ke);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function yf(n,e,t){const i=an(n);$(i._canInitEmulator,i,"emulator-config-failed"),$(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const r=!1,o=Kl(e),{host:a,port:c}=_f(e),h=c===null?"":`:${c}`;i.config.emulator={url:`${o}//${a}${h}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:r})}),vf()}function Kl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function _f(n){const e=Kl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){const o=r[1];return{host:o,port:Ca(i.substr(o.length+1))}}else{const[o,a]=i.split(":");return{host:o,port:Ca(a)}}}function Ca(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function vf(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ge("not implemented")}_getIdTokenResponse(e){return Ge("not implemented")}_linkToIdToken(e,t){return Ge("not implemented")}_getReauthenticationResolver(e){return Ge("not implemented")}}async function Ef(n,e){return vt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wf(n,e){return ar(n,"POST","/v1/accounts:signInWithPassword",Mt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function If(n,e){return ar(n,"POST","/v1/accounts:signInWithEmailLink",Mt(n,e))}async function Tf(n,e){return ar(n,"POST","/v1/accounts:signInWithEmailLink",Mt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn extends Vs{constructor(e,t,i,r=null){super("password",i),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Fn(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new Fn(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ka(e,t,"signInWithPassword",wf);case"emailLink":return If(e,{email:this._email,oobCode:this._password});default:Ue(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ka(e,i,"signUpPassword",Ef);case"emailLink":return Tf(e,{idToken:t,email:this._email,oobCode:this._password});default:Ue(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qt(n,e){return ar(n,"POST","/v1/accounts:signInWithIdp",Mt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf="http://localhost";class Dt extends Vs{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Dt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ue("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r}=t,o=Cs(t,["providerId","signInMethod"]);if(!i||!r)return null;const a=new Dt(i,r);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Qt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Qt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Qt(e,t)}buildRequest(){const e={requestUri:bf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Kn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Af(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Sf(n){const e=Pn(kn(n)).link,t=e?Pn(kn(e)).deep_link_id:null,i=Pn(kn(n)).deep_link_id;return(i?Pn(kn(i)).link:null)||i||t||e||n}class Ms{constructor(e){var t,i,r,o,a,c;const h=Pn(kn(e)),d=(t=h.apiKey)!==null&&t!==void 0?t:null,p=(i=h.oobCode)!==null&&i!==void 0?i:null,m=Af((r=h.mode)!==null&&r!==void 0?r:null);$(d&&p&&m,"argument-error"),this.apiKey=d,this.operation=m,this.code=p,this.continueUrl=(o=h.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(a=h.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=h.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Sf(e);try{return new Ms(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(){this.providerId=ln.PROVIDER_ID}static credential(e,t){return Fn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=Ms.parseLink(t);return $(i,"argument-error"),Fn._fromEmailAndCode(e,i.code,i.tenantId)}}ln.PROVIDER_ID="password";ln.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ln.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn extends Ql{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at extends Jn{constructor(){super("facebook.com")}static credential(e){return Dt._fromParams({providerId:at.PROVIDER_ID,signInMethod:at.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return at.credentialFromTaggedObject(e)}static credentialFromError(e){return at.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return at.credential(e.oauthAccessToken)}catch{return null}}}at.FACEBOOK_SIGN_IN_METHOD="facebook.com";at.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt extends Jn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Dt._fromParams({providerId:lt.PROVIDER_ID,signInMethod:lt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return lt.credentialFromTaggedObject(e)}static credentialFromError(e){return lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return lt.credential(t,i)}catch{return null}}}lt.GOOGLE_SIGN_IN_METHOD="google.com";lt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct extends Jn{constructor(){super("github.com")}static credential(e){return Dt._fromParams({providerId:ct.PROVIDER_ID,signInMethod:ct.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ct.credentialFromTaggedObject(e)}static credentialFromError(e){return ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ct.credential(e.oauthAccessToken)}catch{return null}}}ct.GITHUB_SIGN_IN_METHOD="github.com";ct.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut extends Jn{constructor(){super("twitter.com")}static credential(e,t){return Dt._fromParams({providerId:ut.PROVIDER_ID,signInMethod:ut.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ut.credentialFromTaggedObject(e)}static credentialFromError(e){return ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return ut.credential(t,i)}catch{return null}}}ut.TWITTER_SIGN_IN_METHOD="twitter.com";ut.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,r=!1){const o=await We._fromIdTokenResponse(e,i,r),a=Na(i);return new Yt({user:o,providerId:a,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const r=Na(i);return new Yt({user:e,providerId:r,_tokenResponse:i,operationType:t})}}function Na(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi extends Xe{constructor(e,t,i,r){var o;super(t.code,t.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,Wi.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,r){return new Wi(e,t,i,r)}}function Jl(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Wi._fromErrorAndOperation(n,o,e,i):o})}async function Rf(n,e,t=!1){const i=await Un(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Yt._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pf(n,e,t=!1){const{auth:i}=n;if(ze(i.app))return Promise.reject(pt(i));const r="reauthenticate";try{const o=await Un(n,Jl(i,r,e,n),t);$(o.idToken,i,"internal-error");const a=Os(o.idToken);$(a,i,"internal-error");const{sub:c}=a;return $(n.uid===c,i,"user-mismatch"),Yt._forOperation(n,r,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Ue(i,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xl(n,e,t=!1){if(ze(n.app))return Promise.reject(pt(n));const i="signIn",r=await Jl(n,i,e),o=await Yt._fromIdTokenResponse(n,i,r);return t||await n._updateCurrentUser(o.user),o}async function kf(n,e){return Xl(an(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cf(n){const e=an(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Nf(n,e,t){return ze(n.app)?Promise.reject(pt(n)):kf(de(n),ln.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&Cf(n),i})}function Df(n,e,t,i){return de(n).onIdTokenChanged(e,t,i)}function Of(n,e,t){return de(n).beforeAuthStateChanged(e,t)}function Lf(n,e,t,i){return de(n).onAuthStateChanged(e,t,i)}function Yl(n){return de(n).signOut()}const Ki="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ki,"1"),this.storage.removeItem(Ki),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vf=1e3,Mf=10;class ec extends Zl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=zl(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),r=this.localCache[t];i!==r&&e(t,r,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,h)=>{this.notifyListeners(a,h)});return}const i=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const a=this.storage.getItem(i);!t&&this.localCache[i]===a||this.notifyListeners(i,a)},o=this.storage.getItem(i);tf()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Mf):r()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Vf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ec.type="LOCAL";const xf=ec;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc extends Zl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}tc.type="SESSION";const nc=tc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uf(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const i=new cr(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:r,data:o}=t.data,a=this.handlersMap[r];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:r});const c=Array.from(a).map(async d=>d(t.origin,o)),h=await Uf(c);t.ports[0].postMessage({status:"done",eventId:i,eventType:r,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}cr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xs(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const r=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let o,a;return new Promise((c,h)=>{const d=xs("",20);r.port1.start();const p=setTimeout(()=>{h(new Error("unsupported_event"))},i);a={messageChannel:r,onMessage(m){const E=m;if(E.data.eventId===d)switch(E.data.status){case"ack":clearTimeout(p),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),c(E.data.response);break;default:clearTimeout(p),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(){return window}function $f(n){$e().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ic(){return typeof $e().WorkerGlobalScope!="undefined"&&typeof $e().importScripts=="function"}async function jf(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Bf(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function qf(){return ic()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rc="firebaseLocalStorageDb",Hf=1,Qi="firebaseLocalStorage",sc="fbase_key";class Xn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ur(n,e){return n.transaction([Qi],e?"readwrite":"readonly").objectStore(Qi)}function zf(){const n=indexedDB.deleteDatabase(rc);return new Xn(n).toPromise()}function ds(){const n=indexedDB.open(rc,Hf);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Qi,{keyPath:sc})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Qi)?e(i):(i.close(),await zf(),e(await ds()))})})}async function Da(n,e,t){const i=ur(n,!0).put({[sc]:e,value:t});return new Xn(i).toPromise()}async function Gf(n,e){const t=ur(n,!1).get(e),i=await new Xn(t).toPromise();return i===void 0?null:i.value}function Oa(n,e){const t=ur(n,!0).delete(e);return new Xn(t).toPromise()}const Wf=800,Kf=3;class oc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ds(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>Kf)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ic()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=cr._getInstance(qf()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await jf(),!this.activeServiceWorker)return;this.sender=new Ff(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Bf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ds();return await Da(e,Ki,"1"),await Oa(e,Ki),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Da(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>Gf(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Oa(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const o=ur(r,!1).getAll();return new Xn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:r,value:o}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(o)&&(this.notifyListeners(r,o),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!i.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Wf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}oc.type="LOCAL";const Qf=oc;new Qn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf(n,e){return e?Ke(e):($(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us extends Vs{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Qt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Qt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Qt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Xf(n){return Xl(n.auth,new Us(n),n.bypassAuthState)}function Yf(n){const{auth:e,user:t}=n;return $(t,e,"internal-error"),Pf(t,new Us(n),n.bypassAuthState)}async function Zf(n){const{auth:e,user:t}=n;return $(t,e,"internal-error"),Rf(t,new Us(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e,t,i,r,o=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:r,tenantId:o,error:a,type:c}=e;if(a){this.reject(a);return}const h={auth:this.auth,requestUri:t,sessionId:i,tenantId:o||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(h))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Xf;case"linkViaPopup":case"linkViaRedirect":return Zf;case"reauthViaPopup":case"reauthViaRedirect":return Yf;default:Ue(this.auth,"internal-error")}}resolve(e){Je(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Je(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ep=new Qn(2e3,1e4);class Gt extends ac{constructor(e,t,i,r,o){super(e,t,r,o),this.provider=i,this.authWindow=null,this.pollId=null,Gt.currentPopupAction&&Gt.currentPopupAction.cancel(),Gt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return $(e,this.auth,"internal-error"),e}async onExecution(){Je(this.filter.length===1,"Popup operations only handle one event");const e=xs();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Fe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Fe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Gt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Fe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ep.get())};e()}}Gt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tp="pendingRedirect",Vi=new Map;class np extends ac{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Vi.get(this.auth._key());if(!e){try{const i=await ip(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Vi.set(this.auth._key(),e)}return this.bypassAuthState||Vi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ip(n,e){const t=op(e),i=sp(n);if(!await i._isAvailable())return!1;const r=await i._get(t)==="true";return await i._remove(t),r}function rp(n,e){Vi.set(n._key(),e)}function sp(n){return Ke(n._redirectPersistence)}function op(n){return Li(tp,n.config.apiKey,n.name)}async function ap(n,e,t=!1){if(ze(n.app))return Promise.reject(pt(n));const i=an(n),r=Jf(i,e),a=await new np(i,r,t).execute();return a&&!t&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp=10*60*1e3;class cp{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!up(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!lc(e)){const r=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(Fe(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=lp&&this.cachedEventUids.clear(),this.cachedEventUids.has(La(e))}saveEventToCache(e){this.cachedEventUids.add(La(e)),this.lastProcessedEventTime=Date.now()}}function La(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function lc({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function up(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return lc(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hp(n,e={}){return vt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,fp=/^https?/;async function pp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await hp(n);for(const t of e)try{if(mp(t))return}catch{}Ue(n,"unauthorized-domain")}function mp(n){const e=us(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===i}if(!fp.test(t))return!1;if(dp.test(n))return i===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp=new Qn(3e4,6e4);function Va(){const n=$e().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function yp(n){return new Promise((e,t)=>{var i,r,o;function a(){Va(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Va(),t(Fe(n,"network-request-failed"))},timeout:gp.get()})}if(!((r=(i=$e().gapi)===null||i===void 0?void 0:i.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((o=$e().gapi)===null||o===void 0)&&o.load)a();else{const c=hf("iframefcb");return $e()[c]=()=>{gapi.load?a():t(Fe(n,"network-request-failed"))},Wl(`${uf()}?onload=${c}`).catch(h=>t(h))}}).catch(e=>{throw Mi=null,e})}let Mi=null;function _p(n){return Mi=Mi||yp(n),Mi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vp=new Qn(5e3,15e3),Ep="__/auth/iframe",wp="emulator/auth/iframe",Ip={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Tp=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function bp(n){const e=n.config;$(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ds(e,wp):`https://${n.config.authDomain}/${Ep}`,i={apiKey:e.apiKey,appName:n.name,v:on},r=Tp.get(n.config.apiHost);r&&(i.eid=r);const o=n._getFrameworks();return o.length&&(i.fw=o.join(",")),`${t}?${Kn(i).slice(1)}`}async function Ap(n){const e=await _p(n),t=$e().gapi;return $(t,n,"internal-error"),e.open({where:document.body,url:bp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ip,dontclear:!0},i=>new Promise(async(r,o)=>{await i.restyle({setHideOnLeave:!1});const a=Fe(n,"network-request-failed"),c=$e().setTimeout(()=>{o(a)},vp.get());function h(){$e().clearTimeout(c),r(i)}i.ping(h).then(h,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Rp=500,Pp=600,kp="_blank",Cp="http://localhost";class Ma{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Np(n,e,t,i=Rp,r=Pp){const o=Math.max((window.screen.availHeight-r)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let c="";const h=Object.assign(Object.assign({},Sp),{width:i.toString(),height:r.toString(),top:o,left:a}),d=Ie().toLowerCase();t&&(c=$l(d)?kp:t),Ul(d)&&(e=e||Cp,h.scrollbars="yes");const p=Object.entries(h).reduce((E,[R,N])=>`${E}${R}=${N},`,"");if(ef(d)&&c!=="_self")return Dp(e||"",c),new Ma(null);const m=window.open(e||"",c,p);$(m,n,"popup-blocked");try{m.focus()}catch{}return new Ma(m)}function Dp(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Op="__/auth/handler",Lp="emulator/auth/handler",Vp=encodeURIComponent("fac");async function xa(n,e,t,i,r,o){$(n.config.authDomain,n,"auth-domain-config-required"),$(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:on,eventId:r};if(e instanceof Ql){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Ih(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))a[p]=m}if(e instanceof Jn){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const h=await n._getAppCheckToken(),d=h?`#${Vp}=${encodeURIComponent(h)}`:"";return`${Mp(n)}?${Kn(c).slice(1)}${d}`}function Mp({config:n}){return n.emulator?Ds(n,Lp):`https://${n.authDomain}/${Op}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es="webStorageSupport";class xp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=nc,this._completeRedirectFn=ap,this._overrideRedirectResult=rp}async _openPopup(e,t,i,r){var o;Je((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await xa(e,t,i,us(),r);return Np(e,a,xs())}async _openRedirect(e,t,i,r){await this._originValidation(e);const o=await xa(e,t,i,us(),r);return $f(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:o}=this.eventManagers[t];return r?Promise.resolve(r):(Je(o,"If manager is not set, promise should be"),o)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Ap(e),i=new cp(e);return t.register("authEvent",r=>($(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:i.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(es,{type:es},r=>{var o;const a=(o=r==null?void 0:r[0])===null||o===void 0?void 0:o[es];a!==void 0&&t(!!a),Ue(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=pp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return zl()||Fl()||Ls()}}const Up=xp;var Ua="@firebase/auth",Fa="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){$(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $p(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function jp(n){Xt(new Nt("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=i.options;$(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const h={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Gl(n)},d=new af(i,r,o,h);return gf(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Xt(new Nt("auth-internal",e=>{const t=an(e.getProvider("auth").getImmediate());return(i=>new Fp(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ft(Ua,Fa,$p(n)),ft(Ua,Fa,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bp=5*60,qp=Il("authIdTokenMaxAge")||Bp;let $a=null;const Hp=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>qp)return;const r=t==null?void 0:t.token;$a!==r&&($a=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function zp(n=Sl()){const e=ks(n,"auth");if(e.isInitialized())return e.getImmediate();const t=mf(n,{popupRedirectResolver:Up,persistence:[Qf,xf,nc]}),i=Il("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(i,location.origin);if(location.origin===o.origin){const a=Hp(o.toString());Of(t,a,()=>a(t.currentUser)),Df(t,c=>a(c))}}const r=El("auth");return r&&yf(t,`http://${r}`),t}function Gp(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}lf({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=r=>{const o=Fe("internal-error");o.customData=r,t(o)},i.type="text/javascript",i.charset="UTF-8",Gp().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});jp("Browser");var ja=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var cc;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,g){function y(){}y.prototype=g.prototype,w.D=g.prototype,w.prototype=new y,w.prototype.constructor=w,w.C=function(v,I,b){for(var _=Array(arguments.length-2),Ce=2;Ce<arguments.length;Ce++)_[Ce-2]=arguments[Ce];return g.prototype[I].apply(v,_)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,t),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(w,g,y){y||(y=0);var v=Array(16);if(typeof g=="string")for(var I=0;16>I;++I)v[I]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(I=0;16>I;++I)v[I]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=w.g[0],y=w.g[1],I=w.g[2];var b=w.g[3],_=g+(b^y&(I^b))+v[0]+3614090360&4294967295;g=y+(_<<7&4294967295|_>>>25),_=b+(I^g&(y^I))+v[1]+3905402710&4294967295,b=g+(_<<12&4294967295|_>>>20),_=I+(y^b&(g^y))+v[2]+606105819&4294967295,I=b+(_<<17&4294967295|_>>>15),_=y+(g^I&(b^g))+v[3]+3250441966&4294967295,y=I+(_<<22&4294967295|_>>>10),_=g+(b^y&(I^b))+v[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=b+(I^g&(y^I))+v[5]+1200080426&4294967295,b=g+(_<<12&4294967295|_>>>20),_=I+(y^b&(g^y))+v[6]+2821735955&4294967295,I=b+(_<<17&4294967295|_>>>15),_=y+(g^I&(b^g))+v[7]+4249261313&4294967295,y=I+(_<<22&4294967295|_>>>10),_=g+(b^y&(I^b))+v[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=b+(I^g&(y^I))+v[9]+2336552879&4294967295,b=g+(_<<12&4294967295|_>>>20),_=I+(y^b&(g^y))+v[10]+4294925233&4294967295,I=b+(_<<17&4294967295|_>>>15),_=y+(g^I&(b^g))+v[11]+2304563134&4294967295,y=I+(_<<22&4294967295|_>>>10),_=g+(b^y&(I^b))+v[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=b+(I^g&(y^I))+v[13]+4254626195&4294967295,b=g+(_<<12&4294967295|_>>>20),_=I+(y^b&(g^y))+v[14]+2792965006&4294967295,I=b+(_<<17&4294967295|_>>>15),_=y+(g^I&(b^g))+v[15]+1236535329&4294967295,y=I+(_<<22&4294967295|_>>>10),_=g+(I^b&(y^I))+v[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^I&(g^y))+v[6]+3225465664&4294967295,b=g+(_<<9&4294967295|_>>>23),_=I+(g^y&(b^g))+v[11]+643717713&4294967295,I=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(I^b))+v[0]+3921069994&4294967295,y=I+(_<<20&4294967295|_>>>12),_=g+(I^b&(y^I))+v[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^I&(g^y))+v[10]+38016083&4294967295,b=g+(_<<9&4294967295|_>>>23),_=I+(g^y&(b^g))+v[15]+3634488961&4294967295,I=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(I^b))+v[4]+3889429448&4294967295,y=I+(_<<20&4294967295|_>>>12),_=g+(I^b&(y^I))+v[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^I&(g^y))+v[14]+3275163606&4294967295,b=g+(_<<9&4294967295|_>>>23),_=I+(g^y&(b^g))+v[3]+4107603335&4294967295,I=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(I^b))+v[8]+1163531501&4294967295,y=I+(_<<20&4294967295|_>>>12),_=g+(I^b&(y^I))+v[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=b+(y^I&(g^y))+v[2]+4243563512&4294967295,b=g+(_<<9&4294967295|_>>>23),_=I+(g^y&(b^g))+v[7]+1735328473&4294967295,I=b+(_<<14&4294967295|_>>>18),_=y+(b^g&(I^b))+v[12]+2368359562&4294967295,y=I+(_<<20&4294967295|_>>>12),_=g+(y^I^b)+v[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^I)+v[8]+2272392833&4294967295,b=g+(_<<11&4294967295|_>>>21),_=I+(b^g^y)+v[11]+1839030562&4294967295,I=b+(_<<16&4294967295|_>>>16),_=y+(I^b^g)+v[14]+4259657740&4294967295,y=I+(_<<23&4294967295|_>>>9),_=g+(y^I^b)+v[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^I)+v[4]+1272893353&4294967295,b=g+(_<<11&4294967295|_>>>21),_=I+(b^g^y)+v[7]+4139469664&4294967295,I=b+(_<<16&4294967295|_>>>16),_=y+(I^b^g)+v[10]+3200236656&4294967295,y=I+(_<<23&4294967295|_>>>9),_=g+(y^I^b)+v[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^I)+v[0]+3936430074&4294967295,b=g+(_<<11&4294967295|_>>>21),_=I+(b^g^y)+v[3]+3572445317&4294967295,I=b+(_<<16&4294967295|_>>>16),_=y+(I^b^g)+v[6]+76029189&4294967295,y=I+(_<<23&4294967295|_>>>9),_=g+(y^I^b)+v[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=b+(g^y^I)+v[12]+3873151461&4294967295,b=g+(_<<11&4294967295|_>>>21),_=I+(b^g^y)+v[15]+530742520&4294967295,I=b+(_<<16&4294967295|_>>>16),_=y+(I^b^g)+v[2]+3299628645&4294967295,y=I+(_<<23&4294967295|_>>>9),_=g+(I^(y|~b))+v[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~I))+v[7]+1126891415&4294967295,b=g+(_<<10&4294967295|_>>>22),_=I+(g^(b|~y))+v[14]+2878612391&4294967295,I=b+(_<<15&4294967295|_>>>17),_=y+(b^(I|~g))+v[5]+4237533241&4294967295,y=I+(_<<21&4294967295|_>>>11),_=g+(I^(y|~b))+v[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~I))+v[3]+2399980690&4294967295,b=g+(_<<10&4294967295|_>>>22),_=I+(g^(b|~y))+v[10]+4293915773&4294967295,I=b+(_<<15&4294967295|_>>>17),_=y+(b^(I|~g))+v[1]+2240044497&4294967295,y=I+(_<<21&4294967295|_>>>11),_=g+(I^(y|~b))+v[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~I))+v[15]+4264355552&4294967295,b=g+(_<<10&4294967295|_>>>22),_=I+(g^(b|~y))+v[6]+2734768916&4294967295,I=b+(_<<15&4294967295|_>>>17),_=y+(b^(I|~g))+v[13]+1309151649&4294967295,y=I+(_<<21&4294967295|_>>>11),_=g+(I^(y|~b))+v[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=b+(y^(g|~I))+v[11]+3174756917&4294967295,b=g+(_<<10&4294967295|_>>>22),_=I+(g^(b|~y))+v[2]+718787259&4294967295,I=b+(_<<15&4294967295|_>>>17),_=y+(b^(I|~g))+v[9]+3951481745&4294967295,w.g[0]=w.g[0]+g&4294967295,w.g[1]=w.g[1]+(I+(_<<21&4294967295|_>>>11))&4294967295,w.g[2]=w.g[2]+I&4294967295,w.g[3]=w.g[3]+b&4294967295}i.prototype.u=function(w,g){g===void 0&&(g=w.length);for(var y=g-this.blockSize,v=this.B,I=this.h,b=0;b<g;){if(I==0)for(;b<=y;)r(this,w,b),b+=this.blockSize;if(typeof w=="string"){for(;b<g;)if(v[I++]=w.charCodeAt(b++),I==this.blockSize){r(this,v),I=0;break}}else for(;b<g;)if(v[I++]=w[b++],I==this.blockSize){r(this,v),I=0;break}}this.h=I,this.o+=g},i.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var g=1;g<w.length-8;++g)w[g]=0;var y=8*this.o;for(g=w.length-8;g<w.length;++g)w[g]=y&255,y/=256;for(this.u(w),w=Array(16),g=y=0;4>g;++g)for(var v=0;32>v;v+=8)w[y++]=this.g[g]>>>v&255;return w};function o(w,g){var y=c;return Object.prototype.hasOwnProperty.call(y,w)?y[w]:y[w]=g(w)}function a(w,g){this.h=g;for(var y=[],v=!0,I=w.length-1;0<=I;I--){var b=w[I]|0;v&&b==g||(y[I]=b,v=!1)}this.g=y}var c={};function h(w){return-128<=w&&128>w?o(w,function(g){return new a([g|0],0>g?-1:0)}):new a([w|0],0>w?-1:0)}function d(w){if(isNaN(w)||!isFinite(w))return m;if(0>w)return L(d(-w));for(var g=[],y=1,v=0;w>=y;v++)g[v]=w/y|0,y*=4294967296;return new a(g,0)}function p(w,g){if(w.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(w.charAt(0)=="-")return L(p(w.substring(1),g));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(g,8)),v=m,I=0;I<w.length;I+=8){var b=Math.min(8,w.length-I),_=parseInt(w.substring(I,I+b),g);8>b?(b=d(Math.pow(g,b)),v=v.j(b).add(d(_))):(v=v.j(y),v=v.add(d(_)))}return v}var m=h(0),E=h(1),R=h(16777216);n=a.prototype,n.m=function(){if(U(this))return-L(this).m();for(var w=0,g=1,y=0;y<this.g.length;y++){var v=this.i(y);w+=(0<=v?v:4294967296+v)*g,g*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(N(this))return"0";if(U(this))return"-"+L(this).toString(w);for(var g=d(Math.pow(w,6)),y=this,v="";;){var I=O(y,g).g;y=K(y,I.j(g));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(w);if(y=I,N(y))return b+v;for(;6>b.length;)b="0"+b;v=b+v}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function N(w){if(w.h!=0)return!1;for(var g=0;g<w.g.length;g++)if(w.g[g]!=0)return!1;return!0}function U(w){return w.h==-1}n.l=function(w){return w=K(this,w),U(w)?-1:N(w)?0:1};function L(w){for(var g=w.g.length,y=[],v=0;v<g;v++)y[v]=~w.g[v];return new a(y,~w.h).add(E)}n.abs=function(){return U(this)?L(this):this},n.add=function(w){for(var g=Math.max(this.g.length,w.g.length),y=[],v=0,I=0;I<=g;I++){var b=v+(this.i(I)&65535)+(w.i(I)&65535),_=(b>>>16)+(this.i(I)>>>16)+(w.i(I)>>>16);v=_>>>16,b&=65535,_&=65535,y[I]=_<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function K(w,g){return w.add(L(g))}n.j=function(w){if(N(this)||N(w))return m;if(U(this))return U(w)?L(this).j(L(w)):L(L(this).j(w));if(U(w))return L(this.j(L(w)));if(0>this.l(R)&&0>w.l(R))return d(this.m()*w.m());for(var g=this.g.length+w.g.length,y=[],v=0;v<2*g;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(var I=0;I<w.g.length;I++){var b=this.i(v)>>>16,_=this.i(v)&65535,Ce=w.i(I)>>>16,Ze=w.i(I)&65535;y[2*v+2*I]+=_*Ze,W(y,2*v+2*I),y[2*v+2*I+1]+=b*Ze,W(y,2*v+2*I+1),y[2*v+2*I+1]+=_*Ce,W(y,2*v+2*I+1),y[2*v+2*I+2]+=b*Ce,W(y,2*v+2*I+2)}for(v=0;v<g;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=g;v<2*g;v++)y[v]=0;return new a(y,0)};function W(w,g){for(;(w[g]&65535)!=w[g];)w[g+1]+=w[g]>>>16,w[g]&=65535,g++}function S(w,g){this.g=w,this.h=g}function O(w,g){if(N(g))throw Error("division by zero");if(N(w))return new S(m,m);if(U(w))return g=O(L(w),g),new S(L(g.g),L(g.h));if(U(g))return g=O(w,L(g)),new S(L(g.g),g.h);if(30<w.g.length){if(U(w)||U(g))throw Error("slowDivide_ only works with positive integers.");for(var y=E,v=g;0>=v.l(w);)y=V(y),v=V(v);var I=B(y,1),b=B(v,1);for(v=B(v,2),y=B(y,2);!N(v);){var _=b.add(v);0>=_.l(w)&&(I=I.add(y),b=_),v=B(v,1),y=B(y,1)}return g=K(w,I.j(g)),new S(I,g)}for(I=m;0<=w.l(g);){for(y=Math.max(1,Math.floor(w.m()/g.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),b=d(y),_=b.j(g);U(_)||0<_.l(w);)y-=v,b=d(y),_=b.j(g);N(b)&&(b=E),I=I.add(b),w=K(w,_)}return new S(I,w)}n.A=function(w){return O(this,w).h},n.and=function(w){for(var g=Math.max(this.g.length,w.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)&w.i(v);return new a(y,this.h&w.h)},n.or=function(w){for(var g=Math.max(this.g.length,w.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)|w.i(v);return new a(y,this.h|w.h)},n.xor=function(w){for(var g=Math.max(this.g.length,w.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)^w.i(v);return new a(y,this.h^w.h)};function V(w){for(var g=w.g.length+1,y=[],v=0;v<g;v++)y[v]=w.i(v)<<1|w.i(v-1)>>>31;return new a(y,w.h)}function B(w,g){var y=g>>5;g%=32;for(var v=w.g.length-y,I=[],b=0;b<v;b++)I[b]=0<g?w.i(b+y)>>>g|w.i(b+y+1)<<32-g:w.i(b+y);return new a(I,w.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,cc=a}).apply(typeof ja!="undefined"?ja:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var bi=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var uc,Cn,hc,xi,fs,dc,fc,pc;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,l,u){return s==Array.prototype||s==Object.prototype||(s[l]=u.value),s};function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof bi=="object"&&bi];for(var l=0;l<s.length;++l){var u=s[l];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var i=t(this);function r(s,l){if(l)e:{var u=i;s=s.split(".");for(var f=0;f<s.length-1;f++){var T=s[f];if(!(T in u))break e;u=u[T]}s=s[s.length-1],f=u[s],l=l(f),l!=f&&l!=null&&e(u,s,{configurable:!0,writable:!0,value:l})}}function o(s,l){s instanceof String&&(s+="");var u=0,f=!1,T={next:function(){if(!f&&u<s.length){var A=u++;return{value:l(A,s[A]),done:!1}}return f=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}r("Array.prototype.values",function(s){return s||function(){return o(this,function(l,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function h(s){var l=typeof s;return l=l!="object"?l:s?Array.isArray(s)?"array":l:"null",l=="array"||l=="object"&&typeof s.length=="number"}function d(s){var l=typeof s;return l=="object"&&s!=null||l=="function"}function p(s,l,u){return s.call.apply(s.bind,arguments)}function m(s,l,u){if(!s)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,f),s.apply(l,T)}}return function(){return s.apply(l,arguments)}}function E(s,l,u){return E=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:m,E.apply(null,arguments)}function R(s,l){var u=Array.prototype.slice.call(arguments,1);return function(){var f=u.slice();return f.push.apply(f,arguments),s.apply(this,f)}}function N(s,l){function u(){}u.prototype=l.prototype,s.aa=l.prototype,s.prototype=new u,s.prototype.constructor=s,s.Qb=function(f,T,A){for(var D=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)D[Q-2]=arguments[Q];return l.prototype[T].apply(f,D)}}function U(s){const l=s.length;if(0<l){const u=Array(l);for(let f=0;f<l;f++)u[f]=s[f];return u}return[]}function L(s,l){for(let u=1;u<arguments.length;u++){const f=arguments[u];if(h(f)){const T=s.length||0,A=f.length||0;s.length=T+A;for(let D=0;D<A;D++)s[T+D]=f[D]}else s.push(f)}}class K{constructor(l,u){this.i=l,this.j=u,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function W(s){return/^[\s\xa0]*$/.test(s)}function S(){var s=c.navigator;return s&&(s=s.userAgent)?s:""}function O(s){return O[" "](s),s}O[" "]=function(){};var V=S().indexOf("Gecko")!=-1&&!(S().toLowerCase().indexOf("webkit")!=-1&&S().indexOf("Edge")==-1)&&!(S().indexOf("Trident")!=-1||S().indexOf("MSIE")!=-1)&&S().indexOf("Edge")==-1;function B(s,l,u){for(const f in s)l.call(u,s[f],f,s)}function w(s,l){for(const u in s)l.call(void 0,s[u],u,s)}function g(s){const l={};for(const u in s)l[u]=s[u];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(s,l){let u,f;for(let T=1;T<arguments.length;T++){f=arguments[T];for(u in f)s[u]=f[u];for(let A=0;A<y.length;A++)u=y[A],Object.prototype.hasOwnProperty.call(f,u)&&(s[u]=f[u])}}function I(s){var l=1;s=s.split(":");const u=[];for(;0<l&&s.length;)u.push(s.shift()),l--;return s.length&&u.push(s.join(":")),u}function b(s){c.setTimeout(()=>{throw s},0)}function _(){var s=re;let l=null;return s.g&&(l=s.g,s.g=s.g.next,s.g||(s.h=null),l.next=null),l}class Ce{constructor(){this.h=this.g=null}add(l,u){const f=Ze.get();f.set(l,u),this.h?this.h.next=f:this.g=f,this.h=f}}var Ze=new K(()=>new ii,s=>s.reset());class ii{constructor(){this.next=this.g=this.h=null}set(l,u){this.h=l,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let et,tt=!1,re=new Ce,It=()=>{const s=c.Promise.resolve(void 0);et=()=>{s.then(nt)}};var nt=()=>{for(var s;s=_();){try{s.h.call(s.g)}catch(u){b(u)}var l=Ze;l.j(s),100>l.h&&(l.h++,s.next=l.g,l.g=s)}tt=!1};function De(){this.s=this.s,this.C=this.C}De.prototype.s=!1,De.prototype.ma=function(){this.s||(this.s=!0,this.N())},De.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function pe(s,l){this.type=s,this.g=this.target=l,this.defaultPrevented=!1}pe.prototype.h=function(){this.defaultPrevented=!0};var wu=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,l=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const u=()=>{};c.addEventListener("test",u,l),c.removeEventListener("test",u,l)}catch{}return s}();function dn(s,l){if(pe.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var u=this.type=s.type,f=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=l,l=s.relatedTarget){if(V){e:{try{O(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else u=="mouseover"?l=s.fromElement:u=="mouseout"&&(l=s.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:Iu[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&dn.aa.h.call(this)}}N(dn,pe);var Iu={2:"touch",3:"pen",4:"mouse"};dn.prototype.h=function(){dn.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var ri="closure_listenable_"+(1e6*Math.random()|0),Tu=0;function bu(s,l,u,f,T){this.listener=s,this.proxy=null,this.src=l,this.type=u,this.capture=!!f,this.ha=T,this.key=++Tu,this.da=this.fa=!1}function si(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function oi(s){this.src=s,this.g={},this.h=0}oi.prototype.add=function(s,l,u,f,T){var A=s.toString();s=this.g[A],s||(s=this.g[A]=[],this.h++);var D=Sr(s,l,f,T);return-1<D?(l=s[D],u||(l.fa=!1)):(l=new bu(l,this.src,A,!!f,T),l.fa=u,s.push(l)),l};function Ar(s,l){var u=l.type;if(u in s.g){var f=s.g[u],T=Array.prototype.indexOf.call(f,l,void 0),A;(A=0<=T)&&Array.prototype.splice.call(f,T,1),A&&(si(l),s.g[u].length==0&&(delete s.g[u],s.h--))}}function Sr(s,l,u,f){for(var T=0;T<s.length;++T){var A=s[T];if(!A.da&&A.listener==l&&A.capture==!!u&&A.ha==f)return T}return-1}var Rr="closure_lm_"+(1e6*Math.random()|0),Pr={};function ho(s,l,u,f,T){if(Array.isArray(l)){for(var A=0;A<l.length;A++)ho(s,l[A],u,f,T);return null}return u=mo(u),s&&s[ri]?s.K(l,u,d(f)?!!f.capture:!1,T):Au(s,l,u,!1,f,T)}function Au(s,l,u,f,T,A){if(!l)throw Error("Invalid event type");var D=d(T)?!!T.capture:!!T,Q=Cr(s);if(Q||(s[Rr]=Q=new oi(s)),u=Q.add(l,u,f,D,A),u.proxy)return u;if(f=Su(),u.proxy=f,f.src=s,f.listener=u,s.addEventListener)wu||(T=D),T===void 0&&(T=!1),s.addEventListener(l.toString(),f,T);else if(s.attachEvent)s.attachEvent(po(l.toString()),f);else if(s.addListener&&s.removeListener)s.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Su(){function s(u){return l.call(s.src,s.listener,u)}const l=Ru;return s}function fo(s,l,u,f,T){if(Array.isArray(l))for(var A=0;A<l.length;A++)fo(s,l[A],u,f,T);else f=d(f)?!!f.capture:!!f,u=mo(u),s&&s[ri]?(s=s.i,l=String(l).toString(),l in s.g&&(A=s.g[l],u=Sr(A,u,f,T),-1<u&&(si(A[u]),Array.prototype.splice.call(A,u,1),A.length==0&&(delete s.g[l],s.h--)))):s&&(s=Cr(s))&&(l=s.g[l.toString()],s=-1,l&&(s=Sr(l,u,f,T)),(u=-1<s?l[s]:null)&&kr(u))}function kr(s){if(typeof s!="number"&&s&&!s.da){var l=s.src;if(l&&l[ri])Ar(l.i,s);else{var u=s.type,f=s.proxy;l.removeEventListener?l.removeEventListener(u,f,s.capture):l.detachEvent?l.detachEvent(po(u),f):l.addListener&&l.removeListener&&l.removeListener(f),(u=Cr(l))?(Ar(u,s),u.h==0&&(u.src=null,l[Rr]=null)):si(s)}}}function po(s){return s in Pr?Pr[s]:Pr[s]="on"+s}function Ru(s,l){if(s.da)s=!0;else{l=new dn(l,this);var u=s.listener,f=s.ha||s.src;s.fa&&kr(s),s=u.call(f,l)}return s}function Cr(s){return s=s[Rr],s instanceof oi?s:null}var Nr="__closure_events_fn_"+(1e9*Math.random()>>>0);function mo(s){return typeof s=="function"?s:(s[Nr]||(s[Nr]=function(l){return s.handleEvent(l)}),s[Nr])}function me(){De.call(this),this.i=new oi(this),this.M=this,this.F=null}N(me,De),me.prototype[ri]=!0,me.prototype.removeEventListener=function(s,l,u,f){fo(this,s,l,u,f)};function Te(s,l){var u,f=s.F;if(f)for(u=[];f;f=f.F)u.push(f);if(s=s.M,f=l.type||l,typeof l=="string")l=new pe(l,s);else if(l instanceof pe)l.target=l.target||s;else{var T=l;l=new pe(f,s),v(l,T)}if(T=!0,u)for(var A=u.length-1;0<=A;A--){var D=l.g=u[A];T=ai(D,f,!0,l)&&T}if(D=l.g=s,T=ai(D,f,!0,l)&&T,T=ai(D,f,!1,l)&&T,u)for(A=0;A<u.length;A++)D=l.g=u[A],T=ai(D,f,!1,l)&&T}me.prototype.N=function(){if(me.aa.N.call(this),this.i){var s=this.i,l;for(l in s.g){for(var u=s.g[l],f=0;f<u.length;f++)si(u[f]);delete s.g[l],s.h--}}this.F=null},me.prototype.K=function(s,l,u,f){return this.i.add(String(s),l,!1,u,f)},me.prototype.L=function(s,l,u,f){return this.i.add(String(s),l,!0,u,f)};function ai(s,l,u,f){if(l=s.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,A=0;A<l.length;++A){var D=l[A];if(D&&!D.da&&D.capture==u){var Q=D.listener,le=D.ha||D.src;D.fa&&Ar(s.i,D),T=Q.call(le,f)!==!1&&T}}return T&&!f.defaultPrevented}function go(s,l,u){if(typeof s=="function")u&&(s=E(s,u));else if(s&&typeof s.handleEvent=="function")s=E(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(s,l||0)}function yo(s){s.g=go(()=>{s.g=null,s.i&&(s.i=!1,yo(s))},s.l);const l=s.h;s.h=null,s.m.apply(null,l)}class Pu extends De{constructor(l,u){super(),this.m=l,this.l=u,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:yo(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function fn(s){De.call(this),this.h=s,this.g={}}N(fn,De);var _o=[];function vo(s){B(s.g,function(l,u){this.g.hasOwnProperty(u)&&kr(l)},s),s.g={}}fn.prototype.N=function(){fn.aa.N.call(this),vo(this)},fn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Dr=c.JSON.stringify,ku=c.JSON.parse,Cu=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function Or(){}Or.prototype.h=null;function Eo(s){return s.h||(s.h=s.i())}function wo(){}var pn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Lr(){pe.call(this,"d")}N(Lr,pe);function Vr(){pe.call(this,"c")}N(Vr,pe);var Tt={},Io=null;function li(){return Io=Io||new me}Tt.La="serverreachability";function To(s){pe.call(this,Tt.La,s)}N(To,pe);function mn(s){const l=li();Te(l,new To(l))}Tt.STAT_EVENT="statevent";function bo(s,l){pe.call(this,Tt.STAT_EVENT,s),this.stat=l}N(bo,pe);function be(s){const l=li();Te(l,new bo(l,s))}Tt.Ma="timingevent";function Ao(s,l){pe.call(this,Tt.Ma,s),this.size=l}N(Ao,pe);function gn(s,l){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},l)}function yn(){this.g=!0}yn.prototype.xa=function(){this.g=!1};function Nu(s,l,u,f,T,A){s.info(function(){if(s.g)if(A)for(var D="",Q=A.split("&"),le=0;le<Q.length;le++){var G=Q[le].split("=");if(1<G.length){var ge=G[0];G=G[1];var ye=ge.split("_");D=2<=ye.length&&ye[1]=="type"?D+(ge+"="+G+"&"):D+(ge+"=redacted&")}}else D=null;else D=A;return"XMLHTTP REQ ("+f+") [attempt "+T+"]: "+l+`
`+u+`
`+D})}function Du(s,l,u,f,T,A,D){s.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+T+"]: "+l+`
`+u+`
`+A+" "+D})}function xt(s,l,u,f){s.info(function(){return"XMLHTTP TEXT ("+l+"): "+Lu(s,u)+(f?" "+f:"")})}function Ou(s,l){s.info(function(){return"TIMEOUT: "+l})}yn.prototype.info=function(){};function Lu(s,l){if(!s.g)return l;if(!l)return null;try{var u=JSON.parse(l);if(u){for(s=0;s<u.length;s++)if(Array.isArray(u[s])){var f=u[s];if(!(2>f.length)){var T=f[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var D=1;D<T.length;D++)T[D]=""}}}}return Dr(u)}catch{return l}}var ci={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},So={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Mr;function ui(){}N(ui,Or),ui.prototype.g=function(){return new XMLHttpRequest},ui.prototype.i=function(){return{}},Mr=new ui;function it(s,l,u,f){this.j=s,this.i=l,this.l=u,this.R=f||1,this.U=new fn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ro}function Ro(){this.i=null,this.g="",this.h=!1}var Po={},xr={};function Ur(s,l,u){s.L=1,s.v=pi(qe(l)),s.m=u,s.P=!0,ko(s,null)}function ko(s,l){s.F=Date.now(),hi(s),s.A=qe(s.v);var u=s.A,f=s.R;Array.isArray(f)||(f=[String(f)]),qo(u.i,"t",f),s.C=0,u=s.j.J,s.h=new Ro,s.g=aa(s.j,u?l:null,!s.m),0<s.O&&(s.M=new Pu(E(s.Y,s,s.g),s.O)),l=s.U,u=s.g,f=s.ca;var T="readystatechange";Array.isArray(T)||(T&&(_o[0]=T.toString()),T=_o);for(var A=0;A<T.length;A++){var D=ho(u,T[A],f||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=s.H?g(s.H):{},s.m?(s.u||(s.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,l)):(s.u="GET",s.g.ea(s.A,s.u,null,l)),mn(),Nu(s.i,s.u,s.A,s.l,s.R,s.m)}it.prototype.ca=function(s){s=s.target;const l=this.M;l&&He(s)==3?l.j():this.Y(s)},it.prototype.Y=function(s){try{if(s==this.g)e:{const ye=He(this.g);var l=this.g.Ba();const $t=this.g.Z();if(!(3>ye)&&(ye!=3||this.g&&(this.h.h||this.g.oa()||Jo(this.g)))){this.J||ye!=4||l==7||(l==8||0>=$t?mn(3):mn(2)),Fr(this);var u=this.g.Z();this.X=u;t:if(Co(this)){var f=Jo(this.g);s="";var T=f.length,A=He(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){bt(this),_n(this);var D="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,s+=this.h.i.decode(f[l],{stream:!(A&&l==T-1)});f.length=0,this.h.g+=s,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=u==200,Du(this.i,this.u,this.A,this.l,this.R,ye,u),this.o){if(this.T&&!this.K){t:{if(this.g){var Q,le=this.g;if((Q=le.g?le.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!W(Q)){var G=Q;break t}}G=null}if(u=G)xt(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,$r(this,u);else{this.o=!1,this.s=3,be(12),bt(this),_n(this);break e}}if(this.P){u=!0;let Oe;for(;!this.J&&this.C<D.length;)if(Oe=Vu(this,D),Oe==xr){ye==4&&(this.s=4,be(14),u=!1),xt(this.i,this.l,null,"[Incomplete Response]");break}else if(Oe==Po){this.s=4,be(15),xt(this.i,this.l,D,"[Invalid Chunk]"),u=!1;break}else xt(this.i,this.l,Oe,null),$r(this,Oe);if(Co(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ye!=4||D.length!=0||this.h.h||(this.s=1,be(16),u=!1),this.o=this.o&&u,!u)xt(this.i,this.l,D,"[Invalid Chunked Response]"),bt(this),_n(this);else if(0<D.length&&!this.W){this.W=!0;var ge=this.j;ge.g==this&&ge.ba&&!ge.M&&(ge.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),Gr(ge),ge.M=!0,be(11))}}else xt(this.i,this.l,D,null),$r(this,D);ye==4&&bt(this),this.o&&!this.J&&(ye==4?ia(this.j,this):(this.o=!1,hi(this)))}else Yu(this.g),u==400&&0<D.indexOf("Unknown SID")?(this.s=3,be(12)):(this.s=0,be(13)),bt(this),_n(this)}}}catch{}finally{}};function Co(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function Vu(s,l){var u=s.C,f=l.indexOf(`
`,u);return f==-1?xr:(u=Number(l.substring(u,f)),isNaN(u)?Po:(f+=1,f+u>l.length?xr:(l=l.slice(f,f+u),s.C=f+u,l)))}it.prototype.cancel=function(){this.J=!0,bt(this)};function hi(s){s.S=Date.now()+s.I,No(s,s.I)}function No(s,l){if(s.B!=null)throw Error("WatchDog timer not null");s.B=gn(E(s.ba,s),l)}function Fr(s){s.B&&(c.clearTimeout(s.B),s.B=null)}it.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(Ou(this.i,this.A),this.L!=2&&(mn(),be(17)),bt(this),this.s=2,_n(this)):No(this,this.S-s)};function _n(s){s.j.G==0||s.J||ia(s.j,s)}function bt(s){Fr(s);var l=s.M;l&&typeof l.ma=="function"&&l.ma(),s.M=null,vo(s.U),s.g&&(l=s.g,s.g=null,l.abort(),l.ma())}function $r(s,l){try{var u=s.j;if(u.G!=0&&(u.g==s||jr(u.h,s))){if(!s.K&&jr(u.h,s)&&u.G==3){try{var f=u.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var T=f;if(T[0]==0){e:if(!u.u){if(u.g)if(u.g.F+3e3<s.F)Ei(u),_i(u);else break e;zr(u),be(18)}}else u.za=T[1],0<u.za-u.T&&37500>T[2]&&u.F&&u.v==0&&!u.C&&(u.C=gn(E(u.Za,u),6e3));if(1>=Lo(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else St(u,11)}else if((s.K||u.g==s)&&Ei(u),!W(l))for(T=u.Da.g.parse(l),l=0;l<T.length;l++){let G=T[l];if(u.T=G[0],G=G[1],u.G==2)if(G[0]=="c"){u.K=G[1],u.ia=G[2];const ge=G[3];ge!=null&&(u.la=ge,u.j.info("VER="+u.la));const ye=G[4];ye!=null&&(u.Aa=ye,u.j.info("SVER="+u.Aa));const $t=G[5];$t!=null&&typeof $t=="number"&&0<$t&&(f=1.5*$t,u.L=f,u.j.info("backChannelRequestTimeoutMs_="+f)),f=u;const Oe=s.g;if(Oe){const Ii=Oe.g?Oe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ii){var A=f.h;A.g||Ii.indexOf("spdy")==-1&&Ii.indexOf("quic")==-1&&Ii.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Br(A,A.h),A.h=null))}if(f.D){const Wr=Oe.g?Oe.g.getResponseHeader("X-HTTP-Session-Id"):null;Wr&&(f.ya=Wr,Y(f.I,f.D,Wr))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-s.F,u.j.info("Handshake RTT: "+u.R+"ms")),f=u;var D=s;if(f.qa=oa(f,f.J?f.ia:null,f.W),D.K){Vo(f.h,D);var Q=D,le=f.L;le&&(Q.I=le),Q.B&&(Fr(Q),hi(Q)),f.g=D}else ta(f);0<u.i.length&&vi(u)}else G[0]!="stop"&&G[0]!="close"||St(u,7);else u.G==3&&(G[0]=="stop"||G[0]=="close"?G[0]=="stop"?St(u,7):Hr(u):G[0]!="noop"&&u.l&&u.l.ta(G),u.v=0)}}mn(4)}catch{}}var Mu=class{constructor(s,l){this.g=s,this.map=l}};function Do(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Oo(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Lo(s){return s.h?1:s.g?s.g.size:0}function jr(s,l){return s.h?s.h==l:s.g?s.g.has(l):!1}function Br(s,l){s.g?s.g.add(l):s.h=l}function Vo(s,l){s.h&&s.h==l?s.h=null:s.g&&s.g.has(l)&&s.g.delete(l)}Do.prototype.cancel=function(){if(this.i=Mo(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Mo(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let l=s.i;for(const u of s.g.values())l=l.concat(u.D);return l}return U(s.i)}function xu(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map!="undefined"&&s instanceof Map||typeof Set!="undefined"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var l=[],u=s.length,f=0;f<u;f++)l.push(s[f]);return l}l=[],u=0;for(f in s)l[u++]=s[f];return l}function Uu(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map!="undefined"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set!="undefined"&&s instanceof Set)){if(h(s)||typeof s=="string"){var l=[];s=s.length;for(var u=0;u<s;u++)l.push(u);return l}l=[],u=0;for(const f in s)l[u++]=f;return l}}}function xo(s,l){if(s.forEach&&typeof s.forEach=="function")s.forEach(l,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,l,void 0);else for(var u=Uu(s),f=xu(s),T=f.length,A=0;A<T;A++)l.call(void 0,f[A],u&&u[A],s)}var Uo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Fu(s,l){if(s){s=s.split("&");for(var u=0;u<s.length;u++){var f=s[u].indexOf("="),T=null;if(0<=f){var A=s[u].substring(0,f);T=s[u].substring(f+1)}else A=s[u];l(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function At(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof At){this.h=s.h,di(this,s.j),this.o=s.o,this.g=s.g,fi(this,s.s),this.l=s.l;var l=s.i,u=new wn;u.i=l.i,l.g&&(u.g=new Map(l.g),u.h=l.h),Fo(this,u),this.m=s.m}else s&&(l=String(s).match(Uo))?(this.h=!1,di(this,l[1]||"",!0),this.o=vn(l[2]||""),this.g=vn(l[3]||"",!0),fi(this,l[4]),this.l=vn(l[5]||"",!0),Fo(this,l[6]||"",!0),this.m=vn(l[7]||"")):(this.h=!1,this.i=new wn(null,this.h))}At.prototype.toString=function(){var s=[],l=this.j;l&&s.push(En(l,$o,!0),":");var u=this.g;return(u||l=="file")&&(s.push("//"),(l=this.o)&&s.push(En(l,$o,!0),"@"),s.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&s.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&s.push("/"),s.push(En(u,u.charAt(0)=="/"?Bu:ju,!0))),(u=this.i.toString())&&s.push("?",u),(u=this.m)&&s.push("#",En(u,Hu)),s.join("")};function qe(s){return new At(s)}function di(s,l,u){s.j=u?vn(l,!0):l,s.j&&(s.j=s.j.replace(/:$/,""))}function fi(s,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);s.s=l}else s.s=null}function Fo(s,l,u){l instanceof wn?(s.i=l,zu(s.i,s.h)):(u||(l=En(l,qu)),s.i=new wn(l,s.h))}function Y(s,l,u){s.i.set(l,u)}function pi(s){return Y(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function vn(s,l){return s?l?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function En(s,l,u){return typeof s=="string"?(s=encodeURI(s).replace(l,$u),u&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function $u(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var $o=/[#\/\?@]/g,ju=/[#\?:]/g,Bu=/[#\?]/g,qu=/[#\?@]/g,Hu=/#/g;function wn(s,l){this.h=this.g=null,this.i=s||null,this.j=!!l}function rt(s){s.g||(s.g=new Map,s.h=0,s.i&&Fu(s.i,function(l,u){s.add(decodeURIComponent(l.replace(/\+/g," ")),u)}))}n=wn.prototype,n.add=function(s,l){rt(this),this.i=null,s=Ut(this,s);var u=this.g.get(s);return u||this.g.set(s,u=[]),u.push(l),this.h+=1,this};function jo(s,l){rt(s),l=Ut(s,l),s.g.has(l)&&(s.i=null,s.h-=s.g.get(l).length,s.g.delete(l))}function Bo(s,l){return rt(s),l=Ut(s,l),s.g.has(l)}n.forEach=function(s,l){rt(this),this.g.forEach(function(u,f){u.forEach(function(T){s.call(l,T,f,this)},this)},this)},n.na=function(){rt(this);const s=Array.from(this.g.values()),l=Array.from(this.g.keys()),u=[];for(let f=0;f<l.length;f++){const T=s[f];for(let A=0;A<T.length;A++)u.push(l[f])}return u},n.V=function(s){rt(this);let l=[];if(typeof s=="string")Bo(this,s)&&(l=l.concat(this.g.get(Ut(this,s))));else{s=Array.from(this.g.values());for(let u=0;u<s.length;u++)l=l.concat(s[u])}return l},n.set=function(s,l){return rt(this),this.i=null,s=Ut(this,s),Bo(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[l]),this.h+=1,this},n.get=function(s,l){return s?(s=this.V(s),0<s.length?String(s[0]):l):l};function qo(s,l,u){jo(s,l),0<u.length&&(s.i=null,s.g.set(Ut(s,l),U(u)),s.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],l=Array.from(this.g.keys());for(var u=0;u<l.length;u++){var f=l[u];const A=encodeURIComponent(String(f)),D=this.V(f);for(f=0;f<D.length;f++){var T=A;D[f]!==""&&(T+="="+encodeURIComponent(String(D[f]))),s.push(T)}}return this.i=s.join("&")};function Ut(s,l){return l=String(l),s.j&&(l=l.toLowerCase()),l}function zu(s,l){l&&!s.j&&(rt(s),s.i=null,s.g.forEach(function(u,f){var T=f.toLowerCase();f!=T&&(jo(this,f),qo(this,T,u))},s)),s.j=l}function Gu(s,l){const u=new yn;if(c.Image){const f=new Image;f.onload=R(st,u,"TestLoadImage: loaded",!0,l,f),f.onerror=R(st,u,"TestLoadImage: error",!1,l,f),f.onabort=R(st,u,"TestLoadImage: abort",!1,l,f),f.ontimeout=R(st,u,"TestLoadImage: timeout",!1,l,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=s}else l(!1)}function Wu(s,l){const u=new yn,f=new AbortController,T=setTimeout(()=>{f.abort(),st(u,"TestPingServer: timeout",!1,l)},1e4);fetch(s,{signal:f.signal}).then(A=>{clearTimeout(T),A.ok?st(u,"TestPingServer: ok",!0,l):st(u,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),st(u,"TestPingServer: error",!1,l)})}function st(s,l,u,f,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),f(u)}catch{}}function Ku(){this.g=new Cu}function Qu(s,l,u){const f=u||"";try{xo(s,function(T,A){let D=T;d(T)&&(D=Dr(T)),l.push(f+A+"="+encodeURIComponent(D))})}catch(T){throw l.push(f+"type="+encodeURIComponent("_badmap")),T}}function mi(s){this.l=s.Ub||null,this.j=s.eb||!1}N(mi,Or),mi.prototype.g=function(){return new gi(this.l,this.j)},mi.prototype.i=function(s){return function(){return s}}({});function gi(s,l){me.call(this),this.D=s,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}N(gi,me),n=gi.prototype,n.open=function(s,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=l,this.readyState=1,Tn(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(l.body=s),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,In(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Tn(this)),this.g&&(this.readyState=3,Tn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ho(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ho(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var l=s.value?s.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!s.done}))&&(this.response=this.responseText+=l)}s.done?In(this):Tn(this),this.readyState==3&&Ho(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,In(this))},n.Qa=function(s){this.g&&(this.response=s,In(this))},n.ga=function(){this.g&&In(this)};function In(s){s.readyState=4,s.l=null,s.j=null,s.v=null,Tn(s)}n.setRequestHeader=function(s,l){this.u.append(s,l)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],l=this.h.entries();for(var u=l.next();!u.done;)u=u.value,s.push(u[0]+": "+u[1]),u=l.next();return s.join(`\r
`)};function Tn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(gi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function zo(s){let l="";return B(s,function(u,f){l+=f,l+=":",l+=u,l+=`\r
`}),l}function qr(s,l,u){e:{for(f in u){var f=!1;break e}f=!0}f||(u=zo(u),typeof s=="string"?u!=null&&encodeURIComponent(String(u)):Y(s,l,u))}function ee(s){me.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}N(ee,me);var Ju=/^https?$/i,Xu=["POST","PUT"];n=ee.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,l,u,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);l=l?l.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Mr.g(),this.v=this.o?Eo(this.o):Eo(Mr),this.g.onreadystatechange=E(this.Ea,this);try{this.B=!0,this.g.open(l,String(s),!0),this.B=!1}catch(A){Go(this,A);return}if(s=u||"",u=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var T in f)u.set(T,f[T]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const A of f.keys())u.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(u.keys()).find(A=>A.toLowerCase()=="content-type"),T=c.FormData&&s instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Xu,l,void 0))||f||T||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,D]of u)this.g.setRequestHeader(A,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Qo(this),this.u=!0,this.g.send(s),this.u=!1}catch(A){Go(this,A)}};function Go(s,l){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=l,s.m=5,Wo(s),yi(s)}function Wo(s){s.A||(s.A=!0,Te(s,"complete"),Te(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,Te(this,"complete"),Te(this,"abort"),yi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),yi(this,!0)),ee.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ko(this):this.bb())},n.bb=function(){Ko(this)};function Ko(s){if(s.h&&typeof a!="undefined"&&(!s.v[1]||He(s)!=4||s.Z()!=2)){if(s.u&&He(s)==4)go(s.Ea,0,s);else if(Te(s,"readystatechange"),He(s)==4){s.h=!1;try{const D=s.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var u;if(!(u=l)){var f;if(f=D===0){var T=String(s.D).match(Uo)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),f=!Ju.test(T?T.toLowerCase():"")}u=f}if(u)Te(s,"complete"),Te(s,"success");else{s.m=6;try{var A=2<He(s)?s.g.statusText:""}catch{A=""}s.l=A+" ["+s.Z()+"]",Wo(s)}}finally{yi(s)}}}}function yi(s,l){if(s.g){Qo(s);const u=s.g,f=s.v[0]?()=>{}:null;s.g=null,s.v=null,l||Te(s,"ready");try{u.onreadystatechange=f}catch{}}}function Qo(s){s.I&&(c.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function He(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<He(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var l=this.g.responseText;return s&&l.indexOf(s)==0&&(l=l.substring(s.length)),ku(l)}};function Jo(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Yu(s){const l={};s=(s.g&&2<=He(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<s.length;f++){if(W(s[f]))continue;var u=I(s[f]);const T=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const A=l[T]||[];l[T]=A,A.push(u)}w(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function bn(s,l,u){return u&&u.internalChannelParams&&u.internalChannelParams[s]||l}function Xo(s){this.Aa=0,this.i=[],this.j=new yn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=bn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=bn("baseRetryDelayMs",5e3,s),this.cb=bn("retryDelaySeedMs",1e4,s),this.Wa=bn("forwardChannelMaxRetries",2,s),this.wa=bn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new Do(s&&s.concurrentRequestLimit),this.Da=new Ku,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Xo.prototype,n.la=8,n.G=1,n.connect=function(s,l,u,f){be(0),this.W=s,this.H=l||{},u&&f!==void 0&&(this.H.OSID=u,this.H.OAID=f),this.F=this.X,this.I=oa(this,null,this.W),vi(this)};function Hr(s){if(Yo(s),s.G==3){var l=s.U++,u=qe(s.I);if(Y(u,"SID",s.K),Y(u,"RID",l),Y(u,"TYPE","terminate"),An(s,u),l=new it(s,s.j,l),l.L=2,l.v=pi(qe(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=l.v,u=!0),u||(l.g=aa(l.j,null),l.g.ea(l.v)),l.F=Date.now(),hi(l)}sa(s)}function _i(s){s.g&&(Gr(s),s.g.cancel(),s.g=null)}function Yo(s){_i(s),s.u&&(c.clearTimeout(s.u),s.u=null),Ei(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&c.clearTimeout(s.s),s.s=null)}function vi(s){if(!Oo(s.h)&&!s.s){s.s=!0;var l=s.Ga;et||It(),tt||(et(),tt=!0),re.add(l,s),s.B=0}}function Zu(s,l){return Lo(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=l.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=gn(E(s.Ga,s,l),ra(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const T=new it(this,this.j,s);let A=this.o;if(this.S&&(A?(A=g(A),v(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)e:{for(var l=0,u=0;u<this.i.length;u++){t:{var f=this.i[u];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=u;break e}if(l===4096||u===this.i.length-1){l=u+1;break e}}l=1e3}else l=1e3;l=ea(this,T,l),u=qe(this.I),Y(u,"RID",s),Y(u,"CVER",22),this.D&&Y(u,"X-HTTP-Session-Id",this.D),An(this,u),A&&(this.O?l="headers="+encodeURIComponent(String(zo(A)))+"&"+l:this.m&&qr(u,this.m,A)),Br(this.h,T),this.Ua&&Y(u,"TYPE","init"),this.P?(Y(u,"$req",l),Y(u,"SID","null"),T.T=!0,Ur(T,u,null)):Ur(T,u,l),this.G=2}}else this.G==3&&(s?Zo(this,s):this.i.length==0||Oo(this.h)||Zo(this))};function Zo(s,l){var u;l?u=l.l:u=s.U++;const f=qe(s.I);Y(f,"SID",s.K),Y(f,"RID",u),Y(f,"AID",s.T),An(s,f),s.m&&s.o&&qr(f,s.m,s.o),u=new it(s,s.j,u,s.B+1),s.m===null&&(u.H=s.o),l&&(s.i=l.D.concat(s.i)),l=ea(s,u,1e3),u.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Br(s.h,u),Ur(u,f,l)}function An(s,l){s.H&&B(s.H,function(u,f){Y(l,f,u)}),s.l&&xo({},function(u,f){Y(l,f,u)})}function ea(s,l,u){u=Math.min(s.i.length,u);var f=s.l?E(s.l.Na,s.l,s):null;e:{var T=s.i;let A=-1;for(;;){const D=["count="+u];A==-1?0<u?(A=T[0].g,D.push("ofs="+A)):A=0:D.push("ofs="+A);let Q=!0;for(let le=0;le<u;le++){let G=T[le].g;const ge=T[le].map;if(G-=A,0>G)A=Math.max(0,T[le].g-100),Q=!1;else try{Qu(ge,D,"req"+G+"_")}catch{f&&f(ge)}}if(Q){f=D.join("&");break e}}}return s=s.i.splice(0,u),l.D=s,f}function ta(s){if(!s.g&&!s.u){s.Y=1;var l=s.Fa;et||It(),tt||(et(),tt=!0),re.add(l,s),s.v=0}}function zr(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=gn(E(s.Fa,s),ra(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,na(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=gn(E(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,be(10),_i(this),na(this))};function Gr(s){s.A!=null&&(c.clearTimeout(s.A),s.A=null)}function na(s){s.g=new it(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var l=qe(s.qa);Y(l,"RID","rpc"),Y(l,"SID",s.K),Y(l,"AID",s.T),Y(l,"CI",s.F?"0":"1"),!s.F&&s.ja&&Y(l,"TO",s.ja),Y(l,"TYPE","xmlhttp"),An(s,l),s.m&&s.o&&qr(l,s.m,s.o),s.L&&(s.g.I=s.L);var u=s.g;s=s.ia,u.L=1,u.v=pi(qe(l)),u.m=null,u.P=!0,ko(u,s)}n.Za=function(){this.C!=null&&(this.C=null,_i(this),zr(this),be(19))};function Ei(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function ia(s,l){var u=null;if(s.g==l){Ei(s),Gr(s),s.g=null;var f=2}else if(jr(s.h,l))u=l.D,Vo(s.h,l),f=1;else return;if(s.G!=0){if(l.o)if(f==1){u=l.m?l.m.length:0,l=Date.now()-l.F;var T=s.B;f=li(),Te(f,new Ao(f,u)),vi(s)}else ta(s);else if(T=l.s,T==3||T==0&&0<l.X||!(f==1&&Zu(s,l)||f==2&&zr(s)))switch(u&&0<u.length&&(l=s.h,l.i=l.i.concat(u)),T){case 1:St(s,5);break;case 4:St(s,10);break;case 3:St(s,6);break;default:St(s,2)}}}function ra(s,l){let u=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(u*=2),u*l}function St(s,l){if(s.j.info("Error code "+l),l==2){var u=E(s.fb,s),f=s.Xa;const T=!f;f=new At(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||di(f,"https"),pi(f),T?Gu(f.toString(),u):Wu(f.toString(),u)}else be(2);s.G=0,s.l&&s.l.sa(l),sa(s),Yo(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),be(2)):(this.j.info("Failed to ping google.com"),be(1))};function sa(s){if(s.G=0,s.ka=[],s.l){const l=Mo(s.h);(l.length!=0||s.i.length!=0)&&(L(s.ka,l),L(s.ka,s.i),s.h.i.length=0,U(s.i),s.i.length=0),s.l.ra()}}function oa(s,l,u){var f=u instanceof At?qe(u):new At(u);if(f.g!="")l&&(f.g=l+"."+f.g),fi(f,f.s);else{var T=c.location;f=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var A=new At(null);f&&di(A,f),l&&(A.g=l),T&&fi(A,T),u&&(A.l=u),f=A}return u=s.D,l=s.ya,u&&l&&Y(f,u,l),Y(f,"VER",s.la),An(s,f),f}function aa(s,l,u){if(l&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=s.Ca&&!s.pa?new ee(new mi({eb:u})):new ee(s.pa),l.Ha(s.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function la(){}n=la.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function wi(){}wi.prototype.g=function(s,l){return new Se(s,l)};function Se(s,l){me.call(this),this.g=new Xo(l),this.l=s,this.h=l&&l.messageUrlParams||null,s=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(s?s["X-WebChannel-Content-Type"]=l.messageContentType:s={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(s?s["X-WebChannel-Client-Profile"]=l.va:s={"X-WebChannel-Client-Profile":l.va}),this.g.S=s,(s=l&&l.Sb)&&!W(s)&&(this.g.m=s),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!W(l)&&(this.g.D=l,s=this.h,s!==null&&l in s&&(s=this.h,l in s&&delete s[l])),this.j=new Ft(this)}N(Se,me),Se.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Se.prototype.close=function(){Hr(this.g)},Se.prototype.o=function(s){var l=this.g;if(typeof s=="string"){var u={};u.__data__=s,s=u}else this.u&&(u={},u.__data__=Dr(s),s=u);l.i.push(new Mu(l.Ya++,s)),l.G==3&&vi(l)},Se.prototype.N=function(){this.g.l=null,delete this.j,Hr(this.g),delete this.g,Se.aa.N.call(this)};function ca(s){Lr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var l=s.__sm__;if(l){e:{for(const u in l){s=u;break e}s=void 0}(this.i=s)&&(s=this.i,l=l!==null&&s in l?l[s]:void 0),this.data=l}else this.data=s}N(ca,Lr);function ua(){Vr.call(this),this.status=1}N(ua,Vr);function Ft(s){this.g=s}N(Ft,la),Ft.prototype.ua=function(){Te(this.g,"a")},Ft.prototype.ta=function(s){Te(this.g,new ca(s))},Ft.prototype.sa=function(s){Te(this.g,new ua)},Ft.prototype.ra=function(){Te(this.g,"b")},wi.prototype.createWebChannel=wi.prototype.g,Se.prototype.send=Se.prototype.o,Se.prototype.open=Se.prototype.m,Se.prototype.close=Se.prototype.close,pc=function(){return new wi},fc=function(){return li()},dc=Tt,fs={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ci.NO_ERROR=0,ci.TIMEOUT=8,ci.HTTP_ERROR=6,xi=ci,So.COMPLETE="complete",hc=So,wo.EventType=pn,pn.OPEN="a",pn.CLOSE="b",pn.ERROR="c",pn.MESSAGE="d",me.prototype.listen=me.prototype.K,Cn=wo,ee.prototype.listenOnce=ee.prototype.L,ee.prototype.getLastError=ee.prototype.Ka,ee.prototype.getLastErrorCode=ee.prototype.Ba,ee.prototype.getStatus=ee.prototype.Z,ee.prototype.getResponseJson=ee.prototype.Oa,ee.prototype.getResponseText=ee.prototype.oa,ee.prototype.send=ee.prototype.ea,ee.prototype.setWithCredentials=ee.prototype.Ha,uc=ee}).apply(typeof bi!="undefined"?bi:typeof self!="undefined"?self:typeof window!="undefined"?window:{});const Ba="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ve.UNAUTHENTICATED=new ve(null),ve.GOOGLE_CREDENTIALS=new ve("google-credentials-uid"),ve.FIRST_PARTY=new ve("first-party-uid"),ve.MOCK_USER=new ve("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ot=new Rs("@firebase/firestore");function Sn(){return Ot.logLevel}function M(n,...e){if(Ot.logLevel<=q.DEBUG){const t=e.map(Fs);Ot.debug(`Firestore (${cn}): ${n}`,...t)}}function Lt(n,...e){if(Ot.logLevel<=q.ERROR){const t=e.map(Fs);Ot.error(`Firestore (${cn}): ${n}`,...t)}}function Ji(n,...e){if(Ot.logLevel<=q.WARN){const t=e.map(Fs);Ot.warn(`Firestore (${cn}): ${n}`,...t)}}function Fs(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H(n="Unexpected state"){const e=`FIRESTORE (${cn}) INTERNAL ASSERTION FAILED: `+n;throw Lt(e),new Error(e)}function ne(n,e){n||H()}function X(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class F extends Xe{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Wp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ve.UNAUTHENTICATED))}shutdown(){}}class Kp{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Qp{constructor(e){this.t=e,this.currentUser=ve.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ne(this.o===void 0);let i=this.i;const r=h=>this.i!==i?(i=this.i,t(h)):Promise.resolve();let o=new kt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new kt,e.enqueueRetryable(()=>r(this.currentUser))};const a=()=>{const h=o;e.enqueueRetryable(async()=>{await h.promise,await r(this.currentUser)})},c=h=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new kt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(ne(typeof i.accessToken=="string"),new mc(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ne(e===null||typeof e=="string"),new ve(e)}}class Jp{constructor(e,t,i){this.l=e,this.h=t,this.P=i,this.type="FirstParty",this.user=ve.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Xp{constructor(e,t,i){this.l=e,this.h=t,this.P=i}getToken(){return Promise.resolve(new Jp(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ve.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Yp{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Zp{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){ne(this.o===void 0);const i=o=>{o.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,M("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>i(o))};const r=o=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>r(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?r(o):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ne(typeof t.token=="string"),this.R=t.token,new Yp(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function em(n){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let i="";for(;i.length<20;){const r=em(40);for(let o=0;o<r.length;++o)i.length<20&&r[o]<t&&(i+=e.charAt(r[o]%e.length))}return i}}function J(n,e){return n<e?-1:n>e?1:0}function Zt(n,e,t){return n.length===e.length&&n.every((i,r)=>t(i,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new F(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new F(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new F(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ae.fromMillis(Date.now())}static fromDate(e){return ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor(1e6*(e-1e3*t));return new ae(t,i)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Z(e)}static min(){return new Z(new ae(0,0))}static max(){return new Z(new ae(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e,t,i){t===void 0?t=0:t>e.length&&H(),i===void 0?i=e.length-t:i>e.length-t&&H(),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return $n.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof $n?e.forEach(i=>{t.push(i)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let r=0;r<i;r++){const o=e.get(r),a=t.get(r);if(o<a)return-1;if(o>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class te extends $n{construct(e,t,i){return new te(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new F(k.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter(r=>r.length>0))}return new te(t)}static emptyPath(){return new te([])}}const tm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class he extends $n{construct(e,t,i){return new he(e,t,i)}static isValidIdentifier(e){return tm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),he.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new he(["__name__"])}static fromServerFormat(e){const t=[];let i="",r=0;const o=()=>{if(i.length===0)throw new F(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let a=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new F(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[r+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new F(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=h,r+=2}else c==="`"?(a=!a,r++):c!=="."||a?(i+=c,r++):(o(),r++)}if(o(),a)throw new F(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new he(t)}static emptyPath(){return new he([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.path=e}static fromPath(e){return new j(te.fromString(e))}static fromName(e){return new j(te.fromString(e).popFirst(5))}static empty(){return new j(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new j(new te(e.slice()))}}function nm(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,r=Z.fromTimestamp(i===1e9?new ae(t+1,0):new ae(t,i));return new gt(r,j.empty(),e)}function im(n){return new gt(n.readTime,n.key,-1)}class gt{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new gt(Z.min(),j.empty(),-1)}static max(){return new gt(Z.max(),j.empty(),-1)}}function rm(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=j.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class om{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yc(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==sm)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&H(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((i,r)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(i,r)},this.catchCallback=o=>{this.wrapFailure(t,o).next(i,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,i)=>{t(e)})}static reject(e){return new P((t,i)=>{i(e)})}static waitFor(e){return new P((t,i)=>{let r=0,o=0,a=!1;e.forEach(c=>{++r,c.next(()=>{++o,a&&o===r&&t()},h=>i(h))}),a=!0,o===r&&t()})}static or(e){let t=P.resolve(!1);for(const i of e)t=t.next(r=>r?P.resolve(r):i());return t}static forEach(e,t){const i=[];return e.forEach((r,o)=>{i.push(t.call(this,r,o))}),this.waitFor(i)}static mapArray(e,t){return new P((i,r)=>{const o=e.length,a=new Array(o);let c=0;for(let h=0;h<o;h++){const d=h;t(e[d]).next(p=>{a[d]=p,++c,c===o&&i(a)},p=>r(p))}})}static doWhile(e,t){return new P((i,r)=>{const o=()=>{e()===!0?t().next(()=>{o()},r):i()};o()})}}function am(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function hr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ie(i),this.se=i=>t.writeSequenceNumber(i))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}_c.oe=-1;function $s(n){return n==null}function Xi(n){return n===0&&1/n==-1/0}function lm(n){return typeof n=="number"&&Number.isInteger(n)&&!Xi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qa(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function un(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function vc(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e,t){this.comparator=e,this.root=t||ce.EMPTY}insert(e,t){return new Ae(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ce.BLACK,null,null))}remove(e){return new Ae(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ce.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const r=this.comparator(e,i.key);if(r===0)return t+i.left.size;r<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,i)=>(e(t,i),!1))}toString(){const e=[];return this.inorderTraversal((t,i)=>(e.push(`${t}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ai(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ai(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ai(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ai(this.root,e,this.comparator,!0)}}class Ai{constructor(e,t,i,r){this.isReverse=r,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?i(e.key,t):1,t&&r&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ce{constructor(e,t,i,r,o){this.key=e,this.value=t,this.color=i!=null?i:ce.RED,this.left=r!=null?r:ce.EMPTY,this.right=o!=null?o:ce.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,r,o){return new ce(e!=null?e:this.key,t!=null?t:this.value,i!=null?i:this.color,r!=null?r:this.left,o!=null?o:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let r=this;const o=i(e,r.key);return r=o<0?r.copy(null,null,null,r.left.insert(e,t,i),null):o===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,i)),r.fixUp()}removeMin(){if(this.left.isEmpty())return ce.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return ce.EMPTY;i=r.right.min(),r=r.copy(i.key,i.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ce.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ce.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw H();const e=this.left.check();if(e!==this.right.check())throw H();return e+(this.isRed()?0:1)}}ce.EMPTY=null,ce.RED=!0,ce.BLACK=!1;ce.EMPTY=new class{constructor(){this.size=0}get key(){throw H()}get value(){throw H()}get color(){throw H()}get left(){throw H()}get right(){throw H()}copy(e,t,i,r,o){return this}insert(e,t,i){return new ce(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.comparator=e,this.data=new Ae(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,i)=>(e(t),!1))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const r=i.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ha(this.data.getIterator())}getIteratorFrom(e){return new Ha(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(i=>{t=t.add(i)}),t}isEqual(e){if(!(e instanceof we)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,o=i.getNext().key;if(this.comparator(r,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new we(this.comparator);return t.data=e,t}}class Ha{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.fields=e,e.sort(he.comparator)}static empty(){return new ke([])}unionWith(e){let t=new we(he.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new ke(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Zt(this.fields,e.fields,(t,i)=>t.isEqual(i))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(o){throw typeof DOMException!="undefined"&&o instanceof DOMException?new cm("Invalid base64 string: "+o):o}}(e);return new je(t)}static fromUint8Array(e){const t=function(r){let o="";for(let a=0;a<r.length;++a)o+=String.fromCharCode(r[a]);return o}(e);return new je(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const i=new Uint8Array(t.length);for(let r=0;r<t.length;r++)i[r]=t.charCodeAt(r);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}je.EMPTY_BYTE_STRING=new je("");const um=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Vt(n){if(ne(!!n),typeof n=="string"){let e=0;const t=um.exec(n);if(ne(!!t),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:ue(n.seconds),nanos:ue(n.nanos)}}function ue(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function jn(n){return typeof n=="string"?je.fromBase64String(n):je.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function js(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Ec(n){const e=n.mapValue.fields.__previous_value__;return js(e)?Ec(e):e}function Yi(n){const e=Vt(n.mapValue.fields.__local_write_time__.timestampValue);return new ae(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e,t,i,r,o,a,c,h,d){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=r,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=d}}class Zi{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Zi("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Zi&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Si={mapValue:{}};function en(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?js(n)?4:fm(n)?9007199254740991:dm(n)?10:11:H()}function Be(n,e){if(n===e)return!0;const t=en(n);if(t!==en(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Yi(n).isEqual(Yi(e));case 3:return function(r,o){if(typeof r.timestampValue=="string"&&typeof o.timestampValue=="string"&&r.timestampValue.length===o.timestampValue.length)return r.timestampValue===o.timestampValue;const a=Vt(r.timestampValue),c=Vt(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,o){return jn(r.bytesValue).isEqual(jn(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,o){return ue(r.geoPointValue.latitude)===ue(o.geoPointValue.latitude)&&ue(r.geoPointValue.longitude)===ue(o.geoPointValue.longitude)}(n,e);case 2:return function(r,o){if("integerValue"in r&&"integerValue"in o)return ue(r.integerValue)===ue(o.integerValue);if("doubleValue"in r&&"doubleValue"in o){const a=ue(r.doubleValue),c=ue(o.doubleValue);return a===c?Xi(a)===Xi(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Zt(n.arrayValue.values||[],e.arrayValue.values||[],Be);case 10:case 11:return function(r,o){const a=r.mapValue.fields||{},c=o.mapValue.fields||{};if(qa(a)!==qa(c))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(c[h]===void 0||!Be(a[h],c[h])))return!1;return!0}(n,e);default:return H()}}function Bn(n,e){return(n.values||[]).find(t=>Be(t,e))!==void 0}function tn(n,e){if(n===e)return 0;const t=en(n),i=en(e);if(t!==i)return J(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(o,a){const c=ue(o.integerValue||o.doubleValue),h=ue(a.integerValue||a.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,e);case 3:return za(n.timestampValue,e.timestampValue);case 4:return za(Yi(n),Yi(e));case 5:return J(n.stringValue,e.stringValue);case 6:return function(o,a){const c=jn(o),h=jn(a);return c.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){const c=o.split("/"),h=a.split("/");for(let d=0;d<c.length&&d<h.length;d++){const p=J(c[d],h[d]);if(p!==0)return p}return J(c.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){const c=J(ue(o.latitude),ue(a.latitude));return c!==0?c:J(ue(o.longitude),ue(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ga(n.arrayValue,e.arrayValue);case 10:return function(o,a){var c,h,d,p;const m=o.fields||{},E=a.fields||{},R=(c=m.value)===null||c===void 0?void 0:c.arrayValue,N=(h=E.value)===null||h===void 0?void 0:h.arrayValue,U=J(((d=R==null?void 0:R.values)===null||d===void 0?void 0:d.length)||0,((p=N==null?void 0:N.values)===null||p===void 0?void 0:p.length)||0);return U!==0?U:Ga(R,N)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===Si.mapValue&&a===Si.mapValue)return 0;if(o===Si.mapValue)return 1;if(a===Si.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),d=a.fields||{},p=Object.keys(d);h.sort(),p.sort();for(let m=0;m<h.length&&m<p.length;++m){const E=J(h[m],p[m]);if(E!==0)return E;const R=tn(c[h[m]],d[p[m]]);if(R!==0)return R}return J(h.length,p.length)}(n.mapValue,e.mapValue);default:throw H()}}function za(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);const t=Vt(n),i=Vt(e),r=J(t.seconds,i.seconds);return r!==0?r:J(t.nanos,i.nanos)}function Ga(n,e){const t=n.values||[],i=e.values||[];for(let r=0;r<t.length&&r<i.length;++r){const o=tn(t[r],i[r]);if(o)return o}return J(t.length,i.length)}function nn(n){return ps(n)}function ps(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const i=Vt(t);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return jn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return j.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let i="[",r=!0;for(const o of t.values||[])r?r=!1:i+=",",i+=ps(o);return i+"]"}(n.arrayValue):"mapValue"in n?function(t){const i=Object.keys(t.fields||{}).sort();let r="{",o=!0;for(const a of i)o?o=!1:r+=",",r+=`${a}:${ps(t.fields[a])}`;return r+"}"}(n.mapValue):H()}function ms(n){return!!n&&"integerValue"in n}function Bs(n){return!!n&&"arrayValue"in n}function Ui(n){return!!n&&"mapValue"in n}function dm(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function On(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return un(n.mapValue.fields,(t,i)=>e.mapValue.fields[t]=On(i)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=On(n.arrayValue.values[t]);return e}return Object.assign({},n)}function fm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.value=e}static empty(){return new Re({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!Ui(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=On(t)}setAll(e){let t=he.emptyPath(),i={},r=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const h=this.getFieldsMap(t);this.applyChanges(h,i,r),i={},r=[],t=c.popLast()}a?i[c.lastSegment()]=On(a):r.push(c.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,i,r)}delete(e){const t=this.field(e.popLast());Ui(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Be(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let r=t.mapValue.fields[e.get(i)];Ui(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,i){un(t,(r,o)=>e[r]=o);for(const r of i)delete e[r]}clone(){return new Re(On(this.value))}}function wc(n){const e=[];return un(n.fields,(t,i)=>{const r=new he([t]);if(Ui(i)){const o=wc(i.mapValue).fields;if(o.length===0)e.push(r);else for(const a of o)e.push(r.child(a))}else e.push(r)}),new ke(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e,t,i,r,o,a,c){this.key=e,this.documentType=t,this.version=i,this.readTime=r,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ve(e,0,Z.min(),Z.min(),Z.min(),Re.empty(),0)}static newFoundDocument(e,t,i,r){return new Ve(e,1,t,Z.min(),i,r,0)}static newNoDocument(e,t){return new Ve(e,2,t,Z.min(),Z.min(),Re.empty(),0)}static newUnknownDocument(e,t){return new Ve(e,3,t,Z.min(),Z.min(),Re.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Re.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Re.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ve&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ve(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e,t){this.position=e,this.inclusive=t}}function Wa(n,e,t){let i=0;for(let r=0;r<n.position.length;r++){const o=e[r],a=n.position[r];if(o.field.isKeyField()?i=j.comparator(j.fromName(a.referenceValue),t.key):i=tn(a,t.data.field(o.field)),o.dir==="desc"&&(i*=-1),i!==0)break}return i}function Ka(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Be(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t="asc"){this.field=e,this.dir=t}}function pm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{}class oe extends Ic{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new gm(e,t,i):t==="array-contains"?new vm(e,i):t==="in"?new Em(e,i):t==="not-in"?new wm(e,i):t==="array-contains-any"?new Im(e,i):new oe(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new ym(e,i):new _m(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(tn(t,this.value)):t!==null&&en(this.value)===en(t)&&this.matchesComparison(tn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return H()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class yt extends Ic{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new yt(e,t)}matches(e){return Tc(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Tc(n){return n.op==="and"}function bc(n){return mm(n)&&Tc(n)}function mm(n){for(const e of n.filters)if(e instanceof yt)return!1;return!0}function gs(n){if(n instanceof oe)return n.field.canonicalString()+n.op.toString()+nn(n.value);if(bc(n))return n.filters.map(e=>gs(e)).join(",");{const e=n.filters.map(t=>gs(t)).join(",");return`${n.op}(${e})`}}function Ac(n,e){return n instanceof oe?function(i,r){return r instanceof oe&&i.op===r.op&&i.field.isEqual(r.field)&&Be(i.value,r.value)}(n,e):n instanceof yt?function(i,r){return r instanceof yt&&i.op===r.op&&i.filters.length===r.filters.length?i.filters.reduce((o,a,c)=>o&&Ac(a,r.filters[c]),!0):!1}(n,e):void H()}function Sc(n){return n instanceof oe?function(t){return`${t.field.canonicalString()} ${t.op} ${nn(t.value)}`}(n):n instanceof yt?function(t){return t.op.toString()+" {"+t.getFilters().map(Sc).join(" ,")+"}"}(n):"Filter"}class gm extends oe{constructor(e,t,i){super(e,t,i),this.key=j.fromName(i.referenceValue)}matches(e){const t=j.comparator(e.key,this.key);return this.matchesComparison(t)}}class ym extends oe{constructor(e,t){super(e,"in",t),this.keys=Rc("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class _m extends oe{constructor(e,t){super(e,"not-in",t),this.keys=Rc("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Rc(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(i=>j.fromName(i.referenceValue))}class vm extends oe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Bs(t)&&Bn(t.arrayValue,this.value)}}class Em extends oe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Bn(this.value.arrayValue,t)}}class wm extends oe{constructor(e,t){super(e,"not-in",t)}matches(e){if(Bn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Bn(this.value.arrayValue,t)}}class Im extends oe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Bs(t)||!t.arrayValue.values)&&t.arrayValue.values.some(i=>Bn(this.value.arrayValue,i))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{constructor(e,t=null,i=[],r=[],o=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=r,this.limit=o,this.startAt=a,this.endAt=c,this.ue=null}}function Qa(n,e=null,t=[],i=[],r=null,o=null,a=null){return new Tm(n,e,t,i,r,o,a)}function qs(n){const e=X(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(i=>gs(i)).join(","),t+="|ob:",t+=e.orderBy.map(i=>function(o){return o.field.canonicalString()+o.dir}(i)).join(","),$s(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(i=>nn(i)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(i=>nn(i)).join(",")),e.ue=t}return e.ue}function Hs(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!pm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Ac(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ka(n.startAt,e.startAt)&&Ka(n.endAt,e.endAt)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,t=null,i=[],r=[],o=null,a="F",c=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=r,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function bm(n,e,t,i,r,o,a,c){return new dr(n,e,t,i,r,o,a,c)}function Am(n){return new dr(n)}function Ja(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Sm(n){return n.collectionGroup!==null}function Ln(n){const e=X(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new we(he.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new tr(o,i))}),t.has(he.keyField().canonicalString())||e.ce.push(new tr(he.keyField(),i))}return e.ce}function Ct(n){const e=X(n);return e.le||(e.le=Rm(e,Ln(n))),e.le}function Rm(n,e){if(n.limitType==="F")return Qa(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(r=>{const o=r.dir==="desc"?"asc":"desc";return new tr(r.field,o)});const t=n.endAt?new er(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new er(n.startAt.position,n.startAt.inclusive):null;return Qa(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function ys(n,e,t){return new dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Pc(n,e){return Hs(Ct(n),Ct(e))&&n.limitType===e.limitType}function kc(n){return`${qs(Ct(n))}|lt:${n.limitType}`}function Rn(n){return`Query(target=${function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map(r=>Sc(r)).join(", ")}]`),$s(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map(r=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(r)).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map(r=>nn(r)).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map(r=>nn(r)).join(",")),`Target(${i})`}(Ct(n))}; limitType=${n.limitType})`}function zs(n,e){return e.isFoundDocument()&&function(i,r){const o=r.key.path;return i.collectionGroup!==null?r.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(o):j.isDocumentKey(i.path)?i.path.isEqual(o):i.path.isImmediateParentOf(o)}(n,e)&&function(i,r){for(const o of Ln(i))if(!o.field.isKeyField()&&r.data.field(o.field)===null)return!1;return!0}(n,e)&&function(i,r){for(const o of i.filters)if(!o.matches(r))return!1;return!0}(n,e)&&function(i,r){return!(i.startAt&&!function(a,c,h){const d=Wa(a,c,h);return a.inclusive?d<=0:d<0}(i.startAt,Ln(i),r)||i.endAt&&!function(a,c,h){const d=Wa(a,c,h);return a.inclusive?d>=0:d>0}(i.endAt,Ln(i),r))}(n,e)}function Pm(n){return(e,t)=>{let i=!1;for(const r of Ln(n)){const o=km(r,e,t);if(o!==0)return o;i=i||r.field.isKeyField()}return 0}}function km(n,e,t){const i=n.field.isKeyField()?j.comparator(e.key,t.key):function(o,a,c){const h=a.data.field(o),d=c.data.field(o);return h!==null&&d!==null?tn(h,d):H()}(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return H()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[r,o]of i)if(this.equalsFn(r,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),r=this.inner[i];if(r===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let o=0;o<r.length;o++)if(this.equalsFn(r[o][0],e))return void(r[o]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return i.length===1?delete this.inner[t]:i.splice(r,1),this.innerSize--,!0;return!1}forEach(e){un(this.inner,(t,i)=>{for(const[r,o]of i)e(r,o)})}isEmpty(){return vc(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cm=new Ae(j.comparator);function nr(){return Cm}const Cc=new Ae(j.comparator);function Ri(...n){let e=Cc;for(const t of n)e=e.insert(t.key,t);return e}function Nc(n){let e=Cc;return n.forEach((t,i)=>e=e.insert(t,i.overlayedDocument)),e}function Pt(){return Vn()}function Dc(){return Vn()}function Vn(){return new hn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Nm=new Ae(j.comparator),Dm=new we(j.comparator);function Ee(...n){let e=Dm;for(const t of n)e=e.add(t);return e}const Om=new we(J);function Lm(){return Om}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Xi(e)?"-0":e}}function Oc(n){return{integerValue:""+n}}function Vm(n,e){return lm(e)?Oc(e):Gs(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(){this._=void 0}}function Mm(n,e,t){return n instanceof qn?function(r,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return o&&js(o)&&(o=Ec(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(t,e):n instanceof Hn?Vc(n,e):n instanceof zn?Mc(n,e):function(r,o){const a=Lc(r,o),c=Xa(a)+Xa(r.Pe);return ms(a)&&ms(r.Pe)?Oc(c):Gs(r.serializer,c)}(n,e)}function xm(n,e,t){return n instanceof Hn?Vc(n,e):n instanceof zn?Mc(n,e):t}function Lc(n,e){return n instanceof ir?function(i){return ms(i)||function(o){return!!o&&"doubleValue"in o}(i)}(e)?e:{integerValue:0}:null}class qn extends fr{}class Hn extends fr{constructor(e){super(),this.elements=e}}function Vc(n,e){const t=xc(e);for(const i of n.elements)t.some(r=>Be(r,i))||t.push(i);return{arrayValue:{values:t}}}class zn extends fr{constructor(e){super(),this.elements=e}}function Mc(n,e){let t=xc(e);for(const i of n.elements)t=t.filter(r=>!Be(r,i));return{arrayValue:{values:t}}}class ir extends fr{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Xa(n){return ue(n.integerValue||n.doubleValue)}function xc(n){return Bs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(e,t){this.field=e,this.transform=t}}function Fm(n,e){return n.field.isEqual(e.field)&&function(i,r){return i instanceof Hn&&r instanceof Hn||i instanceof zn&&r instanceof zn?Zt(i.elements,r.elements,Be):i instanceof ir&&r instanceof ir?Be(i.Pe,r.Pe):i instanceof qn&&r instanceof qn}(n.transform,e.transform)}class $m{constructor(e,t){this.version=e,this.transformResults=t}}class Me{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Me}static exists(e){return new Me(void 0,e)}static updateTime(e){return new Me(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Fi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class pr{}function Uc(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ws(n.key,Me.none()):new Yn(n.key,n.data,Me.none());{const t=n.data,i=Re.empty();let r=new we(he.comparator);for(let o of e.fields)if(!r.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?i.delete(o):i.set(o,a),r=r.add(o)}return new Et(n.key,i,new ke(r.toArray()),Me.none())}}function jm(n,e,t){n instanceof Yn?function(r,o,a){const c=r.value.clone(),h=Za(r.fieldTransforms,o,a.transformResults);c.setAll(h),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Et?function(r,o,a){if(!Fi(r.precondition,o))return void o.convertToUnknownDocument(a.version);const c=Za(r.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Fc(r)),h.setAll(c),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,e,t):function(r,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Mn(n,e,t,i){return n instanceof Yn?function(o,a,c,h){if(!Fi(o.precondition,a))return c;const d=o.value.clone(),p=el(o.fieldTransforms,h,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,i):n instanceof Et?function(o,a,c,h){if(!Fi(o.precondition,a))return c;const d=el(o.fieldTransforms,h,a),p=a.data;return p.setAll(Fc(o)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(m=>m.field))}(n,e,t,i):function(o,a,c){return Fi(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function Bm(n,e){let t=null;for(const i of n.fieldTransforms){const r=e.data.field(i.field),o=Lc(i.transform,r||null);o!=null&&(t===null&&(t=Re.empty()),t.set(i.field,o))}return t||null}function Ya(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(i,r){return i===void 0&&r===void 0||!(!i||!r)&&Zt(i,r,(o,a)=>Fm(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Yn extends pr{constructor(e,t,i,r=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Et extends pr{constructor(e,t,i,r,o=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=r,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Fc(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}}),e}function Za(n,e,t){const i=new Map;ne(n.length===t.length);for(let r=0;r<t.length;r++){const o=n[r],a=o.transform,c=e.data.field(o.field);i.set(o.field,xm(a,c,t[r]))}return i}function el(n,e,t){const i=new Map;for(const r of n){const o=r.transform,a=t.data.field(r.field);i.set(r.field,Mm(o,a,e))}return i}class Ws extends pr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class qm extends pr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(e,t,i,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=r}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const o=this.mutations[r];o.key.isEqual(e.key)&&jm(o,e,i[r])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=Mn(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=Mn(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=Dc();return this.mutations.forEach(r=>{const o=e.get(r.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=t.has(r.key)?null:c;const h=Uc(a,c);h!==null&&i.set(r.key,h),a.isValidDocument()||a.convertToNoDocument(Z.min())}),i}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Ee())}isEqual(e){return this.batchId===e.batchId&&Zt(this.mutations,e.mutations,(t,i)=>Ya(t,i))&&Zt(this.baseMutations,e.baseMutations,(t,i)=>Ya(t,i))}}class Ks{constructor(e,t,i,r){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=r}static from(e,t,i){ne(e.mutations.length===i.length);let r=function(){return Nm}();const o=e.mutations;for(let a=0;a<o.length;a++)r=r.insert(o[a].key,i[a].version);return new Ks(e,t,i,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ie,z;function Gm(n){switch(n){default:return H();case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0}}function Wm(n){if(n===void 0)return Lt("GRPC error has no .code"),k.UNKNOWN;switch(n){case ie.OK:return k.OK;case ie.CANCELLED:return k.CANCELLED;case ie.UNKNOWN:return k.UNKNOWN;case ie.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case ie.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case ie.INTERNAL:return k.INTERNAL;case ie.UNAVAILABLE:return k.UNAVAILABLE;case ie.UNAUTHENTICATED:return k.UNAUTHENTICATED;case ie.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case ie.NOT_FOUND:return k.NOT_FOUND;case ie.ALREADY_EXISTS:return k.ALREADY_EXISTS;case ie.PERMISSION_DENIED:return k.PERMISSION_DENIED;case ie.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case ie.ABORTED:return k.ABORTED;case ie.OUT_OF_RANGE:return k.OUT_OF_RANGE;case ie.UNIMPLEMENTED:return k.UNIMPLEMENTED;case ie.DATA_LOSS:return k.DATA_LOSS;default:return H()}}(z=ie||(ie={}))[z.OK=0]="OK",z[z.CANCELLED=1]="CANCELLED",z[z.UNKNOWN=2]="UNKNOWN",z[z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",z[z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",z[z.NOT_FOUND=5]="NOT_FOUND",z[z.ALREADY_EXISTS=6]="ALREADY_EXISTS",z[z.PERMISSION_DENIED=7]="PERMISSION_DENIED",z[z.UNAUTHENTICATED=16]="UNAUTHENTICATED",z[z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",z[z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",z[z.ABORTED=10]="ABORTED",z[z.OUT_OF_RANGE=11]="OUT_OF_RANGE",z[z.UNIMPLEMENTED=12]="UNIMPLEMENTED",z[z.INTERNAL=13]="INTERNAL",z[z.UNAVAILABLE=14]="UNAVAILABLE",z[z.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new cc([4294967295,4294967295],0);class Km{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function _s(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Qm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Jm(n,e){return _s(n,e.toTimestamp())}function Jt(n){return ne(!!n),Z.fromTimestamp(function(t){const i=Vt(t);return new ae(i.seconds,i.nanos)}(n))}function $c(n,e){return vs(n,e).canonicalString()}function vs(n,e){const t=function(r){return new te(["projects",r.projectId,"databases",r.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Xm(n){const e=te.fromString(n);return ne(sg(e)),e}function Es(n,e){return $c(n.databaseId,e.path)}function Ym(n){const e=Xm(n);return e.length===4?te.emptyPath():eg(e)}function Zm(n){return new te(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function eg(n){return ne(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function tl(n,e,t){return{name:Es(n,e),fields:t.value.mapValue.fields}}function tg(n,e){let t;if(e instanceof Yn)t={update:tl(n,e.key,e.value)};else if(e instanceof Ws)t={delete:Es(n,e.key)};else if(e instanceof Et)t={update:tl(n,e.key,e.data),updateMask:rg(e.fieldMask)};else{if(!(e instanceof qm))return H();t={verify:Es(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(i=>function(o,a){const c=a.transform;if(c instanceof qn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Hn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof zn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ir)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw H()}(0,i))),e.precondition.isNone||(t.currentDocument=function(r,o){return o.updateTime!==void 0?{updateTime:Jm(r,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:H()}(n,e.precondition)),t}function ng(n,e){return n&&n.length>0?(ne(e!==void 0),n.map(t=>function(r,o){let a=r.updateTime?Jt(r.updateTime):Jt(o);return a.isEqual(Z.min())&&(a=Jt(o)),new $m(a,r.transformResults||[])}(t,e))):[]}function ig(n){let e=Ym(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let r=null;if(i>0){ne(i===1);const p=t.from[0];p.allDescendants?r=p.collectionId:e=e.child(p.collectionId)}let o=[];t.where&&(o=function(m){const E=jc(m);return E instanceof yt&&bc(E)?E.getFilters():[E]}(t.where));let a=[];t.orderBy&&(a=function(m){return m.map(E=>function(N){return new tr(Ht(N.field),function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(E))}(t.orderBy));let c=null;t.limit&&(c=function(m){let E;return E=typeof m=="object"?m.value:m,$s(E)?null:E}(t.limit));let h=null;t.startAt&&(h=function(m){const E=!!m.before,R=m.values||[];return new er(R,E)}(t.startAt));let d=null;return t.endAt&&(d=function(m){const E=!m.before,R=m.values||[];return new er(R,E)}(t.endAt)),bm(e,r,a,o,c,"F",h,d)}function jc(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=Ht(t.unaryFilter.field);return oe.create(i,"==",{doubleValue:NaN});case"IS_NULL":const r=Ht(t.unaryFilter.field);return oe.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ht(t.unaryFilter.field);return oe.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ht(t.unaryFilter.field);return oe.create(a,"!=",{nullValue:"NULL_VALUE"});default:return H()}}(n):n.fieldFilter!==void 0?function(t){return oe.create(Ht(t.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return H()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return yt.create(t.compositeFilter.filters.map(i=>jc(i)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return H()}}(t.compositeFilter.op))}(n):H()}function Ht(n){return he.fromServerFormat(n.fieldPath)}function rg(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function sg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e){this.ct=e}}function ag(n){const e=ig({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ys(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lg{constructor(){this.un=new cg}addToCollectionParentIndex(e,t){return this.un.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(gt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(gt.min())}updateCollectionGroup(e,t,i){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class cg{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),r=this.index[t]||new we(te.comparator),o=!r.has(i);return this.index[t]=r.add(i),o}has(e){const t=e.lastSegment(),i=e.popLast(),r=this.index[t];return r&&r.has(i)}getEntries(e){return(this.index[e]||new we(te.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new rn(0)}static kn(){return new rn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(){this.changes=new hn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ve.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?P.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dg{constructor(e,t,i,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=r}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(i=r,this.remoteDocumentCache.getEntry(e,t))).next(r=>(i!==null&&Mn(i.mutation,r,ke.empty(),ae.now()),r))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.getLocalViewOfDocuments(e,i,Ee()).next(()=>i))}getLocalViewOfDocuments(e,t,i=Ee()){const r=Pt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,i).next(o=>{let a=Ri();return o.forEach((c,h)=>{a=a.insert(c,h.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const i=Pt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,Ee()))}populateOverlays(e,t,i){const r=[];return i.forEach(o=>{t.has(o)||r.push(o)}),this.documentOverlayCache.getOverlays(e,r).next(o=>{o.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,i,r){let o=nr();const a=Vn(),c=function(){return Vn()}();return t.forEach((h,d)=>{const p=i.get(d.key);r.has(d.key)&&(p===void 0||p.mutation instanceof Et)?o=o.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),Mn(p.mutation,d,p.mutation.getFieldMask(),ae.now())):a.set(d.key,ke.empty())}),this.recalculateAndSaveOverlays(e,o).next(h=>(h.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var m;return c.set(d,new hg(p,(m=a.get(d))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){const i=Vn();let r=new Ae((a,c)=>a-c),o=Ee();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(h=>{const d=t.get(h);if(d===null)return;let p=i.get(h)||ke.empty();p=c.applyToLocalView(d,p),i.set(h,p);const m=(r.get(c.batchId)||Ee()).add(h);r=r.insert(c.batchId,m)})}).next(()=>{const a=[],c=r.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),d=h.key,p=h.value,m=Dc();p.forEach(E=>{if(!o.has(E)){const R=Uc(t.get(E),i.get(E));R!==null&&m.set(E,R),o=o.add(E)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,m))}return P.waitFor(a)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,t,i,r){return function(a){return j.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Sm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,r):this.getDocumentsMatchingCollectionQuery(e,t,i,r)}getNextDocuments(e,t,i,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,r).next(o=>{const a=r-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,r-o.size):P.resolve(Pt());let c=-1,h=o;return a.next(d=>P.forEach(d,(p,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),o.get(p)?P.resolve():this.remoteDocumentCache.getEntry(e,p).next(E=>{h=h.insert(p,E)}))).next(()=>this.populateOverlays(e,d,o)).next(()=>this.computeViews(e,h,d,Ee())).next(p=>({batchId:c,changes:Nc(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new j(t)).next(i=>{let r=Ri();return i.isFoundDocument()&&(r=r.insert(i.key,i)),r})}getDocumentsMatchingCollectionGroupQuery(e,t,i,r){const o=t.collectionGroup;let a=Ri();return this.indexManager.getCollectionParents(e,o).next(c=>P.forEach(c,h=>{const d=function(m,E){return new dr(E,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,d,i,r).next(p=>{p.forEach((m,E)=>{a=a.insert(m,E)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,i,r){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,o,r))).next(a=>{o.forEach((h,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,Ve.newInvalidDocument(p)))});let c=Ri();return a.forEach((h,d)=>{const p=o.get(h);p!==void 0&&Mn(p.mutation,d,ke.empty(),ae.now()),zs(t,d)&&(c=c.insert(h,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return P.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(r){return{id:r.id,version:r.version,createTime:Jt(r.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(r){return{name:r.name,query:ag(r.bundledQuery),readTime:Jt(r.readTime)}}(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pg{constructor(){this.overlays=new Ae(j.comparator),this.Ir=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const i=Pt();return P.forEach(t,r=>this.getOverlay(e,r).next(o=>{o!==null&&i.set(r,o)})).next(()=>i)}saveOverlays(e,t,i){return i.forEach((r,o)=>{this.ht(e,t,o)}),P.resolve()}removeOverlaysForBatchId(e,t,i){const r=this.Ir.get(i);return r!==void 0&&(r.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(i)),P.resolve()}getOverlaysForCollection(e,t,i){const r=Pt(),o=t.length+1,a=new j(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const h=c.getNext().value,d=h.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>i&&r.set(h.getKey(),h)}return P.resolve(r)}getOverlaysForCollectionGroup(e,t,i,r){let o=new Ae((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>i){let p=o.get(d.largestBatchId);p===null&&(p=Pt(),o=o.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=Pt(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=r)););return P.resolve(c)}ht(e,t,i){const r=this.overlays.get(i.key);if(r!==null){const a=this.Ir.get(r.largestBatchId).delete(i.key);this.Ir.set(r.largestBatchId,a)}this.overlays=this.overlays.insert(i.key,new zm(t,i));let o=this.Ir.get(t);o===void 0&&(o=Ee(),this.Ir.set(t,o)),this.Ir.set(t,o.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(){this.sessionToken=je.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(){this.Tr=new we(se.Er),this.dr=new we(se.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const i=new se(e,t);this.Tr=this.Tr.add(i),this.dr=this.dr.add(i)}Rr(e,t){e.forEach(i=>this.addReference(i,t))}removeReference(e,t){this.Vr(new se(e,t))}mr(e,t){e.forEach(i=>this.removeReference(i,t))}gr(e){const t=new j(new te([])),i=new se(t,e),r=new se(t,e+1),o=[];return this.dr.forEachInRange([i,r],a=>{this.Vr(a),o.push(a.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new j(new te([])),i=new se(t,e),r=new se(t,e+1);let o=Ee();return this.dr.forEachInRange([i,r],a=>{o=o.add(a.key)}),o}containsKey(e){const t=new se(e,0),i=this.Tr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class se{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return j.comparator(e.key,t.key)||J(e.wr,t.wr)}static Ar(e,t){return J(e.wr,t.wr)||j.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gg{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new we(se.Er)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,r){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Hm(o,t,i,r);this.mutationQueue.push(a);for(const c of r)this.br=this.br.add(new se(c.key,o)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,r=this.vr(i),o=r<0?0:r;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new se(t,0),r=new se(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([i,r],a=>{const c=this.Dr(a.wr);o.push(c)}),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new we(J);return t.forEach(r=>{const o=new se(r,0),a=new se(r,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,a],c=>{i=i.add(c.wr)})}),P.resolve(this.Cr(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,r=i.length+1;let o=i;j.isDocumentKey(o)||(o=o.child(""));const a=new se(new j(o),0);let c=new we(J);return this.br.forEachWhile(h=>{const d=h.key.path;return!!i.isPrefixOf(d)&&(d.length===r&&(c=c.add(h.wr)),!0)},a),P.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(i=>{const r=this.Dr(i);r!==null&&t.push(r)}),t}removeMutationBatch(e,t){ne(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let i=this.br;return P.forEach(t.mutations,r=>{const o=new se(r.key,t.batchId);return i=i.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.br=i})}On(e){}containsKey(e,t){const i=new se(t,0),r=this.br.firstAfterOrEqual(i);return P.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg{constructor(e){this.Mr=e,this.docs=function(){return new Ae(j.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,r=this.docs.get(i),o=r?r.size:0,a=this.Mr(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return P.resolve(i?i.document.mutableCopy():Ve.newInvalidDocument(t))}getEntries(e,t){let i=nr();return t.forEach(r=>{const o=this.docs.get(r);i=i.insert(r,o?o.document.mutableCopy():Ve.newInvalidDocument(r))}),P.resolve(i)}getDocumentsMatchingQuery(e,t,i,r){let o=nr();const a=t.path,c=new j(a.child("")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:d,value:{document:p}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||rm(im(p),i)<=0||(r.has(p.key)||zs(t,p))&&(o=o.insert(p.key,p.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(e,t,i,r){H()}Or(e,t){return P.forEach(this.docs,i=>t(i))}newChangeBuffer(e){return new _g(this)}getSize(e){return P.resolve(this.size)}}class _g extends ug{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((i,r)=>{r.isValidDocument()?t.push(this.cr.addEntry(e,r)):this.cr.removeEntry(i)}),P.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(e){this.persistence=e,this.Nr=new hn(t=>qs(t),Hs),this.lastRemoteSnapshotVersion=Z.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Qs,this.targetCount=0,this.kr=rn.Bn()}forEachTarget(e,t){return this.Nr.forEach((i,r)=>t(r)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.Lr&&(this.Lr=t),P.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new rn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Kn(t),P.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,i){let r=0;const o=[];return this.Nr.forEach((a,c)=>{c.sequenceNumber<=t&&i.get(c.targetId)===null&&(this.Nr.delete(a),o.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)}),P.waitFor(o).next(()=>r)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const i=this.Nr.get(t)||null;return P.resolve(i)}addMatchingKeys(e,t,i){return this.Br.Rr(t,i),P.resolve()}removeMatchingKeys(e,t,i){this.Br.mr(t,i);const r=this.persistence.referenceDelegate,o=[];return r&&t.forEach(a=>{o.push(r.markPotentiallyOrphaned(e,a))}),P.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const i=this.Br.yr(t);return P.resolve(i)}containsKey(e,t){return P.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{constructor(e,t){this.qr={},this.overlays={},this.Qr=new _c(0),this.Kr=!1,this.Kr=!0,this.$r=new mg,this.referenceDelegate=e(this),this.Ur=new vg(this),this.indexManager=new lg,this.remoteDocumentCache=function(r){return new yg(r)}(i=>this.referenceDelegate.Wr(i)),this.serializer=new og(t),this.Gr=new fg(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new pg,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this.qr[e.toKey()];return i||(i=new gg(t,this.referenceDelegate),this.qr[e.toKey()]=i),i}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,i){M("MemoryPersistence","Starting transaction:",e);const r=new wg(this.Qr.next());return this.referenceDelegate.zr(),i(r).next(o=>this.referenceDelegate.jr(r).next(()=>o)).toPromise().then(o=>(r.raiseOnCommittedEvent(),o))}Hr(e,t){return P.or(Object.values(this.qr).map(i=>()=>i.containsKey(e,t)))}}class wg extends om{constructor(e){super(),this.currentSequenceNumber=e}}class Js{constructor(e){this.persistence=e,this.Jr=new Qs,this.Yr=null}static Zr(e){return new Js(e)}get Xr(){if(this.Yr)return this.Yr;throw H()}addReference(e,t,i){return this.Jr.addReference(i,t),this.Xr.delete(i.toString()),P.resolve()}removeReference(e,t,i){return this.Jr.removeReference(i,t),this.Xr.add(i.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),P.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(r=>this.Xr.add(r.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next(r=>{r.forEach(o=>this.Xr.add(o.toString()))}).next(()=>i.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Xr,i=>{const r=j.fromPath(i);return this.ei(e,r).next(o=>{o||t.removeEntry(r,Z.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(i=>{i?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return P.or([()=>P.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t,i,r){this.targetId=e,this.fromCache=t,this.$i=i,this.Ui=r}static Wi(e,t){let i=Ee(),r=Ee();for(const o of t.docChanges)switch(o.type){case 0:i=i.add(o.doc.key);break;case 1:r=r.add(o.doc.key)}return new Xs(e,t.fromCache,i,r)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ig{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tg{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return gh()?8:am(Ie())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,i,r){const o={result:null};return this.Yi(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Zi(e,t,r,i).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new Ig;return this.Xi(e,t,a).next(c=>{if(o.result=c,this.zi)return this.es(e,t,a,c.size)})}).next(()=>o.result)}es(e,t,i,r){return i.documentReadCount<this.ji?(Sn()<=q.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Rn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),P.resolve()):(Sn()<=q.DEBUG&&M("QueryEngine","Query:",Rn(t),"scans",i.documentReadCount,"local documents and returns",r,"documents as results."),i.documentReadCount>this.Hi*r?(Sn()<=q.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Rn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ct(t))):P.resolve())}Yi(e,t){if(Ja(t))return P.resolve(null);let i=Ct(t);return this.indexManager.getIndexType(e,i).next(r=>r===0?null:(t.limit!==null&&r===1&&(t=ys(t,null,"F"),i=Ct(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next(o=>{const a=Ee(...o);return this.Ji.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,i).next(h=>{const d=this.ts(t,c);return this.ns(t,d,a,h.readTime)?this.Yi(e,ys(t,null,"F")):this.rs(e,d,t,h)}))})))}Zi(e,t,i,r){return Ja(t)||r.isEqual(Z.min())?P.resolve(null):this.Ji.getDocuments(e,i).next(o=>{const a=this.ts(t,o);return this.ns(t,a,i,r)?P.resolve(null):(Sn()<=q.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Rn(t)),this.rs(e,a,t,nm(r,-1)).next(c=>c))})}ts(e,t){let i=new we(Pm(e));return t.forEach((r,o)=>{zs(e,o)&&(i=i.add(o))}),i}ns(e,t,i,r){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(r)>0)}Xi(e,t,i){return Sn()<=q.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Rn(t)),this.Ji.getDocumentsMatchingQuery(e,t,gt.min(),i)}rs(e,t,i,r){return this.Ji.getDocumentsMatchingQuery(e,i,r).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg{constructor(e,t,i,r){this.persistence=e,this.ss=t,this.serializer=r,this.os=new Ae(J),this._s=new hn(o=>qs(o),Hs),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(i)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new dg(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Ag(n,e,t,i){return new bg(n,e,t,i)}async function Bc(n,e){const t=X(n);return await t.persistence.runTransaction("Handle user change","readonly",i=>{let r;return t.mutationQueue.getAllMutationBatches(i).next(o=>(r=o,t.ls(e),t.mutationQueue.getAllMutationBatches(i))).next(o=>{const a=[],c=[];let h=Ee();for(const d of r){a.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}for(const d of o){c.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}return t.localDocuments.getDocuments(i,h).next(d=>({hs:d,removedBatchIds:a,addedBatchIds:c}))})})}function Sg(n,e){const t=X(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const r=e.batch.keys(),o=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,h,d,p){const m=d.batch,E=m.keys();let R=P.resolve();return E.forEach(N=>{R=R.next(()=>p.getEntry(h,N)).next(U=>{const L=d.docVersions.get(N);ne(L!==null),U.version.compareTo(L)<0&&(m.applyToRemoteDocument(U,d),U.isValidDocument()&&(U.setReadTime(d.commitVersion),p.addEntry(U)))})}),R.next(()=>c.mutationQueue.removeMutationBatch(h,m))}(t,i,e,o).next(()=>o.apply(i)).next(()=>t.mutationQueue.performConsistencyCheck(i)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(i,r,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(c){let h=Ee();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(h=h.add(c.batch.mutations[d].key));return h}(e))).next(()=>t.localDocuments.getDocuments(i,r))})}function Rg(n){const e=X(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Pg(n,e){const t=X(n);return t.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}class nl{constructor(){this.activeTargetIds=Lm()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class kg{constructor(){this.so=new nl,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,i){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new nl,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cg{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){M("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){M("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pi=null;function ts(){return Pi===null?Pi=function(){return 268435456+Math.round(2147483648*Math.random())}():Pi++,"0x"+Pi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ng={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _e="WebChannelConnection";class Og extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const i=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=i+"://"+t.host,this.vo=`projects/${r}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${r}`:`project_id=${r}&database_id=${o}`}get Fo(){return!1}Mo(t,i,r,o,a){const c=ts(),h=this.xo(t,i.toUriEncodedString());M("RestConnection",`Sending RPC '${t}' ${c}:`,h,r);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,o,a),this.No(t,h,d,r).then(p=>(M("RestConnection",`Received RPC '${t}' ${c}: `,p),p),p=>{throw Ji("RestConnection",`RPC '${t}' ${c} failed with error: `,p,"url: ",h,"request:",r),p})}Lo(t,i,r,o,a,c){return this.Mo(t,i,r,o,a)}Oo(t,i,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),i&&i.headers.forEach((o,a)=>t[a]=o),r&&r.headers.forEach((o,a)=>t[a]=o)}xo(t,i){const r=Ng[t];return`${this.Do}/v1/${i}:${r}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,i,r){const o=ts();return new Promise((a,c)=>{const h=new uc;h.setWithCredentials(!0),h.listenOnce(hc.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case xi.NO_ERROR:const p=h.getResponseJson();M(_e,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),a(p);break;case xi.TIMEOUT:M(_e,`RPC '${e}' ${o} timed out`),c(new F(k.DEADLINE_EXCEEDED,"Request time out"));break;case xi.HTTP_ERROR:const m=h.getStatus();if(M(_e,`RPC '${e}' ${o} failed with status:`,m,"response text:",h.getResponseText()),m>0){let E=h.getResponseJson();Array.isArray(E)&&(E=E[0]);const R=E==null?void 0:E.error;if(R&&R.status&&R.message){const N=function(L){const K=L.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(K)>=0?K:k.UNKNOWN}(R.status);c(new F(N,R.message))}else c(new F(k.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new F(k.UNAVAILABLE,"Connection failed."));break;default:H()}}finally{M(_e,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(r);M(_e,`RPC '${e}' ${o} sending request:`,r),h.send(t,"POST",d,i,15)})}Bo(e,t,i){const r=ts(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=pc(),c=fc(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,t,i),h.encodeInitMessageHeaders=!0;const p=o.join("");M(_e,`Creating RPC '${e}' stream ${r}: ${p}`,h);const m=a.createWebChannel(p,h);let E=!1,R=!1;const N=new Dg({Io:L=>{R?M(_e,`Not sending because RPC '${e}' stream ${r} is closed:`,L):(E||(M(_e,`Opening RPC '${e}' stream ${r} transport.`),m.open(),E=!0),M(_e,`RPC '${e}' stream ${r} sending:`,L),m.send(L))},To:()=>m.close()}),U=(L,K,W)=>{L.listen(K,S=>{try{W(S)}catch(O){setTimeout(()=>{throw O},0)}})};return U(m,Cn.EventType.OPEN,()=>{R||(M(_e,`RPC '${e}' stream ${r} transport opened.`),N.yo())}),U(m,Cn.EventType.CLOSE,()=>{R||(R=!0,M(_e,`RPC '${e}' stream ${r} transport closed`),N.So())}),U(m,Cn.EventType.ERROR,L=>{R||(R=!0,Ji(_e,`RPC '${e}' stream ${r} transport errored:`,L),N.So(new F(k.UNAVAILABLE,"The operation could not be completed")))}),U(m,Cn.EventType.MESSAGE,L=>{var K;if(!R){const W=L.data[0];ne(!!W);const S=W,O=S.error||((K=S[0])===null||K===void 0?void 0:K.error);if(O){M(_e,`RPC '${e}' stream ${r} received error:`,O);const V=O.status;let B=function(y){const v=ie[y];if(v!==void 0)return Wm(v)}(V),w=O.message;B===void 0&&(B=k.INTERNAL,w="Unknown error status: "+V+" with message "+O.message),R=!0,N.So(new F(B,w)),m.close()}else M(_e,`RPC '${e}' stream ${r} received:`,W),N.bo(W)}}),U(c,dc.STAT_EVENT,L=>{L.stat===fs.PROXY?M(_e,`RPC '${e}' stream ${r} detected buffering proxy`):L.stat===fs.NOPROXY&&M(_e,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{N.wo()},0),N}}function ns(){return typeof document!="undefined"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mr(n){return new Km(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e,t,i=1e3,r=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=i,this.qo=r,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),i=Math.max(0,Date.now()-this.Uo),r=Math.max(0,t-i);r>0&&M("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,r,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(e,t,i,r,o,a,c,h){this.ui=e,this.Ho=i,this.Jo=r,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new qc(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(Lt(t.toString()),Lt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,r])=>{this.Yo===t&&this.P_(i,r)},i=>{e(()=>{const r=new F(k.UNKNOWN,"Fetching auth token failed: "+i.message);return this.I_(r)})})}P_(e,t){const i=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{i(()=>this.listener.Eo())}),this.stream.Ro(()=>{i(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(r=>{i(()=>this.I_(r))}),this.stream.onMessage(r=>{i(()=>++this.e_==1?this.E_(r):this.onNext(r))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return M("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(M("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Vg extends Lg{constructor(e,t,i,r,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,r,a),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return ne(!!e.streamToken),this.lastStreamToken=e.streamToken,ne(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){ne(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=ng(e.writeResults,e.commitTime),i=Jt(e.commitTime);return this.listener.g_(i,t)}p_(){const e={};e.database=Zm(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(i=>tg(this.serializer,i))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mg extends class{}{constructor(e,t,i,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=r,this.y_=!1}w_(){if(this.y_)throw new F(k.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,i,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Mo(e,vs(t,i),r,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new F(k.UNKNOWN,o.toString())})}Lo(e,t,i,r,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Lo(e,vs(t,i),r,a,c,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new F(k.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class xg{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Lt(t),this.D_=!1):M("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e,t,i,r,o){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(a=>{i.enqueueAndForget(async()=>{ei(this)&&(M("RemoteStore","Restarting streams for network reachability change."),await async function(h){const d=X(h);d.L_.add(4),await Zn(d),d.q_.set("Unknown"),d.L_.delete(4),await gr(d)}(this))})}),this.q_=new xg(i,r)}}async function gr(n){if(ei(n))for(const e of n.B_)await e(!0)}async function Zn(n){for(const e of n.B_)await e(!1)}function ei(n){return X(n).L_.size===0}async function Hc(n,e,t){if(!hr(e))throw e;n.L_.add(1),await Zn(n),n.q_.set("Offline"),t||(t=()=>Rg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{M("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await gr(n)})}function zc(n,e){return e().catch(t=>Hc(n,t,e))}async function yr(n){const e=X(n),t=_t(e);let i=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;Fg(e);)try{const r=await Pg(e.localStore,i);if(r===null){e.O_.length===0&&t.o_();break}i=r.batchId,$g(e,r)}catch(r){await Hc(e,r)}Gc(e)&&Wc(e)}function Fg(n){return ei(n)&&n.O_.length<10}function $g(n,e){n.O_.push(e);const t=_t(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Gc(n){return ei(n)&&!_t(n).n_()&&n.O_.length>0}function Wc(n){_t(n).start()}async function jg(n){_t(n).p_()}async function Bg(n){const e=_t(n);for(const t of n.O_)e.m_(t.mutations)}async function qg(n,e,t){const i=n.O_.shift(),r=Ks.from(i,e,t);await zc(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await yr(n)}async function Hg(n,e){e&&_t(n).V_&&await async function(i,r){if(function(a){return Gm(a)&&a!==k.ABORTED}(r.code)){const o=i.O_.shift();_t(i).s_(),await zc(i,()=>i.remoteSyncer.rejectFailedWrite(o.batchId,r)),await yr(i)}}(n,e),Gc(n)&&Wc(n)}async function rl(n,e){const t=X(n);t.asyncQueue.verifyOperationInProgress(),M("RemoteStore","RemoteStore received new credentials");const i=ei(t);t.L_.add(3),await Zn(t),i&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await gr(t)}async function zg(n,e){const t=X(n);e?(t.L_.delete(2),await gr(t)):e||(t.L_.add(2),await Zn(t),t.q_.set("Unknown"))}function _t(n){return n.U_||(n.U_=function(t,i,r){const o=X(t);return o.w_(),new Vg(i,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,r)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:jg.bind(null,n),mo:Hg.bind(null,n),f_:Bg.bind(null,n),g_:qg.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await yr(n)):(await n.U_.stop(),n.O_.length>0&&(M("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e,t,i,r,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=r,this.removalCallback=o,this.deferred=new kt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,r,o){const a=Date.now()+i,c=new Ys(e,t,a,r,o);return c.start(i),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Kc(n,e){if(Lt("AsyncQueue",`${e}: ${n}`),hr(n))return new F(k.UNAVAILABLE,`${e}: ${n}`);throw n}class Gg{constructor(){this.queries=sl(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,i){const r=X(t),o=r.queries;r.queries=sl(),o.forEach((a,c)=>{for(const h of c.j_)h.onError(i)})})(this,new F(k.ABORTED,"Firestore shutting down"))}}function sl(){return new hn(n=>kc(n),Pc)}function Wg(n){n.Y_.forEach(e=>{e.next()})}var ol,al;(al=ol||(ol={})).ea="default",al.Cache="cache";class Kg{constructor(e,t,i,r,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=r,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new hn(c=>kc(c),Pc),this.Ma=new Map,this.xa=new Set,this.Oa=new Ae(j.comparator),this.Na=new Map,this.La=new Qs,this.Ba={},this.ka=new Map,this.qa=rn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Qg(n,e,t){const i=Zg(n);try{const r=await function(a,c){const h=X(a),d=ae.now(),p=c.reduce((R,N)=>R.add(N.key),Ee());let m,E;return h.persistence.runTransaction("Locally write mutations","readwrite",R=>{let N=nr(),U=Ee();return h.cs.getEntries(R,p).next(L=>{N=L,N.forEach((K,W)=>{W.isValidDocument()||(U=U.add(K))})}).next(()=>h.localDocuments.getOverlayedDocuments(R,N)).next(L=>{m=L;const K=[];for(const W of c){const S=Bm(W,m.get(W.key).overlayedDocument);S!=null&&K.push(new Et(W.key,S,wc(S.value.mapValue),Me.exists(!0)))}return h.mutationQueue.addMutationBatch(R,d,K,c)}).next(L=>{E=L;const K=L.applyToLocalDocumentSet(m,U);return h.documentOverlayCache.saveOverlays(R,L.batchId,K)})}).then(()=>({batchId:E.batchId,changes:Nc(m)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(r.batchId),function(a,c,h){let d=a.Ba[a.currentUser.toKey()];d||(d=new Ae(J)),d=d.insert(c,h),a.Ba[a.currentUser.toKey()]=d}(i,r.batchId,t),await _r(i,r.changes),await yr(i.remoteStore)}catch(r){const o=Kc(r,"Failed to persist write");t.reject(o)}}function ll(n,e,t){const i=X(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const r=[];i.Fa.forEach((o,a)=>{const c=a.view.Z_(e);c.snapshot&&r.push(c.snapshot)}),function(a,c){const h=X(a);h.onlineState=c;let d=!1;h.queries.forEach((p,m)=>{for(const E of m.j_)E.Z_(c)&&(d=!0)}),d&&Wg(h)}(i.eventManager,e),r.length&&i.Ca.d_(r),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function Jg(n,e){const t=X(n),i=e.batch.batchId;try{const r=await Sg(t.localStore,e);Jc(t,i,null),Qc(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await _r(t,r)}catch(r){await yc(r)}}async function Xg(n,e,t){const i=X(n);try{const r=await function(a,c){const h=X(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return h.mutationQueue.lookupMutationBatch(d,c).next(m=>(ne(m!==null),p=m.keys(),h.mutationQueue.removeMutationBatch(d,m))).next(()=>h.mutationQueue.performConsistencyCheck(d)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>h.localDocuments.getDocuments(d,p))})}(i.localStore,e);Jc(i,e,t),Qc(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await _r(i,r)}catch(r){await yc(r)}}function Qc(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function Jc(n,e,t){const i=X(n);let r=i.Ba[i.currentUser.toKey()];if(r){const o=r.get(e);o&&(t?o.reject(t):o.resolve(),r=r.remove(e)),i.Ba[i.currentUser.toKey()]=r}}async function _r(n,e,t){const i=X(n),r=[],o=[],a=[];i.Fa.isEmpty()||(i.Fa.forEach((c,h)=>{a.push(i.Ka(h,e,t).then(d=>{var p;if((d||t)&&i.isPrimaryClient){const m=d?!d.fromCache:(p=void 0)===null||p===void 0?void 0:p.current;i.sharedClientState.updateQueryState(h.targetId,m?"current":"not-current")}if(d){r.push(d);const m=Xs.Wi(h.targetId,d);o.push(m)}}))}),await Promise.all(a),i.Ca.d_(r),await async function(h,d){const p=X(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>P.forEach(d,E=>P.forEach(E.$i,R=>p.persistence.referenceDelegate.addReference(m,E.targetId,R)).next(()=>P.forEach(E.Ui,R=>p.persistence.referenceDelegate.removeReference(m,E.targetId,R)))))}catch(m){if(!hr(m))throw m;M("LocalStore","Failed to update sequence numbers: "+m)}for(const m of d){const E=m.targetId;if(!m.fromCache){const R=p.os.get(E),N=R.snapshotVersion,U=R.withLastLimboFreeSnapshotVersion(N);p.os=p.os.insert(E,U)}}}(i.localStore,o))}async function Yg(n,e){const t=X(n);if(!t.currentUser.isEqual(e)){M("SyncEngine","User change. New user:",e.toKey());const i=await Bc(t.localStore,e);t.currentUser=e,function(o,a){o.ka.forEach(c=>{c.forEach(h=>{h.reject(new F(k.CANCELLED,a))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await _r(t,i.hs)}}function Zg(n){const e=X(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Jg.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Xg.bind(null,e),e}class rr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=mr(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Ag(this.persistence,new Tg,e.initialUser,this.serializer)}Ga(e){return new Eg(Js.Zr,this.serializer)}Wa(e){return new kg}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}rr.provider={build:()=>new rr};class ws{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>ll(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=Yg.bind(null,this.syncEngine),await zg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Gg}()}createDatastore(e){const t=mr(e.databaseInfo.databaseId),i=function(o){return new Og(o)}(e.databaseInfo);return function(o,a,c,h){return new Mg(o,a,c,h)}(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return function(i,r,o,a,c){return new Ug(i,r,o,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>ll(this.syncEngine,t,0),function(){return il.D()?new il:new Cg}())}createSyncEngine(e,t){return function(r,o,a,c,h,d,p){const m=new Kg(r,o,a,c,h,d);return p&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(r){const o=X(r);M("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await Zn(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}ws.provider={build:()=>new ws};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e,t,i,r,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this.databaseInfo=r,this.user=ve.UNAUTHENTICATED,this.clientId=gc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(i,async a=>{M("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(i,a=>(M("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new kt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=Kc(t,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}async function is(n,e){n.asyncQueue.verifyOperationInProgress(),M("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener(async r=>{i.isEqual(r)||(await Bc(e.localStore,r),i=r)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function cl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await ty(n);M("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(i=>rl(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,r)=>rl(e.remoteStore,r)),n._onlineComponents=e}async function ty(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M("FirestoreClient","Using user provided OfflineComponentProvider");try{await is(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(r){return r.name==="FirebaseError"?r.code===k.FAILED_PRECONDITION||r.code===k.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(t))throw t;Ji("Error using user provided cache. Falling back to memory cache: "+t),await is(n,new rr)}}else M("FirestoreClient","Using default OfflineComponentProvider"),await is(n,new rr);return n._offlineComponents}async function ny(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M("FirestoreClient","Using user provided OnlineComponentProvider"),await cl(n,n._uninitializedComponentsProvider._online)):(M("FirestoreClient","Using default OnlineComponentProvider"),await cl(n,new ws))),n._onlineComponents}function iy(n){return ny(n).then(e=>e.syncEngine)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xc(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ul=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yc(n,e,t){if(!t)throw new F(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function ry(n,e,t,i){if(e===!0&&i===!0)throw new F(k.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function hl(n){if(!j.isDocumentKey(n))throw new F(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function dl(n){if(j.isDocumentKey(n))throw new F(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Zs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":H()}function sn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new F(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Zs(n);throw new F(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(e){var t,i;if(e.host===void 0){if(e.ssl!==void 0)throw new F(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new F(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ry("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Xc((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new F(k.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new F(k.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new F(k.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,r){return i.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class vr{constructor(e,t,i,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new fl({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new F(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new fl(e),e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new Wp;switch(i.type){case"firstParty":return new Xp(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new F(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const i=ul.get(t);i&&(M("ComponentProvider","Removing Datastore"),ul.delete(t),i.terminate())}(this),Promise.resolve()}}function sy(n,e,t,i={}){var r;const o=(n=sn(n,vr))._getSettings(),a=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&Ji("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),i.mockUserToken){let c,h;if(typeof i.mockUserToken=="string")c=i.mockUserToken,h=ve.MOCK_USER;else{c=ch(i.mockUserToken,(r=n._app)===null||r===void 0?void 0:r.options.projectId);const d=i.mockUserToken.sub||i.mockUserToken.user_id;if(!d)throw new F(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new ve(d)}n._authCredentials=new Kp(new mc(c,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new eo(this.firestore,e,this._query)}}class xe{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new mt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new xe(this.firestore,e,this._key)}}class mt extends eo{constructor(e,t,i){super(e,t,Am(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new xe(this.firestore,null,new j(e))}withConverter(e){return new mt(this.firestore,e,this._path)}}function oy(n,e,...t){if(n=de(n),Yc("collection","path",e),n instanceof vr){const i=te.fromString(e,...t);return dl(i),new mt(n,null,i)}{if(!(n instanceof xe||n instanceof mt))throw new F(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(te.fromString(e,...t));return dl(i),new mt(n.firestore,null,i)}}function to(n,e,...t){if(n=de(n),arguments.length===1&&(e=gc.newId()),Yc("doc","path",e),n instanceof vr){const i=te.fromString(e,...t);return hl(i),new xe(n,null,new j(i))}{if(!(n instanceof xe||n instanceof mt))throw new F(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(te.fromString(e,...t));return hl(i),new xe(n.firestore,n instanceof mt?n.converter:null,new j(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new qc(this,"async_queue_retry"),this.Vu=()=>{const i=ns();i&&M("AsyncQueue","Visibility state changed to "+i.visibilityState),this.t_.jo()},this.mu=e;const t=ns();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=ns();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new kt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!hr(e))throw e;M("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(i=>{this.Eu=i,this.du=!1;const r=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(i);throw Lt("INTERNAL UNHANDLED ERROR: ",r),i}).then(i=>(this.du=!1,i))));return this.mu=t,t}enqueueAfterDelay(e,t,i){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const r=Ys.createAndSchedule(this,e,t,i,o=>this.yu(o));return this.Tu.push(r),r}fu(){this.Eu&&H()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class Er extends vr{constructor(e,t,i,r){super(e,t,i,r),this.type="firestore",this._queue=new pl,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new pl(e),this._firestoreClient=void 0,await e}}}function ay(n,e){const t=typeof n=="object"?n:Sl(),i=typeof n=="string"?n:"(default)",r=ks(t,"firestore").getImmediate({identifier:i});if(!r._initialized){const o=ah("firestore");o&&sy(r,...o)}return r}function ly(n){if(n._terminated)throw new F(k.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||cy(n),n._firestoreClient}function cy(n){var e,t,i;const r=n._freezeSettings(),o=function(c,h,d,p){return new hm(c,h,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Xc(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,r);n._componentsProvider||!((t=r.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((i=r.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),n._firestoreClient=new ey(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Gn(je.fromBase64String(e))}catch(t){throw new F(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Gn(je.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new F(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new he(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new F(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new F(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,r){if(i.length!==r.length)return!1;for(let o=0;o<i.length;++o)if(i[o]!==r[o])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uy=/^__.*__$/;class hy{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new Et(e,this.data,this.fieldMask,t,this.fieldTransforms):new Yn(e,this.data,t,this.fieldTransforms)}}class tu{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new Et(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function nu(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw H()}}class io{constructor(e,t,i,r,o,a){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=r,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new io(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),r=this.Fu({path:i,xu:!1});return r.Ou(e),r}Nu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),r=this.Fu({path:i,xu:!1});return r.vu(),r}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return sr(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(nu(this.Cu)&&uy.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class dy{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||mr(e)}Qu(e,t,i,r=!1){return new io({Cu:e,methodName:t,qu:i,path:he.emptyPath(),xu:!1,ku:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function iu(n){const e=n._freezeSettings(),t=mr(n._databaseId);return new dy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function fy(n,e,t,i,r,o={}){const a=n.Qu(o.merge||o.mergeFields?2:0,e,t,r);so("Data must be an object, but it was:",a,i);const c=ru(i,a);let h,d;if(o.merge)h=new ke(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const p=[];for(const m of o.mergeFields){const E=Is(e,m,t);if(!a.contains(E))throw new F(k.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);au(p,E)||p.push(E)}h=new ke(p),d=a.fieldTransforms.filter(m=>h.covers(m.field))}else h=null,d=a.fieldTransforms;return new hy(new Re(c),h,d)}class Ir extends wr{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ir}}class ro extends wr{_toFieldTransform(e){return new Um(e.path,new qn)}isEqual(e){return e instanceof ro}}function py(n,e,t,i){const r=n.Qu(1,e,t);so("Data must be an object, but it was:",r,i);const o=[],a=Re.empty();un(i,(h,d)=>{const p=ou(e,h,t);d=de(d);const m=r.Nu(p);if(d instanceof Ir)o.push(p);else{const E=Tr(d,m);E!=null&&(o.push(p),a.set(p,E))}});const c=new ke(o);return new tu(a,c,r.fieldTransforms)}function my(n,e,t,i,r,o){const a=n.Qu(1,e,t),c=[Is(e,i,t)],h=[r];if(o.length%2!=0)throw new F(k.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let E=0;E<o.length;E+=2)c.push(Is(e,o[E])),h.push(o[E+1]);const d=[],p=Re.empty();for(let E=c.length-1;E>=0;--E)if(!au(d,c[E])){const R=c[E];let N=h[E];N=de(N);const U=a.Nu(R);if(N instanceof Ir)d.push(R);else{const L=Tr(N,U);L!=null&&(d.push(R),p.set(R,L))}}const m=new ke(d);return new tu(p,m,a.fieldTransforms)}function Tr(n,e){if(su(n=de(n)))return so("Unsupported field value:",e,n),ru(n,e);if(n instanceof wr)return function(i,r){if(!nu(r.Cu))throw r.Bu(`${i._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Bu(`${i._methodName}() is not currently supported inside arrays`);const o=i._toFieldTransform(r);o&&r.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(i,r){const o=[];let a=0;for(const c of i){let h=Tr(c,r.Lu(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,e)}return function(i,r){if((i=de(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return Vm(r.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const o=ae.fromDate(i);return{timestampValue:_s(r.serializer,o)}}if(i instanceof ae){const o=new ae(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:_s(r.serializer,o)}}if(i instanceof Zc)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Gn)return{bytesValue:Qm(r.serializer,i._byteString)};if(i instanceof xe){const o=r.databaseId,a=i.firestore._databaseId;if(!a.isEqual(o))throw r.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:$c(i.firestore._databaseId||r.databaseId,i._key.path)}}if(i instanceof eu)return function(a,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw c.Bu("VectorValues must only contain numeric values.");return Gs(c.serializer,h)})}}}}}}(i,r);throw r.Bu(`Unsupported field value: ${Zs(i)}`)}(n,e)}function ru(n,e){const t={};return vc(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):un(n,(i,r)=>{const o=Tr(r,e.Mu(i));o!=null&&(t[i]=o)}),{mapValue:{fields:t}}}function su(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ae||n instanceof Zc||n instanceof Gn||n instanceof xe||n instanceof wr||n instanceof eu)}function so(n,e,t){if(!su(t)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(t)){const i=Zs(t);throw i==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+i)}}function Is(n,e,t){if((e=de(e))instanceof no)return e._internalPath;if(typeof e=="string")return ou(n,e);throw sr("Field path arguments must be of type string or ",n,!1,void 0,t)}const gy=new RegExp("[~\\*/\\[\\]]");function ou(n,e,t){if(e.search(gy)>=0)throw sr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new no(...e.split("."))._internalPath}catch{throw sr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function sr(n,e,t,i,r){const o=i&&!i.isEmpty(),a=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${i}`),a&&(h+=` in document ${r}`),h+=")"),new F(k.INVALID_ARGUMENT,c+n+h)}function au(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yy(n,e,t){let i;return i=n?n.toFirestore(e):e,i}function _y(n,e,t){n=sn(n,xe);const i=sn(n.firestore,Er),r=yy(n.converter,e);return oo(i,[fy(iu(i),"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,Me.none())])}function vy(n,e,t,...i){n=sn(n,xe);const r=sn(n.firestore,Er),o=iu(r);let a;return a=typeof(e=de(e))=="string"||e instanceof no?my(o,"updateDoc",n._key,e,t,i):py(o,"updateDoc",n._key,e),oo(r,[a.toMutation(n._key,Me.exists(!0))])}function Ey(n){return oo(sn(n.firestore,Er),[new Ws(n._key,Me.none())])}function oo(n,e){return function(i,r){const o=new kt;return i.asyncQueue.enqueueAndForget(async()=>Qg(await iy(i),r,o)),o.promise}(ly(n),e)}function lu(){return new ro("serverTimestamp")}(function(e,t=!0){(function(r){cn=r})(on),Xt(new Nt("firestore",(i,{instanceIdentifier:r,options:o})=>{const a=i.getProvider("app").getImmediate(),c=new Er(new Qp(i.getProvider("auth-internal")),new Zp(i.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new F(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Zi(d.options.projectId,p)}(a,r),a);return o=Object.assign({useFetchStreams:t},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),ft(Ba,"4.7.3",e),ft(Ba,"4.7.3","esm2017")})();function wy(){try{const n=typeof window!="undefined"&&window.DigitEarnBridge;if(n&&typeof n.getFirebaseConfig=="function"){const e=String(n.getFirebaseConfig()||"");if(e.length>2)return JSON.parse(e)||{}}}catch{}return typeof window!="undefined"&&window.__DIGITEARN_FB_CONFIG__||{}}const jt=wy(),Bt={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0},$i={apiKey:jt.apiKey||Bt.apiKey||"",authDomain:jt.authDomain||Bt.authDomain||"",projectId:jt.projectId||Bt.projectId||"",storageBucket:jt.storageBucket||Bt.storageBucket||"",messagingSenderId:jt.messagingSenderId||Bt.messagingSenderId||"",appId:jt.appId||Bt.appId||""},cu=!!($i.apiKey&&$i.projectId&&$i.appId),Iy=typeof location!="undefined"&&/^https?:$/.test(location.protocol),Ty=Iy?"":"https://digitearn.vercel.app",uu=Al($i),ti=zp(uu),ao=ay(uu),Pe=n=>"৳"+Number(n||0).toLocaleString("en-BD",{maximumFractionDigits:2}),Ne=n=>{const e=n!=null&&n.toDate?n.toDate():n?new Date(n):new Date(0);return e.getTime()?e.toLocaleString("en-BD",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):"—"},C=n=>String(n!=null?n:"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);async function fe(n,e={},t="POST"){if(!cu)throw new Error("Firebase configure করা নেই");let i=n;const r=String(n).match(/^\/api\/admin\/([a-z0-9-]+)/);r&&(i="/api/admin/panel?op="+encodeURIComponent(r[1]));const o=async c=>{const h=ti.currentUser;if(!h)throw new Error("Login required — আবার লগইন করুন");const d=await fetch(Ty+i,{method:t,headers:{"Content-Type":"application/json",Authorization:"Bearer "+await h.getIdToken(c)},body:t==="GET"?void 0:JSON.stringify(e)});let p="";try{p=await d.text()}catch{}let m=null;try{m=p?JSON.parse(p):{}}catch{}return{resp:d,data:m||{},isJson:!!m}};let a=await o(!1);if(!a.resp.ok&&(a.resp.status===401||a.data.sessionExpired===!0)&&(a=await o(!0)),!a.resp.ok){const c=a.data||{};if(c.protection||c.error&&typeof c.error=="object"&&String(c.error.code)==="401")throw new Error("Vercel Deployment Protection ব্লক করছে — এই deployment URL থেকে admin API চলে না। Production URL (digitearn.vercel.app) ব্যবহার করুন বা Vercel → Settings → Deployment Protection off করুন।");const h=typeof c.error=="string"?c.error:String(c.error&&(c.error.message||c.error.code)||c.message||"");throw new Error(h||(a.isJson?"":`সার্ভার JSON দেয়নি (HTTP ${a.resp.status})`)||`Operation fail হয়েছে (${a.resp.status}) — আবার চেষ্টা করুন`)}return a.data}async function by(){try{return await fe("/api/admin/health",{})}catch(n){const e=String(n&&n.message||n);throw/Unknown admin endpoint|404/i.test(e)?new Error("সার্ভারের build পুরোনো — `?op=health` নেই, মানে নতুন api/ + lib/ এখনো deploy হয়নি। Push করে Vercel-এ Redeploy করুন।"):n}}async function Ay(){try{const n=await fe("/api/admin/verify",{});return{isAdmin:!!n.isAdmin,authenticated:!!n.authenticated,authState:n.authState||"",error:""}}catch(n){return{isAdmin:!1,authenticated:!1,error:String(n&&n.message||"Admin verify fail")}}}async function Ye(n,e={}){const t=await fe("/api/admin/read",{what:n,...e});return Array.isArray(t.items)?t.items:[]}async function hu(n,e={}){const t=await fe("/api/admin/read",{what:n,...e});return t&&t.item?t.item:null}const wt=(n,e={})=>fe("/api/admin/write",{what:n,...e});async function du(n="pending",e=100){return Ye("proofs",{status:n,limit:e})}async function Sy(n){await fe("/api/admin/proof-review",{proofId:n,action:"approve"})}async function fu(n="pending",e=100){return Ye("deposits",{status:n,limit:e})}async function Ry(n){await fe("/api/admin/deposit-review",{depositId:n,action:"approve"})}async function Py(n,e=""){await fe("/api/admin/deposit-review",{depositId:n,action:"reject",note:e})}async function lo(n=300){return Ye("users",{limit:n})}async function br(n){return await hu("user",{id:n})}async function ky(n,e=20){return Ye("user-withdrawals",{uid:n,limit:e})}async function Cy(n,e=25){return Ye("user-transactions",{uid:n,limit:e})}async function ml(n,e){await fe("/api/admin/set-active",{uid:n,active:e})}async function Ny(){return Ye("tasks",{limit:500})}async function pu(n){const e=await fe("/api/admin/read",n?{what:"jobs",kindFilter:n}:{what:"jobs"});return Array.isArray(e.items)?e.items:[]}async function Dy(n){return wt("task-create",{data:n})}async function Oy(n){return wt("task-delete",{slug:n})}async function Ly(n,e,t=""){await fe("/api/admin/proof-review",{proofId:n,action:e,note:t})}async function Vy(){return wt("leaderboard-backfill",{})}async function My(n=[]){return await fe("/api/admin/seed-tasks",{slugs:n})}async function xy(n,e){if(e.url&&!/^https?:\/\/\S+$/i.test(e.url))throw new Error("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)");return wt("task",{slug:n,data:e})}const mu=["giftCode"];async function Uy(){const[n,e]=await Promise.all([hu("settings").catch(()=>null),fe("/api/admin/secret",{get:!0}).catch(()=>({}))]),t={...n||{}};delete t.id;const i={},r=e&&typeof e.giftCode=="string";for(const o of mu)typeof e[o]=="string"&&(i[o]=e[o]);return{...t,...i,_secretLoaded:r}}async function Fy(n="pending",e=100){return Ye("withdrawals",{status:n,limit:e})}async function Ts(n,e,t,i=""){await fe("/api/admin/withdrawal-review",{userId:n,id:e,action:t,note:i})}async function $y(n){const e={...n},t={};for(const r of mu)r in e&&(t[r]=e[r],delete e[r]);await wt("settings",{data:e});const i={...t};for(const r of Object.keys(i))String(i[r]).trim()===""&&!i.__clear&&delete i[r];Object.keys(i).length&&await fe("/api/admin/secret",i)}async function jy(){await fe("/api/admin/secret",{giftCode:"",__clear:!0})}async function By(){return Ye("notices",{limit:100})}async function qy({title:n,body:e,type:t="notice",expiresAt:i=null}){const r={title:String(n||"").trim().slice(0,60),body:String(e||"").trim().slice(0,300),type:t==="warning"?"warning":"notice",targetType:"all",enabled:!0,sort:10,createdAt:lu()};return i&&(r.expiresAt=i),wt("notice-add",r)}async function Hy(n,{title:e,body:t,enabled:i,sort:r,type:o,expiresAt:a}){const c={title:String(e||"").trim().slice(0,60),body:String(t||"").trim().slice(0,300),enabled:!!i,sort:Number(r)||10};return o&&(c.type=o==="warning"?"warning":"notice"),a&&(c.expiresAt=a),wt("notice-update",{id:n,...c})}async function zy(n){return wt("notice-delete",{id:n})}async function Gy(n){return Ye("user-target-notices",{uid:n,limit:50})}async function Wy(n,{title:e,body:t,type:i="warning",expiresAt:r=null}){const o={title:String(e||"").trim().slice(0,60),body:String(t||"").trim().slice(0,300),type:i==="warning"?"warning":"notice",targetType:"user",targetUserId:n,enabled:!0,sort:10,createdAt:lu(),createdBy:"admin"};r&&(o.expiresAt=r),await _y(to(oy(ao,"users",n,"targetNotices")),o)}async function gu(n,e,{enabled:t}){await vy(to(ao,"users",n,"targetNotices",e),{enabled:!!t})}async function yu(n,e){await Ey(to(ao,"users",n,"targetNotices",e))}async function Ky(){return(await fe("/api/admin/notice-targeted",{},"GET")).targeted||[]}async function Qy(){const[n,e,t]=await Promise.all([lo(1e3),du("pending",100),fu("pending",100)]);return{totalUsers:n.length,activeUsers:n.filter(i=>i.isActive).length,pendingProofs:e.length,pendingDeposits:t.length,totalBalance:n.reduce((i,r)=>i+(Number(r.balance)||0),0),recentProofs:e.slice(0,3),recentDeposits:t.slice(0,3)}}const Jy={url:300,email:120,tel:20,number:60,textarea:2e3,text:100,password:100,image:3e5};async function gl(n,{maxSide:e=900,quality:t=.72,maxBytes:i=22e4}={}){if(!n||!/^image\/(png|jpe?g|webp)$/.test(n.type||""))throw new Error("PNG/JPG/WEBP ছবি দিন");if(n.size>8*1024*1024)throw new Error("ছবি 8MB-এর বড় না — ছোট করুন");const r=URL.createObjectURL(n);try{const o=await new Promise((E,R)=>{const N=new Image;N.onload=()=>E(N),N.onerror=()=>R(new Error("ছবি পড়া যায়নি")),N.src=r});let a=o.naturalWidth||o.width||0,c=o.naturalHeight||o.height||0;if(!a||!c)throw new Error("ছবির size বোঝা যায়নি");const h=Math.min(1,e/Math.max(a,c));a=Math.max(1,Math.round(a*h)),c=Math.max(1,Math.round(c*h));const d=document.createElement("canvas");d.width=a,d.height=c,d.getContext("2d").drawImage(o,0,0,a,c);let p="",m=t;for(let E=0;E<6&&(p=d.toDataURL("image/jpeg",m),!(p.length<=i));E++)m-=.12;if(p.length>Jy.image)throw new Error("ছবি ছোট করা যাচ্ছে না — আরেকটা ছবি দিন");return p}finally{URL.revokeObjectURL(r)}}const ni=document.getElementById("app");let co=null;function x(n,e="success"){const t=document.createElement("div");t.className="adm-toast "+e,t.innerHTML=`<i class="fa-solid ${e==="error"?"fa-circle-xmark":"fa-circle-check"}"></i> ${C(n)}`,ni.appendChild(t),requestAnimationFrame(()=>t.classList.add("show")),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3200)}cu||(ni.innerHTML='<div class="loading-center"><p style="max-width:340px;text-align:center">Firebase env variables set নেই।<br>Vercel-এ ৬টা <b>VITE_FIREBASE_*</b> variable দিন।</p></div>');Lf(ti,n=>{if(!n){co=null,uo();return}_u(n)});async function _u(n){const e=await Ay();if(e.error){ni.innerHTML=`<div class="loading-center" style="display:block;text-align:center;padding:28px">
      <p style="margin-bottom:12px">Admin check করা যায়নি:<br><b style="font-size:13px">${C(e.error)}</b></p>
      <button class="adm-btn gold" id="gateRetry"><i class="fa-solid fa-rotate"></i> আবার চেষ্টা করুন</button>
      <p class="muted" style="margin-top:12px;font-size:12px">লগইন ভাঙেনি — শুধু সার্ভার উত্তর দেয়নি।</p></div>`,document.getElementById("gateRetry").addEventListener("click",()=>_u(n));return}if(!e.isAdmin){await Yl(ti),uo("এই email টা admin list-এ নেই — Firestore-এর admins collection-এ এই email-এর document আছে কিনা দেখুন।");return}co={email:n.email},window.location.hash=window.location.hash||"#/overview",Yy(),window.addEventListener("hashchange",vu)}function uo(n=""){ni.innerHTML=`
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-logo"><i class="fa-solid fa-bolt"></i></div>
        <h1>DigitEarn <span>Admin</span></h1>
        <p class="muted">Admin panel-এ লগইন করুন</p>
        ${n?`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${C(n)}</div>`:""}
        <form id="loginForm">
          <input type="email" id="lgEmail" class="adm-input" placeholder="Admin email" required>
          <input type="password" id="lgPass" class="adm-input" placeholder="Password" required>
          <button class="adm-btn gold" type="submit"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
        </form>
      </div>
    </div>`,document.getElementById("loginForm").addEventListener("submit",async e=>{e.preventDefault();const t=e.target.querySelector("button");t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{await Nf(ti,document.getElementById("lgEmail").value.trim(),document.getElementById("lgPass").value)}catch{t.disabled=!1,t.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> Login',uo("Login fail — email/password ঠিক আছে কিনা দেখুন (অথবা এই email-এ Firebase Auth-এ account নেই)।")}})}const Xy=[{id:"overview",label:"Overview",icon:"fa-gauge-high"},{id:"proofs",label:"Submissions",icon:"fa-clipboard-list"},{id:"deposits",label:"Deposits",icon:"fa-money-bill-wave"},{id:"withdrawals",label:"Withdrawals",icon:"fa-money-bill-transfer"},{id:"users",label:"Users",icon:"fa-users"},{id:"microjobs",label:"MicroJobs",icon:"fa-briefcase"},{id:"tasks",label:"টাস্ক (অ্যাকাউন্ট সেল)",icon:"fa-store"},{id:"settings",label:"Settings",icon:"fa-gear"},{id:"notices",label:"Notices",icon:"fa-bullhorn"}];function Yy(){ni.innerHTML=`
    <header class="adm-top">
      <div class="adm-logo"><i class="fa-solid fa-bolt"></i> DigitEarn <span>Admin</span></div>
      <div class="adm-top-right">
        <span class="adm-email"><i class="fa-solid fa-user-shield"></i> ${C(co.email)}</span>
        <button class="adm-btn ghost sm" id="logoutBtn"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
    </header>
    <nav class="adm-nav">${Xy.map(n=>`<a href="#/${n.id}" data-nav="${n.id}"><i class="fa-solid ${n.icon}"></i> ${n.label}</a>`).join("")}</nav>
    <main class="adm-main" id="admMain"><div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div></main>`,document.getElementById("logoutBtn").addEventListener("click",()=>Yl(ti)),vu()}async function vu(){const n=(window.location.hash||"#/overview").replace("#/",""),e=document.getElementById("admMain");if(e){document.querySelectorAll("[data-nav]").forEach(t=>t.classList.toggle("on",t.dataset.nav===n)),e.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';try{n==="proofs"?await Nn(e):n==="deposits"?await ji(e):n==="withdrawals"?await bs(e):n==="users"?await n_(e):n==="tasks"?await Ss(e,"task"):n==="microjobs"?await Ss(e,"microjob"):n==="settings"?await Eu(e):n==="notices"?await zt(e):await Zy(e)}catch(t){const i=String(t&&t.message||t),r=/permission|insufficient/i.test(i);e.innerHTML=`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${C(i)}
      ${r?`<div class="muted" style="font-size:12px;margin-top:8px">
        Panel এখন server (Admin SDK) দিয়ে পড়ে — নিচের ↻ বাটন চাপুন। না চললে দেখুন:
        Firestore-এর <code>admins/&lt;email&gt;</code> doc-id হুবহু আপনার login email
        হতে হবে (বড়/ছোট হাতের তফাতও fail করে), আর Vercel function-এর build
        নতুন কিনা (?op=read থাকতে হবে)।</div>`:""}</div>`}}}async function Zy(n){const e=await Qy();n.innerHTML=`
    <div class="stat-grid">
      <div class="adm-stat gold"><i class="fa-solid fa-users"></i><b>${e.totalUsers}</b><span>মোট ইউজার</span></div>
      <div class="adm-stat green"><i class="fa-solid fa-circle-check"></i><b>${e.activeUsers}</b><span>অ্যাক্টিভ</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-clipboard-list"></i><b>${e.pendingProofs}</b><span>Task Submissions</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-money-bill-wave"></i><b>${e.pendingDeposits}</b><span>Deposit Review</span></div>
    </div>
    <div class="adm-card"><h4><i class="fa-solid fa-scale-balanced" style="color:#d97706"></i> মোট Outstanding Balance</h4>
      <div class="big-num">${Pe(e.totalBalance)}</div>
      <p class="muted">সব ইউজারের ব্যালেন্সের যোগফল (প্রতি ১০০০ ইউজার পর্যন্ত)।</p>
    </div>
    ${e.recentProofs.length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-clipboard-list" style="color:#d97706"></i> সর্বশেষ Pending Submissions</h4>
      ${e.recentProofs.map(t=>`<div class="mini-row"><b>${C(t.taskName||t.taskSlug)}</b> <span class="muted">${Ne(t.createdAt)}</span><span class="badge gold">+${Pe(t.reward)}</span></div>`).join("")}
      <a href="#/proofs" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${e.recentDeposits.length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-money-bill-wave" style="color:#d97706"></i> সর্বশেষ Pending Deposits</h4>
      ${e.recentDeposits.map(t=>`<div class="mini-row"><b>${C(t.method)}</b> <span class="muted">${Ne(t.createdAt)}</span><span class="badge gold">${Pe(t.amount)}</span></div>`).join("")}
      <a href="#/deposits" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${!e.recentProofs.length&&!e.recentDeposits.length?'<p class="muted center-note">কোনো pending item নেই ✓</p>':""}
    <div class="adm-card">
      <h4><i class="fa-solid fa-stethoscope" style="color:#d97706"></i> সিস্টেম চেক (API auth)</h4>
      <p class="muted" style="font-size:13px;margin-bottom:10px">ইউজার যদি “Login required” দেখায় বা approve/reject fail করে, এখানে চাপলে কারণটা দেখাবে — Vercel-এর Firebase env, service account-এর project, আর Firestore পড়া যাচ্ছে কিনা।</p>
      <button class="adm-btn ghost sm" id="healthBtn"><i class="fa-solid fa-heart-pulse"></i> Check করুন</button>
      <div id="healthOut" style="margin-top:10px"></div>
    </div>`,document.getElementById("healthBtn").addEventListener("click",e_)}async function e_(){const n=document.getElementById("healthOut");n&&(n.innerHTML='<span class="muted"><i class="fa-solid fa-spinner fa-spin"></i> চেক হচ্ছে…</span>');let e;try{e=await by()}catch(o){n&&(n.innerHTML=`<div class="form-err">${C(String(o.message||o))}</div>`);return}const t=(o,a,c)=>`<div class="mini-row"><span class="badge ${o?"green":"red"}">${o?"✓":"✗"}</span> ${C(a)}${c?` <span class="muted">${C(c)}</span>`:""}</div>`,i=[t(!!e.ok,"সামগ্রিক",e.ok?"server ঠিক আছে — ইউজারের “Login required” হলে সেটা deployment-এর dosh নয়":"server-side সেটআপে সমস্যা"),t(!!e.firestore&&!!e.firestore.reachable,"Firestore পড়া",e.firestore&&e.firestore.settingsDoc?"settings/site পাওয়া গেছে":"পড়া যাচ্ছে না"),t(!e.sdk||e.sdk.cjsRequireSafe!==!1,"Admin SDK (firebase-admin)",`v${e.sdk&&e.sdk.version||"?"}${e.sdk&&e.sdk.jose?" · jose@"+e.sdk.jose:""}`+(e.sdk&&e.sdk.cjsRequireSafe===!1?" — CJS require() ভাঙে, functions 500 (Node 22.x বা ^13.10.0 pin লাগবে)":"")),t(!!e.privateKeyShape,"Private key ফরম্যাট",""),t(!!e.projectMatch,"Project match",`site: ${e.tokenProject||e.serverProject||"?"} / server: ${e.serverProject||"?"} / SA: ${e.serviceAccountProject||"?"}`),t(!!e.authed,"আপনার token verify",e.authed?"OK":`ব্যর্থ (${C(e.authState||"")} ${C(e.authCode||"")})`)].join(""),r=(e.notes||[]).map(o=>`<p class="muted" style="font-size:12px;margin-top:6px"><i class="fa-solid fa-circle-info"></i> ${C(o)}</p>`).join("");n&&(n.innerHTML=i+r)}let ki="pending";function t_(n,e){const t=[];if(Array.isArray(e)&&e.length)for(const o of e){if(!o||typeof o!="object")continue;const a=String(o.label||"").slice(0,50)||"Field",c=String(o.type||"text"),h=o.value===void 0||o.value===null||o.value===""?"":String(o.value);t.push({label:a,type:c,value:h,required:!!o.required,secret:o.secret===!0})}else if(n&&typeof n=="object"&&!Array.isArray(n))for(const[o,a]of Object.entries(n))t.push({label:o,type:"text",value:String(a!=null?a:""),required:!1});if(!t.length)return"";const i=t.map(o=>{const a=/(password|passwd|pwd|passcode|otp|onetimecode|2fa|tfa|twofactor|authenticat|recovery|backupcode|secret|apikey|accesstoken|refreshtoken|privatetoken|privatekey|token|cookie|session|bearer)/,c=E=>String(E||"").toLowerCase().replace(/[^a-z0-9]/g,""),h=!!o.value&&(o.type==="password"||o.secret||a.test(c(o.label))),d=h?"•".repeat(Math.min(o.value.length,14)):o.value||"—",p=h?`<button type="button" class="adm-btn ghost sm" data-reveal data-raw="${C(o.value)}" style="margin-left:6px"><i class="fa-solid fa-eye"></i> দেখুন</button>`:"",m=[h?"sub-secret":"",o.type==="textarea"?"sub-multi":""].filter(Boolean).join(" ");return`<div class="sub-row"><span class="muted">${C(o.label)}:</span><b${m?` class="${m}"`:""}>${C(d)}</b>${p}${!o.value&&o.required?' <span class="muted">(required খালি)</span>':""}</div>`}).join(""),r=t.map(o=>`${o.label}: ${o.value}`).join(`
`);return`<div class="sub-fields">${i}</div>
    <button type="button" class="adm-btn ghost sm" data-copyall data-all="${C(r)}" style="margin-top:6px"><i class="fa-solid fa-clipboard"></i> Copy All Data</button>`}let Ci="";async function Nn(n){n.innerHTML=`
    <div class="chip-row" id="proofKindChips">
      ${[["","সব"],["microjob","মাইক্রো জব"],["task","টাস্ক (সেল)"]].map(([m,E])=>`<button class="chip ${Ci===m?"on":""}" data-pk="${m}">${E}</button>`).join("")}
    </div>
    <div class="chip-row" id="proofChips">
      ${["pending","approved","rejected","all"].map(m=>`<button class="chip ${m===ki?"on":""}" data-pf="${m}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[m]}</button>`).join("")}
    </div>
    <div id="proofList"></div>`,document.getElementById("proofChips").addEventListener("click",m=>{const E=m.target.closest("[data-pf]");E&&(ki=E.dataset.pf,document.querySelectorAll("[data-pf]").forEach(R=>R.classList.toggle("on",R.dataset.pf===ki)),Nn(n))}),document.getElementById("proofKindChips").addEventListener("click",m=>{const E=m.target.closest("[data-pk]");E&&(Ci=E.dataset.pk||"",Nn(n))});const e=await du(ki),t=Ci?e.filter(m=>(m.kind==="microjob"?"microjob":"task")===Ci):e,i=document.getElementById("proofList");if(!t.length){i.innerHTML='<p class="muted center-note">কোনো submission নেই।</p>';return}const r=await Promise.all(t.map(async m=>({p:m,user:m.user||await br(m.userId).catch(()=>null)}))),o=await pu().catch(()=>[]),a=m=>o.find(E=>E.slug===m)||null,c=({p:m,user:E})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${C((E==null?void 0:E.name)||m.username||"—")}</b><span class="muted">${C((E==null?void 0:E.email)||m.userEmail||"")}</span></div>
        <span class="badge ${m.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[m.status]||m.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-user"></i> UID: ${C(m.userId)}${E!=null&&E.mobile?` • ${C(E.mobile)}`:""}</div>
      <div class="ai-meta"><i class="fa-solid fa-briefcase"></i> ${C(m.taskName||m.taskSlug)} • <b class="gold-txt">${Pe(m.reward)}</b> • ${Ne(m.createdAt)}</div>
      ${t_(m.submittedData,m.submittedFields)}
      ${(m.images||[]).length?`<div class="thumb-row">${m.images.map(R=>`<a href="${C(R)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${C(R)}" loading="lazy" alt="proof"></a>`).join("")}</div>`:""}
      ${m.status==="rejected"&&m.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${C(m.note)}</p>`:""}
      ${m.status!=="pending"&&m.reviewedAt?`<p class="ai-meta muted-sm">reviewed ${Ne(m.reviewedAt)}${m.approvedBy?" by "+C(m.approvedBy):""}${m.rejectedBy?" by "+C(m.rejectedBy):""}</p>`:""}
      ${m.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-approve="${m.id}"><i class="fa-solid fa-check"></i> Approve +${Pe(m.reward)}</button>
        <button class="adm-btn red sm" data-rresub="${m.id}"><i class="fa-solid fa-rotate-left"></i> Reject & Allow Resubmit</button>
        <button class="adm-btn ghost sm" data-rhide="${m.id}"><i class="fa-solid fa-eye-slash"></i> Reject & Hide</button>
      </div>`:m.status==="rejected"?`<p class="ai-note"><i class="fa-solid fa-${m.hiddenForUser?"eye-slash":"rotate-left"}"></i> ${m.hiddenForUser?"Reject & Hide — jobটা শুধু এই user-এর list থেকে লুকানো":"Reject & Allow Resubmit — user আবার submit করতে পারবে"}</p>`:""}
    </div>`,h=new Map;for(const m of r){const E=String(m.p.taskSlug||"(unknown)");h.has(E)||h.set(E,[]),h.get(E).push(m)}const d=[...h.entries()].sort((m,E)=>E[1].length-m[1].length||String(m[0]).localeCompare(String(E[0])));i.innerHTML=d.map(([m,E])=>{const R=a(m),N=R&&Number(R.requiredUsers)||0;return`<div class="adm-card mj-jobhead">
      <b><i class="fa-solid fa-briefcase" style="color:#d97706"></i> ${C(E[0].p.taskName||m)}</b>
      <span class="muted" style="margin-left:6px">${C(m)}</span>
      <div class="mj-statline">
        <span><i class="fa-solid fa-users"></i> Required <b>${N||"∞"}</b></span>
        <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${R&&Number(R.approvedCount)||0}</b></span>
        <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${R?Number(R.pending)||0:E.filter(L=>L.p.status==="pending").length}</b></span>
        <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${R&&Number(R.rejected)||0}</b></span>
        <span><i class="fa-solid fa-user-plus"></i> Remaining <b>${R&&R.remaining!==null&&R.remaining!==void 0?R.remaining:"∞"}</b></span>
        ${R&&(R.full||R.closed)?'<span class="badge red">FULL/CLOSED</span>':""}
      </div>
      <p class="muted" style="font-size:12px;margin:6px 0 0">approve করলে-ই ওই user-এর list থেকে job লুকিয়ে যাবে; Required Users শেষ হলে job স্বয়ংক্রিয়ভাবে FULL হবে (তখন আর approve হয় না)।</p>
    </div>`+E.map(c).join("")}).join(""),i.querySelectorAll("[data-approve]").forEach(m=>m.addEventListener("click",async()=>{m.disabled=!0;try{await Sy(m.dataset.approve),x("Proof approve — reward balance-এ যোগ হয়েছে"),Nn(n)}catch(E){x(E.message,"error"),m.disabled=!1}})),i.querySelectorAll("[data-reveal]").forEach(m=>m.addEventListener("click",()=>{const E=m.previousElementSibling;if(!E)return;const R=m.dataset.on==="1";E.textContent=R?"•".repeat(Math.min(String(m.dataset.raw).length,14)):m.dataset.raw,m.innerHTML=R?'<i class="fa-solid fa-eye"></i> দেখুন':'<i class="fa-solid fa-eye-slash"></i> লুকান',m.dataset.on=R?"":"1"})),i.querySelectorAll("[data-copyall]").forEach(m=>m.addEventListener("click",async()=>{const E=m.dataset.all||"";try{await navigator.clipboard.writeText(E),x("সব field data copy হয়েছে")}catch{prompt("Copy করুন:",E)}}));const p=async(m,E,R)=>{const N=prompt("Reject reason (user দেখবে):")||"";try{await Ly(m,E,N),x(R),Nn(n)}catch(U){x(U.message,"error")}};i.querySelectorAll("[data-rresub]").forEach(m=>m.addEventListener("click",()=>p(m.dataset.rresub,"reject_resubmit","Reject — user ঠিক করে আবার submit করতে পারবে"))),i.querySelectorAll("[data-rhide]").forEach(m=>m.addEventListener("click",()=>{confirm("Jobটা শুধু এই user-এর list থেকে লুকানো হবে (admin list-এ থাকবে)। ঠিক আছে?")&&p(m.dataset.rhide,"reject_hide","Reject + Hide — এই user-এর MicroJobs list থেকে বাদ")})),i.querySelectorAll("[data-reject]").forEach(m=>m.addEventListener("click",()=>p(m.dataset.reject,"reject_resubmit","Proof reject করা হয়েছে")))}let Ni="pending";async function ji(n){n.innerHTML=`
    <div class="chip-row" id="depChips">
      ${["pending","approved","rejected","all"].map(r=>`<button class="chip ${r===Ni?"on":""}" data-df="${r}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[r]}</button>`).join("")}
    </div>
    <div id="depList"></div>`,document.getElementById("depChips").addEventListener("click",r=>{const o=r.target.closest("[data-df]");o&&(Ni=o.dataset.df,document.querySelectorAll("[data-df]").forEach(a=>a.classList.toggle("on",a.dataset.df===Ni)),ji(n))});const e=await fu(Ni),t=document.getElementById("depList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো deposit নেই।</p>';return}const i=await Promise.all(e.map(async r=>({d:r,user:r.user||await br(r.userId).catch(()=>null)})));t.innerHTML=i.map(({d:r,user:o})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${C((o==null?void 0:o.name)||r.userId)}</b><span class="muted">${C((o==null?void 0:o.mobile)||"")}</span></div>
        <span class="badge ${r.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[r.status]||r.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-wave"></i> ${C(r.method)} • <b class="gold-txt">${Pe(r.amount)}</b> • TrxID: <b>${C(r.trxId)}</b>${r.senderNumber?` • Sender: <b>${C(r.senderNumber)}</b>`:""}</div>
      <div class="ai-meta muted-sm">${Ne(r.createdAt)}${r.status!=="pending"&&r.reviewedAt?" • reviewed "+Ne(r.reviewedAt):""}</div>
      ${r.image?`<div class="thumb-row"><a href="${C(r.image)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${C(r.image)}" loading="lazy" alt="payment proof"></a></div>`:""}
      ${r.status==="rejected"&&r.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${C(r.note)}</p>`:""}
      ${r.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-dapprove="${r.id}"><i class="fa-solid fa-check"></i> Approve — Account Active</button>
        <button class="adm-btn red sm" data-dreject="${r.id}"><i class="fa-solid fa-xmark"></i> Reject</button>
      </div>`:""}
    </div>`).join(""),t.querySelectorAll("[data-dapprove]").forEach(r=>r.addEventListener("click",async()=>{if(confirm("Approve করলে account ACTIVE হবে + activation bonus যোগ হবে। নিশ্চিত?")){r.disabled=!0;try{await Ry(r.dataset.dapprove),x("Deposit approve — account active + bonus"),ji(n)}catch(o){x(o.message,"error"),r.disabled=!1}}})),t.querySelectorAll("[data-dreject]").forEach(r=>r.addEventListener("click",async()=>{const o=prompt("Reject reason (user দেখবে):")||"";try{await Py(r.dataset.dreject,o),x("Deposit reject করা হয়েছে"),ji(n)}catch(a){x(a.message,"error")}}))}let Di="pending";async function bs(n){n.innerHTML=`
    <div class="chip-row" id="wdChips">
      ${["pending","paid","rejected","all"].map(o=>`<button class="chip ${o===Di?"on":""}" data-wf="${o}">${{pending:"Pending",paid:"Paid",rejected:"Rejected",all:"সব"}[o]}</button>`).join("")}
    </div>
    <div id="wdList"></div>`,document.getElementById("wdChips").addEventListener("click",o=>{const a=o.target.closest("[data-wf]");a&&(Di=a.dataset.wf,document.querySelectorAll("[data-wf]").forEach(c=>c.classList.toggle("on",c.dataset.wf===Di)),bs(n))});const e=await Fy(Di),t=document.getElementById("wdList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো withdrawal নেই। (পুরনো pending request Users tab-এ user-এর detail-এ দেখাবে)</p>';return}const i=await Promise.all(e.map(async o=>({w:o,user:o.user||await br(o.userId).catch(()=>null)})));t.innerHTML=i.map(({w:o,user:a})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${C((a==null?void 0:a.name)||o.name||o.userId)}</b><span class="muted">${C((a==null?void 0:a.mobile)||"")}</span></div>
        <span class="badge ${o.status==="paid"?"green":o.status}">${{pending:"PENDING",paid:"PAID",rejected:"REJECTED"}[o.status]||o.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-transfer"></i> ${C(o.method)} • <b class="gold-txt">${Pe(o.amount)}</b> • ${C(o.accountNumber)}</div>
      <div class="ai-meta muted-sm">${Ne(o.createdAt)}${o.processedAt?" • processed "+Ne(o.processedAt):""}</div>
      ${o.status==="rejected"&&o.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${C(o.note)}</p>`:""}
      ${o.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-wpaid="${o.id}"><i class="fa-solid fa-check"></i> Paid (টাকা পাঠানো হয়েছে)</button>
        <button class="adm-btn red sm" data-wrej="${o.id}"><i class="fa-solid fa-xmark"></i> Reject (টাকা ফেরত)</button>
      </div>`:""}
    </div>`).join("");const r=async(o,a)=>{if(!(a==="paid"&&!confirm("এটা Paid মার্ক করবেন? (টাকা send করে ফেলেছেন মানে)"))&&!(a==="rejected"&&!confirm("Reject করলে amount user-এর balance-এ ফেরত যাবে। নিশ্চিত?"))){o.disabled=!0;try{const c=e.find(h=>h.id===o.dataset[a==="paid"?"wpaid":"wrej"]);await Ts(c.userId,c.id,a),x(a==="paid"?"Withdrawal paid মার্ক হয়েছে":"Withdrawal reject — টাকা ফেরত হয়েছে"),bs(n)}catch(c){x(c.message,"error"),o.disabled=!1}}};t.querySelectorAll("[data-wpaid]").forEach(o=>o.addEventListener("click",()=>r(o,"paid"))),t.querySelectorAll("[data-wrej]").forEach(o=>o.addEventListener("click",()=>r(o,"rejected")))}let rs="",Le=null;async function n_(n){n.innerHTML=`
    <input type="search" id="userSearch" class="adm-input" placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." value="${C(rs)}">
    <div id="userList" class="user-list"></div>
    <div id="userDetail"></div>`;const e=async()=>{const i=await lo(300),r=rs.trim().toLowerCase(),o=r?i.filter(c=>(c.name||"").toLowerCase().includes(r)||String(c.mobile||"").includes(r)):i,a=document.getElementById("userList");a.innerHTML=o.slice(0,100).map(c=>`
      <div class="user-row ${c.uid===Le?"on":""}" data-uid="${c.uid}">
        <div class="ur-avatar">${C((c.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${C(c.name||"—")}</b><span class="muted">${C(c.mobile||"")}</span></div>
        <div class="ur-right"><b class="gold-txt">${Pe(c.balance)}</b>${c.isActive?'<span class="badge green">ACTIVE</span>':'<span class="badge gray">INACTIVE</span>'}</div>
      </div>`).join("")||'<p class="muted center-note">কোনো ইউজার পাওয়া যায়নি।</p>',a.querySelectorAll("[data-uid]").forEach(c=>c.addEventListener("click",()=>{Le=c.dataset.uid,e(),t()})),t()},t=async()=>{const i=document.getElementById("userDetail");if(!Le){i.innerHTML="";return}i.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';const[r,o,a,c]=await Promise.all([br(Le),Cy(Le),ky(Le,10),Gy(Le).catch(()=>[])]);if(!r){i.innerHTML="";return}i.innerHTML=`
      <div class="adm-card detail-card">
        <h4><i class="fa-solid fa-user" style="color:#d97706"></i> ${C(r.name||"User")} <span class="muted" style="font-weight:500">• ${C(r.mobile||"")}</span></h4>
        <div class="detail-grid">
          <div><span class="muted">Balance</span><b>${Pe(r.balance)}</b></div>
          <div><span class="muted">Total Earned</span><b>${Pe(r.totalEarned)}</b></div>
          <div><span class="muted">Status</span>${r.isActive?'<b style="color:#16a34a">ACTIVE</b>':'<b style="color:#dc2626">INACTIVE</b>'}</div>
          <div><span class="muted">Joined</span><b>${Ne(r.createdAt)}</b></div>
        </div>
        <div class="ai-actions">
          ${r.isActive?`<button class="adm-btn red sm" data-deact="${r.uid}"><i class="fa-solid fa-ban"></i> Inactive করুন</button>`:`<button class="adm-btn green sm" data-act="${r.uid}"><i class="fa-solid fa-check"></i> Active করুন (manual)</button>`}
        </div>
        <h4 style="margin-top:14px"><i class="fa-solid fa-money-bill-transfer" style="color:#d97706"></i> Withdrawals</h4>
        ${a.length?a.map(p=>`<div class="mini-row">
          <b>${C(p.method)} • ${Pe(p.amount)}</b>
          <span class="muted">${C(p.accountNumber)} • ${Ne(p.createdAt)}</span>
          <span class="badge ${p.status==="paid"?"green":p.status}">${p.status.toUpperCase()}</span>
          ${p.status==="pending"?`<button class="adm-btn green sm" style="margin-left:6px" data-wd-paid="${p.id}">Paid</button><button class="adm-btn red sm" style="margin-left:4px" data-wd-rej="${p.id}">Reject</button>`:""}
        </div>`).join(""):'<p class="muted">কোনো withdrawal নেই।</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> এই user-এর private Notice/Warning</h4>
        ${c.length?c.map(p=>`<div class="mini-row">
          <b>${p.type==="warning"?"⚠️ ":""}${C(p.title||"")} ${p.enabled?"":'<span class="badge gray">OFF</span>'}</b>
          <span class="muted">${C(p.body||"")}</span>
          <span><button class="adm-btn ghost sm" style="margin-left:6px" data-tn-tgl="${p.id}">${p.enabled?"Hide":"Show"}</button><button class="adm-btn red sm" style="margin-left:4px" data-tn-del="${p.id}">Del</button></span>
        </div>`).join(""):'<p class="muted">কোনো private notice/warning নেই। (Notices tab থেকে পাঠান)</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-receipt" style="color:#d97706"></i> Recent Transactions</h4>
        ${o.length?o.map(p=>`<div class="mini-row"><b>${C(p.note||p.type)}</b><span class="muted">${Ne(p.createdAt)}</span><span class="badge ${Number(p.amount)>=0?"green":"gray"}">${Number(p.amount)>=0?"+":""}${Pe(p.amount)}</span></div>`).join(""):'<p class="muted">কোনো transaction নেই।</p>'}
      </div>`;const h=i.querySelector("[data-act]");h&&h.addEventListener("click",async()=>{try{await ml(h.dataset.act,!0),x("User active করা হয়েছে"),e()}catch(p){x(p.message,"error")}});const d=i.querySelector("[data-deact]");d&&d.addEventListener("click",async()=>{if(confirm("User-কে inactive করবেন?"))try{await ml(d.dataset.deact,!1),x("User inactive করা হয়েছে"),e()}catch(p){x(p.message,"error")}}),i.querySelectorAll("[data-wd-paid]").forEach(p=>p.addEventListener("click",async()=>{if(confirm("Paid মার্ক করবেন?")){p.disabled=!0;try{await Ts(Le,p.dataset.wdPaid,"paid"),x("Paid মার্ক হয়েছে"),t()}catch(m){x(m.message,"error"),p.disabled=!1}}})),i.querySelectorAll("[data-wd-rej]").forEach(p=>p.addEventListener("click",async()=>{if(confirm("Reject করলে টাকা user-এর balance-এ ফেরত যাবে। নিশ্চিত?")){p.disabled=!0;try{await Ts(Le,p.dataset.wdRej,"rejected"),x("Reject — টাকা ফেরত"),t()}catch(m){x(m.message,"error"),p.disabled=!1}}})),i.querySelectorAll("[data-tn-tgl]").forEach(p=>p.addEventListener("click",async()=>{const m=c.find(E=>E.id===p.dataset.tnTgl);try{await gu(Le,m.id,{enabled:!m.enabled}),x("Notice toggle"),t()}catch(E){x(E.message,"error")}})),i.querySelectorAll("[data-tn-del]").forEach(p=>p.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await yu(Le,p.dataset.tnDel),x("Notice delete"),t()}catch(m){x(m.message,"error")}}))};document.getElementById("userSearch").addEventListener("input",i=>{rs=i.target.value,e()}),await e()}const i_=["text","email","password","tel","number","url","textarea","image"];function As(n={}){return`<div class="if-row" data-if-row>
    <input class="adm-input if-label" placeholder="Field Title (যেমন: UID, Password, Cookies)" value="${C(n.label||"")}" maxlength="50">
    <select class="adm-input if-type">${i_.map(e=>`<option value="${e}" ${n.type===e?"selected":""}>${e}</option>`).join("")}</select>
    <input class="adm-input if-ph" placeholder="Placeholder (খালি রাখলে default)" value="${C(n.placeholder||"")}" maxlength="60">
    <label class="chk if-req"><input type="checkbox" data-ifreq ${n.required?"checked":""}> Required</label>
    <button type="button" class="adm-btn red sm if-del" data-ifdel><i class="fa-solid fa-trash"></i></button>
  </div>`}function r_(n){return`
    <div class="if-editor">
      <div class="if-head">
        <label>Input Fields — user task page-এ এই field গুলো পূরণ করে submit করবে</label>
        <button type="button" class="adm-btn ghost sm" data-ifadd><i class="fa-solid fa-plus"></i> Add Input Field</button>
      </div>
      <div class="if-rows" data-ifrows>${(Array.isArray(n.inputFields)?n.inputFields:[]).map(As).join("")||'<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>'}</div>
    </div>`}async function Ss(n,e){var N,U,L,K,W;e=e==="microjob"?"microjob":"task";const t=e==="microjob",i=()=>Ss(n,e),[r,o]=await Promise.all([Ny(),pu(e).catch(()=>[])]),a=(r||[]).filter(S=>((S&&S.kind)==="microjob"?"microjob":"task")===e),c=S=>o.find(O=>O.slug===S)||null,h=`
    <div class="adm-card" id="mjCreateCard">
      <h4 style="margin:0 0 4px"><i class="fa-solid fa-plus" style="color:#d97706"></i> নতুন MicroJob তৈরি করুন</h4>
      <p class="muted" style="font-size:12.5px;margin:0 0 10px">প্রতিটা জব আলাদা পোস্ট — ছবি, টাইটেল, সংক্ষিপ্ত বিবরণ, নিয়ম, লিংক, ভিডিও, কতজন দরকার, রেয়ার্ড আর কী জমা দিতে হবে সব নিজে ঠিক করুন। Required Users পূরণ হলে জব স্বয়ংক্রিয়ভাবে FULL/CLOSED হবে।</p>
      <div class="two-col">
        <div><label>Job Title *</label><input class="adm-input" data-nc="nameBn" maxlength="60" placeholder="যেমন: ভিডিওতে like + comment"></div>
        <div><label>Slug (খালি রাখলে বানিয়ে নেওয়া হবে)</label><input class="adm-input" data-nc="slug" maxlength="50" placeholder="like-comment-video"></div>
      </div>
      <div class="two-col">
        <div><label>Reward / প্রতি user (৳)</label><input type="number" step="0.5" min="0" class="adm-input" data-nc="reward" value="1"></div>
        <div><label>Required Users *</label><input type="number" min="1" max="1000000" class="adm-input" data-nc="requiredUsers" value="100"></div>
      </div>
      <label>Short Description</label><input class="adm-input" data-nc="shortDesc" maxlength="200" placeholder="কার্ডে দেখানো এক লাইন">
      <label>Main Job Link (https://…)</label><input class="adm-input" data-nc="url" maxlength="300" placeholder="https://">
      <label>Tutorial Video Link (optional)</label><input class="adm-input" data-nc="videoUrl" maxlength="300" placeholder="https://youtu.be/…">
      <label>Job Image</label>
      <div class="img-pick">
        <input type="hidden" data-nc="image" id="mjNewImage">
        <input type="file" accept="image/png,image/jpeg,image/webp" id="mjNewImageFile" hidden>
        <button type="button" class="adm-btn ghost sm" id="mjNewImageBtn"><i class="fa-solid fa-image"></i> ছবি আপলোড</button>
        <div class="img-prev" id="mjNewImagePrev" hidden><img alt="preview" id="mjNewImageImg"></div>
      </div>
      <label>কাজের নিয়ম (এক লাইনে একটা করে ধাপ)</label>
      <textarea class="adm-input" data-nc="steps" rows="3" placeholder="লিংক ওপেন করুন&#10;লাইক + কমেন্ট দিন&#10;স্ক্রিনশটসহ submit করুন"></textarea>
      <div class="two-col">
        <div><label>Sort order</label><input type="number" class="adm-input" data-nc="sort" value="100"></div>
        <label class="chk" style="align-self:flex-end;margin-bottom:8px"><input type="checkbox" data-nc="enabled" checked> সাথে সাথেই Active</label>
      </div>
      <details style="margin:10px 0 4px"><summary class="muted" style="font-size:12.5px;cursor:pointer">Submission fields (user কী কী জমা দেবে)</summary>
        <div class="if-rows" id="mjNewFields"></div>
        <button type="button" class="adm-btn ghost sm" id="mjNewFieldAdd" style="margin-top:8px"><i class="fa-solid fa-plus"></i> Field যোগ করুন</button>
      </details>
      <div class="ai-actions">
        <button type="button" class="adm-btn gold sm" id="mjCreateBtn"><i class="fa-solid fa-paper-plane"></i> Job তৈরি করুন</button>
      </div>
    </div>`,d=`
    <div class="adm-card" style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div style="flex:1 1 260px"><b>Built-in list থেকে task doc তৈরি করুন</b><br>
        <span class="muted">${a.length?"যেগুলোর doc নেই শুধু সেটুকুই বানাবে — আগে থেকে যা আছে (rate, fields, lock) অক্ষত থাকবে।":"Firestore-এ কোনো task config নেই — একারণেই user submit করলে “Project পাওয়া যায়নি” আসছে। নিচের বাটন চাপলেই ঠিক হয়ে যাবে।"}</span></div>
      <button class="adm-btn gold sm" id="seedTasksBtn"><i class="fa-solid fa-database"></i> ${a.length?"বাকিগুলো তৈরি করুন":"এখনই তৈরি করুন"}</button>
    </div>`;n.innerHTML=`
    <div class="adm-card task-head"><h4>${t?'<i class="fa-solid fa-briefcase" style="color:#d97706"></i> MicroJobs — আলাদা সিস্টেম':'<i class="fa-solid fa-store" style="color:#d97706"></i> টাস্ক (অ্যাকাউন্ট সেল)'}</h4>
    <p class="muted">${t?"এখান থেকে বানানো প্রতিটা জব user-এর “মাইক্রো জব” পেজে আলাদা পোস্ট/কার্ড হিসেবে দেখাবে — ৫টা বানালে ৫টা কার্ড, কিছুই hardcode নয়। Reward, ছবি, নিয়ম, লিংক, ভিডিও, কতজন দরকার, জমার ফিল্ড — সব এখান থেকেই। Required Users শেষ হলে জব স্বয়ংক্রিয়ভাবে FULL/CLOSED।":"পুরোনো সিস্টেম (ফেসবুক/জিমাইল/ইন্সট্রাগ্রাম সেল) — এগুলো মাইক্রো জব পেজে আসে না। Reward, link, password, description, input fields, lock/status, video এখান থেকেই; Save করলেই user website update হয়ে যাবে।"}</p></div>
    ${t?h:""}
    ${t?"":d}
    <div id="taskList">${a.map(S=>`
      <div class="adm-card task-card" data-slug="${C(S.slug)}">
        <div class="task-row">
          <div class="task-info">
            <b>${C(S.nameBn||S.slug)} ${S.enabled===!1?'<span class="badge gray">OFF</span>':""} ${S.locked?'<span class="badge gold">LOCKED</span>':""}</b>
            <span class="muted">${t?`/microjobs.html#job-${C(S.slug)}`:`/task/${C(S.slug)}.html`} • ${Pe(S.reward)}${Array.isArray(S.inputFields)&&S.inputFields.length?` • ${S.inputFields.length} field(s)`:""}</span>
            ${(()=>{const O=c(S.slug);return O?`<div class="mj-statline">
                <span><i class="fa-solid fa-users"></i> Required <b>${Number(O.requiredUsers)||0||"∞"}</b></span>
                <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${Number(O.approvedCount)||0}</b></span>
                <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${Number(O.pending)||0}</b></span>
                <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${Number(O.rejected)||0}</b></span>
                <span><i class="fa-solid fa-user-plus"></i> বাকি <b>${O.remaining===null||O.remaining===void 0?"∞":O.remaining}</b></span>
                ${O.full||O.closed?'<span class="badge red">FULL/CLOSED</span>':""}
                ${O.mode==="single"?'<span class="badge gray">১ user = ১ submit</span>':'<span class="badge gray">marketplace</span>'}
              </div>`:""})()}
          </div>
          <button class="adm-btn ghost sm" data-edit="${C(S.slug)}"><i class="fa-solid fa-pen"></i></button>
          <button class="adm-btn red sm" data-del="${C(S.slug)}" title="Doc মুছে ফেলুন"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="task-form" data-form="${C(S.slug)}" hidden>
          <label>নাম (বাংলা)</label><input class="adm-input" data-f="nameBn" value="${C(S.nameBn||"")}">
          <label>Task URL (user-এর জন্য Open Link) — শুধু http/https</label><input class="adm-input" data-f="url" value="${C(S.url||"")}" placeholder="https://...">
          <div class="two-col">
            <div><label>Amount / Reward (৳)</label><input type="number" step="0.5" class="adm-input" data-f="reward" value="${Number(S.reward)||0}"></div>
            <div><label>Sort order</label><input type="number" class="adm-input" data-f="sort" value="${Number(S.sort)||10}"></div>
          </div>
          <div class="two-col">
            <div><label>Required Users (০ = unlimited)</label><input type="number" min="0" max="1000000" class="adm-input" data-f="requiredUsers" value="${Number(S.requiredUsers)||0}">
              <p class="muted" style="font-size:11.5px;margin:4px 0 0">এই সংখ্যক approved user হলে job স্বয়ংক্রিয়ভাবে FULL/CLOSED হবে (পুরোনো marketplace job-এর জন্য ০ রাখুন)</p></div>
            <div><label>Submission mode</label>
              <select class="adm-input" data-f="mode">
                ${(()=>{const O=S.mode||((Number(S.requiredUsers)||0)>0?"single":"marketplace");return`<option value="single" ${O==="single"?"selected":""}>MicroJob — এক user একবার</option>
                <option value="marketplace" ${O==="marketplace"?"selected":""}>Marketplace — দিনে একাধিক (account sell)</option>`})()}
              </select></div>
          </div>
          <label>Job Image (card/post-এর ছবি)</label>
          <div class="img-pick">
            <input type="hidden" class="adm-input" data-f="image" value="${C(S.image||"")}">
            <input type="file" accept="image/png,image/jpeg,image/webp" data-imgfile="${C(S.slug)}" hidden>
            <button type="button" class="adm-btn ghost sm" data-imgbtn="${C(S.slug)}"><i class="fa-solid fa-image"></i> ছবি আপলোড</button>
            <input class="adm-input" data-imgurl value="${C(/^https?:/.test(String(S.image||""))?S.image:"")}" placeholder="অথবা image URL (https://…)">
            <div class="img-prev" data-imgprev="${C(S.slug)}" ${/^data:image/.test(String(S.image||""))||/^https?:/.test(String(S.image||""))?"":"hidden"}>
              <img src="${C(S.image||"")}" alt="preview"><button type="button" class="adm-btn red sm" data-imgclear="${C(S.slug)}">Clear</button>
            </div>
          </div>
          <label>Short Description (card-এর এক লাইন)</label>
          <input class="adm-input" data-f="shortDesc" value="${C(S.shortDesc||"")}" maxlength="200" placeholder="যেমন: ভিডিওতে like + comment করুন">
          <label>Account Password (seller যে পাসওয়ার্ড সেট করবে — খালি রাখলে hide)</label><input class="adm-input" data-f="password" value="${C(S.password||"")}" maxlength="60">
          <label>Description / Instructions (project page-এ description)</label><textarea class="adm-input" data-f="description" rows="3" maxlength="300">${C(S.description||"")}</textarea>
          <div class="two-col">
            <div><label>Submit বাটনের লেখা</label><input class="adm-input" data-f="submitLabel" value="${C(S.submitLabel||"")}" placeholder="SUBMIT GMAIL" maxlength="40"></div>
            <div><label>History বাটনের লেখা</label><input class="adm-input" data-f="historyLabel" value="${C(S.historyLabel||"")}" placeholder="View Gmail History" maxlength="40"></div>
          </div>
          <label>দৈনিক সর্বোচ্চ কয়টি account জমা দেওয়া যাবে (per seller)</label><input type="number" min="1" max="200" class="adm-input" data-f="dailyLimit" value="${Number(S.dailyLimit)||20}">
          ${r_(S)}
          <label>Video URL (YouTube link বা mp4) — task page-এ guide video</label><input class="adm-input" data-f="videoUrl" value="${C(S.videoUrl||"")}">
          <div class="two-col">
            <label class="chk"><input type="checkbox" data-f="enabled" ${S.enabled!==!1?"checked":""}> Task ON / Active</label>
            <label class="chk"><input type="checkbox" data-f="locked" ${S.locked?"checked":""}> Locked</label>
          </div>
          <div class="ai-actions">
            <button class="adm-btn gold sm" data-save="${C(S.slug)}"><i class="fa-solid fa-floppy-disk"></i> Save</button>
          </div>
        </div>
      </div>`).join("")}</div>`,n.querySelectorAll("[data-ifadd]").forEach(S=>S.addEventListener("click",()=>{var B;const O=S.closest(".if-editor").querySelector("[data-ifrows]");(B=O.querySelector(".if-empty"))==null||B.remove();const V=document.createElement("div");V.innerHTML=As(),O.appendChild(V.firstElementChild)})),n.querySelectorAll("[data-ifdel]").forEach(S=>S.addEventListener("click",()=>{S.closest("[data-if-row]").remove();const O=S.closest("[data-ifrows]");O.querySelector("[data-if-row]")||(O.innerHTML='<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>')})),n.querySelectorAll("[data-edit]").forEach(S=>S.addEventListener("click",()=>{const V=S.closest(".task-card").querySelector("[data-form]");V.hidden=!V.hidden})),n.querySelectorAll("[data-del]").forEach(S=>S.addEventListener("click",async()=>{const O=S.dataset.del;if(confirm(`“${O}” মুছে ফেলবেন? user-এর পেজ থেকে এই job-এর card উঠে যাবে (জমা দেওয়া হিস্ট্রি থাকবে)।`)){S.disabled=!0;try{await Oy(O),x(`মুছে ফেলা হয়েছে: ${O}`),i()}catch(V){x(V.message,"error"),S.disabled=!1}}})),(N=n.querySelector("#seedTasksBtn"))==null||N.addEventListener("click",async S=>{const O=S.currentTarget;O.disabled=!0;try{const V=await My();x(`তৈরি হয়েছে ${V.createdCount||0}টা, আগে থেকেই ছিল ${V.skippedCount||0}টা${V.invalid&&V.invalid.length?" · কিছু হয়নি: "+V.invalid.join(", "):""}`),i()}catch(V){x(V.message,"error"),O.disabled=!1}});const p=document.getElementById("mjNewImage"),m=document.getElementById("mjNewImagePrev"),E=S=>{if(p&&(p.value=S||"",m)){const O=document.getElementById("mjNewImageImg");O&&(O.src=S),m.hidden=!S}};(U=document.getElementById("mjNewImageBtn"))==null||U.addEventListener("click",()=>{var S;return(S=document.getElementById("mjNewImageFile"))==null?void 0:S.click()}),(L=document.getElementById("mjNewImageFile"))==null||L.addEventListener("change",async S=>{try{E(await gl(S.target.files&&S.target.files[0],{maxSide:640,maxBytes:22e4}))}catch(O){x(String(O.message||O),"error")}});const R=(S,O={})=>{const V=document.createElement("div");V.innerHTML=As(O),S.appendChild(V.firstElementChild)};(K=document.getElementById("mjNewFieldAdd"))==null||K.addEventListener("click",()=>{const S=document.getElementById("mjNewFields");S&&R(S)}),(W=document.getElementById("mjCreateBtn"))==null||W.addEventListener("click",async()=>{var w,g,y,v,I,b,_,Ce,Ze,ii,et,tt;const S=re=>n.querySelector(`[data-nc="${re}"]`),O=String(((w=S("nameBn"))==null?void 0:w.value)||"").trim();if(O.length<2){x("Job Title লিখুন","error");return}const V=String(((g=S("steps"))==null?void 0:g.value)||"").split(`
`).map(re=>re.trim()).filter(Boolean).slice(0,20);[...((y=document.getElementById("mjNewFields"))==null?void 0:y.querySelectorAll("[data-if-row]"))||[]].map(re=>{var It;return{label:re.querySelector(".if-label").value.trim(),type:re.querySelector(".if-type").value,placeholder:((It=re.querySelector(".if-ph"))==null?void 0:It.value.trim())||"",required:re.querySelector("[data-ifreq]").checked}}).filter(re=>re.label);const B=document.getElementById("mjCreateBtn");B.disabled=!0;try{const re=[...((v=document.getElementById("mjNewFields"))==null?void 0:v.querySelectorAll("[data-if-row]"))||[]].map(nt=>{var De;return{label:nt.querySelector(".if-label").value.trim(),type:nt.querySelector(".if-type").value,placeholder:((De=nt.querySelector(".if-ph"))==null?void 0:De.value.trim())||"",required:nt.querySelector("[data-ifreq]").checked}}).filter(nt=>nt.label),It=await Dy({kind:"microjob",inputFields:re.length?re:[{label:"কাজের রিপোর্ট",type:"textarea",required:!0,placeholder:"আপনি কী করেছেন লিখুন"},{label:"প্রমাণের ছবি",type:"image",required:!0,placeholder:"স্ক্রিনশট তুলুন"}],nameBn:O,slug:String(((I=S("slug"))==null?void 0:I.value)||"").trim(),reward:Number((b=S("reward"))==null?void 0:b.value)||0,requiredUsers:Math.max(1,Number((_=S("requiredUsers"))==null?void 0:_.value)||1),shortDesc:String(((Ce=S("shortDesc"))==null?void 0:Ce.value)||"").trim(),url:String(((Ze=S("url"))==null?void 0:Ze.value)||"").trim(),videoUrl:String(((ii=S("videoUrl"))==null?void 0:ii.value)||"").trim(),image:p?p.value:"",steps:V,sort:Number((et=S("sort"))==null?void 0:et.value)||100,mode:"single",enabled:!!((tt=S("enabled"))!=null&&tt.checked)});x(`জব তৈরি হয়েছে: ${It.slug||""} — user-এর মাইক্রো জব পেজে আলাদা কার্ড দেখাবে`),i()}catch(re){x(re.message,"error"),B.disabled=!1}}),n.querySelectorAll("[data-imgbtn]").forEach(S=>S.addEventListener("click",()=>{var V;const O=S.dataset.imgbtn;(V=n.querySelector(`[data-imgfile="${O}"]`))==null||V.click()})),n.querySelectorAll("[data-imgfile]").forEach(S=>S.addEventListener("change",async O=>{const V=S.dataset.imgfile,B=S.closest(".task-card");try{const w=await gl(O.target.files&&O.target.files[0],{maxSide:640,maxBytes:22e4}),g=B.querySelector('input[type=hidden][data-f="image"]');g&&(g.value=w);const y=B.querySelector("[data-imgurl]");y&&(y.value="");const v=B.querySelector(`[data-imgprev="${V}"]`);v&&(v.querySelector("img").src=w,v.hidden=!1),x("ছবি লাগানো হয়েছে — Save চাপুন")}catch(w){x(String(w.message||w),"error")}})),n.querySelectorAll("[data-imgclear]").forEach(S=>S.addEventListener("click",()=>{const O=S.closest(".task-card"),V=S.dataset.imgclear,B=O.querySelector('input[type=hidden][data-f="image"]');B&&(B.value="");const w=O.querySelector("[data-imgurl]");w&&(w.value="");const g=O.querySelector(`[data-imgprev="${V}"]`);g&&(g.hidden=!0)})),n.querySelectorAll("[data-save]").forEach(S=>S.addEventListener("click",async()=>{var g,y;const O=S.closest(".task-card"),V=v=>O.querySelector(`[data-form] [data-f="${v}"]`),B=V("url").value.trim();if(B&&!/^https?:\/\//i.test(B)){x("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)","error");return}const w=[...O.querySelectorAll("[data-ifrows] [data-if-row]")].map(v=>{var I;return{label:v.querySelector(".if-label").value.trim(),type:v.querySelector(".if-type").value,placeholder:((I=v.querySelector(".if-ph"))==null?void 0:I.value.trim())||"",required:v.querySelector("[data-ifreq]").checked}}).filter(v=>v.label);S.disabled=!0;try{await xy(S.dataset.save,{nameBn:V("nameBn").value.trim(),url:B,reward:Number(V("reward").value)||0,sort:Number(V("sort").value)||10,password:V("password").value.trim(),description:V("description").value.trim(),submitLabel:V("submitLabel").value.trim(),historyLabel:V("historyLabel").value.trim(),dailyLimit:Math.max(1,Math.min(200,Number(V("dailyLimit").value)||20)),inputFields:w,videoUrl:V("videoUrl").value.trim(),image:(((g=O.querySelector("[data-imgurl]"))==null?void 0:g.value)||"").trim()||((y=V("image"))==null?void 0:y.value)||"",shortDesc:V("shortDesc")?V("shortDesc").value.trim():"",requiredUsers:V("requiredUsers")?Math.max(0,Number(V("requiredUsers").value)||0):0,mode:V("mode")?V("mode").value:"single",enabled:V("enabled").checked,locked:V("locked").checked}),x("সেভ হয়েছে — user website-তে update হয়ে গেছে"),i()}catch(v){x(v.message,"error"),S.disabled=!1}}))}const s_=[{group:"General",fields:[["siteName","Site Name","text"],["telegramLink","Telegram Link","url"],["facebookLink","Facebook Link","url"],["youtubeLink","YouTube Link","url"],["videoUrl","Tutorial Video URL","url"]]},{group:"Money (৳)",fields:[["activationFee","Activation Deposit Fee","number"],["activationBonus","Activation Bonus","number"],["registerBonus","Registration Bonus","number"],["referralBonus","Referral Bonus","number"],["minWithdraw","Minimum Withdraw","number"],["giftReward","Daily Gift Reward","number"]]},{group:"Payment Numbers (Deposit-এর জন্য)",fields:[["bkashNumber","bKash Number","text"],["nagadNumber","Nagad Number","text"],["rocketNumber","Rocket Number","text"]]},{group:"Gift",fields:[["giftCode","Gift Code","text"]]},{group:"Admin Contact (Support page-এ দেখাবে)",fields:[["admin1Name","Admin 1 — Name","text"],["admin1Phone","Admin 1 — Phone","text"],["admin1Email","Admin 1 — Email","email"],["admin1Link","Admin 1 — Link","url"],["admin2Name","Admin 2 — Name","text"],["admin2Phone","Admin 2 — Phone","text"],["admin2Email","Admin 2 — Email","email"],["admin2Link","Admin 2 — Link","url"]]}];async function Eu(n){var i,r;const e=await Uy(),t=e._secretLoaded!==!0;n.innerHTML=`
    <form id="settingsForm">
    ${s_.map(o=>`
      <div class="adm-card">
        <h4><i class="fa-solid fa-sliders" style="color:#d97706"></i> ${o.group}</h4>
        <div class="set-grid">
          ${o.fields.map(([a,c,h])=>{var p;const d=a==="giftCode"&&t;return`
            <div><label>${c}</label><input type="${h}" step="${h==="number"?"0.5":void 0}" class="adm-input" data-sf="${a}" value="${d?"":C((p=e[a])!=null?p:"")}" ${d?'disabled placeholder="লোড করা যায়নি — API দেখুন"':""}></div>`}).join("")}
        </div>
        ${o.group==="Gift"&&t?'<p class="muted" style="margin-top:8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Gift Code server API থেকে পড়া যায়নি — এই ঘরটা এখন change হবে না (ভুলবশত কোড মুছে যাবে না)।</p>':""}
        ${o.group==="Gift"&&!t?`<p class="muted" style="margin-top:8px">কোড: <b>${C(e.giftCode||"(খালি)")}</b> <button type="button" class="adm-btn ghost sm" id="clearGiftBtn" style="margin-left:8px">Clear</button></p>`:""}
      </div>`).join("")}
      <button type="submit" class="adm-btn gold"><i class="fa-solid fa-floppy-disk"></i> Save Settings</button>
      <button type="button" class="adm-btn ghost" id="lbSyncBtn" style="margin-left:8px"><i class="fa-solid fa-trophy"></i> Leaderboard count sync</button>
      <p class="muted" style="font-size:12px;margin-top:6px">Leaderboard (Top 4) existing referral data থেকেই হিসাব করে; এই বাটন চাপলে referral সংখ্যা গুনে user doc-এ cache হয় (বড় list-এ দ্রুত লোড হয়)।</p>
    </form>`,(i=document.getElementById("lbSyncBtn"))==null||i.addEventListener("click",async()=>{const o=document.getElementById("lbSyncBtn");o.disabled=!0;try{const a=await Vy();x(`Leaderboard sync: ${a.updated||0}টা user (${a.failed||0}টা বাদ)`)}catch(a){x(a.message,"error")}o.disabled=!1}),(r=document.getElementById("clearGiftBtn"))==null||r.addEventListener("click",async()=>{if(confirm("Gift code মুছে ফেলবেন? তাহলে কেউই আর gift claim করতে পারবে না।"))try{await jy(),x("Gift code cleared"),Eu(n)}catch(o){x(o.message,"error")}}),document.getElementById("settingsForm").addEventListener("submit",async o=>{o.preventDefault();const a={};n.querySelectorAll("[data-sf]").forEach(h=>{if(h.disabled)return;const d=h.dataset.sf;a[d]=h.type==="number"?Number(h.value)||0:h.value.trim()});const c=o.target.querySelector("button[type=submit]");c.disabled=!0;try{await $y(a),x("Settings save হয়েছে")}catch(h){x(h.message,"error"),c.disabled=!1}})}let qt="";async function zt(n){const[e,t]=await Promise.all([By(),Ky().catch(()=>[])]),i=await lo(300).catch(()=>[]);n.innerHTML=`
    <div class="adm-card">
      <h4><i class="fa-solid fa-bullhorn" style="color:#d97706"></i> নতুন Notice / Warning</h4>
      <div class="two-col">
        <div><label>Type</label>
          <select class="adm-input" id="ntType"><option value="notice">Notice</option><option value="warning">Warning</option></select>
        </div>
        <div><label>Target</label>
          <select class="adm-input" id="ntTarget"><option value="all">সব user (All)</option><option value="user">Specific user</option></select>
        </div>
      </div>
      <div id="ntUserWrap" hidden style="margin-top:8px">
        <label>User খুঁজুন (নাম/মোবাইল) + select করুন</label>
        <input class="adm-input" id="ntUserSearch" placeholder="নাম বা মোবাইল লিখুন...">
        <div id="ntUserResults" class="user-list" style="max-height:150px;overflow:auto"></div>
      </div>
      <input class="adm-input" id="ntTitle" placeholder="Title (ঐচ্ছিক)" maxlength="60" style="margin-top:8px">
      <textarea class="adm-input" id="ntBody" rows="3" placeholder="Notice/Warning লিখুন..." maxlength="300" style="margin-top:8px"></textarea>
      <div class="two-col" style="margin-top:8px">
        <div><label>Expiry (ঐচ্ছিক — তারিখের পর অদৃশ্য)</label><input type="date" class="adm-input" id="ntExpiry"></div>
        <div style="align-self:flex-end"><button class="adm-btn gold sm" id="ntAdd"><i class="fa-solid fa-plus"></i> Send</button></div>
      </div>
    </div>

    <h4 style="margin:14px 0 8px"><i class="fa-solid fa-bullhorn" style="color:#d97706"></i> All-User Notices</h4>
    ${e.map(d=>`
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info"><b>${d.type==="warning"?"⚠️ ":""}${C(d.title||"—")}</b><span class="muted">${d.enabled?"ON":"OFF"} • sort ${d.sort||0}${d.expiresAt?" • expire "+Ne(d.expiresAt):""}</span></div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tgl="${d.id}"><i class="fa-solid ${d.enabled?"fa-eye-slash":"fa-eye"}"></i></button>
            <button class="adm-btn red sm" data-del="${d.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${C(d.body||"")}</p>
      </div>`).join("")}
    ${e.length?"":'<p class="muted center-note">কোনো all-user notice নেই।</p>'}

    <h4 style="margin:14px 0 8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Private Warnings (user-specific)</h4>
    ${t.map(d=>`
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info">
            <b>${d.type==="warning"?"⚠️ ":""}${C(d.title||"—")}</b>
            <span class="muted">→ ${C(d.userName||"—")} (${C(d.userMobile||d.uid)}) • ${d.enabled?"ACTIVE":"OFF"}${d.expiresAt?" • expire "+d.expiresAt:""}</span>
          </div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tn-tgl="${d.uid}::${d.id}">${d.enabled?"Hide":"Show"}</button>
            <button class="adm-btn red sm" data-tn-del="${d.uid}::${d.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${C(d.body||"")}</p>
      </div>`).join("")}
    ${t.length?"":'<p class="muted center-note">কোনো private warning নেই।</p>'}`;const r=document.getElementById("ntTarget"),o=document.getElementById("ntUserWrap"),a=document.getElementById("ntUserSearch"),c=document.getElementById("ntUserResults");r.addEventListener("change",()=>{o.hidden=r.value!=="user"});const h=(d="")=>{const p=d.trim().toLowerCase(),m=p?i.filter(E=>(E.name||"").toLowerCase().includes(p)||String(E.mobile||"").includes(p)):i;c.innerHTML=m.slice(0,30).map(E=>`
      <div class="user-row ${qt===E.uid?"on":""}" data-ntu="${E.uid}">
        <div class="ur-avatar">${C((E.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${C(E.name||"—")}</b><span class="muted">${C(E.mobile||"")}</span></div>
        <div class="ur-right">${qt===E.uid?'<span class="badge green">SELECTED</span>':""}</div>
      </div>`).join("")||'<p class="muted">কোনো user পাওয়া যায়নি</p>',c.querySelectorAll("[data-ntu]").forEach(E=>E.addEventListener("click",()=>{qt=E.dataset.ntu,h(a.value)}))};a.addEventListener("input",()=>h(a.value)),document.getElementById("ntAdd").addEventListener("click",async()=>{const d=document.getElementById("ntTitle").value.trim(),p=document.getElementById("ntBody").value.trim(),m=document.getElementById("ntType").value,E=r.value,R=document.getElementById("ntExpiry").value;if(!d&&!p){x("Title বা message লিখুন","error");return}if(E==="user"&&!qt){x("একটা user select করুন","error");return}const N=R?new Date(R+"T23:59:59"):null;try{E==="user"?await Wy(qt,{title:d,body:p,type:m,expiresAt:N}):await qy({title:d,body:p,type:m,expiresAt:N}),x(E==="user"?"Private warning পাঠানো হয়েছে (শুধু সেই user দেখবে)":"Notice add হয়েছে (সব user দেখবে)"),qt="",zt(n)}catch(U){x(U.message,"error")}}),n.querySelectorAll("[data-tgl]").forEach(d=>d.addEventListener("click",async()=>{const p=e.find(m=>m.id===d.dataset.tgl);try{await Hy(p.id,{title:p.title,body:p.body,enabled:!p.enabled,sort:p.sort}),x("Notice toggle"),zt(n)}catch(m){x(m.message,"error")}})),n.querySelectorAll("[data-del]").forEach(d=>d.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await zy(d.dataset.del),x("Notice delete হয়েছে"),zt(n)}catch(p){x(p.message,"error")}})),n.querySelectorAll("[data-tn-tgl]").forEach(d=>d.addEventListener("click",async()=>{const[p,m]=d.dataset.tnTgl.split("::"),E=t.find(R=>R.uid===p&&R.id===m);try{await gu(p,m,{enabled:!E.enabled}),x("Warning toggle"),zt(n)}catch(R){x(R.message,"error")}})),n.querySelectorAll("[data-tn-del]").forEach(d=>d.addEventListener("click",async()=>{if(!confirm("Warning মুছে ফেলবেন?"))return;const[p,m]=d.dataset.tnDel.split("::");try{await yu(p,m),x("Warning delete হয়েছে"),zt(n)}catch(E){x(E.message,"error")}}))}
