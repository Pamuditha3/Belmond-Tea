import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const NewsScreen = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/news`);
        setNewsList(res.data);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <main className="wrapper news-container">
      <h1 className="text-center">Offers & news</h1>
      <div className="h1-desc text-center">royal releases & seasonal blends</div>

      {loading ? (
        <p className="text-center" style={{ padding: '60px', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
          Loading news updates...
        </p>
      ) : newsList.length === 0 ? (
        <p className="text-center" style={{ padding: '60px', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
          No offers or news found.
        </p>
      ) : (
        <div className="news-list">
          {newsList.map((news) => (
            <section key={news._id} className="news-card">
              <div className="news-card__img">
                <img src={news.imgUrl} alt={news.title} />
              </div>
              <div className="news-card__content">
                <div className="news-card__date">{news.date}</div>
                <h2 className="news-card__title">{news.title}</h2>
                <p className="news-card__desc">{news.desc}</p>
                <Link to={news.link} className="btn">
                  Explore Releases
                </Link>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
};

export default NewsScreen;
