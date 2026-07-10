import './PainelProtetor.css';
import SiteLayout from '../../components/SiteLayout';
import { Link } from 'react-router-dom';

function PainelProtetor() {
  return (
    <SiteLayout>
      <main className="painel-page" id="conteudo-principal">

        <section className="painel-header">
          <h1>Meu Painel</h1>

          <p>
            Acompanhe suas solicitações de adoção e gerencie animais
            cadastrados como cuidador independente.
          </p>

          <Link to="/cadastrar-animal" className="painel-header-button">
            Cadastrar novo animal
          </Link>
        </section>

        <section className="painel-cards">

          <div className="painel-card">
            <h2>Minhas solicitações</h2>
            <p>Veja os animais que você solicitou para adoção.</p>
            <Link
              to="/solicitacoes-recebidas"
              className="painel-button"
            >
              Ver solicitações
            </Link>
          </div>

          <div className="painel-card">
            <h2>Meus animais cadastrados</h2>
            <p>Gerencie animais resgatados que você colocou para adoção.</p>
            <Link to="/meus-animais" className="painel-button">
              Meus Animais
            </Link>
          </div>

          <div className="painel-card">
            <h2>Campanhas</h2>
            <p>Organize futuras ações de contribuição, arrecadação e apoio aos animais.</p>
            <button>Em breve</button>
          </div>

        </section>

      </main>
    </SiteLayout>
  );
}

export default PainelProtetor;