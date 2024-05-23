import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class user {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ type: "varchar", unique: true, nullable: false }) 
  email: string;

  @Column({ type: "varchar", nullable: false }) 
  password: string;

  @Column({ type: "varchar", nullable: false }) 
  role: string;
}
