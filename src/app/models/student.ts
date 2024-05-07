import { Utilisateur } from "./utilisateur";

export class Student extends Utilisateur {
    private _classe: string;

    constructor(
        _id: number,
        _firstname: string,
        _lastname: string,
        _email: string,
        _username: string,
        _gender: string,
        _password: string,
        _etablissement: string,
        _rememberMeToken: string,
        _classe: string
    ) {
        super(_id, _firstname, _lastname, _email, _username, _gender, _password, _etablissement);
        this._classe = _classe;
    }

    // Getter and Setter for classe
    get classe(): string {
        return this._classe;
    }

    set classe(classe: string){
        this._classe = classe;
    }
}
