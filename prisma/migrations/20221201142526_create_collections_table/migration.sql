/*
  Warnings:

  - The primary key for the `cards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `cards` table. All the data in the column will be lost.
  - Added the required column `collection_id` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cards` DROP FOREIGN KEY `cards_user_id_fkey`;

-- AlterTable
ALTER TABLE `cards` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `collection_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`scryfall_id`, `collection_id`);

-- CreateTable
CREATE TABLE `collections` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `is_shared` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `collections_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_collection_id_fkey` FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collections` ADD CONSTRAINT `collections_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
