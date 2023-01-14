import Head from "next/head";
import { ISurvivor, ISurvivorsDictionary } from "@/types";
import urlJoin from "url-join";
import { Page, SurvivorCard } from "@/components";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

type IHomePageProps = {
  survivorsDictionary: ISurvivorsDictionary;
};

export const BASE_URL = "http://localhost:3000/";

export async function getStaticProps() {
  const survivorsUrl = urlJoin(BASE_URL, "api/survivors");
  const survivorsResponse = await fetch(survivorsUrl);
  const survivorsDictionary = await survivorsResponse.json();

  return {
    props: {
      survivorsDictionary,
    },
  };
}
export default function HomePage(props: IHomePageProps) {
  const [
    survivorsDictionary,
    setSurvivorsDictionary,
  ] = useState<ISurvivorsDictionary>(props.survivorsDictionary);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const toggleInfection = (selectedSurvivor: ISurvivor): void => {
    setSurvivorsDictionary({
      ...survivorsDictionary,
      [selectedSurvivor.id]: {
        ...selectedSurvivor,
        infected: !selectedSurvivor.infected,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Survivors</title>
        <meta name="description" content="fun" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-center mb-8">Zombie Apocalypse Survivors 2023</h1>
        <SearchBar onChange={handleSearchChange} searchText={searchText} />
        <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.keys(survivorsDictionary).map((survivorId) => (
            <Link key={survivor.id} href={`/survivor/${survivor.id}`}><SurvivorCard
              survivor={survivorsDictionary[survivorId]}
              onClick={() => {
                toggleInfection(survivorsDictionary[survivorId]);
              }}
            /></Link>
        
          ))}
        </div>
      </Page>
    </>
  );
}
