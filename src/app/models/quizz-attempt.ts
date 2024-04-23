export class QuizzAttempt {
    private _id: number;
    private _startedAt: Date;
    private _finishedAt: Date;
    private _isCheated: boolean;
    private _quizzId: number;
    private _etudiantId: number;
    private _answers: any[] = [];

    constructor(id: number, startedAt: Date, finishedAt: Date, isCheated: boolean, quizzId: number, etudiantId: number) {
        this._id = id;
        this._startedAt = startedAt;
        this._finishedAt = finishedAt;
        this._isCheated = isCheated;
        this._quizzId = quizzId;
        this._etudiantId = etudiantId;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get startedAt(): Date {
        return this._startedAt;
    }

    set startedAt(value: Date) {
        this._startedAt = value;
    }

    get finishedAt(): Date {
        return this._finishedAt;
    }

    set finishedAt(value: Date) {
        this._finishedAt = value;
    }

    get isCheated(): boolean {
        return this._isCheated;
    }

    set isCheated(value: boolean) {
        this._isCheated = value;
    }

    get quizzId(): number {
        return this._quizzId;
    }

    set quizzId(value: number) {
        this._quizzId = value;
    }

    get etudiantId(): number {
        return this._etudiantId;
    }

    set etudiantId(value: number) {
        this._etudiantId = value;
    }

    get answers(): any[] {
        return this._answers;
    }

    set answers(value: any[]) {
        this._answers = value;
    }
}
