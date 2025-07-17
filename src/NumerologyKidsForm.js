import React, { useState, useRef } from 'react';
import kidbg from './assets/kidbg.png';
import NumerologyKidsBackground from './NumerologyKidsBackground';
import { fetchNumerologyReport } from './ai';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './NumerologyKidsForm.css';

function NumerologyKidsForm({ user, onRequireAuth }) {
  const [form, setForm] = useState({
    childName: '',
    childGender: '',
    childDay: '',
    childMonth: '',
    childYear: '',
    fatherName: '',
    fatherDay: '',
    fatherMonth: '',
    fatherYear: '',
    motherName: '',
    motherDay: '',
    motherMonth: '',
    motherYear: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const resultRef = useRef();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) {
      if (onRequireAuth) onRequireAuth();
      return;
    }
    setLoading(true);
    setResult('');
    try {
      const aiResult = await fetchNumerologyReport(form, 'kids');
      setResult(aiResult);
    } catch (err) {
      setResult('Sorry, something went wrong.');
    }
    setLoading(false);
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
    pdf.save('numerology-kids-report.pdf');
  };

  return (
    <NumerologyKidsBackground>
      <div className="kids-bg-image">
        <img src={kidbg} alt="Kids background" />
      </div>
      <div className="kids-form-wrapper card">
        <h2>Numerology for Kids</h2>
        <p className="kids-form-desc">
          Discover your child's potential, early life timeline, parenting solutions, compatibility or conflict between parents and child, and suitable career directions. <br/>
          <b>Note:</b> Only suitable for children aged 1 to 17.
        </p>
        <form className="numerology-kids-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Child's Information</legend>
            <label>Full Name
              <input type="text" value={form.childName} onChange={e => handleChange('childName', e.target.value)} placeholder="Enter child's full name" required />
            </label>
            <label>Gender
              <select value={form.childGender} onChange={e => handleChange('childGender', e.target.value)} required>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>Date of Birth
              <div className="dob-fields">
                <select value={form.childDay} onChange={e => handleChange('childDay', e.target.value)} required>
                  <option value="">Day</option>
                  {days.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <select value={form.childMonth} onChange={e => handleChange('childMonth', e.target.value)} required>
                  <option value="">Month</option>
                  {months.map((m, i) => <option key={m} value={i+1}>{m}</option>)}
                </select>
                <select value={form.childYear} onChange={e => handleChange('childYear', e.target.value)} required>
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </label>
          </fieldset>
          <fieldset>
            <legend>Father's Information</legend>
            <label>Full Name
              <input type="text" value={form.fatherName} onChange={e => handleChange('fatherName', e.target.value)} placeholder="Enter father's full name" required />
            </label>
            <label>Date of Birth
              <div className="dob-fields">
                <select value={form.fatherDay} onChange={e => handleChange('fatherDay', e.target.value)} required>
                  <option value="">Day</option>
                  {days.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <select value={form.fatherMonth} onChange={e => handleChange('fatherMonth', e.target.value)} required>
                  <option value="">Month</option>
                  {months.map((m, i) => <option key={m} value={i+1}>{m}</option>)}
                </select>
                <select value={form.fatherYear} onChange={e => handleChange('fatherYear', e.target.value)} required>
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </label>
          </fieldset>
          <fieldset>
            <legend>Mother's Information</legend>
            <label>Full Name
              <input type="text" value={form.motherName} onChange={e => handleChange('motherName', e.target.value)} placeholder="Enter mother's full name" required />
            </label>
            <label>Date of Birth
              <div className="dob-fields">
                <select value={form.motherDay} onChange={e => handleChange('motherDay', e.target.value)} required>
                  <option value="">Day</option>
                  {days.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <select value={form.motherMonth} onChange={e => handleChange('motherMonth', e.target.value)} required>
                  <option value="">Month</option>
                  {months.map((m, i) => <option key={m} value={i+1}>{m}</option>)}
                </select>
                <select value={form.motherYear} onChange={e => handleChange('motherYear', e.target.value)} required>
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </label>
          </fieldset>
          <button type="submit" className="calculate-btn kids-calc-btn">{loading ? 'Calculating...' : 'Calculate'}</button>
        </form>
        <div className="kids-result-area" ref={resultRef}>
          {loading && <span>Loading AI result...</span>}
          {!loading && result && <div style={{whiteSpace: 'pre-line'}}>{result}</div>}
        </div>
        {!loading && result && (
          <button className="download-pdf-btn" onClick={handleDownloadPDF} style={{marginTop: 16}}>Download PDF</button>
        )}
      </div>
    </NumerologyKidsBackground>
  );
}

export default NumerologyKidsForm; 