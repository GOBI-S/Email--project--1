import express from "express"
const app=express()
const port=3535

const name="gobi"

app.listen(port,()=>{
    console.log(`server is running${port}`)
})