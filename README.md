# Dev
- Clone the repo
- Run `npm install`
- Open `http://localhost:3000` in your browser
- Copy `env.example` to `.env` and fill in the values
## Build Postgress database
```
docker compose up -d
```
Run prisma migrations
```
npx prisma migrate dev --name <name>
```
Execute seed
```
npm run seed
```
## Run the app
Create a random AUTH_SECRET in the terminal and update de `.env` file
```
openssl rand -base64 32
```
- Run `npm run dev`

# Build