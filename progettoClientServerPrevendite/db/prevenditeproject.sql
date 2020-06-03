-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 03, 2020 alle 19:19
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prevenditeproject`
--
CREATE DATABASE IF NOT EXISTS `prevenditeproject` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `prevenditeproject`;

-- --------------------------------------------------------

--
-- Struttura della tabella `tabinvitati`
--

CREATE TABLE `tabinvitati` (
  `codInvitati` bigint(20) NOT NULL,
  `nominativo` varchar(255) NOT NULL,
  `dataDiNascita` varchar(10) NOT NULL,
  `codPr` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `tabinvitati`
--

INSERT INTO `tabinvitati` (`codInvitati`, `nominativo`, `dataDiNascita`, `codPr`) VALUES
(1, 'Violetta Sabbatini', '1999-05-06', 1),
(2, 'Carmine Cremonesi', '1998-12-23', 1),
(3, 'Quarto Udinese', '2000-11-12', 2),
(4, 'Alessandro Romani', '2002-01-18', 2),
(5, 'Geronima Piccio', '2001-08-25', 2),
(6, 'Quinto Milano', '2000-09-17', 3),
(7, 'Annibale Calabrese', '1998-06-11', 3),
(8, 'Lea Beneventi', '1997-12-01', 3),
(9, 'Giuseppe Cremonesi', '2001-02-02', 4),
(10, 'Tranquilla Sabbatini', '2003-03-19', 5),
(11, 'Matilde Rossi', '1998-02-10', 5),
(12, 'Mara Capon', '2003-01-17', 5),
(13, 'Gianni Pugliesi', '1998-10-06', 6),
(14, 'Anselmo Siciliani', '2002-05-29', 6),
(15, 'Remo Lettiere', '1997-07-12', 7);

-- --------------------------------------------------------

--
-- Struttura della tabella `tabpr`
--

CREATE TABLE `tabpr` (
  `codPR` int(255) NOT NULL,
  `nominativo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `codCapo` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `tabpr`
--

INSERT INTO `tabpr` (`codPR`, `nominativo`, `password`, `codCapo`) VALUES
(1, 'Mario Rossi', '5f4dcc3b5aa765d61d8327deb882cf99', 1),
(2, 'Luigi Neri', '5f4dcc3b5aa765d61d8327deb882cf99', 1),
(3, 'Roberto Marchisio', '5f4dcc3b5aa765d61d8327deb882cf99', 1),
(4, 'Armando Lanari', '5f4dcc3b5aa765d61d8327deb882cf99', 2),
(5, 'Luca Abete', '5f4dcc3b5aa765d61d8327deb882cf99', 2),
(6, 'Demis Marcellino', '5f4dcc3b5aa765d61d8327deb882cf99', 3),
(7, 'Mario Chopra', '5f4dcc3b5aa765d61d8327deb882cf99', 3);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `tabinvitati`
--
ALTER TABLE `tabinvitati`
  ADD PRIMARY KEY (`codInvitati`);

--
-- Indici per le tabelle `tabpr`
--
ALTER TABLE `tabpr`
  ADD PRIMARY KEY (`codPR`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `tabinvitati`
--
ALTER TABLE `tabinvitati`
  MODIFY `codInvitati` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT per la tabella `tabpr`
--
ALTER TABLE `tabpr`
  MODIFY `codPR` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
