import React from 'react';

export default class NumberButton extends React.Component {
  render() {
    return (
      <button onClick={ () => this.props.onClick() }>
        { this.props.value }
      </button>
    );
  }
}