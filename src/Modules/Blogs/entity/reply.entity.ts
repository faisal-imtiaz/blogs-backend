import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column()
  userid: number

  @Column()
  commentid: number
}
