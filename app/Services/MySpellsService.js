import { ProxyState } from "../AppState.js"
import { Spell } from "../Models/Spell.js"
import { sandboxApi } from "./AxiosService.js"

class MySpellsService {

  async getMySpells() {
    const res = await sandboxApi.get('')
    console.log(res.data)
    ProxyState.mySpells = res.data.map(s => new Spell(s)).sort((a, b) => {
      return a.name > b.name ? 1 : (a.name === b.name) ? 0 : -1
    })
  }

  setActiveSpell(id) {
    let spell = ProxyState.mySpells.find(s => s.id == id)
    if (!spell) {
      console.error("invalid id")
      return
    }
    ProxyState.activeSpell = spell
  }

  async addSpell() {
    const found = ProxyState.mySpells.find(s => s.name === ProxyState.activeSpell.name)
    if (found) {
      alert('You already have that spell')
      return
    }


    const res = await sandboxApi.post('', ProxyState.activeSpell)
    console.log(res.data)
    // Adds the new spell to the list of spells as a 'Spell' object as opposed to a pojo
    // this triggers the 'listeners'
    const spell = new Spell(res.data)
    ProxyState.mySpells = [...ProxyState.mySpells, spell].sort((a, b) => {
      return a.name > b.name ? 1 : (a.name === b.name) ? 0 : -1
    })
    ProxyState.activeSpell = spell
  }

  async prepareSpell() {
    const spell = ProxyState.activeSpell
    //change locally
    spell.prepared = !spell.prepared
    // save change to server
    const res = await sandboxApi.put(spell.id, spell)
    ProxyState.mySpells = ProxyState.mySpells
  }

  async removeSpell() {
    let spell = ProxyState.activeSpell
    const res = await sandboxApi.delete(spell.id)
    console.log(res.data)
    ProxyState.mySpells = ProxyState.mySpells.filter(s => s.id !== spell.id)
    ProxyState.activeSpell = null
  }

}


export const mySpellsService = new MySpellsService()

