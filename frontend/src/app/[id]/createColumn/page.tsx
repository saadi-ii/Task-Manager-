import { CreateColumnForm } from "@/features/column/components/CreateColumnForm";
import { PageProps } from "@/lib/types/pageProps.types";

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <div>
      <CreateColumnForm boardid={id} />
    </div>
  );
}
