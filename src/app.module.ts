import { Module } from '@nestjs/common';;
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PlaceParkingModule } from './place-parking/place-parking.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PlaceParkingModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
      database: "ParkmanagerCorpGestionParking",
      autoLoadEntities: true,
      synchronize: true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/migrations'
      }
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
