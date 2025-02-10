import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { User } from '../../user/entity'
import { Content } from '../../content/entity'

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @OneToMany(() => User, (user) => user.company)
  users: User[]

  @OneToMany(() => Content, (content) => content.company)
  contents: Content[]
}
