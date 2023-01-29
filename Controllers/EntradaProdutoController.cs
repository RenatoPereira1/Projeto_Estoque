using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
 
namespace Projeto.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class EntradaProdutoController : ControllerBase
    {
        private BDContexto contexto;
 
        public EntradaProdutoController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }
 
        [HttpGet]
        public List<EntradaProduto> Listar()
        {
            return contexto.EntradaProdutos.ToList();
        }

        [HttpPost]
        public string Cadastrando([FromBody] EntradaProduto novoEntradaProduto) 
        {
            contexto.Add(novoEntradaProduto);
            contexto.SaveChanges();
            return"Produto cadastrado com sucesso!";
        }

        
        

       

    }
}