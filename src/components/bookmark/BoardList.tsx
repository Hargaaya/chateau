"use client";

import fetcher from "@/lib/fetcher";
import { CopyIcon } from "lucide-react";
import React from "react";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const BoardList = (props: Props) => {
  const { data: boards, error } = useSWR<Board[]>("/api/board", fetcher);

  if (error) return <p>Failed to load boards</p>;

  if (!boards) return <Skeleton className="col-span-3 h-10 bg-secondary" />;

  return (
    <React.Fragment>
      {boards && (
        <div className="grid gap-4 py-4">
          {Array.isArray(boards) &&
            boards.map((board: Board) => (
              <div className="flex justify-between items-center p-2 bg-secondary rounded-lg overflow-clip" key={board._id}>
                <p>{board.name}</p>
                <div className="flex items-center gap-2">
                  <div>
                    <CopyIcon className="cursor-pointer" size="16px" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default BoardList;
