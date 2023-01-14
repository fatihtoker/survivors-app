import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { ISurvivor } from "@/types";
import { SurvivorCard } from '@/components';
import { BASE_URL } from '..';
import urlJoin from 'url-join';

interface ISurvivorProps {
  survivor: ISurvivor
}
export default function Survivor(props: ISurvivorProps) {
  const {survivor, notFound} = props;
  const router = useRouter()

  if (!router.isFallback && notFound ) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <SurvivorCard survivor={survivor} />
  )
}

Survivor.getInitialProps = async ({req, query}) => {
  const url = urlJoin(BASE_URL, "api/survivors", query.id);
  const res = await fetch(url)
  const survivor = await res.json()
  console.log('survivor: ', survivor)
  if (!survivor) {
    return {
      notFound: true,
    }
  }

  return {
    survivor, // will be passed to the page component as props
  }
}


