using BL.Interfaces;
using ML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Servicios
{
    public class PrioridadTareaService : IPrioridadTareaService
    {
        private readonly IPrioridadTareaRepositorio _prioridadTareaRepositorio;

        public PrioridadTareaService(
            IPrioridadTareaRepositorio prioridadTareaRepositorio
        )
        {
            _prioridadTareaRepositorio = prioridadTareaRepositorio;
        }

        public async Task<Result> GetAllAsync()
        {
            Result result = new Result();

            try
            {
                result = await _prioridadTareaRepositorio.GetAllAsync();
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
