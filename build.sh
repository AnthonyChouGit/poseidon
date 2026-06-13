(cd frontend && npm run build)
(cd backend && npm run build)
rm -rf build
mkdir -p build
cp db_init.sql build/
cp -r frontend/dist build/
cp -r backend/dist build/backend
cp backend/package.json build/backend/
cp backend/package-lock.json build/backend/
(cd build/backend && npm ci --omit=dev)