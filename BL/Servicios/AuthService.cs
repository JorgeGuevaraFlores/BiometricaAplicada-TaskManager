using BL.Interfaces;
using ML;
using ML.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BL.Servicios
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;

        public AuthService(IUsuarioRepositorio usuarioRepositorio)
        {
            _usuarioRepositorio = usuarioRepositorio;
        }

        public async Task<ML.Result> LoginAsync(LoginRequest login)
        {
            ML.Result result = await _usuarioRepositorio.ObtenerPorCorreoAsync(login.Email);

            return result;
        }

        
    }
}
