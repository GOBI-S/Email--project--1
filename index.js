import express from "express"
const app=express()
const port=3535

const name="gobi"
const age=23

app.listen(port,()=>{
    console.log(`server is running${port}`)
})