package com.leavemanagement

class AuthController {

    def springSecurityService

    def login() {
        if (springSecurityService.isLoggedIn()) {
            redirect controller: 'dashboard', action: 'index'
            return
        }
        render view: 'login'
    }

    def logout() {
        redirect uri: '/logoff'
    }
}