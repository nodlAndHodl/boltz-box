import { Controller, Get, Param, Query } from '@nestjs/common';
import { LnService } from './app.service';

@Controller()
export class LnApiController {
  constructor(private readonly lnService: LnService) {}

  //I want to add a parameter to the getHello function

  @Get('api/v1/pay/:pubkey')
  getHello(@Param('pubkey') pubkey: string, @Query('amount') amount: number) {
    return this.lnService.getLnAddress(pubkey, amount);
    //{"status":"ERROR","reason":"ErrorCreatingInvoice"}
    //{"pr":"lnbcrt100n1pnrugmkpp5ycpuu8zdl95lqym7smls7vs4chy92jwf5gg38wldvgxsxaxqcayshp57hrfhfcdj4yxqpgaut4uwn5x8hr62a5ydgdqusr45en9dyzyh55scqzzsxqyz5vqsp5znr3grxqltqjr7v3xz02a5jkmzgesra9d4f92ttg0na25rhjqwmq9qyyssq8a2cvfdrsa9kmv4kypwezke6hng833dwu8gtt6um6rqwe4a8tp45deu5yqhucqq2g2zwev28jplgxdfck0nsna5efeeje4fvx8qlh3cqrcczqw","successAction":{"tag":"message","message":"Thank you! You're awesome! <3"},"disposable":false,"routes":[]}
  }

  @Get('.well-known/lnurlp/:name')
  async getWellKnown(@Param('name') name: string) {
    //need to return a body like this {"callback":"http://localhost:3000/api/v1/pay/3e48ef9d22e096da6838540fb846999890462c8a32730a4f7a5eaee6945315f7","maxSendable":100000000,"minSendable":1000,"metadata":"[[\"text/plain\",\"NextPay Invoice\"]]","commentAllowed":0,"tag":"payRequest"}
    return await this.lnService.getLnUrl(name);
  }
}
