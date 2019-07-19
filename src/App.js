import React from 'react';

import NumberDisplay from './NumberDisplay';
import NumberButton from './NumberButton';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: null,
      isNewOperand: false,
      prevOperand: 0,
      value: 0,
    };
  }

  handleNumberClick(num) {
    this.setState(state => {
      let value;
      if (state.isNewOperand) {
        value = num;
      } else {
        value = state.value * 10 + num
      }
      return {
        isNewOperand: false,
        value,
      }
    });
  }

  handleActionClick(action) {
    this.setState(state => ({
      action,
      isNewOperand: true,
      prevOperand: state.value,
      value: this.calculate(state),
    }));
  }

  handleEqualClick() {
    this.setState(state => {
      return {
        action: null,
        isNewOperand: false,
        prevOperand: 0,
        value: this.calculate(state),
      }
    });
  }

  calculate(state) {
    switch (state.action) {
      case 'add': {
        return state.prevOperand + state.value;
      }
      case 'substract': {
        return state.prevOperand - state.value;
      }
      default: {
        return state.value;
      }
    }
  }

  handleClearClick() {
    this.setState({
      action: null,
      isNewOperand: false,
      prevOperand: 0,
      value: 0,
    });
  }

  render() {
    return (
      <div>
        <h1>Calculus</h1>
        <div>
          <NumberDisplay value={ this.state.value } />
        </div>
        <br />
        <div>
          <NumberButton value="7" onClick={ () => this.handleNumberClick(7) } />
          <NumberButton value="8" onClick={ () => this.handleNumberClick(8) } />
          <NumberButton value="9" onClick={ () => this.handleNumberClick(9) } />
          <button>/</button>
          <button onClick={ () => this.handleClearClick() }>Clear</button>
        </div>
        <div>
          <NumberButton value="4" onClick={ () => this.handleNumberClick(4) } />
          <NumberButton value="5" onClick={ () => this.handleNumberClick(5) } />
          <NumberButton value="6" onClick={ () => this.handleNumberClick(6) } />
          <button>*</button>
        </div>
        <div>
          <NumberButton value="1" onClick={ () => this.handleNumberClick(1) } />
          <NumberButton value="2" onClick={ () => this.handleNumberClick(2) } />
          <NumberButton value="3" onClick={ () => this.handleNumberClick(3) } />
          <button onClick={ () => this.handleActionClick('substract') }>-</button>
        </div>
        <div>
          <NumberButton value="0" onClick={ () => this.handleNumberClick(0) } />
          <button>.</button>
          <button onClick={ this.handleEqualClick.bind(this) }>=</button>
          <button onClick={ () => this.handleActionClick('add') }>+</button>
        </div>
      </div>
    );
  }
}
