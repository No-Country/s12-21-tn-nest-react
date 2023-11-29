import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot({
    isGlobal: true,
})

export const JWT_SECRET = process.env.JWT_SECRET;
export const SALT_ROUNDS = +process.env.SALT_ROUNDS;