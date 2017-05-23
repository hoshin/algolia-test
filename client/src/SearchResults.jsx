import Component from 'inferno-component'
import './SearchResults.css'

class SearchResults extends Component {

  createResultsPage(hitsToShow){
    return hitsToShow.map(hit => {
      return (
          <div className="hit item">
            <div className="image">
              <img src={hit.image}/>
            </div>
            <div className="content">
              <div>
                {/*not a fan of dangerouslySetInnerHTML but it's OK here IMO as the source is trusted*/}
                <a href={hit.link} className="header" target="_blank" dangerouslySetInnerHTML={{__html: hit._highlightResult.name.value}}></a>
              </div>
              <div className="item-footer">
                <span className="category">{hit.category}</span>
                <span className="rank">
                    <i className="line chart icon"></i>{hit.rank}
                </span>
              </div>
            </div>
          </div>
      )
    })
  }
  render() {
    return (
        <div id="hitsContainer" className="SearchResults">
          {this.props.hits? this.createResultsPage(this.props.hits) : 'No matches to show'}
        </div>
    );
  }
}

export default SearchResults
