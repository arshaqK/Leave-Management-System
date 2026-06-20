package leavemanagement

import com.leavemanagement.Employee
import com.leavemanagement.Role
import com.leavemanagement.User
import com.leavemanagement.UserRole

class BootStrap {

    def init = { servletContext ->

        User.withTransaction {

            // Create roles if they don't exist
            Role adminRole = Role.findByAuthority('ROLE_ADMIN') ?:
                    new Role(authority: 'ROLE_ADMIN').save(failOnError: true)

            Role employeeRole = Role.findByAuthority('ROLE_EMPLOYEE') ?:
                    new Role(authority: 'ROLE_EMPLOYEE').save(failOnError: true)

            // Create admin user
            if (!User.findByUsername('admin')) {
                User admin = new User(
                        username: 'admin',
                        password: 'admin123',
                        enabled: true
                ).save(failOnError: true)

                UserRole.create(admin, adminRole, true)

                new Employee(
                        employeeId: 'EMP-001',
                        fullName: 'System Admin',
                        email: 'admin@leavemanagement.com',
                        department: 'Management',
                        joiningDate: new Date(),
                        status: 'Active',
                        user: admin,
                        createdBy: 'system'
                ).save(failOnError: true)
            }

            // Create employee1 user
            if (!User.findByUsername('employee1')) {
                User emp = new User(
                        username: 'employee1',
                        password: 'emp123',
                        enabled: true
                ).save(failOnError: true)

                UserRole.create(emp, employeeRole, true)

                new Employee(
                        employeeId: 'EMP-002',
                        fullName: 'John Doe',
                        email: 'employee1@leavemanagement.com',
                        department: 'Engineering',
                        joiningDate: new Date(),
                        status: 'Active',
                        user: emp,
                        createdBy: 'system'
                ).save(failOnError: true)
            }

            println "✅ Bootstrap complete — admin and employee1 seeded."
        }
    }

    def destroy = {
    }
}