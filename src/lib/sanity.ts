import { createClient } from "@sanity/client";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

export const sanity = projectId && dataset ? createClient({
  projectId,
  dataset,
  apiVersion:"2025-07-15",
  useCdn:    true,
}) : null;