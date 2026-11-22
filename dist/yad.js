function t(t,e,i,s){var a,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(a=t[r])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,m=u.trustedTypes,f=m?m.emptyScript:"",_=u.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=a.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const o=this.constructor;if(!1===s&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??w)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,_?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,S=$.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+C,P=`<${M}>`,z=document,T=()=>z.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,R="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,H=/>/g,L=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,j=/"/g,N=/^(?:script|style|textarea|title)$/i,F=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=F(1),B=F(2),V=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),Y=new WeakMap,G=z.createTreeWalker(z,129);function J(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let a,o=2===e?"<svg>":3===e?"<math>":"",n=D;for(let e=0;e<i;e++){const i=t[e];let r,c,d=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===D?"!--"===c[1]?n=U:void 0!==c[1]?n=H:void 0!==c[2]?(N.test(c[2])&&(a=RegExp("</"+c[2],"g")),n=L):void 0!==c[3]&&(n=L):n===L?">"===c[0]?(n=a??D,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,r=c[1],n=void 0===c[3]?L:'"'===c[3]?j:q):n===j||n===q?n=L:n===U||n===H?n=D:(n=L,a=void 0);const h=n===L&&t[e+1].startsWith("/>")?" ":"";o+=n===D?i+P:d>=0?(s.push(r),i.slice(0,d)+E+i.slice(d)+C+h):i+C+(-2===d?e:h)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0;const n=t.length-1,r=this.parts,[c,d]=Z(t,e);if(this.el=Q.createElement(c,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&r.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=d[o++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);r.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?at:"@"===n[1]?ot:it}),s.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:a}),s.removeAttribute(t));if(N.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),G.nextNode(),r.push({type:2,index:++a});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===M)r.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)r.push({type:7,index:a}),t+=C.length-1}a++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===V)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);G.currentNode=s;let a=G.nextNode(),o=0,n=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new et(a,a.nextSibling,this,t):1===r.type?e=new r.ctor(a,r.name,r.strings,this,t):6===r.type&&(e=new nt(a,this,t)),this._$AV.push(e),r=i[++n]}o!==r?.index&&(a=G.nextNode(),o++)}return G.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new Q(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new et(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,s){const a=this.strings;let o=!1;if(void 0===a)t=X(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==V,o&&(this._$AH=t);else{const s=t;let n,r;for(t=a[0],n=0;n<a.length-1;n++)r=X(this,s[i+n],e,n),r===V&&(r=this._$AH[n]),o||=!O(r)||r!==this._$AH[n],r===K?t=K:t!==K&&(t+=(r??"")+a[n+1]),this._$AH[n]=r}o&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class ot extends it{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??K)===V)return;const i=this._$AH,s=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=$.litHtmlPolyfillSupport;rt?.(Q,et),($.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;let dt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new et(e.insertBefore(T(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};dt._$litElement$=!0,dt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:dt});const lt=ct.litElementPolyfillSupport;lt?.({LitElement:dt}),(ct.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:w},gt=(t=pt,e,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?gt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function mt(t){return ut({...t,state:!0,attribute:!1})}const ft=1,_t=t=>(...e)=>({_$litDirective$:t,values:e});let vt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const yt=_t(class extends vt{constructor(t){if(super(t),t.type!==ft||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return V}}),wt={},bt=_t(class extends vt{constructor(){super(...arguments),this.key=K}render(t,e){return this.key=t,e}update(t,[e,i]){return e!==this.key&&(((t,e=wt)=>{t._$AH=e})(t),this.key=e),i}}),xt="important",$t=" !"+xt,kt=_t(class extends vt{constructor(t){if(super(t),t.type!==ft||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith($t);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?xt:""):i[t]=s}}return V}}),St=Symbol.for(""),At=t=>{if(t?.r===St)return t?._$litStatic$},Et=new Map,Ct=(t=>(e,...i)=>{const s=i.length;let a,o;const n=[],r=[];let c,d=0,l=!1;for(;d<s;){for(c=e[d];d<s&&void 0!==(o=i[d],a=At(o));)c+=a+e[++d],l=!0;d!==s&&r.push(o),n.push(c),d++}if(d===s&&n.push(e[s]),l){const t=n.join("$$lit$$");void 0===(e=Et.get(t))&&(n.raw=n,Et.set(t,e=n)),i=r}return t(e,...i)})(W),Mt={media:{accept:["image/*"],image_upload:!0}},Pt=async(t,e)=>{const i=await t.callWS({type:"media_source/resolve_media",media_content_id:e});if(!i.url||!i.mime_type?.startsWith("image/"))throw new Error("Select an image for the background");return i.url},zt={hearth:{label:"Hearth",description:"Warm cream & terracotta",light:{background:"#f3eee7",surface:"#fffcf7",text:"#2f2a25",muted:"#8c8278",accent:"#d4774f",success:"#6f9273",info:"#5f8fb4",warm:"#e8a93a"},dark:{background:"#191714",surface:"#27231f",text:"#f3ece3",muted:"#a1978c",accent:"#eb956e",success:"#95b598",info:"#86b2d4",warm:"#f0b955"}},scandi:{label:"Scandi oak",description:"Pale oak, linen & charcoal",light:{background:"#f5f2ec",surface:"#fffefb",text:"#2b2926",muted:"#8a847b",accent:"#b0834f",success:"#7a9a7e",info:"#6f93ad",warm:"#dca44a"},dark:{background:"#1a1816",surface:"#252220",text:"#f1ece4",muted:"#a49c91",accent:"#d4a671",success:"#9dbb9f",info:"#93b4cc",warm:"#ecbb63"}},nordic:{label:"Nordic",description:"Cool greys & fjord blue",light:{background:"#eef1f4",surface:"#ffffff",text:"#1f2933",muted:"#7b8794",accent:"#4c7a9f",success:"#5f9488",info:"#5b8fc9",warm:"#e0a13a"},dark:{background:"#14181d",surface:"#20262e",text:"#e8edf2",muted:"#95a1ae",accent:"#7fb0d6",success:"#86c0b2",info:"#8ab8e6",warm:"#f0b955"}},cottage:{label:"Cottage garden",description:"Sage greens & soft stone",light:{background:"#eef1ea",surface:"#fbfcf8",text:"#26302a",muted:"#7d8a80",accent:"#6b8f5e",success:"#4f8a7a",info:"#5e8db0",warm:"#d99a3a"},dark:{background:"#161a16",surface:"#232923",text:"#e9eee6",muted:"#9aa597",accent:"#9cc08e",success:"#86c2b0",info:"#8fb6d4",warm:"#e9b65e"}},coastal:{label:"Coastal",description:"Sand, sea glass & teal",light:{background:"#f2f0ea",surface:"#fffdf8",text:"#1e3240",muted:"#7a8a92",accent:"#2f7f8c",success:"#6c9a7c",info:"#4f8fbf",warm:"#e3a24b"},dark:{background:"#0f1a20",surface:"#182a33",text:"#e6f0f2",muted:"#8ea6ae",accent:"#5fb7c2",success:"#8cc2a0",info:"#7fb6de",warm:"#f0b765"}},lavender:{label:"Lavender",description:"Soft lilac & blush",light:{background:"#f4f0f5",surface:"#fffcff",text:"#2e2633",muted:"#8a7f90",accent:"#8a6bb0",success:"#6f9a86",info:"#6a8fc7",warm:"#e0a24a"},dark:{background:"#18151c",surface:"#26202d",text:"#efe9f3",muted:"#a59cad",accent:"#b79ae0",success:"#93c2ab",info:"#95b4e4",warm:"#efba63"}},rose:{label:"Rosewood",description:"Dusty pink & warm plum",light:{background:"#f6efee",surface:"#fffbfa",text:"#33262a",muted:"#907d81",accent:"#b9616f",success:"#6f9a83",info:"#6a8db6",warm:"#e2a04c"},dark:{background:"#1b1415",surface:"#2a1f21",text:"#f4e9ea",muted:"#ab9a9d",accent:"#e28e9a",success:"#96c2a8",info:"#93b2d8",warm:"#efb866"}},urban:{label:"Urban loft",description:"Concrete grey & rust",light:{background:"#f0f0ee",surface:"#ffffff",text:"#1c1c1c",muted:"#7c7c78",accent:"#c2552d",success:"#5f8f6f",info:"#4f7fae",warm:"#d99a2b"},dark:{background:"#121212",surface:"#1f1f1f",text:"#f0f0ee",muted:"#9a9a96",accent:"#e8794f",success:"#86b996",info:"#7ea9d6",warm:"#ebb04c"}},indigo:{label:"Midnight indigo",description:"Ink blue & electric violet",light:{background:"#eef0f7",surface:"#ffffff",text:"#1d2040",muted:"#7c80a0",accent:"#5161d6",success:"#4f9a8a",info:"#4e8fd0",warm:"#e19d3c"},dark:{background:"#0e1020",surface:"#181b33",text:"#e8eaff",muted:"#9599c0",accent:"#8592ff",success:"#7fc6b6",info:"#86b7f0",warm:"#f0b95a"}}},Tt=(t,e,i)=>`color-mix(in srgb, ${t} ${i}%, ${e})`,Ot=(t,e)=>`color-mix(in srgb, ${t} ${e}%, transparent)`,It=(t,e)=>{const{background:i,surface:s,text:a,accent:o}=t,n=t.success??(e?"#95b598":"#6f9273"),r=t.info??(e?"#86b2d4":"#5f8fb4"),c=t.warm??(e?"#f0b955":"#e8a93a");return{"--h-bg":i,"--h-bg-2":Tt(i,e?"#ffffff":a,e?94:95),"--h-surface":Ot(s,92),"--h-surface-2":Tt(s,a,e?90:94),"--h-border":Ot(a,e?6:7),"--h-text":a,"--h-muted":t.muted??Tt(a,s,55),"--h-accent":o,"--h-accent-soft":Ot(o,e?16:14),"--h-on-accent":e?i:"#ffffff","--h-sage":n,"--h-sage-soft":Ot(n,16),"--h-sky":r,"--h-amber":c,"--h-amber-soft":Ot(c,18),"--h-shadow":e?"0 1px 2px rgba(0, 0, 0, 0.3), 0 12px 32px -14px rgba(0, 0, 0, 0.6)":`0 1px 2px ${Ot(a,5)}, 0 10px 30px -12px ${Ot(a,14)}`}},Rt=(t,e,i)=>{const s=e?"dark":"light";if("custom"===t){const t=zt.hearth[s],e=Object.fromEntries(Object.entries(i?.[s]??{}).filter(([,t])=>!!t)),a=e.text||e.surface?void 0:t.muted;return{...t,muted:a,...e}}return(zt[t??"hearth"]??zt.hearth)[s]},Dt={"720p":{label:"HD 720p (1280 × 720)",width:1280,height:720},"1080p":{label:"Full HD 1080p (1920 × 1080)",width:1920,height:1080},"1440p":{label:"QHD 1440p (2560 × 1440)",width:2560,height:1440},"4k":{label:"4K UHD (3840 × 2160)",width:3840,height:2160},wsvga:{label:'7" tablet (1024 × 600)',width:1024,height:600},wxga:{label:"Tablet 16:10 (1280 × 800)",width:1280,height:800},wuxga:{label:"Tablet 16:10 FHD (1920 × 1200)",width:1920,height:1200},ipad:{label:"iPad 4:3 (2048 × 1536)",width:2048,height:1536}},Ut=n`
  .yad {
    --h-radius: 26px;
    --h-radius-sm: 16px;
    --h-font: var(--yad-font, var(--hearth-font, "Nunito", "Quicksand", "Segoe UI Variable", var(--ha-font-family-body, Roboto), system-ui, sans-serif));
  }
  .yad.ha {
    --h-bg: var(--primary-background-color);
    --h-bg-2: var(--secondary-background-color);
    --h-surface: var(--ha-card-background, var(--card-background-color));
    --h-surface-2: var(--secondary-background-color);
    --h-border: var(--divider-color);
    --h-text: var(--primary-text-color);
    --h-muted: var(--secondary-text-color);
    --h-accent: var(--primary-color);
    --h-accent-soft: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
    --h-sage: var(--success-color, #43a047);
    --h-sage-soft: rgba(var(--rgb-success-color, 67, 160, 71), 0.15);
    --h-sky: var(--info-color, #039be5);
    --h-amber: var(--state-light-active-color, var(--warning-color, #ffa600));
    --h-amber-soft: rgba(var(--rgb-warning-color, 255, 166, 0), 0.18);
    --h-shadow: var(--ha-card-box-shadow, none);
  }
`,Ht=n`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    color: var(--h-text);
    font-family: var(--h-font);
    box-sizing: border-box;
    container-type: size;
  }
  * {
    box-sizing: border-box;
  }
  .head {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: var(--h-muted);
    margin-bottom: 10px;
    flex: none;
    white-space: nowrap;
    overflow: hidden;
  }
  .head ha-icon,
  .head ha-state-icon {
    --mdc-icon-size: 20px;
    color: var(--h-accent);
  }
  .head .spacer {
    flex: 1;
  }
  .muted {
    color: var(--h-muted);
  }
  .num {
    font-variant-numeric: tabular-nums;
  }
  .empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: var(--h-muted);
    text-align: center;
    font-size: 0.95rem;
  }
  .empty ha-icon {
    --mdc-icon-size: 36px;
    opacity: 0.6;
  }
  button.round {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--h-surface-2);
    color: var(--h-text);
    cursor: pointer;
    transition: transform 0.15s ease, background 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }
  button.round:active {
    transform: scale(0.92);
  }
  button.round.primary {
    background: var(--h-accent);
    color: var(--h-on-accent, #fff);
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    background: var(--h-surface-2);
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .chip ha-icon {
    --mdc-icon-size: 16px;
  }
  .scroll {
    overflow-y: auto;
    scrollbar-width: none;
    min-height: 0;
  }
  .scroll::-webkit-scrollbar {
    display: none;
  }
  :host([display-only]) .control {
    display: none !important;
  }
  :host([auto-height]) {
    height: auto;
    max-height: var(--auto-content-max, 556px);
    container-type: inline-size;
  }
  :host([auto-height]) > :not(.scroll) {
    flex-shrink: 0;
  }
  :host([auto-height]) .scroll {
    flex: 0 1 auto;
  }
  :host([auto-height]) .empty {
    min-height: 64px;
  }
`,Lt=t=>(t??[]).map(t=>"string"==typeof t?{entity:t}:t).filter(t=>!!t&&"string"==typeof t.entity&&t.entity.length>0),qt=(t,e,i)=>{t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))},jt=(t,e)=>qt(t,"hass-more-info",{entityId:e}),Nt=t=>t.split(".")[0],Ft=(t,e,i="")=>e||t?.attributes.friendly_name||t?.entity_id||i,Wt=t=>!t||"unavailable"===t.state||"unknown"===t.state,Bt=t=>{if(!t||""===t.state||null===t.state)return;const e=Number(t.state);return Number.isFinite(e)?e:void 0},Vt=t=>t?.locale?.language||t?.language||navigator.language,Kt=(t,e)=>{if(!e)return"—";if(t?.formatEntityState)try{return t.formatEntityState(e)}catch{}const i=e.attributes.unit_of_measurement,s=Bt(e),a=void 0!==s?Yt(t,s):Gt(e.state.replace(/_/g," "));return i?`${a} ${i}`:a},Yt=(t,e,i=1)=>new Intl.NumberFormat(Vt(t),{maximumFractionDigits:i}).format(e),Gt=t=>t?t.charAt(0).toUpperCase()+t.slice(1):t,Jt=(t,e)=>{if("12"===e)return!0;if("24"===e)return!1;const i=t?.locale?.time_format;if("12"===i)return!0;if("24"===i)return!1;const s="system"===i?void 0:Vt(t);return!0===new Intl.DateTimeFormat(s,{hour:"numeric"}).resolvedOptions().hour12},Zt=(t,e,i)=>new Intl.DateTimeFormat(Vt(t),{hour:"numeric",minute:"2-digit",hour12:Jt(t,i)}).format(e),Qt=t=>new Date(t.getFullYear(),t.getMonth(),t.getDate()),Xt=(t,e)=>{const i=new Date(t);return i.setDate(i.getDate()+e),i},te=t=>{if(/^\d{4}-\d{2}-\d{2}$/.test(t)){const[e,i,s]=t.split("-").map(Number);return new Date(e,i-1,s)}return new Date(t)};class ee extends dt{constructor(){super(...arguments),this.displayOnly=!1,this.autoHeight=!1}shouldUpdate(t){if(1!==t.size||!t.has("hass"))return!0;const e=t.get("hass");return!e||!this.hass||(e.locale!==this.hass.locale||e.themes!==this.hass.themes||this.watchedEntities().some(t=>e.states[t]!==this.hass.states[t]))}callService(t,e,i){!this.displayOnly&&this.hass&&this.hass.callService(t,e,i)}}t([ut({attribute:!1})],ee.prototype,"hass",void 0),t([ut({attribute:!1})],ee.prototype,"config",void 0),t([ut({type:Boolean,reflect:!0,attribute:"display-only"})],ee.prototype,"displayOnly",void 0),t([ut({type:Boolean,reflect:!0,attribute:"auto-height"})],ee.prototype,"autoHeight",void 0);let ie=class extends ee{constructor(){super(...arguments),this._now=new Date,this._box={w:0,h:0},this._observer=new ResizeObserver(t=>{const e=t[0]?.contentRect;if(!e)return;const i=Math.round(e.width),s=Math.round(e.height);i===this._box.w&&s===this._box.h||(this._box={w:i,h:s})})}watchedEntities(){return Lt(this.config?.entities).map(t=>t.entity)}connectedCallback(){super.connectedCallback(),this._schedule()}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer),this._observer.disconnect(),this._observed=void 0}updated(t){const e=this.renderRoot.querySelector(".people-area")??void 0;e!==this._observed&&(this._observer.disconnect(),this._observed=e,e&&this._observer.observe(e))}_schedule(){const t=new Date;this._now=t;const e=this.config?.show_seconds?1e3-t.getMilliseconds():6e4-1e3*t.getSeconds()-t.getMilliseconds();this._timer=window.setTimeout(()=>this._schedule(),e+20)}render(){const t=this.config,e="auto"===t.time_format?void 0:t.time_format,i=Jt(this.hass,e);let s=Zt(this.hass,this._now,e),a="";if(i){const t=s.match(/^(.*?)\s*([ap]\.?\s?m\.?)$/i);t&&(s=t[1],a=t[2])}const o=String(this._now.getSeconds()).padStart(2,"0"),n=new Intl.DateTimeFormat(Vt(this.hass),{weekday:"long",day:"numeric",month:"long"}).format(this._now),r=!1===t.greet_by_name?void 0:t.name||this.hass?.user?.name?.split(" ")[0],c=Lt(t.entities),d=!1!==t.show_clock;return W`
      <div class="wrap ${"right"===t.clock_position?"clock-right":""}">
        ${d?W`<div class="clock">
              ${!1!==t.greeting?W`<div class="greeting">${l=this._now.getHours(),l<5?"Good night":l<12?"Good morning":l<18?"Good afternoon":"Good evening"}${r?W`, <span>${r}</span>`:""}</div>`:""}
              <div class="time num">
                ${s}${t.show_seconds?W`<span class="sec">${o}</span>`:""}${a?W`<span class="ampm">${a}</span>`:""}
              </div>
              ${!1!==t.show_date?W`<div class="date">${n}</div>`:""}
            </div>`:K}
        ${c.length?this._renderPeople(c,d):K}
      </div>
    `;var l}_renderPeople(t,e){const i=!1!==this.config.show_state,s=this.autoHeight?1/0:this._box.h,a=this._box.w>0&&s>0?((t,e,i,s)=>{let a={cols:t,size:28},o=-1;for(let n=1;n<=t;n++){const r=Math.ceil(t/n),c=(e-12*(n-1))/n,d=Number.isFinite(i)?(i-12*(r-1))/r:1/0,l=Math.min(.9*c,d/s,140);l>o+.5&&(o=l,a={cols:n,size:Math.max(28,l)})}return a})(t.length,this._box.w,s,i?1.6:1.4):{cols:t.length,size:48};return W`<div class="people-area ${e?"beside":""}">
      ${this.config.title?W`<div class="head"><ha-icon icon="mdi:home-account"></ha-icon>${this.config.title}</div>`:K}
      <div class="people-box">
        <div class="people" style="--size:${a.size.toFixed(1)}px;--pcols:${a.cols}">
          ${t.map(t=>{const e=this.hass?.states[t.entity],s=Ft(e,t.name,t.entity),a="home"===e?.state,o=a?"Home":"not_home"===e?.state?"Away":e?Gt(this.hass?.formatEntityState?.(e)??e.state):"Unknown",n=e?.attributes.entity_picture;return W`<div class="person ${a?"home":"away"}" @click=${()=>!this.displayOnly&&jt(this,t.entity)}>
              <div class="avatar">
                ${n?W`<img src=${n} alt="" />`:W`<span>${(t=>t.split(/\s+/).slice(0,2).map(t=>t.charAt(0).toUpperCase()).join(""))(s)}</span>`}
                <span class="dot"></span>
              </div>
              <div class="name">${s.split(" ")[0]}</div>
              ${i?W`<div class="state">${o}</div>`:K}
            </div>`})}
        </div>
      </div>
    </div>`}};ie.styles=[Ht,n`
      .wrap {
        flex: 1;
        display: flex;
        gap: 16px;
        min-height: 0;
        min-width: 0;
      }
      .wrap.clock-right { flex-direction: row-reverse; }
      .people-area {
        flex: 1 1 0;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .people-area.beside { flex: 2 1 0; }
      .people-box {
        flex: 1;
        min-height: 0;
        position: relative;
      }
      .people {
        position: absolute;
        inset: 0;
        display: grid;
        grid-template-columns: repeat(var(--pcols), minmax(0, 1fr));
        grid-auto-rows: 1fr;
        gap: ${12}px;
        place-items: center;
      }
      :host([auto-height]) .people { position: static; }
      .person {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(var(--size) * 0.05);
        cursor: pointer;
        min-width: 0;
        max-width: 100%;
      }
      .avatar {
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        position: relative;
        display: grid;
        place-items: center;
        background: var(--h-accent-soft);
        color: var(--h-accent);
        font-weight: 800;
        font-size: calc(var(--size) * 0.36);
      }
      .avatar img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
      .away .avatar img,
      .away .avatar span:first-child {
        filter: grayscale(0.8);
        opacity: 0.6;
      }
      .dot {
        position: absolute;
        right: 2%;
        bottom: 2%;
        width: 26%;
        height: 26%;
        border-radius: 50%;
        background: var(--h-muted);
        border: max(2px, calc(var(--size) * 0.04)) solid var(--h-surface);
      }
      .home .dot { background: var(--h-sage); }
      .name {
        font-weight: 800;
        font-size: max(11px, calc(var(--size) * 0.2));
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .state {
        font-size: max(10px, calc(var(--size) * 0.16));
        font-weight: 700;
        color: var(--h-muted);
      }
      .home .state { color: var(--h-sage); }
      .clock {
        flex: 3 1 0;
        min-width: 0;
        container-type: inline-size;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.4cqh;
        min-height: 0;
      }
      .greeting {
        font-size: clamp(1rem, 14cqh, 1.8rem);
        font-weight: 600;
        color: var(--h-muted);
      }
      .greeting span {
        color: var(--h-accent);
      }
      .time {
        font-size: clamp(2.5rem, min(58cqh, 26cqw), 10rem);
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.03em;
      }
      .sec,
      .ampm {
        font-size: 0.32em;
        font-weight: 500;
        color: var(--h-muted);
        margin-left: 0.25em;
        letter-spacing: 0;
      }
      .date {
        font-size: clamp(1rem, 14cqh, 2rem);
        font-weight: 600;
      }
      :host([auto-height]) .clock { gap: 6px; }
      :host([auto-height]) .greeting,
      :host([auto-height]) .date { font-size: clamp(1rem, 4cqw, 1.4rem); }
      :host([auto-height]) .time { font-size: clamp(2.5rem, 20cqw, 6rem); }
    `],t([mt()],ie.prototype,"_now",void 0),t([mt()],ie.prototype,"_box",void 0),ie=t([ht("yad-widget-clock")],ie);const se={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},ae={"clear-night":"Clear night",partlycloudy:"Partly cloudy","lightning-rainy":"Thunderstorms","snowy-rainy":"Sleet","windy-variant":"Windy",exceptional:"Exceptional"},oe=(t,e=!1)=>!e||"sunny"!==t&&"clear-night"!==t?e&&"partlycloudy"===t?"mdi:weather-night-partly-cloudy":se[t??""]??"mdi:weather-cloudy":"mdi:weather-night";let ne=class extends ee{watchedEntities(){return[this.config.entity]}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe()}connectedCallback(){super.connectedCallback(),this.hass&&this._subscribe()}updated(t){(t.has("hass")||t.has("config"))&&this._subscribe()}_unsubscribe(){this._unsub?.then(t=>t()).catch(()=>{}),this._unsub=void 0,this._subscribedKey=void 0}_subscribe(){if(!this.hass||!this.config?.entity||!this.isConnected)return;const t=this.config.forecast_type??"daily",e=`${this.config.entity}|${t}`;this._subscribedKey!==e&&(this._unsubscribe(),this._subscribedKey=e,this._unsub=this.hass.connection.subscribeMessage(t=>this._forecast=t.forecast,{type:"weather/subscribe_forecast",forecast_type:t,entity_id:this.config.entity}),this._unsub.catch(()=>{this._forecast=this.hass?.states[this.config.entity]?.attributes.forecast}))}_label(t){const e=new Date(t.datetime),i=this.config.forecast_type??"daily";if("hourly"===i)return new Intl.DateTimeFormat(Vt(this.hass),{hour:"numeric"}).format(e);const s=new Intl.DateTimeFormat(Vt(this.hass),{weekday:"short"}).format(e);return"twice_daily"===i?`${s}${!1===t.is_daytime?" ☾":""}`:s}render(){const t=this.hass?.states[this.config.entity];if(!t)return W`<div class="empty"><ha-icon icon="mdi:weather-cloudy-alert"></ha-icon>Weather entity not found<br /><small>${this.config.entity}</small></div>`;const e=t.attributes,i=e.temperature_unit??"°",s=i.startsWith("°")?"°":` ${i}`,a="clear-night"===t.state,o=(this._forecast??[]).slice(0,this.config.forecast_count??5),n="hourly"!==this.config.forecast_type&&this._forecast?.length?this._forecast[0]:void 0,r=Kt(this.hass,t),c=Wt(t)?"Unavailable":r===t.state||r===Gt(t.state)?ae[t.state]??Gt(t.state.replace(/-/g," ")):r;return W`
      <div class="now tone-${(t=>"sunny"===t?"sun":"clear-night"===t?"night":/rain|pour|hail|lightning/.test(t??"")?"rain":"cloud")(t.state)}" @click=${()=>!this.displayOnly&&jt(this,this.config.entity)}>
        <div class="icon-wrap"><ha-icon icon=${oe(t.state,a)}></ha-icon></div>
        <div class="main">
          <div class="temp num">${void 0!==e.temperature?Yt(this.hass,e.temperature,0):"–"}<span>${s}</span></div>
          <div class="cond">${Gt(c)}</div>
          ${void 0!==n?.temperature?W`<div class="hilo muted num">
                ↑ ${Yt(this.hass,n.temperature,0)}${s}
                ${void 0!==n.templow?W` · ↓ ${Yt(this.hass,n.templow,0)}${s}`:K}
              </div>`:K}
        </div>
        ${!1!==this.config.show_details?W`<div class="details">
              ${void 0!==e.humidity?W`<span class="chip"><ha-icon icon="mdi:water-percent"></ha-icon>${Yt(this.hass,e.humidity,0)}%</span>`:K}
              ${void 0!==e.wind_speed?W`<span class="chip"
                    ><ha-icon icon="mdi:weather-windy"></ha-icon>${Yt(this.hass,e.wind_speed,0)} ${e.wind_speed_unit??""}</span
                  >`:K}
            </div>`:K}
      </div>
      ${o.length?W`<div class="forecast">
            ${o.map(t=>W`<div class="day">
                <div class="label">${this._label(t)}</div>
                <ha-icon icon=${oe(t.condition,!1===t.is_daytime)}></ha-icon>
                <div class="t num">${void 0!==t.temperature?Yt(this.hass,t.temperature,0)+"°":""}</div>
                ${void 0!==t.templow?W`<div class="tl num">${Yt(this.hass,t.templow,0)}°</div>`:K}
                ${t.precipitation_probability?W`<div class="rain num">${t.precipitation_probability}%</div>`:K}
              </div>`)}
          </div>`:K}
    `}};ne.styles=[Ht,n`
      .now {
        display: flex;
        align-items: center;
        gap: clamp(12px, 4cqw, 28px);
        flex: 1;
        min-height: 0;
        overflow: hidden;
        flex-wrap: wrap;
        align-content: center;
        cursor: pointer;
      }
      .icon-wrap {
        width: clamp(64px, 30cqmin, 140px);
        height: clamp(64px, 30cqmin, 140px);
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--h-amber-soft);
        color: var(--h-amber);
        flex: none;
      }
      .tone-rain .icon-wrap,
      .tone-cloud .icon-wrap {
        background: color-mix(in srgb, var(--h-sky) 16%, transparent);
        color: var(--h-sky);
      }
      .tone-night .icon-wrap {
        background: color-mix(in srgb, var(--h-sky) 14%, transparent);
        color: var(--h-text);
      }
      .icon-wrap ha-icon {
        --mdc-icon-size: clamp(36px, 17cqmin, 84px);
      }
      .main {
        flex: 1;
        min-width: 120px;
      }
      .temp {
        font-size: clamp(2.5rem, 22cqmin, 5.5rem);
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.03em;
      }
      .temp span {
        font-size: 0.5em;
        vertical-align: top;
        color: var(--h-muted);
      }
      .cond {
        font-size: clamp(1rem, 6cqmin, 1.5rem);
        font-weight: 700;
        margin-top: 4px;
      }
      .hilo {
        font-size: 0.95rem;
        margin-top: 2px;
        font-weight: 600;
      }
      .details {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-end;
      }
      .forecast {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        gap: 6px;
        padding-top: 14px;
        margin-top: 10px;
        border-top: 1px solid var(--h-border);
        flex: none;
      }
      .day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 2px;
        border-radius: var(--h-radius-sm);
      }
      .day:first-child {
        background: var(--h-surface-2);
      }
      .day ha-icon {
        --mdc-icon-size: 26px;
        color: var(--h-accent);
      }
      .label {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--h-muted);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .t {
        font-weight: 700;
      }
      .tl {
        font-size: 0.85rem;
        color: var(--h-muted);
      }
      .rain {
        font-size: 0.75rem;
        color: var(--h-sky);
        font-weight: 700;
      }
      @container (max-height: 250px) {
        .forecast {
          display: none;
        }
      }
      @container (max-height: 330px) {
        .details {
          display: none;
        }
      }
      @container (max-width: 420px) {
        .details {
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
          align-items: center;
        }
      }
    `],t([mt()],ne.prototype,"_forecast",void 0),ne=t([ht("yad-widget-weather")],ne);const re=["var(--h-accent)","var(--h-sage)","var(--h-sky)","var(--h-amber)","#b07aa1","#c9a27e"],ce="yad-calendar:",de=12e4,le=new Map,he=(t,e)=>{try{window.localStorage.setItem(ce+t,JSON.stringify(e))}catch{}},pe=t=>t.map(t=>({...t,start:t.start.toISOString(),end:t.end.toISOString()})),ge=t=>t.map(t=>({...t,start:new Date(t.start),end:new Date(t.end)}));let ue=class extends ee{constructor(){super(...arguments),this._warnings=[],this._inflight=!1,this._lastFetch=0,this._onVisibility=()=>{!document.hidden&&Date.now()-this._lastFetch>6e4*this._refreshMinutes()&&this._fetch()}}_scheduleRetry(t=15e3){this._retryTimer||(this._retryTimer=window.setTimeout(()=>{this._retryTimer=void 0,this._fetch()},t))}watchedEntities(){return Lt(this.config.entities).map(t=>t.entity)}connectedCallback(){super.connectedCallback(),this._fetchedKey=void 0,document.addEventListener("visibilitychange",this._onVisibility),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this._onVisibility),window.clearInterval(this._timer),this._timer=void 0,window.clearTimeout(this._retryTimer),this._retryTimer=void 0}_refreshMinutes(){return Math.max(1,Number(this.config.refresh_minutes)||10)}updated(){if(!this.hass)return;const t=JSON.stringify([this.config.entities,this.config.days]);t!==this._fetchedKey&&(this._fetchedKey=t,this._events=void 0,this._error=void 0,this._warnings=[],this._fetch(!0));const e=this._refreshMinutes();this._timer&&e===this._timerMinutes||(window.clearInterval(this._timer),this._timerMinutes=e,this._timer=window.setInterval(()=>{this._fetch()},6e4*e))}_applyEvents(t){const e=Date.now();this._events=t.filter(t=>t.end.getTime()>e).sort((t,e)=>t.start.getTime()-e.start.getTime()||Number(e.allDay)-Number(t.allDay))}async _fetchCalendar(t,e){let i=le.get(t);if(i?.timedOut)throw new Error("previous request is still pending");if(i&&i.params!==e)throw new Error("another request is still pending");if(!i){const s=this.hass.callApi("GET",`calendars/${t}?${e}`);i={promise:s,timedOut:!1,params:e},le.set(t,i);const a=i;s.then(()=>{le.get(t)===a&&le.delete(t)},()=>{le.get(t)===a&&le.delete(t)})}const s=i;let a;try{return await Promise.race([s.promise,new Promise((t,e)=>{a=window.setTimeout(()=>{s.timedOut=!0,e(new Error("request timed out"))},15e3)})])}finally{window.clearTimeout(a)}}async _fetch(t=!1){if(!this.hass||this._inflight)return;if(!t&&document.hidden)return;const e=Lt(this.config.entities),i=JSON.stringify([this.config.entities,this.config.days]),s=Qt(new Date),a=Xt(s,this.config.days??7),o=s.toISOString(),n=JSON.stringify([e,this.config.days??7]),r=Date.now(),c=(t=>{try{const e=window.localStorage.getItem(ce+t);return e?JSON.parse(e):void 0}catch{return}})(n),d=c?.day===o;if(d&&c.events?(this._applyEvents(ge(c.events)),this._warnings=c.errors??[],this._error=void 0):d&&c.errors?.length&&(this._events=void 0,this._error=`Could not load calendars: ${c.errors.join("; ")}`),d){const t=void 0!==c.fetchedAt&&r-c.fetchedAt<6e4*this._refreshMinutes()-3e4,e=void 0!==c.pendingSince&&r-c.pendingSince<18e4,i=void 0!==c.failedAt&&r-c.failedAt<de;if(t||e||i)return this._lastFetch=c.fetchedAt??r,void(e&&!t?this._scheduleRetry():i&&this._scheduleRetry(Math.max(1,de-(r-c.failedAt))))}this._inflight=!0,this._lastFetch=r,he(n,{...d?c:{},day:o,pendingSince:r});const l=`start=${encodeURIComponent(s.toISOString())}&end=${encodeURIComponent(a.toISOString())}`;try{const t=e.map((t,e)=>d?c.calendars?.[e]??null:null),s=e.map((t,e)=>d?c.calendarFetchedAt?.[e]??null:null),a=[];for(const[h,p]of e.entries()){if(!this.hass||!this.isConnected||this._fetchedKey!==i)return void he(n,{...d?c:{},day:o,pendingSince:void 0});if(!(c?.errors?.length&&null!==s[h]&&r-s[h]<6e4*this._refreshMinutes()-3e4)){try{const e=(await this._fetchCalendar(p.entity,l)).map(t=>({summary:t.summary,start:te(t.start.dateTime??t.start.date),end:te(t.end.dateTime??t.end.date),allDay:!t.start.dateTime,location:t.location,color:p.color??re[h%re.length],calendarName:Ft(this.hass?.states[p.entity],p.name,p.entity),calendarIcon:p.icon}));t[h]=pe(e),s[h]=Date.now()}catch(t){const e=String(t&&"object"==typeof t&&"message"in t?t.message:t);a.push(`${p.entity}: ${e}`),s[h]=null}if(!this.isConnected||this._fetchedKey!==i)return void he(n,{...d?c:{},day:o,pendingSince:void 0});if(t.some(t=>null!==t)){const e=t.flatMap(t=>t??[]);this._applyEvents(ge(e)),this._warnings=[...a],this._error=void 0,he(n,{day:o,pendingSince:r,events:e,calendars:t,calendarFetchedAt:s,errors:a})}}}const h=t.some(t=>null!==t)||0===e.length,p=t.flatMap(t=>t??[]);he(n,{day:o,events:h?p:void 0,calendars:t,calendarFetchedAt:s,errors:a,...a.length?{failedAt:Date.now()}:{fetchedAt:Date.now()}}),h?(this._applyEvents(ge(p)),this._warnings=a,this._error=void 0):(this._events=void 0,this._error=`Could not load calendars: ${a.join("; ")}`),a.length&&this._scheduleRetry(de)}finally{this._inflight=!1,this.isConnected&&this._fetchedKey!==i&&this._fetch(!0)}}_timeLabel(t){if(t.allDay)return"All day";const e=t=>Zt(this.hass,t);return`${e(t.start)} – ${e(t.end)}`}_displayDay(t,e){let i=new Date(Math.max(Qt(t.start).getTime(),e.getTime()));if(!1===this.config.show_weekends)for(;0===i.getDay()||6===i.getDay();)i=Xt(i,1);return i<t.end&&i<Xt(e,this.config.days??7)?i:void 0}render(){const t=this.config.title??"Coming up",e=W`<div class="head"><ha-icon icon="mdi:calendar-heart"></ha-icon>${t}</div>`;if(this._error)return W`${e}<div class="empty"><ha-icon icon="mdi:calendar-alert"></ha-icon>${this._error}</div>`;if(!this._events)return W`${e}<div class="empty">Loading…</div>`;const i=Qt(new Date),s=this._events.filter(t=>this._displayDay(t,i)).slice(0,this.config.max_events??8),a=this._warnings.length?W`<div class="calendar-warning" role="alert">Some calendars could not load: ${this._warnings.join("; ")}</div>`:K;if(!s.length)return W`${e}${a}<div class="empty"><ha-icon icon="mdi:sofa-outline"></ha-icon>Nothing planned — enjoy the downtime</div>`;const o=new Map;for(const t of s){const e=this._displayDay(t,i).getTime();o.has(e)||o.set(e,[]),o.get(e).push(t)}return W`
      ${e}${a}
      <div class="list scroll ${"left"===this.config.day_position||"right"===this.config.day_position?`day-${this.config.day_position}`:"day-top"}">
        ${[...o.entries()].map(([t,e])=>{const s=!!this.config.highlight_weekends&&[0,6].includes(new Date(t).getDay());return W`
            <div class="day">
              <div class="day-label ${t===i.getTime()?"today":""} ${s?"weekend":""}">${((t,e)=>{const i=Qt(new Date),s=Math.round((Qt(e).getTime()-i.getTime())/864e5);return 0===s||1===s?Gt(new Intl.RelativeTimeFormat(Vt(t),{numeric:"auto"}).format(s,"day")):new Intl.DateTimeFormat(Vt(t),{weekday:"long",day:"numeric",month:"short"}).format(e)})(this.hass,new Date(t))}${s?W`<ha-icon icon="mdi:sofa-outline" aria-label="Weekend"></ha-icon>`:K}</div>
              <div class="day-events">
                ${e.map(t=>W`<div class="event ${s?"weekend":""}">
                    <span class="bar ${!1!==this.config.show_calendar_badge?"badge":""}" style="background:${t.color}" title=${t.calendarName} aria-label=${t.calendarName}>
                      ${!1===this.config.show_calendar_badge?K:t.calendarIcon?W`<ha-icon icon=${t.calendarIcon}></ha-icon>`:Array.from(t.calendarName)[0]?.toLocaleUpperCase()}
                    </span>
                    <div class="body">
                      <div class="summary">${t.summary}</div>
                      ${"right"===this.config.time_position?this.config.show_location&&t.location?W`<div class="meta muted">${t.location}</div>`:K:W`<div class="meta muted num">${this._timeLabel(t)}${this.config.show_location&&t.location?W` · ${t.location}`:K}</div>`}
                    </div>
                    ${"right"===this.config.time_position?W`<div class="event-time muted num">${this._timeLabel(t)}</div>`:K}
                  </div>`)}
              </div>
            </div>
          `})}
      </div>
    `}};ue.styles=[Ht,n`
      .calendar-warning {
        color: var(--h-muted);
        font-size: 0.8rem;
        overflow-wrap: anywhere;
      }
      .list {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        mask-image: linear-gradient(to bottom, #000 85%, transparent);
        padding-bottom: 16px;
      }
      :host([auto-height]) .list { mask-image: none; padding-bottom: 0; }
      .day, .day-events {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 0;
      }
      .day-left .day, .day-right .day {
        display: grid;
        grid-template-columns: minmax(0, min(7rem, 28%)) minmax(0, 1fr);
        align-items: start;
      }
      .day-right .day { grid-template-columns: minmax(0, 1fr) minmax(0, min(7rem, 28%)); }
      .day-right .day-label { grid-column: 2; grid-row: 1; text-align: right; justify-content: flex-end; }
      .day-right .day-events { grid-column: 1; grid-row: 1; }
      .day-left .day-label, .day-right .day-label { margin-top: 0; overflow-wrap: anywhere; }
      .day-label {
        font-size: 0.8rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--h-muted);
        margin-top: 6px;
      }
      .day-label.today {
        color: var(--h-accent);
      }
      .day-label.weekend { color: var(--h-accent); display: flex; align-items: center; gap: 8px; }
      .day-label.weekend ha-icon { --mdc-icon-size: 16px; }
      .event.weekend {
        background: color-mix(in srgb, var(--h-accent) 8%, var(--h-surface-2));
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--h-accent) 28%, var(--h-surface-2));
      }
      .day:first-child .day-label {
        margin-top: 0;
      }
      .event {
        display: flex;
        gap: 12px;
        align-items: stretch;
        padding: 10px 12px;
        border-radius: var(--h-radius-sm);
        background: var(--h-surface-2);
      }
      .bar {
        width: 5px;
        border-radius: 4px;
        flex: none;
      }
      .bar.badge { width: 26px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; color: #fff; text-shadow: 0 1px 3px #000; }
      .bar ha-icon { --mdc-icon-size: 18px; }
      .body {
        min-width: 0;
        flex: 1;
      }
      .summary {
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .meta {
        font-size: 0.85rem;
        font-weight: 600;
        margin-top: 2px;
        overflow-wrap: anywhere;
      }
      .event-time { font-size: 0.85rem; font-weight: 600; text-align: right; max-width: 45%; }
    `],t([mt()],ue.prototype,"_events",void 0),t([mt()],ue.prototype,"_error",void 0),t([mt()],ue.prototype,"_warnings",void 0),ue=t([ht("yad-widget-calendar")],ue);const me=3e5,fe=(t,e)=>{const i=Bt(e);if(void 0===i||!e)return["–",""];const s=e.attributes.unit_of_measurement??"W";return"W"===s&&Math.abs(i)>=1e3?[Yt(t,i/1e3,2),"kW"]:[Yt(t,i,"W"===s?0:2),s]};let _e=class extends ee{constructor(){super(...arguments),this._inflight=!1,this._lastFetch=0,this._onVisibility=()=>{!document.hidden&&Date.now()-this._lastFetch>me&&this._fetchHistory()}}watchedEntities(){const t=this.config;return[t.power_entity,t.solar_power_entity,t.battery_entity,t.today_entity,t.solar_today_entity,t.cost_entity].filter(t=>!!t)}connectedCallback(){super.connectedCallback(),this._fetchedKey=void 0,document.addEventListener("visibilitychange",this._onVisibility),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this._onVisibility),window.clearInterval(this._timer),this._timer=void 0}updated(){if(!1===this.config.show_graph||!this.config.power_entity||!this.hass)return;const t=`${this.config.power_entity}|${this.config.hours_to_show}`;t!==this._fetchedKey&&(this._fetchedKey=t,this._fetchHistory(!0)),this._timer||(this._timer=window.setInterval(()=>{this._fetchHistory()},me))}async _fetchHistory(t=!1){const e=this.config.power_entity;if(!this.hass||!e||!1===this.config.show_graph||this._inflight)return;if(!t&&document.hidden)return;this._inflight=!0,this._lastFetch=Date.now();const i=this.config.hours_to_show??24,s=new Date,a=new Date(s.getTime()-36e5*i);try{let t=await this._fetchStatistics(e,a,s);if(!t.length){t=((await this.hass.callWS({type:"history/history_during_period",start_time:a.toISOString(),end_time:s.toISOString(),entity_ids:[e],minimal_response:!0,no_attributes:!0}))[e]??[]).map(t=>({t:1e3*t.lu,v:Number(t.s)})).filter(t=>Number.isFinite(t.v))}this._series=this._bucket(t,a.getTime(),s.getTime())}catch{this._series=void 0}finally{this._inflight=!1}}async _fetchStatistics(t,e,i){try{return((await this.hass.callWS({type:"recorder/statistics_during_period",start_time:e.toISOString(),end_time:i.toISOString(),statistic_ids:[t],period:"5minute",types:["mean"]}))[t]??[]).filter(t=>"number"==typeof t.mean&&Number.isFinite(t.mean)).map(t=>({t:t.start,v:t.mean}))}catch{return[]}}_bucket(t,e,i){if(!t.length)return[];const s=(i-e)/48,a=[];let o=0,n=t[0].v;for(let i=0;i<48;i++){const r=e+i*s,c=r+s;let d=0,l=r;for(;o<t.length&&t[o].t<c;){const e=Math.max(t[o].t,r);d+=n*(e-l),l=e,n=t[o].v,o++}d+=n*(c-l),a.push(d/s)}return a}_sparkline(t){const e=100,i=Math.max(...t,1),s=Math.min(...t,0),a=i-s||1,o=t.map((i,o)=>[o/(t.length-1)*300,e-(i-s)/a*92-4]);let n=`M ${o[0][0]} ${o[0][1]}`;for(let t=1;t<o.length;t++){const[e,i]=o[t-1],[s,a]=o[t],r=(e+s)/2;n+=` C ${r} ${i}, ${r} ${a}, ${s} ${a}`}return B`
      <svg viewBox="0 0 ${300} ${e}" preserveAspectRatio="none" class="spark">
        <defs>
          <linearGradient id="yad-energy-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--h-accent)" stop-opacity="0.35"></stop>
            <stop offset="100%" stop-color="var(--h-accent)" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        <path d="${n} L ${300} ${e} L 0 ${e} Z" fill="url(#yad-energy-fill)"></path>
        <path d=${n} fill="none" stroke="var(--h-accent)" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linecap="round"></path>
      </svg>`}_stat(t,e,i,s=""){if(!i)return K;const a=this.hass?.states[i],o=Wt(a)?"–":i===this.config.solar_power_entity?fe(this.hass,a).join(" "):Kt(this.hass,a);return W`<div class="stat ${s}" @click=${()=>!this.displayOnly&&jt(this,i)}>
      <ha-icon icon=${t}></ha-icon>
      <div>
        <div class="stat-value num">${o}</div>
        <div class="stat-label">${e}</div>
      </div>
    </div>`}render(){const t=this.config,e=t.power_entity?this.hass?.states[t.power_entity]:void 0,[i,s]=fe(this.hass,e),a=t.battery_entity?Bt(this.hass?.states[t.battery_entity]):void 0,o=void 0===a?"mdi:battery":"mdi:battery"+(a>=95?"":a<10?"-outline":"-"+10*Math.round(a/10));return W`
      <div class="head"><ha-icon icon="mdi:lightning-bolt"></ha-icon>${t.title??"Energy"}</div>
      ${t.power_entity?W`<div class="now" @click=${()=>!this.displayOnly&&jt(this,t.power_entity)}>
            <span class="value num">${i}</span><span class="unit">${s}</span>
            <span class="now-label muted">using now</span>
          </div>`:K}
      ${!1!==t.show_graph&&this._series?.length?W`<div class="graph">${this._sparkline(this._series)}</div>`:W`<div class="grow"></div>`}
      <div class="stats">
        ${this._stat("mdi:home-lightning-bolt-outline","Today",t.today_entity)}
        ${this._stat("mdi:solar-power-variant-outline","Solar now",t.solar_power_entity,"sun")}
        ${this._stat("mdi:white-balance-sunny","Solar today",t.solar_today_entity,"sun")}
        ${this._stat(o,"Battery",t.battery_entity,"sage")}
        ${this._stat("mdi:cash","Cost today",t.cost_entity)}
      </div>
    `}};_e.styles=[Ht,n`
      .now {
        display: flex;
        align-items: baseline;
        gap: 6px;
        flex-wrap: wrap;
        cursor: pointer;
      }
      .value {
        font-size: clamp(2.2rem, 18cqmin, 4.5rem);
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.03em;
      }
      .unit {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--h-muted);
      }
      .now-label {
        font-weight: 600;
        margin-left: 6px;
      }
      .graph,
      .grow {
        flex: 1;
        min-height: 0;
        margin: 8px -4px;
      }
      .spark {
        width: 100%;
        height: 100%;
        display: block;
      }
      :host([auto-height]) .graph { flex: none; height: 100px; }
      :host([auto-height]) .grow { flex: none; margin: 4px 0; }
      .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        flex: none;
      }
      .stat {
        flex: 1 1 120px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        background: var(--h-surface-2);
        border-radius: var(--h-radius-sm);
        cursor: pointer;
        min-width: 0;
      }
      .stat ha-icon {
        --mdc-icon-size: 22px;
        color: var(--h-accent);
        flex: none;
      }
      .stat.sun ha-icon {
        color: var(--h-amber);
      }
      .stat.sage ha-icon {
        color: var(--h-sage);
      }
      .stat-value {
        font-weight: 800;
        white-space: nowrap;
      }
      .stat-label {
        font-size: 0.78rem;
        color: var(--h-muted);
        font-weight: 600;
      }
      @container (max-height: 280px) {
        .graph {
          display: none;
        }
      }
    `],t([mt()],_e.prototype,"_series",void 0),_e=t([ht("yad-widget-energy")],_e);const ve={off:"mdi:power",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:sun-snowflake-variant",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan"},ye={heating:"Heating",cooling:"Cooling",idle:"Idle",off:"Off",drying:"Drying",fan:"Fan",preheating:"Preheating"};let we=class extends ee{watchedEntities(){return[this.config.entity,this.config.humidity_entity].filter(t=>!!t)}willUpdate(t){t.has("hass")&&void 0!==this._pendingTarget&&void 0===this._debounce&&(this._pendingTarget=void 0)}_nudge(t){const e=this.hass?.states[this.config.entity];if(!e||this.displayOnly)return;const i=e.attributes,s=i.target_temp_step??("°F"===this.hass?.config?.unit_system?.temperature?1:.5),a=this._pendingTarget??i.temperature;if("number"!=typeof a)return;const o=Math.min(i.max_temp??35,Math.max(i.min_temp??5,Math.round((a+s*t)/s)*s));this._pendingTarget=o,window.clearTimeout(this._debounce),this._debounce=window.setTimeout(()=>{this._debounce=void 0,this.callService("climate","set_temperature",{entity_id:this.config.entity,temperature:o})},900)}_setMode(t){this.callService("climate","set_hvac_mode",{entity_id:this.config.entity,hvac_mode:t})}render(){const t=this.hass?.states[this.config.entity];if(!t)return W`<div class="empty"><ha-icon icon="mdi:thermostat"></ha-icon>Climate entity not found<br /><small>${this.config.entity}</small></div>`;const e=t.attributes,i=Wt(t),s=this._pendingTarget??e.temperature,a=e.hvac_action??t.state,o="heating"===a||"preheating"===a?"heat":"cooling"===a?"cool":"off"===t.state?"off":"idle",n=t=>Yt(this.hass,t,1),r=this.config.humidity_entity?this.hass?.states[this.config.humidity_entity]?.state:e.current_humidity,c=e.min_temp??5,d=e.max_temp??35,l=void 0!==s?Math.min(1,Math.max(0,(s-c)/(d-c))):0,h=2*Math.PI*46*.75;return W`
      <div class="head">
        <ha-icon icon="mdi:thermostat"></ha-icon>${Ft(t,this.config.name??this.config.title)}
        <span class="spacer"></span>
        <span class="chip action ${o}">${i?"Unavailable":ye[a]??Gt(a.replace(/_/g," "))}</span>
      </div>
      <div class="body">
        <button class="round control" aria-label="Lower" @click=${()=>this._nudge(-1)}><ha-icon icon="mdi:minus"></ha-icon></button>
        <div class="dial ${o}" @click=${()=>!this.displayOnly&&jt(this,this.config.entity)}>
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r=${46} class="track" stroke-dasharray="${h} 999" transform="rotate(135 50 50)"></circle>
            <circle cx="50" cy="50" r=${46} class="fill" stroke-dasharray="${h*l} 999" transform="rotate(135 50 50)"></circle>
          </svg>
          <div class="readout">
            <div class="current num">${void 0!==e.current_temperature?n(e.current_temperature):"–"}<span>°</span></div>
            <div class="target muted num">
              ${void 0!==s?W`Set to <strong>${n(s)}°</strong>`:void 0!==e.target_temp_low?W`<strong>${n(e.target_temp_low)}–${n(e.target_temp_high)}°</strong>`:K}
            </div>
            ${null!=r?W`<div class="hum muted num"><ha-icon icon="mdi:water-percent"></ha-icon>${r}%</div>`:K}
          </div>
        </div>
        <button class="round control" aria-label="Raise" @click=${()=>this._nudge(1)}><ha-icon icon="mdi:plus"></ha-icon></button>
      </div>
      ${!1!==this.config.show_modes&&Array.isArray(e.hvac_modes)?W`<div class="modes">
            ${e.hvac_modes.map(e=>W`<button
                class="mode ${e===t.state?"active":""}"
                ?disabled=${this.displayOnly}
                @click=${()=>this._setMode(e)}
                title=${Gt(e.replace(/_/g," "))}
              >
                <ha-icon icon=${ve[e]??"mdi:thermostat"}></ha-icon>
              </button>`)}
          </div>`:K}
    `}};we.styles=[Ht,n`
      .action.heat {
        background: var(--h-accent-soft);
        color: var(--h-accent);
      }
      .action.cool {
        background: color-mix(in srgb, var(--h-sky) 16%, transparent);
        color: var(--h-sky);
      }
      .body {
        flex: 1;
        min-height: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
      }
      .dial {
        position: relative;
        height: 100%;
        max-height: min(78cqw, 260px);
        aspect-ratio: 1;
        cursor: pointer;
        min-height: 0;
      }
      .dial svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      :host([auto-height]) .body { flex: none; }
      :host([auto-height]) .dial { height: min(65cqw, 220px); }
      circle {
        fill: none;
        stroke-width: 7;
        stroke-linecap: round;
      }
      .track {
        stroke: var(--h-surface-2);
      }
      .fill {
        stroke: var(--h-muted);
        transition: stroke-dasharray 0.4s ease;
      }
      .heat .fill {
        stroke: var(--h-accent);
      }
      .cool .fill {
        stroke: var(--h-sky);
      }
      .idle .fill {
        stroke: var(--h-sage);
      }
      .readout {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      .current {
        font-size: clamp(1.8rem, 16cqmin, 3.6rem);
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.03em;
      }
      .current span {
        font-size: 0.55em;
        vertical-align: top;
        color: var(--h-muted);
      }
      .target {
        font-size: 0.9rem;
        font-weight: 600;
        margin-top: 4px;
      }
      .target strong {
        color: var(--h-text);
      }
      .hum {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-top: 2px;
      }
      .hum ha-icon {
        --mdc-icon-size: 14px;
      }
      .modes {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 10px;
        flex: none;
        flex-wrap: wrap;
      }
      .mode {
        all: unset;
        width: 42px;
        height: 42px;
        border-radius: 14px;
        display: grid;
        place-items: center;
        background: var(--h-surface-2);
        color: var(--h-muted);
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease;
      }
      .mode ha-icon {
        --mdc-icon-size: 22px;
      }
      .mode.active {
        background: var(--h-accent);
        color: var(--h-on-accent, #fff);
      }
      .mode[disabled] {
        cursor: default;
      }
      :host([display-only]) .mode:not(.active) {
        display: none;
      }
      @container (max-height: 220px) {
        .modes {
          display: none;
        }
      }
    `],t([mt()],we.prototype,"_pendingTarget",void 0),we=t([ht("yad-widget-climate")],we);const be=new Set(["on","open","opening","unlocked","playing","home","active","heat","cool"]);let xe=class extends ee{constructor(){super(...arguments),this._handlers=new Map}watchedEntities(){return Lt(this.config.entities).map(t=>t.entity)}_toggle(t){const e=Nt(t);"scene"===e||"script"===e?this.callService(e,"turn_on",{entity_id:t}):"button"===e||"input_button"===e?this.callService(e,"press",{entity_id:t}):"lock"===e?this.callService("lock","locked"===this.hass?.states[t]?.state?"unlock":"lock",{entity_id:t}):"cover"===e?this.callService("cover","toggle",{entity_id:t}):this.callService("homeassistant","toggle",{entity_id:t})}_press(t){let e=this._handlers.get(t);return e||(e=((t,e)=>{let i,s=!1,a=!1;return{down:()=>{s=!1,a=!0,i=window.setTimeout(()=>{s=!0,e()},550)},up:()=>{window.clearTimeout(i),a&&!s&&t(),a=!1},cancel:()=>{window.clearTimeout(i),a=!1}}})(()=>this._toggle(t),()=>jt(this,t)),this._handlers.set(t,e)),e}render(){const t=Lt(this.config.entities);return W`
      ${this.config.title?W`<div class="head"><ha-icon icon="mdi:lightbulb-group-outline"></ha-icon>${this.config.title}</div>`:K}
      <div class="grid scroll" style="--min:${this.config.min_tile_width??150}px">
        ${t.map(t=>{const e=this.hass?.states[t.entity],i=(t=>!!t&&be.has(t.state))(e),s=i&&Array.isArray(e?.attributes.rgb_color)?`rgb(${e.attributes.rgb_color.join(",")})`:void 0,a=this._press(t.entity);return W`<div
            class="tile ${i?"on":""} ${e&&"unavailable"!==e.state?"":"unavailable"}"
            style=${kt(s?{"--tint":s}:{})}
            role="button"
            @pointerdown=${a.down}
            @pointerup=${a.up}
            @pointerleave=${a.cancel}
            @pointercancel=${a.cancel}
            @contextmenu=${t=>t.preventDefault()}
          >
            <div class="icon">
              ${t.icon?W`<ha-icon .icon=${t.icon}></ha-icon>`:W`<ha-state-icon .hass=${this.hass} .stateObj=${e}></ha-state-icon>`}
            </div>
            <div class="text">
              <div class="name">${Ft(e,t.name,t.entity)}</div>
              <div class="state">${((t,e)=>{if(!e||"unavailable"===e.state)return"Unavailable";const i=Nt(e.entity_id);return"scene"===i||"script"===i?"on"===e.state?"Running":"Tap to run":"button"===i||"input_button"===i?"Tap to press":Wt(e)?"Unavailable":"light"===i&&"on"===e.state&&"number"==typeof e.attributes.brightness?`On · ${Yt(t,e.attributes.brightness/255*100,0)}%`:Kt(t,e)})(this.hass,e)}</div>
            </div>
          </div>`})}
      </div>
    `}};xe.styles=[Ht,n`
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(var(--min), 100%), 1fr));
        grid-auto-rows: minmax(64px, 1fr);
        gap: 10px;
        flex: 1;
      }
      .tile {
        --tint: var(--h-amber);
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 14px;
        border-radius: var(--h-radius-sm);
        background: var(--h-surface-2);
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        transition: background 0.25s ease, transform 0.15s ease;
        min-width: 0;
        touch-action: manipulation;
      }
      .tile:active {
        transform: scale(0.97);
      }
      .icon {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--h-surface);
        color: var(--h-muted);
        flex: none;
        transition: background 0.25s ease, color 0.25s ease;
      }
      .tile.on {
        background: color-mix(in srgb, var(--tint) 18%, var(--h-surface));
      }
      .tile.on .icon {
        background: var(--tint);
        color: #fff;
        box-shadow: 0 4px 14px -4px var(--tint);
      }
      .tile.unavailable {
        opacity: 0.5;
      }
      @container (max-height: 170px) {
        .head {
          display: none;
        }
      }
      @container (max-height: 150px) {
        .grid {
          grid-auto-rows: minmax(44px, 1fr);
          gap: 8px;
        }
        .tile {
          padding: 4px 10px;
          gap: 8px;
        }
        .icon {
          width: 34px;
          height: 34px;
          --mdc-icon-size: 20px;
        }
      }
      .text {
        min-width: 0;
      }
      .name {
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .state {
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--h-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `],xe=t([ht("yad-widget-toggles")],xe);let $e=class extends ee{watchedEntities(){return Lt(this.config.entities).map(t=>t.entity)}render(){const t=Lt(this.config.entities),e=this.config.layout??"grid";return W`
      ${this.config.title?W`<div class="head"><ha-icon icon="mdi:gauge"></ha-icon>${this.config.title}</div>`:K}
      <div class="${e} scroll" style="--min:${this.config.min_tile_width??140}px">
        ${t.map(t=>{const e=this.hass?.states[t.entity],[i,s]=((t,e)=>{if(!e||Wt(e))return["–",""];const i=Bt(e),s=e.attributes.unit_of_measurement??"";return void 0!==i?[Yt(t,i,1),s]:[t?.formatEntityState?t.formatEntityState(e):e.state,""]})(this.hass,e);return W`<div class="item" @click=${()=>!this.displayOnly&&jt(this,t.entity)}>
            <div class="icon" style=${t.color?`color:${t.color}`:""}>
              ${t.icon?W`<ha-icon .icon=${t.icon}></ha-icon>`:W`<ha-state-icon .hass=${this.hass} .stateObj=${e}></ha-state-icon>`}
            </div>
            <div class="name">${Ft(e,t.name,t.entity)}</div>
            <div class="value num">${i}${s?W`<span class="unit">${s}</span>`:K}</div>
          </div>`})}
      </div>
    `}};$e.styles=[Ht,n`
      .grid {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(var(--min), 100%), 1fr));
        grid-auto-rows: minmax(90px, 1fr);
        gap: 10px;
      }
      .grid .item {
        display: grid;
        grid-template-areas: "icon name" "value value";
        grid-template-columns: auto 1fr;
        align-content: space-between;
        gap: 6px 8px;
        padding: 12px 14px;
        border-radius: var(--h-radius-sm);
        background: var(--h-surface-2);
        cursor: pointer;
        min-width: 0;
      }
      .list {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .list .item {
        display: grid;
        grid-template-areas: "icon name value";
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 12px;
        padding: 10px 2px;
        border-bottom: 1px solid var(--h-border);
        cursor: pointer;
      }
      .list .item:last-child {
        border-bottom: none;
      }
      .icon {
        grid-area: icon;
        color: var(--h-accent);
        display: flex;
      }
      .icon ha-icon,
      .icon ha-state-icon {
        --mdc-icon-size: 22px;
      }
      .name {
        grid-area: name;
        font-size: 0.88rem;
        font-weight: 700;
        color: var(--h-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        align-self: center;
      }
      .value {
        grid-area: value;
        font-size: 1.7rem;
        font-weight: 400;
        letter-spacing: -0.02em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .list .value {
        font-size: 1.15rem;
        font-weight: 700;
      }
      .unit {
        font-size: 0.55em;
        font-weight: 700;
        color: var(--h-muted);
        margin-left: 3px;
      }
      @container (max-height: 190px) {
        .head {
          display: none;
        }
        .grid {
          grid-auto-rows: minmax(64px, 1fr);
        }
        .grid .item {
          padding: 8px 12px;
          gap: 2px 8px;
        }
        .value {
          font-size: 1.35rem;
        }
      }
    `],$e=t([ht("yad-widget-sensors")],$e);let ke=class extends ee{watchedEntities(){return[this.config.entity]}_call(t,e={}){this.callService("media_player",t,{entity_id:this.config.entity,...e})}_volume(t){const e=Number(t.target.value);this._call("volume_set",{volume_level:e/100})}render(){const t=this.hass?.states[this.config.entity];if(!t)return W`<div class="empty"><ha-icon icon="mdi:speaker-off"></ha-icon>Media player not found<br /><small>${this.config.entity}</small></div>`;const e=t.attributes,i=Ft(t,this.config.name??this.config.title),s="playing"===t.state||"paused"===t.state||"buffering"===t.state,a=s?e.entity_picture_local??e.entity_picture:void 0,o=e.supported_features??0;return s?W`
      ${a?W`<div class="backdrop" style="background-image:url('${a}')"></div>`:K}
      <div class="head"><ha-icon icon="mdi:music-note-outline"></ha-icon>${i}</div>
      <div class="content">
        <div class="art" @click=${()=>!this.displayOnly&&jt(this,this.config.entity)}>
          ${a?W`<img src=${a} alt="" />`:W`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="info">
          <div class="title">${e.media_title??"Unknown"}</div>
          <div class="artist muted">${e.media_artist??e.media_album_name??e.app_name??""}</div>
          <div class="controls control">
            ${16&o?W`<button class="round" @click=${()=>this._call("media_previous_track")}><ha-icon icon="mdi:skip-previous"></ha-icon></button>`:K}
            <button class="round primary big" @click=${()=>this._call("media_play_pause")}>
              <ha-icon icon=${"playing"===t.state?"mdi:pause":"mdi:play"}></ha-icon>
            </button>
            ${32&o?W`<button class="round" @click=${()=>this._call("media_next_track")}><ha-icon icon="mdi:skip-next"></ha-icon></button>`:K}
          </div>
          ${this.config.show_volume&&4&o?W`<input
                class="volume control"
                type="range"
                min="0"
                max="100"
                .value=${String(Math.round(100*(e.volume_level??0)))}
                @change=${this._volume}
              />`:K}
        </div>
      </div>
    `:W`
        <div class="head"><ha-icon icon="mdi:music-note-outline"></ha-icon>${i}</div>
        <div class="empty" @click=${()=>!this.displayOnly&&jt(this,this.config.entity)}>
          <ha-icon icon=${Wt(t)?"mdi:speaker-off":"mdi:music-note-off-outline"}></ha-icon>
          ${Wt(t)?"Unavailable":"Nothing playing"}
        </div>
      `}};ke.styles=[Ht,n`
      :host([auto-height]) .art { height: min(32cqw, 120px); }
      :host {
        position: relative;
      }
      .backdrop {
        position: absolute;
        inset: -40px;
        background-size: cover;
        background-position: center;
        filter: blur(40px) saturate(1.3);
        opacity: 0.28;
        pointer-events: none;
      }
      .head,
      .content {
        position: relative;
      }
      .content {
        flex: 1;
        min-height: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: clamp(12px, 4cqw, 24px);
      }
      .art {
        height: min(100%, 50cqw);
        aspect-ratio: 1;
        border-radius: var(--h-radius-sm);
        overflow: hidden;
        background: var(--h-surface-2);
        display: grid;
        place-items: center;
        flex: none;
        box-shadow: var(--h-shadow);
        cursor: pointer;
      }
      .art img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .art ha-icon {
        --mdc-icon-size: 40%;
        color: var(--h-muted);
      }
      .info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .title {
        font-size: clamp(1.05rem, 7cqmin, 1.6rem);
        font-weight: 800;
        line-height: 1.2;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .artist {
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .controls {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
      }
      .big {
        width: 56px;
        height: 56px;
      }
      .volume {
        width: 100%;
        margin-top: 8px;
        accent-color: var(--h-accent);
      }
      @container (max-height: 200px) {
        .head,
        .volume {
          display: none;
        }
        .title {
          -webkit-line-clamp: 1;
        }
        .controls {
          margin-top: 4px;
        }
      }
      @container (max-width: 300px) {
        .art {
          display: none;
        }
      }
    `],ke=t([ht("yad-widget-media")],ke);const Se=t=>t.split(/[?#]/)[0].replace(/\/+$/,"")||"/";let Ae=class extends ee{constructor(){super(...arguments),this._path=window.location.pathname,this._images=new Map,this._imageRequests=new Map,this._sync=()=>{this._path=window.location.pathname}}watchedEntities(){return[]}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this._sync),window.addEventListener("popstate",this._sync),this._sync(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("location-changed",this._sync),window.removeEventListener("popstate",this._sync);for(const t of this._imageRequests.values())window.clearTimeout(t.timer);this._imageRequests.clear(),this._images=new Map}updated(){if(!this.isConnected)return;const t=new Set((this.config.items??[]).map(t=>t?.background_media?.media_content_id).filter(t=>!!t));for(const[e,i]of this._imageRequests)if(!t.has(e)){window.clearTimeout(i.timer),this._imageRequests.delete(e);const t=new Map(this._images);t.delete(e),this._images=t}for(const e of t){if(this._imageRequests.has(e)||e.startsWith("media-source://")&&!this.hass)continue;const t={};this._imageRequests.set(e,t),this._resolveImage(e,t)}}async _resolveImage(t,e){window.clearTimeout(e.timer);try{const i=t.startsWith("media-source://")?await Pt(this.hass,t):t;if(this._imageRequests.get(t)!==e)return;this._images=new Map(this._images).set(t,{url:i}),t.startsWith("media-source://")&&(e.timer=window.setTimeout(()=>{this._resolveImage(t,e)},828e5))}catch(i){if(this._imageRequests.get(t)!==e)return;this._setImageError(t,e,i instanceof Error?i.message:"Could not load background image")}}_setImageError(t,e,i){window.clearTimeout(e.timer),this._images=new Map(this._images).set(t,{error:i}),e.timer=window.setTimeout(()=>{this._resolveImage(t,e)},6e4)}_imageFailed(t,e){const i=this._imageRequests.get(t);i&&this._images.get(t)?.url===e&&this._setImageError(t,i,"Could not load background image")}_active(t){if(this.config.page_mode)return t.path===this.config.active_page;const e=Se(t.path),i=Se(this._path);return i===e||i.startsWith(`${e}/`)}_go(t){if(this.displayOnly||!t.path||this._active(t))return;if(this.config.page_mode)return void qt(this,"yad-page-selected",{page:t.path});const e=/[?#]/.test(t.path)?t.path:`${t.path}${window.location.search}`;window.history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}render(){const t=(this.config.items??[]).filter(t=>t?.name&&t.path),e=!1!==this.config.show_icons;if(!t.length)return W`<div class="empty"><ha-icon icon="mdi:menu"></ha-icon>Add menu buttons</div>`;const i=Number(this.config.font_size),s=i>0?`font-size:${i}px`:"";return W`
      ${this.config.title?W`<div class="head"><ha-icon icon="mdi:menu"></ha-icon>${this.config.title}</div>`:K}
      <nav class="menu ${"horizontal"===this.config.direction?"horizontal":""}" style=${s}>
        ${t.map(t=>{const i=this._active(t),s=t.background_media?.media_content_id,a=s?this._images.get(s):void 0;return W`<button class="item ${i?"active":""} ${a?.url?"has-image":""}" aria-current=${i?"page":"false"} @click=${()=>this._go(t)}>
            ${s&&a?.url?W`<img class="button-image" src=${a.url} alt="" @error=${()=>this._imageFailed(s,a.url)}>`:K}
            ${e&&t.icon?W`<ha-icon icon=${t.icon}></ha-icon>`:K}
            <span class="label">${t.name}</span>
            ${a?.error?W`<span class="image-error" role="alert" title=${a.error}>Image unavailable: ${a.error}</span>`:K}
          </button>`})}
      </nav>
    `}};Ae.styles=[Ht,n`
      .menu {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .menu.horizontal { flex-direction: row; }
      .item {
        all: unset;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        box-sizing: border-box;
        flex: 1 1 0;
        min-width: 0;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 8px 14px;
        border-radius: var(--h-radius-sm);
        background: var(--h-surface-2);
        color: var(--h-text);
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
        -webkit-tap-highlight-color: transparent;
      }
      .item:active { transform: scale(0.97); }
      .item:focus-visible { outline: 2px solid var(--h-accent); outline-offset: 2px; }
      .item ha-icon {
        --mdc-icon-size: 1.4em;
        flex: none;
        color: var(--h-muted);
      }
      .label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item.active {
        background: var(--h-accent-soft);
        color: var(--h-accent);
        cursor: default;
      }
      .item.active ha-icon { color: var(--h-accent); }
      .button-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -2;
      }
      .item.has-image::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: -1;
      }
      .item.has-image, .item.has-image ha-icon { color: #fff; }
      .item.has-image.active::after {
        content: "";
        position: absolute;
        inset: 0;
        border: 3px solid var(--h-accent);
        border-radius: inherit;
        pointer-events: none;
      }
      .image-error { font-size: 0.7em; color: var(--h-muted); overflow: hidden; text-overflow: ellipsis; }
      :host([auto-height]) .item { flex: none; }
    `],t([mt()],Ae.prototype,"_path",void 0),t([mt()],Ae.prototype,"_images",void 0),Ae=t([ht("yad-widget-menu")],Ae);let Ee=class extends ee{watchedEntities(){return[]}shouldUpdate(){return!0}willUpdate(t){if(t.has("config")){const t=JSON.stringify(this.config.card??null);t!==this._builtFor&&(this._builtFor=t,this._build())}this._card&&this.hass&&(this._card.hass=this.hass)}async _build(){const t=this.config.card;if(!t?.type)return this._card=void 0,void(this._error="Add a `card:` configuration to this widget.");try{const e=await(window.loadCardHelpers?.());if(!e)throw new Error("Card helpers unavailable");const i=e.createCardElement(t);i.addEventListener("ll-rebuild",t=>{t.stopPropagation(),this._builtFor=void 0,this.requestUpdate("config")}),this.hass&&(i.hass=this.hass),this._card=i,this._error=void 0}catch(t){this._error=t.message}}render(){return this._error?W`<div class="empty"><ha-icon icon="mdi:card-remove-outline"></ha-icon>${this._error}</div>`:W`<div class="wrap scroll">${this._card}</div>`}};Ee.styles=[Ht,n`
      .wrap {
        flex: 1;
        height: 100%;
        --ha-card-background: transparent;
        --ha-card-box-shadow: none;
        --ha-card-border-width: 0;
        --ha-card-border-radius: var(--h-radius-sm);
        --primary-text-color: var(--h-text);
        --secondary-text-color: var(--h-muted);
      }
      :host([auto-height]) .wrap { height: auto; }
    `],t([mt()],Ee.prototype,"_card",void 0),t([mt()],Ee.prototype,"_error",void 0),Ee=t([ht("yad-widget-card")],Ee);const Ce=[["charge_entity","Charge","mdi:battery"],["fuel_entity","Fuel","mdi:gas-station"],["range_entity","Range","mdi:map-marker-distance"],["location_entity","Location","mdi:map-marker"],["plugged_in_entity","Plugged in","mdi:ev-plug-type2"],["charging_entity","Charging","mdi:ev-station"]];let Me=class extends ee{watchedEntities(){return[...Ce.flatMap(([t])=>this.config[t]?[this.config[t]]:[]),...Lt(this.config.entities).map(t=>t.entity)]}_available(t){const e=t?this.hass?.states[t]:void 0;return e&&!Wt(e)&&""!==e.state.trim()?e:void 0}render(){const t=Ce.flatMap(([t,e,i])=>{const s=this._available(this.config[t]);if(!s)return[];const a="charge_entity"===t||"fuel_entity"===t;return[{entity:s,label:e,icon:i,value:a?Bt(s):void 0,percentage:a}]}),e=Lt(this.config.entities).flatMap(t=>{const e=this._available(t.entity);return e?[{entity:e,label:Ft(e,t.name),icon:t.icon??"mdi:gauge",value:void 0,percentage:!1}]:[]}),i=[...t,...e];return W`
      <div class="head"><ha-icon icon="mdi:car"></ha-icon>${this.config.title??this.config.name??"Car"}</div>
      ${i.length?W`<div class="items scroll">
        ${i.map(({entity:t,label:e,icon:i,value:s,percentage:a})=>W`
          <div class="item" @click=${()=>!this.displayOnly&&jt(this,t.entity_id)}>
            <ha-icon icon=${i}></ha-icon>
            <div class="body">
              <div class="label muted">${e}</div>
              <div class="value num">${a&&void 0!==s?`${s}%`:Kt(this.hass,t)}</div>
              ${a&&void 0!==s?W`
                <progress max="100" value=${Math.min(100,Math.max(0,s))} aria-label=${e}></progress>
              `:K}
            </div>
          </div>
        `)}
      </div>`:W`<div class="empty">${this.watchedEntities().length?"No vehicle data available":"Select vehicle sensors in the widget editor"}</div>`}
    `}};Me.styles=[Ht,n`
      .items { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(140px, 100%), 1fr)); gap: 8px; }
      .item { display: flex; align-items: center; gap: 8px; padding: 10px; border-radius: var(--h-radius-sm); background: var(--h-surface-2); cursor: pointer; }
      .item ha-icon { color: var(--h-accent); flex: none; }
      .body { min-width: 0; flex: 1; }
      .label { font-size: 0.8rem; font-weight: 600; }
      .value { font-weight: 700; overflow-wrap: anywhere; }
      progress { width: 100%; height: 6px; accent-color: var(--h-accent); }
      :host([display-only]) .item { cursor: default; }
    `],Me=t([ht("yad-widget-car")],Me);let Pe=class extends ee{watchedEntities(){return[]}render(){const t=this.config.style??"blank";return"blank"===t?K:W`<div class="line ${t}" style=${this.config.line_color?`border-color:${this.config.line_color}`:""} role="separator"></div>`}};Pe.styles=[Ht,n`
      :host { justify-content: center; }
      .line { width: 100%; border-top: 1px solid var(--h-border); }
      .dashed { border-top-style: dashed; }
    `],Pe=t([ht("yad-widget-spacer")],Pe);const ze=(t,e,i=!1)=>({name:t,required:i,selector:{entity:e?{domain:e}:{}}}),Te=(t,e)=>({name:t,selector:{entity:{multiple:!0,...e?{domain:e}:{}}}}),Oe=(t,e,i,s=1)=>({name:t,selector:{number:{min:e,max:i,step:s,mode:"box"}}}),Ie=t=>({name:t,selector:{boolean:{}}}),Re=t=>({name:t,selector:{text:{}}}),De=(t,e)=>({name:t,selector:{select:{mode:"dropdown",options:e.map(([t,e])=>({value:t,label:e}))}}}),Ue={clock:{label:"Clock, greeting & people",icon:"mdi:clock-outline",tag:"yad-widget-clock",defaults:{col_span:2,row_span:1,transparent:!0,greeting:!0,greet_by_name:!0,clock_position:"left"},schema:[{type:"grid",name:"",schema:[Ie("show_clock"),De("clock_position",[["left","Clock left, people right"],["right","Clock right, people left"]]),Ie("greeting"),Ie("greet_by_name"),Re("name"),Ie("show_date"),Ie("show_seconds"),De("time_format",[["auto","Follow Home Assistant"],["24","24 hour"],["12","12 hour"]])]},Re("title"),Te("entities","person"),Ie("show_state")]},weather:{label:"Weather & forecast",icon:"mdi:weather-partly-cloudy",tag:"yad-widget-weather",defaults:{col_span:2,row_span:2,forecast_type:"daily",forecast_count:5},schema:[ze("entity","weather",!0),{type:"grid",name:"",schema:[De("forecast_type",[["daily","Daily"],["hourly","Hourly"],["twice_daily","Twice daily"]]),Oe("forecast_count",0,10),Ie("show_details")]}]},calendar:{label:"Calendar agenda",icon:"mdi:calendar-month-outline",tag:"yad-widget-calendar",defaults:{col_span:1,row_span:3,days:7,max_events:8,show_weekends:!0,highlight_weekends:!1,show_calendar_badge:!0,day_position:"top",time_position:"below"},schema:[Re("title"),Te("entities","calendar"),{type:"grid",name:"",schema:[Oe("days",1,31),Oe("max_events",1,50),Ie("show_location"),Ie("show_weekends"),Ie("highlight_weekends"),Ie("show_calendar_badge"),Oe("refresh_minutes",1,120),De("day_position",[["top","Above events"],["left","Left of events"],["right","Right of events"]]),De("time_position",[["below","Below event name"],["right","Right of event"]])]}]},energy:{label:"Energy usage",icon:"mdi:lightning-bolt-outline",tag:"yad-widget-energy",defaults:{col_span:2,row_span:2,show_graph:!0,hours_to_show:24},schema:[Re("title"),ze("power_entity","sensor"),ze("today_entity","sensor"),ze("solar_power_entity","sensor"),ze("solar_today_entity","sensor"),ze("battery_entity","sensor"),ze("cost_entity","sensor"),{type:"grid",name:"",schema:[Ie("show_graph"),Oe("hours_to_show",1,168)]}]},climate:{label:"Climate / thermostat",icon:"mdi:thermostat",tag:"yad-widget-climate",defaults:{col_span:1,row_span:2,show_modes:!0},schema:[ze("entity","climate",!0),{type:"grid",name:"",schema:[Re("name"),Ie("show_modes")]},ze("humidity_entity","sensor")]},toggles:{label:"Lights & switches",icon:"mdi:lightbulb-group-outline",tag:"yad-widget-toggles",defaults:{col_span:2,row_span:1},schema:[Re("title"),Te("entities",["light","switch","fan","input_boolean","scene","script","cover","lock","button","input_button"]),Oe("min_tile_width",100,400,10)]},sensors:{label:"Sensors",icon:"mdi:gauge",tag:"yad-widget-sensors",defaults:{col_span:2,row_span:1,layout:"grid"},schema:[Re("title"),Te("entities"),{type:"grid",name:"",schema:[De("layout",[["grid","Tiles"],["list","List"]]),Oe("min_tile_width",100,400,10)]}]},media:{label:"Media player",icon:"mdi:music-circle-outline",tag:"yad-widget-media",defaults:{col_span:2,row_span:1},schema:[ze("entity","media_player",!0),{type:"grid",name:"",schema:[Re("name"),Ie("show_volume")]}]},menu:{label:"Menu / navigation",icon:"mdi:menu",tag:"yad-widget-menu",defaults:{col_span:1,row_span:1,direction:"vertical",items:[]},schema:[Re("title"),{name:"items",selector:{object:{multiple:!0,label_field:"name",fields:{name:{label:"Name",required:!0,selector:{text:{}}},path:{label:"Dashboard path (e.g. /yad-kitchen/0)",required:!0,selector:{text:{}}},icon:{label:"Icon",selector:{icon:{}}},background_media:{label:"Background image",selector:Mt}}}}},{type:"grid",name:"",schema:[De("direction",[["vertical","Vertical list"],["horizontal","Horizontal row"]]),Ie("show_icons"),Oe("font_size",10,64)]}]},card:{label:"Any Home Assistant card",icon:"mdi:card-outline",tag:"yad-widget-card",defaults:{col_span:1,row_span:1,card:{type:"markdown",content:"Hello from YAD 👋"}},schema:[]},car:{label:"Car / vehicle",icon:"mdi:car",tag:"yad-widget-car",defaults:{col_span:2,row_span:2},schema:[Re("title"),ze("charge_entity","sensor"),ze("fuel_entity","sensor"),ze("range_entity","sensor"),ze("location_entity","device_tracker"),ze("plugged_in_entity",["binary_sensor","sensor"]),ze("charging_entity",["binary_sensor","sensor"]),Te("entities")]},spacer:{label:"Spacer / divider",icon:"mdi:minus",tag:"yad-widget-spacer",defaults:{col_span:4,row_span:.25,transparent:!0,style:"blank"},schema:[De("style",[["blank","Blank spacer"],["line","Horizontal line"],["dashed","Dashed line"]]),{name:"line_color",selector:{text:{}}}]}},He=t=>t.map(t=>"people"===t.type?{...t,type:"clock",show_clock:!1}:t),Le=[{type:"grid",name:"",schema:[Oe("col_span",1,12),Oe("row_span",1,32),Oe("portrait_col_span",1,12),Oe("portrait_row_span",1,32),De("visibility",[["all","Always"],["landscape","Landscape only"],["portrait","Portrait only"]]),Ie("transparent")]}],qe=Le.map(t=>({...t,schema:t.schema.map(t=>"row_span"===t.name||"portrait_row_span"===t.name?Oe(t.name,.25,1,.25):t)})),je={entity:"Entity",entities:"Entities",title:"Title",name:"Name",greeting:"Show greeting",greet_by_name:"Greet by name",show_date:"Show date",show_seconds:"Show seconds",time_format:"Time format",forecast_type:"Forecast type",forecast_count:"Forecast items",show_details:"Show humidity & wind",days:"Days ahead",max_events:"Max events",show_location:"Show location",refresh_minutes:"Refresh (minutes)",show_weekends:"Show weekend events",highlight_weekends:"Highlight weekends",show_calendar_badge:"Show calendar initial / icon",day_position:"Day / date position",time_position:"Event time position",charge_entity:"Charge level (%)",fuel_entity:"Fuel level (%)",range_entity:"Remaining range",location_entity:"Vehicle location",plugged_in_entity:"EV plugged in",charging_entity:"EV charging",style:"Spacer style",line_color:"Line colour (optional)",power_entity:"Current power (W/kW)",today_entity:"Energy used today",solar_power_entity:"Solar power now",solar_today_entity:"Solar energy today",battery_entity:"Battery level (%)",cost_entity:"Cost today",show_graph:"Show usage graph",hours_to_show:"Graph hours",show_modes:"Show mode buttons",humidity_entity:"Humidity sensor (optional)",min_tile_width:"Minimum tile width (px)",layout:"Layout",show_volume:"Show volume slider",show_state:"Show home/away",show_clock:"Show clock & greeting",clock_position:"Layout",direction:"Direction",show_icons:"Show icons",font_size:"Text size (px)",items:"Menu buttons",col_span:"Width (columns)",row_span:"Height (rows)",portrait_col_span:"Portrait width",portrait_row_span:"Portrait height",visibility:"Show in",transparent:"No background",auto_height:"Automatic height",auto_height_max:"Maximum automatic height"},Ne="0.7.0",Fe=t=>{if(!t)return;let e=t.trim().replace(/^#/,"").toLowerCase();return/^[0-9a-f]{3}$/.test(e)&&(e=[...e].map(t=>t+t).join("")),/^[0-9a-f]{6}$/.test(e)?`#${e}`:void 0},We=t=>{const e=parseInt(t.slice(1),16),i=(e>>16&255)/255,s=(e>>8&255)/255,a=(255&e)/255,o=Math.max(i,s,a),n=o-Math.min(i,s,a);let r=0;return n&&(r=o===i?(s-a)/n%6:o===s?(a-i)/n+2:(i-s)/n+4),{h:(60*r+360)%360,s:o?n/o:0,v:o}},Be=({h:t,s:e,v:i})=>{const s=s=>{const a=(s+t/60)%6;return i-i*e*Math.max(0,Math.min(a,4-a,1))};return`#${[s(5),s(3),s(1)].map(t=>Math.round(255*t).toString(16).padStart(2,"0")).join("")}`};let Ve=class extends dt{constructor(){super(...arguments),this.label="",this._open=!1,this._hsv={h:0,s:0,v:1},this._text="",this._onPointerDown=t=>{t.preventDefault(),this._wheel.setPointerCapture(t.pointerId),this._pickFromPointer(t)},this._onPointerMove=t=>{this._wheel.hasPointerCapture(t.pointerId)&&this._pickFromPointer(t)}}willUpdate(t){if(t.has("value")||t.has("placeholder")){const t=Fe(this.value)??Fe(this.placeholder);t&&Be(this._hsv)!==t&&(this._hsv=We(t)),this._text=this.value??""}}_emit(t){this.value=t,qt(this,"value-changed",{value:t})}_setHsv(t){this._hsv=t,this._emit(Be(t))}_pickFromPointer(t){const e=this._wheel.getBoundingClientRect(),i=e.width/2,s=t.clientX-e.left-i,a=t.clientY-e.top-i,o=(180*Math.atan2(s,-a)/Math.PI+360)%360,n=((t,e,i)=>Math.min(i,Math.max(e,t)))(Math.hypot(s,a)/i,0,1);this._setHsv({h:o,s:n,v:this._hsv.v||1})}_onBrightness(t){this._setHsv({...this._hsv,v:Number(t.target.value)/100})}_onText(t){const e=t.target.value;this._text=e;const i=Fe(e);i?(this._hsv=We(i),this._emit(i)):e||this._emit(void 0)}render(){const t=Fe(this.value)??Fe(this.placeholder),{h:e,s:i,v:s}=this._hsv,a=e*Math.PI/180,o=50+Math.sin(a)*i*50,n=50-Math.cos(a)*i*50,r=Be({h:e,s:i,v:1});return W`
      <div class="field">
        <button class="swatch ${this.value?"":"unset"}" style="--c:${t??"transparent"}" @click=${()=>this._open=!this._open} title="Pick a colour"></button>
        <div class="text">
          <label>${this.label}</label>
          <input .value=${this._text} placeholder=${this.placeholder??"#rrggbb"} spellcheck="false" @input=${this._onText} />
        </div>
        ${this.value?W`<button class="icon" title="Reset to palette" @click=${()=>this._emit(void 0)}>✕</button>`:K}
        <button class="icon" title=${this._open?"Close":"Colour wheel"} @click=${()=>this._open=!this._open}>${this._open?"▴":"▾"}</button>
      </div>
      ${this._open?W`<div class="panel">
            <div class="wheel" @pointerdown=${this._onPointerDown} @pointermove=${this._onPointerMove}>
              <div class="shade" style="opacity:${1-s}"></div>
              <div class="marker" style="left:${o}%;top:${n}%;background:${t}"></div>
            </div>
            <div class="slider-row">
              <span>Brightness</span>
              <input type="range" min="0" max="100" .value=${String(Math.round(100*s))} style="--pure:${r}" @input=${this._onBrightness} />
            </div>
          </div>`:K}
    `}};Ve.styles=n`
    :host {
      display: block;
    }
    .field {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 8px;
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 12px;
    }
    button {
      all: unset;
      cursor: pointer;
    }
    .swatch {
      flex: none;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--c);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
    }
    .swatch.unset {
      opacity: 0.55;
      background: linear-gradient(135deg, transparent 46%, rgba(0, 0, 0, 0.25) 47%, rgba(0, 0, 0, 0.25) 53%, transparent 54%), var(--c);
    }
    .text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    label {
      font-size: 0.78em;
      color: var(--secondary-text-color);
    }
    input:not([type="range"]) {
      all: unset;
      font: inherit;
      color: var(--primary-text-color);
      font-family: ui-monospace, monospace;
    }
    input::placeholder {
      color: var(--secondary-text-color);
      opacity: 0.7;
    }
    .icon {
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: var(--secondary-text-color);
    }
    .icon:hover {
      background: var(--secondary-background-color);
    }
    .panel {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 14px 8px 4px;
    }
    .wheel {
      position: relative;
      width: min(220px, 70vw);
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(circle closest-side, #fff, rgba(255, 255, 255, 0)),
        conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
      touch-action: none;
      cursor: crosshair;
    }
    .shade {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: #000;
      pointer-events: none;
    }
    .marker {
      position: absolute;
      width: 22px;
      height: 22px;
      margin: -11px 0 0 -11px;
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.3);
      pointer-events: none;
    }
    .slider-row {
      display: flex;
      align-items: center;
      gap: 10px;
      width: min(260px, 100%);
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    input[type="range"] {
      flex: 1;
      appearance: none;
      height: 10px;
      border-radius: 5px;
      background: linear-gradient(90deg, #000, var(--pure));
      outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border: none;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  `,t([ut()],Ve.prototype,"label",void 0),t([ut()],Ve.prototype,"value",void 0),t([ut()],Ve.prototype,"placeholder",void 0),t([mt()],Ve.prototype,"_open",void 0),t([mt()],Ve.prototype,"_hsv",void 0),t([mt()],Ve.prototype,"_text",void 0),t([function(t){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}(".wheel")],Ve.prototype,"_wheel",void 0),Ve=t([ht("yad-color-picker")],Ve);const Ke=(t,e,i=!1)=>({name:t,selector:{select:{mode:"dropdown",custom_value:i,options:e.map(([t,e])=>({value:t,label:e}))}}}),Ye=(t,e,i,s,a=1)=>({name:t,selector:{number:{min:e,max:i,step:a,mode:"box",...s?{unit_of_measurement:s}:{}}}}),Ge=[{type:"grid",name:"",schema:[{name:"display_only",selector:{boolean:{}}},{name:"hide_cursor",selector:{boolean:{}}}]}],Je=[{name:"background_media",selector:Mt},{name:"background",selector:{text:{}}},{type:"grid",name:"",schema:[Ye("background_opacity",0,100,"%"),Ye("background_blur",0,30,"px"),Ke("background_fit",[["cover","Fill (cover)"],["contain","Fit whole image"]]),Ke("background_position",[["center","Centre"],["top","Top"],["bottom","Bottom"],["left","Left"],["right","Right"]])]}],Ze=[{name:"name",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"background_media",selector:Mt}],Qe={screen:"Screen size",screen_width:"Screen width",screen_height:"Screen height",ui_scale:"UI scale",theme:"Light / dark mode",orientation:"Orientation",columns:"Columns (landscape)",portrait_columns:"Columns (portrait)",height:"Height",row_height:"Row height (when not filling screen)",fill_from_top:"Stack cards from the top (don't stretch rows)",gap:"Spacing",background:"Background image URL (optional)",background_media:"Choose from HA media or upload an image",background_opacity:"Image opacity",background_blur:"Image blur",background_fit:"Image fit",background_position:"Image position",display_only:"Display only (no touch)",hide_cursor:"Hide mouse cursor"},Xe=[["background","Background"],["surface","Tiles"],["text","Text"],["accent","Accent"],["success","On / home"],["warm","Lights & heating"],["info","Cooling & info"]],ti=t=>Object.fromEntries(Object.entries(t).filter(([,t])=>void 0!==t&&""!==t&&null!==t));let ei=0,ii=class extends dt{constructor(){super(...arguments),this._adding=!1,this._pagesOpen=!1,this._label=t=>je[t.name]??Qe[t.name]??t.name}setConfig(t){this._config={...t,widgets:He(t.widgets??[]),...t.pages?{pages:t.pages.map(t=>({...t,widgets:He(t.widgets)}))}:{}},Reflect.deleteProperty(this._config,"layout_mode"),this._config.pages?.some(t=>t.id===this._editingPageId)||(this._editingPageId=this._config.pages?.[0]?.id),this._config.pages?.some(t=>t.id===this._expandedPageId)||(this._expandedPageId=void 0),void 0!==this._selected&&this._selected>=this._widgets.length&&(this._selected=void 0)}connectedCallback(){super.connectedCallback(),this._loadHaComponents()}async _loadHaComponents(){if(!customElements.get("ha-form")||!customElements.get("ha-entity-picker"))try{const t=await(window.loadCardHelpers?.()),e=await(t?.createCardElement({type:"entities",entities:[]}));await(e?.constructor?.getConfigElement?.()),this.requestUpdate()}catch{}}_commit(t){this._config=t,qt(this,"config-changed",{config:t})}_generalChanged(t){t.stopPropagation();const{widgets:e,...i}=t.detail.value;this._commit({...ti(i),widgets:this._config.widgets,pages:this._config.pages,shared_menu:this._config.shared_menu})}_backgroundChanged(t){t.stopPropagation();const e=t.detail.value,i=e.background_media?.media_content_id!==this._config?.background_media?.media_content_id,s=e.background!==this._config?.background;this._set({background_media:s&&!i?void 0:e.background_media,background:i&&e.background_media?void 0:e.background,background_opacity:e.background_opacity,background_blur:e.background_blur,background_fit:e.background_fit,background_position:e.background_position})}get _widgets(){const t=this._config?.pages?.find(t=>t.id===this._editingPageId);return t?.widgets??this._config?.widgets??[]}_setWidgets(t){this._config.pages?this._commit({...this._config,pages:this._config.pages.map(e=>e.id===this._editingPageId?{...e,widgets:t}:e)}):this._commit({...this._config,widgets:t})}_updateWidget(t,e){const i=[...this._widgets];i[t]=e,this._setWidgets(i)}_widgetChanged(t,e){t.stopPropagation();const i=this._widgets[e];this._updateWidget(e,ti({...t.detail.value,...this._config.pages&&"menu"===i.type?{items:i.items}:{},type:i.type}))}_cardYamlChanged(t,e){t.stopPropagation(),!1!==t.detail.isValid?(this._yamlError=void 0,this._updateWidget(e,{...this._widgets[e],card:t.detail.value})):this._yamlError="Invalid YAML"}_add(t){const e={type:t,...Ue[t].defaults},i=[...this._widgets,e];this._adding=!1,this._selected=i.length-1,this._setWidgets(i)}_move(t,e){const i=[...this._widgets],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._setWidgets(i))}_remove(t){const e=this._widgets.filter((e,i)=>i!==t);this._selected=void 0,this._setWidgets(e)}_duplicate(t){const e=[...this._widgets];e.splice(t+1,0,structuredClone(e[t])),this._setWidgets(e)}_addPage(){const t=this._config.pages;let e;do{e=`page-${Date.now().toString(36)}-${++ei}`}while(t?.some(t=>t.id===e));if(!t){const t=this._config.widgets.find(t=>"menu"===t.type),i={id:e,name:"Home",widgets:t?this._config.widgets:[...this._config.widgets,{type:"menu"}]};this._editingPageId=i.id,this._expandedPageId=i.id;const s=t?ti({title:t.title,direction:t.direction,show_icons:t.show_icons,font_size:t.font_size}):{};return this._commit({...this._config,widgets:[],pages:[i],shared_menu:s}),void window.dispatchEvent(new CustomEvent("yad-editor-page-selected",{detail:{page:i.id}}))}const i={id:e,name:`Page ${t.length+1}`,widgets:[{type:"menu"}]};this._editingPageId=i.id,this._expandedPageId=i.id,this._adding=!1,this._commit({...this._config,pages:[...t,i]}),window.dispatchEvent(new CustomEvent("yad-editor-page-selected",{detail:{page:i.id}}))}_editPage(t){this._editingPageId=t,this._adding=!1,window.dispatchEvent(new CustomEvent("yad-editor-page-selected",{detail:{page:t}}))}_sharedMenuChanged(t){t.stopPropagation();const{title:e,direction:i,show_icons:s,font_size:a}=t.detail.value;this._commit({...this._config,shared_menu:ti({title:e,direction:i,show_icons:s,font_size:a})})}_pageChanged(t,e){t.stopPropagation();const i=t.detail.value,s=this._config.pages.map(t=>t.id===e?{...t,name:i.name??"",icon:i.icon||void 0,background_media:i.background_media||void 0}:t);this._commit({...this._config,pages:s})}_movePage(t,e){const i=[...this._config.pages],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._commit({...this._config,pages:i}))}_removePage(t){const e=this._config.pages.filter(e=>e.id!==t);e.length&&(this._editingPageId===t&&(this._editingPageId=e[0].id),this._expandedPageId===t&&(this._expandedPageId=void 0),this._removingPageId=void 0,this._adding=!1,this._selected=void 0,this._commit({...this._config,pages:e}),window.dispatchEvent(new CustomEvent("yad-editor-page-selected",{detail:{page:this._editingPageId}})))}_summary(t){if(t.title)return t.title;const e=t.entity?[t.entity]:(t.entities??[]).map(t=>"string"==typeof t?t:t.entity);return t.power_entity&&e.push(t.power_entity),"card"===t.type?t.card?.type??"":e.map(t=>this.hass?.states[t]?.attributes.friendly_name??t).slice(0,3).join(", ")}_set(t){this._commit(ti({...this._config,...t}))}_setCustomColor(t,e,i){const s=this._config.custom_palette??{},a=ti({...s[t],[e]:i}),o=ti({...s,[t]:Object.keys(a).length?a:void 0});this._set({custom_palette:Object.keys(o).length?o:void 0})}_renderLook(){const t=this._config,e=t.palette??"hearth",i="ha"===t.theme,s=t=>W`<span class="mini" style="background:${t.background}">
        <i style="background:${t.surface}"></i><i style="background:${t.accent}"></i><i style="background:${t.success}"></i><i style="background:${t.text}"></i>
      </span>`;return W`<details class="section palette-section">
      <summary class="section-title"><ha-icon icon="mdi:palette-outline"></ha-icon>Colour palette · ${i?"Home Assistant":zt[e]?.label??"Custom"}</summary>
      ${i?W`<p class="hint">Palettes are ignored while “Use my HA theme” is selected above.</p>`:K}
      <div class="palettes ${i?"disabled":""}">
        ${Object.entries(zt).map(([t,i])=>W`<button class="palette ${e===t?"selected":""}" @click=${()=>this._set({palette:t})}>
            <span class="pair">${s(i.light)}${s(i.dark)}</span>
            <span class="p-name">${i.label}</span>
            <span class="p-desc">${i.description}</span>
          </button>`)}
        <button class="palette ${"custom"===e?"selected":""}" @click=${()=>this._set({palette:"custom"})}>
          <span class="pair"><span class="mini rainbow"></span></span>
          <span class="p-name">Custom</span>
          <span class="p-desc">Pick your own colours</span>
        </button>
      </div>

      ${"custom"!==e||i?K:["light","dark"].map(e=>W`<div class="custom">
              <div class="sub-title">${"light"===e?"Light mode colours":"Dark mode colours"}</div>
              <div class="pickers">
                ${Xe.map(([i,s])=>W`<yad-color-picker
                    .label=${s}
                    .value=${t.custom_palette?.[e]?.[i]}
                    .placeholder=${zt.hearth[e][i]}
                    @value-changed=${t=>{t.stopPropagation(),this._setCustomColor(e,i,t.detail.value)}}
                  ></yad-color-picker>`)}
              </div>
            </div>`)}

      <div class="sub-title">Accent override (optional)</div>
      <yad-color-picker
        .label=${"Accent colour — applies to any palette"}
        .value=${t.accent_color}
        @value-changed=${t=>{t.stopPropagation(),this._set({accent_color:t.detail.value})}}
      ></yad-color-picker>
    </details>`}render(){return this._config&&this.hass?void 0!==this._selected?this._renderWidgetEditor(this._selected):W`
      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:monitor-screenshot"></ha-icon>Screen & layout</div>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${(t=>{const e=t.screen??"fill";return[{type:"grid",name:"",schema:[Ke("screen",[["fill","Fill available space"],...Object.entries(Dt).map(([t,e])=>[t,e.label]),["custom","Custom resolution…"]]),Ke("orientation",[["auto","Auto (detect)"],["landscape","Landscape"],["portrait","Portrait"]]),..."custom"===e?[Ye("screen_width",320,7680,"px"),Ye("screen_height",320,7680,"px")]:[],..."fill"!==e?[Ke("ui_scale",[["auto","Auto"],["1","100%"],["1.25","125%"],["1.5","150%"],["1.75","175%"],["2","200%"],["3","300%"]])]:[],Ye("columns",1,16),Ye("portrait_columns",1,32),..."fill"===e?[Ke("height",[["screen","Fill the screen"],["auto","Fixed row height (scrolls)"]],!0),Ye("row_height",60,600,"px",10)]:[],{name:"fill_from_top",selector:{boolean:{}}},..."fill"!==e?[Ye("row_height",60,600,"px",10)]:[],Ye("gap",0,48,"px")]},{type:"grid",name:"",schema:[Ke("theme",[["auto","Auto (follow HA light/dark)"],["light","Light"],["dark","Dark"],["ha","Use my HA theme (ignores palette)"]])]}]})(this._config)}
          .computeLabel=${this._label}
          @value-changed=${this._generalChanged}
        ></ha-form>
        ${this._config.screen&&"fill"!==this._config.screen?W`<p class="hint">
              The dashboard is laid out for this exact resolution and scaled to fit whatever screen it's viewed on, so the
              preview here matches the wall display. <b>UI scale</b> works like your OS display scaling — Auto renders 4K like
              1080p but sharper.
            </p>`:K}
      </div>

      ${this._renderLook()}

      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:image-outline"></ha-icon>Background image</div>
        <ha-form .hass=${this.hass} .data=${{background_opacity:100,background_blur:0,background_fit:"cover",background_position:"center",...this._config}}
          .schema=${Je} .computeLabel=${this._label} @value-changed=${this._backgroundChanged}></ha-form>
        <p class="hint">Browse Home Assistant media or upload an image with the image picker. Alternatively enter an image URL. Selecting one replaces the other.</p>
      </div>

      <details class="section pages-section" ?open=${this._pagesOpen} @toggle=${t=>this._pagesOpen=t.currentTarget.open}>
        <summary class="section-title"><ha-icon icon="mdi:view-dashboard-outline"></ha-icon>Pages & menu</summary>
        ${this._config.pages?W`
              <p class="hint">Each page has its own widgets. Menu widgets show these pages in this order; names, icons and pictures are shared.</p>
              <ha-form .hass=${this.hass}
                .data=${{direction:"vertical",show_icons:!0,...this._config.shared_menu}}
                .schema=${Ue.menu.schema.filter(t=>"items"!==t.name)}
                .computeLabel=${this._label} @value-changed=${this._sharedMenuChanged}></ha-form>
              ${this._config.pages.map((t,e)=>W`
                <div class="page">
                  <div class="row">
                    <button class="page-toggle" aria-expanded=${t.id===this._expandedPageId?"true":"false"}
                      @click=${()=>{this._expandedPageId=this._expandedPageId===t.id?void 0:t.id,this._removingPageId=void 0}}>
                      <ha-icon icon=${t.id===this._expandedPageId?"mdi:chevron-down":"mdi:chevron-right"}></ha-icon>
                      <span class="row-title">${t.name||"Unnamed page"}${t.id===this._editingPageId?" · editing widgets":""}</span>
                    </button>
                    <button title="Move page up" ?disabled=${0===e} @click=${()=>this._movePage(e,-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                    <button title="Move page down" ?disabled=${e===this._config.pages.length-1} @click=${()=>this._movePage(e,1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                    <button title="Remove page" class="danger" ?disabled=${1===this._config.pages.length} @click=${()=>{this._expandedPageId=t.id,this._removingPageId=t.id}}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
                  </div>
                  ${t.id===this._expandedPageId?W`
                    <ha-form .hass=${this.hass} .data=${t} .schema=${Ze}
                      .computeLabel=${t=>({name:"Page name",icon:"Menu icon",background_media:"Menu button background image"}[t.name]??t.name)}
                      @value-changed=${e=>this._pageChanged(e,t.id)}></ha-form>
                    <button class="text-btn" @click=${()=>this._editPage(t.id)}>Edit this page's widgets</button>
                    ${this._removingPageId===t.id?W`
                      <p class="hint">Remove this page and all its widgets?</p>
                      <button class="text-btn danger" @click=${()=>this._removePage(t.id)}>Remove page</button>
                      <button class="text-btn" @click=${()=>this._removingPageId=void 0}>Cancel</button>
                    `:K}
                  `:K}
                </details>
              `)}
              <button class="add" @click=${this._addPage}><ha-icon icon="mdi:plus"></ha-icon>Add page</button>
            `:W`
              <p class="hint">Create internal pages with a shared menu. Your current widgets become the first page, and a menu is added if needed. Existing menu widgets will show the shared pages instead of their external links.</p>
              <button class="add" @click=${this._addPage}><ha-icon icon="mdi:plus"></ha-icon>Set up pages</button>
            `}
      </div>

      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:tune-variant"></ha-icon>Behaviour</div>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${Ge}
          .computeLabel=${this._label}
          @value-changed=${this._generalChanged}
        ></ha-form>
      </div>

      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:view-grid-outline"></ha-icon>Widgets${this._config.pages?` · ${this._config.pages.find(t=>t.id===this._editingPageId)?.name||"Unnamed page"}`:""}</div>
        <div class="list">
          ${this._widgets.map((t,e)=>{const i=Ue[t.type];return W`<div class="row">
              <ha-icon class="type-icon" icon=${i?.icon??"mdi:help-circle-outline"}></ha-icon>
              <div class="row-text" @click=${()=>this._selected=e}>
                <div class="row-title">${i?.label??t.type}</div>
                <div class="row-sub">${this._summary(t)}</div>
              </div>
              <button title="Move up" ?disabled=${0===e} @click=${()=>this._move(e,-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button title="Move down" ?disabled=${e===this._widgets.length-1} @click=${()=>this._move(e,1)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button title="Duplicate" @click=${()=>this._duplicate(e)}><ha-icon icon="mdi:content-copy"></ha-icon></button>
              <button title="Edit" @click=${()=>this._selected=e}><ha-icon icon="mdi:pencil"></ha-icon></button>
              <button title="Remove" class="danger" @click=${()=>this._remove(e)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            </div>`})}
        </div>
        ${this._adding?W`<div class="picker">
              ${Object.keys(Ue).map(t=>W`<button class="pick" @click=${()=>this._add(t)}>
                  <ha-icon icon=${Ue[t].icon}></ha-icon><span>${Ue[t].label}</span>
                </button>`)}
            </div>
            <button class="text-btn" @click=${()=>this._adding=!1}>Cancel</button>`:W`<button class="add" @click=${()=>this._adding=!0}><ha-icon icon="mdi:plus"></ha-icon>Add widget</button>`}
      </div>
      <div class="footer">
        YAD v${Ne} ·
        <a href="https://github.com/therealcarnivor/YAD-Dashboard/releases" target="_blank" rel="noreferrer">Release notes</a>
      </div>
    `:K}_renderWidgetEditor(t){const e=this._widgets[t],i=Ue[e.type],s={...i?.defaults,...e},a=Array.isArray(e.entities)&&e.entities.some(t=>"string"!=typeof t),o=this._config.pages&&"menu"===e.type?[]:(i?.schema??[]).filter(t=>!(a&&"entities"===t.name));return W`
      <div class="editor-head">
        <button @click=${()=>this._selected=void 0} title="Back"><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <ha-icon icon=${i?.icon??"mdi:help"}></ha-icon>
        <span>${i?.label??e.type}</span>
      </div>
      ${a?W`<p class="hint">This widget's entities use custom names/colours/icons — edit them in the code editor (Show code editor).</p>`:K}
      ${this._config.pages&&"menu"===e.type?W`<p class="hint">Menu buttons are configured in Pages & menu.</p>`:K}
      ${o.length?W`<div class="section">
            <ha-form
              .hass=${this.hass}
              .data=${s}
              .schema=${o}
              .computeLabel=${this._label}
              @value-changed=${e=>this._widgetChanged(e,t)}
            ></ha-form>
          </div>`:K}
      ${"card"===e.type?W`<div class="section">
            <div class="section-title"><ha-icon icon="mdi:code-braces"></ha-icon>Card configuration (YAML)</div>
            <p class="hint">Paste the YAML of any Home Assistant card — built-in or custom.</p>
            <ha-yaml-editor
              .hass=${this.hass}
              .defaultValue=${e.card}
              @value-changed=${e=>this._cardYamlChanged(e,t)}
            ></ha-yaml-editor>
            ${this._yamlError?W`<div class="error">${this._yamlError}</div>`:K}
          </div>`:K}
      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:arrow-expand-all"></ha-icon>Size & placement</div>
        <ha-form
          .hass=${this.hass}
          .data=${s}
          .schema=${"spacer"===e.type?qe:[...Le,{type:"grid",name:"",schema:[{name:"auto_height",selector:{boolean:{}}},...e.auto_height?[Ye("auto_height_max",60,2e3,"px",10)]:[]]}]}
          .computeLabel=${this._label}
          @value-changed=${e=>this._widgetChanged(e,t)}
        ></ha-form>
        ${"spacer"!==e.type?W`<p class="hint">Automatic height shrinks this widget's grid space to fit its content (in quarter rows, never taller than its row span) so widgets below move up. On fixed or full-screen layouts, widgets without automatic height grow to use the freed space. Content taller than the maximum scrolls.</p>`:K}
      </div>
    `}};ii.styles=n`
    :host {
      display: block;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 1.05rem;
      margin-bottom: 10px;
    }
    .section-title ha-icon {
      color: var(--primary-color);
    }
    summary.section-title { cursor: pointer; }
    summary.section-title::before { content: "+"; }
    details[open] > summary.section-title::before { content: "-"; }
    .list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .page { padding: 10px 0; border-bottom: 1px solid var(--divider-color); }
    button.page-toggle {
      flex: 1;
      min-width: 0;
      width: auto;
      height: auto;
      justify-content: flex-start;
      gap: 6px;
      border-radius: 6px;
      color: var(--primary-text-color);
      text-align: left;
    }
    .page-toggle .row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .row {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 6px 6px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
    }
    .type-icon {
      color: var(--primary-color);
      margin-right: 8px;
    }
    .row-text {
      flex: 1;
      min-width: 0;
      cursor: pointer;
    }
    .row-title {
      font-weight: 500;
    }
    .row-sub {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    button {
      all: unset;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: var(--secondary-text-color);
    }
    button:hover {
      background: var(--secondary-background-color);
    }
    button[disabled] {
      opacity: 0.3;
      cursor: default;
    }
    button.danger:hover {
      color: var(--error-color);
    }
    button.add,
    button.text-btn {
      width: auto;
      height: auto;
      border-radius: 10px;
      padding: 8px 14px;
      margin-top: 10px;
      gap: 6px;
      color: var(--primary-color);
      font-weight: 500;
    }
    .picker {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 8px;
      margin-top: 10px;
    }
    button.pick {
      width: auto;
      height: auto;
      border-radius: 12px;
      padding: 12px;
      gap: 10px;
      justify-content: flex-start;
      border: 1px solid var(--divider-color);
      color: var(--primary-text-color);
    }
    button.pick ha-icon {
      color: var(--primary-color);
    }
    .editor-head {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 16px;
    }
    .editor-head ha-icon {
      color: var(--primary-color);
    }
    .hint {
      margin: 0 0 8px;
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .error {
      color: var(--error-color);
      margin-top: 6px;
    }
    .footer {
      margin-top: 8px;
      text-align: center;
      font-size: 0.8em;
      color: var(--secondary-text-color);
    }
    .footer a {
      color: var(--primary-color);
    }
    .palettes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 8px;
    }
    .palettes.disabled {
      opacity: 0.45;
      pointer-events: none;
    }
    button.palette {
      width: auto;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      padding: 10px;
      border-radius: 14px;
      border: 1px solid var(--divider-color);
      color: var(--primary-text-color);
    }
    button.palette.selected {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color);
    }
    .pair {
      display: flex;
      gap: 4px;
      width: 100%;
      margin-bottom: 6px;
    }
    .mini {
      flex: 1;
      height: 34px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
    }
    .mini i {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    }
    .mini i:first-child {
      width: 14px;
      height: 18px;
      border-radius: 4px;
    }
    .mini.rainbow {
      background: conic-gradient(#f87171, #fbbf24, #a3e635, #34d399, #38bdf8, #a78bfa, #f472b6, #f87171);
    }
    .p-name {
      font-weight: 600;
      font-size: 0.92em;
    }
    .p-desc {
      font-size: 0.78em;
      color: var(--secondary-text-color);
    }
    .sub-title {
      font-weight: 600;
      margin: 16px 0 8px;
    }
    .pickers {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 8px;
    }
  `,t([ut({attribute:!1})],ii.prototype,"hass",void 0),t([mt()],ii.prototype,"_config",void 0),t([mt()],ii.prototype,"_selected",void 0),t([mt()],ii.prototype,"_adding",void 0),t([mt()],ii.prototype,"_yamlError",void 0),t([mt()],ii.prototype,"_editingPageId",void 0),t([mt()],ii.prototype,"_removingPageId",void 0),t([mt()],ii.prototype,"_pagesOpen",void 0),t([mt()],ii.prototype,"_expandedPageId",void 0),ii=t([ht("yad-card-editor")],ii);const si="yad-card",ai="yad-card-editor",oi="hearth-dashboard-card",ni={theme:"auto",palette:"hearth",orientation:"auto",screen:"fill",columns:4,portrait_columns:2,height:"screen",row_height:90,fill_from_top:!1,gap:8,display_only:!1,hide_cursor:!1};let ri=class extends dt{constructor(){super(...arguments),this.preview=!1,this._portraitMedia=window.matchMedia("(orientation: portrait)").matches,this._size={width:0,top:0},this._pageId=new URL(window.location.href).searchParams.get("yad-page")??"",this._backgroundRequest=0,this._mql=window.matchMedia("(orientation: portrait)"),this._onOrientation=t=>this._portraitMedia=t.matches,this._resizeObserver=new ResizeObserver(()=>this._measure()),this._onWindowResize=()=>this._measure(),this._onLocation=()=>{this.preview||this._selectPage(new URL(window.location.href).searchParams.get("yad-page")??"")},this._onEditorPage=t=>{this.preview&&t instanceof CustomEvent&&"string"==typeof t.detail?.page&&this._selectPage(t.detail.page)},this._autoSpans={},this._fitPasses=0,this._autoObserver=new ResizeObserver(()=>this._scheduleFit()),this._navigatePage=t=>{t.stopPropagation();const e=t.detail.page;if(!this._config?.pages?.some(t=>t.id===e))return;if(this.preview)return void this._selectPage(e);const i=new URL(window.location.href);i.searchParams.set("yad-page",e),window.history.pushState(null,"",i),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}}_measure(){const t=this.getBoundingClientRect(),e=Math.max(0,t.top+window.scrollY);Math.abs(t.width-this._size.width)>.5||Math.abs(e-this._size.top)>.5?this._size={width:t.width,top:e}:this._config?.screen&&"fill"!==this._config.screen&&this.requestUpdate()}static getConfigElement(){return document.createElement(ai)}static getStubConfig(t){const e=Object.keys(t?.states??{}),i=(t,i)=>e.filter(e=>e.startsWith(`${t}.`)).slice(0,i),s=[{type:"clock",col_span:2,row_span:1,transparent:!0}],a=i("person",4);a.length&&(s[0].entities=a);const o=i("weather",1)[0];o&&s.push({type:"weather",entity:o,col_span:2,row_span:2});const n=i("calendar",3);n.length&&s.push({type:"calendar",entities:n,col_span:1,row_span:3});const r=i("climate",1)[0];r&&s.push({type:"climate",entity:r,col_span:1,row_span:2});const c=i("light",6);return c.length&&s.push({type:"toggles",entities:c,col_span:2,row_span:1}),{theme:"auto",columns:4,portrait_columns:2,widgets:s}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(void 0!==t.widgets&&!Array.isArray(t.widgets))throw new Error("`widgets` must be a list");if(!(void 0===t.pages||Array.isArray(t.pages)&&t.pages.length))throw new Error("`pages` must be a non-empty list");const e=new Set;for(const i of t.pages??[]){if(!i||"string"!=typeof i.id||!i.id||"string"!=typeof i.name||!Array.isArray(i.widgets))throw new Error("Every page needs an ID, name and widget list");if(e.has(i.id))throw new Error("Page IDs must be unique");e.add(i.id)}for(const e of[...t.widgets??[],...(t.pages??[]).flatMap(t=>t.widgets)]){if(!e||"object"!=typeof e||!e.type)throw new Error("Every widget needs a `type`");if(void 0!==e.auto_height_max&&(!Number.isFinite(e.auto_height_max)||e.auto_height_max<60))throw new Error("Automatic height limit must be at least 60px");if("spacer"===e.type)for(const t of["row_span","portrait_row_span"])if(void 0!==e[t]&&![.25,.5,.75,1].includes(e[t]))throw new Error(`Spacer ${t} must be 0.25, 0.5, 0.75 or 1`)}const i={...t,widgets:He(t.widgets??[]),...t.pages?{pages:t.pages.map(t=>({...t,widgets:He(t.widgets)}))}:{}};Reflect.deleteProperty(i,"layout_mode"),this._config=i,this._autoSpans={},this._packedTrack=void 0,this._fitPasses=0}getCardSize(){return 12}getGridOptions(){return{columns:"full",rows:"auto"}}connectedCallback(){super.connectedCallback(),this._mql.addEventListener("change",this._onOrientation),this._portraitMedia=this._mql.matches,this._resizeObserver.observe(this),window.addEventListener("resize",this._onWindowResize),window.addEventListener("location-changed",this._onLocation),window.addEventListener("popstate",this._onLocation),window.addEventListener("yad-editor-page-selected",this._onEditorPage),this._onLocation(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this._mql.removeEventListener("change",this._onOrientation),this._resizeObserver.disconnect(),this._autoObserver.disconnect(),this._fitFrame&&cancelAnimationFrame(this._fitFrame),this._fitFrame=void 0,window.removeEventListener("resize",this._onWindowResize),window.removeEventListener("location-changed",this._onLocation),window.removeEventListener("popstate",this._onLocation),window.removeEventListener("yad-editor-page-selected",this._onEditorPage),window.clearTimeout(this._backgroundTimer),this._backgroundRequest++,this._backgroundKey=void 0}updated(){this._autoObserver.disconnect();const t=this.renderRoot.querySelector(".grid"),e=this.renderRoot.querySelectorAll(".tile.auto-height");t&&e.length&&(this._autoObserver.observe(t),e.forEach(t=>t.firstElementChild&&this._autoObserver.observe(t.firstElementChild)),this._scheduleFit());const i=this._config?.background_media?.media_content_id||this._config?.background;i!==this._backgroundKey&&(i?.startsWith("media-source://")&&!this.hass||(this._backgroundKey=i,this._resolveBackground(i)))}_scheduleFit(){this._fitFrame||(this._fitFrame=requestAnimationFrame(()=>{this._fitFrame=void 0,this._fitAutomaticHeights()}))}_fitAutomaticHeights(){const t=this.renderRoot.querySelector(".grid");if(!t||!this.isConnected)return;const e=getComputedStyle(t);let i=parseFloat(e.gridTemplateRows);const s=parseFloat(e.rowGap)||0;if(!Number.isFinite(i)||i<=0)return;if(this.renderRoot.querySelector(".packed")){const e=`${this._portrait}|${t.clientWidth}x${t.clientHeight}`;if(this._packedTrack?.key!==e){const t=this._portrait?"p":"l",s=Object.keys(this._autoSpans).some(e=>e.startsWith(t));if(s||this._packedTrack)return this._autoSpans=Object.fromEntries(Object.entries(this._autoSpans).filter(([e])=>!e.startsWith(t))),void(this._packedTrack=void 0);this._packedTrack={key:e,track:i}}i=this._packedTrack.track}const a={...this._autoSpans};let o=!1;this.renderRoot.querySelectorAll(".tile.auto-height").forEach(t=>{const e=t.firstElementChild,n=t.dataset.autoKey,r=Number(t.dataset.maxRows);if(!(e&&n&&r>0))return;const c=getComputedStyle(t),d=parseFloat(c.paddingTop)+parseFloat(c.paddingBottom)+parseFloat(c.borderTopWidth)+parseFloat(c.borderBottomWidth),l=parseFloat(c.getPropertyValue("--auto-max"))||600,h=r*i+(r-1)*s;t.style.setProperty("--auto-content-max",`${Math.max(16,Math.min(l,h)-d)}px`);const p=e.offsetHeight+d,g=Math.min(r,Math.max(1,Math.ceil((p+s-.5)/(i+s))));a[n]!==g&&(a[n]=g,o=!0)}),o?++this._fitPasses>12||(this._autoSpans=a):this._fitPasses=0}async _resolveBackground(t){const e=++this._backgroundRequest;if(window.clearTimeout(this._backgroundTimer),this._backgroundError=void 0,t?.startsWith("media-source://"))try{const i=await Pt(this.hass,t);if(e!==this._backgroundRequest)return;this._backgroundUrl=i,this._backgroundTimer=window.setTimeout(()=>{this._resolveBackground(t)},828e5)}catch(i){if(e!==this._backgroundRequest)return;this._backgroundUrl=void 0,this._backgroundError=i instanceof Error?i.message:"Could not load background media",this._backgroundTimer=window.setTimeout(()=>{this._resolveBackground(t)},6e4)}else this._backgroundUrl=t}shouldUpdate(t){if(!this._config)return!1;if(1===t.size&&t.has("hass")){const e=t.get("hass");return this._pushHass(),!e||e.themes?.darkMode!==this.hass?.themes?.darkMode}return!0}_pushHass(){this.renderRoot?.querySelectorAll(".tile > *").forEach(t=>t.hass=this.hass)}get _portrait(){const t=this._config?.orientation??ni.orientation;return"portrait"===t||"auto"===t&&this._portraitMedia}get _themeClass(){const t=this._config?.theme??ni.theme;return"auto"===t?this.hass?.themes?.darkMode?"dark":"light":t}_selectPage(t){t!==this._pageId&&(this._pageId=t,this._autoSpans={},this._packedTrack=void 0,this._fitPasses=0)}_renderWidget(t,e,i,s,a){const o=Ue[t.type],n=!!this._config.display_only,r=this._config.pages,c=r?.find(t=>t.id===this._pageId)??r?.[0],d={...o?.defaults,...t,..."menu"===t.type&&r?{page_mode:!0,active_page:c?.id,title:this._config.shared_menu?.title,direction:this._config.shared_menu?.direction??"vertical",show_icons:this._config.shared_menu?.show_icons??!0,font_size:this._config.shared_menu?.font_size,items:r.map(t=>({name:t.name||t.id,path:t.id,icon:t.icon,background_media:t.background_media}))}:{}},l=Math.min(s,Math.max(1,(i?d.portrait_col_span:void 0)??d.col_span??1)),h=(i?d.portrait_row_span:void 0)??d.row_span??1,p="spacer"===t.type?h:Math.max(1,Math.round(h)),g=!!d.auto_height&&"spacer"!==t.type,u=Math.round(p*(a?4:1)),m=`${i?"p":"l"}${e}`,f={gridColumn:`span ${l}`,gridRow:`span ${(g?this._autoSpans[m]:void 0)??u}`,...g?{"--auto-max":`${d.auto_height_max??600}px`}:{}};if(!o)return W`<div class="tile error" style=${kt(f)}>Unknown widget type “${t.type}”</div>`;const _=(t=>({_$litStatic$:t,r:St}))(o.tag);return W`<div class=${yt({tile:!0,"auto-height":g,transparent:!!d.transparent,[`w-${t.type}`]:!0})} style=${kt(f)}
      data-auto-key=${g?m:K} data-max-rows=${g?u:K}>
      ${Ct`<${_} .hass=${this.hass} .config=${d} .displayOnly=${n} .autoHeight=${g}></${_}>`}
    </div>`}_fixedScreen(t,e){const i=t.screen??ni.screen;if("fill"===i)return;const s=Dt[i];let a=s?.width??Number(t.screen_width),o=s?.height??Number(t.screen_height);if(!(a>0&&o>0))return;e!==o>a&&([a,o]=[o,a]);const n=Number(t.ui_scale),r=n>0?n:((t,e)=>{const i=Math.min(t,e);return Math.max(1,Math.round(i/1080*2)/2)})(a,o);return{width:Math.round(a/r),height:Math.round(o/r),scale:r}}render(){if(!this._config)return K;const t={...ni,...this._config},e=t.pages?.find(t=>t.id===this._pageId)??t.pages?.[0],i=e?.widgets??t.widgets,s=this._portrait,a=Math.max(1,s?t.portrait_columns:t.columns),o=this._fixedScreen(t,s),n=!!o||"auto"!==t.height,r=i.filter(t=>{const e=t.visibility??"all";return"all"===e||"portrait"===e===s}),c=r.some(t=>"spacer"===t.type||t.auto_height&&Ue[t.type]),d=n&&r.some(t=>t.auto_height&&"spacer"!==t.type)&&!r.some(t=>!t.auto_height&&"spacer"!==t.type),l=c?Math.min(t.gap,Math.max(0,(t.row_height-4)/3)):t.gap,h=this._themeClass,p={"--cols":String(a),"--gap":`${t.gap}px`,"--row-height":`${t.row_height}px`,"--row-gap":`${l}px`,...d&&this._packedTrack?{"--packed-track":`${this._packedTrack.track}px`}:{},..."ha"===h?{}:It(Rt(t.palette,"dark"===h,t.custom_palette),"dark"===h)};t.accent_color&&(p["--h-accent"]=t.accent_color,p["--h-accent-soft"]=`color-mix(in srgb, ${t.accent_color} 15%, transparent)`);let g={};if(o){const e=this._size.width||o.width,i=this.preview||"auto"===t.height?1/0:Math.max(240,window.innerHeight-this._size.top),s=Math.min(e/o.width,i/o.height),a=Number.isFinite(i)?i:o.height*s;p.height=`${Math.floor(a)}px`,g={width:`${o.width}px`,height:`${o.height}px`,transform:`scale(${s})`,left:`${Math.max(0,(e-o.width*s)/2)}px`,top:`${Math.max(0,(a-o.height*s)/2)}px`,visibility:this._size.width?"visible":"hidden"}}else p.height="screen"===t.height?this.preview?"640px":"100dvh":"auto"===t.height?"auto":t.height;return W`
      <div
        class=${yt({yad:!0,[h]:!0,portrait:s,landscape:!s,fill:n,fixed:!!o,"display-only":t.display_only,"hide-cursor":t.hide_cursor,"has-bg":!!this._backgroundUrl,"quarter-rows":c,packed:d,"from-top":n&&!!t.fill_from_top})}
        style=${kt(p)}
      >
        ${this._backgroundUrl?W`<img class="background-image" src=${this._backgroundUrl} alt=""
          style=${kt({opacity:String(Math.min(100,Math.max(0,t.background_opacity??100))/100),filter:`blur(${Math.min(30,Math.max(0,t.background_blur??0))}px)`,objectFit:t.background_fit??"cover",objectPosition:t.background_position??"center"})}
          @error=${()=>{this._backgroundError="Background image could not be loaded. Check its URL and access permissions."}}
        >`:K}
        ${this._backgroundError?W`<div class="background-error" role="alert">${this._backgroundError}</div>`:K}
        <div class="canvas" style=${kt(g)}>
          <div class="grid" @yad-page-selected=${this._navigatePage}>
            ${bt(e?.id??"",r.length?r.map(t=>this._renderWidget(t,i.indexOf(t),s,a,c)):W`<div class="tile intro">Add some widgets in the card editor to get started.</div>`)}
          </div>
        </div>
      </div>
    `}};ri.styles=[Ut,n`
      :host {
        display: block;
      }
      .yad {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        background: radial-gradient(120% 80% at 0% 0%, var(--h-bg-2) 0%, transparent 60%), var(--h-bg);
        color: var(--h-text);
        font-family: var(--h-font);
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
      }
      .yad.has-bg {
        background: var(--h-bg);
      }
      .background-image { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
      .background-error { position: relative; z-index: 1; padding: 8px 16px; color: var(--h-text); background: var(--h-surface); }
      .yad.has-bg .tile:not(.transparent) {
        backdrop-filter: blur(18px) saturate(1.2);
        -webkit-backdrop-filter: blur(18px) saturate(1.2);
      }
      .canvas {
        position: relative;
        box-sizing: border-box;
        padding: var(--gap);
        container-type: inline-size;
      }
      .fill .canvas {
        height: 100%;
      }
      .fixed .canvas {
        position: absolute;
        top: 0;
        transform-origin: 0 0;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
        grid-auto-rows: var(--row-height);
        grid-auto-flow: row dense;
        gap: var(--gap);
      }
      .quarter-rows .grid {
        row-gap: var(--row-gap);
        grid-auto-rows: calc((var(--row-height) - 3 * var(--row-gap)) / 4);
      }
      .fill .grid {
        height: 100%;
        grid-auto-rows: minmax(0, 1fr);
      }
      .fill.quarter-rows .grid { grid-auto-rows: minmax(0, 1fr); }
      .fill.packed .grid { grid-auto-rows: var(--packed-track, minmax(0, 1fr)); align-content: start; }
      .fill.from-top .grid {
        height: auto;
        align-content: start;
        grid-auto-rows: var(--row-height);
      }
      .fill.from-top.quarter-rows .grid {
        grid-auto-rows: calc((var(--row-height) - 3 * var(--row-gap)) / 4);
      }
      .tile.auto-height {
        align-self: start;
        max-height: 100%;
        box-sizing: border-box;
        --tile-padding: clamp(14px, 1.6cqw, 22px);
        --auto-content-max: max(16px, calc(var(--auto-max, 600px) - 2 * var(--tile-padding) - 2px));
      }
      .tile.w-spacer { padding: 0; }
      .tile {
        position: relative;
        min-width: 0;
        min-height: 0;
        overflow: hidden;
        padding: clamp(14px, 1.6cqw, 22px);
        border-radius: var(--h-radius);
        background: var(--h-surface);
        box-shadow: var(--h-shadow);
        border: 1px solid var(--h-border);
        animation: rise 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
      }
      .tile.transparent {
        background: transparent;
        box-shadow: none;
        border-color: transparent;
      }
      .tile.error,
      .tile.intro {
        display: grid;
        place-items: center;
        color: var(--h-muted);
        font-weight: 600;
        text-align: center;
      }
      .tile.intro {
        grid-column: 1 / -1;
        min-height: 160px;
      }
      .display-only .grid {
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
      }
      .hide-cursor,
      .hide-cursor * {
        cursor: none !important;
      }
      @keyframes rise {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .tile {
          animation: none;
        }
      }
    `],t([ut({attribute:!1})],ri.prototype,"hass",void 0),t([ut({type:Boolean})],ri.prototype,"preview",void 0),t([mt()],ri.prototype,"_config",void 0),t([mt()],ri.prototype,"_portraitMedia",void 0),t([mt()],ri.prototype,"_size",void 0),t([mt()],ri.prototype,"_backgroundUrl",void 0),t([mt()],ri.prototype,"_backgroundError",void 0),t([mt()],ri.prototype,"_pageId",void 0),t([mt()],ri.prototype,"_autoSpans",void 0),t([mt()],ri.prototype,"_packedTrack",void 0),ri=t([ht(si)],ri),customElements.get(oi)||customElements.define(oi,class extends ri{}),window.customCards=window.customCards||[],window.customCards.push({type:si,name:"YAD – Yet Another Dashboard",description:"A modular, widget-based home dashboard for wall tablets and kiosks.",preview:!1,documentationURL:"https://github.com/therealcarnivor/YAD-Dashboard"}),console.info(`%c YAD %c ${Ne} `,"color:#fff;background:#d4774f;font-weight:700;border-radius:4px 0 0 4px","color:#d4774f;background:#f3eee7;border-radius:0 4px 4px 0");export{si as CARD_TAG,ai as EDITOR_TAG,ri as YadCard};
