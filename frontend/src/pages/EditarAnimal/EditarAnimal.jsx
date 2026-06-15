import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../../services/api';
import './EditarAnimal.css';

function EditarAnimal() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [porte, setPorte] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function carregarAnimal() {
      try {
        const response = await api.get('/animais');

        const animalEncontrado = response.data.find(
          (animal) => animal.id === Number(id)
        );

        if (animalEncontrado) {
          setNome(animalEncontrado.nome);
          setIdade(animalEncontrado.idade);
          setPorte(animalEncontrado.porte);
          setDescricao(animalEncontrado.descricao);
        }

      } catch (error) {
        console.log(error);
      }
    }

    carregarAnimal();
  }, [id]);

  async function salvarAlteracoes(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');

    try {
      await api.put(
        `/animais/${id}`,
        {
          nome,
          idade,
          porte,
          descricao
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMensagem('Animal atualizado com sucesso!');

      setTimeout(() => {
        navigate('/meus-animais');
      }, 1500);

    } catch (error) {
      console.log(error);
      setMensagem('Erro ao atualizar animal.');
    }
  }

  return (
    <main className="editar-animal-page" id="conteudo-principal">

      {mensagem && (
        <p className="mensagem-editar-animal">
          {mensagem}
        </p>
      )}

      <section className="editar-animal-container">

        <div className="editar-animal-info">
          <h1>Editar Animal</h1>

          <p>
            Atualize as informações do animal cadastrado.
          </p>
        </div>

        <form className="editar-animal-form" onSubmit={salvarAlteracoes}>

          <div className="form-group">
            <label htmlFor="nome">Nome do animal</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="idade">Idade</label>
            <input
              type="number"
              id="idade"
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
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
            />
          </div>

          <button type="submit" className="editar-animal-button">
            Salvar alterações
          </button>

        </form>

      </section>

    </main>
  );
}

export default EditarAnimal;