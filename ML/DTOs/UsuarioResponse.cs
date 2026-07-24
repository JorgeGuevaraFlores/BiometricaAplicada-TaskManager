using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DTOs
{
    public class UsuarioResponse
    {
        public Guid IdUsuario { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string ApellidoPaterno { get; set; } = string.Empty;

        public string? ApellidoMaterno { get; set; }

        public string CorreoElectronico { get; set; } = string.Empty;

        public DateTime FechaCreacion { get; set; }

        public bool Activo { get; set; }
    }
}
