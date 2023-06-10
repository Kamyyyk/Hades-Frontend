import moment from 'moment';

export const getFormatDate = () => {
   return moment().format('YYYY-DD-MM');
};