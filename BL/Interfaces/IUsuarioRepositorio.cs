using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IUsuarioRepositorio
    {

        Task<ML.Result?> ObtenerPorCorreoAsync(string correo);
        Task<ML.Result> AgregarAsync(ML.Usuario usuario);

    }
}
