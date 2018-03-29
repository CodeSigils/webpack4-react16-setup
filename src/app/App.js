import React, {Component} from "react"
// import Style from './css/main.css'
import Header from './components/Header'
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'
import creepyCookies from './img/food_cookies2.jpeg'

const App = (props) => {
  return (
    <div>
      <Header />
      <main style={{ display: 'flex' }}>
        <RecipeList style={{ flex: 3 }} />
        <RecipeDetail style={{ flex: 5 }} />
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
