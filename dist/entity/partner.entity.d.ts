export declare class PartnerEntity {
    token: string;
    id: number;
    pname: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    setStatus(): Promise<void>;
}
