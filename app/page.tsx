import AboutSection from "./components/aboutSection";
import HomeSection from "./components/homeSection";
import Layout from "./components/layout";
// import ProjectSection from "./components/projectSection";
import WorkSection from "./components/workSection";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-0">
        <HomeSection />
        <AboutSection/>
        <WorkSection/>
        {/* <ProjectSection /> */}
      </div>
    </Layout>
  );
}
