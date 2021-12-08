import React from 'react'
import './BarGraphCategoryLegend.css'

const StackedBarCategoryLegend = (data) => {

  return (
    <div className='category-bargraph-legend-container'>
      {data.payload.map((item, index) => {
        return (
        <div key={index}>
        <span
          fill={item.color}
          className="category-bargraph-legend-icon"
          style ={{ background: item.color}}
        />
          <span className='bargraph-legend-items'>{item.dataKey}</span>
        </div>
        )
       })}
    </div>
  )
}

export default StackedBarCategoryLegend;
