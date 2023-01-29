using System;
using System.Collections.Generic;

namespace Projeto.Models
{
    public partial class EntradaProduto
    {
        public int Id { get; set; }
        public int? CodigoProduto { get; set; }
        public string Solicitante { get; set; } = null!;
        public int? Qtde { get; set; }
        public decimal? ValorUnitario { get; set; }
        public string? DataEntrada { get; set; }
        public string? Lote { get; set; }
        public string? Vencimento { get; set; }
        public string? Notafiscal { get; set; }

        public virtual Produto? CodigoProdutoNavigation { get; set; }
    }
}
