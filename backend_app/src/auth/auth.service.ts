import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET, SALT_ROUNDS } from '../common/constants';
import { ErrorManager } from 'src/Config/error.manager';
import { MentorService } from 'src/mentor/mentor.service';
import { AlumnService } from 'src/alunm/alunm.service';

@Injectable()
export class AuthService {
    constructor(
            private readonly userService: UserService,
            private jwtService: JwtService,
            private readonly mentorService: MentorService,
            private readonly alumnService: AlumnService
            ) {}

    async studentRegister({ password, email, firstName, lastName, role, phone,  }: RegisterDto, file?: Express.Multer.File){

        try {
            const verifyUser = await this.userService.findByEmailExistent(email);

            if (verifyUser) throw new BadRequestException(`This Email is already registered`);

            const encriptedPass = await bcrypt.hash(password, SALT_ROUNDS);
            
            const newUser = await this.userService.createStudent({ firstName, lastName, phone, email, role, password: encriptedPass });

            const mentor = await this.alumnService.create({
                user: newUser
            }, file)

            return {
                user: newUser,
                mentor: mentor,
            };

        } catch (error) {

            if (error) {
                throw new ErrorManager().errorHandler(error);
            };

        }
    }

    async login(user: LoginDto){
        try {
            
            const verifyUser = await this.userService.findByEmailExistent(user.email)
            if (!verifyUser) throw new UnauthorizedException(`Wrong document or password`);

            const isMatch = await bcrypt.compare(user.password, verifyUser.password);
            if (!isMatch) throw new UnauthorizedException(`Wrong email or password`);

            const token = await this.jwtService.signAsync({ userId: verifyUser.id, role: verifyUser.role }, {
                secret: JWT_SECRET,
                expiresIn: '1d'
            });

            return {
                token: token,
                userId: verifyUser.id,
                role: verifyUser.role
            }
        } catch (error) {

            if (error) {
                throw new ErrorManager().errorHandler(error);
            }
        }
    }

    async mentorRegister( { password, firstName, lastName, email, phone, role, mentorDescription, categories, price, aboutMe, birthDate, speciality } : RegisterDto, file: Express.Multer.File){
        try {

            const encriptedPass = await bcrypt.hash(password, SALT_ROUNDS);
            
            const newUser = await this.userService.createMentor({ firstName, lastName, phone, email, role, password: encriptedPass});

            const mentor = await this.mentorService.post_create_mentor({
                mentorDescription,
                price,
                aboutMe,
                birthdate: new Date(birthDate),
                Categories: categories,
                idSpeciality: speciality,
                user: newUser
            }, file)

            return {
                user: newUser,
                mentor: mentor,
            };


            return newUser;

        } catch (error) {

            if (error) {
                throw new ErrorManager().errorHandler(error);
            }
        }
    }

}