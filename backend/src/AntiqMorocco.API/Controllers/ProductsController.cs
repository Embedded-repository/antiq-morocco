using Microsoft.AspNetCore.Mvc;
using AntiqMorocco.Application.Common.DTOs;

namespace AntiqMorocco.API.Controllers;

[Route("api/v1/products")]
public class ProductsController : BaseController
{
    [HttpGet]
    [ProducesResponseType(typeof(PaginatedResult<ProductDto>), 200)]
    public async Task<IActionResult> Search(
        [FromQuery] string? keyword,
        [FromQuery] string? category,
        [FromQuery] string? city,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] string? condition,
        [FromQuery] bool? hasAuction,
        [FromQuery] string sortBy = "newest",
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 24)
    {
        await Task.CompletedTask;
        return Ok(new PaginatedResult<ProductDto>(new List<ProductDto>(), 0, page, pageSize, 0));
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ProductDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById(Guid id)
    {
        await Task.CompletedTask;
        return NotFound();
    }

    [HttpPost]
    [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Seller,VerifiedDealer,Admin")]
    [ProducesResponseType(typeof(ProductDto), 201)]
    public async Task<IActionResult> Create([FromBody] CreateProductRequest request)
    {
        await Task.CompletedTask;
        return StatusCode(501);
    }

    [HttpPut("{id:guid}")]
    [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Seller,VerifiedDealer,Admin")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProductRequest request)
    {
        await Task.CompletedTask;
        return StatusCode(501);
    }

    [HttpDelete("{id:guid}")]
    [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Seller,VerifiedDealer,Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await Task.CompletedTask;
        return StatusCode(501);
    }

    [HttpPost("{id:guid}/images")]
    [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Seller,VerifiedDealer,Admin")]
    public async Task<IActionResult> UploadImages(Guid id, [FromForm] List<IFormFile> images)
    {
        await Task.CompletedTask;
        return StatusCode(501);
    }
}
