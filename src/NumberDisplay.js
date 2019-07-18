import React from 'react';

export default class NumberDisplay extends React.Component {
  render() {
    return (
      <input type="number" value={ this.props.value } readOnly />
    );
  }
}
