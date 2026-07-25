using ML;
using ML.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IUsuarioService
    {
        Task<Result> RegistroAsync(UsuarioRegistroRequest request);
        Task<ML.Result> GetAllAsync();
        Task<Result> GetByIdAsync(Guid idUsuario);

    }
}
