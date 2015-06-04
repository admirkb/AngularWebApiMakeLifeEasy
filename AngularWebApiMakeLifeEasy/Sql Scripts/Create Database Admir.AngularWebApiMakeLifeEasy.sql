USE [master]
GO

/****** Object:  Database [Admir.AngularWebApiMakeLifeEasy]    Script Date: 04/06/2015 14:37:37 ******/
CREATE DATABASE [Admir.AngularWebApiMakeLifeEasy]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Admir.AngularWebApiMakeLifeEasy', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.ADMIR01\MSSQL\DATA\Admir.AngularWebApiMakeLifeEasy.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Admir.AngularWebApiMakeLifeEasy_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.ADMIR01\MSSQL\DATA\Admir.AngularWebApiMakeLifeEasy_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET COMPATIBILITY_LEVEL = 110
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Admir.AngularWebApiMakeLifeEasy].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET ARITHABORT OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET AUTO_CREATE_STATISTICS ON 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET  DISABLE_BROKER 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET  MULTI_USER 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET DB_CHAINING OFF 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO

ALTER DATABASE [Admir.AngularWebApiMakeLifeEasy] SET  READ_WRITE 
GO

