import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const JournalScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/journal`);
        setArticles(res.data);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <main className="wrapper journal-container">
      <h1 className="text-center">Interesting things about tea</h1>
      <div className="h1-desc text-center">discover the world of tea</div>

      {loading ? (
        <p className="text-center" style={{ padding: '60px', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
          Loading tea journal...
        </p>
      ) : articles.length === 0 ? (
        <p className="text-center" style={{ padding: '60px', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
          No journal articles found.
        </p>
      ) : (
        <div className="journal-grid">
          {articles.map((article) => (
            <article key={article._id} className="journal-card">
              <div className="journal-card__img">
                <img src={article.imgUrl} alt={article.title} />
              </div>
              <div className="journal-card__content">
                <div>
                  <div className="journal-card__meta">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="journal-card__title">{article.title}</h3>
                  <p className="journal-card__desc">{article.desc}</p>
                </div>
                <a href="#" className="journal-card__link" onClick={(e) => e.preventDefault()}>
                  Read Article &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default JournalScreen;
