using System;
using System.Collections.Generic;

namespace DL;

public partial class Tarea
{
    public Guid IdTarea { get; set; }

    public string Titulo { get; set; } = null!;

    public string? Descripcion { get; set; }

    public int IdEstadoTarea { get; set; }

    public int IdPrioridadTarea { get; set; }

    public Guid IdUsuario { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime FechaActualizacion { get; set; }

    public virtual EstadoTarea IdEstadoTareaNavigation { get; set; } = null!;

    public virtual PrioridadTarea IdPrioridadTareaNavigation { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
