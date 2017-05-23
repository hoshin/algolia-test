import Component from 'inferno-component'
import './SearchBar.css'

class SearchBar extends Component {

  render() {
    return (
        <div id="searchBarContainer" className="ui right icon input">
          <input type="text" onKeyUp={this.props.onChangeHandler} />
          <i class="search icon"></i>
        </div>
    );
  }
}

export default SearchBar
