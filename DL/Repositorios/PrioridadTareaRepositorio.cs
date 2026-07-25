using BL.Interfaces;
using Microsoft.EntityFrameworkCore;
using ML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Repositorios
{
    public class PrioridadTareaRepositorio : IPrioridadTareaRepositorio
    {
        private readonly TaskManagerContext _context;

        public PrioridadTareaRepositorio(TaskManagerContext context)
        {
            _context = context;
        }

        public async Task<Result> GetAllAsync()
        {
            Result result = new Result();

            try
            {
                List<ML.PrioridadTarea> prioridades =
                    await _context.Database
                        .SqlQueryRaw<ML.PrioridadTarea>(
                            "EXEC PrioridadTareaGetAll"
                        )
                        .ToListAsync();

                result.Correct = true;
                result.Objects = prioridades.Cast<object>().ToList();
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
