using ML;
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
        Task<ML.Result> GetAllAsync();
        Task<Result> GetByIdAsync(Guid idUsuario);
        Task<Result> UpdateAsync(ML.Usuario usuario);
        Task<Result> DeleteAsync(Guid idUsuario);
        Task<Result> ActualizarEstatusAsync(Guid idUsuario, bool activo);

    }
}
