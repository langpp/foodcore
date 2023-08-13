/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100419
 Source Host           : localhost:3306
 Source Schema         : foodcore

 Target Server Type    : MySQL
 Target Server Version : 100419
 File Encoding         : 65001

 Date: 05/08/2023 17:58:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `kode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES (1, 'Hitachi Astemo Bekasi Manufaturing', 'hab', '', 1, '2023-02-23 06:51:52', '2023-02-23 06:51:56');
INSERT INTO `company` VALUES (2, 'United Tractor Patria Engineering', 'utp', '', 1, '2023-02-23 06:51:59', '2023-02-23 06:42:58');
INSERT INTO `company` VALUES (3, 'Nissan Food Indonesia', 'nfi', '', 1, '2023-02-22 03:57:52', '2023-02-22 04:39:20');
INSERT INTO `company` VALUES (5, 'Agung Jaya Bersama', 'AJB', '', 0, '2023-02-22 03:59:49', '2023-02-22 04:40:18');
INSERT INTO `company` VALUES (7, 'Pratama Jaya Abadi 2', 'PJA2', '<p>isi keterangan 2</p>', 0, '2023-02-22 04:09:36', '2023-02-22 04:45:08');
INSERT INTO `company` VALUES (8, 'Setia Jaya Sentosa', 'sjs', '', 0, '2023-05-11 01:45:00', '2023-05-11 14:00:51');
INSERT INTO `company` VALUES (9, 'PT Berkah Sentosa', 'BS', '<p>Keterangan</p>', 1, '2023-05-25 12:24:14', '2023-05-25 12:24:14');

-- ----------------------------
-- Table structure for hari
-- ----------------------------
DROP TABLE IF EXISTS `hari`;
CREATE TABLE `hari`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hari
-- ----------------------------

-- ----------------------------
-- Table structure for jadwal_menu
-- ----------------------------
DROP TABLE IF EXISTS `jadwal_menu`;
CREATE TABLE `jadwal_menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int NULL DEFAULT NULL,
  `paket_id` int NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `waktu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'Siang',
  `sehat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'Menu Biasa',
  `total` decimal(20, 2) NULL DEFAULT 0.00,
  `qty` int NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `company_id`(`company_id`) USING BTREE,
  INDEX `paket_id`(`paket_id`) USING BTREE,
  CONSTRAINT `jadwal_menu_ibfk_879` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `jadwal_menu_ibfk_880` FOREIGN KEY (`paket_id`) REFERENCES `paket` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jadwal_menu
-- ----------------------------
INSERT INTO `jadwal_menu` VALUES (58, 1, 6, '2023-05-15 00:00:00', 2, '2023-05-11 01:28:15', '2023-05-11 01:32:06', 'Pagi', 'Menu Biasa', 45000.00, 3);
INSERT INTO `jadwal_menu` VALUES (59, 1, 1, '2023-05-16 00:00:00', 2, '2023-05-11 01:28:31', '2023-05-11 14:01:32', 'Pagi', 'Menu Biasa', 45000.00, 3);
INSERT INTO `jadwal_menu` VALUES (60, 1, 2, '2023-05-17 00:00:00', 2, '2023-05-11 01:28:44', '2023-05-11 01:32:10', 'Pagi', 'Menu Biasa', 45000.00, 3);
INSERT INTO `jadwal_menu` VALUES (61, 1, 6, '2023-05-29 00:00:00', 4, '2023-05-25 02:57:34', '2023-05-25 12:27:22', 'Pagi', 'Menu Biasa', 45000.00, 3);
INSERT INTO `jadwal_menu` VALUES (62, 1, 1, '2023-05-30 00:00:00', 1, '2023-05-25 02:57:41', '2023-05-25 02:57:41', 'Pagi', 'Menu Biasa', 45000.00, 3);
INSERT INTO `jadwal_menu` VALUES (63, 1, 2, '2023-05-31 00:00:00', 1, '2023-05-25 02:57:50', '2023-05-25 02:57:50', 'Pagi', 'Menu Biasa', 45000.00, 3);
INSERT INTO `jadwal_menu` VALUES (64, 1, 3, '2023-06-01 00:00:00', 1, '2023-05-25 12:26:06', '2023-05-25 12:26:06', 'Pagi', 'Menu Biasa', 45000.00, 3);
INSERT INTO `jadwal_menu` VALUES (65, 1, 6, '2023-08-14 00:00:00', 1, '2023-08-03 02:07:31', '2023-08-03 02:07:31', 'Pagi', 'Menu Biasa', 45000.00, 3);
INSERT INTO `jadwal_menu` VALUES (66, 1, 1, '2023-08-14 00:00:00', 1, '2023-08-03 02:09:57', '2023-08-03 02:09:57', 'Siang', 'Menu Sehat', 45000.00, 3);
INSERT INTO `jadwal_menu` VALUES (67, 1, 2, '2023-08-15 00:00:00', 1, '2023-08-03 02:10:15', '2023-08-03 02:10:15', 'Pagi', 'Menu Biasa', 45000.00, 3);
INSERT INTO `jadwal_menu` VALUES (68, 1, 5, '2023-08-16 00:00:00', 4, '2023-08-05 10:28:22', '2023-08-05 10:40:02', 'Siang', 'Menu Biasa', 45000.00, 3);

-- ----------------------------
-- Table structure for lauk
-- ----------------------------
DROP TABLE IF EXISTS `lauk`;
CREATE TABLE `lauk`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `rate` decimal(20, 2) NULL DEFAULT 0.00,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lauk
-- ----------------------------

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `company_id` int NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `total` decimal(20, 2) NULL DEFAULT 0.00,
  `subtotal` decimal(20, 2) NULL DEFAULT 0.00,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 97 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (64, 3, 1, '2023-05-15 00:00:00', 1, '2023-05-11 01:28:15', '2023-05-11 01:28:15', 0.00, 15000.00);
INSERT INTO `order` VALUES (65, 5, 1, '2023-05-15 00:00:00', 1, '2023-05-11 01:28:15', '2023-05-11 01:28:15', 0.00, 15000.00);
INSERT INTO `order` VALUES (66, 24, 1, '2023-05-15 00:00:00', 2, '2023-05-11 01:28:15', '2023-05-11 01:35:16', 138000.00, 153000.00);
INSERT INTO `order` VALUES (67, 3, 1, '2023-05-16 00:00:00', 1, '2023-05-11 01:28:31', '2023-05-11 01:28:31', 0.00, 15000.00);
INSERT INTO `order` VALUES (68, 5, 1, '2023-05-16 00:00:00', 1, '2023-05-11 01:28:31', '2023-05-11 01:28:31', 0.00, 15000.00);
INSERT INTO `order` VALUES (69, 24, 1, '2023-05-16 00:00:00', 1, '2023-05-11 01:28:31', '2023-05-11 01:28:31', 0.00, 15000.00);
INSERT INTO `order` VALUES (70, 3, 1, '2023-05-17 00:00:00', 1, '2023-05-11 01:28:44', '2023-05-11 01:28:44', 0.00, 15000.00);
INSERT INTO `order` VALUES (71, 5, 1, '2023-05-17 00:00:00', 1, '2023-05-11 01:28:44', '2023-05-11 01:28:44', 0.00, 15000.00);
INSERT INTO `order` VALUES (72, 24, 1, '2023-05-17 00:00:00', 1, '2023-05-11 01:28:44', '2023-05-11 01:28:44', 0.00, 15000.00);
INSERT INTO `order` VALUES (73, 3, 1, '2023-05-29 00:00:00', 1, '2023-05-25 02:57:34', '2023-05-25 02:57:34', 0.00, 15000.00);
INSERT INTO `order` VALUES (74, 24, 1, '2023-05-29 00:00:00', 2, '2023-05-25 02:57:34', '2023-05-25 12:29:09', 27000.00, 42000.00);
INSERT INTO `order` VALUES (75, 26, 1, '2023-05-29 00:00:00', 1, '2023-05-25 02:57:34', '2023-05-25 02:57:34', 0.00, 15000.00);
INSERT INTO `order` VALUES (76, 3, 1, '2023-05-30 00:00:00', 1, '2023-05-25 02:57:41', '2023-05-25 02:57:41', 0.00, 15000.00);
INSERT INTO `order` VALUES (77, 24, 1, '2023-05-30 00:00:00', 1, '2023-05-25 02:57:41', '2023-05-25 02:57:41', 0.00, 15000.00);
INSERT INTO `order` VALUES (78, 26, 1, '2023-05-30 00:00:00', 1, '2023-05-25 02:57:41', '2023-05-25 02:57:41', 0.00, 15000.00);
INSERT INTO `order` VALUES (79, 3, 1, '2023-05-31 00:00:00', 1, '2023-05-25 02:57:50', '2023-05-25 02:57:50', 0.00, 15000.00);
INSERT INTO `order` VALUES (80, 24, 1, '2023-05-31 00:00:00', 1, '2023-05-25 02:57:50', '2023-05-25 02:57:50', 0.00, 15000.00);
INSERT INTO `order` VALUES (81, 26, 1, '2023-05-31 00:00:00', 1, '2023-05-25 02:57:50', '2023-05-25 02:57:50', 0.00, 15000.00);
INSERT INTO `order` VALUES (82, 3, 1, '2023-06-01 00:00:00', 1, '2023-05-25 12:26:06', '2023-05-25 12:26:06', 0.00, 15000.00);
INSERT INTO `order` VALUES (83, 24, 1, '2023-06-01 00:00:00', 1, '2023-05-25 12:26:06', '2023-05-25 12:26:06', 0.00, 15000.00);
INSERT INTO `order` VALUES (84, 26, 1, '2023-06-01 00:00:00', 1, '2023-05-25 12:26:06', '2023-05-25 12:26:06', 0.00, 15000.00);
INSERT INTO `order` VALUES (85, 3, 1, '2023-08-14 00:00:00', 1, '2023-08-03 02:07:31', '2023-08-03 02:07:31', 0.00, 15000.00);
INSERT INTO `order` VALUES (86, 24, 1, '2023-08-14 00:00:00', 1, '2023-08-03 02:07:31', '2023-08-03 02:07:31', 0.00, 15000.00);
INSERT INTO `order` VALUES (87, 26, 1, '2023-08-14 00:00:00', 1, '2023-08-03 02:07:31', '2023-08-03 02:07:31', 0.00, 15000.00);
INSERT INTO `order` VALUES (88, 3, 1, '2023-08-14 00:00:00', 1, '2023-08-03 02:09:57', '2023-08-03 02:09:57', 0.00, 15000.00);
INSERT INTO `order` VALUES (89, 24, 1, '2023-08-14 00:00:00', 1, '2023-08-03 02:09:57', '2023-08-03 02:09:57', 0.00, 15000.00);
INSERT INTO `order` VALUES (90, 26, 1, '2023-08-14 00:00:00', 1, '2023-08-03 02:09:57', '2023-08-03 02:09:57', 0.00, 15000.00);
INSERT INTO `order` VALUES (91, 3, 1, '2023-08-15 00:00:00', 1, '2023-08-03 02:10:15', '2023-08-03 02:10:15', 0.00, 15000.00);
INSERT INTO `order` VALUES (92, 24, 1, '2023-08-15 00:00:00', 2, '2023-08-03 02:10:15', '2023-08-05 10:35:09', 7000.00, 22000.00);
INSERT INTO `order` VALUES (93, 26, 1, '2023-08-15 00:00:00', 1, '2023-08-03 02:10:15', '2023-08-03 02:10:15', 0.00, 15000.00);
INSERT INTO `order` VALUES (94, 3, 1, '2023-08-16 00:00:00', 1, '2023-08-05 10:28:22', '2023-08-05 10:28:22', 0.00, 15000.00);
INSERT INTO `order` VALUES (95, 24, 1, '2023-08-16 00:00:00', 1, '2023-08-05 10:28:22', '2023-08-05 10:28:22', 0.00, 15000.00);
INSERT INTO `order` VALUES (96, 26, 1, '2023-08-16 00:00:00', 1, '2023-08-05 10:28:22', '2023-08-05 10:28:22', 0.00, 15000.00);

-- ----------------------------
-- Table structure for order_item
-- ----------------------------
DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NULL DEFAULT NULL,
  `paket_id` int NULL DEFAULT NULL,
  `qty` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rate` decimal(20, 2) NULL DEFAULT 0.00,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `order_id`(`order_id`) USING BTREE,
  INDEX `paket_id`(`paket_id`) USING BTREE,
  CONSTRAINT `order_item_ibfk_5` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `order_item_ibfk_6` FOREIGN KEY (`paket_id`) REFERENCES `paket` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 108 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_item
-- ----------------------------
INSERT INTO `order_item` VALUES (68, 64, 6, 1, 1, '2023-05-11 01:28:15', '2023-05-11 01:28:15', 15000.00);
INSERT INTO `order_item` VALUES (69, 65, 6, 1, 1, '2023-05-11 01:28:15', '2023-05-11 01:28:15', 15000.00);
INSERT INTO `order_item` VALUES (70, 66, 6, 1, 2, '2023-05-11 01:28:15', '2023-05-11 01:35:16', 15000.00);
INSERT INTO `order_item` VALUES (71, 67, 1, 1, 1, '2023-05-11 01:28:31', '2023-05-11 01:28:31', 15000.00);
INSERT INTO `order_item` VALUES (72, 68, 1, 1, 1, '2023-05-11 01:28:31', '2023-05-11 01:28:31', 15000.00);
INSERT INTO `order_item` VALUES (73, 69, 1, 1, 1, '2023-05-11 01:28:31', '2023-05-11 01:28:31', 15000.00);
INSERT INTO `order_item` VALUES (74, 70, 2, 1, 1, '2023-05-11 01:28:44', '2023-05-11 01:28:44', 15000.00);
INSERT INTO `order_item` VALUES (75, 71, 2, 1, 1, '2023-05-11 01:28:44', '2023-05-11 01:28:44', 15000.00);
INSERT INTO `order_item` VALUES (76, 72, 2, 1, 1, '2023-05-11 01:28:44', '2023-05-11 01:28:44', 15000.00);
INSERT INTO `order_item` VALUES (77, 66, NULL, 3, 2, '2023-05-11 01:35:16', '2023-05-11 01:35:16', 16000.00);
INSERT INTO `order_item` VALUES (78, 66, NULL, 5, 2, '2023-05-11 01:35:16', '2023-05-11 01:35:16', 18000.00);
INSERT INTO `order_item` VALUES (79, 73, 6, 1, 1, '2023-05-25 02:57:34', '2023-05-25 02:57:34', 15000.00);
INSERT INTO `order_item` VALUES (80, 74, 6, 0, 2, '2023-05-25 02:57:34', '2023-05-25 12:29:09', 15000.00);
INSERT INTO `order_item` VALUES (81, 75, 6, 1, 1, '2023-05-25 02:57:34', '2023-05-25 02:57:34', 15000.00);
INSERT INTO `order_item` VALUES (82, 76, 1, 1, 1, '2023-05-25 02:57:41', '2023-05-25 02:57:41', 15000.00);
INSERT INTO `order_item` VALUES (83, 77, 1, 1, 1, '2023-05-25 02:57:41', '2023-05-25 02:57:41', 15000.00);
INSERT INTO `order_item` VALUES (84, 78, 1, 1, 1, '2023-05-25 02:57:41', '2023-05-25 02:57:41', 15000.00);
INSERT INTO `order_item` VALUES (85, 79, 2, 1, 1, '2023-05-25 02:57:50', '2023-05-25 02:57:50', 15000.00);
INSERT INTO `order_item` VALUES (86, 80, 2, 1, 1, '2023-05-25 02:57:50', '2023-05-25 02:57:50', 15000.00);
INSERT INTO `order_item` VALUES (87, 81, 2, 1, 1, '2023-05-25 02:57:50', '2023-05-25 02:57:50', 15000.00);
INSERT INTO `order_item` VALUES (88, 82, 3, 1, 1, '2023-05-25 12:26:06', '2023-05-25 12:26:06', 15000.00);
INSERT INTO `order_item` VALUES (89, 83, 3, 1, 1, '2023-05-25 12:26:06', '2023-05-25 12:26:06', 15000.00);
INSERT INTO `order_item` VALUES (90, 84, 3, 1, 1, '2023-05-25 12:26:06', '2023-05-25 12:26:06', 15000.00);
INSERT INTO `order_item` VALUES (91, 74, 33, 1, 2, '2023-05-25 12:29:09', '2023-05-25 12:29:09', 10000.00);
INSERT INTO `order_item` VALUES (92, 74, 34, 1, 2, '2023-05-25 12:29:09', '2023-05-25 12:29:09', 12000.00);
INSERT INTO `order_item` VALUES (93, 74, 40, 1, 2, '2023-05-25 12:29:09', '2023-05-25 12:29:09', 20000.00);
INSERT INTO `order_item` VALUES (94, 85, 6, 1, 1, '2023-08-03 02:07:31', '2023-08-03 02:07:31', 15000.00);
INSERT INTO `order_item` VALUES (95, 86, 6, 1, 1, '2023-08-03 02:07:31', '2023-08-03 02:07:31', 15000.00);
INSERT INTO `order_item` VALUES (96, 87, 6, 1, 1, '2023-08-03 02:07:31', '2023-08-03 02:07:31', 15000.00);
INSERT INTO `order_item` VALUES (97, 88, 1, 1, 1, '2023-08-03 02:09:57', '2023-08-03 02:09:57', 15000.00);
INSERT INTO `order_item` VALUES (98, 89, 1, 1, 1, '2023-08-03 02:09:57', '2023-08-03 02:09:57', 15000.00);
INSERT INTO `order_item` VALUES (99, 90, 1, 1, 1, '2023-08-03 02:09:57', '2023-08-03 02:09:57', 15000.00);
INSERT INTO `order_item` VALUES (100, 91, 2, 1, 1, '2023-08-03 02:10:15', '2023-08-03 02:10:15', 15000.00);
INSERT INTO `order_item` VALUES (101, 92, 2, 0, 2, '2023-08-03 02:10:15', '2023-08-05 10:35:09', 15000.00);
INSERT INTO `order_item` VALUES (102, 93, 2, 1, 1, '2023-08-03 02:10:15', '2023-08-03 02:10:15', 15000.00);
INSERT INTO `order_item` VALUES (103, 94, 5, 1, 1, '2023-08-05 10:28:22', '2023-08-05 10:28:22', 15000.00);
INSERT INTO `order_item` VALUES (104, 95, 5, 1, 1, '2023-08-05 10:28:22', '2023-08-05 10:28:22', 15000.00);
INSERT INTO `order_item` VALUES (105, 96, 5, 1, 1, '2023-08-05 10:28:22', '2023-08-05 10:28:22', 15000.00);
INSERT INTO `order_item` VALUES (106, 92, 36, 1, 2, '2023-08-05 10:35:09', '2023-08-05 10:35:09', 12000.00);
INSERT INTO `order_item` VALUES (107, 92, 33, 1, 2, '2023-08-05 10:35:09', '2023-08-05 10:35:09', 10000.00);

-- ----------------------------
-- Table structure for paket
-- ----------------------------
DROP TABLE IF EXISTS `paket`;
CREATE TABLE `paket`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `rate` decimal(20, 2) NULL DEFAULT 0.00,
  `status` int NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `image1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `image2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'Reguler',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of paket
-- ----------------------------
INSERT INTO `paket` VALUES (1, 'Daging Lada Hitam', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Putih<br />2. Daging Lada Hitam<br />3. Sapo Tahu<br />4. Capcay<br />5. Kerupuk<br />6. Sambal<br />7. Buah</span></p>', 'daging-lada-hitam.jpg', 'daging-lada-hitam-2.jpg', 'Reguler');
INSERT INTO `paket` VALUES (2, 'Daging Serundeng', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p>1. Nasi Putih<br />2. Daging Serundeng<br />3. Kwe+aw Goreng<br />4. Tahu Cabe Hijau<br />5. Tumis Daun Singkong<br />6. Kerupuk<br />7. Sambal<br />8. Buah</p>', 'daging-serundeng.jpg', 'daging-serundeng-2.jpg', 'Reguler');
INSERT INTO `paket` VALUES (3, 'Ikan Fillet Pesmol', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Puih<br />2. Ikan Fillet Pesmol<br />3. Telur Ceplok Bumbu Kecap<br />4. Tahu Bacem<br />5. Sayur Lodeh<br />6. Kerupuk<br />7. Sambal<br />8. Buah</span> </p>', 'ikan-fillet-pesmol.jpg', 'ikan-fillet-pesmol-2.jpg', 'Reguler');
INSERT INTO `paket` VALUES (4, 'Sate Lilit', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Puih<br />2. Sate Lilit<br />3. Ayam Siur Cabe Merah<br />4. Tempe Tepung<br />5. Urap Sayuran<br />6. Kerupuk<br />7. Sambal<br />8. Buah</span></p>', 'sate-lilit.jpg', 'sate-lilit-2.jpg', 'Reguler');
INSERT INTO `paket` VALUES (5, 'Nasi Kebuli', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Kebuli<br />2. Daging Rempah<br />3. Kentang Pengan+n<br />4. Acar Rawis<br />5. Lalapan<br />6. Kerupuk<br />7. Sambal Matah<br />8. Buah</span></p>', 'nasi-kebuli.jpg', 'nasi-kebuli-2.jpg', 'Reguler');
INSERT INTO `paket` VALUES (6, 'Ayam Bakar', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Putih<br />2. Ayam Bakar<br />3. Tempe Kering Manis<br />4. Tahu Cabe Garam<br />5. Lalapan</span> <br /> <span class=\"fontstyle0\">6. Kerupuk<br />7. Sambal<br />8. Buah</span></p>', 'ayam-bakar.jpg', 'ayam-bakar-2.jpg', 'Reguler');
INSERT INTO `paket` VALUES (7, 'Rawon', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Putih<br />2. Paket Rawon<br />3. Daging + Telur Asin<br />4. Kecambah + Kemangi<br />5. Tahu Tepung<br />6. Kerupuk<br />7. Sambal<br />8. Buah</span></p>', 'rawon.jpg', 'rawon-2.jpg', 'Reguler');
INSERT INTO `paket` VALUES (33, 'Dendeng Balado', 10000.00, 1, '2023-05-25 02:52:02', '2023-05-25 02:52:02', '<p>Dendeng Balado</p>', '5164666589.jpeg', '2297795856.jpeg', 'Premium');
INSERT INTO `paket` VALUES (34, 'Gulai Cumi', 12000.00, 1, '2023-05-25 02:53:56', '2023-05-25 02:53:56', '<p>Gulai Cumi</p>', '4541692006.jpeg', '2111462756.jpeg', 'Premium');
INSERT INTO `paket` VALUES (35, 'Gulai Otak', 15000.00, 1, '2023-05-25 02:54:28', '2023-05-25 02:54:28', '<p>Gulai Otak</p>', '8960584567.jpeg', '7554370703.jpeg', 'Premium');
INSERT INTO `paket` VALUES (36, 'Bebek Cabe Hijau', 12000.00, 1, '2023-05-25 02:55:04', '2023-05-25 02:55:04', '<p>Bebek Cabe Hijau</p>', '6696343516.jpeg', '6601672858.jpeg', 'Premium');
INSERT INTO `paket` VALUES (37, 'Sayur Asam', 5000.00, 1, '2023-05-25 02:55:35', '2023-05-25 02:55:35', '<p>Sayur Asam</p>', '6604136312.jpeg', '9748700588.jpeg', 'Premium');
INSERT INTO `paket` VALUES (38, 'Telor Dadar', 8000.00, 1, '2023-05-25 02:56:03', '2023-05-25 02:56:03', '<p>Telor Dadar</p>', '7544166063.jpeg', '6553214292.jpeg', 'Premium');
INSERT INTO `paket` VALUES (39, 'Gulai Tunjang', 18000.00, 1, '2023-05-25 02:56:33', '2023-05-25 02:56:33', '<p>Gulai Tunjang</p>', '9443629216.jpeg', '4039257418.jpeg', 'Premium');
INSERT INTO `paket` VALUES (40, 'Gulai Kakap', 20000.00, 1, '2023-05-25 12:25:03', '2023-05-25 12:25:03', '<p>Gulai Kakap</p>', '7880651901.jpeg', '2592459379.jpeg', 'Premium');

-- ----------------------------
-- Table structure for paket_image
-- ----------------------------
DROP TABLE IF EXISTS `paket_image`;
CREATE TABLE `paket_image`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `paket_id` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of paket_image
-- ----------------------------
INSERT INTO `paket_image` VALUES (1, '1', 'daging-lada-hitam.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (2, '1', 'daging-lada-hitam-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (3, '2', 'daging-serundeng.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (4, '2', 'daging-serundeng-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (5, '3', 'ikan-fillet-pesmol.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (6, '3', 'ikan-fillet-pesmol-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (7, '4', 'sate-lilit.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (8, '4', 'sate-lilit-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (9, '5', 'nasi-kebuli.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (10, '5', 'nasi-kebuli-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (11, '6', 'ayam-bakar.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (12, '6', 'ayam-bakar-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (13, '7', 'rawon.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');
INSERT INTO `paket_image` VALUES (14, '7', 'rawon-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');

-- ----------------------------
-- Table structure for paket_isi
-- ----------------------------
DROP TABLE IF EXISTS `paket_isi`;
CREATE TABLE `paket_isi`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `paket_id` int NULL DEFAULT NULL,
  `lauk_id` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of paket_isi
-- ----------------------------

-- ----------------------------
-- Table structure for saran
-- ----------------------------
DROP TABLE IF EXISTS `saran`;
CREATE TABLE `saran`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `saran` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saran
-- ----------------------------
INSERT INTO `saran` VALUES (1, 'indra bayu', 'Saran Pertama', '/', 1, '2023-02-23 13:52:38', '2023-02-23 13:52:38');
INSERT INTO `saran` VALUES (2, 'indra bayu', 'saran 2', '/', 1, '2023-02-23 13:54:24', '2023-02-23 13:54:24');
INSERT INTO `saran` VALUES (3, 'indra bayu', 'saran 3', '/', 1, '2023-02-23 13:59:21', '2023-02-23 13:59:21');
INSERT INTO `saran` VALUES (4, 'indra bayu', 'saran 4', '/', 1, '2023-02-23 14:00:35', '2023-02-23 14:00:35');
INSERT INTO `saran` VALUES (5, 'indra bayu', 'saran5', '/', 1, '2023-02-23 14:01:47', '2023-02-23 14:01:47');
INSERT INTO `saran` VALUES (6, 'indra bayu', 'saran 6', '/', 1, '2023-02-23 14:03:29', '2023-02-23 14:03:29');
INSERT INTO `saran` VALUES (7, 'indra bayu', 'saran 7', '/', 1, '2023-02-23 14:04:20', '2023-02-23 14:04:20');
INSERT INTO `saran` VALUES (8, 'indra bayu', 'saran 8', '/', 1, '2023-02-23 14:04:39', '2023-02-23 14:04:39');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `first_name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `timezone_id` int NULL DEFAULT 272,
  `birthday` date NULL DEFAULT NULL,
  `linkedin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `rate` decimal(20, 2) NULL DEFAULT 0.00,
  `time_unit_id` int NULL DEFAULT 2,
  `currency_id` int NULL DEFAULT 106,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `tanggal` datetime NULL DEFAULT NULL,
  `status` int NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userType` int NULL DEFAULT 5,
  `company_id` int NULL DEFAULT NULL,
  `name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE,
  UNIQUE INDEX `phone_2`(`phone`) USING BTREE,
  UNIQUE INDEX `phone_3`(`phone`) USING BTREE,
  UNIQUE INDEX `phone_4`(`phone`) USING BTREE,
  UNIQUE INDEX `phone_5`(`phone`) USING BTREE,
  UNIQUE INDEX `phone_6`(`phone`) USING BTREE,
  INDEX `company_id`(`company_id`) USING BTREE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'ibe', '636f3456a39af67629b5847a1793fadd0d6d8a0b', NULL, '+62811904718', 'MraLi2k9zzWvoVsBI7DOiSD5Ykx2', 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2F0ZXJpbmctZGE1MmIiLCJhdWQiOiJjYXRlcmluZy1kYTUyYiIsImF1dGhfdGltZSI6MTY4MzI2MDE2NiwidXNlcl9pZCI6Ik1y', NULL, NULL, 272, NULL, NULL, 0.00, 2, 106, NULL, NULL, 2, '2023-02-23 06:54:15', '2023-05-05 04:16:15', 1, NULL, 'Admin');
INSERT INTO `users` VALUES (3, NULL, '636f3456a39af67629b5847a1793fadd0d6d8a0b', NULL, '+62811934718', 'HS6edDhtegWiXWDIk43LYIivxLr2', 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YzFlN2Y4MDAzNGJiYzgxYjhmMmRiODM3OTIxZjRiZDI4N2YxZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2F0ZXJpbmctZGE1MmIiLCJhdWQiOiJjYXRlcmluZy1kYTUyYiIsImF1dGhfdGltZSI6MTY4MDkzOTk5NywidXNlcl9pZCI6IkhT', NULL, NULL, 272, NULL, NULL, 0.00, 2, 106, NULL, NULL, 2, '2023-02-23 06:51:52', '2023-04-08 07:46:43', 4, 1, 'Citra');
INSERT INTO `users` VALUES (24, NULL, '636f3456a39af67629b5847a1793fadd0d6d8a0b', NULL, '+6281338383840', NULL, NULL, NULL, NULL, 272, NULL, NULL, 0.00, 2, 106, NULL, NULL, 2, '2023-02-23 06:51:52', '2023-05-11 02:13:33', 7, 1, 'Randi');
INSERT INTO `users` VALUES (26, NULL, '636f3456a39af67629b5847a1793fadd0d6d8a0b', NULL, '+6282113686483', 'vpipriWXhZQqmOkE6z0rVXdwnJS2', 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2F0ZXJpbmctZGE1MmIiLCJhdWQiOiJjYXRlcmluZy1kYTUyYiIsImF1dGhfdGltZSI6MTY4Mzc3MDAzMiwidXNlcl9pZCI6InZw', NULL, NULL, 272, NULL, NULL, 0.00, 2, 106, NULL, NULL, 2, '2023-05-11 01:53:04', '2023-05-11 01:54:03', 7, 1, 'Budi');

SET FOREIGN_KEY_CHECKS = 1;
