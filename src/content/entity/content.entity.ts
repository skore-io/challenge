import { Company } from 'src/company/entity'
import { ContentType } from 'src/content/enum/content-type.enum'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ type: 'enum', enum: ContentType })
  type: ContentType

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  url?: string

  @Column({ nullable: true })
  cover?: string

  @Column({ type: 'int' })
  total_likes: number

  @Column({ nullable: true, type: 'text' })
  text_content: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date | null

  @ManyToOne(() => Company, (company) => company.contents)
  @JoinColumn({ name: 'company_id' })
  company: Company
}
