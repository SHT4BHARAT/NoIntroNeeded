import { google } from "googleapis";
import type { ContactFormData } from "./validation";

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. Set it in .env.local or Vercel environment variables.`
    );
  }
  return value;
}

export async function appendToSheet(data: ContactFormData) {
  const SHEET_ID = getRequiredEnv("GOOGLE_SHEET_ID");
  const SERVICE_ACCOUNT_EMAIL = getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const PRIVATE_KEY = getRequiredEnv("GOOGLE_PRIVATE_KEY");

  const auth = new google.auth.JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          data.name,
          data.email,
          data.message,
          new Date().toISOString(),
        ],
      ],
    },
  });
}
