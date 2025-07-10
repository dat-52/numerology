import React, { useState } from 'react';
function NumerologyForm({ onCalculate }) {
  const [form, setForm] = useState({
    fullName: '',
    commonName: '',
    gender: '',
    day: '',
    month: '',
    year: ''
  });

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <form className="numerology-form card" onSubmit={e => { e.preventDefault(); onCalculate(); }}>
      <h2>Numerology Report</h2>
      <label>Full name
        <input type="text" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} placeholder="Enter your full name" />
      </label>
      <label>Commonly used name
        <input type="text" value={form.commonName} onChange={e => setForm({ ...form, commonName: e.target.value })} placeholder="What do people usually call you?" />
      </label>
      <label>Gender
        <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>Date of birth
        <div className="dob-fields">
          <select value={form.day} onChange={e => setForm({ ...form, day: e.target.value })}>
            <option value="">Day</option>
            {days.map(day => <option key={day} value={day}>{day}</option>)}
          </select>
          <select value={form.month} onChange={e => setForm({ ...form, month: e.target.value })}>
            <option value="">Month</option>
            {months.map((m, i) => <option key={m} value={i+1}>{m}</option>)}
          </select>
          <select value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}>
            <option value="">Year</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </label>
      <button type="submit" className="calculate-btn">Calculate</button>
    </form>
  );
}

export default NumerologyForm; 