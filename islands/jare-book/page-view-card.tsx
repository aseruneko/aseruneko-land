import { escapeHtml } from "https://deno.land/x/escape@1.4.2/mod.ts";

export default function PageViewCard(
  data: { content: string | undefined },
) {
  function renderRuby(content: string): string {
    // 以下のコードはhttps://qiita.com/8amjp/items/d7c46d9dee0da4d530efを参考にしました
    return content.replace(
      /[\|｜](.+?)《(.+?)》/g,
      "<ruby>$1<rt>$2</rt></ruby>",
    )
      .replace(/[\|｜](.+?)（(.+?)）/g, "<ruby>$1<rt>$2</rt></ruby>")
      .replace(/[\|｜](.+?)\((.+?)\)/g, "<ruby>$1<rt>$2</rt></ruby>")
      .replace(/([一-龠]+)《(.+?)》/g, "<ruby>$1<rt>$2</rt></ruby>")
      .replace(/([一-龠]+)（([ぁ-んァ-ヶ]+?)）/g, "<ruby>$1<rt>$2</rt></ruby>")
      .replace(/([一-龠]+)\(([ぁ-んァ-ヶ]+?)\)/g, "<ruby>$1<rt>$2</rt></ruby>")
      .replace(/[\|｜]《(.+?)》/g, "《$1》")
      .replace(/[\|｜]（(.+?)）/g, "（$1）")
      .replace(/[\|｜]\((.+?)\)/g, "($1)");
  }
  return (
    <>
      <div
        style="witdh: 100%; white-space: pre-wrap"
        dangerouslySetInnerHTML={{
          __html: data.content ? renderRuby(escapeHtml(data.content)) : "",
        }}
      >
      </div>
    </>
  );
}
