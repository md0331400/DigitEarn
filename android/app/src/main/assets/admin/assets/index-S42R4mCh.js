(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();var ca={};/**
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
 */const ml=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let r=n.charCodeAt(i);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},Zu=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const r=n[t++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){const o=n[t++];e[i++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=n[t++],a=n[t++],c=n[t++],h=((r&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;e[i++]=String.fromCharCode(55296+(h>>10)),e[i++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],a=n[t++];e[i++]=String.fromCharCode((r&15)<<12|(o&63)<<6|a&63)}}return e.join("")},gl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<n.length;r+=3){const o=n[r],a=r+1<n.length,c=a?n[r+1]:0,h=r+2<n.length,f=h?n[r+2]:0,d=o>>2,_=(o&3)<<4|c>>4;let I=(c&15)<<2|f>>6,C=f&63;h||(C=64,a||(I=64)),i.push(t[d],t[_],t[I],t[C])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ml(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Zu(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<n.length;){const o=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const f=r<n.length?t[n.charAt(r)]:64;++r;const _=r<n.length?t[n.charAt(r)]:64;if(++r,o==null||c==null||f==null||_==null)throw new eh;const I=o<<2|c>>4;if(i.push(I),f!==64){const C=c<<4&240|f>>2;if(i.push(C),_!==64){const O=f<<6&192|_;i.push(O)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class eh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const th=function(n){const e=ml(n);return gl.encodeByteArray(e,!0)},Fi=function(n){return th(n).replace(/\./g,"")},yl=function(n){try{return gl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function nh(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
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
 */const ih=()=>nh().__FIREBASE_DEFAULTS__,rh=()=>{if(typeof process=="undefined"||typeof ca=="undefined")return;const n=ca.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},sh=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&yl(n[1]);return e&&JSON.parse(e)},ir=()=>{try{return ih()||rh()||sh()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},_l=n=>{var e,t;return(t=(e=ir())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},oh=n=>{const e=_l(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},vl=()=>{var n;return(n=ir())===null||n===void 0?void 0:n.config},El=n=>{var e;return(e=ir())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class ah{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function lh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",r=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Fi(JSON.stringify(t)),Fi(JSON.stringify(a)),""].join(".")}/**
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
 */function Ie(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ch(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ie())}function uh(){var n;const e=(n=ir())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function hh(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function dh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function fh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ph(){const n=Ie();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function mh(){return!uh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function gh(){try{return typeof indexedDB=="object"}catch{return!1}}function yh(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var o;e(((o=r.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
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
 */const _h="FirebaseError";class Je extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=_h,Object.setPrototypeOf(this,Je.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,qn.prototype.create)}}class qn{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},r=`${this.service}/${e}`,o=this.errors[e],a=o?vh(o,i):"Error",c=`${this.serviceName}: ${a} (${r}).`;return new Je(r,c,i)}}function vh(n,e){return n.replace(Eh,(t,i)=>{const r=e[i];return r!=null?String(r):`<${i}?>`})}const Eh=/\{\$([^}]+)}/g;function wh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function $i(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const r of t){if(!i.includes(r))return!1;const o=n[r],a=e[r];if(ua(o)&&ua(a)){if(!$i(o,a))return!1}else if(o!==a)return!1}for(const r of i)if(!t.includes(r))return!1;return!0}function ua(n){return n!==null&&typeof n=="object"}/**
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
 */function Hn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function An(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[r,o]=i.split("=");e[decodeURIComponent(r)]=decodeURIComponent(o)}}),e}function Sn(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Ih(n,e){const t=new Th(n,e);return t.subscribe.bind(t)}class Th{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let r;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");bh(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:i},r.next===void 0&&(r.next=Gr),r.error===void 0&&(r.error=Gr),r.complete===void 0&&(r.complete=Gr);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console!="undefined"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function bh(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Gr(){}/**
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
 */function de(n){return n&&n._delegate?n._delegate:n}class At{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const wt="[DEFAULT]";/**
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
 */class Ah{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new ah;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(o){if(r)return null;throw o}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Rh(e))try{this.getOrInitializeService({instanceIdentifier:wt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:r});i.resolve(o)}catch{}}}}clearInstance(e=wt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=wt){return this.instances.has(e)}getOptions(e=wt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);i===c&&a.resolve(r)}return r}onInit(e,t){var i;const r=this.normalizeInstanceIdentifier(t),o=(i=this.onInitCallbacks.get(r))!==null&&i!==void 0?i:new Set;o.add(e),this.onInitCallbacks.set(r,o);const a=this.instances.get(r);return a&&e(a,r),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const r of i)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Sh(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=wt){return this.component?this.component.multipleInstances?e:wt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Sh(n){return n===wt?void 0:n}function Rh(n){return n.instantiationMode==="EAGER"}/**
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
 */class Ph{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ah(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const kh={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},Ch=q.INFO,Nh={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},Dh=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),r=Nh[e];if(r)console[r](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class bs{constructor(e){this.name=e,this._logLevel=Ch,this._logHandler=Dh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?kh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}const Oh=(n,e)=>e.some(t=>n instanceof t);let ha,da;function Lh(){return ha||(ha=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Vh(){return da||(da=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const wl=new WeakMap,is=new WeakMap,Il=new WeakMap,Wr=new WeakMap,As=new WeakMap;function Mh(n){const e=new Promise((t,i)=>{const r=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(at(n.result)),r()},a=()=>{i(n.error),r()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&wl.set(t,n)}).catch(()=>{}),As.set(e,n),e}function xh(n){if(is.has(n))return;const e=new Promise((t,i)=>{const r=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),r()},a=()=>{i(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});is.set(n,e)}let rs={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return is.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Il.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return at(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Uh(n){rs=n(rs)}function Fh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Kr(this),e,...t);return Il.set(i,e.sort?e.sort():[e]),at(i)}:Vh().includes(n)?function(...e){return n.apply(Kr(this),e),at(wl.get(this))}:function(...e){return at(n.apply(Kr(this),e))}}function $h(n){return typeof n=="function"?Fh(n):(n instanceof IDBTransaction&&xh(n),Oh(n,Lh())?new Proxy(n,rs):n)}function at(n){if(n instanceof IDBRequest)return Mh(n);if(Wr.has(n))return Wr.get(n);const e=$h(n);return e!==n&&(Wr.set(n,e),As.set(e,n)),e}const Kr=n=>As.get(n);function jh(n,e,{blocked:t,upgrade:i,blocking:r,terminated:o}={}){const a=indexedDB.open(n,e),c=at(a);return i&&a.addEventListener("upgradeneeded",h=>{i(at(a.result),h.oldVersion,h.newVersion,at(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),c.then(h=>{o&&h.addEventListener("close",()=>o()),r&&h.addEventListener("versionchange",f=>r(f.oldVersion,f.newVersion,f))}).catch(()=>{}),c}const Bh=["get","getKey","getAll","getAllKeys","count"],qh=["put","add","delete","clear"],Qr=new Map;function fa(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Qr.get(e))return Qr.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,r=qh.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(r||Bh.includes(t)))return;const o=async function(a,...c){const h=this.transaction(a,r?"readwrite":"readonly");let f=h.store;return i&&(f=f.index(c.shift())),(await Promise.all([f[t](...c),r&&h.done]))[0]};return Qr.set(e,o),o}Uh(n=>({...n,get:(e,t,i)=>fa(e,t)||n.get(e,t,i),has:(e,t)=>!!fa(e,t)||n.has(e,t)}));/**
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
 */class Hh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(zh(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function zh(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ss="@firebase/app",pa="0.10.13";/**
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
 */const Ke=new bs("@firebase/app"),Gh="@firebase/app-compat",Wh="@firebase/analytics-compat",Kh="@firebase/analytics",Qh="@firebase/app-check-compat",Jh="@firebase/app-check",Xh="@firebase/auth",Yh="@firebase/auth-compat",Zh="@firebase/database",ed="@firebase/data-connect",td="@firebase/database-compat",nd="@firebase/functions",id="@firebase/functions-compat",rd="@firebase/installations",sd="@firebase/installations-compat",od="@firebase/messaging",ad="@firebase/messaging-compat",ld="@firebase/performance",cd="@firebase/performance-compat",ud="@firebase/remote-config",hd="@firebase/remote-config-compat",dd="@firebase/storage",fd="@firebase/storage-compat",pd="@firebase/firestore",md="@firebase/vertexai-preview",gd="@firebase/firestore-compat",yd="firebase",_d="10.14.1";/**
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
 */const os="[DEFAULT]",vd={[ss]:"fire-core",[Gh]:"fire-core-compat",[Kh]:"fire-analytics",[Wh]:"fire-analytics-compat",[Jh]:"fire-app-check",[Qh]:"fire-app-check-compat",[Xh]:"fire-auth",[Yh]:"fire-auth-compat",[Zh]:"fire-rtdb",[ed]:"fire-data-connect",[td]:"fire-rtdb-compat",[nd]:"fire-fn",[id]:"fire-fn-compat",[rd]:"fire-iid",[sd]:"fire-iid-compat",[od]:"fire-fcm",[ad]:"fire-fcm-compat",[ld]:"fire-perf",[cd]:"fire-perf-compat",[ud]:"fire-rc",[hd]:"fire-rc-compat",[dd]:"fire-gcs",[fd]:"fire-gcs-compat",[pd]:"fire-fst",[gd]:"fire-fst-compat",[md]:"fire-vertex","fire-js":"fire-js",[yd]:"fire-js-all"};/**
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
 */const ji=new Map,Ed=new Map,as=new Map;function ma(n,e){try{n.container.addComponent(e)}catch(t){Ke.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Gt(n){const e=n.name;if(as.has(e))return Ke.debug(`There were multiple attempts to register component ${e}.`),!1;as.set(e,n);for(const t of ji.values())ma(t,n);for(const t of Ed.values())ma(t,n);return!0}function Ss(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function He(n){return n.settings!==void 0}/**
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
 */const wd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},lt=new qn("app","Firebase",wd);/**
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
 */class Id{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new At("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw lt.create("app-deleted",{appName:this._name})}}/**
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
 */const en=_d;function Tl(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:os,automaticDataCollectionEnabled:!1},e),r=i.name;if(typeof r!="string"||!r)throw lt.create("bad-app-name",{appName:String(r)});if(t||(t=vl()),!t)throw lt.create("no-options");const o=ji.get(r);if(o){if($i(t,o.options)&&$i(i,o.config))return o;throw lt.create("duplicate-app",{appName:r})}const a=new Ph(r);for(const h of as.values())a.addComponent(h);const c=new Id(t,i,a);return ji.set(r,c),c}function bl(n=os){const e=ji.get(n);if(!e&&n===os&&vl())return Tl();if(!e)throw lt.create("no-app",{appName:n});return e}function ct(n,e,t){var i;let r=(i=vd[n])!==null&&i!==void 0?i:n;t&&(r+=`-${t}`);const o=r.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const c=[`Unable to register library "${r}" with version "${e}":`];o&&c.push(`library name "${r}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ke.warn(c.join(" "));return}Gt(new At(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Td="firebase-heartbeat-database",bd=1,On="firebase-heartbeat-store";let Jr=null;function Al(){return Jr||(Jr=jh(Td,bd,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(On)}catch(t){console.warn(t)}}}}).catch(n=>{throw lt.create("idb-open",{originalErrorMessage:n.message})})),Jr}async function Ad(n){try{const t=(await Al()).transaction(On),i=await t.objectStore(On).get(Sl(n));return await t.done,i}catch(e){if(e instanceof Je)Ke.warn(e.message);else{const t=lt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ke.warn(t.message)}}}async function ga(n,e){try{const i=(await Al()).transaction(On,"readwrite");await i.objectStore(On).put(e,Sl(n)),await i.done}catch(t){if(t instanceof Je)Ke.warn(t.message);else{const i=lt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ke.warn(i.message)}}}function Sl(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Sd=1024,Rd=30*24*60*60*1e3;class Pd{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Cd(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ya();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const c=new Date(a.date).valueOf();return Date.now()-c<=Rd}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Ke.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ya(),{heartbeatsToSend:i,unsentEntries:r}=kd(this._heartbeatsCache.heartbeats),o=Fi(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Ke.warn(t),""}}}function ya(){return new Date().toISOString().substring(0,10)}function kd(n,e=Sd){const t=[];let i=n.slice();for(const r of n){const o=t.find(a=>a.agent===r.agent);if(o){if(o.dates.push(r.date),_a(t)>e){o.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),_a(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Cd{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return gh()?yh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Ad(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return ga(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return ga(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function _a(n){return Fi(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function Nd(n){Gt(new At("platform-logger",e=>new Hh(e),"PRIVATE")),Gt(new At("heartbeat",e=>new Pd(e),"PRIVATE")),ct(ss,pa,n),ct(ss,pa,"esm2017"),ct("fire-js","")}Nd("");var Dd="firebase",Od="10.14.1";/**
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
 */ct(Dd,Od,"app");function Rs(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(n);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(n,i[r])&&(t[i[r]]=n[i[r]]);return t}function Rl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ld=Rl,Pl=new qn("auth","Firebase",Rl());/**
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
 */const Bi=new bs("@firebase/auth");function Vd(n,...e){Bi.logLevel<=q.WARN&&Bi.warn(`Auth (${en}): ${n}`,...e)}function Pi(n,...e){Bi.logLevel<=q.ERROR&&Bi.error(`Auth (${en}): ${n}`,...e)}/**
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
 */function xe(n,...e){throw Ps(n,...e)}function Ue(n,...e){return Ps(n,...e)}function kl(n,e,t){const i=Object.assign(Object.assign({},Ld()),{[e]:t});return new qn("auth","Firebase",i).create(e,{appName:n.name})}function ut(n){return kl(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ps(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Pl.create(n,...e)}function U(n,e,...t){if(!n)throw Ps(e,...t)}function ze(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Pi(e),new Error(e)}function Qe(n,e){n||ze(e)}/**
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
 */function ls(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Md(){return va()==="http:"||va()==="https:"}function va(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function xd(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Md()||dh()||"connection"in navigator)?navigator.onLine:!0}function Ud(){if(typeof navigator=="undefined")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class zn{constructor(e,t){this.shortDelay=e,this.longDelay=t,Qe(t>e,"Short delay should be less than long delay!"),this.isMobile=ch()||fh()}get(){return xd()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ks(n,e){Qe(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Cl{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;ze("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;ze("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;ze("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Fd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const $d=new zn(3e4,6e4);function Ct(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function mt(n,e,t,i,r={}){return Nl(n,r,async()=>{let o={},a={};i&&(e==="GET"?a=i:o={body:JSON.stringify(i)});const c=Hn(Object.assign({key:n.config.apiKey},a)).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const f=Object.assign({method:e,headers:h},o);return hh()||(f.referrerPolicy="no-referrer"),Cl.fetch()(Dl(n,n.config.apiHost,t,c),f)})}async function Nl(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},Fd),e);try{const r=new Bd(n),o=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw vi(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const c=o.ok?a.errorMessage:a.error.message,[h,f]=c.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw vi(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw vi(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw vi(n,"user-disabled",a);const d=i[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw kl(n,d,f);xe(n,d)}}catch(r){if(r instanceof Je)throw r;xe(n,"network-request-failed",{message:String(r)})}}async function rr(n,e,t,i,r={}){const o=await mt(n,e,t,i,r);return"mfaPendingCredential"in o&&xe(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Dl(n,e,t,i){const r=`${e}${t}?${i}`;return n.config.emulator?ks(n.config,r):`${n.config.apiScheme}://${r}`}function jd(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Bd{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Ue(this.auth,"network-request-failed")),$d.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function vi(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const r=Ue(n,e,i);return r.customData._tokenResponse=t,r}function Ea(n){return n!==void 0&&n.enterprise!==void 0}class qd{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return jd(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function Hd(n,e){return mt(n,"GET","/v2/recaptchaConfig",Ct(n,e))}/**
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
 */async function zd(n,e){return mt(n,"POST","/v1/accounts:delete",e)}async function Ol(n,e){return mt(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Pn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Gd(n,e=!1){const t=de(n),i=await t.getIdToken(e),r=Cs(i);U(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const o=typeof r.firebase=="object"?r.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:r,token:i,authTime:Pn(Xr(r.auth_time)),issuedAtTime:Pn(Xr(r.iat)),expirationTime:Pn(Xr(r.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Xr(n){return Number(n)*1e3}function Cs(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Pi("JWT malformed, contained fewer than 3 sections"),null;try{const r=yl(t);return r?JSON.parse(r):(Pi("Failed to decode base64 JWT payload"),null)}catch(r){return Pi("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function wa(n){const e=Cs(n);return U(e,"internal-error"),U(typeof e.exp!="undefined","internal-error"),U(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ln(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Je&&Wd(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Wd({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Kd{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const r=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class cs{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Pn(this.lastLoginAt),this.creationTime=Pn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function qi(n){var e;const t=n.auth,i=await n.getIdToken(),r=await Ln(n,Ol(t,{idToken:i}));U(r==null?void 0:r.users.length,t,"internal-error");const o=r.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Ll(o.providerUserInfo):[],c=Jd(n.providerData,a),h=n.isAnonymous,f=!(n.email&&o.passwordHash)&&!(c!=null&&c.length),d=h?f:!1,_={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new cs(o.createdAt,o.lastLoginAt),isAnonymous:d};Object.assign(n,_)}async function Qd(n){const e=de(n);await qi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Jd(n,e){return[...n.filter(i=>!e.some(r=>r.providerId===i.providerId)),...e]}function Ll(n){return n.map(e=>{var{providerId:t}=e,i=Rs(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function Xd(n,e){const t=await Nl(n,{},async()=>{const i=Hn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:o}=n.config,a=Dl(n,r,"/v1/token",`key=${o}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Cl.fetch()(a,{method:"POST",headers:c,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Yd(n,e){return mt(n,"POST","/v2/accounts:revokeToken",Ct(n,e))}/**
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
 */class Bt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){U(e.idToken,"internal-error"),U(typeof e.idToken!="undefined","internal-error"),U(typeof e.refreshToken!="undefined","internal-error");const t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):wa(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){U(e.length!==0,"internal-error");const t=wa(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(U(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:r,expiresIn:o}=await Xd(e,t);this.updateTokensAndExpiration(i,r,Number(o))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:r,expirationTime:o}=t,a=new Bt;return i&&(U(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),r&&(U(typeof r=="string","internal-error",{appName:e}),a.accessToken=r),o&&(U(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Bt,this.toJSON())}_performRefresh(){return ze("not implemented")}}/**
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
 */function nt(n,e){U(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}class Ge{constructor(e){var{uid:t,auth:i,stsTokenManager:r}=e,o=Rs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Kd(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new cs(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Ln(this,this.stsTokenManager.getToken(this.auth,e));return U(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Gd(this,e)}reload(){return Qd(this)}_assign(e){this!==e&&(U(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ge(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){U(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await qi(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(He(this.auth.app))return Promise.reject(ut(this.auth));const e=await this.getIdToken();return await Ln(this,zd(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,r,o,a,c,h,f,d;const _=(i=t.displayName)!==null&&i!==void 0?i:void 0,I=(r=t.email)!==null&&r!==void 0?r:void 0,C=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,O=(a=t.photoURL)!==null&&a!==void 0?a:void 0,A=(c=t.tenantId)!==null&&c!==void 0?c:void 0,R=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,L=(f=t.createdAt)!==null&&f!==void 0?f:void 0,F=(d=t.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:j,emailVerified:W,isAnonymous:re,providerData:B,stsTokenManager:E}=t;U(j&&E,e,"internal-error");const m=Bt.fromJSON(this.name,E);U(typeof j=="string",e,"internal-error"),nt(_,e.name),nt(I,e.name),U(typeof W=="boolean",e,"internal-error"),U(typeof re=="boolean",e,"internal-error"),nt(C,e.name),nt(O,e.name),nt(A,e.name),nt(R,e.name),nt(L,e.name),nt(F,e.name);const y=new Ge({uid:j,auth:e,email:I,emailVerified:W,displayName:_,isAnonymous:re,photoURL:O,phoneNumber:C,tenantId:A,stsTokenManager:m,createdAt:L,lastLoginAt:F});return B&&Array.isArray(B)&&(y.providerData=B.map(v=>Object.assign({},v))),R&&(y._redirectEventId=R),y}static async _fromIdTokenResponse(e,t,i=!1){const r=new Bt;r.updateFromServerResponse(t);const o=new Ge({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await qi(o),o}static async _fromGetAccountInfoResponse(e,t,i){const r=t.users[0];U(r.localId!==void 0,"internal-error");const o=r.providerUserInfo!==void 0?Ll(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!(o!=null&&o.length),c=new Bt;c.updateFromIdToken(i);const h=new Ge({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:a}),f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new cs(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,f),h}}/**
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
 */const Ia=new Map;function We(n){Qe(n instanceof Function,"Expected a class definition");let e=Ia.get(n);return e?(Qe(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ia.set(n,e),e)}/**
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
 */class Vl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Vl.type="NONE";const Ta=Vl;/**
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
 */function ki(n,e,t){return`firebase:${n}:${e}:${t}`}class qt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:r,name:o}=this.auth;this.fullUserKey=ki(this.userKey,r.apiKey,o),this.fullPersistenceKey=ki("persistence",r.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ge._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new qt(We(Ta),e,i);const r=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let o=r[0]||We(Ta);const a=ki(i,e.config.apiKey,e.name);let c=null;for(const f of t)try{const d=await f._get(a);if(d){const _=Ge._fromJSON(e,d);f!==o&&(c=_),o=f;break}}catch{}const h=r.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new qt(o,e,i):(o=h[0],c&&await o._set(a,c.toJSON()),await Promise.all(t.map(async f=>{if(f!==o)try{await f._remove(a)}catch{}})),new qt(o,e,i))}}/**
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
 */function ba(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Fl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ml(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(jl(e))return"Blackberry";if(Bl(e))return"Webos";if(xl(e))return"Safari";if((e.includes("chrome/")||Ul(e))&&!e.includes("edge/"))return"Chrome";if($l(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Ml(n=Ie()){return/firefox\//i.test(n)}function xl(n=Ie()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ul(n=Ie()){return/crios\//i.test(n)}function Fl(n=Ie()){return/iemobile/i.test(n)}function $l(n=Ie()){return/android/i.test(n)}function jl(n=Ie()){return/blackberry/i.test(n)}function Bl(n=Ie()){return/webos/i.test(n)}function Ns(n=Ie()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Zd(n=Ie()){var e;return Ns(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ef(){return ph()&&document.documentMode===10}function ql(n=Ie()){return Ns(n)||$l(n)||Bl(n)||jl(n)||/windows phone/i.test(n)||Fl(n)}/**
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
 */function Hl(n,e=[]){let t;switch(n){case"Browser":t=ba(Ie());break;case"Worker":t=`${ba(Ie())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${en}/${i}`}/**
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
 */class tf{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=o=>new Promise((a,c)=>{try{const h=e(o);a(h)}catch(h){c(h)}});i.onAbort=t,this.queue.push(i);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
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
 */async function nf(n,e={}){return mt(n,"GET","/v2/passwordPolicy",Ct(n,e))}/**
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
 */const rf=6;class sf{constructor(e){var t,i,r,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:rf,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(r=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&r!==void 0?r:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,r,o,a,c;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(i=h.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),h.isValid&&(h.isValid=(r=h.containsLowercaseLetter)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(a=h.containsNumericCharacter)!==null&&a!==void 0?a:!0),h.isValid&&(h.isValid=(c=h.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),h}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let r=0;r<e.length;r++)i=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,r,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
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
 */class of{constructor(e,t,i,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Aa(this),this.idTokenSubscription=new Aa(this),this.beforeStateQueue=new tf(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Pl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=We(t)),this._initializationPromise=this.queue(async()=>{var i,r;if(!this._deleted&&(this.persistenceManager=await qt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ol(this,{idToken:e}),i=await Ge._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(He(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let r=i,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=r==null?void 0:r._redirectEventId,h=await this.tryRedirectSignIn(e);(!a||a===c)&&(h!=null&&h.user)&&(r=h.user,o=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return U(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await qi(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ud()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(He(this.app))return Promise.reject(ut(this));const t=e?de(e):null;return t&&U(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&U(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return He(this.app)?Promise.reject(ut(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return He(this.app)?Promise.reject(ut(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(We(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await nf(this),t=new sf(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new qn("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Yd(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&We(e)||this._popupRedirectResolver;U(t,this,"argument-error"),this.redirectPersistenceManager=await qt.create(this,[We(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,r){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(U(c,this,"internal-error"),c.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,i,r);return()=>{a=!0,h()}}else{const h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return U(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Hl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Vd(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function tn(n){return de(n)}class Aa{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ih(t=>this.observer=t)}get next(){return U(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let sr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function af(n){sr=n}function zl(n){return sr.loadJS(n)}function lf(){return sr.recaptchaEnterpriseScript}function cf(){return sr.gapiScript}function uf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const hf="recaptcha-enterprise",df="NO_RECAPTCHA";class ff{constructor(e){this.type=hf,this.auth=tn(e)}async verify(e="verify",t=!1){async function i(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,c)=>{Hd(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(h=>{if(h.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const f=new qd(h);return o.tenantId==null?o._agentRecaptchaConfig=f:o._tenantRecaptchaConfigs[o.tenantId]=f,a(f.siteKey)}}).catch(h=>{c(h)})})}function r(o,a,c){const h=window.grecaptcha;Ea(h)?h.enterprise.ready(()=>{h.enterprise.execute(o,{action:e}).then(f=>{a(f)}).catch(()=>{a(df)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,a)=>{i(this.auth).then(c=>{if(!t&&Ea(window.grecaptcha))r(c,o,a);else{if(typeof window=="undefined"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let h=lf();h.length!==0&&(h+=c),zl(h).then(()=>{r(c,o,a)}).catch(f=>{a(f)})}}).catch(c=>{a(c)})})}}async function Sa(n,e,t,i=!1){const r=new ff(n);let o;try{o=await r.verify(t)}catch{o=await r.verify(t,!0)}const a=Object.assign({},e);return i?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Ra(n,e,t,i){var r;if(!((r=n._getRecaptchaConfig())===null||r===void 0)&&r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Sa(n,e,t,t==="getOobCode");return i(n,o)}else return i(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Sa(n,e,t,t==="getOobCode");return i(n,a)}else return Promise.reject(o)})}/**
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
 */function pf(n,e){const t=Ss(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),o=t.getOptions();if($i(o,e!=null?e:{}))return r;xe(r,"already-initialized")}return t.initialize({options:e})}function mf(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(We);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function gf(n,e,t){const i=tn(n);U(i._canInitEmulator,i,"emulator-config-failed"),U(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const r=!1,o=Gl(e),{host:a,port:c}=yf(e),h=c===null?"":`:${c}`;i.config.emulator={url:`${o}//${a}${h}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:r})}),_f()}function Gl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function yf(n){const e=Gl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){const o=r[1];return{host:o,port:Pa(i.substr(o.length+1))}}else{const[o,a]=i.split(":");return{host:o,port:Pa(a)}}}function Pa(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function _f(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Ds{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ze("not implemented")}_getIdTokenResponse(e){return ze("not implemented")}_linkToIdToken(e,t){return ze("not implemented")}_getReauthenticationResolver(e){return ze("not implemented")}}async function vf(n,e){return mt(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function Ef(n,e){return rr(n,"POST","/v1/accounts:signInWithPassword",Ct(n,e))}/**
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
 */async function wf(n,e){return rr(n,"POST","/v1/accounts:signInWithEmailLink",Ct(n,e))}async function If(n,e){return rr(n,"POST","/v1/accounts:signInWithEmailLink",Ct(n,e))}/**
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
 */class Vn extends Ds{constructor(e,t,i,r=null){super("password",i),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Vn(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new Vn(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ra(e,t,"signInWithPassword",Ef);case"emailLink":return wf(e,{email:this._email,oobCode:this._password});default:xe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ra(e,i,"signUpPassword",vf);case"emailLink":return If(e,{idToken:t,email:this._email,oobCode:this._password});default:xe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Ht(n,e){return rr(n,"POST","/v1/accounts:signInWithIdp",Ct(n,e))}/**
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
 */const Tf="http://localhost";class St extends Ds{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new St(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):xe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r}=t,o=Rs(t,["providerId","signInMethod"]);if(!i||!r)return null;const a=new St(i,r);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Ht(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Ht(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ht(e,t)}buildRequest(){const e={requestUri:Tf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Hn(t)}return e}}/**
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
 */function bf(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Af(n){const e=An(Sn(n)).link,t=e?An(Sn(e)).deep_link_id:null,i=An(Sn(n)).deep_link_id;return(i?An(Sn(i)).link:null)||i||t||e||n}class Os{constructor(e){var t,i,r,o,a,c;const h=An(Sn(e)),f=(t=h.apiKey)!==null&&t!==void 0?t:null,d=(i=h.oobCode)!==null&&i!==void 0?i:null,_=bf((r=h.mode)!==null&&r!==void 0?r:null);U(f&&d&&_,"argument-error"),this.apiKey=f,this.operation=_,this.code=d,this.continueUrl=(o=h.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(a=h.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=h.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Af(e);try{return new Os(t)}catch{return null}}}/**
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
 */class nn{constructor(){this.providerId=nn.PROVIDER_ID}static credential(e,t){return Vn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=Os.parseLink(t);return U(i,"argument-error"),Vn._fromEmailAndCode(e,i.code,i.tenantId)}}nn.PROVIDER_ID="password";nn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";nn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Wl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Gn extends Wl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class it extends Gn{constructor(){super("facebook.com")}static credential(e){return St._fromParams({providerId:it.PROVIDER_ID,signInMethod:it.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return it.credentialFromTaggedObject(e)}static credentialFromError(e){return it.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return it.credential(e.oauthAccessToken)}catch{return null}}}it.FACEBOOK_SIGN_IN_METHOD="facebook.com";it.PROVIDER_ID="facebook.com";/**
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
 */class rt extends Gn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return St._fromParams({providerId:rt.PROVIDER_ID,signInMethod:rt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return rt.credentialFromTaggedObject(e)}static credentialFromError(e){return rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return rt.credential(t,i)}catch{return null}}}rt.GOOGLE_SIGN_IN_METHOD="google.com";rt.PROVIDER_ID="google.com";/**
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
 */class st extends Gn{constructor(){super("github.com")}static credential(e){return St._fromParams({providerId:st.PROVIDER_ID,signInMethod:st.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return st.credentialFromTaggedObject(e)}static credentialFromError(e){return st.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return st.credential(e.oauthAccessToken)}catch{return null}}}st.GITHUB_SIGN_IN_METHOD="github.com";st.PROVIDER_ID="github.com";/**
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
 */class ot extends Gn{constructor(){super("twitter.com")}static credential(e,t){return St._fromParams({providerId:ot.PROVIDER_ID,signInMethod:ot.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ot.credentialFromTaggedObject(e)}static credentialFromError(e){return ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return ot.credential(t,i)}catch{return null}}}ot.TWITTER_SIGN_IN_METHOD="twitter.com";ot.PROVIDER_ID="twitter.com";/**
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
 */class Wt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,r=!1){const o=await Ge._fromIdTokenResponse(e,i,r),a=ka(i);return new Wt({user:o,providerId:a,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const r=ka(i);return new Wt({user:e,providerId:r,_tokenResponse:i,operationType:t})}}function ka(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Hi extends Je{constructor(e,t,i,r){var o;super(t.code,t.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,Hi.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,r){return new Hi(e,t,i,r)}}function Kl(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Hi._fromErrorAndOperation(n,o,e,i):o})}async function Sf(n,e,t=!1){const i=await Ln(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Wt._forOperation(n,"link",i)}/**
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
 */async function Rf(n,e,t=!1){const{auth:i}=n;if(He(i.app))return Promise.reject(ut(i));const r="reauthenticate";try{const o=await Ln(n,Kl(i,r,e,n),t);U(o.idToken,i,"internal-error");const a=Cs(o.idToken);U(a,i,"internal-error");const{sub:c}=a;return U(n.uid===c,i,"user-mismatch"),Wt._forOperation(n,r,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&xe(i,"user-mismatch"),o}}/**
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
 */async function Ql(n,e,t=!1){if(He(n.app))return Promise.reject(ut(n));const i="signIn",r=await Kl(n,i,e),o=await Wt._fromIdTokenResponse(n,i,r);return t||await n._updateCurrentUser(o.user),o}async function Pf(n,e){return Ql(tn(n),e)}/**
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
 */async function kf(n){const e=tn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Cf(n,e,t){return He(n.app)?Promise.reject(ut(n)):Pf(de(n),nn.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&kf(n),i})}function Nf(n,e,t,i){return de(n).onIdTokenChanged(e,t,i)}function Df(n,e,t){return de(n).beforeAuthStateChanged(e,t)}function Of(n,e,t,i){return de(n).onAuthStateChanged(e,t,i)}function Jl(n){return de(n).signOut()}const zi="__sak";/**
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
 */class Xl{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(zi,"1"),this.storage.removeItem(zi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Lf=1e3,Vf=10;class Yl extends Xl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ql(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),r=this.localCache[t];i!==r&&e(t,r,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,h)=>{this.notifyListeners(a,h)});return}const i=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const a=this.storage.getItem(i);!t&&this.localCache[i]===a||this.notifyListeners(i,a)},o=this.storage.getItem(i);ef()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Vf):r()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Lf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Yl.type="LOCAL";const Mf=Yl;/**
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
 */class Zl extends Xl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Zl.type="SESSION";const ec=Zl;/**
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
 */function xf(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class or{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const i=new or(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:r,data:o}=t.data,a=this.handlersMap[r];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:r});const c=Array.from(a).map(async f=>f(t.origin,o)),h=await xf(c);t.ports[0].postMessage({status:"done",eventId:i,eventType:r,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}or.receivers=[];/**
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
 */function Ls(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Uf{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const r=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let o,a;return new Promise((c,h)=>{const f=Ls("",20);r.port1.start();const d=setTimeout(()=>{h(new Error("unsupported_event"))},i);a={messageChannel:r,onMessage(_){const I=_;if(I.data.eventId===f)switch(I.data.status){case"ack":clearTimeout(d),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),c(I.data.response);break;default:clearTimeout(d),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function Fe(){return window}function Ff(n){Fe().location.href=n}/**
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
 */function tc(){return typeof Fe().WorkerGlobalScope!="undefined"&&typeof Fe().importScripts=="function"}async function $f(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function jf(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Bf(){return tc()?self:null}/**
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
 */const nc="firebaseLocalStorageDb",qf=1,Gi="firebaseLocalStorage",ic="fbase_key";class Wn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ar(n,e){return n.transaction([Gi],e?"readwrite":"readonly").objectStore(Gi)}function Hf(){const n=indexedDB.deleteDatabase(nc);return new Wn(n).toPromise()}function us(){const n=indexedDB.open(nc,qf);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Gi,{keyPath:ic})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Gi)?e(i):(i.close(),await Hf(),e(await us()))})})}async function Ca(n,e,t){const i=ar(n,!0).put({[ic]:e,value:t});return new Wn(i).toPromise()}async function zf(n,e){const t=ar(n,!1).get(e),i=await new Wn(t).toPromise();return i===void 0?null:i.value}function Na(n,e){const t=ar(n,!0).delete(e);return new Wn(t).toPromise()}const Gf=800,Wf=3;class rc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await us(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>Wf)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return tc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=or._getInstance(Bf()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await $f(),!this.activeServiceWorker)return;this.sender=new Uf(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||jf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await us();return await Ca(e,zi,"1"),await Na(e,zi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Ca(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>zf(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Na(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const o=ar(r,!1).getAll();return new Wn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:r,value:o}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(o)&&(this.notifyListeners(r,o),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!i.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Gf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}rc.type="LOCAL";const Kf=rc;new zn(3e4,6e4);/**
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
 */function Qf(n,e){return e?We(e):(U(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Vs extends Ds{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ht(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ht(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ht(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Jf(n){return Ql(n.auth,new Vs(n),n.bypassAuthState)}function Xf(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),Rf(t,new Vs(n),n.bypassAuthState)}async function Yf(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),Sf(t,new Vs(n),n.bypassAuthState)}/**
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
 */class sc{constructor(e,t,i,r,o=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:r,tenantId:o,error:a,type:c}=e;if(a){this.reject(a);return}const h={auth:this.auth,requestUri:t,sessionId:i,tenantId:o||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(h))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Jf;case"linkViaPopup":case"linkViaRedirect":return Yf;case"reauthViaPopup":case"reauthViaRedirect":return Xf;default:xe(this.auth,"internal-error")}}resolve(e){Qe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Qe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Zf=new zn(2e3,1e4);class jt extends sc{constructor(e,t,i,r,o){super(e,t,r,o),this.provider=i,this.authWindow=null,this.pollId=null,jt.currentPopupAction&&jt.currentPopupAction.cancel(),jt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return U(e,this.auth,"internal-error"),e}async onExecution(){Qe(this.filter.length===1,"Popup operations only handle one event");const e=Ls();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ue(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ue(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,jt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ue(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Zf.get())};e()}}jt.currentPopupAction=null;/**
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
 */const ep="pendingRedirect",Ci=new Map;class tp extends sc{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Ci.get(this.auth._key());if(!e){try{const i=await np(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Ci.set(this.auth._key(),e)}return this.bypassAuthState||Ci.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function np(n,e){const t=sp(e),i=rp(n);if(!await i._isAvailable())return!1;const r=await i._get(t)==="true";return await i._remove(t),r}function ip(n,e){Ci.set(n._key(),e)}function rp(n){return We(n._redirectPersistence)}function sp(n){return ki(ep,n.config.apiKey,n.name)}async function op(n,e,t=!1){if(He(n.app))return Promise.reject(ut(n));const i=tn(n),r=Qf(i,e),a=await new tp(i,r,t).execute();return a&&!t&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}/**
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
 */const ap=10*60*1e3;class lp{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!oc(e)){const r=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(Ue(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ap&&this.cachedEventUids.clear(),this.cachedEventUids.has(Da(e))}saveEventToCache(e){this.cachedEventUids.add(Da(e)),this.lastProcessedEventTime=Date.now()}}function Da(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function oc({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return oc(n);default:return!1}}/**
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
 */async function up(n,e={}){return mt(n,"GET","/v1/projects",e)}/**
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
 */const hp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dp=/^https?/;async function fp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await up(n);for(const t of e)try{if(pp(t))return}catch{}xe(n,"unauthorized-domain")}function pp(n){const e=ls(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===i}if(!dp.test(t))return!1;if(hp.test(n))return i===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}/**
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
 */const mp=new zn(3e4,6e4);function Oa(){const n=Fe().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function gp(n){return new Promise((e,t)=>{var i,r,o;function a(){Oa(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Oa(),t(Ue(n,"network-request-failed"))},timeout:mp.get()})}if(!((r=(i=Fe().gapi)===null||i===void 0?void 0:i.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((o=Fe().gapi)===null||o===void 0)&&o.load)a();else{const c=uf("iframefcb");return Fe()[c]=()=>{gapi.load?a():t(Ue(n,"network-request-failed"))},zl(`${cf()}?onload=${c}`).catch(h=>t(h))}}).catch(e=>{throw Ni=null,e})}let Ni=null;function yp(n){return Ni=Ni||gp(n),Ni}/**
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
 */const _p=new zn(5e3,15e3),vp="__/auth/iframe",Ep="emulator/auth/iframe",wp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ip=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Tp(n){const e=n.config;U(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ks(e,Ep):`https://${n.config.authDomain}/${vp}`,i={apiKey:e.apiKey,appName:n.name,v:en},r=Ip.get(n.config.apiHost);r&&(i.eid=r);const o=n._getFrameworks();return o.length&&(i.fw=o.join(",")),`${t}?${Hn(i).slice(1)}`}async function bp(n){const e=await yp(n),t=Fe().gapi;return U(t,n,"internal-error"),e.open({where:document.body,url:Tp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:wp,dontclear:!0},i=>new Promise(async(r,o)=>{await i.restyle({setHideOnLeave:!1});const a=Ue(n,"network-request-failed"),c=Fe().setTimeout(()=>{o(a)},_p.get());function h(){Fe().clearTimeout(c),r(i)}i.ping(h).then(h,()=>{o(a)})}))}/**
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
 */const Ap={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Sp=500,Rp=600,Pp="_blank",kp="http://localhost";class La{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Cp(n,e,t,i=Sp,r=Rp){const o=Math.max((window.screen.availHeight-r)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let c="";const h=Object.assign(Object.assign({},Ap),{width:i.toString(),height:r.toString(),top:o,left:a}),f=Ie().toLowerCase();t&&(c=Ul(f)?Pp:t),Ml(f)&&(e=e||kp,h.scrollbars="yes");const d=Object.entries(h).reduce((I,[C,O])=>`${I}${C}=${O},`,"");if(Zd(f)&&c!=="_self")return Np(e||"",c),new La(null);const _=window.open(e||"",c,d);U(_,n,"popup-blocked");try{_.focus()}catch{}return new La(_)}function Np(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const Dp="__/auth/handler",Op="emulator/auth/handler",Lp=encodeURIComponent("fac");async function Va(n,e,t,i,r,o){U(n.config.authDomain,n,"auth-domain-config-required"),U(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:en,eventId:r};if(e instanceof Wl){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",wh(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,_]of Object.entries({}))a[d]=_}if(e instanceof Gn){const d=e.getScopes().filter(_=>_!=="");d.length>0&&(a.scopes=d.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const h=await n._getAppCheckToken(),f=h?`#${Lp}=${encodeURIComponent(h)}`:"";return`${Vp(n)}?${Hn(c).slice(1)}${f}`}function Vp({config:n}){return n.emulator?ks(n,Op):`https://${n.authDomain}/${Dp}`}/**
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
 */const Yr="webStorageSupport";class Mp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ec,this._completeRedirectFn=op,this._overrideRedirectResult=ip}async _openPopup(e,t,i,r){var o;Qe((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await Va(e,t,i,ls(),r);return Cp(e,a,Ls())}async _openRedirect(e,t,i,r){await this._originValidation(e);const o=await Va(e,t,i,ls(),r);return Ff(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:o}=this.eventManagers[t];return r?Promise.resolve(r):(Qe(o,"If manager is not set, promise should be"),o)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await bp(e),i=new lp(e);return t.register("authEvent",r=>(U(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:i.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Yr,{type:Yr},r=>{var o;const a=(o=r==null?void 0:r[0])===null||o===void 0?void 0:o[Yr];a!==void 0&&t(!!a),xe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=fp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ql()||xl()||Ns()}}const xp=Mp;var Ma="@firebase/auth",xa="1.7.9";/**
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
 */class Up{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){U(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Fp(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function $p(n){Gt(new At("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=i.options;U(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const h={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Hl(n)},f=new of(i,r,o,h);return mf(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Gt(new At("auth-internal",e=>{const t=tn(e.getProvider("auth").getImmediate());return(i=>new Up(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ct(Ma,xa,Fp(n)),ct(Ma,xa,"esm2017")}/**
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
 */const jp=5*60,Bp=El("authIdTokenMaxAge")||jp;let Ua=null;const qp=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>Bp)return;const r=t==null?void 0:t.token;Ua!==r&&(Ua=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Hp(n=bl()){const e=Ss(n,"auth");if(e.isInitialized())return e.getImmediate();const t=pf(n,{popupRedirectResolver:xp,persistence:[Kf,Mf,ec]}),i=El("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(i,location.origin);if(location.origin===o.origin){const a=qp(o.toString());Df(t,a,()=>a(t.currentUser)),Nf(t,c=>a(c))}}const r=_l("auth");return r&&gf(t,`http://${r}`),t}function zp(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}af({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=r=>{const o=Ue("internal-error");o.customData=r,t(o)},i.type="text/javascript",i.charset="UTF-8",zp().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});$p("Browser");var Fa=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ac;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,m){function y(){}y.prototype=m.prototype,E.D=m.prototype,E.prototype=new y,E.prototype.constructor=E,E.C=function(v,w,b){for(var g=Array(arguments.length-2),Ce=2;Ce<arguments.length;Ce++)g[Ce-2]=arguments[Ce];return m.prototype[w].apply(v,g)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,t),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(E,m,y){y||(y=0);var v=Array(16);if(typeof m=="string")for(var w=0;16>w;++w)v[w]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(w=0;16>w;++w)v[w]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=E.g[0],y=E.g[1],w=E.g[2];var b=E.g[3],g=m+(b^y&(w^b))+v[0]+3614090360&4294967295;m=y+(g<<7&4294967295|g>>>25),g=b+(w^m&(y^w))+v[1]+3905402710&4294967295,b=m+(g<<12&4294967295|g>>>20),g=w+(y^b&(m^y))+v[2]+606105819&4294967295,w=b+(g<<17&4294967295|g>>>15),g=y+(m^w&(b^m))+v[3]+3250441966&4294967295,y=w+(g<<22&4294967295|g>>>10),g=m+(b^y&(w^b))+v[4]+4118548399&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(w^m&(y^w))+v[5]+1200080426&4294967295,b=m+(g<<12&4294967295|g>>>20),g=w+(y^b&(m^y))+v[6]+2821735955&4294967295,w=b+(g<<17&4294967295|g>>>15),g=y+(m^w&(b^m))+v[7]+4249261313&4294967295,y=w+(g<<22&4294967295|g>>>10),g=m+(b^y&(w^b))+v[8]+1770035416&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(w^m&(y^w))+v[9]+2336552879&4294967295,b=m+(g<<12&4294967295|g>>>20),g=w+(y^b&(m^y))+v[10]+4294925233&4294967295,w=b+(g<<17&4294967295|g>>>15),g=y+(m^w&(b^m))+v[11]+2304563134&4294967295,y=w+(g<<22&4294967295|g>>>10),g=m+(b^y&(w^b))+v[12]+1804603682&4294967295,m=y+(g<<7&4294967295|g>>>25),g=b+(w^m&(y^w))+v[13]+4254626195&4294967295,b=m+(g<<12&4294967295|g>>>20),g=w+(y^b&(m^y))+v[14]+2792965006&4294967295,w=b+(g<<17&4294967295|g>>>15),g=y+(m^w&(b^m))+v[15]+1236535329&4294967295,y=w+(g<<22&4294967295|g>>>10),g=m+(w^b&(y^w))+v[1]+4129170786&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^w&(m^y))+v[6]+3225465664&4294967295,b=m+(g<<9&4294967295|g>>>23),g=w+(m^y&(b^m))+v[11]+643717713&4294967295,w=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(w^b))+v[0]+3921069994&4294967295,y=w+(g<<20&4294967295|g>>>12),g=m+(w^b&(y^w))+v[5]+3593408605&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^w&(m^y))+v[10]+38016083&4294967295,b=m+(g<<9&4294967295|g>>>23),g=w+(m^y&(b^m))+v[15]+3634488961&4294967295,w=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(w^b))+v[4]+3889429448&4294967295,y=w+(g<<20&4294967295|g>>>12),g=m+(w^b&(y^w))+v[9]+568446438&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^w&(m^y))+v[14]+3275163606&4294967295,b=m+(g<<9&4294967295|g>>>23),g=w+(m^y&(b^m))+v[3]+4107603335&4294967295,w=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(w^b))+v[8]+1163531501&4294967295,y=w+(g<<20&4294967295|g>>>12),g=m+(w^b&(y^w))+v[13]+2850285829&4294967295,m=y+(g<<5&4294967295|g>>>27),g=b+(y^w&(m^y))+v[2]+4243563512&4294967295,b=m+(g<<9&4294967295|g>>>23),g=w+(m^y&(b^m))+v[7]+1735328473&4294967295,w=b+(g<<14&4294967295|g>>>18),g=y+(b^m&(w^b))+v[12]+2368359562&4294967295,y=w+(g<<20&4294967295|g>>>12),g=m+(y^w^b)+v[5]+4294588738&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^w)+v[8]+2272392833&4294967295,b=m+(g<<11&4294967295|g>>>21),g=w+(b^m^y)+v[11]+1839030562&4294967295,w=b+(g<<16&4294967295|g>>>16),g=y+(w^b^m)+v[14]+4259657740&4294967295,y=w+(g<<23&4294967295|g>>>9),g=m+(y^w^b)+v[1]+2763975236&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^w)+v[4]+1272893353&4294967295,b=m+(g<<11&4294967295|g>>>21),g=w+(b^m^y)+v[7]+4139469664&4294967295,w=b+(g<<16&4294967295|g>>>16),g=y+(w^b^m)+v[10]+3200236656&4294967295,y=w+(g<<23&4294967295|g>>>9),g=m+(y^w^b)+v[13]+681279174&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^w)+v[0]+3936430074&4294967295,b=m+(g<<11&4294967295|g>>>21),g=w+(b^m^y)+v[3]+3572445317&4294967295,w=b+(g<<16&4294967295|g>>>16),g=y+(w^b^m)+v[6]+76029189&4294967295,y=w+(g<<23&4294967295|g>>>9),g=m+(y^w^b)+v[9]+3654602809&4294967295,m=y+(g<<4&4294967295|g>>>28),g=b+(m^y^w)+v[12]+3873151461&4294967295,b=m+(g<<11&4294967295|g>>>21),g=w+(b^m^y)+v[15]+530742520&4294967295,w=b+(g<<16&4294967295|g>>>16),g=y+(w^b^m)+v[2]+3299628645&4294967295,y=w+(g<<23&4294967295|g>>>9),g=m+(w^(y|~b))+v[0]+4096336452&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~w))+v[7]+1126891415&4294967295,b=m+(g<<10&4294967295|g>>>22),g=w+(m^(b|~y))+v[14]+2878612391&4294967295,w=b+(g<<15&4294967295|g>>>17),g=y+(b^(w|~m))+v[5]+4237533241&4294967295,y=w+(g<<21&4294967295|g>>>11),g=m+(w^(y|~b))+v[12]+1700485571&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~w))+v[3]+2399980690&4294967295,b=m+(g<<10&4294967295|g>>>22),g=w+(m^(b|~y))+v[10]+4293915773&4294967295,w=b+(g<<15&4294967295|g>>>17),g=y+(b^(w|~m))+v[1]+2240044497&4294967295,y=w+(g<<21&4294967295|g>>>11),g=m+(w^(y|~b))+v[8]+1873313359&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~w))+v[15]+4264355552&4294967295,b=m+(g<<10&4294967295|g>>>22),g=w+(m^(b|~y))+v[6]+2734768916&4294967295,w=b+(g<<15&4294967295|g>>>17),g=y+(b^(w|~m))+v[13]+1309151649&4294967295,y=w+(g<<21&4294967295|g>>>11),g=m+(w^(y|~b))+v[4]+4149444226&4294967295,m=y+(g<<6&4294967295|g>>>26),g=b+(y^(m|~w))+v[11]+3174756917&4294967295,b=m+(g<<10&4294967295|g>>>22),g=w+(m^(b|~y))+v[2]+718787259&4294967295,w=b+(g<<15&4294967295|g>>>17),g=y+(b^(w|~m))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(w+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+w&4294967295,E.g[3]=E.g[3]+b&4294967295}i.prototype.u=function(E,m){m===void 0&&(m=E.length);for(var y=m-this.blockSize,v=this.B,w=this.h,b=0;b<m;){if(w==0)for(;b<=y;)r(this,E,b),b+=this.blockSize;if(typeof E=="string"){for(;b<m;)if(v[w++]=E.charCodeAt(b++),w==this.blockSize){r(this,v),w=0;break}}else for(;b<m;)if(v[w++]=E[b++],w==this.blockSize){r(this,v),w=0;break}}this.h=w,this.o+=m},i.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;var y=8*this.o;for(m=E.length-8;m<E.length;++m)E[m]=y&255,y/=256;for(this.u(E),E=Array(16),m=y=0;4>m;++m)for(var v=0;32>v;v+=8)E[y++]=this.g[m]>>>v&255;return E};function o(E,m){var y=c;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=m(E)}function a(E,m){this.h=m;for(var y=[],v=!0,w=E.length-1;0<=w;w--){var b=E[w]|0;v&&b==m||(y[w]=b,v=!1)}this.g=y}var c={};function h(E){return-128<=E&&128>E?o(E,function(m){return new a([m|0],0>m?-1:0)}):new a([E|0],0>E?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return _;if(0>E)return R(f(-E));for(var m=[],y=1,v=0;E>=y;v++)m[v]=E/y|0,y*=4294967296;return new a(m,0)}function d(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return R(d(E.substring(1),m));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=f(Math.pow(m,8)),v=_,w=0;w<E.length;w+=8){var b=Math.min(8,E.length-w),g=parseInt(E.substring(w,w+b),m);8>b?(b=f(Math.pow(m,b)),v=v.j(b).add(f(g))):(v=v.j(y),v=v.add(f(g)))}return v}var _=h(0),I=h(1),C=h(16777216);n=a.prototype,n.m=function(){if(A(this))return-R(this).m();for(var E=0,m=1,y=0;y<this.g.length;y++){var v=this.i(y);E+=(0<=v?v:4294967296+v)*m,m*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(O(this))return"0";if(A(this))return"-"+R(this).toString(E);for(var m=f(Math.pow(E,6)),y=this,v="";;){var w=W(y,m).g;y=L(y,w.j(m));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(E);if(y=w,O(y))return b+v;for(;6>b.length;)b="0"+b;v=b+v}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function O(E){if(E.h!=0)return!1;for(var m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function A(E){return E.h==-1}n.l=function(E){return E=L(this,E),A(E)?-1:O(E)?0:1};function R(E){for(var m=E.g.length,y=[],v=0;v<m;v++)y[v]=~E.g[v];return new a(y,~E.h).add(I)}n.abs=function(){return A(this)?R(this):this},n.add=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],v=0,w=0;w<=m;w++){var b=v+(this.i(w)&65535)+(E.i(w)&65535),g=(b>>>16)+(this.i(w)>>>16)+(E.i(w)>>>16);v=g>>>16,b&=65535,g&=65535,y[w]=g<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function L(E,m){return E.add(R(m))}n.j=function(E){if(O(this)||O(E))return _;if(A(this))return A(E)?R(this).j(R(E)):R(R(this).j(E));if(A(E))return R(this.j(R(E)));if(0>this.l(C)&&0>E.l(C))return f(this.m()*E.m());for(var m=this.g.length+E.g.length,y=[],v=0;v<2*m;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(var w=0;w<E.g.length;w++){var b=this.i(v)>>>16,g=this.i(v)&65535,Ce=E.i(w)>>>16,ne=E.i(w)&65535;y[2*v+2*w]+=g*ne,F(y,2*v+2*w),y[2*v+2*w+1]+=b*ne,F(y,2*v+2*w+1),y[2*v+2*w+1]+=g*Ce,F(y,2*v+2*w+1),y[2*v+2*w+2]+=b*Ce,F(y,2*v+2*w+2)}for(v=0;v<m;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=m;v<2*m;v++)y[v]=0;return new a(y,0)};function F(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function j(E,m){this.g=E,this.h=m}function W(E,m){if(O(m))throw Error("division by zero");if(O(E))return new j(_,_);if(A(E))return m=W(R(E),m),new j(R(m.g),R(m.h));if(A(m))return m=W(E,R(m)),new j(R(m.g),m.h);if(30<E.g.length){if(A(E)||A(m))throw Error("slowDivide_ only works with positive integers.");for(var y=I,v=m;0>=v.l(E);)y=re(y),v=re(v);var w=B(y,1),b=B(v,1);for(v=B(v,2),y=B(y,2);!O(v);){var g=b.add(v);0>=g.l(E)&&(w=w.add(y),b=g),v=B(v,1),y=B(y,1)}return m=L(E,w.j(m)),new j(w,m)}for(w=_;0<=E.l(m);){for(y=Math.max(1,Math.floor(E.m()/m.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),b=f(y),g=b.j(m);A(g)||0<g.l(E);)y-=v,b=f(y),g=b.j(m);O(b)&&(b=I),w=w.add(b),E=L(E,g)}return new j(w,E)}n.A=function(E){return W(this,E).h},n.and=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],v=0;v<m;v++)y[v]=this.i(v)&E.i(v);return new a(y,this.h&E.h)},n.or=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],v=0;v<m;v++)y[v]=this.i(v)|E.i(v);return new a(y,this.h|E.h)},n.xor=function(E){for(var m=Math.max(this.g.length,E.g.length),y=[],v=0;v<m;v++)y[v]=this.i(v)^E.i(v);return new a(y,this.h^E.h)};function re(E){for(var m=E.g.length+1,y=[],v=0;v<m;v++)y[v]=E.i(v)<<1|E.i(v-1)>>>31;return new a(y,E.h)}function B(E,m){var y=m>>5;m%=32;for(var v=E.g.length-y,w=[],b=0;b<v;b++)w[b]=0<m?E.i(b+y)>>>m|E.i(b+y+1)<<32-m:E.i(b+y);return new a(w,E.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=d,ac=a}).apply(typeof Fa!="undefined"?Fa:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Ei=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var lc,Rn,cc,Di,hs,uc,hc,dc;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,l,u){return s==Array.prototype||s==Object.prototype||(s[l]=u.value),s};function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ei=="object"&&Ei];for(var l=0;l<s.length;++l){var u=s[l];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var i=t(this);function r(s,l){if(l)e:{var u=i;s=s.split(".");for(var p=0;p<s.length-1;p++){var T=s[p];if(!(T in u))break e;u=u[T]}s=s[s.length-1],p=u[s],l=l(p),l!=p&&l!=null&&e(u,s,{configurable:!0,writable:!0,value:l})}}function o(s,l){s instanceof String&&(s+="");var u=0,p=!1,T={next:function(){if(!p&&u<s.length){var S=u++;return{value:l(S,s[S]),done:!1}}return p=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}r("Array.prototype.values",function(s){return s||function(){return o(this,function(l,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function h(s){var l=typeof s;return l=l!="object"?l:s?Array.isArray(s)?"array":l:"null",l=="array"||l=="object"&&typeof s.length=="number"}function f(s){var l=typeof s;return l=="object"&&s!=null||l=="function"}function d(s,l,u){return s.call.apply(s.bind,arguments)}function _(s,l,u){if(!s)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,p),s.apply(l,T)}}return function(){return s.apply(l,arguments)}}function I(s,l,u){return I=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:_,I.apply(null,arguments)}function C(s,l){var u=Array.prototype.slice.call(arguments,1);return function(){var p=u.slice();return p.push.apply(p,arguments),s.apply(this,p)}}function O(s,l){function u(){}u.prototype=l.prototype,s.aa=l.prototype,s.prototype=new u,s.prototype.constructor=s,s.Qb=function(p,T,S){for(var D=Array(arguments.length-2),K=2;K<arguments.length;K++)D[K-2]=arguments[K];return l.prototype[T].apply(p,D)}}function A(s){const l=s.length;if(0<l){const u=Array(l);for(let p=0;p<l;p++)u[p]=s[p];return u}return[]}function R(s,l){for(let u=1;u<arguments.length;u++){const p=arguments[u];if(h(p)){const T=s.length||0,S=p.length||0;s.length=T+S;for(let D=0;D<S;D++)s[T+D]=p[D]}else s.push(p)}}class L{constructor(l,u){this.i=l,this.j=u,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function F(s){return/^[\s\xa0]*$/.test(s)}function j(){var s=c.navigator;return s&&(s=s.userAgent)?s:""}function W(s){return W[" "](s),s}W[" "]=function(){};var re=j().indexOf("Gecko")!=-1&&!(j().toLowerCase().indexOf("webkit")!=-1&&j().indexOf("Edge")==-1)&&!(j().indexOf("Trident")!=-1||j().indexOf("MSIE")!=-1)&&j().indexOf("Edge")==-1;function B(s,l,u){for(const p in s)l.call(u,s[p],p,s)}function E(s,l){for(const u in s)l.call(void 0,s[u],u,s)}function m(s){const l={};for(const u in s)l[u]=s[u];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(s,l){let u,p;for(let T=1;T<arguments.length;T++){p=arguments[T];for(u in p)s[u]=p[u];for(let S=0;S<y.length;S++)u=y[S],Object.prototype.hasOwnProperty.call(p,u)&&(s[u]=p[u])}}function w(s){var l=1;s=s.split(":");const u=[];for(;0<l&&s.length;)u.push(s.shift()),l--;return s.length&&u.push(s.join(":")),u}function b(s){c.setTimeout(()=>{throw s},0)}function g(){var s=Ir;let l=null;return s.g&&(l=s.g,s.g=s.g.next,s.g||(s.h=null),l.next=null),l}class Ce{constructor(){this.h=this.g=null}add(l,u){const p=ne.get();p.set(l,u),this.h?this.h.next=p:this.g=p,this.h=p}}var ne=new L(()=>new Zn,s=>s.reset());class Zn{constructor(){this.next=this.g=this.h=null}set(l,u){this.h=l,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let an,ln=!1,Ir=new Ce,lo=()=>{const s=c.Promise.resolve(void 0);an=()=>{s.then(vu)}};var vu=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(u){b(u)}var l=ne;l.j(s),100>l.h&&(l.h++,s.next=l.g,l.g=s)}ln=!1};function Ye(){this.s=this.s,this.C=this.C}Ye.prototype.s=!1,Ye.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ye.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function pe(s,l){this.type=s,this.g=this.target=l,this.defaultPrevented=!1}pe.prototype.h=function(){this.defaultPrevented=!0};var Eu=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,l=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const u=()=>{};c.addEventListener("test",u,l),c.removeEventListener("test",u,l)}catch{}return s}();function cn(s,l){if(pe.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var u=this.type=s.type,p=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=l,l=s.relatedTarget){if(re){e:{try{W(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else u=="mouseover"?l=s.fromElement:u=="mouseout"&&(l=s.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:wu[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&cn.aa.h.call(this)}}O(cn,pe);var wu={2:"touch",3:"pen",4:"mouse"};cn.prototype.h=function(){cn.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var ei="closure_listenable_"+(1e6*Math.random()|0),Iu=0;function Tu(s,l,u,p,T){this.listener=s,this.proxy=null,this.src=l,this.type=u,this.capture=!!p,this.ha=T,this.key=++Iu,this.da=this.fa=!1}function ti(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function ni(s){this.src=s,this.g={},this.h=0}ni.prototype.add=function(s,l,u,p,T){var S=s.toString();s=this.g[S],s||(s=this.g[S]=[],this.h++);var D=br(s,l,p,T);return-1<D?(l=s[D],u||(l.fa=!1)):(l=new Tu(l,this.src,S,!!p,T),l.fa=u,s.push(l)),l};function Tr(s,l){var u=l.type;if(u in s.g){var p=s.g[u],T=Array.prototype.indexOf.call(p,l,void 0),S;(S=0<=T)&&Array.prototype.splice.call(p,T,1),S&&(ti(l),s.g[u].length==0&&(delete s.g[u],s.h--))}}function br(s,l,u,p){for(var T=0;T<s.length;++T){var S=s[T];if(!S.da&&S.listener==l&&S.capture==!!u&&S.ha==p)return T}return-1}var Ar="closure_lm_"+(1e6*Math.random()|0),Sr={};function co(s,l,u,p,T){if(Array.isArray(l)){for(var S=0;S<l.length;S++)co(s,l[S],u,p,T);return null}return u=fo(u),s&&s[ei]?s.K(l,u,f(p)?!!p.capture:!1,T):bu(s,l,u,!1,p,T)}function bu(s,l,u,p,T,S){if(!l)throw Error("Invalid event type");var D=f(T)?!!T.capture:!!T,K=Pr(s);if(K||(s[Ar]=K=new ni(s)),u=K.add(l,u,p,D,S),u.proxy)return u;if(p=Au(),u.proxy=p,p.src=s,p.listener=u,s.addEventListener)Eu||(T=D),T===void 0&&(T=!1),s.addEventListener(l.toString(),p,T);else if(s.attachEvent)s.attachEvent(ho(l.toString()),p);else if(s.addListener&&s.removeListener)s.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Au(){function s(u){return l.call(s.src,s.listener,u)}const l=Su;return s}function uo(s,l,u,p,T){if(Array.isArray(l))for(var S=0;S<l.length;S++)uo(s,l[S],u,p,T);else p=f(p)?!!p.capture:!!p,u=fo(u),s&&s[ei]?(s=s.i,l=String(l).toString(),l in s.g&&(S=s.g[l],u=br(S,u,p,T),-1<u&&(ti(S[u]),Array.prototype.splice.call(S,u,1),S.length==0&&(delete s.g[l],s.h--)))):s&&(s=Pr(s))&&(l=s.g[l.toString()],s=-1,l&&(s=br(l,u,p,T)),(u=-1<s?l[s]:null)&&Rr(u))}function Rr(s){if(typeof s!="number"&&s&&!s.da){var l=s.src;if(l&&l[ei])Tr(l.i,s);else{var u=s.type,p=s.proxy;l.removeEventListener?l.removeEventListener(u,p,s.capture):l.detachEvent?l.detachEvent(ho(u),p):l.addListener&&l.removeListener&&l.removeListener(p),(u=Pr(l))?(Tr(u,s),u.h==0&&(u.src=null,l[Ar]=null)):ti(s)}}}function ho(s){return s in Sr?Sr[s]:Sr[s]="on"+s}function Su(s,l){if(s.da)s=!0;else{l=new cn(l,this);var u=s.listener,p=s.ha||s.src;s.fa&&Rr(s),s=u.call(p,l)}return s}function Pr(s){return s=s[Ar],s instanceof ni?s:null}var kr="__closure_events_fn_"+(1e9*Math.random()>>>0);function fo(s){return typeof s=="function"?s:(s[kr]||(s[kr]=function(l){return s.handleEvent(l)}),s[kr])}function me(){Ye.call(this),this.i=new ni(this),this.M=this,this.F=null}O(me,Ye),me.prototype[ei]=!0,me.prototype.removeEventListener=function(s,l,u,p){uo(this,s,l,u,p)};function Te(s,l){var u,p=s.F;if(p)for(u=[];p;p=p.F)u.push(p);if(s=s.M,p=l.type||l,typeof l=="string")l=new pe(l,s);else if(l instanceof pe)l.target=l.target||s;else{var T=l;l=new pe(p,s),v(l,T)}if(T=!0,u)for(var S=u.length-1;0<=S;S--){var D=l.g=u[S];T=ii(D,p,!0,l)&&T}if(D=l.g=s,T=ii(D,p,!0,l)&&T,T=ii(D,p,!1,l)&&T,u)for(S=0;S<u.length;S++)D=l.g=u[S],T=ii(D,p,!1,l)&&T}me.prototype.N=function(){if(me.aa.N.call(this),this.i){var s=this.i,l;for(l in s.g){for(var u=s.g[l],p=0;p<u.length;p++)ti(u[p]);delete s.g[l],s.h--}}this.F=null},me.prototype.K=function(s,l,u,p){return this.i.add(String(s),l,!1,u,p)},me.prototype.L=function(s,l,u,p){return this.i.add(String(s),l,!0,u,p)};function ii(s,l,u,p){if(l=s.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,S=0;S<l.length;++S){var D=l[S];if(D&&!D.da&&D.capture==u){var K=D.listener,le=D.ha||D.src;D.fa&&Tr(s.i,D),T=K.call(le,p)!==!1&&T}}return T&&!p.defaultPrevented}function po(s,l,u){if(typeof s=="function")u&&(s=I(s,u));else if(s&&typeof s.handleEvent=="function")s=I(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(s,l||0)}function mo(s){s.g=po(()=>{s.g=null,s.i&&(s.i=!1,mo(s))},s.l);const l=s.h;s.h=null,s.m.apply(null,l)}class Ru extends Ye{constructor(l,u){super(),this.m=l,this.l=u,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:mo(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function un(s){Ye.call(this),this.h=s,this.g={}}O(un,Ye);var go=[];function yo(s){B(s.g,function(l,u){this.g.hasOwnProperty(u)&&Rr(l)},s),s.g={}}un.prototype.N=function(){un.aa.N.call(this),yo(this)},un.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Cr=c.JSON.stringify,Pu=c.JSON.parse,ku=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function Nr(){}Nr.prototype.h=null;function _o(s){return s.h||(s.h=s.i())}function vo(){}var hn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Dr(){pe.call(this,"d")}O(Dr,pe);function Or(){pe.call(this,"c")}O(Or,pe);var yt={},Eo=null;function ri(){return Eo=Eo||new me}yt.La="serverreachability";function wo(s){pe.call(this,yt.La,s)}O(wo,pe);function dn(s){const l=ri();Te(l,new wo(l))}yt.STAT_EVENT="statevent";function Io(s,l){pe.call(this,yt.STAT_EVENT,s),this.stat=l}O(Io,pe);function be(s){const l=ri();Te(l,new Io(l,s))}yt.Ma="timingevent";function To(s,l){pe.call(this,yt.Ma,s),this.size=l}O(To,pe);function fn(s,l){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},l)}function pn(){this.g=!0}pn.prototype.xa=function(){this.g=!1};function Cu(s,l,u,p,T,S){s.info(function(){if(s.g)if(S)for(var D="",K=S.split("&"),le=0;le<K.length;le++){var G=K[le].split("=");if(1<G.length){var ge=G[0];G=G[1];var ye=ge.split("_");D=2<=ye.length&&ye[1]=="type"?D+(ge+"="+G+"&"):D+(ge+"=redacted&")}}else D=null;else D=S;return"XMLHTTP REQ ("+p+") [attempt "+T+"]: "+l+`
`+u+`
`+D})}function Nu(s,l,u,p,T,S,D){s.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+T+"]: "+l+`
`+u+`
`+S+" "+D})}function Dt(s,l,u,p){s.info(function(){return"XMLHTTP TEXT ("+l+"): "+Ou(s,u)+(p?" "+p:"")})}function Du(s,l){s.info(function(){return"TIMEOUT: "+l})}pn.prototype.info=function(){};function Ou(s,l){if(!s.g)return l;if(!l)return null;try{var u=JSON.parse(l);if(u){for(s=0;s<u.length;s++)if(Array.isArray(u[s])){var p=u[s];if(!(2>p.length)){var T=p[1];if(Array.isArray(T)&&!(1>T.length)){var S=T[0];if(S!="noop"&&S!="stop"&&S!="close")for(var D=1;D<T.length;D++)T[D]=""}}}}return Cr(u)}catch{return l}}var si={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},bo={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Lr;function oi(){}O(oi,Nr),oi.prototype.g=function(){return new XMLHttpRequest},oi.prototype.i=function(){return{}},Lr=new oi;function Ze(s,l,u,p){this.j=s,this.i=l,this.l=u,this.R=p||1,this.U=new un(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ao}function Ao(){this.i=null,this.g="",this.h=!1}var So={},Vr={};function Mr(s,l,u){s.L=1,s.v=ui(Be(l)),s.m=u,s.P=!0,Ro(s,null)}function Ro(s,l){s.F=Date.now(),ai(s),s.A=Be(s.v);var u=s.A,p=s.R;Array.isArray(p)||(p=[String(p)]),jo(u.i,"t",p),s.C=0,u=s.j.J,s.h=new Ao,s.g=sa(s.j,u?l:null,!s.m),0<s.O&&(s.M=new Ru(I(s.Y,s,s.g),s.O)),l=s.U,u=s.g,p=s.ca;var T="readystatechange";Array.isArray(T)||(T&&(go[0]=T.toString()),T=go);for(var S=0;S<T.length;S++){var D=co(u,T[S],p||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,l)):(s.u="GET",s.g.ea(s.A,s.u,null,l)),dn(),Cu(s.i,s.u,s.A,s.l,s.R,s.m)}Ze.prototype.ca=function(s){s=s.target;const l=this.M;l&&qe(s)==3?l.j():this.Y(s)},Ze.prototype.Y=function(s){try{if(s==this.g)e:{const ye=qe(this.g);var l=this.g.Ba();const Vt=this.g.Z();if(!(3>ye)&&(ye!=3||this.g&&(this.h.h||this.g.oa()||Ko(this.g)))){this.J||ye!=4||l==7||(l==8||0>=Vt?dn(3):dn(2)),xr(this);var u=this.g.Z();this.X=u;t:if(Po(this)){var p=Ko(this.g);s="";var T=p.length,S=qe(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){_t(this),mn(this);var D="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,s+=this.h.i.decode(p[l],{stream:!(S&&l==T-1)});p.length=0,this.h.g+=s,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=u==200,Nu(this.i,this.u,this.A,this.l,this.R,ye,u),this.o){if(this.T&&!this.K){t:{if(this.g){var K,le=this.g;if((K=le.g?le.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!F(K)){var G=K;break t}}G=null}if(u=G)Dt(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ur(this,u);else{this.o=!1,this.s=3,be(12),_t(this),mn(this);break e}}if(this.P){u=!0;let De;for(;!this.J&&this.C<D.length;)if(De=Lu(this,D),De==Vr){ye==4&&(this.s=4,be(14),u=!1),Dt(this.i,this.l,null,"[Incomplete Response]");break}else if(De==So){this.s=4,be(15),Dt(this.i,this.l,D,"[Invalid Chunk]"),u=!1;break}else Dt(this.i,this.l,De,null),Ur(this,De);if(Po(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ye!=4||D.length!=0||this.h.h||(this.s=1,be(16),u=!1),this.o=this.o&&u,!u)Dt(this.i,this.l,D,"[Invalid Chunked Response]"),_t(this),mn(this);else if(0<D.length&&!this.W){this.W=!0;var ge=this.j;ge.g==this&&ge.ba&&!ge.M&&(ge.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),Hr(ge),ge.M=!0,be(11))}}else Dt(this.i,this.l,D,null),Ur(this,D);ye==4&&_t(this),this.o&&!this.J&&(ye==4?ta(this.j,this):(this.o=!1,ai(this)))}else Xu(this.g),u==400&&0<D.indexOf("Unknown SID")?(this.s=3,be(12)):(this.s=0,be(13)),_t(this),mn(this)}}}catch{}finally{}};function Po(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function Lu(s,l){var u=s.C,p=l.indexOf(`
`,u);return p==-1?Vr:(u=Number(l.substring(u,p)),isNaN(u)?So:(p+=1,p+u>l.length?Vr:(l=l.slice(p,p+u),s.C=p+u,l)))}Ze.prototype.cancel=function(){this.J=!0,_t(this)};function ai(s){s.S=Date.now()+s.I,ko(s,s.I)}function ko(s,l){if(s.B!=null)throw Error("WatchDog timer not null");s.B=fn(I(s.ba,s),l)}function xr(s){s.B&&(c.clearTimeout(s.B),s.B=null)}Ze.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(Du(this.i,this.A),this.L!=2&&(dn(),be(17)),_t(this),this.s=2,mn(this)):ko(this,this.S-s)};function mn(s){s.j.G==0||s.J||ta(s.j,s)}function _t(s){xr(s);var l=s.M;l&&typeof l.ma=="function"&&l.ma(),s.M=null,yo(s.U),s.g&&(l=s.g,s.g=null,l.abort(),l.ma())}function Ur(s,l){try{var u=s.j;if(u.G!=0&&(u.g==s||Fr(u.h,s))){if(!s.K&&Fr(u.h,s)&&u.G==3){try{var p=u.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var T=p;if(T[0]==0){e:if(!u.u){if(u.g)if(u.g.F+3e3<s.F)gi(u),pi(u);else break e;qr(u),be(18)}}else u.za=T[1],0<u.za-u.T&&37500>T[2]&&u.F&&u.v==0&&!u.C&&(u.C=fn(I(u.Za,u),6e3));if(1>=Do(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else Et(u,11)}else if((s.K||u.g==s)&&gi(u),!F(l))for(T=u.Da.g.parse(l),l=0;l<T.length;l++){let G=T[l];if(u.T=G[0],G=G[1],u.G==2)if(G[0]=="c"){u.K=G[1],u.ia=G[2];const ge=G[3];ge!=null&&(u.la=ge,u.j.info("VER="+u.la));const ye=G[4];ye!=null&&(u.Aa=ye,u.j.info("SVER="+u.Aa));const Vt=G[5];Vt!=null&&typeof Vt=="number"&&0<Vt&&(p=1.5*Vt,u.L=p,u.j.info("backChannelRequestTimeoutMs_="+p)),p=u;const De=s.g;if(De){const _i=De.g?De.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(_i){var S=p.h;S.g||_i.indexOf("spdy")==-1&&_i.indexOf("quic")==-1&&_i.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&($r(S,S.h),S.h=null))}if(p.D){const zr=De.g?De.g.getResponseHeader("X-HTTP-Session-Id"):null;zr&&(p.ya=zr,X(p.I,p.D,zr))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-s.F,u.j.info("Handshake RTT: "+u.R+"ms")),p=u;var D=s;if(p.qa=ra(p,p.J?p.ia:null,p.W),D.K){Oo(p.h,D);var K=D,le=p.L;le&&(K.I=le),K.B&&(xr(K),ai(K)),p.g=D}else Zo(p);0<u.i.length&&mi(u)}else G[0]!="stop"&&G[0]!="close"||Et(u,7);else u.G==3&&(G[0]=="stop"||G[0]=="close"?G[0]=="stop"?Et(u,7):Br(u):G[0]!="noop"&&u.l&&u.l.ta(G),u.v=0)}}dn(4)}catch{}}var Vu=class{constructor(s,l){this.g=s,this.map=l}};function Co(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function No(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Do(s){return s.h?1:s.g?s.g.size:0}function Fr(s,l){return s.h?s.h==l:s.g?s.g.has(l):!1}function $r(s,l){s.g?s.g.add(l):s.h=l}function Oo(s,l){s.h&&s.h==l?s.h=null:s.g&&s.g.has(l)&&s.g.delete(l)}Co.prototype.cancel=function(){if(this.i=Lo(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Lo(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let l=s.i;for(const u of s.g.values())l=l.concat(u.D);return l}return A(s.i)}function Mu(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map!="undefined"&&s instanceof Map||typeof Set!="undefined"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var l=[],u=s.length,p=0;p<u;p++)l.push(s[p]);return l}l=[],u=0;for(p in s)l[u++]=s[p];return l}function xu(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map!="undefined"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set!="undefined"&&s instanceof Set)){if(h(s)||typeof s=="string"){var l=[];s=s.length;for(var u=0;u<s;u++)l.push(u);return l}l=[],u=0;for(const p in s)l[u++]=p;return l}}}function Vo(s,l){if(s.forEach&&typeof s.forEach=="function")s.forEach(l,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,l,void 0);else for(var u=xu(s),p=Mu(s),T=p.length,S=0;S<T;S++)l.call(void 0,p[S],u&&u[S],s)}var Mo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Uu(s,l){if(s){s=s.split("&");for(var u=0;u<s.length;u++){var p=s[u].indexOf("="),T=null;if(0<=p){var S=s[u].substring(0,p);T=s[u].substring(p+1)}else S=s[u];l(S,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function vt(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof vt){this.h=s.h,li(this,s.j),this.o=s.o,this.g=s.g,ci(this,s.s),this.l=s.l;var l=s.i,u=new _n;u.i=l.i,l.g&&(u.g=new Map(l.g),u.h=l.h),xo(this,u),this.m=s.m}else s&&(l=String(s).match(Mo))?(this.h=!1,li(this,l[1]||"",!0),this.o=gn(l[2]||""),this.g=gn(l[3]||"",!0),ci(this,l[4]),this.l=gn(l[5]||"",!0),xo(this,l[6]||"",!0),this.m=gn(l[7]||"")):(this.h=!1,this.i=new _n(null,this.h))}vt.prototype.toString=function(){var s=[],l=this.j;l&&s.push(yn(l,Uo,!0),":");var u=this.g;return(u||l=="file")&&(s.push("//"),(l=this.o)&&s.push(yn(l,Uo,!0),"@"),s.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&s.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&s.push("/"),s.push(yn(u,u.charAt(0)=="/"?ju:$u,!0))),(u=this.i.toString())&&s.push("?",u),(u=this.m)&&s.push("#",yn(u,qu)),s.join("")};function Be(s){return new vt(s)}function li(s,l,u){s.j=u?gn(l,!0):l,s.j&&(s.j=s.j.replace(/:$/,""))}function ci(s,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);s.s=l}else s.s=null}function xo(s,l,u){l instanceof _n?(s.i=l,Hu(s.i,s.h)):(u||(l=yn(l,Bu)),s.i=new _n(l,s.h))}function X(s,l,u){s.i.set(l,u)}function ui(s){return X(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function gn(s,l){return s?l?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function yn(s,l,u){return typeof s=="string"?(s=encodeURI(s).replace(l,Fu),u&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Fu(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Uo=/[#\/\?@]/g,$u=/[#\?:]/g,ju=/[#\?]/g,Bu=/[#\?@]/g,qu=/#/g;function _n(s,l){this.h=this.g=null,this.i=s||null,this.j=!!l}function et(s){s.g||(s.g=new Map,s.h=0,s.i&&Uu(s.i,function(l,u){s.add(decodeURIComponent(l.replace(/\+/g," ")),u)}))}n=_n.prototype,n.add=function(s,l){et(this),this.i=null,s=Ot(this,s);var u=this.g.get(s);return u||this.g.set(s,u=[]),u.push(l),this.h+=1,this};function Fo(s,l){et(s),l=Ot(s,l),s.g.has(l)&&(s.i=null,s.h-=s.g.get(l).length,s.g.delete(l))}function $o(s,l){return et(s),l=Ot(s,l),s.g.has(l)}n.forEach=function(s,l){et(this),this.g.forEach(function(u,p){u.forEach(function(T){s.call(l,T,p,this)},this)},this)},n.na=function(){et(this);const s=Array.from(this.g.values()),l=Array.from(this.g.keys()),u=[];for(let p=0;p<l.length;p++){const T=s[p];for(let S=0;S<T.length;S++)u.push(l[p])}return u},n.V=function(s){et(this);let l=[];if(typeof s=="string")$o(this,s)&&(l=l.concat(this.g.get(Ot(this,s))));else{s=Array.from(this.g.values());for(let u=0;u<s.length;u++)l=l.concat(s[u])}return l},n.set=function(s,l){return et(this),this.i=null,s=Ot(this,s),$o(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[l]),this.h+=1,this},n.get=function(s,l){return s?(s=this.V(s),0<s.length?String(s[0]):l):l};function jo(s,l,u){Fo(s,l),0<u.length&&(s.i=null,s.g.set(Ot(s,l),A(u)),s.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],l=Array.from(this.g.keys());for(var u=0;u<l.length;u++){var p=l[u];const S=encodeURIComponent(String(p)),D=this.V(p);for(p=0;p<D.length;p++){var T=S;D[p]!==""&&(T+="="+encodeURIComponent(String(D[p]))),s.push(T)}}return this.i=s.join("&")};function Ot(s,l){return l=String(l),s.j&&(l=l.toLowerCase()),l}function Hu(s,l){l&&!s.j&&(et(s),s.i=null,s.g.forEach(function(u,p){var T=p.toLowerCase();p!=T&&(Fo(this,p),jo(this,T,u))},s)),s.j=l}function zu(s,l){const u=new pn;if(c.Image){const p=new Image;p.onload=C(tt,u,"TestLoadImage: loaded",!0,l,p),p.onerror=C(tt,u,"TestLoadImage: error",!1,l,p),p.onabort=C(tt,u,"TestLoadImage: abort",!1,l,p),p.ontimeout=C(tt,u,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=s}else l(!1)}function Gu(s,l){const u=new pn,p=new AbortController,T=setTimeout(()=>{p.abort(),tt(u,"TestPingServer: timeout",!1,l)},1e4);fetch(s,{signal:p.signal}).then(S=>{clearTimeout(T),S.ok?tt(u,"TestPingServer: ok",!0,l):tt(u,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),tt(u,"TestPingServer: error",!1,l)})}function tt(s,l,u,p,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),p(u)}catch{}}function Wu(){this.g=new ku}function Ku(s,l,u){const p=u||"";try{Vo(s,function(T,S){let D=T;f(T)&&(D=Cr(T)),l.push(p+S+"="+encodeURIComponent(D))})}catch(T){throw l.push(p+"type="+encodeURIComponent("_badmap")),T}}function hi(s){this.l=s.Ub||null,this.j=s.eb||!1}O(hi,Nr),hi.prototype.g=function(){return new di(this.l,this.j)},hi.prototype.i=function(s){return function(){return s}}({});function di(s,l){me.call(this),this.D=s,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}O(di,me),n=di.prototype,n.open=function(s,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=l,this.readyState=1,En(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(l.body=s),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,vn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,En(this)),this.g&&(this.readyState=3,En(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Bo(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Bo(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var l=s.value?s.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!s.done}))&&(this.response=this.responseText+=l)}s.done?vn(this):En(this),this.readyState==3&&Bo(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,vn(this))},n.Qa=function(s){this.g&&(this.response=s,vn(this))},n.ga=function(){this.g&&vn(this)};function vn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,En(s)}n.setRequestHeader=function(s,l){this.u.append(s,l)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],l=this.h.entries();for(var u=l.next();!u.done;)u=u.value,s.push(u[0]+": "+u[1]),u=l.next();return s.join(`\r
`)};function En(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(di.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function qo(s){let l="";return B(s,function(u,p){l+=p,l+=":",l+=u,l+=`\r
`}),l}function jr(s,l,u){e:{for(p in u){var p=!1;break e}p=!0}p||(u=qo(u),typeof s=="string"?u!=null&&encodeURIComponent(String(u)):X(s,l,u))}function Z(s){me.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}O(Z,me);var Qu=/^https?$/i,Ju=["POST","PUT"];n=Z.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,l,u,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);l=l?l.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Lr.g(),this.v=this.o?_o(this.o):_o(Lr),this.g.onreadystatechange=I(this.Ea,this);try{this.B=!0,this.g.open(l,String(s),!0),this.B=!1}catch(S){Ho(this,S);return}if(s=u||"",u=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var T in p)u.set(T,p[T]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const S of p.keys())u.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(u.keys()).find(S=>S.toLowerCase()=="content-type"),T=c.FormData&&s instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Ju,l,void 0))||p||T||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,D]of u)this.g.setRequestHeader(S,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Wo(this),this.u=!0,this.g.send(s),this.u=!1}catch(S){Ho(this,S)}};function Ho(s,l){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=l,s.m=5,zo(s),fi(s)}function zo(s){s.A||(s.A=!0,Te(s,"complete"),Te(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,Te(this,"complete"),Te(this,"abort"),fi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),fi(this,!0)),Z.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Go(this):this.bb())},n.bb=function(){Go(this)};function Go(s){if(s.h&&typeof a!="undefined"&&(!s.v[1]||qe(s)!=4||s.Z()!=2)){if(s.u&&qe(s)==4)po(s.Ea,0,s);else if(Te(s,"readystatechange"),qe(s)==4){s.h=!1;try{const D=s.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var u;if(!(u=l)){var p;if(p=D===0){var T=String(s.D).match(Mo)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),p=!Qu.test(T?T.toLowerCase():"")}u=p}if(u)Te(s,"complete"),Te(s,"success");else{s.m=6;try{var S=2<qe(s)?s.g.statusText:""}catch{S=""}s.l=S+" ["+s.Z()+"]",zo(s)}}finally{fi(s)}}}}function fi(s,l){if(s.g){Wo(s);const u=s.g,p=s.v[0]?()=>{}:null;s.g=null,s.v=null,l||Te(s,"ready");try{u.onreadystatechange=p}catch{}}}function Wo(s){s.I&&(c.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function qe(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<qe(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var l=this.g.responseText;return s&&l.indexOf(s)==0&&(l=l.substring(s.length)),Pu(l)}};function Ko(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Xu(s){const l={};s=(s.g&&2<=qe(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<s.length;p++){if(F(s[p]))continue;var u=w(s[p]);const T=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const S=l[T]||[];l[T]=S,S.push(u)}E(l,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function wn(s,l,u){return u&&u.internalChannelParams&&u.internalChannelParams[s]||l}function Qo(s){this.Aa=0,this.i=[],this.j=new pn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=wn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=wn("baseRetryDelayMs",5e3,s),this.cb=wn("retryDelaySeedMs",1e4,s),this.Wa=wn("forwardChannelMaxRetries",2,s),this.wa=wn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new Co(s&&s.concurrentRequestLimit),this.Da=new Wu,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Qo.prototype,n.la=8,n.G=1,n.connect=function(s,l,u,p){be(0),this.W=s,this.H=l||{},u&&p!==void 0&&(this.H.OSID=u,this.H.OAID=p),this.F=this.X,this.I=ra(this,null,this.W),mi(this)};function Br(s){if(Jo(s),s.G==3){var l=s.U++,u=Be(s.I);if(X(u,"SID",s.K),X(u,"RID",l),X(u,"TYPE","terminate"),In(s,u),l=new Ze(s,s.j,l),l.L=2,l.v=ui(Be(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=l.v,u=!0),u||(l.g=sa(l.j,null),l.g.ea(l.v)),l.F=Date.now(),ai(l)}ia(s)}function pi(s){s.g&&(Hr(s),s.g.cancel(),s.g=null)}function Jo(s){pi(s),s.u&&(c.clearTimeout(s.u),s.u=null),gi(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&c.clearTimeout(s.s),s.s=null)}function mi(s){if(!No(s.h)&&!s.s){s.s=!0;var l=s.Ga;an||lo(),ln||(an(),ln=!0),Ir.add(l,s),s.B=0}}function Yu(s,l){return Do(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=l.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=fn(I(s.Ga,s,l),na(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const T=new Ze(this,this.j,s);let S=this.o;if(this.S&&(S?(S=m(S),v(S,this.S)):S=this.S),this.m!==null||this.O||(T.H=S,S=null),this.P)e:{for(var l=0,u=0;u<this.i.length;u++){t:{var p=this.i[u];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=u;break e}if(l===4096||u===this.i.length-1){l=u+1;break e}}l=1e3}else l=1e3;l=Yo(this,T,l),u=Be(this.I),X(u,"RID",s),X(u,"CVER",22),this.D&&X(u,"X-HTTP-Session-Id",this.D),In(this,u),S&&(this.O?l="headers="+encodeURIComponent(String(qo(S)))+"&"+l:this.m&&jr(u,this.m,S)),$r(this.h,T),this.Ua&&X(u,"TYPE","init"),this.P?(X(u,"$req",l),X(u,"SID","null"),T.T=!0,Mr(T,u,null)):Mr(T,u,l),this.G=2}}else this.G==3&&(s?Xo(this,s):this.i.length==0||No(this.h)||Xo(this))};function Xo(s,l){var u;l?u=l.l:u=s.U++;const p=Be(s.I);X(p,"SID",s.K),X(p,"RID",u),X(p,"AID",s.T),In(s,p),s.m&&s.o&&jr(p,s.m,s.o),u=new Ze(s,s.j,u,s.B+1),s.m===null&&(u.H=s.o),l&&(s.i=l.D.concat(s.i)),l=Yo(s,u,1e3),u.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),$r(s.h,u),Mr(u,p,l)}function In(s,l){s.H&&B(s.H,function(u,p){X(l,p,u)}),s.l&&Vo({},function(u,p){X(l,p,u)})}function Yo(s,l,u){u=Math.min(s.i.length,u);var p=s.l?I(s.l.Na,s.l,s):null;e:{var T=s.i;let S=-1;for(;;){const D=["count="+u];S==-1?0<u?(S=T[0].g,D.push("ofs="+S)):S=0:D.push("ofs="+S);let K=!0;for(let le=0;le<u;le++){let G=T[le].g;const ge=T[le].map;if(G-=S,0>G)S=Math.max(0,T[le].g-100),K=!1;else try{Ku(ge,D,"req"+G+"_")}catch{p&&p(ge)}}if(K){p=D.join("&");break e}}}return s=s.i.splice(0,u),l.D=s,p}function Zo(s){if(!s.g&&!s.u){s.Y=1;var l=s.Fa;an||lo(),ln||(an(),ln=!0),Ir.add(l,s),s.v=0}}function qr(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=fn(I(s.Fa,s),na(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,ea(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=fn(I(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,be(10),pi(this),ea(this))};function Hr(s){s.A!=null&&(c.clearTimeout(s.A),s.A=null)}function ea(s){s.g=new Ze(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var l=Be(s.qa);X(l,"RID","rpc"),X(l,"SID",s.K),X(l,"AID",s.T),X(l,"CI",s.F?"0":"1"),!s.F&&s.ja&&X(l,"TO",s.ja),X(l,"TYPE","xmlhttp"),In(s,l),s.m&&s.o&&jr(l,s.m,s.o),s.L&&(s.g.I=s.L);var u=s.g;s=s.ia,u.L=1,u.v=ui(Be(l)),u.m=null,u.P=!0,Ro(u,s)}n.Za=function(){this.C!=null&&(this.C=null,pi(this),qr(this),be(19))};function gi(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function ta(s,l){var u=null;if(s.g==l){gi(s),Hr(s),s.g=null;var p=2}else if(Fr(s.h,l))u=l.D,Oo(s.h,l),p=1;else return;if(s.G!=0){if(l.o)if(p==1){u=l.m?l.m.length:0,l=Date.now()-l.F;var T=s.B;p=ri(),Te(p,new To(p,u)),mi(s)}else Zo(s);else if(T=l.s,T==3||T==0&&0<l.X||!(p==1&&Yu(s,l)||p==2&&qr(s)))switch(u&&0<u.length&&(l=s.h,l.i=l.i.concat(u)),T){case 1:Et(s,5);break;case 4:Et(s,10);break;case 3:Et(s,6);break;default:Et(s,2)}}}function na(s,l){let u=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(u*=2),u*l}function Et(s,l){if(s.j.info("Error code "+l),l==2){var u=I(s.fb,s),p=s.Xa;const T=!p;p=new vt(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||li(p,"https"),ui(p),T?zu(p.toString(),u):Gu(p.toString(),u)}else be(2);s.G=0,s.l&&s.l.sa(l),ia(s),Jo(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),be(2)):(this.j.info("Failed to ping google.com"),be(1))};function ia(s){if(s.G=0,s.ka=[],s.l){const l=Lo(s.h);(l.length!=0||s.i.length!=0)&&(R(s.ka,l),R(s.ka,s.i),s.h.i.length=0,A(s.i),s.i.length=0),s.l.ra()}}function ra(s,l,u){var p=u instanceof vt?Be(u):new vt(u);if(p.g!="")l&&(p.g=l+"."+p.g),ci(p,p.s);else{var T=c.location;p=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var S=new vt(null);p&&li(S,p),l&&(S.g=l),T&&ci(S,T),u&&(S.l=u),p=S}return u=s.D,l=s.ya,u&&l&&X(p,u,l),X(p,"VER",s.la),In(s,p),p}function sa(s,l,u){if(l&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=s.Ca&&!s.pa?new Z(new hi({eb:u})):new Z(s.pa),l.Ha(s.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function oa(){}n=oa.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function yi(){}yi.prototype.g=function(s,l){return new Se(s,l)};function Se(s,l){me.call(this),this.g=new Qo(l),this.l=s,this.h=l&&l.messageUrlParams||null,s=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(s?s["X-WebChannel-Content-Type"]=l.messageContentType:s={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(s?s["X-WebChannel-Client-Profile"]=l.va:s={"X-WebChannel-Client-Profile":l.va}),this.g.S=s,(s=l&&l.Sb)&&!F(s)&&(this.g.m=s),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!F(l)&&(this.g.D=l,s=this.h,s!==null&&l in s&&(s=this.h,l in s&&delete s[l])),this.j=new Lt(this)}O(Se,me),Se.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Se.prototype.close=function(){Br(this.g)},Se.prototype.o=function(s){var l=this.g;if(typeof s=="string"){var u={};u.__data__=s,s=u}else this.u&&(u={},u.__data__=Cr(s),s=u);l.i.push(new Vu(l.Ya++,s)),l.G==3&&mi(l)},Se.prototype.N=function(){this.g.l=null,delete this.j,Br(this.g),delete this.g,Se.aa.N.call(this)};function aa(s){Dr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var l=s.__sm__;if(l){e:{for(const u in l){s=u;break e}s=void 0}(this.i=s)&&(s=this.i,l=l!==null&&s in l?l[s]:void 0),this.data=l}else this.data=s}O(aa,Dr);function la(){Or.call(this),this.status=1}O(la,Or);function Lt(s){this.g=s}O(Lt,oa),Lt.prototype.ua=function(){Te(this.g,"a")},Lt.prototype.ta=function(s){Te(this.g,new aa(s))},Lt.prototype.sa=function(s){Te(this.g,new la)},Lt.prototype.ra=function(){Te(this.g,"b")},yi.prototype.createWebChannel=yi.prototype.g,Se.prototype.send=Se.prototype.o,Se.prototype.open=Se.prototype.m,Se.prototype.close=Se.prototype.close,dc=function(){return new yi},hc=function(){return ri()},uc=yt,hs={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},si.NO_ERROR=0,si.TIMEOUT=8,si.HTTP_ERROR=6,Di=si,bo.COMPLETE="complete",cc=bo,vo.EventType=hn,hn.OPEN="a",hn.CLOSE="b",hn.ERROR="c",hn.MESSAGE="d",me.prototype.listen=me.prototype.K,Rn=vo,Z.prototype.listenOnce=Z.prototype.L,Z.prototype.getLastError=Z.prototype.Ka,Z.prototype.getLastErrorCode=Z.prototype.Ba,Z.prototype.getStatus=Z.prototype.Z,Z.prototype.getResponseJson=Z.prototype.Oa,Z.prototype.getResponseText=Z.prototype.oa,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Ha,lc=Z}).apply(typeof Ei!="undefined"?Ei:typeof self!="undefined"?self:typeof window!="undefined"?window:{});const $a="@firebase/firestore";/**
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
 */let rn="10.14.0";/**
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
 */const Rt=new bs("@firebase/firestore");function Tn(){return Rt.logLevel}function V(n,...e){if(Rt.logLevel<=q.DEBUG){const t=e.map(Ms);Rt.debug(`Firestore (${rn}): ${n}`,...t)}}function Pt(n,...e){if(Rt.logLevel<=q.ERROR){const t=e.map(Ms);Rt.error(`Firestore (${rn}): ${n}`,...t)}}function Wi(n,...e){if(Rt.logLevel<=q.WARN){const t=e.map(Ms);Rt.warn(`Firestore (${rn}): ${n}`,...t)}}function Ms(n){if(typeof n=="string")return n;try{/**
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
 */function H(n="Unexpected state"){const e=`FIRESTORE (${rn}) INTERNAL ASSERTION FAILED: `+n;throw Pt(e),new Error(e)}function te(n,e){n||H()}function J(n,e){return n}/**
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
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class x extends Je{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Tt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class fc{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Gp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ve.UNAUTHENTICATED))}shutdown(){}}class Wp{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Kp{constructor(e){this.t=e,this.currentUser=ve.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){te(this.o===void 0);let i=this.i;const r=h=>this.i!==i?(i=this.i,t(h)):Promise.resolve();let o=new Tt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Tt,e.enqueueRetryable(()=>r(this.currentUser))};const a=()=>{const h=o;e.enqueueRetryable(async()=>{await h.promise,await r(this.currentUser)})},c=h=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Tt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(te(typeof i.accessToken=="string"),new fc(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return te(e===null||typeof e=="string"),new ve(e)}}class Qp{constructor(e,t,i){this.l=e,this.h=t,this.P=i,this.type="FirstParty",this.user=ve.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Jp{constructor(e,t,i){this.l=e,this.h=t,this.P=i}getToken(){return Promise.resolve(new Qp(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ve.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Xp{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Yp{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){te(this.o===void 0);const i=o=>{o.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>i(o))};const r=o=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>r(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?r(o):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(te(typeof t.token=="string"),this.R=t.token,new Xp(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Zp(n){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
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
 */class pc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let i="";for(;i.length<20;){const r=Zp(40);for(let o=0;o<r.length;++o)i.length<20&&r[o]<t&&(i+=e.charAt(r[o]%e.length))}return i}}function Q(n,e){return n<e?-1:n>e?1:0}function Kt(n,e,t){return n.length===e.length&&n.every((i,r)=>t(i,e[r]))}/**
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
 */class ae{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new x(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new x(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new x(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new x(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ae.fromMillis(Date.now())}static fromDate(e){return ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor(1e6*(e-1e3*t));return new ae(t,i)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class Y{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Y(e)}static min(){return new Y(new ae(0,0))}static max(){return new Y(new ae(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Mn{constructor(e,t,i){t===void 0?t=0:t>e.length&&H(),i===void 0?i=e.length-t:i>e.length-t&&H(),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return Mn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Mn?e.forEach(i=>{t.push(i)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let r=0;r<i;r++){const o=e.get(r),a=t.get(r);if(o<a)return-1;if(o>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ee extends Mn{construct(e,t,i){return new ee(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new x(k.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter(r=>r.length>0))}return new ee(t)}static emptyPath(){return new ee([])}}const em=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class he extends Mn{construct(e,t,i){return new he(e,t,i)}static isValidIdentifier(e){return em.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),he.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new he(["__name__"])}static fromServerFormat(e){const t=[];let i="",r=0;const o=()=>{if(i.length===0)throw new x(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let a=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new x(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[r+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new x(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=h,r+=2}else c==="`"?(a=!a,r++):c!=="."||a?(i+=c,r++):(o(),r++)}if(o(),a)throw new x(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new he(t)}static emptyPath(){return new he([])}}/**
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
 */class ${constructor(e){this.path=e}static fromPath(e){return new $(ee.fromString(e))}static fromName(e){return new $(ee.fromString(e).popFirst(5))}static empty(){return new $(ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new $(new ee(e.slice()))}}function tm(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,r=Y.fromTimestamp(i===1e9?new ae(t+1,0):new ae(t,i));return new dt(r,$.empty(),e)}function nm(n){return new dt(n.readTime,n.key,-1)}class dt{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new dt(Y.min(),$.empty(),-1)}static max(){return new dt(Y.max(),$.empty(),-1)}}function im(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=$.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
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
 */const rm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class sm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function mc(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==rm)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&H(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((i,r)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(i,r)},this.catchCallback=o=>{this.wrapFailure(t,o).next(i,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,i)=>{t(e)})}static reject(e){return new P((t,i)=>{i(e)})}static waitFor(e){return new P((t,i)=>{let r=0,o=0,a=!1;e.forEach(c=>{++r,c.next(()=>{++o,a&&o===r&&t()},h=>i(h))}),a=!0,o===r&&t()})}static or(e){let t=P.resolve(!1);for(const i of e)t=t.next(r=>r?P.resolve(r):i());return t}static forEach(e,t){const i=[];return e.forEach((r,o)=>{i.push(t.call(this,r,o))}),this.waitFor(i)}static mapArray(e,t){return new P((i,r)=>{const o=e.length,a=new Array(o);let c=0;for(let h=0;h<o;h++){const f=h;t(e[f]).next(d=>{a[f]=d,++c,c===o&&i(a)},d=>r(d))}})}static doWhile(e,t){return new P((i,r)=>{const o=()=>{e()===!0?t().next(()=>{o()},r):i()};o()})}}function om(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function lr(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class gc{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ie(i),this.se=i=>t.writeSequenceNumber(i))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}gc.oe=-1;function xs(n){return n==null}function Ki(n){return n===0&&1/n==-1/0}function am(n){return typeof n=="number"&&Number.isInteger(n)&&!Ki(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */function ja(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function sn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function yc(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Ae{constructor(e,t){this.comparator=e,this.root=t||ce.EMPTY}insert(e,t){return new Ae(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ce.BLACK,null,null))}remove(e){return new Ae(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ce.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const r=this.comparator(e,i.key);if(r===0)return t+i.left.size;r<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,i)=>(e(t,i),!1))}toString(){const e=[];return this.inorderTraversal((t,i)=>(e.push(`${t}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new wi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new wi(this.root,e,this.comparator,!1)}getReverseIterator(){return new wi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new wi(this.root,e,this.comparator,!0)}}class wi{constructor(e,t,i,r){this.isReverse=r,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?i(e.key,t):1,t&&r&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ce{constructor(e,t,i,r,o){this.key=e,this.value=t,this.color=i!=null?i:ce.RED,this.left=r!=null?r:ce.EMPTY,this.right=o!=null?o:ce.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,r,o){return new ce(e!=null?e:this.key,t!=null?t:this.value,i!=null?i:this.color,r!=null?r:this.left,o!=null?o:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let r=this;const o=i(e,r.key);return r=o<0?r.copy(null,null,null,r.left.insert(e,t,i),null):o===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,i)),r.fixUp()}removeMin(){if(this.left.isEmpty())return ce.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return ce.EMPTY;i=r.right.min(),r=r.copy(i.key,i.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ce.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ce.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw H();const e=this.left.check();if(e!==this.right.check())throw H();return e+(this.isRed()?0:1)}}ce.EMPTY=null,ce.RED=!0,ce.BLACK=!1;ce.EMPTY=new class{constructor(){this.size=0}get key(){throw H()}get value(){throw H()}get color(){throw H()}get left(){throw H()}get right(){throw H()}copy(e,t,i,r,o){return this}insert(e,t,i){return new ce(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class we{constructor(e){this.comparator=e,this.data=new Ae(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,i)=>(e(t),!1))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const r=i.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ba(this.data.getIterator())}getIteratorFrom(e){return new Ba(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(i=>{t=t.add(i)}),t}isEqual(e){if(!(e instanceof we)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,o=i.getNext().key;if(this.comparator(r,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new we(this.comparator);return t.data=e,t}}class Ba{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class ke{constructor(e){this.fields=e,e.sort(he.comparator)}static empty(){return new ke([])}unionWith(e){let t=new we(he.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new ke(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Kt(this.fields,e.fields,(t,i)=>t.isEqual(i))}}/**
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
 */class lm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class $e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(o){throw typeof DOMException!="undefined"&&o instanceof DOMException?new lm("Invalid base64 string: "+o):o}}(e);return new $e(t)}static fromUint8Array(e){const t=function(r){let o="";for(let a=0;a<r.length;++a)o+=String.fromCharCode(r[a]);return o}(e);return new $e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const i=new Uint8Array(t.length);for(let r=0;r<t.length;r++)i[r]=t.charCodeAt(r);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}$e.EMPTY_BYTE_STRING=new $e("");const cm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function kt(n){if(te(!!n),typeof n=="string"){let e=0;const t=cm.exec(n);if(te(!!t),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:ue(n.seconds),nanos:ue(n.nanos)}}function ue(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function xn(n){return typeof n=="string"?$e.fromBase64String(n):$e.fromUint8Array(n)}/**
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
 */function Us(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function _c(n){const e=n.mapValue.fields.__previous_value__;return Us(e)?_c(e):e}function Qi(n){const e=kt(n.mapValue.fields.__local_write_time__.timestampValue);return new ae(e.seconds,e.nanos)}/**
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
 */class um{constructor(e,t,i,r,o,a,c,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=r,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=f}}class Ji{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Ji("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ji&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Ii={mapValue:{}};function Qt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Us(n)?4:dm(n)?9007199254740991:hm(n)?10:11:H()}function je(n,e){if(n===e)return!0;const t=Qt(n);if(t!==Qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Qi(n).isEqual(Qi(e));case 3:return function(r,o){if(typeof r.timestampValue=="string"&&typeof o.timestampValue=="string"&&r.timestampValue.length===o.timestampValue.length)return r.timestampValue===o.timestampValue;const a=kt(r.timestampValue),c=kt(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,o){return xn(r.bytesValue).isEqual(xn(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,o){return ue(r.geoPointValue.latitude)===ue(o.geoPointValue.latitude)&&ue(r.geoPointValue.longitude)===ue(o.geoPointValue.longitude)}(n,e);case 2:return function(r,o){if("integerValue"in r&&"integerValue"in o)return ue(r.integerValue)===ue(o.integerValue);if("doubleValue"in r&&"doubleValue"in o){const a=ue(r.doubleValue),c=ue(o.doubleValue);return a===c?Ki(a)===Ki(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Kt(n.arrayValue.values||[],e.arrayValue.values||[],je);case 10:case 11:return function(r,o){const a=r.mapValue.fields||{},c=o.mapValue.fields||{};if(ja(a)!==ja(c))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(c[h]===void 0||!je(a[h],c[h])))return!1;return!0}(n,e);default:return H()}}function Un(n,e){return(n.values||[]).find(t=>je(t,e))!==void 0}function Jt(n,e){if(n===e)return 0;const t=Qt(n),i=Qt(e);if(t!==i)return Q(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,e.booleanValue);case 2:return function(o,a){const c=ue(o.integerValue||o.doubleValue),h=ue(a.integerValue||a.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,e);case 3:return qa(n.timestampValue,e.timestampValue);case 4:return qa(Qi(n),Qi(e));case 5:return Q(n.stringValue,e.stringValue);case 6:return function(o,a){const c=xn(o),h=xn(a);return c.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){const c=o.split("/"),h=a.split("/");for(let f=0;f<c.length&&f<h.length;f++){const d=Q(c[f],h[f]);if(d!==0)return d}return Q(c.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){const c=Q(ue(o.latitude),ue(a.latitude));return c!==0?c:Q(ue(o.longitude),ue(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ha(n.arrayValue,e.arrayValue);case 10:return function(o,a){var c,h,f,d;const _=o.fields||{},I=a.fields||{},C=(c=_.value)===null||c===void 0?void 0:c.arrayValue,O=(h=I.value)===null||h===void 0?void 0:h.arrayValue,A=Q(((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0,((d=O==null?void 0:O.values)===null||d===void 0?void 0:d.length)||0);return A!==0?A:Ha(C,O)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===Ii.mapValue&&a===Ii.mapValue)return 0;if(o===Ii.mapValue)return 1;if(a===Ii.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),f=a.fields||{},d=Object.keys(f);h.sort(),d.sort();for(let _=0;_<h.length&&_<d.length;++_){const I=Q(h[_],d[_]);if(I!==0)return I;const C=Jt(c[h[_]],f[d[_]]);if(C!==0)return C}return Q(h.length,d.length)}(n.mapValue,e.mapValue);default:throw H()}}function qa(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=kt(n),i=kt(e),r=Q(t.seconds,i.seconds);return r!==0?r:Q(t.nanos,i.nanos)}function Ha(n,e){const t=n.values||[],i=e.values||[];for(let r=0;r<t.length&&r<i.length;++r){const o=Jt(t[r],i[r]);if(o)return o}return Q(t.length,i.length)}function Xt(n){return ds(n)}function ds(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const i=kt(t);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return xn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return $.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let i="[",r=!0;for(const o of t.values||[])r?r=!1:i+=",",i+=ds(o);return i+"]"}(n.arrayValue):"mapValue"in n?function(t){const i=Object.keys(t.fields||{}).sort();let r="{",o=!0;for(const a of i)o?o=!1:r+=",",r+=`${a}:${ds(t.fields[a])}`;return r+"}"}(n.mapValue):H()}function fs(n){return!!n&&"integerValue"in n}function Fs(n){return!!n&&"arrayValue"in n}function Oi(n){return!!n&&"mapValue"in n}function hm(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function kn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return sn(n.mapValue.fields,(t,i)=>e.mapValue.fields[t]=kn(i)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=kn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function dm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class Re{constructor(e){this.value=e}static empty(){return new Re({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!Oi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=kn(t)}setAll(e){let t=he.emptyPath(),i={},r=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const h=this.getFieldsMap(t);this.applyChanges(h,i,r),i={},r=[],t=c.popLast()}a?i[c.lastSegment()]=kn(a):r.push(c.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,i,r)}delete(e){const t=this.field(e.popLast());Oi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return je(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let r=t.mapValue.fields[e.get(i)];Oi(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,i){sn(t,(r,o)=>e[r]=o);for(const r of i)delete e[r]}clone(){return new Re(kn(this.value))}}function vc(n){const e=[];return sn(n.fields,(t,i)=>{const r=new he([t]);if(Oi(i)){const o=vc(i.mapValue).fields;if(o.length===0)e.push(r);else for(const a of o)e.push(r.child(a))}else e.push(r)}),new ke(e)}/**
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
 */class Le{constructor(e,t,i,r,o,a,c){this.key=e,this.documentType=t,this.version=i,this.readTime=r,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Le(e,0,Y.min(),Y.min(),Y.min(),Re.empty(),0)}static newFoundDocument(e,t,i,r){return new Le(e,1,t,Y.min(),i,r,0)}static newNoDocument(e,t){return new Le(e,2,t,Y.min(),Y.min(),Re.empty(),0)}static newUnknownDocument(e,t){return new Le(e,3,t,Y.min(),Y.min(),Re.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Y.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Re.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Re.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Y.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Le&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Le(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Xi{constructor(e,t){this.position=e,this.inclusive=t}}function za(n,e,t){let i=0;for(let r=0;r<n.position.length;r++){const o=e[r],a=n.position[r];if(o.field.isKeyField()?i=$.comparator($.fromName(a.referenceValue),t.key):i=Jt(a,t.data.field(o.field)),o.dir==="desc"&&(i*=-1),i!==0)break}return i}function Ga(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!je(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Yi{constructor(e,t="asc"){this.field=e,this.dir=t}}function fm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Ec{}class oe extends Ec{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new mm(e,t,i):t==="array-contains"?new _m(e,i):t==="in"?new vm(e,i):t==="not-in"?new Em(e,i):t==="array-contains-any"?new wm(e,i):new oe(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new gm(e,i):new ym(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Jt(t,this.value)):t!==null&&Qt(this.value)===Qt(t)&&this.matchesComparison(Jt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return H()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ft extends Ec{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ft(e,t)}matches(e){return wc(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function wc(n){return n.op==="and"}function Ic(n){return pm(n)&&wc(n)}function pm(n){for(const e of n.filters)if(e instanceof ft)return!1;return!0}function ps(n){if(n instanceof oe)return n.field.canonicalString()+n.op.toString()+Xt(n.value);if(Ic(n))return n.filters.map(e=>ps(e)).join(",");{const e=n.filters.map(t=>ps(t)).join(",");return`${n.op}(${e})`}}function Tc(n,e){return n instanceof oe?function(i,r){return r instanceof oe&&i.op===r.op&&i.field.isEqual(r.field)&&je(i.value,r.value)}(n,e):n instanceof ft?function(i,r){return r instanceof ft&&i.op===r.op&&i.filters.length===r.filters.length?i.filters.reduce((o,a,c)=>o&&Tc(a,r.filters[c]),!0):!1}(n,e):void H()}function bc(n){return n instanceof oe?function(t){return`${t.field.canonicalString()} ${t.op} ${Xt(t.value)}`}(n):n instanceof ft?function(t){return t.op.toString()+" {"+t.getFilters().map(bc).join(" ,")+"}"}(n):"Filter"}class mm extends oe{constructor(e,t,i){super(e,t,i),this.key=$.fromName(i.referenceValue)}matches(e){const t=$.comparator(e.key,this.key);return this.matchesComparison(t)}}class gm extends oe{constructor(e,t){super(e,"in",t),this.keys=Ac("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class ym extends oe{constructor(e,t){super(e,"not-in",t),this.keys=Ac("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ac(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(i=>$.fromName(i.referenceValue))}class _m extends oe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Fs(t)&&Un(t.arrayValue,this.value)}}class vm extends oe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Un(this.value.arrayValue,t)}}class Em extends oe{constructor(e,t){super(e,"not-in",t)}matches(e){if(Un(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Un(this.value.arrayValue,t)}}class wm extends oe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Fs(t)||!t.arrayValue.values)&&t.arrayValue.values.some(i=>Un(this.value.arrayValue,i))}}/**
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
 */class Im{constructor(e,t=null,i=[],r=[],o=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=r,this.limit=o,this.startAt=a,this.endAt=c,this.ue=null}}function Wa(n,e=null,t=[],i=[],r=null,o=null,a=null){return new Im(n,e,t,i,r,o,a)}function $s(n){const e=J(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(i=>ps(i)).join(","),t+="|ob:",t+=e.orderBy.map(i=>function(o){return o.field.canonicalString()+o.dir}(i)).join(","),xs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(i=>Xt(i)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(i=>Xt(i)).join(",")),e.ue=t}return e.ue}function js(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!fm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Tc(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ga(n.startAt,e.startAt)&&Ga(n.endAt,e.endAt)}/**
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
 */class cr{constructor(e,t=null,i=[],r=[],o=null,a="F",c=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=r,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Tm(n,e,t,i,r,o,a,c){return new cr(n,e,t,i,r,o,a,c)}function bm(n){return new cr(n)}function Ka(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Am(n){return n.collectionGroup!==null}function Cn(n){const e=J(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new we(he.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(c=c.add(f.field))})}),c})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new Yi(o,i))}),t.has(he.keyField().canonicalString())||e.ce.push(new Yi(he.keyField(),i))}return e.ce}function bt(n){const e=J(n);return e.le||(e.le=Sm(e,Cn(n))),e.le}function Sm(n,e){if(n.limitType==="F")return Wa(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(r=>{const o=r.dir==="desc"?"asc":"desc";return new Yi(r.field,o)});const t=n.endAt?new Xi(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new Xi(n.startAt.position,n.startAt.inclusive):null;return Wa(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function ms(n,e,t){return new cr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Sc(n,e){return js(bt(n),bt(e))&&n.limitType===e.limitType}function Rc(n){return`${$s(bt(n))}|lt:${n.limitType}`}function bn(n){return`Query(target=${function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map(r=>bc(r)).join(", ")}]`),xs(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map(r=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(r)).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map(r=>Xt(r)).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map(r=>Xt(r)).join(",")),`Target(${i})`}(bt(n))}; limitType=${n.limitType})`}function Bs(n,e){return e.isFoundDocument()&&function(i,r){const o=r.key.path;return i.collectionGroup!==null?r.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(o):$.isDocumentKey(i.path)?i.path.isEqual(o):i.path.isImmediateParentOf(o)}(n,e)&&function(i,r){for(const o of Cn(i))if(!o.field.isKeyField()&&r.data.field(o.field)===null)return!1;return!0}(n,e)&&function(i,r){for(const o of i.filters)if(!o.matches(r))return!1;return!0}(n,e)&&function(i,r){return!(i.startAt&&!function(a,c,h){const f=za(a,c,h);return a.inclusive?f<=0:f<0}(i.startAt,Cn(i),r)||i.endAt&&!function(a,c,h){const f=za(a,c,h);return a.inclusive?f>=0:f>0}(i.endAt,Cn(i),r))}(n,e)}function Rm(n){return(e,t)=>{let i=!1;for(const r of Cn(n)){const o=Pm(r,e,t);if(o!==0)return o;i=i||r.field.isKeyField()}return 0}}function Pm(n,e,t){const i=n.field.isKeyField()?$.comparator(e.key,t.key):function(o,a,c){const h=a.data.field(o),f=c.data.field(o);return h!==null&&f!==null?Jt(h,f):H()}(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return H()}}/**
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
 */class on{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[r,o]of i)if(this.equalsFn(r,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),r=this.inner[i];if(r===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let o=0;o<r.length;o++)if(this.equalsFn(r[o][0],e))return void(r[o]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return i.length===1?delete this.inner[t]:i.splice(r,1),this.innerSize--,!0;return!1}forEach(e){sn(this.inner,(t,i)=>{for(const[r,o]of i)e(r,o)})}isEmpty(){return yc(this.inner)}size(){return this.innerSize}}/**
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
 */const km=new Ae($.comparator);function Zi(){return km}const Pc=new Ae($.comparator);function Ti(...n){let e=Pc;for(const t of n)e=e.insert(t.key,t);return e}function kc(n){let e=Pc;return n.forEach((t,i)=>e=e.insert(t,i.overlayedDocument)),e}function It(){return Nn()}function Cc(){return Nn()}function Nn(){return new on(n=>n.toString(),(n,e)=>n.isEqual(e))}const Cm=new Ae($.comparator),Nm=new we($.comparator);function Ee(...n){let e=Nm;for(const t of n)e=e.add(t);return e}const Dm=new we(Q);function Om(){return Dm}/**
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
 */function qs(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ki(e)?"-0":e}}function Nc(n){return{integerValue:""+n}}function Lm(n,e){return am(e)?Nc(e):qs(n,e)}/**
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
 */class ur{constructor(){this._=void 0}}function Vm(n,e,t){return n instanceof Fn?function(r,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return o&&Us(o)&&(o=_c(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(t,e):n instanceof $n?Oc(n,e):n instanceof jn?Lc(n,e):function(r,o){const a=Dc(r,o),c=Qa(a)+Qa(r.Pe);return fs(a)&&fs(r.Pe)?Nc(c):qs(r.serializer,c)}(n,e)}function Mm(n,e,t){return n instanceof $n?Oc(n,e):n instanceof jn?Lc(n,e):t}function Dc(n,e){return n instanceof er?function(i){return fs(i)||function(o){return!!o&&"doubleValue"in o}(i)}(e)?e:{integerValue:0}:null}class Fn extends ur{}class $n extends ur{constructor(e){super(),this.elements=e}}function Oc(n,e){const t=Vc(e);for(const i of n.elements)t.some(r=>je(r,i))||t.push(i);return{arrayValue:{values:t}}}class jn extends ur{constructor(e){super(),this.elements=e}}function Lc(n,e){let t=Vc(e);for(const i of n.elements)t=t.filter(r=>!je(r,i));return{arrayValue:{values:t}}}class er extends ur{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Qa(n){return ue(n.integerValue||n.doubleValue)}function Vc(n){return Fs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class xm{constructor(e,t){this.field=e,this.transform=t}}function Um(n,e){return n.field.isEqual(e.field)&&function(i,r){return i instanceof $n&&r instanceof $n||i instanceof jn&&r instanceof jn?Kt(i.elements,r.elements,je):i instanceof er&&r instanceof er?je(i.Pe,r.Pe):i instanceof Fn&&r instanceof Fn}(n.transform,e.transform)}class Fm{constructor(e,t){this.version=e,this.transformResults=t}}class Ve{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ve}static exists(e){return new Ve(void 0,e)}static updateTime(e){return new Ve(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Li(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class hr{}function Mc(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Hs(n.key,Ve.none()):new Kn(n.key,n.data,Ve.none());{const t=n.data,i=Re.empty();let r=new we(he.comparator);for(let o of e.fields)if(!r.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?i.delete(o):i.set(o,a),r=r.add(o)}return new gt(n.key,i,new ke(r.toArray()),Ve.none())}}function $m(n,e,t){n instanceof Kn?function(r,o,a){const c=r.value.clone(),h=Xa(r.fieldTransforms,o,a.transformResults);c.setAll(h),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof gt?function(r,o,a){if(!Li(r.precondition,o))return void o.convertToUnknownDocument(a.version);const c=Xa(r.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(xc(r)),h.setAll(c),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,e,t):function(r,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Dn(n,e,t,i){return n instanceof Kn?function(o,a,c,h){if(!Li(o.precondition,a))return c;const f=o.value.clone(),d=Ya(o.fieldTransforms,h,a);return f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null}(n,e,t,i):n instanceof gt?function(o,a,c,h){if(!Li(o.precondition,a))return c;const f=Ya(o.fieldTransforms,h,a),d=a.data;return d.setAll(xc(o)),d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(_=>_.field))}(n,e,t,i):function(o,a,c){return Li(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function jm(n,e){let t=null;for(const i of n.fieldTransforms){const r=e.data.field(i.field),o=Dc(i.transform,r||null);o!=null&&(t===null&&(t=Re.empty()),t.set(i.field,o))}return t||null}function Ja(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(i,r){return i===void 0&&r===void 0||!(!i||!r)&&Kt(i,r,(o,a)=>Um(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Kn extends hr{constructor(e,t,i,r=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class gt extends hr{constructor(e,t,i,r,o=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=r,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function xc(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}}),e}function Xa(n,e,t){const i=new Map;te(n.length===t.length);for(let r=0;r<t.length;r++){const o=n[r],a=o.transform,c=e.data.field(o.field);i.set(o.field,Mm(a,c,t[r]))}return i}function Ya(n,e,t){const i=new Map;for(const r of n){const o=r.transform,a=t.data.field(r.field);i.set(r.field,Vm(o,a,e))}return i}class Hs extends hr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Bm extends hr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class qm{constructor(e,t,i,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=r}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const o=this.mutations[r];o.key.isEqual(e.key)&&$m(o,e,i[r])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=Dn(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=Dn(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=Cc();return this.mutations.forEach(r=>{const o=e.get(r.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=t.has(r.key)?null:c;const h=Mc(a,c);h!==null&&i.set(r.key,h),a.isValidDocument()||a.convertToNoDocument(Y.min())}),i}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Ee())}isEqual(e){return this.batchId===e.batchId&&Kt(this.mutations,e.mutations,(t,i)=>Ja(t,i))&&Kt(this.baseMutations,e.baseMutations,(t,i)=>Ja(t,i))}}class zs{constructor(e,t,i,r){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=r}static from(e,t,i){te(e.mutations.length===i.length);let r=function(){return Cm}();const o=e.mutations;for(let a=0;a<o.length;a++)r=r.insert(o[a].key,i[a].version);return new zs(e,t,i,r)}}/**
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
 */class Hm{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */var ie,z;function zm(n){switch(n){default:return H();case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0}}function Gm(n){if(n===void 0)return Pt("GRPC error has no .code"),k.UNKNOWN;switch(n){case ie.OK:return k.OK;case ie.CANCELLED:return k.CANCELLED;case ie.UNKNOWN:return k.UNKNOWN;case ie.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case ie.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case ie.INTERNAL:return k.INTERNAL;case ie.UNAVAILABLE:return k.UNAVAILABLE;case ie.UNAUTHENTICATED:return k.UNAUTHENTICATED;case ie.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case ie.NOT_FOUND:return k.NOT_FOUND;case ie.ALREADY_EXISTS:return k.ALREADY_EXISTS;case ie.PERMISSION_DENIED:return k.PERMISSION_DENIED;case ie.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case ie.ABORTED:return k.ABORTED;case ie.OUT_OF_RANGE:return k.OUT_OF_RANGE;case ie.UNIMPLEMENTED:return k.UNIMPLEMENTED;case ie.DATA_LOSS:return k.DATA_LOSS;default:return H()}}(z=ie||(ie={}))[z.OK=0]="OK",z[z.CANCELLED=1]="CANCELLED",z[z.UNKNOWN=2]="UNKNOWN",z[z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",z[z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",z[z.NOT_FOUND=5]="NOT_FOUND",z[z.ALREADY_EXISTS=6]="ALREADY_EXISTS",z[z.PERMISSION_DENIED=7]="PERMISSION_DENIED",z[z.UNAUTHENTICATED=16]="UNAUTHENTICATED",z[z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",z[z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",z[z.ABORTED=10]="ABORTED",z[z.OUT_OF_RANGE=11]="OUT_OF_RANGE",z[z.UNIMPLEMENTED=12]="UNIMPLEMENTED",z[z.INTERNAL=13]="INTERNAL",z[z.UNAVAILABLE=14]="UNAVAILABLE",z[z.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new ac([4294967295,4294967295],0);class Wm{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function gs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Km(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Qm(n,e){return gs(n,e.toTimestamp())}function zt(n){return te(!!n),Y.fromTimestamp(function(t){const i=kt(t);return new ae(i.seconds,i.nanos)}(n))}function Uc(n,e){return ys(n,e).canonicalString()}function ys(n,e){const t=function(r){return new ee(["projects",r.projectId,"databases",r.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Jm(n){const e=ee.fromString(n);return te(rg(e)),e}function _s(n,e){return Uc(n.databaseId,e.path)}function Xm(n){const e=Jm(n);return e.length===4?ee.emptyPath():Zm(e)}function Ym(n){return new ee(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Zm(n){return te(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Za(n,e,t){return{name:_s(n,e),fields:t.value.mapValue.fields}}function eg(n,e){let t;if(e instanceof Kn)t={update:Za(n,e.key,e.value)};else if(e instanceof Hs)t={delete:_s(n,e.key)};else if(e instanceof gt)t={update:Za(n,e.key,e.data),updateMask:ig(e.fieldMask)};else{if(!(e instanceof Bm))return H();t={verify:_s(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(i=>function(o,a){const c=a.transform;if(c instanceof Fn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof $n)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof jn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof er)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw H()}(0,i))),e.precondition.isNone||(t.currentDocument=function(r,o){return o.updateTime!==void 0?{updateTime:Qm(r,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:H()}(n,e.precondition)),t}function tg(n,e){return n&&n.length>0?(te(e!==void 0),n.map(t=>function(r,o){let a=r.updateTime?zt(r.updateTime):zt(o);return a.isEqual(Y.min())&&(a=zt(o)),new Fm(a,r.transformResults||[])}(t,e))):[]}function ng(n){let e=Xm(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let r=null;if(i>0){te(i===1);const d=t.from[0];d.allDescendants?r=d.collectionId:e=e.child(d.collectionId)}let o=[];t.where&&(o=function(_){const I=Fc(_);return I instanceof ft&&Ic(I)?I.getFilters():[I]}(t.where));let a=[];t.orderBy&&(a=function(_){return _.map(I=>function(O){return new Yi(Ft(O.field),function(R){switch(R){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(O.direction))}(I))}(t.orderBy));let c=null;t.limit&&(c=function(_){let I;return I=typeof _=="object"?_.value:_,xs(I)?null:I}(t.limit));let h=null;t.startAt&&(h=function(_){const I=!!_.before,C=_.values||[];return new Xi(C,I)}(t.startAt));let f=null;return t.endAt&&(f=function(_){const I=!_.before,C=_.values||[];return new Xi(C,I)}(t.endAt)),Tm(e,r,a,o,c,"F",h,f)}function Fc(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=Ft(t.unaryFilter.field);return oe.create(i,"==",{doubleValue:NaN});case"IS_NULL":const r=Ft(t.unaryFilter.field);return oe.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ft(t.unaryFilter.field);return oe.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ft(t.unaryFilter.field);return oe.create(a,"!=",{nullValue:"NULL_VALUE"});default:return H()}}(n):n.fieldFilter!==void 0?function(t){return oe.create(Ft(t.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return H()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ft.create(t.compositeFilter.filters.map(i=>Fc(i)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return H()}}(t.compositeFilter.op))}(n):H()}function Ft(n){return he.fromServerFormat(n.fieldPath)}function ig(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function rg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class sg{constructor(e){this.ct=e}}function og(n){const e=ng({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ms(e,e.limit,"L"):e}/**
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
 */class ag{constructor(){this.un=new lg}addToCollectionParentIndex(e,t){return this.un.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(dt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(dt.min())}updateCollectionGroup(e,t,i){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class lg{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),r=this.index[t]||new we(ee.comparator),o=!r.has(i);return this.index[t]=r.add(i),o}has(e){const t=e.lastSegment(),i=e.popLast(),r=this.index[t];return r&&r.has(i)}getEntries(e){return(this.index[e]||new we(ee.comparator)).toArray()}}/**
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
 */class Yt{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Yt(0)}static kn(){return new Yt(-1)}}/**
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
 */class cg{constructor(){this.changes=new on(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Le.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?P.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class ug{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class hg{constructor(e,t,i,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=r}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(i=r,this.remoteDocumentCache.getEntry(e,t))).next(r=>(i!==null&&Dn(i.mutation,r,ke.empty(),ae.now()),r))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.getLocalViewOfDocuments(e,i,Ee()).next(()=>i))}getLocalViewOfDocuments(e,t,i=Ee()){const r=It();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,i).next(o=>{let a=Ti();return o.forEach((c,h)=>{a=a.insert(c,h.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const i=It();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,Ee()))}populateOverlays(e,t,i){const r=[];return i.forEach(o=>{t.has(o)||r.push(o)}),this.documentOverlayCache.getOverlays(e,r).next(o=>{o.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,i,r){let o=Zi();const a=Nn(),c=function(){return Nn()}();return t.forEach((h,f)=>{const d=i.get(f.key);r.has(f.key)&&(d===void 0||d.mutation instanceof gt)?o=o.insert(f.key,f):d!==void 0?(a.set(f.key,d.mutation.getFieldMask()),Dn(d.mutation,f,d.mutation.getFieldMask(),ae.now())):a.set(f.key,ke.empty())}),this.recalculateAndSaveOverlays(e,o).next(h=>(h.forEach((f,d)=>a.set(f,d)),t.forEach((f,d)=>{var _;return c.set(f,new ug(d,(_=a.get(f))!==null&&_!==void 0?_:null))}),c))}recalculateAndSaveOverlays(e,t){const i=Nn();let r=new Ae((a,c)=>a-c),o=Ee();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(h=>{const f=t.get(h);if(f===null)return;let d=i.get(h)||ke.empty();d=c.applyToLocalView(f,d),i.set(h,d);const _=(r.get(c.batchId)||Ee()).add(h);r=r.insert(c.batchId,_)})}).next(()=>{const a=[],c=r.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),f=h.key,d=h.value,_=Cc();d.forEach(I=>{if(!o.has(I)){const C=Mc(t.get(I),i.get(I));C!==null&&_.set(I,C),o=o.add(I)}}),a.push(this.documentOverlayCache.saveOverlays(e,f,_))}return P.waitFor(a)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,t,i,r){return function(a){return $.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Am(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,r):this.getDocumentsMatchingCollectionQuery(e,t,i,r)}getNextDocuments(e,t,i,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,r).next(o=>{const a=r-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,r-o.size):P.resolve(It());let c=-1,h=o;return a.next(f=>P.forEach(f,(d,_)=>(c<_.largestBatchId&&(c=_.largestBatchId),o.get(d)?P.resolve():this.remoteDocumentCache.getEntry(e,d).next(I=>{h=h.insert(d,I)}))).next(()=>this.populateOverlays(e,f,o)).next(()=>this.computeViews(e,h,f,Ee())).next(d=>({batchId:c,changes:kc(d)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new $(t)).next(i=>{let r=Ti();return i.isFoundDocument()&&(r=r.insert(i.key,i)),r})}getDocumentsMatchingCollectionGroupQuery(e,t,i,r){const o=t.collectionGroup;let a=Ti();return this.indexManager.getCollectionParents(e,o).next(c=>P.forEach(c,h=>{const f=function(_,I){return new cr(I,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)}(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,f,i,r).next(d=>{d.forEach((_,I)=>{a=a.insert(_,I)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,i,r){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,o,r))).next(a=>{o.forEach((h,f)=>{const d=f.getKey();a.get(d)===null&&(a=a.insert(d,Le.newInvalidDocument(d)))});let c=Ti();return a.forEach((h,f)=>{const d=o.get(h);d!==void 0&&Dn(d.mutation,f,ke.empty(),ae.now()),Bs(t,f)&&(c=c.insert(h,f))}),c})}}/**
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
 */class dg{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return P.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(r){return{id:r.id,version:r.version,createTime:zt(r.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(r){return{name:r.name,query:og(r.bundledQuery),readTime:zt(r.readTime)}}(t)),P.resolve()}}/**
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
 */class fg{constructor(){this.overlays=new Ae($.comparator),this.Ir=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const i=It();return P.forEach(t,r=>this.getOverlay(e,r).next(o=>{o!==null&&i.set(r,o)})).next(()=>i)}saveOverlays(e,t,i){return i.forEach((r,o)=>{this.ht(e,t,o)}),P.resolve()}removeOverlaysForBatchId(e,t,i){const r=this.Ir.get(i);return r!==void 0&&(r.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(i)),P.resolve()}getOverlaysForCollection(e,t,i){const r=It(),o=t.length+1,a=new $(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const h=c.getNext().value,f=h.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>i&&r.set(h.getKey(),h)}return P.resolve(r)}getOverlaysForCollectionGroup(e,t,i,r){let o=new Ae((f,d)=>f-d);const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>i){let d=o.get(f.largestBatchId);d===null&&(d=It(),o=o.insert(f.largestBatchId,d)),d.set(f.getKey(),f)}}const c=It(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,d)=>c.set(f,d)),!(c.size()>=r)););return P.resolve(c)}ht(e,t,i){const r=this.overlays.get(i.key);if(r!==null){const a=this.Ir.get(r.largestBatchId).delete(i.key);this.Ir.set(r.largestBatchId,a)}this.overlays=this.overlays.insert(i.key,new Hm(t,i));let o=this.Ir.get(t);o===void 0&&(o=Ee(),this.Ir.set(t,o)),this.Ir.set(t,o.add(i.key))}}/**
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
 */class pg{constructor(){this.sessionToken=$e.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
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
 */class Gs{constructor(){this.Tr=new we(se.Er),this.dr=new we(se.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const i=new se(e,t);this.Tr=this.Tr.add(i),this.dr=this.dr.add(i)}Rr(e,t){e.forEach(i=>this.addReference(i,t))}removeReference(e,t){this.Vr(new se(e,t))}mr(e,t){e.forEach(i=>this.removeReference(i,t))}gr(e){const t=new $(new ee([])),i=new se(t,e),r=new se(t,e+1),o=[];return this.dr.forEachInRange([i,r],a=>{this.Vr(a),o.push(a.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new $(new ee([])),i=new se(t,e),r=new se(t,e+1);let o=Ee();return this.dr.forEachInRange([i,r],a=>{o=o.add(a.key)}),o}containsKey(e){const t=new se(e,0),i=this.Tr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class se{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return $.comparator(e.key,t.key)||Q(e.wr,t.wr)}static Ar(e,t){return Q(e.wr,t.wr)||$.comparator(e.key,t.key)}}/**
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
 */class mg{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new we(se.Er)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,r){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new qm(o,t,i,r);this.mutationQueue.push(a);for(const c of r)this.br=this.br.add(new se(c.key,o)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,r=this.vr(i),o=r<0?0:r;return P.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new se(t,0),r=new se(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([i,r],a=>{const c=this.Dr(a.wr);o.push(c)}),P.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new we(Q);return t.forEach(r=>{const o=new se(r,0),a=new se(r,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,a],c=>{i=i.add(c.wr)})}),P.resolve(this.Cr(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,r=i.length+1;let o=i;$.isDocumentKey(o)||(o=o.child(""));const a=new se(new $(o),0);let c=new we(Q);return this.br.forEachWhile(h=>{const f=h.key.path;return!!i.isPrefixOf(f)&&(f.length===r&&(c=c.add(h.wr)),!0)},a),P.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(i=>{const r=this.Dr(i);r!==null&&t.push(r)}),t}removeMutationBatch(e,t){te(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let i=this.br;return P.forEach(t.mutations,r=>{const o=new se(r.key,t.batchId);return i=i.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.br=i})}On(e){}containsKey(e,t){const i=new se(t,0),r=this.br.firstAfterOrEqual(i);return P.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class gg{constructor(e){this.Mr=e,this.docs=function(){return new Ae($.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,r=this.docs.get(i),o=r?r.size:0,a=this.Mr(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return P.resolve(i?i.document.mutableCopy():Le.newInvalidDocument(t))}getEntries(e,t){let i=Zi();return t.forEach(r=>{const o=this.docs.get(r);i=i.insert(r,o?o.document.mutableCopy():Le.newInvalidDocument(r))}),P.resolve(i)}getDocumentsMatchingQuery(e,t,i,r){let o=Zi();const a=t.path,c=new $(a.child("")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:f,value:{document:d}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||im(nm(d),i)<=0||(r.has(d.key)||Bs(t,d))&&(o=o.insert(d.key,d.mutableCopy()))}return P.resolve(o)}getAllFromCollectionGroup(e,t,i,r){H()}Or(e,t){return P.forEach(this.docs,i=>t(i))}newChangeBuffer(e){return new yg(this)}getSize(e){return P.resolve(this.size)}}class yg extends cg{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((i,r)=>{r.isValidDocument()?t.push(this.cr.addEntry(e,r)):this.cr.removeEntry(i)}),P.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class _g{constructor(e){this.persistence=e,this.Nr=new on(t=>$s(t),js),this.lastRemoteSnapshotVersion=Y.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Gs,this.targetCount=0,this.kr=Yt.Bn()}forEachTarget(e,t){return this.Nr.forEach((i,r)=>t(r)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.Lr&&(this.Lr=t),P.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Yt(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.Kn(t),P.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,i){let r=0;const o=[];return this.Nr.forEach((a,c)=>{c.sequenceNumber<=t&&i.get(c.targetId)===null&&(this.Nr.delete(a),o.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)}),P.waitFor(o).next(()=>r)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const i=this.Nr.get(t)||null;return P.resolve(i)}addMatchingKeys(e,t,i){return this.Br.Rr(t,i),P.resolve()}removeMatchingKeys(e,t,i){this.Br.mr(t,i);const r=this.persistence.referenceDelegate,o=[];return r&&t.forEach(a=>{o.push(r.markPotentiallyOrphaned(e,a))}),P.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const i=this.Br.yr(t);return P.resolve(i)}containsKey(e,t){return P.resolve(this.Br.containsKey(t))}}/**
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
 */class vg{constructor(e,t){this.qr={},this.overlays={},this.Qr=new gc(0),this.Kr=!1,this.Kr=!0,this.$r=new pg,this.referenceDelegate=e(this),this.Ur=new _g(this),this.indexManager=new ag,this.remoteDocumentCache=function(r){return new gg(r)}(i=>this.referenceDelegate.Wr(i)),this.serializer=new sg(t),this.Gr=new dg(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new fg,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this.qr[e.toKey()];return i||(i=new mg(t,this.referenceDelegate),this.qr[e.toKey()]=i),i}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,i){V("MemoryPersistence","Starting transaction:",e);const r=new Eg(this.Qr.next());return this.referenceDelegate.zr(),i(r).next(o=>this.referenceDelegate.jr(r).next(()=>o)).toPromise().then(o=>(r.raiseOnCommittedEvent(),o))}Hr(e,t){return P.or(Object.values(this.qr).map(i=>()=>i.containsKey(e,t)))}}class Eg extends sm{constructor(e){super(),this.currentSequenceNumber=e}}class Ws{constructor(e){this.persistence=e,this.Jr=new Gs,this.Yr=null}static Zr(e){return new Ws(e)}get Xr(){if(this.Yr)return this.Yr;throw H()}addReference(e,t,i){return this.Jr.addReference(i,t),this.Xr.delete(i.toString()),P.resolve()}removeReference(e,t,i){return this.Jr.removeReference(i,t),this.Xr.add(i.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),P.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(r=>this.Xr.add(r.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next(r=>{r.forEach(o=>this.Xr.add(o.toString()))}).next(()=>i.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.Xr,i=>{const r=$.fromPath(i);return this.ei(e,r).next(o=>{o||t.removeEntry(r,Y.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(i=>{i?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return P.or([()=>P.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
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
 */class Ks{constructor(e,t,i,r){this.targetId=e,this.fromCache=t,this.$i=i,this.Ui=r}static Wi(e,t){let i=Ee(),r=Ee();for(const o of t.docChanges)switch(o.type){case 0:i=i.add(o.doc.key);break;case 1:r=r.add(o.doc.key)}return new Ks(e,t.fromCache,i,r)}}/**
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
 */class wg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Ig{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return mh()?8:om(Ie())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,i,r){const o={result:null};return this.Yi(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Zi(e,t,r,i).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new wg;return this.Xi(e,t,a).next(c=>{if(o.result=c,this.zi)return this.es(e,t,a,c.size)})}).next(()=>o.result)}es(e,t,i,r){return i.documentReadCount<this.ji?(Tn()<=q.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",bn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),P.resolve()):(Tn()<=q.DEBUG&&V("QueryEngine","Query:",bn(t),"scans",i.documentReadCount,"local documents and returns",r,"documents as results."),i.documentReadCount>this.Hi*r?(Tn()<=q.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",bn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,bt(t))):P.resolve())}Yi(e,t){if(Ka(t))return P.resolve(null);let i=bt(t);return this.indexManager.getIndexType(e,i).next(r=>r===0?null:(t.limit!==null&&r===1&&(t=ms(t,null,"F"),i=bt(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next(o=>{const a=Ee(...o);return this.Ji.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,i).next(h=>{const f=this.ts(t,c);return this.ns(t,f,a,h.readTime)?this.Yi(e,ms(t,null,"F")):this.rs(e,f,t,h)}))})))}Zi(e,t,i,r){return Ka(t)||r.isEqual(Y.min())?P.resolve(null):this.Ji.getDocuments(e,i).next(o=>{const a=this.ts(t,o);return this.ns(t,a,i,r)?P.resolve(null):(Tn()<=q.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),bn(t)),this.rs(e,a,t,tm(r,-1)).next(c=>c))})}ts(e,t){let i=new we(Rm(e));return t.forEach((r,o)=>{Bs(e,o)&&(i=i.add(o))}),i}ns(e,t,i,r){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(r)>0)}Xi(e,t,i){return Tn()<=q.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",bn(t)),this.Ji.getDocumentsMatchingQuery(e,t,dt.min(),i)}rs(e,t,i,r){return this.Ji.getDocumentsMatchingQuery(e,i,r).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
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
 */class Tg{constructor(e,t,i,r){this.persistence=e,this.ss=t,this.serializer=r,this.os=new Ae(Q),this._s=new on(o=>$s(o),js),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(i)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new hg(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function bg(n,e,t,i){return new Tg(n,e,t,i)}async function $c(n,e){const t=J(n);return await t.persistence.runTransaction("Handle user change","readonly",i=>{let r;return t.mutationQueue.getAllMutationBatches(i).next(o=>(r=o,t.ls(e),t.mutationQueue.getAllMutationBatches(i))).next(o=>{const a=[],c=[];let h=Ee();for(const f of r){a.push(f.batchId);for(const d of f.mutations)h=h.add(d.key)}for(const f of o){c.push(f.batchId);for(const d of f.mutations)h=h.add(d.key)}return t.localDocuments.getDocuments(i,h).next(f=>({hs:f,removedBatchIds:a,addedBatchIds:c}))})})}function Ag(n,e){const t=J(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const r=e.batch.keys(),o=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,h,f,d){const _=f.batch,I=_.keys();let C=P.resolve();return I.forEach(O=>{C=C.next(()=>d.getEntry(h,O)).next(A=>{const R=f.docVersions.get(O);te(R!==null),A.version.compareTo(R)<0&&(_.applyToRemoteDocument(A,f),A.isValidDocument()&&(A.setReadTime(f.commitVersion),d.addEntry(A)))})}),C.next(()=>c.mutationQueue.removeMutationBatch(h,_))}(t,i,e,o).next(()=>o.apply(i)).next(()=>t.mutationQueue.performConsistencyCheck(i)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(i,r,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(c){let h=Ee();for(let f=0;f<c.mutationResults.length;++f)c.mutationResults[f].transformResults.length>0&&(h=h.add(c.batch.mutations[f].key));return h}(e))).next(()=>t.localDocuments.getDocuments(i,r))})}function Sg(n){const e=J(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Rg(n,e){const t=J(n);return t.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}class el{constructor(){this.activeTargetIds=Om()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Pg{constructor(){this.so=new el,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,i){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new el,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class kg{_o(e){}shutdown(){}}/**
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
 */class tl{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){V("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){V("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let bi=null;function Zr(){return bi===null?bi=function(){return 268435456+Math.round(2147483648*Math.random())}():bi++,"0x"+bi.toString(16)}/**
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
 */const Cg={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class Ng{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const _e="WebChannelConnection";class Dg extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const i=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=i+"://"+t.host,this.vo=`projects/${r}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${r}`:`project_id=${r}&database_id=${o}`}get Fo(){return!1}Mo(t,i,r,o,a){const c=Zr(),h=this.xo(t,i.toUriEncodedString());V("RestConnection",`Sending RPC '${t}' ${c}:`,h,r);const f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,o,a),this.No(t,h,f,r).then(d=>(V("RestConnection",`Received RPC '${t}' ${c}: `,d),d),d=>{throw Wi("RestConnection",`RPC '${t}' ${c} failed with error: `,d,"url: ",h,"request:",r),d})}Lo(t,i,r,o,a,c){return this.Mo(t,i,r,o,a)}Oo(t,i,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+rn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),i&&i.headers.forEach((o,a)=>t[a]=o),r&&r.headers.forEach((o,a)=>t[a]=o)}xo(t,i){const r=Cg[t];return`${this.Do}/v1/${i}:${r}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,i,r){const o=Zr();return new Promise((a,c)=>{const h=new lc;h.setWithCredentials(!0),h.listenOnce(cc.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Di.NO_ERROR:const d=h.getResponseJson();V(_e,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(d)),a(d);break;case Di.TIMEOUT:V(_e,`RPC '${e}' ${o} timed out`),c(new x(k.DEADLINE_EXCEEDED,"Request time out"));break;case Di.HTTP_ERROR:const _=h.getStatus();if(V(_e,`RPC '${e}' ${o} failed with status:`,_,"response text:",h.getResponseText()),_>0){let I=h.getResponseJson();Array.isArray(I)&&(I=I[0]);const C=I==null?void 0:I.error;if(C&&C.status&&C.message){const O=function(R){const L=R.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(L)>=0?L:k.UNKNOWN}(C.status);c(new x(O,C.message))}else c(new x(k.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new x(k.UNAVAILABLE,"Connection failed."));break;default:H()}}finally{V(_e,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(r);V(_e,`RPC '${e}' ${o} sending request:`,r),h.send(t,"POST",f,i,15)})}Bo(e,t,i){const r=Zr(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=dc(),c=hc(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,t,i),h.encodeInitMessageHeaders=!0;const d=o.join("");V(_e,`Creating RPC '${e}' stream ${r}: ${d}`,h);const _=a.createWebChannel(d,h);let I=!1,C=!1;const O=new Ng({Io:R=>{C?V(_e,`Not sending because RPC '${e}' stream ${r} is closed:`,R):(I||(V(_e,`Opening RPC '${e}' stream ${r} transport.`),_.open(),I=!0),V(_e,`RPC '${e}' stream ${r} sending:`,R),_.send(R))},To:()=>_.close()}),A=(R,L,F)=>{R.listen(L,j=>{try{F(j)}catch(W){setTimeout(()=>{throw W},0)}})};return A(_,Rn.EventType.OPEN,()=>{C||(V(_e,`RPC '${e}' stream ${r} transport opened.`),O.yo())}),A(_,Rn.EventType.CLOSE,()=>{C||(C=!0,V(_e,`RPC '${e}' stream ${r} transport closed`),O.So())}),A(_,Rn.EventType.ERROR,R=>{C||(C=!0,Wi(_e,`RPC '${e}' stream ${r} transport errored:`,R),O.So(new x(k.UNAVAILABLE,"The operation could not be completed")))}),A(_,Rn.EventType.MESSAGE,R=>{var L;if(!C){const F=R.data[0];te(!!F);const j=F,W=j.error||((L=j[0])===null||L===void 0?void 0:L.error);if(W){V(_e,`RPC '${e}' stream ${r} received error:`,W);const re=W.status;let B=function(y){const v=ie[y];if(v!==void 0)return Gm(v)}(re),E=W.message;B===void 0&&(B=k.INTERNAL,E="Unknown error status: "+re+" with message "+W.message),C=!0,O.So(new x(B,E)),_.close()}else V(_e,`RPC '${e}' stream ${r} received:`,F),O.bo(F)}}),A(c,uc.STAT_EVENT,R=>{R.stat===hs.PROXY?V(_e,`RPC '${e}' stream ${r} detected buffering proxy`):R.stat===hs.NOPROXY&&V(_e,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{O.wo()},0),O}}function es(){return typeof document!="undefined"?document:null}/**
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
 */function dr(n){return new Wm(n,!0)}/**
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
 */class jc{constructor(e,t,i=1e3,r=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=i,this.qo=r,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),i=Math.max(0,Date.now()-this.Uo),r=Math.max(0,t-i);r>0&&V("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,r,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Og{constructor(e,t,i,r,o,a,c,h){this.ui=e,this.Ho=i,this.Jo=r,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new jc(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(Pt(t.toString()),Pt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,r])=>{this.Yo===t&&this.P_(i,r)},i=>{e(()=>{const r=new x(k.UNKNOWN,"Fetching auth token failed: "+i.message);return this.I_(r)})})}P_(e,t){const i=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{i(()=>this.listener.Eo())}),this.stream.Ro(()=>{i(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(r=>{i(()=>this.I_(r))}),this.stream.onMessage(r=>{i(()=>++this.e_==1?this.E_(r):this.onNext(r))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return V("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(V("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Lg extends Og{constructor(e,t,i,r,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,r,a),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return te(!!e.streamToken),this.lastStreamToken=e.streamToken,te(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){te(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=tg(e.writeResults,e.commitTime),i=zt(e.commitTime);return this.listener.g_(i,t)}p_(){const e={};e.database=Ym(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(i=>eg(this.serializer,i))};this.a_(t)}}/**
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
 */class Vg extends class{}{constructor(e,t,i,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=r,this.y_=!1}w_(){if(this.y_)throw new x(k.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,i,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Mo(e,ys(t,i),r,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new x(k.UNKNOWN,o.toString())})}Lo(e,t,i,r,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Lo(e,ys(t,i),r,a,c,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new x(k.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Mg{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Pt(t),this.D_=!1):V("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class xg{constructor(e,t,i,r,o){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(a=>{i.enqueueAndForget(async()=>{Jn(this)&&(V("RemoteStore","Restarting streams for network reachability change."),await async function(h){const f=J(h);f.L_.add(4),await Qn(f),f.q_.set("Unknown"),f.L_.delete(4),await fr(f)}(this))})}),this.q_=new Mg(i,r)}}async function fr(n){if(Jn(n))for(const e of n.B_)await e(!0)}async function Qn(n){for(const e of n.B_)await e(!1)}function Jn(n){return J(n).L_.size===0}async function Bc(n,e,t){if(!lr(e))throw e;n.L_.add(1),await Qn(n),n.q_.set("Offline"),t||(t=()=>Sg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{V("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await fr(n)})}function qc(n,e){return e().catch(t=>Bc(n,t,e))}async function pr(n){const e=J(n),t=pt(e);let i=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;Ug(e);)try{const r=await Rg(e.localStore,i);if(r===null){e.O_.length===0&&t.o_();break}i=r.batchId,Fg(e,r)}catch(r){await Bc(e,r)}Hc(e)&&zc(e)}function Ug(n){return Jn(n)&&n.O_.length<10}function Fg(n,e){n.O_.push(e);const t=pt(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Hc(n){return Jn(n)&&!pt(n).n_()&&n.O_.length>0}function zc(n){pt(n).start()}async function $g(n){pt(n).p_()}async function jg(n){const e=pt(n);for(const t of n.O_)e.m_(t.mutations)}async function Bg(n,e,t){const i=n.O_.shift(),r=zs.from(i,e,t);await qc(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await pr(n)}async function qg(n,e){e&&pt(n).V_&&await async function(i,r){if(function(a){return zm(a)&&a!==k.ABORTED}(r.code)){const o=i.O_.shift();pt(i).s_(),await qc(i,()=>i.remoteSyncer.rejectFailedWrite(o.batchId,r)),await pr(i)}}(n,e),Hc(n)&&zc(n)}async function nl(n,e){const t=J(n);t.asyncQueue.verifyOperationInProgress(),V("RemoteStore","RemoteStore received new credentials");const i=Jn(t);t.L_.add(3),await Qn(t),i&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await fr(t)}async function Hg(n,e){const t=J(n);e?(t.L_.delete(2),await fr(t)):e||(t.L_.add(2),await Qn(t),t.q_.set("Unknown"))}function pt(n){return n.U_||(n.U_=function(t,i,r){const o=J(t);return o.w_(),new Lg(i,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,r)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:$g.bind(null,n),mo:qg.bind(null,n),f_:jg.bind(null,n),g_:Bg.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await pr(n)):(await n.U_.stop(),n.O_.length>0&&(V("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
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
 */class Qs{constructor(e,t,i,r,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=r,this.removalCallback=o,this.deferred=new Tt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,r,o){const a=Date.now()+i,c=new Qs(e,t,a,r,o);return c.start(i),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Gc(n,e){if(Pt("AsyncQueue",`${e}: ${n}`),lr(n))return new x(k.UNAVAILABLE,`${e}: ${n}`);throw n}class zg{constructor(){this.queries=il(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,i){const r=J(t),o=r.queries;r.queries=il(),o.forEach((a,c)=>{for(const h of c.j_)h.onError(i)})})(this,new x(k.ABORTED,"Firestore shutting down"))}}function il(){return new on(n=>Rc(n),Sc)}function Gg(n){n.Y_.forEach(e=>{e.next()})}var rl,sl;(sl=rl||(rl={})).ea="default",sl.Cache="cache";class Wg{constructor(e,t,i,r,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=r,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new on(c=>Rc(c),Sc),this.Ma=new Map,this.xa=new Set,this.Oa=new Ae($.comparator),this.Na=new Map,this.La=new Gs,this.Ba={},this.ka=new Map,this.qa=Yt.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Kg(n,e,t){const i=Yg(n);try{const r=await function(a,c){const h=J(a),f=ae.now(),d=c.reduce((C,O)=>C.add(O.key),Ee());let _,I;return h.persistence.runTransaction("Locally write mutations","readwrite",C=>{let O=Zi(),A=Ee();return h.cs.getEntries(C,d).next(R=>{O=R,O.forEach((L,F)=>{F.isValidDocument()||(A=A.add(L))})}).next(()=>h.localDocuments.getOverlayedDocuments(C,O)).next(R=>{_=R;const L=[];for(const F of c){const j=jm(F,_.get(F.key).overlayedDocument);j!=null&&L.push(new gt(F.key,j,vc(j.value.mapValue),Ve.exists(!0)))}return h.mutationQueue.addMutationBatch(C,f,L,c)}).next(R=>{I=R;const L=R.applyToLocalDocumentSet(_,A);return h.documentOverlayCache.saveOverlays(C,R.batchId,L)})}).then(()=>({batchId:I.batchId,changes:kc(_)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(r.batchId),function(a,c,h){let f=a.Ba[a.currentUser.toKey()];f||(f=new Ae(Q)),f=f.insert(c,h),a.Ba[a.currentUser.toKey()]=f}(i,r.batchId,t),await mr(i,r.changes),await pr(i.remoteStore)}catch(r){const o=Gc(r,"Failed to persist write");t.reject(o)}}function ol(n,e,t){const i=J(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const r=[];i.Fa.forEach((o,a)=>{const c=a.view.Z_(e);c.snapshot&&r.push(c.snapshot)}),function(a,c){const h=J(a);h.onlineState=c;let f=!1;h.queries.forEach((d,_)=>{for(const I of _.j_)I.Z_(c)&&(f=!0)}),f&&Gg(h)}(i.eventManager,e),r.length&&i.Ca.d_(r),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function Qg(n,e){const t=J(n),i=e.batch.batchId;try{const r=await Ag(t.localStore,e);Kc(t,i,null),Wc(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await mr(t,r)}catch(r){await mc(r)}}async function Jg(n,e,t){const i=J(n);try{const r=await function(a,c){const h=J(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let d;return h.mutationQueue.lookupMutationBatch(f,c).next(_=>(te(_!==null),d=_.keys(),h.mutationQueue.removeMutationBatch(f,_))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,d,c)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,d)).next(()=>h.localDocuments.getDocuments(f,d))})}(i.localStore,e);Kc(i,e,t),Wc(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await mr(i,r)}catch(r){await mc(r)}}function Wc(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function Kc(n,e,t){const i=J(n);let r=i.Ba[i.currentUser.toKey()];if(r){const o=r.get(e);o&&(t?o.reject(t):o.resolve(),r=r.remove(e)),i.Ba[i.currentUser.toKey()]=r}}async function mr(n,e,t){const i=J(n),r=[],o=[],a=[];i.Fa.isEmpty()||(i.Fa.forEach((c,h)=>{a.push(i.Ka(h,e,t).then(f=>{var d;if((f||t)&&i.isPrimaryClient){const _=f?!f.fromCache:(d=void 0)===null||d===void 0?void 0:d.current;i.sharedClientState.updateQueryState(h.targetId,_?"current":"not-current")}if(f){r.push(f);const _=Ks.Wi(h.targetId,f);o.push(_)}}))}),await Promise.all(a),i.Ca.d_(r),await async function(h,f){const d=J(h);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",_=>P.forEach(f,I=>P.forEach(I.$i,C=>d.persistence.referenceDelegate.addReference(_,I.targetId,C)).next(()=>P.forEach(I.Ui,C=>d.persistence.referenceDelegate.removeReference(_,I.targetId,C)))))}catch(_){if(!lr(_))throw _;V("LocalStore","Failed to update sequence numbers: "+_)}for(const _ of f){const I=_.targetId;if(!_.fromCache){const C=d.os.get(I),O=C.snapshotVersion,A=C.withLastLimboFreeSnapshotVersion(O);d.os=d.os.insert(I,A)}}}(i.localStore,o))}async function Xg(n,e){const t=J(n);if(!t.currentUser.isEqual(e)){V("SyncEngine","User change. New user:",e.toKey());const i=await $c(t.localStore,e);t.currentUser=e,function(o,a){o.ka.forEach(c=>{c.forEach(h=>{h.reject(new x(k.CANCELLED,a))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await mr(t,i.hs)}}function Yg(n){const e=J(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Qg.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Jg.bind(null,e),e}class tr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=dr(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return bg(this.persistence,new Ig,e.initialUser,this.serializer)}Ga(e){return new vg(Ws.Zr,this.serializer)}Wa(e){return new Pg}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}tr.provider={build:()=>new tr};class vs{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>ol(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=Xg.bind(null,this.syncEngine),await Hg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new zg}()}createDatastore(e){const t=dr(e.databaseInfo.databaseId),i=function(o){return new Dg(o)}(e.databaseInfo);return function(o,a,c,h){return new Vg(o,a,c,h)}(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return function(i,r,o,a,c){return new xg(i,r,o,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>ol(this.syncEngine,t,0),function(){return tl.D()?new tl:new kg}())}createSyncEngine(e,t){return function(r,o,a,c,h,f,d){const _=new Wg(r,o,a,c,h,f);return d&&(_.Qa=!0),_}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(r){const o=J(r);V("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await Qn(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}vs.provider={build:()=>new vs};/**
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
 */class Zg{constructor(e,t,i,r,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this.databaseInfo=r,this.user=ve.UNAUTHENTICATED,this.clientId=pc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(i,async a=>{V("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(i,a=>(V("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Tt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=Gc(t,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}async function ts(n,e){n.asyncQueue.verifyOperationInProgress(),V("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener(async r=>{i.isEqual(r)||(await $c(e.localStore,r),i=r)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function al(n,e){n.asyncQueue.verifyOperationInProgress();const t=await ey(n);V("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(i=>nl(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,r)=>nl(e.remoteStore,r)),n._onlineComponents=e}async function ey(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V("FirestoreClient","Using user provided OfflineComponentProvider");try{await ts(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(r){return r.name==="FirebaseError"?r.code===k.FAILED_PRECONDITION||r.code===k.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(t))throw t;Wi("Error using user provided cache. Falling back to memory cache: "+t),await ts(n,new tr)}}else V("FirestoreClient","Using default OfflineComponentProvider"),await ts(n,new tr);return n._offlineComponents}async function ty(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V("FirestoreClient","Using user provided OnlineComponentProvider"),await al(n,n._uninitializedComponentsProvider._online)):(V("FirestoreClient","Using default OnlineComponentProvider"),await al(n,new vs))),n._onlineComponents}function ny(n){return ty(n).then(e=>e.syncEngine)}/**
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
 */function Qc(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const ll=new Map;/**
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
 */function Jc(n,e,t){if(!t)throw new x(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function iy(n,e,t,i){if(e===!0&&i===!0)throw new x(k.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function cl(n){if(!$.isDocumentKey(n))throw new x(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ul(n){if($.isDocumentKey(n))throw new x(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Js(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":H()}function Zt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new x(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Js(n);throw new x(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */class hl{constructor(e){var t,i;if(e.host===void 0){if(e.ssl!==void 0)throw new x(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new x(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}iy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Qc((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new x(k.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new x(k.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new x(k.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,r){return i.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class gr{constructor(e,t,i,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new hl({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new x(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new hl(e),e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new Gp;switch(i.type){case"firstParty":return new Jp(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new x(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const i=ll.get(t);i&&(V("ComponentProvider","Removing Datastore"),ll.delete(t),i.terminate())}(this),Promise.resolve()}}function ry(n,e,t,i={}){var r;const o=(n=Zt(n,gr))._getSettings(),a=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&Wi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),i.mockUserToken){let c,h;if(typeof i.mockUserToken=="string")c=i.mockUserToken,h=ve.MOCK_USER;else{c=lh(i.mockUserToken,(r=n._app)===null||r===void 0?void 0:r.options.projectId);const f=i.mockUserToken.sub||i.mockUserToken.user_id;if(!f)throw new x(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new ve(f)}n._authCredentials=new Wp(new fc(c,h))}}/**
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
 */class Xs{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Xs(this.firestore,e,this._query)}}class Me{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ht(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Me(this.firestore,e,this._key)}}class ht extends Xs{constructor(e,t,i){super(e,t,bm(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Me(this.firestore,null,new $(e))}withConverter(e){return new ht(this.firestore,e,this._path)}}function sy(n,e,...t){if(n=de(n),Jc("collection","path",e),n instanceof gr){const i=ee.fromString(e,...t);return ul(i),new ht(n,null,i)}{if(!(n instanceof Me||n instanceof ht))throw new x(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(ee.fromString(e,...t));return ul(i),new ht(n.firestore,null,i)}}function Ys(n,e,...t){if(n=de(n),arguments.length===1&&(e=pc.newId()),Jc("doc","path",e),n instanceof gr){const i=ee.fromString(e,...t);return cl(i),new Me(n,null,new $(i))}{if(!(n instanceof Me||n instanceof ht))throw new x(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(ee.fromString(e,...t));return cl(i),new Me(n.firestore,n instanceof ht?n.converter:null,new $(i))}}/**
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
 */class dl{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new jc(this,"async_queue_retry"),this.Vu=()=>{const i=es();i&&V("AsyncQueue","Visibility state changed to "+i.visibilityState),this.t_.jo()},this.mu=e;const t=es();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=es();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Tt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!lr(e))throw e;V("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(i=>{this.Eu=i,this.du=!1;const r=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(i);throw Pt("INTERNAL UNHANDLED ERROR: ",r),i}).then(i=>(this.du=!1,i))));return this.mu=t,t}enqueueAfterDelay(e,t,i){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const r=Qs.createAndSchedule(this,e,t,i,o=>this.yu(o));return this.Tu.push(r),r}fu(){this.Eu&&H()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class yr extends gr{constructor(e,t,i,r){super(e,t,i,r),this.type="firestore",this._queue=new dl,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new dl(e),this._firestoreClient=void 0,await e}}}function oy(n,e){const t=typeof n=="object"?n:bl(),i=typeof n=="string"?n:"(default)",r=Ss(t,"firestore").getImmediate({identifier:i});if(!r._initialized){const o=oh("firestore");o&&ry(r,...o)}return r}function ay(n){if(n._terminated)throw new x(k.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||ly(n),n._firestoreClient}function ly(n){var e,t,i;const r=n._freezeSettings(),o=function(c,h,f,d){return new um(c,h,f,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,Qc(d.experimentalLongPollingOptions),d.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,r);n._componentsProvider||!((t=r.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((i=r.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),n._firestoreClient=new Zg(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(n._componentsProvider))}/**
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
 */class Bn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Bn($e.fromBase64String(e))}catch(t){throw new x(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Bn($e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Zs{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new x(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new he(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class _r{constructor(e){this._methodName=e}}/**
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
 */class Xc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new x(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new x(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}}/**
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
 */class Yc{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,r){if(i.length!==r.length)return!1;for(let o=0;o<i.length;++o)if(i[o]!==r[o])return!1;return!0}(this._values,e._values)}}/**
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
 */const cy=/^__.*__$/;class uy{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new gt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Kn(e,this.data,t,this.fieldTransforms)}}class Zc{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new gt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function eu(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw H()}}class eo{constructor(e,t,i,r,o,a){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=r,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new eo(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),r=this.Fu({path:i,xu:!1});return r.Ou(e),r}Nu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),r=this.Fu({path:i,xu:!1});return r.vu(),r}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return nr(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(eu(this.Cu)&&cy.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class hy{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||dr(e)}Qu(e,t,i,r=!1){return new eo({Cu:e,methodName:t,qu:i,path:he.emptyPath(),xu:!1,ku:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function tu(n){const e=n._freezeSettings(),t=dr(n._databaseId);return new hy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function dy(n,e,t,i,r,o={}){const a=n.Qu(o.merge||o.mergeFields?2:0,e,t,r);no("Data must be an object, but it was:",a,i);const c=nu(i,a);let h,f;if(o.merge)h=new ke(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const d=[];for(const _ of o.mergeFields){const I=Es(e,_,t);if(!a.contains(I))throw new x(k.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);su(d,I)||d.push(I)}h=new ke(d),f=a.fieldTransforms.filter(_=>h.covers(_.field))}else h=null,f=a.fieldTransforms;return new uy(new Re(c),h,f)}class vr extends _r{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof vr}}class to extends _r{_toFieldTransform(e){return new xm(e.path,new Fn)}isEqual(e){return e instanceof to}}function fy(n,e,t,i){const r=n.Qu(1,e,t);no("Data must be an object, but it was:",r,i);const o=[],a=Re.empty();sn(i,(h,f)=>{const d=ru(e,h,t);f=de(f);const _=r.Nu(d);if(f instanceof vr)o.push(d);else{const I=Er(f,_);I!=null&&(o.push(d),a.set(d,I))}});const c=new ke(o);return new Zc(a,c,r.fieldTransforms)}function py(n,e,t,i,r,o){const a=n.Qu(1,e,t),c=[Es(e,i,t)],h=[r];if(o.length%2!=0)throw new x(k.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let I=0;I<o.length;I+=2)c.push(Es(e,o[I])),h.push(o[I+1]);const f=[],d=Re.empty();for(let I=c.length-1;I>=0;--I)if(!su(f,c[I])){const C=c[I];let O=h[I];O=de(O);const A=a.Nu(C);if(O instanceof vr)f.push(C);else{const R=Er(O,A);R!=null&&(f.push(C),d.set(C,R))}}const _=new ke(f);return new Zc(d,_,a.fieldTransforms)}function Er(n,e){if(iu(n=de(n)))return no("Unsupported field value:",e,n),nu(n,e);if(n instanceof _r)return function(i,r){if(!eu(r.Cu))throw r.Bu(`${i._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Bu(`${i._methodName}() is not currently supported inside arrays`);const o=i._toFieldTransform(r);o&&r.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(i,r){const o=[];let a=0;for(const c of i){let h=Er(c,r.Lu(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,e)}return function(i,r){if((i=de(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return Lm(r.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const o=ae.fromDate(i);return{timestampValue:gs(r.serializer,o)}}if(i instanceof ae){const o=new ae(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:gs(r.serializer,o)}}if(i instanceof Xc)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Bn)return{bytesValue:Km(r.serializer,i._byteString)};if(i instanceof Me){const o=r.databaseId,a=i.firestore._databaseId;if(!a.isEqual(o))throw r.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Uc(i.firestore._databaseId||r.databaseId,i._key.path)}}if(i instanceof Yc)return function(a,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw c.Bu("VectorValues must only contain numeric values.");return qs(c.serializer,h)})}}}}}}(i,r);throw r.Bu(`Unsupported field value: ${Js(i)}`)}(n,e)}function nu(n,e){const t={};return yc(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):sn(n,(i,r)=>{const o=Er(r,e.Mu(i));o!=null&&(t[i]=o)}),{mapValue:{fields:t}}}function iu(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ae||n instanceof Xc||n instanceof Bn||n instanceof Me||n instanceof _r||n instanceof Yc)}function no(n,e,t){if(!iu(t)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(t)){const i=Js(t);throw i==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+i)}}function Es(n,e,t){if((e=de(e))instanceof Zs)return e._internalPath;if(typeof e=="string")return ru(n,e);throw nr("Field path arguments must be of type string or ",n,!1,void 0,t)}const my=new RegExp("[~\\*/\\[\\]]");function ru(n,e,t){if(e.search(my)>=0)throw nr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Zs(...e.split("."))._internalPath}catch{throw nr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function nr(n,e,t,i,r){const o=i&&!i.isEmpty(),a=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${i}`),a&&(h+=` in document ${r}`),h+=")"),new x(k.INVALID_ARGUMENT,c+n+h)}function su(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */function gy(n,e,t){let i;return i=n?n.toFirestore(e):e,i}function yy(n,e,t){n=Zt(n,Me);const i=Zt(n.firestore,yr),r=gy(n.converter,e);return io(i,[dy(tu(i),"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,Ve.none())])}function _y(n,e,t,...i){n=Zt(n,Me);const r=Zt(n.firestore,yr),o=tu(r);let a;return a=typeof(e=de(e))=="string"||e instanceof Zs?py(o,"updateDoc",n._key,e,t,i):fy(o,"updateDoc",n._key,e),io(r,[a.toMutation(n._key,Ve.exists(!0))])}function vy(n){return io(Zt(n.firestore,yr),[new Hs(n._key,Ve.none())])}function io(n,e){return function(i,r){const o=new Tt;return i.asyncQueue.enqueueAndForget(async()=>Kg(await ny(i),r,o)),o.promise}(ay(n),e)}function ou(){return new to("serverTimestamp")}(function(e,t=!0){(function(r){rn=r})(en),Gt(new At("firestore",(i,{instanceIdentifier:r,options:o})=>{const a=i.getProvider("app").getImmediate(),c=new yr(new Kp(i.getProvider("auth-internal")),new Yp(i.getProvider("app-check-internal")),function(f,d){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new x(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ji(f.options.projectId,d)}(a,r),a);return o=Object.assign({useFetchStreams:t},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),ct($a,"4.7.3",e),ct($a,"4.7.3","esm2017")})();function Ey(){try{const n=typeof window!="undefined"&&window.DigitEarnBridge;if(n&&typeof n.getFirebaseConfig=="function"){const e=String(n.getFirebaseConfig()||"");if(e.length>2)return JSON.parse(e)||{}}}catch{}return typeof window!="undefined"&&window.__DIGITEARN_FB_CONFIG__||{}}const Mt=Ey(),xt={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0},Vi={apiKey:Mt.apiKey||xt.apiKey||"",authDomain:Mt.authDomain||xt.authDomain||"",projectId:Mt.projectId||xt.projectId||"",storageBucket:Mt.storageBucket||xt.storageBucket||"",messagingSenderId:Mt.messagingSenderId||xt.messagingSenderId||"",appId:Mt.appId||xt.appId||""},au=!!(Vi.apiKey&&Vi.projectId&&Vi.appId),wy=typeof location!="undefined"&&/^https?:$/.test(location.protocol),Iy=wy?"":"https://digitearn.vercel.app",lu=Tl(Vi),Xn=Hp(lu),ro=oy(lu),Pe=n=>"৳"+Number(n||0).toLocaleString("en-BD",{maximumFractionDigits:2}),Ne=n=>{const e=n!=null&&n.toDate?n.toDate():n?new Date(n):new Date(0);return e.getTime()?e.toLocaleString("en-BD",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):"—"},N=n=>String(n!=null?n:"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);async function fe(n,e={},t="POST"){if(!au)throw new Error("Firebase configure করা নেই");let i=n;const r=String(n).match(/^\/api\/admin\/([a-z0-9-]+)/);r&&(i="/api/admin/panel?op="+encodeURIComponent(r[1]));const o=async c=>{const h=Xn.currentUser;if(!h)throw new Error("Login required — আবার লগইন করুন");const f=await fetch(Iy+i,{method:t,headers:{"Content-Type":"application/json",Authorization:"Bearer "+await h.getIdToken(c)},body:t==="GET"?void 0:JSON.stringify(e)});let d="";try{d=await f.text()}catch{}let _=null;try{_=d?JSON.parse(d):{}}catch{}return{resp:f,data:_||{},isJson:!!_}};let a=await o(!1);if(!a.resp.ok&&(a.resp.status===401||a.data.sessionExpired===!0)&&(a=await o(!0)),!a.resp.ok){const c=a.data||{};if(c.protection||c.error&&typeof c.error=="object"&&String(c.error.code)==="401")throw new Error("Vercel Deployment Protection ব্লক করছে — এই deployment URL থেকে admin API চলে না। Production URL (digitearn.vercel.app) ব্যবহার করুন বা Vercel → Settings → Deployment Protection off করুন।");const h=typeof c.error=="string"?c.error:String(c.error&&(c.error.message||c.error.code)||c.message||"");throw new Error(h||(a.isJson?"":`সার্ভার JSON দেয়নি (HTTP ${a.resp.status})`)||`Operation fail হয়েছে (${a.resp.status}) — আবার চেষ্টা করুন`)}return a.data}async function Ty(){try{return await fe("/api/admin/health",{})}catch(n){const e=String(n&&n.message||n);throw/Unknown admin endpoint|404/i.test(e)?new Error("সার্ভারের build পুরোনো — `?op=health` নেই, মানে নতুন api/ + lib/ এখনো deploy হয়নি। Push করে Vercel-এ Redeploy করুন।"):n}}async function by(){try{const n=await fe("/api/admin/verify",{});return{isAdmin:!!n.isAdmin,authenticated:!!n.authenticated,authState:n.authState||"",error:""}}catch(n){return{isAdmin:!1,authenticated:!1,error:String(n&&n.message||"Admin verify fail")}}}async function Xe(n,e={}){const t=await fe("/api/admin/read",{what:n,...e});return Array.isArray(t.items)?t.items:[]}async function cu(n,e={}){const t=await fe("/api/admin/read",{what:n,...e});return t&&t.item?t.item:null}const Nt=(n,e={})=>fe("/api/admin/write",{what:n,...e});async function uu(n="pending",e=100){return Xe("proofs",{status:n,limit:e})}async function Ay(n){await fe("/api/admin/proof-review",{proofId:n,action:"approve"})}async function hu(n="pending",e=100){return Xe("deposits",{status:n,limit:e})}async function Sy(n){await fe("/api/admin/deposit-review",{depositId:n,action:"approve"})}async function Ry(n,e=""){await fe("/api/admin/deposit-review",{depositId:n,action:"reject",note:e})}async function so(n=300){return Xe("users",{limit:n})}async function wr(n){return await cu("user",{id:n})}async function Py(n,e=20){return Xe("user-withdrawals",{uid:n,limit:e})}async function ky(n,e=25){return Xe("user-transactions",{uid:n,limit:e})}async function fl(n,e){await fe("/api/admin/set-active",{uid:n,active:e})}async function Cy(){return Xe("tasks",{limit:500})}async function du(){const n=await fe("/api/admin/read",{what:"jobs"});return Array.isArray(n.items)?n.items:[]}async function Ny(n){return Nt("task-create",{data:n})}async function Dy(n,e,t=""){await fe("/api/admin/proof-review",{proofId:n,action:e,note:t})}async function Oy(){return Nt("leaderboard-backfill",{})}async function Ly(n=[]){return await fe("/api/admin/seed-tasks",{slugs:n})}async function Vy(n,e){if(e.url&&!/^https?:\/\/\S+$/i.test(e.url))throw new Error("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)");return Nt("task",{slug:n,data:e})}const fu=["giftCode"];async function My(){const[n,e]=await Promise.all([cu("settings").catch(()=>null),fe("/api/admin/secret",{get:!0}).catch(()=>({}))]),t={...n||{}};delete t.id;const i={},r=e&&typeof e.giftCode=="string";for(const o of fu)typeof e[o]=="string"&&(i[o]=e[o]);return{...t,...i,_secretLoaded:r}}async function xy(n="pending",e=100){return Xe("withdrawals",{status:n,limit:e})}async function ws(n,e,t,i=""){await fe("/api/admin/withdrawal-review",{userId:n,id:e,action:t,note:i})}async function Uy(n){const e={...n},t={};for(const r of fu)r in e&&(t[r]=e[r],delete e[r]);await Nt("settings",{data:e});const i={...t};for(const r of Object.keys(i))String(i[r]).trim()===""&&!i.__clear&&delete i[r];Object.keys(i).length&&await fe("/api/admin/secret",i)}async function Fy(){await fe("/api/admin/secret",{giftCode:"",__clear:!0})}async function $y(){return Xe("notices",{limit:100})}async function jy({title:n,body:e,type:t="notice",expiresAt:i=null}){const r={title:String(n||"").trim().slice(0,60),body:String(e||"").trim().slice(0,300),type:t==="warning"?"warning":"notice",targetType:"all",enabled:!0,sort:10,createdAt:ou()};return i&&(r.expiresAt=i),Nt("notice-add",r)}async function By(n,{title:e,body:t,enabled:i,sort:r,type:o,expiresAt:a}){const c={title:String(e||"").trim().slice(0,60),body:String(t||"").trim().slice(0,300),enabled:!!i,sort:Number(r)||10};return o&&(c.type=o==="warning"?"warning":"notice"),a&&(c.expiresAt=a),Nt("notice-update",{id:n,...c})}async function qy(n){return Nt("notice-delete",{id:n})}async function Hy(n){return Xe("user-target-notices",{uid:n,limit:50})}async function zy(n,{title:e,body:t,type:i="warning",expiresAt:r=null}){const o={title:String(e||"").trim().slice(0,60),body:String(t||"").trim().slice(0,300),type:i==="warning"?"warning":"notice",targetType:"user",targetUserId:n,enabled:!0,sort:10,createdAt:ou(),createdBy:"admin"};r&&(o.expiresAt=r),await yy(Ys(sy(ro,"users",n,"targetNotices")),o)}async function pu(n,e,{enabled:t}){await _y(Ys(ro,"users",n,"targetNotices",e),{enabled:!!t})}async function mu(n,e){await vy(Ys(ro,"users",n,"targetNotices",e))}async function Gy(){return(await fe("/api/admin/notice-targeted",{},"GET")).targeted||[]}async function Wy(){const[n,e,t]=await Promise.all([so(1e3),uu("pending",100),hu("pending",100)]);return{totalUsers:n.length,activeUsers:n.filter(i=>i.isActive).length,pendingProofs:e.length,pendingDeposits:t.length,totalBalance:n.reduce((i,r)=>i+(Number(r.balance)||0),0),recentProofs:e.slice(0,3),recentDeposits:t.slice(0,3)}}const Ky={url:300,email:120,tel:20,number:60,textarea:2e3,text:100,password:100,image:3e5};async function pl(n,{maxSide:e=900,quality:t=.72,maxBytes:i=22e4}={}){if(!n||!/^image\/(png|jpe?g|webp)$/.test(n.type||""))throw new Error("PNG/JPG/WEBP ছবি দিন");if(n.size>8*1024*1024)throw new Error("ছবি 8MB-এর বড় না — ছোট করুন");const r=URL.createObjectURL(n);try{const o=await new Promise((I,C)=>{const O=new Image;O.onload=()=>I(O),O.onerror=()=>C(new Error("ছবি পড়া যায়নি")),O.src=r});let a=o.naturalWidth||o.width||0,c=o.naturalHeight||o.height||0;if(!a||!c)throw new Error("ছবির size বোঝা যায়নি");const h=Math.min(1,e/Math.max(a,c));a=Math.max(1,Math.round(a*h)),c=Math.max(1,Math.round(c*h));const f=document.createElement("canvas");f.width=a,f.height=c,f.getContext("2d").drawImage(o,0,0,a,c);let d="",_=t;for(let I=0;I<6&&(d=f.toDataURL("image/jpeg",_),!(d.length<=i));I++)_-=.12;if(d.length>Ky.image)throw new Error("ছবি ছোট করা যাচ্ছে না — আরেকটা ছবি দিন");return d}finally{URL.revokeObjectURL(r)}}const Yn=document.getElementById("app");let oo=null;function M(n,e="success"){const t=document.createElement("div");t.className="adm-toast "+e,t.innerHTML=`<i class="fa-solid ${e==="error"?"fa-circle-xmark":"fa-circle-check"}"></i> ${N(n)}`,Yn.appendChild(t),requestAnimationFrame(()=>t.classList.add("show")),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3200)}au||(Yn.innerHTML='<div class="loading-center"><p style="max-width:340px;text-align:center">Firebase env variables set নেই।<br>Vercel-এ ৬টা <b>VITE_FIREBASE_*</b> variable দিন।</p></div>');Of(Xn,n=>{if(!n){oo=null,ao();return}gu(n)});async function gu(n){const e=await by();if(e.error){Yn.innerHTML=`<div class="loading-center" style="display:block;text-align:center;padding:28px">
      <p style="margin-bottom:12px">Admin check করা যায়নি:<br><b style="font-size:13px">${N(e.error)}</b></p>
      <button class="adm-btn gold" id="gateRetry"><i class="fa-solid fa-rotate"></i> আবার চেষ্টা করুন</button>
      <p class="muted" style="margin-top:12px;font-size:12px">লগইন ভাঙেনি — শুধু সার্ভার উত্তর দেয়নি।</p></div>`,document.getElementById("gateRetry").addEventListener("click",()=>gu(n));return}if(!e.isAdmin){await Jl(Xn),ao("এই email টা admin list-এ নেই — Firestore-এর admins collection-এ এই email-এর document আছে কিনা দেখুন।");return}oo={email:n.email},window.location.hash=window.location.hash||"#/overview",Jy(),window.addEventListener("hashchange",yu)}function ao(n=""){Yn.innerHTML=`
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-logo"><i class="fa-solid fa-bolt"></i></div>
        <h1>DigitEarn <span>Admin</span></h1>
        <p class="muted">Admin panel-এ লগইন করুন</p>
        ${n?`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${N(n)}</div>`:""}
        <form id="loginForm">
          <input type="email" id="lgEmail" class="adm-input" placeholder="Admin email" required>
          <input type="password" id="lgPass" class="adm-input" placeholder="Password" required>
          <button class="adm-btn gold" type="submit"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
        </form>
      </div>
    </div>`,document.getElementById("loginForm").addEventListener("submit",async e=>{e.preventDefault();const t=e.target.querySelector("button");t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{await Cf(Xn,document.getElementById("lgEmail").value.trim(),document.getElementById("lgPass").value)}catch{t.disabled=!1,t.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> Login',ao("Login fail — email/password ঠিক আছে কিনা দেখুন (অথবা এই email-এ Firebase Auth-এ account নেই)।")}})}const Qy=[{id:"overview",label:"Overview",icon:"fa-gauge-high"},{id:"proofs",label:"Submissions",icon:"fa-clipboard-list"},{id:"deposits",label:"Deposits",icon:"fa-money-bill-wave"},{id:"withdrawals",label:"Withdrawals",icon:"fa-money-bill-transfer"},{id:"users",label:"Users",icon:"fa-users"},{id:"tasks",label:"Micro Jobs",icon:"fa-briefcase"},{id:"settings",label:"Settings",icon:"fa-gear"},{id:"notices",label:"Notices",icon:"fa-bullhorn"}];function Jy(){Yn.innerHTML=`
    <header class="adm-top">
      <div class="adm-logo"><i class="fa-solid fa-bolt"></i> DigitEarn <span>Admin</span></div>
      <div class="adm-top-right">
        <span class="adm-email"><i class="fa-solid fa-user-shield"></i> ${N(oo.email)}</span>
        <button class="adm-btn ghost sm" id="logoutBtn"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
    </header>
    <nav class="adm-nav">${Qy.map(n=>`<a href="#/${n.id}" data-nav="${n.id}"><i class="fa-solid ${n.icon}"></i> ${n.label}</a>`).join("")}</nav>
    <main class="adm-main" id="admMain"><div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div></main>`,document.getElementById("logoutBtn").addEventListener("click",()=>Jl(Xn)),yu()}async function yu(){const n=(window.location.hash||"#/overview").replace("#/",""),e=document.getElementById("admMain");if(e){document.querySelectorAll("[data-nav]").forEach(t=>t.classList.toggle("on",t.dataset.nav===n)),e.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';try{n==="proofs"?await Mi(e):n==="deposits"?await xi(e):n==="withdrawals"?await Is(e):n==="users"?await e_(e):n==="tasks"?await Ui(e):n==="settings"?await _u(e):n==="notices"?await $t(e):await Xy(e)}catch(t){const i=String(t&&t.message||t),r=/permission|insufficient/i.test(i);e.innerHTML=`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${N(i)}
      ${r?`<div class="muted" style="font-size:12px;margin-top:8px">
        Panel এখন server (Admin SDK) দিয়ে পড়ে — নিচের ↻ বাটন চাপুন। না চললে দেখুন:
        Firestore-এর <code>admins/&lt;email&gt;</code> doc-id হুবহু আপনার login email
        হতে হবে (বড়/ছোট হাতের তফাতও fail করে), আর Vercel function-এর build
        নতুন কিনা (?op=read থাকতে হবে)।</div>`:""}</div>`}}}async function Xy(n){const e=await Wy();n.innerHTML=`
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
      ${e.recentProofs.map(t=>`<div class="mini-row"><b>${N(t.taskName||t.taskSlug)}</b> <span class="muted">${Ne(t.createdAt)}</span><span class="badge gold">+${Pe(t.reward)}</span></div>`).join("")}
      <a href="#/proofs" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${e.recentDeposits.length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-money-bill-wave" style="color:#d97706"></i> সর্বশেষ Pending Deposits</h4>
      ${e.recentDeposits.map(t=>`<div class="mini-row"><b>${N(t.method)}</b> <span class="muted">${Ne(t.createdAt)}</span><span class="badge gold">${Pe(t.amount)}</span></div>`).join("")}
      <a href="#/deposits" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${!e.recentProofs.length&&!e.recentDeposits.length?'<p class="muted center-note">কোনো pending item নেই ✓</p>':""}
    <div class="adm-card">
      <h4><i class="fa-solid fa-stethoscope" style="color:#d97706"></i> সিস্টেম চেক (API auth)</h4>
      <p class="muted" style="font-size:13px;margin-bottom:10px">ইউজার যদি “Login required” দেখায় বা approve/reject fail করে, এখানে চাপলে কারণটা দেখাবে — Vercel-এর Firebase env, service account-এর project, আর Firestore পড়া যাচ্ছে কিনা।</p>
      <button class="adm-btn ghost sm" id="healthBtn"><i class="fa-solid fa-heart-pulse"></i> Check করুন</button>
      <div id="healthOut" style="margin-top:10px"></div>
    </div>`,document.getElementById("healthBtn").addEventListener("click",Yy)}async function Yy(){const n=document.getElementById("healthOut");n&&(n.innerHTML='<span class="muted"><i class="fa-solid fa-spinner fa-spin"></i> চেক হচ্ছে…</span>');let e;try{e=await Ty()}catch(o){n&&(n.innerHTML=`<div class="form-err">${N(String(o.message||o))}</div>`);return}const t=(o,a,c)=>`<div class="mini-row"><span class="badge ${o?"green":"red"}">${o?"✓":"✗"}</span> ${N(a)}${c?` <span class="muted">${N(c)}</span>`:""}</div>`,i=[t(!!e.ok,"সামগ্রিক",e.ok?"server ঠিক আছে — ইউজারের “Login required” হলে সেটা deployment-এর dosh নয়":"server-side সেটআপে সমস্যা"),t(!!e.firestore&&!!e.firestore.reachable,"Firestore পড়া",e.firestore&&e.firestore.settingsDoc?"settings/site পাওয়া গেছে":"পড়া যাচ্ছে না"),t(!e.sdk||e.sdk.cjsRequireSafe!==!1,"Admin SDK (firebase-admin)",`v${e.sdk&&e.sdk.version||"?"}${e.sdk&&e.sdk.jose?" · jose@"+e.sdk.jose:""}`+(e.sdk&&e.sdk.cjsRequireSafe===!1?" — CJS require() ভাঙে, functions 500 (Node 22.x বা ^13.10.0 pin লাগবে)":"")),t(!!e.privateKeyShape,"Private key ফরম্যাট",""),t(!!e.projectMatch,"Project match",`site: ${e.tokenProject||e.serverProject||"?"} / server: ${e.serverProject||"?"} / SA: ${e.serviceAccountProject||"?"}`),t(!!e.authed,"আপনার token verify",e.authed?"OK":`ব্যর্থ (${N(e.authState||"")} ${N(e.authCode||"")})`)].join(""),r=(e.notes||[]).map(o=>`<p class="muted" style="font-size:12px;margin-top:6px"><i class="fa-solid fa-circle-info"></i> ${N(o)}</p>`).join("");n&&(n.innerHTML=i+r)}let Ai="pending";function Zy(n,e){const t=[];if(Array.isArray(e)&&e.length)for(const o of e){if(!o||typeof o!="object")continue;const a=String(o.label||"").slice(0,50)||"Field",c=String(o.type||"text"),h=o.value===void 0||o.value===null||o.value===""?"":String(o.value);t.push({label:a,type:c,value:h,required:!!o.required,secret:o.secret===!0})}else if(n&&typeof n=="object"&&!Array.isArray(n))for(const[o,a]of Object.entries(n))t.push({label:o,type:"text",value:String(a!=null?a:""),required:!1});if(!t.length)return"";const i=t.map(o=>{const a=/(password|passwd|pwd|passcode|otp|onetimecode|2fa|tfa|twofactor|authenticat|recovery|backupcode|secret|apikey|accesstoken|refreshtoken|privatetoken|privatekey|token|cookie|session|bearer)/,c=I=>String(I||"").toLowerCase().replace(/[^a-z0-9]/g,""),h=!!o.value&&(o.type==="password"||o.secret||a.test(c(o.label))),f=h?"•".repeat(Math.min(o.value.length,14)):o.value||"—",d=h?`<button type="button" class="adm-btn ghost sm" data-reveal data-raw="${N(o.value)}" style="margin-left:6px"><i class="fa-solid fa-eye"></i> দেখুন</button>`:"",_=[h?"sub-secret":"",o.type==="textarea"?"sub-multi":""].filter(Boolean).join(" ");return`<div class="sub-row"><span class="muted">${N(o.label)}:</span><b${_?` class="${_}"`:""}>${N(f)}</b>${d}${!o.value&&o.required?' <span class="muted">(required খালি)</span>':""}</div>`}).join(""),r=t.map(o=>`${o.label}: ${o.value}`).join(`
`);return`<div class="sub-fields">${i}</div>
    <button type="button" class="adm-btn ghost sm" data-copyall data-all="${N(r)}" style="margin-top:6px"><i class="fa-solid fa-clipboard"></i> Copy All Data</button>`}async function Mi(n){n.innerHTML=`
    <div class="chip-row" id="proofChips">
      ${["pending","approved","rejected","all"].map(d=>`<button class="chip ${d===Ai?"on":""}" data-pf="${d}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[d]}</button>`).join("")}
    </div>
    <div id="proofList"></div>`,document.getElementById("proofChips").addEventListener("click",d=>{const _=d.target.closest("[data-pf]");_&&(Ai=_.dataset.pf,document.querySelectorAll("[data-pf]").forEach(I=>I.classList.toggle("on",I.dataset.pf===Ai)),Mi(n))});const e=await uu(Ai),t=document.getElementById("proofList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো submission নেই।</p>';return}const i=await Promise.all(e.map(async d=>({p:d,user:d.user||await wr(d.userId).catch(()=>null)}))),r=await du().catch(()=>[]),o=d=>r.find(_=>_.slug===d)||null,a=({p:d,user:_})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${N((_==null?void 0:_.name)||d.username||"—")}</b><span class="muted">${N((_==null?void 0:_.email)||d.userEmail||"")}</span></div>
        <span class="badge ${d.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[d.status]||d.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-user"></i> UID: ${N(d.userId)}${_!=null&&_.mobile?` • ${N(_.mobile)}`:""}</div>
      <div class="ai-meta"><i class="fa-solid fa-briefcase"></i> ${N(d.taskName||d.taskSlug)} • <b class="gold-txt">${Pe(d.reward)}</b> • ${Ne(d.createdAt)}</div>
      ${Zy(d.submittedData,d.submittedFields)}
      ${(d.images||[]).length?`<div class="thumb-row">${d.images.map(I=>`<a href="${N(I)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${N(I)}" loading="lazy" alt="proof"></a>`).join("")}</div>`:""}
      ${d.status==="rejected"&&d.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${N(d.note)}</p>`:""}
      ${d.status!=="pending"&&d.reviewedAt?`<p class="ai-meta muted-sm">reviewed ${Ne(d.reviewedAt)}${d.approvedBy?" by "+N(d.approvedBy):""}${d.rejectedBy?" by "+N(d.rejectedBy):""}</p>`:""}
      ${d.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-approve="${d.id}"><i class="fa-solid fa-check"></i> Approve +${Pe(d.reward)}</button>
        <button class="adm-btn red sm" data-rresub="${d.id}"><i class="fa-solid fa-rotate-left"></i> Reject & Allow Resubmit</button>
        <button class="adm-btn ghost sm" data-rhide="${d.id}"><i class="fa-solid fa-eye-slash"></i> Reject & Hide</button>
      </div>`:d.status==="rejected"?`<p class="ai-note"><i class="fa-solid fa-${d.hiddenForUser?"eye-slash":"rotate-left"}"></i> ${d.hiddenForUser?"Reject & Hide — jobটা শুধু এই user-এর list থেকে লুকানো":"Reject & Allow Resubmit — user আবার submit করতে পারবে"}</p>`:""}
    </div>`,c=new Map;for(const d of i){const _=String(d.p.taskSlug||"(unknown)");c.has(_)||c.set(_,[]),c.get(_).push(d)}const h=[...c.entries()].sort((d,_)=>_[1].length-d[1].length||String(d[0]).localeCompare(String(_[0])));t.innerHTML=h.map(([d,_])=>{const I=o(d),C=I&&Number(I.requiredUsers)||0;return`<div class="adm-card mj-jobhead">
      <b><i class="fa-solid fa-briefcase" style="color:#d97706"></i> ${N(_[0].p.taskName||d)}</b>
      <span class="muted" style="margin-left:6px">${N(d)}</span>
      <div class="mj-statline">
        <span><i class="fa-solid fa-users"></i> Required <b>${C||"∞"}</b></span>
        <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${I&&Number(I.approvedCount)||0}</b></span>
        <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${I?Number(I.pending)||0:_.filter(A=>A.p.status==="pending").length}</b></span>
        <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${I&&Number(I.rejected)||0}</b></span>
        <span><i class="fa-solid fa-user-plus"></i> Remaining <b>${I&&I.remaining!==null&&I.remaining!==void 0?I.remaining:"∞"}</b></span>
        ${I&&(I.full||I.closed)?'<span class="badge red">FULL/CLOSED</span>':""}
      </div>
      <p class="muted" style="font-size:12px;margin:6px 0 0">approve করলে-ই ওই user-এর list থেকে job লুকিয়ে যাবে; Required Users শেষ হলে job স্বয়ংক্রিয়ভাবে FULL হবে (তখন আর approve হয় না)।</p>
    </div>`+_.map(a).join("")}).join(""),t.querySelectorAll("[data-approve]").forEach(d=>d.addEventListener("click",async()=>{d.disabled=!0;try{await Ay(d.dataset.approve),M("Proof approve — reward balance-এ যোগ হয়েছে"),Mi(n)}catch(_){M(_.message,"error"),d.disabled=!1}})),t.querySelectorAll("[data-reveal]").forEach(d=>d.addEventListener("click",()=>{const _=d.previousElementSibling;if(!_)return;const I=d.dataset.on==="1";_.textContent=I?"•".repeat(Math.min(String(d.dataset.raw).length,14)):d.dataset.raw,d.innerHTML=I?'<i class="fa-solid fa-eye"></i> দেখুন':'<i class="fa-solid fa-eye-slash"></i> লুকান',d.dataset.on=I?"":"1"})),t.querySelectorAll("[data-copyall]").forEach(d=>d.addEventListener("click",async()=>{const _=d.dataset.all||"";try{await navigator.clipboard.writeText(_),M("সব field data copy হয়েছে")}catch{prompt("Copy করুন:",_)}}));const f=async(d,_,I)=>{const C=prompt("Reject reason (user দেখবে):")||"";try{await Dy(d,_,C),M(I),Mi(n)}catch(O){M(O.message,"error")}};t.querySelectorAll("[data-rresub]").forEach(d=>d.addEventListener("click",()=>f(d.dataset.rresub,"reject_resubmit","Reject — user ঠিক করে আবার submit করতে পারবে"))),t.querySelectorAll("[data-rhide]").forEach(d=>d.addEventListener("click",()=>{confirm("Jobটা শুধু এই user-এর list থেকে লুকানো হবে (admin list-এ থাকবে)। ঠিক আছে?")&&f(d.dataset.rhide,"reject_hide","Reject + Hide — এই user-এর MicroJobs list থেকে বাদ")})),t.querySelectorAll("[data-reject]").forEach(d=>d.addEventListener("click",()=>f(d.dataset.reject,"reject_resubmit","Proof reject করা হয়েছে")))}let Si="pending";async function xi(n){n.innerHTML=`
    <div class="chip-row" id="depChips">
      ${["pending","approved","rejected","all"].map(r=>`<button class="chip ${r===Si?"on":""}" data-df="${r}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[r]}</button>`).join("")}
    </div>
    <div id="depList"></div>`,document.getElementById("depChips").addEventListener("click",r=>{const o=r.target.closest("[data-df]");o&&(Si=o.dataset.df,document.querySelectorAll("[data-df]").forEach(a=>a.classList.toggle("on",a.dataset.df===Si)),xi(n))});const e=await hu(Si),t=document.getElementById("depList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো deposit নেই।</p>';return}const i=await Promise.all(e.map(async r=>({d:r,user:r.user||await wr(r.userId).catch(()=>null)})));t.innerHTML=i.map(({d:r,user:o})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${N((o==null?void 0:o.name)||r.userId)}</b><span class="muted">${N((o==null?void 0:o.mobile)||"")}</span></div>
        <span class="badge ${r.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[r.status]||r.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-wave"></i> ${N(r.method)} • <b class="gold-txt">${Pe(r.amount)}</b> • TrxID: <b>${N(r.trxId)}</b>${r.senderNumber?` • Sender: <b>${N(r.senderNumber)}</b>`:""}</div>
      <div class="ai-meta muted-sm">${Ne(r.createdAt)}${r.status!=="pending"&&r.reviewedAt?" • reviewed "+Ne(r.reviewedAt):""}</div>
      ${r.image?`<div class="thumb-row"><a href="${N(r.image)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${N(r.image)}" loading="lazy" alt="payment proof"></a></div>`:""}
      ${r.status==="rejected"&&r.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${N(r.note)}</p>`:""}
      ${r.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-dapprove="${r.id}"><i class="fa-solid fa-check"></i> Approve — Account Active</button>
        <button class="adm-btn red sm" data-dreject="${r.id}"><i class="fa-solid fa-xmark"></i> Reject</button>
      </div>`:""}
    </div>`).join(""),t.querySelectorAll("[data-dapprove]").forEach(r=>r.addEventListener("click",async()=>{if(confirm("Approve করলে account ACTIVE হবে + activation bonus যোগ হবে। নিশ্চিত?")){r.disabled=!0;try{await Sy(r.dataset.dapprove),M("Deposit approve — account active + bonus"),xi(n)}catch(o){M(o.message,"error"),r.disabled=!1}}})),t.querySelectorAll("[data-dreject]").forEach(r=>r.addEventListener("click",async()=>{const o=prompt("Reject reason (user দেখবে):")||"";try{await Ry(r.dataset.dreject,o),M("Deposit reject করা হয়েছে"),xi(n)}catch(a){M(a.message,"error")}}))}let Ri="pending";async function Is(n){n.innerHTML=`
    <div class="chip-row" id="wdChips">
      ${["pending","paid","rejected","all"].map(o=>`<button class="chip ${o===Ri?"on":""}" data-wf="${o}">${{pending:"Pending",paid:"Paid",rejected:"Rejected",all:"সব"}[o]}</button>`).join("")}
    </div>
    <div id="wdList"></div>`,document.getElementById("wdChips").addEventListener("click",o=>{const a=o.target.closest("[data-wf]");a&&(Ri=a.dataset.wf,document.querySelectorAll("[data-wf]").forEach(c=>c.classList.toggle("on",c.dataset.wf===Ri)),Is(n))});const e=await xy(Ri),t=document.getElementById("wdList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো withdrawal নেই। (পুরনো pending request Users tab-এ user-এর detail-এ দেখাবে)</p>';return}const i=await Promise.all(e.map(async o=>({w:o,user:o.user||await wr(o.userId).catch(()=>null)})));t.innerHTML=i.map(({w:o,user:a})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${N((a==null?void 0:a.name)||o.name||o.userId)}</b><span class="muted">${N((a==null?void 0:a.mobile)||"")}</span></div>
        <span class="badge ${o.status==="paid"?"green":o.status}">${{pending:"PENDING",paid:"PAID",rejected:"REJECTED"}[o.status]||o.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-transfer"></i> ${N(o.method)} • <b class="gold-txt">${Pe(o.amount)}</b> • ${N(o.accountNumber)}</div>
      <div class="ai-meta muted-sm">${Ne(o.createdAt)}${o.processedAt?" • processed "+Ne(o.processedAt):""}</div>
      ${o.status==="rejected"&&o.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${N(o.note)}</p>`:""}
      ${o.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-wpaid="${o.id}"><i class="fa-solid fa-check"></i> Paid (টাকা পাঠানো হয়েছে)</button>
        <button class="adm-btn red sm" data-wrej="${o.id}"><i class="fa-solid fa-xmark"></i> Reject (টাকা ফেরত)</button>
      </div>`:""}
    </div>`).join("");const r=async(o,a)=>{if(!(a==="paid"&&!confirm("এটা Paid মার্ক করবেন? (টাকা send করে ফেলেছেন মানে)"))&&!(a==="rejected"&&!confirm("Reject করলে amount user-এর balance-এ ফেরত যাবে। নিশ্চিত?"))){o.disabled=!0;try{const c=e.find(h=>h.id===o.dataset[a==="paid"?"wpaid":"wrej"]);await ws(c.userId,c.id,a),M(a==="paid"?"Withdrawal paid মার্ক হয়েছে":"Withdrawal reject — টাকা ফেরত হয়েছে"),Is(n)}catch(c){M(c.message,"error"),o.disabled=!1}}};t.querySelectorAll("[data-wpaid]").forEach(o=>o.addEventListener("click",()=>r(o,"paid"))),t.querySelectorAll("[data-wrej]").forEach(o=>o.addEventListener("click",()=>r(o,"rejected")))}let ns="",Oe=null;async function e_(n){n.innerHTML=`
    <input type="search" id="userSearch" class="adm-input" placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." value="${N(ns)}">
    <div id="userList" class="user-list"></div>
    <div id="userDetail"></div>`;const e=async()=>{const i=await so(300),r=ns.trim().toLowerCase(),o=r?i.filter(c=>(c.name||"").toLowerCase().includes(r)||String(c.mobile||"").includes(r)):i,a=document.getElementById("userList");a.innerHTML=o.slice(0,100).map(c=>`
      <div class="user-row ${c.uid===Oe?"on":""}" data-uid="${c.uid}">
        <div class="ur-avatar">${N((c.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${N(c.name||"—")}</b><span class="muted">${N(c.mobile||"")}</span></div>
        <div class="ur-right"><b class="gold-txt">${Pe(c.balance)}</b>${c.isActive?'<span class="badge green">ACTIVE</span>':'<span class="badge gray">INACTIVE</span>'}</div>
      </div>`).join("")||'<p class="muted center-note">কোনো ইউজার পাওয়া যায়নি।</p>',a.querySelectorAll("[data-uid]").forEach(c=>c.addEventListener("click",()=>{Oe=c.dataset.uid,e(),t()})),t()},t=async()=>{const i=document.getElementById("userDetail");if(!Oe){i.innerHTML="";return}i.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';const[r,o,a,c]=await Promise.all([wr(Oe),ky(Oe),Py(Oe,10),Hy(Oe).catch(()=>[])]);if(!r){i.innerHTML="";return}i.innerHTML=`
      <div class="adm-card detail-card">
        <h4><i class="fa-solid fa-user" style="color:#d97706"></i> ${N(r.name||"User")} <span class="muted" style="font-weight:500">• ${N(r.mobile||"")}</span></h4>
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
        ${a.length?a.map(d=>`<div class="mini-row">
          <b>${N(d.method)} • ${Pe(d.amount)}</b>
          <span class="muted">${N(d.accountNumber)} • ${Ne(d.createdAt)}</span>
          <span class="badge ${d.status==="paid"?"green":d.status}">${d.status.toUpperCase()}</span>
          ${d.status==="pending"?`<button class="adm-btn green sm" style="margin-left:6px" data-wd-paid="${d.id}">Paid</button><button class="adm-btn red sm" style="margin-left:4px" data-wd-rej="${d.id}">Reject</button>`:""}
        </div>`).join(""):'<p class="muted">কোনো withdrawal নেই।</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> এই user-এর private Notice/Warning</h4>
        ${c.length?c.map(d=>`<div class="mini-row">
          <b>${d.type==="warning"?"⚠️ ":""}${N(d.title||"")} ${d.enabled?"":'<span class="badge gray">OFF</span>'}</b>
          <span class="muted">${N(d.body||"")}</span>
          <span><button class="adm-btn ghost sm" style="margin-left:6px" data-tn-tgl="${d.id}">${d.enabled?"Hide":"Show"}</button><button class="adm-btn red sm" style="margin-left:4px" data-tn-del="${d.id}">Del</button></span>
        </div>`).join(""):'<p class="muted">কোনো private notice/warning নেই। (Notices tab থেকে পাঠান)</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-receipt" style="color:#d97706"></i> Recent Transactions</h4>
        ${o.length?o.map(d=>`<div class="mini-row"><b>${N(d.note||d.type)}</b><span class="muted">${Ne(d.createdAt)}</span><span class="badge ${Number(d.amount)>=0?"green":"gray"}">${Number(d.amount)>=0?"+":""}${Pe(d.amount)}</span></div>`).join(""):'<p class="muted">কোনো transaction নেই।</p>'}
      </div>`;const h=i.querySelector("[data-act]");h&&h.addEventListener("click",async()=>{try{await fl(h.dataset.act,!0),M("User active করা হয়েছে"),e()}catch(d){M(d.message,"error")}});const f=i.querySelector("[data-deact]");f&&f.addEventListener("click",async()=>{if(confirm("User-কে inactive করবেন?"))try{await fl(f.dataset.deact,!1),M("User inactive করা হয়েছে"),e()}catch(d){M(d.message,"error")}}),i.querySelectorAll("[data-wd-paid]").forEach(d=>d.addEventListener("click",async()=>{if(confirm("Paid মার্ক করবেন?")){d.disabled=!0;try{await ws(Oe,d.dataset.wdPaid,"paid"),M("Paid মার্ক হয়েছে"),t()}catch(_){M(_.message,"error"),d.disabled=!1}}})),i.querySelectorAll("[data-wd-rej]").forEach(d=>d.addEventListener("click",async()=>{if(confirm("Reject করলে টাকা user-এর balance-এ ফেরত যাবে। নিশ্চিত?")){d.disabled=!0;try{await ws(Oe,d.dataset.wdRej,"rejected"),M("Reject — টাকা ফেরত"),t()}catch(_){M(_.message,"error"),d.disabled=!1}}})),i.querySelectorAll("[data-tn-tgl]").forEach(d=>d.addEventListener("click",async()=>{const _=c.find(I=>I.id===d.dataset.tnTgl);try{await pu(Oe,_.id,{enabled:!_.enabled}),M("Notice toggle"),t()}catch(I){M(I.message,"error")}})),i.querySelectorAll("[data-tn-del]").forEach(d=>d.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await mu(Oe,d.dataset.tnDel),M("Notice delete"),t()}catch(_){M(_.message,"error")}}))};document.getElementById("userSearch").addEventListener("input",i=>{ns=i.target.value,e()}),await e()}const t_=["text","email","password","tel","number","url","textarea","image"];function Ts(n={}){return`<div class="if-row" data-if-row>
    <input class="adm-input if-label" placeholder="Field Title (যেমন: UID, Password, Cookies)" value="${N(n.label||"")}" maxlength="50">
    <select class="adm-input if-type">${t_.map(e=>`<option value="${e}" ${n.type===e?"selected":""}>${e}</option>`).join("")}</select>
    <input class="adm-input if-ph" placeholder="Placeholder (খালি রাখলে default)" value="${N(n.placeholder||"")}" maxlength="60">
    <label class="chk if-req"><input type="checkbox" data-ifreq ${n.required?"checked":""}> Required</label>
    <button type="button" class="adm-btn red sm if-del" data-ifdel><i class="fa-solid fa-trash"></i></button>
  </div>`}function n_(n){return`
    <div class="if-editor">
      <div class="if-head">
        <label>Input Fields — user task page-এ এই field গুলো পূরণ করে submit করবে</label>
        <button type="button" class="adm-btn ghost sm" data-ifadd><i class="fa-solid fa-plus"></i> Add Input Field</button>
      </div>
      <div class="if-rows" data-ifrows>${(Array.isArray(n.inputFields)?n.inputFields:[]).map(Ts).join("")||'<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>'}</div>
    </div>`}async function Ui(n){var d,_,I,C,O;const[e,t]=await Promise.all([Cy(),du().catch(()=>[])]),i=A=>t.find(R=>R.slug===A)||null,r=`
    <div class="adm-card" id="mjCreateCard">
      <h4 style="margin:0 0 4px"><i class="fa-solid fa-plus" style="color:#d97706"></i> নতুন Microjob তৈরি করুন</h4>
      <p class="muted" style="font-size:12.5px;margin:0 0 10px">প্রতিটা job আলাদা post — ছবি, title, short description, নিয়ম, লিংক, video, Required Users, Reward আর submission field নিজে থেকেই ঠিক করুন।</p>
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
    </div>`,o=`
    <div class="adm-card" style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div style="flex:1 1 260px"><b>Built-in list থেকে task doc তৈরি করুন</b><br>
        <span class="muted">${e.length?"যেগুলোর doc নেই শুধু সেটুকুই বানাবে — আগে থেকে যা আছে (rate, fields, lock) অক্ষত থাকবে।":"Firestore-এ কোনো task config নেই — একারণেই user submit করলে “Project পাওয়া যায়নি” আসছে। নিচের বাটন চাপলেই ঠিক হয়ে যাবে।"}</span></div>
      <button class="adm-btn gold sm" id="seedTasksBtn"><i class="fa-solid fa-database"></i> ${e.length?"বাকিগুলো তৈরি করুন":"এখনই তৈরি করুন"}</button>
    </div>`;n.innerHTML=`
    <div class="adm-card task-head"><h4><i class="fa-solid fa-briefcase" style="color:#d97706"></i> Micro Jobs</h4>
    <p class="muted">Reward, link, password, description, input fields, lock/status, video — সব এখান থেকেই। Save করলেই user website-তে automatically update হয়ে যাবে। প্রতিটা job আলাদা post — নতুন job বানালেই user-এর MicroJobs page-এ আলাদা card দেখাবে, কোনো developer/page লাগবে না।</p></div>
    ${r}
    ${o}
    <div id="taskList">${e.map(A=>`
      <div class="adm-card task-card" data-slug="${N(A.slug)}">
        <div class="task-row">
          <div class="task-info">
            <b>${N(A.nameBn||A.slug)} ${A.enabled===!1?'<span class="badge gray">OFF</span>':""} ${A.locked?'<span class="badge gold">LOCKED</span>':""}</b>
            <span class="muted">/microjobs.html#job-${N(A.slug)} • ${Pe(A.reward)}${Array.isArray(A.inputFields)&&A.inputFields.length?` • ${A.inputFields.length} field(s)`:""}</span>
            ${(()=>{const R=i(A.slug);return R?`<div class="mj-statline">
                <span><i class="fa-solid fa-users"></i> Required <b>${Number(R.requiredUsers)||0||"∞"}</b></span>
                <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${Number(R.approvedCount)||0}</b></span>
                <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${Number(R.pending)||0}</b></span>
                <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${Number(R.rejected)||0}</b></span>
                <span><i class="fa-solid fa-user-plus"></i> বাকি <b>${R.remaining===null||R.remaining===void 0?"∞":R.remaining}</b></span>
                ${R.full||R.closed?'<span class="badge red">FULL/CLOSED</span>':""}
                ${R.mode==="single"?'<span class="badge gray">১ user = ১ submit</span>':'<span class="badge gray">marketplace</span>'}
              </div>`:""})()}
          </div>
          <button class="adm-btn ghost sm" data-edit="${N(A.slug)}"><i class="fa-solid fa-pen"></i></button>
        </div>
        <div class="task-form" data-form="${N(A.slug)}" hidden>
          <label>নাম (বাংলা)</label><input class="adm-input" data-f="nameBn" value="${N(A.nameBn||"")}">
          <label>Task URL (user-এর জন্য Open Link) — শুধু http/https</label><input class="adm-input" data-f="url" value="${N(A.url||"")}" placeholder="https://...">
          <div class="two-col">
            <div><label>Amount / Reward (৳)</label><input type="number" step="0.5" class="adm-input" data-f="reward" value="${Number(A.reward)||0}"></div>
            <div><label>Sort order</label><input type="number" class="adm-input" data-f="sort" value="${Number(A.sort)||10}"></div>
          </div>
          <div class="two-col">
            <div><label>Required Users (০ = unlimited)</label><input type="number" min="0" max="1000000" class="adm-input" data-f="requiredUsers" value="${Number(A.requiredUsers)||0}">
              <p class="muted" style="font-size:11.5px;margin:4px 0 0">এই সংখ্যক approved user হলে job স্বয়ংক্রিয়ভাবে FULL/CLOSED হবে (পুরোনো marketplace job-এর জন্য ০ রাখুন)</p></div>
            <div><label>Submission mode</label>
              <select class="adm-input" data-f="mode">
                ${(()=>{const R=A.mode||((Number(A.requiredUsers)||0)>0?"single":"marketplace");return`<option value="single" ${R==="single"?"selected":""}>MicroJob — এক user একবার</option>
                <option value="marketplace" ${R==="marketplace"?"selected":""}>Marketplace — দিনে একাধিক (account sell)</option>`})()}
              </select></div>
          </div>
          <label>Job Image (card/post-এর ছবি)</label>
          <div class="img-pick">
            <input type="hidden" class="adm-input" data-f="image" value="${N(A.image||"")}">
            <input type="file" accept="image/png,image/jpeg,image/webp" data-imgfile="${N(A.slug)}" hidden>
            <button type="button" class="adm-btn ghost sm" data-imgbtn="${N(A.slug)}"><i class="fa-solid fa-image"></i> ছবি আপলোড</button>
            <input class="adm-input" data-imgurl value="${N(/^https?:/.test(String(A.image||""))?A.image:"")}" placeholder="অথবা image URL (https://…)">
            <div class="img-prev" data-imgprev="${N(A.slug)}" ${/^data:image/.test(String(A.image||""))||/^https?:/.test(String(A.image||""))?"":"hidden"}>
              <img src="${N(A.image||"")}" alt="preview"><button type="button" class="adm-btn red sm" data-imgclear="${N(A.slug)}">Clear</button>
            </div>
          </div>
          <label>Short Description (card-এর এক লাইন)</label>
          <input class="adm-input" data-f="shortDesc" value="${N(A.shortDesc||"")}" maxlength="200" placeholder="যেমন: ভিডিওতে like + comment করুন">
          <label>Account Password (seller যে পাসওয়ার্ড সেট করবে — খালি রাখলে hide)</label><input class="adm-input" data-f="password" value="${N(A.password||"")}" maxlength="60">
          <label>Description / Instructions (project page-এ description)</label><textarea class="adm-input" data-f="description" rows="3" maxlength="300">${N(A.description||"")}</textarea>
          <div class="two-col">
            <div><label>Submit বাটনের লেখা</label><input class="adm-input" data-f="submitLabel" value="${N(A.submitLabel||"")}" placeholder="SUBMIT GMAIL" maxlength="40"></div>
            <div><label>History বাটনের লেখা</label><input class="adm-input" data-f="historyLabel" value="${N(A.historyLabel||"")}" placeholder="View Gmail History" maxlength="40"></div>
          </div>
          <label>দৈনিক সর্বোচ্চ কয়টি account জমা দেওয়া যাবে (per seller)</label><input type="number" min="1" max="200" class="adm-input" data-f="dailyLimit" value="${Number(A.dailyLimit)||20}">
          ${n_(A)}
          <label>Video URL (YouTube link বা mp4) — task page-এ guide video</label><input class="adm-input" data-f="videoUrl" value="${N(A.videoUrl||"")}">
          <div class="two-col">
            <label class="chk"><input type="checkbox" data-f="enabled" ${A.enabled!==!1?"checked":""}> Task ON / Active</label>
            <label class="chk"><input type="checkbox" data-f="locked" ${A.locked?"checked":""}> Locked</label>
          </div>
          <div class="ai-actions">
            <button class="adm-btn gold sm" data-save="${N(A.slug)}"><i class="fa-solid fa-floppy-disk"></i> Save</button>
          </div>
        </div>
      </div>`).join("")}</div>`,n.querySelectorAll("[data-ifadd]").forEach(A=>A.addEventListener("click",()=>{var F;const R=A.closest(".if-editor").querySelector("[data-ifrows]");(F=R.querySelector(".if-empty"))==null||F.remove();const L=document.createElement("div");L.innerHTML=Ts(),R.appendChild(L.firstElementChild)})),n.querySelectorAll("[data-ifdel]").forEach(A=>A.addEventListener("click",()=>{A.closest("[data-if-row]").remove();const R=A.closest("[data-ifrows]");R.querySelector("[data-if-row]")||(R.innerHTML='<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>')})),n.querySelectorAll("[data-edit]").forEach(A=>A.addEventListener("click",()=>{const L=A.closest(".task-card").querySelector("[data-form]");L.hidden=!L.hidden})),(d=n.querySelector("#seedTasksBtn"))==null||d.addEventListener("click",async A=>{const R=A.currentTarget;R.disabled=!0;try{const L=await Ly();M(`তৈরি হয়েছে ${L.createdCount||0}টা, আগে থেকেই ছিল ${L.skippedCount||0}টা${L.invalid&&L.invalid.length?" · কিছু হয়নি: "+L.invalid.join(", "):""}`),Ui(n)}catch(L){M(L.message,"error"),R.disabled=!1}});const a=document.getElementById("mjNewImage"),c=document.getElementById("mjNewImagePrev"),h=A=>{if(a&&(a.value=A||"",c)){const R=document.getElementById("mjNewImageImg");R&&(R.src=A),c.hidden=!A}};(_=document.getElementById("mjNewImageBtn"))==null||_.addEventListener("click",()=>{var A;return(A=document.getElementById("mjNewImageFile"))==null?void 0:A.click()}),(I=document.getElementById("mjNewImageFile"))==null||I.addEventListener("change",async A=>{try{h(await pl(A.target.files&&A.target.files[0],{maxSide:640,maxBytes:22e4}))}catch(R){M(String(R.message||R),"error")}});const f=(A,R={})=>{const L=document.createElement("div");L.innerHTML=Ts(R),A.appendChild(L.firstElementChild)};(C=document.getElementById("mjNewFieldAdd"))==null||C.addEventListener("click",()=>{const A=document.getElementById("mjNewFields");A&&f(A)}),(O=document.getElementById("mjCreateBtn"))==null||O.addEventListener("click",async()=>{var W,re,B,E,m,y,v,w,b,g,Ce;const A=ne=>n.querySelector(`[data-nc="${ne}"]`),R=String(((W=A("nameBn"))==null?void 0:W.value)||"").trim();if(R.length<2){M("Job Title লিখুন","error");return}const L=String(((re=A("steps"))==null?void 0:re.value)||"").split(`
`).map(ne=>ne.trim()).filter(Boolean).slice(0,20),F=[...((B=document.getElementById("mjNewFields"))==null?void 0:B.querySelectorAll("[data-if-row]"))||[]].map(ne=>{var Zn;return{label:ne.querySelector(".if-label").value.trim(),type:ne.querySelector(".if-type").value,placeholder:((Zn=ne.querySelector(".if-ph"))==null?void 0:Zn.value.trim())||"",required:ne.querySelector("[data-ifreq]").checked}}).filter(ne=>ne.label),j=document.getElementById("mjCreateBtn");j.disabled=!0;try{const ne=await Ny({nameBn:R,slug:String(((E=A("slug"))==null?void 0:E.value)||"").trim(),reward:Number((m=A("reward"))==null?void 0:m.value)||0,requiredUsers:Math.max(1,Number((y=A("requiredUsers"))==null?void 0:y.value)||1),shortDesc:String(((v=A("shortDesc"))==null?void 0:v.value)||"").trim(),url:String(((w=A("url"))==null?void 0:w.value)||"").trim(),videoUrl:String(((b=A("videoUrl"))==null?void 0:b.value)||"").trim(),image:a?a.value:"",steps:L,inputFields:F,sort:Number((g=A("sort"))==null?void 0:g.value)||100,mode:"single",enabled:!!((Ce=A("enabled"))!=null&&Ce.checked)});M(`Job তৈরি হয়েছে: ${ne.slug||""} — user-এর MicroJobs page-এ আলাদা card দেখাবে`),Ui(n)}catch(ne){M(ne.message,"error"),j.disabled=!1}}),n.querySelectorAll("[data-imgbtn]").forEach(A=>A.addEventListener("click",()=>{var L;const R=A.dataset.imgbtn;(L=n.querySelector(`[data-imgfile="${R}"]`))==null||L.click()})),n.querySelectorAll("[data-imgfile]").forEach(A=>A.addEventListener("change",async R=>{const L=A.dataset.imgfile,F=A.closest(".task-card");try{const j=await pl(R.target.files&&R.target.files[0],{maxSide:640,maxBytes:22e4}),W=F.querySelector('input[type=hidden][data-f="image"]');W&&(W.value=j);const re=F.querySelector("[data-imgurl]");re&&(re.value="");const B=F.querySelector(`[data-imgprev="${L}"]`);B&&(B.querySelector("img").src=j,B.hidden=!1),M("ছবি লাগানো হয়েছে — Save চাপুন")}catch(j){M(String(j.message||j),"error")}})),n.querySelectorAll("[data-imgclear]").forEach(A=>A.addEventListener("click",()=>{const R=A.closest(".task-card"),L=A.dataset.imgclear,F=R.querySelector('input[type=hidden][data-f="image"]');F&&(F.value="");const j=R.querySelector("[data-imgurl]");j&&(j.value="");const W=R.querySelector(`[data-imgprev="${L}"]`);W&&(W.hidden=!0)})),n.querySelectorAll("[data-save]").forEach(A=>A.addEventListener("click",async()=>{var W,re;const R=A.closest(".task-card"),L=B=>R.querySelector(`[data-form] [data-f="${B}"]`),F=L("url").value.trim();if(F&&!/^https?:\/\//i.test(F)){M("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)","error");return}const j=[...R.querySelectorAll("[data-ifrows] [data-if-row]")].map(B=>{var E;return{label:B.querySelector(".if-label").value.trim(),type:B.querySelector(".if-type").value,placeholder:((E=B.querySelector(".if-ph"))==null?void 0:E.value.trim())||"",required:B.querySelector("[data-ifreq]").checked}}).filter(B=>B.label);A.disabled=!0;try{await Vy(A.dataset.save,{nameBn:L("nameBn").value.trim(),url:F,reward:Number(L("reward").value)||0,sort:Number(L("sort").value)||10,password:L("password").value.trim(),description:L("description").value.trim(),submitLabel:L("submitLabel").value.trim(),historyLabel:L("historyLabel").value.trim(),dailyLimit:Math.max(1,Math.min(200,Number(L("dailyLimit").value)||20)),inputFields:j,videoUrl:L("videoUrl").value.trim(),image:(((W=R.querySelector("[data-imgurl]"))==null?void 0:W.value)||"").trim()||((re=L("image"))==null?void 0:re.value)||"",shortDesc:L("shortDesc")?L("shortDesc").value.trim():"",requiredUsers:L("requiredUsers")?Math.max(0,Number(L("requiredUsers").value)||0):0,mode:L("mode")?L("mode").value:"single",enabled:L("enabled").checked,locked:L("locked").checked}),M("Task save হয়েছে — user website-তে update হয়ে গেছে"),Ui(n)}catch(B){M(B.message,"error"),A.disabled=!1}}))}const i_=[{group:"General",fields:[["siteName","Site Name","text"],["telegramLink","Telegram Link","url"],["facebookLink","Facebook Link","url"],["youtubeLink","YouTube Link","url"],["videoUrl","Tutorial Video URL","url"]]},{group:"Money (৳)",fields:[["activationFee","Activation Deposit Fee","number"],["activationBonus","Activation Bonus","number"],["registerBonus","Registration Bonus","number"],["referralBonus","Referral Bonus","number"],["minWithdraw","Minimum Withdraw","number"],["giftReward","Daily Gift Reward","number"]]},{group:"Payment Numbers (Deposit-এর জন্য)",fields:[["bkashNumber","bKash Number","text"],["nagadNumber","Nagad Number","text"],["rocketNumber","Rocket Number","text"]]},{group:"Gift",fields:[["giftCode","Gift Code","text"]]},{group:"Admin Contact (Support page-এ দেখাবে)",fields:[["admin1Name","Admin 1 — Name","text"],["admin1Phone","Admin 1 — Phone","text"],["admin1Email","Admin 1 — Email","email"],["admin1Link","Admin 1 — Link","url"],["admin2Name","Admin 2 — Name","text"],["admin2Phone","Admin 2 — Phone","text"],["admin2Email","Admin 2 — Email","email"],["admin2Link","Admin 2 — Link","url"]]}];async function _u(n){var i,r;const e=await My(),t=e._secretLoaded!==!0;n.innerHTML=`
    <form id="settingsForm">
    ${i_.map(o=>`
      <div class="adm-card">
        <h4><i class="fa-solid fa-sliders" style="color:#d97706"></i> ${o.group}</h4>
        <div class="set-grid">
          ${o.fields.map(([a,c,h])=>{var d;const f=a==="giftCode"&&t;return`
            <div><label>${c}</label><input type="${h}" step="${h==="number"?"0.5":void 0}" class="adm-input" data-sf="${a}" value="${f?"":N((d=e[a])!=null?d:"")}" ${f?'disabled placeholder="লোড করা যায়নি — API দেখুন"':""}></div>`}).join("")}
        </div>
        ${o.group==="Gift"&&t?'<p class="muted" style="margin-top:8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Gift Code server API থেকে পড়া যায়নি — এই ঘরটা এখন change হবে না (ভুলবশত কোড মুছে যাবে না)।</p>':""}
        ${o.group==="Gift"&&!t?`<p class="muted" style="margin-top:8px">কোড: <b>${N(e.giftCode||"(খালি)")}</b> <button type="button" class="adm-btn ghost sm" id="clearGiftBtn" style="margin-left:8px">Clear</button></p>`:""}
      </div>`).join("")}
      <button type="submit" class="adm-btn gold"><i class="fa-solid fa-floppy-disk"></i> Save Settings</button>
      <button type="button" class="adm-btn ghost" id="lbSyncBtn" style="margin-left:8px"><i class="fa-solid fa-trophy"></i> Leaderboard count sync</button>
      <p class="muted" style="font-size:12px;margin-top:6px">Leaderboard (Top 4) existing referral data থেকেই হিসাব করে; এই বাটন চাপলে referral সংখ্যা গুনে user doc-এ cache হয় (বড় list-এ দ্রুত লোড হয়)।</p>
    </form>`,(i=document.getElementById("lbSyncBtn"))==null||i.addEventListener("click",async()=>{const o=document.getElementById("lbSyncBtn");o.disabled=!0;try{const a=await Oy();M(`Leaderboard sync: ${a.updated||0}টা user (${a.failed||0}টা বাদ)`)}catch(a){M(a.message,"error")}o.disabled=!1}),(r=document.getElementById("clearGiftBtn"))==null||r.addEventListener("click",async()=>{if(confirm("Gift code মুছে ফেলবেন? তাহলে কেউই আর gift claim করতে পারবে না।"))try{await Fy(),M("Gift code cleared"),_u(n)}catch(o){M(o.message,"error")}}),document.getElementById("settingsForm").addEventListener("submit",async o=>{o.preventDefault();const a={};n.querySelectorAll("[data-sf]").forEach(h=>{if(h.disabled)return;const f=h.dataset.sf;a[f]=h.type==="number"?Number(h.value)||0:h.value.trim()});const c=o.target.querySelector("button[type=submit]");c.disabled=!0;try{await Uy(a),M("Settings save হয়েছে")}catch(h){M(h.message,"error"),c.disabled=!1}})}let Ut="";async function $t(n){const[e,t]=await Promise.all([$y(),Gy().catch(()=>[])]),i=await so(300).catch(()=>[]);n.innerHTML=`
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
    ${e.map(f=>`
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info"><b>${f.type==="warning"?"⚠️ ":""}${N(f.title||"—")}</b><span class="muted">${f.enabled?"ON":"OFF"} • sort ${f.sort||0}${f.expiresAt?" • expire "+Ne(f.expiresAt):""}</span></div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tgl="${f.id}"><i class="fa-solid ${f.enabled?"fa-eye-slash":"fa-eye"}"></i></button>
            <button class="adm-btn red sm" data-del="${f.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${N(f.body||"")}</p>
      </div>`).join("")}
    ${e.length?"":'<p class="muted center-note">কোনো all-user notice নেই।</p>'}

    <h4 style="margin:14px 0 8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Private Warnings (user-specific)</h4>
    ${t.map(f=>`
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info">
            <b>${f.type==="warning"?"⚠️ ":""}${N(f.title||"—")}</b>
            <span class="muted">→ ${N(f.userName||"—")} (${N(f.userMobile||f.uid)}) • ${f.enabled?"ACTIVE":"OFF"}${f.expiresAt?" • expire "+f.expiresAt:""}</span>
          </div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tn-tgl="${f.uid}::${f.id}">${f.enabled?"Hide":"Show"}</button>
            <button class="adm-btn red sm" data-tn-del="${f.uid}::${f.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${N(f.body||"")}</p>
      </div>`).join("")}
    ${t.length?"":'<p class="muted center-note">কোনো private warning নেই।</p>'}`;const r=document.getElementById("ntTarget"),o=document.getElementById("ntUserWrap"),a=document.getElementById("ntUserSearch"),c=document.getElementById("ntUserResults");r.addEventListener("change",()=>{o.hidden=r.value!=="user"});const h=(f="")=>{const d=f.trim().toLowerCase(),_=d?i.filter(I=>(I.name||"").toLowerCase().includes(d)||String(I.mobile||"").includes(d)):i;c.innerHTML=_.slice(0,30).map(I=>`
      <div class="user-row ${Ut===I.uid?"on":""}" data-ntu="${I.uid}">
        <div class="ur-avatar">${N((I.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${N(I.name||"—")}</b><span class="muted">${N(I.mobile||"")}</span></div>
        <div class="ur-right">${Ut===I.uid?'<span class="badge green">SELECTED</span>':""}</div>
      </div>`).join("")||'<p class="muted">কোনো user পাওয়া যায়নি</p>',c.querySelectorAll("[data-ntu]").forEach(I=>I.addEventListener("click",()=>{Ut=I.dataset.ntu,h(a.value)}))};a.addEventListener("input",()=>h(a.value)),document.getElementById("ntAdd").addEventListener("click",async()=>{const f=document.getElementById("ntTitle").value.trim(),d=document.getElementById("ntBody").value.trim(),_=document.getElementById("ntType").value,I=r.value,C=document.getElementById("ntExpiry").value;if(!f&&!d){M("Title বা message লিখুন","error");return}if(I==="user"&&!Ut){M("একটা user select করুন","error");return}const O=C?new Date(C+"T23:59:59"):null;try{I==="user"?await zy(Ut,{title:f,body:d,type:_,expiresAt:O}):await jy({title:f,body:d,type:_,expiresAt:O}),M(I==="user"?"Private warning পাঠানো হয়েছে (শুধু সেই user দেখবে)":"Notice add হয়েছে (সব user দেখবে)"),Ut="",$t(n)}catch(A){M(A.message,"error")}}),n.querySelectorAll("[data-tgl]").forEach(f=>f.addEventListener("click",async()=>{const d=e.find(_=>_.id===f.dataset.tgl);try{await By(d.id,{title:d.title,body:d.body,enabled:!d.enabled,sort:d.sort}),M("Notice toggle"),$t(n)}catch(_){M(_.message,"error")}})),n.querySelectorAll("[data-del]").forEach(f=>f.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await qy(f.dataset.del),M("Notice delete হয়েছে"),$t(n)}catch(d){M(d.message,"error")}})),n.querySelectorAll("[data-tn-tgl]").forEach(f=>f.addEventListener("click",async()=>{const[d,_]=f.dataset.tnTgl.split("::"),I=t.find(C=>C.uid===d&&C.id===_);try{await pu(d,_,{enabled:!I.enabled}),M("Warning toggle"),$t(n)}catch(C){M(C.message,"error")}})),n.querySelectorAll("[data-tn-del]").forEach(f=>f.addEventListener("click",async()=>{if(!confirm("Warning মুছে ফেলবেন?"))return;const[d,_]=f.dataset.tnDel.split("::");try{await mu(d,_),M("Warning delete হয়েছে"),$t(n)}catch(I){M(I.message,"error")}}))}
