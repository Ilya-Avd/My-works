-- ������������� �� �������������� ��� �������� ������
USE master
go

-- ������� ���� ������ ����
CREATE DATABASE ����
ON
	(NAME = '����',
	FILENAME = 'D:\sql\����� �����\MSSQL12.SQLEXPRESS\MSSQL\DATA\3.mdf',
	SIZE = 5,
	MAXSIZE = 10,
	FILEGROWTH = 1)
LOG ON
	(NAME = '����_log',
	FILENAME = 'D:\sql\����� �����\MSSQL12.SQLEXPRESS\MSSQL\DATA\3_log.ldf',
	SIZE = 1,
	MAXSIZE = 10,
	FILEGROWTH = 1);
go


-- �������� � ���� ������ ����
USE ����
go

-- ������� �����
create table �����(
	�������� int not null,
	[����� �������] int not null,
	[���� � ����� �������� �����] datetime not null,
	[���� � ����� �������� �����] datetime not null,
	[Id ������] int not null identity(1,1)
)
go
-- ��������� ���� ������
alter table �����
	add constraint �����PK primary key([Id ������])
go

-- ������� ����
create table ����(
	Id int not null identity(1,1),
	[�������� �����] varchar(255) not null,
	�������� varchar(255) not null,
	��������� money not null check(��������� > 0),
	����� float not null check(����� > 0),
	������������ float not null check(������������ >= 0)
)
go
-- ��������� ���� ����
alter table ����
	add constraint ����PK primary key(Id)
go


-- ������� ���������
create table ���������(
	Id int not null identity(1,1),
	��� varchar(255) not null,
	[���� ��������] date not null,
	������� varchar(255) not null check(
		������� like '[0-9][0-9] [0-9][0-9] [0-9][0-9][0-9][0-9][0-9][0-9]'
	),
	[����� ��������] varchar(255) not null check(
		[����� ��������] like '+7[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
	),
	���� int not null check(���� >= 0)
)
go
-- ��������� ���� ���������
alter table ���������
	add constraint ��������PK primary key(Id)
go

-- ������� [����� ������� � ����]
create table [����� ������� � ����](
	[������� � ����] int not null,
	����� int not null,
	���������� int not null check(���������� > 0)
)
go
-- ��������� ���� ������ ������� � ����
alter table [����� ������� � ����]
	add constraint �����������������PK primary key([������� � ����], �����)
go


-- ���������� ����� ����� ���������
alter table [����� ������� � ����]
	add constraint ��������������FK foreign key([������� � ����]) references ����(Id) ON DELETE CASCADE

alter table [����� ������� � ����]
	add constraint ����������������FK foreign key(�����) references �����([Id ������]) ON DELETE CASCADE

alter table �����
	add constraint �������������������FK foreign key(��������) references ���������(Id) ON DELETE CASCADE