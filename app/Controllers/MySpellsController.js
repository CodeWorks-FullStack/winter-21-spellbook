import { ProxyState } from '../AppState.js'
import { mySpellsService } from '../Services/MySpellsService.js'
function _drawMySpells() {
  const spells = ProxyState.mySpells
  console.log(spells)
  // TODO render myspells to sidebar
  let template = ''
  spells.forEach(s => template += `<li class="selectable p-1" onclick="app.mySpellsController.setActiveSpell('${s.id}')">${s.name} ${s.prepared ? '<i class="mdi mdi-star text-info"></i>' : ''}</li>`)

  document.getElementById('my-spells').innerHTML = template
}

async function _getMySpells() {
  try {
    await mySpellsService.getMySpells()
  } catch (error) {
    console.error(error)
  }
}

export class MySpellsController {
  constructor() {
    ProxyState.on('mySpells', _drawMySpells)

    _getMySpells()
  }

  async addSpell() {
    try {
      await mySpellsService.addSpell()
    } catch (error) {
      console.error(error)
    }
  }

  setActiveSpell(id) {
    mySpellsService.setActiveSpell(id)
    bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('offcanvasRight')).hide()
  }

  async removeSpell() {
    try {
      await mySpellsService.removeSpell()
    } catch (error) {
      console.error(error)
    }
  }


  async prepareSpell() {
    try {
      await mySpellsService.prepareSpell()
    } catch (error) {
      console.error(error)
    }
  }

}