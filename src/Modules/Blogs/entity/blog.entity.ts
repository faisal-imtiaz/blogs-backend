import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public title: string

  @Column()
  public content: string

  @Column()
  public userid: number
}
