import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { ISurvivor } from "@/types";
import { Page, SurvivorCard, BattleItem } from "@/components";
import { BASE_URL } from "..";
import urlJoin from "url-join";
import Link from "next/link";
import { useState } from "react";

interface ISurvivorProps {
  survivor: ISurvivor;
  notFound: boolean;
}
export default function Survivor(props: ISurvivorProps) {
  const { survivor, notFound } = props;
  const [survivorState, setSurvivorState] = useState<ISurvivor>(survivor);
  const router = useRouter();

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
    setSurvivorState(updatedSurvivor);
  };

  if (!router.isFallback && notFound) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Page>
      <div className="flex flex-col items-center">
        <div className="absolute left-0 p-16">
          <div className="flex justify-center">
            <Link href="/">
              <div className="absolute left-0 p-16">
                <img src="/left-arrow.png" alt="" style={{ minWidth: 48 }} />
              </div>
            </Link>
          </div>
        </div>
        <SurvivorCard
          survivor={survivorState}
          hover={false}
          toggleInfection={() => {
            toggleInfection(survivorState);
          }}
        />

        <ul className="bg-white rounded-lg w-96 text-gray-900 mt-8">
          {survivorState.battles.map((battle, index) => (
            <BattleItem key={index} battle={battle} />
          ))}
        </ul>
      </div>
    </Page>
  );
}

Survivor.getInitialProps = async ({ req, query }) => {
  const url = urlJoin(BASE_URL, "api/survivor", query.id);
  const res = await fetch(url);
  const survivor = await res.json();

  if (!survivor) {
    return {
      notFound: true,
    };
  }

  return {
    survivor, // will be passed to the page component as props
  };
};
