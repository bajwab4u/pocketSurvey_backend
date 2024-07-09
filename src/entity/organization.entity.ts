import { IsEnum, IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { Organization } from "@/interfaces/organization.interface";

@Entity()
@Unique(["name"])
export class OrganizationEntity implements Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable:true
  })
  personContact:string;

  @Column({
    nullable:true
  })
  address:string;

  @Column({
    nullable:true
  })
  city:string;

  @Column({
    nullable:true
  })
  webSite:string;

  @Column({
    nullable:true
  })
  addedBy?: string;

  @Column({
    nullable:true
  })
  isVerified?: boolean;
}



