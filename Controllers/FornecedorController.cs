using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Microsoft.EntityFrameworkCore;

namespace Projeto.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]

    public class FornecedorController : ControllerBase
    {
        private BDContexto contexto;
        public FornecedorController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }
        
        [HttpGet]
         public List<Fornecedor> Listar()
        {  
            return contexto.Fornecedors.ToList();
        }

        [HttpDelete]
        public string Excluir([FromBody] int id) 
        {
            Fornecedor dados = contexto.Fornecedors.FirstOrDefault(p => p.Id == id);
            if (dados == null)
            {
                return"Não foi encontrado Fornecedor para o id informado";
            }
            else
            {
                contexto.Remove(dados);
                contexto.SaveChanges();
                return"Fornecedor removido com sucesso!";
            }
            
        }

        [HttpPost]
        public string Cadastrar([FromBody] Fornecedor novoFornecedor) 
        {
            contexto.Add(novoFornecedor);
            contexto.SaveChanges();
            return"Fornecedor cadastrado com sucesso!";
        }

        [HttpGet] 
        public Fornecedor? Visualizar(int id)
        {
            Fornecedor? dado = contexto.Fornecedors.FirstOrDefault(p => p.Id == id);
            
            return dado;
        }

         [HttpPut]
        public string Alterar([FromBody] Fornecedor fornecedorAtualizado)
        {
            contexto.Update(fornecedorAtualizado);
            contexto.SaveChanges();

            return "Fornecedor atualizado com sucesso!";
        }


    }

}