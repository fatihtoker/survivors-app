import Link from "next/link";
import { ISurvivor } from "@/types";
import { ClanBadge, Tag } from "@/components";

type SurvivorCardProps = {
  survivor: ISurvivor;
  toggleInfection?: () => void;
  hover?: boolean;
};

export default function SurvivorCard(props: SurvivorCardProps) {
  const { survivor, toggleInfection, hover = true } = props;
  return (
    <Link key={survivor.id} href={`/survivor/${survivor.id}`}>
      <div
        className={`max-w-sm h-128 bg-white border border-gray-200 rounded-lg ${
          hover ? "hover:shadow-lg transform transition hover:scale-[1.01]" : ""
        }`}
      >
        <div className="h-96 overflow-hidden">
          <img
            className="rounded-t-lg object-fit"
            src={`/survivors/${survivor.img}`}
            alt={`survivor-${survivor.id}`}
          />
        </div>
        <div className="p-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {survivor.name}
          </h5>
          <span className="flex items-start">
            <ClanBadge clan={survivor.clan} />
            {survivor.infected && (
              <Tag
                label="Infected"
                bgColor="bg-red-800"
                labelColor="text-white"
              />
            )}
            <div
              className="ml-auto p-4 rounded-lg border border-slate-300 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleInfection && toggleInfection();
              }}
            >
              <img
                className="hover:animate-spin"
                src={
                  survivor.infected
                    ? "/antidote-potion.png"
                    : "/infect-potion.png"
                }
                alt={`potion-${survivor.infected}`}
              />
              Use Potion
            </div>
          </span>
        </div>
      </div>
    </Link>
  );
}
