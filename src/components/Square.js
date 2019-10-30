import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Square extends Component {

  render() {
    const style={
        fontSize: 30,
        borderRadius: 0,
        maxWidth: '50px',
        maxHeight: '50px',
        minWidth: '50px',
        minHeight: '50px'
    }
    return (
    <Button variant="contained" style={style}
        id={this.props.index}
        color={this.props.value === 'X' ? 'primary' :
            this.props.value === 'O' ? 'secondary' : 'default'}
        onClick={() => this.props.onClick()}>

        {this.props.value || ''}
    </Button>
    )
  }
}

export default Square;
