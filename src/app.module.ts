import { HttpException, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule, ProductModule } from './modules';
import { authModule} from './modules/users/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interseptors/logging.interceptors';
import { HttpExceptionFilter } from './filter';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
   CategoryModule,
   ProductModule,
   authModule,
],
providers: [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  // {
  //   provide: APP_INTERCEPTOR,
  //   useClass: LoggingInterceptor,
  // }
]
  
})
export class AppModule {}
