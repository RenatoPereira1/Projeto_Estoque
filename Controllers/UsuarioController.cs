using Microsoft.AspNetCore.Mvc;
using Projeto.Models;
using Microsoft.EntityFrameworkCore;

namespace Projeto.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]

    public class UsuarioController : ControllerBase
    {
        private BDContexto contexto;
        public UsuarioController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }
        
        [HttpGet]
         public List<Usuario> Listar()
        {  
            return contexto.Usuarios.ToList();
        }

        [HttpDelete]
        public string Excluir([FromBody] int id) 
        {
            Usuario dados = contexto.Usuarios.FirstOrDefault(p => p.Id == id);
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

        [HttpPost]
        public string Cadastrar([FromBody] Usuario novoUsuario) 
        {
            contexto.Add(novoUsuario);
            contexto.SaveChanges();
            return"Usuario cadastrado com sucesso!";
        }

        [HttpGet] 
        public Usuario? Visualizar(int id)
        {
            Usuario? dado = contexto.Usuarios.FirstOrDefault(p => p.Id == id);
            
            return dado;
        }

         [HttpPut]
        public string Alterar([FromBody] Usuario usuarioAtualizado)
        {
            contexto.Update(usuarioAtualizado);
            contexto.SaveChanges();

            return "Usuario atualizado com sucesso!";
        }


    }

}