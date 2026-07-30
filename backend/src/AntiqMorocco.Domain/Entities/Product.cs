namespace AntiqMorocco.Domain.Entities;

public class Product
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public bool IsNegotiable { get; set; }
    public bool HasAuction { get; set; }
    public string Condition { get; set; } = string.Empty;
    public int? Year { get; set; }
    public string? Origin { get; set; }
    public string? Material { get; set; }
    public string? Dimensions { get; set; }
    public string? Weight { get; set; }
    public string City { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public bool ShippingAvailable { get; set; }
    public bool PickupAvailable { get; set; }
    public string Status { get; set; } = "pending";
    public int ViewCount { get; set; }
    public int FavoriteCount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public Guid SellerId { get; set; }
    public Guid CategoryId { get; set; }
    public User Seller { get; set; } = null!;
    public Category Category { get; set; } = null!;
    public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();
    public ICollection<Offer> Offers { get; set; } = new List<Offer>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    public Auction? Auction { get; set; }
}
