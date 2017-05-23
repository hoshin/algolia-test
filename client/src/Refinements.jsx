import Component from 'inferno-component'
import './Refinements.css'

class SearchResults extends Component {
  constructor () {
    super()

    this.state = {
      showAll: false,
      maxToShow: 5
    }
  }

  toggleRefinement (e) {
    this.props.toggleRefinementHandler(e.currentTarget.getAttribute('value'))
  }

  checkmarkIfSelectedCategories(actualRefining){
    let checkmark = null
    if(actualRefining){
      checkmark = <i className="icon check"/>
    }
    return checkmark
  }

  createRefinementsMenu () {
    const categories = this.props.categories
    const allCategories = Object.keys(categories)
    const actualRefining = this.props.activeRefinements.length < allCategories.length

    const inactiveRefinements = allCategories.filter(category => {
      return this.props.activeRefinements.indexOf(category) < 0
    })

    const top = this.props.activeRefinements.map(refinement => {

      return (
          <div>
            {this.checkmarkIfSelectedCategories(actualRefining)}
            <a href="#" onClick={this.toggleRefinement.bind(this)} id={`cat_${refinement}`} value={refinement} >{refinement} ({categories[refinement]})</a>
          </div>
      )
    })

    let bottom = []
    if(actualRefining){
      bottom = inactiveRefinements.map(refinement => {
        return (
            <div>
              <a href="#" onClick={this.toggleRefinement.bind(this)} id={`cat_${refinement}`} value={refinement} >{refinement} ({categories[refinement]})</a>
            </div>
        )
      })
    }

    if(top.length && bottom.length){
      top.push(<div className="separator"/>)
    }

    let result = top.concat(bottom)
    if (!this.state.showAll) {
      result = result.splice(0, this.state.maxToShow)
    }
    return result
  }

  toggleShownCategories () {
    this.setState({ showAll: !this.state.showAll })
  }

  showToggle () {
    let showButton = (<div>
      <a href="#" onClick={this.toggleShownCategories.bind(this)}><i className="icon plus"/> </a>
    </div>)
    if (this.state.showAll) {
      showButton = (<div>
        <a href="#" onClick={this.toggleShownCategories.bind(this)}><i className="icon minus"/></a>
      </div>)
    }
    return showButton
  }

  render () {
    return (
        <div id="refinementContainer" className="categories">
          {this.createRefinementsMenu()}
          {this.showToggle()}
        </div>
    )
  }
}

export default SearchResults
