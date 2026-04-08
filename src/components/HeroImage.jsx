import React from 'react';
import './CalendarComponent.css';

const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

const MONTH_IMAGES = [
  "/jan.jpg",
  "/feb.jpg",
  "/march.jpg",
  "/aug.jpg",
  "/may.jpg",
  "/june.jpg",
  "/july.jpg",
  "/aug.jpg",
  "/sep.jpg",
  "/oct.jpg",
  "/nov.jpg",
  "/dec.jpg"
];

const HeroImage = ({ theme, currentMonth, currentYear }) => {
  const imageToUse = MONTH_IMAGES[currentMonth];

  return (
    <div className="hero-container">
      <div className="hero-image-wrapper">
        <img
          src={imageToUse}
          alt={`${MONTHS[currentMonth]} Landscape`}
          className="hero-image"
        />
        {/* Soft blackout gradient at the bottom so the white text always pops regardless of how bright the photo is */}
        <div className="hero-shadow-gradient"></div>

        <div className="hero-date-display">
          <span className="hero-year">{currentYear}</span>
          <h2 className="hero-month">{MONTHS[currentMonth]}</h2>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
