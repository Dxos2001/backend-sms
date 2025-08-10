import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Messages } from "./Messages";

@Index("fk_users", ["userId"], {})
@Entity("campaigns")
export class Campaigns {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("int", { name: "user_id", nullable: true })
  userId!: number | null;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name!: string | null;

  @Column("date", { name: "process_date", nullable: true })
  processDate!: string | null;

  @Column("datetime", { name: "process_hour", nullable: true })
  processHour!: Date | null;

  @Column("int", { name: "process_status", nullable: true })
  processStatus!: number | null;

  @Column("varchar", { name: "phone_list", nullable: true, length: 50 })
  phoneList!: string | null;

  @Column("varchar", { name: "message_text", nullable: true, length: 500 })
  messageText!: string | null;

  @ManyToOne(() => Users, (users) => users.campaigns, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: Users | null;

  @OneToMany(() => Messages, (messages) => messages.campaign)
  messages!: Messages[];
  

}
