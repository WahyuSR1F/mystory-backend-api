
import { categorys } from './seed/category-seed';
import { storys } from './seed/story-seed';
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// function to create seed
async function main() {
    for (let category of categorys) {
        await prisma.category.create({
            data: category
        })
    }

    for (let story of storys) {
        await prisma.story.create({
            data: story
        })
    }

}

// lunch
main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})



