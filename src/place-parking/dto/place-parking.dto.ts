import { IsNumber, IsBoolean } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class PlaceParkingDto {

    @IsNumber()
    num: number;

    @IsNumber()
    etage: number;

    @IsBoolean()
    disponible: boolean;

    @IsNumber()
    tpsOccupation: number;

    user: User;
}
