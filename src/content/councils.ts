/**
 * Official council pages linked from the suburb landing pages, so each page
 * points homeowners to the authority that actually covers their address.
 *
 * RULES FOR EDITING:
 * - Link only to the council's own website (or another official government
 *   site). Open every URL in a browser before saving it; several council
 *   sites block automated link checkers.
 * - Update `lastChecked` whenever the links are re-verified. Council sites
 *   are restructured from time to time, so re-check at least yearly.
 * - Building permits are issued by registered building surveyors. Some
 *   councils run a municipal building surveyor service and some have paused
 *   or never offered one, so copy must not promise a council service.
 */

export type CouncilId =
  | "wyndham"
  | "hobsons-bay"
  | "melton"
  | "greater-dandenong"
  | "casey"
  | "frankston"
  | "cardinia";

export interface CouncilInfo {
  /** Display name, matching the suburb profiles. */
  name: string;
  /** Official page explaining building permits for this council area. */
  buildingPermitsUrl: string;
  /** Official small second dwelling (granny flat) page, where one exists. */
  smallSecondDwellingUrl?: string;
}

/** Date every URL below was last opened and confirmed (YYYY-MM-DD). */
export const councilLinksLastChecked = "2026-10-10";

export const councils: Record<CouncilId, CouncilInfo> = {
  wyndham: {
    name: "Wyndham City Council",
    buildingPermitsUrl:
      "https://www.wyndham.vic.gov.au/services/building/get-building-permit-wyndham-building-permits",
    smallSecondDwellingUrl:
      "https://www.wyndham.vic.gov.au/services/planning/applying-planning-permit/small-second-homes",
  },
  "hobsons-bay": {
    name: "Hobsons Bay City Council",
    buildingPermitsUrl:
      "https://www.hobsonsbay.vic.gov.au/Services/Planning-and-building/Building-services/Building-permits",
  },
  melton: {
    name: "Melton City Council",
    buildingPermitsUrl: "https://www.melton.vic.gov.au/Services/Building-Planning-Transport/Building",
    smallSecondDwellingUrl:
      "https://www.melton.vic.gov.au/Services/Building-Planning-Transport/Statutory-planning/Small-second-dwelling-granny-flat-dependant-persons-unit",
  },
  "greater-dandenong": {
    name: "Greater Dandenong City Council",
    buildingPermitsUrl: "https://www.greaterdandenong.vic.gov.au/building/when-building-permit-required",
    smallSecondDwellingUrl: "https://www.greaterdandenong.vic.gov.au/planning/small-second-dwelling",
  },
  casey: {
    name: "Casey City Council",
    buildingPermitsUrl: "https://www.casey.vic.gov.au/which-building-works-require-permit",
    smallSecondDwellingUrl:
      "https://www.casey.vic.gov.au/small-second-dwelling-granny-flatdependent-persons-unit",
  },
  frankston: {
    name: "Frankston City Council",
    buildingPermitsUrl:
      "https://www.frankston.vic.gov.au/Planning-and-Building/Building/Building-permits/Do-I-need-a-building-permit",
  },
  cardinia: {
    name: "Cardinia Shire Council",
    buildingPermitsUrl: "https://www.cardinia.vic.gov.au/planning-and-building",
  },
};

/** VicPlan: the state's free map for checking a property's zone and overlays. */
export const VICPLAN_URL = "https://mapshare.vic.gov.au/vicplan/";
