import { model, Schema } from "mongoose";

const GENDER = {
  FEMALE: "female",
  MALE: "male",
  OTHER: "other",
};
const CAR_LICENSE = {
  AM: "moped",
  A1: "leichtkraftrad",
  A2: "mittelstarkes_motorrad",
  A: "motorrad",
  B: "pkw",
  BE: "pkw_mit_anhaenger",
  C1: "leichter_lkw",
  C1E: "leichter_lkw_mit_anhaenger",
  C: "lkw",
  CE: "lkw_mit_anhaenger",
  D1: "kleinbus",
  D1E: "kleinbus_mit_anhaenger",
  D: "bus",
  DE: "bus_mit_anhaenger",
  L: "traktor",
  T: "traktor_und_forstwirtschaftliche_fahrzeuge",
  F: "landwirtschaftliche_fahrzeuge",
};

const ExpectedIncomeTime = {
  Hourly: "hourly",
  Monthly: "monthly",
  Yearly: "yearly",
};

const WorkTime = {
  FULL_TIME: "fullTime",
  HALF_TIME: "halfTime",
  PART_TIME: "partTime",
  FREE: "free",
  SHIFT_WORK: "shiftWork",
  NIGHT_WORK: "nightWork",
};

const STATUS = {
  IN_ARBEIT: "inArbeit",
  IN_PROGRESS: "inProgress",
  RESERVE: "reserve",
};

const MARITAL_STATUS = {
  MARRIED: "married",
  SINGLE: "single",
  DIVORCED: "divorced",
};

const WorkPermission = {
  YES: "yes",
  NO: "no",
  SOON: "soon",
};

const WORK_TIME_STATUS = {
  FULL_TIME: "fullTime",
  HALF_TIME: "halfTime",
  PART_TIME: "partTime",
};

const DISABILITY_TYPE = {
  FAMILY: "family",
  SICKNESS: "sickness",
  MOTIVATION: "motivation",
  ADDICT: "addict",
};

const SCHEIN_STATUS = {
  ALG1: "alg1",
  ALG2: "alg2",
  SOCIAL: "social",
  NONE: "none",
  RENTE: "rente",
  SELBSTÄNGIG: "selbsständig",
  SONSTIG: "sonstig",
  IN_ARBEIT_TEIL: "inArbeitTeil",
  IN_ARBEIT_Full: "inArbeitFull",
};
const KUNDIGUNGS_STATUS = {
  ONE_WEEK: "oneWeek",
  TWO_WEEK: "twoWeek",
  ONE_MONTH: "oneMonth",
  SOON: "soon",
};
const ANGEBUT = {
  AKTIV_IN_DEN_BRUF: "Aktiv in den Beruf",
  WACHSTUMSPOTENZIAL: "Wachstumspotenzial für fachkräfte",
  Mit_BILDUNG_ZUM_ERFOLG: "Mit Bildung zum Erfolg",
  BEWÄLTIGUNGSTRATEGIE_FÜR_DEN: "Bewältigungsstrategie für besseren Weg in die Zukünft",
  INTEGRATIONS_COUCHING: "Integrationscoaching",
};

const KNOWN_FROM_WHERE = {
  INSTAGRAM: "instagram",
  FACEBOOK: "facebook",
  FRIENDS: "friends",
  TELEGRAM: "telegram",
  EMPFEHLUNG: "empfehlung",
  NEWSLETTER: "newsletter",
  FLYER: "flyer",
  OTHER: "other",
  GOOGLE: "google",
};
const MassnameTitle = {
  AKTIV_IN_DEN_BRUF: "Aktiv in den Beruf",
  WACHSTUMSPOTENZIAL: "Wachstumspotenzial für fachkräfte",
  Mit_BILDUNG_ZUM_ERFOLG: "Mit Bildung zum Erfolg",
  BEWÄLTIGUNGSTRATEGIE_FÜR_DEN: "Bewältigungsstrategie für besseren Weg in die Zukünft",
  INTEGRATIONS_COUCHING: "Integrationscoaching",
};


const docSchema = new Schema({
  name: String,
  file: String,
});

const langSchema = new Schema({
  name: String,
  rate: Number,
});

const massnameSchema = new Schema(
  {
    title: {
      type: String,
      enum: [
        MassnameTitle.AKTIV_IN_DEN_BRUF,
        MassnameTitle.BEWÄLTIGUNGSTRATEGIE_FÜR_DEN,
        MassnameTitle.INTEGRATIONS_COUCHING,
        MassnameTitle.Mit_BILDUNG_ZUM_ERFOLG,
        MassnameTitle.WACHSTUMSPOTENZIAL,
      ],
      required: true,
    },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    massnamesignature: Date, 
    massnameTime: Number, // fix
    restTime: Number, // count down
    description: String,
  },
  { timestamps: true }
);

const schema = new Schema(
  {
    gender: { type: String, enum: [GENDER.FEMALE, GENDER.MALE, GENDER.OTHER], required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    clientNumber: { type: String, required: true },
    addressStr: String,
    addressDescription: String,
    zipCode: String,
    city: String,
    state: String,
    land: String,
    phoneNumber: String,
    houseTel: String,
    birthDay: { type: Date, required: true },
    email: String,
    rate: Number,
    angebut: {
      type: String,
      enum: [
        ANGEBUT.AKTIV_IN_DEN_BRUF,
        ANGEBUT.BEWÄLTIGUNGSTRATEGIE_FÜR_DEN,
        ANGEBUT.INTEGRATIONS_COUCHING,
        ANGEBUT.Mit_BILDUNG_ZUM_ERFOLG,
        ANGEBUT.WACHSTUMSPOTENZIAL,
      ],
    },
    status: { type: String, enum: [STATUS.IN_ARBEIT, STATUS.IN_PROGRESS, STATUS.RESERVE] },
    branch: String,
    knownFromWhere: {
      type: String,
      enum: [
        KNOWN_FROM_WHERE.FACEBOOK,
        KNOWN_FROM_WHERE.FRIENDS,
        KNOWN_FROM_WHERE.INSTAGRAM,
        KNOWN_FROM_WHERE.OTHER,
        KNOWN_FROM_WHERE.TELEGRAM,
        KNOWN_FROM_WHERE.EMPFEHLUNG,
        KNOWN_FROM_WHERE.NEWSLETTER,
        KNOWN_FROM_WHERE.FLYER,
      ],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    firstCallDate: Date,
    firstTerminDate: Date,
    recentCoached: Boolean,
    recentCoachedDescription: [String],

    birthPlace: String,
    nationality: String,
    migration: Boolean,
    insurance: Boolean,
    workPermission: { type: String, enum: [WorkPermission.YES, WorkPermission.NO, WorkPermission.SOON] },
    marital: { type: String, enum: [MARITAL_STATUS.DIVORCED, MARITAL_STATUS.MARRIED, MARITAL_STATUS.SINGLE] },
    children: Number,
    personnelCode: String,
    personnelCodeExpire: Date,
    reha: Boolean,
    workTimeStatus: {
      type: String,
      enum: [WORK_TIME_STATUS.FULL_TIME, WORK_TIME_STATUS.HALF_TIME, WORK_TIME_STATUS.PART_TIME],
    },
    disabilityPercent: Number,
    disabilityType: {
      type: String,
      enum: [DISABILITY_TYPE.ADDICT, DISABILITY_TYPE.FAMILY, DISABILITY_TYPE.MOTIVATION, DISABILITY_TYPE.SICKNESS],
    },
    disabilityDescription: String,

    skill: [String],
    langs: [langSchema],
    arbeitLos: Boolean,
    arbeitLosFromDate: Date,
    arbeitFromDate: Date,
    // todo
    kundigungsFrist: {
      type: String,
      enum: [
        KUNDIGUNGS_STATUS.ONE_MONTH,
        KUNDIGUNGS_STATUS.ONE_WEEK,
        KUNDIGUNGS_STATUS.TWO_WEEK,
        KUNDIGUNGS_STATUS.SOON,
      ],
    },
    kundigungsDescription: String,
    scheinStatus: {
      type: String,
      enum: [SCHEIN_STATUS.ALG1, SCHEIN_STATUS.ALG2, SCHEIN_STATUS.NONE, SCHEIN_STATUS.SOCIAL],
    },
    jobCenterNumber: String,
    jobCenterClientNumber: String,
    jobCenterTeam: String,
    jobCenterCoach: String,
    jobCenterTel: String,
    jobCenterEmail: String,
    jobCenterMobile: String,

    jobPlaceDistance: Number,
    moving: Boolean,
    internEinsatz: Boolean,
    wholeCountry: [String],
    jobPlaceDescription: String,

    favoriteJob: [String],
    favoriteJobDescription: String,
    privateComment: String,
    secretorJobOffer: String,

    hasPkw: Boolean,
    pkwLicense: [
      {
        type: String,
        enum: [
          CAR_LICENSE.AM,
          CAR_LICENSE.A1,
          CAR_LICENSE.A2,
          CAR_LICENSE.A,
          CAR_LICENSE.B,
          CAR_LICENSE.BE,
          CAR_LICENSE.C1,
          CAR_LICENSE.C1E,
          CAR_LICENSE.C,
          CAR_LICENSE.CE,
          CAR_LICENSE.D1,
          CAR_LICENSE.D1E,
          CAR_LICENSE.D,
          CAR_LICENSE.DE,
          CAR_LICENSE.L,
          CAR_LICENSE.T,
          CAR_LICENSE.F,
        ],
      },
    ],
    education: {
      type: String,
    },
    isStudent: Boolean,
    isStudentBisWann: Date,
    ausbildung: [String],

    expectedIncome: Number,
    expectedIncomeTime: {
      type: String,
      enum: [ExpectedIncomeTime.Hourly, ExpectedIncomeTime.Monthly, ExpectedIncomeTime.Yearly],
    },
    expectedIncomeTax: Boolean,

    workTime: {
      type: [String],
      enum: [
        WorkTime.FREE,
        WorkTime.FULL_TIME,
        WorkTime.HALF_TIME,
        WorkTime.PART_TIME,
        WorkTime.NIGHT_WORK,
        WorkTime.SHIFT_WORK,
      ],
    },

    resumeDocs: [String],
    pictures: [String],
    docs: [docSchema],
    massname: massnameSchema,

    isDeleted: { type: Boolean, default: false },

    // lang: String,
    // jobPermission: Boolean,
    // carLicense: { type: String, enum: [CAR_LICENSE.MOTOR] },
    // description: String,
    // education: String,
  },
  { timestamps: true }
);

export default model("client", schema);
