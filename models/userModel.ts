import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {
    
    @ObjectIdColumn()
    id: ObjectID;

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    dob: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
