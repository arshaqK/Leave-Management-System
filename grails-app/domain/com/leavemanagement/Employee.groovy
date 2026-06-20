package com.leavemanagement

class Employee {

    String employeeId
    String fullName
    String email
    String department
    Date joiningDate
    String status = 'Active'

    User user

    Date dateCreated
    Date lastUpdated
    String createdBy
    String modifiedBy

    static constraints = {
        employeeId blank: false, unique: true, maxSize: 20
        fullName blank: false, maxSize: 100
        email blank: false, email: true, unique: true, maxSize: 150
        department blank: false, maxSize: 100
        joiningDate nullable: false
        status inList: ['Active', 'Inactive']
        user nullable: false, unique: true
        createdBy nullable: true
        modifiedBy nullable: true
    }

    static mapping = {
        table 'employees'
    }

    String toString() { fullName }
}