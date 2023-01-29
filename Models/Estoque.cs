using System;
using System.Collections.Generic;

namespace Projeto.Models
{
    public partial class Estoque
    {
        public int Id { get; set; }
        public int CodigoProduto { get; set; }
        public int? Qtde { get; set; }
        public decimal? ValorUnitario { get; set; }

        public virtual Produto CodigoProdutoNavigation { get; set; } = null!;
    }
}
