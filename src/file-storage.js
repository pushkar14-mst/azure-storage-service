const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const createBlobServiceClient = (accountName, accesskey) => {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accesskey
  );
  return new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  );
};
const getTheImage = async (accountName, accesskey, imagePath) => {
  const blobService = createBlobServiceClient(accountName, accesskey);
  const containerName = "philosophers";
  const containerClient = blobService.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(imagePath);
  const properties = await blobClient.getProperties();
  const response = await blobClient.download();
  return [response, properties];
};
module.exports = { getTheImage };
