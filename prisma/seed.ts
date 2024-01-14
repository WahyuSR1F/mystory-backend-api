
import { categorys } from './seed/category-seed';
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    for (let category of categorys) {
        await prisma.category.create({
            data: category
        })
    }

}

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})
