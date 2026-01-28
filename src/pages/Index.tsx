import { Navigate } from "react-router-dom";

// Redirect old Index route to Login
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
