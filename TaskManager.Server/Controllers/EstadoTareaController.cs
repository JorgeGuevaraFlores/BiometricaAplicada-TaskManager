using BL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ML;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class EstadoTareaController : ControllerBase
    {
        private readonly IEstadoTareaService _estadoTareaService;

        public EstadoTareaController(
            IEstadoTareaService estadoTareaService
        )
        {
            _estadoTareaService = estadoTareaService;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            Result result = await _estadoTareaService.GetAllAsync();

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
