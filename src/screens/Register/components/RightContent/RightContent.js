import React, { Component } from 'react';
import { withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../actions/profile';
import { InputRange, MultiSelect } from '../../../../components';
import stateList from '../../../../mock/state.json';
import { formatPhoneNumber, isValidEmail } from '../../../../utils';
import './style.css';

export class RightContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        telephone: '',
        age: 28,
        email: '',
        state: '',
        country: '',
        address: 'Home',
        address1: '',
        address2: '',
        interests: [],
        subscribenewsletter: false
      },
      errors: {
        user: {
          firstName: 'Enter First Name',
          telephone: 'Enter Telephone',
          email: 'Email is not valid!',
          address1: 'Enter address1',
          address2: 'Enter address2',
          interests: 'Enter your Interests'
        }
      },
      validForm: false,
      submitted: false
    }
  }

  componentDidMount() {
    if(this.props.profile) {
      this.setState({ user: this.props.profile });
      if (this.props.profile.email) {
        this.resetErrorMsg();
      }
    }
  }

  validationErrorMessage = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'firstName': 
        errors.user.firstName = value.length < 1 ? 'Enter First Name' : '';
        break;
      case 'email': 
        errors.user.email = isValidEmail(value) ? '' : 'Email is not valid!';
        break;
      case 'telephone': 
        errors.user.telephone = value.length < 1 && value.length > 10 ? 'Enter valid telephone number' : '';
        break;
      case 'address1': 
        errors.user.address1 = value.length < 1 ? `Enter ${this.state.user.address} address1` : '';
        break;
      case 'address2': 
        errors.user.address2 = value.length < 1 ? `Enter ${this.state.user.address} address2` : '';
        break;
      default:
        break;
    }

    this.setState({ errors });
  }

  inputChange = (event) => {
    let telphone = ''
    const { name, value } = event.target;
    const user = this.state.user;
    if (name === 'telephone') {
      telphone = formatPhoneNumber(value);
      user[name] = telphone;
    } else {
      user[name] = value;
    }
    this.setState({ user });
    this.validationErrorMessage(event);
  }

  checkboxChange = (event) => {
    const { name, checked } = event.target;
    const user = this.state.user;
    user[name] = checked;
    this.setState({ user });
  }

  onChangeAddress = (event) => {
    const user = this.state.user;
    user['address'] = event.target.value;
    this.setState({ user });
  }

  onChangeInputRange = (value) => {
    const user = this.state.user;
    user['age'] = value;
    this.setState({ user })
  }

  onSelectedInterest = (value) => {
    const user = this.state.user;
    const errors = this.state.errors;
    user['interests'] = value;
    errors.user.interests = value.length < 1 ? 'Enter your Interests' : '';
    this.setState({ user, errors });
  }

  validateForm = (errors) => {
    let valid = true;
    Object.entries(errors.user).forEach(item => {
      console.log(item)
      item && item[1].length > 0 && (valid = false)
    })
    return valid;
  }

  submitForm = async (event) => {
    this.setState({ submitted: true });
    this.props.dispatch(ActionCreators.formSubmittionStatus(true));
    const user = this.state.user;
    if (user && this.props.profile) {
      user.profileImage = this.props.profile.profileImage;
    }
    event.preventDefault();
    if (this.validateForm(this.state.errors) && this.props.profile && this.props.profile.profileImage) {
      console.info('Valid Form')
      this.props.dispatch(ActionCreators.addProfile(user));
      this.props.history.push('/confirm')
    } else {
      console.log('Invalid Form')
    }
  }

  resetErrorMsg = () => {
    let errors = this.state.errors;
    errors.user.firstName = ''
    errors.user.telephone = ''
    errors.user.email = ''
    errors.user.address1 = ''
    errors.user.address2 = ''
    errors.user.interests = ''
    this.setState({ errors });
  }

  render() {
    const { firstName, lastName, age, email, telephone, state, country, address, address1, address2, interests, subscribenewsletter } = this.state.user;
    const { submitted } = this.state;
    const listState = stateList.listStates.map((item, key) =>
      <option key={key} value={item.name}>{item.name}</option>
    );
    return (
      <div className="rightPanel">
        <div className="row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-3 mb-2">
            <input type="text" value={firstName} name="firstName" onChange={(e) => { this.inputChange(e)} } className="form-control" placeholder="First Name" />
            { submitted && this.state.errors.user.firstName.length > 0 &&  <span className='error'>{this.state.errors.user.firstName}</span>}
          </div>
          <div className="col-sm-3 mb-2">
            <input type="text" value={lastName} name="lastName" onChange={(e) => { this.inputChange(e)} } className="form-control" placeholder="Last Name" />
          </div>
          <div className="col-sm-4">
          </div>
        </div>
        <div className="row">
          <label htmlFor="formControlAgeRange" className="col-sm-2 col-form-label">Age</label>
          <div className="col-sm-6 mb-2">
            <InputRange min={1} max={100} step={1} value={age} onChangeInputRange={this.onChangeInputRange} />
          </div>
          <div className="col-sm-4">
          </div>
        </div>
        <div className="row">
          <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-6 mb-2">
            <input type="email" value={email} name="email" onChange={(e) => { this.inputChange(e)} } className="form-control" id="email" placeholder="itjebasuthan@gmail.com" />
            { submitted && this.state.errors.user.email.length > 0 &&  <span className='error'>{this.state.errors.user.email}</span>}
          </div>
          <div className="col-sm-4">
          </div>
        </div>
        <div className="row">
          <label htmlFor="telephone" className="col-sm-2 col-form-label">Tel</label>
          <div className="col-sm-6 mb-2">
            <input type="text" pattern="[0-9]" maxLength="14" value={telephone} name="telephone" onChange={(e) => { this.inputChange(e)} }  className="form-control" id="telephone" placeholder="(212)477-1000" />
            { submitted && this.state.errors.user.telephone.length > 0 &&  <span className='error'>{this.state.errors.user.telephone}</span>}
          </div>
          <div className="col-sm-4">
          </div>
        </div>
        <div className="row">
          <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">State</label>
          <div className="col-sm-6 mb-2">
            <select className="custom-select" value={state} name="state" id="inlineFormCustomSelect" onChange={this.inputChange}>
              {listState}
            </select>
          </div>
          <div className="col-sm-4">
          </div>
        </div>
        <div className="row">
          <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">Country</label>
          <div className="col-sm-6 mb-2">
            <select className="custom-select" value={country} name="country" id="inlineFormCustomSelect" onChange={this.inputChange}>
              <option value="US">United States</option>
              <option value="IN">India</option>
            </select>
          </div>
          <div className="col-sm-4">
          </div>
        </div>
        <div className="row">
          <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">Address</label>
          <div className="col-sm-6 mb-2">
            <select className="custom-select mb-2" value={address} id="inlineFormCustomSelect" onChange={this.onChangeAddress}>
              <option value="Home">Home</option>
              <option value="Company">Company</option>
            </select>
            <div className="row col-sm-12">
              <div className="col-sm-5 mr-sm-1 mb-2">
                <textarea className="form-control" name="address1" rows="3" placeholder={address + ' Address1'} value={address1} onChange={this.inputChange}></textarea>
                { submitted && this.state.errors.user.address1.length > 0 &&  <span className='error'>{this.state.errors.user.address1}</span>}
              </div>
              <div className="col-sm-5 mr-sm-1 mb-2">
                <textarea className="form-control" name="address2" rows="3" placeholder={address + ' Address2'} value={address2} onChange={this.inputChange}></textarea>
                { submitted && this.state.errors.user.address2.length > 0 &&  <span className='error'>{this.state.errors.user.address2}</span>}
              </div>
            </div>
          </div>
          <div className="col-sm-4">
          </div>
        </div>
        <div className="row">
          <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">Interests</label>
          <div className="col-sm-6 mb-2">
            <MultiSelect className="form-control" searchPlaceholder="Interests" selected={interests} onSelect={this.onSelectedInterest} />
            { submitted && this.state.errors.user.interests.length > 0 &&  <span className='error'>{this.state.errors.user.interests}</span>}
          </div>
          <div className="col-sm-4">
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-6 mb-2">
            <label htmlFor="subscribenewsletter"><input type="checkbox" checked={subscribenewsletter} name="subscribenewsletter" onChange={this.checkboxChange} id="subscribenewsletter" style={{margin: '10px'}} />Subscribe to the news letter</label>
          </div>
          <div className="col-sm-4">
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5 mb-2">
          </div>
          <div className="col-sm-4">
            <button type="button" className="button" onClick={this.submitForm}>Submit</button>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(RightContent));
