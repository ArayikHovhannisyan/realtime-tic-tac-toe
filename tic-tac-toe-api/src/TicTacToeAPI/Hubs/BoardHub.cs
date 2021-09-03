using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToeAPI.Interfaces;
using TicTacToeAPI.Models;

namespace TicTacToeAPI.Hubs
{
    public class BoardHub : Hub<IBoardHub>
    {
        public async Task JoinBoard(string boardName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, boardName);
            await Clients.GroupExcept(boardName, Context.ConnectionId).UserJoinedNotification();
        }

        public async Task SendBoardData(BoardData board, string boardName)
        {
            await Clients.Group(boardName).ReceiveBoardData(board);
        }
    }
}
