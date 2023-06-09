export const orderNumberGenerator = () => {
   const currentDate = new Date();
   const year = currentDate.getFullYear().toString().substr(-2);
   const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
   const day = ('0' + currentDate.getDate()).slice(-2);
   const randomDigits = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
   return `${year}/${month}/${day}/${randomDigits}`;
};
