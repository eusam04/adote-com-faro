import './PainelProtetor.css';
import SiteLayout from '../../components/SiteLayout';
import { Link } from 'react-router-dom';

function PainelProtetor() {
  return (
    <SiteLayout>
      <main className="painel-page" id="conteudo-principal">

        <section className="painel-header">
          <div className="painel-header-text">
            <h1>Meu Painel</h1>

            <p>
              Acompanhe suas solicitações de adoção e gerencie animais
              cadastrados como cuidador independente.
            </p>
          </div>

          <Link to="/cadastrar-animal" className="painel-header-button">
            <span aria-hidden="true">＋</span> Cadastrar novo animal
          </Link>
        </section>

        <section className="painel-stats" aria-label="Resumo do protetor">
          <div className="painel-stat">
            <span className="painel-stat-icon" aria-hidden="true">🐾</span>
            <div className="painel-stat-info">
              <span className="painel-stat-value">9</span>
              <span className="painel-stat-label">Animais cadastrados</span>
            </div>
          </div>

          <div className="painel-stat">
            <span className="painel-stat-icon" aria-hidden="true">📨</span>
            <div className="painel-stat-info">
              <span className="painel-stat-value">3</span>
              <span className="painel-stat-label">Minhas solicitações</span>
            </div>
          </div>

          <div className="painel-stat">
            <span className="painel-stat-icon" aria-hidden="true">❤️</span>
            <div className="painel-stat-info">
              <span className="painel-stat-value">6</span>
              <span className="painel-stat-label">Adotados com sucesso</span>
            </div>
          </div>

          <div className="painel-stat">
            <span className="painel-stat-icon" aria-hidden="true">🤝</span>
            <div className="painel-stat-info">
              <span className="painel-stat-value">67%</span>
              <span className="painel-stat-label">Taxa de adoção</span>
            </div>
          </div>
        </section>

        <section className="painel-section">
          <h2 className="painel-section-title">Acesso rápido</h2>

          <div className="painel-cards">

            <div className="painel-card">
              <span className="painel-card-icon" aria-hidden="true">📋</span>
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
              <span className="painel-card-icon" aria-hidden="true">🐶</span>
              <h2>Meus animais cadastrados</h2>
              <p>Gerencie animais resgatados que você colocou para adoção.</p>
              <Link to="/meus-animais" className="painel-button">
                Meus Animais
              </Link>
            </div>

            <div className="painel-card">
              <span className="painel-card-icon" aria-hidden="true">📣</span>
              <h2>Campanhas</h2>
              <p>Organize futuras ações de contribuição, arrecadação e apoio aos animais.</p>
              <button>Em breve</button>
            </div>

          </div>
        </section>

      </main>
    </SiteLayout>
  );
}

export default PainelProtetor;