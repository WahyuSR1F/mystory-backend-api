
const prisma = require('./conection')

// headler use of function logic in routes



const home = (req, res) => {
    res.send("Hello di server kami manusia munafik")
}

// get all display story

const getAllStory = async (req, res) => {
    try {
        const stories = await prisma.story.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        res.json(stories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching stories");
    }
}

// search fucntion

const searchStory = async (req, res) => {
    if (Object.keys(req.query).length > 0) {
        try {
            const { title, author } = req.query
            const stories = await prisma.story.findMany({
                where: {
                    OR: [
                        { title: { contains: title } },
                        { author: { contains: author } }
                    ]
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            res.send(stories)

        } catch (error) {
            console.error(error);
            res.status(500).send("Error fetching stories");
        }
    } else {
        const stories = await prisma.story.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        res.json(stories)
    }
}

// filter function
const filterStories = async (req, res) => {
    if (Object.keys(req.query).length > 0) {
        try {
            const { status, categoryId } = req.query
            const stories = await prisma.story.findMany({
                where: {
                    AND: [
                        { status: status },
                        { categoryId: categoryId }
                    ]
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            res.send(stories)

        } catch (error) {
            console.error(error);
            res.status(500).send("Error fetching stories");
        }
    } else {
        const stories = await prisma.story.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        res.json("masalalu")
    }
}

// export function
module.exports = { home, getAllStory, searchStory, filterStories }