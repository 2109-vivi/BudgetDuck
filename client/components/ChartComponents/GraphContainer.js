import React, { useState } from 'react';
import BarGraphCategory from './BarGraphCategory';
import BudgetChart from './BudgetChart';
import PieChartComponent from './PieChartComponent';
import './GraphContainer.css';
import BudgetHistoryLineGraph from './BudgetHistoryLineGraph';

const GraphContainer = () => {

  const [graphType, setGraphType] = useState('bar-category');

  const handleClick = (e) => {
    setGraphType(e.target.id);
    console.log(graphType);
  };

  return (
  <div>
    <div className="graph-navigation-container">
      <a href="#" id='bar-category' onClick={handleClick}>Categorical Budget</a>
      <a href="#" id='bar-budget' onClick={handleClick}>Single Budget</a>
      <a href="#" id='pie-category' onClick={handleClick}>Categorical Spending</a>
      <a href="#" id='line-graph' onClick={handleClick}>Budget History</a>
    </div>
  <div className="graph-container">
    {
      graphType === 'bar-category'
      ?
      <BarGraphCategory />
      :
      graphType === 'bar-budget'
      ?
      <BudgetChart />
      :
      graphType === 'line-graph'
      ?
      <BudgetHistoryLineGraph />
      :
      <PieChartComponent />
    }
    </div>
  </div>
  )
}

export default GraphContainer;
