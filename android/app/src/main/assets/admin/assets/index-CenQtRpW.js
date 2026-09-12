(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();var aa={};/**
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
 */const dl=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let r=n.charCodeAt(i);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},Xu=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const r=n[t++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){const o=n[t++];e[i++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=n[t++],a=n[t++],c=n[t++],h=((r&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;e[i++]=String.fromCharCode(55296+(h>>10)),e[i++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],a=n[t++];e[i++]=String.fromCharCode((r&15)<<12|(o&63)<<6|a&63)}}return e.join("")},fl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<n.length;r+=3){const o=n[r],a=r+1<n.length,c=a?n[r+1]:0,h=r+2<n.length,d=h?n[r+2]:0,p=o>>2,I=(o&3)<<4|c>>4;let A=(c&15)<<2|d>>6,C=d&63;h||(C=64,a||(A=64)),i.push(t[p],t[I],t[A],t[C])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(dl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Xu(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<n.length;){const o=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const d=r<n.length?t[n.charAt(r)]:64;++r;const I=r<n.length?t[n.charAt(r)]:64;if(++r,o==null||c==null||d==null||I==null)throw new Yu;const A=o<<2|c>>4;if(i.push(A),d!==64){const C=c<<4&240|d>>2;if(i.push(C),I!==64){const D=d<<6&192|I;i.push(D)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Yu extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Zu=function(n){const e=dl(n);return fl.encodeByteArray(e,!0)},xi=function(n){return Zu(n).replace(/\./g,"")},pl=function(n){try{return fl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function eh(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
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
 */const th=()=>eh().__FIREBASE_DEFAULTS__,nh=()=>{if(typeof process=="undefined"||typeof aa=="undefined")return;const n=aa.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ih=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&pl(n[1]);return e&&JSON.parse(e)},tr=()=>{try{return th()||nh()||ih()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ml=n=>{var e,t;return(t=(e=tr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},rh=n=>{const e=ml(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},gl=()=>{var n;return(n=tr())===null||n===void 0?void 0:n.config},_l=n=>{var e;return(e=tr())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class sh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function oh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",r=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[xi(JSON.stringify(t)),xi(JSON.stringify(a)),""].join(".")}/**
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
 */function ve(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ah(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ve())}function lh(){var n;const e=(n=tr())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ch(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function uh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function hh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dh(){const n=ve();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function fh(){return!lh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ph(){try{return typeof indexedDB=="object"}catch{return!1}}function mh(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var o;e(((o=r.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
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
 */const gh="FirebaseError";class Qe extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=gh,Object.setPrototypeOf(this,Qe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jn.prototype.create)}}class jn{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},r=`${this.service}/${e}`,o=this.errors[e],a=o?_h(o,i):"Error",c=`${this.serviceName}: ${a} (${r}).`;return new Qe(r,c,i)}}function _h(n,e){return n.replace(yh,(t,i)=>{const r=e[i];return r!=null?String(r):`<${i}?>`})}const yh=/\{\$([^}]+)}/g;function vh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ui(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const r of t){if(!i.includes(r))return!1;const o=n[r],a=e[r];if(la(o)&&la(a)){if(!Ui(o,a))return!1}else if(o!==a)return!1}for(const r of i)if(!t.includes(r))return!1;return!0}function la(n){return n!==null&&typeof n=="object"}/**
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
 */function qn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function An(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[r,o]=i.split("=");e[decodeURIComponent(r)]=decodeURIComponent(o)}}),e}function bn(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Eh(n,e){const t=new wh(n,e);return t.subscribe.bind(t)}class wh{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let r;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Ih(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:i},r.next===void 0&&(r.next=Hr),r.error===void 0&&(r.error=Hr),r.complete===void 0&&(r.complete=Hr);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console!="undefined"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ih(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Hr(){}/**
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
 */function ue(n){return n&&n._delegate?n._delegate:n}class At{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Et="[DEFAULT]";/**
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
 */class Th{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new sh;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(o){if(r)return null;throw o}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bh(e))try{this.getOrInitializeService({instanceIdentifier:Et})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:r});i.resolve(o)}catch{}}}}clearInstance(e=Et){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Et){return this.instances.has(e)}getOptions(e=Et){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);i===c&&a.resolve(r)}return r}onInit(e,t){var i;const r=this.normalizeInstanceIdentifier(t),o=(i=this.onInitCallbacks.get(r))!==null&&i!==void 0?i:new Set;o.add(e),this.onInitCallbacks.set(r,o);const a=this.instances.get(r);return a&&e(a,r),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const r of i)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Ah(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Et){return this.component?this.component.multipleInstances?e:Et:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ah(n){return n===Et?void 0:n}function bh(n){return n.instantiationMode==="EAGER"}/**
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
 */class Rh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Th(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var F;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(F||(F={}));const Sh={debug:F.DEBUG,verbose:F.VERBOSE,info:F.INFO,warn:F.WARN,error:F.ERROR,silent:F.SILENT},Ph=F.INFO,Ch={[F.DEBUG]:"log",[F.VERBOSE]:"log",[F.INFO]:"info",[F.WARN]:"warn",[F.ERROR]:"error"},kh=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),r=Ch[e];if(r)console[r](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Is{constructor(e){this.name=e,this._logLevel=Ph,this._logHandler=kh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in F))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Sh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,F.DEBUG,...e),this._logHandler(this,F.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,F.VERBOSE,...e),this._logHandler(this,F.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,F.INFO,...e),this._logHandler(this,F.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,F.WARN,...e),this._logHandler(this,F.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,F.ERROR,...e),this._logHandler(this,F.ERROR,...e)}}const Dh=(n,e)=>e.some(t=>n instanceof t);let ca,ua;function Nh(){return ca||(ca=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Oh(){return ua||(ua=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const yl=new WeakMap,ts=new WeakMap,vl=new WeakMap,Gr=new WeakMap,Ts=new WeakMap;function Vh(n){const e=new Promise((t,i)=>{const r=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(ot(n.result)),r()},a=()=>{i(n.error),r()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&yl.set(t,n)}).catch(()=>{}),Ts.set(e,n),e}function Lh(n){if(ts.has(n))return;const e=new Promise((t,i)=>{const r=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),r()},a=()=>{i(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});ts.set(n,e)}let ns={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ts.get(n);if(e==="objectStoreNames")return n.objectStoreNames||vl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ot(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Mh(n){ns=n(ns)}function xh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(zr(this),e,...t);return vl.set(i,e.sort?e.sort():[e]),ot(i)}:Oh().includes(n)?function(...e){return n.apply(zr(this),e),ot(yl.get(this))}:function(...e){return ot(n.apply(zr(this),e))}}function Uh(n){return typeof n=="function"?xh(n):(n instanceof IDBTransaction&&Lh(n),Dh(n,Nh())?new Proxy(n,ns):n)}function ot(n){if(n instanceof IDBRequest)return Vh(n);if(Gr.has(n))return Gr.get(n);const e=Uh(n);return e!==n&&(Gr.set(n,e),Ts.set(e,n)),e}const zr=n=>Ts.get(n);function Fh(n,e,{blocked:t,upgrade:i,blocking:r,terminated:o}={}){const a=indexedDB.open(n,e),c=ot(a);return i&&a.addEventListener("upgradeneeded",h=>{i(ot(a.result),h.oldVersion,h.newVersion,ot(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),c.then(h=>{o&&h.addEventListener("close",()=>o()),r&&h.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const $h=["get","getKey","getAll","getAllKeys","count"],Bh=["put","add","delete","clear"],Wr=new Map;function ha(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Wr.get(e))return Wr.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,r=Bh.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(r||$h.includes(t)))return;const o=async function(a,...c){const h=this.transaction(a,r?"readwrite":"readonly");let d=h.store;return i&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),r&&h.done]))[0]};return Wr.set(e,o),o}Mh(n=>({...n,get:(e,t,i)=>ha(e,t)||n.get(e,t,i),has:(e,t)=>!!ha(e,t)||n.has(e,t)}));/**
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
 */class jh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(qh(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function qh(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const is="@firebase/app",da="0.10.13";/**
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
 */const We=new Is("@firebase/app"),Hh="@firebase/app-compat",Gh="@firebase/analytics-compat",zh="@firebase/analytics",Wh="@firebase/app-check-compat",Kh="@firebase/app-check",Qh="@firebase/auth",Jh="@firebase/auth-compat",Xh="@firebase/database",Yh="@firebase/data-connect",Zh="@firebase/database-compat",ed="@firebase/functions",td="@firebase/functions-compat",nd="@firebase/installations",id="@firebase/installations-compat",rd="@firebase/messaging",sd="@firebase/messaging-compat",od="@firebase/performance",ad="@firebase/performance-compat",ld="@firebase/remote-config",cd="@firebase/remote-config-compat",ud="@firebase/storage",hd="@firebase/storage-compat",dd="@firebase/firestore",fd="@firebase/vertexai-preview",pd="@firebase/firestore-compat",md="firebase",gd="10.14.1";/**
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
 */const rs="[DEFAULT]",_d={[is]:"fire-core",[Hh]:"fire-core-compat",[zh]:"fire-analytics",[Gh]:"fire-analytics-compat",[Kh]:"fire-app-check",[Wh]:"fire-app-check-compat",[Qh]:"fire-auth",[Jh]:"fire-auth-compat",[Xh]:"fire-rtdb",[Yh]:"fire-data-connect",[Zh]:"fire-rtdb-compat",[ed]:"fire-fn",[td]:"fire-fn-compat",[nd]:"fire-iid",[id]:"fire-iid-compat",[rd]:"fire-fcm",[sd]:"fire-fcm-compat",[od]:"fire-perf",[ad]:"fire-perf-compat",[ld]:"fire-rc",[cd]:"fire-rc-compat",[ud]:"fire-gcs",[hd]:"fire-gcs-compat",[dd]:"fire-fst",[pd]:"fire-fst-compat",[fd]:"fire-vertex","fire-js":"fire-js",[md]:"fire-js-all"};/**
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
 */const Fi=new Map,yd=new Map,ss=new Map;function fa(n,e){try{n.container.addComponent(e)}catch(t){We.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ht(n){const e=n.name;if(ss.has(e))return We.debug(`There were multiple attempts to register component ${e}.`),!1;ss.set(e,n);for(const t of Fi.values())fa(t,n);for(const t of yd.values())fa(t,n);return!0}function As(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function qe(n){return n.settings!==void 0}/**
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
 */const vd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},at=new jn("app","Firebase",vd);/**
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
 */class Ed{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new At("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw at.create("app-deleted",{appName:this._name})}}/**
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
 */const Yt=gd;function El(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:rs,automaticDataCollectionEnabled:!1},e),r=i.name;if(typeof r!="string"||!r)throw at.create("bad-app-name",{appName:String(r)});if(t||(t=gl()),!t)throw at.create("no-options");const o=Fi.get(r);if(o){if(Ui(t,o.options)&&Ui(i,o.config))return o;throw at.create("duplicate-app",{appName:r})}const a=new Rh(r);for(const h of ss.values())a.addComponent(h);const c=new Ed(t,i,a);return Fi.set(r,c),c}function wl(n=rs){const e=Fi.get(n);if(!e&&n===rs&&gl())return El();if(!e)throw at.create("no-app",{appName:n});return e}function lt(n,e,t){var i;let r=(i=_d[n])!==null&&i!==void 0?i:n;t&&(r+=`-${t}`);const o=r.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const c=[`Unable to register library "${r}" with version "${e}":`];o&&c.push(`library name "${r}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),We.warn(c.join(" "));return}Ht(new At(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const wd="firebase-heartbeat-database",Id=1,Nn="firebase-heartbeat-store";let Kr=null;function Il(){return Kr||(Kr=Fh(wd,Id,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Nn)}catch(t){console.warn(t)}}}}).catch(n=>{throw at.create("idb-open",{originalErrorMessage:n.message})})),Kr}async function Td(n){try{const t=(await Il()).transaction(Nn),i=await t.objectStore(Nn).get(Tl(n));return await t.done,i}catch(e){if(e instanceof Qe)We.warn(e.message);else{const t=at.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});We.warn(t.message)}}}async function pa(n,e){try{const i=(await Il()).transaction(Nn,"readwrite");await i.objectStore(Nn).put(e,Tl(n)),await i.done}catch(t){if(t instanceof Qe)We.warn(t.message);else{const i=at.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});We.warn(i.message)}}}function Tl(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Ad=1024,bd=30*24*60*60*1e3;class Rd{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Pd(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ma();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const c=new Date(a.date).valueOf();return Date.now()-c<=bd}),this._storage.overwrite(this._heartbeatsCache))}catch(i){We.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ma(),{heartbeatsToSend:i,unsentEntries:r}=Sd(this._heartbeatsCache.heartbeats),o=xi(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return We.warn(t),""}}}function ma(){return new Date().toISOString().substring(0,10)}function Sd(n,e=Ad){const t=[];let i=n.slice();for(const r of n){const o=t.find(a=>a.agent===r.agent);if(o){if(o.dates.push(r.date),ga(t)>e){o.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),ga(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Pd{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ph()?mh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Td(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return pa(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return pa(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function ga(n){return xi(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function Cd(n){Ht(new At("platform-logger",e=>new jh(e),"PRIVATE")),Ht(new At("heartbeat",e=>new Rd(e),"PRIVATE")),lt(is,da,n),lt(is,da,"esm2017"),lt("fire-js","")}Cd("");var kd="firebase",Dd="10.14.1";/**
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
 */lt(kd,Dd,"app");function bs(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(n);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(n,i[r])&&(t[i[r]]=n[i[r]]);return t}function Al(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Nd=Al,bl=new jn("auth","Firebase",Al());/**
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
 */const $i=new Is("@firebase/auth");function Od(n,...e){$i.logLevel<=F.WARN&&$i.warn(`Auth (${Yt}): ${n}`,...e)}function Si(n,...e){$i.logLevel<=F.ERROR&&$i.error(`Auth (${Yt}): ${n}`,...e)}/**
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
 */function Ve(n,...e){throw Rs(n,...e)}function Me(n,...e){return Rs(n,...e)}function Rl(n,e,t){const i=Object.assign(Object.assign({},Nd()),{[e]:t});return new jn("auth","Firebase",i).create(e,{appName:n.name})}function ct(n){return Rl(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Rs(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return bl.create(n,...e)}function L(n,e,...t){if(!n)throw Rs(e,...t)}function He(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Si(e),new Error(e)}function Ke(n,e){n||He(e)}/**
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
 */function os(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Vd(){return _a()==="http:"||_a()==="https:"}function _a(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function Ld(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Vd()||uh()||"connection"in navigator)?navigator.onLine:!0}function Md(){if(typeof navigator=="undefined")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Hn{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ke(t>e,"Short delay should be less than long delay!"),this.isMobile=ah()||hh()}get(){return Ld()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ss(n,e){Ke(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Sl{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;He("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;He("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;He("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const xd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Ud=new Hn(3e4,6e4);function Ct(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function pt(n,e,t,i,r={}){return Pl(n,r,async()=>{let o={},a={};i&&(e==="GET"?a=i:o={body:JSON.stringify(i)});const c=qn(Object.assign({key:n.config.apiKey},a)).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:h},o);return ch()||(d.referrerPolicy="no-referrer"),Sl.fetch()(Cl(n,n.config.apiHost,t,c),d)})}async function Pl(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},xd),e);try{const r=new $d(n),o=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw yi(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const c=o.ok?a.errorMessage:a.error.message,[h,d]=c.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw yi(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw yi(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw yi(n,"user-disabled",a);const p=i[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Rl(n,p,d);Ve(n,p)}}catch(r){if(r instanceof Qe)throw r;Ve(n,"network-request-failed",{message:String(r)})}}async function nr(n,e,t,i,r={}){const o=await pt(n,e,t,i,r);return"mfaPendingCredential"in o&&Ve(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Cl(n,e,t,i){const r=`${e}${t}?${i}`;return n.config.emulator?Ss(n.config,r):`${n.config.apiScheme}://${r}`}function Fd(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class $d{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Me(this.auth,"network-request-failed")),Ud.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function yi(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const r=Me(n,e,i);return r.customData._tokenResponse=t,r}function ya(n){return n!==void 0&&n.enterprise!==void 0}class Bd{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Fd(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function jd(n,e){return pt(n,"GET","/v2/recaptchaConfig",Ct(n,e))}/**
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
 */async function qd(n,e){return pt(n,"POST","/v1/accounts:delete",e)}async function kl(n,e){return pt(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Sn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Hd(n,e=!1){const t=ue(n),i=await t.getIdToken(e),r=Ps(i);L(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const o=typeof r.firebase=="object"?r.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:r,token:i,authTime:Sn(Qr(r.auth_time)),issuedAtTime:Sn(Qr(r.iat)),expirationTime:Sn(Qr(r.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Qr(n){return Number(n)*1e3}function Ps(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Si("JWT malformed, contained fewer than 3 sections"),null;try{const r=pl(t);return r?JSON.parse(r):(Si("Failed to decode base64 JWT payload"),null)}catch(r){return Si("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function va(n){const e=Ps(n);return L(e,"internal-error"),L(typeof e.exp!="undefined","internal-error"),L(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function On(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Qe&&Gd(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Gd({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class zd{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const r=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class as{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Sn(this.lastLoginAt),this.creationTime=Sn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Bi(n){var e;const t=n.auth,i=await n.getIdToken(),r=await On(n,kl(t,{idToken:i}));L(r==null?void 0:r.users.length,t,"internal-error");const o=r.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Dl(o.providerUserInfo):[],c=Kd(n.providerData,a),h=n.isAnonymous,d=!(n.email&&o.passwordHash)&&!(c!=null&&c.length),p=h?d:!1,I={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new as(o.createdAt,o.lastLoginAt),isAnonymous:p};Object.assign(n,I)}async function Wd(n){const e=ue(n);await Bi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Kd(n,e){return[...n.filter(i=>!e.some(r=>r.providerId===i.providerId)),...e]}function Dl(n){return n.map(e=>{var{providerId:t}=e,i=bs(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function Qd(n,e){const t=await Pl(n,{},async()=>{const i=qn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:o}=n.config,a=Cl(n,r,"/v1/token",`key=${o}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Sl.fetch()(a,{method:"POST",headers:c,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Jd(n,e){return pt(n,"POST","/v2/accounts:revokeToken",Ct(n,e))}/**
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
 */class $t{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){L(e.idToken,"internal-error"),L(typeof e.idToken!="undefined","internal-error"),L(typeof e.refreshToken!="undefined","internal-error");const t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):va(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){L(e.length!==0,"internal-error");const t=va(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(L(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:r,expiresIn:o}=await Qd(e,t);this.updateTokensAndExpiration(i,r,Number(o))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:r,expirationTime:o}=t,a=new $t;return i&&(L(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),r&&(L(typeof r=="string","internal-error",{appName:e}),a.accessToken=r),o&&(L(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new $t,this.toJSON())}_performRefresh(){return He("not implemented")}}/**
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
 */function tt(n,e){L(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}class Ge{constructor(e){var{uid:t,auth:i,stsTokenManager:r}=e,o=bs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new zd(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new as(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await On(this,this.stsTokenManager.getToken(this.auth,e));return L(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Hd(this,e)}reload(){return Wd(this)}_assign(e){this!==e&&(L(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ge(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){L(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Bi(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(qe(this.auth.app))return Promise.reject(ct(this.auth));const e=await this.getIdToken();return await On(this,qd(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,r,o,a,c,h,d,p;const I=(i=t.displayName)!==null&&i!==void 0?i:void 0,A=(r=t.email)!==null&&r!==void 0?r:void 0,C=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,D=(a=t.photoURL)!==null&&a!==void 0?a:void 0,M=(c=t.tenantId)!==null&&c!==void 0?c:void 0,N=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,W=(d=t.createdAt)!==null&&d!==void 0?d:void 0,G=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:K,emailVerified:te,isAnonymous:Le,providerData:ne,stsTokenManager:E}=t;L(K&&E,e,"internal-error");const m=$t.fromJSON(this.name,E);L(typeof K=="string",e,"internal-error"),tt(I,e.name),tt(A,e.name),L(typeof te=="boolean",e,"internal-error"),L(typeof Le=="boolean",e,"internal-error"),tt(C,e.name),tt(D,e.name),tt(M,e.name),tt(N,e.name),tt(W,e.name),tt(G,e.name);const _=new Ge({uid:K,auth:e,email:A,emailVerified:te,displayName:I,isAnonymous:Le,photoURL:D,phoneNumber:C,tenantId:M,stsTokenManager:m,createdAt:W,lastLoginAt:G});return ne&&Array.isArray(ne)&&(_.providerData=ne.map(y=>Object.assign({},y))),N&&(_._redirectEventId=N),_}static async _fromIdTokenResponse(e,t,i=!1){const r=new $t;r.updateFromServerResponse(t);const o=new Ge({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await Bi(o),o}static async _fromGetAccountInfoResponse(e,t,i){const r=t.users[0];L(r.localId!==void 0,"internal-error");const o=r.providerUserInfo!==void 0?Dl(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!(o!=null&&o.length),c=new $t;c.updateFromIdToken(i);const h=new Ge({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new as(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,d),h}}/**
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
 */const Ea=new Map;function ze(n){Ke(n instanceof Function,"Expected a class definition");let e=Ea.get(n);return e?(Ke(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ea.set(n,e),e)}/**
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
 */class Nl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Nl.type="NONE";const wa=Nl;/**
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
 */function Pi(n,e,t){return`firebase:${n}:${e}:${t}`}class Bt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:r,name:o}=this.auth;this.fullUserKey=Pi(this.userKey,r.apiKey,o),this.fullPersistenceKey=Pi("persistence",r.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ge._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Bt(ze(wa),e,i);const r=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=r[0]||ze(wa);const a=Pi(i,e.config.apiKey,e.name);let c=null;for(const d of t)try{const p=await d._get(a);if(p){const I=Ge._fromJSON(e,p);d!==o&&(c=I),o=d;break}}catch{}const h=r.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new Bt(o,e,i):(o=h[0],c&&await o._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new Bt(o,e,i))}}/**
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
 */function Ia(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ml(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ol(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ul(e))return"Blackberry";if(Fl(e))return"Webos";if(Vl(e))return"Safari";if((e.includes("chrome/")||Ll(e))&&!e.includes("edge/"))return"Chrome";if(xl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Ol(n=ve()){return/firefox\//i.test(n)}function Vl(n=ve()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ll(n=ve()){return/crios\//i.test(n)}function Ml(n=ve()){return/iemobile/i.test(n)}function xl(n=ve()){return/android/i.test(n)}function Ul(n=ve()){return/blackberry/i.test(n)}function Fl(n=ve()){return/webos/i.test(n)}function Cs(n=ve()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Xd(n=ve()){var e;return Cs(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Yd(){return dh()&&document.documentMode===10}function $l(n=ve()){return Cs(n)||xl(n)||Fl(n)||Ul(n)||/windows phone/i.test(n)||Ml(n)}/**
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
 */function Bl(n,e=[]){let t;switch(n){case"Browser":t=Ia(ve());break;case"Worker":t=`${Ia(ve())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Yt}/${i}`}/**
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
 */class Zd{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=o=>new Promise((a,c)=>{try{const h=e(o);a(h)}catch(h){c(h)}});i.onAbort=t,this.queue.push(i);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
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
 */async function ef(n,e={}){return pt(n,"GET","/v2/passwordPolicy",Ct(n,e))}/**
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
 */const tf=6;class nf{constructor(e){var t,i,r,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:tf,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(r=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&r!==void 0?r:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,r,o,a,c;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(i=h.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),h.isValid&&(h.isValid=(r=h.containsLowercaseLetter)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(a=h.containsNumericCharacter)!==null&&a!==void 0?a:!0),h.isValid&&(h.isValid=(c=h.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),h}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let r=0;r<e.length;r++)i=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,r,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
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
 */class rf{constructor(e,t,i,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ta(this),this.idTokenSubscription=new Ta(this),this.beforeStateQueue=new Zd(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=bl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ze(t)),this._initializationPromise=this.queue(async()=>{var i,r;if(!this._deleted&&(this.persistenceManager=await Bt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await kl(this,{idToken:e}),i=await Ge._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(qe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let r=i,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=r==null?void 0:r._redirectEventId,h=await this.tryRedirectSignIn(e);(!a||a===c)&&(h!=null&&h.user)&&(r=h.user,o=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return L(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Bi(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Md()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(qe(this.app))return Promise.reject(ct(this));const t=e?ue(e):null;return t&&L(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&L(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return qe(this.app)?Promise.reject(ct(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return qe(this.app)?Promise.reject(ct(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ze(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ef(this),t=new nf(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new jn("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Jd(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ze(e)||this._popupRedirectResolver;L(t,this,"argument-error"),this.redirectPersistenceManager=await Bt.create(this,[ze(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,r){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(L(c,this,"internal-error"),c.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,i,r);return()=>{a=!0,h()}}else{const h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return L(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Bl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Od(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Zt(n){return ue(n)}class Ta{constructor(e){this.auth=e,this.observer=null,this.addObserver=Eh(t=>this.observer=t)}get next(){return L(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ir={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function sf(n){ir=n}function jl(n){return ir.loadJS(n)}function of(){return ir.recaptchaEnterpriseScript}function af(){return ir.gapiScript}function lf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const cf="recaptcha-enterprise",uf="NO_RECAPTCHA";class hf{constructor(e){this.type=cf,this.auth=Zt(e)}async verify(e="verify",t=!1){async function i(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,c)=>{jd(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(h=>{if(h.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new Bd(h);return o.tenantId==null?o._agentRecaptchaConfig=d:o._tenantRecaptchaConfigs[o.tenantId]=d,a(d.siteKey)}}).catch(h=>{c(h)})})}function r(o,a,c){const h=window.grecaptcha;ya(h)?h.enterprise.ready(()=>{h.enterprise.execute(o,{action:e}).then(d=>{a(d)}).catch(()=>{a(uf)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,a)=>{i(this.auth).then(c=>{if(!t&&ya(window.grecaptcha))r(c,o,a);else{if(typeof window=="undefined"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let h=of();h.length!==0&&(h+=c),jl(h).then(()=>{r(c,o,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function Aa(n,e,t,i=!1){const r=new hf(n);let o;try{o=await r.verify(t)}catch{o=await r.verify(t,!0)}const a=Object.assign({},e);return i?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function ba(n,e,t,i){var r;if(!((r=n._getRecaptchaConfig())===null||r===void 0)&&r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Aa(n,e,t,t==="getOobCode");return i(n,o)}else return i(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Aa(n,e,t,t==="getOobCode");return i(n,a)}else return Promise.reject(o)})}/**
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
 */function df(n,e){const t=As(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),o=t.getOptions();if(Ui(o,e!=null?e:{}))return r;Ve(r,"already-initialized")}return t.initialize({options:e})}function ff(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(ze);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function pf(n,e,t){const i=Zt(n);L(i._canInitEmulator,i,"emulator-config-failed"),L(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const r=!1,o=ql(e),{host:a,port:c}=mf(e),h=c===null?"":`:${c}`;i.config.emulator={url:`${o}//${a}${h}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:r})}),gf()}function ql(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function mf(n){const e=ql(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){const o=r[1];return{host:o,port:Ra(i.substr(o.length+1))}}else{const[o,a]=i.split(":");return{host:o,port:Ra(a)}}}function Ra(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function gf(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class ks{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return He("not implemented")}_getIdTokenResponse(e){return He("not implemented")}_linkToIdToken(e,t){return He("not implemented")}_getReauthenticationResolver(e){return He("not implemented")}}async function _f(n,e){return pt(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function yf(n,e){return nr(n,"POST","/v1/accounts:signInWithPassword",Ct(n,e))}/**
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
 */async function vf(n,e){return nr(n,"POST","/v1/accounts:signInWithEmailLink",Ct(n,e))}async function Ef(n,e){return nr(n,"POST","/v1/accounts:signInWithEmailLink",Ct(n,e))}/**
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
 */class Vn extends ks{constructor(e,t,i,r=null){super("password",i),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Vn(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new Vn(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ba(e,t,"signInWithPassword",yf);case"emailLink":return vf(e,{email:this._email,oobCode:this._password});default:Ve(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ba(e,i,"signUpPassword",_f);case"emailLink":return Ef(e,{idToken:t,email:this._email,oobCode:this._password});default:Ve(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function jt(n,e){return nr(n,"POST","/v1/accounts:signInWithIdp",Ct(n,e))}/**
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
 */const wf="http://localhost";class bt extends ks{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new bt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ve("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r}=t,o=bs(t,["providerId","signInMethod"]);if(!i||!r)return null;const a=new bt(i,r);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return jt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,jt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,jt(e,t)}buildRequest(){const e={requestUri:wf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=qn(t)}return e}}/**
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
 */function If(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Tf(n){const e=An(bn(n)).link,t=e?An(bn(e)).deep_link_id:null,i=An(bn(n)).deep_link_id;return(i?An(bn(i)).link:null)||i||t||e||n}class Ds{constructor(e){var t,i,r,o,a,c;const h=An(bn(e)),d=(t=h.apiKey)!==null&&t!==void 0?t:null,p=(i=h.oobCode)!==null&&i!==void 0?i:null,I=If((r=h.mode)!==null&&r!==void 0?r:null);L(d&&p&&I,"argument-error"),this.apiKey=d,this.operation=I,this.code=p,this.continueUrl=(o=h.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(a=h.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=h.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Tf(e);try{return new Ds(t)}catch{return null}}}/**
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
 */class en{constructor(){this.providerId=en.PROVIDER_ID}static credential(e,t){return Vn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=Ds.parseLink(t);return L(i,"argument-error"),Vn._fromEmailAndCode(e,i.code,i.tenantId)}}en.PROVIDER_ID="password";en.EMAIL_PASSWORD_SIGN_IN_METHOD="password";en.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Hl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Gn extends Hl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class nt extends Gn{constructor(){super("facebook.com")}static credential(e){return bt._fromParams({providerId:nt.PROVIDER_ID,signInMethod:nt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return nt.credentialFromTaggedObject(e)}static credentialFromError(e){return nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return nt.credential(e.oauthAccessToken)}catch{return null}}}nt.FACEBOOK_SIGN_IN_METHOD="facebook.com";nt.PROVIDER_ID="facebook.com";/**
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
 */class it extends Gn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return bt._fromParams({providerId:it.PROVIDER_ID,signInMethod:it.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return it.credentialFromTaggedObject(e)}static credentialFromError(e){return it.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return it.credential(t,i)}catch{return null}}}it.GOOGLE_SIGN_IN_METHOD="google.com";it.PROVIDER_ID="google.com";/**
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
 */class rt extends Gn{constructor(){super("github.com")}static credential(e){return bt._fromParams({providerId:rt.PROVIDER_ID,signInMethod:rt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return rt.credentialFromTaggedObject(e)}static credentialFromError(e){return rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return rt.credential(e.oauthAccessToken)}catch{return null}}}rt.GITHUB_SIGN_IN_METHOD="github.com";rt.PROVIDER_ID="github.com";/**
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
 */class st extends Gn{constructor(){super("twitter.com")}static credential(e,t){return bt._fromParams({providerId:st.PROVIDER_ID,signInMethod:st.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return st.credentialFromTaggedObject(e)}static credentialFromError(e){return st.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return st.credential(t,i)}catch{return null}}}st.TWITTER_SIGN_IN_METHOD="twitter.com";st.PROVIDER_ID="twitter.com";/**
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
 */class Gt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,r=!1){const o=await Ge._fromIdTokenResponse(e,i,r),a=Sa(i);return new Gt({user:o,providerId:a,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const r=Sa(i);return new Gt({user:e,providerId:r,_tokenResponse:i,operationType:t})}}function Sa(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ji extends Qe{constructor(e,t,i,r){var o;super(t.code,t.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,ji.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,r){return new ji(e,t,i,r)}}function Gl(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?ji._fromErrorAndOperation(n,o,e,i):o})}async function Af(n,e,t=!1){const i=await On(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Gt._forOperation(n,"link",i)}/**
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
 */async function bf(n,e,t=!1){const{auth:i}=n;if(qe(i.app))return Promise.reject(ct(i));const r="reauthenticate";try{const o=await On(n,Gl(i,r,e,n),t);L(o.idToken,i,"internal-error");const a=Ps(o.idToken);L(a,i,"internal-error");const{sub:c}=a;return L(n.uid===c,i,"user-mismatch"),Gt._forOperation(n,r,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Ve(i,"user-mismatch"),o}}/**
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
 */async function zl(n,e,t=!1){if(qe(n.app))return Promise.reject(ct(n));const i="signIn",r=await Gl(n,i,e),o=await Gt._fromIdTokenResponse(n,i,r);return t||await n._updateCurrentUser(o.user),o}async function Rf(n,e){return zl(Zt(n),e)}/**
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
 */async function Sf(n){const e=Zt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Pf(n,e,t){return qe(n.app)?Promise.reject(ct(n)):Rf(ue(n),en.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&Sf(n),i})}function Cf(n,e,t,i){return ue(n).onIdTokenChanged(e,t,i)}function kf(n,e,t){return ue(n).beforeAuthStateChanged(e,t)}function Df(n,e,t,i){return ue(n).onAuthStateChanged(e,t,i)}function Wl(n){return ue(n).signOut()}const qi="__sak";/**
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
 */class Kl{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(qi,"1"),this.storage.removeItem(qi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Nf=1e3,Of=10;class Ql extends Kl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=$l(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),r=this.localCache[t];i!==r&&e(t,r,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,h)=>{this.notifyListeners(a,h)});return}const i=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const a=this.storage.getItem(i);!t&&this.localCache[i]===a||this.notifyListeners(i,a)},o=this.storage.getItem(i);Yd()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Of):r()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Nf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ql.type="LOCAL";const Vf=Ql;/**
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
 */class Jl extends Kl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Jl.type="SESSION";const Xl=Jl;/**
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
 */function Lf(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class rr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const i=new rr(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:r,data:o}=t.data,a=this.handlersMap[r];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:r});const c=Array.from(a).map(async d=>d(t.origin,o)),h=await Lf(c);t.ports[0].postMessage({status:"done",eventId:i,eventType:r,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}rr.receivers=[];/**
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
 */function Ns(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Mf{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const r=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let o,a;return new Promise((c,h)=>{const d=Ns("",20);r.port1.start();const p=setTimeout(()=>{h(new Error("unsupported_event"))},i);a={messageChannel:r,onMessage(I){const A=I;if(A.data.eventId===d)switch(A.data.status){case"ack":clearTimeout(p),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),c(A.data.response);break;default:clearTimeout(p),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function xe(){return window}function xf(n){xe().location.href=n}/**
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
 */function Yl(){return typeof xe().WorkerGlobalScope!="undefined"&&typeof xe().importScripts=="function"}async function Uf(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ff(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function $f(){return Yl()?self:null}/**
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
 */const Zl="firebaseLocalStorageDb",Bf=1,Hi="firebaseLocalStorage",ec="fbase_key";class zn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function sr(n,e){return n.transaction([Hi],e?"readwrite":"readonly").objectStore(Hi)}function jf(){const n=indexedDB.deleteDatabase(Zl);return new zn(n).toPromise()}function ls(){const n=indexedDB.open(Zl,Bf);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Hi,{keyPath:ec})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Hi)?e(i):(i.close(),await jf(),e(await ls()))})})}async function Pa(n,e,t){const i=sr(n,!0).put({[ec]:e,value:t});return new zn(i).toPromise()}async function qf(n,e){const t=sr(n,!1).get(e),i=await new zn(t).toPromise();return i===void 0?null:i.value}function Ca(n,e){const t=sr(n,!0).delete(e);return new zn(t).toPromise()}const Hf=800,Gf=3;class tc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ls(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>Gf)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Yl()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=rr._getInstance($f()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Uf(),!this.activeServiceWorker)return;this.sender=new Mf(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ff()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ls();return await Pa(e,qi,"1"),await Ca(e,qi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Pa(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>qf(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ca(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const o=sr(r,!1).getAll();return new zn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:r,value:o}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(o)&&(this.notifyListeners(r,o),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!i.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const r of Array.from(i))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Hf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}tc.type="LOCAL";const zf=tc;new Hn(3e4,6e4);/**
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
 */function Wf(n,e){return e?ze(e):(L(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Os extends ks{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return jt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return jt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return jt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Kf(n){return zl(n.auth,new Os(n),n.bypassAuthState)}function Qf(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),bf(t,new Os(n),n.bypassAuthState)}async function Jf(n){const{auth:e,user:t}=n;return L(t,e,"internal-error"),Af(t,new Os(n),n.bypassAuthState)}/**
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
 */class nc{constructor(e,t,i,r,o=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:r,tenantId:o,error:a,type:c}=e;if(a){this.reject(a);return}const h={auth:this.auth,requestUri:t,sessionId:i,tenantId:o||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(h))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Kf;case"linkViaPopup":case"linkViaRedirect":return Jf;case"reauthViaPopup":case"reauthViaRedirect":return Qf;default:Ve(this.auth,"internal-error")}}resolve(e){Ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Xf=new Hn(2e3,1e4);class Ft extends nc{constructor(e,t,i,r,o){super(e,t,r,o),this.provider=i,this.authWindow=null,this.pollId=null,Ft.currentPopupAction&&Ft.currentPopupAction.cancel(),Ft.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return L(e,this.auth,"internal-error"),e}async onExecution(){Ke(this.filter.length===1,"Popup operations only handle one event");const e=Ns();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Me(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Me(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ft.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Me(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Xf.get())};e()}}Ft.currentPopupAction=null;/**
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
 */const Yf="pendingRedirect",Ci=new Map;class Zf extends nc{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Ci.get(this.auth._key());if(!e){try{const i=await ep(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Ci.set(this.auth._key(),e)}return this.bypassAuthState||Ci.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ep(n,e){const t=ip(e),i=np(n);if(!await i._isAvailable())return!1;const r=await i._get(t)==="true";return await i._remove(t),r}function tp(n,e){Ci.set(n._key(),e)}function np(n){return ze(n._redirectPersistence)}function ip(n){return Pi(Yf,n.config.apiKey,n.name)}async function rp(n,e,t=!1){if(qe(n.app))return Promise.reject(ct(n));const i=Zt(n),r=Wf(i,e),a=await new Zf(i,r,t).execute();return a&&!t&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}/**
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
 */const sp=10*60*1e3;class op{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ap(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!ic(e)){const r=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(Me(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=sp&&this.cachedEventUids.clear(),this.cachedEventUids.has(ka(e))}saveEventToCache(e){this.cachedEventUids.add(ka(e)),this.lastProcessedEventTime=Date.now()}}function ka(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function ic({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function ap(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ic(n);default:return!1}}/**
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
 */async function lp(n,e={}){return pt(n,"GET","/v1/projects",e)}/**
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
 */const cp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,up=/^https?/;async function hp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await lp(n);for(const t of e)try{if(dp(t))return}catch{}Ve(n,"unauthorized-domain")}function dp(n){const e=os(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===i}if(!up.test(t))return!1;if(cp.test(n))return i===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}/**
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
 */const fp=new Hn(3e4,6e4);function Da(){const n=xe().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function pp(n){return new Promise((e,t)=>{var i,r,o;function a(){Da(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Da(),t(Me(n,"network-request-failed"))},timeout:fp.get()})}if(!((r=(i=xe().gapi)===null||i===void 0?void 0:i.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((o=xe().gapi)===null||o===void 0)&&o.load)a();else{const c=lf("iframefcb");return xe()[c]=()=>{gapi.load?a():t(Me(n,"network-request-failed"))},jl(`${af()}?onload=${c}`).catch(h=>t(h))}}).catch(e=>{throw ki=null,e})}let ki=null;function mp(n){return ki=ki||pp(n),ki}/**
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
 */const gp=new Hn(5e3,15e3),_p="__/auth/iframe",yp="emulator/auth/iframe",vp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ep=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function wp(n){const e=n.config;L(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ss(e,yp):`https://${n.config.authDomain}/${_p}`,i={apiKey:e.apiKey,appName:n.name,v:Yt},r=Ep.get(n.config.apiHost);r&&(i.eid=r);const o=n._getFrameworks();return o.length&&(i.fw=o.join(",")),`${t}?${qn(i).slice(1)}`}async function Ip(n){const e=await mp(n),t=xe().gapi;return L(t,n,"internal-error"),e.open({where:document.body,url:wp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:vp,dontclear:!0},i=>new Promise(async(r,o)=>{await i.restyle({setHideOnLeave:!1});const a=Me(n,"network-request-failed"),c=xe().setTimeout(()=>{o(a)},gp.get());function h(){xe().clearTimeout(c),r(i)}i.ping(h).then(h,()=>{o(a)})}))}/**
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
 */const Tp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ap=500,bp=600,Rp="_blank",Sp="http://localhost";class Na{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Pp(n,e,t,i=Ap,r=bp){const o=Math.max((window.screen.availHeight-r)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let c="";const h=Object.assign(Object.assign({},Tp),{width:i.toString(),height:r.toString(),top:o,left:a}),d=ve().toLowerCase();t&&(c=Ll(d)?Rp:t),Ol(d)&&(e=e||Sp,h.scrollbars="yes");const p=Object.entries(h).reduce((A,[C,D])=>`${A}${C}=${D},`,"");if(Xd(d)&&c!=="_self")return Cp(e||"",c),new Na(null);const I=window.open(e||"",c,p);L(I,n,"popup-blocked");try{I.focus()}catch{}return new Na(I)}function Cp(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const kp="__/auth/handler",Dp="emulator/auth/handler",Np=encodeURIComponent("fac");async function Oa(n,e,t,i,r,o){L(n.config.authDomain,n,"auth-domain-config-required"),L(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:Yt,eventId:r};if(e instanceof Hl){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",vh(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,I]of Object.entries({}))a[p]=I}if(e instanceof Gn){const p=e.getScopes().filter(I=>I!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const h=await n._getAppCheckToken(),d=h?`#${Np}=${encodeURIComponent(h)}`:"";return`${Op(n)}?${qn(c).slice(1)}${d}`}function Op({config:n}){return n.emulator?Ss(n,Dp):`https://${n.authDomain}/${kp}`}/**
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
 */const Jr="webStorageSupport";class Vp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Xl,this._completeRedirectFn=rp,this._overrideRedirectResult=tp}async _openPopup(e,t,i,r){var o;Ke((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await Oa(e,t,i,os(),r);return Pp(e,a,Ns())}async _openRedirect(e,t,i,r){await this._originValidation(e);const o=await Oa(e,t,i,os(),r);return xf(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:o}=this.eventManagers[t];return r?Promise.resolve(r):(Ke(o,"If manager is not set, promise should be"),o)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Ip(e),i=new op(e);return t.register("authEvent",r=>(L(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:i.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Jr,{type:Jr},r=>{var o;const a=(o=r==null?void 0:r[0])===null||o===void 0?void 0:o[Jr];a!==void 0&&t(!!a),Ve(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return $l()||Vl()||Cs()}}const Lp=Vp;var Va="@firebase/auth",La="1.7.9";/**
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
 */class Mp{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){L(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function xp(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Up(n){Ht(new At("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=i.options;L(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const h={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Bl(n)},d=new rf(i,r,o,h);return ff(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Ht(new At("auth-internal",e=>{const t=Zt(e.getProvider("auth").getImmediate());return(i=>new Mp(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),lt(Va,La,xp(n)),lt(Va,La,"esm2017")}/**
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
 */const Fp=5*60,$p=_l("authIdTokenMaxAge")||Fp;let Ma=null;const Bp=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>$p)return;const r=t==null?void 0:t.token;Ma!==r&&(Ma=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function jp(n=wl()){const e=As(n,"auth");if(e.isInitialized())return e.getImmediate();const t=df(n,{popupRedirectResolver:Lp,persistence:[zf,Vf,Xl]}),i=_l("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(i,location.origin);if(location.origin===o.origin){const a=Bp(o.toString());kf(t,a,()=>a(t.currentUser)),Cf(t,c=>a(c))}}const r=ml("auth");return r&&pf(t,`http://${r}`),t}function qp(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}sf({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=r=>{const o=Me("internal-error");o.customData=r,t(o)},i.type="text/javascript",i.charset="UTF-8",qp().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Up("Browser");var xa=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var rc;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,m){function _(){}_.prototype=m.prototype,E.D=m.prototype,E.prototype=new _,E.prototype.constructor=E,E.C=function(y,v,T){for(var g=Array(arguments.length-2),$e=2;$e<arguments.length;$e++)g[$e-2]=arguments[$e];return m.prototype[v].apply(y,g)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,t),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(E,m,_){_||(_=0);var y=Array(16);if(typeof m=="string")for(var v=0;16>v;++v)y[v]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(v=0;16>v;++v)y[v]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=E.g[0],_=E.g[1],v=E.g[2];var T=E.g[3],g=m+(T^_&(v^T))+y[0]+3614090360&4294967295;m=_+(g<<7&4294967295|g>>>25),g=T+(v^m&(_^v))+y[1]+3905402710&4294967295,T=m+(g<<12&4294967295|g>>>20),g=v+(_^T&(m^_))+y[2]+606105819&4294967295,v=T+(g<<17&4294967295|g>>>15),g=_+(m^v&(T^m))+y[3]+3250441966&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(T^_&(v^T))+y[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=T+(v^m&(_^v))+y[5]+1200080426&4294967295,T=m+(g<<12&4294967295|g>>>20),g=v+(_^T&(m^_))+y[6]+2821735955&4294967295,v=T+(g<<17&4294967295|g>>>15),g=_+(m^v&(T^m))+y[7]+4249261313&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(T^_&(v^T))+y[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=T+(v^m&(_^v))+y[9]+2336552879&4294967295,T=m+(g<<12&4294967295|g>>>20),g=v+(_^T&(m^_))+y[10]+4294925233&4294967295,v=T+(g<<17&4294967295|g>>>15),g=_+(m^v&(T^m))+y[11]+2304563134&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(T^_&(v^T))+y[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=T+(v^m&(_^v))+y[13]+4254626195&4294967295,T=m+(g<<12&4294967295|g>>>20),g=v+(_^T&(m^_))+y[14]+2792965006&4294967295,v=T+(g<<17&4294967295|g>>>15),g=_+(m^v&(T^m))+y[15]+1236535329&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(v^T&(_^v))+y[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=T+(_^v&(m^_))+y[6]+3225465664&4294967295,T=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(T^m))+y[11]+643717713&4294967295,v=T+(g<<14&4294967295|g>>>18),g=_+(T^m&(v^T))+y[0]+3921069994&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(v^T&(_^v))+y[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=T+(_^v&(m^_))+y[10]+38016083&4294967295,T=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(T^m))+y[15]+3634488961&4294967295,v=T+(g<<14&4294967295|g>>>18),g=_+(T^m&(v^T))+y[4]+3889429448&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(v^T&(_^v))+y[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=T+(_^v&(m^_))+y[14]+3275163606&4294967295,T=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(T^m))+y[3]+4107603335&4294967295,v=T+(g<<14&4294967295|g>>>18),g=_+(T^m&(v^T))+y[8]+1163531501&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(v^T&(_^v))+y[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=T+(_^v&(m^_))+y[2]+4243563512&4294967295,T=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(T^m))+y[7]+1735328473&4294967295,v=T+(g<<14&4294967295|g>>>18),g=_+(T^m&(v^T))+y[12]+2368359562&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(_^v^T)+y[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=T+(m^_^v)+y[8]+2272392833&4294967295,T=m+(g<<11&4294967295|g>>>21),g=v+(T^m^_)+y[11]+1839030562&4294967295,v=T+(g<<16&4294967295|g>>>16),g=_+(v^T^m)+y[14]+4259657740&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(_^v^T)+y[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=T+(m^_^v)+y[4]+1272893353&4294967295,T=m+(g<<11&4294967295|g>>>21),g=v+(T^m^_)+y[7]+4139469664&4294967295,v=T+(g<<16&4294967295|g>>>16),g=_+(v^T^m)+y[10]+3200236656&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(_^v^T)+y[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=T+(m^_^v)+y[0]+3936430074&4294967295,T=m+(g<<11&4294967295|g>>>21),g=v+(T^m^_)+y[3]+3572445317&4294967295,v=T+(g<<16&4294967295|g>>>16),g=_+(v^T^m)+y[6]+76029189&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(_^v^T)+y[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=T+(m^_^v)+y[12]+3873151461&4294967295,T=m+(g<<11&4294967295|g>>>21),g=v+(T^m^_)+y[15]+530742520&4294967295,v=T+(g<<16&4294967295|g>>>16),g=_+(v^T^m)+y[2]+3299628645&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(v^(_|~T))+y[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=T+(_^(m|~v))+y[7]+1126891415&4294967295,T=m+(g<<10&4294967295|g>>>22),g=v+(m^(T|~_))+y[14]+2878612391&4294967295,v=T+(g<<15&4294967295|g>>>17),g=_+(T^(v|~m))+y[5]+4237533241&4294967295,_=v+(g<<21&4294967295|g>>>11),g=m+(v^(_|~T))+y[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=T+(_^(m|~v))+y[3]+2399980690&4294967295,T=m+(g<<10&4294967295|g>>>22),g=v+(m^(T|~_))+y[10]+4293915773&4294967295,v=T+(g<<15&4294967295|g>>>17),g=_+(T^(v|~m))+y[1]+2240044497&4294967295,_=v+(g<<21&4294967295|g>>>11),g=m+(v^(_|~T))+y[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=T+(_^(m|~v))+y[15]+4264355552&4294967295,T=m+(g<<10&4294967295|g>>>22),g=v+(m^(T|~_))+y[6]+2734768916&4294967295,v=T+(g<<15&4294967295|g>>>17),g=_+(T^(v|~m))+y[13]+1309151649&4294967295,_=v+(g<<21&4294967295|g>>>11),g=m+(v^(_|~T))+y[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=T+(_^(m|~v))+y[11]+3174756917&4294967295,T=m+(g<<10&4294967295|g>>>22),g=v+(m^(T|~_))+y[2]+718787259&4294967295,v=T+(g<<15&4294967295|g>>>17),g=_+(T^(v|~m))+y[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(v+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+v&4294967295,E.g[3]=E.g[3]+T&4294967295}i.prototype.u=function(E,m){m===void 0&&(m=E.length);for(var _=m-this.blockSize,y=this.B,v=this.h,T=0;T<m;){if(v==0)for(;T<=_;)r(this,E,T),T+=this.blockSize;if(typeof E=="string"){for(;T<m;)if(y[v++]=E.charCodeAt(T++),v==this.blockSize){r(this,y),v=0;break}}else for(;T<m;)if(y[v++]=E[T++],v==this.blockSize){r(this,y),v=0;break}}this.h=v,this.o+=m},i.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;var _=8*this.o;for(m=E.length-8;m<E.length;++m)E[m]=_&255,_/=256;for(this.u(E),E=Array(16),m=_=0;4>m;++m)for(var y=0;32>y;y+=8)E[_++]=this.g[m]>>>y&255;return E};function o(E,m){var _=c;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=m(E)}function a(E,m){this.h=m;for(var _=[],y=!0,v=E.length-1;0<=v;v--){var T=E[v]|0;y&&T==m||(_[v]=T,y=!1)}this.g=_}var c={};function h(E){return-128<=E&&128>E?o(E,function(m){return new a([m|0],0>m?-1:0)}):new a([E|0],0>E?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return I;if(0>E)return N(d(-E));for(var m=[],_=1,y=0;E>=_;y++)m[y]=E/_|0,_*=4294967296;return new a(m,0)}function p(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return N(p(E.substring(1),m));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(m,8)),y=I,v=0;v<E.length;v+=8){var T=Math.min(8,E.length-v),g=parseInt(E.substring(v,v+T),m);8>T?(T=d(Math.pow(m,T)),y=y.j(T).add(d(g))):(y=y.j(_),y=y.add(d(g)))}return y}var I=h(0),A=h(1),C=h(16777216);n=a.prototype,n.m=function(){if(M(this))return-N(this).m();for(var E=0,m=1,_=0;_<this.g.length;_++){var y=this.i(_);E+=(0<=y?y:4294967296+y)*m,m*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(D(this))return"0";if(M(this))return"-"+N(this).toString(E);for(var m=d(Math.pow(E,6)),_=this,y="";;){var v=te(_,m).g;_=W(_,v.j(m));var T=((0<_.g.length?_.g[0]:_.h)>>>0).toString(E);if(_=v,D(_))return T+y;for(;6>T.length;)T="0"+T;y=T+y}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function D(E){if(E.h!=0)return!1;for(var m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function M(E){return E.h==-1}n.l=function(E){return E=W(this,E),M(E)?-1:D(E)?0:1};function N(E){for(var m=E.g.length,_=[],y=0;y<m;y++)_[y]=~E.g[y];return new a(_,~E.h).add(A)}n.abs=function(){return M(this)?N(this):this},n.add=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],y=0,v=0;v<=m;v++){var T=y+(this.i(v)&65535)+(E.i(v)&65535),g=(T>>>16)+(this.i(v)>>>16)+(E.i(v)>>>16);y=g>>>16,T&=65535,g&=65535,_[v]=g<<16|T}return new a(_,_[_.length-1]&-2147483648?-1:0)};function W(E,m){return E.add(N(m))}n.j=function(E){if(D(this)||D(E))return I;if(M(this))return M(E)?N(this).j(N(E)):N(N(this).j(E));if(M(E))return N(this.j(N(E)));if(0>this.l(C)&&0>E.l(C))return d(this.m()*E.m());for(var m=this.g.length+E.g.length,_=[],y=0;y<2*m;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var v=0;v<E.g.length;v++){var T=this.i(y)>>>16,g=this.i(y)&65535,$e=E.i(v)>>>16,sn=E.i(v)&65535;_[2*y+2*v]+=g*sn,G(_,2*y+2*v),_[2*y+2*v+1]+=T*sn,G(_,2*y+2*v+1),_[2*y+2*v+1]+=g*$e,G(_,2*y+2*v+1),_[2*y+2*v+2]+=T*$e,G(_,2*y+2*v+2)}for(y=0;y<m;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=m;y<2*m;y++)_[y]=0;return new a(_,0)};function G(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function K(E,m){this.g=E,this.h=m}function te(E,m){if(D(m))throw Error("division by zero");if(D(E))return new K(I,I);if(M(E))return m=te(N(E),m),new K(N(m.g),N(m.h));if(M(m))return m=te(E,N(m)),new K(N(m.g),m.h);if(30<E.g.length){if(M(E)||M(m))throw Error("slowDivide_ only works with positive integers.");for(var _=A,y=m;0>=y.l(E);)_=Le(_),y=Le(y);var v=ne(_,1),T=ne(y,1);for(y=ne(y,2),_=ne(_,2);!D(y);){var g=T.add(y);0>=g.l(E)&&(v=v.add(_),T=g),y=ne(y,1),_=ne(_,1)}return m=W(E,v.j(m)),new K(v,m)}for(v=I;0<=E.l(m);){for(_=Math.max(1,Math.floor(E.m()/m.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),T=d(_),g=T.j(m);M(g)||0<g.l(E);)_-=y,T=d(_),g=T.j(m);D(T)&&(T=A),v=v.add(T),E=W(E,g)}return new K(v,E)}n.A=function(E){return te(this,E).h},n.and=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)&E.i(y);return new a(_,this.h&E.h)},n.or=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)|E.i(y);return new a(_,this.h|E.h)},n.xor=function(E){for(var m=Math.max(this.g.length,E.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)^E.i(y);return new a(_,this.h^E.h)};function Le(E){for(var m=E.g.length+1,_=[],y=0;y<m;y++)_[y]=E.i(y)<<1|E.i(y-1)>>>31;return new a(_,E.h)}function ne(E,m){var _=m>>5;m%=32;for(var y=E.g.length-_,v=[],T=0;T<y;T++)v[T]=0<m?E.i(T+_)>>>m|E.i(T+_+1)<<32-m:E.i(T+_);return new a(v,E.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,rc=a}).apply(typeof xa!="undefined"?xa:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var vi=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var sc,Rn,oc,Di,cs,ac,lc,cc;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,l,u){return s==Array.prototype||s==Object.prototype||(s[l]=u.value),s};function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof vi=="object"&&vi];for(var l=0;l<s.length;++l){var u=s[l];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var i=t(this);function r(s,l){if(l)e:{var u=i;s=s.split(".");for(var f=0;f<s.length-1;f++){var w=s[f];if(!(w in u))break e;u=u[w]}s=s[s.length-1],f=u[s],l=l(f),l!=f&&l!=null&&e(u,s,{configurable:!0,writable:!0,value:l})}}function o(s,l){s instanceof String&&(s+="");var u=0,f=!1,w={next:function(){if(!f&&u<s.length){var b=u++;return{value:l(b,s[b]),done:!1}}return f=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}r("Array.prototype.values",function(s){return s||function(){return o(this,function(l,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function h(s){var l=typeof s;return l=l!="object"?l:s?Array.isArray(s)?"array":l:"null",l=="array"||l=="object"&&typeof s.length=="number"}function d(s){var l=typeof s;return l=="object"&&s!=null||l=="function"}function p(s,l,u){return s.call.apply(s.bind,arguments)}function I(s,l,u){if(!s)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,f),s.apply(l,w)}}return function(){return s.apply(l,arguments)}}function A(s,l,u){return A=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:I,A.apply(null,arguments)}function C(s,l){var u=Array.prototype.slice.call(arguments,1);return function(){var f=u.slice();return f.push.apply(f,arguments),s.apply(this,f)}}function D(s,l){function u(){}u.prototype=l.prototype,s.aa=l.prototype,s.prototype=new u,s.prototype.constructor=s,s.Qb=function(f,w,b){for(var P=Array(arguments.length-2),q=2;q<arguments.length;q++)P[q-2]=arguments[q];return l.prototype[w].apply(f,P)}}function M(s){const l=s.length;if(0<l){const u=Array(l);for(let f=0;f<l;f++)u[f]=s[f];return u}return[]}function N(s,l){for(let u=1;u<arguments.length;u++){const f=arguments[u];if(h(f)){const w=s.length||0,b=f.length||0;s.length=w+b;for(let P=0;P<b;P++)s[w+P]=f[P]}else s.push(f)}}class W{constructor(l,u){this.i=l,this.j=u,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function G(s){return/^[\s\xa0]*$/.test(s)}function K(){var s=c.navigator;return s&&(s=s.userAgent)?s:""}function te(s){return te[" "](s),s}te[" "]=function(){};var Le=K().indexOf("Gecko")!=-1&&!(K().toLowerCase().indexOf("webkit")!=-1&&K().indexOf("Edge")==-1)&&!(K().indexOf("Trident")!=-1||K().indexOf("MSIE")!=-1)&&K().indexOf("Edge")==-1;function ne(s,l,u){for(const f in s)l.call(u,s[f],f,s)}function E(s,l){for(const u in s)l.call(void 0,s[u],u,s)}function m(s){const l={};for(const u in s)l[u]=s[u];return l}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(s,l){let u,f;for(let w=1;w<arguments.length;w++){f=arguments[w];for(u in f)s[u]=f[u];for(let b=0;b<_.length;b++)u=_[b],Object.prototype.hasOwnProperty.call(f,u)&&(s[u]=f[u])}}function v(s){var l=1;s=s.split(":");const u=[];for(;0<l&&s.length;)u.push(s.shift()),l--;return s.length&&u.push(s.join(":")),u}function T(s){c.setTimeout(()=>{throw s},0)}function g(){var s=Er;let l=null;return s.g&&(l=s.g,s.g=s.g.next,s.g||(s.h=null),l.next=null),l}class $e{constructor(){this.h=this.g=null}add(l,u){const f=sn.get();f.set(l,u),this.h?this.h.next=f:this.g=f,this.h=f}}var sn=new W(()=>new gu,s=>s.reset());class gu{constructor(){this.next=this.g=this.h=null}set(l,u){this.h=l,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let on,an=!1,Er=new $e,oo=()=>{const s=c.Promise.resolve(void 0);on=()=>{s.then(_u)}};var _u=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(u){T(u)}var l=sn;l.j(s),100>l.h&&(l.h++,s.next=l.g,l.g=s)}an=!1};function Xe(){this.s=this.s,this.C=this.C}Xe.prototype.s=!1,Xe.prototype.ma=function(){this.s||(this.s=!0,this.N())},Xe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function he(s,l){this.type=s,this.g=this.target=l,this.defaultPrevented=!1}he.prototype.h=function(){this.defaultPrevented=!0};var yu=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,l=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const u=()=>{};c.addEventListener("test",u,l),c.removeEventListener("test",u,l)}catch{}return s}();function ln(s,l){if(he.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var u=this.type=s.type,f=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=l,l=s.relatedTarget){if(Le){e:{try{te(l.nodeName);var w=!0;break e}catch{}w=!1}w||(l=null)}}else u=="mouseover"?l=s.fromElement:u=="mouseout"&&(l=s.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:vu[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&ln.aa.h.call(this)}}D(ln,he);var vu={2:"touch",3:"pen",4:"mouse"};ln.prototype.h=function(){ln.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var Zn="closure_listenable_"+(1e6*Math.random()|0),Eu=0;function wu(s,l,u,f,w){this.listener=s,this.proxy=null,this.src=l,this.type=u,this.capture=!!f,this.ha=w,this.key=++Eu,this.da=this.fa=!1}function ei(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function ti(s){this.src=s,this.g={},this.h=0}ti.prototype.add=function(s,l,u,f,w){var b=s.toString();s=this.g[b],s||(s=this.g[b]=[],this.h++);var P=Ir(s,l,f,w);return-1<P?(l=s[P],u||(l.fa=!1)):(l=new wu(l,this.src,b,!!f,w),l.fa=u,s.push(l)),l};function wr(s,l){var u=l.type;if(u in s.g){var f=s.g[u],w=Array.prototype.indexOf.call(f,l,void 0),b;(b=0<=w)&&Array.prototype.splice.call(f,w,1),b&&(ei(l),s.g[u].length==0&&(delete s.g[u],s.h--))}}function Ir(s,l,u,f){for(var w=0;w<s.length;++w){var b=s[w];if(!b.da&&b.listener==l&&b.capture==!!u&&b.ha==f)return w}return-1}var Tr="closure_lm_"+(1e6*Math.random()|0),Ar={};function ao(s,l,u,f,w){if(Array.isArray(l)){for(var b=0;b<l.length;b++)ao(s,l[b],u,f,w);return null}return u=uo(u),s&&s[Zn]?s.K(l,u,d(f)?!!f.capture:!1,w):Iu(s,l,u,!1,f,w)}function Iu(s,l,u,f,w,b){if(!l)throw Error("Invalid event type");var P=d(w)?!!w.capture:!!w,q=Rr(s);if(q||(s[Tr]=q=new ti(s)),u=q.add(l,u,f,P,b),u.proxy)return u;if(f=Tu(),u.proxy=f,f.src=s,f.listener=u,s.addEventListener)yu||(w=P),w===void 0&&(w=!1),s.addEventListener(l.toString(),f,w);else if(s.attachEvent)s.attachEvent(co(l.toString()),f);else if(s.addListener&&s.removeListener)s.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Tu(){function s(u){return l.call(s.src,s.listener,u)}const l=Au;return s}function lo(s,l,u,f,w){if(Array.isArray(l))for(var b=0;b<l.length;b++)lo(s,l[b],u,f,w);else f=d(f)?!!f.capture:!!f,u=uo(u),s&&s[Zn]?(s=s.i,l=String(l).toString(),l in s.g&&(b=s.g[l],u=Ir(b,u,f,w),-1<u&&(ei(b[u]),Array.prototype.splice.call(b,u,1),b.length==0&&(delete s.g[l],s.h--)))):s&&(s=Rr(s))&&(l=s.g[l.toString()],s=-1,l&&(s=Ir(l,u,f,w)),(u=-1<s?l[s]:null)&&br(u))}function br(s){if(typeof s!="number"&&s&&!s.da){var l=s.src;if(l&&l[Zn])wr(l.i,s);else{var u=s.type,f=s.proxy;l.removeEventListener?l.removeEventListener(u,f,s.capture):l.detachEvent?l.detachEvent(co(u),f):l.addListener&&l.removeListener&&l.removeListener(f),(u=Rr(l))?(wr(u,s),u.h==0&&(u.src=null,l[Tr]=null)):ei(s)}}}function co(s){return s in Ar?Ar[s]:Ar[s]="on"+s}function Au(s,l){if(s.da)s=!0;else{l=new ln(l,this);var u=s.listener,f=s.ha||s.src;s.fa&&br(s),s=u.call(f,l)}return s}function Rr(s){return s=s[Tr],s instanceof ti?s:null}var Sr="__closure_events_fn_"+(1e9*Math.random()>>>0);function uo(s){return typeof s=="function"?s:(s[Sr]||(s[Sr]=function(l){return s.handleEvent(l)}),s[Sr])}function de(){Xe.call(this),this.i=new ti(this),this.M=this,this.F=null}D(de,Xe),de.prototype[Zn]=!0,de.prototype.removeEventListener=function(s,l,u,f){lo(this,s,l,u,f)};function we(s,l){var u,f=s.F;if(f)for(u=[];f;f=f.F)u.push(f);if(s=s.M,f=l.type||l,typeof l=="string")l=new he(l,s);else if(l instanceof he)l.target=l.target||s;else{var w=l;l=new he(f,s),y(l,w)}if(w=!0,u)for(var b=u.length-1;0<=b;b--){var P=l.g=u[b];w=ni(P,f,!0,l)&&w}if(P=l.g=s,w=ni(P,f,!0,l)&&w,w=ni(P,f,!1,l)&&w,u)for(b=0;b<u.length;b++)P=l.g=u[b],w=ni(P,f,!1,l)&&w}de.prototype.N=function(){if(de.aa.N.call(this),this.i){var s=this.i,l;for(l in s.g){for(var u=s.g[l],f=0;f<u.length;f++)ei(u[f]);delete s.g[l],s.h--}}this.F=null},de.prototype.K=function(s,l,u,f){return this.i.add(String(s),l,!1,u,f)},de.prototype.L=function(s,l,u,f){return this.i.add(String(s),l,!0,u,f)};function ni(s,l,u,f){if(l=s.i.g[String(l)],!l)return!0;l=l.concat();for(var w=!0,b=0;b<l.length;++b){var P=l[b];if(P&&!P.da&&P.capture==u){var q=P.listener,oe=P.ha||P.src;P.fa&&wr(s.i,P),w=q.call(oe,f)!==!1&&w}}return w&&!f.defaultPrevented}function ho(s,l,u){if(typeof s=="function")u&&(s=A(s,u));else if(s&&typeof s.handleEvent=="function")s=A(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(s,l||0)}function fo(s){s.g=ho(()=>{s.g=null,s.i&&(s.i=!1,fo(s))},s.l);const l=s.h;s.h=null,s.m.apply(null,l)}class bu extends Xe{constructor(l,u){super(),this.m=l,this.l=u,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:fo(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function cn(s){Xe.call(this),this.h=s,this.g={}}D(cn,Xe);var po=[];function mo(s){ne(s.g,function(l,u){this.g.hasOwnProperty(u)&&br(l)},s),s.g={}}cn.prototype.N=function(){cn.aa.N.call(this),mo(this)},cn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Pr=c.JSON.stringify,Ru=c.JSON.parse,Su=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function Cr(){}Cr.prototype.h=null;function go(s){return s.h||(s.h=s.i())}function _o(){}var un={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function kr(){he.call(this,"d")}D(kr,he);function Dr(){he.call(this,"c")}D(Dr,he);var gt={},yo=null;function ii(){return yo=yo||new de}gt.La="serverreachability";function vo(s){he.call(this,gt.La,s)}D(vo,he);function hn(s){const l=ii();we(l,new vo(l))}gt.STAT_EVENT="statevent";function Eo(s,l){he.call(this,gt.STAT_EVENT,s),this.stat=l}D(Eo,he);function Ie(s){const l=ii();we(l,new Eo(l,s))}gt.Ma="timingevent";function wo(s,l){he.call(this,gt.Ma,s),this.size=l}D(wo,he);function dn(s,l){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},l)}function fn(){this.g=!0}fn.prototype.xa=function(){this.g=!1};function Pu(s,l,u,f,w,b){s.info(function(){if(s.g)if(b)for(var P="",q=b.split("&"),oe=0;oe<q.length;oe++){var j=q[oe].split("=");if(1<j.length){var fe=j[0];j=j[1];var pe=fe.split("_");P=2<=pe.length&&pe[1]=="type"?P+(fe+"="+j+"&"):P+(fe+"=redacted&")}}else P=null;else P=b;return"XMLHTTP REQ ("+f+") [attempt "+w+"]: "+l+`
`+u+`
`+P})}function Cu(s,l,u,f,w,b,P){s.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+w+"]: "+l+`
`+u+`
`+b+" "+P})}function kt(s,l,u,f){s.info(function(){return"XMLHTTP TEXT ("+l+"): "+Du(s,u)+(f?" "+f:"")})}function ku(s,l){s.info(function(){return"TIMEOUT: "+l})}fn.prototype.info=function(){};function Du(s,l){if(!s.g)return l;if(!l)return null;try{var u=JSON.parse(l);if(u){for(s=0;s<u.length;s++)if(Array.isArray(u[s])){var f=u[s];if(!(2>f.length)){var w=f[1];if(Array.isArray(w)&&!(1>w.length)){var b=w[0];if(b!="noop"&&b!="stop"&&b!="close")for(var P=1;P<w.length;P++)w[P]=""}}}}return Pr(u)}catch{return l}}var ri={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Io={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Nr;function si(){}D(si,Cr),si.prototype.g=function(){return new XMLHttpRequest},si.prototype.i=function(){return{}},Nr=new si;function Ye(s,l,u,f){this.j=s,this.i=l,this.l=u,this.R=f||1,this.U=new cn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new To}function To(){this.i=null,this.g="",this.h=!1}var Ao={},Or={};function Vr(s,l,u){s.L=1,s.v=ci(Be(l)),s.m=u,s.P=!0,bo(s,null)}function bo(s,l){s.F=Date.now(),oi(s),s.A=Be(s.v);var u=s.A,f=s.R;Array.isArray(f)||(f=[String(f)]),Fo(u.i,"t",f),s.C=0,u=s.j.J,s.h=new To,s.g=ia(s.j,u?l:null,!s.m),0<s.O&&(s.M=new bu(A(s.Y,s,s.g),s.O)),l=s.U,u=s.g,f=s.ca;var w="readystatechange";Array.isArray(w)||(w&&(po[0]=w.toString()),w=po);for(var b=0;b<w.length;b++){var P=ao(u,w[b],f||l.handleEvent,!1,l.h||l);if(!P)break;l.g[P.key]=P}l=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,l)):(s.u="GET",s.g.ea(s.A,s.u,null,l)),hn(),Pu(s.i,s.u,s.A,s.l,s.R,s.m)}Ye.prototype.ca=function(s){s=s.target;const l=this.M;l&&je(s)==3?l.j():this.Y(s)},Ye.prototype.Y=function(s){try{if(s==this.g)e:{const pe=je(this.g);var l=this.g.Ba();const Ot=this.g.Z();if(!(3>pe)&&(pe!=3||this.g&&(this.h.h||this.g.oa()||zo(this.g)))){this.J||pe!=4||l==7||(l==8||0>=Ot?hn(3):hn(2)),Lr(this);var u=this.g.Z();this.X=u;t:if(Ro(this)){var f=zo(this.g);s="";var w=f.length,b=je(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){_t(this),pn(this);var P="";break t}this.h.i=new c.TextDecoder}for(l=0;l<w;l++)this.h.h=!0,s+=this.h.i.decode(f[l],{stream:!(b&&l==w-1)});f.length=0,this.h.g+=s,this.C=0,P=this.h.g}else P=this.g.oa();if(this.o=u==200,Cu(this.i,this.u,this.A,this.l,this.R,pe,u),this.o){if(this.T&&!this.K){t:{if(this.g){var q,oe=this.g;if((q=oe.g?oe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!G(q)){var j=q;break t}}j=null}if(u=j)kt(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Mr(this,u);else{this.o=!1,this.s=3,Ie(12),_t(this),pn(this);break e}}if(this.P){u=!0;let Ce;for(;!this.J&&this.C<P.length;)if(Ce=Nu(this,P),Ce==Or){pe==4&&(this.s=4,Ie(14),u=!1),kt(this.i,this.l,null,"[Incomplete Response]");break}else if(Ce==Ao){this.s=4,Ie(15),kt(this.i,this.l,P,"[Invalid Chunk]"),u=!1;break}else kt(this.i,this.l,Ce,null),Mr(this,Ce);if(Ro(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),pe!=4||P.length!=0||this.h.h||(this.s=1,Ie(16),u=!1),this.o=this.o&&u,!u)kt(this.i,this.l,P,"[Invalid Chunked Response]"),_t(this),pn(this);else if(0<P.length&&!this.W){this.W=!0;var fe=this.j;fe.g==this&&fe.ba&&!fe.M&&(fe.j.info("Great, no buffering proxy detected. Bytes received: "+P.length),jr(fe),fe.M=!0,Ie(11))}}else kt(this.i,this.l,P,null),Mr(this,P);pe==4&&_t(this),this.o&&!this.J&&(pe==4?Zo(this.j,this):(this.o=!1,oi(this)))}else Qu(this.g),u==400&&0<P.indexOf("Unknown SID")?(this.s=3,Ie(12)):(this.s=0,Ie(13)),_t(this),pn(this)}}}catch{}finally{}};function Ro(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function Nu(s,l){var u=s.C,f=l.indexOf(`
`,u);return f==-1?Or:(u=Number(l.substring(u,f)),isNaN(u)?Ao:(f+=1,f+u>l.length?Or:(l=l.slice(f,f+u),s.C=f+u,l)))}Ye.prototype.cancel=function(){this.J=!0,_t(this)};function oi(s){s.S=Date.now()+s.I,So(s,s.I)}function So(s,l){if(s.B!=null)throw Error("WatchDog timer not null");s.B=dn(A(s.ba,s),l)}function Lr(s){s.B&&(c.clearTimeout(s.B),s.B=null)}Ye.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(ku(this.i,this.A),this.L!=2&&(hn(),Ie(17)),_t(this),this.s=2,pn(this)):So(this,this.S-s)};function pn(s){s.j.G==0||s.J||Zo(s.j,s)}function _t(s){Lr(s);var l=s.M;l&&typeof l.ma=="function"&&l.ma(),s.M=null,mo(s.U),s.g&&(l=s.g,s.g=null,l.abort(),l.ma())}function Mr(s,l){try{var u=s.j;if(u.G!=0&&(u.g==s||xr(u.h,s))){if(!s.K&&xr(u.h,s)&&u.G==3){try{var f=u.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var w=f;if(w[0]==0){e:if(!u.u){if(u.g)if(u.g.F+3e3<s.F)mi(u),fi(u);else break e;Br(u),Ie(18)}}else u.za=w[1],0<u.za-u.T&&37500>w[2]&&u.F&&u.v==0&&!u.C&&(u.C=dn(A(u.Za,u),6e3));if(1>=ko(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else vt(u,11)}else if((s.K||u.g==s)&&mi(u),!G(l))for(w=u.Da.g.parse(l),l=0;l<w.length;l++){let j=w[l];if(u.T=j[0],j=j[1],u.G==2)if(j[0]=="c"){u.K=j[1],u.ia=j[2];const fe=j[3];fe!=null&&(u.la=fe,u.j.info("VER="+u.la));const pe=j[4];pe!=null&&(u.Aa=pe,u.j.info("SVER="+u.Aa));const Ot=j[5];Ot!=null&&typeof Ot=="number"&&0<Ot&&(f=1.5*Ot,u.L=f,u.j.info("backChannelRequestTimeoutMs_="+f)),f=u;const Ce=s.g;if(Ce){const _i=Ce.g?Ce.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(_i){var b=f.h;b.g||_i.indexOf("spdy")==-1&&_i.indexOf("quic")==-1&&_i.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Ur(b,b.h),b.h=null))}if(f.D){const qr=Ce.g?Ce.g.getResponseHeader("X-HTTP-Session-Id"):null;qr&&(f.ya=qr,Q(f.I,f.D,qr))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-s.F,u.j.info("Handshake RTT: "+u.R+"ms")),f=u;var P=s;if(f.qa=na(f,f.J?f.ia:null,f.W),P.K){Do(f.h,P);var q=P,oe=f.L;oe&&(q.I=oe),q.B&&(Lr(q),oi(q)),f.g=P}else Xo(f);0<u.i.length&&pi(u)}else j[0]!="stop"&&j[0]!="close"||vt(u,7);else u.G==3&&(j[0]=="stop"||j[0]=="close"?j[0]=="stop"?vt(u,7):$r(u):j[0]!="noop"&&u.l&&u.l.ta(j),u.v=0)}}hn(4)}catch{}}var Ou=class{constructor(s,l){this.g=s,this.map=l}};function Po(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Co(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function ko(s){return s.h?1:s.g?s.g.size:0}function xr(s,l){return s.h?s.h==l:s.g?s.g.has(l):!1}function Ur(s,l){s.g?s.g.add(l):s.h=l}function Do(s,l){s.h&&s.h==l?s.h=null:s.g&&s.g.has(l)&&s.g.delete(l)}Po.prototype.cancel=function(){if(this.i=No(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function No(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let l=s.i;for(const u of s.g.values())l=l.concat(u.D);return l}return M(s.i)}function Vu(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map!="undefined"&&s instanceof Map||typeof Set!="undefined"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var l=[],u=s.length,f=0;f<u;f++)l.push(s[f]);return l}l=[],u=0;for(f in s)l[u++]=s[f];return l}function Lu(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map!="undefined"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set!="undefined"&&s instanceof Set)){if(h(s)||typeof s=="string"){var l=[];s=s.length;for(var u=0;u<s;u++)l.push(u);return l}l=[],u=0;for(const f in s)l[u++]=f;return l}}}function Oo(s,l){if(s.forEach&&typeof s.forEach=="function")s.forEach(l,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,l,void 0);else for(var u=Lu(s),f=Vu(s),w=f.length,b=0;b<w;b++)l.call(void 0,f[b],u&&u[b],s)}var Vo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Mu(s,l){if(s){s=s.split("&");for(var u=0;u<s.length;u++){var f=s[u].indexOf("="),w=null;if(0<=f){var b=s[u].substring(0,f);w=s[u].substring(f+1)}else b=s[u];l(b,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function yt(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof yt){this.h=s.h,ai(this,s.j),this.o=s.o,this.g=s.g,li(this,s.s),this.l=s.l;var l=s.i,u=new _n;u.i=l.i,l.g&&(u.g=new Map(l.g),u.h=l.h),Lo(this,u),this.m=s.m}else s&&(l=String(s).match(Vo))?(this.h=!1,ai(this,l[1]||"",!0),this.o=mn(l[2]||""),this.g=mn(l[3]||"",!0),li(this,l[4]),this.l=mn(l[5]||"",!0),Lo(this,l[6]||"",!0),this.m=mn(l[7]||"")):(this.h=!1,this.i=new _n(null,this.h))}yt.prototype.toString=function(){var s=[],l=this.j;l&&s.push(gn(l,Mo,!0),":");var u=this.g;return(u||l=="file")&&(s.push("//"),(l=this.o)&&s.push(gn(l,Mo,!0),"@"),s.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&s.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&s.push("/"),s.push(gn(u,u.charAt(0)=="/"?Fu:Uu,!0))),(u=this.i.toString())&&s.push("?",u),(u=this.m)&&s.push("#",gn(u,Bu)),s.join("")};function Be(s){return new yt(s)}function ai(s,l,u){s.j=u?mn(l,!0):l,s.j&&(s.j=s.j.replace(/:$/,""))}function li(s,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);s.s=l}else s.s=null}function Lo(s,l,u){l instanceof _n?(s.i=l,ju(s.i,s.h)):(u||(l=gn(l,$u)),s.i=new _n(l,s.h))}function Q(s,l,u){s.i.set(l,u)}function ci(s){return Q(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function mn(s,l){return s?l?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function gn(s,l,u){return typeof s=="string"?(s=encodeURI(s).replace(l,xu),u&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function xu(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Mo=/[#\/\?@]/g,Uu=/[#\?:]/g,Fu=/[#\?]/g,$u=/[#\?@]/g,Bu=/#/g;function _n(s,l){this.h=this.g=null,this.i=s||null,this.j=!!l}function Ze(s){s.g||(s.g=new Map,s.h=0,s.i&&Mu(s.i,function(l,u){s.add(decodeURIComponent(l.replace(/\+/g," ")),u)}))}n=_n.prototype,n.add=function(s,l){Ze(this),this.i=null,s=Dt(this,s);var u=this.g.get(s);return u||this.g.set(s,u=[]),u.push(l),this.h+=1,this};function xo(s,l){Ze(s),l=Dt(s,l),s.g.has(l)&&(s.i=null,s.h-=s.g.get(l).length,s.g.delete(l))}function Uo(s,l){return Ze(s),l=Dt(s,l),s.g.has(l)}n.forEach=function(s,l){Ze(this),this.g.forEach(function(u,f){u.forEach(function(w){s.call(l,w,f,this)},this)},this)},n.na=function(){Ze(this);const s=Array.from(this.g.values()),l=Array.from(this.g.keys()),u=[];for(let f=0;f<l.length;f++){const w=s[f];for(let b=0;b<w.length;b++)u.push(l[f])}return u},n.V=function(s){Ze(this);let l=[];if(typeof s=="string")Uo(this,s)&&(l=l.concat(this.g.get(Dt(this,s))));else{s=Array.from(this.g.values());for(let u=0;u<s.length;u++)l=l.concat(s[u])}return l},n.set=function(s,l){return Ze(this),this.i=null,s=Dt(this,s),Uo(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[l]),this.h+=1,this},n.get=function(s,l){return s?(s=this.V(s),0<s.length?String(s[0]):l):l};function Fo(s,l,u){xo(s,l),0<u.length&&(s.i=null,s.g.set(Dt(s,l),M(u)),s.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],l=Array.from(this.g.keys());for(var u=0;u<l.length;u++){var f=l[u];const b=encodeURIComponent(String(f)),P=this.V(f);for(f=0;f<P.length;f++){var w=b;P[f]!==""&&(w+="="+encodeURIComponent(String(P[f]))),s.push(w)}}return this.i=s.join("&")};function Dt(s,l){return l=String(l),s.j&&(l=l.toLowerCase()),l}function ju(s,l){l&&!s.j&&(Ze(s),s.i=null,s.g.forEach(function(u,f){var w=f.toLowerCase();f!=w&&(xo(this,f),Fo(this,w,u))},s)),s.j=l}function qu(s,l){const u=new fn;if(c.Image){const f=new Image;f.onload=C(et,u,"TestLoadImage: loaded",!0,l,f),f.onerror=C(et,u,"TestLoadImage: error",!1,l,f),f.onabort=C(et,u,"TestLoadImage: abort",!1,l,f),f.ontimeout=C(et,u,"TestLoadImage: timeout",!1,l,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=s}else l(!1)}function Hu(s,l){const u=new fn,f=new AbortController,w=setTimeout(()=>{f.abort(),et(u,"TestPingServer: timeout",!1,l)},1e4);fetch(s,{signal:f.signal}).then(b=>{clearTimeout(w),b.ok?et(u,"TestPingServer: ok",!0,l):et(u,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(w),et(u,"TestPingServer: error",!1,l)})}function et(s,l,u,f,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),f(u)}catch{}}function Gu(){this.g=new Su}function zu(s,l,u){const f=u||"";try{Oo(s,function(w,b){let P=w;d(w)&&(P=Pr(w)),l.push(f+b+"="+encodeURIComponent(P))})}catch(w){throw l.push(f+"type="+encodeURIComponent("_badmap")),w}}function ui(s){this.l=s.Ub||null,this.j=s.eb||!1}D(ui,Cr),ui.prototype.g=function(){return new hi(this.l,this.j)},ui.prototype.i=function(s){return function(){return s}}({});function hi(s,l){de.call(this),this.D=s,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(hi,de),n=hi.prototype,n.open=function(s,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=l,this.readyState=1,vn(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(l.body=s),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,yn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,vn(this)),this.g&&(this.readyState=3,vn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;$o(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function $o(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var l=s.value?s.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!s.done}))&&(this.response=this.responseText+=l)}s.done?yn(this):vn(this),this.readyState==3&&$o(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,yn(this))},n.Qa=function(s){this.g&&(this.response=s,yn(this))},n.ga=function(){this.g&&yn(this)};function yn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,vn(s)}n.setRequestHeader=function(s,l){this.u.append(s,l)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],l=this.h.entries();for(var u=l.next();!u.done;)u=u.value,s.push(u[0]+": "+u[1]),u=l.next();return s.join(`\r
`)};function vn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(hi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Bo(s){let l="";return ne(s,function(u,f){l+=f,l+=":",l+=u,l+=`\r
`}),l}function Fr(s,l,u){e:{for(f in u){var f=!1;break e}f=!0}f||(u=Bo(u),typeof s=="string"?u!=null&&encodeURIComponent(String(u)):Q(s,l,u))}function X(s){de.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(X,de);var Wu=/^https?$/i,Ku=["POST","PUT"];n=X.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,l,u,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);l=l?l.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Nr.g(),this.v=this.o?go(this.o):go(Nr),this.g.onreadystatechange=A(this.Ea,this);try{this.B=!0,this.g.open(l,String(s),!0),this.B=!1}catch(b){jo(this,b);return}if(s=u||"",u=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var w in f)u.set(w,f[w]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const b of f.keys())u.set(b,f.get(b));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(u.keys()).find(b=>b.toLowerCase()=="content-type"),w=c.FormData&&s instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Ku,l,void 0))||f||w||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,P]of u)this.g.setRequestHeader(b,P);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Go(this),this.u=!0,this.g.send(s),this.u=!1}catch(b){jo(this,b)}};function jo(s,l){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=l,s.m=5,qo(s),di(s)}function qo(s){s.A||(s.A=!0,we(s,"complete"),we(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,we(this,"complete"),we(this,"abort"),di(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),di(this,!0)),X.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ho(this):this.bb())},n.bb=function(){Ho(this)};function Ho(s){if(s.h&&typeof a!="undefined"&&(!s.v[1]||je(s)!=4||s.Z()!=2)){if(s.u&&je(s)==4)ho(s.Ea,0,s);else if(we(s,"readystatechange"),je(s)==4){s.h=!1;try{const P=s.Z();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var u;if(!(u=l)){var f;if(f=P===0){var w=String(s.D).match(Vo)[1]||null;!w&&c.self&&c.self.location&&(w=c.self.location.protocol.slice(0,-1)),f=!Wu.test(w?w.toLowerCase():"")}u=f}if(u)we(s,"complete"),we(s,"success");else{s.m=6;try{var b=2<je(s)?s.g.statusText:""}catch{b=""}s.l=b+" ["+s.Z()+"]",qo(s)}}finally{di(s)}}}}function di(s,l){if(s.g){Go(s);const u=s.g,f=s.v[0]?()=>{}:null;s.g=null,s.v=null,l||we(s,"ready");try{u.onreadystatechange=f}catch{}}}function Go(s){s.I&&(c.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function je(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<je(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var l=this.g.responseText;return s&&l.indexOf(s)==0&&(l=l.substring(s.length)),Ru(l)}};function zo(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Qu(s){const l={};s=(s.g&&2<=je(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<s.length;f++){if(G(s[f]))continue;var u=v(s[f]);const w=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const b=l[w]||[];l[w]=b,b.push(u)}E(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function En(s,l,u){return u&&u.internalChannelParams&&u.internalChannelParams[s]||l}function Wo(s){this.Aa=0,this.i=[],this.j=new fn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=En("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=En("baseRetryDelayMs",5e3,s),this.cb=En("retryDelaySeedMs",1e4,s),this.Wa=En("forwardChannelMaxRetries",2,s),this.wa=En("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new Po(s&&s.concurrentRequestLimit),this.Da=new Gu,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Wo.prototype,n.la=8,n.G=1,n.connect=function(s,l,u,f){Ie(0),this.W=s,this.H=l||{},u&&f!==void 0&&(this.H.OSID=u,this.H.OAID=f),this.F=this.X,this.I=na(this,null,this.W),pi(this)};function $r(s){if(Ko(s),s.G==3){var l=s.U++,u=Be(s.I);if(Q(u,"SID",s.K),Q(u,"RID",l),Q(u,"TYPE","terminate"),wn(s,u),l=new Ye(s,s.j,l),l.L=2,l.v=ci(Be(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=l.v,u=!0),u||(l.g=ia(l.j,null),l.g.ea(l.v)),l.F=Date.now(),oi(l)}ta(s)}function fi(s){s.g&&(jr(s),s.g.cancel(),s.g=null)}function Ko(s){fi(s),s.u&&(c.clearTimeout(s.u),s.u=null),mi(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&c.clearTimeout(s.s),s.s=null)}function pi(s){if(!Co(s.h)&&!s.s){s.s=!0;var l=s.Ga;on||oo(),an||(on(),an=!0),Er.add(l,s),s.B=0}}function Ju(s,l){return ko(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=l.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=dn(A(s.Ga,s,l),ea(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const w=new Ye(this,this.j,s);let b=this.o;if(this.S&&(b?(b=m(b),y(b,this.S)):b=this.S),this.m!==null||this.O||(w.H=b,b=null),this.P)e:{for(var l=0,u=0;u<this.i.length;u++){t:{var f=this.i[u];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=u;break e}if(l===4096||u===this.i.length-1){l=u+1;break e}}l=1e3}else l=1e3;l=Jo(this,w,l),u=Be(this.I),Q(u,"RID",s),Q(u,"CVER",22),this.D&&Q(u,"X-HTTP-Session-Id",this.D),wn(this,u),b&&(this.O?l="headers="+encodeURIComponent(String(Bo(b)))+"&"+l:this.m&&Fr(u,this.m,b)),Ur(this.h,w),this.Ua&&Q(u,"TYPE","init"),this.P?(Q(u,"$req",l),Q(u,"SID","null"),w.T=!0,Vr(w,u,null)):Vr(w,u,l),this.G=2}}else this.G==3&&(s?Qo(this,s):this.i.length==0||Co(this.h)||Qo(this))};function Qo(s,l){var u;l?u=l.l:u=s.U++;const f=Be(s.I);Q(f,"SID",s.K),Q(f,"RID",u),Q(f,"AID",s.T),wn(s,f),s.m&&s.o&&Fr(f,s.m,s.o),u=new Ye(s,s.j,u,s.B+1),s.m===null&&(u.H=s.o),l&&(s.i=l.D.concat(s.i)),l=Jo(s,u,1e3),u.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Ur(s.h,u),Vr(u,f,l)}function wn(s,l){s.H&&ne(s.H,function(u,f){Q(l,f,u)}),s.l&&Oo({},function(u,f){Q(l,f,u)})}function Jo(s,l,u){u=Math.min(s.i.length,u);var f=s.l?A(s.l.Na,s.l,s):null;e:{var w=s.i;let b=-1;for(;;){const P=["count="+u];b==-1?0<u?(b=w[0].g,P.push("ofs="+b)):b=0:P.push("ofs="+b);let q=!0;for(let oe=0;oe<u;oe++){let j=w[oe].g;const fe=w[oe].map;if(j-=b,0>j)b=Math.max(0,w[oe].g-100),q=!1;else try{zu(fe,P,"req"+j+"_")}catch{f&&f(fe)}}if(q){f=P.join("&");break e}}}return s=s.i.splice(0,u),l.D=s,f}function Xo(s){if(!s.g&&!s.u){s.Y=1;var l=s.Fa;on||oo(),an||(on(),an=!0),Er.add(l,s),s.v=0}}function Br(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=dn(A(s.Fa,s),ea(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,Yo(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=dn(A(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ie(10),fi(this),Yo(this))};function jr(s){s.A!=null&&(c.clearTimeout(s.A),s.A=null)}function Yo(s){s.g=new Ye(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var l=Be(s.qa);Q(l,"RID","rpc"),Q(l,"SID",s.K),Q(l,"AID",s.T),Q(l,"CI",s.F?"0":"1"),!s.F&&s.ja&&Q(l,"TO",s.ja),Q(l,"TYPE","xmlhttp"),wn(s,l),s.m&&s.o&&Fr(l,s.m,s.o),s.L&&(s.g.I=s.L);var u=s.g;s=s.ia,u.L=1,u.v=ci(Be(l)),u.m=null,u.P=!0,bo(u,s)}n.Za=function(){this.C!=null&&(this.C=null,fi(this),Br(this),Ie(19))};function mi(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function Zo(s,l){var u=null;if(s.g==l){mi(s),jr(s),s.g=null;var f=2}else if(xr(s.h,l))u=l.D,Do(s.h,l),f=1;else return;if(s.G!=0){if(l.o)if(f==1){u=l.m?l.m.length:0,l=Date.now()-l.F;var w=s.B;f=ii(),we(f,new wo(f,u)),pi(s)}else Xo(s);else if(w=l.s,w==3||w==0&&0<l.X||!(f==1&&Ju(s,l)||f==2&&Br(s)))switch(u&&0<u.length&&(l=s.h,l.i=l.i.concat(u)),w){case 1:vt(s,5);break;case 4:vt(s,10);break;case 3:vt(s,6);break;default:vt(s,2)}}}function ea(s,l){let u=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(u*=2),u*l}function vt(s,l){if(s.j.info("Error code "+l),l==2){var u=A(s.fb,s),f=s.Xa;const w=!f;f=new yt(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||ai(f,"https"),ci(f),w?qu(f.toString(),u):Hu(f.toString(),u)}else Ie(2);s.G=0,s.l&&s.l.sa(l),ta(s),Ko(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),Ie(2)):(this.j.info("Failed to ping google.com"),Ie(1))};function ta(s){if(s.G=0,s.ka=[],s.l){const l=No(s.h);(l.length!=0||s.i.length!=0)&&(N(s.ka,l),N(s.ka,s.i),s.h.i.length=0,M(s.i),s.i.length=0),s.l.ra()}}function na(s,l,u){var f=u instanceof yt?Be(u):new yt(u);if(f.g!="")l&&(f.g=l+"."+f.g),li(f,f.s);else{var w=c.location;f=w.protocol,l=l?l+"."+w.hostname:w.hostname,w=+w.port;var b=new yt(null);f&&ai(b,f),l&&(b.g=l),w&&li(b,w),u&&(b.l=u),f=b}return u=s.D,l=s.ya,u&&l&&Q(f,u,l),Q(f,"VER",s.la),wn(s,f),f}function ia(s,l,u){if(l&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=s.Ca&&!s.pa?new X(new ui({eb:u})):new X(s.pa),l.Ha(s.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ra(){}n=ra.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function gi(){}gi.prototype.g=function(s,l){return new Ae(s,l)};function Ae(s,l){de.call(this),this.g=new Wo(l),this.l=s,this.h=l&&l.messageUrlParams||null,s=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(s?s["X-WebChannel-Content-Type"]=l.messageContentType:s={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(s?s["X-WebChannel-Client-Profile"]=l.va:s={"X-WebChannel-Client-Profile":l.va}),this.g.S=s,(s=l&&l.Sb)&&!G(s)&&(this.g.m=s),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!G(l)&&(this.g.D=l,s=this.h,s!==null&&l in s&&(s=this.h,l in s&&delete s[l])),this.j=new Nt(this)}D(Ae,de),Ae.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ae.prototype.close=function(){$r(this.g)},Ae.prototype.o=function(s){var l=this.g;if(typeof s=="string"){var u={};u.__data__=s,s=u}else this.u&&(u={},u.__data__=Pr(s),s=u);l.i.push(new Ou(l.Ya++,s)),l.G==3&&pi(l)},Ae.prototype.N=function(){this.g.l=null,delete this.j,$r(this.g),delete this.g,Ae.aa.N.call(this)};function sa(s){kr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var l=s.__sm__;if(l){e:{for(const u in l){s=u;break e}s=void 0}(this.i=s)&&(s=this.i,l=l!==null&&s in l?l[s]:void 0),this.data=l}else this.data=s}D(sa,kr);function oa(){Dr.call(this),this.status=1}D(oa,Dr);function Nt(s){this.g=s}D(Nt,ra),Nt.prototype.ua=function(){we(this.g,"a")},Nt.prototype.ta=function(s){we(this.g,new sa(s))},Nt.prototype.sa=function(s){we(this.g,new oa)},Nt.prototype.ra=function(){we(this.g,"b")},gi.prototype.createWebChannel=gi.prototype.g,Ae.prototype.send=Ae.prototype.o,Ae.prototype.open=Ae.prototype.m,Ae.prototype.close=Ae.prototype.close,cc=function(){return new gi},lc=function(){return ii()},ac=gt,cs={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ri.NO_ERROR=0,ri.TIMEOUT=8,ri.HTTP_ERROR=6,Di=ri,Io.COMPLETE="complete",oc=Io,_o.EventType=un,un.OPEN="a",un.CLOSE="b",un.ERROR="c",un.MESSAGE="d",de.prototype.listen=de.prototype.K,Rn=_o,X.prototype.listenOnce=X.prototype.L,X.prototype.getLastError=X.prototype.Ka,X.prototype.getLastErrorCode=X.prototype.Ba,X.prototype.getStatus=X.prototype.Z,X.prototype.getResponseJson=X.prototype.Oa,X.prototype.getResponseText=X.prototype.oa,X.prototype.send=X.prototype.ea,X.prototype.setWithCredentials=X.prototype.Ha,sc=X}).apply(typeof vi!="undefined"?vi:typeof self!="undefined"?self:typeof window!="undefined"?window:{});const Ua="@firebase/firestore";/**
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
 */class ge{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ge.UNAUTHENTICATED=new ge(null),ge.GOOGLE_CREDENTIALS=new ge("google-credentials-uid"),ge.FIRST_PARTY=new ge("first-party-uid"),ge.MOCK_USER=new ge("mock-user");/**
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
 */let tn="10.14.0";/**
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
 */const Rt=new Is("@firebase/firestore");function In(){return Rt.logLevel}function O(n,...e){if(Rt.logLevel<=F.DEBUG){const t=e.map(Vs);Rt.debug(`Firestore (${tn}): ${n}`,...t)}}function St(n,...e){if(Rt.logLevel<=F.ERROR){const t=e.map(Vs);Rt.error(`Firestore (${tn}): ${n}`,...t)}}function Gi(n,...e){if(Rt.logLevel<=F.WARN){const t=e.map(Vs);Rt.warn(`Firestore (${tn}): ${n}`,...t)}}function Vs(n){if(typeof n=="string")return n;try{/**
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
 */function $(n="Unexpected state"){const e=`FIRESTORE (${tn}) INTERNAL ASSERTION FAILED: `+n;throw St(e),new Error(e)}function Z(n,e){n||$()}function z(n,e){return n}/**
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
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends Qe{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class It{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class uc{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Hp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ge.UNAUTHENTICATED))}shutdown(){}}class Gp{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class zp{constructor(e){this.t=e,this.currentUser=ge.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Z(this.o===void 0);let i=this.i;const r=h=>this.i!==i?(i=this.i,t(h)):Promise.resolve();let o=new It;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new It,e.enqueueRetryable(()=>r(this.currentUser))};const a=()=>{const h=o;e.enqueueRetryable(async()=>{await h.promise,await r(this.currentUser)})},c=h=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new It)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(Z(typeof i.accessToken=="string"),new uc(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Z(e===null||typeof e=="string"),new ge(e)}}class Wp{constructor(e,t,i){this.l=e,this.h=t,this.P=i,this.type="FirstParty",this.user=ge.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Kp{constructor(e,t,i){this.l=e,this.h=t,this.P=i}getToken(){return Promise.resolve(new Wp(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ge.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Qp{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Jp{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Z(this.o===void 0);const i=o=>{o.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>i(o))};const r=o=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>r(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?r(o):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Z(typeof t.token=="string"),this.R=t.token,new Qp(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Xp(n){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
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
 */class hc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let i="";for(;i.length<20;){const r=Xp(40);for(let o=0;o<r.length;++o)i.length<20&&r[o]<t&&(i+=e.charAt(r[o]%e.length))}return i}}function H(n,e){return n<e?-1:n>e?1:0}function zt(n,e,t){return n.length===e.length&&n.every((i,r)=>t(i,e[r]))}/**
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
 */class se{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return se.fromMillis(Date.now())}static fromDate(e){return se.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor(1e6*(e-1e3*t));return new se(t,i)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?H(this.nanoseconds,e.nanoseconds):H(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class J{constructor(e){this.timestamp=e}static fromTimestamp(e){return new J(e)}static min(){return new J(new se(0,0))}static max(){return new J(new se(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Ln{constructor(e,t,i){t===void 0?t=0:t>e.length&&$(),i===void 0?i=e.length-t:i>e.length-t&&$(),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return Ln.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ln?e.forEach(i=>{t.push(i)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let r=0;r<i;r++){const o=e.get(r),a=t.get(r);if(o<a)return-1;if(o>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Y extends Ln{construct(e,t,i){return new Y(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new V(S.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter(r=>r.length>0))}return new Y(t)}static emptyPath(){return new Y([])}}const Yp=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ce extends Ln{construct(e,t,i){return new ce(e,t,i)}static isValidIdentifier(e){return Yp.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ce.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ce(["__name__"])}static fromServerFormat(e){const t=[];let i="",r=0;const o=()=>{if(i.length===0)throw new V(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let a=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new V(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[r+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new V(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=h,r+=2}else c==="`"?(a=!a,r++):c!=="."||a?(i+=c,r++):(o(),r++)}if(o(),a)throw new V(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ce(t)}static emptyPath(){return new ce([])}}/**
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
 */class U{constructor(e){this.path=e}static fromPath(e){return new U(Y.fromString(e))}static fromName(e){return new U(Y.fromString(e).popFirst(5))}static empty(){return new U(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Y.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new U(new Y(e.slice()))}}function Zp(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,r=J.fromTimestamp(i===1e9?new se(t+1,0):new se(t,i));return new ht(r,U.empty(),e)}function em(n){return new ht(n.readTime,n.key,-1)}class ht{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new ht(J.min(),U.empty(),-1)}static max(){return new ht(J.max(),U.empty(),-1)}}function tm(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=U.comparator(n.documentKey,e.documentKey),t!==0?t:H(n.largestBatchId,e.largestBatchId))}/**
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
 */const nm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class im{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function dc(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==nm)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class R{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&$(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new R((i,r)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(i,r)},this.catchCallback=o=>{this.wrapFailure(t,o).next(i,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof R?t:R.resolve(t)}catch(t){return R.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):R.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):R.reject(t)}static resolve(e){return new R((t,i)=>{t(e)})}static reject(e){return new R((t,i)=>{i(e)})}static waitFor(e){return new R((t,i)=>{let r=0,o=0,a=!1;e.forEach(c=>{++r,c.next(()=>{++o,a&&o===r&&t()},h=>i(h))}),a=!0,o===r&&t()})}static or(e){let t=R.resolve(!1);for(const i of e)t=t.next(r=>r?R.resolve(r):i());return t}static forEach(e,t){const i=[];return e.forEach((r,o)=>{i.push(t.call(this,r,o))}),this.waitFor(i)}static mapArray(e,t){return new R((i,r)=>{const o=e.length,a=new Array(o);let c=0;for(let h=0;h<o;h++){const d=h;t(e[d]).next(p=>{a[d]=p,++c,c===o&&i(a)},p=>r(p))}})}static doWhile(e,t){return new R((i,r)=>{const o=()=>{e()===!0?t().next(()=>{o()},r):i()};o()})}}function rm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function or(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class fc{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ie(i),this.se=i=>t.writeSequenceNumber(i))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}fc.oe=-1;function Ls(n){return n==null}function zi(n){return n===0&&1/n==-1/0}function sm(n){return typeof n=="number"&&Number.isInteger(n)&&!zi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */function Fa(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function nn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function pc(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Te{constructor(e,t){this.comparator=e,this.root=t||ae.EMPTY}insert(e,t){return new Te(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ae.BLACK,null,null))}remove(e){return new Te(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ae.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const r=this.comparator(e,i.key);if(r===0)return t+i.left.size;r<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,i)=>(e(t,i),!1))}toString(){const e=[];return this.inorderTraversal((t,i)=>(e.push(`${t}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ei(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ei(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ei(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ei(this.root,e,this.comparator,!0)}}class Ei{constructor(e,t,i,r){this.isReverse=r,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?i(e.key,t):1,t&&r&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ae{constructor(e,t,i,r,o){this.key=e,this.value=t,this.color=i!=null?i:ae.RED,this.left=r!=null?r:ae.EMPTY,this.right=o!=null?o:ae.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,r,o){return new ae(e!=null?e:this.key,t!=null?t:this.value,i!=null?i:this.color,r!=null?r:this.left,o!=null?o:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let r=this;const o=i(e,r.key);return r=o<0?r.copy(null,null,null,r.left.insert(e,t,i),null):o===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,i)),r.fixUp()}removeMin(){if(this.left.isEmpty())return ae.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return ae.EMPTY;i=r.right.min(),r=r.copy(i.key,i.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ae.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ae.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw $();const e=this.left.check();if(e!==this.right.check())throw $();return e+(this.isRed()?0:1)}}ae.EMPTY=null,ae.RED=!0,ae.BLACK=!1;ae.EMPTY=new class{constructor(){this.size=0}get key(){throw $()}get value(){throw $()}get color(){throw $()}get left(){throw $()}get right(){throw $()}copy(e,t,i,r,o){return this}insert(e,t,i){return new ae(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ye{constructor(e){this.comparator=e,this.data=new Te(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,i)=>(e(t),!1))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const r=i.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new $a(this.data.getIterator())}getIteratorFrom(e){return new $a(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(i=>{t=t.add(i)}),t}isEqual(e){if(!(e instanceof ye)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,o=i.getNext().key;if(this.comparator(r,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ye(this.comparator);return t.data=e,t}}class $a{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Se{constructor(e){this.fields=e,e.sort(ce.comparator)}static empty(){return new Se([])}unionWith(e){let t=new ye(ce.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new Se(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return zt(this.fields,e.fields,(t,i)=>t.isEqual(i))}}/**
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
 */class om extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ue{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(o){throw typeof DOMException!="undefined"&&o instanceof DOMException?new om("Invalid base64 string: "+o):o}}(e);return new Ue(t)}static fromUint8Array(e){const t=function(r){let o="";for(let a=0;a<r.length;++a)o+=String.fromCharCode(r[a]);return o}(e);return new Ue(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const i=new Uint8Array(t.length);for(let r=0;r<t.length;r++)i[r]=t.charCodeAt(r);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return H(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ue.EMPTY_BYTE_STRING=new Ue("");const am=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Pt(n){if(Z(!!n),typeof n=="string"){let e=0;const t=am.exec(n);if(Z(!!t),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:le(n.seconds),nanos:le(n.nanos)}}function le(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Mn(n){return typeof n=="string"?Ue.fromBase64String(n):Ue.fromUint8Array(n)}/**
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
 */function Ms(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function mc(n){const e=n.mapValue.fields.__previous_value__;return Ms(e)?mc(e):e}function Wi(n){const e=Pt(n.mapValue.fields.__local_write_time__.timestampValue);return new se(e.seconds,e.nanos)}/**
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
 */class lm{constructor(e,t,i,r,o,a,c,h,d){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=r,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=d}}class Ki{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Ki("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ki&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const wi={mapValue:{}};function Wt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ms(n)?4:um(n)?9007199254740991:cm(n)?10:11:$()}function Fe(n,e){if(n===e)return!0;const t=Wt(n);if(t!==Wt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Wi(n).isEqual(Wi(e));case 3:return function(r,o){if(typeof r.timestampValue=="string"&&typeof o.timestampValue=="string"&&r.timestampValue.length===o.timestampValue.length)return r.timestampValue===o.timestampValue;const a=Pt(r.timestampValue),c=Pt(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,o){return Mn(r.bytesValue).isEqual(Mn(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,o){return le(r.geoPointValue.latitude)===le(o.geoPointValue.latitude)&&le(r.geoPointValue.longitude)===le(o.geoPointValue.longitude)}(n,e);case 2:return function(r,o){if("integerValue"in r&&"integerValue"in o)return le(r.integerValue)===le(o.integerValue);if("doubleValue"in r&&"doubleValue"in o){const a=le(r.doubleValue),c=le(o.doubleValue);return a===c?zi(a)===zi(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return zt(n.arrayValue.values||[],e.arrayValue.values||[],Fe);case 10:case 11:return function(r,o){const a=r.mapValue.fields||{},c=o.mapValue.fields||{};if(Fa(a)!==Fa(c))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(c[h]===void 0||!Fe(a[h],c[h])))return!1;return!0}(n,e);default:return $()}}function xn(n,e){return(n.values||[]).find(t=>Fe(t,e))!==void 0}function Kt(n,e){if(n===e)return 0;const t=Wt(n),i=Wt(e);if(t!==i)return H(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,e.booleanValue);case 2:return function(o,a){const c=le(o.integerValue||o.doubleValue),h=le(a.integerValue||a.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,e);case 3:return Ba(n.timestampValue,e.timestampValue);case 4:return Ba(Wi(n),Wi(e));case 5:return H(n.stringValue,e.stringValue);case 6:return function(o,a){const c=Mn(o),h=Mn(a);return c.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){const c=o.split("/"),h=a.split("/");for(let d=0;d<c.length&&d<h.length;d++){const p=H(c[d],h[d]);if(p!==0)return p}return H(c.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){const c=H(le(o.latitude),le(a.latitude));return c!==0?c:H(le(o.longitude),le(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return ja(n.arrayValue,e.arrayValue);case 10:return function(o,a){var c,h,d,p;const I=o.fields||{},A=a.fields||{},C=(c=I.value)===null||c===void 0?void 0:c.arrayValue,D=(h=A.value)===null||h===void 0?void 0:h.arrayValue,M=H(((d=C==null?void 0:C.values)===null||d===void 0?void 0:d.length)||0,((p=D==null?void 0:D.values)===null||p===void 0?void 0:p.length)||0);return M!==0?M:ja(C,D)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===wi.mapValue&&a===wi.mapValue)return 0;if(o===wi.mapValue)return 1;if(a===wi.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),d=a.fields||{},p=Object.keys(d);h.sort(),p.sort();for(let I=0;I<h.length&&I<p.length;++I){const A=H(h[I],p[I]);if(A!==0)return A;const C=Kt(c[h[I]],d[p[I]]);if(C!==0)return C}return H(h.length,p.length)}(n.mapValue,e.mapValue);default:throw $()}}function Ba(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return H(n,e);const t=Pt(n),i=Pt(e),r=H(t.seconds,i.seconds);return r!==0?r:H(t.nanos,i.nanos)}function ja(n,e){const t=n.values||[],i=e.values||[];for(let r=0;r<t.length&&r<i.length;++r){const o=Kt(t[r],i[r]);if(o)return o}return H(t.length,i.length)}function Qt(n){return us(n)}function us(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const i=Pt(t);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Mn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return U.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let i="[",r=!0;for(const o of t.values||[])r?r=!1:i+=",",i+=us(o);return i+"]"}(n.arrayValue):"mapValue"in n?function(t){const i=Object.keys(t.fields||{}).sort();let r="{",o=!0;for(const a of i)o?o=!1:r+=",",r+=`${a}:${us(t.fields[a])}`;return r+"}"}(n.mapValue):$()}function hs(n){return!!n&&"integerValue"in n}function xs(n){return!!n&&"arrayValue"in n}function Ni(n){return!!n&&"mapValue"in n}function cm(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Pn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return nn(n.mapValue.fields,(t,i)=>e.mapValue.fields[t]=Pn(i)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Pn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function um(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class be{constructor(e){this.value=e}static empty(){return new be({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!Ni(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Pn(t)}setAll(e){let t=ce.emptyPath(),i={},r=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const h=this.getFieldsMap(t);this.applyChanges(h,i,r),i={},r=[],t=c.popLast()}a?i[c.lastSegment()]=Pn(a):r.push(c.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,i,r)}delete(e){const t=this.field(e.popLast());Ni(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Fe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let r=t.mapValue.fields[e.get(i)];Ni(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,i){nn(t,(r,o)=>e[r]=o);for(const r of i)delete e[r]}clone(){return new be(Pn(this.value))}}function gc(n){const e=[];return nn(n.fields,(t,i)=>{const r=new ce([t]);if(Ni(i)){const o=gc(i.mapValue).fields;if(o.length===0)e.push(r);else for(const a of o)e.push(r.child(a))}else e.push(r)}),new Se(e)}/**
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
 */class De{constructor(e,t,i,r,o,a,c){this.key=e,this.documentType=t,this.version=i,this.readTime=r,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(e){return new De(e,0,J.min(),J.min(),J.min(),be.empty(),0)}static newFoundDocument(e,t,i,r){return new De(e,1,t,J.min(),i,r,0)}static newNoDocument(e,t){return new De(e,2,t,J.min(),J.min(),be.empty(),0)}static newUnknownDocument(e,t){return new De(e,3,t,J.min(),J.min(),be.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(J.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=J.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof De&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new De(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Qi{constructor(e,t){this.position=e,this.inclusive=t}}function qa(n,e,t){let i=0;for(let r=0;r<n.position.length;r++){const o=e[r],a=n.position[r];if(o.field.isKeyField()?i=U.comparator(U.fromName(a.referenceValue),t.key):i=Kt(a,t.data.field(o.field)),o.dir==="desc"&&(i*=-1),i!==0)break}return i}function Ha(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Fe(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ji{constructor(e,t="asc"){this.field=e,this.dir=t}}function hm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class _c{}class re extends _c{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new fm(e,t,i):t==="array-contains"?new gm(e,i):t==="in"?new _m(e,i):t==="not-in"?new ym(e,i):t==="array-contains-any"?new vm(e,i):new re(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new pm(e,i):new mm(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Kt(t,this.value)):t!==null&&Wt(this.value)===Wt(t)&&this.matchesComparison(Kt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return $()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class dt extends _c{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new dt(e,t)}matches(e){return yc(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function yc(n){return n.op==="and"}function vc(n){return dm(n)&&yc(n)}function dm(n){for(const e of n.filters)if(e instanceof dt)return!1;return!0}function ds(n){if(n instanceof re)return n.field.canonicalString()+n.op.toString()+Qt(n.value);if(vc(n))return n.filters.map(e=>ds(e)).join(",");{const e=n.filters.map(t=>ds(t)).join(",");return`${n.op}(${e})`}}function Ec(n,e){return n instanceof re?function(i,r){return r instanceof re&&i.op===r.op&&i.field.isEqual(r.field)&&Fe(i.value,r.value)}(n,e):n instanceof dt?function(i,r){return r instanceof dt&&i.op===r.op&&i.filters.length===r.filters.length?i.filters.reduce((o,a,c)=>o&&Ec(a,r.filters[c]),!0):!1}(n,e):void $()}function wc(n){return n instanceof re?function(t){return`${t.field.canonicalString()} ${t.op} ${Qt(t.value)}`}(n):n instanceof dt?function(t){return t.op.toString()+" {"+t.getFilters().map(wc).join(" ,")+"}"}(n):"Filter"}class fm extends re{constructor(e,t,i){super(e,t,i),this.key=U.fromName(i.referenceValue)}matches(e){const t=U.comparator(e.key,this.key);return this.matchesComparison(t)}}class pm extends re{constructor(e,t){super(e,"in",t),this.keys=Ic("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class mm extends re{constructor(e,t){super(e,"not-in",t),this.keys=Ic("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ic(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(i=>U.fromName(i.referenceValue))}class gm extends re{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return xs(t)&&xn(t.arrayValue,this.value)}}class _m extends re{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&xn(this.value.arrayValue,t)}}class ym extends re{constructor(e,t){super(e,"not-in",t)}matches(e){if(xn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!xn(this.value.arrayValue,t)}}class vm extends re{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!xs(t)||!t.arrayValue.values)&&t.arrayValue.values.some(i=>xn(this.value.arrayValue,i))}}/**
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
 */class Em{constructor(e,t=null,i=[],r=[],o=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=r,this.limit=o,this.startAt=a,this.endAt=c,this.ue=null}}function Ga(n,e=null,t=[],i=[],r=null,o=null,a=null){return new Em(n,e,t,i,r,o,a)}function Us(n){const e=z(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(i=>ds(i)).join(","),t+="|ob:",t+=e.orderBy.map(i=>function(o){return o.field.canonicalString()+o.dir}(i)).join(","),Ls(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(i=>Qt(i)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(i=>Qt(i)).join(",")),e.ue=t}return e.ue}function Fs(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!hm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Ec(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ha(n.startAt,e.startAt)&&Ha(n.endAt,e.endAt)}/**
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
 */class ar{constructor(e,t=null,i=[],r=[],o=null,a="F",c=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=r,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function wm(n,e,t,i,r,o,a,c){return new ar(n,e,t,i,r,o,a,c)}function Im(n){return new ar(n)}function za(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Tm(n){return n.collectionGroup!==null}function Cn(n){const e=z(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ye(ce.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new Ji(o,i))}),t.has(ce.keyField().canonicalString())||e.ce.push(new Ji(ce.keyField(),i))}return e.ce}function Tt(n){const e=z(n);return e.le||(e.le=Am(e,Cn(n))),e.le}function Am(n,e){if(n.limitType==="F")return Ga(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(r=>{const o=r.dir==="desc"?"asc":"desc";return new Ji(r.field,o)});const t=n.endAt?new Qi(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new Qi(n.startAt.position,n.startAt.inclusive):null;return Ga(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function fs(n,e,t){return new ar(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Tc(n,e){return Fs(Tt(n),Tt(e))&&n.limitType===e.limitType}function Ac(n){return`${Us(Tt(n))}|lt:${n.limitType}`}function Tn(n){return`Query(target=${function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map(r=>wc(r)).join(", ")}]`),Ls(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map(r=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(r)).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map(r=>Qt(r)).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map(r=>Qt(r)).join(",")),`Target(${i})`}(Tt(n))}; limitType=${n.limitType})`}function $s(n,e){return e.isFoundDocument()&&function(i,r){const o=r.key.path;return i.collectionGroup!==null?r.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(o):U.isDocumentKey(i.path)?i.path.isEqual(o):i.path.isImmediateParentOf(o)}(n,e)&&function(i,r){for(const o of Cn(i))if(!o.field.isKeyField()&&r.data.field(o.field)===null)return!1;return!0}(n,e)&&function(i,r){for(const o of i.filters)if(!o.matches(r))return!1;return!0}(n,e)&&function(i,r){return!(i.startAt&&!function(a,c,h){const d=qa(a,c,h);return a.inclusive?d<=0:d<0}(i.startAt,Cn(i),r)||i.endAt&&!function(a,c,h){const d=qa(a,c,h);return a.inclusive?d>=0:d>0}(i.endAt,Cn(i),r))}(n,e)}function bm(n){return(e,t)=>{let i=!1;for(const r of Cn(n)){const o=Rm(r,e,t);if(o!==0)return o;i=i||r.field.isKeyField()}return 0}}function Rm(n,e,t){const i=n.field.isKeyField()?U.comparator(e.key,t.key):function(o,a,c){const h=a.data.field(o),d=c.data.field(o);return h!==null&&d!==null?Kt(h,d):$()}(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return $()}}/**
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
 */class rn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[r,o]of i)if(this.equalsFn(r,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),r=this.inner[i];if(r===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let o=0;o<r.length;o++)if(this.equalsFn(r[o][0],e))return void(r[o]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return i.length===1?delete this.inner[t]:i.splice(r,1),this.innerSize--,!0;return!1}forEach(e){nn(this.inner,(t,i)=>{for(const[r,o]of i)e(r,o)})}isEmpty(){return pc(this.inner)}size(){return this.innerSize}}/**
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
 */const Sm=new Te(U.comparator);function Xi(){return Sm}const bc=new Te(U.comparator);function Ii(...n){let e=bc;for(const t of n)e=e.insert(t.key,t);return e}function Rc(n){let e=bc;return n.forEach((t,i)=>e=e.insert(t,i.overlayedDocument)),e}function wt(){return kn()}function Sc(){return kn()}function kn(){return new rn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Pm=new Te(U.comparator),Cm=new ye(U.comparator);function _e(...n){let e=Cm;for(const t of n)e=e.add(t);return e}const km=new ye(H);function Dm(){return km}/**
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
 */function Bs(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:zi(e)?"-0":e}}function Pc(n){return{integerValue:""+n}}function Nm(n,e){return sm(e)?Pc(e):Bs(n,e)}/**
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
 */class lr{constructor(){this._=void 0}}function Om(n,e,t){return n instanceof Un?function(r,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return o&&Ms(o)&&(o=mc(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(t,e):n instanceof Fn?kc(n,e):n instanceof $n?Dc(n,e):function(r,o){const a=Cc(r,o),c=Wa(a)+Wa(r.Pe);return hs(a)&&hs(r.Pe)?Pc(c):Bs(r.serializer,c)}(n,e)}function Vm(n,e,t){return n instanceof Fn?kc(n,e):n instanceof $n?Dc(n,e):t}function Cc(n,e){return n instanceof Yi?function(i){return hs(i)||function(o){return!!o&&"doubleValue"in o}(i)}(e)?e:{integerValue:0}:null}class Un extends lr{}class Fn extends lr{constructor(e){super(),this.elements=e}}function kc(n,e){const t=Nc(e);for(const i of n.elements)t.some(r=>Fe(r,i))||t.push(i);return{arrayValue:{values:t}}}class $n extends lr{constructor(e){super(),this.elements=e}}function Dc(n,e){let t=Nc(e);for(const i of n.elements)t=t.filter(r=>!Fe(r,i));return{arrayValue:{values:t}}}class Yi extends lr{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Wa(n){return le(n.integerValue||n.doubleValue)}function Nc(n){return xs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class Lm{constructor(e,t){this.field=e,this.transform=t}}function Mm(n,e){return n.field.isEqual(e.field)&&function(i,r){return i instanceof Fn&&r instanceof Fn||i instanceof $n&&r instanceof $n?zt(i.elements,r.elements,Fe):i instanceof Yi&&r instanceof Yi?Fe(i.Pe,r.Pe):i instanceof Un&&r instanceof Un}(n.transform,e.transform)}class xm{constructor(e,t){this.version=e,this.transformResults=t}}class Ne{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ne}static exists(e){return new Ne(void 0,e)}static updateTime(e){return new Ne(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Oi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class cr{}function Oc(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new js(n.key,Ne.none()):new Wn(n.key,n.data,Ne.none());{const t=n.data,i=be.empty();let r=new ye(ce.comparator);for(let o of e.fields)if(!r.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?i.delete(o):i.set(o,a),r=r.add(o)}return new mt(n.key,i,new Se(r.toArray()),Ne.none())}}function Um(n,e,t){n instanceof Wn?function(r,o,a){const c=r.value.clone(),h=Qa(r.fieldTransforms,o,a.transformResults);c.setAll(h),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof mt?function(r,o,a){if(!Oi(r.precondition,o))return void o.convertToUnknownDocument(a.version);const c=Qa(r.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Vc(r)),h.setAll(c),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,e,t):function(r,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Dn(n,e,t,i){return n instanceof Wn?function(o,a,c,h){if(!Oi(o.precondition,a))return c;const d=o.value.clone(),p=Ja(o.fieldTransforms,h,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,i):n instanceof mt?function(o,a,c,h){if(!Oi(o.precondition,a))return c;const d=Ja(o.fieldTransforms,h,a),p=a.data;return p.setAll(Vc(o)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(I=>I.field))}(n,e,t,i):function(o,a,c){return Oi(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function Fm(n,e){let t=null;for(const i of n.fieldTransforms){const r=e.data.field(i.field),o=Cc(i.transform,r||null);o!=null&&(t===null&&(t=be.empty()),t.set(i.field,o))}return t||null}function Ka(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(i,r){return i===void 0&&r===void 0||!(!i||!r)&&zt(i,r,(o,a)=>Mm(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Wn extends cr{constructor(e,t,i,r=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class mt extends cr{constructor(e,t,i,r,o=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=r,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Vc(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}}),e}function Qa(n,e,t){const i=new Map;Z(n.length===t.length);for(let r=0;r<t.length;r++){const o=n[r],a=o.transform,c=e.data.field(o.field);i.set(o.field,Vm(a,c,t[r]))}return i}function Ja(n,e,t){const i=new Map;for(const r of n){const o=r.transform,a=t.data.field(r.field);i.set(r.field,Om(o,a,e))}return i}class js extends cr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class $m extends cr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Bm{constructor(e,t,i,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=r}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const o=this.mutations[r];o.key.isEqual(e.key)&&Um(o,e,i[r])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=Dn(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=Dn(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=Sc();return this.mutations.forEach(r=>{const o=e.get(r.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=t.has(r.key)?null:c;const h=Oc(a,c);h!==null&&i.set(r.key,h),a.isValidDocument()||a.convertToNoDocument(J.min())}),i}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),_e())}isEqual(e){return this.batchId===e.batchId&&zt(this.mutations,e.mutations,(t,i)=>Ka(t,i))&&zt(this.baseMutations,e.baseMutations,(t,i)=>Ka(t,i))}}class qs{constructor(e,t,i,r){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=r}static from(e,t,i){Z(e.mutations.length===i.length);let r=function(){return Pm}();const o=e.mutations;for(let a=0;a<o.length;a++)r=r.insert(o[a].key,i[a].version);return new qs(e,t,i,r)}}/**
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
 */class jm{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */var ee,B;function qm(n){switch(n){default:return $();case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0}}function Hm(n){if(n===void 0)return St("GRPC error has no .code"),S.UNKNOWN;switch(n){case ee.OK:return S.OK;case ee.CANCELLED:return S.CANCELLED;case ee.UNKNOWN:return S.UNKNOWN;case ee.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case ee.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case ee.INTERNAL:return S.INTERNAL;case ee.UNAVAILABLE:return S.UNAVAILABLE;case ee.UNAUTHENTICATED:return S.UNAUTHENTICATED;case ee.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case ee.NOT_FOUND:return S.NOT_FOUND;case ee.ALREADY_EXISTS:return S.ALREADY_EXISTS;case ee.PERMISSION_DENIED:return S.PERMISSION_DENIED;case ee.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case ee.ABORTED:return S.ABORTED;case ee.OUT_OF_RANGE:return S.OUT_OF_RANGE;case ee.UNIMPLEMENTED:return S.UNIMPLEMENTED;case ee.DATA_LOSS:return S.DATA_LOSS;default:return $()}}(B=ee||(ee={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new rc([4294967295,4294967295],0);class Gm{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ps(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function zm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Wm(n,e){return ps(n,e.toTimestamp())}function qt(n){return Z(!!n),J.fromTimestamp(function(t){const i=Pt(t);return new se(i.seconds,i.nanos)}(n))}function Lc(n,e){return ms(n,e).canonicalString()}function ms(n,e){const t=function(r){return new Y(["projects",r.projectId,"databases",r.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Km(n){const e=Y.fromString(n);return Z(ng(e)),e}function gs(n,e){return Lc(n.databaseId,e.path)}function Qm(n){const e=Km(n);return e.length===4?Y.emptyPath():Xm(e)}function Jm(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Xm(n){return Z(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Xa(n,e,t){return{name:gs(n,e),fields:t.value.mapValue.fields}}function Ym(n,e){let t;if(e instanceof Wn)t={update:Xa(n,e.key,e.value)};else if(e instanceof js)t={delete:gs(n,e.key)};else if(e instanceof mt)t={update:Xa(n,e.key,e.data),updateMask:tg(e.fieldMask)};else{if(!(e instanceof $m))return $();t={verify:gs(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(i=>function(o,a){const c=a.transform;if(c instanceof Un)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Fn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof $n)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Yi)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw $()}(0,i))),e.precondition.isNone||(t.currentDocument=function(r,o){return o.updateTime!==void 0?{updateTime:Wm(r,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:$()}(n,e.precondition)),t}function Zm(n,e){return n&&n.length>0?(Z(e!==void 0),n.map(t=>function(r,o){let a=r.updateTime?qt(r.updateTime):qt(o);return a.isEqual(J.min())&&(a=qt(o)),new xm(a,r.transformResults||[])}(t,e))):[]}function eg(n){let e=Qm(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let r=null;if(i>0){Z(i===1);const p=t.from[0];p.allDescendants?r=p.collectionId:e=e.child(p.collectionId)}let o=[];t.where&&(o=function(I){const A=Mc(I);return A instanceof dt&&vc(A)?A.getFilters():[A]}(t.where));let a=[];t.orderBy&&(a=function(I){return I.map(A=>function(D){return new Ji(xt(D.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(A))}(t.orderBy));let c=null;t.limit&&(c=function(I){let A;return A=typeof I=="object"?I.value:I,Ls(A)?null:A}(t.limit));let h=null;t.startAt&&(h=function(I){const A=!!I.before,C=I.values||[];return new Qi(C,A)}(t.startAt));let d=null;return t.endAt&&(d=function(I){const A=!I.before,C=I.values||[];return new Qi(C,A)}(t.endAt)),wm(e,r,a,o,c,"F",h,d)}function Mc(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=xt(t.unaryFilter.field);return re.create(i,"==",{doubleValue:NaN});case"IS_NULL":const r=xt(t.unaryFilter.field);return re.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=xt(t.unaryFilter.field);return re.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=xt(t.unaryFilter.field);return re.create(a,"!=",{nullValue:"NULL_VALUE"});default:return $()}}(n):n.fieldFilter!==void 0?function(t){return re.create(xt(t.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return $()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return dt.create(t.compositeFilter.filters.map(i=>Mc(i)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return $()}}(t.compositeFilter.op))}(n):$()}function xt(n){return ce.fromServerFormat(n.fieldPath)}function tg(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ng(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class ig{constructor(e){this.ct=e}}function rg(n){const e=eg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?fs(e,e.limit,"L"):e}/**
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
 */class sg{constructor(){this.un=new og}addToCollectionParentIndex(e,t){return this.un.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(ht.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(ht.min())}updateCollectionGroup(e,t,i){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class og{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),r=this.index[t]||new ye(Y.comparator),o=!r.has(i);return this.index[t]=r.add(i),o}has(e){const t=e.lastSegment(),i=e.popLast(),r=this.index[t];return r&&r.has(i)}getEntries(e){return(this.index[e]||new ye(Y.comparator)).toArray()}}/**
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
 */class Jt{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Jt(0)}static kn(){return new Jt(-1)}}/**
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
 */class ag{constructor(){this.changes=new rn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,De.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?R.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class lg{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class cg{constructor(e,t,i,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=r}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(i=r,this.remoteDocumentCache.getEntry(e,t))).next(r=>(i!==null&&Dn(i.mutation,r,Se.empty(),se.now()),r))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.getLocalViewOfDocuments(e,i,_e()).next(()=>i))}getLocalViewOfDocuments(e,t,i=_e()){const r=wt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,i).next(o=>{let a=Ii();return o.forEach((c,h)=>{a=a.insert(c,h.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const i=wt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,_e()))}populateOverlays(e,t,i){const r=[];return i.forEach(o=>{t.has(o)||r.push(o)}),this.documentOverlayCache.getOverlays(e,r).next(o=>{o.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,i,r){let o=Xi();const a=kn(),c=function(){return kn()}();return t.forEach((h,d)=>{const p=i.get(d.key);r.has(d.key)&&(p===void 0||p.mutation instanceof mt)?o=o.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),Dn(p.mutation,d,p.mutation.getFieldMask(),se.now())):a.set(d.key,Se.empty())}),this.recalculateAndSaveOverlays(e,o).next(h=>(h.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var I;return c.set(d,new lg(p,(I=a.get(d))!==null&&I!==void 0?I:null))}),c))}recalculateAndSaveOverlays(e,t){const i=kn();let r=new Te((a,c)=>a-c),o=_e();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(h=>{const d=t.get(h);if(d===null)return;let p=i.get(h)||Se.empty();p=c.applyToLocalView(d,p),i.set(h,p);const I=(r.get(c.batchId)||_e()).add(h);r=r.insert(c.batchId,I)})}).next(()=>{const a=[],c=r.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),d=h.key,p=h.value,I=Sc();p.forEach(A=>{if(!o.has(A)){const C=Oc(t.get(A),i.get(A));C!==null&&I.set(A,C),o=o.add(A)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,I))}return R.waitFor(a)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,t,i,r){return function(a){return U.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Tm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,r):this.getDocumentsMatchingCollectionQuery(e,t,i,r)}getNextDocuments(e,t,i,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,r).next(o=>{const a=r-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,r-o.size):R.resolve(wt());let c=-1,h=o;return a.next(d=>R.forEach(d,(p,I)=>(c<I.largestBatchId&&(c=I.largestBatchId),o.get(p)?R.resolve():this.remoteDocumentCache.getEntry(e,p).next(A=>{h=h.insert(p,A)}))).next(()=>this.populateOverlays(e,d,o)).next(()=>this.computeViews(e,h,d,_e())).next(p=>({batchId:c,changes:Rc(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new U(t)).next(i=>{let r=Ii();return i.isFoundDocument()&&(r=r.insert(i.key,i)),r})}getDocumentsMatchingCollectionGroupQuery(e,t,i,r){const o=t.collectionGroup;let a=Ii();return this.indexManager.getCollectionParents(e,o).next(c=>R.forEach(c,h=>{const d=function(I,A){return new ar(A,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)}(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,d,i,r).next(p=>{p.forEach((I,A)=>{a=a.insert(I,A)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,i,r){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,o,r))).next(a=>{o.forEach((h,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,De.newInvalidDocument(p)))});let c=Ii();return a.forEach((h,d)=>{const p=o.get(h);p!==void 0&&Dn(p.mutation,d,Se.empty(),se.now()),$s(t,d)&&(c=c.insert(h,d))}),c})}}/**
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
 */class ug{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return R.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(r){return{id:r.id,version:r.version,createTime:qt(r.createTime)}}(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(r){return{name:r.name,query:rg(r.bundledQuery),readTime:qt(r.readTime)}}(t)),R.resolve()}}/**
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
 */class hg{constructor(){this.overlays=new Te(U.comparator),this.Ir=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const i=wt();return R.forEach(t,r=>this.getOverlay(e,r).next(o=>{o!==null&&i.set(r,o)})).next(()=>i)}saveOverlays(e,t,i){return i.forEach((r,o)=>{this.ht(e,t,o)}),R.resolve()}removeOverlaysForBatchId(e,t,i){const r=this.Ir.get(i);return r!==void 0&&(r.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(i)),R.resolve()}getOverlaysForCollection(e,t,i){const r=wt(),o=t.length+1,a=new U(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const h=c.getNext().value,d=h.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>i&&r.set(h.getKey(),h)}return R.resolve(r)}getOverlaysForCollectionGroup(e,t,i,r){let o=new Te((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>i){let p=o.get(d.largestBatchId);p===null&&(p=wt(),o=o.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const c=wt(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=r)););return R.resolve(c)}ht(e,t,i){const r=this.overlays.get(i.key);if(r!==null){const a=this.Ir.get(r.largestBatchId).delete(i.key);this.Ir.set(r.largestBatchId,a)}this.overlays=this.overlays.insert(i.key,new jm(t,i));let o=this.Ir.get(t);o===void 0&&(o=_e(),this.Ir.set(t,o)),this.Ir.set(t,o.add(i.key))}}/**
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
 */class dg{constructor(){this.sessionToken=Ue.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
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
 */class Hs{constructor(){this.Tr=new ye(ie.Er),this.dr=new ye(ie.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const i=new ie(e,t);this.Tr=this.Tr.add(i),this.dr=this.dr.add(i)}Rr(e,t){e.forEach(i=>this.addReference(i,t))}removeReference(e,t){this.Vr(new ie(e,t))}mr(e,t){e.forEach(i=>this.removeReference(i,t))}gr(e){const t=new U(new Y([])),i=new ie(t,e),r=new ie(t,e+1),o=[];return this.dr.forEachInRange([i,r],a=>{this.Vr(a),o.push(a.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new U(new Y([])),i=new ie(t,e),r=new ie(t,e+1);let o=_e();return this.dr.forEachInRange([i,r],a=>{o=o.add(a.key)}),o}containsKey(e){const t=new ie(e,0),i=this.Tr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class ie{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return U.comparator(e.key,t.key)||H(e.wr,t.wr)}static Ar(e,t){return H(e.wr,t.wr)||U.comparator(e.key,t.key)}}/**
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
 */class fg{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ye(ie.Er)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,r){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Bm(o,t,i,r);this.mutationQueue.push(a);for(const c of r)this.br=this.br.add(new ie(c.key,o)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return R.resolve(a)}lookupMutationBatch(e,t){return R.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,r=this.vr(i),o=r<0?0:r;return R.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new ie(t,0),r=new ie(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([i,r],a=>{const c=this.Dr(a.wr);o.push(c)}),R.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new ye(H);return t.forEach(r=>{const o=new ie(r,0),a=new ie(r,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,a],c=>{i=i.add(c.wr)})}),R.resolve(this.Cr(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,r=i.length+1;let o=i;U.isDocumentKey(o)||(o=o.child(""));const a=new ie(new U(o),0);let c=new ye(H);return this.br.forEachWhile(h=>{const d=h.key.path;return!!i.isPrefixOf(d)&&(d.length===r&&(c=c.add(h.wr)),!0)},a),R.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(i=>{const r=this.Dr(i);r!==null&&t.push(r)}),t}removeMutationBatch(e,t){Z(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let i=this.br;return R.forEach(t.mutations,r=>{const o=new ie(r.key,t.batchId);return i=i.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.br=i})}On(e){}containsKey(e,t){const i=new ie(t,0),r=this.br.firstAfterOrEqual(i);return R.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class pg{constructor(e){this.Mr=e,this.docs=function(){return new Te(U.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,r=this.docs.get(i),o=r?r.size:0,a=this.Mr(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return R.resolve(i?i.document.mutableCopy():De.newInvalidDocument(t))}getEntries(e,t){let i=Xi();return t.forEach(r=>{const o=this.docs.get(r);i=i.insert(r,o?o.document.mutableCopy():De.newInvalidDocument(r))}),R.resolve(i)}getDocumentsMatchingQuery(e,t,i,r){let o=Xi();const a=t.path,c=new U(a.child("")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:d,value:{document:p}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||tm(em(p),i)<=0||(r.has(p.key)||$s(t,p))&&(o=o.insert(p.key,p.mutableCopy()))}return R.resolve(o)}getAllFromCollectionGroup(e,t,i,r){$()}Or(e,t){return R.forEach(this.docs,i=>t(i))}newChangeBuffer(e){return new mg(this)}getSize(e){return R.resolve(this.size)}}class mg extends ag{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((i,r)=>{r.isValidDocument()?t.push(this.cr.addEntry(e,r)):this.cr.removeEntry(i)}),R.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class gg{constructor(e){this.persistence=e,this.Nr=new rn(t=>Us(t),Fs),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Hs,this.targetCount=0,this.kr=Jt.Bn()}forEachTarget(e,t){return this.Nr.forEach((i,r)=>t(r)),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.Lr&&(this.Lr=t),R.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Jt(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.Kn(t),R.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,i){let r=0;const o=[];return this.Nr.forEach((a,c)=>{c.sequenceNumber<=t&&i.get(c.targetId)===null&&(this.Nr.delete(a),o.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)}),R.waitFor(o).next(()=>r)}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const i=this.Nr.get(t)||null;return R.resolve(i)}addMatchingKeys(e,t,i){return this.Br.Rr(t,i),R.resolve()}removeMatchingKeys(e,t,i){this.Br.mr(t,i);const r=this.persistence.referenceDelegate,o=[];return r&&t.forEach(a=>{o.push(r.markPotentiallyOrphaned(e,a))}),R.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),R.resolve()}getMatchingKeysForTargetId(e,t){const i=this.Br.yr(t);return R.resolve(i)}containsKey(e,t){return R.resolve(this.Br.containsKey(t))}}/**
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
 */class _g{constructor(e,t){this.qr={},this.overlays={},this.Qr=new fc(0),this.Kr=!1,this.Kr=!0,this.$r=new dg,this.referenceDelegate=e(this),this.Ur=new gg(this),this.indexManager=new sg,this.remoteDocumentCache=function(r){return new pg(r)}(i=>this.referenceDelegate.Wr(i)),this.serializer=new ig(t),this.Gr=new ug(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new hg,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this.qr[e.toKey()];return i||(i=new fg(t,this.referenceDelegate),this.qr[e.toKey()]=i),i}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,i){O("MemoryPersistence","Starting transaction:",e);const r=new yg(this.Qr.next());return this.referenceDelegate.zr(),i(r).next(o=>this.referenceDelegate.jr(r).next(()=>o)).toPromise().then(o=>(r.raiseOnCommittedEvent(),o))}Hr(e,t){return R.or(Object.values(this.qr).map(i=>()=>i.containsKey(e,t)))}}class yg extends im{constructor(e){super(),this.currentSequenceNumber=e}}class Gs{constructor(e){this.persistence=e,this.Jr=new Hs,this.Yr=null}static Zr(e){return new Gs(e)}get Xr(){if(this.Yr)return this.Yr;throw $()}addReference(e,t,i){return this.Jr.addReference(i,t),this.Xr.delete(i.toString()),R.resolve()}removeReference(e,t,i){return this.Jr.removeReference(i,t),this.Xr.add(i.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),R.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(r=>this.Xr.add(r.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next(r=>{r.forEach(o=>this.Xr.add(o.toString()))}).next(()=>i.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.Xr,i=>{const r=U.fromPath(i);return this.ei(e,r).next(o=>{o||t.removeEntry(r,J.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(i=>{i?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return R.or([()=>R.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
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
 */class zs{constructor(e,t,i,r){this.targetId=e,this.fromCache=t,this.$i=i,this.Ui=r}static Wi(e,t){let i=_e(),r=_e();for(const o of t.docChanges)switch(o.type){case 0:i=i.add(o.doc.key);break;case 1:r=r.add(o.doc.key)}return new zs(e,t.fromCache,i,r)}}/**
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
 */class vg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Eg{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return fh()?8:rm(ve())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,i,r){const o={result:null};return this.Yi(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Zi(e,t,r,i).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new vg;return this.Xi(e,t,a).next(c=>{if(o.result=c,this.zi)return this.es(e,t,a,c.size)})}).next(()=>o.result)}es(e,t,i,r){return i.documentReadCount<this.ji?(In()<=F.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",Tn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),R.resolve()):(In()<=F.DEBUG&&O("QueryEngine","Query:",Tn(t),"scans",i.documentReadCount,"local documents and returns",r,"documents as results."),i.documentReadCount>this.Hi*r?(In()<=F.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",Tn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Tt(t))):R.resolve())}Yi(e,t){if(za(t))return R.resolve(null);let i=Tt(t);return this.indexManager.getIndexType(e,i).next(r=>r===0?null:(t.limit!==null&&r===1&&(t=fs(t,null,"F"),i=Tt(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next(o=>{const a=_e(...o);return this.Ji.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,i).next(h=>{const d=this.ts(t,c);return this.ns(t,d,a,h.readTime)?this.Yi(e,fs(t,null,"F")):this.rs(e,d,t,h)}))})))}Zi(e,t,i,r){return za(t)||r.isEqual(J.min())?R.resolve(null):this.Ji.getDocuments(e,i).next(o=>{const a=this.ts(t,o);return this.ns(t,a,i,r)?R.resolve(null):(In()<=F.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Tn(t)),this.rs(e,a,t,Zp(r,-1)).next(c=>c))})}ts(e,t){let i=new ye(bm(e));return t.forEach((r,o)=>{$s(e,o)&&(i=i.add(o))}),i}ns(e,t,i,r){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(r)>0)}Xi(e,t,i){return In()<=F.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",Tn(t)),this.Ji.getDocumentsMatchingQuery(e,t,ht.min(),i)}rs(e,t,i,r){return this.Ji.getDocumentsMatchingQuery(e,i,r).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
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
 */class wg{constructor(e,t,i,r){this.persistence=e,this.ss=t,this.serializer=r,this.os=new Te(H),this._s=new rn(o=>Us(o),Fs),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(i)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new cg(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Ig(n,e,t,i){return new wg(n,e,t,i)}async function xc(n,e){const t=z(n);return await t.persistence.runTransaction("Handle user change","readonly",i=>{let r;return t.mutationQueue.getAllMutationBatches(i).next(o=>(r=o,t.ls(e),t.mutationQueue.getAllMutationBatches(i))).next(o=>{const a=[],c=[];let h=_e();for(const d of r){a.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}for(const d of o){c.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}return t.localDocuments.getDocuments(i,h).next(d=>({hs:d,removedBatchIds:a,addedBatchIds:c}))})})}function Tg(n,e){const t=z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const r=e.batch.keys(),o=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,h,d,p){const I=d.batch,A=I.keys();let C=R.resolve();return A.forEach(D=>{C=C.next(()=>p.getEntry(h,D)).next(M=>{const N=d.docVersions.get(D);Z(N!==null),M.version.compareTo(N)<0&&(I.applyToRemoteDocument(M,d),M.isValidDocument()&&(M.setReadTime(d.commitVersion),p.addEntry(M)))})}),C.next(()=>c.mutationQueue.removeMutationBatch(h,I))}(t,i,e,o).next(()=>o.apply(i)).next(()=>t.mutationQueue.performConsistencyCheck(i)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(i,r,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(c){let h=_e();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(h=h.add(c.batch.mutations[d].key));return h}(e))).next(()=>t.localDocuments.getDocuments(i,r))})}function Ag(n){const e=z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function bg(n,e){const t=z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}class Ya{constructor(){this.activeTargetIds=Dm()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Rg{constructor(){this.so=new Ya,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,i){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Ya,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Sg{_o(e){}shutdown(){}}/**
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
 */class Za{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){O("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){O("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Ti=null;function Xr(){return Ti===null?Ti=function(){return 268435456+Math.round(2147483648*Math.random())}():Ti++,"0x"+Ti.toString(16)}/**
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
 */const Pg={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class Cg{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const me="WebChannelConnection";class kg extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const i=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=i+"://"+t.host,this.vo=`projects/${r}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${r}`:`project_id=${r}&database_id=${o}`}get Fo(){return!1}Mo(t,i,r,o,a){const c=Xr(),h=this.xo(t,i.toUriEncodedString());O("RestConnection",`Sending RPC '${t}' ${c}:`,h,r);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,o,a),this.No(t,h,d,r).then(p=>(O("RestConnection",`Received RPC '${t}' ${c}: `,p),p),p=>{throw Gi("RestConnection",`RPC '${t}' ${c} failed with error: `,p,"url: ",h,"request:",r),p})}Lo(t,i,r,o,a,c){return this.Mo(t,i,r,o,a)}Oo(t,i,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+tn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),i&&i.headers.forEach((o,a)=>t[a]=o),r&&r.headers.forEach((o,a)=>t[a]=o)}xo(t,i){const r=Pg[t];return`${this.Do}/v1/${i}:${r}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,i,r){const o=Xr();return new Promise((a,c)=>{const h=new sc;h.setWithCredentials(!0),h.listenOnce(oc.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Di.NO_ERROR:const p=h.getResponseJson();O(me,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),a(p);break;case Di.TIMEOUT:O(me,`RPC '${e}' ${o} timed out`),c(new V(S.DEADLINE_EXCEEDED,"Request time out"));break;case Di.HTTP_ERROR:const I=h.getStatus();if(O(me,`RPC '${e}' ${o} failed with status:`,I,"response text:",h.getResponseText()),I>0){let A=h.getResponseJson();Array.isArray(A)&&(A=A[0]);const C=A==null?void 0:A.error;if(C&&C.status&&C.message){const D=function(N){const W=N.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(W)>=0?W:S.UNKNOWN}(C.status);c(new V(D,C.message))}else c(new V(S.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new V(S.UNAVAILABLE,"Connection failed."));break;default:$()}}finally{O(me,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(r);O(me,`RPC '${e}' ${o} sending request:`,r),h.send(t,"POST",d,i,15)})}Bo(e,t,i){const r=Xr(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=cc(),c=lc(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,t,i),h.encodeInitMessageHeaders=!0;const p=o.join("");O(me,`Creating RPC '${e}' stream ${r}: ${p}`,h);const I=a.createWebChannel(p,h);let A=!1,C=!1;const D=new Cg({Io:N=>{C?O(me,`Not sending because RPC '${e}' stream ${r} is closed:`,N):(A||(O(me,`Opening RPC '${e}' stream ${r} transport.`),I.open(),A=!0),O(me,`RPC '${e}' stream ${r} sending:`,N),I.send(N))},To:()=>I.close()}),M=(N,W,G)=>{N.listen(W,K=>{try{G(K)}catch(te){setTimeout(()=>{throw te},0)}})};return M(I,Rn.EventType.OPEN,()=>{C||(O(me,`RPC '${e}' stream ${r} transport opened.`),D.yo())}),M(I,Rn.EventType.CLOSE,()=>{C||(C=!0,O(me,`RPC '${e}' stream ${r} transport closed`),D.So())}),M(I,Rn.EventType.ERROR,N=>{C||(C=!0,Gi(me,`RPC '${e}' stream ${r} transport errored:`,N),D.So(new V(S.UNAVAILABLE,"The operation could not be completed")))}),M(I,Rn.EventType.MESSAGE,N=>{var W;if(!C){const G=N.data[0];Z(!!G);const K=G,te=K.error||((W=K[0])===null||W===void 0?void 0:W.error);if(te){O(me,`RPC '${e}' stream ${r} received error:`,te);const Le=te.status;let ne=function(_){const y=ee[_];if(y!==void 0)return Hm(y)}(Le),E=te.message;ne===void 0&&(ne=S.INTERNAL,E="Unknown error status: "+Le+" with message "+te.message),C=!0,D.So(new V(ne,E)),I.close()}else O(me,`RPC '${e}' stream ${r} received:`,G),D.bo(G)}}),M(c,ac.STAT_EVENT,N=>{N.stat===cs.PROXY?O(me,`RPC '${e}' stream ${r} detected buffering proxy`):N.stat===cs.NOPROXY&&O(me,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{D.wo()},0),D}}function Yr(){return typeof document!="undefined"?document:null}/**
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
 */function ur(n){return new Gm(n,!0)}/**
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
 */class Uc{constructor(e,t,i=1e3,r=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=i,this.qo=r,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),i=Math.max(0,Date.now()-this.Uo),r=Math.max(0,t-i);r>0&&O("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,r,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Dg{constructor(e,t,i,r,o,a,c,h){this.ui=e,this.Ho=i,this.Jo=r,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Uc(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(St(t.toString()),St("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,r])=>{this.Yo===t&&this.P_(i,r)},i=>{e(()=>{const r=new V(S.UNKNOWN,"Fetching auth token failed: "+i.message);return this.I_(r)})})}P_(e,t){const i=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{i(()=>this.listener.Eo())}),this.stream.Ro(()=>{i(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(r=>{i(()=>this.I_(r))}),this.stream.onMessage(r=>{i(()=>++this.e_==1?this.E_(r):this.onNext(r))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return O("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(O("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Ng extends Dg{constructor(e,t,i,r,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,r,a),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Z(!!e.streamToken),this.lastStreamToken=e.streamToken,Z(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Z(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=Zm(e.writeResults,e.commitTime),i=qt(e.commitTime);return this.listener.g_(i,t)}p_(){const e={};e.database=Jm(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(i=>Ym(this.serializer,i))};this.a_(t)}}/**
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
 */class Og extends class{}{constructor(e,t,i,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=r,this.y_=!1}w_(){if(this.y_)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,i,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Mo(e,ms(t,i),r,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(S.UNKNOWN,o.toString())})}Lo(e,t,i,r,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Lo(e,ms(t,i),r,a,c,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(S.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Vg{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(St(t),this.D_=!1):O("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class Lg{constructor(e,t,i,r,o){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(a=>{i.enqueueAndForget(async()=>{Qn(this)&&(O("RemoteStore","Restarting streams for network reachability change."),await async function(h){const d=z(h);d.L_.add(4),await Kn(d),d.q_.set("Unknown"),d.L_.delete(4),await hr(d)}(this))})}),this.q_=new Vg(i,r)}}async function hr(n){if(Qn(n))for(const e of n.B_)await e(!0)}async function Kn(n){for(const e of n.B_)await e(!1)}function Qn(n){return z(n).L_.size===0}async function Fc(n,e,t){if(!or(e))throw e;n.L_.add(1),await Kn(n),n.q_.set("Offline"),t||(t=()=>Ag(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await hr(n)})}function $c(n,e){return e().catch(t=>Fc(n,t,e))}async function dr(n){const e=z(n),t=ft(e);let i=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;Mg(e);)try{const r=await bg(e.localStore,i);if(r===null){e.O_.length===0&&t.o_();break}i=r.batchId,xg(e,r)}catch(r){await Fc(e,r)}Bc(e)&&jc(e)}function Mg(n){return Qn(n)&&n.O_.length<10}function xg(n,e){n.O_.push(e);const t=ft(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Bc(n){return Qn(n)&&!ft(n).n_()&&n.O_.length>0}function jc(n){ft(n).start()}async function Ug(n){ft(n).p_()}async function Fg(n){const e=ft(n);for(const t of n.O_)e.m_(t.mutations)}async function $g(n,e,t){const i=n.O_.shift(),r=qs.from(i,e,t);await $c(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await dr(n)}async function Bg(n,e){e&&ft(n).V_&&await async function(i,r){if(function(a){return qm(a)&&a!==S.ABORTED}(r.code)){const o=i.O_.shift();ft(i).s_(),await $c(i,()=>i.remoteSyncer.rejectFailedWrite(o.batchId,r)),await dr(i)}}(n,e),Bc(n)&&jc(n)}async function el(n,e){const t=z(n);t.asyncQueue.verifyOperationInProgress(),O("RemoteStore","RemoteStore received new credentials");const i=Qn(t);t.L_.add(3),await Kn(t),i&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await hr(t)}async function jg(n,e){const t=z(n);e?(t.L_.delete(2),await hr(t)):e||(t.L_.add(2),await Kn(t),t.q_.set("Unknown"))}function ft(n){return n.U_||(n.U_=function(t,i,r){const o=z(t);return o.w_(),new Ng(i,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,r)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Ug.bind(null,n),mo:Bg.bind(null,n),f_:Fg.bind(null,n),g_:$g.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await dr(n)):(await n.U_.stop(),n.O_.length>0&&(O("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
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
 */class Ws{constructor(e,t,i,r,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=r,this.removalCallback=o,this.deferred=new It,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,r,o){const a=Date.now()+i,c=new Ws(e,t,a,r,o);return c.start(i),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function qc(n,e){if(St("AsyncQueue",`${e}: ${n}`),or(n))return new V(S.UNAVAILABLE,`${e}: ${n}`);throw n}class qg{constructor(){this.queries=tl(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,i){const r=z(t),o=r.queries;r.queries=tl(),o.forEach((a,c)=>{for(const h of c.j_)h.onError(i)})})(this,new V(S.ABORTED,"Firestore shutting down"))}}function tl(){return new rn(n=>Ac(n),Tc)}function Hg(n){n.Y_.forEach(e=>{e.next()})}var nl,il;(il=nl||(nl={})).ea="default",il.Cache="cache";class Gg{constructor(e,t,i,r,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=r,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new rn(c=>Ac(c),Tc),this.Ma=new Map,this.xa=new Set,this.Oa=new Te(U.comparator),this.Na=new Map,this.La=new Hs,this.Ba={},this.ka=new Map,this.qa=Jt.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function zg(n,e,t){const i=Jg(n);try{const r=await function(a,c){const h=z(a),d=se.now(),p=c.reduce((C,D)=>C.add(D.key),_e());let I,A;return h.persistence.runTransaction("Locally write mutations","readwrite",C=>{let D=Xi(),M=_e();return h.cs.getEntries(C,p).next(N=>{D=N,D.forEach((W,G)=>{G.isValidDocument()||(M=M.add(W))})}).next(()=>h.localDocuments.getOverlayedDocuments(C,D)).next(N=>{I=N;const W=[];for(const G of c){const K=Fm(G,I.get(G.key).overlayedDocument);K!=null&&W.push(new mt(G.key,K,gc(K.value.mapValue),Ne.exists(!0)))}return h.mutationQueue.addMutationBatch(C,d,W,c)}).next(N=>{A=N;const W=N.applyToLocalDocumentSet(I,M);return h.documentOverlayCache.saveOverlays(C,N.batchId,W)})}).then(()=>({batchId:A.batchId,changes:Rc(I)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(r.batchId),function(a,c,h){let d=a.Ba[a.currentUser.toKey()];d||(d=new Te(H)),d=d.insert(c,h),a.Ba[a.currentUser.toKey()]=d}(i,r.batchId,t),await fr(i,r.changes),await dr(i.remoteStore)}catch(r){const o=qc(r,"Failed to persist write");t.reject(o)}}function rl(n,e,t){const i=z(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const r=[];i.Fa.forEach((o,a)=>{const c=a.view.Z_(e);c.snapshot&&r.push(c.snapshot)}),function(a,c){const h=z(a);h.onlineState=c;let d=!1;h.queries.forEach((p,I)=>{for(const A of I.j_)A.Z_(c)&&(d=!0)}),d&&Hg(h)}(i.eventManager,e),r.length&&i.Ca.d_(r),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function Wg(n,e){const t=z(n),i=e.batch.batchId;try{const r=await Tg(t.localStore,e);Gc(t,i,null),Hc(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await fr(t,r)}catch(r){await dc(r)}}async function Kg(n,e,t){const i=z(n);try{const r=await function(a,c){const h=z(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return h.mutationQueue.lookupMutationBatch(d,c).next(I=>(Z(I!==null),p=I.keys(),h.mutationQueue.removeMutationBatch(d,I))).next(()=>h.mutationQueue.performConsistencyCheck(d)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>h.localDocuments.getDocuments(d,p))})}(i.localStore,e);Gc(i,e,t),Hc(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await fr(i,r)}catch(r){await dc(r)}}function Hc(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function Gc(n,e,t){const i=z(n);let r=i.Ba[i.currentUser.toKey()];if(r){const o=r.get(e);o&&(t?o.reject(t):o.resolve(),r=r.remove(e)),i.Ba[i.currentUser.toKey()]=r}}async function fr(n,e,t){const i=z(n),r=[],o=[],a=[];i.Fa.isEmpty()||(i.Fa.forEach((c,h)=>{a.push(i.Ka(h,e,t).then(d=>{var p;if((d||t)&&i.isPrimaryClient){const I=d?!d.fromCache:(p=void 0)===null||p===void 0?void 0:p.current;i.sharedClientState.updateQueryState(h.targetId,I?"current":"not-current")}if(d){r.push(d);const I=zs.Wi(h.targetId,d);o.push(I)}}))}),await Promise.all(a),i.Ca.d_(r),await async function(h,d){const p=z(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",I=>R.forEach(d,A=>R.forEach(A.$i,C=>p.persistence.referenceDelegate.addReference(I,A.targetId,C)).next(()=>R.forEach(A.Ui,C=>p.persistence.referenceDelegate.removeReference(I,A.targetId,C)))))}catch(I){if(!or(I))throw I;O("LocalStore","Failed to update sequence numbers: "+I)}for(const I of d){const A=I.targetId;if(!I.fromCache){const C=p.os.get(A),D=C.snapshotVersion,M=C.withLastLimboFreeSnapshotVersion(D);p.os=p.os.insert(A,M)}}}(i.localStore,o))}async function Qg(n,e){const t=z(n);if(!t.currentUser.isEqual(e)){O("SyncEngine","User change. New user:",e.toKey());const i=await xc(t.localStore,e);t.currentUser=e,function(o,a){o.ka.forEach(c=>{c.forEach(h=>{h.reject(new V(S.CANCELLED,a))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await fr(t,i.hs)}}function Jg(n){const e=z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Wg.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Kg.bind(null,e),e}class Zi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ur(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Ig(this.persistence,new Eg,e.initialUser,this.serializer)}Ga(e){return new _g(Gs.Zr,this.serializer)}Wa(e){return new Rg}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Zi.provider={build:()=>new Zi};class _s{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>rl(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=Qg.bind(null,this.syncEngine),await jg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new qg}()}createDatastore(e){const t=ur(e.databaseInfo.databaseId),i=function(o){return new kg(o)}(e.databaseInfo);return function(o,a,c,h){return new Og(o,a,c,h)}(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return function(i,r,o,a,c){return new Lg(i,r,o,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>rl(this.syncEngine,t,0),function(){return Za.D()?new Za:new Sg}())}createSyncEngine(e,t){return function(r,o,a,c,h,d,p){const I=new Gg(r,o,a,c,h,d);return p&&(I.Qa=!0),I}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(r){const o=z(r);O("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await Kn(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}_s.provider={build:()=>new _s};/**
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
 */class Xg{constructor(e,t,i,r,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this.databaseInfo=r,this.user=ge.UNAUTHENTICATED,this.clientId=hc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(i,async a=>{O("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(i,a=>(O("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new It;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=qc(t,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}async function Zr(n,e){n.asyncQueue.verifyOperationInProgress(),O("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener(async r=>{i.isEqual(r)||(await xc(e.localStore,r),i=r)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function sl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Yg(n);O("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(i=>el(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,r)=>el(e.remoteStore,r)),n._onlineComponents=e}async function Yg(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O("FirestoreClient","Using user provided OfflineComponentProvider");try{await Zr(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(r){return r.name==="FirebaseError"?r.code===S.FAILED_PRECONDITION||r.code===S.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(t))throw t;Gi("Error using user provided cache. Falling back to memory cache: "+t),await Zr(n,new Zi)}}else O("FirestoreClient","Using default OfflineComponentProvider"),await Zr(n,new Zi);return n._offlineComponents}async function Zg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O("FirestoreClient","Using user provided OnlineComponentProvider"),await sl(n,n._uninitializedComponentsProvider._online)):(O("FirestoreClient","Using default OnlineComponentProvider"),await sl(n,new _s))),n._onlineComponents}function e_(n){return Zg(n).then(e=>e.syncEngine)}/**
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
 */function zc(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const ol=new Map;/**
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
 */function Wc(n,e,t){if(!t)throw new V(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function t_(n,e,t,i){if(e===!0&&i===!0)throw new V(S.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function al(n){if(!U.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ll(n){if(U.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ks(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":$()}function Xt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ks(n);throw new V(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */class cl{constructor(e){var t,i;if(e.host===void 0){if(e.ssl!==void 0)throw new V(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new V(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}t_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=zc((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,r){return i.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class pr{constructor(e,t,i,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new cl({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new cl(e),e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new Hp;switch(i.type){case"firstParty":return new Kp(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new V(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const i=ol.get(t);i&&(O("ComponentProvider","Removing Datastore"),ol.delete(t),i.terminate())}(this),Promise.resolve()}}function n_(n,e,t,i={}){var r;const o=(n=Xt(n,pr))._getSettings(),a=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&Gi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),i.mockUserToken){let c,h;if(typeof i.mockUserToken=="string")c=i.mockUserToken,h=ge.MOCK_USER;else{c=oh(i.mockUserToken,(r=n._app)===null||r===void 0?void 0:r.options.projectId);const d=i.mockUserToken.sub||i.mockUserToken.user_id;if(!d)throw new V(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new ge(d)}n._authCredentials=new Gp(new uc(c,h))}}/**
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
 */class Qs{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Qs(this.firestore,e,this._query)}}class Oe{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ut(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Oe(this.firestore,e,this._key)}}class ut extends Qs{constructor(e,t,i){super(e,t,Im(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Oe(this.firestore,null,new U(e))}withConverter(e){return new ut(this.firestore,e,this._path)}}function i_(n,e,...t){if(n=ue(n),Wc("collection","path",e),n instanceof pr){const i=Y.fromString(e,...t);return ll(i),new ut(n,null,i)}{if(!(n instanceof Oe||n instanceof ut))throw new V(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(Y.fromString(e,...t));return ll(i),new ut(n.firestore,null,i)}}function Js(n,e,...t){if(n=ue(n),arguments.length===1&&(e=hc.newId()),Wc("doc","path",e),n instanceof pr){const i=Y.fromString(e,...t);return al(i),new Oe(n,null,new U(i))}{if(!(n instanceof Oe||n instanceof ut))throw new V(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(Y.fromString(e,...t));return al(i),new Oe(n.firestore,n instanceof ut?n.converter:null,new U(i))}}/**
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
 */class ul{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Uc(this,"async_queue_retry"),this.Vu=()=>{const i=Yr();i&&O("AsyncQueue","Visibility state changed to "+i.visibilityState),this.t_.jo()},this.mu=e;const t=Yr();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Yr();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new It;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!or(e))throw e;O("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(i=>{this.Eu=i,this.du=!1;const r=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(i);throw St("INTERNAL UNHANDLED ERROR: ",r),i}).then(i=>(this.du=!1,i))));return this.mu=t,t}enqueueAfterDelay(e,t,i){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const r=Ws.createAndSchedule(this,e,t,i,o=>this.yu(o));return this.Tu.push(r),r}fu(){this.Eu&&$()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class mr extends pr{constructor(e,t,i,r){super(e,t,i,r),this.type="firestore",this._queue=new ul,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ul(e),this._firestoreClient=void 0,await e}}}function r_(n,e){const t=typeof n=="object"?n:wl(),i=typeof n=="string"?n:"(default)",r=As(t,"firestore").getImmediate({identifier:i});if(!r._initialized){const o=rh("firestore");o&&n_(r,...o)}return r}function s_(n){if(n._terminated)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||o_(n),n._firestoreClient}function o_(n){var e,t,i;const r=n._freezeSettings(),o=function(c,h,d,p){return new lm(c,h,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,zc(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,r);n._componentsProvider||!((t=r.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((i=r.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:r.localCache._offlineComponentProvider,_online:r.localCache._onlineComponentProvider}),n._firestoreClient=new Xg(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(n._componentsProvider))}/**
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
 */class Bn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Bn(Ue.fromBase64String(e))}catch(t){throw new V(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Bn(Ue.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Xs{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ce(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class gr{constructor(e){this._methodName=e}}/**
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
 */class Kc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return H(this._lat,e._lat)||H(this._long,e._long)}}/**
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
 */class Qc{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,r){if(i.length!==r.length)return!1;for(let o=0;o<i.length;++o)if(i[o]!==r[o])return!1;return!0}(this._values,e._values)}}/**
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
 */const a_=/^__.*__$/;class l_{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new mt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Wn(e,this.data,t,this.fieldTransforms)}}class Jc{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new mt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Xc(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw $()}}class Ys{constructor(e,t,i,r,o,a){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=r,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Ys(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),r=this.Fu({path:i,xu:!1});return r.Ou(e),r}Nu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),r=this.Fu({path:i,xu:!1});return r.vu(),r}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return er(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Xc(this.Cu)&&a_.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class c_{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||ur(e)}Qu(e,t,i,r=!1){return new Ys({Cu:e,methodName:t,qu:i,path:ce.emptyPath(),xu:!1,ku:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Yc(n){const e=n._freezeSettings(),t=ur(n._databaseId);return new c_(n._databaseId,!!e.ignoreUndefinedProperties,t)}function u_(n,e,t,i,r,o={}){const a=n.Qu(o.merge||o.mergeFields?2:0,e,t,r);eo("Data must be an object, but it was:",a,i);const c=Zc(i,a);let h,d;if(o.merge)h=new Se(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const p=[];for(const I of o.mergeFields){const A=ys(e,I,t);if(!a.contains(A))throw new V(S.INVALID_ARGUMENT,`Field '${A}' is specified in your field mask but missing from your input data.`);nu(p,A)||p.push(A)}h=new Se(p),d=a.fieldTransforms.filter(I=>h.covers(I.field))}else h=null,d=a.fieldTransforms;return new l_(new be(c),h,d)}class _r extends gr{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof _r}}class Zs extends gr{_toFieldTransform(e){return new Lm(e.path,new Un)}isEqual(e){return e instanceof Zs}}function h_(n,e,t,i){const r=n.Qu(1,e,t);eo("Data must be an object, but it was:",r,i);const o=[],a=be.empty();nn(i,(h,d)=>{const p=tu(e,h,t);d=ue(d);const I=r.Nu(p);if(d instanceof _r)o.push(p);else{const A=yr(d,I);A!=null&&(o.push(p),a.set(p,A))}});const c=new Se(o);return new Jc(a,c,r.fieldTransforms)}function d_(n,e,t,i,r,o){const a=n.Qu(1,e,t),c=[ys(e,i,t)],h=[r];if(o.length%2!=0)throw new V(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let A=0;A<o.length;A+=2)c.push(ys(e,o[A])),h.push(o[A+1]);const d=[],p=be.empty();for(let A=c.length-1;A>=0;--A)if(!nu(d,c[A])){const C=c[A];let D=h[A];D=ue(D);const M=a.Nu(C);if(D instanceof _r)d.push(C);else{const N=yr(D,M);N!=null&&(d.push(C),p.set(C,N))}}const I=new Se(d);return new Jc(p,I,a.fieldTransforms)}function yr(n,e){if(eu(n=ue(n)))return eo("Unsupported field value:",e,n),Zc(n,e);if(n instanceof gr)return function(i,r){if(!Xc(r.Cu))throw r.Bu(`${i._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Bu(`${i._methodName}() is not currently supported inside arrays`);const o=i._toFieldTransform(r);o&&r.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(i,r){const o=[];let a=0;for(const c of i){let h=yr(c,r.Lu(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,e)}return function(i,r){if((i=ue(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return Nm(r.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const o=se.fromDate(i);return{timestampValue:ps(r.serializer,o)}}if(i instanceof se){const o=new se(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:ps(r.serializer,o)}}if(i instanceof Kc)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof Bn)return{bytesValue:zm(r.serializer,i._byteString)};if(i instanceof Oe){const o=r.databaseId,a=i.firestore._databaseId;if(!a.isEqual(o))throw r.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Lc(i.firestore._databaseId||r.databaseId,i._key.path)}}if(i instanceof Qc)return function(a,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw c.Bu("VectorValues must only contain numeric values.");return Bs(c.serializer,h)})}}}}}}(i,r);throw r.Bu(`Unsupported field value: ${Ks(i)}`)}(n,e)}function Zc(n,e){const t={};return pc(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):nn(n,(i,r)=>{const o=yr(r,e.Mu(i));o!=null&&(t[i]=o)}),{mapValue:{fields:t}}}function eu(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof se||n instanceof Kc||n instanceof Bn||n instanceof Oe||n instanceof gr||n instanceof Qc)}function eo(n,e,t){if(!eu(t)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(t)){const i=Ks(t);throw i==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+i)}}function ys(n,e,t){if((e=ue(e))instanceof Xs)return e._internalPath;if(typeof e=="string")return tu(n,e);throw er("Field path arguments must be of type string or ",n,!1,void 0,t)}const f_=new RegExp("[~\\*/\\[\\]]");function tu(n,e,t){if(e.search(f_)>=0)throw er(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Xs(...e.split("."))._internalPath}catch{throw er(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function er(n,e,t,i,r){const o=i&&!i.isEmpty(),a=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${i}`),a&&(h+=` in document ${r}`),h+=")"),new V(S.INVALID_ARGUMENT,c+n+h)}function nu(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */function p_(n,e,t){let i;return i=n?n.toFirestore(e):e,i}function m_(n,e,t){n=Xt(n,Oe);const i=Xt(n.firestore,mr),r=p_(n.converter,e);return to(i,[u_(Yc(i),"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,Ne.none())])}function g_(n,e,t,...i){n=Xt(n,Oe);const r=Xt(n.firestore,mr),o=Yc(r);let a;return a=typeof(e=ue(e))=="string"||e instanceof Xs?d_(o,"updateDoc",n._key,e,t,i):h_(o,"updateDoc",n._key,e),to(r,[a.toMutation(n._key,Ne.exists(!0))])}function __(n){return to(Xt(n.firestore,mr),[new js(n._key,Ne.none())])}function to(n,e){return function(i,r){const o=new It;return i.asyncQueue.enqueueAndForget(async()=>zg(await e_(i),r,o)),o.promise}(s_(n),e)}function iu(){return new Zs("serverTimestamp")}(function(e,t=!0){(function(r){tn=r})(Yt),Ht(new At("firestore",(i,{instanceIdentifier:r,options:o})=>{const a=i.getProvider("app").getImmediate(),c=new mr(new zp(i.getProvider("auth-internal")),new Jp(i.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new V(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ki(d.options.projectId,p)}(a,r),a);return o=Object.assign({useFetchStreams:t},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),lt(Ua,"4.7.3",e),lt(Ua,"4.7.3","esm2017")})();function y_(){try{const n=typeof window!="undefined"&&window.DigitEarnBridge;if(n&&typeof n.getFirebaseConfig=="function"){const e=String(n.getFirebaseConfig()||"");if(e.length>2)return JSON.parse(e)||{}}}catch{}return typeof window!="undefined"&&window.__DIGITEARN_FB_CONFIG__||{}}const Vt=y_(),Lt={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0},Vi={apiKey:Vt.apiKey||Lt.apiKey||"",authDomain:Vt.authDomain||Lt.authDomain||"",projectId:Vt.projectId||Lt.projectId||"",storageBucket:Vt.storageBucket||Lt.storageBucket||"",messagingSenderId:Vt.messagingSenderId||Lt.messagingSenderId||"",appId:Vt.appId||Lt.appId||""},ru=!!(Vi.apiKey&&Vi.projectId&&Vi.appId),v_=typeof location!="undefined"&&/^https?:$/.test(location.protocol),E_=v_?"":"https://digitearn.vercel.app",su=El(Vi),Jn=jp(su),no=r_(su),Re=n=>"৳"+Number(n||0).toLocaleString("en-BD",{maximumFractionDigits:2}),Pe=n=>{const e=n!=null&&n.toDate?n.toDate():n?new Date(n):new Date(0);return e.getTime()?e.toLocaleString("en-BD",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):"—"},k=n=>String(n!=null?n:"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);async function Ee(n,e={},t="POST"){if(!ru)throw new Error("Firebase configure করা নেই");let i=n;const r=String(n).match(/^\/api\/admin\/([a-z0-9-]+)/);r&&(i="/api/admin/panel?op="+encodeURIComponent(r[1]));const o=async c=>{const h=Jn.currentUser;if(!h)throw new Error("Login required — আবার লগইন করুন");const d=await fetch(E_+i,{method:t,headers:{"Content-Type":"application/json",Authorization:"Bearer "+await h.getIdToken(c)},body:t==="GET"?void 0:JSON.stringify(e)});let p="";try{p=await d.text()}catch{}let I=null;try{I=p?JSON.parse(p):{}}catch{}return{resp:d,data:I||{},isJson:!!I}};let a=await o(!1);if(!a.resp.ok&&(a.resp.status===401||a.data.sessionExpired===!0)&&(a=await o(!0)),!a.resp.ok){const c=a.data||{};if(c.protection||c.error&&typeof c.error=="object"&&String(c.error.code)==="401")throw new Error("Vercel Deployment Protection ব্লক করছে — এই deployment URL থেকে admin API চলে না। Production URL (digitearn.vercel.app) ব্যবহার করুন বা Vercel → Settings → Deployment Protection off করুন।");const h=typeof c.error=="string"?c.error:String(c.error&&(c.error.message||c.error.code)||c.message||"");throw new Error(h||(a.isJson?"":`সার্ভার JSON দেয়নি (HTTP ${a.resp.status})`)||`Operation fail হয়েছে (${a.resp.status}) — আবার চেষ্টা করুন`)}return a.data}async function w_(){try{return await Ee("/api/admin/health",{})}catch(n){const e=String(n&&n.message||n);throw/Unknown admin endpoint|404/i.test(e)?new Error("সার্ভারের build পুরোনো — `?op=health` নেই, মানে নতুন api/ + lib/ এখনো deploy হয়নি। Push করে Vercel-এ Redeploy করুন।"):n}}async function I_(){try{const n=await Ee("/api/admin/verify",{});return{isAdmin:!!n.isAdmin,authenticated:!!n.authenticated,authState:n.authState||"",error:""}}catch(n){return{isAdmin:!1,authenticated:!1,error:String(n&&n.message||"Admin verify fail")}}}async function Je(n,e={}){const t=await Ee("/api/admin/read",{what:n,...e});return Array.isArray(t.items)?t.items:[]}async function ou(n,e={}){const t=await Ee("/api/admin/read",{what:n,...e});return t&&t.item?t.item:null}const Xn=(n,e={})=>Ee("/api/admin/write",{what:n,...e});async function au(n="pending",e=100){return Je("proofs",{status:n,limit:e})}async function T_(n){await Ee("/api/admin/proof-review",{proofId:n,action:"approve"})}async function A_(n,e=""){await Ee("/api/admin/proof-review",{proofId:n,action:"reject",note:e})}async function lu(n="pending",e=100){return Je("deposits",{status:n,limit:e})}async function b_(n){await Ee("/api/admin/deposit-review",{depositId:n,action:"approve"})}async function R_(n,e=""){await Ee("/api/admin/deposit-review",{depositId:n,action:"reject",note:e})}async function io(n=300){return Je("users",{limit:n})}async function vr(n){return await ou("user",{id:n})}async function S_(n,e=20){return Je("user-withdrawals",{uid:n,limit:e})}async function P_(n,e=25){return Je("user-transactions",{uid:n,limit:e})}async function hl(n,e){await Ee("/api/admin/set-active",{uid:n,active:e})}async function C_(){return Je("tasks",{limit:500})}async function k_(n=[]){return await Ee("/api/admin/seed-tasks",{slugs:n})}async function D_(n,e){if(e.url&&!/^https?:\/\/\S+$/i.test(e.url))throw new Error("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)");return Xn("task",{slug:n,data:e})}const cu=["giftCode"];async function N_(){const[n,e]=await Promise.all([ou("settings").catch(()=>null),Ee("/api/admin/secret",{get:!0}).catch(()=>({}))]),t={...n||{}};delete t.id;const i={},r=e&&typeof e.giftCode=="string";for(const o of cu)typeof e[o]=="string"&&(i[o]=e[o]);return{...t,...i,_secretLoaded:r}}async function O_(n="pending",e=100){return Je("withdrawals",{status:n,limit:e})}async function vs(n,e,t,i=""){await Ee("/api/admin/withdrawal-review",{userId:n,id:e,action:t,note:i})}async function V_(n){const e={...n},t={};for(const r of cu)r in e&&(t[r]=e[r],delete e[r]);await Xn("settings",{data:e});const i={...t};for(const r of Object.keys(i))String(i[r]).trim()===""&&!i.__clear&&delete i[r];Object.keys(i).length&&await Ee("/api/admin/secret",i)}async function L_(){await Ee("/api/admin/secret",{giftCode:"",__clear:!0})}async function M_(){return Je("notices",{limit:100})}async function x_({title:n,body:e,type:t="notice",expiresAt:i=null}){const r={title:String(n||"").trim().slice(0,60),body:String(e||"").trim().slice(0,300),type:t==="warning"?"warning":"notice",targetType:"all",enabled:!0,sort:10,createdAt:iu()};return i&&(r.expiresAt=i),Xn("notice-add",r)}async function U_(n,{title:e,body:t,enabled:i,sort:r,type:o,expiresAt:a}){const c={title:String(e||"").trim().slice(0,60),body:String(t||"").trim().slice(0,300),enabled:!!i,sort:Number(r)||10};return o&&(c.type=o==="warning"?"warning":"notice"),a&&(c.expiresAt=a),Xn("notice-update",{id:n,...c})}async function F_(n){return Xn("notice-delete",{id:n})}async function $_(n){return Je("user-target-notices",{uid:n,limit:50})}async function B_(n,{title:e,body:t,type:i="warning",expiresAt:r=null}){const o={title:String(e||"").trim().slice(0,60),body:String(t||"").trim().slice(0,300),type:i==="warning"?"warning":"notice",targetType:"user",targetUserId:n,enabled:!0,sort:10,createdAt:iu(),createdBy:"admin"};r&&(o.expiresAt=r),await m_(Js(i_(no,"users",n,"targetNotices")),o)}async function uu(n,e,{enabled:t}){await g_(Js(no,"users",n,"targetNotices",e),{enabled:!!t})}async function hu(n,e){await __(Js(no,"users",n,"targetNotices",e))}async function j_(){return(await Ee("/api/admin/notice-targeted",{},"GET")).targeted||[]}async function q_(){const[n,e,t]=await Promise.all([io(1e3),au("pending",100),lu("pending",100)]);return{totalUsers:n.length,activeUsers:n.filter(i=>i.isActive).length,pendingProofs:e.length,pendingDeposits:t.length,totalBalance:n.reduce((i,r)=>i+(Number(r.balance)||0),0),recentProofs:e.slice(0,3),recentDeposits:t.slice(0,3)}}const Yn=document.getElementById("app");let ro=null;function x(n,e="success"){const t=document.createElement("div");t.className="adm-toast "+e,t.innerHTML=`<i class="fa-solid ${e==="error"?"fa-circle-xmark":"fa-circle-check"}"></i> ${k(n)}`,Yn.appendChild(t),requestAnimationFrame(()=>t.classList.add("show")),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3200)}ru||(Yn.innerHTML='<div class="loading-center"><p style="max-width:340px;text-align:center">Firebase env variables set নেই।<br>Vercel-এ ৬টা <b>VITE_FIREBASE_*</b> variable দিন।</p></div>');Df(Jn,n=>{if(!n){ro=null,so();return}du(n)});async function du(n){const e=await I_();if(e.error){Yn.innerHTML=`<div class="loading-center" style="display:block;text-align:center;padding:28px">
      <p style="margin-bottom:12px">Admin check করা যায়নি:<br><b style="font-size:13px">${k(e.error)}</b></p>
      <button class="adm-btn gold" id="gateRetry"><i class="fa-solid fa-rotate"></i> আবার চেষ্টা করুন</button>
      <p class="muted" style="margin-top:12px;font-size:12px">লগইন ভাঙেনি — শুধু সার্ভার উত্তর দেয়নি।</p></div>`,document.getElementById("gateRetry").addEventListener("click",()=>du(n));return}if(!e.isAdmin){await Wl(Jn),so("এই email টা admin list-এ নেই — Firestore-এর admins collection-এ এই email-এর document আছে কিনা দেখুন।");return}ro={email:n.email},window.location.hash=window.location.hash||"#/overview",G_(),window.addEventListener("hashchange",fu)}function so(n=""){Yn.innerHTML=`
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-logo"><i class="fa-solid fa-bolt"></i></div>
        <h1>DigitEarn <span>Admin</span></h1>
        <p class="muted">Admin panel-এ লগইন করুন</p>
        ${n?`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${k(n)}</div>`:""}
        <form id="loginForm">
          <input type="email" id="lgEmail" class="adm-input" placeholder="Admin email" required>
          <input type="password" id="lgPass" class="adm-input" placeholder="Password" required>
          <button class="adm-btn gold" type="submit"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
        </form>
      </div>
    </div>`,document.getElementById("loginForm").addEventListener("submit",async e=>{e.preventDefault();const t=e.target.querySelector("button");t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{await Pf(Jn,document.getElementById("lgEmail").value.trim(),document.getElementById("lgPass").value)}catch{t.disabled=!1,t.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> Login',so("Login fail — email/password ঠিক আছে কিনা দেখুন (অথবা এই email-এ Firebase Auth-এ account নেই)।")}})}const H_=[{id:"overview",label:"Overview",icon:"fa-gauge-high"},{id:"proofs",label:"Submissions",icon:"fa-clipboard-list"},{id:"deposits",label:"Deposits",icon:"fa-money-bill-wave"},{id:"withdrawals",label:"Withdrawals",icon:"fa-money-bill-transfer"},{id:"users",label:"Users",icon:"fa-users"},{id:"tasks",label:"Micro Jobs",icon:"fa-briefcase"},{id:"settings",label:"Settings",icon:"fa-gear"},{id:"notices",label:"Notices",icon:"fa-bullhorn"}];function G_(){Yn.innerHTML=`
    <header class="adm-top">
      <div class="adm-logo"><i class="fa-solid fa-bolt"></i> DigitEarn <span>Admin</span></div>
      <div class="adm-top-right">
        <span class="adm-email"><i class="fa-solid fa-user-shield"></i> ${k(ro.email)}</span>
        <button class="adm-btn ghost sm" id="logoutBtn"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
    </header>
    <nav class="adm-nav">${H_.map(n=>`<a href="#/${n.id}" data-nav="${n.id}"><i class="fa-solid ${n.icon}"></i> ${n.label}</a>`).join("")}</nav>
    <main class="adm-main" id="admMain"><div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div></main>`,document.getElementById("logoutBtn").addEventListener("click",()=>Wl(Jn)),fu()}async function fu(){const n=(window.location.hash||"#/overview").replace("#/",""),e=document.getElementById("admMain");if(e){document.querySelectorAll("[data-nav]").forEach(t=>t.classList.toggle("on",t.dataset.nav===n)),e.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';try{n==="proofs"?await Li(e):n==="deposits"?await Mi(e):n==="withdrawals"?await Es(e):n==="users"?await Q_(e):n==="tasks"?await ws(e):n==="settings"?await mu(e):n==="notices"?await Ut(e):await z_(e)}catch(t){const i=String(t&&t.message||t),r=/permission|insufficient/i.test(i);e.innerHTML=`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${k(i)}
      ${r?`<div class="muted" style="font-size:12px;margin-top:8px">
        Panel এখন server (Admin SDK) দিয়ে পড়ে — নিচের ↻ বাটন চাপুন। না চললে দেখুন:
        Firestore-এর <code>admins/&lt;email&gt;</code> doc-id হুবহু আপনার login email
        হতে হবে (বড়/ছোট হাতের তফাতও fail করে), আর Vercel function-এর build
        নতুন কিনা (?op=read থাকতে হবে)।</div>`:""}</div>`}}}async function z_(n){const e=await q_();n.innerHTML=`
    <div class="stat-grid">
      <div class="adm-stat gold"><i class="fa-solid fa-users"></i><b>${e.totalUsers}</b><span>মোট ইউজার</span></div>
      <div class="adm-stat green"><i class="fa-solid fa-circle-check"></i><b>${e.activeUsers}</b><span>অ্যাক্টিভ</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-clipboard-list"></i><b>${e.pendingProofs}</b><span>Task Submissions</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-money-bill-wave"></i><b>${e.pendingDeposits}</b><span>Deposit Review</span></div>
    </div>
    <div class="adm-card"><h4><i class="fa-solid fa-scale-balanced" style="color:#d97706"></i> মোট Outstanding Balance</h4>
      <div class="big-num">${Re(e.totalBalance)}</div>
      <p class="muted">সব ইউজারের ব্যালেন্সের যোগফল (প্রতি ১০০০ ইউজার পর্যন্ত)।</p>
    </div>
    ${e.recentProofs.length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-clipboard-list" style="color:#d97706"></i> সর্বশেষ Pending Submissions</h4>
      ${e.recentProofs.map(t=>`<div class="mini-row"><b>${k(t.taskName||t.taskSlug)}</b> <span class="muted">${Pe(t.createdAt)}</span><span class="badge gold">+${Re(t.reward)}</span></div>`).join("")}
      <a href="#/proofs" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${e.recentDeposits.length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-money-bill-wave" style="color:#d97706"></i> সর্বশেষ Pending Deposits</h4>
      ${e.recentDeposits.map(t=>`<div class="mini-row"><b>${k(t.method)}</b> <span class="muted">${Pe(t.createdAt)}</span><span class="badge gold">${Re(t.amount)}</span></div>`).join("")}
      <a href="#/deposits" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${!e.recentProofs.length&&!e.recentDeposits.length?'<p class="muted center-note">কোনো pending item নেই ✓</p>':""}
    <div class="adm-card">
      <h4><i class="fa-solid fa-stethoscope" style="color:#d97706"></i> সিস্টেম চেক (API auth)</h4>
      <p class="muted" style="font-size:13px;margin-bottom:10px">ইউজার যদি “Login required” দেখায় বা approve/reject fail করে, এখানে চাপলে কারণটা দেখাবে — Vercel-এর Firebase env, service account-এর project, আর Firestore পড়া যাচ্ছে কিনা।</p>
      <button class="adm-btn ghost sm" id="healthBtn"><i class="fa-solid fa-heart-pulse"></i> Check করুন</button>
      <div id="healthOut" style="margin-top:10px"></div>
    </div>`,document.getElementById("healthBtn").addEventListener("click",W_)}async function W_(){const n=document.getElementById("healthOut");n&&(n.innerHTML='<span class="muted"><i class="fa-solid fa-spinner fa-spin"></i> চেক হচ্ছে…</span>');let e;try{e=await w_()}catch(o){n&&(n.innerHTML=`<div class="form-err">${k(String(o.message||o))}</div>`);return}const t=(o,a,c)=>`<div class="mini-row"><span class="badge ${o?"green":"red"}">${o?"✓":"✗"}</span> ${k(a)}${c?` <span class="muted">${k(c)}</span>`:""}</div>`,i=[t(!!e.ok,"সামগ্রিক",e.ok?"server ঠিক আছে — ইউজারের “Login required” হলে সেটা deployment-এর dosh নয়":"server-side সেটআপে সমস্যা"),t(!!e.firestore&&!!e.firestore.reachable,"Firestore পড়া",e.firestore&&e.firestore.settingsDoc?"settings/site পাওয়া গেছে":"পড়া যাচ্ছে না"),t(!e.sdk||e.sdk.cjsRequireSafe!==!1,"Admin SDK (firebase-admin)",`v${e.sdk&&e.sdk.version||"?"}${e.sdk&&e.sdk.jose?" · jose@"+e.sdk.jose:""}`+(e.sdk&&e.sdk.cjsRequireSafe===!1?" — CJS require() ভাঙে, functions 500 (Node 22.x বা ^13.10.0 pin লাগবে)":"")),t(!!e.privateKeyShape,"Private key ফরম্যাট",""),t(!!e.projectMatch,"Project match",`site: ${e.tokenProject||e.serverProject||"?"} / server: ${e.serverProject||"?"} / SA: ${e.serviceAccountProject||"?"}`),t(!!e.authed,"আপনার token verify",e.authed?"OK":`ব্যর্থ (${k(e.authState||"")} ${k(e.authCode||"")})`)].join(""),r=(e.notes||[]).map(o=>`<p class="muted" style="font-size:12px;margin-top:6px"><i class="fa-solid fa-circle-info"></i> ${k(o)}</p>`).join("");n&&(n.innerHTML=i+r)}let Ai="pending";function K_(n,e){const t=[];if(Array.isArray(e)&&e.length)for(const o of e){if(!o||typeof o!="object")continue;const a=String(o.label||"").slice(0,50)||"Field",c=String(o.type||"text"),h=o.value===void 0||o.value===null||o.value===""?"":String(o.value);t.push({label:a,type:c,value:h,required:!!o.required,secret:o.secret===!0})}else if(n&&typeof n=="object"&&!Array.isArray(n))for(const[o,a]of Object.entries(n))t.push({label:o,type:"text",value:String(a!=null?a:""),required:!1});if(!t.length)return"";const i=t.map(o=>{const a=/(password|passwd|pwd|passcode|otp|onetimecode|2fa|tfa|twofactor|authenticat|recovery|backupcode|secret|apikey|accesstoken|refreshtoken|privatetoken|privatekey|token|cookie|session|bearer)/,c=A=>String(A||"").toLowerCase().replace(/[^a-z0-9]/g,""),h=!!o.value&&(o.type==="password"||o.secret||a.test(c(o.label))),d=h?"•".repeat(Math.min(o.value.length,14)):o.value||"—",p=h?`<button type="button" class="adm-btn ghost sm" data-reveal data-raw="${k(o.value)}" style="margin-left:6px"><i class="fa-solid fa-eye"></i> দেখুন</button>`:"",I=[h?"sub-secret":"",o.type==="textarea"?"sub-multi":""].filter(Boolean).join(" ");return`<div class="sub-row"><span class="muted">${k(o.label)}:</span><b${I?` class="${I}"`:""}>${k(d)}</b>${p}${!o.value&&o.required?' <span class="muted">(required খালি)</span>':""}</div>`}).join(""),r=t.map(o=>`${o.label}: ${o.value}`).join(`
`);return`<div class="sub-fields">${i}</div>
    <button type="button" class="adm-btn ghost sm" data-copyall data-all="${k(r)}" style="margin-top:6px"><i class="fa-solid fa-clipboard"></i> Copy All Data</button>`}async function Li(n){n.innerHTML=`
    <div class="chip-row" id="proofChips">
      ${["pending","approved","rejected","all"].map(r=>`<button class="chip ${r===Ai?"on":""}" data-pf="${r}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[r]}</button>`).join("")}
    </div>
    <div id="proofList"></div>`,document.getElementById("proofChips").addEventListener("click",r=>{const o=r.target.closest("[data-pf]");o&&(Ai=o.dataset.pf,document.querySelectorAll("[data-pf]").forEach(a=>a.classList.toggle("on",a.dataset.pf===Ai)),Li(n))});const e=await au(Ai),t=document.getElementById("proofList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো submission নেই।</p>';return}const i=await Promise.all(e.map(async r=>({p:r,user:r.user||await vr(r.userId).catch(()=>null)})));t.innerHTML=i.map(({p:r,user:o})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${k((o==null?void 0:o.name)||r.username||"—")}</b><span class="muted">${k((o==null?void 0:o.email)||r.userEmail||"")}</span></div>
        <span class="badge ${r.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[r.status]||r.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-user"></i> UID: ${k(r.userId)}${o!=null&&o.mobile?` • ${k(o.mobile)}`:""}</div>
      <div class="ai-meta"><i class="fa-solid fa-briefcase"></i> ${k(r.taskName||r.taskSlug)} • <b class="gold-txt">${Re(r.reward)}</b> • ${Pe(r.createdAt)}</div>
      ${K_(r.submittedData,r.submittedFields)}
      ${(r.images||[]).length?`<div class="thumb-row">${r.images.map(a=>`<a href="${k(a)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${k(a)}" loading="lazy" alt="proof"></a>`).join("")}</div>`:""}
      ${r.status==="rejected"&&r.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${k(r.note)}</p>`:""}
      ${r.status!=="pending"&&r.reviewedAt?`<p class="ai-meta muted-sm">reviewed ${Pe(r.reviewedAt)}${r.approvedBy?" by "+k(r.approvedBy):""}${r.rejectedBy?" by "+k(r.rejectedBy):""}</p>`:""}
      ${r.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-approve="${r.id}"><i class="fa-solid fa-check"></i> Approve +${Re(r.reward)}</button>
        <button class="adm-btn red sm" data-reject="${r.id}"><i class="fa-solid fa-xmark"></i> Reject</button>
      </div>`:""}
    </div>`).join(""),t.querySelectorAll("[data-approve]").forEach(r=>r.addEventListener("click",async()=>{r.disabled=!0;try{await T_(r.dataset.approve),x("Proof approve — reward balance-এ যোগ হয়েছে"),Li(n)}catch(o){x(o.message,"error"),r.disabled=!1}})),t.querySelectorAll("[data-reveal]").forEach(r=>r.addEventListener("click",()=>{const o=r.previousElementSibling;if(!o)return;const a=r.dataset.on==="1";o.textContent=a?"•".repeat(Math.min(String(r.dataset.raw).length,14)):r.dataset.raw,r.innerHTML=a?'<i class="fa-solid fa-eye"></i> দেখুন':'<i class="fa-solid fa-eye-slash"></i> লুকান',r.dataset.on=a?"":"1"})),t.querySelectorAll("[data-copyall]").forEach(r=>r.addEventListener("click",async()=>{const o=r.dataset.all||"";try{await navigator.clipboard.writeText(o),x("সব field data copy হয়েছে")}catch{prompt("Copy করুন:",o)}})),t.querySelectorAll("[data-reject]").forEach(r=>r.addEventListener("click",async()=>{const o=prompt("Reject reason (user দেখবে):")||"";try{await A_(r.dataset.reject,o),x("Proof reject করা হয়েছে"),Li(n)}catch(a){x(a.message,"error")}}))}let bi="pending";async function Mi(n){n.innerHTML=`
    <div class="chip-row" id="depChips">
      ${["pending","approved","rejected","all"].map(r=>`<button class="chip ${r===bi?"on":""}" data-df="${r}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[r]}</button>`).join("")}
    </div>
    <div id="depList"></div>`,document.getElementById("depChips").addEventListener("click",r=>{const o=r.target.closest("[data-df]");o&&(bi=o.dataset.df,document.querySelectorAll("[data-df]").forEach(a=>a.classList.toggle("on",a.dataset.df===bi)),Mi(n))});const e=await lu(bi),t=document.getElementById("depList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো deposit নেই।</p>';return}const i=await Promise.all(e.map(async r=>({d:r,user:r.user||await vr(r.userId).catch(()=>null)})));t.innerHTML=i.map(({d:r,user:o})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${k((o==null?void 0:o.name)||r.userId)}</b><span class="muted">${k((o==null?void 0:o.mobile)||"")}</span></div>
        <span class="badge ${r.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[r.status]||r.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-wave"></i> ${k(r.method)} • <b class="gold-txt">${Re(r.amount)}</b> • TrxID: <b>${k(r.trxId)}</b>${r.senderNumber?` • Sender: <b>${k(r.senderNumber)}</b>`:""}</div>
      <div class="ai-meta muted-sm">${Pe(r.createdAt)}${r.status!=="pending"&&r.reviewedAt?" • reviewed "+Pe(r.reviewedAt):""}</div>
      ${r.image?`<div class="thumb-row"><a href="${k(r.image)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${k(r.image)}" loading="lazy" alt="payment proof"></a></div>`:""}
      ${r.status==="rejected"&&r.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${k(r.note)}</p>`:""}
      ${r.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-dapprove="${r.id}"><i class="fa-solid fa-check"></i> Approve — Account Active</button>
        <button class="adm-btn red sm" data-dreject="${r.id}"><i class="fa-solid fa-xmark"></i> Reject</button>
      </div>`:""}
    </div>`).join(""),t.querySelectorAll("[data-dapprove]").forEach(r=>r.addEventListener("click",async()=>{if(confirm("Approve করলে account ACTIVE হবে + activation bonus যোগ হবে। নিশ্চিত?")){r.disabled=!0;try{await b_(r.dataset.dapprove),x("Deposit approve — account active + bonus"),Mi(n)}catch(o){x(o.message,"error"),r.disabled=!1}}})),t.querySelectorAll("[data-dreject]").forEach(r=>r.addEventListener("click",async()=>{const o=prompt("Reject reason (user দেখবে):")||"";try{await R_(r.dataset.dreject,o),x("Deposit reject করা হয়েছে"),Mi(n)}catch(a){x(a.message,"error")}}))}let Ri="pending";async function Es(n){n.innerHTML=`
    <div class="chip-row" id="wdChips">
      ${["pending","paid","rejected","all"].map(o=>`<button class="chip ${o===Ri?"on":""}" data-wf="${o}">${{pending:"Pending",paid:"Paid",rejected:"Rejected",all:"সব"}[o]}</button>`).join("")}
    </div>
    <div id="wdList"></div>`,document.getElementById("wdChips").addEventListener("click",o=>{const a=o.target.closest("[data-wf]");a&&(Ri=a.dataset.wf,document.querySelectorAll("[data-wf]").forEach(c=>c.classList.toggle("on",c.dataset.wf===Ri)),Es(n))});const e=await O_(Ri),t=document.getElementById("wdList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো withdrawal নেই। (পুরনো pending request Users tab-এ user-এর detail-এ দেখাবে)</p>';return}const i=await Promise.all(e.map(async o=>({w:o,user:o.user||await vr(o.userId).catch(()=>null)})));t.innerHTML=i.map(({w:o,user:a})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${k((a==null?void 0:a.name)||o.name||o.userId)}</b><span class="muted">${k((a==null?void 0:a.mobile)||"")}</span></div>
        <span class="badge ${o.status==="paid"?"green":o.status}">${{pending:"PENDING",paid:"PAID",rejected:"REJECTED"}[o.status]||o.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-transfer"></i> ${k(o.method)} • <b class="gold-txt">${Re(o.amount)}</b> • ${k(o.accountNumber)}</div>
      <div class="ai-meta muted-sm">${Pe(o.createdAt)}${o.processedAt?" • processed "+Pe(o.processedAt):""}</div>
      ${o.status==="rejected"&&o.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${k(o.note)}</p>`:""}
      ${o.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-wpaid="${o.id}"><i class="fa-solid fa-check"></i> Paid (টাকা পাঠানো হয়েছে)</button>
        <button class="adm-btn red sm" data-wrej="${o.id}"><i class="fa-solid fa-xmark"></i> Reject (টাকা ফেরত)</button>
      </div>`:""}
    </div>`).join("");const r=async(o,a)=>{if(!(a==="paid"&&!confirm("এটা Paid মার্ক করবেন? (টাকা send করে ফেলেছেন মানে)"))&&!(a==="rejected"&&!confirm("Reject করলে amount user-এর balance-এ ফেরত যাবে। নিশ্চিত?"))){o.disabled=!0;try{const c=e.find(h=>h.id===o.dataset[a==="paid"?"wpaid":"wrej"]);await vs(c.userId,c.id,a),x(a==="paid"?"Withdrawal paid মার্ক হয়েছে":"Withdrawal reject — টাকা ফেরত হয়েছে"),Es(n)}catch(c){x(c.message,"error"),o.disabled=!1}}};t.querySelectorAll("[data-wpaid]").forEach(o=>o.addEventListener("click",()=>r(o,"paid"))),t.querySelectorAll("[data-wrej]").forEach(o=>o.addEventListener("click",()=>r(o,"rejected")))}let es="",ke=null;async function Q_(n){n.innerHTML=`
    <input type="search" id="userSearch" class="adm-input" placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." value="${k(es)}">
    <div id="userList" class="user-list"></div>
    <div id="userDetail"></div>`;const e=async()=>{const i=await io(300),r=es.trim().toLowerCase(),o=r?i.filter(c=>(c.name||"").toLowerCase().includes(r)||String(c.mobile||"").includes(r)):i,a=document.getElementById("userList");a.innerHTML=o.slice(0,100).map(c=>`
      <div class="user-row ${c.uid===ke?"on":""}" data-uid="${c.uid}">
        <div class="ur-avatar">${k((c.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${k(c.name||"—")}</b><span class="muted">${k(c.mobile||"")}</span></div>
        <div class="ur-right"><b class="gold-txt">${Re(c.balance)}</b>${c.isActive?'<span class="badge green">ACTIVE</span>':'<span class="badge gray">INACTIVE</span>'}</div>
      </div>`).join("")||'<p class="muted center-note">কোনো ইউজার পাওয়া যায়নি।</p>',a.querySelectorAll("[data-uid]").forEach(c=>c.addEventListener("click",()=>{ke=c.dataset.uid,e(),t()})),t()},t=async()=>{const i=document.getElementById("userDetail");if(!ke){i.innerHTML="";return}i.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';const[r,o,a,c]=await Promise.all([vr(ke),P_(ke),S_(ke,10),$_(ke).catch(()=>[])]);if(!r){i.innerHTML="";return}i.innerHTML=`
      <div class="adm-card detail-card">
        <h4><i class="fa-solid fa-user" style="color:#d97706"></i> ${k(r.name||"User")} <span class="muted" style="font-weight:500">• ${k(r.mobile||"")}</span></h4>
        <div class="detail-grid">
          <div><span class="muted">Balance</span><b>${Re(r.balance)}</b></div>
          <div><span class="muted">Total Earned</span><b>${Re(r.totalEarned)}</b></div>
          <div><span class="muted">Status</span>${r.isActive?'<b style="color:#16a34a">ACTIVE</b>':'<b style="color:#dc2626">INACTIVE</b>'}</div>
          <div><span class="muted">Joined</span><b>${Pe(r.createdAt)}</b></div>
        </div>
        <div class="ai-actions">
          ${r.isActive?`<button class="adm-btn red sm" data-deact="${r.uid}"><i class="fa-solid fa-ban"></i> Inactive করুন</button>`:`<button class="adm-btn green sm" data-act="${r.uid}"><i class="fa-solid fa-check"></i> Active করুন (manual)</button>`}
        </div>
        <h4 style="margin-top:14px"><i class="fa-solid fa-money-bill-transfer" style="color:#d97706"></i> Withdrawals</h4>
        ${a.length?a.map(p=>`<div class="mini-row">
          <b>${k(p.method)} • ${Re(p.amount)}</b>
          <span class="muted">${k(p.accountNumber)} • ${Pe(p.createdAt)}</span>
          <span class="badge ${p.status==="paid"?"green":p.status}">${p.status.toUpperCase()}</span>
          ${p.status==="pending"?`<button class="adm-btn green sm" style="margin-left:6px" data-wd-paid="${p.id}">Paid</button><button class="adm-btn red sm" style="margin-left:4px" data-wd-rej="${p.id}">Reject</button>`:""}
        </div>`).join(""):'<p class="muted">কোনো withdrawal নেই।</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> এই user-এর private Notice/Warning</h4>
        ${c.length?c.map(p=>`<div class="mini-row">
          <b>${p.type==="warning"?"⚠️ ":""}${k(p.title||"")} ${p.enabled?"":'<span class="badge gray">OFF</span>'}</b>
          <span class="muted">${k(p.body||"")}</span>
          <span><button class="adm-btn ghost sm" style="margin-left:6px" data-tn-tgl="${p.id}">${p.enabled?"Hide":"Show"}</button><button class="adm-btn red sm" style="margin-left:4px" data-tn-del="${p.id}">Del</button></span>
        </div>`).join(""):'<p class="muted">কোনো private notice/warning নেই। (Notices tab থেকে পাঠান)</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-receipt" style="color:#d97706"></i> Recent Transactions</h4>
        ${o.length?o.map(p=>`<div class="mini-row"><b>${k(p.note||p.type)}</b><span class="muted">${Pe(p.createdAt)}</span><span class="badge ${Number(p.amount)>=0?"green":"gray"}">${Number(p.amount)>=0?"+":""}${Re(p.amount)}</span></div>`).join(""):'<p class="muted">কোনো transaction নেই।</p>'}
      </div>`;const h=i.querySelector("[data-act]");h&&h.addEventListener("click",async()=>{try{await hl(h.dataset.act,!0),x("User active করা হয়েছে"),e()}catch(p){x(p.message,"error")}});const d=i.querySelector("[data-deact]");d&&d.addEventListener("click",async()=>{if(confirm("User-কে inactive করবেন?"))try{await hl(d.dataset.deact,!1),x("User inactive করা হয়েছে"),e()}catch(p){x(p.message,"error")}}),i.querySelectorAll("[data-wd-paid]").forEach(p=>p.addEventListener("click",async()=>{if(confirm("Paid মার্ক করবেন?")){p.disabled=!0;try{await vs(ke,p.dataset.wdPaid,"paid"),x("Paid মার্ক হয়েছে"),t()}catch(I){x(I.message,"error"),p.disabled=!1}}})),i.querySelectorAll("[data-wd-rej]").forEach(p=>p.addEventListener("click",async()=>{if(confirm("Reject করলে টাকা user-এর balance-এ ফেরত যাবে। নিশ্চিত?")){p.disabled=!0;try{await vs(ke,p.dataset.wdRej,"rejected"),x("Reject — টাকা ফেরত"),t()}catch(I){x(I.message,"error"),p.disabled=!1}}})),i.querySelectorAll("[data-tn-tgl]").forEach(p=>p.addEventListener("click",async()=>{const I=c.find(A=>A.id===p.dataset.tnTgl);try{await uu(ke,I.id,{enabled:!I.enabled}),x("Notice toggle"),t()}catch(A){x(A.message,"error")}})),i.querySelectorAll("[data-tn-del]").forEach(p=>p.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await hu(ke,p.dataset.tnDel),x("Notice delete"),t()}catch(I){x(I.message,"error")}}))};document.getElementById("userSearch").addEventListener("input",i=>{es=i.target.value,e()}),await e()}const J_=["text","email","password","tel","number","url","textarea"];function pu(n={}){return`<div class="if-row" data-if-row>
    <input class="adm-input if-label" placeholder="Field Title (যেমন: UID, Password, Cookies)" value="${k(n.label||"")}" maxlength="50">
    <select class="adm-input if-type">${J_.map(e=>`<option value="${e}" ${n.type===e?"selected":""}>${e}</option>`).join("")}</select>
    <input class="adm-input if-ph" placeholder="Placeholder (খালি রাখলে default)" value="${k(n.placeholder||"")}" maxlength="60">
    <label class="chk if-req"><input type="checkbox" data-ifreq ${n.required?"checked":""}> Required</label>
    <button type="button" class="adm-btn red sm if-del" data-ifdel><i class="fa-solid fa-trash"></i></button>
  </div>`}function X_(n){return`
    <div class="if-editor">
      <div class="if-head">
        <label>Input Fields — user task page-এ এই field গুলো পূরণ করে submit করবে</label>
        <button type="button" class="adm-btn ghost sm" data-ifadd><i class="fa-solid fa-plus"></i> Add Input Field</button>
      </div>
      <div class="if-rows" data-ifrows>${(Array.isArray(n.inputFields)?n.inputFields:[]).map(pu).join("")||'<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>'}</div>
    </div>`}async function ws(n){var i;const e=await C_(),t=`
    <div class="adm-card" style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div style="flex:1 1 260px"><b>Built-in list থেকে task doc তৈরি করুন</b><br>
        <span class="muted">${e.length?"যেগুলোর doc নেই শুধু সেটুকুই বানাবে — আগে থেকে যা আছে (rate, fields, lock) অক্ষত থাকবে।":"Firestore-এ কোনো task config নেই — একারণেই user submit করলে “Project পাওয়া যায়নি” আসছে। নিচের বাটন চাপলেই ঠিক হয়ে যাবে।"}</span></div>
      <button class="adm-btn gold sm" id="seedTasksBtn"><i class="fa-solid fa-database"></i> ${e.length?"বাকিগুলো তৈরি করুন":"এখনই তৈরি করুন"}</button>
    </div>`;n.innerHTML=`
    <div class="adm-card task-head"><h4><i class="fa-solid fa-briefcase" style="color:#d97706"></i> Micro Jobs</h4>
    <p class="muted">Reward, link, password, description, input fields, lock/status, video — সব এখান থেকেই। Save করলেই user website-তে automatically update হয়ে যাবে। নতুন task-এর জন্য নতুন page লাগবে — developer-কে জানান।</p></div>
    ${t}
    <div id="taskList">${e.map(r=>`
      <div class="adm-card task-card" data-slug="${k(r.slug)}">
        <div class="task-row">
          <div class="task-info">
            <b>${k(r.nameBn||r.slug)} ${r.enabled===!1?'<span class="badge gray">OFF</span>':""} ${r.locked?'<span class="badge gold">LOCKED</span>':""}</b>
            <span class="muted">/task/${k(r.slug)}.html • ${Re(r.reward)}${Array.isArray(r.inputFields)&&r.inputFields.length?` • ${r.inputFields.length} field(s)`:""}</span>
          </div>
          <button class="adm-btn ghost sm" data-edit="${k(r.slug)}"><i class="fa-solid fa-pen"></i></button>
        </div>
        <div class="task-form" data-form="${k(r.slug)}" hidden>
          <label>নাম (বাংলা)</label><input class="adm-input" data-f="nameBn" value="${k(r.nameBn||"")}">
          <label>Task URL (user-এর জন্য Open Link) — শুধু http/https</label><input class="adm-input" data-f="url" value="${k(r.url||"")}" placeholder="https://...">
          <div class="two-col">
            <div><label>Amount / Reward (৳)</label><input type="number" step="0.5" class="adm-input" data-f="reward" value="${Number(r.reward)||0}"></div>
            <div><label>Sort order</label><input type="number" class="adm-input" data-f="sort" value="${Number(r.sort)||10}"></div>
          </div>
          <label>Account Password (seller যে পাসওয়ার্ড সেট করবে — খালি রাখলে hide)</label><input class="adm-input" data-f="password" value="${k(r.password||"")}" maxlength="60">
          <label>Description / Instructions (project page-এ description)</label><textarea class="adm-input" data-f="description" rows="3" maxlength="300">${k(r.description||"")}</textarea>
          <div class="two-col">
            <div><label>Submit বাটনের লেখা</label><input class="adm-input" data-f="submitLabel" value="${k(r.submitLabel||"")}" placeholder="SUBMIT GMAIL" maxlength="40"></div>
            <div><label>History বাটনের লেখা</label><input class="adm-input" data-f="historyLabel" value="${k(r.historyLabel||"")}" placeholder="View Gmail History" maxlength="40"></div>
          </div>
          <label>দৈনিক সর্বোচ্চ কয়টি account জমা দেওয়া যাবে (per seller)</label><input type="number" min="1" max="200" class="adm-input" data-f="dailyLimit" value="${Number(r.dailyLimit)||20}">
          ${X_(r)}
          <label>Video URL (YouTube link বা mp4) — task page-এ guide video</label><input class="adm-input" data-f="videoUrl" value="${k(r.videoUrl||"")}">
          <div class="two-col">
            <label class="chk"><input type="checkbox" data-f="enabled" ${r.enabled!==!1?"checked":""}> Task ON / Active</label>
            <label class="chk"><input type="checkbox" data-f="locked" ${r.locked?"checked":""}> Locked</label>
          </div>
          <div class="ai-actions">
            <button class="adm-btn gold sm" data-save="${k(r.slug)}"><i class="fa-solid fa-floppy-disk"></i> Save</button>
          </div>
        </div>
      </div>`).join("")}</div>`,n.querySelectorAll("[data-ifadd]").forEach(r=>r.addEventListener("click",()=>{var c;const o=r.closest(".if-editor").querySelector("[data-ifrows]");(c=o.querySelector(".if-empty"))==null||c.remove();const a=document.createElement("div");a.innerHTML=pu(),o.appendChild(a.firstElementChild)})),n.querySelectorAll("[data-ifdel]").forEach(r=>r.addEventListener("click",()=>{r.closest("[data-if-row]").remove();const o=r.closest("[data-ifrows]");o.querySelector("[data-if-row]")||(o.innerHTML='<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>')})),n.querySelectorAll("[data-edit]").forEach(r=>r.addEventListener("click",()=>{const a=r.closest(".task-card").querySelector("[data-form]");a.hidden=!a.hidden})),(i=n.querySelector("#seedTasksBtn"))==null||i.addEventListener("click",async r=>{const o=r.currentTarget;o.disabled=!0;try{const a=await k_();x(`তৈরি হয়েছে ${a.createdCount||0}টা, আগে থেকেই ছিল ${a.skippedCount||0}টা${a.invalid&&a.invalid.length?" · কিছু হয়নি: "+a.invalid.join(", "):""}`),ws(n)}catch(a){x(a.message,"error"),o.disabled=!1}}),n.querySelectorAll("[data-save]").forEach(r=>r.addEventListener("click",async()=>{const o=r.closest(".task-card"),a=d=>o.querySelector(`[data-form] [data-f="${d}"]`),c=a("url").value.trim();if(c&&!/^https?:\/\//i.test(c)){x("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)","error");return}const h=[...o.querySelectorAll("[data-ifrows] [data-if-row]")].map(d=>{var p;return{label:d.querySelector(".if-label").value.trim(),type:d.querySelector(".if-type").value,placeholder:((p=d.querySelector(".if-ph"))==null?void 0:p.value.trim())||"",required:d.querySelector("[data-ifreq]").checked}}).filter(d=>d.label);r.disabled=!0;try{await D_(r.dataset.save,{nameBn:a("nameBn").value.trim(),url:c,reward:Number(a("reward").value)||0,sort:Number(a("sort").value)||10,password:a("password").value.trim(),description:a("description").value.trim(),submitLabel:a("submitLabel").value.trim(),historyLabel:a("historyLabel").value.trim(),dailyLimit:Math.max(1,Math.min(200,Number(a("dailyLimit").value)||20)),inputFields:h,videoUrl:a("videoUrl").value.trim(),enabled:a("enabled").checked,locked:a("locked").checked}),x("Task save হয়েছে — user website-তে update হয়ে গেছে"),ws(n)}catch(d){x(d.message,"error"),r.disabled=!1}}))}const Y_=[{group:"General",fields:[["siteName","Site Name","text"],["telegramLink","Telegram Link","url"],["facebookLink","Facebook Link","url"],["youtubeLink","YouTube Link","url"],["videoUrl","Tutorial Video URL","url"]]},{group:"Money (৳)",fields:[["activationFee","Activation Deposit Fee","number"],["activationBonus","Activation Bonus","number"],["registerBonus","Registration Bonus","number"],["referralBonus","Referral Bonus","number"],["minWithdraw","Minimum Withdraw","number"],["giftReward","Daily Gift Reward","number"]]},{group:"Payment Numbers (Deposit-এর জন্য)",fields:[["bkashNumber","bKash Number","text"],["nagadNumber","Nagad Number","text"],["rocketNumber","Rocket Number","text"]]},{group:"Gift",fields:[["giftCode","Gift Code","text"]]},{group:"Admin Contact (Support page-এ দেখাবে)",fields:[["admin1Name","Admin 1 — Name","text"],["admin1Phone","Admin 1 — Phone","text"],["admin1Email","Admin 1 — Email","email"],["admin1Link","Admin 1 — Link","url"],["admin2Name","Admin 2 — Name","text"],["admin2Phone","Admin 2 — Phone","text"],["admin2Email","Admin 2 — Email","email"],["admin2Link","Admin 2 — Link","url"]]}];async function mu(n){var i;const e=await N_(),t=e._secretLoaded!==!0;n.innerHTML=`
    <form id="settingsForm">
    ${Y_.map(r=>`
      <div class="adm-card">
        <h4><i class="fa-solid fa-sliders" style="color:#d97706"></i> ${r.group}</h4>
        <div class="set-grid">
          ${r.fields.map(([o,a,c])=>{var d;const h=o==="giftCode"&&t;return`
            <div><label>${a}</label><input type="${c}" step="${c==="number"?"0.5":void 0}" class="adm-input" data-sf="${o}" value="${h?"":k((d=e[o])!=null?d:"")}" ${h?'disabled placeholder="লোড করা যায়নি — API দেখুন"':""}></div>`}).join("")}
        </div>
        ${r.group==="Gift"&&t?'<p class="muted" style="margin-top:8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Gift Code server API থেকে পড়া যায়নি — এই ঘরটা এখন change হবে না (ভুলবশত কোড মুছে যাবে না)।</p>':""}
        ${r.group==="Gift"&&!t?`<p class="muted" style="margin-top:8px">কোড: <b>${k(e.giftCode||"(খালি)")}</b> <button type="button" class="adm-btn ghost sm" id="clearGiftBtn" style="margin-left:8px">Clear</button></p>`:""}
      </div>`).join("")}
      <button type="submit" class="adm-btn gold"><i class="fa-solid fa-floppy-disk"></i> Save Settings</button>
    </form>`,(i=document.getElementById("clearGiftBtn"))==null||i.addEventListener("click",async()=>{if(confirm("Gift code মুছে ফেলবেন? তাহলে কেউই আর gift claim করতে পারবে না।"))try{await L_(),x("Gift code cleared"),mu(n)}catch(r){x(r.message,"error")}}),document.getElementById("settingsForm").addEventListener("submit",async r=>{r.preventDefault();const o={};n.querySelectorAll("[data-sf]").forEach(c=>{if(c.disabled)return;const h=c.dataset.sf;o[h]=c.type==="number"?Number(c.value)||0:c.value.trim()});const a=r.target.querySelector("button[type=submit]");a.disabled=!0;try{await V_(o),x("Settings save হয়েছে")}catch(c){x(c.message,"error"),a.disabled=!1}})}let Mt="";async function Ut(n){const[e,t]=await Promise.all([M_(),j_().catch(()=>[])]),i=await io(300).catch(()=>[]);n.innerHTML=`
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
          <div class="task-info"><b>${d.type==="warning"?"⚠️ ":""}${k(d.title||"—")}</b><span class="muted">${d.enabled?"ON":"OFF"} • sort ${d.sort||0}${d.expiresAt?" • expire "+Pe(d.expiresAt):""}</span></div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tgl="${d.id}"><i class="fa-solid ${d.enabled?"fa-eye-slash":"fa-eye"}"></i></button>
            <button class="adm-btn red sm" data-del="${d.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${k(d.body||"")}</p>
      </div>`).join("")}
    ${e.length?"":'<p class="muted center-note">কোনো all-user notice নেই।</p>'}

    <h4 style="margin:14px 0 8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Private Warnings (user-specific)</h4>
    ${t.map(d=>`
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info">
            <b>${d.type==="warning"?"⚠️ ":""}${k(d.title||"—")}</b>
            <span class="muted">→ ${k(d.userName||"—")} (${k(d.userMobile||d.uid)}) • ${d.enabled?"ACTIVE":"OFF"}${d.expiresAt?" • expire "+d.expiresAt:""}</span>
          </div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tn-tgl="${d.uid}::${d.id}">${d.enabled?"Hide":"Show"}</button>
            <button class="adm-btn red sm" data-tn-del="${d.uid}::${d.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${k(d.body||"")}</p>
      </div>`).join("")}
    ${t.length?"":'<p class="muted center-note">কোনো private warning নেই।</p>'}`;const r=document.getElementById("ntTarget"),o=document.getElementById("ntUserWrap"),a=document.getElementById("ntUserSearch"),c=document.getElementById("ntUserResults");r.addEventListener("change",()=>{o.hidden=r.value!=="user"});const h=(d="")=>{const p=d.trim().toLowerCase(),I=p?i.filter(A=>(A.name||"").toLowerCase().includes(p)||String(A.mobile||"").includes(p)):i;c.innerHTML=I.slice(0,30).map(A=>`
      <div class="user-row ${Mt===A.uid?"on":""}" data-ntu="${A.uid}">
        <div class="ur-avatar">${k((A.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${k(A.name||"—")}</b><span class="muted">${k(A.mobile||"")}</span></div>
        <div class="ur-right">${Mt===A.uid?'<span class="badge green">SELECTED</span>':""}</div>
      </div>`).join("")||'<p class="muted">কোনো user পাওয়া যায়নি</p>',c.querySelectorAll("[data-ntu]").forEach(A=>A.addEventListener("click",()=>{Mt=A.dataset.ntu,h(a.value)}))};a.addEventListener("input",()=>h(a.value)),document.getElementById("ntAdd").addEventListener("click",async()=>{const d=document.getElementById("ntTitle").value.trim(),p=document.getElementById("ntBody").value.trim(),I=document.getElementById("ntType").value,A=r.value,C=document.getElementById("ntExpiry").value;if(!d&&!p){x("Title বা message লিখুন","error");return}if(A==="user"&&!Mt){x("একটা user select করুন","error");return}const D=C?new Date(C+"T23:59:59"):null;try{A==="user"?await B_(Mt,{title:d,body:p,type:I,expiresAt:D}):await x_({title:d,body:p,type:I,expiresAt:D}),x(A==="user"?"Private warning পাঠানো হয়েছে (শুধু সেই user দেখবে)":"Notice add হয়েছে (সব user দেখবে)"),Mt="",Ut(n)}catch(M){x(M.message,"error")}}),n.querySelectorAll("[data-tgl]").forEach(d=>d.addEventListener("click",async()=>{const p=e.find(I=>I.id===d.dataset.tgl);try{await U_(p.id,{title:p.title,body:p.body,enabled:!p.enabled,sort:p.sort}),x("Notice toggle"),Ut(n)}catch(I){x(I.message,"error")}})),n.querySelectorAll("[data-del]").forEach(d=>d.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await F_(d.dataset.del),x("Notice delete হয়েছে"),Ut(n)}catch(p){x(p.message,"error")}})),n.querySelectorAll("[data-tn-tgl]").forEach(d=>d.addEventListener("click",async()=>{const[p,I]=d.dataset.tnTgl.split("::"),A=t.find(C=>C.uid===p&&C.id===I);try{await uu(p,I,{enabled:!A.enabled}),x("Warning toggle"),Ut(n)}catch(C){x(C.message,"error")}})),n.querySelectorAll("[data-tn-del]").forEach(d=>d.addEventListener("click",async()=>{if(!confirm("Warning মুছে ফেলবেন?"))return;const[p,I]=d.dataset.tnDel.split("::");try{await hu(p,I),x("Warning delete হয়েছে"),Ut(n)}catch(A){x(A.message,"error")}}))}
