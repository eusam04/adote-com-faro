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
          <div>
            <h1>Painel da ONG</h1>
            <p>Gerencie seus animais cadastrados e acompanhe solicitações de adoção.</p>
          </div>

          <Link to="/cadastrar-animal" className="dashboard-button">
            Cadastrar novo animal
          </Link>
        </section>

        {/* Seção contendo os cards de funcionalidades do dashboard */}
        <section className="dashboard-cards">

          {/* Card para visualização dos animais cadastrados pela ONG */}
          <div className="dashboard-card">
            <h2>Meus Animais</h2>
            <p>Visualize, edite ou remova os animais cadastrados pela sua ONG.</p>
            <button>Ver animais</button>
          </div>

          {/* Card para gerenciamento de solicitações de adoção */}
          <div className="dashboard-card">
            <h2>Solicitações</h2>
            <p>Acompanhe pedidos de adoção e aprove ou recuse solicitações.</p>
            <button>Ver solicitações</button>
          </div>

          {/* Card para planejamento de campanhas e ações */}
          <div className="dashboard-card">
            <h2>Campanhas</h2>
            <p>Organize futuras ações de contribuição, arrecadação e apoio aos animais.</p>
            <button>Em breve</button>
          </div>

        </section>

      </main>
    </SiteLayout>
  );
}

export default DashboardONG;