import { ProxyState } from "../AppState.js"
import { Spell } from "../Models/Spell.js"
import { dndApi } from "./AxiosService.js"

class ApiSpellsService {
  async getAllApiSpells() {
    const res = await dndApi.get('')
    console.log(res.data.results)
    ProxyState.apiSpells = res.data.results
  }


  async getActiveSpell(spellName) {
    const res = await dndApi.get(spellName)
    console.log(res.data)
    // when working with a single object just cast the one instead of 'map'
    ProxyState.activeSpell = new Spell(res.data)
  }
}


export const apiSpellsService = new ApiSpellsService()