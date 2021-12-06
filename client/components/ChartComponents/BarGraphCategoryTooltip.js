import React from 'react';
import getIntroOfPage from './assets/tooltipIntro';
import { stringToNum } from './assets/mergerHelperFuncs';

const CustomToolTip = ({payload, label, active}) => {
  getIntroOfPage(label);
  if(active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{border: '1px solid #f5f5f5', lineHeight: '24px', backgroundColor: '#FFFFFF', padding: '10px', opacity: '0.8'}}>
        <p className="amount-label">{`${label} : $${stringToNum(payload[1]?.value)}`}</p>
        <p className="budget-label">{`Budget : $${stringToNum(payload[0]?.value)}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc" style={{color: '#999'}}>Anything you want can be displayed here.</p>
      </div>
    )
  }
  return null;
}

export default CustomToolTip;
