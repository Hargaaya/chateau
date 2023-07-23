import { Input } from "@/components/ui/input";
import { useState, ChangeEvent, MouseEvent } from "react";
import { Button } from "../ui/button";
import React from "react";

type Props = {
  snippet: Snippet;
};

const NewBoardForm = ({ snippet }: Props) => {
  const [boardName, setBoardName] = useState("");
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setBoardName(event.target.value);

  const handleAddClick = async (_: MouseEvent<HTMLButtonElement>) => {
    const board = {
      name: boardName,
      snippets: [snippet],
    };

    await fetch("/api/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board }),
    }).then((res) => {
      if (res.ok) {
        setBoardName("");
      }
    });
  };

  return (
    <React.Fragment>
      <Input className="col-span-2" placeholder="New Board Name" value={boardName} onChange={handleNameChange} />
      <Button className="col-span-1" onClick={handleAddClick}>
        Add Board
      </Button>
    </React.Fragment>
  );
};

export default NewBoardForm;
