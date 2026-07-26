using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML
{
    public class Usuario
    {
        public Guid? IdUsuario { get; set; }

        public string Nombre { get; set; } = null!;

        public string ApellidoPaterno { get; set; } = null!;

        public string? ApellidoMaterno { get; set; }

        public string? CorreoElectronico { get; set; } = null!;

        public string? PasswordHash { get; set; } = null!;

        public DateTime FechaCreacion { get; set; }

        public bool Activo { get; set; }
        public byte[]? Imagen { get; set; }
    }
}
