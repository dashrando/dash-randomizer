import { redirect } from 'next/navigation'

export async function generateMetadata({ params }: { params : { key: string }}) {
  return {
    title: `DASH Randomizer Race`,
    description: params.key
  }
}

export default function RaceSeedPage({ params }: { params: { key: string } }) {
  const { key } = params;
  redirect(`/seed/${key}?lr=1`);
  return null;
}