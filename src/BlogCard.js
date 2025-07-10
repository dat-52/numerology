import React from 'react';
import './BlogCard.css';

function BlogCard({ title, description, image, tags }) {
  return (
    <div className="blog-card">
      <div className="blog-card-img-wrapper">
        <img src={image} alt={title} className="blog-card-img" />
      </div>
      <div className="blog-card-content">
        <h3 className="blog-card-title">{title}</h3>
        <p className="blog-card-desc">{description}</p>
        {tags && tags.length > 0 && (
          <div className="blog-card-tags">
            {tags.map((tag, i) => (
              <span className="blog-card-tag" key={i}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogCard; 