import Component from 'inferno-component'
import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'
import config from '../config/base'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import Stats from './Stats'
import SearchPagination from './SearchPagination'
import ResultsSorter from './ResultsSorter'
import Refinements from './Refinements'
import './SearchZone.css'

class SearchZone extends Component {
  constructor () {
    super()
    this.client = algoliasearch(config.algolia.appId, config.algolia.apiKey)
    this.helper = algoliasearchHelper(this.client, config.algolia.indexName, {
      disjunctiveFacets: ['category'],
      hitsPerPage: 10
    })
    this.state = {searchResults:[]};
    this.helper.on('result', (content) => {
      this.setState({searchResults:content})
    })
    this.helper.setQuery("")
    this.helper.search()
  }

  onkeyupHandler() {
    this.helper.setQuery(document.getElementById("searchBarInput").value).search();
  }

  changePageHandler(pageNumber) {
    this.helper.setPage(pageNumber).search()
  }

  sortHandler(sortPreference) {
    this.helper.setIndex(sortPreference).search()
  }

  refinementHandler(refinementToToggle){
    this.helper.toggleRefine('category', refinementToToggle).search()
  }

  render () {
    let rawResults = this.state.searchResults._rawResults
    let refinements = rawResults && rawResults[0].facets.category? Object.keys(rawResults[0].facets.category) : []
    let categoriesAvailable = this.state.searchResults.disjunctiveFacets
    return (
        <div id="searchZone">
          <div className="menu">
            <Refinements
                toggleRefinementHandler={this.refinementHandler.bind(this)}
                categories={categoriesAvailable && categoriesAvailable[0]? categoriesAvailable[0].data : []}
                activeRefinements={refinements}
            />
          </div>
          <div className="results">
            <SearchBar onChangeHandler={this.onkeyupHandler.bind(this)}/>
            <div className="options">
              <Stats id="statsContainer" stats={{nbHits:this.state.searchResults.nbHits, time:this.state.searchResults.processingTimeMS}}/>
              <ResultsSorter sortHandler={this.sortHandler.bind(this)}/>
            </div>
            <SearchResults className="ui items" hits={this.state.searchResults.hits} />
            <SearchPagination id="paginationContainer" currentPage={this.state.searchResults.page} maxPages={this.state.searchResults.nbPages} changePage={this.changePageHandler.bind(this)}/>
          </div>
        </div>
    )
  }
}

export default SearchZone
