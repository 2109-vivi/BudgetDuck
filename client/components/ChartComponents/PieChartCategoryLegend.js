import React from 'react'
import './BarGraphCategoryLegend.css'
import barColors from './assets/categoryColors'



const PieChartCategoryLegend = ({data}) => {

  const colorsArray = barColors.slice(0,data.length-1)
    colorsArray.push('#808080')

  return (
    <div className='category-bargraph-legend-container'>
      {data.map((item, index) => {
        return (
        <div key={index}>
        <span
          fill={colorsArray[index % colorsArray.length]}
          className="category-bargraph-legend-icon"
          style ={{ background: colorsArray[index % colorsArray.length]}}
        />
          <span className='bargraph-legend-items'>{item.name}</span>
        </div>
        )
       })}
    </div>
  )
}

export default PieChartCategoryLegend;
