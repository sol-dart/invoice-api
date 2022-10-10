import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { sequelizeConnection, Invoice } from './config'
const { Op } = require("sequelize")
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config()

const app: Express = express()
const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send({
        body: 'Welcome to the Dart database API'
    })
})

app.post('/addInvoice', async (req: Request, res: Response) => {
    let body = req.body
    await Invoice.sync()
    const invoice = await Invoice.create({ 
        txid: body.txid,
        payer: body.payer,
        recipient: body.recipient,
        amount: body.amount,
        mint: body.mint,
        label: body.label,
        message: body.message,
        memo: body.memo
    });
    res.send({
        invoice: invoice
    })
})

app.get('/fetchInvoice', async (req: Request, res: Response) => {
    
    const result = await Invoice.findAll({
        where: {
            [Op.or]: [
                { payer: req.body.pubkey },
                { recipient: req.body.pubkey }
            ]
        }
    })

    res.send({
        invoices: result
    })
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});