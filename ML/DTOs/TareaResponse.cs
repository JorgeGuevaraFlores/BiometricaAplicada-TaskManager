using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ML.DTOs
{
    public class TareaResponse
    {
        public Guid IdTarea { get; set; }

        public string Titulo { get; set; } = null!;

        public string? Descripcion { get; set; }

        public string? EstadoTareaNombre { get; set; }

        public string? PrioridadTareaNombre { get; set; }

        //public Guid IdUsuario { get; set; }
        public string? UsuarioNombre { get; set; }
        public string? ApellidoPaterno { get; set; }
        public string? ApellidoMaterno { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime FechaActualizacion { get; set; }
        public int IdPrioridadTarea { get; set; }
    }
}
