import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module'; 
import { AuthGuard } from '@nestjs/passport';
 
async function bootstrap() {
 

  const app = await NestFactory.create(AppModule);
   // Configurar o documento OpenAPI
   const config = new DocumentBuilder()
    .setTitle('OS')
    .setDescription('OS')
    .setVersion('0.0.1')
    .addBearerAuth()  
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); 
 
 

  await app.listen(3000);
}
bootstrap();
