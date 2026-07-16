import { useNavigate } from 'react-router-dom';

// Botão de sair reutilizável.
// Ao clicar, remove o token e os dados do usuário do localStorage
// e redireciona o usuário para a página inicial (Home).
function BotaoSair() {
  const navigate = useNavigate();

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  }

  return (
    <button
      type="button"
      className="botao-sair"
      onClick={sair}
    >
      Sair
    </button>
  );
}

export default BotaoSair;
