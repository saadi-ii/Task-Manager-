import { Subtask } from "@/lib/types/subtask.types";
import { ItemName } from "@/shared/components/ItemName";
import { RenameButton } from "@/shared/components/RenameButton";
import { DeleteButton } from "@/shared/components/DeleteButton";
import { DueDate } from "@/shared/components/DueDate";
import { Priority } from "@/shared/components/Priority";
import { Menu } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useLayoutEffect, useState, useRef } from "react";

interface SubtaskCardProps {
  subtask: Subtask;
  onChanged: () => void;
}

export const SubtaskCard = ({ subtask, onChanged }: SubtaskCardProps) => {
  const [headVisible, setheadVisible] = useState(false);
  const [priority, setPriority] = useState("");
  const [menuCoords, setMenuCoords] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, () => setheadVisible(false), triggerRef);

  useLayoutEffect(() => {
    if (!headVisible || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuCoords({ top: rect.bottom + 4, left: rect.right - 80 });
  }, [headVisible]);

  const priorityBorder =
    priority === "urgent" ? "border-l-red-500"
    : priority === "high" ? "border-l-orange-500"
    : priority === "normal" ? "border-l-yellow-500"
    : priority === "low" ? "border-l-green-500"
    : "border-l-gray-200";

  return (
    <div className={`bg-card text-card-foreground h-fit p-2 rounded-2xl flex flex-col gap-2 m-2 border-l-4 ${priorityBorder}`}>
      <header className="flex justify-between items-center">
        <ItemName name={subtask.subtaskname} />
        <div>
          <div ref={triggerRef} className="text-muted-foreground cursor-pointer" onClick={() => setheadVisible((v) => !v)}>
            <Menu className="size-4" />
          </div>
          {headVisible && menuCoords && (
            <div
              ref={panelRef}
              style={{ top: menuCoords.top, left: menuCoords.left }}
              className="fixed bg-accent w-24 flex flex-col items-start pl-1 gap-0.5 border rounded-lg p-1 border-border z-50 shadow-lg"
            >
              <RenameButton mode="subtask" taskid={subtask.taskid} subtaskname={subtask.subtaskname} onSuccess={onChanged} />
              <DeleteButton mode="subtask" subtaskname={subtask.subtaskname} taskid={subtask.taskid} onSuccess={onChanged} />
            </div>
          )}
        </div>
      </header>
      <main className="flex gap-0.5">
        <DueDate mode="subtask" taskid={subtask.taskid} subtaskname={subtask.subtaskname} />
        <Priority mode="subtask" taskid={subtask.taskid} subtaskname={subtask.subtaskname} onPriorityChange={setPriority} />
      </main>
    </div>
  );
};
