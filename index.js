const express = require('express')
const app = express()
const twilio = require('twilio')
const PORT = process.env.PORT || 5000

const accountSid = process.env.TWILIO_ACCOUNT
const authToken = process.env.TWILIO_TOKEN
const alertPhone = process.env.ALERT_PHONE
const twilioPhone = process.env.TWILIO_PHONE

const client = new twilio(accountSid, authToken)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/sms', (req, res) => {
  console.log(`sending message from ${twilioPhone} to ${alertPhone}`)

  client.messages.create({
    from: twilioPhone,
    to: alertPhone,
    body: 'this is a test'
  })
  .then((message) => {
    console.log(message.sid)
    res.writeHead(200)
    res.end(message.sid)
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
