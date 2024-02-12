import Fences from "../components/organisms/fences/Fences";
import Gallery from "../components/organisms/gallery/Gallery";
import Advantages from "../components/organisms/advantages/Advantages";
import Granite from "../components/organisms/granite/Granite";
import Decor from "../components/organisms/decor/Decor";
import Description from "../components/organisms/description/Description";
import Footer from "../components/molecules/footer/Footer";
import Head from "../components/organisms/head/Head";
import Kinds from "../components/organisms/kinds/Kinds";
import Map from "../components/organisms/map/Map";
import Questions from "../components/organisms/questions/Questions";
const styles = {};

const MainPage = () => {
  return (
    <>
      <Head />
      <Description />
      <Granite />
      <Advantages />
      <Kinds />
      <Decor />
      <Fences />
      <Gallery />
      <Map />
      <Questions />
      <Footer />
    </>
  );
};

export default MainPage;
