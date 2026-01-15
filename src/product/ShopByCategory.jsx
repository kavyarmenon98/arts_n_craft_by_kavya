
// CategoryCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShopByCategory({
  title,
  imageUrl,
  link,
  clickableArea = 'card',
}) {
  const navigate = useNavigate();

  const onNavigate = () => {
    if (link) navigate("/category/" + link);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNavigate();
    }
  };

  // Ensure we have at least 2 images for the flip effect, or fallback to using the same one
  const frontImage = imageUrl?.[0] || '';
  const backImage = imageUrl?.[1] || frontImage;

  return (
    <div
      className={`flip-card ${clickableArea === 'card' ? 'clickable' : ''}`}
      tabIndex={0}
      onClick={onNavigate}
      onKeyDown={onKeyDown}
      aria-label={title}
      role="button"
      style={{ width: '100%' }} // Let grid control width
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front">
          <img src={frontImage} alt={title} loading="lazy" />
          <div className="overlay">
            <h3 className="title">{title}</h3>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back">
          <img src={backImage} alt={`${title} alternate`} loading="lazy" />
          <div className="overlay">
            <h3 className="title">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
