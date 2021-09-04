import { IsString, IsBoolean } from "class-validator";
import { PlaceParking } from "src/place-parking/entities/place-parking.entity";

export class UserDto {

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsBoolean()
    isAdmin: boolean;

    placeParking: PlaceParking;
}
