package com.leavemanagement

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN'])
class ReportController {

    def index() {
        // Leaves by department
        def leavesByDepartment = LeaveRequest.createCriteria().list {
            join 'employee'
            projections {
                groupProperty('employee.department')
                count('id')
            }
        }

        // Leaves by month (current year)
        def currentYear = new Date()[Calendar.YEAR]
        def leavesByMonth = LeaveRequest.createCriteria().list {
            sqlRestriction("YEAR(start_date) = ${currentYear}")
            projections {
                sqlGroupProjection(
                    'MONTH(start_date) as month, COUNT(*) as total',
                    'MONTH(start_date)',
                    ['month', 'total'],
                    [org.hibernate.type.StandardBasicTypes.INTEGER,
                     org.hibernate.type.StandardBasicTypes.LONG]
                )
            }
        }

        // Top employees by leave usage
        def topEmployees = LeaveRequest.createCriteria().list {
            projections {
                groupProperty('employee')
                count('id', 'total')
            }
            order('total', 'desc')
            maxResults(10)
        }

        [
            leavesByDepartment: leavesByDepartment,
            leavesByMonth     : leavesByMonth,
            topEmployees      : topEmployees
        ]
    }
}