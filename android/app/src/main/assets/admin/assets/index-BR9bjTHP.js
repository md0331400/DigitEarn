(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();var ga={};/**
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
 */const bl=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},id=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[t++];e[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[t++],a=n[t++],c=n[t++],d=((i&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(d>>10)),e[r++]=String.fromCharCode(56320+(d&1023))}else{const o=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return e.join("")},Il={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const o=n[i],a=i+1<n.length,c=a?n[i+1]:0,d=i+2<n.length,h=d?n[i+2]:0,f=o>>2,g=(o&3)<<4|c>>4;let w=(c&15)<<2|h>>6,R=h&63;d||(R=64,a||(w=64)),r.push(t[f],t[g],t[w],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(bl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):id(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const o=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const h=i<n.length?t[n.charAt(i)]:64;++i;const g=i<n.length?t[n.charAt(i)]:64;if(++i,o==null||c==null||h==null||g==null)throw new sd;const w=o<<2|c>>4;if(r.push(w),h!==64){const R=c<<4&240|h>>2;if(r.push(R),g!==64){const N=h<<6&192|g;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class sd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const od=function(n){const e=bl(n);return Il.encodeByteArray(e,!0)},zr=function(n){return od(n).replace(/\./g,"")},Tl=function(n){try{return Il.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function ad(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
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
 */const ld=()=>ad().__FIREBASE_DEFAULTS__,cd=()=>{if(typeof process=="undefined"||typeof ga=="undefined")return;const n=ga.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ud=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Tl(n[1]);return e&&JSON.parse(e)},ci=()=>{try{return ld()||cd()||ud()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Al=n=>{var e,t;return(t=(e=ci())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},dd=n=>{const e=Al(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Sl=()=>{var n;return(n=ci())===null||n===void 0?void 0:n.config},Rl=n=>{var e;return(e=ci())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class hd{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function fd(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[zr(JSON.stringify(t)),zr(JSON.stringify(a)),""].join(".")}/**
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
 */function be(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function pd(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(be())}function md(){var n;const e=(n=ci())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function gd(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function yd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function vd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function _d(){const n=be();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ed(){return!md()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function wd(){try{return typeof indexedDB=="object"}catch{return!1}}function bd(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var o;e(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
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
 */const Id="FirebaseError";class Ye extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Id,Object.setPrototypeOf(this,Ye.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Wn.prototype.create)}}class Wn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,o=this.errors[e],a=o?Td(o,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Ye(i,c,r)}}function Td(n,e){return n.replace(Ad,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Ad=/\{\$([^}]+)}/g;function Sd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Gr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const o=n[i],a=e[i];if(ya(o)&&ya(a)){if(!Gr(o,a))return!1}else if(o!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function ya(n){return n!==null&&typeof n=="object"}/**
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
 */function Kn(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Pn(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,o]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(o)}}),e}function kn(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Rd(n,e){const t=new Pd(n,e);return t.subscribe.bind(t)}class Pd{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");kd(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Yi),i.error===void 0&&(i.error=Yi),i.complete===void 0&&(i.complete=Yi);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console!="undefined"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function kd(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Yi(){}/**
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
 */function pe(n){return n&&n._delegate?n._delegate:n}class Ct{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const St="[DEFAULT]";/**
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
 */class Cd{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new hd;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dd(e))try{this.getOrInitializeService({instanceIdentifier:St})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(e=St){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=St){return this.instances.has(e)}getOptions(e=St){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&a.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(i,o);const a=this.instances.get(i);return a&&e(a,i),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Nd(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=St){return this.component?this.component.multipleInstances?e:St:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Nd(n){return n===St?void 0:n}function Dd(n){return n.instantiationMode==="EAGER"}/**
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
 */class Od{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Cd(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var F;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(F||(F={}));const Ld={debug:F.DEBUG,verbose:F.VERBOSE,info:F.INFO,warn:F.WARN,error:F.ERROR,silent:F.SILENT},Vd=F.INFO,Md={[F.DEBUG]:"log",[F.VERBOSE]:"log",[F.INFO]:"info",[F.WARN]:"warn",[F.ERROR]:"error"},xd=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Md[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ds{constructor(e){this.name=e,this._logLevel=Vd,this._logHandler=xd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in F))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ld[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,F.DEBUG,...e),this._logHandler(this,F.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,F.VERBOSE,...e),this._logHandler(this,F.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,F.INFO,...e),this._logHandler(this,F.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,F.WARN,...e),this._logHandler(this,F.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,F.ERROR,...e),this._logHandler(this,F.ERROR,...e)}}const $d=(n,e)=>e.some(t=>n instanceof t);let va,_a;function Ud(){return va||(va=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Fd(){return _a||(_a=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Pl=new WeakMap,cs=new WeakMap,kl=new WeakMap,Zi=new WeakMap,Os=new WeakMap;function jd(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(ht(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Pl.set(t,n)}).catch(()=>{}),Os.set(e,n),e}function Bd(n){if(cs.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});cs.set(n,e)}let us={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return cs.get(n);if(e==="objectStoreNames")return n.objectStoreNames||kl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ht(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function qd(n){us=n(us)}function Hd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(es(this),e,...t);return kl.set(r,e.sort?e.sort():[e]),ht(r)}:Fd().includes(n)?function(...e){return n.apply(es(this),e),ht(Pl.get(this))}:function(...e){return ht(n.apply(es(this),e))}}function zd(n){return typeof n=="function"?Hd(n):(n instanceof IDBTransaction&&Bd(n),$d(n,Ud())?new Proxy(n,us):n)}function ht(n){if(n instanceof IDBRequest)return jd(n);if(Zi.has(n))return Zi.get(n);const e=zd(n);return e!==n&&(Zi.set(n,e),Os.set(e,n)),e}const es=n=>Os.get(n);function Gd(n,e,{blocked:t,upgrade:r,blocking:i,terminated:o}={}){const a=indexedDB.open(n,e),c=ht(a);return r&&a.addEventListener("upgradeneeded",d=>{r(ht(a.result),d.oldVersion,d.newVersion,ht(a.transaction),d)}),t&&a.addEventListener("blocked",d=>t(d.oldVersion,d.newVersion,d)),c.then(d=>{o&&d.addEventListener("close",()=>o()),i&&d.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const Wd=["get","getKey","getAll","getAllKeys","count"],Kd=["put","add","delete","clear"],ts=new Map;function Ea(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ts.get(e))return ts.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Kd.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Wd.includes(t)))return;const o=async function(a,...c){const d=this.transaction(a,i?"readwrite":"readonly");let h=d.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),i&&d.done]))[0]};return ts.set(e,o),o}qd(n=>({...n,get:(e,t,r)=>Ea(e,t)||n.get(e,t,r),has:(e,t)=>!!Ea(e,t)||n.has(e,t)}));/**
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
 */class Jd{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Qd(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Qd(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ds="@firebase/app",wa="0.10.13";/**
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
 */const Qe=new Ds("@firebase/app"),Xd="@firebase/app-compat",Yd="@firebase/analytics-compat",Zd="@firebase/analytics",eh="@firebase/app-check-compat",th="@firebase/app-check",nh="@firebase/auth",rh="@firebase/auth-compat",ih="@firebase/database",sh="@firebase/data-connect",oh="@firebase/database-compat",ah="@firebase/functions",lh="@firebase/functions-compat",ch="@firebase/installations",uh="@firebase/installations-compat",dh="@firebase/messaging",hh="@firebase/messaging-compat",fh="@firebase/performance",ph="@firebase/performance-compat",mh="@firebase/remote-config",gh="@firebase/remote-config-compat",yh="@firebase/storage",vh="@firebase/storage-compat",_h="@firebase/firestore",Eh="@firebase/vertexai-preview",wh="@firebase/firestore-compat",bh="firebase",Ih="10.14.1";/**
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
 */const hs="[DEFAULT]",Th={[ds]:"fire-core",[Xd]:"fire-core-compat",[Zd]:"fire-analytics",[Yd]:"fire-analytics-compat",[th]:"fire-app-check",[eh]:"fire-app-check-compat",[nh]:"fire-auth",[rh]:"fire-auth-compat",[ih]:"fire-rtdb",[sh]:"fire-data-connect",[oh]:"fire-rtdb-compat",[ah]:"fire-fn",[lh]:"fire-fn-compat",[ch]:"fire-iid",[uh]:"fire-iid-compat",[dh]:"fire-fcm",[hh]:"fire-fcm-compat",[fh]:"fire-perf",[ph]:"fire-perf-compat",[mh]:"fire-rc",[gh]:"fire-rc-compat",[yh]:"fire-gcs",[vh]:"fire-gcs-compat",[_h]:"fire-fst",[wh]:"fire-fst-compat",[Eh]:"fire-vertex","fire-js":"fire-js",[bh]:"fire-js-all"};/**
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
 */const Wr=new Map,Ah=new Map,fs=new Map;function ba(n,e){try{n.container.addComponent(e)}catch(t){Qe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Xt(n){const e=n.name;if(fs.has(e))return Qe.debug(`There were multiple attempts to register component ${e}.`),!1;fs.set(e,n);for(const t of Wr.values())ba(t,n);for(const t of Ah.values())ba(t,n);return!0}function Ls(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ge(n){return n.settings!==void 0}/**
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
 */const Sh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ft=new Wn("app","Firebase",Sh);/**
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
 */class Rh{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ct("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ft.create("app-deleted",{appName:this._name})}}/**
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
 */const on=Ih;function Cl(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:hs,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw ft.create("bad-app-name",{appName:String(i)});if(t||(t=Sl()),!t)throw ft.create("no-options");const o=Wr.get(i);if(o){if(Gr(t,o.options)&&Gr(r,o.config))return o;throw ft.create("duplicate-app",{appName:i})}const a=new Od(i);for(const d of fs.values())a.addComponent(d);const c=new Rh(t,r,a);return Wr.set(i,c),c}function Nl(n=hs){const e=Wr.get(n);if(!e&&n===hs&&Sl())return Cl();if(!e)throw ft.create("no-app",{appName:n});return e}function pt(n,e,t){var r;let i=(r=Th[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const o=i.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const c=[`Unable to register library "${i}" with version "${e}":`];o&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Qe.warn(c.join(" "));return}Xt(new Ct(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const Ph="firebase-heartbeat-database",kh=1,xn="firebase-heartbeat-store";let ns=null;function Dl(){return ns||(ns=Gd(Ph,kh,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(xn)}catch(t){console.warn(t)}}}}).catch(n=>{throw ft.create("idb-open",{originalErrorMessage:n.message})})),ns}async function Ch(n){try{const t=(await Dl()).transaction(xn),r=await t.objectStore(xn).get(Ol(n));return await t.done,r}catch(e){if(e instanceof Ye)Qe.warn(e.message);else{const t=ft.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Qe.warn(t.message)}}}async function Ia(n,e){try{const r=(await Dl()).transaction(xn,"readwrite");await r.objectStore(xn).put(e,Ol(n)),await r.done}catch(t){if(t instanceof Ye)Qe.warn(t.message);else{const r=ft.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Qe.warn(r.message)}}}function Ol(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Nh=1024,Dh=30*24*60*60*1e3;class Oh{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Vh(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Ta();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const c=new Date(a.date).valueOf();return Date.now()-c<=Dh}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Qe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ta(),{heartbeatsToSend:r,unsentEntries:i}=Lh(this._heartbeatsCache.heartbeats),o=zr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Qe.warn(t),""}}}function Ta(){return new Date().toISOString().substring(0,10)}function Lh(n,e=Nh){const t=[];let r=n.slice();for(const i of n){const o=t.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),Aa(t)>e){o.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Aa(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Vh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wd()?bd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Ch(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ia(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ia(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Aa(n){return zr(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function Mh(n){Xt(new Ct("platform-logger",e=>new Jd(e),"PRIVATE")),Xt(new Ct("heartbeat",e=>new Oh(e),"PRIVATE")),pt(ds,wa,n),pt(ds,wa,"esm2017"),pt("fire-js","")}Mh("");var xh="firebase",$h="10.14.1";/**
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
 */pt(xh,$h,"app");function Vs(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Ll(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Uh=Ll,Vl=new Wn("auth","Firebase",Ll());/**
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
 */const Kr=new Ds("@firebase/auth");function Fh(n,...e){Kr.logLevel<=F.WARN&&Kr.warn(`Auth (${on}): ${n}`,...e)}function Vr(n,...e){Kr.logLevel<=F.ERROR&&Kr.error(`Auth (${on}): ${n}`,...e)}/**
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
 */function Ue(n,...e){throw Ms(n,...e)}function Fe(n,...e){return Ms(n,...e)}function Ml(n,e,t){const r=Object.assign(Object.assign({},Uh()),{[e]:t});return new Wn("auth","Firebase",r).create(e,{appName:n.name})}function mt(n){return Ml(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ms(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Vl.create(n,...e)}function $(n,e,...t){if(!n)throw Ms(e,...t)}function We(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Vr(e),new Error(e)}function Xe(n,e){n||We(e)}/**
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
 */function ps(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function jh(){return Sa()==="http:"||Sa()==="https:"}function Sa(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function Bh(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(jh()||yd()||"connection"in navigator)?navigator.onLine:!0}function qh(){if(typeof navigator=="undefined")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Jn{constructor(e,t){this.shortDelay=e,this.longDelay=t,Xe(t>e,"Short delay should be less than long delay!"),this.isMobile=pd()||vd()}get(){return Bh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function xs(n,e){Xe(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class xl{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;We("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;We("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;We("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Hh={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const zh=new Jn(3e4,6e4);function Vt(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Et(n,e,t,r,i={}){return $l(n,i,async()=>{let o={},a={};r&&(e==="GET"?a=r:o={body:JSON.stringify(r)});const c=Kn(Object.assign({key:n.config.apiKey},a)).slice(1),d=await n._getAdditionalHeaders();d["Content-Type"]="application/json",n.languageCode&&(d["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:d},o);return gd()||(h.referrerPolicy="no-referrer"),xl.fetch()(Ul(n,n.config.apiHost,t,c),h)})}async function $l(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Hh),e);try{const i=new Wh(n),o=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Ar(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const c=o.ok?a.errorMessage:a.error.message,[d,h]=c.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ar(n,"credential-already-in-use",a);if(d==="EMAIL_EXISTS")throw Ar(n,"email-already-in-use",a);if(d==="USER_DISABLED")throw Ar(n,"user-disabled",a);const f=r[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Ml(n,f,h);Ue(n,f)}}catch(i){if(i instanceof Ye)throw i;Ue(n,"network-request-failed",{message:String(i)})}}async function ui(n,e,t,r,i={}){const o=await Et(n,e,t,r,i);return"mfaPendingCredential"in o&&Ue(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Ul(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?xs(n.config,i):`${n.config.apiScheme}://${i}`}function Gh(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Wh{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Fe(this.auth,"network-request-failed")),zh.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ar(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Fe(n,e,r);return i.customData._tokenResponse=t,i}function Ra(n){return n!==void 0&&n.enterprise!==void 0}class Kh{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Gh(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function Jh(n,e){return Et(n,"GET","/v2/recaptchaConfig",Vt(n,e))}/**
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
 */async function Qh(n,e){return Et(n,"POST","/v1/accounts:delete",e)}async function Fl(n,e){return Et(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Dn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Xh(n,e=!1){const t=pe(n),r=await t.getIdToken(e),i=$s(r);$(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:Dn(rs(i.auth_time)),issuedAtTime:Dn(rs(i.iat)),expirationTime:Dn(rs(i.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function rs(n){return Number(n)*1e3}function $s(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Vr("JWT malformed, contained fewer than 3 sections"),null;try{const i=Tl(t);return i?JSON.parse(i):(Vr("Failed to decode base64 JWT payload"),null)}catch(i){return Vr("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Pa(n){const e=$s(n);return $(e,"internal-error"),$(typeof e.exp!="undefined","internal-error"),$(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function $n(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ye&&Yh(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Yh({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Zh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ms{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Dn(this.lastLoginAt),this.creationTime=Dn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Jr(n){var e;const t=n.auth,r=await n.getIdToken(),i=await $n(n,Fl(t,{idToken:r}));$(i==null?void 0:i.users.length,t,"internal-error");const o=i.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?jl(o.providerUserInfo):[],c=tf(n.providerData,a),d=n.isAnonymous,h=!(n.email&&o.passwordHash)&&!(c!=null&&c.length),f=d?h:!1,g={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new ms(o.createdAt,o.lastLoginAt),isAnonymous:f};Object.assign(n,g)}async function ef(n){const e=pe(n);await Jr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function tf(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function jl(n){return n.map(e=>{var{providerId:t}=e,r=Vs(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function nf(n,e){const t=await $l(n,{},async()=>{const r=Kn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:o}=n.config,a=Ul(n,i,"/v1/token",`key=${o}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",xl.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function rf(n,e){return Et(n,"POST","/v2/accounts:revokeToken",Vt(n,e))}/**
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
 */class Wt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){$(e.idToken,"internal-error"),$(typeof e.idToken!="undefined","internal-error"),$(typeof e.refreshToken!="undefined","internal-error");const t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):Pa(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){$(e.length!==0,"internal-error");const t=Pa(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:($(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:o}=await nf(e,t);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:o}=t,a=new Wt;return r&&($(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&($(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),o&&($(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Wt,this.toJSON())}_performRefresh(){return We("not implemented")}}/**
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
 */function at(n,e){$(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}class Ke{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,o=Vs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Zh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new ms(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await $n(this,this.stsTokenManager.getToken(this.auth,e));return $(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Xh(this,e)}reload(){return ef(this)}_assign(e){this!==e&&($(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ke(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){$(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Jr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ge(this.auth.app))return Promise.reject(mt(this.auth));const e=await this.getIdToken();return await $n(this,Qh(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,o,a,c,d,h,f;const g=(r=t.displayName)!==null&&r!==void 0?r:void 0,w=(i=t.email)!==null&&i!==void 0?i:void 0,R=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,N=(a=t.photoURL)!==null&&a!==void 0?a:void 0,L=(c=t.tenantId)!==null&&c!==void 0?c:void 0,V=(d=t._redirectEventId)!==null&&d!==void 0?d:void 0,z=(h=t.createdAt)!==null&&h!==void 0?h:void 0,H=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:G,emailVerified:ee,isAnonymous:Re,providerData:A,stsTokenManager:v}=t;$(G&&v,e,"internal-error");const m=Wt.fromJSON(this.name,v);$(typeof G=="string",e,"internal-error"),at(g,e.name),at(w,e.name),$(typeof ee=="boolean",e,"internal-error"),$(typeof Re=="boolean",e,"internal-error"),at(R,e.name),at(N,e.name),at(L,e.name),at(V,e.name),at(z,e.name),at(H,e.name);const y=new Ke({uid:G,auth:e,email:w,emailVerified:ee,displayName:g,isAnonymous:Re,photoURL:N,phoneNumber:R,tenantId:L,stsTokenManager:m,createdAt:z,lastLoginAt:H});return A&&Array.isArray(A)&&(y.providerData=A.map(E=>Object.assign({},E))),V&&(y._redirectEventId=V),y}static async _fromIdTokenResponse(e,t,r=!1){const i=new Wt;i.updateFromServerResponse(t);const o=new Ke({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Jr(o),o}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];$(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?jl(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(o!=null&&o.length),c=new Wt;c.updateFromIdToken(r);const d=new Ke({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new ms(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(o!=null&&o.length)};return Object.assign(d,h),d}}/**
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
 */const ka=new Map;function Je(n){Xe(n instanceof Function,"Expected a class definition");let e=ka.get(n);return e?(Xe(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ka.set(n,e),e)}/**
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
 */class Bl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Bl.type="NONE";const Ca=Bl;/**
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
 */function Mr(n,e,t){return`firebase:${n}:${e}:${t}`}class Kt{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=Mr(this.userKey,i.apiKey,o),this.fullPersistenceKey=Mr("persistence",i.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ke._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Kt(Je(Ca),e,r);const i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let o=i[0]||Je(Ca);const a=Mr(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){const g=Ke._fromJSON(e,f);h!==o&&(c=g),o=h;break}}catch{}const d=i.filter(h=>h._shouldAllowMigration);return!o._shouldAllowMigration||!d.length?new Kt(o,e,r):(o=d[0],c&&await o._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==o)try{await h._remove(a)}catch{}})),new Kt(o,e,r))}}/**
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
 */function Na(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Gl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ql(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Kl(e))return"Blackberry";if(Jl(e))return"Webos";if(Hl(e))return"Safari";if((e.includes("chrome/")||zl(e))&&!e.includes("edge/"))return"Chrome";if(Wl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function ql(n=be()){return/firefox\//i.test(n)}function Hl(n=be()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function zl(n=be()){return/crios\//i.test(n)}function Gl(n=be()){return/iemobile/i.test(n)}function Wl(n=be()){return/android/i.test(n)}function Kl(n=be()){return/blackberry/i.test(n)}function Jl(n=be()){return/webos/i.test(n)}function Us(n=be()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function sf(n=be()){var e;return Us(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function of(){return _d()&&document.documentMode===10}function Ql(n=be()){return Us(n)||Wl(n)||Jl(n)||Kl(n)||/windows phone/i.test(n)||Gl(n)}/**
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
 */function Xl(n,e=[]){let t;switch(n){case"Browser":t=Na(be());break;case"Worker":t=`${Na(be())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${on}/${r}`}/**
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
 */class af{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((a,c)=>{try{const d=e(o);a(d)}catch(d){c(d)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function lf(n,e={}){return Et(n,"GET","/v2/passwordPolicy",Vt(n,e))}/**
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
 */const cf=6;class uf{constructor(e){var t,r,i,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:cf,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,o,a,c;const d={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,d),this.validatePasswordCharacterOptions(e,d),d.isValid&&(d.isValid=(t=d.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),d.isValid&&(d.isValid=(r=d.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),d.isValid&&(d.isValid=(i=d.containsLowercaseLetter)!==null&&i!==void 0?i:!0),d.isValid&&(d.isValid=(o=d.containsUppercaseLetter)!==null&&o!==void 0?o:!0),d.isValid&&(d.isValid=(a=d.containsNumericCharacter)!==null&&a!==void 0?a:!0),d.isValid&&(d.isValid=(c=d.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),d}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
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
 */class df{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Da(this),this.idTokenSubscription=new Da(this),this.beforeStateQueue=new af(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Vl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Je(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Kt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Fl(this,{idToken:e}),r=await Ke._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ge(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,d=await this.tryRedirectSignIn(e);(!a||a===c)&&(d!=null&&d.user)&&(i=d.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return $(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Jr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=qh()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ge(this.app))return Promise.reject(mt(this));const t=e?pe(e):null;return t&&$(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&$(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ge(this.app)?Promise.reject(mt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ge(this.app)?Promise.reject(mt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Je(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await lf(this),t=new uf(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Wn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await rf(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Je(e)||this._popupRedirectResolver;$(t,this,"argument-error"),this.redirectPersistenceManager=await Kt.create(this,[Je(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if($(c,this,"internal-error"),c.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const d=e.addObserver(t,r,i);return()=>{a=!0,d()}}else{const d=e.addObserver(t);return()=>{a=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return $(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Xl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Fh(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function an(n){return pe(n)}class Da{constructor(e){this.auth=e,this.observer=null,this.addObserver=Rd(t=>this.observer=t)}get next(){return $(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let di={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function hf(n){di=n}function Yl(n){return di.loadJS(n)}function ff(){return di.recaptchaEnterpriseScript}function pf(){return di.gapiScript}function mf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const gf="recaptcha-enterprise",yf="NO_RECAPTCHA";class vf{constructor(e){this.type=gf,this.auth=an(e)}async verify(e="verify",t=!1){async function r(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,c)=>{Jh(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(d=>{if(d.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new Kh(d);return o.tenantId==null?o._agentRecaptchaConfig=h:o._tenantRecaptchaConfigs[o.tenantId]=h,a(h.siteKey)}}).catch(d=>{c(d)})})}function i(o,a,c){const d=window.grecaptcha;Ra(d)?d.enterprise.ready(()=>{d.enterprise.execute(o,{action:e}).then(h=>{a(h)}).catch(()=>{a(yf)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,a)=>{r(this.auth).then(c=>{if(!t&&Ra(window.grecaptcha))i(c,o,a);else{if(typeof window=="undefined"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let d=ff();d.length!==0&&(d+=c),Yl(d).then(()=>{i(c,o,a)}).catch(h=>{a(h)})}}).catch(c=>{a(c)})})}}async function Oa(n,e,t,r=!1){const i=new vf(n);let o;try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const a=Object.assign({},e);return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function La(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Oa(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Oa(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(o)})}/**
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
 */function _f(n,e){const t=Ls(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),o=t.getOptions();if(Gr(o,e!=null?e:{}))return i;Ue(i,"already-initialized")}return t.initialize({options:e})}function Ef(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Je);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function wf(n,e,t){const r=an(n);$(r._canInitEmulator,r,"emulator-config-failed"),$(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,o=Zl(e),{host:a,port:c}=bf(e),d=c===null?"":`:${c}`;r.config.emulator={url:`${o}//${a}${d}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),If()}function Zl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function bf(n){const e=Zl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:Va(r.substr(o.length+1))}}else{const[o,a]=r.split(":");return{host:o,port:Va(a)}}}function Va(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function If(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Fs{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return We("not implemented")}_getIdTokenResponse(e){return We("not implemented")}_linkToIdToken(e,t){return We("not implemented")}_getReauthenticationResolver(e){return We("not implemented")}}async function Tf(n,e){return Et(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function Af(n,e){return ui(n,"POST","/v1/accounts:signInWithPassword",Vt(n,e))}/**
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
 */async function Sf(n,e){return ui(n,"POST","/v1/accounts:signInWithEmailLink",Vt(n,e))}async function Rf(n,e){return ui(n,"POST","/v1/accounts:signInWithEmailLink",Vt(n,e))}/**
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
 */class Un extends Fs{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new Un(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Un(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return La(e,t,"signInWithPassword",Af);case"emailLink":return Sf(e,{email:this._email,oobCode:this._password});default:Ue(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return La(e,r,"signUpPassword",Tf);case"emailLink":return Rf(e,{idToken:t,email:this._email,oobCode:this._password});default:Ue(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Jt(n,e){return ui(n,"POST","/v1/accounts:signInWithIdp",Vt(n,e))}/**
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
 */const Pf="http://localhost";class Nt extends Fs{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Nt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ue("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,o=Vs(t,["providerId","signInMethod"]);if(!r||!i)return null;const a=new Nt(r,i);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Jt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Jt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Jt(e,t)}buildRequest(){const e={requestUri:Pf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Kn(t)}return e}}/**
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
 */function kf(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Cf(n){const e=Pn(kn(n)).link,t=e?Pn(kn(e)).deep_link_id:null,r=Pn(kn(n)).deep_link_id;return(r?Pn(kn(r)).link:null)||r||t||e||n}class js{constructor(e){var t,r,i,o,a,c;const d=Pn(kn(e)),h=(t=d.apiKey)!==null&&t!==void 0?t:null,f=(r=d.oobCode)!==null&&r!==void 0?r:null,g=kf((i=d.mode)!==null&&i!==void 0?i:null);$(h&&f&&g,"argument-error"),this.apiKey=h,this.operation=g,this.code=f,this.continueUrl=(o=d.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(a=d.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=d.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Cf(e);try{return new js(t)}catch{return null}}}/**
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
 */class ln{constructor(){this.providerId=ln.PROVIDER_ID}static credential(e,t){return Un._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=js.parseLink(t);return $(r,"argument-error"),Un._fromEmailAndCode(e,r.code,r.tenantId)}}ln.PROVIDER_ID="password";ln.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ln.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class ec{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Qn extends ec{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class lt extends Qn{constructor(){super("facebook.com")}static credential(e){return Nt._fromParams({providerId:lt.PROVIDER_ID,signInMethod:lt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return lt.credentialFromTaggedObject(e)}static credentialFromError(e){return lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return lt.credential(e.oauthAccessToken)}catch{return null}}}lt.FACEBOOK_SIGN_IN_METHOD="facebook.com";lt.PROVIDER_ID="facebook.com";/**
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
 */class ct extends Qn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Nt._fromParams({providerId:ct.PROVIDER_ID,signInMethod:ct.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ct.credentialFromTaggedObject(e)}static credentialFromError(e){return ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ct.credential(t,r)}catch{return null}}}ct.GOOGLE_SIGN_IN_METHOD="google.com";ct.PROVIDER_ID="google.com";/**
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
 */class ut extends Qn{constructor(){super("github.com")}static credential(e){return Nt._fromParams({providerId:ut.PROVIDER_ID,signInMethod:ut.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ut.credentialFromTaggedObject(e)}static credentialFromError(e){return ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ut.credential(e.oauthAccessToken)}catch{return null}}}ut.GITHUB_SIGN_IN_METHOD="github.com";ut.PROVIDER_ID="github.com";/**
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
 */class dt extends Qn{constructor(){super("twitter.com")}static credential(e,t){return Nt._fromParams({providerId:dt.PROVIDER_ID,signInMethod:dt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return dt.credentialFromTaggedObject(e)}static credentialFromError(e){return dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return dt.credential(t,r)}catch{return null}}}dt.TWITTER_SIGN_IN_METHOD="twitter.com";dt.PROVIDER_ID="twitter.com";/**
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
 */class Yt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const o=await Ke._fromIdTokenResponse(e,r,i),a=Ma(r);return new Yt({user:o,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Ma(r);return new Yt({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Ma(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Qr extends Ye{constructor(e,t,r,i){var o;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Qr.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Qr(e,t,r,i)}}function tc(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Qr._fromErrorAndOperation(n,o,e,r):o})}async function Nf(n,e,t=!1){const r=await $n(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Yt._forOperation(n,"link",r)}/**
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
 */async function Df(n,e,t=!1){const{auth:r}=n;if(Ge(r.app))return Promise.reject(mt(r));const i="reauthenticate";try{const o=await $n(n,tc(r,i,e,n),t);$(o.idToken,r,"internal-error");const a=$s(o.idToken);$(a,r,"internal-error");const{sub:c}=a;return $(n.uid===c,r,"user-mismatch"),Yt._forOperation(n,i,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Ue(r,"user-mismatch"),o}}/**
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
 */async function nc(n,e,t=!1){if(Ge(n.app))return Promise.reject(mt(n));const r="signIn",i=await tc(n,r,e),o=await Yt._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(o.user),o}async function Of(n,e){return nc(an(n),e)}/**
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
 */async function Lf(n){const e=an(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Vf(n,e,t){return Ge(n.app)?Promise.reject(mt(n)):Of(pe(n),ln.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Lf(n),r})}function Mf(n,e,t,r){return pe(n).onIdTokenChanged(e,t,r)}function xf(n,e,t){return pe(n).beforeAuthStateChanged(e,t)}function $f(n,e,t,r){return pe(n).onAuthStateChanged(e,t,r)}function rc(n){return pe(n).signOut()}const Xr="__sak";/**
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
 */class ic{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Xr,"1"),this.storage.removeItem(Xr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Uf=1e3,Ff=10;class sc extends ic{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ql(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,d)=>{this.notifyListeners(a,d)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},o=this.storage.getItem(r);of()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ff):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Uf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}sc.type="LOCAL";const jf=sc;/**
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
 */class oc extends ic{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}oc.type="SESSION";const ac=oc;/**
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
 */function Bf(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class hi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new hi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:o}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(a).map(async h=>h(t.origin,o)),d=await Bf(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:d})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}hi.receivers=[];/**
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
 */function Bs(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class qf{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,a;return new Promise((c,d)=>{const h=Bs("",20);i.port1.start();const f=setTimeout(()=>{d(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(g){const w=g;if(w.data.eventId===h)switch(w.data.status){case"ack":clearTimeout(f),o=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),c(w.data.response);break;default:clearTimeout(f),clearTimeout(o),d(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function je(){return window}function Hf(n){je().location.href=n}/**
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
 */function lc(){return typeof je().WorkerGlobalScope!="undefined"&&typeof je().importScripts=="function"}async function zf(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Gf(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Wf(){return lc()?self:null}/**
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
 */const cc="firebaseLocalStorageDb",Kf=1,Yr="firebaseLocalStorage",uc="fbase_key";class Xn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function fi(n,e){return n.transaction([Yr],e?"readwrite":"readonly").objectStore(Yr)}function Jf(){const n=indexedDB.deleteDatabase(cc);return new Xn(n).toPromise()}function gs(){const n=indexedDB.open(cc,Kf);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Yr,{keyPath:uc})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Yr)?e(r):(r.close(),await Jf(),e(await gs()))})})}async function xa(n,e,t){const r=fi(n,!0).put({[uc]:e,value:t});return new Xn(r).toPromise()}async function Qf(n,e){const t=fi(n,!1).get(e),r=await new Xn(t).toPromise();return r===void 0?null:r.value}function $a(n,e){const t=fi(n,!0).delete(e);return new Xn(t).toPromise()}const Xf=800,Yf=3;class dc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await gs(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Yf)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return lc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=hi._getInstance(Wf()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await zf(),!this.activeServiceWorker)return;this.sender=new qf(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Gf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await gs();return await xa(e,Xr,"1"),await $a(e,Xr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>xa(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Qf(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>$a(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const o=fi(i,!1).getAll();return new Xn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:o}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Xf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}dc.type="LOCAL";const Zf=dc;new Jn(3e4,6e4);/**
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
 */function ep(n,e){return e?Je(e):($(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class qs extends Fs{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Jt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Jt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Jt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function tp(n){return nc(n.auth,new qs(n),n.bypassAuthState)}function np(n){const{auth:e,user:t}=n;return $(t,e,"internal-error"),Df(t,new qs(n),n.bypassAuthState)}async function rp(n){const{auth:e,user:t}=n;return $(t,e,"internal-error"),Nf(t,new qs(n),n.bypassAuthState)}/**
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
 */class hc{constructor(e,t,r,i,o=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:o,error:a,type:c}=e;if(a){this.reject(a);return}const d={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(d))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tp;case"linkViaPopup":case"linkViaRedirect":return rp;case"reauthViaPopup":case"reauthViaRedirect":return np;default:Ue(this.auth,"internal-error")}}resolve(e){Xe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Xe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const ip=new Jn(2e3,1e4);class Gt extends hc{constructor(e,t,r,i,o){super(e,t,i,o),this.provider=r,this.authWindow=null,this.pollId=null,Gt.currentPopupAction&&Gt.currentPopupAction.cancel(),Gt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return $(e,this.auth,"internal-error"),e}async onExecution(){Xe(this.filter.length===1,"Popup operations only handle one event");const e=Bs();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Fe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Fe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Gt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Fe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ip.get())};e()}}Gt.currentPopupAction=null;/**
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
 */const sp="pendingRedirect",xr=new Map;class op extends hc{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=xr.get(this.auth._key());if(!e){try{const r=await ap(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}xr.set(this.auth._key(),e)}return this.bypassAuthState||xr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ap(n,e){const t=up(e),r=cp(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function lp(n,e){xr.set(n._key(),e)}function cp(n){return Je(n._redirectPersistence)}function up(n){return Mr(sp,n.config.apiKey,n.name)}async function dp(n,e,t=!1){if(Ge(n.app))return Promise.reject(mt(n));const r=an(n),i=ep(r,e),a=await new op(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const hp=10*60*1e3;class fp{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!pp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!fc(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Fe(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=hp&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ua(e))}saveEventToCache(e){this.cachedEventUids.add(Ua(e)),this.lastProcessedEventTime=Date.now()}}function Ua(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function fc({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function pp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return fc(n);default:return!1}}/**
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
 */async function mp(n,e={}){return Et(n,"GET","/v1/projects",e)}/**
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
 */const gp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,yp=/^https?/;async function vp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await mp(n);for(const t of e)try{if(_p(t))return}catch{}Ue(n,"unauthorized-domain")}function _p(n){const e=ps(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!yp.test(t))return!1;if(gp.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const Ep=new Jn(3e4,6e4);function Fa(){const n=je().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function wp(n){return new Promise((e,t)=>{var r,i,o;function a(){Fa(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Fa(),t(Fe(n,"network-request-failed"))},timeout:Ep.get()})}if(!((i=(r=je().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((o=je().gapi)===null||o===void 0)&&o.load)a();else{const c=mf("iframefcb");return je()[c]=()=>{gapi.load?a():t(Fe(n,"network-request-failed"))},Yl(`${pf()}?onload=${c}`).catch(d=>t(d))}}).catch(e=>{throw $r=null,e})}let $r=null;function bp(n){return $r=$r||wp(n),$r}/**
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
 */const Ip=new Jn(5e3,15e3),Tp="__/auth/iframe",Ap="emulator/auth/iframe",Sp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Rp=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Pp(n){const e=n.config;$(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?xs(e,Ap):`https://${n.config.authDomain}/${Tp}`,r={apiKey:e.apiKey,appName:n.name,v:on},i=Rp.get(n.config.apiHost);i&&(r.eid=i);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${Kn(r).slice(1)}`}async function kp(n){const e=await bp(n),t=je().gapi;return $(t,n,"internal-error"),e.open({where:document.body,url:Pp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Sp,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});const a=Fe(n,"network-request-failed"),c=je().setTimeout(()=>{o(a)},Ip.get());function d(){je().clearTimeout(c),i(r)}r.ping(d).then(d,()=>{o(a)})}))}/**
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
 */const Cp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Np=500,Dp=600,Op="_blank",Lp="http://localhost";class ja{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Vp(n,e,t,r=Np,i=Dp){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const d=Object.assign(Object.assign({},Cp),{width:r.toString(),height:i.toString(),top:o,left:a}),h=be().toLowerCase();t&&(c=zl(h)?Op:t),ql(h)&&(e=e||Lp,d.scrollbars="yes");const f=Object.entries(d).reduce((w,[R,N])=>`${w}${R}=${N},`,"");if(sf(h)&&c!=="_self")return Mp(e||"",c),new ja(null);const g=window.open(e||"",c,f);$(g,n,"popup-blocked");try{g.focus()}catch{}return new ja(g)}function Mp(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const xp="__/auth/handler",$p="emulator/auth/handler",Up=encodeURIComponent("fac");async function Ba(n,e,t,r,i,o){$(n.config.authDomain,n,"auth-domain-config-required"),$(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:on,eventId:i};if(e instanceof ec){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Sd(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,g]of Object.entries({}))a[f]=g}if(e instanceof Qn){const f=e.getScopes().filter(g=>g!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const d=await n._getAppCheckToken(),h=d?`#${Up}=${encodeURIComponent(d)}`:"";return`${Fp(n)}?${Kn(c).slice(1)}${h}`}function Fp({config:n}){return n.emulator?xs(n,$p):`https://${n.authDomain}/${xp}`}/**
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
 */const is="webStorageSupport";class jp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ac,this._completeRedirectFn=dp,this._overrideRedirectResult=lp}async _openPopup(e,t,r,i){var o;Xe((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await Ba(e,t,r,ps(),i);return Vp(e,a,Bs())}async _openRedirect(e,t,r,i){await this._originValidation(e);const o=await Ba(e,t,r,ps(),i);return Hf(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:o}=this.eventManagers[t];return i?Promise.resolve(i):(Xe(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await kp(e),r=new fp(e);return t.register("authEvent",i=>($(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(is,{type:is},i=>{var o;const a=(o=i==null?void 0:i[0])===null||o===void 0?void 0:o[is];a!==void 0&&t(!!a),Ue(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=vp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ql()||Hl()||Us()}}const Bp=jp;var qa="@firebase/auth",Ha="1.7.9";/**
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
 */class qp{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){$(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Hp(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function zp(n){Xt(new Ct("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;$(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const d={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Xl(n)},h=new df(r,i,o,d);return Ef(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Xt(new Ct("auth-internal",e=>{const t=an(e.getProvider("auth").getImmediate());return(r=>new qp(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),pt(qa,Ha,Hp(n)),pt(qa,Ha,"esm2017")}/**
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
 */const Gp=5*60,Wp=Rl("authIdTokenMaxAge")||Gp;let za=null;const Kp=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Wp)return;const i=t==null?void 0:t.token;za!==i&&(za=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Jp(n=Nl()){const e=Ls(n,"auth");if(e.isInitialized())return e.getImmediate();const t=_f(n,{popupRedirectResolver:Bp,persistence:[Zf,jf,ac]}),r=Rl("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const a=Kp(o.toString());xf(t,a,()=>a(t.currentUser)),Mf(t,c=>a(c))}}const i=Al("auth");return i&&wf(t,`http://${i}`),t}function Qp(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}hf({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const o=Fe("internal-error");o.customData=i,t(o)},r.type="text/javascript",r.charset="UTF-8",Qp().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});zp("Browser");var Ga=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var pc;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,m){function y(){}y.prototype=m.prototype,v.D=m.prototype,v.prototype=new y,v.prototype.constructor=v,v.C=function(E,b,I){for(var _=Array(arguments.length-2),Ie=2;Ie<arguments.length;Ie++)_[Ie-2]=arguments[Ie];return m.prototype[b].apply(E,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,m,y){y||(y=0);var E=Array(16);if(typeof m=="string")for(var b=0;16>b;++b)E[b]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(b=0;16>b;++b)E[b]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=v.g[0],y=v.g[1],b=v.g[2];var I=v.g[3],_=m+(I^y&(b^I))+E[0]+3614090360&4294967295;m=y+(_<<7&4294967295|_>>>25),_=I+(b^m&(y^b))+E[1]+3905402710&4294967295,I=m+(_<<12&4294967295|_>>>20),_=b+(y^I&(m^y))+E[2]+606105819&4294967295,b=I+(_<<17&4294967295|_>>>15),_=y+(m^b&(I^m))+E[3]+3250441966&4294967295,y=b+(_<<22&4294967295|_>>>10),_=m+(I^y&(b^I))+E[4]+4118548399&4294967295,m=y+(_<<7&4294967295|_>>>25),_=I+(b^m&(y^b))+E[5]+1200080426&4294967295,I=m+(_<<12&4294967295|_>>>20),_=b+(y^I&(m^y))+E[6]+2821735955&4294967295,b=I+(_<<17&4294967295|_>>>15),_=y+(m^b&(I^m))+E[7]+4249261313&4294967295,y=b+(_<<22&4294967295|_>>>10),_=m+(I^y&(b^I))+E[8]+1770035416&4294967295,m=y+(_<<7&4294967295|_>>>25),_=I+(b^m&(y^b))+E[9]+2336552879&4294967295,I=m+(_<<12&4294967295|_>>>20),_=b+(y^I&(m^y))+E[10]+4294925233&4294967295,b=I+(_<<17&4294967295|_>>>15),_=y+(m^b&(I^m))+E[11]+2304563134&4294967295,y=b+(_<<22&4294967295|_>>>10),_=m+(I^y&(b^I))+E[12]+1804603682&4294967295,m=y+(_<<7&4294967295|_>>>25),_=I+(b^m&(y^b))+E[13]+4254626195&4294967295,I=m+(_<<12&4294967295|_>>>20),_=b+(y^I&(m^y))+E[14]+2792965006&4294967295,b=I+(_<<17&4294967295|_>>>15),_=y+(m^b&(I^m))+E[15]+1236535329&4294967295,y=b+(_<<22&4294967295|_>>>10),_=m+(b^I&(y^b))+E[1]+4129170786&4294967295,m=y+(_<<5&4294967295|_>>>27),_=I+(y^b&(m^y))+E[6]+3225465664&4294967295,I=m+(_<<9&4294967295|_>>>23),_=b+(m^y&(I^m))+E[11]+643717713&4294967295,b=I+(_<<14&4294967295|_>>>18),_=y+(I^m&(b^I))+E[0]+3921069994&4294967295,y=b+(_<<20&4294967295|_>>>12),_=m+(b^I&(y^b))+E[5]+3593408605&4294967295,m=y+(_<<5&4294967295|_>>>27),_=I+(y^b&(m^y))+E[10]+38016083&4294967295,I=m+(_<<9&4294967295|_>>>23),_=b+(m^y&(I^m))+E[15]+3634488961&4294967295,b=I+(_<<14&4294967295|_>>>18),_=y+(I^m&(b^I))+E[4]+3889429448&4294967295,y=b+(_<<20&4294967295|_>>>12),_=m+(b^I&(y^b))+E[9]+568446438&4294967295,m=y+(_<<5&4294967295|_>>>27),_=I+(y^b&(m^y))+E[14]+3275163606&4294967295,I=m+(_<<9&4294967295|_>>>23),_=b+(m^y&(I^m))+E[3]+4107603335&4294967295,b=I+(_<<14&4294967295|_>>>18),_=y+(I^m&(b^I))+E[8]+1163531501&4294967295,y=b+(_<<20&4294967295|_>>>12),_=m+(b^I&(y^b))+E[13]+2850285829&4294967295,m=y+(_<<5&4294967295|_>>>27),_=I+(y^b&(m^y))+E[2]+4243563512&4294967295,I=m+(_<<9&4294967295|_>>>23),_=b+(m^y&(I^m))+E[7]+1735328473&4294967295,b=I+(_<<14&4294967295|_>>>18),_=y+(I^m&(b^I))+E[12]+2368359562&4294967295,y=b+(_<<20&4294967295|_>>>12),_=m+(y^b^I)+E[5]+4294588738&4294967295,m=y+(_<<4&4294967295|_>>>28),_=I+(m^y^b)+E[8]+2272392833&4294967295,I=m+(_<<11&4294967295|_>>>21),_=b+(I^m^y)+E[11]+1839030562&4294967295,b=I+(_<<16&4294967295|_>>>16),_=y+(b^I^m)+E[14]+4259657740&4294967295,y=b+(_<<23&4294967295|_>>>9),_=m+(y^b^I)+E[1]+2763975236&4294967295,m=y+(_<<4&4294967295|_>>>28),_=I+(m^y^b)+E[4]+1272893353&4294967295,I=m+(_<<11&4294967295|_>>>21),_=b+(I^m^y)+E[7]+4139469664&4294967295,b=I+(_<<16&4294967295|_>>>16),_=y+(b^I^m)+E[10]+3200236656&4294967295,y=b+(_<<23&4294967295|_>>>9),_=m+(y^b^I)+E[13]+681279174&4294967295,m=y+(_<<4&4294967295|_>>>28),_=I+(m^y^b)+E[0]+3936430074&4294967295,I=m+(_<<11&4294967295|_>>>21),_=b+(I^m^y)+E[3]+3572445317&4294967295,b=I+(_<<16&4294967295|_>>>16),_=y+(b^I^m)+E[6]+76029189&4294967295,y=b+(_<<23&4294967295|_>>>9),_=m+(y^b^I)+E[9]+3654602809&4294967295,m=y+(_<<4&4294967295|_>>>28),_=I+(m^y^b)+E[12]+3873151461&4294967295,I=m+(_<<11&4294967295|_>>>21),_=b+(I^m^y)+E[15]+530742520&4294967295,b=I+(_<<16&4294967295|_>>>16),_=y+(b^I^m)+E[2]+3299628645&4294967295,y=b+(_<<23&4294967295|_>>>9),_=m+(b^(y|~I))+E[0]+4096336452&4294967295,m=y+(_<<6&4294967295|_>>>26),_=I+(y^(m|~b))+E[7]+1126891415&4294967295,I=m+(_<<10&4294967295|_>>>22),_=b+(m^(I|~y))+E[14]+2878612391&4294967295,b=I+(_<<15&4294967295|_>>>17),_=y+(I^(b|~m))+E[5]+4237533241&4294967295,y=b+(_<<21&4294967295|_>>>11),_=m+(b^(y|~I))+E[12]+1700485571&4294967295,m=y+(_<<6&4294967295|_>>>26),_=I+(y^(m|~b))+E[3]+2399980690&4294967295,I=m+(_<<10&4294967295|_>>>22),_=b+(m^(I|~y))+E[10]+4293915773&4294967295,b=I+(_<<15&4294967295|_>>>17),_=y+(I^(b|~m))+E[1]+2240044497&4294967295,y=b+(_<<21&4294967295|_>>>11),_=m+(b^(y|~I))+E[8]+1873313359&4294967295,m=y+(_<<6&4294967295|_>>>26),_=I+(y^(m|~b))+E[15]+4264355552&4294967295,I=m+(_<<10&4294967295|_>>>22),_=b+(m^(I|~y))+E[6]+2734768916&4294967295,b=I+(_<<15&4294967295|_>>>17),_=y+(I^(b|~m))+E[13]+1309151649&4294967295,y=b+(_<<21&4294967295|_>>>11),_=m+(b^(y|~I))+E[4]+4149444226&4294967295,m=y+(_<<6&4294967295|_>>>26),_=I+(y^(m|~b))+E[11]+3174756917&4294967295,I=m+(_<<10&4294967295|_>>>22),_=b+(m^(I|~y))+E[2]+718787259&4294967295,b=I+(_<<15&4294967295|_>>>17),_=y+(I^(b|~m))+E[9]+3951481745&4294967295,v.g[0]=v.g[0]+m&4294967295,v.g[1]=v.g[1]+(b+(_<<21&4294967295|_>>>11))&4294967295,v.g[2]=v.g[2]+b&4294967295,v.g[3]=v.g[3]+I&4294967295}r.prototype.u=function(v,m){m===void 0&&(m=v.length);for(var y=m-this.blockSize,E=this.B,b=this.h,I=0;I<m;){if(b==0)for(;I<=y;)i(this,v,I),I+=this.blockSize;if(typeof v=="string"){for(;I<m;)if(E[b++]=v.charCodeAt(I++),b==this.blockSize){i(this,E),b=0;break}}else for(;I<m;)if(E[b++]=v[I++],b==this.blockSize){i(this,E),b=0;break}}this.h=b,this.o+=m},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var m=1;m<v.length-8;++m)v[m]=0;var y=8*this.o;for(m=v.length-8;m<v.length;++m)v[m]=y&255,y/=256;for(this.u(v),v=Array(16),m=y=0;4>m;++m)for(var E=0;32>E;E+=8)v[y++]=this.g[m]>>>E&255;return v};function o(v,m){var y=c;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=m(v)}function a(v,m){this.h=m;for(var y=[],E=!0,b=v.length-1;0<=b;b--){var I=v[b]|0;E&&I==m||(y[b]=I,E=!1)}this.g=y}var c={};function d(v){return-128<=v&&128>v?o(v,function(m){return new a([m|0],0>m?-1:0)}):new a([v|0],0>v?-1:0)}function h(v){if(isNaN(v)||!isFinite(v))return g;if(0>v)return V(h(-v));for(var m=[],y=1,E=0;v>=y;E++)m[E]=v/y|0,y*=4294967296;return new a(m,0)}function f(v,m){if(v.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(v.charAt(0)=="-")return V(f(v.substring(1),m));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(m,8)),E=g,b=0;b<v.length;b+=8){var I=Math.min(8,v.length-b),_=parseInt(v.substring(b,b+I),m);8>I?(I=h(Math.pow(m,I)),E=E.j(I).add(h(_))):(E=E.j(y),E=E.add(h(_)))}return E}var g=d(0),w=d(1),R=d(16777216);n=a.prototype,n.m=function(){if(L(this))return-V(this).m();for(var v=0,m=1,y=0;y<this.g.length;y++){var E=this.i(y);v+=(0<=E?E:4294967296+E)*m,m*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(N(this))return"0";if(L(this))return"-"+V(this).toString(v);for(var m=h(Math.pow(v,6)),y=this,E="";;){var b=ee(y,m).g;y=z(y,b.j(m));var I=((0<y.g.length?y.g[0]:y.h)>>>0).toString(v);if(y=b,N(y))return I+E;for(;6>I.length;)I="0"+I;E=I+E}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function N(v){if(v.h!=0)return!1;for(var m=0;m<v.g.length;m++)if(v.g[m]!=0)return!1;return!0}function L(v){return v.h==-1}n.l=function(v){return v=z(this,v),L(v)?-1:N(v)?0:1};function V(v){for(var m=v.g.length,y=[],E=0;E<m;E++)y[E]=~v.g[E];return new a(y,~v.h).add(w)}n.abs=function(){return L(this)?V(this):this},n.add=function(v){for(var m=Math.max(this.g.length,v.g.length),y=[],E=0,b=0;b<=m;b++){var I=E+(this.i(b)&65535)+(v.i(b)&65535),_=(I>>>16)+(this.i(b)>>>16)+(v.i(b)>>>16);E=_>>>16,I&=65535,_&=65535,y[b]=_<<16|I}return new a(y,y[y.length-1]&-2147483648?-1:0)};function z(v,m){return v.add(V(m))}n.j=function(v){if(N(this)||N(v))return g;if(L(this))return L(v)?V(this).j(V(v)):V(V(this).j(v));if(L(v))return V(this.j(V(v)));if(0>this.l(R)&&0>v.l(R))return h(this.m()*v.m());for(var m=this.g.length+v.g.length,y=[],E=0;E<2*m;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(var b=0;b<v.g.length;b++){var I=this.i(E)>>>16,_=this.i(E)&65535,Ie=v.i(b)>>>16,et=v.i(b)&65535;y[2*E+2*b]+=_*et,H(y,2*E+2*b),y[2*E+2*b+1]+=I*et,H(y,2*E+2*b+1),y[2*E+2*b+1]+=_*Ie,H(y,2*E+2*b+1),y[2*E+2*b+2]+=I*Ie,H(y,2*E+2*b+2)}for(E=0;E<m;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=m;E<2*m;E++)y[E]=0;return new a(y,0)};function H(v,m){for(;(v[m]&65535)!=v[m];)v[m+1]+=v[m]>>>16,v[m]&=65535,m++}function G(v,m){this.g=v,this.h=m}function ee(v,m){if(N(m))throw Error("division by zero");if(N(v))return new G(g,g);if(L(v))return m=ee(V(v),m),new G(V(m.g),V(m.h));if(L(m))return m=ee(v,V(m)),new G(V(m.g),m.h);if(30<v.g.length){if(L(v)||L(m))throw Error("slowDivide_ only works with positive integers.");for(var y=w,E=m;0>=E.l(v);)y=Re(y),E=Re(E);var b=A(y,1),I=A(E,1);for(E=A(E,2),y=A(y,2);!N(E);){var _=I.add(E);0>=_.l(v)&&(b=b.add(y),I=_),E=A(E,1),y=A(y,1)}return m=z(v,b.j(m)),new G(b,m)}for(b=g;0<=v.l(m);){for(y=Math.max(1,Math.floor(v.m()/m.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),I=h(y),_=I.j(m);L(_)||0<_.l(v);)y-=E,I=h(y),_=I.j(m);N(I)&&(I=w),b=b.add(I),v=z(v,_)}return new G(b,v)}n.A=function(v){return ee(this,v).h},n.and=function(v){for(var m=Math.max(this.g.length,v.g.length),y=[],E=0;E<m;E++)y[E]=this.i(E)&v.i(E);return new a(y,this.h&v.h)},n.or=function(v){for(var m=Math.max(this.g.length,v.g.length),y=[],E=0;E<m;E++)y[E]=this.i(E)|v.i(E);return new a(y,this.h|v.h)},n.xor=function(v){for(var m=Math.max(this.g.length,v.g.length),y=[],E=0;E<m;E++)y[E]=this.i(E)^v.i(E);return new a(y,this.h^v.h)};function Re(v){for(var m=v.g.length+1,y=[],E=0;E<m;E++)y[E]=v.i(E)<<1|v.i(E-1)>>>31;return new a(y,v.h)}function A(v,m){var y=m>>5;m%=32;for(var E=v.g.length-y,b=[],I=0;I<E;I++)b[I]=0<m?v.i(I+y)>>>m|v.i(I+y+1)<<32-m:v.i(I+y);return new a(b,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,pc=a}).apply(typeof Ga!="undefined"?Ga:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Sr=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var mc,Cn,gc,Ur,ys,yc,vc,_c;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,l,u){return s==Array.prototype||s==Object.prototype||(s[l]=u.value),s};function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Sr=="object"&&Sr];for(var l=0;l<s.length;++l){var u=s[l];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=t(this);function i(s,l){if(l)e:{var u=r;s=s.split(".");for(var p=0;p<s.length-1;p++){var T=s[p];if(!(T in u))break e;u=u[T]}s=s[s.length-1],p=u[s],l=l(p),l!=p&&l!=null&&e(u,s,{configurable:!0,writable:!0,value:l})}}function o(s,l){s instanceof String&&(s+="");var u=0,p=!1,T={next:function(){if(!p&&u<s.length){var S=u++;return{value:l(S,s[S]),done:!1}}return p=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(s){return s||function(){return o(this,function(l,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function d(s){var l=typeof s;return l=l!="object"?l:s?Array.isArray(s)?"array":l:"null",l=="array"||l=="object"&&typeof s.length=="number"}function h(s){var l=typeof s;return l=="object"&&s!=null||l=="function"}function f(s,l,u){return s.call.apply(s.bind,arguments)}function g(s,l,u){if(!s)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,p),s.apply(l,T)}}return function(){return s.apply(l,arguments)}}function w(s,l,u){return w=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:g,w.apply(null,arguments)}function R(s,l){var u=Array.prototype.slice.call(arguments,1);return function(){var p=u.slice();return p.push.apply(p,arguments),s.apply(this,p)}}function N(s,l){function u(){}u.prototype=l.prototype,s.aa=l.prototype,s.prototype=new u,s.prototype.constructor=s,s.Qb=function(p,T,S){for(var D=Array(arguments.length-2),W=2;W<arguments.length;W++)D[W-2]=arguments[W];return l.prototype[T].apply(p,D)}}function L(s){const l=s.length;if(0<l){const u=Array(l);for(let p=0;p<l;p++)u[p]=s[p];return u}return[]}function V(s,l){for(let u=1;u<arguments.length;u++){const p=arguments[u];if(d(p)){const T=s.length||0,S=p.length||0;s.length=T+S;for(let D=0;D<S;D++)s[T+D]=p[D]}else s.push(p)}}class z{constructor(l,u){this.i=l,this.j=u,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function H(s){return/^[\s\xa0]*$/.test(s)}function G(){var s=c.navigator;return s&&(s=s.userAgent)?s:""}function ee(s){return ee[" "](s),s}ee[" "]=function(){};var Re=G().indexOf("Gecko")!=-1&&!(G().toLowerCase().indexOf("webkit")!=-1&&G().indexOf("Edge")==-1)&&!(G().indexOf("Trident")!=-1||G().indexOf("MSIE")!=-1)&&G().indexOf("Edge")==-1;function A(s,l,u){for(const p in s)l.call(u,s[p],p,s)}function v(s,l){for(const u in s)l.call(void 0,s[u],u,s)}function m(s){const l={};for(const u in s)l[u]=s[u];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(s,l){let u,p;for(let T=1;T<arguments.length;T++){p=arguments[T];for(u in p)s[u]=p[u];for(let S=0;S<y.length;S++)u=y[S],Object.prototype.hasOwnProperty.call(p,u)&&(s[u]=p[u])}}function b(s){var l=1;s=s.split(":");const u=[];for(;0<l&&s.length;)u.push(s.shift()),l--;return s.length&&u.push(s.join(":")),u}function I(s){c.setTimeout(()=>{throw s},0)}function _(){var s=Mt;let l=null;return s.g&&(l=s.g,s.g=s.g.next,s.g||(s.h=null),l.next=null),l}class Ie{constructor(){this.h=this.g=null}add(l,u){const p=et.get();p.set(l,u),this.h?this.h.next=p:this.g=p,this.h=p}}var et=new z(()=>new rr,s=>s.reset());class rr{constructor(){this.next=this.g=this.h=null}set(l,u){this.h=l,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let tt,nt=!1,Mt=new Ie,hn=()=>{const s=c.Promise.resolve(void 0);tt=()=>{s.then(ir)}};var ir=()=>{for(var s;s=_();){try{s.h.call(s.g)}catch(u){I(u)}var l=et;l.j(s),100>l.h&&(l.h++,s.next=l.g,l.g=s)}nt=!1};function X(){this.s=this.s,this.C=this.C}X.prototype.s=!1,X.prototype.ma=function(){this.s||(this.s=!0,this.N())},X.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function re(s,l){this.type=s,this.g=this.target=l,this.defaultPrevented=!1}re.prototype.h=function(){this.defaultPrevented=!0};var rt=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,l=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const u=()=>{};c.addEventListener("test",u,l),c.removeEventListener("test",u,l)}catch{}return s}();function Ne(s,l){if(re.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var u=this.type=s.type,p=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=l,l=s.relatedTarget){if(Re){e:{try{ee(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else u=="mouseover"?l=s.fromElement:u=="mouseout"&&(l=s.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:sr[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&Ne.aa.h.call(this)}}N(Ne,re);var sr={2:"touch",3:"pen",4:"mouse"};Ne.prototype.h=function(){Ne.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var or="closure_listenable_"+(1e6*Math.random()|0),Ru=0;function Pu(s,l,u,p,T){this.listener=s,this.proxy=null,this.src=l,this.type=u,this.capture=!!p,this.ha=T,this.key=++Ru,this.da=this.fa=!1}function ar(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function lr(s){this.src=s,this.g={},this.h=0}lr.prototype.add=function(s,l,u,p,T){var S=s.toString();s=this.g[S],s||(s=this.g[S]=[],this.h++);var D=Ci(s,l,p,T);return-1<D?(l=s[D],u||(l.fa=!1)):(l=new Pu(l,this.src,S,!!p,T),l.fa=u,s.push(l)),l};function ki(s,l){var u=l.type;if(u in s.g){var p=s.g[u],T=Array.prototype.indexOf.call(p,l,void 0),S;(S=0<=T)&&Array.prototype.splice.call(p,T,1),S&&(ar(l),s.g[u].length==0&&(delete s.g[u],s.h--))}}function Ci(s,l,u,p){for(var T=0;T<s.length;++T){var S=s[T];if(!S.da&&S.listener==l&&S.capture==!!u&&S.ha==p)return T}return-1}var Ni="closure_lm_"+(1e6*Math.random()|0),Di={};function yo(s,l,u,p,T){if(Array.isArray(l)){for(var S=0;S<l.length;S++)yo(s,l[S],u,p,T);return null}return u=Eo(u),s&&s[or]?s.K(l,u,h(p)?!!p.capture:!1,T):ku(s,l,u,!1,p,T)}function ku(s,l,u,p,T,S){if(!l)throw Error("Invalid event type");var D=h(T)?!!T.capture:!!T,W=Li(s);if(W||(s[Ni]=W=new lr(s)),u=W.add(l,u,p,D,S),u.proxy)return u;if(p=Cu(),u.proxy=p,p.src=s,p.listener=u,s.addEventListener)rt||(T=D),T===void 0&&(T=!1),s.addEventListener(l.toString(),p,T);else if(s.attachEvent)s.attachEvent(_o(l.toString()),p);else if(s.addListener&&s.removeListener)s.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Cu(){function s(u){return l.call(s.src,s.listener,u)}const l=Nu;return s}function vo(s,l,u,p,T){if(Array.isArray(l))for(var S=0;S<l.length;S++)vo(s,l[S],u,p,T);else p=h(p)?!!p.capture:!!p,u=Eo(u),s&&s[or]?(s=s.i,l=String(l).toString(),l in s.g&&(S=s.g[l],u=Ci(S,u,p,T),-1<u&&(ar(S[u]),Array.prototype.splice.call(S,u,1),S.length==0&&(delete s.g[l],s.h--)))):s&&(s=Li(s))&&(l=s.g[l.toString()],s=-1,l&&(s=Ci(l,u,p,T)),(u=-1<s?l[s]:null)&&Oi(u))}function Oi(s){if(typeof s!="number"&&s&&!s.da){var l=s.src;if(l&&l[or])ki(l.i,s);else{var u=s.type,p=s.proxy;l.removeEventListener?l.removeEventListener(u,p,s.capture):l.detachEvent?l.detachEvent(_o(u),p):l.addListener&&l.removeListener&&l.removeListener(p),(u=Li(l))?(ki(u,s),u.h==0&&(u.src=null,l[Ni]=null)):ar(s)}}}function _o(s){return s in Di?Di[s]:Di[s]="on"+s}function Nu(s,l){if(s.da)s=!0;else{l=new Ne(l,this);var u=s.listener,p=s.ha||s.src;s.fa&&Oi(s),s=u.call(p,l)}return s}function Li(s){return s=s[Ni],s instanceof lr?s:null}var Vi="__closure_events_fn_"+(1e9*Math.random()>>>0);function Eo(s){return typeof s=="function"?s:(s[Vi]||(s[Vi]=function(l){return s.handleEvent(l)}),s[Vi])}function me(){X.call(this),this.i=new lr(this),this.M=this,this.F=null}N(me,X),me.prototype[or]=!0,me.prototype.removeEventListener=function(s,l,u,p){vo(this,s,l,u,p)};function Te(s,l){var u,p=s.F;if(p)for(u=[];p;p=p.F)u.push(p);if(s=s.M,p=l.type||l,typeof l=="string")l=new re(l,s);else if(l instanceof re)l.target=l.target||s;else{var T=l;l=new re(p,s),E(l,T)}if(T=!0,u)for(var S=u.length-1;0<=S;S--){var D=l.g=u[S];T=cr(D,p,!0,l)&&T}if(D=l.g=s,T=cr(D,p,!0,l)&&T,T=cr(D,p,!1,l)&&T,u)for(S=0;S<u.length;S++)D=l.g=u[S],T=cr(D,p,!1,l)&&T}me.prototype.N=function(){if(me.aa.N.call(this),this.i){var s=this.i,l;for(l in s.g){for(var u=s.g[l],p=0;p<u.length;p++)ar(u[p]);delete s.g[l],s.h--}}this.F=null},me.prototype.K=function(s,l,u,p){return this.i.add(String(s),l,!1,u,p)},me.prototype.L=function(s,l,u,p){return this.i.add(String(s),l,!0,u,p)};function cr(s,l,u,p){if(l=s.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,S=0;S<l.length;++S){var D=l[S];if(D&&!D.da&&D.capture==u){var W=D.listener,ue=D.ha||D.src;D.fa&&ki(s.i,D),T=W.call(ue,p)!==!1&&T}}return T&&!p.defaultPrevented}function wo(s,l,u){if(typeof s=="function")u&&(s=w(s,u));else if(s&&typeof s.handleEvent=="function")s=w(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(s,l||0)}function bo(s){s.g=wo(()=>{s.g=null,s.i&&(s.i=!1,bo(s))},s.l);const l=s.h;s.h=null,s.m.apply(null,l)}class Du extends X{constructor(l,u){super(),this.m=l,this.l=u,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:bo(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function fn(s){X.call(this),this.h=s,this.g={}}N(fn,X);var Io=[];function To(s){A(s.g,function(l,u){this.g.hasOwnProperty(u)&&Oi(l)},s),s.g={}}fn.prototype.N=function(){fn.aa.N.call(this),To(this)},fn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Mi=c.JSON.stringify,Ou=c.JSON.parse,Lu=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function xi(){}xi.prototype.h=null;function Ao(s){return s.h||(s.h=s.i())}function So(){}var pn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function $i(){re.call(this,"d")}N($i,re);function Ui(){re.call(this,"c")}N(Ui,re);var bt={},Ro=null;function ur(){return Ro=Ro||new me}bt.La="serverreachability";function Po(s){re.call(this,bt.La,s)}N(Po,re);function mn(s){const l=ur();Te(l,new Po(l))}bt.STAT_EVENT="statevent";function ko(s,l){re.call(this,bt.STAT_EVENT,s),this.stat=l}N(ko,re);function Ae(s){const l=ur();Te(l,new ko(l,s))}bt.Ma="timingevent";function Co(s,l){re.call(this,bt.Ma,s),this.size=l}N(Co,re);function gn(s,l){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},l)}function yn(){this.g=!0}yn.prototype.xa=function(){this.g=!1};function Vu(s,l,u,p,T,S){s.info(function(){if(s.g)if(S)for(var D="",W=S.split("&"),ue=0;ue<W.length;ue++){var q=W[ue].split("=");if(1<q.length){var ge=q[0];q=q[1];var ye=ge.split("_");D=2<=ye.length&&ye[1]=="type"?D+(ge+"="+q+"&"):D+(ge+"=redacted&")}}else D=null;else D=S;return"XMLHTTP REQ ("+p+") [attempt "+T+"]: "+l+`
`+u+`
`+D})}function Mu(s,l,u,p,T,S,D){s.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+T+"]: "+l+`
`+u+`
`+S+" "+D})}function xt(s,l,u,p){s.info(function(){return"XMLHTTP TEXT ("+l+"): "+$u(s,u)+(p?" "+p:"")})}function xu(s,l){s.info(function(){return"TIMEOUT: "+l})}yn.prototype.info=function(){};function $u(s,l){if(!s.g)return l;if(!l)return null;try{var u=JSON.parse(l);if(u){for(s=0;s<u.length;s++)if(Array.isArray(u[s])){var p=u[s];if(!(2>p.length)){var T=p[1];if(Array.isArray(T)&&!(1>T.length)){var S=T[0];if(S!="noop"&&S!="stop"&&S!="close")for(var D=1;D<T.length;D++)T[D]=""}}}}return Mi(u)}catch{return l}}var dr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},No={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Fi;function hr(){}N(hr,xi),hr.prototype.g=function(){return new XMLHttpRequest},hr.prototype.i=function(){return{}},Fi=new hr;function it(s,l,u,p){this.j=s,this.i=l,this.l=u,this.R=p||1,this.U=new fn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Do}function Do(){this.i=null,this.g="",this.h=!1}var Oo={},ji={};function Bi(s,l,u){s.L=1,s.v=gr(He(l)),s.m=u,s.P=!0,Lo(s,null)}function Lo(s,l){s.F=Date.now(),fr(s),s.A=He(s.v);var u=s.A,p=s.R;Array.isArray(p)||(p=[String(p)]),Ko(u.i,"t",p),s.C=0,u=s.j.J,s.h=new Do,s.g=ha(s.j,u?l:null,!s.m),0<s.O&&(s.M=new Du(w(s.Y,s,s.g),s.O)),l=s.U,u=s.g,p=s.ca;var T="readystatechange";Array.isArray(T)||(T&&(Io[0]=T.toString()),T=Io);for(var S=0;S<T.length;S++){var D=yo(u,T[S],p||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,l)):(s.u="GET",s.g.ea(s.A,s.u,null,l)),mn(),Vu(s.i,s.u,s.A,s.l,s.R,s.m)}it.prototype.ca=function(s){s=s.target;const l=this.M;l&&ze(s)==3?l.j():this.Y(s)},it.prototype.Y=function(s){try{if(s==this.g)e:{const ye=ze(this.g);var l=this.g.Ba();const Ft=this.g.Z();if(!(3>ye)&&(ye!=3||this.g&&(this.h.h||this.g.oa()||ta(this.g)))){this.J||ye!=4||l==7||(l==8||0>=Ft?mn(3):mn(2)),qi(this);var u=this.g.Z();this.X=u;t:if(Vo(this)){var p=ta(this.g);s="";var T=p.length,S=ze(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){It(this),vn(this);var D="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,s+=this.h.i.decode(p[l],{stream:!(S&&l==T-1)});p.length=0,this.h.g+=s,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=u==200,Mu(this.i,this.u,this.A,this.l,this.R,ye,u),this.o){if(this.T&&!this.K){t:{if(this.g){var W,ue=this.g;if((W=ue.g?ue.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!H(W)){var q=W;break t}}q=null}if(u=q)xt(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Hi(this,u);else{this.o=!1,this.s=3,Ae(12),It(this),vn(this);break e}}if(this.P){u=!0;let Le;for(;!this.J&&this.C<D.length;)if(Le=Uu(this,D),Le==ji){ye==4&&(this.s=4,Ae(14),u=!1),xt(this.i,this.l,null,"[Incomplete Response]");break}else if(Le==Oo){this.s=4,Ae(15),xt(this.i,this.l,D,"[Invalid Chunk]"),u=!1;break}else xt(this.i,this.l,Le,null),Hi(this,Le);if(Vo(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ye!=4||D.length!=0||this.h.h||(this.s=1,Ae(16),u=!1),this.o=this.o&&u,!u)xt(this.i,this.l,D,"[Invalid Chunked Response]"),It(this),vn(this);else if(0<D.length&&!this.W){this.W=!0;var ge=this.j;ge.g==this&&ge.ba&&!ge.M&&(ge.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),Qi(ge),ge.M=!0,Ae(11))}}else xt(this.i,this.l,D,null),Hi(this,D);ye==4&&It(this),this.o&&!this.J&&(ye==4?la(this.j,this):(this.o=!1,fr(this)))}else nd(this.g),u==400&&0<D.indexOf("Unknown SID")?(this.s=3,Ae(12)):(this.s=0,Ae(13)),It(this),vn(this)}}}catch{}finally{}};function Vo(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function Uu(s,l){var u=s.C,p=l.indexOf(`
`,u);return p==-1?ji:(u=Number(l.substring(u,p)),isNaN(u)?Oo:(p+=1,p+u>l.length?ji:(l=l.slice(p,p+u),s.C=p+u,l)))}it.prototype.cancel=function(){this.J=!0,It(this)};function fr(s){s.S=Date.now()+s.I,Mo(s,s.I)}function Mo(s,l){if(s.B!=null)throw Error("WatchDog timer not null");s.B=gn(w(s.ba,s),l)}function qi(s){s.B&&(c.clearTimeout(s.B),s.B=null)}it.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(xu(this.i,this.A),this.L!=2&&(mn(),Ae(17)),It(this),this.s=2,vn(this)):Mo(this,this.S-s)};function vn(s){s.j.G==0||s.J||la(s.j,s)}function It(s){qi(s);var l=s.M;l&&typeof l.ma=="function"&&l.ma(),s.M=null,To(s.U),s.g&&(l=s.g,s.g=null,l.abort(),l.ma())}function Hi(s,l){try{var u=s.j;if(u.G!=0&&(u.g==s||zi(u.h,s))){if(!s.K&&zi(u.h,s)&&u.G==3){try{var p=u.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var T=p;if(T[0]==0){e:if(!u.u){if(u.g)if(u.g.F+3e3<s.F)br(u),Er(u);else break e;Ji(u),Ae(18)}}else u.za=T[1],0<u.za-u.T&&37500>T[2]&&u.F&&u.v==0&&!u.C&&(u.C=gn(w(u.Za,u),6e3));if(1>=Uo(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else At(u,11)}else if((s.K||u.g==s)&&br(u),!H(l))for(T=u.Da.g.parse(l),l=0;l<T.length;l++){let q=T[l];if(u.T=q[0],q=q[1],u.G==2)if(q[0]=="c"){u.K=q[1],u.ia=q[2];const ge=q[3];ge!=null&&(u.la=ge,u.j.info("VER="+u.la));const ye=q[4];ye!=null&&(u.Aa=ye,u.j.info("SVER="+u.Aa));const Ft=q[5];Ft!=null&&typeof Ft=="number"&&0<Ft&&(p=1.5*Ft,u.L=p,u.j.info("backChannelRequestTimeoutMs_="+p)),p=u;const Le=s.g;if(Le){const Tr=Le.g?Le.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Tr){var S=p.h;S.g||Tr.indexOf("spdy")==-1&&Tr.indexOf("quic")==-1&&Tr.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Gi(S,S.h),S.h=null))}if(p.D){const Xi=Le.g?Le.g.getResponseHeader("X-HTTP-Session-Id"):null;Xi&&(p.ya=Xi,Q(p.I,p.D,Xi))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-s.F,u.j.info("Handshake RTT: "+u.R+"ms")),p=u;var D=s;if(p.qa=da(p,p.J?p.ia:null,p.W),D.K){Fo(p.h,D);var W=D,ue=p.L;ue&&(W.I=ue),W.B&&(qi(W),fr(W)),p.g=D}else oa(p);0<u.i.length&&wr(u)}else q[0]!="stop"&&q[0]!="close"||At(u,7);else u.G==3&&(q[0]=="stop"||q[0]=="close"?q[0]=="stop"?At(u,7):Ki(u):q[0]!="noop"&&u.l&&u.l.ta(q),u.v=0)}}mn(4)}catch{}}var Fu=class{constructor(s,l){this.g=s,this.map=l}};function xo(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function $o(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Uo(s){return s.h?1:s.g?s.g.size:0}function zi(s,l){return s.h?s.h==l:s.g?s.g.has(l):!1}function Gi(s,l){s.g?s.g.add(l):s.h=l}function Fo(s,l){s.h&&s.h==l?s.h=null:s.g&&s.g.has(l)&&s.g.delete(l)}xo.prototype.cancel=function(){if(this.i=jo(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function jo(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let l=s.i;for(const u of s.g.values())l=l.concat(u.D);return l}return L(s.i)}function ju(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map!="undefined"&&s instanceof Map||typeof Set!="undefined"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(d(s)){for(var l=[],u=s.length,p=0;p<u;p++)l.push(s[p]);return l}l=[],u=0;for(p in s)l[u++]=s[p];return l}function Bu(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map!="undefined"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set!="undefined"&&s instanceof Set)){if(d(s)||typeof s=="string"){var l=[];s=s.length;for(var u=0;u<s;u++)l.push(u);return l}l=[],u=0;for(const p in s)l[u++]=p;return l}}}function Bo(s,l){if(s.forEach&&typeof s.forEach=="function")s.forEach(l,void 0);else if(d(s)||typeof s=="string")Array.prototype.forEach.call(s,l,void 0);else for(var u=Bu(s),p=ju(s),T=p.length,S=0;S<T;S++)l.call(void 0,p[S],u&&u[S],s)}var qo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function qu(s,l){if(s){s=s.split("&");for(var u=0;u<s.length;u++){var p=s[u].indexOf("="),T=null;if(0<=p){var S=s[u].substring(0,p);T=s[u].substring(p+1)}else S=s[u];l(S,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Tt(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof Tt){this.h=s.h,pr(this,s.j),this.o=s.o,this.g=s.g,mr(this,s.s),this.l=s.l;var l=s.i,u=new wn;u.i=l.i,l.g&&(u.g=new Map(l.g),u.h=l.h),Ho(this,u),this.m=s.m}else s&&(l=String(s).match(qo))?(this.h=!1,pr(this,l[1]||"",!0),this.o=_n(l[2]||""),this.g=_n(l[3]||"",!0),mr(this,l[4]),this.l=_n(l[5]||"",!0),Ho(this,l[6]||"",!0),this.m=_n(l[7]||"")):(this.h=!1,this.i=new wn(null,this.h))}Tt.prototype.toString=function(){var s=[],l=this.j;l&&s.push(En(l,zo,!0),":");var u=this.g;return(u||l=="file")&&(s.push("//"),(l=this.o)&&s.push(En(l,zo,!0),"@"),s.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&s.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&s.push("/"),s.push(En(u,u.charAt(0)=="/"?Gu:zu,!0))),(u=this.i.toString())&&s.push("?",u),(u=this.m)&&s.push("#",En(u,Ku)),s.join("")};function He(s){return new Tt(s)}function pr(s,l,u){s.j=u?_n(l,!0):l,s.j&&(s.j=s.j.replace(/:$/,""))}function mr(s,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);s.s=l}else s.s=null}function Ho(s,l,u){l instanceof wn?(s.i=l,Ju(s.i,s.h)):(u||(l=En(l,Wu)),s.i=new wn(l,s.h))}function Q(s,l,u){s.i.set(l,u)}function gr(s){return Q(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function _n(s,l){return s?l?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function En(s,l,u){return typeof s=="string"?(s=encodeURI(s).replace(l,Hu),u&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Hu(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var zo=/[#\/\?@]/g,zu=/[#\?:]/g,Gu=/[#\?]/g,Wu=/[#\?@]/g,Ku=/#/g;function wn(s,l){this.h=this.g=null,this.i=s||null,this.j=!!l}function st(s){s.g||(s.g=new Map,s.h=0,s.i&&qu(s.i,function(l,u){s.add(decodeURIComponent(l.replace(/\+/g," ")),u)}))}n=wn.prototype,n.add=function(s,l){st(this),this.i=null,s=$t(this,s);var u=this.g.get(s);return u||this.g.set(s,u=[]),u.push(l),this.h+=1,this};function Go(s,l){st(s),l=$t(s,l),s.g.has(l)&&(s.i=null,s.h-=s.g.get(l).length,s.g.delete(l))}function Wo(s,l){return st(s),l=$t(s,l),s.g.has(l)}n.forEach=function(s,l){st(this),this.g.forEach(function(u,p){u.forEach(function(T){s.call(l,T,p,this)},this)},this)},n.na=function(){st(this);const s=Array.from(this.g.values()),l=Array.from(this.g.keys()),u=[];for(let p=0;p<l.length;p++){const T=s[p];for(let S=0;S<T.length;S++)u.push(l[p])}return u},n.V=function(s){st(this);let l=[];if(typeof s=="string")Wo(this,s)&&(l=l.concat(this.g.get($t(this,s))));else{s=Array.from(this.g.values());for(let u=0;u<s.length;u++)l=l.concat(s[u])}return l},n.set=function(s,l){return st(this),this.i=null,s=$t(this,s),Wo(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[l]),this.h+=1,this},n.get=function(s,l){return s?(s=this.V(s),0<s.length?String(s[0]):l):l};function Ko(s,l,u){Go(s,l),0<u.length&&(s.i=null,s.g.set($t(s,l),L(u)),s.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],l=Array.from(this.g.keys());for(var u=0;u<l.length;u++){var p=l[u];const S=encodeURIComponent(String(p)),D=this.V(p);for(p=0;p<D.length;p++){var T=S;D[p]!==""&&(T+="="+encodeURIComponent(String(D[p]))),s.push(T)}}return this.i=s.join("&")};function $t(s,l){return l=String(l),s.j&&(l=l.toLowerCase()),l}function Ju(s,l){l&&!s.j&&(st(s),s.i=null,s.g.forEach(function(u,p){var T=p.toLowerCase();p!=T&&(Go(this,p),Ko(this,T,u))},s)),s.j=l}function Qu(s,l){const u=new yn;if(c.Image){const p=new Image;p.onload=R(ot,u,"TestLoadImage: loaded",!0,l,p),p.onerror=R(ot,u,"TestLoadImage: error",!1,l,p),p.onabort=R(ot,u,"TestLoadImage: abort",!1,l,p),p.ontimeout=R(ot,u,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=s}else l(!1)}function Xu(s,l){const u=new yn,p=new AbortController,T=setTimeout(()=>{p.abort(),ot(u,"TestPingServer: timeout",!1,l)},1e4);fetch(s,{signal:p.signal}).then(S=>{clearTimeout(T),S.ok?ot(u,"TestPingServer: ok",!0,l):ot(u,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),ot(u,"TestPingServer: error",!1,l)})}function ot(s,l,u,p,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),p(u)}catch{}}function Yu(){this.g=new Lu}function Zu(s,l,u){const p=u||"";try{Bo(s,function(T,S){let D=T;h(T)&&(D=Mi(T)),l.push(p+S+"="+encodeURIComponent(D))})}catch(T){throw l.push(p+"type="+encodeURIComponent("_badmap")),T}}function yr(s){this.l=s.Ub||null,this.j=s.eb||!1}N(yr,xi),yr.prototype.g=function(){return new vr(this.l,this.j)},yr.prototype.i=function(s){return function(){return s}}({});function vr(s,l){me.call(this),this.D=s,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}N(vr,me),n=vr.prototype,n.open=function(s,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=l,this.readyState=1,In(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(l.body=s),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,bn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,In(this)),this.g&&(this.readyState=3,In(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Jo(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Jo(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var l=s.value?s.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!s.done}))&&(this.response=this.responseText+=l)}s.done?bn(this):In(this),this.readyState==3&&Jo(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,bn(this))},n.Qa=function(s){this.g&&(this.response=s,bn(this))},n.ga=function(){this.g&&bn(this)};function bn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,In(s)}n.setRequestHeader=function(s,l){this.u.append(s,l)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],l=this.h.entries();for(var u=l.next();!u.done;)u=u.value,s.push(u[0]+": "+u[1]),u=l.next();return s.join(`\r
`)};function In(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(vr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Qo(s){let l="";return A(s,function(u,p){l+=p,l+=":",l+=u,l+=`\r
`}),l}function Wi(s,l,u){e:{for(p in u){var p=!1;break e}p=!0}p||(u=Qo(u),typeof s=="string"?u!=null&&encodeURIComponent(String(u)):Q(s,l,u))}function te(s){me.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}N(te,me);var ed=/^https?$/i,td=["POST","PUT"];n=te.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,l,u,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);l=l?l.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Fi.g(),this.v=this.o?Ao(this.o):Ao(Fi),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(l,String(s),!0),this.B=!1}catch(S){Xo(this,S);return}if(s=u||"",u=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var T in p)u.set(T,p[T]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const S of p.keys())u.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(u.keys()).find(S=>S.toLowerCase()=="content-type"),T=c.FormData&&s instanceof c.FormData,!(0<=Array.prototype.indexOf.call(td,l,void 0))||p||T||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,D]of u)this.g.setRequestHeader(S,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ea(this),this.u=!0,this.g.send(s),this.u=!1}catch(S){Xo(this,S)}};function Xo(s,l){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=l,s.m=5,Yo(s),_r(s)}function Yo(s){s.A||(s.A=!0,Te(s,"complete"),Te(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,Te(this,"complete"),Te(this,"abort"),_r(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),_r(this,!0)),te.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Zo(this):this.bb())},n.bb=function(){Zo(this)};function Zo(s){if(s.h&&typeof a!="undefined"&&(!s.v[1]||ze(s)!=4||s.Z()!=2)){if(s.u&&ze(s)==4)wo(s.Ea,0,s);else if(Te(s,"readystatechange"),ze(s)==4){s.h=!1;try{const D=s.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var u;if(!(u=l)){var p;if(p=D===0){var T=String(s.D).match(qo)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),p=!ed.test(T?T.toLowerCase():"")}u=p}if(u)Te(s,"complete"),Te(s,"success");else{s.m=6;try{var S=2<ze(s)?s.g.statusText:""}catch{S=""}s.l=S+" ["+s.Z()+"]",Yo(s)}}finally{_r(s)}}}}function _r(s,l){if(s.g){ea(s);const u=s.g,p=s.v[0]?()=>{}:null;s.g=null,s.v=null,l||Te(s,"ready");try{u.onreadystatechange=p}catch{}}}function ea(s){s.I&&(c.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function ze(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<ze(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var l=this.g.responseText;return s&&l.indexOf(s)==0&&(l=l.substring(s.length)),Ou(l)}};function ta(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function nd(s){const l={};s=(s.g&&2<=ze(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<s.length;p++){if(H(s[p]))continue;var u=b(s[p]);const T=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const S=l[T]||[];l[T]=S,S.push(u)}v(l,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Tn(s,l,u){return u&&u.internalChannelParams&&u.internalChannelParams[s]||l}function na(s){this.Aa=0,this.i=[],this.j=new yn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Tn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Tn("baseRetryDelayMs",5e3,s),this.cb=Tn("retryDelaySeedMs",1e4,s),this.Wa=Tn("forwardChannelMaxRetries",2,s),this.wa=Tn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new xo(s&&s.concurrentRequestLimit),this.Da=new Yu,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=na.prototype,n.la=8,n.G=1,n.connect=function(s,l,u,p){Ae(0),this.W=s,this.H=l||{},u&&p!==void 0&&(this.H.OSID=u,this.H.OAID=p),this.F=this.X,this.I=da(this,null,this.W),wr(this)};function Ki(s){if(ra(s),s.G==3){var l=s.U++,u=He(s.I);if(Q(u,"SID",s.K),Q(u,"RID",l),Q(u,"TYPE","terminate"),An(s,u),l=new it(s,s.j,l),l.L=2,l.v=gr(He(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=l.v,u=!0),u||(l.g=ha(l.j,null),l.g.ea(l.v)),l.F=Date.now(),fr(l)}ua(s)}function Er(s){s.g&&(Qi(s),s.g.cancel(),s.g=null)}function ra(s){Er(s),s.u&&(c.clearTimeout(s.u),s.u=null),br(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&c.clearTimeout(s.s),s.s=null)}function wr(s){if(!$o(s.h)&&!s.s){s.s=!0;var l=s.Ga;tt||hn(),nt||(tt(),nt=!0),Mt.add(l,s),s.B=0}}function rd(s,l){return Uo(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=l.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=gn(w(s.Ga,s,l),ca(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const T=new it(this,this.j,s);let S=this.o;if(this.S&&(S?(S=m(S),E(S,this.S)):S=this.S),this.m!==null||this.O||(T.H=S,S=null),this.P)e:{for(var l=0,u=0;u<this.i.length;u++){t:{var p=this.i[u];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=u;break e}if(l===4096||u===this.i.length-1){l=u+1;break e}}l=1e3}else l=1e3;l=sa(this,T,l),u=He(this.I),Q(u,"RID",s),Q(u,"CVER",22),this.D&&Q(u,"X-HTTP-Session-Id",this.D),An(this,u),S&&(this.O?l="headers="+encodeURIComponent(String(Qo(S)))+"&"+l:this.m&&Wi(u,this.m,S)),Gi(this.h,T),this.Ua&&Q(u,"TYPE","init"),this.P?(Q(u,"$req",l),Q(u,"SID","null"),T.T=!0,Bi(T,u,null)):Bi(T,u,l),this.G=2}}else this.G==3&&(s?ia(this,s):this.i.length==0||$o(this.h)||ia(this))};function ia(s,l){var u;l?u=l.l:u=s.U++;const p=He(s.I);Q(p,"SID",s.K),Q(p,"RID",u),Q(p,"AID",s.T),An(s,p),s.m&&s.o&&Wi(p,s.m,s.o),u=new it(s,s.j,u,s.B+1),s.m===null&&(u.H=s.o),l&&(s.i=l.D.concat(s.i)),l=sa(s,u,1e3),u.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Gi(s.h,u),Bi(u,p,l)}function An(s,l){s.H&&A(s.H,function(u,p){Q(l,p,u)}),s.l&&Bo({},function(u,p){Q(l,p,u)})}function sa(s,l,u){u=Math.min(s.i.length,u);var p=s.l?w(s.l.Na,s.l,s):null;e:{var T=s.i;let S=-1;for(;;){const D=["count="+u];S==-1?0<u?(S=T[0].g,D.push("ofs="+S)):S=0:D.push("ofs="+S);let W=!0;for(let ue=0;ue<u;ue++){let q=T[ue].g;const ge=T[ue].map;if(q-=S,0>q)S=Math.max(0,T[ue].g-100),W=!1;else try{Zu(ge,D,"req"+q+"_")}catch{p&&p(ge)}}if(W){p=D.join("&");break e}}}return s=s.i.splice(0,u),l.D=s,p}function oa(s){if(!s.g&&!s.u){s.Y=1;var l=s.Fa;tt||hn(),nt||(tt(),nt=!0),Mt.add(l,s),s.v=0}}function Ji(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=gn(w(s.Fa,s),ca(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,aa(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=gn(w(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ae(10),Er(this),aa(this))};function Qi(s){s.A!=null&&(c.clearTimeout(s.A),s.A=null)}function aa(s){s.g=new it(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var l=He(s.qa);Q(l,"RID","rpc"),Q(l,"SID",s.K),Q(l,"AID",s.T),Q(l,"CI",s.F?"0":"1"),!s.F&&s.ja&&Q(l,"TO",s.ja),Q(l,"TYPE","xmlhttp"),An(s,l),s.m&&s.o&&Wi(l,s.m,s.o),s.L&&(s.g.I=s.L);var u=s.g;s=s.ia,u.L=1,u.v=gr(He(l)),u.m=null,u.P=!0,Lo(u,s)}n.Za=function(){this.C!=null&&(this.C=null,Er(this),Ji(this),Ae(19))};function br(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function la(s,l){var u=null;if(s.g==l){br(s),Qi(s),s.g=null;var p=2}else if(zi(s.h,l))u=l.D,Fo(s.h,l),p=1;else return;if(s.G!=0){if(l.o)if(p==1){u=l.m?l.m.length:0,l=Date.now()-l.F;var T=s.B;p=ur(),Te(p,new Co(p,u)),wr(s)}else oa(s);else if(T=l.s,T==3||T==0&&0<l.X||!(p==1&&rd(s,l)||p==2&&Ji(s)))switch(u&&0<u.length&&(l=s.h,l.i=l.i.concat(u)),T){case 1:At(s,5);break;case 4:At(s,10);break;case 3:At(s,6);break;default:At(s,2)}}}function ca(s,l){let u=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(u*=2),u*l}function At(s,l){if(s.j.info("Error code "+l),l==2){var u=w(s.fb,s),p=s.Xa;const T=!p;p=new Tt(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||pr(p,"https"),gr(p),T?Qu(p.toString(),u):Xu(p.toString(),u)}else Ae(2);s.G=0,s.l&&s.l.sa(l),ua(s),ra(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),Ae(2)):(this.j.info("Failed to ping google.com"),Ae(1))};function ua(s){if(s.G=0,s.ka=[],s.l){const l=jo(s.h);(l.length!=0||s.i.length!=0)&&(V(s.ka,l),V(s.ka,s.i),s.h.i.length=0,L(s.i),s.i.length=0),s.l.ra()}}function da(s,l,u){var p=u instanceof Tt?He(u):new Tt(u);if(p.g!="")l&&(p.g=l+"."+p.g),mr(p,p.s);else{var T=c.location;p=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var S=new Tt(null);p&&pr(S,p),l&&(S.g=l),T&&mr(S,T),u&&(S.l=u),p=S}return u=s.D,l=s.ya,u&&l&&Q(p,u,l),Q(p,"VER",s.la),An(s,p),p}function ha(s,l,u){if(l&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=s.Ca&&!s.pa?new te(new yr({eb:u})):new te(s.pa),l.Ha(s.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function fa(){}n=fa.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ir(){}Ir.prototype.g=function(s,l){return new Pe(s,l)};function Pe(s,l){me.call(this),this.g=new na(l),this.l=s,this.h=l&&l.messageUrlParams||null,s=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(s?s["X-WebChannel-Content-Type"]=l.messageContentType:s={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(s?s["X-WebChannel-Client-Profile"]=l.va:s={"X-WebChannel-Client-Profile":l.va}),this.g.S=s,(s=l&&l.Sb)&&!H(s)&&(this.g.m=s),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!H(l)&&(this.g.D=l,s=this.h,s!==null&&l in s&&(s=this.h,l in s&&delete s[l])),this.j=new Ut(this)}N(Pe,me),Pe.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Pe.prototype.close=function(){Ki(this.g)},Pe.prototype.o=function(s){var l=this.g;if(typeof s=="string"){var u={};u.__data__=s,s=u}else this.u&&(u={},u.__data__=Mi(s),s=u);l.i.push(new Fu(l.Ya++,s)),l.G==3&&wr(l)},Pe.prototype.N=function(){this.g.l=null,delete this.j,Ki(this.g),delete this.g,Pe.aa.N.call(this)};function pa(s){$i.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var l=s.__sm__;if(l){e:{for(const u in l){s=u;break e}s=void 0}(this.i=s)&&(s=this.i,l=l!==null&&s in l?l[s]:void 0),this.data=l}else this.data=s}N(pa,$i);function ma(){Ui.call(this),this.status=1}N(ma,Ui);function Ut(s){this.g=s}N(Ut,fa),Ut.prototype.ua=function(){Te(this.g,"a")},Ut.prototype.ta=function(s){Te(this.g,new pa(s))},Ut.prototype.sa=function(s){Te(this.g,new ma)},Ut.prototype.ra=function(){Te(this.g,"b")},Ir.prototype.createWebChannel=Ir.prototype.g,Pe.prototype.send=Pe.prototype.o,Pe.prototype.open=Pe.prototype.m,Pe.prototype.close=Pe.prototype.close,_c=function(){return new Ir},vc=function(){return ur()},yc=bt,ys={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},dr.NO_ERROR=0,dr.TIMEOUT=8,dr.HTTP_ERROR=6,Ur=dr,No.COMPLETE="complete",gc=No,So.EventType=pn,pn.OPEN="a",pn.CLOSE="b",pn.ERROR="c",pn.MESSAGE="d",me.prototype.listen=me.prototype.K,Cn=So,te.prototype.listenOnce=te.prototype.L,te.prototype.getLastError=te.prototype.Ka,te.prototype.getLastErrorCode=te.prototype.Ba,te.prototype.getStatus=te.prototype.Z,te.prototype.getResponseJson=te.prototype.Oa,te.prototype.getResponseText=te.prototype.oa,te.prototype.send=te.prototype.ea,te.prototype.setWithCredentials=te.prototype.Ha,mc=te}).apply(typeof Sr!="undefined"?Sr:typeof self!="undefined"?self:typeof window!="undefined"?window:{});const Wa="@firebase/firestore";/**
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
 */class _e{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}_e.UNAUTHENTICATED=new _e(null),_e.GOOGLE_CREDENTIALS=new _e("google-credentials-uid"),_e.FIRST_PARTY=new _e("first-party-uid"),_e.MOCK_USER=new _e("mock-user");/**
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
 */const Dt=new Ds("@firebase/firestore");function Sn(){return Dt.logLevel}function M(n,...e){if(Dt.logLevel<=F.DEBUG){const t=e.map(Hs);Dt.debug(`Firestore (${cn}): ${n}`,...t)}}function Ot(n,...e){if(Dt.logLevel<=F.ERROR){const t=e.map(Hs);Dt.error(`Firestore (${cn}): ${n}`,...t)}}function Zr(n,...e){if(Dt.logLevel<=F.WARN){const t=e.map(Hs);Dt.warn(`Firestore (${cn}): ${n}`,...t)}}function Hs(n){if(typeof n=="string")return n;try{/**
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
 */function j(n="Unexpected state"){const e=`FIRESTORE (${cn}) INTERNAL ASSERTION FAILED: `+n;throw Ot(e),new Error(e)}function ie(n,e){n||j()}function J(n,e){return n}/**
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
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class x extends Ye{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Pt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Ec{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Xp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(_e.UNAUTHENTICATED))}shutdown(){}}class Yp{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Zp{constructor(e){this.t=e,this.currentUser=_e.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ie(this.o===void 0);let r=this.i;const i=d=>this.i!==r?(r=this.i,t(d)):Promise.resolve();let o=new Pt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Pt,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const d=o;e.enqueueRetryable(async()=>{await d.promise,await i(this.currentUser)})},c=d=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(d=>c(d)),setTimeout(()=>{if(!this.auth){const d=this.t.getImmediate({optional:!0});d?c(d):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Pt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ie(typeof r.accessToken=="string"),new Ec(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ie(e===null||typeof e=="string"),new _e(e)}}class em{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=_e.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class tm{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new em(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(_e.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class nm{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class rm{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){ie(this.o===void 0);const r=o=>{o.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,M("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};const i=o=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?i(o):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ie(typeof t.token=="string"),this.R=t.token,new nm(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function im(n){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class wc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=im(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<t&&(r+=e.charAt(i[o]%e.length))}return r}}function K(n,e){return n<e?-1:n>e?1:0}function Zt(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
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
 */class ce{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new x(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new x(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new x(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new x(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ce.fromMillis(Date.now())}static fromDate(e){return ce.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new ce(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class Z{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Z(e)}static min(){return new Z(new ce(0,0))}static max(){return new Z(new ce(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Fn{constructor(e,t,r){t===void 0?t=0:t>e.length&&j(),r===void 0?r=e.length-t:r>e.length-t&&j(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Fn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Fn?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const o=e.get(i),a=t.get(i);if(o<a)return-1;if(o>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ne extends Fn{construct(e,t,r){return new ne(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new x(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new ne(t)}static emptyPath(){return new ne([])}}const sm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class fe extends Fn{construct(e,t,r){return new fe(e,t,r)}static isValidIdentifier(e){return sm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),fe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new fe(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const o=()=>{if(r.length===0)throw new x(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new x(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const d=e[i+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new x(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=d,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(o(),i++)}if(o(),a)throw new x(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new fe(t)}static emptyPath(){return new fe([])}}/**
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
 */class U{constructor(e){this.path=e}static fromPath(e){return new U(ne.fromString(e))}static fromName(e){return new U(ne.fromString(e).popFirst(5))}static empty(){return new U(ne.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ne.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ne.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new U(new ne(e.slice()))}}function om(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=Z.fromTimestamp(r===1e9?new ce(t+1,0):new ce(t,r));return new yt(i,U.empty(),e)}function am(n){return new yt(n.readTime,n.key,-1)}class yt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new yt(Z.min(),U.empty(),-1)}static max(){return new yt(Z.max(),U.empty(),-1)}}function lm(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=U.comparator(n.documentKey,e.documentKey),t!==0?t:K(n.largestBatchId,e.largestBatchId))}/**
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
 */const cm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class um{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function bc(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==cm)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class k{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&j(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new k((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof k?t:k.resolve(t)}catch(t){return k.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):k.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):k.reject(t)}static resolve(e){return new k((t,r)=>{t(e)})}static reject(e){return new k((t,r)=>{r(e)})}static waitFor(e){return new k((t,r)=>{let i=0,o=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++o,a&&o===i&&t()},d=>r(d))}),a=!0,o===i&&t()})}static or(e){let t=k.resolve(!1);for(const r of e)t=t.next(i=>i?k.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,o)=>{r.push(t.call(this,i,o))}),this.waitFor(r)}static mapArray(e,t){return new k((r,i)=>{const o=e.length,a=new Array(o);let c=0;for(let d=0;d<o;d++){const h=d;t(e[h]).next(f=>{a[h]=f,++c,c===o&&r(a)},f=>i(f))}})}static doWhile(e,t){return new k((r,i)=>{const o=()=>{e()===!0?t().next(()=>{o()},i):r()};o()})}}function dm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function pi(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Ic{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Ic.oe=-1;function zs(n){return n==null}function ei(n){return n===0&&1/n==-1/0}function hm(n){return typeof n=="number"&&Number.isInteger(n)&&!ei(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */function Ka(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function un(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Tc(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Se{constructor(e,t){this.comparator=e,this.root=t||de.EMPTY}insert(e,t){return new Se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,de.BLACK,null,null))}remove(e){return new Se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,de.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Rr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Rr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Rr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Rr(this.root,e,this.comparator,!0)}}class Rr{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&i&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class de{constructor(e,t,r,i,o){this.key=e,this.value=t,this.color=r!=null?r:de.RED,this.left=i!=null?i:de.EMPTY,this.right=o!=null?o:de.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,o){return new de(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,o!=null?o:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const o=r(e,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(e,t,r),null):o===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return de.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return de.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,de.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,de.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw j();const e=this.left.check();if(e!==this.right.check())throw j();return e+(this.isRed()?0:1)}}de.EMPTY=null,de.RED=!0,de.BLACK=!1;de.EMPTY=new class{constructor(){this.size=0}get key(){throw j()}get value(){throw j()}get color(){throw j()}get left(){throw j()}get right(){throw j()}copy(e,t,r,i,o){return this}insert(e,t,r){return new de(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class we{constructor(e){this.comparator=e,this.data=new Se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ja(this.data.getIterator())}getIteratorFrom(e){return new Ja(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof we)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new we(this.comparator);return t.data=e,t}}class Ja{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ce{constructor(e){this.fields=e,e.sort(fe.comparator)}static empty(){return new Ce([])}unionWith(e){let t=new we(fe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ce(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Zt(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class fm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Be{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(o){throw typeof DOMException!="undefined"&&o instanceof DOMException?new fm("Invalid base64 string: "+o):o}}(e);return new Be(t)}static fromUint8Array(e){const t=function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o}(e);return new Be(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Be.EMPTY_BYTE_STRING=new Be("");const pm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Lt(n){if(ie(!!n),typeof n=="string"){let e=0;const t=pm.exec(n);if(ie(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:he(n.seconds),nanos:he(n.nanos)}}function he(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function jn(n){return typeof n=="string"?Be.fromBase64String(n):Be.fromUint8Array(n)}/**
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
 */function Gs(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Ac(n){const e=n.mapValue.fields.__previous_value__;return Gs(e)?Ac(e):e}function ti(n){const e=Lt(n.mapValue.fields.__local_write_time__.timestampValue);return new ce(e.seconds,e.nanos)}/**
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
 */class mm{constructor(e,t,r,i,o,a,c,d,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=d,this.useFetchStreams=h}}class ni{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ni("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ni&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Pr={mapValue:{}};function en(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Gs(n)?4:ym(n)?9007199254740991:gm(n)?10:11:j()}function qe(n,e){if(n===e)return!0;const t=en(n);if(t!==en(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ti(n).isEqual(ti(e));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const a=Lt(i.timestampValue),c=Lt(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,o){return jn(i.bytesValue).isEqual(jn(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,o){return he(i.geoPointValue.latitude)===he(o.geoPointValue.latitude)&&he(i.geoPointValue.longitude)===he(o.geoPointValue.longitude)}(n,e);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return he(i.integerValue)===he(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const a=he(i.doubleValue),c=he(o.doubleValue);return a===c?ei(a)===ei(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Zt(n.arrayValue.values||[],e.arrayValue.values||[],qe);case 10:case 11:return function(i,o){const a=i.mapValue.fields||{},c=o.mapValue.fields||{};if(Ka(a)!==Ka(c))return!1;for(const d in a)if(a.hasOwnProperty(d)&&(c[d]===void 0||!qe(a[d],c[d])))return!1;return!0}(n,e);default:return j()}}function Bn(n,e){return(n.values||[]).find(t=>qe(t,e))!==void 0}function tn(n,e){if(n===e)return 0;const t=en(n),r=en(e);if(t!==r)return K(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(n.booleanValue,e.booleanValue);case 2:return function(o,a){const c=he(o.integerValue||o.doubleValue),d=he(a.integerValue||a.doubleValue);return c<d?-1:c>d?1:c===d?0:isNaN(c)?isNaN(d)?0:-1:1}(n,e);case 3:return Qa(n.timestampValue,e.timestampValue);case 4:return Qa(ti(n),ti(e));case 5:return K(n.stringValue,e.stringValue);case 6:return function(o,a){const c=jn(o),d=jn(a);return c.compareTo(d)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){const c=o.split("/"),d=a.split("/");for(let h=0;h<c.length&&h<d.length;h++){const f=K(c[h],d[h]);if(f!==0)return f}return K(c.length,d.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){const c=K(he(o.latitude),he(a.latitude));return c!==0?c:K(he(o.longitude),he(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Xa(n.arrayValue,e.arrayValue);case 10:return function(o,a){var c,d,h,f;const g=o.fields||{},w=a.fields||{},R=(c=g.value)===null||c===void 0?void 0:c.arrayValue,N=(d=w.value)===null||d===void 0?void 0:d.arrayValue,L=K(((h=R==null?void 0:R.values)===null||h===void 0?void 0:h.length)||0,((f=N==null?void 0:N.values)===null||f===void 0?void 0:f.length)||0);return L!==0?L:Xa(R,N)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===Pr.mapValue&&a===Pr.mapValue)return 0;if(o===Pr.mapValue)return 1;if(a===Pr.mapValue)return-1;const c=o.fields||{},d=Object.keys(c),h=a.fields||{},f=Object.keys(h);d.sort(),f.sort();for(let g=0;g<d.length&&g<f.length;++g){const w=K(d[g],f[g]);if(w!==0)return w;const R=tn(c[d[g]],h[f[g]]);if(R!==0)return R}return K(d.length,f.length)}(n.mapValue,e.mapValue);default:throw j()}}function Qa(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return K(n,e);const t=Lt(n),r=Lt(e),i=K(t.seconds,r.seconds);return i!==0?i:K(t.nanos,r.nanos)}function Xa(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const o=tn(t[i],r[i]);if(o)return o}return K(t.length,r.length)}function nn(n){return vs(n)}function vs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Lt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return jn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return U.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const o of t.values||[])i?i=!1:r+=",",r+=vs(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${vs(t.fields[a])}`;return i+"}"}(n.mapValue):j()}function _s(n){return!!n&&"integerValue"in n}function Ws(n){return!!n&&"arrayValue"in n}function Fr(n){return!!n&&"mapValue"in n}function gm(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function On(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return un(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=On(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=On(n.arrayValue.values[t]);return e}return Object.assign({},n)}function ym(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class ke{constructor(e){this.value=e}static empty(){return new ke({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Fr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=On(t)}setAll(e){let t=fe.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const d=this.getFieldsMap(t);this.applyChanges(d,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=On(a):i.push(c.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,r,i)}delete(e){const t=this.field(e.popLast());Fr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return qe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Fr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){un(t,(i,o)=>e[i]=o);for(const i of r)delete e[i]}clone(){return new ke(On(this.value))}}function Sc(n){const e=[];return un(n.fields,(t,r)=>{const i=new fe([t]);if(Fr(r)){const o=Sc(r.mapValue).fields;if(o.length===0)e.push(i);else for(const a of o)e.push(i.child(a))}else e.push(i)}),new Ce(e)}/**
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
 */class Me{constructor(e,t,r,i,o,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Me(e,0,Z.min(),Z.min(),Z.min(),ke.empty(),0)}static newFoundDocument(e,t,r,i){return new Me(e,1,t,Z.min(),r,i,0)}static newNoDocument(e,t){return new Me(e,2,t,Z.min(),Z.min(),ke.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,Z.min(),Z.min(),ke.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ke.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ke.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class ri{constructor(e,t){this.position=e,this.inclusive=t}}function Ya(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const o=e[i],a=n.position[i];if(o.field.isKeyField()?r=U.comparator(U.fromName(a.referenceValue),t.key):r=tn(a,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Za(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!qe(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class ii{constructor(e,t="asc"){this.field=e,this.dir=t}}function vm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Rc{}class le extends Rc{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Em(e,t,r):t==="array-contains"?new Im(e,r):t==="in"?new Tm(e,r):t==="not-in"?new Am(e,r):t==="array-contains-any"?new Sm(e,r):new le(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new wm(e,r):new bm(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(tn(t,this.value)):t!==null&&en(this.value)===en(t)&&this.matchesComparison(tn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return j()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class vt extends Rc{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new vt(e,t)}matches(e){return Pc(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Pc(n){return n.op==="and"}function kc(n){return _m(n)&&Pc(n)}function _m(n){for(const e of n.filters)if(e instanceof vt)return!1;return!0}function Es(n){if(n instanceof le)return n.field.canonicalString()+n.op.toString()+nn(n.value);if(kc(n))return n.filters.map(e=>Es(e)).join(",");{const e=n.filters.map(t=>Es(t)).join(",");return`${n.op}(${e})`}}function Cc(n,e){return n instanceof le?function(r,i){return i instanceof le&&r.op===i.op&&r.field.isEqual(i.field)&&qe(r.value,i.value)}(n,e):n instanceof vt?function(r,i){return i instanceof vt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,a,c)=>o&&Cc(a,i.filters[c]),!0):!1}(n,e):void j()}function Nc(n){return n instanceof le?function(t){return`${t.field.canonicalString()} ${t.op} ${nn(t.value)}`}(n):n instanceof vt?function(t){return t.op.toString()+" {"+t.getFilters().map(Nc).join(" ,")+"}"}(n):"Filter"}class Em extends le{constructor(e,t,r){super(e,t,r),this.key=U.fromName(r.referenceValue)}matches(e){const t=U.comparator(e.key,this.key);return this.matchesComparison(t)}}class wm extends le{constructor(e,t){super(e,"in",t),this.keys=Dc("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class bm extends le{constructor(e,t){super(e,"not-in",t),this.keys=Dc("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Dc(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>U.fromName(r.referenceValue))}class Im extends le{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ws(t)&&Bn(t.arrayValue,this.value)}}class Tm extends le{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Bn(this.value.arrayValue,t)}}class Am extends le{constructor(e,t){super(e,"not-in",t)}matches(e){if(Bn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Bn(this.value.arrayValue,t)}}class Sm extends le{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ws(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Bn(this.value.arrayValue,r))}}/**
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
 */class Rm{constructor(e,t=null,r=[],i=[],o=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=a,this.endAt=c,this.ue=null}}function el(n,e=null,t=[],r=[],i=null,o=null,a=null){return new Rm(n,e,t,r,i,o,a)}function Ks(n){const e=J(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Es(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),zs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>nn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>nn(r)).join(",")),e.ue=t}return e.ue}function Js(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!vm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Cc(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Za(n.startAt,e.startAt)&&Za(n.endAt,e.endAt)}/**
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
 */class mi{constructor(e,t=null,r=[],i=[],o=null,a="F",c=null,d=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=d,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Pm(n,e,t,r,i,o,a,c){return new mi(n,e,t,r,i,o,a,c)}function km(n){return new mi(n)}function tl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Cm(n){return n.collectionGroup!==null}function Ln(n){const e=J(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new we(fe.comparator);return a.filters.forEach(d=>{d.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new ii(o,r))}),t.has(fe.keyField().canonicalString())||e.ce.push(new ii(fe.keyField(),r))}return e.ce}function kt(n){const e=J(n);return e.le||(e.le=Nm(e,Ln(n))),e.le}function Nm(n,e){if(n.limitType==="F")return el(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new ii(i.field,o)});const t=n.endAt?new ri(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new ri(n.startAt.position,n.startAt.inclusive):null;return el(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ws(n,e,t){return new mi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Oc(n,e){return Js(kt(n),kt(e))&&n.limitType===e.limitType}function Lc(n){return`${Ks(kt(n))}|lt:${n.limitType}`}function Rn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Nc(i)).join(", ")}]`),zs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>nn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>nn(i)).join(",")),`Target(${r})`}(kt(n))}; limitType=${n.limitType})`}function Qs(n,e){return e.isFoundDocument()&&function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):U.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,i){for(const o of Ln(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,c,d){const h=Ya(a,c,d);return a.inclusive?h<=0:h<0}(r.startAt,Ln(r),i)||r.endAt&&!function(a,c,d){const h=Ya(a,c,d);return a.inclusive?h>=0:h>0}(r.endAt,Ln(r),i))}(n,e)}function Dm(n){return(e,t)=>{let r=!1;for(const i of Ln(n)){const o=Om(i,e,t);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function Om(n,e,t){const r=n.field.isKeyField()?U.comparator(e.key,t.key):function(o,a,c){const d=a.data.field(o),h=c.data.field(o);return d!==null&&h!==null?tn(d,h):j()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return j()}}/**
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
 */class dn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,o]of r)if(this.equalsFn(i,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],e))return void(i[o]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){un(this.inner,(t,r)=>{for(const[i,o]of r)e(i,o)})}isEmpty(){return Tc(this.inner)}size(){return this.innerSize}}/**
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
 */const Lm=new Se(U.comparator);function si(){return Lm}const Vc=new Se(U.comparator);function kr(...n){let e=Vc;for(const t of n)e=e.insert(t.key,t);return e}function Mc(n){let e=Vc;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Rt(){return Vn()}function xc(){return Vn()}function Vn(){return new dn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Vm=new Se(U.comparator),Mm=new we(U.comparator);function Ee(...n){let e=Mm;for(const t of n)e=e.add(t);return e}const xm=new we(K);function $m(){return xm}/**
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
 */function Xs(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ei(e)?"-0":e}}function $c(n){return{integerValue:""+n}}function Um(n,e){return hm(e)?$c(e):Xs(n,e)}/**
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
 */class gi{constructor(){this._=void 0}}function Fm(n,e,t){return n instanceof qn?function(i,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Gs(o)&&(o=Ac(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(t,e):n instanceof Hn?Fc(n,e):n instanceof zn?jc(n,e):function(i,o){const a=Uc(i,o),c=nl(a)+nl(i.Pe);return _s(a)&&_s(i.Pe)?$c(c):Xs(i.serializer,c)}(n,e)}function jm(n,e,t){return n instanceof Hn?Fc(n,e):n instanceof zn?jc(n,e):t}function Uc(n,e){return n instanceof oi?function(r){return _s(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}class qn extends gi{}class Hn extends gi{constructor(e){super(),this.elements=e}}function Fc(n,e){const t=Bc(e);for(const r of n.elements)t.some(i=>qe(i,r))||t.push(r);return{arrayValue:{values:t}}}class zn extends gi{constructor(e){super(),this.elements=e}}function jc(n,e){let t=Bc(e);for(const r of n.elements)t=t.filter(i=>!qe(i,r));return{arrayValue:{values:t}}}class oi extends gi{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function nl(n){return he(n.integerValue||n.doubleValue)}function Bc(n){return Ws(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class Bm{constructor(e,t){this.field=e,this.transform=t}}function qm(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Hn&&i instanceof Hn||r instanceof zn&&i instanceof zn?Zt(r.elements,i.elements,qe):r instanceof oi&&i instanceof oi?qe(r.Pe,i.Pe):r instanceof qn&&i instanceof qn}(n.transform,e.transform)}class Hm{constructor(e,t){this.version=e,this.transformResults=t}}class xe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new xe}static exists(e){return new xe(void 0,e)}static updateTime(e){return new xe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function jr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class yi{}function qc(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ys(n.key,xe.none()):new Yn(n.key,n.data,xe.none());{const t=n.data,r=ke.empty();let i=new we(fe.comparator);for(let o of e.fields)if(!i.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?r.delete(o):r.set(o,a),i=i.add(o)}return new wt(n.key,r,new Ce(i.toArray()),xe.none())}}function zm(n,e,t){n instanceof Yn?function(i,o,a){const c=i.value.clone(),d=il(i.fieldTransforms,o,a.transformResults);c.setAll(d),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof wt?function(i,o,a){if(!jr(i.precondition,o))return void o.convertToUnknownDocument(a.version);const c=il(i.fieldTransforms,o,a.transformResults),d=o.data;d.setAll(Hc(i)),d.setAll(c),o.convertToFoundDocument(a.version,d).setHasCommittedMutations()}(n,e,t):function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Mn(n,e,t,r){return n instanceof Yn?function(o,a,c,d){if(!jr(o.precondition,a))return c;const h=o.value.clone(),f=sl(o.fieldTransforms,d,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof wt?function(o,a,c,d){if(!jr(o.precondition,a))return c;const h=sl(o.fieldTransforms,d,a),f=a.data;return f.setAll(Hc(o)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(o,a,c){return jr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function Gm(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),o=Uc(r.transform,i||null);o!=null&&(t===null&&(t=ke.empty()),t.set(r.field,o))}return t||null}function rl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Zt(r,i,(o,a)=>qm(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Yn extends yi{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class wt extends yi{constructor(e,t,r,i,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Hc(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function il(n,e,t){const r=new Map;ie(n.length===t.length);for(let i=0;i<t.length;i++){const o=n[i],a=o.transform,c=e.data.field(o.field);r.set(o.field,jm(a,c,t[i]))}return r}function sl(n,e,t){const r=new Map;for(const i of n){const o=i.transform,a=t.data.field(i.field);r.set(i.field,Fm(o,a,e))}return r}class Ys extends yi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Wm extends yi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Km{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(e.key)&&zm(o,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Mn(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Mn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=xc();return this.mutations.forEach(i=>{const o=e.get(i.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=t.has(i.key)?null:c;const d=qc(a,c);d!==null&&r.set(i.key,d),a.isValidDocument()||a.convertToNoDocument(Z.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Ee())}isEqual(e){return this.batchId===e.batchId&&Zt(this.mutations,e.mutations,(t,r)=>rl(t,r))&&Zt(this.baseMutations,e.baseMutations,(t,r)=>rl(t,r))}}class Zs{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){ie(e.mutations.length===r.length);let i=function(){return Vm}();const o=e.mutations;for(let a=0;a<o.length;a++)i=i.insert(o[a].key,r[a].version);return new Zs(e,t,r,i)}}/**
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
 */class Jm{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */var se,B;function Qm(n){switch(n){default:return j();case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0}}function Xm(n){if(n===void 0)return Ot("GRPC error has no .code"),C.UNKNOWN;switch(n){case se.OK:return C.OK;case se.CANCELLED:return C.CANCELLED;case se.UNKNOWN:return C.UNKNOWN;case se.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case se.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case se.INTERNAL:return C.INTERNAL;case se.UNAVAILABLE:return C.UNAVAILABLE;case se.UNAUTHENTICATED:return C.UNAUTHENTICATED;case se.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case se.NOT_FOUND:return C.NOT_FOUND;case se.ALREADY_EXISTS:return C.ALREADY_EXISTS;case se.PERMISSION_DENIED:return C.PERMISSION_DENIED;case se.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case se.ABORTED:return C.ABORTED;case se.OUT_OF_RANGE:return C.OUT_OF_RANGE;case se.UNIMPLEMENTED:return C.UNIMPLEMENTED;case se.DATA_LOSS:return C.DATA_LOSS;default:return j()}}(B=se||(se={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new pc([4294967295,4294967295],0);class Ym{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function bs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Zm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function eg(n,e){return bs(n,e.toTimestamp())}function Qt(n){return ie(!!n),Z.fromTimestamp(function(t){const r=Lt(t);return new ce(r.seconds,r.nanos)}(n))}function zc(n,e){return Is(n,e).canonicalString()}function Is(n,e){const t=function(i){return new ne(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function tg(n){const e=ne.fromString(n);return ie(cg(e)),e}function Ts(n,e){return zc(n.databaseId,e.path)}function ng(n){const e=tg(n);return e.length===4?ne.emptyPath():ig(e)}function rg(n){return new ne(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ig(n){return ie(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function ol(n,e,t){return{name:Ts(n,e),fields:t.value.mapValue.fields}}function sg(n,e){let t;if(e instanceof Yn)t={update:ol(n,e.key,e.value)};else if(e instanceof Ys)t={delete:Ts(n,e.key)};else if(e instanceof wt)t={update:ol(n,e.key,e.data),updateMask:lg(e.fieldMask)};else{if(!(e instanceof Wm))return j();t={verify:Ts(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(o,a){const c=a.transform;if(c instanceof qn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Hn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof zn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof oi)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw j()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:eg(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:j()}(n,e.precondition)),t}function og(n,e){return n&&n.length>0?(ie(e!==void 0),n.map(t=>function(i,o){let a=i.updateTime?Qt(i.updateTime):Qt(o);return a.isEqual(Z.min())&&(a=Qt(o)),new Hm(a,i.transformResults||[])}(t,e))):[]}function ag(n){let e=ng(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){ie(r===1);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let o=[];t.where&&(o=function(g){const w=Gc(g);return w instanceof vt&&kc(w)?w.getFilters():[w]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(w=>function(N){return new ii(Ht(N.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(w))}(t.orderBy));let c=null;t.limit&&(c=function(g){let w;return w=typeof g=="object"?g.value:g,zs(w)?null:w}(t.limit));let d=null;t.startAt&&(d=function(g){const w=!!g.before,R=g.values||[];return new ri(R,w)}(t.startAt));let h=null;return t.endAt&&(h=function(g){const w=!g.before,R=g.values||[];return new ri(R,w)}(t.endAt)),Pm(e,i,a,o,c,"F",d,h)}function Gc(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Ht(t.unaryFilter.field);return le.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Ht(t.unaryFilter.field);return le.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ht(t.unaryFilter.field);return le.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ht(t.unaryFilter.field);return le.create(a,"!=",{nullValue:"NULL_VALUE"});default:return j()}}(n):n.fieldFilter!==void 0?function(t){return le.create(Ht(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return j()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return vt.create(t.compositeFilter.filters.map(r=>Gc(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return j()}}(t.compositeFilter.op))}(n):j()}function Ht(n){return fe.fromServerFormat(n.fieldPath)}function lg(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function cg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class ug{constructor(e){this.ct=e}}function dg(n){const e=ag({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ws(e,e.limit,"L"):e}/**
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
 */class hg{constructor(){this.un=new fg}addToCollectionParentIndex(e,t){return this.un.add(t),k.resolve()}getCollectionParents(e,t){return k.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return k.resolve()}deleteFieldIndex(e,t){return k.resolve()}deleteAllFieldIndexes(e){return k.resolve()}createTargetIndexes(e,t){return k.resolve()}getDocumentsMatchingTarget(e,t){return k.resolve(null)}getIndexType(e,t){return k.resolve(0)}getFieldIndexes(e,t){return k.resolve([])}getNextCollectionGroupToUpdate(e){return k.resolve(null)}getMinOffset(e,t){return k.resolve(yt.min())}getMinOffsetFromCollectionGroup(e,t){return k.resolve(yt.min())}updateCollectionGroup(e,t,r){return k.resolve()}updateIndexEntries(e,t){return k.resolve()}}class fg{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new we(ne.comparator),o=!i.has(r);return this.index[t]=i.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new we(ne.comparator)).toArray()}}/**
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
 */class pg{constructor(){this.changes=new dn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?k.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class mg{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class gg{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Mn(r.mutation,i,Ce.empty(),ce.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,Ee()).next(()=>r))}getLocalViewOfDocuments(e,t,r=Ee()){const i=Rt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(o=>{let a=kr();return o.forEach((c,d)=>{a=a.insert(c,d.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Rt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,Ee()))}populateOverlays(e,t,r){const i=[];return r.forEach(o=>{t.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(e,i).next(o=>{o.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,i){let o=si();const a=Vn(),c=function(){return Vn()}();return t.forEach((d,h)=>{const f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof wt)?o=o.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Mn(f.mutation,h,f.mutation.getFieldMask(),ce.now())):a.set(h.key,Ce.empty())}),this.recalculateAndSaveOverlays(e,o).next(d=>(d.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var g;return c.set(h,new mg(f,(g=a.get(h))!==null&&g!==void 0?g:null))}),c))}recalculateAndSaveOverlays(e,t){const r=Vn();let i=new Se((a,c)=>a-c),o=Ee();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(d=>{const h=t.get(d);if(h===null)return;let f=r.get(d)||Ce.empty();f=c.applyToLocalView(h,f),r.set(d,f);const g=(i.get(c.batchId)||Ee()).add(d);i=i.insert(c.batchId,g)})}).next(()=>{const a=[],c=i.getReverseIterator();for(;c.hasNext();){const d=c.getNext(),h=d.key,f=d.value,g=xc();f.forEach(w=>{if(!o.has(w)){const R=qc(t.get(w),r.get(w));R!==null&&g.set(w,R),o=o.add(w)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,g))}return k.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return U.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Cm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(o=>{const a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-o.size):k.resolve(Rt());let c=-1,d=o;return a.next(h=>k.forEach(h,(f,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),o.get(f)?k.resolve():this.remoteDocumentCache.getEntry(e,f).next(w=>{d=d.insert(f,w)}))).next(()=>this.populateOverlays(e,h,o)).next(()=>this.computeViews(e,d,h,Ee())).next(f=>({batchId:c,changes:Mc(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new U(t)).next(r=>{let i=kr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const o=t.collectionGroup;let a=kr();return this.indexManager.getCollectionParents(e,o).next(c=>k.forEach(c,d=>{const h=function(g,w){return new mi(w,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,d.child(o));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((g,w)=>{a=a.insert(g,w)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,i))).next(a=>{o.forEach((d,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Me.newInvalidDocument(f)))});let c=kr();return a.forEach((d,h)=>{const f=o.get(d);f!==void 0&&Mn(f.mutation,h,Ce.empty(),ce.now()),Qs(t,h)&&(c=c.insert(d,h))}),c})}}/**
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
 */class yg{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return k.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Qt(i.createTime)}}(t)),k.resolve()}getNamedQuery(e,t){return k.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:dg(i.bundledQuery),readTime:Qt(i.readTime)}}(t)),k.resolve()}}/**
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
 */class vg{constructor(){this.overlays=new Se(U.comparator),this.Ir=new Map}getOverlay(e,t){return k.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Rt();return k.forEach(t,i=>this.getOverlay(e,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,o)=>{this.ht(e,t,o)}),k.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),k.resolve()}getOverlaysForCollection(e,t,r){const i=Rt(),o=t.length+1,a=new U(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const d=c.getNext().value,h=d.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===o&&d.largestBatchId>r&&i.set(d.getKey(),d)}return k.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let o=new Se((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=o.get(h.largestBatchId);f===null&&(f=Rt(),o=o.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Rt(),d=o.getIterator();for(;d.hasNext()&&(d.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=i)););return k.resolve(c)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Jm(t,r));let o=this.Ir.get(t);o===void 0&&(o=Ee(),this.Ir.set(t,o)),this.Ir.set(t,o.add(r.key))}}/**
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
 */class _g{constructor(){this.sessionToken=Be.EMPTY_BYTE_STRING}getSessionToken(e){return k.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,k.resolve()}}/**
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
 */class eo{constructor(){this.Tr=new we(ae.Er),this.dr=new we(ae.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new ae(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new ae(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new U(new ne([])),r=new ae(t,e),i=new ae(t,e+1),o=[];return this.dr.forEachInRange([r,i],a=>{this.Vr(a),o.push(a.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new U(new ne([])),r=new ae(t,e),i=new ae(t,e+1);let o=Ee();return this.dr.forEachInRange([r,i],a=>{o=o.add(a.key)}),o}containsKey(e){const t=new ae(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ae{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return U.comparator(e.key,t.key)||K(e.wr,t.wr)}static Ar(e,t){return K(e.wr,t.wr)||U.comparator(e.key,t.key)}}/**
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
 */class Eg{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new we(ae.Er)}checkEmpty(e){return k.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Km(o,t,r,i);this.mutationQueue.push(a);for(const c of i)this.br=this.br.add(new ae(c.key,o)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return k.resolve(a)}lookupMutationBatch(e,t){return k.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),o=i<0?0:i;return k.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return k.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return k.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ae(t,0),i=new ae(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,i],a=>{const c=this.Dr(a.wr);o.push(c)}),k.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new we(K);return t.forEach(i=>{const o=new ae(i,0),a=new ae(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,a],c=>{r=r.add(c.wr)})}),k.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let o=r;U.isDocumentKey(o)||(o=o.child(""));const a=new ae(new U(o),0);let c=new we(K);return this.br.forEachWhile(d=>{const h=d.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(c=c.add(d.wr)),!0)},a),k.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){ie(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return k.forEach(t.mutations,i=>{const o=new ae(i.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new ae(t,0),i=this.br.firstAfterOrEqual(r);return k.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,k.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class wg{constructor(e){this.Mr=e,this.docs=function(){return new Se(U.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),o=i?i.size:0,a=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return k.resolve(r?r.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let r=si();return t.forEach(i=>{const o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():Me.newInvalidDocument(i))}),k.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let o=si();const a=t.path,c=new U(a.child("")),d=this.docs.getIteratorFrom(c);for(;d.hasNext();){const{key:h,value:{document:f}}=d.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||lm(am(f),r)<=0||(i.has(f.key)||Qs(t,f))&&(o=o.insert(f.key,f.mutableCopy()))}return k.resolve(o)}getAllFromCollectionGroup(e,t,r,i){j()}Or(e,t){return k.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new bg(this)}getSize(e){return k.resolve(this.size)}}class bg extends pg{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),k.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class Ig{constructor(e){this.persistence=e,this.Nr=new dn(t=>Ks(t),Js),this.lastRemoteSnapshotVersion=Z.min(),this.highestTargetId=0,this.Lr=0,this.Br=new eo,this.targetCount=0,this.kr=rn.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,i)=>t(i)),k.resolve()}getLastRemoteSnapshotVersion(e){return k.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return k.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),k.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),k.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new rn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,k.resolve()}updateTargetData(e,t){return this.Kn(t),k.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,k.resolve()}removeTargets(e,t,r){let i=0;const o=[];return this.Nr.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Nr.delete(a),o.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),k.waitFor(o).next(()=>i)}getTargetCount(e){return k.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return k.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),k.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,o=[];return i&&t.forEach(a=>{o.push(i.markPotentiallyOrphaned(e,a))}),k.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),k.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return k.resolve(r)}containsKey(e,t){return k.resolve(this.Br.containsKey(t))}}/**
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
 */class Tg{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Ic(0),this.Kr=!1,this.Kr=!0,this.$r=new _g,this.referenceDelegate=e(this),this.Ur=new Ig(this),this.indexManager=new hg,this.remoteDocumentCache=function(i){return new wg(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new ug(t),this.Gr=new yg(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new vg,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new Eg(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){M("MemoryPersistence","Starting transaction:",e);const i=new Ag(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(o=>this.referenceDelegate.jr(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Hr(e,t){return k.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class Ag extends um{constructor(e){super(),this.currentSequenceNumber=e}}class to{constructor(e){this.persistence=e,this.Jr=new eo,this.Yr=null}static Zr(e){return new to(e)}get Xr(){if(this.Yr)return this.Yr;throw j()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),k.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),k.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),k.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return k.forEach(this.Xr,r=>{const i=U.fromPath(r);return this.ei(e,i).next(o=>{o||t.removeEntry(i,Z.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return k.or([()=>k.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
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
 */class no{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=Ee(),i=Ee();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new no(e,t.fromCache,r,i)}}/**
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
 */class Sg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Rg{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Ed()?8:dm(be())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const o={result:null};return this.Yi(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Zi(e,t,i,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new Sg;return this.Xi(e,t,a).next(c=>{if(o.result=c,this.zi)return this.es(e,t,a,c.size)})}).next(()=>o.result)}es(e,t,r,i){return r.documentReadCount<this.ji?(Sn()<=F.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Rn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),k.resolve()):(Sn()<=F.DEBUG&&M("QueryEngine","Query:",Rn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Sn()<=F.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Rn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,kt(t))):k.resolve())}Yi(e,t){if(tl(t))return k.resolve(null);let r=kt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=ws(t,null,"F"),r=kt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{const a=Ee(...o);return this.Ji.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(d=>{const h=this.ts(t,c);return this.ns(t,h,a,d.readTime)?this.Yi(e,ws(t,null,"F")):this.rs(e,h,t,d)}))})))}Zi(e,t,r,i){return tl(t)||i.isEqual(Z.min())?k.resolve(null):this.Ji.getDocuments(e,r).next(o=>{const a=this.ts(t,o);return this.ns(t,a,r,i)?k.resolve(null):(Sn()<=F.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Rn(t)),this.rs(e,a,t,om(i,-1)).next(c=>c))})}ts(e,t){let r=new we(Dm(e));return t.forEach((i,o)=>{Qs(e,o)&&(r=r.add(o))}),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}Xi(e,t,r){return Sn()<=F.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Rn(t)),this.Ji.getDocumentsMatchingQuery(e,t,yt.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
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
 */class Pg{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new Se(K),this._s=new dn(o=>Ks(o),Js),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new gg(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function kg(n,e,t,r){return new Pg(n,e,t,r)}async function Wc(n,e){const t=J(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],c=[];let d=Ee();for(const h of i){a.push(h.batchId);for(const f of h.mutations)d=d.add(f.key)}for(const h of o){c.push(h.batchId);for(const f of h.mutations)d=d.add(f.key)}return t.localDocuments.getDocuments(r,d).next(h=>({hs:h,removedBatchIds:a,addedBatchIds:c}))})})}function Cg(n,e){const t=J(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),o=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,d,h,f){const g=h.batch,w=g.keys();let R=k.resolve();return w.forEach(N=>{R=R.next(()=>f.getEntry(d,N)).next(L=>{const V=h.docVersions.get(N);ie(V!==null),L.version.compareTo(V)<0&&(g.applyToRemoteDocument(L,h),L.isValidDocument()&&(L.setReadTime(h.commitVersion),f.addEntry(L)))})}),R.next(()=>c.mutationQueue.removeMutationBatch(d,g))}(t,r,e,o).next(()=>o.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let d=Ee();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(d=d.add(c.batch.mutations[h].key));return d}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Ng(n){const e=J(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Dg(n,e){const t=J(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}class al{constructor(){this.activeTargetIds=$m()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Og{constructor(){this.so=new al,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new al,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Lg{_o(e){}shutdown(){}}/**
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
 */class ll{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){M("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){M("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Cr=null;function ss(){return Cr===null?Cr=function(){return 268435456+Math.round(2147483648*Math.random())}():Cr++,"0x"+Cr.toString(16)}/**
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
 */const Vg={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class Mg{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const ve="WebChannelConnection";class xg extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${i}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${o}`}get Fo(){return!1}Mo(t,r,i,o,a){const c=ss(),d=this.xo(t,r.toUriEncodedString());M("RestConnection",`Sending RPC '${t}' ${c}:`,d,i);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,o,a),this.No(t,d,h,i).then(f=>(M("RestConnection",`Received RPC '${t}' ${c}: `,f),f),f=>{throw Zr("RestConnection",`RPC '${t}' ${c} failed with error: `,f,"url: ",d,"request:",i),f})}Lo(t,r,i,o,a,c){return this.Mo(t,r,i,o,a)}Oo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,a)=>t[a]=o),i&&i.headers.forEach((o,a)=>t[a]=o)}xo(t,r){const i=Vg[t];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const o=ss();return new Promise((a,c)=>{const d=new mc;d.setWithCredentials(!0),d.listenOnce(gc.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Ur.NO_ERROR:const f=d.getResponseJson();M(ve,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(f)),a(f);break;case Ur.TIMEOUT:M(ve,`RPC '${e}' ${o} timed out`),c(new x(C.DEADLINE_EXCEEDED,"Request time out"));break;case Ur.HTTP_ERROR:const g=d.getStatus();if(M(ve,`RPC '${e}' ${o} failed with status:`,g,"response text:",d.getResponseText()),g>0){let w=d.getResponseJson();Array.isArray(w)&&(w=w[0]);const R=w==null?void 0:w.error;if(R&&R.status&&R.message){const N=function(V){const z=V.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(z)>=0?z:C.UNKNOWN}(R.status);c(new x(N,R.message))}else c(new x(C.UNKNOWN,"Server responded with status "+d.getStatus()))}else c(new x(C.UNAVAILABLE,"Connection failed."));break;default:j()}}finally{M(ve,`RPC '${e}' ${o} completed.`)}});const h=JSON.stringify(i);M(ve,`RPC '${e}' ${o} sending request:`,i),d.send(t,"POST",h,r,15)})}Bo(e,t,r){const i=ss(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=_c(),c=vc(),d={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(d.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(d.useFetchStreams=!0),this.Oo(d.initMessageHeaders,t,r),d.encodeInitMessageHeaders=!0;const f=o.join("");M(ve,`Creating RPC '${e}' stream ${i}: ${f}`,d);const g=a.createWebChannel(f,d);let w=!1,R=!1;const N=new Mg({Io:V=>{R?M(ve,`Not sending because RPC '${e}' stream ${i} is closed:`,V):(w||(M(ve,`Opening RPC '${e}' stream ${i} transport.`),g.open(),w=!0),M(ve,`RPC '${e}' stream ${i} sending:`,V),g.send(V))},To:()=>g.close()}),L=(V,z,H)=>{V.listen(z,G=>{try{H(G)}catch(ee){setTimeout(()=>{throw ee},0)}})};return L(g,Cn.EventType.OPEN,()=>{R||(M(ve,`RPC '${e}' stream ${i} transport opened.`),N.yo())}),L(g,Cn.EventType.CLOSE,()=>{R||(R=!0,M(ve,`RPC '${e}' stream ${i} transport closed`),N.So())}),L(g,Cn.EventType.ERROR,V=>{R||(R=!0,Zr(ve,`RPC '${e}' stream ${i} transport errored:`,V),N.So(new x(C.UNAVAILABLE,"The operation could not be completed")))}),L(g,Cn.EventType.MESSAGE,V=>{var z;if(!R){const H=V.data[0];ie(!!H);const G=H,ee=G.error||((z=G[0])===null||z===void 0?void 0:z.error);if(ee){M(ve,`RPC '${e}' stream ${i} received error:`,ee);const Re=ee.status;let A=function(y){const E=se[y];if(E!==void 0)return Xm(E)}(Re),v=ee.message;A===void 0&&(A=C.INTERNAL,v="Unknown error status: "+Re+" with message "+ee.message),R=!0,N.So(new x(A,v)),g.close()}else M(ve,`RPC '${e}' stream ${i} received:`,H),N.bo(H)}}),L(c,yc.STAT_EVENT,V=>{V.stat===ys.PROXY?M(ve,`RPC '${e}' stream ${i} detected buffering proxy`):V.stat===ys.NOPROXY&&M(ve,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{N.wo()},0),N}}function os(){return typeof document!="undefined"?document:null}/**
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
 */function vi(n){return new Ym(n,!0)}/**
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
 */class Kc{constructor(e,t,r=1e3,i=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&M("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class $g{constructor(e,t,r,i,o,a,c,d){this.ui=e,this.Ho=r,this.Jo=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=d,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Kc(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(Ot(t.toString()),Ot("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===t&&this.P_(r,i)},r=>{e(()=>{const i=new x(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return M("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(M("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Ug extends $g{constructor(e,t,r,i,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return ie(!!e.streamToken),this.lastStreamToken=e.streamToken,ie(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){ie(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=og(e.writeResults,e.commitTime),r=Qt(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=rg(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>sg(this.serializer,r))};this.a_(t)}}/**
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
 */class Fg extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new x(C.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Mo(e,Is(t,r),i,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new x(C.UNKNOWN,o.toString())})}Lo(e,t,r,i,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Lo(e,Is(t,r),i,a,c,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new x(C.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class jg{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Ot(t),this.D_=!1):M("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class Bg{constructor(e,t,r,i,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(a=>{r.enqueueAndForget(async()=>{er(this)&&(M("RemoteStore","Restarting streams for network reachability change."),await async function(d){const h=J(d);h.L_.add(4),await Zn(h),h.q_.set("Unknown"),h.L_.delete(4),await _i(h)}(this))})}),this.q_=new jg(r,i)}}async function _i(n){if(er(n))for(const e of n.B_)await e(!0)}async function Zn(n){for(const e of n.B_)await e(!1)}function er(n){return J(n).L_.size===0}async function Jc(n,e,t){if(!pi(e))throw e;n.L_.add(1),await Zn(n),n.q_.set("Offline"),t||(t=()=>Ng(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{M("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await _i(n)})}function Qc(n,e){return e().catch(t=>Jc(n,t,e))}async function Ei(n){const e=J(n),t=_t(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;qg(e);)try{const i=await Dg(e.localStore,r);if(i===null){e.O_.length===0&&t.o_();break}r=i.batchId,Hg(e,i)}catch(i){await Jc(e,i)}Xc(e)&&Yc(e)}function qg(n){return er(n)&&n.O_.length<10}function Hg(n,e){n.O_.push(e);const t=_t(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Xc(n){return er(n)&&!_t(n).n_()&&n.O_.length>0}function Yc(n){_t(n).start()}async function zg(n){_t(n).p_()}async function Gg(n){const e=_t(n);for(const t of n.O_)e.m_(t.mutations)}async function Wg(n,e,t){const r=n.O_.shift(),i=Zs.from(r,e,t);await Qc(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Ei(n)}async function Kg(n,e){e&&_t(n).V_&&await async function(r,i){if(function(a){return Qm(a)&&a!==C.ABORTED}(i.code)){const o=r.O_.shift();_t(r).s_(),await Qc(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i)),await Ei(r)}}(n,e),Xc(n)&&Yc(n)}async function cl(n,e){const t=J(n);t.asyncQueue.verifyOperationInProgress(),M("RemoteStore","RemoteStore received new credentials");const r=er(t);t.L_.add(3),await Zn(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await _i(t)}async function Jg(n,e){const t=J(n);e?(t.L_.delete(2),await _i(t)):e||(t.L_.add(2),await Zn(t),t.q_.set("Unknown"))}function _t(n){return n.U_||(n.U_=function(t,r,i){const o=J(t);return o.w_(),new Ug(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:zg.bind(null,n),mo:Kg.bind(null,n),f_:Gg.bind(null,n),g_:Wg.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await Ei(n)):(await n.U_.stop(),n.O_.length>0&&(M("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
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
 */class ro{constructor(e,t,r,i,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new Pt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,o){const a=Date.now()+r,c=new ro(e,t,a,i,o);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Zc(n,e){if(Ot("AsyncQueue",`${e}: ${n}`),pi(n))return new x(C.UNAVAILABLE,`${e}: ${n}`);throw n}class Qg{constructor(){this.queries=ul(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=J(t),o=i.queries;i.queries=ul(),o.forEach((a,c)=>{for(const d of c.j_)d.onError(r)})})(this,new x(C.ABORTED,"Firestore shutting down"))}}function ul(){return new dn(n=>Lc(n),Oc)}function Xg(n){n.Y_.forEach(e=>{e.next()})}var dl,hl;(hl=dl||(dl={})).ea="default",hl.Cache="cache";class Yg{constructor(e,t,r,i,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new dn(c=>Lc(c),Oc),this.Ma=new Map,this.xa=new Set,this.Oa=new Se(U.comparator),this.Na=new Map,this.La=new eo,this.Ba={},this.ka=new Map,this.qa=rn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Zg(n,e,t){const r=ry(n);try{const i=await function(a,c){const d=J(a),h=ce.now(),f=c.reduce((R,N)=>R.add(N.key),Ee());let g,w;return d.persistence.runTransaction("Locally write mutations","readwrite",R=>{let N=si(),L=Ee();return d.cs.getEntries(R,f).next(V=>{N=V,N.forEach((z,H)=>{H.isValidDocument()||(L=L.add(z))})}).next(()=>d.localDocuments.getOverlayedDocuments(R,N)).next(V=>{g=V;const z=[];for(const H of c){const G=Gm(H,g.get(H.key).overlayedDocument);G!=null&&z.push(new wt(H.key,G,Sc(G.value.mapValue),xe.exists(!0)))}return d.mutationQueue.addMutationBatch(R,h,z,c)}).next(V=>{w=V;const z=V.applyToLocalDocumentSet(g,L);return d.documentOverlayCache.saveOverlays(R,V.batchId,z)})}).then(()=>({batchId:w.batchId,changes:Mc(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,d){let h=a.Ba[a.currentUser.toKey()];h||(h=new Se(K)),h=h.insert(c,d),a.Ba[a.currentUser.toKey()]=h}(r,i.batchId,t),await wi(r,i.changes),await Ei(r.remoteStore)}catch(i){const o=Zc(i,"Failed to persist write");t.reject(o)}}function fl(n,e,t){const r=J(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach((o,a)=>{const c=a.view.Z_(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){const d=J(a);d.onlineState=c;let h=!1;d.queries.forEach((f,g)=>{for(const w of g.j_)w.Z_(c)&&(h=!0)}),h&&Xg(d)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function ey(n,e){const t=J(n),r=e.batch.batchId;try{const i=await Cg(t.localStore,e);tu(t,r,null),eu(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await wi(t,i)}catch(i){await bc(i)}}async function ty(n,e,t){const r=J(n);try{const i=await function(a,c){const d=J(a);return d.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return d.mutationQueue.lookupMutationBatch(h,c).next(g=>(ie(g!==null),f=g.keys(),d.mutationQueue.removeMutationBatch(h,g))).next(()=>d.mutationQueue.performConsistencyCheck(h)).next(()=>d.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>d.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>d.localDocuments.getDocuments(h,f))})}(r.localStore,e);tu(r,e,t),eu(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await wi(r,i)}catch(i){await bc(i)}}function eu(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function tu(n,e,t){const r=J(n);let i=r.Ba[r.currentUser.toKey()];if(i){const o=i.get(e);o&&(t?o.reject(t):o.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}async function wi(n,e,t){const r=J(n),i=[],o=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((c,d)=>{a.push(r.Ka(d,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const g=h?!h.fromCache:(f=void 0)===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(d.targetId,g?"current":"not-current")}if(h){i.push(h);const g=no.Wi(d.targetId,h);o.push(g)}}))}),await Promise.all(a),r.Ca.d_(i),await async function(d,h){const f=J(d);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>k.forEach(h,w=>k.forEach(w.$i,R=>f.persistence.referenceDelegate.addReference(g,w.targetId,R)).next(()=>k.forEach(w.Ui,R=>f.persistence.referenceDelegate.removeReference(g,w.targetId,R)))))}catch(g){if(!pi(g))throw g;M("LocalStore","Failed to update sequence numbers: "+g)}for(const g of h){const w=g.targetId;if(!g.fromCache){const R=f.os.get(w),N=R.snapshotVersion,L=R.withLastLimboFreeSnapshotVersion(N);f.os=f.os.insert(w,L)}}}(r.localStore,o))}async function ny(n,e){const t=J(n);if(!t.currentUser.isEqual(e)){M("SyncEngine","User change. New user:",e.toKey());const r=await Wc(t.localStore,e);t.currentUser=e,function(o,a){o.ka.forEach(c=>{c.forEach(d=>{d.reject(new x(C.CANCELLED,a))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await wi(t,r.hs)}}function ry(n){const e=J(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ey.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ty.bind(null,e),e}class ai{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=vi(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return kg(this.persistence,new Rg,e.initialUser,this.serializer)}Ga(e){return new Tg(to.Zr,this.serializer)}Wa(e){return new Og}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ai.provider={build:()=>new ai};class As{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>fl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=ny.bind(null,this.syncEngine),await Jg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Qg}()}createDatastore(e){const t=vi(e.databaseInfo.databaseId),r=function(o){return new xg(o)}(e.databaseInfo);return function(o,a,c,d){return new Fg(o,a,c,d)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,o,a,c){return new Bg(r,i,o,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>fl(this.syncEngine,t,0),function(){return ll.D()?new ll:new Lg}())}createSyncEngine(e,t){return function(i,o,a,c,d,h,f){const g=new Yg(i,o,a,c,d,h);return f&&(g.Qa=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const o=J(i);M("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await Zn(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}As.provider={build:()=>new As};/**
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
 */class iy{constructor(e,t,r,i,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=_e.UNAUTHENTICATED,this.clientId=wc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{M("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(M("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Pt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Zc(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function as(n,e){n.asyncQueue.verifyOperationInProgress(),M("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Wc(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function pl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await sy(n);M("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>cl(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>cl(e.remoteStore,i)),n._onlineComponents=e}async function sy(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M("FirestoreClient","Using user provided OfflineComponentProvider");try{await as(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===C.FAILED_PRECONDITION||i.code===C.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Zr("Error using user provided cache. Falling back to memory cache: "+t),await as(n,new ai)}}else M("FirestoreClient","Using default OfflineComponentProvider"),await as(n,new ai);return n._offlineComponents}async function oy(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M("FirestoreClient","Using user provided OnlineComponentProvider"),await pl(n,n._uninitializedComponentsProvider._online)):(M("FirestoreClient","Using default OnlineComponentProvider"),await pl(n,new As))),n._onlineComponents}function ay(n){return oy(n).then(e=>e.syncEngine)}/**
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
 */function nu(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const ml=new Map;/**
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
 */function ru(n,e,t){if(!t)throw new x(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function ly(n,e,t,r){if(e===!0&&r===!0)throw new x(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function gl(n){if(!U.isDocumentKey(n))throw new x(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function yl(n){if(U.isDocumentKey(n))throw new x(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function io(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":j()}function sn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new x(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=io(n);throw new x(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */class vl{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new x(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new x(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ly("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=nu((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class bi{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new vl({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new x(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new vl(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Xp;switch(r.type){case"firstParty":return new tm(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new x(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=ml.get(t);r&&(M("ComponentProvider","Removing Datastore"),ml.delete(t),r.terminate())}(this),Promise.resolve()}}function cy(n,e,t,r={}){var i;const o=(n=sn(n,bi))._getSettings(),a=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&Zr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),r.mockUserToken){let c,d;if(typeof r.mockUserToken=="string")c=r.mockUserToken,d=_e.MOCK_USER;else{c=fd(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new x(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new _e(h)}n._authCredentials=new Yp(new Ec(c,d))}}/**
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
 */class so{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new so(this.firestore,e,this._query)}}class $e{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new gt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new $e(this.firestore,e,this._key)}}class gt extends so{constructor(e,t,r){super(e,t,km(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new $e(this.firestore,null,new U(e))}withConverter(e){return new gt(this.firestore,e,this._path)}}function uy(n,e,...t){if(n=pe(n),ru("collection","path",e),n instanceof bi){const r=ne.fromString(e,...t);return yl(r),new gt(n,null,r)}{if(!(n instanceof $e||n instanceof gt))throw new x(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ne.fromString(e,...t));return yl(r),new gt(n.firestore,null,r)}}function oo(n,e,...t){if(n=pe(n),arguments.length===1&&(e=wc.newId()),ru("doc","path",e),n instanceof bi){const r=ne.fromString(e,...t);return gl(r),new $e(n,null,new U(r))}{if(!(n instanceof $e||n instanceof gt))throw new x(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ne.fromString(e,...t));return gl(r),new $e(n.firestore,n instanceof gt?n.converter:null,new U(r))}}/**
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
 */class _l{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Kc(this,"async_queue_retry"),this.Vu=()=>{const r=os();r&&M("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=os();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=os();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Pt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!pi(e))throw e;M("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw Ot("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=ro.createAndSchedule(this,e,t,r,o=>this.yu(o));return this.Tu.push(i),i}fu(){this.Eu&&j()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class Ii extends bi{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new _l,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new _l(e),this._firestoreClient=void 0,await e}}}function dy(n,e){const t=typeof n=="object"?n:Nl(),r=typeof n=="string"?n:"(default)",i=Ls(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=dd("firestore");o&&cy(i,...o)}return i}function hy(n){if(n._terminated)throw new x(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||fy(n),n._firestoreClient}function fy(n){var e,t,r;const i=n._freezeSettings(),o=function(c,d,h,f){return new mm(c,d,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,nu(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new iy(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const d=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(d),_online:d}}(n._componentsProvider))}/**
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
 */class Gn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Gn(Be.fromBase64String(e))}catch(t){throw new x(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Gn(Be.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class ao{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new x(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Ti{constructor(e){this._methodName=e}}/**
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
 */class iu{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new x(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new x(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}}/**
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
 */class su{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0}(this._values,e._values)}}/**
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
 */const py=/^__.*__$/;class my{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new wt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Yn(e,this.data,t,this.fieldTransforms)}}class ou{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new wt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function au(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw j()}}class lo{constructor(e,t,r,i,o,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new lo(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return li(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(au(this.Cu)&&py.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class gy{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||vi(e)}Qu(e,t,r,i=!1){return new lo({Cu:e,methodName:t,qu:r,path:fe.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function lu(n){const e=n._freezeSettings(),t=vi(n._databaseId);return new gy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function yy(n,e,t,r,i,o={}){const a=n.Qu(o.merge||o.mergeFields?2:0,e,t,i);uo("Data must be an object, but it was:",a,r);const c=cu(r,a);let d,h;if(o.merge)d=new Ce(a.fieldMask),h=a.fieldTransforms;else if(o.mergeFields){const f=[];for(const g of o.mergeFields){const w=Ss(e,g,t);if(!a.contains(w))throw new x(C.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);hu(f,w)||f.push(w)}d=new Ce(f),h=a.fieldTransforms.filter(g=>d.covers(g.field))}else d=null,h=a.fieldTransforms;return new my(new ke(c),d,h)}class Ai extends Ti{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ai}}class co extends Ti{_toFieldTransform(e){return new Bm(e.path,new qn)}isEqual(e){return e instanceof co}}function vy(n,e,t,r){const i=n.Qu(1,e,t);uo("Data must be an object, but it was:",i,r);const o=[],a=ke.empty();un(r,(d,h)=>{const f=du(e,d,t);h=pe(h);const g=i.Nu(f);if(h instanceof Ai)o.push(f);else{const w=Si(h,g);w!=null&&(o.push(f),a.set(f,w))}});const c=new Ce(o);return new ou(a,c,i.fieldTransforms)}function _y(n,e,t,r,i,o){const a=n.Qu(1,e,t),c=[Ss(e,r,t)],d=[i];if(o.length%2!=0)throw new x(C.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<o.length;w+=2)c.push(Ss(e,o[w])),d.push(o[w+1]);const h=[],f=ke.empty();for(let w=c.length-1;w>=0;--w)if(!hu(h,c[w])){const R=c[w];let N=d[w];N=pe(N);const L=a.Nu(R);if(N instanceof Ai)h.push(R);else{const V=Si(N,L);V!=null&&(h.push(R),f.set(R,V))}}const g=new Ce(h);return new ou(f,g,a.fieldTransforms)}function Si(n,e){if(uu(n=pe(n)))return uo("Unsupported field value:",e,n),cu(n,e);if(n instanceof Ti)return function(r,i){if(!au(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const o=[];let a=0;for(const c of r){let d=Si(c,i.Lu(a));d==null&&(d={nullValue:"NULL_VALUE"}),o.push(d),a++}return{arrayValue:{values:o}}}(n,e)}return function(r,i){if((r=pe(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Um(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=ce.fromDate(r);return{timestampValue:bs(i.serializer,o)}}if(r instanceof ce){const o=new ce(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:bs(i.serializer,o)}}if(r instanceof iu)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Gn)return{bytesValue:Zm(i.serializer,r._byteString)};if(r instanceof $e){const o=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw i.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:zc(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof su)return function(a,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Bu("VectorValues must only contain numeric values.");return Xs(c.serializer,d)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${io(r)}`)}(n,e)}function cu(n,e){const t={};return Tc(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):un(n,(r,i)=>{const o=Si(i,e.Mu(r));o!=null&&(t[r]=o)}),{mapValue:{fields:t}}}function uu(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ce||n instanceof iu||n instanceof Gn||n instanceof $e||n instanceof Ti||n instanceof su)}function uo(n,e,t){if(!uu(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=io(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Ss(n,e,t){if((e=pe(e))instanceof ao)return e._internalPath;if(typeof e=="string")return du(n,e);throw li("Field path arguments must be of type string or ",n,!1,void 0,t)}const Ey=new RegExp("[~\\*/\\[\\]]");function du(n,e,t){if(e.search(Ey)>=0)throw li(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ao(...e.split("."))._internalPath}catch{throw li(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function li(n,e,t,r,i){const o=r&&!r.isEmpty(),a=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let d="";return(o||a)&&(d+=" (found",o&&(d+=` in field ${r}`),a&&(d+=` in document ${i}`),d+=")"),new x(C.INVALID_ARGUMENT,c+n+d)}function hu(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */function wy(n,e,t){let r;return r=n?n.toFirestore(e):e,r}function by(n,e,t){n=sn(n,$e);const r=sn(n.firestore,Ii),i=wy(n.converter,e);return ho(r,[yy(lu(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,xe.none())])}function Iy(n,e,t,...r){n=sn(n,$e);const i=sn(n.firestore,Ii),o=lu(i);let a;return a=typeof(e=pe(e))=="string"||e instanceof ao?_y(o,"updateDoc",n._key,e,t,r):vy(o,"updateDoc",n._key,e),ho(i,[a.toMutation(n._key,xe.exists(!0))])}function Ty(n){return ho(sn(n.firestore,Ii),[new Ys(n._key,xe.none())])}function ho(n,e){return function(r,i){const o=new Pt;return r.asyncQueue.enqueueAndForget(async()=>Zg(await ay(r),i,o)),o.promise}(hy(n),e)}function fu(){return new co("serverTimestamp")}(function(e,t=!0){(function(i){cn=i})(on),Xt(new Ct("firestore",(r,{instanceIdentifier:i,options:o})=>{const a=r.getProvider("app").getImmediate(),c=new Ii(new Zp(r.getProvider("auth-internal")),new rm(r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new x(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ni(h.options.projectId,f)}(a,i),a);return o=Object.assign({useFetchStreams:t},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),pt(Wa,"4.7.3",e),pt(Wa,"4.7.3","esm2017")})();function Ay(){try{const n=typeof window!="undefined"&&window.DigitEarnBridge;if(n&&typeof n.getFirebaseConfig=="function"){const e=String(n.getFirebaseConfig()||"");if(e.length>2)return JSON.parse(e)||{}}}catch{}return typeof window!="undefined"&&window.__DIGITEARN_FB_CONFIG__||{}}const jt=Ay(),Bt={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0},Br={apiKey:jt.apiKey||Bt.apiKey||"",authDomain:jt.authDomain||Bt.authDomain||"",projectId:jt.projectId||Bt.projectId||"",storageBucket:jt.storageBucket||Bt.storageBucket||"",messagingSenderId:jt.messagingSenderId||Bt.messagingSenderId||"",appId:jt.appId||Bt.appId||""},pu=!!(Br.apiKey&&Br.projectId&&Br.appId),Sy=typeof location!="undefined"&&/^https?:$/.test(location.protocol),Ry=Sy?"":"https://digitearn.vercel.app",mu=Cl(Br),tr=Jp(mu),fo=dy(mu),Y=n=>"৳"+Number(n||0).toLocaleString("en-BD",{maximumFractionDigits:2}),De=n=>{const e=n!=null&&n.toDate?n.toDate():n?new Date(n):new Date(0);return e.getTime()?e.toLocaleString("en-BD",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):"—"},P=n=>String(n!=null?n:"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);async function oe(n,e={},t="POST"){if(!pu)throw new Error("Firebase configure করা নেই");let r=n;const i=String(n).match(/^\/api\/admin\/([a-z0-9-]+)/);i&&(r="/api/admin/panel?op="+encodeURIComponent(i[1]));const o=async c=>{const d=tr.currentUser;if(!d)throw new Error("Login required — আবার লগইন করুন");const h=await fetch(Ry+r,{method:t,headers:{"Content-Type":"application/json",Authorization:"Bearer "+await d.getIdToken(c)},body:t==="GET"?void 0:JSON.stringify(e)});let f="";try{f=await h.text()}catch{}let g=null;try{g=f?JSON.parse(f):{}}catch{}return{resp:h,data:g||{},isJson:!!g}};let a=await o(!1);if(!a.resp.ok&&(a.resp.status===401||a.data.sessionExpired===!0)&&(a=await o(!0)),!a.resp.ok){const c=a.data||{};if(c.protection||c.error&&typeof c.error=="object"&&String(c.error.code)==="401")throw new Error("Vercel Deployment Protection ব্লক করছে — এই deployment URL থেকে admin API চলে না। Production URL (digitearn.vercel.app) ব্যবহার করুন বা Vercel → Settings → Deployment Protection off করুন।");const d=typeof c.error=="string"?c.error:String(c.error&&(c.error.message||c.error.code)||c.message||"");throw new Error(d||(a.isJson?"":`সার্ভার JSON দেয়নি (HTTP ${a.resp.status})`)||`Operation fail হয়েছে (${a.resp.status}) — আবার চেষ্টা করুন`)}return a.data}async function Py(){try{return await oe("/api/admin/health",{})}catch(n){const e=String(n&&n.message||n);throw/Unknown admin endpoint|404/i.test(e)?new Error("সার্ভারের build পুরোনো — `?op=health` নেই, মানে নতুন api/ + lib/ এখনো deploy হয়নি। Push করে Vercel-এ Redeploy করুন।"):n}}async function ky(){try{const n=await oe("/api/admin/verify",{});return{isAdmin:!!n.isAdmin,authenticated:!!n.authenticated,authState:n.authState||"",error:""}}catch(n){return{isAdmin:!1,authenticated:!1,error:String(n&&n.message||"Admin verify fail")}}}async function Ze(n,e={}){const t=await oe("/api/admin/read",{what:n,...e});return Array.isArray(t.items)?t.items:[]}async function gu(n,e={}){const t=await oe("/api/admin/read",{what:n,...e});return t&&t.item?t.item:null}const Oe=(n,e={})=>oe("/api/admin/write",{what:n,...e});async function yu(n="pending",e=100){return Ze("proofs",{status:n,limit:e})}async function Cy(n){await oe("/api/admin/proof-review",{proofId:n,action:"approve"})}async function vu(n="pending",e=100){return Ze("deposits",{status:n,limit:e})}async function Ny(n){await oe("/api/admin/deposit-review",{depositId:n,action:"approve"})}async function Dy(n,e=""){await oe("/api/admin/deposit-review",{depositId:n,action:"reject",note:e})}async function po(n=300){return Ze("users",{limit:n})}async function Ri(n){return await gu("user",{id:n})}async function Oy(n,e=20){return Ze("user-withdrawals",{uid:n,limit:e})}async function Ly(n,e=25){return Ze("user-transactions",{uid:n,limit:e})}async function El(n,e){await oe("/api/admin/set-active",{uid:n,active:e})}async function Vy(){return Ze("tasks",{limit:500})}async function _u(n){const e=await oe("/api/admin/read",n?{what:"jobs",kindFilter:n}:{what:"jobs"});return Array.isArray(e.items)?e.items:[]}async function My(n){return Oe("task-create",{data:n})}async function Eu(){return oe("/api/admin/read",{what:"wallet"})}async function xy(){const n=await oe("/api/admin/read",{what:"admins"});return{items:Array.isArray(n.items)?n.items:[],isOwner:!!n.isOwner}}async function $y(n,{delta:e=null,setBalance:t=null,note:r=""}={}){return Oe("admin-balance",{email:n,delta:e,setBalance:t,note:r})}async function Uy(n,e){return Oe("admin-role",{email:n,role:e})}async function Fy(n){return Oe("admin-mode",{activeMode:n})}async function jy(n){return Oe("task-publish",{slug:n})}async function By(n){return Oe("task-delete",{slug:n})}async function qy(n,e,t=""){await oe("/api/admin/proof-review",{proofId:n,action:e,note:t})}async function Hy(){return Oe("leaderboard-backfill",{})}async function zy(n=[]){return await oe("/api/admin/seed-tasks",{slugs:n})}async function Gy(n,e){if(e.url&&!/^https?:\/\/\S+$/i.test(e.url))throw new Error("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)");return Oe("task",{slug:n,data:e})}const wu=["giftCode"];async function Wy(){const[n,e]=await Promise.all([gu("settings").catch(()=>null),oe("/api/admin/secret",{get:!0}).catch(()=>({}))]),t={...n||{}};delete t.id;const r={},i=e&&typeof e.giftCode=="string";for(const o of wu)typeof e[o]=="string"&&(r[o]=e[o]);return{...t,...r,_secretLoaded:i}}async function Ky(n="pending",e=100){return Ze("withdrawals",{status:n,limit:e})}async function Rs(n,e,t,r=""){await oe("/api/admin/withdrawal-review",{userId:n,id:e,action:t,note:r})}async function Jy(n){const e={...n},t={};for(const i of wu)i in e&&(t[i]=e[i],delete e[i]);await Oe("settings",{data:e});const r={...t};for(const i of Object.keys(r))String(r[i]).trim()===""&&!r.__clear&&delete r[i];Object.keys(r).length&&await oe("/api/admin/secret",r)}async function Qy(){await oe("/api/admin/secret",{giftCode:"",__clear:!0})}async function Xy(){return Ze("notices",{limit:100})}async function Yy({title:n,body:e,type:t="notice",expiresAt:r=null}){const i={title:String(n||"").trim().slice(0,60),body:String(e||"").trim().slice(0,300),type:t==="warning"?"warning":"notice",targetType:"all",enabled:!0,sort:10,createdAt:fu()};return r&&(i.expiresAt=r),Oe("notice-add",i)}async function Zy(n,{title:e,body:t,enabled:r,sort:i,type:o,expiresAt:a}){const c={title:String(e||"").trim().slice(0,60),body:String(t||"").trim().slice(0,300),enabled:!!r,sort:Number(i)||10};return o&&(c.type=o==="warning"?"warning":"notice"),a&&(c.expiresAt=a),Oe("notice-update",{id:n,...c})}async function ev(n){return Oe("notice-delete",{id:n})}async function tv(n){return Ze("user-target-notices",{uid:n,limit:50})}async function nv(n,{title:e,body:t,type:r="warning",expiresAt:i=null}){const o={title:String(e||"").trim().slice(0,60),body:String(t||"").trim().slice(0,300),type:r==="warning"?"warning":"notice",targetType:"user",targetUserId:n,enabled:!0,sort:10,createdAt:fu(),createdBy:"admin"};i&&(o.expiresAt=i),await by(oo(uy(fo,"users",n,"targetNotices")),o)}async function bu(n,e,{enabled:t}){await Iy(oo(fo,"users",n,"targetNotices",e),{enabled:!!t})}async function Iu(n,e){await Ty(oo(fo,"users",n,"targetNotices",e))}async function rv(){return(await oe("/api/admin/notice-targeted",{},"GET")).targeted||[]}async function iv(){const[n,e,t]=await Promise.all([po(1e3),yu("pending",100),vu("pending",100)]);return{totalUsers:n.length,activeUsers:n.filter(r=>r.isActive).length,pendingProofs:e.length,pendingDeposits:t.length,totalBalance:n.reduce((r,i)=>r+(Number(i.balance)||0),0),recentProofs:e.slice(0,3),recentDeposits:t.slice(0,3)}}const sv={url:300,email:120,tel:20,number:60,textarea:2e3,text:100,password:100,image:3e5};async function wl(n,{maxSide:e=900,quality:t=.72,maxBytes:r=22e4}={}){if(!n||!/^image\/(png|jpe?g|webp)$/.test(n.type||""))throw new Error("PNG/JPG/WEBP ছবি দিন");if(n.size>8*1024*1024)throw new Error("ছবি 8MB-এর বড় না — ছোট করুন");const i=URL.createObjectURL(n);try{const o=await new Promise((w,R)=>{const N=new Image;N.onload=()=>w(N),N.onerror=()=>R(new Error("ছবি পড়া যায়নি")),N.src=i});let a=o.naturalWidth||o.width||0,c=o.naturalHeight||o.height||0;if(!a||!c)throw new Error("ছবির size বোঝা যায়নি");const d=Math.min(1,e/Math.max(a,c));a=Math.max(1,Math.round(a*d)),c=Math.max(1,Math.round(c*d));const h=document.createElement("canvas");h.width=a,h.height=c,h.getContext("2d").drawImage(o,0,0,a,c);let f="",g=t;for(let w=0;w<6&&(f=h.toDataURL("image/jpeg",g),!(f.length<=r));w++)g-=.12;if(f.length>sv.image)throw new Error("ছবি ছোট করা যাচ্ছে না — আরেকটা ছবি দিন");return f}finally{URL.revokeObjectURL(i)}}const nr=document.getElementById("app");let mo=null;function O(n,e="success"){const t=document.createElement("div");t.className="adm-toast "+e,t.innerHTML=`<i class="fa-solid ${e==="error"?"fa-circle-xmark":"fa-circle-check"}"></i> ${P(n)}`,nr.appendChild(t),requestAnimationFrame(()=>t.classList.add("show")),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3200)}pu||(nr.innerHTML='<div class="loading-center"><p style="max-width:340px;text-align:center">Firebase env variables set নেই।<br>Vercel-এ ৬টা <b>VITE_FIREBASE_*</b> variable দিন।</p></div>');$f(tr,n=>{if(!n){mo=null,go();return}Tu(n)});async function Tu(n){const e=await ky();if(e.error){nr.innerHTML=`<div class="loading-center" style="display:block;text-align:center;padding:28px">
      <p style="margin-bottom:12px">Admin check করা যায়নি:<br><b style="font-size:13px">${P(e.error)}</b></p>
      <button class="adm-btn gold" id="gateRetry"><i class="fa-solid fa-rotate"></i> আবার চেষ্টা করুন</button>
      <p class="muted" style="margin-top:12px;font-size:12px">লগইন ভাঙেনি — শুধু সার্ভার উত্তর দেয়নি।</p></div>`,document.getElementById("gateRetry").addEventListener("click",()=>Tu(n));return}if(!e.isAdmin){await rc(tr),go("এই email টা admin list-এ নেই — Firestore-এর admins collection-এ এই email-এর document আছে কিনা দেখুন।");return}mo={email:n.email},window.location.hash=window.location.hash||"#/overview",av(),window.addEventListener("hashchange",Au)}function go(n=""){nr.innerHTML=`
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-logo"><i class="fa-solid fa-bolt"></i></div>
        <h1>DigitEarn <span>Admin</span></h1>
        <p class="muted">Admin panel-এ লগইন করুন</p>
        ${n?`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${P(n)}</div>`:""}
        <form id="loginForm">
          <input type="email" id="lgEmail" class="adm-input" placeholder="Admin email" required>
          <input type="password" id="lgPass" class="adm-input" placeholder="Password" required>
          <button class="adm-btn gold" type="submit"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
        </form>
      </div>
    </div>`,document.getElementById("loginForm").addEventListener("submit",async e=>{e.preventDefault();const t=e.target.querySelector("button");t.disabled=!0,t.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{await Vf(tr,document.getElementById("lgEmail").value.trim(),document.getElementById("lgPass").value)}catch{t.disabled=!1,t.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> Login',go("Login fail — email/password ঠিক আছে কিনা দেখুন (অথবা এই email-এ Firebase Auth-এ account নেই)।")}})}const ov=[{id:"overview",label:"Overview",icon:"fa-gauge-high"},{id:"proofs",label:"Submissions",icon:"fa-clipboard-list"},{id:"deposits",label:"Deposits",icon:"fa-money-bill-wave"},{id:"withdrawals",label:"Withdrawals",icon:"fa-money-bill-transfer"},{id:"users",label:"Users",icon:"fa-users"},{id:"microjobs",label:"MicroJobs",icon:"fa-briefcase"},{id:"wallet",label:"অ্যাডমিন ওয়ালেট",icon:"fa-wallet"},{id:"tasks",label:"টাস্ক (অ্যাকাউন্ট সেল)",icon:"fa-store"},{id:"settings",label:"Settings",icon:"fa-gear"},{id:"notices",label:"Notices",icon:"fa-bullhorn"}];function av(){nr.innerHTML=`
    <header class="adm-top">
      <div class="adm-logo"><i class="fa-solid fa-bolt"></i> DigitEarn <span>Admin</span></div>
      <div class="adm-top-right">
        <span class="adm-email"><i class="fa-solid fa-user-shield"></i> ${P(mo.email)}</span>
        <button class="adm-btn ghost sm" id="logoutBtn"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
    </header>
    <nav class="adm-nav">${ov.map(n=>`<a href="#/${n.id}" data-nav="${n.id}"><i class="fa-solid ${n.icon}"></i> ${n.label}</a>`).join("")}</nav>
    <main class="adm-main" id="admMain"><div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div></main>`,document.getElementById("logoutBtn").addEventListener("click",()=>rc(tr)),Au()}async function Au(){const n=(window.location.hash||"#/overview").replace("#/",""),e=document.getElementById("admMain");if(e){document.querySelectorAll("[data-nav]").forEach(t=>t.classList.toggle("on",t.dataset.nav===n)),e.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';try{n==="proofs"?await Nn(e):n==="deposits"?await qr(e):n==="withdrawals"?await Ps(e):n==="users"?await dv(e):n==="tasks"?await Ns(e,"task"):n==="microjobs"?await Ns(e,"microjob"):n==="wallet"?await Hr(e):n==="settings"?await Su(e):n==="notices"?await zt(e):await lv(e)}catch(t){const r=String(t&&t.message||t),i=/permission|insufficient/i.test(r);e.innerHTML=`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${P(r)}
      ${i?`<div class="muted" style="font-size:12px;margin-top:8px">
        Panel এখন server (Admin SDK) দিয়ে পড়ে — নিচের ↻ বাটন চাপুন। না চললে দেখুন:
        Firestore-এর <code>admins/&lt;email&gt;</code> doc-id হুবহু আপনার login email
        হতে হবে (বড়/ছোট হাতের তফাতও fail করে), আর Vercel function-এর build
        নতুন কিনা (?op=read থাকতে হবে)।</div>`:""}</div>`}}}async function lv(n){const e=await iv();n.innerHTML=`
    <div class="stat-grid">
      <div class="adm-stat gold"><i class="fa-solid fa-users"></i><b>${e.totalUsers}</b><span>মোট ইউজার</span></div>
      <div class="adm-stat green"><i class="fa-solid fa-circle-check"></i><b>${e.activeUsers}</b><span>অ্যাক্টিভ</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-clipboard-list"></i><b>${e.pendingProofs}</b><span>Task Submissions</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-money-bill-wave"></i><b>${e.pendingDeposits}</b><span>Deposit Review</span></div>
    </div>
    <div class="adm-card"><h4><i class="fa-solid fa-scale-balanced" style="color:#d97706"></i> মোট Outstanding Balance</h4>
      <div class="big-num">${Y(e.totalBalance)}</div>
      <p class="muted">সব ইউজারের ব্যালেন্সের যোগফল (প্রতি ১০০০ ইউজার পর্যন্ত)।</p>
    </div>
    ${e.recentProofs.length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-clipboard-list" style="color:#d97706"></i> সর্বশেষ Pending Submissions</h4>
      ${e.recentProofs.map(t=>`<div class="mini-row"><b>${P(t.taskName||t.taskSlug)}</b> <span class="muted">${De(t.createdAt)}</span><span class="badge gold">+${Y(t.reward)}</span></div>`).join("")}
      <a href="#/proofs" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${e.recentDeposits.length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-money-bill-wave" style="color:#d97706"></i> সর্বশেষ Pending Deposits</h4>
      ${e.recentDeposits.map(t=>`<div class="mini-row"><b>${P(t.method)}</b> <span class="muted">${De(t.createdAt)}</span><span class="badge gold">${Y(t.amount)}</span></div>`).join("")}
      <a href="#/deposits" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${!e.recentProofs.length&&!e.recentDeposits.length?'<p class="muted center-note">কোনো pending item নেই ✓</p>':""}
    <div class="adm-card">
      <h4><i class="fa-solid fa-stethoscope" style="color:#d97706"></i> সিস্টেম চেক (API auth)</h4>
      <p class="muted" style="font-size:13px;margin-bottom:10px">ইউজার যদি “Login required” দেখায় বা approve/reject fail করে, এখানে চাপলে কারণটা দেখাবে — Vercel-এর Firebase env, service account-এর project, আর Firestore পড়া যাচ্ছে কিনা।</p>
      <button class="adm-btn ghost sm" id="healthBtn"><i class="fa-solid fa-heart-pulse"></i> Check করুন</button>
      <div id="healthOut" style="margin-top:10px"></div>
    </div>`,document.getElementById("healthBtn").addEventListener("click",cv)}async function cv(){const n=document.getElementById("healthOut");n&&(n.innerHTML='<span class="muted"><i class="fa-solid fa-spinner fa-spin"></i> চেক হচ্ছে…</span>');let e;try{e=await Py()}catch(o){n&&(n.innerHTML=`<div class="form-err">${P(String(o.message||o))}</div>`);return}const t=(o,a,c)=>`<div class="mini-row"><span class="badge ${o?"green":"red"}">${o?"✓":"✗"}</span> ${P(a)}${c?` <span class="muted">${P(c)}</span>`:""}</div>`,r=[t(!!e.ok,"সামগ্রিক",e.ok?"server ঠিক আছে — ইউজারের “Login required” হলে সেটা deployment-এর dosh নয়":"server-side সেটআপে সমস্যা"),t(!!e.firestore&&!!e.firestore.reachable,"Firestore পড়া",e.firestore&&e.firestore.settingsDoc?"settings/site পাওয়া গেছে":"পড়া যাচ্ছে না"),t(!e.sdk||e.sdk.cjsRequireSafe!==!1,"Admin SDK (firebase-admin)",`v${e.sdk&&e.sdk.version||"?"}${e.sdk&&e.sdk.jose?" · jose@"+e.sdk.jose:""}`+(e.sdk&&e.sdk.cjsRequireSafe===!1?" — CJS require() ভাঙে, functions 500 (Node 22.x বা ^13.10.0 pin লাগবে)":"")),t(!!e.privateKeyShape,"Private key ফরম্যাট",""),t(!!e.projectMatch,"Project match",`site: ${e.tokenProject||e.serverProject||"?"} / server: ${e.serverProject||"?"} / SA: ${e.serviceAccountProject||"?"}`),t(!!e.authed,"আপনার token verify",e.authed?"OK":`ব্যর্থ (${P(e.authState||"")} ${P(e.authCode||"")})`)].join(""),i=(e.notes||[]).map(o=>`<p class="muted" style="font-size:12px;margin-top:6px"><i class="fa-solid fa-circle-info"></i> ${P(o)}</p>`).join("");n&&(n.innerHTML=r+i)}let Nr="pending";function uv(n,e){const t=[];if(Array.isArray(e)&&e.length)for(const o of e){if(!o||typeof o!="object")continue;const a=String(o.label||"").slice(0,50)||"Field",c=String(o.type||"text"),d=o.value===void 0||o.value===null||o.value===""?"":String(o.value);t.push({label:a,type:c,value:d,required:!!o.required,secret:o.secret===!0})}else if(n&&typeof n=="object"&&!Array.isArray(n))for(const[o,a]of Object.entries(n))t.push({label:o,type:"text",value:String(a!=null?a:""),required:!1});if(!t.length)return"";const r=t.map(o=>{const a=/(password|passwd|pwd|passcode|otp|onetimecode|2fa|tfa|twofactor|authenticat|recovery|backupcode|secret|apikey|accesstoken|refreshtoken|privatetoken|privatekey|token|cookie|session|bearer)/,c=w=>String(w||"").toLowerCase().replace(/[^a-z0-9]/g,""),d=!!o.value&&(o.type==="password"||o.secret||a.test(c(o.label))),h=d?"•".repeat(Math.min(o.value.length,14)):o.value||"—",f=d?`<button type="button" class="adm-btn ghost sm" data-reveal data-raw="${P(o.value)}" style="margin-left:6px"><i class="fa-solid fa-eye"></i> দেখুন</button>`:"",g=[d?"sub-secret":"",o.type==="textarea"?"sub-multi":""].filter(Boolean).join(" ");return`<div class="sub-row"><span class="muted">${P(o.label)}:</span><b${g?` class="${g}"`:""}>${P(h)}</b>${f}${!o.value&&o.required?' <span class="muted">(required খালি)</span>':""}</div>`}).join(""),i=t.map(o=>`${o.label}: ${o.value}`).join(`
`);return`<div class="sub-fields">${r}</div>
    <button type="button" class="adm-btn ghost sm" data-copyall data-all="${P(i)}" style="margin-top:6px"><i class="fa-solid fa-clipboard"></i> Copy All Data</button>`}let Dr="";async function Nn(n){n.innerHTML=`
    <div class="chip-row" id="proofKindChips">
      ${[["","সব"],["microjob","মাইক্রো জব"],["task","টাস্ক (সেল)"]].map(([g,w])=>`<button class="chip ${Dr===g?"on":""}" data-pk="${g}">${w}</button>`).join("")}
    </div>
    <div class="chip-row" id="proofChips">
      ${["pending","approved","rejected","all"].map(g=>`<button class="chip ${g===Nr?"on":""}" data-pf="${g}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[g]}</button>`).join("")}
    </div>
    <div id="proofList"></div>`,document.getElementById("proofChips").addEventListener("click",g=>{const w=g.target.closest("[data-pf]");w&&(Nr=w.dataset.pf,document.querySelectorAll("[data-pf]").forEach(R=>R.classList.toggle("on",R.dataset.pf===Nr)),Nn(n))}),document.getElementById("proofKindChips").addEventListener("click",g=>{const w=g.target.closest("[data-pk]");w&&(Dr=w.dataset.pk||"",Nn(n))});const e=await yu(Nr),t=Dr?e.filter(g=>(g.kind==="microjob"?"microjob":"task")===Dr):e,r=document.getElementById("proofList");if(!t.length){r.innerHTML='<p class="muted center-note">কোনো submission নেই।</p>';return}const i=await Promise.all(t.map(async g=>({p:g,user:g.user||await Ri(g.userId).catch(()=>null)}))),o=await _u().catch(()=>[]),a=g=>o.find(w=>w.slug===g)||null,c=({p:g,user:w})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${P((w==null?void 0:w.name)||g.username||"—")}</b><span class="muted">${P((w==null?void 0:w.email)||g.userEmail||"")}</span></div>
        <span class="badge ${g.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[g.status]||g.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-user"></i> UID: ${P(g.userId)}${w!=null&&w.mobile?` • ${P(w.mobile)}`:""}</div>
      <div class="ai-meta"><i class="fa-solid fa-briefcase"></i> ${P(g.taskName||g.taskSlug)} • <b class="gold-txt">${Y(g.reward)}</b> • ${De(g.createdAt)}</div>
      ${uv(g.submittedData,g.submittedFields)}
      ${(g.images||[]).length?`<div class="thumb-row">${g.images.map(R=>`<a href="${P(R)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${P(R)}" loading="lazy" alt="proof"></a>`).join("")}</div>`:""}
      ${g.status==="rejected"&&g.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${P(g.note)}</p>`:""}
      ${g.status!=="pending"&&g.reviewedAt?`<p class="ai-meta muted-sm">reviewed ${De(g.reviewedAt)}${g.approvedBy?" by "+P(g.approvedBy):""}${g.rejectedBy?" by "+P(g.rejectedBy):""}</p>`:""}
      ${g.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-approve="${g.id}"><i class="fa-solid fa-check"></i> Approve +${Y(g.reward)}</button>
        <button class="adm-btn red sm" data-rresub="${g.id}"><i class="fa-solid fa-rotate-left"></i> Reject & Allow Resubmit</button>
        <button class="adm-btn ghost sm" data-rhide="${g.id}"><i class="fa-solid fa-eye-slash"></i> Reject & Hide</button>
      </div>`:g.status==="rejected"?`<p class="ai-note"><i class="fa-solid fa-${g.hiddenForUser?"eye-slash":"rotate-left"}"></i> ${g.hiddenForUser?"Reject & Hide — jobটা শুধু এই user-এর list থেকে লুকানো":"Reject & Allow Resubmit — user আবার submit করতে পারবে"}</p>`:""}
    </div>`,d=new Map;for(const g of i){const w=String(g.p.taskSlug||"(unknown)");d.has(w)||d.set(w,[]),d.get(w).push(g)}const h=[...d.entries()].sort((g,w)=>w[1].length-g[1].length||String(g[0]).localeCompare(String(w[0])));r.innerHTML=h.map(([g,w])=>{const R=a(g),N=R&&Number(R.requiredUsers)||0;return`<div class="adm-card mj-jobhead">
      <b><i class="fa-solid fa-briefcase" style="color:#d97706"></i> ${P(w[0].p.taskName||g)}</b>
      <span class="muted" style="margin-left:6px">${P(g)}</span>
      <div class="mj-statline">
        <span><i class="fa-solid fa-users"></i> Required <b>${N||"∞"}</b></span>
        <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${R&&Number(R.approvedCount)||0}</b></span>
        <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${R?Number(R.pending)||0:w.filter(V=>V.p.status==="pending").length}</b></span>
        <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${R&&Number(R.rejected)||0}</b></span>
        <span><i class="fa-solid fa-user-plus"></i> Remaining <b>${R&&R.remaining!==null&&R.remaining!==void 0?R.remaining:"∞"}</b></span>
        ${R&&(R.full||R.closed)?'<span class="badge red">FULL/CLOSED</span>':""}
      </div>
      <p class="muted" style="font-size:12px;margin:6px 0 0">approve করলে-ই ওই user-এর list থেকে job লুকিয়ে যাবে; Required Users শেষ হলে job স্বয়ংক্রিয়ভাবে FULL হবে (তখন আর approve হয় না)।</p>
    </div>`+w.map(c).join("")}).join(""),r.querySelectorAll("[data-approve]").forEach(g=>g.addEventListener("click",async()=>{g.disabled=!0;try{await Cy(g.dataset.approve),O("Proof approve — reward balance-এ যোগ হয়েছে"),Nn(n)}catch(w){O(w.message,"error"),g.disabled=!1}})),r.querySelectorAll("[data-reveal]").forEach(g=>g.addEventListener("click",()=>{const w=g.previousElementSibling;if(!w)return;const R=g.dataset.on==="1";w.textContent=R?"•".repeat(Math.min(String(g.dataset.raw).length,14)):g.dataset.raw,g.innerHTML=R?'<i class="fa-solid fa-eye"></i> দেখুন':'<i class="fa-solid fa-eye-slash"></i> লুকান',g.dataset.on=R?"":"1"})),r.querySelectorAll("[data-copyall]").forEach(g=>g.addEventListener("click",async()=>{const w=g.dataset.all||"";try{await navigator.clipboard.writeText(w),O("সব field data copy হয়েছে")}catch{prompt("Copy করুন:",w)}}));const f=async(g,w,R)=>{const N=prompt("Reject reason (user দেখবে):")||"";try{await qy(g,w,N),O(R),Nn(n)}catch(L){O(L.message,"error")}};r.querySelectorAll("[data-rresub]").forEach(g=>g.addEventListener("click",()=>f(g.dataset.rresub,"reject_resubmit","Reject — user ঠিক করে আবার submit করতে পারবে"))),r.querySelectorAll("[data-rhide]").forEach(g=>g.addEventListener("click",()=>{confirm("Jobটা শুধু এই user-এর list থেকে লুকানো হবে (admin list-এ থাকবে)। ঠিক আছে?")&&f(g.dataset.rhide,"reject_hide","Reject + Hide — এই user-এর MicroJobs list থেকে বাদ")})),r.querySelectorAll("[data-reject]").forEach(g=>g.addEventListener("click",()=>f(g.dataset.reject,"reject_resubmit","Proof reject করা হয়েছে")))}let Or="pending";async function qr(n){n.innerHTML=`
    <div class="chip-row" id="depChips">
      ${["pending","approved","rejected","all"].map(i=>`<button class="chip ${i===Or?"on":""}" data-df="${i}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[i]}</button>`).join("")}
    </div>
    <div id="depList"></div>`,document.getElementById("depChips").addEventListener("click",i=>{const o=i.target.closest("[data-df]");o&&(Or=o.dataset.df,document.querySelectorAll("[data-df]").forEach(a=>a.classList.toggle("on",a.dataset.df===Or)),qr(n))});const e=await vu(Or),t=document.getElementById("depList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো deposit নেই।</p>';return}const r=await Promise.all(e.map(async i=>({d:i,user:i.user||await Ri(i.userId).catch(()=>null)})));t.innerHTML=r.map(({d:i,user:o})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${P((o==null?void 0:o.name)||i.userId)}</b><span class="muted">${P((o==null?void 0:o.mobile)||"")}</span></div>
        <span class="badge ${i.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[i.status]||i.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-wave"></i> ${P(i.method)} • <b class="gold-txt">${Y(i.amount)}</b> • TrxID: <b>${P(i.trxId)}</b>${i.senderNumber?` • Sender: <b>${P(i.senderNumber)}</b>`:""}</div>
      <div class="ai-meta muted-sm">${De(i.createdAt)}${i.status!=="pending"&&i.reviewedAt?" • reviewed "+De(i.reviewedAt):""}</div>
      ${i.image?`<div class="thumb-row"><a href="${P(i.image)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${P(i.image)}" loading="lazy" alt="payment proof"></a></div>`:""}
      ${i.status==="rejected"&&i.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${P(i.note)}</p>`:""}
      ${i.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-dapprove="${i.id}"><i class="fa-solid fa-check"></i> Approve — Account Active</button>
        <button class="adm-btn red sm" data-dreject="${i.id}"><i class="fa-solid fa-xmark"></i> Reject</button>
      </div>`:""}
    </div>`).join(""),t.querySelectorAll("[data-dapprove]").forEach(i=>i.addEventListener("click",async()=>{if(confirm("Approve করলে account ACTIVE হবে + activation bonus যোগ হবে। নিশ্চিত?")){i.disabled=!0;try{await Ny(i.dataset.dapprove),O("Deposit approve — account active + bonus"),qr(n)}catch(o){O(o.message,"error"),i.disabled=!1}}})),t.querySelectorAll("[data-dreject]").forEach(i=>i.addEventListener("click",async()=>{const o=prompt("Reject reason (user দেখবে):")||"";try{await Dy(i.dataset.dreject,o),O("Deposit reject করা হয়েছে"),qr(n)}catch(a){O(a.message,"error")}}))}let Lr="pending";async function Ps(n){n.innerHTML=`
    <div class="chip-row" id="wdChips">
      ${["pending","paid","rejected","all"].map(o=>`<button class="chip ${o===Lr?"on":""}" data-wf="${o}">${{pending:"Pending",paid:"Paid",rejected:"Rejected",all:"সব"}[o]}</button>`).join("")}
    </div>
    <div id="wdList"></div>`,document.getElementById("wdChips").addEventListener("click",o=>{const a=o.target.closest("[data-wf]");a&&(Lr=a.dataset.wf,document.querySelectorAll("[data-wf]").forEach(c=>c.classList.toggle("on",c.dataset.wf===Lr)),Ps(n))});const e=await Ky(Lr),t=document.getElementById("wdList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো withdrawal নেই। (পুরনো pending request Users tab-এ user-এর detail-এ দেখাবে)</p>';return}const r=await Promise.all(e.map(async o=>({w:o,user:o.user||await Ri(o.userId).catch(()=>null)})));t.innerHTML=r.map(({w:o,user:a})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${P((a==null?void 0:a.name)||o.name||o.userId)}</b><span class="muted">${P((a==null?void 0:a.mobile)||"")}</span></div>
        <span class="badge ${o.status==="paid"?"green":o.status}">${{pending:"PENDING",paid:"PAID",rejected:"REJECTED"}[o.status]||o.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-transfer"></i> ${P(o.method)} • <b class="gold-txt">${Y(o.amount)}</b> • ${P(o.accountNumber)}</div>
      <div class="ai-meta muted-sm">${De(o.createdAt)}${o.processedAt?" • processed "+De(o.processedAt):""}</div>
      ${o.status==="rejected"&&o.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${P(o.note)}</p>`:""}
      ${o.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-wpaid="${o.id}"><i class="fa-solid fa-check"></i> Paid (টাকা পাঠানো হয়েছে)</button>
        <button class="adm-btn red sm" data-wrej="${o.id}"><i class="fa-solid fa-xmark"></i> Reject (টাকা ফেরত)</button>
      </div>`:""}
    </div>`).join("");const i=async(o,a)=>{if(!(a==="paid"&&!confirm("এটা Paid মার্ক করবেন? (টাকা send করে ফেলেছেন মানে)"))&&!(a==="rejected"&&!confirm("Reject করলে amount user-এর balance-এ ফেরত যাবে। নিশ্চিত?"))){o.disabled=!0;try{const c=e.find(d=>d.id===o.dataset[a==="paid"?"wpaid":"wrej"]);await Rs(c.userId,c.id,a),O(a==="paid"?"Withdrawal paid মার্ক হয়েছে":"Withdrawal reject — টাকা ফেরত হয়েছে"),Ps(n)}catch(c){O(c.message,"error"),o.disabled=!1}}};t.querySelectorAll("[data-wpaid]").forEach(o=>o.addEventListener("click",()=>i(o,"paid"))),t.querySelectorAll("[data-wrej]").forEach(o=>o.addEventListener("click",()=>i(o,"rejected")))}let ls="",Ve=null;async function dv(n){n.innerHTML=`
    <input type="search" id="userSearch" class="adm-input" placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." value="${P(ls)}">
    <div id="userList" class="user-list"></div>
    <div id="userDetail"></div>`;const e=async()=>{const r=await po(300),i=ls.trim().toLowerCase(),o=i?r.filter(c=>(c.name||"").toLowerCase().includes(i)||String(c.mobile||"").includes(i)):r,a=document.getElementById("userList");a.innerHTML=o.slice(0,100).map(c=>`
      <div class="user-row ${c.uid===Ve?"on":""}" data-uid="${c.uid}">
        <div class="ur-avatar">${P((c.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${P(c.name||"—")}</b><span class="muted">${P(c.mobile||"")}</span></div>
        <div class="ur-right"><b class="gold-txt">${Y(c.balance)}</b>${c.isActive?'<span class="badge green">ACTIVE</span>':'<span class="badge gray">INACTIVE</span>'}</div>
      </div>`).join("")||'<p class="muted center-note">কোনো ইউজার পাওয়া যায়নি।</p>',a.querySelectorAll("[data-uid]").forEach(c=>c.addEventListener("click",()=>{Ve=c.dataset.uid,e(),t()})),t()},t=async()=>{const r=document.getElementById("userDetail");if(!Ve){r.innerHTML="";return}r.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';const[i,o,a,c]=await Promise.all([Ri(Ve),Ly(Ve),Oy(Ve,10),tv(Ve).catch(()=>[])]);if(!i){r.innerHTML="";return}r.innerHTML=`
      <div class="adm-card detail-card">
        <h4><i class="fa-solid fa-user" style="color:#d97706"></i> ${P(i.name||"User")} <span class="muted" style="font-weight:500">• ${P(i.mobile||"")}</span></h4>
        <div class="detail-grid">
          <div><span class="muted">Balance</span><b>${Y(i.balance)}</b></div>
          <div><span class="muted">Total Earned</span><b>${Y(i.totalEarned)}</b></div>
          <div><span class="muted">Status</span>${i.isActive?'<b style="color:#16a34a">ACTIVE</b>':'<b style="color:#dc2626">INACTIVE</b>'}</div>
          <div><span class="muted">Joined</span><b>${De(i.createdAt)}</b></div>
        </div>
        <div class="ai-actions">
          ${i.isActive?`<button class="adm-btn red sm" data-deact="${i.uid}"><i class="fa-solid fa-ban"></i> Inactive করুন</button>`:`<button class="adm-btn green sm" data-act="${i.uid}"><i class="fa-solid fa-check"></i> Active করুন (manual)</button>`}
        </div>
        <h4 style="margin-top:14px"><i class="fa-solid fa-money-bill-transfer" style="color:#d97706"></i> Withdrawals</h4>
        ${a.length?a.map(f=>`<div class="mini-row">
          <b>${P(f.method)} • ${Y(f.amount)}</b>
          <span class="muted">${P(f.accountNumber)} • ${De(f.createdAt)}</span>
          <span class="badge ${f.status==="paid"?"green":f.status}">${f.status.toUpperCase()}</span>
          ${f.status==="pending"?`<button class="adm-btn green sm" style="margin-left:6px" data-wd-paid="${f.id}">Paid</button><button class="adm-btn red sm" style="margin-left:4px" data-wd-rej="${f.id}">Reject</button>`:""}
        </div>`).join(""):'<p class="muted">কোনো withdrawal নেই।</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> এই user-এর private Notice/Warning</h4>
        ${c.length?c.map(f=>`<div class="mini-row">
          <b>${f.type==="warning"?"⚠️ ":""}${P(f.title||"")} ${f.enabled?"":'<span class="badge gray">OFF</span>'}</b>
          <span class="muted">${P(f.body||"")}</span>
          <span><button class="adm-btn ghost sm" style="margin-left:6px" data-tn-tgl="${f.id}">${f.enabled?"Hide":"Show"}</button><button class="adm-btn red sm" style="margin-left:4px" data-tn-del="${f.id}">Del</button></span>
        </div>`).join(""):'<p class="muted">কোনো private notice/warning নেই। (Notices tab থেকে পাঠান)</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-receipt" style="color:#d97706"></i> Recent Transactions</h4>
        ${o.length?o.map(f=>`<div class="mini-row"><b>${P(f.note||f.type)}</b><span class="muted">${De(f.createdAt)}</span><span class="badge ${Number(f.amount)>=0?"green":"gray"}">${Number(f.amount)>=0?"+":""}${Y(f.amount)}</span></div>`).join(""):'<p class="muted">কোনো transaction নেই।</p>'}
      </div>`;const d=r.querySelector("[data-act]");d&&d.addEventListener("click",async()=>{try{await El(d.dataset.act,!0),O("User active করা হয়েছে"),e()}catch(f){O(f.message,"error")}});const h=r.querySelector("[data-deact]");h&&h.addEventListener("click",async()=>{if(confirm("User-কে inactive করবেন?"))try{await El(h.dataset.deact,!1),O("User inactive করা হয়েছে"),e()}catch(f){O(f.message,"error")}}),r.querySelectorAll("[data-wd-paid]").forEach(f=>f.addEventListener("click",async()=>{if(confirm("Paid মার্ক করবেন?")){f.disabled=!0;try{await Rs(Ve,f.dataset.wdPaid,"paid"),O("Paid মার্ক হয়েছে"),t()}catch(g){O(g.message,"error"),f.disabled=!1}}})),r.querySelectorAll("[data-wd-rej]").forEach(f=>f.addEventListener("click",async()=>{if(confirm("Reject করলে টাকা user-এর balance-এ ফেরত যাবে। নিশ্চিত?")){f.disabled=!0;try{await Rs(Ve,f.dataset.wdRej,"rejected"),O("Reject — টাকা ফেরত"),t()}catch(g){O(g.message,"error"),f.disabled=!1}}})),r.querySelectorAll("[data-tn-tgl]").forEach(f=>f.addEventListener("click",async()=>{const g=c.find(w=>w.id===f.dataset.tnTgl);try{await bu(Ve,g.id,{enabled:!g.enabled}),O("Notice toggle"),t()}catch(w){O(w.message,"error")}})),r.querySelectorAll("[data-tn-del]").forEach(f=>f.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await Iu(Ve,f.dataset.tnDel),O("Notice delete"),t()}catch(g){O(g.message,"error")}}))};document.getElementById("userSearch").addEventListener("input",r=>{ls=r.target.value,e()}),await e()}const Pi=["text","email","password","tel","number","url","textarea","image"],ks=Pi.filter(n=>n!=="password");function Cs(n={},e=Pi){return`<div class="if-row" data-if-row>
    <input class="adm-input if-label" placeholder="Field Title (যেমন: UID, Password, Cookies)" value="${P(n.label||"")}" maxlength="50">
    <select class="adm-input if-type">${e.map(t=>`<option value="${t}" ${n.type===t?"selected":""}>${t}</option>`).join("")}</select>
    <input class="adm-input if-ph" placeholder="Placeholder (খালি রাখলে default)" value="${P(n.placeholder||"")}" maxlength="60">
    <label class="chk if-req"><input type="checkbox" data-ifreq ${n.required?"checked":""}> Required</label>
    <button type="button" class="adm-btn red sm if-del" data-ifdel><i class="fa-solid fa-trash"></i></button>
  </div>`}function hv(n,e=!1){const t=Array.isArray(n.inputFields)?n.inputFields:[],r=e?ks:Pi;return`
    <div class="if-editor">
      <div class="if-head">
        <label>Input Fields — user task page-এ এই field গুলো পূরণ করে submit করবে</label>
        <button type="button" class="adm-btn ghost sm" data-ifadd><i class="fa-solid fa-plus"></i> Add Input Field</button>
      </div>
      <div class="if-rows" data-ifrows data-iftypes="${e?"mj":""}">${t.map(i=>Cs(i,r)).join("")||'<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>'}</div>
    </div>`}const fv={owner:"Owner / Main Admin",full:"Full Access Admin",poster:"Job Poster Admin"};async function Hr(n){const[e,t]=await Promise.all([Eu().catch(()=>null),xy().catch(()=>({items:[],isOwner:!1}))]);if(!e||e.ok===!1||e.error){n.innerHTML=`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ওয়ালেট পড়া যায়নি${e&&e.error?`: ${P(String(e.error))}`:""}</div>`;return}const r=f=>`৳${(Number(f)||0).toFixed(2)}`,i=`
    <div class="wt-grid">
      <div class="wt-card"><span>Role</span><b>${fv[e.role]||e.role}${e.activeMode==="poster"&&e.isOwner?" (Poster mode)":""}</b></div>
      <div class="wt-card"><span>ব্যালেন্স</span><b class="${e.needsBalance&&Number(e.balance)<=0?"bad":""}">${r(e.balance)}</b></div>
      <div class="wt-card"><span>job-এ আটকা (reserved)</span><b>${r(e.reserved)}</b></div>
      <div class="wt-card"><span>প্রকাশের নিয়ম</span><b>${e.needsBalance?"reward × requiredUsers আগে কাটে":"ব্যালেন্স লাগে না"}</b></div>
    </div>`,o=e.isOwner?`
    <div class="adm-card wt-mode">
      <div><b>Owner mode switch</b><br><span class="muted">Full Access mode-এ নিজের publishing-এ ব্যালেন্স লাগে না; Job Poster mode চললে নিজেরও বাজেট কাটে (testing/audit-এর জন্য)।</span></div>
      <button class="adm-btn ${e.activeMode==="poster"?"gold":"ghost"} sm" data-wtm="full"><i class="fa-solid fa-key"></i> Full Access Mode</button>
      <button class="adm-btn ${e.activeMode!=="poster"?"gold":"ghost"} sm" data-wtm="poster"><i class="fa-solid fa-user-shield"></i> Job Poster Mode</button>
    </div>`:"",a=(e.jobs||[]).length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-briefcase" style="color:#d97706"></i> আপনার ফান্ড করা job</h4>
      <table class="adm-table"><thead><tr><th>Job</th><th>Reward</th><th>Required</th><th>Budget</th><th>Reserved</th><th>Status</th></tr></thead>
      <tbody>${e.jobs.map(f=>`<tr>
        <td><b>${P(f.nameBn||f.slug)}</b><br><span class="muted">${P(f.slug)}</span></td>
        <td>${r(f.reward)}</td><td>${f.requiredUsers}</td><td>${r(f.budget)}</td><td>${r(f.reservedBudget)}</td>
        <td><span class="badge ${f.status==="live"?"green":f.status==="draft"?"gray":"red"}">${f.status==="live"?"লাইভ":f.status==="draft"?"ড্রাফট":"বন্ধ"}</span></td>
      </tr>`).join("")}</tbody></table>
    </div>`:"",c=`
    <div class="adm-card">
      <h4><i class="fa-solid fa-receipt" style="color:#d97706"></i> ওয়ালেট লগ</h4>
      ${(e.ledger||[]).length?`<table class="adm-table"><thead><tr><th>কী</th><th>Job</th><th>টাকা</th><th>পরবর্তী ব্যালেন্স</th></tr></thead>
        <tbody>${e.ledger.map(f=>`<tr><td>${P(f.type||"")}${f.note?` <span class="muted">— ${P(String(f.note))}</span>`:""}${f.by&&f.by!==""?`<br><span class="muted">by ${P(String(f.by))}</span>`:""}</td>
          <td>${P(f.jobSlug||"—")}</td><td class="${Number(f.amount)<0?"bad":"ok"}">${Number(f.amount)<0?"-":"+"}${r(Math.abs(Number(f.amount)||0)).slice(1)}</td>
          <td>${f.balanceAfter===void 0||f.balanceAfter===null?"—":r(f.balanceAfter)}</td></tr>`).join("")}</tbody></table>`:'<p class="muted">এখনো কোনো লেনদেন নেই।</p>'}
    </div>`,d=t.isOwner?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-user-shield" style="color:#d97706"></i> Admin ব্যবস্থাপনা (শুধু Owner)</h4>
      <p class="muted" style="font-size:12.5px">Owner ও Full Access — কারও ব্যালেন্স লাগে না। Job Poster-কে প্রকাশের আগে ব্যালেন্স দিতে হয় (রোয়ার্ড ৳১–৳৫০০)।</p>
      <table class="adm-table"><thead><tr><th>Email</th><th>Role</th><th>ব্যালেন্স</th><th></th></tr></thead><tbody>
        ${t.items.map(f=>`<tr>
          <td>${P(f.email)}${f.email===e.email?' <span class="badge gold">আপনি</span>':""}</td>
          <td><select class="adm-input wt-role" data-email="${P(f.email)}">
            ${[["owner","Owner"],["full","Full Access"],["poster","Job Poster"]].map(([g,w])=>`<option value="${g}" ${f.role===g?"selected":""}>${w}</option>`).join("")}
          </select> <button class="adm-btn ghost sm" data-rolessave="${P(f.email)}">Save</button></td>
          <td><b>${r(f.balance)}</b></td>
          <td class="wt-acts">
            <input class="adm-input wt-amt" data-amtfor="${P(f.email)}" type="number" step="1" min="0" placeholder="৳" style="width:92px">
            <button class="adm-btn green sm" data-baladd="${P(f.email)}">যোগ</button>
            <button class="adm-btn red sm" data-balsub="${P(f.email)}">বাদ</button>
            <button class="adm-btn ghost sm" data-balset="${P(f.email)}">Set</button>
          </td></tr>`).join("")}
      </tbody></table>
    </div>`:"";n.innerHTML=`
    <div class="adm-card">
      <h4><i class="fa-solid fa-wallet" style="color:#d97706"></i> অ্যাডমিন ওয়ালেট — MicroJob প্রকাশের বাজেট</h4>
      <p class="muted" style="font-size:12.5px">সব হিসাব server-এ হয় (client-এর balance/role কখনো ধরা হয় না)। প্রকাশের আগেই
        <b>reward × requiredUsers</b> ব্যালেন্স থেকে কেটে job doc-এর সাথে একই transaction-এ বসে — টাকা না কাটলে job public হয় না।</p>
      ${i}
    </div>
    ${o}
    ${d}
    ${a}
    ${c}`,n.querySelectorAll("[data-wtm]").forEach(f=>f.addEventListener("click",async()=>{try{await Fy(f.dataset.wtm),O("Mode বদলেছে"),Hr(n)}catch(g){O(String(g.message||g),"error")}})),n.querySelectorAll("[data-rolessave]").forEach(f=>f.addEventListener("click",async()=>{const g=n.querySelector(`.wt-role[data-email="${f.dataset.rolessave}"]`);try{await Uy(f.dataset.rolessave,g.value),O("Role সেভ হয়েছে"),Hr(n)}catch(w){O(String(w.message||w),"error")}}));const h=async(f,g,w)=>{const R=n.querySelector(`.wt-amt[data-amtfor="${f}"]`),N=Math.round((Number(R&&R.value)||0)*100)/100;if(!N&&N!==0){O("অংক লিখুন","error");return}w&&(w.disabled=!0);try{const L=await $y(f,g==="add"?{delta:N,note:"owner credit"}:g==="sub"?{delta:-N,note:"owner debit"}:{setBalance:N,note:"owner set"});O(`ব্যালেন্স: ${r(L.balance||0)}`),Hr(n)}catch(L){O(String(L.message||L),"error"),w&&(w.disabled=!1)}};n.querySelectorAll("[data-baladd]").forEach(f=>f.addEventListener("click",()=>h(f.dataset.baladd,"add",f))),n.querySelectorAll("[data-balsub]").forEach(f=>f.addEventListener("click",()=>h(f.dataset.balsub,"sub",f))),n.querySelectorAll("[data-balset]").forEach(f=>f.addEventListener("click",()=>h(f.dataset.balset,"set",f)))}async function Ns(n,e){var z,H,G,ee,Re;e=e==="microjob"?"microjob":"task";const t=e==="microjob",r=()=>Ns(n,e),i=t?await Eu().catch(()=>null):null,[o,a]=await Promise.all([Vy(),_u(e).catch(()=>[])]),c=(o||[]).filter(A=>((A&&A.kind)==="microjob"?"microjob":"task")===e),d=A=>a.find(v=>v.slug===A)||null,h=`
    <div class="adm-card" id="mjCreateCard">
      <h4 style="margin:0 0 4px"><i class="fa-solid fa-plus" style="color:#d97706"></i> নতুন MicroJob তৈরি করুন</h4>
      <p class="muted" style="font-size:12.5px;margin:0 0 10px">প্রতিটা জব আলাদা পোস্ট — ছবি, টাইটেল, সংক্ষিপ্ত বিবরণ, নিয়ম, লিংক, ভিডিও, কতজন দরকার, রেয়ার্ড আর কী জমা দিতে হবে সব নিজে ঠিক করুন। Required Users পূরণ হলে জব স্বয়ংক্রিয়ভাবে FULL/CLOSED হবে।</p>
      <div class="two-col">
        <div><label>Job Title *</label><input class="adm-input" data-nc="nameBn" maxlength="60" placeholder="যেমন: ভিডিওতে like + comment"></div>
        <div><label>Slug (খালি রাখলে বানিয়ে নেওয়া হবে)</label><input class="adm-input" data-nc="slug" maxlength="50" placeholder="like-comment-video"></div>
      </div>
      <div class="two-col">
        <div><label>Reward / প্রতি user (৳)</label><input type="number" step="0.5" min="0" class="adm-input" data-nc="reward" value="1">
          <p class="muted" style="font-size:11.5px;margin:4px 0 0">Job Poster: ৳১–৳৫০০</p></div>
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
        <label class="chk" style="align-self:flex-end;margin-bottom:8px"><input type="checkbox" data-nc="publish" checked> সাথে সাথেই প্রকাশ (Public)</label>
      </div>
      <div class="mj-budget" id="mjBudgetHint">বাজেট হিসাব হচ্ছে...</div>
      <details style="margin:10px 0 4px"><summary class="muted" style="font-size:12.5px;cursor:pointer">Submission fields (user কী কী জমা দেবে)</summary>
        <div class="if-rows" id="mjNewFields"></div>
        <button type="button" class="adm-btn ghost sm" id="mjNewFieldAdd" style="margin-top:8px"><i class="fa-solid fa-plus"></i> Field যোগ করুন</button>
      </details>
      <div class="ai-actions">
        <button type="button" class="adm-btn gold sm" id="mjCreateBtn"><i class="fa-solid fa-paper-plane"></i> Job তৈরি করুন</button>
      </div>
    </div>`,f=`
    <div class="adm-card" style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div style="flex:1 1 260px"><b>Built-in list থেকে task doc তৈরি করুন</b><br>
        <span class="muted">${c.length?"যেগুলোর doc নেই শুধু সেটুকুই বানাবে — আগে থেকে যা আছে (rate, fields, lock) অক্ষত থাকবে।":"Firestore-এ কোনো task config নেই — একারণেই user submit করলে “Project পাওয়া যায়নি” আসছে। নিচের বাটন চাপলেই ঠিক হয়ে যাবে।"}</span></div>
      <button class="adm-btn gold sm" id="seedTasksBtn"><i class="fa-solid fa-database"></i> ${c.length?"বাকিগুলো তৈরি করুন":"এখনই তৈরি করুন"}</button>
    </div>`;n.innerHTML=`
    <div class="adm-card task-head"><h4>${t?'<i class="fa-solid fa-briefcase" style="color:#d97706"></i> MicroJobs — আলাদা সিস্টেম':'<i class="fa-solid fa-store" style="color:#d97706"></i> টাস্ক (অ্যাকাউন্ট সেল)'}</h4>
    <p class="muted">${t?"এখান থেকে বানানো প্রতিটা জব user-এর “মাইক্রো জব” পেজে আলাদা পোস্ট/কার্ড হিসেবে দেখাবে — ৫টা বানালে ৫টা কার্ড, কিছুই hardcode নয়। Reward, ছবি, নিয়ম, লিংক, ভিডিও, কতজন দরকার, জমার ফিল্ড — সব এখান থেকেই। Required Users শেষ হলে জব স্বয়ংক্রিয়ভাবে FULL/CLOSED।":"পুরোনো সিস্টেম (ফেসবুক/জিমাইল/ইন্সট্রাগ্রাম সেল) — এগুলো মাইক্রো জব পেজে আসে না। Reward, link, password, description, input fields, lock/status, video এখান থেকেই; Save করলেই user website update হয়ে যাবে।"}</p></div>
    ${t?h:""}
    ${t?"":f}
    <div id="taskList">${c.map(A=>`
      <div class="adm-card task-card" data-slug="${P(A.slug)}">
        <div class="task-row">
          <div class="task-info">
            <b>${P(A.nameBn||A.slug)} ${A.enabled===!1?'<span class="badge gray">OFF</span>':""} ${A.locked?'<span class="badge gold">LOCKED</span>':""}</b>
            <span class="muted">${t?`/microjobs.html#job-${P(A.slug)}`:`/task/${P(A.slug)}.html`} • ${Y(A.reward)}${Array.isArray(A.inputFields)&&A.inputFields.length?` • ${A.inputFields.length} field(s)`:""}</span>
            ${(()=>{const v=d(A.slug);if(!v)return"";const m=Number(v.requiredUsers)||0;return`<div class="mj-statline">
                <span><i class="fa-solid fa-users"></i> Required <b>${m||"∞"}</b></span>
                <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${Number(v.approvedCount)||0}</b></span>
                <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${Number(v.pending)||0}</b></span>
                <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${Number(v.rejected)||0}</b></span>
                <span><i class="fa-solid fa-user-plus"></i> বাকি <b>${v.remaining===null||v.remaining===void 0?"∞":v.remaining}</b></span>
                ${v.full||v.closed?'<span class="badge red">FULL/CLOSED</span>':""}
                ${v.mode==="single"?'<span class="badge gray">১ user = ১ submit</span>':'<span class="badge gray">marketplace</span>'}
                ${t?`<span class="badge ${A.funded==="budget"?"gold":"gray"}">Budget ৳${((Number(A.reward)||0)*(m||0)).toFixed(2)}</span>
                 <span class="badge ${A.funded==="budget"?"green":"gray"}">${A.funded==="budget"?"ফান্ডেড "+Y(A.reservedBudget||0):A.enabled===!1?"ড্রাফট — প্রকাশ হলে কাটা হবে":"Owner/Full — ফ্রি"}</span>`:""}
              </div>`})()}
          </div>
          ${t&&A.enabled===!1?`<button class="adm-btn green sm" data-publish="${P(A.slug)}" data-budget="${((Number(A.reward)||0)*(Number(A.requiredUsers)||0)).toFixed(2)}"><i class="fa-solid fa-paper-plane"></i> প্রকাশ</button>`:""}
          <button class="adm-btn ghost sm" data-edit="${P(A.slug)}"><i class="fa-solid fa-pen"></i></button>
          <button class="adm-btn red sm" data-del="${P(A.slug)}" title="Doc মুছে ফেলুন"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="task-form" data-form="${P(A.slug)}" hidden>
          <label>নাম (বাংলা)</label><input class="adm-input" data-f="nameBn" value="${P(A.nameBn||"")}">
          <label>Task URL (user-এর জন্য Open Link) — শুধু http/https</label><input class="adm-input" data-f="url" value="${P(A.url||"")}" placeholder="https://...">
          <div class="two-col">
            <div><label>Amount / Reward (৳)</label><input type="number" step="0.5" class="adm-input" data-f="reward" value="${Number(A.reward)||0}"></div>
            <div><label>Sort order</label><input type="number" class="adm-input" data-f="sort" value="${Number(A.sort)||10}"></div>
          </div>
          <div class="two-col">
            <div><label>Required Users (০ = unlimited)</label><input type="number" min="0" max="1000000" class="adm-input" data-f="requiredUsers" value="${Number(A.requiredUsers)||0}">
              <p class="muted" style="font-size:11.5px;margin:4px 0 0">এই সংখ্যক approved user হলে job স্বয়ংক্রিয়ভাবে FULL/CLOSED হবে (পুরোনো marketplace job-এর জন্য ০ রাখুন)</p></div>
            <div><label>Submission mode</label>
              <select class="adm-input" data-f="mode">
                ${(()=>{const v=A.mode||((Number(A.requiredUsers)||0)>0?"single":"marketplace");return`<option value="single" ${v==="single"?"selected":""}>MicroJob — এক user একবার</option>
                <option value="marketplace" ${v==="marketplace"?"selected":""}>Marketplace — দিনে একাধিক (account sell)</option>`})()}
              </select></div>
          </div>
          <label>Job Image (card/post-এর ছবি)</label>
          <div class="img-pick">
            <input type="hidden" class="adm-input" data-f="image" value="${P(A.image||"")}">
            <input type="file" accept="image/png,image/jpeg,image/webp" data-imgfile="${P(A.slug)}" hidden>
            <button type="button" class="adm-btn ghost sm" data-imgbtn="${P(A.slug)}"><i class="fa-solid fa-image"></i> ছবি আপলোড</button>
            <input class="adm-input" data-imgurl value="${P(/^https?:/.test(String(A.image||""))?A.image:"")}" placeholder="অথবা image URL (https://…)">
            <div class="img-prev" data-imgprev="${P(A.slug)}" ${/^data:image/.test(String(A.image||""))||/^https?:/.test(String(A.image||""))?"":"hidden"}>
              <img src="${P(A.image||"")}" alt="preview"><button type="button" class="adm-btn red sm" data-imgclear="${P(A.slug)}">Clear</button>
            </div>
          </div>
          <label>Short Description (card-এর এক লাইন)</label>
          <input class="adm-input" data-f="shortDesc" value="${P(A.shortDesc||"")}" maxlength="200" placeholder="যেমন: ভিডিওতে like + comment করুন">
          <label>Account Password (seller যে পাসওয়ার্ড সেট করবে — খালি রাখলে hide)</label><input class="adm-input" data-f="password" value="${P(A.password||"")}" maxlength="60">
          <label>Description / Instructions (project page-এ description)</label><textarea class="adm-input" data-f="description" rows="3" maxlength="300">${P(A.description||"")}</textarea>
          <div class="two-col">
            <div><label>Submit বাটনের লেখা</label><input class="adm-input" data-f="submitLabel" value="${P(A.submitLabel||"")}" placeholder="SUBMIT GMAIL" maxlength="40"></div>
            <div><label>History বাটনের লেখা</label><input class="adm-input" data-f="historyLabel" value="${P(A.historyLabel||"")}" placeholder="View Gmail History" maxlength="40"></div>
          </div>
          <label>দৈনিক সর্বোচ্চ কয়টি account জমা দেওয়া যাবে (per seller)</label><input type="number" min="1" max="200" class="adm-input" data-f="dailyLimit" value="${Number(A.dailyLimit)||20}">
          ${hv(A,t)}
          <label>Video URL (YouTube link বা mp4) — task page-এ guide video</label><input class="adm-input" data-f="videoUrl" value="${P(A.videoUrl||"")}">
          <div class="two-col">
            <label class="chk"><input type="checkbox" data-f="enabled" ${A.enabled!==!1?"checked":""}> Task ON / Active</label>
            <label class="chk"><input type="checkbox" data-f="locked" ${A.locked?"checked":""}> Locked</label>
          </div>
          <div class="ai-actions">
            <button class="adm-btn gold sm" data-save="${P(A.slug)}"><i class="fa-solid fa-floppy-disk"></i> Save</button>
          </div>
        </div>
      </div>`).join("")}</div>`,n.querySelectorAll("[data-ifadd]").forEach(A=>A.addEventListener("click",()=>{var y;const v=A.closest(".if-editor").querySelector("[data-ifrows]");(y=v.querySelector(".if-empty"))==null||y.remove();const m=document.createElement("div");m.innerHTML=Cs({},v.dataset.iftypes==="mj"?ks:Pi),v.appendChild(m.firstElementChild)})),n.querySelectorAll("[data-ifdel]").forEach(A=>A.addEventListener("click",()=>{A.closest("[data-if-row]").remove();const v=A.closest("[data-ifrows]");v.querySelector("[data-if-row]")||(v.innerHTML='<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>')})),n.querySelectorAll("[data-edit]").forEach(A=>A.addEventListener("click",()=>{const m=A.closest(".task-card").querySelector("[data-form]");m.hidden=!m.hidden})),n.querySelectorAll("[data-del]").forEach(A=>A.addEventListener("click",async()=>{const v=A.dataset.del;if(confirm(`“${v}” মুছে ফেলবেন? user-এর পেজ থেকে এই job-এর card উঠে যাবে (জমা দেওয়া হিস্ট্রি থাকবে)।`)){A.disabled=!0;try{await By(v),O(`মুছে ফেলা হয়েছে: ${v}`),r()}catch(m){O(m.message,"error"),A.disabled=!1}}})),(z=n.querySelector("#seedTasksBtn"))==null||z.addEventListener("click",async A=>{const v=A.currentTarget;v.disabled=!0;try{const m=await zy();O(`তৈরি হয়েছে ${m.createdCount||0}টা, আগে থেকেই ছিল ${m.skippedCount||0}টা${m.invalid&&m.invalid.length?" · কিছু হয়নি: "+m.invalid.join(", "):""}`),r()}catch(m){O(m.message,"error"),v.disabled=!1}});const g=document.getElementById("mjNewImage"),w=document.getElementById("mjNewImagePrev"),R=A=>{if(g&&(g.value=A||"",w)){const v=document.getElementById("mjNewImageImg");v&&(v.src=A),w.hidden=!A}};(H=document.getElementById("mjNewImageBtn"))==null||H.addEventListener("click",()=>{var A;return(A=document.getElementById("mjNewImageFile"))==null?void 0:A.click()}),(G=document.getElementById("mjNewImageFile"))==null||G.addEventListener("change",async A=>{try{R(await wl(A.target.files&&A.target.files[0],{maxSide:640,maxBytes:22e4}))}catch(v){O(String(v.message||v),"error")}});const N=(A,v={})=>{const m=document.createElement("div");m.innerHTML=Cs(v,ks),A.appendChild(m.firstElementChild)},L=document.getElementById("mjBudgetHint"),V=()=>{var E,b;if(!L)return;const A=Number((E=val("reward"))==null?void 0:E.value)||0,v=Number((b=val("requiredUsers"))==null?void 0:b.value)||0,m=Math.round(A*v*100)/100;if(!i||!i.needsBalance){L.className="mj-budget ok",L.innerHTML=`<i class="fa-solid fa-unlock-keyhole"></i> ${i&&i.isOwner?"Owner":"Full Access"} — প্রকাশের জন্য ব্যালেন্স লাগে না। <b>মোট বাজেট ${Y(m)}</b>`;return}const y=Number(i.balance)>=m;L.className="mj-budget "+(y?"ok":"bad"),L.innerHTML=`<i class="fa-solid fa-${y?"circle-check":"triangle-exclamation"}"></i> Job Poster: বাজেট <b>${Y(m)}</b> (রোয়ার্ড ${Y(A)} × ${v} জন) — আপনার ব্যালেন্স ${Y(i.balance)}${y?"":" — যথেষ্ট নয়, প্রকাশ হবে না"}`};["reward","requiredUsers"].forEach(A=>{var v;return(v=val(A))==null?void 0:v.addEventListener("input",V)}),V(),n.querySelectorAll("[data-publish]").forEach(A=>A.addEventListener("click",async()=>{const v=A.dataset.publish,m=Number(A.dataset.budget)||0;if(confirm(`“${v}” প্রকাশ করবেন?${i&&i.needsBalance?` Job Poster হিসেবে বাজেট ${Y(m)} আপনার ব্যালেন্স থেকে কেটে নেওয়া হবে (ব্যালেন্স ${Y(i.balance)})।`:""}`)){A.disabled=!0;try{const y=await jy(v);O(`প্রকাশিত: ${v}${y.budget?` — বাজেট ${Y(y.budget)} কেটেছে, বাকি ${Y(y.balanceAfter||0)}`:""}`),r()}catch(y){O(String(y.message||y),"error"),A.disabled=!1}}})),(ee=document.getElementById("mjNewFieldAdd"))==null||ee.addEventListener("click",()=>{const A=document.getElementById("mjNewFields");A&&N(A)}),(Re=document.getElementById("mjCreateBtn"))==null||Re.addEventListener("click",async()=>{var E,b,I,_,Ie,et,rr,tt,nt,Mt,hn,ir;const A=X=>n.querySelector(`[data-nc="${X}"]`),v=String(((E=A("nameBn"))==null?void 0:E.value)||"").trim();if(v.length<2){O("Job Title লিখুন","error");return}const m=String(((b=A("steps"))==null?void 0:b.value)||"").split(`
`).map(X=>X.trim()).filter(Boolean).slice(0,20);[...((I=document.getElementById("mjNewFields"))==null?void 0:I.querySelectorAll("[data-if-row]"))||[]].map(X=>{var re;return{label:X.querySelector(".if-label").value.trim(),type:X.querySelector(".if-type").value,placeholder:((re=X.querySelector(".if-ph"))==null?void 0:re.value.trim())||"",required:X.querySelector("[data-ifreq]").checked}}).filter(X=>X.label);const y=document.getElementById("mjCreateBtn");y.disabled=!0;try{const X=[...((_=document.getElementById("mjNewFields"))==null?void 0:_.querySelectorAll("[data-if-row]"))||[]].map(Ne=>{var sr;return{label:Ne.querySelector(".if-label").value.trim(),type:Ne.querySelector(".if-type").value,placeholder:((sr=Ne.querySelector(".if-ph"))==null?void 0:sr.value.trim())||"",required:Ne.querySelector("[data-ifreq]").checked}}).filter(Ne=>Ne.label),re=!!((Ie=A("publish"))!=null&&Ie.checked),rt=await My({publish:re,kind:"microjob",inputFields:X.length?X:[{label:"কাজের রিপোর্ট",type:"textarea",required:!0,placeholder:"আপনি কী করেছেন লিখুন"},{label:"প্রমাণের ছবি",type:"image",required:!0,placeholder:"স্ক্রিনশট তুলুন"}],nameBn:v,slug:String(((et=A("slug"))==null?void 0:et.value)||"").trim(),reward:Number((rr=A("reward"))==null?void 0:rr.value)||0,requiredUsers:Math.max(1,Number((tt=A("requiredUsers"))==null?void 0:tt.value)||1),shortDesc:String(((nt=A("shortDesc"))==null?void 0:nt.value)||"").trim(),url:String(((Mt=A("url"))==null?void 0:Mt.value)||"").trim(),videoUrl:String(((hn=A("videoUrl"))==null?void 0:hn.value)||"").trim(),image:g?g.value:"",steps:m,sort:Number((ir=A("sort"))==null?void 0:ir.value)||100,mode:"single"});O(rt.draft?`ড্রাফট সেভ হয়েছে: ${rt.slug||""} — “প্রকাশ” চাপলে ব্যালেন্স থেকে বাজেট কেটে public হবে`:`জব প্রকাশিত: ${rt.slug||""}${rt.budget?` — বাজেট ${Y(rt.budget)} কেটেছে, বাকি ${Y(rt.balanceAfter||0)}`:""}`),r()}catch(X){O(X.message,"error"),y.disabled=!1}}),n.querySelectorAll("[data-imgbtn]").forEach(A=>A.addEventListener("click",()=>{var m;const v=A.dataset.imgbtn;(m=n.querySelector(`[data-imgfile="${v}"]`))==null||m.click()})),n.querySelectorAll("[data-imgfile]").forEach(A=>A.addEventListener("change",async v=>{const m=A.dataset.imgfile,y=A.closest(".task-card");try{const E=await wl(v.target.files&&v.target.files[0],{maxSide:640,maxBytes:22e4}),b=y.querySelector('input[type=hidden][data-f="image"]');b&&(b.value=E);const I=y.querySelector("[data-imgurl]");I&&(I.value="");const _=y.querySelector(`[data-imgprev="${m}"]`);_&&(_.querySelector("img").src=E,_.hidden=!1),O("ছবি লাগানো হয়েছে — Save চাপুন")}catch(E){O(String(E.message||E),"error")}})),n.querySelectorAll("[data-imgclear]").forEach(A=>A.addEventListener("click",()=>{const v=A.closest(".task-card"),m=A.dataset.imgclear,y=v.querySelector('input[type=hidden][data-f="image"]');y&&(y.value="");const E=v.querySelector("[data-imgurl]");E&&(E.value="");const b=v.querySelector(`[data-imgprev="${m}"]`);b&&(b.hidden=!0)})),n.querySelectorAll("[data-save]").forEach(A=>A.addEventListener("click",async()=>{var b,I;const v=A.closest(".task-card"),m=_=>v.querySelector(`[data-form] [data-f="${_}"]`),y=m("url").value.trim();if(y&&!/^https?:\/\//i.test(y)){O("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)","error");return}const E=[...v.querySelectorAll("[data-ifrows] [data-if-row]")].map(_=>{var Ie;return{label:_.querySelector(".if-label").value.trim(),type:_.querySelector(".if-type").value,placeholder:((Ie=_.querySelector(".if-ph"))==null?void 0:Ie.value.trim())||"",required:_.querySelector("[data-ifreq]").checked}}).filter(_=>_.label);A.disabled=!0;try{await Gy(A.dataset.save,{nameBn:m("nameBn").value.trim(),url:y,reward:Number(m("reward").value)||0,sort:Number(m("sort").value)||10,password:m("password").value.trim(),description:m("description").value.trim(),submitLabel:m("submitLabel").value.trim(),historyLabel:m("historyLabel").value.trim(),dailyLimit:Math.max(1,Math.min(200,Number(m("dailyLimit").value)||20)),inputFields:E,videoUrl:m("videoUrl").value.trim(),image:(((b=v.querySelector("[data-imgurl]"))==null?void 0:b.value)||"").trim()||((I=m("image"))==null?void 0:I.value)||"",shortDesc:m("shortDesc")?m("shortDesc").value.trim():"",requiredUsers:m("requiredUsers")?Math.max(0,Number(m("requiredUsers").value)||0):0,mode:m("mode")?m("mode").value:"single",enabled:m("enabled").checked,locked:m("locked").checked}),O("সেভ হয়েছে — user website-তে update হয়ে গেছে"),r()}catch(_){O(_.message,"error"),A.disabled=!1}}))}const pv=[{group:"General",fields:[["siteName","Site Name","text"],["telegramLink","Telegram Link","url"],["facebookLink","Facebook Link","url"],["youtubeLink","YouTube Link","url"],["videoUrl","Tutorial Video URL","url"]]},{group:"Money (৳)",fields:[["activationFee","Activation Deposit Fee","number"],["activationBonus","Activation Bonus","number"],["registerBonus","Registration Bonus","number"],["referralBonus","Referral Bonus","number"],["minWithdraw","Minimum Withdraw","number"],["giftReward","Daily Gift Reward","number"]]},{group:"Payment Numbers (Deposit-এর জন্য)",fields:[["bkashNumber","bKash Number","text"],["nagadNumber","Nagad Number","text"],["rocketNumber","Rocket Number","text"]]},{group:"Gift",fields:[["giftCode","Gift Code","text"]]},{group:"Admin Contact (Support page-এ দেখাবে)",fields:[["admin1Name","Admin 1 — Name","text"],["admin1Phone","Admin 1 — Phone","text"],["admin1Email","Admin 1 — Email","email"],["admin1Link","Admin 1 — Link","url"],["admin2Name","Admin 2 — Name","text"],["admin2Phone","Admin 2 — Phone","text"],["admin2Email","Admin 2 — Email","email"],["admin2Link","Admin 2 — Link","url"]]}];async function Su(n){var r,i;const e=await Wy(),t=e._secretLoaded!==!0;n.innerHTML=`
    <form id="settingsForm">
    ${pv.map(o=>`
      <div class="adm-card">
        <h4><i class="fa-solid fa-sliders" style="color:#d97706"></i> ${o.group}</h4>
        <div class="set-grid">
          ${o.fields.map(([a,c,d])=>{var f;const h=a==="giftCode"&&t;return`
            <div><label>${c}</label><input type="${d}" step="${d==="number"?"0.5":void 0}" class="adm-input" data-sf="${a}" value="${h?"":P((f=e[a])!=null?f:"")}" ${h?'disabled placeholder="লোড করা যায়নি — API দেখুন"':""}></div>`}).join("")}
        </div>
        ${o.group==="Gift"&&t?'<p class="muted" style="margin-top:8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Gift Code server API থেকে পড়া যায়নি — এই ঘরটা এখন change হবে না (ভুলবশত কোড মুছে যাবে না)।</p>':""}
        ${o.group==="Gift"&&!t?`<p class="muted" style="margin-top:8px">কোড: <b>${P(e.giftCode||"(খালি)")}</b> <button type="button" class="adm-btn ghost sm" id="clearGiftBtn" style="margin-left:8px">Clear</button></p>`:""}
      </div>`).join("")}
      <button type="submit" class="adm-btn gold"><i class="fa-solid fa-floppy-disk"></i> Save Settings</button>
      <button type="button" class="adm-btn ghost" id="lbSyncBtn" style="margin-left:8px"><i class="fa-solid fa-trophy"></i> Leaderboard count sync</button>
      <p class="muted" style="font-size:12px;margin-top:6px">Leaderboard (Top 4) existing referral data থেকেই হিসাব করে; এই বাটন চাপলে referral সংখ্যা গুনে user doc-এ cache হয় (বড় list-এ দ্রুত লোড হয়)।</p>
    </form>`,(r=document.getElementById("lbSyncBtn"))==null||r.addEventListener("click",async()=>{const o=document.getElementById("lbSyncBtn");o.disabled=!0;try{const a=await Hy();O(`Leaderboard sync: ${a.updated||0}টা user (${a.failed||0}টা বাদ)`)}catch(a){O(a.message,"error")}o.disabled=!1}),(i=document.getElementById("clearGiftBtn"))==null||i.addEventListener("click",async()=>{if(confirm("Gift code মুছে ফেলবেন? তাহলে কেউই আর gift claim করতে পারবে না।"))try{await Qy(),O("Gift code cleared"),Su(n)}catch(o){O(o.message,"error")}}),document.getElementById("settingsForm").addEventListener("submit",async o=>{o.preventDefault();const a={};n.querySelectorAll("[data-sf]").forEach(d=>{if(d.disabled)return;const h=d.dataset.sf;a[h]=d.type==="number"?Number(d.value)||0:d.value.trim()});const c=o.target.querySelector("button[type=submit]");c.disabled=!0;try{await Jy(a),O("Settings save হয়েছে")}catch(d){O(d.message,"error"),c.disabled=!1}})}let qt="";async function zt(n){const[e,t]=await Promise.all([Xy(),rv().catch(()=>[])]),r=await po(300).catch(()=>[]);n.innerHTML=`
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
    ${e.map(h=>`
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info"><b>${h.type==="warning"?"⚠️ ":""}${P(h.title||"—")}</b><span class="muted">${h.enabled?"ON":"OFF"} • sort ${h.sort||0}${h.expiresAt?" • expire "+De(h.expiresAt):""}</span></div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tgl="${h.id}"><i class="fa-solid ${h.enabled?"fa-eye-slash":"fa-eye"}"></i></button>
            <button class="adm-btn red sm" data-del="${h.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${P(h.body||"")}</p>
      </div>`).join("")}
    ${e.length?"":'<p class="muted center-note">কোনো all-user notice নেই।</p>'}

    <h4 style="margin:14px 0 8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Private Warnings (user-specific)</h4>
    ${t.map(h=>`
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info">
            <b>${h.type==="warning"?"⚠️ ":""}${P(h.title||"—")}</b>
            <span class="muted">→ ${P(h.userName||"—")} (${P(h.userMobile||h.uid)}) • ${h.enabled?"ACTIVE":"OFF"}${h.expiresAt?" • expire "+h.expiresAt:""}</span>
          </div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tn-tgl="${h.uid}::${h.id}">${h.enabled?"Hide":"Show"}</button>
            <button class="adm-btn red sm" data-tn-del="${h.uid}::${h.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${P(h.body||"")}</p>
      </div>`).join("")}
    ${t.length?"":'<p class="muted center-note">কোনো private warning নেই।</p>'}`;const i=document.getElementById("ntTarget"),o=document.getElementById("ntUserWrap"),a=document.getElementById("ntUserSearch"),c=document.getElementById("ntUserResults");i.addEventListener("change",()=>{o.hidden=i.value!=="user"});const d=(h="")=>{const f=h.trim().toLowerCase(),g=f?r.filter(w=>(w.name||"").toLowerCase().includes(f)||String(w.mobile||"").includes(f)):r;c.innerHTML=g.slice(0,30).map(w=>`
      <div class="user-row ${qt===w.uid?"on":""}" data-ntu="${w.uid}">
        <div class="ur-avatar">${P((w.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${P(w.name||"—")}</b><span class="muted">${P(w.mobile||"")}</span></div>
        <div class="ur-right">${qt===w.uid?'<span class="badge green">SELECTED</span>':""}</div>
      </div>`).join("")||'<p class="muted">কোনো user পাওয়া যায়নি</p>',c.querySelectorAll("[data-ntu]").forEach(w=>w.addEventListener("click",()=>{qt=w.dataset.ntu,d(a.value)}))};a.addEventListener("input",()=>d(a.value)),document.getElementById("ntAdd").addEventListener("click",async()=>{const h=document.getElementById("ntTitle").value.trim(),f=document.getElementById("ntBody").value.trim(),g=document.getElementById("ntType").value,w=i.value,R=document.getElementById("ntExpiry").value;if(!h&&!f){O("Title বা message লিখুন","error");return}if(w==="user"&&!qt){O("একটা user select করুন","error");return}const N=R?new Date(R+"T23:59:59"):null;try{w==="user"?await nv(qt,{title:h,body:f,type:g,expiresAt:N}):await Yy({title:h,body:f,type:g,expiresAt:N}),O(w==="user"?"Private warning পাঠানো হয়েছে (শুধু সেই user দেখবে)":"Notice add হয়েছে (সব user দেখবে)"),qt="",zt(n)}catch(L){O(L.message,"error")}}),n.querySelectorAll("[data-tgl]").forEach(h=>h.addEventListener("click",async()=>{const f=e.find(g=>g.id===h.dataset.tgl);try{await Zy(f.id,{title:f.title,body:f.body,enabled:!f.enabled,sort:f.sort}),O("Notice toggle"),zt(n)}catch(g){O(g.message,"error")}})),n.querySelectorAll("[data-del]").forEach(h=>h.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await ev(h.dataset.del),O("Notice delete হয়েছে"),zt(n)}catch(f){O(f.message,"error")}})),n.querySelectorAll("[data-tn-tgl]").forEach(h=>h.addEventListener("click",async()=>{const[f,g]=h.dataset.tnTgl.split("::"),w=t.find(R=>R.uid===f&&R.id===g);try{await bu(f,g,{enabled:!w.enabled}),O("Warning toggle"),zt(n)}catch(R){O(R.message,"error")}})),n.querySelectorAll("[data-tn-del]").forEach(h=>h.addEventListener("click",async()=>{if(!confirm("Warning মুছে ফেলবেন?"))return;const[f,g]=h.dataset.tnDel.split("::");try{await Iu(f,g),O("Warning delete হয়েছে"),zt(n)}catch(w){O(w.message,"error")}}))}
