-- Переключаемся на администратора для создания таблиц
USE master
go

-- Создаем базу данных Кафе
CREATE DATABASE Кафе
ON
	(NAME = 'Кафе',
	FILENAME = 'D:\sql\Новая папка\MSSQL12.SQLEXPRESS\MSSQL\DATA\3.mdf',
	SIZE = 5,
	MAXSIZE = 10,
	FILEGROWTH = 1)
LOG ON
	(NAME = 'Кафе_log',
	FILENAME = 'D:\sql\Новая папка\MSSQL12.SQLEXPRESS\MSSQL\DATA\3_log.ldf',
	SIZE = 1,
	MAXSIZE = 10,
	FILEGROWTH = 1);
go


-- Работаем в базе данных Кафе
USE Кафе
go

-- Таблица Заказ
create table Заказ(
	Официант int not null,
	[Номер столика] int not null,
	[Дата и время открытия счета] datetime not null,
	[Дата и время закрытия счета] datetime not null,
	[Id заказа] int not null identity(1,1)
)
go
-- Первичный ключ заказа
alter table Заказ
	add constraint ЗаказPK primary key([Id заказа])
go

-- Таблица Меню
create table Меню(
	Id int not null identity(1,1),
	[Название блюда] varchar(255) not null,
	Описание varchar(255) not null,
	Стоимость money not null check(Стоимость > 0),
	Масса float not null check(Масса > 0),
	Калорийность float not null check(Калорийность >= 0)
)
go
-- Первичный ключ меню
alter table Меню
	add constraint МенюPK primary key(Id)
go


-- Таблица Официанты
create table Официанты(
	Id int not null identity(1,1),
	ФИО varchar(255) not null,
	[Дата рождения] date not null,
	Паспорт varchar(255) not null check(
		Паспорт like '[0-9][0-9] [0-9][0-9] [0-9][0-9][0-9][0-9][0-9][0-9]'
	),
	[Номер телефона] varchar(255) not null check(
		[Номер телефона] like '+7[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
	),
	Стаж int not null check(Стаж >= 0)
)
go
-- Первичный ключ официанта
alter table Официанты
	add constraint ОфициантPK primary key(Id)
go

-- Таблица [Заказ позиций в меню]
create table [Заказ позиций в меню](
	[Позиция в меню] int not null,
	Заказ int not null,
	Количество int not null check(Количество > 0)
)
go
-- Первичный ключ заказа позиций в меню
alter table [Заказ позиций в меню]
	add constraint ЗаказПозицийВМенюPK primary key([Позиция в меню], Заказ)
go


-- Составляем связи между таблицами
alter table [Заказ позиций в меню]
	add constraint ИнформацияМенюFK foreign key([Позиция в меню]) references Меню(Id) ON DELETE CASCADE

alter table [Заказ позиций в меню]
	add constraint ИнформацияЗаказаFK foreign key(Заказ) references Заказ([Id заказа]) ON DELETE CASCADE

alter table Заказ
	add constraint ИнформацияОфициантаFK foreign key(Официант) references Официанты(Id) ON DELETE CASCADE