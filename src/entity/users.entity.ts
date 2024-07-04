import { IsEnum, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { User } from '@interfaces/users.interface';

@Entity()
@Unique(['email'])
export class UserEntity implements User {


  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: false,
 })
  email: string;


  @Column({
    nullable: false,
  })
  password: string;


  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  organization: string;

  @Column({
    nullable: true,
  })
  role: string;

  @Column({
    nullable: true,
  })
  web: string;

  @Column({
    nullable: true,
  })
  status: string;

  @Column({
    nullable: true,
  })
  otp: string;

  

}
