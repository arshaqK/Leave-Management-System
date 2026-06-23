-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: leave_management
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` (`id`, `version`, `entity_name`, `entity_id`, `action`, `performed_by`, `details`, `date_created`) VALUES (1,0,'Employee',3,'CREATE','admin','Created employee: Arshaq','2026-06-23 13:41:33.659000'),(2,0,'LeaveRequest',1,'CREATE','arshaq','Leave applied: Annual from 2026-06-25 to 2026-06-27','2026-06-23 13:44:55.942000'),(3,0,'LeaveRequest',1,'UPDATE','admin','Leave approved by admin','2026-06-23 13:45:07.250000'),(4,0,'LeaveRequest',2,'CREATE','arshaq','Leave applied: Sick from 2026-08-01 to 2026-08-10','2026-06-23 13:45:43.356000'),(5,0,'LeaveRequest',2,'UPDATE','admin','Leave approved by admin','2026-06-23 13:45:59.228000'),(6,0,'LeaveRequest',3,'CREATE','employee1','Leave applied: Casual from 2026-07-01 to 2026-07-03','2026-06-23 13:52:53.036000'),(7,0,'LeaveRequest',3,'UPDATE','admin','Leave approved by admin','2026-06-23 13:53:12.391000'),(8,0,'Employee',2,'UPDATE','admin','Updated employee: Employee1','2026-06-23 13:53:33.333000'),(9,0,'LeaveRequest',4,'CREATE','arshaq','Leave applied: Annual from 2026-07-01 to 2026-07-04','2026-06-23 14:03:29.064000'),(10,0,'LeaveRequest',4,'UPDATE','admin','Leave approved by admin','2026-06-23 14:18:09.975000'),(11,0,'Employee',4,'CREATE','admin','Created employee: Kirmani','2026-06-23 14:19:18.940000'),(12,0,'LeaveRequest',5,'CREATE','Kirmani','Leave applied: Sick from 2026-07-10 to 2026-08-13','2026-06-23 14:19:53.793000'),(13,0,'LeaveRequest',5,'UPDATE','admin','Leave rejected by admin','2026-06-23 14:26:32.971000'),(14,0,'LeaveRequest',6,'CREATE','Kirmani','Leave applied: Casual from 2026-07-04 to 2026-08-05','2026-06-23 14:34:05.501000'),(15,0,'LeaveRequest',6,'UPDATE','admin','Leave approved by admin','2026-06-23 14:45:20.540000'),(16,0,'LeaveRequest',7,'CREATE','Kirmani','Leave applied: Sick from 2026-08-26 to 2026-08-29','2026-06-23 14:53:35.236000'),(17,0,'LeaveRequest',7,'UPDATE','admin','Leave approved by admin','2026-06-23 15:01:05.693000'),(18,0,'LeaveRequest',8,'CREATE','Kirmani','Leave applied: Annual from 2026-09-01 to 2026-09-03','2026-06-23 15:02:11.623000'),(19,0,'LeaveRequest',8,'UPDATE','admin','Leave rejected by admin','2026-06-23 15:03:22.495000'),(20,0,'Employee',4,'UPDATE','admin','Deactivated employee: Kirmani','2026-06-23 19:29:19.844000'),(21,0,'LeaveRequest',9,'CREATE','Kirmani','Leave applied: Annual from 2026-06-25 to 2026-06-26','2026-06-23 19:30:00.906000'),(22,0,'Employee',5,'CREATE','admin','Created employee: API Test User','2026-06-23 20:22:17.111000'),(23,0,'Employee',5,'UPDATE','admin','Updated employee: Test User Updated','2026-06-23 20:23:57.488000'),(24,0,'Employee',5,'UPDATE','admin','Deactivated employee: Test User Updated','2026-06-23 20:24:25.761000'),(25,0,'LeaveRequest',10,'CREATE','employee1','Leave applied: Annual from 2026-08-01 to 2026-08-05','2026-06-23 20:29:05.997000'),(26,0,'LeaveRequest',9,'UPDATE','employee1','Leave cancelled by employee1','2026-06-23 20:31:03.311000'),(27,0,'LeaveRequest',11,'CREATE','employee1','Leave applied: Annual from 2026-08-06 to 2026-08-10','2026-06-23 20:31:55.644000'),(28,0,'LeaveRequest',10,'UPDATE','admin','Leave approved by admin','2026-06-23 20:33:00.388000'),(29,0,'LeaveRequest',11,'UPDATE','admin','Leave rejected by admin','2026-06-23 20:33:16.990000'),(30,0,'LeaveRequest',12,'CREATE','employee1','Leave applied: Casual from 2026-08-06 to 2026-08-10','2026-06-23 20:42:09.221000'),(31,0,'Employee',5,'UPDATE','admin','Deactivated employee: Test User Updated','2026-06-23 20:45:40.964000'),(32,0,'LeaveRequest',13,'CREATE','arshaq','Leave applied: Annual from 2026-07-16 to 2026-07-18','2026-06-23 20:55:18.098000'),(33,0,'LeaveRequest',13,'UPDATE','admin','Leave rejected by admin','2026-06-23 20:55:44.067000'),(34,0,'LeaveRequest',12,'UPDATE','admin','Leave approved by admin','2026-06-23 20:55:51.905000'),(35,0,'Employee',4,'UPDATE','admin','Updated employee: Kirmani','2026-06-23 21:16:25.789000'),(36,0,'Employee',5,'UPDATE','admin','Updated employee: Test User Updated','2026-06-23 21:16:31.658000'),(37,0,'Employee',4,'UPDATE','admin','Deactivated employee: Kirmani','2026-06-23 21:16:52.523000'),(38,0,'Employee',4,'UPDATE','admin','Updated employee: Kirmani','2026-06-23 21:17:16.132000'),(39,0,'LeaveRequest',14,'CREATE','Kirmani','Leave applied: Sick from 2026-06-25 to 2026-06-27','2026-06-23 21:19:29.363000'),(40,0,'LeaveRequest',14,'UPDATE','admin','Leave rejected by admin','2026-06-23 21:20:05.915000');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` (`id`, `version`, `employee_id`, `full_name`, `email`, `department`, `joining_date`, `status`, `user_id`, `date_created`, `last_updated`, `created_by`, `modified_by`) VALUES (1,0,'EMP-001','System Admin','admin@leavemanagement.com','Management','2026-06-23 13:40:10.094000','Active',1,'2026-06-23 13:40:10.122000','2026-06-23 13:40:10.122000','system',NULL),(2,1,'EMP-002','Employee1','employee1@leavemanagement.com','Engineering','2026-06-22 19:00:00.000000','Active',2,'2026-06-23 13:40:10.252000','2026-06-23 13:53:33.357000','system','admin'),(3,0,'EMP-003','Arshaq','arshaq@example.com','IT','2026-06-14 19:00:00.000000','Active',3,'2026-06-23 13:41:33.644000','2026-06-23 13:41:33.644000','admin','admin'),(4,4,'EMP-004','Kirmani','arshaqxpress@gmail.com','Software','2026-06-28 19:00:00.000000','Active',4,'2026-06-23 14:19:18.916000','2026-06-23 21:17:16.287000','admin','admin'),(5,3,'EMP-006','Test User Updated','test@company.com','IT','2026-05-30 19:00:00.000000','Active',5,'2026-06-23 20:22:17.008000','2026-06-23 21:16:31.680000','admin','admin');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `leave_requests`
--

LOCK TABLES `leave_requests` WRITE;
/*!40000 ALTER TABLE `leave_requests` DISABLE KEYS */;
INSERT INTO `leave_requests` (`id`, `version`, `employee_id`, `leave_type`, `start_date`, `end_date`, `reason`, `status`, `remarks`, `decision_date`, `decided_by_id`, `date_created`, `last_updated`, `created_by`, `modified_by`) VALUES (1,1,3,'Annual','2026-06-24 19:00:00.000000','2026-06-26 19:00:00.000000','Going on vacation','Approved','','2026-06-23 13:45:07.203000',1,'2026-06-23 13:44:55.915000','2026-06-23 13:45:07.561000','arshaq','admin'),(2,1,3,'Sick','2026-07-31 19:00:00.000000','2026-08-09 19:00:00.000000','Sick leave','Approved','','2026-06-23 13:45:59.222000',1,'2026-06-23 13:45:43.347000','2026-06-23 13:45:59.248000','arshaq','admin'),(3,1,2,'Casual','2026-06-30 19:00:00.000000','2026-07-02 19:00:00.000000','Casual leave','Approved','','2026-06-23 13:53:12.384000',1,'2026-06-23 13:52:52.984000','2026-06-23 13:53:12.427000','employee1','admin'),(4,1,3,'Annual','2026-06-30 19:00:00.000000','2026-07-03 19:00:00.000000','Annual leave','Approved','','2026-06-23 14:18:09.790000',1,'2026-06-23 14:03:28.830000','2026-06-23 14:18:10.169000','arshaq','admin'),(5,1,4,'Sick','2026-07-09 19:00:00.000000','2026-08-12 19:00:00.000000','Sick leave','Rejected','Rejected','2026-06-23 14:26:32.703000',1,'2026-06-23 14:19:53.784000','2026-06-23 14:26:33.134000','Kirmani','admin'),(6,1,4,'Casual','2026-07-03 19:00:00.000000','2026-08-04 19:00:00.000000','Casual leave','Approved','','2026-06-23 14:45:20.290000',1,'2026-06-23 14:34:05.437000','2026-06-23 14:45:20.863000','Kirmani','admin'),(7,1,4,'Sick','2026-08-25 19:00:00.000000','2026-08-28 19:00:00.000000','Sick leave','Approved','','2026-06-23 15:01:05.500000',1,'2026-06-23 14:53:35.184000','2026-06-23 15:01:10.400000','Kirmani','admin'),(8,1,4,'Annual','2026-08-31 19:00:00.000000','2026-09-02 19:00:00.000000','Annual leave','Rejected','Client meeting these days','2026-06-23 15:03:22.486000',1,'2026-06-23 15:02:11.600000','2026-06-23 15:03:26.480000','Kirmani','admin'),(9,1,4,'Annual','2026-06-24 19:00:00.000000','2026-06-25 19:00:00.000000','Annual leave','Cancelled',NULL,NULL,NULL,'2026-06-23 19:30:00.880000','2026-06-23 20:31:03.343000','Kirmani','employee1'),(10,1,2,'Annual','2026-07-31 19:00:00.000000','2026-08-04 19:00:00.000000','Family vacation trip planned','Approved',NULL,'2026-06-23 20:33:00.370000',1,'2026-06-23 20:29:05.912000','2026-06-23 20:33:03.426000','employee1','admin'),(11,1,2,'Annual','2026-08-05 19:00:00.000000','2026-08-09 19:00:00.000000','Family vacation trip planned','Rejected',NULL,'2026-06-23 20:33:16.977000',1,'2026-06-23 20:31:55.636000','2026-06-23 20:33:19.792000','employee1','admin'),(12,1,2,'Casual','2026-08-05 19:00:00.000000','2026-08-09 19:00:00.000000','Casual leave','Approved','','2026-06-23 20:55:51.898000',1,'2026-06-23 20:42:09.122000','2026-06-23 20:55:54.743000','employee1','admin'),(13,1,3,'Annual','2026-07-15 19:00:00.000000','2026-07-17 19:00:00.000000','Annual leave','Rejected','No leave','2026-06-23 20:55:44.056000',1,'2026-06-23 20:55:18.039000','2026-06-23 20:55:46.933000','arshaq','admin'),(14,1,4,'Sick','2026-06-24 19:00:00.000000','2026-06-26 19:00:00.000000','Sick leave','Rejected','Not granted','2026-06-23 21:20:05.898000',1,'2026-06-23 21:19:29.340000','2026-06-23 21:20:08.840000','Kirmani','admin');
/*!40000 ALTER TABLE `leave_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`id`, `version`, `authority`) VALUES (1,0,'ROLE_ADMIN'),(2,0,'ROLE_EMPLOYEE');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `version`, `username`, `password`, `enabled`, `account_expired`, `account_locked`, `password_expired`) VALUES (1,0,'admin','{bcrypt}$2a$10$9rlSj.KXYxxlMdoLDvQC6Os9kg8Cs9b0jppqQXuiY8.z/BdSAJsqS',_binary '',_binary '\0',_binary '\0',_binary '\0'),(2,0,'employee1','{bcrypt}$2a$10$sLtitsvgA1TGAdccTERYJ.6EHshqpIEX.5zH/VRZU9BEfE1uQ4Xpi',_binary '',_binary '\0',_binary '\0',_binary '\0'),(3,0,'arshaq','{bcrypt}$2a$10$iZoDSb.yVIi9YNNX3EuXzui8RbLYxJln.K9Q4q6VF4ZJ/JKKMyu/e',_binary '',_binary '\0',_binary '\0',_binary '\0'),(4,2,'Kirmani','{bcrypt}$2a$10$ScGOL/hUeguo1z6a2l8as.G0hDrJu7py0FbsvQ2bYogDl7m/aEDha',_binary '',_binary '\0',_binary '\0',_binary '\0'),(5,0,'testuser','{bcrypt}$2a$10$gpFwSJ6cszXv3Qt9IPbRguSoBIH3fK5GhgHF0WWAvkCJJEIGsSfo2',_binary '',_binary '\0',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (1,1),(2,2),(3,2),(4,2),(5,2);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-24  2:56:11
