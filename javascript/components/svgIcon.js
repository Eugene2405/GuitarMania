class SVGIcon extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.getAttribute("src")) {
      this.loadSVG();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue && name) {
      this.loadSVG();
    }
  }

  async loadSVG() {
    const src = this.getAttribute("src");
    if (!src) return;

    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to load SVG: ${response.statusText}`);
      }

      const svgContent = await response.text();
      this.renderSVG(svgContent);
    } catch (error) {
      console.error(error);
      this.shadowRoot.innerHTML = "<p>ICON FAILED TO LOAD</p>";
    }
  }

  renderSVG(svgContent) {
    const style = document.createElement("style");
    style.textContent = `
    :host {
      display: inline-block;
    }
    
    svg, path {
      width: inherit;
      height: inherit;

      stroke: inherit;
      stroke-width: inherit;
    }
    `;

    this.shadowRoot.innerHTML = svgContent;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define("svg-icon", SVGIcon);
