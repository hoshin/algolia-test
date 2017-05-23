import Component from 'inferno-component'
import './Stats.css'

class Stats extends Component {

  render() {
    return (
        <div id="statsContainer">
          <div className="inline field">
            <div className="ui">
              <b>{this.props.stats.nbHits}</b> item(s) found in {this.props.stats.time} ms
            </div>
          </div>
        </div>
    );
  }
}

export default Stats
