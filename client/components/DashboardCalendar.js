import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DashboardCalendar.css';

const DashboardCalendar = () => {
  const budgetCheck = (date) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    if (date.getMonth() != currentMonth) {
      return 'grey';
    }
    return Math.floor(Math.random() * 2) == 0 ? 'red' : 'green';
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
