/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = globalThis, e$6 = t$3.ShadowRoot && (void 0 === t$3.ShadyCSS || t$3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$5 = /* @__PURE__ */ new WeakMap();
let n$4 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$6 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$5.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$5.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$4("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$5 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$4(o2, t2, s$2);
}, S$1 = (s2, o2) => {
  if (e$6) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$3.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$3 = e$6 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$4, defineProperty: e$5, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$4, getPrototypeOf: n$3 } = Object, a$1 = globalThis, c$2 = a$1.trustedTypes, l$1 = c$2 ? c$2.emptyScript : "", p$3 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i4 = t2;
  switch (s2) {
    case Boolean:
      i4 = null !== t2;
      break;
    case Number:
      i4 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i4 = JSON.parse(t2);
      } catch (t3) {
        i4 = null;
      }
  }
  return i4;
} }, f$3 = (t2, s2) => !i$4(t2, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$3 };
Symbol.metadata ??= Symbol("metadata"), a$1.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ??= []).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i4 = Symbol(), h2 = this.getPropertyDescriptor(t2, i4, s2);
      void 0 !== h2 && e$5(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i4) {
    const { get: e2, set: r2 } = h$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2?.call(this);
      r2?.call(this, s3), this.requestUpdate(t2, h2, i4);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$3(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$3(t3), ...o$4(t3)];
      for (const i4 of s2) this.createProperty(i4, t3[i4]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i4] of s2) this.elementProperties.set(t3, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i4 = this._$Eu(t3, s2);
      void 0 !== i4 && this._$Eh.set(i4, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i4 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i4.unshift(c$3(s3));
    } else void 0 !== s2 && i4.push(c$3(s2));
    return i4;
  }
  static _$Eu(t2, s2) {
    const i4 = s2.attribute;
    return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this));
  }
  addController(t2) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.();
  }
  removeController(t2) {
    this._$EO?.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i4 of s2.keys()) this.hasOwnProperty(i4) && (t2.set(i4, this[i4]), delete this[i4]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t2) => t2.hostConnected?.());
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t2) => t2.hostDisconnected?.());
  }
  attributeChangedCallback(t2, s2, i4) {
    this._$AK(t2, i4);
  }
  _$ET(t2, s2) {
    const i4 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i4);
    if (void 0 !== e2 && true === i4.reflect) {
      const h2 = (void 0 !== i4.converter?.toAttribute ? i4.converter : u$1).toAttribute(s2, i4.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    const i4 = this.constructor, e2 = i4._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i4.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== t3.converter?.fromAttribute ? t3.converter : u$1;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? this._$Ej?.get(e2) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i4, e2 = false, h2) {
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i4 ??= r2.getPropertyOptions(t2), !((i4.hasChanged ?? f$3)(h2, s2) || i4.useDefault && i4.reflect && h2 === this._$Ej?.get(t2) && !this.hasAttribute(r2._$Eu(t2, i4)))) return;
      this.C(t2, s2, i4);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i4, reflect: e2, wrapped: h2 }, r2) {
    i4 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i4 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i4] of t3) {
        const { wrapped: t4 } = i4, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i4, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), this._$EO?.forEach((t3) => t3.hostUpdate?.()), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    this._$EO?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq &&= this._$Eq.forEach((t3) => this._$ET(t3, this[t3])), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$3?.({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = globalThis, i$3 = (t2) => t2, s$1 = t$2.trustedTypes, e$4 = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h = "$lit$", o$3 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$2 = "?" + o$3, r$2 = `<${n$2}>`, l = document, c$1 = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, d = (t2) => u(t2) || "function" == typeof t2?.[Symbol.iterator], f$2 = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p$2 = RegExp(`>|${f$2}(?:([^\\s"'>=/]+)(${f$2}*=${f$2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i4, ...s2) => ({ _$litType$: t2, strings: i4, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t2, i4) {
  if (!u(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e$4 ? e$4.createHTML(i4) : i4;
}
const N = (t2, i4) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i4 ? "<svg>" : 3 === i4 ? "<math>" : "", c2 = v;
  for (let i5 = 0; i5 < s2; i5++) {
    const s3 = t2[i5];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p$2) : void 0 !== u2[3] && (c2 = p$2) : c2 === p$2 ? ">" === u2[0] ? (c2 = n3 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p$2 : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p$2 : c2 === _ || c2 === m ? c2 = v : (c2 = p$2, n3 = void 0);
    const x2 = c2 === p$2 && t2[i5 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r$2 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h + s3.slice(d2) + o$3 + x2) : s3 + o$3 + (-2 === d2 ? i5 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i4 ? "</svg>" : 3 === i4 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i4 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i4);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i4 || 3 === i4) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h)) {
          const i5 = v2[a2++], s2 = r2.getAttribute(t3).split(o$3), e3 = /([.?@])?(.*)/.exec(i5);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$3) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$3), i5 = t3.length - 1;
          if (i5 > 0) {
            r2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i5; s2++) r2.append(t3[s2], c$1()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i5], c$1());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$2) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$3, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$3.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i4) {
    const s2 = l.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M$1(t2, i4, s2 = t2, e2) {
  if (i4 === E) return i4;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = a(i4) ? void 0 : i4._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ??= [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i4 = M$1(t2, h2._$AS(t2, i4.values), h2, e2)), i4;
}
class R {
  constructor(t2, i4) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i4;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i4 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? l).importNode(i4, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i5;
        2 === r2.type ? i5 = new k$2(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i5 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i5 = new Z(h2, this, t2)), this._$AV.push(i5), r2 = s2[++n3];
      }
      o2 !== r2?.index && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e2;
  }
  p(t2) {
    let i4 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i4), i4 += s2.strings.length - 2) : s2._$AI(t2[i4])), i4++;
  }
}
let k$2 = class k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i4, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i4, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i4 = this._$AM;
    return void 0 !== i4 && 11 === t2?.nodeType && (t2 = i4.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i4 = this) {
    t2 = M$1(this, t2, i4), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: i4, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2) this._$AH.p(i4);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i4), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i4 = C.get(t2.strings);
    return void 0 === i4 && C.set(t2.strings, i4 = new S(t2)), i4;
  }
  k(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i4 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i4.length ? i4.push(s2 = new k(this.O(c$1()), this.O(c$1()), this, this.options)) : s2 = i4[e2], s2._$AI(h2), e2++;
    e2 < i4.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i4.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    for (this._$AP?.(false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$3(t2).nextSibling;
      i$3(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
};
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i4, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i4, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i4 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M$1(this, t2, i4, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M$1(this, e3[s2 + n3], i4, n3), r2 === E && (r2 = this._$AH[n3]), o2 ||= !a(r2) || r2 !== this._$AH[n3], r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z extends H {
  constructor(t2, i4, s2, e2, h2) {
    super(t2, i4, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i4 = this) {
    if ((t2 = M$1(this, t2, i4, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i4, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M$1(this, t2);
  }
}
const B = t$2.litHtmlPolyfillSupport;
B?.(S, k$2), (t$2.litHtmlVersions ??= []).push("3.3.3");
const D = (t2, i4, s2) => {
  const e2 = s2?.renderBefore ?? i4;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new k$2(i4.insertBefore(c$1(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = globalThis;
let i$2 = class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t2 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t2.firstChild, t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i$2._$litElement$ = true, i$2["finalized"] = true, s.litElementHydrateSupport?.({ LitElement: i$2 });
const o$2 = s.litElementPolyfillSupport;
o$2?.({ LitElement: i$2 });
(s.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$1 = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$3 }, r$1 = (t2 = o$1, e2, r2) => {
  const { kind: n3, metadata: i4 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i4);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i4, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n$1(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n$1({ ...r2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1 }, e$3 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
let i$1 = class i2 {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i4) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i4;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$2 = e$3(class extends i$1 {
  constructor(t$12) {
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "class" !== t$12.name || t$12.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((s2) => t2[s2]).join(" ") + " ";
  }
  update(s2, [i4]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s2.strings && (this.nt = new Set(s2.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in i4) i4[t2] && !this.nt?.has(t2) && this.st.add(t2);
      return this.render(i4);
    }
    const r2 = s2.element.classList;
    for (const t2 of this.st) t2 in i4 || (r2.remove(t2), this.st.delete(t2));
    for (const t2 in i4) {
      const s3 = !!i4[t2];
      s3 === this.st.has(t2) || this.nt?.has(t2) || (s3 ? (r2.add(t2), this.st.add(t2)) : (r2.remove(t2), this.st.delete(t2)));
    }
    return E;
  }
});
const atLeastVersion = (version, major, minor, patch) => {
  const [haMajor, haMinor, haPatch] = version.split(".", 3);
  return Number(haMajor) > major || Number(haMajor) === major && Number(haMinor) >= minor;
};
const fireEvent = (node, type2, detail, options) => {
  options = options || {};
  detail = detail === null || detail === void 0 ? {} : detail;
  const event = new Event(type2, {
    bubbles: options.bubbles === void 0 ? true : options.bubbles,
    cancelable: Boolean(options.cancelable),
    composed: options.composed === void 0 ? true : options.composed
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};
const computeDomain = (entityId) => entityId.substr(0, entityId.indexOf("."));
class StructError extends TypeError {
  constructor(failure, failures) {
    let cached;
    const { message, explanation, ...rest } = failure;
    const { path } = failure;
    const msg = path.length === 0 ? message : `At path: ${path.join(".")} -- ${message}`;
    super(explanation ?? msg);
    if (explanation != null)
      this.cause = msg;
    Object.assign(this, rest);
    this.name = this.constructor.name;
    this.failures = () => {
      return cached ?? (cached = [failure, ...failures()]);
    };
  }
}
function isIterable(x2) {
  return isObject(x2) && typeof x2[Symbol.iterator] === "function";
}
function isObject(x2) {
  return typeof x2 === "object" && x2 != null;
}
function isNonArrayObject(x2) {
  return isObject(x2) && !Array.isArray(x2);
}
function print(value) {
  if (typeof value === "symbol") {
    return value.toString();
  }
  return typeof value === "string" ? JSON.stringify(value) : `${value}`;
}
function shiftIterator(input) {
  const { done, value } = input.next();
  return done ? void 0 : value;
}
function toFailure(result, context, struct, value) {
  if (result === true) {
    return;
  } else if (result === false) {
    result = {};
  } else if (typeof result === "string") {
    result = { message: result };
  }
  const { path, branch } = context;
  const { type: type2 } = struct;
  const { refinement, message = `Expected a value of type \`${type2}\`${refinement ? ` with refinement \`${refinement}\`` : ""}, but received: \`${print(value)}\`` } = result;
  return {
    value,
    type: type2,
    refinement,
    key: path[path.length - 1],
    path,
    branch,
    ...result,
    message
  };
}
function* toFailures(result, context, struct, value) {
  if (!isIterable(result)) {
    result = [result];
  }
  for (const r2 of result) {
    const failure = toFailure(r2, context, struct, value);
    if (failure) {
      yield failure;
    }
  }
}
function* run(value, struct, options = {}) {
  const { path = [], branch = [value], coerce = false, mask: mask2 = false } = options;
  const ctx = { path, branch, mask: mask2 };
  if (coerce) {
    value = struct.coercer(value, ctx);
  }
  let status = "valid";
  for (const failure of struct.validator(value, ctx)) {
    failure.explanation = options.message;
    status = "not_valid";
    yield [failure, void 0];
  }
  for (let [k3, v2, s2] of struct.entries(value, ctx)) {
    const ts = run(v2, s2, {
      path: k3 === void 0 ? path : [...path, k3],
      branch: k3 === void 0 ? branch : [...branch, v2],
      coerce,
      mask: mask2,
      message: options.message
    });
    for (const t2 of ts) {
      if (t2[0]) {
        status = t2[0].refinement != null ? "not_refined" : "not_valid";
        yield [t2[0], void 0];
      } else if (coerce) {
        v2 = t2[1];
        if (k3 === void 0) {
          value = v2;
        } else if (value instanceof Map) {
          value.set(k3, v2);
        } else if (value instanceof Set) {
          value.add(v2);
        } else if (isObject(value)) {
          if (v2 !== void 0 || k3 in value)
            value[k3] = v2;
        }
      }
    }
  }
  if (status !== "not_valid") {
    for (const failure of struct.refiner(value, ctx)) {
      failure.explanation = options.message;
      status = "not_refined";
      yield [failure, void 0];
    }
  }
  if (status === "valid") {
    yield [void 0, value];
  }
}
class Struct {
  constructor(props) {
    const { type: type2, schema, validator, refiner, coercer = (value) => value, entries = function* () {
    } } = props;
    this.type = type2;
    this.schema = schema;
    this.entries = entries;
    this.coercer = coercer;
    if (validator) {
      this.validator = (value, context) => {
        const result = validator(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.validator = () => [];
    }
    if (refiner) {
      this.refiner = (value, context) => {
        const result = refiner(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.refiner = () => [];
    }
  }
  /**
   * Assert that a value passes the struct's validation, throwing if it doesn't.
   */
  assert(value, message) {
    return assert(value, this, message);
  }
  /**
   * Create a value with the struct's coercion logic, then validate it.
   */
  create(value, message) {
    return create(value, this, message);
  }
  /**
   * Check if a value passes the struct's validation.
   */
  is(value) {
    return is(value, this);
  }
  /**
   * Mask a value, coercing and validating it, but returning only the subset of
   * properties defined by the struct's schema. Masking applies recursively to
   * props of `object` structs only.
   */
  mask(value, message) {
    return mask(value, this, message);
  }
  /**
   * Validate a value with the struct's validation logic, returning a tuple
   * representing the result.
   *
   * You may optionally pass `true` for the `coerce` argument to coerce
   * the value before attempting to validate it. If you do, the result will
   * contain the coerced result when successful. Also, `mask` will turn on
   * masking of the unknown `object` props recursively if passed.
   */
  validate(value, options = {}) {
    return validate(value, this, options);
  }
}
function assert(value, struct, message) {
  const result = validate(value, struct, { message });
  if (result[0]) {
    throw result[0];
  }
}
function create(value, struct, message) {
  const result = validate(value, struct, { coerce: true, message });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function mask(value, struct, message) {
  const result = validate(value, struct, { coerce: true, mask: true, message });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function is(value, struct) {
  const result = validate(value, struct);
  return !result[0];
}
function validate(value, struct, options = {}) {
  const tuples = run(value, struct, options);
  const tuple = shiftIterator(tuples);
  if (tuple[0]) {
    const error = new StructError(tuple[0], function* () {
      for (const t2 of tuples) {
        if (t2[0]) {
          yield t2[0];
        }
      }
    });
    return [error, void 0];
  } else {
    const v2 = tuple[1];
    return [void 0, v2];
  }
}
function assign(...Structs) {
  const isType = Structs[0].type === "type";
  const schemas = Structs.map((s2) => s2.schema);
  const schema = Object.assign({}, ...schemas);
  return isType ? type(schema) : object(schema);
}
function define(name, validator) {
  return new Struct({ type: name, schema: null, validator });
}
function dynamic(fn2) {
  return new Struct({
    type: "dynamic",
    schema: null,
    *entries(value, ctx) {
      const struct = fn2(value, ctx);
      yield* struct.entries(value, ctx);
    },
    validator(value, ctx) {
      const struct = fn2(value, ctx);
      return struct.validator(value, ctx);
    },
    coercer(value, ctx) {
      const struct = fn2(value, ctx);
      return struct.coercer(value, ctx);
    },
    refiner(value, ctx) {
      const struct = fn2(value, ctx);
      return struct.refiner(value, ctx);
    }
  });
}
function any() {
  return define("any", () => true);
}
function array(Element) {
  return new Struct({
    type: "array",
    schema: Element,
    *entries(value) {
      if (Element && Array.isArray(value)) {
        for (const [i4, v2] of value.entries()) {
          yield [i4, v2, Element];
        }
      }
    },
    coercer(value) {
      return Array.isArray(value) ? value.slice() : value;
    },
    validator(value) {
      return Array.isArray(value) || `Expected an array value, but received: ${print(value)}`;
    }
  });
}
function boolean() {
  return define("boolean", (value) => {
    return typeof value === "boolean";
  });
}
function enums(values) {
  const schema = {};
  const description = values.map((v2) => print(v2)).join();
  for (const key of values) {
    schema[key] = key;
  }
  return new Struct({
    type: "enums",
    schema,
    validator(value) {
      return values.includes(value) || `Expected one of \`${description}\`, but received: ${print(value)}`;
    }
  });
}
function literal(constant) {
  const description = print(constant);
  const t2 = typeof constant;
  return new Struct({
    type: "literal",
    schema: t2 === "string" || t2 === "number" || t2 === "boolean" ? constant : null,
    validator(value) {
      return value === constant || `Expected the literal \`${description}\`, but received: ${print(value)}`;
    }
  });
}
function never() {
  return define("never", () => false);
}
function number() {
  return define("number", (value) => {
    return typeof value === "number" && !isNaN(value) || `Expected a number, but received: ${print(value)}`;
  });
}
function object(schema) {
  const knowns = schema ? Object.keys(schema) : [];
  const Never = never();
  return new Struct({
    type: "object",
    schema: schema ? schema : null,
    *entries(value) {
      if (schema && isObject(value)) {
        const unknowns = new Set(Object.keys(value));
        for (const key of knowns) {
          unknowns.delete(key);
          yield [key, value[key], schema[key]];
        }
        for (const key of unknowns) {
          yield [key, value[key], Never];
        }
      }
    },
    validator(value) {
      return isNonArrayObject(value) || `Expected an object, but received: ${print(value)}`;
    },
    coercer(value, ctx) {
      if (!isNonArrayObject(value)) {
        return value;
      }
      const coerced = { ...value };
      if (ctx.mask && schema) {
        for (const key in coerced) {
          if (schema[key] === void 0) {
            delete coerced[key];
          }
        }
      }
      return coerced;
    }
  });
}
function optional(struct) {
  return new Struct({
    ...struct,
    validator: (value, ctx) => value === void 0 || struct.validator(value, ctx),
    refiner: (value, ctx) => value === void 0 || struct.refiner(value, ctx)
  });
}
function string() {
  return define("string", (value) => {
    return typeof value === "string" || `Expected a string, but received: ${print(value)}`;
  });
}
function type(schema) {
  const keys = Object.keys(schema);
  return new Struct({
    type: "type",
    schema,
    *entries(value) {
      if (isObject(value)) {
        for (const k3 of keys) {
          yield [k3, value[k3], schema[k3]];
        }
      }
    },
    validator(value) {
      return isNonArrayObject(value) || `Expected an object, but received: ${print(value)}`;
    },
    coercer(value) {
      return isNonArrayObject(value) ? { ...value } : value;
    }
  });
}
function union(Structs) {
  const description = Structs.map((s2) => s2.type).join(" | ");
  return new Struct({
    type: "union",
    schema: null,
    coercer(value, ctx) {
      for (const S2 of Structs) {
        const [error, coerced] = S2.validate(value, {
          coerce: true,
          mask: ctx.mask
        });
        if (!error) {
          return coerced;
        }
      }
      return value;
    },
    validator(value, ctx) {
      const failures = [];
      for (const S2 of Structs) {
        const [...tuples] = run(value, S2, ctx);
        const [first] = tuples;
        if (!first[0]) {
          return [];
        } else {
          for (const [failure] of tuples) {
            if (failure) {
              failures.push(failure);
            }
          }
        }
      }
      return [
        `Expected the value to satisfy a union of \`${description}\`, but received: ${print(value)}`,
        ...failures
      ];
    }
  });
}
function computeRTL(hass) {
  const lang = hass.language || "en";
  if (hass.translationMetadata.translations[lang]) {
    return hass.translationMetadata.translations[lang].isRTL || false;
  }
  return false;
}
const deepEqual = (a2, b2) => {
  if (a2 === b2) {
    return true;
  }
  if (a2 && b2 && typeof a2 === "object" && typeof b2 === "object") {
    if (a2.constructor !== b2.constructor) {
      return false;
    }
    let i4;
    let length;
    if (Array.isArray(a2)) {
      length = a2.length;
      if (length !== b2.length) {
        return false;
      }
      for (i4 = length; i4-- !== 0; ) {
        if (!deepEqual(a2[i4], b2[i4])) {
          return false;
        }
      }
      return true;
    }
    if (a2 instanceof Map && b2 instanceof Map) {
      if (a2.size !== b2.size) {
        return false;
      }
      for (i4 of a2.entries()) {
        if (!b2.has(i4[0])) {
          return false;
        }
      }
      for (i4 of a2.entries()) {
        if (!deepEqual(i4[1], b2.get(i4[0]))) {
          return false;
        }
      }
      return true;
    }
    if (a2 instanceof Set && b2 instanceof Set) {
      if (a2.size !== b2.size) {
        return false;
      }
      for (i4 of a2.entries()) {
        if (!b2.has(i4[0])) {
          return false;
        }
      }
      return true;
    }
    if (ArrayBuffer.isView(a2) && ArrayBuffer.isView(b2)) {
      length = a2.length;
      if (length !== b2.length) {
        return false;
      }
      for (i4 = length; i4-- !== 0; ) {
        if (a2[i4] !== b2[i4]) {
          return false;
        }
      }
      return true;
    }
    if (a2.constructor === RegExp) {
      return a2.source === b2.source && a2.flags === b2.flags;
    }
    if (a2.valueOf !== Object.prototype.valueOf) {
      return a2.valueOf() === b2.valueOf();
    }
    if (a2.toString !== Object.prototype.toString) {
      return a2.toString() === b2.toString();
    }
    const keys = Object.keys(a2);
    length = keys.length;
    if (length !== Object.keys(b2).length) {
      return false;
    }
    for (i4 = length; i4-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(b2, keys[i4])) {
        return false;
      }
    }
    for (i4 = length; i4-- !== 0; ) {
      const key = keys[i4];
      if (!deepEqual(a2[key], b2[key])) {
        return false;
      }
    }
    return true;
  }
  return a2 !== a2 && b2 !== b2;
};
const UNAVAILABLE = "unavailable";
const UNKNOWN = "unknown";
const OFF = "off";
const OFF_STATES = [UNAVAILABLE, UNKNOWN, OFF];
function isActive(stateObj) {
  const domain = computeDomain(stateObj.entity_id);
  const state = stateObj.state;
  if (["button", "input_button", "scene"].includes(domain)) {
    return state !== UNAVAILABLE;
  }
  if (OFF_STATES.includes(state)) {
    return false;
  }
  switch (domain) {
    case "cover":
    case "valve":
      return !["closed", "closing"].includes(state);
    case "device_tracker":
    case "person":
      return state !== "not_home";
    case "media_player":
      return state !== "standby";
    case "vacuum":
      return !["idle", "docked", "paused"].includes(state);
    case "plant":
      return state === "problem";
    default:
      return true;
  }
}
function isAvailable(stateObj) {
  return stateObj.state !== UNAVAILABLE;
}
function isUnknown(stateObj) {
  return stateObj.state === UNKNOWN;
}
function getEntityPicture(stateObj) {
  return stateObj.attributes.entity_picture_local || stateObj.attributes.entity_picture;
}
var safeIsNaN = Number.isNaN || function ponyfill(value) {
  return typeof value === "number" && value !== value;
};
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i4 = 0; i4 < newInputs.length; i4++) {
    if (!isEqual(newInputs[i4], lastInputs[i4])) {
      return false;
    }
  }
  return true;
}
function memoizeOne(resultFn, isEqual2) {
  if (isEqual2 === void 0) {
    isEqual2 = areInputsEqual;
  }
  var cache = null;
  function memoized() {
    var newArgs = [];
    for (var _i2 = 0; _i2 < arguments.length; _i2++) {
      newArgs[_i2] = arguments[_i2];
    }
    if (cache && cache.lastThis === this && isEqual2(newArgs, cache.lastArgs)) {
      return cache.lastResult;
    }
    var lastResult = resultFn.apply(this, newArgs);
    cache = {
      lastResult,
      lastArgs: newArgs,
      lastThis: this
    };
    return lastResult;
  }
  memoized.clear = function clear() {
    cache = null;
  };
  return memoized;
}
memoizeOne(
  (language) => new Intl.Collator(language)
);
memoizeOne(
  (language) => new Intl.Collator(language, { sensitivity: "accent" })
);
const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || // @ts-ignore
navigator.msMaxTouchPoints > 0;
class ActionHandler extends HTMLElement {
  constructor() {
    super(...arguments);
    this.holdTime = 500;
    this.held = false;
    this.cancelled = false;
  }
  connectedCallback() {
    Object.assign(this.style, {
      position: "fixed",
      width: isTouch ? "100px" : "50px",
      height: isTouch ? "100px" : "50px",
      transform: "translate(-50%, -50%) scale(0)",
      pointerEvents: "none",
      zIndex: "999",
      background: "var(--primary-color)",
      display: null,
      opacity: "0.2",
      borderRadius: "50%",
      transition: "transform 180ms ease-in-out"
    });
    [
      "touchcancel",
      "mouseout",
      "mouseup",
      "touchmove",
      "mousewheel",
      "wheel",
      "scroll"
    ].forEach((ev) => {
      document.addEventListener(
        ev,
        () => {
          this.cancelled = true;
          if (this.timer) {
            this._stopAnimation();
            clearTimeout(this.timer);
            this.timer = void 0;
          }
        },
        { passive: true }
      );
    });
  }
  bind(element, options = {}) {
    if (element.actionHandler && deepEqual(options, element.actionHandler.options)) {
      return;
    }
    if (element.actionHandler) {
      element.removeEventListener("touchstart", element.actionHandler.start);
      element.removeEventListener("touchend", element.actionHandler.end);
      element.removeEventListener("touchcancel", element.actionHandler.end);
      element.removeEventListener("mousedown", element.actionHandler.start);
      element.removeEventListener("click", element.actionHandler.end);
      element.removeEventListener(
        "keydown",
        element.actionHandler.handleKeyDown
      );
    } else {
      element.addEventListener("contextmenu", (ev) => {
        const e2 = ev || window.event;
        if (e2.preventDefault) {
          e2.preventDefault();
        }
        if (e2.stopPropagation) {
          e2.stopPropagation();
        }
        e2.cancelBubble = true;
        e2.returnValue = false;
        return false;
      });
    }
    element.actionHandler = { options };
    if (options.disabled) {
      return;
    }
    element.actionHandler.start = (ev) => {
      this.cancelled = false;
      let x2;
      let y3;
      if (ev.touches) {
        x2 = ev.touches[0].clientX;
        y3 = ev.touches[0].clientY;
      } else {
        x2 = ev.clientX;
        y3 = ev.clientY;
      }
      if (options.hasHold) {
        this.held = false;
        this.timer = window.setTimeout(() => {
          this._startAnimation(x2, y3);
          this.held = true;
        }, this.holdTime);
      }
    };
    element.actionHandler.end = (ev) => {
      if (ev.type === "touchcancel" || ev.type === "touchend" && this.cancelled) {
        return;
      }
      const target = ev.target;
      if (ev.cancelable) {
        ev.preventDefault();
      }
      if (options.hasHold) {
        clearTimeout(this.timer);
        this._stopAnimation();
        this.timer = void 0;
      }
      if (options.hasHold && this.held) {
        fireEvent(target, "action", { action: "hold" });
      } else if (options.hasDoubleClick) {
        if (ev.type === "click" && ev.detail < 2 || !this.dblClickTimeout) {
          this.dblClickTimeout = window.setTimeout(() => {
            this.dblClickTimeout = void 0;
            if (options.hasTap !== false) {
              fireEvent(target, "action", { action: "tap" });
            }
          }, 250);
        } else {
          clearTimeout(this.dblClickTimeout);
          this.dblClickTimeout = void 0;
          fireEvent(target, "action", { action: "double_tap" });
        }
      } else if (options.hasTap !== false) {
        fireEvent(target, "action", { action: "tap" });
      }
    };
    element.actionHandler.handleKeyDown = (ev) => {
      if (!["Enter", " "].includes(ev.key)) {
        return;
      }
      ev.currentTarget.actionHandler.end(ev);
    };
    element.addEventListener("touchstart", element.actionHandler.start, {
      passive: true
    });
    element.addEventListener("touchend", element.actionHandler.end);
    element.addEventListener("touchcancel", element.actionHandler.end);
    element.addEventListener("mousedown", element.actionHandler.start, {
      passive: true
    });
    element.addEventListener("click", element.actionHandler.end);
    element.addEventListener("keydown", element.actionHandler.handleKeyDown);
  }
  _startAnimation(x2, y3) {
    Object.assign(this.style, {
      left: `${x2}px`,
      top: `${y3}px`,
      transform: "translate(-50%, -50%) scale(1)"
    });
  }
  _stopAnimation() {
    Object.assign(this.style, {
      left: null,
      top: null,
      transform: "translate(-50%, -50%) scale(0)"
    });
  }
}
const getActionHandler = () => {
  const body = document.body;
  if (body.querySelector("action-handler")) {
    return body.querySelector("action-handler");
  }
  if (!customElements.get("action-handler")) {
    customElements.define("action-handler", ActionHandler);
  }
  const actionhandler = document.createElement("action-handler");
  body.appendChild(actionhandler);
  return actionhandler;
};
const actionHandlerBind = (element, options) => {
  const actionhandler = getActionHandler();
  if (!actionhandler) {
    return;
  }
  actionhandler.bind(element, options);
};
const actionHandler = e$3(
  class extends i$1 {
    update(part, [options]) {
      actionHandlerBind(part.element, options);
      return E;
    }
    render(_options) {
    }
  }
);
const handleAction = async (node, _hass, config, action) => {
  fireEvent(node, "hass-action", { config, action });
};
function hasAction(config) {
  return config !== void 0 && config.action !== "none";
}
const actionConfigStructUser = object({
  user: string()
});
const actionConfigStructConfirmation = union([
  boolean(),
  object({
    text: optional(string()),
    excemptions: optional(array(actionConfigStructUser))
  })
]);
const actionConfigStructUrl = object({
  action: literal("url"),
  url_path: string(),
  confirmation: optional(actionConfigStructConfirmation)
});
const actionConfigStructService = object({
  action: enums(["call-service", "perform-action"]),
  service: optional(string()),
  perform_action: optional(string()),
  service_data: optional(object()),
  data: optional(object()),
  target: optional(
    object({
      entity_id: optional(union([string(), array(string())])),
      device_id: optional(union([string(), array(string())])),
      area_id: optional(union([string(), array(string())])),
      floor_id: optional(union([string(), array(string())])),
      label_id: optional(union([string(), array(string())]))
    })
  ),
  confirmation: optional(actionConfigStructConfirmation)
});
const actionConfigStructNavigate = object({
  action: literal("navigate"),
  navigation_path: string(),
  confirmation: optional(actionConfigStructConfirmation)
});
const actionConfigStructAssist = type({
  action: literal("assist"),
  pipeline_id: optional(string()),
  start_listening: optional(boolean())
});
const actionConfigStructCustom = type({
  action: literal("fire-dom-event")
});
const actionConfigStructType = object({
  action: enums([
    "none",
    "toggle",
    "more-info",
    "call-service",
    "perform-action",
    "url",
    "navigate",
    "assist"
  ]),
  confirmation: optional(actionConfigStructConfirmation)
});
const actionConfigStruct = dynamic((value) => {
  if (value && typeof value === "object" && "action" in value) {
    switch (value.action) {
      case "call-service": {
        return actionConfigStructService;
      }
      case "perform-action": {
        return actionConfigStructService;
      }
      case "fire-dom-event": {
        return actionConfigStructCustom;
      }
      case "navigate": {
        return actionConfigStructNavigate;
      }
      case "url": {
        return actionConfigStructUrl;
      }
      case "assist": {
        return actionConfigStructAssist;
      }
    }
  }
  return actionConfigStructType;
});
i$5`
  #sortable a:nth-of-type(2n) paper-icon-item {
    animation-name: keyframes1;
    animation-iteration-count: infinite;
    transform-origin: 50% 10%;
    animation-delay: -0.75s;
    animation-duration: 0.25s;
  }

  #sortable a:nth-of-type(2n-1) paper-icon-item {
    animation-name: keyframes2;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    transform-origin: 30% 5%;
    animation-delay: -0.5s;
    animation-duration: 0.33s;
  }

  #sortable a {
    height: 48px;
    display: flex;
  }

  #sortable {
    outline: none;
    display: block !important;
  }

  .hidden-panel {
    display: flex !important;
  }

  .sortable-fallback {
    display: none;
  }

  .sortable-ghost {
    opacity: 0.4;
  }

  .sortable-fallback {
    opacity: 0;
  }

  @keyframes keyframes1 {
    0% {
      transform: rotate(-1deg);
      animation-timing-function: ease-in;
    }

    50% {
      transform: rotate(1.5deg);
      animation-timing-function: ease-out;
    }
  }

  @keyframes keyframes2 {
    0% {
      transform: rotate(1deg);
      animation-timing-function: ease-in;
    }

    50% {
      transform: rotate(-1.5deg);
      animation-timing-function: ease-out;
    }
  }

  .show-panel,
  .hide-panel {
    display: none;
    position: absolute;
    top: 0;
    right: 4px;
    --mdc-icon-button-size: 40px;
  }

  :host([rtl]) .show-panel {
    right: initial;
    left: 4px;
  }

  .hide-panel {
    top: 4px;
    right: 8px;
  }

  :host([rtl]) .hide-panel {
    right: initial;
    left: 8px;
  }

  :host([expanded]) .hide-panel {
    display: block;
  }

  :host([expanded]) .show-panel {
    display: inline-flex;
  }

  paper-icon-item.hidden-panel,
  paper-icon-item.hidden-panel span,
  paper-icon-item.hidden-panel ha-icon[slot="item-icon"] {
    color: var(--secondary-text-color);
    cursor: pointer;
  }
`;
function computeAppearance(config) {
  return {
    layout: config.layout ?? getDefaultLayout(config),
    fill_container: config.fill_container ?? false,
    primary_info: config.primary_info || getDefaultPrimaryInfo(config),
    secondary_info: config.secondary_info || getDefaultSecondaryInfo(config),
    icon_type: config.icon_type || getDefaultIconType(config)
  };
}
function getDefaultLayout(config) {
  if (config.vertical) {
    return "vertical";
  }
  return "default";
}
function getDefaultIconType(config) {
  if (config.hide_icon) {
    return "none";
  }
  if (config.use_entity_picture || config.use_media_artwork) {
    return "entity-picture";
  }
  return "icon";
}
function getDefaultPrimaryInfo(config) {
  if (config.hide_name) {
    return "none";
  }
  return "name";
}
function getDefaultSecondaryInfo(config) {
  if (config.hide_state) {
    return "none";
  }
  return "state";
}
function memoize(fn2, options) {
  const cache = options && options.cache ? options.cache : cacheDefault;
  const serializer = options && options.serializer ? options.serializer : serializerDefault;
  return (options && options.strategy ? options.strategy : strategyDefault)(fn2, {
    cache,
    serializer
  });
}
function isPrimitive(value) {
  return value == null || typeof value === "number" || typeof value === "boolean";
}
function monadic(fn2, cache, serializer, arg) {
  const cacheKey = isPrimitive(arg) ? arg : serializer(arg);
  let computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn2.call(this, arg);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function variadic(fn2, cache, serializer) {
  const args = Array.prototype.slice.call(arguments, 3);
  const cacheKey = serializer(args);
  let computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn2.apply(this, args);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function assemble(fn2, context, strategy, cache, serialize) {
  return strategy.bind(context, fn2, cache, serialize);
}
function strategyDefault(fn2, options) {
  const strategy = fn2.length === 1 ? monadic : variadic;
  return assemble(fn2, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn2, options) {
  return assemble(fn2, this, variadic, options.cache.create(), options.serializer);
}
const serializerDefault = function() {
  return JSON.stringify(arguments);
};
var ObjectWithoutPrototypeCache = class {
  constructor() {
    this.cache = /* @__PURE__ */ Object.create(null);
  }
  get(key) {
    return this.cache[key];
  }
  set(key, value) {
    this.cache[key] = value;
  }
};
const cacheDefault = { create: function create2() {
  return new ObjectWithoutPrototypeCache();
} };
const strategies = {
  variadic: strategyVariadic
};
const DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function parseDateTimeSkeleton(skeleton) {
  const result = {};
  skeleton.replace(DATE_TIME_REGEX, (match) => {
    const len = match.length;
    switch (match[0]) {
      case "G":
        result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
        break;
      case "y":
        result.year = len === 2 ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      case "M":
      case "L":
        result.month = [
          "numeric",
          "2-digit",
          "short",
          "long",
          "narrow"
        ][len - 1];
        break;
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        result.day = ["numeric", "2-digit"][len - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      case "E":
        result.weekday = len === 4 ? "long" : len === 5 ? "narrow" : "short";
        break;
      case "e":
        if (len < 4) throw new RangeError("`e..eee` (weekday) patterns are not supported");
        result.weekday = [
          "short",
          "long",
          "narrow",
          "short"
        ][len - 3];
        break;
      case "c":
        if (len < 4) throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        result.weekday = [
          "short",
          "long",
          "narrow",
          "short"
        ][len - 3];
        break;
      case "a":
        result.hour12 = true;
        break;
      case "b":
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      case "h":
        result.hourCycle = "h12";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "H":
        result.hourCycle = "h23";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "K":
        result.hourCycle = "h11";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "k":
        result.hourCycle = "h24";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      case "m":
        result.minute = ["numeric", "2-digit"][len - 1];
        break;
      case "s":
        result.second = ["numeric", "2-digit"][len - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      case "z":
        result.timeZoneName = len < 4 ? "short" : "long";
        break;
      case "Z":
      case "O":
      case "v":
      case "V":
      case "X":
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  });
  return result;
}
const WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function parseNumberSkeletonFromString(skeleton) {
  if (skeleton.length === 0) throw new Error("Number skeleton cannot be empty");
  const stringTokens = skeleton.split(WHITE_SPACE_REGEX).filter((x2) => x2.length > 0);
  const tokens = [];
  for (const stringToken of stringTokens) {
    let stemAndOptions = stringToken.split("/");
    if (stemAndOptions.length === 0) throw new Error("Invalid number skeleton");
    const [stem, ...options] = stemAndOptions;
    for (const option of options) if (option.length === 0) throw new Error("Invalid number skeleton");
    tokens.push({
      stem,
      options
    });
  }
  return tokens;
}
function icuUnitToEcma(unit) {
  return unit.replace(/^(.*?)-/, "");
}
const FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
const SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
const INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
const CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
  const result = {};
  if (str[str.length - 1] === "r") result.roundingPriority = "morePrecision";
  else if (str[str.length - 1] === "s") result.roundingPriority = "lessPrecision";
  str.replace(SIGNIFICANT_PRECISION_REGEX, function(_2, g1, g2) {
    if (typeof g2 !== "string") {
      result.minimumSignificantDigits = g1.length;
      result.maximumSignificantDigits = g1.length;
    } else if (g2 === "+") result.minimumSignificantDigits = g1.length;
    else if (g1[0] === "#") result.maximumSignificantDigits = g1.length;
    else {
      result.minimumSignificantDigits = g1.length;
      result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
    }
    return "";
  });
  return result;
}
function parseSign(str) {
  switch (str) {
    case "sign-auto":
      return { signDisplay: "auto" };
    case "sign-accounting":
    case "()":
      return { currencySign: "accounting" };
    case "sign-always":
    case "+!":
      return { signDisplay: "always" };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return { signDisplay: "exceptZero" };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return { signDisplay: "never" };
  }
}
function parseConciseScientificAndEngineeringStem(stem) {
  let result;
  if (stem[0] === "E" && stem[1] === "E") {
    result = { notation: "engineering" };
    stem = stem.slice(2);
  } else if (stem[0] === "E") {
    result = { notation: "scientific" };
    stem = stem.slice(1);
  }
  if (result) {
    const signDisplay = stem.slice(0, 2);
    if (signDisplay === "+!") {
      result.signDisplay = "always";
      stem = stem.slice(2);
    } else if (signDisplay === "+?") {
      result.signDisplay = "exceptZero";
      stem = stem.slice(2);
    }
    if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) throw new Error("Malformed concise eng/scientific notation");
    result.minimumIntegerDigits = stem.length;
  }
  return result;
}
function parseNotationOptions(opt) {
  const result = {};
  const signOpts = parseSign(opt);
  if (signOpts) return signOpts;
  return result;
}
function parseNumberSkeleton(tokens) {
  let result = {};
  for (const token of tokens) {
    switch (token.stem) {
      case "percent":
      case "%":
        result.style = "percent";
        continue;
      case "%x100":
        result.style = "percent";
        result.scale = 100;
        continue;
      case "currency":
        result.style = "currency";
        result.currency = token.options[0];
        continue;
      case "group-off":
      case ",_":
        result.useGrouping = false;
        continue;
      case "precision-integer":
      case ".":
        result.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        result.style = "unit";
        result.unit = icuUnitToEcma(token.options[0]);
        continue;
      case "compact-short":
      case "K":
        result.notation = "compact";
        result.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        result.notation = "compact";
        result.compactDisplay = "long";
        continue;
      case "scientific":
        result = {
          ...result,
          notation: "scientific",
          ...token.options.reduce((all, opt) => ({
            ...all,
            ...parseNotationOptions(opt)
          }), {})
        };
        continue;
      case "engineering":
        result = {
          ...result,
          notation: "engineering",
          ...token.options.reduce((all, opt) => ({
            ...all,
            ...parseNotationOptions(opt)
          }), {})
        };
        continue;
      case "notation-simple":
        result.notation = "standard";
        continue;
      case "unit-width-narrow":
        result.currencyDisplay = "narrowSymbol";
        result.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        result.currencyDisplay = "code";
        result.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        result.currencyDisplay = "name";
        result.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        result.currencyDisplay = "symbol";
        continue;
      case "scale":
        result.scale = parseFloat(token.options[0]);
        continue;
      case "rounding-mode-floor":
        result.roundingMode = "floor";
        continue;
      case "rounding-mode-ceiling":
        result.roundingMode = "ceil";
        continue;
      case "rounding-mode-down":
        result.roundingMode = "trunc";
        continue;
      case "rounding-mode-up":
        result.roundingMode = "expand";
        continue;
      case "rounding-mode-half-even":
        result.roundingMode = "halfEven";
        continue;
      case "rounding-mode-half-down":
        result.roundingMode = "halfTrunc";
        continue;
      case "rounding-mode-half-up":
        result.roundingMode = "halfExpand";
        continue;
      case "integer-width":
        if (token.options.length > 1) throw new RangeError("integer-width stems only accept a single optional option");
        token.options[0].replace(INTEGER_WIDTH_REGEX, function(_2, g1, g2, g3, g4, g5) {
          if (g1) result.minimumIntegerDigits = g2.length;
          else if (g3 && g4) throw new Error("We currently do not support maximum integer digits");
          else if (g5) throw new Error("We currently do not support exact integer digits");
          return "";
        });
        continue;
    }
    if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
      result.minimumIntegerDigits = token.stem.length;
      continue;
    }
    if (FRACTION_PRECISION_REGEX.test(token.stem)) {
      if (token.options.length > 1) throw new RangeError("Fraction-precision stems only accept a single optional option");
      token.stem.replace(FRACTION_PRECISION_REGEX, function(_2, g1, g2, g3, g4, g5) {
        if (g2 === "*") result.minimumFractionDigits = g1.length;
        else if (g3 && g3[0] === "#") result.maximumFractionDigits = g3.length;
        else if (g4 && g5) {
          result.minimumFractionDigits = g4.length;
          result.maximumFractionDigits = g4.length + g5.length;
        } else {
          result.minimumFractionDigits = g1.length;
          result.maximumFractionDigits = g1.length;
        }
        return "";
      });
      const opt = token.options[0];
      if (opt === "w") result = {
        ...result,
        trailingZeroDisplay: "stripIfInteger"
      };
      else if (opt) result = {
        ...result,
        ...parseSignificantPrecision(opt)
      };
      continue;
    }
    if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
      result = {
        ...result,
        ...parseSignificantPrecision(token.stem)
      };
      continue;
    }
    const signOpts = parseSign(token.stem);
    if (signOpts) result = {
      ...result,
      ...signOpts
    };
    const conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
    if (conciseScientificAndEngineeringOpts) result = {
      ...result,
      ...conciseScientificAndEngineeringOpts
    };
  }
  return result;
}
let ErrorKind = /* @__PURE__ */ (function(ErrorKind2) {
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
  ErrorKind2[ErrorKind2["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
  ErrorKind2[ErrorKind2["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
  ErrorKind2[ErrorKind2["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
  ErrorKind2[ErrorKind2["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
  ErrorKind2[ErrorKind2["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
  ErrorKind2[ErrorKind2["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
  ErrorKind2[ErrorKind2["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
  ErrorKind2[ErrorKind2["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
  ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
  ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
  ErrorKind2[ErrorKind2["INVALID_TAG"] = 23] = "INVALID_TAG";
  ErrorKind2[ErrorKind2["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
  ErrorKind2[ErrorKind2["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
  ErrorKind2[ErrorKind2["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
  return ErrorKind2;
})({});
function isLiteralElement(el) {
  return el.type === 0;
}
function isArgumentElement(el) {
  return el.type === 1;
}
function isNumberElement(el) {
  return el.type === 2;
}
function isDateElement(el) {
  return el.type === 3;
}
function isTimeElement(el) {
  return el.type === 4;
}
function isSelectElement(el) {
  return el.type === 5;
}
function isPluralElement(el) {
  return el.type === 6;
}
function isPoundElement(el) {
  return el.type === 7;
}
function isTagElement(el) {
  return el.type === 8;
}
function isNumberSkeleton(el) {
  return !!(el && typeof el === "object" && el.type === 0);
}
function isDateTimeSkeleton(el) {
  return !!(el && typeof el === "object" && el.type === 1);
}
const SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
const timeData = {
  "001": ["H", "h"],
  "419": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "AC": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "AD": ["H", "hB"],
  "AE": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "AF": [
    "H",
    "hb",
    "hB",
    "h"
  ],
  "AG": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "AI": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "AL": [
    "h",
    "H",
    "hB"
  ],
  "AM": ["H", "hB"],
  "AO": ["H", "hB"],
  "AR": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "AS": ["h", "H"],
  "AT": ["H", "hB"],
  "AU": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "AW": ["H", "hB"],
  "AX": ["H"],
  "AZ": [
    "H",
    "hB",
    "h"
  ],
  "BA": [
    "H",
    "hB",
    "h"
  ],
  "BB": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "BD": [
    "h",
    "hB",
    "H"
  ],
  "BE": ["H", "hB"],
  "BF": ["H", "hB"],
  "BG": [
    "H",
    "hB",
    "h"
  ],
  "BH": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "BI": ["H", "h"],
  "BJ": ["H", "hB"],
  "BL": ["H", "hB"],
  "BM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "BN": [
    "hb",
    "hB",
    "h",
    "H"
  ],
  "BO": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "BQ": ["H"],
  "BR": ["H", "hB"],
  "BS": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "BT": ["h", "H"],
  "BW": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "BY": ["H", "h"],
  "BZ": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "CA": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "CC": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "CD": ["hB", "H"],
  "CF": [
    "H",
    "h",
    "hB"
  ],
  "CG": ["H", "hB"],
  "CH": [
    "H",
    "hB",
    "h"
  ],
  "CI": ["H", "hB"],
  "CK": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "CL": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "CM": [
    "H",
    "h",
    "hB"
  ],
  "CN": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "CO": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "CP": ["H"],
  "CR": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "CU": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "CV": ["H", "hB"],
  "CW": ["H", "hB"],
  "CX": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "CY": [
    "h",
    "H",
    "hb",
    "hB"
  ],
  "CZ": ["H"],
  "DE": ["H", "hB"],
  "DG": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "DJ": ["h", "H"],
  "DK": ["H"],
  "DM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "DO": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "DZ": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "EA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "EC": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "EE": ["H", "hB"],
  "EG": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "EH": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "ER": ["h", "H"],
  "ES": [
    "H",
    "hB",
    "h",
    "hb"
  ],
  "ET": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "FI": ["H"],
  "FJ": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "FK": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "FM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "FO": ["H", "h"],
  "FR": ["H", "hB"],
  "GA": ["H", "hB"],
  "GB": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "GD": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "GE": [
    "H",
    "hB",
    "h"
  ],
  "GF": ["H", "hB"],
  "GG": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "GH": ["h", "H"],
  "GI": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "GL": ["H", "h"],
  "GM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "GN": ["H", "hB"],
  "GP": ["H", "hB"],
  "GQ": [
    "H",
    "hB",
    "h",
    "hb"
  ],
  "GR": [
    "h",
    "H",
    "hb",
    "hB"
  ],
  "GS": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "GT": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "GU": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "GW": ["H", "hB"],
  "GY": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "HK": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "HN": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "HR": ["H", "hB"],
  "HU": ["H", "h"],
  "IC": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "ID": ["H"],
  "IE": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "IL": ["H", "hB"],
  "IM": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "IN": ["h", "H"],
  "IO": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "IQ": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "IR": ["hB", "H"],
  "IS": ["H"],
  "IT": ["H", "hB"],
  "JE": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "JM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "JO": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "JP": [
    "H",
    "K",
    "h"
  ],
  "KE": [
    "hB",
    "hb",
    "H",
    "h"
  ],
  "KG": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "KH": [
    "hB",
    "h",
    "H",
    "hb"
  ],
  "KI": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "KM": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "KN": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "KP": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "KR": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "KW": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "KY": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "KZ": ["H", "hB"],
  "LA": [
    "H",
    "hb",
    "hB",
    "h"
  ],
  "LB": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "LC": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "LI": [
    "H",
    "hB",
    "h"
  ],
  "LK": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "LR": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "LS": ["h", "H"],
  "LT": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "LU": [
    "H",
    "h",
    "hB"
  ],
  "LV": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "LY": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "MA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "MC": ["H", "hB"],
  "MD": ["H", "hB"],
  "ME": [
    "H",
    "hB",
    "h"
  ],
  "MF": ["H", "hB"],
  "MG": ["H", "h"],
  "MH": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "MK": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "ML": ["H"],
  "MM": [
    "hB",
    "hb",
    "H",
    "h"
  ],
  "MN": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "MO": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "MP": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "MQ": ["H", "hB"],
  "MR": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "MS": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "MT": ["H", "h"],
  "MU": ["H", "h"],
  "MV": ["H", "h"],
  "MW": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "MX": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "MY": [
    "hb",
    "hB",
    "h",
    "H"
  ],
  "MZ": ["H", "hB"],
  "NA": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "NC": ["H", "hB"],
  "NE": ["H"],
  "NF": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NG": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NI": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "NL": ["H", "hB"],
  "NO": ["H", "h"],
  "NP": [
    "H",
    "h",
    "hB"
  ],
  "NR": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NU": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NZ": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "OM": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "PA": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "PE": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "PF": [
    "H",
    "h",
    "hB"
  ],
  "PG": ["h", "H"],
  "PH": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "PK": [
    "h",
    "hB",
    "H"
  ],
  "PL": ["H", "h"],
  "PM": ["H", "hB"],
  "PN": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "PR": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "PS": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "PT": ["H", "hB"],
  "PW": ["h", "H"],
  "PY": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "QA": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "RE": ["H", "hB"],
  "RO": ["H", "hB"],
  "RS": [
    "H",
    "hB",
    "h"
  ],
  "RU": ["H"],
  "RW": ["H", "h"],
  "SA": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "SB": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "SC": [
    "H",
    "h",
    "hB"
  ],
  "SD": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "SE": ["H"],
  "SG": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "SH": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "SI": ["H", "hB"],
  "SJ": ["H"],
  "SK": ["H"],
  "SL": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "SM": [
    "H",
    "h",
    "hB"
  ],
  "SN": [
    "H",
    "h",
    "hB"
  ],
  "SO": ["h", "H"],
  "SR": ["H", "hB"],
  "SS": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "ST": ["H", "hB"],
  "SV": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "SX": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "SY": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "SZ": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "TA": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "TC": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "TD": [
    "h",
    "H",
    "hB"
  ],
  "TF": [
    "H",
    "h",
    "hB"
  ],
  "TG": ["H", "hB"],
  "TH": ["H", "h"],
  "TJ": ["H", "h"],
  "TL": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "TM": ["H", "h"],
  "TN": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "TO": ["h", "H"],
  "TR": ["H", "hB"],
  "TT": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "TW": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "TZ": [
    "hB",
    "hb",
    "H",
    "h"
  ],
  "UA": [
    "H",
    "hB",
    "h"
  ],
  "UG": [
    "hB",
    "hb",
    "H",
    "h"
  ],
  "UM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "US": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "UY": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "UZ": [
    "H",
    "hB",
    "h"
  ],
  "VA": [
    "H",
    "h",
    "hB"
  ],
  "VC": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "VE": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "VG": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "VI": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "VN": ["H", "h"],
  "VU": ["h", "H"],
  "WF": ["H", "hB"],
  "WS": ["h", "H"],
  "XK": [
    "H",
    "hB",
    "h"
  ],
  "YE": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "YT": ["H", "hB"],
  "ZA": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "ZM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "ZW": ["H", "h"],
  "af-ZA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "ar-001": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "ca-ES": [
    "H",
    "h",
    "hB"
  ],
  "en-001": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-HK": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-IL": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "en-MY": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "es-BR": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-ES": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-GQ": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "fr-CA": [
    "H",
    "h",
    "hB"
  ],
  "gl-ES": [
    "H",
    "h",
    "hB"
  ],
  "gu-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "hi-IN": [
    "hB",
    "h",
    "H"
  ],
  "it-CH": [
    "H",
    "h",
    "hB"
  ],
  "it-IT": [
    "H",
    "h",
    "hB"
  ],
  "kn-IN": [
    "hB",
    "h",
    "H"
  ],
  "ku-SY": ["H", "hB"],
  "ml-IN": [
    "hB",
    "h",
    "H"
  ],
  "mr-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "pa-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "ta-IN": [
    "hB",
    "h",
    "hb",
    "H"
  ],
  "te-IN": [
    "hB",
    "h",
    "H"
  ],
  "zu-ZA": [
    "H",
    "hB",
    "hb",
    "h"
  ]
};
function getBestPattern(skeleton, locale) {
  let skeletonCopy = "";
  for (let patternPos = 0; patternPos < skeleton.length; patternPos++) {
    const patternChar = skeleton.charAt(patternPos);
    if (patternChar === "j") {
      let extraLength = 0;
      while (patternPos + 1 < skeleton.length && skeleton.charAt(patternPos + 1) === patternChar) {
        extraLength++;
        patternPos++;
      }
      let hourLen = 1 + (extraLength & 1);
      let dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
      let dayPeriodChar = "a";
      let hourChar = getDefaultHourSymbolFromLocale(locale);
      if (hourChar == "H" || hourChar == "k") dayPeriodLen = 0;
      while (dayPeriodLen-- > 0) skeletonCopy += dayPeriodChar;
      while (hourLen-- > 0) skeletonCopy = hourChar + skeletonCopy;
    } else if (patternChar === "J") skeletonCopy += "H";
    else skeletonCopy += patternChar;
  }
  return skeletonCopy;
}
function getDefaultHourSymbolFromLocale(locale) {
  let hourCycle = locale.hourCycle;
  if (hourCycle === void 0 && locale.hourCycles && locale.hourCycles.length) hourCycle = locale.hourCycles[0];
  if (hourCycle) switch (hourCycle) {
    case "h24":
      return "k";
    case "h23":
      return "H";
    case "h12":
      return "h";
    case "h11":
      return "K";
    default:
      throw new Error("Invalid hourCycle");
  }
  const languageTag = locale.language;
  let regionTag;
  if (languageTag !== "root") regionTag = locale.maximize().region;
  return (timeData[regionTag || ""] || timeData[languageTag || ""] || timeData[`${languageTag}-001`] || timeData["001"])[0];
}
const SPACE_SEPARATOR_START_REGEX = new RegExp(`^${SPACE_SEPARATOR_REGEX.source}*`);
const SPACE_SEPARATOR_END_REGEX = new RegExp(`${SPACE_SEPARATOR_REGEX.source}*$`);
function createLocation(start, end) {
  return {
    start,
    end
  };
}
const hasNativeFromEntries = !!Object.fromEntries;
const hasTrimStart = !!String.prototype.trimStart;
const hasTrimEnd = !!String.prototype.trimEnd;
const fromEntries = hasNativeFromEntries ? Object.fromEntries : function fromEntries2(entries) {
  const obj = {};
  for (const [k3, v2] of entries) obj[k3] = v2;
  return obj;
};
const trimStart = hasTrimStart ? function trimStart2(s2) {
  return s2.trimStart();
} : function trimStart3(s2) {
  return s2.replace(SPACE_SEPARATOR_START_REGEX, "");
};
const trimEnd = hasTrimEnd ? function trimEnd2(s2) {
  return s2.trimEnd();
} : function trimEnd3(s2) {
  return s2.replace(SPACE_SEPARATOR_END_REGEX, "");
};
const IDENTIFIER_PREFIX_RE = /* @__PURE__ */ new RegExp("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
function matchIdentifierAtIndex(s2, index) {
  IDENTIFIER_PREFIX_RE.lastIndex = index;
  return IDENTIFIER_PREFIX_RE.exec(s2)[1] ?? "";
}
function plainTopLevelEndPosition(message) {
  if (message.length === 0) return null;
  let line = 1;
  let column = 1;
  for (let offset = 0; offset < message.length; ) {
    const code = message.charCodeAt(offset);
    switch (code) {
      case 35:
      case 39:
      case 60:
      case 123:
      case 125:
        return null;
    }
    if (code === 10) {
      line++;
      column = 1;
      offset++;
    } else {
      column++;
      if (code >= 55296 && code <= 56319 && offset + 1 < message.length) {
        const next = message.charCodeAt(offset + 1);
        offset += next >= 56320 && next <= 57343 ? 2 : 1;
      } else offset++;
    }
  }
  return {
    offset: message.length,
    line,
    column
  };
}
var Parser = class {
  constructor(message, options = {}) {
    this.message = message;
    this.position = {
      offset: 0,
      line: 1,
      column: 1
    };
    this.ignoreTag = !!options.ignoreTag;
    this.locale = options.locale;
    this.requiresOtherClause = !!options.requiresOtherClause;
    this.shouldParseSkeletons = !!options.shouldParseSkeletons;
  }
  parse() {
    if (this.offset() !== 0) throw Error("parser can only be used once");
    if (this.message.length > 0) {
      const firstCode = this.message.charCodeAt(0);
      if (firstCode !== 35 && firstCode !== 39 && firstCode !== 60 && firstCode !== 123 && firstCode !== 125) {
        const plainEndPosition = plainTopLevelEndPosition(this.message);
        if (plainEndPosition) {
          const start = this.clonePosition();
          this.position = plainEndPosition;
          return {
            val: [{
              type: 0,
              value: this.message,
              location: createLocation(start, this.clonePosition())
            }],
            err: null
          };
        }
      }
    }
    return this.parseMessage(0, "", false);
  }
  parseMessage(nestingLevel, parentArgType, expectingCloseTag) {
    let elements = [];
    while (!this.isEOF()) {
      const char = this.char();
      if (char === 123) {
        const result = this.parseArgument(nestingLevel, expectingCloseTag);
        if (result.err) return result;
        elements.push(result.val);
      } else if (char === 125 && nestingLevel > 0) break;
      else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
        const position = this.clonePosition();
        this.bump();
        elements.push({
          type: 7,
          location: createLocation(position, this.clonePosition())
        });
      } else if (char === 60 && !this.ignoreTag && this.peek() === 47) if (expectingCloseTag) break;
      else return this.error(26, createLocation(this.clonePosition(), this.clonePosition()));
      else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
        const result = this.parseTag(nestingLevel, parentArgType);
        if (result.err) return result;
        elements.push(result.val);
      } else {
        const result = this.parseLiteral(nestingLevel, parentArgType);
        if (result.err) return result;
        elements.push(result.val);
      }
    }
    return {
      val: elements,
      err: null
    };
  }
  /**
  * A tag name must start with an ASCII lower/upper case letter. The grammar is based on the
  * [custom element name][] except that a dash is NOT always mandatory and uppercase letters
  * are accepted:
  *
  * ```
  * tag ::= "<" tagName (whitespace)* "/>" | "<" tagName (whitespace)* ">" message "</" tagName (whitespace)* ">"
  * tagName ::= [a-z] (PENChar)*
  * PENChar ::=
  *     "-" | "." | [0-9] | "_" | [a-z] | [A-Z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] |
  *     [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
  *     [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
  * ```
  *
  * [custom element name]: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
  * NOTE: We're a bit more lax here since HTML technically does not allow uppercase HTML element but we do
  * since other tag-based engines like React allow it
  */
  parseTag(nestingLevel, parentArgType) {
    const startPosition = this.clonePosition();
    this.bump();
    const tagName = this.parseTagName();
    this.bumpSpace();
    if (this.bumpIf("/>")) return {
      val: {
        type: 0,
        value: `<${tagName}/>`,
        location: createLocation(startPosition, this.clonePosition())
      },
      err: null
    };
    else if (this.bumpIf(">")) {
      const childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
      if (childrenResult.err) return childrenResult;
      const children = childrenResult.val;
      const endTagStartPosition = this.clonePosition();
      if (this.bumpIf("</")) {
        if (this.isEOF() || !_isAlpha(this.char())) return this.error(23, createLocation(endTagStartPosition, this.clonePosition()));
        const closingTagNameStartPosition = this.clonePosition();
        if (tagName !== this.parseTagName()) return this.error(26, createLocation(closingTagNameStartPosition, this.clonePosition()));
        this.bumpSpace();
        if (!this.bumpIf(">")) return this.error(23, createLocation(endTagStartPosition, this.clonePosition()));
        return {
          val: {
            type: 8,
            value: tagName,
            children,
            location: createLocation(startPosition, this.clonePosition())
          },
          err: null
        };
      } else return this.error(27, createLocation(startPosition, this.clonePosition()));
    } else return this.error(23, createLocation(startPosition, this.clonePosition()));
  }
  /**
  * This method assumes that the caller has peeked ahead for the first tag character.
  */
  parseTagName() {
    const startOffset = this.offset();
    this.bump();
    while (!this.isEOF() && _isPotentialElementNameChar(this.char())) this.bump();
    return this.message.slice(startOffset, this.offset());
  }
  parseLiteral(nestingLevel, parentArgType) {
    const start = this.clonePosition();
    let value = "";
    while (true) {
      const parseQuoteResult = this.tryParseQuote(parentArgType);
      if (parseQuoteResult) {
        value += parseQuoteResult;
        continue;
      }
      const parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
      if (parseUnquotedResult) {
        value += parseUnquotedResult;
        continue;
      }
      const parseLeftAngleResult = this.tryParseLeftAngleBracket();
      if (parseLeftAngleResult) {
        value += parseLeftAngleResult;
        continue;
      }
      break;
    }
    const location = createLocation(start, this.clonePosition());
    return {
      val: {
        type: 0,
        value,
        location
      },
      err: null
    };
  }
  tryParseLeftAngleBracket() {
    if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || !_isAlphaOrSlash(this.peek() || 0))) {
      this.bump();
      return "<";
    }
    return null;
  }
  /**
  * Starting with ICU 4.8, an ASCII apostrophe only starts quoted text if it immediately precedes
  * a character that requires quoting (that is, "only where needed"), and works the same in
  * nested messages as on the top level of the pattern. The new behavior is otherwise compatible.
  */
  tryParseQuote(parentArgType) {
    if (this.isEOF() || this.char() !== 39) return null;
    switch (this.peek()) {
      case 39:
        this.bump();
        this.bump();
        return "'";
      case 123:
      case 60:
      case 62:
      case 125:
        break;
      case 35:
        if (parentArgType === "plural" || parentArgType === "selectordinal") break;
        return null;
      default:
        return null;
    }
    this.bump();
    const codePoints = [this.char()];
    this.bump();
    while (!this.isEOF()) {
      const ch = this.char();
      if (ch === 39) if (this.peek() === 39) {
        codePoints.push(39);
        this.bump();
      } else {
        this.bump();
        break;
      }
      else codePoints.push(ch);
      this.bump();
    }
    return String.fromCodePoint(...codePoints);
  }
  tryParseUnquoted(nestingLevel, parentArgType) {
    if (this.isEOF()) return null;
    const ch = this.char();
    if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) return null;
    else {
      this.bump();
      return String.fromCodePoint(ch);
    }
  }
  parseArgument(nestingLevel, expectingCloseTag) {
    const openingBracePosition = this.clonePosition();
    this.bump();
    this.bumpSpace();
    if (this.isEOF()) return this.error(1, createLocation(openingBracePosition, this.clonePosition()));
    if (this.char() === 125) {
      this.bump();
      return this.error(2, createLocation(openingBracePosition, this.clonePosition()));
    }
    let value = this.parseIdentifierIfPossible().value;
    if (!value) return this.error(3, createLocation(openingBracePosition, this.clonePosition()));
    this.bumpSpace();
    if (this.isEOF()) return this.error(1, createLocation(openingBracePosition, this.clonePosition()));
    switch (this.char()) {
      case 125:
        this.bump();
        return {
          val: {
            type: 1,
            value,
            location: createLocation(openingBracePosition, this.clonePosition())
          },
          err: null
        };
      case 44:
        this.bump();
        this.bumpSpace();
        if (this.isEOF()) return this.error(1, createLocation(openingBracePosition, this.clonePosition()));
        return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
      default:
        return this.error(3, createLocation(openingBracePosition, this.clonePosition()));
    }
  }
  /**
  * Advance the parser until the end of the identifier, if it is currently on
  * an identifier character. Return an empty string otherwise.
  */
  parseIdentifierIfPossible() {
    const startingPosition = this.clonePosition();
    const startOffset = this.offset();
    const value = matchIdentifierAtIndex(this.message, startOffset);
    const endOffset = startOffset + value.length;
    this.bumpTo(endOffset);
    return {
      value,
      location: createLocation(startingPosition, this.clonePosition())
    };
  }
  parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition) {
    let typeStartPosition = this.clonePosition();
    let argType = this.parseIdentifierIfPossible().value;
    let typeEndPosition = this.clonePosition();
    switch (argType) {
      case "":
        return this.error(4, createLocation(typeStartPosition, typeEndPosition));
      case "number":
      case "date":
      case "time": {
        this.bumpSpace();
        let styleAndLocation = null;
        if (this.bumpIf(",")) {
          this.bumpSpace();
          const styleStartPosition = this.clonePosition();
          const result = this.parseSimpleArgStyleIfPossible();
          if (result.err) return result;
          const style = trimEnd(result.val);
          if (style.length === 0) return this.error(6, createLocation(this.clonePosition(), this.clonePosition()));
          styleAndLocation = {
            style,
            styleLocation: createLocation(styleStartPosition, this.clonePosition())
          };
        }
        const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
        if (argCloseResult.err) return argCloseResult;
        const location = createLocation(openingBracePosition, this.clonePosition());
        if (styleAndLocation && styleAndLocation.style.startsWith("::")) {
          let skeleton = trimStart(styleAndLocation.style.slice(2));
          if (argType === "number") {
            const result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
            if (result.err) return result;
            return {
              val: {
                type: 2,
                value,
                location,
                style: result.val
              },
              err: null
            };
          } else {
            if (skeleton.length === 0) return this.error(10, location);
            let dateTimePattern = skeleton;
            if (this.locale) dateTimePattern = getBestPattern(skeleton, this.locale);
            const style = {
              type: 1,
              pattern: dateTimePattern,
              location: styleAndLocation.styleLocation,
              parsedOptions: this.shouldParseSkeletons ? parseDateTimeSkeleton(dateTimePattern) : {}
            };
            return {
              val: {
                type: argType === "date" ? 3 : 4,
                value,
                location,
                style
              },
              err: null
            };
          }
        }
        return {
          val: {
            type: argType === "number" ? 2 : argType === "date" ? 3 : 4,
            value,
            location,
            style: styleAndLocation?.style ?? null
          },
          err: null
        };
      }
      case "plural":
      case "selectordinal":
      case "select": {
        const typeEndPosition2 = this.clonePosition();
        this.bumpSpace();
        if (!this.bumpIf(",")) return this.error(12, createLocation(typeEndPosition2, { ...typeEndPosition2 }));
        this.bumpSpace();
        let identifierAndLocation = this.parseIdentifierIfPossible();
        let pluralOffset = 0;
        if (argType !== "select" && identifierAndLocation.value === "offset") {
          if (!this.bumpIf(":")) return this.error(13, createLocation(this.clonePosition(), this.clonePosition()));
          this.bumpSpace();
          const result = this.tryParseDecimalInteger(13, 14);
          if (result.err) return result;
          this.bumpSpace();
          identifierAndLocation = this.parseIdentifierIfPossible();
          pluralOffset = result.val;
        }
        const optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
        if (optionsResult.err) return optionsResult;
        const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
        if (argCloseResult.err) return argCloseResult;
        const location = createLocation(openingBracePosition, this.clonePosition());
        if (argType === "select") return {
          val: {
            type: 5,
            value,
            options: fromEntries(optionsResult.val),
            location
          },
          err: null
        };
        else return {
          val: {
            type: 6,
            value,
            options: fromEntries(optionsResult.val),
            offset: pluralOffset,
            pluralType: argType === "plural" ? "cardinal" : "ordinal",
            location
          },
          err: null
        };
      }
      default:
        return this.error(5, createLocation(typeStartPosition, typeEndPosition));
    }
  }
  tryParseArgumentClose(openingBracePosition) {
    if (this.isEOF() || this.char() !== 125) return this.error(1, createLocation(openingBracePosition, this.clonePosition()));
    this.bump();
    return {
      val: true,
      err: null
    };
  }
  /**
  * See: https://github.com/unicode-org/icu/blob/af7ed1f6d2298013dc303628438ec4abe1f16479/icu4c/source/common/messagepattern.cpp#L659
  */
  parseSimpleArgStyleIfPossible() {
    let nestedBraces = 0;
    const startPosition = this.clonePosition();
    while (!this.isEOF()) switch (this.char()) {
      case 39: {
        this.bump();
        let apostrophePosition = this.clonePosition();
        if (!this.bumpUntil("'")) return this.error(11, createLocation(apostrophePosition, this.clonePosition()));
        this.bump();
        break;
      }
      case 123:
        nestedBraces += 1;
        this.bump();
        break;
      case 125:
        if (nestedBraces > 0) nestedBraces -= 1;
        else return {
          val: this.message.slice(startPosition.offset, this.offset()),
          err: null
        };
        break;
      default:
        this.bump();
        break;
    }
    return {
      val: this.message.slice(startPosition.offset, this.offset()),
      err: null
    };
  }
  parseNumberSkeletonFromString(skeleton, location) {
    let tokens = [];
    try {
      tokens = parseNumberSkeletonFromString(skeleton);
    } catch {
      return this.error(7, location);
    }
    return {
      val: {
        type: 0,
        tokens,
        location,
        parsedOptions: this.shouldParseSkeletons ? parseNumberSkeleton(tokens) : {}
      },
      err: null
    };
  }
  /**
  * @param nesting_level The current nesting level of messages.
  *     This can be positive when parsing message fragment in select or plural argument options.
  * @param parent_arg_type The parent argument's type.
  * @param parsed_first_identifier If provided, this is the first identifier-like selector of
  *     the argument. It is a by-product of a previous parsing attempt.
  * @param expecting_close_tag If true, this message is directly or indirectly nested inside
  *     between a pair of opening and closing tags. The nested message will not parse beyond
  *     the closing tag boundary.
  */
  tryParsePluralOrSelectOptions(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
    let hasOtherClause = false;
    const options = [];
    const parsedSelectors = /* @__PURE__ */ new Set();
    let { value: selector, location: selectorLocation } = parsedFirstIdentifier;
    while (true) {
      if (selector.length === 0) {
        const startPosition = this.clonePosition();
        if (parentArgType !== "select" && this.bumpIf("=")) {
          const result = this.tryParseDecimalInteger(16, 19);
          if (result.err) return result;
          selectorLocation = createLocation(startPosition, this.clonePosition());
          selector = this.message.slice(startPosition.offset, this.offset());
        } else break;
      }
      if (parsedSelectors.has(selector)) return this.error(parentArgType === "select" ? 21 : 20, selectorLocation);
      if (selector === "other") hasOtherClause = true;
      this.bumpSpace();
      const openingBracePosition = this.clonePosition();
      if (!this.bumpIf("{")) return this.error(parentArgType === "select" ? 17 : 18, createLocation(this.clonePosition(), this.clonePosition()));
      const fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
      if (fragmentResult.err) return fragmentResult;
      const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
      if (argCloseResult.err) return argCloseResult;
      options.push([selector, {
        value: fragmentResult.val,
        location: createLocation(openingBracePosition, this.clonePosition())
      }]);
      parsedSelectors.add(selector);
      this.bumpSpace();
      ({ value: selector, location: selectorLocation } = this.parseIdentifierIfPossible());
    }
    if (options.length === 0) return this.error(parentArgType === "select" ? 15 : 16, createLocation(this.clonePosition(), this.clonePosition()));
    if (this.requiresOtherClause && !hasOtherClause) return this.error(22, createLocation(this.clonePosition(), this.clonePosition()));
    return {
      val: options,
      err: null
    };
  }
  tryParseDecimalInteger(expectNumberError, invalidNumberError) {
    let sign = 1;
    const startingPosition = this.clonePosition();
    if (this.bumpIf("+")) ;
    else if (this.bumpIf("-")) sign = -1;
    let hasDigits = false;
    let decimal = 0;
    while (!this.isEOF()) {
      const ch = this.char();
      if (ch >= 48 && ch <= 57) {
        hasDigits = true;
        decimal = decimal * 10 + (ch - 48);
        this.bump();
      } else break;
    }
    const location = createLocation(startingPosition, this.clonePosition());
    if (!hasDigits) return this.error(expectNumberError, location);
    decimal *= sign;
    if (!Number.isSafeInteger(decimal)) return this.error(invalidNumberError, location);
    return {
      val: decimal,
      err: null
    };
  }
  offset() {
    return this.position.offset;
  }
  isEOF() {
    return this.offset() === this.message.length;
  }
  clonePosition() {
    return {
      offset: this.position.offset,
      line: this.position.line,
      column: this.position.column
    };
  }
  /**
  * Return the code point at the current position of the parser.
  * Throws if the index is out of bound.
  */
  char() {
    const offset = this.position.offset;
    if (offset >= this.message.length) throw Error("out of bound");
    const code = this.message.codePointAt(offset);
    if (code === void 0) throw Error(`Offset ${offset} is at invalid UTF-16 code unit boundary`);
    return code;
  }
  error(kind, location) {
    return {
      val: null,
      err: {
        kind,
        message: this.message,
        location
      }
    };
  }
  /** Bump the parser to the next UTF-16 code unit. */
  bump() {
    if (this.isEOF()) return;
    const code = this.char();
    if (code === 10) {
      this.position.line += 1;
      this.position.column = 1;
      this.position.offset += 1;
    } else {
      this.position.column += 1;
      this.position.offset += code < 65536 ? 1 : 2;
    }
  }
  /**
  * If the substring starting at the current position of the parser has
  * the given prefix, then bump the parser to the character immediately
  * following the prefix and return true. Otherwise, don't bump the parser
  * and return false.
  */
  bumpIf(prefix) {
    if (this.message.startsWith(prefix, this.offset())) {
      for (let i4 = 0; i4 < prefix.length; i4++) this.bump();
      return true;
    }
    return false;
  }
  /**
  * Bump the parser until the pattern character is found and return `true`.
  * Otherwise bump to the end of the file and return `false`.
  */
  bumpUntil(pattern) {
    const currentOffset = this.offset();
    const index = this.message.indexOf(pattern, currentOffset);
    if (index >= 0) {
      this.bumpTo(index);
      return true;
    } else {
      this.bumpTo(this.message.length);
      return false;
    }
  }
  /**
  * Bump the parser to the target offset.
  * If target offset is beyond the end of the input, bump the parser to the end of the input.
  */
  bumpTo(targetOffset) {
    if (this.offset() > targetOffset) throw Error(`targetOffset ${targetOffset} must be greater than or equal to the current offset ${this.offset()}`);
    targetOffset = Math.min(targetOffset, this.message.length);
    while (true) {
      const offset = this.offset();
      if (offset === targetOffset) break;
      if (offset > targetOffset) throw Error(`targetOffset ${targetOffset} is at invalid UTF-16 code unit boundary`);
      this.bump();
      if (this.isEOF()) break;
    }
  }
  /** advance the parser through all whitespace to the next non-whitespace code unit. */
  bumpSpace() {
    while (!this.isEOF() && _isWhiteSpace(this.char())) this.bump();
  }
  /**
  * Peek at the *next* Unicode codepoint in the input without advancing the parser.
  * If the input has been exhausted, then this returns null.
  */
  peek() {
    if (this.isEOF()) return null;
    const code = this.char();
    const offset = this.offset();
    return this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1)) ?? null;
  }
};
function _isAlpha(codepoint) {
  return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
}
function _isAlphaOrSlash(codepoint) {
  return _isAlpha(codepoint) || codepoint === 47;
}
function _isPotentialElementNameChar(c2) {
  return c2 === 45 || c2 === 46 || c2 >= 48 && c2 <= 57 || c2 === 95 || c2 >= 97 && c2 <= 122 || c2 >= 65 && c2 <= 90 || c2 == 183 || c2 >= 192 && c2 <= 214 || c2 >= 216 && c2 <= 246 || c2 >= 248 && c2 <= 893 || c2 >= 895 && c2 <= 8191 || c2 >= 8204 && c2 <= 8205 || c2 >= 8255 && c2 <= 8256 || c2 >= 8304 && c2 <= 8591 || c2 >= 11264 && c2 <= 12271 || c2 >= 12289 && c2 <= 55295 || c2 >= 63744 && c2 <= 64975 || c2 >= 65008 && c2 <= 65533 || c2 >= 65536 && c2 <= 983039;
}
function _isWhiteSpace(c2) {
  return c2 >= 9 && c2 <= 13 || c2 === 32 || c2 === 133 || c2 >= 8206 && c2 <= 8207 || c2 === 8232 || c2 === 8233;
}
function pruneLocation(els) {
  els.forEach((el) => {
    delete el.location;
    if (isSelectElement(el) || isPluralElement(el)) for (const k3 in el.options) {
      delete el.options[k3].location;
      pruneLocation(el.options[k3].value);
    }
    else if (isNumberElement(el) && isNumberSkeleton(el.style)) delete el.style.location;
    else if ((isDateElement(el) || isTimeElement(el)) && isDateTimeSkeleton(el.style)) delete el.style.location;
    else if (isTagElement(el)) pruneLocation(el.children);
  });
}
function parse$1(message, opts = {}) {
  opts = {
    shouldParseSkeletons: true,
    requiresOtherClause: true,
    ...opts
  };
  const result = new Parser(message, opts).parse();
  if (result.err) {
    const error = SyntaxError(ErrorKind[result.err.kind]);
    error.location = result.err.location;
    error.originalMessage = result.err.message;
    throw error;
  }
  if (!opts?.captureLocation) pruneLocation(result.val);
  return result.val;
}
var FormatError = class extends Error {
  constructor(msg, code, originalMessage) {
    super(msg);
    this.code = code;
    this.originalMessage = originalMessage;
  }
  toString() {
    return `[formatjs Error: ${this.code}] ${this.message}`;
  }
};
var InvalidValueError = class extends FormatError {
  constructor(variableId, value, options, originalMessage) {
    super(`Invalid values for "${variableId}": "${value}". Options are "${Object.keys(options).join('", "')}"`, "INVALID_VALUE", originalMessage);
  }
};
var InvalidValueTypeError = class extends FormatError {
  constructor(value, type2, originalMessage) {
    super(`Value for "${value}" must be of type ${type2}`, "INVALID_VALUE", originalMessage);
  }
};
var MissingValueError = class extends FormatError {
  constructor(variableId, originalMessage) {
    super(`The intl string context variable "${variableId}" was not provided to the string "${originalMessage}"`, "MISSING_VALUE", originalMessage);
  }
};
function mergeLiteral(parts) {
  if (parts.length < 2) return parts;
  return parts.reduce((all, part) => {
    const lastPart = all[all.length - 1];
    if (!lastPart || lastPart.type !== 0 || part.type !== 0) all.push(part);
    else lastPart.value += part.value;
    return all;
  }, []);
}
function isFormatXMLElementFn(el) {
  return typeof el === "function";
}
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
  if (els.length === 1 && isLiteralElement(els[0])) return [{
    type: 0,
    value: els[0].value
  }];
  const result = [];
  for (const el of els) {
    if (isLiteralElement(el)) {
      result.push({
        type: 0,
        value: el.value
      });
      continue;
    }
    if (isPoundElement(el)) {
      if (typeof currentPluralValue === "number") result.push({
        type: 0,
        value: formatters.getNumberFormat(locales).format(currentPluralValue)
      });
      continue;
    }
    const { value: varName } = el;
    if (!(values && varName in values)) throw new MissingValueError(varName, originalMessage);
    let value = values[varName];
    if (isArgumentElement(el)) {
      if (!value || typeof value === "string" || typeof value === "number" || typeof value === "bigint") value = typeof value === "string" || typeof value === "number" || typeof value === "bigint" ? String(value) : "";
      result.push({
        type: typeof value === "string" ? 0 : 1,
        value
      });
      continue;
    }
    if (isDateElement(el)) {
      const style = typeof el.style === "string" ? formats.date[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : void 0;
      result.push({
        type: 0,
        value: formatters.getDateTimeFormat(locales, style).format(value)
      });
      continue;
    }
    if (isTimeElement(el)) {
      const style = typeof el.style === "string" ? formats.time[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : formats.time.medium;
      result.push({
        type: 0,
        value: formatters.getDateTimeFormat(locales, style).format(value)
      });
      continue;
    }
    if (isNumberElement(el)) {
      const style = typeof el.style === "string" ? formats.number[el.style] : isNumberSkeleton(el.style) ? el.style.parsedOptions : void 0;
      if (style && style.scale) {
        const scale = style.scale || 1;
        if (typeof value === "bigint") {
          if (!Number.isInteger(scale)) throw new TypeError(`Cannot apply fractional scale ${scale} to bigint value. Scale must be an integer when formatting bigint.`);
          value = value * BigInt(scale);
        } else value = value * scale;
      }
      result.push({
        type: 0,
        value: formatters.getNumberFormat(locales, style).format(value)
      });
      continue;
    }
    if (isTagElement(el)) {
      const { children, value: value2 } = el;
      const formatFn = values[value2];
      if (!isFormatXMLElementFn(formatFn)) throw new InvalidValueTypeError(value2, "function", originalMessage);
      let chunks = formatFn(formatToParts(children, locales, formatters, formats, values, currentPluralValue).map((p2) => p2.value));
      if (!Array.isArray(chunks)) chunks = [chunks];
      result.push(...chunks.map((c2) => {
        return {
          type: typeof c2 === "string" ? 0 : 1,
          value: c2
        };
      }));
    }
    if (isSelectElement(el)) {
      const key = value;
      const opt = (Object.prototype.hasOwnProperty.call(el.options, key) ? el.options[key] : void 0) || el.options.other;
      if (!opt) throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
      result.push(...formatToParts(opt.value, locales, formatters, formats, values));
      continue;
    }
    if (isPluralElement(el)) {
      const exactKey = `=${value}`;
      let opt = Object.prototype.hasOwnProperty.call(el.options, exactKey) ? el.options[exactKey] : void 0;
      if (!opt) {
        if (!Intl.PluralRules) throw new FormatError(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, "MISSING_INTL_API", originalMessage);
        const numericValue2 = typeof value === "bigint" ? Number(value) : value;
        const rule = formatters.getPluralRules(locales, { type: el.pluralType }).select(numericValue2 - (el.offset || 0));
        opt = (Object.prototype.hasOwnProperty.call(el.options, rule) ? el.options[rule] : void 0) || el.options.other;
      }
      if (!opt) throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
      const numericValue = typeof value === "bigint" ? Number(value) : value;
      result.push(...formatToParts(opt.value, locales, formatters, formats, values, numericValue - (el.offset || 0)));
      continue;
    }
  }
  return mergeLiteral(result);
}
function mergeConfig(c1, c2) {
  if (!c2) return c1;
  return {
    ...c1,
    ...c2,
    ...Object.keys(c1).reduce((all, k3) => {
      all[k3] = {
        ...c1[k3],
        ...c2[k3]
      };
      return all;
    }, {})
  };
}
function mergeConfigs(defaultConfig, configs) {
  if (!configs) return defaultConfig;
  return Object.keys(defaultConfig).reduce((all, k3) => {
    all[k3] = mergeConfig(defaultConfig[k3], configs[k3]);
    return all;
  }, { ...defaultConfig });
}
function createFastMemoizeCache(store) {
  return { create() {
    return {
      get(key) {
        return store[key];
      },
      set(key, value) {
        store[key] = value;
      }
    };
  } };
}
function createDefaultFormatters(cache = {
  number: {},
  dateTime: {},
  pluralRules: {}
}) {
  return {
    getNumberFormat: memoize((...args) => new Intl.NumberFormat(...args), {
      cache: createFastMemoizeCache(cache.number),
      strategy: strategies.variadic
    }),
    getDateTimeFormat: memoize((...args) => new Intl.DateTimeFormat(...args), {
      cache: createFastMemoizeCache(cache.dateTime),
      strategy: strategies.variadic
    }),
    getPluralRules: memoize((...args) => new Intl.PluralRules(...args), {
      cache: createFastMemoizeCache(cache.pluralRules),
      strategy: strategies.variadic
    })
  };
}
var IntlMessageFormat = class IntlMessageFormat2 {
  constructor(message, locales = IntlMessageFormat2.defaultLocale, overrideFormats, opts) {
    this.formatterCache = {
      number: {},
      dateTime: {},
      pluralRules: {}
    };
    this.format = (values) => {
      const parts = this.formatToParts(values);
      if (parts.length === 1) return parts[0].value;
      const result = parts.reduce((all, part) => {
        if (!all.length || part.type !== 0 || typeof all[all.length - 1] !== "string") all.push(part.value);
        else all[all.length - 1] += part.value;
        return all;
      }, []);
      if (result.length <= 1) return result[0] || "";
      return result;
    };
    this.formatToParts = (values) => formatToParts(this.ast, this.locales, this.formatters, this.formats, values, void 0, this.message);
    this.resolvedOptions = () => ({ locale: this.resolvedLocale?.toString() || Intl.NumberFormat.supportedLocalesOf(this.locales)[0] });
    this.getAst = () => this.ast;
    this.locales = locales;
    this.resolvedLocale = IntlMessageFormat2.resolveLocale(locales);
    if (typeof message === "string") {
      this.message = message;
      if (!IntlMessageFormat2.__parse) throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
      const { ...parseOpts } = opts || {};
      this.ast = IntlMessageFormat2.__parse(message, {
        ...parseOpts,
        locale: this.resolvedLocale
      });
    } else this.ast = message;
    if (!Array.isArray(this.ast)) throw new TypeError("A message must be provided as a String or AST.");
    this.formats = mergeConfigs(IntlMessageFormat2.formats, overrideFormats);
    this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
  }
  static {
    this.memoizedDefaultLocale = null;
  }
  static get defaultLocale() {
    if (!IntlMessageFormat2.memoizedDefaultLocale) IntlMessageFormat2.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
    return IntlMessageFormat2.memoizedDefaultLocale;
  }
  static {
    this.resolveLocale = (locales) => {
      if (typeof Intl.Locale === "undefined") return;
      const supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
      if (supportedLocales.length > 0) return new Intl.Locale(supportedLocales[0]);
      return new Intl.Locale(typeof locales === "string" ? locales : locales[0]);
    };
  }
  static {
    this.__parse = parse$1;
  }
  static {
    this.formats = {
      number: {
        integer: { maximumFractionDigits: 0 },
        currency: { style: "currency" },
        percent: { style: "percent" }
      },
      date: {
        short: {
          month: "numeric",
          day: "numeric",
          year: "2-digit"
        },
        medium: {
          month: "short",
          day: "numeric",
          year: "numeric"
        },
        long: {
          month: "long",
          day: "numeric",
          year: "numeric"
        },
        full: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      },
      time: {
        short: {
          hour: "numeric",
          minute: "numeric"
        },
        medium: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        },
        long: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        },
        full: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        }
      }
    };
  }
};
const card = { "not_found": "Entity not found" };
const editor = { "card": { "generic": { "entity": "Entity", "color": "Color", "content_info": "Content", "fill_container": "Fill container", "icon_animation": "Animate icon when active?", "icon_color": "Icon color", "icon_type": "Icon type", "layout": "Layout", "primary_info": "Primary information", "secondary_info": "Secondary information", "use_entity_picture": "Use entity picture?", "collapsible_controls": "Collapse controls when off", "picture": "Picture" }, "petkit_litterbox": { "actions": "Action buttons", "icon_animation": "Animate icon while active", "active_states": "Active states (override)", "scoop_entity": "Scoop (button or script)", "deodorize_entity": "Deodorize (button or script)", "level_litter_entity": "Level litter (button or script)", "maintenance_entity": "Maintenance (button or script)", "footer_1": "Footer item 1", "footer_2": "Footer item 2 (optional)", "actions_list": { "scoop": "Scoop", "deodorize": "Deodorize", "level_litter": "Level litter", "maintenance": "Maintenance mode" } }, "petkit_litterbox_timeline": { "layout": "Layout", "hours_to_show": "History window", "layout_vertical": "Vertical", "layout_horizontal": "Horizontal", "header_section": "Header", "header_title": "Custom title", "show_header_icon": "Show icon", "show_header_title": "Show title", "show_header_hours": "Show hours badge", "labels_section": "State labels", "label_idle": "Idle", "label_cleaning": "Cleaning", "label_scooping": "Scooping", "label_dumping": "Dumping", "label_leveling": "Leveling", "label_odor_removal": "Odor removal", "label_deodorizing": "Deodorizing", "label_maintenance": "Maintenance", "label_refreshing": "Refreshing", "label_resetting": "Resetting", "label_paused": "Paused" }, "petkit_litterbox_dashboard": { "picture": "Device image URL", "show_name": "Show entity name", "camera_section": "Camera panel", "camera_entity": "Camera entity", "camera_mode": "Camera mode", "camera_mode_snapshot": "Snapshot (latest image)", "camera_mode_stream": "Live stream", "camera_size": "Camera panel width", "sensor_1_section": "Sensor slot 1", "sensor_1_entity": "Entity", "sensor_1_name": "Label override", "sensor_1_icon": "Icon", "sensor_2_section": "Sensor slot 2", "sensor_2_entity": "Entity", "sensor_2_name": "Label override", "sensor_2_icon": "Icon", "sensor_3_section": "Sensor slot 3", "sensor_3_entity": "Entity", "sensor_3_name": "Label override", "sensor_3_icon": "Icon", "sensor_4_section": "Sensor slot 4", "sensor_4_entity": "Entity", "sensor_4_name": "Label override", "sensor_4_icon": "Icon" } }, "form": { "icon_type_picker": { "values": { "default": "Default type", "entity-picture": "Entity picture", "icon": "Icon", "none": "None" } }, "info_picker": { "values": { "default": "Default information", "last-changed": "Last Changed", "last-updated": "Last Updated", "name": "Name", "none": "None", "state": "State" } }, "layout_picker": { "values": { "default": "Default layout", "horizontal": "Horizontal layout", "vertical": "Vertical layout" } } } };
const en = {
  card,
  editor
};
const en$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  card,
  default: en,
  editor
}, Symbol.toStringTag, { value: "Module" }));
const languages = { en: en$1 };
function getTranslation(language) {
  if (language in languages) return languages[language];
  const base = language.split("-")[0];
  return languages[base] ?? languages["en"];
}
function setupCustomlocalize(hass) {
  const language = hass?.locale?.language ?? "en";
  const translation = getTranslation(language);
  return function(key, data) {
    const keys = key.split(".");
    let value = translation;
    for (const k3 of keys) {
      if (value == null || typeof value !== "object") {
        value = void 0;
        break;
      }
      value = value[k3];
    }
    if (value === void 0 && language !== "en") {
      let fallback = languages["en"];
      for (const k3 of keys) {
        if (fallback == null || typeof fallback !== "object") {
          fallback = void 0;
          break;
        }
        fallback = fallback[k3];
      }
      value = fallback;
    }
    if (typeof value !== "string") return key;
    if (!data) return value;
    try {
      return new IntlMessageFormat(value, language).format(data);
    } catch {
      return value;
    }
  };
}
const strAnimations = {
  pulse: `@keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }`,
  spin: `@keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }`,
  cleaning: `@keyframes cleaning {
        0% {
            transform: rotate(0) translate(0);
        }
        5% {
            transform: rotate(0) translate(0, -3px);
        }
        10% {
            transform: rotate(0) translate(0, 1px);
        }
        15% {
            transform: rotate(0) translate(0);
        }

        20% {
            transform: rotate(30deg) translate(0);
        }
        25% {
            transform: rotate(30deg) translate(0, -3px);
        }
        30% {
            transform: rotate(30deg) translate(0, 1px);
        }
        35% {
            transform: rotate(30deg) translate(0);
        }
        40% {
            transform: rotate(0) translate(0);
        }

        45% {
            transform: rotate(-30deg) translate(0);
        }
        50% {
            transform: rotate(-30deg) translate(0, -3px);
        }
        55% {
            transform: rotate(-30deg) translate(0, 1px);
        }
        60% {
            transform: rotate(-30deg) translate(0);
        }
        70% {
            transform: rotate(0deg) translate(0);
        }
        100% {
            transform: rotate(0deg);
        }
    }`,
  returning: `@keyframes returning {
        0% {
            transform: rotate(0);
        }
        25% {
            transform: rotate(20deg);
        }
        50% {
            transform: rotate(0);
        }
        75% {
            transform: rotate(-20deg);
        }
        100% {
            transform: rotate(0);
        }
    }`
};
({
  pulse: i$5`
    ${r$4(strAnimations.pulse)}
  `,
  spin: i$5`
    ${r$4(strAnimations.spin)}
  `,
  cleaning: i$5`
    ${r$4(strAnimations.cleaning)}
  `,
  returning: i$5`
    ${r$4(strAnimations.returning)}
  `
});
const animations = i$5`
  ${r$4(Object.values(strAnimations).join("\n"))}
`;
const parseNumber = (color, len) => {
  if (typeof color !== "number") return;
  if (len === 3) {
    return {
      mode: "rgb",
      r: (color >> 8 & 15 | color >> 4 & 240) / 255,
      g: (color >> 4 & 15 | color & 240) / 255,
      b: (color & 15 | color << 4 & 240) / 255
    };
  }
  if (len === 4) {
    return {
      mode: "rgb",
      r: (color >> 12 & 15 | color >> 8 & 240) / 255,
      g: (color >> 8 & 15 | color >> 4 & 240) / 255,
      b: (color >> 4 & 15 | color & 240) / 255,
      alpha: (color & 15 | color << 4 & 240) / 255
    };
  }
  if (len === 6) {
    return {
      mode: "rgb",
      r: (color >> 16 & 255) / 255,
      g: (color >> 8 & 255) / 255,
      b: (color & 255) / 255
    };
  }
  if (len === 8) {
    return {
      mode: "rgb",
      r: (color >> 24 & 255) / 255,
      g: (color >> 16 & 255) / 255,
      b: (color >> 8 & 255) / 255,
      alpha: (color & 255) / 255
    };
  }
};
const named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  // Added in CSS Colors Level 4:
  // https://drafts.csswg.org/css-color/#changes-from-3
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
const parseNamed = (color) => {
  return parseNumber(named[color.toLowerCase()], 6);
};
const hex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;
const parseHex = (color) => {
  let match;
  return (match = color.match(hex)) ? parseNumber(parseInt(match[1], 16), match[1].length) : void 0;
};
const num$1 = "([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)";
const per = `${num$1}%`;
const num_per = `(?:${num$1}%|${num$1})`;
const hue$1 = `(?:${num$1}(deg|grad|rad|turn)|${num$1})`;
const c = `\\s*,\\s*`;
const rgb_num_old = new RegExp(
  `^rgba?\\(\\s*${num$1}${c}${num$1}${c}${num$1}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
);
const rgb_per_old = new RegExp(
  `^rgba?\\(\\s*${per}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
);
const parseRgbLegacy = (color) => {
  let res = { mode: "rgb" };
  let match;
  if (match = color.match(rgb_num_old)) {
    if (match[1] !== void 0) {
      res.r = match[1] / 255;
    }
    if (match[2] !== void 0) {
      res.g = match[2] / 255;
    }
    if (match[3] !== void 0) {
      res.b = match[3] / 255;
    }
  } else if (match = color.match(rgb_per_old)) {
    if (match[1] !== void 0) {
      res.r = match[1] / 100;
    }
    if (match[2] !== void 0) {
      res.g = match[2] / 100;
    }
    if (match[3] !== void 0) {
      res.b = match[3] / 100;
    }
  } else {
    return void 0;
  }
  if (match[4] !== void 0) {
    res.alpha = Math.max(0, Math.min(1, match[4] / 100));
  } else if (match[5] !== void 0) {
    res.alpha = Math.max(0, Math.min(1, +match[5]));
  }
  return res;
};
const prepare = (color, mode) => color === void 0 ? void 0 : typeof color !== "object" ? parse(color) : color.mode !== void 0 ? color : mode ? { ...color, mode } : void 0;
const converter = (target_mode = "rgb") => (color) => (color = prepare(color, target_mode)) !== void 0 ? (
  // if the color's mode corresponds to our target mode
  color.mode === target_mode ? (
    // then just return the color
    color
  ) : (
    // otherwise check to see if we have a dedicated
    // converter for the target mode
    converters[color.mode][target_mode] ? (
      // and return its result...
      converters[color.mode][target_mode](color)
    ) : (
      // ...otherwise pass through RGB as an intermediary step.
      // if the target mode is RGB...
      target_mode === "rgb" ? (
        // just return the RGB
        converters[color.mode].rgb(color)
      ) : (
        // otherwise convert color.mode -> RGB -> target_mode
        converters.rgb[target_mode](converters[color.mode].rgb(color))
      )
    )
  )
) : void 0;
const converters = {};
const modes = {};
const parsers = [];
const colorProfiles = {};
const identity = (v2) => v2;
const useMode = (definition2) => {
  converters[definition2.mode] = {
    ...converters[definition2.mode],
    ...definition2.toMode
  };
  Object.keys(definition2.fromMode || {}).forEach((k3) => {
    if (!converters[k3]) {
      converters[k3] = {};
    }
    converters[k3][definition2.mode] = definition2.fromMode[k3];
  });
  if (!definition2.ranges) {
    definition2.ranges = {};
  }
  if (!definition2.difference) {
    definition2.difference = {};
  }
  definition2.channels.forEach((channel) => {
    if (definition2.ranges[channel] === void 0) {
      definition2.ranges[channel] = [0, 1];
    }
    if (!definition2.interpolate[channel]) {
      throw new Error(`Missing interpolator for: ${channel}`);
    }
    if (typeof definition2.interpolate[channel] === "function") {
      definition2.interpolate[channel] = {
        use: definition2.interpolate[channel]
      };
    }
    if (!definition2.interpolate[channel].fixup) {
      definition2.interpolate[channel].fixup = identity;
    }
  });
  modes[definition2.mode] = definition2;
  (definition2.parse || []).forEach((parser) => {
    useParser(parser, definition2.mode);
  });
  return converter(definition2.mode);
};
const getMode = (mode) => modes[mode];
const useParser = (parser, mode) => {
  if (typeof parser === "string") {
    if (!mode) {
      throw new Error(`'mode' required when 'parser' is a string`);
    }
    colorProfiles[parser] = mode;
  } else if (typeof parser === "function") {
    if (parsers.indexOf(parser) < 0) {
      parsers.push(parser);
    }
  }
};
const IdentStartCodePoint = /[^\x00-\x7F]|[a-zA-Z_]/;
const IdentCodePoint = /[^\x00-\x7F]|[-\w]/;
const Tok = {
  Function: "function",
  Ident: "ident",
  Number: "number",
  Percentage: "percentage",
  ParenClose: ")",
  None: "none",
  Hue: "hue",
  Alpha: "alpha"
};
let _i = 0;
function is_num(chars) {
  let ch = chars[_i];
  let ch1 = chars[_i + 1];
  if (ch === "-" || ch === "+") {
    return /\d/.test(ch1) || ch1 === "." && /\d/.test(chars[_i + 2]);
  }
  if (ch === ".") {
    return /\d/.test(ch1);
  }
  return /\d/.test(ch);
}
function is_ident(chars) {
  if (_i >= chars.length) {
    return false;
  }
  let ch = chars[_i];
  if (IdentStartCodePoint.test(ch)) {
    return true;
  }
  if (ch === "-") {
    if (chars.length - _i < 2) {
      return false;
    }
    let ch1 = chars[_i + 1];
    if (ch1 === "-" || IdentStartCodePoint.test(ch1)) {
      return true;
    }
    return false;
  }
  return false;
}
const huenits = {
  deg: 1,
  rad: 180 / Math.PI,
  grad: 9 / 10,
  turn: 360
};
function num(chars) {
  let value = "";
  if (chars[_i] === "-" || chars[_i] === "+") {
    value += chars[_i++];
  }
  value += digits(chars);
  if (chars[_i] === "." && /\d/.test(chars[_i + 1])) {
    value += chars[_i++] + digits(chars);
  }
  if (chars[_i] === "e" || chars[_i] === "E") {
    if ((chars[_i + 1] === "-" || chars[_i + 1] === "+") && /\d/.test(chars[_i + 2])) {
      value += chars[_i++] + chars[_i++] + digits(chars);
    } else if (/\d/.test(chars[_i + 1])) {
      value += chars[_i++] + digits(chars);
    }
  }
  if (is_ident(chars)) {
    let id = ident(chars);
    if (id === "deg" || id === "rad" || id === "turn" || id === "grad") {
      return { type: Tok.Hue, value: value * huenits[id] };
    }
    return void 0;
  }
  if (chars[_i] === "%") {
    _i++;
    return { type: Tok.Percentage, value: +value };
  }
  return { type: Tok.Number, value: +value };
}
function digits(chars) {
  let v2 = "";
  while (/\d/.test(chars[_i])) {
    v2 += chars[_i++];
  }
  return v2;
}
function ident(chars) {
  let v2 = "";
  while (_i < chars.length && IdentCodePoint.test(chars[_i])) {
    v2 += chars[_i++];
  }
  return v2;
}
function identlike(chars) {
  let v2 = ident(chars);
  if (chars[_i] === "(") {
    _i++;
    return { type: Tok.Function, value: v2 };
  }
  if (v2 === "none") {
    return { type: Tok.None, value: void 0 };
  }
  return { type: Tok.Ident, value: v2 };
}
function tokenize(str = "") {
  let chars = str.trim();
  let tokens = [];
  let ch;
  _i = 0;
  while (_i < chars.length) {
    ch = chars[_i++];
    if (ch === "\n" || ch === "	" || ch === " ") {
      while (_i < chars.length && (chars[_i] === "\n" || chars[_i] === "	" || chars[_i] === " ")) {
        _i++;
      }
      continue;
    }
    if (ch === ",") {
      return void 0;
    }
    if (ch === ")") {
      tokens.push({ type: Tok.ParenClose });
      continue;
    }
    if (ch === "+") {
      _i--;
      if (is_num(chars)) {
        tokens.push(num(chars));
        continue;
      }
      return void 0;
    }
    if (ch === "-") {
      _i--;
      if (is_num(chars)) {
        tokens.push(num(chars));
        continue;
      }
      if (is_ident(chars)) {
        tokens.push({ type: Tok.Ident, value: ident(chars) });
        continue;
      }
      return void 0;
    }
    if (ch === ".") {
      _i--;
      if (is_num(chars)) {
        tokens.push(num(chars));
        continue;
      }
      return void 0;
    }
    if (ch === "/") {
      while (_i < chars.length && (chars[_i] === "\n" || chars[_i] === "	" || chars[_i] === " ")) {
        _i++;
      }
      let alpha;
      if (is_num(chars)) {
        alpha = num(chars);
        if (alpha.type !== Tok.Hue) {
          tokens.push({ type: Tok.Alpha, value: alpha });
          continue;
        }
      }
      if (is_ident(chars)) {
        if (ident(chars) === "none") {
          tokens.push({
            type: Tok.Alpha,
            value: { type: Tok.None, value: void 0 }
          });
          continue;
        }
      }
      return void 0;
    }
    if (/\d/.test(ch)) {
      _i--;
      tokens.push(num(chars));
      continue;
    }
    if (IdentStartCodePoint.test(ch)) {
      _i--;
      tokens.push(identlike(chars));
      continue;
    }
    return void 0;
  }
  return tokens;
}
function parseColorSyntax(tokens) {
  tokens._i = 0;
  let token = tokens[tokens._i++];
  if (!token || token.type !== Tok.Function || token.value !== "color") {
    return void 0;
  }
  token = tokens[tokens._i++];
  if (token.type !== Tok.Ident) {
    return void 0;
  }
  const mode = colorProfiles[token.value];
  if (!mode) {
    return void 0;
  }
  const res = { mode };
  const coords = consumeCoords(tokens, false);
  if (!coords) {
    return void 0;
  }
  const channels = getMode(mode).channels;
  for (let ii = 0, c2, ch; ii < channels.length; ii++) {
    c2 = coords[ii];
    ch = channels[ii];
    if (c2.type !== Tok.None) {
      res[ch] = c2.type === Tok.Number ? c2.value : c2.value / 100;
      if (ch === "alpha") {
        res[ch] = Math.max(0, Math.min(1, res[ch]));
      }
    }
  }
  return res;
}
function consumeCoords(tokens, includeHue) {
  const coords = [];
  let token;
  while (tokens._i < tokens.length) {
    token = tokens[tokens._i++];
    if (token.type === Tok.None || token.type === Tok.Number || token.type === Tok.Alpha || token.type === Tok.Percentage || includeHue && token.type === Tok.Hue) {
      coords.push(token);
      continue;
    }
    if (token.type === Tok.ParenClose) {
      if (tokens._i < tokens.length) {
        return void 0;
      }
      continue;
    }
    return void 0;
  }
  if (coords.length < 3 || coords.length > 4) {
    return void 0;
  }
  if (coords.length === 4) {
    if (coords[3].type !== Tok.Alpha) {
      return void 0;
    }
    coords[3] = coords[3].value;
  }
  if (coords.length === 3) {
    coords.push({ type: Tok.None, value: void 0 });
  }
  return coords.every((c2) => c2.type !== Tok.Alpha) ? coords : void 0;
}
function parseModernSyntax(tokens, includeHue) {
  tokens._i = 0;
  let token = tokens[tokens._i++];
  if (!token || token.type !== Tok.Function) {
    return void 0;
  }
  let coords = consumeCoords(tokens, includeHue);
  if (!coords) {
    return void 0;
  }
  coords.unshift(token.value);
  return coords;
}
const parse = (color) => {
  if (typeof color !== "string") {
    return void 0;
  }
  const tokens = tokenize(color);
  const parsed = tokens ? parseModernSyntax(tokens, true) : void 0;
  let result = void 0;
  let i4 = 0;
  let len = parsers.length;
  while (i4 < len) {
    if ((result = parsers[i4++](color, parsed)) !== void 0) {
      return result;
    }
  }
  return tokens ? parseColorSyntax(tokens) : void 0;
};
function parseRgb(color, parsed) {
  if (!parsed || parsed[0] !== "rgb" && parsed[0] !== "rgba") {
    return void 0;
  }
  const res = { mode: "rgb" };
  const [, r2, g2, b2, alpha] = parsed;
  if (r2.type === Tok.Hue || g2.type === Tok.Hue || b2.type === Tok.Hue) {
    return void 0;
  }
  if (r2.type !== Tok.None) {
    res.r = r2.type === Tok.Number ? r2.value / 255 : r2.value / 100;
  }
  if (g2.type !== Tok.None) {
    res.g = g2.type === Tok.Number ? g2.value / 255 : g2.value / 100;
  }
  if (b2.type !== Tok.None) {
    res.b = b2.type === Tok.Number ? b2.value / 255 : b2.value / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
const parseTransparent = (c2) => c2 === "transparent" ? { mode: "rgb", r: 0, g: 0, b: 0, alpha: 0 } : void 0;
const lerp = (a2, b2, t2) => a2 + t2 * (b2 - a2);
const get_classes = (arr) => {
  let classes = [];
  for (let i4 = 0; i4 < arr.length - 1; i4++) {
    let a2 = arr[i4];
    let b2 = arr[i4 + 1];
    if (a2 === void 0 && b2 === void 0) {
      classes.push(void 0);
    } else if (a2 !== void 0 && b2 !== void 0) {
      classes.push([a2, b2]);
    } else {
      classes.push(a2 !== void 0 ? [a2, a2] : [b2, b2]);
    }
  }
  return classes;
};
const interpolatorPiecewise = (interpolator) => (arr) => {
  let classes = get_classes(arr);
  return (t2) => {
    let cls = t2 * classes.length;
    let idx = t2 >= 1 ? classes.length - 1 : Math.max(Math.floor(cls), 0);
    let pair = classes[idx];
    return pair === void 0 ? void 0 : interpolator(pair[0], pair[1], cls - idx);
  };
};
const interpolatorLinear = interpolatorPiecewise(lerp);
const fixupAlpha = (arr) => {
  let some_defined = false;
  let res = arr.map((v2) => {
    if (v2 !== void 0) {
      some_defined = true;
      return v2;
    }
    return 1;
  });
  return some_defined ? res : arr;
};
const definition$r = {
  mode: "rgb",
  channels: ["r", "g", "b", "alpha"],
  parse: [
    parseRgb,
    parseHex,
    parseRgbLegacy,
    parseNamed,
    parseTransparent,
    "srgb"
  ],
  serialize: "srgb",
  interpolate: {
    r: interpolatorLinear,
    g: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  gamut: true,
  white: { r: 1, g: 1, b: 1 },
  black: { r: 0, g: 0, b: 0 }
};
const linearize$2 = (v2 = 0) => Math.pow(Math.abs(v2), 563 / 256) * Math.sign(v2);
const convertA98ToXyz65 = (a98) => {
  let r2 = linearize$2(a98.r);
  let g2 = linearize$2(a98.g);
  let b2 = linearize$2(a98.b);
  let res = {
    mode: "xyz65",
    x: 0.5766690429101305 * r2 + 0.1855582379065463 * g2 + 0.1882286462349947 * b2,
    y: 0.297344975250536 * r2 + 0.6273635662554661 * g2 + 0.0752914584939979 * b2,
    z: 0.0270313613864123 * r2 + 0.0706888525358272 * g2 + 0.9913375368376386 * b2
  };
  if (a98.alpha !== void 0) {
    res.alpha = a98.alpha;
  }
  return res;
};
const gamma$2 = (v2) => Math.pow(Math.abs(v2), 256 / 563) * Math.sign(v2);
const convertXyz65ToA98 = ({ x: x2, y: y3, z: z2, alpha }) => {
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (z2 === void 0) z2 = 0;
  let res = {
    mode: "a98",
    r: gamma$2(
      x2 * 2.0415879038107465 - y3 * 0.5650069742788597 - 0.3447313507783297 * z2
    ),
    g: gamma$2(
      x2 * -0.9692436362808798 + y3 * 1.8759675015077206 + 0.0415550574071756 * z2
    ),
    b: gamma$2(
      x2 * 0.0134442806320312 - y3 * 0.1183623922310184 + 1.0151749943912058 * z2
    )
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const fn$3 = (c2 = 0) => {
  const abs2 = Math.abs(c2);
  if (abs2 <= 0.04045) {
    return c2 / 12.92;
  }
  return (Math.sign(c2) || 1) * Math.pow((abs2 + 0.055) / 1.055, 2.4);
};
const convertRgbToLrgb = ({ r: r2, g: g2, b: b2, alpha }) => {
  let res = {
    mode: "lrgb",
    r: fn$3(r2),
    g: fn$3(g2),
    b: fn$3(b2)
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertRgbToXyz65 = (rgb) => {
  let { r: r2, g: g2, b: b2, alpha } = convertRgbToLrgb(rgb);
  let res = {
    mode: "xyz65",
    x: 0.4123907992659593 * r2 + 0.357584339383878 * g2 + 0.1804807884018343 * b2,
    y: 0.2126390058715102 * r2 + 0.715168678767756 * g2 + 0.0721923153607337 * b2,
    z: 0.0193308187155918 * r2 + 0.119194779794626 * g2 + 0.9505321522496607 * b2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const fn$2 = (c2 = 0) => {
  const abs2 = Math.abs(c2);
  if (abs2 > 31308e-7) {
    return (Math.sign(c2) || 1) * (1.055 * Math.pow(abs2, 1 / 2.4) - 0.055);
  }
  return c2 * 12.92;
};
const convertLrgbToRgb = ({ r: r2, g: g2, b: b2, alpha }, mode = "rgb") => {
  let res = {
    mode,
    r: fn$2(r2),
    g: fn$2(g2),
    b: fn$2(b2)
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertXyz65ToRgb = ({ x: x2, y: y3, z: z2, alpha }) => {
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (z2 === void 0) z2 = 0;
  let res = convertLrgbToRgb({
    r: x2 * 3.2409699419045226 - y3 * 1.537383177570094 - 0.4986107602930034 * z2,
    g: x2 * -0.9692436362808796 + y3 * 1.8759675015077204 + 0.0415550574071756 * z2,
    b: x2 * 0.0556300796969936 - y3 * 0.2039769588889765 + 1.0569715142428784 * z2
  });
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const definition$q = {
  ...definition$r,
  mode: "a98",
  parse: ["a98-rgb"],
  serialize: "a98-rgb",
  fromMode: {
    rgb: (color) => convertXyz65ToA98(convertRgbToXyz65(color)),
    xyz65: convertXyz65ToA98
  },
  toMode: {
    rgb: (color) => convertXyz65ToRgb(convertA98ToXyz65(color)),
    xyz65: convertA98ToXyz65
  }
};
const normalizeHue = (hue2) => (hue2 = hue2 % 360) < 0 ? hue2 + 360 : hue2;
const hue = (hues, fn2) => {
  return hues.map((hue2, idx, arr) => {
    if (hue2 === void 0) {
      return hue2;
    }
    let normalized = normalizeHue(hue2);
    if (idx === 0 || hues[idx - 1] === void 0) {
      return normalized;
    }
    return fn2(normalized - normalizeHue(arr[idx - 1]));
  }).reduce((acc, curr) => {
    if (!acc.length || curr === void 0 || acc[acc.length - 1] === void 0) {
      acc.push(curr);
      return acc;
    }
    acc.push(curr + acc[acc.length - 1]);
    return acc;
  }, []);
};
const fixupHueShorter = (arr) => hue(arr, (d2) => Math.abs(d2) <= 180 ? d2 : d2 - 360 * Math.sign(d2));
const M = [-0.14861, 1.78277, -0.29227, -0.90649, 1.97294, 0];
const degToRad = Math.PI / 180;
const radToDeg = 180 / Math.PI;
let DE = M[3] * M[4];
let BE = M[1] * M[4];
let BCAD = M[1] * M[2] - M[0] * M[3];
const convertRgbToCubehelix = ({ r: r2, g: g2, b: b2, alpha }) => {
  if (r2 === void 0) r2 = 0;
  if (g2 === void 0) g2 = 0;
  if (b2 === void 0) b2 = 0;
  let l2 = (BCAD * b2 + r2 * DE - g2 * BE) / (BCAD + DE - BE);
  let x2 = b2 - l2;
  let y3 = (M[4] * (g2 - l2) - M[2] * x2) / M[3];
  let res = {
    mode: "cubehelix",
    l: l2,
    s: l2 === 0 || l2 === 1 ? void 0 : Math.sqrt(x2 * x2 + y3 * y3) / (M[4] * l2 * (1 - l2))
  };
  if (res.s) res.h = Math.atan2(y3, x2) * radToDeg - 120;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertCubehelixToRgb = ({ h: h2, s: s2, l: l2, alpha }) => {
  let res = { mode: "rgb" };
  h2 = (h2 === void 0 ? 0 : h2 + 120) * degToRad;
  if (l2 === void 0) l2 = 0;
  let amp = s2 === void 0 ? 0 : s2 * l2 * (1 - l2);
  let cosh = Math.cos(h2);
  let sinh = Math.sin(h2);
  res.r = l2 + amp * (M[0] * cosh + M[1] * sinh);
  res.g = l2 + amp * (M[2] * cosh + M[3] * sinh);
  res.b = l2 + amp * (M[4] * cosh + M[5] * sinh);
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const differenceHueSaturation = (std, smp) => {
  if (std.h === void 0 || smp.h === void 0 || !std.s || !smp.s) {
    return 0;
  }
  let std_h = normalizeHue(std.h);
  let smp_h = normalizeHue(smp.h);
  let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(std.s * smp.s) * dH;
};
const differenceHueNaive = (std, smp) => {
  if (std.h === void 0 || smp.h === void 0) {
    return 0;
  }
  let std_h = normalizeHue(std.h);
  let smp_h = normalizeHue(smp.h);
  if (Math.abs(smp_h - std_h) > 180) {
    return std_h - (smp_h - 360 * Math.sign(smp_h - std_h));
  }
  return smp_h - std_h;
};
const differenceHueChroma = (std, smp) => {
  if (std.h === void 0 || smp.h === void 0 || !std.c || !smp.c) {
    return 0;
  }
  let std_h = normalizeHue(std.h);
  let smp_h = normalizeHue(smp.h);
  let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
  return 2 * Math.sqrt(std.c * smp.c) * dH;
};
const averageAngle = (val) => {
  let sum = val.reduce(
    (sum2, val2) => {
      if (val2 !== void 0) {
        let rad = val2 * Math.PI / 180;
        sum2.sin += Math.sin(rad);
        sum2.cos += Math.cos(rad);
      }
      return sum2;
    },
    { sin: 0, cos: 0 }
  );
  let angle = Math.atan2(sum.sin, sum.cos) * 180 / Math.PI;
  return angle < 0 ? 360 + angle : angle;
};
const definition$p = {
  mode: "cubehelix",
  channels: ["h", "s", "l", "alpha"],
  parse: ["--cubehelix"],
  serialize: "--cubehelix",
  ranges: {
    h: [0, 360],
    s: [0, 4.614],
    l: [0, 1]
  },
  fromMode: {
    rgb: convertRgbToCubehelix
  },
  toMode: {
    rgb: convertCubehelixToRgb
  },
  interpolate: {
    h: {
      use: interpolatorLinear,
      fixup: fixupHueShorter
    },
    s: interpolatorLinear,
    l: interpolatorLinear,
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha
    }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
const convertLabToLch = ({ l: l2, a: a2, b: b2, alpha }, mode = "lch") => {
  if (a2 === void 0) a2 = 0;
  if (b2 === void 0) b2 = 0;
  let c2 = Math.sqrt(a2 * a2 + b2 * b2);
  let res = { mode, l: l2, c: c2 };
  if (c2) res.h = normalizeHue(Math.atan2(b2, a2) * 180 / Math.PI);
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertLchToLab = ({ l: l2, c: c2, h: h2, alpha }, mode = "lab") => {
  if (h2 === void 0) h2 = 0;
  let res = {
    mode,
    l: l2,
    a: c2 ? c2 * Math.cos(h2 / 180 * Math.PI) : 0,
    b: c2 ? c2 * Math.sin(h2 / 180 * Math.PI) : 0
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const k$1 = Math.pow(29, 3) / Math.pow(3, 3);
const e$1 = Math.pow(6, 3) / Math.pow(29, 3);
const D50 = {
  X: 0.3457 / 0.3585,
  Y: 1,
  Z: (1 - 0.3457 - 0.3585) / 0.3585
};
const D65 = {
  X: 0.3127 / 0.329,
  Y: 1,
  Z: (1 - 0.3127 - 0.329) / 0.329
};
let fn$1 = (v2) => Math.pow(v2, 3) > e$1 ? Math.pow(v2, 3) : (116 * v2 - 16) / k$1;
const convertLab65ToXyz65 = ({ l: l2, a: a2, b: b2, alpha }) => {
  if (l2 === void 0) l2 = 0;
  if (a2 === void 0) a2 = 0;
  if (b2 === void 0) b2 = 0;
  let fy = (l2 + 16) / 116;
  let fx = a2 / 500 + fy;
  let fz = fy - b2 / 200;
  let res = {
    mode: "xyz65",
    x: fn$1(fx) * D65.X,
    y: fn$1(fy) * D65.Y,
    z: fn$1(fz) * D65.Z
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertLab65ToRgb = (lab) => convertXyz65ToRgb(convertLab65ToXyz65(lab));
const f$1 = (value) => value > e$1 ? Math.cbrt(value) : (k$1 * value + 16) / 116;
const convertXyz65ToLab65 = ({ x: x2, y: y3, z: z2, alpha }) => {
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (z2 === void 0) z2 = 0;
  let f0 = f$1(x2 / D65.X);
  let f1 = f$1(y3 / D65.Y);
  let f2 = f$1(z2 / D65.Z);
  let res = {
    mode: "lab65",
    l: 116 * f1 - 16,
    a: 500 * (f0 - f1),
    b: 200 * (f1 - f2)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertRgbToLab65 = (rgb) => {
  let res = convertXyz65ToLab65(convertRgbToXyz65(rgb));
  if (rgb.r === rgb.b && rgb.b === rgb.g) {
    res.a = res.b = 0;
  }
  return res;
};
const kE = 1;
const kCH = 1;
const θ = 26 / 180 * Math.PI;
const cosθ = Math.cos(θ);
const sinθ = Math.sin(θ);
const factor = 100 / Math.log(139 / 100);
const convertDlchToLab65 = ({ l: l2, c: c2, h: h2, alpha }) => {
  if (l2 === void 0) l2 = 0;
  if (c2 === void 0) c2 = 0;
  if (h2 === void 0) h2 = 0;
  let res = {
    mode: "lab65",
    l: (Math.exp(l2 * kE / factor) - 1) / 39e-4
  };
  let G = (Math.exp(0.0435 * c2 * kCH * kE) - 1) / 0.075;
  let e2 = G * Math.cos(h2 / 180 * Math.PI - θ);
  let f2 = G * Math.sin(h2 / 180 * Math.PI - θ);
  res.a = e2 * cosθ - f2 / 0.83 * sinθ;
  res.b = e2 * sinθ + f2 / 0.83 * cosθ;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertLab65ToDlch = ({ l: l2, a: a2, b: b2, alpha }) => {
  if (l2 === void 0) l2 = 0;
  if (a2 === void 0) a2 = 0;
  if (b2 === void 0) b2 = 0;
  let e2 = a2 * cosθ + b2 * sinθ;
  let f2 = 0.83 * (b2 * cosθ - a2 * sinθ);
  let G = Math.sqrt(e2 * e2 + f2 * f2);
  let res = {
    mode: "dlch",
    l: factor / kE * Math.log(1 + 39e-4 * l2),
    c: Math.log(1 + 0.075 * G) / (0.0435 * kCH * kE)
  };
  if (res.c) {
    res.h = normalizeHue((Math.atan2(f2, e2) + θ) / Math.PI * 180);
  }
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertDlabToLab65 = (c2) => convertDlchToLab65(convertLabToLch(c2, "dlch"));
const convertLab65ToDlab = (c2) => convertLchToLab(convertLab65ToDlch(c2), "dlab");
const definition$o = {
  mode: "dlab",
  parse: ["--din99o-lab"],
  serialize: "--din99o-lab",
  toMode: {
    lab65: convertDlabToLab65,
    rgb: (c2) => convertLab65ToRgb(convertDlabToLab65(c2))
  },
  fromMode: {
    lab65: convertLab65ToDlab,
    rgb: (c2) => convertLab65ToDlab(convertRgbToLab65(c2))
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-40.09, 45.501],
    b: [-40.469, 44.344]
  },
  interpolate: {
    l: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha
    }
  }
};
const definition$n = {
  mode: "dlch",
  parse: ["--din99o-lch"],
  serialize: "--din99o-lch",
  toMode: {
    lab65: convertDlchToLab65,
    dlab: (c2) => convertLchToLab(c2, "dlab"),
    rgb: (c2) => convertLab65ToRgb(convertDlchToLab65(c2))
  },
  fromMode: {
    lab65: convertLab65ToDlch,
    dlab: (c2) => convertLabToLch(c2, "dlch"),
    rgb: (c2) => convertLab65ToDlch(convertRgbToLab65(c2))
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 51.484],
    h: [0, 360]
  },
  interpolate: {
    l: interpolatorLinear,
    c: interpolatorLinear,
    h: {
      use: interpolatorLinear,
      fixup: fixupHueShorter
    },
    alpha: {
      use: interpolatorLinear,
      fixup: fixupAlpha
    }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
function convertHsiToRgb({ h: h2, s: s2, i: i4, alpha }) {
  h2 = normalizeHue(h2 !== void 0 ? h2 : 0);
  if (s2 === void 0) s2 = 0;
  if (i4 === void 0) i4 = 0;
  let f2 = Math.abs(h2 / 60 % 2 - 1);
  let res;
  switch (Math.floor(h2 / 60)) {
    case 0:
      res = {
        r: i4 * (1 + s2 * (3 / (2 - f2) - 1)),
        g: i4 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1)),
        b: i4 * (1 - s2)
      };
      break;
    case 1:
      res = {
        r: i4 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1)),
        g: i4 * (1 + s2 * (3 / (2 - f2) - 1)),
        b: i4 * (1 - s2)
      };
      break;
    case 2:
      res = {
        r: i4 * (1 - s2),
        g: i4 * (1 + s2 * (3 / (2 - f2) - 1)),
        b: i4 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1))
      };
      break;
    case 3:
      res = {
        r: i4 * (1 - s2),
        g: i4 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1)),
        b: i4 * (1 + s2 * (3 / (2 - f2) - 1))
      };
      break;
    case 4:
      res = {
        r: i4 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1)),
        g: i4 * (1 - s2),
        b: i4 * (1 + s2 * (3 / (2 - f2) - 1))
      };
      break;
    case 5:
      res = {
        r: i4 * (1 + s2 * (3 / (2 - f2) - 1)),
        g: i4 * (1 - s2),
        b: i4 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1))
      };
      break;
    default:
      res = { r: i4 * (1 - s2), g: i4 * (1 - s2), b: i4 * (1 - s2) };
  }
  res.mode = "rgb";
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
function convertRgbToHsi({ r: r2, g: g2, b: b2, alpha }) {
  if (r2 === void 0) r2 = 0;
  if (g2 === void 0) g2 = 0;
  if (b2 === void 0) b2 = 0;
  let M3 = Math.max(r2, g2, b2), m2 = Math.min(r2, g2, b2);
  let res = {
    mode: "hsi",
    s: r2 + g2 + b2 === 0 ? 0 : 1 - 3 * m2 / (r2 + g2 + b2),
    i: (r2 + g2 + b2) / 3
  };
  if (M3 - m2 !== 0)
    res.h = (M3 === r2 ? (g2 - b2) / (M3 - m2) + (g2 < b2) * 6 : M3 === g2 ? (b2 - r2) / (M3 - m2) + 2 : (r2 - g2) / (M3 - m2) + 4) * 60;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
const definition$m = {
  mode: "hsi",
  toMode: {
    rgb: convertHsiToRgb
  },
  parse: ["--hsi"],
  serialize: "--hsi",
  fromMode: {
    rgb: convertRgbToHsi
  },
  channels: ["h", "s", "i", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    i: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
function convertHslToRgb({ h: h2, s: s2, l: l2, alpha }) {
  h2 = normalizeHue(h2 !== void 0 ? h2 : 0);
  if (s2 === void 0) s2 = 0;
  if (l2 === void 0) l2 = 0;
  let m1 = l2 + s2 * (l2 < 0.5 ? l2 : 1 - l2);
  let m2 = m1 - (m1 - l2) * 2 * Math.abs(h2 / 60 % 2 - 1);
  let res;
  switch (Math.floor(h2 / 60)) {
    case 0:
      res = { r: m1, g: m2, b: 2 * l2 - m1 };
      break;
    case 1:
      res = { r: m2, g: m1, b: 2 * l2 - m1 };
      break;
    case 2:
      res = { r: 2 * l2 - m1, g: m1, b: m2 };
      break;
    case 3:
      res = { r: 2 * l2 - m1, g: m2, b: m1 };
      break;
    case 4:
      res = { r: m2, g: 2 * l2 - m1, b: m1 };
      break;
    case 5:
      res = { r: m1, g: 2 * l2 - m1, b: m2 };
      break;
    default:
      res = { r: 2 * l2 - m1, g: 2 * l2 - m1, b: 2 * l2 - m1 };
  }
  res.mode = "rgb";
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
function convertRgbToHsl({ r: r2, g: g2, b: b2, alpha }) {
  if (r2 === void 0) r2 = 0;
  if (g2 === void 0) g2 = 0;
  if (b2 === void 0) b2 = 0;
  let M3 = Math.max(r2, g2, b2), m2 = Math.min(r2, g2, b2);
  let res = {
    mode: "hsl",
    s: M3 === m2 ? 0 : (M3 - m2) / (1 - Math.abs(M3 + m2 - 1)),
    l: 0.5 * (M3 + m2)
  };
  if (M3 - m2 !== 0)
    res.h = (M3 === r2 ? (g2 - b2) / (M3 - m2) + (g2 < b2) * 6 : M3 === g2 ? (b2 - r2) / (M3 - m2) + 2 : (r2 - g2) / (M3 - m2) + 4) * 60;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
const hueToDeg = (val, unit) => {
  switch (unit) {
    case "deg":
      return +val;
    case "rad":
      return val / Math.PI * 180;
    case "grad":
      return val / 10 * 9;
    case "turn":
      return val * 360;
  }
};
const hsl_old = new RegExp(
  `^hsla?\\(\\s*${hue$1}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
);
const parseHslLegacy = (color) => {
  let match = color.match(hsl_old);
  if (!match) return;
  let res = { mode: "hsl" };
  if (match[3] !== void 0) {
    res.h = +match[3];
  } else if (match[1] !== void 0 && match[2] !== void 0) {
    res.h = hueToDeg(match[1], match[2]);
  }
  if (match[4] !== void 0) {
    res.s = Math.min(Math.max(0, match[4] / 100), 1);
  }
  if (match[5] !== void 0) {
    res.l = Math.min(Math.max(0, match[5] / 100), 1);
  }
  if (match[6] !== void 0) {
    res.alpha = Math.max(0, Math.min(1, match[6] / 100));
  } else if (match[7] !== void 0) {
    res.alpha = Math.max(0, Math.min(1, +match[7]));
  }
  return res;
};
function parseHsl(color, parsed) {
  if (!parsed || parsed[0] !== "hsl" && parsed[0] !== "hsla") {
    return void 0;
  }
  const res = { mode: "hsl" };
  const [, h2, s2, l2, alpha] = parsed;
  if (h2.type !== Tok.None) {
    if (h2.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h2.value;
  }
  if (s2.type !== Tok.None) {
    if (s2.type === Tok.Hue) {
      return void 0;
    }
    res.s = s2.value / 100;
  }
  if (l2.type !== Tok.None) {
    if (l2.type === Tok.Hue) {
      return void 0;
    }
    res.l = l2.value / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
const definition$l = {
  mode: "hsl",
  toMode: {
    rgb: convertHslToRgb
  },
  fromMode: {
    rgb: convertRgbToHsl
  },
  channels: ["h", "s", "l", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [parseHsl, parseHslLegacy],
  serialize: (c2) => `hsl(${c2.h !== void 0 ? c2.h : "none"} ${c2.s !== void 0 ? c2.s * 100 + "%" : "none"} ${c2.l !== void 0 ? c2.l * 100 + "%" : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
function convertHsvToRgb({ h: h2, s: s2, v: v2, alpha }) {
  h2 = normalizeHue(h2 !== void 0 ? h2 : 0);
  if (s2 === void 0) s2 = 0;
  if (v2 === void 0) v2 = 0;
  let f2 = Math.abs(h2 / 60 % 2 - 1);
  let res;
  switch (Math.floor(h2 / 60)) {
    case 0:
      res = { r: v2, g: v2 * (1 - s2 * f2), b: v2 * (1 - s2) };
      break;
    case 1:
      res = { r: v2 * (1 - s2 * f2), g: v2, b: v2 * (1 - s2) };
      break;
    case 2:
      res = { r: v2 * (1 - s2), g: v2, b: v2 * (1 - s2 * f2) };
      break;
    case 3:
      res = { r: v2 * (1 - s2), g: v2 * (1 - s2 * f2), b: v2 };
      break;
    case 4:
      res = { r: v2 * (1 - s2 * f2), g: v2 * (1 - s2), b: v2 };
      break;
    case 5:
      res = { r: v2, g: v2 * (1 - s2), b: v2 * (1 - s2 * f2) };
      break;
    default:
      res = { r: v2 * (1 - s2), g: v2 * (1 - s2), b: v2 * (1 - s2) };
  }
  res.mode = "rgb";
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
function convertRgbToHsv({ r: r2, g: g2, b: b2, alpha }) {
  if (r2 === void 0) r2 = 0;
  if (g2 === void 0) g2 = 0;
  if (b2 === void 0) b2 = 0;
  let M3 = Math.max(r2, g2, b2), m2 = Math.min(r2, g2, b2);
  let res = {
    mode: "hsv",
    s: M3 === 0 ? 0 : 1 - m2 / M3,
    v: M3
  };
  if (M3 - m2 !== 0)
    res.h = (M3 === r2 ? (g2 - b2) / (M3 - m2) + (g2 < b2) * 6 : M3 === g2 ? (b2 - r2) / (M3 - m2) + 2 : (r2 - g2) / (M3 - m2) + 4) * 60;
  if (alpha !== void 0) res.alpha = alpha;
  return res;
}
const definition$k = {
  mode: "hsv",
  toMode: {
    rgb: convertHsvToRgb
  },
  parse: ["--hsv"],
  serialize: "--hsv",
  fromMode: {
    rgb: convertRgbToHsv
  },
  channels: ["h", "s", "v", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    s: interpolatorLinear,
    v: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueSaturation
  },
  average: {
    h: averageAngle
  }
};
function convertHwbToRgb({ h: h2, w, b: b2, alpha }) {
  if (w === void 0) w = 0;
  if (b2 === void 0) b2 = 0;
  if (w + b2 > 1) {
    let s2 = w + b2;
    w /= s2;
    b2 /= s2;
  }
  return convertHsvToRgb({
    h: h2,
    s: b2 === 1 ? 1 : 1 - w / (1 - b2),
    v: 1 - b2,
    alpha
  });
}
function convertRgbToHwb(rgba) {
  let hsv = convertRgbToHsv(rgba);
  if (hsv === void 0) return void 0;
  let s2 = hsv.s !== void 0 ? hsv.s : 0;
  let v2 = hsv.v !== void 0 ? hsv.v : 0;
  let res = {
    mode: "hwb",
    w: (1 - s2) * v2,
    b: 1 - v2
  };
  if (hsv.h !== void 0) res.h = hsv.h;
  if (hsv.alpha !== void 0) res.alpha = hsv.alpha;
  return res;
}
function ParseHwb(color, parsed) {
  if (!parsed || parsed[0] !== "hwb") {
    return void 0;
  }
  const res = { mode: "hwb" };
  const [, h2, w, b2, alpha] = parsed;
  if (h2.type !== Tok.None) {
    if (h2.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h2.value;
  }
  if (w.type !== Tok.None) {
    if (w.type === Tok.Hue) {
      return void 0;
    }
    res.w = w.value / 100;
  }
  if (b2.type !== Tok.None) {
    if (b2.type === Tok.Hue) {
      return void 0;
    }
    res.b = b2.value / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
const definition$j = {
  mode: "hwb",
  toMode: {
    rgb: convertHwbToRgb
  },
  fromMode: {
    rgb: convertRgbToHwb
  },
  channels: ["h", "w", "b", "alpha"],
  ranges: {
    h: [0, 360]
  },
  gamut: "rgb",
  parse: [ParseHwb],
  serialize: (c2) => `hwb(${c2.h !== void 0 ? c2.h : "none"} ${c2.w !== void 0 ? c2.w * 100 + "%" : "none"} ${c2.b !== void 0 ? c2.b * 100 + "%" : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    w: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueNaive
  },
  average: {
    h: averageAngle
  }
};
const YW = 203;
const M1 = 0.1593017578125;
const M2 = 78.84375;
const C1 = 0.8359375;
const C2 = 18.8515625;
const C3 = 18.6875;
function transferPqDecode(v2) {
  if (v2 < 0) return 0;
  const c2 = Math.pow(v2, 1 / M2);
  return 1e4 * Math.pow(Math.max(0, c2 - C1) / (C2 - C3 * c2), 1 / M1);
}
function transferPqEncode(v2) {
  if (v2 < 0) return 0;
  const c2 = Math.pow(v2 / 1e4, M1);
  return Math.pow((C1 + C2 * c2) / (1 + C3 * c2), M2);
}
const toRel = (c2) => Math.max(c2 / YW, 0);
const convertItpToXyz65 = ({ i: i4, t: t2, p: p2, alpha }) => {
  if (i4 === void 0) i4 = 0;
  if (t2 === void 0) t2 = 0;
  if (p2 === void 0) p2 = 0;
  const l2 = transferPqDecode(
    i4 + 0.008609037037932761 * t2 + 0.11102962500302593 * p2
  );
  const m2 = transferPqDecode(
    i4 - 0.00860903703793275 * t2 - 0.11102962500302599 * p2
  );
  const s2 = transferPqDecode(
    i4 + 0.5600313357106791 * t2 - 0.32062717498731885 * p2
  );
  const res = {
    mode: "xyz65",
    x: toRel(
      2.070152218389422 * l2 - 1.3263473389671556 * m2 + 0.2066510476294051 * s2
    ),
    y: toRel(
      0.3647385209748074 * l2 + 0.680566024947227 * m2 - 0.0453045459220346 * s2
    ),
    z: toRel(
      -0.049747207535812 * l2 - 0.0492609666966138 * m2 + 1.1880659249923042 * s2
    )
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const toAbs = (c2 = 0) => Math.max(c2 * YW, 0);
const convertXyz65ToItp = ({ x: x2, y: y3, z: z2, alpha }) => {
  const absX = toAbs(x2);
  const absY = toAbs(y3);
  const absZ = toAbs(z2);
  const l2 = transferPqEncode(
    0.3592832590121217 * absX + 0.6976051147779502 * absY - 0.0358915932320289 * absZ
  );
  const m2 = transferPqEncode(
    -0.1920808463704995 * absX + 1.1004767970374323 * absY + 0.0753748658519118 * absZ
  );
  const s2 = transferPqEncode(
    0.0070797844607477 * absX + 0.0748396662186366 * absY + 0.8433265453898765 * absZ
  );
  const i4 = 0.5 * l2 + 0.5 * m2;
  const t2 = 1.61376953125 * l2 - 3.323486328125 * m2 + 1.709716796875 * s2;
  const p2 = 4.378173828125 * l2 - 4.24560546875 * m2 - 0.132568359375 * s2;
  const res = { mode: "itp", i: i4, t: t2, p: p2 };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const definition$i = {
  mode: "itp",
  channels: ["i", "t", "p", "alpha"],
  parse: ["--ictcp"],
  serialize: "--ictcp",
  toMode: {
    xyz65: convertItpToXyz65,
    rgb: (color) => convertXyz65ToRgb(convertItpToXyz65(color))
  },
  fromMode: {
    xyz65: convertXyz65ToItp,
    rgb: (color) => convertXyz65ToItp(convertRgbToXyz65(color))
  },
  ranges: {
    i: [0, 0.581],
    t: [-0.369, 0.272],
    p: [-0.164, 0.331]
  },
  interpolate: {
    i: interpolatorLinear,
    t: interpolatorLinear,
    p: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const p$1 = 134.03437499999998;
const d0$1 = 16295499532821565e-27;
const jabPqEncode = (v2) => {
  if (v2 < 0) return 0;
  let vn2 = Math.pow(v2 / 1e4, M1);
  return Math.pow((C1 + C2 * vn2) / (1 + C3 * vn2), p$1);
};
const abs = (v2 = 0) => Math.max(v2 * 203, 0);
const convertXyz65ToJab = ({ x: x2, y: y3, z: z2, alpha }) => {
  x2 = abs(x2);
  y3 = abs(y3);
  z2 = abs(z2);
  let xp = 1.15 * x2 - 0.15 * z2;
  let yp = 0.66 * y3 + 0.34 * x2;
  let l2 = jabPqEncode(0.41478972 * xp + 0.579999 * yp + 0.014648 * z2);
  let m2 = jabPqEncode(-0.20151 * xp + 1.120649 * yp + 0.0531008 * z2);
  let s2 = jabPqEncode(-0.0166008 * xp + 0.2648 * yp + 0.6684799 * z2);
  let i4 = (l2 + m2) / 2;
  let res = {
    mode: "jab",
    j: 0.44 * i4 / (1 - 0.56 * i4) - d0$1,
    a: 3.524 * l2 - 4.066708 * m2 + 0.542708 * s2,
    b: 0.199076 * l2 + 1.096799 * m2 - 1.295875 * s2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const p = 134.03437499999998;
const d0 = 16295499532821565e-27;
const jabPqDecode = (v2) => {
  if (v2 < 0) return 0;
  let vp = Math.pow(v2, 1 / p);
  return 1e4 * Math.pow((C1 - vp) / (C3 * vp - C2), 1 / M1);
};
const rel = (v2) => v2 / 203;
const convertJabToXyz65 = ({ j, a: a2, b: b2, alpha }) => {
  if (j === void 0) j = 0;
  if (a2 === void 0) a2 = 0;
  if (b2 === void 0) b2 = 0;
  let i4 = (j + d0) / (0.44 + 0.56 * (j + d0));
  let l2 = jabPqDecode(i4 + 0.13860504 * a2 + 0.058047316 * b2);
  let m2 = jabPqDecode(i4 - 0.13860504 * a2 - 0.058047316 * b2);
  let s2 = jabPqDecode(i4 - 0.096019242 * a2 - 0.8118919 * b2);
  let res = {
    mode: "xyz65",
    x: rel(
      1.661373024652174 * l2 - 0.914523081304348 * m2 + 0.23136208173913045 * s2
    ),
    y: rel(
      -0.3250758611844533 * l2 + 1.571847026732543 * m2 - 0.21825383453227928 * s2
    ),
    z: rel(-0.090982811 * l2 - 0.31272829 * m2 + 1.5227666 * s2)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertRgbToJab = (rgb) => {
  let res = convertXyz65ToJab(convertRgbToXyz65(rgb));
  if (rgb.r === rgb.b && rgb.b === rgb.g) {
    res.a = res.b = 0;
  }
  return res;
};
const convertJabToRgb = (color) => convertXyz65ToRgb(convertJabToXyz65(color));
const definition$h = {
  mode: "jab",
  channels: ["j", "a", "b", "alpha"],
  parse: ["--jzazbz"],
  serialize: "--jzazbz",
  fromMode: {
    rgb: convertRgbToJab,
    xyz65: convertXyz65ToJab
  },
  toMode: {
    rgb: convertJabToRgb,
    xyz65: convertJabToXyz65
  },
  ranges: {
    j: [0, 0.222],
    a: [-0.109, 0.129],
    b: [-0.185, 0.134]
  },
  interpolate: {
    j: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const convertJabToJch = ({ j, a: a2, b: b2, alpha }) => {
  if (a2 === void 0) a2 = 0;
  if (b2 === void 0) b2 = 0;
  let c2 = Math.sqrt(a2 * a2 + b2 * b2);
  let res = {
    mode: "jch",
    j,
    c: c2
  };
  if (c2) {
    res.h = normalizeHue(Math.atan2(b2, a2) * 180 / Math.PI);
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertJchToJab = ({ j, c: c2, h: h2, alpha }) => {
  if (h2 === void 0) h2 = 0;
  let res = {
    mode: "jab",
    j,
    a: c2 ? c2 * Math.cos(h2 / 180 * Math.PI) : 0,
    b: c2 ? c2 * Math.sin(h2 / 180 * Math.PI) : 0
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const definition$g = {
  mode: "jch",
  parse: ["--jzczhz"],
  serialize: "--jzczhz",
  toMode: {
    jab: convertJchToJab,
    rgb: (c2) => convertJabToRgb(convertJchToJab(c2))
  },
  fromMode: {
    rgb: (c2) => convertJabToJch(convertRgbToJab(c2)),
    jab: convertJabToJch
  },
  channels: ["j", "c", "h", "alpha"],
  ranges: {
    j: [0, 0.221],
    c: [0, 0.19],
    h: [0, 360]
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    j: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
const k2 = Math.pow(29, 3) / Math.pow(3, 3);
const e = Math.pow(6, 3) / Math.pow(29, 3);
let fn = (v2) => Math.pow(v2, 3) > e ? Math.pow(v2, 3) : (116 * v2 - 16) / k2;
const convertLabToXyz50 = ({ l: l2, a: a2, b: b2, alpha }) => {
  if (l2 === void 0) l2 = 0;
  if (a2 === void 0) a2 = 0;
  if (b2 === void 0) b2 = 0;
  let fy = (l2 + 16) / 116;
  let fx = a2 / 500 + fy;
  let fz = fy - b2 / 200;
  let res = {
    mode: "xyz50",
    x: fn(fx) * D50.X,
    y: fn(fy) * D50.Y,
    z: fn(fz) * D50.Z
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertXyz50ToRgb = ({ x: x2, y: y3, z: z2, alpha }) => {
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (z2 === void 0) z2 = 0;
  let res = convertLrgbToRgb({
    r: x2 * 3.1341359569958707 - y3 * 1.6173863321612538 - 0.4906619460083532 * z2,
    g: x2 * -0.978795502912089 + y3 * 1.916254567259524 + 0.03344273116131949 * z2,
    b: x2 * 0.07195537988411677 - y3 * 0.2289768264158322 + 1.405386058324125 * z2
  });
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertLabToRgb = (lab) => convertXyz50ToRgb(convertLabToXyz50(lab));
const convertRgbToXyz50 = (rgb) => {
  let { r: r2, g: g2, b: b2, alpha } = convertRgbToLrgb(rgb);
  let res = {
    mode: "xyz50",
    x: 0.436065742824811 * r2 + 0.3851514688337912 * g2 + 0.14307845442264197 * b2,
    y: 0.22249319175623702 * r2 + 0.7168870538238823 * g2 + 0.06061979053616537 * b2,
    z: 0.013923904500943465 * r2 + 0.09708128566574634 * g2 + 0.7140993584005155 * b2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const f = (value) => value > e ? Math.cbrt(value) : (k2 * value + 16) / 116;
const convertXyz50ToLab = ({ x: x2, y: y3, z: z2, alpha }) => {
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (z2 === void 0) z2 = 0;
  let f0 = f(x2 / D50.X);
  let f1 = f(y3 / D50.Y);
  let f2 = f(z2 / D50.Z);
  let res = {
    mode: "lab",
    l: 116 * f1 - 16,
    a: 500 * (f0 - f1),
    b: 200 * (f1 - f2)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertRgbToLab = (rgb) => {
  let res = convertXyz50ToLab(convertRgbToXyz50(rgb));
  if (rgb.r === rgb.b && rgb.b === rgb.g) {
    res.a = res.b = 0;
  }
  return res;
};
function parseLab(color, parsed) {
  if (!parsed || parsed[0] !== "lab") {
    return void 0;
  }
  const res = { mode: "lab" };
  const [, l2, a2, b2, alpha] = parsed;
  if (l2.type === Tok.Hue || a2.type === Tok.Hue || b2.type === Tok.Hue) {
    return void 0;
  }
  if (l2.type !== Tok.None) {
    res.l = Math.min(Math.max(0, l2.value), 100);
  }
  if (a2.type !== Tok.None) {
    res.a = a2.type === Tok.Number ? a2.value : a2.value * 125 / 100;
  }
  if (b2.type !== Tok.None) {
    res.b = b2.type === Tok.Number ? b2.value : b2.value * 125 / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
const definition$f = {
  mode: "lab",
  toMode: {
    xyz50: convertLabToXyz50,
    rgb: convertLabToRgb
  },
  fromMode: {
    xyz50: convertXyz50ToLab,
    rgb: convertRgbToLab
  },
  channels: ["l", "a", "b", "alpha"],
  ranges: {
    l: [0, 100],
    a: [-125, 125],
    b: [-125, 125]
  },
  parse: [parseLab],
  serialize: (c2) => `lab(${c2.l !== void 0 ? c2.l : "none"} ${c2.a !== void 0 ? c2.a : "none"} ${c2.b !== void 0 ? c2.b : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
  interpolate: {
    l: interpolatorLinear,
    a: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const definition$e = {
  ...definition$f,
  mode: "lab65",
  parse: ["--lab-d65"],
  serialize: "--lab-d65",
  toMode: {
    xyz65: convertLab65ToXyz65,
    rgb: convertLab65ToRgb
  },
  fromMode: {
    xyz65: convertXyz65ToLab65,
    rgb: convertRgbToLab65
  },
  ranges: {
    l: [0, 100],
    a: [-125, 125],
    b: [-125, 125]
  }
};
function parseLch(color, parsed) {
  if (!parsed || parsed[0] !== "lch") {
    return void 0;
  }
  const res = { mode: "lch" };
  const [, l2, c2, h2, alpha] = parsed;
  if (l2.type !== Tok.None) {
    if (l2.type === Tok.Hue) {
      return void 0;
    }
    res.l = Math.min(Math.max(0, l2.value), 100);
  }
  if (c2.type !== Tok.None) {
    res.c = Math.max(
      0,
      c2.type === Tok.Number ? c2.value : c2.value * 150 / 100
    );
  }
  if (h2.type !== Tok.None) {
    if (h2.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h2.value;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
const definition$d = {
  mode: "lch",
  toMode: {
    lab: convertLchToLab,
    rgb: (c2) => convertLabToRgb(convertLchToLab(c2))
  },
  fromMode: {
    rgb: (c2) => convertLabToLch(convertRgbToLab(c2)),
    lab: convertLabToLch
  },
  channels: ["l", "c", "h", "alpha"],
  ranges: {
    l: [0, 100],
    c: [0, 150],
    h: [0, 360]
  },
  parse: [parseLch],
  serialize: (c2) => `lch(${c2.l !== void 0 ? c2.l : "none"} ${c2.c !== void 0 ? c2.c : "none"} ${c2.h !== void 0 ? c2.h : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
const definition$c = {
  ...definition$d,
  mode: "lch65",
  parse: ["--lch-d65"],
  serialize: "--lch-d65",
  toMode: {
    lab65: (c2) => convertLchToLab(c2, "lab65"),
    rgb: (c2) => convertLab65ToRgb(convertLchToLab(c2, "lab65"))
  },
  fromMode: {
    rgb: (c2) => convertLabToLch(convertRgbToLab65(c2), "lch65"),
    lab65: (c2) => convertLabToLch(c2, "lch65")
  },
  ranges: {
    l: [0, 100],
    c: [0, 150],
    h: [0, 360]
  }
};
const convertLuvToLchuv = ({ l: l2, u: u2, v: v2, alpha }) => {
  if (u2 === void 0) u2 = 0;
  if (v2 === void 0) v2 = 0;
  let c2 = Math.sqrt(u2 * u2 + v2 * v2);
  let res = {
    mode: "lchuv",
    l: l2,
    c: c2
  };
  if (c2) {
    res.h = normalizeHue(Math.atan2(v2, u2) * 180 / Math.PI);
  }
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertLchuvToLuv = ({ l: l2, c: c2, h: h2, alpha }) => {
  if (h2 === void 0) h2 = 0;
  let res = {
    mode: "luv",
    l: l2,
    u: c2 ? c2 * Math.cos(h2 / 180 * Math.PI) : 0,
    v: c2 ? c2 * Math.sin(h2 / 180 * Math.PI) : 0
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const u_fn$1 = (x2, y3, z2) => 4 * x2 / (x2 + 15 * y3 + 3 * z2);
const v_fn$1 = (x2, y3, z2) => 9 * y3 / (x2 + 15 * y3 + 3 * z2);
const un$1 = u_fn$1(D50.X, D50.Y, D50.Z);
const vn$1 = v_fn$1(D50.X, D50.Y, D50.Z);
const l_fn = (value) => value <= e ? k2 * value : 116 * Math.cbrt(value) - 16;
const convertXyz50ToLuv = ({ x: x2, y: y3, z: z2, alpha }) => {
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (z2 === void 0) z2 = 0;
  let l2 = l_fn(y3 / D50.Y);
  let u2 = u_fn$1(x2, y3, z2);
  let v2 = v_fn$1(x2, y3, z2);
  if (!isFinite(u2) || !isFinite(v2)) {
    l2 = u2 = v2 = 0;
  } else {
    u2 = 13 * l2 * (u2 - un$1);
    v2 = 13 * l2 * (v2 - vn$1);
  }
  let res = {
    mode: "luv",
    l: l2,
    u: u2,
    v: v2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const u_fn = (x2, y3, z2) => 4 * x2 / (x2 + 15 * y3 + 3 * z2);
const v_fn = (x2, y3, z2) => 9 * y3 / (x2 + 15 * y3 + 3 * z2);
const un = u_fn(D50.X, D50.Y, D50.Z);
const vn = v_fn(D50.X, D50.Y, D50.Z);
const convertLuvToXyz50 = ({ l: l2, u: u2, v: v2, alpha }) => {
  if (l2 === void 0) l2 = 0;
  if (l2 === 0) {
    return { mode: "xyz50", x: 0, y: 0, z: 0 };
  }
  if (u2 === void 0) u2 = 0;
  if (v2 === void 0) v2 = 0;
  let up = u2 / (13 * l2) + un;
  let vp = v2 / (13 * l2) + vn;
  let y3 = D50.Y * (l2 <= 8 ? l2 / k2 : Math.pow((l2 + 16) / 116, 3));
  let x2 = y3 * (9 * up) / (4 * vp);
  let z2 = y3 * (12 - 3 * up - 20 * vp) / (4 * vp);
  let res = { mode: "xyz50", x: x2, y: y3, z: z2 };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertRgbToLchuv = (rgb) => convertLuvToLchuv(convertXyz50ToLuv(convertRgbToXyz50(rgb)));
const convertLchuvToRgb = (lchuv) => convertXyz50ToRgb(convertLuvToXyz50(convertLchuvToLuv(lchuv)));
const definition$b = {
  mode: "lchuv",
  toMode: {
    luv: convertLchuvToLuv,
    rgb: convertLchuvToRgb
  },
  fromMode: {
    rgb: convertRgbToLchuv,
    luv: convertLuvToLchuv
  },
  channels: ["l", "c", "h", "alpha"],
  parse: ["--lchuv"],
  serialize: "--lchuv",
  ranges: {
    l: [0, 100],
    c: [0, 176.956],
    h: [0, 360]
  },
  interpolate: {
    h: { use: interpolatorLinear, fixup: fixupHueShorter },
    c: interpolatorLinear,
    l: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  },
  difference: {
    h: differenceHueChroma
  },
  average: {
    h: averageAngle
  }
};
const definition$a = {
  ...definition$r,
  mode: "lrgb",
  toMode: {
    rgb: convertLrgbToRgb
  },
  fromMode: {
    rgb: convertRgbToLrgb
  },
  parse: ["srgb-linear"],
  serialize: "srgb-linear"
};
const definition$9 = {
  mode: "luv",
  toMode: {
    xyz50: convertLuvToXyz50,
    rgb: (luv) => convertXyz50ToRgb(convertLuvToXyz50(luv))
  },
  fromMode: {
    xyz50: convertXyz50ToLuv,
    rgb: (rgb) => convertXyz50ToLuv(convertRgbToXyz50(rgb))
  },
  channels: ["l", "u", "v", "alpha"],
  parse: ["--luv"],
  serialize: "--luv",
  ranges: {
    l: [0, 100],
    u: [-84.936, 175.042],
    v: [-125.882, 87.243]
  },
  interpolate: {
    l: interpolatorLinear,
    u: interpolatorLinear,
    v: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const convertLrgbToOklab = ({ r: r2, g: g2, b: b2, alpha }) => {
  if (r2 === void 0) r2 = 0;
  if (g2 === void 0) g2 = 0;
  if (b2 === void 0) b2 = 0;
  let L2 = Math.cbrt(
    0.412221469470763 * r2 + 0.5363325372617348 * g2 + 0.0514459932675022 * b2
  );
  let M3 = Math.cbrt(
    0.2119034958178252 * r2 + 0.6806995506452344 * g2 + 0.1073969535369406 * b2
  );
  let S2 = Math.cbrt(
    0.0883024591900564 * r2 + 0.2817188391361215 * g2 + 0.6299787016738222 * b2
  );
  let res = {
    mode: "oklab",
    l: 0.210454268309314 * L2 + 0.7936177747023054 * M3 - 0.0040720430116193 * S2,
    a: 1.9779985324311684 * L2 - 2.42859224204858 * M3 + 0.450593709617411 * S2,
    b: 0.0259040424655478 * L2 + 0.7827717124575296 * M3 - 0.8086757549230774 * S2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertRgbToOklab = (rgb) => {
  let res = convertLrgbToOklab(convertRgbToLrgb(rgb));
  if (rgb.r === rgb.b && rgb.b === rgb.g) {
    res.a = res.b = 0;
  }
  return res;
};
const convertOklabToLrgb = ({ l: l2, a: a2, b: b2, alpha }) => {
  if (l2 === void 0) l2 = 0;
  if (a2 === void 0) a2 = 0;
  if (b2 === void 0) b2 = 0;
  let L2 = Math.pow(l2 + 0.3963377773761749 * a2 + 0.2158037573099136 * b2, 3);
  let M3 = Math.pow(l2 - 0.1055613458156586 * a2 - 0.0638541728258133 * b2, 3);
  let S2 = Math.pow(l2 - 0.0894841775298119 * a2 - 1.2914855480194092 * b2, 3);
  let res = {
    mode: "lrgb",
    r: 4.076741636075957 * L2 - 3.3077115392580616 * M3 + 0.2309699031821044 * S2,
    g: -1.2684379732850317 * L2 + 2.6097573492876887 * M3 - 0.3413193760026573 * S2,
    b: -0.0041960761386756 * L2 - 0.7034186179359362 * M3 + 1.7076146940746117 * S2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertOklabToRgb = (c2) => convertLrgbToRgb(convertOklabToLrgb(c2));
function toe(x2) {
  const k_1 = 0.206;
  const k_2 = 0.03;
  const k_3 = (1 + k_1) / (1 + k_2);
  return 0.5 * (k_3 * x2 - k_1 + Math.sqrt((k_3 * x2 - k_1) * (k_3 * x2 - k_1) + 4 * k_2 * k_3 * x2));
}
function toe_inv(x2) {
  const k_1 = 0.206;
  const k_2 = 0.03;
  const k_3 = (1 + k_1) / (1 + k_2);
  return (x2 * x2 + k_1 * x2) / (k_3 * (x2 + k_2));
}
function compute_max_saturation(a2, b2) {
  let k0, k1, k22, k3, k4, wl, wm, ws;
  if (-1.88170328 * a2 - 0.80936493 * b2 > 1) {
    k0 = 1.19086277;
    k1 = 1.76576728;
    k22 = 0.59662641;
    k3 = 0.75515197;
    k4 = 0.56771245;
    wl = 4.0767416621;
    wm = -3.3077115913;
    ws = 0.2309699292;
  } else if (1.81444104 * a2 - 1.19445276 * b2 > 1) {
    k0 = 0.73956515;
    k1 = -0.45954404;
    k22 = 0.08285427;
    k3 = 0.1254107;
    k4 = 0.14503204;
    wl = -1.2684380046;
    wm = 2.6097574011;
    ws = -0.3413193965;
  } else {
    k0 = 1.35733652;
    k1 = -915799e-8;
    k22 = -1.1513021;
    k3 = -0.50559606;
    k4 = 692167e-8;
    wl = -0.0041960863;
    wm = -0.7034186147;
    ws = 1.707614701;
  }
  let S2 = k0 + k1 * a2 + k22 * b2 + k3 * a2 * a2 + k4 * a2 * b2;
  let k_l = 0.3963377774 * a2 + 0.2158037573 * b2;
  let k_m = -0.1055613458 * a2 - 0.0638541728 * b2;
  let k_s = -0.0894841775 * a2 - 1.291485548 * b2;
  {
    let l_ = 1 + S2 * k_l;
    let m_ = 1 + S2 * k_m;
    let s_ = 1 + S2 * k_s;
    let l2 = l_ * l_ * l_;
    let m2 = m_ * m_ * m_;
    let s2 = s_ * s_ * s_;
    let l_dS = 3 * k_l * l_ * l_;
    let m_dS = 3 * k_m * m_ * m_;
    let s_dS = 3 * k_s * s_ * s_;
    let l_dS2 = 6 * k_l * k_l * l_;
    let m_dS2 = 6 * k_m * k_m * m_;
    let s_dS2 = 6 * k_s * k_s * s_;
    let f2 = wl * l2 + wm * m2 + ws * s2;
    let f1 = wl * l_dS + wm * m_dS + ws * s_dS;
    let f22 = wl * l_dS2 + wm * m_dS2 + ws * s_dS2;
    S2 = S2 - f2 * f1 / (f1 * f1 - 0.5 * f2 * f22);
  }
  return S2;
}
function find_cusp(a2, b2) {
  let S_cusp = compute_max_saturation(a2, b2);
  let rgb = convertOklabToLrgb({ l: 1, a: S_cusp * a2, b: S_cusp * b2 });
  let L_cusp = Math.cbrt(1 / Math.max(rgb.r, rgb.g, rgb.b));
  let C_cusp = L_cusp * S_cusp;
  return [L_cusp, C_cusp];
}
function find_gamut_intersection(a2, b2, L1, C12, L0, cusp = null) {
  if (!cusp) {
    cusp = find_cusp(a2, b2);
  }
  let t2;
  if ((L1 - L0) * cusp[1] - (cusp[0] - L0) * C12 <= 0) {
    t2 = cusp[1] * L0 / (C12 * cusp[0] + cusp[1] * (L0 - L1));
  } else {
    t2 = cusp[1] * (L0 - 1) / (C12 * (cusp[0] - 1) + cusp[1] * (L0 - L1));
    {
      let dL = L1 - L0;
      let dC = C12;
      let k_l = 0.3963377774 * a2 + 0.2158037573 * b2;
      let k_m = -0.1055613458 * a2 - 0.0638541728 * b2;
      let k_s = -0.0894841775 * a2 - 1.291485548 * b2;
      let l_dt = dL + dC * k_l;
      let m_dt = dL + dC * k_m;
      let s_dt = dL + dC * k_s;
      {
        let L2 = L0 * (1 - t2) + t2 * L1;
        let C4 = t2 * C12;
        let l_ = L2 + C4 * k_l;
        let m_ = L2 + C4 * k_m;
        let s_ = L2 + C4 * k_s;
        let l2 = l_ * l_ * l_;
        let m2 = m_ * m_ * m_;
        let s2 = s_ * s_ * s_;
        let ldt = 3 * l_dt * l_ * l_;
        let mdt = 3 * m_dt * m_ * m_;
        let sdt = 3 * s_dt * s_ * s_;
        let ldt2 = 6 * l_dt * l_dt * l_;
        let mdt2 = 6 * m_dt * m_dt * m_;
        let sdt2 = 6 * s_dt * s_dt * s_;
        let r2 = 4.0767416621 * l2 - 3.3077115913 * m2 + 0.2309699292 * s2 - 1;
        let r1 = 4.0767416621 * ldt - 3.3077115913 * mdt + 0.2309699292 * sdt;
        let r22 = 4.0767416621 * ldt2 - 3.3077115913 * mdt2 + 0.2309699292 * sdt2;
        let u_r = r1 / (r1 * r1 - 0.5 * r2 * r22);
        let t_r = -r2 * u_r;
        let g2 = -1.2684380046 * l2 + 2.6097574011 * m2 - 0.3413193965 * s2 - 1;
        let g1 = -1.2684380046 * ldt + 2.6097574011 * mdt - 0.3413193965 * sdt;
        let g22 = -1.2684380046 * ldt2 + 2.6097574011 * mdt2 - 0.3413193965 * sdt2;
        let u_g = g1 / (g1 * g1 - 0.5 * g2 * g22);
        let t_g = -g2 * u_g;
        let b3 = -0.0041960863 * l2 - 0.7034186147 * m2 + 1.707614701 * s2 - 1;
        let b1 = -0.0041960863 * ldt - 0.7034186147 * mdt + 1.707614701 * sdt;
        let b22 = -0.0041960863 * ldt2 - 0.7034186147 * mdt2 + 1.707614701 * sdt2;
        let u_b = b1 / (b1 * b1 - 0.5 * b3 * b22);
        let t_b = -b3 * u_b;
        t_r = u_r >= 0 ? t_r : 1e6;
        t_g = u_g >= 0 ? t_g : 1e6;
        t_b = u_b >= 0 ? t_b : 1e6;
        t2 += Math.min(t_r, Math.min(t_g, t_b));
      }
    }
  }
  return t2;
}
function get_ST_max(a_, b_, cusp = null) {
  if (!cusp) {
    cusp = find_cusp(a_, b_);
  }
  let L2 = cusp[0];
  let C4 = cusp[1];
  return [C4 / L2, C4 / (1 - L2)];
}
function get_Cs(L2, a_, b_) {
  let cusp = find_cusp(a_, b_);
  let C_max = find_gamut_intersection(a_, b_, L2, 1, L2, cusp);
  let ST_max = get_ST_max(a_, b_, cusp);
  let S_mid = 0.11516993 + 1 / (7.4477897 + 4.1590124 * b_ + a_ * (-2.19557347 + 1.75198401 * b_ + a_ * (-2.13704948 - 10.02301043 * b_ + a_ * (-4.24894561 + 5.38770819 * b_ + 4.69891013 * a_))));
  let T_mid = 0.11239642 + 1 / (1.6132032 - 0.68124379 * b_ + a_ * (0.40370612 + 0.90148123 * b_ + a_ * (-0.27087943 + 0.6122399 * b_ + a_ * (299215e-8 - 0.45399568 * b_ - 0.14661872 * a_))));
  let k3 = C_max / Math.min(L2 * ST_max[0], (1 - L2) * ST_max[1]);
  let C_a = L2 * S_mid;
  let C_b = (1 - L2) * T_mid;
  let C_mid = 0.9 * k3 * Math.sqrt(
    Math.sqrt(
      1 / (1 / (C_a * C_a * C_a * C_a) + 1 / (C_b * C_b * C_b * C_b))
    )
  );
  C_a = L2 * 0.4;
  C_b = (1 - L2) * 0.8;
  let C_0 = Math.sqrt(1 / (1 / (C_a * C_a) + 1 / (C_b * C_b)));
  return [C_0, C_mid, C_max];
}
function convertOklabToOkhsl(lab) {
  const l2 = lab.l !== void 0 ? lab.l : 0;
  const a2 = lab.a !== void 0 ? lab.a : 0;
  const b2 = lab.b !== void 0 ? lab.b : 0;
  const ret = { mode: "okhsl", l: toe(l2) };
  if (lab.alpha !== void 0) {
    ret.alpha = lab.alpha;
  }
  let c2 = Math.sqrt(a2 * a2 + b2 * b2);
  if (!c2) {
    ret.s = 0;
    return ret;
  }
  let [C_0, C_mid, C_max] = get_Cs(l2, a2 / c2, b2 / c2);
  let s2;
  if (c2 < C_mid) {
    let k_0 = 0;
    let k_1 = 0.8 * C_0;
    let k_2 = 1 - k_1 / C_mid;
    let t2 = (c2 - k_0) / (k_1 + k_2 * (c2 - k_0));
    s2 = t2 * 0.8;
  } else {
    let k_0 = C_mid;
    let k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
    let k_2 = 1 - k_1 / (C_max - C_mid);
    let t2 = (c2 - k_0) / (k_1 + k_2 * (c2 - k_0));
    s2 = 0.8 + 0.2 * t2;
  }
  if (s2) {
    ret.s = s2;
    ret.h = normalizeHue(Math.atan2(b2, a2) * 180 / Math.PI);
  }
  return ret;
}
function convertOkhslToOklab(hsl) {
  let h2 = hsl.h !== void 0 ? hsl.h : 0;
  let s2 = hsl.s !== void 0 ? hsl.s : 0;
  let l2 = hsl.l !== void 0 ? hsl.l : 0;
  const ret = { mode: "oklab", l: toe_inv(l2) };
  if (hsl.alpha !== void 0) {
    ret.alpha = hsl.alpha;
  }
  if (!s2 || l2 === 1) {
    ret.a = ret.b = 0;
    return ret;
  }
  let a_ = Math.cos(h2 / 180 * Math.PI);
  let b_ = Math.sin(h2 / 180 * Math.PI);
  let [C_0, C_mid, C_max] = get_Cs(ret.l, a_, b_);
  let t2, k_0, k_1, k_2;
  if (s2 < 0.8) {
    t2 = 1.25 * s2;
    k_0 = 0;
    k_1 = 0.8 * C_0;
    k_2 = 1 - k_1 / C_mid;
  } else {
    t2 = 5 * (s2 - 0.8);
    k_0 = C_mid;
    k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
    k_2 = 1 - k_1 / (C_max - C_mid);
  }
  let C4 = k_0 + t2 * k_1 / (1 - k_2 * t2);
  ret.a = C4 * a_;
  ret.b = C4 * b_;
  return ret;
}
const modeOkhsl = {
  ...definition$l,
  mode: "okhsl",
  channels: ["h", "s", "l", "alpha"],
  parse: ["--okhsl"],
  serialize: "--okhsl",
  fromMode: {
    oklab: convertOklabToOkhsl,
    rgb: (c2) => convertOklabToOkhsl(convertRgbToOklab(c2))
  },
  toMode: {
    oklab: convertOkhslToOklab,
    rgb: (c2) => convertOklabToRgb(convertOkhslToOklab(c2))
  }
};
function convertOklabToOkhsv(lab) {
  let l2 = lab.l !== void 0 ? lab.l : 0;
  let a2 = lab.a !== void 0 ? lab.a : 0;
  let b2 = lab.b !== void 0 ? lab.b : 0;
  let c2 = Math.sqrt(a2 * a2 + b2 * b2);
  let a_ = c2 ? a2 / c2 : 1;
  let b_ = c2 ? b2 / c2 : 1;
  let [S_max, T] = get_ST_max(a_, b_);
  let S_0 = 0.5;
  let k3 = 1 - S_0 / S_max;
  let t2 = T / (c2 + l2 * T);
  let L_v = t2 * l2;
  let C_v = t2 * c2;
  let L_vt = toe_inv(L_v);
  let C_vt = C_v * L_vt / L_v;
  let rgb_scale = convertOklabToLrgb({ l: L_vt, a: a_ * C_vt, b: b_ * C_vt });
  let scale_L = Math.cbrt(
    1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
  );
  l2 = l2 / scale_L;
  c2 = c2 / scale_L * toe(l2) / l2;
  l2 = toe(l2);
  const ret = {
    mode: "okhsv",
    s: c2 ? (S_0 + T) * C_v / (T * S_0 + T * k3 * C_v) : 0,
    v: l2 ? l2 / L_v : 0
  };
  if (ret.s) {
    ret.h = normalizeHue(Math.atan2(b2, a2) * 180 / Math.PI);
  }
  if (lab.alpha !== void 0) {
    ret.alpha = lab.alpha;
  }
  return ret;
}
function convertOkhsvToOklab(hsv) {
  const ret = { mode: "oklab" };
  if (hsv.alpha !== void 0) {
    ret.alpha = hsv.alpha;
  }
  const h2 = hsv.h !== void 0 ? hsv.h : 0;
  const s2 = hsv.s !== void 0 ? hsv.s : 0;
  const v2 = hsv.v !== void 0 ? hsv.v : 0;
  const a_ = Math.cos(h2 / 180 * Math.PI);
  const b_ = Math.sin(h2 / 180 * Math.PI);
  const [S_max, T] = get_ST_max(a_, b_);
  const S_0 = 0.5;
  const k3 = 1 - S_0 / S_max;
  const L_v = 1 - s2 * S_0 / (S_0 + T - T * k3 * s2);
  const C_v = s2 * T * S_0 / (S_0 + T - T * k3 * s2);
  const L_vt = toe_inv(L_v);
  const C_vt = C_v * L_vt / L_v;
  const rgb_scale = convertOklabToLrgb({
    l: L_vt,
    a: a_ * C_vt,
    b: b_ * C_vt
  });
  const scale_L = Math.cbrt(
    1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
  );
  const L_new = toe_inv(v2 * L_v);
  const C4 = C_v * L_new / L_v;
  ret.l = L_new * scale_L;
  ret.a = C4 * a_ * scale_L;
  ret.b = C4 * b_ * scale_L;
  return ret;
}
const modeOkhsv = {
  ...definition$k,
  mode: "okhsv",
  channels: ["h", "s", "v", "alpha"],
  parse: ["--okhsv"],
  serialize: "--okhsv",
  fromMode: {
    oklab: convertOklabToOkhsv,
    rgb: (c2) => convertOklabToOkhsv(convertRgbToOklab(c2))
  },
  toMode: {
    oklab: convertOkhsvToOklab,
    rgb: (c2) => convertOklabToRgb(convertOkhsvToOklab(c2))
  }
};
function parseOklab(color, parsed) {
  if (!parsed || parsed[0] !== "oklab") {
    return void 0;
  }
  const res = { mode: "oklab" };
  const [, l2, a2, b2, alpha] = parsed;
  if (l2.type === Tok.Hue || a2.type === Tok.Hue || b2.type === Tok.Hue) {
    return void 0;
  }
  if (l2.type !== Tok.None) {
    res.l = Math.min(
      Math.max(0, l2.type === Tok.Number ? l2.value : l2.value / 100),
      1
    );
  }
  if (a2.type !== Tok.None) {
    res.a = a2.type === Tok.Number ? a2.value : a2.value * 0.4 / 100;
  }
  if (b2.type !== Tok.None) {
    res.b = b2.type === Tok.Number ? b2.value : b2.value * 0.4 / 100;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
const definition$8 = {
  ...definition$f,
  mode: "oklab",
  toMode: {
    lrgb: convertOklabToLrgb,
    rgb: convertOklabToRgb
  },
  fromMode: {
    lrgb: convertLrgbToOklab,
    rgb: convertRgbToOklab
  },
  ranges: {
    l: [0, 1],
    a: [-0.4, 0.4],
    b: [-0.4, 0.4]
  },
  parse: [parseOklab],
  serialize: (c2) => `oklab(${c2.l !== void 0 ? c2.l : "none"} ${c2.a !== void 0 ? c2.a : "none"} ${c2.b !== void 0 ? c2.b : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`
};
function parseOklch(color, parsed) {
  if (!parsed || parsed[0] !== "oklch") {
    return void 0;
  }
  const res = { mode: "oklch" };
  const [, l2, c2, h2, alpha] = parsed;
  if (l2.type !== Tok.None) {
    if (l2.type === Tok.Hue) {
      return void 0;
    }
    res.l = Math.min(
      Math.max(0, l2.type === Tok.Number ? l2.value : l2.value / 100),
      1
    );
  }
  if (c2.type !== Tok.None) {
    res.c = Math.max(
      0,
      c2.type === Tok.Number ? c2.value : c2.value * 0.4 / 100
    );
  }
  if (h2.type !== Tok.None) {
    if (h2.type === Tok.Percentage) {
      return void 0;
    }
    res.h = h2.value;
  }
  if (alpha.type !== Tok.None) {
    res.alpha = Math.min(
      1,
      Math.max(
        0,
        alpha.type === Tok.Number ? alpha.value : alpha.value / 100
      )
    );
  }
  return res;
}
const definition$7 = {
  ...definition$d,
  mode: "oklch",
  toMode: {
    oklab: (c2) => convertLchToLab(c2, "oklab"),
    rgb: (c2) => convertOklabToRgb(convertLchToLab(c2, "oklab"))
  },
  fromMode: {
    rgb: (c2) => convertLabToLch(convertRgbToOklab(c2), "oklch"),
    oklab: (c2) => convertLabToLch(c2, "oklch")
  },
  parse: [parseOklch],
  serialize: (c2) => `oklch(${c2.l !== void 0 ? c2.l : "none"} ${c2.c !== void 0 ? c2.c : "none"} ${c2.h !== void 0 ? c2.h : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
  ranges: {
    l: [0, 1],
    c: [0, 0.4],
    h: [0, 360]
  }
};
const convertP3ToXyz65 = (rgb) => {
  let { r: r2, g: g2, b: b2, alpha } = convertRgbToLrgb(rgb);
  let res = {
    mode: "xyz65",
    x: 0.486570948648216 * r2 + 0.265667693169093 * g2 + 0.1982172852343625 * b2,
    y: 0.2289745640697487 * r2 + 0.6917385218365062 * g2 + 0.079286914093745 * b2,
    z: 0 * r2 + 0.0451133818589026 * g2 + 1.043944368900976 * b2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertXyz65ToP3 = ({ x: x2, y: y3, z: z2, alpha }) => {
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (z2 === void 0) z2 = 0;
  let res = convertLrgbToRgb(
    {
      r: x2 * 2.4934969119414263 - y3 * 0.9313836179191242 - 0.402710784450717 * z2,
      g: x2 * -0.8294889695615749 + y3 * 1.7626640603183465 + 0.0236246858419436 * z2,
      b: x2 * 0.0358458302437845 - y3 * 0.0761723892680418 + 0.9568845240076871 * z2
    },
    "p3"
  );
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const definition$6 = {
  ...definition$r,
  mode: "p3",
  parse: ["display-p3"],
  serialize: "display-p3",
  fromMode: {
    rgb: (color) => convertXyz65ToP3(convertRgbToXyz65(color)),
    xyz65: convertXyz65ToP3
  },
  toMode: {
    rgb: (color) => convertXyz65ToRgb(convertP3ToXyz65(color)),
    xyz65: convertP3ToXyz65
  }
};
const gamma$1 = (v2) => {
  let abs2 = Math.abs(v2);
  if (abs2 >= 1 / 512) {
    return Math.sign(v2) * Math.pow(abs2, 1 / 1.8);
  }
  return 16 * v2;
};
const convertXyz50ToProphoto = ({ x: x2, y: y3, z: z2, alpha }) => {
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (z2 === void 0) z2 = 0;
  let res = {
    mode: "prophoto",
    r: gamma$1(
      x2 * 1.3457868816471585 - y3 * 0.2555720873797946 - 0.0511018649755453 * z2
    ),
    g: gamma$1(
      x2 * -0.5446307051249019 + y3 * 1.5082477428451466 + 0.0205274474364214 * z2
    ),
    b: gamma$1(x2 * 0 + y3 * 0 + 1.2119675456389452 * z2)
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const linearize$1 = (v2 = 0) => {
  let abs2 = Math.abs(v2);
  if (abs2 >= 16 / 512) {
    return Math.sign(v2) * Math.pow(abs2, 1.8);
  }
  return v2 / 16;
};
const convertProphotoToXyz50 = (prophoto) => {
  let r2 = linearize$1(prophoto.r);
  let g2 = linearize$1(prophoto.g);
  let b2 = linearize$1(prophoto.b);
  let res = {
    mode: "xyz50",
    x: 0.7977666449006423 * r2 + 0.1351812974005331 * g2 + 0.0313477341283922 * b2,
    y: 0.2880748288194013 * r2 + 0.7118352342418731 * g2 + 899369387256e-16 * b2,
    z: 0 * r2 + 0 * g2 + 0.8251046025104602 * b2
  };
  if (prophoto.alpha !== void 0) {
    res.alpha = prophoto.alpha;
  }
  return res;
};
const definition$5 = {
  ...definition$r,
  mode: "prophoto",
  parse: ["prophoto-rgb"],
  serialize: "prophoto-rgb",
  fromMode: {
    xyz50: convertXyz50ToProphoto,
    rgb: (color) => convertXyz50ToProphoto(convertRgbToXyz50(color))
  },
  toMode: {
    xyz50: convertProphotoToXyz50,
    rgb: (color) => convertXyz50ToRgb(convertProphotoToXyz50(color))
  }
};
const α$1 = 1.09929682680944;
const β$1 = 0.018053968510807;
const gamma = (v2) => {
  const abs2 = Math.abs(v2);
  if (abs2 > β$1) {
    return (Math.sign(v2) || 1) * (α$1 * Math.pow(abs2, 0.45) - (α$1 - 1));
  }
  return 4.5 * v2;
};
const convertXyz65ToRec2020 = ({ x: x2, y: y3, z: z2, alpha }) => {
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (z2 === void 0) z2 = 0;
  let res = {
    mode: "rec2020",
    r: gamma(
      x2 * 1.7166511879712683 - y3 * 0.3556707837763925 - 0.2533662813736599 * z2
    ),
    g: gamma(
      x2 * -0.6666843518324893 + y3 * 1.6164812366349395 + 0.0157685458139111 * z2
    ),
    b: gamma(
      x2 * 0.0176398574453108 - y3 * 0.0427706132578085 + 0.9421031212354739 * z2
    )
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const α = 1.09929682680944;
const β = 0.018053968510807;
const linearize = (v2 = 0) => {
  let abs2 = Math.abs(v2);
  if (abs2 < β * 4.5) {
    return v2 / 4.5;
  }
  return (Math.sign(v2) || 1) * Math.pow((abs2 + α - 1) / α, 1 / 0.45);
};
const convertRec2020ToXyz65 = (rec2020) => {
  let r2 = linearize(rec2020.r);
  let g2 = linearize(rec2020.g);
  let b2 = linearize(rec2020.b);
  let res = {
    mode: "xyz65",
    x: 0.6369580483012911 * r2 + 0.1446169035862083 * g2 + 0.1688809751641721 * b2,
    y: 0.262700212011267 * r2 + 0.6779980715188708 * g2 + 0.059301716469862 * b2,
    z: 0 * r2 + 0.0280726930490874 * g2 + 1.0609850577107909 * b2
  };
  if (rec2020.alpha !== void 0) {
    res.alpha = rec2020.alpha;
  }
  return res;
};
const definition$4 = {
  ...definition$r,
  mode: "rec2020",
  fromMode: {
    xyz65: convertXyz65ToRec2020,
    rgb: (color) => convertXyz65ToRec2020(convertRgbToXyz65(color))
  },
  toMode: {
    xyz65: convertRec2020ToXyz65,
    rgb: (color) => convertXyz65ToRgb(convertRec2020ToXyz65(color))
  },
  parse: ["rec2020"],
  serialize: "rec2020"
};
const bias = 0.0037930732552754493;
const bias_cbrt = Math.cbrt(bias);
const transfer$1 = (v2) => Math.cbrt(v2) - bias_cbrt;
const convertRgbToXyb = (color) => {
  const { r: r2, g: g2, b: b2, alpha } = convertRgbToLrgb(color);
  const l2 = transfer$1(0.3 * r2 + 0.622 * g2 + 0.078 * b2 + bias);
  const m2 = transfer$1(0.23 * r2 + 0.692 * g2 + 0.078 * b2 + bias);
  const s2 = transfer$1(
    0.2434226892454782 * r2 + 0.2047674442449682 * g2 + 0.5518098665095535 * b2 + bias
  );
  const res = {
    mode: "xyb",
    x: (l2 - m2) / 2,
    y: (l2 + m2) / 2,
    /* Apply default chroma from luma (subtract Y from B) */
    b: s2 - (l2 + m2) / 2
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const transfer = (v2) => Math.pow(v2 + bias_cbrt, 3);
const convertXybToRgb = ({ x: x2, y: y3, b: b2, alpha }) => {
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (b2 === void 0) b2 = 0;
  const l2 = transfer(x2 + y3) - bias;
  const m2 = transfer(y3 - x2) - bias;
  const s2 = transfer(b2 + y3) - bias;
  const res = convertLrgbToRgb({
    r: 11.031566904639861 * l2 - 9.866943908131562 * m2 - 0.16462299650829934 * s2,
    g: -3.2541473810744237 * l2 + 4.418770377582723 * m2 - 0.16462299650829934 * s2,
    b: -3.6588512867136815 * l2 + 2.7129230459360922 * m2 + 1.9459282407775895 * s2
  });
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const definition$3 = {
  mode: "xyb",
  channels: ["x", "y", "b", "alpha"],
  parse: ["--xyb"],
  serialize: "--xyb",
  toMode: {
    rgb: convertXybToRgb
  },
  fromMode: {
    rgb: convertRgbToXyb
  },
  ranges: {
    x: [-0.0154, 0.0281],
    y: [0, 0.8453],
    b: [-0.2778, 0.388]
  },
  interpolate: {
    x: interpolatorLinear,
    y: interpolatorLinear,
    b: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const definition$2 = {
  mode: "xyz50",
  parse: ["xyz-d50"],
  serialize: "xyz-d50",
  toMode: {
    rgb: convertXyz50ToRgb,
    lab: convertXyz50ToLab
  },
  fromMode: {
    rgb: convertRgbToXyz50,
    lab: convertLabToXyz50
  },
  channels: ["x", "y", "z", "alpha"],
  ranges: {
    x: [0, 0.964],
    y: [0, 0.999],
    z: [0, 0.825]
  },
  interpolate: {
    x: interpolatorLinear,
    y: interpolatorLinear,
    z: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const convertXyz65ToXyz50 = (xyz65) => {
  let { x: x2, y: y3, z: z2, alpha } = xyz65;
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (z2 === void 0) z2 = 0;
  let res = {
    mode: "xyz50",
    x: 1.0479298208405488 * x2 + 0.0229467933410191 * y3 - 0.0501922295431356 * z2,
    y: 0.0296278156881593 * x2 + 0.990434484573249 * y3 - 0.0170738250293851 * z2,
    z: -0.0092430581525912 * x2 + 0.0150551448965779 * y3 + 0.7518742899580008 * z2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const convertXyz50ToXyz65 = (xyz50) => {
  let { x: x2, y: y3, z: z2, alpha } = xyz50;
  if (x2 === void 0) x2 = 0;
  if (y3 === void 0) y3 = 0;
  if (z2 === void 0) z2 = 0;
  let res = {
    mode: "xyz65",
    x: 0.9554734527042182 * x2 - 0.0230985368742614 * y3 + 0.0632593086610217 * z2,
    y: -0.0283697069632081 * x2 + 1.0099954580058226 * y3 + 0.021041398966943 * z2,
    z: 0.0123140016883199 * x2 - 0.0205076964334779 * y3 + 1.3303659366080753 * z2
  };
  if (alpha !== void 0) {
    res.alpha = alpha;
  }
  return res;
};
const definition$1 = {
  mode: "xyz65",
  toMode: {
    rgb: convertXyz65ToRgb,
    xyz50: convertXyz65ToXyz50
  },
  fromMode: {
    rgb: convertRgbToXyz65,
    xyz50: convertXyz50ToXyz65
  },
  ranges: {
    x: [0, 0.95],
    y: [0, 1],
    z: [0, 1.088]
  },
  channels: ["x", "y", "z", "alpha"],
  parse: ["xyz", "xyz-d65"],
  serialize: "xyz-d65",
  interpolate: {
    x: interpolatorLinear,
    y: interpolatorLinear,
    z: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
const convertRgbToYiq = ({ r: r2, g: g2, b: b2, alpha }) => {
  if (r2 === void 0) r2 = 0;
  if (g2 === void 0) g2 = 0;
  if (b2 === void 0) b2 = 0;
  const res = {
    mode: "yiq",
    y: 0.29889531 * r2 + 0.58662247 * g2 + 0.11448223 * b2,
    i: 0.59597799 * r2 - 0.2741761 * g2 - 0.32180189 * b2,
    q: 0.21147017 * r2 - 0.52261711 * g2 + 0.31114694 * b2
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const convertYiqToRgb = ({ y: y3, i: i4, q, alpha }) => {
  if (y3 === void 0) y3 = 0;
  if (i4 === void 0) i4 = 0;
  if (q === void 0) q = 0;
  const res = {
    mode: "rgb",
    r: y3 + 0.95608445 * i4 + 0.6208885 * q,
    g: y3 - 0.27137664 * i4 - 0.6486059 * q,
    b: y3 - 1.10561724 * i4 + 1.70250126 * q
  };
  if (alpha !== void 0) res.alpha = alpha;
  return res;
};
const definition = {
  mode: "yiq",
  toMode: {
    rgb: convertYiqToRgb
  },
  fromMode: {
    rgb: convertRgbToYiq
  },
  channels: ["y", "i", "q", "alpha"],
  parse: ["--yiq"],
  serialize: "--yiq",
  ranges: {
    i: [-0.595, 0.595],
    q: [-0.522, 0.522]
  },
  interpolate: {
    y: interpolatorLinear,
    i: interpolatorLinear,
    q: interpolatorLinear,
    alpha: { use: interpolatorLinear, fixup: fixupAlpha }
  }
};
useMode(definition$q);
useMode(definition$p);
useMode(definition$o);
useMode(definition$n);
useMode(definition$m);
useMode(definition$l);
useMode(definition$k);
useMode(definition$j);
useMode(definition$i);
useMode(definition$h);
useMode(definition$g);
useMode(definition$f);
useMode(definition$e);
useMode(definition$d);
useMode(definition$c);
useMode(definition$b);
useMode(definition$a);
useMode(definition$9);
useMode(modeOkhsl);
useMode(modeOkhsv);
useMode(definition$8);
useMode(definition$7);
useMode(definition$6);
useMode(definition$5);
useMode(definition$4);
useMode(definition$r);
useMode(definition$3);
useMode(definition$2);
useMode(definition$1);
useMode(definition);
const defaultColorCss = i$5`
  --default-red: 244, 67, 54;
  --default-pink: 233, 30, 99;
  --default-purple: 146, 107, 199;
  --default-deep-purple: 110, 65, 171;
  --default-indigo: 63, 81, 181;
  --default-blue: 33, 150, 243;
  --default-light-blue: 3, 169, 244;
  --default-cyan: 0, 188, 212;
  --default-teal: 0, 150, 136;
  --default-green: 76, 175, 80;
  --default-light-green: 139, 195, 74;
  --default-lime: 205, 220, 57;
  --default-yellow: 255, 235, 59;
  --default-amber: 255, 193, 7;
  --default-orange: 255, 152, 0;
  --default-deep-orange: 255, 111, 34;
  --default-brown: 121, 85, 72;
  --default-light-grey: 189, 189, 189;
  --default-grey: 158, 158, 158;
  --default-dark-grey: 96, 96, 96;
  --default-blue-grey: 96, 125, 139;
  --default-black: 0, 0, 0;
  --default-white: 255, 255, 255;
  --default-disabled: 189, 189, 189;
`;
const defaultDarkColorCss = i$5`
  --default-disabled: 111, 111, 111;
`;
const themeVariables = i$5`
  --spacing: var(--mush-spacing, 10px);

  /* Title */
  --title-padding: var(--mush-title-padding, 24px 12px 8px);
  --title-spacing: var(--mush-title-spacing, 8px);
  --title-font-size: var(--mush-title-font-size, 24px);
  --title-font-weight: var(--mush-title-font-weight, normal);
  --title-line-height: var(--mush-title-line-height, 32px);
  --title-color: var(--mush-title-color, var(--primary-text-color));
  --title-letter-spacing: var(--mush-title-letter-spacing, -0.288px);
  --subtitle-font-size: var(--mush-subtitle-font-size, 16px);
  --subtitle-font-weight: var(--mush-subtitle-font-weight, normal);
  --subtitle-line-height: var(--mush-subtitle-line-height, 24px);
  --subtitle-color: var(--mush-subtitle-color, var(--secondary-text-color));
  --subtitle-letter-spacing: var(--mush-subtitle-letter-spacing, 0px);

  /* Card */
  --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
  --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
  --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
  --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
  --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
  --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
  --card-primary-color: var(
    --mush-card-primary-color,
    var(--primary-text-color)
  );
  --card-secondary-color: var(
    --mush-card-secondary-color,
    var(--primary-text-color)
  );
  --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
  --card-secondary-letter-spacing: var(
    --mush-card-secondary-letter-spacing,
    0.4px
  );

  /* Chips */
  --chip-spacing: var(--mush-chip-spacing, 8px);
  --chip-padding: var(--mush-chip-padding, 0 0.25em);
  --chip-height: var(--mush-chip-height, 36px);
  --chip-border-radius: var(--mush-chip-border-radius, 19px);
  --chip-border-width: var(
    --mush-chip-border-width,
    var(--ha-card-border-width, 1px)
  );
  --chip-border-color: var(
    --mush-chip-border-color,
    var(--ha-card-border-color, var(--divider-color))
  );
  --chip-box-shadow: var(
    --mush-chip-box-shadow,
    var(--ha-card-box-shadow, "none")
  );
  --chip-font-size: var(--mush-chip-font-size, 0.3em);
  --chip-font-weight: var(--mush-chip-font-weight, bold);
  --chip-icon-size: var(--mush-chip-icon-size, 0.5em);
  --chip-avatar-padding: var(--mush-chip-avatar-padding, 0.1em);
  --chip-avatar-border-radius: var(--mush-chip-avatar-border-radius, 50%);
  --chip-background: var(
    --mush-chip-background,
    var(--ha-card-background, var(--card-background-color, white))
  );
  /* Controls */
  --control-border-radius: var(--mush-control-border-radius, 12px);
  --control-height: var(--mush-control-height, 42px);
  --control-button-ratio: var(--mush-control-button-ratio, 1);
  --control-icon-size: var(--mush-control-icon-size, 0.5em);
  --control-spacing: var(--mush-control-spacing, 12px);

  /* Slider */
  --slider-threshold: var(--mush-slider-threshold);

  /* Input Number */
  --input-number-debounce: var(--mush-input-number-debounce);

  /* Layout */
  --layout-align: var(--mush-layout-align, center);

  /* Badge */
  --badge-size: var(--mush-badge-size, 16px);
  --badge-icon-size: var(--mush-badge-icon-size, 0.75em);
  --badge-border-radius: var(--mush-badge-border-radius, 50%);

  /* Icon */
  --icon-border-radius: var(--mush-icon-border-radius, 50%);
  --icon-size: var(--mush-icon-size, 36px);
  --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
`;
const themeColorCss = i$5`
  /* RGB */
  /* Standard colors */
  --rgb-red: var(--mush-rgb-red, var(--default-red));
  --rgb-pink: var(--mush-rgb-pink, var(--default-pink));
  --rgb-purple: var(--mush-rgb-purple, var(--default-purple));
  --rgb-deep-purple: var(--mush-rgb-deep-purple, var(--default-deep-purple));
  --rgb-indigo: var(--mush-rgb-indigo, var(--default-indigo));
  --rgb-blue: var(--mush-rgb-blue, var(--default-blue));
  --rgb-light-blue: var(--mush-rgb-light-blue, var(--default-light-blue));
  --rgb-cyan: var(--mush-rgb-cyan, var(--default-cyan));
  --rgb-teal: var(--mush-rgb-teal, var(--default-teal));
  --rgb-green: var(--mush-rgb-green, var(--default-green));
  --rgb-light-green: var(--mush-rgb-light-green, var(--default-light-green));
  --rgb-lime: var(--mush-rgb-lime, var(--default-lime));
  --rgb-yellow: var(--mush-rgb-yellow, var(--default-yellow));
  --rgb-amber: var(--mush-rgb-amber, var(--default-amber));
  --rgb-orange: var(--mush-rgb-orange, var(--default-orange));
  --rgb-deep-orange: var(--mush-rgb-deep-orange, var(--default-deep-orange));
  --rgb-brown: var(--mush-rgb-brown, var(--default-brown));
  --rgb-light-grey: var(--mush-rgb-light-grey, var(--default-light-grey));
  --rgb-grey: var(--mush-rgb-grey, var(--default-grey));
  --rgb-dark-grey: var(--mush-rgb-dark-grey, var(--default-dark-grey));
  --rgb-blue-grey: var(--mush-rgb-blue-grey, var(--default-blue-grey));
  --rgb-black: var(--mush-rgb-black, var(--default-black));
  --rgb-white: var(--mush-rgb-white, var(--default-white));
  --rgb-disabled: var(--mush-rgb-disabled, var(--default-disabled));

  /* Action colors */
  --rgb-info: var(--mush-rgb-info, var(--rgb-blue));
  --rgb-success: var(--mush-rgb-success, var(--rgb-green));
  --rgb-warning: var(--mush-rgb-warning, var(--rgb-orange));
  --rgb-danger: var(--mush-rgb-danger, var(--rgb-red));

  /* State colors */
  --rgb-state-vacuum: var(--mush-rgb-state-vacuum, var(--rgb-teal));
  --rgb-state-fan: var(--mush-rgb-state-fan, var(--rgb-green));
  --rgb-state-light: var(--mush-rgb-state-light, var(--rgb-orange));
  --rgb-state-entity: var(--mush-rgb-state-entity, var(--rgb-blue));
  --rgb-state-media-player: var(
    --mush-rgb-state-media-player,
    var(--rgb-indigo)
  );
  --rgb-state-lock: var(--mush-rgb-state-lock, var(--rgb-blue));
  --rgb-state-number: var(--mush-rgb-state-number, var(--rgb-blue));
  --rgb-state-humidifier: var(--mush-rgb-state-humidifier, var(--rgb-purple));

  /* State alarm colors */
  --rgb-state-alarm-disarmed: var(
    --mush-rgb-state-alarm-disarmed,
    var(--rgb-info)
  );
  --rgb-state-alarm-armed: var(
    --mush-rgb-state-alarm-armed,
    var(--rgb-success)
  );
  --rgb-state-alarm-triggered: var(
    --mush-rgb-state-alarm-triggered,
    var(--rgb-danger)
  );

  /* State person colors */
  --rgb-state-person-home: var(
    --mush-rgb-state-person-home,
    var(--rgb-success)
  );
  --rgb-state-person-not-home: var(
    --mush-rgb-state-person-not-home,
    var(--rgb-danger)
  );
  --rgb-state-person-zone: var(--mush-rgb-state-person-zone, var(--rgb-info));
  --rgb-state-person-unknown: var(
    --mush-rgb-state-person-unknown,
    var(--rgb-grey)
  );

  /* State update colors */
  --rgb-state-update-on: var(--mush-rgb-state-update-on, var(--rgb-orange));
  --rgb-state-update-off: var(--mush-rgb-update-off, var(--rgb-green));
  --rgb-state-update-installing: var(
    --mush-rgb-update-installing,
    var(--rgb-blue)
  );

  /* State lock colors */
  --rgb-state-lock-locked: var(--mush-rgb-state-lock-locked, var(--rgb-green));
  --rgb-state-lock-unlocked: var(
    --mush-rgb-state-lock-unlocked,
    var(--rgb-red)
  );
  --rgb-state-lock-pending: var(
    --mush-rgb-state-lock-pending,
    var(--rgb-orange)
  );

  /* State cover colors */
  --rgb-state-cover-open: var(--mush-rgb-state-cover-open, var(--rgb-blue));
  --rgb-state-cover-closed: var(
    --mush-rgb-state-cover-closed,
    var(--rgb-disabled)
  );

  /* State climate colors */
  --rgb-state-climate-auto: var(
    --mush-rgb-state-climate-auto,
    var(--rgb-green)
  );
  --rgb-state-climate-cool: var(--mush-rgb-state-climate-cool, var(--rgb-blue));
  --rgb-state-climate-dry: var(--mush-rgb-state-climate-dry, var(--rgb-orange));
  --rgb-state-climate-fan-only: var(
    --mush-rgb-state-climate-fan-only,
    var(--rgb-teal)
  );
  --rgb-state-climate-heat: var(
    --mush-rgb-state-climate-heat,
    var(--rgb-deep-orange)
  );
  --rgb-state-climate-heat-cool: var(
    --mush-rgb-state-climate-heat-cool,
    var(--rgb-green)
  );
  --rgb-state-climate-idle: var(
    --mush-rgb-state-climate-idle,
    var(--rgb-disabled)
  );
  --rgb-state-climate-off: var(
    --mush-rgb-state-climate-off,
    var(--rgb-disabled)
  );
`;
var __defProp$8 = Object.defineProperty;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = decorator(target, key, result) || result;
  if (result) __defProp$8(target, key, result);
  return result;
};
function computeDarkMode(hass) {
  if (!hass) return false;
  return hass.themes.darkMode;
}
class MushroomBaseElement extends i$2 {
  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("hass") && this.hass) {
      const currentDarkMode = computeDarkMode(changedProps.get("hass"));
      const newDarkMode = computeDarkMode(this.hass);
      if (currentDarkMode !== newDarkMode) {
        this.toggleAttribute("dark-mode", newDarkMode);
      }
    }
  }
  static get styles() {
    return [
      animations,
      i$5`
        :host {
          ${defaultColorCss}
        }
        :host([dark-mode]) {
          ${defaultDarkColorCss}
        }
        :host {
          ${themeColorCss}
          ${themeVariables}
        }
      `
    ];
  }
}
__decorateClass$8([
  n$1({ attribute: false })
], MushroomBaseElement.prototype, "hass");
const TIMESTAMP_STATE_DOMAINS = ["button", "input_button", "scene"];
const INFOS = [
  "name",
  "state",
  "last-changed",
  "last-updated",
  "none"
];
const ICON_TYPES = ["icon", "entity-picture", "none"];
function computeInfoDisplay(info, name, state, stateObj, hass) {
  switch (info) {
    case "name":
      return name;
    case "state":
      const domain = stateObj.entity_id.split(".")[0];
      if ((stateObj.attributes.device_class === "timestamp" || TIMESTAMP_STATE_DOMAINS.includes(domain)) && isAvailable(stateObj) && !isUnknown(stateObj)) {
        return b`
          <ha-relative-time
            .hass=${hass}
            .datetime=${stateObj.state}
            capitalize
          ></ha-relative-time>
        `;
      } else {
        return state;
      }
    case "last-changed":
      return b`
        <ha-relative-time
          .hass=${hass}
          .datetime=${stateObj.last_changed}
          capitalize
        ></ha-relative-time>
      `;
    case "last-updated":
      return b`
        <ha-relative-time
          .hass=${hass}
          .datetime=${stateObj.last_updated}
          capitalize
        ></ha-relative-time>
      `;
    case "none":
      return void 0;
  }
}
function computeEntityPicture(stateObj, iconType) {
  return iconType === "entity-picture" ? getEntityPicture(stateObj) : void 0;
}
var __defProp$7 = Object.defineProperty;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = decorator(target, key, result) || result;
  if (result) __defProp$7(target, key, result);
  return result;
};
class MushroomBaseCard extends MushroomBaseElement {
  get _stateObj() {
    if (!this._config || !this.hass || !this._config.entity) return void 0;
    const entityId = this._config.entity;
    return this.hass.states[entityId];
  }
  get hasControls() {
    return false;
  }
  setConfig(config) {
    this._config = {
      tap_action: {
        action: "more-info"
      },
      hold_action: {
        action: "more-info"
      },
      ...config
    };
  }
  getCardSize() {
    let height = 1;
    if (!this._config) return height;
    const appearance = computeAppearance(this._config);
    if (appearance.layout === "vertical") {
      height += 1;
    }
    if (appearance?.layout !== "horizontal" && this.hasControls && !("collapsible_controls" in this._config && this._config?.collapsible_controls)) {
      height += 1;
    }
    return height;
  }
  // For HA < 2024.11
  getLayoutOptions() {
    if (!this._config) {
      return {
        grid_columns: 2,
        grid_rows: 1
      };
    }
    const options = {
      grid_columns: 2,
      grid_rows: 0
    };
    const appearance = computeAppearance(this._config);
    const collapsible_controls = "collapsible_controls" in this._config && Boolean(this._config.collapsible_controls);
    const hasInfo = appearance.primary_info !== "none" || appearance.secondary_info !== "none";
    const hasIcon = appearance.icon_type !== "none";
    const active = this._stateObj && isActive(this._stateObj);
    const hasControls = this.hasControls && (!collapsible_controls || active);
    if (appearance.layout === "vertical") {
      if (hasIcon) {
        options.grid_rows += 1;
      }
      if (hasInfo) {
        options.grid_rows += 1;
      }
      if (hasControls) {
        options.grid_rows += 1;
      }
    }
    if (appearance.layout === "horizontal") {
      options.grid_rows = 1;
      options.grid_columns = 4;
    }
    if (appearance.layout === "default") {
      if (hasInfo || hasIcon) {
        options.grid_rows += 1;
      }
      if (hasControls) {
        options.grid_rows += 1;
      }
    }
    if (!hasControls && !hasInfo) {
      options.grid_columns = 1;
      options.grid_rows = 1;
    }
    options.grid_rows = Math.max(options.grid_rows, 1);
    return options;
  }
  getGridOptions() {
    if (!this._config) {
      return {
        columns: 6,
        rows: 1
      };
    }
    const options = {
      min_rows: 1,
      min_columns: 4,
      columns: 6,
      rows: 0
      // initial value
    };
    const appearance = computeAppearance(this._config);
    const collapsible_controls = "collapsible_controls" in this._config && Boolean(this._config.collapsible_controls);
    const hasInfo = appearance.primary_info !== "none" || appearance.secondary_info !== "none";
    const hasIcon = appearance.icon_type !== "none";
    const active = this._stateObj && isActive(this._stateObj);
    const hasControls = this.hasControls && (!collapsible_controls || active);
    if (appearance.layout === "vertical") {
      if (hasIcon) {
        options.rows += 1;
      }
      if (hasInfo) {
        options.rows += 1;
      }
      if (hasControls) {
        options.rows += 1;
      }
      options.min_columns = 2;
    }
    if (appearance.layout === "horizontal") {
      options.rows = 1;
      options.columns = 12;
    }
    if (appearance.layout === "default") {
      if (hasInfo || hasIcon) {
        options.rows += 1;
      }
      if (hasControls) {
        options.rows += 1;
      }
    }
    if (!hasControls && !hasInfo) {
      options.columns = 3;
      options.rows = 1;
      options.min_columns = 2;
    }
    options.rows = Math.max(options.rows, 1);
    options.min_rows = options.rows;
    return options;
  }
  renderPicture(picture) {
    return b`
      <mushroom-shape-avatar
        slot="icon"
        .picture_url=${this.hass.hassUrl(picture)}
      ></mushroom-shape-avatar>
    `;
  }
  renderNotFound(config) {
    const appearance = computeAppearance(config);
    const rtl = computeRTL(this.hass);
    const customLocalize = setupCustomlocalize(this.hass);
    return b`
      <ha-card
        class=${e$2({ "fill-container": appearance.fill_container })}
      >
        <mushroom-card .appearance=${appearance} ?rtl=${rtl}>
          <mushroom-state-item ?rtl=${rtl} .appearance=${appearance} disabled>
            <mushroom-shape-icon slot="icon" disabled>
              <ha-icon icon="mdi:help"></ha-icon>
            </mushroom-shape-icon>
            <mushroom-badge-icon
              slot="badge"
              class="not-found"
              icon="mdi:exclamation-thick"
            ></mushroom-badge-icon>
            <mushroom-state-info
              slot="info"
              .primary=${config.entity}
              .secondary=${customLocalize("card.not_found")}
            ></mushroom-state-info>
          </mushroom-state-item>
        </mushroom-card>
      </ha-card>
    `;
  }
  renderIcon(stateObj, icon) {
    const active = isActive(stateObj);
    return b`
      <mushroom-shape-icon slot="icon" .disabled=${!active}>
        <ha-state-icon
          .hass=${this.hass}
          .stateObj=${stateObj}
          .icon=${icon}
        ></ha-state-icon
      ></mushroom-shape-icon>
    `;
  }
  renderBadge(stateObj) {
    const unavailable = !isAvailable(stateObj);
    return unavailable ? b`
          <mushroom-badge-icon
            class="unavailable"
            slot="badge"
            icon="mdi:help"
          ></mushroom-badge-icon>
        ` : A;
  }
  renderStateInfo(stateObj, appearance, name, state2) {
    const defaultState = this.hass.formatEntityState(stateObj);
    const displayState = state2 ?? defaultState;
    const primary = computeInfoDisplay(
      appearance.primary_info,
      name,
      displayState,
      stateObj,
      this.hass
    );
    const secondary = computeInfoDisplay(
      appearance.secondary_info,
      name,
      displayState,
      stateObj,
      this.hass
    );
    return b`
      <mushroom-state-info
        slot="info"
        .primary=${primary}
        .secondary=${secondary}
      ></mushroom-state-info>
    `;
  }
}
__decorateClass$7([
  r()
], MushroomBaseCard.prototype, "_config");
__decorateClass$7([
  n$1({ reflect: true, type: String })
], MushroomBaseCard.prototype, "layout");
const cardStyle = i$5`
  ha-card {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: var(--layout-align);
    height: auto;
    display: flex;
    flex-direction: column;
  }
  ha-card.fill-container {
    height: 100%;
  }
  :host([layout="grid"]) ha-card {
    height: 100%;
  }
  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    padding: var(--control-spacing);
    padding-top: 0;
    box-sizing: border-box;
    gap: var(--control-spacing);
  }
  .actions::-webkit-scrollbar {
    background: transparent; /* Chrome/Safari/Webkit */
    height: 0px;
  }
  .unavailable {
    --main-color: rgb(var(--rgb-warning));
  }
  .not-found {
    --main-color: rgb(var(--rgb-danger));
  }
  mushroom-state-item[disabled] {
    cursor: initial;
  }
`;
function computeEntityName(hass, stateObj, name) {
  if (atLeastVersion(hass.config.version, 2026, 4)) {
    return hass.formatEntityName(stateObj, name);
  }
  if (typeof name === "string") {
    return name;
  }
  return stateObj.attributes.friendly_name || "";
}
function registerCustomCard(params) {
  const windowWithCards = window;
  windowWithCards.customCards = windowWithCards.customCards || [];
  windowWithCards.customCards.push({
    ...params,
    preview: true
  });
}
const PETKIT_LITTERBOX_CARD_NAME = `mushroom-petkit-litterbox-card`;
const PETKIT_LITTERBOX_CARD_EDITOR_NAME = `${PETKIT_LITTERBOX_CARD_NAME}-editor`;
const PETKIT_LITTERBOX_STATE_DOMAINS = ["sensor"];
const PETKIT_TIMELINE_CARD_NAME = `mushroom-petkit-litterbox-timeline-card`;
const PETKIT_TIMELINE_CARD_EDITOR_NAME = `${PETKIT_TIMELINE_CARD_NAME}-editor`;
const PETKIT_DASHBOARD_CARD_NAME = `mushroom-petkit-litterbox-dashboard-card`;
const PETKIT_DASHBOARD_CARD_EDITOR_NAME = `${PETKIT_DASHBOARD_CARD_NAME}-editor`;
const DEFAULT_ACTIVE_STATES = [
  "cleaning",
  "scooping",
  "dumping",
  "leveling",
  "odor_removal",
  "deodorizing",
  "maintenance",
  "refreshing",
  "paused",
  "resetting"
];
function isCleaningState(stateObj, config) {
  const cleaningStates = ["cleaning", "scooping", "dumping", "leveling"];
  const activeList = config.active_states ?? cleaningStates;
  return activeList.some(
    (s2) => cleaningStates.includes(s2) && s2 === stateObj.state
  );
}
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$6(target, key, result);
  return result;
};
const PETKIT_LITTERBOX_BUTTONS = [
  {
    icon: "mdi:broom",
    action: "scoop",
    entityConfigKey: "scoop_entity"
  },
  {
    icon: "mdi:spray-bottle",
    action: "deodorize",
    entityConfigKey: "deodorize_entity"
  },
  {
    icon: "mdi:layers-outline",
    action: "level_litter",
    entityConfigKey: "level_litter_entity"
  },
  {
    icon: "mdi:tools",
    action: "maintenance",
    entityConfigKey: "maintenance_entity"
  }
];
function isButtonVisible(button, config) {
  const allowedActions = config.actions;
  if (allowedActions !== void 0 && !allowedActions.includes(button.action)) {
    return false;
  }
  return Boolean(config[button.entityConfigKey]);
}
function isCommandsControlVisible(config) {
  return PETKIT_LITTERBOX_BUTTONS.some((b2) => isButtonVisible(b2, config));
}
let PetkitLitterboxCommandsControl = class extends i$2 {
  constructor() {
    super(...arguments);
    this.fill = false;
    this._pending = false;
    this._wasActivated = false;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimeout();
  }
  _clearTimeout() {
    if (this._timeout !== void 0) {
      clearTimeout(this._timeout);
      this._timeout = void 0;
    }
  }
  _isActiveState() {
    if (!this.stateObj) return false;
    return (this.config.active_states ?? DEFAULT_ACTIVE_STATES).includes(
      this.stateObj.state
    );
  }
  updated(changedProps) {
    super.updated(changedProps);
    if (!changedProps.has("stateObj") || !this._pending) return;
    const nowActive = this._isActiveState();
    if (nowActive) {
      this._wasActivated = true;
      this._clearTimeout();
    } else if (this._wasActivated) {
      this._pending = false;
      this._wasActivated = false;
    }
  }
  _callService(e2) {
    e2.stopPropagation();
    const entityId = e2.target._entityId;
    if (!entityId) return;
    this._pending = true;
    this._wasActivated = false;
    this._clearTimeout();
    this._timeout = setTimeout(() => {
      this._pending = false;
      this._wasActivated = false;
      this._timeout = void 0;
    }, 3e4);
    const domain = entityId.split(".")[0];
    if (domain === "script") {
      this.hass.callService("script", "turn_on", { entity_id: entityId });
    } else {
      this.hass.callService("button", "press", { entity_id: entityId });
    }
  }
  render() {
    const rtl = computeRTL(this.hass);
    const globalBusy = this._pending || this._isActiveState();
    return b`
      <mushroom-button-group .fill=${this.fill} ?rtl=${rtl}>
        ${PETKIT_LITTERBOX_BUTTONS.filter(
      (btn) => isButtonVisible(btn, this.config)
    ).map((btn) => {
      const entityId = this.config[btn.entityConfigKey];
      const stateObj = this.hass.states[entityId];
      const disabled = !stateObj || !isAvailable(stateObj) || globalBusy;
      return b`
            <mushroom-button
              ._entityId=${entityId}
              .disabled=${disabled}
              @click=${this._callService}
            >
              <ha-icon .icon=${btn.icon}></ha-icon>
            </mushroom-button>
          `;
    })}
      </mushroom-button-group>
    `;
  }
};
__decorateClass$6([
  n$1({ attribute: false })
], PetkitLitterboxCommandsControl.prototype, "hass", 2);
__decorateClass$6([
  n$1({ attribute: false })
], PetkitLitterboxCommandsControl.prototype, "config", 2);
__decorateClass$6([
  n$1({ attribute: false })
], PetkitLitterboxCommandsControl.prototype, "stateObj", 2);
__decorateClass$6([
  n$1({ type: Boolean })
], PetkitLitterboxCommandsControl.prototype, "fill", 2);
__decorateClass$6([
  r()
], PetkitLitterboxCommandsControl.prototype, "_pending", 2);
PetkitLitterboxCommandsControl = __decorateClass$6([
  t$1("mushroom-petkit-litterbox-commands-control")
], PetkitLitterboxCommandsControl);
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$5(target, key, result);
  return result;
};
registerCustomCard({
  type: PETKIT_LITTERBOX_CARD_NAME,
  name: "Mushroom Petkit Litter-Box Card",
  description: "Scoop & deodorize your Petkit litter box (T5 Purobot Max Pro, T6 and others)"
});
let PetkitLitterboxCard = class extends MushroomBaseCard {
  static async getConfigElement() {
    await Promise.resolve().then(() => petkitLitterboxCardEditor);
    return document.createElement(
      PETKIT_LITTERBOX_CARD_EDITOR_NAME
    );
  }
  static async getStubConfig(hass) {
    const entities = Object.keys(hass.states);
    const candidates = entities.filter(
      (e2) => PETKIT_LITTERBOX_STATE_DOMAINS.includes(e2.split(".")[0]) && (e2.includes("litter") || e2.includes("state"))
    );
    return {
      type: `custom:${PETKIT_LITTERBOX_CARD_NAME}`,
      entity: candidates[0] ?? entities.find((e2) => e2.startsWith("sensor."))
    };
  }
  get hasControls() {
    if (!this._config) return false;
    return isCommandsControlVisible(this._config);
  }
  _handleAction(ev) {
    handleAction(this, this.hass, this._config, ev.detail.action);
  }
  render() {
    if (!this._config || !this.hass || !this._config.entity) {
      return A;
    }
    const stateObj = this._stateObj;
    if (!stateObj) {
      return this.renderNotFound(this._config);
    }
    const name = computeEntityName(this.hass, stateObj, this._config.name);
    const icon = this._config.icon;
    const appearance = computeAppearance(this._config);
    const picture = computeEntityPicture(stateObj, appearance.icon_type);
    const rtl = computeRTL(this.hass);
    return b`
      <ha-card
        class=${e$2({ "fill-container": appearance.fill_container })}
      >
        <mushroom-card .appearance=${appearance} ?rtl=${rtl}>
          <mushroom-state-item
            ?rtl=${rtl}
            .appearance=${appearance}
            @action=${this._handleAction}
            .actionHandler=${actionHandler({
      hasHold: hasAction(this._config.hold_action),
      hasDoubleClick: hasAction(this._config.double_tap_action)
    })}
          >
            ${picture ? this.renderPicture(picture) : this.renderIcon(stateObj, icon)}
            ${this.renderBadge(stateObj)}
            ${this.renderStateInfo(stateObj, appearance, name)};
          </mushroom-state-item>
          ${isCommandsControlVisible(this._config) ? b`
                <div class="actions" ?rtl=${rtl}>
                  <mushroom-petkit-litterbox-commands-control
                    .hass=${this.hass}
                    .config=${this._config}
                    .stateObj=${stateObj}
                    .fill=${appearance.layout !== "horizontal"}
                  >
                  </mushroom-petkit-litterbox-commands-control>
                </div>
              ` : A}
        </mushroom-card>
        ${this.renderFooter()}
      </ha-card>
    `;
  }
  renderFooter() {
    if (!this._config || !this.hass) return A;
    const items = [];
    const item1 = this._resolveFooterItem("footer_1");
    if (item1) items.push(item1);
    const item2 = this._resolveFooterItem("footer_2");
    if (item2) items.push(item2);
    if (items.length === 0) return A;
    return b`
      <div class="footer">
        ${items.map((item) => this.renderFooterChip(item))}
      </div>
    `;
  }
  _resolveFooterItem(prefix) {
    const cfg = this._config;
    const entity = cfg[`${prefix}_entity`];
    if (!entity) return void 0;
    return {
      entity,
      name: cfg[`${prefix}_name`],
      icon: cfg[`${prefix}_icon`],
      tap_action: cfg[`${prefix}_tap_action`]
    };
  }
  _handleFooterAction(item) {
    return (ev) => {
      handleAction(
        this,
        this.hass,
        {
          entity: item.entity,
          tap_action: item.tap_action ?? { action: "more-info" }
        },
        ev.detail.action
      );
    };
  }
  renderFooterChip(item) {
    const stateObj = this.hass.states[item.entity];
    const name = item.name ?? stateObj?.attributes.friendly_name ?? item.entity;
    const unit = stateObj?.attributes.unit_of_measurement;
    const stateText = stateObj ? unit ? `${stateObj.state} ${unit}` : stateObj.state : "unavailable";
    return b`
      <div
        class="footer-chip"
        role="button"
        tabindex="0"
        @action=${this._handleFooterAction(item)}
        .actionHandler=${actionHandler({
      hasHold: false,
      hasDoubleClick: false
    })}
      >
        <ha-state-icon
          .hass=${this.hass}
          .stateObj=${stateObj}
          .icon=${item.icon}
        ></ha-state-icon>
        <div class="footer-chip-info">
          <span class="footer-chip-name">${name}</span>
          <span class="footer-chip-state">${stateText}</span>
        </div>
      </div>
    `;
  }
  renderIcon(stateObj, icon) {
    const cleaning = isCleaningState(stateObj, this._config) && Boolean(this._config?.icon_animation);
    return b`
      <mushroom-shape-icon
        slot="icon"
        class=${e$2({ cleaning })}
        .disabled=${!isActive(stateObj)}
      >
        <ha-state-icon
          .hass=${this.hass}
          .stateObj=${stateObj}
          .icon=${icon}
        ></ha-state-icon>
      </mushroom-shape-icon>
    `;
  }
  static get styles() {
    return [
      super.styles,
      cardStyle,
      i$5`
        mushroom-state-item {
          cursor: pointer;
        }
        mushroom-shape-icon {
          --icon-color: rgb(var(--rgb-state-vacuum));
          --shape-color: rgba(var(--rgb-state-vacuum), 0.2);
        }
        .cleaning ha-state-icon {
          animation: 2s infinite linear cleaning;
        }
        @keyframes cleaning {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        ha-card {
          overflow: hidden;
        }
        mushroom-petkit-litterbox-commands-control {
          flex: 1;
        }
        .footer {
          display: flex;
          flex-direction: row;
          gap: 1px;
          background: var(--divider-color);
        }
        .footer-chip {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          padding: 16px 14px;
          background: var(--primary-background-color);
          cursor: pointer;
        }
        .footer-chip:focus-visible {
          outline: 2px solid var(--primary-color);
          outline-offset: -2px;
        }
        .footer-chip ha-state-icon {
          --mdc-icon-size: 20px;
          flex-shrink: 0;
          color: var(--secondary-text-color);
        }
        .footer-chip-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
        }
        .footer-chip-name {
          font-size: 11px;
          line-height: 1.4;
          color: var(--secondary-text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .footer-chip-state {
          font-size: 13px;
          font-weight: 500;
          line-height: 1.3;
          color: var(--primary-text-color);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `
    ];
  }
};
__decorateClass$5([
  r()
], PetkitLitterboxCard.prototype, "_config", 2);
PetkitLitterboxCard = __decorateClass$5([
  t$1(PETKIT_LITTERBOX_CARD_NAME)
], PetkitLitterboxCard);
const lovelaceCardConfigStruct = object({
  index: optional(number()),
  view_index: optional(number()),
  view_layout: any(),
  type: string(),
  layout_options: any(),
  grid_options: any(),
  visibility: any()
});
const petkitLitterboxTimelineCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  object({
    entity: string(),
    layout: optional(union([literal("vertical"), literal("horizontal")])),
    hours_to_show: optional(number()),
    header_title: optional(string()),
    show_header_icon: optional(boolean()),
    show_header_title: optional(boolean()),
    show_header_hours: optional(boolean()),
    label_idle: optional(string()),
    label_cleaning: optional(string()),
    label_scooping: optional(string()),
    label_dumping: optional(string()),
    label_leveling: optional(string()),
    label_odor_removal: optional(string()),
    label_deodorizing: optional(string()),
    label_maintenance: optional(string()),
    label_refreshing: optional(string()),
    label_resetting: optional(string()),
    label_paused: optional(string())
  })
);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
const STATE_META = {
  cleaning: { icon: "mdi:broom", cssClass: "state-clean" },
  scooping: { icon: "mdi:broom", cssClass: "state-clean" },
  dumping: { icon: "mdi:delete-empty", cssClass: "state-clean" },
  leveling: { icon: "mdi:layers-outline", cssClass: "state-clean" },
  odor_removal: { icon: "mdi:spray-bottle", cssClass: "state-odor" },
  deodorizing: { icon: "mdi:spray-bottle", cssClass: "state-odor" },
  maintenance: { icon: "mdi:tools", cssClass: "state-maint" },
  refreshing: { icon: "mdi:refresh", cssClass: "state-other" },
  resetting: { icon: "mdi:restart", cssClass: "state-other" },
  paused: { icon: "mdi:pause", cssClass: "state-idle" },
  idle: { icon: "mdi:sleep", cssClass: "state-idle" },
  error: { icon: "mdi:alert-circle", cssClass: "state-error" },
  fault: { icon: "mdi:alert-circle", cssClass: "state-error" }
};
const DEFAULT_META = {
  icon: "mdi:help-circle-outline",
  cssClass: "state-idle"
};
function getStateMeta(s2) {
  return STATE_META[s2] ?? DEFAULT_META;
}
function defaultLabel$1(s2) {
  return s2.charAt(0).toUpperCase() + s2.slice(1).replace(/_/g, " ");
}
function formatDuration(seconds) {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  const h2 = Math.floor(seconds / 3600);
  const m2 = Math.round(seconds % 3600 / 60);
  return m2 > 0 ? `${h2}h ${m2}m` : `${h2}h`;
}
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function processHistory(items) {
  if (!items.length) return [];
  const now = /* @__PURE__ */ new Date();
  return items.map((item, i4) => {
    const startTime = new Date(item.last_changed);
    const nextTime = i4 + 1 < items.length ? new Date(items[i4 + 1].last_changed) : now;
    const durationSeconds = (nextTime.getTime() - startTime.getTime()) / 1e3;
    return {
      state: item.state,
      startTime,
      durationSeconds,
      isCurrent: i4 === items.length - 1
    };
  }).reverse();
}
registerCustomCard({
  type: PETKIT_TIMELINE_CARD_NAME,
  name: "Mushroom Petkit Timeline Card",
  description: "Event history timeline for Petkit litter boxes"
});
let PetkitLitterboxTimelineCard = class extends i$2 {
  constructor() {
    super(...arguments);
    this._events = [];
    this._loading = false;
  }
  static async getConfigElement() {
    await Promise.resolve().then(() => petkitLitterboxTimelineCardEditor);
    return document.createElement(
      PETKIT_TIMELINE_CARD_EDITOR_NAME
    );
  }
  static async getStubConfig(hass) {
    const entities = Object.keys(hass.states);
    const candidate = entities.find(
      (e2) => PETKIT_LITTERBOX_STATE_DOMAINS.includes(e2.split(".")[0]) && (e2.includes("litter") || e2.includes("petkit") || e2.includes("state"))
    );
    return {
      type: `custom:${PETKIT_TIMELINE_CARD_NAME}`,
      entity: candidate ?? entities.find((e2) => e2.startsWith("sensor.")) ?? ""
    };
  }
  setConfig(config) {
    assert(config, petkitLitterboxTimelineCardConfigStruct);
    this._config = config;
  }
  getCardSize() {
    return this._config?.layout === "horizontal" ? 3 : 6;
  }
  updated(changedProps) {
    super.updated(changedProps);
    if (!this._config?.entity || !this.hass) return;
    if (changedProps.has("_config")) {
      void this._fetchHistory();
      return;
    }
    if (changedProps.has("hass")) {
      const oldHass = changedProps.get("hass");
      if (!oldHass) {
        void this._fetchHistory();
        return;
      }
      const id = this._config.entity;
      if (this.hass.states[id]?.last_changed !== oldHass.states[id]?.last_changed) {
        void this._fetchHistory();
      }
    }
  }
  /** Return custom label override if set, otherwise the default formatted string. */
  _stateLabel(s2) {
    const key = `label_${s2}`;
    const override = this._config[key];
    return override?.trim() || defaultLabel$1(s2);
  }
  async _fetchHistory() {
    if (!this._config?.entity || !this.hass) return;
    this._loading = true;
    try {
      const hours = this._config.hours_to_show ?? 12;
      const startTime = new Date(Date.now() - hours * 36e5);
      const eid = encodeURIComponent(this._config.entity);
      const raw = await this.hass.callApi(
        "GET",
        `history/period/${startTime.toISOString()}?filter_entity_id=${eid}&no_attributes=true&significant_changes_only=false`
      );
      this._events = processHistory(raw?.[0] ?? []);
    } catch (_2) {
      this._events = [];
    } finally {
      this._loading = false;
    }
  }
  render() {
    if (!this._config?.entity || !this.hass) return A;
    const stateObj = this.hass.states[this._config.entity];
    const entityName = stateObj?.attributes.friendly_name ?? this._config.entity;
    const hours = this._config.hours_to_show ?? 12;
    const layout = this._config.layout ?? "vertical";
    const showIcon = this._config.show_header_icon !== false;
    const showTitle = this._config.show_header_title !== false;
    const showHours = this._config.show_header_hours !== false;
    const headerTitle = this._config.header_title?.trim() || entityName;
    const showHeader = showIcon || showTitle || showHours;
    return b`
      <ha-card>
        ${showHeader ? b`
              <div class="card-header">
                ${showIcon ? b`<ha-icon class="header-icon" icon="mdi:history"></ha-icon>` : A}
                ${showTitle ? b`<span class="card-title">${headerTitle}</span>` : A}
                ${showHours ? b`<span class="hours-badge">${hours}h</span>` : A}
              </div>
            ` : A}
        <div class="card-content">
          ${this._loading ? b`<div class="placeholder">
                <div class="placeholder-icon">
                  <ha-icon icon="mdi:clock-outline"></ha-icon>
                </div>
              </div>` : this._events.length === 0 ? b`<div class="placeholder">
                <ha-icon icon="mdi:history"></ha-icon>
                <span>No events in the last ${hours}h</span>
              </div>` : layout === "horizontal" ? this._renderHorizontal() : this._renderVertical()}
        </div>
      </ha-card>
    `;
  }
  // ── Vertical ────────────────────────────────────────────────────────────────
  _renderVertical() {
    return b`
      <div class="timeline-v">
        ${this._events.map(
      (ev, i4) => this._renderVerticalItem(ev, i4 === this._events.length - 1)
    )}
      </div>
    `;
  }
  _renderVerticalItem(ev, isLast) {
    const meta = getStateMeta(ev.state);
    return b`
      <div class="v-item ${meta.cssClass}">
        <div class="v-rail">
          <div class="dot ${ev.isCurrent ? "current" : ""}"></div>
          ${!isLast ? b`<div class="v-line"></div>` : A}
        </div>
        <div class="v-content">
          <div class="ev-header">
            <div class="ev-icon">
              <ha-icon .icon=${meta.icon}></ha-icon>
            </div>
            <span class="ev-state">${this._stateLabel(ev.state)}</span>
            ${ev.isCurrent ? b`<span class="badge-now">Now</span>` : A}
          </div>
          <div class="ev-meta">
            <span class="ev-time">${formatTime(ev.startTime)}</span>
            <span class="ev-dur">${formatDuration(ev.durationSeconds)}</span>
          </div>
        </div>
      </div>
    `;
  }
  // ── Horizontal ──────────────────────────────────────────────────────────────
  _renderHorizontal() {
    const events = [...this._events].reverse();
    return b`
      <div class="timeline-h">
        ${events.map(
      (ev, i4) => this._renderHorizontalItem(ev, i4, events.length)
    )}
      </div>
    `;
  }
  _renderHorizontalItem(ev, index, total) {
    const meta = getStateMeta(ev.state);
    const isFirst = index === 0;
    const isLast = index === total - 1;
    return b`
      <div class="h-item ${meta.cssClass}">
        <div class="h-dot-row">
          <div class="${isFirst ? "h-spacer" : "h-line"}"></div>
          <div class="dot ${ev.isCurrent ? "current" : ""}"></div>
          <div class="${isLast ? "h-spacer" : "h-line"}"></div>
        </div>
        <div class="h-content">
          <div class="ev-icon">
            <ha-icon .icon=${meta.icon}></ha-icon>
          </div>
          <span class="h-state">${this._stateLabel(ev.state)}</span>
          <span class="h-time">${formatTime(ev.startTime)}</span>
          <span class="h-dur">${formatDuration(ev.durationSeconds)}</span>
        </div>
      </div>
    `;
  }
  // ── Styles ──────────────────────────────────────────────────────────────────
  static get styles() {
    return i$5`
      :host {
        display: block;
      }
      ha-card {
        overflow: hidden;
      }

      /* ── Header ── */
      .card-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 14px 16px 12px;
        border-bottom: 1px solid var(--divider-color);
      }
      .header-icon {
        --mdc-icon-size: 18px;
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }
      .card-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .hours-badge {
        font-size: 11px;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
        padding: 2px 8px;
        border-radius: 999px;
        flex-shrink: 0;
        letter-spacing: 0.3px;
        font-weight: 500;
      }

      /* ── Card content ── */
      .card-content {
        padding: 0;
      }

      /* ── Placeholder (loading / empty) ── */
      .placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 32px 16px;
        color: var(--secondary-text-color);
        font-size: 13px;
      }
      .placeholder ha-icon {
        --mdc-icon-size: 28px;
        opacity: 0.4;
      }
      .placeholder-icon ha-icon {
        --mdc-icon-size: 28px;
        opacity: 0.4;
        animation: spin 1.5s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* ── State color classes (inherit via CSS custom prop) ── */
      .state-clean { --ev-rgb: var(--rgb-state-vacuum, 3, 155, 229); }
      .state-odor  { --ev-rgb: 103, 58, 183; }
      .state-maint { --ev-rgb: 245, 158, 11; }
      .state-other { --ev-rgb: 59, 130, 246; }
      .state-idle  { --ev-rgb: var(--rgb-disabled-color, 158, 158, 158); }
      .state-error { --ev-rgb: 244, 67, 54; }

      /* ── Shared: dot ── */
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgb(var(--ev-rgb));
        box-shadow: 0 0 0 3px rgba(var(--ev-rgb), 0.2);
        flex-shrink: 0;
        position: relative;
        z-index: 1;
      }
      .dot.current {
        animation: pulse-dot 2.2s ease-in-out infinite;
      }
      @keyframes pulse-dot {
        0%, 100% { box-shadow: 0 0 0 3px rgba(var(--ev-rgb), 0.2); }
        50%       { box-shadow: 0 0 0 8px rgba(var(--ev-rgb), 0.32); }
      }

      /* ── Shared: event icon chip ── */
      .ev-icon {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: rgba(var(--ev-rgb), 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: rgb(var(--ev-rgb));
      }
      .ev-icon ha-icon {
        --mdc-icon-size: 14px;
      }

      /* ── Vertical layout ── */
      .timeline-v {
        padding: 16px 16px 8px;
        display: flex;
        flex-direction: column;
      }
      .v-item {
        display: grid;
        grid-template-columns: 22px 1fr;
        gap: 0 12px;
      }
      .v-rail {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 5px;
      }
      .v-line {
        width: 2px;
        flex: 1;
        min-height: 10px;
        background: var(--divider-color);
        margin-top: 5px;
      }
      .v-content {
        padding-bottom: 16px;
      }
      .ev-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .ev-state {
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-text-color);
        flex: 1;
      }
      .badge-now {
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: rgb(var(--ev-rgb));
        background: rgba(var(--ev-rgb), 0.12);
        padding: 2px 7px;
        border-radius: 999px;
        flex-shrink: 0;
      }
      .ev-meta {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 4px;
        padding-left: 34px;
      }
      .ev-time {
        font-size: 11px;
        color: var(--secondary-text-color);
      }
      .ev-dur {
        font-size: 11px;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
        padding: 1px 6px;
        border-radius: 999px;
      }

      /* ── Horizontal layout ── */
      .timeline-h {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        padding: 16px 0 16px;
      }
      .timeline-h::-webkit-scrollbar {
        display: none;
      }
      .h-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        min-width: 76px;
        max-width: 76px;
      }
      .h-item:first-child {
        padding-left: 16px;
        min-width: 92px;
        max-width: 92px;
      }
      .h-item:last-child {
        padding-right: 16px;
        min-width: 92px;
        max-width: 92px;
      }
      .h-dot-row {
        display: flex;
        align-items: center;
        width: 100%;
        height: 18px;
        margin-bottom: 8px;
      }
      .h-line {
        flex: 1;
        height: 2px;
        background: var(--divider-color);
      }
      .h-spacer {
        flex: 1;
      }
      .h-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        width: 100%;
        padding: 0 2px;
        box-sizing: border-box;
      }
      .h-state {
        font-size: 10px;
        font-weight: 600;
        color: var(--primary-text-color);
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }
      .h-time {
        font-size: 10px;
        color: var(--secondary-text-color);
        text-align: center;
        white-space: nowrap;
      }
      .h-dur {
        font-size: 10px;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
        padding: 1px 5px;
        border-radius: 999px;
        white-space: nowrap;
      }
    `;
  }
};
__decorateClass$4([
  n$1({ attribute: false })
], PetkitLitterboxTimelineCard.prototype, "hass", 2);
__decorateClass$4([
  r()
], PetkitLitterboxTimelineCard.prototype, "_config", 2);
__decorateClass$4([
  r()
], PetkitLitterboxTimelineCard.prototype, "_events", 2);
__decorateClass$4([
  r()
], PetkitLitterboxTimelineCard.prototype, "_loading", 2);
PetkitLitterboxTimelineCard = __decorateClass$4([
  t$1(PETKIT_TIMELINE_CARD_NAME)
], PetkitLitterboxTimelineCard);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n2 = "important", i3 = " !" + n2, o = e$3(class extends i$1 {
  constructor(t$12) {
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "style" !== t$12.name || t$12.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce((e2, r2) => {
      const s2 = t2[r2];
      return null == s2 ? e2 : e2 + `${r2 = r2.includes("-") ? r2 : r2.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s2};`;
    }, "");
  }
  update(e2, [r2]) {
    const { style: s2 } = e2.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r2)), this.render(r2);
    for (const t2 of this.ft) null == r2[t2] && (this.ft.delete(t2), t2.includes("-") ? s2.removeProperty(t2) : s2[t2] = null);
    for (const t2 in r2) {
      const e3 = r2[t2];
      if (null != e3) {
        this.ft.add(t2);
        const r3 = "string" == typeof e3 && e3.endsWith(i3);
        t2.includes("-") || r3 ? s2.setProperty(t2, r3 ? e3.slice(0, -11) : e3, r3 ? n2 : "") : s2[t2] = e3;
      }
    }
    return E;
  }
});
const petkitLitterboxDashboardCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  object({
    entity: string(),
    picture: optional(string()),
    show_name: optional(boolean()),
    camera_entity: optional(string()),
    camera_mode: optional(union([literal("snapshot"), literal("stream")])),
    camera_size: optional(number()),
    sensor_1_entity: optional(string()),
    sensor_1_name: optional(string()),
    sensor_1_icon: optional(string()),
    sensor_2_entity: optional(string()),
    sensor_2_name: optional(string()),
    sensor_2_icon: optional(string()),
    sensor_3_entity: optional(string()),
    sensor_3_name: optional(string()),
    sensor_3_icon: optional(string()),
    sensor_4_entity: optional(string()),
    sensor_4_name: optional(string()),
    sensor_4_icon: optional(string())
  })
);
const PETKIT_DEVICE_IMAGE_URL = "data:image/png;base64,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";
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
const STATE_ICONS = {
  cleaning: "mdi:broom",
  scooping: "mdi:broom",
  dumping: "mdi:delete-empty",
  leveling: "mdi:layers-outline",
  odor_removal: "mdi:spray-bottle",
  deodorizing: "mdi:spray-bottle",
  maintenance: "mdi:tools",
  refreshing: "mdi:refresh",
  resetting: "mdi:restart",
  paused: "mdi:pause",
  idle: "mdi:sleep",
  error: "mdi:alert-circle",
  fault: "mdi:alert-circle"
};
const STATE_RGB = {
  cleaning: "var(--rgb-state-vacuum, 3, 155, 229)",
  scooping: "var(--rgb-state-vacuum, 3, 155, 229)",
  dumping: "var(--rgb-state-vacuum, 3, 155, 229)",
  leveling: "var(--rgb-state-vacuum, 3, 155, 229)",
  odor_removal: "103, 58, 183",
  deodorizing: "103, 58, 183",
  maintenance: "245, 158, 11",
  refreshing: "59, 130, 246",
  resetting: "59, 130, 246",
  paused: "158, 158, 158",
  idle: "158, 158, 158",
  error: "244, 67, 54",
  fault: "244, 67, 54"
};
const DEFAULT_STATE_ICON = "mdi:help-circle-outline";
const DEFAULT_STATE_RGB = "158, 158, 158";
const ACTIVE_STATES = /* @__PURE__ */ new Set([
  "cleaning",
  "scooping",
  "dumping",
  "leveling",
  "odor_removal",
  "deodorizing",
  "maintenance",
  "refreshing",
  "resetting"
]);
const CIRCUMFERENCE = 2 * Math.PI * 26;
function ringDash(pct) {
  const filled = Math.min(100, Math.max(0, pct));
  return `${(CIRCUMFERENCE * filled / 100).toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}`;
}
function defaultLabel(s2) {
  return s2.charAt(0).toUpperCase() + s2.slice(1).replace(/_/g, " ");
}
registerCustomCard({
  type: PETKIT_DASHBOARD_CARD_NAME,
  name: "Mushroom Petkit Dashboard Card",
  description: "Device hero card with sensor stats for Petkit T5 Litterbox"
});
let PetkitLitterboxDashboardCard = class extends i$2 {
  static async getConfigElement() {
    await Promise.resolve().then(() => petkitLitterboxDashboardCardEditor);
    return document.createElement(
      PETKIT_DASHBOARD_CARD_EDITOR_NAME
    );
  }
  static getStubConfig() {
    return { type: `custom:${PETKIT_DASHBOARD_CARD_NAME}`, entity: "" };
  }
  setConfig(config) {
    assert(config, petkitLitterboxDashboardCardConfigStruct);
    this._config = config;
  }
  getCardSize() {
    return 5;
  }
  // ─── Render ────────────────────────────────────────────────────────────────
  render() {
    if (!this._config || !this.hass) return A;
    const stateObj = this.hass.states[this._config.entity];
    const picture = this._config.picture || stateObj?.attributes?.entity_picture;
    const sensors = [1, 2, 3, 4].map((n3) => ({
      pos: n3,
      entity: this._config[`sensor_${n3}_entity`],
      name: this._config[`sensor_${n3}_name`],
      icon: this._config[`sensor_${n3}_icon`]
    })).filter((s2) => s2.entity);
    const showName = this._config.show_name !== false;
    const friendlyName = stateObj?.attributes?.friendly_name ?? this._config.entity;
    return b`
      <ha-card>
        ${showName ? b`<div class="card-header">${friendlyName}</div>` : A}
        ${this._renderHero(picture, stateObj)}
        ${sensors.length > 0 ? b`
              <div class="sensors-row">
                ${sensors.map((s2) => this._renderSensor(s2.entity, s2.pos, s2.name, s2.icon))}
              </div>
            ` : A}
      </ha-card>
    `;
  }
  _renderHero(picture, stateObj) {
    const imgUrl = picture ?? PETKIT_DEVICE_IMAGE_URL;
    const cameraEntity = this._config.camera_entity;
    const cameraStateObj = cameraEntity ? this.hass.states[cameraEntity] : void 0;
    if (cameraStateObj) {
      return this._renderSplitHero(imgUrl, stateObj, cameraStateObj);
    }
    return b`
      <div class="hero" style=${o({ backgroundImage: `url('${imgUrl}')` })}>
        <div class="hero-gradient"></div>
        ${stateObj ? this._renderStateBadge(stateObj) : A}
      </div>
    `;
  }
  _renderSplitHero(imgUrl, stateObj, cameraStateObj) {
    const isStream = this._config.camera_mode === "stream";
    const snapshotUrl = `${cameraStateObj.attributes.entity_picture}&_t=${cameraStateObj.last_changed}`;
    const cameraSize = this._config.camera_size ?? 30;
    const gapPct = 15;
    const heroStyle = o({
      "--camera-size-pct": `${cameraSize}%`,
      "--camera-line-right": `${100 - cameraSize - gapPct}%`
    });
    return b`
      <div class="hero hero-split" style=${heroStyle}>
        <!-- Camera panel -->
        <div class="hero-camera">
          ${isStream ? b`
                <ha-camera-stream
                  .hass=${this.hass}
                  .stateObj=${cameraStateObj}
                  muted
                ></ha-camera-stream>
              ` : b`
                <img
                  class="camera-img"
                  src=${snapshotUrl}
                  alt="camera"
                  loading="lazy"
                />
              `}
        </div>

        <!-- Device image panel — never cropped -->
        <div
          class="hero-device"
          style=${o({ backgroundImage: `url('${imgUrl}')` })}
        >
          ${stateObj ? this._renderStateBadge(stateObj) : A}
        </div>
      </div>
    `;
  }
  _renderStateBadge(stateObj) {
    const s2 = stateObj.state;
    const rgb = STATE_RGB[s2] ?? DEFAULT_STATE_RGB;
    const icon = STATE_ICONS[s2] ?? DEFAULT_STATE_ICON;
    const label = defaultLabel(s2);
    const isActive2 = ACTIVE_STATES.has(s2);
    return b`
      <div class="state-badge">
        <span
          class="state-dot ${isActive2 ? "pulse" : ""}"
          style="background: rgb(${rgb});"
        ></span>
        <ha-icon class="state-icon" .icon=${icon}></ha-icon>
        <span class="state-label">${label}</span>
      </div>
    `;
  }
  _renderSensor(entityId, pos, nameOverride, iconOverride) {
    const stateObj = this.hass.states[entityId];
    if (!stateObj) {
      return b`<div class="sensor-chip chip-${pos} unavailable"></div>`;
    }
    const unit = stateObj.attributes?.unit_of_measurement ?? "";
    const label = nameOverride || stateObj.attributes?.friendly_name || entityId;
    const icon = iconOverride || stateObj.attributes?.icon || "mdi:gauge";
    if (unit === "%") {
      const pct = parseFloat(stateObj.state);
      return this._renderRingChip(stateObj, isNaN(pct) ? 0 : pct, pos, label, icon);
    }
    return this._renderIconChip(stateObj, pos, label, icon, unit);
  }
  _renderRingChip(stateObj, pct, pos, label, icon) {
    return b`
      <div class="sensor-chip chip-${pos}">
        <div class="ring-wrap">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Track -->
            <circle
              cx="32" cy="32" r="26"
              stroke="var(--divider-color, rgba(0,0,0,0.12))"
              stroke-width="3.5"
            />
            <!-- Progress -->
            <circle
              cx="32" cy="32" r="26"
              stroke="rgb(var(--chip-rgb))"
              stroke-width="3.5"
              stroke-linecap="round"
              stroke-dasharray="${ringDash(pct)}"
              transform="rotate(-90 32 32)"
            />
          </svg>
          <div class="ring-icon">
            <ha-icon .icon=${icon}></ha-icon>
          </div>
        </div>
        <div class="chip-value">${stateObj.state}<span class="chip-unit">%</span></div>
        <div class="chip-label">${label}</div>
      </div>
    `;
  }
  _renderIconChip(stateObj, pos, label, icon, unit) {
    return b`
      <div class="sensor-chip chip-${pos}">
        <div class="icon-circle">
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="chip-value">
          ${stateObj.state}${unit ? b`<span class="chip-unit"> ${unit}</span>` : A}
        </div>
        <div class="chip-label">${label}</div>
      </div>
    `;
  }
  // ─── Styles ────────────────────────────────────────────────────────────────
  static get styles() {
    return i$5`
      ha-card {
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
        padding-bottom: 16px;
      }

      .card-header {
        padding: 16px 16px 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--secondary-text-color);
        letter-spacing: 0.02em;
        text-transform: uppercase;
      }

      /* ── Hero image area ── */
      .hero {
        position: relative;
        width: 100%;
        height: 220px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
        overflow: hidden;
      }

      /* ── Split layout: CSS Grid (camera | gap | device) ── */
      .hero.hero-split {
        display: grid;
        grid-template-columns: var(--camera-size-pct, 30%) 1fr;
        column-gap: 15%;
        align-items: stretch;
        background: var(--ha-card-background, var(--card-background-color, #111));
        position: relative;
      }

      /* Line lives in the column-gap area: camera ends at 44%, gap = 15%, device starts at 59% */
      .hero.hero-split::before {
        content: '';
        position: absolute;
        left: var(--camera-size-pct, 30%);
        right: var(--camera-line-right, 55%);
        top: 50%;
        height: 2px;
        background: rgba(255, 255, 255, 0.55);
        z-index: 0;
        pointer-events: none;
      }

      .hero-camera {
        position: relative;
        overflow: hidden;
        background: var(--ha-card-background, var(--card-background-color, #111));
        z-index: 1;
      }

      .camera-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .hero-camera ha-camera-stream {
        width: 100%;
        height: 100%;
        display: block;
      }

      /* ── Device panel: ALWAYS contain — never cropped ── */
      .hero-device {
        z-index: 1;
        position: relative;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: var(--ha-card-background, var(--card-background-color, #111));
      }

      /* State badge sits inside .hero or .hero-device (both position:relative) */

      .hero-gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to bottom,
          transparent 40%,
          rgba(0, 0, 0, 0.32) 100%
        );
        pointer-events: none;
      }

      /* ── Glass state badge ── */
      .state-badge {
        position: absolute;
        bottom: 14px;
        left: 14px;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 7px 14px 7px 10px;
        border-radius: 999px;
        background: rgba(10, 10, 20, 0.55);
        backdrop-filter: blur(12px) saturate(1.5);
        -webkit-backdrop-filter: blur(12px) saturate(1.5);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: white;
        font-size: 13px;
        font-weight: 500;
        line-height: 1;
        pointer-events: none;
      }

      .state-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .state-dot.pulse {
        animation: dot-pulse 1.4s ease-in-out infinite;
      }

      @keyframes dot-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.75); }
      }

      .state-icon {
        --mdc-icon-size: 16px;
        opacity: 0.85;
      }

      .state-label {
        white-space: nowrap;
      }

      /* ── Sensor strip ── */
      .sensors-row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
        padding: 20px 8px 4px;
        gap: 4px;
      }

      /* ── Chip base ── */
      .sensor-chip {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        flex: 1;
        min-width: 0;
      }

      /* ── Per-slot accent colors ── */
      .chip-1 { --chip-rgb: var(--rgb-state-vacuum, 3, 155, 229); }
      .chip-2 { --chip-rgb: 76, 175, 80; }
      .chip-3 { --chip-rgb: 255, 152, 0; }
      .chip-4 { --chip-rgb: 156, 39, 176; }

      /* ── SVG ring chip ── */
      .ring-wrap {
        position: relative;
        width: 64px;
        height: 64px;
      }

      .ring-wrap svg {
        width: 64px;
        height: 64px;
        display: block;
      }

      .ring-icon {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--chip-rgb));
      }

      .ring-icon ha-icon {
        --mdc-icon-size: 20px;
      }

      /* ── Icon circle chip ── */
      .icon-circle {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: rgba(var(--chip-rgb), 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(var(--chip-rgb));
      }

      .icon-circle ha-icon {
        --mdc-icon-size: 24px;
      }

      /* ── Chip text ── */
      .chip-value {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        line-height: 1;
        text-align: center;
      }

      .chip-unit {
        font-size: 11px;
        font-weight: 400;
        color: var(--secondary-text-color);
      }

      .chip-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        text-align: center;
        line-height: 1.2;
        max-width: 72px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .sensor-chip.unavailable {
        opacity: 0.3;
      }
    `;
  }
};
__decorateClass$3([
  n$1({ attribute: false })
], PetkitLitterboxDashboardCard.prototype, "hass", 2);
__decorateClass$3([
  r()
], PetkitLitterboxDashboardCard.prototype, "_config", 2);
PetkitLitterboxDashboardCard = __decorateClass$3([
  t$1(PETKIT_DASHBOARD_CARD_NAME)
], PetkitLitterboxDashboardCard);
console.info(
  "%c🐾 Petkit Lovelace Cards %c1.0.0",
  "color: #ef5350; font-weight: 700;",
  "font-weight: 400;"
);
const actionsSharedConfigStruct = object({
  tap_action: optional(actionConfigStruct),
  hold_action: optional(actionConfigStruct),
  double_tap_action: optional(actionConfigStruct)
});
const computeActionsFormSchema = (actions) => {
  return [
    {
      name: "tap_action",
      selector: { ui_action: { actions } }
    },
    {
      name: "hold_action",
      selector: { ui_action: { actions } }
    },
    {
      name: "double_tap_action",
      selector: { ui_action: { actions } }
    }
  ];
};
const LAYOUTS = ["default", "horizontal", "vertical"];
const layoutStruct = union([
  literal("horizontal"),
  literal("vertical"),
  literal("default")
]);
const appearanceSharedConfigStruct = object({
  layout: optional(layoutStruct),
  fill_container: optional(boolean()),
  primary_info: optional(enums(INFOS)),
  secondary_info: optional(enums(INFOS)),
  icon_type: optional(enums(ICON_TYPES))
});
function capitalizeFirstLetter(string2) {
  return string2.charAt(0).toUpperCase() + string2.slice(1);
}
function computeInfoOptions(customLocalize) {
  return INFOS.map((info) => ({
    value: info,
    label: customLocalize(`editor.form.info_picker.values.${info}`) || capitalizeFirstLetter(info)
  }));
}
function computeIconTypeOptions(customLocalize) {
  return ICON_TYPES.map((iconType) => ({
    value: iconType,
    label: customLocalize(`editor.form.icon_type_picker.values.${iconType}`) || capitalizeFirstLetter(iconType)
  }));
}
function computeLayoutOptions(customLocalize) {
  return LAYOUTS.map((layout) => ({
    value: layout,
    label: customLocalize(`editor.form.layout_picker.values.${layout}`)
  }));
}
function computeAppearanceFormSchema(customLocalize) {
  return [
    {
      type: "grid",
      name: "",
      schema: [
        {
          name: "layout",
          selector: {
            select: {
              options: computeLayoutOptions(customLocalize),
              mode: "dropdown"
            }
          }
        },
        { name: "fill_container", selector: { boolean: {} } }
      ]
    },
    {
      type: "grid",
      name: "",
      schema: [
        {
          name: "primary_info",
          selector: {
            select: {
              options: computeInfoOptions(customLocalize),
              mode: "dropdown"
            }
          }
        },
        {
          name: "secondary_info",
          selector: {
            select: {
              options: computeInfoOptions(customLocalize),
              mode: "dropdown"
            }
          }
        },
        {
          name: "icon_type",
          selector: {
            select: {
              options: computeIconTypeOptions(customLocalize),
              mode: "dropdown"
            }
          }
        }
      ]
    }
  ];
}
const GENERIC_LABELS = [
  "color",
  "icon_color",
  "layout",
  "fill_container",
  "primary_info",
  "secondary_info",
  "icon_type",
  "content_info",
  "use_entity_picture",
  "collapsible_controls",
  "icon_animation",
  "picture"
];
const computeNameSchema = (version) => atLeastVersion(version, 2026, 4) ? {
  name: "name",
  selector: { entity_name: {} },
  context: { entity: "entity" }
} : { name: "name", selector: { text: {} } };
const loadHaComponents = () => {
  if (!customElements.get("ha-form") || !customElements.get("hui-card-features-editor")) {
    customElements.get("hui-tile-card")?.getConfigElement();
  }
  if (!customElements.get("ha-entity-picker")) {
    customElements.get("hui-entities-card")?.getConfigElement();
  }
  if (!customElements.get("ha-card-conditions-editor")) {
    customElements.get("hui-conditional-card")?.getConfigElement();
  }
};
const entityNameItemStruct = union([
  object({ type: enums(["entity", "device", "area", "floor"]) }),
  object({ type: literal("text"), text: string() })
]);
const entityNameStruct = union([
  string(),
  entityNameItemStruct,
  array(entityNameItemStruct)
]);
const entitySharedConfigStruct = object({
  entity: optional(string()),
  name: optional(entityNameStruct),
  icon: optional(string())
});
const PETKIT_LITTERBOX_ACTIONS = [
  "scoop",
  "deodorize",
  "level_litter",
  "maintenance"
];
const petkitLitterboxCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  assign(
    entitySharedConfigStruct,
    appearanceSharedConfigStruct,
    actionsSharedConfigStruct
  ),
  object({
    icon_animation: optional(boolean()),
    actions: optional(array(string())),
    scoop_entity: optional(string()),
    deodorize_entity: optional(string()),
    level_litter_entity: optional(string()),
    maintenance_entity: optional(string()),
    active_states: optional(array(string())),
    footer_1_entity: optional(string()),
    footer_1_name: optional(string()),
    footer_1_icon: optional(string()),
    footer_1_tap_action: optional(actionConfigStruct),
    footer_2_entity: optional(string()),
    footer_2_name: optional(string()),
    footer_2_icon: optional(string()),
    footer_2_tap_action: optional(actionConfigStruct)
  })
);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
const PETKIT_LITTERBOX_LABELS = [
  "actions",
  "icon_animation",
  "active_states",
  "scoop_entity",
  "deodorize_entity",
  "level_litter_entity",
  "maintenance_entity",
  "footer_1",
  "footer_2"
];
const computeSchema$2 = memoizeOne(
  (localize, customLocalize, version) => [
    {
      name: "entity",
      selector: { entity: { domain: PETKIT_LITTERBOX_STATE_DOMAINS } }
    },
    computeNameSchema(version),
    {
      type: "grid",
      name: "",
      schema: [
        {
          name: "icon",
          selector: { icon: {} },
          context: { icon_entity: "entity" }
        },
        { name: "icon_animation", selector: { boolean: {} } }
      ]
    },
    ...computeAppearanceFormSchema(customLocalize),
    {
      type: "grid",
      name: "",
      schema: [
        {
          name: "scoop_entity",
          selector: { entity: { domain: ["button", "script"] } }
        },
        {
          name: "deodorize_entity",
          selector: { entity: { domain: ["button", "script"] } }
        },
        {
          name: "level_litter_entity",
          selector: { entity: { domain: ["button", "script"] } }
        },
        {
          name: "maintenance_entity",
          selector: { entity: { domain: ["button", "script"] } }
        }
      ]
    },
    {
      name: "actions",
      selector: {
        select: {
          mode: "list",
          multiple: true,
          options: PETKIT_LITTERBOX_ACTIONS.map((action) => ({
            value: action,
            label: customLocalize(
              `editor.card.petkit_litterbox.actions_list.${action}`
            )
          }))
        }
      }
    },
    {
      name: "active_states",
      selector: {
        select: {
          mode: "list",
          multiple: true,
          custom_value: true,
          options: [
            "cleaning",
            "scooping",
            "dumping",
            "leveling",
            "odor_removal",
            "deodorizing",
            "maintenance",
            "refreshing",
            "paused",
            "resetting"
          ].map((s2) => ({ value: s2, label: s2 }))
        }
      }
    },
    {
      type: "expandable",
      name: "footer_1",
      flatten: true,
      title: customLocalize("editor.card.petkit_litterbox.footer_1"),
      icon: "mdi:view-headline",
      schema: [
        { name: "footer_1_entity", selector: { entity: {} } },
        { name: "footer_1_name", selector: { text: {} } },
        {
          name: "footer_1_icon",
          selector: { icon: {} },
          context: { icon_entity: "footer_1_entity" }
        },
        {
          name: "footer_1_tap_action",
          selector: { ui_action: { default_action: "more-info" } }
        }
      ]
    },
    {
      type: "expandable",
      name: "footer_2",
      flatten: true,
      title: customLocalize("editor.card.petkit_litterbox.footer_2"),
      icon: "mdi:view-headline",
      schema: [
        { name: "footer_2_entity", selector: { entity: {} } },
        { name: "footer_2_name", selector: { text: {} } },
        {
          name: "footer_2_icon",
          selector: { icon: {} },
          context: { icon_entity: "footer_2_entity" }
        },
        {
          name: "footer_2_tap_action",
          selector: { ui_action: { default_action: "more-info" } }
        }
      ]
    },
    ...computeActionsFormSchema()
  ]
);
let PetkitLitterboxCardEditor = class extends MushroomBaseElement {
  constructor() {
    super(...arguments);
    this._computeLabel = (schema) => {
      const customLocalize = setupCustomlocalize(this.hass);
      const bareName = schema.name.replace(/^footer_[12]_/, "");
      if (GENERIC_LABELS.includes(schema.name)) {
        return customLocalize(`editor.card.generic.${schema.name}`);
      }
      if (PETKIT_LITTERBOX_LABELS.includes(schema.name)) {
        return customLocalize(`editor.card.petkit_litterbox.${schema.name}`);
      }
      return this.hass.localize(
        `ui.panel.lovelace.editor.card.generic.${bareName}`
      );
    };
  }
  connectedCallback() {
    super.connectedCallback();
    void loadHaComponents();
  }
  setConfig(config) {
    assert(config, petkitLitterboxCardConfigStruct);
    this._config = config;
  }
  render() {
    if (!this.hass || !this._config) {
      return A;
    }
    const customLocalize = setupCustomlocalize(this.hass);
    const schema = computeSchema$2(
      this.hass.localize,
      customLocalize,
      this.hass.config.version
    );
    return b`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
  _valueChanged(ev) {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
};
__decorateClass$2([
  r()
], PetkitLitterboxCardEditor.prototype, "_config", 2);
PetkitLitterboxCardEditor = __decorateClass$2([
  t$1(PETKIT_LITTERBOX_CARD_EDITOR_NAME)
], PetkitLitterboxCardEditor);
const petkitLitterboxCardEditor = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get PetkitLitterboxCardEditor() {
    return PetkitLitterboxCardEditor;
  }
}, Symbol.toStringTag, { value: "Module" }));
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
const TIMELINE_LABELS = [
  "hours_to_show",
  "layout",
  "header_title",
  "show_header_icon",
  "show_header_title",
  "show_header_hours",
  "label_idle",
  "label_cleaning",
  "label_scooping",
  "label_dumping",
  "label_leveling",
  "label_odor_removal",
  "label_deodorizing",
  "label_maintenance",
  "label_refreshing",
  "label_resetting",
  "label_paused"
];
const computeSchema$1 = memoizeOne(
  (_localize, customLocalize) => [
    {
      name: "entity",
      selector: { entity: { domain: PETKIT_LITTERBOX_STATE_DOMAINS } }
    },
    {
      name: "layout",
      selector: {
        select: {
          mode: "list",
          options: [
            {
              value: "vertical",
              label: customLocalize(
                "editor.card.petkit_litterbox_timeline.layout_vertical"
              )
            },
            {
              value: "horizontal",
              label: customLocalize(
                "editor.card.petkit_litterbox_timeline.layout_horizontal"
              )
            }
          ]
        }
      }
    },
    {
      name: "hours_to_show",
      selector: {
        number: {
          min: 1,
          max: 168,
          step: 1,
          unit_of_measurement: "h",
          mode: "box"
        }
      }
    },
    // ── Header options ────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "header_section",
      flatten: true,
      icon: "mdi:page-layout-header",
      title: customLocalize(
        "editor.card.petkit_litterbox_timeline.header_section"
      ),
      schema: [
        { name: "header_title", selector: { text: {} } },
        {
          type: "grid",
          name: "",
          schema: [
            { name: "show_header_icon", selector: { boolean: {} } },
            { name: "show_header_title", selector: { boolean: {} } },
            { name: "show_header_hours", selector: { boolean: {} } }
          ]
        }
      ]
    },
    // ── State label overrides ─────────────────────────────────────────────────
    {
      type: "expandable",
      name: "labels_section",
      flatten: true,
      icon: "mdi:label-outline",
      title: customLocalize(
        "editor.card.petkit_litterbox_timeline.labels_section"
      ),
      schema: [
        {
          type: "grid",
          name: "",
          schema: [
            { name: "label_idle", selector: { text: {} } },
            { name: "label_cleaning", selector: { text: {} } },
            { name: "label_scooping", selector: { text: {} } },
            { name: "label_dumping", selector: { text: {} } },
            { name: "label_leveling", selector: { text: {} } },
            { name: "label_odor_removal", selector: { text: {} } },
            { name: "label_deodorizing", selector: { text: {} } },
            { name: "label_maintenance", selector: { text: {} } },
            { name: "label_refreshing", selector: { text: {} } },
            { name: "label_resetting", selector: { text: {} } },
            { name: "label_paused", selector: { text: {} } }
          ]
        }
      ]
    }
  ]
);
let PetkitLitterboxTimelineCardEditor = class extends MushroomBaseElement {
  constructor() {
    super(...arguments);
    this._computeLabel = (schema) => {
      const customLocalize = setupCustomlocalize(this.hass);
      if (GENERIC_LABELS.includes(schema.name)) {
        return customLocalize(`editor.card.generic.${schema.name}`);
      }
      if (TIMELINE_LABELS.includes(schema.name)) {
        return customLocalize(
          `editor.card.petkit_litterbox_timeline.${schema.name}`
        );
      }
      return this.hass.localize(
        `ui.panel.lovelace.editor.card.generic.${schema.name}`
      );
    };
  }
  connectedCallback() {
    super.connectedCallback();
    void loadHaComponents();
  }
  setConfig(config) {
    assert(config, petkitLitterboxTimelineCardConfigStruct);
    this._config = config;
  }
  render() {
    if (!this.hass || !this._config) return A;
    const customLocalize = setupCustomlocalize(this.hass);
    const schema = computeSchema$1(this.hass.localize, customLocalize);
    return b`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
  _valueChanged(ev) {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
};
__decorateClass$1([
  r()
], PetkitLitterboxTimelineCardEditor.prototype, "_config", 2);
PetkitLitterboxTimelineCardEditor = __decorateClass$1([
  t$1(PETKIT_TIMELINE_CARD_EDITOR_NAME)
], PetkitLitterboxTimelineCardEditor);
const petkitLitterboxTimelineCardEditor = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get PetkitLitterboxTimelineCardEditor() {
    return PetkitLitterboxTimelineCardEditor;
  }
}, Symbol.toStringTag, { value: "Module" }));
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
const DASHBOARD_LABELS = [
  "picture",
  "show_name",
  "camera_entity",
  "camera_mode",
  "camera_size",
  "sensor_1_entity",
  "sensor_1_name",
  "sensor_1_icon",
  "sensor_2_entity",
  "sensor_2_name",
  "sensor_2_icon",
  "sensor_3_entity",
  "sensor_3_name",
  "sensor_3_icon",
  "sensor_4_entity",
  "sensor_4_name",
  "sensor_4_icon"
];
const computeSchema = memoizeOne(
  (_localize, customLocalize) => [
    {
      name: "entity",
      selector: { entity: { domain: PETKIT_LITTERBOX_STATE_DOMAINS } }
    },
    { name: "picture", selector: { text: {} } },
    { name: "show_name", selector: { boolean: {} } },
    // ── Camera panel ──────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "camera_section",
      flatten: true,
      icon: "mdi:camera",
      title: customLocalize(
        "editor.card.petkit_litterbox_dashboard.camera_section"
      ),
      schema: [
        { name: "camera_entity", selector: { entity: { domain: ["camera"] } } },
        {
          name: "camera_mode",
          selector: {
            select: {
              mode: "list",
              options: [
                {
                  value: "snapshot",
                  label: customLocalize(
                    "editor.card.petkit_litterbox_dashboard.camera_mode_snapshot"
                  )
                },
                {
                  value: "stream",
                  label: customLocalize(
                    "editor.card.petkit_litterbox_dashboard.camera_mode_stream"
                  )
                }
              ]
            }
          }
        },
        {
          name: "camera_size",
          selector: {
            number: {
              min: 15,
              max: 55,
              step: 5,
              unit_of_measurement: "%",
              mode: "slider"
            }
          }
        }
      ]
    },
    // ── Sensor 1 ──────────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "sensor_1_section",
      flatten: true,
      icon: "mdi:numeric-1-circle-outline",
      title: customLocalize(
        "editor.card.petkit_litterbox_dashboard.sensor_1_section"
      ),
      schema: [
        {
          name: "sensor_1_entity",
          selector: { entity: {} }
        },
        { name: "sensor_1_name", selector: { text: {} } },
        {
          name: "sensor_1_icon",
          selector: {
            icon: {}
          },
          context: { icon_entity: "sensor_1_entity" }
        }
      ]
    },
    // ── Sensor 2 ──────────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "sensor_2_section",
      flatten: true,
      icon: "mdi:numeric-2-circle-outline",
      title: customLocalize(
        "editor.card.petkit_litterbox_dashboard.sensor_2_section"
      ),
      schema: [
        {
          name: "sensor_2_entity",
          selector: { entity: {} }
        },
        { name: "sensor_2_name", selector: { text: {} } },
        {
          name: "sensor_2_icon",
          selector: {
            icon: {}
          },
          context: { icon_entity: "sensor_2_entity" }
        }
      ]
    },
    // ── Sensor 3 ──────────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "sensor_3_section",
      flatten: true,
      icon: "mdi:numeric-3-circle-outline",
      title: customLocalize(
        "editor.card.petkit_litterbox_dashboard.sensor_3_section"
      ),
      schema: [
        {
          name: "sensor_3_entity",
          selector: { entity: {} }
        },
        { name: "sensor_3_name", selector: { text: {} } },
        {
          name: "sensor_3_icon",
          selector: {
            icon: {}
          },
          context: { icon_entity: "sensor_3_entity" }
        }
      ]
    },
    // ── Sensor 4 ──────────────────────────────────────────────────────────────
    {
      type: "expandable",
      name: "sensor_4_section",
      flatten: true,
      icon: "mdi:numeric-4-circle-outline",
      title: customLocalize(
        "editor.card.petkit_litterbox_dashboard.sensor_4_section"
      ),
      schema: [
        {
          name: "sensor_4_entity",
          selector: { entity: {} }
        },
        { name: "sensor_4_name", selector: { text: {} } },
        {
          name: "sensor_4_icon",
          selector: {
            icon: {}
          },
          context: { icon_entity: "sensor_4_entity" }
        }
      ]
    }
  ]
);
let PetkitLitterboxDashboardCardEditor = class extends MushroomBaseElement {
  constructor() {
    super(...arguments);
    this._computeLabel = (schema) => {
      const customLocalize = setupCustomlocalize(this.hass);
      if (GENERIC_LABELS.includes(schema.name)) {
        return customLocalize(`editor.card.generic.${schema.name}`);
      }
      if (DASHBOARD_LABELS.includes(schema.name)) {
        return customLocalize(
          `editor.card.petkit_litterbox_dashboard.${schema.name}`
        );
      }
      return this.hass.localize(
        `ui.panel.lovelace.editor.card.generic.${schema.name}`
      );
    };
  }
  connectedCallback() {
    super.connectedCallback();
    void loadHaComponents();
  }
  setConfig(config) {
    assert(config, petkitLitterboxDashboardCardConfigStruct);
    this._config = config;
  }
  render() {
    if (!this.hass || !this._config) return A;
    const customLocalize = setupCustomlocalize(this.hass);
    const schema = computeSchema(this.hass.localize, customLocalize);
    return b`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
  _valueChanged(ev) {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
};
__decorateClass([
  r()
], PetkitLitterboxDashboardCardEditor.prototype, "_config", 2);
PetkitLitterboxDashboardCardEditor = __decorateClass([
  t$1(PETKIT_DASHBOARD_CARD_EDITOR_NAME)
], PetkitLitterboxDashboardCardEditor);
const petkitLitterboxDashboardCardEditor = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get PetkitLitterboxDashboardCardEditor() {
    return PetkitLitterboxDashboardCardEditor;
  }
}, Symbol.toStringTag, { value: "Module" }));
