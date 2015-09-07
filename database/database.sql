USE [fmp]
GO
/****** Object:  Table [dbo].[security_screens]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[security_screens](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[screen_code] [varchar](10) NOT NULL,
	[text] [varchar](200) NULL,
	[url] [varchar](200) NULL,
	[icon] [varchar](50) NULL,
	[parent] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[screen_code] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[titles]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[titles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[description] [varchar](100) NULL,
	[payrate] [decimal](18, 4) NULL,
	[nigthdiff] [decimal](18, 2) NULL,
 CONSTRAINT [PK_titles] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[titles] ON
INSERT [dbo].[titles] ([id], [description], [payrate], [nigthdiff]) VALUES (1, N'handyman', CAST(25.0000 AS Decimal(18, 4)), CAST(26.00 AS Decimal(18, 2)))
INSERT [dbo].[titles] ([id], [description], [payrate], [nigthdiff]) VALUES (2, N'Building Engineer', CAST(29.4600 AS Decimal(18, 4)), NULL)
INSERT [dbo].[titles] ([id], [description], [payrate], [nigthdiff]) VALUES (3, N'Cleaner Full Rate', CAST(23.8480 AS Decimal(18, 4)), NULL)
INSERT [dbo].[titles] ([id], [description], [payrate], [nigthdiff]) VALUES (4, N'Cleaner Below Rate', CAST(17.8860 AS Decimal(18, 4)), NULL)
SET IDENTITY_INSERT [dbo].[titles] OFF
/****** Object:  Table [dbo].[sysdiagrams]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[sysdiagrams](
	[name] [nvarchar](128) NOT NULL,
	[principal_id] [int] NOT NULL,
	[diagram_id] [int] IDENTITY(1,1) NOT NULL,
	[version] [int] NULL,
	[definition] [varbinary](max) NULL,
 CONSTRAINT [PK_sysdiagrams] PRIMARY KEY CLUSTERED 
(
	[diagram_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[sys_parameters]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sys_parameters](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[last_payment_code_secuence] [int] NULL,
 CONSTRAINT [PK_sys_parameters] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[sys_parameters] ON
INSERT [dbo].[sys_parameters] ([id], [last_payment_code_secuence]) VALUES (1, 0)
SET IDENTITY_INSERT [dbo].[sys_parameters] OFF
/****** Object:  Table [dbo].[contract_permits]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[contract_permits](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[organization_name] [varchar](100) NULL,
	[telephone] [varchar](20) NULL,
	[mailing_address] [varchar](100) NULL,
	[city] [varchar](50) NULL,
	[state] [varchar](100) NULL,
	[zip_code] [varchar](20) NULL,
	[authorized_organization_name] [varchar](100) NULL,
	[permit_start_date] [datetime] NULL,
	[permit_end_date] [datetime] NULL,
	[number_registered] [varchar](50) NULL,
	[total_hours] [int] NULL,
	[registration_date] [datetime] NULL,
 CONSTRAINT [PK_contract_permits] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[contract_permits] ON
INSERT [dbo].[contract_permits] ([id], [organization_name], [telephone], [mailing_address], [city], [state], [zip_code], [authorized_organization_name], [permit_start_date], [permit_end_date], [number_registered], [total_hours], [registration_date]) VALUES (1, N'aaaaaaaaaaaa', N'bbbbbbbbb', N'ccccccccccc', N'dddddddddde', N'eeeeeeee', N'ffffffffff', N'gggggggggggg', CAST(0x0000A4F800000000 AS DateTime), CAST(0x0000A4F900000000 AS DateTime), N'DEGG-12323', 24, CAST(0x0000A4F900C4AF77 AS DateTime))
SET IDENTITY_INSERT [dbo].[contract_permits] OFF
/****** Object:  Table [dbo].[contract_permit_periods]    Script Date: 09/06/2015 22:42:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[contract_permit_periods](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[number_registered] [varchar](50) NULL,
	[week_days] [varchar](200) NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
	[start_time] [varchar](10) NULL,
	[end_time] [varchar](10) NULL,
	[hours] [int] NULL,
	[registration_date] [datetime] NULL,
 CONSTRAINT [PK_contract_permit_periods] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[contract_permit_periods] ON
INSERT [dbo].[contract_permit_periods] ([id], [number_registered], [week_days], [start_date], [end_date], [start_time], [end_time], [hours], [registration_date]) VALUES (1, N'DEGG-12323', N'Sunday,Monday,Tuesday', CAST(0x0000A4F600000000 AS DateTime), CAST(0x0000A4F900000000 AS DateTime), N'1:00 AM', N'6:00 AM', 20, CAST(0x0000A4F900C4AFA3 AS DateTime))
INSERT [dbo].[contract_permit_periods] ([id], [number_registered], [week_days], [start_date], [end_date], [start_time], [end_time], [hours], [registration_date]) VALUES (2, N'DEGG-12323', N'Sunday', CAST(0x0000A4F600000000 AS DateTime), CAST(0x0000A4F600000000 AS DateTime), N'5:00 AM', N'9:00 AM', 4, CAST(0x0000A4F900C4AFA3 AS DateTime))
SET IDENTITY_INSERT [dbo].[contract_permit_periods] OFF
/****** Object:  Table [dbo].[reimbursement]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[reimbursement](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[description] [varchar](100) NULL,
	[payrate] [decimal](18, 4) NULL,
 CONSTRAINT [PK_reimbursement] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[reimbursement] ON
INSERT [dbo].[reimbursement] ([id], [description], [payrate]) VALUES (1, N'Snow removal', CAST(25.0000 AS Decimal(18, 4)))
SET IDENTITY_INSERT [dbo].[reimbursement] OFF
/****** Object:  Table [dbo].[security_groups]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[security_groups](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[group_code] [varchar](10) NOT NULL,
	[description] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[group_code] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[staff]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[staff](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[employee_code] [varchar](100) NOT NULL,
	[name] [varchar](100) NULL,
	[middle_name] [varchar](100) NULL,
	[last_name] [varchar](100) NULL,
	[address] [varchar](200) NULL,
	[sex] [varchar](1) NULL,
	[birthday] [datetime] NULL,
	[email] [varchar](200) NULL,
	[title] [int] NULL,
	[hire_date] [datetime] NULL,
	[status] [varchar](1) NULL,
	[supervisor_code] [varchar](100) NULL,
 CONSTRAINT [PK_staff] PRIMARY KEY CLUSTERED 
(
	[employee_code] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[staff] ON
INSERT [dbo].[staff] ([id], [employee_code], [name], [middle_name], [last_name], [address], [sex], [birthday], [email], [title], [hire_date], [status], [supervisor_code]) VALUES (13, N'1853081', N'Gerardo', N'W.', N'Rodriguez', NULL, N'M', CAST(0x0000735200000000 AS DateTime), N'gerardowilfredo@outlook.com', 2, CAST(0x0000A34600000000 AS DateTime), NULL, NULL)
INSERT [dbo].[staff] ([id], [employee_code], [name], [middle_name], [last_name], [address], [sex], [birthday], [email], [title], [hire_date], [status], [supervisor_code]) VALUES (12, N'1860723', N'Emmanuel', N'', N'Alcantara', NULL, N'M', CAST(0x0000782D00000000 AS DateTime), NULL, 1, CAST(0x0000A39100000000 AS DateTime), NULL, NULL)
INSERT [dbo].[staff] ([id], [employee_code], [name], [middle_name], [last_name], [address], [sex], [birthday], [email], [title], [hire_date], [status], [supervisor_code]) VALUES (14, N'796918', N'Juan', NULL, N'Guzman', NULL, N'M', CAST(0x000064F900000000 AS DateTime), NULL, 3, CAST(0x0000A49900000000 AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[staff] OFF
/****** Object:  Table [dbo].[schools]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[schools](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code] [varchar](50) NOT NULL,
	[location] [varchar](200) NULL,
	[size] [decimal](18, 2) NULL,
	[employee_manager] [varchar](100) NULL,
	[supervisor] [varchar](100) NULL,
	[name] [varchar](100) NULL,
	[budget] [decimal](19, 4) NULL,
	[last_payment_code_secuence] [int] NULL,
 CONSTRAINT [PK_schools] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[schools] ON
INSERT [dbo].[schools] ([id], [code], [location], [size], [employee_manager], [supervisor], [name], [budget], [last_payment_code_secuence]) VALUES (1, N'250025122', N'direccion', CAST(25000.00 AS Decimal(18, 2)), NULL, NULL, N'Saint J School', NULL, 0)
INSERT [dbo].[schools] ([id], [code], [location], [size], [employee_manager], [supervisor], [name], [budget], [last_payment_code_secuence]) VALUES (7, N'9809809809', N'av.24 av 22', CAST(25000.00 AS Decimal(18, 2)), N'1853081', N'1853081', N'saint J School', NULL, 2)
INSERT [dbo].[schools] ([id], [code], [location], [size], [employee_manager], [supervisor], [name], [budget], [last_payment_code_secuence]) VALUES (8, N'M387', N'701 Forth Washington', NULL, N'1853081', N'1853081', N'Success Academy Washington Heights', NULL, NULL)
SET IDENTITY_INSERT [dbo].[schools] OFF
/****** Object:  Table [dbo].[phones]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[phones](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[employee_code] [varchar](100) NULL,
	[number] [decimal](18, 0) NULL,
	[phone_type] [varchar](100) NULL,
 CONSTRAINT [PK_phones] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[phones] ON
INSERT [dbo].[phones] ([id], [employee_code], [number], [phone_type]) VALUES (3, N'1853081', CAST(8808080880 AS Decimal(18, 0)), N'fa-android')
INSERT [dbo].[phones] ([id], [employee_code], [number], [phone_type]) VALUES (4, N'1853081', CAST(80808285454 AS Decimal(18, 0)), N'fa-whatsapp')
SET IDENTITY_INSERT [dbo].[phones] OFF
/****** Object:  Table [dbo].[payments_reimbursements]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[payments_reimbursements](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[reimbursement_id] [int] NULL,
	[payment_id] [int] NULL,
	[day] [varchar](50) NULL,
	[date] [datetime] NULL,
	[hours] [decimal](18, 0) NULL,
	[rate] [decimal](18, 4) NULL,
	[comment] [varchar](300) NULL,
	[reimbursement_type] [int] NULL,
	[employee_code] [varchar](100) NULL,
 CONSTRAINT [PK_payments_reimbursements] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[payments_reimbursements] ON
INSERT [dbo].[payments_reimbursements] ([id], [reimbursement_id], [payment_id], [day], [date], [hours], [rate], [comment], [reimbursement_type], [employee_code]) VALUES (1, 1, 1, N'Monday', CAST(0x0000A50C00000000 AS DateTime), CAST(9 AS Decimal(18, 0)), CAST(25.0000 AS Decimal(18, 4)), NULL, 1, N'796918')
SET IDENTITY_INSERT [dbo].[payments_reimbursements] OFF
/****** Object:  Table [dbo].[staff_by_schools]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[staff_by_schools](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[employee_code] [varchar](100) NULL,
	[school_code] [varchar](50) NULL,
 CONSTRAINT [PK_staff_by_schools] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[staff_by_schools] ON
INSERT [dbo].[staff_by_schools] ([id], [employee_code], [school_code]) VALUES (1, N'1860723', N'M387')
INSERT [dbo].[staff_by_schools] ([id], [employee_code], [school_code]) VALUES (2, N'1853081', N'M387')
INSERT [dbo].[staff_by_schools] ([id], [employee_code], [school_code]) VALUES (3, N'796918', N'M387')
INSERT [dbo].[staff_by_schools] ([id], [employee_code], [school_code]) VALUES (4, N'1860723', N'9809809809')
INSERT [dbo].[staff_by_schools] ([id], [employee_code], [school_code]) VALUES (5, N'1853081', N'9809809809')
INSERT [dbo].[staff_by_schools] ([id], [employee_code], [school_code]) VALUES (6, N'796918', N'9809809809')
SET IDENTITY_INSERT [dbo].[staff_by_schools] OFF
/****** Object:  Table [dbo].[users]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](100) NULL,
	[school_code] [varchar](50) NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON
INSERT [dbo].[users] ([id], [username], [password], [school_code]) VALUES (2, N'fmp', N'gdyb21LQTcIANtvYMT7QVQ==', N'9809809809')
INSERT [dbo].[users] ([id], [username], [password], [school_code]) VALUES (1, N'smancebo', N'gdyb21LQTcIANtvYMT7QVQ==', N'9809809809')
SET IDENTITY_INSERT [dbo].[users] OFF
/****** Object:  Table [dbo].[security_permits]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[security_permits](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NULL,
	[group] [varchar](10) NULL,
	[screen_code] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[payments]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[payments](
	[payment_id] [int] IDENTITY(1,1) NOT NULL,
	[startdate] [datetime] NULL,
	[enddate] [datetime] NULL,
	[username] [varchar](50) NULL,
	[applied] [bit] NULL,
	[payment_code] [varchar](100) NULL,
 CONSTRAINT [PK_payments] PRIMARY KEY CLUSTERED 
(
	[payment_id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[payments] ON
INSERT [dbo].[payments] ([payment_id], [startdate], [enddate], [username], [applied], [payment_code]) VALUES (1, CAST(0x0000A50C00000000 AS DateTime), CAST(0x0000A51200000000 AS DateTime), N'fmp', NULL, N'PRL0000000001')
SET IDENTITY_INSERT [dbo].[payments] OFF
/****** Object:  Table [dbo].[payments_details]    Script Date: 09/06/2015 22:42:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[payments_details](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[payment_id] [int] NULL,
	[employee_code] [varchar](100) NULL,
	[day] [varchar](50) NULL,
	[required_hours] [decimal](18, 0) NULL,
	[overtime] [decimal](18, 0) NULL,
	[comments] [varchar](200) NULL,
	[payrate] [decimal](18, 2) NULL,
	[date] [datetime] NULL,
 CONSTRAINT [PK_payments_details] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[payments_details] ON
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (1, 1, N'796918', N'Monday', CAST(8 AS Decimal(18, 0)), CAST(1 AS Decimal(18, 0)), NULL, CAST(23.84 AS Decimal(18, 2)), CAST(0x0000A50C00000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (2, 1, N'796918', N'Tuesday', CAST(8 AS Decimal(18, 0)), CAST(1 AS Decimal(18, 0)), NULL, CAST(23.84 AS Decimal(18, 2)), CAST(0x0000A50D00000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (3, 1, N'796918', N'Wednesday', CAST(8 AS Decimal(18, 0)), CAST(1 AS Decimal(18, 0)), NULL, CAST(23.84 AS Decimal(18, 2)), CAST(0x0000A50E00000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (4, 1, N'796918', N'Thursday', CAST(8 AS Decimal(18, 0)), CAST(1 AS Decimal(18, 0)), NULL, CAST(23.84 AS Decimal(18, 2)), CAST(0x0000A50F00000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (5, 1, N'796918', N'Friday', CAST(8 AS Decimal(18, 0)), CAST(1 AS Decimal(18, 0)), NULL, CAST(23.84 AS Decimal(18, 2)), CAST(0x0000A51000000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (6, 1, N'796918', N'Saturday', CAST(0 AS Decimal(18, 0)), CAST(9 AS Decimal(18, 0)), NULL, CAST(23.84 AS Decimal(18, 2)), CAST(0x0000A51100000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (7, 1, N'796918', N'Sunday', CAST(0 AS Decimal(18, 0)), CAST(9 AS Decimal(18, 0)), NULL, CAST(23.84 AS Decimal(18, 2)), CAST(0x0000A51200000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (15, 1, N'1853081', N'Monday', CAST(8 AS Decimal(18, 0)), CAST(1 AS Decimal(18, 0)), NULL, CAST(29.46 AS Decimal(18, 2)), CAST(0x0000A50C00000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (16, 1, N'1853081', N'Tuesday', CAST(8 AS Decimal(18, 0)), CAST(1 AS Decimal(18, 0)), NULL, CAST(29.46 AS Decimal(18, 2)), CAST(0x0000A50D00000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (17, 1, N'1853081', N'Wednesday', CAST(8 AS Decimal(18, 0)), CAST(1 AS Decimal(18, 0)), NULL, CAST(29.46 AS Decimal(18, 2)), CAST(0x0000A50E00000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (18, 1, N'1853081', N'Thursday', CAST(8 AS Decimal(18, 0)), CAST(1 AS Decimal(18, 0)), NULL, CAST(29.46 AS Decimal(18, 2)), CAST(0x0000A50F00000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (19, 1, N'1853081', N'Friday', CAST(8 AS Decimal(18, 0)), CAST(1 AS Decimal(18, 0)), NULL, CAST(29.46 AS Decimal(18, 2)), CAST(0x0000A51000000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (20, 1, N'1853081', N'Saturday', CAST(0 AS Decimal(18, 0)), CAST(9 AS Decimal(18, 0)), NULL, CAST(29.46 AS Decimal(18, 2)), CAST(0x0000A51100000000 AS DateTime))
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (21, 1, N'1853081', N'Sunday', CAST(0 AS Decimal(18, 0)), CAST(9 AS Decimal(18, 0)), NULL, CAST(29.46 AS Decimal(18, 2)), CAST(0x0000A51200000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[payments_details] OFF
/****** Object:  ForeignKey [FK__payments__userna__0EA330E9]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[payments]  WITH CHECK ADD  CONSTRAINT [FK__payments__userna__0EA330E9] FOREIGN KEY([username])
REFERENCES [dbo].[users] ([username])
GO
ALTER TABLE [dbo].[payments] CHECK CONSTRAINT [FK__payments__userna__0EA330E9]
GO
/****** Object:  ForeignKey [FK__payments___emplo__145C0A3F]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[payments_details]  WITH CHECK ADD  CONSTRAINT [FK__payments___emplo__145C0A3F] FOREIGN KEY([employee_code])
REFERENCES [dbo].[staff] ([employee_code])
GO
ALTER TABLE [dbo].[payments_details] CHECK CONSTRAINT [FK__payments___emplo__145C0A3F]
GO
/****** Object:  ForeignKey [FK__payments___payme__1367E606]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[payments_details]  WITH CHECK ADD  CONSTRAINT [FK__payments___payme__1367E606] FOREIGN KEY([payment_id])
REFERENCES [dbo].[payments] ([payment_id])
GO
ALTER TABLE [dbo].[payments_details] CHECK CONSTRAINT [FK__payments___payme__1367E606]
GO
/****** Object:  ForeignKey [FK__payments___emplo__173876EA]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[payments_reimbursements]  WITH CHECK ADD  CONSTRAINT [FK__payments___emplo__173876EA] FOREIGN KEY([employee_code])
REFERENCES [dbo].[staff] ([employee_code])
GO
ALTER TABLE [dbo].[payments_reimbursements] CHECK CONSTRAINT [FK__payments___emplo__173876EA]
GO
/****** Object:  ForeignKey [FK__phones__employee__1ED998B2]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[phones]  WITH CHECK ADD  CONSTRAINT [FK__phones__employee__1ED998B2] FOREIGN KEY([employee_code])
REFERENCES [dbo].[staff] ([employee_code])
GO
ALTER TABLE [dbo].[phones] CHECK CONSTRAINT [FK__phones__employee__1ED998B2]
GO
/****** Object:  ForeignKey [FK__schools__employe__1A14E395]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[schools]  WITH CHECK ADD  CONSTRAINT [FK__schools__employe__1A14E395] FOREIGN KEY([employee_manager])
REFERENCES [dbo].[staff] ([employee_code])
GO
ALTER TABLE [dbo].[schools] CHECK CONSTRAINT [FK__schools__employe__1A14E395]
GO
/****** Object:  ForeignKey [FK__security___group__3A81B327]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[security_permits]  WITH CHECK ADD FOREIGN KEY([group])
REFERENCES [dbo].[security_groups] ([group_code])
GO
/****** Object:  ForeignKey [FK__security___scree__3B75D760]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[security_permits]  WITH CHECK ADD FOREIGN KEY([screen_code])
REFERENCES [dbo].[security_screens] ([screen_code])
GO
/****** Object:  ForeignKey [FK__security___usern__398D8EEE]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[security_permits]  WITH CHECK ADD FOREIGN KEY([username])
REFERENCES [dbo].[users] ([username])
GO
/****** Object:  ForeignKey [FK__staff__title__0519C6AF]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[staff]  WITH CHECK ADD  CONSTRAINT [FK__staff__title__0519C6AF] FOREIGN KEY([title])
REFERENCES [dbo].[titles] ([id])
GO
ALTER TABLE [dbo].[staff] CHECK CONSTRAINT [FK__staff__title__0519C6AF]
GO
/****** Object:  ForeignKey [FK__staff_by___emplo__1332DBDC]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[staff_by_schools]  WITH CHECK ADD  CONSTRAINT [FK__staff_by___emplo__1332DBDC] FOREIGN KEY([employee_code])
REFERENCES [dbo].[staff] ([employee_code])
GO
ALTER TABLE [dbo].[staff_by_schools] CHECK CONSTRAINT [FK__staff_by___emplo__1332DBDC]
GO
/****** Object:  ForeignKey [FK__staff_by___schoo__14270015]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[staff_by_schools]  WITH CHECK ADD  CONSTRAINT [FK__staff_by___schoo__14270015] FOREIGN KEY([school_code])
REFERENCES [dbo].[schools] ([code])
GO
ALTER TABLE [dbo].[staff_by_schools] CHECK CONSTRAINT [FK__staff_by___schoo__14270015]
GO
/****** Object:  ForeignKey [FK_users_schools]    Script Date: 09/06/2015 22:42:43 ******/
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK_users_schools] FOREIGN KEY([school_code])
REFERENCES [dbo].[schools] ([code])
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK_users_schools]
GO
