
import List from "./components/list";

import TicTacToeGame from "./components/tictactoe";
import RootLayout from "./layout";


export default function Home() {
  return (
    
      
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
        <div ><List/></div>
          <div ><TicTacToeGame/></div>
        </div>
     
      

    
   );
}
