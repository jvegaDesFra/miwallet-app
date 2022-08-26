export class user{
    id?: number;
    name?: string;
    lastname?: string;
    email?: string;
    token?: string;
}

export class userRequest {
    email?: string;
    password? : string;
}

export class userRegister {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
}