import { useLocation } from "react-router-dom";

function register() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedRole = params.get('role');

  return (
    
  )
}