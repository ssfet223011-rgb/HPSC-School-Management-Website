export interface SchoolConfig {
  identity: {
    nameEn: string;
    nameBn: string;
    brandingEstd: string;
    surveyEstdDate: string;
    eiin: string;
    institutionType: string;
    educationLevel: string;
    management: string;
    englishVersion: string;
    areaClassification: string;
    geographicalPosition: string;
    constituency: string;
    status: string;
  };
  contact: {
    division: string;
    district: string;
    policeStation: string;
    unionWard: string;
    mouza: string;
    postOffice: string;
    fullAddress: string;
    primaryMobile: string;
    altMobile: string;
    telephone: string;
    email: string;
  };
  branding: {
    logoUrl: string;
    campusMainUrl: string;
    campusBannerUrl: string;
    taglineEn: string;
    taglineBn: string;
    quoteBn: string;
    currency: string;
    currencySymbol: string;
    timezone: string;
    referenceTimestamp: string;
  };
  social: {
    facebook?: string;
    youtube?: string;
    twitter?: string;
  };
}

export const SCHOOL_CONFIG: SchoolConfig = {
  identity: {
    nameEn: "HALISHAHAR PUBLIC SCHOOL AND COLLEGE",
    nameBn: "হালিশহর পাবলিক স্কুল এন্ড কলেজ",
    brandingEstd: "Estd: 2002",
    surveyEstdDate: "January 1, 2004",
    eiin: "136764",
    institutionType: "স্কুল",
    educationLevel: "নিম্ন মাধ্যমিক",
    management: "বেসরকারি",
    englishVersion: "না",
    areaClassification: "সিটি কর্পোরেশন",
    geographicalPosition: "সমতল",
    constituency: "চট্টগ্রাম-১০ (২৮৭)",
    status: "চলমান",
  },
  contact: {
    division: "চট্টগ্রাম",
    district: "চট্টগ্রাম",
    policeStation: "হালিশহর",
    unionWard: "ওয়ার্ড নং - ২৬",
    mouza: "উত্তর হালিশহর বি। ব্লকের",
    postOffice: "উত্তর হালিশহর (৪২২৬)",
    fullAddress: "HOUSE-42-43, ROAD-04,B-BLOCK,HALISHAHAR H/E,",
    primaryMobile: "01819545654",
    altMobile: "01829730515",
    telephone: "0312526310",
    email: "hpscctg@mail.com",
  },
  branding: {
    logoUrl: "/assets/school-logo.png",
    campusMainUrl: "/assets/campus-main.jpg",
    campusBannerUrl: "/assets/campus-banner.jpg",
    taglineEn: "Education Builds A Better Future",
    taglineBn: "শিক্ষা মানুষের জীবনের পথ প্রদর্শক",
    quoteBn: "শিক্ষা মানুষের মনের আলো, সুপ্ত মেধার সাহস যোগায়, সমাজ ও দেশকে আলোকিত করে।",
    currency: "BDT",
    currencySymbol: "৳",
    timezone: "Asia/Dhaka",
    referenceTimestamp: "2026-10-29 10:10:14 AM",
  },
  social: {
    facebook: "https://facebook.com/hpscctg",
  }
};
