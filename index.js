import express from "express"
import mongoose from "mongoose"
import userRouter from "./routers/userRouter.js"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"

const app=express()

app.use(bodyParser.json())

app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value != null){
            const token = value.replace("Bearer ","")
            jwt.verify(
                token,
                "cbc_234",
                process.env.JWT_SECRET,
                (err,decoded)=>{
                    if(decoded == null){
                        res.status(403).json({
                            message : "Unauthorized"
                        })
                    }else{
                        req.user = decoded
                        next()
                    }                    
                }
            )
        }else{
            next()
        }        
    }
)

let connectionString="mongodb+srv://ruwa:12345@cluster0.dcof8af.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connectionString).then(
    ()=>{
        console.log("connected to database")
    }
).catch(
    ()=>{
        console.log("failed to connect to database")
    }
)

app.get("/",
    (req,res)=>{
        console.log(req),
        res.json(
            {
                message : "This is a get request"
            }
        )
        console.log("This is a get request")
    }
)
app.post("/",
    (req,res)=>{
    console.log(req.body),
    res.json(
        {
            "message":"This is a post req"
        }
    )
    console.log("This is a post request")
} 
)
app.delete("/",
    ()=>{console.log("This is a delete request")
})

app.use("/api/users", userRouter)

app.listen(5500,
    ()=>{
        console.log("server Started")
    }

)


