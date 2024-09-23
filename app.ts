
import { Request, Response } from "express";
import express, { Express } from "express";
import bodyParser from "body-parser";
import llamaIndexService from "./LlamaIndexService";


const app = express()

app.use(bodyParser.json())

app.post('/indexvs', async (req : Request, res : Response) => {
    const text = req.body.text 
    llamaIndexService.pushDocument(text)
    await llamaIndexService.createIndex()
    res.json({
        status: "Sucess", 
        message: "Indexed successfully"
    })
})

app.get('/queryvs/:query', async (req : Request, res : Response) => {
    const queryStr = req.params.query 
    const result = await llamaIndexService.query(queryStr)
    res.json({
        result
    }) 
})

app.listen(5000, () => {
    console.log("Started listening")
})