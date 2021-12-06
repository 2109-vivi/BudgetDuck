import React from 'react'
import './BarGraphCategoryLegend.css'

const CategoryLegend = ({data}) => {
  return (
    <div className='category-bargraph-legend-container'>
      {data.map((item, index) => {
        return (
        <div key={index}>
        <span
          fill={item.color}
          className="category-bargraph-legend-icon"
          style ={{ background: item.color }}
        />
          <span className='bargraph-legend-items'>{item.category}</span>
        </div>
        )
       })}
      <div>
        <span
          fill={'#3D3D3D'}
          className="category-bargraph-legend-icon"
          style ={{ background: '#3D3D3D' }}
        />
          <span className="category-bargraph-budget-icon">Budget</span>
        </div>
    </div>
  )
}

export default CategoryLegend;
