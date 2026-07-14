import './DashboardONG.css';
import SiteLayout from '../../components/SiteLayout';
import { Link } from 'react-router-dom';

// Componente do Dashboard da ONG
// Interface para ONGs gerenciarem seus animais cadastrados e solicitações de adoção
function DashboardONG() {
  return (
    <SiteLayout>
      {/* 
        Tag main indicando o conteúdo principal da página.
        O id "conteudo-principal" permite que o link de acessibilidade (skip link) pule direto para cá.
        O tabIndex={-1} permite que este bloco receba foco por teclado para facilitar a navegação.
      */}
      <main id="conteudo-principal" className="dashboard-page" tabIndex={-1}>

        {/* Cabeçalho do dashboard com título e botão de ação principal */}
        <section className="dashboard-header">
          <div className="dashboard-header-text">
            <h1>Painel da ONG</h1>
            <p>Gerencie seus animais cadastrados e acompanhe solicitações de adoção.</p>
          </div>

          <Link to="/cadastrar-animal" className="dashboard-button">
            <span aria-hidden="true">＋</span> Cadastrar novo animal
          </Link>
        </section>

        {/* Faixa de indicadores (KPIs) para dar o aspecto de painel/dashboard */}
        <section className="dashboard-stats" aria-label="Resumo da ONG">
          <div className="dashboard-stat">
            <span className="dashboard-stat-icon" aria-hidden="true">🐾</span>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-value">12</span>
              <span className="dashboard-stat-label">Animais cadastrados</span>
            </div>
          </div>

          <div className="dashboard-stat">
            <span className="dashboard-stat-icon" aria-hidden="true">📩</span>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-value">5</span>
              <span className="dashboard-stat-label">Solicitações pendentes</span>
            </div>
          </div>

          <div className="dashboard-stat">
            <span className="dashboard-stat-icon" aria-hidden="true">❤️</span>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-value">8</span>
              <span className="dashboard-stat-label">Adotados com sucesso</span>
            </div>
          </div>

          <div className="dashboard-stat">
            <span className="dashboard-stat-icon" aria-hidden="true">🎯</span>
            <div className="dashboard-stat-info">
              <span className="dashboard-stat-value">73%</span>
              <span className="dashboard-stat-label">Taxa de adoção</span>
            </div>
          </div>
        </section>

        {/* Seção de acesso rápido com os cards de funcionalidades do dashboard */}
        <section className="dashboard-section">
          <h2 className="dashboard-section-title">Acesso rápido</h2>

          <div className="dashboard-cards">

            {/* Card para visualização dos animais cadastrados pela ONG */}
            <div className="dashboard-card">
              <span className="dashboard-card-icon" aria-hidden="true">🐶</span>
              <h2>Meus Animais</h2>
              <p>Visualize, edite ou remova os animais cadastrados pela sua ONG.</p>
              <Link to="/meus-animais" className="dashboard-card-button">
                Meus Animais
              </Link>
            </div>

            {/* Card para gerenciamento de solicitações de adoção */}
            <div className="dashboard-card">
              <span className="dashboard-card-icon" aria-hidden="true">📋</span>
              <h2>Solicitações</h2>
              <p>Acompanhe pedidos de adoção e aprove ou recuse solicitações.</p>
              <Link
                to="/solicitacoes-recebidas"
                className="dashboard-card-button"
              >
                Ver solicitações
              </Link>
            </div>

            {/* Card para planejamento de campanhas e ações */}
            <div className="dashboard-card">
              <span className="dashboard-card-icon" aria-hidden="true">📣</span>
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

export default DashboardONG;
