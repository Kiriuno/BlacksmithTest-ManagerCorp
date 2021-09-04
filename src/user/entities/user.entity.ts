import { PlaceParking } from "src/place-parking/entities/place-parking.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({select: false})
    password: string;

    @Column({default: false})
    isAdmin: boolean;


    @ManyToOne(type => PlaceParking, placeParking => placeParking.num, {})
    placeParking: PlaceParking;
}
