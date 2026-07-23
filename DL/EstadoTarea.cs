using System;
using System.Collections.Generic;

namespace DL;

public partial class EstadoTarea
{
    public int IdEstadoTarea { get; set; }

    public string Nombre { get; set; } = null!;

    public bool Activo { get; set; }

    public virtual ICollection<Tarea> Tareas { get; set; } = new List<Tarea>();
}
