using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;
using System;
using ASP_REST_API_MAILGUN.Models;
using Microsoft.AspNetCore.Cors;
using System.Diagnostics;

namespace ASP_REST_API_MAILGUN.Controllers;

[EnableCors]
[ApiController]
[Route("[controller]")]
public class MailController : ControllerBase
{
    [HttpPost("sendEmail")]
    public IActionResult SendEmail([FromBody] EmailModel emailModel)
    {
        try
        {
            var message = new MimeMessage();

            // Set the sender dynamically based on the user's input
            message.From.Add(new MailboxAddress(emailModel.FromName, emailModel.FromAddress));

            // Set the fixed recipient (your email address)
            message.To.Add(new MailboxAddress("Jesper Veld", "Jesperveldspam@gmail.com"));

            message.Subject = emailModel.Subject;

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.TextBody = emailModel.PhoneNumber;
            bodyBuilder.TextBody += emailModel.Body;
            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.mailgun.org", 587, false); // Replace with your SMTP server details
                client.Authenticate("postmaster@sandboxc12153968eda4af49944650cd1101ae4.mailgun.org", "7b9c8a03ec3ac11fe990aadf3f844299-b7b36bc2-a37b1e46");

                client.Send(message);
                client.Disconnect(true);
            }
            Debug.WriteLine("success");
            return Ok("Email sent successfully");
        }
        catch (Exception ex)
        {
            Console.WriteLine(" fail");
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }
}
