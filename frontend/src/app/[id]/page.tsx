import { PageProps } from "@/lib/types/pageProps.types";
import { BoardDetailNavbar } from "@/features/column/components/BoardDetailNavbar";
import { ColumnList } from "@/features/column/components/ColumnList";

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col h-full w-full">
      <BoardDetailNavbar />
      <ColumnList boardid={id} />
    </div>
  );
}
