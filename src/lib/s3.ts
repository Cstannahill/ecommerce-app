import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function getDownloadUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET!,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn: 60 * 60 }); // 1 hour
}
