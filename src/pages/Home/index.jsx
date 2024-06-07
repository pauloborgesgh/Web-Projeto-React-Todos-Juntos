
import './style.css';
import Trash from '../../assets/lixo.svg';
import api from '../../services/api';
import { useEffect ,useState, useRef} from 'react';



function Home() {
  const  [users,setUsers] = useState([])
  const inputName = useRef();
  const inputEmail = useRef();
  const inputAddress = useRef();


  async function getUsers() {
   const usersFromApi = await api.get('/usuarios');
   setUsers(usersFromApi.data)
   
  }

  async function createUser() {
    await api.post('/usuarios',{
      email:inputEmail.current.value,
      name:inputName.current.value,
      address:inputAddress.current.value
    });
    getUsers();
   }
  useEffect(()=>{
    getUsers();

  },[])

  async function DeleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
    
   }
  

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuario</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName}/>
        <input placeholder='Email' name='email' type='email'ref={inputEmail} />
        <input placeholder='Endereço' name='address' type='text'ref={inputAddress} />
        <button type='button'onClick={createUser}>Enviar Cadastro</button>
       

      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade:<span>{user.email}</span></p>
          <p>Email:<span>{user.address}</span></p>
          <div>
            <button onClick={()=>DeleteUsers(user.id)}>
1
              <img src={Trash}/>
            </button>

          </div>
        </div>

      ))}
      {/* <div>
        <p>Nome:</p>
        <p>Idade:</p>
        <p>Email:</p>
        <div>
          <button>

            <img src={Trash} className='img' />
          </button>

        </div>
      </div> */}

    </div>

  )
}

export default Home
