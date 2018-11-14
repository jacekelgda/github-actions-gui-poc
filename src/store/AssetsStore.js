import { decorate, computed, action } from "mobx";

export default class AssetsStore {
  _assets = [];

  get assets() {
    const cachedAssets = JSON.parse(
      localStorage.getItem("EditPanel.master.assets")
    );
    return cachedAssets ? cachedAssets : this._assets;
  }

  addAsset(value) {
    this.assets.push(value);
    localStorage.setItem(
      "EditPanel.master.assets",
      JSON.stringify(this.assets)
    );
  }
}

decorate(AssetsStore, {
  assets: computed,
  addAsset: action
});
