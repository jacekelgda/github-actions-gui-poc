import { decorate, observable, action, reaction } from 'mobx'

export default class AssetsStore {
    assets = []

    someReaction = reaction(() => { console.log('1')}, () => {console.log('2')})

    addAsset (value) {
        console.log('add asset ..', value)
        this.assets.push(value)
    }

    
}

decorate(AssetsStore, {
    assets: observable,
    addAsset: action,
})
