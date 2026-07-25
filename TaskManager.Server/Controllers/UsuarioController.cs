using BL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ML;
using ML.DTOs;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add([FromBody] UsuarioRegistroRequest request)
        {
            Result result = await _usuarioService.RegistroAsync(request);

            if (result.Correct)
            {
                return Created(string.Empty, result);
            }

            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            Result result = await _usuarioService.GetAllAsync();

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
