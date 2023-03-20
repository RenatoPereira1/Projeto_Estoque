using System;
using System.Collections.Generic;

namespace Projeto.Models
{
    public partial class Fornecedor
    {
        public Fornecedor()
        {
            EntradaProdutos = new HashSet<EntradaProduto>();
        }

        public int Id { get; set; }
        public string Nome { get; set; } = null!;
        public long Cnpj { get; set; }
        public string? Email { get; set; }
        public long? Telefone { get; set; }
        public long Cep { get; set; }
        public string? Rua { get; set; }
        public string? Bairro { get; set; }
        public string? Cidade { get; set; }
        public string? Uf { get; set; }
        public string? Ibge { get; set; }

        public virtual ICollection<EntradaProduto> EntradaProdutos { get; set; }
    }
}
