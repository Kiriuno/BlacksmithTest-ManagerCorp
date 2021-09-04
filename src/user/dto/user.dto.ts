import { IsNumber, IsString, IsBoolean } from "class-validator";

export class UserDto {

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsBoolean()
    isAdmin: boolean;
}
