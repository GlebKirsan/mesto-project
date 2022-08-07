export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(card, toStart = true) {
        if(toStart) {
            this._container.prepend(card);
        } else {
            this._container.append(card);
        }
    }

    renderItems() {
        this._renderedItems.forEach(item => {
          this._renderer(item);
        });
      }
}