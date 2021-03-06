USE [fmp]
GO
/****** Object:  Table [dbo].[contract_permit_periods]    Script Date: 9/15/2015 12:33:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[contract_permit_periods](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[guid] [nvarchar](max) NULL,
	[number_registered] [varchar](50) NULL,
	[week_days] [varchar](200) NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
	[start_time] [varchar](10) NULL,
	[end_time] [varchar](10) NULL,
	[hours] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[contract_permit_periods_hours_worked]    Script Date: 9/15/2015 12:33:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contract_permit_periods_hours_worked](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[contract_permit_periods_guid] [nvarchar](max) NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
	[total_hours_worked] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[contract_permits]    Script Date: 9/15/2015 12:33:35 AM ******/
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
	[authorized_organization_name] [varchar](100) NULL,
	[permit_start_date] [datetime] NULL,
	[permit_end_date] [datetime] NULL,
	[number_registered] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[payments]    Script Date: 9/15/2015 12:33:35 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[payments_details]    Script Date: 9/15/2015 12:33:35 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[payments_reimbursements]    Script Date: 9/15/2015 12:33:35 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[phones]    Script Date: 9/15/2015 12:33:35 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[reimbursement]    Script Date: 9/15/2015 12:33:35 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[schools]    Script Date: 9/15/2015 12:33:35 AM ******/
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
	[budget] [money] NULL,
	[last_payment_code_secuence] [int] NULL,
 CONSTRAINT [PK_schools] PRIMARY KEY CLUSTERED 
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[security_groups]    Script Date: 9/15/2015 12:33:35 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[security_groups_users]    Script Date: 9/15/2015 12:33:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[security_groups_users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[group_code] [varchar](10) NULL,
	[username] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[security_permits]    Script Date: 9/15/2015 12:33:35 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[security_screens]    Script Date: 9/15/2015 12:33:35 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[staff]    Script Date: 9/15/2015 12:33:35 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[staff_by_schools]    Script Date: 9/15/2015 12:33:35 AM ******/
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
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[sys_parameters]    Script Date: 9/15/2015 12:33:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sys_parameters](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[last_payment_code_secuence] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[titles]    Script Date: 9/15/2015 12:33:35 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[users]    Script Date: 9/15/2015 12:33:35 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[contract_permit_periods] ON 

GO
INSERT [dbo].[contract_permit_periods] ([id], [guid], [number_registered], [week_days], [start_date], [end_date], [start_time], [end_time], [hours]) VALUES (2, N'd683fff4-eddb-5c84-1a28-46a439aa567b', N'fasdfasfd', N'Sun,Mon', CAST(N'2015-09-01 00:00:00.000' AS DateTime), CAST(N'2015-09-04 00:00:00.000' AS DateTime), N'1:00 PM', N'6:00 PM', 20)
GO
INSERT [dbo].[contract_permit_periods] ([id], [guid], [number_registered], [week_days], [start_date], [end_date], [start_time], [end_time], [hours]) VALUES (4, N'1202743e-eb98-eb4a-969c-9fc321390872', N'BBBBB', N'Sun', CAST(N'2015-09-01 00:00:00.000' AS DateTime), CAST(N'2015-09-02 00:00:00.000' AS DateTime), N'1:00 PM', N'2:00 PM', 2)
GO
SET IDENTITY_INSERT [dbo].[contract_permit_periods] OFF
GO
SET IDENTITY_INSERT [dbo].[contract_permit_periods_hours_worked] ON 

GO
INSERT [dbo].[contract_permit_periods_hours_worked] ([ID], [contract_permit_periods_guid], [start_date], [end_date], [total_hours_worked]) VALUES (2, N'd683fff4-eddb-5c84-1a28-46a439aa567b', CAST(N'2015-09-08 00:00:00.000' AS DateTime), CAST(N'2015-09-11 00:00:00.000' AS DateTime), 10)
GO
INSERT [dbo].[contract_permit_periods_hours_worked] ([ID], [contract_permit_periods_guid], [start_date], [end_date], [total_hours_worked]) VALUES (3, N'194e5817-2ad8-910c-a6f1-c975bc330756', CAST(N'2015-09-01 00:00:00.000' AS DateTime), CAST(N'2015-09-04 00:00:00.000' AS DateTime), 8)
GO
INSERT [dbo].[contract_permit_periods_hours_worked] ([ID], [contract_permit_periods_guid], [start_date], [end_date], [total_hours_worked]) VALUES (5, N'1202743e-eb98-eb4a-969c-9fc321390872', CAST(N'2015-09-01 00:00:00.000' AS DateTime), CAST(N'2015-09-02 00:00:00.000' AS DateTime), 2)
GO
SET IDENTITY_INSERT [dbo].[contract_permit_periods_hours_worked] OFF
GO
SET IDENTITY_INSERT [dbo].[contract_permits] ON 

GO
INSERT [dbo].[contract_permits] ([id], [organization_name], [telephone], [mailing_address], [authorized_organization_name], [permit_start_date], [permit_end_date], [number_registered]) VALUES (2, N'BBBBBEEEEE', N'BBBBBEEEEE', N'BBBBBEEEEE', N'BBBBBEEEEE', CAST(N'2015-09-03 00:00:00.000' AS DateTime), CAST(N'2015-09-05 00:00:00.000' AS DateTime), N'BBBBB')
GO
INSERT [dbo].[contract_permits] ([id], [organization_name], [telephone], [mailing_address], [authorized_organization_name], [permit_start_date], [permit_end_date], [number_registered]) VALUES (3, N'CCCCC', N'CCCCC', N'CCCCC', N'CCCCC', CAST(N'2015-09-17 00:00:00.000' AS DateTime), CAST(N'2015-09-11 00:00:00.000' AS DateTime), N'CCCCC')
GO
INSERT [dbo].[contract_permits] ([id], [organization_name], [telephone], [mailing_address], [authorized_organization_name], [permit_start_date], [permit_end_date], [number_registered]) VALUES (4, N'DDDDDD', N'DDDDDD', N'DDDDDD', N'DDDDDD', CAST(N'2015-09-01 00:00:00.000' AS DateTime), CAST(N'2015-09-03 00:00:00.000' AS DateTime), N'DDDDDD')
GO
INSERT [dbo].[contract_permits] ([id], [organization_name], [telephone], [mailing_address], [authorized_organization_name], [permit_start_date], [permit_end_date], [number_registered]) VALUES (5, N'fasdfasfd', N'fasdfasfd', N'fasdfasfd', N'fasdfasfd', CAST(N'2015-09-02 00:00:00.000' AS DateTime), CAST(N'2015-09-05 00:00:00.000' AS DateTime), N'fasdfasfd')
GO
SET IDENTITY_INSERT [dbo].[contract_permits] OFF
GO
SET IDENTITY_INSERT [dbo].[payments] ON 

GO
INSERT [dbo].[payments] ([payment_id], [startdate], [enddate], [username], [applied], [payment_code]) VALUES (6, CAST(N'2015-09-07 00:00:00.000' AS DateTime), CAST(N'2015-09-13 00:00:00.000' AS DateTime), N'smancebo', 1, N'PRL0000000002')
GO
INSERT [dbo].[payments] ([payment_id], [startdate], [enddate], [username], [applied], [payment_code]) VALUES (7, CAST(N'2015-09-14 00:00:00.000' AS DateTime), CAST(N'2015-09-20 00:00:00.000' AS DateTime), N'smancebo', NULL, N'PRL0000000003')
GO
SET IDENTITY_INSERT [dbo].[payments] OFF
GO
SET IDENTITY_INSERT [dbo].[payments_details] ON 

GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (43, 6, N'12321354', N'Monday', CAST(8 AS Decimal(18, 0)), CAST(2 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-07 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (44, 6, N'12321354', N'Tuesday', CAST(8 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-08 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (45, 6, N'12321354', N'Wednesday', CAST(8 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-09 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (46, 6, N'12321354', N'Thursday', CAST(8 AS Decimal(18, 0)), CAST(1 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-10 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (47, 6, N'12321354', N'Friday', CAST(8 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-11 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (48, 6, N'12321354', N'Saturday', CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-12 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (49, 6, N'12321354', N'Sunday', CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-13 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (50, 7, N'12321354', N'Monday', CAST(8 AS Decimal(18, 0)), CAST(2 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-14 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (51, 7, N'12321354', N'Tuesday', CAST(8 AS Decimal(18, 0)), CAST(2 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-15 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (52, 7, N'12321354', N'Wednesday', CAST(8 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-16 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (53, 7, N'12321354', N'Thursday', CAST(8 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-17 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (54, 7, N'12321354', N'Friday', CAST(8 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-18 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (55, 7, N'12321354', N'Saturday', CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-19 00:00:00.000' AS DateTime))
GO
INSERT [dbo].[payments_details] ([id], [payment_id], [employee_code], [day], [required_hours], [overtime], [comments], [payrate], [date]) VALUES (56, 7, N'12321354', N'Sunday', CAST(0 AS Decimal(18, 0)), CAST(0 AS Decimal(18, 0)), NULL, CAST(25.00 AS Decimal(18, 2)), CAST(N'2015-09-20 00:00:00.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[payments_details] OFF
GO
SET IDENTITY_INSERT [dbo].[phones] ON 

GO
INSERT [dbo].[phones] ([id], [employee_code], [number], [phone_type]) VALUES (36, N'12321354', CAST(8096195982 AS Decimal(18, 0)), N'fa-apple')
GO
INSERT [dbo].[phones] ([id], [employee_code], [number], [phone_type]) VALUES (37, N'12321354', CAST(8096175982 AS Decimal(18, 0)), N'fa-whatsapp')
GO
INSERT [dbo].[phones] ([id], [employee_code], [number], [phone_type]) VALUES (38, N'2512544', CAST(8096195982 AS Decimal(18, 0)), N'fa-home')
GO
INSERT [dbo].[phones] ([id], [employee_code], [number], [phone_type]) VALUES (39, N'2512544', CAST(8096558959 AS Decimal(18, 0)), N'fa-whatsapp')
GO
SET IDENTITY_INSERT [dbo].[phones] OFF
GO
SET IDENTITY_INSERT [dbo].[reimbursement] ON 

GO
INSERT [dbo].[reimbursement] ([id], [description], [payrate]) VALUES (1, N'Snow removal', CAST(25.0000 AS Decimal(18, 4)))
GO
INSERT [dbo].[reimbursement] ([id], [description], [payrate]) VALUES (7, N'2333', CAST(21.0000 AS Decimal(18, 4)))
GO
SET IDENTITY_INSERT [dbo].[reimbursement] OFF
GO
SET IDENTITY_INSERT [dbo].[schools] ON 

GO
INSERT [dbo].[schools] ([id], [code], [location], [size], [employee_manager], [supervisor], [name], [budget], [last_payment_code_secuence]) VALUES (8, N'25002142544', N'52151321', CAST(25000.00 AS Decimal(18, 2)), N'2512544', N'2512544', N'Saint S. School', NULL, NULL)
GO
INSERT [dbo].[schools] ([id], [code], [location], [size], [employee_manager], [supervisor], [name], [budget], [last_payment_code_secuence]) VALUES (7, N'9809809809', N'av.24 av 22', CAST(25000.00 AS Decimal(18, 2)), N'12321354', N'12321354', N'saint J School', NULL, 3)
GO
SET IDENTITY_INSERT [dbo].[schools] OFF
GO
SET IDENTITY_INSERT [dbo].[security_groups] ON 

GO
INSERT [dbo].[security_groups] ([id], [group_code], [description]) VALUES (3, N'grp-0002', N'Grupo 2')
GO
INSERT [dbo].[security_groups] ([id], [group_code], [description]) VALUES (1, N'grp-001', N'Group #1')
GO
SET IDENTITY_INSERT [dbo].[security_groups] OFF
GO
SET IDENTITY_INSERT [dbo].[security_groups_users] ON 

GO
INSERT [dbo].[security_groups_users] ([id], [group_code], [username]) VALUES (6, N'grp-0002', N'smancebo')
GO
INSERT [dbo].[security_groups_users] ([id], [group_code], [username]) VALUES (7, N'grp-0002', N'user11')
GO
SET IDENTITY_INSERT [dbo].[security_groups_users] OFF
GO
SET IDENTITY_INSERT [dbo].[security_permits] ON 

GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (123, N'smancebo', NULL, N'mant000')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (124, N'smancebo', NULL, N'mant001')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (125, N'smancebo', NULL, N'frmPayroll')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (126, N'smancebo', NULL, N'frmMater')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (127, N'smancebo', NULL, N'permit001')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (128, N'smancebo', NULL, N'frmPermit')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (129, N'smancebo', NULL, N'seg0000')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (130, N'smancebo', NULL, N'seg00001')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (131, N'smancebo', NULL, N'seg00003')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (132, N'smancebo', NULL, N'mant002')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (133, N'smancebo', NULL, N'mant003')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (134, N'smancebo', NULL, N'mant004')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (135, N'smancebo', NULL, N'mant005')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (136, N'smancebo', NULL, N'seg00002')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (143, NULL, N'grp-0002', N'frmPayroll')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (144, NULL, N'grp-0002', N'frmMater')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (145, NULL, N'grp-0002', N'repts0001')
GO
INSERT [dbo].[security_permits] ([id], [username], [group], [screen_code]) VALUES (146, NULL, N'grp-0002', N'repts000')
GO
SET IDENTITY_INSERT [dbo].[security_permits] OFF
GO
SET IDENTITY_INSERT [dbo].[security_screens] ON 

GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (10, N'frmMater', N'Request materials', N'/materials', N'fa-cube', N'')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (9, N'frmPayroll', N'Payroll', N'/payroll', N'fa-money', N'')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (11, N'frmPermit', N'Permits Creation', N'#', N'fa-calendar', N'')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (14, N'mant000', N'Maintenance', N'#', N'fa-cogs', N'')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (15, N'mant001', N'Employees', N'/employees', N'', N'mant000')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (16, N'mant002', N'Reimbursements', N'/reimbursements', N'', N'mant000')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (17, N'mant003', N'Schools', N'/schools', N'', N'mant000')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (18, N'mant004', N'Titles', N'/titles', N'', N'mant000')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (19, N'mant005', N'Users', N'/users', N'', N'seg0000')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (12, N'permit001', N'Contractors', N'/permits/contractor', N'fa-users', N'frmPermit')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (13, N'permit002', N'Areas', N'/permits/areas', N'fa-users', N'frmPermit')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (21, N'repts000', N'Reports', N'#', N'fa-clipboard', N'')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (22, N'repts0001', N'Income and Expense', N'/reports/income-expense', N'', N'repts000')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (23, N'seg0000', N'Security', N'#', N'fa-lock', N'')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (24, N'seg00001', N'Screens', N'/security/screens', N'', N'seg0000')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (25, N'seg00002', N'Groups', N'/security/groups', N'', N'seg0000')
GO
INSERT [dbo].[security_screens] ([id], [screen_code], [text], [url], [icon], [parent]) VALUES (26, N'seg00003', N'Permits', N'/security/permits', N'', N'seg0000')
GO
SET IDENTITY_INSERT [dbo].[security_screens] OFF
GO
SET IDENTITY_INSERT [dbo].[staff] ON 

GO
INSERT [dbo].[staff] ([id], [employee_code], [name], [middle_name], [last_name], [address], [sex], [birthday], [email], [title], [hire_date], [status], [supervisor_code]) VALUES (9, N'12321354', N'Jeancarlos', N'', N'Paula', N'asadasdsa', N'M', CAST(N'2015-07-08 00:00:00.000' AS DateTime), N'sjmancebo@gmail.com', 1, CAST(N'2015-07-03 00:00:00.000' AS DateTime), NULL, NULL)
GO
INSERT [dbo].[staff] ([id], [employee_code], [name], [middle_name], [last_name], [address], [sex], [birthday], [email], [title], [hire_date], [status], [supervisor_code]) VALUES (10, N'2512544', N'Samuel', N'J', N'Mancebo', N'Calle A # 17 Jardines del Ozama', N'M', CAST(N'1988-09-25 00:00:00.000' AS DateTime), N'sjmancebo@gmail.com', 2, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[staff] OFF
GO
SET IDENTITY_INSERT [dbo].[staff_by_schools] ON 

GO
INSERT [dbo].[staff_by_schools] ([id], [employee_code], [school_code]) VALUES (24, N'12321354', N'9809809809')
GO
INSERT [dbo].[staff_by_schools] ([id], [employee_code], [school_code]) VALUES (25, N'2512544', N'25002142544')
GO
INSERT [dbo].[staff_by_schools] ([id], [employee_code], [school_code]) VALUES (26, N'12321354', N'25002142544')
GO
SET IDENTITY_INSERT [dbo].[staff_by_schools] OFF
GO
SET IDENTITY_INSERT [dbo].[sys_parameters] ON 

GO
INSERT [dbo].[sys_parameters] ([id], [last_payment_code_secuence]) VALUES (1, 0)
GO
SET IDENTITY_INSERT [dbo].[sys_parameters] OFF
GO
SET IDENTITY_INSERT [dbo].[titles] ON 

GO
INSERT [dbo].[titles] ([id], [description], [payrate], [nigthdiff]) VALUES (1, N'handyman', CAST(25.0000 AS Decimal(18, 4)), CAST(0.25 AS Decimal(18, 2)))
GO
INSERT [dbo].[titles] ([id], [description], [payrate], [nigthdiff]) VALUES (2, N'Show', CAST(30.0000 AS Decimal(18, 4)), NULL)
GO
SET IDENTITY_INSERT [dbo].[titles] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

GO
INSERT [dbo].[users] ([id], [username], [password], [school_code]) VALUES (1, N'smancebo', N'gdyb21LQTcIANtvYMT7QVQ==', N'9809809809')
GO
INSERT [dbo].[users] ([id], [username], [password], [school_code]) VALUES (5, N'user11', N'gdyb21LQTcIANtvYMT7QVQ==', N'25002142544')
GO
SET IDENTITY_INSERT [dbo].[users] OFF
GO
ALTER TABLE [dbo].[payments]  WITH CHECK ADD  CONSTRAINT [FK__payments__userna__0EA330E9] FOREIGN KEY([username])
REFERENCES [dbo].[users] ([username])
GO
ALTER TABLE [dbo].[payments] CHECK CONSTRAINT [FK__payments__userna__0EA330E9]
GO
ALTER TABLE [dbo].[payments_details]  WITH CHECK ADD  CONSTRAINT [FK__payments___emplo__145C0A3F] FOREIGN KEY([employee_code])
REFERENCES [dbo].[staff] ([employee_code])
GO
ALTER TABLE [dbo].[payments_details] CHECK CONSTRAINT [FK__payments___emplo__145C0A3F]
GO
ALTER TABLE [dbo].[payments_details]  WITH CHECK ADD  CONSTRAINT [FK__payments___payme__1367E606] FOREIGN KEY([payment_id])
REFERENCES [dbo].[payments] ([payment_id])
GO
ALTER TABLE [dbo].[payments_details] CHECK CONSTRAINT [FK__payments___payme__1367E606]
GO
ALTER TABLE [dbo].[payments_reimbursements]  WITH CHECK ADD  CONSTRAINT [FK__payments___emplo__173876EA] FOREIGN KEY([employee_code])
REFERENCES [dbo].[staff] ([employee_code])
GO
ALTER TABLE [dbo].[payments_reimbursements] CHECK CONSTRAINT [FK__payments___emplo__173876EA]
GO
ALTER TABLE [dbo].[phones]  WITH CHECK ADD  CONSTRAINT [FK__phones__employee__1ED998B2] FOREIGN KEY([employee_code])
REFERENCES [dbo].[staff] ([employee_code])
GO
ALTER TABLE [dbo].[phones] CHECK CONSTRAINT [FK__phones__employee__1ED998B2]
GO
ALTER TABLE [dbo].[schools]  WITH CHECK ADD  CONSTRAINT [FK__schools__employe__1A14E395] FOREIGN KEY([employee_manager])
REFERENCES [dbo].[staff] ([employee_code])
GO
ALTER TABLE [dbo].[schools] CHECK CONSTRAINT [FK__schools__employe__1A14E395]
GO
ALTER TABLE [dbo].[security_groups_users]  WITH CHECK ADD FOREIGN KEY([group_code])
REFERENCES [dbo].[security_groups] ([group_code])
GO
ALTER TABLE [dbo].[security_groups_users]  WITH CHECK ADD FOREIGN KEY([username])
REFERENCES [dbo].[users] ([username])
GO
ALTER TABLE [dbo].[security_permits]  WITH CHECK ADD FOREIGN KEY([group])
REFERENCES [dbo].[security_groups] ([group_code])
GO
ALTER TABLE [dbo].[security_permits]  WITH CHECK ADD FOREIGN KEY([screen_code])
REFERENCES [dbo].[security_screens] ([screen_code])
GO
ALTER TABLE [dbo].[security_permits]  WITH CHECK ADD FOREIGN KEY([username])
REFERENCES [dbo].[users] ([username])
GO
ALTER TABLE [dbo].[staff]  WITH CHECK ADD  CONSTRAINT [FK__staff__title__0519C6AF] FOREIGN KEY([title])
REFERENCES [dbo].[titles] ([id])
GO
ALTER TABLE [dbo].[staff] CHECK CONSTRAINT [FK__staff__title__0519C6AF]
GO
ALTER TABLE [dbo].[staff_by_schools]  WITH CHECK ADD FOREIGN KEY([employee_code])
REFERENCES [dbo].[staff] ([employee_code])
GO
ALTER TABLE [dbo].[staff_by_schools]  WITH CHECK ADD FOREIGN KEY([school_code])
REFERENCES [dbo].[schools] ([code])
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK_users_schools] FOREIGN KEY([school_code])
REFERENCES [dbo].[schools] ([code])
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK_users_schools]
GO
