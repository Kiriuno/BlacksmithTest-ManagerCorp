import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
