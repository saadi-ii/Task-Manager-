import {Left} from "./Left"
import {Right} from "./Right"
export const Head = () => {
  return (

    <div className="flex min-h-[90vh] justify-center items-center gap-5 max-xl:gap-0 bg-muted max-xl:flex-col p-2 max-xl:py-10">
      <Left/>
      <Right/>
    </div >


  );
};

