import {IHobbyModel, TariffPlans} from "../types/hobby";
import {Schema} from 'mongoose'

const EMAIL_REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const HobbySchema: Schema<IHobbyModel> = new Schema({
    label: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        match: [/^\+\d{11}$/, 'Неверный формат номера телефона']
    },
    email: {
        type: String,
        trim: true,
        match: [EMAIL_REG_EXP, 'Неверный формат email']
    },
    website: {
        type: String,
        trim: true
    },
    contacts: {
        type: Map,
        of: String
    },
    address: {
        type: String,
        trim: true,
    },
    location: {
        type: String
    },
    metroStation: {
        type: String,
        lowercase: true,
        trim: true,
    },
    metroId: {
        type: Number,
    },
    description: {
        type: String,
    },
    shortDescription: {
        type: String,
        maxlength: [500, 'toLongDescription'],
    },
    imageUrl: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
    },
    subscribers: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    avatar: {
        type: String,
    },
    category: {
        type: String,
    },
    rating: {
        type: Number
    },
    comments: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    parking: {
        type: Boolean,
        default: false
    },
    equipment: {
        type: Boolean,
        default: false
    },
    novice: {
        type: Boolean,
        default: false
    },
    children: {
        type: Boolean,
        default: false
    },
    facilities: {
        type: String
    },
    special: {
        type: String
    },
    price: {
        title: {
            type: String
        },
        priceList: {
            type: String,
            required: true
        }
    },
    monetization: [{
        tariff: {
            type: Number,
            enum: Object.values(TariffPlans),
            default: TariffPlans.none
        },
        activationDate: {
            type: String
        },
        expirationDate: {
            type: String
        },
        cost: {
            type: Number
        }
    }],
    workTime: {
        type: [String],
        required: true
    }
});

export default HobbySchema;
