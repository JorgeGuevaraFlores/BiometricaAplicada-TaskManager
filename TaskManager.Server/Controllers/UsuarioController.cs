using BL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ML;
using ML.DTOs;
using TaskManager.Server.Models;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add([FromForm] UsuarioRegistroFormRequest formRequest)
        {
            byte[]? imagen = null;

            if (formRequest.Imagen != null)
            {
                using MemoryStream memoryStream = new MemoryStream();

                await formRequest.Imagen.CopyToAsync(memoryStream);

                imagen = memoryStream.ToArray();
            }

            UsuarioRegistroRequest request = new UsuarioRegistroRequest
            {
                Nombre = formRequest.Nombre,
                ApellidoPaterno = formRequest.ApellidoPaterno,
                ApellidoMaterno = formRequest.ApellidoMaterno,
                CorreoElectronico = formRequest.CorreoElectronico,
                Password = formRequest.Password,
                Imagen = imagen
            };

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

        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            Result result = await _usuarioService.GetByIdAsync(id);

            if (result.Correct)
            {
                return Ok(result);
            }

            return NotFound(result);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Actualizar([FromForm] UsuarioRegistroFormRequest formRequest)
        {
            byte[]? imagen = null;

            if (formRequest.Imagen != null)
            {
                using MemoryStream memoryStream = new MemoryStream();

                await formRequest.Imagen.CopyToAsync(memoryStream);

                imagen = memoryStream.ToArray();
            }

            UsuarioRegistroRequest usuario =
                new UsuarioRegistroRequest
                {
                    IdUsuario = formRequest.IdUsuario,
                    Nombre = formRequest.Nombre,
                    ApellidoPaterno = formRequest.ApellidoPaterno,
                    ApellidoMaterno = formRequest.ApellidoMaterno,
                    CorreoElectronico = formRequest.CorreoElectronico,
                    Password = formRequest.Password,
                    Imagen = imagen
                };

            Result result = await _usuarioService.UpdateAsync(usuario);

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete]
        [Route("Delete/{idUsuario}")]
        public async Task<IActionResult> Eliminar(Guid idUsuario)
        {
            Result result = await _usuarioService.DeleteAsync(idUsuario);

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPatch]
        [Route("UpdateStatus/{idUsuario}/estatus")]
        public async Task<IActionResult> ActualizarEstatus(Guid idUsuario, [FromQuery] bool activo)
        {
            Result result = await _usuarioService.ActualizarEstatusAsync(idUsuario, activo);

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

    }
}
