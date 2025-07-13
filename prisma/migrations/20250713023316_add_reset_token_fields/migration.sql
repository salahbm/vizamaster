-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Admin_resetToken_idx" ON "Admin"("resetToken");
