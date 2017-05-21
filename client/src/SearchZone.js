import Component from 'inferno-component'
import instantsearch from 'instantsearch.js/dist/instantsearch.js'
import './SearchZone.css'

class SearchBar extends Component {
  constructor () {
    super()
    this.searchInputContainer = document.createElement('div')
    this.searchInputContainer.setAttribute('id', 'search-input')
    this.hitsContainer = document.createElement('div')
    this.hitsContainer.setAttribute('id', 'hits')
    this.search = instantsearch({
      appId: 'A6K5WS8XNB',
      apiKey: '6867593aacec55ae1c6f1c6903176bb8',
      indexName: 'inferno',
      urlSync: true
    })

    this.search.addWidget(
        instantsearch.widgets.searchBox({
          container: this.searchInputContainer,
          placeholder: 'Search for apps'
        })
    )

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

    this.search.start()
  }

  getTemplate (templateName) {
    return document.getElementById(`${templateName}-template`).innerHTML
  }

  componentDidMount () {
    document.getElementById('searchBarContainer').appendChild(this.searchInputContainer)
    document.getElementById('hitsContainer').appendChild(this.hitsContainer)
  }

  render () {
    return (
        <div id="searchZone">
          <div id="searchBarContainer" className="ui right icon input"><i class="search icon"></i></div>
          <div id="hitsContainer" className="ui cards"></div>
        </div>
    )
  }
}

export default SearchBar
