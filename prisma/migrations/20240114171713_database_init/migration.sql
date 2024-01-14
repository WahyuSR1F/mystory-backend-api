-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Story` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `author` VARCHAR(30) NOT NULL,
    `synopsis` TEXT NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `cover` VARCHAR(191) NULL,
    `tags` VARCHAR(191) NOT NULL,
    `status` ENUM('Publish', 'Draft') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Story` ADD CONSTRAINT `Story_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
