import * as faceapi from "face-api.js";
import { Face } from "../../model/face";
export const CUSTOM_SEPARATOR = "-_-"

function convertBlock(buffer: ArrayBuffer) { // incoming data is an ArrayBuffer
  var incomingData = new Uint8Array(buffer); // create a uint8 view on the ArrayBuffer
  var i, l = incomingData.length; // length, we need this for the loop
  var outputData = new Float32Array(incomingData.length); // create the Float32Array for output
  for (i = 0; i < l; i++) {
      outputData[i] = parseFloat((incomingData[i] - 128) + "")  // convert audio to float
  }
  return outputData; // return the Float32Array
}

export async function loadModels() {
  const res = await fetch("models/")  
  await faceapi.loadTinyFaceDetectorModel(res.url);  
  await faceapi.loadFaceLandmarkTinyModel(res.url);  
  await faceapi.loadFaceRecognitionModel(res.url);
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
