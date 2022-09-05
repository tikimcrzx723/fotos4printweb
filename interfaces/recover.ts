export interface IRecover {
  user: string;
  numberOfAttempts: string;
  tempPassword: string;
  requestedDay: Date | number;
  changePassword: boolean;
}
