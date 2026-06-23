package com.leavemanagement

import grails.gorm.transactions.Transactional
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.SimpleMailMessage

import org.springframework.beans.factory.annotation.Value

@Transactional
class EmailService {

    JavaMailSender mailSender

    @Value('${spring.mail.username}')
    String fromEmail

    private String formatDate(Date date) {
        if (!date) return ''
        new java.text.SimpleDateFormat("dd-MM-yyyy").format(date)
    }

    void sendLeaveSubmitted(LeaveRequest leave) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage()
            msg.from = fromEmail
            msg.to = leave.employee.email
            msg.subject = "Leave Request Submitted"
            msg.text = """
                Dear ${leave.employee.fullName},

                Your leave request has been submitted successfully.

                Type: ${leave.leaveType}
                From: ${formatDate(leave.startDate)}
                To:   ${formatDate(leave.endDate)}
                Reason: ${leave.reason}

                Status: Pending

                Regards,
                Admin
                """
            mailSender.send(msg)
        } catch (Exception e) {
            log.error("Email sending failed", e)
        }
    }

    void sendLeaveApproved(LeaveRequest leave) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage()
            msg.from = fromEmail
            msg.to = leave.employee.email
            msg.subject = "Leave Request Approved"
            msg.text = """
                Dear ${leave.employee.fullName},

                Your leave request has been APPROVED.

                Type: ${leave.leaveType}
                From: ${formatDate(leave.startDate)}
                To:   ${formatDate(leave.endDate)}
                Remarks: ${leave.remarks ?: 'N/A'}

                Regards,
                Admin
                """
            mailSender.send(msg)
        } catch (Exception e) {
            log.error("Email sending failed", e)
        }
    }

    void sendLeaveRejected(LeaveRequest leave) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage()
            msg.from = fromEmail
            msg.to = leave.employee.email
            msg.subject = "Leave Request Rejected"
            msg.text = """
                Dear ${leave.employee.fullName},

                Your leave request has been REJECTED.

                Type: ${leave.leaveType}
                From: ${formatDate(leave.startDate)}
                To:   ${formatDate(leave.endDate)}
                Remarks: ${leave.remarks ?: 'N/A'}

                Regards,
                Admin
                """
            mailSender.send(msg)
        } catch (Exception e) {
            log.error("Email sending failed", e)
        }
    }
}