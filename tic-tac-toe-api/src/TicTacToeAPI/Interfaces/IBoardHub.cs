using System.Threading.Tasks;
using TicTacToeAPI.Models;

namespace TicTacToeAPI.Interfaces
{
    public interface IBoardHub
    {
        Task ReceiveBoardData(BoardData boardData);
        Task UserJoinedNotification();
    }
}
