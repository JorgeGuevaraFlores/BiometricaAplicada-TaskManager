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

        public async Task<ML.Result> GetAllAsync()
        {
            ML.Result result = new ML.Result();

            try
            {
                result = await _usuarioRepositorio.GetAllAsync();

                if (!result.Correct)
                {
                    result.ErrorMessage = string.IsNullOrWhiteSpace(result.ErrorMessage)
                        ? "No fue posible obtener los usuarios."
                        : result.ErrorMessage;
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage =
                    $"Ocurrió un error al obtener los usuarios: {ex.Message}";
                result.Ex = ex;
            }

            return result;
        }

        public async Task<ML.Result> GetByIdAsync(Guid IdUsuario)
        {
            ML.Result result = new ML.Result();

            try
            {
                result = await _usuarioRepositorio.GetByIdAsync(IdUsuario);

                if (!result.Correct)
                {
                    result.ErrorMessage = string.IsNullOrWhiteSpace(result.ErrorMessage)
                        ? "No se encontro el usuario"
                        : result.ErrorMessage;
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage =
                    $"Ocurrió un error al buscar al usuario: {ex.Message}";
                result.Ex = ex;
            }

            return result;
        }

        public async Task<Result> UpdateAsync(UsuarioRegistroRequest usuarioRequest)
        {
            Result result = new Result();

            try
            {

                string passwordHash = BCrypt.Net.BCrypt.HashPassword(usuarioRequest.Password);

                Usuario usuario = new Usuario();

                usuario.IdUsuario = usuarioRequest.IdUsuario ?? null;

                usuario.Nombre = usuarioRequest.Nombre.Trim();
                usuario.ApellidoPaterno = usuarioRequest.ApellidoPaterno.Trim();

                usuario.ApellidoMaterno = string.IsNullOrWhiteSpace(usuarioRequest.ApellidoMaterno)
                    ? null
                    : usuarioRequest.ApellidoMaterno.Trim();

                usuario.CorreoElectronico = usuarioRequest.CorreoElectronico.Trim().ToLower();
                usuario.PasswordHash = passwordHash;

                result = await _usuarioRepositorio.UpdateAsync(usuario);
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

    }
}
