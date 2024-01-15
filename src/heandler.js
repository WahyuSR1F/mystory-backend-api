
const { errorMonitor } = require('events');
const prisma = require('./conection');
const response = require("./json-format/response");
const { type } = require('os');


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
        response(200, stories, 'success get all data story', res)
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching stories");
    }
}

// get list capter 
const listCapter = async (req, res) => {
    try {
        const storyId = req.query.id
        let id = parseInt(storyId)
        const capters = await prisma.capter.findMany({
            where: {
                storyId: id
            }
        })
        if (capters.length === 0) {
            return response(404, capters, "not found", res)
        }

        return response(200, capters, "get capter successfull", res)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
// get detail story 
const detailStory = async (req, res) => {
    try {
        const id = parseInt(req.query.id)

        const story = await prisma.story.findUnique({
            where: {
                id: id
            }
        });

        if (!story) {
            return response(404, story, "not found", res)
        }
        return response(200, story, "get detail story success", res)
    } catch (error) {
        console.error(error);
        return response(500, [], "Internal Serve Error", res)
    }
}

//get detail capter 
const detailCapter = async (req, res) => {
    try {
        const id = parseInt(req.query.id)
        const capter = await prisma.capter.findUnique({
            where: {
                id: id
            }
        });

        if (!capter) {
            return response(404, capter, "not found", res)
        }

        return response(200, capter, "get detail capture is succes", res)
    } catch (error) {
        console.error(error);
        return response(500, [], "Internal Server Error", res)
    }
}



// search function

const searchStory = async (req, res) => {
    if (Object.keys(req.query).length > 0) {
        try {
            const { title, author } = req.query;
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

            if (stories.length === 0) {
                return response(404, [], "Data not found", res); // Kembali dengan 404 jika tidak ada data
            }

            response(200, stories, "Success get search story", res);

        } catch (error) {
            console.error(error);
            return response(500, "", "Internal server error", res);
        }
    } else {
        const stories = await prisma.story.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        response(200, stories, "Success story but no have parameter", res);
    }
};

// filter function
const filterStories = async (req, res) => {
    if (Object.keys(req.query).length > 0) {
        try {
            const { status, categoryId } = req.query

            let id = parseInt(categoryId);
            // validated
            if (status === undefined || categoryId === undefined) {
                return response(400, [], "Not found: Both status and categoryId are required", res);
            }

            const stories = await prisma.story.findMany({
                where: {
                    AND: [
                        { status: status },
                        { categoryId: id }
                    ]
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            if (stories.length === 0) {
                return response(404, stories, "not found", res)
            }
            response(200, stories, "success get filter story", res)
        } catch (error) {
            console.error(error);
            return response(500, error, "internal server error", res)
        }
    } else {
        const stories = await prisma.story.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return response(200, stories, "success get filter story but no parameter filter", res)
    }
}
// add story function
const addStory = async (req, res) => {
    try {

        const { title, author, synopsis, category, cover, tags, status } = req.body

        const story = await prisma.story.create({
            data: {
                title,
                author,
                synopsis: synopsis,
                categoryId: category,
                cover,
                tags,
                status,
            }

        })
        response(201, story, "success add data", res)
    } catch (error) {
        // check error
        if (error.errors) {
            // handle validation errors
            const errors = Object.values(error.errors).map(
                (e) => e.message
            )
            return res.status(400).json({ errors })
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}

// add capter

const addCapter = async (req, res) => {
    try {
        const storyId = parseInt(req.query.id);
        const { title, storyCap } = req.body;
        const capter = await prisma.capter.create({
            data: {
                title_capter: title,
                story_capter: storyCap,
                storyId: storyId
            }

        })
        response(201, capter, "Succes add capter story", res)
    } catch (error) {
        // check error
        if (error.errors) {
            // handle validation errors
            const errors = Object.values(error.errors).map(
                (e) => e.message
            )
            return res.status(400).json({ errors })
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

//edit Story
const editStory = async (req, res) => {
    try {
        const id = parseInt(req.query.id);
        const { title, author, synopsis, category, cover, tags, status } = req.body;

        const updateStory = await prisma.story.update({
            where: {
                id: id
            },
            data: {
                title,
                author,
                synopsis,
                categoryId: category,
                cover,
                tags,
                status,
            }
        });
        return response('200', updateStory, "success upate story", res);


    } catch (error) {
        // check error
        if (error.errors) {
            // handle validation errors
            const errors = Object.values(error.errors).map(
                (e) => e.message
            )
            return response(400, [], "Bad request, {{ error }}", res)
        } else {
            console.error(error);
            return response(500, [], "Internal Sever Error", res)
        }
    }
}

//edit capter
const editCapter = async (req, res) => {
    try {
        const id = parseInt(req.query.id)
        const { title, storyCap } = req.body
        const updateCapter = await prisma.capter.update({
            where: {
                id: id
            },
            data: {
                title_capter: title,
                story_capter: storyCap

            }
        });
        if (!updateCapter) {
            return response(404, updateCapter, "not found", res)
        }

        return response(200, updateCapter, "Success edit capter", res)

    } catch (error) {
        // check error
        if (error.errors) {
            // handle validation errors
            const errors = Object.values(error.errors).map(
                (e) => e.message
            )
            return res.status(400).json({ errors })
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
//delete story
const deleteStory = async (req, res) => {
    try {
        const id = parseInt(req.query.id);
        const deleteStory = await prisma.$transaction([
            prisma.capter.deleteMany({
                where: {
                    storyId: id
                }
            }),
            prisma.story.delete({
                where: {
                    id: id
                }
            })
        ])
        if (!deleteStory) {
            return response(404, deleteStory, "not found", res)
        }

        return response(200, deleteStory, "Story dan Capter has delete success", res)
    } catch (error) {
        // check error
        if (error.errors) {
            // handle validation errors
            const errors = Object.values(error.errors).map(
                (e) => e.message
            )
            return response(400, [], "{{error}}", res)
        } else {
            console.error(error);
            return response(500, [], error, res)
        }
    }
}

//delete chapter
const deleteCapter = async (req, res) => {
    try {
        const id = parseInt(req.query.id)
        const deleteCapters = await prisma.capter.delete({
            where: {
                id: id
            }

        })
        if (!deleteStory) {
            return response(404, deleteStory, "not found", res)
        }

        return response(200, deleteCapters, "capter has delete success", res)
    } catch (error) {
        if (error.errors) {
            // handle validation errors
            const errors = Object.values(error.errors).map(
                (e) => e.message
            )
            return res.status(400).json({ errors })
        } else {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

// export function
module.exports = { home, getAllStory, searchStory, filterStories, addStory, addCapter, editStory, editCapter, deleteStory, deleteCapter, listCapter, detailStory, detailCapter }