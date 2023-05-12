import { Post,Controller, UseGuards, Req, Body } from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { AuthGuard } from "@nestjs/passport";
import { TicketPayDto } from "./dto/stripe.ticket-buy.dto";

@Controller('pay')
export class StripeController {
    constructor(
        private readonly service: StripeService
    ){}

    @Post('ticket-buy')
    @UseGuards(AuthGuard('user'))
    createPayment(@Req() req:any, @Body() dto: TicketPayDto){
        return this.service.createPayment(req.user, dto);
    }

}