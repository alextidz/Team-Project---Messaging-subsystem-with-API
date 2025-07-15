-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2024 at 08:39 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `servertest`
--

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `chatID` int(11) NOT NULL,
  `userID1` int(11) NOT NULL,
  `userID2` int(11) NOT NULL,
  `lastSender` int(11) NOT NULL,
  `isOpened` tinyint(1) NOT NULL,
  `lastEvent` datetime NOT NULL,
  `colour` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`chatID`, `userID1`, `userID2`, `lastSender`, `isOpened`, `lastEvent`, `colour`) VALUES
(7, 1, 2, 1, 0, '2024-05-10 17:29:23', 1),
(9, 3, 1, 3, 1, '2024-05-10 11:02:55', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`chatID`),
  ADD KEY `userID1` (`userID1`),
  ADD KEY `userID2` (`userID2`),
  ADD KEY `lastSender` (`lastSender`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `chatID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`userID1`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`userID2`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `chats_ibfk_3` FOREIGN KEY (`lastSender`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
