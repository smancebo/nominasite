-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 07/01/2015 22:37:36
-- Generated from EDMX file: C:\Users\Jeancarlos Mancebo\Desktop\fmpPortal\api\Models\fmp.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [fmp];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK__payments___emplo__145C0A3F]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[payments_details] DROP CONSTRAINT [FK__payments___emplo__145C0A3F];
GO
IF OBJECT_ID(N'[dbo].[FK__payments___payme__1367E606]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[payments_details] DROP CONSTRAINT [FK__payments___payme__1367E606];
GO
IF OBJECT_ID(N'[dbo].[FK__payments__userna__0EA330E9]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[payments] DROP CONSTRAINT [FK__payments__userna__0EA330E9];
GO
IF OBJECT_ID(N'[dbo].[FK__phones__employee__1ED998B2]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[phones] DROP CONSTRAINT [FK__phones__employee__1ED998B2];
GO
IF OBJECT_ID(N'[fmpModelStoreContainer].[FK__schools__employe__1A14E395]', 'F') IS NOT NULL
    ALTER TABLE [fmpModelStoreContainer].[schools] DROP CONSTRAINT [FK__schools__employe__1A14E395];
GO
IF OBJECT_ID(N'[dbo].[FK__staff__title__0519C6AF]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[staff] DROP CONSTRAINT [FK__staff__title__0519C6AF];
GO
IF OBJECT_ID(N'[dbo].[FK__users__employee___09DE7BCC]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[users] DROP CONSTRAINT [FK__users__employee___09DE7BCC];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[payments]', 'U') IS NOT NULL
    DROP TABLE [dbo].[payments];
GO
IF OBJECT_ID(N'[dbo].[payments_details]', 'U') IS NOT NULL
    DROP TABLE [dbo].[payments_details];
GO
IF OBJECT_ID(N'[dbo].[phones]', 'U') IS NOT NULL
    DROP TABLE [dbo].[phones];
GO
IF OBJECT_ID(N'[dbo].[reimbursement]', 'U') IS NOT NULL
    DROP TABLE [dbo].[reimbursement];
GO
IF OBJECT_ID(N'[dbo].[staff]', 'U') IS NOT NULL
    DROP TABLE [dbo].[staff];
GO
IF OBJECT_ID(N'[dbo].[titles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[titles];
GO
IF OBJECT_ID(N'[dbo].[users]', 'U') IS NOT NULL
    DROP TABLE [dbo].[users];
GO
IF OBJECT_ID(N'[fmpModelStoreContainer].[schools]', 'U') IS NOT NULL
    DROP TABLE [fmpModelStoreContainer].[schools];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'payments'
CREATE TABLE [dbo].[payments] (
    [payment_id] int IDENTITY(1,1) NOT NULL,
    [startdate] datetime  NULL,
    [enddate] datetime  NULL,
    [username] varchar(50)  NULL
);
GO

-- Creating table 'payments_details'
CREATE TABLE [dbo].[payments_details] (
    [id] int IDENTITY(1,1) NOT NULL,
    [payment_id] int  NULL,
    [employee_code] varchar(100)  NULL,
    [day] datetime  NULL,
    [required_hours] decimal(18,0)  NULL,
    [overtime] decimal(18,0)  NULL,
    [comments] varchar(200)  NULL
);
GO

-- Creating table 'phones'
CREATE TABLE [dbo].[phones] (
    [id] int IDENTITY(1,1) NOT NULL,
    [employee_code] varchar(100)  NULL,
    [number] decimal(18,0)  NULL,
    [phone_type] varchar(100)  NULL
);
GO

-- Creating table 'reimbursement'
CREATE TABLE [dbo].[reimbursement] (
    [id] int IDENTITY(1,1) NOT NULL,
    [description] varchar(100)  NULL,
    [payrate] decimal(18,4)  NULL
);
GO

-- Creating table 'staff'
CREATE TABLE [dbo].[staff] (
    [id] int IDENTITY(1,1) NOT NULL,
    [employee_code] varchar(100)  NOT NULL,
    [name] varchar(100)  NULL,
    [middle_name] varchar(100)  NULL,
    [last_name] varchar(100)  NULL,
    [address] varchar(200)  NULL,
    [sex] varchar(1)  NULL,
    [birthday] datetime  NULL,
    [email] varchar(200)  NULL,
    [title] int  NULL,
    [hire_date] datetime  NULL,
    [status] varchar(1)  NULL,
    [supervisor_code] varchar(100)  NULL
);
GO

-- Creating table 'titles'
CREATE TABLE [dbo].[titles] (
    [id] int IDENTITY(1,1) NOT NULL,
    [description] varchar(100)  NULL,
    [payrate] decimal(18,4)  NULL
);
GO

-- Creating table 'users'
CREATE TABLE [dbo].[users] (
    [id] int IDENTITY(1,1) NOT NULL,
    [employee_code] varchar(100)  NULL,
    [username] varchar(50)  NOT NULL,
    [password] varchar(100)  NULL
);
GO

-- Creating table 'schools'
CREATE TABLE [dbo].[schools] (
    [id] int IDENTITY(1,1) NOT NULL,
    [code] varchar(50)  NULL,
    [location] varchar(200)  NULL,
    [size] decimal(18,2)  NULL,
    [employee_manager] varchar(100)  NULL,
    [supervisor] varchar(100)  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [payment_id] in table 'payments'
ALTER TABLE [dbo].[payments]
ADD CONSTRAINT [PK_payments]
    PRIMARY KEY CLUSTERED ([payment_id] ASC);
GO

-- Creating primary key on [id] in table 'payments_details'
ALTER TABLE [dbo].[payments_details]
ADD CONSTRAINT [PK_payments_details]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'phones'
ALTER TABLE [dbo].[phones]
ADD CONSTRAINT [PK_phones]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'reimbursement'
ALTER TABLE [dbo].[reimbursement]
ADD CONSTRAINT [PK_reimbursement]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [employee_code] in table 'staff'
ALTER TABLE [dbo].[staff]
ADD CONSTRAINT [PK_staff]
    PRIMARY KEY CLUSTERED ([employee_code] ASC);
GO

-- Creating primary key on [id] in table 'titles'
ALTER TABLE [dbo].[titles]
ADD CONSTRAINT [PK_titles]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [username] in table 'users'
ALTER TABLE [dbo].[users]
ADD CONSTRAINT [PK_users]
    PRIMARY KEY CLUSTERED ([username] ASC);
GO

-- Creating primary key on [id] in table 'schools'
ALTER TABLE [dbo].[schools]
ADD CONSTRAINT [PK_schools]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [payment_id] in table 'payments_details'
ALTER TABLE [dbo].[payments_details]
ADD CONSTRAINT [FK__payments___payme__1367E606]
    FOREIGN KEY ([payment_id])
    REFERENCES [dbo].[payments]
        ([payment_id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__payments___payme__1367E606'
CREATE INDEX [IX_FK__payments___payme__1367E606]
ON [dbo].[payments_details]
    ([payment_id]);
GO

-- Creating foreign key on [username] in table 'payments'
ALTER TABLE [dbo].[payments]
ADD CONSTRAINT [FK__payments__userna__0EA330E9]
    FOREIGN KEY ([username])
    REFERENCES [dbo].[users]
        ([username])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__payments__userna__0EA330E9'
CREATE INDEX [IX_FK__payments__userna__0EA330E9]
ON [dbo].[payments]
    ([username]);
GO

-- Creating foreign key on [employee_code] in table 'payments_details'
ALTER TABLE [dbo].[payments_details]
ADD CONSTRAINT [FK__payments___emplo__145C0A3F]
    FOREIGN KEY ([employee_code])
    REFERENCES [dbo].[staff]
        ([employee_code])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__payments___emplo__145C0A3F'
CREATE INDEX [IX_FK__payments___emplo__145C0A3F]
ON [dbo].[payments_details]
    ([employee_code]);
GO

-- Creating foreign key on [employee_code] in table 'phones'
ALTER TABLE [dbo].[phones]
ADD CONSTRAINT [FK__phones__employee__1ED998B2]
    FOREIGN KEY ([employee_code])
    REFERENCES [dbo].[staff]
        ([employee_code])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__phones__employee__1ED998B2'
CREATE INDEX [IX_FK__phones__employee__1ED998B2]
ON [dbo].[phones]
    ([employee_code]);
GO

-- Creating foreign key on [employee_manager] in table 'schools'
ALTER TABLE [dbo].[schools]
ADD CONSTRAINT [FK__schools__employe__1A14E395]
    FOREIGN KEY ([employee_manager])
    REFERENCES [dbo].[staff]
        ([employee_code])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__schools__employe__1A14E395'
CREATE INDEX [IX_FK__schools__employe__1A14E395]
ON [dbo].[schools]
    ([employee_manager]);
GO

-- Creating foreign key on [title] in table 'staff'
ALTER TABLE [dbo].[staff]
ADD CONSTRAINT [FK__staff__title__0519C6AF]
    FOREIGN KEY ([title])
    REFERENCES [dbo].[titles]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__staff__title__0519C6AF'
CREATE INDEX [IX_FK__staff__title__0519C6AF]
ON [dbo].[staff]
    ([title]);
GO

-- Creating foreign key on [employee_code] in table 'users'
ALTER TABLE [dbo].[users]
ADD CONSTRAINT [FK__users__employee___09DE7BCC]
    FOREIGN KEY ([employee_code])
    REFERENCES [dbo].[staff]
        ([employee_code])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__users__employee___09DE7BCC'
CREATE INDEX [IX_FK__users__employee___09DE7BCC]
ON [dbo].[users]
    ([employee_code]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------