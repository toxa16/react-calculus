import React from 'react';

import NumberDisplay from './NumberDisplay';
import DigitButton from './DigitButton';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: null,
      decimalRank: 0,
      isNewOperand: false,
      prevOperand: 0,
      value: 0,
    };
  }

  handleDigitClick(num) {
    this.setState(state => {
      let decimalRank = state.decimalRank;
      let value;
      if (state.isNewOperand) {
        value = num;
      } else if (decimalRank !== 0) {
        let divider = 1;
        for (let i = 0; i < decimalRank; i++) {
          divider *= 10;
        }
        value = state.value + num / divider;
        decimalRank++;
      } else {
        value = state.value * 10 + num;
      }
      return {
        decimalRank,
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
        decimalRank: 0,
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
        decimalRank: 0,
        isNewOperand: true,
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

  handlePointClick() {
    this.setState(state => {
      if (state.isNewOperand) {
        return {
          decimalRank: 1,
          isNewOperand: false,
          value: 0,
        }
      } else if (state.decimalRank !== 0) {
        return {};
      }
      return {
        decimalRank: 1,
      }
    });
  }

  handleClearClick() {
    this.setState({
      action: null,
      decimalRank: 0,
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
          <DigitButton value="7" onClick={ () => this.handleDigitClick(7) } />
          <DigitButton value="8" onClick={ () => this.handleDigitClick(8) } />
          <DigitButton value="9" onClick={ () => this.handleDigitClick(9) } />
          <button onClick={ () => this.handleActionClick('divide') }>/</button>
          <button onClick={ () => this.handleClearClick() }>Clear</button>
        </div>
        <div>
          <DigitButton value="4" onClick={ () => this.handleDigitClick(4) } />
          <DigitButton value="5" onClick={ () => this.handleDigitClick(5) } />
          <DigitButton value="6" onClick={ () => this.handleDigitClick(6) } />
          <button onClick={ () => this.handleActionClick('multiply') }>*</button>
        </div>
        <div>
          <DigitButton value="1" onClick={ () => this.handleDigitClick(1) } />
          <DigitButton value="2" onClick={ () => this.handleDigitClick(2) } />
          <DigitButton value="3" onClick={ () => this.handleDigitClick(3) } />
          <button onClick={ () => this.handleActionClick('substract') }>-</button>
        </div>
        <div>
          <DigitButton value="0" onClick={ () => this.handleDigitClick(0) } />
          <button onClick={ this.handlePointClick.bind(this) }>.</button>
          <button onClick={ this.handleEqualClick.bind(this) }>=</button>
          <button onClick={ () => this.handleActionClick('add') }>+</button>
        </div>
        <br />
        <div>
          <small>
            <span style={ { marginRight: '20px' } }>action: { this.state.action }</span>
            <span style={ { marginRight: '20px' } }>decimalRank: { this.state.decimalRank }</span>
            <span style={ { marginRight: '20px' } }>isNewOperand: { this.state.isNewOperand.toString() }</span>
            <span style={ { marginRight: '20px' } }>prevOperand: { this.state.prevOperand }</span>
            <span>value: { this.state.value }</span>
          </small>
        </div>
      </div>
    );
  }
}
