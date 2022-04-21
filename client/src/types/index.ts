export interface TaskTs{
    id:number
    title:string|number
    completed:boolean
    important:boolean
}

export interface BoardTs{
    id:number
    title:string|number
    task:[TaskTs]
}



export interface UserTs{
    id:number
    name:string
    email:string
    password:string
    task:[TaskTs]
}