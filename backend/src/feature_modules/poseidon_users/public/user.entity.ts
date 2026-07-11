import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('poseidon_users')
export class PoseidonUser {
    @PrimaryGeneratedColumn()
    uid!: number;

    @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
    username!: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    hashed_password!: string;

    @Column({ type: 'text', nullable: true })
    email?: string;

    @CreateDateColumn({ nullable: false })
    create_at!: Date;

    @Column({ type: 'timestamptz', nullable: true })
    last_login?: Date;
}