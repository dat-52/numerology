import React from 'react';
import BlogCard from './BlogCard';
import './BlogPage.css';

const blogPosts = [
  {
    title: 'The Naughty Things Your Lover Needs to Know About You',
    description: 'Discover what your Heart’s Desire Number reveals about your love life and relationships.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    tags: ['Love', 'Heart’s Desire']
  },
  {
    title: 'How Numerology Will Help You Find The Right Name For Your Baby!',
    description: 'Learn how to use numerology to choose the perfect name and destiny for your child.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    tags: ['Baby Names', 'Destiny']
  },
  {
    title: 'The Numerology of First Dates',
    description: 'Find out which days are most likely to unlock your love’s potential using numerology.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    tags: ['Dating', 'Timing']
  },
  {
    title: 'If You’ve Seen Any of These Number Patterns Then Life’s About To Get Better!',
    description: 'Why do certain number patterns show up at specific moments? Discover the meaning behind them.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    tags: ['Angel Numbers', 'Patterns']
  },
  {
    title: 'What Will Your Birth Date Reveal About Your Mission in Life?',
    description: 'Your birth date is a key to your life path. Learn what it reveals about your mission and purpose.',
    image: 'https://images.unsplash.com/photo-1503457574465-494bba506e52?auto=format&fit=crop&w=600&q=80',
    tags: ['Life Path', 'Purpose']
  },
  {
    title: 'Could Your Birthday Numerology Offer You A Glimpse Into Your Past Lives?',
    description: 'Explore how your birthday numerology can provide insight into your past lives and future.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    tags: ['Past Lives', 'Birthday']
  },
];

function BlogPage() {
  return (
    <div className="blog-page-container">
      <header className="blog-header">
        <h1>Personal Numerology</h1>
        <p className="blog-header-desc">
          Explore the latest insights, tips, and stories about numerology, life path, love, and more. Discover how numbers can transform your life!
        </p>
      </header>
      <main className="blog-list-grid">
        {blogPosts.map((post, i) => (
          <BlogCard key={i} {...post} />
        ))}
      </main>
    </div>
  );
}

export default BlogPage; 