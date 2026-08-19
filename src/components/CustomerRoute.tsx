import { Navigate, Outlet } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';

export default function CustomerRoute() {
  const { customer } = useCustomer();

  if (!customer) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
