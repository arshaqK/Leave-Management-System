package com.leavemanagement

import grails.gorm.transactions.Transactional
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.SimpleMailMessage

@Transactional
class EmailService {

    JavaMailSender mailSender

    void sendLeaveSubmitted(LeaveRequest leave) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage()
            msg.to = leave.employee.email
            msg.subject = "Leave Request Submitted"
            msg.text = """
                Dear ${leave.employee.fullName},

                Your leave request has been submitted successfully.

                Type: ${leave.leaveType}
                From: ${leave.startDate.format('dd-MM-yyyy')}
                To:   ${leave.endDate.format('dd-MM-yyyy')}
                Reason: ${leave.reason}

                Status: Pending

                Regards,
                Leave Management System
                """
            mailSender.send(msg)
        } catch (Exception e) {
            log.warn("Email sending failed: ${e.message}")
        }
    }

    void sendLeaveApproved(LeaveRequest leave) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage()
            msg.to = leave.employee.email
            msg.subject = "Leave Request Approved"
            msg.text = """
                Dear ${leave.employee.fullName},

                Your leave request has been APPROVED.

                Type: ${leave.leaveType}
                From: ${leave.startDate.format('dd-MM-yyyy')}
                To:   ${leave.endDate.format('dd-MM-yyyy')}
                Remarks: ${leave.remarks ?: 'N/A'}

                Regards,
                Leave Management System
                """
            mailSender.send(msg)
        } catch (Exception e) {
            log.warn("Email sending failed: ${e.message}")
        }
    }

    void sendLeaveRejected(LeaveRequest leave) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage()
            msg.to = leave.employee.email
            msg.subject = "Leave Request Rejected"
            msg.text = """
                Dear ${leave.employee.fullName},

                Your leave request has been REJECTED.

                Type: ${leave.leaveType}
                From: ${leave.startDate.format('dd-MM-yyyy')}
                To:   ${leave.endDate.format('dd-MM-yyyy')}
                Remarks: ${leave.remarks ?: 'N/A'}

                Regards,
                Leave Management System
                """
            mailSender.send(msg)
        } catch (Exception e) {
            log.warn("Email sending failed: ${e.message}")
        }
    }
}