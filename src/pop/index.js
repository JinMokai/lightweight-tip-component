import Base from "../base.js";
import style from "./index.css?inline" assert { type: "css" };
export default class PopWebComponent extends Base {

	#pop;
	#hideTimer;

	constructor() {
		super();
		const html = `
			<div id="pop" class="pop" popover="manual" part="pop">
				<slot></slot>
			</div>
		`
		this.render(html, style)
		this.#pop = this.shadowRoot.getElementById("pop");
		this._documentClickEvent = [];
	}

	set popHTML(value) {
		this.#pop.innerHTML = value
	}

	get isSuportPopOver() {
		return document.body.popover !== undefined
	}

	get dir() {
		return this.getAttribute("dir") || "BL,TL";
	}

	set dir(value) {
		this.setAttribute("dir", value);
	}

	get disabled() {
		return this.getAttribute("disabled") !== null;
	}

	set disabled(value) {
		this.toggleAttribute("disabled", value);
	}

	get auto() {
		const auto = this.getAttribute("auto");
		return auto ? auto.split(",") : [];
	}

	set auto(value) {
		this.setAttribute("auto", value);
	}

	get open() {
		return this.getAttribute("open") !== null;
	}

	get trigger() {
		return this.getAttribute("trigger") || "hover,focus";
	}

	set trigger(value) {
		this.setAttribute("trigger", value);
	}

	set open(value) {
		if (value) {
			this.#setPosition();
		}
		this.toggleAttribute("open", value);
		if (this.isSuportPopOver) {
			this.#pop?.togglePopover(value)
		}
	}

	set offset(value) {
		const [x, y] = value.split(",");
		this.style.setProperty("--offset-x", x);
		this.style.setProperty("--offset-y", y);
	}

	get node() {
		return this.#getNode(this.target);
	}

	#getNode(target) {
		let node = target;
		if (!node) {
			return null;
		}
		while (node.shadowRoot && !node.offsetWidth) {
			node = node.shadowRoot.firstElementChild;
		}
		return node;
	}

	#render() {
		if (!this.isConnected || (this.parentNode !== document.body && !this.isSuportPopOver)) {
			document.body.append(this);
			this.clientWidth;
		}
	}

	// 设置tips位置
	#setPosition() {
		if (this.trigger?.includes("contextmenu")) return;
		if (!this.node) return
		const { left, top, right, bottom, width } = this.node.getBoundingClientRect();
		this.style.setProperty("--left", parseInt(left + window.pageXOffset));
		this.style.setProperty("--top", parseInt(top + window.pageYOffset));
		this.style.setProperty("--right", parseInt(right + window.pageXOffset));
		this.style.setProperty("--bottom", parseInt(bottom + window.pageYOffset));
		this.style.setProperty("--width", parseInt(width));
		if (this.auto.length) {
			// 自动识别位置
			const w = window.innerWidth;
			const h = window.innerHeight;
			const BOUND = {
				w: this.#pop.offsetWidth + 10,
				h: this.#pop.offsetHeight + 10,
			};
			if (top < BOUND.h) {
				const dir = ["bottom", "BL", "BR"].find((el) => this.auto.includes(el));
				dir && (this.dir = dir);
				return;
			}
			if (h - bottom < BOUND.h) {
				const dir = ["top", "TL", "TR"].find((el) => this.auto.includes(el));
				dir && (this.dir = dir);
				return;
			}
			if (left < BOUND.w) {
				const dir = ["right", "RT", "RB"].find((el) => this.auto.includes(el));
				dir && (this.dir = dir);
				return;
			}
			if (w - right < BOUND.w) {
				const dir = ["left", "LT", "LB"].find((el) => this.auto.includes(el));
				dir && (this.dir = dir);
				return;
			}
		}
	}

	/**
	 * @description 显示提示
	 */
	showTips() {
		setTimeout(() => {
			this.#render();
			this.open = true;
		}, 200);
	}

	hideTips() {
		if (this.#hideTimer) {
			clearTimeout(this.#hideTimer)
		}
		this.#hideTimer = setTimeout(() => {
			this.open = false;
			this.#hideTimer = null;
		}, 100);
	}

	// 初始化
	init(target, option) {
		if (!target) return;
		if (!(target.clientWidth || target.offsetWidth)) return;
		this.target = target;
		this.textContent = option.tips;
		Object.keys(option).forEach((el) => {
			if (option[el] && el !== 'open') {
				this[el] = option[el];
			}
		});
		if (option.dir.includes(",")) {
			this.auto = option.dir;
			this.dir = option.dir.split(",")[0];
		}
		return this;
	}
}

if (!customElements.get("jk-pop")) {
	customElements.define("jk-pop", PopWebComponent);
}
