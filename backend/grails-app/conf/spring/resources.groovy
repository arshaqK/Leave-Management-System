import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.core.Ordered
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

beans = {
    corsFilter(FilterRegistrationBean) {
        CorsConfiguration config = new CorsConfiguration()
        config.allowedOrigins = [
            'http://172.19.174.148:5173',
            'http://localhost:5173'
        ]
        config.allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD']
        config.allowedHeaders = ['*']
        config.allowCredentials = true
        config.maxAge = 3600L
        config.exposedHeaders = ['Set-Cookie']

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration('/**', config)

        filter = new CorsFilter(source)
        order = Ordered.HIGHEST_PRECEDENCE
    }
}