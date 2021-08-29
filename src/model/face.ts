export interface Face{
    type: FaceTypeEnum;
    descriptors: number[];
    id: string;
}

export enum FaceTypeEnum{
    USER = "USER",
    REPORTED = "REPORTED"
}