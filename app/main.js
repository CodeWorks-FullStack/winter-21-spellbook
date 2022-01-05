import { ApiSpellsController } from "./Controllers/ApiSpellsController.js"
import { MySpellsController } from "./Controllers/MySpellsController.js"

class App {
  apiSpellsController = new ApiSpellsController()
  mySpellsController = new MySpellsController()
}

window["app"] = new App()
