import { ADDRESS, EMAILS, TELEPHONES } from "utils/constants";

export const data = [
  {
    title: "footer.navigation",
    text: [
      "footer.main",
      "footer.catalog",
      "footer.wholesale",
      "footer.aboutUs",
    ],
  },
  {
    title: "footer.ourContacts",
    subtitles: [
      { subtitle: "footer.telephones", text: TELEPHONES },
      { subtitle: "Email", text: EMAILS },
    ],
  },
  {
    title: "footer.ourAddress",
    text: ADDRESS,
  },
  {
    title: "footer.information",
    text: ["footer.deliveryAndPayment", "footer.guarantees", "footer.returns"],
  },
];
