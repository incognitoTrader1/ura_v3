import SearchFilter from "@/components/nav/search/SearchFilter";

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const { query } = (await searchParams) || { query: "" };

  // const business = await getBusiness(query, { category: "", address: "" });

  return <SearchFilter query={query} />;
}
