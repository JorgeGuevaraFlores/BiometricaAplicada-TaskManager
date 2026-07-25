using BL.Interfaces;
using ML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Servicios
{
    public class EstadoTareaService : IEstadoTareaService
    {
        private readonly IEstadoTareaRepositorio _estadoTareaRepositorio;

        public EstadoTareaService(
            IEstadoTareaRepositorio estadoTareaRepositorio
        )
        {
            _estadoTareaRepositorio = estadoTareaRepositorio;
        }

        public async Task<Result> GetAllAsync()
        {
            Result result = new Result();

            try
            {
                result = await _estadoTareaRepositorio.GetAllAsync();
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }
    }
}
