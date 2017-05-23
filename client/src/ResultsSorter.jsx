import Component from 'inferno-component'
import './ResultsSorter.css'
class SearchBar extends Component {

  sortResults(e) {
    this.props.sortHandler(e.currentTarget.value)
  }

  render () {
    return (
        <div id="sortContainer">
          <select className="ais-sort-by-selector ui dropdown" onChange={this.sortResults.bind(this)}>
            <option value="inferno">Most relevant</option>
            <option value="inferno_rank_asc">Lowest rank first</option>
            <option value="inferno_rank_desc">Highest rank first</option>
          </select>
        </div>
    )
  }
}

export default SearchBar
