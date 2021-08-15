import { Detection } from "../../model/detection";

export abstract class DetectionService{
    public abstract getDetections(): Detection[];
}