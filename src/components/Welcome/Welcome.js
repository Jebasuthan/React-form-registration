import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export class Welcome extends Component {
  render() {
    return (
      <div className="marquee"><p>Welcome {this.props.user.firstName} {this.props.user.lastName} !</p></div>
    )
  }
}

Welcome.propTypes = {
  user: PropTypes.object
}

export default Welcome;
