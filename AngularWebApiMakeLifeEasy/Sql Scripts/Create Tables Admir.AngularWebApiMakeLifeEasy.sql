USE [Admir.AngularWebApiMakeLifeEasy]
GO
/****** Object:  Table [dbo].[Bands]    Script Date: 04/06/2015 14:39:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bands](
	[Id] [int] NOT NULL,
	[Description] [nvarchar](64) NULL,
	[Price] [decimal](14, 2) NULL,
 CONSTRAINT [PK_Bands] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Customers]    Script Date: 04/06/2015 14:39:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[CustomerId] [nvarchar](128) NOT NULL,
	[CompanyName] [nvarchar](64) NULL,
	[ContactName] [nvarchar](64) NOT NULL,
	[ContactTitle] [nvarchar](30) NOT NULL,
	[Address] [nvarchar](64) NOT NULL,
	[City] [nvarchar](64) NOT NULL,
	[Region] [nvarchar](64) NOT NULL,
	[PostalCode] [nvarchar](64) NOT NULL,
	[Country] [nvarchar](64) NOT NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Suppliers]    Script Date: 04/06/2015 14:39:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suppliers](
	[SupplierId] [int] NOT NULL,
	[CompanyName] [nvarchar](40) NULL,
	[ContactName] [nvarchar](30) NULL,
	[ContactTitle] [nvarchar](30) NULL,
	[Address01] [nvarchar](60) NULL,
	[Address02] [nvarchar](60) NULL,
	[Address03] [nvarchar](60) NULL,
	[City] [nvarchar](15) NULL,
	[Region] [nvarchar](15) NULL,
	[PostalCode] [nvarchar](10) NULL,
	[Country] [nvarchar](15) NULL,
 CONSTRAINT [PK_Suppliers] PRIMARY KEY CLUSTERED 
(
	[SupplierId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
INSERT [dbo].[Bands] ([Id], [Description], [Price]) VALUES (10, N'Band 10 : £19.99 GBP - monthly', CAST(19.99 AS Decimal(14, 2)))
GO
INSERT [dbo].[Bands] ([Id], [Description], [Price]) VALUES (20, N'Band 20 : £29.99 GBP - monthly', CAST(29.99 AS Decimal(14, 2)))
GO
INSERT [dbo].[Bands] ([Id], [Description], [Price]) VALUES (30, N'Band 30 : £39.99 GBP - monthly', CAST(39.99 AS Decimal(14, 2)))
GO
INSERT [dbo].[Customers] ([CustomerId], [CompanyName], [ContactName], [ContactTitle], [Address], [City], [Region], [PostalCode], [Country]) VALUES (N'452989e5-c724-4ffa-8cfa-7cb3d260dda7', N'Microsfot', N'Gill Bates', N'---', N'---', N'---', N'---', N'---', N'---')
GO
INSERT [dbo].[Customers] ([CustomerId], [CompanyName], [ContactName], [ContactTitle], [Address], [City], [Region], [PostalCode], [Country]) VALUES (N'5e22f760-a7a1-4379-9090-7bdf42bed941', N'Harrods', N'James Kensington', N'---', N'---', N'---', N'---', N'---', N'---')
GO
INSERT [dbo].[Customers] ([CustomerId], [CompanyName], [ContactName], [ContactTitle], [Address], [City], [Region], [PostalCode], [Country]) VALUES (N'5e22f760-a7a1-4379-9090-7bdf42bed942', N'Pepsi', N'Indira Buffet', N'-', N'-', N'-', N'-', N'-', N'-')
GO
INSERT [dbo].[Customers] ([CustomerId], [CompanyName], [ContactName], [ContactTitle], [Address], [City], [Region], [PostalCode], [Country]) VALUES (N'5e22f760-a7a1-4379-9090-7bdf42bed94f', N'Admir Digital', N'Kelvin', N'---', N'---', N'---', N'---', N'---', N'---')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (1, N'Admir Digital', N'Kelvin', N'Director', N'', N'', N'', N'', N'', N'', N'UK')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (2, N'New Orleans Cajun Delights', N'James Bacon', N'Order Administrator', N'P.O. Box 78934', NULL, NULL, N'New Orleans', N'LA', N'70117', N'USA')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (3, N'Grandma Kelly''s Homestead', N'Ed Watford', N'Sales Representative', N'707 Oxford Rd.', NULL, NULL, N'Ann Arbor', N'MI', N'48104', N'USA')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (4, N'Tokyo Traders', N'Jim Luton', N'Marketing Manager', N'9-8 Sekimai
Musashino-shi', N'', N'', N'Tokyo', N'', N'100', N'Japan')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (5, N'Cooperativa de Quesos ''Las Cabras''', N'Bill Bailey', N'Export Administrator', N'Calle del Rosal 4', NULL, NULL, N'Oviedo', N'Asturias', N'33007', N'Spain')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (6, N'Mayumi''s', N'Sam', N'Marketing Representative', N'92 Setsuko
Chuo-ku', NULL, NULL, N'Osaka', NULL, N'545', N'Japan')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (7, N'Pavlova, Ltd.', N'Edwin', N'Marketing Manager', N'74 Rose St.
Moonie Ponds', NULL, NULL, N'Melbourne', N'Victoria', N'3058', N'Australia')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (8, N'Specialty Biscuits, Ltd.', N'Ramone', N'Sales Representative', N'29 King''s Way', NULL, NULL, N'Manchester', NULL, N'M14 GSD', N'UK')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (9, N'PB Knäckebröd ABC', N'June', N'Sales Agent', N'Kaloadagatan 13', N'', N'', N'Göteborg', N'', N'S-345 67', N'Sweden')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (10, N'Refrescos Americanas LTDA', N'Elita Overseas', N'Marketing Manager', N'Av. das Americanas 12.890', NULL, NULL, N'São Paulo', NULL, N'5442', N'Brazil')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (11, N'Heli Süßwaren GmbH & Co. KG', N'Grace Subs', N'Sales Manager', N'Tiergartenstraße 5', NULL, NULL, N'Berlin', NULL, N'10785', N'Germany')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (12, N'Plusspar Lebensmittelgroßmärkte AG', N'Cambell Drayfuss', N'International Marketing Mgr.', N'Bogenallee 51', NULL, NULL, N'Frankfurt', NULL, N'60439', N'Germany')
GO
INSERT [dbo].[Suppliers] ([SupplierId], [CompanyName], [ContactName], [ContactTitle], [Address01], [Address02], [Address03], [City], [Region], [PostalCode], [Country]) VALUES (13, N'Nord-Ost-Fisch Handelsgesellschaft mbH', N'Lotto Hayden', N'Coordinator Foreign Markets', N'Frahmredder 112a', NULL, NULL, N'Cuxhaven', NULL, N'27478', N'Germany')
GO
