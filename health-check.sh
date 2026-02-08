#!/bin/bash

# AhsanGPT Project Health Check
# Run this script to verify everything is working

echo "🔍 AhsanGPT Project Health Check"
echo "================================"
echo ""

# Check Node version
echo "✓ Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "  Node: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm -v)
echo "  npm: $NPM_VERSION"
echo ""

# Check if .env exists
echo "✓ Checking environment configuration..."
if [ -f ".env" ]; then
    echo "  ✅ .env file exists"
    if grep -q "placeholder" .env; then
        echo "  ⚠️  WARNING: Using placeholder Supabase credentials"
        echo "     Update .env with real credentials for full functionality"
    else
        echo "  ✅ Custom Supabase credentials configured"
    fi
else
    echo "  ❌ .env file missing!"
    echo "     Copy .env.example to .env and configure"
fi
echo ""

# Check if node_modules exists
echo "✓ Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "  ✅ node_modules installed"
else
    echo "  ❌ node_modules missing! Run: npm install"
    exit 1
fi
echo ""

# Check React version
echo "✓ Checking React version..."
REACT_VERSION=$(npm ls react --depth=0 2>/dev/null | grep react@ | awk '{print $2}')
echo "  React: $REACT_VERSION"
if [[ "$REACT_VERSION" == "18.3.1" ]]; then
    echo "  ✅ Correct version"
else
    echo "  ⚠️  Expected 18.3.1"
fi
echo ""

# Check React Router version
echo "✓ Checking React Router version..."
RR_VERSION=$(npm ls react-router-dom --depth=0 2>/dev/null | grep react-router-dom@ | awk '{print $2}')
echo "  React Router: $RR_VERSION"
if [[ "$RR_VERSION" == "6.28.0" ]]; then
    echo "  ✅ Correct version"
else
    echo "  ⚠️  Expected 6.28.0"
fi
echo ""

# Try TypeScript check
echo "✓ Running TypeScript check..."
if npx tsc --noEmit 2>&1 | grep -q "error TS"; then
    echo "  ❌ TypeScript errors found"
    echo "     Run: npx tsc --noEmit"
else
    echo "  ✅ No TypeScript errors"
fi
echo ""

# Try build
echo "✓ Testing build..."
if npm run build > /tmp/build-check.log 2>&1; then
    echo "  ✅ Build successful"
    BUILD_SIZE=$(du -sh dist 2>/dev/null | awk '{print $1}')
    echo "     Build size: $BUILD_SIZE"
else
    echo "  ❌ Build failed"
    echo "     Check: /tmp/build-check.log"
fi
echo ""

# Check dist folder
if [ -d "dist" ]; then
    echo "✓ Build output:"
    echo "  Files in dist/assets:"
    ls -lh dist/assets/ 2>/dev/null | tail -5 | awk '{print "    " $9 " - " $5}'
else
    echo "  ⚠️  No dist folder (run npm run build)"
fi
echo ""

# Summary
echo "================================"
echo "📊 Health Check Summary"
echo "================================"
echo ""

ISSUES=0

if [ ! -f ".env" ]; then
    echo "❌ Missing .env file"
    ISSUES=$((ISSUES + 1))
fi

if [ ! -d "node_modules" ]; then
    echo "❌ Missing node_modules"
    ISSUES=$((ISSUES + 1))
fi

if ! npm run build > /dev/null 2>&1; then
    echo "❌ Build failing"
    ISSUES=$((ISSUES + 1))
fi

if [ $ISSUES -eq 0 ]; then
    echo "✅ All checks passed!"
    echo ""
    echo "🚀 Ready to run:"
    echo "   npm run dev     # Start development server"
    echo "   npm run build   # Build for production"
    echo "   npm run preview # Preview production build"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Update .env with real Supabase credentials"
    echo "   2. Run: npm run dev"
    echo "   3. Open: http://localhost:5173"
else
    echo ""
    echo "⚠️  Found $ISSUES issue(s)"
    echo "   Review the output above and fix issues"
fi

echo ""
