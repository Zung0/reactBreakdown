import Footer from "./components/footer";
import List from "./components/list";
import NavbarDefault from "./components/navbar";
import TicTacToeGame from "./components/tictactoe";


export default function Home() {
  return (
    
      
      <div>
      <NavbarDefault/>
      <List/>

      <Footer/>
      <div className="flex justify-center mt-10">
        <TicTacToeGame/>
      </div>
      
   
      </div> 
      
    
   );
}
