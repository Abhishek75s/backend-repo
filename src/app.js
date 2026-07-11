import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    return res.json("good")
})

app.listen(PORT, () => {
    console.log(`app running at PORT: ${PORT}`)
})

export default app;