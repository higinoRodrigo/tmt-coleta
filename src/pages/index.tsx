import { HomePage } from '../components/HomePage';
import { BaseLayout } from '../templates/BaseLayout';

export default function Home({ session }) {

  return (
    <BaseLayout titlePage="Início">
      <HomePage session={session} />
    </BaseLayout>
  );
}
