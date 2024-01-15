-- CreateTable
CREATE TABLE `Capter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_capter` VARCHAR(191) NOT NULL,
    `story_capter` TEXT NOT NULL,
    `storyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Capter` ADD CONSTRAINT `Capter_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `Story`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
