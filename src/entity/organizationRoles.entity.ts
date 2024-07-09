import { IsEnum, IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from "typeorm";
import { User } from "@interfaces/users.interface";
import { Organization } from "@/interfaces/organization.interface";
import { OrganizationEntity } from "./organization.entity";
import { OrganizationRoles } from "@/interfaces/organizationRoles.interface";

@Entity()
export class organizationRolesEntity implements OrganizationRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: false,
  })
  type: string;

 

  @ManyToOne(() => OrganizationEntity, { nullable: true })
  @JoinColumn({ name: "organizationId" })
  organization: Organization;

 
}
