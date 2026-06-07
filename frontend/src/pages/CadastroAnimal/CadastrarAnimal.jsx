import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import './CadastrarAnimal.css';

function CadastrarAnimal() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [porte, setPorte] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);
  const [mensagem, setMensagem] = useState('');

  async function cadastrarAnimal(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');

    const formData = new FormData();

    formData.append('nome', nome);
    formData.append('idade', idade);
    formData.append('porte', porte);
    formData.append('descricao', descricao);
    formData.append('foto', foto);

    try {
      await api.post('/animais', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMensagem('Animal cadastrado com sucesso!');

      setTimeout(() => {
        navigate('/meus-animais');
      }, 1500);

    } catch (error) {
      console.log(error);
      setMensagem('Erro ao cadastrar animal.');
    }
  }

  return (
    <main className="cadastrar-animal-page" id="conteudo-principal">

      {
        mensagem && (
          <p className="mensagem-cadastrar-animal">
            {mensagem}
          </p>
        )
      }

      <section className="cadastrar-animal-container">

        <div className="cadastrar-animal-info">
          <h1>Cadastrar animal</h1>

          <p>
            Preencha as informações do animal para ajudá-lo a encontrar
            um novo lar com carinho e responsabilidade.
          </p>
        </div>

        <form className="cadastrar-animal-form" onSubmit={cadastrarAnimal}>

          <div className="form-group">
            <label htmlFor="nome">Nome do animal</label>
            <input
              type="text"
              id="nome"
              placeholder="Ex: Luna"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="idade">Idade</label>
            <input
              type="number"
              id="idade"
              placeholder="Ex: 2"
              value={idade}
              onChange={(event) => setIdade(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="porte">Porte</label>
            <select
              id="porte"
              value={porte}
              onChange={(event) => setPorte(event.target.value)}
            >
              <option value="">Selecione o porte</option>
              <option value="pequeno">Pequeno</option>
              <option value="medio">Médio</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              placeholder="Conte um pouco sobre o animal"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="foto">Foto do animal</label>
            <input
              type="file"
              id="foto"
              accept="image/*"
              onChange={(event) => setFoto(event.target.files[0])}
            />
          </div>

          <button type="submit" className="cadastrar-animal-button">
            Salvar animal
          </button>

        </form>

      </section>

    </main>
  );
}

export default CadastrarAnimal;