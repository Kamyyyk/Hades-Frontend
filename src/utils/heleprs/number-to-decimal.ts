export const numberToDecimal = (number: number | undefined) => {
   if (number === undefined) return; 
   return parseFloat(String(Math.round(number * 100) / 100)).toFixed(2);
};