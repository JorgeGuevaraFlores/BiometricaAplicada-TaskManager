using System;
using System.Collections.Generic;

namespace DL;

public partial class PrioridadTarea
{
    public int IdPrioridadTarea { get; set; }

    public string Nombre { get; set; } = null!;

    public int Nivel { get; set; }

    public virtual ICollection<Tarea> Tareas { get; set; } = new List<Tarea>();
}
