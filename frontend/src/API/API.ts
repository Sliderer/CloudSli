import {singleton} from "tsyringe";
import axios from "axios";
import { CONFIGURATION_SERVER_ADDRESS, STORAGE_SERVER_ADDRESS } from "../config";

@singleton()
export class API {
    public static configuration_api = axios.create({
        baseURL: CONFIGURATION_SERVER_ADDRESS
    })

    public static storage_api = axios.create({
        baseURL: STORAGE_SERVER_ADDRESS
    })
}