package com.leavemanagement

import grails.gorm.transactions.Transactional

@Transactional
class EmployeeService {

    def springSecurityService

    List<Employee> listAll() {
        Employee.list(sort: 'fullName', order: 'asc')
    }

    List<Employee> listActive() {
        Employee.findAllByStatus('Active', [sort: 'fullName', order: 'asc'])
    }

    Employee getById(Long id) {
        Employee.get(id)
    }

    Employee getByUser(User user) {
        Employee.findByUser(user)
    }

    Employee create(Map params) {
        String currentUser = springSecurityService.currentUser?.username ?: 'system'

        Employee employee = new Employee(
                employeeId: params.employeeId,
                fullName:   params.fullName,
                email:      params.email,
                department: params.department,
                joiningDate: params.joiningDate,
                status:     params.status ?: 'Active',
                createdBy:  currentUser,
                modifiedBy: currentUser
        )

        // Create login user for employee
        User user = new User(
                username: params.username,
                password: params.password,
                enabled:  true
        ).save(failOnError: true)

        Role employeeRole = Role.findByAuthority('ROLE_EMPLOYEE')
        UserRole.create(user, employeeRole, true)

        employee.user = user
        employee.save(failOnError: true)

        AuditLog.withNewTransaction {
            new AuditLog(
                    entityName:  'Employee',
                    entityId:    employee.id,
                    action:      'CREATE',
                    performedBy: currentUser,
                    details:     "Created employee: ${employee.fullName}",
            ).save(failOnError: true)
        }

        employee
    }

    Employee update(Long id, Map params) {
        String currentUser = springSecurityService.currentUser?.username ?: 'system'
        Employee employee = Employee.get(id)

        if (!employee) throw new RuntimeException("Employee not found with id: ${id}")

        employee.fullName    = params.fullName   ?: employee.fullName
        employee.email       = params.email      ?: employee.email
        employee.department  = params.department ?: employee.department
        employee.joiningDate = params.joiningDate ?: employee.joiningDate
        employee.status      = params.status     ?: employee.status
        employee.modifiedBy  = currentUser
        employee.save(failOnError: true)

        // Sync user enabled flag with employee status
        User user = employee.user
        user.enabled = (employee.status == 'Active')
        user.save(failOnError: true)

        AuditLog.withNewTransaction {
            new AuditLog(
                    entityName:  'Employee',
                    entityId:    employee.id,
                    action:      'UPDATE',
                    performedBy: currentUser,
                    details:     "Updated employee: ${employee.fullName}",
                    dateCreated: new Date()
            ).save(failOnError: true)
        }

        employee
    }

    Employee deactivate(Long id) {
        String currentUser = springSecurityService.currentUser?.username ?: 'system'
        Employee employee = Employee.get(id)

        if (!employee) throw new RuntimeException("Employee not found with id: ${id}")

        employee.status     = 'Inactive'
        employee.modifiedBy = currentUser
        employee.save(failOnError: true)

        // Disable the user account so they cannot login
        User user = employee.user
        user.enabled = false
        user.save(failOnError: true)

        AuditLog.withNewTransaction {
            new AuditLog(
                    entityName:  'Employee',
                    entityId:    employee.id,
                    action:      'UPDATE',
                    performedBy: currentUser,
                    details:     "Deactivated employee: ${employee.fullName}",
                    dateCreated: new Date()
            ).save(failOnError: true)
        }

        employee
    }

    int countAll() { Employee.count() }
    int countActive() { Employee.countByStatus('Active') }
}