import { Question } from "./question"

export class Quizz {

    private _id: number
    private _title:string
    private _duration:number
    private _token:number
    private _started: boolean
    private _finished:boolean
    private _opentojoint: boolean
    private _maxParticipations:number
    private _questions: Question[]

    constructor(id: number, title:string, duration:number,
                token:number, started: boolean, finished:boolean,
                opentojoin: boolean, maxParticipations:number){
        this._id=id;
        this._title=title;
        this._duration=duration;
        this._token=token;
        this._started=started;
        this._finished=finished;
        this._opentojoint=opentojoin;
        this._maxParticipations=maxParticipations;
        this._questions = []
    }

    // Getters
    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get duration(): number {
        return this._duration;
    }

    get token(): number {
        return this._token;
    }

    get started(): boolean {
        return this._started;
    }

    get finished(): boolean {
        return this._finished;
    }

    get opentojoint(): boolean {
        return this._opentojoint;
    }

    get maxParticipations(): number {
        return this._maxParticipations;
    }

    get questions(): Question[] {
        return this._questions;
    }

    // Setters
    set id(value: number) {
        this._id = value;
    }

    set title(value: string) {
        this._title = value;
    }

    set duration(value: number) {
        this._duration = value;
    }

    set token(value: number) {
        this._token = value;
    }

    set started(value: boolean) {
        this._started = value;
    }

    set finished(value: boolean) {
        this._finished = value;
    }

    set opentojoint(value: boolean) {
        this._opentojoint = value;
    }

    set maxParticipations(value: number) {
        this._maxParticipations = value;
    }

    set questions(value: Question[]) {
        this._questions = value;
    }

    // Other methods
    addQuestion(question: Question): void{
        this._questions.push(question)
    }

    deleteQuestion(question: Question): void{
        this._questions = this._questions.filter((item:Question) => item.id !== question.id);
    }
}
