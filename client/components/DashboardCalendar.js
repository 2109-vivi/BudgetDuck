import React from 'react';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DashboardCalendar.css';
const daysInEachMonth = {
  '01': 31,
  '02': 28,
  '03': 31,
  '04': 30,
  '05': 31,
  '06': 30,
  '07': 31,
  '08': 31,
  '09': 30,
  10: 31,
  11: 30,
  12: 31,
};
const DashboardCalendar = (props) => {
  const monthlyBudget = useSelector((state) => state.auth.monthlyBudget);
  const transactions = useSelector((state) => state.transactions);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const dailyBudget = (monthlyBudget / daysInEachMonth[currentMonth]).toFixed(2);
  const transObj = {};

  const monthsTransactions = transactions
    .filter((transaction) => {
      return currentMonth == transaction.date.slice(5, 7) && transaction.amount >= 0;
    })
    .map((transaction) => {
      if (transObj[+transaction.date.slice(8, 10)]) {
        transObj[+transaction.date.slice(8, 10)].push(transaction);
      } else {
        transObj[+transaction.date.slice(8, 10)] = [transaction];
      }
    });
  console.log(transObj);
  const budgetCheck = (date) => {
    if (date.getMonth() + 1 != currentMonth) {
      return 'grey';
    }
    if (transObj[+date.toString().slice(8, 10)]) {
      let budgetCheck = transObj[+date.toString().slice(8, 10)].reduce((accum, trans) => {
        return accum + trans.amount;
      }, 0);
      if (budgetCheck < dailyBudget) {
        return 'green';
      } else {
        return 'red';
      }
    }
  };

  return (
    <div className='dashboard-calendar-container'>
      <Calendar
        calendarType='US'
        tileClassName={({ activeStartDate, date, view }) => {
          return budgetCheck(date);
        }}
        // style={}
      />
    </div>
  );
};

export default DashboardCalendar;
