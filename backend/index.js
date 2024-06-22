const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const cors = require('cors')

const express = require('express')
const app = express()
app.use(express.json())
app.use(cors());


// GET requests for /boards -> All boards
app.get('/boards', async (req, res) => {
    const boards = await prisma.board.findMany()
    res.status(200).json(boards)
});

// GET requests for /boards/:id -> Specific board
app.get('/boards/:id', async (req, res) => {
    const {id} = req.params
    const board = await prisma.board.findUnique({
        where: { id: parseInt(id) },
        include: {cards: true,}
    });
    res.status(200).json(board)
});

// POST requests for /boards -> Create a new board
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

// DELETE requests for /boards/:id -> Delete a particular board
app.delete('/boards/:id', async (req, res) => {
    const {id} = req.params;
    const deletedBoard = await prisma.board.delete({
        where: { id: parseInt(id) }
    });
    res.status(200).json(deletedBoard);
});

app.post('/boards/:id/cards', async (req, res) => {
    const { id } = req.params;
    const { title, description, author, imgUrl } = req.body;
    try {
        const newCard = await prisma.card.create({
            data: {
                title,
                description,
                imgUrl,
                author,
                board: {
                    connect: {
                        id: parseInt(id)
                    }
                }
            }
        });
        res.status(201).json(newCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/cards/:cardId', async (req, res) => {
    const { cardId } = req.params; // Get the card ID from the URL parameters
    try {
        const card = await prisma.card.delete({
            where: {
                id: parseInt(cardId), // Ensure the ID is an integer
            }
        });
        res.status(200).json({ message: 'Card deleted successfully', card });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            res.status(404).json({ message: 'Card not found' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

app.patch('/cards/:cardId/upvote', async (req, res) => {
    const { cardId } = req.params; // Get the card ID from the URL parameters
    try {
        const updatedCard = await prisma.card.update({
            where: {
                id: parseInt(cardId), // Ensure the ID is an integer
            },
            data: {
                upvotes: {
                    increment: 1 // Increment the upvote count by 1
                }
            }
        });
        res.status(200).json(updatedCard);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            res.status(404).json({ message: 'Card not found' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});



const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
