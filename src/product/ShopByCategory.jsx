
// CategoryCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function ShopByCategory({
  title,
  imageUrl,
  link, 
  clickableArea = 'card', // 'card' -> click anywhere; 'button' -> only CTA navigates
}) {
  const navigate = useNavigate();

  const onNavigate = () => {
    if (link) navigate(link);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNavigate();
    }
  };

  return (
    <div
      className={`flip-card ${clickableArea === 'card' ? 'clickable' : ''}`}
      tabIndex={0}
        onClick={() => navigate("/login")}
      onKeyDown={onKeyDown}
      aria-label={title}
      role="button"
    >
      <div className="flip-card-inner mt-5" >
        {/* Front */}
        <div className="flip-card-front">
          <img src={imageUrl[0]} alt={title} loading="lazy"/>
          <div className="overlay">
            <h3 className="title">{title}</h3>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back">
         <div className="flip-card-front">
          <img src={imageUrl[1]} alt={title} loading="lazy" />
          <div className="overlay">
            <h3 className="title">{title}</h3>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
 