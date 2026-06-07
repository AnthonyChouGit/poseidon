import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('poseidon_apps')
export class PoseidonApp {
    @PrimaryGeneratedColumn()
    appid!: number;

    @Column({ type: 'text', nullable: false })
    title!: string;

    @Column({ type: 'text', nullable: true })
    summary?: string;

    @Column({ type: 'text', nullable: true })
    url?: string;

    @Column({ type: 'text', nullable: true })
    about_url?: string;

    @Column({ type: 'text', nullable: true, array: true })
    tags?: string[];

    @CreateDateColumn()
    create_at!: Date;
}