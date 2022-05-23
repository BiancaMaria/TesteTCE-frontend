import { http } from './config'
 
export default	{

	salvar:(tarefa)=>{
		return http.post('tarefa',tarefa);
  },
    
	atualizar:(tarefa)=>{
		return http.put('tarefas',tarefa);
  },

  listar:()=>{
		return http.get('/tarefas');
		
  },

	listarTarefasPorDescricao:(descricao)=>{
		return http.get('/tarefas/'+descricao);
	},
    
	apagar:(id)=>{
		return http.delete('/tarefas/'+id);
	}


}