import { useSignal } from "@preact/signals";

export default function RoomCreateCard() {
  const form = useSignal(
    {
      userName: "",
      pageNum: 1,
      limitMin: 1,
      isRandom: false,
      isPublished: true,
    },
  );

  async function onSubmit() {
    console.log(
      form.value,
    );
    await fetch(`/api/jare-book/create/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    }).then(async (res) => {
      const info = await res.json();
      window.localStorage.setItem("room", JSON.stringify(info.room));
      window.localStorage.setItem("user", JSON.stringify(info.user));
      location.href = `/jare-book/rooms/${info.room.id}`;
    });
  }

  return (
    <div
      class="card small-card"
      style="min-width: 360px; max-width: 360px;"
    >
      <form name="roomCreateForm">
        <dl>
          <dt>ユーザ名</dt>
          <dd>
            <input
              class="text-input"
              type="text"
              name="userName"
              placeholder="ユーザ名を入力"
              value={form.value.userName}
              onChange={(e: any) =>
                form.value = { ...form.value, userName: e.target.value }}
            >
            </input>
          </dd>
          <dt>ページ数</dt>
          <dd>
            <input
              class="number-input"
              type="number"
              name="pageNum"
              min="1"
              max="32"
              value={form.value.pageNum}
              onChange={(e: any) =>
                form.value = {
                  ...form.value,
                  pageNum: parseInt(e.target.value),
                }}
            >
            </input>
          </dd>
          <dt>制限時間</dt>
          <dd>
            <input
              class="number-input"
              type="number"
              name="limitMin"
              min="1"
              max="32"
              value={form.value.limitMin}
              onChange={(e: any) =>
                form.value = {
                  ...form.value,
                  limitMin: parseInt(e.target.value),
                }}
            >
            </input>
          </dd>
          <dt>ランダム順</dt>
          <dd>
            <input
              class="checkbox-input"
              type="checkbox"
              name="isRandom"
              checked={form.value.isRandom}
              onChange={(e: any) =>
                form.value = { ...form.value, isRandom: e.target.checked }}
            >
            </input>
          </dd>
          <dt>作品を公開する</dt>
          <dd>
            <input
              class="checkbox-input"
              type="checkbox"
              name="isPublished"
              checked={form.value.isPublished}
              onChange={(e: any) =>
                form.value = { ...form.value, isPublished: e.target.checked }}
            >
            </input>
          </dd>
        </dl>
      </form>
      <div class="centering">
        <button
          class="primary-btn"
          style="margin-top: 8px"
          onClick={onSubmit}
        >
          部屋を作る
        </button>
      </div>
    </div>
  );
}
