import * as faceapi from "face-api.js";
import { Face } from "../../model/face";
export const CUSTOM_SEPARATOR = "-_-"

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

export async function getFullFaceDescription2(input: any, inputSize = 512) {
  console.log("input", input);
  // tiny_face_detector options
  let scoreThreshold = 0.5;
  const OPTION = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold,
  });
  const useTinyModel = true;

  // fetch image to api
  //let img = await faceapi.fetchImage(blob);

  // detect all faces and generate full description from image
  // including landmark and descriptor of each face
  let fullDesc = await faceapi
    .detectAllFaces(input, OPTION)
    .withFaceLandmarks(useTinyModel)
    .withFaceDescriptors();
  return fullDesc;
}

const maxDescriptorDistance = 0.5;
export async function createMatcher(faces: Face[]) {
  // Create labeled descriptors of member from profile
  // let members = Object.keys(faceProfile);
  const filtered: Face[] = faces.filter(
    (face) => face?.descriptors?.length > 0
  );

  let labeledDescriptors = filtered.map(
    (member) =>
      /* */
      new faceapi.LabeledFaceDescriptors(
        member.type + CUSTOM_SEPARATOR + member.id,
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
