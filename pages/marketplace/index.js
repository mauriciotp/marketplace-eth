import { useAccount } from "@components/hooks/web3/useAccount";
import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { WalletBar } from "@components/ui/web3";
import { getAllCourses } from "@content/courses/fetcher";

export default function Marketplace({ courses }) {
  const { account } = useAccount();

  return (
    <BaseLayout>
      <div className="py-4">
        <WalletBar account={account.data} />
      </div>
      <CourseList courses={courses} />
    </BaseLayout>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}
