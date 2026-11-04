function t(t,e,i,s){var a,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(a=t[r])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",y=m.reactiveElementPolyfillSupport,v=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const o=a.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const o=this.constructor;if(!1===s&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??w)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,y?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=t=>t,A=x.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+C,T=`<${M}>`,O=document,z=()=>O.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,H="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,R=/>/g,N=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,q=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=W(1),B=W(2),K=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,Y=O.createTreeWalker(O,129);function J(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let a,o=2===e?"<svg>":3===e?"<math>":"",n=D;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===D?"!--"===c[1]?n=j:void 0!==c[1]?n=R:void 0!==c[2]?(q.test(c[2])&&(a=RegExp("</"+c[2],"g")),n=N):void 0!==c[3]&&(n=N):n===N?">"===c[0]?(n=a??D,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,r=c[1],n=void 0===c[3]?N:'"'===c[3]?I:L):n===I||n===L?n=N:n===j||n===R?n=D:(n=N,a=void 0);const d=n===N&&t[e+1].startsWith("/>")?" ":"";o+=n===D?i+T:l>=0?(s.push(r),i.slice(0,l)+E+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0;const n=t.length-1,r=this.parts,[c,l]=Z(t,e);if(this.el=Q.createElement(c,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&r.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[o++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);r.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?st:"?"===n[1]?at:"@"===n[1]?ot:it}),s.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:a}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),Y.nextNode(),r.push({type:2,index:++a});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===M)r.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)r.push({type:7,index:a}),t+=C.length-1}a++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===K)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=P(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);Y.currentNode=s;let a=Y.nextNode(),o=0,n=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new et(a,a.nextSibling,this,t):1===r.type?e=new r.ctor(a,r.name,r.strings,this,t):6===r.type&&(e=new nt(a,this,t)),this._$AV.push(e),r=i[++n]}o!==r?.index&&(a=Y.nextNode(),o++)}return Y.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),P(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Q(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new et(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const a=this.strings;let o=!1;if(void 0===a)t=X(this,t,e,0),o=!P(t)||t!==this._$AH&&t!==K,o&&(this._$AH=t);else{const s=t;let n,r;for(t=a[0],n=0;n<a.length-1;n++)r=X(this,s[i+n],e,n),r===K&&(r=this._$AH[n]),o||=!P(r)||r!==this._$AH[n],r===V?t=V:t!==V&&(t+=(r??"")+a[n+1]),this._$AH[n]=r}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class at extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class ot extends it{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??V)===K)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(Q,et),(x.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;let lt=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new et(e.insertBefore(z(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};lt._$litElement$=!0,lt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:lt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:lt}),(ct.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:w},ut=(t=pt,e,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function mt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return mt({...t,state:!0,attribute:!1})}const ft=1,yt=t=>(...e)=>({_$litDirective$:t,values:e});let vt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const _t=yt(class extends vt{constructor(t){if(super(t),t.type!==ft||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return K}}),wt="important",bt=" !"+wt,$t=yt(class extends vt{constructor(t){if(super(t),t.type!==ft||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(bt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?wt:""):i[t]=s}}return K}}),xt=Symbol.for(""),kt=t=>{if(t?.r===xt)return t?._$litStatic$},At=new Map,St=(t=>(e,...i)=>{const s=i.length;let a,o;const n=[],r=[];let c,l=0,h=!1;for(;l<s;){for(c=e[l];l<s&&void 0!==(o=i[l],a=kt(o));)c+=a+e[++l],h=!0;l!==s&&r.push(o),n.push(c),l++}if(l===s&&n.push(e[s]),h){const t=n.join("$$lit$$");void 0===(e=At.get(t))&&(n.raw=n,At.set(t,e=n)),i=r}return t(e,...i)})(F),Et=n`
  .hearth {
    --h-radius: 26px;
    --h-radius-sm: 16px;
    --h-font: var(--hearth-font, "Nunito", "Quicksand", "Segoe UI Variable", var(--ha-font-family-body, Roboto), system-ui, sans-serif);
  }
  .hearth.light {
    --h-bg: #f3eee7;
    --h-bg-2: #ebe3d8;
    --h-surface: rgba(255, 252, 247, 0.92);
    --h-surface-2: #f4ede4;
    --h-border: rgba(80, 60, 40, 0.06);
    --h-text: #2f2a25;
    --h-muted: #8c8278;
    --h-accent: #d4774f;
    --h-accent-soft: rgba(212, 119, 79, 0.14);
    --h-sage: #6f9273;
    --h-sage-soft: rgba(111, 146, 115, 0.16);
    --h-sky: #5f8fb4;
    --h-amber: #e8a93a;
    --h-amber-soft: rgba(232, 169, 58, 0.18);
    --h-shadow: 0 1px 2px rgba(70, 45, 20, 0.05), 0 10px 30px -12px rgba(70, 45, 20, 0.14);
  }
  .hearth.dark {
    --h-bg: #191714;
    --h-bg-2: #221f1b;
    --h-surface: rgba(39, 35, 31, 0.92);
    --h-surface-2: #322d28;
    --h-border: rgba(255, 240, 220, 0.05);
    --h-text: #f3ece3;
    --h-muted: #a1978c;
    --h-accent: #eb956e;
    --h-accent-soft: rgba(235, 149, 110, 0.16);
    --h-sage: #95b598;
    --h-sage-soft: rgba(149, 181, 152, 0.16);
    --h-sky: #86b2d4;
    --h-amber: #f0b955;
    --h-amber-soft: rgba(240, 185, 85, 0.18);
    --h-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 12px 32px -14px rgba(0, 0, 0, 0.6);
  }
  .hearth.ha {
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
`,Ct=n`
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
    color: #fff;
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
`,Mt=t=>(t??[]).map(t=>"string"==typeof t?{entity:t}:t).filter(t=>!!t&&"string"==typeof t.entity&&t.entity.length>0),Tt=(t,e,i)=>{t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))},Ot=(t,e)=>Tt(t,"hass-more-info",{entityId:e}),zt=t=>t.split(".")[0],Pt=(t,e,i="")=>e||t?.attributes.friendly_name||t?.entity_id||i,Ut=t=>!t||"unavailable"===t.state||"unknown"===t.state,Ht=t=>{if(!t||""===t.state||null===t.state)return;const e=Number(t.state);return Number.isFinite(e)?e:void 0},Dt=t=>t?.locale?.language||t?.language||navigator.language,jt=(t,e)=>{if(!e)return"—";if(t?.formatEntityState)try{return t.formatEntityState(e)}catch{}const i=e.attributes.unit_of_measurement,s=Ht(e),a=void 0!==s?Rt(t,s):Nt(e.state.replace(/_/g," "));return i?`${a} ${i}`:a},Rt=(t,e,i=1)=>new Intl.NumberFormat(Dt(t),{maximumFractionDigits:i}).format(e),Nt=t=>t?t.charAt(0).toUpperCase()+t.slice(1):t,Lt=(t,e)=>{if("12"===e)return!0;if("24"===e)return!1;const i=t?.locale?.time_format;if("12"===i)return!0;if("24"===i)return!1;const s="system"===i?void 0:Dt(t);return!0===new Intl.DateTimeFormat(s,{hour:"numeric"}).resolvedOptions().hour12},It=(t,e,i)=>new Intl.DateTimeFormat(Dt(t),{hour:"numeric",minute:"2-digit",hour12:Lt(t,i)}).format(e),qt=t=>new Date(t.getFullYear(),t.getMonth(),t.getDate()),Wt=t=>{if(/^\d{4}-\d{2}-\d{2}$/.test(t)){const[e,i,s]=t.split("-").map(Number);return new Date(e,i-1,s)}return new Date(t)};class Ft extends lt{constructor(){super(...arguments),this.displayOnly=!1}shouldUpdate(t){if(1!==t.size||!t.has("hass"))return!0;const e=t.get("hass");return!e||!this.hass||(e.locale!==this.hass.locale||e.themes!==this.hass.themes||this.watchedEntities().some(t=>e.states[t]!==this.hass.states[t]))}callService(t,e,i){!this.displayOnly&&this.hass&&this.hass.callService(t,e,i)}}t([mt({attribute:!1})],Ft.prototype,"hass",void 0),t([mt({attribute:!1})],Ft.prototype,"config",void 0),t([mt({type:Boolean,reflect:!0,attribute:"display-only"})],Ft.prototype,"displayOnly",void 0);let Bt=class extends Ft{constructor(){super(...arguments),this._now=new Date}watchedEntities(){return[]}connectedCallback(){super.connectedCallback(),this._schedule()}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}_schedule(){const t=new Date;this._now=t;const e=this.config?.show_seconds?1e3-t.getMilliseconds():6e4-1e3*t.getSeconds()-t.getMilliseconds();this._timer=window.setTimeout(()=>this._schedule(),e+20)}render(){const t=this.config,e="auto"===t.time_format?void 0:t.time_format,i=Lt(this.hass,e);let s=It(this.hass,this._now,e),a="";if(i){const t=s.match(/^(.*?)\s*([ap]\.?\s?m\.?)$/i);t&&(s=t[1],a=t[2])}const o=String(this._now.getSeconds()).padStart(2,"0"),n=new Intl.DateTimeFormat(Dt(this.hass),{weekday:"long",day:"numeric",month:"long"}).format(this._now),r=t.name??this.hass?.user?.name?.split(" ")[0];return F`
      <div class="clock">
        ${!1!==t.greeting?F`<div class="greeting">${c=this._now.getHours(),c<5?"Good night":c<12?"Good morning":c<18?"Good afternoon":"Good evening"}${r?F`, <span>${r}</span>`:""}</div>`:""}
        <div class="time num">
          ${s}${t.show_seconds?F`<span class="sec">${o}</span>`:""}${a?F`<span class="ampm">${a}</span>`:""}
        </div>
        ${!1!==t.show_date?F`<div class="date">${n}</div>`:""}
      </div>
    `;var c}};Bt.styles=[Ct,n`
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
    `],t([gt()],Bt.prototype,"_now",void 0),Bt=t([dt("hearth-widget-clock")],Bt);const Kt={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},Vt={"clear-night":"Clear night",partlycloudy:"Partly cloudy","lightning-rainy":"Thunderstorms","snowy-rainy":"Sleet","windy-variant":"Windy",exceptional:"Exceptional"},Gt=(t,e=!1)=>!e||"sunny"!==t&&"clear-night"!==t?e&&"partlycloudy"===t?"mdi:weather-night-partly-cloudy":Kt[t??""]??"mdi:weather-cloudy":"mdi:weather-night";let Yt=class extends Ft{watchedEntities(){return[this.config.entity]}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe()}connectedCallback(){super.connectedCallback(),this.hass&&this._subscribe()}updated(t){(t.has("hass")||t.has("config"))&&this._subscribe()}_unsubscribe(){this._unsub?.then(t=>t()).catch(()=>{}),this._unsub=void 0,this._subscribedKey=void 0}_subscribe(){if(!this.hass||!this.config?.entity||!this.isConnected)return;const t=this.config.forecast_type??"daily",e=`${this.config.entity}|${t}`;this._subscribedKey!==e&&(this._unsubscribe(),this._subscribedKey=e,this._unsub=this.hass.connection.subscribeMessage(t=>this._forecast=t.forecast,{type:"weather/subscribe_forecast",forecast_type:t,entity_id:this.config.entity}),this._unsub.catch(()=>{this._forecast=this.hass?.states[this.config.entity]?.attributes.forecast}))}_label(t){const e=new Date(t.datetime),i=this.config.forecast_type??"daily";if("hourly"===i)return new Intl.DateTimeFormat(Dt(this.hass),{hour:"numeric"}).format(e);const s=new Intl.DateTimeFormat(Dt(this.hass),{weekday:"short"}).format(e);return"twice_daily"===i?`${s}${!1===t.is_daytime?" ☾":""}`:s}render(){const t=this.hass?.states[this.config.entity];if(!t)return F`<div class="empty"><ha-icon icon="mdi:weather-cloudy-alert"></ha-icon>Weather entity not found<br /><small>${this.config.entity}</small></div>`;const e=t.attributes,i=e.temperature_unit??"°",s=i.startsWith("°")?"°":` ${i}`,a="clear-night"===t.state,o=(this._forecast??[]).slice(0,this.config.forecast_count??5),n="hourly"!==this.config.forecast_type&&this._forecast?.length?this._forecast[0]:void 0,r=jt(this.hass,t),c=Ut(t)?"Unavailable":r===t.state||r===Nt(t.state)?Vt[t.state]??Nt(t.state.replace(/-/g," ")):r;return F`
      <div class="now tone-${(t=>"sunny"===t?"sun":"clear-night"===t?"night":/rain|pour|hail|lightning/.test(t??"")?"rain":"cloud")(t.state)}" @click=${()=>!this.displayOnly&&Ot(this,this.config.entity)}>
        <div class="icon-wrap"><ha-icon icon=${Gt(t.state,a)}></ha-icon></div>
        <div class="main">
          <div class="temp num">${void 0!==e.temperature?Rt(this.hass,e.temperature,0):"–"}<span>${s}</span></div>
          <div class="cond">${Nt(c)}</div>
          ${void 0!==n?.temperature?F`<div class="hilo muted num">
                ↑ ${Rt(this.hass,n.temperature,0)}${s}
                ${void 0!==n.templow?F` · ↓ ${Rt(this.hass,n.templow,0)}${s}`:V}
              </div>`:V}
        </div>
        ${!1!==this.config.show_details?F`<div class="details">
              ${void 0!==e.humidity?F`<span class="chip"><ha-icon icon="mdi:water-percent"></ha-icon>${Rt(this.hass,e.humidity,0)}%</span>`:V}
              ${void 0!==e.wind_speed?F`<span class="chip"
                    ><ha-icon icon="mdi:weather-windy"></ha-icon>${Rt(this.hass,e.wind_speed,0)} ${e.wind_speed_unit??""}</span
                  >`:V}
            </div>`:V}
      </div>
      ${o.length?F`<div class="forecast">
            ${o.map(t=>F`<div class="day">
                <div class="label">${this._label(t)}</div>
                <ha-icon icon=${Gt(t.condition,!1===t.is_daytime)}></ha-icon>
                <div class="t num">${void 0!==t.temperature?Rt(this.hass,t.temperature,0)+"°":""}</div>
                ${void 0!==t.templow?F`<div class="tl num">${Rt(this.hass,t.templow,0)}°</div>`:V}
                ${t.precipitation_probability?F`<div class="rain num">${t.precipitation_probability}%</div>`:V}
              </div>`)}
          </div>`:V}
    `}};Yt.styles=[Ct,n`
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
    `],t([gt()],Yt.prototype,"_forecast",void 0),Yt=t([dt("hearth-widget-weather")],Yt);const Jt=["var(--h-accent)","var(--h-sage)","var(--h-sky)","var(--h-amber)","#b07aa1","#c9a27e"];let Zt=class extends Ft{watchedEntities(){return Mt(this.config.entities).map(t=>t.entity)}connectedCallback(){super.connectedCallback(),this._fetchedKey=void 0,this.hass&&this._fetch()}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._timer),this._timer=void 0}updated(t){const e=JSON.stringify([this.config.entities,this.config.days]);(t.has("config")||t.has("hass"))&&this.hass&&e!==this._fetchedKey&&(this._fetchedKey=e,this._fetch()),!this._timer&&this.hass&&(this._timer=window.setInterval(()=>{this._fetch()},6e4*(this.config.refresh_minutes??5)))}async _fetch(){if(!this.hass)return;const t=Mt(this.config.entities),e=qt(new Date),i=((t,e)=>{const i=new Date(t);return i.setDate(i.getDate()+e),i})(e,this.config.days??7),s=`start=${encodeURIComponent(e.toISOString())}&end=${encodeURIComponent(i.toISOString())}`;try{const e=await Promise.all(t.map(async(t,e)=>(await this.hass.callApi("GET",`calendars/${t.entity}?${s}`)).map(i=>{const s=!i.start.dateTime;return{summary:i.summary,start:Wt(i.start.dateTime??i.start.date),end:Wt(i.end.dateTime??i.end.date),allDay:s,location:i.location,color:t.color??Jt[e%Jt.length]}}))),i=Date.now();this._events=e.flat().filter(t=>t.end.getTime()>i).sort((t,e)=>t.start.getTime()-e.start.getTime()||Number(e.allDay)-Number(t.allDay)),this._error=void 0}catch(t){this._error=t?.message??"Could not load calendar"}}_timeLabel(t){if(t.allDay)return"All day";const e=t=>It(this.hass,t);return`${e(t.start)} – ${e(t.end)}`}render(){const t=this.config.title??"Coming up",e=F`<div class="head"><ha-icon icon="mdi:calendar-heart"></ha-icon>${t}</div>`;if(this._error)return F`${e}<div class="empty"><ha-icon icon="mdi:calendar-alert"></ha-icon>${this._error}</div>`;if(!this._events)return F`${e}<div class="empty">Loading…</div>`;const i=this._events.slice(0,this.config.max_events??8);if(!i.length)return F`${e}<div class="empty"><ha-icon icon="mdi:sofa-outline"></ha-icon>Nothing planned — enjoy the downtime</div>`;const s=qt(new Date),a=new Map;for(const t of i){const e=Math.max(qt(t.start).getTime(),s.getTime());a.has(e)||a.set(e,[]),a.get(e).push(t)}return F`
      ${e}
      <div class="list scroll">
        ${[...a.entries()].map(([t,e])=>F`
            <div class="day-label ${t===s.getTime()?"today":""}">${((t,e)=>{const i=qt(new Date),s=Math.round((qt(e).getTime()-i.getTime())/864e5);return 0===s||1===s?Nt(new Intl.RelativeTimeFormat(Dt(t),{numeric:"auto"}).format(s,"day")):new Intl.DateTimeFormat(Dt(t),{weekday:"long",day:"numeric",month:"short"}).format(e)})(this.hass,new Date(t))}</div>
            ${e.map(t=>F`<div class="event">
                <span class="bar" style="background:${t.color}"></span>
                <div class="body">
                  <div class="summary">${t.summary}</div>
                  <div class="meta muted num">
                    ${this._timeLabel(t)}${this.config.show_location&&t.location?F` · ${t.location}`:V}
                  </div>
                </div>
              </div>`)}
          `)}
      </div>
    `}};Zt.styles=[Ct,n`
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
    `],t([gt()],Zt.prototype,"_events",void 0),t([gt()],Zt.prototype,"_error",void 0),Zt=t([dt("hearth-widget-calendar")],Zt);const Qt=(t,e)=>{const i=Ht(e);if(void 0===i||!e)return["–",""];const s=e.attributes.unit_of_measurement??"W";return"W"===s&&Math.abs(i)>=1e3?[Rt(t,i/1e3,2),"kW"]:[Rt(t,i,"W"===s?0:2),s]};let Xt=class extends Ft{watchedEntities(){const t=this.config;return[t.power_entity,t.solar_power_entity,t.battery_entity,t.today_entity,t.solar_today_entity,t.cost_entity].filter(t=>!!t)}connectedCallback(){super.connectedCallback(),this._fetchedKey=void 0,this.hass&&this._fetchHistory()}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this._timer),this._timer=void 0}updated(t){if(!1===this.config.show_graph||!this.config.power_entity||!this.hass)return;const e=`${this.config.power_entity}|${this.config.hours_to_show}`;(t.has("config")||t.has("hass"))&&e!==this._fetchedKey&&(this._fetchedKey=e,this._fetchHistory()),this._timer||(this._timer=window.setInterval(()=>{this._fetchHistory()},3e5))}async _fetchHistory(){const t=this.config.power_entity;if(!this.hass||!t||!1===this.config.show_graph)return;const e=this.config.hours_to_show??24,i=new Date,s=new Date(i.getTime()-36e5*e);try{const e=((await this.hass.callWS({type:"history/history_during_period",start_time:s.toISOString(),end_time:i.toISOString(),entity_ids:[t],minimal_response:!0,no_attributes:!0}))[t]??[]).map(t=>({t:1e3*t.lu,v:Number(t.s)})).filter(t=>Number.isFinite(t.v));this._series=this._bucket(e,s.getTime(),i.getTime())}catch{this._series=void 0}}_bucket(t,e,i){if(!t.length)return[];const s=(i-e)/48,a=[];let o=0,n=t[0].v;for(let i=0;i<48;i++){const r=e+i*s,c=r+s;let l=0,h=r;for(;o<t.length&&t[o].t<c;){const e=Math.max(t[o].t,r);l+=n*(e-h),h=e,n=t[o].v,o++}l+=n*(c-h),a.push(l/s)}return a}_sparkline(t){const e=100,i=Math.max(...t,1),s=Math.min(...t,0),a=i-s||1,o=t.map((i,o)=>[o/(t.length-1)*300,e-(i-s)/a*92-4]);let n=`M ${o[0][0]} ${o[0][1]}`;for(let t=1;t<o.length;t++){const[e,i]=o[t-1],[s,a]=o[t],r=(e+s)/2;n+=` C ${r} ${i}, ${r} ${a}, ${s} ${a}`}return B`
      <svg viewBox="0 0 ${300} ${e}" preserveAspectRatio="none" class="spark">
        <defs>
          <linearGradient id="hearth-energy-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--h-accent)" stop-opacity="0.35"></stop>
            <stop offset="100%" stop-color="var(--h-accent)" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        <path d="${n} L ${300} ${e} L 0 ${e} Z" fill="url(#hearth-energy-fill)"></path>
        <path d=${n} fill="none" stroke="var(--h-accent)" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linecap="round"></path>
      </svg>`}_stat(t,e,i,s=""){if(!i)return V;const a=this.hass?.states[i],o=Ut(a)?"–":i===this.config.solar_power_entity?Qt(this.hass,a).join(" "):jt(this.hass,a);return F`<div class="stat ${s}" @click=${()=>!this.displayOnly&&Ot(this,i)}>
      <ha-icon icon=${t}></ha-icon>
      <div>
        <div class="stat-value num">${o}</div>
        <div class="stat-label">${e}</div>
      </div>
    </div>`}render(){const t=this.config,e=t.power_entity?this.hass?.states[t.power_entity]:void 0,[i,s]=Qt(this.hass,e),a=t.battery_entity?Ht(this.hass?.states[t.battery_entity]):void 0,o=void 0===a?"mdi:battery":"mdi:battery"+(a>=95?"":a<10?"-outline":"-"+10*Math.round(a/10));return F`
      <div class="head"><ha-icon icon="mdi:lightning-bolt"></ha-icon>${t.title??"Energy"}</div>
      ${t.power_entity?F`<div class="now" @click=${()=>!this.displayOnly&&Ot(this,t.power_entity)}>
            <span class="value num">${i}</span><span class="unit">${s}</span>
            <span class="now-label muted">using now</span>
          </div>`:V}
      ${!1!==t.show_graph&&this._series?.length?F`<div class="graph">${this._sparkline(this._series)}</div>`:F`<div class="grow"></div>`}
      <div class="stats">
        ${this._stat("mdi:home-lightning-bolt-outline","Today",t.today_entity)}
        ${this._stat("mdi:solar-power-variant-outline","Solar now",t.solar_power_entity,"sun")}
        ${this._stat("mdi:white-balance-sunny","Solar today",t.solar_today_entity,"sun")}
        ${this._stat(o,"Battery",t.battery_entity,"sage")}
        ${this._stat("mdi:cash","Cost today",t.cost_entity)}
      </div>
    `}};Xt.styles=[Ct,n`
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
    `],t([gt()],Xt.prototype,"_series",void 0),Xt=t([dt("hearth-widget-energy")],Xt);const te={off:"mdi:power",heat:"mdi:fire",cool:"mdi:snowflake",heat_cool:"mdi:sun-snowflake-variant",auto:"mdi:thermostat-auto",dry:"mdi:water-percent",fan_only:"mdi:fan"},ee={heating:"Heating",cooling:"Cooling",idle:"Idle",off:"Off",drying:"Drying",fan:"Fan",preheating:"Preheating"};let ie=class extends Ft{watchedEntities(){return[this.config.entity,this.config.humidity_entity].filter(t=>!!t)}willUpdate(t){t.has("hass")&&void 0!==this._pendingTarget&&void 0===this._debounce&&(this._pendingTarget=void 0)}_nudge(t){const e=this.hass?.states[this.config.entity];if(!e||this.displayOnly)return;const i=e.attributes,s=i.target_temp_step??("°F"===this.hass?.config?.unit_system?.temperature?1:.5),a=this._pendingTarget??i.temperature;if("number"!=typeof a)return;const o=Math.min(i.max_temp??35,Math.max(i.min_temp??5,Math.round((a+s*t)/s)*s));this._pendingTarget=o,window.clearTimeout(this._debounce),this._debounce=window.setTimeout(()=>{this._debounce=void 0,this.callService("climate","set_temperature",{entity_id:this.config.entity,temperature:o})},900)}_setMode(t){this.callService("climate","set_hvac_mode",{entity_id:this.config.entity,hvac_mode:t})}render(){const t=this.hass?.states[this.config.entity];if(!t)return F`<div class="empty"><ha-icon icon="mdi:thermostat"></ha-icon>Climate entity not found<br /><small>${this.config.entity}</small></div>`;const e=t.attributes,i=Ut(t),s=this._pendingTarget??e.temperature,a=e.hvac_action??t.state,o="heating"===a||"preheating"===a?"heat":"cooling"===a?"cool":"off"===t.state?"off":"idle",n=t=>Rt(this.hass,t,1),r=this.config.humidity_entity?this.hass?.states[this.config.humidity_entity]?.state:e.current_humidity,c=e.min_temp??5,l=e.max_temp??35,h=void 0!==s?Math.min(1,Math.max(0,(s-c)/(l-c))):0,d=2*Math.PI*46*.75;return F`
      <div class="head">
        <ha-icon icon="mdi:thermostat"></ha-icon>${Pt(t,this.config.name??this.config.title)}
        <span class="spacer"></span>
        <span class="chip action ${o}">${i?"Unavailable":ee[a]??Nt(a.replace(/_/g," "))}</span>
      </div>
      <div class="body">
        <button class="round control" aria-label="Lower" @click=${()=>this._nudge(-1)}><ha-icon icon="mdi:minus"></ha-icon></button>
        <div class="dial ${o}" @click=${()=>!this.displayOnly&&Ot(this,this.config.entity)}>
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r=${46} class="track" stroke-dasharray="${d} 999" transform="rotate(135 50 50)"></circle>
            <circle cx="50" cy="50" r=${46} class="fill" stroke-dasharray="${d*h} 999" transform="rotate(135 50 50)"></circle>
          </svg>
          <div class="readout">
            <div class="current num">${void 0!==e.current_temperature?n(e.current_temperature):"–"}<span>°</span></div>
            <div class="target muted num">
              ${void 0!==s?F`Set to <strong>${n(s)}°</strong>`:void 0!==e.target_temp_low?F`<strong>${n(e.target_temp_low)}–${n(e.target_temp_high)}°</strong>`:V}
            </div>
            ${null!=r?F`<div class="hum muted num"><ha-icon icon="mdi:water-percent"></ha-icon>${r}%</div>`:V}
          </div>
        </div>
        <button class="round control" aria-label="Raise" @click=${()=>this._nudge(1)}><ha-icon icon="mdi:plus"></ha-icon></button>
      </div>
      ${!1!==this.config.show_modes&&Array.isArray(e.hvac_modes)?F`<div class="modes">
            ${e.hvac_modes.map(e=>F`<button
                class="mode ${e===t.state?"active":""}"
                ?disabled=${this.displayOnly}
                @click=${()=>this._setMode(e)}
                title=${Nt(e.replace(/_/g," "))}
              >
                <ha-icon icon=${te[e]??"mdi:thermostat"}></ha-icon>
              </button>`)}
          </div>`:V}
    `}};ie.styles=[Ct,n`
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
        color: #fff;
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
    `],t([gt()],ie.prototype,"_pendingTarget",void 0),ie=t([dt("hearth-widget-climate")],ie);const se=new Set(["on","open","opening","unlocked","playing","home","active","heat","cool"]);let ae=class extends Ft{constructor(){super(...arguments),this._handlers=new Map}watchedEntities(){return Mt(this.config.entities).map(t=>t.entity)}_toggle(t){const e=zt(t);"scene"===e||"script"===e?this.callService(e,"turn_on",{entity_id:t}):"button"===e||"input_button"===e?this.callService(e,"press",{entity_id:t}):"lock"===e?this.callService("lock","locked"===this.hass?.states[t]?.state?"unlock":"lock",{entity_id:t}):"cover"===e?this.callService("cover","toggle",{entity_id:t}):this.callService("homeassistant","toggle",{entity_id:t})}_press(t){let e=this._handlers.get(t);return e||(e=((t,e)=>{let i,s=!1,a=!1;return{down:()=>{s=!1,a=!0,i=window.setTimeout(()=>{s=!0,e()},550)},up:()=>{window.clearTimeout(i),a&&!s&&t(),a=!1},cancel:()=>{window.clearTimeout(i),a=!1}}})(()=>this._toggle(t),()=>Ot(this,t)),this._handlers.set(t,e)),e}render(){const t=Mt(this.config.entities);return F`
      ${this.config.title?F`<div class="head"><ha-icon icon="mdi:lightbulb-group-outline"></ha-icon>${this.config.title}</div>`:V}
      <div class="grid scroll" style="--min:${this.config.min_tile_width??150}px">
        ${t.map(t=>{const e=this.hass?.states[t.entity],i=(t=>!!t&&se.has(t.state))(e),s=i&&Array.isArray(e?.attributes.rgb_color)?`rgb(${e.attributes.rgb_color.join(",")})`:void 0,a=this._press(t.entity);return F`<div
            class="tile ${i?"on":""} ${e&&"unavailable"!==e.state?"":"unavailable"}"
            style=${$t(s?{"--tint":s}:{})}
            role="button"
            @pointerdown=${a.down}
            @pointerup=${a.up}
            @pointerleave=${a.cancel}
            @pointercancel=${a.cancel}
            @contextmenu=${t=>t.preventDefault()}
          >
            <div class="icon">
              ${t.icon?F`<ha-icon .icon=${t.icon}></ha-icon>`:F`<ha-state-icon .hass=${this.hass} .stateObj=${e}></ha-state-icon>`}
            </div>
            <div class="text">
              <div class="name">${Pt(e,t.name,t.entity)}</div>
              <div class="state">${((t,e)=>{if(!e||"unavailable"===e.state)return"Unavailable";const i=zt(e.entity_id);return"scene"===i||"script"===i?"on"===e.state?"Running":"Tap to run":"button"===i||"input_button"===i?"Tap to press":Ut(e)?"Unavailable":"light"===i&&"on"===e.state&&"number"==typeof e.attributes.brightness?`On · ${Rt(t,e.attributes.brightness/255*100,0)}%`:jt(t,e)})(this.hass,e)}</div>
            </div>
          </div>`})}
      </div>
    `}};ae.styles=[Ct,n`
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
    `],ae=t([dt("hearth-widget-toggles")],ae);let oe=class extends Ft{watchedEntities(){return Mt(this.config.entities).map(t=>t.entity)}render(){const t=Mt(this.config.entities),e=this.config.layout??"grid";return F`
      ${this.config.title?F`<div class="head"><ha-icon icon="mdi:gauge"></ha-icon>${this.config.title}</div>`:V}
      <div class="${e} scroll" style="--min:${this.config.min_tile_width??140}px">
        ${t.map(t=>{const e=this.hass?.states[t.entity],[i,s]=((t,e)=>{if(!e||Ut(e))return["–",""];const i=Ht(e),s=e.attributes.unit_of_measurement??"";return void 0!==i?[Rt(t,i,1),s]:[t?.formatEntityState?t.formatEntityState(e):e.state,""]})(this.hass,e);return F`<div class="item" @click=${()=>!this.displayOnly&&Ot(this,t.entity)}>
            <div class="icon" style=${t.color?`color:${t.color}`:""}>
              ${t.icon?F`<ha-icon .icon=${t.icon}></ha-icon>`:F`<ha-state-icon .hass=${this.hass} .stateObj=${e}></ha-state-icon>`}
            </div>
            <div class="name">${Pt(e,t.name,t.entity)}</div>
            <div class="value num">${i}${s?F`<span class="unit">${s}</span>`:V}</div>
          </div>`})}
      </div>
    `}};oe.styles=[Ct,n`
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
    `],oe=t([dt("hearth-widget-sensors")],oe);let ne=class extends Ft{watchedEntities(){return[this.config.entity]}_call(t,e={}){this.callService("media_player",t,{entity_id:this.config.entity,...e})}_volume(t){const e=Number(t.target.value);this._call("volume_set",{volume_level:e/100})}render(){const t=this.hass?.states[this.config.entity];if(!t)return F`<div class="empty"><ha-icon icon="mdi:speaker-off"></ha-icon>Media player not found<br /><small>${this.config.entity}</small></div>`;const e=t.attributes,i=Pt(t,this.config.name??this.config.title),s="playing"===t.state||"paused"===t.state||"buffering"===t.state,a=s?e.entity_picture_local??e.entity_picture:void 0,o=e.supported_features??0;return s?F`
      ${a?F`<div class="backdrop" style="background-image:url('${a}')"></div>`:V}
      <div class="head"><ha-icon icon="mdi:music-note-outline"></ha-icon>${i}</div>
      <div class="content">
        <div class="art" @click=${()=>!this.displayOnly&&Ot(this,this.config.entity)}>
          ${a?F`<img src=${a} alt="" />`:F`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="info">
          <div class="title">${e.media_title??"Unknown"}</div>
          <div class="artist muted">${e.media_artist??e.media_album_name??e.app_name??""}</div>
          <div class="controls control">
            ${16&o?F`<button class="round" @click=${()=>this._call("media_previous_track")}><ha-icon icon="mdi:skip-previous"></ha-icon></button>`:V}
            <button class="round primary big" @click=${()=>this._call("media_play_pause")}>
              <ha-icon icon=${"playing"===t.state?"mdi:pause":"mdi:play"}></ha-icon>
            </button>
            ${32&o?F`<button class="round" @click=${()=>this._call("media_next_track")}><ha-icon icon="mdi:skip-next"></ha-icon></button>`:V}
          </div>
          ${this.config.show_volume&&4&o?F`<input
                class="volume control"
                type="range"
                min="0"
                max="100"
                .value=${String(Math.round(100*(e.volume_level??0)))}
                @change=${this._volume}
              />`:V}
        </div>
      </div>
    `:F`
        <div class="head"><ha-icon icon="mdi:music-note-outline"></ha-icon>${i}</div>
        <div class="empty" @click=${()=>!this.displayOnly&&Ot(this,this.config.entity)}>
          <ha-icon icon=${Ut(t)?"mdi:speaker-off":"mdi:music-note-off-outline"}></ha-icon>
          ${Ut(t)?"Unavailable":"Nothing playing"}
        </div>
      `}};ne.styles=[Ct,n`
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
    `],ne=t([dt("hearth-widget-media")],ne);let re=class extends Ft{watchedEntities(){return Mt(this.config.entities).map(t=>t.entity)}render(){const t=Mt(this.config.entities);return F`
      ${this.config.title?F`<div class="head"><ha-icon icon="mdi:home-account"></ha-icon>${this.config.title}</div>`:V}
      <div class="people">
        ${t.map(t=>{const e=this.hass?.states[t.entity],i=Pt(e,t.name,t.entity),s="home"===e?.state,a=s?"Home":"not_home"===e?.state?"Away":e?Nt(this.hass?.formatEntityState?.(e)??e.state):"Unknown",o=e?.attributes.entity_picture;return F`<div class="person ${s?"home":"away"}" @click=${()=>!this.displayOnly&&Ot(this,t.entity)}>
            <div class="avatar">
              ${o?F`<img src=${o} alt="" />`:F`<span>${(t=>t.split(/\s+/).slice(0,2).map(t=>t.charAt(0).toUpperCase()).join(""))(i)}</span>`}
              <span class="dot"></span>
            </div>
            <div class="name">${i.split(" ")[0]}</div>
            ${!1!==this.config.show_state?F`<div class="state">${a}</div>`:V}
          </div>`})}
      </div>
    `}};re.styles=[Ct,n`
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
    `],re=t([dt("hearth-widget-people")],re);let ce=class extends Ft{watchedEntities(){return[]}shouldUpdate(){return!0}willUpdate(t){if(t.has("config")){const t=JSON.stringify(this.config.card??null);t!==this._builtFor&&(this._builtFor=t,this._build())}this._card&&this.hass&&(this._card.hass=this.hass)}async _build(){const t=this.config.card;if(!t?.type)return this._card=void 0,void(this._error="Add a `card:` configuration to this widget.");try{const e=await(window.loadCardHelpers?.());if(!e)throw new Error("Card helpers unavailable");const i=e.createCardElement(t);i.addEventListener("ll-rebuild",t=>{t.stopPropagation(),this._builtFor=void 0,this.requestUpdate("config")}),this.hass&&(i.hass=this.hass),this._card=i,this._error=void 0}catch(t){this._error=t.message}}render(){return this._error?F`<div class="empty"><ha-icon icon="mdi:card-remove-outline"></ha-icon>${this._error}</div>`:F`<div class="wrap scroll">${this._card}</div>`}};ce.styles=[Ct,n`
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
    `],t([gt()],ce.prototype,"_card",void 0),t([gt()],ce.prototype,"_error",void 0),ce=t([dt("hearth-widget-card")],ce);const le=(t,e,i=!1)=>({name:t,required:i,selector:{entity:e?{domain:e}:{}}}),he=(t,e)=>({name:t,selector:{entity:{multiple:!0,...e?{domain:e}:{}}}}),de=(t,e,i,s=1)=>({name:t,selector:{number:{min:e,max:i,step:s,mode:"box"}}}),pe=t=>({name:t,selector:{boolean:{}}}),ue=t=>({name:t,selector:{text:{}}}),me=(t,e)=>({name:t,selector:{select:{mode:"dropdown",options:e.map(([t,e])=>({value:t,label:e}))}}}),ge={clock:{label:"Clock & greeting",icon:"mdi:clock-outline",tag:"hearth-widget-clock",defaults:{col_span:2,row_span:1,transparent:!0},schema:[{type:"grid",name:"",schema:[pe("greeting"),ue("name"),pe("show_date"),pe("show_seconds"),me("time_format",[["auto","Follow Home Assistant"],["24","24 hour"],["12","12 hour"]])]}]},weather:{label:"Weather & forecast",icon:"mdi:weather-partly-cloudy",tag:"hearth-widget-weather",defaults:{col_span:2,row_span:2,forecast_type:"daily",forecast_count:5},schema:[le("entity","weather",!0),{type:"grid",name:"",schema:[me("forecast_type",[["daily","Daily"],["hourly","Hourly"],["twice_daily","Twice daily"]]),de("forecast_count",0,10),pe("show_details")]}]},calendar:{label:"Calendar agenda",icon:"mdi:calendar-month-outline",tag:"hearth-widget-calendar",defaults:{col_span:1,row_span:3,days:7,max_events:8},schema:[ue("title"),he("entities","calendar"),{type:"grid",name:"",schema:[de("days",1,31),de("max_events",1,50),pe("show_location"),de("refresh_minutes",1,120)]}]},energy:{label:"Energy usage",icon:"mdi:lightning-bolt-outline",tag:"hearth-widget-energy",defaults:{col_span:2,row_span:2,show_graph:!0,hours_to_show:24},schema:[ue("title"),le("power_entity","sensor"),le("today_entity","sensor"),le("solar_power_entity","sensor"),le("solar_today_entity","sensor"),le("battery_entity","sensor"),le("cost_entity","sensor"),{type:"grid",name:"",schema:[pe("show_graph"),de("hours_to_show",1,168)]}]},climate:{label:"Climate / thermostat",icon:"mdi:thermostat",tag:"hearth-widget-climate",defaults:{col_span:1,row_span:2,show_modes:!0},schema:[le("entity","climate",!0),{type:"grid",name:"",schema:[ue("name"),pe("show_modes")]},le("humidity_entity","sensor")]},toggles:{label:"Lights & switches",icon:"mdi:lightbulb-group-outline",tag:"hearth-widget-toggles",defaults:{col_span:2,row_span:1},schema:[ue("title"),he("entities",["light","switch","fan","input_boolean","scene","script","cover","lock","button","input_button"]),de("min_tile_width",100,400,10)]},sensors:{label:"Sensors",icon:"mdi:gauge",tag:"hearth-widget-sensors",defaults:{col_span:2,row_span:1,layout:"grid"},schema:[ue("title"),he("entities"),{type:"grid",name:"",schema:[me("layout",[["grid","Tiles"],["list","List"]]),de("min_tile_width",100,400,10)]}]},media:{label:"Media player",icon:"mdi:music-circle-outline",tag:"hearth-widget-media",defaults:{col_span:2,row_span:1},schema:[le("entity","media_player",!0),{type:"grid",name:"",schema:[ue("name"),pe("show_volume")]}]},people:{label:"People & presence",icon:"mdi:account-group-outline",tag:"hearth-widget-people",defaults:{col_span:1,row_span:1},schema:[ue("title"),he("entities","person"),pe("show_state")]},card:{label:"Any Home Assistant card",icon:"mdi:card-outline",tag:"hearth-widget-card",defaults:{col_span:1,row_span:1,card:{type:"markdown",content:"Hello from Hearth 👋"}},schema:[]}},fe=[{type:"grid",name:"",schema:[de("col_span",1,12),de("row_span",1,12),de("portrait_col_span",1,12),de("portrait_row_span",1,12),me("visibility",[["all","Always"],["landscape","Landscape only"],["portrait","Portrait only"]]),pe("transparent")]}],ye={entity:"Entity",entities:"Entities",title:"Title",name:"Name",greeting:"Show greeting",show_date:"Show date",show_seconds:"Show seconds",time_format:"Time format",forecast_type:"Forecast type",forecast_count:"Forecast items",show_details:"Show humidity & wind",days:"Days ahead",max_events:"Max events",show_location:"Show location",refresh_minutes:"Refresh (minutes)",power_entity:"Current power (W/kW)",today_entity:"Energy used today",solar_power_entity:"Solar power now",solar_today_entity:"Solar energy today",battery_entity:"Battery level (%)",cost_entity:"Cost today",show_graph:"Show usage graph",hours_to_show:"Graph hours",show_modes:"Show mode buttons",humidity_entity:"Humidity sensor (optional)",min_tile_width:"Minimum tile width (px)",layout:"Layout",show_volume:"Show volume slider",show_state:"Show home/away",col_span:"Width (columns)",row_span:"Height (rows)",portrait_col_span:"Portrait width",portrait_row_span:"Portrait height",visibility:"Show in",transparent:"No background"},ve=[{type:"grid",name:"",schema:[{name:"theme",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (follow HA light/dark)"},{value:"light",label:"Hearth light"},{value:"dark",label:"Hearth dark"},{value:"ha",label:"Use my HA theme"}]}}},{name:"orientation",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (detect)"},{value:"landscape",label:"Landscape"},{value:"portrait",label:"Portrait"}]}}},{name:"columns",selector:{number:{min:1,max:12,mode:"box"}}},{name:"portrait_columns",selector:{number:{min:1,max:12,mode:"box"}}},{name:"height",selector:{select:{mode:"dropdown",custom_value:!0,options:[{value:"screen",label:"Fill the screen"},{value:"auto",label:"Fixed row height (scrolls)"}]}}},{name:"row_height",selector:{number:{min:60,max:600,step:10,mode:"box",unit_of_measurement:"px"}}},{name:"gap",selector:{number:{min:0,max:48,mode:"box",unit_of_measurement:"px"}}},{name:"accent_color",selector:{text:{}}}]},{name:"background",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"display_only",selector:{boolean:{}}},{name:"hide_cursor",selector:{boolean:{}}}]}],_e={theme:"Theme",orientation:"Orientation",columns:"Columns (landscape)",portrait_columns:"Columns (portrait)",height:"Height",row_height:"Row height (when not filling screen)",gap:"Spacing",accent_color:"Accent colour (e.g. #d4774f)",background:"Background image URL (optional)",display_only:"Display only (no touch)",hide_cursor:"Hide mouse cursor"},we=t=>Object.fromEntries(Object.entries(t).filter(([,t])=>void 0!==t&&""!==t&&null!==t));let be=class extends lt{constructor(){super(...arguments),this._adding=!1,this._label=t=>ye[t.name]??_e[t.name]??t.name}setConfig(t){this._config={...t,widgets:t.widgets??[]},void 0!==this._selected&&this._selected>=this._config.widgets.length&&(this._selected=void 0)}connectedCallback(){super.connectedCallback(),this._loadHaComponents()}async _loadHaComponents(){if(!customElements.get("ha-form")||!customElements.get("ha-entity-picker"))try{const t=await(window.loadCardHelpers?.()),e=await(t?.createCardElement({type:"entities",entities:[]}));await(e?.constructor?.getConfigElement?.()),this.requestUpdate()}catch{}}_commit(t){this._config=t,Tt(this,"config-changed",{config:t})}_generalChanged(t){t.stopPropagation();const{widgets:e,...i}=t.detail.value;this._commit({...we(i),widgets:this._config.widgets})}_updateWidget(t,e){const i=[...this._config.widgets];i[t]=e,this._commit({...this._config,widgets:i})}_widgetChanged(t,e){t.stopPropagation(),this._updateWidget(e,we({...t.detail.value,type:this._config.widgets[e].type}))}_cardYamlChanged(t,e){t.stopPropagation(),!1!==t.detail.isValid?(this._yamlError=void 0,this._updateWidget(e,{...this._config.widgets[e],card:t.detail.value})):this._yamlError="Invalid YAML"}_add(t){const e={type:t,...ge[t].defaults},i=[...this._config.widgets,e];this._adding=!1,this._selected=i.length-1,this._commit({...this._config,widgets:i})}_move(t,e){const i=[...this._config.widgets],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._commit({...this._config,widgets:i}))}_remove(t){const e=this._config.widgets.filter((e,i)=>i!==t);this._selected=void 0,this._commit({...this._config,widgets:e})}_duplicate(t){const e=[...this._config.widgets];e.splice(t+1,0,structuredClone(e[t])),this._commit({...this._config,widgets:e})}_summary(t){if(t.title)return t.title;const e=t.entity?[t.entity]:(t.entities??[]).map(t=>"string"==typeof t?t:t.entity);return t.power_entity&&e.push(t.power_entity),"card"===t.type?t.card?.type??"":e.map(t=>this.hass?.states[t]?.attributes.friendly_name??t).slice(0,3).join(", ")}render(){return this._config&&this.hass?void 0!==this._selected?this._renderWidgetEditor(this._selected):F`
      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:palette-outline"></ha-icon>Look & layout</div>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${ve}
          .computeLabel=${this._label}
          @value-changed=${this._generalChanged}
        ></ha-form>
      </div>

      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:view-grid-outline"></ha-icon>Widgets</div>
        <div class="list">
          ${this._config.widgets.map((t,e)=>{const i=ge[t.type];return F`<div class="row">
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
        ${this._adding?F`<div class="picker">
              ${Object.keys(ge).map(t=>F`<button class="pick" @click=${()=>this._add(t)}>
                  <ha-icon icon=${ge[t].icon}></ha-icon><span>${ge[t].label}</span>
                </button>`)}
            </div>
            <button class="text-btn" @click=${()=>this._adding=!1}>Cancel</button>`:F`<button class="add" @click=${()=>this._adding=!0}><ha-icon icon="mdi:plus"></ha-icon>Add widget</button>`}
      </div>
    `:V}_renderWidgetEditor(t){const e=this._config.widgets[t],i=ge[e.type],s={...i?.defaults,...e},a=Array.isArray(e.entities)&&e.entities.some(t=>"string"!=typeof t),o=a?i?.schema.filter(t=>"entities"!==t.name)??[]:i?.schema??[];return F`
      <div class="editor-head">
        <button @click=${()=>this._selected=void 0} title="Back"><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <ha-icon icon=${i?.icon??"mdi:help"}></ha-icon>
        <span>${i?.label??e.type}</span>
      </div>
      ${a?F`<p class="hint">This widget's entities use custom names/colours/icons — edit them in the code editor (Show code editor).</p>`:V}
      ${o.length?F`<div class="section">
            <ha-form
              .hass=${this.hass}
              .data=${s}
              .schema=${o}
              .computeLabel=${this._label}
              @value-changed=${e=>this._widgetChanged(e,t)}
            ></ha-form>
          </div>`:V}
      ${"card"===e.type?F`<div class="section">
            <div class="section-title"><ha-icon icon="mdi:code-braces"></ha-icon>Card configuration (YAML)</div>
            <p class="hint">Paste the YAML of any Home Assistant card — built-in or custom.</p>
            <ha-yaml-editor
              .hass=${this.hass}
              .defaultValue=${e.card}
              @value-changed=${e=>this._cardYamlChanged(e,t)}
            ></ha-yaml-editor>
            ${this._yamlError?F`<div class="error">${this._yamlError}</div>`:V}
          </div>`:V}
      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:arrow-expand-all"></ha-icon>Size & placement</div>
        <ha-form
          .hass=${this.hass}
          .data=${s}
          .schema=${fe}
          .computeLabel=${this._label}
          @value-changed=${e=>this._widgetChanged(e,t)}
        ></ha-form>
      </div>
    `}};be.styles=n`
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
  `,t([mt({attribute:!1})],be.prototype,"hass",void 0),t([gt()],be.prototype,"_config",void 0),t([gt()],be.prototype,"_selected",void 0),t([gt()],be.prototype,"_adding",void 0),t([gt()],be.prototype,"_yamlError",void 0),be=t([dt("hearth-dashboard-card-editor")],be);const $e="hearth-dashboard-card",xe="hearth-dashboard-card-editor",ke={theme:"auto",orientation:"auto",columns:4,portrait_columns:2,height:"screen",row_height:180,gap:16,display_only:!1,hide_cursor:!1};let Ae=class extends lt{constructor(){super(...arguments),this.preview=!1,this._portraitMedia=window.matchMedia("(orientation: portrait)").matches,this._mql=window.matchMedia("(orientation: portrait)"),this._onOrientation=t=>this._portraitMedia=t.matches}static getConfigElement(){return document.createElement(xe)}static getStubConfig(t){const e=Object.keys(t?.states??{}),i=(t,i)=>e.filter(e=>e.startsWith(`${t}.`)).slice(0,i),s=[{type:"clock",col_span:2,row_span:1,transparent:!0}],a=i("weather",1)[0];a&&s.push({type:"weather",entity:a,col_span:2,row_span:2});const o=i("calendar",3);o.length&&s.push({type:"calendar",entities:o,col_span:1,row_span:3});const n=i("climate",1)[0];n&&s.push({type:"climate",entity:n,col_span:1,row_span:2});const r=i("light",6);r.length&&s.push({type:"toggles",entities:r,col_span:2,row_span:1});const c=i("person",4);return c.length&&s.push({type:"people",entities:c,col_span:1,row_span:1}),{theme:"auto",columns:4,portrait_columns:2,widgets:s}}setConfig(t){if(!t)throw new Error("Invalid configuration");if(void 0!==t.widgets&&!Array.isArray(t.widgets))throw new Error("`widgets` must be a list");for(const e of t.widgets??[])if(!e||"object"!=typeof e||!e.type)throw new Error("Every widget needs a `type`");this._config={...t,widgets:t.widgets??[]}}getCardSize(){return 12}getGridOptions(){return{columns:"full",rows:"auto"}}connectedCallback(){super.connectedCallback(),this._mql.addEventListener("change",this._onOrientation),this._portraitMedia=this._mql.matches}disconnectedCallback(){super.disconnectedCallback(),this._mql.removeEventListener("change",this._onOrientation)}shouldUpdate(t){if(!this._config)return!1;if(1===t.size&&t.has("hass")){const e=t.get("hass");return this._pushHass(),!e||e.themes?.darkMode!==this.hass?.themes?.darkMode}return!0}_pushHass(){this.renderRoot?.querySelectorAll(".tile > *").forEach(t=>t.hass=this.hass)}get _portrait(){const t=this._config?.orientation??ke.orientation;return"portrait"===t||"auto"===t&&this._portraitMedia}get _themeClass(){const t=this._config?.theme??ke.theme;return"auto"===t?this.hass?.themes?.darkMode?"dark":"light":t}_renderWidget(t,e,i){const s=ge[t.type],a=!!this._config.display_only,o={...s?.defaults,...t},n={gridColumn:`span ${Math.min(i,Math.max(1,(e?o.portrait_col_span:void 0)??o.col_span??1))}`,gridRow:`span ${Math.max(1,(e?o.portrait_row_span:void 0)??o.row_span??1)}`};if(!s)return F`<div class="tile error" style=${$t(n)}>Unknown widget type “${t.type}”</div>`;const r=(t=>({_$litStatic$:t,r:xt}))(s.tag);return F`<div class=${_t({tile:!0,transparent:!!o.transparent,[`w-${t.type}`]:!0})} style=${$t(n)}>
      ${St`<${r} .hass=${this.hass} .config=${o} .displayOnly=${a}></${r}>`}
    </div>`}render(){if(!this._config)return V;const t={...ke,...this._config},e=this._portrait,i=Math.max(1,e?t.portrait_columns:t.columns),s="auto"!==t.height,a="screen"===t.height?this.preview?"640px":"100dvh":"auto"===t.height?"auto":t.height,o=t.widgets.filter(t=>{const i=t.visibility??"all";return"all"===i||"portrait"===i===e}),n={"--cols":String(i),"--gap":`${t.gap}px`,"--row-height":`${t.row_height}px`,height:a};return t.accent_color&&(n["--h-accent"]=t.accent_color,n["--h-accent-soft"]=`color-mix(in srgb, ${t.accent_color} 15%, transparent)`),t.background&&(n["--h-bg-image"]=`url("${t.background}")`),F`
      <div
        class=${_t({hearth:!0,[this._themeClass]:!0,portrait:e,landscape:!e,fill:s,"display-only":t.display_only,"hide-cursor":t.hide_cursor,"has-bg":!!t.background})}
        style=${$t(n)}
      >
        <div class="grid">
          ${o.length?o.map(t=>this._renderWidget(t,e,i)):F`<div class="tile intro">Add some widgets in the card editor to get started.</div>`}
        </div>
      </div>
    `}};Ae.styles=[Et,n`
      :host {
        display: block;
      }
      .hearth {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: var(--gap);
        background: radial-gradient(120% 80% at 0% 0%, var(--h-bg-2) 0%, transparent 60%), var(--h-bg);
        color: var(--h-text);
        font-family: var(--h-font);
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
      }
      .hearth.has-bg {
        background: var(--h-bg-image) center / cover no-repeat, var(--h-bg);
      }
      .hearth.has-bg .tile:not(.transparent) {
        backdrop-filter: blur(18px) saturate(1.2);
        -webkit-backdrop-filter: blur(18px) saturate(1.2);
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
        grid-auto-rows: var(--row-height);
        grid-auto-flow: row dense;
        gap: var(--gap);
      }
      .fill .grid {
        height: 100%;
        grid-auto-rows: minmax(0, 1fr);
      }
      .tile {
        position: relative;
        min-width: 0;
        min-height: 0;
        overflow: hidden;
        padding: clamp(14px, 1.6vw, 22px);
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
    `],t([mt({attribute:!1})],Ae.prototype,"hass",void 0),t([mt({type:Boolean})],Ae.prototype,"preview",void 0),t([gt()],Ae.prototype,"_config",void 0),t([gt()],Ae.prototype,"_portraitMedia",void 0),Ae=t([dt($e)],Ae),window.customCards=window.customCards||[],window.customCards.push({type:$e,name:"Hearth Dashboard",description:"A modular, widget-based home dashboard for wall tablets and kiosks.",preview:!1,documentationURL:"https://github.com/therealcarnivor/HA-Dashboard"}),console.info("%c HEARTH-DASHBOARD %c 0.1.0 ","color:#fff;background:#d4774f;font-weight:700;border-radius:4px 0 0 4px","color:#d4774f;background:#f3eee7;border-radius:0 4px 4px 0");export{$e as CARD_TAG,xe as EDITOR_TAG,Ae as HearthDashboardCard};
