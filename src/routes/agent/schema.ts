import { z } from 'zod';

export const newFormSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  image: z.string().default("openiap/nodeagent"),
  environment: z.any(),
  autostart: z.boolean().default(false),
  webserver: z.boolean().default(false),
  sleep: z.boolean().default(false),
  timezone: z.string().default(""),
  runas: z.string().default("").optional(),
  languages: z.array(z.string()).default([]),
  port: z.number().optional(),
  stripeprice: z.string().optional(),
  schedules: z.array(z.object({
    // name: z.string(),
    // packageid: z.string(),
    // enabled: z.boolean(),
    // allowConcurrentRuns: z.boolean(),
    // terminateIfRunning: z.boolean(),
    // cron: z.string().optional(),
    // env: z.object({}).optional(),
  })).default([]),
});
export type NewFormSchema = typeof newFormSchema;

export const editFormSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  image: z.string().min(2),
  environment: z.any(),
  autostart: z.boolean().default(false),
  webserver: z.boolean().default(false),
  sleep: z.boolean().default(false),
  timezone: z.string().default(""),
  runas: z.string().min(2),
  languages: z.array(z.string()),
  // port: z.number(),
  stripeprice: z.string().optional(),
  schedules: z.array(z.object({
    name: z.string(),
    packageid: z.string(),
    enabled: z.boolean(),
    allowConcurrentRuns: z.boolean(),
    terminateIfRunning: z.boolean(),
    cron: z.string().optional(),
    env: z.object({}).optional(),
  })),
}).passthrough();
export type EditFormSchema = typeof editFormSchema;
