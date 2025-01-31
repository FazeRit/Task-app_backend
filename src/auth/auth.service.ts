import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService){}
   
    async signup(dto: AuthDto){
        try{
            const hash = await argon.hash(dto.password);
        
            const user = await this.prisma.user.create({
                data:{
                    email: dto.email,
                    password: hash
                },
                select:{
                    id: true,
                    email: true,
                    createdAt: true
                }
            })
            
            return this.signToken(user.id, user.email);
        }catch(err){
            if(err instanceof PrismaClientKnownRequestError){
                if(err.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken');
                }
            }
        }
    }

    async signin(dto: AuthDto){
        const user = await this.prisma.user.findUnique({
            where:{
                email: dto.email,
            }
        })

        if(!user) {
            throw new ForbiddenException('Credentials incorrect');
        }
  
        const passMatch = await argon.verify(
            user.password, 
            dto.password
        )
        
        if(!passMatch){
            throw new ForbiddenException('Credentials incorrect');
        }

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<  {access_token: string}> {
        const payload = {
            sub: userId, 
            email
        }

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret 
        });

        return {
            access_token: token,
        };
    }
}