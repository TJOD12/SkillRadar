-- DropForeignKey
ALTER TABLE "JobSkill" DROP CONSTRAINT "JobSkill_jobId_fkey";

-- AlterTable
ALTER TABLE "JobPosting" ADD COLUMN     "jobSkills" TEXT[];
