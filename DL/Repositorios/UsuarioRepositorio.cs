using Microsoft.EntityFrameworkCore;
using ML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Repositorios
{
    public class UsuarioRepositorio : BL.Interfaces.IUsuarioRepositorio
    {
        private readonly TaskManagerContext _context;

        public UsuarioRepositorio(TaskManagerContext context)
        {
            _context = context;
        }

        public async Task<ML.Result> ObtenerPorCorreoAsync(string correo)
        {
            ML.Result result = new Result();

            try
            {
                var usuario = await _context.Usuarios
                    .AsNoTracking()
                    .FirstOrDefaultAsync(u => u.CorreoElectronico == correo);


                if (usuario != null)
                {
                    ML.Usuario usuarioEncontrado = new ML.Usuario();
                    usuarioEncontrado.IdUsuario = usuario.IdUsuario;
                    usuarioEncontrado.Nombre = usuario.Nombre;
                    usuarioEncontrado.ApellidoPaterno = usuario.ApellidoPaterno;
                    usuarioEncontrado.ApellidoMaterno = usuario.ApellidoMaterno;
                    usuarioEncontrado.CorreoElectronico = usuario.CorreoElectronico;
                    usuarioEncontrado.PasswordHash = usuario.PasswordHash;
                    usuarioEncontrado.FechaCreacion = usuario.FechaCreacion;
                    usuarioEncontrado.Activo = usuario.Activo;

                    result.Correct = true;
                    result.Object = usuarioEncontrado;
                }
                else
                {
                    result.Correct = false;
                    result.ErrorMessage = "No se encontró un usuario con ese correo.";
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = $"Ocurrió un error al consultar el usuario. {ex.Message} {ex.InnerException?.Message}";
                //result.Ex = ex;
            }

            return result;
        }

        public async Task<ML.Result> AgregarAsync(ML.Usuario usuario)
        {
            ML.Result result = new ML.Result();

            try
            {
                var filasAfectadas = await _context.Database.ExecuteSqlInterpolatedAsync($@"
                    EXEC UsuarioAdd
                        @Nombre = {usuario.Nombre},
                        @ApellidoPaterno = {usuario.ApellidoPaterno},
                        @ApellidoMaterno = {usuario.ApellidoMaterno},
                        @CorreoElectronico = {usuario.CorreoElectronico},
                        @PasswordHash = {usuario.PasswordHash}");

                if (filasAfectadas > 0)
                {
                    result.Correct = true;
                }
                else
                {
                    result.Correct = false;
                    result.ErrorMessage = "No fue posible registrar el usuario.";
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
                result.Ex = ex;
            }

            return result;
        }

        public async Task<ML.Result> GetAllAsync()
        {
            ML.Result result = new ML.Result();

            try
            {
                var usuarios = await _context.Database.SqlQueryRaw<ML.DTOs.UsuarioResponse>("EXEC UsuarioGetAll").ToListAsync();

                result.Objects = usuarios.Cast<object>().ToList();

                result.Correct = true;
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage =
                    $"Ocurrió un error al obtener los usuarios. {ex.Message}";

                result.Ex = ex;
            }

            return result;
        }

    }
}
