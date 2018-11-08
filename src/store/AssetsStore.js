import { decorate, observable, action } from 'mobx'

export default class AssetsStore {
    assets = []

    addAsset (value) {
        this.assets.push(value)
    }
}

decorate(AssetsStore, {
    assets: observable,
    addAsset: action,
})
