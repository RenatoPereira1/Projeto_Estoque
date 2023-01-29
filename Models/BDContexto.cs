using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Projeto.Models
{
    public partial class BDContexto : DbContext
    {
        public BDContexto()
        {
        }

        public BDContexto(DbContextOptions<BDContexto> options)
            : base(options)
        {
        }

        public virtual DbSet<EntradaProduto> EntradaProdutos { get; set; } = null!;
        public virtual DbSet<Estoque> Estoques { get; set; } = null!;
        public virtual DbSet<Produto> Produtos { get; set; } = null!;
        public virtual DbSet<SaidaProduto> SaidaProdutos { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=Renato@2022;database=Estoque_UN", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.29-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<EntradaProduto>(entity =>
            {
                entity.ToTable("entrada_produto");

                entity.HasIndex(e => e.CodigoProduto, "fk_produto_entrada");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CodigoProduto).HasColumnName("codigo_produto");

                entity.Property(e => e.DataEntrada)
                    .HasMaxLength(10)
                    .HasColumnName("data_entrada");

                entity.Property(e => e.Lote)
                    .HasMaxLength(100)
                    .HasColumnName("lote");

                entity.Property(e => e.Notafiscal)
                    .HasMaxLength(30)
                    .HasColumnName("notafiscal");

                entity.Property(e => e.Qtde).HasColumnName("qtde");

                entity.Property(e => e.Solicitante)
                    .HasMaxLength(300)
                    .HasColumnName("solicitante");

                entity.Property(e => e.ValorUnitario)
                    .HasPrecision(9, 2)
                    .HasColumnName("valor_unitario")
                    .HasDefaultValueSql("'0.00'");

                entity.Property(e => e.Vencimento)
                    .HasMaxLength(10)
                    .HasColumnName("vencimento");

                entity.HasOne(d => d.CodigoProdutoNavigation)
                    .WithMany(p => p.EntradaProdutos)
                    .HasForeignKey(d => d.CodigoProduto)
                    .HasConstraintName("fk_produto_entrada");
            });

            modelBuilder.Entity<Estoque>(entity =>
            {
                entity.ToTable("estoque");

                entity.HasIndex(e => e.CodigoProduto, "fk_produto_estoque");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CodigoProduto).HasColumnName("codigo_produto");

                entity.Property(e => e.Qtde).HasColumnName("qtde");

                entity.Property(e => e.ValorUnitario)
                    .HasPrecision(9, 2)
                    .HasColumnName("valor_unitario")
                    .HasDefaultValueSql("'0.00'");

                entity.HasOne(d => d.CodigoProdutoNavigation)
                    .WithMany(p => p.Estoques)
                    .HasForeignKey(d => d.CodigoProduto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_produto_estoque");
            });

            modelBuilder.Entity<Produto>(entity =>
            {
                entity.HasKey(e => e.Codigo)
                    .HasName("PRIMARY");

                entity.ToTable("produto");

                entity.Property(e => e.Codigo)
                    .ValueGeneratedNever()
                    .HasColumnName("codigo");

                entity.Property(e => e.Classe)
                    .HasMaxLength(30)
                    .HasColumnName("classe");

                entity.Property(e => e.Descricao)
                    .HasMaxLength(50)
                    .HasColumnName("descricao");
            });

            modelBuilder.Entity<SaidaProduto>(entity =>
            {
                entity.ToTable("saida_produto");

                entity.HasIndex(e => e.CodigoProduto, "fk_produto_saida");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CodigoProduto).HasColumnName("codigo_produto");

                entity.Property(e => e.DataSaida)
                    .HasMaxLength(10)
                    .HasColumnName("data_saida");

                entity.Property(e => e.Qtde).HasColumnName("qtde");

                entity.Property(e => e.ValorUnitario)
                    .HasPrecision(9, 2)
                    .HasColumnName("valor_unitario")
                    .HasDefaultValueSql("'0.00'");

                entity.HasOne(d => d.CodigoProdutoNavigation)
                    .WithMany(p => p.SaidaProdutos)
                    .HasForeignKey(d => d.CodigoProduto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_produto_saida");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
