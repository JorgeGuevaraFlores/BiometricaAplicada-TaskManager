using BL.Interfaces;
using ML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Servicios
{
    public class TokenActualizacionService
        : ITokenActualizacionService
    {
        private readonly ITokenActualizacionRepositorio
            _tokenActualizacionRepositorio;

        public TokenActualizacionService(
            ITokenActualizacionRepositorio tokenActualizacionRepositorio
        )
        {
            _tokenActualizacionRepositorio =
                tokenActualizacionRepositorio;
        }

        public async Task<Result> AddAsync(ML.TokenActualizacion tokenActualizacion)
        {
            Result result = new Result();

            try
            {
                result = await _tokenActualizacionRepositorio.AddAsync(tokenActualizacion);
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
                result = await _tokenActualizacionRepositorio
                    .GetByTokenAsync(token);
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
                result = await _tokenActualizacionRepositorio
                    .RevokeAsync(token);
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
