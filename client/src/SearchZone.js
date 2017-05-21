import Component from 'inferno-component'
import instantsearch from 'instantsearch.js/dist/instantsearch.js'
import config from '../config/base'
import './SearchZone.css'

class SearchBar extends Component {
  constructor () {
    super()
    this.search = instantsearch({
      appId: config.algolia.appId,
      apiKey: config.algolia.apiKey,
      indexName: config.algolia.indexName,
      urlSync: true
    })
  }

  getTemplate (templateName) {
    return document.getElementById(`${templateName}-template`).innerHTML
  }

  createContainingDivForWidget (containerId) {
    const container = document.createElement('div')
    container.setAttribute('id', containerId)
    return container
  }

  componentWillMount () {
    this.addSearchBarWidget()
    this.addHitsWidget()
    this.addStatsWidget()
    this.addPaginationWidget()
    this.addRefinementWidget()

    this.search.start()
  }

  addRefinementWidget () {
    this.refinementContainer = this.createContainingDivForWidget('refinement')
    this.search.addWidget(
        instantsearch.widgets.refinementList({
          container: this.refinementContainer,
          attributeName: 'category',
          sortBy: ['isRefined', 'count:desc', 'name:asc'],
          limit: 5,
          operator: 'or',
          showMore: {
            limit: 10,
          },
          searchForFacetValues: {
            placeholder: 'Search for categories',
            templates: {
              noResults: '<div class="sffv_no-results">No matching categories.</div>'
            },
          },
          templates: {
            header: '<h5>Category filter</h5>'
          },
          collapsible: {
            collapsed: false,
          },
        })
    )
  }

  addPaginationWidget () {
    this.paginationContainer = this.createContainingDivForWidget('pagination')
    this.search.addWidget(
        instantsearch.widgets.pagination({
          container: this.paginationContainer,
          scrollTo: this.searchInputContainer
        })
    )
  }

  addStatsWidget () {
    this.statsContainer = this.createContainingDivForWidget('stats')
    this.search.addWidget(
        instantsearch.widgets.stats({
          container: this.statsContainer,
        })
    )
  }

  addHitsWidget () {
    this.hitsContainer = this.createContainingDivForWidget('hits')
    this.search.addWidget(
        instantsearch.widgets.hits({
          container: this.hitsContainer,
          hitsPerPage: 10,
          templates: {
            item: this.getTemplate('hit'),
            empty: this.getTemplate('no-results'),
          }
        })
    )
  }

  addSearchBarWidget () {
    this.searchInputContainer = this.createContainingDivForWidget('search-input')

    this.search.addWidget(
        instantsearch.widgets.searchBox({
          container: this.searchInputContainer,
          placeholder: 'Search for apps'
        })
    )
  }

  componentDidMount () {
    document.getElementById('searchBarContainer').appendChild(this.searchInputContainer)
    document.getElementById('hitsContainer').appendChild(this.hitsContainer)
    document.getElementById('statsContainer').appendChild(this.statsContainer)
    document.getElementById('paginationContainer').appendChild(this.paginationContainer)
    document.getElementById('refinementContainer').appendChild(this.refinementContainer)
  }

  render () {
    return (
        <div id="searchZone">
          <div class="menu">
            <div id="refinementContainer"></div>
          </div>
          <div class="results">
            <div id="searchBarContainer" className="ui right icon input">
              <i class="search icon"></i>
            </div>
            <div id="statsContainer"></div>
            <div id="hitsContainer" className="ui items"></div>
            <div id="paginationContainer"></div>
          </div>
        </div>
    )
  }
}

export default SearchBar
