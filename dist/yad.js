function t(t,e,i,s){var a,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(a=t[r])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",y=m.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=a.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const o=this.constructor;if(!1===s&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,y?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,A=$.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+E,z=`<${M}>`,T=document,O=()=>T.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,D="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,j=/>/g,N=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,q=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=W(1),F=W(2),K=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),V=new WeakMap,G=T.createTreeWalker(T,129);function J(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let a,o=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===H?"!--"===c[1]?n=R:void 0!==c[1]?n=j:void 0!==c[2]?(q.test(c[2])&&(a=RegExp("</"+c[2],"g")),n=N):void 0!==c[3]&&(n=N):n===N?">"===c[0]?(n=a??H,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,r=c[1],n=void 0===c[3]?N:'"'===c[3]?I:L):n===I||n===L?n=N:n===R||n===j?n=H:(n=N,a=void 0);const h=n===N&&t[e+1].startsWith("/>")?" ":"";o+=n===H?i+z:l>=0?(s.push(r),i.slice(0,l)+C+i.slice(l)+E+h):i+E+(-2===l?e:h)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0;const n=t.length-1,r=this.parts,[c,l]=Z(t,e);if(this.el=Q.createElement(c,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&r.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[o++],i=s.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);r.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?at:"@"===n[1]?ot:it}),s.removeAttribute(t)}else t.startsWith(E)&&(r.push({type:6,index:a}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),G.nextNode(),r.push({type:2,index:++a});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===M)r.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)r.push({type:7,index:a}),t+=E.length-1}a++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===K)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=P(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);G.currentNode=s;let a=G.nextNode(),o=0,n=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new et(a,a.nextSibling,this,t):1===r.type?e=new r.ctor(a,r.name,r.strings,this,t):6===r.type&&(e=new nt(a,this,t)),this._$AV.push(e),r=i[++n]}o!==r?.index&&(a=G.nextNode(),o++)}return G.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),P(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Q(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new et(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(t,e=this,i,s){const a=this.strings;let o=!1;if(void 0===a)t=X(this,t,e,0),o=!P(t)||t!==this._$AH&&t!==K,o&&(this._$AH=t);else{const s=t;let n,r;for(t=a[0],n=0;n<a.length-1;n++)r=X(this,s[i+n],e,n),r===K&&(r=this._$AH[n]),o||=!P(r)||r!==this._$AH[n],r===Y?t=Y:t!==Y&&(t+=(r??"")+a[n+1]),this._$AH[n]=r}o&&!s&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class ot extends it{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??Y)===K)return;const i=this._$AH,s=t===Y&&i!==Y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==Y&&(i===Y||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=$.litHtmlPolyfillSupport;rt?.(Q,et),($.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;let lt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new et(e.insertBefore(O(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const dt=ct.litElementPolyfillSupport;dt?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},ut=(t=pt,e,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function mt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return mt({...t,state:!0,attribute:!1})}const ft=1,yt=t=>(...e)=>({_$litDirective$:t,values:e});let _t=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const vt=yt(class extends _t{constructor(t){if(super(t),t.type!==ft||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return K}}),bt="important",wt=" !"+bt,xt=yt(class extends _t{constructor(t){if(super(t),t.type!==ft||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(wt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?bt:""):i[t]=s}}return K}}),$t=Symbol.for(""),kt=t=>{if(t?.r===$t)return t?._$litStatic$},At=new Map,St=(t=>(e,...i)=>{const s=i.length;let a,o;const n=[],r=[];let c,l=0,d=!1;for(;l<s;){for(c=e[l];l<s&&void 0!==(o=i[l],a=kt(o));)c+=a+e[++l],d=!0;l!==s&&r.push(o),n.push(c),l++}if(l===s&&n.push(e[s]),d){const t=n.join("$$lit$$");void 0===(e=At.get(t))&&(n.raw=n,At.set(t,e=n)),i=r}return t(e,...i)})(B),Ct={hearth:{label:"Hearth",description:"Warm cream & terracotta",light:{background:"#f3eee7",surface:"#fffcf7",text:"#2f2a25",muted:"#8c8278",accent:"#d4774f",success:"#6f9273",info:"#5f8fb4",warm:"#e8a93a"},dark:{background:"#191714",surface:"#27231f",text:"#f3ece3",muted:"#a1978c",accent:"#eb956e",success:"#95b598",info:"#86b2d4",warm:"#f0b955"}},scandi:{label:"Scandi oak",description:"Pale oak, linen & charcoal",light:{background:"#f5f2ec",surface:"#fffefb",text:"#2b2926",muted:"#8a847b",accent:"#b0834f",success:"#7a9a7e",info:"#6f93ad",warm:"#dca44a"},dark:{background:"#1a1816",surface:"#252220",text:"#f1ece4",muted:"#a49c91",accent:"#d4a671",success:"#9dbb9f",info:"#93b4cc",warm:"#ecbb63"}},nordic:{label:"Nordic",description:"Cool greys & fjord blue",light:{background:"#eef1f4",surface:"#ffffff",text:"#1f2933",muted:"#7b8794",accent:"#4c7a9f",success:"#5f9488",info:"#5b8fc9",warm:"#e0a13a"},dark:{background:"#14181d",surface:"#20262e",text:"#e8edf2",muted:"#95a1ae",accent:"#7fb0d6",success:"#86c0b2",info:"#8ab8e6",warm:"#f0b955"}},cottage:{label:"Cottage garden",description:"Sage greens & soft stone",light:{background:"#eef1ea",surface:"#fbfcf8",text:"#26302a",muted:"#7d8a80",accent:"#6b8f5e",success:"#4f8a7a",info:"#5e8db0",warm:"#d99a3a"},dark:{background:"#161a16",surface:"#232923",text:"#e9eee6",muted:"#9aa597",accent:"#9cc08e",success:"#86c2b0",info:"#8fb6d4",warm:"#e9b65e"}},coastal:{label:"Coastal",description:"Sand, sea glass & teal",light:{background:"#f2f0ea",surface:"#fffdf8",text:"#1e3240",muted:"#7a8a92",accent:"#2f7f8c",success:"#6c9a7c",info:"#4f8fbf",warm:"#e3a24b"},dark:{background:"#0f1a20",surface:"#182a33",text:"#e6f0f2",muted:"#8ea6ae",accent:"#5fb7c2",success:"#8cc2a0",info:"#7fb6de",warm:"#f0b765"}},lavender:{label:"Lavender",description:"Soft lilac & blush",light:{background:"#f4f0f5",surface:"#fffcff",text:"#2e2633",muted:"#8a7f90",accent:"#8a6bb0",success:"#6f9a86",info:"#6a8fc7",warm:"#e0a24a"},dark:{background:"#18151c",surface:"#26202d",text:"#efe9f3",muted:"#a59cad",accent:"#b79ae0",success:"#93c2ab",info:"#95b4e4",warm:"#efba63"}},rose:{label:"Rosewood",description:"Dusty pink & warm plum",light:{background:"#f6efee",surface:"#fffbfa",text:"#33262a",muted:"#907d81",accent:"#b9616f",success:"#6f9a83",info:"#6a8db6",warm:"#e2a04c"},dark:{background:"#1b1415",surface:"#2a1f21",text:"#f4e9ea",muted:"#ab9a9d",accent:"#e28e9a",success:"#96c2a8",info:"#93b2d8",warm:"#efb866"}},urban:{label:"Urban loft",description:"Concrete grey & rust",light:{background:"#f0f0ee",surface:"#ffffff",text:"#1c1c1c",muted:"#7c7c78",accent:"#c2552d",success:"#5f8f6f",info:"#4f7fae",warm:"#d99a2b"},dark:{background:"#121212",surface:"#1f1f1f",text:"#f0f0ee",muted:"#9a9a96",accent:"#e8794f",success:"#86b996",info:"#7ea9d6",warm:"#ebb04c"}},indigo:{label:"Midnight indigo",description:"Ink blue & electric violet",light:{background:"#eef0f7",surface:"#ffffff",text:"#1d2040",muted:"#7c80a0",accent:"#5161d6",success:"#4f9a8a",info:"#4e8fd0",warm:"#e19d3c"},dark:{background:"#0e1020",surface:"#181b33",text:"#e8eaff",muted:"#9599c0",accent:"#8592ff",success:"#7fc6b6",info:"#86b7f0",warm:"#f0b95a"}}},Et=(t,e,i)=>`color-mix(in srgb, ${t} ${i}%, ${e})`,Mt=(t,e)=>`color-mix(in srgb, ${t} ${e}%, transparent)`,zt=(t,e)=>{const{background:i,surface:s,text:a,accent:o}=t,n=t.success??(e?"#95b598":"#6f9273"),r=t.info??(e?"#86b2d4":"#5f8fb4"),c=t.warm??(e?"#f0b955":"#e8a93a");return{"--h-bg":i,"--h-bg-2":Et(i,e?"#ffffff":a,e?94:95),"--h-surface":Mt(s,92),"--h-surface-2":Et(s,a,e?90:94),"--h-border":Mt(a,e?6:7),"--h-text":a,"--h-muted":t.muted??Et(a,s,55),"--h-accent":o,"--h-accent-soft":Mt(o,e?16:14),"--h-on-accent":e?i:"#ffffff","--h-sage":n,"--h-sage-soft":Mt(n,16),"--h-sky":r,"--h-amber":c,"--h-amber-soft":Mt(c,18),"--h-shadow":e?"0 1px 2px rgba(0, 0, 0, 0.3), 0 12px 32px -14px rgba(0, 0, 0, 0.6)":`0 1px 2px ${Mt(a,5)}, 0 10px 30px -12px ${Mt(a,14)}`}},Tt=(t,e,i)=>{const s=e?"dark":"light";if("custom"===t){const t=Ct.hearth[s],e=Object.fromEntries(Object.entries(i?.[s]??{}).filter(([,t])=>!!t)),a=e.text||e.surface?void 0:t.muted;return{...t,muted:a,...e}}return(Ct[t??"hearth"]??Ct.hearth)[s]},Ot={"720p":{label:"HD 720p (1280 × 720)",width:1280,height:720},"1080p":{label:"Full HD 1080p (1920 × 1080)",width:1920,height:1080},"1440p":{label:"QHD 1440p (2560 × 1440)",width:2560,height:1440},"4k":{label:"4K UHD (3840 × 2160)",width:3840,height:2160},wsvga:{label:'7" tablet (1024 × 600)',width:1024,height:600},wxga:{label:"Tablet 16:10 (1280 × 800)",width:1280,height:800},wuxga:{label:"Tablet 16:10 FHD (1920 × 1200)",width:1920,height:1200},ipad:{label:"iPad 4:3 (2048 × 1536)",width:2048,height:1536}},Pt=n`
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
`,Ut=n`
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
    margin-bottom: 12px;
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
    gap: 8px;
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
`,Dt=t=>(t??[]).map(t=>"string"==typeof t?{entity:t}:t).filter(t=>!!t&&"string"==typeof t.entity&&t.entity.length>0),Ht=(t,e,i)=>{t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))},Rt=(t,e)=>Ht(t,"hass-more-info",{entityId:e}),jt=t=>t.split(".")[0],Nt=(t,e,i="")=>e||t?.attributes.friendly_name||t?.entity_id||i,Lt=t=>!t||"unavailable"===t.state||"unknown"===t.state,It=t=>{if(!t||""===t.state||null===t.state)return;const e=Number(t.state);return Number.isFinite(e)?e:void 0},qt=t=>t?.locale?.language||t?.language||navigator.language,Wt=(t,e)=>{if(!e)return"—";if(t?.formatEntityState)try{return t.formatEntityState(e)}catch{}const i=e.attributes.unit_of_measurement,s=It(e),a=void 0!==s?Bt(t,s):Ft(e.state.replace(/_/g," "));return i?`${a} ${i}`:a},Bt=(t,e,i=1)=>new Intl.NumberFormat(qt(t),{maximumFractionDigits:i}).format(e),Ft=t=>t?t.charAt(0).toUpperCase()+t.slice(1):t,Kt=(t,e)=>{if("12"===e)return!0;if("24"===e)return!1;const i=t?.locale?.time_format;if("12"===i)return!0;if("24"===i)return!1;const s="system"===i?void 0:qt(t);return!0===new Intl.DateTimeFormat(s,{hour:"numeric"}).resolvedOptions().hour12},Yt=(t,e,i)=>new Intl.DateTimeFormat(qt(t),{hour:"numeric",minute:"2-digit",hour12:Kt(t,i)}).format(e),Vt=t=>new Date(t.getFullYear(),t.getMonth(),t.getDate()),Gt=(t,e)=>{const i=new Date(t);return i.setDate(i.getDate()+e),i},Jt=t=>{if(/^\d{4}-\d{2}-\d{2}$/.test(t)){const[e,i,s]=t.split("-").map(Number);return new Date(e,i-1,s)}return new Date(t)};class Zt extends lt{constructor(){super(...arguments),this.displayOnly=!1}shouldUpdate(t){if(1!==t.size||!t.has("hass"))return!0;const e=t.get("hass");return!e||!this.hass||(e.locale!==this.hass.locale||e.themes!==this.hass.themes||this.watchedEntities().some(t=>e.states[t]!==this.hass.states[t]))}callService(t,e,i){!this.displayOnly&&this.hass&&this.hass.callService(t,e,i)}}t([mt({attribute:!1})],Zt.prototype,"hass",void 0),t([mt({attribute:!1})],Zt.prototype,"config",void 0),t([mt({type:Boolean,reflect:!0,attribute:"display-only"})],Zt.prototype,"displayOnly",void 0);let Qt=class extends Zt{constructor(){super(...arguments),this._now=new Date}watchedEntities(){return[]}connectedCallback(){super.connectedCallback(),this._schedule()}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}_schedule(){const t=new Date;this._now=t;const e=this.config?.show_seconds?1e3-t.getMilliseconds():6e4-1e3*t.getSeconds()-t.getMilliseconds();this._timer=window.setTimeout(()=>this._schedule(),e+20)}render(){const t=this.config,e="auto"===t.time_format?void 0:t.time_format,i=Kt(this.hass,e);let s=Yt(this.hass,this._now,e),a="";if(i){const t=s.match(/^(.*?)\s*([ap]\.?\s?m\.?)$/i);t&&(s=t[1],a=t[2])}const o=String(this._now.getSeconds()).padStart(2,"0"),n=new Intl.DateTimeFormat(qt(this.hass),{weekday:"long",day:"numeric",month:"long"}).format(this._now),r=!1===t.greet_by_name?void 0:t.name||this.hass?.user?.name?.split(" ")[0];return B`
      <div class="clock">
        ${!1!==t.greeting?B`<div class="greeting">${c=this._now.getHours(),c<5?"Good night":c<12?"Good morning":c<18?"Good afternoon":"Good evening"}${r?B`, <span>${r}</span>`:""}</div>`:""}
        <div class="time num">
          ${s}${t.show_seconds?B`<span class="sec">${o}</span>`:""}${a?B`<span class="ampm">${a}</span>`:""}
        </div>
        ${!1!==t.show_date?B`<div class="date">${n}</div>`:""}
      </div>
    `;var c}};Qt.styles=[Ut,n`
      .clock {
        flex: 1;
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
    `],t([gt()],Qt.prototype,"_now",void 0),Qt=t([ht("yad-widget-clock")],Qt);const Xt={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},te={"clear-night":"Clear night",partlycloudy:"Partly cloudy","lightning-rainy":"Thunderstorms","snowy-rainy":"Sleet","windy-variant":"Windy",exceptional:"Exceptional"},ee=(t,e=!1)=>!e||"sunny"!==t&&"clear-night"!==t?e&&"partlycloudy"===t?"mdi:weather-night-partly-cloudy":Xt[t??""]??"mdi:weather-cloudy":"mdi:weather-night";let ie=class extends Zt{watchedEntities(){return[this.config.entity]}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe()}connectedCallback(){super.connectedCallback(),this.hass&&this._subscribe()}updated(t){(t.has("hass")||t.has("config"))&&this._subscribe()}_unsubscribe(){this._unsub?.then(t=>t()).catch(()=>{}),this._unsub=void 0,this._subscribedKey=void 0}_subscribe(){if(!this.hass||!this.config?.entity||!this.isConnected)return;const t=this.config.forecast_type??"daily",e=`${this.config.entity}|${t}`;this._subscribedKey!==e&&(this._unsubscribe(),this._subscribedKey=e,this._unsub=this.hass.connection.subscribeMessage(t=>this._forecast=t.forecast,{type:"weather/subscribe_forecast",forecast_type:t,entity_id:this.config.entity}),this._unsub.catch(()=>{this._forecast=this.hass?.states[this.config.entity]?.attributes.forecast}))}_label(t){const e=new Date(t.datetime),i=this.config.forecast_type??"daily";if("hourly"===i)return new Intl.DateTimeFormat(qt(this.hass),{hour:"numeric"}).format(e);const s=new Intl.DateTimeFormat(qt(this.hass),{weekday:"short"}).format(e);return"twice_daily"===i?`${s}${!1===t.is_daytime?" ☾":""}`:s}render(){const t=this.hass?.states[this.config.entity];if(!t)return B`<div class="empty"><ha-icon icon="mdi:weather-cloudy-alert"></ha-icon>Weather entity not found<br /><small>${this.config.entity}</small></div>`;const e=t.attributes,i=e.temperature_unit??"°",s=i.startsWith("°")?"°":` ${i}`,a="clear-night"===t.state,o=(this._forecast??[]).slice(0,this.config.forecast_count??5),n="hourly"!==this.config.forecast_type&&this._forecast?.length?this._forecast[0]:void 0,r=Wt(this.hass,t),c=Lt(t)?"Unavailable":r===t.state||r===Ft(t.state)?te[t.state]??Ft(t.state.replace(/-/g," ")):r;return B`
      <div class="now tone-${(t=>"sunny"===t?"sun":"clear-night"===t?"night":/rain|pour|hail|lightning/.test(t??"")?"rain":"cloud")(t.state)}" @click=${()=>!this.displayOnly&&Rt(this,this.config.entity)}>
        <div class="icon-wrap"><ha-icon icon=${ee(t.state,a)}></ha-icon></div>
        <div class="main">
          <div class="temp num">${void 0!==e.temperature?Bt(this.hass,e.temperature,0):"–"}<span>${s}</span></div>
          <div class="cond">${Ft(c)}</div>
          ${void 0!==n?.temperature?B`<div class="hilo muted num">
                ↑ ${Bt(this.hass,n.temperature,0)}${s}
                ${void 0!==n.templow?B` · ↓ ${Bt(this.hass,n.templow,0)}${s}`:Y}
              </div>`:Y}
        </div>
        ${!1!==this.config.show_details?B`<div class="details">
              ${void 0!==e.humidity?B`<span class="chip"><ha-icon icon="mdi:water-percent"></ha-icon>${Bt(this.hass,e.humidity,0)}%</span>`:Y}
              ${void 0!==e.wind_speed?B`<span class="chip"
                    ><ha-icon icon="mdi:weather-windy"></ha-icon>${Bt(this.hass,e.wind_speed,0)} ${e.wind_speed_unit??""}</span
                  >`:Y}
            </div>`:Y}
      </div>
      ${o.length?B`<div class="forecast">
            ${o.map(t=>B`<div class="day">
                <div class="label">${this._label(t)}</div>
                <ha-icon icon=${ee(t.condition,!1===t.is_daytime)}></ha-icon>
                <div class="t num">${void 0!==t.temperature?Bt(this.hass,t.temperature,0)+"°":""}</div>
                ${void 0!==t.templow?B`<div class="tl num">${Bt(this.hass,t.templow,0)}°</div>`:Y}
                ${t.precipitation_probability?B`<div class="rain num">${t.precipitation_probability}%</div>`:Y}
              </div>`)}
          </div>`:Y}
    `}};ie.styles=[Ut,n`
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
    `],t([gt()],ie.prototype,"_forecast",void 0),ie=t([ht("yad-widget-weather")],ie);const se=["var(--h-accent)","var(--h-sage)","var(--h-sky)","var(--h-amber)","#b07aa1","#c9a27e"];let ae=class extends Zt{watchedEntities(){return Dt(this.config.entities).map(t=>t.entity)}connectedCallback(){super.connectedCallback(),this._fetchedKey=void 0,this.hass&&this._fetch()}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._timer),this._timer=void 0}updated(t){const e=JSON.stringify([this.config.entities,this.config.days]);(t.has("config")||t.has("hass"))&&this.hass&&e!==this._fetchedKey&&(this._fetchedKey=e,this._fetch()),!this._timer&&this.hass&&(this._timer=window.setInterval(()=>{this._fetch()},6e4*(this.config.refresh_minutes??5)))}async _fetch(){if(!this.hass)return;const t=Dt(this.config.entities),e=Vt(new Date),i=Gt(e,this.config.days??7),s=`start=${encodeURIComponent(e.toISOString())}&end=${encodeURIComponent(i.toISOString())}`;try{const e=await Promise.all(t.map(async(t,e)=>(await this.hass.callApi("GET",`calendars/${t.entity}?${s}`)).map(i=>{const s=!i.start.dateTime;return{summary:i.summary,start:Jt(i.start.dateTime??i.start.date),end:Jt(i.end.dateTime??i.end.date),allDay:s,location:i.location,color:t.color??se[e%se.length],calendarName:Nt(this.hass?.states[t.entity],t.name,t.entity),calendarIcon:t.icon}}))),i=Date.now();this._events=e.flat().filter(t=>t.end.getTime()>i).sort((t,e)=>t.start.getTime()-e.start.getTime()||Number(e.allDay)-Number(t.allDay)),this._error=void 0}catch(t){this._error=t?.message??"Could not load calendar"}}_timeLabel(t){if(t.allDay)return"All day";const e=t=>Yt(this.hass,t);return`${e(t.start)} – ${e(t.end)}`}_displayDay(t,e){let i=new Date(Math.max(Vt(t.start).getTime(),e.getTime()));if(!1===this.config.show_weekends)for(;0===i.getDay()||6===i.getDay();)i=Gt(i,1);return i<t.end&&i<Gt(e,this.config.days??7)?i:void 0}render(){const t=this.config.title??"Coming up",e=B`<div class="head"><ha-icon icon="mdi:calendar-heart"></ha-icon>${t}</div>`;if(this._error)return B`${e}<div class="empty"><ha-icon icon="mdi:calendar-alert"></ha-icon>${this._error}</div>`;if(!this._events)return B`${e}<div class="empty">Loading…</div>`;const i=Vt(new Date),s=this._events.filter(t=>this._displayDay(t,i)).slice(0,this.config.max_events??8);if(!s.length)return B`${e}<div class="empty"><ha-icon icon="mdi:sofa-outline"></ha-icon>Nothing planned — enjoy the downtime</div>`;const a=new Map;for(const t of s){const e=this._displayDay(t,i).getTime();a.has(e)||a.set(e,[]),a.get(e).push(t)}return B`
      ${e}
      <div class="list scroll">
        ${[...a.entries()].map(([t,e])=>{const s=!!this.config.highlight_weekends&&[0,6].includes(new Date(t).getDay());return B`
            <div class="day-label ${t===i.getTime()?"today":""} ${s?"weekend":""}">${((t,e)=>{const i=Vt(new Date),s=Math.round((Vt(e).getTime()-i.getTime())/864e5);return 0===s||1===s?Ft(new Intl.RelativeTimeFormat(qt(t),{numeric:"auto"}).format(s,"day")):new Intl.DateTimeFormat(qt(t),{weekday:"long",day:"numeric",month:"short"}).format(e)})(this.hass,new Date(t))}${s?B`<ha-icon icon="mdi:sofa-outline" aria-label="Weekend"></ha-icon>`:Y}</div>
            ${e.map(t=>B`<div class="event ${s?"weekend":""}">
                <span class="bar ${!1!==this.config.show_calendar_badge?"badge":""}" style="background:${t.color}" title=${t.calendarName} aria-label=${t.calendarName}>
                  ${!1===this.config.show_calendar_badge?Y:t.calendarIcon?B`<ha-icon icon=${t.calendarIcon}></ha-icon>`:Array.from(t.calendarName)[0]?.toLocaleUpperCase()}
                </span>
                <div class="body">
                  <div class="summary">${t.summary}</div>
                  <div class="meta muted num">
                    ${this._timeLabel(t)}${this.config.show_location&&t.location?B` · ${t.location}`:Y}
                  </div>
                </div>
              </div>`)}
          `})}
      </div>
    `}};ae.styles=[Ut,n`
      .list {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        mask-image: linear-gradient(to bottom, #000 85%, transparent);
        padding-bottom: 16px;
      }
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
      .day-label.weekend { color: var(--h-warm, var(--h-accent)); display: flex; align-items: center; gap: 8px; }
      .day-label.weekend ha-icon { --mdc-icon-size: 16px; }
      .event.weekend { outline: 1px solid var(--h-warm, var(--h-accent)); background: var(--h-amber-soft); }
      .day-label:first-child {
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
      }
    `],t([gt()],ae.prototype,"_events",void 0),t([gt()],ae.prototype,"_error",void 0),ae=t([ht("yad-widget-calendar")],ae);const oe=(t,e)=>{const i=It(e);if(void 0===i||!e)return["–",""];const s=e.attributes.unit_of_measurement??"W";return"W"===s&&Math.abs(i)>=1e3?[Bt(t,i/1e3,2),"kW"]:[Bt(t,i,"W"===s?0:2),s]};let ne=class extends Zt{watchedEntities(){const t=this.config;return[t.power_entity,t.solar_power_entity,t.battery_entity,t.today_entity,t.solar_today_entity,t.cost_entity].filter(t=>!!t)}connectedCallback(){super.connectedCallback(),this._fetchedKey=void 0,this.hass&&this._fetchHistory()}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._timer),this._timer=void 0}updated(t){if(!1===this.config.show_graph||!this.config.power_entity||!this.hass)return;const e=`${this.config.power_entity}|${this.config.hours_to_show}`;(t.has("config")||t.has("hass"))&&e!==this._fetchedKey&&(this._fetchedKey=e,this._fetchHistory()),this._timer||(this._timer=window.setInterval(()=>{this._fetchHistory()},3e5))}async _fetchHistory(){const t=this.config.power_entity;if(!this.hass||!t||!1===this.config.show_graph)return;const e=this.config.hours_to_show??24,i=new Date,s=new Date(i.getTime()-36e5*e);try{const e=((await this.hass.callWS({type:"history/history_during_period",start_time:s.toISOString(),end_time:i.toISOString(),entity_ids:[t],minimal_response:!0,no_attributes:!0}))[t]??[]).map(t=>({t:1e3*t.lu,v:Number(t.s)})).filter(t=>Number.isFinite(t.v));this._series=this._bucket(e,s.getTime(),i.getTime())}catch{this._series=void 0}}_bucket(t,e,i){if(!t.length)return[];const s=(i-e)/48,a=[];let o=0,n=t[0].v;for(let i=0;i<48;i++){const r=e+i*s,c=r+s;let l=0,d=r;for(;o<t.length&&t[o].t<c;){const e=Math.max(t[o].t,r);l+=n*(e-d),d=e,n=t[o].v,o++}l+=n*(c-d),a.push(l/s)}return a}_sparkline(t){const e=100,i=Math.max(...t,1),s=Math.min(...t,0),a=i-s||1,o=t.map((i,o)=>[o/(t.length-1)*300,e-(i-s)/a*92-4]);let n=`M ${o[0][0]} ${o[0][1]}`;for(let t=1;t<o.length;t++){const[e,i]=o[t-1],[s,a]=o[t],r=(e+s)/2;n+=` C ${r} ${i}, ${r} ${a}, ${s} ${a}`}return F`
      <svg viewBox="0 0 ${300} ${e}" preserveAspectRatio="none" class="spark">
        <defs>
          <linearGradient id="yad-energy-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--h-accent)" stop-opacity="0.35"></stop>
            <stop offset="100%" stop-color="var(--h-accent)" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        <path d="${n} L ${300} ${e} L 0 ${e} Z" fill="url(#yad-energy-fill)"></path>
        <path d=${n} fill="none" stroke="var(--h-accent)" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linecap="round"></path>
      </svg>`}_stat(t,e,i,s=""){if(!i)return Y;const a=this.hass?.states[i],o=Lt(a)?"–":i===this.config.solar_power_entity?oe(this.hass,a).join(" "):Wt(this.hass,a);return B`<div class="stat ${s}" @click=${()=>!this.displayOnly&&Rt(this,i)}>
      <ha-icon icon=${t}></ha-icon>
      <div>
        <div class="stat-value num">${o}</div>
        <div class="stat-label">${e}</div>
      </div>
    </div>`}render(){const t=this.config,e=t.power_entity?this.hass?.states[t.power_entity]:void 0,[i,s]=oe(this.hass,e),a=t.battery_entity?It(this.hass?.states[t.battery_entity]):void 0,o=void 0===a?"mdi:battery":"mdi:battery"+(a>=95?"":a<10?"-outline":"-"+10*Math.round(a/10));return B`
      <div class="head"><ha-icon icon="mdi:lightning-bolt"></ha-icon>${t.title??"Energy"}</div>
      ${t.power_entity?B`<div class="now" @click=${()=>!this.displayOnly&&Rt(this,t.power_entity)}>
            <span class="value num">${i}</span><span class="unit">${s}</span>
            <span class="now-label muted">using now</span>
          </div>`:Y}
      ${!1!==t.show_graph&&this._series?.length?B`<div class="graph">${this._sparkline(this._series)}</div>`:B`<div class="grow"></div>`}
      <div class="stats">
        ${this._stat("mdi:home-lightning-bolt-outline","Today",t.today_entity)}
        ${this._stat("mdi:solar-power-variant-outline","Solar now",t.solar_power_entity,"sun")}
        ${this._stat("mdi:white-balance-sunny","Solar today",t.solar_today_entity,"sun")}
        ${this._stat(o,"Battery",t.battery_entity,"sage")}
        ${this._stat("mdi:cash","Cost today",t.cost_entity)}
      </div>
    `}};ne.styles=[Ut,n`
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
    `],t([gt()],ne.prototype,"_series",void 0),ne=t([ht("yad-widget-energy")],ne);const re={off:"mdi:power",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:sun-snowflake-variant",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan"},ce={heating:"Heating",cooling:"Cooling",idle:"Idle",off:"Off",drying:"Drying",fan:"Fan",preheating:"Preheating"};let le=class extends Zt{watchedEntities(){return[this.config.entity,this.config.humidity_entity].filter(t=>!!t)}willUpdate(t){t.has("hass")&&void 0!==this._pendingTarget&&void 0===this._debounce&&(this._pendingTarget=void 0)}_nudge(t){const e=this.hass?.states[this.config.entity];if(!e||this.displayOnly)return;const i=e.attributes,s=i.target_temp_step??("°F"===this.hass?.config?.unit_system?.temperature?1:.5),a=this._pendingTarget??i.temperature;if("number"!=typeof a)return;const o=Math.min(i.max_temp??35,Math.max(i.min_temp??5,Math.round((a+s*t)/s)*s));this._pendingTarget=o,window.clearTimeout(this._debounce),this._debounce=window.setTimeout(()=>{this._debounce=void 0,this.callService("climate","set_temperature",{entity_id:this.config.entity,temperature:o})},900)}_setMode(t){this.callService("climate","set_hvac_mode",{entity_id:this.config.entity,hvac_mode:t})}render(){const t=this.hass?.states[this.config.entity];if(!t)return B`<div class="empty"><ha-icon icon="mdi:thermostat"></ha-icon>Climate entity not found<br /><small>${this.config.entity}</small></div>`;const e=t.attributes,i=Lt(t),s=this._pendingTarget??e.temperature,a=e.hvac_action??t.state,o="heating"===a||"preheating"===a?"heat":"cooling"===a?"cool":"off"===t.state?"off":"idle",n=t=>Bt(this.hass,t,1),r=this.config.humidity_entity?this.hass?.states[this.config.humidity_entity]?.state:e.current_humidity,c=e.min_temp??5,l=e.max_temp??35,d=void 0!==s?Math.min(1,Math.max(0,(s-c)/(l-c))):0,h=2*Math.PI*46*.75;return B`
      <div class="head">
        <ha-icon icon="mdi:thermostat"></ha-icon>${Nt(t,this.config.name??this.config.title)}
        <span class="spacer"></span>
        <span class="chip action ${o}">${i?"Unavailable":ce[a]??Ft(a.replace(/_/g," "))}</span>
      </div>
      <div class="body">
        <button class="round control" aria-label="Lower" @click=${()=>this._nudge(-1)}><ha-icon icon="mdi:minus"></ha-icon></button>
        <div class="dial ${o}" @click=${()=>!this.displayOnly&&Rt(this,this.config.entity)}>
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r=${46} class="track" stroke-dasharray="${h} 999" transform="rotate(135 50 50)"></circle>
            <circle cx="50" cy="50" r=${46} class="fill" stroke-dasharray="${h*d} 999" transform="rotate(135 50 50)"></circle>
          </svg>
          <div class="readout">
            <div class="current num">${void 0!==e.current_temperature?n(e.current_temperature):"–"}<span>°</span></div>
            <div class="target muted num">
              ${void 0!==s?B`Set to <strong>${n(s)}°</strong>`:void 0!==e.target_temp_low?B`<strong>${n(e.target_temp_low)}–${n(e.target_temp_high)}°</strong>`:Y}
            </div>
            ${null!=r?B`<div class="hum muted num"><ha-icon icon="mdi:water-percent"></ha-icon>${r}%</div>`:Y}
          </div>
        </div>
        <button class="round control" aria-label="Raise" @click=${()=>this._nudge(1)}><ha-icon icon="mdi:plus"></ha-icon></button>
      </div>
      ${!1!==this.config.show_modes&&Array.isArray(e.hvac_modes)?B`<div class="modes">
            ${e.hvac_modes.map(e=>B`<button
                class="mode ${e===t.state?"active":""}"
                ?disabled=${this.displayOnly}
                @click=${()=>this._setMode(e)}
                title=${Ft(e.replace(/_/g," "))}
              >
                <ha-icon icon=${re[e]??"mdi:thermostat"}></ha-icon>
              </button>`)}
          </div>`:Y}
    `}};le.styles=[Ut,n`
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
    `],t([gt()],le.prototype,"_pendingTarget",void 0),le=t([ht("yad-widget-climate")],le);const de=new Set(["on","open","opening","unlocked","playing","home","active","heat","cool"]);let he=class extends Zt{constructor(){super(...arguments),this._handlers=new Map}watchedEntities(){return Dt(this.config.entities).map(t=>t.entity)}_toggle(t){const e=jt(t);"scene"===e||"script"===e?this.callService(e,"turn_on",{entity_id:t}):"button"===e||"input_button"===e?this.callService(e,"press",{entity_id:t}):"lock"===e?this.callService("lock","locked"===this.hass?.states[t]?.state?"unlock":"lock",{entity_id:t}):"cover"===e?this.callService("cover","toggle",{entity_id:t}):this.callService("homeassistant","toggle",{entity_id:t})}_press(t){let e=this._handlers.get(t);return e||(e=((t,e)=>{let i,s=!1,a=!1;return{down:()=>{s=!1,a=!0,i=window.setTimeout(()=>{s=!0,e()},550)},up:()=>{window.clearTimeout(i),a&&!s&&t(),a=!1},cancel:()=>{window.clearTimeout(i),a=!1}}})(()=>this._toggle(t),()=>Rt(this,t)),this._handlers.set(t,e)),e}render(){const t=Dt(this.config.entities);return B`
      ${this.config.title?B`<div class="head"><ha-icon icon="mdi:lightbulb-group-outline"></ha-icon>${this.config.title}</div>`:Y}
      <div class="grid scroll" style="--min:${this.config.min_tile_width??150}px">
        ${t.map(t=>{const e=this.hass?.states[t.entity],i=(t=>!!t&&de.has(t.state))(e),s=i&&Array.isArray(e?.attributes.rgb_color)?`rgb(${e.attributes.rgb_color.join(",")})`:void 0,a=this._press(t.entity);return B`<div
            class="tile ${i?"on":""} ${e&&"unavailable"!==e.state?"":"unavailable"}"
            style=${xt(s?{"--tint":s}:{})}
            role="button"
            @pointerdown=${a.down}
            @pointerup=${a.up}
            @pointerleave=${a.cancel}
            @pointercancel=${a.cancel}
            @contextmenu=${t=>t.preventDefault()}
          >
            <div class="icon">
              ${t.icon?B`<ha-icon .icon=${t.icon}></ha-icon>`:B`<ha-state-icon .hass=${this.hass} .stateObj=${e}></ha-state-icon>`}
            </div>
            <div class="text">
              <div class="name">${Nt(e,t.name,t.entity)}</div>
              <div class="state">${((t,e)=>{if(!e||"unavailable"===e.state)return"Unavailable";const i=jt(e.entity_id);return"scene"===i||"script"===i?"on"===e.state?"Running":"Tap to run":"button"===i||"input_button"===i?"Tap to press":Lt(e)?"Unavailable":"light"===i&&"on"===e.state&&"number"==typeof e.attributes.brightness?`On · ${Bt(t,e.attributes.brightness/255*100,0)}%`:Wt(t,e)})(this.hass,e)}</div>
            </div>
          </div>`})}
      </div>
    `}};he.styles=[Ut,n`
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
    `],he=t([ht("yad-widget-toggles")],he);let pe=class extends Zt{watchedEntities(){return Dt(this.config.entities).map(t=>t.entity)}render(){const t=Dt(this.config.entities),e=this.config.layout??"grid";return B`
      ${this.config.title?B`<div class="head"><ha-icon icon="mdi:gauge"></ha-icon>${this.config.title}</div>`:Y}
      <div class="${e} scroll" style="--min:${this.config.min_tile_width??140}px">
        ${t.map(t=>{const e=this.hass?.states[t.entity],[i,s]=((t,e)=>{if(!e||Lt(e))return["–",""];const i=It(e),s=e.attributes.unit_of_measurement??"";return void 0!==i?[Bt(t,i,1),s]:[t?.formatEntityState?t.formatEntityState(e):e.state,""]})(this.hass,e);return B`<div class="item" @click=${()=>!this.displayOnly&&Rt(this,t.entity)}>
            <div class="icon" style=${t.color?`color:${t.color}`:""}>
              ${t.icon?B`<ha-icon .icon=${t.icon}></ha-icon>`:B`<ha-state-icon .hass=${this.hass} .stateObj=${e}></ha-state-icon>`}
            </div>
            <div class="name">${Nt(e,t.name,t.entity)}</div>
            <div class="value num">${i}${s?B`<span class="unit">${s}</span>`:Y}</div>
          </div>`})}
      </div>
    `}};pe.styles=[Ut,n`
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
    `],pe=t([ht("yad-widget-sensors")],pe);let ue=class extends Zt{watchedEntities(){return[this.config.entity]}_call(t,e={}){this.callService("media_player",t,{entity_id:this.config.entity,...e})}_volume(t){const e=Number(t.target.value);this._call("volume_set",{volume_level:e/100})}render(){const t=this.hass?.states[this.config.entity];if(!t)return B`<div class="empty"><ha-icon icon="mdi:speaker-off"></ha-icon>Media player not found<br /><small>${this.config.entity}</small></div>`;const e=t.attributes,i=Nt(t,this.config.name??this.config.title),s="playing"===t.state||"paused"===t.state||"buffering"===t.state,a=s?e.entity_picture_local??e.entity_picture:void 0,o=e.supported_features??0;return s?B`
      ${a?B`<div class="backdrop" style="background-image:url('${a}')"></div>`:Y}
      <div class="head"><ha-icon icon="mdi:music-note-outline"></ha-icon>${i}</div>
      <div class="content">
        <div class="art" @click=${()=>!this.displayOnly&&Rt(this,this.config.entity)}>
          ${a?B`<img src=${a} alt="" />`:B`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="info">
          <div class="title">${e.media_title??"Unknown"}</div>
          <div class="artist muted">${e.media_artist??e.media_album_name??e.app_name??""}</div>
          <div class="controls control">
            ${16&o?B`<button class="round" @click=${()=>this._call("media_previous_track")}><ha-icon icon="mdi:skip-previous"></ha-icon></button>`:Y}
            <button class="round primary big" @click=${()=>this._call("media_play_pause")}>
              <ha-icon icon=${"playing"===t.state?"mdi:pause":"mdi:play"}></ha-icon>
            </button>
            ${32&o?B`<button class="round" @click=${()=>this._call("media_next_track")}><ha-icon icon="mdi:skip-next"></ha-icon></button>`:Y}
          </div>
          ${this.config.show_volume&&4&o?B`<input
                class="volume control"
                type="range"
                min="0"
                max="100"
                .value=${String(Math.round(100*(e.volume_level??0)))}
                @change=${this._volume}
              />`:Y}
        </div>
      </div>
    `:B`
        <div class="head"><ha-icon icon="mdi:music-note-outline"></ha-icon>${i}</div>
        <div class="empty" @click=${()=>!this.displayOnly&&Rt(this,this.config.entity)}>
          <ha-icon icon=${Lt(t)?"mdi:speaker-off":"mdi:music-note-off-outline"}></ha-icon>
          ${Lt(t)?"Unavailable":"Nothing playing"}
        </div>
      `}};ue.styles=[Ut,n`
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
    `],ue=t([ht("yad-widget-media")],ue);let me=class extends Zt{watchedEntities(){return Dt(this.config.entities).map(t=>t.entity)}render(){const t=Dt(this.config.entities);return B`
      ${this.config.title?B`<div class="head"><ha-icon icon="mdi:home-account"></ha-icon>${this.config.title}</div>`:Y}
      <div class="people">
        ${t.map(t=>{const e=this.hass?.states[t.entity],i=Nt(e,t.name,t.entity),s="home"===e?.state,a=s?"Home":"not_home"===e?.state?"Away":e?Ft(this.hass?.formatEntityState?.(e)??e.state):"Unknown",o=e?.attributes.entity_picture;return B`<div class="person ${s?"home":"away"}" @click=${()=>!this.displayOnly&&Rt(this,t.entity)}>
            <div class="avatar">
              ${o?B`<img src=${o} alt="" />`:B`<span>${(t=>t.split(/\s+/).slice(0,2).map(t=>t.charAt(0).toUpperCase()).join(""))(i)}</span>`}
              <span class="dot"></span>
            </div>
            <div class="name">${i.split(" ")[0]}</div>
            ${!1!==this.config.show_state?B`<div class="state">${a}</div>`:Y}
          </div>`})}
      </div>
    `}};me.styles=[Ut,n`
      .people {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        gap: 12px;
        min-height: 0;
      }
      .person {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        min-width: 64px;
      }
      .avatar {
        --size: clamp(48px, 34cqh, 84px);
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
        border: 3px solid var(--h-surface);
      }
      .home .dot {
        background: var(--h-sage);
      }
      .name {
        font-weight: 800;
      }
      .state {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--h-muted);
      }
      .home .state {
        color: var(--h-sage);
      }
    `],me=t([ht("yad-widget-people")],me);let ge=class extends Zt{watchedEntities(){return[]}shouldUpdate(){return!0}willUpdate(t){if(t.has("config")){const t=JSON.stringify(this.config.card??null);t!==this._builtFor&&(this._builtFor=t,this._build())}this._card&&this.hass&&(this._card.hass=this.hass)}async _build(){const t=this.config.card;if(!t?.type)return this._card=void 0,void(this._error="Add a `card:` configuration to this widget.");try{const e=await(window.loadCardHelpers?.());if(!e)throw new Error("Card helpers unavailable");const i=e.createCardElement(t);i.addEventListener("ll-rebuild",t=>{t.stopPropagation(),this._builtFor=void 0,this.requestUpdate("config")}),this.hass&&(i.hass=this.hass),this._card=i,this._error=void 0}catch(t){this._error=t.message}}render(){return this._error?B`<div class="empty"><ha-icon icon="mdi:card-remove-outline"></ha-icon>${this._error}</div>`:B`<div class="wrap scroll">${this._card}</div>`}};ge.styles=[Ut,n`
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
    `],t([gt()],ge.prototype,"_card",void 0),t([gt()],ge.prototype,"_error",void 0),ge=t([ht("yad-widget-card")],ge);const fe=[["charge_entity","Charge","mdi:battery"],["fuel_entity","Fuel","mdi:gas-station"],["range_entity","Range","mdi:map-marker-distance"],["location_entity","Location","mdi:map-marker"],["plugged_in_entity","Plugged in","mdi:ev-plug-type2"],["charging_entity","Charging","mdi:ev-station"]];let ye=class extends Zt{watchedEntities(){return[...fe.flatMap(([t])=>this.config[t]?[this.config[t]]:[]),...Dt(this.config.entities).map(t=>t.entity)]}_available(t){const e=t?this.hass?.states[t]:void 0;return e&&!Lt(e)&&""!==e.state.trim()?e:void 0}render(){const t=fe.flatMap(([t,e,i])=>{const s=this._available(this.config[t]);if(!s)return[];const a="charge_entity"===t||"fuel_entity"===t;return[{entity:s,label:e,icon:i,value:a?It(s):void 0,percentage:a}]}),e=Dt(this.config.entities).flatMap(t=>{const e=this._available(t.entity);return e?[{entity:e,label:Nt(e,t.name),icon:t.icon??"mdi:gauge",value:void 0,percentage:!1}]:[]}),i=[...t,...e];return B`
      <div class="head"><ha-icon icon="mdi:car"></ha-icon>${this.config.title??this.config.name??"Car"}</div>
      ${i.length?B`<div class="items scroll">
        ${i.map(({entity:t,label:e,icon:i,value:s,percentage:a})=>B`
          <div class="item" @click=${()=>!this.displayOnly&&Rt(this,t.entity_id)}>
            <ha-icon icon=${i}></ha-icon>
            <div class="body">
              <div class="label muted">${e}</div>
              <div class="value num">${a&&void 0!==s?`${s}%`:Wt(this.hass,t)}</div>
              ${a&&void 0!==s?B`
                <progress max="100" value=${Math.min(100,Math.max(0,s))} aria-label=${e}></progress>
              `:Y}
            </div>
          </div>
        `)}
      </div>`:B`<div class="empty">${this.watchedEntities().length?"No vehicle data available":"Select vehicle sensors in the widget editor"}</div>`}
    `}};ye.styles=[Ut,n`
      .items { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(140px, 100%), 1fr)); gap: 10px; }
      .item { display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: var(--h-radius-sm); background: var(--h-surface-2); cursor: pointer; }
      .item ha-icon { color: var(--h-accent); flex: none; }
      .body { min-width: 0; flex: 1; }
      .label { font-size: 0.8rem; font-weight: 600; }
      .value { font-weight: 700; overflow-wrap: anywhere; }
      progress { width: 100%; height: 6px; accent-color: var(--h-accent); }
      :host([display-only]) .item { cursor: default; }
    `],ye=t([ht("yad-widget-car")],ye);let _e=class extends Zt{watchedEntities(){return[]}render(){const t=this.config.style??"blank";return"blank"===t?Y:B`<div class="line ${t}" style=${this.config.line_color?`border-color:${this.config.line_color}`:""} role="separator"></div>`}};_e.styles=[Ut,n`
      :host { justify-content: center; }
      .line { width: 100%; border-top: 1px solid var(--h-border); }
      .dashed { border-top-style: dashed; }
    `],_e=t([ht("yad-widget-spacer")],_e);const ve=(t,e,i=!1)=>({name:t,required:i,selector:{entity:e?{domain:e}:{}}}),be=(t,e)=>({name:t,selector:{entity:{multiple:!0,...e?{domain:e}:{}}}}),we=(t,e,i,s=1)=>({name:t,selector:{number:{min:e,max:i,step:s,mode:"box"}}}),xe=t=>({name:t,selector:{boolean:{}}}),$e=t=>({name:t,selector:{text:{}}}),ke=(t,e)=>({name:t,selector:{select:{mode:"dropdown",options:e.map(([t,e])=>({value:t,label:e}))}}}),Ae={clock:{label:"Clock & greeting",icon:"mdi:clock-outline",tag:"yad-widget-clock",defaults:{col_span:2,row_span:1,transparent:!0,greeting:!0,greet_by_name:!0},schema:[{type:"grid",name:"",schema:[xe("greeting"),xe("greet_by_name"),$e("name"),xe("show_date"),xe("show_seconds"),ke("time_format",[["auto","Follow Home Assistant"],["24","24 hour"],["12","12 hour"]])]}]},weather:{label:"Weather & forecast",icon:"mdi:weather-partly-cloudy",tag:"yad-widget-weather",defaults:{col_span:2,row_span:2,forecast_type:"daily",forecast_count:5},schema:[ve("entity","weather",!0),{type:"grid",name:"",schema:[ke("forecast_type",[["daily","Daily"],["hourly","Hourly"],["twice_daily","Twice daily"]]),we("forecast_count",0,10),xe("show_details")]}]},calendar:{label:"Calendar agenda",icon:"mdi:calendar-month-outline",tag:"yad-widget-calendar",defaults:{col_span:1,row_span:3,days:7,max_events:8,show_weekends:!0,highlight_weekends:!1,show_calendar_badge:!0},schema:[$e("title"),be("entities","calendar"),{type:"grid",name:"",schema:[we("days",1,31),we("max_events",1,50),xe("show_location"),xe("show_weekends"),xe("highlight_weekends"),xe("show_calendar_badge"),we("refresh_minutes",1,120)]}]},energy:{label:"Energy usage",icon:"mdi:lightning-bolt-outline",tag:"yad-widget-energy",defaults:{col_span:2,row_span:2,show_graph:!0,hours_to_show:24},schema:[$e("title"),ve("power_entity","sensor"),ve("today_entity","sensor"),ve("solar_power_entity","sensor"),ve("solar_today_entity","sensor"),ve("battery_entity","sensor"),ve("cost_entity","sensor"),{type:"grid",name:"",schema:[xe("show_graph"),we("hours_to_show",1,168)]}]},climate:{label:"Climate / thermostat",icon:"mdi:thermostat",tag:"yad-widget-climate",defaults:{col_span:1,row_span:2,show_modes:!0},schema:[ve("entity","climate",!0),{type:"grid",name:"",schema:[$e("name"),xe("show_modes")]},ve("humidity_entity","sensor")]},toggles:{label:"Lights & switches",icon:"mdi:lightbulb-group-outline",tag:"yad-widget-toggles",defaults:{col_span:2,row_span:1},schema:[$e("title"),be("entities",["light","switch","fan","input_boolean","scene","script","cover","lock","button","input_button"]),we("min_tile_width",100,400,10)]},sensors:{label:"Sensors",icon:"mdi:gauge",tag:"yad-widget-sensors",defaults:{col_span:2,row_span:1,layout:"grid"},schema:[$e("title"),be("entities"),{type:"grid",name:"",schema:[ke("layout",[["grid","Tiles"],["list","List"]]),we("min_tile_width",100,400,10)]}]},media:{label:"Media player",icon:"mdi:music-circle-outline",tag:"yad-widget-media",defaults:{col_span:2,row_span:1},schema:[ve("entity","media_player",!0),{type:"grid",name:"",schema:[$e("name"),xe("show_volume")]}]},people:{label:"People & presence",icon:"mdi:account-group-outline",tag:"yad-widget-people",defaults:{col_span:1,row_span:1},schema:[$e("title"),be("entities","person"),xe("show_state")]},card:{label:"Any Home Assistant card",icon:"mdi:card-outline",tag:"yad-widget-card",defaults:{col_span:1,row_span:1,card:{type:"markdown",content:"Hello from YAD 👋"}},schema:[]},car:{label:"Car / vehicle",icon:"mdi:car",tag:"yad-widget-car",defaults:{col_span:2,row_span:2},schema:[$e("title"),ve("charge_entity","sensor"),ve("fuel_entity","sensor"),ve("range_entity","sensor"),ve("location_entity","device_tracker"),ve("plugged_in_entity",["binary_sensor","sensor"]),ve("charging_entity",["binary_sensor","sensor"]),be("entities")]},spacer:{label:"Spacer / divider",icon:"mdi:minus",tag:"yad-widget-spacer",defaults:{col_span:4,row_span:.25,transparent:!0,style:"blank"},schema:[ke("style",[["blank","Blank spacer"],["line","Horizontal line"],["dashed","Dashed line"]]),{name:"line_color",selector:{text:{}}}]}},Se=[{type:"grid",name:"",schema:[we("col_span",1,12),we("row_span",1,12),we("portrait_col_span",1,12),we("portrait_row_span",1,12),ke("visibility",[["all","Always"],["landscape","Landscape only"],["portrait","Portrait only"]]),xe("transparent")]}],Ce=Se.map(t=>({...t,schema:t.schema.map(t=>"row_span"===t.name||"portrait_row_span"===t.name?we(t.name,.25,1,.25):t)})),Ee={entity:"Entity",entities:"Entities",title:"Title",name:"Name",greeting:"Show greeting",greet_by_name:"Greet by name",show_date:"Show date",show_seconds:"Show seconds",time_format:"Time format",forecast_type:"Forecast type",forecast_count:"Forecast items",show_details:"Show humidity & wind",days:"Days ahead",max_events:"Max events",show_location:"Show location",refresh_minutes:"Refresh (minutes)",show_weekends:"Show weekend events",highlight_weekends:"Highlight weekends",show_calendar_badge:"Show calendar initial / icon",charge_entity:"Charge level (%)",fuel_entity:"Fuel level (%)",range_entity:"Remaining range",location_entity:"Vehicle location",plugged_in_entity:"EV plugged in",charging_entity:"EV charging",style:"Spacer style",line_color:"Line colour (optional)",power_entity:"Current power (W/kW)",today_entity:"Energy used today",solar_power_entity:"Solar power now",solar_today_entity:"Solar energy today",battery_entity:"Battery level (%)",cost_entity:"Cost today",show_graph:"Show usage graph",hours_to_show:"Graph hours",show_modes:"Show mode buttons",humidity_entity:"Humidity sensor (optional)",min_tile_width:"Minimum tile width (px)",layout:"Layout",show_volume:"Show volume slider",show_state:"Show home/away",col_span:"Width (columns)",row_span:"Height (rows)",portrait_col_span:"Portrait width",portrait_row_span:"Portrait height",visibility:"Show in",transparent:"No background"},Me="0.3.1",ze=t=>{if(!t)return;let e=t.trim().replace(/^#/,"").toLowerCase();return/^[0-9a-f]{3}$/.test(e)&&(e=[...e].map(t=>t+t).join("")),/^[0-9a-f]{6}$/.test(e)?`#${e}`:void 0},Te=t=>{const e=parseInt(t.slice(1),16),i=(e>>16&255)/255,s=(e>>8&255)/255,a=(255&e)/255,o=Math.max(i,s,a),n=o-Math.min(i,s,a);let r=0;return n&&(r=o===i?(s-a)/n%6:o===s?(a-i)/n+2:(i-s)/n+4),{h:(60*r+360)%360,s:o?n/o:0,v:o}},Oe=({h:t,s:e,v:i})=>{const s=s=>{const a=(s+t/60)%6;return i-i*e*Math.max(0,Math.min(a,4-a,1))};return`#${[s(5),s(3),s(1)].map(t=>Math.round(255*t).toString(16).padStart(2,"0")).join("")}`};let Pe=class extends lt{constructor(){super(...arguments),this.label="",this._open=!1,this._hsv={h:0,s:0,v:1},this._text="",this._onPointerDown=t=>{t.preventDefault(),this._wheel.setPointerCapture(t.pointerId),this._pickFromPointer(t)},this._onPointerMove=t=>{this._wheel.hasPointerCapture(t.pointerId)&&this._pickFromPointer(t)}}willUpdate(t){if(t.has("value")||t.has("placeholder")){const t=ze(this.value)??ze(this.placeholder);t&&Oe(this._hsv)!==t&&(this._hsv=Te(t)),this._text=this.value??""}}_emit(t){this.value=t,Ht(this,"value-changed",{value:t})}_setHsv(t){this._hsv=t,this._emit(Oe(t))}_pickFromPointer(t){const e=this._wheel.getBoundingClientRect(),i=e.width/2,s=t.clientX-e.left-i,a=t.clientY-e.top-i,o=(180*Math.atan2(s,-a)/Math.PI+360)%360,n=((t,e,i)=>Math.min(i,Math.max(e,t)))(Math.hypot(s,a)/i,0,1);this._setHsv({h:o,s:n,v:this._hsv.v||1})}_onBrightness(t){this._setHsv({...this._hsv,v:Number(t.target.value)/100})}_onText(t){const e=t.target.value;this._text=e;const i=ze(e);i?(this._hsv=Te(i),this._emit(i)):e||this._emit(void 0)}render(){const t=ze(this.value)??ze(this.placeholder),{h:e,s:i,v:s}=this._hsv,a=e*Math.PI/180,o=50+Math.sin(a)*i*50,n=50-Math.cos(a)*i*50,r=Oe({h:e,s:i,v:1});return B`
      <div class="field">
        <button class="swatch ${this.value?"":"unset"}" style="--c:${t??"transparent"}" @click=${()=>this._open=!this._open} title="Pick a colour"></button>
        <div class="text">
          <label>${this.label}</label>
          <input .value=${this._text} placeholder=${this.placeholder??"#rrggbb"} spellcheck="false" @input=${this._onText} />
        </div>
        ${this.value?B`<button class="icon" title="Reset to palette" @click=${()=>this._emit(void 0)}>✕</button>`:Y}
        <button class="icon" title=${this._open?"Close":"Colour wheel"} @click=${()=>this._open=!this._open}>${this._open?"▴":"▾"}</button>
      </div>
      ${this._open?B`<div class="panel">
            <div class="wheel" @pointerdown=${this._onPointerDown} @pointermove=${this._onPointerMove}>
              <div class="shade" style="opacity:${1-s}"></div>
              <div class="marker" style="left:${o}%;top:${n}%;background:${t}"></div>
            </div>
            <div class="slider-row">
              <span>Brightness</span>
              <input type="range" min="0" max="100" .value=${String(Math.round(100*s))} style="--pure:${r}" @input=${this._onBrightness} />
            </div>
          </div>`:Y}
    `}};Pe.styles=n`
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
  `,t([mt()],Pe.prototype,"label",void 0),t([mt()],Pe.prototype,"value",void 0),t([mt()],Pe.prototype,"placeholder",void 0),t([gt()],Pe.prototype,"_open",void 0),t([gt()],Pe.prototype,"_hsv",void 0),t([gt()],Pe.prototype,"_text",void 0),t([function(t){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}(".wheel")],Pe.prototype,"_wheel",void 0),Pe=t([ht("yad-color-picker")],Pe);const Ue=(t,e,i=!1)=>({name:t,selector:{select:{mode:"dropdown",custom_value:i,options:e.map(([t,e])=>({value:t,label:e}))}}}),De=(t,e,i,s,a=1)=>({name:t,selector:{number:{min:e,max:i,step:a,mode:"box",...s?{unit_of_measurement:s}:{}}}}),He=[{type:"grid",name:"",schema:[{name:"display_only",selector:{boolean:{}}},{name:"hide_cursor",selector:{boolean:{}}}]}],Re=[{name:"background_media",selector:{media:{accept:["image/*"],image_upload:!0}}},{name:"background",selector:{text:{}}},{type:"grid",name:"",schema:[De("background_opacity",0,100,"%"),De("background_blur",0,30,"px"),Ue("background_fit",[["cover","Fill (cover)"],["contain","Fit whole image"]]),Ue("background_position",[["center","Centre"],["top","Top"],["bottom","Bottom"],["left","Left"],["right","Right"]])]}],je={screen:"Screen size",screen_width:"Screen width",screen_height:"Screen height",ui_scale:"UI scale",theme:"Light / dark mode",orientation:"Orientation",columns:"Columns (landscape)",portrait_columns:"Columns (portrait)",height:"Height",row_height:"Row height (when not filling screen)",gap:"Spacing",background:"Background image URL (optional)",background_media:"Choose from HA media or upload an image",background_opacity:"Image opacity",background_blur:"Image blur",background_fit:"Image fit",background_position:"Image position",display_only:"Display only (no touch)",hide_cursor:"Hide mouse cursor"},Ne=[["background","Background"],["surface","Tiles"],["text","Text"],["accent","Accent"],["success","On / home"],["warm","Lights & heating"],["info","Cooling & info"]],Le=t=>Object.fromEntries(Object.entries(t).filter(([,t])=>void 0!==t&&""!==t&&null!==t));let Ie=class extends lt{constructor(){super(...arguments),this._adding=!1,this._label=t=>Ee[t.name]??je[t.name]??t.name}setConfig(t){this._config={...t,widgets:t.widgets??[]},void 0!==this._selected&&this._selected>=this._config.widgets.length&&(this._selected=void 0)}connectedCallback(){super.connectedCallback(),this._loadHaComponents()}async _loadHaComponents(){if(!customElements.get("ha-form")||!customElements.get("ha-entity-picker"))try{const t=await(window.loadCardHelpers?.()),e=await(t?.createCardElement({type:"entities",entities:[]}));await(e?.constructor?.getConfigElement?.()),this.requestUpdate()}catch{}}_commit(t){this._config=t,Ht(this,"config-changed",{config:t})}_generalChanged(t){t.stopPropagation();const{widgets:e,...i}=t.detail.value;this._commit({...Le(i),widgets:this._config.widgets})}_backgroundChanged(t){t.stopPropagation();const e=t.detail.value,i=e.background_media?.media_content_id!==this._config?.background_media?.media_content_id,s=e.background!==this._config?.background;this._set({background_media:s&&!i?void 0:e.background_media,background:i&&e.background_media?void 0:e.background,background_opacity:e.background_opacity,background_blur:e.background_blur,background_fit:e.background_fit,background_position:e.background_position})}_updateWidget(t,e){const i=[...this._config.widgets];i[t]=e,this._commit({...this._config,widgets:i})}_widgetChanged(t,e){t.stopPropagation(),this._updateWidget(e,Le({...t.detail.value,type:this._config.widgets[e].type}))}_cardYamlChanged(t,e){t.stopPropagation(),!1!==t.detail.isValid?(this._yamlError=void 0,this._updateWidget(e,{...this._config.widgets[e],card:t.detail.value})):this._yamlError="Invalid YAML"}_add(t){const e={type:t,...Ae[t].defaults},i=[...this._config.widgets,e];this._adding=!1,this._selected=i.length-1,this._commit({...this._config,widgets:i})}_move(t,e){const i=[...this._config.widgets],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._commit({...this._config,widgets:i}))}_remove(t){const e=this._config.widgets.filter((e,i)=>i!==t);this._selected=void 0,this._commit({...this._config,widgets:e})}_duplicate(t){const e=[...this._config.widgets];e.splice(t+1,0,structuredClone(e[t])),this._commit({...this._config,widgets:e})}_summary(t){if(t.title)return t.title;const e=t.entity?[t.entity]:(t.entities??[]).map(t=>"string"==typeof t?t:t.entity);return t.power_entity&&e.push(t.power_entity),"card"===t.type?t.card?.type??"":e.map(t=>this.hass?.states[t]?.attributes.friendly_name??t).slice(0,3).join(", ")}_set(t){this._commit(Le({...this._config,...t}))}_setCustomColor(t,e,i){const s=this._config.custom_palette??{},a=Le({...s[t],[e]:i}),o=Le({...s,[t]:Object.keys(a).length?a:void 0});this._set({custom_palette:Object.keys(o).length?o:void 0})}_renderLook(){const t=this._config,e=t.palette??"hearth",i="ha"===t.theme,s=t=>B`<span class="mini" style="background:${t.background}">
        <i style="background:${t.surface}"></i><i style="background:${t.accent}"></i><i style="background:${t.success}"></i><i style="background:${t.text}"></i>
      </span>`;return B`<details class="section palette-section">
      <summary class="section-title"><ha-icon icon="mdi:palette-outline"></ha-icon>Colour palette · ${i?"Home Assistant":Ct[e]?.label??"Custom"}</summary>
      ${i?B`<p class="hint">Palettes are ignored while “Use my HA theme” is selected above.</p>`:Y}
      <div class="palettes ${i?"disabled":""}">
        ${Object.entries(Ct).map(([t,i])=>B`<button class="palette ${e===t?"selected":""}" @click=${()=>this._set({palette:t})}>
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

      ${"custom"!==e||i?Y:["light","dark"].map(e=>B`<div class="custom">
              <div class="sub-title">${"light"===e?"Light mode colours":"Dark mode colours"}</div>
              <div class="pickers">
                ${Ne.map(([i,s])=>B`<yad-color-picker
                    .label=${s}
                    .value=${t.custom_palette?.[e]?.[i]}
                    .placeholder=${Ct.hearth[e][i]}
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
    </details>`}render(){return this._config&&this.hass?void 0!==this._selected?this._renderWidgetEditor(this._selected):B`
      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:monitor-screenshot"></ha-icon>Screen & layout</div>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${(t=>{const e=t.screen??"fill";return[{type:"grid",name:"",schema:[Ue("screen",[["fill","Fill available space"],...Object.entries(Ot).map(([t,e])=>[t,e.label]),["custom","Custom resolution…"]]),Ue("orientation",[["auto","Auto (detect)"],["landscape","Landscape"],["portrait","Portrait"]]),..."custom"===e?[De("screen_width",320,7680,"px"),De("screen_height",320,7680,"px")]:[],..."fill"!==e?[Ue("ui_scale",[["auto","Auto"],["1","100%"],["1.25","125%"],["1.5","150%"],["1.75","175%"],["2","200%"],["3","300%"]])]:[],De("columns",1,12),De("portrait_columns",1,12),..."fill"===e?[Ue("height",[["screen","Fill the screen"],["auto","Fixed row height (scrolls)"]],!0),De("row_height",60,600,"px",10)]:[],De("gap",0,48,"px")]},{type:"grid",name:"",schema:[Ue("theme",[["auto","Auto (follow HA light/dark)"],["light","Light"],["dark","Dark"],["ha","Use my HA theme (ignores palette)"]])]}]})(this._config)}
          .computeLabel=${this._label}
          @value-changed=${this._generalChanged}
        ></ha-form>
        ${this._config.screen&&"fill"!==this._config.screen?B`<p class="hint">
              The dashboard is laid out for this exact resolution and scaled to fit whatever screen it's viewed on, so the
              preview here matches the wall display. <b>UI scale</b> works like your OS display scaling — Auto renders 4K like
              1080p but sharper.
            </p>`:Y}
      </div>

      ${this._renderLook()}

      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:image-outline"></ha-icon>Background image</div>
        <ha-form .hass=${this.hass} .data=${{background_opacity:100,background_blur:0,background_fit:"cover",background_position:"center",...this._config}}
          .schema=${Re} .computeLabel=${this._label} @value-changed=${this._backgroundChanged}></ha-form>
        <p class="hint">Browse Home Assistant media or upload an image with the image picker. Alternatively enter an image URL. Selecting one replaces the other.</p>
      </div>

      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:tune-variant"></ha-icon>Behaviour</div>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${He}
          .computeLabel=${this._label}
          @value-changed=${this._generalChanged}
        ></ha-form>
      </div>

      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:view-grid-outline"></ha-icon>Widgets</div>
        <div class="list">
          ${this._config.widgets.map((t,e)=>{const i=Ae[t.type];return B`<div class="row">
              <ha-icon class="type-icon" icon=${i?.icon??"mdi:help-circle-outline"}></ha-icon>
              <div class="row-text" @click=${()=>this._selected=e}>
                <div class="row-title">${i?.label??t.type}</div>
                <div class="row-sub">${this._summary(t)}</div>
              </div>
              <button title="Move up" ?disabled=${0===e} @click=${()=>this._move(e,-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button title="Move down" ?disabled=${e===this._config.widgets.length-1} @click=${()=>this._move(e,1)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button title="Duplicate" @click=${()=>this._duplicate(e)}><ha-icon icon="mdi:content-copy"></ha-icon></button>
              <button title="Edit" @click=${()=>this._selected=e}><ha-icon icon="mdi:pencil"></ha-icon></button>
              <button title="Remove" class="danger" @click=${()=>this._remove(e)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            </div>`})}
        </div>
        ${this._adding?B`<div class="picker">
              ${Object.keys(Ae).map(t=>B`<button class="pick" @click=${()=>this._add(t)}>
                  <ha-icon icon=${Ae[t].icon}></ha-icon><span>${Ae[t].label}</span>
                </button>`)}
            </div>
            <button class="text-btn" @click=${()=>this._adding=!1}>Cancel</button>`:B`<button class="add" @click=${()=>this._adding=!0}><ha-icon icon="mdi:plus"></ha-icon>Add widget</button>`}
      </div>
      <div class="footer">
        YAD v${Me} ·
        <a href="https://github.com/therealcarnivor/YAD-Dashboard/releases" target="_blank" rel="noreferrer">Release notes</a>
      </div>
    `:Y}_renderWidgetEditor(t){const e=this._config.widgets[t],i=Ae[e.type],s={...i?.defaults,...e},a=Array.isArray(e.entities)&&e.entities.some(t=>"string"!=typeof t),o=a?i?.schema.filter(t=>"entities"!==t.name)??[]:i?.schema??[];return B`
      <div class="editor-head">
        <button @click=${()=>this._selected=void 0} title="Back"><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <ha-icon icon=${i?.icon??"mdi:help"}></ha-icon>
        <span>${i?.label??e.type}</span>
      </div>
      ${a?B`<p class="hint">This widget's entities use custom names/colours/icons — edit them in the code editor (Show code editor).</p>`:Y}
      ${o.length?B`<div class="section">
            <ha-form
              .hass=${this.hass}
              .data=${s}
              .schema=${o}
              .computeLabel=${this._label}
              @value-changed=${e=>this._widgetChanged(e,t)}
            ></ha-form>
          </div>`:Y}
      ${"card"===e.type?B`<div class="section">
            <div class="section-title"><ha-icon icon="mdi:code-braces"></ha-icon>Card configuration (YAML)</div>
            <p class="hint">Paste the YAML of any Home Assistant card — built-in or custom.</p>
            <ha-yaml-editor
              .hass=${this.hass}
              .defaultValue=${e.card}
              @value-changed=${e=>this._cardYamlChanged(e,t)}
            ></ha-yaml-editor>
            ${this._yamlError?B`<div class="error">${this._yamlError}</div>`:Y}
          </div>`:Y}
      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:arrow-expand-all"></ha-icon>Size & placement</div>
        <ha-form
          .hass=${this.hass}
          .data=${s}
          .schema=${"spacer"===e.type?Ce:Se}
          .computeLabel=${this._label}
          @value-changed=${e=>this._widgetChanged(e,t)}
        ></ha-form>
      </div>
    `}};Ie.styles=n`
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
  `,t([mt({attribute:!1})],Ie.prototype,"hass",void 0),t([gt()],Ie.prototype,"_config",void 0),t([gt()],Ie.prototype,"_selected",void 0),t([gt()],Ie.prototype,"_adding",void 0),t([gt()],Ie.prototype,"_yamlError",void 0),Ie=t([ht("yad-card-editor")],Ie);const qe="yad-card",We="yad-card-editor",Be="hearth-dashboard-card",Fe={theme:"auto",palette:"hearth",orientation:"auto",screen:"fill",columns:4,portrait_columns:2,height:"screen",row_height:180,gap:16,display_only:!1,hide_cursor:!1};let Ke=class extends lt{constructor(){super(...arguments),this.preview=!1,this._portraitMedia=window.matchMedia("(orientation: portrait)").matches,this._size={width:0,top:0},this._backgroundRequest=0,this._mql=window.matchMedia("(orientation: portrait)"),this._onOrientation=t=>this._portraitMedia=t.matches,this._resizeObserver=new ResizeObserver(()=>this._measure()),this._onWindowResize=()=>this._measure()}_measure(){const t=this.getBoundingClientRect(),e=Math.max(0,t.top+window.scrollY);Math.abs(t.width-this._size.width)>.5||Math.abs(e-this._size.top)>.5?this._size={width:t.width,top:e}:this._config?.screen&&"fill"!==this._config.screen&&this.requestUpdate()}static getConfigElement(){return document.createElement(We)}static getStubConfig(t){const e=Object.keys(t?.states??{}),i=(t,i)=>e.filter(e=>e.startsWith(`${t}.`)).slice(0,i),s=[{type:"clock",col_span:2,row_span:1,transparent:!0}],a=i("weather",1)[0];a&&s.push({type:"weather",entity:a,col_span:2,row_span:2});const o=i("calendar",3);o.length&&s.push({type:"calendar",entities:o,col_span:1,row_span:3});const n=i("climate",1)[0];n&&s.push({type:"climate",entity:n,col_span:1,row_span:2});const r=i("light",6);r.length&&s.push({type:"toggles",entities:r,col_span:2,row_span:1});const c=i("person",4);return c.length&&s.push({type:"people",entities:c,col_span:1,row_span:1}),{theme:"auto",columns:4,portrait_columns:2,widgets:s}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(void 0!==t.widgets&&!Array.isArray(t.widgets))throw new Error("`widgets` must be a list");for(const e of t.widgets??[]){if(!e||"object"!=typeof e||!e.type)throw new Error("Every widget needs a `type`");if("spacer"===e.type)for(const t of["row_span","portrait_row_span"])if(void 0!==e[t]&&![.25,.5,.75,1].includes(e[t]))throw new Error(`Spacer ${t} must be 0.25, 0.5, 0.75 or 1`)}this._config={...t,widgets:t.widgets??[]}}getCardSize(){return 12}getGridOptions(){return{columns:"full",rows:"auto"}}connectedCallback(){super.connectedCallback(),this._mql.addEventListener("change",this._onOrientation),this._portraitMedia=this._mql.matches,this._resizeObserver.observe(this),window.addEventListener("resize",this._onWindowResize),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this._mql.removeEventListener("change",this._onOrientation),this._resizeObserver.disconnect(),window.removeEventListener("resize",this._onWindowResize),window.clearTimeout(this._backgroundTimer),this._backgroundRequest++,this._backgroundKey=void 0}updated(){const t=this._config?.background_media?.media_content_id||this._config?.background;t!==this._backgroundKey&&(t?.startsWith("media-source://")&&!this.hass||(this._backgroundKey=t,this._resolveBackground(t)))}async _resolveBackground(t){const e=++this._backgroundRequest;if(window.clearTimeout(this._backgroundTimer),this._backgroundError=void 0,t?.startsWith("media-source://"))try{const i=await this.hass.callWS({type:"media_source/resolve_media",media_content_id:t});if(e!==this._backgroundRequest)return;if(!i.url||!i.mime_type?.startsWith("image/"))throw new Error("Select an image for the background");this._backgroundUrl=i.url,this._backgroundTimer=window.setTimeout(()=>{this._resolveBackground(t)},828e5)}catch(i){if(e!==this._backgroundRequest)return;this._backgroundUrl=void 0,this._backgroundError=i instanceof Error?i.message:"Could not load background media",this._backgroundTimer=window.setTimeout(()=>{this._resolveBackground(t)},6e4)}else this._backgroundUrl=t}shouldUpdate(t){if(!this._config)return!1;if(1===t.size&&t.has("hass")){const e=t.get("hass");return this._pushHass(),!e||e.themes?.darkMode!==this.hass?.themes?.darkMode}return!0}_pushHass(){this.renderRoot?.querySelectorAll(".tile > *").forEach(t=>t.hass=this.hass)}get _portrait(){const t=this._config?.orientation??Fe.orientation;return"portrait"===t||"auto"===t&&this._portraitMedia}get _themeClass(){const t=this._config?.theme??Fe.theme;return"auto"===t?this.hass?.themes?.darkMode?"dark":"light":t}_renderWidget(t,e,i,s){const a=Ae[t.type],o=!!this._config.display_only,n={...a?.defaults,...t},r=Math.min(i,Math.max(1,(e?n.portrait_col_span:void 0)??n.col_span??1)),c=(e?n.portrait_row_span:void 0)??n.row_span??1,l="spacer"===t.type?c:Math.max(1,Math.round(c)),d={gridColumn:`span ${r}`,gridRow:`span ${Math.round(l*(s?4:1))}`};if(!a)return B`<div class="tile error" style=${xt(d)}>Unknown widget type “${t.type}”</div>`;const h=(t=>({_$litStatic$:t,r:$t}))(a.tag);return B`<div class=${vt({tile:!0,transparent:!!n.transparent,[`w-${t.type}`]:!0})} style=${xt(d)}>
      ${St`<${h} .hass=${this.hass} .config=${n} .displayOnly=${o}></${h}>`}
    </div>`}_fixedScreen(t,e){const i=t.screen??Fe.screen;if("fill"===i)return;const s=Ot[i];let a=s?.width??Number(t.screen_width),o=s?.height??Number(t.screen_height);if(!(a>0&&o>0))return;e!==o>a&&([a,o]=[o,a]);const n=Number(t.ui_scale),r=n>0?n:((t,e)=>{const i=Math.min(t,e);return Math.max(1,Math.round(i/1080*2)/2)})(a,o);return{width:Math.round(a/r),height:Math.round(o/r),scale:r}}render(){if(!this._config)return Y;const t={...Fe,...this._config},e=this._portrait,i=Math.max(1,e?t.portrait_columns:t.columns),s=this._fixedScreen(t,e),a=!!s||"auto"!==t.height,o=t.widgets.filter(t=>{const i=t.visibility??"all";return"all"===i||"portrait"===i===e}),n=o.some(t=>"spacer"===t.type),r=n?Math.min(t.gap,Math.max(0,(t.row_height-4)/3)):t.gap,c=this._themeClass,l={"--cols":String(i),"--gap":`${t.gap}px`,"--row-height":`${t.row_height}px`,"--row-gap":`${r}px`,..."ha"===c?{}:zt(Tt(t.palette,"dark"===c,t.custom_palette),"dark"===c)};t.accent_color&&(l["--h-accent"]=t.accent_color,l["--h-accent-soft"]=`color-mix(in srgb, ${t.accent_color} 15%, transparent)`);let d={};if(s){const e=this._size.width||s.width,i=this.preview||"auto"===t.height?1/0:Math.max(240,window.innerHeight-this._size.top),a=Math.min(e/s.width,i/s.height),o=Number.isFinite(i)?i:s.height*a;l.height=`${Math.floor(o)}px`,d={width:`${s.width}px`,height:`${s.height}px`,transform:`scale(${a})`,left:`${Math.max(0,(e-s.width*a)/2)}px`,top:`${Math.max(0,(o-s.height*a)/2)}px`,visibility:this._size.width?"visible":"hidden"}}else l.height="screen"===t.height?this.preview?"640px":"100dvh":"auto"===t.height?"auto":t.height;return B`
      <div
        class=${vt({yad:!0,[c]:!0,portrait:e,landscape:!e,fill:a,fixed:!!s,"display-only":t.display_only,"hide-cursor":t.hide_cursor,"has-bg":!!this._backgroundUrl,"quarter-rows":n})}
        style=${xt(l)}
      >
        ${this._backgroundUrl?B`<img class="background-image" src=${this._backgroundUrl} alt=""
          style=${xt({opacity:String(Math.min(100,Math.max(0,t.background_opacity??100))/100),filter:`blur(${Math.min(30,Math.max(0,t.background_blur??0))}px)`,objectFit:t.background_fit??"cover",objectPosition:t.background_position??"center"})}
          @error=${()=>{this._backgroundError="Background image could not be loaded. Check its URL and access permissions."}}
        >`:Y}
        ${this._backgroundError?B`<div class="background-error" role="alert">${this._backgroundError}</div>`:Y}
        <div class="canvas" style=${xt(d)}>
          <div class="grid">
            ${o.length?o.map(t=>this._renderWidget(t,e,i,n)):B`<div class="tile intro">Add some widgets in the card editor to get started.</div>`}
          </div>
        </div>
      </div>
    `}};Ke.styles=[Pt,n`
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
    `],t([mt({attribute:!1})],Ke.prototype,"hass",void 0),t([mt({type:Boolean})],Ke.prototype,"preview",void 0),t([gt()],Ke.prototype,"_config",void 0),t([gt()],Ke.prototype,"_portraitMedia",void 0),t([gt()],Ke.prototype,"_size",void 0),t([gt()],Ke.prototype,"_backgroundUrl",void 0),t([gt()],Ke.prototype,"_backgroundError",void 0),Ke=t([ht(qe)],Ke),customElements.get(Be)||customElements.define(Be,class extends Ke{}),window.customCards=window.customCards||[],window.customCards.push({type:qe,name:"YAD – Yet Another Dashboard",description:"A modular, widget-based home dashboard for wall tablets and kiosks.",preview:!1,documentationURL:"https://github.com/therealcarnivor/YAD-Dashboard"}),console.info(`%c YAD %c ${Me} `,"color:#fff;background:#d4774f;font-weight:700;border-radius:4px 0 0 4px","color:#d4774f;background:#f3eee7;border-radius:0 4px 4px 0");export{qe as CARD_TAG,We as EDITOR_TAG,Ke as YadCard};
