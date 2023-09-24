import Navbar from "../components/Navbar";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <div className="w-full font-inter flex flex-col items-center">
      <Navbar />
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Generate & Share
          <br className="max-md:hidden" />
          <span className="blue_gradient text-center">AI-Powered Stories</span>
        </h1>
        <p className="desc text-center">
          Ai-Story is an open-source AI story generator tool for modern world to
          create and share creative stories
        </p>
        <Feed />
      </section>
    </div>
  );
};

export default Home;
