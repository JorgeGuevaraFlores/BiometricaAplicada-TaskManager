using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML
{
    public class EstadoTarea
    {
        public int IdEstadoTarea { get; set; }

        public string Nombre { get; set; } = null!;

        public bool Activo { get; set; }
    }
}
