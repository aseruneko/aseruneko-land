export class Hacho {
  constructor(
    public id: string,
    public owner: HachoUser,
    public users: HachoUser[],
    public status: HachoStatus,
    public maxRound: number,
    public round: number,
    public point: number,
    public createdAt: Date,
    public password?: string,
  ) {
  }
  static create(
    userId: string,
    userName: string,
    maxRound: number,
    password?: string,
  ) {
    const user = { id: userId, name: userName } as HachoUser;
    return new Hacho(
      crypto.randomUUID(),
      user,
      [user],
      HachoStatus.Waiting,
      maxRound,
      0,
      0,
      new Date(),
      password,
    );
  }
  join(
    userId: string,
    userName: string,
    password?: string,
  ): boolean {
    if (this.password ? this.password == password : true) {
      if (this.users.some((u) => u.id == userId)) {
        this.users = this.users.map((u) => {
          if (u.id == userId) {
            return {
              id: u.id,
              name: userName,
            };
          } else return u;
        });
      } else {
        this.users.push(
          {
            id: userId,
            name: userName,
          },
        );
      }
      return true;
    } else {
      return false;
    }
  }
  static reconstruct(entityIf: Hacho): Hacho {
    return new Hacho(
      entityIf.id,
      entityIf.owner,
      entityIf.users,
      entityIf.status,
      entityIf.maxRound,
      entityIf.round,
      entityIf.point,
      entityIf.createdAt,
      entityIf.password,
    );
  }
  hidePassword() {
    this.password = undefined;
  }
  async save(kv: Deno.Kv) {
    await kv.set(["hachoes", this.id], this);
  }
  static findBy(kv: Deno.Kv, id: string): Promise<Hacho | undefined> {
    return kv.get(["hachoes", id]).then((rec: any) => {
      const entityIf = rec.value as Hacho;
      return Hacho.reconstruct(entityIf);
    }).catch(() => {
      return undefined;
    });
  }
}

export interface HachoUser {
  id: string;
  name: string;
}

export enum HachoStatus {
  Waiting = "WAITING",
  Ongoing = "ONGOING",
  Finished = "FINISHED",
}
