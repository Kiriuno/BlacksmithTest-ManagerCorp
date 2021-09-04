module.exports ={
    type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/user/entities/*.entity{.ts,.js}'],//, __dirname + '/place-parking/entities/*.entity.js'],
      //autoLoadEntities: true,
      synchronize: true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/migrations'
      }
}