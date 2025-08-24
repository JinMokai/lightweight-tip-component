
/**
 * This is a basic class configuration
 */
export default class BaseWebComponent extends HTMLElement {

    #mounted = false;
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    render(html, css) {
        const globalSheet = new CSSStyleSheet();
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(css);
        this.shadowRoot.adoptedStyleSheets = [globalSheet, sheet];
        this.shadowRoot.innerHTML = html;
    }

    /**
     * Get the specified slot
     * @param {string} name
     * @returns {HTMLSlotElement}
     */
    getSlot(name) {
        return this.shadowRoot.querySelector(`slot[name="${name}"]`);
    }

    /**
     * Get the default slot
     * @returns {HTMLSlotElement}
     */
    getDefaultSlot() {
        return this.shadowRoot.querySelector("slot:not([name])");
    }

    /**
     * Get host Element
     * @returns {HTMLElement}
     */
    getHostElement() {
        return this.shadowRoot.host;
    }

    get name() {
        return this.getAttribute('name')
    }
    set name(value) {
        return this.setAttribute('name', value)
    }
    get attr() {
        const attrs = ['type', 'class']
        return [...this.attributes]
            .filter((el) => !el.name.startsWith("on") && !attrs.includes(el.name))
            .map((e) => e.name + "='" + (e.value || 'true') + "'").join(' ')
    }

    // slot元素渲染完成
    renderSlot() {
        if (!this.slots) {
            this.slots = [...this.shadowRoot.querySelectorAll('slot')]
        }
        if (!this.slots.length) return
        return new Promise((resolve) => {
            if (this.#mounted) {
                resolve()
            } else {
                Promise.all(this.slots.map(el => new Promise((_resolve, reject) => {
                    el.addEventListener("slotchange", () => {
                        _resolve()
                    })
                })))
                    .then(() => {
                        console.log('slot加载完成')
                        this.#mounted = true
                        resolve()
                    })
            }
        })
    }
}
