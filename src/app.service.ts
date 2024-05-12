import { Injectable } from '@nestjs/common';

@Injectable()
export class LnService {
  getLnAddress(pubkey: string, amount: number) {
    console.log(pubkey, amount);
    try {
      return {
        pr: 'lnbcrt100n1pnrugmkpp5ycpuu8zdl95lqym7smls7vs4chy92jwf5gg38wldvgxsxaxqcayshp57hrfhfcdj4yxqpgaut4uwn5x8hr62a5ydgdqusr45en9dyzyh55scqzzsxqyz5vqsp5znr3grxqltqjr7v3xz02a5jkmzgesra9d4f92ttg0na25rhjqwmq9qyyssq8a2cvfdrsa9kmv4kypwezke6hng833dwu8gtt6um6rqwe4a8tp45deu5yqhucqq2g2zwev28jplgxdfck0nsna5efeeje4fvx8qlh3cqrcczqw',
        successAction: {
          tag: 'message',
          message: "Thank you! You're awesome! <3",
        },
        disposable: false,
        routes: [],
      };
    } catch (e) {
      return { status: 'ERROR', reason: 'ErrorCreatingInvoice' };
    }
  }

  async getLnUrl(name: string) {
    return {
      callback: `http://localhost:3000/api/v1/pay/${name}`,
      maxSendable: 100000000,
      minSendable: 1000,
      metadata: [['text/plain', 'Boltz Box']],
      commentAllowed: 0,
      tag: 'payRequest',
    };
  }
}
