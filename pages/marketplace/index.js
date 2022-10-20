import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Loader } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { OrderModal } from "@components/ui/order";
import { getAllCourses } from "@content/courses/fetcher";
import { useState } from "react";

export default function Marketplace({ courses }) {
  const { web3, contract, requireInstall } = useWeb3();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { hasConnectedWallet, isConnecting, account } = useWalletInfo();

  const purchaseCourse = async (order) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    const orderHash = web3.utils.soliditySha3(
      {
        type: "bytes16",
        value: hexCourseId,
      },
      {
        type: "address",
        value: account.data,
      }
    );

    const emailHash = web3.utils.sha3(order.email);

    const proof = web3.utils.soliditySha3(
      {
        type: "bytes32",
        value: emailHash,
      },
      {
        type: "bytes32",
        value: orderHash,
      }
    );

    const value = web3.utils.toWei(String(order.price));

    try {
      await contract.methods.purchaseCourse(hexCourseId, proof).send({
        from: account.data,
        value,
      });
    } catch {
      console.error("Purchase course: Operation has failed.");
    }
  };

  return (
    <BaseLayout>
      <MarketHeader />
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            disabled={!hasConnectedWallet}
            course={course}
            Footer={() => {
              if (requireInstall) {
                return (
                  <Button variant="lightPurple" disabled={true}>
                    Install
                  </Button>
                );
              }

              if (isConnecting) {
                return (
                  <Button variant="lightPurple" disabled={true}>
                    <Loader size="sm" />
                  </Button>
                );
              }

              return (
                <Button
                  variant="lightPurple"
                  disabled={!hasConnectedWallet}
                  onClick={() => setSelectedCourse(course)}
                >
                  Purchase
                </Button>
              );
            }}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onSubmit={purchaseCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
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
