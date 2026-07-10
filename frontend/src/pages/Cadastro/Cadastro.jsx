import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SiteLayout from '../../components/SiteLayout';

import api from '../../services/api';
import './Cadastro.css';

// Componente da Página de Cadastro
// Permite que novos usuários se cadastrem no sistema como adotantes, cuidadores ou ONGs
function Cadastro() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [mensagem, setMensagem] = useState('');

  /**
   * Função de submissão do formulário de cadastro
   * Previne o comportamento padrão de recarregamento da página
   * Envia os dados do formulário para o backend via POST /usuarios
   * Em caso de sucesso, redireciona para a página de login após 2 segundos
   * Em caso de erro, exibe alerta ao usuário
   */
  async function cadastrarUsuario(event) {
    event.preventDefault();

    try {
      await api.post('/usuarios', {
        nome,
        email,
        senha,
        tipo
      });

      setMensagem('Cadastro realizado com sucesso!');

      setTimeout(() => {

        navigate(
          '/login',
          {
            state: location.state
          }
        );

      }, 2000);

    } catch (error) {
      console.log(error);
      alert('Erro ao realizar cadastro.');
    }
  }

  return (
    <SiteLayout>

      <main className="cadastro-page" id="conteudo-principal" tabIndex={-1}>

        {
          mensagem && (
            <p className="mensagem-sucesso">
              {mensagem}
            </p>
          )
        }

        {/* 
          Container principal do cadastro
          Divide a página em duas seções: informações sobre o projeto e formulário de cadastro
        */}

        <section className="cadastro-container">

          {/* Informações sobre o projeto Adote com Faro */}
          <div className="cadastro-info">
            <h1>Crie sua conta</h1>

            <p>
              Faça parte do Adote com Faro como adotante, cuidador independente
              ou ONG. Juntos, podemos conectar animais a novos lares.
            </p>
          </div>

          {/* Formulário de cadastro de usuário */}
          <form className="cadastro-form" onSubmit={cadastrarUsuario}>

            {/* Campo de entrada para o nome do usuário */}
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </div>

            {/* Campo de entrada para o email do usuário */}
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            {/* Campo de entrada para a senha do usuário */}
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                placeholder="Crie uma senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>

            {/* Seleção do tipo de conta (usuário/cuidador ou ONG) */}
            <div className="form-group">
              <label htmlFor="tipo">Tipo de conta</label>
              <select
                id="tipo"
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
              >
                <option value="">Selecione seu perfil</option>
                <option value="usuario">Usuário comum</option>
                <option value="cuidador">Cuidador independente</option>
                <option value="ong">ONG / Associação protetora</option>
              </select>
            </div>

            <button type="submit" className="cadastro-button">
              Criar conta
            </button>

            {/* Link para página de login para usuários que já têm conta */}
            <p className="cadastro-login">
              Já tem uma conta?{' '}
              <Link
                to="/login"
                state={location.state}
              >
                Entrar
              </Link>
            </p>

          </form>

        </section>

      </main>

    </SiteLayout>
  );
}

export default Cadastro;