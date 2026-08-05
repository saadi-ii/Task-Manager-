import { Head } from "./head/Head";
import {MainPoints} from "./MainPoints"
import {Pic} from "./Pic"
import {Card} from "./Card"
import {Footer} from "./footer/Footer"


const Home = () => {

  return (
    <div className="flex flex-col gap-30 max-sm:gap-10 text-foreground">
      <Head/>
      <MainPoints/>
      <Pic/>
      <div>
        <Card/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;