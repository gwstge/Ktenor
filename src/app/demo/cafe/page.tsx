import { Header } from "@/components/demo-cafe/Header";
import { Hero } from "@/components/demo-cafe/Hero";
import { Menu } from "@/components/demo-cafe/Menu";
import { Gallery } from "@/components/demo-cafe/Gallery";
import { Reviews } from "@/components/demo-cafe/Reviews";
import { Contact } from "@/components/demo-cafe/Contact";
import { Footer } from "@/components/demo-cafe/Footer";
import { Reveal } from "@/components/demo-cafe/Reveal";

export default function CafeDemoPage() {
  return (
    <>
      <Reveal />
      <Header />
      <main>
        <Hero />
        <Menu />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
