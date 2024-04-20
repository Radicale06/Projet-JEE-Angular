import { Choice } from "./choice"

export class Question {
    id:number;
    choices: Choice[]
    text:string;
    quizzId?: number;

    constructor(id: number, text:string, quizzId?: number){
        this.text = text
        this.id=id
        this.quizzId = quizzId
        this.choices = []
    }
}
