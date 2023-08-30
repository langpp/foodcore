-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2023 at 07:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodcore`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `kode` varchar(100) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `kode`, `keterangan`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Hitachi Astemo Bekasi Manufaturing', 'hab', '', 1, '2023-02-23 06:51:52', '2023-02-23 06:51:56'),
(2, 'United Tractor Patria Engineering', 'utp', '', 1, '2023-02-23 06:51:59', '2023-02-23 06:42:58'),
(3, 'Nissan Food Indonesia', 'nfi', '', 1, '2023-02-22 03:57:52', '2023-02-22 04:39:20'),
(5, 'Agung Jaya Bersama', 'AJB', '', 0, '2023-02-22 03:59:49', '2023-02-22 04:40:18'),
(7, 'Pratama Jaya Abadi 2', 'PJA2', '<p>isi keterangan 2</p>', 0, '2023-02-22 04:09:36', '2023-02-22 04:45:08'),
(8, 'Setia Jaya Sentosa', 'sjs', '', 0, '2023-05-11 01:45:00', '2023-05-11 14:00:51'),
(9, 'PT Berkah Sentosa', 'BS', '<p>Keterangan</p>', 1, '2023-05-25 12:24:14', '2023-05-25 12:24:14');

-- --------------------------------------------------------

--
-- Table structure for table `hari`
--

CREATE TABLE `hari` (
  `id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_menu`
--

CREATE TABLE `jadwal_menu` (
  `id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `paket_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `waktu` varchar(255) DEFAULT 'Siang',
  `sehat` varchar(255) DEFAULT 'Menu Biasa',
  `total` decimal(20,2) DEFAULT 0.00,
  `qty` int(11) DEFAULT 0,
  `qty_perubahan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `jadwal_menu`
--

INSERT INTO `jadwal_menu` (`id`, `company_id`, `paket_id`, `date`, `status`, `createdAt`, `updatedAt`, `waktu`, `sehat`, `total`, `qty`, `qty_perubahan`) VALUES
(69, 1, 6, '2023-08-28 00:00:00', 3, '2023-08-28 15:05:40', '2023-08-28 19:47:29', 'Pagi', 'Menu Sehat', 45000.00, 3, 1),
(70, 1, 1, '2023-08-29 00:00:00', 1, '2023-08-28 15:11:47', '2023-08-28 15:11:47', 'Siang', 'Menu Biasa', 45000.00, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `lauk`
--

CREATE TABLE `lauk` (
  `id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `rate` decimal(20,2) DEFAULT 0.00,
  `image` text DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `total` decimal(20,2) DEFAULT 0.00,
  `subtotal` decimal(20,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `user_id`, `company_id`, `date`, `status`, `createdAt`, `updatedAt`, `total`, `subtotal`) VALUES
(105, 24, 1, '2023-08-28 00:00:00', 2, '2023-08-28 19:47:28', '2023-08-28 19:47:28', 29000.00, 44000.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `paket_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rate` decimal(20,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `order_id`, `paket_id`, `qty`, `status`, `createdAt`, `updatedAt`, `rate`) VALUES
(127, 105, 34, 2, 2, '2023-08-28 19:47:29', '2023-08-28 19:47:29', 12000.00),
(128, 105, 40, 1, 2, '2023-08-28 19:47:29', '2023-08-28 19:47:29', 20000.00);

-- --------------------------------------------------------

--
-- Table structure for table `paket`
--

CREATE TABLE `paket` (
  `id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `rate` decimal(20,2) DEFAULT 0.00,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT 'Reguler',
  `kategori` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `paket`
--

INSERT INTO `paket` (`id`, `name`, `rate`, `status`, `createdAt`, `updatedAt`, `keterangan`, `image1`, `image2`, `type`, `kategori`) VALUES
(1, 'Daging Lada Hitam', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Putih<br />2. Daging Lada Hitam<br />3. Sapo Tahu<br />4. Capcay<br />5. Kerupuk<br />6. Sambal<br />7. Buah</span></p>', 'daging-lada-hitam.jpg', 'daging-lada-hitam-2.jpg', 'Reguler', ''),
(2, 'Daging Serundeng', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p>1. Nasi Putih<br />2. Daging Serundeng<br />3. Kwe+aw Goreng<br />4. Tahu Cabe Hijau<br />5. Tumis Daun Singkong<br />6. Kerupuk<br />7. Sambal<br />8. Buah</p>', 'daging-serundeng.jpg', 'daging-serundeng-2.jpg', 'Reguler', ''),
(3, 'Ikan Fillet Pesmol', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Puih<br />2. Ikan Fillet Pesmol<br />3. Telur Ceplok Bumbu Kecap<br />4. Tahu Bacem<br />5. Sayur Lodeh<br />6. Kerupuk<br />7. Sambal<br />8. Buah</span> </p>', 'ikan-fillet-pesmol.jpg', 'ikan-fillet-pesmol-2.jpg', 'Reguler', ''),
(4, 'Sate Lilit', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Puih<br />2. Sate Lilit<br />3. Ayam Siur Cabe Merah<br />4. Tempe Tepung<br />5. Urap Sayuran<br />6. Kerupuk<br />7. Sambal<br />8. Buah</span></p>', 'sate-lilit.jpg', 'sate-lilit-2.jpg', 'Reguler', ''),
(5, 'Nasi Kebuli', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Kebuli<br />2. Daging Rempah<br />3. Kentang Pengan+n<br />4. Acar Rawis<br />5. Lalapan<br />6. Kerupuk<br />7. Sambal Matah<br />8. Buah</span></p>', 'nasi-kebuli.jpg', 'nasi-kebuli-2.jpg', 'Reguler', ''),
(6, 'Ayam Bakar', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Putih<br />2. Ayam Bakar<br />3. Tempe Kering Manis<br />4. Tahu Cabe Garam<br />5. Lalapan</span> <br /> <span class=\"fontstyle0\">6. Kerupuk<br />7. Sambal<br />8. Buah</span></p>', 'ayam-bakar.jpg', 'ayam-bakar-2.jpg', 'Reguler', ''),
(7, 'Rawon', 15000.00, 1, '2023-02-23 06:51:52', '2023-02-23 06:51:52', '<p>Berikut merupkan isi paket:</p>\r\n<p><span class=\"fontstyle0\">1. Nasi Putih<br />2. Paket Rawon<br />3. Daging + Telur Asin<br />4. Kecambah + Kemangi<br />5. Tahu Tepung<br />6. Kerupuk<br />7. Sambal<br />8. Buah</span></p>', 'rawon.jpg', 'rawon-2.jpg', 'Reguler', ''),
(33, 'Dendeng Balado', 15000.00, 1, '2023-05-25 02:52:02', '2023-08-30 15:26:22', '<p>Dendeng Balado</p>', '5164666589.jpeg', '2297795856.jpeg', 'Premium', 'Asian'),
(34, 'Gulai Cumi', 15000.00, 1, '2023-05-25 02:53:56', '2023-08-30 15:26:32', '<p>Gulai Cumi</p>', '4541692006.jpeg', '2111462756.jpeg', 'Premium', 'Western'),
(35, 'Gulai Otak', 15000.00, 1, '2023-05-25 02:54:28', '2023-05-25 02:54:28', '<p>Gulai Otak</p>', '8960584567.jpeg', '7554370703.jpeg', 'Premium', ''),
(36, 'Bebek Cabe Hijau', 12000.00, 1, '2023-05-25 02:55:04', '2023-08-30 15:26:11', '<p>Bebek Cabe Hijau</p>', '6696343516.jpeg', '6601672858.jpeg', 'Premium', 'Lokal'),
(37, 'Sayur Asam', 5000.00, 1, '2023-05-25 02:55:35', '2023-05-25 02:55:35', '<p>Sayur Asam</p>', '6604136312.jpeg', '9748700588.jpeg', 'Premium', ''),
(38, 'Telor Dadar', 8000.00, 1, '2023-05-25 02:56:03', '2023-05-25 02:56:03', '<p>Telor Dadar</p>', '7544166063.jpeg', '6553214292.jpeg', 'Premium', ''),
(39, 'Gulai Tunjang', 18000.00, 1, '2023-05-25 02:56:33', '2023-05-25 02:56:33', '<p>Gulai Tunjang</p>', '9443629216.jpeg', '4039257418.jpeg', 'Premium', ''),
(40, 'Gulai Kakap', 20000.00, 1, '2023-05-25 12:25:03', '2023-05-25 12:25:03', '<p>Gulai Kakap</p>', '7880651901.jpeg', '2592459379.jpeg', 'Premium', '');

-- --------------------------------------------------------

--
-- Table structure for table `paket_image`
--

CREATE TABLE `paket_image` (
  `id` int(11) NOT NULL,
  `paket_id` varchar(40) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `paket_image`
--

INSERT INTO `paket_image` (`id`, `paket_id`, `image`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '1', 'daging-lada-hitam.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(2, '1', 'daging-lada-hitam-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(3, '2', 'daging-serundeng.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(4, '2', 'daging-serundeng-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(5, '3', 'ikan-fillet-pesmol.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(6, '3', 'ikan-fillet-pesmol-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(7, '4', 'sate-lilit.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(8, '4', 'sate-lilit-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(9, '5', 'nasi-kebuli.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(10, '5', 'nasi-kebuli-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(11, '6', 'ayam-bakar.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(12, '6', 'ayam-bakar-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(13, '7', 'rawon.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15'),
(14, '7', 'rawon-2.jpg', 1, '2023-02-23 06:54:15', '2023-02-23 06:54:15');

-- --------------------------------------------------------

--
-- Table structure for table `paket_isi`
--

CREATE TABLE `paket_isi` (
  `id` int(11) NOT NULL,
  `paket_id` int(11) DEFAULT NULL,
  `lauk_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `paket_like`
--

CREATE TABLE `paket_like` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `paket_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paket_like`
--

INSERT INTO `paket_like` (`id`, `user_id`, `paket_id`, `createdAt`, `updatedAt`) VALUES
(3, 1, 1, '2023-08-30 16:26:35', '2023-08-30 16:26:35'),
(4, 1, 3, '2023-08-30 16:26:48', '2023-08-30 16:26:48'),
(6, 1, 4, '2023-08-30 16:26:58', '2023-08-30 16:26:58'),
(7, 1, 5, '2023-08-30 16:27:06', '2023-08-30 16:27:06'),
(8, 1, 6, '2023-08-30 16:27:32', '2023-08-30 16:27:32'),
(11, 24, 3, '2023-08-30 17:06:06', '2023-08-30 17:06:06');

-- --------------------------------------------------------

--
-- Table structure for table `saran`
--

CREATE TABLE `saran` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `saran` varchar(255) NOT NULL,
  `sumber` varchar(255) NOT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `saran`
--

INSERT INTO `saran` (`id`, `name`, `saran`, `sumber`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'indra bayu', 'Saran Pertama', '/', 1, '2023-02-23 13:52:38', '2023-02-23 13:52:38'),
(2, 'indra bayu', 'saran 2', '/', 1, '2023-02-23 13:54:24', '2023-02-23 13:54:24'),
(3, 'indra bayu', 'saran 3', '/', 1, '2023-02-23 13:59:21', '2023-02-23 13:59:21'),
(4, 'indra bayu', 'saran 4', '/', 1, '2023-02-23 14:00:35', '2023-02-23 14:00:35'),
(5, 'indra bayu', 'saran5', '/', 1, '2023-02-23 14:01:47', '2023-02-23 14:01:47'),
(6, 'indra bayu', 'saran 6', '/', 1, '2023-02-23 14:03:29', '2023-02-23 14:03:29'),
(7, 'indra bayu', 'saran 7', '/', 1, '2023-02-23 14:04:20', '2023-02-23 14:04:20'),
(8, 'indra bayu', 'saran 8', '/', 1, '2023-02-23 14:04:39', '2023-02-23 14:04:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(40) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `first_name` varchar(25) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `timezone_id` int(11) DEFAULT 272,
  `birthday` date DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `rate` decimal(20,2) DEFAULT 0.00,
  `time_unit_id` int(11) DEFAULT 2,
  `currency_id` int(11) DEFAULT 106,
  `bio` text DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userType` int(11) DEFAULT 5,
  `company_id` int(11) DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL,
  `address` text NOT NULL,
  `foto_profile` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone`, `uid`, `token`, `first_name`, `last_name`, `timezone_id`, `birthday`, `linkedin`, `rate`, `time_unit_id`, `currency_id`, `bio`, `tanggal`, `status`, `createdAt`, `updatedAt`, `userType`, `company_id`, `name`, `address`, `foto_profile`) VALUES
(1, 'ibe', '636f3456a39af67629b5847a1793fadd0d6d8a0b', NULL, '+62811904718', 'MraLi2k9zzWvoVsBI7DOiSD5Ykx2', 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2F0ZXJpbmctZGE1MmIiLCJhdWQiOiJjYXRlcmluZy1kYTUyYiIsImF1dGhfdGltZSI6MTY4MzI2MDE2NiwidXNlcl9pZCI6Ik1y', NULL, NULL, 272, NULL, NULL, 0.00, 2, 106, NULL, NULL, 2, '2023-02-23 06:54:15', '2023-05-05 04:16:15', 1, NULL, 'Admin', '', ''),
(3, NULL, '636f3456a39af67629b5847a1793fadd0d6d8a0b', NULL, '+62811934718', 'HS6edDhtegWiXWDIk43LYIivxLr2', 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YzFlN2Y4MDAzNGJiYzgxYjhmMmRiODM3OTIxZjRiZDI4N2YxZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2F0ZXJpbmctZGE1MmIiLCJhdWQiOiJjYXRlcmluZy1kYTUyYiIsImF1dGhfdGltZSI6MTY4MDkzOTk5NywidXNlcl9pZCI6IkhT', NULL, NULL, 272, NULL, NULL, 0.00, 2, 106, NULL, NULL, 2, '2023-02-23 06:51:52', '2023-04-08 07:46:43', 4, 1, 'Citra', '', ''),
(24, NULL, '636f3456a39af67629b5847a1793fadd0d6d8a0b', 'randy123@gmail.com', '+6281338383840', NULL, NULL, NULL, NULL, 272, NULL, NULL, 0.00, 2, 106, NULL, NULL, 2, '2023-02-23 06:51:52', '2023-08-28 18:36:42', 7, 1, 'Randi1234', 'depok123', '24.png'),
(26, NULL, '636f3456a39af67629b5847a1793fadd0d6d8a0b', NULL, '+6282113686483', 'vpipriWXhZQqmOkE6z0rVXdwnJS2', 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2F0ZXJpbmctZGE1MmIiLCJhdWQiOiJjYXRlcmluZy1kYTUyYiIsImF1dGhfdGltZSI6MTY4Mzc3MDAzMiwidXNlcl9pZCI6InZw', NULL, NULL, 272, NULL, NULL, 0.00, 2, 106, NULL, NULL, 2, '2023-05-11 01:53:04', '2023-05-11 01:54:03', 7, 1, 'Budi', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `hari`
--
ALTER TABLE `hari`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `jadwal_menu`
--
ALTER TABLE `jadwal_menu`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `company_id` (`company_id`) USING BTREE,
  ADD KEY `paket_id` (`paket_id`) USING BTREE;

--
-- Indexes for table `lauk`
--
ALTER TABLE `lauk`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `order_id` (`order_id`) USING BTREE,
  ADD KEY `paket_id` (`paket_id`) USING BTREE;

--
-- Indexes for table `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `paket_image`
--
ALTER TABLE `paket_image`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `paket_isi`
--
ALTER TABLE `paket_isi`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `paket_like`
--
ALTER TABLE `paket_like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paket_id` (`paket_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `saran`
--
ALTER TABLE `saran`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `phone` (`phone`) USING BTREE,
  ADD UNIQUE KEY `phone_2` (`phone`) USING BTREE,
  ADD UNIQUE KEY `phone_3` (`phone`) USING BTREE,
  ADD UNIQUE KEY `phone_4` (`phone`) USING BTREE,
  ADD UNIQUE KEY `phone_5` (`phone`) USING BTREE,
  ADD UNIQUE KEY `phone_6` (`phone`) USING BTREE,
  ADD KEY `company_id` (`company_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `hari`
--
ALTER TABLE `hari`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jadwal_menu`
--
ALTER TABLE `jadwal_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `lauk`
--
ALTER TABLE `lauk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `paket`
--
ALTER TABLE `paket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `paket_image`
--
ALTER TABLE `paket_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `paket_isi`
--
ALTER TABLE `paket_isi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paket_like`
--
ALTER TABLE `paket_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `saran`
--
ALTER TABLE `saran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwal_menu`
--
ALTER TABLE `jadwal_menu`
  ADD CONSTRAINT `jadwal_menu_ibfk_879` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `jadwal_menu_ibfk_880` FOREIGN KEY (`paket_id`) REFERENCES `paket` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_5` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `order_item_ibfk_6` FOREIGN KEY (`paket_id`) REFERENCES `paket` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `paket_like`
--
ALTER TABLE `paket_like`
  ADD CONSTRAINT `paket_like_ibfk_1` FOREIGN KEY (`paket_id`) REFERENCES `paket` (`id`),
  ADD CONSTRAINT `paket_like_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
