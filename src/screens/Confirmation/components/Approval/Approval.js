import React, { Component } from 'react';
import { withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import { UserDetails } from '../../../../components';
import { setStore } from '../../../../utils';
import './style.css';

export class Approval extends Component {
  agree = () => {
    if (this.props.user.firstName) {
      setStore('user', this.props.user);
      alert('Congratulation your profile Completed successfully!');
      this.props.history.push('/home');
    } else {
      alert('Invalid User Details!');
      this.props.history.push('/register');
    }
  }

  render() {
    return (
      <div className="rightPanel approvalcontainer">
        <UserDetails user={this.props.user}/>
        <div className="aggreebtnContainer"><button type="button" className="button" onClick={this.agree}>Agree</button></div>
      </div>
    )
  }
}

Approval.propTypes = {
  user: PropTypes.object
}

export default withRouter(Approval);
