import React, {Component} from "react"
// import Style from './css/main.css'
import Header from './components/Header'
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'

/**
 * 
 fetch('http://reactrecipes.herokuapp.com/v1/recipes')
   // When response arrives we transform it to a JSON object inside a promise.
   .then(res => res.json())
   // Open console and network tap in dev tools and observe
   .then(json => console.log(json))
 *
 * Note: Use '.env' file with the DotENV library to define global variables. 
 * It is a good idea for security to exclude this file from version control 
 * (see .gitignore file)
 * 
 */

const App = (props) => {
  return (
    <div>
      <Header />
      <main style={{ display: 'flex' }}>
        <RecipeList style={{ flex: 3 }} />
        <RecipeDetail style={{ flex: 5 }} />
      </main>
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
