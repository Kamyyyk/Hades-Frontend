export type TUserResponse = {
   id: number;
   username: string;
   password: string;
   role: 'ADMINISTRATOR' | 'FUNERAL_MORGUE_WORKER' | 'FUNERAL_HOME_EMPLOYEE'
}