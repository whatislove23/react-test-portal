export interface IAnswer {
  id?: string;
  answer: string;
  isRight: boolean;
  checked?: boolean;
}
export interface IQuestion {
  id?: string;
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
  firstName?: string;
  lastName?: string;
}
export interface IToServer {
  title: string;
  questions: IQuestion[];
}
export interface UserServerData extends UserDataForm {
  id: number;
  userName: string;
  isAdmin?: boolean;
  grade?: number;
  creationDate: Date;
}

export interface ITest {
  id: number;
  testId: number;
  title: string;
  creationDate: Date;
  userId: string;
}

export interface IResults {
  creationDate: Date;
  title: string;
  id: number;
  grade: number;
}
