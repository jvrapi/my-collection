-- DropForeignKey
ALTER TABLE `cards` DROP FOREIGN KEY `cards_collection_id_fkey`;

-- DropForeignKey
ALTER TABLE `collections` DROP FOREIGN KEY `collections_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_collection_id_fkey` FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collections` ADD CONSTRAINT `collections_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
