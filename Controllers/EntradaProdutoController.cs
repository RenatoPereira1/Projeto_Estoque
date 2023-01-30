using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public List<EntradaProduto> ListaSimples()
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

        [HttpGet]
        public List<EntradaProduto> Listar()
        {
            return contexto.EntradaProdutos.Include(v => v.CodigoProdutoNavigation).OrderBy(v => v.CodigoProduto).Select
                (
                    v => new EntradaProduto
                    { 
                        Id = v.Id,
                        CodigoProduto = v.CodigoProduto,
                        Solicitante = v.Solicitante,
                        Qtde = v.Qtde,
                        ValorUnitario = v.ValorUnitario,
                        DataEntrada = v.DataEntrada,
                        Lote = v.Lote,
                        Vencimento = v.Vencimento,
                        Notafiscal = v.Notafiscal,
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

        
        

       

