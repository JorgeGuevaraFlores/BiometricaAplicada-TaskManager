using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DL;

public partial class TaskManagerContext : DbContext
{
    public TaskManagerContext()
    {
    }

    public TaskManagerContext(DbContextOptions<TaskManagerContext> options)
        : base(options)
    {
    }

    public virtual DbSet<EstadoTarea> EstadoTareas { get; set; }

    public virtual DbSet<PrioridadTarea> PrioridadTareas { get; set; }

    public virtual DbSet<Tarea> Tareas { get; set; }

    public virtual DbSet<TokenActualizacion> TokenActualizacions { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EstadoTarea>(entity =>
        {
            entity.HasKey(e => e.IdEstadoTarea).HasName("PK_EstadosTarea");

            entity.ToTable("EstadoTarea");

            entity.HasIndex(e => e.Nombre, "UQ_EstadosTarea_Nombre").IsUnique();

            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.Nombre).HasMaxLength(30);
        });

        modelBuilder.Entity<PrioridadTarea>(entity =>
        {
            entity.HasKey(e => e.IdPrioridadTarea).HasName("PK_PrioridadesTarea");

            entity.ToTable("PrioridadTarea");

            entity.HasIndex(e => e.Nombre, "UQ_PrioridadesTarea_Nombre").IsUnique();

            entity.Property(e => e.Nombre).HasMaxLength(30);
        });

        modelBuilder.Entity<Tarea>(entity =>
        {
            entity.HasKey(e => e.IdTarea).HasName("PK_Tareas");

            entity.ToTable("Tarea");

            entity.Property(e => e.IdTarea).HasDefaultValueSql("(newsequentialid())");
            entity.Property(e => e.Descripcion).HasMaxLength(1000);
            entity.Property(e => e.FechaActualizacion).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.FechaCreacion).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Titulo).HasMaxLength(150);

            entity.HasOne(d => d.IdEstadoTareaNavigation).WithMany(p => p.Tareas)
                .HasForeignKey(d => d.IdEstadoTarea)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Tareas_EstadosTarea");

            entity.HasOne(d => d.IdPrioridadTareaNavigation).WithMany(p => p.Tareas)
                .HasForeignKey(d => d.IdPrioridadTarea)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Tareas_PrioridadesTarea");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Tareas)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Tareas_Usuarios");
        });

        modelBuilder.Entity<TokenActualizacion>(entity =>
        {
            entity.HasKey(e => e.IdTokenActualizacion).HasName("PK_TokensActualizacion");

            entity.ToTable("TokenActualizacion");

            entity.HasIndex(e => e.Token, "UQ_TokensActualizacion_Token").IsUnique();

            entity.Property(e => e.IdTokenActualizacion).HasDefaultValueSql("(newsequentialid())");
            entity.Property(e => e.Token).HasMaxLength(500);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.TokenActualizacions)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TokensActualizacion_Usuarios");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK_Usuarios");

            entity.ToTable("Usuario");

            entity.HasIndex(e => e.CorreoElectronico, "UQ_Usuarios_CorreoElectronico").IsUnique();

            entity.Property(e => e.IdUsuario).HasDefaultValueSql("(newsequentialid())");
            entity.Property(e => e.Activo).HasDefaultValue(true);
            entity.Property(e => e.ApellidoMaterno).HasMaxLength(100);
            entity.Property(e => e.ApellidoPaterno).HasMaxLength(100);
            entity.Property(e => e.CorreoElectronico).HasMaxLength(150);
            entity.Property(e => e.FechaCreacion).HasDefaultValueSql("(sysutcdatetime())");
            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.PasswordHash).HasMaxLength(500);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
