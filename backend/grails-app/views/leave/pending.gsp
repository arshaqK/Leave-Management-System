<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Pending Leave Requests</title>
</head>
<body>
<h3 class="mb-4">
    <i class="bi bi-clock-history"></i> Pending Leave Requests
</h3>

<div class="card shadow-sm">
    <div class="card-body p-0">
        <table class="table table-hover mb-0">
            <thead class="table-light">
            <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Applied On</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <g:each in="${leaves}" var="leave">
                <tr>
                    <td>${leave.employee?.fullName}</td>
                    <td>${leave.employee?.department}</td>
                    <td>${leave.leaveType}</td>
                    <td>
                        <g:formatDate date="${leave.startDate}"
                                      format="dd-MM-yyyy"/>
                    </td>
                    <td>
                        <g:formatDate date="${leave.endDate}"
                                      format="dd-MM-yyyy"/>
                    </td>
                    <td>${leave.reason}</td>
                    <td>
                        <g:formatDate date="${leave.dateCreated}"
                                      format="dd-MM-yyyy"/>
                    </td>
                    <td>
                        <button type="button" class="btn btn-sm btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#approveModal${leave.id}">
                            <i class="bi bi-check-circle"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#rejectModal${leave.id}">
                            <i class="bi bi-x-circle"></i>
                        </button>

                        <!-- Approve Modal -->
                        <div class="modal fade" id="approveModal${leave.id}">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Approve Leave</h5>
                                        <button type="button" class="btn-close"
                                                data-bs-dismiss="modal"></button>
                                    </div>
                                    <g:form controller="leave" action="approve"
                                            id="${leave.id}" method="post">
                                        <div class="modal-body">
                                            <p>Approving leave for
                                                <strong>${leave.employee?.fullName}</strong>
                                            </p>
                                            <label class="form-label">
                                                Remarks (optional)
                                            </label>
                                            <textarea name="remarks"
                                                      class="form-control"
                                                      rows="3"></textarea>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button"
                                                    class="btn btn-secondary"
                                                    data-bs-dismiss="modal">
                                                Cancel
                                            </button>
                                            <button type="submit"
                                                    class="btn btn-success">
                                                Approve
                                            </button>
                                        </div>
                                    </g:form>
                                </div>
                            </div>
                        </div>

                        <!-- Reject Modal -->
                        <div class="modal fade" id="rejectModal${leave.id}">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Reject Leave</h5>
                                        <button type="button" class="btn-close"
                                                data-bs-dismiss="modal"></button>
                                    </div>
                                    <g:form controller="leave" action="reject"
                                            id="${leave.id}" method="post">
                                        <div class="modal-body">
                                            <p>Rejecting leave for
                                                <strong>${leave.employee?.fullName}</strong>
                                            </p>
                                            <label class="form-label">
                                                Remarks (required)
                                            </label>
                                            <textarea name="remarks"
                                                      class="form-control"
                                                      rows="3" required></textarea>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button"
                                                    class="btn btn-secondary"
                                                    data-bs-dismiss="modal">
                                                Cancel
                                            </button>
                                            <button type="submit"
                                                    class="btn btn-danger">
                                                Reject
                                            </button>
                                        </div>
                                    </g:form>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </g:each>
            <g:if test="${!leaves}">
                <tr>
                    <td colspan="8" class="text-center text-muted py-4">
                        No pending leave requests.
                    </td>
                </tr>
            </g:if>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>