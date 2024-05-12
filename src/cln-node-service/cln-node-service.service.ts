import { ClientGrpc } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ClnNodeServiceService {
  constructor(@Inject('NODE_PACKAGE') private client: ClientGrpc) {}

  private nodeService: any;

  async onModuleInit() {
    this.nodeService = this.client.getService('Node');
    const info = await this.nodeService.Getinfo({}).toPromise();
    console.log(info);
  }

  // Now you can use this.nodeService to call the methods defined in your proto file
  async getinfo() {
    console.log('getinfo');
    return await this.nodeService.getinfo({});
  }
}
