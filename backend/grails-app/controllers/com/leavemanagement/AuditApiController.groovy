package com.leavemanagement

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN'])
class AuditApiController {

    def index() {
        def logs = AuditLog.createCriteria().list(max: 10, sort: 'dateCreated', order: 'desc') {}
        render logs as JSON
    }

    def all() {
        def logs = AuditLog.createCriteria().list(sort: 'dateCreated', order: 'desc') {}
        render logs as JSON
    }
}