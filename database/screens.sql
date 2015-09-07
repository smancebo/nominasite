

insert into security_screens(screen_code,text,url,icon,parent)
values('frmPayroll','Payroll','/payroll','fa-money','')

insert into security_screens(screen_code,text,url,icon,parent)
values('frmMater','Request materials','/materials','fa-cube','')

insert into security_screens(screen_code,text,url,icon,parent)
values('frmPermit','Permits Creation','#','fa-calendar','')

insert into security_screens(screen_code,text,url,icon,parent)
values('permit001','Contractors','/permits/contractor','fa-users','frmPermit')


insert into security_screens(screen_code,text,url,icon,parent)
values('permit002','Areas','/permits/areas','fa-users','frmPermit')


insert into security_screens(screen_code,text,url,icon,parent)
values('mant000','Maintenance','#','fa-cogs','')

insert into security_screens(screen_code,text,url,icon,parent)
values('mant001','Employees','/employees','','mant000')

insert into security_screens(screen_code,text,url,icon,parent)
values('mant002','Reimbursements Types','/reimbursements','','mant000')

insert into security_screens(screen_code,text,url,icon,parent)
values('mant003','Schools','/schools','','mant000')

insert into security_screens(screen_code,text,url,icon,parent)
values('mant004','Titles','/titles','','mant000')

insert into security_screens(screen_code,text,url,icon,parent)
values('mant005','Users','/users','','mant000')


insert into security_screens(screen_code,text,url,icon,parent)
values('repts000','Reports','#','fa-clipboard','')


insert into security_screens(screen_code,text,url,icon,parent)
values('repts0001','Income and Expense','/reports/income-expense','','repts000')

insert into security_screens(screen_code,text,url,icon,parent)
values('seg0000','Security','#','fa-lock','')

insert into security_screens(screen_code,text,url,icon,parent)
values('seg00001','Screens','/security/screens','','seg0000')

insert into security_screens(screen_code,text,url,icon,parent)
values('seg00002','Groups','/security/groups','','seg0000')

insert into security_screens(screen_code,text,url,icon,parent)
values('seg00003','Permits','/security/permits','','seg0000')


select * from security_permits
select * from security_screens

insert into security_permits(username, screen_code)values('smancebo','seg00003')
