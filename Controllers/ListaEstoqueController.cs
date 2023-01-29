using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projeto.Models;
 
namespace Projeto.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ListaEstoqueController : ControllerBase
    {
        private BDContexto contexto;
 
        public ListaEstoqueController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }

        [HttpGet]
        public List<Estoque> Listar()
        {
            return contexto.Estoques.Include(v => v.CodigoProdutoNavigation).OrderBy(v => v.CodigoProduto).Select
                (
                    v => new Estoque
                    { 
                        Id = v.Id,
                        CodigoProduto = v.CodigoProduto,
                        Qtde = v.Qtde,
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