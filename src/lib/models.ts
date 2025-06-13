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

export interface Subscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
}

interface ISubscriber {
  name: string;
  email: string;
  preference: string;
  createdAt: Date;
}

interface IYoutubeVideo {
  title: string;
  videoId: string;
  thumbnail: string;
  duration: string;
}
interface ILatestSermon {
  title: string;
  videoId: string;
  thumbnail: string;
  duration: string;
  quote: string;
  reference: string;  
  speaker:string,
  date: string;
}

 interface IEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  isUpcoming: boolean;
}

interface IMinistry{
  name: string;
  description: string;
  icon: string;
  image: string;
  link: string;
  location?: string;
  isActive?: boolean;
  vision?: string;
  leaders?: { name: string; role: string; image: string }[];
  galleryImages?: { url: string; caption: string }[];
  contact?: { email: string; phone: string; socialMedia: { facebook: string; instagram: string } };
  videoUrl?: string;
  createdAt: Date;
}

interface IPrayerRequest {  
  name: string;
  email: string;
  phoneNumber: string;
  request: string;
  createdAt: Date;
}

interface ILeaders{
  name: string;
  email: string;
  title: string;
  bio: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
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

const subscriberSchema = new Schema<ISubscriber>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  preference: { 
    type: String, 
    required: true, 
    enum: ['Announcements', 'New Product Offers', 'LGM Media', 'FFC', 'Taiwan', 'GPS'] 
  },
  createdAt: { type: Date, default: Date.now },
});

const youtubeVideoSchema = new Schema<IYoutubeVideo>({
  title: { type: String, required: true },
  videoId: { type: String, required: true },
  thumbnail: { type: String, required: true },
  duration: { type: String, required: true },
});

const latestSermonSchema = new Schema<ILatestSermon>({
  title: { type: String, required: true },
  videoId: { type: String, required: true },
  thumbnail: { type: String, required: true },
  duration: { type: String, required: true },
  quote: { type: String, required: true },
  reference: { type: String, required: true },
  speaker: { type: String, required: true },
  date: { type: String, required: true },
});

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isUpcoming: { type: Boolean, required: true },
});

const ministrySchema = new Schema<IMinistry>({
   name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  location: { type: String },
  isActive: { type: Boolean, default: true },
  vision: { type: String }, // Mission or purpose statement
  leaders: [{ name: String, role: String, image: String }], // Leadership team
  galleryImages: [{ url: String, caption: String }], // Photo gallery
  contact: { email: String, phone: String, socialMedia: { facebook: String, instagram: String } }, // Contact info
  videoUrl: { type: String }, // Sample sermon/teaching video
  createdAt: { type: Date, default: Date.now },
});

const prayerRequestSchema = new Schema<IPrayerRequest>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true, match: /^\+256\d{9}$/ },
  request: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const leadersSchema = new Schema<ILeaders>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },    
});

// Define models
export const Donation: Model<IDonation> = mongoose.models.Donation || mongoose.model<IDonation>('Donation', donationSchema);
export const MinistrySignup: Model<IMinistrySignup> = mongoose.models.MinistrySignup || mongoose.model<IMinistrySignup>('MinistrySignup', ministrySignupSchema);
export const StudentMissionSignup: Model<IStudentMissionSignup> = mongoose.models.StudentMissionSignup || mongoose.model<IStudentMissionSignup>('StudentMissionSignup', studentMissionSignupSchema);
export const Scripture: Model<IScriptureSchema> = mongoose.models.Scripture || mongoose.model<IScriptureSchema>('Scripture', scriptureSchema, 'theme_scriptures');
export const VisionMission: Model<IVisionMission> = mongoose.models.VisionMission || mongoose.model<IVisionMission>('VisionMission', visionMissionSchema, 'vision_mission');
export const CoreValue: Model<ICoreValue> = mongoose.models.CoreValue || mongoose.model<ICoreValue>('CoreValue', coreValueSchema, 'core_values');
export const HeroSlide: Model<IHeroSlide> = mongoose.models.HeroSlide || mongoose.model<IHeroSlide>('HeroSlide', heroSlideSchema, 'hero_slides');

export const Subscriber: Model<ISubscriber> = mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', subscriberSchema, 'subscribers');
export const YoutubeVideo: Model<IYoutubeVideo> = mongoose.models.YoutubeVideo || mongoose.model<IYoutubeVideo>('YoutubeVideo', youtubeVideoSchema, 'sermonsyoutube');
export const LatestSermon: Model<ILatestSermon> = mongoose.models.LatestSermon || mongoose.model<ILatestSermon>('LatestSermon', latestSermonSchema, 'latestsermons');
export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema, 'events');
export const Ministry: Model<IMinistry> = mongoose.models.Ministry || mongoose.model<IMinistry>('Ministry', ministrySchema, 'ministries');
export const PrayerRequest: Model<IPrayerRequest> = mongoose.models.PrayerRequest || mongoose.model<IPrayerRequest>('PrayerRequest', prayerRequestSchema, 'prayer_requests');

export const Leaders: Model<ILeaders> = mongoose.models.Leaders || mongoose.model<ILeaders>('Leaders', leadersSchema, 'leaders');