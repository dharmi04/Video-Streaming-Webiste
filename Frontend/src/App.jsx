import About from "./Components/About";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import Navbar from "./Components/Navbar";
import Video from "./Components/Video";

function App() {
  

  return (
   <>
   <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800">

   <Navbar />
   <HeroSection />
   {/* <About /> */}
   <Video />
   <Footer />
   </div>
   </>
  );
}

export default App;
