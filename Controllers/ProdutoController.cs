using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
 
namespace Projeto.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private BDContexto contexto;
 
        public ProdutoController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }
 
        [HttpGet]
        public List<Produto> Listar()
        {
            return contexto.Produtos.ToList();
        }

        [HttpPost]
        public string Cadastrar([FromBody] Produto novoProduto) 
        {
            contexto.Add(novoProduto);
            contexto.SaveChanges();
            return"Produto cadastrado com sucesso!";
        }

        [HttpDelete]
        public string Excluir([FromBody] int codigo) 
        {
            Produto dados = contexto.Produtos.FirstOrDefault(p => p.Codigo == codigo);
            if (dados == null)
            {
                return"Não foi encontrado Produto para o codigo informado";
            }
            else
            {
                contexto.Remove(dados);
                contexto.SaveChanges();
                return"Produto removdo com sucesso!";
            }
            
        }

       

    }
}