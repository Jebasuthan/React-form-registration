import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';

export class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      userInput: ''
    }
  }

  componentDidMount() {
    if (this.props.profile) {
      this.setState({ selected: this.props.profile.interests });
    }
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.setState({ userInput: event.target.value });
      this.addTag(event.target.value)
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ userInput: e.target.value });
  }

  addTag = (value) => {
    let current = this.state.selected;
    if (this.state.selected.indexOf(value) === -1) {
      current.push(value);
      this.setState({ selected: current, userInput: '' });
    } else {
      current.splice(this.state.selected.indexOf(value), 1);
      this.setState({ selected: current, userInput: '' });
    }
    this.props.onSelect(this.state.selected);
  }

  removeTag = (index) => {
    let current = this.state.selected;
    current.splice(index, 1);
    this.setState({ selected: current });
    this.props.onSelect(this.state.selected);
  }

  render() {
    const listItems = this.state.selected.map((value, index) => {
      return (
        <div className="tags" key={index}> { value }
          <span onClick={e => { e.preventDefault(); this.removeTag(index); }}> x </span>
        </div>
      );
    })
    return (
      <div>
        <input type="text" value={this.state.userInput} onKeyPress={this.handleKeyPress} onChange={(e) => { this.handleChange(e) }} placeholder={this.props.searchPlaceholder} className={this.props.className} />
        {listItems}
      </div>
    )
  }
}

MultiSelect.propTypes = {
  searchPlaceholder: PropTypes.string,
  selected: PropTypes.array,
  className: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onUserInput: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(MultiSelect);
