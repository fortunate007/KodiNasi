# KodiNasi 🏠

Mobile app connecting Nairobi landlords and tenants. Landlords register and list
apartments/rentals; tenants register and search rentals across Nairobi.

## Stack
- Frontend: React Native (Expo)
- Planned backend: Node.js + Express + PostgreSQL + Prisma + Cloudinary (uploads) + M-Pesa Daraja API

## Run it
```
npm install
npx expo install --fix   # aligns package versions with your Expo SDK
npm start
```
Scan the QR code with Expo Go on your phone, or press `a` / `i` for an emulator.

## Next steps
- Replace mock data in `src/data/mockListings.js` with real API calls
- Build the Express + Prisma backend (`/api/auth`, `/api/listings`)
- Add Cloudinary image upload in AddListingScreen
- Add M-Pesa integration for listing fees / deposits
- Add a real logged-in state (context or Redux) instead of navigation-only roles
