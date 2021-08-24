import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './Post.module';

@Module({
  imports: [
    PostsModule,
    MongooseModule.forRoot(
      'mongodb+srv://sare:sare1511@cluster0.gajd2.mongodb.net/secondfilm?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
