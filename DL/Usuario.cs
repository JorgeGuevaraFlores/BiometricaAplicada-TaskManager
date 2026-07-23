using System;
using System.Collections.Generic;

namespace DL;

public partial class Usuario
{
    public Guid IdUsuario { get; set; }

    public string Nombre { get; set; } = null!;

    public string ApellidoPaterno { get; set; } = null!;

    public string? ApellidoMaterno { get; set; }

    public string CorreoElectronico { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public DateTime FechaCreacion { get; set; }

    public bool Activo { get; set; }

    public virtual ICollection<Tarea> Tareas { get; set; } = new List<Tarea>();

    public virtual ICollection<TokensActualizacion> TokensActualizacions { get; set; } = new List<TokensActualizacion>();
}
