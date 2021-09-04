import { IsNumber, IsBoolean } from "class-validator";

export class PlaceParkingDto {

    @IsNumber()
    num: number;

    @IsNumber()
    etage: number;

    @IsBoolean()
    disponible: boolean;

    @IsNumber()
    tpsOccupation: number;
}
