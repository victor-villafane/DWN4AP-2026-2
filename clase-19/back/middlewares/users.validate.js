import { usersSchema } from "../schemas/users.js"

export async function validateUser(req, res, next){
    try{
        await usersSchema.parseAsync(req.body)
        console.log("Validado")
    }catch(err){
        console.log(err)
    }
} 