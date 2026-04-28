-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Мар 30 2026 г., 09:03
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `szlk_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `registration_type` varchar(50) NOT NULL COMMENT 'Тип регистрации (client/supplier/partner)',
  `contact_person` varchar(100) NOT NULL COMMENT 'Контактное лицо',
  `phone` varchar(20) NOT NULL COMMENT 'Телефон',
  `email` varchar(100) NOT NULL COMMENT 'Email',
  `message` text DEFAULT NULL COMMENT 'Дополнительная информация',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Дата создания',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Статус: 0-новое, 1-просмотрено, 2-обработано'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Таблица заявок от клиентов';

--
-- Дамп данных таблицы `requests`
--

INSERT INTO `requests` (`id`, `registration_type`, `contact_person`, `phone`, `email`, `message`, `created_at`, `status`) VALUES
(1, 'client', 'gsdgsgsg', '+7 (975) 497-94-52', 'lizabolshakova200@gmail.com', 'erhfhsfhshf', '2026-03-24 11:24:00', 0),
(2, 'test', 'Тест Пользователь', '+7 (999) 123-45-67', 'test@test.ru', 'Тестовая заявка для проверки', '2026-03-24 11:32:06', 0),
(3, 'test', 'Тест Пользователь', '+7 (999) 123-45-67', 'test@test.ru', 'Тестовая заявка для проверки', '2026-03-30 07:01:52', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_phone` (`phone`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_status` (`status`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
