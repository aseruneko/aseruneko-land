import { Room } from "../room/room.ts";
import { User } from "../user/user.ts";
import { JareBookBook, JareBookPage } from "./jare-book-book.ts";

export class JareBookRoom {
  constructor(
    public roomId: string,
    public users: { user: User; isReady: boolean }[],
    public pageNum: number,
    public limitMin: number,
    public isRandom: boolean,
    public status: JareBookRoomStatus,
    public books: JareBookBook[],
    public editingPageNum?: number,
  ) {}
  static reconstruct(data: JareBookRoom) {
    return new JareBookRoom(
      data.roomId,
      data.users,
      data.pageNum,
      data.limitMin,
      data.isRandom,
      data.status,
      data.books,
      data.editingPageNum,
    );
  }
  static create(
    room: Room,
    pageNum: number,
    limitMin: number,
    isRandom: boolean,
  ): JareBookRoom {
    return new JareBookRoom(
      room.id,
      [{ user: room.owner, isReady: true }],
      pageNum,
      limitMin,
      isRandom,
      JareBookRoomStatus.Waiting,
      [],
    );
  }
  join(user: User) {
    const alreadyJoined = this.users.find((u) => u.user.id === user.id);
    if (!alreadyJoined) {
      this.users.push({ user: user, isReady: true });
    }
  }
  start() {
    let order = this.makeOrder();
    if (this.isRandom) {
      [...Array(Math.floor(this.pageNum / 3))].forEach(() => {
        order = this.shuffle(order);
      });
    }
    this.books = order.map((o) => {
      return {
        authorId: o.author,
        pages: o.writers.map((w) => {
          return {
            writerId: w,
          } as JareBookPage;
        }),
      } as JareBookBook;
    });
    this.status = JareBookRoomStatus.Titling;
    this.users = this.users.map((user) => {
      return { ...user, isReady: false };
    });
  }
  editTitle(userId: string, title: string) {
    this.books = this.books.map((b) => {
      if (b.authorId == userId) {
        return { ...b, title: title };
      } else return b;
    });
    this.users = this.users.map((u) => {
      if (u.user.id == userId) {
        return { ...u, isReady: true };
      } else return u;
    });
    if (this.users.every((u) => u.isReady)) {
      this.status = JareBookRoomStatus.Writing;
      this.editingPageNum = 0;
      this.users = this.users.map((u) => {
        return { ...u, isReady: false };
      });
    }
  }
  editPage(userId: string, pageNum: number, content: string) {
    this.books = this.books.map((b) => {
      if (b.pages[pageNum].writerId == userId) {
        const pages = b.pages;
        pages[pageNum] = { writerId: userId, content: content };
        return { ...b, pages: pages };
      } else return b;
    });
    this.users = this.users.map((u) => {
      if (u.user.id == userId) {
        return { ...u, isReady: true };
      } else return u;
    });
    if (this.users.every((u) => u.isReady)) {
      this.editingPageNum = (this.editingPageNum ?? 0) + 1;
      if (this.editingPageNum >= this.pageNum) {
        this.status = JareBookRoomStatus.Finished;
      } else {
        this.users = this.users.map((u) => {
          return { ...u, isReady: false };
        });
      }
    }
  }
  searchBook(userId: string): JareBookBook | undefined {
    return this.books.find((book) =>
      book.pages[this.editingPageNum ?? 0].writerId == userId
    );
  }
  private makeOrder(): { author: string; writers: string[] }[] {
    const order: { author: string; writers: string[] }[] = [];
    const users = this.users;
    if (this.isRandom) users.sort((a, b) => 0.5 - Math.random());
    users.forEach((user, i) => {
      order.push({
        author: user.user.id,
        writers: [...Array(this.pageNum).keys()].map((j) =>
          this.users[(j + i + 1) % this.users.length].user.id
        ),
      });
    });
    return order;
  }
  private shuffle(
    order: { author: string; writers: string[] }[],
  ): { author: string; writers: string[] }[] {
    const a = Math.floor(Math.random() * this.pageNum);
    const b = Math.floor(Math.random() * this.pageNum);
    return order.map((o) => {
      return {
        author: o.author,
        writers: o.writers.map((w, idx) => {
          if (idx === a) return o.writers[b];
          if (idx === b) return o.writers[a];
          return w;
        }),
      };
    });
  }
}

enum JareBookRoomStatus {
  Waiting = "WAITING",
  Titling = "TITLING",
  Writing = "WRITING",
  Finished = "FINISHED",
}

export class JareBookRoomRepository {
  constructor(private kv: Deno.Kv) {}
  async findBy(roomId: string): Promise<JareBookRoom> {
    return await this.kv.get(["jare-book-rooms", roomId]).then((res) => {
      return JareBookRoom.reconstruct(res.value as JareBookRoom);
    });
  }
  async save(jareBookRoom: JareBookRoom): Promise<void> {
    await this.kv.set(["jare-book-rooms", jareBookRoom.roomId], jareBookRoom);
  }
}
