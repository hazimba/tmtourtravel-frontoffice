import { Badge } from "./ui/badge";

interface TagsRenderProps {
  tags: string[];
  cardDesktop?: boolean;
}

const TagsRender = ({ tags, cardDesktop }: TagsRenderProps) => {
  return (
    <div className="absolute top-3 right-3 flex gap-2 z-10">
      {tags.map((tag: string, tagIndex: number) => (
        <Badge
          key={tagIndex}
          className={
            (tag === "HOT"
              ? "bg-primary text-white"
              : tag === "POPULAR"
              ? "bg-secondary text-black"
              : tag === "NEW"
              ? "bg-green-600 text-white"
              : "bg-gray-600 text-white") +
            " p-1 px-2 font-bold rounded-full tracking-widest" +
            ` ${cardDesktop ? "md:text-[10px]" : "text-[6px]"}`
          }
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};
export default TagsRender;
