import React from 'react';
import './CalendarComponent.css';

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const MonthGrid = ({
  currentMonth,
  currentYear,
  startDate,
  setStartDate,
  onPrevMonth,
  onNextMonth,
  flipDirection
}) => {

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    clickedDate.setHours(0,0,0,0);
    
    // Toggle single selection off if clicked again, otherwise select it
    if (startDate && startDate.getTime() === clickedDate.getTime()) {
      setStartDate(null);
    } else {
      setStartDate(clickedDate);
    }
  };

  const isSelected = (day) => {
    if (!day || !startDate) return false;
    return new Date(currentYear, currentMonth, day).getTime() === startDate.getTime();
  };

  const renderDays = () => {
    const totalDays = getDaysInMonth(currentYear, currentMonth);
    const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);
    const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);

    let days = [];

    // Prev month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="date-cell prev-month">
          {prevMonthDays - i}
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
        let className = "date-cell current-month";
        if (isSelected(i)) className += " selected";

        days.push(
            <div 
              key={`current-${i}`} 
              className={className}
              onClick={() => handleDateClick(i)}
            >
              <span className="date-num">{i}</span>
            </div>
        );
    }

    // Next month padding to fill grid
    const totalCells = Math.ceil((totalDays + firstDayIndex) / 7) * 7;
    const currentCells = days.length;
    for (let i = 1; i <= totalCells - currentCells; i++) {
       days.push(
        <div key={`next-${i}`} className="date-cell next-month">
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`month-grid-container flip-${flipDirection}`}>
      <div className="calendar-controls">
        <button className="nav-btn" onClick={onPrevMonth} aria-label="Previous Month">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="nav-btn" onClick={onNextMonth} aria-label="Next Month">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="days-of-week">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="dow-cell">{day}</div>
        ))}
      </div>

      <div className="dates-grid">
        {renderDays()}
      </div>
    </div>
  );
};

export default MonthGrid;
