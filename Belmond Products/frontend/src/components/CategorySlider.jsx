import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: "Classic black teas",
    link: "/collection?type=classic-black-teas",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Flavoured black teas",
    link: "/collection?type=fruit-and-herbal-teas",
    image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Green teas and tisanes",
    link: "/collection?type=green-teas-and-tisanes",
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Wellness Collection",
    link: "/collection?type=wellness-collection",
    image: "https://images.unsplash.com/photo-1514733670139-4d87a19bc194?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Tea gifts",
    link: "/collection?type=gifts",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400"
  }
];

const CategorySlider = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    // Limit slide offset based on length
    if (startIndex < categories.length - 1) {
      setStartIndex(prev => prev + 1);
    } else {
      setStartIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    } else {
      setStartIndex(categories.length - 1); // loop
    }
  };

  return (
    <div className="category-slider-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <div 
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${startIndex * (100 / categories.length)}%)`,
          width: `${categories.length * 100}%`,
        }}
      >
        {categories.map((cat, idx) => (
          <div 
            key={idx} 
            style={{ 
              width: `${100 / categories.length}%`, 
              padding: '0 15px', 
              boxSizing: 'border-box' 
            }}
          >
            <Link to={cat.link} className="category-card">
              <div className="category-card__img">
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className="category-card__title">{cat.name}</div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* Slider Buttons */}
      <div 
        className="swiper-button-prev prev-btn-category" 
        onClick={handlePrev}
        style={{ cursor: 'pointer', zIndex: 10 }}
      ></div>
      <div 
        className="swiper-button-next next-btn-category" 
        onClick={handleNext}
        style={{ cursor: 'pointer', zIndex: 10 }}
      ></div>
    </div>
  );
};

export default CategorySlider;
