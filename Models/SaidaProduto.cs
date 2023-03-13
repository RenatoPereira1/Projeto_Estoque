using System;
using System.Collections.Generic;

namespace Projeto.Models
{
    public partial class SaidaProduto
    {
        public int Id { get; set; }
        public int CodigoProduto { get; set; }
        public int? Qtde { get; set; }
        public string DataSaida { get; set; } = null!;
        public decimal? ValorUnitario { get; set; }

        public virtual Produto CodigoProdutoNavigation { get; set; } = null!;
    }
}
