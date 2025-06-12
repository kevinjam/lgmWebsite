import mongoose, { Schema, model, Model } from 'mongoose';

// Define interfaces for TypeScript
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

// Define models
const Donation: Model<IDonation> = mongoose.models.Donation || model<IDonation>('Donation', donationSchema);
const MinistrySignup: Model<IMinistrySignup> = mongoose.models.MinistrySignup || model<IMinistrySignup>('MinistrySignup', ministrySignupSchema);
const StudentMissionSignup: Model<IStudentMissionSignup> = mongoose.models.StudentMissionSignup || model<IStudentMissionSignup>('StudentMissionSignup', studentMissionSignupSchema);

// Connection logic
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localuser:localpass@localhost:27017/latterglory?authSource=admin';

if (!MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      authSource: 'admin',
      auth: {
        username: 'localuser',
        password: 'localpass',
      },
    });
    cachedConnection = connection;
    console.log('MongoDB connected');
    return connection;
  } catch (error: unknown) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Export models and connection function
export { Donation, MinistrySignup, StudentMissionSignup };