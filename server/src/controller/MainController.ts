import {JsonController, Get, Post, Body} from "routing-controllers";
import {DeviceToken} from "../entities"
import { SubscribeBody } from "../requestBody/SubscribeBody";

@JsonController()
export class MainController {
    @Post('/token')
    public async subscribe(
        @Body({required: true}) subscribeBody: SubscribeBody
    ): Promise<any> {
        const deviceToken = await DeviceToken.findOne({
            where: {
                token: subscribeBody.token
            }
        });
        if (deviceToken) return {
            success: false,
            exists: true
        };
        const newToken = DeviceToken.create({
            token: subscribeBody.token
        });
        await newToken.save();
        return {
            success: true ,
            token: newToken
        }
    }

    @Get('/push')
    /**
     * push
     */
    public async push(): Promise<any> {
        const tokens = await DeviceToken.find();
        tokens.forEach(async token => {
            // send notifications
        });
        return {
            success: true
        }
    }
} 