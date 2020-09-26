import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css';

interface TeacherItemProps {
  teacher: {
    id: number,
    subject: string,
    cost: number,
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string
  }
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher }) => {

  function createNewConnection(){
    api.post('connections', {
      user_id: teacher.id
    })
  }

  return (
    <article className='teacher-item' key={teacher.id}>
      <header>
        <img
          src={teacher.avatar}
          alt={teacher.name}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>
      {teacher.bio}
      </p>

      <footer>
        <p>
          preco/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a target="_black" href={`https://wa.me/+55${teacher.whatsapp}`} onClick={createNewConnection}>
          <img src={whatsappIcon} alt='whatsapp' />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
