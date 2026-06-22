package com.leavemanagement

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN'])
class ReportController {

    def index() {
        // Leaves by department using HQL
        def leavesByDepartment = LeaveRequest.executeQuery(
            """SELECT e.department, COUNT(l.id)
               FROM LeaveRequest l
               JOIN l.employee e
               WHERE l.status = 'Approved'
               GROUP BY e.department
               ORDER BY COUNT(l.id) DESC"""
        )

        // Leaves by month (current year)
        int currentYear = Calendar.getInstance().get(Calendar.YEAR)
        def leavesByMonth = LeaveRequest.executeQuery(
            """SELECT MONTH(l.startDate), COUNT(l.id)
               FROM LeaveRequest l
               WHERE l.status = 'Approved' AND YEAR(l.startDate) = :year
               GROUP BY MONTH(l.startDate)
               ORDER BY MONTH(l.startDate)""",
            [year: currentYear]
        )

        // Top 10 employees by leave usage
        def topEmployees = LeaveRequest.executeQuery(
            """SELECT l.employee, COUNT(l.id)
               FROM LeaveRequest l
               WHERE l.status = 'Approved'
               GROUP BY l.employee
               ORDER BY COUNT(l.id) DESC""",
            [max: 10]
        )

        [
            leavesByDepartment: leavesByDepartment,
            leavesByMonth     : leavesByMonth,
            topEmployees      : topEmployees
        ]
    }

    def apiIndex() {
        def leavesByDepartment = LeaveRequest.executeQuery(
            """SELECT e.department, COUNT(l.id)
            FROM LeaveRequest l JOIN l.employee e
            WHERE l.status = 'Approved'
            GROUP BY e.department ORDER BY COUNT(l.id) DESC"""
        ).collect { [department: it[0], count: it[1]] }

        int currentYear = Calendar.getInstance().get(Calendar.YEAR)
        def leavesByMonth = LeaveRequest.executeQuery(
            """SELECT MONTH(l.startDate), COUNT(l.id)
            FROM LeaveRequest l
            WHERE l.status = 'Approved' AND YEAR(l.startDate) = :year
            GROUP BY MONTH(l.startDate)
            ORDER BY MONTH(l.startDate)""",
            [year: currentYear]
        ).collect { [month: it[0], count: it[1]] }

        def topEmployees = LeaveRequest.executeQuery(
            """SELECT l.employee, COUNT(l.id)
            FROM LeaveRequest l
            WHERE l.status = 'Approved'
            GROUP BY l.employee
            ORDER BY COUNT(l.id) DESC""",
            [max: 10]
        ).collect { [fullName: it[0]?.fullName, department: it[0]?.department, count: it[1]] }

        render([
            leavesByDepartment: leavesByDepartment,
            leavesByMonth     : leavesByMonth,
            topEmployees      : topEmployees
        ] as grails.converters.JSON)
    }

}