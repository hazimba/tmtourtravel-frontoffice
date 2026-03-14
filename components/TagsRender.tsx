import { Badge } from "./ui/badge";

interface TagsRenderProps {
  tags: string[];
}

const TagsRender = ({ tags }: TagsRenderProps) => {
  return (
    <div className="absolute top-3 right-3 flex gap-2 z-10">
      {tags.map((tag: string, tagIndex: number) => (
        <Badge
          key={tagIndex}
          className={
            (tag === "HOT"
              ? "bg-red-600 text-white"
              : tag === "POPULAR"
              ? "bg-yellow-400 text-black"
              : tag === "NEW"
              ? "bg-green-600 text-white"
              : "bg-gray-300 text-gray-700") +
            " px-2 py-1 text-xs font-bold rounded-full"
          }
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};
export default TagsRender;
