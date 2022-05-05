export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface TaskInt {
  id: number;
  title: string | number;
}

export interface Board {
  id: string;
  title: string | number;
}
