import Component from 'inferno-component'
import './AppStore.css'
import SearchZone from './SearchZone'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Appstore test</h2>
        </div>
        <SearchZone />

      </div>
    );
  }
}

export default App
