<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>My Leave History</title>
</head>
<body>
<div class="d-flex justify-content-between align-items-center mb-4">
    <h3><i class="bi bi-calendar3"></i> My Leave History</h3>
    <g:link controller="leave" action="apply" class="btn btn-primary">
        <i class="bi bi-plus-circle"></i> Apply Leave
    </g:link>
</div>

<div class="card shadow-sm">
    <div class="card-body p-0">
        <table class="table table-hover mb-0">
            <thead class="table-light">
            <tr>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <g:each in="${leaves}" var="leave">
                <tr>
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
                        <span class="badge
                            ${leave.status == 'Approved' ? 'bg-success' :
                              leave.status == 'Rejected' ? 'bg-danger' :
                              leave.status == 'Cancelled' ? 'bg-secondary' :
                              'bg-warning text-dark'}">
                            ${leave.status}
                        </span>
                    </td>
                    <td>${leave.remarks ?: '-'}</td>
                    <td>
                        <g:if test="${leave.status == 'Pending'}">
                            <g:link controller="leave" action="cancel"
                                    id="${leave.id}"
                                    class="btn btn-sm btn-outline-danger"
                                    onclick="return confirm('Cancel this leave request?')">
                                <i class="bi bi-x-circle"></i> Cancel
                            </g:link>
                        </g:if>
                    </td>
                </tr>
            </g:each>
            <g:if test="${!leaves}">
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        No leave requests found.
                    </td>
                </tr>
            </g:if>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>