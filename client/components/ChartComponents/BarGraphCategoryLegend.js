import React from 'react'

const CategoryLegend = ({data}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-around', alignItems: 'center'}}>
      {data.map((item, index) => {
        return (
        <div key={index}>
        <span fill={item.color} className="recharts-legend-icon" style ={{
          display: 'inline-block',
          width: '15px',
          height: '10px',
          background: item.color,
          border: '1px solid #000',
        }}
        />
          <span style={{marginLeft: '5px', color:'black' }}>{item.category}</span>
        </div>
        )
       })}
      <div>
        <span fill={'#3D3D3D'} className="recharts-legend-icon" style ={{
          display: 'inline-block',
          width: '15px',
          height: '10px',
          background: '#3D3D3D',
          border: '1px solid #000',
        }}
        />
          <span style={{marginLeft: '5px', color:'#3D3D3D' }}>Budget</span>
        </div>
    </div>
  )
}

export default CategoryLegend;
