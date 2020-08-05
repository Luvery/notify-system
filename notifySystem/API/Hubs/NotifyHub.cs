using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace API.Hubs
{
    public class NotifyHub : Hub
    {
        public async Task SendToAll(string description, string departmentName)
        {
            
            await Clients.All.SendCoreAsync("onMessage", new object[] { description, departmentName});
            
        }
        public async Task AnswerFromMobile(string phone, string answer)
        {
            await Clients.All.SendCoreAsync("onAnswer", new object[] { phone, answer });
        }

    }
}
