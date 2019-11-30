import express = require('express')
const app = express()
import bodyparser = require('body-parser')

let ejs = require('ejs')
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
import { MetricsHandler } from './metrics'


// Write
import WriteStream from 'level-ws'
//const ws = WriteStream(db);


app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

const port: string = process.env.PORT || '8080'

const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')


app.get('/metrics/', (req: any, res: any) => {

  dbMet.getAll((err: Error | null, result: any) => {
    if (err) throw err
    console.log(result);
    res.status(200).send(result)
  })

})


app.get('/', (req: any, res: any) => {
  res.write('Hello world')
  res.end()
})



/*
app.get('/metrics.json', (req: any, res: any) => {
    MetricsHandler.get((err: Error | null, result?: any) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })
*/

app.post('/metrics/:id', (req: any, res: any) => {
    console.log('hello', req);
    dbMet.save(req.params.id, req.body, (err: Error | null) => {
      if (err) throw err
      res.status(200).send("OK")
    })
  })

  app.get('/metrics/:id', (req: any, res: any) => {
    // console.log('hello', req);
    dbMet.getById(req.params.id, (err: Error | null, result: any) => {
      if (err) throw err
      // console.log(result);
      res.status(200).send(result)
    })
  })


  app.get('/hello/:Miha', (req, res) => {
    res.render('Page.ejs', {name: req.params.name})
  })


app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})


// compajlaš z:
//1. greš z cd v pot projekta
//2. .\node_modules\.bin\tsc ali pa .\node_modules\.bin\tsconfig.json
//npm run start