using BL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ML;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(ML.LoginRequest login)
        {
            var result = await _authService.LoginAsync(login);

            if (!result.Correct || result.Object is null)
            {
                return Unauthorized(result);
            }

            var token = (ML.DTOs.LoginResponse)result.Object;

            Response.Cookies.Append(
                "access_token",
                token.Token,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddHours(1)
                });

            return Ok(new
            {
                correct = true,
                message = "Inicio de sesión correcto"
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

    }
}
