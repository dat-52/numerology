import React from 'react';

function parseSections(result) {
  // Tách các mục dựa trên heading kiểu: ##A. Overview Analysis hoặc A. Overview Analysis
  if (!result) return [];
  // Loại bỏ markdown heading đầu nếu có
  let clean = result.replace(/^#.*\n?/gm, '').trim();
  // Tìm các heading mục
  const sectionRegex = /(?:^|\n)(?:##?\s*)?([A-E]\.\s[\w\s]+)\*?\*?\n/gi;
  let match, lastIndex = 0, sections = [], lastTitle = null;
  while ((match = sectionRegex.exec(clean)) !== null) {
    if (lastTitle !== null) {
      // Lấy nội dung từ lastIndex đến match.index
      sections.push({
        title: lastTitle,
        content: clean.slice(lastIndex, match.index).trim()
      });
    }
    lastTitle = match[1].trim();
    lastIndex = sectionRegex.lastIndex;
  }
  // Thêm mục cuối cùng
  if (lastTitle) {
    sections.push({
      title: lastTitle,
      content: clean.slice(lastIndex).trim()
    });
  }
  return sections;
}

function renderSection(section, idx) {
  return (
    <section key={idx} style={{ marginBottom: 28, padding: '18px 0', borderBottom: '1px solid #7fffd422' }}>
      <h3 style={{ color: '#ffe600', fontSize: '1.18rem', marginBottom: 10 }}>{section.title}</h3>
      <div style={{ color: '#e0c97f', fontSize: '1.08rem', whiteSpace: 'pre-line', lineHeight: 1.7 }}>
        {section.content}
      </div>
    </section>
  );
}

function NumerologyReport({ form, numbers, result, loading, resultRef, onDownloadPDF, onCloseDetail }) {
  if (!form || !numbers) return null;
  const sections = result ? parseSections(result) : [];
  return (
    <div className="numerology-report card" style={{ width: '100%', maxWidth: 700, margin: '0 auto', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#ffe600' }}>Numerology Report</h2>
        <button onClick={onCloseDetail} style={{ background: 'none', border: 'none', fontSize: 24, color: '#ffe600', cursor: 'pointer', fontWeight: 'bold', lineHeight: 1 }} title="Close">×</button>
      </div>
      <div style={{ margin: '18px 0 12px 0', fontSize: '1.1rem' }}>
        <b>Full name:</b> <span style={{ color: '#ffe600' }}>{form.fullName}</span><br />
        <b>Nickname:</b> <span style={{ color: '#ffe600' }}>{form.commonName}</span><br />
        <b>Gender:</b> <span style={{ color: '#ffe600' }}>{form.gender}</span><br />
        <b>Date of birth:</b> <span style={{ color: '#ffe600' }}>{form.day}/{form.month}/{form.year}</span>
      </div>
      <div className="result-area" ref={resultRef} style={{ background: 'rgba(44,20,60,0.7)', borderRadius: 12, padding: '24px 18px', minHeight: 140, marginBottom: 18, color: '#e0c97f', fontSize: '1.1rem', width: '100%', maxWidth: '100%', boxSizing: 'border-box', textAlign: 'left' }}>
        {loading && <span>Loading AI result...</span>}
        {!loading && !result && <span>Click "Show detailed analysis" to get your AI-powered numerology report.</span>}
        {!loading && result && (
          <div>
            {sections.length > 0
              ? sections.map(renderSection)
              : <div style={{ whiteSpace: 'pre-line' }}>{result}</div>}
          </div>
        )}
      </div>
      {!loading && result && (
        <button className="download-pdf-btn" onClick={onDownloadPDF} style={{ marginTop: 8 }}>Download PDF</button>
      )}
    </div>
  );
}

export default NumerologyReport; 