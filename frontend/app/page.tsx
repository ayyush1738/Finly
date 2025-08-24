import LoaderWrapper from "@/components/loaders/loaderWrapper";

export default function Home() {
  return (
    <LoaderWrapper>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1>Hii</h1>
      </div>
    </LoaderWrapper>
  );
}