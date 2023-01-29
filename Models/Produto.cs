using System;
using System.Collections.Generic;

namespace Projeto.Models
{
    public partial class Produto
    {
        public Produto()
        {
            EntradaProdutos = new HashSet<EntradaProduto>();
            Estoques = new HashSet<Estoque>();
            SaidaProdutos = new HashSet<SaidaProduto>();
        }

        public int Codigo { get; set; }
        public string Descricao { get; set; } = null!;
        public string? Classe { get; set; }

        public virtual ICollection<EntradaProduto> EntradaProdutos { get; set; }
        public virtual ICollection<Estoque> Estoques { get; set; }
        public virtual ICollection<SaidaProduto> SaidaProdutos { get; set; }
    }
}
