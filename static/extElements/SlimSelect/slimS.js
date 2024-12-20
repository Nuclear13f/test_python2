!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).SlimSelect = t()
}(this, (function () {
    "use strict";

    class e {
        constructor(e) {
            e || (e = {}), this.main = e.main || "ss-main", this.placeholder = e.placeholder || "ss-placeholder", this.values = e.values || "ss-values", this.single = e.single || "ss-single", this.max = e.max || "ss-max", this.value = e.value || "ss-value", this.valueText = e.valueText || "ss-value-text", this.valueDelete = e.valueDelete || "ss-value-delete", this.valueOut = e.valueOut || "ss-value-out", this.deselect = e.deselect || "ss-deselect", this.deselectPath = e.deselectPath || "M10,10 L90,90 M10,90 L90,10", this.arrow = e.arrow || "ss-arrow", this.arrowClose = e.arrowClose || "M10,30 L50,70 L90,30", this.arrowOpen = e.arrowOpen || "M10,70 L50,30 L90,70", this.content = e.content || "ss-content", this.openAbove = e.openAbove || "ss-open-above", this.openBelow = e.openBelow || "ss-open-below", this.search = e.search || "ss-search", this.searchHighlighter = e.searchHighlighter || "ss-search-highlight", this.searching = e.searching || "ss-searching", this.addable = e.addable || "ss-addable", this.addablePath = e.addablePath || "M50,10 L50,90 M10,50 L90,50", this.list = e.list || "ss-list", this.optgroup = e.optgroup || "ss-optgroup", this.optgroupLabel = e.optgroupLabel || "ss-optgroup-label", this.optgroupLabelText = e.optgroupLabelText || "ss-optgroup-label-text", this.optgroupActions = e.optgroupActions || "ss-optgroup-actions", this.optgroupSelectAll = e.optgroupSelectAll || "ss-selectall", this.optgroupSelectAllBox = e.optgroupSelectAllBox || "M60,10 L10,10 L10,90 L90,90 L90,50", this.optgroupSelectAllCheck = e.optgroupSelectAllCheck || "M30,45 L50,70 L90,10", this.optgroupClosable = e.optgroupClosable || "ss-closable", this.option = e.option || "ss-option", this.optionDelete = e.optionDelete || "M10,10 L90,90 M10,90 L90,10", this.highlighted = e.highlighted || "ss-highlighted", this.open = e.open || "ss-open", this.close = e.close || "ss-close", this.selected = e.selected || "ss-selected", this.error = e.error || "ss-error", this.disabled = e.disabled || "ss-disabled", this.hide = e.hide || "ss-hide"
        }
    }

    function t() {
        return Math.random().toString(36).substring(2, 10)
    }

    function s(e, t = 50, s = !1) {
        let i;
        return function (...n) {
            const a = self, l = s && !i;
            clearTimeout(i), i = setTimeout((() => {
                i = null, s || e.apply(a, n)
            }), t), l && e.apply(a, n)
        }
    }

    function i(e, t) {
        return JSON.stringify(e) === JSON.stringify(t)
    }

    class n {
        constructor(e) {
            if (this.id = e.id && "" !== e.id ? e.id : t(), this.label = e.label || "", this.selectAll = void 0 !== e.selectAll && e.selectAll, this.selectAllText = e.selectAllText || "Select All", this.closable = e.closable || "off", this.options = [], e.options) for (const t of e.options) this.options.push(new a(t))
        }
    }

    class a {
        constructor(e) {
            this.id = e.id && "" !== e.id ? e.id : t(), this.value = void 0 === e.value ? e.text : e.value, this.text = e.text || "", this.html = e.html || "", this.selected = void 0 !== e.selected && e.selected, this.display = void 0 === e.display || e.display, this.disabled = void 0 !== e.disabled && e.disabled, this.mandatory = void 0 !== e.mandatory && e.mandatory, this.placeholder = void 0 !== e.placeholder && e.placeholder, this.class = e.class || "", this.style = e.style || "", this.data = e.data || {}
        }
    }

    class l {
        constructor(e, t) {
            this.selectType = "single", this.data = [], this.selectedOrder = [], this.selectType = e, this.setData(t)
        }

        validateDataArray(e) {
            if (!Array.isArray(e)) return new Error("Data must be an array");
            for (let t of e) if (t instanceof n || "label" in t) {
                if (!("label" in t)) return new Error("Optgroup must have a label");
                if ("options" in t && t.options) for (let e of t.options) {
                    const t = this.validateOption(e);
                    if (t) return t
                }
            } else {
                if (!(t instanceof a || "text" in t)) return new Error("Data object must be a valid optgroup or option");
                {
                    const e = this.validateOption(t);
                    if (e) return e
                }
            }
            return null
        }

        validateOption(e) {
            return "text" in e ? null : new Error("Option must have a text")
        }

        partialToFullData(e) {
            let t = [];
            return e.forEach((e => {
                if (e instanceof n || "label" in e) {
                    let s = [];
                    "options" in e && e.options && e.options.forEach((e => {
                        s.push(new a(e))
                    })), s.length > 0 && t.push(new n(e))
                }
                (e instanceof a || "text" in e) && t.push(new a(e))
            })), t
        }

        setData(e) {
            this.data = this.partialToFullData(e), "single" === this.selectType && this.setSelectedBy("id", this.getSelected())
        }

        getData() {
            return this.filter(null, !0)
        }

        getDataOptions() {
            return this.filter(null, !1)
        }

        addOption(e, t = !1) {
            if (t) {
                let t = [new a(e)];
                this.setData(t.concat(this.getData()))
            } else this.setData(this.getData().concat(new a(e)))
        }

        setSelectedBy(e, t) {
            let s = null, i = !1;
            const l = [];
            for (let o of this.data) {
                if (o instanceof n) for (let n of o.options) s || (s = n), n.selected = !i && t.includes(n[e]), n.selected && (l.push(n), "single" === this.selectType && (i = !0));
                o instanceof a && (s || (s = o), o.selected = !i && t.includes(o[e]), o.selected && (l.push(o), "single" === this.selectType && (i = !0)))
            }
            "single" === this.selectType && s && !i && (s.selected = !0, l.push(s));
            const o = t.map((t => {
                var s;
                return (null === (s = l.find((s => s[e] === t))) || void 0 === s ? void 0 : s.id) || ""
            }));
            this.selectedOrder = o
        }

        getSelected() {
            return this.getSelectedOptions().map((e => e.id))
        }

        getSelectedValues() {
            return this.getSelectedOptions().map((e => e.value))
        }

        getSelectedOptions() {
            return this.filter((e => e.selected), !1)
        }

        getOptgroupByID(e) {
            for (let t of this.data) if (t instanceof n && t.id === e) return t;
            return null
        }

        getOptionByID(e) {
            let t = this.filter((t => t.id === e), !1);
            return t.length ? t[0] : null
        }

        getSelectType() {
            return this.selectType
        }

        getFirstOption() {
            let e = null;
            for (let t of this.data) if (t instanceof n ? e = t.options[0] : t instanceof a && (e = t), e) break;
            return e
        }

        search(e, t) {
            return "" === (e = e.trim()) ? this.getData() : this.filter((s => t(s, e)), !0)
        }

        filter(e, t) {
            const s = [];
            return this.data.forEach((i => {
                if (i instanceof n) {
                    let l = [];
                    if (i.options.forEach((i => {
                        e && !e(i) || (t ? l.push(new a(i)) : s.push(new a(i)))
                    })), l.length > 0) {
                        let e = new n(i);
                        e.options = l, s.push(e)
                    }
                }
                i instanceof a && (e && !e(i) || s.push(new a(i)))
            })), s
        }

        selectedOrderOptions(e) {
            const t = [];
            return this.selectedOrder.forEach((s => {
                const i = e.find((e => e.id === s));
                i && t.push(i)
            })), e.forEach((e => {
                let s = !1;
                t.forEach((t => {
                    e.id !== t.id || (s = !0)
                })), s || t.push(e)
            })), t
        }
    }

    class o {
        constructor(e, t, s, i) {
            this.store = s, this.settings = e, this.classes = t, this.callbacks = i, this.main = this.mainDiv(), this.content = this.contentDiv(), this.updateClassStyles(), this.updateAriaAttributes(), this.settings.contentLocation.appendChild(this.content.main)
        }

        enable() {
            this.main.main.classList.remove(this.classes.disabled), this.content.search.input.disabled = !1
        }

        disable() {
            this.main.main.classList.add(this.classes.disabled), this.content.search.input.disabled = !0
        }

        open() {
            this.main.arrow.path.setAttribute("d", this.classes.arrowOpen), this.main.main.classList.add("up" === this.settings.openPosition ? this.classes.openAbove : this.classes.openBelow), this.main.main.setAttribute("aria-expanded", "true"), this.moveContent();
            const e = this.store.getSelectedOptions();
            if (e.length) {
                const t = e[e.length - 1].id, s = this.content.list.querySelector('[data-id="' + t + '"]');
                s && this.ensureElementInView(this.content.list, s)
            }
        }

        close() {
            this.main.main.classList.remove(this.classes.openAbove), this.main.main.classList.remove(this.classes.openBelow), this.main.main.setAttribute("aria-expanded", "false"), this.content.main.classList.remove(this.classes.openAbove), this.content.main.classList.remove(this.classes.openBelow), this.main.arrow.path.setAttribute("d", this.classes.arrowClose)
        }

        updateClassStyles() {
            if (this.main.main.className = "", this.main.main.removeAttribute("style"), this.content.main.className = "", this.content.main.removeAttribute("style"), this.main.main.classList.add(this.classes.main), this.content.main.classList.add(this.classes.content), "" !== this.settings.style && (this.main.main.style.cssText = this.settings.style, this.content.main.style.cssText = this.settings.style), this.settings.class.length) for (const e of this.settings.class) "" !== e.trim() && (this.main.main.classList.add(e.trim()), this.content.main.classList.add(e.trim()));
            "relative" === this.settings.contentPosition && this.content.main.classList.add("ss-" + this.settings.contentPosition)
        }

        updateAriaAttributes() {
            this.main.main.role = "combobox", this.main.main.setAttribute("aria-haspopup", "listbox"), this.main.main.setAttribute("aria-controls", this.content.main.id), this.main.main.setAttribute("aria-expanded", "false"), this.content.main.setAttribute("role", "listbox")
        }

        mainDiv() {
            var e;
            const t = document.createElement("div");
            t.dataset.id = this.settings.id, t.setAttribute("aria-label", this.settings.ariaLabel), t.tabIndex = 0, t.onkeydown = e => {
                switch (e.key) {
                    case"ArrowUp":
                    case"ArrowDown":
                        return this.callbacks.open(), "ArrowDown" === e.key ? this.highlight("down") : this.highlight("up"), !1;
                    case"Tab":
                        return this.callbacks.close(), !0;
                    case"Enter":
                    case" ":
                        this.callbacks.open();
                        const t = this.content.list.querySelector("." + this.classes.highlighted);
                        return t && t.click(), !1;
                    case"Escape":
                        return this.callbacks.close(), !1
                }
                return !0
            }, t.onclick = e => {
                this.settings.disabled || (this.settings.isOpen ? this.callbacks.close() : this.callbacks.open())
            };
            const s = document.createElement("div");
            s.classList.add(this.classes.values), t.appendChild(s);
            const i = document.createElement("div");
            i.classList.add(this.classes.deselect);
            const n = null === (e = this.store) || void 0 === e ? void 0 : e.getSelectedOptions();
            !this.settings.allowDeselect || this.settings.isMultiple && n && n.length <= 0 ? i.classList.add(this.classes.hide) : i.classList.remove(this.classes.hide), i.onclick = e => {
                if (e.stopPropagation(), this.settings.disabled) return;
                let t = !0;
                const s = this.store.getSelectedOptions(), i = [];
                if (this.callbacks.beforeChange && (t = !0 === this.callbacks.beforeChange(i, s)), t) {
                    if (this.settings.isMultiple) this.callbacks.setSelected([], !1), this.updateDeselectAll(); else {
                        const e = this.store.getFirstOption(), t = e ? e.id : "";
                        this.callbacks.setSelected(t, !1)
                    }
                    this.settings.closeOnSelect && this.callbacks.close(), this.callbacks.afterChange && this.callbacks.afterChange(this.store.getSelectedOptions())
                }
            };
            const a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            a.setAttribute("viewBox", "0 0 100 100");
            const l = document.createElementNS("http://www.w3.org/2000/svg", "path");
            l.setAttribute("d", this.classes.deselectPath), a.appendChild(l), i.appendChild(a), t.appendChild(i);
            const o = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            o.classList.add(this.classes.arrow), o.setAttribute("viewBox", "0 0 100 100");
            const h = document.createElementNS("http://www.w3.org/2000/svg", "path");
            return h.setAttribute("d", this.classes.arrowClose), this.settings.alwaysOpen && o.classList.add(this.classes.hide), o.appendChild(h), t.appendChild(o), {
                main: t,
                values: s,
                deselect: {main: i, svg: a, path: l},
                arrow: {main: o, path: h}
            }
        }

        mainFocus(e) {
            "click" !== e && this.main.main.focus({preventScroll: !0})
        }

        placeholder() {
            const e = this.store.filter((e => e.placeholder), !1);
            let t = this.settings.placeholderText;
            e.length && ("" !== e[0].html ? t = e[0].html : "" !== e[0].text && (t = e[0].text));
            const s = document.createElement("div");
            return s.classList.add(this.classes.placeholder), s.innerHTML = t, s
        }

        renderValues() {
            this.settings.isMultiple ? (this.renderMultipleValues(), this.updateDeselectAll()) : this.renderSingleValue()
        }

        renderSingleValue() {
            const e = this.store.filter((e => e.selected && !e.placeholder), !1), t = e.length > 0 ? e[0] : null;
            if (t) {
                const e = document.createElement("div");
                e.classList.add(this.classes.single), t.html ? e.innerHTML = t.html : e.innerText = t.text, this.main.values.innerHTML = e.outerHTML
            } else this.main.values.innerHTML = this.placeholder().outerHTML;
            this.settings.allowDeselect && e.length ? this.main.deselect.main.classList.remove(this.classes.hide) : this.main.deselect.main.classList.add(this.classes.hide)
        }

        renderMultipleValues() {
            let e = this.main.values.childNodes, t = this.store.filter((e => e.selected && e.display), !1);
            if (0 === t.length) return void (this.main.values.innerHTML = this.placeholder().outerHTML);
            {
                const e = this.main.values.querySelector("." + this.classes.placeholder);
                e && e.remove()
            }
            if (t.length > this.settings.maxValuesShown) {
                const e = document.createElement("div");
                return e.classList.add(this.classes.max), e.textContent = this.settings.maxValuesMessage.replace("{number}", t.length.toString()), void (this.main.values.innerHTML = e.outerHTML)
            }
            {
                const e = this.main.values.querySelector("." + this.classes.max);
                e && e.remove()
            }
            this.settings.keepOrder && (t = this.store.selectedOrderOptions(t));
            let s = [];
            for (let i = 0; i < e.length; i++) {
                const n = e[i], a = n.getAttribute("data-id");
                if (a) {
                    t.filter((e => e.id === a), !1).length || s.push(n)
                }
            }
            for (const e of s) e.classList.add(this.classes.valueOut), setTimeout((() => {
                this.main.values.hasChildNodes() && this.main.values.contains(e) && this.main.values.removeChild(e)
            }), 100);
            e = this.main.values.childNodes;
            for (let s = 0; s < t.length; s++) {
                let i = !0;
                for (let n = 0; n < e.length; n++) t[s].id === String(e[n].dataset.id) && (i = !1);
                i && (this.settings.keepOrder || 0 === e.length ? this.main.values.appendChild(this.multipleValue(t[s])) : 0 === s ? this.main.values.insertBefore(this.multipleValue(t[s]), e[s]) : e[s - 1].insertAdjacentElement("afterend", this.multipleValue(t[s])))
            }
        }

        multipleValue(e) {
            const t = document.createElement("div");
            t.classList.add(this.classes.value), t.dataset.id = e.id;
            const s = document.createElement("div");
            if (s.classList.add(this.classes.valueText), s.textContent = e.text, t.appendChild(s), !e.mandatory) {
                const s = document.createElement("div");
                s.classList.add(this.classes.valueDelete), s.onclick = t => {
                    if (t.preventDefault(), t.stopPropagation(), this.settings.disabled) return;
                    let s = !0;
                    const i = this.store.getSelectedOptions(), l = i.filter((t => t.selected && t.id !== e.id), !0);
                    if (!(this.settings.minSelected && l.length < this.settings.minSelected) && (this.callbacks.beforeChange && (s = !0 === this.callbacks.beforeChange(l, i)), s)) {
                        let e = [];
                        for (const t of l) {
                            if (t instanceof n) for (const s of t.options) e.push(s.id);
                            t instanceof a && e.push(t.id)
                        }
                        this.callbacks.setSelected(e, !1), this.settings.closeOnSelect && this.callbacks.close(), this.callbacks.afterChange && this.callbacks.afterChange(l), this.updateDeselectAll()
                    }
                };
                const i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                i.setAttribute("viewBox", "0 0 100 100");
                const l = document.createElementNS("http://www.w3.org/2000/svg", "path");
                l.setAttribute("d", this.classes.optionDelete), i.appendChild(l), s.appendChild(i), t.appendChild(s)
            }
            return t
        }

        contentDiv() {
            const e = document.createElement("div");
            e.dataset.id = this.settings.id;
            const t = this.searchDiv();
            e.appendChild(t.main);
            const s = this.listDiv();
            return e.appendChild(s), {main: e, search: t, list: s}
        }

        moveContent() {
            "relative" !== this.settings.contentPosition && "down" !== this.settings.openPosition ? "up" !== this.settings.openPosition ? "up" === this.putContent() ? this.moveContentAbove() : this.moveContentBelow() : this.moveContentAbove() : this.moveContentBelow()
        }

        searchDiv() {
            const e = document.createElement("div"), t = document.createElement("input"),
                i = document.createElement("div");
            e.classList.add(this.classes.search);
            const n = {main: e, input: t};
            if (this.settings.showSearch || (e.classList.add(this.classes.hide), t.readOnly = !0), t.type = "search", t.placeholder = this.settings.searchPlaceholder, t.tabIndex = -1, t.setAttribute("aria-label", this.settings.searchPlaceholder), t.setAttribute("autocapitalize", "off"), t.setAttribute("autocomplete", "off"), t.setAttribute("autocorrect", "off"), t.oninput = s((e => {
                this.callbacks.search(e.target.value)
            }), 100), t.onkeydown = e => {
                switch (e.key) {
                    case"ArrowUp":
                    case"ArrowDown":
                        return "ArrowDown" === e.key ? this.highlight("down") : this.highlight("up"), !1;
                    case"Tab":
                        return this.callbacks.close(), !0;
                    case"Escape":
                        return this.callbacks.close(), !1;
                    case" ":
                        const t = this.content.list.querySelector("." + this.classes.highlighted);
                        return !t || (t.click(), !1);
                    case"Enter":
                        if (this.callbacks.addable) return i.click(), !1;
                    {
                        const e = this.content.list.querySelector("." + this.classes.highlighted);
                        if (e) return e.click(), !1
                    }
                        return !0
                }
                return !0
            }, e.appendChild(t), this.callbacks.addable) {
                i.classList.add(this.classes.addable);
                const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                t.setAttribute("viewBox", "0 0 100 100");
                const s = document.createElementNS("http://www.w3.org/2000/svg", "path");
                s.setAttribute("d", this.classes.addablePath), t.appendChild(s), i.appendChild(t), i.onclick = e => {
                    if (e.preventDefault(), e.stopPropagation(), !this.callbacks.addable) return;
                    const t = this.content.search.input.value.trim();
                    if ("" === t) return void this.content.search.input.focus();
                    const s = e => {
                        let t = new a(e);
                        if (this.callbacks.addOption(t), this.settings.isMultiple) {
                            let e = this.store.getSelected();
                            e.push(t.id), this.callbacks.setSelected(e, !0)
                        } else this.callbacks.setSelected([t.id], !0);
                        this.callbacks.search(""), this.settings.closeOnSelect && setTimeout((() => {
                            this.callbacks.close()
                        }), 100)
                    }, i = this.callbacks.addable(t);
                    !1 !== i && null != i && (i instanceof Promise ? i.then((e => {
                        "string" == typeof e ? s({
                            text: e,
                            value: e
                        }) : i instanceof Error ? this.renderError(i.message) : s(e)
                    })) : "string" == typeof i ? s({
                        text: i,
                        value: i
                    }) : i instanceof Error ? this.renderError(i.message) : s(i))
                }, e.appendChild(i), n.addable = {main: i, svg: t, path: s}
            }
            return n
        }

        searchFocus() {
            this.content.search.input.focus()
        }

        getOptions(e = !1, t = !1, s = !1) {
            let i = "." + this.classes.option;
            return e && (i += ":not(." + this.classes.placeholder + ")"), t && (i += ":not(." + this.classes.disabled + ")"), s && (i += ":not(." + this.classes.hide + ")"), Array.from(this.content.list.querySelectorAll(i))
        }

        highlight(e) {
            const t = this.getOptions(!0, !0, !0);
            if (0 === t.length) return;
            if (1 === t.length && !t[0].classList.contains(this.classes.highlighted)) return void t[0].classList.add(this.classes.highlighted);
            let s = !1;
            for (const e of t) e.classList.contains(this.classes.highlighted) && (s = !0);
            if (!s) for (const e of t) if (e.classList.contains(this.classes.selected)) {
                e.classList.add(this.classes.highlighted);
                break
            }
            for (let s = 0; s < t.length; s++) if (t[s].classList.contains(this.classes.highlighted)) {
                const i = t[s];
                i.classList.remove(this.classes.highlighted);
                const n = i.parentElement;
                if (n && n.classList.contains(this.classes.open)) {
                    const e = n.querySelector("." + this.classes.optgroupLabel);
                    e && e.click()
                }
                let a = t["down" === e ? s + 1 < t.length ? s + 1 : 0 : s - 1 >= 0 ? s - 1 : t.length - 1];
                a.classList.add(this.classes.highlighted), this.ensureElementInView(this.content.list, a);
                const l = a.parentElement;
                if (l && l.classList.contains(this.classes.close)) {
                    const e = l.querySelector("." + this.classes.optgroupLabel);
                    e && e.click()
                }
                return
            }
            t["down" === e ? 0 : t.length - 1].classList.add(this.classes.highlighted), this.ensureElementInView(this.content.list, t["down" === e ? 0 : t.length - 1])
        }

        listDiv() {
            const e = document.createElement("div");
            return e.classList.add(this.classes.list), e
        }

        renderError(e) {
            this.content.list.innerHTML = "";
            const t = document.createElement("div");
            t.classList.add(this.classes.error), t.textContent = e, this.content.list.appendChild(t)
        }

        renderSearching() {
            this.content.list.innerHTML = "";
            const e = document.createElement("div");
            e.classList.add(this.classes.searching), e.textContent = this.settings.searchingText, this.content.list.appendChild(e)
        }

        renderOptions(e) {
            if (this.content.list.innerHTML = "", 0 === e.length) {
                const e = document.createElement("div");
                return e.classList.add(this.classes.search), this.callbacks.addable ? e.innerHTML = this.settings.addableText.replace("{value}", this.content.search.input.value) : e.innerHTML = this.settings.searchText, void this.content.list.appendChild(e)
            }
            if (this.settings.allowDeselect && !this.settings.isMultiple) {
                this.store.filter((e => e.placeholder), !1).length || this.store.addOption(new a({
                    text: "",
                    value: "",
                    selected: !1,
                    placeholder: !0
                }), !0)
            }
            for (const t of e) {
                if (t instanceof n) {
                    const e = document.createElement("div");
                    e.classList.add(this.classes.optgroup);
                    const s = document.createElement("div");
                    s.classList.add(this.classes.optgroupLabel), e.appendChild(s);
                    const i = document.createElement("div");
                    i.classList.add(this.classes.optgroupLabelText), i.textContent = t.label, s.appendChild(i);
                    const n = document.createElement("div");
                    if (n.classList.add(this.classes.optgroupActions), s.appendChild(n), this.settings.isMultiple && t.selectAll) {
                        const e = document.createElement("div");
                        e.classList.add(this.classes.optgroupSelectAll);
                        let s = !0;
                        for (const e of t.options) if (!e.selected) {
                            s = !1;
                            break
                        }
                        s && e.classList.add(this.classes.selected);
                        const i = document.createElement("span");
                        i.textContent = t.selectAllText, e.appendChild(i);
                        const a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        a.setAttribute("viewBox", "0 0 100 100"), e.appendChild(a);
                        const l = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        l.setAttribute("d", this.classes.optgroupSelectAllBox), a.appendChild(l);
                        const o = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        o.setAttribute("d", this.classes.optgroupSelectAllCheck), a.appendChild(o), e.addEventListener("click", (e => {
                            e.preventDefault(), e.stopPropagation();
                            const i = this.store.getSelected();
                            if (s) {
                                const e = i.filter((e => {
                                    for (const s of t.options) if (e === s.id) return !1;
                                    return !0
                                }));
                                this.callbacks.setSelected(e, !0)
                            } else {
                                const e = i.concat(t.options.map((e => e.id)));
                                for (const e of t.options) this.store.getOptionByID(e.id) || this.callbacks.addOption(e);
                                this.callbacks.setSelected(e, !0)
                            }
                        })), n.appendChild(e)
                    }
                    if ("off" !== t.closable) {
                        const i = document.createElement("div");
                        i.classList.add(this.classes.optgroupClosable);
                        const a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        a.setAttribute("viewBox", "0 0 100 100"), a.classList.add(this.classes.arrow), i.appendChild(a);
                        const l = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        a.appendChild(l), t.options.some((e => e.selected)) || "" !== this.content.search.input.value.trim() ? (i.classList.add(this.classes.open), l.setAttribute("d", this.classes.arrowOpen)) : "open" === t.closable ? (e.classList.add(this.classes.open), l.setAttribute("d", this.classes.arrowOpen)) : "close" === t.closable && (e.classList.add(this.classes.close), l.setAttribute("d", this.classes.arrowClose)), s.addEventListener("click", (t => {
                            t.preventDefault(), t.stopPropagation(), e.classList.contains(this.classes.close) ? (e.classList.remove(this.classes.close), e.classList.add(this.classes.open), l.setAttribute("d", this.classes.arrowOpen)) : (e.classList.remove(this.classes.open), e.classList.add(this.classes.close), l.setAttribute("d", this.classes.arrowClose))
                        })), n.appendChild(i)
                    }
                    e.appendChild(s);
                    for (const s of t.options) e.appendChild(this.option(s));
                    this.content.list.appendChild(e)
                }
                t instanceof a && this.content.list.appendChild(this.option(t))
            }
        }

        option(e) {
            if (e.placeholder) {
                const e = document.createElement("div");
                return e.classList.add(this.classes.option), e.classList.add(this.classes.hide), e
            }
            const t = document.createElement("div");
            return t.dataset.id = e.id, t.id = e.id, t.classList.add(this.classes.option), t.setAttribute("role", "option"), e.class && e.class.split(" ").forEach((e => {
                t.classList.add(e)
            })), e.style && (t.style.cssText = e.style), this.settings.searchHighlight && "" !== this.content.search.input.value.trim() ? t.innerHTML = this.highlightText("" !== e.html ? e.html : e.text, this.content.search.input.value, this.classes.searchHighlighter) : "" !== e.html ? t.innerHTML = e.html : t.textContent = e.text, this.settings.showOptionTooltips && t.textContent && t.setAttribute("title", t.textContent), e.display || t.classList.add(this.classes.hide), e.disabled && t.classList.add(this.classes.disabled), e.selected && this.settings.hideSelected && t.classList.add(this.classes.hide), e.selected ? (t.classList.add(this.classes.selected), t.setAttribute("aria-selected", "true"), this.main.main.setAttribute("aria-activedescendant", t.id)) : (t.classList.remove(this.classes.selected), t.setAttribute("aria-selected", "false")), t.addEventListener("click", (t => {
                t.preventDefault(), t.stopPropagation();
                const s = this.store.getSelected(), i = t.currentTarget, n = String(i.dataset.id);
                if (e.disabled || e.selected && !this.settings.allowDeselect) return;
                if (this.settings.isMultiple && this.settings.maxSelected <= s.length && !e.selected || this.settings.isMultiple && this.settings.minSelected >= s.length && e.selected) return;
                let a = !1;
                const l = this.store.getSelectedOptions();
                let o = [];
                this.settings.isMultiple && (o = e.selected ? l.filter((e => e.id !== n)) : l.concat(e)), this.settings.isMultiple || (o = e.selected ? [] : [e]), this.callbacks.beforeChange || (a = !0), this.callbacks.beforeChange && (a = !1 !== this.callbacks.beforeChange(o, l)), a && (this.store.getOptionByID(n) || this.callbacks.addOption(e), this.callbacks.setSelected(o.map((e => e.id)), !1), this.settings.closeOnSelect && this.callbacks.close(), this.callbacks.afterChange && this.callbacks.afterChange(o))
            })), t
        }

        destroy() {
            this.main.main.remove(), this.content.main.remove()
        }

        highlightText(e, t, s) {
            let i = e;
            const n = new RegExp("(?![^<]*>)(" + t.trim() + ")(?![^<]*>[^<>]*</)", "i");
            if (!e.match(n)) return e;
            const a = e.match(n).index, l = a + e.match(n)[0].toString().length, o = e.substring(a, l);
            return i = i.replace(n, `<mark class="${s}">${o}</mark>`), i
        }

        moveContentAbove() {
            const e = this.main.main.offsetHeight, t = this.content.main.offsetHeight;
            this.main.main.classList.remove(this.classes.openBelow), this.main.main.classList.add(this.classes.openAbove), this.content.main.classList.remove(this.classes.openBelow), this.content.main.classList.add(this.classes.openAbove);
            const s = this.main.main.getBoundingClientRect();
            this.content.main.style.margin = "-" + (e + t - 1) + "px 0px 0px 0px", this.content.main.style.top = s.top + s.height + window.scrollY + "px", this.content.main.style.left = s.left + window.scrollX + "px", this.content.main.style.width = s.width + "px"
        }

        moveContentBelow() {
            this.main.main.classList.remove(this.classes.openAbove), this.main.main.classList.add(this.classes.openBelow), this.content.main.classList.remove(this.classes.openAbove), this.content.main.classList.add(this.classes.openBelow);
            const e = this.main.main.getBoundingClientRect();
            this.content.main.style.margin = "-1px 0px 0px 0px", "relative" !== this.settings.contentPosition && (this.content.main.style.top = e.top + e.height + window.scrollY + "px", this.content.main.style.left = e.left + window.scrollX + "px", this.content.main.style.width = e.width + "px")
        }

        ensureElementInView(e, t) {
            const s = e.scrollTop + e.offsetTop, i = s + e.clientHeight, n = t.offsetTop, a = n + t.clientHeight;
            n < s ? e.scrollTop -= s - n : a > i && (e.scrollTop += a - i)
        }

        putContent() {
            const e = this.main.main.offsetHeight, t = this.main.main.getBoundingClientRect(),
                s = this.content.main.offsetHeight;
            return window.innerHeight - (t.top + e) <= s && t.top > s ? "up" : "down"
        }

        updateDeselectAll() {
            if (!this.store || !this.settings) return;
            const e = this.store.getSelectedOptions(), t = e && e.length > 0, s = this.settings.isMultiple,
                i = this.settings.allowDeselect, n = this.main.deselect.main, a = this.classes.hide;
            !i || s && !t ? n.classList.add(a) : n.classList.remove(a)
        }
    }

    class h {
        constructor(e) {
            this.listen = !1, this.observer = null, this.select = e, this.valueChange = this.valueChange.bind(this), this.select.addEventListener("change", this.valueChange, {passive: !0}), this.observer = new MutationObserver(this.observeCall.bind(this)), this.changeListen(!0)
        }

        enable() {
            this.select.disabled = !1
        }

        disable() {
            this.select.disabled = !0
        }

        hideUI() {
            this.select.tabIndex = -1, this.select.style.display = "none", this.select.setAttribute("aria-hidden", "true")
        }

        showUI() {
            this.select.removeAttribute("tabindex"), this.select.style.display = "", this.select.removeAttribute("aria-hidden")
        }

        changeListen(e) {
            this.listen = e, e && this.observer && this.observer.observe(this.select, {
                subtree: !0,
                childList: !0,
                attributes: !0
            }), e || this.observer && this.observer.disconnect()
        }

        valueChange(e) {
            return this.listen && this.onValueChange && this.onValueChange(this.getSelectedOptions()), !0
        }

        observeCall(e) {
            if (!this.listen) return;
            let t = !1, s = !1, i = !1;
            for (const n of e) {
                if (n.target === this.select && ("disabled" === n.attributeName && (s = !0), "class" === n.attributeName && (t = !0), "childList" === n.type)) {
                    for (const e of n.addedNodes) if ("OPTION" === e.nodeName && e.value === this.select.value) {
                        this.select.dispatchEvent(new Event("change"));
                        break
                    }
                    i = !0
                }
                "OPTGROUP" !== n.target.nodeName && "OPTION" !== n.target.nodeName || (i = !0)
            }
            t && this.onClassChange && this.onClassChange(this.select.className.split(" ")), s && this.onDisabledChange && (this.changeListen(!1), this.onDisabledChange(this.select.disabled), this.changeListen(!0)), i && this.onOptionsChange && (this.changeListen(!1), this.onOptionsChange(this.getData()), this.changeListen(!0))
        }

        getData() {
            let e = [];
            const t = this.select.childNodes;
            for (const s of t) "OPTGROUP" === s.nodeName && e.push(this.getDataFromOptgroup(s)), "OPTION" === s.nodeName && e.push(this.getDataFromOption(s));
            return e
        }

        getDataFromOptgroup(e) {
            let t = {
                id: e.id,
                label: e.label,
                selectAll: !!e.dataset && "true" === e.dataset.selectall,
                selectAllText: e.dataset ? e.dataset.selectalltext : "Select all",
                closable: e.dataset ? e.dataset.closable : "off",
                options: []
            };
            const s = e.childNodes;
            for (const e of s) "OPTION" === e.nodeName && t.options.push(this.getDataFromOption(e));
            return t
        }

        getDataFromOption(e) {
            return {
                id: e.id,
                value: e.value,
                text: e.text,
                html: e.dataset && e.dataset.html ? e.dataset.html : "",
                selected: e.selected,
                display: "none" !== e.style.display,
                disabled: e.disabled,
                mandatory: !!e.dataset && "true" === e.dataset.mandatory,
                placeholder: "true" === e.dataset.placeholder,
                class: e.className,
                style: e.style.cssText,
                data: e.dataset
            }
        }

        getSelectedOptions() {
            let e = [];
            const t = this.select.childNodes;
            for (const s of t) {
                if ("OPTGROUP" === s.nodeName) {
                    const t = s.childNodes;
                    for (const s of t) if ("OPTION" === s.nodeName) {
                        const t = s;
                        t.selected && e.push(this.getDataFromOption(t))
                    }
                }
                if ("OPTION" === s.nodeName) {
                    const t = s;
                    t.selected && e.push(this.getDataFromOption(t))
                }
            }
            return e
        }

        getSelectedValues() {
            return this.getSelectedOptions().map((e => e.value))
        }

        setSelected(e) {
            this.changeListen(!1);
            const t = this.select.childNodes;
            for (const s of t) {
                if ("OPTGROUP" === s.nodeName) {
                    const t = s.childNodes;
                    for (const s of t) if ("OPTION" === s.nodeName) {
                        const t = s;
                        t.selected = e.includes(t.id)
                    }
                }
                if ("OPTION" === s.nodeName) {
                    const t = s;
                    t.selected = e.includes(t.id)
                }
            }
            this.changeListen(!0)
        }

        setSelectedByValue(e) {
            this.changeListen(!1);
            const t = this.select.childNodes;
            for (const s of t) {
                if ("OPTGROUP" === s.nodeName) {
                    const t = s.childNodes;
                    for (const s of t) if ("OPTION" === s.nodeName) {
                        const t = s;
                        t.selected = e.includes(t.value)
                    }
                }
                if ("OPTION" === s.nodeName) {
                    const t = s;
                    t.selected = e.includes(t.value)
                }
            }
            this.changeListen(!0)
        }

        updateSelect(e, t, s) {
            this.changeListen(!1), e && (this.select.dataset.id = e), t && (this.select.style.cssText = t), s && (this.select.className = "", s.forEach((e => {
                "" !== e.trim() && this.select.classList.add(e.trim())
            }))), this.changeListen(!0)
        }

        updateOptions(e) {
            this.changeListen(!1), this.select.innerHTML = "";
            for (const t of e) t instanceof n && this.select.appendChild(this.createOptgroup(t)), t instanceof a && this.select.appendChild(this.createOption(t));
            this.select.dispatchEvent(new Event("change", {bubbles: !0})), this.changeListen(!0)
        }

        createOptgroup(e) {
            const t = document.createElement("optgroup");
            if (t.id = e.id, t.label = e.label, e.selectAll && (t.dataset.selectAll = "true"), "off" !== e.closable && (t.dataset.closable = e.closable), e.options) for (const s of e.options) t.appendChild(this.createOption(s));
            return t
        }

        createOption(e) {
            const t = document.createElement("option");
            return t.id = e.id, t.value = e.value, t.innerHTML = e.text, "" !== e.html && t.setAttribute("data-html", e.html), e.selected && (t.selected = e.selected), e.disabled && (t.disabled = !0), e.display || (t.style.display = "none"), e.placeholder && t.setAttribute("data-placeholder", "true"), e.mandatory && t.setAttribute("data-mandatory", "true"), e.class && e.class.split(" ").forEach((e => {
                t.classList.add(e)
            })), e.data && "object" == typeof e.data && Object.keys(e.data).forEach((s => {
                t.setAttribute("data-" + function (e) {
                    const t = e.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (e => "-" + e.toLowerCase()));
                    return e[0] === e[0].toUpperCase() ? t.substring(1) : t
                }(s), e.data[s])
            })), t
        }

        destroy() {
            this.changeListen(!1), this.select.removeEventListener("change", this.valueChange), this.observer && (this.observer.disconnect(), this.observer = null), delete this.select.dataset.id, this.showUI()
        }
    }

    class c {
        constructor(e) {
            this.id = "", this.style = "", this.class = [], this.isMultiple = !1, this.isOpen = !1, this.isFullOpen = !1, this.intervalMove = null, e || (e = {}), this.id = "ss-" + t(), this.style = e.style || "", this.class = e.class || [], this.disabled = void 0 !== e.disabled && e.disabled, this.alwaysOpen = void 0 !== e.alwaysOpen && e.alwaysOpen, this.showSearch = void 0 === e.showSearch || e.showSearch, this.focusSearch = void 0 === e.focusSearch || e.focusSearch, this.ariaLabel = e.ariaLabel || "Combobox", this.searchPlaceholder = e.searchPlaceholder || "Search", this.searchText = e.searchText || "No Results", this.searchingText = e.searchingText || "Searching...", this.searchHighlight = void 0 !== e.searchHighlight && e.searchHighlight, this.closeOnSelect = void 0 === e.closeOnSelect || e.closeOnSelect, this.contentLocation = e.contentLocation || document.body, this.contentPosition = e.contentPosition || "absolute", this.openPosition = e.openPosition || "auto", this.placeholderText = void 0 !== e.placeholderText ? e.placeholderText : "Select Value", this.allowDeselect = void 0 !== e.allowDeselect && e.allowDeselect, this.hideSelected = void 0 !== e.hideSelected && e.hideSelected, this.keepOrder = void 0 !== e.keepOrder && e.keepOrder, this.showOptionTooltips = void 0 !== e.showOptionTooltips && e.showOptionTooltips, this.minSelected = e.minSelected || 0, this.maxSelected = e.maxSelected || 1e3, this.timeoutDelay = e.timeoutDelay || 200, this.maxValuesShown = e.maxValuesShown || 20, this.maxValuesMessage = e.maxValuesMessage || "{number} selected", this.addableText = e.addableText || 'Press "Enter" to add {value}'
        }
    }

    return class {
        constructor(t) {
            var i;
            if (this.events = {
                search: void 0,
                searchFilter: (e, t) => -1 !== e.text.toLowerCase().indexOf(t.toLowerCase()),
                addable: void 0,
                beforeChange: void 0,
                afterChange: void 0,
                beforeOpen: void 0,
                afterOpen: void 0,
                beforeClose: void 0,
                afterClose: void 0
            }, this.windowResize = s((() => {
                (this.settings.isOpen || this.settings.isFullOpen) && this.render.moveContent()
            })), this.windowScroll = s((() => {
                (this.settings.isOpen || this.settings.isFullOpen) && this.render.moveContent()
            })), this.documentClick = e => {
                this.settings.isOpen && e.target && !function (e, t) {
                    function s(e, s) {
                        return s && e && e.classList && e.classList.contains(s) || s && e && e.dataset && e.dataset.id && e.dataset.id === t ? e : null
                    }

                    return s(e, t) || function e(t, i) {
                        return t && t !== document ? s(t, i) ? t : e(t.parentNode, i) : null
                    }(e, t)
                }(e.target, this.settings.id) && this.close(e.type)
            }, this.windowVisibilityChange = () => {
                document.hidden && this.close()
            }, this.selectEl = "string" == typeof t.select ? document.querySelector(t.select) : t.select, !this.selectEl) return void (t.events && t.events.error && t.events.error(new Error("Could not find select element")));
            if ("SELECT" !== this.selectEl.tagName) return void (t.events && t.events.error && t.events.error(new Error("Element isnt of type select")));
            this.selectEl.dataset.ssid && this.destroy(), this.settings = new c(t.settings), this.cssClasses = new e(t.cssClasses);
            const n = ["afterChange", "beforeOpen", "afterOpen", "beforeClose", "afterClose"];
            for (const e in t.events) t.events.hasOwnProperty(e) && (-1 !== n.indexOf(e) ? this.events[e] = s(t.events[e], 100) : this.events[e] = t.events[e]);
            this.settings.disabled = (null === (i = t.settings) || void 0 === i ? void 0 : i.disabled) ? t.settings.disabled : this.selectEl.disabled, this.settings.isMultiple = this.selectEl.multiple, this.settings.style = this.selectEl.style.cssText, this.settings.class = this.selectEl.className.split(" "), this.select = new h(this.selectEl), this.select.updateSelect(this.settings.id, this.settings.style, this.settings.class), this.select.hideUI(), this.select.onValueChange = e => {
                this.setSelected(e.map((e => e.id)))
            }, this.select.onClassChange = e => {
                this.settings.class = e, this.render.updateClassStyles()
            }, this.select.onDisabledChange = e => {
                e ? this.disable() : this.enable()
            }, this.select.onOptionsChange = e => {
                this.setData(e)
            }, this.store = new l(this.settings.isMultiple ? "multiple" : "single", t.data ? t.data : this.select.getData()), t.data && this.select.updateOptions(this.store.getData());
            const a = {
                open: this.open.bind(this),
                close: this.close.bind(this),
                addable: this.events.addable ? this.events.addable : void 0,
                setSelected: this.setSelected.bind(this),
                addOption: this.addOption.bind(this),
                search: this.search.bind(this),
                beforeChange: this.events.beforeChange,
                afterChange: this.events.afterChange
            };
            this.render = new o(this.settings, this.cssClasses, this.store, a), this.render.renderValues(), this.render.renderOptions(this.store.getData());
            const r = this.selectEl.getAttribute("aria-label"), d = this.selectEl.getAttribute("aria-labelledby");
            r ? this.render.main.main.setAttribute("aria-label", r) : d && this.render.main.main.setAttribute("aria-labelledby", d), this.selectEl.parentNode && this.selectEl.parentNode.insertBefore(this.render.main.main, this.selectEl.nextSibling), window.addEventListener("resize", this.windowResize, !1), "auto" === this.settings.openPosition && window.addEventListener("scroll", this.windowScroll, !1), document.addEventListener("visibilitychange", this.windowVisibilityChange), this.settings.disabled && this.disable(), this.settings.alwaysOpen && this.open(), this.selectEl.slim = this
        }

        enable() {
            this.settings.disabled = !1, this.select.enable(), this.render.enable()
        }

        disable() {
            this.settings.disabled = !0, this.select.disable(), this.render.disable()
        }

        getData() {
            return this.store.getData()
        }

        setData(e) {
            const t = this.store.getSelected(), s = this.store.validateDataArray(e);
            if (s) return void (this.events.error && this.events.error(s));
            this.store.setData(e);
            const n = this.store.getData();
            this.select.updateOptions(n), this.render.renderValues(), this.render.renderOptions(n), this.events.afterChange && !i(t, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions())
        }

        getSelected() {
            let e = this.store.getSelectedOptions();
            return this.settings.keepOrder && (e = this.store.selectedOrderOptions(e)), e.map((e => e.value))
        }

        setSelected(e, t = !0) {
            const s = this.store.getSelected(), n = this.store.getDataOptions();
            e = Array.isArray(e) ? e : [e];
            const a = [];
            for (const t of e) if (n.find((e => e.id == t))) a.push(t); else for (const e of n.filter((e => e.value == t))) a.push(e.id);
            this.store.setSelectedBy("id", a);
            const l = this.store.getData();
            this.select.updateOptions(l), this.render.renderValues(), "" !== this.render.content.search.input.value ? this.search(this.render.content.search.input.value) : this.render.renderOptions(l), t && this.events.afterChange && !i(s, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions())
        }

        addOption(e) {
            const t = this.store.getSelected();
            this.store.getDataOptions().some((t => {
                var s;
                return t.value === (null !== (s = e.value) && void 0 !== s ? s : e.text)
            })) || this.store.addOption(e);
            const s = this.store.getData();
            this.select.updateOptions(s), this.render.renderValues(), this.render.renderOptions(s), this.events.afterChange && !i(t, this.store.getSelected()) && this.events.afterChange(this.store.getSelectedOptions())
        }

        open() {
            this.settings.disabled || this.settings.isOpen || (this.events.beforeOpen && this.events.beforeOpen(), this.render.open(), this.settings.showSearch && this.settings.focusSearch && this.render.searchFocus(), this.settings.isOpen = !0, setTimeout((() => {
                this.events.afterOpen && this.events.afterOpen(), this.settings.isOpen && (this.settings.isFullOpen = !0), document.addEventListener("click", this.documentClick)
            }), this.settings.timeoutDelay), "absolute" === this.settings.contentPosition && (this.settings.intervalMove && clearInterval(this.settings.intervalMove), this.settings.intervalMove = setInterval(this.render.moveContent.bind(this.render), 500)))
        }

        close(e = null) {
            this.settings.isOpen && !this.settings.alwaysOpen && (this.events.beforeClose && this.events.beforeClose(), this.render.close(), "" !== this.render.content.search.input.value && this.search(""), this.render.mainFocus(e), this.settings.isOpen = !1, this.settings.isFullOpen = !1, setTimeout((() => {
                this.events.afterClose && this.events.afterClose(), document.removeEventListener("click", this.documentClick)
            }), this.settings.timeoutDelay), this.settings.intervalMove && clearInterval(this.settings.intervalMove))
        }

        search(e) {
            if (this.render.content.search.input.value !== e && (this.render.content.search.input.value = e), !this.events.search) return void this.render.renderOptions("" === e ? this.store.getData() : this.store.search(e, this.events.searchFilter));
            this.render.renderSearching();
            const t = this.events.search(e, this.store.getSelectedOptions());
            t instanceof Promise ? t.then((e => {
                this.render.renderOptions(this.store.partialToFullData(e))
            })).catch((e => {
                this.render.renderError("string" == typeof e ? e : e.message)
            })) : Array.isArray(t) ? this.render.renderOptions(this.store.partialToFullData(t)) : this.render.renderError("Search event must return a promise or an array of data")
        }

        destroy() {
            document.removeEventListener("click", this.documentClick), window.removeEventListener("resize", this.windowResize, !1), "auto" === this.settings.openPosition && window.removeEventListener("scroll", this.windowScroll, !1), document.removeEventListener("visibilitychange", this.windowVisibilityChange), this.store.setData([]), this.render.destroy(), this.select.destroy()
        }
    }
}));
