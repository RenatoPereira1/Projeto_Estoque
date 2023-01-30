using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Microsoft.EntityFrameworkCore;
 
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
        public List<SaidaProduto> ListaSimples()
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

        [HttpGet]
        public List<SaidaProduto> Listar()
        {
            return contexto.SaidaProdutos.Include(v => v.CodigoProdutoNavigation).OrderBy(v => v.CodigoProduto).Select
                (
                    v => new SaidaProduto
                    { 
                        Id = v.Id,
                        CodigoProduto = v.CodigoProduto,
                        Qtde = v.Qtde,
                        DataSaida = v.DataSaida,
                        ValorUnitario = v.ValorUnitario,
                        CodigoProdutoNavigation = new Produto 
                        { 
                            Codigo = v.CodigoProdutoNavigation.Codigo, 
                            Descricao = v.CodigoProdutoNavigation.Descricao,
                            Classe = v.CodigoProdutoNavigation.Classe,
                        }, 
                        
                    }
                ).ToList();
        }

    }
}