import React from 'react';
import './NumerologySummaryView.css';
import NumerologyCycleChart from "./NumerologyCycleChart";

const numberLabels = [
  { key: 'linh_hon', label: 'Linh hồn' },
  { key: 'su_menh', label: 'Sứ mệnh' },
  { key: 'thai_do', label: 'Thái độ' },
  { key: 'nhan_cach', label: 'Nhân cách' },
  { key: 'truong_thanh', label: 'Trưởng thành' },
  { key: 'tu_duy', label: 'Tư duy' },
];

function NumerologySummaryView({ name, dob, numbers, onShowDetail, cycleData, cycleLabels }) {
  if (!numbers) return null;
  return (
    <div className="numerology-summary-view">
      <div className="summary-header">
        <div>
          <span>Họ và tên: <b style={{ color: '#ffe600' }}>{name}</b></span><br />
          <span>Ngày sinh: <b style={{ color: '#ffe600' }}>{dob}</b></span>
        </div>
      </div>
      <div className="so-chu-dao-label">SỐ CHỦ ĐẠO</div>
      <div className="so-chu-dao-circle">
        <span className="so-chu-dao-number">{numbers.so_chu_dao}</span>
      </div>
      <div className="numbers-row">
        {numberLabels.map(({ key, label }) => (
          <div className="number-card" key={key}>
            <div className="number-label">{label}</div>
            <div className="number-value">{numbers[key]}</div>
          </div>
        ))}
      </div>
      {/* Thêm biểu đồ chu kỳ nếu có dữ liệu */}
      {cycleData && cycleData.length > 0 && (
        <div style={{ margin: "32px 0" }}>
          <h3 style={{ textAlign: "center", fontFamily: "Poppins, sans-serif" }}>Biểu đồ Chu kỳ Số học</h3>
          <NumerologyCycleChart cycleData={cycleData} labels={cycleLabels} title="Numerology Cycle Chart" />
        </div>
      )}
      <button className="show-detail-btn" onClick={onShowDetail}>Xem chi tiết luận giải</button>
    </div>
  );
}

export default NumerologySummaryView; 