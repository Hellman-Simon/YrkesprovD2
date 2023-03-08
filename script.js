const lottoSelect = document.querySelector('#lotto');
const numPicksSelect = document.querySelector('#num-picks');
const numBonusSelect = document.querySelector('#num-bonus');
const numRowsSelect = document.querySelector('#num-rows');
const generateBtn = document.querySelector('#generate-btn');
const resultsDiv = document.querySelector('#results');

const lottoRanges = {
  'lotto': { main: { min: 1, max: 40 }, bonus: { min: 1, max: 40 } },
  'eurojackpot': { main: { min: 1, max: 50 }, bonus: { min: 1, max: 12 } },
  'vikinglotto': { main: { min: 1, max: 48 }, bonus: { min: 1, max: 5 } },
  'keno': { main: { min: 1, max: 70 } }
};

generateBtn.addEventListener('click', () => {
  const lottoType = lottoSelect.value;
  const numPicks = parseInt(numPicksSelect.value);
  const numBonusPicks = parseInt(numBonusSelect.value);
  const numRows = parseInt(numRowsSelect.value);

  resultsDiv.innerHTML = '';

  for (let i = 0; i < numRows; i++) {
    let mainNumbers = [];
    while (mainNumbers.length < numPicks) {
      const randomNumber = Math.floor(Math.random() * (lottoRanges[lottoType].main.max - lottoRanges[lottoType].main.min + 1) + lottoRanges[lottoType].main.min);
      if (!mainNumbers.includes(randomNumber)) {
        mainNumbers.push(randomNumber);
      }
    }

    let bonusNumbers = [];
    if (lottoType !== 'keno') {
      while (bonusNumbers.length < numBonusPicks) {
        const randomNumber = Math.floor(Math.random() * (lottoRanges[lottoType].bonus.max - lottoRanges[lottoType].bonus.min + 1) + lottoRanges[lottoType].bonus.min);
        if (!bonusNumbers.includes(randomNumber)) {
          bonusNumbers.push(randomNumber);
        }
      }
    }

    mainNumbers.sort((a, b) => a - b);
    bonusNumbers.sort((a, b) => a - b);

    let resultStr = `Row ${i + 1}: `;
    resultStr += mainNumbers.join(' ');
    if (bonusNumbers.length > 0) {
      resultStr += ' + ';
      resultStr += bonusNumbers.join(' ');
    }

    const resultDiv = document.createElement('div');
    resultDiv.textContent = resultStr;

    resultsDiv.appendChild(resultDiv);
  }
});
