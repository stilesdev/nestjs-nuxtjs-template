import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FrontendMiddleware } from './frontend.middleware'

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(FrontendMiddleware).forRoutes({
            path: '/**',
            method: RequestMethod.ALL,
        })
    }
}
