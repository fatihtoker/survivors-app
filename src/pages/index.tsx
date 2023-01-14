import Head from "next/head";
import { ISurvivor, ISurvivorsDictionary } from "@/types";
import urlJoin from "url-join";
import { Page, SurvivorCard, SearchBar } from "@/components";
import { useEffect, useState } from "react";

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
  const [searchedSurvivorIds, setSearchedSurvivorIds] = useState<string[]>([]);

  useEffect(() => {
    setSearchedSurvivorIds(
      Object.keys(survivorsDictionary).filter((key) =>
        survivorsDictionary[key].name
          .toLowerCase()
          .startsWith(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const toggleInfection = async (
    selectedSurvivor: ISurvivor
  ): Promise<void> => {
    const toggleInfectionUrl = urlJoin(BASE_URL, "api/toggleInfection");
    const survivorResponse = await fetch(toggleInfectionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedSurvivor),
    });
    const updatedSurvivor = await survivorResponse.json();

    setSurvivorsDictionary({
      ...survivorsDictionary,
      [updatedSurvivor.id]: updatedSurvivor,
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
          {searchText
            ? searchedSurvivorIds.map((survivorId) => (
                <SurvivorCard
                  key={survivorId}
                  survivor={survivorsDictionary[survivorId]}
                  toggleInfection={() => {
                    toggleInfection(survivorsDictionary[survivorId]);
                  }}
                />
              ))
            : Object.keys(survivorsDictionary).map((survivorId) => (
                <SurvivorCard
                  key={survivorId}
                  survivor={survivorsDictionary[survivorId]}
                  toggleInfection={() => {
                    toggleInfection(survivorsDictionary[survivorId]);
                  }}
                />
              ))}
        </div>
      </Page>
    </>
  );
}
