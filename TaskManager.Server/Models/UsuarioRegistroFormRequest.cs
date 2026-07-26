namespace TaskManager.Server.Models
{
    public class UsuarioRegistroFormRequest
    {
        public Guid IdUsuario { get; set; }
        public string Nombre { get; set; } = string.Empty;

        public string ApellidoPaterno { get; set; } = string.Empty;

        public string? ApellidoMaterno { get; set; }

        public string CorreoElectronico { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public IFormFile? Imagen { get; set; }
    }
}
