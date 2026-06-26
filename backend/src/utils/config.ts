import { readFileSync } from "node:fs";
import * as z from "zod";
import yaml from "js-yaml";
import dotenv from "dotenv";

const ConfigSchema = z.object({
    database: z.object({
        host: z.string().default("172.17.0.1"),
        port: z.coerce.number().int().positive().default(5432),
        username: z.string().default("public_db_root"),
        password: z.string().default("public_db_root"),
        name: z.string().default("public_db"),
    }).default({} as any),
    auth: z.object({
        jwt_secret_key: z.string().default("nozomu_secret_key"),
        jwt_expires_in: z.coerce.number().int().positive().default(3600000),
    }).default({} as any),
    server: z.object({
        port: z.coerce.number().int().positive().default(5173),
        host: z.string().default("0.0.0.0"),
    }).default({} as any)
}).default({} as any);

export type Config = z.infer<typeof ConfigSchema>;

const loadConfigYAML = (config_path: string): Config => {
    let yaml_obj: Record<string, any> = {};

    try {
        const raw_yaml: string = readFileSync(config_path, "utf-8");
        yaml_obj = yaml.load(raw_yaml) ?? {};
    } catch (error) {
        console.log(`Failed parsing ${config_path} due to error: ${error}. Using default config.`);
    }

    const config: Config = ConfigSchema.parse(yaml_obj);
    return config;
}

const loadConfigDotEnv = (config_path: string): Config => {
    const envObj: Record<string, any> = dotenv.config({ path: config_path }).parsed ?? {};

    const rawConfig: Record<string, any> = {
        database: {
            host: envObj["DATABASE_HOST"],
            port: envObj["DATABASE_PORT"],
            username: envObj["DATABASE_USER"],
            password: envObj["DATABASE_PASSWORD"],
            name: envObj["DATABASE_NAME"],
        },
        auth: {
            jwt_secret_key: envObj["JWT_SECRET_KEY"],
            jwt_expires_in: envObj["JWT_EXPIRES_IN"],
        },
        server: {
            port: envObj["SERVER_PORT"],
            host: envObj["SERVER_HOST"],
        },
    };

    return ConfigSchema.parse(rawConfig);
}

export const loadConfig = (config_path: string): Config => {
    if (config_path.endsWith(".yaml") || config_path.endsWith(".yml")) {
        return loadConfigYAML(config_path);
    } else if (config_path.endsWith(".env")) {
        return loadConfigDotEnv(config_path);
    } else {
        throw new Error(`Invalid config path: ${config_path}`);
    }
}