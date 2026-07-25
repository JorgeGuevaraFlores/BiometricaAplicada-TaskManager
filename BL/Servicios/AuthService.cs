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
        private readonly ITokenActualizacionService _tokenActualizacionService;


        public AuthService(IUsuarioRepositorio usuarioRepositorio, IJwtService jwtService, ITokenActualizacionService tokenActualizacionService)
        {
            _usuarioRepositorio = usuarioRepositorio;
            _jwtService = jwtService;
            _tokenActualizacionService = tokenActualizacionService;
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
                loginResponse.IdUsuario = usuario.IdUsuario.Value;

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

        public async Task<ML.Result> RenovarTokenAsync(string refreshToken)
        {
            ML.Result result = new ML.Result();

            try
            {
                ML.Result resultadoToken =
                    await _tokenActualizacionService.GetByTokenAsync(
                        refreshToken
                    );

                if (!resultadoToken.Correct ||
                    resultadoToken.Object is not ML.TokenActualizacion tokenActualizacion)
                {
                    result.Correct = false;
                    result.ErrorMessage =
                        "El token de actualización no es válido.";

                    return result;
                }

                if (!tokenActualizacion.Estatus)
                {
                    result.Correct = false;
                    result.ErrorMessage =
                        "El token de actualización ya fue revocado.";

                    return result;
                }

                if (tokenActualizacion.FechaExpiracion <= DateTime.UtcNow)
                {
                    await _tokenActualizacionService.RevokeAsync(
                        refreshToken
                    );

                    result.Correct = false;
                    result.ErrorMessage =
                        "El token de actualización ha expirado.";

                    return result;
                }

                ML.Result resultadoUsuario =
                    await _usuarioRepositorio.GetByIdAsync(
                        tokenActualizacion.IdUsuario
                    );

                if (!resultadoUsuario.Correct ||
                    resultadoUsuario.Object is not ML.Usuario usuario)
                {
                    result.Correct = false;
                    result.ErrorMessage =
                        "No fue posible obtener el usuario.";

                    return result;
                }

                if (!usuario.Activo)
                {
                    result.Correct = false;
                    result.ErrorMessage =
                        "El usuario se encuentra inactivo.";

                    return result;
                }

                string accessToken =
                    _jwtService.GenerarToken(usuario);

                string nuevoRefreshToken =
                    _jwtService.GenerarRefreshToken();

                DateTime fechaExpiracion =
                    DateTime.UtcNow.AddDays(7);

                await _tokenActualizacionService.RevokeAsync(
                    refreshToken
                );

                ML.TokenActualizacion nuevoTokenActualizacion =
                    new ML.TokenActualizacion
                    {
                        IdUsuario = usuario.IdUsuario ?? Guid.Empty,
                        Token = nuevoRefreshToken,
                        FechaExpiracion = fechaExpiracion
                    };

                ML.Result resultadoNuevoToken =
                    await _tokenActualizacionService.AddAsync(
                        nuevoTokenActualizacion
                    );

                if (!resultadoNuevoToken.Correct)
                {
                    result.Correct = false;
                    result.ErrorMessage =
                        resultadoNuevoToken.ErrorMessage;

                    return result;
                }

                ML.DTOs.RefreshTokenResponse response =
                    new ML.DTOs.RefreshTokenResponse
                    {
                        AccessToken = accessToken,
                        RefreshToken = nuevoRefreshToken,
                        FechaExpiracionRefreshToken = fechaExpiracion
                    };

                result.Correct = true;
                result.Object = response;
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage =
                    $"Ocurrió un error al renovar la sesión: {ex.Message}";
                result.Ex = ex;
            }

            return result;
        }
    }
}
