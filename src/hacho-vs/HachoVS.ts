export class HachoVS {
  constructor(
    public id: string,
    public owner: HachoVSUser,
    public users: HachoVSUser[],
    public status: HachoVSStatus,
    public maxRound: number,
    public round: number,
    public rounds: HachoVSRound[],
    public createdAt: Date,
    public password?: string,
  ) {}
  static create(
    userId: string,
    userName: string,
    maxRound: number,
    password?: string,
  ): HachoVS {
    const user = {
      id: userId,
      name: userName,
      point: 0,
      guess: undefined,
    } as HachoVSUser;
    return new HachoVS(
      crypto.randomUUID(),
      user,
      [user],
      HachoVSStatus.Waiting,
      maxRound,
      0,
      [],
      new Date(),
      password,
    );
  }
  join(
    userId: string,
    userName: string,
    password?: string,
  ): boolean {
    if (
      this.password
        ? this.password == password
        : true && this.status == HachoVSStatus.Waiting
    ) {
      if (this.users.some((u) => u.id == userId)) {
        this.users = this.users.map((u) => {
          if (u.id == userId) {
            return { ...u };
          } else return u;
        });
      } else {
        this.users.push(
          {
            id: userId,
            name: userName,
            point: 0,
            guess: undefined,
          },
        );
      }
      return true;
    } else {
      return false;
    }
  }
  start(): boolean {
    if (this.status == HachoVSStatus.Waiting) {
      this.status = HachoVSStatus.Picking;
      new Array(this.maxRound).fill("").map((_, idx) => {
        const label = HachoVS.prepareLabels().split(",");
        const picker = this.users[idx % this.users.length];
        this.rounds.push(
          {
            pickerId: picker.id,
            pickerName: picker.name,
            minLabel: label[0],
            maxLabel: label[1],
            correct: Math.floor(Math.random() * 24),
            picker: undefined,
          } as HachoVSRound,
        );
      });
      return true;
    } else return false;
  }
  pick(userId: string, pick: string): boolean {
    const round = this.rounds[this.round];
    if (round.pickerId == userId && this.status == HachoVSStatus.Picking) {
      this.rounds[this.round].picked = pick;
      this.users = this.users.map((user) => {
        if (user.id == userId) {
          return { ...user, guess: round.correct };
        } else return { ...user };
      });
      this.status = HachoVSStatus.Guessing;
      return true;
    } else return false;
  }
  guess(userId: string, guess: number): boolean {
    const user = this.users.find((u) => u.id == userId);
    const round = this.rounds[this.round];
    if (
      user && user.guess == undefined && this.status == HachoVSStatus.Guessing
    ) {
      this.users = this.users.map((user) => {
        if (user.id == userId) {
          return {
            ...user,
            guess: guess,
          };
        } else return { ...user };
      });
      if (this.users.every((u) => u.guess != undefined)) {
        this.status = HachoVSStatus.Interval;
        this.users = this.users.map((user) => {
          if (round.pickerId != user.id) {
            return {
              ...user,
              point: user.point + HachoVS.calcPoint(round.correct, user.guess!),
            };
          } else {
            return {
              ...user,
              point: user.point +
                HachoVS.calcPickerPoint(round.correct, this.users),
            };
          }
        });
      }
      return true;
    } else return false;
  }
  next(): boolean {
    if (this.status == HachoVSStatus.Interval) {
      if (this.round + 1 >= this.maxRound) {
        this.status = HachoVSStatus.Finished;
      } else {
        this.round = this.round + 1;
        this.status = HachoVSStatus.Picking;
      }
      this.users = this.users.map((user) => {
        return { ...user, guess: undefined };
      });
      return true;
    } else return false;
  }
  static prepareLabels(): string {
    const words = [
      "アーバン,ルーラル",
      "相惚れ,片思い",
      "悪意,善意",
      "悪運,幸運",
      "いい,悪い",
      "粋,野暮",
      "委細,概略",
      "嘘吐き,正直者",
      "永遠,一瞬",
      "永続的,一時的",
      "栄華,没落",
      "鋭敏,鈍感",
      "栄誉,恥辱",
      "美味しい,不味い",
      "奥義,初歩",
      "悪事,善事",
      "齷齪,悠々",
      "悪習,良習",
      "悪条件,好条件",
      "悪評,好評",
      "悪用,善用",
      "異常,正常",
      "偉人,凡人",
      "忙しい,暇",
      "有情,非情",
      "大物,小物",
      "多い,少ない",
      "大きい,小さい",
      "甘い,辛い",
      "甘い,苦い",
      "逸材,凡才",
      "一定,不定",
      "美しい,醜い",
      "鬱陶しい,清清しい",
      "内気,勝ち気",
      "うまい,へた",
      "エロス,アガペー",
      "遅い,速い",
      "劣る,優る",
      "大人,子供",
      "重い,軽い",
      "愚か,賢い",
      "汚染,清浄",
      "粗い,細かい",
      "暗黒,光明",
      "安心,心配",
      "安心,不安",
      "安全,危険",
      "案の定,案外",
      "安定,不安定",
      "安定,変動",
      "安楽,苦労",
      "違法,合法",
      "陰鬱,明朗",
      "陰気,陽気",
      "円満,不和",
      "穏健,過激",
      "穏健派,強硬派",
      "外形,実質",
      "奇禍,僥倖",
      "喜劇,悲劇",
      "勤勉,怠惰",
      "食い気,色気",
      "軽症,重症",
      "軽傷,重傷",
      "故意,過失",
      "濃い,薄い",
      "好意,敵意",
      "高価,安価",
      "高雅,低俗",
      "高貴,下賤",
      "概説,詳説",
      "害虫,益虫",
      "寡作,多作",
      "過小,過大",
      "過小,過多",
      "過剰,不足",
      "仮説,定説",
      "過疎,過密",
      "過度,適度",
      "偽善,偽悪",
      "吉夢,悪夢",
      "機敏,遅鈍",
      "起伏,平坦",
      "義務,権利",
      "空想,現実",
      "苦言,甘言",
      "愚妻,賢妻",
      "愚者,賢者",
      "具象,抽象",
      "具体,抽象",
      "形式,内容",
      "軽率,慎重",
      "合憲,違憲",
      "高尚,低俗",
      "向上,堕落",
      "後進,先進",
      "広大,狭小",
      "巧遅,拙速",
      "公的,私的",
      "華美,質素",
      "歓喜,悲哀",
      "頑丈,華奢",
      "狂気,正気",
      "強健,病弱",
      "協調,対立",
      "具体的,抽象的",
      "口軽,口重",
      "苦難,快楽",
      "愚昧,賢明",
      "傑作,駄作",
      "欠点,美点",
      "健康,病気",
      "現実,理想",
      "好評,不評",
      "幸福,不幸",
      "公平,差別",
      "巧妙,稚拙",
      "極楽,地獄",
      "閑静,喧騒",
      "簡単,複雑",
      "寛容,厳格",
      "簡略,詳細",
      "寒冷,温暖",
      "巨大,微小",
      "キラキラネーム,シワシワネーム",
      "クリエイティブ,イミテイティブ",
      "玄人,素人",
      "詳しい,疎い",
      "賢人,愚人",
      "原則,例外",
      "倹約,奢侈",
      "原理,応用",
      "古参,新参",
      "古風,今風",
      "個別,全体",
      "混乱,秩序",
      "最高,最低",
      "自愛,自虐",
      "自愛,他愛",
      "私益,公益",
      "集中,分散",
      "柔軟,強硬",
      "祝賀,哀悼",
      "衰退,発展",
      "頭脳労働,肉体労働",
      "相応,不相応",
      "罪過,功績",
      "思索的,経験的",
      "自然,人工",
      "すべすべ,ざらざら",
      "正義,不義",
      "相思相愛,片思い",
      "創造,模倣",
      "自然災害,人為災害",
      "実在,架空",
      "上品,下品",
      "処女,童貞",
      "序論,本論",
      "自力,他力",
      "静寂,喧噪",
      "精神的,物質的",
      "西洋,東洋",
      "酸性,アルカリ性",
      "湿潤,乾燥",
      "質素,贅沢",
      "詩的,散文的",
      "邪悪,善良",
      "弱者,強者",
      "自由,専制",
      "自由,束縛",
      "真実,虚偽",
      "進歩的,保守的",
      "信用,不信",
      "シンメトリック,アシメトリック",
      "絶賛,酷評",
      "全体,部分",
      "鮮明,不鮮明",
      "粗食,美食",
      "粗暴,温和",
      "外側,内側",
      "疎漏,厳密",
      "対抗,本命",
      "遅効性,速効性",
      "知能犯,強力犯",
      "低圧,高圧",
      "低位,高位",
      "低温,高温",
      "低音,高音",
      "低額,高額",
      "低学年,高学年",
      "緻密,杜撰",
      "貞淑,淫奔",
      "泥酔,微酔",
      "達筆,悪筆",
      "長編,短編",
      "特殊,一般",
      "強気,弱気",
      "つるつる,ざらざら",
      "点在,密集",
      "鈍感,敏感",
      "鈍足,俊足",
      "苦手,得手",
      "任意,強制",
      "人間界,自然界",
      "ネガティブ,ポジティブ",
      "根暗,根明",
      "賑やか,寂しい",
      "年長,年少",
      "ノーマル,アブノーマル",
      "のろのろ,てきぱき",
      "破壊,建設",
      "光,影",
      "フォーマル,インフォーマル",
      "深い,浅い",
      "働く,怠ける",
      "外れ,当たり",
      "非金属,金属",
      "不可能,可能",
      "芳香,悪臭",
      "バランス,アンバランス",
      "皮肉,世辞",
      "不純,純粋",
      "平和,戦争",
      "富裕,貧困",
      "凡策,奇策",
      "マイナー,メジャー",
      "マクロ,ミクロ",
      "マゾヒズム,サディズム",
      "短い,長い",
      "目的,手段",
      "未知,既知",
      "無知,博識",
      "無料,有料",
      "モノクロ,カラー",
      "野性的,都会的",
      "友好,敵対",
      "利点,欠点",
      "流動的,固定的",
      "ユートピア,ディストピア",
      "有名,無名",
      "弱音,強がり",
      "霊魂,肉体",
      "冷血漢,熱血漢",
      "朗報,悲報",
      "老練,幼稚",
      "露骨,婉曲",
      "和式,洋式",
      "和風,洋風",
      "悪い,良い",
      "割高,割安",
    ];
    return words[Math.floor(Math.random() * words.length)];
  }
  static calcPoint(correct: number, guess: number): number {
    const abs = Math.abs(correct - guess);
    if (abs == 0) return 7;
    if (abs == 1) return 5;
    if (abs < 4) return 3;
    if (abs < 7) return 1;
    return 0;
  }
  static calcPickerPoint(correct: number, users: HachoVSUser[]) {
    const points = users.map((user) =>
      HachoVS.calcPoint(correct, user.guess ?? 0)
    );
    const point = points.reduce((acc, p) => acc + p, 0) - 7;
    const size = points.length - 1 == 0 ? 1 : points.length - 1;
    return Math.round(point / size);
  }
  static reconstruct(entityIf: HachoVS): HachoVS {
    return new HachoVS(
      entityIf.id,
      entityIf.owner,
      entityIf.users,
      entityIf.status,
      entityIf.maxRound,
      entityIf.round,
      entityIf.rounds,
      entityIf.createdAt,
      entityIf.password,
    );
  }
  view(userId: string | undefined) {
    return new HachoVS(
      this.id,
      this.owner,
      this.users,
      this.status,
      this.maxRound,
      this.round,
      this.rounds.map((round, idx) => {
        if (
          idx == this.round && round.pickerId != userId &&
          this.status == HachoVSStatus.Guessing
        ) {
          return { ...round, correct: 0 };
        } else return { ...round };
      }),
      this.createdAt,
    );
  }
  async save(kv: Deno.Kv) {
    await kv.set(["hacho-vses", this.id], this);
  }
  static findBy(kv: Deno.Kv, id: string): Promise<HachoVS | undefined> {
    return kv.get(["hacho-vses", id]).then((rec: any) => {
      const entityIf = rec.value as HachoVS;
      return HachoVS.reconstruct(entityIf);
    }).catch(() => {
      return undefined;
    });
  }
}

export interface HachoVSUser {
  id: string;
  name: string;
  point: number;
  guess?: number;
}

export enum HachoVSStatus {
  Waiting = "WAITING",
  Picking = "PICKING",
  Guessing = "GUESSING",
  Interval = "INTERVAL",
  Finished = "FINISHED",
}

export interface HachoVSRound {
  pickerId: string;
  pickerName: string;
  minLabel: string;
  maxLabel: string;
  correct: number;
  picked?: string;
}
