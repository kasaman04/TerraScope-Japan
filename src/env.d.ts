/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly WEBHOOK_URL: string;
  readonly HUBSPOT_PORTAL_ID: string;
  readonly HUBSPOT_FORM_ID: string;
  readonly SENDGRID_API_KEY: string;
  readonly AIRTABLE_API_KEY: string;
  readonly AIRTABLE_BASE_ID: string;
  readonly AIRTABLE_TABLE_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}