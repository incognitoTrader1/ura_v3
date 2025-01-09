"use client";

interface Props {
  productId: string;
}

function Likes({ productId }: Props) {
  console.log(productId);

  return <div>Likes</div>;
}

export default Likes;
