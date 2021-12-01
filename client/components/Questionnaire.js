import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getLinkToken, getAccessToken } from '../store/plaid.js';
import { getTransactionsFromPlaid } from '../store/transactions';
import ConnectPlaid from './ConnectPlaid.js';

class Questionnaire extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStep: 1,
      income: 0,
      budget: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }
  componentDidMount() {}

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { income, budget } = this.state;
    console.log('sending axios request with req.body => ', {
      income,
      monthlyBudget: budget,
    });
    // ========> make request to axios to update
    // current User's income and budget information + potential Plaid access token

    // await axios.put('/set-user-information', { income, monthlyBudget: budget });
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
        <button type='button' onClick={this.prev}>
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
        <button type='button' onClick={this.next}>
          Next
        </button>
      );
    }
    return null;
  }

  submitButton() {
    if (this.state.currentStep == 3) {
      return (
        <button onClick={this.handleSubmit}>Go to our site woohooooo</button>
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <div className='questionnaire-wrapper'>
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

          {this.previousButton()}
          {this.nextButton()}
          {this.submitButton()}
        </div>
      </React.Fragment>
    );
  }
}

const Step1 = (props) => {
  if (props.currentStep != 1) {
    return null;
  }

  return (
    <div>
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
    <div>
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
    dispatch(getTransactionsFromPlaid(accessToken));
  }, []);

  return (
    <div>
      plaid link component goes here wooohoo looking forward to hooking it up
      /saracsm
      <ConnectPlaid
        linkToken={linkToken}
        accessToken={accessToken}
        getAccessToken={getAccessToken}
      />
    </div>
  );
};

export default Questionnaire;
