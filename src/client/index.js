import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'

console.log(checkForName);

alert("I EXIST")
console.log("CHANGE!!");


//imprt styles from src/client/styles ...to make webpack read it
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
//export js functions
export {
    handleSubmit
   }