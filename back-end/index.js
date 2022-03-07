const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
const expressValidator = require('express-validator')
app.use(expressValidator())

const { validationResult } = require('express-validator/check');


app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/data',   (req, res, next) => {
    res.json({requestBody: req.body})
    
  })
  
 app.post('/data',[
    check('data')
    .isLength({ min: 10 }) 
    .withMessage('Must be at least 10 chars long')
    .isNumeric()
    .withMessage('Must be only Numbers ')
  ],   (req, res, next) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
    res.redirect(303, '/data');
 })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})