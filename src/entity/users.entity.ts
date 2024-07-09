import { IsEnum, IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from "typeorm";
import { User } from "@interfaces/users.interface";
import { Organization } from "@/interfaces/organization.interface";
import { OrganizationEntity } from "./organization.entity";

@Entity()
@Unique(["email"])
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

  @ManyToOne(() => OrganizationEntity, { nullable: true })
  @JoinColumn({ name: "organizationId" })
  organization: Organization;

  @Column({
    nullable: true,
  })
  role: string;

  @Column({
    nullable: true,
  })
  status: string;

  @Column({
    nullable: true,
  })
  otp: string;

  @Column({
    nullable: true,
  })
  isTwoFactorAuthEnabled: boolean;
}
