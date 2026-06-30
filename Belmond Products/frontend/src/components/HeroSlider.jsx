import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=1600",
    title: <>Give the gift of <br />royal tea <br />RICHARD<sup>®</sup></>,
    subtitle: "",
    btnText: "Buy",
    link: "/collection?type=gifts"
  },
  {
    image: "https://images.unsplash.com/photo-1594631252845-29fc4586d51c?auto=format&fit=crop&q=80&w=1600",
    title: <>Discover new <br />unique flavors<br />of RICHARD<sup>®</sup></>,
    subtitle: "In individual sachets",
    btnText: "Try it",
    link: "/collection?type=classic-black-teas"
  },
  {
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=1600",
    title: <>Give the gift of <br />royal tea <br />RICHARD<sup>®</sup></>,
    subtitle: "",
    btnText: "Buy",
    link: "/collection?type=gifts"
  },
  {
    image: "https://images.unsplash.com/photo-1562007908-17c67e870c88?auto=format&fit=crop&q=80&w=1600",
    title: <>TRY IT <br />NEW<br />RICHARD<sup>®</sup></>,
    subtitle: "",
    btnText: "Choose a tea",
    link: "/collection?type=fruit-and-herbal-teas"
  },
  {
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1600",
    title: <>TASTЕ<br />royal tea <br />RICHARD<sup>®</sup></>,
    subtitle: "Created in the traditional English style according to the canons of tea craftsmanship",
    btnText: "Explore The Collections",
    link: "/collection"
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero index" style={{ overflow: 'hidden', position: 'relative' }}>
      {slides.map((slide, index) => (
        <div 
          key={index}
          className="hero__img"
          style={{
            backgroundImage: `url('${slide.image}')`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === current ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: index === current ? 2 : 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div className="wrapper">
            <div className="hero__text" style={{ display: index === current ? 'block' : 'none' }}>
              <h1 className="h1">{slide.title}</h1>
              {slide.subtitle && <div className="h4">{slide.subtitle}</div>}
              <Link to={slide.link} className="btn" style={{ marginTop: '20px' }}>
                {slide.btnText}
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Pagination bullets */}
      <div 
        className="swiper-pagination" 
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: '8px'
        }}
      >
        {slides.map((_, index) => (
          <span 
            key={index}
            className={`swiper-pagination-bullet ${index === current ? 'swiper-pagination-bullet-active' : ''}`}
            onClick={() => setCurrent(index)}
            style={{ cursor: 'pointer' }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
