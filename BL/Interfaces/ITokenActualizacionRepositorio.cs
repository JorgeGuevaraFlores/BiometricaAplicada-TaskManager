using ML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface ITokenActualizacionRepositorio
    {
        Task<Result> AddAsync(ML.TokenActualizacion tokenActualizacion);

        Task<Result> GetByTokenAsync(string token);

        Task<Result> RevokeAsync(string token);
    }
}
