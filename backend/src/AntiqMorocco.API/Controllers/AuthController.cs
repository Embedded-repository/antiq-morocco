using Microsoft.AspNetCore.Mvc;
using AntiqMorocco.Application.Common.DTOs;

namespace AntiqMorocco.API.Controllers;

[Route("api/v1/auth")]
public class AuthController : BaseController
{
    [HttpPost("register")]
    [ProducesResponseType(typeof(AuthResponse), 200)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        await Task.CompletedTask;
        return StatusCode(501);
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponse), 200)]
    [ProducesResponseType(401)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        await Task.CompletedTask;
        return StatusCode(501);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] string refreshToken)
    {
        await Task.CompletedTask;
        return StatusCode(501);
    }

    [HttpPost("logout")]
    public IActionResult Logout() => Ok();

    [HttpPost("forgot-password")]
    public IActionResult ForgotPassword([FromBody] string email)
    {
        return Ok(new { message = "If this email exists, a reset link has been sent." });
    }
}
