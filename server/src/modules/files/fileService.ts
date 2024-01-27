import {
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import debug from "debug";
import fs from "fs";
import path from "path";

const fileDebug = debug("lease-nxt:fileService");

const REGION = process.env.AWS_REGION || "";
const BUCKET_NAME = process.env.AWS_BUCKET_NAME || "";
const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID || "";
const SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";

const s3Client = new S3Client({
  region: REGION,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
});

async function getFile(filename: string): Promise<GetObjectCommandOutput> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: filename,
  });

  return s3Client.send(command);
}

async function doesFileExist(fileName: string): Promise<boolean> {
  try {
    await getFile(path.basename(fileName));
    fileDebug(`File ${fileName} already exists.`);

    return true;
  } catch (error) {
    return false;
  }
}

async function uploadFile(fileName: string): Promise<PutObjectCommandOutput> {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: path.basename(fileName), // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  const data = await s3Client.send(new PutObjectCommand(params));

  fileDebug(`File uploaded successfully.`);

  return data;
}

export async function uploadInternalImages(): Promise<
  PutObjectCommandOutput[]
> {
  const dirname = path.join(__dirname, "..", "..", "modules", "assets", "img");

  const files = fs.readdirSync(dirname);
  const fileNames = files.map((file) => path.join(dirname, file));

  const data: PutObjectCommandOutput[] = [];
  for (const fileName of fileNames) {
    const exists = await doesFileExist(fileName);
    if (exists) {
      continue;
    }
    const output = await uploadFile(fileName);
    data.push(output);
  }

  return data;
}
