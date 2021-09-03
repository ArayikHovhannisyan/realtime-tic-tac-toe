using System.Collections.Generic;

namespace TicTacToeAPI.Models
{
    public class BoardData
    {
        public string NextPlayer { get; set; }
        public List<string> FigurePlacement { get; set; }
    }
}
