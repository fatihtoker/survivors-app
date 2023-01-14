import { IBattle } from "@/types";

type BattleItemProps = {
  battle: IBattle;
};

export default function BattleItem(props: BattleItemProps) {
  const { battle } = props;
  return (
    <li className="flex px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
      <img
        className="mr-2"
        src={"/battle.png"}
        alt="battle"
        style={{ width: "auto", height: 24 }}
      />
      {battle.name}

      <div className="ml-auto w-24 flex">
        <img
          className="mr-2 animate-pulse"
          src={"/kill.png"}
          alt="kill"
          style={{ width: "auto", height: 24 }}
        />
        {battle.kill}
      </div>
    </li>
  );
}
