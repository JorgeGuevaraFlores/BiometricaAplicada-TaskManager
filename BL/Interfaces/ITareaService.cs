using ML;
using ML.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface ITareaService
    {
        Task<Result> AddAsync(TareaRequest request, Guid idUsuario);

        Task<Result> GetAllAsync();

        Task<Result> GetByIdAsync(Guid idTarea);

        Task<Result> UpdateAsync(TareaRequest request, Guid idUsuario);

        Task<Result> DeleteAsync(Guid idTarea);
    }
}
