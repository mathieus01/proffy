import React, { FormEvent, useState } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import TeacherItem from '../../components/TeacherItem';
import api from '../../services/api';
import './styles.css';


const TeacherList: React.FC = () => {

  
  const [subject,setSubject] = useState('')
  const [week_day,setWeekDay] = useState('')
  const [time,setTime] = useState('')
  const [teachers,setTeachers] = useState([])


  async function searchTeachers(e: FormEvent){
    e.preventDefault()

    const {data} = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })
    
    setTeachers(data)
  }

  return (
    <div id='page-teacher-list' className='container'>
      <PageHeader title='Estes são os proffys disponíveis'>
        <form id='search-teachers' onSubmit={searchTeachers}>
        <Select  name="subject" label="Materia" 
        value={subject}
        onChange={e=> setSubject(e.target.value)}
        options={[
            {value: 'Artes', label: 'Artes'},
            {value: 'Biologia', label: 'Biologia'},
            {value: 'Ciencias', label: 'Ciencias'},
            {value: 'Educacao Fisica', label: 'Educacao Fisica'},
            {value: 'Matematica', label: 'Matematica'},
            {value: 'Filosofia', label: 'Filosofia'},
            {value: 'Historia', label: 'Historia'},
          ]} />
        <Select  name="week_day" label="Dia da semana" 
        value={week_day}
        onChange={e=> setWeekDay(e.target.value)}
        options={[
            {value: '0', label: 'Domingo'},
            {value: '1', label: 'Segunda-Feira'},
            {value: '2', label: 'Terça-Feira'},
            {value: '3', label: 'Quarta-Feira'},
            {value: '4', label: 'Quinta-Feira'},
            {value: '5', label: 'Sexta-Feira'},
            {value: '6', label: 'Sabado'},
          ]} />
          <Input type="time" name="time" label="Hora" value={time} onChange={e=> setTime(e.target.value)} />
          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map(teacher => (
          <TeacherItem teacher={teacher} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
