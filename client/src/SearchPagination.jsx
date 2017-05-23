import Component from 'inferno-component'
import './SearchPagination.css'

class SearchBar extends Component {

  changePage (e) {

    let pageToJumpTo = this.props.currentPage
    const buttonPressed = e.currentTarget.getAttribute('aria-label')
    switch (buttonPressed) {
      case 'First' :
        pageToJumpTo = 0
        break
      case 'Previous':
        pageToJumpTo = this.props.currentPage - 1
        break
      case 'Next':
        pageToJumpTo = this.props.currentPage + 1
        break
      case 'Last':
        pageToJumpTo = this.props.maxPages - 1
        break
      default:
        pageToJumpTo = buttonPressed
    }

    this.props.changePage(pageToJumpTo)
  }

  addPrecedingPages (currentPage) {
    const result = []

    if (currentPage > 1) {
      result.push(
          (<li className="ais-pagination--item ais-pagination--item__first">
            <a className="ais-pagination--link"
               aria-label="First"
               href="#" onClick={this.changePage.bind(this)}>«</a></li>)
      )
      result.push(
          (<li className="ais-pagination--item ais-pagination--item__previous">
            <a className="ais-pagination--link"
               aria-label="Previous"
               href="#" onClick={this.changePage.bind(this)}>‹</a></li>)
      )
    }

    const precPages = []
    for (let i = currentPage - 1; i >= 0 && i >= currentPage - 5; i--) {
      precPages.unshift(
          (
              <li className="ais-pagination--item ais-pagination--item__page"><a
                  className="ais-pagination--link" aria-label={i}
                  href="#"
                  onClick={this.changePage.bind(this)}>{i + 1}</a></li>
          )
      )
    }
    return result.concat(precPages)
  }

  addFollowingPages (currentPage, maxPages) {
    const result = []
    for (let i = currentPage + 1; i < maxPages && i < currentPage + 5; i++) {
      result.push(
          (
              <li className="ais-pagination--item ais-pagination--item__page"><a
                  className="ais-pagination--link" aria-label={i}
                  onClick={this.changePage.bind(this)}
                  href="#">{i + 1}</a></li>
          )
      )
    }

    if (currentPage < maxPages-1) {

      result.push((<li className="ais-pagination--item ais-pagination--item__next"><a className="ais-pagination--link"
                                                                                      aria-label="Next"
                                                                                      href="#"
                                                                                      onClick={this.changePage.bind(this)}>›</a>
      </li>))
      result.push((<li className="ais-pagination--item ais-pagination--item__last"><a className="ais-pagination--link"
                                                                                      aria-label="Last"
                                                                                      href="#"
                                                                                      onClick={this.changePage.bind(this)}>»</a>
      </li>))
    }
    return result
  }

  render () {
    return (
        <ul className="ais-pagination">
          {this.addPrecedingPages(this.props.currentPage)}
          <li className="ais-pagination--item ais-pagination--item__page ais-pagination--item__active"><a
              className="ais-pagination--link" aria-label={this.props.currentPage}
              href="#">{this.props.currentPage + 1}</a>
          </li>
          {this.addFollowingPages(this.props.currentPage, this.props.maxPages)}
        </ul>
    )
  }
}

export default SearchBar
