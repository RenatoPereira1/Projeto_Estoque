using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
 
namespace Projeto.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class SaidaProdutoController : ControllerBase
    {
        private BDContexto contexto;
 
        public SaidaProdutoController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }
 
        [HttpGet]
        public List<SaidaProduto> Listar()
        {
            return contexto.SaidaProdutos.ToList();
        }

        [HttpPost]
        public string Saida([FromBody] SaidaProduto novaSaidaProduto) 
        {
            contexto.Add(novaSaidaProduto);
            contexto.SaveChanges();
            return"Saida registrada com sucesso!";
        }

        
        

       

    }
}