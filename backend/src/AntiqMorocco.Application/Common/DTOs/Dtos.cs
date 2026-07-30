namespace AntiqMorocco.Application.Common.DTOs;

public record ProductDto(
    Guid Id, string Title, string Description, decimal Price,
    bool IsNegotiable, bool HasAuction, string Condition,
    int? Year, string? Origin, string? Material, string? Dimensions,
    string City, string Status, int ViewCount, int FavoriteCount,
    bool ShippingAvailable, bool PickupAvailable,
    DateTime CreatedAt, DateTime UpdatedAt,
    CategoryDto Category, SellerSummaryDto Seller, List<string> Images,
    AuctionDto? Auction = null
);

public record CategoryDto(Guid Id, string Name, string NameFr, string Slug, string Icon);

public record SellerSummaryDto(
    Guid Id, string Name, string? Avatar, double Rating,
    int ReviewCount, bool IsVerified, string City, DateTime MemberSince
);

public record AuctionDto(
    Guid Id, decimal StartPrice, decimal CurrentBid,
    decimal MinBidIncrement, DateTime EndDate, int BidCount
);

public record RegisterRequest(
    string FirstName, string LastName,
    string Email, string Password, string Phone, string Role
);

public record LoginRequest(string Email, string Password);

public record AuthResponse(
    string AccessToken, string RefreshToken,
    DateTime ExpiresAt, UserDto User
);

public record UserDto(
    Guid Id, string Email, string Name,
    string? Avatar, string Role, bool IsVerified
);

public record CreateProductRequest(
    string Title, string Description, decimal Price,
    bool IsNegotiable, Guid CategoryId, string Condition,
    string City, bool ShippingAvailable, bool PickupAvailable,
    int? Year = null, string? Origin = null, string? Material = null
);

public record UpdateProductRequest(
    string? Title, string? Description, decimal? Price,
    bool? IsNegotiable, string? Condition, string? Status
);

public record SearchProductsRequest(
    string? Keyword, string? Category, string? City,
    decimal? MinPrice, decimal? MaxPrice, string? Condition,
    bool? HasAuction, string SortBy = "newest",
    int Page = 1, int PageSize = 24
);

public record PaginatedResult<T>(
    List<T> Data, int Total, int Page, int PageSize, int TotalPages
);

public record OfferDto(
    Guid Id, ProductDto Product, UserDto Buyer,
    decimal Amount, string? Message, string Status, DateTime CreatedAt
);

public record OrderDto(
    Guid Id, ProductDto Product, UserDto Buyer, UserDto Seller,
    decimal TotalAmount, string Status, string? TrackingNumber,
    DateTime CreatedAt, DateTime UpdatedAt
);
