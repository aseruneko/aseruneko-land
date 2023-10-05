export class User {
  constructor(
    public id: string,
    public name: string,
  ) {}

  static reconstruct(data: User): User {
    return new User(
      data.id,
      data.name,
    );
  }
  static create(name: string): User {
    return new User(
      crypto.randomUUID(),
      name,
    );
  }
}

export class UserRepository {
  constructor(private kv: Deno.Kv) {}
  async findBy(id: string): Promise<User> {
    return await this.kv.get(["users", id]).then((res) => {
      return User.reconstruct(res.value as User);
    });
  }
  async save(user: User): Promise<void> {
    await this.kv.set(["users", user.id], user);
  }
}
