using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DTOs
{
    public class TareaResponse
    {
        public Guid? IdTarea { get; set; }

        public string Titulo { get; set; } = null!;

        public string? Descripcion { get; set; }

        public int IdEstadoTarea { get; set; }

        public int IdPrioridadTarea { get; set; }

        public Guid IdUsuario { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime FechaActualizacion { get; set; }
    }
}
