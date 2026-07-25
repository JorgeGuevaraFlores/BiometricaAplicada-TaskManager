using BL.Interfaces;
using BL.Servicios;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ML;
using ML.DTOs;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;
        private readonly ITokenActualizacionService _tokenActualizacionService;

        public AuthController(IAuthService authService, IJwtService jwtService, ITokenActualizacionService tokenActualizacionService)
        {
            _authService = authService;
            _jwtService = jwtService;
            _tokenActualizacionService = tokenActualizacionService;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            Result result = await _authService.LoginAsync(request);

            if (!result.Correct || result.Object is not ML.DTOs.LoginResponse loginResponse)
            {
                return Unauthorized(result);
            }

            string refreshToken = _jwtService.GenerarRefreshToken();

            DateTime fechaExpiracionRefreshToken = DateTime.UtcNow.AddDays(7);

            ML.TokenActualizacion tokenActualizacion =
                new ML.TokenActualizacion
                {
                    IdUsuario = loginResponse.IdUsuario,
                    Token = refreshToken,
                    FechaExpiracion = fechaExpiracionRefreshToken
                };

            Result resultadoToken = await _tokenActualizacionService.AddAsync(tokenActualizacion);

            if (!resultadoToken.Correct)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    resultadoToken
                );
            }

            Response.Cookies.Append(
                "access_token",
                loginResponse.Token,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddMinutes(15)
                }
            );

            Response.Cookies.Append(
                "refresh_token",
                refreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = fechaExpiracionRefreshToken
                }
            );

            return Ok(new Result
            {
                Correct = true
            });
        }

        [Authorize]
        [HttpGet]
        [Route("ValidateSession")]
        public IActionResult ValidateSession()
        {
            Result result = new Result
            {
                Correct = true
            };

            return Ok(result);
        }

        [HttpPost]
        [Route("RefreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            string? refreshToken =
                Request.Cookies["refresh_token"];

            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return Unauthorized(new Result
                {
                    Correct = false,
                    ErrorMessage =
                        "No se encontró el token de actualización."
                });
            }

            Result result =
                await _authService.RenovarTokenAsync(refreshToken);

            if (!result.Correct ||
                result.Object is not ML.DTOs.RefreshTokenResponse response)
            {
                return Unauthorized(result);
            }

            Response.Cookies.Append(
                "access_token",
                response.AccessToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddMinutes(15)
                }
            );

            Response.Cookies.Append(
                "refresh_token",
                response.RefreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = response.FechaExpiracionRefreshToken
                }
            );

            return Ok(new Result
            {
                Correct = true
            });
        }

    }
}
