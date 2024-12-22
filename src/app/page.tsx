"use client";

import { useImages } from "@/hooks/hooks.images";

const Page = () => {
  const { images } = useImages();
  console.log(images);

  return <div>{JSON.stringify(images)}</div>;
};

export default Page;
