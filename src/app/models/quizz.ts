import { Question } from "./question"

export class Quizz {

    
    private QUESTIONS: Question[]

    constructor(private ID: number, private TITLE:string, private DURATION:number,
         private TOKEN:number, private STARTED: boolean, private FINISHED:boolean,
         private OPENTOJOIN: boolean, private MAX_PARTICIPATIONS:number){

        this.QUESTIONS = []
    }

    addQuestion(question: Question): void{
        this.QUESTIONS.push(question)
    }
    deleteQuestion(question: Question): void{
        this.QUESTIONS = this.questions.filter((item:Question) => item.id !== question.id);
    }
    get id():number {return this.ID}
    get title():string {return this.TITLE}
    get questions():Question[] {return this.QUESTIONS}
    get token():number {return this.TOKEN}
    get duration():number {return this.DURATION}
    get isFinished():boolean {return this.FINISHED}
    get isStarted():boolean {return this.STARTED}
    get isOpenToJoin():boolean {return this.OPENTOJOIN}
    get maxParticipations():number {return this.MAX_PARTICIPATIONS}

    set title(title:string) {this.TITLE = title}
}
