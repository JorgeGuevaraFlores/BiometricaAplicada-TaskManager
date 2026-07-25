using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DTOs
{
    public class TareaDetalleResponse
    {
        public Guid IdTarea { get; set; }

        public string Titulo { get; set; } = null!;

        public string? Descripcion { get; set; }

        public int IdEstadoTarea { get; set; }

        public int IdPrioridadTarea { get; set; }
    }
}
