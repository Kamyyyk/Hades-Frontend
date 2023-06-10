export const stringToDate = (date: string) => {
   return new Date(date);
};

export const countAge = (birthDate: Date , deathDate: Date): number => {
   return deathDate.getFullYear() - birthDate.getFullYear();
};