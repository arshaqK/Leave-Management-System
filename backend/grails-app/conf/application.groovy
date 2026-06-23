// Spring Security Core configuration
grails.plugin.springsecurity.userLookup.userDomainClassName = 'com.leavemanagement.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'com.leavemanagement.UserRole'
grails.plugin.springsecurity.authority.className = 'com.leavemanagement.Role'

grails.plugin.springsecurity.logout.postOnly = false
grails.plugin.springsecurity.logout.afterLogoutUrl = '/auth/login'
grails.plugin.springsecurity.auth.loginFormUrl = '/auth/login'
grails.plugin.springsecurity.failureHandler.defaultFailureUrl = '/auth/login?error=true'
grails.plugin.springsecurity.successHandler.defaultTargetUrl = '/dashboard/index'

grails.plugin.springsecurity.controllerAnnotations.staticRules = [
    [pattern: '/',                 access: ['permitAll']],
    [pattern: '/error',            access: ['permitAll']],
    [pattern: '/auth/**',          access: ['permitAll']],
    [pattern: '/login/**',         access: ['permitAll']],
    [pattern: '/logout/**',        access: ['permitAll']],
    [pattern: '/assets/**',        access: ['permitAll']],
    [pattern: '/**/js/**',         access: ['permitAll']],
    [pattern: '/**/css/**',        access: ['permitAll']],
    [pattern: '/**/images/**',     access: ['permitAll']],
    [pattern: '/**/favicon.ico',   access: ['permitAll']],
    [pattern: '/employee/**',      access: ['ROLE_ADMIN']],
    [pattern: '/api/employees/**', access: ['ROLE_ADMIN']],
    [pattern: '/report/**',        access: ['ROLE_ADMIN']],
    [pattern: '/dashboard/**',     access: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']],
    [pattern: '/leave/**',         access: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']],
    [pattern: '/api/leaves/**',    access: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']],
    [pattern: '/api/me', access: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']],
    [pattern: '/api/dashboard/**', access: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']],
    [pattern: '/api/reports', access: ['ROLE_ADMIN']],
    [pattern: '/api/audit/**', access: ['ROLE_ADMIN']],
]

grails.plugin.springsecurity.filterChain.chainMap = [
    [pattern: '/assets/**',      filters: 'none'],
    [pattern: '/**/js/**',       filters: 'none'],
    [pattern: '/**/css/**',      filters: 'none'],
    [pattern: '/**/images/**',   filters: 'none'],
    [pattern: '/**/favicon.ico', filters: 'none'],
    [pattern: '/**',             filters: 'JOINED_FILTERS'],
]

grails.plugin.springsecurity.corsFilter.enabled = true