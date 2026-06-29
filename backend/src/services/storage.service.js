import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: "public_eRuSOxBLBY9JK9JeExf+lKaYNh4=",
  privateKey: "private_pmoNTD10A6sJaNB8zIB7kTU6H+Q=",
  urlEndpoint: "https://ik.imagekit.io/gqrt0vecdz",
});

async function uploadFile(buffer) {
  const result = await imagekit.upload({
    file: buffer.toString("base64"),
    fileName: "image.jpg",
  });

  return result;
}

export default uploadFile;