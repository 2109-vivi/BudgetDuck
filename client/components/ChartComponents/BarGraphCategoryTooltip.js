import React from 'react';
import getIntroOfPage from './assets/tooltipIntro';
import { stringToNum } from './assets/mergerHelperFuncs';

const CustomToolTip = ({payload, label, active}) => {
  getIntroOfPage(label);
  if(active && payload && payload.length) {
    const category = stringToNum(payload[1]?.value)
    const budget = stringToNum(payload[0]?.value)
    return (
      <div className="custom-tooltip" style={{border: '1px solid #f5f5f5', lineHeight: '24px', backgroundColor: '#FFFFFF', padding: '10px', opacity: '0.8'}}>
        <p className="amount-label">{`${label} : $${category}`}</p>
        <p className="budget-label">{`Budget : $${budget}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc" style={{color: '#999'}}>
          {
          budget < category ? `You have $${budget - category} left in this category` : `You have spent $${category - budget} more than your allocated budget!`
          }
        </p>
      </div>
    )
  }
  return null;
}

export default CustomToolTip;
