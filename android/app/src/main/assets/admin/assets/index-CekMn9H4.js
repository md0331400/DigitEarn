(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();var rr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr=function(t){const e=[];let i=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[i++]=r:r<2048?(e[i++]=r>>6|192,e[i++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[i++]=r>>18|240,e[i++]=r>>12&63|128,e[i++]=r>>6&63|128,e[i++]=r&63|128):(e[i++]=r>>12|224,e[i++]=r>>6&63|128,e[i++]=r&63|128)}return e},Uo=function(t){const e=[];let i=0,s=0;for(;i<t.length;){const r=t[i++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const o=t[i++];e[s++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=t[i++],c=t[i++],p=t[i++],g=((r&7)<<18|(o&63)<<12|(c&63)<<6|p&63)-65536;e[s++]=String.fromCharCode(55296+(g>>10)),e[s++]=String.fromCharCode(56320+(g&1023))}else{const o=t[i++],c=t[i++];e[s++]=String.fromCharCode((r&15)<<12|(o&63)<<6|c&63)}}return e.join("")},zr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const i=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const o=t[r],c=r+1<t.length,p=c?t[r+1]:0,g=r+2<t.length,w=g?t[r+2]:0,T=o>>2,_=(o&3)<<4|p>>4;let k=(p&15)<<2|w>>6,C=w&63;g||(C=64,c||(k=64)),s.push(i[T],i[_],i[k],i[C])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Wr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Uo(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const i=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const o=i[t.charAt(r++)],p=r<t.length?i[t.charAt(r)]:0;++r;const w=r<t.length?i[t.charAt(r)]:64;++r;const _=r<t.length?i[t.charAt(r)]:64;if(++r,o==null||p==null||w==null||_==null)throw new Bo;const k=o<<2|p>>4;if(s.push(k),w!==64){const C=p<<4&240|w>>2;if(s.push(C),_!==64){const L=w<<6&192|_;s.push(L)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Bo extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Fo=function(t){const e=Wr(t);return zr.encodeByteArray(e,!0)},Nn=function(t){return Fo(t).replace(/\./g,"")},Gr=function(t){try{return zr.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Ho(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}/**
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
 */const qo=()=>Ho().__FIREBASE_DEFAULTS__,Vo=()=>{if(typeof process=="undefined"||typeof rr=="undefined")return;const t=rr.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Wo=()=>{if(typeof document=="undefined")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Gr(t[1]);return e&&JSON.parse(e)},Hi=()=>{try{return qo()||Vo()||Wo()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Kr=t=>{var e,i;return(i=(e=Hi())===null||e===void 0?void 0:e.emulatorHosts)===null||i===void 0?void 0:i[t]},zo=t=>{const e=Kr(t);if(!e)return;const i=e.lastIndexOf(":");if(i<=0||i+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(i+1),10);return e[0]==="["?[e.substring(1,i-1),s]:[e.substring(0,i),s]},Jr=()=>{var t;return(t=Hi())===null||t===void 0?void 0:t.config},Xr=t=>{var e;return(e=Hi())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,i)=>{this.resolve=e,this.reject=i})}wrapCallback(e){return(i,s)=>{i?this.reject(i):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(i):e(i,s))}}}/**
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
 */function Ko(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const i={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,o=t.sub||t.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const c=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Nn(JSON.stringify(i)),Nn(JSON.stringify(c)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function re(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Jo(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(re())}function Xo(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function Yo(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Qo(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Zo(){const t=re();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function el(){try{return typeof indexedDB=="object"}catch{return!1}}function tl(){return new Promise((t,e)=>{try{let i=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),i||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{i=!1},r.onerror=()=>{var o;e(((o=r.error)===null||o===void 0?void 0:o.message)||"")}}catch(i){e(i)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl="FirebaseError";class Ae extends Error{constructor(e,i,s){super(i),this.code=e,this.customData=s,this.name=nl,Object.setPrototypeOf(this,Ae.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Gt.prototype.create)}}class Gt{constructor(e,i,s){this.service=e,this.serviceName=i,this.errors=s}create(e,...i){const s=i[0]||{},r=`${this.service}/${e}`,o=this.errors[e],c=o?il(o,s):"Error",p=`${this.serviceName}: ${c} (${r}).`;return new Ae(r,p,s)}}function il(t,e){return t.replace(sl,(i,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const sl=/\{\$([^}]+)}/g;function rl(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function On(t,e){if(t===e)return!0;const i=Object.keys(t),s=Object.keys(e);for(const r of i){if(!s.includes(r))return!1;const o=t[r],c=e[r];if(ar(o)&&ar(c)){if(!On(o,c))return!1}else if(o!==c)return!1}for(const r of s)if(!i.includes(r))return!1;return!0}function ar(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(t){const e=[];for(const[i,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(i)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(i)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Mt(t){const e={};return t.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,o]=s.split("=");e[decodeURIComponent(r)]=decodeURIComponent(o)}}),e}function jt(t){const e=t.indexOf("?");if(!e)return"";const i=t.indexOf("#",e);return t.substring(e,i>0?i:void 0)}function al(t,e){const i=new ol(t,e);return i.subscribe.bind(i)}class ol{constructor(e,i){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=i,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(i=>{i.next(e)})}error(e){this.forEachObserver(i=>{i.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,i,s){let r;if(e===void 0&&i===void 0&&s===void 0)throw new Error("Missing Observer.");ll(e,["next","error","complete"])?r=e:r={next:e,error:i,complete:s},r.next===void 0&&(r.next=wi),r.error===void 0&&(r.error=wi),r.complete===void 0&&(r.complete=wi);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let i=0;i<this.observers.length;i++)this.sendOne(i,e)}sendOne(e,i){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{i(this.observers[e])}catch(s){typeof console!="undefined"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ll(t,e){if(typeof t!="object"||t===null)return!1;for(const i of e)if(i in t&&typeof t[i]=="function")return!0;return!1}function wi(){}/**
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
 */function ke(t){return t&&t._delegate?t._delegate:t}class Ye{constructor(e,i,s){this.name=e,this.instanceFactory=i,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Xe="[DEFAULT]";/**
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
 */class cl{constructor(e,i){this.name=e,this.container=i,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const i=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(i)){const s=new Go;if(this.instancesDeferred.set(i,s),this.isInitialized(i)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:i});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(i).promise}getImmediate(e){var i;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(i=e==null?void 0:e.optional)!==null&&i!==void 0?i:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(o){if(r)return null;throw o}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ul(e))try{this.getOrInitializeService({instanceIdentifier:Xe})}catch{}for(const[i,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(i);try{const o=this.getOrInitializeService({instanceIdentifier:r});s.resolve(o)}catch{}}}}clearInstance(e=Xe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(i=>"INTERNAL"in i).map(i=>i.INTERNAL.delete()),...e.filter(i=>"_delete"in i).map(i=>i._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xe){return this.instances.has(e)}getOptions(e=Xe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:i={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:i});for(const[o,c]of this.instancesDeferred.entries()){const p=this.normalizeInstanceIdentifier(o);s===p&&c.resolve(r)}return r}onInit(e,i){var s;const r=this.normalizeInstanceIdentifier(i),o=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;o.add(e),this.onInitCallbacks.set(r,o);const c=this.instances.get(r);return c&&e(c,r),()=>{o.delete(e)}}invokeOnInitCallbacks(e,i){const s=this.onInitCallbacks.get(i);if(s)for(const r of s)try{r(e,i)}catch{}}getOrInitializeService({instanceIdentifier:e,options:i={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:dl(e),options:i}),this.instances.set(e,s),this.instancesOptions.set(e,i),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Xe){return this.component?this.component.multipleInstances?e:Xe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function dl(t){return t===Xe?void 0:t}function ul(t){return t.instantiationMode==="EAGER"}/**
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
 */class hl{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const i=this.getProvider(e.name);if(i.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);i.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const i=new cl(e,this);return this.providers.set(e,i),i}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var B;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(B||(B={}));const fl={debug:B.DEBUG,verbose:B.VERBOSE,info:B.INFO,warn:B.WARN,error:B.ERROR,silent:B.SILENT},pl=B.INFO,ml={[B.DEBUG]:"log",[B.VERBOSE]:"log",[B.INFO]:"info",[B.WARN]:"warn",[B.ERROR]:"error"},gl=(t,e,...i)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=ml[e];if(r)console[r](`[${s}]  ${t.name}:`,...i);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class qi{constructor(e){this.name=e,this._logLevel=pl,this._logHandler=gl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in B))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?fl[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,B.DEBUG,...e),this._logHandler(this,B.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,B.VERBOSE,...e),this._logHandler(this,B.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,B.INFO,...e),this._logHandler(this,B.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,B.WARN,...e),this._logHandler(this,B.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,B.ERROR,...e),this._logHandler(this,B.ERROR,...e)}}const vl=(t,e)=>e.some(i=>t instanceof i);let or,lr;function yl(){return or||(or=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function bl(){return lr||(lr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Yr=new WeakMap,Ri=new WeakMap,Qr=new WeakMap,_i=new WeakMap,Vi=new WeakMap;function wl(t){const e=new Promise((i,s)=>{const r=()=>{t.removeEventListener("success",o),t.removeEventListener("error",c)},o=()=>{i(Fe(t.result)),r()},c=()=>{s(t.error),r()};t.addEventListener("success",o),t.addEventListener("error",c)});return e.then(i=>{i instanceof IDBCursor&&Yr.set(i,t)}).catch(()=>{}),Vi.set(e,t),e}function _l(t){if(Ri.has(t))return;const e=new Promise((i,s)=>{const r=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",c),t.removeEventListener("abort",c)},o=()=>{i(),r()},c=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",o),t.addEventListener("error",c),t.addEventListener("abort",c)});Ri.set(t,e)}let Ci={get(t,e,i){if(t instanceof IDBTransaction){if(e==="done")return Ri.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Qr.get(t);if(e==="store")return i.objectStoreNames[1]?void 0:i.objectStore(i.objectStoreNames[0])}return Fe(t[e])},set(t,e,i){return t[e]=i,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function El(t){Ci=t(Ci)}function Il(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...i){const s=t.call(Ei(this),e,...i);return Qr.set(s,e.sort?e.sort():[e]),Fe(s)}:bl().includes(t)?function(...e){return t.apply(Ei(this),e),Fe(Yr.get(this))}:function(...e){return Fe(t.apply(Ei(this),e))}}function Tl(t){return typeof t=="function"?Il(t):(t instanceof IDBTransaction&&_l(t),vl(t,yl())?new Proxy(t,Ci):t)}function Fe(t){if(t instanceof IDBRequest)return wl(t);if(_i.has(t))return _i.get(t);const e=Tl(t);return e!==t&&(_i.set(t,e),Vi.set(e,t)),e}const Ei=t=>Vi.get(t);function Sl(t,e,{blocked:i,upgrade:s,blocking:r,terminated:o}={}){const c=indexedDB.open(t,e),p=Fe(c);return s&&c.addEventListener("upgradeneeded",g=>{s(Fe(c.result),g.oldVersion,g.newVersion,Fe(c.transaction),g)}),i&&c.addEventListener("blocked",g=>i(g.oldVersion,g.newVersion,g)),p.then(g=>{o&&g.addEventListener("close",()=>o()),r&&g.addEventListener("versionchange",w=>r(w.oldVersion,w.newVersion,w))}).catch(()=>{}),p}const Al=["get","getKey","getAll","getAllKeys","count"],kl=["put","add","delete","clear"],Ii=new Map;function cr(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ii.get(e))return Ii.get(e);const i=e.replace(/FromIndex$/,""),s=e!==i,r=kl.includes(i);if(!(i in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Al.includes(i)))return;const o=async function(c,...p){const g=this.transaction(c,r?"readwrite":"readonly");let w=g.store;return s&&(w=w.index(p.shift())),(await Promise.all([w[i](...p),r&&g.done]))[0]};return Ii.set(e,o),o}El(t=>({...t,get:(e,i,s)=>cr(e,i)||t.get(e,i,s),has:(e,i)=>!!cr(e,i)||t.has(e,i)}));/**
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
 */class Pl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(i=>{if(Rl(i)){const s=i.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(i=>i).join(" ")}}function Rl(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Li="@firebase/app",dr="0.10.13";/**
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
 */const Te=new qi("@firebase/app"),Cl="@firebase/app-compat",Ll="@firebase/analytics-compat",$l="@firebase/analytics",Nl="@firebase/app-check-compat",Ol="@firebase/app-check",Dl="@firebase/auth",Ml="@firebase/auth-compat",jl="@firebase/database",xl="@firebase/data-connect",Ul="@firebase/database-compat",Bl="@firebase/functions",Fl="@firebase/functions-compat",Hl="@firebase/installations",ql="@firebase/installations-compat",Vl="@firebase/messaging",Wl="@firebase/messaging-compat",zl="@firebase/performance",Gl="@firebase/performance-compat",Kl="@firebase/remote-config",Jl="@firebase/remote-config-compat",Xl="@firebase/storage",Yl="@firebase/storage-compat",Ql="@firebase/firestore",Zl="@firebase/vertexai-preview",ec="@firebase/firestore-compat",tc="firebase",nc="10.14.1";/**
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
 */const $i="[DEFAULT]",ic={[Li]:"fire-core",[Cl]:"fire-core-compat",[$l]:"fire-analytics",[Ll]:"fire-analytics-compat",[Ol]:"fire-app-check",[Nl]:"fire-app-check-compat",[Dl]:"fire-auth",[Ml]:"fire-auth-compat",[jl]:"fire-rtdb",[xl]:"fire-data-connect",[Ul]:"fire-rtdb-compat",[Bl]:"fire-fn",[Fl]:"fire-fn-compat",[Hl]:"fire-iid",[ql]:"fire-iid-compat",[Vl]:"fire-fcm",[Wl]:"fire-fcm-compat",[zl]:"fire-perf",[Gl]:"fire-perf-compat",[Kl]:"fire-rc",[Jl]:"fire-rc-compat",[Xl]:"fire-gcs",[Yl]:"fire-gcs-compat",[Ql]:"fire-fst",[ec]:"fire-fst-compat",[Zl]:"fire-vertex","fire-js":"fire-js",[tc]:"fire-js-all"};/**
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
 */const Dn=new Map,sc=new Map,Ni=new Map;function ur(t,e){try{t.container.addComponent(e)}catch(i){Te.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,i)}}function gt(t){const e=t.name;if(Ni.has(e))return Te.debug(`There were multiple attempts to register component ${e}.`),!1;Ni.set(e,t);for(const i of Dn.values())ur(i,t);for(const i of sc.values())ur(i,t);return!0}function Wi(t,e){const i=t.container.getProvider("heartbeat").getImmediate({optional:!0});return i&&i.triggerHeartbeat(),t.container.getProvider(e)}function we(t){return t.settings!==void 0}/**
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
 */const rc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},He=new Gt("app","Firebase",rc);/**
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
 */class ac{constructor(e,i,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},i),this._name=i.name,this._automaticDataCollectionEnabled=i.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ye("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw He.create("app-deleted",{appName:this._name})}}/**
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
 */const bt=nc;function Zr(t,e={}){let i=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:$i,automaticDataCollectionEnabled:!1},e),r=s.name;if(typeof r!="string"||!r)throw He.create("bad-app-name",{appName:String(r)});if(i||(i=Jr()),!i)throw He.create("no-options");const o=Dn.get(r);if(o){if(On(i,o.options)&&On(s,o.config))return o;throw He.create("duplicate-app",{appName:r})}const c=new hl(r);for(const g of Ni.values())c.addComponent(g);const p=new ac(i,s,c);return Dn.set(r,p),p}function ea(t=$i){const e=Dn.get(t);if(!e&&t===$i&&Jr())return Zr();if(!e)throw He.create("no-app",{appName:t});return e}function qe(t,e,i){var s;let r=(s=ic[t])!==null&&s!==void 0?s:t;i&&(r+=`-${i}`);const o=r.match(/\s|\//),c=e.match(/\s|\//);if(o||c){const p=[`Unable to register library "${r}" with version "${e}":`];o&&p.push(`library name "${r}" contains illegal characters (whitespace or "/")`),o&&c&&p.push("and"),c&&p.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Te.warn(p.join(" "));return}gt(new Ye(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const oc="firebase-heartbeat-database",lc=1,qt="firebase-heartbeat-store";let Ti=null;function ta(){return Ti||(Ti=Sl(oc,lc,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(qt)}catch(i){console.warn(i)}}}}).catch(t=>{throw He.create("idb-open",{originalErrorMessage:t.message})})),Ti}async function cc(t){try{const i=(await ta()).transaction(qt),s=await i.objectStore(qt).get(na(t));return await i.done,s}catch(e){if(e instanceof Ae)Te.warn(e.message);else{const i=He.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Te.warn(i.message)}}}async function hr(t,e){try{const s=(await ta()).transaction(qt,"readwrite");await s.objectStore(qt).put(e,na(t)),await s.done}catch(i){if(i instanceof Ae)Te.warn(i.message);else{const s=He.create("idb-set",{originalErrorMessage:i==null?void 0:i.message});Te.warn(s.message)}}}function na(t){return`${t.name}!${t.options.appId}`}/**
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
 */const dc=1024,uc=30*24*60*60*1e3;class hc{constructor(e){this.container=e,this._heartbeatsCache=null;const i=this.container.getProvider("app").getImmediate();this._storage=new pc(i),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,i;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=fr();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((i=this._heartbeatsCache)===null||i===void 0?void 0:i.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(c=>c.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(c=>{const p=new Date(c.date).valueOf();return Date.now()-p<=uc}),this._storage.overwrite(this._heartbeatsCache))}catch(s){Te.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const i=fr(),{heartbeatsToSend:s,unsentEntries:r}=fc(this._heartbeatsCache.heartbeats),o=Nn(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=i,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(i){return Te.warn(i),""}}}function fr(){return new Date().toISOString().substring(0,10)}function fc(t,e=dc){const i=[];let s=t.slice();for(const r of t){const o=i.find(c=>c.agent===r.agent);if(o){if(o.dates.push(r.date),pr(i)>e){o.dates.pop();break}}else if(i.push({agent:r.agent,dates:[r.date]}),pr(i)>e){i.pop();break}s=s.slice(1)}return{heartbeatsToSend:i,unsentEntries:s}}class pc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return el()?tl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const i=await cc(this.app);return i!=null&&i.heartbeats?i:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var i;if(await this._canUseIndexedDBPromise){const r=await this.read();return hr(this.app,{lastSentHeartbeatDate:(i=e.lastSentHeartbeatDate)!==null&&i!==void 0?i:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var i;if(await this._canUseIndexedDBPromise){const r=await this.read();return hr(this.app,{lastSentHeartbeatDate:(i=e.lastSentHeartbeatDate)!==null&&i!==void 0?i:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function pr(t){return Nn(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function mc(t){gt(new Ye("platform-logger",e=>new Pl(e),"PRIVATE")),gt(new Ye("heartbeat",e=>new hc(e),"PRIVATE")),qe(Li,dr,t),qe(Li,dr,"esm2017"),qe("fire-js","")}mc("");var gc="firebase",vc="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qe(gc,vc,"app");function zi(t,e){var i={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(i[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(t);r<s.length;r++)e.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(t,s[r])&&(i[s[r]]=t[s[r]]);return i}function ia(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const yc=ia,sa=new Gt("auth","Firebase",ia());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn=new qi("@firebase/auth");function bc(t,...e){Mn.logLevel<=B.WARN&&Mn.warn(`Auth (${bt}): ${t}`,...e)}function An(t,...e){Mn.logLevel<=B.ERROR&&Mn.error(`Auth (${bt}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(t,...e){throw Gi(t,...e)}function ge(t,...e){return Gi(t,...e)}function ra(t,e,i){const s=Object.assign(Object.assign({},yc()),{[e]:i});return new Gt("auth","Firebase",s).create(e,{appName:t.name})}function Ve(t){return ra(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Gi(t,...e){if(typeof t!="string"){const i=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(i,...s)}return sa.create(t,...e)}function O(t,e,...i){if(!t)throw Gi(e,...i)}function _e(t){const e="INTERNAL ASSERTION FAILED: "+t;throw An(e),new Error(e)}function Se(t,e){t||_e(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oi(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function wc(){return mr()==="http:"||mr()==="https:"}function mr(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _c(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(wc()||Yo()||"connection"in navigator)?navigator.onLine:!0}function Ec(){if(typeof navigator=="undefined")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,i){this.shortDelay=e,this.longDelay=i,Se(i>e,"Short delay should be less than long delay!"),this.isMobile=Jo()||Qo()}get(){return _c()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ki(t,e){Se(t.emulator,"Emulator should always be set here");const{url:i}=t.emulator;return e?`${i}${e.startsWith("/")?e.slice(1):e}`:i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{static initialize(e,i,s){this.fetchImpl=e,i&&(this.headersImpl=i),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;_e("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;_e("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;_e("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ic={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tc=new Jt(3e4,6e4);function et(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ze(t,e,i,s,r={}){return oa(t,r,async()=>{let o={},c={};s&&(e==="GET"?c=s:o={body:JSON.stringify(s)});const p=Kt(Object.assign({key:t.config.apiKey},c)).slice(1),g=await t._getAdditionalHeaders();g["Content-Type"]="application/json",t.languageCode&&(g["X-Firebase-Locale"]=t.languageCode);const w=Object.assign({method:e,headers:g},o);return Xo()||(w.referrerPolicy="no-referrer"),aa.fetch()(la(t,t.config.apiHost,i,p),w)})}async function oa(t,e,i){t._canInitEmulator=!1;const s=Object.assign(Object.assign({},Ic),e);try{const r=new Ac(t),o=await Promise.race([i(),r.promise]);r.clearNetworkTimeout();const c=await o.json();if("needConfirmation"in c)throw wn(t,"account-exists-with-different-credential",c);if(o.ok&&!("errorMessage"in c))return c;{const p=o.ok?c.errorMessage:c.error.message,[g,w]=p.split(" : ");if(g==="FEDERATED_USER_ID_ALREADY_LINKED")throw wn(t,"credential-already-in-use",c);if(g==="EMAIL_EXISTS")throw wn(t,"email-already-in-use",c);if(g==="USER_DISABLED")throw wn(t,"user-disabled",c);const T=s[g]||g.toLowerCase().replace(/[_\s]+/g,"-");if(w)throw ra(t,T,w);me(t,T)}}catch(r){if(r instanceof Ae)throw r;me(t,"network-request-failed",{message:String(r)})}}async function Hn(t,e,i,s,r={}){const o=await ze(t,e,i,s,r);return"mfaPendingCredential"in o&&me(t,"multi-factor-auth-required",{_serverResponse:o}),o}function la(t,e,i,s){const r=`${e}${i}?${s}`;return t.config.emulator?Ki(t.config,r):`${t.config.apiScheme}://${r}`}function Sc(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Ac{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((i,s)=>{this.timer=setTimeout(()=>s(ge(this.auth,"network-request-failed")),Tc.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function wn(t,e,i){const s={appName:t.name};i.email&&(s.email=i.email),i.phoneNumber&&(s.phoneNumber=i.phoneNumber);const r=ge(t,e,s);return r.customData._tokenResponse=i,r}function gr(t){return t!==void 0&&t.enterprise!==void 0}class kc{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const i of this.recaptchaEnforcementState)if(i.provider&&i.provider===e)return Sc(i.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function Pc(t,e){return ze(t,"GET","/v2/recaptchaConfig",et(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rc(t,e){return ze(t,"POST","/v1/accounts:delete",e)}async function ca(t,e){return ze(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Cc(t,e=!1){const i=ke(t),s=await i.getIdToken(e),r=Ji(s);O(r&&r.exp&&r.auth_time&&r.iat,i.auth,"internal-error");const o=typeof r.firebase=="object"?r.firebase:void 0,c=o==null?void 0:o.sign_in_provider;return{claims:r,token:s,authTime:Bt(Si(r.auth_time)),issuedAtTime:Bt(Si(r.iat)),expirationTime:Bt(Si(r.exp)),signInProvider:c||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Si(t){return Number(t)*1e3}function Ji(t){const[e,i,s]=t.split(".");if(e===void 0||i===void 0||s===void 0)return An("JWT malformed, contained fewer than 3 sections"),null;try{const r=Gr(i);return r?JSON.parse(r):(An("Failed to decode base64 JWT payload"),null)}catch(r){return An("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function vr(t){const e=Ji(t);return O(e,"internal-error"),O(typeof e.exp!="undefined","internal-error"),O(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vt(t,e,i=!1){if(i)return e;try{return await e}catch(s){throw s instanceof Ae&&Lc(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function Lc({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var i;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const r=((i=this.user.stsTokenManager.expirationTime)!==null&&i!==void 0?i:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const i=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},i)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e,i){this.createdAt=e,this.lastLoginAt=i,this._initializeTime()}_initializeTime(){this.lastSignInTime=Bt(this.lastLoginAt),this.creationTime=Bt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function jn(t){var e;const i=t.auth,s=await t.getIdToken(),r=await Vt(t,ca(i,{idToken:s}));O(r==null?void 0:r.users.length,i,"internal-error");const o=r.users[0];t._notifyReloadListener(o);const c=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?da(o.providerUserInfo):[],p=Oc(t.providerData,c),g=t.isAnonymous,w=!(t.email&&o.passwordHash)&&!(p!=null&&p.length),T=g?w:!1,_={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:p,metadata:new Di(o.createdAt,o.lastLoginAt),isAnonymous:T};Object.assign(t,_)}async function Nc(t){const e=ke(t);await jn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Oc(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function da(t){return t.map(e=>{var{providerId:i}=e,s=zi(e,["providerId"]);return{providerId:i,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dc(t,e){const i=await oa(t,{},async()=>{const s=Kt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:o}=t.config,c=la(t,r,"/v1/token",`key=${o}`),p=await t._getAdditionalHeaders();return p["Content-Type"]="application/x-www-form-urlencoded",aa.fetch()(c,{method:"POST",headers:p,body:s})});return{accessToken:i.access_token,expiresIn:i.expires_in,refreshToken:i.refresh_token}}async function Mc(t,e){return ze(t,"POST","/v2/accounts:revokeToken",et(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){O(e.idToken,"internal-error"),O(typeof e.idToken!="undefined","internal-error"),O(typeof e.refreshToken!="undefined","internal-error");const i="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):vr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,i)}updateFromIdToken(e){O(e.length!==0,"internal-error");const i=vr(e);this.updateTokensAndExpiration(e,null,i)}async getToken(e,i=!1){return!i&&this.accessToken&&!this.isExpired?this.accessToken:(O(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,i){const{accessToken:s,refreshToken:r,expiresIn:o}=await Dc(e,i);this.updateTokensAndExpiration(s,r,Number(o))}updateTokensAndExpiration(e,i,s){this.refreshToken=i||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,i){const{refreshToken:s,accessToken:r,expirationTime:o}=i,c=new ft;return s&&(O(typeof s=="string","internal-error",{appName:e}),c.refreshToken=s),r&&(O(typeof r=="string","internal-error",{appName:e}),c.accessToken=r),o&&(O(typeof o=="number","internal-error",{appName:e}),c.expirationTime=o),c}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ft,this.toJSON())}_performRefresh(){return _e("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function De(t,e){O(typeof t=="string"||typeof t=="undefined","internal-error",{appName:e})}class Ee{constructor(e){var{uid:i,auth:s,stsTokenManager:r}=e,o=zi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new $c(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=i,this.auth=s,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Di(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const i=await Vt(this,this.stsTokenManager.getToken(this.auth,e));return O(i,this.auth,"internal-error"),this.accessToken!==i&&(this.accessToken=i,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),i}getIdTokenResult(e){return Cc(this,e)}reload(){return Nc(this)}_assign(e){this!==e&&(O(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(i=>Object.assign({},i)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const i=new Ee(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return i.metadata._copy(this.metadata),i}_onReload(e){O(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,i=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),i&&await jn(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(we(this.auth.app))return Promise.reject(Ve(this.auth));const e=await this.getIdToken();return await Vt(this,Rc(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,i){var s,r,o,c,p,g,w,T;const _=(s=i.displayName)!==null&&s!==void 0?s:void 0,k=(r=i.email)!==null&&r!==void 0?r:void 0,C=(o=i.phoneNumber)!==null&&o!==void 0?o:void 0,L=(c=i.photoURL)!==null&&c!==void 0?c:void 0,j=(p=i.tenantId)!==null&&p!==void 0?p:void 0,D=(g=i._redirectEventId)!==null&&g!==void 0?g:void 0,A=(w=i.createdAt)!==null&&w!==void 0?w:void 0,$=(T=i.lastLoginAt)!==null&&T!==void 0?T:void 0,{uid:N,emailVerified:M,isAnonymous:F,providerData:W,stsTokenManager:h}=i;O(N&&h,e,"internal-error");const u=ft.fromJSON(this.name,h);O(typeof N=="string",e,"internal-error"),De(_,e.name),De(k,e.name),O(typeof M=="boolean",e,"internal-error"),O(typeof F=="boolean",e,"internal-error"),De(C,e.name),De(L,e.name),De(j,e.name),De(D,e.name),De(A,e.name),De($,e.name);const f=new Ee({uid:N,auth:e,email:k,emailVerified:M,displayName:_,isAnonymous:F,photoURL:L,phoneNumber:C,tenantId:j,stsTokenManager:u,createdAt:A,lastLoginAt:$});return W&&Array.isArray(W)&&(f.providerData=W.map(v=>Object.assign({},v))),D&&(f._redirectEventId=D),f}static async _fromIdTokenResponse(e,i,s=!1){const r=new ft;r.updateFromServerResponse(i);const o=new Ee({uid:i.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await jn(o),o}static async _fromGetAccountInfoResponse(e,i,s){const r=i.users[0];O(r.localId!==void 0,"internal-error");const o=r.providerUserInfo!==void 0?da(r.providerUserInfo):[],c=!(r.email&&r.passwordHash)&&!(o!=null&&o.length),p=new ft;p.updateFromIdToken(s);const g=new Ee({uid:r.localId,auth:e,stsTokenManager:p,isAnonymous:c}),w={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new Di(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(o!=null&&o.length)};return Object.assign(g,w),g}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr=new Map;function Ie(t){Se(t instanceof Function,"Expected a class definition");let e=yr.get(t);return e?(Se(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,yr.set(t,e),e)}/**
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
 */class ua{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,i){this.storage[e]=i}async _get(e){const i=this.storage[e];return i===void 0?null:i}async _remove(e){delete this.storage[e]}_addListener(e,i){}_removeListener(e,i){}}ua.type="NONE";const br=ua;/**
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
 */function kn(t,e,i){return`firebase:${t}:${e}:${i}`}class pt{constructor(e,i,s){this.persistence=e,this.auth=i,this.userKey=s;const{config:r,name:o}=this.auth;this.fullUserKey=kn(this.userKey,r.apiKey,o),this.fullPersistenceKey=kn("persistence",r.apiKey,o),this.boundEventHandler=i._onStorageEvent.bind(i),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ee._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const i=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,i)return this.setCurrentUser(i)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,i,s="authUser"){if(!i.length)return new pt(Ie(br),e,s);const r=(await Promise.all(i.map(async w=>{if(await w._isAvailable())return w}))).filter(w=>w);let o=r[0]||Ie(br);const c=kn(s,e.config.apiKey,e.name);let p=null;for(const w of i)try{const T=await w._get(c);if(T){const _=Ee._fromJSON(e,T);w!==o&&(p=_),o=w;break}}catch{}const g=r.filter(w=>w._shouldAllowMigration);return!o._shouldAllowMigration||!g.length?new pt(o,e,s):(o=g[0],p&&await o._set(c,p.toJSON()),await Promise.all(i.map(async w=>{if(w!==o)try{await w._remove(c)}catch{}})),new pt(o,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ma(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ha(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(va(e))return"Blackberry";if(ya(e))return"Webos";if(fa(e))return"Safari";if((e.includes("chrome/")||pa(e))&&!e.includes("edge/"))return"Chrome";if(ga(e))return"Android";{const i=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(i);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function ha(t=re()){return/firefox\//i.test(t)}function fa(t=re()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function pa(t=re()){return/crios\//i.test(t)}function ma(t=re()){return/iemobile/i.test(t)}function ga(t=re()){return/android/i.test(t)}function va(t=re()){return/blackberry/i.test(t)}function ya(t=re()){return/webos/i.test(t)}function Xi(t=re()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function jc(t=re()){var e;return Xi(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function xc(){return Zo()&&document.documentMode===10}function ba(t=re()){return Xi(t)||ga(t)||ya(t)||va(t)||/windows phone/i.test(t)||ma(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wa(t,e=[]){let i;switch(t){case"Browser":i=wr(re());break;case"Worker":i=`${wr(re())}-${t}`;break;default:i=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${i}/JsCore/${bt}/${s}`}/**
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
 */class Uc{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,i){const s=o=>new Promise((c,p)=>{try{const g=e(o);c(g)}catch(g){p(g)}});s.onAbort=i,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const i=[];try{for(const s of this.queue)await s(e),s.onAbort&&i.push(s.onAbort)}catch(s){i.reverse();for(const r of i)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function Bc(t,e={}){return ze(t,"GET","/v2/passwordPolicy",et(t,e))}/**
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
 */const Fc=6;class Hc{constructor(e){var i,s,r,o;const c=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(i=c.minPasswordLength)!==null&&i!==void 0?i:Fc,c.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=c.maxPasswordLength),c.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=c.containsLowercaseCharacter),c.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=c.containsUppercaseCharacter),c.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=c.containsNumericCharacter),c.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=c.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(r=(s=e.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&r!==void 0?r:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var i,s,r,o,c,p;const g={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,g),this.validatePasswordCharacterOptions(e,g),g.isValid&&(g.isValid=(i=g.meetsMinPasswordLength)!==null&&i!==void 0?i:!0),g.isValid&&(g.isValid=(s=g.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),g.isValid&&(g.isValid=(r=g.containsLowercaseLetter)!==null&&r!==void 0?r:!0),g.isValid&&(g.isValid=(o=g.containsUppercaseLetter)!==null&&o!==void 0?o:!0),g.isValid&&(g.isValid=(c=g.containsNumericCharacter)!==null&&c!==void 0?c:!0),g.isValid&&(g.isValid=(p=g.containsNonAlphanumericCharacter)!==null&&p!==void 0?p:!0),g}validatePasswordLengthOptions(e,i){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(i.meetsMinPasswordLength=e.length>=s),r&&(i.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,i){this.updatePasswordCharacterOptionsStatuses(i,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(i,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,i,s,r,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=i)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e,i,s,r){this.app=e,this.heartbeatServiceProvider=i,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new _r(this),this.idTokenSubscription=new _r(this),this.beforeStateQueue=new Uc(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=sa,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,i){return i&&(this._popupRedirectResolver=Ie(i)),this._initializationPromise=this.queue(async()=>{var s,r;if(!this._deleted&&(this.persistenceManager=await pt.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(i),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const i=await ca(this,{idToken:e}),s=await Ee._fromGetAccountInfoResponse(this,i,e);await this.directlySetCurrentUser(s)}catch(i){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",i),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(we(this.app)){const c=this.app.settings.authIdToken;return c?new Promise(p=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(c).then(p,p))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let r=s,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const c=(i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId,p=r==null?void 0:r._redirectEventId,g=await this.tryRedirectSignIn(e);(!c||c===p)&&(g!=null&&g.user)&&(r=g.user,o=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(r)}catch(c){r=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(c))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return O(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let i=null;try{i=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return i}async reloadAndSetCurrentUserOrClear(e){try{await jn(e)}catch(i){if((i==null?void 0:i.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ec()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(we(this.app))return Promise.reject(Ve(this));const i=e?ke(e):null;return i&&O(i.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(i&&i._clone(this))}async _updateCurrentUser(e,i=!1){if(!this._deleted)return e&&O(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),i||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return we(this.app)?Promise.reject(Ve(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return we(this.app)?Promise.reject(Ve(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ie(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const i=this._getPasswordPolicyInternal();return i.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):i.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Bc(this),i=new Hc(e);this.tenantId===null?this._projectPasswordPolicy=i:this._tenantPasswordPolicies[this.tenantId]=i}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Gt("auth","Firebase",e())}onAuthStateChanged(e,i,s){return this.registerStateListener(this.authStateSubscription,e,i,s)}beforeAuthStateChanged(e,i){return this.beforeStateQueue.pushCallback(e,i)}onIdTokenChanged(e,i,s){return this.registerStateListener(this.idTokenSubscription,e,i,s)}authStateReady(){return new Promise((e,i)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},i)}})}async revokeAccessToken(e){if(this.currentUser){const i=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:i};this.tenantId!=null&&(s.tenantId=this.tenantId),await Mc(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,i){const s=await this.getOrInitRedirectPersistenceManager(i);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const i=e&&Ie(e)||this._popupRedirectResolver;O(i,this,"argument-error"),this.redirectPersistenceManager=await pt.create(this,[Ie(i._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var i,s;return this._isInitialized&&await this.queue(async()=>{}),((i=this._currentUser)===null||i===void 0?void 0:i._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,i;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(i=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&i!==void 0?i:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,i,s,r){if(this._deleted)return()=>{};const o=typeof i=="function"?i:i.next.bind(i);let c=!1;const p=this._isInitialized?Promise.resolve():this._initializationPromise;if(O(p,this,"internal-error"),p.then(()=>{c||o(this.currentUser)}),typeof i=="function"){const g=e.addObserver(i,s,r);return()=>{c=!0,g()}}else{const g=e.addObserver(i);return()=>{c=!0,g()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return O(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=wa(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const i={"X-Client-Version":this.clientVersion};this.app.options.appId&&(i["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(i["X-Firebase-Client"]=s);const r=await this._getAppCheckToken();return r&&(i["X-Firebase-AppCheck"]=r),i}async _getAppCheckToken(){var e;const i=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return i!=null&&i.error&&bc(`Error while retrieving App Check token: ${i.error}`),i==null?void 0:i.token}}function wt(t){return ke(t)}class _r{constructor(e){this.auth=e,this.observer=null,this.addObserver=al(i=>this.observer=i)}get next(){return O(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Vc(t){qn=t}function _a(t){return qn.loadJS(t)}function Wc(){return qn.recaptchaEnterpriseScript}function zc(){return qn.gapiScript}function Gc(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const Kc="recaptcha-enterprise",Jc="NO_RECAPTCHA";class Xc{constructor(e){this.type=Kc,this.auth=wt(e)}async verify(e="verify",i=!1){async function s(o){if(!i){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(c,p)=>{Pc(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(g=>{if(g.recaptchaKey===void 0)p(new Error("recaptcha Enterprise site key undefined"));else{const w=new kc(g);return o.tenantId==null?o._agentRecaptchaConfig=w:o._tenantRecaptchaConfigs[o.tenantId]=w,c(w.siteKey)}}).catch(g=>{p(g)})})}function r(o,c,p){const g=window.grecaptcha;gr(g)?g.enterprise.ready(()=>{g.enterprise.execute(o,{action:e}).then(w=>{c(w)}).catch(()=>{c(Jc)})}):p(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,c)=>{s(this.auth).then(p=>{if(!i&&gr(window.grecaptcha))r(p,o,c);else{if(typeof window=="undefined"){c(new Error("RecaptchaVerifier is only supported in browser"));return}let g=Wc();g.length!==0&&(g+=p),_a(g).then(()=>{r(p,o,c)}).catch(w=>{c(w)})}}).catch(p=>{c(p)})})}}async function Er(t,e,i,s=!1){const r=new Xc(t);let o;try{o=await r.verify(i)}catch{o=await r.verify(i,!0)}const c=Object.assign({},e);return s?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Ir(t,e,i,s){var r;if(!((r=t._getRecaptchaConfig())===null||r===void 0)&&r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Er(t,e,i,i==="getOobCode");return s(t,o)}else return s(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${i} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Er(t,e,i,i==="getOobCode");return s(t,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yc(t,e){const i=Wi(t,"auth");if(i.isInitialized()){const r=i.getImmediate(),o=i.getOptions();if(On(o,e!=null?e:{}))return r;me(r,"already-initialized")}return i.initialize({options:e})}function Qc(t,e){const i=(e==null?void 0:e.persistence)||[],s=(Array.isArray(i)?i:[i]).map(Ie);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function Zc(t,e,i){const s=wt(t);O(s._canInitEmulator,s,"emulator-config-failed"),O(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,o=Ea(e),{host:c,port:p}=ed(e),g=p===null?"":`:${p}`;s.config.emulator={url:`${o}//${c}${g}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:c,port:p,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:r})}),td()}function Ea(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function ed(t){const e=Ea(t),i=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!i)return{host:"",port:null};const s=i[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const o=r[1];return{host:o,port:Tr(s.substr(o.length+1))}}else{const[o,c]=s.split(":");return{host:o,port:Tr(c)}}}function Tr(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function td(){function t(){const e=document.createElement("p"),i=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",i.position="fixed",i.width="100%",i.backgroundColor="#ffffff",i.border=".1em solid #000000",i.color="#b50000",i.bottom="0px",i.left="0px",i.margin="0px",i.zIndex="10000",i.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e,i){this.providerId=e,this.signInMethod=i}toJSON(){return _e("not implemented")}_getIdTokenResponse(e){return _e("not implemented")}_linkToIdToken(e,i){return _e("not implemented")}_getReauthenticationResolver(e){return _e("not implemented")}}async function nd(t,e){return ze(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function id(t,e){return Hn(t,"POST","/v1/accounts:signInWithPassword",et(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sd(t,e){return Hn(t,"POST","/v1/accounts:signInWithEmailLink",et(t,e))}async function rd(t,e){return Hn(t,"POST","/v1/accounts:signInWithEmailLink",et(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt extends Yi{constructor(e,i,s,r=null){super("password",s),this._email=e,this._password=i,this._tenantId=r}static _fromEmailAndPassword(e,i){return new Wt(e,i,"password")}static _fromEmailAndCode(e,i,s=null){return new Wt(e,i,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const i=typeof e=="string"?JSON.parse(e):e;if(i!=null&&i.email&&(i!=null&&i.password)){if(i.signInMethod==="password")return this._fromEmailAndPassword(i.email,i.password);if(i.signInMethod==="emailLink")return this._fromEmailAndCode(i.email,i.password,i.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const i={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ir(e,i,"signInWithPassword",id);case"emailLink":return sd(e,{email:this._email,oobCode:this._password});default:me(e,"internal-error")}}async _linkToIdToken(e,i){switch(this.signInMethod){case"password":const s={idToken:i,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ir(e,s,"signUpPassword",nd);case"emailLink":return rd(e,{idToken:i,email:this._email,oobCode:this._password});default:me(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mt(t,e){return Hn(t,"POST","/v1/accounts:signInWithIdp",et(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad="http://localhost";class Qe extends Yi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const i=new Qe(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(i.idToken=e.idToken),e.accessToken&&(i.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(i.nonce=e.nonce),e.pendingToken&&(i.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(i.accessToken=e.oauthToken,i.secret=e.oauthTokenSecret):me("argument-error"),i}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const i=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r}=i,o=zi(i,["providerId","signInMethod"]);if(!s||!r)return null;const c=new Qe(s,r);return c.idToken=o.idToken||void 0,c.accessToken=o.accessToken||void 0,c.secret=o.secret,c.nonce=o.nonce,c.pendingToken=o.pendingToken||null,c}_getIdTokenResponse(e){const i=this.buildRequest();return mt(e,i)}_linkToIdToken(e,i){const s=this.buildRequest();return s.idToken=i,mt(e,s)}_getReauthenticationResolver(e){const i=this.buildRequest();return i.autoCreate=!1,mt(e,i)}buildRequest(){const e={requestUri:ad,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const i={};this.idToken&&(i.id_token=this.idToken),this.accessToken&&(i.access_token=this.accessToken),this.secret&&(i.oauth_token_secret=this.secret),i.providerId=this.providerId,this.nonce&&!this.pendingToken&&(i.nonce=this.nonce),e.postBody=Kt(i)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function od(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function ld(t){const e=Mt(jt(t)).link,i=e?Mt(jt(e)).deep_link_id:null,s=Mt(jt(t)).deep_link_id;return(s?Mt(jt(s)).link:null)||s||i||e||t}class Qi{constructor(e){var i,s,r,o,c,p;const g=Mt(jt(e)),w=(i=g.apiKey)!==null&&i!==void 0?i:null,T=(s=g.oobCode)!==null&&s!==void 0?s:null,_=od((r=g.mode)!==null&&r!==void 0?r:null);O(w&&T&&_,"argument-error"),this.apiKey=w,this.operation=_,this.code=T,this.continueUrl=(o=g.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(c=g.languageCode)!==null&&c!==void 0?c:null,this.tenantId=(p=g.tenantId)!==null&&p!==void 0?p:null}static parseLink(e){const i=ld(e);try{return new Qi(i)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(){this.providerId=_t.PROVIDER_ID}static credential(e,i){return Wt._fromEmailAndPassword(e,i)}static credentialWithLink(e,i){const s=Qi.parseLink(i);return O(s,"argument-error"),Wt._fromEmailAndCode(e,s.code,s.tenantId)}}_t.PROVIDER_ID="password";_t.EMAIL_PASSWORD_SIGN_IN_METHOD="password";_t.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Xt extends Ia{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je extends Xt{constructor(){super("facebook.com")}static credential(e){return Qe._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return je.credential(e.oauthAccessToken)}catch{return null}}}je.FACEBOOK_SIGN_IN_METHOD="facebook.com";je.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe extends Xt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,i){return Qe._fromParams({providerId:xe.PROVIDER_ID,signInMethod:xe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:i})}static credentialFromResult(e){return xe.credentialFromTaggedObject(e)}static credentialFromError(e){return xe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:i,oauthAccessToken:s}=e;if(!i&&!s)return null;try{return xe.credential(i,s)}catch{return null}}}xe.GOOGLE_SIGN_IN_METHOD="google.com";xe.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue extends Xt{constructor(){super("github.com")}static credential(e){return Qe._fromParams({providerId:Ue.PROVIDER_ID,signInMethod:Ue.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ue.credentialFromTaggedObject(e)}static credentialFromError(e){return Ue.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ue.credential(e.oauthAccessToken)}catch{return null}}}Ue.GITHUB_SIGN_IN_METHOD="github.com";Ue.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be extends Xt{constructor(){super("twitter.com")}static credential(e,i){return Qe._fromParams({providerId:Be.PROVIDER_ID,signInMethod:Be.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:i})}static credentialFromResult(e){return Be.credentialFromTaggedObject(e)}static credentialFromError(e){return Be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:i,oauthTokenSecret:s}=e;if(!i||!s)return null;try{return Be.credential(i,s)}catch{return null}}}Be.TWITTER_SIGN_IN_METHOD="twitter.com";Be.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,i,s,r=!1){const o=await Ee._fromIdTokenResponse(e,s,r),c=Sr(s);return new vt({user:o,providerId:c,_tokenResponse:s,operationType:i})}static async _forOperation(e,i,s){await e._updateTokensIfNecessary(s,!0);const r=Sr(s);return new vt({user:e,providerId:r,_tokenResponse:s,operationType:i})}}function Sr(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn extends Ae{constructor(e,i,s,r){var o;super(i.code,i.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,xn.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:i.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,i,s,r){return new xn(e,i,s,r)}}function Ta(t,e,i,s){return(e==="reauthenticate"?i._getReauthenticationResolver(t):i._getIdTokenResponse(t)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?xn._fromErrorAndOperation(t,o,e,s):o})}async function cd(t,e,i=!1){const s=await Vt(t,e._linkToIdToken(t.auth,await t.getIdToken()),i);return vt._forOperation(t,"link",s)}/**
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
 */async function dd(t,e,i=!1){const{auth:s}=t;if(we(s.app))return Promise.reject(Ve(s));const r="reauthenticate";try{const o=await Vt(t,Ta(s,r,e,t),i);O(o.idToken,s,"internal-error");const c=Ji(o.idToken);O(c,s,"internal-error");const{sub:p}=c;return O(t.uid===p,s,"user-mismatch"),vt._forOperation(t,r,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&me(s,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sa(t,e,i=!1){if(we(t.app))return Promise.reject(Ve(t));const s="signIn",r=await Ta(t,s,e),o=await vt._fromIdTokenResponse(t,s,r);return i||await t._updateCurrentUser(o.user),o}async function ud(t,e){return Sa(wt(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hd(t){const e=wt(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function fd(t,e,i){return we(t.app)?Promise.reject(Ve(t)):ud(ke(t),_t.credential(e,i)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&hd(t),s})}function pd(t,e,i,s){return ke(t).onIdTokenChanged(e,i,s)}function md(t,e,i){return ke(t).beforeAuthStateChanged(e,i)}function gd(t,e,i,s){return ke(t).onAuthStateChanged(e,i,s)}function Aa(t){return ke(t).signOut()}const Un="__sak";/**
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
 */class ka{constructor(e,i){this.storageRetriever=e,this.type=i}_isAvailable(){try{return this.storage?(this.storage.setItem(Un,"1"),this.storage.removeItem(Un),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,i){return this.storage.setItem(e,JSON.stringify(i)),Promise.resolve()}_get(e){const i=this.storage.getItem(e);return Promise.resolve(i?JSON.parse(i):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd=1e3,yd=10;class Pa extends ka{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,i)=>this.onStorageEvent(e,i),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ba(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const i of Object.keys(this.listeners)){const s=this.storage.getItem(i),r=this.localCache[i];s!==r&&e(i,r,s)}}onStorageEvent(e,i=!1){if(!e.key){this.forAllChangedKeys((c,p,g)=>{this.notifyListeners(c,g)});return}const s=e.key;i?this.detachListener():this.stopPolling();const r=()=>{const c=this.storage.getItem(s);!i&&this.localCache[s]===c||this.notifyListeners(s,c)},o=this.storage.getItem(s);xc()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,yd):r()}notifyListeners(e,i){this.localCache[e]=i;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(i&&JSON.parse(i))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,i,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:i,newValue:s}),!0)})},vd)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,i){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(i)}_removeListener(e,i){this.listeners[e]&&(this.listeners[e].delete(i),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,i){await super._set(e,i),this.localCache[e]=JSON.stringify(i)}async _get(e){const i=await super._get(e);return this.localCache[e]=JSON.stringify(i),i}async _remove(e){await super._remove(e),delete this.localCache[e]}}Pa.type="LOCAL";const bd=Pa;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra extends ka{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,i){}_removeListener(e,i){}}Ra.type="SESSION";const Ca=Ra;/**
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
 */function wd(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(i){return{fulfilled:!1,reason:i}}}))}/**
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
 */class Vn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const i=this.receivers.find(r=>r.isListeningto(e));if(i)return i;const s=new Vn(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const i=e,{eventId:s,eventType:r,data:o}=i.data,c=this.handlersMap[r];if(!(c!=null&&c.size))return;i.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const p=Array.from(c).map(async w=>w(i.origin,o)),g=await wd(p);i.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:g})}_subscribe(e,i){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(i)}_unsubscribe(e,i){this.handlersMap[e]&&i&&this.handlersMap[e].delete(i),(!i||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Vn.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zi(t="",e=10){let i="";for(let s=0;s<e;s++)i+=Math.floor(Math.random()*10);return t+i}/**
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
 */class _d{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,i,s=50){const r=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let o,c;return new Promise((p,g)=>{const w=Zi("",20);r.port1.start();const T=setTimeout(()=>{g(new Error("unsupported_event"))},s);c={messageChannel:r,onMessage(_){const k=_;if(k.data.eventId===w)switch(k.data.status){case"ack":clearTimeout(T),o=setTimeout(()=>{g(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),p(k.data.response);break;default:clearTimeout(T),clearTimeout(o),g(new Error("invalid_response"));break}}},this.handlers.add(c),r.port1.addEventListener("message",c.onMessage),this.target.postMessage({eventType:e,eventId:w,data:i},[r.port2])}).finally(()=>{c&&this.removeMessageHandler(c)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(){return window}function Ed(t){ve().location.href=t}/**
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
 */function La(){return typeof ve().WorkerGlobalScope!="undefined"&&typeof ve().importScripts=="function"}async function Id(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Td(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Sd(){return La()?self:null}/**
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
 */const $a="firebaseLocalStorageDb",Ad=1,Bn="firebaseLocalStorage",Na="fbase_key";class Yt{constructor(e){this.request=e}toPromise(){return new Promise((e,i)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{i(this.request.error)})})}}function Wn(t,e){return t.transaction([Bn],e?"readwrite":"readonly").objectStore(Bn)}function kd(){const t=indexedDB.deleteDatabase($a);return new Yt(t).toPromise()}function Mi(){const t=indexedDB.open($a,Ad);return new Promise((e,i)=>{t.addEventListener("error",()=>{i(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Bn,{keyPath:Na})}catch(r){i(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Bn)?e(s):(s.close(),await kd(),e(await Mi()))})})}async function Ar(t,e,i){const s=Wn(t,!0).put({[Na]:e,value:i});return new Yt(s).toPromise()}async function Pd(t,e){const i=Wn(t,!1).get(e),s=await new Yt(i).toPromise();return s===void 0?null:s.value}function kr(t,e){const i=Wn(t,!0).delete(e);return new Yt(i).toPromise()}const Rd=800,Cd=3;class Oa{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Mi(),this.db)}async _withRetries(e){let i=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(i++>Cd)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return La()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Vn._getInstance(Sd()),this.receiver._subscribe("keyChanged",async(e,i)=>({keyProcessed:(await this._poll()).includes(i.key)})),this.receiver._subscribe("ping",async(e,i)=>["keyChanged"])}async initializeSender(){var e,i;if(this.activeServiceWorker=await Id(),!this.activeServiceWorker)return;this.sender=new _d(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((i=s[0])===null||i===void 0)&&i.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Td()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Mi();return await Ar(e,Un,"1"),await kr(e,Un),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,i){return this._withPendingWrite(async()=>(await this._withRetries(s=>Ar(s,e,i)),this.localCache[e]=i,this.notifyServiceWorker(e)))}async _get(e){const i=await this._withRetries(s=>Pd(s,e));return this.localCache[e]=i,i}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(i=>kr(i,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const o=Wn(r,!1).getAll();return new Yt(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const i=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:o}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(o)&&(this.notifyListeners(r,o),i.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),i.push(r));return i}notifyListeners(e,i){this.localCache[e]=i;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(i)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Rd)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,i){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(i)}_removeListener(e,i){this.listeners[e]&&(this.listeners[e].delete(i),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Oa.type="LOCAL";const Ld=Oa;new Jt(3e4,6e4);/**
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
 */function $d(t,e){return e?Ie(e):(O(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class es extends Yi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return mt(e,this._buildIdpRequest())}_linkToIdToken(e,i){return mt(e,this._buildIdpRequest(i))}_getReauthenticationResolver(e){return mt(e,this._buildIdpRequest())}_buildIdpRequest(e){const i={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(i.idToken=e),i}}function Nd(t){return Sa(t.auth,new es(t),t.bypassAuthState)}function Od(t){const{auth:e,user:i}=t;return O(i,e,"internal-error"),dd(i,new es(t),t.bypassAuthState)}async function Dd(t){const{auth:e,user:i}=t;return O(i,e,"internal-error"),cd(i,new es(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e,i,s,r,o=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(i)?i:[i]}execute(){return new Promise(async(e,i)=>{this.pendingPromise={resolve:e,reject:i};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:i,sessionId:s,postBody:r,tenantId:o,error:c,type:p}=e;if(c){this.reject(c);return}const g={auth:this.auth,requestUri:i,sessionId:s,tenantId:o||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(p)(g))}catch(w){this.reject(w)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Nd;case"linkViaPopup":case"linkViaRedirect":return Dd;case"reauthViaPopup":case"reauthViaRedirect":return Od;default:me(this.auth,"internal-error")}}resolve(e){Se(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Se(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md=new Jt(2e3,1e4);class ut extends Da{constructor(e,i,s,r,o){super(e,i,r,o),this.provider=s,this.authWindow=null,this.pollId=null,ut.currentPopupAction&&ut.currentPopupAction.cancel(),ut.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return O(e,this.auth,"internal-error"),e}async onExecution(){Se(this.filter.length===1,"Popup operations only handle one event");const e=Zi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(i=>{this.reject(i)}),this.resolver._isIframeWebStorageSupported(this.auth,i=>{i||this.reject(ge(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ge(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ut.currentPopupAction=null}pollUserCancellation(){const e=()=>{var i,s;if(!((s=(i=this.authWindow)===null||i===void 0?void 0:i.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ge(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Md.get())};e()}}ut.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd="pendingRedirect",Pn=new Map;class xd extends Da{constructor(e,i,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],i,void 0,s),this.eventId=null}async execute(){let e=Pn.get(this.auth._key());if(!e){try{const s=await Ud(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(i){e=()=>Promise.reject(i)}Pn.set(this.auth._key(),e)}return this.bypassAuthState||Pn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const i=await this.auth._redirectUserForId(e.eventId);if(i)return this.user=i,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ud(t,e){const i=Hd(e),s=Fd(t);if(!await s._isAvailable())return!1;const r=await s._get(i)==="true";return await s._remove(i),r}function Bd(t,e){Pn.set(t._key(),e)}function Fd(t){return Ie(t._redirectPersistence)}function Hd(t){return kn(jd,t.config.apiKey,t.name)}async function qd(t,e,i=!1){if(we(t.app))return Promise.reject(Ve(t));const s=wt(t),r=$d(s,e),c=await new xd(s,r,i).execute();return c&&!i&&(delete c.user._redirectEventId,await s._persistUserIfCurrent(c.user),await s._setRedirectUser(null,e)),c}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vd=10*60*1e3;class Wd{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let i=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(i=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!zd(e)||(this.hasHandledPotentialRedirect=!0,i||(this.queuedRedirectEvent=e,i=!0)),i}sendToConsumer(e,i){var s;if(e.error&&!Ma(e)){const r=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";i.onError(ge(this.auth,r))}else i.onAuthEvent(e)}isEventForConsumer(e,i){const s=i.eventId===null||!!e.eventId&&e.eventId===i.eventId;return i.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Vd&&this.cachedEventUids.clear(),this.cachedEventUids.has(Pr(e))}saveEventToCache(e){this.cachedEventUids.add(Pr(e)),this.lastProcessedEventTime=Date.now()}}function Pr(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Ma({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function zd(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ma(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gd(t,e={}){return ze(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Jd=/^https?/;async function Xd(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Gd(t);for(const i of e)try{if(Yd(i))return}catch{}me(t,"unauthorized-domain")}function Yd(t){const e=Oi(),{protocol:i,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const c=new URL(t);return c.hostname===""&&s===""?i==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):i==="chrome-extension:"&&c.hostname===s}if(!Jd.test(i))return!1;if(Kd.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
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
 */const Qd=new Jt(3e4,6e4);function Rr(){const t=ve().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let i=0;i<t.CP.length;i++)t.CP[i]=null}}function Zd(t){return new Promise((e,i)=>{var s,r,o;function c(){Rr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Rr(),i(ge(t,"network-request-failed"))},timeout:Qd.get()})}if(!((r=(s=ve().gapi)===null||s===void 0?void 0:s.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((o=ve().gapi)===null||o===void 0)&&o.load)c();else{const p=Gc("iframefcb");return ve()[p]=()=>{gapi.load?c():i(ge(t,"network-request-failed"))},_a(`${zc()}?onload=${p}`).catch(g=>i(g))}}).catch(e=>{throw Rn=null,e})}let Rn=null;function eu(t){return Rn=Rn||Zd(t),Rn}/**
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
 */const tu=new Jt(5e3,15e3),nu="__/auth/iframe",iu="emulator/auth/iframe",su={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ru=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function au(t){const e=t.config;O(e.authDomain,t,"auth-domain-config-required");const i=e.emulator?Ki(e,iu):`https://${t.config.authDomain}/${nu}`,s={apiKey:e.apiKey,appName:t.name,v:bt},r=ru.get(t.config.apiHost);r&&(s.eid=r);const o=t._getFrameworks();return o.length&&(s.fw=o.join(",")),`${i}?${Kt(s).slice(1)}`}async function ou(t){const e=await eu(t),i=ve().gapi;return O(i,t,"internal-error"),e.open({where:document.body,url:au(t),messageHandlersFilter:i.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:su,dontclear:!0},s=>new Promise(async(r,o)=>{await s.restyle({setHideOnLeave:!1});const c=ge(t,"network-request-failed"),p=ve().setTimeout(()=>{o(c)},tu.get());function g(){ve().clearTimeout(p),r(s)}s.ping(g).then(g,()=>{o(c)})}))}/**
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
 */const lu={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},cu=500,du=600,uu="_blank",hu="http://localhost";class Cr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function fu(t,e,i,s=cu,r=du){const o=Math.max((window.screen.availHeight-r)/2,0).toString(),c=Math.max((window.screen.availWidth-s)/2,0).toString();let p="";const g=Object.assign(Object.assign({},lu),{width:s.toString(),height:r.toString(),top:o,left:c}),w=re().toLowerCase();i&&(p=pa(w)?uu:i),ha(w)&&(e=e||hu,g.scrollbars="yes");const T=Object.entries(g).reduce((k,[C,L])=>`${k}${C}=${L},`,"");if(jc(w)&&p!=="_self")return pu(e||"",p),new Cr(null);const _=window.open(e||"",p,T);O(_,t,"popup-blocked");try{_.focus()}catch{}return new Cr(_)}function pu(t,e){const i=document.createElement("a");i.href=t,i.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),i.dispatchEvent(s)}/**
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
 */const mu="__/auth/handler",gu="emulator/auth/handler",vu=encodeURIComponent("fac");async function Lr(t,e,i,s,r,o){O(t.config.authDomain,t,"auth-domain-config-required"),O(t.config.apiKey,t,"invalid-api-key");const c={apiKey:t.config.apiKey,appName:t.name,authType:i,redirectUrl:s,v:bt,eventId:r};if(e instanceof Ia){e.setDefaultLanguage(t.languageCode),c.providerId=e.providerId||"",rl(e.getCustomParameters())||(c.customParameters=JSON.stringify(e.getCustomParameters()));for(const[T,_]of Object.entries({}))c[T]=_}if(e instanceof Xt){const T=e.getScopes().filter(_=>_!=="");T.length>0&&(c.scopes=T.join(","))}t.tenantId&&(c.tid=t.tenantId);const p=c;for(const T of Object.keys(p))p[T]===void 0&&delete p[T];const g=await t._getAppCheckToken(),w=g?`#${vu}=${encodeURIComponent(g)}`:"";return`${yu(t)}?${Kt(p).slice(1)}${w}`}function yu({config:t}){return t.emulator?Ki(t,gu):`https://${t.authDomain}/${mu}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ai="webStorageSupport";class bu{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ca,this._completeRedirectFn=qd,this._overrideRedirectResult=Bd}async _openPopup(e,i,s,r){var o;Se((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const c=await Lr(e,i,s,Oi(),r);return fu(e,c,Zi())}async _openRedirect(e,i,s,r){await this._originValidation(e);const o=await Lr(e,i,s,Oi(),r);return Ed(o),new Promise(()=>{})}_initialize(e){const i=e._key();if(this.eventManagers[i]){const{manager:r,promise:o}=this.eventManagers[i];return r?Promise.resolve(r):(Se(o,"If manager is not set, promise should be"),o)}const s=this.initAndGetManager(e);return this.eventManagers[i]={promise:s},s.catch(()=>{delete this.eventManagers[i]}),s}async initAndGetManager(e){const i=await ou(e),s=new Wd(e);return i.register("authEvent",r=>(O(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=i,s}_isIframeWebStorageSupported(e,i){this.iframes[e._key()].send(Ai,{type:Ai},r=>{var o;const c=(o=r==null?void 0:r[0])===null||o===void 0?void 0:o[Ai];c!==void 0&&i(!!c),me(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const i=e._key();return this.originValidationPromises[i]||(this.originValidationPromises[i]=Xd(e)),this.originValidationPromises[i]}get _shouldInitProactively(){return ba()||fa()||Xi()}}const wu=bu;var $r="@firebase/auth",Nr="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const i=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,i),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const i=this.internalListeners.get(e);i&&(this.internalListeners.delete(e),i(),this.updateProactiveRefresh())}assertAuthConfigured(){O(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Iu(t){gt(new Ye("auth",(e,{options:i})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:c,authDomain:p}=s.options;O(c&&!c.includes(":"),"invalid-api-key",{appName:s.name});const g={apiKey:c,authDomain:p,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:wa(t)},w=new qc(s,r,o,g);return Qc(w,i),w},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,i,s)=>{e.getProvider("auth-internal").initialize()})),gt(new Ye("auth-internal",e=>{const i=wt(e.getProvider("auth").getImmediate());return(s=>new _u(s))(i)},"PRIVATE").setInstantiationMode("EXPLICIT")),qe($r,Nr,Eu(t)),qe($r,Nr,"esm2017")}/**
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
 */const Tu=5*60,Su=Xr("authIdTokenMaxAge")||Tu;let Or=null;const Au=t=>async e=>{const i=e&&await e.getIdTokenResult(),s=i&&(new Date().getTime()-Date.parse(i.issuedAtTime))/1e3;if(s&&s>Su)return;const r=i==null?void 0:i.token;Or!==r&&(Or=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function ku(t=ea()){const e=Wi(t,"auth");if(e.isInitialized())return e.getImmediate();const i=Yc(t,{popupRedirectResolver:wu,persistence:[Ld,bd,Ca]}),s=Xr("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(s,location.origin);if(location.origin===o.origin){const c=Au(o.toString());md(i,c,()=>c(i.currentUser)),pd(i,p=>c(p))}}const r=Kr("auth");return r&&Zc(i,`http://${r}`),i}function Pu(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Vc({loadJS(t){return new Promise((e,i)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const o=ge("internal-error");o.customData=r,i(o)},s.type="text/javascript",s.charset="UTF-8",Pu().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Iu("Browser");var Dr=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ja;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(h,u){function f(){}f.prototype=u.prototype,h.D=u.prototype,h.prototype=new f,h.prototype.constructor=h,h.C=function(v,y,b){for(var m=Array(arguments.length-2),H=2;H<arguments.length;H++)m[H-2]=arguments[H];return u.prototype[y].apply(v,m)}}function i(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,i),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(h,u,f){f||(f=0);var v=Array(16);if(typeof u=="string")for(var y=0;16>y;++y)v[y]=u.charCodeAt(f++)|u.charCodeAt(f++)<<8|u.charCodeAt(f++)<<16|u.charCodeAt(f++)<<24;else for(y=0;16>y;++y)v[y]=u[f++]|u[f++]<<8|u[f++]<<16|u[f++]<<24;u=h.g[0],f=h.g[1],y=h.g[2];var b=h.g[3],m=u+(b^f&(y^b))+v[0]+3614090360&4294967295;u=f+(m<<7&4294967295|m>>>25),m=b+(y^u&(f^y))+v[1]+3905402710&4294967295,b=u+(m<<12&4294967295|m>>>20),m=y+(f^b&(u^f))+v[2]+606105819&4294967295,y=b+(m<<17&4294967295|m>>>15),m=f+(u^y&(b^u))+v[3]+3250441966&4294967295,f=y+(m<<22&4294967295|m>>>10),m=u+(b^f&(y^b))+v[4]+4118548399&4294967295,u=f+(m<<7&4294967295|m>>>25),m=b+(y^u&(f^y))+v[5]+1200080426&4294967295,b=u+(m<<12&4294967295|m>>>20),m=y+(f^b&(u^f))+v[6]+2821735955&4294967295,y=b+(m<<17&4294967295|m>>>15),m=f+(u^y&(b^u))+v[7]+4249261313&4294967295,f=y+(m<<22&4294967295|m>>>10),m=u+(b^f&(y^b))+v[8]+1770035416&4294967295,u=f+(m<<7&4294967295|m>>>25),m=b+(y^u&(f^y))+v[9]+2336552879&4294967295,b=u+(m<<12&4294967295|m>>>20),m=y+(f^b&(u^f))+v[10]+4294925233&4294967295,y=b+(m<<17&4294967295|m>>>15),m=f+(u^y&(b^u))+v[11]+2304563134&4294967295,f=y+(m<<22&4294967295|m>>>10),m=u+(b^f&(y^b))+v[12]+1804603682&4294967295,u=f+(m<<7&4294967295|m>>>25),m=b+(y^u&(f^y))+v[13]+4254626195&4294967295,b=u+(m<<12&4294967295|m>>>20),m=y+(f^b&(u^f))+v[14]+2792965006&4294967295,y=b+(m<<17&4294967295|m>>>15),m=f+(u^y&(b^u))+v[15]+1236535329&4294967295,f=y+(m<<22&4294967295|m>>>10),m=u+(y^b&(f^y))+v[1]+4129170786&4294967295,u=f+(m<<5&4294967295|m>>>27),m=b+(f^y&(u^f))+v[6]+3225465664&4294967295,b=u+(m<<9&4294967295|m>>>23),m=y+(u^f&(b^u))+v[11]+643717713&4294967295,y=b+(m<<14&4294967295|m>>>18),m=f+(b^u&(y^b))+v[0]+3921069994&4294967295,f=y+(m<<20&4294967295|m>>>12),m=u+(y^b&(f^y))+v[5]+3593408605&4294967295,u=f+(m<<5&4294967295|m>>>27),m=b+(f^y&(u^f))+v[10]+38016083&4294967295,b=u+(m<<9&4294967295|m>>>23),m=y+(u^f&(b^u))+v[15]+3634488961&4294967295,y=b+(m<<14&4294967295|m>>>18),m=f+(b^u&(y^b))+v[4]+3889429448&4294967295,f=y+(m<<20&4294967295|m>>>12),m=u+(y^b&(f^y))+v[9]+568446438&4294967295,u=f+(m<<5&4294967295|m>>>27),m=b+(f^y&(u^f))+v[14]+3275163606&4294967295,b=u+(m<<9&4294967295|m>>>23),m=y+(u^f&(b^u))+v[3]+4107603335&4294967295,y=b+(m<<14&4294967295|m>>>18),m=f+(b^u&(y^b))+v[8]+1163531501&4294967295,f=y+(m<<20&4294967295|m>>>12),m=u+(y^b&(f^y))+v[13]+2850285829&4294967295,u=f+(m<<5&4294967295|m>>>27),m=b+(f^y&(u^f))+v[2]+4243563512&4294967295,b=u+(m<<9&4294967295|m>>>23),m=y+(u^f&(b^u))+v[7]+1735328473&4294967295,y=b+(m<<14&4294967295|m>>>18),m=f+(b^u&(y^b))+v[12]+2368359562&4294967295,f=y+(m<<20&4294967295|m>>>12),m=u+(f^y^b)+v[5]+4294588738&4294967295,u=f+(m<<4&4294967295|m>>>28),m=b+(u^f^y)+v[8]+2272392833&4294967295,b=u+(m<<11&4294967295|m>>>21),m=y+(b^u^f)+v[11]+1839030562&4294967295,y=b+(m<<16&4294967295|m>>>16),m=f+(y^b^u)+v[14]+4259657740&4294967295,f=y+(m<<23&4294967295|m>>>9),m=u+(f^y^b)+v[1]+2763975236&4294967295,u=f+(m<<4&4294967295|m>>>28),m=b+(u^f^y)+v[4]+1272893353&4294967295,b=u+(m<<11&4294967295|m>>>21),m=y+(b^u^f)+v[7]+4139469664&4294967295,y=b+(m<<16&4294967295|m>>>16),m=f+(y^b^u)+v[10]+3200236656&4294967295,f=y+(m<<23&4294967295|m>>>9),m=u+(f^y^b)+v[13]+681279174&4294967295,u=f+(m<<4&4294967295|m>>>28),m=b+(u^f^y)+v[0]+3936430074&4294967295,b=u+(m<<11&4294967295|m>>>21),m=y+(b^u^f)+v[3]+3572445317&4294967295,y=b+(m<<16&4294967295|m>>>16),m=f+(y^b^u)+v[6]+76029189&4294967295,f=y+(m<<23&4294967295|m>>>9),m=u+(f^y^b)+v[9]+3654602809&4294967295,u=f+(m<<4&4294967295|m>>>28),m=b+(u^f^y)+v[12]+3873151461&4294967295,b=u+(m<<11&4294967295|m>>>21),m=y+(b^u^f)+v[15]+530742520&4294967295,y=b+(m<<16&4294967295|m>>>16),m=f+(y^b^u)+v[2]+3299628645&4294967295,f=y+(m<<23&4294967295|m>>>9),m=u+(y^(f|~b))+v[0]+4096336452&4294967295,u=f+(m<<6&4294967295|m>>>26),m=b+(f^(u|~y))+v[7]+1126891415&4294967295,b=u+(m<<10&4294967295|m>>>22),m=y+(u^(b|~f))+v[14]+2878612391&4294967295,y=b+(m<<15&4294967295|m>>>17),m=f+(b^(y|~u))+v[5]+4237533241&4294967295,f=y+(m<<21&4294967295|m>>>11),m=u+(y^(f|~b))+v[12]+1700485571&4294967295,u=f+(m<<6&4294967295|m>>>26),m=b+(f^(u|~y))+v[3]+2399980690&4294967295,b=u+(m<<10&4294967295|m>>>22),m=y+(u^(b|~f))+v[10]+4293915773&4294967295,y=b+(m<<15&4294967295|m>>>17),m=f+(b^(y|~u))+v[1]+2240044497&4294967295,f=y+(m<<21&4294967295|m>>>11),m=u+(y^(f|~b))+v[8]+1873313359&4294967295,u=f+(m<<6&4294967295|m>>>26),m=b+(f^(u|~y))+v[15]+4264355552&4294967295,b=u+(m<<10&4294967295|m>>>22),m=y+(u^(b|~f))+v[6]+2734768916&4294967295,y=b+(m<<15&4294967295|m>>>17),m=f+(b^(y|~u))+v[13]+1309151649&4294967295,f=y+(m<<21&4294967295|m>>>11),m=u+(y^(f|~b))+v[4]+4149444226&4294967295,u=f+(m<<6&4294967295|m>>>26),m=b+(f^(u|~y))+v[11]+3174756917&4294967295,b=u+(m<<10&4294967295|m>>>22),m=y+(u^(b|~f))+v[2]+718787259&4294967295,y=b+(m<<15&4294967295|m>>>17),m=f+(b^(y|~u))+v[9]+3951481745&4294967295,h.g[0]=h.g[0]+u&4294967295,h.g[1]=h.g[1]+(y+(m<<21&4294967295|m>>>11))&4294967295,h.g[2]=h.g[2]+y&4294967295,h.g[3]=h.g[3]+b&4294967295}s.prototype.u=function(h,u){u===void 0&&(u=h.length);for(var f=u-this.blockSize,v=this.B,y=this.h,b=0;b<u;){if(y==0)for(;b<=f;)r(this,h,b),b+=this.blockSize;if(typeof h=="string"){for(;b<u;)if(v[y++]=h.charCodeAt(b++),y==this.blockSize){r(this,v),y=0;break}}else for(;b<u;)if(v[y++]=h[b++],y==this.blockSize){r(this,v),y=0;break}}this.h=y,this.o+=u},s.prototype.v=function(){var h=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);h[0]=128;for(var u=1;u<h.length-8;++u)h[u]=0;var f=8*this.o;for(u=h.length-8;u<h.length;++u)h[u]=f&255,f/=256;for(this.u(h),h=Array(16),u=f=0;4>u;++u)for(var v=0;32>v;v+=8)h[f++]=this.g[u]>>>v&255;return h};function o(h,u){var f=p;return Object.prototype.hasOwnProperty.call(f,h)?f[h]:f[h]=u(h)}function c(h,u){this.h=u;for(var f=[],v=!0,y=h.length-1;0<=y;y--){var b=h[y]|0;v&&b==u||(f[y]=b,v=!1)}this.g=f}var p={};function g(h){return-128<=h&&128>h?o(h,function(u){return new c([u|0],0>u?-1:0)}):new c([h|0],0>h?-1:0)}function w(h){if(isNaN(h)||!isFinite(h))return _;if(0>h)return D(w(-h));for(var u=[],f=1,v=0;h>=f;v++)u[v]=h/f|0,f*=4294967296;return new c(u,0)}function T(h,u){if(h.length==0)throw Error("number format error: empty string");if(u=u||10,2>u||36<u)throw Error("radix out of range: "+u);if(h.charAt(0)=="-")return D(T(h.substring(1),u));if(0<=h.indexOf("-"))throw Error('number format error: interior "-" character');for(var f=w(Math.pow(u,8)),v=_,y=0;y<h.length;y+=8){var b=Math.min(8,h.length-y),m=parseInt(h.substring(y,y+b),u);8>b?(b=w(Math.pow(u,b)),v=v.j(b).add(w(m))):(v=v.j(f),v=v.add(w(m)))}return v}var _=g(0),k=g(1),C=g(16777216);t=c.prototype,t.m=function(){if(j(this))return-D(this).m();for(var h=0,u=1,f=0;f<this.g.length;f++){var v=this.i(f);h+=(0<=v?v:4294967296+v)*u,u*=4294967296}return h},t.toString=function(h){if(h=h||10,2>h||36<h)throw Error("radix out of range: "+h);if(L(this))return"0";if(j(this))return"-"+D(this).toString(h);for(var u=w(Math.pow(h,6)),f=this,v="";;){var y=M(f,u).g;f=A(f,y.j(u));var b=((0<f.g.length?f.g[0]:f.h)>>>0).toString(h);if(f=y,L(f))return b+v;for(;6>b.length;)b="0"+b;v=b+v}},t.i=function(h){return 0>h?0:h<this.g.length?this.g[h]:this.h};function L(h){if(h.h!=0)return!1;for(var u=0;u<h.g.length;u++)if(h.g[u]!=0)return!1;return!0}function j(h){return h.h==-1}t.l=function(h){return h=A(this,h),j(h)?-1:L(h)?0:1};function D(h){for(var u=h.g.length,f=[],v=0;v<u;v++)f[v]=~h.g[v];return new c(f,~h.h).add(k)}t.abs=function(){return j(this)?D(this):this},t.add=function(h){for(var u=Math.max(this.g.length,h.g.length),f=[],v=0,y=0;y<=u;y++){var b=v+(this.i(y)&65535)+(h.i(y)&65535),m=(b>>>16)+(this.i(y)>>>16)+(h.i(y)>>>16);v=m>>>16,b&=65535,m&=65535,f[y]=m<<16|b}return new c(f,f[f.length-1]&-2147483648?-1:0)};function A(h,u){return h.add(D(u))}t.j=function(h){if(L(this)||L(h))return _;if(j(this))return j(h)?D(this).j(D(h)):D(D(this).j(h));if(j(h))return D(this.j(D(h)));if(0>this.l(C)&&0>h.l(C))return w(this.m()*h.m());for(var u=this.g.length+h.g.length,f=[],v=0;v<2*u;v++)f[v]=0;for(v=0;v<this.g.length;v++)for(var y=0;y<h.g.length;y++){var b=this.i(v)>>>16,m=this.i(v)&65535,H=h.i(y)>>>16,ue=h.i(y)&65535;f[2*v+2*y]+=m*ue,$(f,2*v+2*y),f[2*v+2*y+1]+=b*ue,$(f,2*v+2*y+1),f[2*v+2*y+1]+=m*H,$(f,2*v+2*y+1),f[2*v+2*y+2]+=b*H,$(f,2*v+2*y+2)}for(v=0;v<u;v++)f[v]=f[2*v+1]<<16|f[2*v];for(v=u;v<2*u;v++)f[v]=0;return new c(f,0)};function $(h,u){for(;(h[u]&65535)!=h[u];)h[u+1]+=h[u]>>>16,h[u]&=65535,u++}function N(h,u){this.g=h,this.h=u}function M(h,u){if(L(u))throw Error("division by zero");if(L(h))return new N(_,_);if(j(h))return u=M(D(h),u),new N(D(u.g),D(u.h));if(j(u))return u=M(h,D(u)),new N(D(u.g),u.h);if(30<h.g.length){if(j(h)||j(u))throw Error("slowDivide_ only works with positive integers.");for(var f=k,v=u;0>=v.l(h);)f=F(f),v=F(v);var y=W(f,1),b=W(v,1);for(v=W(v,2),f=W(f,2);!L(v);){var m=b.add(v);0>=m.l(h)&&(y=y.add(f),b=m),v=W(v,1),f=W(f,1)}return u=A(h,y.j(u)),new N(y,u)}for(y=_;0<=h.l(u);){for(f=Math.max(1,Math.floor(h.m()/u.m())),v=Math.ceil(Math.log(f)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),b=w(f),m=b.j(u);j(m)||0<m.l(h);)f-=v,b=w(f),m=b.j(u);L(b)&&(b=k),y=y.add(b),h=A(h,m)}return new N(y,h)}t.A=function(h){return M(this,h).h},t.and=function(h){for(var u=Math.max(this.g.length,h.g.length),f=[],v=0;v<u;v++)f[v]=this.i(v)&h.i(v);return new c(f,this.h&h.h)},t.or=function(h){for(var u=Math.max(this.g.length,h.g.length),f=[],v=0;v<u;v++)f[v]=this.i(v)|h.i(v);return new c(f,this.h|h.h)},t.xor=function(h){for(var u=Math.max(this.g.length,h.g.length),f=[],v=0;v<u;v++)f[v]=this.i(v)^h.i(v);return new c(f,this.h^h.h)};function F(h){for(var u=h.g.length+1,f=[],v=0;v<u;v++)f[v]=h.i(v)<<1|h.i(v-1)>>>31;return new c(f,h.h)}function W(h,u){var f=u>>5;u%=32;for(var v=h.g.length-f,y=[],b=0;b<v;b++)y[b]=0<u?h.i(b+f)>>>u|h.i(b+f+1)<<32-u:h.i(b+f);return new c(y,h.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.A,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=w,c.fromString=T,ja=c}).apply(typeof Dr!="undefined"?Dr:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var _n=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(n,a,l){return n==Array.prototype||n==Object.prototype||(n[a]=l.value),n};function i(n){n=[typeof globalThis=="object"&&globalThis,n,typeof window=="object"&&window,typeof self=="object"&&self,typeof _n=="object"&&_n];for(var a=0;a<n.length;++a){var l=n[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var s=i(this);function r(n,a){if(a)e:{var l=s;n=n.split(".");for(var d=0;d<n.length-1;d++){var E=n[d];if(!(E in l))break e;l=l[E]}n=n[n.length-1],d=l[n],a=a(d),a!=d&&a!=null&&e(l,n,{configurable:!0,writable:!0,value:a})}}function o(n,a){n instanceof String&&(n+="");var l=0,d=!1,E={next:function(){if(!d&&l<n.length){var I=l++;return{value:a(I,n[I]),done:!1}}return d=!0,{done:!0,value:void 0}}};return E[Symbol.iterator]=function(){return E},E}r("Array.prototype.values",function(n){return n||function(){return o(this,function(a,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var c=c||{},p=this||self;function g(n){var a=typeof n;return a=a!="object"?a:n?Array.isArray(n)?"array":a:"null",a=="array"||a=="object"&&typeof n.length=="number"}function w(n){var a=typeof n;return a=="object"&&n!=null||a=="function"}function T(n,a,l){return n.call.apply(n.bind,arguments)}function _(n,a,l){if(!n)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var E=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(E,d),n.apply(a,E)}}return function(){return n.apply(a,arguments)}}function k(n,a,l){return k=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?T:_,k.apply(null,arguments)}function C(n,a){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),n.apply(this,d)}}function L(n,a){function l(){}l.prototype=a.prototype,n.aa=a.prototype,n.prototype=new l,n.prototype.constructor=n,n.Qb=function(d,E,I){for(var P=Array(arguments.length-2),q=2;q<arguments.length;q++)P[q-2]=arguments[q];return a.prototype[E].apply(d,P)}}function j(n){const a=n.length;if(0<a){const l=Array(a);for(let d=0;d<a;d++)l[d]=n[d];return l}return[]}function D(n,a){for(let l=1;l<arguments.length;l++){const d=arguments[l];if(g(d)){const E=n.length||0,I=d.length||0;n.length=E+I;for(let P=0;P<I;P++)n[E+P]=d[P]}else n.push(d)}}class A{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function $(n){return/^[\s\xa0]*$/.test(n)}function N(){var n=p.navigator;return n&&(n=n.userAgent)?n:""}function M(n){return M[" "](n),n}M[" "]=function(){};var F=N().indexOf("Gecko")!=-1&&!(N().toLowerCase().indexOf("webkit")!=-1&&N().indexOf("Edge")==-1)&&!(N().indexOf("Trident")!=-1||N().indexOf("MSIE")!=-1)&&N().indexOf("Edge")==-1;function W(n,a,l){for(const d in n)a.call(l,n[d],d,n)}function h(n,a){for(const l in n)a.call(void 0,n[l],l,n)}function u(n){const a={};for(const l in n)a[l]=n[l];return a}const f="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(n,a){let l,d;for(let E=1;E<arguments.length;E++){d=arguments[E];for(l in d)n[l]=d[l];for(let I=0;I<f.length;I++)l=f[I],Object.prototype.hasOwnProperty.call(d,l)&&(n[l]=d[l])}}function y(n){var a=1;n=n.split(":");const l=[];for(;0<a&&n.length;)l.push(n.shift()),a--;return n.length&&l.push(n.join(":")),l}function b(n){p.setTimeout(()=>{throw n},0)}function m(){var n=tt;let a=null;return n.g&&(a=n.g,n.g=n.g.next,n.g||(n.h=null),a.next=null),a}class H{constructor(){this.h=this.g=null}add(a,l){const d=ue.get();d.set(a,l),this.h?this.h.next=d:this.g=d,this.h=d}}var ue=new A(()=>new en,n=>n.reset());class en{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let Re,Ce=!1,tt=new H,Et=()=>{const n=p.Promise.resolve(void 0);Re=()=>{n.then(tn)}};var tn=()=>{for(var n;n=m();){try{n.h.call(n.g)}catch(l){b(l)}var a=ue;a.j(n),100>a.h&&(a.h++,n.next=a.g,a.g=n)}Ce=!1};function G(){this.s=this.s,this.C=this.C}G.prototype.s=!1,G.prototype.ma=function(){this.s||(this.s=!0,this.N())},G.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function K(n,a){this.type=n,this.g=this.target=a,this.defaultPrevented=!1}K.prototype.h=function(){this.defaultPrevented=!0};var Le=function(){if(!p.addEventListener||!Object.defineProperty)return!1;var n=!1,a=Object.defineProperty({},"passive",{get:function(){n=!0}});try{const l=()=>{};p.addEventListener("test",l,a),p.removeEventListener("test",l,a)}catch{}return n}();function ce(n,a){if(K.call(this,n?n.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,n){var l=this.type=n.type,d=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:null;if(this.target=n.target||n.srcElement,this.g=a,a=n.relatedTarget){if(F){e:{try{M(a.nodeName);var E=!0;break e}catch{}E=!1}E||(a=null)}}else l=="mouseover"?a=n.fromElement:l=="mouseout"&&(a=n.toElement);this.relatedTarget=a,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0),this.button=n.button,this.key=n.key||"",this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.pointerId=n.pointerId||0,this.pointerType=typeof n.pointerType=="string"?n.pointerType:nn[n.pointerType]||"",this.state=n.state,this.i=n,n.defaultPrevented&&ce.aa.h.call(this)}}L(ce,K);var nn={2:"touch",3:"pen",4:"mouse"};ce.prototype.h=function(){ce.aa.h.call(this);var n=this.i;n.preventDefault?n.preventDefault():n.returnValue=!1};var sn="closure_listenable_"+(1e6*Math.random()|0),ro=0;function ao(n,a,l,d,E){this.listener=n,this.proxy=null,this.src=a,this.type=l,this.capture=!!d,this.ha=E,this.key=++ro,this.da=this.fa=!1}function rn(n){n.da=!0,n.listener=null,n.proxy=null,n.src=null,n.ha=null}function an(n){this.src=n,this.g={},this.h=0}an.prototype.add=function(n,a,l,d,E){var I=n.toString();n=this.g[I],n||(n=this.g[I]=[],this.h++);var P=Xn(n,a,d,E);return-1<P?(a=n[P],l||(a.fa=!1)):(a=new ao(a,this.src,I,!!d,E),a.fa=l,n.push(a)),a};function Jn(n,a){var l=a.type;if(l in n.g){var d=n.g[l],E=Array.prototype.indexOf.call(d,a,void 0),I;(I=0<=E)&&Array.prototype.splice.call(d,E,1),I&&(rn(a),n.g[l].length==0&&(delete n.g[l],n.h--))}}function Xn(n,a,l,d){for(var E=0;E<n.length;++E){var I=n[E];if(!I.da&&I.listener==a&&I.capture==!!l&&I.ha==d)return E}return-1}var Yn="closure_lm_"+(1e6*Math.random()|0),Qn={};function ls(n,a,l,d,E){if(Array.isArray(a)){for(var I=0;I<a.length;I++)ls(n,a[I],l,d,E);return null}return l=us(l),n&&n[sn]?n.K(a,l,w(d)?!!d.capture:!1,E):oo(n,a,l,!1,d,E)}function oo(n,a,l,d,E,I){if(!a)throw Error("Invalid event type");var P=w(E)?!!E.capture:!!E,q=ei(n);if(q||(n[Yn]=q=new an(n)),l=q.add(a,l,d,P,I),l.proxy)return l;if(d=lo(),l.proxy=d,d.src=n,d.listener=l,n.addEventListener)Le||(E=P),E===void 0&&(E=!1),n.addEventListener(a.toString(),d,E);else if(n.attachEvent)n.attachEvent(ds(a.toString()),d);else if(n.addListener&&n.removeListener)n.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function lo(){function n(l){return a.call(n.src,n.listener,l)}const a=co;return n}function cs(n,a,l,d,E){if(Array.isArray(a))for(var I=0;I<a.length;I++)cs(n,a[I],l,d,E);else d=w(d)?!!d.capture:!!d,l=us(l),n&&n[sn]?(n=n.i,a=String(a).toString(),a in n.g&&(I=n.g[a],l=Xn(I,l,d,E),-1<l&&(rn(I[l]),Array.prototype.splice.call(I,l,1),I.length==0&&(delete n.g[a],n.h--)))):n&&(n=ei(n))&&(a=n.g[a.toString()],n=-1,a&&(n=Xn(a,l,d,E)),(l=-1<n?a[n]:null)&&Zn(l))}function Zn(n){if(typeof n!="number"&&n&&!n.da){var a=n.src;if(a&&a[sn])Jn(a.i,n);else{var l=n.type,d=n.proxy;a.removeEventListener?a.removeEventListener(l,d,n.capture):a.detachEvent?a.detachEvent(ds(l),d):a.addListener&&a.removeListener&&a.removeListener(d),(l=ei(a))?(Jn(l,n),l.h==0&&(l.src=null,a[Yn]=null)):rn(n)}}}function ds(n){return n in Qn?Qn[n]:Qn[n]="on"+n}function co(n,a){if(n.da)n=!0;else{a=new ce(a,this);var l=n.listener,d=n.ha||n.src;n.fa&&Zn(n),n=l.call(d,a)}return n}function ei(n){return n=n[Yn],n instanceof an?n:null}var ti="__closure_events_fn_"+(1e9*Math.random()>>>0);function us(n){return typeof n=="function"?n:(n[ti]||(n[ti]=function(a){return n.handleEvent(a)}),n[ti])}function Z(){G.call(this),this.i=new an(this),this.M=this,this.F=null}L(Z,G),Z.prototype[sn]=!0,Z.prototype.removeEventListener=function(n,a,l,d){cs(this,n,a,l,d)};function ne(n,a){var l,d=n.F;if(d)for(l=[];d;d=d.F)l.push(d);if(n=n.M,d=a.type||a,typeof a=="string")a=new K(a,n);else if(a instanceof K)a.target=a.target||n;else{var E=a;a=new K(d,n),v(a,E)}if(E=!0,l)for(var I=l.length-1;0<=I;I--){var P=a.g=l[I];E=on(P,d,!0,a)&&E}if(P=a.g=n,E=on(P,d,!0,a)&&E,E=on(P,d,!1,a)&&E,l)for(I=0;I<l.length;I++)P=a.g=l[I],E=on(P,d,!1,a)&&E}Z.prototype.N=function(){if(Z.aa.N.call(this),this.i){var n=this.i,a;for(a in n.g){for(var l=n.g[a],d=0;d<l.length;d++)rn(l[d]);delete n.g[a],n.h--}}this.F=null},Z.prototype.K=function(n,a,l,d){return this.i.add(String(n),a,!1,l,d)},Z.prototype.L=function(n,a,l,d){return this.i.add(String(n),a,!0,l,d)};function on(n,a,l,d){if(a=n.i.g[String(a)],!a)return!0;a=a.concat();for(var E=!0,I=0;I<a.length;++I){var P=a[I];if(P&&!P.da&&P.capture==l){var q=P.listener,Q=P.ha||P.src;P.fa&&Jn(n.i,P),E=q.call(Q,d)!==!1&&E}}return E&&!d.defaultPrevented}function hs(n,a,l){if(typeof n=="function")l&&(n=k(n,l));else if(n&&typeof n.handleEvent=="function")n=k(n.handleEvent,n);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:p.setTimeout(n,a||0)}function fs(n){n.g=hs(()=>{n.g=null,n.i&&(n.i=!1,fs(n))},n.l);const a=n.h;n.h=null,n.m.apply(null,a)}class uo extends G{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:fs(this)}N(){super.N(),this.g&&(p.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function It(n){G.call(this),this.h=n,this.g={}}L(It,G);var ps=[];function ms(n){W(n.g,function(a,l){this.g.hasOwnProperty(l)&&Zn(a)},n),n.g={}}It.prototype.N=function(){It.aa.N.call(this),ms(this)},It.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ni=p.JSON.stringify,ho=p.JSON.parse,fo=class{stringify(n){return p.JSON.stringify(n,void 0)}parse(n){return p.JSON.parse(n,void 0)}};function ii(){}ii.prototype.h=null;function gs(n){return n.h||(n.h=n.i())}function po(){}var Tt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function si(){K.call(this,"d")}L(si,K);function ri(){K.call(this,"c")}L(ri,K);var nt={},vs=null;function ai(){return vs=vs||new Z}nt.La="serverreachability";function ys(n){K.call(this,nt.La,n)}L(ys,K);function St(n){const a=ai();ne(a,new ys(a))}nt.STAT_EVENT="statevent";function bs(n,a){K.call(this,nt.STAT_EVENT,n),this.stat=a}L(bs,K);function ie(n){const a=ai();ne(a,new bs(a,n))}nt.Ma="timingevent";function ws(n,a){K.call(this,nt.Ma,n),this.size=a}L(ws,K);function At(n,a){if(typeof n!="function")throw Error("Fn must not be null and must be a function");return p.setTimeout(function(){n()},a)}function kt(){this.g=!0}kt.prototype.xa=function(){this.g=!1};function mo(n,a,l,d,E,I){n.info(function(){if(n.g)if(I)for(var P="",q=I.split("&"),Q=0;Q<q.length;Q++){var U=q[Q].split("=");if(1<U.length){var ee=U[0];U=U[1];var te=ee.split("_");P=2<=te.length&&te[1]=="type"?P+(ee+"="+U+"&"):P+(ee+"=redacted&")}}else P=null;else P=I;return"XMLHTTP REQ ("+d+") [attempt "+E+"]: "+a+`
`+l+`
`+P})}function go(n,a,l,d,E,I,P){n.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+E+"]: "+a+`
`+l+`
`+I+" "+P})}function it(n,a,l,d){n.info(function(){return"XMLHTTP TEXT ("+a+"): "+yo(n,l)+(d?" "+d:"")})}function vo(n,a){n.info(function(){return"TIMEOUT: "+a})}kt.prototype.info=function(){};function yo(n,a){if(!n.g)return a;if(!a)return null;try{var l=JSON.parse(a);if(l){for(n=0;n<l.length;n++)if(Array.isArray(l[n])){var d=l[n];if(!(2>d.length)){var E=d[1];if(Array.isArray(E)&&!(1>E.length)){var I=E[0];if(I!="noop"&&I!="stop"&&I!="close")for(var P=1;P<E.length;P++)E[P]=""}}}}return ni(l)}catch{return a}}var oi={NO_ERROR:0,TIMEOUT:8},bo={},li;function ln(){}L(ln,ii),ln.prototype.g=function(){return new XMLHttpRequest},ln.prototype.i=function(){return{}},li=new ln;function $e(n,a,l,d){this.j=n,this.i=a,this.l=l,this.R=d||1,this.U=new It(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new _s}function _s(){this.i=null,this.g="",this.h=!1}var Es={},ci={};function di(n,a,l){n.L=1,n.v=hn(ye(a)),n.m=l,n.P=!0,Is(n,null)}function Is(n,a){n.F=Date.now(),cn(n),n.A=ye(n.v);var l=n.A,d=n.R;Array.isArray(d)||(d=[String(d)]),js(l.i,"t",d),n.C=0,l=n.j.J,n.h=new _s,n.g=tr(n.j,l?a:null,!n.m),0<n.O&&(n.M=new uo(k(n.Y,n,n.g),n.O)),a=n.U,l=n.g,d=n.ca;var E="readystatechange";Array.isArray(E)||(E&&(ps[0]=E.toString()),E=ps);for(var I=0;I<E.length;I++){var P=ls(l,E[I],d||a.handleEvent,!1,a.h||a);if(!P)break;a.g[P.key]=P}a=n.H?u(n.H):{},n.m?(n.u||(n.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",n.g.ea(n.A,n.u,n.m,a)):(n.u="GET",n.g.ea(n.A,n.u,null,a)),St(),mo(n.i,n.u,n.A,n.l,n.R,n.m)}$e.prototype.ca=function(n){n=n.target;const a=this.M;a&&be(n)==3?a.j():this.Y(n)},$e.prototype.Y=function(n){try{if(n==this.g)e:{const te=be(this.g);var a=this.g.Ba();const at=this.g.Z();if(!(3>te)&&(te!=3||this.g&&(this.h.h||this.g.oa()||Vs(this.g)))){this.J||te!=4||a==7||(a==8||0>=at?St(3):St(2)),ui(this);var l=this.g.Z();this.X=l;t:if(Ts(this)){var d=Vs(this.g);n="";var E=d.length,I=be(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Ge(this),Pt(this);var P="";break t}this.h.i=new p.TextDecoder}for(a=0;a<E;a++)this.h.h=!0,n+=this.h.i.decode(d[a],{stream:!(I&&a==E-1)});d.length=0,this.h.g+=n,this.C=0,P=this.h.g}else P=this.g.oa();if(this.o=l==200,go(this.i,this.u,this.A,this.l,this.R,te,l),this.o){if(this.T&&!this.K){t:{if(this.g){var q,Q=this.g;if((q=Q.g?Q.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!$(q)){var U=q;break t}}U=null}if(l=U)it(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,hi(this,l);else{this.o=!1,this.s=3,ie(12),Ge(this),Pt(this);break e}}if(this.P){l=!0;let he;for(;!this.J&&this.C<P.length;)if(he=wo(this,P),he==ci){te==4&&(this.s=4,ie(14),l=!1),it(this.i,this.l,null,"[Incomplete Response]");break}else if(he==Es){this.s=4,ie(15),it(this.i,this.l,P,"[Invalid Chunk]"),l=!1;break}else it(this.i,this.l,he,null),hi(this,he);if(Ts(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),te!=4||P.length!=0||this.h.h||(this.s=1,ie(16),l=!1),this.o=this.o&&l,!l)it(this.i,this.l,P,"[Invalid Chunked Response]"),Ge(this),Pt(this);else if(0<P.length&&!this.W){this.W=!0;var ee=this.j;ee.g==this&&ee.ba&&!ee.M&&(ee.j.info("Great, no buffering proxy detected. Bytes received: "+P.length),yi(ee),ee.M=!0,ie(11))}}else it(this.i,this.l,P,null),hi(this,P);te==4&&Ge(this),this.o&&!this.J&&(te==4?Ys(this.j,this):(this.o=!1,cn(this)))}else jo(this.g),l==400&&0<P.indexOf("Unknown SID")?(this.s=3,ie(12)):(this.s=0,ie(13)),Ge(this),Pt(this)}}}catch{}finally{}};function Ts(n){return n.g?n.u=="GET"&&n.L!=2&&n.j.Ca:!1}function wo(n,a){var l=n.C,d=a.indexOf(`
`,l);return d==-1?ci:(l=Number(a.substring(l,d)),isNaN(l)?Es:(d+=1,d+l>a.length?ci:(a=a.slice(d,d+l),n.C=d+l,a)))}$e.prototype.cancel=function(){this.J=!0,Ge(this)};function cn(n){n.S=Date.now()+n.I,Ss(n,n.I)}function Ss(n,a){if(n.B!=null)throw Error("WatchDog timer not null");n.B=At(k(n.ba,n),a)}function ui(n){n.B&&(p.clearTimeout(n.B),n.B=null)}$e.prototype.ba=function(){this.B=null;const n=Date.now();0<=n-this.S?(vo(this.i,this.A),this.L!=2&&(St(),ie(17)),Ge(this),this.s=2,Pt(this)):Ss(this,this.S-n)};function Pt(n){n.j.G==0||n.J||Ys(n.j,n)}function Ge(n){ui(n);var a=n.M;a&&typeof a.ma=="function"&&a.ma(),n.M=null,ms(n.U),n.g&&(a=n.g,n.g=null,a.abort(),a.ma())}function hi(n,a){try{var l=n.j;if(l.G!=0&&(l.g==n||fi(l.h,n))){if(!n.K&&fi(l.h,n)&&l.G==3){try{var d=l.Da.g.parse(a)}catch{d=null}if(Array.isArray(d)&&d.length==3){var E=d;if(E[0]==0){e:if(!l.u){if(l.g)if(l.g.F+3e3<n.F)yn(l),gn(l);else break e;vi(l),ie(18)}}else l.za=E[1],0<l.za-l.T&&37500>E[2]&&l.F&&l.v==0&&!l.C&&(l.C=At(k(l.Za,l),6e3));if(1>=Ps(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else Je(l,11)}else if((n.K||l.g==n)&&yn(l),!$(a))for(E=l.Da.g.parse(a),a=0;a<E.length;a++){let U=E[a];if(l.T=U[0],U=U[1],l.G==2)if(U[0]=="c"){l.K=U[1],l.ia=U[2];const ee=U[3];ee!=null&&(l.la=ee,l.j.info("VER="+l.la));const te=U[4];te!=null&&(l.Aa=te,l.j.info("SVER="+l.Aa));const at=U[5];at!=null&&typeof at=="number"&&0<at&&(d=1.5*at,l.L=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;const he=n.g;if(he){const bn=he.g?he.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(bn){var I=d.h;I.g||bn.indexOf("spdy")==-1&&bn.indexOf("quic")==-1&&bn.indexOf("h2")==-1||(I.j=I.l,I.g=new Set,I.h&&(pi(I,I.h),I.h=null))}if(d.D){const bi=he.g?he.g.getResponseHeader("X-HTTP-Session-Id"):null;bi&&(d.ya=bi,z(d.I,d.D,bi))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-n.F,l.j.info("Handshake RTT: "+l.R+"ms")),d=l;var P=n;if(d.qa=er(d,d.J?d.ia:null,d.W),P.K){Rs(d.h,P);var q=P,Q=d.L;Q&&(q.I=Q),q.B&&(ui(q),cn(q)),d.g=P}else Js(d);0<l.i.length&&vn(l)}else U[0]!="stop"&&U[0]!="close"||Je(l,7);else l.G==3&&(U[0]=="stop"||U[0]=="close"?U[0]=="stop"?Je(l,7):gi(l):U[0]!="noop"&&l.l&&l.l.ta(U),l.v=0)}}St(4)}catch{}}var _o=class{constructor(n,a){this.g=n,this.map=a}};function As(n){this.l=n||10,p.PerformanceNavigationTiming?(n=p.performance.getEntriesByType("navigation"),n=0<n.length&&(n[0].nextHopProtocol=="hq"||n[0].nextHopProtocol=="h2")):n=!!(p.chrome&&p.chrome.loadTimes&&p.chrome.loadTimes()&&p.chrome.loadTimes().wasFetchedViaSpdy),this.j=n?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ks(n){return n.h?!0:n.g?n.g.size>=n.j:!1}function Ps(n){return n.h?1:n.g?n.g.size:0}function fi(n,a){return n.h?n.h==a:n.g?n.g.has(a):!1}function pi(n,a){n.g?n.g.add(a):n.h=a}function Rs(n,a){n.h&&n.h==a?n.h=null:n.g&&n.g.has(a)&&n.g.delete(a)}As.prototype.cancel=function(){if(this.i=Cs(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const n of this.g.values())n.cancel();this.g.clear()}};function Cs(n){if(n.h!=null)return n.i.concat(n.h.D);if(n.g!=null&&n.g.size!==0){let a=n.i;for(const l of n.g.values())a=a.concat(l.D);return a}return j(n.i)}function Eo(n){if(n.V&&typeof n.V=="function")return n.V();if(typeof Map!="undefined"&&n instanceof Map||typeof Set!="undefined"&&n instanceof Set)return Array.from(n.values());if(typeof n=="string")return n.split("");if(g(n)){for(var a=[],l=n.length,d=0;d<l;d++)a.push(n[d]);return a}a=[],l=0;for(d in n)a[l++]=n[d];return a}function Io(n){if(n.na&&typeof n.na=="function")return n.na();if(!n.V||typeof n.V!="function"){if(typeof Map!="undefined"&&n instanceof Map)return Array.from(n.keys());if(!(typeof Set!="undefined"&&n instanceof Set)){if(g(n)||typeof n=="string"){var a=[];n=n.length;for(var l=0;l<n;l++)a.push(l);return a}a=[],l=0;for(const d in n)a[l++]=d;return a}}}function Ls(n,a){if(n.forEach&&typeof n.forEach=="function")n.forEach(a,void 0);else if(g(n)||typeof n=="string")Array.prototype.forEach.call(n,a,void 0);else for(var l=Io(n),d=Eo(n),E=d.length,I=0;I<E;I++)a.call(void 0,d[I],l&&l[I],n)}var $s=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function To(n,a){if(n){n=n.split("&");for(var l=0;l<n.length;l++){var d=n[l].indexOf("="),E=null;if(0<=d){var I=n[l].substring(0,d);E=n[l].substring(d+1)}else I=n[l];a(I,E?decodeURIComponent(E.replace(/\+/g," ")):"")}}}function Ke(n){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,n instanceof Ke){this.h=n.h,dn(this,n.j),this.o=n.o,this.g=n.g,un(this,n.s),this.l=n.l;var a=n.i,l=new Lt;l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),Ns(this,l),this.m=n.m}else n&&(a=String(n).match($s))?(this.h=!1,dn(this,a[1]||"",!0),this.o=Rt(a[2]||""),this.g=Rt(a[3]||"",!0),un(this,a[4]),this.l=Rt(a[5]||"",!0),Ns(this,a[6]||"",!0),this.m=Rt(a[7]||"")):(this.h=!1,this.i=new Lt(null,this.h))}Ke.prototype.toString=function(){var n=[],a=this.j;a&&n.push(Ct(a,Os,!0),":");var l=this.g;return(l||a=="file")&&(n.push("//"),(a=this.o)&&n.push(Ct(a,Os,!0),"@"),n.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&n.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&n.push("/"),n.push(Ct(l,l.charAt(0)=="/"?ko:Ao,!0))),(l=this.i.toString())&&n.push("?",l),(l=this.m)&&n.push("#",Ct(l,Ro)),n.join("")};function ye(n){return new Ke(n)}function dn(n,a,l){n.j=l?Rt(a,!0):a,n.j&&(n.j=n.j.replace(/:$/,""))}function un(n,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);n.s=a}else n.s=null}function Ns(n,a,l){a instanceof Lt?(n.i=a,Co(n.i,n.h)):(l||(a=Ct(a,Po)),n.i=new Lt(a,n.h))}function z(n,a,l){n.i.set(a,l)}function hn(n){return z(n,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),n}function Rt(n,a){return n?a?decodeURI(n.replace(/%25/g,"%2525")):decodeURIComponent(n):""}function Ct(n,a,l){return typeof n=="string"?(n=encodeURI(n).replace(a,So),l&&(n=n.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n):null}function So(n){return n=n.charCodeAt(0),"%"+(n>>4&15).toString(16)+(n&15).toString(16)}var Os=/[#\/\?@]/g,Ao=/[#\?:]/g,ko=/[#\?]/g,Po=/[#\?@]/g,Ro=/#/g;function Lt(n,a){this.h=this.g=null,this.i=n||null,this.j=!!a}function Ne(n){n.g||(n.g=new Map,n.h=0,n.i&&To(n.i,function(a,l){n.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}t=Lt.prototype,t.add=function(n,a){Ne(this),this.i=null,n=st(this,n);var l=this.g.get(n);return l||this.g.set(n,l=[]),l.push(a),this.h+=1,this};function Ds(n,a){Ne(n),a=st(n,a),n.g.has(a)&&(n.i=null,n.h-=n.g.get(a).length,n.g.delete(a))}function Ms(n,a){return Ne(n),a=st(n,a),n.g.has(a)}t.forEach=function(n,a){Ne(this),this.g.forEach(function(l,d){l.forEach(function(E){n.call(a,E,d,this)},this)},this)},t.na=function(){Ne(this);const n=Array.from(this.g.values()),a=Array.from(this.g.keys()),l=[];for(let d=0;d<a.length;d++){const E=n[d];for(let I=0;I<E.length;I++)l.push(a[d])}return l},t.V=function(n){Ne(this);let a=[];if(typeof n=="string")Ms(this,n)&&(a=a.concat(this.g.get(st(this,n))));else{n=Array.from(this.g.values());for(let l=0;l<n.length;l++)a=a.concat(n[l])}return a},t.set=function(n,a){return Ne(this),this.i=null,n=st(this,n),Ms(this,n)&&(this.h-=this.g.get(n).length),this.g.set(n,[a]),this.h+=1,this},t.get=function(n,a){return n?(n=this.V(n),0<n.length?String(n[0]):a):a};function js(n,a,l){Ds(n,a),0<l.length&&(n.i=null,n.g.set(st(n,a),j(l)),n.h+=l.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const n=[],a=Array.from(this.g.keys());for(var l=0;l<a.length;l++){var d=a[l];const I=encodeURIComponent(String(d)),P=this.V(d);for(d=0;d<P.length;d++){var E=I;P[d]!==""&&(E+="="+encodeURIComponent(String(P[d]))),n.push(E)}}return this.i=n.join("&")};function st(n,a){return a=String(a),n.j&&(a=a.toLowerCase()),a}function Co(n,a){a&&!n.j&&(Ne(n),n.i=null,n.g.forEach(function(l,d){var E=d.toLowerCase();d!=E&&(Ds(this,d),js(this,E,l))},n)),n.j=a}function Lo(n,a){const l=new kt;if(p.Image){const d=new Image;d.onload=C(Oe,l,"TestLoadImage: loaded",!0,a,d),d.onerror=C(Oe,l,"TestLoadImage: error",!1,a,d),d.onabort=C(Oe,l,"TestLoadImage: abort",!1,a,d),d.ontimeout=C(Oe,l,"TestLoadImage: timeout",!1,a,d),p.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=n}else a(!1)}function $o(n,a){const l=new kt,d=new AbortController,E=setTimeout(()=>{d.abort(),Oe(l,"TestPingServer: timeout",!1,a)},1e4);fetch(n,{signal:d.signal}).then(I=>{clearTimeout(E),I.ok?Oe(l,"TestPingServer: ok",!0,a):Oe(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(E),Oe(l,"TestPingServer: error",!1,a)})}function Oe(n,a,l,d,E){try{E&&(E.onload=null,E.onerror=null,E.onabort=null,E.ontimeout=null),d(l)}catch{}}function No(){this.g=new fo}function Oo(n,a,l){const d=l||"";try{Ls(n,function(E,I){let P=E;w(E)&&(P=ni(E)),a.push(d+I+"="+encodeURIComponent(P))})}catch(E){throw a.push(d+"type="+encodeURIComponent("_badmap")),E}}function fn(n){this.l=n.Ub||null,this.j=n.eb||!1}L(fn,ii),fn.prototype.g=function(){return new pn(this.l,this.j)},fn.prototype.i=function(n){return function(){return n}}({});function pn(n,a){Z.call(this),this.D=n,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}L(pn,Z),t=pn.prototype,t.open=function(n,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=n,this.A=a,this.readyState=1,Nt(this)},t.send=function(n){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};n&&(a.body=n),(this.D||p).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,$t(this)),this.readyState=0},t.Sa=function(n){if(this.g&&(this.l=n,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=n.headers,this.readyState=2,Nt(this)),this.g&&(this.readyState=3,Nt(this),this.g)))if(this.responseType==="arraybuffer")n.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof p.ReadableStream!="undefined"&&"body"in n){if(this.j=n.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;xs(this)}else n.text().then(this.Ra.bind(this),this.ga.bind(this))};function xs(n){n.j.read().then(n.Pa.bind(n)).catch(n.ga.bind(n))}t.Pa=function(n){if(this.g){if(this.o&&n.value)this.response.push(n.value);else if(!this.o){var a=n.value?n.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!n.done}))&&(this.response=this.responseText+=a)}n.done?$t(this):Nt(this),this.readyState==3&&xs(this)}},t.Ra=function(n){this.g&&(this.response=this.responseText=n,$t(this))},t.Qa=function(n){this.g&&(this.response=n,$t(this))},t.ga=function(){this.g&&$t(this)};function $t(n){n.readyState=4,n.l=null,n.j=null,n.v=null,Nt(n)}t.setRequestHeader=function(n,a){this.u.append(n,a)},t.getResponseHeader=function(n){return this.h&&this.h.get(n.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const n=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,n.push(l[0]+": "+l[1]),l=a.next();return n.join(`\r
`)};function Nt(n){n.onreadystatechange&&n.onreadystatechange.call(n)}Object.defineProperty(pn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(n){this.m=n?"include":"same-origin"}});function Us(n){let a="";return W(n,function(l,d){a+=d,a+=":",a+=l,a+=`\r
`}),a}function mi(n,a,l){e:{for(d in l){var d=!1;break e}d=!0}d||(l=Us(l),typeof n=="string"?l!=null&&encodeURIComponent(String(l)):z(n,a,l))}function J(n){Z.call(this),this.headers=new Map,this.o=n||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}L(J,Z);var Do=/^https?$/i,Mo=["POST","PUT"];t=J.prototype,t.Ha=function(n){this.J=n},t.ea=function(n,a,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+n);a=a?a.toUpperCase():"GET",this.D=n,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():li.g(),this.v=this.o?gs(this.o):gs(li),this.g.onreadystatechange=k(this.Ea,this);try{this.B=!0,this.g.open(a,String(n),!0),this.B=!1}catch(I){Bs(this,I);return}if(n=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var E in d)l.set(E,d[E]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const I of d.keys())l.set(I,d.get(I));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(I=>I.toLowerCase()=="content-type"),E=p.FormData&&n instanceof p.FormData,!(0<=Array.prototype.indexOf.call(Mo,a,void 0))||d||E||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[I,P]of l)this.g.setRequestHeader(I,P);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{qs(this),this.u=!0,this.g.send(n),this.u=!1}catch(I){Bs(this,I)}};function Bs(n,a){n.h=!1,n.g&&(n.j=!0,n.g.abort(),n.j=!1),n.l=a,n.m=5,Fs(n),mn(n)}function Fs(n){n.A||(n.A=!0,ne(n,"complete"),ne(n,"error"))}t.abort=function(n){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=n||7,ne(this,"complete"),ne(this,"abort"),mn(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),mn(this,!0)),J.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Hs(this):this.bb())},t.bb=function(){Hs(this)};function Hs(n){if(n.h&&typeof c!="undefined"&&(!n.v[1]||be(n)!=4||n.Z()!=2)){if(n.u&&be(n)==4)hs(n.Ea,0,n);else if(ne(n,"readystatechange"),be(n)==4){n.h=!1;try{const P=n.Z();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break e;default:a=!1}var l;if(!(l=a)){var d;if(d=P===0){var E=String(n.D).match($s)[1]||null;!E&&p.self&&p.self.location&&(E=p.self.location.protocol.slice(0,-1)),d=!Do.test(E?E.toLowerCase():"")}l=d}if(l)ne(n,"complete"),ne(n,"success");else{n.m=6;try{var I=2<be(n)?n.g.statusText:""}catch{I=""}n.l=I+" ["+n.Z()+"]",Fs(n)}}finally{mn(n)}}}}function mn(n,a){if(n.g){qs(n);const l=n.g,d=n.v[0]?()=>{}:null;n.g=null,n.v=null,a||ne(n,"ready");try{l.onreadystatechange=d}catch{}}}function qs(n){n.I&&(p.clearTimeout(n.I),n.I=null)}t.isActive=function(){return!!this.g};function be(n){return n.g?n.g.readyState:0}t.Z=function(){try{return 2<be(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(n){if(this.g){var a=this.g.responseText;return n&&a.indexOf(n)==0&&(a=a.substring(n.length)),ho(a)}};function Vs(n){try{if(!n.g)return null;if("response"in n.g)return n.g.response;switch(n.H){case"":case"text":return n.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in n.g)return n.g.mozResponseArrayBuffer}return null}catch{return null}}function jo(n){const a={};n=(n.g&&2<=be(n)&&n.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<n.length;d++){if($(n[d]))continue;var l=y(n[d]);const E=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const I=a[E]||[];a[E]=I,I.push(l)}h(a,function(d){return d.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ot(n,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[n]||a}function Ws(n){this.Aa=0,this.i=[],this.j=new kt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ot("failFast",!1,n),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ot("baseRetryDelayMs",5e3,n),this.cb=Ot("retryDelaySeedMs",1e4,n),this.Wa=Ot("forwardChannelMaxRetries",2,n),this.wa=Ot("forwardChannelRequestTimeoutMs",2e4,n),this.pa=n&&n.xmlHttpFactory||void 0,this.Xa=n&&n.Tb||void 0,this.Ca=n&&n.useFetchStreams||!1,this.L=void 0,this.J=n&&n.supportsCrossDomainXhr||!1,this.K="",this.h=new As(n&&n.concurrentRequestLimit),this.Da=new No,this.P=n&&n.fastHandshake||!1,this.O=n&&n.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=n&&n.Rb||!1,n&&n.xa&&this.j.xa(),n&&n.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&n&&n.detectBufferingProxy||!1,this.ja=void 0,n&&n.longPollingTimeout&&0<n.longPollingTimeout&&(this.ja=n.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Ws.prototype,t.la=8,t.G=1,t.connect=function(n,a,l,d){ie(0),this.W=n,this.H=a||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.I=er(this,null,this.W),vn(this)};function gi(n){if(zs(n),n.G==3){var a=n.U++,l=ye(n.I);if(z(l,"SID",n.K),z(l,"RID",a),z(l,"TYPE","terminate"),Dt(n,l),a=new $e(n,n.j,a),a.L=2,a.v=hn(ye(l)),l=!1,p.navigator&&p.navigator.sendBeacon)try{l=p.navigator.sendBeacon(a.v.toString(),"")}catch{}!l&&p.Image&&(new Image().src=a.v,l=!0),l||(a.g=tr(a.j,null),a.g.ea(a.v)),a.F=Date.now(),cn(a)}Zs(n)}function gn(n){n.g&&(yi(n),n.g.cancel(),n.g=null)}function zs(n){gn(n),n.u&&(p.clearTimeout(n.u),n.u=null),yn(n),n.h.cancel(),n.s&&(typeof n.s=="number"&&p.clearTimeout(n.s),n.s=null)}function vn(n){if(!ks(n.h)&&!n.s){n.s=!0;var a=n.Ga;Re||Et(),Ce||(Re(),Ce=!0),tt.add(a,n),n.B=0}}function xo(n,a){return Ps(n.h)>=n.h.j-(n.s?1:0)?!1:n.s?(n.i=a.D.concat(n.i),!0):n.G==1||n.G==2||n.B>=(n.Va?0:n.Wa)?!1:(n.s=At(k(n.Ga,n,a),Qs(n,n.B)),n.B++,!0)}t.Ga=function(n){if(this.s)if(this.s=null,this.G==1){if(!n){this.U=Math.floor(1e5*Math.random()),n=this.U++;const E=new $e(this,this.j,n);let I=this.o;if(this.S&&(I?(I=u(I),v(I,this.S)):I=this.S),this.m!==null||this.O||(E.H=I,I=null),this.P)e:{for(var a=0,l=0;l<this.i.length;l++){t:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break t}d=void 0}if(d===void 0)break;if(a+=d,4096<a){a=l;break e}if(a===4096||l===this.i.length-1){a=l+1;break e}}a=1e3}else a=1e3;a=Ks(this,E,a),l=ye(this.I),z(l,"RID",n),z(l,"CVER",22),this.D&&z(l,"X-HTTP-Session-Id",this.D),Dt(this,l),I&&(this.O?a="headers="+encodeURIComponent(String(Us(I)))+"&"+a:this.m&&mi(l,this.m,I)),pi(this.h,E),this.Ua&&z(l,"TYPE","init"),this.P?(z(l,"$req",a),z(l,"SID","null"),E.T=!0,di(E,l,null)):di(E,l,a),this.G=2}}else this.G==3&&(n?Gs(this,n):this.i.length==0||ks(this.h)||Gs(this))};function Gs(n,a){var l;a?l=a.l:l=n.U++;const d=ye(n.I);z(d,"SID",n.K),z(d,"RID",l),z(d,"AID",n.T),Dt(n,d),n.m&&n.o&&mi(d,n.m,n.o),l=new $e(n,n.j,l,n.B+1),n.m===null&&(l.H=n.o),a&&(n.i=a.D.concat(n.i)),a=Ks(n,l,1e3),l.I=Math.round(.5*n.wa)+Math.round(.5*n.wa*Math.random()),pi(n.h,l),di(l,d,a)}function Dt(n,a){n.H&&W(n.H,function(l,d){z(a,d,l)}),n.l&&Ls({},function(l,d){z(a,d,l)})}function Ks(n,a,l){l=Math.min(n.i.length,l);var d=n.l?k(n.l.Na,n.l,n):null;e:{var E=n.i;let I=-1;for(;;){const P=["count="+l];I==-1?0<l?(I=E[0].g,P.push("ofs="+I)):I=0:P.push("ofs="+I);let q=!0;for(let Q=0;Q<l;Q++){let U=E[Q].g;const ee=E[Q].map;if(U-=I,0>U)I=Math.max(0,E[Q].g-100),q=!1;else try{Oo(ee,P,"req"+U+"_")}catch{d&&d(ee)}}if(q){d=P.join("&");break e}}}return n=n.i.splice(0,l),a.D=n,d}function Js(n){if(!n.g&&!n.u){n.Y=1;var a=n.Fa;Re||Et(),Ce||(Re(),Ce=!0),tt.add(a,n),n.v=0}}function vi(n){return n.g||n.u||3<=n.v?!1:(n.Y++,n.u=At(k(n.Fa,n),Qs(n,n.v)),n.v++,!0)}t.Fa=function(){if(this.u=null,Xs(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var n=2*this.R;this.j.info("BP detection timer enabled: "+n),this.A=At(k(this.ab,this),n)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ie(10),gn(this),Xs(this))};function yi(n){n.A!=null&&(p.clearTimeout(n.A),n.A=null)}function Xs(n){n.g=new $e(n,n.j,"rpc",n.Y),n.m===null&&(n.g.H=n.o),n.g.O=0;var a=ye(n.qa);z(a,"RID","rpc"),z(a,"SID",n.K),z(a,"AID",n.T),z(a,"CI",n.F?"0":"1"),!n.F&&n.ja&&z(a,"TO",n.ja),z(a,"TYPE","xmlhttp"),Dt(n,a),n.m&&n.o&&mi(a,n.m,n.o),n.L&&(n.g.I=n.L);var l=n.g;n=n.ia,l.L=1,l.v=hn(ye(a)),l.m=null,l.P=!0,Is(l,n)}t.Za=function(){this.C!=null&&(this.C=null,gn(this),vi(this),ie(19))};function yn(n){n.C!=null&&(p.clearTimeout(n.C),n.C=null)}function Ys(n,a){var l=null;if(n.g==a){yn(n),yi(n),n.g=null;var d=2}else if(fi(n.h,a))l=a.D,Rs(n.h,a),d=1;else return;if(n.G!=0){if(a.o)if(d==1){l=a.m?a.m.length:0,a=Date.now()-a.F;var E=n.B;d=ai(),ne(d,new ws(d,l)),vn(n)}else Js(n);else if(E=a.s,E==3||E==0&&0<a.X||!(d==1&&xo(n,a)||d==2&&vi(n)))switch(l&&0<l.length&&(a=n.h,a.i=a.i.concat(l)),E){case 1:Je(n,5);break;case 4:Je(n,10);break;case 3:Je(n,6);break;default:Je(n,2)}}}function Qs(n,a){let l=n.Ta+Math.floor(Math.random()*n.cb);return n.isActive()||(l*=2),l*a}function Je(n,a){if(n.j.info("Error code "+a),a==2){var l=k(n.fb,n),d=n.Xa;const E=!d;d=new Ke(d||"//www.google.com/images/cleardot.gif"),p.location&&p.location.protocol=="http"||dn(d,"https"),hn(d),E?Lo(d.toString(),l):$o(d.toString(),l)}else ie(2);n.G=0,n.l&&n.l.sa(a),Zs(n),zs(n)}t.fb=function(n){n?(this.j.info("Successfully pinged google.com"),ie(2)):(this.j.info("Failed to ping google.com"),ie(1))};function Zs(n){if(n.G=0,n.ka=[],n.l){const a=Cs(n.h);(a.length!=0||n.i.length!=0)&&(D(n.ka,a),D(n.ka,n.i),n.h.i.length=0,j(n.i),n.i.length=0),n.l.ra()}}function er(n,a,l){var d=l instanceof Ke?ye(l):new Ke(l);if(d.g!="")a&&(d.g=a+"."+d.g),un(d,d.s);else{var E=p.location;d=E.protocol,a=a?a+"."+E.hostname:E.hostname,E=+E.port;var I=new Ke(null);d&&dn(I,d),a&&(I.g=a),E&&un(I,E),l&&(I.l=l),d=I}return l=n.D,a=n.ya,l&&a&&z(d,l,a),z(d,"VER",n.la),Dt(n,d),d}function tr(n,a,l){if(a&&!n.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=n.Ca&&!n.pa?new J(new fn({eb:l})):new J(n.pa),a.Ha(n.J),a}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function nr(){}t=nr.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function de(n,a){Z.call(this),this.g=new Ws(a),this.l=n,this.h=a&&a.messageUrlParams||null,n=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(n?n["X-Client-Protocol"]="webchannel":n={"X-Client-Protocol":"webchannel"}),this.g.o=n,n=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(n?n["X-WebChannel-Content-Type"]=a.messageContentType:n={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(n?n["X-WebChannel-Client-Profile"]=a.va:n={"X-WebChannel-Client-Profile":a.va}),this.g.S=n,(n=a&&a.Sb)&&!$(n)&&(this.g.m=n),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!$(a)&&(this.g.D=a,n=this.h,n!==null&&a in n&&(n=this.h,a in n&&delete n[a])),this.j=new rt(this)}L(de,Z),de.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},de.prototype.close=function(){gi(this.g)},de.prototype.o=function(n){var a=this.g;if(typeof n=="string"){var l={};l.__data__=n,n=l}else this.u&&(l={},l.__data__=ni(n),n=l);a.i.push(new _o(a.Ya++,n)),a.G==3&&vn(a)},de.prototype.N=function(){this.g.l=null,delete this.j,gi(this.g),delete this.g,de.aa.N.call(this)};function ir(n){si.call(this),n.__headers__&&(this.headers=n.__headers__,this.statusCode=n.__status__,delete n.__headers__,delete n.__status__);var a=n.__sm__;if(a){e:{for(const l in a){n=l;break e}n=void 0}(this.i=n)&&(n=this.i,a=a!==null&&n in a?a[n]:void 0),this.data=a}else this.data=n}L(ir,si);function sr(){ri.call(this),this.status=1}L(sr,ri);function rt(n){this.g=n}L(rt,nr),rt.prototype.ua=function(){ne(this.g,"a")},rt.prototype.ta=function(n){ne(this.g,new ir(n))},rt.prototype.sa=function(n){ne(this.g,new sr)},rt.prototype.ra=function(){ne(this.g,"b")},de.prototype.send=de.prototype.o,de.prototype.open=de.prototype.m,de.prototype.close=de.prototype.close,oi.NO_ERROR=0,oi.TIMEOUT=8,oi.HTTP_ERROR=6,bo.COMPLETE="complete",po.EventType=Tt,Tt.OPEN="a",Tt.CLOSE="b",Tt.ERROR="c",Tt.MESSAGE="d",Z.prototype.listen=Z.prototype.K,J.prototype.listenOnce=J.prototype.L,J.prototype.getLastError=J.prototype.Ka,J.prototype.getLastErrorCode=J.prototype.Ba,J.prototype.getStatus=J.prototype.Z,J.prototype.getResponseJson=J.prototype.Oa,J.prototype.getResponseText=J.prototype.oa,J.prototype.send=J.prototype.ea,J.prototype.setWithCredentials=J.prototype.Ha}).apply(typeof _n!="undefined"?_n:typeof self!="undefined"?self:typeof window!="undefined"?window:{});const Mr="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}se.UNAUTHENTICATED=new se(null),se.GOOGLE_CREDENTIALS=new se("google-credentials-uid"),se.FIRST_PARTY=new se("first-party-uid"),se.MOCK_USER=new se("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qt="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt=new qi("@firebase/firestore");function pe(t,...e){if(yt.logLevel<=B.DEBUG){const i=e.map(ts);yt.debug(`Firestore (${Qt}): ${t}`,...i)}}function xa(t,...e){if(yt.logLevel<=B.ERROR){const i=e.map(ts);yt.error(`Firestore (${Qt}): ${t}`,...i)}}function Ru(t,...e){if(yt.logLevel<=B.WARN){const i=e.map(ts);yt.warn(`Firestore (${Qt}): ${t}`,...i)}}function ts(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(i){return JSON.stringify(i)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(t="Unexpected state"){const e=`FIRESTORE (${Qt}) INTERNAL ASSERTION FAILED: `+t;throw xa(e),new Error(e)}function Ft(t,e){t||ns()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ae={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class oe extends Ae{constructor(e,i){super(e,i),this.code=e,this.message=i,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(){this.promise=new Promise((e,i)=>{this.resolve=e,this.reject=i})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(e,i){this.user=i,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Cu{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,i){e.enqueueRetryable(()=>i(se.UNAUTHENTICATED))}shutdown(){}}class Lu{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,i){this.changeListener=i,e.enqueueRetryable(()=>i(this.token.user))}shutdown(){this.changeListener=null}}class $u{constructor(e){this.t=e,this.currentUser=se.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,i){Ft(this.o===void 0);let s=this.i;const r=g=>this.i!==s?(s=this.i,i(g)):Promise.resolve();let o=new Ht;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Ht,e.enqueueRetryable(()=>r(this.currentUser))};const c=()=>{const g=o;e.enqueueRetryable(async()=>{await g.promise,await r(this.currentUser)})},p=g=>{pe("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=g,this.o&&(this.auth.addAuthTokenListener(this.o),c())};this.t.onInit(g=>p(g)),setTimeout(()=>{if(!this.auth){const g=this.t.getImmediate({optional:!0});g?p(g):(pe("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Ht)}},0),c()}getToken(){const e=this.i,i=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(i).then(s=>this.i!==e?(pe("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Ft(typeof s.accessToken=="string"),new Ua(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ft(e===null||typeof e=="string"),new se(e)}}class Nu{constructor(e,i,s){this.l=e,this.h=i,this.P=s,this.type="FirstParty",this.user=se.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Ou{constructor(e,i,s){this.l=e,this.h=i,this.P=s}getToken(){return Promise.resolve(new Nu(this.l,this.h,this.P))}start(e,i){e.enqueueRetryable(()=>i(se.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Du{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Mu{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,i){Ft(this.o===void 0);const s=o=>{o.error!=null&&pe("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const c=o.token!==this.R;return this.R=o.token,pe("FirebaseAppCheckTokenProvider",`Received ${c?"new":"existing"} token.`),c?i(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>s(o))};const r=o=>{pe("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>r(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?r(o):pe("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(i=>i?(Ft(typeof i.token=="string"),this.R=i.token,new Du(i.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function ju(t){return t.name==="IndexedDbTransactionError"}class Fn{constructor(e,i){this.projectId=e,this.database=i||"(default)"}static empty(){return new Fn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Fn&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */class xu{constructor(){this._=void 0}}class Uu extends xu{}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{constructor(e,i){this.field=e,this.transform=i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var jr,x;(x=jr||(jr={}))[x.OK=0]="OK",x[x.CANCELLED=1]="CANCELLED",x[x.UNKNOWN=2]="UNKNOWN",x[x.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",x[x.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",x[x.NOT_FOUND=5]="NOT_FOUND",x[x.ALREADY_EXISTS=6]="ALREADY_EXISTS",x[x.PERMISSION_DENIED=7]="PERMISSION_DENIED",x[x.UNAUTHENTICATED=16]="UNAUTHENTICATED",x[x.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",x[x.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",x[x.ABORTED=10]="ABORTED",x[x.OUT_OF_RANGE=11]="OUT_OF_RANGE",x[x.UNIMPLEMENTED=12]="UNIMPLEMENTED",x[x.INTERNAL=13]="INTERNAL",x[x.UNAVAILABLE=14]="UNAVAILABLE",x[x.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new ja([4294967295,4294967295],0);function ki(){return typeof document!="undefined"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu{constructor(e,i,s=1e3,r=1.5,o=6e4){this.ui=e,this.timerId=i,this.ko=s,this.qo=r,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const i=Math.floor(this.Ko+this.zo()),s=Math.max(0,Date.now()-this.Uo),r=Math.max(0,i-s);r>0&&pe("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ko} ms, delay with jitter: ${i} ms, last attempt: ${s} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,r,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e,i,s,r,o){this.asyncQueue=e,this.timerId=i,this.targetTimeMs=s,this.op=r,this.removalCallback=o,this.deferred=new Ht,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(c=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,i,s,r,o){const c=Date.now()+s,p=new is(e,i,c,r,o);return p.start(s),p}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new oe(ae.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var xr,Ur;(Ur=xr||(xr={})).ea="default",Ur.Cache="cache";/**
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
 */function Hu(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br=new Map;function qu(t,e,i,s){if(e===!0&&s===!0)throw new oe(ae.INVALID_ARGUMENT,`${t} and ${i} cannot be used together.`)}function Vu(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ns()}function Wu(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new oe(ae.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const i=Vu(t);throw new oe(ae.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${i}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e){var i,s;if(e.host===void 0){if(e.ssl!==void 0)throw new oe(ae.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(i=e.ssl)===null||i===void 0||i;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new oe(ae.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}qu("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Hu((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new oe(ae.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new oe(ae.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new oe(ae.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,r){return s.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ba{constructor(e,i,s,r){this._authCredentials=e,this._appCheckCredentials=i,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Fr({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new oe(ae.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new oe(ae.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Fr(e),e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new Cu;switch(s.type){case"firstParty":return new Ou(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new oe(ae.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(i){const s=Br.get(i);s&&(pe("ComponentProvider","Removing Datastore"),Br.delete(i),s.terminate())}(this),Promise.resolve()}}function zu(t,e,i,s={}){var r;const o=(t=Wu(t,Ba))._getSettings(),c=`${e}:${i}`;if(o.host!=="firestore.googleapis.com"&&o.host!==c&&Ru("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},o),{host:c,ssl:!1})),s.mockUserToken){let p,g;if(typeof s.mockUserToken=="string")p=s.mockUserToken,g=se.MOCK_USER;else{p=Ko(s.mockUserToken,(r=t._app)===null||r===void 0?void 0:r.options.projectId);const w=s.mockUserToken.sub||s.mockUserToken.user_id;if(!w)throw new oe(ae.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new se(w)}t._authCredentials=new Lu(new Ua(p,g))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Fu(this,"async_queue_retry"),this.Vu=()=>{const s=ki();s&&pe("AsyncQueue","Visibility state changed to "+s.visibilityState),this.t_.jo()},this.mu=e;const i=ki();i&&typeof i.addEventListener=="function"&&i.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const i=ki();i&&typeof i.removeEventListener=="function"&&i.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const i=new Ht;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(i.resolve,i.reject),i.promise)).then(()=>i.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!ju(e))throw e;pe("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const i=this.mu.then(()=>(this.du=!0,e().catch(s=>{this.Eu=s,this.du=!1;const r=function(c){let p=c.message||"";return c.stack&&(p=c.stack.includes(c.message)?c.stack:c.message+`
`+c.stack),p}(s);throw xa("INTERNAL UNHANDLED ERROR: ",r),s}).then(s=>(this.du=!1,s))));return this.mu=i,i}enqueueAfterDelay(e,i,s){this.fu(),this.Ru.indexOf(e)>-1&&(i=0);const r=is.createAndSchedule(this,e,i,s,o=>this.yu(o));return this.Tu.push(r),r}fu(){this.Eu&&ns()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const i of this.Tu)if(i.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((i,s)=>i.targetTimeMs-s.targetTimeMs);for(const i of this.Tu)if(i.skipDelay(),e!=="all"&&i.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const i=this.Tu.indexOf(e);this.Tu.splice(i,1)}}class Gu extends Ba{constructor(e,i,s,r){super(e,i,s,r),this.type="firestore",this._queue=new Hr,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Hr(e),this._firestoreClient=void 0,await e}}}function Ku(t,e){const i=typeof t=="object"?t:ea(),s=typeof t=="string"?t:"(default)",r=Wi(i,"firestore").getImmediate({identifier:s});if(!r._initialized){const o=zo("firestore");o&&zu(r,...o)}return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{constructor(e){this._methodName=e}}class ss extends Ju{_toFieldTransform(e){return new Bu(e.path,new Uu)}isEqual(e){return e instanceof ss}}function Fa(){return new ss("serverTimestamp")}(function(e,i=!0){(function(r){Qt=r})(bt),gt(new Ye("firestore",(s,{instanceIdentifier:r,options:o})=>{const c=s.getProvider("app").getImmediate(),p=new Gu(new $u(s.getProvider("auth-internal")),new Mu(s.getProvider("app-check-internal")),function(w,T){if(!Object.prototype.hasOwnProperty.apply(w.options,["projectId"]))throw new oe(ae.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Fn(w.options.projectId,T)}(c,r),c);return o=Object.assign({useFetchStreams:i},o),p._setSettings(o),p},"PUBLIC").setMultipleInstances(!0)),qe(Mr,"4.7.3",e),qe(Mr,"4.7.3","esm2017")})();function Xu(t){var e,i,s;if(!t)return 0;if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){const r=Date.parse(t);return Number.isFinite(r)?r:0}if(typeof t.toDate=="function"){const r=t.toDate();return r instanceof Date&&r.getTime()?r.getTime():0}if(typeof t=="object"){const r=Number((e=t.seconds)!=null?e:t._seconds);if(Number.isFinite(r))return r*1e3+Math.round(Number((s=(i=t.nanoseconds)!=null?i:t._nanoseconds)!=null?s:0)/1e6);const o=Number(t.__srvTs);if(Number.isFinite(o))return o}return 0}const le=(t,e="en-BD")=>{const i=Xu(t);if(!i)return"—";const s=new Date(i);try{return s.toLocaleString(e,{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return s.toISOString().slice(0,16).replace("T"," ")}};function Yu(){try{const t=typeof window!="undefined"&&window.DigitEarnBridge;if(t&&typeof t.getFirebaseConfig=="function"){const e=String(t.getFirebaseConfig()||"");if(e.length>2)return JSON.parse(e)||{}}}catch{}return typeof window!="undefined"&&window.__DIGITEARN_FB_CONFIG__||{}}const ot=Yu(),lt={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0},Cn={apiKey:ot.apiKey||lt.apiKey||"",authDomain:ot.authDomain||lt.authDomain||"",projectId:ot.projectId||lt.projectId||"",storageBucket:ot.storageBucket||lt.storageBucket||"",messagingSenderId:ot.messagingSenderId||lt.messagingSenderId||"",appId:ot.appId||lt.appId||""},Ha=!!(Cn.apiKey&&Cn.projectId&&Cn.appId),Qu=typeof location!="undefined"&&/^https?:$/.test(location.protocol),Zu=Qu?"":"https://digitearn.vercel.app",qa=Zr(Cn),Zt=ku(qa);Ku(qa);const V=t=>"৳"+Number(t||0).toLocaleString("en-BD",{maximumFractionDigits:2}),S=t=>String(t!=null?t:"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);async function X(t,e={},i="POST"){if(!Ha)throw new Error("Firebase configure করা নেই");let s=t;const r=String(t).match(/^\/api\/admin\/([a-z0-9-]+)/);r&&(s="/api/admin/panel?op="+encodeURIComponent(r[1]));const o=async p=>{const g=Zt.currentUser;if(!g)throw new Error("Login required — আবার লগইন করুন");const w=await fetch(Zu+s,{method:i,headers:{"Content-Type":"application/json",Authorization:"Bearer "+await g.getIdToken(p)},body:i==="GET"?void 0:JSON.stringify(e)});let T="";try{T=await w.text()}catch{}let _=null;try{_=T?JSON.parse(T):{}}catch{}return{resp:w,data:_||{},isJson:!!_}};let c=await o(!1);if(!c.resp.ok&&(c.resp.status===401||c.data.sessionExpired===!0)&&(c=await o(!0)),!c.resp.ok){const p=c.data||{};if(p.protection||p.error&&typeof p.error=="object"&&String(p.error.code)==="401")throw new Error("Vercel Deployment Protection ব্লক করছে — এই deployment URL থেকে admin API চলে না। Production URL (digitearn.vercel.app) ব্যবহার করুন বা Vercel → Settings → Deployment Protection off করুন।");const g=typeof p.error=="string"?p.error:String(p.error&&(p.error.message||p.error.code)||p.message||"");throw new Error(g||(c.isJson?"":`সার্ভার JSON দেয়নি (HTTP ${c.resp.status})`)||`Operation fail হয়েছে (${c.resp.status}) — আবার চেষ্টা করুন`)}return c.data}async function eh(){try{return await X("/api/admin/health",{})}catch(t){const e=String(t&&t.message||t);throw/Unknown admin endpoint|404/i.test(e)?new Error("সার্ভারের build পুরোনো — `?op=health` নেই, মানে নতুন api/ + lib/ এখনো deploy হয়নি। Push করে Vercel-এ Redeploy করুন।"):t}}async function th(){try{const t=await X("/api/admin/verify",{});return{isAdmin:!!t.isAdmin,authenticated:!!t.authenticated,authState:t.authState||"",error:""}}catch(t){return{isAdmin:!1,authenticated:!1,error:String(t&&t.message||"Admin verify fail")}}}async function Pe(t,e={}){const i=await X("/api/admin/read",{what:t,...e});return Array.isArray(i.items)?i.items:[]}async function Va(t,e={}){const i=await X("/api/admin/read",{what:t,...e});return i&&i.item?i.item:null}const Y=(t,e={})=>X("/api/admin/write",{what:t,...e});async function Wa(t="pending",e=100){return Pe("proofs",{status:t,limit:e})}async function nh(t){await X("/api/admin/proof-review",{proofId:t,action:"approve"})}async function za(t="pending",e=100){return Pe("deposits",{status:t,limit:e})}async function ih(t){await X("/api/admin/deposit-review",{depositId:t,action:"approve"})}async function sh(t,e=""){await X("/api/admin/deposit-review",{depositId:t,action:"reject",note:e})}async function rs(t=300){return Pe("users",{limit:t})}async function zn(t){return await Va("user",{id:t})}async function rh(t,e=20){return Pe("user-withdrawals",{uid:t,limit:e})}async function ah(t,e=25){return Pe("user-transactions",{uid:t,limit:e})}async function qr(t,e){await X("/api/admin/set-active",{uid:t,active:e})}async function oh(){return Pe("tasks",{limit:500})}async function Ga(t){const e=await X("/api/admin/read",t?{what:"jobs",kindFilter:t}:{what:"jobs"});return Array.isArray(e.items)?e.items:[]}async function lh(t){return Y("task-create",{data:t})}async function as(){return X("/api/admin/read",{what:"wallet"})}async function ch(){const t=await X("/api/admin/read",{what:"admins"});return{items:Array.isArray(t.items)?t.items:[],isOwner:!!t.isOwner,isManager:t.isManager!==!1&&(!!t.isOwner||!!t.isManager)}}async function dh(){const t=await X("/api/admin/read",{what:"admin-joins"});if(t&&t.error)throw new Error(t.error);return{items:Array.isArray(t.items)?t.items:[],isManager:!!t.isManager,isOwner:!!t.isOwner}}async function uh(t,e){return Y("join-approve",{email:t,role:e})}async function hh(t,e){return Y("join-reject",{email:t,reason:e})}async function fh({email:t,fullName:e="",role:i="poster",balance:s=null,password:r=""}={}){return Y("admin-create",{email:t,fullName:e,role:i,grant:s,password:r})}async function ph(t,e,i=""){return Y("admin-suspend",{email:t,suspended:e,reason:i})}async function mh({email:t,fullName:e,role:i="poster",note:s=""}={}){return X("/api/admin/admin-join",{email:t,fullName:e,role:i,note:s})}async function gh(t,{delta:e=null,setBalance:i=null,note:s=""}={}){return Y("admin-balance",{email:t,delta:e,setBalance:i,note:s})}async function vh(t,e){return Y("admin-role",{email:t,role:e})}async function yh(t){return Y("admin-mode",{activeMode:t})}async function bh(t){return Y("task-publish",{slug:t})}async function wh(t){return Y("task-delete",{slug:t})}async function _h(t,e,i=""){await X("/api/admin/proof-review",{proofId:t,action:e,note:i})}async function Eh(){return Y("leaderboard-backfill",{})}async function Ih(t=[]){return await X("/api/admin/seed-tasks",{slugs:t})}async function Th(t,e){if(e.url&&!/^https?:\/\/\S+$/i.test(e.url))throw new Error("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)");return Y("task",{slug:t,data:e})}const Ka=["giftCode"];async function Sh(){const[t,e]=await Promise.all([Va("settings").catch(()=>null),X("/api/admin/secret",{get:!0}).catch(()=>({}))]),i={...t||{}};delete i.id;const s={},r=e&&typeof e.giftCode=="string";for(const o of Ka)typeof e[o]=="string"&&(s[o]=e[o]);return{...i,...s,_secretLoaded:r}}async function Ja(t="pending",e=100){return Pe("withdrawals",{status:t,limit:e})}async function ji(t,e,i,s=""){return X("/api/admin/withdrawal-review",{userId:t,id:e,action:i,note:s})}async function Ah(t){const e={...t},i={};for(const r of Ka)r in e&&(i[r]=e[r],delete e[r]);await Y("settings",{data:e});const s={...i};for(const r of Object.keys(s))String(s[r]).trim()===""&&!s.__clear&&delete s[r];Object.keys(s).length&&await X("/api/admin/secret",s)}async function kh(){await X("/api/admin/secret",{giftCode:"",__clear:!0})}async function Ph(){return Pe("notices",{limit:100})}async function Rh({title:t,body:e,type:i="notice",expiresAt:s=null}){const r={title:String(t||"").trim().slice(0,60),body:String(e||"").trim().slice(0,300),type:i==="warning"?"warning":"notice",targetType:"all",enabled:!0,sort:10,createdAt:Fa()};return s&&(r.expiresAt=s),Y("notice-add",r)}async function Ch(t,{title:e,body:i,enabled:s,sort:r,type:o,expiresAt:c}){const p={title:String(e||"").trim().slice(0,60),body:String(i||"").trim().slice(0,300),enabled:!!s,sort:Number(r)||10};return o&&(p.type=o==="warning"?"warning":"notice"),c&&(p.expiresAt=c),Y("notice-update",{id:t,...p})}async function Lh(t){return Y("notice-delete",{id:t})}async function $h(t){return Pe("user-target-notices",{uid:t,limit:50})}async function Nh(t,{title:e,body:i,type:s="warning",expiresAt:r=null}){const o={title:String(e||"").trim().slice(0,60),body:String(i||"").trim().slice(0,300),type:s==="warning"?"warning":"notice",targetType:"user",targetUserId:t,enabled:!0,sort:10,createdAt:Fa(),createdBy:"admin"};r&&(o.expiresAt=r),await Y("target-notice-add",{uid:t,notice:o})}async function Xa(t,e,{enabled:i}){await Y("target-notice-update",{uid:t,id:e,enabled:!!i})}async function Ya(t,e){await Y("target-notice-delete",{uid:t,id:e})}async function Oh(){return(await X("/api/admin/notice-targeted",{},"GET")).targeted||[]}async function Dh(){const[t,e,i]=await Promise.all([rs(1e3),Wa("pending",100),za("pending",100)]);return{totalUsers:t.length,activeUsers:t.filter(s=>s.isActive).length,pendingProofs:e.length,pendingDeposits:i.length,totalBalance:t.reduce((s,r)=>s+(Number(r.balance)||0),0),recentProofs:e.slice(0,3),recentDeposits:i.slice(0,3)}}const Mh={url:300,email:120,tel:20,number:60,textarea:2e3,text:100,password:100,image:3e5};async function Vr(t,{maxSide:e=900,quality:i=.72,maxBytes:s=22e4}={}){if(!t||!/^image\/(png|jpe?g|webp)$/.test(t.type||""))throw new Error("PNG/JPG/WEBP ছবি দিন");if(t.size>8*1024*1024)throw new Error("ছবি 8MB-এর বড় না — ছোট করুন");const r=URL.createObjectURL(t);try{const o=await new Promise((k,C)=>{const L=new Image;L.onload=()=>k(L),L.onerror=()=>C(new Error("ছবি পড়া যায়নি")),L.src=r});let c=o.naturalWidth||o.width||0,p=o.naturalHeight||o.height||0;if(!c||!p)throw new Error("ছবির size বোঝা যায়নি");const g=Math.min(1,e/Math.max(c,p));c=Math.max(1,Math.round(c*g)),p=Math.max(1,Math.round(p*g));const w=document.createElement("canvas");w.width=c,w.height=p,w.getContext("2d").drawImage(o,0,0,c,p);let T="",_=i;for(let k=0;k<6&&(T=w.toDataURL("image/jpeg",_),!(T.length<=s));k++)_-=.12;if(T.length>Mh.image)throw new Error("ছবি ছোট করা যাচ্ছে না — আরেকটা ছবি দিন");return T}finally{URL.revokeObjectURL(r)}}const We=document.getElementById("app");let Ze=null;function R(t,e="success"){const i=document.createElement("div");i.className="adm-toast "+e,i.innerHTML=`<i class="fa-solid ${e==="error"?"fa-circle-xmark":"fa-circle-check"}"></i> ${S(t)}`,We.appendChild(i),requestAnimationFrame(()=>i.classList.add("show")),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>i.remove(),300)},3200)}function Gn(t="কারণ লিখুন",e="কারণ লিখুন — user/আবেদনকারী এটাই দেখবে",i={}){return new Promise(s=>{const r=document.createElement("div");r.className="adm-modal",r.innerHTML=`<div class="am-box">
      <h5>${S(t)}</h5>
      ${i.hint?`<p class="muted">${S(i.hint)}</p>`:""}
      <textarea class="adm-input" rows="3" maxlength="200" placeholder="${S(e)}"></textarea>
      <div class="am-row">
        <button type="button" class="adm-btn ghost sm" data-x>বাতিল</button>
        <button type="button" class="adm-btn ${i.tone==="green"?"green":"red"} sm" data-ok>${S(i.okLabel||"পাঠিয়ে দিন")}</button>
      </div></div>`,We.appendChild(r);const o=r.querySelector("textarea");setTimeout(()=>o.focus(),30);const c=g=>{r.remove(),document.removeEventListener("keydown",p),s(g)},p=g=>{g.key==="Escape"&&c(null)};document.addEventListener("keydown",p),r.querySelector("[data-x]").addEventListener("click",()=>c(null)),r.querySelector("[data-ok]").addEventListener("click",()=>{const g=String(o.value||"").trim();if(g.length<3){o.classList.add("bad"),o.placeholder="কমপক্ষে ৩ অক্ষর লিখুন";return}c(g)}),r.addEventListener("click",g=>{g.target===r&&c(null)})})}Ha||(We.innerHTML='<div class="loading-center"><p style="max-width:340px;text-align:center">Firebase env variables set নেই।<br>Vercel-এ ৬টা <b>VITE_FIREBASE_*</b> variable দিন।</p></div>');gd(Zt,t=>{if(!t){Ze=null,ht();return}Qa(t)});async function Qa(t){const e=await th();if(e.error){We.innerHTML=`<div class="loading-center" style="display:block;text-align:center;padding:28px">
      <p style="margin-bottom:12px">Admin check করা যায়নি:<br><b style="font-size:13px">${S(e.error)}</b></p>
      <button class="adm-btn gold" id="gateRetry"><i class="fa-solid fa-rotate"></i> আবার চেষ্টা করুন</button>
      <p class="muted" style="margin-top:12px;font-size:12px">লগইন ভাঙেনি — শুধু সার্ভার উত্তর দেয়নি।</p></div>`,document.getElementById("gateRetry").addEventListener("click",()=>Qa(t));return}if(!e.isAdmin){await Aa(Zt),ht("এই email টা admin list-এ নেই — Firestore-এর admins collection-এ এই email-এর document আছে কিনা দেখুন।");return}Ze={email:t.email},window.location.hash=window.location.hash||"#/overview",jh(),window.addEventListener("hashchange",io)}function ht(t="",e="login"){var s;We.innerHTML=`
    <div class="login-wrap">
      <div class="login-card">
        <div class="login-logo"><i class="fa-solid fa-bolt"></i></div>
        <h1>DigitEarn <span>Admin</span></h1>
        <p class="muted">${e==="join"?"Admin হতে আবেদন পাঠান":"Admin panel-এ লগইন করুন"}</p>
        <div class="auth-tabs" role="tablist">
          <button type="button" class="auth-tab ${e==="login"?"on":""}" data-am="login"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
          <button type="button" class="auth-tab ${e==="join"?"on":""}" data-am="join"><i class="fa-solid fa-user-plus"></i> Join admin</button>
        </div>
        ${t?`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${S(t)}</div>`:""}
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
    </div>`,We.querySelectorAll("[data-am]").forEach(r=>r.addEventListener("click",()=>ht("",r.dataset.am)));const i=document.getElementById("loginForm");i==null||i.addEventListener("submit",async r=>{r.preventDefault();const o=r.target.querySelector("button");o.disabled=!0,o.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{await fd(Zt,document.getElementById("lgEmail").value.trim(),document.getElementById("lgPass").value)}catch(c){o.disabled=!1,o.innerHTML='<i class="fa-solid fa-right-to-bracket"></i> লগইন করুন';const p=String(c&&(c.code||c.message)||"");ht(/user-not-found|wrong-password|invalid-?login/i.test(p)?"email বা পাসওয়ার্ড ঠিক নেই (অথবা এই email-এ account নেই) — আবেদন করতে চাইলে “Join admin” টিপুন।":"লগইন করা যায়নি: "+(p.slice(0,80)||"আবার চেষ্টা করুন"),"login")}}),(s=document.getElementById("joinForm"))==null||s.addEventListener("submit",async r=>{r.preventDefault();const o=r.target.querySelector("button");o.disabled=!0;try{await mh({fullName:document.getElementById("jName").value.trim(),email:document.getElementById("jEmail").value.trim(),role:document.getElementById("jRole").value,note:document.getElementById("jNote").value.trim()}),We.innerHTML=`<div class="login-wrap"><div class="login-card">
        <div class="login-logo ok"><i class="fa-solid fa-circle-check"></i></div>
        <h1>আবেদন পাঠানো হয়েছে</h1>
        <p class="muted">Owner বা Full Access admin অনুমোদন করলে আপনার email-এ পাসওয়ার্ড সেট করার লিংক পাঠানো হবে।</p>
        <button class="adm-btn gold" id="bkLogin"><i class="fa-solid fa-right-to-bracket"></i> Login</button>
      </div></div>`,document.getElementById("bkLogin").addEventListener("click",()=>ht())}catch(c){o.disabled=!1,ht(String(c.message||"আবেদন পাঠানো যায়নি — একটু পরে আবার চেষ্টা করুন"),"join")}})}const Za=[{id:"overview",label:"ড্যাশবোর্ড",icon:"fa-gauge-high"},{id:"proofs",label:"জমা রিভিউ",icon:"fa-clipboard-list"},{id:"deposits",label:"টাকা জমা",icon:"fa-money-bill-wave"},{id:"withdrawals",label:"উইথড্র",icon:"fa-money-bill-transfer"},{id:"users",label:"ইউজার",icon:"fa-users"},{id:"microjobs",label:"মাইক্রো জব",icon:"fa-briefcase"},{id:"wallet",label:"অ্যাডমিন ম্যানেজমেন্ট",icon:"fa-sitemap"},{id:"tasks",label:"একাউন্ট সেল",icon:"fa-store"},{id:"settings",label:"সেটিংস",icon:"fa-gear"},{id:"notices",label:"নোটিশ",icon:"fa-bullhorn"}];function jh(){We.innerHTML=`
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
        <div class="adm-drawer-who"><i class="fa-solid fa-user-shield"></i><b>${S(Ze.email)}</b><span id="drawerRole" class="muted"></span></div>
        ${Za.map(i=>`<a href="#/${i.id}" data-nav="${i.id}"><i class="fa-solid ${i.icon}"></i> ${i.label}<span class="dd-n" data-badge="${i.id}" hidden></span></a>`).join("")}
        <button class="adm-btn ghost sm adm-drawer-out" id="drawerLogout"><i class="fa-solid fa-right-from-bracket"></i> লগআউট</button>
      </nav>
    </div>
    <div class="adm-alerts" id="admAlerts" hidden></div>
    <main class="adm-main" id="admMain"><div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div></main>`,(i=>{document.getElementById("logoutBtn").addEventListener("click",i),document.getElementById("drawerLogout").addEventListener("click",i)})(()=>{no(),Aa(Zt)});const e=document.getElementById("admDrawer");document.getElementById("admMenu").addEventListener("click",()=>{e.hidden=!e.hidden}),e.addEventListener("click",i=>{(i.target.closest("[data-close]")||i.target.closest("[data-nav]"))&&(e.hidden=!0)}),document.getElementById("admBell").addEventListener("click",()=>to(!0)),as().then(i=>{const s=document.getElementById("drawerRole");!s||!i||i.error||(s.textContent=(Ut[i.role]||i.role)+(i.needsBalance?` · ব্যালেন্স ${V(i.balance)}`:""))}).catch(()=>{}),io(),Fh()}function xh(t,e){try{const i=window.DigitEarnBridge;i&&typeof i.notify=="function"&&i.notify(String(t||""),String(e||""))}catch{}}let Ln=null,os=null;const eo=()=>"de:admSeenWd:"+String(Ze&&Ze.email||""),Uh=()=>{try{return new Set(JSON.parse(localStorage.getItem(eo())||"[]"))}catch{return new Set}},Bh=t=>{try{localStorage.setItem(eo(),JSON.stringify(t.slice(-400)))}catch{}};async function zt(t=!1){if(!document.getElementById("admMain")||!Ze)return;let e=[];try{e=await Ja("pending",50)}catch{return}const i=Uh(),s=t?e:e.filter(o=>o&&o.id&&!i.has(o.id));os=e;const r=document.getElementById("bellCount");if(r){const o=e.filter(c=>c&&c.id&&!i.has(c.id)).length;r.textContent=String(o),r.hidden=!o}if(Za.forEach(o=>{const c=document.querySelector(`[data-badge="${o.id}"]`);c&&o.id==="withdrawals"&&(c.textContent=String(e.length),c.hidden=!e.length)}),to(!1,e),s.length){const o=s[0],c=o.name||o.userId||"user",p=`উইথড্র : ${Number(o.amount||0)} BDT • ${o.accountNumber||"—"}`;R(`নতুন উইথড্র রিকোয়েস্ট: ${c} — ৳${Number(o.amount||0)}`,"error"),xh(`${s.length>1?s.length+"টা নতুন উইথড্র রিকোয়েস্ট":"নতুন উইথড্র রিকোয়েস্ট — "+c}`,p);try{navigator.vibrate&&navigator.vibrate([140,70,140])}catch{}}Bh(e.map(o=>o.id).filter(Boolean))}function to(t,e){var r;const i=document.getElementById("admAlerts");if(!i)return;const s=(e||os||[]).slice(0,12);if(t&&!i.hidden){i.hidden=!0;return}if(t)i.hidden=!1;else if(i.hidden)return;i.innerHTML=`<div class="al-head"><b><i class="fa-solid fa-money-bill-transfer" style="color:#d97706"></i> নতুন উইথড্র রিকোয়েস্ট</b>
      <button class="adm-btn ghost sm" id="alClose"><i class="fa-solid fa-xmark"></i></button></div>
    ${s.length?s.map(o=>`
      <div class="al-row">
        <span class="al-ico"><i class="fa-solid fa-user"></i></span>
        <div class="al-txt"><b>${S(o.name||o.userId||"User")}</b>
          <span>উইথড্র : <b>${Number(o.amount||0)} BDT</b> • ${S(o.method||"")} • নম্বর ${S(o.accountNumber||"—")}</span>
          <span class="muted">${le(o.createdAt)}</span></div>
        <a class="adm-btn gold sm" href="#/withdrawals" data-alopen>খুলুন</a>
      </div>`).join(""):'<p class="muted" style="padding:10px 12px">এখনো কোনো অপেক্ষমাণ রিকোয়েস্ট নেই।</p>'}`,(r=document.getElementById("alClose"))==null||r.addEventListener("click",()=>{i.hidden=!0}),i.querySelectorAll("[data-alopen]").forEach(o=>o.addEventListener("click",()=>{i.hidden=!0}))}function Fh(){no(),Ze&&(zt(!1),Ln=setInterval(()=>zt(!1),45e3))}function no(){Ln&&clearInterval(Ln),Ln=null,os=null}async function io(){const t=(window.location.hash||"#/overview").replace("#/",""),e=document.getElementById("admMain");if(e){document.querySelectorAll("[data-nav]").forEach(i=>i.classList.toggle("on",i.dataset.nav===t)),e.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';try{t==="proofs"?await xt(e):t==="deposits"?await $n(e):t==="withdrawals"?await xi(e):t==="users"?await Wh(e):t==="tasks"?await Fi(e,"task"):t==="microjobs"?await Fi(e,"microjob"):t==="wallet"||t==="admins"?await Me(e):t==="settings"?await so(e):t==="notices"?await dt(e):await Hh(e)}catch(i){const s=String(i&&i.message||i),r=/permission|insufficient/i.test(s);e.innerHTML=`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ${S(s)}
      ${r?`<div class="muted" style="font-size:12px;margin-top:8px">
        Panel এখন server (Admin SDK) দিয়ে পড়ে — নিচের ↻ বাটন চাপুন। না চললে দেখুন:
        Firestore-এর <code>admins/&lt;email&gt;</code> doc-id হুবহু আপনার login email
        হতে হবে (বড়/ছোট হাতের তফাতও fail করে), আর Vercel function-এর build
        নতুন কিনা (?op=read থাকতে হবে)।</div>`:""}</div>`}}}async function Hh(t){const e=await Dh();t.innerHTML=`
    <div class="stat-grid">
      <div class="adm-stat gold"><i class="fa-solid fa-users"></i><b>${e.totalUsers}</b><span>মোট ইউজার</span></div>
      <div class="adm-stat green"><i class="fa-solid fa-circle-check"></i><b>${e.activeUsers}</b><span>অ্যাক্টিভ</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-clipboard-list"></i><b>${e.pendingProofs}</b><span>জমার রিভিউ</span></div>
      <div class="adm-stat red"><i class="fa-solid fa-money-bill-wave"></i><b>${e.pendingDeposits}</b><span>ডিপোজিট রিভিউ</span></div>
    </div>
    <div class="adm-card"><h4><i class="fa-solid fa-scale-balanced" style="color:#d97706"></i> মোট Outstanding Balance</h4>
      <div class="big-num">${V(e.totalBalance)}</div>
      <p class="muted">সব ইউজারের ব্যালেন্সের যোগফল (প্রতি ১০০০ ইউজার পর্যন্ত)।</p>
    </div>
    ${e.recentProofs.length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-clipboard-list" style="color:#d97706"></i> সর্বশেষ জমা — অনুমোদনের অপেক্ষায়</h4>
      ${e.recentProofs.map(i=>`<div class="mini-row"><b>${S(i.taskName||i.taskSlug)}</b> <span class="muted">${le(i.createdAt)}</span><span class="badge gold">+${V(i.reward)}</span></div>`).join("")}
      <a href="#/proofs" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${e.recentDeposits.length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-money-bill-wave" style="color:#d97706"></i> সর্বশেষ টাকা জমা — অনুমোদনের অপেক্ষায়</h4>
      ${e.recentDeposits.map(i=>`<div class="mini-row"><b>${S(i.method)}</b> <span class="muted">${le(i.createdAt)}</span><span class="badge gold">${V(i.amount)}</span></div>`).join("")}
      <a href="#/deposits" class="link-more">সব দেখুন →</a>
    </div>`:""}
    ${!e.recentProofs.length&&!e.recentDeposits.length?'<p class="muted center-note">কোনো pending item নেই ✓</p>':""}
    <div class="adm-card">
      <h4><i class="fa-solid fa-stethoscope" style="color:#d97706"></i> সিস্টেম চেক (API auth)</h4>
      <p class="muted" style="font-size:13px;margin-bottom:10px">ইউজার যদি “Login required” দেখায় বা approve/reject fail করে, এখানে চাপলে কারণটা দেখাবে — Vercel-এর Firebase env, service account-এর project, আর Firestore পড়া যাচ্ছে কিনা।</p>
      <button class="adm-btn ghost sm" id="healthBtn"><i class="fa-solid fa-heart-pulse"></i> Check করুন</button>
      <div id="healthOut" style="margin-top:10px"></div>
    </div>`,document.getElementById("healthBtn").addEventListener("click",qh)}async function qh(){const t=document.getElementById("healthOut");t&&(t.innerHTML='<span class="muted"><i class="fa-solid fa-spinner fa-spin"></i> চেক হচ্ছে…</span>');let e;try{e=await eh()}catch(o){t&&(t.innerHTML=`<div class="form-err">${S(String(o.message||o))}</div>`);return}const i=(o,c,p)=>`<div class="mini-row"><span class="badge ${o?"green":"red"}">${o?"✓":"✗"}</span> ${S(c)}${p?` <span class="muted">${S(p)}</span>`:""}</div>`,s=[i(!!e.ok,"সামগ্রিক",e.ok?"server ঠিক আছে — ইউজারের “Login required” হলে সেটা deployment-এর dosh নয়":"server-side সেটআপে সমস্যা"),i(!!e.firestore&&!!e.firestore.reachable,"Firestore পড়া",e.firestore&&e.firestore.settingsDoc?"settings/site পাওয়া গেছে":"পড়া যাচ্ছে না"),i(!e.sdk||e.sdk.cjsRequireSafe!==!1,"Admin SDK (firebase-admin)",`v${e.sdk&&e.sdk.version||"?"}${e.sdk&&e.sdk.jose?" · jose@"+e.sdk.jose:""}`+(e.sdk&&e.sdk.cjsRequireSafe===!1?" — CJS require() ভাঙে, functions 500 (Node 22.x বা ^13.10.0 pin লাগবে)":"")),i(!!e.privateKeyShape,"Private key ফরম্যাট",""),i(!!e.projectMatch,"Project match",`site: ${e.tokenProject||e.serverProject||"?"} / server: ${e.serverProject||"?"} / SA: ${e.serviceAccountProject||"?"}`),i(!!e.authed,"আপনার token verify",e.authed?"OK":`ব্যর্থ (${S(e.authState||"")} ${S(e.authCode||"")})`)].join(""),r=(e.notes||[]).map(o=>`<p class="muted" style="font-size:12px;margin-top:6px"><i class="fa-solid fa-circle-info"></i> ${S(o)}</p>`).join("");t&&(t.innerHTML=s+r)}let En="pending";function Vh(t,e){const i=[];if(Array.isArray(e)&&e.length)for(const o of e){if(!o||typeof o!="object")continue;const c=String(o.label||"").slice(0,50)||"Field",p=String(o.type||"text"),g=o.value===void 0||o.value===null||o.value===""?"":String(o.value);i.push({label:c,type:p,value:g,required:!!o.required,secret:o.secret===!0})}else if(t&&typeof t=="object"&&!Array.isArray(t))for(const[o,c]of Object.entries(t))i.push({label:o,type:"text",value:String(c!=null?c:""),required:!1});if(!i.length)return"";const s=i.map(o=>{const c=/(password|passwd|pwd|passcode|otp|onetimecode|2fa|tfa|twofactor|authenticat|recovery|backupcode|secret|apikey|accesstoken|refreshtoken|privatetoken|privatekey|token|cookie|session|bearer)/,p=k=>String(k||"").toLowerCase().replace(/[^a-z0-9]/g,""),g=!!o.value&&(o.type==="password"||o.secret||c.test(p(o.label))),w=g?"•".repeat(Math.min(o.value.length,14)):o.value||"—",T=g?`<button type="button" class="adm-btn ghost sm" data-reveal data-raw="${S(o.value)}" style="margin-left:6px"><i class="fa-solid fa-eye"></i> দেখুন</button>`:"",_=[g?"sub-secret":"",o.type==="textarea"?"sub-multi":""].filter(Boolean).join(" ");return`<div class="sub-row"><span class="muted">${S(o.label)}:</span><b${_?` class="${_}"`:""}>${S(w)}</b>${T}${!o.value&&o.required?' <span class="muted">(required খালি)</span>':""}</div>`}).join(""),r=i.map(o=>`${o.label}: ${o.value}`).join(`
`);return`<div class="sub-fields">${s}</div>
    <button type="button" class="adm-btn ghost sm" data-copyall data-all="${S(r)}" style="margin-top:6px"><i class="fa-solid fa-clipboard"></i> Copy All Data</button>`}let In="";async function xt(t){t.innerHTML=`
    <div class="chip-row" id="proofKindChips">
      ${[["","সব"],["microjob","মাইক্রো জব"],["task","টাস্ক (সেল)"]].map(([_,k])=>`<button class="chip ${In===_?"on":""}" data-pk="${_}">${k}</button>`).join("")}
    </div>
    <div class="chip-row" id="proofChips">
      ${["pending","approved","rejected","all"].map(_=>`<button class="chip ${_===En?"on":""}" data-pf="${_}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[_]}</button>`).join("")}
    </div>
    <div id="proofList"></div>`,document.getElementById("proofChips").addEventListener("click",_=>{const k=_.target.closest("[data-pf]");k&&(En=k.dataset.pf,document.querySelectorAll("[data-pf]").forEach(C=>C.classList.toggle("on",C.dataset.pf===En)),xt(t))}),document.getElementById("proofKindChips").addEventListener("click",_=>{const k=_.target.closest("[data-pk]");k&&(In=k.dataset.pk||"",xt(t))});const e=await Wa(En),i=In?e.filter(_=>(_.kind==="microjob"?"microjob":"task")===In):e,s=document.getElementById("proofList");if(!i.length){s.innerHTML='<p class="muted center-note">কোনো submission নেই।</p>';return}const r=await Promise.all(i.map(async _=>({p:_,user:_.user||await zn(_.userId).catch(()=>null)}))),o=await Ga().catch(()=>[]),c=_=>o.find(k=>k.slug===_)||null,p=({p:_,user:k})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${S((k==null?void 0:k.name)||_.username||"—")}</b><span class="muted">${S((k==null?void 0:k.email)||_.userEmail||"")}</span></div>
        <span class="badge ${_.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[_.status]||_.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-user"></i> UID: ${S(_.userId)}${k!=null&&k.mobile?` • ${S(k.mobile)}`:""}</div>
      <div class="ai-meta"><i class="fa-solid fa-briefcase"></i> ${S(_.taskName||_.taskSlug)} • <b class="gold-txt">${V(_.reward)}</b> • ${le(_.createdAt)}</div>
      ${Vh(_.submittedData,_.submittedFields)}
      ${(_.images||[]).length?`<div class="thumb-row">${_.images.map(C=>`<a href="${S(C)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${S(C)}" loading="lazy" alt="proof"></a>`).join("")}</div>`:""}
      ${_.status==="rejected"&&_.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${S(_.note)}</p>`:""}
      ${_.status!=="pending"&&_.reviewedAt?`<p class="ai-meta muted-sm">reviewed ${le(_.reviewedAt)}${_.approvedBy?" by "+S(_.approvedBy):""}${_.rejectedBy?" by "+S(_.rejectedBy):""}</p>`:""}
      ${_.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-approve="${_.id}"><i class="fa-solid fa-check"></i> Approve +${V(_.reward)}</button>
        <button class="adm-btn red sm" data-rresub="${_.id}"><i class="fa-solid fa-rotate-left"></i> বাতিল — আবার জমা দিতে পারবে</button>
        <button class="adm-btn ghost sm" data-rhide="${_.id}"><i class="fa-solid fa-eye-slash"></i> বাতিল — এই user থেকে লুকান</button>
      </div>`:_.status==="rejected"?`<p class="ai-note"><i class="fa-solid fa-${_.hiddenForUser?"eye-slash":"rotate-left"}"></i> ${_.hiddenForUser?"বাতিল + লুকানো — jobটা শুধু এই user-এর list থেকে বাদ":"বাতিল করা হয়েছে — user ঠিক করে আবার জমা দিতে পারবে"}</p>`:""}
    </div>`,g=new Map;for(const _ of r){const k=String(_.p.taskSlug||"(unknown)");g.has(k)||g.set(k,[]),g.get(k).push(_)}const w=[...g.entries()].sort((_,k)=>k[1].length-_[1].length||String(_[0]).localeCompare(String(k[0])));s.innerHTML=w.map(([_,k])=>{const C=c(_),L=C&&Number(C.requiredUsers)||0;return`<div class="adm-card mj-jobhead">
      <b><i class="fa-solid fa-briefcase" style="color:#d97706"></i> ${S(k[0].p.taskName||_)}</b>
      <span class="muted" style="margin-left:6px">${S(_)}</span>
      <div class="mj-statline">
        <span><i class="fa-solid fa-users"></i> Required <b>${L||"∞"}</b></span>
        <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${C&&Number(C.approvedCount)||0}</b></span>
        <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${C?Number(C.pending)||0:k.filter(D=>D.p.status==="pending").length}</b></span>
        <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${C&&Number(C.rejected)||0}</b></span>
        <span><i class="fa-solid fa-user-plus"></i> Remaining <b>${C&&C.remaining!==null&&C.remaining!==void 0?C.remaining:"∞"}</b></span>
        ${C&&(C.full||C.closed)?'<span class="badge red">সম্পূর্ণ/বন্ধ</span>':""}
      </div>
      <p class="muted" style="font-size:12px;margin:6px 0 0">approve করলে-ই ওই user-এর list থেকে job লুকিয়ে যাবে; Required Users শেষ হলে job স্বয়ংক্রিয়ভাবে FULL হবে (তখন আর approve হয় না)।</p>
    </div>`+k.map(p).join("")}).join(""),s.querySelectorAll("[data-approve]").forEach(_=>_.addEventListener("click",async()=>{_.disabled=!0;try{await nh(_.dataset.approve),R("Proof approve — reward balance-এ যোগ হয়েছে"),xt(t)}catch(k){R(k.message,"error"),_.disabled=!1}})),s.querySelectorAll("[data-reveal]").forEach(_=>_.addEventListener("click",()=>{const k=_.previousElementSibling;if(!k)return;const C=_.dataset.on==="1";k.textContent=C?"•".repeat(Math.min(String(_.dataset.raw).length,14)):_.dataset.raw,_.innerHTML=C?'<i class="fa-solid fa-eye"></i> দেখুন':'<i class="fa-solid fa-eye-slash"></i> লুকান',_.dataset.on=C?"":"1"})),s.querySelectorAll("[data-copyall]").forEach(_=>_.addEventListener("click",async()=>{const k=_.dataset.all||"";try{await navigator.clipboard.writeText(k),R("সব field data copy হয়েছে")}catch{prompt("Copy করুন:",k)}}));const T=async(_,k,C)=>{const L=await Gn("Reject — কারণ লিখুন (user এই কারণটাই দেখবে)","যেমন: স্ক্রিনশটে নাম দেখা যাচ্ছে না");if(L!==null)try{await _h(_,k,L),R(C),xt(t)}catch(j){R(j.message,"error")}};s.querySelectorAll("[data-rresub]").forEach(_=>_.addEventListener("click",()=>T(_.dataset.rresub,"reject_resubmit","Reject — user ঠিক করে আবার submit করতে পারবে"))),s.querySelectorAll("[data-rhide]").forEach(_=>_.addEventListener("click",()=>{confirm("Jobটা শুধু এই user-এর list থেকে লুকানো হবে (admin list-এ থাকবে)। ঠিক আছে?")&&T(_.dataset.rhide,"reject_hide","Reject + Hide — এই user-এর MicroJobs list থেকে বাদ")})),s.querySelectorAll("[data-reject]").forEach(_=>_.addEventListener("click",()=>T(_.dataset.reject,"reject_resubmit","Proof reject করা হয়েছে")))}let Tn="pending";async function $n(t){t.innerHTML=`
    <div class="chip-row" id="depChips">
      ${["pending","approved","rejected","all"].map(r=>`<button class="chip ${r===Tn?"on":""}" data-df="${r}">${{pending:"Pending",approved:"Approved",rejected:"Rejected",all:"সব"}[r]}</button>`).join("")}
    </div>
    <div id="depList"></div>`,document.getElementById("depChips").addEventListener("click",r=>{const o=r.target.closest("[data-df]");o&&(Tn=o.dataset.df,document.querySelectorAll("[data-df]").forEach(c=>c.classList.toggle("on",c.dataset.df===Tn)),$n(t))});const e=await za(Tn),i=document.getElementById("depList");if(!e.length){i.innerHTML='<p class="muted center-note">কোনো deposit নেই।</p>';return}const s=await Promise.all(e.map(async r=>({d:r,user:r.user||await zn(r.userId).catch(()=>null)})));i.innerHTML=s.map(({d:r,user:o})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${S((o==null?void 0:o.name)||r.userId)}</b><span class="muted">${S((o==null?void 0:o.mobile)||"")}</span></div>
        <span class="badge ${r.status}">${{pending:"PENDING",approved:"APPROVED",rejected:"REJECTED"}[r.status]||r.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-wave"></i> ${S(r.method)} • <b class="gold-txt">${V(r.amount)}</b> • TrxID: <b>${S(r.trxId)}</b>${r.senderNumber?` • Sender: <b>${S(r.senderNumber)}</b>`:""}</div>
      <div class="ai-meta muted-sm">${le(r.createdAt)}${r.status!=="pending"&&r.reviewedAt?" • reviewed "+le(r.reviewedAt):""}</div>
      ${r.image?`<div class="thumb-row"><a href="${S(r.image)}" target="_blank" rel="noopener"><img class="adm-thumb" src="${S(r.image)}" loading="lazy" alt="payment proof"></a></div>`:""}
      ${r.status==="rejected"&&r.note?`<p class="ai-note"><i class="fa-solid fa-note"></i> ${S(r.note)}</p>`:""}
      ${r.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-dapprove="${r.id}"><i class="fa-solid fa-check"></i> অনুমোদন — একাউন্ট চালু</button>
        <button class="adm-btn red sm" data-dreject="${r.id}"><i class="fa-solid fa-xmark"></i> বাতিল</button>
      </div>`:""}
    </div>`).join(""),i.querySelectorAll("[data-dapprove]").forEach(r=>r.addEventListener("click",async()=>{if(confirm("Approve করলে account ACTIVE হবে + activation bonus যোগ হবে। নিশ্চিত?")){r.disabled=!0;try{await ih(r.dataset.dapprove),R("Deposit approve — account active + bonus"),$n(t)}catch(o){R(o.message,"error"),r.disabled=!1}}})),i.querySelectorAll("[data-dreject]").forEach(r=>r.addEventListener("click",async()=>{const o=await Gn("ডিপোজিট বাতিল — কারণ লিখুন (user এটাই দেখবে)","যেমন: TrxID মেলেনি");if(o!==null)try{await sh(r.dataset.dreject,o),R("Deposit reject করা হয়েছে"),$n(t)}catch(c){R(c.message,"error")}}))}let Sn="pending";async function xi(t){t.innerHTML=`
    <div class="chip-row" id="wdChips">
      ${["pending","paid","rejected","all"].map(o=>`<button class="chip ${o===Sn?"on":""}" data-wf="${o}">${{pending:"অপেক্ষমাণ",paid:"পাঠানো হয়েছে",rejected:"বাতিল",all:"সব"}[o]}</button>`).join("")}
    </div>
    <div id="wdList"></div>`,document.getElementById("wdChips").addEventListener("click",o=>{const c=o.target.closest("[data-wf]");c&&(Sn=c.dataset.wf,document.querySelectorAll("[data-wf]").forEach(p=>p.classList.toggle("on",p.dataset.wf===Sn)),xi(t))});const e=await Ja(Sn),i=document.getElementById("wdList");if(!e.length){i.innerHTML='<p class="muted center-note">কোনো withdrawal নেই। (পুরনো pending request Users tab-এ user-এর detail-এ দেখাবে)</p>';return}const s=await Promise.all(e.map(async o=>({w:o,user:o.user||await zn(o.userId).catch(()=>null)})));i.innerHTML=s.map(({w:o,user:c})=>`
    <div class="adm-item">
      <div class="ai-head">
        <div class="ai-user"><b>${S((c==null?void 0:c.name)||o.name||o.userId)}</b><span class="muted">${S((c==null?void 0:c.mobile)||"")}</span></div>
        <span class="badge ${o.status==="paid"?"green":o.status}">${{pending:"অপেক্ষমাণ",paid:"পেমেন্ট পাঠানো",rejected:"বাতিল"}[o.status]||o.status}</span>
      </div>
      <div class="ai-meta"><i class="fa-solid fa-money-bill-transfer"></i> ${S(o.method)} • <b class="gold-txt">${V(o.amount)}</b> • ${S(o.accountNumber)}</div>
      <div class="ai-meta muted-sm"><i class="fa-regular fa-clock"></i> ${le(o.createdAt)}${o.processedAt?" • প্রসেসড "+le(o.processedAt):""}</div>
      ${o.note?`<p class="ai-note ${o.status==="rejected"?"bad":""}"><i class="fa-solid fa-note-sticky"></i> ${o.status==="rejected"?"বাতিলের কারণ: ":"নোট: "}${S(o.note)}</p>`:""}
      ${o.status==="pending"?`
      <div class="ai-actions">
        <button class="adm-btn green sm" data-wpaid="${o.id}"><i class="fa-solid fa-check"></i> অনুমোদন — টাকা পাঠানো হয়েছে</button>
        <button class="adm-btn red sm" data-wrej="${o.id}"><i class="fa-solid fa-xmark"></i> বাতিল — টাকা ফেরত</button>
      </div>`:""}
    </div>`).join("");const r=async(o,c)=>{const p=e.find(w=>w.id===o.dataset[c==="paid"?"wpaid":"wrej"]);if(!p)return;let g="";if(c==="paid"){if(!confirm(`“${p.name||p.userId||"user"}” এর ${V(p.amount)} কি আসল টাকা পাঠানো হয়েছে? অনুমোদন করলে রিকোয়েস্ট বন্ধ হয়ে যাবে (টাকা ইতিমধ্যে কেটা হয়েছে)।`))return}else if(!confirm(`বাতিল করলে ${V(p.amount)} user-এর ব্যালেন্সে ফেরত যাবে। নিশ্চিত?`)||(g=await Gn("বাতিল করার কারণ লিখুন — user এটাই দেখবে","যেমন: নম্বর ভুল, আবার ঠিক নম্বর দিয়ে পাঠান"),g===null))return;o.disabled=!0;try{await ji(p.userId,p.id,c,g),R(c==="paid"?"অনুমোদিত — পেমেন্ট পাঠানো হিসেবে চিহ্নিত হয়েছে":"বাতিল — টাকা ব্যালেন্সে ফেরত গেছে"),zt(!0),xi(t)}catch(w){R(String(w.message||w),"error"),o.disabled=!1}};i.querySelectorAll("[data-wpaid]").forEach(o=>o.addEventListener("click",()=>r(o,"paid"))),i.querySelectorAll("[data-wrej]").forEach(o=>o.addEventListener("click",()=>r(o,"rejected")))}let Pi="",fe=null;async function Wh(t){t.innerHTML=`
    <input type="search" id="userSearch" class="adm-input" placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..." value="${S(Pi)}">
    <div id="userList" class="user-list"></div>
    <div id="userDetail"></div>`;const e=async()=>{const s=await rs(300),r=Pi.trim().toLowerCase(),o=r?s.filter(p=>(p.name||"").toLowerCase().includes(r)||String(p.mobile||"").includes(r)):s,c=document.getElementById("userList");c.innerHTML=o.slice(0,100).map(p=>`
      <div class="user-row ${p.uid===fe?"on":""}" data-uid="${p.uid}">
        <div class="ur-avatar">${S((p.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${S(p.name||"—")}</b><span class="muted">${S(p.mobile||"")}</span></div>
        <div class="ur-right"><b class="gold-txt">${V(p.balance)}</b>${p.isActive?'<span class="badge green">চালু</span>':'<span class="badge gray">নিষ্ক্রিয়</span>'}</div>
      </div>`).join("")||'<p class="muted center-note">কোনো ইউজার পাওয়া যায়নি।</p>',c.querySelectorAll("[data-uid]").forEach(p=>p.addEventListener("click",()=>{fe=p.dataset.uid,e(),i()})),i()},i=async()=>{const s=document.getElementById("userDetail");if(!fe){s.innerHTML="";return}s.innerHTML='<div class="loading-center"><i class="fa-solid fa-spinner fa-spin"></i></div>';const[r,o,c,p]=await Promise.all([zn(fe),ah(fe),rh(fe,10),$h(fe).catch(()=>[])]);if(!r){s.innerHTML="";return}s.innerHTML=`
      <div class="adm-card detail-card">
        <h4><i class="fa-solid fa-user" style="color:#d97706"></i> ${S(r.name||"User")} <span class="muted" style="font-weight:500">• ${S(r.mobile||"")}</span></h4>
        <div class="detail-grid">
          <div><span class="muted">ব্যালেন্স</span><b>${V(r.balance)}</b></div>
          <div><span class="muted">মোট আয়</span><b>${V(r.totalEarned)}</b></div>
          <div><span class="muted">অবস্থা</span>${r.isActive?'<b style="color:#16a34a">চালু</b>':'<b style="color:#dc2626">নিষ্ক্রিয়</b>'}</div>
          <div><span class="muted">যোগ দেওয়া</span><b>${le(r.createdAt)}</b></div>
        </div>
        <div class="ai-actions">
          ${r.isActive?`<button class="adm-btn red sm" data-deact="${r.uid}"><i class="fa-solid fa-ban"></i> নিষ্ক্রিয় করুন</button>`:`<button class="adm-btn green sm" data-act="${r.uid}"><i class="fa-solid fa-check"></i> চালু করুন</button>`}
        </div>
        <h4 style="margin-top:14px"><i class="fa-solid fa-money-bill-transfer" style="color:#d97706"></i> উইথড্র</h4>
        ${c.length?c.map(T=>`<div class="mini-row">
          <b>${S(T.method)} • ${V(T.amount)}</b>
          <span class="muted">${S(T.accountNumber)} • ${le(T.createdAt)}</span>
          <span class="badge ${T.status==="paid"?"green":T.status}">${T.status.toUpperCase()}</span>
          ${T.status==="pending"?`<button class="adm-btn green sm" style="margin-left:6px" data-wd-paid="${T.id}">অনুমোদন</button><button class="adm-btn red sm" style="margin-left:4px" data-wd-rej="${T.id}">বাতিল</button>`:`<span class="badge ${T.status==="paid"?"green":"red"}">${T.status==="paid"?"পাঠানো হয়েছে":"বাতিল"}</span>${T.note?`<br><span class="muted" style="font-size:11.5px">${S(T.note)}</span>`:""}`}
        </div>`).join(""):'<p class="muted">কোনো withdrawal নেই।</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> এই user-এর ব্যক্তিগত নোটিশ/সতর্কতা</h4>
        ${p.length?p.map(T=>`<div class="mini-row">
          <b>${T.type==="warning"?"⚠️ ":""}${S(T.title||"")} ${T.enabled?"":'<span class="badge gray">বন্ধ</span>'}</b>
          <span class="muted">${S(T.body||"")}</span>
          <span><button class="adm-btn ghost sm" style="margin-left:6px" data-tn-tgl="${T.id}">${T.enabled?"লুকান":"দেখান"}</button><button class="adm-btn red sm" style="margin-left:4px" data-tn-del="${T.id}">মুছুন</button></span>
        </div>`).join(""):'<p class="muted">কোনো private notice/warning নেই। (Notices tab থেকে পাঠান)</p>'}
        <h4 style="margin-top:14px"><i class="fa-solid fa-receipt" style="color:#d97706"></i> সাম্প্রতিক লেনদেন</h4>
        ${o.length?o.map(T=>`<div class="mini-row"><b>${S(T.note||T.type)}</b><span class="muted">${le(T.createdAt)}</span><span class="badge ${Number(T.amount)>=0?"green":"gray"}">${Number(T.amount)>=0?"+":""}${V(T.amount)}</span></div>`).join(""):'<p class="muted">কোনো transaction নেই।</p>'}
      </div>`;const g=s.querySelector("[data-act]");g&&g.addEventListener("click",async()=>{try{await qr(g.dataset.act,!0),R("User active করা হয়েছে"),e()}catch(T){R(T.message,"error")}});const w=s.querySelector("[data-deact]");w&&w.addEventListener("click",async()=>{if(confirm("User-কে inactive করবেন?"))try{await qr(w.dataset.deact,!1),R("User inactive করা হয়েছে"),e()}catch(T){R(T.message,"error")}}),s.querySelectorAll("[data-wd-paid]").forEach(T=>T.addEventListener("click",async()=>{if(confirm("অনুমোদন করবেন? (টাকা পাঠানো শেষ মানে)")){T.disabled=!0;try{await ji(fe,T.dataset.wdPaid,"paid"),R("অনুমোদিত ✓"),zt(!0),i()}catch(_){R(String(_.message||_),"error"),T.disabled=!1}}})),s.querySelectorAll("[data-wd-rej]").forEach(T=>T.addEventListener("click",async()=>{if(!confirm("বাতিল করলে টাকা user-এর ব্যালেন্সে ফেরত যাবে। নিশ্চিত?"))return;const _=await Gn("বাতিল করার কারণ লিখুন — user এটাই দেখবে","যেমন: নম্বর ভুল হয়েছে");if(_!==null){T.disabled=!0;try{await ji(fe,T.dataset.wdRej,"rejected",_),R("বাতিল — টাকা ফেরত গেছে"),zt(!0),i()}catch(k){R(String(k.message||k),"error"),T.disabled=!1}}})),s.querySelectorAll("[data-tn-tgl]").forEach(T=>T.addEventListener("click",async()=>{const _=p.find(k=>k.id===T.dataset.tnTgl);try{await Xa(fe,_.id,{enabled:!_.enabled}),R("Notice toggle"),i()}catch(k){R(k.message,"error")}})),s.querySelectorAll("[data-tn-del]").forEach(T=>T.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await Ya(fe,T.dataset.tnDel),R("Notice delete"),i()}catch(_){R(_.message,"error")}}))};document.getElementById("userSearch").addEventListener("input",s=>{Pi=s.target.value,e()}),await e()}const Kn=["text","email","password","tel","number","url","textarea","image"],Ui=Kn.filter(t=>t!=="password");function Bi(t={},e=Kn){return`<div class="if-row" data-if-row>
    <input class="adm-input if-label" placeholder="Field Title (যেমন: UID, Password, Cookies)" value="${S(t.label||"")}" maxlength="50">
    <select class="adm-input if-type">${e.map(i=>`<option value="${i}" ${t.type===i?"selected":""}>${i}</option>`).join("")}</select>
    <input class="adm-input if-ph" placeholder="Placeholder (খালি রাখলে default)" value="${S(t.placeholder||"")}" maxlength="60">
    <label class="chk if-req"><input type="checkbox" data-ifreq ${t.required?"checked":""}> Required</label>
    <button type="button" class="adm-btn red sm if-del" data-ifdel><i class="fa-solid fa-trash"></i></button>
  </div>`}function zh(t,e=!1){const i=Array.isArray(t.inputFields)?t.inputFields:[],s=e?Ui:Kn;return`
    <div class="if-editor">
      <div class="if-head">
        <label>Input Fields — user task page-এ এই field গুলো পূরণ করে submit করবে</label>
        <button type="button" class="adm-btn ghost sm" data-ifadd><i class="fa-solid fa-plus"></i> Add Input Field</button>
      </div>
      <div class="if-rows" data-ifrows data-iftypes="${e?"mj":""}">${i.map(r=>Bi(r,s)).join("")||'<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>'}</div>
    </div>`}const Ut={owner:"Owner / Main Admin",full:"Full Access Admin",poster:"Job Poster Admin"};async function Me(t){var D;const[e,i]=await Promise.all([as().catch(()=>null),ch().catch(()=>({items:[],isOwner:!1}))]);if(!e||e.ok===!1||e.error){t.innerHTML=`<div class="form-err"><i class="fa-solid fa-triangle-exclamation"></i> ওয়ালেট পড়া যায়নি${e&&e.error?`: ${S(String(e.error))}`:""}</div>`;return}const s=A=>`৳${(Number(A)||0).toFixed(2)}`,r=`
    <div class="wt-grid">
      <div class="wt-card"><span>রোল</span><b>${Ut[e.role]||e.role}${e.activeMode==="poster"&&e.isOwner?" (Poster মোড)":""}</b></div>
      <div class="wt-card"><span>ব্যালেন্স</span><b class="${e.needsBalance&&Number(e.balance)<=0?"bad":""}">${s(e.balance)}</b></div>
      <div class="wt-card"><span>job-এ আটকা (reserved)</span><b>${s(e.reserved)}</b></div>
      <div class="wt-card"><span>প্রকাশের নিয়ম</span><b>${e.needsBalance?"reward × requiredUsers আগে কাটে":"ব্যালেন্স লাগে না"}</b></div>
    </div>`,o=e.isOwner?`
    <div class="adm-card wt-mode">
      <div><b>Owner মোড বদল</b><br><span class="muted">Full Access mode-এ নিজের publishing-এ ব্যালেন্স লাগে না; Job Poster mode চললে নিজেরও বাজেট কাটে (testing/audit-এর জন্য)।</span></div>
      <button class="adm-btn ${e.activeMode==="poster"?"gold":"ghost"} sm" data-wtm="full"><i class="fa-solid fa-key"></i> Full Access Mode</button>
      <button class="adm-btn ${e.activeMode!=="poster"?"gold":"ghost"} sm" data-wtm="poster"><i class="fa-solid fa-user-shield"></i> Job Poster Mode</button>
    </div>`:"",c=(e.jobs||[]).length?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-briefcase" style="color:#d97706"></i> আপনার ফান্ড করা job</h4>
      <table class="adm-table"><thead><tr><th>জব</th><th>রোয়ার্ড</th><th>লাগত জন</th><th>বাজেট</th><th>আটকানো</th><th>অবস্থা</th></tr></thead>
      <tbody>${e.jobs.map(A=>`<tr>
        <td><b>${S(A.nameBn||A.slug)}</b><br><span class="muted">${S(A.slug)}</span></td>
        <td>${s(A.reward)}</td><td>${A.requiredUsers}</td><td>${s(A.budget)}</td><td>${s(A.reservedBudget)}</td>
        <td><span class="badge ${A.status==="live"?"green":A.status==="draft"?"gray":"red"}">${A.status==="live"?"লাইভ":A.status==="draft"?"ড্রাফট":"বন্ধ"}</span></td>
      </tr>`).join("")}</tbody></table>
    </div>`:"",p=`
    <div class="adm-card">
      <h4><i class="fa-solid fa-receipt" style="color:#d97706"></i> ওয়ালেট লগ</h4>
      ${(e.ledger||[]).length?`<table class="adm-table"><thead><tr><th>কী</th><th>জব</th><th>টাকা</th><th>পরবর্তী ব্যালেন্স</th></tr></thead>
        <tbody>${e.ledger.map(A=>`<tr><td>${S(A.type||"")}${A.note?` <span class="muted">— ${S(String(A.note))}</span>`:""}${A.by&&A.by!==""?`<br><span class="muted">by ${S(String(A.by))}</span>`:""}</td>
          <td>${S(A.jobSlug||"—")}</td><td class="${Number(A.amount)<0?"bad":"ok"}">${Number(A.amount)<0?"-":"+"}${s(Math.abs(Number(A.amount)||0)).slice(1)}</td>
          <td>${A.balanceAfter===void 0||A.balanceAfter===null?"—":s(A.balanceAfter)}</td></tr>`).join("")}</tbody></table>`:'<p class="muted">এখনো কোনো লেনদেন নেই।</p>'}
    </div>`,g=!!i.isOwner,w=!!i.isManager||g,_=((w?await dh().catch(()=>({items:[]})):{items:[]}).items||[]).filter(A=>String(A.status)==="pending"),k=w?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-user-plus" style="color:#d97706"></i> Join admin আবেদন${_.length?` <span class="badge red">${_.length}টা অপেক্ষমাণ</span>`:""}</h4>
      <p class="muted" style="font-size:12.5px">যে কেউ আবেদন পাঠাতে পারে, কিন্তু approve না করা পর্যন্ত তার কোনো access নেই। Owner role শুধু Ownerই দিতে পারেন।</p>
      ${_.length?`<div class="jj-list">${_.map(A=>`
        <div class="jj-row">
          <div class="jj-who"><b>${S(A.fullName||"—")}</b><span class="muted">${S(A.email)}</span>
            ${A.alreadyAdmin?'<span class="badge gold">এই email আগে থেকেই ব্যবহৃত</span>':""}
            ${A.note?`<span class="muted jj-note">“${S(A.note)}”</span>`:""}</div>
          <div class="jj-act">
            <select class="adm-input jj-role" data-jrole="${S(A.email)}">
              ${[["poster","Job Poster"],["full","Full Access"]].concat(g?[["owner","Owner"]]:[]).map(([$,N])=>`<option value="${$}" ${A.requestedRole===$?"selected":""}>${N}</option>`).join("")}
            </select>
            <button class="adm-btn green sm" data-jok="${S(A.email)}"><i class="fa-solid fa-check"></i> অনুমোদন</button>
            <button class="adm-btn red sm" data-jno="${S(A.email)}"><i class="fa-solid fa-xmark"></i> বাতিল</button>
          </div>
          <div class="jj-rej" data-jrej="${S(A.email)}" hidden>
            <input class="adm-input" data-jreason="${S(A.email)}" maxlength="300" placeholder="বাতিল করার কারণ লিখুন (আবেদনকারী এটাই দেখবে)">
            <button class="adm-btn red sm" data-jrok="${S(A.email)}">কারণ দিয়ে বাতিল</button>
          </div>
        </div>`).join("")}</div>`:'<p class="muted">এখনো কোনো আবেদন নেই।</p>'}
    </div>`:"",C=w?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-user-plus" style="color:#d97706"></i> Admin account তৈরি করুন</h4>
      <p class="muted" style="font-size:12.5px">email-এ Firebase Auth account না থাকলে server নিজেই বানায়; password খালি রাখলে একটা <b>সেটআপ লিংক</b> দেখাবে — সেটা পাঠিয়ে দিন।</p>
      <div class="ac-grid">
        <input class="adm-input" id="acEmail" type="email" placeholder="admin email">
        <input class="adm-input" id="acName" placeholder="নাম">
        <select class="adm-input" id="acRole">${g?'<option value="owner">Owner</option>':""}<option value="full">Full Access</option><option value="poster" selected>Job Poster</option></select>
        <input class="adm-input" id="acBal" type="number" min="0" step="1" placeholder="শুরু ব্যালেন্স (Poster) ৳">
        <input class="adm-input" id="acPass" type="text" placeholder="password (খালি রাখলে setup link)" autocomplete="new-password">
        <button class="adm-btn gold sm" id="acCreate"><i class="fa-solid fa-plus"></i> তৈরি করুন</button>
      </div>
      <div id="acOut"></div>
    </div>`:"",L=w?`
    <div class="adm-card">
      <h4><i class="fa-solid fa-user-shield" style="color:#d97706"></i> অ্যাডমিন তালিকা ও ব্যালেন্স${g?"":' <span class="badge gray">Role বদল শুধু Owner</span>'}</h4>
      <p class="muted" style="font-size:12.5px">Owner ও Full Access-এর ব্যালেন্স লাগে না। Job Poster-কে প্রকাশের আগেই <b>reward × requiredUsers</b> ব্যালেন্স থাকতে হয় (রোয়ার্ড ৳১–৳৫০০)। সাসপেন্ড করলে সেই admin-এর সব panel access সাথে সাথে বন্ধ।</p>
      <table class="adm-table"><thead><tr><th>অ্যাডমিন</th><th>রোল</th><th>ব্যালেন্স / আটকা</th><th>কাজ</th></tr></thead><tbody>
        ${i.items.map(A=>`<tr class="${A.suspended?"wt-off":""}">
          <td><b>${S(A.fullName||A.email)}</b><br><span class="muted">${S(A.email)}</span>
            ${A.email===e.email?' <span class="badge gold">আপনি</span>':""}
            ${A.suspended?`<span class="badge red">সাসপেন্ডেড</span>${A.suspendReason?`<br><span class="muted">কারণ: ${S(A.suspendReason)}</span>`:""}`:""}
            ${A.joinedAt?`<br><span class="muted">যোগ দেওয়া: ${S(le(A.joinedAt))}</span>`:""}</td>
          <td>${g?`<select class="adm-input wt-role" data-email="${S(A.email)}">
            ${[["owner","Owner"],["full","Full Access"],["poster","Job Poster"]].map(([$,N])=>`<option value="${$}" ${A.role===$?"selected":""}>${N}</option>`).join("")}
          </select> <button class="adm-btn ghost sm" data-rolessave="${S(A.email)}">সেভ</button>`:`<b>${Ut[A.role]||A.role}</b>${A.activeMode==="poster"&&A.isOwner?'<br><span class="muted">Poster মোড</span>':""}`}
            <br><span class="muted">${A.needsBalance?"ব্যালেন্স দিয়ে প্রকাশ করে":"ব্যালেন্স লাগে না"}</span></td>
          <td><b>${s(A.balance)}</b><br><span class="muted">job-এ আটকা ${s(A.reserved)}</span></td>
          <td class="wt-acts">
            <input class="adm-input wt-amt" data-amtfor="${S(A.email)}" type="number" step="1" min="0" placeholder="৳" style="width:88px">
            <button class="adm-btn green sm" data-baladd="${S(A.email)}">যোগ</button>
            <button class="adm-btn red sm" data-balsub="${S(A.email)}">বাদ</button>
            <button class="adm-btn ghost sm" data-balset="${S(A.email)}">সেট</button>
            <button class="adm-btn ${A.suspended?"green":"ghost"} sm" data-sus="${S(A.email)}" data-sus-on="${A.suspended?"0":"1"}">
              <i class="fa-solid ${A.suspended?"fa-circle-check":"fa-ban"}"></i> ${A.suspended?"চালু করুন":"সাসপেন্ড"}
            </button>
          </td></tr>`).join("")}
      </tbody></table>
    </div>`:"";t.innerHTML=`
    <div class="adm-card">
      <h4><i class="fa-solid fa-sitemap" style="color:#d97706"></i> অ্যাডমিন ম্যানেজমেন্ট</h4>
      <p class="muted" style="font-size:12.5px">Admin account, আবেদন, ব্যালেন্স ও suspend — এখানে। সব হিসাব server-এ হয় (client-এর balance/role কখনো ধরা হয় না);
        Job Poster-এর জন্য শুধু নিজের ব্যালেন্স ও job-এ আটকা টাকা।</p>
      ${r}
    </div>
    ${k}
    ${C}
    ${o}
    ${L}
    ${c}
    ${p}`,t.querySelectorAll("[data-jno]").forEach(A=>A.addEventListener("click",()=>{var N;const $=t.querySelector(`.jj-rej[data-jrej="${A.dataset.jno}"]`);$&&($.hidden=!$.hidden,$.hidden||(N=$.querySelector("input"))==null||N.focus())})),t.querySelectorAll("[data-jrok]").forEach(A=>A.addEventListener("click",async()=>{var M;const $=A.dataset.jrok,N=String(((M=t.querySelector(`[data-jreason="${$}"]`))==null?void 0:M.value)||"").trim();if(N.length<3){R("বাতিল করার কারণ লিখুন","error");return}A.disabled=!0;try{await hh($,N),R("আবেদন বাতিল হয়েছে"),Me(t)}catch(F){R(String(F.message||F),"error"),A.disabled=!1}})),t.querySelectorAll("[data-jok]").forEach(A=>A.addEventListener("click",async()=>{var M;const $=A.dataset.jok,N=((M=t.querySelector(`.jj-role[data-jrole="${$}"]`))==null?void 0:M.value)||"poster";if(confirm(`“${$}” কে ${Ut[N]||N} হিসেবে অনুমোদন করবেন?`)){A.disabled=!0;try{const F=await uh($,N);R("Admin তৈরি হয়েছে ✓");const W=document.getElementById("acOut");W&&F&&F.setupLink&&(W.innerHTML=`<p class="muted" style="font-size:12.5px">পাসওয়ার্ড সেট করার লিংক (${S(F.email)}):</p>
          <input class="adm-input" value="${S(F.setupLink)}" readonly onclick="this.select()">`),Me(t)}catch(F){R(String(F.message||F),"error"),A.disabled=!1}}})),(D=document.getElementById("acCreate"))==null||D.addEventListener("click",async A=>{const $=A.currentTarget,N=String(document.getElementById("acEmail").value||"").trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(N)){R("email ঠিক করে লিখুন","error");return}$.disabled=!0;try{const M=await fh({email:N,fullName:String(document.getElementById("acName").value||"").trim(),role:document.getElementById("acRole").value,balance:Number(document.getElementById("acBal").value)||null,password:String(document.getElementById("acPass").value||"")});document.getElementById("acOut").innerHTML=`<p class="ok-note">✓ ${S(M.email)} — ${S(Ut[M.role]||M.role)} তৈরি হয়েছে।${M.uid?"":' <span class="muted">(Firebase account আগে থেকে ছিল)</span>'}${M.authError?`<br><span class="muted">${S(M.authError)}</span>`:""}</p>
        ${M.setupLink?`<p class="muted" style="font-size:12.5px">পাসওয়ার্ড সেট করার লিংক — পাঠিয়ে দিন:</p><input class="adm-input" value="${S(M.setupLink)}" readonly onclick="this.select()">`:""}`,R("Admin account তৈরি হয়েছে ✓"),Me(t)}catch(M){R(String(M.message||M),"error")}$.disabled=!1}),t.querySelectorAll("[data-sus]").forEach(A=>A.addEventListener("click",async()=>{const $=A.dataset.sus,N=A.dataset.susOn==="1";if(!(N&&!confirm(`${$} কে সাসপেন্ড করবেন? — সাথে সাথে ওই admin-এর panel access বন্ধ হয়ে যাবে।`))){A.disabled=!0;try{await ph($,N,N?"Admin Management থেকে সাসপেন্ড করা হয়েছে":""),R(N?"সাসপেন্ড করা হয়েছে":"আবার চালু করা হয়েছে"),Me(t)}catch(M){R(String(M.message||M),"error"),A.disabled=!1}}})),t.querySelectorAll("[data-wtm]").forEach(A=>A.addEventListener("click",async()=>{try{await yh(A.dataset.wtm),R("Mode বদলেছে"),Me(t)}catch($){R(String($.message||$),"error")}})),t.querySelectorAll("[data-rolessave]").forEach(A=>A.addEventListener("click",async()=>{const $=t.querySelector(`.wt-role[data-email="${A.dataset.rolessave}"]`);try{await vh(A.dataset.rolessave,$.value),R("Role সেভ হয়েছে"),Me(t)}catch(N){R(String(N.message||N),"error")}}));const j=async(A,$,N)=>{const M=t.querySelector(`.wt-amt[data-amtfor="${A}"]`),F=Math.round((Number(M&&M.value)||0)*100)/100;if(!F&&F!==0){R("অংক লিখুন","error");return}N&&(N.disabled=!0);try{const W=await gh(A,$==="add"?{delta:F,note:"owner credit"}:$==="sub"?{delta:-F,note:"owner debit"}:{setBalance:F,note:"owner set"});R(`ব্যালেন্স: ${s(W.balance||0)}`),Me(t)}catch(W){R(String(W.message||W),"error"),N&&(N.disabled=!1)}};t.querySelectorAll("[data-baladd]").forEach(A=>A.addEventListener("click",()=>j(A.dataset.baladd,"add",A))),t.querySelectorAll("[data-balsub]").forEach(A=>A.addEventListener("click",()=>j(A.dataset.balsub,"sub",A))),t.querySelectorAll("[data-balset]").forEach(A=>A.addEventListener("click",()=>j(A.dataset.balset,"set",A)))}async function Fi(t,e){var $,N,M,F,W;e=e==="microjob"?"microjob":"task";const i=e==="microjob",s=()=>Fi(t,e),r=i?await as().catch(()=>null):null,[o,c]=await Promise.all([oh(),Ga(e).catch(()=>[])]),p=(o||[]).filter(h=>((h&&h.kind)==="microjob"?"microjob":"task")===e),g=h=>c.find(u=>u.slug===h)||null,w=`
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
    </div>`,T=`
    <div class="adm-card" style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div style="flex:1 1 260px"><b>বিল্ট-ইন লিস্ট থেকে টাস্ক তৈরি করুন</b><br>
        <span class="muted">${p.length?"যেগুলোর doc নেই শুধু সেটুকুই বানাবে — আগে থেকে যা আছে (rate, fields, lock) অক্ষত থাকবে।":"Firestore-এ কোনো task config নেই — একারণেই user submit করলে “Project পাওয়া যায়নি” আসছে। নিচের বাটন চাপলেই ঠিক হয়ে যাবে।"}</span></div>
      <button class="adm-btn gold sm" id="seedTasksBtn"><i class="fa-solid fa-database"></i> ${p.length?"বাকিগুলো তৈরি করুন":"এখনই তৈরি করুন"}</button>
    </div>`;t.innerHTML=`
    <div class="adm-card task-head"><h4>${i?'<i class="fa-solid fa-briefcase" style="color:#d97706"></i> MicroJobs — আলাদা সিস্টেম':'<i class="fa-solid fa-store" style="color:#d97706"></i> টাস্ক (অ্যাকাউন্ট সেল)'}</h4>
    <p class="muted">${i?"প্রতিটা জব user-এর “মাইক্রো জব” পেজে আলাদা কার্ড হিসেবে দেখাবে — ৫টা বানালে ৫টা কার্ড, কিছুই আগে থেকে বসানো নেই। রোয়ার্ড, ছবি, নিয়ম, লিংক, ভিডিও, কতজন দরকার, জমার ফিল্ড — সব এখান থেকেই। নির্ধারিত সংখ্যক ইউজার অনুমোদন পেলে জব নিজে থেকেই বন্ধ হয়, যে ইউজার কাজটা করে ফেলেছে তার কাছে আর দেখায় না (এই ট্যাবে সবসময় দেখাবে)।":"পুরোনো সিস্টেম (ফেসবুক/জিমাইল/ইন্সট্রাগ্রাম একাউন্ট সেল) — এগুলো মাইক্রো জব পেজে দেখায় না। সেভ করলেই সাইটে দেখাবে। এখানে একাউন্ট জমার কোনো দৈনিক লিমিট নেই — যে যত খুশি বার জমা দিতে পারে (একই একাউন্ট বারবার দিলে শুধু সেটাই বাতিল হয়)।"}
    ${i?w:""}
    ${i?"":T}
    <div id="taskList">${p.map(h=>`
      <div class="adm-card task-card" data-slug="${S(h.slug)}">
        <div class="task-row">
          <div class="task-info">
            <b>${S(h.nameBn||h.slug)} ${h.enabled===!1?'<span class="badge gray">বন্ধ</span>':""} ${h.locked?'<span class="badge gold">লকড</span>':""}</b>
            <span class="muted">${i?`/microjobs.html#job-${S(h.slug)}`:`/task/${S(h.slug)}.html`} • ${V(h.reward)}${Array.isArray(h.inputFields)&&h.inputFields.length?` • ${h.inputFields.length} field(s)`:""}</span>
            ${(()=>{const u=g(h.slug);if(!u)return"";const f=Number(u.requiredUsers)||0;return`<div class="mj-statline">
                <span><i class="fa-solid fa-users"></i> Required <b>${f||"∞"}</b></span>
                <span class="ok"><i class="fa-solid fa-check"></i> Approved <b>${Number(u.approvedCount)||0}</b></span>
                <span class="warn"><i class="fa-solid fa-hourglass-half"></i> Pending <b>${Number(u.pending)||0}</b></span>
                <span class="bad"><i class="fa-solid fa-xmark"></i> Rejected <b>${Number(u.rejected)||0}</b></span>
                <span><i class="fa-solid fa-user-plus"></i> বাকি <b>${u.remaining===null||u.remaining===void 0?"∞":u.remaining}</b></span>
                ${u.full||u.closed?'<span class="badge red">সম্পূর্ণ/বন্ধ</span>':""}
                ${u.mode==="single"?'<span class="badge gray">১ user = ১ submit</span>':'<span class="badge gray">মার্কেটপ্লেস</span>'}
                ${i?`<span class="badge ${h.funded==="budget"?"gold":"gray"}">Budget ৳${((Number(h.reward)||0)*(f||0)).toFixed(2)}</span>
                 <span class="badge ${h.funded==="budget"?"green":"gray"}">${h.funded==="budget"?"ফান্ডেড "+V(h.reservedBudget||0):h.enabled===!1?"ড্রাফট — প্রকাশ হলে কাটা হবে":"Owner/Full — ফ্রি"}</span>`:""}
              </div>`})()}
          </div>
          ${i&&h.enabled===!1?`<button class="adm-btn green sm" data-publish="${S(h.slug)}" data-budget="${((Number(h.reward)||0)*(Number(h.requiredUsers)||0)).toFixed(2)}"><i class="fa-solid fa-paper-plane"></i> প্রকাশ</button>`:""}
          <button class="adm-btn ghost sm" data-edit="${S(h.slug)}"><i class="fa-solid fa-pen"></i></button>
          <button class="adm-btn red sm" data-del="${S(h.slug)}" title="Doc মুছে ফেলুন"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="task-form" data-form="${S(h.slug)}" hidden>
          <label>নাম (বাংলা)</label><input class="adm-input" data-f="nameBn" value="${S(h.nameBn||"")}">
          <label>কাজের লিংক (ইউজার এখানে যাবে) — শুধু http/https</label><input class="adm-input" data-f="url" value="${S(h.url||"")}" placeholder="https://...">
          <div class="two-col">
            <div><label>প্রতি জমায় রোয়ার্ড (৳)</label><input type="number" step="0.5" class="adm-input" data-f="reward" value="${Number(h.reward)||0}"></div>
            <div><label>ক্রম</label><input type="number" class="adm-input" data-f="sort" value="${Number(h.sort)||10}"></div>
          </div>
          <div class="two-col">
            <div><label>Required Users (০ = unlimited)</label><input type="number" min="0" max="1000000" class="adm-input" data-f="requiredUsers" value="${Number(h.requiredUsers)||0}">
              <p class="muted" style="font-size:11.5px;margin:4px 0 0">এই সংখ্যক approved user হলে job স্বয়ংক্রিয়ভাবে FULL/CLOSED হবে (পুরোনো marketplace job-এর জন্য ০ রাখুন)</p></div>
            <div><label>জমার ধরন</label>
              <select class="adm-input" data-f="mode">
                ${(()=>{const u=h.mode||((Number(h.requiredUsers)||0)>0?"single":"marketplace");return`<option value="single" ${u==="single"?"selected":""}>MicroJob — এক user একবার</option>
                <option value="marketplace" ${u==="marketplace"?"selected":""}>Marketplace — দিনে একাধিক (account sell)</option>`})()}
              </select></div>
          </div>
          <label>জবের ছবি (কার্ড/পোস্টে)</label>
          <div class="img-pick">
            <input type="hidden" class="adm-input" data-f="image" value="${S(h.image||"")}">
            <input type="file" accept="image/png,image/jpeg,image/webp" data-imgfile="${S(h.slug)}" hidden>
            <button type="button" class="adm-btn ghost sm" data-imgbtn="${S(h.slug)}"><i class="fa-solid fa-image"></i> ছবি আপলোড</button>
            <input class="adm-input" data-imgurl value="${S(/^https?:/.test(String(h.image||""))?h.image:"")}" placeholder="অথবা image URL (https://…)">
            <div class="img-prev" data-imgprev="${S(h.slug)}" ${/^data:image/.test(String(h.image||""))||/^https?:/.test(String(h.image||""))?"":"hidden"}>
              <img src="${S(h.image||"")}" alt="preview"><button type="button" class="adm-btn red sm" data-imgclear="${S(h.slug)}">মুছুন</button>
            </div>
          </div>
          <label>সংক্ষিপ্ত বিবরণ (কার্ডের এক লাইন)</label>
          <input class="adm-input" data-f="shortDesc" value="${S(h.shortDesc||"")}" maxlength="200" placeholder="যেমন: ভিডিওতে like + comment করুন">
          <label>সেলার পাসওয়ার্ড (জমা দেওয়া একাউন্টে বসানো হবে — খালি রাখলে দেখানো হয় না)</label><input class="adm-input" data-f="password" value="${S(h.password||"")}" maxlength="60">
          <label>নিয়মাবলি (প্রজেক্ট পেজে দেখায়)</label><textarea class="adm-input" data-f="description" rows="3" maxlength="300">${S(h.description||"")}</textarea>
          <div class="two-col">
            <div><label>Submit বাটনের লেখা</label><input class="adm-input" data-f="submitLabel" value="${S(h.submitLabel||"")}" placeholder="SUBMIT GMAIL" maxlength="40"></div>
            <div><label>History বাটনের লেখা</label><input class="adm-input" data-f="historyLabel" value="${S(h.historyLabel||"")}" placeholder="View Gmail History" maxlength="40"></div>
          </div>
          <label>দৈনিক লিমিট (০ = আনলিমিটেড — অ্যাকাউন্ট সেলে সাধারণত লাগে না)</label><input type="number" min="0" max="200" class="adm-input" data-f="dailyLimit" value="${Number(h.dailyLimit)||0}">
          ${zh(h,i)}
          <label>Video URL (YouTube link বা mp4) — task page-এ guide video</label><input class="adm-input" data-f="videoUrl" value="${S(h.videoUrl||"")}">
          <div class="two-col">
            <label class="chk"><input type="checkbox" data-f="enabled" ${h.enabled!==!1?"checked":""}> Task ON / Active</label>
            <label class="chk"><input type="checkbox" data-f="locked" ${h.locked?"checked":""}> Locked</label>
          </div>
          <div class="ai-actions">
            <button class="adm-btn gold sm" data-save="${S(h.slug)}"><i class="fa-solid fa-floppy-disk"></i> সেভ</button>
          </div>
        </div>
      </div>`).join("")}</div>`,t.querySelectorAll("[data-ifadd]").forEach(h=>h.addEventListener("click",()=>{var v;const u=h.closest(".if-editor").querySelector("[data-ifrows]");(v=u.querySelector(".if-empty"))==null||v.remove();const f=document.createElement("div");f.innerHTML=Bi({},u.dataset.iftypes==="mj"?Ui:Kn),u.appendChild(f.firstElementChild)})),t.querySelectorAll("[data-ifdel]").forEach(h=>h.addEventListener("click",()=>{h.closest("[data-if-row]").remove();const u=h.closest("[data-ifrows]");u.querySelector("[data-if-row]")||(u.innerHTML='<p class="muted if-empty">কোনো field নেই — task শুধু "link + submit" flow-এ থাকবে।</p>')})),t.querySelectorAll("[data-edit]").forEach(h=>h.addEventListener("click",()=>{const f=h.closest(".task-card").querySelector("[data-form]");f.hidden=!f.hidden})),t.querySelectorAll("[data-del]").forEach(h=>h.addEventListener("click",async()=>{const u=h.dataset.del;if(confirm(`“${u}” মুছে ফেলবেন? user-এর পেজ থেকে এই job-এর card উঠে যাবে (জমা দেওয়া হিস্ট্রি থাকবে)।`)){h.disabled=!0;try{await wh(u),R(`মুছে ফেলা হয়েছে: ${u}`),s()}catch(f){R(f.message,"error"),h.disabled=!1}}})),($=t.querySelector("#seedTasksBtn"))==null||$.addEventListener("click",async h=>{const u=h.currentTarget;u.disabled=!0;try{const f=await Ih();R(`তৈরি হয়েছে ${f.createdCount||0}টা, আগে থেকেই ছিল ${f.skippedCount||0}টা${f.invalid&&f.invalid.length?" · কিছু হয়নি: "+f.invalid.join(", "):""}`),s()}catch(f){R(f.message,"error"),u.disabled=!1}});const _=document.getElementById("mjNewImage"),k=document.getElementById("mjNewImagePrev"),C=h=>{if(_&&(_.value=h||"",k)){const u=document.getElementById("mjNewImageImg");u&&(u.src=h),k.hidden=!h}};(N=document.getElementById("mjNewImageBtn"))==null||N.addEventListener("click",()=>{var h;return(h=document.getElementById("mjNewImageFile"))==null?void 0:h.click()}),(M=document.getElementById("mjNewImageFile"))==null||M.addEventListener("change",async h=>{try{C(await Vr(h.target.files&&h.target.files[0],{maxSide:640,maxBytes:22e4}))}catch(u){R(String(u.message||u),"error")}});const L=(h,u={})=>{const f=document.createElement("div");f.innerHTML=Bi(u,Ui),h.appendChild(f.firstElementChild)},j=document.getElementById("mjBudgetHint"),D=h=>t.querySelector(`[data-nc="${h}"]`),A=()=>{var y,b;if(!j)return;const h=Number((y=D("reward"))==null?void 0:y.value)||0,u=Number((b=D("requiredUsers"))==null?void 0:b.value)||0,f=Math.round(h*u*100)/100;if(!r||!r.needsBalance){j.className="mj-budget ok",j.innerHTML=`<i class="fa-solid fa-unlock-keyhole"></i> ${r&&r.isOwner?"Owner":"Full Access"} — প্রকাশের জন্য ব্যালেন্স লাগে না। <b>মোট বাজেট ${V(f)}</b>`;return}const v=Number(r.balance)>=f;j.className="mj-budget "+(v?"ok":"bad"),j.innerHTML=`<i class="fa-solid fa-${v?"circle-check":"triangle-exclamation"}"></i> Job Poster: বাজেট <b>${V(f)}</b> (রোয়ার্ড ${V(h)} × ${u} জন) — আপনার ব্যালেন্স ${V(r.balance)}${v?"":" — যথেষ্ট নয়, প্রকাশ হবে না"}`};["reward","requiredUsers"].forEach(h=>{var u;return(u=D(h))==null?void 0:u.addEventListener("input",A)}),A(),t.querySelectorAll("[data-publish]").forEach(h=>h.addEventListener("click",async()=>{const u=h.dataset.publish,f=Number(h.dataset.budget)||0;if(confirm(`“${u}” প্রকাশ করবেন?${r&&r.needsBalance?` Job Poster হিসেবে বাজেট ${V(f)} আপনার ব্যালেন্স থেকে কেটে নেওয়া হবে (ব্যালেন্স ${V(r.balance)})।`:""}`)){h.disabled=!0;try{const v=await bh(u);R(`প্রকাশিত: ${u}${v.budget?` — বাজেট ${V(v.budget)} কেটেছে, বাকি ${V(v.balanceAfter||0)}`:""}`),s()}catch(v){R(String(v.message||v),"error"),h.disabled=!1}}})),(F=document.getElementById("mjNewFieldAdd"))==null||F.addEventListener("click",()=>{const h=document.getElementById("mjNewFields");h&&L(h)}),(W=document.getElementById("mjCreateBtn"))==null||W.addEventListener("click",async()=>{var v,y,b,m,H,ue,en,Re,Ce,tt,Et,tn;const h=String(((v=D("nameBn"))==null?void 0:v.value)||"").trim();if(h.length<2){R("Job Title লিখুন","error");return}const u=String(((y=D("steps"))==null?void 0:y.value)||"").split(`
`).map(G=>G.trim()).filter(Boolean).slice(0,20);[...((b=document.getElementById("mjNewFields"))==null?void 0:b.querySelectorAll("[data-if-row]"))||[]].map(G=>{var K;return{label:G.querySelector(".if-label").value.trim(),type:G.querySelector(".if-type").value,placeholder:((K=G.querySelector(".if-ph"))==null?void 0:K.value.trim())||"",required:G.querySelector("[data-ifreq]").checked}}).filter(G=>G.label);const f=document.getElementById("mjCreateBtn");f.disabled=!0;try{const G=[...((m=document.getElementById("mjNewFields"))==null?void 0:m.querySelectorAll("[data-if-row]"))||[]].map(ce=>{var nn;return{label:ce.querySelector(".if-label").value.trim(),type:ce.querySelector(".if-type").value,placeholder:((nn=ce.querySelector(".if-ph"))==null?void 0:nn.value.trim())||"",required:ce.querySelector("[data-ifreq]").checked}}).filter(ce=>ce.label),K=!!((H=D("publish"))!=null&&H.checked),Le=await lh({publish:K,kind:"microjob",inputFields:G.length?G:[{label:"কাজের রিপোর্ট",type:"textarea",required:!0,placeholder:"আপনি কী করেছেন লিখুন"},{label:"প্রমাণের ছবি",type:"image",required:!0,placeholder:"স্ক্রিনশট তুলুন"}],nameBn:h,slug:String(((ue=D("slug"))==null?void 0:ue.value)||"").trim(),reward:Number((en=D("reward"))==null?void 0:en.value)||0,requiredUsers:Math.max(1,Number((Re=D("requiredUsers"))==null?void 0:Re.value)||1),shortDesc:String(((Ce=D("shortDesc"))==null?void 0:Ce.value)||"").trim(),url:String(((tt=D("url"))==null?void 0:tt.value)||"").trim(),videoUrl:String(((Et=D("videoUrl"))==null?void 0:Et.value)||"").trim(),image:_?_.value:"",steps:u,sort:Number((tn=D("sort"))==null?void 0:tn.value)||100,mode:"single"});R(Le.draft?`ড্রাফট সেভ হয়েছে: ${Le.slug||""} — “প্রকাশ” চাপলে ব্যালেন্স থেকে বাজেট কেটে public হবে`:`জব প্রকাশিত: ${Le.slug||""}${Le.budget?` — বাজেট ${V(Le.budget)} কেটেছে, বাকি ${V(Le.balanceAfter||0)}`:""}`),s()}catch(G){R(G.message,"error"),f.disabled=!1}}),t.querySelectorAll("[data-imgbtn]").forEach(h=>h.addEventListener("click",()=>{var f;const u=h.dataset.imgbtn;(f=t.querySelector(`[data-imgfile="${u}"]`))==null||f.click()})),t.querySelectorAll("[data-imgfile]").forEach(h=>h.addEventListener("change",async u=>{const f=h.dataset.imgfile,v=h.closest(".task-card");try{const y=await Vr(u.target.files&&u.target.files[0],{maxSide:640,maxBytes:22e4}),b=v.querySelector('input[type=hidden][data-f="image"]');b&&(b.value=y);const m=v.querySelector("[data-imgurl]");m&&(m.value="");const H=v.querySelector(`[data-imgprev="${f}"]`);H&&(H.querySelector("img").src=y,H.hidden=!1),R("ছবি লাগানো হয়েছে — Save চাপুন")}catch(y){R(String(y.message||y),"error")}})),t.querySelectorAll("[data-imgclear]").forEach(h=>h.addEventListener("click",()=>{const u=h.closest(".task-card"),f=h.dataset.imgclear,v=u.querySelector('input[type=hidden][data-f="image"]');v&&(v.value="");const y=u.querySelector("[data-imgurl]");y&&(y.value="");const b=u.querySelector(`[data-imgprev="${f}"]`);b&&(b.hidden=!0)})),t.querySelectorAll("[data-save]").forEach(h=>h.addEventListener("click",async()=>{var b,m;const u=h.closest(".task-card"),f=H=>u.querySelector(`[data-form] [data-f="${H}"]`),v=f("url").value.trim();if(v&&!/^https?:\/\//i.test(v)){R("Task URL শুধু http/https হতে পারে (javascript:/data: allowed না)","error");return}const y=[...u.querySelectorAll("[data-ifrows] [data-if-row]")].map(H=>{var ue;return{label:H.querySelector(".if-label").value.trim(),type:H.querySelector(".if-type").value,placeholder:((ue=H.querySelector(".if-ph"))==null?void 0:ue.value.trim())||"",required:H.querySelector("[data-ifreq]").checked}}).filter(H=>H.label);h.disabled=!0;try{await Th(h.dataset.save,{nameBn:f("nameBn").value.trim(),url:v,reward:Number(f("reward").value)||0,sort:Number(f("sort").value)||10,password:f("password").value.trim(),description:f("description").value.trim(),submitLabel:f("submitLabel").value.trim(),historyLabel:f("historyLabel").value.trim(),dailyLimit:Math.max(0,Math.min(200,Number(f("dailyLimit").value)||0)),inputFields:y,videoUrl:f("videoUrl").value.trim(),image:(((b=u.querySelector("[data-imgurl]"))==null?void 0:b.value)||"").trim()||((m=f("image"))==null?void 0:m.value)||"",shortDesc:f("shortDesc")?f("shortDesc").value.trim():"",requiredUsers:f("requiredUsers")?Math.max(0,Number(f("requiredUsers").value)||0):0,mode:f("mode")?f("mode").value:"single",enabled:f("enabled").checked,locked:f("locked").checked}),R("সেভ হয়েছে — user website-তে update হয়ে গেছে"),s()}catch(H){R(H.message,"error"),h.disabled=!1}}))}const Gh=[{group:"সাধারণ",fields:[["siteName","সাইটের নাম","text"],["telegramLink","টেলিগ্রাম লিংক","url"],["facebookLink","ফেসবুক লিংক","url"],["youtubeLink","ইউটিউব লিংক","url"],["videoUrl","শেখার ভিডিওর লিংক","url"]]},{group:"টাকা (৳)",fields:[["activationFee","একাউন্ট খোলার ফি (জমা)","number"],["activationBonus","একাউন্ট খোলার বোনাস","number"],["registerBonus","নতুন রেজিস্ট্রেশন বোনাস","number"],["referralBonus","রেফারেল বোনাস","number"],["minWithdraw","সর্বনিম্ন উইথড্র","number"],["giftReward","দৈনিক উপহার বোনাস","number"]]},{group:"পেমেন্ট নম্বর (জমার জন্য)",fields:[["bkashNumber","bKash নম্বর","text"],["nagadNumber","Nagad নম্বর","text"],["rocketNumber","Rocket নম্বর","text"]]},{group:"উপহার",fields:[["giftCode","আজকের উপহার কোড","text"]]},{group:"সাপোর্ট যোগাযোগ (হেল্প পেজে দেখায়)",fields:[["admin1Name","সাপোর্ট ১ — নাম","text"],["admin1Phone","সাপোর্ট ১ — মোবাইল","text"],["admin1Email","সাপোর্ট ১ — ইমেইল","email"],["admin1Link","সাপোর্ট ১ — লিংক","url"],["admin2Name","সাপোর্ট ২ — নাম","text"],["admin2Phone","সাপোর্ট ২ — মোবাইল","text"],["admin2Email","সাপোর্ট ২ — ইমেইল","email"],["admin2Link","সাপোর্ট ২ — লিংক","url"]]}];async function so(t){var s,r;const e=await Sh(),i=e._secretLoaded!==!0;t.innerHTML=`
    <form id="settingsForm">
    ${Gh.map(o=>`
      <div class="adm-card">
        <h4><i class="fa-solid fa-sliders" style="color:#d97706"></i> ${o.group}</h4>
        <div class="set-grid">
          ${o.fields.map(([c,p,g])=>{var T;const w=c==="giftCode"&&i;return`
            <div><label>${p}</label><input type="${g}" step="${g==="number"?"0.5":void 0}" class="adm-input" data-sf="${c}" value="${w?"":S((T=e[c])!=null?T:"")}" ${w?'disabled placeholder="লোড করা যায়নি — API দেখুন"':""}></div>`}).join("")}
        </div>
        ${o.group==="Gift"&&i?'<p class="muted" style="margin-top:8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Gift Code server API থেকে পড়া যায়নি — এই ঘরটা এখন change হবে না (ভুলবশত কোড মুছে যাবে না)।</p>':""}
        ${o.group==="Gift"&&!i?`<p class="muted" style="margin-top:8px">কোড: <b>${S(e.giftCode||"(খালি)")}</b> <button type="button" class="adm-btn ghost sm" id="clearGiftBtn" style="margin-left:8px">মুছুন</button></p>`:""}
      </div>`).join("")}
      <button type="submit" class="adm-btn gold"><i class="fa-solid fa-floppy-disk"></i> Save Settings</button>
      <button type="button" class="adm-btn ghost" id="lbSyncBtn" style="margin-left:8px"><i class="fa-solid fa-trophy"></i> Leaderboard count sync</button>
      <p class="muted" style="font-size:12px;margin-top:6px">Leaderboard (Top 4) existing referral data থেকেই হিসাব করে; এই বাটন চাপলে referral সংখ্যা গুনে user doc-এ cache হয় (বড় list-এ দ্রুত লোড হয়)।</p>
    </form>`,(s=document.getElementById("lbSyncBtn"))==null||s.addEventListener("click",async()=>{const o=document.getElementById("lbSyncBtn");o.disabled=!0;try{const c=await Eh();R(`Leaderboard sync: ${c.updated||0}টা user (${c.failed||0}টা বাদ)`)}catch(c){R(c.message,"error")}o.disabled=!1}),(r=document.getElementById("clearGiftBtn"))==null||r.addEventListener("click",async()=>{if(confirm("Gift code মুছে ফেলবেন? তাহলে কেউই আর gift claim করতে পারবে না।"))try{await kh(),R("Gift code cleared"),so(t)}catch(o){R(o.message,"error")}}),document.getElementById("settingsForm").addEventListener("submit",async o=>{o.preventDefault();const c={};t.querySelectorAll("[data-sf]").forEach(g=>{if(g.disabled)return;const w=g.dataset.sf;c[w]=g.type==="number"?Number(g.value)||0:g.value.trim()});const p=o.target.querySelector("button[type=submit]");p.disabled=!0;try{await Ah(c),R("Settings save হয়েছে")}catch(g){R(g.message,"error"),p.disabled=!1}})}let ct="";async function dt(t){const[e,i]=await Promise.all([Ph(),Oh().catch(()=>[])]),s=await rs(300).catch(()=>[]);t.innerHTML=`
    <div class="adm-card">
      <h4><i class="fa-solid fa-bullhorn" style="color:#d97706"></i> নতুন নোটিশ / সতর্কতা</h4>
      <div class="two-col">
        <div><label>ধরন</label>
          <select class="adm-input" id="ntType"><option value="notice">নোটিশ</option><option value="warning">সতর্কতা</option></select>
        </div>
        <div><label>টার্গেট</label>
          <select class="adm-input" id="ntTarget"><option value="all">সব ইউজার</option><option value="user">শুধু একজন ইউজার</option></select>
        </div>
      </div>
      <div id="ntUserWrap" hidden style="margin-top:8px">
        <label>ইউজার খুঁজুন (নাম বা মোবাইল)</label>
        <input class="adm-input" id="ntUserSearch" placeholder="নাম বা মোবাইল লিখুন...">
        <div id="ntUserResults" class="user-list" style="max-height:150px;overflow:auto"></div>
      </div>
      <input class="adm-input" id="ntTitle" placeholder="শিরোনাম (ঐচ্ছিক)" maxlength="60" style="margin-top:8px">
      <textarea class="adm-input" id="ntBody" rows="3" placeholder="নোটিশ বা সতর্কবার্তা লিখুন..." maxlength="300" style="margin-top:8px"></textarea>
      <div class="two-col" style="margin-top:8px">
        <div><label>মেয়াদ (তারিখের পর দেখাবে না)</label><input type="date" class="adm-input" id="ntExpiry"></div>
        <div style="align-self:flex-end"><button class="adm-btn gold sm" id="ntAdd"><i class="fa-solid fa-plus"></i> পাঠান</button></div>
      </div>
    </div>

    <h4 style="margin:14px 0 8px"><i class="fa-solid fa-bullhorn" style="color:#d97706"></i> সবার নোটিশ</h4>
    ${e.map(w=>`
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info"><b>${w.type==="warning"?"⚠️ ":""}${S(w.title||"—")}</b><span class="muted">${w.enabled?"চালু":"বন্ধ"} • ক্রম ${w.sort||0}${w.expiresAt?" • মেয়াদ "+le(w.expiresAt):""}</span></div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tgl="${w.id}"><i class="fa-solid ${w.enabled?"fa-eye-slash":"fa-eye"}"></i></button>
            <button class="adm-btn red sm" data-del="${w.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${S(w.body||"")}</p>
      </div>`).join("")}
    ${e.length?"":'<p class="muted center-note">কোনো all-user notice নেই।</p>'}

    <h4 style="margin:14px 0 8px"><i class="fa-solid fa-triangle-exclamation" style="color:#dc2626"></i> Private Warnings (user-specific)</h4>
    ${i.map(w=>`
      <div class="adm-card">
        <div class="task-row">
          <div class="task-info">
            <b>${w.type==="warning"?"⚠️ ":""}${S(w.title||"—")}</b>
            <span class="muted">→ ${S(w.userName||"—")} (${S(w.userMobile||w.uid)}) • ${w.enabled?"ACTIVE":"OFF"}${w.expiresAt?" • expire "+w.expiresAt:""}</span>
          </div>
          <div class="ai-actions" style="flex-wrap:wrap">
            <button class="adm-btn ghost sm" data-tn-tgl="${w.uid}::${w.id}">${w.enabled?"লুকান":"দেখান"}</button>
            <button class="adm-btn red sm" data-tn-del="${w.uid}::${w.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p class="muted nt-body">${S(w.body||"")}</p>
      </div>`).join("")}
    ${i.length?"":'<p class="muted center-note">কোনো private warning নেই।</p>'}`;const r=document.getElementById("ntTarget"),o=document.getElementById("ntUserWrap"),c=document.getElementById("ntUserSearch"),p=document.getElementById("ntUserResults");r.addEventListener("change",()=>{o.hidden=r.value!=="user"});const g=(w="")=>{const T=w.trim().toLowerCase(),_=T?s.filter(k=>(k.name||"").toLowerCase().includes(T)||String(k.mobile||"").includes(T)):s;p.innerHTML=_.slice(0,30).map(k=>`
      <div class="user-row ${ct===k.uid?"on":""}" data-ntu="${k.uid}">
        <div class="ur-avatar">${S((k.name||"?").trim()[0].toUpperCase())}</div>
        <div class="ur-info"><b>${S(k.name||"—")}</b><span class="muted">${S(k.mobile||"")}</span></div>
        <div class="ur-right">${ct===k.uid?'<span class="badge green">SELECTED</span>':""}</div>
      </div>`).join("")||'<p class="muted">কোনো user পাওয়া যায়নি</p>',p.querySelectorAll("[data-ntu]").forEach(k=>k.addEventListener("click",()=>{ct=k.dataset.ntu,g(c.value)}))};c.addEventListener("input",()=>g(c.value)),document.getElementById("ntAdd").addEventListener("click",async()=>{const w=document.getElementById("ntTitle").value.trim(),T=document.getElementById("ntBody").value.trim(),_=document.getElementById("ntType").value,k=r.value,C=document.getElementById("ntExpiry").value;if(!w&&!T){R("Title বা message লিখুন","error");return}if(k==="user"&&!ct){R("একটা user select করুন","error");return}const L=C?new Date(C+"T23:59:59"):null;try{k==="user"?await Nh(ct,{title:w,body:T,type:_,expiresAt:L}):await Rh({title:w,body:T,type:_,expiresAt:L}),R(k==="user"?"Private warning পাঠানো হয়েছে (শুধু সেই user দেখবে)":"Notice add হয়েছে (সব user দেখবে)"),ct="",dt(t)}catch(j){R(j.message,"error")}}),t.querySelectorAll("[data-tgl]").forEach(w=>w.addEventListener("click",async()=>{const T=e.find(_=>_.id===w.dataset.tgl);try{await Ch(T.id,{title:T.title,body:T.body,enabled:!T.enabled,sort:T.sort}),R("Notice toggle"),dt(t)}catch(_){R(_.message,"error")}})),t.querySelectorAll("[data-del]").forEach(w=>w.addEventListener("click",async()=>{if(confirm("Notice মুছে ফেলবেন?"))try{await Lh(w.dataset.del),R("Notice delete হয়েছে"),dt(t)}catch(T){R(T.message,"error")}})),t.querySelectorAll("[data-tn-tgl]").forEach(w=>w.addEventListener("click",async()=>{const[T,_]=w.dataset.tnTgl.split("::"),k=i.find(C=>C.uid===T&&C.id===_);try{await Xa(T,_,{enabled:!k.enabled}),R("Warning toggle"),dt(t)}catch(C){R(C.message,"error")}})),t.querySelectorAll("[data-tn-del]").forEach(w=>w.addEventListener("click",async()=>{if(!confirm("Warning মুছে ফেলবেন?"))return;const[T,_]=w.dataset.tnDel.split("::");try{await Ya(T,_),R("Warning delete হয়েছে"),dt(t)}catch(k){R(k.message,"error")}}))}
