cd frontend
npm run build
cd ..
mkdir -p build
cp -r frontend/dist build/
cp -r backend build/
cd build/backend
npm prune --omit=dev