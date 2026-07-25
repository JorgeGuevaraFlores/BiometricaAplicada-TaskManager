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

    public class PrioridadTareaController : ControllerBase
    {
        private readonly IPrioridadTareaService _prioridadTareaService;

        public PrioridadTareaController(
            IPrioridadTareaService prioridadTareaService
        )
        {
            _prioridadTareaService = prioridadTareaService;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            Result result = await _prioridadTareaService.GetAllAsync();

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
