using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DTOs
{
    public class UsuarioRegistroRequest
    {
        public string Nombre { get; set; } = null!;

        public string ApellidoPaterno { get; set; } = null!;

        public string? ApellidoMaterno { get; set; }

        public string CorreoElectronico { get; set; } = null!;

        public string Password { get; set; } = null!;
    }
}
