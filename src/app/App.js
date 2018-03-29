import React, {Component} from "react"
import Style from './css/main.css'
import Header from './components/Header'
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'
import creepyCookies from './img/food_cookies2.jpeg'

const App = (props) => {
  return (
    <div style={Style}>
      <Header />
      <main>
        <RecipeList />
        <RecipeDetail />
      </main>
      {/* <img src={creepyCookies} /> */}
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
