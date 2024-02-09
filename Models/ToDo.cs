namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string Status { get; set; } = "Not started";
        public string? Secret { get; set; }
        public string? PersonAssigned { get; set; } 
        public string Priority { get; set; } = "Medium"; 
    }
}
