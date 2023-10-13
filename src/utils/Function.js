// Utility function to calculate mean
const FractionDigits = (number) => Math.round(number*1000)/1000;

export const calculateMean = (numbers) => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return FractionDigits(sum / numbers.length);
};
//
// Utility function to calculate median
export const calculateMedian = (numbers) => {
  const sortedNumbers = numbers.sort((a, b) => a - b);
  const mid = Math.floor(sortedNumbers.length / 2);
  if (sortedNumbers.length % 2 === 0) {
    return (sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2;
  }
  return FractionDigits(sortedNumbers[mid]);
};

// Utility function to calculate mode
export const calculateMode = (numbers) => {
  const numberCount = {};
  numbers.forEach((num) => {
    numberCount[num] = (numberCount[num] || 0) + 1;
  });

  let maxFrequency = 0;
  let modes = [];
  for (const num in numberCount) {
    if (numberCount[num] > maxFrequency) {
      modes = [FractionDigits(num)];
      maxFrequency = numberCount[num];
    } else if (numberCount[num] === maxFrequency) {
      modes.push(FractionDigits(num));
    }
  }
  return modes;
};


