import { IClan } from "@/types";
import Tag from "@/components/Tag";

type ClanBadgeProps = {
  clan: IClan;
};

type IColorPair = {
  labelColor: string;
  bgColor: string;
};

export default function ClanBadge(props: ClanBadgeProps) {
  const { clan } = props;

  const getColorPair = (): IColorPair => {
    switch (clan) {
      case "Mechanic":
        return {
          labelColor: "text-green-800",
          bgColor: "bg-green-100",
        };
      case "Adventurer":
        return {
          labelColor: "text-blue-800",
          bgColor: "bg-blue-100",
        };
      case "Soldier":
        return {
          labelColor: "text-red-800",
          bgColor: "bg-red-100",
        };
      case "Scientist":
        return {
          labelColor: "text-amber-800",
          bgColor: "bg-amber-100",
        };
      case "Captain":
        return {
          labelColor: "text-purple-800",
          bgColor: "bg-purple-100",
        };
      case "Knife":
        return {
          labelColor: "text-gray-800",
          bgColor: "bg-gray-100",
        };
      default:
        return {
          labelColor: "text-gray-800",
          bgColor: "bg-gray-100",
        };
    }
  };

  return (
    <Tag
      label={clan}
      labelColor={getColorPair().labelColor}
      bgColor={getColorPair().bgColor}
    />
  );
}
