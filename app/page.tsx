import AboutSection from "./components/aboutSection";
import HomeSection from "./components/homeSection";
import Layout from "./components/layout";
// import ProjectSection from "./components/projectSection";
import WorkSection from "./components/workSection";

export default function Home() {
  return (
    <Layout>
      <div className="gap-8">
        <div className="lg:col-span-1">
          <HomeSection />
        </div>
        <div className="lg:col-span-2">
          <AboutSection/>
        </div>
        <div className="lg:col-span-3">
          <WorkSection/>
        </div>
        {/* <div className="lg:col-span-4">
          <ProjectSection />
        </div> */}
      </div>
    </Layout>
  );
}
