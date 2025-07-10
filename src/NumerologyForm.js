import React, { useState, useRef } from 'react';
import { fetchNumerologyReport } from './ai';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function NumerologyForm({ onCalculate }) {
  const [form, setForm] = useState({
    fullName: '',
    commonName: '',
    gender: '',
    day: '',
    month: '',
    year: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const resultRef = useRef();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const aiResult = await fetchNumerologyReport(form, 'adult');
      setResult(aiResult);
    } catch (err) {
      setResult('Sorry, something went wrong.');
    }
    setLoading(false);
    if (onCalculate) onCalculate();
  };

  const handleDownloadPDF = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('numerology-report.pdf');
  };

  return (
    <>
      <form className="numerology-form card" onSubmit={handleSubmit}>
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
        <button type="submit" className="calculate-btn">{loading ? 'Calculating...' : 'Calculate'}</button>
      </form>
      <div className="result-area" ref={resultRef}>
        {loading && <span>Loading AI result...</span>}
        {!loading && result && <div style={{whiteSpace: 'pre-line'}}>{result}</div>}
      </div>
      {!loading && result && (
        <button className="download-pdf-btn" onClick={handleDownloadPDF} style={{marginTop: 16}}>Download PDF</button>
      )}
    </>
  );
}

export default NumerologyForm; 