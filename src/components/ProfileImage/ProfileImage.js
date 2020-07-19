import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter} from "react-router-dom";
import { ActionCreators } from '../../actions/profile';
import { getStore } from '../../utils';
import './style.css';

export class ProfileImage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      profileImage: null
    }
    this.profileImgRef = createRef()
    this.handleClick = this.handleClick.bind(this);
  }

  profileImageSelection = event => {
    let file = this.profileImgRef.current.files[0]
    if (file) {
      let obj = new FileReader()
      obj.readAsDataURL(file)
      obj.onloadend = function (e) {
        this.setState({
          selectedFile: file,
          profileImage: obj.result
        });
        this.props.dispatch(ActionCreators.updateProfileImage(obj.result));
      }.bind(this)
    }
  }

  handleClick(e) {
    this.profileImgRef.current.click();
  }

  logout = (event) => {
    event.preventDefault();
    this.props.history.push('/login')
  }

  render() {
    const { profileImage }  = this.props.profile;
    return (
      <div className="leftPanel">
        <div className="container">
         { profileImage && <img src={profileImage} alt="" className="profileImage" onClick={this.handleClick} /> }
          <button type="button" htmlFor="profileImg" className="profileImageSelection" onClick={this.handleClick}>{!profileImage ? 'Upload your Photo' : ''}</button>
          <input type="file" accept="image/*" id="profileImg" ref={this.profileImgRef} style={{ visibility: "hidden" }} onChange={this.profileImageSelection} />
        </div>
        <div className="center">{ this.props.formSubmitted && this.props.profile && this.props.profile.profileImage.length === 0 &&  <span className='error'>Please Select Image</span> }</div>
        {
          this.props.location.pathname === '/confirm' && <NavLink to="/register" className="editProfile">Edit Profile</NavLink>
        }
        {
          getStore('user') && <button className="link-button" onClick={this.logout}>Logout</button>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    formSubmitted: state.user.formSubmitted
  }
}

export default connect(mapStateToProps)(withRouter(ProfileImage));
