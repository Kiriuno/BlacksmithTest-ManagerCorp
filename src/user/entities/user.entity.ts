import { PlaceParking } from "src/place-parking/entities/place-parking.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({select: false, default: ""})
    password: string;

    @Column({default: false})
    isAdmin: boolean;


    @OneToOne(type => PlaceParking, placeParking => placeParking.user)
    @JoinColumn()
    placeParking: PlaceParking;
}
