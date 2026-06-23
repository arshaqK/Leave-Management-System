# Leave Management System

A full-stack web application for managing employee leave requests. Built with **Grails 7.1.1** (REST API backend) and **React + Vite** (frontend).

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Sample Data](#sample-data)
- [Assumptions](#assumptions)
- [API Documentation](#api-documentation)

---

## Setup Instructions

### Prerequisites

| Tool | Version |
|------|---------|
| JDK | 17.0.17 |
| Grails | 7.1.1 |
| Node.js | 20.x |
| npm | 10.x |
| MySQL | 8.x |

---

### 1. Database Setup

Start MySQL and create the database and user:

```sql
CREATE DATABASE leave_management;
CREATE USER 'leave_user'@'localhost' IDENTIFIED BY 'leave123';
GRANT ALL PRIVILEGES ON leave_management.* TO 'leave_user'@'localhost';
FLUSH PRIVILEGES;
```

---

### 2. Backend Setup (Grails)

Navigate to the backend folder:

```bash
cd LeaveManagement/backend
```

The database connection is pre-configured in `grails-app/conf/application.yml`:

```yaml
environments:
  development:
    dataSource:
      url: jdbc:mysql://localhost:3306/leave_management?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
      username: leave_user
      password: leave123
```

> **Email Notifications:** To enable email, update `application.yml` with your Gmail credentials and a Gmail App Password:
> ```yaml
> spring:
>   mail:
>     username: your-email@gmail.com
>     password: your-app-password
> ```

Run the backend:

```bash
./gradlew bootRun
```

The backend starts at `http://localhost:8080`. On first run, GORM auto-creates all tables and Bootstrap seeds the default users.

---

### 3. Frontend Setup (React)

Navigate to the frontend folder:

```bash
cd LeaveManagement/frontend
```

Install dependencies:

```bash
npm install
```

Update the API base URL in `src/api/axios.js` to match your machine's IP:

```js
const api = axios.create({
  baseURL: 'http://<YOUR_IP>:8080',
  withCredentials: true,
})
```

Start the frontend:

```bash
npm run dev -- --host
```

The frontend starts at `http://localhost:5173`.

---

### 4. Default Users

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Admin |
| employee1 | emp123 | Employee |

> Passwords are stored as **bcrypt** hashed values in the database.

---

### 5. Running Both Servers

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd LeaveManagement/backend
./gradlew bootRun
```

**Terminal 2 — Frontend:**
```bash
cd LeaveManagement/frontend
npm run dev -- --host
```

Access the app at `http://localhost:5173`.

---

## Sample Data

A sample data script is provided at the project root as `sample_data.sql`. It seeds realistic data including employees, leave requests, and audit logs across multiple departments.

### How to run

> **Important:** Run the backend first at least once so GORM creates all the tables, then stop it before running the script.

**Step 1 — Start the backend to create tables:**
```bash
cd LeaveManagement/backend
./gradlew bootRun
```
Wait until you see `Grails application running at http://localhost:8080`, then stop it with `Ctrl+C`.

**Step 2 — Run the sample data script:**
```bash
sudo mysql leave_management < sample_data.sql
```

**Step 3 — Verify the data was inserted:**
```bash
sudo mysql leave_management -e "SELECT COUNT(*) FROM user;"
sudo mysql leave_management -e "SELECT COUNT(*) FROM employees;"
sudo mysql leave_management -e "SELECT COUNT(*) FROM leave_requests;"
sudo mysql leave_management -e "SELECT COUNT(*) FROM audit_logs;"
```

**Step 4 — Start the backend again:**
```bash
cd LeaveManagement/backend
./gradlew bootRun
```

**Step 5 — Start the frontend:**
```bash
cd LeaveManagement/frontend
npm run dev -- --host
```

> **Note:** The script clears all existing data before inserting sample data. Do not run it on a database with data you want to keep. The bcrypt password hashes in the script are pre-generated for `admin123` and `emp123`.

---

## Assumptions

1. **Single organisation** — The system is designed for one organisation with two roles: Admin and Employee. There is no multi-tenant support.

2. **Admin manages employees** — Only the Admin can create, edit, and deactivate employee accounts. Employees cannot self-register.

3. **Leave balance not tracked** — The system tracks leave requests and their statuses but does not enforce a leave balance or quota per employee.

4. **Approved leaves count in reports** — Only approved leave requests are counted in report statistics. Pending, rejected, and cancelled leaves are excluded from all report figures.

5. **One user account per employee** — Each employee has exactly one linked system user account created by the admin at the time of employee creation.

6. **Deactivation instead of deletion** — Employees are never deleted from the system. They are deactivated (status set to `Inactive`) to preserve historical leave data.

7. **CORS** — The backend is configured to accept requests from `http://localhost:5173` and `http://172.19.174.148:5173`. Update `grails-app/conf/spring/resources.groovy` if your frontend runs on a different origin.

8. **Session-based authentication** — The system uses Spring Security session cookies (JSESSIONID) for authentication. The React frontend sends credentials via form POST and maintains the session using `withCredentials: true` on all API calls.

---

## API Documentation

### Base URL
```
http://localhost:8080
```

### Authentication

All API endpoints except login require an active session cookie obtained by logging in.

#### Login
```
POST /login/authenticate
Content-Type: application/x-www-form-urlencoded

username=admin&password=admin123
```
Returns a session cookie (`JSESSIONID`) on success.

#### Logout
```
GET /logoff
```

#### Get Current User
```
GET /api/me
```
**Response:**
```json
{
  "id": 1,
  "username": "admin",
  "role": "ROLE_ADMIN",
  "fullName": "System Admin",
  "employeeId": 2
}
```

---

### Employee API

> All employee endpoints require `ROLE_ADMIN`.

#### List All Employees
```
GET /api/employees
```
**Response:** Array of employee objects.

#### Get Employee by ID
```
GET /api/employees/{id}
```
**Response:**
```json
{
  "id": 1,
  "employeeId": "EMP-001",
  "fullName": "System Admin",
  "email": "admin@leavemanagement.com",
  "department": "Management",
  "joiningDate": "2026-06-01",
  "status": "Active"
}
```

#### Create Employee
```
POST /api/employees
Content-Type: application/json

{
  "employeeId": "EMP-003",
  "fullName": "Jane Smith",
  "email": "jane@company.com",
  "department": "HR",
  "joiningDate": "2026-06-01",
  "status": "Active",
  "username": "jane",
  "password": "jane123"
}
```
**Response:** `201 Created` with created employee object.

#### Update Employee
```
PUT /api/employees/{id}
Content-Type: application/json

{
  "fullName": "Jane Smith",
  "email": "jane@company.com",
  "department": "Finance",
  "joiningDate": "2026-06-01",
  "status": "Active"
}
```
**Response:** Updated employee object.

#### Deactivate Employee
```
DELETE /api/employees/{id}
```
Sets employee status to `Inactive`. Does not delete the record.

**Response:**
```json
{
  "message": "Employee deactivated successfully"
}
```

---

### Leave API

> `GET` and `POST /api/leaves` are accessible by both roles.
> Approve and reject endpoints require `ROLE_ADMIN`.

#### List Leave Requests
```
GET /api/leaves
```
- Admin receives all leave requests.
- Employee receives only their own leave requests.

#### Submit Leave Request
```
POST /api/leaves
Content-Type: application/json

{
  "leaveType": "Annual",
  "startDate": "2026-08-01",
  "endDate": "2026-08-05",
  "reason": "Family vacation trip"
}
```
**Leave Types:** `Annual`, `Sick`, `Casual`

**Response:** `201 Created` with created leave request object.

#### Cancel Leave Request
```
PUT /api/leaves/{id}/cancel
```
Only `Pending` requests can be cancelled. Employee can only cancel their own requests.

#### Approve Leave Request
```
PUT /api/leaves/{id}/approve
Content-Type: application/json

{
  "remarks": "Approved. Enjoy your leave."
}
```
**Requires:** `ROLE_ADMIN`

#### Reject Leave Request
```
PUT /api/leaves/{id}/reject
Content-Type: application/json

{
  "remarks": "Insufficient staffing during this period."
}
```
**Requires:** `ROLE_ADMIN`

---

### Dashboard API

#### Admin Dashboard Stats
```
GET /api/dashboard/admin
```
**Requires:** `ROLE_ADMIN`

**Response:**
```json
{
  "totalEmployees": 10,
  "activeEmployees": 9,
  "pendingLeaves": 3,
  "approvedThisMonth": 5
}
```

#### Employee Dashboard Stats
```
GET /api/dashboard/employee
```
**Requires:** `ROLE_EMPLOYEE`

**Response:**
```json
{
  "totalLeaves": 5,
  "pendingLeaves": 1,
  "approvedLeaves": 3,
  "rejectedLeaves": 1
}
```

---



### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 302 | Redirect (login success/failure) |
| 400 | Bad request / validation error |
| 401 | Unauthorized |
| 403 | Forbidden (insufficient role) |
| 404 | Resource not found |
| 500 | Internal server error |


