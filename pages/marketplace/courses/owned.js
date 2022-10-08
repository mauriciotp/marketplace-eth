import { useOwnedCourses } from "@components/hooks/web3";
import { Button, Message } from "@components/ui/common";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";

export default function OwnedCourses() {
  const { ownedCourses } = useOwnedCourses();

  return (
    <BaseLayout>
      {ownedCourses.data}
      <div className="py-4">
        <MarketHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Message />
          <Button>Watch the course</Button>
        </OwnedCourseCard>
      </section>
    </BaseLayout>
  );
}
