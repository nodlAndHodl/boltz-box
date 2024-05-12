import { Controller, Get, Param, Query } from '@nestjs/common';
import { LnService } from './app.service';

@Controller()
export class LnApiController {
  constructor(private readonly lnService: LnService) {}

  //I want to add a parameter to the getHello function

  @Get('api/pay/:pubkey')
  getHello(@Param('pubkey') pubkey: string, @Query('amount') amount: number) {
    return this.lnService.getLnAddress(pubkey, amount);
  }

  @Get('.well-known/lnurlp/:name')
  async getWellKnown(@Param('name') name: string) {
    return await this.lnService.getLnUrl(name);
  }
}
