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
        private readonly IJwtService _jwtService;

        public AuthService(IUsuarioRepositorio usuarioRepositorio, IJwtService jwtService)
        {
            _usuarioRepositorio = usuarioRepositorio;
            _jwtService = jwtService;
        }

        public async Task<ML.Result> LoginAsync(ML.LoginRequest login)
        {
            ML.Result result = new ML.Result();

            try
            {
                ML.Result resultadoUsuario = await _usuarioRepositorio.ObtenerPorCorreoAsync(login.CorreoElectronico.Trim().ToLower());

                if (!resultadoUsuario.Correct || resultadoUsuario.Object == null)
                {
                    result.Correct = false;
                    result.ErrorMessage = "Correo electrónico o contraseña incorrectos.";

                    return result;
                }

                ML.Usuario usuario = (ML.Usuario)resultadoUsuario.Object;

                bool passwordCorrecto = BCrypt.Net.BCrypt.Verify(login.Password, usuario.PasswordHash);

                if (!passwordCorrecto)
                {
                    result.Correct = false;
                    result.ErrorMessage = "Correo electrónico o contraseña incorrectos.";

                    return result;
                }

                if (!usuario.Activo)
                {
                    result.Correct = false;
                    result.ErrorMessage = "El usuario se encuentra inactivo.";

                    return result;
                }

                string token = _jwtService.GenerarToken(usuario);

                ML.DTOs.LoginResponse loginResponse = new ML.DTOs.LoginResponse();

                loginResponse.Token = token;

                result.Correct = true;
                result.Object = loginResponse;
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = $"Ocurrió un error al iniciar sesión: {ex.Message}";
                result.Ex = ex;
            }

            return result;
        }


    }
}
