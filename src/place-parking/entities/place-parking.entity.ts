import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlaceParking {
    
    @PrimaryGeneratedColumn()
    num: number;

    @Column()
    etage: number;

    @Column({default: false})
    disponible: boolean;

    @Column({default: 0})
    tpsOccupation: number;

    @OneToOne(type => User, user => user.placeParking)
    user: User;
}
