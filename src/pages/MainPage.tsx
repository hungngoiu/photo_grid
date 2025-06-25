import NavBar from "@/components/NavBar";
import PhotoGrid from "@/components/PhotoGrid";

export default function MainPage() {
  return (
    <>
      <NavBar sticky></NavBar>
      <section className="pl-16 pr-16 lg:pl-32 lg:pr-32">
        <PhotoGrid />
      </section>
    </>
  );
}
