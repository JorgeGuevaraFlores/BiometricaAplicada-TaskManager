using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IAuthService
    {
        Task<ML.Result> LoginAsync(ML.LoginRequest login);
        Task<ML.Result> RenovarTokenAsync(string refreshToken);
    }
}
