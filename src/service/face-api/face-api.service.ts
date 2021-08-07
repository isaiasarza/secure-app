import * as faceapi from "face-api.js";
import { User } from "../../model/user";

export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + "/models";
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
}

export async function getFullFaceDescription(blob: any, inputSize = 512) {
  console.log("blob", blob);
  // tiny_face_detector options
  let scoreThreshold = 0.5;
  const OPTION = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold,
  });
  const useTinyModel = true;

  // fetch image to api
  let img = await faceapi.fetchImage(blob);

  // detect all faces and generate full description from image
  // including landmark and descriptor of each face
  let fullDesc = await faceapi
    .detectAllFaces(img, OPTION)
    .withFaceLandmarks(useTinyModel)
    .withFaceDescriptors();
  return fullDesc;
}

const maxDescriptorDistance = 0.5;
export async function createMatcher(faceProfile: User[]) {
  // Create labeled descriptors of member from profile
  // let members = Object.keys(faceProfile);
  const filtered: any[] = faceProfile.filter((user) => user?.descriptors && user?.descriptors?.length > 0).map(user => {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      descriptors: [user.descriptors]
    }
  });

  let labeledDescriptors = filtered.map(
    (member) =>
      new faceapi.LabeledFaceDescriptors(
        member.firstname + " " + member.lastname,
        member.descriptors.map(
          (descriptor: any) => new Float32Array(descriptor)
        ) 
      )
  );

  // Create face matcher (maximum descriptor distance is 0.5)
  let faceMatcher = new faceapi.FaceMatcher(
    labeledDescriptors,
    maxDescriptorDistance
  );
  return faceMatcher;
}
