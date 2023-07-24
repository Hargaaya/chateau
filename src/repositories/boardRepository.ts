import mongoConnection from "@/lib/mongoConnection";
import { User } from "@/models/User";

abstract class BoardRepositoryBase {
  abstract getBoards(): Promise<Board[]>;
  abstract getBoard(id: string): Promise<Board>;
  abstract createBoard(board: Board): Promise<Board>;
  abstract updateBoard(board: Board): Promise<void>;
  abstract deleteBoard(id: string): Promise<void>;
}

class BoardRepository implements BoardRepositoryBase {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  async getBoards(): Promise<Board[]> {
    await mongoConnection();
    const { boards } = await User.findById(this.email, "boards");

    return boards;
  }

  async getBoard(id: string): Promise<Board> {
    await mongoConnection();
    const board = await User.findById(this.email).select({
      boards: {
        $elemMatch: { _id: id },
      },
    });

    return board;
  }

  async createBoard(board: Board): Promise<Board> {
    await mongoConnection();
    const newBoard = await User.findByIdAndUpdate(this.email, {
      $push: {
        boards: board,
      },
    });

    return newBoard;
  }

  async updateBoard(board: Board): Promise<void> {
    await mongoConnection();
    await User.updateOne(
      {
        _id: this.email,
        "boards._id": board._id,
      },
      {
        $set: {
          "boards.$": board,
        },
      }
    );
  }

  async deleteBoard(id: string): Promise<void> {
    await mongoConnection();
    await User.updateOne(
      { _id: this.email },
      {
        $pull: { boards: { _id: id } },
      }
    );
  }
}

export default BoardRepository;
