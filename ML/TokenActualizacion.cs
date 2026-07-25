using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML
{
    public class TokenActualizacion
    {
        public Guid IdTokenActualizacion { get; set; }

        public Guid IdUsuario { get; set; }

        public string Token { get; set; } = null!;

        public DateTime FechaExpiracion { get; set; }

        public bool Estatus { get; set; }

        //public Usuario Usuario { get; set; } = null!;
    }
}
