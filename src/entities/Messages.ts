import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Campaigns } from "./Campaigns";

@Index("fk_campaign", ["campaignId"], {})
@Entity("messages")
export class Messages {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("int", { name: "campaign_id", nullable: true })
  campaignId!: number | null;

  @Column("varchar", { name: "phone", nullable: true, length: 50 })
  phone!: string | null;

  @Column("varchar", { name: "text", nullable: true, length: 500 })
  text!: string | null;

  @Column("int", { name: "shipping_status", nullable: true })
  shippingStatus!: number | null;

  @Column("date", { name: "process_date", nullable: true })
  processDate!: string | null;

  @Column("datetime", { name: "process_hour", nullable: true })
  processHour!: Date | null;

  @ManyToOne(() => Campaigns, (campaigns) => campaigns.messages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "campaign_id", referencedColumnName: "id" }])
  campaign!: Campaigns | null;


}
