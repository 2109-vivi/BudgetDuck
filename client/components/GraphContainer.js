import React from 'react';
import BarGraphCategory from './BarGraphCategory';
import BudgetChart from './BudgetChart';

const GraphContainer = () => (
  <div className="graph-container"

  style={{
    height: '80vh',
    minHeight: '80vh',
 }}>
    {/* <BudgetChart /> */}
    <BarGraphCategory />
  </div>
);

export default GraphContainer;
