import { JSX } from "preact";

interface CardProps {
  width?: number;
}

export function Card(
  props: CardProps & JSX.HTMLAttributes<HTMLDivElement> & JSX.HTMLAttributes,
) {
  const style = "border: solid 1px #333333;" +
    "border-radius: 4px;" +
    "margin-top: 12px;" +
    "margin-bottom: 12px;" +
    "padding: 8px;" +
    "max-width: 95vw;" +
    "background-color: #ffffff;" +
    (props.width ? "width:" + props.width + "px;" : "");
  return (
    <div
      {...props}
      style={style}
    >
      {props.children}
    </div>
  );
}
