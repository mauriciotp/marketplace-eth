import Image from "next/image";

const BG_CLASSES = {
  purchased: "bg-indigo-200",
  activated: "bg-green-200",
  deactivated: "bg-red-200",
};

const TEXT_CLASSES = {
  purchased: "text-indigo-700",
  activated: "text-green-700",
  deactivated: "text-red-700",
};

export default function OwnedCourseCard({ children, course }) {
  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
      <div className="block sm:flex h-full">
        <div className="h-72 sm:h-full flex-1 relative">
          <Image
            src={course.coverImage}
            className="object-cover"
            layout="fill"
            alt={course.title}
          />
        </div>
        <div className="flex-4">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              <span className="mr-2">{course.title}</span>
              <span
                className={`text-xs ${TEXT_CLASSES[course.state]} ${
                  BG_CLASSES[course.state]
                } rounded-full p-2`}
              >
                {course.state}
              </span>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {course.price} ETH
            </p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Course ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {course.ownedCourseId}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Proof</dt>
                <dd className="mt-1 text-sm break-words text-gray-900 sm:mt-0 sm:col-span-2">
                  {course.proof}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
