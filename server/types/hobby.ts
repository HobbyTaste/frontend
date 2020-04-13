import {Document, Model} from 'mongoose'


export type SocialServices = "vk" | "instagram" | "facebook"

export enum TariffPlans {
    none,
    top,
    widget,
    poster,
}

export interface IHobby extends Document {
    label: string;
    phone?: string;
    email?: string;
    website?: string;
    contacts: Record<SocialServices, string>;
    address?: string;
    location: string;
    metroStation?: string;
    metroId?: string;
    description: string;
    shortDescription: string;
    imageUrl: string;
    owner: string; // foreign key
    subscribers: string[]; // foreign key
    category?: string;
    avatar?: string;
    rating: number;
    comments: string[]; // foreign key
    parking: boolean;
    equipment: boolean;
    novice: boolean;
    children: boolean;
    facilities?: string;
    special?: string;
    price: {
        title: string;
        priceList: string;
    }
    monetization: {
        tariff: TariffPlans;
        activationDate?: string;
        expirationDate?: string;
        cost?: number;
    }[]
    workTime: string[];

    getRating(): Promise<number>;
}

export interface IHobbyModel extends Model<IHobby> {
    findByLabel: (label: string) => Promise<IHobby[]>,
    findByLabelWithGeo: (label: string, metroId: number) => Promise<IHobby>,
}
