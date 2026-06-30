import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroSlider from '../components/HeroSlider';
import CategorySlider from '../components/CategorySlider';
import API_BASE_URL from '../config/api';

const HomeScreen = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/journal`);
        // Slice top 3 articles for landing page
        setFeaturedArticles(res.data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching articles for home screen:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <main className="unique">
      {/* Hero Banner Slider */}
      <HeroSlider />

      {/* Categories Horizontal Selector */}
      <section className="section section-categories wrapper">
        <h1 className="text-center">SELECT and ENJOY</h1>
        <div className="h1-desc text-center">the excellent taste and aroma</div>
        <CategorySlider />
      </section>

      {/* Traditions Section */}
      <div id="about"></div>
      <section 
        className="section section-traditions" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1600')` }}
      >
        <div className="wrapper">
          <h1 className="h1-invert">ENGLISH TRADITION</h1>
          <div className="h4">
            Tea drinking culture emerged at the court of Queen Victoria in the mid-19th century. Over time, tea became an integral part of the lives of the British aristocracy.<br />Following the English tea tradition, RICHARD<sup>®</sup> Royal Tea offers the highest quality tea worthy of the royal court.
          </div>
        </div>
      </section>

      {/* Articles Preview Section */}
      <section className="section section-articles wrapper">
        <h1 className="text-center">Interesting things about tea</h1>
        
        {loading ? (
          <p className="text-center" style={{ padding: '40px 0', color: 'var(--color-text-muted)' }}>Loading tea articles...</p>
        ) : featuredArticles.length === 0 ? (
          <p className="text-center" style={{ padding: '40px 0', color: 'var(--color-text-muted)' }}>No articles found.</p>
        ) : (
          <div className="articles-wrapper">
            {featuredArticles.map((article) => (
              <Link key={article._id} to="/journal" className="article-card">
                <div className="article-card__img">
                  <img src={article.imgUrl} alt={article.title} />
                </div>
                <div className="article-card__title">{article.title}</div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center btn-all-articles">
          <Link to="/journal" className="btn">Read all articles</Link>
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;
