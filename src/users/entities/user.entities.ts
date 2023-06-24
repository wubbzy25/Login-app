import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  gmail: string;
  @Column()
  password: string;
  @Column()
  AccessToken: string;
  @Column()
  ResetPasswordCode: string;
  @Column()
  ResetPassword: boolean;
}
