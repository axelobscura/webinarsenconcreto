import Lider from '../../components/Lider';

export default function LiderPage({ params } : { params: { lider: string } }) {
  return <Lider lider={params.lider} />
}
