export const generateDocumentationNumber = () => {
   const nums = '0123456789';
   let num = '';
   for (let i = 0; i < 6; i++) {
      num += nums.charAt(Math.floor(Math.random() * nums.length));
   }
   return `ZZ/${num}`;
};