import courses from "./index.json";

export const getAllCourses = () => {
  return {
    data: courses,
    coursesMap: courses.reduce((a, c, i) => {
      a[c.id] = c;
      a[c.id].index = i;
      return a;
    }, {}),
  };
};
