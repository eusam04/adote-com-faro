import { Navigate } from 'react-router-dom';

// Componente que protege rotas que exigem login.
// Se não houver token no localStorage, redireciona para a página de login.
// Caso contrário, renderiza a página solicitada (passada em 'element').
function RotaProtegida({ element }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
}

export default RotaProtegida;
