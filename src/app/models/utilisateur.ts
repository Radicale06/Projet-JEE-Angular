export abstract class Utilisateur {

    constructor(
        private _id: number,
        private _firstname: string,
        private _lastname: string,
        private _email: string,
        private _username: string,
        private _gender: string,
        private _password: string,
        private _etablissement: string,
        private _rememberMeToken: string
    ) {}

    get id(): number {
        return this._id;
    }

    get firstname(): string {
        return this._firstname;
    }

    get lastname(): string {
        return this._lastname;
    }

    get email(): string {
        return this._email;
    }

    get username(): string {
        console.log('called', this._username);
        return this._username;
    }

    get gender(): string {
        return this._gender;
    }

    get password(): string {
        return this._password;
    }

    get etablissement(): string {
        return this._etablissement;
    }

    get rememberMeToken(): string {
        return this._rememberMeToken;
    }

    set id(id: number) {
        this._id = id;
    }

    set firstname(firstname: string) {
        this._firstname = firstname;
    }

    set lastname(lastname: string) {
        this._lastname = lastname;
    }

    set email(email: string) {
        this._email = email;
    }

    set username(username: string) {
        this._username = username;
    }

    set gender(gender: string) {
        this._gender = gender;
    }

    set password(password: string) {
        this._password = password;
    }

    set etablissement(etablissement: string) {
        this._etablissement = etablissement;
    }

    set rememberMeToken(rememberMeToken: string) {
        this._rememberMeToken = rememberMeToken;
    }
}
