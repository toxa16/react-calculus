import React from 'react';

import NumberDisplay from './NumberDisplay';
import DigitButton from './DigitButton';

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
        value = state.value * 10 + num;
      }
      return {
        isNewOperand: false,
        value,
      }
    });
  }

  handleActionClick(action) {
    this.setState(state => {
      const result = this.calculate(state);
      return {
        action,
        isNewOperand: true,
        prevOperand: result,
        value: result,
      }
    });
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
      case 'multiply': {
        return state.prevOperand * state.value;
      }
      case 'divide': {
        if (state.value === 0) {
          return 0;   // TODO: division by zero
        } else {
          return state.prevOperand / state.value;
        }
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
          <DigitButton value="7" onClick={ () => this.handleNumberClick(7) } />
          <DigitButton value="8" onClick={ () => this.handleNumberClick(8) } />
          <DigitButton value="9" onClick={ () => this.handleNumberClick(9) } />
          <button onClick={ () => this.handleActionClick('divide') }>/</button>
          <button onClick={ () => this.handleClearClick() }>Clear</button>
        </div>
        <div>
          <DigitButton value="4" onClick={ () => this.handleNumberClick(4) } />
          <DigitButton value="5" onClick={ () => this.handleNumberClick(5) } />
          <DigitButton value="6" onClick={ () => this.handleNumberClick(6) } />
          <button onClick={ () => this.handleActionClick('multiply') }>*</button>
        </div>
        <div>
          <DigitButton value="1" onClick={ () => this.handleNumberClick(1) } />
          <DigitButton value="2" onClick={ () => this.handleNumberClick(2) } />
          <DigitButton value="3" onClick={ () => this.handleNumberClick(3) } />
          <button onClick={ () => this.handleActionClick('substract') }>-</button>
        </div>
        <div>
          <DigitButton value="0" onClick={ () => this.handleNumberClick(0) } />
          <button>.</button>
          <button onClick={ this.handleEqualClick.bind(this) }>=</button>
          <button onClick={ () => this.handleActionClick('add') }>+</button>
        </div>
      </div>
    );
  }
}
