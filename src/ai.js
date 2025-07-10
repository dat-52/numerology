

const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY; // <-- Điền API key của bạn ở đây

export async function fetchNumerologyReport(form, type = 'adult') {
  let prompt = '';
  if (type === 'adult') {
    prompt = `Give me a detailed numerology report for this person:\nFull name: ${form.fullName}\nNickname: ${form.commonName}\nGender: ${form.gender}\nDate of birth: ${form.day}/${form.month}/${form.year}\nThe report should include: Life Path Number, Strengths, Weaknesses, Personality, Opportunities, Challenges, and other relevant numerology insights.`;
  } else {
    prompt = `Give me a detailed numerology report for a child and their parents:\nChild's name: ${form.childName}\nGender: ${form.childGender}\nDate of birth: ${form.childDay}/${form.childMonth}/${form.childYear}\nFather's name: ${form.fatherName}\nFather's date of birth: ${form.fatherDay}/${form.fatherMonth}/${form.fatherYear}\nMother's name: ${form.motherName}\nMother's date of birth: ${form.motherDay}/${form.motherMonth}/${form.motherYear}\nThe report should include: Child's potential, early life timeline, parenting solutions, compatibility or conflict between parents and child, suitable career directions, and other relevant numerology insights for children.`;
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