import "./styles/base.scss"
import { Application } from "stimulus"
import { PasswordInputController } from "./controllers/password_input_controller"

const application = Application.start()
application.register("password-input", PasswordInputController)
