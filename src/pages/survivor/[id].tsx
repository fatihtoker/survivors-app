import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { ISurvivor } from "@/types";
import { Page, SurvivorCard } from "@/components";
import { BASE_URL } from "..";
import urlJoin from "url-join";
import Link from "next/link";

interface ISurvivorProps {
  survivor: ISurvivor;
  notFound: boolean;
}
export default function Survivor(props: ISurvivorProps) {
  const { survivor, notFound } = props;
  const router = useRouter();

  if (!router.isFallback && notFound) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Page>
      <div className="flex justify-center">
        <div className="absolute left-0 p-16">
          <div className="flex justify-center">
            <Link href="/">
              <div className="absolute left-0 p-16">
                <img src="/left-arrow.png" alt="" style={{ minWidth: 48 }} />
              </div>
            </Link>
          </div>
        </div>
        <SurvivorCard survivor={survivor} />
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
