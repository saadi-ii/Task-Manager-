import { PageProps } from "@/lib/types/pageProps.types";
import { ColumnList } from "@/features/column/components/ColumnList";

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col h-full w-full">
      <ColumnList boardid={id} />
    </div>
  );
}
