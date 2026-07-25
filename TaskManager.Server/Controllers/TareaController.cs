using BL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ML;
using ML.DTOs;

namespace TaskManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            Result result = await _tareaService.AddAsync(request);

            if (result.Correct)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            Result result = await _tareaService.GetAllAsync();

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
            Result result = await _tareaService.UpdateAsync(request);

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
