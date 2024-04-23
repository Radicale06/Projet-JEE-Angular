import { Utilisateur } from "./utilisateur";

export class Teacher extends Utilisateur {
    private _departement: string;

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
        _departement: string
    ) {
        super(_id, _firstname, _lastname, _email, _username, _gender, _password, _etablissement, _rememberMeToken);
        this._departement = _departement;
    }

    // Getter and Setter for departement
    get departement(): string {
        return this._departement;
    }

    set departement(departement: string){
        this._departement = departement;
    }
}
