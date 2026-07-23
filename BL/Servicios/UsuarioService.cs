using BL.Interfaces;
using ML;
using ML.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Servicios
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;

        public UsuarioService(IUsuarioRepositorio usuarioRepositorio)
        {
            _usuarioRepositorio = usuarioRepositorio;
        }

        public async Task<ML.Result> RegistroAsync(UsuarioRegistroRequest request)
        {
            ML.Result result = new ML.Result();

            try
            {
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

                Usuario usuario = new Usuario();

                usuario.Nombre = request.Nombre.Trim();
                usuario.ApellidoPaterno = request.ApellidoPaterno.Trim();

                usuario.ApellidoMaterno = string.IsNullOrWhiteSpace(request.ApellidoMaterno)
                    ? null
                    : request.ApellidoMaterno.Trim();

                usuario.CorreoElectronico = request.CorreoElectronico.Trim().ToLower();
                usuario.PasswordHash = passwordHash;

                result = await _usuarioRepositorio.AgregarAsync(usuario);

                if (result.Correct)
                {
                    result.ErrorMessage = "Usuario registrado correctamente.";
                }
                else
                {
                    result.ErrorMessage = "Usuario no registrado.";
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage =
                    $"Ocurrió un error al registrar al usuario: {ex.Message}";
                result.Ex = ex;
            }

            return result;
        }
    }
}
