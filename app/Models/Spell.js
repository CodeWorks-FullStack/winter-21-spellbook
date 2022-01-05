export class Spell {
  constructor(data) {
    // dnd api has index property
    this.index = data.index
    // sandbox has Id
    this.id = data.id
    this.name = data.name
    this.description = data.description || data.desc.join('\n\n')
    this.level = data.level
    this.range = data.range
    this.duration = data.duration
    this.components = data.components
    this.prepared = data.prepared || false
  }

  get Template() {
    return `
    <div class="bg-light shadow p-4">
      <div class="text-center">
        <h2>${this.name}</h2>
        <h4>Duration: ${this.duration} | Level: ${this.level} | Range: ${this.range}</h4>
        <p>${this.components.join(' | ')}</p>
      </div>
      <p>${this.description}</p>
      <div class="d-flex justify-content-between align-items-baseline">
        ${this.Button}
      </div>
    </div>
    `
  }

  get Button() {
    if (this.index) {
      return `<button class="btn btn-success" onclick="app.mySpellsController.addSpell()">Add</button>`
    }
    return `
    <div class="me-3">
      <label for="prepared">Prepared</label>
      <input type="checkbox" id="prepared" ${this.prepared ? 'checked' : ''} onclick="app.mySpellsController.prepareSpell()" />
    </div>
    <button class="btn btn-danger" onclick="app.mySpellsController.removeSpell()">Remove</button>
    `
  }
}