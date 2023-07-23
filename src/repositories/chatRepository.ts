import mongoConnection from "@/lib/mongoConnection";
import { type User as UserType, User } from "@/models/User";

abstract class ChatRepositoryBase {
  abstract getChatHistory(): Promise<ChatHistory[] | undefined>;
  abstract getChats(): Promise<Chat[]>;
  abstract createChat(chat: Chat): Promise<void>;
  abstract getChatMessages(id: number): Promise<Chat | undefined>;
  abstract addChatMessages(id: string, message: ChatCompletion, reply: ChatCompletion): Promise<void>;
  abstract updateChatTitle(id: string, title: string): Promise<void>;
  abstract deleteChat(id: string): Promise<void>;
}

export default class ChatRepository implements ChatRepositoryBase {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  async getChatHistory(): Promise<ChatHistory[] | undefined> {
    await mongoConnection();
    const user = await User.findById<User>(this.email).select("chats.title chats._id");
    const history = user?.chats;

    return history;
  }

  async getChats(): Promise<Chat[]> {
    await mongoConnection();
    const messages = User.findById(this.email).select("messages");

    return messages;
  }

  async getChatMessages(id: number): Promise<Chat | undefined> {
    await mongoConnection();
    const user = await User.findById<UserType>(this.email, {
      chats: {
        $elemMatch: {
          _id: id,
        },
      },
    });
    const messages = user?.chats[0];

    return messages;
  }

  async createChat(chat: Chat): Promise<void> {
    await mongoConnection();
    await User.findByIdAndUpdate(this.email, {
      $push: {
        chats: chat,
      },
    });
  }

  async addChatMessages(id: string, message: ChatCompletion, reply: ChatCompletion): Promise<void> {
    await mongoConnection();
    const messages = [message, reply];
    await User.updateOne(
      { _id: this.email, "chats._id": id },
      {
        $push: {
          "chats.$.messages": messages,
        },
      }
    );
  }

  async updateChatTitle(id: string, title: string): Promise<void> {
    await mongoConnection();
    await User.updateOne(
      { _id: this.email, "chats._id": id },
      {
        $set: {
          "chats.$.title": title,
        },
      }
    );
  }

  async deleteChat(id: string): Promise<void> {
    await mongoConnection();
    await User.updateOne(
      { _id: this.email },
      {
        $pull: { "messages._id": id },
      }
    );
  }
}
