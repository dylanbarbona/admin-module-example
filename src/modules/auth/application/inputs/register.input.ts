import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class RegisterInput {
    @Field({ description: 'Nombre' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;

    @Field({ description: 'Correo electrónico' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsNotEmpty({ message: 'El correo electrónico es requerido' })
    email: string;

    @Field({ description: 'Contraseña' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password: string;
}
