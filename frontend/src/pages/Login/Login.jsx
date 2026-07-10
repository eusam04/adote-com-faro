import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SiteLayout from '../../components/SiteLayout';

import api from '../../services/api';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function fazerLogin(event) {
    event.preventDefault();

    try {

      const response = await api.post('/login', {
        email,
        senha
      });
    
      localStorage.setItem('token', response.data.token);
      localStorage.setItem(
        'usuario',
        JSON.stringify(response.data.usuario)
      );
    
      setMensagem('Login realizado com sucesso!');
    
      setTimeout(() => {

        const redirectTo = location.state?.redirectTo;
      
        if (redirectTo) {
          navigate(redirectTo);
          return;
        }
      
        const tipoUsuario = response.data.usuario.tipo;
      
        if (tipoUsuario === 'ong') {
          navigate('/dashboard');
        }
      
        else if (tipoUsuario === 'cuidador') {
          navigate('/painel-protetor');
        }
      
        else {
          navigate('/painel-usuario');
        }
      
      }, 1500);
    
    } catch (error) {
      console.log(error);
    
      setMensagem('E-mail ou senha incorretos.');
    
      setTimeout(() => {
        setMensagem('');
      }, 3000);
    }

  }

  return (
    <SiteLayout>

      <main id="conteudo-principal" className="login-page" tabIndex={-1}>

      {
        mensagem && (
          <p className="mensagem-login">
            {mensagem}
          </p>
        )
      }

      <section className="login-container">

        <div className="login-info">
          <h1>Bem-vindo de volta</h1>

          <p>
            Entre na sua conta para continuar ajudando animais,
            acompanhar solicitações e fazer parte dessa rede de cuidado.
          </p>
        </div>

        <form className="login-form" onSubmit={fazerLogin}>

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

          <div className="form-group">
            <label htmlFor="senha">Senha</label>

            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>

          <p className="login-cadastro">
            Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>

        </form>

      </section>

    </main>

    </SiteLayout>
  );
}

export default Login;