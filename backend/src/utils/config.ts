import { readFileSync } from "node:fs";
import * as z from "zod";
import yaml from "js-yaml";

const ConfigSchema = z.object({
    database: z.object({
        host: z.string().default("172.17.0.1"),
        port: z.number().default(5432),
        username: z.string().default("public_db_root"),
        password: z.string().default("public_db_root"),
        name: z.string().default("public_db"),
    }).default({} as any),
    auth: z.object({
        jwt_secret_key: z.string().default("nozomu_secret_key"),
        jwt_expires_in: z.number().default(3600000),
    }).default({} as any),
    server: z.object({
        port: z.number().default(5173),
        host: z.string().default("0.0.0.0"),
    }).default({} as any)
}).default({} as any)

export type Config = z.infer<typeof ConfigSchema>;

export const loadConfig = (config_path: string): Config => {
    let yaml_obj: Record<string, any> = {};

    try {
        const raw_yaml: string = readFileSync(config_path, "utf-8");
        yaml_obj = yaml.load(raw_yaml) || {};
    } catch (error) {
        console.log(`Failed parsing ${config_path} due to error: ${error}. Using default config.`);
    }

    const config: Config = ConfigSchema.parse(yaml_obj);
    return config;
}