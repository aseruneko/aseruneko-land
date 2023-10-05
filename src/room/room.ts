import { User } from "../user/user.ts";

export class Room {
  constructor(
    public id: string,
    public updatedAt: Date,
    public roomType: RoomType,
    public owner: User,
    public users: User[] = [],
  ) {}
  static reconstruct(data: Room): Room {
    return new Room(
      data.id,
      data.updatedAt,
      data.roomType as RoomType,
      User.reconstruct(data.owner),
      data.users.map((user: User) => User.reconstruct(user)),
    );
  }
  static create(roomType: RoomType, owner: User): Room {
    return new Room(
      crypto.randomUUID(),
      new Date(),
      roomType,
      owner,
      [owner],
    );
  }
  join(user: User) {
    const alreadyJoined = this.users.find((u) => u.id === user.id);
    if (!alreadyJoined) {
      this.users.push(user);
      this.updatedAt = new Date();
    }
  }
  update() {
    this.updatedAt = new Date();
  }
}

export enum RoomType {
  JareBook = "JARE_BOOK",
}

export class RoomRepository {
  constructor(private kv: Deno.Kv) {}
  async findBy(id: string): Promise<Room> {
    return await this.kv.get(["rooms", id]).then((res) => {
      return Room.reconstruct(res.value as Room);
    });
  }
  async save(room: Room): Promise<void> {
    await this.kv.set(["rooms", room.id], room);
  }
}
