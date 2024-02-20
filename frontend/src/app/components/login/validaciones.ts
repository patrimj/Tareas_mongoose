export function validar(email: string, password: string): string {

    if (!email || !password) {
        return 'complete todos los campos';
    }
    if (password.length < 4) {
        return 'La contraseña debe tener al menos 4 caracteres';
    }
    if (!email.includes('@')) {
        return 'El email debe ser válido';
    }
    if (!email.includes('.com') && !email.includes('.es')) {
        return 'El email debe ser válido';
    }
    if (email.includes(' ')) {
        return 'El email no debe tener espacios';
    }
    if (password.includes(' ')) {
        return 'La contraseña no debe tener espacios';
    }
    if (!email ) {
        return 'Por favor, complete el email';
    }
    if (!password) {
        return 'Por favor, complete la contraseña';
    }

    //TODO:PONER MUCHIIIISIMAS MAS VALIDACIONES


    return '';
}