export class Choice {
    
    
    id?: number;
    text:string
    isCorrect:boolean
    questionId?: number
    constructor(id:number,text:string, isCorrect:boolean,questionId:number){
        this.id = id
        this.text = text
        this.isCorrect = isCorrect
        this.questionId = questionId
        
    }
    
    
}
