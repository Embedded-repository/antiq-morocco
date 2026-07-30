namespace AntiqMorocco.Domain.Entities;

public class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string NameAr { get; set; } = string.Empty;
    public string NameFr { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public ICollection<Product> Products { get; set; } = new List<Product>();
}

public class ProductImage
{
    public Guid Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public bool IsMain { get; set; }
    public int Order { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
}

public class Auction
{
    public Guid Id { get; set; }
    public decimal StartPrice { get; set; }
    public decimal? ReservePrice { get; set; }
    public decimal CurrentBid { get; set; }
    public decimal MinBidIncrement { get; set; } = 100;
    public DateTime EndDate { get; set; }
    public bool IsActive { get; set; } = true;
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public ICollection<Bid> Bids { get; set; } = new List<Bid>();
}

public class Bid
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid AuctionId { get; set; }
    public Guid BidderId { get; set; }
    public Auction Auction { get; set; } = null!;
    public User Bidder { get; set; } = null!;
}

public class Order
{
    public Guid Id { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; } = "pending";
    public string? TrackingNumber { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public Guid ProductId { get; set; }
    public Guid BuyerId { get; set; }
    public Guid SellerId { get; set; }
    public Product Product { get; set; } = null!;
    public User Buyer { get; set; } = null!;
    public User Seller { get; set; } = null!;
}

public class Offer
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public string? Message { get; set; }
    public string Status { get; set; } = "pending";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid ProductId { get; set; }
    public Guid BuyerId { get; set; }
    public Product Product { get; set; } = null!;
    public User Buyer { get; set; } = null!;
}

public class Review
{
    public Guid Id { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public bool IsVerifiedPurchase { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid ReviewerId { get; set; }
    public Guid ProductId { get; set; }
    public User Reviewer { get; set; } = null!;
    public Product Product { get; set; } = null!;
}

public class Favorite
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid UserId { get; set; }
    public Guid ProductId { get; set; }
    public User User { get; set; } = null!;
    public Product Product { get; set; } = null!;
}

public class Message
{
    public Guid Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid SenderId { get; set; }
    public Guid ConversationId { get; set; }
    public User Sender { get; set; } = null!;
}

public class Notification
{
    public Guid Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public bool IsRead { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
}
