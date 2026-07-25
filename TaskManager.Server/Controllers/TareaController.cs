using BL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ML;
using ML.DTOs;
using System.Security.Claims;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class TareaController : ControllerBase
    {
        private readonly ITareaService _tareaService;

        public TareaController(ITareaService tareaService)
        {
            _tareaService = tareaService;
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add([FromBody] TareaRequest request)
        {
            string? idUsuarioClaim = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (!Guid.TryParse(idUsuarioClaim, out Guid idUsuario))
            {
                return Unauthorized();
            }

            Result result = await _tareaService.AddAsync(request, idUsuario);

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll([FromQuery] int?idPrioridadTarea, [FromQuery] int? idEstadoTarea)
        {
            Result result = await _tareaService.GetAllAsync(idPrioridadTarea, idEstadoTarea);

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetById/{idTarea}")]
        public async Task<IActionResult> GetById(Guid idTarea)
        {
            Result result = await _tareaService.GetByIdAsync(idTarea);

            if (result.Correct)
            {
                return Ok(result);
            }

            return NotFound(result);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] TareaRequest request)
        {
            string? idUsuarioClaim = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (!Guid.TryParse(idUsuarioClaim, out Guid idUsuario))
            {
                return Unauthorized();
            }


            Result result = await _tareaService.UpdateAsync(request, idUsuario);

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpDelete]
        [Route("Delete/{idTarea}")]
        public async Task<IActionResult> Delete(Guid idTarea)
        {
            Result result = await _tareaService.DeleteAsync(idTarea);

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
