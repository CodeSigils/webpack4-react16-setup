import React, {Component} from "react"
import './css/main.css'
import creepyCookies from './img/food_cookies2.jpeg'

const App = (props) => {
  return (
    <div><h3>
      Hello from functional
    </h3>
      <img src={creepyCookies} />
    </div>
  )
}

/*
class App extends Component {
  render() {
    return(
      <div>Hello from react</div>
    );
  }
}
*/

export default App
