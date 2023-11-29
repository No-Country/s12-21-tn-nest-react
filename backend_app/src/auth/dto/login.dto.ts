import { IsEmail, IsString, MaxLength, MinLength} from "class-validator";
import { BaseEntity } from "../../common/base/entity";

export default class LoginDto extends BaseEntity {

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(16)
    password: string;

}