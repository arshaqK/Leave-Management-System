package com.leavemanagement

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN'])
class ReportController {

    def apiIndex() {
        // Leaves by department (approved only)
        def leavesByDepartment = LeaveRequest.executeQuery(
            """SELECT e.department, COUNT(l.id)
            FROM LeaveRequest l JOIN l.employee e
            WHERE l.status = 'Approved'
            GROUP BY e.department
            ORDER BY COUNT(l.id) DESC"""
        ).collect { [department: it[0], count: it[1]] }

        // Leaves by month (approved only)
        int currentYear = Calendar.getInstance().get(Calendar.YEAR)
        def leavesByMonth = (1..12).collect { month ->
            Calendar startCal = Calendar.getInstance()
            startCal.set(currentYear, month - 1, 1, 0, 0, 0)
            startCal.set(Calendar.MILLISECOND, 0)

            Calendar endCal = Calendar.getInstance()
            endCal.set(currentYear, month - 1,
                startCal.getActualMaximum(Calendar.DAY_OF_MONTH), 23, 59, 59)

            Long count = LeaveRequest.executeQuery(
                """SELECT COUNT(l.id) FROM LeaveRequest l
                WHERE l.status = 'Approved'
                AND l.startDate >= :start
                AND l.startDate <= :end""",
                [start: startCal.time, end: endCal.time]
            )[0] as Long

            count > 0 ? [month: month, count: count] : null
        }.findAll { it != null }

        // Top employees (approved only)
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