-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2020 at 10:20 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpus`
--

-- --------------------------------------------------------

--
-- Table structure for table `aggts`
--

CREATE TABLE `aggts` (
  `id_anggota` int(20) NOT NULL,
  `nama_anggota` varchar(200) NOT NULL,
  `kelas` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `aggts`
--

INSERT INTO `aggts` (`id_anggota`, `nama_anggota`, `kelas`) VALUES
(2, 'OK', 'Node 1'),
(3, 'TONI', 'Node 1');

-- --------------------------------------------------------

--
-- Table structure for table `bukus`
--

CREATE TABLE `bukus` (
  `id_buku` int(20) NOT NULL,
  `nama_buku` varchar(200) NOT NULL,
  `info_buku` varchar(200) NOT NULL,
  `status_buku` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bukus`
--

INSERT INTO `bukus` (`id_buku`, `nama_buku`, `info_buku`, `status_buku`) VALUES
(1, 'qwe', 'qwe', 0),
(2, 'asd qwe', 'qwe', 0);

-- --------------------------------------------------------

--
-- Table structure for table `peminjams`
--

CREATE TABLE `peminjams` (
  `id_peminjam` int(20) NOT NULL,
  `id_buku` int(2) NOT NULL,
  `id_petugas` int(2) NOT NULL,
  `id_anggota` int(2) NOT NULL,
  `waktu` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `kondisi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `peminjams`
--

INSERT INTO `peminjams` (`id_peminjam`, `id_buku`, `id_petugas`, `id_anggota`, `waktu`, `kondisi`) VALUES
(2, 1, 3, 3, '2020-03-24 08:49:11', 'Sudah Dikembalikan'),
(3, 1, 3, 3, '2020-03-24 08:51:58', 'Sudah Dikembalikan'),
(4, 2, 3, 3, '2020-03-24 08:53:56', 'Sudah Dikembalikan'),
(5, 1, 3, 3, '2020-03-24 08:53:38', 'Sudah Dikembalikan');

-- --------------------------------------------------------

--
-- Table structure for table `petugas`
--

CREATE TABLE `petugas` (
  `id_petugas` int(20) NOT NULL,
  `us` varchar(200) NOT NULL,
  `pw` varchar(200) NOT NULL,
  `nama_petugas` varchar(200) NOT NULL,
  `jabatan_petugas` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `petugas`
--

INSERT INTO `petugas` (`id_petugas`, `us`, `pw`, `nama_petugas`, `jabatan_petugas`) VALUES
(3, 'qwe', 'sha1$35159d96$1$36933bc94d1812f10120ac2e6bea2a2f39c16ba1', 'Toni', 'Master');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aggts`
--
ALTER TABLE `aggts`
  ADD PRIMARY KEY (`id_anggota`);

--
-- Indexes for table `bukus`
--
ALTER TABLE `bukus`
  ADD PRIMARY KEY (`id_buku`);

--
-- Indexes for table `peminjams`
--
ALTER TABLE `peminjams`
  ADD PRIMARY KEY (`id_peminjam`);

--
-- Indexes for table `petugas`
--
ALTER TABLE `petugas`
  ADD PRIMARY KEY (`id_petugas`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aggts`
--
ALTER TABLE `aggts`
  MODIFY `id_anggota` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bukus`
--
ALTER TABLE `bukus`
  MODIFY `id_buku` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `peminjams`
--
ALTER TABLE `peminjams`
  MODIFY `id_peminjam` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `petugas`
--
ALTER TABLE `petugas`
  MODIFY `id_petugas` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
