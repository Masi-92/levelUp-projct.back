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