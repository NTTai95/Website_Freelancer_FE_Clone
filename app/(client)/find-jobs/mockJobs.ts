import { Job } from "./constants";

const allSkills = ["React", "Node.js", "TypeScript"];

export const mockJobs: Job[] = Array.from({ length: 1000 }).map((_, index) => {
  const posted = new Date();
  posted.setDate(posted.getDate() - (index % 10));

  return {
    id: `job-${index + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${(index % 10) + 1}`,
    posterName: `Người đăng ${index + 1}`,
    title: `Công việc ${index + 1} về lập trình`,
    description: `Mô tả công việc số ${
      index + 1
    } liên quan đến phát triển phần mềm.`,
    skills: allSkills.slice(0, (index % 3) + 1),
    budget: 1000000 + index * 500000,
    duration: `${3 + (index % 5)} ngày`,
    deadline: `2025-06-${(index % 28) + 1}`,
    applicants: Math.floor(Math.random() * 20),
    postedDate: posted.toISOString().split("T")[0],
  };
});
