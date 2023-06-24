export interface IAnswer {
  answer: string;
  isRight: boolean;
  checked?: boolean;
}
export interface IQuestion {
  question: string;
  answers: IAnswer[];
}
export interface IData {
  id: number;
  questions: IQuestion[];
  testId?: number;
  title: string;
}
export interface UserDataForm {
  email: string;
  password: string;
}

export interface UserServerData extends UserDataForm {
  id: number;
  userName: string;
}
export interface IResults {
  id: number;
  testId: number;
  userId: number;
  answers: string;
  grade: number;
  date: Date;
  title: string;
}
