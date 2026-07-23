using System;
using System.Collections.Generic;

namespace DL;

public partial class TokenActualizacion
{
    public Guid IdTokenActualizacion { get; set; }

    public Guid IdUsuario { get; set; }

    public string Token { get; set; } = null!;

    public DateTime FechaExpiracion { get; set; }

    public bool Estatus { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
