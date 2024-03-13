namespace ASP_REST_API_MAILGUN.Models;

public class EmailModel
{
    public string FromName { get; set; }
    public string FromAddress { get; set; }
    public string PhoneNumber { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
}