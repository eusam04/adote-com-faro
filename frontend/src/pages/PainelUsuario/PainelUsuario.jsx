import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from '../../components/SiteLayout';
import api from '../../services/api';
import './PainelUsuario.css';

function PainelUsuario() {
  const [dados, setDados] = useState({
    minhas: 0,
    analise: 0,
    aprovadas: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function carregarDados() {
      try {
        const minhas = await api.get('/minhas-solicitacoes-usuario', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const solicitacoes = minhas.data;

        setDados({
          minhas: solicitacoes.length,
          analise: solicitacoes.filter(s => s.status === 'pendente').length,
          aprovadas: solicitacoes.filter(s => s.status === 'aprovado').length
        });
      } catch (error) {
        console.log(error);
      }
    }

    carregarDados();
  }, []);

  return (
    <SiteLayout>
      <main className="painel-usuario-page site-main" id="conteudo-principal" tabIndex={-1}>

        <section className="painel-usuario-header">
          <div className="painel-usuario-header-text">
            <h1>Meu Painel</h1>

            <p>
              Acompanhe suas solicitações e encontre animais disponíveis para adoção.
            </p>
          </div>
        </section>

        <section className="painel-usuario-stats" aria-label="Resumo do adotante">
          <div className="painel-usuario-stat">
            <span className="painel-usuario-stat-icon" aria-hidden="true">📨</span>
            <div className="painel-usuario-stat-info">
              <span className="painel-usuario-stat-value">{dados.minhas}</span>
              <span className="painel-usuario-stat-label">Minhas solicitações</span>
            </div>
          </div>

          <div className="painel-usuario-stat">
            <span className="painel-usuario-stat-icon" aria-hidden="true">⏳</span>
            <div className="painel-usuario-stat-info">
              <span className="painel-usuario-stat-value">{dados.analise}</span>
              <span className="painel-usuario-stat-label">Em análise</span>
            </div>
          </div>

          <div className="painel-usuario-stat">
            <span className="painel-usuario-stat-icon" aria-hidden="true">❤️</span>
            <div className="painel-usuario-stat-info">
              <span className="painel-usuario-stat-value">{dados.aprovadas}</span>
              <span className="painel-usuario-stat-label">Aprovadas</span>
            </div>
          </div>
        </section>

        <section className="painel-usuario-section">
          <h2 className="painel-usuario-section-title">Acesso rápido</h2>

          <div className="painel-usuario-cards">

            <article className="painel-usuario-card">
              <span className="painel-usuario-card-icon" aria-hidden="true">🐶</span>
              <h2>Ver animais</h2>
              <p>Conheça os animais disponíveis e encontre seu novo companheiro.</p>

              <Link to="/animais" state={{ from: '/painel-usuario' }} className="painel-usuario-button">
                Ver animais
              </Link>
            </article>

            <article className="painel-usuario-card">
              <span className="painel-usuario-card-icon" aria-hidden="true">📋</span>
              <h2>Minhas solicitações</h2>
              <p>Acompanhe o status dos seus pedidos de adoção.</p>

              <Link to="/minhas-solicitacoes" state={{ from: '/painel-usuario' }} className="painel-usuario-button">
                Ver solicitações
              </Link>
            </article>

          </div>
        </section>

      </main>
    </SiteLayout>
  );
}

export default PainelUsuario;