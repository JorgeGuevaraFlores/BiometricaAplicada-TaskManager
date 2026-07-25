using BL.Interfaces;
using ML;
using ML.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Servicios
{
    public class TareaService : ITareaService
    {
        private readonly ITareaRepositorio _tareaRepositorio;

        public TareaService(ITareaRepositorio tareaRepositorio)
        {
            _tareaRepositorio = tareaRepositorio;
        }

        public async Task<Result> AddAsync(TareaRequest request, Guid idUsuario)
        {
            Result result = new Result();

            try
            {
                result = await _tareaRepositorio.AddAsync(request, idUsuario);
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public async Task<Result> GetAllAsync()
        {
            Result result = new Result();

            try
            {
                result = await _tareaRepositorio.GetAllAsync();
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public async Task<Result> GetByIdAsync(Guid idTarea)
        {
            Result result = new Result();

            try
            {
                result = await _tareaRepositorio.GetByIdAsync(idTarea);
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public async Task<Result> UpdateAsync(TareaRequest request, Guid idUsuario)
        {
            Result result = new Result();

            try
            {
                result = await _tareaRepositorio.UpdateAsync(request, idUsuario);
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public async Task<Result> DeleteAsync(Guid idTarea)
        {
            Result result = new Result();

            try
            {
                result = await _tareaRepositorio.DeleteAsync(idTarea);
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
