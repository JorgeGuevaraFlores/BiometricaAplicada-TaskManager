using BL.Interfaces;
using Microsoft.EntityFrameworkCore;
using ML;
using ML.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Repositorios
{
    public class TareaRepositorio : ITareaRepositorio
    {

        private readonly TaskManagerContext _context;

        public TareaRepositorio(TaskManagerContext context)
        {
            _context = context;
        }

        public async Task<Result> AddAsync(TareaRequest request, Guid idUsuario)
        {
            Result result = new Result();

            try
            {
                int filasAfectadas = await _context.Database.ExecuteSqlRawAsync(
                    @"EXEC TareaAdd
                @Titulo = {0},
                @Descripcion = {1},
                @IdEstadoTarea = {2},
                @IdPrioridadTarea = {3},
                @IdUsuario = {4}",
                    request.Titulo,
                    request.Descripcion ?? (object)DBNull.Value,
                    request.IdEstadoTarea,
                    request.IdPrioridadTarea,
                    idUsuario
                );

                result.Correct = filasAfectadas > 0;
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public async Task<Result> GetAllAsync(int? idPrioridadTarea, int? idEstadoTarea)
        {
            Result result = new Result();

            try
            {
                List<TareaResponse> tareas =
                    await _context.Database
                        .SqlQueryRaw<TareaResponse>(
                            "EXEC TareaGetAll @IdPrioridadTarea = {0}," +
                            "@IdEstadoTarea = {1}",
                            idPrioridadTarea ?? (object)DBNull.Value,
                            idEstadoTarea ?? (object)DBNull.Value
                        )
                        .ToListAsync();

                result.Correct = true;
                result.Objects = tareas.Cast<object>().ToList();
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
                List<ML.DTOs.TareaDetalleResponse> tareas = await _context.Database
                    .SqlQueryRaw<ML.DTOs.TareaDetalleResponse>(
                        "EXEC TareaGetById @IdTarea = {0}",
                        idTarea
                    )
                    .ToListAsync();

                ML.DTOs.TareaDetalleResponse? tarea = tareas.FirstOrDefault();

                if (tarea != null)
                {
                    result.Correct = true;
                    result.Object = tarea;
                }
                else
                {
                    result.Correct = false;
                    result.ErrorMessage = "La tarea no fue encontrada.";
                }
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
                await _context.Database.ExecuteSqlRawAsync(
                    @"EXEC TareaUpdate
                @IdTarea = {0},
                @Titulo = {1},
                @Descripcion = {2},
                @IdEstadoTarea = {3},
                @IdPrioridadTarea = {4}",
                    request.IdTarea,
                    request.Titulo,
                    request.Descripcion ?? (object)DBNull.Value,
                    request.IdEstadoTarea,
                    request.IdPrioridadTarea
                );

                result.Correct = true;
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
                int filasAfectadas = await _context.Database
                    .ExecuteSqlRawAsync(
                        "EXEC TareaDelete @IdTarea = {0}",
                        idTarea
                    );

                result.Correct = filasAfectadas > 0;

                if (!result.Correct)
                {
                    result.ErrorMessage = "La tarea no fue encontrada.";
                }
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
