import { NestApplication, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app: NestApplication = await NestFactory.create(AppModule)

    app.enableCors({
        // https://github.com/expressjs/cors#configuration-options
        origin: ['http://localhost:3001'],
        // credentials: true,
    })

    await app.listen(3000)
}
bootstrap()
