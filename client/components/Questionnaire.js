import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getLinkToken, getAccessToken } from '../store/plaid.js';
import { getTransactionsFromPlaid } from '../store/transactions';
import ConnectPlaid from './ConnectPlaid.js';
import { updateBudgetThunk, updateIncomeThunk } from '../store/auth.js';
import history from '../history';
import './Questionnaire.css';

class Questionnaire extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStep: 1,
      income: '',
      budget: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { income, budget } = this.state;

    this.props.updateBudget(budget);
    this.props.updateIncome(income);
    history.push('/dashboard');
  }

  next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className='questionnaire-button'
          type='button'
          onClick={this.prev}
        >
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <button
          className='questionnaire-button'
          type='button'
          onClick={this.next}
        >
          Next
        </button>
      );
    }
    return null;
  }

  submitButton() {
    if (this.state.currentStep == 3) {
      return (
        <button className='questionnaire-button' onClick={this.handleSubmit}>
          Go to our site woohoo
        </button>
      );
    }
    return null;
  }

  render() {
    return (
      <div className='questionnaire-component-container'>
        <div className='questionnaire-wrapper'>
          <h2 className='questionnaire-header'>
            What are your budgeting goals?
          </h2>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            income={this.state.income}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            budget={this.state.budget}
          />
          {this.state.currentStep == 3 ? <Step3 /> : null}
          <div className='questionnaire-buttons-container'>
            {this.previousButton()}
            {this.nextButton()}
            {this.submitButton()}
          </div>
        </div>
      </div>
    );
  }
}

const Step1 = (props) => {
  if (props.currentStep != 1) {
    return null;
  }

  return (
    <div className='questionnaire-step'>
      <label htmlFor='income'>What is your yearly income?</label>
      <input
        className='questionnaire-input'
        name='income'
        type='text'
        placeholder='Enter your yearly income!'
        value={props.income}
        onChange={props.handleChange}
      />
    </div>
  );
};

const Step2 = (props) => {
  if (props.currentStep != 2) {
    return null;
  }

  return (
    <div className='questionnaire-step'>
      <label htmlFor='budget'>What would you like your budget to be?</label>
      <input
        className='questionnaire-input'
        name='budget'
        type='text'
        placeholder='Enter your monthly budget!'
        value={props.budget}
        onChange={props.handleChange}
      />
    </div>
  );
};

const Step3 = () => {
  const dispatch = useDispatch();
  const linkToken = useSelector((state) => state.plaid.linkToken);
  const accessToken = useSelector((state) => state.plaid.accessToken);

  useEffect(() => {
    dispatch(getLinkToken());
  }, []);

  return (
    <div className='plaid-link-wrapper questionnaire-step'>
      <ConnectPlaid
        linkToken={linkToken}
        accessToken={accessToken}
        getAccessToken={getAccessToken}
        getTransactionsFromPlaid={getTransactionsFromPlaid}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBudget: (budget) => dispatch(updateBudgetThunk(budget)),
    updateIncome: (income) => dispatch(updateIncomeThunk(income)),
  };
};
export default connect(null, mapDispatchToProps)(Questionnaire);
