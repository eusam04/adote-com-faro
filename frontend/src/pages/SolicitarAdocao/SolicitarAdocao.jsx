import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SiteLayout from '../../components/SiteLayout';

import api from '../../services/api';
import './SolicitarAdocao.css';

function SolicitarAdocao() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [aviso, setAviso] = useState('');

  async function enviarSolicitacao(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');

    try {
      await api.post(
        '/solicitacoes',
        {
          id_animal: id,
          telefone,
          mensagem
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAviso('Solicitação enviada com sucesso!');

      setTimeout(() => {
        navigate('/animais');
      }, 1500);

    } catch (error) {
      console.log(error);

      setAviso('Erro ao enviar solicitação.');

      setTimeout(() => {
        setAviso('');
      }, 3000);
    }
  }

  return (
    <SiteLayout>

      <main
        className="solicitar-adocao-page"
        id="conteudo-principal"
      >

      {
        aviso && (
          <p className="mensagem-solicitacao">
            {aviso}
          </p>
        )
      }

      <section className="solicitar-adocao-container">

        <button
          type="button"
          className="solicitar-adocao-fechar"
          onClick={() => navigate('/animais')}
          aria-label="Fechar e voltar"
        >
          &times;
        </button>

        <div className="solicitar-adocao-info">
          <h1>Solicitação de Adoção</h1>

          <p>
            Conte um pouco sobre você e por que gostaria de adotar este
            animal. Essas informações ajudarão a ONG ou cuidador a analisar
            sua solicitação.
          </p>
        </div>

        <form
          className="solicitar-adocao-form"
          onSubmit={enviarSolicitacao}
        >

          <div className="form-group">
            <label htmlFor="telefone">
              Telefone para contato
            </label>

            <input
              type="tel"
              id="telefone"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(event) => setTelefone(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mensagem">
              Por que você deseja adotar este animal?
            </label>

            <textarea
              id="mensagem"
              rows="6"
              placeholder="Conte um pouco sobre sua rotina, experiência com animais e o motivo da adoção..."
              value={mensagem}
              onChange={(event) => setMensagem(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="solicitar-adocao-button"
          >
            Enviar Solicitação
          </button>

        </form>

      </section>

    </main>

    </SiteLayout>
  );
}

export default SolicitarAdocao;