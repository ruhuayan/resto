export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  username: string;
  email?: string;
  password?: string;
  token?: string;
  role?: UserRole;
}

export interface PasswordPayload {
  username: string;
  password: string;
  newPassword: string;
  token: string;
}

export interface Area {
  id: string;
  name: string;
  description: string;
}

export interface Table {
  id: string;
  name: string;
  description: string;
  capacity: number;
  areaId: number;
  areaName?: string;
}
