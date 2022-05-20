import { http } from './config'

export default {
  salvar:(usuario)=>{
    return http.post('usuario', usuario);
  },

  listar:()=>{
    return http.get('/usuarios');
  }
}