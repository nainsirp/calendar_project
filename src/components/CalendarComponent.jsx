import React, { useState } from 'react';
import HeroImage from './HeroImage';
import MonthGrid from './MonthGrid';
import NotesPanel from './NotesPanel';
import './CalendarComponent.css';

const CalendarComponent = ({ theme }) => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const [flipDirection, setFlipDirection] = useState('none');

  const handlePrevMonth = () => {
    setFlipDirection('prev');
    setTimeout(() => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
      setTimeout(() => setFlipDirection('none'), 300);
    }, 150);
  };

  const handleNextMonth = () => {
    setFlipDirection('next');
    setTimeout(() => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
      setTimeout(() => setFlipDirection('none'), 300);
    }, 150);
  };

  return (
    <div className="wall-calendar">
      <div className="calendar-content">
        <HeroImage theme={theme} currentMonth={currentMonth} currentYear={currentYear} />
        
        <div className="calendar-body">
          <div className="calendar-body-left">
            <NotesPanel 
              currentMonth={currentMonth}
              currentYear={currentYear}
            />
          </div>
          <div className="calendar-body-right">
            <MonthGrid 
              currentMonth={currentMonth}
              currentYear={currentYear}
              startDate={startDate}
              setStartDate={setStartDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              flipDirection={flipDirection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
