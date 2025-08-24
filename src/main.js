
import BaseWebComponent from "./base.js";
import PopWebComponent from "./pop/index.js";
// utils
import isSupportAbortController from "./utils/isSupportAbortController.js";

import style from './style.css?inline' assert { type: 'css' };

export class TipWebComponent extends BaseWebComponent {

  // 当前文本在父元素中是否隐藏
  #isHidden = false;
  // 鼠标是否进入盒子内
  #isInBox = false;
  // tips 的元素引用
  #tipEl = null;
  // 隐藏延迟定时器
  #hideTimer = null;
  // 默认的全局abort
  #abortSignal = null;
  // 提示的abort
  #abortTipSignal = null;

  constructor() {
    super();
    this.renderHtml();
    this.#initAddEvent();
  }

  static define(tagName = "tip-web-component", register = customElements) {
    if (!register.get(tagName)) {
      register.define(tagName, this);
      return TipWebComponent;
    }
  }

  connectedCallback() {
    this.flush();
    this.initTip()
  }

  initTip() {
    const getWebComponentEl = this.shadowRoot.querySelector('.tip-web-component');
    this.#tipEl = new PopWebComponent().init(getWebComponentEl, {
      tips: this.getFullTextContent(),
      dir: "top,bottom",
      trigger: ['hover', 'focus'],
    });

    this.#addTipEvents();
  }

  /**
   * @description 初始化事件监听
   */
  #initAddEvent() {
    this.#setupEventListeners(this, [
      { event: 'mouseenter', handler: this.#mouseEnterHandler },
      { event: 'mouseleave', handler: this.#mouseLeaveHandler }
    ], 'main');
  }

  /**
   * @description 统一的事件监听器设置方法
   * @param {EventTarget} target - 事件目标
   * @param {Array} events - 事件配置数组
   * @param {string} type - 事件类型标识（'main' | 'tip'）
   */
  #setupEventListeners(target, events, type = 'main') {
    if (!target || !events.length) return;

    // 清理已存在的AbortController
    const signalProperty = type === 'main' ? '#abortSignal' : '#abortTipSignal';
    if (this[signalProperty]) {
      this[signalProperty].abort();
    }

    if (isSupportAbortController()) {
      const abortController = new AbortController();
      this[signalProperty] = abortController.signal;

      events.forEach(({ event, handler }) => {
        target.addEventListener(event, handler, {
          signal: this[signalProperty]
        });
      });
    } else {
      // 向后兼容：传统事件监听方式
      events.forEach(({ event, handler }) => {
        target.addEventListener(event, handler);
      });
    }
  }

  renderHtml() {
    const html = `
      <div class="tip-web-component" type="tip-web-component" part="tip-web-component">
        <slot></slot>
      </div>
    `
    this.render(html, style);
  }


  disconnectedCallback() {
    this.#cleanup();
  }

  /**
   * @description 统一的清理方法
   */
  #cleanup() {
    if (this.#abortSignal) {
      this.#abortSignal.abort();
    } else if (!isSupportAbortController()) {
      this.removeEventListener('mouseenter', this.#mouseEnterHandler);
      this.removeEventListener('mouseleave', this.#mouseLeaveHandler);
    }

    if (this.#abortTipSignal) {
      this.#abortTipSignal.abort();
    } else if (!isSupportAbortController() && this.#tipEl) {
      this.#tipEl.removeEventListener('mouseenter', this.#tipsEnterHandler);
      this.#tipEl.removeEventListener('mouseleave', this.#tipsLeaveHandler);
    }

    // 清理定时器
    if (this.#hideTimer) {
      clearTimeout(this.#hideTimer);
      this.#hideTimer = null;
    }

    // 重置引用
    this.#abortSignal = null;
    this.#abortTipSignal = null;
    this.#tipEl = null;
  }

  #mouseEnterHandler = () => {
    if (this.#hideTimer) {
      clearTimeout(this.#hideTimer);
      this.#hideTimer = null;
    }
    this.#isInBox = true;
    this.flush();
    this.showTip();
  }

  #mouseLeaveHandler = (event) => {
    if (event.relatedTarget && event.relatedTarget?.nodeName.includes('JK-')) {
      return;
    }

    this.#isInBox = false;
    this.#hideTimer = setTimeout(() => {
      this.hideTip();
      this.#hideTimer = null;
    }, 100);
  }

  showTip() {
    if (!this.#isHidden || !this.#isInBox) return;
    this.#tipEl.showTips()
  }

  hideTip() {
    if (this.#tipEl && this.#isHidden) {
      this.#tipEl.hideTips()
    }
  }

  /**
   * @description 为tips元素添加鼠标事件监听
   */
  #addTipEvents() {
    if (!this.#tipEl) return;

    this.#setupEventListeners(this.#tipEl, [
      { event: 'mouseenter', handler: this.#tipsEnterHandler },
      { event: 'mouseleave', handler: this.#tipsLeaveHandler }
    ], 'tip');
  }

  /**
   * @description 提示框鼠标进入事件
   */
  #tipsEnterHandler = () => {
    if (this.#hideTimer) {
      clearTimeout(this.#hideTimer);
      this.#hideTimer = null;
    }
  }
  /**
   * @description 提示框鼠标离开事件
   */
  #tipsLeaveHandler = () => {
    this.#hideTimer = setTimeout(() => {
      this.hideTip();
      this.#hideTimer = null;
    }, 100);
  }

  /**
 * @description 获取完整的文本内容
 */
  getFullTextContent() {
    const assignedNodes = this.getDefaultSlot().assignedNodes();
    return assignedNodes.map(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || '';
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        return node.textContent || node.innerText || '';
      }
      return '';
    }).join('').trim();
  }

  /**
   * @description 刷新提示
   */
  flush() {
    if (parseInt(this.getDefaultSlotWidth()) > parseInt(this.getDefaultParentNodeWidth())) {
      this.#isHidden = true;
    } else {
      this.#isHidden = false;
    }
  }

  /**
   * @description 获取插槽文本的宽度
   * @returns {number}
   */
  getDefaultSlotWidth() {
    const assignedNodes = this.getDefaultSlot().assignedNodes();
    let totalWidth = 0;

    assignedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const rect = node.getBoundingClientRect();
        totalWidth += rect.width;
      } else if (node.nodeType === Node.TEXT_NODE) {
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.textContent = node.textContent;
        document.body.appendChild(span);
        const textWidth = span.getBoundingClientRect().width;
        totalWidth += textWidth;
        document.body.removeChild(span);
      }
    });

    return totalWidth;
  }

  /**
   * @description 获取父元素宽度
   * @returns {number}
   */
  getDefaultParentNodeWidth() {
    return this.getDefaultSlot().parentNode.offsetWidth ||
      this.getDefaultSlot().parentNode.getBoundingClientRect()?.width || 0;
  }

  getParentNode() {
    return this.getDefaultSlot().parentNode;
  }
}


if (window.customElements.get('jk-tip') === undefined) {
  TipWebComponent.define('jk-tip');
}
