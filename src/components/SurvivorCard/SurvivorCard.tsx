import { ISurvivor } from "@/types";
import { ClanBadge, Tag } from "@/components";

type SurvivorCardProps = {
  survivor: ISurvivor;
  onClick: () => void;
};

export default function SurvivorCard(props: SurvivorCardProps) {
  const { survivor, onClick } = props;
  return (
    <div
      className={`max-w-sm h-128 bg-white border border-gray-200 rounded-lg hover:bg-green-400 hover:shadow-lg hover:scale-105 ${
        survivor.infected ? "hover:heal-cursor" : "hover:zombie-cursor"
      }`}
      onClick={onClick}
    >
      <div className="h-96 overflow-hidden">
        <img
          className="rounded-t-lg object-fit"
          src={`/survivors/${survivor?.img}`}
          alt={`survivor-${survivor?.id}`}
        />
      </div>
      <div className="p-4">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {survivor?.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700">
          <ClanBadge clan={survivor?.clan} />
          {survivor?.infected && (
            <Tag
              label="Infected"
              bgColor="bg-red-800"
              labelColor="text-white"
            />
          )}
        </p>
      </div>
    </div>
  );
}
