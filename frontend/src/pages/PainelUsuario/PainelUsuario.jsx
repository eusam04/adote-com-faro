import { Link } from 'react-router-dom';
import SiteLayout from '../../components/SiteLayout';
import './PainelUsuario.css';

function PainelUsuario() {
  return (
    <SiteLayout>
      <main className="painel-usuario-page site-main" id="conteudo-principal" tabIndex={-1}>

      <section className="painel-usuario-header">
        <h1>Meu Painel</h1>

        <p>
          Acompanhe suas solicitações e encontre animais disponíveis para adoção.
        </p>
      </section>

      <section className="painel-usuario-cards">

        <article className="painel-usuario-card">
          <h2>Ver animais</h2>
          <p>Conheça os animais disponíveis e encontre seu novo companheiro.</p>

          <Link to="/animais" className="painel-usuario-button">
            Ver animais
          </Link>
        </article>

        <article className="painel-usuario-card">
          <h2>Minhas solicitações</h2>
          <p>Acompanhe o status dos seus pedidos de adoção.</p>

          <Link to="/minhas-solicitacoes" className="painel-usuario-button">
            Ver solicitações
          </Link>
        </article>

      </section>

</main>
    </SiteLayout>
  );
}

export default PainelUsuario;