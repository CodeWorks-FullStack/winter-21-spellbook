import { ProxyState } from "../AppState.js"
import { apiSpellsService } from "../Services/ApiSpellsService.js"

function _drawAllSpells() {
  const apiSpells = ProxyState.apiSpells
  let template = ''
  apiSpells.forEach(s => template += `<li class="selectable p-1" onclick="app.apiSpellsController.getActiveSpell('${s.index}')">${s.name}</li>`)
  document.getElementById('api-spells').innerHTML = template
}

function _drawActiveSpell() {
  const spell = ProxyState.activeSpell
  if (!spell) {
    document.getElementById('active-spell').innerHTML = ''
    return
  }
  document.getElementById('active-spell').innerHTML = spell.Template
}

// user doesnt trigger this
// its outside the constructor because the constructor cannot/should not be async
async function _getAllSpells() {
  try {
    await apiSpellsService.getAllApiSpells()
  } catch (error) {
    console.error(error)
  }
}

export class ApiSpellsController {
  constructor() {
    ProxyState.on('apiSpells', _drawAllSpells)
    ProxyState.on('activeSpell', _drawActiveSpell)

    // get the api data
    _getAllSpells()
  }

  async getActiveSpell(spellName) {
    try {
      await apiSpellsService.getActiveSpell(spellName)
    } catch (error) {
      console.error(error)
    }
  }

}


