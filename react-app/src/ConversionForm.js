import React from 'react';
import Select from 'react-select';

class ConversionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      inputAmount: '', 
      outputAmount: '',
      fromCurrency: '',
      toCurrency: '',
      options: [{
          value: 'USD',
          label: 'US Dollar'
        }, {
          value: 'EUR',
          label: 'Euro'
        }, {
          value: 'JPY',
          label: 'Japanese Yen'
        }
      ]
    };
    this.onInputAmountChange = this.onInputAmountChange.bind(this);
    this.onFromCurrencyChange = this.onFromCurrencyChange.bind(this);
    this.onToCurrencyChange = this.onToCurrencyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onInputAmountChange(event) {
    this.setState({inputAmount: event.target.value});
  }

  onFromCurrencyChange(event) {
    this.setState({fromCurrency: event.target.value});
  }

  onToCurrencyChange(event) {
    this.setState({toCurrency: event.target.value});
  }

  handleSubmit(event) {
    alert(this.state.inputAmount, this.state.fromCurrency, this.state.toCurrency);
    this.setState({outputAmount: event.target.inputAmount});
    event.preventDefault();
  }

  render() {
    return (
      <div id="inputForm">
        <h3>Currency Conversion Tool</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            Input amount:
            <input type="text" value={this.state.inputAmount} name="inputAmount" onChange={this.onInputAmountChange} />
          </div>
          <div>
            From:
            <Select options={this.state.options} name="fromCurrency" value={this.state.fromCurrency} onChange={this.onFromCurrencyChange} />
          </div>
          <div>
            To:
            <Select options={this.state.options} name="toCurrency" value={this.state.toCurrency} onChange={this.onToCurrencyChange} />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div>
            Output amount:
            <input type="text" name="outputAmount" />
        </div>
      </div>
    );
  }
}

export default ConversionForm;