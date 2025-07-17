

const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY; // <-- Điền API key của bạn ở đây

export async function fetchNumerologyReport(form, type = 'adult') {
  let prompt = '';
  if (type === 'adult') {
    prompt = `Generate a detailed numerology report for the following person. Use the provided numbers and information. Structure the report into 5 clear sections with headings:

A. Overview Analysis
B. Life Path Analysis
C. Destiny Analysis
D. Soul Urge Analysis
E. Ability Analysis

For each section, provide in-depth insights and practical advice. Use the following data:
Full name: ${form.fullName}
Nickname: ${form.commonName}
Gender: ${form.gender}
Date of birth: ${form.day}/${form.month}/${form.year}
Life Path Number: ${form.numbers?.so_chu_dao}
Destiny Number: ${form.numbers?.su_menh}
Soul Urge Number: ${form.numbers?.linh_hon}
Attitude Number: ${form.numbers?.thai_do}
Personality Number: ${form.numbers?.nhan_cach}
Maturity Number: ${form.numbers?.truong_thanh}
Quintessence Number: ${form.numbers?.tu_duy}

Please write the report in English, use clear section headings (A, B, C, D, E), and make the analysis easy to read and actionable.`;
  } else {
    prompt = `Generate a detailed numerology report for a child and their parents. Structure the report into 5 clear sections with headings:

A. Overview Analysis
B. Life Path Analysis
C. Destiny Analysis
D. Soul Urge Analysis
E. Ability Analysis

For each section, provide in-depth insights and practical advice. Use the following data:
Child's name: ${form.childName}
Gender: ${form.childGender}
Date of birth: ${form.childDay}/${form.childMonth}/${form.childYear}
Father's name: ${form.fatherName}
Father's date of birth: ${form.fatherDay}/${form.fatherMonth}/${form.fatherYear}
Mother's name: ${form.motherName}
Mother's date of birth: ${form.motherDay}/${form.motherMonth}/${form.motherYear}

Please write the report in English, use clear section headings (A, B, C, D, E), and make the analysis easy to read and actionable.`;
  }
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No result';
} 