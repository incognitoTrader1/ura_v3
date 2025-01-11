import SearchFilter from "@/components/nav/search/SearchFilter";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return <SearchFilter query={query} />;
}
