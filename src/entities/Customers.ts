import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity("customers")
export class Customers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name!: string | null;

  @Column("tinyint", { name: "status", nullable: true, width: 1 })
  status!: boolean | null;

  @OneToMany(() => Users, (users) => users.customer)
  users!: Users[];


}
