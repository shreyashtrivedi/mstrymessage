import {Message} from "@/model/User";

export interface APIresponse{
    succes: boolean;
    messages:string;
    isAccptingMessages?:boolean;
    Messages?:Array<Message>
}