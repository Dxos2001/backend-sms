import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Campaigns } from "./Campaigns";
import { Customers } from "./Customers";

@Index("fk_customers", ["customer_id"], {})
@Entity("users")
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("int", { name: "customer_id", nullable: true })
  customer_id!: number | null;   // <- !

  @Column("varchar", { name: "username", nullable: true, length: 50 })
  username!: string | null;      // <- !

  @Column("tinyint", { name: "status", nullable: true, width: 1 })
  status!: boolean | null;       // <- !

  @OneToMany(() => Campaigns, (campaigns) => campaigns.user)
  campaigns!: Campaigns[];       // <- ! (y sin = [])

  @ManyToOne(() => Customers, (customers) => customers.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "customer_id", referencedColumnName: "id" }])
  customer!: Customers | null;   // <- !
}