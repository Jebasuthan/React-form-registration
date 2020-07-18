import React, { Component } from 'react';
import { Divider, ProfileImage } from '../../components';
import RightContent from './components/RightContent';

export class Register extends Component {
  render() {
    return (
      <div className="row">
        <ProfileImage />
        <Divider />
        <RightContent />
      </div>
    )
  }
}

export default Register;
