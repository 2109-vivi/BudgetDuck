import React, { useState } from 'react';
import BarGraphCategory from './BarGraphCategory';
import BudgetChart from './BudgetChart';
import PieChartComponent from './PieChartComponent';

const GraphContainer = () => {

  const [graphType, setGraphType] = useState('bar-category');

  const handleClick = (e) => {
    setGraphType(e.target.id);
    console.log(graphType);
  };

  return (
  <div>
    <div>
      <a href="#" id='bar-category' onClick={handleClick}>Category </a>
      <a href="#" id='bar-budget' onClick={handleClick}>Overall Budget </a>
      <a href="#" id='pie-category' onClick={handleClick}>Pie</a>
    </div>
  <div
    className="graph-container"
    style={{ height: '80vh', minHeight: '80vh', }}
  >
    {
      graphType === 'bar-category'
      ?
      <BarGraphCategory />
      :
      graphType === 'bar-budget'
      ?
      <BudgetChart />
      :
      <PieChartComponent />
    }
    </div>
  </div>
  )
}

export default GraphContainer;
