using BL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
