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
    public class TokenActualizacionRepositorio : ITokenActualizacionRepositorio
    {
        private readonly TaskManagerContext _context;

        public TokenActualizacionRepositorio(
            TaskManagerContext context
        )
        {
            _context = context;
        }

        public async Task<Result> AddAsync(ML.TokenActualizacion tokenActualizacion)
        {
            Result result = new Result();

            try
            {
                await _context.Database.ExecuteSqlRawAsync(
                    @"EXEC TokenActualizacionAdd
                        @IdUsuario = {0},
                        @Token = {1},
                        @FechaExpiracion = {2}",
                    tokenActualizacion.IdUsuario,
                    tokenActualizacion.Token,
                    tokenActualizacion.FechaExpiracion
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

        public async Task<Result> GetByTokenAsync(string token)
        {
            Result result = new Result();

            try
            {
                List<ML.TokenActualizacion> tokens =
                    await _context.Database
                        .SqlQueryRaw<ML.TokenActualizacion>(
                            @"EXEC TokenActualizacionGetByToken
                                @Token = {0}",
                            token
                        )
                        .ToListAsync();

                ML.TokenActualizacion? tokenActualizacion = tokens.FirstOrDefault();

                if (tokenActualizacion != null)
                {
                    result.Correct = true;
                    result.Object = tokenActualizacion;
                }
                else
                {
                    result.Correct = false;
                    result.ErrorMessage =
                        "El token de actualización no fue encontrado.";
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public async Task<Result> RevokeAsync(string token)
        {
            Result result = new Result();

            try
            {
                await _context.Database.ExecuteSqlRawAsync(
                    @"EXEC TokenActualizacionRevoke
                        @Token = {0}",
                    token
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
    }
}
