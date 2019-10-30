import React, { Component } from 'react';

class Square extends Component {
  render() {
    return (
      <button className='square'
        id={this.props.index}
        onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    )
  }
}

export default Square;
