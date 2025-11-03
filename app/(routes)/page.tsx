import { Board } from "../components/board/Board";
import { Modals } from "../components/modals/modals";

const HomePage = () => {
  return (
    <section className="h-full">
      <Board />
      <Modals />
    </section>
  );
};

export default HomePage;
