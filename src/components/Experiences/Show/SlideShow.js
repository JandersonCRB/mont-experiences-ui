import React, {Component, Children} from 'react';

import './SlideShow.scss';
import Next from 'material-ui-icons/KeyboardArrowRight';
import Back from 'material-ui-icons/KeyboardArrowLeft';

class SlideShow extends Component {
  state = {
    total: 0,
    current:0,
  }

  componentDidMount() {
    const { children } = this.props;
    this.setState({ total: Children.count(children)});
    this.interval = setInterval(this.showPrevious, 3000);
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  showNext = () => {
    const { total, current} = this.state;
    this.setState({
      current: current + 1 === total? 0 : current + 1
    });
  };

  showPrevious = () => {
    const { total, current} = this.state;
    this.setState({
      current: current === 0 ? total -1  : current - 1
    });
  };

  render () {
    const { children } = this.props;
    const bullets = Array(this.state.total).fill("");
    bullets[this.state.current] = "";
    return (
      <div className="slideshow">
        <div className="slide-wrap">
          {Children.toArray(children)[this.state.current]}
        </div>
      </div>
    )
  }
}

export default SlideShow;
