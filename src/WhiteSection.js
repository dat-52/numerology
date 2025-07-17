import React from 'react';
import './WhiteSection.css';

const images = [
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
];

function WhiteSection() {
  return (
    <section className="white-section">
      <div className="white-section-content">
        <h2>You are here because you have a deep desire to know who you truly are, how others perceive you, and what opportunities you can seize to become WEALTHIER and HAPPIER...</h2>
        <p>
          Or perhaps it is to understand the strange "coincidences" that have been appearing in your life recently, like the repetition of numbers such as 11:11 or 333 showing up in the most unusual places. Whatever the reason may be, you have come to the right place by visiting this website.
        </p>
        <p>
          As you are about to see, numbers influence your life in beautiful and mysterious ways, revealing more than you ever thought possible about your personality, potential, and true life purpose.
        </p>
        <p>
          Numerology is a 4000-year-old science based on the mathematics of the universe. By examining the meaning of your name and birthdate, we can uncover many surprising truths hidden within your 3 charts and over 20 unique indicators, including your strengths, weaknesses, and the relationships between your actions and your path to true happiness.
        </p>
        <h3>Numerology Is Only the Beginning…</h3>
        <p>You've already taken the first step by exploring the power of your numbers — now imagine what’s possible when you truly align with them.
As patterns reveal themselves and deeper meanings begin to surface, remember this: the more you understand your personal blueprint, the more confident, fulfilled, and in control you become.
Whether you're seeking answers, healing, or a life that feels more aligned — numerology is your compass. Let it guide you further.
🌟 Explore your full report and take the next step on your journey.</p>
      </div>
      <div className="white-section-images">
        {images.map((src, i) => (
          <div className="octagon-img-wrapper" key={i}>
            <img src={src} alt="illustration" className="octagon-img" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhiteSection; 