<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Apply for Leave</title>
</head>
<body>
<div class="row justify-content-center">
    <div class="col-md-6">
        <div class="card shadow-sm">
            <div class="card-header bg-white fw-semibold">
                <i class="bi bi-plus-circle"></i> Apply for Leave
            </div>
            <div class="card-body">
                <g:form controller="leave" action="save" method="post">
                    <div class="mb-3">
                        <label class="form-label">Leave Type</label>
                        <select name="leaveType" class="form-select" required>
                            <option value="">-- Select Type --</option>
                            <g:each in="${leaveTypes}" var="type">
                                <option value="${type}">${type}</option>
                            </g:each>
                        </select>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label">Start Date</label>
                            <input type="date" name="startDate"
                                   class="form-control" required/>
                        </div>
                        <div class="col">
                            <label class="form-label">End Date</label>
                            <input type="date" name="endDate"
                                   class="form-control" required/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">
                            Reason
                            <small class="text-muted">(min 10 characters)</small>
                        </label>
                        <textarea name="reason" class="form-control"
                                  rows="4" required minlength="10"
                                  placeholder="Please provide a reason..."></textarea>
                    </div>
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-send"></i> Submit Request
                        </button>
                        <g:link controller="leave" action="index"
                                class="btn btn-outline-secondary">
                            Cancel
                        </g:link>
                    </div>
                </g:form>
            </div>
        </div>
    </div>
</div>
</body>
</html>