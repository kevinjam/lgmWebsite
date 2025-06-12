import mongoose, { Schema, Model } from 'mongoose';

// Define interfaces
interface IDonation {
  name: string;
  email: string | null;
  amount: number;
  message: string | null;
  txRef: string;
  status: string;
  createdAt: Date;
}

interface IMinistrySignup {
  name: string;
  email: string;
  phoneNumber: string;
  ministry: string;
  createdAt: Date;
}

interface IStudentMissionSignup {
  name: string;
  email: string;
  phoneNumber: string;
  interest: string;
  createdAt: Date;
}

interface IScriptureSchema {
  verse: string;
  text: string;
}

interface IVisionMission {
  vision: string;
  mission: string;
  createdAt: Date;
}

interface ICoreValue {
  name: string;
  icon: string;
}

interface IHeroSlide {
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  createdAt: Date;
}

// Define schemas
const donationSchema = new Schema<IDonation>({
  name: { type: String, required: true, default: 'Anonymous' },
  email: { type: String, default: null },
  amount: { type: Number, required: true },
  message: { type: String, default: null },
  txRef: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ministrySignupSchema = new Schema<IMinistrySignup>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true, match: /^\+256\d{9}$/ },
  ministry: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const studentMissionSignupSchema = new Schema<IStudentMissionSignup>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true, match: /^\+256\d{9}$/ },
  interest: { type: String, required: true, enum: ['Volunteer', 'Student Leader', 'Fellowship Member', 'Other'] },
  createdAt: { type: Date, default: Date.now },
});

const scriptureSchema = new Schema<IScriptureSchema>({
  verse: { type: String, required: true },
  text: { type: String, required: true },
});

const visionMissionSchema = new Schema<IVisionMission>({
  vision: { type: String, required: true },
  mission: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const coreValueSchema = new Schema<ICoreValue>({
  name: { type: String, required: true },
  icon: { type: String, required: true },
});
const heroSlideSchema = new Schema<IHeroSlide>({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  ctaText: { type: String, required: true },
  ctaHref: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define models
export const Donation: Model<IDonation> = mongoose.models.Donation || mongoose.model<IDonation>('Donation', donationSchema);
export const MinistrySignup: Model<IMinistrySignup> = mongoose.models.MinistrySignup || mongoose.model<IMinistrySignup>('MinistrySignup', ministrySignupSchema);
export const StudentMissionSignup: Model<IStudentMissionSignup> = mongoose.models.StudentMissionSignup || mongoose.model<IStudentMissionSignup>('StudentMissionSignup', studentMissionSignupSchema);
export const Scripture: Model<IScriptureSchema> = mongoose.models.Scripture || mongoose.model<IScriptureSchema>('Scripture', scriptureSchema, 'theme_scriptures');
export const VisionMission: Model<IVisionMission> = mongoose.models.VisionMission || mongoose.model<IVisionMission>('VisionMission', visionMissionSchema, 'vision_mission');
export const CoreValue: Model<ICoreValue> = mongoose.models.CoreValue || mongoose.model<ICoreValue>('CoreValue', coreValueSchema, 'core_values');
export const HeroSlide: Model<IHeroSlide> = mongoose.models.HeroSlide || mongoose.model<IHeroSlide>('HeroSlide', heroSlideSchema, 'hero_slides');