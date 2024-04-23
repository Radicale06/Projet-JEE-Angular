export class Choice {
    
    
    id?: number;
    text:string
    isCorrect:boolean
    questionId?: number
    constructor(id:number | undefined,text:string, isCorrect:boolean,questionId:number | undefined){
        this.id = id
        this.text = text
        this.isCorrect = isCorrect
        this.questionId = questionId
        
    }
    
    
}
