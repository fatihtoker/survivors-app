import Head from "next/head";
import { ISurvivor } from "@/types";
import urlJoin from "url-join";
import { Page, SurvivorCard } from "@/components";

type IHomePageProps = {
  survivors: ISurvivor[];
};

const BASE_URL = "http://localhost:3000/";

export async function getStaticProps() {
  const survivorsUrl = urlJoin(BASE_URL, "api/survivors");
  const survivorsResponse = await fetch(survivorsUrl);
  const survivors = await survivorsResponse.json();

  return {
    props: {
      survivors,
    },
  };
}
export default function HomePage(props: IHomePageProps) {
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
        <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {props.survivors.map((survivor) => (
            <SurvivorCard survivor={survivor} />
          ))}
        </div>
      </Page>
    </>
  );
}
