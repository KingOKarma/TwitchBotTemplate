import { dump, load } from "js-yaml";
import { CONFIG } from "./globals";
import fs from "fs";

/**
 * This represents the config.yml
 * @class Config
 * @property {string} accessToken
 * @property {string} botAccessToken
 * @property {string} botUsername
 * @property {string} clientID
 * @property {string} clientSecret
 * @property {string} environment
 * @property {string} prefix
 * @property {string} twitchUsername
 */
export default class Config {
    private static readonly _configLocation = "./config.yml";
    public readonly botUsername: string;

    public readonly clientID: string;

    public readonly clientSecret: string;

    public readonly prefix: string;

    public readonly twitchUsername: string;


    private constructor() {
        this.botUsername = "";
        this.clientID = "";
        this.clientSecret = "";
        this.prefix = "";
        this.twitchUsername = "";

    }

    /**
       *  Call getConfig instead of constructor
       */
    public static getConfig(): Config {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!fs.existsSync(Config._configLocation)) {
            throw new Error("Please create a config.yml");
        }
        const fileContents = fs.readFileSync(
            Config._configLocation,
            "utf-8"
        );
        const casted = load(fileContents) as Config;

        return casted;
    }

    /**
   *  Safe the config to the congfig.yml default location
   */
    public static saveConfig(): void {
        fs.writeFileSync(Config._configLocation, dump(CONFIG));
    }
}