export type IClan =
  | "Mechanic"
  | "Adventurer"
  | "Soldier"
  | "Scientist"
  | "Captain"
  | "Knife";

export type ISurvivor = {
  id: string;
  name: string;
  clan: IClan;
  infected: boolean;
  img: string;
  battles: IBattle[];
};

export type ISurvivorsDictionary = {
  [id: string]: ISurvivor;
};

export type IBattle = {
  name: string;
  kill: number;
};
