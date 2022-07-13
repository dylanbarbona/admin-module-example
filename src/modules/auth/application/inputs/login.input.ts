import { InputType, Field } from '@nestjs/graphql';
import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

@InputType()
export class LoginInput {
    @Field({ description: 'Correo electrónico' })
    @IsEmail( {}, { message: 'El correo electrónico no es válido' })
    @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
    @MaxLength(50, { message: 'El correo electrónico no puede tener más de 50 caracteres' })
    email: string;

    @Field({ description: 'Contraseña' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @IsString({ message: 'La contraseña debe ser un texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(50, { message: 'La contraseña no puede tener más de 50 caracteres' })
    password: string;
}
