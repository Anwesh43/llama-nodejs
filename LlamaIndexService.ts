import { VectorStoreIndex, Document, RetrieverQueryEngine, Settings, OpenAI} from 'llamaindex'
import {config} from 'dotenv'

config()
Settings.llm = new OpenAI({ model: "gpt-3.5-turbo", temperature: 0 });
class LlamaIndexService {

    documents : Document[] = []

    index : VectorStoreIndex
    engine : RetrieverQueryEngine

    constructor() {

    }

    pushDocument(text : string) {
        this.documents.push(new Document({text}))
    }

    async createIndex() { 
        console.log("Started indexing")
        this.index = await VectorStoreIndex.fromDocuments(this.documents)
        this.engine = this.index.asQueryEngine()
        console.log("Completed indexing")
    }

    async query(query : string) : Promise<string> {
        const result = await this.engine.query({query})
        return result.toString()
    }
}

const llamaIndexService : LlamaIndexService = new LlamaIndexService()

export default llamaIndexService