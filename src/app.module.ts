import { Module } from '@nestjs/common';
import { LnApiController } from './app.controller';
import { LnService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ClnNodeServiceService } from './cln-node-service/cln-node-service.service';
import * as grpc from '@grpc/grpc-js';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'NODE_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const clientCert = Buffer.from(
            configService.get<string>('CLIENT_CERT_HEX'),
            'base64',
          );
          const clientKey = Buffer.from(
            configService.get<string>('CLIENT_KEY_HEX'),
            'base64',
          );
          const caCert = Buffer.from(
            configService.get<string>('CA_CERT_BASE64'),
            'base64',
          );
          const credentials = grpc.credentials.createSsl(
            caCert,
            clientKey,
            clientCert,
          );
          return {
            transport: Transport.GRPC,
            options: {
              url: configService.get<string>('NODE_URL'),
              package: 'cln',
              channelOptions: {
                'grpc.ssl_target_name_override': 'cln',
              },
              protoPath: join(__dirname, './proto/node.proto'),
              credentials,
              loader: {
                keepCase: true,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [LnApiController],
  providers: [LnService, ClnNodeServiceService],
})
export class AppModule {}
