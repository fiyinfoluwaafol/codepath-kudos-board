const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const cors = require('cors')

const express = require('express')
const app = express()
app.use(express.json())
app.use(cors());



app.get('/boards', async (req, res) => {
    const boards = await prisma.board.findMany()
    res.status(200).json(boards)
});

app.get('/boards/:id', async (req, res) => {
    const {id} = req.params
    console.log(id);
    const board = await prisma.board.findUnique({
        where: { id: parseInt(id) }
    });
    res.status(200).json(board)
});

app.post('/boards', async (req, res) => {
    const {title, category, author} = req.body;
    const newBoard = await prisma.board.create({
        data: {
            title,
            category,
            author
        }
    });
    res.status(201).json(newBoard);
});

app.put('/boards/:id', async (req, res) => {
    const {id} = req.params;
    const {title, category, author} = req.body;
    const updatedBoard = await prisma.board.update({
        where: { id: parseInt(id) },
        data: {
            title,
            category,
            author
        }
    });
    res.status(200).json(updatedBoard);
});

app.delete('/boards/:id', async (req, res) => {
    const {id} = req.params;
    const deletedBoard = await prisma.board.delete({
        where: { id: parseInt(id) }
    });
    res.status(200).json(deletedBoard);
});

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
