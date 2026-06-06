import { useEffect, useState } from 'react';

import api from '../../services/api';
import './SolicitacoesRecebidas.css';

function SolicitacoesRecebidas() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [mensagem, setMensagem] = useState('');

  async function carregarSolicitacoes() {
    const token = localStorage.getItem('token');

    try {
      const response = await api.get('/minhas-solicitacoes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSolicitacoes(response.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  async function atualizarStatus(id, status) {
    const token = localStorage.getItem('token');

    try {
      await api.put(
        `/solicitacoes/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMensagem(
        status === 'aprovado'
          ? 'Solicitação aprovada com sucesso!'
          : 'Solicitação recusada com sucesso!'
      );

      carregarSolicitacoes();

      setTimeout(() => {
        setMensagem('');
      }, 3000);

    } catch (error) {
      console.log(error);

      setMensagem('Erro ao atualizar solicitação.');

      setTimeout(() => {
        setMensagem('');
      }, 3000);
    }
  }

  return (
    <main className="solicitacoes-page" id="conteudo-principal">

      {
        mensagem && (
          <p className="mensagem-solicitacoes">
            {mensagem}
          </p>
        )
      }

      <section className="solicitacoes-header">
        <h1>Solicitações Recebidas</h1>

        <p>
          Veja os pedidos de adoção enviados para os animais que você cadastrou.
        </p>
      </section>

      <section className="solicitacoes-lista">

        {solicitacoes.length === 0 && (
          <p className="solicitacoes-vazio">
            Nenhuma solicitação recebida até o momento.
          </p>
        )}

        {solicitacoes.map((solicitacao) => (
          <article
            key={solicitacao.id}
            className="solicitacao-card"
          >
            <h2>{solicitacao.animal}</h2>

            <p>
              <strong>Solicitante:</strong> {solicitacao.usuario}
            </p>

            <p>
              <strong>Telefone:</strong> {solicitacao.telefone}
            </p>

            <p>
              <strong>Mensagem:</strong> {solicitacao.mensagem}
            </p>

            <p>
              <strong>Status:</strong> {solicitacao.status}
            </p>

            {solicitacao.status === 'pendente' && (
              <div className="solicitacao-actions">
                <button
                  onClick={() => atualizarStatus(solicitacao.id, 'aprovado')}
                >
                  Aprovar
                </button>

                <button
                  onClick={() => atualizarStatus(solicitacao.id, 'recusado')}
                >
                  Recusar
                </button>
              </div>
            )}
          </article>
        ))}

      </section>

    </main>
  );
}

export default SolicitacoesRecebidas;