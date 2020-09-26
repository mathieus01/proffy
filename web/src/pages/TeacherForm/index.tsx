import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import warningIcon from '../../assets/images/icons/warning.svg';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import Textarea from '../../components/TextArea';
import api from '../../services/api';
import './styles.css';

const TeacherForm: React.FC = () => {
  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsApp] = useState('')
  const [bio, setBio] = useState('')
  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: '', from: '', to: '' }
  ])

  function addNewScheduleItem(){
    setScheduleItems([
      ...scheduleItems, 
      { week_day: '', from: '', to: '' }
    ])
  }

  function handleCreateClass(event: FormEvent){
    event.preventDefault()

  const data = {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }

    api.post('classes',data )
    .then(()=> {
      alert('Cadastro realizado com sucesso')
      history.push('/study')
    }
    )
    .catch(()=> alert('Erro ao cadastrar classe'))
    
  }

  function setScheduleItemValue(position: number, field: string, value: string){
    const newArray = scheduleItems.map((item, index) => {
      if(index === position){
        return {...item, [field]: value}
      }

      return item
    })
    setScheduleItems(newArray)
  }

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader title='Que incrivel que voce quer dar aula' 
      description="O Primeiro passo é preencher esse formulário de inscrição"/>

      <main>
        <form onSubmit={handleCreateClass}>
        <fieldset>
          <legend>Seus dados</legend>
          <Input  name="name" label="Nome completo" value={name} onChange={e=> setName(e.target.value)} />
          <Input  name="avatar" label="Avatar" value={avatar} onChange={e=> setAvatar(e.target.value)} />
          <Input  name="whatsapp" label="WhatsApp" value={whatsapp} onChange={e=> setWhatsApp(e.target.value)} />
          <Textarea name="bio" label="Biografia" value={bio} onChange={e=> setBio(e.target.value)} />
        </fieldset>
        <fieldset>
          <legend>Sobre a aula</legend>
          <Select  name="subject" label="Materia" options={[
            {value: 'Artes', label: 'Artes'},
            {value: 'Biologia', label: 'Biologia'},
            {value: 'Ciencias', label: 'Ciencias'},
            {value: 'Educacao Fisica', label: 'Educacao Fisica'},
            {value: 'Matematica', label: 'Matematica'},
            {value: 'Filosofia', label: 'Filosofia'},
            {value: 'Historia', label: 'Historia'},
          ]} value={subject} onChange={e=> setSubject(e.target.value)} />
          <Input  name="cost" label="Custo da sua hora por aula" value={cost} onChange={e=> setCost(e.target.value)} />
        </fieldset>

        <fieldset>
          <legend>
            Horarios disponiveis
            <button type="button" onClick={e=> addNewScheduleItem()}>
            + Novo horário
          </button>
          </legend>
          
          {scheduleItems.map((scheduleItem, index) => (
            <div key={scheduleItem.week_day} className="schedule-item">
              <Select name="week_day" label="Dia da semana" 
              value={scheduleItem.week_day}
              onChange={e=> setScheduleItemValue(index, 'week_day', e.target.value)}
              options={[
                { value: '0', label: 'Domingo' },
                { value: '1', label: 'Segunda-Feira' },
                { value: '2', label: 'Terça-Feira' },
                { value: '3', label: 'Quarta-Feira' },
                { value: '4', label: 'Quinta-Feira' },
                { value: '5', label: 'Sexta-Feira' },
                { value: '6', label: 'Sabado' },
              ]} />

              <Input name="from" label="Das" type="time" value={scheduleItem.from}  onChange={e=> setScheduleItemValue(index, 'from', e.target.value)} />
              <Input name="to" label="Até" type="time" value={scheduleItem.to}  onChange={e=> setScheduleItemValue(index, 'to', e.target.value)} />
            </div>

          ))}

        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante"/>
            Importante <br />

            Preencha todos os dados
          </p>
          <button type="submit">
            Salvar cadastro
          </button>
        </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
