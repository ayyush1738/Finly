import LoaderWrapper from "@/components/loaders/loaderWrapper";
import Hero from "@/components/layout/hero";

export default function Home() {
  return (
    <LoaderWrapper>
      <div>
        <Hero />
      </div>
    </LoaderWrapper>
  );
}