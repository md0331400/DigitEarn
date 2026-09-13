(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();var bo={};/**
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
 */const Pl=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},pd=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const a=n[t++];e[r++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){const a=n[t++],o=n[t++],c=n[t++],d=((i&7)<<18|(a&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(d>>10)),e[r++]=String.fromCharCode(56320+(d&1023))}else{const a=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(a&63)<<6|o&63)}}return e.join("")},kl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const a=n[i],o=i+1<n.length,c=o?n[i+1]:0,d=i+2<n.length,h=d?n[i+2]:0,y=a>>2,v=(a&3)<<4|c>>4;let w=(c&15)<<2|h>>6,P=h&63;d||(P=64,o||(w=64)),r.push(t[y],t[v],t[w],t[P])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Pl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):pd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const a=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const h=i<n.length?t[n.charAt(i)]:64;++i;const v=i<n.length?t[n.charAt(i)]:64;if(++i,a==null||c==null||h==null||v==null)throw new md;const w=a<<2|c>>4;if(r.push(w),h!==64){const P=c<<4&240|h>>2;if(r.push(P),v!==64){const N=h<<6&192|v;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class md extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const gd=function(n){const e=Pl(n);return kl.encodeByteArray(e,!0)},Qr=function(n){return gd(n).replace(/\./g,"")},Cl=function(n){try{return kl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function yd(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
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
 */const vd=()=>yd().__FIREBASE_DEFAULTS__,_d=()=>{if(typeof process=="undefined"||typeof bo=="undefined")return;const n=bo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ed=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Cl(n[1]);return e&&JSON.parse(e)},pi=()=>{try{return vd()||_d()||Ed()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Nl=n=>{var e,t;return(t=(e=pi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},wd=n=>{const e=Nl(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Dl=()=>{var n;return(n=pi())===null||n===void 0?void 0:n.config},Ol=n=>{var e;return(e=pi())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class bd{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Id(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,a=n.sub||n.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Qr(JSON.stringify(t)),Qr(JSON.stringify(o)),""].join(".")}/**
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
 */function Te(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Td(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Te())}function Ad(){var n;const e=(n=pi())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Sd(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function Rd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Pd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function kd(){const n=Te();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Cd(){return!Ad()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Nd(){try{return typeof indexedDB=="object"}catch{return!1}}function Dd(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var a;e(((a=i.error)===null||a===void 0?void 0:a.message)||"")}}catch(t){e(t)}})}/**
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
 */const Od="FirebaseError";class Ze extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Od,Object.setPrototypeOf(this,Ze.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Zn.prototype.create)}}class Zn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,a=this.errors[e],o=a?Ld(a,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new Ze(i,c,r)}}function Ld(n,e){return n.replace(Vd,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Vd=/\{\$([^}]+)}/g;function Md(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Xr(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const a=n[i],o=e[i];if(Io(a)&&Io(o)){if(!Xr(a,o))return!1}else if(a!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Io(n){return n!==null&&typeof n=="object"}/**
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
 */function er(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Dn(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,a]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(a)}}),e}function On(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function $d(n,e){const t=new xd(n,e);return t.subscribe.bind(t)}class xd{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Ud(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=is),i.error===void 0&&(i.error=is),i.complete===void 0&&(i.complete=is);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console!="undefined"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ud(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function is(){}/**
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
 */function ge(n){return n&&n._delegate?n._delegate:n}class Dt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Pt="[DEFAULT]";/**
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
 */class Fd{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new bd;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(a){if(i)return null;throw a}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Bd(e))try{this.getOrInitializeService({instanceIdentifier:Pt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const a=this.getOrInitializeService({instanceIdentifier:i});r.resolve(a)}catch{}}}}clearInstance(e=Pt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Pt){return this.instances.has(e)}getOptions(e=Pt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[a,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(a);r===c&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),a=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;a.add(e),this.onInitCallbacks.set(i,a);const o=this.instances.get(i);return o&&e(o,i),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:jd(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Pt){return this.component?this.component.multipleInstances?e:Pt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jd(n){return n===Pt?void 0:n}function Bd(n){return n.instantiationMode==="EAGER"}/**
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
 */class qd{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Fd(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const Hd={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},zd=q.INFO,Gd={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},Wd=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Gd[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class xs{constructor(e){this.name=e,this._logLevel=zd,this._logHandler=Wd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Hd[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}const Kd=(n,e)=>e.some(t=>n instanceof t);let To,Ao;function Jd(){return To||(To=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Qd(){return Ao||(Ao=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ll=new WeakMap,ms=new WeakMap,Vl=new WeakMap,ss=new WeakMap,Us=new WeakMap;function Xd(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",a),n.removeEventListener("error",o)},a=()=>{t(ft(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",a),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Ll.set(t,n)}).catch(()=>{}),Us.set(e,n),e}function Yd(n){if(ms.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",a),n.removeEventListener("error",o),n.removeEventListener("abort",o)},a=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",a),n.addEventListener("error",o),n.addEventListener("abort",o)});ms.set(n,e)}let gs={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ms.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Vl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ft(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Zd(n){gs=n(gs)}function eh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(as(this),e,...t);return Vl.set(r,e.sort?e.sort():[e]),ft(r)}:Qd().includes(n)?function(...e){return n.apply(as(this),e),ft(Ll.get(this))}:function(...e){return ft(n.apply(as(this),e))}}function th(n){return typeof n=="function"?eh(n):(n instanceof IDBTransaction&&Yd(n),Kd(n,Jd())?new Proxy(n,gs):n)}function ft(n){if(n instanceof IDBRequest)return Xd(n);if(ss.has(n))return ss.get(n);const e=th(n);return e!==n&&(ss.set(n,e),Us.set(e,n)),e}const as=n=>Us.get(n);function nh(n,e,{blocked:t,upgrade:r,blocking:i,terminated:a}={}){const o=indexedDB.open(n,e),c=ft(o);return r&&o.addEventListener("upgradeneeded",d=>{r(ft(o.result),d.oldVersion,d.newVersion,ft(o.transaction),d)}),t&&o.addEventListener("blocked",d=>t(d.oldVersion,d.newVersion,d)),c.then(d=>{a&&d.addEventListener("close",()=>a()),i&&d.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const rh=["get","getKey","getAll","getAllKeys","count"],ih=["put","add","delete","clear"],os=new Map;function So(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(os.get(e))return os.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=ih.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||rh.includes(t)))return;const a=async function(o,...c){const d=this.transaction(o,i?"readwrite":"readonly");let h=d.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),i&&d.done]))[0]};return os.set(e,a),a}Zd(n=>({...n,get:(e,t,r)=>So(e,t)||n.get(e,t,r),has:(e,t)=>!!So(e,t)||n.has(e,t)}));/**
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
 */class sh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ah(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function ah(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ys="@firebase/app",Ro="0.10.13";/**
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
 */const Xe=new xs("@firebase/app"),oh="@firebase/app-compat",lh="@firebase/analytics-compat",ch="@firebase/analytics",uh="@firebase/app-check-compat",dh="@firebase/app-check",hh="@firebase/auth",fh="@firebase/auth-compat",ph="@firebase/database",mh="@firebase/data-connect",gh="@firebase/database-compat",yh="@firebase/functions",vh="@firebase/functions-compat",_h="@firebase/installations",Eh="@firebase/installations-compat",wh="@firebase/messaging",bh="@firebase/messaging-compat",Ih="@firebase/performance",Th="@firebase/performance-compat",Ah="@firebase/remote-config",Sh="@firebase/remote-config-compat",Rh="@firebase/storage",Ph="@firebase/storage-compat",kh="@firebase/firestore",Ch="@firebase/vertexai-preview",Nh="@firebase/firestore-compat",Dh="firebase",Oh="10.14.1";/**
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
 */const vs="[DEFAULT]",Lh={[ys]:"fire-core",[oh]:"fire-core-compat",[ch]:"fire-analytics",[lh]:"fire-analytics-compat",[dh]:"fire-app-check",[uh]:"fire-app-check-compat",[hh]:"fire-auth",[fh]:"fire-auth-compat",[ph]:"fire-rtdb",[mh]:"fire-data-connect",[gh]:"fire-rtdb-compat",[yh]:"fire-fn",[vh]:"fire-fn-compat",[_h]:"fire-iid",[Eh]:"fire-iid-compat",[wh]:"fire-fcm",[bh]:"fire-fcm-compat",[Ih]:"fire-perf",[Th]:"fire-perf-compat",[Ah]:"fire-rc",[Sh]:"fire-rc-compat",[Rh]:"fire-gcs",[Ph]:"fire-gcs-compat",[kh]:"fire-fst",[Nh]:"fire-fst-compat",[Ch]:"fire-vertex","fire-js":"fire-js",[Dh]:"fire-js-all"};/**
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
 */const Yr=new Map,Vh=new Map,_s=new Map;function Po(n,e){try{n.container.addComponent(e)}catch(t){Xe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function tn(n){const e=n.name;if(_s.has(e))return Xe.debug(`There were multiple attempts to register component ${e}.`),!1;_s.set(e,n);for(const t of Yr.values())Po(t,n);for(const t of Vh.values())Po(t,n);return!0}function Fs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function We(n){return n.settings!==void 0}/**
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
 */const Mh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},pt=new Zn("app","Firebase",Mh);/**
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
 */class $h{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Dt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw pt.create("app-deleted",{appName:this._name})}}/**
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
 */const un=Oh;function Ml(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:vs,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw pt.create("bad-app-name",{appName:String(i)});if(t||(t=Dl()),!t)throw pt.create("no-options");const a=Yr.get(i);if(a){if(Xr(t,a.options)&&Xr(r,a.config))return a;throw pt.create("duplicate-app",{appName:i})}const o=new qd(i);for(const d of _s.values())o.addComponent(d);const c=new $h(t,r,o);return Yr.set(i,c),c}function $l(n=vs){const e=Yr.get(n);if(!e&&n===vs&&Dl())return Ml();if(!e)throw pt.create("no-app",{appName:n});return e}function mt(n,e,t){var r;let i=(r=Lh[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const a=i.match(/\s|\//),o=e.match(/\s|\//);if(a||o){const c=[`Unable to register library "${i}" with version "${e}":`];a&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),a&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Xe.warn(c.join(" "));return}tn(new Dt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const xh="firebase-heartbeat-database",Uh=1,Bn="firebase-heartbeat-store";let ls=null;function xl(){return ls||(ls=nh(xh,Uh,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Bn)}catch(t){console.warn(t)}}}}).catch(n=>{throw pt.create("idb-open",{originalErrorMessage:n.message})})),ls}async function Fh(n){try{const t=(await xl()).transaction(Bn),r=await t.objectStore(Bn).get(Ul(n));return await t.done,r}catch(e){if(e instanceof Ze)Xe.warn(e.message);else{const t=pt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Xe.warn(t.message)}}}async function ko(n,e){try{const r=(await xl()).transaction(Bn,"readwrite");await r.objectStore(Bn).put(e,Ul(n)),await r.done}catch(t){if(t instanceof Ze)Xe.warn(t.message);else{const r=pt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Xe.warn(r.message)}}}function Ul(n){return`${n.name}!${n.options.appId}`}/**
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
 */const jh=1024,Bh=30*24*60*60*1e3;class qh{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new zh(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=Co();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(o=>o.date===a)?void 0:(this._heartbeatsCache.heartbeats.push({date:a,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=Bh}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Xe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Co(),{heartbeatsToSend:r,unsentEntries:i}=Hh(this._heartbeatsCache.heartbeats),a=Qr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(t){return Xe.warn(t),""}}}function Co(){return new Date().toISOString().substring(0,10)}function Hh(n,e=jh){const t=[];let r=n.slice();for(const i of n){const a=t.find(o=>o.agent===i.agent);if(a){if(a.dates.push(i.date),No(t)>e){a.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),No(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class zh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Nd()?Dd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Fh(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return ko(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return ko(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function No(n){return Qr(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function Gh(n){tn(new Dt("platform-logger",e=>new sh(e),"PRIVATE")),tn(new Dt("heartbeat",e=>new qh(e),"PRIVATE")),mt(ys,Ro,n),mt(ys,Ro,"esm2017"),mt("fire-js","")}Gh("");var Wh="firebase",Kh="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */mt(Wh,Kh,"app");function js(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Fl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Jh=Fl,jl=new Zn("auth","Firebase",Fl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr=new xs("@firebase/auth");function Qh(n,...e){Zr.logLevel<=q.WARN&&Zr.warn(`Auth (${un}): ${n}`,...e)}function Fr(n,...e){Zr.logLevel<=q.ERROR&&Zr.error(`Auth (${un}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(n,...e){throw Bs(n,...e)}function je(n,...e){return Bs(n,...e)}function Bl(n,e,t){const r=Object.assign(Object.assign({},Jh()),{[e]:t});return new Zn("auth","Firebase",r).create(e,{appName:n.name})}function gt(n){return Bl(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Bs(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return jl.create(n,...e)}function F(n,e,...t){if(!n)throw Bs(e,...t)}function Ke(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Fr(e),new Error(e)}function Ye(n,e){n||Ke(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Xh(){return Do()==="http:"||Do()==="https:"}function Do(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yh(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Xh()||Rd()||"connection"in navigator)?navigator.onLine:!0}function Zh(){if(typeof navigator=="undefined")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ye(t>e,"Short delay should be less than long delay!"),this.isMobile=Td()||Pd()}get(){return Yh()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qs(n,e){Ye(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;Ke("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;Ke("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;Ke("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ef={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf=new tr(3e4,6e4);function xt(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function bt(n,e,t,r,i={}){return Hl(n,i,async()=>{let a={},o={};r&&(e==="GET"?o=r:a={body:JSON.stringify(r)});const c=er(Object.assign({key:n.config.apiKey},o)).slice(1),d=await n._getAdditionalHeaders();d["Content-Type"]="application/json",n.languageCode&&(d["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:d},a);return Sd()||(h.referrerPolicy="no-referrer"),ql.fetch()(zl(n,n.config.apiHost,t,c),h)})}async function Hl(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},ef),e);try{const i=new rf(n),a=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await a.json();if("needConfirmation"in o)throw Cr(n,"account-exists-with-different-credential",o);if(a.ok&&!("errorMessage"in o))return o;{const c=a.ok?o.errorMessage:o.error.message,[d,h]=c.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw Cr(n,"credential-already-in-use",o);if(d==="EMAIL_EXISTS")throw Cr(n,"email-already-in-use",o);if(d==="USER_DISABLED")throw Cr(n,"user-disabled",o);const y=r[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Bl(n,y,h);Fe(n,y)}}catch(i){if(i instanceof Ze)throw i;Fe(n,"network-request-failed",{message:String(i)})}}async function mi(n,e,t,r,i={}){const a=await bt(n,e,t,r,i);return"mfaPendingCredential"in a&&Fe(n,"multi-factor-auth-required",{_serverResponse:a}),a}function zl(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?qs(n.config,i):`${n.config.apiScheme}://${i}`}function nf(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class rf{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(je(this.auth,"network-request-failed")),tf.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Cr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=je(n,e,r);return i.customData._tokenResponse=t,i}function Oo(n){return n!==void 0&&n.enterprise!==void 0}class sf{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return nf(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function af(n,e){return bt(n,"GET","/v2/recaptchaConfig",xt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function of(n,e){return bt(n,"POST","/v1/accounts:delete",e)}async function Gl(n,e){return bt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $n(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function lf(n,e=!1){const t=ge(n),r=await t.getIdToken(e),i=Hs(r);F(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const a=typeof i.firebase=="object"?i.firebase:void 0,o=a==null?void 0:a.sign_in_provider;return{claims:i,token:r,authTime:$n(cs(i.auth_time)),issuedAtTime:$n(cs(i.iat)),expirationTime:$n(cs(i.exp)),signInProvider:o||null,signInSecondFactor:(a==null?void 0:a.sign_in_second_factor)||null}}function cs(n){return Number(n)*1e3}function Hs(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Fr("JWT malformed, contained fewer than 3 sections"),null;try{const i=Cl(t);return i?JSON.parse(i):(Fr("Failed to decode base64 JWT payload"),null)}catch(i){return Fr("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Lo(n){const e=Hs(n);return F(e,"internal-error"),F(typeof e.exp!="undefined","internal-error"),F(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ze&&cf(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function cf({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=$n(this.lastLoginAt),this.creationTime=$n(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ei(n){var e;const t=n.auth,r=await n.getIdToken(),i=await qn(n,Gl(t,{idToken:r}));F(i==null?void 0:i.users.length,t,"internal-error");const a=i.users[0];n._notifyReloadListener(a);const o=!((e=a.providerUserInfo)===null||e===void 0)&&e.length?Wl(a.providerUserInfo):[],c=hf(n.providerData,o),d=n.isAnonymous,h=!(n.email&&a.passwordHash)&&!(c!=null&&c.length),y=d?h:!1,v={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:c,metadata:new ws(a.createdAt,a.lastLoginAt),isAnonymous:y};Object.assign(n,v)}async function df(n){const e=ge(n);await ei(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function hf(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Wl(n){return n.map(e=>{var{providerId:t}=e,r=js(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ff(n,e){const t=await Hl(n,{},async()=>{const r=er({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:a}=n.config,o=zl(n,i,"/v1/token",`key=${a}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",ql.fetch()(o,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function pf(n,e){return bt(n,"POST","/v2/accounts:revokeToken",xt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken!="undefined","internal-error"),F(typeof e.refreshToken!="undefined","internal-error");const t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):Lo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){F(e.length!==0,"internal-error");const t=Lo(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(F(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:a}=await ff(e,t);this.updateTokensAndExpiration(r,i,Number(a))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:a}=t,o=new Xt;return r&&(F(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(F(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),a&&(F(typeof a=="number","internal-error",{appName:e}),o.expirationTime=a),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Xt,this.toJSON())}_performRefresh(){return Ke("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(n,e){F(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}class Je{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,a=js(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new uf(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new ws(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const t=await qn(this,this.stsTokenManager.getToken(this.auth,e));return F(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return lf(this,e)}reload(){return df(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Je(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ei(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(We(this.auth.app))return Promise.reject(gt(this.auth));const e=await this.getIdToken();return await qn(this,of(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,a,o,c,d,h,y;const v=(r=t.displayName)!==null&&r!==void 0?r:void 0,w=(i=t.email)!==null&&i!==void 0?i:void 0,P=(a=t.phoneNumber)!==null&&a!==void 0?a:void 0,N=(o=t.photoURL)!==null&&o!==void 0?o:void 0,M=(c=t.tenantId)!==null&&c!==void 0?c:void 0,O=(d=t._redirectEventId)!==null&&d!==void 0?d:void 0,A=(h=t.createdAt)!==null&&h!==void 0?h:void 0,V=(y=t.lastLoginAt)!==null&&y!==void 0?y:void 0,{uid:$,emailVerified:j,isAnonymous:W,providerData:K,stsTokenManager:p}=t;F($&&p,e,"internal-error");const m=Xt.fromJSON(this.name,p);F(typeof $=="string",e,"internal-error"),ot(v,e.name),ot(w,e.name),F(typeof j=="boolean",e,"internal-error"),F(typeof W=="boolean",e,"internal-error"),ot(P,e.name),ot(N,e.name),ot(M,e.name),ot(O,e.name),ot(A,e.name),ot(V,e.name);const g=new Je({uid:$,auth:e,email:w,emailVerified:j,displayName:v,isAnonymous:W,photoURL:N,phoneNumber:P,tenantId:M,stsTokenManager:m,createdAt:A,lastLoginAt:V});return K&&Array.isArray(K)&&(g.providerData=K.map(E=>Object.assign({},E))),O&&(g._redirectEventId=O),g}static async _fromIdTokenResponse(e,t,r=!1){const i=new Xt;i.updateFromServerResponse(t);const a=new Je({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await ei(a),a}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];F(i.localId!==void 0,"internal-error");const a=i.providerUserInfo!==void 0?Wl(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(a!=null&&a.length),c=new Xt;c.updateFromIdToken(r);const d=new Je({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new ws(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(a!=null&&a.length)};return Object.assign(d,h),d}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo=new Map;function Qe(n){Ye(n instanceof Function,"Expected a class definition");let e=Vo.get(n);return e?(Ye(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Vo.set(n,e),e)}/**
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
 */class Kl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Kl.type="NONE";const Mo=Kl;/**
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
 */function jr(n,e,t){return`firebase:${n}:${e}:${t}`}class Yt{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:a}=this.auth;this.fullUserKey=jr(this.userKey,i.apiKey,a),this.fullPersistenceKey=jr("persistence",i.apiKey,a),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Je._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Yt(Qe(Mo),e,r);const i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let a=i[0]||Qe(Mo);const o=jr(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const y=await h._get(o);if(y){const v=Je._fromJSON(e,y);h!==a&&(c=v),a=h;break}}catch{}const d=i.filter(h=>h._shouldAllowMigration);return!a._shouldAllowMigration||!d.length?new Yt(a,e,r):(a=d[0],c&&await a._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==a)try{await h._remove(o)}catch{}})),new Yt(a,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $o(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Yl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Jl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ec(e))return"Blackberry";if(tc(e))return"Webos";if(Ql(e))return"Safari";if((e.includes("chrome/")||Xl(e))&&!e.includes("edge/"))return"Chrome";if(Zl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Jl(n=Te()){return/firefox\//i.test(n)}function Ql(n=Te()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Xl(n=Te()){return/crios\//i.test(n)}function Yl(n=Te()){return/iemobile/i.test(n)}function Zl(n=Te()){return/android/i.test(n)}function ec(n=Te()){return/blackberry/i.test(n)}function tc(n=Te()){return/webos/i.test(n)}function zs(n=Te()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function mf(n=Te()){var e;return zs(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function gf(){return kd()&&document.documentMode===10}function nc(n=Te()){return zs(n)||Zl(n)||tc(n)||ec(n)||/windows phone/i.test(n)||Yl(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rc(n,e=[]){let t;switch(n){case"Browser":t=$o(Te());break;case"Worker":t=`${$o(Te())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${un}/${r}`}/**
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
 */class yf{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=a=>new Promise((o,c)=>{try{const d=e(a);o(d)}catch(d){c(d)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function vf(n,e={}){return bt(n,"GET","/v2/passwordPolicy",xt(n,e))}/**
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
 */const _f=6;class Ef{constructor(e){var t,r,i,a;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:_f,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(a=e.forceUpgradeOnSignin)!==null&&a!==void 0?a:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,a,o,c;const d={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,d),this.validatePasswordCharacterOptions(e,d),d.isValid&&(d.isValid=(t=d.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),d.isValid&&(d.isValid=(r=d.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),d.isValid&&(d.isValid=(i=d.containsLowercaseLetter)!==null&&i!==void 0?i:!0),d.isValid&&(d.isValid=(a=d.containsUppercaseLetter)!==null&&a!==void 0?a:!0),d.isValid&&(d.isValid=(o=d.containsNumericCharacter)!==null&&o!==void 0?o:!0),d.isValid&&(d.isValid=(c=d.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),d}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new xo(this),this.idTokenSubscription=new xo(this),this.beforeStateQueue=new yf(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=jl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Qe(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Yt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Gl(this,{idToken:e}),r=await Je._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(We(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,d=await this.tryRedirectSignIn(e);(!o||o===c)&&(d!=null&&d.user)&&(i=d.user,a=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ei(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Zh()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(We(this.app))return Promise.reject(gt(this));const t=e?ge(e):null;return t&&F(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return We(this.app)?Promise.reject(gt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return We(this.app)?Promise.reject(gt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Qe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await vf(this),t=new Ef(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Zn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await pf(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Qe(e)||this._popupRedirectResolver;F(t,this,"argument-error"),this.redirectPersistenceManager=await Yt.create(this,[Qe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const a=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(F(c,this,"internal-error"),c.then(()=>{o||a(this.currentUser)}),typeof t=="function"){const d=e.addObserver(t,r,i);return()=>{o=!0,d()}}else{const d=e.addObserver(t);return()=>{o=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=rc(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Qh(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function dn(n){return ge(n)}class xo{constructor(e){this.auth=e,this.observer=null,this.addObserver=$d(t=>this.observer=t)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function bf(n){gi=n}function ic(n){return gi.loadJS(n)}function If(){return gi.recaptchaEnterpriseScript}function Tf(){return gi.gapiScript}function Af(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const Sf="recaptcha-enterprise",Rf="NO_RECAPTCHA";class Pf{constructor(e){this.type=Sf,this.auth=dn(e)}async verify(e="verify",t=!1){async function r(a){if(!t){if(a.tenantId==null&&a._agentRecaptchaConfig!=null)return a._agentRecaptchaConfig.siteKey;if(a.tenantId!=null&&a._tenantRecaptchaConfigs[a.tenantId]!==void 0)return a._tenantRecaptchaConfigs[a.tenantId].siteKey}return new Promise(async(o,c)=>{af(a,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(d=>{if(d.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new sf(d);return a.tenantId==null?a._agentRecaptchaConfig=h:a._tenantRecaptchaConfigs[a.tenantId]=h,o(h.siteKey)}}).catch(d=>{c(d)})})}function i(a,o,c){const d=window.grecaptcha;Oo(d)?d.enterprise.ready(()=>{d.enterprise.execute(a,{action:e}).then(h=>{o(h)}).catch(()=>{o(Rf)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((a,o)=>{r(this.auth).then(c=>{if(!t&&Oo(window.grecaptcha))i(c,a,o);else{if(typeof window=="undefined"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let d=If();d.length!==0&&(d+=c),ic(d).then(()=>{i(c,a,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function Uo(n,e,t,r=!1){const i=new Pf(n);let a;try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:a}):Object.assign(o,{captchaResponse:a}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Fo(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Uo(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Uo(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kf(n,e){const t=Fs(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),a=t.getOptions();if(Xr(a,e!=null?e:{}))return i;Fe(i,"already-initialized")}return t.initialize({options:e})}function Cf(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Qe);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Nf(n,e,t){const r=dn(n);F(r._canInitEmulator,r,"emulator-config-failed"),F(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,a=sc(e),{host:o,port:c}=Df(e),d=c===null?"":`:${c}`;r.config.emulator={url:`${a}//${o}${d}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:c,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:i})}),Of()}function sc(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Df(n){const e=sc(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const a=i[1];return{host:a,port:jo(r.substr(a.length+1))}}else{const[a,o]=r.split(":");return{host:a,port:jo(o)}}}function jo(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Of(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ke("not implemented")}_getIdTokenResponse(e){return Ke("not implemented")}_linkToIdToken(e,t){return Ke("not implemented")}_getReauthenticationResolver(e){return Ke("not implemented")}}async function Lf(n,e){return bt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vf(n,e){return mi(n,"POST","/v1/accounts:signInWithPassword",xt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mf(n,e){return mi(n,"POST","/v1/accounts:signInWithEmailLink",xt(n,e))}async function $f(n,e){return mi(n,"POST","/v1/accounts:signInWithEmailLink",xt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn extends Gs{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new Hn(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Hn(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Fo(e,t,"signInWithPassword",Vf);case"emailLink":return Mf(e,{email:this._email,oobCode:this._password});default:Fe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Fo(e,r,"signUpPassword",Lf);case"emailLink":return $f(e,{idToken:t,email:this._email,oobCode:this._password});default:Fe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zt(n,e){return mi(n,"POST","/v1/accounts:signInWithIdp",xt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xf="http://localhost";class Ot extends Gs{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ot(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Fe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,a=js(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Ot(r,i);return o.idToken=a.idToken||void 0,o.accessToken=a.accessToken||void 0,o.secret=a.secret,o.nonce=a.nonce,o.pendingToken=a.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Zt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Zt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Zt(e,t)}buildRequest(){const e={requestUri:xf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=er(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uf(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Ff(n){const e=Dn(On(n)).link,t=e?Dn(On(e)).deep_link_id:null,r=Dn(On(n)).deep_link_id;return(r?Dn(On(r)).link:null)||r||t||e||n}class Ws{constructor(e){var t,r,i,a,o,c;const d=Dn(On(e)),h=(t=d.apiKey)!==null&&t!==void 0?t:null,y=(r=d.oobCode)!==null&&r!==void 0?r:null,v=Uf((i=d.mode)!==null&&i!==void 0?i:null);F(h&&y&&v,"argument-error"),this.apiKey=h,this.operation=v,this.code=y,this.continueUrl=(a=d.continueUrl)!==null&&a!==void 0?a:null,this.languageCode=(o=d.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=d.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=Ff(e);try{return new Ws(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(){this.providerId=hn.PROVIDER_ID}static credential(e,t){return Hn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Ws.parseLink(t);return F(r,"argument-error"),Hn._fromEmailAndCode(e,r.code,r.tenantId)}}hn.PROVIDER_ID="password";hn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";hn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class nr extends ac{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct extends nr{constructor(){super("facebook.com")}static credential(e){return Ot._fromParams({providerId:ct.PROVIDER_ID,signInMethod:ct.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ct.credentialFromTaggedObject(e)}static credentialFromError(e){return ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ct.credential(e.oauthAccessToken)}catch{return null}}}ct.FACEBOOK_SIGN_IN_METHOD="facebook.com";ct.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut extends nr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ot._fromParams({providerId:ut.PROVIDER_ID,signInMethod:ut.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ut.credentialFromTaggedObject(e)}static credentialFromError(e){return ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ut.credential(t,r)}catch{return null}}}ut.GOOGLE_SIGN_IN_METHOD="google.com";ut.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt extends nr{constructor(){super("github.com")}static credential(e){return Ot._fromParams({providerId:dt.PROVIDER_ID,signInMethod:dt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return dt.credentialFromTaggedObject(e)}static credentialFromError(e){return dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return dt.credential(e.oauthAccessToken)}catch{return null}}}dt.GITHUB_SIGN_IN_METHOD="github.com";dt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht extends nr{constructor(){super("twitter.com")}static credential(e,t){return Ot._fromParams({providerId:ht.PROVIDER_ID,signInMethod:ht.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ht.credentialFromTaggedObject(e)}static credentialFromError(e){return ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return ht.credential(t,r)}catch{return null}}}ht.TWITTER_SIGN_IN_METHOD="twitter.com";ht.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const a=await Je._fromIdTokenResponse(e,r,i),o=Bo(r);return new nn({user:a,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Bo(r);return new nn({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Bo(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti extends Ze{constructor(e,t,r,i){var a;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,ti.prototype),this.customData={appName:e.name,tenantId:(a=e.tenantId)!==null&&a!==void 0?a:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new ti(e,t,r,i)}}function oc(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?ti._fromErrorAndOperation(n,a,e,r):a})}async function jf(n,e,t=!1){const r=await qn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return nn._forOperation(n,"link",r)}/**
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
 */async function Bf(n,e,t=!1){const{auth:r}=n;if(We(r.app))return Promise.reject(gt(r));const i="reauthenticate";try{const a=await qn(n,oc(r,i,e,n),t);F(a.idToken,r,"internal-error");const o=Hs(a.idToken);F(o,r,"internal-error");const{sub:c}=o;return F(n.uid===c,r,"user-mismatch"),nn._forOperation(n,i,a)}catch(a){throw(a==null?void 0:a.code)==="auth/user-not-found"&&Fe(r,"user-mismatch"),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lc(n,e,t=!1){if(We(n.app))return Promise.reject(gt(n));const r="signIn",i=await oc(n,r,e),a=await nn._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(a.user),a}async function qf(n,e){return lc(dn(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hf(n){const e=dn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function zf(n,e,t){return We(n.app)?Promise.reject(gt(n)):qf(ge(n),hn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Hf(n),r})}function Gf(n,e,t,r){return ge(n).onIdTokenChanged(e,t,r)}function Wf(n,e,t){return ge(n).beforeAuthStateChanged(e,t)}function Kf(n,e,t,r){return ge(n).onAuthStateChanged(e,t,r)}function cc(n){return ge(n).signOut()}const ni="__sak";/**
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
 */class uc{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ni,"1"),this.storage.removeItem(ni),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf=1e3,Qf=10;class dc extends uc{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=nc(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,d)=>{this.notifyListeners(o,d)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},a=this.storage.getItem(r);gf()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Qf):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Jf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}dc.type="LOCAL";const Xf=dc;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc extends uc{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}hc.type="SESSION";const fc=hc;/**
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
 */function Yf(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class yi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new yi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:a}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(o).map(async h=>h(t.origin,a)),d=await Yf(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:d})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}yi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ks(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Zf{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let a,o;return new Promise((c,d)=>{const h=Ks("",20);i.port1.start();const y=setTimeout(()=>{d(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(v){const w=v;if(w.data.eventId===h)switch(w.data.status){case"ack":clearTimeout(y),a=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),c(w.data.response);break;default:clearTimeout(y),clearTimeout(a),d(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(){return window}function ep(n){Be().location.href=n}/**
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
 */function pc(){return typeof Be().WorkerGlobalScope!="undefined"&&typeof Be().importScripts=="function"}async function tp(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function np(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function rp(){return pc()?self:null}/**
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
 */const mc="firebaseLocalStorageDb",ip=1,ri="firebaseLocalStorage",gc="fbase_key";class rr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function vi(n,e){return n.transaction([ri],e?"readwrite":"readonly").objectStore(ri)}function sp(){const n=indexedDB.deleteDatabase(mc);return new rr(n).toPromise()}function bs(){const n=indexedDB.open(mc,ip);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ri,{keyPath:gc})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ri)?e(r):(r.close(),await sp(),e(await bs()))})})}async function qo(n,e,t){const r=vi(n,!0).put({[gc]:e,value:t});return new rr(r).toPromise()}async function ap(n,e){const t=vi(n,!1).get(e),r=await new rr(t).toPromise();return r===void 0?null:r.value}function Ho(n,e){const t=vi(n,!0).delete(e);return new rr(t).toPromise()}const op=800,lp=3;class yc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await bs(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>lp)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return pc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=yi._getInstance(rp()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await tp(),!this.activeServiceWorker)return;this.sender=new Zf(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||np()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await bs();return await qo(e,ni,"1"),await Ho(e,ni),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>qo(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>ap(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ho(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const a=vi(i,!1).getAll();return new rr(a).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:a}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(a)&&(this.notifyListeners(i,a),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),op)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}yc.type="LOCAL";const cp=yc;new tr(3e4,6e4);/**
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
 */function up(n,e){return e?Qe(e):(F(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Js extends Gs{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Zt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Zt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Zt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function dp(n){return lc(n.auth,new Js(n),n.bypassAuthState)}function hp(n){const{auth:e,user:t}=n;return F(t,e,"internal-error"),Bf(t,new Js(n),n.bypassAuthState)}async function fp(n){const{auth:e,user:t}=n;return F(t,e,"internal-error"),jf(t,new Js(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e,t,r,i,a=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:a,error:o,type:c}=e;if(o){this.reject(o);return}const d={auth:this.auth,requestUri:t,sessionId:r,tenantId:a||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(d))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return dp;case"linkViaPopup":case"linkViaRedirect":return fp;case"reauthViaPopup":case"reauthViaRedirect":return hp;default:Fe(this.auth,"internal-error")}}resolve(e){Ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp=new tr(2e3,1e4);class Jt extends vc{constructor(e,t,r,i,a){super(e,t,i,a),this.provider=r,this.authWindow=null,this.pollId=null,Jt.currentPopupAction&&Jt.currentPopupAction.cancel(),Jt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){Ye(this.filter.length===1,"Popup operations only handle one event");const e=Ks();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(je(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(je(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Jt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(je(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,pp.get())};e()}}Jt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mp="pendingRedirect",Br=new Map;class gp extends vc{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Br.get(this.auth._key());if(!e){try{const r=await yp(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Br.set(this.auth._key(),e)}return this.bypassAuthState||Br.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function yp(n,e){const t=Ep(e),r=_p(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function vp(n,e){Br.set(n._key(),e)}function _p(n){return Qe(n._redirectPersistence)}function Ep(n){return jr(mp,n.config.apiKey,n.name)}async function wp(n,e,t=!1){if(We(n.app))return Promise.reject(gt(n));const r=dn(n),i=up(r,e),o=await new gp(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp=10*60*1e3;class Ip{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Tp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!_c(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(je(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=bp&&this.cachedEventUids.clear(),this.cachedEventUids.has(zo(e))}saveEventToCache(e){this.cachedEventUids.add(zo(e)),this.lastProcessedEventTime=Date.now()}}function zo(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function _c({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Tp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return _c(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ap(n,e={}){return bt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Rp=/^https?/;async function Pp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Ap(n);for(const t of e)try{if(kp(t))return}catch{}Fe(n,"unauthorized-domain")}function kp(n){const e=Es(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Rp.test(t))return!1;if(Sp.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const Cp=new tr(3e4,6e4);function Go(){const n=Be().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Np(n){return new Promise((e,t)=>{var r,i,a;function o(){Go(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Go(),t(je(n,"network-request-failed"))},timeout:Cp.get()})}if(!((i=(r=Be().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((a=Be().gapi)===null||a===void 0)&&a.load)o();else{const c=Af("iframefcb");return Be()[c]=()=>{gapi.load?o():t(je(n,"network-request-failed"))},ic(`${Tf()}?onload=${c}`).catch(d=>t(d))}}).catch(e=>{throw qr=null,e})}let qr=null;function Dp(n){return qr=qr||Np(n),qr}/**
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
 */const Op=new tr(5e3,15e3),Lp="__/auth/iframe",Vp="emulator/auth/iframe",Mp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},$p=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function xp(n){const e=n.config;F(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?qs(e,Vp):`https://${n.config.authDomain}/${Lp}`,r={apiKey:e.apiKey,appName:n.name,v:un},i=$p.get(n.config.apiHost);i&&(r.eid=i);const a=n._getFrameworks();return a.length&&(r.fw=a.join(",")),`${t}?${er(r).slice(1)}`}async function Up(n){const e=await Dp(n),t=Be().gapi;return F(t,n,"internal-error"),e.open({where:document.body,url:xp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Mp,dontclear:!0},r=>new Promise(async(i,a)=>{await r.restyle({setHideOnLeave:!1});const o=je(n,"network-request-failed"),c=Be().setTimeout(()=>{a(o)},Op.get());function d(){Be().clearTimeout(c),i(r)}r.ping(d).then(d,()=>{a(o)})}))}/**
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
 */const Fp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},jp=500,Bp=600,qp="_blank",Hp="http://localhost";class Wo{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function zp(n,e,t,r=jp,i=Bp){const a=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const d=Object.assign(Object.assign({},Fp),{width:r.toString(),height:i.toString(),top:a,left:o}),h=Te().toLowerCase();t&&(c=Xl(h)?qp:t),Jl(h)&&(e=e||Hp,d.scrollbars="yes");const y=Object.entries(d).reduce((w,[P,N])=>`${w}${P}=${N},`,"");if(mf(h)&&c!=="_self")return Gp(e||"",c),new Wo(null);const v=window.open(e||"",c,y);F(v,n,"popup-blocked");try{v.focus()}catch{}return new Wo(v)}function Gp(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Wp="__/auth/handler",Kp="emulator/auth/handler",Jp=encodeURIComponent("fac");async function Ko(n,e,t,r,i,a){F(n.config.authDomain,n,"auth-domain-config-required"),F(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:un,eventId:i};if(e instanceof ac){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Md(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[y,v]of Object.entries({}))o[y]=v}if(e instanceof nr){const y=e.getScopes().filter(v=>v!=="");y.length>0&&(o.scopes=y.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const y of Object.keys(c))c[y]===void 0&&delete c[y];const d=await n._getAppCheckToken(),h=d?`#${Jp}=${encodeURIComponent(d)}`:"";return`${Qp(n)}?${er(c).slice(1)}${h}`}function Qp({config:n}){return n.emulator?qs(n,Kp):`https://${n.authDomain}/${Wp}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const us="webStorageSupport";class Xp{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=fc,this._completeRedirectFn=wp,this._overrideRedirectResult=vp}async _openPopup(e,t,r,i){var a;Ye((a=this.eventManagers[e._key()])===null||a===void 0?void 0:a.manager,"_initialize() not called before _openPopup()");const o=await Ko(e,t,r,Es(),i);return zp(e,o,Ks())}async _openRedirect(e,t,r,i){await this._originValidation(e);const a=await Ko(e,t,r,Es(),i);return ep(a),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:a}=this.eventManagers[t];return i?Promise.resolve(i):(Ye(a,"If manager is not set, promise should be"),a)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Up(e),r=new Ip(e);return t.register("authEvent",i=>(F(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(us,{type:us},i=>{var a;const o=(a=i==null?void 0:i[0])===null||a===void 0?void 0:a[us];o!==void 0&&t(!!o),Fe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Pp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return nc()||Ql()||zs()}}const Yp=Xp;var Jo="@firebase/auth",Qo="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function em(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function tm(n){tn(new Dt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;F(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const d={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:rc(n)},h=new wf(r,i,a,d);return Cf(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),tn(new Dt("auth-internal",e=>{const t=dn(e.getProvider("auth").getImmediate());return(r=>new Zp(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),mt(Jo,Qo,em(n)),mt(Jo,Qo,"esm2017")}/**
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
 */const nm=5*60,rm=Ol("authIdTokenMaxAge")||nm;let Xo=null;const im=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>rm)return;const i=t==null?void 0:t.token;Xo!==i&&(Xo=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function sm(n=$l()){const e=Fs(n,"auth");if(e.isInitialized())return e.getImmediate();const t=kf(n,{popupRedirectResolver:Yp,persistence:[cp,Xf,fc]}),r=Ol("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const a=new URL(r,location.origin);if(location.origin===a.origin){const o=im(a.toString());Wf(t,o,()=>o(t.currentUser)),Gf(t,c=>o(c))}}const i=Nl("auth");return i&&Nf(t,`http://${i}`),t}function am(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}bf({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const a=je("internal-error");a.customData=i,t(a)},r.type="text/javascript",r.charset="UTF-8",am().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});tm("Browser");var Yo=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ec;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(p,m){function g(){}g.prototype=m.prototype,p.D=m.prototype,p.prototype=new g,p.prototype.constructor=p,p.C=function(E,b,I){for(var _=Array(arguments.length-2),J=2;J<arguments.length;J++)_[J-2]=arguments[J];return m.prototype[b].apply(E,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(p,m,g){g||(g=0);var E=Array(16);if(typeof m=="string")for(var b=0;16>b;++b)E[b]=m.charCodeAt(g++)|m.charCodeAt(g++)<<8|m.charCodeAt(g++)<<16|m.charCodeAt(g++)<<24;else for(b=0;16>b;++b)E[b]=m[g++]|m[g++]<<8|m[g++]<<16|m[g++]<<24;m=p.g[0],g=p.g[1],b=p.g[2];var I=p.g[3],_=m+(I^g&(b^I))+E[0]+3614090360&4294967295;m=g+(_<<7&4294967295|_>>>25),_=I+(b^m&(g^b))+E[1]+3905402710&4294967295,I=m+(_<<12&4294967295|_>>>20),_=b+(g^I&(m^g))+E[2]+606105819&4294967295,b=I+(_<<17&4294967295|_>>>15),_=g+(m^b&(I^m))+E[3]+3250441966&4294967295,g=b+(_<<22&4294967295|_>>>10),_=m+(I^g&(b^I))+E[4]+4118548399&4294967295,m=g+(_<<7&4294967295|_>>>25),_=I+(b^m&(g^b))+E[5]+1200080426&4294967295,I=m+(_<<12&4294967295|_>>>20),_=b+(g^I&(m^g))+E[6]+2821735955&4294967295,b=I+(_<<17&4294967295|_>>>15),_=g+(m^b&(I^m))+E[7]+4249261313&4294967295,g=b+(_<<22&4294967295|_>>>10),_=m+(I^g&(b^I))+E[8]+1770035416&4294967295,m=g+(_<<7&4294967295|_>>>25),_=I+(b^m&(g^b))+E[9]+2336552879&4294967295,I=m+(_<<12&4294967295|_>>>20),_=b+(g^I&(m^g))+E[10]+4294925233&4294967295,b=I+(_<<17&4294967295|_>>>15),_=g+(m^b&(I^m))+E[11]+2304563134&4294967295,g=b+(_<<22&4294967295|_>>>10),_=m+(I^g&(b^I))+E[12]+1804603682&4294967295,m=g+(_<<7&4294967295|_>>>25),_=I+(b^m&(g^b))+E[13]+4254626195&4294967295,I=m+(_<<12&4294967295|_>>>20),_=b+(g^I&(m^g))+E[14]+2792965006&4294967295,b=I+(_<<17&4294967295|_>>>15),_=g+(m^b&(I^m))+E[15]+1236535329&4294967295,g=b+(_<<22&4294967295|_>>>10),_=m+(b^I&(g^b))+E[1]+4129170786&4294967295,m=g+(_<<5&4294967295|_>>>27),_=I+(g^b&(m^g))+E[6]+3225465664&4294967295,I=m+(_<<9&4294967295|_>>>23),_=b+(m^g&(I^m))+E[11]+643717713&4294967295,b=I+(_<<14&4294967295|_>>>18),_=g+(I^m&(b^I))+E[0]+3921069994&4294967295,g=b+(_<<20&4294967295|_>>>12),_=m+(b^I&(g^b))+E[5]+3593408605&4294967295,m=g+(_<<5&4294967295|_>>>27),_=I+(g^b&(m^g))+E[10]+38016083&4294967295,I=m+(_<<9&4294967295|_>>>23),_=b+(m^g&(I^m))+E[15]+3634488961&4294967295,b=I+(_<<14&4294967295|_>>>18),_=g+(I^m&(b^I))+E[4]+3889429448&4294967295,g=b+(_<<20&4294967295|_>>>12),_=m+(b^I&(g^b))+E[9]+568446438&4294967295,m=g+(_<<5&4294967295|_>>>27),_=I+(g^b&(m^g))+E[14]+3275163606&4294967295,I=m+(_<<9&4294967295|_>>>23),_=b+(m^g&(I^m))+E[3]+4107603335&4294967295,b=I+(_<<14&4294967295|_>>>18),_=g+(I^m&(b^I))+E[8]+1163531501&4294967295,g=b+(_<<20&4294967295|_>>>12),_=m+(b^I&(g^b))+E[13]+2850285829&4294967295,m=g+(_<<5&4294967295|_>>>27),_=I+(g^b&(m^g))+E[2]+4243563512&4294967295,I=m+(_<<9&4294967295|_>>>23),_=b+(m^g&(I^m))+E[7]+1735328473&4294967295,b=I+(_<<14&4294967295|_>>>18),_=g+(I^m&(b^I))+E[12]+2368359562&4294967295,g=b+(_<<20&4294967295|_>>>12),_=m+(g^b^I)+E[5]+4294588738&4294967295,m=g+(_<<4&4294967295|_>>>28),_=I+(m^g^b)+E[8]+2272392833&4294967295,I=m+(_<<11&4294967295|_>>>21),_=b+(I^m^g)+E[11]+1839030562&4294967295,b=I+(_<<16&4294967295|_>>>16),_=g+(b^I^m)+E[14]+4259657740&4294967295,g=b+(_<<23&4294967295|_>>>9),_=m+(g^b^I)+E[1]+2763975236&4294967295,m=g+(_<<4&4294967295|_>>>28),_=I+(m^g^b)+E[4]+1272893353&4294967295,I=m+(_<<11&4294967295|_>>>21),_=b+(I^m^g)+E[7]+4139469664&4294967295,b=I+(_<<16&4294967295|_>>>16),_=g+(b^I^m)+E[10]+3200236656&4294967295,g=b+(_<<23&4294967295|_>>>9),_=m+(g^b^I)+E[13]+681279174&4294967295,m=g+(_<<4&4294967295|_>>>28),_=I+(m^g^b)+E[0]+3936430074&4294967295,I=m+(_<<11&4294967295|_>>>21),_=b+(I^m^g)+E[3]+3572445317&4294967295,b=I+(_<<16&4294967295|_>>>16),_=g+(b^I^m)+E[6]+76029189&4294967295,g=b+(_<<23&4294967295|_>>>9),_=m+(g^b^I)+E[9]+3654602809&4294967295,m=g+(_<<4&4294967295|_>>>28),_=I+(m^g^b)+E[12]+3873151461&4294967295,I=m+(_<<11&4294967295|_>>>21),_=b+(I^m^g)+E[15]+530742520&4294967295,b=I+(_<<16&4294967295|_>>>16),_=g+(b^I^m)+E[2]+3299628645&4294967295,g=b+(_<<23&4294967295|_>>>9),_=m+(b^(g|~I))+E[0]+4096336452&4294967295,m=g+(_<<6&4294967295|_>>>26),_=I+(g^(m|~b))+E[7]+1126891415&4294967295,I=m+(_<<10&4294967295|_>>>22),_=b+(m^(I|~g))+E[14]+2878612391&4294967295,b=I+(_<<15&4294967295|_>>>17),_=g+(I^(b|~m))+E[5]+4237533241&4294967295,g=b+(_<<21&4294967295|_>>>11),_=m+(b^(g|~I))+E[12]+1700485571&4294967295,m=g+(_<<6&4294967295|_>>>26),_=I+(g^(m|~b))+E[3]+2399980690&4294967295,I=m+(_<<10&4294967295|_>>>22),_=b+(m^(I|~g))+E[10]+4293915773&4294967295,b=I+(_<<15&4294967295|_>>>17),_=g+(I^(b|~m))+E[1]+2240044497&4294967295,g=b+(_<<21&4294967295|_>>>11),_=m+(b^(g|~I))+E[8]+1873313359&4294967295,m=g+(_<<6&4294967295|_>>>26),_=I+(g^(m|~b))+E[15]+4264355552&4294967295,I=m+(_<<10&4294967295|_>>>22),_=b+(m^(I|~g))+E[6]+2734768916&4294967295,b=I+(_<<15&4294967295|_>>>17),_=g+(I^(b|~m))+E[13]+1309151649&4294967295,g=b+(_<<21&4294967295|_>>>11),_=m+(b^(g|~I))+E[4]+4149444226&4294967295,m=g+(_<<6&4294967295|_>>>26),_=I+(g^(m|~b))+E[11]+3174756917&4294967295,I=m+(_<<10&4294967295|_>>>22),_=b+(m^(I|~g))+E[2]+718787259&4294967295,b=I+(_<<15&4294967295|_>>>17),_=g+(I^(b|~m))+E[9]+3951481745&4294967295,p.g[0]=p.g[0]+m&4294967295,p.g[1]=p.g[1]+(b+(_<<21&4294967295|_>>>11))&4294967295,p.g[2]=p.g[2]+b&4294967295,p.g[3]=p.g[3]+I&4294967295}r.prototype.u=function(p,m){m===void 0&&(m=p.length);for(var g=m-this.blockSize,E=this.B,b=this.h,I=0;I<m;){if(b==0)for(;I<=g;)i(this,p,I),I+=this.blockSize;if(typeof p=="string"){for(;I<m;)if(E[b++]=p.charCodeAt(I++),b==this.blockSize){i(this,E),b=0;break}}else for(;I<m;)if(E[b++]=p[I++],b==this.blockSize){i(this,E),b=0;break}}this.h=b,this.o+=m},r.prototype.v=function(){var p=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);p[0]=128;for(var m=1;m<p.length-8;++m)p[m]=0;var g=8*this.o;for(m=p.length-8;m<p.length;++m)p[m]=g&255,g/=256;for(this.u(p),p=Array(16),m=g=0;4>m;++m)for(var E=0;32>E;E+=8)p[g++]=this.g[m]>>>E&255;return p};function a(p,m){var g=c;return Object.prototype.hasOwnProperty.call(g,p)?g[p]:g[p]=m(p)}function o(p,m){this.h=m;for(var g=[],E=!0,b=p.length-1;0<=b;b--){var I=p[b]|0;E&&I==m||(g[b]=I,E=!1)}this.g=g}var c={};function d(p){return-128<=p&&128>p?a(p,function(m){return new o([m|0],0>m?-1:0)}):new o([p|0],0>p?-1:0)}function h(p){if(isNaN(p)||!isFinite(p))return v;if(0>p)return O(h(-p));for(var m=[],g=1,E=0;p>=g;E++)m[E]=p/g|0,g*=4294967296;return new o(m,0)}function y(p,m){if(p.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(p.charAt(0)=="-")return O(y(p.substring(1),m));if(0<=p.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=h(Math.pow(m,8)),E=v,b=0;b<p.length;b+=8){var I=Math.min(8,p.length-b),_=parseInt(p.substring(b,b+I),m);8>I?(I=h(Math.pow(m,I)),E=E.j(I).add(h(_))):(E=E.j(g),E=E.add(h(_)))}return E}var v=d(0),w=d(1),P=d(16777216);n=o.prototype,n.m=function(){if(M(this))return-O(this).m();for(var p=0,m=1,g=0;g<this.g.length;g++){var E=this.i(g);p+=(0<=E?E:4294967296+E)*m,m*=4294967296}return p},n.toString=function(p){if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(N(this))return"0";if(M(this))return"-"+O(this).toString(p);for(var m=h(Math.pow(p,6)),g=this,E="";;){var b=j(g,m).g;g=A(g,b.j(m));var I=((0<g.g.length?g.g[0]:g.h)>>>0).toString(p);if(g=b,N(g))return I+E;for(;6>I.length;)I="0"+I;E=I+E}},n.i=function(p){return 0>p?0:p<this.g.length?this.g[p]:this.h};function N(p){if(p.h!=0)return!1;for(var m=0;m<p.g.length;m++)if(p.g[m]!=0)return!1;return!0}function M(p){return p.h==-1}n.l=function(p){return p=A(this,p),M(p)?-1:N(p)?0:1};function O(p){for(var m=p.g.length,g=[],E=0;E<m;E++)g[E]=~p.g[E];return new o(g,~p.h).add(w)}n.abs=function(){return M(this)?O(this):this},n.add=function(p){for(var m=Math.max(this.g.length,p.g.length),g=[],E=0,b=0;b<=m;b++){var I=E+(this.i(b)&65535)+(p.i(b)&65535),_=(I>>>16)+(this.i(b)>>>16)+(p.i(b)>>>16);E=_>>>16,I&=65535,_&=65535,g[b]=_<<16|I}return new o(g,g[g.length-1]&-2147483648?-1:0)};function A(p,m){return p.add(O(m))}n.j=function(p){if(N(this)||N(p))return v;if(M(this))return M(p)?O(this).j(O(p)):O(O(this).j(p));if(M(p))return O(this.j(O(p)));if(0>this.l(P)&&0>p.l(P))return h(this.m()*p.m());for(var m=this.g.length+p.g.length,g=[],E=0;E<2*m;E++)g[E]=0;for(E=0;E<this.g.length;E++)for(var b=0;b<p.g.length;b++){var I=this.i(E)>>>16,_=this.i(E)&65535,J=p.i(b)>>>16,Le=p.i(b)&65535;g[2*E+2*b]+=_*Le,V(g,2*E+2*b),g[2*E+2*b+1]+=I*Le,V(g,2*E+2*b+1),g[2*E+2*b+1]+=_*J,V(g,2*E+2*b+1),g[2*E+2*b+2]+=I*J,V(g,2*E+2*b+2)}for(E=0;E<m;E++)g[E]=g[2*E+1]<<16|g[2*E];for(E=m;E<2*m;E++)g[E]=0;return new o(g,0)};function V(p,m){for(;(p[m]&65535)!=p[m];)p[m+1]+=p[m]>>>16,p[m]&=65535,m++}function $(p,m){this.g=p,this.h=m}function j(p,m){if(N(m))throw Error("division by zero");if(N(p))return new $(v,v);if(M(p))return m=j(O(p),m),new $(O(m.g),O(m.h));if(M(m))return m=j(p,O(m)),new $(O(m.g),m.h);if(30<p.g.length){if(M(p)||M(m))throw Error("slowDivide_ only works with positive integers.");for(var g=w,E=m;0>=E.l(p);)g=W(g),E=W(E);var b=K(g,1),I=K(E,1);for(E=K(E,2),g=K(g,2);!N(E);){var _=I.add(E);0>=_.l(p)&&(b=b.add(g),I=_),E=K(E,1),g=K(g,1)}return m=A(p,b.j(m)),new $(b,m)}for(b=v;0<=p.l(m);){for(g=Math.max(1,Math.floor(p.m()/m.m())),E=Math.ceil(Math.log(g)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),I=h(g),_=I.j(m);M(_)||0<_.l(p);)g-=E,I=h(g),_=I.j(m);N(I)&&(I=w),b=b.add(I),p=A(p,_)}return new $(b,p)}n.A=function(p){return j(this,p).h},n.and=function(p){for(var m=Math.max(this.g.length,p.g.length),g=[],E=0;E<m;E++)g[E]=this.i(E)&p.i(E);return new o(g,this.h&p.h)},n.or=function(p){for(var m=Math.max(this.g.length,p.g.length),g=[],E=0;E<m;E++)g[E]=this.i(E)|p.i(E);return new o(g,this.h|p.h)},n.xor=function(p){for(var m=Math.max(this.g.length,p.g.length),g=[],E=0;E<m;E++)g[E]=this.i(E)^p.i(E);return new o(g,this.h^p.h)};function W(p){for(var m=p.g.length+1,g=[],E=0;E<m;E++)g[E]=p.i(E)<<1|p.i(E-1)>>>31;return new o(g,p.h)}function K(p,m){var g=m>>5;m%=32;for(var E=p.g.length-g,b=[],I=0;I<E;I++)b[I]=0<m?p.i(I+g)>>>m|p.i(I+g+1)<<32-m:p.i(I+g);return new o(b,p.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=y,Ec=o}).apply(typeof Yo!="undefined"?Yo:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Nr=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var wc,Ln,bc,Hr,Is,Ic,Tc,Ac;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,l,u){return s==Array.prototype||s==Object.prototype||(s[l]=u.value),s};function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Nr=="object"&&Nr];for(var l=0;l<s.length;++l){var u=s[l];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=t(this);function i(s,l){if(l)e:{var u=r;s=s.split(".");for(var f=0;f<s.length-1;f++){var T=s[f];if(!(T in u))break e;u=u[T]}s=s[s.length-1],f=u[s],l=l(f),l!=f&&l!=null&&e(u,s,{configurable:!0,writable:!0,value:l})}}function a(s,l){s instanceof String&&(s+="");var u=0,f=!1,T={next:function(){if(!f&&u<s.length){var S=u++;return{value:l(S,s[S]),done:!1}}return f=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(s){return s||function(){return a(this,function(l,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},c=this||self;function d(s){var l=typeof s;return l=l!="object"?l:s?Array.isArray(s)?"array":l:"null",l=="array"||l=="object"&&typeof s.length=="number"}function h(s){var l=typeof s;return l=="object"&&s!=null||l=="function"}function y(s,l,u){return s.call.apply(s.bind,arguments)}function v(s,l,u){if(!s)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,f),s.apply(l,T)}}return function(){return s.apply(l,arguments)}}function w(s,l,u){return w=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?y:v,w.apply(null,arguments)}function P(s,l){var u=Array.prototype.slice.call(arguments,1);return function(){var f=u.slice();return f.push.apply(f,arguments),s.apply(this,f)}}function N(s,l){function u(){}u.prototype=l.prototype,s.aa=l.prototype,s.prototype=new u,s.prototype.constructor=s,s.Qb=function(f,T,S){for(var D=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)D[Q-2]=arguments[Q];return l.prototype[T].apply(f,D)}}function M(s){const l=s.length;if(0<l){const u=Array(l);for(let f=0;f<l;f++)u[f]=s[f];return u}return[]}function O(s,l){for(let u=1;u<arguments.length;u++){const f=arguments[u];if(d(f)){const T=s.length||0,S=f.length||0;s.length=T+S;for(let D=0;D<S;D++)s[T+D]=f[D]}else s.push(f)}}class A{constructor(l,u){this.i=l,this.j=u,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function V(s){return/^[\s\xa0]*$/.test(s)}function $(){var s=c.navigator;return s&&(s=s.userAgent)?s:""}function j(s){return j[" "](s),s}j[" "]=function(){};var W=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function K(s,l,u){for(const f in s)l.call(u,s[f],f,s)}function p(s,l){for(const u in s)l.call(void 0,s[u],u,s)}function m(s){const l={};for(const u in s)l[u]=s[u];return l}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(s,l){let u,f;for(let T=1;T<arguments.length;T++){f=arguments[T];for(u in f)s[u]=f[u];for(let S=0;S<g.length;S++)u=g[S],Object.prototype.hasOwnProperty.call(f,u)&&(s[u]=f[u])}}function b(s){var l=1;s=s.split(":");const u=[];for(;0<l&&s.length;)u.push(s.shift()),l--;return s.length&&u.push(s.join(":")),u}function I(s){c.setTimeout(()=>{throw s},0)}function _(){var s=Ut;let l=null;return s.g&&(l=s.g,s.g=s.g.next,s.g||(s.h=null),l.next=null),l}class J{constructor(){this.h=this.g=null}add(l,u){const f=Le.get();f.set(l,u),this.h?this.h.next=f:this.g=f,this.h=f}}var Le=new A(()=>new lr,s=>s.reset());class lr{constructor(){this.next=this.g=this.h=null}set(l,u){this.h=l,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let tt,nt=!1,Ut=new J,gn=()=>{const s=c.Promise.resolve(void 0);tt=()=>{s.then(cr)}};var cr=()=>{for(var s;s=_();){try{s.h.call(s.g)}catch(u){I(u)}var l=Le;l.j(s),100>l.h&&(l.h++,s.next=l.g,l.g=s)}nt=!1};function ne(){this.s=this.s,this.C=this.C}ne.prototype.s=!1,ne.prototype.ma=function(){this.s||(this.s=!0,this.N())},ne.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function se(s,l){this.type=s,this.g=this.target=l,this.defaultPrevented=!1}se.prototype.h=function(){this.defaultPrevented=!0};var rt=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,l=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const u=()=>{};c.addEventListener("test",u,l),c.removeEventListener("test",u,l)}catch{}return s}();function Oe(s,l){if(se.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var u=this.type=s.type,f=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=l,l=s.relatedTarget){if(W){e:{try{j(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else u=="mouseover"?l=s.fromElement:u=="mouseout"&&(l=s.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:ur[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&Oe.aa.h.call(this)}}N(Oe,se);var ur={2:"touch",3:"pen",4:"mouse"};Oe.prototype.h=function(){Oe.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var dr="closure_listenable_"+(1e6*Math.random()|0),$u=0;function xu(s,l,u,f,T){this.listener=s,this.proxy=null,this.src=l,this.type=u,this.capture=!!f,this.ha=T,this.key=++$u,this.da=this.fa=!1}function hr(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function fr(s){this.src=s,this.g={},this.h=0}fr.prototype.add=function(s,l,u,f,T){var S=s.toString();s=this.g[S],s||(s=this.g[S]=[],this.h++);var D=Mi(s,l,f,T);return-1<D?(l=s[D],u||(l.fa=!1)):(l=new xu(l,this.src,S,!!f,T),l.fa=u,s.push(l)),l};function Vi(s,l){var u=l.type;if(u in s.g){var f=s.g[u],T=Array.prototype.indexOf.call(f,l,void 0),S;(S=0<=T)&&Array.prototype.splice.call(f,T,1),S&&(hr(l),s.g[u].length==0&&(delete s.g[u],s.h--))}}function Mi(s,l,u,f){for(var T=0;T<s.length;++T){var S=s[T];if(!S.da&&S.listener==l&&S.capture==!!u&&S.ha==f)return T}return-1}var $i="closure_lm_"+(1e6*Math.random()|0),xi={};function ba(s,l,u,f,T){if(Array.isArray(l)){for(var S=0;S<l.length;S++)ba(s,l[S],u,f,T);return null}return u=Aa(u),s&&s[dr]?s.K(l,u,h(f)?!!f.capture:!1,T):Uu(s,l,u,!1,f,T)}function Uu(s,l,u,f,T,S){if(!l)throw Error("Invalid event type");var D=h(T)?!!T.capture:!!T,Q=Fi(s);if(Q||(s[$i]=Q=new fr(s)),u=Q.add(l,u,f,D,S),u.proxy)return u;if(f=Fu(),u.proxy=f,f.src=s,f.listener=u,s.addEventListener)rt||(T=D),T===void 0&&(T=!1),s.addEventListener(l.toString(),f,T);else if(s.attachEvent)s.attachEvent(Ta(l.toString()),f);else if(s.addListener&&s.removeListener)s.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Fu(){function s(u){return l.call(s.src,s.listener,u)}const l=ju;return s}function Ia(s,l,u,f,T){if(Array.isArray(l))for(var S=0;S<l.length;S++)Ia(s,l[S],u,f,T);else f=h(f)?!!f.capture:!!f,u=Aa(u),s&&s[dr]?(s=s.i,l=String(l).toString(),l in s.g&&(S=s.g[l],u=Mi(S,u,f,T),-1<u&&(hr(S[u]),Array.prototype.splice.call(S,u,1),S.length==0&&(delete s.g[l],s.h--)))):s&&(s=Fi(s))&&(l=s.g[l.toString()],s=-1,l&&(s=Mi(l,u,f,T)),(u=-1<s?l[s]:null)&&Ui(u))}function Ui(s){if(typeof s!="number"&&s&&!s.da){var l=s.src;if(l&&l[dr])Vi(l.i,s);else{var u=s.type,f=s.proxy;l.removeEventListener?l.removeEventListener(u,f,s.capture):l.detachEvent?l.detachEvent(Ta(u),f):l.addListener&&l.removeListener&&l.removeListener(f),(u=Fi(l))?(Vi(u,s),u.h==0&&(u.src=null,l[$i]=null)):hr(s)}}}function Ta(s){return s in xi?xi[s]:xi[s]="on"+s}function ju(s,l){if(s.da)s=!0;else{l=new Oe(l,this);var u=s.listener,f=s.ha||s.src;s.fa&&Ui(s),s=u.call(f,l)}return s}function Fi(s){return s=s[$i],s instanceof fr?s:null}var ji="__closure_events_fn_"+(1e9*Math.random()>>>0);function Aa(s){return typeof s=="function"?s:(s[ji]||(s[ji]=function(l){return s.handleEvent(l)}),s[ji])}function ye(){ne.call(this),this.i=new fr(this),this.M=this,this.F=null}N(ye,ne),ye.prototype[dr]=!0,ye.prototype.removeEventListener=function(s,l,u,f){Ia(this,s,l,u,f)};function Se(s,l){var u,f=s.F;if(f)for(u=[];f;f=f.F)u.push(f);if(s=s.M,f=l.type||l,typeof l=="string")l=new se(l,s);else if(l instanceof se)l.target=l.target||s;else{var T=l;l=new se(f,s),E(l,T)}if(T=!0,u)for(var S=u.length-1;0<=S;S--){var D=l.g=u[S];T=pr(D,f,!0,l)&&T}if(D=l.g=s,T=pr(D,f,!0,l)&&T,T=pr(D,f,!1,l)&&T,u)for(S=0;S<u.length;S++)D=l.g=u[S],T=pr(D,f,!1,l)&&T}ye.prototype.N=function(){if(ye.aa.N.call(this),this.i){var s=this.i,l;for(l in s.g){for(var u=s.g[l],f=0;f<u.length;f++)hr(u[f]);delete s.g[l],s.h--}}this.F=null},ye.prototype.K=function(s,l,u,f){return this.i.add(String(s),l,!1,u,f)},ye.prototype.L=function(s,l,u,f){return this.i.add(String(s),l,!0,u,f)};function pr(s,l,u,f){if(l=s.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,S=0;S<l.length;++S){var D=l[S];if(D&&!D.da&&D.capture==u){var Q=D.listener,he=D.ha||D.src;D.fa&&Vi(s.i,D),T=Q.call(he,f)!==!1&&T}}return T&&!f.defaultPrevented}function Sa(s,l,u){if(typeof s=="function")u&&(s=w(s,u));else if(s&&typeof s.handleEvent=="function")s=w(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(s,l||0)}function Ra(s){s.g=Sa(()=>{s.g=null,s.i&&(s.i=!1,Ra(s))},s.l);const l=s.h;s.h=null,s.m.apply(null,l)}class Bu extends ne{constructor(l,u){super(),this.m=l,this.l=u,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Ra(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function yn(s){ne.call(this),this.h=s,this.g={}}N(yn,ne);var Pa=[];function ka(s){K(s.g,function(l,u){this.g.hasOwnProperty(u)&&Ui(l)},s),s.g={}}yn.prototype.N=function(){yn.aa.N.call(this),ka(this)},yn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Bi=c.JSON.stringify,qu=c.JSON.parse,Hu=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function qi(){}qi.prototype.h=null;function Ca(s){return s.h||(s.h=s.i())}function Na(){}var vn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Hi(){se.call(this,"d")}N(Hi,se);function zi(){se.call(this,"c")}N(zi,se);var Tt={},Da=null;function mr(){return Da=Da||new ye}Tt.La="serverreachability";function Oa(s){se.call(this,Tt.La,s)}N(Oa,se);function _n(s){const l=mr();Se(l,new Oa(l))}Tt.STAT_EVENT="statevent";function La(s,l){se.call(this,Tt.STAT_EVENT,s),this.stat=l}N(La,se);function Re(s){const l=mr();Se(l,new La(l,s))}Tt.Ma="timingevent";function Va(s,l){se.call(this,Tt.Ma,s),this.size=l}N(Va,se);function En(s,l){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},l)}function wn(){this.g=!0}wn.prototype.xa=function(){this.g=!1};function zu(s,l,u,f,T,S){s.info(function(){if(s.g)if(S)for(var D="",Q=S.split("&"),he=0;he<Q.length;he++){var G=Q[he].split("=");if(1<G.length){var ve=G[0];G=G[1];var _e=ve.split("_");D=2<=_e.length&&_e[1]=="type"?D+(ve+"="+G+"&"):D+(ve+"=redacted&")}}else D=null;else D=S;return"XMLHTTP REQ ("+f+") [attempt "+T+"]: "+l+`
`+u+`
`+D})}function Gu(s,l,u,f,T,S,D){s.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+T+"]: "+l+`
`+u+`
`+S+" "+D})}function Ft(s,l,u,f){s.info(function(){return"XMLHTTP TEXT ("+l+"): "+Ku(s,u)+(f?" "+f:"")})}function Wu(s,l){s.info(function(){return"TIMEOUT: "+l})}wn.prototype.info=function(){};function Ku(s,l){if(!s.g)return l;if(!l)return null;try{var u=JSON.parse(l);if(u){for(s=0;s<u.length;s++)if(Array.isArray(u[s])){var f=u[s];if(!(2>f.length)){var T=f[1];if(Array.isArray(T)&&!(1>T.length)){var S=T[0];if(S!="noop"&&S!="stop"&&S!="close")for(var D=1;D<T.length;D++)T[D]=""}}}}return Bi(u)}catch{return l}}var gr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ma={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Gi;function yr(){}N(yr,qi),yr.prototype.g=function(){return new XMLHttpRequest},yr.prototype.i=function(){return{}},Gi=new yr;function it(s,l,u,f){this.j=s,this.i=l,this.l=u,this.R=f||1,this.U=new yn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new $a}function $a(){this.i=null,this.g="",this.h=!1}var xa={},Wi={};function Ki(s,l,u){s.L=1,s.v=wr(ze(l)),s.m=u,s.P=!0,Ua(s,null)}function Ua(s,l){s.F=Date.now(),vr(s),s.A=ze(s.v);var u=s.A,f=s.R;Array.isArray(f)||(f=[String(f)]),Za(u.i,"t",f),s.C=0,u=s.j.J,s.h=new $a,s.g=vo(s.j,u?l:null,!s.m),0<s.O&&(s.M=new Bu(w(s.Y,s,s.g),s.O)),l=s.U,u=s.g,f=s.ca;var T="readystatechange";Array.isArray(T)||(T&&(Pa[0]=T.toString()),T=Pa);for(var S=0;S<T.length;S++){var D=ba(u,T[S],f||l.handleEvent,!1,l.h||l);if(!D)break;l.g[D.key]=D}l=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,l)):(s.u="GET",s.g.ea(s.A,s.u,null,l)),_n(),zu(s.i,s.u,s.A,s.l,s.R,s.m)}it.prototype.ca=function(s){s=s.target;const l=this.M;l&&Ge(s)==3?l.j():this.Y(s)},it.prototype.Y=function(s){try{if(s==this.g)e:{const _e=Ge(this.g);var l=this.g.Ba();const qt=this.g.Z();if(!(3>_e)&&(_e!=3||this.g&&(this.h.h||this.g.oa()||ao(this.g)))){this.J||_e!=4||l==7||(l==8||0>=qt?_n(3):_n(2)),Ji(this);var u=this.g.Z();this.X=u;t:if(Fa(this)){var f=ao(this.g);s="";var T=f.length,S=Ge(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){At(this),bn(this);var D="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,s+=this.h.i.decode(f[l],{stream:!(S&&l==T-1)});f.length=0,this.h.g+=s,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=u==200,Gu(this.i,this.u,this.A,this.l,this.R,_e,u),this.o){if(this.T&&!this.K){t:{if(this.g){var Q,he=this.g;if((Q=he.g?he.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!V(Q)){var G=Q;break t}}G=null}if(u=G)Ft(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Qi(this,u);else{this.o=!1,this.s=3,Re(12),At(this),bn(this);break e}}if(this.P){u=!0;let Ve;for(;!this.J&&this.C<D.length;)if(Ve=Ju(this,D),Ve==Wi){_e==4&&(this.s=4,Re(14),u=!1),Ft(this.i,this.l,null,"[Incomplete Response]");break}else if(Ve==xa){this.s=4,Re(15),Ft(this.i,this.l,D,"[Invalid Chunk]"),u=!1;break}else Ft(this.i,this.l,Ve,null),Qi(this,Ve);if(Fa(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),_e!=4||D.length!=0||this.h.h||(this.s=1,Re(16),u=!1),this.o=this.o&&u,!u)Ft(this.i,this.l,D,"[Invalid Chunked Response]"),At(this),bn(this);else if(0<D.length&&!this.W){this.W=!0;var ve=this.j;ve.g==this&&ve.ba&&!ve.M&&(ve.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),ns(ve),ve.M=!0,Re(11))}}else Ft(this.i,this.l,D,null),Qi(this,D);_e==4&&At(this),this.o&&!this.J&&(_e==4?po(this.j,this):(this.o=!1,vr(this)))}else hd(this.g),u==400&&0<D.indexOf("Unknown SID")?(this.s=3,Re(12)):(this.s=0,Re(13)),At(this),bn(this)}}}catch{}finally{}};function Fa(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function Ju(s,l){var u=s.C,f=l.indexOf(`
`,u);return f==-1?Wi:(u=Number(l.substring(u,f)),isNaN(u)?xa:(f+=1,f+u>l.length?Wi:(l=l.slice(f,f+u),s.C=f+u,l)))}it.prototype.cancel=function(){this.J=!0,At(this)};function vr(s){s.S=Date.now()+s.I,ja(s,s.I)}function ja(s,l){if(s.B!=null)throw Error("WatchDog timer not null");s.B=En(w(s.ba,s),l)}function Ji(s){s.B&&(c.clearTimeout(s.B),s.B=null)}it.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(Wu(this.i,this.A),this.L!=2&&(_n(),Re(17)),At(this),this.s=2,bn(this)):ja(this,this.S-s)};function bn(s){s.j.G==0||s.J||po(s.j,s)}function At(s){Ji(s);var l=s.M;l&&typeof l.ma=="function"&&l.ma(),s.M=null,ka(s.U),s.g&&(l=s.g,s.g=null,l.abort(),l.ma())}function Qi(s,l){try{var u=s.j;if(u.G!=0&&(u.g==s||Xi(u.h,s))){if(!s.K&&Xi(u.h,s)&&u.G==3){try{var f=u.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var T=f;if(T[0]==0){e:if(!u.u){if(u.g)if(u.g.F+3e3<s.F)Rr(u),Ar(u);else break e;ts(u),Re(18)}}else u.za=T[1],0<u.za-u.T&&37500>T[2]&&u.F&&u.v==0&&!u.C&&(u.C=En(w(u.Za,u),6e3));if(1>=Ha(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else Rt(u,11)}else if((s.K||u.g==s)&&Rr(u),!V(l))for(T=u.Da.g.parse(l),l=0;l<T.length;l++){let G=T[l];if(u.T=G[0],G=G[1],u.G==2)if(G[0]=="c"){u.K=G[1],u.ia=G[2];const ve=G[3];ve!=null&&(u.la=ve,u.j.info("VER="+u.la));const _e=G[4];_e!=null&&(u.Aa=_e,u.j.info("SVER="+u.Aa));const qt=G[5];qt!=null&&typeof qt=="number"&&0<qt&&(f=1.5*qt,u.L=f,u.j.info("backChannelRequestTimeoutMs_="+f)),f=u;const Ve=s.g;if(Ve){const kr=Ve.g?Ve.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(kr){var S=f.h;S.g||kr.indexOf("spdy")==-1&&kr.indexOf("quic")==-1&&kr.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Yi(S,S.h),S.h=null))}if(f.D){const rs=Ve.g?Ve.g.getResponseHeader("X-HTTP-Session-Id"):null;rs&&(f.ya=rs,ee(f.I,f.D,rs))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-s.F,u.j.info("Handshake RTT: "+u.R+"ms")),f=u;var D=s;if(f.qa=yo(f,f.J?f.ia:null,f.W),D.K){za(f.h,D);var Q=D,he=f.L;he&&(Q.I=he),Q.B&&(Ji(Q),vr(Q)),f.g=D}else ho(f);0<u.i.length&&Sr(u)}else G[0]!="stop"&&G[0]!="close"||Rt(u,7);else u.G==3&&(G[0]=="stop"||G[0]=="close"?G[0]=="stop"?Rt(u,7):es(u):G[0]!="noop"&&u.l&&u.l.ta(G),u.v=0)}}_n(4)}catch{}}var Qu=class{constructor(s,l){this.g=s,this.map=l}};function Ba(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function qa(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Ha(s){return s.h?1:s.g?s.g.size:0}function Xi(s,l){return s.h?s.h==l:s.g?s.g.has(l):!1}function Yi(s,l){s.g?s.g.add(l):s.h=l}function za(s,l){s.h&&s.h==l?s.h=null:s.g&&s.g.has(l)&&s.g.delete(l)}Ba.prototype.cancel=function(){if(this.i=Ga(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Ga(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let l=s.i;for(const u of s.g.values())l=l.concat(u.D);return l}return M(s.i)}function Xu(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map!="undefined"&&s instanceof Map||typeof Set!="undefined"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(d(s)){for(var l=[],u=s.length,f=0;f<u;f++)l.push(s[f]);return l}l=[],u=0;for(f in s)l[u++]=s[f];return l}function Yu(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map!="undefined"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set!="undefined"&&s instanceof Set)){if(d(s)||typeof s=="string"){var l=[];s=s.length;for(var u=0;u<s;u++)l.push(u);return l}l=[],u=0;for(const f in s)l[u++]=f;return l}}}function Wa(s,l){if(s.forEach&&typeof s.forEach=="function")s.forEach(l,void 0);else if(d(s)||typeof s=="string")Array.prototype.forEach.call(s,l,void 0);else for(var u=Yu(s),f=Xu(s),T=f.length,S=0;S<T;S++)l.call(void 0,f[S],u&&u[S],s)}var Ka=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Zu(s,l){if(s){s=s.split("&");for(var u=0;u<s.length;u++){var f=s[u].indexOf("="),T=null;if(0<=f){var S=s[u].substring(0,f);T=s[u].substring(f+1)}else S=s[u];l(S,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function St(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof St){this.h=s.h,_r(this,s.j),this.o=s.o,this.g=s.g,Er(this,s.s),this.l=s.l;var l=s.i,u=new An;u.i=l.i,l.g&&(u.g=new Map(l.g),u.h=l.h),Ja(this,u),this.m=s.m}else s&&(l=String(s).match(Ka))?(this.h=!1,_r(this,l[1]||"",!0),this.o=In(l[2]||""),this.g=In(l[3]||"",!0),Er(this,l[4]),this.l=In(l[5]||"",!0),Ja(this,l[6]||"",!0),this.m=In(l[7]||"")):(this.h=!1,this.i=new An(null,this.h))}St.prototype.toString=function(){var s=[],l=this.j;l&&s.push(Tn(l,Qa,!0),":");var u=this.g;return(u||l=="file")&&(s.push("//"),(l=this.o)&&s.push(Tn(l,Qa,!0),"@"),s.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&s.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&s.push("/"),s.push(Tn(u,u.charAt(0)=="/"?nd:td,!0))),(u=this.i.toString())&&s.push("?",u),(u=this.m)&&s.push("#",Tn(u,id)),s.join("")};function ze(s){return new St(s)}function _r(s,l,u){s.j=u?In(l,!0):l,s.j&&(s.j=s.j.replace(/:$/,""))}function Er(s,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);s.s=l}else s.s=null}function Ja(s,l,u){l instanceof An?(s.i=l,sd(s.i,s.h)):(u||(l=Tn(l,rd)),s.i=new An(l,s.h))}function ee(s,l,u){s.i.set(l,u)}function wr(s){return ee(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function In(s,l){return s?l?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Tn(s,l,u){return typeof s=="string"?(s=encodeURI(s).replace(l,ed),u&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function ed(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Qa=/[#\/\?@]/g,td=/[#\?:]/g,nd=/[#\?]/g,rd=/[#\?@]/g,id=/#/g;function An(s,l){this.h=this.g=null,this.i=s||null,this.j=!!l}function st(s){s.g||(s.g=new Map,s.h=0,s.i&&Zu(s.i,function(l,u){s.add(decodeURIComponent(l.replace(/\+/g," ")),u)}))}n=An.prototype,n.add=function(s,l){st(this),this.i=null,s=jt(this,s);var u=this.g.get(s);return u||this.g.set(s,u=[]),u.push(l),this.h+=1,this};function Xa(s,l){st(s),l=jt(s,l),s.g.has(l)&&(s.i=null,s.h-=s.g.get(l).length,s.g.delete(l))}function Ya(s,l){return st(s),l=jt(s,l),s.g.has(l)}n.forEach=function(s,l){st(this),this.g.forEach(function(u,f){u.forEach(function(T){s.call(l,T,f,this)},this)},this)},n.na=function(){st(this);const s=Array.from(this.g.values()),l=Array.from(this.g.keys()),u=[];for(let f=0;f<l.length;f++){const T=s[f];for(let S=0;S<T.length;S++)u.push(l[f])}return u},n.V=function(s){st(this);let l=[];if(typeof s=="string")Ya(this,s)&&(l=l.concat(this.g.get(jt(this,s))));else{s=Array.from(this.g.values());for(let u=0;u<s.length;u++)l=l.concat(s[u])}return l},n.set=function(s,l){return st(this),this.i=null,s=jt(this,s),Ya(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[l]),this.h+=1,this},n.get=function(s,l){return s?(s=this.V(s),0<s.length?String(s[0]):l):l};function Za(s,l,u){Xa(s,l),0<u.length&&(s.i=null,s.g.set(jt(s,l),M(u)),s.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],l=Array.from(this.g.keys());for(var u=0;u<l.length;u++){var f=l[u];const S=encodeURIComponent(String(f)),D=this.V(f);for(f=0;f<D.length;f++){var T=S;D[f]!==""&&(T+="="+encodeURIComponent(String(D[f]))),s.push(T)}}return this.i=s.join("&")};function jt(s,l){return l=String(l),s.j&&(l=l.toLowerCase()),l}function sd(s,l){l&&!s.j&&(st(s),s.i=null,s.g.forEach(function(u,f){var T=f.toLowerCase();f!=T&&(Xa(this,f),Za(this,T,u))},s)),s.j=l}function ad(s,l){const u=new wn;if(c.Image){const f=new Image;f.onload=P(at,u,"TestLoadImage: loaded",!0,l,f),f.onerror=P(at,u,"TestLoadImage: error",!1,l,f),f.onabort=P(at,u,"TestLoadImage: abort",!1,l,f),f.ontimeout=P(at,u,"TestLoadImage: timeout",!1,l,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=s}else l(!1)}function od(s,l){const u=new wn,f=new AbortController,T=setTimeout(()=>{f.abort(),at(u,"TestPingServer: timeout",!1,l)},1e4);fetch(s,{signal:f.signal}).then(S=>{clearTimeout(T),S.ok?at(u,"TestPingServer: ok",!0,l):at(u,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),at(u,"TestPingServer: error",!1,l)})}function at(s,l,u,f,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),f(u)}catch{}}function ld(){this.g=new Hu}function cd(s,l,u){const f=u||"";try{Wa(s,function(T,S){let D=T;h(T)&&(D=Bi(T)),l.push(f+S+"="+encodeURIComponent(D))})}catch(T){throw l.push(f+"type="+encodeURIComponent("_badmap")),T}}function br(s){this.l=s.Ub||null,this.j=s.eb||!1}N(br,qi),br.prototype.g=function(){return new Ir(this.l,this.j)},br.prototype.i=function(s){return function(){return s}}({});function Ir(s,l){ye.call(this),this.D=s,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}N(Ir,ye),n=Ir.prototype,n.open=function(s,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=l,this.readyState=1,Rn(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(l.body=s),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Sn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Rn(this)),this.g&&(this.readyState=3,Rn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;eo(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function eo(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var l=s.value?s.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!s.done}))&&(this.response=this.responseText+=l)}s.done?Sn(this):Rn(this),this.readyState==3&&eo(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,Sn(this))},n.Qa=function(s){this.g&&(this.response=s,Sn(this))},n.ga=function(){this.g&&Sn(this)};function Sn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,Rn(s)}n.setRequestHeader=function(s,l){this.u.append(s,l)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],l=this.h.entries();for(var u=l.next();!u.done;)u=u.value,s.push(u[0]+": "+u[1]),u=l.next();return s.join(`\r
`)};function Rn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Ir.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function to(s){let l="";return K(s,function(u,f){l+=f,l+=":",l+=u,l+=`\r
`}),l}function Zi(s,l,u){e:{for(f in u){var f=!1;break e}f=!0}f||(u=to(u),typeof s=="string"?u!=null&&encodeURIComponent(String(u)):ee(s,l,u))}function re(s){ye.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}N(re,ye);var ud=/^https?$/i,dd=["POST","PUT"];n=re.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,l,u,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);l=l?l.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Gi.g(),this.v=this.o?Ca(this.o):Ca(Gi),this.g.onreadystatechange=w(this.Ea,this);try{this.B=!0,this.g.open(l,String(s),!0),this.B=!1}catch(S){no(this,S);return}if(s=u||"",u=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var T in f)u.set(T,f[T]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const S of f.keys())u.set(S,f.get(S));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(u.keys()).find(S=>S.toLowerCase()=="content-type"),T=c.FormData&&s instanceof c.FormData,!(0<=Array.prototype.indexOf.call(dd,l,void 0))||f||T||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,D]of u)this.g.setRequestHeader(S,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{so(this),this.u=!0,this.g.send(s),this.u=!1}catch(S){no(this,S)}};function no(s,l){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=l,s.m=5,ro(s),Tr(s)}function ro(s){s.A||(s.A=!0,Se(s,"complete"),Se(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,Se(this,"complete"),Se(this,"abort"),Tr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Tr(this,!0)),re.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?io(this):this.bb())},n.bb=function(){io(this)};function io(s){if(s.h&&typeof o!="undefined"&&(!s.v[1]||Ge(s)!=4||s.Z()!=2)){if(s.u&&Ge(s)==4)Sa(s.Ea,0,s);else if(Se(s,"readystatechange"),Ge(s)==4){s.h=!1;try{const D=s.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var u;if(!(u=l)){var f;if(f=D===0){var T=String(s.D).match(Ka)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),f=!ud.test(T?T.toLowerCase():"")}u=f}if(u)Se(s,"complete"),Se(s,"success");else{s.m=6;try{var S=2<Ge(s)?s.g.statusText:""}catch{S=""}s.l=S+" ["+s.Z()+"]",ro(s)}}finally{Tr(s)}}}}function Tr(s,l){if(s.g){so(s);const u=s.g,f=s.v[0]?()=>{}:null;s.g=null,s.v=null,l||Se(s,"ready");try{u.onreadystatechange=f}catch{}}}function so(s){s.I&&(c.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function Ge(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<Ge(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var l=this.g.responseText;return s&&l.indexOf(s)==0&&(l=l.substring(s.length)),qu(l)}};function ao(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function hd(s){const l={};s=(s.g&&2<=Ge(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<s.length;f++){if(V(s[f]))continue;var u=b(s[f]);const T=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const S=l[T]||[];l[T]=S,S.push(u)}p(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Pn(s,l,u){return u&&u.internalChannelParams&&u.internalChannelParams[s]||l}function oo(s){this.Aa=0,this.i=[],this.j=new wn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Pn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Pn("baseRetryDelayMs",5e3,s),this.cb=Pn("retryDelaySeedMs",1e4,s),this.Wa=Pn("forwardChannelMaxRetries",2,s),this.wa=Pn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new Ba(s&&s.concurrentRequestLimit),this.Da=new ld,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=oo.prototype,n.la=8,n.G=1,n.connect=function(s,l,u,f){Re(0),this.W=s,this.H=l||{},u&&f!==void 0&&(this.H.OSID=u,this.H.OAID=f),this.F=this.X,this.I=yo(this,null,this.W),Sr(this)};function es(s){if(lo(s),s.G==3){var l=s.U++,u=ze(s.I);if(ee(u,"SID",s.K),ee(u,"RID",l),ee(u,"TYPE","terminate"),kn(s,u),l=new it(s,s.j,l),l.L=2,l.v=wr(ze(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=l.v,u=!0),u||(l.g=vo(l.j,null),l.g.ea(l.v)),l.F=Date.now(),vr(l)}go(s)}function Ar(s){s.g&&(ns(s),s.g.cancel(),s.g=null)}function lo(s){Ar(s),s.u&&(c.clearTimeout(s.u),s.u=null),Rr(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&c.clearTimeout(s.s),s.s=null)}function Sr(s){if(!qa(s.h)&&!s.s){s.s=!0;var l=s.Ga;tt||gn(),nt||(tt(),nt=!0),Ut.add(l,s),s.B=0}}function fd(s,l){return Ha(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=l.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=En(w(s.Ga,s,l),mo(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const T=new it(this,this.j,s);let S=this.o;if(this.S&&(S?(S=m(S),E(S,this.S)):S=this.S),this.m!==null||this.O||(T.H=S,S=null),this.P)e:{for(var l=0,u=0;u<this.i.length;u++){t:{var f=this.i[u];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=u;break e}if(l===4096||u===this.i.length-1){l=u+1;break e}}l=1e3}else l=1e3;l=uo(this,T,l),u=ze(this.I),ee(u,"RID",s),ee(u,"CVER",22),this.D&&ee(u,"X-HTTP-Session-Id",this.D),kn(this,u),S&&(this.O?l="headers="+encodeURIComponent(String(to(S)))+"&"+l:this.m&&Zi(u,this.m,S)),Yi(this.h,T),this.Ua&&ee(u,"TYPE","init"),this.P?(ee(u,"$req",l),ee(u,"SID","null"),T.T=!0,Ki(T,u,null)):Ki(T,u,l),this.G=2}}else this.G==3&&(s?co(this,s):this.i.length==0||qa(this.h)||co(this))};function co(s,l){var u;l?u=l.l:u=s.U++;const f=ze(s.I);ee(f,"SID",s.K),ee(f,"RID",u),ee(f,"AID",s.T),kn(s,f),s.m&&s.o&&Zi(f,s.m,s.o),u=new it(s,s.j,u,s.B+1),s.m===null&&(u.H=s.o),l&&(s.i=l.D.concat(s.i)),l=uo(s,u,1e3),u.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Yi(s.h,u),Ki(u,f,l)}function kn(s,l){s.H&&K(s.H,function(u,f){ee(l,f,u)}),s.l&&Wa({},function(u,f){ee(l,f,u)})}function uo(s,l,u){u=Math.min(s.i.length,u);var f=s.l?w(s.l.Na,s.l,s):null;e:{var T=s.i;let S=-1;for(;;){const D=["count="+u];S==-1?0<u?(S=T[0].g,D.push("ofs="+S)):S=0:D.push("ofs="+S);let Q=!0;for(let he=0;he<u;he++){let G=T[he].g;const ve=T[he].map;if(G-=S,0>G)S=Math.max(0,T[he].g-100),Q=!1;else try{cd(ve,D,"req"+G+"_")}catch{f&&f(ve)}}if(Q){f=D.join("&");break e}}}return s=s.i.splice(0,u),l.D=s,f}function ho(s){if(!s.g&&!s.u){s.Y=1;var l=s.Fa;tt||gn(),nt||(tt(),nt=!0),Ut.add(l,s),s.v=0}}function ts(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=En(w(s.Fa,s),mo(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,fo(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=En(w(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Re(10),Ar(this),fo(this))};function ns(s){s.A!=null&&(c.clearTimeout(s.A),s.A=null)}function fo(s){s.g=new it(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var l=ze(s.qa);ee(l,"RID","rpc"),ee(l,"SID",s.K),ee(l,"AID",s.T),ee(l,"CI",s.F?"0":"1"),!s.F&&s.ja&&ee(l,"TO",s.ja),ee(l,"TYPE","xmlhttp"),kn(s,l),s.m&&s.o&&Zi(l,s.m,s.o),s.L&&(s.g.I=s.L);var u=s.g;s=s.ia,u.L=1,u.v=wr(ze(l)),u.m=null,u.P=!0,Ua(u,s)}n.Za=function(){this.C!=null&&(this.C=null,Ar(this),ts(this),Re(19))};function Rr(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function po(s,l){var u=null;if(s.g==l){Rr(s),ns(s),s.g=null;var f=2}else if(Xi(s.h,l))u=l.D,za(s.h,l),f=1;else return;if(s.G!=0){if(l.o)if(f==1){u=l.m?l.m.length:0,l=Date.now()-l.F;var T=s.B;f=mr(),Se(f,new Va(f,u)),Sr(s)}else ho(s);else if(T=l.s,T==3||T==0&&0<l.X||!(f==1&&fd(s,l)||f==2&&ts(s)))switch(u&&0<u.length&&(l=s.h,l.i=l.i.concat(u)),T){case 1:Rt(s,5);break;case 4:Rt(s,10);break;case 3:Rt(s,6);break;default:Rt(s,2)}}}function mo(s,l){let u=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(u*=2),u*l}function Rt(s,l){if(s.j.info("Error code "+l),l==2){var u=w(s.fb,s),f=s.Xa;const T=!f;f=new St(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||_r(f,"https"),wr(f),T?ad(f.toString(),u):od(f.toString(),u)}else Re(2);s.G=0,s.l&&s.l.sa(l),go(s),lo(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),Re(2)):(this.j.info("Failed to ping google.com"),Re(1))};function go(s){if(s.G=0,s.ka=[],s.l){const l=Ga(s.h);(l.length!=0||s.i.length!=0)&&(O(s.ka,l),O(s.ka,s.i),s.h.i.length=0,M(s.i),s.i.length=0),s.l.ra()}}function yo(s,l,u){var f=u instanceof St?ze(u):new St(u);if(f.g!="")l&&(f.g=l+"."+f.g),Er(f,f.s);else{var T=c.location;f=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var S=new St(null);f&&_r(S,f),l&&(S.g=l),T&&Er(S,T),u&&(S.l=u),f=S}return u=s.D,l=s.ya,u&&l&&ee(f,u,l),ee(f,"VER",s.la),kn(s,f),f}function vo(s,l,u){if(l&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=s.Ca&&!s.pa?new re(new br({eb:u})):new re(s.pa),l.Ha(s.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function _o(){}n=_o.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Pr(){}Pr.prototype.g=function(s,l){return new Ce(s,l)};function Ce(s,l){ye.call(this),this.g=new oo(l),this.l=s,this.h=l&&l.messageUrlParams||null,s=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(s?s["X-WebChannel-Content-Type"]=l.messageContentType:s={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(s?s["X-WebChannel-Client-Profile"]=l.va:s={"X-WebChannel-Client-Profile":l.va}),this.g.S=s,(s=l&&l.Sb)&&!V(s)&&(this.g.m=s),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!V(l)&&(this.g.D=l,s=this.h,s!==null&&l in s&&(s=this.h,l in s&&delete s[l])),this.j=new Bt(this)}N(Ce,ye),Ce.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ce.prototype.close=function(){es(this.g)},Ce.prototype.o=function(s){var l=this.g;if(typeof s=="string"){var u={};u.__data__=s,s=u}else this.u&&(u={},u.__data__=Bi(s),s=u);l.i.push(new Qu(l.Ya++,s)),l.G==3&&Sr(l)},Ce.prototype.N=function(){this.g.l=null,delete this.j,es(this.g),delete this.g,Ce.aa.N.call(this)};function Eo(s){Hi.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var l=s.__sm__;if(l){e:{for(const u in l){s=u;break e}s=void 0}(this.i=s)&&(s=this.i,l=l!==null&&s in l?l[s]:void 0),this.data=l}else this.data=s}N(Eo,Hi);function wo(){zi.call(this),this.status=1}N(wo,zi);function Bt(s){this.g=s}N(Bt,_o),Bt.prototype.ua=function(){Se(this.g,"a")},Bt.prototype.ta=function(s){Se(this.g,new Eo(s))},Bt.prototype.sa=function(s){Se(this.g,new wo)},Bt.prototype.ra=function(){Se(this.g,"b")},Pr.prototype.createWebChannel=Pr.prototype.g,Ce.prototype.send=Ce.prototype.o,Ce.prototype.open=Ce.prototype.m,Ce.prototype.close=Ce.prototype.close,Ac=function(){return new Pr},Tc=function(){return mr()},Ic=Tt,Is={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},gr.NO_ERROR=0,gr.TIMEOUT=8,gr.HTTP_ERROR=6,Hr=gr,Ma.COMPLETE="complete",bc=Ma,Na.EventType=vn,vn.OPEN="a",vn.CLOSE="b",vn.ERROR="c",vn.MESSAGE="d",ye.prototype.listen=ye.prototype.K,Ln=Na,re.prototype.listenOnce=re.prototype.L,re.prototype.getLastError=re.prototype.Ka,re.prototype.getLastErrorCode=re.prototype.Ba,re.prototype.getStatus=re.prototype.Z,re.prototype.getResponseJson=re.prototype.Oa,re.prototype.getResponseText=re.prototype.oa,re.prototype.send=re.prototype.ea,re.prototype.setWithCredentials=re.prototype.Ha,wc=re}).apply(typeof Nr!="undefined"?Nr:typeof self!="undefined"?self:typeof window!="undefined"?window:{});const Zo="@firebase/firestore";/**
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
 */class we{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}we.UNAUTHENTICATED=new we(null),we.GOOGLE_CREDENTIALS=new we("google-credentials-uid"),we.FIRST_PARTY=new we("first-party-uid"),we.MOCK_USER=new we("mock-user");/**
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
 */let fn="10.14.0";/**
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
 */const Lt=new xs("@firebase/firestore");function Cn(){return Lt.logLevel}function x(n,...e){if(Lt.logLevel<=q.DEBUG){const t=e.map(Qs);Lt.debug(`Firestore (${fn}): ${n}`,...t)}}function Vt(n,...e){if(Lt.logLevel<=q.ERROR){const t=e.map(Qs);Lt.error(`Firestore (${fn}): ${n}`,...t)}}function ii(n,...e){if(Lt.logLevel<=q.WARN){const t=e.map(Qs);Lt.warn(`Firestore (${fn}): ${n}`,...t)}}function Qs(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function H(n="Unexpected state"){const e=`FIRESTORE (${fn}) INTERNAL ASSERTION FAILED: `+n;throw Vt(e),new Error(e)}function ae(n,e){n||H()}function Z(n,e){return n}/**
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
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends Ze{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Ct{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Sc{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class om{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(we.UNAUTHENTICATED))}shutdown(){}}class lm{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class cm{constructor(e){this.t=e,this.currentUser=we.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ae(this.o===void 0);let r=this.i;const i=d=>this.i!==r?(r=this.i,t(d)):Promise.resolve();let a=new Ct;this.o=()=>{this.i++,this.currentUser=this.u(),a.resolve(),a=new Ct,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const d=a;e.enqueueRetryable(async()=>{await d.promise,await i(this.currentUser)})},c=d=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(d=>c(d)),setTimeout(()=>{if(!this.auth){const d=this.t.getImmediate({optional:!0});d?c(d):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),a.resolve(),a=new Ct)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ae(typeof r.accessToken=="string"),new Sc(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ae(e===null||typeof e=="string"),new we(e)}}class um{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=we.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class dm{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new um(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(we.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class hm{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class fm{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){ae(this.o===void 0);const r=a=>{a.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${a.error.message}`);const o=a.token!==this.R;return this.R=a.token,x("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(a.token):Promise.resolve()};this.o=a=>{e.enqueueRetryable(()=>r(a))};const i=a=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=a,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(a=>i(a)),setTimeout(()=>{if(!this.appCheck){const a=this.A.getImmediate({optional:!0});a?i(a):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ae(typeof t.token=="string"),this.R=t.token,new hm(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pm(n){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class Rc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=pm(40);for(let a=0;a<i.length;++a)r.length<20&&i[a]<t&&(r+=e.charAt(i[a]%e.length))}return r}}function Y(n,e){return n<e?-1:n>e?1:0}function rn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
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
 */class de{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new U(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return de.fromMillis(Date.now())}static fromDate(e){return de.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new de(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Y(this.nanoseconds,e.nanoseconds):Y(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class te{constructor(e){this.timestamp=e}static fromTimestamp(e){return new te(e)}static min(){return new te(new de(0,0))}static max(){return new te(new de(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class zn{constructor(e,t,r){t===void 0?t=0:t>e.length&&H(),r===void 0?r=e.length-t:r>e.length-t&&H(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return zn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof zn?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const a=e.get(i),o=t.get(i);if(a<o)return-1;if(a>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ie extends zn{construct(e,t,r){return new ie(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new ie(t)}static emptyPath(){return new ie([])}}const mm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class me extends zn{construct(e,t,r){return new me(e,t,r)}static isValidIdentifier(e){return mm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),me.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new me(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const a=()=>{if(r.length===0)throw new U(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new U(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const d=e[i+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new U(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=d,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(a(),i++)}if(a(),o)throw new U(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new me(t)}static emptyPath(){return new me([])}}/**
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
 */class B{constructor(e){this.path=e}static fromPath(e){return new B(ie.fromString(e))}static fromName(e){return new B(ie.fromString(e).popFirst(5))}static empty(){return new B(ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new B(new ie(e.slice()))}}function gm(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=te.fromTimestamp(r===1e9?new de(t+1,0):new de(t,r));return new _t(i,B.empty(),e)}function ym(n){return new _t(n.readTime,n.key,-1)}class _t{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new _t(te.min(),B.empty(),-1)}static max(){return new _t(te.max(),B.empty(),-1)}}function vm(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=B.comparator(n.documentKey,e.documentKey),t!==0?t:Y(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _m="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Em{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Pc(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==_m)throw n;x("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class k{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&H(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new k((r,i)=>{this.nextCallback=a=>{this.wrapSuccess(e,a).next(r,i)},this.catchCallback=a=>{this.wrapFailure(t,a).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof k?t:k.resolve(t)}catch(t){return k.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):k.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):k.reject(t)}static resolve(e){return new k((t,r)=>{t(e)})}static reject(e){return new k((t,r)=>{r(e)})}static waitFor(e){return new k((t,r)=>{let i=0,a=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++a,o&&a===i&&t()},d=>r(d))}),o=!0,a===i&&t()})}static or(e){let t=k.resolve(!1);for(const r of e)t=t.next(i=>i?k.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,a)=>{r.push(t.call(this,i,a))}),this.waitFor(r)}static mapArray(e,t){return new k((r,i)=>{const a=e.length,o=new Array(a);let c=0;for(let d=0;d<a;d++){const h=d;t(e[h]).next(y=>{o[h]=y,++c,c===a&&r(o)},y=>i(y))}})}static doWhile(e,t){return new k((r,i)=>{const a=()=>{e()===!0?t().next(()=>{a()},i):r()};a()})}}function wm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function _i(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class kc{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}kc.oe=-1;function Xs(n){return n==null}function si(n){return n===0&&1/n==-1/0}function bm(n){return typeof n=="number"&&Number.isInteger(n)&&!si(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */function el(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function pn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Cc(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class ke{constructor(e,t){this.comparator=e,this.root=t||fe.EMPTY}insert(e,t){return new ke(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,fe.BLACK,null,null))}remove(e){return new ke(this.comparator,this.root.remove(e,this.comparator).copy(null,null,fe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Dr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Dr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Dr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Dr(this.root,e,this.comparator,!0)}}class Dr{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let a=1;for(;!e.isEmpty();)if(a=t?r(e.key,t):1,t&&i&&(a*=-1),a<0)e=this.isReverse?e.left:e.right;else{if(a===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class fe{constructor(e,t,r,i,a){this.key=e,this.value=t,this.color=r!=null?r:fe.RED,this.left=i!=null?i:fe.EMPTY,this.right=a!=null?a:fe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,a){return new fe(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,a!=null?a:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const a=r(e,i.key);return i=a<0?i.copy(null,null,null,i.left.insert(e,t,r),null):a===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return fe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return fe.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,fe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,fe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw H();const e=this.left.check();if(e!==this.right.check())throw H();return e+(this.isRed()?0:1)}}fe.EMPTY=null,fe.RED=!0,fe.BLACK=!1;fe.EMPTY=new class{constructor(){this.size=0}get key(){throw H()}get value(){throw H()}get color(){throw H()}get left(){throw H()}get right(){throw H()}copy(e,t,r,i,a){return this}insert(e,t,r){return new fe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ie{constructor(e){this.comparator=e,this.data=new ke(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new tl(this.data.getIterator())}getIteratorFrom(e){return new tl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ie)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,a=r.getNext().key;if(this.comparator(i,a)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ie(this.comparator);return t.data=e,t}}class tl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.fields=e,e.sort(me.comparator)}static empty(){return new De([])}unionWith(e){let t=new Ie(me.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new De(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return rn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Im extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(a){throw typeof DOMException!="undefined"&&a instanceof DOMException?new Im("Invalid base64 string: "+a):a}}(e);return new qe(t)}static fromUint8Array(e){const t=function(i){let a="";for(let o=0;o<i.length;++o)a+=String.fromCharCode(i[o]);return a}(e);return new qe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Y(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}qe.EMPTY_BYTE_STRING=new qe("");const Tm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Mt(n){if(ae(!!n),typeof n=="string"){let e=0;const t=Tm.exec(n);if(ae(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:pe(n.seconds),nanos:pe(n.nanos)}}function pe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Gn(n){return typeof n=="string"?qe.fromBase64String(n):qe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ys(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Nc(n){const e=n.mapValue.fields.__previous_value__;return Ys(e)?Nc(e):e}function ai(n){const e=Mt(n.mapValue.fields.__local_write_time__.timestampValue);return new de(e.seconds,e.nanos)}/**
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
 */class Am{constructor(e,t,r,i,a,o,c,d,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=a,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=d,this.useFetchStreams=h}}class oi{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new oi("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof oi&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or={mapValue:{}};function sn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ys(n)?4:Rm(n)?9007199254740991:Sm(n)?10:11:H()}function He(n,e){if(n===e)return!0;const t=sn(n);if(t!==sn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ai(n).isEqual(ai(e));case 3:return function(i,a){if(typeof i.timestampValue=="string"&&typeof a.timestampValue=="string"&&i.timestampValue.length===a.timestampValue.length)return i.timestampValue===a.timestampValue;const o=Mt(i.timestampValue),c=Mt(a.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,a){return Gn(i.bytesValue).isEqual(Gn(a.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,a){return pe(i.geoPointValue.latitude)===pe(a.geoPointValue.latitude)&&pe(i.geoPointValue.longitude)===pe(a.geoPointValue.longitude)}(n,e);case 2:return function(i,a){if("integerValue"in i&&"integerValue"in a)return pe(i.integerValue)===pe(a.integerValue);if("doubleValue"in i&&"doubleValue"in a){const o=pe(i.doubleValue),c=pe(a.doubleValue);return o===c?si(o)===si(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return rn(n.arrayValue.values||[],e.arrayValue.values||[],He);case 10:case 11:return function(i,a){const o=i.mapValue.fields||{},c=a.mapValue.fields||{};if(el(o)!==el(c))return!1;for(const d in o)if(o.hasOwnProperty(d)&&(c[d]===void 0||!He(o[d],c[d])))return!1;return!0}(n,e);default:return H()}}function Wn(n,e){return(n.values||[]).find(t=>He(t,e))!==void 0}function an(n,e){if(n===e)return 0;const t=sn(n),r=sn(e);if(t!==r)return Y(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Y(n.booleanValue,e.booleanValue);case 2:return function(a,o){const c=pe(a.integerValue||a.doubleValue),d=pe(o.integerValue||o.doubleValue);return c<d?-1:c>d?1:c===d?0:isNaN(c)?isNaN(d)?0:-1:1}(n,e);case 3:return nl(n.timestampValue,e.timestampValue);case 4:return nl(ai(n),ai(e));case 5:return Y(n.stringValue,e.stringValue);case 6:return function(a,o){const c=Gn(a),d=Gn(o);return c.compareTo(d)}(n.bytesValue,e.bytesValue);case 7:return function(a,o){const c=a.split("/"),d=o.split("/");for(let h=0;h<c.length&&h<d.length;h++){const y=Y(c[h],d[h]);if(y!==0)return y}return Y(c.length,d.length)}(n.referenceValue,e.referenceValue);case 8:return function(a,o){const c=Y(pe(a.latitude),pe(o.latitude));return c!==0?c:Y(pe(a.longitude),pe(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return rl(n.arrayValue,e.arrayValue);case 10:return function(a,o){var c,d,h,y;const v=a.fields||{},w=o.fields||{},P=(c=v.value)===null||c===void 0?void 0:c.arrayValue,N=(d=w.value)===null||d===void 0?void 0:d.arrayValue,M=Y(((h=P==null?void 0:P.values)===null||h===void 0?void 0:h.length)||0,((y=N==null?void 0:N.values)===null||y===void 0?void 0:y.length)||0);return M!==0?M:rl(P,N)}(n.mapValue,e.mapValue);case 11:return function(a,o){if(a===Or.mapValue&&o===Or.mapValue)return 0;if(a===Or.mapValue)return 1;if(o===Or.mapValue)return-1;const c=a.fields||{},d=Object.keys(c),h=o.fields||{},y=Object.keys(h);d.sort(),y.sort();for(let v=0;v<d.length&&v<y.length;++v){const w=Y(d[v],y[v]);if(w!==0)return w;const P=an(c[d[v]],h[y[v]]);if(P!==0)return P}return Y(d.length,y.length)}(n.mapValue,e.mapValue);default:throw H()}}function nl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Y(n,e);const t=Mt(n),r=Mt(e),i=Y(t.seconds,r.seconds);return i!==0?i:Y(t.nanos,r.nanos)}function rl(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const a=an(t[i],r[i]);if(a)return a}return Y(t.length,r.length)}function on(n){return Ts(n)}function Ts(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Mt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Gn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return B.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const a of t.values||[])i?i=!1:r+=",",r+=Ts(a);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",a=!0;for(const o of r)a?a=!1:i+=",",i+=`${o}:${Ts(t.fields[o])}`;return i+"}"}(n.mapValue):H()}function As(n){return!!n&&"integerValue"in n}function Zs(n){return!!n&&"arrayValue"in n}function zr(n){return!!n&&"mapValue"in n}function Sm(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function xn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return pn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=xn(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=xn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Rm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class Ne{constructor(e){this.value=e}static empty(){return new Ne({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!zr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=xn(t)}setAll(e){let t=me.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const d=this.getFieldsMap(t);this.applyChanges(d,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=xn(o):i.push(c.lastSegment())});const a=this.getFieldsMap(t);this.applyChanges(a,r,i)}delete(e){const t=this.field(e.popLast());zr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return He(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];zr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){pn(t,(i,a)=>e[i]=a);for(const i of r)delete e[i]}clone(){return new Ne(xn(this.value))}}function Dc(n){const e=[];return pn(n.fields,(t,r)=>{const i=new me([t]);if(zr(r)){const a=Dc(r.mapValue).fields;if(a.length===0)e.push(i);else for(const o of a)e.push(i.child(o))}else e.push(i)}),new De(e)}/**
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
 */class $e{constructor(e,t,r,i,a,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=a,this.data=o,this.documentState=c}static newInvalidDocument(e){return new $e(e,0,te.min(),te.min(),te.min(),Ne.empty(),0)}static newFoundDocument(e,t,r,i){return new $e(e,1,t,te.min(),r,i,0)}static newNoDocument(e,t){return new $e(e,2,t,te.min(),te.min(),Ne.empty(),0)}static newUnknownDocument(e,t){return new $e(e,3,t,te.min(),te.min(),Ne.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(te.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ne.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ne.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=te.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof $e&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new $e(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class li{constructor(e,t){this.position=e,this.inclusive=t}}function il(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const a=e[i],o=n.position[i];if(a.field.isKeyField()?r=B.comparator(B.fromName(o.referenceValue),t.key):r=an(o,t.data.field(a.field)),a.dir==="desc"&&(r*=-1),r!==0)break}return r}function sl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!He(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class ci{constructor(e,t="asc"){this.field=e,this.dir=t}}function Pm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Oc{}class ue extends Oc{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Cm(e,t,r):t==="array-contains"?new Om(e,r):t==="in"?new Lm(e,r):t==="not-in"?new Vm(e,r):t==="array-contains-any"?new Mm(e,r):new ue(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Nm(e,r):new Dm(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(an(t,this.value)):t!==null&&sn(this.value)===sn(t)&&this.matchesComparison(an(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return H()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Et extends Oc{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new Et(e,t)}matches(e){return Lc(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Lc(n){return n.op==="and"}function Vc(n){return km(n)&&Lc(n)}function km(n){for(const e of n.filters)if(e instanceof Et)return!1;return!0}function Ss(n){if(n instanceof ue)return n.field.canonicalString()+n.op.toString()+on(n.value);if(Vc(n))return n.filters.map(e=>Ss(e)).join(",");{const e=n.filters.map(t=>Ss(t)).join(",");return`${n.op}(${e})`}}function Mc(n,e){return n instanceof ue?function(r,i){return i instanceof ue&&r.op===i.op&&r.field.isEqual(i.field)&&He(r.value,i.value)}(n,e):n instanceof Et?function(r,i){return i instanceof Et&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((a,o,c)=>a&&Mc(o,i.filters[c]),!0):!1}(n,e):void H()}function $c(n){return n instanceof ue?function(t){return`${t.field.canonicalString()} ${t.op} ${on(t.value)}`}(n):n instanceof Et?function(t){return t.op.toString()+" {"+t.getFilters().map($c).join(" ,")+"}"}(n):"Filter"}class Cm extends ue{constructor(e,t,r){super(e,t,r),this.key=B.fromName(r.referenceValue)}matches(e){const t=B.comparator(e.key,this.key);return this.matchesComparison(t)}}class Nm extends ue{constructor(e,t){super(e,"in",t),this.keys=xc("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Dm extends ue{constructor(e,t){super(e,"not-in",t),this.keys=xc("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function xc(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>B.fromName(r.referenceValue))}class Om extends ue{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Zs(t)&&Wn(t.arrayValue,this.value)}}class Lm extends ue{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Wn(this.value.arrayValue,t)}}class Vm extends ue{constructor(e,t){super(e,"not-in",t)}matches(e){if(Wn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Wn(this.value.arrayValue,t)}}class Mm extends ue{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Zs(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Wn(this.value.arrayValue,r))}}/**
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
 */class $m{constructor(e,t=null,r=[],i=[],a=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=a,this.startAt=o,this.endAt=c,this.ue=null}}function al(n,e=null,t=[],r=[],i=null,a=null,o=null){return new $m(n,e,t,r,i,a,o)}function ea(n){const e=Z(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ss(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(a){return a.field.canonicalString()+a.dir}(r)).join(","),Xs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>on(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>on(r)).join(",")),e.ue=t}return e.ue}function ta(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Pm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Mc(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!sl(n.startAt,e.startAt)&&sl(n.endAt,e.endAt)}/**
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
 */class Ei{constructor(e,t=null,r=[],i=[],a=null,o="F",c=null,d=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=a,this.limitType=o,this.startAt=c,this.endAt=d,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function xm(n,e,t,r,i,a,o,c){return new Ei(n,e,t,r,i,a,o,c)}function Um(n){return new Ei(n)}function ol(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Fm(n){return n.collectionGroup!==null}function Un(n){const e=Z(n);if(e.ce===null){e.ce=[];const t=new Set;for(const a of e.explicitOrderBy)e.ce.push(a),t.add(a.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Ie(me.comparator);return o.filters.forEach(d=>{d.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(a=>{t.has(a.canonicalString())||a.isKeyField()||e.ce.push(new ci(a,r))}),t.has(me.keyField().canonicalString())||e.ce.push(new ci(me.keyField(),r))}return e.ce}function Nt(n){const e=Z(n);return e.le||(e.le=jm(e,Un(n))),e.le}function jm(n,e){if(n.limitType==="F")return al(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const a=i.dir==="desc"?"asc":"desc";return new ci(i.field,a)});const t=n.endAt?new li(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new li(n.startAt.position,n.startAt.inclusive):null;return al(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Rs(n,e,t){return new Ei(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Uc(n,e){return ta(Nt(n),Nt(e))&&n.limitType===e.limitType}function Fc(n){return`${ea(Nt(n))}|lt:${n.limitType}`}function Nn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>$c(i)).join(", ")}]`),Xs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>on(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>on(i)).join(",")),`Target(${r})`}(Nt(n))}; limitType=${n.limitType})`}function na(n,e){return e.isFoundDocument()&&function(r,i){const a=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(a):B.isDocumentKey(r.path)?r.path.isEqual(a):r.path.isImmediateParentOf(a)}(n,e)&&function(r,i){for(const a of Un(r))if(!a.field.isKeyField()&&i.data.field(a.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const a of r.filters)if(!a.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,d){const h=il(o,c,d);return o.inclusive?h<=0:h<0}(r.startAt,Un(r),i)||r.endAt&&!function(o,c,d){const h=il(o,c,d);return o.inclusive?h>=0:h>0}(r.endAt,Un(r),i))}(n,e)}function Bm(n){return(e,t)=>{let r=!1;for(const i of Un(n)){const a=qm(i,e,t);if(a!==0)return a;r=r||i.field.isKeyField()}return 0}}function qm(n,e,t){const r=n.field.isKeyField()?B.comparator(e.key,t.key):function(a,o,c){const d=o.data.field(a),h=c.data.field(a);return d!==null&&h!==null?an(d,h):H()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return H()}}/**
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
 */class mn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,a]of r)if(this.equalsFn(i,e))return a}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let a=0;a<i.length;a++)if(this.equalsFn(i[a][0],e))return void(i[a]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){pn(this.inner,(t,r)=>{for(const[i,a]of r)e(i,a)})}isEmpty(){return Cc(this.inner)}size(){return this.innerSize}}/**
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
 */const Hm=new ke(B.comparator);function ui(){return Hm}const jc=new ke(B.comparator);function Lr(...n){let e=jc;for(const t of n)e=e.insert(t.key,t);return e}function Bc(n){let e=jc;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function kt(){return Fn()}function qc(){return Fn()}function Fn(){return new mn(n=>n.toString(),(n,e)=>n.isEqual(e))}const zm=new ke(B.comparator),Gm=new Ie(B.comparator);function be(...n){let e=Gm;for(const t of n)e=e.add(t);return e}const Wm=new Ie(Y);function Km(){return Wm}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ra(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:si(e)?"-0":e}}function Hc(n){return{integerValue:""+n}}function Jm(n,e){return bm(e)?Hc(e):ra(n,e)}/**
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
 */class wi{constructor(){this._=void 0}}function Qm(n,e,t){return n instanceof Kn?function(i,a){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return a&&Ys(a)&&(a=Nc(a)),a&&(o.fields.__previous_value__=a),{mapValue:o}}(t,e):n instanceof Jn?Gc(n,e):n instanceof Qn?Wc(n,e):function(i,a){const o=zc(i,a),c=ll(o)+ll(i.Pe);return As(o)&&As(i.Pe)?Hc(c):ra(i.serializer,c)}(n,e)}function Xm(n,e,t){return n instanceof Jn?Gc(n,e):n instanceof Qn?Wc(n,e):t}function zc(n,e){return n instanceof di?function(r){return As(r)||function(a){return!!a&&"doubleValue"in a}(r)}(e)?e:{integerValue:0}:null}class Kn extends wi{}class Jn extends wi{constructor(e){super(),this.elements=e}}function Gc(n,e){const t=Kc(e);for(const r of n.elements)t.some(i=>He(i,r))||t.push(r);return{arrayValue:{values:t}}}class Qn extends wi{constructor(e){super(),this.elements=e}}function Wc(n,e){let t=Kc(e);for(const r of n.elements)t=t.filter(i=>!He(i,r));return{arrayValue:{values:t}}}class di extends wi{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function ll(n){return pe(n.integerValue||n.doubleValue)}function Kc(n){return Zs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class Ym{constructor(e,t){this.field=e,this.transform=t}}function Zm(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Jn&&i instanceof Jn||r instanceof Qn&&i instanceof Qn?rn(r.elements,i.elements,He):r instanceof di&&i instanceof di?He(r.Pe,i.Pe):r instanceof Kn&&i instanceof Kn}(n.transform,e.transform)}class eg{constructor(e,t){this.version=e,this.transformResults=t}}class xe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new xe}static exists(e){return new xe(void 0,e)}static updateTime(e){return new xe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Gr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class bi{}function Jc(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ia(n.key,xe.none()):new ir(n.key,n.data,xe.none());{const t=n.data,r=Ne.empty();let i=new Ie(me.comparator);for(let a of e.fields)if(!i.has(a)){let o=t.field(a);o===null&&a.length>1&&(a=a.popLast(),o=t.field(a)),o===null?r.delete(a):r.set(a,o),i=i.add(a)}return new It(n.key,r,new De(i.toArray()),xe.none())}}function tg(n,e,t){n instanceof ir?function(i,a,o){const c=i.value.clone(),d=ul(i.fieldTransforms,a,o.transformResults);c.setAll(d),a.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof It?function(i,a,o){if(!Gr(i.precondition,a))return void a.convertToUnknownDocument(o.version);const c=ul(i.fieldTransforms,a,o.transformResults),d=a.data;d.setAll(Qc(i)),d.setAll(c),a.convertToFoundDocument(o.version,d).setHasCommittedMutations()}(n,e,t):function(i,a,o){a.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function jn(n,e,t,r){return n instanceof ir?function(a,o,c,d){if(!Gr(a.precondition,o))return c;const h=a.value.clone(),y=dl(a.fieldTransforms,d,o);return h.setAll(y),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof It?function(a,o,c,d){if(!Gr(a.precondition,o))return c;const h=dl(a.fieldTransforms,d,o),y=o.data;return y.setAll(Qc(a)),y.setAll(h),o.convertToFoundDocument(o.version,y).setHasLocalMutations(),c===null?null:c.unionWith(a.fieldMask.fields).unionWith(a.fieldTransforms.map(v=>v.field))}(n,e,t,r):function(a,o,c){return Gr(a.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function ng(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),a=zc(r.transform,i||null);a!=null&&(t===null&&(t=Ne.empty()),t.set(r.field,a))}return t||null}function cl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&rn(r,i,(a,o)=>Zm(a,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ir extends bi{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class It extends bi{constructor(e,t,r,i,a=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=a,this.type=1}getFieldMask(){return this.fieldMask}}function Qc(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function ul(n,e,t){const r=new Map;ae(n.length===t.length);for(let i=0;i<t.length;i++){const a=n[i],o=a.transform,c=e.data.field(a.field);r.set(a.field,Xm(o,c,t[i]))}return r}function dl(n,e,t){const r=new Map;for(const i of n){const a=i.transform,o=t.data.field(i.field);r.set(i.field,Qm(a,o,e))}return r}class ia extends bi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class rg extends bi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class ig{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const a=this.mutations[i];a.key.isEqual(e.key)&&tg(a,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=jn(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=jn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=qc();return this.mutations.forEach(i=>{const a=e.get(i.key),o=a.overlayedDocument;let c=this.applyToLocalView(o,a.mutatedFields);c=t.has(i.key)?null:c;const d=Jc(o,c);d!==null&&r.set(i.key,d),o.isValidDocument()||o.convertToNoDocument(te.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),be())}isEqual(e){return this.batchId===e.batchId&&rn(this.mutations,e.mutations,(t,r)=>cl(t,r))&&rn(this.baseMutations,e.baseMutations,(t,r)=>cl(t,r))}}class sa{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){ae(e.mutations.length===r.length);let i=function(){return zm}();const a=e.mutations;for(let o=0;o<a.length;o++)i=i.insert(a[o].key,r[o].version);return new sa(e,t,r,i)}}/**
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
 */class sg{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */var le,z;function ag(n){switch(n){default:return H();case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0}}function og(n){if(n===void 0)return Vt("GRPC error has no .code"),C.UNKNOWN;switch(n){case le.OK:return C.OK;case le.CANCELLED:return C.CANCELLED;case le.UNKNOWN:return C.UNKNOWN;case le.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case le.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case le.INTERNAL:return C.INTERNAL;case le.UNAVAILABLE:return C.UNAVAILABLE;case le.UNAUTHENTICATED:return C.UNAUTHENTICATED;case le.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case le.NOT_FOUND:return C.NOT_FOUND;case le.ALREADY_EXISTS:return C.ALREADY_EXISTS;case le.PERMISSION_DENIED:return C.PERMISSION_DENIED;case le.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case le.ABORTED:return C.ABORTED;case le.OUT_OF_RANGE:return C.OUT_OF_RANGE;case le.UNIMPLEMENTED:return C.UNIMPLEMENTED;case le.DATA_LOSS:return C.DATA_LOSS;default:return H()}}(z=le||(le={}))[z.OK=0]="OK",z[z.CANCELLED=1]="CANCELLED",z[z.UNKNOWN=2]="UNKNOWN",z[z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",z[z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",z[z.NOT_FOUND=5]="NOT_FOUND",z[z.ALREADY_EXISTS=6]="ALREADY_EXISTS",z[z.PERMISSION_DENIED=7]="PERMISSION_DENIED",z[z.UNAUTHENTICATED=16]="UNAUTHENTICATED",z[z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",z[z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",z[z.ABORTED=10]="ABORTED",z[z.OUT_OF_RANGE=11]="OUT_OF_RANGE",z[z.UNIMPLEMENTED=12]="UNIMPLEMENTED",z[z.INTERNAL=13]="INTERNAL",z[z.UNAVAILABLE=14]="UNAVAILABLE",z[z.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new Ec([4294967295,4294967295],0);class lg{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ps(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function cg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function ug(n,e){return Ps(n,e.toTimestamp())}function en(n){return ae(!!n),te.fromTimestamp(function(t){const r=Mt(t);return new de(r.seconds,r.nanos)}(n))}function Xc(n,e){return ks(n,e).canonicalString()}function ks(n,e){const t=function(i){return new ie(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function dg(n){const e=ie.fromString(n);return ae(_g(e)),e}function Cs(n,e){return Xc(n.databaseId,e.path)}function hg(n){const e=dg(n);return e.length===4?ie.emptyPath():pg(e)}function fg(n){return new ie(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function pg(n){return ae(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function hl(n,e,t){return{name:Cs(n,e),fields:t.value.mapValue.fields}}function mg(n,e){let t;if(e instanceof ir)t={update:hl(n,e.key,e.value)};else if(e instanceof ia)t={delete:Cs(n,e.key)};else if(e instanceof It)t={update:hl(n,e.key,e.data),updateMask:vg(e.fieldMask)};else{if(!(e instanceof rg))return H();t={verify:Cs(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(a,o){const c=o.transform;if(c instanceof Kn)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Jn)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Qn)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof di)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw H()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,a){return a.updateTime!==void 0?{updateTime:ug(i,a.updateTime)}:a.exists!==void 0?{exists:a.exists}:H()}(n,e.precondition)),t}function gg(n,e){return n&&n.length>0?(ae(e!==void 0),n.map(t=>function(i,a){let o=i.updateTime?en(i.updateTime):en(a);return o.isEqual(te.min())&&(o=en(a)),new eg(o,i.transformResults||[])}(t,e))):[]}function yg(n){let e=hg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){ae(r===1);const y=t.from[0];y.allDescendants?i=y.collectionId:e=e.child(y.collectionId)}let a=[];t.where&&(a=function(v){const w=Yc(v);return w instanceof Et&&Vc(w)?w.getFilters():[w]}(t.where));let o=[];t.orderBy&&(o=function(v){return v.map(w=>function(N){return new ci(Wt(N.field),function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(w))}(t.orderBy));let c=null;t.limit&&(c=function(v){let w;return w=typeof v=="object"?v.value:v,Xs(w)?null:w}(t.limit));let d=null;t.startAt&&(d=function(v){const w=!!v.before,P=v.values||[];return new li(P,w)}(t.startAt));let h=null;return t.endAt&&(h=function(v){const w=!v.before,P=v.values||[];return new li(P,w)}(t.endAt)),xm(e,i,o,a,c,"F",d,h)}function Yc(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Wt(t.unaryFilter.field);return ue.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Wt(t.unaryFilter.field);return ue.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const a=Wt(t.unaryFilter.field);return ue.create(a,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Wt(t.unaryFilter.field);return ue.create(o,"!=",{nullValue:"NULL_VALUE"});default:return H()}}(n):n.fieldFilter!==void 0?function(t){return ue.create(Wt(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return H()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Et.create(t.compositeFilter.filters.map(r=>Yc(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return H()}}(t.compositeFilter.op))}(n):H()}function Wt(n){return me.fromServerFormat(n.fieldPath)}function vg(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function _g(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Eg{constructor(e){this.ct=e}}function wg(n){const e=yg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Rs(e,e.limit,"L"):e}/**
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
 */class bg{constructor(){this.un=new Ig}addToCollectionParentIndex(e,t){return this.un.add(t),k.resolve()}getCollectionParents(e,t){return k.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return k.resolve()}deleteFieldIndex(e,t){return k.resolve()}deleteAllFieldIndexes(e){return k.resolve()}createTargetIndexes(e,t){return k.resolve()}getDocumentsMatchingTarget(e,t){return k.resolve(null)}getIndexType(e,t){return k.resolve(0)}getFieldIndexes(e,t){return k.resolve([])}getNextCollectionGroupToUpdate(e){return k.resolve(null)}getMinOffset(e,t){return k.resolve(_t.min())}getMinOffsetFromCollectionGroup(e,t){return k.resolve(_t.min())}updateCollectionGroup(e,t,r){return k.resolve()}updateIndexEntries(e,t){return k.resolve()}}class Ig{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Ie(ie.comparator),a=!i.has(r);return this.index[t]=i.add(r),a}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ie(ie.comparator)).toArray()}}/**
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
 */class ln{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new ln(0)}static kn(){return new ln(-1)}}/**
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
 */class Tg{constructor(){this.changes=new mn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,$e.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?k.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class Ag{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Sg{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&jn(r.mutation,i,De.empty(),de.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,be()).next(()=>r))}getLocalViewOfDocuments(e,t,r=be()){const i=kt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(a=>{let o=Lr();return a.forEach((c,d)=>{o=o.insert(c,d.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=kt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,be()))}populateOverlays(e,t,r){const i=[];return r.forEach(a=>{t.has(a)||i.push(a)}),this.documentOverlayCache.getOverlays(e,i).next(a=>{a.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let a=ui();const o=Fn(),c=function(){return Fn()}();return t.forEach((d,h)=>{const y=r.get(h.key);i.has(h.key)&&(y===void 0||y.mutation instanceof It)?a=a.insert(h.key,h):y!==void 0?(o.set(h.key,y.mutation.getFieldMask()),jn(y.mutation,h,y.mutation.getFieldMask(),de.now())):o.set(h.key,De.empty())}),this.recalculateAndSaveOverlays(e,a).next(d=>(d.forEach((h,y)=>o.set(h,y)),t.forEach((h,y)=>{var v;return c.set(h,new Ag(y,(v=o.get(h))!==null&&v!==void 0?v:null))}),c))}recalculateAndSaveOverlays(e,t){const r=Fn();let i=new ke((o,c)=>o-c),a=be();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(d=>{const h=t.get(d);if(h===null)return;let y=r.get(d)||De.empty();y=c.applyToLocalView(h,y),r.set(d,y);const v=(i.get(c.batchId)||be()).add(d);i=i.insert(c.batchId,v)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const d=c.getNext(),h=d.key,y=d.value,v=qc();y.forEach(w=>{if(!a.has(w)){const P=Jc(t.get(w),r.get(w));P!==null&&v.set(w,P),a=a.add(w)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,v))}return k.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return B.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Fm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(a=>{const o=i-a.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-a.size):k.resolve(kt());let c=-1,d=a;return o.next(h=>k.forEach(h,(y,v)=>(c<v.largestBatchId&&(c=v.largestBatchId),a.get(y)?k.resolve():this.remoteDocumentCache.getEntry(e,y).next(w=>{d=d.insert(y,w)}))).next(()=>this.populateOverlays(e,h,a)).next(()=>this.computeViews(e,d,h,be())).next(y=>({batchId:c,changes:Bc(y)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new B(t)).next(r=>{let i=Lr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const a=t.collectionGroup;let o=Lr();return this.indexManager.getCollectionParents(e,a).next(c=>k.forEach(c,d=>{const h=function(v,w){return new Ei(w,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)}(t,d.child(a));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(y=>{y.forEach((v,w)=>{o=o.insert(v,w)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let a;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(a=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,a,i))).next(o=>{a.forEach((d,h)=>{const y=h.getKey();o.get(y)===null&&(o=o.insert(y,$e.newInvalidDocument(y)))});let c=Lr();return o.forEach((d,h)=>{const y=a.get(d);y!==void 0&&jn(y.mutation,h,De.empty(),de.now()),na(t,h)&&(c=c.insert(d,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return k.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:en(i.createTime)}}(t)),k.resolve()}getNamedQuery(e,t){return k.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:wg(i.bundledQuery),readTime:en(i.readTime)}}(t)),k.resolve()}}/**
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
 */class Pg{constructor(){this.overlays=new ke(B.comparator),this.Ir=new Map}getOverlay(e,t){return k.resolve(this.overlays.get(t))}getOverlays(e,t){const r=kt();return k.forEach(t,i=>this.getOverlay(e,i).next(a=>{a!==null&&r.set(i,a)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,a)=>{this.ht(e,t,a)}),k.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(a=>this.overlays=this.overlays.remove(a)),this.Ir.delete(r)),k.resolve()}getOverlaysForCollection(e,t,r){const i=kt(),a=t.length+1,o=new B(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const d=c.getNext().value,h=d.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===a&&d.largestBatchId>r&&i.set(d.getKey(),d)}return k.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let a=new ke((h,y)=>h-y);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let y=a.get(h.largestBatchId);y===null&&(y=kt(),a=a.insert(h.largestBatchId,y)),y.set(h.getKey(),h)}}const c=kt(),d=a.getIterator();for(;d.hasNext()&&(d.getNext().value.forEach((h,y)=>c.set(h,y)),!(c.size()>=i)););return k.resolve(c)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new sg(t,r));let a=this.Ir.get(t);a===void 0&&(a=be(),this.Ir.set(t,a)),this.Ir.set(t,a.add(r.key))}}/**
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
 */class kg{constructor(){this.sessionToken=qe.EMPTY_BYTE_STRING}getSessionToken(e){return k.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,k.resolve()}}/**
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
 */class aa{constructor(){this.Tr=new Ie(ce.Er),this.dr=new Ie(ce.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new ce(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new ce(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new B(new ie([])),r=new ce(t,e),i=new ce(t,e+1),a=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),a.push(o.key)}),a}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new B(new ie([])),r=new ce(t,e),i=new ce(t,e+1);let a=be();return this.dr.forEachInRange([r,i],o=>{a=a.add(o.key)}),a}containsKey(e){const t=new ce(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ce{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return B.comparator(e.key,t.key)||Y(e.wr,t.wr)}static Ar(e,t){return Y(e.wr,t.wr)||B.comparator(e.key,t.key)}}/**
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
 */class Cg{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Ie(ce.Er)}checkEmpty(e){return k.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const a=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new ig(a,t,r,i);this.mutationQueue.push(o);for(const c of i)this.br=this.br.add(new ce(c.key,a)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return k.resolve(o)}lookupMutationBatch(e,t){return k.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),a=i<0?0:i;return k.resolve(this.mutationQueue.length>a?this.mutationQueue[a]:null)}getHighestUnacknowledgedBatchId(){return k.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return k.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ce(t,0),i=new ce(t,Number.POSITIVE_INFINITY),a=[];return this.br.forEachInRange([r,i],o=>{const c=this.Dr(o.wr);a.push(c)}),k.resolve(a)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ie(Y);return t.forEach(i=>{const a=new ce(i,0),o=new ce(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([a,o],c=>{r=r.add(c.wr)})}),k.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let a=r;B.isDocumentKey(a)||(a=a.child(""));const o=new ce(new B(a),0);let c=new Ie(Y);return this.br.forEachWhile(d=>{const h=d.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(c=c.add(d.wr)),!0)},o),k.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){ae(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return k.forEach(t.mutations,i=>{const a=new ce(i.key,t.batchId);return r=r.delete(a),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new ce(t,0),i=this.br.firstAfterOrEqual(r);return k.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,k.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Ng{constructor(e){this.Mr=e,this.docs=function(){return new ke(B.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),a=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-a,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return k.resolve(r?r.document.mutableCopy():$e.newInvalidDocument(t))}getEntries(e,t){let r=ui();return t.forEach(i=>{const a=this.docs.get(i);r=r.insert(i,a?a.document.mutableCopy():$e.newInvalidDocument(i))}),k.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let a=ui();const o=t.path,c=new B(o.child("")),d=this.docs.getIteratorFrom(c);for(;d.hasNext();){const{key:h,value:{document:y}}=d.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||vm(ym(y),r)<=0||(i.has(y.key)||na(t,y))&&(a=a.insert(y.key,y.mutableCopy()))}return k.resolve(a)}getAllFromCollectionGroup(e,t,r,i){H()}Or(e,t){return k.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Dg(this)}getSize(e){return k.resolve(this.size)}}class Dg extends Tg{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),k.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class Og{constructor(e){this.persistence=e,this.Nr=new mn(t=>ea(t),ta),this.lastRemoteSnapshotVersion=te.min(),this.highestTargetId=0,this.Lr=0,this.Br=new aa,this.targetCount=0,this.kr=ln.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,i)=>t(i)),k.resolve()}getLastRemoteSnapshotVersion(e){return k.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return k.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),k.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),k.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new ln(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,k.resolve()}updateTargetData(e,t){return this.Kn(t),k.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,k.resolve()}removeTargets(e,t,r){let i=0;const a=[];return this.Nr.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Nr.delete(o),a.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),k.waitFor(a).next(()=>i)}getTargetCount(e){return k.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return k.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),k.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,a=[];return i&&t.forEach(o=>{a.push(i.markPotentiallyOrphaned(e,o))}),k.waitFor(a)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),k.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return k.resolve(r)}containsKey(e,t){return k.resolve(this.Br.containsKey(t))}}/**
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
 */class Lg{constructor(e,t){this.qr={},this.overlays={},this.Qr=new kc(0),this.Kr=!1,this.Kr=!0,this.$r=new kg,this.referenceDelegate=e(this),this.Ur=new Og(this),this.indexManager=new bg,this.remoteDocumentCache=function(i){return new Ng(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new Eg(t),this.Gr=new Rg(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Pg,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new Cg(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){x("MemoryPersistence","Starting transaction:",e);const i=new Vg(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(a=>this.referenceDelegate.jr(i).next(()=>a)).toPromise().then(a=>(i.raiseOnCommittedEvent(),a))}Hr(e,t){return k.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class Vg extends Em{constructor(e){super(),this.currentSequenceNumber=e}}class oa{constructor(e){this.persistence=e,this.Jr=new aa,this.Yr=null}static Zr(e){return new oa(e)}get Xr(){if(this.Yr)return this.Yr;throw H()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),k.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),k.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),k.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(a=>this.Xr.add(a.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return k.forEach(this.Xr,r=>{const i=B.fromPath(r);return this.ei(e,i).next(a=>{a||t.removeEntry(i,te.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return k.or([()=>k.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
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
 */class la{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=be(),i=be();for(const a of t.docChanges)switch(a.type){case 0:r=r.add(a.doc.key);break;case 1:i=i.add(a.doc.key)}return new la(e,t.fromCache,r,i)}}/**
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
 */class Mg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class $g{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Cd()?8:wm(Te())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const a={result:null};return this.Yi(e,t).next(o=>{a.result=o}).next(()=>{if(!a.result)return this.Zi(e,t,i,r).next(o=>{a.result=o})}).next(()=>{if(a.result)return;const o=new Mg;return this.Xi(e,t,o).next(c=>{if(a.result=c,this.zi)return this.es(e,t,o,c.size)})}).next(()=>a.result)}es(e,t,r,i){return r.documentReadCount<this.ji?(Cn()<=q.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",Nn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),k.resolve()):(Cn()<=q.DEBUG&&x("QueryEngine","Query:",Nn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Cn()<=q.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",Nn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Nt(t))):k.resolve())}Yi(e,t){if(ol(t))return k.resolve(null);let r=Nt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Rs(t,null,"F"),r=Nt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(a=>{const o=be(...a);return this.Ji.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(d=>{const h=this.ts(t,c);return this.ns(t,h,o,d.readTime)?this.Yi(e,Rs(t,null,"F")):this.rs(e,h,t,d)}))})))}Zi(e,t,r,i){return ol(t)||i.isEqual(te.min())?k.resolve(null):this.Ji.getDocuments(e,r).next(a=>{const o=this.ts(t,a);return this.ns(t,o,r,i)?k.resolve(null):(Cn()<=q.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Nn(t)),this.rs(e,o,t,gm(i,-1)).next(c=>c))})}ts(e,t){let r=new Ie(Bm(e));return t.forEach((i,a)=>{na(e,a)&&(r=r.add(a))}),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const a=e.limitType==="F"?t.last():t.first();return!!a&&(a.hasPendingWrites||a.version.compareTo(i)>0)}Xi(e,t,r){return Cn()<=q.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",Nn(t)),this.Ji.getDocumentsMatchingQuery(e,t,_t.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(a=>(t.forEach(o=>{a=a.insert(o.key,o)}),a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new ke(Y),this._s=new mn(a=>ea(a),ta),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Sg(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Ug(n,e,t,r){return new xg(n,e,t,r)}async function Zc(n,e){const t=Z(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(a=>(i=a,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(a=>{const o=[],c=[];let d=be();for(const h of i){o.push(h.batchId);for(const y of h.mutations)d=d.add(y.key)}for(const h of a){c.push(h.batchId);for(const y of h.mutations)d=d.add(y.key)}return t.localDocuments.getDocuments(r,d).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:c}))})})}function Fg(n,e){const t=Z(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),a=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,d,h,y){const v=h.batch,w=v.keys();let P=k.resolve();return w.forEach(N=>{P=P.next(()=>y.getEntry(d,N)).next(M=>{const O=h.docVersions.get(N);ae(O!==null),M.version.compareTo(O)<0&&(v.applyToRemoteDocument(M,h),M.isValidDocument()&&(M.setReadTime(h.commitVersion),y.addEntry(M)))})}),P.next(()=>c.mutationQueue.removeMutationBatch(d,v))}(t,r,e,a).next(()=>a.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let d=be();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(d=d.add(c.batch.mutations[h].key));return d}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function jg(n){const e=Z(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Bg(n,e){const t=Z(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}class fl{constructor(){this.activeTargetIds=Km()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class qg{constructor(){this.so=new fl,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new fl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Hg{_o(e){}shutdown(){}}/**
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
 */class pl{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){x("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){x("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Vr=null;function ds(){return Vr===null?Vr=function(){return 268435456+Math.round(2147483648*Math.random())}():Vr++,"0x"+Vr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zg={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class Gg{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const Ee="WebChannelConnection";class Wg extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),a=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${i}/databases/${a}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${a}`}get Fo(){return!1}Mo(t,r,i,a,o){const c=ds(),d=this.xo(t,r.toUriEncodedString());x("RestConnection",`Sending RPC '${t}' ${c}:`,d,i);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,a,o),this.No(t,d,h,i).then(y=>(x("RestConnection",`Received RPC '${t}' ${c}: `,y),y),y=>{throw ii("RestConnection",`RPC '${t}' ${c} failed with error: `,y,"url: ",d,"request:",i),y})}Lo(t,r,i,a,o,c){return this.Mo(t,r,i,a,o)}Oo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+fn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((a,o)=>t[o]=a),i&&i.headers.forEach((a,o)=>t[o]=a)}xo(t,r){const i=zg[t];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const a=ds();return new Promise((o,c)=>{const d=new wc;d.setWithCredentials(!0),d.listenOnce(bc.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Hr.NO_ERROR:const y=d.getResponseJson();x(Ee,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(y)),o(y);break;case Hr.TIMEOUT:x(Ee,`RPC '${e}' ${a} timed out`),c(new U(C.DEADLINE_EXCEEDED,"Request time out"));break;case Hr.HTTP_ERROR:const v=d.getStatus();if(x(Ee,`RPC '${e}' ${a} failed with status:`,v,"response text:",d.getResponseText()),v>0){let w=d.getResponseJson();Array.isArray(w)&&(w=w[0]);const P=w==null?void 0:w.error;if(P&&P.status&&P.message){const N=function(O){const A=O.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(A)>=0?A:C.UNKNOWN}(P.status);c(new U(N,P.message))}else c(new U(C.UNKNOWN,"Server responded with status "+d.getStatus()))}else c(new U(C.UNAVAILABLE,"Connection failed."));break;default:H()}}finally{x(Ee,`RPC '${e}' ${a} completed.`)}});const h=JSON.stringify(i);x(Ee,`RPC '${e}' ${a} sending request:`,i),d.send(t,"POST",h,r,15)})}Bo(e,t,r){const i=ds(),a=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Ac(),c=Tc(),d={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(d.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(d.useFetchStreams=!0),this.Oo(d.initMessageHeaders,t,r),d.encodeInitMessageHeaders=!0;const y=a.join("");x(Ee,`Creating RPC '${e}' stream ${i}: ${y}`,d);const v=o.createWebChannel(y,d);let w=!1,P=!1;const N=new Gg({Io:O=>{P?x(Ee,`Not sending because RPC '${e}' stream ${i} is closed:`,O):(w||(x(Ee,`Opening RPC '${e}' stream ${i} transport.`),v.open(),w=!0),x(Ee,`RPC '${e}' stream ${i} sending:`,O),v.send(O))},To:()=>v.close()}),M=(O,A,V)=>{O.listen(A,$=>{try{V($)}catch(j){setTimeout(()=>{throw j},0)}})};return M(v,Ln.EventType.OPEN,()=>{P||(x(Ee,`RPC '${e}' stream ${i} transport opened.`),N.yo())}),M(v,Ln.EventType.CLOSE,()=>{P||(P=!0,x(Ee,`RPC '${e}' stream ${i} transport closed`),N.So())}),M(v,Ln.EventType.ERROR,O=>{P||(P=!0,ii(Ee,`RPC '${e}' stream ${i} transport errored:`,O),N.So(new U(C.UNAVAILABLE,"The operation could not be completed")))}),M(v,Ln.EventType.MESSAGE,O=>{var A;if(!P){const V=O.data[0];ae(!!V);const $=V,j=$.error||((A=$[0])===null||A===void 0?void 0:A.error);if(j){x(Ee,`RPC '${e}' stream ${i} received error:`,j);const W=j.status;let K=function(g){const E=le[g];if(E!==void 0)return og(E)}(W),p=j.message;K===void 0&&(K=C.INTERNAL,p="Unknown error status: "+W+" with message "+j.message),P=!0,N.So(new U(K,p)),v.close()}else x(Ee,`RPC '${e}' stream ${i} received:`,V),N.bo(V)}}),M(c,Ic.STAT_EVENT,O=>{O.stat===Is.PROXY?x(Ee,`RPC '${e}' stream ${i} detected buffering proxy`):O.stat===Is.NOPROXY&&x(Ee,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{N.wo()},0),N}}function hs(){return typeof document!="undefined"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ii(n){return new lg(n,!0)}/**
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
 */class eu{constructor(e,t,r=1e3,i=1.5,a=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=a,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&x("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Kg{constructor(e,t,r,i,a,o,c,d){this.ui=e,this.Ho=r,this.Jo=i,this.connection=a,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=d,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new eu(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(Vt(t.toString()),Vt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===t&&this.P_(r,i)},r=>{e(()=>{const i=new U(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return x("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(x("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Jg extends Kg{constructor(e,t,r,i,a,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=a}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return ae(!!e.streamToken),this.lastStreamToken=e.streamToken,ae(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){ae(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=gg(e.writeResults,e.commitTime),r=en(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=fg(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>mg(this.serializer,r))};this.a_(t)}}/**
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
 */class Qg extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new U(C.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,o])=>this.connection.Mo(e,ks(t,r),i,a,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new U(C.UNKNOWN,a.toString())})}Lo(e,t,r,i,a){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Lo(e,ks(t,r),i,o,c,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new U(C.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Xg{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Vt(t),this.D_=!1):x("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class Yg{constructor(e,t,r,i,a){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=a,this.k_._o(o=>{r.enqueueAndForget(async()=>{ar(this)&&(x("RemoteStore","Restarting streams for network reachability change."),await async function(d){const h=Z(d);h.L_.add(4),await sr(h),h.q_.set("Unknown"),h.L_.delete(4),await Ti(h)}(this))})}),this.q_=new Xg(r,i)}}async function Ti(n){if(ar(n))for(const e of n.B_)await e(!0)}async function sr(n){for(const e of n.B_)await e(!1)}function ar(n){return Z(n).L_.size===0}async function tu(n,e,t){if(!_i(e))throw e;n.L_.add(1),await sr(n),n.q_.set("Offline"),t||(t=()=>jg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{x("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Ti(n)})}function nu(n,e){return e().catch(t=>tu(n,t,e))}async function Ai(n){const e=Z(n),t=wt(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;Zg(e);)try{const i=await Bg(e.localStore,r);if(i===null){e.O_.length===0&&t.o_();break}r=i.batchId,ey(e,i)}catch(i){await tu(e,i)}ru(e)&&iu(e)}function Zg(n){return ar(n)&&n.O_.length<10}function ey(n,e){n.O_.push(e);const t=wt(n);t.r_()&&t.V_&&t.m_(e.mutations)}function ru(n){return ar(n)&&!wt(n).n_()&&n.O_.length>0}function iu(n){wt(n).start()}async function ty(n){wt(n).p_()}async function ny(n){const e=wt(n);for(const t of n.O_)e.m_(t.mutations)}async function ry(n,e,t){const r=n.O_.shift(),i=sa.from(r,e,t);await nu(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Ai(n)}async function iy(n,e){e&&wt(n).V_&&await async function(r,i){if(function(o){return ag(o)&&o!==C.ABORTED}(i.code)){const a=r.O_.shift();wt(r).s_(),await nu(r,()=>r.remoteSyncer.rejectFailedWrite(a.batchId,i)),await Ai(r)}}(n,e),ru(n)&&iu(n)}async function ml(n,e){const t=Z(n);t.asyncQueue.verifyOperationInProgress(),x("RemoteStore","RemoteStore received new credentials");const r=ar(t);t.L_.add(3),await sr(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Ti(t)}async function sy(n,e){const t=Z(n);e?(t.L_.delete(2),await Ti(t)):e||(t.L_.add(2),await sr(t),t.q_.set("Unknown"))}function wt(n){return n.U_||(n.U_=function(t,r,i){const a=Z(t);return a.w_(),new Jg(r,a.connection,a.authCredentials,a.appCheckCredentials,a.serializer,i)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:ty.bind(null,n),mo:iy.bind(null,n),f_:ny.bind(null,n),g_:ry.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await Ai(n)):(await n.U_.stop(),n.O_.length>0&&(x("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
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
 */class ca{constructor(e,t,r,i,a){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=a,this.deferred=new Ct,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,a){const o=Date.now()+r,c=new ca(e,t,o,i,a);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function su(n,e){if(Vt("AsyncQueue",`${e}: ${n}`),_i(n))return new U(C.UNAVAILABLE,`${e}: ${n}`);throw n}class ay{constructor(){this.queries=gl(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=Z(t),a=i.queries;i.queries=gl(),a.forEach((o,c)=>{for(const d of c.j_)d.onError(r)})})(this,new U(C.ABORTED,"Firestore shutting down"))}}function gl(){return new mn(n=>Fc(n),Uc)}function oy(n){n.Y_.forEach(e=>{e.next()})}var yl,vl;(vl=yl||(yl={})).ea="default",vl.Cache="cache";class ly{constructor(e,t,r,i,a,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=a,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new mn(c=>Fc(c),Uc),this.Ma=new Map,this.xa=new Set,this.Oa=new ke(B.comparator),this.Na=new Map,this.La=new aa,this.Ba={},this.ka=new Map,this.qa=ln.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function cy(n,e,t){const r=fy(n);try{const i=await function(o,c){const d=Z(o),h=de.now(),y=c.reduce((P,N)=>P.add(N.key),be());let v,w;return d.persistence.runTransaction("Locally write mutations","readwrite",P=>{let N=ui(),M=be();return d.cs.getEntries(P,y).next(O=>{N=O,N.forEach((A,V)=>{V.isValidDocument()||(M=M.add(A))})}).next(()=>d.localDocuments.getOverlayedDocuments(P,N)).next(O=>{v=O;const A=[];for(const V of c){const $=ng(V,v.get(V.key).overlayedDocument);$!=null&&A.push(new It(V.key,$,Dc($.value.mapValue),xe.exists(!0)))}return d.mutationQueue.addMutationBatch(P,h,A,c)}).next(O=>{w=O;const A=O.applyToLocalDocumentSet(v,M);return d.documentOverlayCache.saveOverlays(P,O.batchId,A)})}).then(()=>({batchId:w.batchId,changes:Bc(v)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,d){let h=o.Ba[o.currentUser.toKey()];h||(h=new ke(Y)),h=h.insert(c,d),o.Ba[o.currentUser.toKey()]=h}(r,i.batchId,t),await Si(r,i.changes),await Ai(r.remoteStore)}catch(i){const a=su(i,"Failed to persist write");t.reject(a)}}function _l(n,e,t){const r=Z(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach((a,o)=>{const c=o.view.Z_(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const d=Z(o);d.onlineState=c;let h=!1;d.queries.forEach((y,v)=>{for(const w of v.j_)w.Z_(c)&&(h=!0)}),h&&oy(d)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function uy(n,e){const t=Z(n),r=e.batch.batchId;try{const i=await Fg(t.localStore,e);ou(t,r,null),au(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Si(t,i)}catch(i){await Pc(i)}}async function dy(n,e,t){const r=Z(n);try{const i=await function(o,c){const d=Z(o);return d.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let y;return d.mutationQueue.lookupMutationBatch(h,c).next(v=>(ae(v!==null),y=v.keys(),d.mutationQueue.removeMutationBatch(h,v))).next(()=>d.mutationQueue.performConsistencyCheck(h)).next(()=>d.documentOverlayCache.removeOverlaysForBatchId(h,y,c)).next(()=>d.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,y)).next(()=>d.localDocuments.getDocuments(h,y))})}(r.localStore,e);ou(r,e,t),au(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Si(r,i)}catch(i){await Pc(i)}}function au(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function ou(n,e,t){const r=Z(n);let i=r.Ba[r.currentUser.toKey()];if(i){const a=i.get(e);a&&(t?a.reject(t):a.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}async function Si(n,e,t){const r=Z(n),i=[],a=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((c,d)=>{o.push(r.Ka(d,e,t).then(h=>{var y;if((h||t)&&r.isPrimaryClient){const v=h?!h.fromCache:(y=void 0)===null||y===void 0?void 0:y.current;r.sharedClientState.updateQueryState(d.targetId,v?"current":"not-current")}if(h){i.push(h);const v=la.Wi(d.targetId,h);a.push(v)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(d,h){const y=Z(d);try{await y.persistence.runTransaction("notifyLocalViewChanges","readwrite",v=>k.forEach(h,w=>k.forEach(w.$i,P=>y.persistence.referenceDelegate.addReference(v,w.targetId,P)).next(()=>k.forEach(w.Ui,P=>y.persistence.referenceDelegate.removeReference(v,w.targetId,P)))))}catch(v){if(!_i(v))throw v;x("LocalStore","Failed to update sequence numbers: "+v)}for(const v of h){const w=v.targetId;if(!v.fromCache){const P=y.os.get(w),N=P.snapshotVersion,M=P.withLastLimboFreeSnapshotVersion(N);y.os=y.os.insert(w,M)}}}(r.localStore,a))}async function hy(n,e){const t=Z(n);if(!t.currentUser.isEqual(e)){x("SyncEngine","User change. New user:",e.toKey());const r=await Zc(t.localStore,e);t.currentUser=e,function(a,o){a.ka.forEach(c=>{c.forEach(d=>{d.reject(new U(C.CANCELLED,o))})}),a.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Si(t,r.hs)}}function fy(n){const e=Z(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=uy.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=dy.bind(null,e),e}class hi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ii(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Ug(this.persistence,new $g,e.initialUser,this.serializer)}Ga(e){return new Lg(oa.Zr,this.serializer)}Wa(e){return new qg}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}hi.provider={build:()=>new hi};class Ns{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>_l(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=hy.bind(null,this.syncEngine),await sy(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new ay}()}createDatastore(e){const t=Ii(e.databaseInfo.databaseId),r=function(a){return new Wg(a)}(e.databaseInfo);return function(a,o,c,d){return new Qg(a,o,c,d)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,a,o,c){return new Yg(r,i,a,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>_l(this.syncEngine,t,0),function(){return pl.D()?new pl:new Hg}())}createSyncEngine(e,t){return function(i,a,o,c,d,h,y){const v=new ly(i,a,o,c,d,h);return y&&(v.Qa=!0),v}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const a=Z(i);x("RemoteStore","RemoteStore shutting down."),a.L_.add(5),await sr(a),a.k_.shutdown(),a.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ns.provider={build:()=>new Ns};/**
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
 */class py{constructor(e,t,r,i,a){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=we.UNAUTHENTICATED,this.clientId=Rc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=a,this.authCredentials.start(r,async o=>{x("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(x("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ct;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=su(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function fs(n,e){n.asyncQueue.verifyOperationInProgress(),x("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Zc(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function El(n,e){n.asyncQueue.verifyOperationInProgress();const t=await my(n);x("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>ml(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>ml(e.remoteStore,i)),n._onlineComponents=e}async function my(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){x("FirestoreClient","Using user provided OfflineComponentProvider");try{await fs(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===C.FAILED_PRECONDITION||i.code===C.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;ii("Error using user provided cache. Falling back to memory cache: "+t),await fs(n,new hi)}}else x("FirestoreClient","Using default OfflineComponentProvider"),await fs(n,new hi);return n._offlineComponents}async function gy(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(x("FirestoreClient","Using user provided OnlineComponentProvider"),await El(n,n._uninitializedComponentsProvider._online)):(x("FirestoreClient","Using default OnlineComponentProvider"),await El(n,new Ns))),n._onlineComponents}function yy(n){return gy(n).then(e=>e.syncEngine)}/**
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
 */function lu(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl=new Map;/**
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
 */function cu(n,e,t){if(!t)throw new U(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function vy(n,e,t,r){if(e===!0&&r===!0)throw new U(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function bl(n){if(!B.isDocumentKey(n))throw new U(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Il(n){if(B.isDocumentKey(n))throw new U(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ua(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":H()}function cn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ua(n);throw new U(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new U(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}vy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=lu((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(a){if(a.timeoutSeconds!==void 0){if(isNaN(a.timeoutSeconds))throw new U(C.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (must not be NaN)`);if(a.timeoutSeconds<5)throw new U(C.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (minimum allowed value is 5)`);if(a.timeoutSeconds>30)throw new U(C.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ri{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Tl({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Tl(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new om;switch(r.type){case"firstParty":return new dm(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=wl.get(t);r&&(x("ComponentProvider","Removing Datastore"),wl.delete(t),r.terminate())}(this),Promise.resolve()}}function _y(n,e,t,r={}){var i;const a=(n=cn(n,Ri))._getSettings(),o=`${e}:${t}`;if(a.host!=="firestore.googleapis.com"&&a.host!==o&&ii("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},a),{host:o,ssl:!1})),r.mockUserToken){let c,d;if(typeof r.mockUserToken=="string")c=r.mockUserToken,d=we.MOCK_USER;else{c=Id(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new U(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new we(h)}n._authCredentials=new lm(new Sc(c,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new da(this.firestore,e,this._query)}}class Ue{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new yt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ue(this.firestore,e,this._key)}}class yt extends da{constructor(e,t,r){super(e,t,Um(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ue(this.firestore,null,new B(e))}withConverter(e){return new yt(this.firestore,e,this._path)}}function Ey(n,e,...t){if(n=ge(n),cu("collection","path",e),n instanceof Ri){const r=ie.fromString(e,...t);return Il(r),new yt(n,null,r)}{if(!(n instanceof Ue||n instanceof yt))throw new U(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ie.fromString(e,...t));return Il(r),new yt(n.firestore,null,r)}}function ha(n,e,...t){if(n=ge(n),arguments.length===1&&(e=Rc.newId()),cu("doc","path",e),n instanceof Ri){const r=ie.fromString(e,...t);return bl(r),new Ue(n,null,new B(r))}{if(!(n instanceof Ue||n instanceof yt))throw new U(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ie.fromString(e,...t));return bl(r),new Ue(n.firestore,n instanceof yt?n.converter:null,new B(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new eu(this,"async_queue_retry"),this.Vu=()=>{const r=hs();r&&x("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=hs();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=hs();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Ct;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!_i(e))throw e;x("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(r);throw Vt("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=ca.createAndSchedule(this,e,t,r,a=>this.yu(a));return this.Tu.push(i),i}fu(){this.Eu&&H()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class Pi extends Ri{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Al,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Al(e),this._firestoreClient=void 0,await e}}}function wy(n,e){const t=typeof n=="object"?n:$l(),r=typeof n=="string"?n:"(default)",i=Fs(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const a=wd("firestore");a&&_y(i,...a)}return i}function by(n){if(n._terminated)throw new U(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Iy(n),n._firestoreClient}function Iy(n){var e,t,r;const i=n._freezeSettings(),a=function(c,d,h,y){return new Am(c,d,h,y.host,y.ssl,y.experimentalForceLongPolling,y.experimentalAutoDetectLongPolling,lu(y.experimentalLongPollingOptions),y.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new py(n._authCredentials,n._appCheckCredentials,n._queue,a,n._componentsProvider&&function(c){const d=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(d),_online:d}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Xn(qe.fromBase64String(e))}catch(t){throw new U(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Xn(qe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new me(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e){this._methodName=e}}/**
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
 */class uu{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Y(this._lat,e._lat)||Y(this._long,e._long)}}/**
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
 */class du{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let a=0;a<r.length;++a)if(r[a]!==i[a])return!1;return!0}(this._values,e._values)}}/**
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
 */const Ty=/^__.*__$/;class Ay{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new It(e,this.data,this.fieldMask,t,this.fieldTransforms):new ir(e,this.data,t,this.fieldTransforms)}}class hu{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new It(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function fu(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw H()}}class pa{constructor(e,t,r,i,a,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,a===void 0&&this.vu(),this.fieldTransforms=a||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new pa(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return fi(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(fu(this.Cu)&&Ty.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Sy{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ii(e)}Qu(e,t,r,i=!1){return new pa({Cu:e,methodName:t,qu:r,path:me.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function pu(n){const e=n._freezeSettings(),t=Ii(n._databaseId);return new Sy(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Ry(n,e,t,r,i,a={}){const o=n.Qu(a.merge||a.mergeFields?2:0,e,t,i);ga("Data must be an object, but it was:",o,r);const c=mu(r,o);let d,h;if(a.merge)d=new De(o.fieldMask),h=o.fieldTransforms;else if(a.mergeFields){const y=[];for(const v of a.mergeFields){const w=Ds(e,v,t);if(!o.contains(w))throw new U(C.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);vu(y,w)||y.push(w)}d=new De(y),h=o.fieldTransforms.filter(v=>d.covers(v.field))}else d=null,h=o.fieldTransforms;return new Ay(new Ne(c),d,h)}class Ci extends ki{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ci}}class ma extends ki{_toFieldTransform(e){return new Ym(e.path,new Kn)}isEqual(e){return e instanceof ma}}function Py(n,e,t,r){const i=n.Qu(1,e,t);ga("Data must be an object, but it was:",i,r);const a=[],o=Ne.empty();pn(r,(d,h)=>{const y=yu(e,d,t);h=ge(h);const v=i.Nu(y);if(h instanceof Ci)a.push(y);else{const w=Ni(h,v);w!=null&&(a.push(y),o.set(y,w))}});const c=new De(a);return new hu(o,c,i.fieldTransforms)}function ky(n,e,t,r,i,a){const o=n.Qu(1,e,t),c=[Ds(e,r,t)],d=[i];if(a.length%2!=0)throw new U(C.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<a.length;w+=2)c.push(Ds(e,a[w])),d.push(a[w+1]);const h=[],y=Ne.empty();for(let w=c.length-1;w>=0;--w)if(!vu(h,c[w])){const P=c[w];let N=d[w];N=ge(N);const M=o.Nu(P);if(N instanceof Ci)h.push(P);else{const O=Ni(N,M);O!=null&&(h.push(P),y.set(P,O))}}const v=new De(h);return new hu(y,v,o.fieldTransforms)}function Ni(n,e){if(gu(n=ge(n)))return ga("Unsupported field value:",e,n),mu(n,e);if(n instanceof ki)return function(r,i){if(!fu(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const a=r._toFieldTransform(i);a&&i.fieldTransforms.push(a)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const a=[];let o=0;for(const c of r){let d=Ni(c,i.Lu(o));d==null&&(d={nullValue:"NULL_VALUE"}),a.push(d),o++}return{arrayValue:{values:a}}}(n,e)}return function(r,i){if((r=ge(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Jm(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const a=de.fromDate(r);return{timestampValue:Ps(i.serializer,a)}}if(r instanceof de){const a=new de(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ps(i.serializer,a)}}if(r instanceof uu)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Xn)return{bytesValue:cg(i.serializer,r._byteString)};if(r instanceof Ue){const a=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(a))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${a.projectId}/${a.database}`);return{referenceValue:Xc(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof du)return function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(d=>{if(typeof d!="number")throw c.Bu("VectorValues must only contain numeric values.");return ra(c.serializer,d)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${ua(r)}`)}(n,e)}function mu(n,e){const t={};return Cc(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):pn(n,(r,i)=>{const a=Ni(i,e.Mu(r));a!=null&&(t[r]=a)}),{mapValue:{fields:t}}}function gu(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof de||n instanceof uu||n instanceof Xn||n instanceof Ue||n instanceof ki||n instanceof du)}function ga(n,e,t){if(!gu(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=ua(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Ds(n,e,t){if((e=ge(e))instanceof fa)return e._internalPath;if(typeof e=="string")return yu(n,e);throw fi("Field path arguments must be of type string or ",n,!1,void 0,t)}const Cy=new RegExp("[~\\*/\\[\\]]");function yu(n,e,t){if(e.search(Cy)>=0)throw fi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new fa(...e.split("."))._internalPath}catch{throw fi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function fi(n,e,t,r,i){const a=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let d="";return(a||o)&&(d+=" (found",a&&(d+=` in field ${r}`),o&&(d+=` in document ${i}`),d+=")"),new U(C.INVALID_ARGUMENT,c+n+d)}function vu(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ny(n,e,t){let r;return r=n?n.toFirestore(e):e,r}function Dy(n,e,t){n=cn(n,Ue);const r=cn(n.firestore,Pi),i=Ny(n.converter,e);return ya(r,[Ry(pu(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,xe.none())])}function Oy(n,e,t,...r){n=cn(n,Ue);const i=cn(n.firestore,Pi),a=pu(i);let o;return o=typeof(e=ge(e))=="string"||e instanceof fa?ky(a,"updateDoc",n._key,e,t,r):Py(a,"updateDoc",n._key,e),ya(i,[o.toMutation(n._key,xe.exists(!0))])}function Ly(n){return ya(cn(n.firestore,Pi),[new ia(n._key,xe.none())])}function ya(n,e){return function(r,i){const a=new Ct;return r.asyncQueue.enqueueAndForget(async()=>cy(await yy(r),i,a)),a.promise}(by(n),e)}function _u(){return new ma("serverTimestamp")}(function(e,t=!0){(function(i){fn=i})(un),tn(new Dt("firestore",(r,{instanceIdentifier:i,options:a})=>{const o=r.getProvider("app").getImmediate(),c=new Pi(new cm(r.getProvider("auth-internal")),new fm(r.getProvider("app-check-internal")),function(h,y){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new U(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new oi(h.options.projectId,y)}(o,i),o);return a=Object.assign({useFetchStreams:t},a),c._setSettings(a),c},"PUBLIC").setMultipleInstances(!0)),mt(Zo,"4.7.3",e),mt(Zo,"4.7.3","esm2017")})();function Vy(n){var e,t,r;if(!n)return 0;if(typeof n=="number")return Number.isFinite(n)?n:0;if(typeof n=="string"){const i=Date.parse(n);return Number.isFinite(i)?i:0}if(typeof n.toDate=="function"){const i=n.toDate();return i instanceof Date&&i.getTime()?i.getTime():0}if(typeof n=="object"){const i=Number((e=n.seconds)!=null?e:n._seconds);if(Number.isFinite(i))return i*1e3+Math.round(Number((r=(t=n.nanoseconds)!=null?t:n._nanoseconds)!=null?r:0)/1e6);const a=Number(n.__srvTs);if(Number.isFinite(a))return a}return 0}const Pe=(n,e="en-BD")=>{const t=Vy(n);if(!t)return"—";const r=new Date(t);try{return r.toLocaleString(e,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return r.toISOString().slice(0,16).replace("T"," ")}};function My(){try{const n=typeof window!="undefined"&&window.DigitEarnBridge;if(n&&typeof n.getFirebaseConfig=="function"){const e=String(n.getFirebaseConfig()||"");if(e.length>2)return JSON.parse(e)||{}}}catch{}return typeof window!="undefined"&&window.__DIGITEARN_FB_CONFIG__||{}}const Ht=My(),zt={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0},Wr={apiKey:Ht.apiKey||zt.apiKey||"",authDomain:Ht.authDomain||zt.authDomain||"",projectId:Ht.projectId||zt.projectId||"",storageBucket:Ht.storageBucket||zt.storageBucket||"",messagingSenderId:Ht.messagingSenderId||zt.messagingSenderId||"",appId:Ht.appId||zt.appId||""},Eu=!!(Wr.apiKey&&Wr.projectId&&Wr.appId),$y=typeof location!="undefined"&&/^https?:$/.test(location.protocol),xy=$y?"":"https://digitearn.vercel.app",wu=Ml(Wr),or=sm(wu),va=wy(wu),X=n=>"৳"+Number(n||0).toLocaleString("en-BD",{maximumFractionDigits:2}),R=n=>String(n!=null?n:"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);async function oe(n,e={},t="POST"){if(!Eu)throw new Error("Firebase configure করা নেই");let r=n;const i=String(n).match(/^\/api\/admin\/([a-z0-9-]+)/);i&&(r="/api/admin/panel?op="+encodeURIComponent(i[1]));const a=async c=>{const d=or.currentUser;if(!d)throw new Error("Login required — আবার লগইন করুন");const h=await fetch(xy+r,{method:t,headers:{"Content-Type":"application/json",Authorization:"Bearer "+await d.getIdToken(c)},body:t==="GET"?void 0:JSON.stringify(e)});let y="";try{y=await h.text()}catch{}let v=null;try{v=y?JSON.parse(y):{}}catch{}return{resp:h,data:v||{},isJson:!!v}};let o=await a(!1);if(!o.resp.ok&&(o.resp.status===401||o.data.sessionExpired===!0)&&(o=await a(!0)),!o.resp.ok){const c=o.data||{};if(c.protection||c.error&&typeof c.error=="object"&&String(c.error.code)==="401")throw new Error("Vercel Deployment Protection ব্লক করছে — এই deployment URL থেকে admin API চলে না। Production URL (digitearn.vercel.app) ব্যবহার করুন বা Vercel → Settings → Deployment Protection off করুন।");const d=typeof c.error=="string"?c.error:String(c.error&&(c.error.message||c.error.code)||c.message||"");throw new Error(d||(o.isJson?"":`সার্ভার JSON দেয়নি (HTTP ${o.resp.status})`)||`Operation fail হয়েছে (${o.resp.status}) — আবার চেষ্টা করুন`)}return o.data}async function Uy(){try{return await oe("/api/admin/health",{})}catch(n){const e=String(n&&n.message||n);throw/Unknown admin endpoint|404/i.test(e)?new Error("সার্ভারের build পুরোনো — `?op=health` নেই, মানে নতুন api/ + lib/ এখনো deploy হয়নি। Push করে Vercel-এ Redeploy করুন।"):n}}async function Fy(){try{const n=await oe("/api/admin/verify",{});return{isAdmin:!!n.isAdmin,authenticated:!!n.authenticated,authState:n.authState||"",error:""}}catch(n){return{isAdmin:!1,authenticated:!1,error:String(n&&n.message||"Admin verify fail")}}}async function et(n,e={}){const t=await oe("/api/admin/read",{what:n,...e});return Array.isArray(t.items)?t.items:[]}async function bu(n,e={}){const t=await oe("/api/admin/read",{what:n,...e});return t&&t.item?t.item:null}const Ae=(n,e={})=>oe("/api/admin/write",{what:n,...e});async function Iu(n="pending",e=100){return et("proofs",{status:n,limit:e})}async function jy(n){await oe("/api/admin/proof-review",{proofId:n,action:"approve"})}async function Tu(n="pending",e=100){return et("deposits",{status:n,limit:e})}async function By(n){await oe("/api/admin/deposit-review",{depositId:n,action:"approve"})}async function qy(n,e=""){await oe("/api/admin/deposit-review",{depositId:n,action:"reject",note:e})}async function _a(n=300){return et("users",{limit:n})}async function Di(n){return await bu("user",{id:n})}async function Hy(n,e=20){return et("user-withdrawals",{uid:n,limit:e})}async function zy(n,e=25){return et("user-transactions",{uid:n,limit:e})}async function Sl(n,e){await oe("/api/admin/set-active",{uid:n,active:e})}async function Gy(){return et("tasks",{limit:500})}async function Au(n){const e=await oe("/api/admin/read",n?{what:"jobs",kindFilter:n}:{what:"jobs"});return Array.isArray(e.items)?e.items:[]}async function Wy(n){return Ae("task-create",{data:n})}async function Ea(){return oe("/api/admin/read",{what:"wallet"})}async function Ky(){const n=await oe("/api/admin/read",{what:"admins"});return{items:Array.isArray(n.items)?n.items:[],isOwner:!!n.isOwner,isManager:n.isManager!==!1&&(!!n.isOwner||!!n.isManager)}}async function Jy(){const n=await oe("/api/admin/read",{what:"admin-joins"});if(n&&n.error)throw new Error(n.error);return{items:Array.isArray(n.items)?n.items:[],isManager:!!n.isManager,isOwner:!!n.isOwner}}async function Qy(n,e){return Ae("join-approve",{email:n,role:e})}async function Xy(n,e){return Ae("join-reject",{email:n,reason:e})}async function Yy({email:n,fullName:e="",role:t="poster",balance:r=null,password:i=""}={}){return Ae("admin-create",{email:n,fullName:e,role:t,grant:r,password:i})}async function Zy(n,e,t=""){return Ae("admin-suspend",{email:n,suspended:e,reason:t})}async function ev({email:n,fullName:e,role:t="poster",note:r=""}={}){return oe("/api/admin/admin-join",{email:n,fullName:e,role:t,note:r})}async function tv(n,{delta:e=null,setBalance:t=null,note:r=""}={}){return Ae("admin-balance",{email:n,delta:e,setBalance:t,note:r})}async function nv(n,e){return Ae("admin-role",{email:n,role:e})}async function rv(n){return Ae("admin-mode",{activeMode:n})}async function iv(n){return Ae("task-publish",{slug:n})}async function sv(n){return Ae("task-delete",{slug:n})}async function av(n,e,t=""){await oe("/api/admin/proof-review",{proofId:n,action:e,note:t})}async function ov(){return Ae("leaderboard-backfill",{})}async function lv(n=[]){return await oe("/api/admin/seed-tasks",{slugs:n})}async function cv(n,e){if(e.url&&!/^https?:\/\/\S+$/i.test(e.url))throw new Error("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)");return Ae("task",{slug:n,data:e})}const Su=["giftCode"];async function uv(){const[n,e]=await Promise.all([bu("settings").catch(()=>null),oe("/api/admin/secret",{get:!0}).catch(()=>({}))]),t={...n||{}};delete t.id;const r={},i=e&&typeof e.giftCode=="string";for(const a of Su)typeof e[a]=="string"&&(r[a]=e[a]);return{...t,...r,_secretLoaded:i}}async function Ru(n="pending",e=100){return et("withdrawals",{status:n,limit:e})}async function Os(n,e,t,r=""){return oe("/api/admin/withdrawal-review",{userId:n,id:e,action:t,note:r})}async function dv(n){const e={...n},t={};for(const i of Su)i in e&&(t[i]=e[i],delete e[i]);await Ae("settings",{data:e});const r={...t};for(const i of Object.keys(r))String(r[i]).trim()===""&&!r.__clear&&delete r[i];Object.keys(r).length&&await oe("/api/admin/secret",r)}async function hv(){await oe("/api/admin/secret",{giftCode:"",__clear:!0})}async function fv(){return et("notices",{limit:100})}async function pv({title:n,body:e,type:t="notice",expiresAt:r=null}){const i={title:String(n||"").trim().slice(0,60),body:String(e||"").trim().slice(0,300),type:t==="warning"?"warning":"notice",targetType:"all",enabled:!0,sort:10,createdAt:_u()};return r&&(i.expiresAt=r),Ae("notice-add",i)}async function mv(n,{title:e,body:t,enabled:r,sort:i,type:a,expiresAt:o}){const c={title:String(e||"").trim().slice(0,60),body:String(t||"").trim().slice(0,300),enabled:!!r,sort:Number(i)||10};return a&&(c.type=a==="warning"?"warning":"notice"),o&&(c.expiresAt=o),Ae("notice-update",{id:n,...c})}async function gv(n){return Ae("notice-delete",{id:n})}async function yv(n){return et("user-target-notices",{uid:n,limit:50})}async function vv(n,{title:e,body:t,type:r="warning",expiresAt:i=null}){const a={title:String(e||"").trim().slice(0,60),body:String(t||"").trim().slice(0,300),type:r==="warning"?"warning":"notice",targetType:"user",targetUserId:n,enabled:!0,sort:10,createdAt:_u(),createdBy:"admin"};i&&(a.expiresAt=i),await Dy(ha(Ey(va,"users",n,"targetNotices")),a)}async function Pu(n,e,{enabled:t}){await Oy(ha(va,"users",n,"targetNotices",e),{enabled:!!t})}async function ku(n,e){await Ly(ha(va,"users",n,"targetNotices",e))}async function _v(){return(await oe("/api/admin/notice-targeted",{},"GET")).targeted||[]}async function Ev(){const[n,e,t]=await Promise.all([_a(1e3),Iu("pending",100),Tu("pending",100)]);return{totalUsers:n.length,activeUsers:n.filter(r=>r.isActive).length,pendingProofs:e.length,pendingDeposits:t.length,totalBalance:n.reduce((r,i)=>r+(Number(i.balance)||0),0),recentProofs:e.slice(0,3),recentDeposits:t.slice(0,3)}}const wv={url:300,email:120,tel:20,number:60,textarea:2e3,text:100,password:100,image:3e5};async function Rl(n,{maxSide:e=900,quality:t=.72,maxBytes:r=22e4}={}){if(!n||!/^image\/(png|jpe?g|webp)$/.test(n.type||""))throw new Error("PNG/JPG/WEBP ছবি দিন");if(n.size>8*1024*1024)throw new Error("ছবি 8MB-এর বড় না — ছোট করুন");const i=URL.createObjectURL(n);try{const a=await new Promise((w,P)=>{const N=new Image;N.onload=()=>w(N),N.onerror=()=>P(new Error("ছবি পড়া যায়নি")),N.src=i});let o=a.naturalWidth||a.width||0,c=a.naturalHeight||a.height||0;if(!o||!c)throw new Error("ছবির size বোঝা যায়নি");const d=Math.min(1,e/Math.max(o,c));o=Math.max(1,Math.round(o*d)),c=Math.max(1,Math.round(c*d));const h=document.createElement("canvas");h.width=o,h.height=c,h.getContext("2d").drawImage(a,0,0,o,c);let y="",v=t;for(let w=0;w<6&&(y=h.toDataURL("image/jpeg",v),!(y.length<=r));w++)v-=.12;if(y.length>wv.image)throw new Error("ছবি ছোট করা যাচ্ছে না — আরেকটা ছবি দিন");return y}finally{URL.revokeObjectURL(i)}}const vt=document.getElementById("app");let $t=null;function L(n,e="success"){const t=document.createElement("div");t.className="adm-toast "+e,t.innerHTML=`<i class="fa-solid ${e==="error"?"fa-circle-xmark":"fa-circle-check"}"></i> ${R(n)}`,vt.appendChild(t),requestAnimationFrame(()=>t.classList.add("show")),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3200)}function Oi(n="কারণ লিখুন",e="কারণ লিখুন — user/আবেদনকারী এটাই দেখবে",t={}){return new Promise(r=>{const i=document.createElement("div");i.className="adm-modal",i.innerHTML=`<div class="am-box">
      <h5>${R(n)}</h5>
      ${t.hint?`<p class="muted">${R(t.hint)}</p>`:""}
      <textarea class="adm-input" rows="3" maxlength="200" placeholder="${R(e)}"></textarea>
      <div class="am-row">
        <button type="button" class="adm-btn ghost sm" data-x>বাতিল</button>
        <button type="button" class="adm-btn ${t.tone==="green"?"green":"red"} sm" data-ok>${R(t.okLabel||"পাঠিয়ে দিন")}</button>
      </div></div>`,vt.appendChild(i);const a=i.querySelector("textarea");setTimeout(()=>a.focus(),30);const o=d=>{i.remove(),document.removeEventListener("keydown",c),r(d)},c=d=>{d.key==="Escape"&&o(null)};document.addEventListener("keydown",c),i.querySelector("[data-x]").addEventListener("click",()=>o(null)),i.querySelector("[data-ok]").addEventListener("click",()=>{const d=String(a.value||"").trim();if(d.length<3){a.classList.add("bad"),a.placeholder="কমপক্ষে ৩ অক্ষর লিখুন";return}o(d)}),i.addEventListener("click",d=>{d.target===i&&o(null)})})}Eu||(vt.innerHTML='<div class="loading-center"><p style="max-width:340px;text-align:center">Firebase env variables set নেই।<br>Vercel-এ ৬টা <b>VITE_FIREBASE_*</b> variable দিন।</p></div>');Kf(or,n=>{if(!n){$t=null,Qt();return}Cu(n)});async function Cu(n){const e=await Fy();if(e.error){vt.innerHTML=`<div class="loading-center" style="display:block;text-align:center;padding:28px">
      <p style="margin-bottom:12px">Admin check করা যায়নি:<br><b style="font-size:13px">${R(e.error)}</b></p>
      <button class="adm-btn gold" id="gateRetry"><i class="fa-solid fa-rotate"></i> আবার চেষ্টা করুন</button>
      <p class="muted" style="margin-top:12px;font-size:12px">লগইন ভাঙেনি — শুধু সার্ভার উত্তর দেয়নি।</p></div>`,document.getElementById("gateRetry").addEventListener("click",()=>Cu(n));return}if(!e.isAdmin){await cc(or),Qt("এই email টা admin list-এ নেই — Firestore-এর admins collection-এ এই email-এর document আছে কিনা দেখুন।");return}$t={email:n.email},window.location.hash=window.location.hash||"#/overview",bv(),window.addEventListener("hashchange",Vu)}function Qt(n="",e="login"){var r;vt.innerHTML=`
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-logo"><i class="fa-solid fa-bolt"></i></div>
        <h1>DigitEarn <span>Admin</span></h1>
        <p class="muted">${e==="join"?"Admin হতে আবেদন পাঠান":"Admin panel-এ লগইন করুন"}</p>
        <div class="auth-tabs" role="tablist">
          <button type="button" class="auth-tab ${e==="login"?"on":""}" data-am="login"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
          <button type="button" class="auth-tab ${e==="join"?"on":""}" data-am="join"><i class="fa-solid fa-user-plus"></i> Join admin</button>
        </div>
        ${n?`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${R(n)}</div>`:""}
        <form id="loginForm" ${e==="join"?"hidden":""}>
          <input type="email" id="lgEmail" class="adm-input" placeholder="Admin email" required autocomplete="username">
          <input type="password" id="lgPass" class="adm-input" placeholder="পাসওয়ার্ড" required autocomplete="current-password">
          <label class="check-label"><input type="checkbox" id="keepLogin" checked> আমাকে মনে রাখুন</label>
          <button class="adm-btn gold" type="submit"><i class="fa-solid fa-right-to-bracket"></i> লগইন করুন</button>
          <a href="/forgot-password.html" class="forgot-link">পাসওয়ার্ড ভুলে গেছেন?</a>
        </form>
        <form id="joinForm" ${e==="join"?"":"hidden"}>
          <input class="adm-input" id="jName" placeholder="আপনার নাম" maxlength="60" required>
          <input type="email" class="adm-input" id="jEmail" placeholder="যে email দিয়ে login করবেন" maxlength="120" required autocomplete="email">
          <select class="adm-input" id="jRole">
            <option value="poster">Job Poster admin (ব্যালেন্স দিয়ে job প্রকাশ)</option>
            <option value="full">Full Access admin (সব panel, ব্যালেন্স লাগে না)</option>
          </select>
          <textarea class="adm-input" id="jNote" rows="3" maxlength="300" placeholder="কেন admin হতে চান? (১-২ লাইন)"></textarea>
          <button class="adm-btn gold" type="submit"><i class="fa-solid fa-paper-plane"></i> আবেদন পাঠান</button>
          <p class="muted" style="font-size:12px;margin-top:8px">আবেদন অনুমোদন হলে আপনাকে একটা পাসওয়ার্ড সেট করার লিংক দেওয়া হবে। এই ফর্মের কোনো লেখা public site-এ দেখায় না।</p>
        </form>
      </div>
    </div>`,vt.querySelectorAll("[data-am]").forEach(i=>i.addEventListener("click",()=>Qt("",i.dataset.am)));const t=document.getElementById("loginForm");t==null||t.addEventListener("submit",async i=>{i.preventDefault();const a=i.target.querySelector("button");a.disabled=!0,a.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{await zf(or,document.getElementById("lgEmail").value.trim(),document.getElementById("lgPass").value)}catch(o){a.disabled=!1,a.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> লগইন করুন';const c=String(o&&(o.code||o.message)||"");Qt(/user-not-found|wrong-password|invalid-?login/i.test(c)?"email বা পাসওয়ার্ড ঠিক নেই (অথবা এই email-এ account নেই) — আবেদন করতে চাইলে “Join admin” টিপুন।":"লগইন করা যায়নি: "+(c.slice(0,80)||"আবার চেষ্টা করুন"),"login")}}),(r=document.getElementById("joinForm"))==null||r.addEventListener("submit",async i=>{i.preventDefault();const a=i.target.querySelector("button");a.disabled=!0;try{await ev({fullName:document.getElementById("jName").value.trim(),email:document.getElementById("jEmail").value.trim(),role:document.getElementById("jRole").value,note:document.getElementById("jNote").value.trim()}),vt.innerHTML=`<div class="login-wrap"><div class="login-card">
        <div class="login-logo ok"><i class="fa-solid fa-circle-check"></i></div>
        <h1>আবেদন পাঠানো হয়েছে</h1>
        <p class="muted">Owner বা Full Access admin অনুমোদন করলে আপনার email-এ পাসওয়ার্ড সেট করার লিংক পাঠানো হবে।</p>
        <button class="adm-btn gold" id="bkLogin"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
      </div></div>`,document.getElementById("bkLogin").addEventListener("click",()=>Qt())}catch(o){a.disabled=!1,Qt(String(o.message||"আবেদন পাঠানো যায়নি — একটু পরে আবার চেষ্টা করুন"),"join")}})}const Nu=[{id:"overview",label:"Overview",icon:"fa-gauge-high"},{id:"proofs",label:"Submissions",icon:"fa-clipboard-list"},{id:"deposits",label:"Deposits",icon:"fa-money-bill-wave"},{id:"withdrawals",label:"Withdrawals",icon:"fa-money-bill-transfer"},{id:"users",label:"Users",icon:"fa-users"},{id:"microjobs",label:"MicroJobs",icon:"fa-briefcase"},{id:"wallet",label:"অ্যাডমিন ম্যানেজমেন্ট",icon:"fa-sitemap"},{id:"tasks",label:"টাস্ক (অ্যাকাউন্ট সেল)",icon:"fa-store"},{id:"settings",label:"Settings",icon:"fa-gear"},{id:"notices",label:"Notices",icon:"fa-bullhorn"}];function bv(){vt.innerHTML=`
    <header class="adm-top">
      <button class="adm-menu-btn" id="admMenu" aria-label="মেনু খুলুন"><i class="fa-solid fa-bars"></i></button>
      <div class="adm-logo"><i class="fa-solid fa-bolt"></i> DigitEarn <span>Admin</span></div>
      <div class="adm-top-right">
        <button class="adm-bell" id="admBell" aria-label="নতুন রিকোয়েস্ট"><i class="fa-solid fa-bell"></i><span class="adm-bell-n" id="bellCount" hidden>0</span></button>
        <button class="adm-btn ghost sm" id="logoutBtn" aria-label="লগআউট"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
    </header>
    <div class="adm-drawer" id="admDrawer" hidden>
      <div class="adm-drawer-scrim" data-close></div>
      <nav class="adm-drawer-nav">
        <div class="adm-drawer-who"><i class="fa-solid fa-user-shield"></i><b>${R($t.email)}</b><span id="drawerRole" class="muted"></span></div>
        ${Nu.map(t=>`<a href="#/${t.id}" data-nav="${t.id}"><i class="fa-solid ${t.icon}"></i> ${t.label}<span class="dd-n" data-badge="${t.id}" hidden></span></a>`).join("")}
        <button class="adm-btn ghost sm adm-drawer-out" id="drawerLogout"><i class="fa-solid fa-right-from-bracket"></i> লগআউট</button>
      </nav>
    </div>
    <div class="adm-alerts" id="admAlerts" hidden></div>
    <main class="adm-main" id="admMain"><div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div></main>`,(t=>{document.getElementById("logoutBtn").addEventListener("click",t),document.getElementById("drawerLogout").addEventListener("click",t)})(()=>{Lu(),cc(or)});const e=document.getElementById("admDrawer");document.getElementById("admMenu").addEventListener("click",()=>{e.hidden=!e.hidden}),e.addEventListener("click",t=>{(t.target.closest("[data-close]")||t.target.closest("[data-nav]"))&&(e.hidden=!0)}),document.getElementById("admBell").addEventListener("click",()=>Ou(!0)),Ea().then(t=>{const r=document.getElementById("drawerRole");!r||!t||t.error||(r.textContent=(Mn[t.role]||t.role)+(t.needsBalance?` · ব্যালেন্স ${X(t.balance)}`:""))}).catch(()=>{}),Vu(),Sv()}function Iv(n,e){try{const t=window.DigitEarnBridge;t&&typeof t.notify=="function"&&t.notify(String(n||""),String(e||""))}catch{}}let Kr=null,wa=null;const Du=()=>"de:admSeenWd:"+String($t&&$t.email||""),Tv=()=>{try{return new Set(JSON.parse(localStorage.getItem(Du())||"[]"))}catch{return new Set}},Av=n=>{try{localStorage.setItem(Du(),JSON.stringify(n.slice(-400)))}catch{}};async function Yn(n=!1){if(!document.getElementById("admMain")||!$t)return;let e=[];try{e=await Ru("pending",50)}catch{return}const t=Tv(),r=n?e:e.filter(a=>a&&a.id&&!t.has(a.id));wa=e;const i=document.getElementById("bellCount");if(i){const a=e.filter(o=>o&&o.id&&!t.has(o.id)).length;i.textContent=String(a),i.hidden=!a}if(Nu.forEach(a=>{const o=document.querySelector(`[data-badge="${a.id}"]`);o&&a.id==="withdrawals"&&(o.textContent=String(e.length),o.hidden=!e.length)}),Ou(!1,e),r.length){const a=r[0],o=a.name||a.userId||"user",c=`উইথড্র : ${Number(a.amount||0)} BDT • ${a.accountNumber||"—"}`;L(`নতুন উইথড্র রিকোয়েস্ট: ${o} — ৳${Number(a.amount||0)}`,"error"),Iv(`${r.length>1?r.length+"টা নতুন উইথড্র রিকোয়েস্ট":"নতুন উইথড্র রিকোয়েস্ট — "+o}`,c);try{navigator.vibrate&&navigator.vibrate([140,70,140])}catch{}}Av(e.map(a=>a.id).filter(Boolean))}function Ou(n,e){var i;const t=document.getElementById("admAlerts");if(!t)return;const r=(e||wa||[]).slice(0,12);if(n&&!t.hidden){t.hidden=!0;return}if(n)t.hidden=!1;else if(t.hidden)return;t.innerHTML=`<div class="al-head"><b><i class="fa-solid fa-money-bill-transfer" style="color:#d97706"></i> নতুন উইথড্র রিকোয়েস্ট</b>
      <button class="adm-btn ghost sm" id="alClose"><i class="fa-solid fa-xmark"></i></button></div>
    ${r.length?r.map(a=>`
      <div class="al-row">
        <span class="al-ico"><i class="fa-solid fa-user"></i></span>
        <div class="al-txt"><b>${R(a.name||a.userId||"User")}</b>
          <span>উইথড্র : <b>${Number(a.amount||0)} BDT</b> • ${R(a.method||"")} • নম্বর ${R(a.accountNumber||"—")}</span>
          <span class="muted">${Pe(a.createdAt)}</span></div>
        <a class="adm-btn gold sm" href="#/withdrawals" data-alopen>খুলুন</a>
      </div>`).join(""):'<p class="muted" style="padding:10px 12px">এখনো কোনো অপেক্ষমাণ রিকোয়েস্ট নেই।</p>'}`,(i=document.getElementById("alClose"))==null||i.addEventListener("click",()=>{t.hidden=!0}),t.querySelectorAll("[data-alopen]").forEach(a=>a.addEventListener("click",()=>{t.hidden=!0}))}function Sv(){Lu(),$t&&(Yn(!1),Kr=setInterval(()=>Yn(!1),45e3))}function Lu(){Kr&&clearInterval(Kr),Kr=null,wa=null}async function Vu(){const n=(window.location.hash||"#/overview").replace("#/",""),e=document.getElementById("admMain");if(e){document.querySelectorAll("[data-nav]").forEach(t=>t.classList.toggle("on",t.dataset.nav===n)),e.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';try{n==="proofs"?await Vn(e):n==="deposits"?await Jr(e):n==="withdrawals"?await Ls(e):n==="users"?await Cv(e):n==="tasks"?await $s(e,"task"):n==="microjobs"?await $s(e,"microjob"):n==="wallet"||n==="admins"?await lt(e):n==="settings"?await Mu(e):n==="notices"?await Kt(e):await Rv(e)}catch(t){const r=String(t&&t.message||t),i=/permission|insufficient/i.test(r);e.innerHTML=`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${R(r)}
      ${i?`<div class="muted" style="font-size:12px;margin-top:8px">
        Panel এখন server (Admin SDK) দিয়ে পড়ে — নিচের ↻ বাটন চাপুন। না চললে দেখুন:
        Firestore-এর <code>admins/&lt;email&gt;</code> doc-id হুবহু আপনার login email
        হতে হবে (বড়/ছোট হাতের তফাতও fail করে), আর Vercel function-এর build
        নতুন কিনা (?op=read থাকতে হবে)।</div>`:""}</div>`}}}async function Rv(n){const e=await Ev();n.innerHTML=`
    <div class="stat-grid">
      <div class="adm-stat gold"><i class="fa-solid fa-users"></i><b>${e.totalUsers}</b><span>মোট ইউজার</span></div>
      <div class="adm-stat green"><i class="fa-solid fa-circle-check"></i><b>${e.activeUsers}</b><span>অ্যাক্টিভ</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-clipboard-list"></i><b>${e.pendingProofs}</b><span>জমার রিভিউ</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-money-bill-wave"></i><b>${e.pendingDeposits}</b><span>ডিপোজিট রিভিউ</span></div>
    </div>
    <div class="adm-card"><h4><i class="fa-solid fa-scale-balanced" style="color:#d97706"></i> মোট Outstanding Balance</h4>
      <div class="big-num">${X(e.totalBalance)}</div>
      <p class="muted">সব ইউজারের ব্যালেন্সের যোগফল (প্রতি ১০০০ ইউজার পর্যন্ত)।</p>
    </div>
    ${e.recentProofs.length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-clipboard-list" style="color:#d97706"></i> সর্বশেষ Pending Submissions</h4>
      ${e.recentProofs.map(t=>`<div class="mini-row"><b>${R(t.taskName||t.taskSlug)}</b> <span class="muted">${Pe(t.createdAt)}</span><span class="badge gold">+${X(t.reward)}</span></div>`).join("")}
      <a href="#/proofs" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${e.recentDeposits.length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-money-bill-wave" style="color:#d97706"></i> সর্বশেষ Pending Deposits</h4>
      ${e.recentDeposits.map(t=>`<div class="mini-row"><b>${R(t.method)}</b> <span class="muted">${Pe(t.createdAt)}</span><span class="badge gold">${X(t.amount)}</span></div>`).join("")}
      <a href="#/deposits" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${!e.recentProofs.length&&!e.recentDeposits.length?'<p class="muted center-note">কোনো pending item নেই ✓</p>':""}
    <div class="adm-card">
      <h4><i class="fa-solid fa-stethoscope" style="color:#d97706"></i> সিস্টেম চেক (API auth)</h4>
      <p class="muted" style="font-size:13px;margin-bottom:10px">ইউজার যদি “Login required” দেখায় বা approve/reject fail করে, এখানে চাপলে কারণটা দেখাবে — Vercel-এর Firebase env, service account-এর project, আর Firestore পড়া যাচ্ছে কিনা।</p>
      <button class="adm-btn ghost sm" id="healthBtn"><i class="fa-solid fa-heart-pulse"></i> Check করুন</button>
      <div id="healthOut" style="margin-top:10px"></div>
    </div>`,document.getElementById("healthBtn").addEventListener("click",Pv)}async function Pv(){const n=document.getElementById("healthOut");n&&(n.innerHTML='<span class="muted"><i class="fa-solid fa-spinner fa-spin"></i> চেক হচ্ছে…</span>');let e;try{e=await Uy()}catch(a){n&&(n.innerHTML=`<div class="form-err">${R(String(a.message||a))}</div>`);return}const t=(a,o,c)=>`<div class="mini-row"><span class="badge ${a?"green":"red"}">${a?"✓":"✗"}</span> ${R(o)}${c?` <span class="muted">${R(c)}</span>`:""}</div>`,r=[t(!!e.ok,"সামগ্রিক",e.ok?"server ঠিক আছে — ইউজারের “Login required” হলে সেটা deployment-এর dosh নয়":"server-side সেটআপে সমস্যা"),t(!!e.firestore&&!!e.firestore.reachable,"Firestore পড়া",e.firestore&&e.firestore.settingsDoc?"settings/site পাওয়া গেছে":"পড়া যাচ্ছে না"),t(!e.sdk||e.sdk.cjsRequireSafe!==!1,"Admin SDK (firebase-admin)",`v${e.sdk&&e.sdk.version||"?"}${e.sdk&&e.sdk.jose?" · jose@"+e.sdk.jose:""}`+(e.sdk&&e.sdk.cjsRequireSafe===!1?" — CJS require() ভাঙে, functions 500 (Node 22.x বা ^13.10.0 pin লাগবে)":"")),t(!!e.privateKeyShape,"Private key ফরম্যাট",""),t(!!e.projectMatch,"Project match",`site: ${e.tokenProject||e.serverProject||"?"} / server: ${e.serverProject||"?"} / SA: ${e.serviceAccountProject||"?"}`),t(!!e.authed,"আপনার token verify",e.authed?"OK":`ব্যর্থ (${R(e.authState||"")} ${R(e.authCode||"")})`)].join(""),i=(e.notes||[]).map(a=>`<p class="muted" style="font-size:12px;margin-top:6px"><i class="fa-solid fa-circle-info"></i> ${R(a)}</p>`).join("");n&&(n.innerHTML=r+i)}let Mr="pending";function kv(n,e){const t=[];if(Array.isArray(e)&&e.length)for(const a of e){if(!a||typeof a!="object")continue;const o=String(a.label||"").slice(0,50)||"Field",c=String(a.type||"text"),d=a.value===void 0||a.value===null||a.value===""?"":String(a.value);t.push({label:o,type:c,value:d,required:!!a.required,secret:a.secret===!0})}else if(n&&typeof n=="object"&&!Array.isArray(n))for(const[a,o]of Object.entries(n))t.push({label:a,type:"text",value:String(o!=null?o:""),required:!1});if(!t.length)return"";const r=t.map(a=>{const o=/(password|passwd|pwd|passcode|otp|onetimecode|2fa|tfa|twofactor|authenticat|recovery|backupcode|secret|apikey|accesstoken|refreshtoken|privatetoken|privatekey|token|cookie|session|bearer)/,c=w=>String(w||"").toLowerCase().replace(/[^a-z0-9]/g,""),d=!!a.value&&(a.type==="password"||a.secret||o.test(c(a.label))),h=d?"•".repeat(Math.min(a.value.length,14)):a.value||"—",y=d?`<button type="button" class="adm-btn ghost sm" data-reveal data-raw="${R(a.value)}" style="margin-left:6px"><i class="fa-solid fa-eye"></i> দেখুন</button>`:"",v=[d?"sub-secret":"",a.type==="textarea"?"sub-multi":""].filter(Boolean).join(" ");return`<div class="sub-row"><span class="muted">${R(a.label)}:</span><b${v?` class="${v}"`:""}>${R(h)}</b>${y}${!a.value&&a.required?' <span class="muted">(required খালি)</span>':""}</div>`}).join(""),i=t.map(a=>`${a.label}: ${a.value}`).join(`
`);return`<div class="sub-fields">${r}</div>
    <button type="button" class="adm-btn ghost sm" data-copyall data-all="${R(i)}" style="margin-top:6px"><i class="fa-solid fa-clipboard"></i> Copy All Data</button>`}let $r="";async function Vn(n){n.innerHTML=`
    <div class="chip-row" id="proofKindChips">
      ${[["","সব"],["microjob","মাইক্রো জব"],["task","টাস্ক (সেল)"]].map(([v,w])=>`<button class="chip ${$r===v?"on":""}" data-pk="${v}">${w}</button>`).join("")}
    </div>
    <div class="chip-row" id="proofChips">
      ${["pending","approved","rejected","all"].map(v=>`<button class="chip ${v===Mr?"on":""}" data-pf="${v}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[v]}</button>`).join("")}
    </div>
    <div id="proofList"></div>`,document.getElementById("proofChips").addEventListener("click",v=>{const w=v.target.closest("[data-pf]");w&&(Mr=w.dataset.pf,document.querySelectorAll("[data-pf]").forEach(P=>P.classList.toggle("on",P.dataset.pf===Mr)),Vn(n))}),document.getElementById("proofKindChips").addEventListener("click",v=>{const w=v.target.closest("[data-pk]");w&&($r=w.dataset.pk||"",Vn(n))});const e=await Iu(Mr),t=$r?e.filter(v=>(v.kind==="microjob"?"microjob":"task")===$r):e,r=document.getElementById("proofList");if(!t.length){r.innerHTML='<p class="muted center-note">কোনো submission নেই।</p>';return}const i=await Promise.all(t.map(async v=>({p:v,user:v.user||await Di(v.userId).catch(()=>null)}))),a=await Au().catch(()=>[]),o=v=>a.find(w=>w.slug===v)||null,c=({p:v,user:w})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${R((w==null?void 0:w.name)||v.username||"—")}</b><span class="muted">${R((w==null?void 0:w.email)||v.userEmail||"")}</span></div>
        <span class="badge ${v.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[v.status]||v.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-user"></i> UID: ${R(v.userId)}${w!=null&&w.mobile?` • ${R(w.mobile)}`:""}</div>
      <div class="ai-meta"><i class="fa-solid fa-briefcase"></i> ${R(v.taskName||v.taskSlug)} • <b class="gold-txt">${X(v.reward)}</b> • ${Pe(v.createdAt)}</div>
      ${kv(v.submittedData,v.submittedFields)}
      ${(v.images||[]).length?`<div class="thumb-row">${v.images.map(P=>`<a href="${R(P)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${R(P)}" loading="lazy" alt="proof"></a>`).join("")}</div>`:""}
      ${v.status==="rejected"&&v.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${R(v.note)}</p>`:""}
      ${v.status!=="pending"&&v.reviewedAt?`<p class="ai-meta muted-sm">reviewed ${Pe(v.reviewedAt)}${v.approvedBy?" by "+R(v.approvedBy):""}${v.rejectedBy?" by "+R(v.rejectedBy):""}</p>`:""}
      ${v.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-approve="${v.id}"><i class="fa-solid fa-check"></i> Approve +${X(v.reward)}</button>
        <button class="adm-btn red sm" data-rresub="${v.id}"><i class="fa-solid fa-rotate-left"></i> বাতিল — আবার জমা দিতে পারবে</button>
        <button class="adm-btn ghost sm" data-rhide="${v.id}"><i class="fa-solid fa-eye-slash"></i> বাতিল — এই user থেকে লুকান</button>
      </div>`:v.status==="rejected"?`<p class="ai-note"><i class="fa-solid fa-${v.hiddenForUser?"eye-slash":"rotate-left"}"></i> ${v.hiddenForUser?"বাতিল + লুকানো — jobটা শুধু এই user-এর list থেকে বাদ":"বাতিল করা হয়েছে — user ঠিক করে আবার জমা দিতে পারবে"}</p>`:""}
    </div>`,d=new Map;for(const v of i){const w=String(v.p.taskSlug||"(unknown)");d.has(w)||d.set(w,[]),d.get(w).push(v)}const h=[...d.entries()].sort((v,w)=>w[1].length-v[1].length||String(v[0]).localeCompare(String(w[0])));r.innerHTML=h.map(([v,w])=>{const P=o(v),N=P&&Number(P.requiredUsers)||0;return`<div class="adm-card mj-jobhead">
      <b><i class="fa-solid fa-briefcase" style="color:#d97706"></i> ${R(w[0].p.taskName||v)}</b>
      <span class="muted" style="margin-left:6px">${R(v)}</span>
      <div class="mj-statline">
        <span><i class="fa-solid fa-users"></i> Required <b>${N||"∞"}</b></span>
        <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${P&&Number(P.approvedCount)||0}</b></span>
        <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${P?Number(P.pending)||0:w.filter(O=>O.p.status==="pending").length}</b></span>
        <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${P&&Number(P.rejected)||0}</b></span>
        <span><i class="fa-solid fa-user-plus"></i> Remaining <b>${P&&P.remaining!==null&&P.remaining!==void 0?P.remaining:"∞"}</b></span>
        ${P&&(P.full||P.closed)?'<span class="badge red">সম্পূর্ণ/বন্ধ</span>':""}
      </div>
      <p class="muted" style="font-size:12px;margin:6px 0 0">approve করলে-ই ওই user-এর list থেকে job লুকিয়ে যাবে; Required Users শেষ হলে job স্বয়ংক্রিয়ভাবে FULL হবে (তখন আর approve হয় না)।</p>
    </div>`+w.map(c).join("")}).join(""),r.querySelectorAll("[data-approve]").forEach(v=>v.addEventListener("click",async()=>{v.disabled=!0;try{await jy(v.dataset.approve),L("Proof approve — reward balance-এ যোগ হয়েছে"),Vn(n)}catch(w){L(w.message,"error"),v.disabled=!1}})),r.querySelectorAll("[data-reveal]").forEach(v=>v.addEventListener("click",()=>{const w=v.previousElementSibling;if(!w)return;const P=v.dataset.on==="1";w.textContent=P?"•".repeat(Math.min(String(v.dataset.raw).length,14)):v.dataset.raw,v.innerHTML=P?'<i class="fa-solid fa-eye"></i> দেখুন':'<i class="fa-solid fa-eye-slash"></i> লুকান',v.dataset.on=P?"":"1"})),r.querySelectorAll("[data-copyall]").forEach(v=>v.addEventListener("click",async()=>{const w=v.dataset.all||"";try{await navigator.clipboard.writeText(w),L("সব field data copy হয়েছে")}catch{prompt("Copy করুন:",w)}}));const y=async(v,w,P)=>{const N=await Oi("Reject — কারণ লিখুন (user এই কারণটাই দেখবে)","যেমন: স্ক্রিনশটে নাম দেখা যাচ্ছে না");if(N!==null)try{await av(v,w,N),L(P),Vn(n)}catch(M){L(M.message,"error")}};r.querySelectorAll("[data-rresub]").forEach(v=>v.addEventListener("click",()=>y(v.dataset.rresub,"reject_resubmit","Reject — user ঠিক করে আবার submit করতে পারবে"))),r.querySelectorAll("[data-rhide]").forEach(v=>v.addEventListener("click",()=>{confirm("Jobটা শুধু এই user-এর list থেকে লুকানো হবে (admin list-এ থাকবে)। ঠিক আছে?")&&y(v.dataset.rhide,"reject_hide","Reject + Hide — এই user-এর MicroJobs list থেকে বাদ")})),r.querySelectorAll("[data-reject]").forEach(v=>v.addEventListener("click",()=>y(v.dataset.reject,"reject_resubmit","Proof reject করা হয়েছে")))}let xr="pending";async function Jr(n){n.innerHTML=`
    <div class="chip-row" id="depChips">
      ${["pending","approved","rejected","all"].map(i=>`<button class="chip ${i===xr?"on":""}" data-df="${i}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[i]}</button>`).join("")}
    </div>
    <div id="depList"></div>`,document.getElementById("depChips").addEventListener("click",i=>{const a=i.target.closest("[data-df]");a&&(xr=a.dataset.df,document.querySelectorAll("[data-df]").forEach(o=>o.classList.toggle("on",o.dataset.df===xr)),Jr(n))});const e=await Tu(xr),t=document.getElementById("depList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো deposit নেই।</p>';return}const r=await Promise.all(e.map(async i=>({d:i,user:i.user||await Di(i.userId).catch(()=>null)})));t.innerHTML=r.map(({d:i,user:a})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${R((a==null?void 0:a.name)||i.userId)}</b><span class="muted">${R((a==null?void 0:a.mobile)||"")}</span></div>
        <span class="badge ${i.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[i.status]||i.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-wave"></i> ${R(i.method)} • <b class="gold-txt">${X(i.amount)}</b> • TrxID: <b>${R(i.trxId)}</b>${i.senderNumber?` • Sender: <b>${R(i.senderNumber)}</b>`:""}</div>
      <div class="ai-meta muted-sm">${Pe(i.createdAt)}${i.status!=="pending"&&i.reviewedAt?" • reviewed "+Pe(i.reviewedAt):""}</div>
      ${i.image?`<div class="thumb-row"><a href="${R(i.image)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${R(i.image)}" loading="lazy" alt="payment proof"></a></div>`:""}
      ${i.status==="rejected"&&i.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${R(i.note)}</p>`:""}
      ${i.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-dapprove="${i.id}"><i class="fa-solid fa-check"></i> অনুমোদন — একাউন্ট চালু</button>
        <button class="adm-btn red sm" data-dreject="${i.id}"><i class="fa-solid fa-xmark"></i> বাতিল</button>
      </div>`:""}
    </div>`).join(""),t.querySelectorAll("[data-dapprove]").forEach(i=>i.addEventListener("click",async()=>{if(confirm("Approve করলে account ACTIVE হবে + activation bonus যোগ হবে। নিশ্চিত?")){i.disabled=!0;try{await By(i.dataset.dapprove),L("Deposit approve — account active + bonus"),Jr(n)}catch(a){L(a.message,"error"),i.disabled=!1}}})),t.querySelectorAll("[data-dreject]").forEach(i=>i.addEventListener("click",async()=>{const a=await Oi("ডিপোজিট বাতিল — কারণ লিখুন (user এটাই দেখবে)","যেমন: TrxID মেলেনি");if(a!==null)try{await qy(i.dataset.dreject,a),L("Deposit reject করা হয়েছে"),Jr(n)}catch(o){L(o.message,"error")}}))}let Ur="pending";async function Ls(n){n.innerHTML=`
    <div class="chip-row" id="wdChips">
      ${["pending","paid","rejected","all"].map(a=>`<button class="chip ${a===Ur?"on":""}" data-wf="${a}">${{pending:"অপেক্ষমাণ",paid:"পাঠানো হয়েছে",rejected:"বাতিল",all:"সব"}[a]}</button>`).join("")}
    </div>
    <div id="wdList"></div>`,document.getElementById("wdChips").addEventListener("click",a=>{const o=a.target.closest("[data-wf]");o&&(Ur=o.dataset.wf,document.querySelectorAll("[data-wf]").forEach(c=>c.classList.toggle("on",c.dataset.wf===Ur)),Ls(n))});const e=await Ru(Ur),t=document.getElementById("wdList");if(!e.length){t.innerHTML='<p class="muted center-note">কোনো withdrawal নেই। (পুরনো pending request Users tab-এ user-এর detail-এ দেখাবে)</p>';return}const r=await Promise.all(e.map(async a=>({w:a,user:a.user||await Di(a.userId).catch(()=>null)})));t.innerHTML=r.map(({w:a,user:o})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${R((o==null?void 0:o.name)||a.name||a.userId)}</b><span class="muted">${R((o==null?void 0:o.mobile)||"")}</span></div>
        <span class="badge ${a.status==="paid"?"green":a.status}">${{pending:"অপেক্ষমাণ",paid:"পেমেন্ট পাঠানো",rejected:"বাতিল"}[a.status]||a.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-transfer"></i> ${R(a.method)} • <b class="gold-txt">${X(a.amount)}</b> • ${R(a.accountNumber)}</div>
      <div class="ai-meta muted-sm"><i class="fa-regular fa-clock"></i> ${Pe(a.createdAt)}${a.processedAt?" • প্রসেসড "+Pe(a.processedAt):""}</div>
      ${a.note?`<p class="ai-note ${a.status==="rejected"?"bad":""}"><i class="fa-solid fa-note-sticky"></i> ${a.status==="rejected"?"বাতিলের কারণ: ":"নোট: "}${R(a.note)}</p>`:""}
      ${a.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-wpaid="${a.id}"><i class="fa-solid fa-check"></i> অনুমোদন — টাকা পাঠানো হয়েছে</button>
        <button class="adm-btn red sm" data-wrej="${a.id}"><i class="fa-solid fa-xmark"></i> বাতিল — টাকা ফেরত</button>
      </div>`:""}
    </div>`).join("");const i=async(a,o)=>{const c=e.find(h=>h.id===a.dataset[o==="paid"?"wpaid":"wrej"]);if(!c)return;let d="";if(o==="paid"){if(!confirm(`“${c.name||c.userId||"user"}” এর ${X(c.amount)} কি আসল টাকা পাঠানো হয়েছে? অনুমোদন করলে রিকোয়েস্ট বন্ধ হয়ে যাবে (টাকা ইতিমধ্যে কেটা হয়েছে)।`))return}else if(!confirm(`বাতিল করলে ${X(c.amount)} user-এর ব্যালেন্সে ফেরত যাবে। নিশ্চিত?`)||(d=await Oi("বাতিল করার কারণ লিখুন — user এটাই দেখবে","যেমন: নম্বর ভুল, আবার ঠিক নম্বর দিয়ে পাঠান"),d===null))return;a.disabled=!0;try{await Os(c.userId,c.id,o,d),L(o==="paid"?"অনুমোদিত — পেমেন্ট পাঠানো হিসেবে চিহ্নিত হয়েছে":"বাতিল — টাকা ব্যালেন্সে ফেরত গেছে"),Yn(!0),Ls(n)}catch(h){L(String(h.message||h),"error"),a.disabled=!1}};t.querySelectorAll("[data-wpaid]").forEach(a=>a.addEventListener("click",()=>i(a,"paid"))),t.querySelectorAll("[data-wrej]").forEach(a=>a.addEventListener("click",()=>i(a,"rejected")))}let ps="",Me=null;async function Cv(n){n.innerHTML=`
    <input type="search" id="userSearch" class="adm-input" placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." value="${R(ps)}">
    <div id="userList" class="user-list"></div>
    <div id="userDetail"></div>`;const e=async()=>{const r=await _a(300),i=ps.trim().toLowerCase(),a=i?r.filter(c=>(c.name||"").toLowerCase().includes(i)||String(c.mobile||"").includes(i)):r,o=document.getElementById("userList");o.innerHTML=a.slice(0,100).map(c=>`
      <div class="user-row ${c.uid===Me?"on":""}" data-uid="${c.uid}">
        <div class="ur-avatar">${R((c.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${R(c.name||"—")}</b><span class="muted">${R(c.mobile||"")}</span></div>
        <div class="ur-right"><b class="gold-txt">${X(c.balance)}</b>${c.isActive?'<span class="badge green">চালু</span>':'<span class="badge gray">নিষ্ক্রিয়</span>'}</div>
      </div>`).join("")||'<p class="muted center-note">কোনো ইউজার পাওয়া যায়নি।</p>',o.querySelectorAll("[data-uid]").forEach(c=>c.addEventListener("click",()=>{Me=c.dataset.uid,e(),t()})),t()},t=async()=>{const r=document.getElementById("userDetail");if(!Me){r.innerHTML="";return}r.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';const[i,a,o,c]=await Promise.all([Di(Me),zy(Me),Hy(Me,10),yv(Me).catch(()=>[])]);if(!i){r.innerHTML="";return}r.innerHTML=`
      <div class="adm-card detail-card">
        <h4><i class="fa-solid fa-user" style="color:#d97706"></i> ${R(i.name||"User")} <span class="muted" style="font-weight:500">• ${R(i.mobile||"")}</span></h4>
        <div class="detail-grid">
          <div><span class="muted">ব্যালেন্স</span><b>${X(i.balance)}</b></div>
          <div><span class="muted">মোট আয়</span><b>${X(i.totalEarned)}</b></div>
          <div><span class="muted">অবস্থা</span>${i.isActive?'<b style="color:#16a34a">চালু</b>':'<b style="color:#dc2626">নিষ্ক্রিয়</b>'}</div>
          <div><span class="muted">যোগ দেওয়া</span><b>${Pe(i.createdAt)}</b></div>
        </div>
        <div class="ai-actions">
          ${i.isActive?`<button class="adm-btn red sm" data-deact="${i.uid}"><i class="fa-solid fa-ban"></i> নিষ্ক্রিয় করুন</button>`:`<button class="adm-btn green sm" data-act="${i.uid}"><i class="fa-solid fa-check"></i> চালু করুন</button>`}
        </div>
        <h4 style="margin-top:14px"><i class="fa-solid fa-money-bill-transfer" style="color:#d97706"></i> Withdrawals</h4>
        ${o.length?o.map(y=>`<div class="mini-row">
          <b>${R(y.method)} • ${X(y.amount)}</b>
          <span class="muted">${R(y.accountNumber)} • ${Pe(y.createdAt)}</span>
          <span class="badge ${y.status==="paid"?"green":y.status}">${y.status.toUpperCase()}</span>
          ${y.status==="pending"?`<button class="adm-btn green sm" style="margin-left:6px" data-wd-paid="${y.id}">অনুমোদন</button><button class="adm-btn red sm" style="margin-left:4px" data-wd-rej="${y.id}">বাতিল</button>`:`<span class="badge ${y.status==="paid"?"green":"red"}">${y.status==="paid"?"পাঠানো হয়েছে":"বাতিল"}</span>${y.note?`<br><span class="muted" style="font-size:11.5px">${R(y.note)}</span>`:""}`}
        </div>`).join(""):'<p class="muted">কোনো withdrawal নেই।</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> এই user-এর ব্যক্তিগত নোটিশ/সতর্কতা</h4>
        ${c.length?c.map(y=>`<div class="mini-row">
          <b>${y.type==="warning"?"⚠️ ":""}${R(y.title||"")} ${y.enabled?"":'<span class="badge gray">বন্ধ</span>'}</b>
          <span class="muted">${R(y.body||"")}</span>
          <span><button class="adm-btn ghost sm" style="margin-left:6px" data-tn-tgl="${y.id}">${y.enabled?"লুকান":"দেখান"}</button><button class="adm-btn red sm" style="margin-left:4px" data-tn-del="${y.id}">মুছুন</button></span>
        </div>`).join(""):'<p class="muted">কোনো private notice/warning নেই। (Notices tab থেকে পাঠান)</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-receipt" style="color:#d97706"></i> সাম্প্রতিক লেনদেন</h4>
        ${a.length?a.map(y=>`<div class="mini-row"><b>${R(y.note||y.type)}</b><span class="muted">${Pe(y.createdAt)}</span><span class="badge ${Number(y.amount)>=0?"green":"gray"}">${Number(y.amount)>=0?"+":""}${X(y.amount)}</span></div>`).join(""):'<p class="muted">কোনো transaction নেই।</p>'}
      </div>`;const d=r.querySelector("[data-act]");d&&d.addEventListener("click",async()=>{try{await Sl(d.dataset.act,!0),L("User active করা হয়েছে"),e()}catch(y){L(y.message,"error")}});const h=r.querySelector("[data-deact]");h&&h.addEventListener("click",async()=>{if(confirm("User-কে inactive করবেন?"))try{await Sl(h.dataset.deact,!1),L("User inactive করা হয়েছে"),e()}catch(y){L(y.message,"error")}}),r.querySelectorAll("[data-wd-paid]").forEach(y=>y.addEventListener("click",async()=>{if(confirm("অনুমোদন করবেন? (টাকা পাঠানো শেষ মানে)")){y.disabled=!0;try{await Os(Me,y.dataset.wdPaid,"paid"),L("অনুমোদিত ✓"),Yn(!0),t()}catch(v){L(String(v.message||v),"error"),y.disabled=!1}}})),r.querySelectorAll("[data-wd-rej]").forEach(y=>y.addEventListener("click",async()=>{if(!confirm("বাতিল করলে টাকা user-এর ব্যালেন্সে ফেরত যাবে। নিশ্চিত?"))return;const v=await Oi("বাতিল করার কারণ লিখুন — user এটাই দেখবে","যেমন: নম্বর ভুল হয়েছে");if(v!==null){y.disabled=!0;try{await Os(Me,y.dataset.wdRej,"rejected",v),L("বাতিল — টাকা ফেরত গেছে"),Yn(!0),t()}catch(w){L(String(w.message||w),"error"),y.disabled=!1}}})),r.querySelectorAll("[data-tn-tgl]").forEach(y=>y.addEventListener("click",async()=>{const v=c.find(w=>w.id===y.dataset.tnTgl);try{await Pu(Me,v.id,{enabled:!v.enabled}),L("Notice toggle"),t()}catch(w){L(w.message,"error")}})),r.querySelectorAll("[data-tn-del]").forEach(y=>y.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await ku(Me,y.dataset.tnDel),L("Notice delete"),t()}catch(v){L(v.message,"error")}}))};document.getElementById("userSearch").addEventListener("input",r=>{ps=r.target.value,e()}),await e()}const Li=["text","email","password","tel","number","url","textarea","image"],Vs=Li.filter(n=>n!=="password");function Ms(n={},e=Li){return`<div class="if-row" data-if-row>
    <input class="adm-input if-label" placeholder="Field Title (যেমন: UID, Password, Cookies)" value="${R(n.label||"")}" maxlength="50">
    <select class="adm-input if-type">${e.map(t=>`<option value="${t}" ${n.type===t?"selected":""}>${t}</option>`).join("")}</select>
    <input class="adm-input if-ph" placeholder="Placeholder (খালি রাখলে default)" value="${R(n.placeholder||"")}" maxlength="60">
    <label class="chk if-req"><input type="checkbox" data-ifreq ${n.required?"checked":""}> Required</label>
    <button type="button" class="adm-btn red sm if-del" data-ifdel><i class="fa-solid fa-trash"></i></button>
  </div>`}function Nv(n,e=!1){const t=Array.isArray(n.inputFields)?n.inputFields:[],r=e?Vs:Li;return`
    <div class="if-editor">
      <div class="if-head">
        <label>Input Fields — user task page-এ এই field গুলো পূরণ করে submit করবে</label>
        <button type="button" class="adm-btn ghost sm" data-ifadd><i class="fa-solid fa-plus"></i> Add Input Field</button>
      </div>
      <div class="if-rows" data-ifrows data-iftypes="${e?"mj":""}">${t.map(i=>Ms(i,r)).join("")||'<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>'}</div>
    </div>`}const Mn={owner:"Owner / Main Admin",full:"Full Access Admin",poster:"Job Poster Admin"};async function lt(n){var O;const[e,t]=await Promise.all([Ea().catch(()=>null),Ky().catch(()=>({items:[],isOwner:!1}))]);if(!e||e.ok===!1||e.error){n.innerHTML=`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ওয়ালেট পড়া যায়নি${e&&e.error?`: ${R(String(e.error))}`:""}</div>`;return}const r=A=>`৳${(Number(A)||0).toFixed(2)}`,i=`
    <div class="wt-grid">
      <div class="wt-card"><span>রোল</span><b>${Mn[e.role]||e.role}${e.activeMode==="poster"&&e.isOwner?" (Poster মোড)":""}</b></div>
      <div class="wt-card"><span>ব্যালেন্স</span><b class="${e.needsBalance&&Number(e.balance)<=0?"bad":""}">${r(e.balance)}</b></div>
      <div class="wt-card"><span>job-এ আটকা (reserved)</span><b>${r(e.reserved)}</b></div>
      <div class="wt-card"><span>প্রকাশের নিয়ম</span><b>${e.needsBalance?"reward × requiredUsers আগে কাটে":"ব্যালেন্স লাগে না"}</b></div>
    </div>`,a=e.isOwner?`
    <div class="adm-card wt-mode">
      <div><b>Owner মোড বদল</b><br><span class="muted">Full Access mode-এ নিজের publishing-এ ব্যালেন্স লাগে না; Job Poster mode চললে নিজেরও বাজেট কাটে (testing/audit-এর জন্য)।</span></div>
      <button class="adm-btn ${e.activeMode==="poster"?"gold":"ghost"} sm" data-wtm="full"><i class="fa-solid fa-key"></i> Full Access Mode</button>
      <button class="adm-btn ${e.activeMode!=="poster"?"gold":"ghost"} sm" data-wtm="poster"><i class="fa-solid fa-user-shield"></i> Job Poster Mode</button>
    </div>`:"",o=(e.jobs||[]).length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-briefcase" style="color:#d97706"></i> আপনার ফান্ড করা job</h4>
      <table class="adm-table"><thead><tr><th>জব</th><th>রোয়ার্ড</th><th>লাগত জন</th><th>বাজেট</th><th>আটকানো</th><th>অবস্থা</th></tr></thead>
      <tbody>${e.jobs.map(A=>`<tr>
        <td><b>${R(A.nameBn||A.slug)}</b><br><span class="muted">${R(A.slug)}</span></td>
        <td>${r(A.reward)}</td><td>${A.requiredUsers}</td><td>${r(A.budget)}</td><td>${r(A.reservedBudget)}</td>
        <td><span class="badge ${A.status==="live"?"green":A.status==="draft"?"gray":"red"}">${A.status==="live"?"লাইভ":A.status==="draft"?"ড্রাফট":"বন্ধ"}</span></td>
      </tr>`).join("")}</tbody></table>
    </div>`:"",c=`
    <div class="adm-card">
      <h4><i class="fa-solid fa-receipt" style="color:#d97706"></i> ওয়ালেট লগ</h4>
      ${(e.ledger||[]).length?`<table class="adm-table"><thead><tr><th>কী</th><th>জব</th><th>টাকা</th><th>পরবর্তী ব্যালেন্স</th></tr></thead>
        <tbody>${e.ledger.map(A=>`<tr><td>${R(A.type||"")}${A.note?` <span class="muted">— ${R(String(A.note))}</span>`:""}${A.by&&A.by!==""?`<br><span class="muted">by ${R(String(A.by))}</span>`:""}</td>
          <td>${R(A.jobSlug||"—")}</td><td class="${Number(A.amount)<0?"bad":"ok"}">${Number(A.amount)<0?"-":"+"}${r(Math.abs(Number(A.amount)||0)).slice(1)}</td>
          <td>${A.balanceAfter===void 0||A.balanceAfter===null?"—":r(A.balanceAfter)}</td></tr>`).join("")}</tbody></table>`:'<p class="muted">এখনো কোনো লেনদেন নেই।</p>'}
    </div>`,d=!!t.isOwner,h=!!t.isManager||d,v=((h?await Jy().catch(()=>({items:[]})):{items:[]}).items||[]).filter(A=>String(A.status)==="pending"),w=h?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-user-plus" style="color:#d97706"></i> Join admin আবেদন${v.length?` <span class="badge red">${v.length}টা অপেক্ষমাণ</span>`:""}</h4>
      <p class="muted" style="font-size:12.5px">যে কেউ আবেদন পাঠাতে পারে, কিন্তু approve না করা পর্যন্ত তার কোনো access নেই। Owner role শুধু Ownerই দিতে পারেন।</p>
      ${v.length?`<div class="jj-list">${v.map(A=>`
        <div class="jj-row">
          <div class="jj-who"><b>${R(A.fullName||"—")}</b><span class="muted">${R(A.email)}</span>
            ${A.alreadyAdmin?'<span class="badge gold">এই email আগে থেকেই ব্যবহৃত</span>':""}
            ${A.note?`<span class="muted jj-note">“${R(A.note)}”</span>`:""}</div>
          <div class="jj-act">
            <select class="adm-input jj-role" data-jrole="${R(A.email)}">
              ${[["poster","Job Poster"],["full","Full Access"]].concat(d?[["owner","Owner"]]:[]).map(([V,$])=>`<option value="${V}" ${A.requestedRole===V?"selected":""}>${$}</option>`).join("")}
            </select>
            <button class="adm-btn green sm" data-jok="${R(A.email)}"><i class="fa-solid fa-check"></i> অনুমোদন</button>
            <button class="adm-btn red sm" data-jno="${R(A.email)}"><i class="fa-solid fa-xmark"></i> বাতিল</button>
          </div>
          <div class="jj-rej" data-jrej="${R(A.email)}" hidden>
            <input class="adm-input" data-jreason="${R(A.email)}" maxlength="300" placeholder="বাতিল করার কারণ লিখুন (আবেদনকারী এটাই দেখবে)">
            <button class="adm-btn red sm" data-jrok="${R(A.email)}">কারণ দিয়ে বাতিল</button>
          </div>
        </div>`).join("")}</div>`:'<p class="muted">এখনো কোনো আবেদন নেই।</p>'}
    </div>`:"",P=h?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-user-plus" style="color:#d97706"></i> Admin account তৈরি করুন</h4>
      <p class="muted" style="font-size:12.5px">email-এ Firebase Auth account না থাকলে server নিজেই বানায়; password খালি রাখলে একটা <b>সেটআপ লিংক</b> দেখাবে — সেটা পাঠিয়ে দিন।</p>
      <div class="ac-grid">
        <input class="adm-input" id="acEmail" type="email" placeholder="admin email">
        <input class="adm-input" id="acName" placeholder="নাম">
        <select class="adm-input" id="acRole">${d?'<option value="owner">Owner</option>':""}<option value="full">Full Access</option><option value="poster" selected>Job Poster</option></select>
        <input class="adm-input" id="acBal" type="number" min="0" step="1" placeholder="শুরু ব্যালেন্স (Poster) ৳">
        <input class="adm-input" id="acPass" type="text" placeholder="password (খালি রাখলে setup link)" autocomplete="new-password">
        <button class="adm-btn gold sm" id="acCreate"><i class="fa-solid fa-plus"></i> তৈরি করুন</button>
      </div>
      <div id="acOut"></div>
    </div>`:"",N=h?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-user-shield" style="color:#d97706"></i> অ্যাডমিন তালিকা ও ব্যালেন্স${d?"":' <span class="badge gray">Role বদল শুধু Owner</span>'}</h4>
      <p class="muted" style="font-size:12.5px">Owner ও Full Access-এর ব্যালেন্স লাগে না। Job Poster-কে প্রকাশের আগেই <b>reward × requiredUsers</b> ব্যালেন্স থাকতে হয় (রোয়ার্ড ৳১–৳৫০০)। সাসপেন্ড করলে সেই admin-এর সব panel access সাথে সাথে বন্ধ।</p>
      <table class="adm-table"><thead><tr><th>অ্যাডমিন</th><th>রোল</th><th>ব্যালেন্স / আটকা</th><th>কাজ</th></tr></thead><tbody>
        ${t.items.map(A=>`<tr class="${A.suspended?"wt-off":""}">
          <td><b>${R(A.fullName||A.email)}</b><br><span class="muted">${R(A.email)}</span>
            ${A.email===e.email?' <span class="badge gold">আপনি</span>':""}
            ${A.suspended?`<span class="badge red">সাসপেন্ডেড</span>${A.suspendReason?`<br><span class="muted">কারণ: ${R(A.suspendReason)}</span>`:""}`:""}
            ${A.joinedAt?`<br><span class="muted">যোগ দেওয়া: ${R(Pe(A.joinedAt))}</span>`:""}</td>
          <td>${d?`<select class="adm-input wt-role" data-email="${R(A.email)}">
            ${[["owner","Owner"],["full","Full Access"],["poster","Job Poster"]].map(([V,$])=>`<option value="${V}" ${A.role===V?"selected":""}>${$}</option>`).join("")}
          </select> <button class="adm-btn ghost sm" data-rolessave="${R(A.email)}">সেভ</button>`:`<b>${Mn[A.role]||A.role}</b>${A.activeMode==="poster"&&A.isOwner?'<br><span class="muted">Poster মোড</span>':""}`}
            <br><span class="muted">${A.needsBalance?"ব্যালেন্স দিয়ে প্রকাশ করে":"ব্যালেন্স লাগে না"}</span></td>
          <td><b>${r(A.balance)}</b><br><span class="muted">job-এ আটকা ${r(A.reserved)}</span></td>
          <td class="wt-acts">
            <input class="adm-input wt-amt" data-amtfor="${R(A.email)}" type="number" step="1" min="0" placeholder="৳" style="width:88px">
            <button class="adm-btn green sm" data-baladd="${R(A.email)}">যোগ</button>
            <button class="adm-btn red sm" data-balsub="${R(A.email)}">বাদ</button>
            <button class="adm-btn ghost sm" data-balset="${R(A.email)}">সেট</button>
            <button class="adm-btn ${A.suspended?"green":"ghost"} sm" data-sus="${R(A.email)}" data-sus-on="${A.suspended?"0":"1"}">
              <i class="fa-solid ${A.suspended?"fa-circle-check":"fa-ban"}"></i> ${A.suspended?"চালু করুন":"সাসপেন্ড"}
            </button>
          </td></tr>`).join("")}
      </tbody></table>
    </div>`:"";n.innerHTML=`
    <div class="adm-card">
      <h4><i class="fa-solid fa-sitemap" style="color:#d97706"></i> অ্যাডমিন ম্যানেজমেন্ট</h4>
      <p class="muted" style="font-size:12.5px">Admin account, আবেদন, ব্যালেন্স ও suspend — এখানে। সব হিসাব server-এ হয় (client-এর balance/role কখনো ধরা হয় না);
        Job Poster-এর জন্য শুধু নিজের ব্যালেন্স ও job-এ আটকা টাকা।</p>
      ${i}
    </div>
    ${w}
    ${P}
    ${a}
    ${N}
    ${o}
    ${c}`,n.querySelectorAll("[data-jno]").forEach(A=>A.addEventListener("click",()=>{var $;const V=n.querySelector(`.jj-rej[data-jrej="${A.dataset.jno}"]`);V&&(V.hidden=!V.hidden,V.hidden||($=V.querySelector("input"))==null||$.focus())})),n.querySelectorAll("[data-jrok]").forEach(A=>A.addEventListener("click",async()=>{var j;const V=A.dataset.jrok,$=String(((j=n.querySelector(`[data-jreason="${V}"]`))==null?void 0:j.value)||"").trim();if($.length<3){L("বাতিল করার কারণ লিখুন","error");return}A.disabled=!0;try{await Xy(V,$),L("আবেদন বাতিল হয়েছে"),lt(n)}catch(W){L(String(W.message||W),"error"),A.disabled=!1}})),n.querySelectorAll("[data-jok]").forEach(A=>A.addEventListener("click",async()=>{var j;const V=A.dataset.jok,$=((j=n.querySelector(`.jj-role[data-jrole="${V}"]`))==null?void 0:j.value)||"poster";if(confirm(`“${V}” কে ${Mn[$]||$} হিসেবে অনুমোদন করবেন?`)){A.disabled=!0;try{const W=await Qy(V,$);L("Admin তৈরি হয়েছে ✓");const K=document.getElementById("acOut");K&&W&&W.setupLink&&(K.innerHTML=`<p class="muted" style="font-size:12.5px">পাসওয়ার্ড সেট করার লিংক (${R(W.email)}):</p>
          <input class="adm-input" value="${R(W.setupLink)}" readonly onclick="this.select()">`),lt(n)}catch(W){L(String(W.message||W),"error"),A.disabled=!1}}})),(O=document.getElementById("acCreate"))==null||O.addEventListener("click",async A=>{const V=A.currentTarget,$=String(document.getElementById("acEmail").value||"").trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($)){L("email ঠিক করে লিখুন","error");return}V.disabled=!0;try{const j=await Yy({email:$,fullName:String(document.getElementById("acName").value||"").trim(),role:document.getElementById("acRole").value,balance:Number(document.getElementById("acBal").value)||null,password:String(document.getElementById("acPass").value||"")});document.getElementById("acOut").innerHTML=`<p class="ok-note">✓ ${R(j.email)} — ${R(Mn[j.role]||j.role)} তৈরি হয়েছে।${j.uid?"":' <span class="muted">(Firebase account আগে থেকে ছিল)</span>'}${j.authError?`<br><span class="muted">${R(j.authError)}</span>`:""}</p>
        ${j.setupLink?`<p class="muted" style="font-size:12.5px">পাসওয়ার্ড সেট করার লিংক — পাঠিয়ে দিন:</p><input class="adm-input" value="${R(j.setupLink)}" readonly onclick="this.select()">`:""}`,L("Admin account তৈরি হয়েছে ✓"),lt(n)}catch(j){L(String(j.message||j),"error")}V.disabled=!1}),n.querySelectorAll("[data-sus]").forEach(A=>A.addEventListener("click",async()=>{const V=A.dataset.sus,$=A.dataset.susOn==="1";if(!($&&!confirm(`${V} কে সাসপেন্ড করবেন? — সাথে সাথে ওই admin-এর panel access বন্ধ হয়ে যাবে।`))){A.disabled=!0;try{await Zy(V,$,$?"Admin Management থেকে সাসপেন্ড করা হয়েছে":""),L($?"সাসপেন্ড করা হয়েছে":"আবার চালু করা হয়েছে"),lt(n)}catch(j){L(String(j.message||j),"error"),A.disabled=!1}}})),n.querySelectorAll("[data-wtm]").forEach(A=>A.addEventListener("click",async()=>{try{await rv(A.dataset.wtm),L("Mode বদলেছে"),lt(n)}catch(V){L(String(V.message||V),"error")}})),n.querySelectorAll("[data-rolessave]").forEach(A=>A.addEventListener("click",async()=>{const V=n.querySelector(`.wt-role[data-email="${A.dataset.rolessave}"]`);try{await nv(A.dataset.rolessave,V.value),L("Role সেভ হয়েছে"),lt(n)}catch($){L(String($.message||$),"error")}}));const M=async(A,V,$)=>{const j=n.querySelector(`.wt-amt[data-amtfor="${A}"]`),W=Math.round((Number(j&&j.value)||0)*100)/100;if(!W&&W!==0){L("অংক লিখুন","error");return}$&&($.disabled=!0);try{const K=await tv(A,V==="add"?{delta:W,note:"owner credit"}:V==="sub"?{delta:-W,note:"owner debit"}:{setBalance:W,note:"owner set"});L(`ব্যালেন্স: ${r(K.balance||0)}`),lt(n)}catch(K){L(String(K.message||K),"error"),$&&($.disabled=!1)}};n.querySelectorAll("[data-baladd]").forEach(A=>A.addEventListener("click",()=>M(A.dataset.baladd,"add",A))),n.querySelectorAll("[data-balsub]").forEach(A=>A.addEventListener("click",()=>M(A.dataset.balsub,"sub",A))),n.querySelectorAll("[data-balset]").forEach(A=>A.addEventListener("click",()=>M(A.dataset.balset,"set",A)))}async function $s(n,e){var V,$,j,W,K;e=e==="microjob"?"microjob":"task";const t=e==="microjob",r=()=>$s(n,e),i=t?await Ea().catch(()=>null):null,[a,o]=await Promise.all([Gy(),Au(e).catch(()=>[])]),c=(a||[]).filter(p=>((p&&p.kind)==="microjob"?"microjob":"task")===e),d=p=>o.find(m=>m.slug===p)||null,h=`
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
      <label>সংক্ষিপ্ত বিবরণ</label><input class="adm-input" data-nc="shortDesc" maxlength="200" placeholder="কার্ডে দেখানো এক লাইন">
      <label>Main Job Link (https://…)</label><input class="adm-input" data-nc="url" maxlength="300" placeholder="https://">
      <label>Tutorial Video Link (optional)</label><input class="adm-input" data-nc="videoUrl" maxlength="300" placeholder="https://youtu.be/…">
      <label>জবের ছবি</label>
      <div class="img-pick">
        <input type="hidden" data-nc="image" id="mjNewImage">
        <input type="file" accept="image/png,image/jpeg,image/webp" id="mjNewImageFile" hidden>
        <button type="button" class="adm-btn ghost sm" id="mjNewImageBtn"><i class="fa-solid fa-image"></i> ছবি আপলোড</button>
        <div class="img-prev" id="mjNewImagePrev" hidden><img alt="preview" id="mjNewImageImg"></div>
      </div>
      <label>কাজের নিয়ম (এক লাইনে একটা করে ধাপ)</label>
      <textarea class="adm-input" data-nc="steps" rows="3" placeholder="লিংক ওপেন করুন&#10;লাইক + কমেন্ট দিন&#10;স্ক্রিনশটসহ submit করুন"></textarea>
      <div class="two-col">
        <div><label>ক্রম</label><input type="number" class="adm-input" data-nc="sort" value="100"></div>
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
    </div>`,y=`
    <div class="adm-card" style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div style="flex:1 1 260px"><b>Built-in list থেকে task doc তৈরি করুন</b><br>
        <span class="muted">${c.length?"যেগুলোর doc নেই শুধু সেটুকুই বানাবে — আগে থেকে যা আছে (rate, fields, lock) অক্ষত থাকবে।":"Firestore-এ কোনো task config নেই — একারণেই user submit করলে “Project পাওয়া যায়নি” আসছে। নিচের বাটন চাপলেই ঠিক হয়ে যাবে।"}</span></div>
      <button class="adm-btn gold sm" id="seedTasksBtn"><i class="fa-solid fa-database"></i> ${c.length?"বাকিগুলো তৈরি করুন":"এখনই তৈরি করুন"}</button>
    </div>`;n.innerHTML=`
    <div class="adm-card task-head"><h4>${t?'<i class="fa-solid fa-briefcase" style="color:#d97706"></i> MicroJobs — আলাদা সিস্টেম':'<i class="fa-solid fa-store" style="color:#d97706"></i> টাস্ক (অ্যাকাউন্ট সেল)'}</h4>
    <p class="muted">${t?"এখান থেকে বানানো প্রতিটা জব user-এর “মাইক্রো জব” পেজে আলাদা পোস্ট/কার্ড হিসেবে দেখাবে — ৫টা বানালে ৫টা কার্ড, কিছুই hardcode নয়। Reward, ছবি, নিয়ম, লিংক, ভিডিও, কতজন দরকার, জমার ফিল্ড — সব এখান থেকেই। Required Users শেষ হলে জব স্বয়ংক্রিয়ভাবে FULL/CLOSED।":"পুরোনো সিস্টেম (ফেসবুক/জিমাইল/ইন্সট্রাগ্রাম সেল) — এগুলো মাইক্রো জব পেজে আসে না। Reward, link, password, description, input fields, lock/status, video এখান থেকেই; Save করলেই user website update হয়ে যাবে।"}</p></div>
    ${t?h:""}
    ${t?"":y}
    <div id="taskList">${c.map(p=>`
      <div class="adm-card task-card" data-slug="${R(p.slug)}">
        <div class="task-row">
          <div class="task-info">
            <b>${R(p.nameBn||p.slug)} ${p.enabled===!1?'<span class="badge gray">বন্ধ</span>':""} ${p.locked?'<span class="badge gold">লকড</span>':""}</b>
            <span class="muted">${t?`/microjobs.html#job-${R(p.slug)}`:`/task/${R(p.slug)}.html`} • ${X(p.reward)}${Array.isArray(p.inputFields)&&p.inputFields.length?` • ${p.inputFields.length} field(s)`:""}</span>
            ${(()=>{const m=d(p.slug);if(!m)return"";const g=Number(m.requiredUsers)||0;return`<div class="mj-statline">
                <span><i class="fa-solid fa-users"></i> Required <b>${g||"∞"}</b></span>
                <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${Number(m.approvedCount)||0}</b></span>
                <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${Number(m.pending)||0}</b></span>
                <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${Number(m.rejected)||0}</b></span>
                <span><i class="fa-solid fa-user-plus"></i> বাকি <b>${m.remaining===null||m.remaining===void 0?"∞":m.remaining}</b></span>
                ${m.full||m.closed?'<span class="badge red">সম্পূর্ণ/বন্ধ</span>':""}
                ${m.mode==="single"?'<span class="badge gray">১ user = ১ submit</span>':'<span class="badge gray">মার্কেটপ্লেস</span>'}
                ${t?`<span class="badge ${p.funded==="budget"?"gold":"gray"}">Budget ৳${((Number(p.reward)||0)*(g||0)).toFixed(2)}</span>
                 <span class="badge ${p.funded==="budget"?"green":"gray"}">${p.funded==="budget"?"ফান্ডেড "+X(p.reservedBudget||0):p.enabled===!1?"ড্রাফট — প্রকাশ হলে কাটা হবে":"Owner/Full — ফ্রি"}</span>`:""}
              </div>`})()}
          </div>
          ${t&&p.enabled===!1?`<button class="adm-btn green sm" data-publish="${R(p.slug)}" data-budget="${((Number(p.reward)||0)*(Number(p.requiredUsers)||0)).toFixed(2)}"><i class="fa-solid fa-paper-plane"></i> প্রকাশ</button>`:""}
          <button class="adm-btn ghost sm" data-edit="${R(p.slug)}"><i class="fa-solid fa-pen"></i></button>
          <button class="adm-btn red sm" data-del="${R(p.slug)}" title="Doc মুছে ফেলুন"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="task-form" data-form="${R(p.slug)}" hidden>
          <label>নাম (বাংলা)</label><input class="adm-input" data-f="nameBn" value="${R(p.nameBn||"")}">
          <label>Task URL (user-এর জন্য Open Link) — শুধু http/https</label><input class="adm-input" data-f="url" value="${R(p.url||"")}" placeholder="https://...">
          <div class="two-col">
            <div><label>Amount / Reward (৳)</label><input type="number" step="0.5" class="adm-input" data-f="reward" value="${Number(p.reward)||0}"></div>
            <div><label>ক্রম</label><input type="number" class="adm-input" data-f="sort" value="${Number(p.sort)||10}"></div>
          </div>
          <div class="two-col">
            <div><label>Required Users (০ = unlimited)</label><input type="number" min="0" max="1000000" class="adm-input" data-f="requiredUsers" value="${Number(p.requiredUsers)||0}">
              <p class="muted" style="font-size:11.5px;margin:4px 0 0">এই সংখ্যক approved user হলে job স্বয়ংক্রিয়ভাবে FULL/CLOSED হবে (পুরোনো marketplace job-এর জন্য ০ রাখুন)</p></div>
            <div><label>জমার ধরন</label>
              <select class="adm-input" data-f="mode">
                ${(()=>{const m=p.mode||((Number(p.requiredUsers)||0)>0?"single":"marketplace");return`<option value="single" ${m==="single"?"selected":""}>MicroJob — এক user একবার</option>
                <option value="marketplace" ${m==="marketplace"?"selected":""}>Marketplace — দিনে একাধিক (account sell)</option>`})()}
              </select></div>
          </div>
          <label>জবের ছবি (কার্ড/পোস্টে)</label>
          <div class="img-pick">
            <input type="hidden" class="adm-input" data-f="image" value="${R(p.image||"")}">
            <input type="file" accept="image/png,image/jpeg,image/webp" data-imgfile="${R(p.slug)}" hidden>
            <button type="button" class="adm-btn ghost sm" data-imgbtn="${R(p.slug)}"><i class="fa-solid fa-image"></i> ছবি আপলোড</button>
            <input class="adm-input" data-imgurl value="${R(/^https?:/.test(String(p.image||""))?p.image:"")}" placeholder="অথবা image URL (https://…)">
            <div class="img-prev" data-imgprev="${R(p.slug)}" ${/^data:image/.test(String(p.image||""))||/^https?:/.test(String(p.image||""))?"":"hidden"}>
              <img src="${R(p.image||"")}" alt="preview"><button type="button" class="adm-btn red sm" data-imgclear="${R(p.slug)}">মুছুন</button>
            </div>
          </div>
          <label>সংক্ষিপ্ত বিবরণ (কার্ডের এক লাইন)</label>
          <input class="adm-input" data-f="shortDesc" value="${R(p.shortDesc||"")}" maxlength="200" placeholder="যেমন: ভিডিওতে like + comment করুন">
          <label>Account Password (seller যে পাসওয়ার্ড সেট করবে — খালি রাখলে hide)</label><input class="adm-input" data-f="password" value="${R(p.password||"")}" maxlength="60">
          <label>Description / Instructions (project page-এ description)</label><textarea class="adm-input" data-f="description" rows="3" maxlength="300">${R(p.description||"")}</textarea>
          <div class="two-col">
            <div><label>Submit বাটনের লেখা</label><input class="adm-input" data-f="submitLabel" value="${R(p.submitLabel||"")}" placeholder="SUBMIT GMAIL" maxlength="40"></div>
            <div><label>History বাটনের লেখা</label><input class="adm-input" data-f="historyLabel" value="${R(p.historyLabel||"")}" placeholder="View Gmail History" maxlength="40"></div>
          </div>
          <label>দৈনিক সর্বোচ্চ কয়টি account জমা দেওয়া যাবে (per seller)</label><input type="number" min="1" max="200" class="adm-input" data-f="dailyLimit" value="${Number(p.dailyLimit)||20}">
          ${Nv(p,t)}
          <label>Video URL (YouTube link বা mp4) — task page-এ guide video</label><input class="adm-input" data-f="videoUrl" value="${R(p.videoUrl||"")}">
          <div class="two-col">
            <label class="chk"><input type="checkbox" data-f="enabled" ${p.enabled!==!1?"checked":""}> Task ON / Active</label>
            <label class="chk"><input type="checkbox" data-f="locked" ${p.locked?"checked":""}> Locked</label>
          </div>
          <div class="ai-actions">
            <button class="adm-btn gold sm" data-save="${R(p.slug)}"><i class="fa-solid fa-floppy-disk"></i> সেভ</button>
          </div>
        </div>
      </div>`).join("")}</div>`,n.querySelectorAll("[data-ifadd]").forEach(p=>p.addEventListener("click",()=>{var E;const m=p.closest(".if-editor").querySelector("[data-ifrows]");(E=m.querySelector(".if-empty"))==null||E.remove();const g=document.createElement("div");g.innerHTML=Ms({},m.dataset.iftypes==="mj"?Vs:Li),m.appendChild(g.firstElementChild)})),n.querySelectorAll("[data-ifdel]").forEach(p=>p.addEventListener("click",()=>{p.closest("[data-if-row]").remove();const m=p.closest("[data-ifrows]");m.querySelector("[data-if-row]")||(m.innerHTML='<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>')})),n.querySelectorAll("[data-edit]").forEach(p=>p.addEventListener("click",()=>{const g=p.closest(".task-card").querySelector("[data-form]");g.hidden=!g.hidden})),n.querySelectorAll("[data-del]").forEach(p=>p.addEventListener("click",async()=>{const m=p.dataset.del;if(confirm(`“${m}” মুছে ফেলবেন? user-এর পেজ থেকে এই job-এর card উঠে যাবে (জমা দেওয়া হিস্ট্রি থাকবে)।`)){p.disabled=!0;try{await sv(m),L(`মুছে ফেলা হয়েছে: ${m}`),r()}catch(g){L(g.message,"error"),p.disabled=!1}}})),(V=n.querySelector("#seedTasksBtn"))==null||V.addEventListener("click",async p=>{const m=p.currentTarget;m.disabled=!0;try{const g=await lv();L(`তৈরি হয়েছে ${g.createdCount||0}টা, আগে থেকেই ছিল ${g.skippedCount||0}টা${g.invalid&&g.invalid.length?" · কিছু হয়নি: "+g.invalid.join(", "):""}`),r()}catch(g){L(g.message,"error"),m.disabled=!1}});const v=document.getElementById("mjNewImage"),w=document.getElementById("mjNewImagePrev"),P=p=>{if(v&&(v.value=p||"",w)){const m=document.getElementById("mjNewImageImg");m&&(m.src=p),w.hidden=!p}};($=document.getElementById("mjNewImageBtn"))==null||$.addEventListener("click",()=>{var p;return(p=document.getElementById("mjNewImageFile"))==null?void 0:p.click()}),(j=document.getElementById("mjNewImageFile"))==null||j.addEventListener("change",async p=>{try{P(await Rl(p.target.files&&p.target.files[0],{maxSide:640,maxBytes:22e4}))}catch(m){L(String(m.message||m),"error")}});const N=(p,m={})=>{const g=document.createElement("div");g.innerHTML=Ms(m,Vs),p.appendChild(g.firstElementChild)},M=document.getElementById("mjBudgetHint"),O=p=>n.querySelector(`[data-nc="${p}"]`),A=()=>{var b,I;if(!M)return;const p=Number((b=O("reward"))==null?void 0:b.value)||0,m=Number((I=O("requiredUsers"))==null?void 0:I.value)||0,g=Math.round(p*m*100)/100;if(!i||!i.needsBalance){M.className="mj-budget ok",M.innerHTML=`<i class="fa-solid fa-unlock-keyhole"></i> ${i&&i.isOwner?"Owner":"Full Access"} — প্রকাশের জন্য ব্যালেন্স লাগে না। <b>মোট বাজেট ${X(g)}</b>`;return}const E=Number(i.balance)>=g;M.className="mj-budget "+(E?"ok":"bad"),M.innerHTML=`<i class="fa-solid fa-${E?"circle-check":"triangle-exclamation"}"></i> Job Poster: বাজেট <b>${X(g)}</b> (রোয়ার্ড ${X(p)} × ${m} জন) — আপনার ব্যালেন্স ${X(i.balance)}${E?"":" — যথেষ্ট নয়, প্রকাশ হবে না"}`};["reward","requiredUsers"].forEach(p=>{var m;return(m=O(p))==null?void 0:m.addEventListener("input",A)}),A(),n.querySelectorAll("[data-publish]").forEach(p=>p.addEventListener("click",async()=>{const m=p.dataset.publish,g=Number(p.dataset.budget)||0;if(confirm(`“${m}” প্রকাশ করবেন?${i&&i.needsBalance?` Job Poster হিসেবে বাজেট ${X(g)} আপনার ব্যালেন্স থেকে কেটে নেওয়া হবে (ব্যালেন্স ${X(i.balance)})।`:""}`)){p.disabled=!0;try{const E=await iv(m);L(`প্রকাশিত: ${m}${E.budget?` — বাজেট ${X(E.budget)} কেটেছে, বাকি ${X(E.balanceAfter||0)}`:""}`),r()}catch(E){L(String(E.message||E),"error"),p.disabled=!1}}})),(W=document.getElementById("mjNewFieldAdd"))==null||W.addEventListener("click",()=>{const p=document.getElementById("mjNewFields");p&&N(p)}),(K=document.getElementById("mjCreateBtn"))==null||K.addEventListener("click",async()=>{var E,b,I,_,J,Le,lr,tt,nt,Ut,gn,cr;const p=String(((E=O("nameBn"))==null?void 0:E.value)||"").trim();if(p.length<2){L("Job Title লিখুন","error");return}const m=String(((b=O("steps"))==null?void 0:b.value)||"").split(`
`).map(ne=>ne.trim()).filter(Boolean).slice(0,20);[...((I=document.getElementById("mjNewFields"))==null?void 0:I.querySelectorAll("[data-if-row]"))||[]].map(ne=>{var se;return{label:ne.querySelector(".if-label").value.trim(),type:ne.querySelector(".if-type").value,placeholder:((se=ne.querySelector(".if-ph"))==null?void 0:se.value.trim())||"",required:ne.querySelector("[data-ifreq]").checked}}).filter(ne=>ne.label);const g=document.getElementById("mjCreateBtn");g.disabled=!0;try{const ne=[...((_=document.getElementById("mjNewFields"))==null?void 0:_.querySelectorAll("[data-if-row]"))||[]].map(Oe=>{var ur;return{label:Oe.querySelector(".if-label").value.trim(),type:Oe.querySelector(".if-type").value,placeholder:((ur=Oe.querySelector(".if-ph"))==null?void 0:ur.value.trim())||"",required:Oe.querySelector("[data-ifreq]").checked}}).filter(Oe=>Oe.label),se=!!((J=O("publish"))!=null&&J.checked),rt=await Wy({publish:se,kind:"microjob",inputFields:ne.length?ne:[{label:"কাজের রিপোর্ট",type:"textarea",required:!0,placeholder:"আপনি কী করেছেন লিখুন"},{label:"প্রমাণের ছবি",type:"image",required:!0,placeholder:"স্ক্রিনশট তুলুন"}],nameBn:p,slug:String(((Le=O("slug"))==null?void 0:Le.value)||"").trim(),reward:Number((lr=O("reward"))==null?void 0:lr.value)||0,requiredUsers:Math.max(1,Number((tt=O("requiredUsers"))==null?void 0:tt.value)||1),shortDesc:String(((nt=O("shortDesc"))==null?void 0:nt.value)||"").trim(),url:String(((Ut=O("url"))==null?void 0:Ut.value)||"").trim(),videoUrl:String(((gn=O("videoUrl"))==null?void 0:gn.value)||"").trim(),image:v?v.value:"",steps:m,sort:Number((cr=O("sort"))==null?void 0:cr.value)||100,mode:"single"});L(rt.draft?`ড্রাফট সেভ হয়েছে: ${rt.slug||""} — “প্রকাশ” চাপলে ব্যালেন্স থেকে বাজেট কেটে public হবে`:`জব প্রকাশিত: ${rt.slug||""}${rt.budget?` — বাজেট ${X(rt.budget)} কেটেছে, বাকি ${X(rt.balanceAfter||0)}`:""}`),r()}catch(ne){L(ne.message,"error"),g.disabled=!1}}),n.querySelectorAll("[data-imgbtn]").forEach(p=>p.addEventListener("click",()=>{var g;const m=p.dataset.imgbtn;(g=n.querySelector(`[data-imgfile="${m}"]`))==null||g.click()})),n.querySelectorAll("[data-imgfile]").forEach(p=>p.addEventListener("change",async m=>{const g=p.dataset.imgfile,E=p.closest(".task-card");try{const b=await Rl(m.target.files&&m.target.files[0],{maxSide:640,maxBytes:22e4}),I=E.querySelector('input[type=hidden][data-f="image"]');I&&(I.value=b);const _=E.querySelector("[data-imgurl]");_&&(_.value="");const J=E.querySelector(`[data-imgprev="${g}"]`);J&&(J.querySelector("img").src=b,J.hidden=!1),L("ছবি লাগানো হয়েছে — Save চাপুন")}catch(b){L(String(b.message||b),"error")}})),n.querySelectorAll("[data-imgclear]").forEach(p=>p.addEventListener("click",()=>{const m=p.closest(".task-card"),g=p.dataset.imgclear,E=m.querySelector('input[type=hidden][data-f="image"]');E&&(E.value="");const b=m.querySelector("[data-imgurl]");b&&(b.value="");const I=m.querySelector(`[data-imgprev="${g}"]`);I&&(I.hidden=!0)})),n.querySelectorAll("[data-save]").forEach(p=>p.addEventListener("click",async()=>{var I,_;const m=p.closest(".task-card"),g=J=>m.querySelector(`[data-form] [data-f="${J}"]`),E=g("url").value.trim();if(E&&!/^https?:\/\//i.test(E)){L("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)","error");return}const b=[...m.querySelectorAll("[data-ifrows] [data-if-row]")].map(J=>{var Le;return{label:J.querySelector(".if-label").value.trim(),type:J.querySelector(".if-type").value,placeholder:((Le=J.querySelector(".if-ph"))==null?void 0:Le.value.trim())||"",required:J.querySelector("[data-ifreq]").checked}}).filter(J=>J.label);p.disabled=!0;try{await cv(p.dataset.save,{nameBn:g("nameBn").value.trim(),url:E,reward:Number(g("reward").value)||0,sort:Number(g("sort").value)||10,password:g("password").value.trim(),description:g("description").value.trim(),submitLabel:g("submitLabel").value.trim(),historyLabel:g("historyLabel").value.trim(),dailyLimit:Math.max(1,Math.min(200,Number(g("dailyLimit").value)||20)),inputFields:b,videoUrl:g("videoUrl").value.trim(),image:(((I=m.querySelector("[data-imgurl]"))==null?void 0:I.value)||"").trim()||((_=g("image"))==null?void 0:_.value)||"",shortDesc:g("shortDesc")?g("shortDesc").value.trim():"",requiredUsers:g("requiredUsers")?Math.max(0,Number(g("requiredUsers").value)||0):0,mode:g("mode")?g("mode").value:"single",enabled:g("enabled").checked,locked:g("locked").checked}),L("সেভ হয়েছে — user website-তে update হয়ে গেছে"),r()}catch(J){L(J.message,"error"),p.disabled=!1}}))}const Dv=[{group:"General",fields:[["siteName","Site Name","text"],["telegramLink","Telegram Link","url"],["facebookLink","Facebook Link","url"],["youtubeLink","YouTube Link","url"],["videoUrl","Tutorial Video URL","url"]]},{group:"Money (৳)",fields:[["activationFee","Activation Deposit Fee","number"],["activationBonus","Activation Bonus","number"],["registerBonus","Registration Bonus","number"],["referralBonus","Referral Bonus","number"],["minWithdraw","Minimum Withdraw","number"],["giftReward","Daily Gift Reward","number"]]},{group:"Payment Numbers (Deposit-এর জন্য)",fields:[["bkashNumber","bKash Number","text"],["nagadNumber","Nagad Number","text"],["rocketNumber","Rocket Number","text"]]},{group:"Gift",fields:[["giftCode","Gift Code","text"]]},{group:"Admin Contact (Support page-এ দেখাবে)",fields:[["admin1Name","Admin 1 — Name","text"],["admin1Phone","Admin 1 — Phone","text"],["admin1Email","Admin 1 — Email","email"],["admin1Link","Admin 1 — Link","url"],["admin2Name","Admin 2 — Name","text"],["admin2Phone","Admin 2 — Phone","text"],["admin2Email","Admin 2 — Email","email"],["admin2Link","Admin 2 — Link","url"]]}];async function Mu(n){var r,i;const e=await uv(),t=e._secretLoaded!==!0;n.innerHTML=`
    <form id="settingsForm">
    ${Dv.map(a=>`
      <div class="adm-card">
        <h4><i class="fa-solid fa-sliders" style="color:#d97706"></i> ${a.group}</h4>
        <div class="set-grid">
          ${a.fields.map(([o,c,d])=>{var y;const h=o==="giftCode"&&t;return`
            <div><label>${c}</label><input type="${d}" step="${d==="number"?"0.5":void 0}" class="adm-input" data-sf="${o}" value="${h?"":R((y=e[o])!=null?y:"")}" ${h?'disabled placeholder="লোড করা যায়নি — API দেখুন"':""}></div>`}).join("")}
        </div>
        ${a.group==="Gift"&&t?'<p class="muted" style="margin-top:8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Gift Code server API থেকে পড়া যায়নি — এই ঘরটা এখন change হবে না (ভুলবশত কোড মুছে যাবে না)।</p>':""}
        ${a.group==="Gift"&&!t?`<p class="muted" style="margin-top:8px">কোড: <b>${R(e.giftCode||"(খালি)")}</b> <button type="button" class="adm-btn ghost sm" id="clearGiftBtn" style="margin-left:8px">মুছুন</button></p>`:""}
      </div>`).join("")}
      <button type="submit" class="adm-btn gold"><i class="fa-solid fa-floppy-disk"></i> Save Settings</button>
      <button type="button" class="adm-btn ghost" id="lbSyncBtn" style="margin-left:8px"><i class="fa-solid fa-trophy"></i> Leaderboard count sync</button>
      <p class="muted" style="font-size:12px;margin-top:6px">Leaderboard (Top 4) existing referral data থেকেই হিসাব করে; এই বাটন চাপলে referral সংখ্যা গুনে user doc-এ cache হয় (বড় list-এ দ্রুত লোড হয়)।</p>
    </form>`,(r=document.getElementById("lbSyncBtn"))==null||r.addEventListener("click",async()=>{const a=document.getElementById("lbSyncBtn");a.disabled=!0;try{const o=await ov();L(`Leaderboard sync: ${o.updated||0}টা user (${o.failed||0}টা বাদ)`)}catch(o){L(o.message,"error")}a.disabled=!1}),(i=document.getElementById("clearGiftBtn"))==null||i.addEventListener("click",async()=>{if(confirm("Gift code মুছে ফেলবেন? তাহলে কেউই আর gift claim করতে পারবে না।"))try{await hv(),L("Gift code cleared"),Mu(n)}catch(a){L(a.message,"error")}}),document.getElementById("settingsForm").addEventListener("submit",async a=>{a.preventDefault();const o={};n.querySelectorAll("[data-sf]").forEach(d=>{if(d.disabled)return;const h=d.dataset.sf;o[h]=d.type==="number"?Number(d.value)||0:d.value.trim()});const c=a.target.querySelector("button[type=submit]");c.disabled=!0;try{await dv(o),L("Settings save হয়েছে")}catch(d){L(d.message,"error"),c.disabled=!1}})}let Gt="";async function Kt(n){const[e,t]=await Promise.all([fv(),_v().catch(()=>[])]),r=await _a(300).catch(()=>[]);n.innerHTML=`
    <div class="adm-card">
      <h4><i class="fa-solid fa-bullhorn" style="color:#d97706"></i> নতুন Notice / Warning</h4>
      <div class="two-col">
        <div><label>ধরন</label>
          <select class="adm-input" id="ntType"><option value="notice">নোটিশ</option><option value="warning">সতর্কতা</option></select>
        </div>
        <div><label>টার্গেট</label>
          <select class="adm-input" id="ntTarget"><option value="all">সব user (All)</option><option value="user">নির্দিষ্ট user</option></select>
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
          <div class="task-info"><b>${h.type==="warning"?"⚠️ ":""}${R(h.title||"—")}</b><span class="muted">${h.enabled?"ON":"OFF"} • sort ${h.sort||0}${h.expiresAt?" • expire "+Pe(h.expiresAt):""}</span></div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tgl="${h.id}"><i class="fa-solid ${h.enabled?"fa-eye-slash":"fa-eye"}"></i></button>
            <button class="adm-btn red sm" data-del="${h.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${R(h.body||"")}</p>
      </div>`).join("")}
    ${e.length?"":'<p class="muted center-note">কোনো all-user notice নেই।</p>'}

    <h4 style="margin:14px 0 8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Private Warnings (user-specific)</h4>
    ${t.map(h=>`
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info">
            <b>${h.type==="warning"?"⚠️ ":""}${R(h.title||"—")}</b>
            <span class="muted">→ ${R(h.userName||"—")} (${R(h.userMobile||h.uid)}) • ${h.enabled?"ACTIVE":"OFF"}${h.expiresAt?" • expire "+h.expiresAt:""}</span>
          </div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tn-tgl="${h.uid}::${h.id}">${h.enabled?"লুকান":"দেখান"}</button>
            <button class="adm-btn red sm" data-tn-del="${h.uid}::${h.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${R(h.body||"")}</p>
      </div>`).join("")}
    ${t.length?"":'<p class="muted center-note">কোনো private warning নেই।</p>'}`;const i=document.getElementById("ntTarget"),a=document.getElementById("ntUserWrap"),o=document.getElementById("ntUserSearch"),c=document.getElementById("ntUserResults");i.addEventListener("change",()=>{a.hidden=i.value!=="user"});const d=(h="")=>{const y=h.trim().toLowerCase(),v=y?r.filter(w=>(w.name||"").toLowerCase().includes(y)||String(w.mobile||"").includes(y)):r;c.innerHTML=v.slice(0,30).map(w=>`
      <div class="user-row ${Gt===w.uid?"on":""}" data-ntu="${w.uid}">
        <div class="ur-avatar">${R((w.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${R(w.name||"—")}</b><span class="muted">${R(w.mobile||"")}</span></div>
        <div class="ur-right">${Gt===w.uid?'<span class="badge green">SELECTED</span>':""}</div>
      </div>`).join("")||'<p class="muted">কোনো user পাওয়া যায়নি</p>',c.querySelectorAll("[data-ntu]").forEach(w=>w.addEventListener("click",()=>{Gt=w.dataset.ntu,d(o.value)}))};o.addEventListener("input",()=>d(o.value)),document.getElementById("ntAdd").addEventListener("click",async()=>{const h=document.getElementById("ntTitle").value.trim(),y=document.getElementById("ntBody").value.trim(),v=document.getElementById("ntType").value,w=i.value,P=document.getElementById("ntExpiry").value;if(!h&&!y){L("Title বা message লিখুন","error");return}if(w==="user"&&!Gt){L("একটা user select করুন","error");return}const N=P?new Date(P+"T23:59:59"):null;try{w==="user"?await vv(Gt,{title:h,body:y,type:v,expiresAt:N}):await pv({title:h,body:y,type:v,expiresAt:N}),L(w==="user"?"Private warning পাঠানো হয়েছে (শুধু সেই user দেখবে)":"Notice add হয়েছে (সব user দেখবে)"),Gt="",Kt(n)}catch(M){L(M.message,"error")}}),n.querySelectorAll("[data-tgl]").forEach(h=>h.addEventListener("click",async()=>{const y=e.find(v=>v.id===h.dataset.tgl);try{await mv(y.id,{title:y.title,body:y.body,enabled:!y.enabled,sort:y.sort}),L("Notice toggle"),Kt(n)}catch(v){L(v.message,"error")}})),n.querySelectorAll("[data-del]").forEach(h=>h.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await gv(h.dataset.del),L("Notice delete হয়েছে"),Kt(n)}catch(y){L(y.message,"error")}})),n.querySelectorAll("[data-tn-tgl]").forEach(h=>h.addEventListener("click",async()=>{const[y,v]=h.dataset.tnTgl.split("::"),w=t.find(P=>P.uid===y&&P.id===v);try{await Pu(y,v,{enabled:!w.enabled}),L("Warning toggle"),Kt(n)}catch(P){L(P.message,"error")}})),n.querySelectorAll("[data-tn-del]").forEach(h=>h.addEventListener("click",async()=>{if(!confirm("Warning মুছে ফেলবেন?"))return;const[y,v]=h.dataset.tnDel.split("::");try{await ku(y,v),L("Warning delete হয়েছে"),Kt(n)}catch(w){L(w.message,"error")}}))}
