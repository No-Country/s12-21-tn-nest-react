import { BaseEntity } from "../../../common/base/entity";
import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Role } from "../../../auth/role/entities/role.entity";
import { Mentor } from "src/mentor/models/mentor.entity";
import { Alumn } from "src/alunm/models/alumn.entity";



@Entity()
export class User extends BaseEntity {

    @Column({
        nullable: false
    })
    firstName: string

    @Column({
        nullable: false
    })
    lastName: string

    @Column({
        nullable: false,
        unique: true
    })
    email: string

    @Column({
        nullable: false,
        select: false
    })
    password: string

    @Column({
        nullable: true
    })
    phone: string

    @ManyToOne(() => Role,(role) => role.name,{eager:true})
    @JoinColumn({
        name: 'role',
        referencedColumnName: 'name'
    })
    role: string;
    
    @OneToOne(() => Mentor, (mentor) => mentor.user)
    @JoinColumn({
        name: 'mentor',
    })
    mentor: Mentor;
    
    @OneToOne(() => Alumn, (alumn) => alumn.user)
    @JoinColumn({
        name: 'alumn',
    })
    alumn: Alumn;

}