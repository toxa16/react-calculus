import React from 'react';

export default class DigitButton extends React.Component {
  render() {
    return (
      <button onClick={ () => this.props.onClick() }>
        { this.props.value }
      </button>
    );
  }
}