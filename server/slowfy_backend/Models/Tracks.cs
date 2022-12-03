namespace slowfy_backend.Models;

public class Tracks
{
    public int Id { get; set; }
    public string Author { get; set; }
    public string Title { get; set; }
    public string Duration { get; set; }
    public string Source { get; set; }
    public string ImageSource { get; set; }
    public bool Explicit { get; set; }
}