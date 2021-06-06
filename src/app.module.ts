import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./tasks/tasks.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configValidationSchema } from "./config.schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: "postgres",
          port: configService.get("DB_PORT"),
          host: configService.get("DB_HOST"),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_DATABASE"),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
