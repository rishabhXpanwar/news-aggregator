// src/components/NewsList.js
import React, { useEffect, useState, useRef, useCallback } from 'react';
import './NewsList.css';
import { toast } from 'react-toastify';

const API_KEY = 'bf74998ee1cd5acf5ca6bd1340b02d27';

const NewsList = ({ searchQuery, category }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarked');
    return saved ? JSON.parse(saved) : [];
  });

  const observer = useRef();

  const lastArticleRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const query = searchQuery || category || 'latest';
      const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=10&apikey=${API_KEY}&page=${page}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.articles) {
        toast.error("No articles found or API limit exceeded.");
        return;
      }

      setArticles(prev => [...prev, ...data.articles]);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Failed to fetch news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setArticles([]);
    setPage(1);
  }, [searchQuery, category]);

  useEffect(() => {
    fetchNews();
  }, [page, searchQuery, category]);

  const toggleBookmark = (article) => {
    const exists = bookmarks.find(b => b.url === article.url);
    const updated = exists
      ? bookmarks.filter(b => b.url !== article.url)
      : [...bookmarks, article];
    setBookmarks(updated);
    localStorage.setItem('bookmarked', JSON.stringify(updated));
    toast.success(exists ? 'Removed from bookmarks!' : 'Bookmarked!');
  };

  const handleShare = async (article) => {
    const shareData = {
      title: article.title,
      text: article.description,
      url: article.url
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(article.url);
        toast.info('Link copied to clipboard!');
      }
    } catch (err) {
      console.error("Share failed:", err);
      toast.error("Couldn't share this article.");
    }
  };

  return (
    <div className="news-list">
      {articles.map((article, idx) => {
        const isTrending = /breaking|trending|exclusive/i.test(article.title) ||
          ['BBC News', 'CNN', 'Reuters', 'The New York Times'].includes(article.source?.name);

        return (
          <div
            className="news-card"
            key={article.url}
            ref={idx === articles.length - 1 ? lastArticleRef : null}
          >
            <div className="news-header">
              <h3>{article.title}</h3>
              {isTrending && <span className="trending-badge">🔥 Trending</span>}
            </div>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>

            <div className="news-card-buttons">
              <button onClick={() => toggleBookmark(article)}>
                {bookmarks.find(b => b.url === article.url) ? '★ Bookmarked' : '☆ Bookmark'}
              </button>
              <button onClick={() => handleShare(article)} className="share-btn">🔗 Share</button>
            </div>
          </div>
        );
      })}
      {loading && <p>Loading more news...</p>}
    </div>
  );
};

export default NewsList;
