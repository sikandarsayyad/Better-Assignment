export class User {
    id:number
    userEmail:string
    userPassword:string
    userConformPassword:string

    constructor(){
        this.id = 0
        this.userEmail = ''
        this.userPassword = ''
        this.userConformPassword = ''
    }
}