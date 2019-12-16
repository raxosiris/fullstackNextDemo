import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

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
    
}
