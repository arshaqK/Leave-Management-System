package com.leavemanagement

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_EMPLOYEE'])
class AuthApiController {

    def springSecurityService
    def employeeService

    def me() {
        User currentUser = springSecurityService.currentUser
        Employee employee = employeeService.getByUser(currentUser)
        boolean isAdmin = currentUser.authorities.any {
            it.authority == 'ROLE_ADMIN'
        }

        render([
                id        : currentUser.id,
                username  : currentUser.username,
                role      : isAdmin ? 'ROLE_ADMIN' : 'ROLE_EMPLOYEE',
                fullName  : employee?.fullName,
                employeeId: employee?.id,
                status    : employee?.status
        ] as JSON)
    }
    
}