// Hàm rút gọn số về 1 chữ số, trừ các số master 11, 22, 33
export function reduceNumber(num) {
  while (
    num > 9 &&
    num !== 11 &&
    num !== 22 &&
    num !== 33
  ) {
    num = num
      .toString()
      .split('')
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return num;
}

// Bảng chuyển chữ cái sang số theo Pythagoras
const letterToNumber = {
  A:1, J:1, S:1,
  B:2, K:2, T:2,
  C:3, L:3, U:3,
  D:4, M:4, V:4,
  E:5, N:5, W:5,
  F:6, O:6, X:6,
  G:7, P:7, Y:7,
  H:8, Q:8, Z:8,
  I:9, R:9
};

// Chuyển tên thành mảng số
export function nameToNumbers(name) {
  return name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .map(ch => letterToNumber[ch] || 0);
}

// Số chủ đạo (Life Path Number)
export function calcLifePathNumber(dob) {
  // dob: "dd/mm/yyyy" hoặc "yyyy-mm-dd"
  let parts = dob.includes('/') ? dob.split('/') : dob.split('-');
  if (parts[0].length === 4) parts = [parts[2], parts[1], parts[0]]; // yyyy-mm-dd -> dd,mm,yyyy
  const [day, month, year] = parts.map(Number);
  const total = reduceNumber(day) + reduceNumber(month) + reduceNumber(year);
  return reduceNumber(total);
}

// Số thái độ (Attitude/Birthday Number)
export function calcAttitudeNumber(dob) {
  let parts = dob.includes('/') ? dob.split('/') : dob.split('-');
  if (parts[0].length === 4) parts = [parts[2], parts[1], parts[0]];
  const [day, month] = parts.map(Number);
  return reduceNumber(day + month);
}

// Số sứ mệnh (Destiny/Expression Number)
export function calcDestinyNumber(name) {
  const nums = nameToNumbers(name);
  const total = nums.reduce((a, b) => a + b, 0);
  return reduceNumber(total);
}

// Số linh hồn (Soul Urge/Heart’s Desire Number)
export function calcSoulUrgeNumber(name) {
  const vowels = 'AEIOU';
  const nums = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .filter(ch => vowels.includes(ch))
    .map(ch => letterToNumber[ch] || 0);
  const total = nums.reduce((a, b) => a + b, 0);
  return reduceNumber(total);
}

// Số nhân cách (Personality Number)
export function calcPersonalityNumber(name) {
  const vowels = 'AEIOU';
  const nums = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .filter(ch => !vowels.includes(ch))
    .map(ch => letterToNumber[ch] || 0);
  const total = nums.reduce((a, b) => a + b, 0);
  return reduceNumber(total);
}

// Số trưởng thành (Maturity Number)
export function calcMaturityNumber(lifePath, destiny) {
  return reduceNumber(lifePath + destiny);
}

// Số tư duy (Quintessence/Dream Number)
export function calcQuintessenceNumber(lifePath, destiny, soulUrge) {
  return reduceNumber(lifePath + destiny + soulUrge);
}


// Hàm tổng hợp tính tất cả các số
export function calculateAllNumbers(name, dob) {
  const lifePath = calcLifePathNumber(dob);
  const attitude = calcAttitudeNumber(dob);
  const destiny = calcDestinyNumber(name);
  const soulUrge = calcSoulUrgeNumber(name);
  const personality = calcPersonalityNumber(name);
  const maturity = calcMaturityNumber(lifePath, destiny);
  const quintessence = calcQuintessenceNumber(lifePath, destiny, soulUrge);

  return {
    so_chu_dao: lifePath,
    thai_do: attitude,
    su_menh: destiny,
    linh_hon: soulUrge,
    nhan_cach: personality,
    truong_thanh: maturity,
    tu_duy: quintessence
  };
}

// Tính các chu kỳ số học (Pinnacle Cycles)
export function calculatePinnacleCycles(dob) {
  // dob: "dd/mm/yyyy" hoặc "yyyy-mm-dd"
  let parts = dob.includes('/') ? dob.split('/') : dob.split('-');
  if (parts[0].length === 4) parts = [parts[2], parts[1], parts[0]]; // yyyy-mm-dd -> dd,mm,yyyy
  const [day, month, year] = parts.map(Number);

  // Chu kỳ 1: reduce(day + month)
  const cycle1 = reduceNumber(day + month);
  // Chu kỳ 2: reduce(day + year)
  const cycle2 = reduceNumber(day + year);
  // Chu kỳ 3: reduce(cycle1 + cycle2)
  const cycle3 = reduceNumber(cycle1 + cycle2);
  // Chu kỳ 4: reduce(month + year)
  const cycle4 = reduceNumber(month + year);

  // Độ dài mỗi chu kỳ (theo chuẩn Pythagoras):
  // Cycle 1: đến 36 - Life Path
  // Cycle 2: 9 năm tiếp theo
  // Cycle 3: 9 năm tiếp theo
  // Cycle 4: đến hết đời
  return {
    cycles: [cycle1, cycle2, cycle3, cycle4],
    labels: [
      'Chu kỳ 1',
      'Chu kỳ 2',
      'Chu kỳ 3',
      'Chu kỳ 4'
    ]
  };
} 