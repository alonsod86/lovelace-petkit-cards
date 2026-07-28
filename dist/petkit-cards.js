/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = globalThis, e$6 = t$3.ShadowRoot && (void 0 === t$3.ShadyCSS || t$3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$4 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$6 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$4.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$4.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$4 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s$2);
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
const { is: i$3, defineProperty: e$5, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$3, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$2 = a$1.trustedTypes, l$1 = c$2 ? c$2.emptyScript : "", p$3 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
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
  let i3 = t2;
  switch (s2) {
    case Boolean:
      i3 = null !== t2;
      break;
    case Number:
      i3 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i3 = JSON.parse(t2);
      } catch (t3) {
        i3 = null;
      }
  }
  return i3;
} }, f$3 = (t2, s2) => !i$3(t2, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$3 };
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
      const i3 = Symbol(), h2 = this.getPropertyDescriptor(t2, i3, s2);
      void 0 !== h2 && e$5(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i3) {
    const { get: e2, set: r2 } = h$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2?.call(this);
      r2?.call(this, s3), this.requestUpdate(t2, h2, i3);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$3(t3), ...o$3(t3)];
      for (const i3 of s2) this.createProperty(i3, t3[i3]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i3] of s2) this.elementProperties.set(t3, i3);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i3 = this._$Eu(t3, s2);
      void 0 !== i3 && this._$Eh.set(i3, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i3 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i3.unshift(c$3(s3));
    } else void 0 !== s2 && i3.push(c$3(s2));
    return i3;
  }
  static _$Eu(t2, s2) {
    const i3 = s2.attribute;
    return false === i3 ? void 0 : "string" == typeof i3 ? i3 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
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
    for (const i3 of s2.keys()) this.hasOwnProperty(i3) && (t2.set(i3, this[i3]), delete this[i3]);
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
  attributeChangedCallback(t2, s2, i3) {
    this._$AK(t2, i3);
  }
  _$ET(t2, s2) {
    const i3 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i3);
    if (void 0 !== e2 && true === i3.reflect) {
      const h2 = (void 0 !== i3.converter?.toAttribute ? i3.converter : u$1).toAttribute(s2, i3.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    const i3 = this.constructor, e2 = i3._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i3.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== t3.converter?.fromAttribute ? t3.converter : u$1;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? this._$Ej?.get(e2) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i3, e2 = false, h2) {
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i3 ??= r2.getPropertyOptions(t2), !((i3.hasChanged ?? f$3)(h2, s2) || i3.useDefault && i3.reflect && h2 === this._$Ej?.get(t2) && !this.hasAttribute(r2._$Eu(t2, i3)))) return;
      this.C(t2, s2, i3);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i3, reflect: e2, wrapped: h2 }, r2) {
    i3 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i3 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t2));
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
      if (t3.size > 0) for (const [s3, i3] of t3) {
        const { wrapped: t4 } = i3, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i3, e2);
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
const t$2 = globalThis, i$2 = (t2) => t2, s$1 = t$2.trustedTypes, e$4 = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h = "$lit$", o$2 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$1 = "?" + o$2, r$2 = `<${n$1}>`, l = document, c$1 = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, d = (t2) => u(t2) || "function" == typeof t2?.[Symbol.iterator], f$2 = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p$2 = RegExp(`>|${f$2}(?:([^\\s"'>=/]+)(${f$2}*=${f$2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i3, ...s2) => ({ _$litType$: t2, strings: i3, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t2, i3) {
  if (!u(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e$4 ? e$4.createHTML(i3) : i3;
}
const N = (t2, i3) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i3 ? "<svg>" : 3 === i3 ? "<math>" : "", c2 = v;
  for (let i4 = 0; i4 < s2; i4++) {
    const s3 = t2[i4];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p$2) : void 0 !== u2[3] && (c2 = p$2) : c2 === p$2 ? ">" === u2[0] ? (c2 = n3 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p$2 : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p$2 : c2 === _ || c2 === m ? c2 = v : (c2 = p$2, n3 = void 0);
    const x2 = c2 === p$2 && t2[i4 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r$2 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h + s3.slice(d2) + o$2 + x2) : s3 + o$2 + (-2 === d2 ? i4 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i3 ? "</svg>" : 3 === i3 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i3 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i3);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i3 || 3 === i3) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h)) {
          const i4 = v2[a2++], s2 = r2.getAttribute(t3).split(o$2), e3 = /([.?@])?(.*)/.exec(i4);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$2) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$2), i4 = t3.length - 1;
          if (i4 > 0) {
            r2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i4; s2++) r2.append(t3[s2], c$1()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i4], c$1());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$1) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$2, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$2.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i3) {
    const s2 = l.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M$1(t2, i3, s2 = t2, e2) {
  if (i3 === E) return i3;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = a(i3) ? void 0 : i3._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ??= [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i3 = M$1(t2, h2._$AS(t2, i3.values), h2, e2)), i3;
}
class R {
  constructor(t2, i3) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i3 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? l).importNode(i3, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i4;
        2 === r2.type ? i4 = new k$2(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i4 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i4 = new Z(h2, this, t2)), this._$AV.push(i4), r2 = s2[++n3];
      }
      o2 !== r2?.index && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e2;
  }
  p(t2) {
    let i3 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i3), i3 += s2.strings.length - 2) : s2._$AI(t2[i3])), i3++;
  }
}
let k$2 = class k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i3, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i3, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === t2?.nodeType && (t2 = i3.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i3 = this) {
    t2 = M$1(this, t2, i3), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
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
    const { values: i3, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2) this._$AH.p(i3);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i3), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i3 = C.get(t2.strings);
    return void 0 === i3 && C.set(t2.strings, i3 = new S(t2)), i3;
  }
  k(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i3.length ? i3.push(s2 = new k(this.O(c$1()), this.O(c$1()), this, this.options)) : s2 = i3[e2], s2._$AI(h2), e2++;
    e2 < i3.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i3.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    for (this._$AP?.(false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$2(t2).nextSibling;
      i$2(t2).remove(), t2 = s3;
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
  constructor(t2, i3, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i3, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i3 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M$1(this, t2, i3, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M$1(this, e3[s2 + n3], i3, n3), r2 === E && (r2 = this._$AH[n3]), o2 ||= !a(r2) || r2 !== this._$AH[n3], r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
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
  constructor(t2, i3, s2, e2, h2) {
    super(t2, i3, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i3 = this) {
    if ((t2 = M$1(this, t2, i3, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i3, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s2;
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
const D = (t2, i3, s2) => {
  const e2 = s2?.renderBefore ?? i3;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new k$2(i3.insertBefore(c$1(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = globalThis;
let i$1 = class i extends y$1 {
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
i$1._$litElement$ = true, i$1["finalized"] = true, s.litElementHydrateSupport?.({ LitElement: i$1 });
const o$1 = s.litElementPolyfillSupport;
o$1?.({ LitElement: i$1 });
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
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$3 }, r$1 = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i3 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i3);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i3, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
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
function n2(t2) {
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
  return n2({ ...r2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1 }, e$3 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i2 {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i3) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i3;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$2 = e$3(class extends i2 {
  constructor(t$12) {
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "class" !== t$12.name || t$12.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((s2) => t2[s2]).join(" ") + " ";
  }
  update(s2, [i3]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s2.strings && (this.nt = new Set(s2.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in i3) i3[t2] && !this.nt?.has(t2) && this.st.add(t2);
      return this.render(i3);
    }
    const r2 = s2.element.classList;
    for (const t2 of this.st) t2 in i3 || (r2.remove(t2), this.st.delete(t2));
    for (const t2 in i3) {
      const s3 = !!i3[t2];
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
        for (const [i3, v2] of value.entries()) {
          yield [i3, v2, Element];
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
    let i3;
    let length;
    if (Array.isArray(a2)) {
      length = a2.length;
      if (length !== b2.length) {
        return false;
      }
      for (i3 = length; i3-- !== 0; ) {
        if (!deepEqual(a2[i3], b2[i3])) {
          return false;
        }
      }
      return true;
    }
    if (a2 instanceof Map && b2 instanceof Map) {
      if (a2.size !== b2.size) {
        return false;
      }
      for (i3 of a2.entries()) {
        if (!b2.has(i3[0])) {
          return false;
        }
      }
      for (i3 of a2.entries()) {
        if (!deepEqual(i3[1], b2.get(i3[0]))) {
          return false;
        }
      }
      return true;
    }
    if (a2 instanceof Set && b2 instanceof Set) {
      if (a2.size !== b2.size) {
        return false;
      }
      for (i3 of a2.entries()) {
        if (!b2.has(i3[0])) {
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
      for (i3 = length; i3-- !== 0; ) {
        if (a2[i3] !== b2[i3]) {
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
    for (i3 = length; i3-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(b2, keys[i3])) {
        return false;
      }
    }
    for (i3 = length; i3-- !== 0; ) {
      const key = keys[i3];
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
  for (var i3 = 0; i3 < newInputs.length; i3++) {
    if (!isEqual(newInputs[i3], lastInputs[i3])) {
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
  class extends i2 {
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
i$4`
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
      for (let i3 = 0; i3 < prefix.length; i3++) this.bump();
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
const editor = { "card": { "generic": { "entity": "Entity", "color": "Color", "content_info": "Content", "fill_container": "Fill container", "icon_animation": "Animate icon when active?", "icon_color": "Icon color", "icon_type": "Icon type", "layout": "Layout", "primary_info": "Primary information", "secondary_info": "Secondary information", "use_entity_picture": "Use entity picture?", "collapsible_controls": "Collapse controls when off", "picture": "Picture" }, "petkit_litterbox": { "actions": "Action buttons", "icon_animation": "Animate icon while active", "active_states": "Active states (override)", "scoop_entity": "Scoop (button or script)", "deodorize_entity": "Deodorize (button or script)", "level_litter_entity": "Level litter (button or script)", "maintenance_entity": "Maintenance (button or script)", "footer_entity_1": "Footer — left / full entity", "footer_entity_2": "Footer — right entity (optional)", "actions_list": { "scoop": "Scoop", "deodorize": "Deodorize", "level_litter": "Level litter", "maintenance": "Maintenance mode" } } }, "form": { "icon_type_picker": { "values": { "default": "Default type", "entity-picture": "Entity picture", "icon": "Icon", "none": "None" } }, "info_picker": { "values": { "default": "Default information", "last-changed": "Last Changed", "last-updated": "Last Updated", "name": "Name", "none": "None", "state": "State" } }, "layout_picker": { "values": { "default": "Default layout", "horizontal": "Horizontal layout", "vertical": "Vertical layout" } } } };
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
  pulse: i$4`
    ${r$4(strAnimations.pulse)}
  `,
  spin: i$4`
    ${r$4(strAnimations.spin)}
  `,
  cleaning: i$4`
    ${r$4(strAnimations.cleaning)}
  `,
  returning: i$4`
    ${r$4(strAnimations.returning)}
  `
});
const animations = i$4`
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
  let i3 = 0;
  let len = parsers.length;
  while (i3 < len) {
    if ((result = parsers[i3++](color, parsed)) !== void 0) {
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
  for (let i3 = 0; i3 < arr.length - 1; i3++) {
    let a2 = arr[i3];
    let b2 = arr[i3 + 1];
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
function convertHsiToRgb({ h: h2, s: s2, i: i3, alpha }) {
  h2 = normalizeHue(h2 !== void 0 ? h2 : 0);
  if (s2 === void 0) s2 = 0;
  if (i3 === void 0) i3 = 0;
  let f2 = Math.abs(h2 / 60 % 2 - 1);
  let res;
  switch (Math.floor(h2 / 60)) {
    case 0:
      res = {
        r: i3 * (1 + s2 * (3 / (2 - f2) - 1)),
        g: i3 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1)),
        b: i3 * (1 - s2)
      };
      break;
    case 1:
      res = {
        r: i3 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1)),
        g: i3 * (1 + s2 * (3 / (2 - f2) - 1)),
        b: i3 * (1 - s2)
      };
      break;
    case 2:
      res = {
        r: i3 * (1 - s2),
        g: i3 * (1 + s2 * (3 / (2 - f2) - 1)),
        b: i3 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1))
      };
      break;
    case 3:
      res = {
        r: i3 * (1 - s2),
        g: i3 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1)),
        b: i3 * (1 + s2 * (3 / (2 - f2) - 1))
      };
      break;
    case 4:
      res = {
        r: i3 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1)),
        g: i3 * (1 - s2),
        b: i3 * (1 + s2 * (3 / (2 - f2) - 1))
      };
      break;
    case 5:
      res = {
        r: i3 * (1 + s2 * (3 / (2 - f2) - 1)),
        g: i3 * (1 - s2),
        b: i3 * (1 + s2 * (3 * (1 - f2) / (2 - f2) - 1))
      };
      break;
    default:
      res = { r: i3 * (1 - s2), g: i3 * (1 - s2), b: i3 * (1 - s2) };
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
const convertItpToXyz65 = ({ i: i3, t: t2, p: p2, alpha }) => {
  if (i3 === void 0) i3 = 0;
  if (t2 === void 0) t2 = 0;
  if (p2 === void 0) p2 = 0;
  const l2 = transferPqDecode(
    i3 + 0.008609037037932761 * t2 + 0.11102962500302593 * p2
  );
  const m2 = transferPqDecode(
    i3 - 0.00860903703793275 * t2 - 0.11102962500302599 * p2
  );
  const s2 = transferPqDecode(
    i3 + 0.5600313357106791 * t2 - 0.32062717498731885 * p2
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
  const i3 = 0.5 * l2 + 0.5 * m2;
  const t2 = 1.61376953125 * l2 - 3.323486328125 * m2 + 1.709716796875 * s2;
  const p2 = 4.378173828125 * l2 - 4.24560546875 * m2 - 0.132568359375 * s2;
  const res = { mode: "itp", i: i3, t: t2, p: p2 };
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
  let i3 = (l2 + m2) / 2;
  let res = {
    mode: "jab",
    j: 0.44 * i3 / (1 - 0.56 * i3) - d0$1,
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
  let i3 = (j + d0) / (0.44 + 0.56 * (j + d0));
  let l2 = jabPqDecode(i3 + 0.13860504 * a2 + 0.058047316 * b2);
  let m2 = jabPqDecode(i3 - 0.13860504 * a2 - 0.058047316 * b2);
  let s2 = jabPqDecode(i3 - 0.096019242 * a2 - 0.8118919 * b2);
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
const convertYiqToRgb = ({ y: y3, i: i3, q, alpha }) => {
  if (y3 === void 0) y3 = 0;
  if (i3 === void 0) i3 = 0;
  if (q === void 0) q = 0;
  const res = {
    mode: "rgb",
    r: y3 + 0.95608445 * i3 + 0.6208885 * q,
    g: y3 - 0.27137664 * i3 - 0.6486059 * q,
    b: y3 - 1.10561724 * i3 + 1.70250126 * q
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
const defaultColorCss = i$4`
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
const defaultDarkColorCss = i$4`
  --default-disabled: 111, 111, 111;
`;
const themeVariables = i$4`
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
const themeColorCss = i$4`
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
var __defProp$4 = Object.defineProperty;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
    if (decorator = decorators[i3])
      result = decorator(target, key, result) || result;
  if (result) __defProp$4(target, key, result);
  return result;
};
function computeDarkMode(hass) {
  if (!hass) return false;
  return hass.themes.darkMode;
}
class MushroomBaseElement extends i$1 {
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
      i$4`
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
__decorateClass$4([
  n2({ attribute: false })
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
var __defProp$3 = Object.defineProperty;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
    if (decorator = decorators[i3])
      result = decorator(target, key, result) || result;
  if (result) __defProp$3(target, key, result);
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
__decorateClass$3([
  r()
], MushroomBaseCard.prototype, "_config");
__decorateClass$3([
  n2({ reflect: true, type: String })
], MushroomBaseCard.prototype, "layout");
const cardStyle = i$4`
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
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
    if (decorator = decorators[i3])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
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
let PetkitLitterboxCommandsControl = class extends i$1 {
  constructor() {
    super(...arguments);
    this.fill = false;
  }
  _callService(e2) {
    e2.stopPropagation();
    const entityId = e2.target._entityId;
    if (!entityId) return;
    const domain = entityId.split(".")[0];
    if (domain === "script") {
      this.hass.callService("script", "turn_on", { entity_id: entityId });
    } else {
      this.hass.callService("button", "press", { entity_id: entityId });
    }
  }
  render() {
    const rtl = computeRTL(this.hass);
    return b`
      <mushroom-button-group .fill=${this.fill} ?rtl=${rtl}>
        ${PETKIT_LITTERBOX_BUTTONS.filter(
      (btn) => isButtonVisible(btn, this.config)
    ).map((btn) => {
      const entityId = this.config[btn.entityConfigKey];
      const stateObj = this.hass.states[entityId];
      const disabled = !stateObj || !isAvailable(stateObj);
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
__decorateClass$2([
  n2({ attribute: false })
], PetkitLitterboxCommandsControl.prototype, "hass", 2);
__decorateClass$2([
  n2({ attribute: false })
], PetkitLitterboxCommandsControl.prototype, "config", 2);
__decorateClass$2([
  n2({ type: Boolean })
], PetkitLitterboxCommandsControl.prototype, "fill", 2);
PetkitLitterboxCommandsControl = __decorateClass$2([
  t$1("mushroom-petkit-litterbox-commands-control")
], PetkitLitterboxCommandsControl);
function isCleaningState(stateObj, config) {
  const cleaningStates = ["cleaning", "scooping", "dumping", "leveling"];
  const activeList = config.active_states ?? cleaningStates;
  return activeList.some(
    (s2) => cleaningStates.includes(s2) && s2 === stateObj.state
  );
}
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
    if (decorator = decorators[i3])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
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
    const { footer_entity_1, footer_entity_2 } = this._config;
    if (!footer_entity_1 && !footer_entity_2) return A;
    const renderChip = (entityId) => {
      const stateObj = this.hass.states[entityId];
      if (!stateObj) return A;
      const name = stateObj.attributes.friendly_name ?? entityId;
      const unit = stateObj.attributes.unit_of_measurement;
      const stateText = unit ? `${stateObj.state} ${unit}` : stateObj.state;
      return b`
        <div class="footer-chip">
          <ha-state-icon
            .hass=${this.hass}
            .stateObj=${stateObj}
          ></ha-state-icon>
          <div class="footer-chip-info">
            <span class="footer-chip-name">${name}</span>
            <span class="footer-chip-state">${stateText}</span>
          </div>
        </div>
      `;
    };
    return b`
      <div class="footer">
        ${footer_entity_1 ? renderChip(footer_entity_1) : A}
        ${footer_entity_2 ? renderChip(footer_entity_2) : A}
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
      i$4`
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
__decorateClass$1([
  r()
], PetkitLitterboxCard.prototype, "_config", 2);
PetkitLitterboxCard = __decorateClass$1([
  t$1(PETKIT_LITTERBOX_CARD_NAME)
], PetkitLitterboxCard);
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
const lovelaceCardConfigStruct = object({
  index: optional(number()),
  view_index: optional(number()),
  view_layout: any(),
  type: string(),
  layout_options: any(),
  grid_options: any(),
  visibility: any()
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
    footer_entity_1: optional(string()),
    footer_entity_2: optional(string())
  })
);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
    if (decorator = decorators[i3])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
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
  "footer_entity_1",
  "footer_entity_2"
];
const computeSchema = memoizeOne(
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
      type: "grid",
      name: "",
      schema: [
        { name: "footer_entity_1", selector: { entity: {} } },
        { name: "footer_entity_2", selector: { entity: {} } }
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
      if (GENERIC_LABELS.includes(schema.name)) {
        return customLocalize(`editor.card.generic.${schema.name}`);
      }
      if (PETKIT_LITTERBOX_LABELS.includes(schema.name)) {
        return customLocalize(`editor.card.petkit_litterbox.${schema.name}`);
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
    assert(config, petkitLitterboxCardConfigStruct);
    this._config = config;
  }
  render() {
    if (!this.hass || !this._config) {
      return A;
    }
    const customLocalize = setupCustomlocalize(this.hass);
    const schema = computeSchema(
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
__decorateClass([
  r()
], PetkitLitterboxCardEditor.prototype, "_config", 2);
PetkitLitterboxCardEditor = __decorateClass([
  t$1(PETKIT_LITTERBOX_CARD_EDITOR_NAME)
], PetkitLitterboxCardEditor);
const petkitLitterboxCardEditor = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get PetkitLitterboxCardEditor() {
    return PetkitLitterboxCardEditor;
  }
}, Symbol.toStringTag, { value: "Module" }));
