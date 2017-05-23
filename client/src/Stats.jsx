import Component from 'inferno-component'
import './Stats.css'

class Stats extends Component {

  render() {
    return (
        <div id="statsContainer">
          Found <b>{this.props.stats.nbHits}</b> items in {this.props.stats.time} ms
        </div>
    );
  }
}

export default Stats
