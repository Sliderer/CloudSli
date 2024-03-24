import {singleton} from "tsyringe";
import axios from "axios";
import {SERVER_ADDRESS} from "../config";

@singleton()
export class API {
    public static api = axios.create({
        baseURL: SERVER_ADDRESS
    })
}