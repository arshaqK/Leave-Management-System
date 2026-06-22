import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/auth/Login'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard'
import EmployeeList from './pages/employees/EmployeeList'
import EmployeeCreate from './pages/employees/EmployeeCreate'
import EmployeeEdit from './pages/employees/EmployeeEdit'
import LeaveList from './pages/leaves/LeaveList'
import LeaveApply from './pages/leaves/LeaveApply'
import LeavePending from './pages/leaves/LeavePending'
import Reports from './pages/reports/Reports'
import Navbar from './components/Navbar'

function PrivateRoute({ children, roles }) {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" />
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />
  return children
}

function DashboardRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  return user.role === 'ROLE_ADMIN'
    ? <Navigate to="/dashboard/admin" />
    : <Navigate to="/dashboard/employee" />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardRedirect />} />

          <Route path="/dashboard/admin" element={
            <PrivateRoute roles={['ROLE_ADMIN']}>
              <Navbar /><AdminDashboard />
            </PrivateRoute>
          } />

          <Route path="/dashboard/employee" element={
            <PrivateRoute roles={['ROLE_EMPLOYEE']}>
              <Navbar /><EmployeeDashboard />
            </PrivateRoute>
          } />

          <Route path="/employees" element={
            <PrivateRoute roles={['ROLE_ADMIN']}>
              <Navbar /><EmployeeList />
            </PrivateRoute>
          } />

          <Route path="/employees/create" element={
            <PrivateRoute roles={['ROLE_ADMIN']}>
              <Navbar /><EmployeeCreate />
            </PrivateRoute>
          } />

          <Route path="/employees/edit/:id" element={
            <PrivateRoute roles={['ROLE_ADMIN']}>
              <Navbar /><EmployeeEdit />
            </PrivateRoute>
          } />

          <Route path="/leaves" element={
            <PrivateRoute roles={['ROLE_ADMIN', 'ROLE_EMPLOYEE']}>
              <Navbar /><LeaveList />
            </PrivateRoute>
          } />

          <Route path="/leaves/apply" element={
            <PrivateRoute roles={['ROLE_EMPLOYEE']}>
              <Navbar /><LeaveApply />
            </PrivateRoute>
          } />

          <Route path="/leaves/pending" element={
            <PrivateRoute roles={['ROLE_ADMIN']}>
              <Navbar /><LeavePending />
            </PrivateRoute>
          } />

          <Route path="/reports" element={
            <PrivateRoute roles={['ROLE_ADMIN']}>
              <Navbar /><Reports />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}