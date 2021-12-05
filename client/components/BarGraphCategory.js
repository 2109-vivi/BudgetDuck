import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const CustomToolTip = ({payload, label, active}) => {
  const getIntroOfPage = (label) => {
    switch(label) {
      case 'Transfer':
        return 'Transfer is a type of transaction that transfers money from one account to another.';
      case 'Food and Drink':
        return 'Food and Drink is a type of transaction that is related to food and drink.';
      case 'Recreation':
        return 'Recreation is a type of transaction that is related to recreation.';
      case 'Service':
        return 'Service is a type of transaction that is related to services.';
      case 'Community':
        return 'Community is a type of transaction that is related to community.';
      case 'Shops':
        return 'Shops is a type of transaction that is related to shops.';
      case 'Cash Advance':
        return 'Cash Advance is a type of transaction that is related to cash advance.';
      case 'Travel':
        return 'Travel is a type of transaction that is related to travel.';
      case 'Healthcare':
        return 'Healthcare is a type of transaction that is related to healthcare.';
      case 'Interest':
        return 'Interest is a type of transaction that is related to interest.';
      case 'Payment':
        return 'Payment is a type of transaction that is related to payment.';
      case 'Tax':
        return 'Tax is a type of transaction that is related to tax.';
      default:
        return 'Other is a type of transaction that is not related to any of the other categories.';
    }
    return `${label} is a type of transaction that is related ${label}s.`;
  }

  if(active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{border: '1px solid #f5f5f5', lineHeight: '24px', backgroundColor: '#FFFFFF', padding: '10px', opacity: '0.8'}}>
        <p className="amount-label">{`${label} : $${(Math.round(payload[1].value * 100) /100).toFixed(2)}`}</p>
        <p className="budget-label">{`Budget : $${(Math.round(payload[0].value * 100) /100).toFixed(2)}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc" style={{color: '#999'}}>Anything you want can be displayed here.</p>
      </div>
    )
  }

  return null;
}

const BarGraphCategory = (props) => {

  let transactions = useSelector((state) => state.transactions || []);
  console.log(transactions);

  const barColors = ["#D99694", "#F87D79", '#FAC090', "#FFFD70", "#C3D69B", "#78ED8C", "#00FFFF", "#93CDDD", "#558ED5", "#9675F9", "#FA75F8", "#E5B2FF", "#CEAE8E"];

  const dataArray = transactions.map((transaction) => {
    return {
      category: transaction.category.categoryName,
      amount: transaction.amount,
    };
  });

  let output = [];

  dataArray.forEach((item) => {
    let existing = output.filter((value) => {
      return value.category === item.category;
    });
    if (existing.length) {
      let existingIndex = output.indexOf(existing[0]);
        output[existingIndex].amount = +output[existingIndex].amount + +item.amount
    } else {
      output.push(item);
    }
  });

  output.forEach((category, index) => {
    //random number from 2000 to 5000
    category.budget = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
    category.color = barColors[index];
  })

  return (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={output}
          margin={{top: 20,right: 30, left: 20, bottom: 5, }}
        >
          <XAxis dataKey="category" xAxisId={0}/>
          <XAxis dataKey="category" xAxisId={1} hide/>
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomToolTip />} />
          <Legend
            content={<CategoryLegend data={output}/>}
            // width='100vh'
            wrapperStyle={{
              lineHeight: '40px',
              position: 'relative',
              // textAlign: 'center',
              // top: 40,
              // right: 40,
              // backgroundColor: '#808080',
              // border: '1px solid #d5d5d5',

            }}
          />
          {/* <Bar dataKey="amount" barSize={20} XAxisId={1} fill="#8884d8"> */}
            {/* {
              output.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 20]}/>
            ))
            } */}
          {/* </Bar> */}
          <Bar dataKey="budget" barSize={80} xAxisId={1} fill="#3D3D3D"/>
          <Bar dataKey="amount" barSize={55} XAxisId={0} fill="#8B8E8D"  fillOpacity={0.9} >
            {output.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 20]}/>
              ))}
          </Bar>
      </BarChart>
      </ResponsiveContainer>
  );
}

export default BarGraphCategory;
